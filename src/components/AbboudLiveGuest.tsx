import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { BoardAction } from '../lib/boardActions';
import { abboudBoardActions } from '../lib/abboud/board';
import { lessonFor } from '../lib/abboud/curriculum';
import { canPost, cleanText, HEARTBEAT_MS, liveErrorText, MAX_MESSAGE, nameOf, type FeedItem, type LiveClassConfig, type LiveClassStore, type LiveMessage, type LiveState } from '../lib/abboud/liveClass';
import { GuestAudio, liveAudioSupported, type AudioDeps } from '../lib/abboud/liveAudio';
import { tidyUtterance, timeline, type TimelineEntry } from '../lib/abboud/liveTranscript';
import { ContinuousDictation, microphoneError } from '../lib/abboud/recognition';
import { ClassroomVoice, type VoiceTurn } from '../lib/abboud/voice';
import { AbboudStudentFace } from './AbboudStudentFace';

/** Light HTML rendering of the very board Abboud's class draws (same BoardActions), for phones and old devices. */
export function LiveBoard({ actions }: { actions: BoardAction[] }) {
  return <div className="abboud-live-board" data-testid="abboud-live-board">{actions.map((a, i) => {
    switch (a.kind) {
      case 'title': return <h3 key={i} className="abboud-live-board-title">{a.text}</h3>;
      case 'text': return <p key={i} dir="auto" className="abboud-live-board-text">{a.text}{a.ar && <><br /><span>{a.ar}</span></>}</p>;
      case 'example': return <p key={i} dir="auto" className="abboud-live-board-example">✏️ {a.en}{a.ar && <><br /><span>{a.ar}</span></>}</p>;
      case 'highlight': return <p key={i} dir="auto" className="abboud-live-board-note">{a.text}</p>;
      case 'fix': return <p key={i} dir="auto" className="abboud-live-board-fix">❌ {a.wrong}<br />✅ {a.right}</p>;
      default: return null;
    }
  })}</div>;
}

/** Plays one remote WebRTC track; reports when the browser blocks autoplay. */
function RemoteAudio({ track, muted, onBlocked }: { track: MediaStreamTrack; muted: boolean; onBlocked: () => void }) {
  const el = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    const a = el.current; if (!a || typeof MediaStream === 'undefined') return;
    a.srcObject = new MediaStream([track]);
    const p = a.play?.(); if (p && typeof p.catch === 'function') p.catch(onBlocked);
  }, [track]); // eslint-disable-line react-hooks/exhaustive-deps
  return <audio ref={el} autoPlay muted={muted} data-testid="abboud-live-remote-audio" hidden />;
}

/** How a finished line is voiced on this device when it is not heard live. */
export type LiveSpeak = (entry: TimelineEntry) => Promise<void>;
const TTS_VOICE: Record<TimelineEntry['who'], VoiceTurn['speaker']> = { abboud: 'badr', badr: 'badr', reem: 'reem', sara: 'sara', student: 'reem' };
const TTS_OVERRIDE: Partial<Record<TimelineEntry['who'], string>> = { abboud: 'Charon', student: 'Achernar' };
function defaultSpeak(voice: ClassroomVoice): LiveSpeak {
  return entry => voice.play([{ speaker: TTS_VOICE[entry.who], text: entry.text, voiceName: TTS_OVERRIDE[entry.who] }], () => {}, () => {}).catch(() => {});
}

/**
 * A registered student's seat in Abboud's live class, on their own device.
 *  - Hears Abboud's real voice live (WebRTC from his device) and the allowed speaker relayed through it; if live
 *    audio cannot connect, a clearly marked automatic voice reads Abboud's finished sentences.
 *  - Badr and Reem are here too: their replies (generated only on Abboud's device) arrive through the shared feed
 *    and play on each device with their own voices and faces.
 *  - Text is one clean bubble per finished utterance (no interim recognition).
 *  - May talk (mic → live voice + text, or typing) only after raising a hand and Abboud allowing it.
 */
export default function AbboudLiveGuest({ store, uid, config, onClose, audio, speak }: {
  store: LiveClassStore; uid: string; config: LiveClassConfig; onClose: () => void;
  /** Tests: WebRTC/mic stand-ins; false = no live voice. */ audio?: AudioDeps | false;
  /** Tests: replaces the TTS player. */ speak?: LiveSpeak;
}) {
  const hostUid = config.hostUid;
  const [state, setState] = useState<LiveState | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [wasLive, setWasLive] = useState(false);
  const [readError, setReadError] = useState('');
  const [messages, setMessages] = useState<LiveMessage[]>([]);
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [hand, setHand] = useState(false);
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);
  const [language, setLanguage] = useState('ar-SA');
  const [notice, setNotice] = useState('');
  const [muted, setMuted] = useState(false);
  const [voiceState, setVoiceState] = useState<RTCPeerConnectionState | 'off'>('new');
  const [tracks, setTracks] = useState<MediaStreamTrack[]>([]);
  const [blocked, setBlocked] = useState(false);
  const [speaking, setSpeaking] = useState<TimelineEntry['who'] | null>(null);
  const dictation = useRef<ContinuousDictation | null>(null);
  const dialog = useRef<HTMLDivElement | null>(null);
  const live = useRef<GuestAudio | null>(null);
  const sessionId = state?.active ? state.sessionId : '';
  const myTurn = canPost(config, state, uid);
  const handRef = useRef(hand); handRef.current = hand;
  useEffect(() => store.watchState(hostUid, s => { setState(s); setLoaded(true); setReadError(''); if (s?.active) setWasLive(true); }, e => { setLoaded(true); setReadError(liveErrorText(e, 'حالة الفصل')); }), [store, hostUid]);
  useEffect(() => { if (!sessionId) { setMessages([]); return; } return store.watchMessages(hostUid, sessionId, setMessages, e => setReadError(liveErrorText(e, 'نقاش الفصل'))); }, [store, hostUid, sessionId]);
  // The feed is optional for older rules: a read failure only hides Abboud's sentences and Badr/Reem, never the class.
  const [feedError, setFeedError] = useState('');
  useEffect(() => { if (!sessionId) { setFeed([]); return; } return store.watchFeed(hostUid, f => { setFeed(f && f.sessionId === sessionId ? f.items : []); setFeedError(''); }, e => setFeedError(liveErrorText(e, 'كلام عبود وبدر وريم'))); }, [store, hostUid, sessionId]);
  // The hand's truth is the participant doc: Abboud declining (or allowing) lowers it there, and the heartbeat must not re-raise it.
  useEffect(() => store.watchParticipants(hostUid, list => { const mine = list.find(p => p.uid === uid); if (mine) setHand(mine.hand); }, e => setReadError(liveErrorText(e, 'قائمة الحاضرين'))), [store, hostUid, uid]);
  // Presence: join the current session and refresh lastSeen while open; leave on close.
  useEffect(() => {
    if (!sessionId) return;
    setHand(false);
    const beat = () => store.join(hostUid, uid, sessionId, handRef.current).catch(e => setNotice(liveErrorText(e, 'الانضمام للفصل')));
    void beat();
    const t = setInterval(beat, HEARTBEAT_MS);
    return () => { clearInterval(t); void store.leave(hostUid, uid).catch(() => {}); };
  }, [store, hostUid, uid, sessionId]);
  // Live voice: answer Abboud's device's offer for this session.
  useEffect(() => {
    if (!sessionId) return;
    if (audio === false || (!audio && !liveAudioSupported())) { setVoiceState('off'); return; }
    const g = new GuestAudio(store, hostUid, uid, audio || {}, { onTracks: setTracks, onState: setVoiceState, onError: () => setVoiceState('failed') });
    live.current = g; setVoiceState('new');
    let first = true;
    const stop = store.watchSignal(hostUid, uid, signal => {
      // A leftover, already-answered offer (e.g. after reopening) cannot connect: ask for a fresh one.
      if (first && signal && signal.sessionId === sessionId && signal.answer && !signal.answer.startsWith('restart:')) { first = false; void g.requestRestart(); return; }
      first = false; void g.onSignal(signal, sessionId);
    }, () => setVoiceState('failed'));
    return () => { stop(); g.close(); live.current = null; setTracks([]); };
  }, [store, hostUid, uid, sessionId]); // eslint-disable-line react-hooks/exhaustive-deps
  // Abboud allowing the turn lowers the hand; losing the turn stops a running mic without sending anything.
  useEffect(() => { if (myTurn) setHand(false); else { live.current?.stopMic(); if (dictation.current) { dictation.current.cancel(); dictation.current = null; setListening(false); } } }, [myTurn]);
  useEffect(() => { dialog.current?.focus(); return () => dictation.current?.cancel(); }, []);
  useEffect(() => {
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') { e.preventDefault(); onClose(); } };
    window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key);
  }, [onClose]);

  const lines = useMemo(() => timeline(feed, messages, config, uid), [feed, messages, config, uid]);
  const heardLive = voiceState === 'connected';
  // Voicing on this device: Badr/Reem/Sara always (their own voices); Abboud and the speaker only when not heard live.
  const voice = useRef<ClassroomVoice | null>(null);
  const spoken = useRef<Set<string> | null>(null);
  const queue = useRef<TimelineEntry[]>([]); const playing = useRef(false);
  const play = useRef<LiveSpeak>(() => Promise.resolve());
  play.current = speak || defaultSpeak(voice.current ||= new ClassroomVoice());
  useEffect(() => () => voice.current?.stop(), []);
  useEffect(() => {
    if (!spoken.current) { spoken.current = new Set(lines.map(l => l.key)); return; } // what was said before joining is shown, not replayed
    for (const line of lines) {
      if (spoken.current.has(line.key)) continue;
      spoken.current.add(line.key);
      const ai = line.who === 'badr' || line.who === 'reem' || line.who === 'sara';
      if (muted || !(ai || (!heardLive && (line.who === 'abboud' || (line.who === 'student' && line.uid !== uid))))) continue;
      queue.current.push(line);
    }
    void (async () => {
      if (playing.current) return; playing.current = true;
      try { for (let next = queue.current.shift(); next; next = queue.current.shift()) { setSpeaking(next.who); await play.current(next); setSpeaking(null); } }
      finally { playing.current = false; setSpeaking(null); }
    })();
  }, [lines, muted, heardLive, uid]);
  function toggleMute() { const next = !muted; setMuted(next); if (next) { queue.current = []; voice.current?.stop(); } setBlocked(false); }

  const lesson = state ? lessonFor(state.lessonId, state.lessonTitle.replace(/^\S+\s/, '')) : undefined;
  const actions = useMemo(() => state ? abboudBoardActions({ lesson, lessonTitle: state.lessonTitle, source: tidyUtterance(state.source), checked: false, correction: null, responses: [], explained: state.explained, abboudSpeech: [state.source] }) : [],
    [state, lesson]);
  const me = nameOf(config, uid);
  const speakerName = state?.speaker ? (state.speaker === uid ? 'أنت' : nameOf(config, state.speaker)) : '';
  const latest = lines[lines.length - 1];
  const lastOf = (who: 'badr' | 'reem') => [...lines].reverse().find(l => l.who === who)?.text;

  async function toggleHand() {
    const next = !hand; setHand(next);
    try { await store.setHand(hostUid, uid, next); setNotice(''); } catch { setHand(!next); setNotice('تعذّر إرسال طلبك. حاول مجدداً.'); }
  }
  async function send(raw: string, via: 'mic' | 'text') {
    const clean = cleanText(via === 'mic' ? tidyUtterance(raw) : raw, MAX_MESSAGE);
    if (!clean || !sessionId) return;
    try { await store.postMessage(hostUid, { senderId: uid, text: clean, via, sessionId }); setText(''); setNotice(''); }
    catch { setNotice('لم يُرسل كلامك: دورك في الكلام انتهى أو انقطع الاتصال. ارفع يدك مجدداً.'); }
  }
  function mic() {
    if (dictation.current) { dictation.current.finish(); return; }
    const Constructor = window.SpeechRecognition || window.webkitSpeechRecognition;
    // Your live voice goes to Abboud (and everyone) while you talk; the text is sent when you finish.
    void live.current?.startMic().catch(() => setNotice('لم يُسمح بالميكروفون للصوت المباشر؛ سيُرسل كلامك نصاً فقط.'));
    if (!Constructor) { setNotice('هذا المتصفح لا يحوّل الكلام لنص. صوتك المباشر يصل إن كان متصلاً، واكتب سؤالك أيضاً.'); return; }
    const d: ContinuousDictation = new ContinuousDictation(() => new Constructor(), language, {
      onListening: () => setListening(true),
      onText: () => {}, // interim words stay private; only the finished sentence is shared
      onFinished: t => { dictation.current = null; setListening(false); live.current?.stopMic(); void send(t, 'mic'); },
      onError: (code, t) => { dictation.current = null; setListening(false); live.current?.stopMic(); setText(tidyUtterance(t)); setNotice(microphoneError(code)); },
      onPaused: (_r, t) => { dictation.current = null; setListening(false); live.current?.stopMic(); setText(tidyUtterance(t)); setNotice('توقّف الميكروفون. كلامك ظاهر؛ أرسله أو تابع.'); }
    });
    dictation.current = d; setNotice('');
    try { d.start(); } catch { dictation.current = null; live.current?.stopMic(); setNotice(microphoneError('start-failed')); }
  }
  const voiceLabel = voiceState === 'connected' ? `🎧 تسمع صوت ${config.hostName} مباشرة`
    : voiceState === 'off' ? '🔊 صوت آلي يقرأ جمل عبود (هذا المتصفح لا يدعم الصوت المباشر)'
    : voiceState === 'failed' || voiceState === 'disconnected' || voiceState === 'closed' ? '🔊 صوت آلي يقرأ جمل عبود (تعذّر الصوت المباشر على هذه الشبكة)'
    : '⏳ جاري توصيل صوت عبود المباشر… (حتى يتصل: صوت آلي يقرأ جمله)';

  return <div ref={dialog} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="abboud-live-title" dir="rtl" data-testid="abboud-live-guest" className="abboud-live-guest fixed inset-0 z-[300] bg-slate-950/95">
    <div className="abboud-live-guest-shell bg-slate-100 text-slate-900">
      <header className="abboud-live-guest-header">
        <h2 id="abboud-live-title" className="font-bold">👨‍🏫 فصل {config.hostName} المباشر</h2>
        <div className="flex gap-2">
          <button type="button" aria-pressed={muted} data-testid="abboud-live-mute" onClick={toggleMute} className="rounded-xl bg-white px-3 py-2 font-bold">{muted ? '🔇 الصوت مكتوم' : '🔊 الصوت يعمل'}</button>
          <button type="button" onClick={onClose} className="rounded-xl bg-white px-3 py-2 font-bold">خروج</button>
        </div>
      </header>
      {readError && <p role="alert" data-testid="abboud-live-error" className="abboud-live-guest-status bg-red-50 font-bold text-red-800">{readError}</p>}
      {!state?.active ? <div className="abboud-live-guest-main" data-testid="abboud-live-waiting-room">
        <div className="abboud-live-board" role="status">
          {!loaded ? <p className="abboud-live-board-text">⏳ جاري الاتصال بفصل {config.hostName}…</p>
            : readError ? <p className="abboud-live-board-text">لا يمكن عرض الفصل الآن بسبب الخطأ أعلاه.</p>
            : <>
              <h3 className="abboud-live-board-title">{wasLive ? '✅ انتهى الفصل المباشر' : '⏳ بانتظار عبود يبدأ الدرس'}</h3>
              <p className="abboud-live-board-text">{wasLive ? `شكراً لحضورك. إذا بدأ ${config.hostName} فصلاً جديداً سيظهر هنا تلقائياً.` : `المعلّم: ${config.hostName}. يبدأ الدرس من حسابه بالضغط على «📡 ابدأ الفصل المباشر»، وعندها تظهر هنا السبورة وكلامه مباشرة — لا تحتاج لتحديث الصفحة.`}</p>
            </>}
        </div>
      </div> : <>
        <p className="abboud-live-guest-status" aria-live="polite" data-testid="abboud-live-words">{latest
          ? <>🎙️ <b>{latest.name}:</b> <span dir="auto">{latest.text}</span></>
          : <>🎙️ <b>{config.hostName}</b> يستعد للشرح…</>}</p>
        <p className="abboud-live-voice" data-testid="abboud-live-voice-status">{muted ? '🔇 الصوت مكتوم على جهازك' : voiceLabel}
          {blocked && !muted && <button type="button" onClick={() => { setBlocked(false); document.querySelectorAll<HTMLAudioElement>('[data-testid="abboud-live-remote-audio"]').forEach(a => void a.play?.()?.catch?.(() => setBlocked(true))); voice.current?.unlock(); }} className="ms-2 rounded-lg bg-indigo-700 px-2 py-1 text-white">🔊 اضغط لتشغيل الصوت</button>}
          {(voiceState === 'failed' || voiceState === 'disconnected') && <button type="button" onClick={() => { setVoiceState('new'); void live.current?.requestRestart(); }} className="ms-2 rounded-lg border bg-white px-2 py-1">إعادة المحاولة</button>}
        </p>
        {tracks.map(t => <RemoteAudio key={t.id} track={t} muted={muted} onBlocked={() => setBlocked(true)} />)}
        <main className="abboud-live-guest-main">
          <section className="abboud-live-classmates" aria-label="بدر وريم في الفصل" data-testid="abboud-live-classmates">
            {(['badr', 'reem'] as const).map(id => <div key={id} data-testid={`abboud-live-${id}`} className={`abboud-live-mate ${speaking === id ? 'is-speaking' : ''}`}>
              <AbboudStudentFace id={id} speaking={speaking === id} className="abboud-live-mate-face" />
              <div className="min-w-0"><b>{id === 'badr' ? 'بدر' : 'ريم'}</b> <span className="text-xs">{speaking === id ? 'يتحدث الآن 🔊' : 'طالب في الفصل'}</span>
                {lastOf(id) && <p dir="auto" className="abboud-live-mate-text">{lastOf(id)}</p>}</div>
            </div>)}
          </section>
          <LiveBoard actions={actions} />
          <section aria-label="حوار الفصل" className="abboud-live-guest-chat" data-testid="abboud-live-timeline">
            {feedError && <p role="alert" className="text-xs text-amber-800">{feedError}</p>}
            {lines.length === 0 ? <p className="text-sm text-slate-500">لا كلام بعد. ارفع يدك لتسأل أو تشارك.</p>
              : <ol aria-live="polite">{lines.slice(-40).map(l => <li key={l.key} className={`abboud-live-line-${l.who}`}><b>{l.name}:</b> <span dir="auto">{l.text}</span>{l.via === 'mic' ? ' 🎙️' : ''}</li>)}</ol>}
          </section>
        </main>
        <footer className="abboud-live-guest-dock" data-testid="abboud-live-guest-dock">
          {notice && <p role="alert" className="abboud-dock-notice bg-amber-50 text-amber-900">{notice}</p>}
          {myTurn ? <>
            <p className="font-bold text-emerald-800">🎙️ دورك الآن يا {me} — {config.hostName} سمح لك بالكلام</p>
            <div className="abboud-live-guest-talk">
              <button type="button" onClick={mic} className={`rounded-full px-4 py-2 font-bold text-white ${listening ? 'bg-emerald-700' : 'bg-indigo-700'}`}>{listening ? '✅ خلصت — أرسل كلامي' : '🎙️ تكلّم'}</button>
              <select aria-label="لغة كلامك" value={language} disabled={listening} onChange={e => setLanguage(e.target.value)} className="rounded-lg border p-2"><option value="ar-SA">العربية</option><option value="en-US">English</option></select>
            </div>
            {listening && <p className="text-xs">🔴 صوتك يصل الآن للفصل؛ النص يُرسل عندما تضغط «خلصت».</p>}
            <form className="abboud-live-guest-talk" onSubmit={e => { e.preventDefault(); void send(text, 'text'); }}>
              <input aria-label="اكتب سؤالك أو مشاركتك" value={text} maxLength={MAX_MESSAGE} onChange={e => setText(e.target.value)} disabled={listening} className="min-w-0 flex-1 rounded-lg border p-2" />
              <button type="submit" disabled={listening || !text.trim()} className="rounded-lg bg-indigo-700 px-3 py-2 text-white disabled:opacity-40">إرسال</button>
            </form>
          </> : <>
            {speakerName && <p className="text-sm">🎙️ {speakerName} يتكلم الآن</p>}
            <button type="button" aria-pressed={hand} onClick={() => void toggleHand()} className={`rounded-full px-5 py-2 font-bold ${hand ? 'bg-amber-300 text-slate-900' : 'bg-indigo-700 text-white'}`}>
              {hand ? `✋ طلبك وصل لـ${config.hostName} — إلغاء الطلب` : '✋ أبغى أتكلم'}</button>
          </>}
        </footer>
      </>}
    </div>
  </div>;
}
