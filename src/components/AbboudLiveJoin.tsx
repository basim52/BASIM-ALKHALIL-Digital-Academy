import React, { lazy, Suspense, useEffect, useState } from 'react';
import { liveErrorText, type LiveClassConfig, type LiveClassStore, type LiveState } from '../lib/abboud/liveClass';
import { useLiveStore, useLiveUid } from '../lib/abboud/useLiveStore';
const AbboudLiveGuest = lazy(() => import('./AbboudLiveGuest'));

/**
 * Attendee entry for «فصل عبود المباشر» (Sara's class, Abboud's own view for non-teachers, and the admin tab).
 * Only accounts the admin listed see anything: «🔴 … مباشر الآن — انضم» while live, otherwise a waiting entry that opens
 * the waiting room. Read failures are shown as errors, never as an empty class.
 */
export default function AbboudLiveJoin({ uid: propUid, liveStore, variant = 'dark', hint }: { uid?: string; liveStore?: LiveClassStore | null; variant?: 'dark' | 'light'; hint?: boolean }) {
  const store = useLiveStore(liveStore);
  const uid = useLiveUid(propUid, liveStore);
  const [classes, setClasses] = useState<LiveClassConfig[]>([]);
  const [states, setStates] = useState<Record<string, LiveState | null>>({});
  const [open, setOpen] = useState<LiveClassConfig | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    if (!store || !uid) return;
    return store.watchClassesFor(uid, list => { setClasses(list); setError(''); }, e => { setClasses([]); setError(liveErrorText(e, 'قائمة فصول عبود')); });
  }, [store, uid]);
  const hosts = classes.map(c => c.hostUid).join(',');
  useEffect(() => {
    if (!store) return;
    const stops = classes.map(c => store.watchState(c.hostUid, s => setStates(prev => ({ ...prev, [c.hostUid]: s })), e => setError(liveErrorText(e, `فصل ${c.hostName}`))));
    return () => stops.forEach(stop => stop());
  }, [store, hosts]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!store || !uid || (!classes.length && !error)) return null;
  const dark = variant === 'dark';
  return <div className="abboud-live-join space-y-2" data-testid="abboud-live-entries">
    {hint && classes.length > 0 && <p className="text-[12px] font-bold text-slate-700" data-testid="abboud-live-hint">📡 الفصل المباشر يبدأه عبود من حسابه، وأنت تنضم من هنا عندما يبدأ.</p>}
    {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-[12px] font-bold text-red-800">{error}</p>}
    {classes.map(c => {
      const live = !!states[c.hostUid]?.active;
      return <button key={c.hostUid} type="button" data-testid={live ? 'abboud-live-join' : 'abboud-live-waiting'} onClick={() => setOpen(c)}
        className={`w-full flex items-center gap-3 rounded-xl border px-3 py-2 text-start ${live ? 'border-red-400/60 bg-red-500/15' : dark ? 'border-white/20 bg-white/5' : 'border-slate-300 bg-white'}`}>
        <span aria-hidden="true">{live ? '🔴' : '⏳'}</span>
        <span className="flex-1 min-w-0">
          <span className={`block text-[13px] font-black ${live ? (dark ? 'text-red-200' : 'text-red-700') : dark ? 'text-white' : 'text-slate-800'}`}>{live ? `فصل ${c.hostName} مباشر الآن — انضم` : `فصل ${c.hostName} — بانتظار عبود يبدأ الدرس`}</span>
          <span className={`block text-[11px] font-bold truncate ${dark ? 'text-white/75' : 'text-slate-600'}`}>{live ? 'تابع السبورة وارفع يدك لتسأل أو تشارك' : `يبدؤه ${c.hostName} من حسابه؛ ادخل غرفة الانتظار وستظهر السبورة تلقائياً`}</span>
        </span>
      </button>;
    })}
    {open && <Suspense fallback={null}><AbboudLiveGuest store={store} uid={uid} config={open} onClose={() => setOpen(null)} /></Suspense>}
  </div>;
}
