import { SaraNewLevelTest } from './SaraNewLevelTest';
import SaraLevelledList from './SaraLevelledList';
import SaraLessonBoard from './SaraLessonBoard';
import { levelTitleAr, type NewLevelId } from '../lib/saraNewTrackTests';
import React, { useEffect, useMemo, useState } from 'react';
import { X, ArrowRight, ArrowLeft, Lock, CheckCircle2, Volume2, RotateCcw } from 'lucide-react';
import { VOCAB_LESSONS, VOCAB_TRACK_ID, type SaraVocabLesson, type SaraVocabWord } from '../data/saraTracks/vocabulary';
import { readUnlocked, progressKey, saraNarrate, saraStopNarrator, saraUnlockNarrator, pauseNarrator, resumeNarrator } from './SaraTrackPlayer';
import { pushTrackProgress, syncTrackProgress } from '../lib/saraProgressSync';
import SaraLessonCall, { lessonCallPreset, levelToCefr } from './SaraLessonCall';

interface Props { isOpen: boolean; onClose: () => void; uid?: string; unlockAll?: boolean }
interface Q { promptAr: string; show: string; options: string[]; correct: number; say?: string }
const PASS = 80;

/** Deterministic shuffle (same lesson → same order), so answers are not always in one slot. */
function shuffle<T>(a: T[], seed: number): T[] {
  const r = [...a]; let s = seed * 9301 + 49297;
  for (let i = r.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const j = Math.floor((s / 233280) * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
}
function makeQ(w: SaraVocabWord, pool: SaraVocabWord[], kind: number, seed: number): Q {
  const others = shuffle(pool.filter(x => x.en !== w.en), seed).slice(0, 2);
  if (kind % 2 === 0) {
    const opts = shuffle([w.ar, ...others.map(o => o.ar)], seed + 1);
    return { promptAr: 'وش معنى الكلمة؟', show: w.en, options: opts, correct: opts.indexOf(w.ar), say: w.en };
  }
  const opts = shuffle([w.en, ...others.map(o => o.en)], seed + 2);
  return { promptAr: 'أي كلمة تناسب الصورة؟', show: `${w.emoji} ${w.ar}`, options: opts, correct: opts.indexOf(w.en) };
}
/** Spaced review: words from 1, 3 and 7 lessons back. */
function reviewQs(l: SaraVocabLesson): Q[] {
  const back = [1, 3, 7].map(d => VOCAB_LESSONS[l.order - 1 - d]).filter(Boolean) as SaraVocabLesson[];
  return back.flatMap((b, i) => shuffle(b.words, l.order + i).slice(0, i === 0 ? 2 : 1).map((w, k) => makeQ(w, b.words, k + i, l.order * 7 + i * 3 + k)));
}

type Step = 'learn' | 'practice' | 'review' | 'done';

const Lesson: React.FC<{ l: SaraVocabLesson; onBack: () => void; onPassed: () => void; onBoard?: () => void; uid?: string }> = ({ l, onBack, onPassed, onBoard, uid }) => {
  const [step, setStep] = useState<Step>('learn');
  const [card, setCard] = useState(0);
  const [audio, setAudio] = useState<null | 'loading' | 'failed'>(null);
  const [paused, setPaused] = useState(false);
  const practice = useMemo(() => shuffle(l.words, l.order).slice(0, 6).map((w, i) => makeQ(w, l.words, i, l.order * 13 + i)), [l]);
  const review = useMemo(() => reviewQs(l), [l]);
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [right, setRight] = useState(0);
  const intro = `${l.titleAr}: عشر كلمات. اسمعها وكرّرها مع سارة، كلمة كلمة.`;
  const w = l.words[card];
  const cardText = `${w.en}. ${w.ar}. ${w.example}`;
  const say = (text: string) => {
    saraUnlockNarrator(); setPaused(false); setAudio('loading');
    saraNarrate(text, () => setAudio('failed'), () => setAudio('failed'), () => setAudio(null));
    setTimeout(() => setAudio(a => (a === 'loading' ? null : a)), 1500);
  };
  useEffect(() => () => saraStopNarrator(), []);
  // Sara explains on open (intro + first card, exactly as shown), then reads each card when it appears.
  useEffect(() => { if (step === 'learn') say(card === 0 ? `${intro} ${cardText}` : cardText); }, [card, step]); // eslint-disable-line react-hooks/exhaustive-deps
  const qs = step === 'practice' ? practice : review;
  const q = qs[qi];
  const total = practice.length + review.length;
  const next = () => {
    const ok = picked === q.correct; const r = right + (ok ? 1 : 0); setRight(r); setPicked(null);
    if (qi + 1 < qs.length) { setQi(qi + 1); return; }
    if (step === 'practice' && review.length) { setStep('review'); setQi(0); return; }
    setStep('done'); if (Math.round((r / total) * 100) >= PASS) onPassed();
  };
  const score = Math.round((right / total) * 100);
  const controls = (
    <div className="flex gap-1.5">
      <button onClick={() => say(step === 'learn' ? (card === 0 ? `${intro} ${cardText}` : cardText) : q?.say || '')} className="flex-1 py-1.5 rounded-xl bg-[#C49E3A] text-[#002147] text-[12px] font-black flex items-center justify-center gap-1">
        {audio === 'failed' ? <><RotateCcw size={13} />تعذّر الصوت، إعادة المحاولة</> : audio === 'loading' ? 'سارة تجهّز الصوت…' : <><Volume2 size={13} />اشرحي يا سارة</>}
      </button>
      <button onClick={() => { if (paused) { resumeNarrator(); setPaused(false); } else { pauseNarrator(); setPaused(true); } }} className="px-3 py-1.5 rounded-xl bg-[#002147] text-amber-300 text-[12px] font-black">{paused ? '▶️ كمّلي' : '⏸️ إيقاف مؤقت'}</button>
    </div>
  );
  return (
    <div className="flex-1 min-h-0 flex flex-col p-2.5 gap-2 overflow-hidden" data-testid="vocab-lesson">
      <div className="flex items-center gap-2">
        <button onClick={onBack} className="p-1.5 rounded-lg bg-[#002147] text-white" aria-label="back"><ArrowRight size={16} /></button>
        <p className="flex-1 text-[14px] font-black text-[#002147] truncate">{((l.order - 1) % 30) + 1}. {l.icon} {l.titleAr}</p>
        {onBoard && <button onClick={() => { saraStopNarrator(); onBoard(); }} data-testid="open-board" className="shrink-0 px-1.5 py-1 rounded-lg bg-[#083344] text-teal-100 border border-teal-400/60 text-[10px] font-black leading-tight">🧑‍🏫 اشرح بالسبورة التفاعلية</button>}
        <span className="text-[10px] font-black px-1.5 rounded bg-[#002147] text-amber-300">{step === 'learn' ? `${card + 1}/10` : step === 'done' ? '✓' : `${(step === 'review' ? practice.length : 0) + qi + 1}/${total}`}</span>
      </div>
      {step === 'learn' && <>
        {controls}
        {card === 0 && <p className="text-[12.5px] font-bold text-slate-700">{intro}</p>}
        <div className="flex-1 min-h-0 rounded-2xl bg-[#002147] border-2 border-[#C49E3A] flex flex-col items-center justify-center gap-2 p-3 text-center">
          <span className="text-6xl leading-none">{w.emoji}</span>
          <p dir="ltr" className="text-3xl font-black text-white">{w.en}</p>
          <p className="text-xl font-black text-amber-300">{w.ar}</p>
          <p dir="ltr" className="text-[14px] font-bold text-slate-200">{w.example}</p>
        </div>
        <div className="flex gap-2">
          <button disabled={card === 0} onClick={() => setCard(c => c - 1)} className="px-4 py-2.5 rounded-xl bg-white border-2 border-amber-300 text-[#002147] disabled:opacity-40" aria-label="prev"><ArrowRight size={16} /></button>
          <button onClick={() => (card < 9 ? setCard(c => c + 1) : (saraStopNarrator(), setStep('practice')))} className="flex-1 py-2.5 rounded-xl bg-[#002147] text-amber-300 font-black text-sm flex items-center justify-center gap-1">
            {card < 9 ? <>الكلمة التالية <ArrowLeft size={15} /></> : 'ابدأ التمارين'}
          </button>
        </div>
      </>}
      {(step === 'practice' || step === 'review') && q && <>
        <p className="text-[12px] font-black text-[#C49E3A]">{step === 'review' ? 'مراجعة كلمات الدروس السابقة' : 'تمارين الدرس'}</p>
        <div className="rounded-2xl bg-white border-2 border-amber-300 p-3 text-center">
          <p className="text-[12px] font-bold text-slate-600">{q.promptAr}</p>
          <p dir="auto" className="text-2xl font-black text-[#002147] mt-1">{q.show}</p>
          {q.say && <button onClick={() => say(q.say!)} className="mt-1 px-2 py-0.5 rounded-lg bg-[#C49E3A] text-[#002147] text-[11px] font-black inline-flex items-center gap-1">{audio === 'failed' ? <RotateCcw size={12} /> : <Volume2 size={12} />}اسمع</button>}
        </div>
        <div className="grid gap-1.5">
          {q.options.map((o, oi) => {
            const st = picked === null ? 'bg-white border-slate-200' : oi === q.correct ? 'bg-emerald-100 border-emerald-500' : picked === oi ? 'bg-rose-100 border-rose-400' : 'opacity-60 border-slate-200';
            return <button key={oi} dir="auto" disabled={picked !== null} onClick={() => setPicked(oi)} className={`py-2 rounded-xl border-2 text-[15px] font-black text-[#002147] ${st}`}>{o}</button>;
          })}
        </div>
        {picked !== null && <button onClick={next} className="py-2.5 rounded-xl bg-[#002147] text-amber-300 font-black text-sm">التالي</button>}
      </>}
      {step === 'done' && <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center">
        <p className="text-4xl">{score >= PASS ? '🎉' : '💪'}</p>
        <p className="text-[15px] font-black text-[#002147]">{right}/{total} صحيحة ({score}%)</p>
        <p className="text-[13px] font-bold text-slate-600">{score >= PASS ? 'أحسنت! انفتح الدرس التالي.' : `تحتاج ${PASS}% عشان ينفتح الدرس التالي. راجع الكلمات وحاول مرة ثانية.`}</p>
        <SaraLessonCall uid={uid} level={levelToCefr(l.levelId)}
          preset={lessonCallPreset({ id: l.id, titleAr: l.titleAr, titleEn: l.titleEn, icon: l.icon, kind: 'vocab', tag: 'vocab', phrases: l.words.slice(0, 5).map(w => w.en),
            starter: `Let's talk about ${l.titleEn.toLowerCase()} and use our new words. ${l.words[0]?.example || ''} What about you?` })} />
        <div className="flex gap-2 w-full">
          {score < PASS && <button onClick={() => { setStep('learn'); setCard(0); setQi(0); setRight(0); }} className="flex-1 py-2.5 rounded-xl bg-[#002147] text-amber-300 font-black text-sm">أعد الدرس</button>}
          <button onClick={onBack} className="flex-1 py-2.5 rounded-xl bg-[#C49E3A] text-[#002147] font-black text-sm">رجوع للدروس</button>
        </div>
      </div>}
    </div>
  );
};

/** Whiteboard version of a vocabulary lesson: how to learn the words, the 10 words, then meaning exercises. */
const boardOf = (l: SaraVocabLesson) => {
  const qs = [0, 3, 6, 9].map((k, i) => { const w = l.words[k]; const others = l.words.filter(x => x.en !== w.en);
    const opts = [w.ar, others[(i * 3) % others.length].ar, others[(i * 3 + 4) % others.length].ar]; const r = i % 3; const o = [...opts.slice(r), ...opts.slice(0, r)];
    return { promptAr: `وش معنى «${w.en}»؟`, promptEn: w.example, options: o, correctIndex: o.indexOf(w.ar), play: w.en }; });
  return { titleAr: `${l.icon} ${l.titleAr}`, titleEn: l.titleEn,
    points: [`في هالدرس ١٠ كلمات عن ${l.titleAr}.`, 'اسمع كل كلمة من سارة وقلها بصوت عالي.', 'احفظ الكلمة داخل جملة، مو لحالها.', `مثال: ${l.words[0].example}`],
    examplesTitle: 'كلمات الدرس', compactExamples: true, examples: l.words.map(w => ({ en: `${w.emoji} ${w.en}`, ar: w.ar })), questions: qs };
};

export const SaraVocabPlayer: React.FC<Props> = ({ isOpen, onClose, uid, unlockAll }) => {
  const [unlockedRaw, setUnlocked] = useState(() => readUnlocked(VOCAB_TRACK_ID, uid));
  const [active, setActive] = useState<SaraVocabLesson | null>(null);
  const [board, setBoard] = useState(false);
  const [testing, setTesting] = useState<NewLevelId | null>(null);
  const [testTick, setTestTick] = useState(0);
  useEffect(() => {
    if (!isOpen) return;
    setUnlocked(readUnlocked(VOCAB_TRACK_ID, uid));
    if (uid) syncTrackProgress(uid, [VOCAB_TRACK_ID]).then(c => { if (c) setUnlocked(readUnlocked(VOCAB_TRACK_ID, uid)); });
  }, [isOpen, uid]);
  if (!isOpen) return null;
  const passed = Math.min(VOCAB_LESSONS.length, unlockedRaw - 1);
  const onPassed = (l: SaraVocabLesson) => setUnlocked(cur => {
    const next = l.order + 1; if (next <= cur) return cur;
    try { localStorage.setItem(progressKey(VOCAB_TRACK_ID, uid), String(next)); } catch { /* ignore */ }
    void pushTrackProgress(uid, VOCAB_TRACK_ID, next); return next;
  });
  return (
    <div className="fixed inset-0 z-[210] bg-slate-950/60 flex items-stretch justify-center" dir="rtl">
      <div data-testid="sara-vocab" className="w-full max-w-xl h-[100dvh] bg-[#fdfaf3] flex flex-col overflow-hidden">
        <div className="shrink-0 flex items-center gap-2 px-3 py-2 bg-[#002147] text-white">
          <span className="text-lg">🔤</span>
          <p className="flex-1 text-sm font-black">{active ? `المفردات — ${levelTitleAr(active.levelId)}` : 'المفردات'}</p>
          <span className="text-[11px] text-amber-300 font-bold">{passed}/{VOCAB_LESSONS.length}</span>
          <button onClick={() => { saraStopNarrator(); onClose(); }} className="p-1.5 rounded-lg hover:bg-white/10" aria-label="close"><X size={18} /></button>
        </div>
        {active ? (board ? <SaraLessonBoard key={'board-' + active.id} {...boardOf(active)} onClose={() => setBoard(false)} onPassed={() => onPassed(active)}
            onNextLesson={(active.order % 30 ? VOCAB_LESSONS[active.order] : undefined) ? () => { setBoard(false); setActive((active.order % 30 ? VOCAB_LESSONS[active.order] : undefined)!); } : undefined} />
          : <Lesson key={active.id} l={active} onBack={() => { setBoard(false); setActive(null); }} onPassed={() => onPassed(active)} onBoard={() => setBoard(true)} uid={uid} />) : (
          <SaraLevelledList lessons={VOCAB_LESSONS} unlockedRaw={unlockedRaw} unlockAll={unlockAll} uid={uid} track="vocabulary" trackId={VOCAB_TRACK_ID}
            refresh={testTick} onOpen={l => setActive(VOCAB_LESSONS.find(x => x.id === l.id) || null)} onTest={lv => setTesting(lv)} />
        )}
        {testing && <SaraNewLevelTest track="vocabulary" level={testing} uid={uid} onClose={() => { setTesting(null); setTestTick(n => n + 1); }} />}
      </div>
    </div>
  );
};
export default SaraVocabPlayer;
