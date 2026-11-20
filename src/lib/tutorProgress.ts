import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

/** Tutor progress lives under its OWN key (localStorage + users/{uid}.tutorTrackProgress.{trackId}); Sara's progress is never read or written. */
export const tutorProgressKey = (trackId: string, uid?: string) => `tutor_track_${trackId}_${uid || 'guest'}`;
export const readTutorUnlocked = (trackId: string, uid?: string) => { try { return Math.max(1, Number(localStorage.getItem(tutorProgressKey(trackId, uid))) || 1); } catch { return 1; } };
export const saveTutorUnlocked = (trackId: string, uid: string | undefined, n: number) => {
  try { localStorage.setItem(tutorProgressKey(trackId, uid), String(n)); } catch { /* ignore */ }
  if (uid) void updateDoc(doc(db, 'users', uid), { [`tutorTrackProgress.${trackId}`]: n }).catch(() => {});
};

/** Merge rule for the device copy and the cloud copy: the higher counter wins, never below 1, so nothing is lost or reset. */
export const mergeTutorUnlocked = (local: unknown, cloud: unknown) => Math.max(1, Number(local) || 1, Number(cloud) || 1);

type CloudReader = (uid: string) => Promise<Record<string, unknown> | undefined>;
/** Reads users/{uid}.tutorTrackProgress (owner-readable under the current rules). Read only. */
const readCloudTutorProgress: CloudReader = async uid => {
  const d = await getDoc(doc(db, 'users', uid));
  return (d.data()?.tutorTrackProgress || {}) as Record<string, unknown>;
};
let cloudReader: CloudReader = readCloudTutorProgress;
/** Test hook: swap the cloud read (pass nothing to restore the real one). */
export const setTutorCloudReaderForTests = (r?: CloudReader) => { cloudReader = r || readCloudTutorProgress; };

/**
 * Bring another device's progress onto this one (same rule as «أكمل الجملة»): READ the cloud counter and keep the max.
 * Only the local cache is raised when the cloud is ahead; nothing is ever written to Firebase here and nothing goes down.
 * No user / offline / read error → the local counter as it is.
 */
export async function syncTutorUnlocked(trackId: string, uid?: string): Promise<number> {
  const local = readTutorUnlocked(trackId, uid);
  if (!uid) return local;
  let cloud: unknown;
  try { cloud = (await cloudReader(uid))?.[trackId]; } catch { return local; }
  const now = readTutorUnlocked(trackId, uid); // the student may have finished a lesson while the read was in flight
  const merged = mergeTutorUnlocked(now, cloud);
  if (merged > now) { try { localStorage.setItem(tutorProgressKey(trackId, uid), String(merged)); } catch { /* ignore */ } }
  return merged;
}
