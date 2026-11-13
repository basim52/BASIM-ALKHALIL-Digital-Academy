import AbboudClassroomBoard from './AbboudClassroomBoard';
import AbboudStudentFace from './AbboudStudentFace';
import AbboudLessonPicker from './AbboudLessonPicker';
import AbboudSessionReport from './AbboudSessionReport';
import AbboudCertificate from './AbboudCertificate';
import { interactionError, type BoardCorrection } from '../lib/abboud/board';
import React, { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { CUSTOM_LESSON_ID, SESSIONS_CONFIG, customLesson } from '../lib/abboud/curriculum';
import { completeLesson, mistakeSpeaker, nextStage, parseReply, readCompleted, type BoardFocus, type Message, type Speaker, type Stage } from '../lib/abboud/protocol';
import { awardStar, buildReport, correctionStar, earnedCertificate, explanationStar, lessonKey, readAwards, readReports, saveName, saveReport, starCount, type SessionReport, type StarKind } from '../lib/abboud/awards';
import { TOPIC_IDEAS, sanitizeTopic, topicMessage } from '../lib/abboud/topic';
import { coveredItems, lessonItems } from '../lib/abboud/lessonBoard';
import { ClassroomVoice, type VoiceTurn } from '../lib/abboud/voice';
import { ContinuousDictation, microphoneError, type DictationPause } from '../lib/abboud/recognition';
import type { LiveClassStore } from '../lib/abboud/liveClass';
import { useLiveStore, useLiveUid } from '../lib/abboud/useLiveStore';
import type { AudioDeps } from '../lib/abboud/liveAudio';
import { LiveTrackAudio, AbboudLiveHostHeaderButton, AbboudLiveHostButton, AbboudLiveHostNotice, AbboudLiveHostPanel, useLiveHost } from './AbboudLiveHost';
const AbboudLiveJoin = lazy(() => import('./AbboudLiveJoin'));
// «ركّب الجملة»: picture sentence-building practice inside the class (static data; no stars, XP or progress).
const PictureSentenceBuilder = lazy(() => import('./PictureSentenceBuilder'));
/** For accounts that are not this class's teacher: who starts the live class, and the join entry if they are invited. */
function AbboudLiveViewer({ uid, liveStore, error }: { uid?: string; liveStore?: LiveClassStore | null; error: string }) {
  return <div className="abboud-live-viewer" data-testid="abboud-live-viewer">
    {error && <p role="alert" className="abboud-dock-notice bg-red-50 text-red-800">{error}</p>}
    <Suspense fallback={null}><AbboudLiveJoin uid={uid} liveStore={liveStore} variant="light" hint /></Suspense>
  </div>;
}

export { SESSIONS_CONFIG } from '../lib/abboud/curriculum';
export interface AbboudTeacherProps {
  uid?: string; onClose: () => void;
  /** Tests inject an in-memory store; the app lazily uses Firestore. Live class UI appears only if the admin set one up. */
  liveStore?: LiveClassStore | null;
  /** Live voice (WebRTC) dependencies for tests; false disables live voice. */
  liveAudio?: AudioDeps | false;
}
type Phase = 'ready' | 'listening' | 'thinking' | 'speaking';
const names = { badr: 'بدر', reem: 'ريم', sara: 'سارة', abboud: 'عبود' };
const tasks: Record<Stage | 'complete', string> = {
  explain: 'أنت المعلّم يا عبود. اضغط الميكروفون واشرح بطريقتك؛ بدر وريم ينتظرانك.',
  answer: 'بدر عنده سؤال عن شرحك. جاوبه بصوتك.',
  correct: '',
  review_one: 'دورك تسأل: اطرح سؤال المراجعة الأول على بدر.',
  review_two: 'اطرح سؤال مراجعة ثانياً مختلفاً على ريم.',
  complete: 'اكتمل تفاعل هذا الدرس. يمكنك إعادة الشرح أو اختيار درس آخر، بلا مؤقّت.'
};
/** The lesson's controlled error alternates between Reem (odd lessons) and Badr (even lessons). */
const correctTask = (lessonId: number) => mistakeSpeaker(lessonId) === 'reem'
  ? 'ريم تحاول وفي عبارتها خطأ واحد صغير. اكتشفه وصحّحه بصوتك وقل السبب.'
  : 'بدر يحاول وفي عبارته خطأ واحد صغير. اكتشفه وصحّحه بصوتك وقل السبب.';
const starText: Record<StarKind, string> = { explain: 'نجمة شرح', correction: 'نجمة تصحيح' };

export const AbboudTeacherActivity: React.FC<AbboudTeacherProps> = ({ uid, onClose, liveStore, liveAudio }) => {
  const [lessonId, setLessonId] = useState(1);
  const [boardExpanded, setBoardExpanded] = useState(false);
  const expandTrigger = useRef<HTMLButtonElement | null>(null);
  const workspace = useRef<HTMLElement | null>(null);
  const wasExpanded = useRef(false);
  /** Whichever control expanded the board (header or Sara's toolbar) gets focus back on return. */
  const expandOrigin = useRef<HTMLElement | null>(null);
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
  /** The dock's «⋯» menu (language, stop/mute/replay, typing, class log). Closed by default so the board keeps the screen. */
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggle = useRef<HTMLButtonElement | null>(null);
  const [liveOpen, setLiveOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [language, setLanguage] = useState('ar-SA');
  const [completed, setCompleted] = useState<number[]>(() => readCompleted(localStorage, uid));
  const [awards, setAwards] = useState(() => readAwards(localStorage, uid));
  const [reports, setReports] = useState<SessionReport[]>(() => readReports(localStorage, uid));
  const [report, setReport] = useState<SessionReport | null>(null);
  /** Stars earned during this run of the lesson (for the parent's summary); best-per-lesson lives in `awards`. */
  const [runStars, setRunStars] = useState<StarKind[]>([]);
  const [starNotice, setStarNotice] = useState('');
  const [certificateOpen, setCertificateOpen] = useState(false);
  const [sentenceOpen, setSentenceOpen] = useState(false);
  /** «درس من اختياري»: the cleaned topic Abboud picked (empty until chosen). */
  const [customTopic, setCustomTopic] = useState('');
  const [topicDraft, setTopicDraft] = useState('');
  const [topicNotice, setTopicNotice] = useState('');
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
  const custom = lessonId === CUSTOM_LESSON_ID;
  const choosingTopic = custom && !customTopic;
  const lesson = useMemo(() => custom ? customLesson(customTopic || 'درس من اختياري') : SESSIONS_CONFIG.find(s => s.id === lessonId) || SESSIONS_CONFIG[0], [custom, customTopic, lessonId]);
  const lessonTitle = `${lesson.emoji} ${lesson.titleAr}`;
  const currentKey = lessonKey(lessonId, custom ? customTopic : '');
  /** Only Abboud's own words (sent turns + what the mic is hearing now) can mark the board's lesson items. */
  const abboudSpeech = useMemo(() => [...messages.filter(m => m.speaker === 'abboud').map(m => m.text), ...(draft ? [draft] : [])], [messages, draft]);
  /** Lesson items he has said, kept for the whole lesson run (a cleared draft never un-marks them). */
  const [explained, setExplained] = useState<string[]>([]);
  const store = useLiveStore(liveStore);
  const liveUid = useLiveUid(uid, liveStore);
  // Real academy students (admin-allowlisted) can follow live; Badr and Reem are not involved in any of this.
  // Live class: only finished sentences are shared (never the interim mic text); Badr/Reem/Sara replies go to the feed.
  const host = useLiveHost(store, liveUid, { lessonId, lessonTitle, source: boardSource, draft: '', explained }, { aiSpeaking: active === 'badr' || active === 'reem' || active === 'sara', audio: liveAudio });
  useEffect(() => {
    const found = coveredItems(lesson, abboudSpeech);
    setExplained(previous => found.every(key => previous.includes(key)) ? previous : [...new Set([...previous, ...found])]);
  }, [lesson, abboudSpeech]); // eslint-disable-line react-hooks/exhaustive-deps

  function stop() {
    generation.current++;
    request.current?.abort(); request.current = null;
    recognition.current?.cancel(); recognition.current = null; setResumeText('');
    voice.current?.stop(); busy.current = false;
    setPhase('ready'); setActive(null);
  }
  function reset(id: number, keepTopic = false) {
    stop(); setLessonId(id); setStage('explain'); setMessages([]); setLastTurns([]); setDraft(''); setError(''); setAudioNotice(''); setTyping(false);
    setBoardSource(''); setBoardChecked(false); setBoardCorrection(null); setBoardResponses([]); setBoardResponseFocus('');
    setRunStars([]); setStarNotice(''); setReport(null); setTopicNotice(''); setExplained([]);
    if (!keepTopic) { setCustomTopic(''); setTopicDraft(''); }
  }
  function chooseTopic(raw: string) {
    const checked = sanitizeTopic(raw);
    if (checked.ok === false) { setTopicNotice(topicMessage(checked.reason)); return; }
    reset(CUSTOM_LESSON_ID); setCustomTopic(checked.topic); setTopicDraft(checked.topic);
  }
  useEffect(() => {
    mounted.current = true;
    voice.current = new ClassroomVoice();
    setCompleted(readCompleted(localStorage, uid)); setAwards(readAwards(localStorage, uid)); setReports(readReports(localStorage, uid));
    setCertificateOpen(false); reset(1);
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
      // Escape inside Sara's drawing canvas belongs to the board (cancel editing / deselect).
      if ((event.target as Partial<Element> | null)?.closest?.('.tl-container')) return;
      event.preventDefault();
      if (certificateOpen) setCertificateOpen(false);
      else if (menuOpen) { setMenuOpen(false); menuToggle.current?.focus({ preventScroll: true }); }
      else if (liveOpen) setLiveOpen(false);
      else if (boardExpanded) setBoardExpanded(false);
      else onClose();
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [onClose, boardExpanded, certificateOpen, menuOpen, liveOpen]);
  useEffect(() => {
    if (boardExpanded) workspace.current?.focus({ preventScroll: true });
    else if (wasExpanded.current) (expandOrigin.current?.isConnected ? expandOrigin.current : expandTrigger.current)?.focus({ preventScroll: true });
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
    if (busy.current || stage === 'complete' || choosingTopic || !text.trim()) return;
    if (messages.length > 26) { setError('وصلنا لنهاية مساحة الحوار. أعد هذا الدرس لنبدأ حواراً جديداً.'); return; }
    stop(); voice.current?.unlock();
    busy.current = true; setPhase('thinking'); setError(''); setAudioNotice(''); setDraft(text);
    const id = generation.current;
    const controller = new AbortController(); request.current = controller;
    const timeout = setTimeout(() => controller.abort(), 45000);
    let failureStatus = 0;
    if (stage === 'explain') { setBoardSource(text); setBoardChecked(false); setBoardCorrection(null); setBoardResponses([]); }
    void host.say('abboud', text);
    try {
      const response = await fetch('/api/sara/abboud-teacher', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: controller.signal,
        body: JSON.stringify({ sessionId: lessonId, stage, teacherSpeech: text, history: messages, ...(custom ? { customTopic } : {}) })
      });
      if (!response.ok) { failureStatus = response.status; throw new Error('CLASSROOM_REQUEST_FAILED'); }
      failureStatus = 502;
      const abboudSpeech = [...messages.filter(m => m.speaker === 'abboud').map(m => m.text), text];
      const reply = parseReply(await response.json(), stage, { sessionId: lessonId, abboudSpeech });
      failureStatus = 0;
      if (!mounted.current || id !== generation.current) return;
      if (stage === 'explain') setBoardChecked(reply.verdict === 'accurate');
      if (reply.misconception) setBoardCorrection({ ...reply.misconception, accepted: false });
      if (stage === 'correct' && reply.verdict === 'accurate') setBoardCorrection(previous => previous ? { ...previous, accepted: true } : null);
      // Stars only for evidence the validator accepted: Badr's grounded understanding, or a verified real correction.
      const earned: StarKind[] = [];
      if (explanationStar(stage, reply)) earned.push('explain');
      if (correctionStar(stage, reply, boardCorrection)) earned.push('correction');
      let nextAwards = awards;
      for (const kind of earned) nextAwards = awardStar(localStorage, uid, nextAwards, currentKey, kind);
      const lessonStars = [...new Set([...runStars, ...earned])];
      if (earned.length) {
        setAwards(nextAwards); setRunStars(lessonStars);
        setStarNotice(earned.map(kind => kind === 'explain'
          ? `⭐ ${starText.explain}! بدر فهم «${reply.understood?.concept}» من شرحك.`
          : `⭐ ${starText.correction}! اكتشفت خطأ ${names[boardCorrection?.speaker || 'reem']} وصحّحته: «${boardCorrection?.correct}».`).join(' ')
          + (earned.every(kind => awards.stars[currentKey]?.[kind]) ? ' (محسوبة لهذا الدرس من قبل)' : ''));
      }
      const following = nextStage(stage, lessonId, reply.verdict);
      const dialogue: Message[] = [...messages, { speaker: 'abboud', text }, ...reply.turns];
      setMessages(dialogue);
      setLastTurns(reply.turns); setDraft(''); setStage(following);
      if (following === 'complete') {
        setCompleted(completeLesson(localStorage, uid, lessonId));
        const items = lessonItems(lesson).length;
        const said = coveredItems(lesson, dialogue.filter(m => m.speaker === 'abboud').map(m => m.text));
        const covered = items ? [...new Set([...explained, ...said])].length : 0;
        const summary = { ...buildReport(dialogue, lessonTitle, lessonStars.length, reply.praise), ...(items ? { covered: `${covered} من ${items}` } : {}) };
        setReport(summary); setReports(saveReport(localStorage, uid, summary));
      }
      busy.current = false; setPhase('ready');
      clearTimeout(timeout); request.current = null;
      for (const turn of reply.turns) void host.say(turn.speaker, turn.text);
      await play(reply.turns, id);
    } catch {
      if (!mounted.current || id !== generation.current) return;
      setError(interactionError(failureStatus));
    } finally {
      clearTimeout(timeout);
      if (mounted.current && id === generation.current) { busy.current = false; request.current = null; setPhase('ready'); setActive(null); }
    }
  }
  function toggleBoard(next: boolean) {
    // Only a focused button counts (Safari does not focus buttons on click); otherwise return to the header toggle.
    if (next) expandOrigin.current = document.activeElement instanceof HTMLButtonElement ? document.activeElement : null;
    setBoardExpanded(next);
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
        body: JSON.stringify({ sessionId: lessonId, stage: 'board', teacherSpeech: boardSource, history, boardFocus, ...(custom ? { customTopic } : {}) })
      });
      if (!response.ok) { failureStatus = response.status; throw new Error('CLASSROOM_REQUEST_FAILED'); }
      failureStatus = 502;
      const reply = parseReply(await response.json(), 'board', { sessionId: lessonId, boardSpeaker: boardFocus.speaker });
      failureStatus = 0;
      if (!mounted.current || id !== generation.current) return;
      // Board exploration must not replace Badr's pending question, advance stages or earn progress.
      setBoardResponses(reply.turns); setBoardResponseFocus(boardFocus.text); setLastTurns(reply.turns);
      clearTimeout(timeout); request.current = null; busy.current = false;
      for (const turn of reply.turns) void host.say(turn.speaker, turn.text);
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
    setLastTurns(turns); void host.say('sara', text); void play(turns, generation.current);
  }
  function startMic() {
    if (busy.current || stage === 'complete') return;
    // While picking «درس من اختياري», the same continuous mic captures the topic; nothing goes to the AI.
    const topicMode = choosingTopic;
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
        if (!text) setError(microphoneError('no-speech'));
        else if (topicMode) { setDraft(''); chooseTopic(text); }
        else void submit(text);
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
    // Controls inside the closed «⋯» menu are not focusable, so they cannot be the trap's first/last stop.
    const controls = Array.from(dialog.current?.querySelectorAll<HTMLElement>('button:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]') || []).filter(el => !el.closest('[hidden]'));
    if (!controls.length) return;
    const first = controls[0], last = controls[controls.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.current)) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
  const disabled = phase !== 'ready' || stage === 'complete';
  const status = phase === 'thinking' ? 'الطالبان يفكّران في كلامك الفعلي…'
    : phase === 'listening' ? (choosingTopic ? '🎙️ قل الموضوع الذي تحبه، ثم اضغط «خلصت»' : '🎙️ تكلّم براحتك يا عبود؛ الميكروفون يبقى مفتوحاً حتى تضغط «خلصت»')
    : choosingTopic ? '✨ درس من اختيارك: قل أو اكتب موضوعاً تحبه، وسيصير درس اليوم.'
    : stage === 'correct' ? correctTask(lessonId) : tasks[stage];
  return (
    <div ref={dialog} tabIndex={-1} onKeyDown={trapFocus} className={`abboud-dialog fixed inset-0 z-[300] bg-slate-950/95 ${boardExpanded ? 'abboud-dialog-expanded' : ''}`} data-board-mode={boardExpanded ? 'expanded' : 'large'} dir="rtl" role="dialog" aria-modal="true" aria-labelledby="abboud-title" data-testid="abboud-classroom">
      <div className="abboud-shell mx-auto rounded-3xl bg-slate-100 text-slate-900 shadow-2xl">
        <header className="abboud-header">
          <div className="min-w-0 flex-1"><h2 id="abboud-title" className="text-xl font-bold sm:text-2xl">فصل عبود المعلّم</h2><p className="text-sm">أنت تشرح، بدر وريم يتعلّمان، وسارة تشرف بلطف.</p></div>
          <AbboudLiveHostHeaderButton host={host} open={liveOpen} onOpen={setLiveOpen} />
          <button ref={expandTrigger} type="button" data-testid="abboud-board-expand" aria-expanded={boardExpanded} aria-controls="abboud-workspace" onClick={() => toggleBoard(!boardExpanded)} className="abboud-expand-toggle rounded-xl bg-indigo-700 px-3 py-3 font-bold text-white">{boardExpanded ? '↩ رجوع لحجم الفصل' : '⛶ توسعة السبورة'}</button>
          <button type="button" data-testid="abboud-sentence-builder-open" onClick={() => { stop(); setSentenceOpen(true); }} className="shrink-0 rounded-xl bg-[#0A1533] px-3 py-3 font-bold text-yellow-300" style={{ boxShadow: '0 0 10px #6366f1aa' }}>🧩 ركّب الجملة</button>
          <button type="button" onClick={() => { stop(); onClose(); }} aria-label="إغلاق الفصل" className="shrink-0 rounded-xl bg-white px-3 py-3 font-bold">إغلاق</button>
        </header>
        {!host.config && <AbboudLiveViewer uid={liveUid} liveStore={liveStore} error={host.error} />}
        <AbboudLessonPicker lessonId={lessonId} completed={completed} stars={starCount(awards)} certificate={earnedCertificate(completed)}
          onPick={id => reset(id)} onCertificate={() => setCertificateOpen(true)} />
        <section ref={workspace} id="abboud-workspace" tabIndex={-1} aria-label="الفصل الصغير" data-testid="abboud-workspace" className="abboud-workspace">
          <AbboudClassroomBoard lesson={lesson} explained={explained} abboudSpeech={abboudSpeech} lessonTitle={lessonTitle} source={boardSource} checked={boardChecked} correction={boardCorrection}
            responses={boardResponses} responseFocus={boardResponseFocus} busy={phase !== 'ready'} saraSpeaking={active === 'sara'}
            expanded={boardExpanded} onExpandedChange={toggleBoard} onAsk={focus => void askBoard(focus)} onRead={readBoard} />
          <aside className="abboud-students" aria-label="بدر وريم في الفصل" data-testid="abboud-students"><div className="abboud-student-list">
            {(['badr', 'reem'] satisfies Speaker[]).map(speaker => <div key={speaker} data-testid={`student-${speaker}`} className={`abboud-student-card rounded-2xl border-2 text-center transition-colors ${active === speaker ? 'border-indigo-500 bg-indigo-100' : 'border-amber-300 bg-white'}`}>
              <AbboudStudentFace id={speaker} speaking={active === speaker} />
              <h3 className="font-bold">{names[speaker]}</h3>
              <p className="abboud-student-status">{active === speaker ? 'يتحدث الآن 🔊' : phase === 'listening' ? 'يستمع لشرحك' : 'طالب في فصلك'}</p>
              {lastTurns.find(t => t.speaker === speaker) && <p dir="auto" className="abboud-student-reply">{lastTurns.find(t => t.speaker === speaker)?.text}</p>}
              <div aria-hidden="true" className="abboud-student-desk rounded bg-amber-700" />
            </div>)}
          </div>
          <p className={`abboud-supervisor text-center ${active === 'sara' ? 'font-bold text-indigo-700' : 'text-slate-600'}`}>👩🏻‍🏫 سارة · {active === 'sara' ? 'تتحدث الآن' : 'مشرفة، والمعلّم هو عبود'}</p></aside>

        </section>
        <section aria-label="أدوات عبود التعليمية" data-testid="abboud-teacher-controls" className="abboud-controls"><div className="abboud-teacher-dock">
          {/* One slim row in the layout flow (never sticky over the board): face, mic/«خلصت», short hint, ⋯ menu. */}
          <div className="abboud-dock-row" data-testid="abboud-dock-row">
            {/* Abboud is the teacher: his face talks from the mic press until «خلصت», and listens otherwise. */}
            <AbboudStudentFace id="abboud" speaking={phase === 'listening'} className="abboud-teacher-face" />
            <button type="button" data-testid="abboud-microphone" disabled={phase === 'thinking' || stage === 'complete'} aria-label={phase === 'listening' ? (choosingTopic ? 'خلصت، هذا موضوعي' : 'خلصت، أرسل كلامي للطالبين') : undefined} onClick={() => phase === 'listening' ? recognition.current?.finish() : startMic()} className={`abboud-mic-button rounded-full font-bold text-white disabled:opacity-40 ${phase === 'listening' ? 'bg-emerald-700' : 'bg-indigo-700'}`}>{phase === 'listening' ? (choosingTopic ? '✅ خلصت — هذا موضوعي' : '✅ خلصت — أرسل كلامي') : choosingTopic ? '🎙️ قل موضوعك' : resumeText ? '🎙️ أكمل الكلام' : '🎙️ اضغط وتحدّث يا عبود'}</button>
            <p className="abboud-turn-status font-bold" aria-live="polite" title={status}>{status}</p>
            <AbboudLiveHostButton host={host} open={liveOpen} onToggle={() => setLiveOpen(!liveOpen)} />
            <button ref={menuToggle} type="button" data-testid="abboud-dock-menu-toggle" aria-expanded={menuOpen} aria-controls="abboud-dock-menu" aria-label="المزيد: لغة الكلام، الصوت، الكتابة والحوار" title="المزيد" onClick={() => setMenuOpen(!menuOpen)} className="abboud-dock-more rounded-full border bg-white font-bold">⋯</button>
          </div>
          {draft && !typing && <div className="abboud-live-line" data-testid="abboud-live-line"><span className="abboud-live-label">{phase === 'listening' ? '🎙️ أسمعك الآن — لن يُرسل شيء قبل «خلصت»:' : 'كلامك المحفوظ:'}</span> <span dir="auto" data-testid="abboud-live-transcript" className="abboud-live-text">{draft}</span>{phase === 'ready' && <button type="button" disabled={stage === 'complete'} onClick={() => void submit(draft)} className="abboud-live-resend rounded-lg bg-indigo-700 text-white">إرسال الكلام المحفوظ مجدداً</button>}</div>}
          <AbboudLiveHostNotice host={host} />
          <LiveTrackAudio track={host.speakerTrack} />
          {liveOpen && <AbboudLiveHostPanel host={host} />}
          {starNotice && <p role="status" data-testid="abboud-star-notice" className="abboud-star-notice">{starNotice}</p>}
          {error && <p role="alert" className="abboud-dock-notice bg-red-50 text-red-800">{error}</p>}
          {audioNotice && <p role="status" className="abboud-dock-notice bg-amber-50 text-amber-900">{audioNotice}</p>}
          {choosingTopic && <form data-testid="abboud-topic-picker" className="abboud-topic-picker" onSubmit={e => { e.preventDefault(); chooseTopic(topicDraft); }}>
            <label className="text-sm">موضوعي <input value={topicDraft} maxLength={60} disabled={phase !== 'ready'} onChange={e => { setTopicDraft(e.target.value); setTopicNotice(''); }} placeholder="مثل: كرة القدم" className="mr-1 min-w-0 rounded-lg border p-2" /></label>
            <button type="submit" disabled={phase !== 'ready' || !topicDraft.trim()} className="rounded-lg bg-amber-400 px-3 py-2 font-bold text-slate-900 disabled:opacity-40">اعتمد الموضوع</button>
            <span className="abboud-topic-ideas" aria-label="أفكار مواضيع">{TOPIC_IDEAS.map(idea => <button type="button" key={idea} disabled={phase !== 'ready'} onClick={() => chooseTopic(idea)} className="rounded-full border bg-white px-2 py-1 text-xs">{idea}</button>)}</span>
            {topicNotice && <p role="status" className="w-full text-sm text-amber-800">{topicNotice}</p>}
          </form>}
          {custom && customTopic && <p className="abboud-topic-line text-xs">✨ موضوعك: <b dir="auto">{customTopic}</b> <button type="button" disabled={phase !== 'ready'} onClick={() => reset(CUSTOM_LESSON_ID)} className="underline disabled:opacity-40">تغيير الموضوع</button></p>}
          </div>
          {/* «⋯»: secondary voice/typing controls, the class log and the privacy note — one tap (or Enter) away, never on the board. */}
          <div id="abboud-dock-menu" data-testid="abboud-dock-menu" hidden={!menuOpen} role="group" aria-label="خيارات الصوت والكتابة والحوار" className="abboud-dock-menu">
            <label className="text-sm">لغة كلامك <select aria-label="لغة التعرف الصوتي" value={language} disabled={phase !== 'ready'} onChange={e => setLanguage(e.target.value)} className="rounded-lg border p-2"><option value="ar-SA">العربية</option><option value="en-US">English</option></select></label>
            <p className="abboud-mic-note text-xs text-slate-600">يحوّل المتصفح كلامك إلى نص ليفهمه الطالبان. لا مؤقّت ولا حاجة للحفظ.</p>
            <div className="abboud-voice-actions">
              <button type="button" onClick={stop} className="rounded-lg border bg-white px-4 py-2">إيقاف الصوت والميكروفون</button>
              <button type="button" aria-pressed={muted} onClick={() => { const next = !muted; mutedRef.current = next; setMuted(next); if (next) { voice.current?.stop(); if (phase === 'speaking') { setActive(null); setPhase('ready'); } } }} className="rounded-lg border bg-white px-4 py-2">{muted ? '🔇 إلغاء الكتم' : '🔊 كتم الردود'}</button>
              <button type="button" disabled={!lastTurns.length || muted || phase === 'listening' || phase === 'thinking'} onClick={() => { stop(); voice.current?.unlock(); void play(lastTurns, generation.current); }} className="rounded-lg border bg-white px-4 py-2 disabled:opacity-40">إعادة الصوت</button>
              <button type="button" aria-expanded={typing} onClick={() => { if (!typing) setMenuOpen(false); setTyping(!typing); }} className="rounded-lg border bg-white px-4 py-2 underline">{typing ? 'إخفاء الكتابة' : 'الكتابة كبديل اختياري فقط'}</button>
            </div>
            {stage !== 'complete' && <AbboudSessionReport report={null} history={reports} name={awards.name} guest={!uid} />}
            {messages.length > 0 && <section aria-label="حوار الفصل" className="abboud-class-log space-y-2 border-t pt-2">{messages.map((message, i) => <p key={i} className="rounded-xl bg-white p-2"><strong>{names[message.speaker]}: </strong><span dir="auto">{message.text}</span></p>)}</section>}
            <p className="abboud-privacy-note text-xs text-slate-500">نشاط اختياري منفصل عن تقدّم سارة وXP وشهادات الأكاديمية. {uid ? 'إنجاز الدروس ونجوم المعلّم وشهادة «معلّم صغير» وملخصات الحصص محفوظة لهذا الطالب على هذا الجهاز فقط.' : 'وضع ضيف: لا يُحفظ التقدّم ولا النجوم.'}</p>
          </div>
          {(typing || stage === 'complete') && <div className="abboud-control-extras" data-testid="abboud-control-extras">
          {typing && <form onSubmit={e => { e.preventDefault(); voice.current?.unlock(); void submit(draft); }} className="abboud-typing mx-auto max-w-xl">
            <label htmlFor="abboud-fallback" className="block text-sm">كلام عبود (بديل الميكروفون)</label>
            <textarea id="abboud-fallback" maxLength={1200} value={draft} disabled={disabled} onChange={e => setDraft(e.target.value)} className="mt-1 w-full rounded-xl border bg-white p-2" />
            <button type="submit" disabled={disabled || !draft.trim()} className="rounded-xl bg-indigo-700 px-5 py-2 text-white disabled:opacity-40">إرسال كلامي للطالبين</button>
          </form>}
          {stage === 'complete' && <button type="button" onClick={() => reset(lessonId, true)} className="m-2 rounded-xl bg-emerald-700 px-5 py-3 text-white">إعادة الدرس (النجوم لا تتكرر)</button>}
          {stage === 'complete' && earnedCertificate(completed) && !custom && <button type="button" onClick={() => setCertificateOpen(true)} className="m-2 rounded-xl bg-amber-400 px-5 py-3 font-bold text-slate-900">🎓 أكملت الدروس الـ15! افتح شهادة «معلّم صغير»</button>}
          {stage === 'complete' && <AbboudSessionReport report={report} history={reports} name={awards.name} guest={!uid} />}
          </div>}
        </section>
      </div>
      {sentenceOpen && <Suspense fallback={null}><PictureSentenceBuilder onClose={() => setSentenceOpen(false)} /></Suspense>}
      {certificateOpen && <AbboudCertificate name={awards.name} stars={starCount(awards)} onName={name => setAwards(current => saveName(localStorage, uid, current, name))} onClose={() => setCertificateOpen(false)} />}
    </div>
  );
};
export default AbboudTeacherActivity;
