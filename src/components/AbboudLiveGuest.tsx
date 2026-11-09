import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { BoardAction } from '../lib/boardActions';
import { abboudBoardActions } from '../lib/abboud/board';
import { lessonFor } from '../lib/abboud/curriculum';
import { canPost, cleanText, HEARTBEAT_MS, MAX_MESSAGE, nameOf, type LiveClassConfig, type LiveClassStore, type LiveMessage, type LiveState } from '../lib/abboud/liveClass';
import { ContinuousDictation, microphoneError } from '../lib/abboud/recognition';

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

/**
 * A registered student's seat in Abboud's live class, on their own device. They follow the board and Abboud's words,
 * and may talk (mic → text, or typing) only after raising a hand and Abboud allowing it. Leaving removes their seat.
 */
export default function AbboudLiveGuest({ store, uid, config, onClose }: { store: LiveClassStore; uid: string; config: LiveClassConfig; onClose: () => void }) {
  const hostUid = config.hostUid;
  const [state, setState] = useState<LiveState | null>(null);
  const [messages, setMessages] = useState<LiveMessage[]>([]);
  const [hand, setHand] = useState(false);
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);
  const [language, setLanguage] = useState('ar-SA');
  const [notice, setNotice] = useState('');
  const dictation = useRef<ContinuousDictation | null>(null);
  const dialog = useRef<HTMLDivElement | null>(null);
  const sessionId = state?.active ? state.sessionId : '';
  const myTurn = canPost(config, state, uid);
  const handRef = useRef(hand); handRef.current = hand;
  useEffect(() => store.watchState(hostUid, setState, () => setNotice('تعذّر الاتصال بفصل عبود. تحقّق من الإنترنت.')), [store, hostUid]);
  useEffect(() => { if (!sessionId) { setMessages([]); return; } return store.watchMessages(hostUid, sessionId, setMessages, () => {}); }, [store, hostUid, sessionId]);
  // The hand's truth is the participant doc: Abboud declining (or allowing) lowers it there, and the heartbeat must not re-raise it.
  useEffect(() => store.watchParticipants(hostUid, list => { const mine = list.find(p => p.uid === uid); if (mine) setHand(mine.hand); }, () => {}), [store, hostUid, uid]);
  // Presence: join the current session and refresh lastSeen while open; leave on close.
  useEffect(() => {
    if (!sessionId) return;
    setHand(false);
    const beat = () => store.join(hostUid, uid, sessionId, handRef.current).catch(() => setNotice('تعذّر الانضمام للفصل. ربما أزال المسؤول اسمك من القائمة.'));
    void beat();
    const t = setInterval(beat, HEARTBEAT_MS);
    return () => { clearInterval(t); void store.leave(hostUid, uid).catch(() => {}); };
  }, [store, hostUid, uid, sessionId]);
  // Abboud allowing the turn lowers the hand; losing the turn stops a running mic without sending anything.
  useEffect(() => { if (myTurn) setHand(false); else if (dictation.current) { dictation.current.cancel(); dictation.current = null; setListening(false); } }, [myTurn]);
  useEffect(() => { dialog.current?.focus(); return () => dictation.current?.cancel(); }, []);
  useEffect(() => {
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') { e.preventDefault(); onClose(); } };
    window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key);
  }, [onClose]);

  const lesson = state ? lessonFor(state.lessonId, state.lessonTitle.replace(/^\S+\s/, '')) : undefined;
  const actions = useMemo(() => state ? abboudBoardActions({ lesson, lessonTitle: state.lessonTitle, source: state.source, checked: false, correction: null, responses: [], explained: state.explained, abboudSpeech: [state.source] }) : [],
    [state, lesson]);
  const me = nameOf(config, uid);
  const speakerName = state?.speaker ? (state.speaker === uid ? 'أنت' : nameOf(config, state.speaker)) : '';

  async function toggleHand() {
    const next = !hand; setHand(next);
    try { await store.setHand(hostUid, uid, next); setNotice(''); } catch { setHand(!next); setNotice('تعذّر إرسال طلبك. حاول مجدداً.'); }
  }
  async function send(raw: string, via: 'mic' | 'text') {
    const clean = cleanText(raw, MAX_MESSAGE);
    if (!clean || !sessionId) return;
    try { await store.postMessage(hostUid, { senderId: uid, text: clean, via, sessionId }); setText(''); setNotice(''); }
    catch { setNotice('لم يُرسل كلامك: دورك في الكلام انتهى أو انقطع الاتصال. ارفع يدك مجدداً.'); }
  }
  function mic() {
    if (dictation.current) { dictation.current.finish(); return; }
    const Constructor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Constructor) { setNotice('هذا المتصفح لا يدعم التعرّف الصوتي. اكتب كلامك بدلاً من ذلك.'); return; }
    const d: ContinuousDictation = new ContinuousDictation(() => new Constructor(), language, {
      onListening: () => setListening(true),
      onText: t => setText(t),
      onFinished: t => { dictation.current = null; setListening(false); void send(t, 'mic'); },
      onError: (code, t) => { dictation.current = null; setListening(false); setText(t); setNotice(microphoneError(code)); },
      onPaused: (_r, t) => { dictation.current = null; setListening(false); setText(t); setNotice('توقّف الميكروفون. كلامك ظاهر؛ أرسله أو تابع.'); }
    });
    dictation.current = d; setNotice('');
    try { d.start(); } catch { dictation.current = null; setNotice(microphoneError('start-failed')); }
  }

  return <div ref={dialog} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="abboud-live-title" dir="rtl" data-testid="abboud-live-guest" className="abboud-live-guest fixed inset-0 z-[300] bg-slate-950/95">
    <div className="abboud-live-guest-shell bg-slate-100 text-slate-900">
      <header className="abboud-live-guest-header">
        <h2 id="abboud-live-title" className="font-bold">👨‍🏫 فصل {config.hostName} المباشر</h2>
        <button type="button" onClick={onClose} className="rounded-xl bg-white px-3 py-2 font-bold">خروج</button>
      </header>
      {!state?.active ? <p className="abboud-live-guest-status" role="status">انتهى الفصل المباشر أو لم يبدأ بعد. يظهر هنا تلقائياً عندما يبدأ {config.hostName}.</p> : <>
        <p className="abboud-live-guest-status" aria-live="polite" data-testid="abboud-live-words">🎙️ <b>{config.hostName}:</b> <span dir="auto">{state.draft || state.source || 'يستعد للشرح…'}</span></p>
        <main className="abboud-live-guest-main">
          <LiveBoard actions={actions} />
          <section aria-label="نقاش الطلاب" className="abboud-live-guest-chat">
            {messages.length === 0 ? <p className="text-sm text-slate-500">لا نقاش بعد. ارفع يدك لتسأل أو تشارك.</p>
              : <ol aria-live="polite">{messages.slice(-30).map(m => <li key={m.id}><b>{m.senderId === uid ? 'أنت' : nameOf(config, m.senderId)}:</b> <span dir="auto">{m.text}</span></li>)}</ol>}
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
