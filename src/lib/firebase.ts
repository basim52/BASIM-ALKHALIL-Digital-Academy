import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { 
  initializeFirestore, 
  doc, 
  getDocFromServer, 
  serverTimestamp, 
  updateDoc,
  runTransaction
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
}, (firebaseConfig as any).firestoreDatabaseId); 
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

/**
 * Securely redeems a voucher code using an atomic Firestore transaction.
 * Enforces that:
 * 1. The voucher exists.
 * 2. The voucher status is 'active' (unused).
 * 3. Atomic status transition to 'redeemed' with redeemedBy and redeemedAt metadata.
 * 4. Credit / points allocated to student account atomically.
 */
export async function redeemVoucherTransaction(code: string, userId: string) {
  const cleanCode = code.trim().toUpperCase();
  if (!cleanCode) throw new Error("EMPTY_CODE");

  // Preferred: Secure server-side redemption using admin transaction
  if (auth.currentUser) {
    try {
      const idToken = await auth.currentUser.getIdToken();
      const response = await fetch('/api/vouchers/redeem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({ code: cleanCode, userId })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || data.message || "REDEEM_FAILED");
      }
      return data;
    } catch (err: any) {
      if (['VOUCHER_NOT_FOUND', 'VOUCHER_ALREADY_USED', 'INVALID_CREDITS', 'EMPTY_CODE', 'UNAUTHORIZED', 'FORBIDDEN'].includes(err.message)) {
        throw err;
      }
      console.warn("Server redemption error, falling back to client transaction:", err);
    }
  }

  // Client-side transaction with all reads strictly before any writes
  const voucherRef = doc(db, 'vouchers', cleanCode);
  const studentRef = doc(db, 'students', userId);

  return await runTransaction(db, async (transaction) => {
    // 1. ALL READS FIRST (Firestore requirement: all reads before writes)
    const vSnap = await transaction.get(voucherRef);
    const sSnap = await transaction.get(studentRef);

    if (!vSnap.exists()) {
      throw new Error("VOUCHER_NOT_FOUND");
    }
    const vData = vSnap.data();
    if (vData.status !== 'active') {
      throw new Error("VOUCHER_ALREADY_USED");
    }
    const credits = Number(vData.credits) || 0;
    if (credits <= 0) {
      throw new Error("INVALID_CREDITS");
    }

    // 2. ALL WRITES AFTER READS
    transaction.update(voucherRef, {
      status: 'redeemed',
      redeemedBy: userId,
      redeemedAt: serverTimestamp(),
    });

    const currentPoints = sSnap.exists() ? (sSnap.data().points || 0) : 0;
    transaction.set(studentRef, {
      points: currentPoints + (credits * 50)
    }, { merge: true });

    return { 
      success: true, 
      code: cleanCode, 
      credits, 
      addedPoints: credits * 50 
    };
  });
}

export async function buyChildhoodSubscription(userId: string, pkg: any) {
  try {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + (pkg.durationDays || 30));
    
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      childhoodSubscriptionType: pkg.id.split('_')[0],
      dailyMinutesLimit: pkg.dailyMinutes,
      remainingMinutesToday: pkg.dailyMinutes,
      lastMinutesResetDate: new Date().toISOString().split('T')[0],
      subscriptionExpiryDate: expiryDate,
      lastSeen: serverTimestamp()
    });
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
