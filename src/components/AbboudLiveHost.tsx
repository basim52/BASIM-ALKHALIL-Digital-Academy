import React, { useEffect, useMemo, useRef, useState } from 'react';
import { liveState, nameOf, newSessionId, present, raisedHands, type LiveClassConfig, type LiveClassStore, type LiveMessage, type LiveState, type Participant } from '../lib/abboud/liveClass';

/** What Abboud's activity shares with joined students (no AI, stage, star or progress data). */
export type LiveSnapshot = { lessonId: number; lessonTitle: string; source: string; draft: string; explained: string[] };
const PUBLISH_DEBOUNCE_MS = 700;

/** Host side of «فصل عبود المباشر». Inert (config null) unless the admin created a class for this uid. */
export function useLiveHost(store: LiveClassStore | null, uid: string | undefined, snapshot: LiveSnapshot) {
  const [config, setConfig] = useState<LiveClassConfig | null>(null);
  const [state, setState] = useState<LiveState | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [messages, setMessages] = useState<LiveMessage[]>([]);
  const [error, setError] = useState('');
  const [now, setNow] = useState(() => Date.now());
  const fail = () => setError('تعذّر الاتصال بالفصل المباشر. تحقّق من الإنترنت وحاول مجدداً.');
  useEffect(() => { if (!store || !uid) return; return store.watchConfig(uid, setConfig, fail); }, [store, uid]);
  useEffect(() => {
    if (!store || !uid || !config) { setState(null); setParticipants([]); return; }
    const a = store.watchState(uid, setState, fail); const b = store.watchParticipants(uid, setParticipants, fail);
    return () => { a(); b(); };
  }, [store, uid, config]);
  const sessionId = state?.active ? state.sessionId : '';
  useEffect(() => { if (!store || !uid || !sessionId) { setMessages([]); return; } return store.watchMessages(uid, sessionId, setMessages, fail); }, [store, uid, sessionId]);
  useEffect(() => { if (!sessionId) return; const t = setInterval(() => setNow(Date.now()), 15_000); return () => clearInterval(t); }, [sessionId]);
  const latest = useRef({ state, snapshot }); latest.current = { state, snapshot };
  async function publish(patch: Partial<LiveState>) {
    if (!store || !uid) return;
    const base = latest.current.state;
    try {
      setError('');
      await store.publishState(uid, liveState({ active: false, sessionId: '', speaker: '', ...base, ...latest.current.snapshot, ...patch } as LiveState));
    } catch { fail(); }
  }
  // While live, Abboud's lesson, board marks and words (including the mic text he is saying now) reach students shortly after.
  const key = JSON.stringify(snapshot);
  useEffect(() => {
    if (!state?.active) return;
    const t = setTimeout(() => void publish({}), PUBLISH_DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [key, state?.active]); // eslint-disable-line react-hooks/exhaustive-deps
  // Closing the activity ends the live class so students are not left waiting.
  useEffect(() => () => { if (latest.current.state?.active) void publish({ active: false, speaker: '' }); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const here = useMemo(() => state?.active ? present(participants, state.sessionId, now) : [], [participants, state, now]);
  const hands = useMemo(() => raisedHands(participants, state, now), [participants, state, now]);
  return {
    config, state, here, hands, messages, error, live: !!state?.active,
    start: () => publish({ active: true, sessionId: newSessionId(), speaker: '' }),
    end: () => publish({ active: false, speaker: '' }),
    allow: async (student: string) => { await publish({ speaker: student }); try { await store?.setHand(uid!, student, false); } catch { /* the hand doc may be gone */ } },
    decline: async (student: string) => { try { await store?.setHand(uid!, student, false); } catch { fail(); } },
    endTurn: () => publish({ speaker: '' })
  };
}
export type LiveHost = ReturnType<typeof useLiveHost>;

/** «📡» in Abboud's dock: shown only when the admin gave him a live class; the badge counts raised hands. */
export function AbboudLiveHostButton({ host, open, onToggle }: { host: LiveHost; open: boolean; onToggle: () => void }) {
  if (!host.config) return null;
  const hands = host.hands.length;
  return <button type="button" data-testid="abboud-live-toggle" aria-expanded={open} aria-controls="abboud-live-panel" onClick={onToggle}
    aria-label={`الفصل المباشر${host.live ? ' (مباشر الآن)' : ''}${hands ? `، ${hands} يطلبون الكلام` : ''}`}
    className={`abboud-live-toggle rounded-full border font-bold ${host.live ? 'bg-red-600 text-white' : 'bg-white'}`}>📡{hands > 0 && <span className="abboud-live-badge" aria-hidden="true">✋{hands}</span>}</button>;
}

/** A one-line nudge under the dock so Abboud notices a raised hand or the speaker's words without opening the panel. */
export function AbboudLiveHostNotice({ host }: { host: LiveHost }) {
  if (!host.live) return null;
  const last = host.messages[host.messages.length - 1];
  const hand = host.hands[0];
  if (!last && !hand) return null;
  return <p className="abboud-dock-notice bg-sky-50 text-sky-900" role="status" data-testid="abboud-live-notice">
    {hand && <span>✋ {nameOf(host.config, hand.uid)} يطلب الكلام. </span>}
    {last && <span>💬 <b>{nameOf(host.config, last.senderId)}:</b> <span dir="auto">{last.text}</span></span>}
  </p>;
}

export function AbboudLiveHostPanel({ host }: { host: LiveHost }) {
  const { config, state } = host;
  if (!config) return null;
  const speaker = state?.active ? state.speaker : '';
  return <section id="abboud-live-panel" data-testid="abboud-live-panel" aria-label="الفصل المباشر مع طلاب الأكاديمية" className="abboud-live-panel">
    {host.error && <p role="alert" className="abboud-dock-notice bg-red-50 text-red-800">{host.error}</p>}
    {!host.live ? <div className="abboud-live-row">
      <span className="text-sm">طلاب يمكنهم الانضمام من أجهزتهم: {config.allowed.map(id => nameOf(config, id)).join('، ')}</span>
      <button type="button" onClick={() => void host.start()} className="rounded-lg bg-red-600 px-3 py-2 font-bold text-white">🔴 ابدأ الفصل المباشر</button>
    </div> : <>
      <div className="abboud-live-row">
        <b className="text-red-700">🔴 مباشر الآن</b>
        <span className="text-sm" data-testid="abboud-live-here">👥 الحاضرون ({host.here.length}): {host.here.length ? host.here.map(p => nameOf(config, p.uid)).join('، ') : 'لا أحد بعد'}</span>
        <button type="button" onClick={() => void host.end()} className="rounded-lg border bg-white px-3 py-1 text-sm">إنهاء الفصل المباشر</button>
      </div>
      {speaker && <div className="abboud-live-row" data-testid="abboud-live-speaker"><span>🎙️ <b>{nameOf(config, speaker)}</b> يتكلم الآن</span>
        <button type="button" onClick={() => void host.endTurn()} className="rounded-lg bg-slate-700 px-3 py-1 text-sm text-white">إنهاء دوره</button></div>}
      {host.hands.length > 0 && <ul className="abboud-live-hands" aria-label="طلبات الكلام">{host.hands.map(p => <li key={p.uid} className="abboud-live-row">
        <span>✋ {nameOf(config, p.uid)} يطلب الكلام</span>
        <button type="button" onClick={() => void host.allow(p.uid)} className="rounded-lg bg-emerald-700 px-3 py-1 text-sm text-white">اسمح لـ{nameOf(config, p.uid)}</button>
        <button type="button" onClick={() => void host.decline(p.uid)} className="rounded-lg border bg-white px-3 py-1 text-sm">ليس الآن</button>
      </li>)}</ul>}
      {host.messages.length > 0 && <ol className="abboud-live-messages" aria-label="كلام الطلاب" aria-live="polite">{host.messages.slice(-20).map(m => <li key={m.id}><b>{nameOf(config, m.senderId)}:</b> <span dir="auto">{m.text}</span>{m.via === 'mic' ? ' 🎙️' : ''}</li>)}</ol>}
    </>}
  </section>;
}
