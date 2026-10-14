import React, { useEffect, useMemo, useState } from 'react';
import { X, ArrowRight, Lock, Volume2, Square, CheckCircle2, Mic, Send } from 'lucide-react';
import { auth } from '../lib/firebase';
import type { SaraTrack, SaraTrackLesson, SaraChoiceQuestion } from '../data/saraTracks/foundations';
import { prefetchAcademyAudio, cancelAllSpeech, createManagedAudio } from '../lib/audio';
import { boardLinesToSpeech } from '../utils/boardToSpeech';
import { pushTrackProgress, markLastTrack } from '../lib/saraProgressSync';
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
async function fetchLessonAudio(text: string, token: number): Promise<string | null> {
  const hit = lessonAudioCache.get(text);
  if (hit) return hit;
  const delays = [0, 2500, 6000];
  for (const d of delays) {
    if (d) await wait(d);
    if (token !== narratorToken) return null;
    try {
      const r = await fetch(`/api/tts/lesson?v=Kore&t=${encodeURIComponent(text)}`);
      if (r.ok && (r.headers.get('content-type') || '').includes('audio')) {
        const url = URL.createObjectURL(await r.blob());
        lessonAudioCache.set(text, url);
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
async function narrate(text: string, onBlocked: () => void, onFailed: () => void, onDone: () => void) {
  const token = ++narratorToken;
  cancelAllSpeech(); // nothing else speaks at the same time
  narratorPaused = false;
  const url = await fetchLessonAudio(text, token);
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

/** Visual style of Sara's SmartWhiteboard (default 'maldives_turquoise' theme), reused for the lesson board. */
const BOARD_THEME = { bgHex: '#083344', gradientToHex: '#0E7490', accentHex: '#2DD4BF', cardBg: 'rgba(4, 33, 44, 0.75)', cardBorder: 'rgba(45, 212, 191, 0.35)', gridColor: 'rgba(45, 212, 191, 0.08)' };

export const progressKey = (trackId: string, uid?: string) => `sara_track_${trackId}_${uid || 'guest'}`;
export const readUnlocked = (trackId: string, uid?: string) => {
  try { return Math.max(1, Number(localStorage.getItem(progressKey(trackId, uid))) || 1); } catch { return 1; }
};

/** Lines shown on the lesson page = exactly what Sara reads. */
export function lessonPageLines(lesson: SaraTrackLesson, useAlt: boolean): string[] {
  const c = lesson.content!;
  return [lesson.titleAr, useAlt ? c.altExplanationAr : c.explanationAr, ...c.example.map(e => e.en)];
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

export const SaraTrackPlayer: React.FC<Props> = ({ isOpen, onClose, track, uid, unlockAll, initialLessonId }) => {
  const [unlockedRaw, setUnlocked] = useState(() => readUnlocked(track.id, uid));
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
  const [mode, setMode] = useState<'learn' | 'exercises' | 'board'>('learn');
  const [bStep, setBStep] = useState(0);
  const [bPick, setBPick] = useState<number | null>(null);
  const [exIdx, setExIdx] = useState(0);
  const [exPick, setExPick] = useState<number | null>(null);
  const [exScore, setExScore] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const [activeSeg, setActiveSeg] = useState(-1);
  const [blocked, setBlocked] = useState(false);
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

  const lesson = useMemo(() => track.lessons.find(l => l.id === lessonId) || null, [lessonId, track]);

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
    stop(); setLessonId(l.id); setUseAlt(false); setCheckPick(null); setMode('learn'); setExIdx(0); setExPick(null); setExScore(0);
    startNarration(l, false);
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
          message: question, history: [], preferredLang: 'ar',
          trackLesson: { title: `${lesson.titleAr} (${lesson.titleEn})`, explanation: useAlt ? lesson.content.altExplanationAr : lesson.content.explanationAr }
        })
      });
      const data = await res.json();
      const reply: string = data?.reply || 'ما قدرت أجاوب الحين، جرّب مرة ثانية 🌸';
      setAskReply(reply); setAskText('');
      setSpeaking(true);
      if (data?.audio) await playB64(data.audio);
      else { const said = boardLinesToSpeech([reply]); const b64 = await prefetchAcademyAudio(said, 'ar', 'Kore'); if (b64) await playB64(b64); }
      setSpeaking(false);
    } catch {
      setAskReply('صار خطأ بالاتصال، جرّب مرة ثانية.');
    } finally { setAskBusy(false); }
  };
  const startMic = () => {
    const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { setAskReply('المايك غير مدعوم في هذا المتصفح، اكتب سؤالك.'); return; }
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
    <div className="fixed inset-0 z-[210] bg-slate-950/60 flex items-stretch justify-center" dir="rtl">
      <div data-testid="sara-track-page" className="relative w-full max-w-xl h-[100dvh] bg-[#fdfaf3] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 flex items-center gap-2 px-3 py-2 bg-[#002147] text-white">
          {lesson || test ? (
            <button onClick={() => { stop(); setLessonId(null); setTest(null); }} className="p-1.5 rounded-lg hover:bg-white/10" aria-label="back"><ArrowRight size={18} /></button>
          ) : <span className="text-lg">📚</span>}
          <div className="min-w-0 flex-1">
            <p className="text-[10px] text-amber-300 font-bold truncate">{track.titleAr}</p>
            <p className="text-sm font-black truncate">{lesson ? `${lesson.order}. ${lesson.titleAr}` : test ? `🏁 اختبار نهاية المستوى` : `${track.lessons.length} درس`}</p>
          </div>
          {lesson?.content && mode === 'learn' && (
            <button onClick={speaking ? stop : speak} className="p-1.5 rounded-lg bg-amber-400 text-slate-950" aria-label="read">
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
            <p className="text-base font-black text-[#002147]">هذا الدرس قيد البناء</p>
            <button onClick={() => { stop(); setLessonId(null); }} className="px-5 py-2 rounded-xl bg-[#002147] text-white text-[13px] font-black">رجوع للدروس</button>
          </div>
        )}

        {/* One-page lesson (no scrolling) */}
        {lesson?.content && mode === 'learn' && (
          <div className="flex-1 min-h-0 flex flex-col gap-1.5 p-2.5 overflow-hidden">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full bg-[#002147] text-amber-300 border-2 border-amber-400 flex items-center justify-center font-black shrink-0 ${speaking ? 'animate-pulse ring-4 ring-amber-300/60' : ''}`}>س</div>
              <button onClick={speak} data-testid="sara-explain" className={`px-2 py-1 rounded-xl bg-amber-400 text-slate-950 text-[11px] font-black shrink-0 ${blocked ? 'animate-bounce' : ''}`}>🔊 اشرحي يا سارة</button>
              {speaking && (
                <button onClick={togglePause} data-testid="sara-pause" className="px-2 py-1 rounded-xl bg-[#002147] text-white text-[11px] font-black shrink-0">{paused ? '▶️ كملي' : '⏸️ إيقاف مؤقت'}</button>
              )}
              {failed && !speaking && (
                <button onClick={speak} data-testid="sara-retry" className="px-2 py-1 rounded-xl bg-rose-100 border border-rose-300 text-rose-700 text-[11px] font-black shrink-0">🔄 إعادة المحاولة</button>
              )}
              <span className="flex-1" />
              <button onClick={() => { stop(); setAskOpen(true); }} className="px-2 py-1 rounded-xl bg-white border-2 border-[#002147]/20 text-[#002147] text-[11px] font-black shrink-0">❓ اسأل سارة</button>
            </div>
            <div className={`rounded-2xl p-2.5 border-2 transition-all ${activeSeg === 1 ? 'ring-4 ring-amber-300/70' : ''} ${useAlt ? 'bg-sky-50 border-sky-300' : 'bg-white border-amber-200'}`}>
              {useAlt && <p className="text-[11px] font-black text-sky-700 mb-1">سارة تشرحها لك بطريقة ثانية 👇</p>}
              <p className="text-[13px] leading-relaxed font-semibold text-slate-800">{useAlt ? lesson.content.altExplanationAr : lesson.content.explanationAr}</p>
            </div>
            <div className="rounded-2xl p-2.5 bg-[#002147] text-white space-y-1">
              <p className="text-[10px] font-black text-amber-300">مثال حي</p>
              {lesson.content.example.map((e, i) => (
                <p key={i} className={`text-[13px] leading-snug rounded-lg px-1 ${activeSeg === i + 2 ? 'bg-amber-400/30' : ''}`}><span dir="ltr" className="block font-bold text-start" style={{ direction: 'ltr' }}>{e.en}</span><span className="block text-[11px] text-amber-100/80">{e.ar}</span></p>
              ))}
            </div>
            <div className="rounded-2xl p-2.5 bg-amber-50 border-2 border-amber-300">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-[10px] font-black text-amber-700">سؤال فهم</p>
                <span className="flex-1" />
                <button onClick={() => { stop(); setBStep(0); setBPick(null); setMode('board'); }} data-testid="open-board"
                  className="px-2 py-0.5 -my-1 rounded-lg bg-[#083344] text-teal-100 border border-teal-400/60 text-[11px] font-black leading-tight">🧑‍🏫 اشرح بالسبورة التفاعلية</button>
              </div>
              {passed
                ? <p className="text-[13px] font-black text-emerald-700">✅ صح! {lesson.content.check.options[lesson.content.check.correctIndex]}</p>
                : <Choice q={lesson.content.check} picked={checkPick} onPick={answerCheck} locked={passed} />}
            </div>
            {passed && (
              <div className="flex gap-2">
                <button onClick={() => { stop(); setMode('exercises'); }} className="flex-1 py-2 rounded-xl bg-[#58cc02] text-white text-[13px] font-black">تمارين ({lesson.content.exercises.length}) — اختياري</button>
                <button onClick={goNext} className="flex-1 py-2 rounded-xl bg-[#002147] text-white text-[13px] font-black">✅ الدرس التالي ←</button>
              </div>
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
                  <button onClick={() => setTest(null)} className="flex-1 py-2 rounded-xl bg-[#002147] text-white text-[13px] font-black">رجوع للدروس</button>
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
                saveLevelTestAttempt(uid, result).then(ok => setTest(t => (t && t.result === result ? { ...t, saved: ok } : t)));
              }} className={`shrink-0 py-2 rounded-xl text-[13px] font-black ${test.pick === null ? 'bg-slate-200 text-slate-400' : 'bg-[#002147] text-white'}`}>{test.idx + 1 < total ? 'التالي ←' : '🏁 إنهاء الاختبار'}</button>
            </div>
          );
        })()}

        {/* Interactive whiteboard: the same lesson, written visually, then its exercises on the board */}
        {lesson?.content && mode === 'board' && (() => {
          const c = lesson.content;
          const th = BOARD_THEME;
          const qs = [c.check, ...c.exercises];
          const steps = 2 + qs.length; // explanation, example, then each exercise
          const qi = bStep - 2;
          const q = qi >= 0 && qi < qs.length ? qs[qi] : null;
          const done = bStep >= steps;
          const icons = ['💡', '📌', '✨', '🎯', '🔑', '🧩'];
          const points = (useAlt ? c.altExplanationAr : c.explanationAr).split(/(?<=[.!؟?])\s+/).filter(Boolean);
          const hl = (t: string) => t.split(/([A-Za-z][A-Za-z'’\- ]*[A-Za-z])/g).map((p, i) => i % 2
            ? <mark key={i} dir="ltr" className="px-1 rounded bg-amber-300/90 text-slate-950 font-black">{p}</mark> : <span key={i}>{p}</span>);
          const solved = q !== null && bPick === q.correctIndex;
          return (
            <div data-testid="lesson-board" className="flex-1 min-h-0 flex flex-col gap-2 p-2.5 overflow-hidden" style={{ background: `linear-gradient(160deg, ${th.bgHex}, ${th.gradientToHex})` }}>
              <div className="shrink-0 flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[11px] font-black text-slate-950" style={{ background: th.accentHex }}>🧑‍🏫 سبورة سارة</span>
                <span className="text-[11px] font-black text-teal-100/80">{Math.min(bStep + 1, steps)} / {steps}</span>
                <span className="flex-1" />
                {bStep < 2 && <button onClick={speaking ? stop : speak} className="px-2 py-0.5 rounded-lg bg-amber-400 text-slate-950 text-[11px] font-black">{speaking ? '⏹️' : '🔊'}</button>}
                <button onClick={() => { stop(); setMode('learn'); }} className="px-2 py-0.5 rounded-lg bg-white/10 text-white text-[11px] font-black">✖ رجوع للصفحة</button>
              </div>
              <div className="flex-1 min-h-0 rounded-2xl p-3 flex flex-col gap-2 overflow-hidden" style={{ background: th.cardBg, border: `2px solid ${th.cardBorder}`, backgroundImage: `linear-gradient(${th.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${th.gridColor} 1px, transparent 1px)`, backgroundSize: '22px 22px' }}>
                {bStep === 0 && (<>
                  <p className="text-[17px] font-black" style={{ color: th.accentHex }}>📘 {lesson.titleAr}</p>
                  <p dir="ltr" className="text-[12px] font-bold text-teal-100/80 text-start">{lesson.titleEn}</p>
                  {points.map((pt, i) => (
                    <p key={i} className="text-[13px] leading-relaxed font-semibold text-white flex gap-2"><span className="shrink-0">{icons[i % icons.length]}</span><span>{hl(pt)}</span></p>
                  ))}
                </>)}
                {bStep === 1 && (<>
                  <p className="text-[16px] font-black text-amber-300">🗣️ مثال حي</p>
                  {c.example.map((e, i) => (
                    <div key={i} className="rounded-xl p-2 bg-white/10 border border-white/15">
                      <p dir="ltr" className="text-[14px] font-black text-white text-start">{e.en}</p>
                      <p className="text-[12px] text-teal-100/90 font-semibold">{e.ar}</p>
                    </div>
                  ))}
                </>)}
                {q && (<>
                  <p className="text-[16px] font-black text-amber-300">✍️ تمرين {qi + 1} من {qs.length}</p>
                  <div className="rounded-xl p-2 bg-white">
                    <Choice q={q} picked={bPick} locked={solved} onPick={i => { setBPick(i); if (i !== q.correctIndex) setTimeout(() => setBPick(null), 900); }} />
                  </div>
                  {bPick !== null && <p className={`text-[13px] font-black ${solved ? 'text-emerald-300' : 'text-rose-300'}`}>{solved ? '✅ صح!' : '❌ حاول مرة ثانية'}</p>}
                </>)}
                {done && (
                  <div className="flex-1 flex flex-col items-center justify-center gap-2 text-center">
                    <p className="text-3xl">🎉</p>
                    <p className="text-[15px] font-black text-white">أحسنت! خلصت تمارين السبورة وانفتح لك الدرس التالي</p>
                  </div>
                )}
              </div>
              <div className="shrink-0 flex gap-2">
                {bStep > 0 && !done && <button onClick={() => { stop(); setBStep(b => b - 1); setBPick(null); }} className="px-3 py-2 rounded-xl bg-white/10 text-white text-[13px] font-black">→ السابق</button>}
                {!done && (q === null || solved) && (
                  <button data-testid="board-next" onClick={() => {
                    stop(); setBPick(null);
                    if (bStep + 1 >= steps) { markPassed(); setCheckPick(c.check.correctIndex); }
                    setBStep(b => b + 1);
                  }} className="flex-1 py-2 rounded-xl text-slate-950 text-[13px] font-black" style={{ background: th.accentHex }}>{bStep + 1 >= steps ? '🏁 إنهاء' : 'التالي ←'}</button>
                )}
                {done && <button data-testid="board-next-lesson" onClick={goNext} className="flex-1 py-2 rounded-xl bg-[#58cc02] text-white text-[14px] font-black">✅ الدرس التالي ←</button>}
              </div>
            </div>
          );
        })()}

        {/* Optional exercises (one per screen, same page frame) */}
        {lesson?.content && mode === 'exercises' && (
          <div className="flex-1 min-h-0 flex flex-col gap-3 p-3 overflow-hidden">
            {exIdx < lesson.content.exercises.length ? (
              <>
                <p className="text-[11px] font-black text-slate-500">تمرين {exIdx + 1} من {lesson.content.exercises.length}</p>
                <div className="rounded-2xl p-3 bg-white border-2 border-amber-200">
                  <Choice q={lesson.content.exercises[exIdx]} picked={exPick} locked={exPick !== null}
                    onPick={i => { setExPick(i); if (i === lesson.content!.exercises[exIdx].correctIndex) setExScore(s => s + 1); }} />
                </div>
                {exPick !== null && (
                  <button onClick={() => { setExIdx(i => i + 1); setExPick(null); }} className="py-2 rounded-xl bg-[#002147] text-white text-[13px] font-black">التالي</button>
                )}
              </>
            ) : (
              <div className="rounded-2xl p-4 bg-white border-2 border-emerald-300 text-center space-y-2">
                <p className="text-2xl">🌟</p>
                <p className="text-sm font-black text-slate-800">نتيجتك: {exScore} من {lesson.content.exercises.length}</p>
                <button onClick={goNext} className="w-full py-2 rounded-xl bg-[#58cc02] text-white text-[14px] font-black">الدرس التالي ←</button>
                <button onClick={() => { stop(); setLessonId(null); }} className="w-full py-2 rounded-xl bg-[#002147] text-white text-[13px] font-black">رجوع للدروس</button>
              </div>
            )}
          </div>
        )}
        {/* ❓ Ask Sara sheet (overlay, does not affect the page layout) */}
        {askOpen && lesson?.content && (
          <div className="absolute inset-0 z-10 bg-slate-950/40 flex items-end" onClick={() => { stop(); setAskOpen(false); }}>
            <div className="w-full max-h-[60%] bg-white rounded-t-3xl p-3 flex flex-col gap-2 shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full bg-[#002147] text-amber-300 flex items-center justify-center font-black ${speaking ? 'animate-pulse ring-4 ring-amber-300/60' : ''}`}>س</div>
                <p className="flex-1 text-[13px] font-black text-[#002147] truncate">اسأل سارة عن: {lesson.titleAr}</p>
                <button onClick={() => { stop(); setAskOpen(false); }} className="p-1 rounded-lg text-slate-500" aria-label="close"><X size={16} /></button>
              </div>
              <div className="flex-1 min-h-[60px] overflow-y-auto rounded-2xl bg-slate-50 border p-2.5 text-[13px] leading-relaxed text-slate-800">
                {askBusy ? 'سارة تفكر… 🤔' : askReply || 'اكتب سؤالك أو اضغط المايك وتكلم 🎙️'}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={startMic} disabled={askBusy} className={`p-2.5 rounded-xl text-white ${listening ? 'bg-rose-500 animate-pulse' : 'bg-[#002147]'}`} aria-label="mic"><Mic size={16} /></button>
                <input value={askText} onChange={e => setAskText(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') sendAsk(askText); }}
                  placeholder="سؤالك عن الدرس…" className="flex-1 min-w-0 px-3 py-2 rounded-xl border-2 border-slate-200 text-[13px]" />
                <button onClick={() => sendAsk(askText)} disabled={askBusy || !askText.trim()} className="p-2.5 rounded-xl bg-[#58cc02] text-white disabled:opacity-50" aria-label="send"><Send size={16} /></button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SaraTrackPlayer;

/** Shared with Sara's tools: same one-request-per-page cached cloud voice (no substitute voice). */
export const saraNarrate = narrate;
export const saraStopNarrator = stopNarrator;
export const saraUnlockNarrator = unlockNarrator;
