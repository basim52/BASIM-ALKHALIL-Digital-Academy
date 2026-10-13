import React, { useEffect, useMemo, useState } from 'react';
import { X, ArrowRight, Lock, Volume2, Square, CheckCircle2, Mic, Send } from 'lucide-react';
import { auth } from '../lib/firebase';
import type { SaraTrack, SaraTrackLesson, SaraChoiceQuestion } from '../data/saraTracks/foundations';
import { prefetchAcademyAudio, cancelAllSpeech } from '../lib/audio';
import { boardLinesToSpeech } from '../utils/boardToSpeech';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  track: SaraTrack;
  uid?: string;
}

// ---- Sara narrator: same cloud voice as her chat (Gemini 'Kore' via /api/tts), one primed <audio> element.
// The element is "unlocked" inside the user's tap, so mobile browsers allow the later playback.
const SILENT_WAV = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
let narratorEl: HTMLAudioElement | null = null;
let narratorToken = 0;
function getNarrator(): HTMLAudioElement {
  if (!narratorEl) { narratorEl = new Audio(); narratorEl.preload = 'auto'; }
  return narratorEl;
}
/** Call synchronously inside a click/tap handler. */
function unlockNarrator() {
  const el = getNarrator();
  try { el.src = SILENT_WAV; const p = el.play(); if (p) p.catch(() => {}); } catch { /* ignore */ }
}
function stopNarrator() {
  narratorToken++;
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
type Seg = { text: string; lang: 'ar' | 'en' };
const langOf = (t: string): 'ar' | 'en' => (/[\u0600-\u06FF]/.test(t) ? 'ar' : 'en');
async function narrate(segs: Seg[], onSeg: (i: number) => void, onBlocked: () => void, onDone: () => void) {
  const token = ++narratorToken;
  cancelAllSpeech(); // nothing else speaks at the same time
  const audios = segs.map(sg => prefetchAcademyAudio(sg.text, sg.lang, 'Kore'));
  for (let i = 0; i < segs.length; i++) {
    const b64 = await audios[i];
    if (token !== narratorToken) return;
    if (!b64) continue;
    onSeg(i);
    const el = getNarrator();
    const url = URL.createObjectURL(new Blob([Uint8Array.from(atob(b64), c => c.charCodeAt(0))], { type: 'audio/wav' }));
    el.src = url;
    const ok = await new Promise<boolean>(resolve => {
      el.onended = () => resolve(true);
      el.onerror = () => resolve(true);
      el.play().catch(err => { resolve(err?.name === 'NotAllowedError' ? false : true); });
    });
    URL.revokeObjectURL(url);
    if (token !== narratorToken) return;
    if (!ok) { onBlocked(); return; }
  }
  if (token === narratorToken) onDone();
}

const progressKey = (trackId: string, uid?: string) => `sara_track_${trackId}_${uid || 'guest'}`;
const readUnlocked = (trackId: string, uid?: string) => {
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

export const SaraTrackPlayer: React.FC<Props> = ({ isOpen, onClose, track, uid }) => {
  const [unlocked, setUnlocked] = useState(() => readUnlocked(track.id, uid));
  const [lessonId, setLessonId] = useState<string | null>(null);
  const [useAlt, setUseAlt] = useState(false);
  const [checkPick, setCheckPick] = useState<number | null>(null);
  const [mode, setMode] = useState<'learn' | 'exercises'>('learn');
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
  const stop = () => { stopNarrator(); setSpeaking(false); setActiveSeg(-1); };
  useEffect(() => () => stopNarrator(), []);
  useEffect(() => { if (!isOpen) stop(); }, [isOpen]);

  const lesson = useMemo(() => track.lessons.find(l => l.id === lessonId) || null, [lessonId, track]);

  /** Narrate the page lines: segments = the exact on-screen lines (title, explanation, each example line). */
  const startNarration = (l: SaraTrackLesson, alt: boolean) => {
    if (!l.content) return;
    stop();
    const segs: Seg[] = lessonPageLines(l, alt).map(line => {
      const text = boardLinesToSpeech([line]);
      return { text, lang: langOf(line) };
    });
    setBlocked(false);
    setSpeaking(true);
    narrate(segs, setActiveSeg, () => { setSpeaking(false); setActiveSeg(-1); setBlocked(true); }, () => { setSpeaking(false); setActiveSeg(-1); });
  };
  const openLesson = (l: SaraTrackLesson) => {
    unlockNarrator(); // inside the tap
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
      else { const b64 = await prefetchAcademyAudio(boardLinesToSpeech([reply]), 'ar', 'Kore'); if (b64) await playB64(b64); }
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
  const answerCheck = (i: number) => {
    if (!lesson?.content) return;
    unlockNarrator();
    stop();
    setCheckPick(i);
    if (i === lesson.content.check.correctIndex) {
      const next = Math.min(track.lessons.length, lesson.order + 1);
      if (next > unlocked) {
        setUnlocked(next);
        try { localStorage.setItem(progressKey(track.id, uid), String(next)); } catch { /* ignore */ }
      }
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
          {lesson ? (
            <button onClick={() => { stop(); setLessonId(null); }} className="p-1.5 rounded-lg hover:bg-white/10" aria-label="back"><ArrowRight size={18} /></button>
          ) : <span className="text-lg">📚</span>}
          <div className="min-w-0 flex-1">
            <p className="text-[10px] text-amber-300 font-bold truncate">{track.titleAr}</p>
            <p className="text-sm font-black truncate">{lesson ? `${lesson.order}. ${lesson.titleAr}` : `${track.lessons.length} درس`}</p>
          </div>
          {lesson?.content && mode === 'learn' && (
            <button onClick={speaking ? stop : speak} className="p-1.5 rounded-lg bg-amber-400 text-slate-950" aria-label="read">
              {speaking ? <Square size={16} /> : <Volume2 size={16} />}
            </button>
          )}
          <button onClick={() => { stop(); onClose(); }} className="p-1.5 rounded-lg hover:bg-white/10" aria-label="close"><X size={18} /></button>
        </div>

        {/* Lesson list */}
        {!lesson && (
          <div className="flex-1 min-h-0 overflow-y-auto p-3 grid gap-1.5 content-start">
            {track.lessons.map(l => {
              const open = l.order <= unlocked;
              return (
                <button key={l.id} disabled={!open} onClick={() => openLesson(l)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-start ${open ? 'bg-white border-amber-300 shadow-sm' : 'bg-slate-100 border-slate-200 opacity-60'}`}>
                  <span className="w-6 h-6 rounded-full bg-[#002147] text-white text-[11px] font-black flex items-center justify-center shrink-0">{l.order}</span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-[13px] font-black text-slate-800 truncate">{l.titleAr}</span>
                    <span dir="ltr" className="block text-[11px] text-slate-500 truncate text-end">{l.titleEn}</span>
                  </span>
                  {open ? (l.order < unlocked ? <CheckCircle2 size={16} className="text-emerald-600" /> : null) : <Lock size={14} className="text-slate-400" />}
                </button>
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
              <p className={`flex-1 text-[13px] font-black ${activeSeg === 0 ? 'text-amber-700' : 'text-slate-700'}`}>{speaking ? 'سارة تشرح الحين… 🎙️' : `معلمتك سارة — ${lesson.titleAr}`}</p>
              <button onClick={() => { stop(); setAskOpen(true); }} className="px-2.5 py-1 rounded-xl bg-white border-2 border-[#002147]/20 text-[#002147] text-[12px] font-black shrink-0">❓ اسأل سارة</button>
              {blocked && (
                <button onClick={speak} className="px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 text-[12px] font-black animate-bounce">▶️ ابدأي يا سارة</button>
              )}
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
              <p className="text-[10px] font-black text-amber-700 mb-1">سؤال فهم</p>
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
