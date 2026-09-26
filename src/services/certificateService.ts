import { db, auth } from '../lib/firebase';
import { doc, setDoc, getDocs, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { CertificateData } from '../components/CompletionCertificateModal';

const EVENT_TRIGGER_CERTIFICATE = 'trigger-completion-certificate';

/**
 * Dispatch custom event to show completion certificate modal anywhere in app
 */
export function triggerCompletionCertificate(cert: CertificateData) {
  if (typeof window !== 'undefined') {
    const event = new CustomEvent(EVENT_TRIGGER_CERTIFICATE, { detail: cert });
    window.dispatchEvent(event);
  }
}

/**
 * Subscribe to completion certificate modal events
 */
export function subscribeToCertificateTriggers(callback: (cert: CertificateData) => void) {
  if (typeof window === 'undefined') return () => {};
  const handler = (e: Event) => {
    const customEvent = e as CustomEvent<CertificateData>;
    if (customEvent.detail) {
      callback(customEvent.detail);
    }
  };
  window.addEventListener(EVENT_TRIGGER_CERTIFICATE, handler);
  return () => {
    window.removeEventListener(EVENT_TRIGGER_CERTIFICATE, handler);
  };
}

/**
 * Store earned certificate in users/{uid}/certificates/{unitId}
 * with { unitId, unitTitle, unitTitleAr, completedAt }
 */
export async function saveEarnedCertificate(
  uid: string,
  unitId: string,
  unitTitle: string,
  unitTitleAr: string,
  studentName?: string
): Promise<CertificateData> {
  const completedAt = new Date().toISOString();
  const certData: CertificateData = {
    unitId: String(unitId),
    unitTitle: unitTitle || 'Educational Unit',
    unitTitleAr: unitTitleAr || unitTitle || 'الوحدة التعليمية',
    completedAt,
    studentName: studentName || 'Student'
  };

  const isSimulated = uid.startsWith('sim_') || !auth.currentUser;

  if (isSimulated) {
    try {
      const stored = JSON.parse(localStorage.getItem(`certs_${uid}`) || '[]');
      const filtered = stored.filter((c: any) => c.unitId !== String(unitId));
      filtered.unshift(certData);
      localStorage.setItem(`certs_${uid}`, JSON.stringify(filtered));
    } catch (e) {
      console.warn("Local storage cert save error:", e);
    }
    triggerCompletionCertificate(certData);
    return certData;
  }

  try {
    const certRef = doc(db, 'users', uid, 'certificates', String(unitId));
    await setDoc(certRef, {
      unitId: String(unitId),
      unitTitle: certData.unitTitle,
      unitTitleAr: certData.unitTitleAr,
      completedAt: certData.completedAt,
      studentName: certData.studentName
    }, { merge: true });

    triggerCompletionCertificate(certData);
  } catch (err) {
    console.error("Error saving certificate to Firestore:", err);
    // Still trigger UI celebration even if cloud write transiently fails
    triggerCompletionCertificate(certData);
  }

  return certData;
}

/**
 * Fetch all earned certificates from users/{uid}/certificates
 */
export async function getEarnedCertificates(uid: string): Promise<CertificateData[]> {
  const isSimulated = uid.startsWith('sim_') || !auth.currentUser;
  if (isSimulated) {
    try {
      const stored = JSON.parse(localStorage.getItem(`certs_${uid}`) || '[]');
      return stored;
    } catch {
      return [];
    }
  }

  try {
    const certsRef = collection(db, 'users', uid, 'certificates');
    const snap = await getDocs(certsRef);
    const certs: CertificateData[] = [];
    snap.forEach((docSnap) => {
      const data = docSnap.data();
      certs.push({
        unitId: docSnap.id,
        unitTitle: data.unitTitle || 'Unit',
        unitTitleAr: data.unitTitleAr || data.unitTitle || 'الوحدة الدراسية',
        completedAt: data.completedAt || new Date().toISOString(),
        studentName: data.studentName
      });
    });
    return certs;
  } catch (err) {
    console.warn("Notice: could not fetch certificates from Firestore:", err);
    return [];
  }
}
