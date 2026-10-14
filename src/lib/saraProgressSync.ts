import { LEGACY_TRACK_IDS, migrateLegacyCount } from '../data/saraTracks/fromCurriculum';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Sara track progress in the cloud: users/{uid}.saraTrackProgress = { [trackId]: unlockedOrder }.
 * Existing rules already allow the owner to update this field and parents/admin to read it (no new rules).
 */
const KEY = (trackId: string, uid: string) => `sara_track_${trackId}_${uid}`;

const LAST = (uid?: string) => `sara_last_track_${uid || 'guest'}`;
/** Remember the Sara track the student used most recently (device; cloud copy rides on pushTrackProgress). */
export function markLastTrack(uid: string | undefined, trackId: string) { try { localStorage.setItem(LAST(uid), JSON.stringify({ id: trackId, at: Date.now() })); } catch { /* ignore */ } }
export function readLastTrack(uid?: string): { id: string; at: number } | null { try { const v = localStorage.getItem(LAST(uid)); return v ? JSON.parse(v) : null; } catch { return null; } }

export async function pushTrackProgress(uid: string | undefined, trackId: string, unlocked: number) {
  if (!uid) return;
  try { await updateDoc(doc(db, 'users', uid), { [`saraTrackProgress.${trackId}`]: unlocked, saraTrackProgressAt: Date.now(), saraLastTrack: trackId }); }
  catch (e) { console.debug('saraTrackProgress push note:', e); }
}

export async function loadTrackMeta(uid: string): Promise<{ progress: Record<string, number>; lastTrack: string | null; at: number }> {
  try { const d = (await getDoc(doc(db, 'users', uid))).data() || {}; return { progress: (d.saraTrackProgress as Record<string, number>) || {}, lastTrack: (d.saraLastTrack as string) || null, at: Number(d.saraTrackProgressAt) || 0 }; }
  catch { return { progress: {}, lastTrack: null, at: 0 }; }
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
    const lg = LEGACY_TRACK_IDS[id];
    const r = Number(remote[id]) || (lg ? migrateLegacyCount(Number(remote[lg]) || 1) : 1);
    if (lg && local === 1) { try { const o = Number(localStorage.getItem(KEY(lg, uid))) || 1; local = migrateLegacyCount(o); if (o > 1) localStorage.setItem(KEY(id, uid), String(local)); } catch { /* ignore */ } }
    if (r > local) { try { localStorage.setItem(KEY(id, uid), String(r)); changed = true; } catch { /* ignore */ } }
    else if (local > r) up[`saraTrackProgress.${id}`] = local;
  }
  if (Object.keys(up).length) { try { await updateDoc(doc(db, 'users', uid), { ...up, saraTrackProgressAt: Date.now() }); } catch (e) { console.debug('saraTrackProgress sync note:', e); } }
  return changed;
}
