import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Sara track progress in the cloud: users/{uid}.saraTrackProgress = { [trackId]: unlockedOrder }.
 * Existing rules already allow the owner to update this field and parents/admin to read it (no new rules).
 */
const KEY = (trackId: string, uid: string) => `sara_track_${trackId}_${uid}`;

export async function pushTrackProgress(uid: string | undefined, trackId: string, unlocked: number) {
  if (!uid) return;
  try { await updateDoc(doc(db, 'users', uid), { [`saraTrackProgress.${trackId}`]: unlocked, saraTrackProgressAt: Date.now() }); }
  catch (e) { console.debug('saraTrackProgress push note:', e); }
}

export async function loadTrackProgress(uid: string): Promise<Record<string, number>> {
  try { const s = await getDoc(doc(db, 'users', uid)); return (s.data()?.saraTrackProgress as Record<string, number>) || {}; }
  catch { return {}; }
}

/** Merge cloud ↔ device (keep the furthest lesson on each side). Returns true when local progress changed. */
export async function syncTrackProgress(uid: string | undefined, trackIds: string[]): Promise<boolean> {
  if (!uid) return false;
  const remote = await loadTrackProgress(uid);
  let changed = false;
  const up: Record<string, number> = {};
  for (const id of trackIds) {
    let local = 1; try { local = Math.max(1, Number(localStorage.getItem(KEY(id, uid))) || 1); } catch { /* ignore */ }
    const r = Number(remote[id]) || 1;
    if (r > local) { try { localStorage.setItem(KEY(id, uid), String(r)); changed = true; } catch { /* ignore */ } }
    else if (local > r) up[`saraTrackProgress.${id}`] = local;
  }
  if (Object.keys(up).length) { try { await updateDoc(doc(db, 'users', uid), { ...up, saraTrackProgressAt: Date.now() }); } catch (e) { console.debug('saraTrackProgress sync note:', e); } }
  return changed;
}
