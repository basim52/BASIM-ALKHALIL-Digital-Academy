import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeFirestore, doc, getDocFromServer, writeBatch, increment, serverTimestamp, getDoc, updateDoc } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
}, (firebaseConfig as any).firestoreDatabaseId); 
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export async function deductCredits(userId: string, amount: number, description: string) {
  try {
    const batch = writeBatch(db);
    const timestamp = new Date().getTime();
    const transactionId = `${userId}_cons_${timestamp}`;
    
    const transRef = doc(db, 'transactions', transactionId);
    batch.set(transRef, {
      id: transactionId,
      userId,
      amount: -amount,
      type: 'consumption',
      description,
      timestamp: serverTimestamp()
    });

    const userRef = doc(db, 'users', userId);
    batch.update(userRef, {
      credits: increment(-amount),
      lastSeen: serverTimestamp()
    });

    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'transactions/users');
  }
}

export async function redeemVoucher(userId: string, code: string) {
  try {
    const voucherRef = doc(db, 'vouchers', code);
    const voucherSnap = await getDoc(voucherRef);
    
    if (!voucherSnap.exists()) {
      throw new Error('invalid-code');
    }
    
    const voucherData = voucherSnap.data();
    if (voucherData.status === 'used') {
      throw new Error('already-used');
    }
    
    const batch = writeBatch(db);
    const timestamp = new Date().getTime();
    const transactionId = `${userId}_redeem_${timestamp}`;
    
    batch.update(voucherRef, {
      status: 'used',
      usedBy: userId,
      usedAt: serverTimestamp()
    });
    
    const transRef = doc(db, 'transactions', transactionId);
    batch.set(transRef, {
      id: transactionId,
      userId,
      amount: voucherData.credits,
      type: 'redeem',
      description: `Gift Code Redeemed: ${code}`,
      timestamp: serverTimestamp()
    });
    
    const userRef = doc(db, 'users', userId);
    batch.update(userRef, {
      credits: increment(voucherData.credits),
      lastSeen: serverTimestamp()
    });
    
    await batch.commit();
    return voucherData.credits;
  } catch (error: any) {
    if (error.message === 'invalid-code' || error.message === 'already-used') {
      throw error;
    }
    handleFirestoreError(error, OperationType.WRITE, `vouchers/${code}`);
  }
}

export async function buyChildhoodSubscription(userId: string, pkg: any) {
  try {
    const batch = writeBatch(db);
    const timestamp = new Date().getTime();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + (pkg.durationDays || 30));
    
    const transactionId = `${userId}_childsub_${timestamp}`;
    const transRef = doc(db, 'transactions', transactionId);
    batch.set(transRef, {
      id: transactionId,
      userId,
      amount: -pkg.priceSAR,
      type: 'childhood_subscription',
      description: `Subscription: ${pkg.label}`,
      timestamp: serverTimestamp()
    });

    const userRef = doc(db, 'users', userId);
    batch.update(userRef, {
      childhoodSubscriptionType: pkg.id.split('_')[0],
      dailyMinutesLimit: pkg.dailyMinutes,
      remainingMinutesToday: pkg.dailyMinutes,
      lastMinutesResetDate: new Date().toISOString().split('T')[0],
      subscriptionExpiryDate: expiryDate,
      lastSeen: serverTimestamp()
    });

    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'users/subscriptions');
  }
}

export async function resetDailyMinutes(userId: string, limit: number) {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      remainingMinutesToday: limit,
      lastMinutesResetDate: new Date().toISOString().split('T')[0]
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `users/${userId}`);
  }
}

export async function updateRemainingMinutes(userId: string, minutes: number) {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      remainingMinutesToday: minutes
    });
  } catch (error) {
    // Avoid blocking on frequent updates, just log
    console.error("Failed to update minutes:", error);
  }
}

export function handleFirestoreError(error: any, operation: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType: operation,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if(error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
