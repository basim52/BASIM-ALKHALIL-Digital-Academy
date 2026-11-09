import AbboudClassroomBoard from './AbboudClassroomBoard';
import { interactionError, type BoardCorrection } from '../lib/abboud/board';
import React, { useEffect, useRef, useState } from 'react';
import { SESSIONS_CONFIG } from '../lib/abboud/curriculum';
import { completeLesson, nextStage, parseReply, readCompleted, type BoardFocus, type Message, type Speaker, type Stage } from '../lib/abboud/protocol';
import { ClassroomVoice, type VoiceTurn } from '../lib/abboud/voice';
import { ContinuousDictation, microphoneError, type DictationPause } from '../lib/abboud/recognition';

export { SESSIONS_CONFIG } from '../lib/abboud/curriculum';
export interface AbboudTeacherProps { uid?: string; onClose: () => void }
type Phase = 'ready' | 'listening' | 'thinking' | 'speaking';
const names = { badr: 'بدر', reem: 'ريم', sara: 'سارة', abboud: 'عبود' };
const tasks: Record<Stage | 'complete', string> = {
  explain: 'أنت المعلّم يا عبود. اضغط الميكروفون واشرح بطريقتك؛ بدر وريم ينتظرانك.',
  answer: 'بدر عنده سؤال عن شرحك. جاوبه بصوتك.',
  correct: 'ريم تحاول وفي عبارتها خطأ واحد. اشرح لها التصحيح وسببه.',
  review_one: 'دورك تسأل: اطرح سؤال المراجعة الأول على بدر.',
  review_two: 'اطرح سؤال مراجعة ثانياً مختلفاً على ريم.',
  complete: 'اكتمل تفاعل هذا الدرس. يمكنك إعادة الشرح أو اختيار درس آخر، بلا نقاط أو مؤقّت.'
};

export const AbboudTeacherActivity: React.FC<AbboudTeacherProps> = ({ uid, onClose }) => {
  const [lessonId, setLessonId] = useState(1);
  const [boardExpanded, setBoardExpanded] = useState(false);
  const expandTrigger = useRef<HTMLButtonElement | null>(null);
  const workspace = useRef<HTMLElement | null>(null);
  const wasExpanded = useRef(false);
  const [stage, setStage] = useState<Stage | 'complete'>('explain');
  const [phase, setPhase] = useState<Phase>('ready');
  const [active, setActive] = useState<Speaker | 'abboud' | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastTurns, setLastTurns] = useState<VoiceTurn[]>([]);
  const [draft, setDraft] = useState('');
  const [boardSource, setBoardSource] = useState('');
  const [boardChecked, setBoardChecked] = useState(false);
  const [boardCorrection, setBoardCorrection] = useState<BoardCorrection | null>(null);
  const [boardResponses, setBoardResponses] = useState<Message[]>([]);
  const [boardResponseFocus, setBoardResponseFocus] = useState('');
  const [error, setError] = useState('');
  const [audioNotice, setAudioNotice] = useState('');
  const [typing, setTyping] = useState(false);
  const [muted, setMuted] = useState(false);
  const [language, setLanguage] = useState('ar-SA');
  const [completed, setCompleted] = useState<number[]>(() => readCompleted(localStorage, uid));
  const dialog = useRef<HTMLDivElement | null>(null);
  const generation = useRef(0);
  const mounted = useRef(false);
  const request = useRef<AbortController | null>(null);
  const recognition = useRef<ContinuousDictation | null>(null);
  /** Speech kept after a paused dictation so Abboud can continue it instead of starting over. */
  const [resumeText, setResumeText] = useState('');
  const voice = useRef<ClassroomVoice | null>(null);
  const busy = useRef(false);
  const mutedRef = useRef(muted);
  const lesson = SESSIONS_CONFIG.find(s => s.id === lessonId) || SESSIONS_CONFIG[0];

  function stop() {
    generation.current++;
    request.current?.abort(); request.current = null;
    recognition.current?.cancel(); recognition.current = null; setResumeText('');
    voice.current?.stop(); busy.current = false;
    setPhase('ready'); setActive(null);
  }
  function reset(id: number) {
    stop(); setLessonId(id); setStage('explain'); setMessages([]); setLastTurns([]); setDraft(''); setError(''); setAudioNotice(''); setTyping(false);
    setBoardSource(''); setBoardChecked(false); setBoardCorrection(null); setBoardResponses([]); setBoardResponseFocus('');
  }
  useEffect(() => {
    mounted.current = true;
    voice.current = new ClassroomVoice();
    setCompleted(readCompleted(localStorage, uid));
    reset(1);
    return () => {
      mounted.current = false; generation.current++;
      request.current?.abort(); recognition.current?.cancel(); recognition.current = null;
      voice.current?.stop(); busy.current = false;
    };
  }, [uid]);
  useEffect(() => {
    const previousFocus = document.activeElement;
    dialog.current?.focus();
    return () => { if (previousFocus instanceof HTMLElement) previousFocus.focus(); };
  }, []);
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      if (boardExpanded) setBoardExpanded(false);
      else onClose();
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [onClose, boardExpanded]);
  useEffect(() => {
    if (boardExpanded) workspace.current?.focus({ preventScroll: true });
    else if (wasExpanded.current) expandTrigger.current?.focus({ preventScroll: true });
    wasExpanded.current = boardExpanded;
  }, [boardExpanded]);

  async function play(turns: VoiceTurn[], id: number) {
    if (mutedRef.current || !voice.current) return;
    setPhase('speaking');
    try {
      await voice.current.play(turns, speaker => {
        if (mounted.current && id === generation.current) setActive(speaker);
      }, () => {
        if (mounted.current && id === generation.current) setAudioNotice('صوت الخدمة غير متاح؛ نحاول بصوت المتصفح. قد تختلف أصوات الشخصيات.');
      });
    } catch {
      if (mounted.current && id === generation.current) setAudioNotice('تعذّر تشغيل الصوت. النص الحقيقي ظاهر أدناه؛ اضغط إعادة الصوت للمحاولة.');
    } finally {
      if (mounted.current && id === generation.current) { setPhase('ready'); setActive(null); }
    }
  }
  async function submit(rawText: string) {
    const text = rawText.trim();
    if (busy.current || stage === 'complete' || !text.trim()) return;
    if (messages.length > 26) { setError('وصلنا لنهاية مساحة الحوار. أعد هذا الدرس لنبدأ حواراً جديداً.'); return; }
    stop(); voice.current?.unlock();
    busy.current = true; setPhase('thinking'); setError(''); setAudioNotice(''); setDraft(text);
    const id = generation.current;
    const controller = new AbortController(); request.current = controller;
    const timeout = setTimeout(() => controller.abort(), 45000);
    let failureStatus = 0;
    if (stage === 'explain') { setBoardSource(text); setBoardChecked(false); setBoardCorrection(null); setBoardResponses([]); }
    try {
      const response = await fetch('/api/sara/abboud-teacher', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: controller.signal,
        body: JSON.stringify({ sessionId: lessonId, stage, teacherSpeech: text, history: messages })
      });
      if (!response.ok) { failureStatus = response.status; throw new Error('CLASSROOM_REQUEST_FAILED'); }
      failureStatus = 502;
      const reply = parseReply(await response.json(), stage);
      failureStatus = 0;
      if (!mounted.current || id !== generation.current) return;
      if (stage === 'explain') setBoardChecked(reply.verdict === 'accurate');
      if (reply.misconception) setBoardCorrection({ ...reply.misconception, accepted: false });
      if (stage === 'correct' && reply.verdict === 'accurate') setBoardCorrection(previous => previous ? { ...previous, accepted: true } : null);
      const following = nextStage(stage, lessonId, reply.verdict);
      setMessages(prev => [...prev, { speaker: 'abboud', text }, ...reply.turns]);
      setLastTurns(reply.turns); setDraft(''); setStage(following);
      if (following === 'complete') setCompleted(completeLesson(localStorage, uid, lessonId));
      busy.current = false; setPhase('ready');
      clearTimeout(timeout); request.current = null;
      await play(reply.turns, id);
    } catch {
      if (!mounted.current || id !== generation.current) return;
      setError(interactionError(failureStatus));
    } finally {
      clearTimeout(timeout);
      if (mounted.current && id === generation.current) { busy.current = false; request.current = null; setPhase('ready'); setActive(null); }
    }
  }
  async function askBoard(boardFocus: BoardFocus) {
    if (busy.current || phase !== 'ready' || !boardSource || messages.length > 26) return;
    stop(); voice.current?.unlock(); busy.current = true;
    setPhase('thinking'); setError(''); setAudioNotice(''); setBoardResponses([]);
    const id = generation.current;
    const controller = new AbortController(); request.current = controller;
    const timeout = setTimeout(() => controller.abort(), 45000);
    let failureStatus = 0;
    const history = messages.some(m => m.speaker === 'abboud' && m.text === boardSource)
      ? messages : [...messages, { speaker: 'abboud', text: boardSource } satisfies Message];
    try {
      const response = await fetch('/api/sara/abboud-teacher', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: controller.signal,
        body: JSON.stringify({ sessionId: lessonId, stage: 'board', teacherSpeech: boardSource, history, boardFocus })
      });
      if (!response.ok) { failureStatus = response.status; throw new Error('CLASSROOM_REQUEST_FAILED'); }
      failureStatus = 502;
      const reply = parseReply(await response.json(), 'board', boardFocus.speaker);
      failureStatus = 0;
      if (!mounted.current || id !== generation.current) return;
      // Board exploration must not replace Badr's pending question, advance stages or earn progress.
      setBoardResponses(reply.turns); setBoardResponseFocus(boardFocus.text); setLastTurns(reply.turns);
      clearTimeout(timeout); request.current = null; busy.current = false;
      await play(reply.turns, id);
    } catch {
      if (mounted.current && id === generation.current) setError(interactionError(failureStatus));
    } finally {
      clearTimeout(timeout);
      if (mounted.current && id === generation.current) { busy.current = false; request.current = null; setPhase('ready'); setActive(null); }
    }
  }
  function readBoard(text: string) {
    if (phase !== 'ready') return;
    stop(); voice.current?.unlock(); setAudioNotice('');
    const turns = [{ speaker: 'sara', text } satisfies VoiceTurn];
    setLastTurns(turns); void play(turns, generation.current);
  }
  function startMic() {
    if (busy.current || stage === 'complete') return;
    const carried = resumeText;
    stop(); voice.current?.unlock(); setError(''); setAudioNotice(''); setDraft(carried);
    const Constructor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Constructor) { setError('هذا المتصفح لا يدعم التعرّف الصوتي. جرّب متصفحاً يدعمه أو افتح الكتابة الاختيارية.'); return; }
    const id = generation.current;
    const current = () => mounted.current && id === generation.current && recognition.current === dictation;
    const release = () => { recognition.current = null; setPhase('ready'); setActive(null); };
    // The mic keeps listening through pauses; only «خلصت» (finish) sends the whole explanation.
    const dictation: ContinuousDictation = new ContinuousDictation(() => new Constructor(), language, {
      onListening: () => { if (current()) { setPhase('listening'); setActive('abboud'); } },
      onText: text => { if (current()) setDraft(text); },
      onFinished: text => {
        if (!current()) return;
        release();
        if (text) void submit(text); else setError(microphoneError('no-speech'));
      },
      onError: (code, text) => {
        if (!current()) return;
        release(); setResumeText(text); setDraft(text); setError(microphoneError(code));
      },
      onPaused: (reason: DictationPause, text) => {
        if (!current()) return;
        release(); setResumeText(text); setDraft(text);
        setAudioNotice(reason === 'limit'
          ? 'مرّت ٣ دقائق فأوقفنا الميكروفون مؤقتاً. كلامك محفوظ ولم يُرسل: اضغط «أكمل الكلام» للمتابعة أو «إرسال الكلام المحفوظ» إذا خلصت.'
          : 'توقّف المتصفح عن الاستماع. كلامك محفوظ ولم يُرسل: اضغط «أكمل الكلام» للمتابعة أو «إرسال الكلام المحفوظ» إذا خلصت.');
      }
    }, carried);
    recognition.current = dictation;
    try { setPhase('listening'); dictation.start(); } catch { release(); setResumeText(carried); setError(microphoneError('start-failed')); }
  }
  function trapFocus(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'Tab') return;
    const controls = dialog.current?.querySelectorAll<HTMLElement>('button:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]');
    if (!controls?.length) return;
    const first = controls[0], last = controls[controls.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.current)) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
  const disabled = phase !== 'ready' || stage === 'complete';
  return (
    <div ref={dialog} tabIndex={-1} onKeyDown={trapFocus} className={`abboud-dialog fixed inset-0 z-[300] bg-slate-950/95 ${boardExpanded ? 'abboud-dialog-expanded' : ''}`} data-board-mode={boardExpanded ? 'expanded' : 'large'} dir="rtl" role="dialog" aria-modal="true" aria-labelledby="abboud-title" data-testid="abboud-classroom">
      <div className="abboud-shell mx-auto rounded-3xl bg-slate-100 text-slate-900 shadow-2xl">
        <header className="abboud-header">
          <div className="min-w-0 flex-1"><h2 id="abboud-title" className="text-xl font-bold sm:text-2xl">فصل عبود المعلّم</h2><p className="text-sm">أنت تشرح، بدر وريم يتعلّمان، وسارة تشرف بلطف.</p></div>
          <button ref={expandTrigger} type="button" data-testid="abboud-board-expand" aria-expanded={boardExpanded} aria-controls="abboud-workspace" onClick={() => setBoardExpanded(value => !value)} className="abboud-expand-toggle rounded-xl bg-indigo-700 px-3 py-3 font-bold text-white">{boardExpanded ? '↩ رجوع لحجم الفصل' : '⛶ توسعة السبورة'}</button>
          <button type="button" onClick={() => { stop(); onClose(); }} aria-label="إغلاق الفصل" className="shrink-0 rounded-xl bg-white px-3 py-3 font-bold">إغلاق</button>
        </header>
        <nav aria-label="الدروس القصيرة" className="abboud-lessons">
          <label className="block text-sm sm:hidden">الدرس القصير <select aria-label="اختر الدرس القصير" value={lessonId} onChange={e => reset(Number(e.target.value))} className="mr-2 min-w-0 max-w-full rounded-xl border bg-white p-2">{SESSIONS_CONFIG.map(s => <option key={s.id} value={s.id}>{s.emoji} {s.titleAr} {completed.includes(s.id) ? '✓' : ''}</option>)}</select></label>
          <div className="hidden flex-wrap gap-2 sm:flex">
          {SESSIONS_CONFIG.map(s => <button type="button" key={s.id} onClick={() => reset(s.id)} aria-pressed={lessonId === s.id} className={`rounded-xl px-3 py-2 text-sm ${lessonId === s.id ? 'bg-indigo-700 text-white' : 'bg-white'}`}>{s.emoji} {s.titleAr} {completed.includes(s.id) ? '✓' : ''}</button>)}
          </div>
        </nav>
        <section ref={workspace} id="abboud-workspace" tabIndex={-1} aria-label="الفصل الصغير" data-testid="abboud-workspace" className="abboud-workspace">
          <AbboudClassroomBoard source={boardSource} checked={boardChecked} correction={boardCorrection}
            responses={boardResponses} responseFocus={boardResponseFocus} busy={phase !== 'ready'} onAsk={focus => void askBoard(focus)} onRead={readBoard} />
          <aside className="abboud-students" aria-label="بدر وريم في الفصل" data-testid="abboud-students"><div className="abboud-student-list">
            {(['badr', 'reem'] satisfies Speaker[]).map(speaker => <div key={speaker} data-testid={`student-${speaker}`} className={`abboud-student-card rounded-2xl border-2 text-center transition-colors ${active === speaker ? 'border-indigo-500 bg-indigo-100' : 'border-amber-300 bg-white'}`}>
              <div aria-hidden="true" className="abboud-student-face">{speaker === 'badr' ? '👦🏻' : '👧🏻'}</div>
              <h3 className="font-bold">{names[speaker]}</h3>
              <p className="abboud-student-status">{active === speaker ? 'يتحدث الآن 🔊' : phase === 'listening' ? 'يستمع لشرحك' : 'طالب في فصلك'}</p>
              {lastTurns.find(t => t.speaker === speaker) && <p dir="auto" className="abboud-student-reply">{lastTurns.find(t => t.speaker === speaker)?.text}</p>}
              <div aria-hidden="true" className="abboud-student-desk rounded bg-amber-700" />
            </div>)}
          </div>
          <p className={`abboud-supervisor text-center ${active === 'sara' ? 'font-bold text-indigo-700' : 'text-slate-600'}`}>👩🏻‍🏫 سارة · {active === 'sara' ? 'تتحدث الآن' : 'مشرفة، والمعلّم هو عبود'}</p></aside>

        </section>
        <section aria-label="أدوات عبود التعليمية" data-testid="abboud-teacher-controls" className="abboud-controls text-center"><div className="abboud-teacher-dock">
          <p className="abboud-turn-status font-bold" aria-live="polite">{phase === 'thinking' ? 'الطالبان يفكّران في كلامك الفعلي…' : phase === 'listening' ? '🎙️ تكلّم براحتك يا عبود؛ الميكروفون يبقى مفتوحاً حتى تضغط «خلصت»' : tasks[stage]}</p>
          <div className="abboud-mic-row">
            <button type="button" data-testid="abboud-microphone" disabled={phase === 'thinking' || stage === 'complete'} aria-label={phase === 'listening' ? 'خلصت، أرسل كلامي للطالبين' : undefined} onClick={() => phase === 'listening' ? recognition.current?.finish() : startMic()} className="rounded-full bg-indigo-700 px-8 py-5 text-xl font-bold text-white disabled:opacity-40">{phase === 'listening' ? '✅ خلصت — أرسل كلامي' : resumeText ? '🎙️ أكمل الكلام' : '🎙️ اضغط وتحدّث يا عبود'}</button>
            <label className="text-sm">لغة كلامك <select aria-label="لغة التعرف الصوتي" value={language} disabled={phase !== 'ready'} onChange={e => setLanguage(e.target.value)} className="rounded-lg border p-2"><option value="ar-SA">العربية</option><option value="en-US">English</option></select></label>
          </div>
          <p className="abboud-mic-note text-xs text-slate-600">يحوّل المتصفح كلامك إلى نص ليفهمه الطالبان. لا مؤقّت ولا حاجة للحفظ.</p>
          <div className="abboud-voice-actions">
            <button type="button" onClick={stop} className="rounded-lg border px-4 py-2">إيقاف الصوت والميكروفون</button>
            <button type="button" aria-pressed={muted} onClick={() => { const next = !muted; mutedRef.current = next; setMuted(next); if (next) { voice.current?.stop(); if (phase === 'speaking') { setActive(null); setPhase('ready'); } } }} className="rounded-lg border px-4 py-2">{muted ? '🔇 إلغاء الكتم' : '🔊 كتم الردود'}</button>
            <button type="button" disabled={!lastTurns.length || muted || phase === 'listening' || phase === 'thinking'} onClick={() => { stop(); voice.current?.unlock(); void play(lastTurns, generation.current); }} className="rounded-lg border px-4 py-2 disabled:opacity-40">إعادة الصوت</button>
          </div>
          </div><div className="abboud-control-extras" tabIndex={0} aria-label="الكتابة الاختيارية وتفاصيل الفصل">
          {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-red-800">{error}</p>}
          {audioNotice && <p role="status" className="mt-3 rounded-xl bg-amber-50 p-3 text-amber-900">{audioNotice}</p>}
          {draft && !typing && <div className="mt-3 rounded-xl bg-white p-3"><p className="text-xs text-slate-500">{phase === 'listening' ? '🎙️ أسمعك الآن — لن يُرسل شيء قبل «خلصت»:' : 'ما التقطناه / كلامك المحفوظ:'}</p><p dir="auto" data-testid="abboud-live-transcript">{draft}</p>{phase === 'ready' && <button type="button" disabled={stage === 'complete'} onClick={() => void submit(draft)} className="mt-2 rounded-lg bg-indigo-700 px-4 py-2 text-white">إرسال الكلام المحفوظ مجدداً</button>}</div>}
          <button type="button" aria-expanded={typing} onClick={() => setTyping(!typing)} className="mt-5 text-sm underline">{typing ? 'إخفاء الكتابة' : 'الكتابة كبديل اختياري فقط'}</button>
          {typing && <form onSubmit={e => { e.preventDefault(); voice.current?.unlock(); void submit(draft); }} className="mx-auto mt-3 max-w-xl">
            <label htmlFor="abboud-fallback" className="block text-sm">كلام عبود (بديل الميكروفون)</label>
            <textarea id="abboud-fallback" maxLength={1200} value={draft} disabled={disabled} onChange={e => setDraft(e.target.value)} className="mt-2 w-full rounded-xl border bg-white p-3" />
            <button type="submit" disabled={disabled || !draft.trim()} className="rounded-xl bg-indigo-700 px-5 py-2 text-white disabled:opacity-40">إرسال كلامي للطالبين</button>
          </form>}
          {stage === 'complete' && <button type="button" onClick={() => reset(lessonId)} className="m-3 rounded-xl bg-emerald-700 px-5 py-3 text-white">إعادة الدرس بلا نقاط</button>}
        {messages.length > 0 && <section aria-label="حوار الفصل" aria-live="polite" className="mx-5 space-y-2 border-t py-4">{messages.map((message, i) => <p key={i} className="rounded-xl bg-white p-3"><strong>{names[message.speaker]}: </strong><span dir="auto">{message.text}</span></p>)}</section>}
        <footer className="p-4 text-center text-xs text-slate-500">نشاط اختياري منفصل عن تقدّم سارة وXP والشهادات. {uid ? 'إنجاز الدروس محفوظ لهذا الطالب على هذا الجهاز فقط.' : 'وضع ضيف: لا يُحفظ التقدّم.'}</footer>
          </div></section>
      </div>
    </div>
  );
};
export default AbboudTeacherActivity;
