import React, { lazy, Suspense, useEffect, useState } from 'react';
import type { LiveClassConfig, LiveClassStore, LiveState } from '../lib/abboud/liveClass';
import { useLiveStore } from '../lib/abboud/useLiveStore';
const AbboudLiveGuest = lazy(() => import('./AbboudLiveGuest'));

/**
 * Entry in Sara's class: appears only for students the admin allowed, and only while that class is live.
 * Nothing renders (and nothing is shown to anyone else) otherwise.
 */
export default function AbboudLiveJoin({ uid, liveStore }: { uid?: string; liveStore?: LiveClassStore | null }) {
  const store = useLiveStore(liveStore);
  const [classes, setClasses] = useState<LiveClassConfig[]>([]);
  const [states, setStates] = useState<Record<string, LiveState | null>>({});
  const [open, setOpen] = useState<LiveClassConfig | null>(null);
  useEffect(() => { if (!store || !uid) return; return store.watchClassesFor(uid, setClasses, () => setClasses([])); }, [store, uid]);
  const hosts = classes.map(c => c.hostUid).join(',');
  useEffect(() => {
    if (!store) return;
    const stops = classes.map(c => store.watchState(c.hostUid, s => setStates(prev => ({ ...prev, [c.hostUid]: s })), () => {}));
    return () => stops.forEach(stop => stop());
  }, [store, hosts]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!store || !uid) return null;
  const live = classes.filter(c => states[c.hostUid]?.active);
  return <>
    {live.map(c => <button key={c.hostUid} type="button" data-testid="abboud-live-join" onClick={() => setOpen(c)}
      className="w-full flex items-center gap-3 rounded-xl border border-red-400/60 bg-red-500/15 px-3 py-2 text-start">
      <span aria-hidden="true">🔴</span>
      <span className="flex-1 min-w-0"><span className="block text-[13px] font-black text-red-200">فصل {c.hostName} مباشر الآن — انضم</span>
        <span className="block text-[11px] font-bold text-white/75 truncate">تابع السبورة وارفع يدك لتسأل أو تشارك</span></span>
    </button>)}
    {open && <Suspense fallback={null}><AbboudLiveGuest store={store} uid={uid} config={open} onClose={() => setOpen(null)} /></Suspense>}
  </>;
}
