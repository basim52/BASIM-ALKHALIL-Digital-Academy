import { doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

/** Tutor progress lives under its OWN key (localStorage + users/{uid}.tutorTrackProgress.{trackId}); Sara's progress is never read or written. */
export const tutorProgressKey = (trackId: string, uid?: string) => `tutor_track_${trackId}_${uid || 'guest'}`;
export const readTutorUnlocked = (trackId: string, uid?: string) => { try { return Math.max(1, Number(localStorage.getItem(tutorProgressKey(trackId, uid))) || 1); } catch { return 1; } };
export const saveTutorUnlocked = (trackId: string, uid: string | undefined, n: number) => {
  try { localStorage.setItem(tutorProgressKey(trackId, uid), String(n)); } catch { /* ignore */ }
  if (uid) void updateDoc(doc(db, 'users', uid), { [`tutorTrackProgress.${trackId}`]: n }).catch(() => {});
};
