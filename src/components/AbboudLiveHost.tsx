import React, { useEffect, useMemo, useRef, useState } from 'react';
import { HostAudio, liveAudioSupported, type AudioDeps } from '../lib/abboud/liveAudio';
import { tidyUtterance } from '../lib/abboud/liveTranscript';
import { liveErrorText, liveFeed, liveState, nameOf, type FeedItem, type FeedWho, newSessionId, present, raisedHands, type LiveClassConfig, type LiveClassStore, type LiveMessage, type LiveState, type Participant } from '../lib/abboud/liveClass';

/** What Abboud's activity shares with joined students (no AI, stage, star or progress data). */
export type LiveSnapshot = { lessonId: number; lessonTitle: string; source: string; draft: string; explained: string[] };
const PUBLISH_DEBOUNCE_MS = 700;

/** Host side of «فصل عبود المباشر». Inert (config null) unless the admin created a class for this uid. */
export function useLiveHost(store: LiveClassStore | null, uid: string | undefined, snapshot: LiveSnapshot, options: { aiSpeaking?: boolean; audio?: AudioDeps | false } = {}) {
  const [config, setConfig] = useState<LiveClassConfig | null>(null);
  const [state, setState] = useState<LiveState | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [messages, setMessages] = useState<LiveMessage[]>([]);
  const [error, setError] = useState('');
  const [now, setNow] = useState(() => Date.now());
  const fail = (e?: unknown) => setError(liveErrorText(e));
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
  // Shared clean transcript: one item per finished utterance (never interim words).
  const feed = useRef<FeedItem[]>([]); const feedSeq = useRef(0);
  const [feedError, setFeedError] = useState('');
  async function say(who: FeedWho, raw: string) {
    const s = latest.current.state;
    if (!store || !uid || !s?.active) return;
    const text = who === 'abboud' ? tidyUtterance(raw) : raw;
    if (!text.trim()) return;
    feed.current = liveFeed(s.sessionId, [...feed.current, { id: `${who[0]}${Date.now().toString(36)}${++feedSeq.current}`, who, text, at: Date.now() }]).items;
    try { await store.publishFeed(uid, { sessionId: s.sessionId, items: feed.current }); setFeedError(''); }
    catch (e) { setFeedError(`${liveErrorText(e, 'نشر كلام الفصل وبدر وريم')} (يحتاج نشر قواعد live/feed الجديدة).`); }
  }
  // Live voice (WebRTC, this device is the hub). Abboud's real voice only — nothing is re-synthesised for students.
  const audio = useRef<HostAudio | null>(null);
  const [voiceOn, setVoiceOn] = useState(true);
  const [audioNote, setAudioNote] = useState('');
  const [needMic, setNeedMic] = useState(false);
  const [relay, setRelay] = useState<boolean | null>(null);
  const [peerStates, setPeerStates] = useState<Record<string, RTCPeerConnectionState>>({});
  const [speakerTrack, setSpeakerTrack] = useState<MediaStreamTrack | null>(null);
  const audioDeps = options.audio;
  const MIC_BLOCKED = '🎤 الميكروفون غير مفعّل للبث المباشر، فالطلاب لا يسمعونك. اضغط «🎤 شغّل صوتك المباشر» واسمح بالميكروفون.';
  function micOn(a: HostAudio) {
    return a.startMic().then(() => { if (audio.current === a) { setNeedMic(false); setAudioNote(''); } }, () => { if (audio.current === a) { setNeedMic(true); setAudioNote(MIC_BLOCKED); } });
  }
  function openAudio(sessionId: string) {
    audio.current?.close(); audio.current = null; setPeerStates({}); setSpeakerTrack(null); setRelay(null); setNeedMic(false);
    if (!store || !uid || audioDeps === false || (!audioDeps && !liveAudioSupported())) { setAudioNote('🔇 الصوت المباشر غير مدعوم في هذا المتصفح؛ استخدم Chrome أو Safari حديثاً ليسمعك الطلاب.'); return; }
    const a = new HostAudio(store, uid, sessionId, audioDeps || {}, {
      onPeers: setPeerStates, onSpeakerTrack: setSpeakerTrack,
      onIce: info => { if (audio.current === a) setRelay(info.relay); },
      onMicEnded: () => { if (audio.current === a) { setNeedMic(true); setAudioNote('🎤 توقف الميكروفون (ربما أخذه تطبيق أو اتصال آخر). اضغط «🎤 شغّل صوتك المباشر».'); } },
      onError: () => { if (audio.current === a) setAudioNote('تعذّر توصيل الصوت لأحد الطلاب. نعيد المحاولة تلقائياً، أو اضغط «🔄 أعد توصيل الصوت».'); }
    });
    audio.current = a;
    // From «ابدأ» this runs inside the tap (permission prompt); when resuming after a reload it works if permission was given before.
    void micOn(a);
  }
  // A class that is already live (page reloaded, app reopened) gets its voice hub back instead of staying silent.
  useEffect(() => { if (sessionId && audio.current?.sessionId !== sessionId) openAudio(sessionId); }, [sessionId]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (!sessionId) { audio.current?.close(); audio.current = null; setPeerStates({}); setSpeakerTrack(null); setNeedMic(false); setRelay(null); } }, [sessionId]);
  useEffect(() => () => { audio.current?.close(); }, []);
  useEffect(() => { if (!store || !uid || !sessionId) return; return store.watchSignals(uid, list => void audio.current?.onSignals(list), () => {}); }, [store, uid, sessionId]);
  useEffect(() => { audio.current?.setSpeaker(state?.active ? state.speaker : ''); }, [state?.speaker, state?.active, peerStates]);
  useEffect(() => { audio.current?.setMuted(!voiceOn || !!options.aiSpeaking); }, [voiceOn, options.aiSpeaking, peerStates]);
  async function publish(patch: Partial<LiveState>) {
    if (!store || !uid) return;
    const base = latest.current.state;
    try {
      setError('');
      await store.publishState(uid, liveState({ active: false, sessionId: '', speaker: '', ...base, ...latest.current.snapshot, ...patch } as LiveState));
    } catch (e) { fail(e); }
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
  const hereKey = here.map(p => p.uid).sort().join(',');
  useEffect(() => { audio.current?.sync(hereKey ? hereKey.split(',') : []); }, [hereKey, sessionId]);
  const hands = useMemo(() => raisedHands(participants, state, now), [participants, state, now]);
  return {
    config, state, here, hands, messages, error: error || feedError, live: !!state?.active,
    say, voiceOn, audioNote, peerStates, speakerTrack, needMic, relay,
    toggleVoice: () => setVoiceOn(v => !v),
    /** Inside the teacher's tap: (re)open the mic for the live voice. */
    enableMic: () => { if (audio.current) void micOn(audio.current); else if (sessionId) openAudio(sessionId); },
    /** Rebuild every student's live-voice connection. */
    reconnectAudio: () => { setAudioNote(''); if (audio.current) audio.current.reconnectAll(hereKey ? hereKey.split(',') : []); else if (sessionId) openAudio(sessionId); },
    start: () => {
      const id = newSessionId(); feed.current = [];
      openAudio(id);
      if (store && uid) void store.publishFeed(uid, { sessionId: id, items: [] }).then(() => setFeedError(''), e => setFeedError(`${liveErrorText(e, 'نشر كلام الفصل وبدر وريم')} (يحتاج نشر قواعد live/feed الجديدة).`));
      return publish({ active: true, sessionId: id, speaker: '' });
    },
    end: () => { audio.current?.close(); audio.current = null; return publish({ active: false, speaker: '' }); },
    allow: async (student: string) => { await publish({ speaker: student }); try { await store?.setHand(uid!, student, false); } catch { /* the hand doc may be gone */ } },
    decline: async (student: string) => { try { await store?.setHand(uid!, student, false); } catch (e) { fail(e); } },
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

/**
 * Top bar of «عبود المعلّم», only for the account the admin made the teacher: an obvious «📡 ابدأ الفصل المباشر»
 * (starts and opens the panel), then «🔴 مباشر الآن · 👥 N» to reopen it.
 */
export function AbboudLiveHostHeaderButton({ host, open, onOpen }: { host: LiveHost; open: boolean; onOpen: (open: boolean) => void }) {
  if (!host.config) return null;
  const hands = host.hands.length;
  return <button type="button" data-testid="abboud-live-header" aria-expanded={open} aria-controls="abboud-live-panel"
    aria-label={host.live ? `الفصل المباشر: مباشر الآن، ${host.here.length} حاضر${hands ? `، ${hands} يطلبون الكلام` : ''}` : 'ابدأ الفصل المباشر'}
    onClick={() => { if (!host.live) { void host.start(); onOpen(true); } else onOpen(!open); }}
    className={`abboud-live-header shrink-0 rounded-xl px-3 py-3 font-bold ${host.live ? 'bg-red-600 text-white' : 'bg-white text-red-700 border border-red-300'}`}>
    {host.live ? <>🔴 <span className="abboud-live-header-long">مباشر الآن · </span>👥 {host.here.length}{hands > 0 ? ` · ✋${hands}` : ''}</> : <>📡 <span className="abboud-live-header-long">ابدأ الفصل المباشر</span><span className="abboud-live-header-short">مباشر</span></>}
  </button>;
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

/** Plays one remote WebRTC track (hidden element). */
export function LiveTrackAudio({ track, muted = false }: { track: MediaStreamTrack | null; muted?: boolean }) {
  const el = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    const a = el.current; if (!a) return;
    a.srcObject = track && typeof MediaStream !== 'undefined' ? new MediaStream([track]) : null;
    if (track) void a.play?.()?.catch?.(() => {});
  }, [track]);
  return <audio ref={el} autoPlay muted={muted} data-testid="abboud-live-audio" data-track={track ? track.id : ''} hidden />;
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
      <div className="abboud-live-row text-sm" data-testid="abboud-live-voice">
        <button type="button" aria-pressed={host.voiceOn} onClick={host.toggleVoice} className="rounded-lg border bg-white px-3 py-1">{host.voiceOn ? '🎤 صوتك المباشر يعمل — إيقاف' : '🔇 صوتك المباشر متوقف — تشغيل'}</button>
        <span>🎧 {host.here.filter(p => host.peerStates[p.uid] === 'connected').length} من {host.here.length} يسمعونك مباشرة</span>
        {host.needMic && <button type="button" onClick={host.enableMic} className="rounded-lg bg-red-600 px-3 py-1 font-bold text-white">🎤 شغّل صوتك المباشر</button>}
        {host.here.some(p => host.peerStates[p.uid] !== 'connected') && <button type="button" onClick={host.reconnectAudio} className="rounded-lg border bg-white px-3 py-1">🔄 أعد توصيل الصوت</button>}
      </div>
      {host.relay === false && host.here.some(p => host.peerStates[p.uid] !== 'connected') && <p role="status" data-testid="abboud-live-no-relay" className="abboud-dock-notice bg-amber-50 text-amber-900">⚠️ خادم ترحيل الصوت (TURN) غير مضبوط بعد: الطلاب على بيانات الجوال أو بعض شبكات البيت قد لا يسمعونك مباشرة. جرّبوا شبكة Wi-Fi واحدة حتى يُضبط.</p>}
      {host.audioNote && <p role="status" className="abboud-dock-notice bg-amber-50 text-amber-900">{host.audioNote}</p>}

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
