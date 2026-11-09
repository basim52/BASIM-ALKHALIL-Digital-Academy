import { useEffect, useState } from 'react';
import type { LiveClassStore } from './liveClass';
/** The given store (tests) or, lazily, the app's Firestore store; null while loading or if Firebase is unavailable. */
export function useLiveStore(override?: LiveClassStore | null) {
  const [store, setStore] = useState<LiveClassStore | null>(override ?? null);
  useEffect(() => {
    if (override !== undefined) { setStore(override); return; }
    let alive = true;
    import('./liveFirestoreApp').then(m => { if (alive) setStore(m.liveStore); }).catch(() => { if (alive) setStore(null); });
    return () => { alive = false; };
  }, [override]);
  return store;
}
/**
 * Who this device is in the live class. With the app's Firestore store it is the signed-in auth uid — the same id the
 * rules compare with the class doc — because a profile object may lack its `uid` field. Tests (override) use the prop.
 */
export function useLiveUid(fallback: string | undefined, override?: LiveClassStore | null) {
  const [authUid, setAuthUid] = useState<string | null>(null);
  useEffect(() => {
    if (override !== undefined) return;
    let stop: (() => void) | undefined, alive = true;
    import('./liveFirestoreApp').then(m => { if (alive) stop = m.watchLiveUid(setAuthUid); }).catch(() => {});
    return () => { alive = false; stop?.(); };
  }, [override]);
  return override !== undefined ? fallback : (authUid ?? fallback);
}
