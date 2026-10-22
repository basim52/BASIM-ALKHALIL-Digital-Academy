import ExplainLangToggle from './ExplainLangToggle';
import { useExplainLang, useLessonView, englishLessonAsync, L } from '../lib/explainLang';
import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { X, ArrowRight, Lock, Volume2, Square, CheckCircle2, Mic, Send } from 'lucide-react';
import { auth } from '../lib/firebase';
import { CompletionCertificateModal, type CertificateData } from './CompletionCertificateModal';
import type { SaraTrack, SaraTrackLesson, SaraChoiceQuestion } from '../data/saraTracks/foundations';
import { prefetchAcademyAudio, cancelAllSpeech, createManagedAudio } from '../lib/audio';
import { boardLinesToSpeech } from '../utils/boardToSpeech';
import { LEGACY_TRACK_IDS, migrateLegacyCount } from '../data/saraTracks/fromCurriculum';
import { pushTrackProgress, markLastTrack } from '../lib/saraProgressSync';
import SaraLessonCall, { lessonCallPreset, freeCallPresetFor } from './SaraLessonCall';
import SaraSentenceBuilder from './SaraSentenceBuilder';
import { SaraLivePhoneCallModal } from './SaraLivePhoneCallModal';
import { toToolCalls, type BoardAction } from '../lib/boardActions';
const TutorTldrawBoard = lazy(() => import('./TutorTldrawBoard'));
import { trackLevels, buildLevelTest, scoreLevelTest, saveLevelTestAttempt, LEVEL_TEST_PASS, type LevelTestQuestion, type LevelTestAttempt } from '../lib/saraLevelTests';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  track: SaraTrack;
  uid?: string;
  /** Admin/parent preview: every lesson open. */
  unlockAll?: boolean;
  /** Open straight into this lesson (home "continue" card). */
  initialLessonId?: string;
}

// ---- Sara narrator: same cloud voice as her chat (Gemini 'Kore' via /api/tts), one primed <audio> element.
// The element is "unlocked" inside the user's tap, so mobile browsers allow the later playback.
const SILENT_WAV = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
let narratorEl: HTMLAudioElement | null = null;
let narratorToken = 0;
function getNarrator(): HTMLAudioElement {
  if (!narratorEl) { narratorEl = createManagedAudio(); narratorEl.preload = 'auto'; }
  return narratorEl;
}
/** Call synchronously inside a click/tap handler. */
function unlockNarrator() {
  const el = getNarrator();
  try { el.src = SILENT_WAV; const p = el.play(); if (p) p.catch(() => {}); } catch { /* ignore */ }
}
function stopNarrator() {
  narratorToken++;
  narratorPaused = false;
  if (narratorEl) { try { narratorEl.pause(); narratorEl.removeAttribute('src'); narratorEl.load(); } catch { /* ignore */ } }
}
async function playB64(b64: string): Promise<void> {
  const token = ++narratorToken;
  cancelAllSpeech();
  const el = getNarrator();
  const url = URL.createObjectURL(new Blob([Uint8Array.from(atob(b64), c => c.charCodeAt(0))], { type: 'audio/wav' }));
  el.src = url;
  await new Promise<void>(r => { el.onended = () => r(); el.onerror = () => r(); el.play().catch(() => r()); });
  URL.revokeObjectURL(url);
  void token;
}
let narratorPaused = false;
const wait = (ms: number) => new Promise(r => setTimeout(r, ms));
const lessonAudioCache = new Map<string, string>(); // text → object URL (this session)

/**
 * Sara's real (cloud) voice for a whole lesson page in ONE request. The GET is CDN-cached for a year,
 * so a page is generated once for everybody. Retries with backoff; never substitutes another voice.
 */
async function fetchLessonAudio(text: string, token: number, voice = 'Kore'): Promise<string | null> {
  const ck = voice === 'Kore' ? text : `${voice}|${text}`;
  const hit = lessonAudioCache.get(ck);
  if (hit) return hit;
  const delays = [0, 2500, 6000];
  for (const d of delays) {
    if (d) await wait(d);
    if (token !== narratorToken) return null;
    try {
      const tok = auth.currentUser ? await auth.currentUser.getIdToken().catch(() => '') : '';
      const r = await fetch(`/api/tts/lesson?v=${encodeURIComponent(voice)}&t=${encodeURIComponent(text)}`, tok ? { headers: { Authorization: `Bearer ${tok}` } } : undefined);
      if (r.ok && (r.headers.get('content-type') || '').includes('audio')) {
        const url = URL.createObjectURL(await r.blob());
        lessonAudioCache.set(ck, url);
        return url;
      }
      if (r.status === 503) { const j = await r.json().catch(() => ({})); if (j?.quotaExhausted) return null; }
    } catch { /* network: retry */ }
  }
  return null;
}
export function pauseNarrator() { narratorPaused = true; if (narratorEl) { try { narratorEl.pause(); } catch { /* ignore */ } } }
export function resumeNarrator() {
  narratorPaused = false;
  if (narratorEl && narratorEl.src && !narratorEl.ended) { try { const p = narratorEl.play(); if (p) p.catch(() => {}); } catch { /* ignore */ } }
}
/** Play the full page text in Sara's voice. onFailed → show «إعادة المحاولة» (no substitute voice). */
async function narrate(text: string, onBlocked: () => void, onFailed: () => void, onDone: () => void, voice = 'Kore') {
  const token = ++narratorToken;
  cancelAllSpeech(); // nothing else speaks at the same time
  narratorPaused = false;
  const url = await fetchLessonAudio(text, token, voice);
  if (token !== narratorToken) return;
  if (!url) { onFailed(); return; }
  while (narratorPaused) { await wait(150); if (token !== narratorToken) return; }
  const el = getNarrator();
  el.src = url;
  const ok = await new Promise<boolean>(resolve => {
    el.onended = () => resolve(true);
    el.onerror = () => resolve(true);
    el.play().catch(err => resolve(err?.name === 'NotAllowedError' ? false : true));
  });
  if (token !== narratorToken) return;
  if (!ok) { onBlocked(); return; }
  onDone();
}


export const progressKey = (trackId: string, uid?: string) => `sara_track_${trackId}_${uid || 'guest'}`;
export const readUnlocked = (trackId: string, uid?: string) => {
  try {
    const legacy = LEGACY_TRACK_IDS[trackId];
    if (legacy && localStorage.getItem(progressKey(trackId, uid)) === null) {
      const old = Number(localStorage.getItem(progressKey(legacy, uid))) || 1;
      if (old > 1) localStorage.setItem(progressKey(trackId, uid), String(migrateLegacyCount(old)));
    }
    return Math.max(1, Number(localStorage.getItem(progressKey(trackId, uid))) || 1); } catch { return 1; }
};

/** Lines shown on the lesson page = exactly what Sara reads. */
export function lessonPageLines(lesson: SaraTrackLesson, useAlt: boolean): string[] {
  const c = lesson.content!;
  return [lesson.titleAr, useAlt ? c.altExplanationAr : c.explanationAr, ...c.example.map(e => e.en)];
}

/** The same lesson page, written step by step on the tutor tldraw board (Noura's board): what is written = what Sara reads. */
export function lessonBoardActions(lesson: SaraTrackLesson, useAlt: boolean): BoardAction[] {
  const c = lesson.content!;
  const sentences = (useAlt ? c.altExplanationAr : c.explanationAr).split(/(?<=[.!؟?])\s+/).map(x => x.trim()).filter(Boolean);
  return [
    { kind: 'title', text: lesson.titleEn },
    { kind: 'text', text: lesson.titleAr },
    ...sentences.map(t => ({ kind: 'text' as const, text: t })),
    ...c.example.map(e => ({ kind: 'example' as const, en: e.en, ar: e.ar })),
  ];
}

const Choice: React.FC<{ q: SaraChoiceQuestion; picked: number | null; onPick: (i: number) => void; locked?: boolean }> = ({ q, picked, onPick, locked }) => (
  <div className="space-y-1.5">
    <p className="text-[13px] font-black text-slate-800 leading-snug">{q.promptAr}{q.promptEn && <span dir="ltr" className="block text-[#002147] font-bold">{q.promptEn}</span>}</p>
    <div className="grid gap-1.5">
      {q.options.map((o, i) => {
        const state = picked === null ? '' : i === q.correctIndex && picked === i ? 'bg-emerald-100 border-emerald-500' : picked === i ? 'bg-rose-100 border-rose-400' : 'opacity-70';
        return (
          <button key={i} disabled={locked} onClick={() => onPick(i)} dir="auto"
            className={`w-full text-start px-3 py-1 rounded-xl border-2 border-slate-200 bg-white text-[13px] font-bold active:scale-[0.99] ${state}`}>{o}</button>
        );
      })}
    </div>
  </div>
);

/** Tracks that get «حاور سارة» after the exercises (Conversation + Grammar: foundations, advanced). */
const CALL_TRACKS: Record<string, 'conversation' | 'grammar'> = { conversation_v2: 'conversation', foundations: 'grammar', advanced_v2: 'grammar' };

export const SaraTrackPlayer: React.FC<Props> = ({ isOpen, onClose, track, uid, unlockAll, initialLessonId }) => {
  const [unlockedRaw, setUnlocked] = useState(() => readUnlocked(track.id, uid));
  const [cert, setCert] = useState<CertificateData | null>(null);
  const unlocked = unlockAll ? track.lessons.length : unlockedRaw;
  const [lessonId, setLessonId] = useState<string | null>(initialLessonId || null);
  const [test, setTest] = useState<null | { levelId: string; levelTitleAr: string; qs: LevelTestQuestion[]; idx: number; answers: number[]; pick: number | null; result: LevelTestAttempt | null; saved: boolean | null }>(null);
  const levels = useMemo(() => trackLevels(track), [track]);
  const startTest = (lv: { id: string; titleAr: string; lessons: SaraTrackLesson[] }) => {
    stop(); setLessonId(null);
    setTest({ levelId: lv.id, levelTitleAr: lv.titleAr, qs: buildLevelTest(lv.lessons), idx: 0, answers: [], pick: null, result: null, saved: null });
  };
  const [useAlt, setUseAlt] = useState(false);
  const [checkPick, setCheckPick] = useState<number | null>(null);
  const [mode, setMode] = useState<'learn' | 'exercises' | 'board' | 'sentences'>('board');
  const [boardReplay, setBoardReplay] = useState(0);
  const [exIdx, setExIdx] = useState(0);
  const [exPick, setExPick] = useState<number | null>(null);
  const [exScore, setExScore] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const [activeSeg, setActiveSeg] = useState(-1);
  const [blocked, setBlocked] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [askOpen, setAskOpen] = useState(false);
  const [askText, setAskText] = useState('');
  const [askReply, setAskReply] = useState('');
  const [askBusy, setAskBusy] = useState(false);
  const [listening, setListening] = useState(false);

  useEffect(() => { setUnlocked(readUnlocked(track.id, uid)); }, [track.id, uid]);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);
  const stop = () => { stopNarrator(); setSpeaking(false); setPaused(false); setActiveSeg(-1); };
  const togglePause = () => { if (paused) { resumeNarrator(); setPaused(false); } else { pauseNarrator(); setPaused(true); } };
  useEffect(() => () => stopNarrator(), []);
  useEffect(() => { if (!isOpen) stop(); }, [isOpen]);

  const lessonRaw = useMemo(() => track.lessons.find(l => l.id === lessonId) || null, [lessonId, track]);
  const [lang] = useExplainLang();
  const { view: lesson, loading: enLoading } = useLessonView(lessonRaw, lang);
  const boardCalls = useMemo(() => (lesson?.content ? toToolCalls(lessonBoardActions(lesson, useAlt)) : []), [lesson, useAlt]);

  /** Narrate the page lines: segments = the exact on-screen lines (title, explanation, each example line). */
  const startNarration = (l: SaraTrackLesson, alt: boolean) => {
    if (!l.content) return;
    stop();
    const text = lessonPageLines(l, alt).map(line => boardLinesToSpeech([line])).join('\n');
    setBlocked(false); setFailed(false); setPaused(false);
    setSpeaking(true); setActiveSeg(1);
    const end = () => { setSpeaking(false); setActiveSeg(-1); };
    narrate(text, () => { end(); setBlocked(true); }, () => { end(); setFailed(true); }, end);
  };
  const openLesson = (l: SaraTrackLesson) => {
    unlockNarrator(); // inside the tap
    markLastTrack(uid, track.id);
    stop(); setLessonId(l.id); setUseAlt(false); setCheckPick(null); setMode('board'); setBoardReplay(r => r + 1); setExIdx(0); setExPick(null); setExScore(0);
    if (lang === 'en') void englishLessonAsync(l).then(x => startNarration(x, false)); else startNarration(l, false);
  };
  const nextLesson = lesson ? track.lessons.find(x => x.order === lesson.order + 1) : undefined;
  const goNext = () => { if (nextLesson) openLesson(nextLesson); else { stop(); setLessonId(null); } };

  const sendAsk = async (q: string) => {
    const question = q.trim();
    if (!question || !lesson?.content || askBusy) return;
    unlockNarrator();
    stop();
    setAskBusy(true); setAskReply('');
    try {
      const idToken = auth.currentUser ? await auth.currentUser.getIdToken() : '';
      const res = await fetch('/api/sara/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}) },
        body: JSON.stringify({
          message: question, history: [], preferredLang: lang,
          trackLesson: { title: `${lesson.titleAr} (${lesson.titleEn})`, explanation: useAlt ? lesson.content.altExplanationAr : lesson.content.explanationAr }
        })
      });
      const data = await res.json();
      const reply: string = data?.reply || L('ما قدرت أجاوب الحين، جرّب مرة ثانية 🌸', 'I could not answer right now, please try again 🌸');
      setAskReply(reply); setAskText('');
      setSpeaking(true);
      if (data?.audio) await playB64(data.audio);
      else { const said = boardLinesToSpeech([reply]); const b64 = await prefetchAcademyAudio(said, lang, 'Kore'); if (b64) await playB64(b64); }
      setSpeaking(false);
    } catch {
      setAskReply(L('صار خطأ بالاتصال، جرّب مرة ثانية.', 'Connection error, please try again.'));
    } finally { setAskBusy(false); }
  };
  const startMic = () => {
    const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { setAskReply(L('المايك غير مدعوم في هذا المتصفح، اكتب سؤالك.', 'The mic is not supported in this browser, please type.')); return; }
    stop();
    const rec = new SR(); rec.lang = 'ar-SA'; rec.interimResults = false;
    rec.onresult = (e: any) => { const t = e.results?.[0]?.[0]?.transcript || ''; setAskText(t); sendAsk(t); };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    setListening(true); rec.start();
  };

  const speak = () => {
    if (!lesson?.content) return;
    unlockNarrator();
    startNarration(lesson, useAlt);
  };
  /** Lesson passed (page check OR whiteboard exercises): unlock the next lesson, same rule everywhere. */
  const markPassed = () => {
    if (!lesson) return;
    const next = lesson.order + 1; // may be length+1 → the track's last level test opens
    if (next > unlockedRaw) {
      setUnlocked(next);
      try { localStorage.setItem(progressKey(track.id, uid), String(next)); } catch { /* ignore */ }
      void pushTrackProgress(uid, track.id, next);
    }
  };
  const answerCheck = (i: number) => {
    if (!lesson?.content) return;
    unlockNarrator();
    stop();
    setCheckPick(i);
    if (i === lesson.content.check.correctIndex) {
      markPassed();
    } else {
      setUseAlt(true); // re-explain from another angle on the same page
      startNarration(lesson, true);
      setTimeout(() => setCheckPick(null), 900);
    }
  };

  if (!isOpen) return null;
  const passed = !!lesson?.content && checkPick === lesson.content.check.correctIndex;

  return (
    <div className="fixed inset-0 z-[210] bg-slate-950/60 flex items-stretch justify-center" dir={lang === "en" ? "ltr" : "rtl"}>
      <div data-testid="sara-track-page" className="relative w-full max-w-xl h-[100dvh] bg-[#fdfaf3] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 flex items-center gap-2 px-3 py-2 bg-[#002147] text-white">
          {lesson || test ? (
            <button onClick={() => { stop(); setLessonId(null); setTest(null); }} className="p-1.5 rounded-lg hover:bg-white/10" aria-label="back"><ArrowRight size={18} /></button>
          ) : <span className="text-lg">📚</span>}
          <div className="min-w-0 flex-1">
            <p className="text-[10px] text-amber-300 font-bold truncate">{L(track.titleAr, track.titleEn || track.titleAr)}</p>
            <p className="text-sm font-black truncate">{lesson ? `${lesson.order}. ${lesson.titleAr}` : test ? `🏁 اختبار نهاية المستوى` : L(`${track.lessons.length} درس`, `${track.lessons.length} lessons`)}</p>
          </div>
          {enLoading && <span className="text-[10px] font-black text-amber-300">EN…</span>}
          <ExplainLangToggle />
          {lesson?.content && (mode === 'learn' || mode === 'board') && (
            <button onClick={speaking ? stop : () => { if (mode === 'board') setBoardReplay(r => r + 1); speak(); }} className="p-1.5 rounded-lg bg-amber-400 text-slate-950" aria-label="read">
              {speaking ? <Square size={16} /> : <Volume2 size={16} />}
            </button>
          )}
          <button onClick={() => { stop(); onClose(); }} className="p-1.5 rounded-lg hover:bg-white/10" aria-label="close"><X size={18} /></button>
        </div>

        {/* Lesson list */}
        {!lesson && !test && (
          <div className="flex-1 min-h-0 overflow-y-auto p-3 grid gap-1.5 content-start">
            {track.lessons.map((l, idx) => {
              const open = l.order <= unlocked;
              const lvl = track.levels?.find(v => v.id === l.levelId);
              const showLevel = !!lvl && (idx === 0 || track.lessons[idx - 1].levelId !== l.levelId);
              return (
                <React.Fragment key={l.id}>
                {showLevel && <p className="mt-2 first:mt-0 px-1 text-[12px] font-black text-amber-700">{lvl!.titleAr}</p>}
                <button disabled={!open} onClick={() => openLesson(l)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-start ${open ? 'bg-white border-amber-300 shadow-sm' : 'bg-slate-100 border-slate-200 opacity-60'}`}>
                  <span className="w-6 h-6 rounded-full bg-[#002147] text-white text-[11px] font-black flex items-center justify-center shrink-0">{l.order}</span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-[13px] font-black text-slate-800 truncate">{l.titleAr}</span>
                    <span dir="ltr" className="block text-[11px] text-slate-500 truncate text-end">{l.titleEn}</span>
                  </span>
                  {open ? (l.order < unlocked ? <CheckCircle2 size={16} className="text-emerald-600" /> : null) : <Lock size={14} className="text-slate-400" />}
                </button>
                {(() => {
                  const lv = levels.find(v => v.lessons[v.lessons.length - 1]?.id === l.id);
                  if (!lv) return null;
                  const last = lv.lessons[lv.lessons.length - 1].order;
                  const testOpen = !!unlockAll || unlockedRaw > last;
                  return (
                    <button data-testid={`level-test-${lv.id}`} disabled={!testOpen} onClick={() => startTest(lv)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-start ${testOpen ? 'bg-[#002147] border-amber-400 text-white' : 'bg-slate-100 border-slate-200 text-slate-500 opacity-70'}`}>
                      <span className="text-lg">🏁</span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-[13px] font-black truncate">اختبار نهاية المستوى — {lv.titleAr}</span>
                        <span className="block text-[11px] opacity-80 truncate">{testOpen ? `النجاح من ${LEVEL_TEST_PASS}%` : `يفتح بعد اجتياز الدرس ${last}`}</span>
                      </span>
                      {!testOpen && <Lock size={14} />}
                    </button>
                  );
                })()}
                </React.Fragment>
              );
            })}
          </div>
        )}

        {lesson && !lesson.content && (
          <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
            <p className="text-4xl">🛠️</p>
            <p className="text-base font-black text-[#002147]">{L("هذا الدرس قيد البناء", "This lesson is being built")}</p>
            <button onClick={() => { stop(); setLessonId(null); }} className="px-5 py-2 rounded-xl bg-[#002147] text-white text-[13px] font-black">{L("رجوع للدروس", "Back to lessons")}</button>
          </div>
        )}

        {/* One-page lesson (no scrolling) */}
        {lesson?.content && mode === 'learn' && (
          <div className="flex-1 min-h-0 flex flex-col gap-1.5 p-2.5 overflow-hidden">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full bg-[#002147] text-amber-300 border-2 border-amber-400 flex items-center justify-center font-black shrink-0 ${speaking ? 'animate-pulse ring-4 ring-amber-300/60' : ''}`}>س</div>
              <button onClick={speak} data-testid="sara-explain" className={`px-2 py-1 rounded-xl bg-amber-400 text-slate-950 text-[11px] font-black shrink-0 ${blocked ? 'animate-bounce' : ''}`}>🔊 {L("اشرحي يا سارة", "Explain, Sara")}</button>
              {speaking && (
                <button onClick={togglePause} data-testid="sara-pause" className="px-2 py-1 rounded-xl bg-[#002147] text-white text-[11px] font-black shrink-0">{paused ? L('▶️ كملي', '▶️ Continue') : L('⏸️ إيقاف مؤقت', '⏸️ Pause')}</button>
              )}
              {failed && !speaking && (
                <button onClick={speak} data-testid="sara-retry" className="px-2 py-1 rounded-xl bg-rose-100 border border-rose-300 text-rose-700 text-[11px] font-black shrink-0">{L("🔄 إعادة المحاولة", "🔄 Try again")}</button>
              )}
              <span className="flex-1" />
            </div>
            <div className="flex gap-1.5 -mt-0.5">
              <button onClick={() => { stop(); setAskOpen(true); }} className="flex-1 py-1 rounded-xl bg-white border-2 border-[#002147]/20 text-[#002147] text-[11px] font-black">{L("❓ اسأل سارة", "❓ Ask Sara")}</button>
              <button onClick={() => { stop(); setChatOpen(true); }} data-testid="lesson-free-chat" className="flex-1 py-1 rounded-xl bg-[#002147] border-2 border-[#C49E3A] text-amber-300 text-[11px] font-black">{L("💬 محاورة سارة", "💬 Talk with Sara")}</button>
            </div>
            <div className={`rounded-2xl p-2.5 border-2 transition-all ${activeSeg === 1 ? 'ring-4 ring-amber-300/70' : ''} ${useAlt ? 'bg-sky-50 border-sky-300' : 'bg-white border-amber-200'}`}>
              {useAlt && <p className="text-[11px] font-black text-sky-700 mb-1">{L("سارة تشرحها لك بطريقة ثانية 👇", "Sara explains it another way 👇")}</p>}
              <p className="text-[13px] leading-relaxed font-semibold text-slate-800">{useAlt ? lesson.content.altExplanationAr : lesson.content.explanationAr}</p>
            </div>
            <div className="rounded-2xl p-2.5 bg-[#002147] text-white space-y-1">
              <p className="text-[10px] font-black text-amber-300">{L("مثال حي", "Live example")}</p>
              {lesson.content.example.map((e, i) => (
                <p key={i} className={`text-[13px] leading-snug rounded-lg px-1 ${activeSeg === i + 2 ? 'bg-amber-400/30' : ''}`}><span dir="ltr" className="block font-bold text-start" style={{ direction: 'ltr' }}>{e.en}</span><span className="block text-[11px] text-amber-100/80">{e.ar}</span></p>
              ))}
            </div>
            <div className="rounded-2xl p-2.5 bg-amber-50 border-2 border-amber-300">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-[10px] font-black text-amber-700">{L("سؤال فهم", "Check question")}</p>
                <span className="flex-1" />
                <button onClick={() => { unlockNarrator(); setMode('board'); setBoardReplay(r => r + 1); startNarration(lesson, useAlt); }} data-testid="open-board"
                  className="px-2 py-0.5 -my-1 rounded-lg bg-[#002147] text-amber-300 border border-[#C49E3A] text-[11px] font-black leading-tight">{L("🧑‍🏫 ارجع للسبورة", "🧑‍🏫 Back to the board")}</button>
              </div>
              {passed
                ? <p className="text-[13px] font-black text-emerald-700">{L("✅ صح!", "✅ Correct!")} {lesson.content.check.options[lesson.content.check.correctIndex]}</p>
                : <Choice q={lesson.content.check} picked={checkPick} onPick={answerCheck} locked={passed} />}
            </div>
            {passed && (
              <div className="flex gap-2">
                <button onClick={() => { stop(); setMode('exercises'); }} className="flex-1 py-2 rounded-xl bg-[#58cc02] text-white text-[13px] font-black">{L(`تمارين (${lesson.content.exercises.length}) — اختياري`, `Exercises (${lesson.content.exercises.length}), optional`)}</button>
                <button onClick={goNext} className="flex-1 py-2 rounded-xl bg-[#002147] text-white text-[13px] font-black">{L("✅ الدرس التالي ←", "✅ Next lesson →")}</button>
              </div>
            )}
            {passed && track.id === 'conversation_v2' && (
              <button onClick={() => { stop(); setMode('sentences'); }} data-testid="open-sentence-builder" className="w-full py-2 rounded-xl bg-white border-2 border-[#C49E3A] text-[#002147] text-[13px] font-black">{L("🧩 ابنِ جملك — 5 بطاقات", "🧩 Build your sentences, 5 cards")}</button>
            )}
          </div>
        )}

        {/* End-of-level test: one question per screen, no hints until the end */}
        {test && !lesson && (() => {
          const total = test.qs.length;
          if (test.result) {
            const r = test.result;
            return (
              <div data-testid="level-test-result" className="flex-1 min-h-0 flex flex-col gap-2 p-3 overflow-hidden">
                <div className={`rounded-2xl p-3 text-center border-2 ${r.passed ? 'bg-emerald-50 border-emerald-400' : 'bg-rose-50 border-rose-300'}`}>
                  <p className="text-3xl font-black text-[#002147]">{r.score}%</p>
                  <p className={`text-[14px] font-black ${r.passed ? 'text-emerald-700' : 'text-rose-700'}`}>{r.passed ? '🎉 ناجح' : `لم تنجح بعد — النجاح من ${LEVEL_TEST_PASS}%`}</p>
                  <p className="text-[11px] text-slate-500 font-bold">{r.correct} من {r.total} · {test.levelTitleAr}{test.saved === false ? ' · محفوظ على الجهاز' : ''}</p>
                </div>
                {r.weakLessons.length > 0 && <p className="text-[12px] font-black text-slate-700">دروس تحتاج مراجعة:</p>}
                <div className="flex-1 min-h-0 grid gap-1.5 content-start overflow-hidden">
                  {r.weakLessons.slice(0, 5).map(w => (
                    <button key={w.id} data-testid="weak-lesson" onClick={() => { const l = track.lessons.find(x => x.id === w.id); setTest(null); if (l) openLesson(l); }}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-start">
                      <span className="w-6 h-6 rounded-full bg-[#002147] text-white text-[11px] font-black flex items-center justify-center shrink-0">{w.order}</span>
                      <span className="flex-1 min-w-0 text-[12px] font-black text-slate-800 truncate">{w.titleAr}</span>
                      <span className="text-[11px] font-black text-rose-600 shrink-0">{w.wrong} ✗ · راجع ←</span>
                    </button>
                  ))}
                  {r.weakLessons.length > 5 && <p className="text-[11px] text-slate-500 font-bold">+{r.weakLessons.length - 5} دروس أخرى</p>}
                </div>
                <div className="shrink-0 flex gap-2">
                  <button data-testid="level-test-retry" onClick={() => { const lv = levels.find(v => v.id === test.levelId); if (lv) startTest(lv); }} className="flex-1 py-2 rounded-xl bg-amber-400 text-slate-950 text-[13px] font-black">🔁 إعادة الاختبار</button>
                  {r.passed && <button data-testid="level-test-cert" onClick={() => setCert({ unitId: `${track.id}:${test.levelId}`, unitTitle: `${track.titleAr} — ${test.levelTitleAr} (${r.score}%)`, unitTitleAr: `${track.titleAr} — ${test.levelTitleAr} (${r.score}%)`, completedAt: r.createdAtMs, studentName: auth.currentUser?.displayName || undefined })} className="flex-1 py-2 rounded-xl bg-[#C49E3A] text-[#002147] text-[13px] font-black">🎓 شهادتي</button>}
                  <button onClick={() => setTest(null)} className="flex-1 py-2 rounded-xl bg-[#002147] text-white text-[13px] font-black">{L("رجوع للدروس", "Back to lessons")}</button>
                </div>
              </div>
            );
          }
          const cur = test.qs[test.idx];
          return (
            <div data-testid="level-test" className="flex-1 min-h-0 flex flex-col gap-2.5 p-3 overflow-hidden">
              <div className="shrink-0">
                <div className="flex items-center justify-between text-[11px] font-black text-slate-600 mb-1">
                  <span>🏁 اختبار {test.levelTitleAr}</span><span>سؤال {test.idx + 1} من {total}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 overflow-hidden"><div className="h-full bg-amber-400 transition-all" style={{ width: `${(test.idx / total) * 100}%` }} /></div>
              </div>
              <div className="rounded-2xl p-3 bg-white border-2 border-amber-200">
                {/* no instant hint: the pick is only highlighted, right/wrong is revealed at the end */}
                <p className="text-[13px] font-black text-slate-800 leading-snug mb-1.5">{cur.q.promptAr}{cur.q.promptEn && <span dir="ltr" className="block text-[#002147] font-bold">{cur.q.promptEn}</span>}</p>
                <div className="grid gap-1.5">
                  {cur.q.options.map((o, i) => (
                    <button key={i} dir="auto" data-testid="test-option" onClick={() => setTest({ ...test, pick: i })}
                      className={`w-full text-start px-3 py-1.5 rounded-xl border-2 text-[13px] font-bold ${test.pick === i ? 'bg-sky-100 border-sky-500' : 'bg-white border-slate-200'}`}>{o}</button>
                  ))}
                </div>
              </div>
              <button data-testid="test-next" disabled={test.pick === null} onClick={() => {
                const answers = [...test.answers, test.pick!];
                if (test.idx + 1 < total) { setTest({ ...test, answers, idx: test.idx + 1, pick: null }); return; }
                const result = scoreLevelTest(track, test.levelId, test.levelTitleAr, test.qs, answers);
                setTest({ ...test, answers, pick: null, result, saved: null });
                if (result.passed) setCert({ unitId: `${track.id}:${test.levelId}`, unitTitle: `${track.titleAr} — ${test.levelTitleAr} (${result.score}%)`, unitTitleAr: `${track.titleAr} — ${test.levelTitleAr} (${result.score}%)`, completedAt: result.createdAtMs, studentName: auth.currentUser?.displayName || undefined });
                saveLevelTestAttempt(uid, result).then(ok => setTest(t => (t && t.result === result ? { ...t, saved: ok } : t)));
              }} className={`shrink-0 py-2 rounded-xl text-[13px] font-black ${test.pick === null ? 'bg-slate-200 text-slate-400' : 'bg-[#002147] text-white'}`}>{test.idx + 1 < total ? 'التالي ←' : '🏁 إنهاء الاختبار'}</button>
            </div>
          );
        })()}

        {/* Tutor tldraw board (same board + writing style as Noura's lessons): the lesson is written step by step while Sara narrates it */}
        {lesson?.content && mode === 'board' && (
          <div data-testid="lesson-board" className="flex-1 min-h-0 flex flex-col gap-2 p-2 overflow-hidden bg-[#001a38]">
            <div className="shrink-0 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[11px] font-black bg-amber-400 text-[#001a38]">{L("👩‍💼 سارة على السبورة", "👩‍💼 Sara on the board")}</span>
              {speaking && <button onClick={togglePause} data-testid="sara-board-pause" className="px-2 py-0.5 rounded-lg bg-white/10 text-white text-[11px] font-black">{paused ? L('▶️ كملي', '▶️ Continue') : L('⏸️ إيقاف مؤقت', '⏸️ Pause')}</button>}
              {failed && !speaking && <button onClick={() => { setBoardReplay(r => r + 1); speak(); }} className="px-2 py-0.5 rounded-lg bg-rose-100 text-rose-700 text-[11px] font-black">{L("🔄 إعادة المحاولة", "🔄 Try again")}</button>}
              {blocked && !speaking && <span className="text-[10px] font-bold text-white/70">{L("اضغط 🔊 فوق", "Tap 🔊 above")}</span>}
            </div>
            <div className="flex-1 min-h-0">
              <Suspense fallback={<div className="w-full h-full rounded-2xl border-2 border-amber-400/60 bg-[#0a2d5c] flex items-center justify-center text-[12px] font-bold text-amber-200">{L("جاري فتح السبورة…", "Opening the board…")}</div>}>
                <TutorTldrawBoard key={lesson.id + (useAlt ? '-alt' : '')} calls={boardCalls} personaId="sara" lessonTitle={`${lesson.titleEn} (${lesson.titleAr})`} speaking={speaking}
                  replayKey={boardReplay} onSpeak={() => { unlockNarrator(); setBoardReplay(r => r + 1); startNarration(lesson, useAlt); }} />
              </Suspense>
            </div>
            <button data-testid="board-to-check" onClick={() => { stop(); setMode('learn'); }} className="shrink-0 w-full py-2.5 rounded-xl bg-amber-400 text-[#001a38] text-[14px] font-black">{passed ? L('رجوع للدرس ←', 'Back to the lesson →') : L('سؤال الفهم ←', 'Check question →')}</button>
          </div>
        )}

        {lesson?.content && mode === 'sentences' && track.id === 'conversation_v2' && (
          <SaraSentenceBuilder trackId={track.id} lessonId={lesson.id} uid={uid} titleAr={lesson.titleAr} titleEn={lesson.titleEn} level={lesson.levelId} examples={lesson.content.example}
            doneLabel={L("رجوع للدرس", "Back to the lesson")} onDone={() => setMode('learn')}
            talkSlot={sentences => <SaraLessonCall uid={uid} level={lesson.levelId === 'b1' ? 'B1' : lesson.levelId === 'b2' ? 'B2' : lesson.levelId === 'c1' ? 'C1' : lesson.levelId === 'c2' ? 'C2' : 'A2'} label={L("تحدّث مع سارة", "Talk with Sara")}
              preset={lessonCallPreset({ id: `${lesson.id}-sentences`, titleAr: lesson.titleAr, titleEn: lesson.titleEn, kind: 'conversation', tag: 'conversation', phrases: sentences,
                starter: `Great! Let's talk and use your sentences. You built: ${sentences.slice(0, 2).join(' ')} Can you say one of your sentences to me?` })} />} />
        )}

        {/* Optional exercises (one per screen, same page frame) */}
        {lesson?.content && mode === 'exercises' && (
          <div className="flex-1 min-h-0 flex flex-col gap-3 p-3 overflow-hidden">
            {exIdx < lesson.content.exercises.length ? (
              <>
                <p className="text-[11px] font-black text-slate-500">{L('تمرين', 'Exercise')} {exIdx + 1} {L('من', 'of')} {lesson.content.exercises.length}</p>
                <div className="rounded-2xl p-3 bg-white border-2 border-amber-200">
                  <Choice q={lesson.content.exercises[exIdx]} picked={exPick} locked={exPick !== null}
                    onPick={i => { setExPick(i); if (i === lesson.content!.exercises[exIdx].correctIndex) setExScore(s => s + 1); }} />
                </div>
                {exPick !== null && (
                  <button onClick={() => { setExIdx(i => i + 1); setExPick(null); }} className="py-2 rounded-xl bg-[#002147] text-white text-[13px] font-black">{L("التالي", "Next")}</button>
                )}
              </>
            ) : (
              <div className="rounded-2xl p-4 bg-white border-2 border-emerald-300 text-center space-y-2">
                <p className="text-2xl">🌟</p>
                <p className="text-sm font-black text-slate-800">{L('نتيجتك:', 'Your score:')} {exScore} {L('من', 'of')} {lesson.content.exercises.length}</p>
                {CALL_TRACKS[track.id] && <SaraLessonCall uid={uid}
                  preset={lessonCallPreset({ id: lesson.id, titleAr: lesson.titleAr, titleEn: lesson.titleEn, kind: CALL_TRACKS[track.id], tag: CALL_TRACKS[track.id],
                    phrases: [...new Set(lesson.content.example.flatMap(e => e.en.replace(/\b[AB]:\s*/g, '\n').split(/\n|(?<=[.!?])\s+/)).map(x => x.trim()).filter(x => x.length > 3 && x.split(/\s+/).length <= 9))].slice(0, 4),
                    starter: `Let's practise "${lesson.titleEn}" in a real conversation. ${lesson.content.example[0]?.en || ''} Now you try — what would you say?` })} />}
                <button onClick={goNext} className="w-full py-2 rounded-xl bg-[#58cc02] text-white text-[14px] font-black">{L("الدرس التالي ←", "Next lesson →")}</button>
                <button onClick={() => { stop(); setLessonId(null); }} className="w-full py-2 rounded-xl bg-[#002147] text-white text-[13px] font-black">{L("رجوع للدروس", "Back to lessons")}</button>
              </div>
            )}
          </div>
        )}
        {chatOpen && lesson && <SaraLivePhoneCallModal isOpen onClose={() => setChatOpen(false)} studentName="" studentLevel="A2" isRtl studentId={uid} preset={freeCallPresetFor(lesson.titleEn, lesson.titleAr)} />}
        {/* ❓ Ask Sara sheet (overlay, does not affect the page layout) */}
        {askOpen && lesson?.content && (
          <div className="absolute inset-0 z-10 bg-slate-950/40 flex items-end" onClick={() => { stop(); setAskOpen(false); }}>
            <div className="w-full max-h-[60%] bg-white rounded-t-3xl p-3 flex flex-col gap-2 shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full bg-[#002147] text-amber-300 flex items-center justify-center font-black ${speaking ? 'animate-pulse ring-4 ring-amber-300/60' : ''}`}>س</div>
                <p className="flex-1 text-[13px] font-black text-[#002147] truncate">{L("اسأل سارة عن:", "Ask Sara about:")} {lesson.titleAr}</p>
                <button onClick={() => { stop(); setAskOpen(false); }} className="p-1 rounded-lg text-slate-500" aria-label="close"><X size={16} /></button>
              </div>
              <div className="flex-1 min-h-[60px] overflow-y-auto rounded-2xl bg-slate-50 border p-2.5 text-[13px] leading-relaxed text-slate-800">
                {askBusy ? L('سارة تفكر… 🤔', 'Sara is thinking… 🤔') : askReply || L('اكتب سؤالك أو اضغط المايك وتكلم 🎙️', 'Type your question or tap the mic and speak 🎙️')}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={startMic} disabled={askBusy} className={`p-2.5 rounded-xl text-white ${listening ? 'bg-rose-500 animate-pulse' : 'bg-[#002147]'}`} aria-label="mic"><Mic size={16} /></button>
                <input value={askText} onChange={e => setAskText(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') sendAsk(askText); }}
                  placeholder={L("سؤالك عن الدرس…", "Your question about the lesson…")} className="flex-1 min-w-0 px-3 py-2 rounded-xl border-2 border-slate-200 text-[13px]" />
                <button onClick={() => sendAsk(askText)} disabled={askBusy || !askText.trim()} className="p-2.5 rounded-xl bg-[#58cc02] text-white disabled:opacity-50" aria-label="send"><Send size={16} /></button>
              </div>
            </div>
          </div>
        )}
      </div>
    {cert && <div className="relative z-[300]"><CompletionCertificateModal isOpen={!!cert} onClose={() => setCert(null)} certificate={cert} isRtl /></div>}
    </div>
  );
};

export default SaraTrackPlayer;

/** Shared with Sara's tools: same one-request-per-page cached cloud voice (no substitute voice). */
export const saraNarrate = narrate;
export const saraStopNarrator = stopNarrator;
export const saraUnlockNarrator = unlockNarrator;
