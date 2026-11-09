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
