import MixedText from './MixedText';
import { SaraNewLevelTest } from './SaraNewLevelTest';
import SaraLevelledList from './SaraLevelledList';
import { levelTitleAr, type NewLevelId } from '../lib/saraNewTrackTests';
import React, { useEffect, useMemo, useState } from 'react';
import { X, ArrowRight, Lock, CheckCircle2, Volume2, RotateCcw } from 'lucide-react';
import { DAILY_LESSONS, DAILY_TRACK_ID, type SaraDailyLesson } from '../data/saraTracks/dailyLife';
import { readUnlocked, progressKey, saraNarrate, saraStopNarrator, saraUnlockNarrator, pauseNarrator, resumeNarrator } from './SaraTrackPlayer';
import { pushTrackProgress, syncTrackProgress } from '../lib/saraProgressSync';
import SpeakingDrillCheck from './SpeakingDrillCheck';

interface Props { isOpen: boolean; onClose: () => void; uid?: string; unlockAll?: boolean }

function shuffle<T>(a: T[], seed: number): T[] {
  const r = [...a]; let s = seed * 9301 + 49297;
  for (let i = r.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const j = Math.floor((s / 233280) * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
}
type Step = 'learn' | 'dialogue' | 'practice' | 'role' | 'done';

const Lesson: React.FC<{ l: SaraDailyLesson; onBack: () => void; onPassed: () => void }> = ({ l, onBack, onPassed }) => {
  const [step, setStep] = useState<Step>('learn');
  const [audio, setAudio] = useState<{ t: string; s: 'loading' | 'failed' } | null>(null);
  const [paused, setPaused] = useState(false);
  const say = (t: string) => {
    saraUnlockNarrator(); setPaused(false); setAudio({ t, s: 'loading' });
    saraNarrate(t, () => setAudio({ t, s: 'failed' }), () => setAudio({ t, s: 'failed' }), () => setAudio(null));
    setTimeout(() => setAudio(a => (a && a.t === t && a.s === 'loading' ? null : a)), 1500);
  };
  useEffect(() => () => saraStopNarrator(), []);
  const learnText = `${l.introAr} ${l.phrases.map(p => p.en).join(' ')}`;
  const dialogueText = l.dialogue.map(d => d.en).join(' ');
  useEffect(() => { if (step === 'learn') say(learnText); if (step === 'dialogue') say(dialogueText); }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  // Practice: 3 phrases → meaning (distractors from this lesson's phrases).
  const practice = useMemo(() => shuffle(l.phrases, l.order).slice(0, 3).map((p, i) => {
    const opts = shuffle([p.ar, ...shuffle(l.phrases.filter(x => x.en !== p.en), l.order + i).slice(0, 2).map(x => x.ar)], l.order * 5 + i);
    return { en: p.en, options: opts, correct: opts.indexOf(p.ar) };
  }), [l]);
  const [qi, setQi] = useState(0); const [picked, setPicked] = useState<number | null>(null); const [right, setRight] = useState(0);
  // Role-play: Sara says each A line; the student picks then says the B reply (others from other scenarios as distractors).
  const turns = useMemo(() => {
    const others = DAILY_LESSONS.filter(x => x.id !== l.id).flatMap(x => x.dialogue.filter(d => d.sp === 'B'));
    return [0, 2].map((ai, k) => {
      const a = l.dialogue[ai], b = l.dialogue[ai + 1];
      const opts = shuffle([b.en, ...shuffle(others, l.order * 3 + k).slice(0, 2).map(o => o.en)], l.order * 11 + k);
      return { a, b, options: opts, correct: opts.indexOf(b.en) };
    });
  }, [l]);
  const [ti, setTi] = useState(0); const [rp, setRp] = useState<number | null>(null); const [tries, setTries] = useState(0); const [spoke, setSpoke] = useState(false);
  useEffect(() => { if (step === 'role') say(turns[ti].a.en); }, [step, ti]); // eslint-disable-line react-hooks/exhaustive-deps
  const practicePass = right >= 2;
  const nextTurn = () => {
    setRp(null); setTries(0); setSpoke(false);
    if (ti + 1 < turns.length) setTi(ti + 1); else { setStep('done'); if (practicePass) onPassed(); }
  };
  const controls = (text: string) => (
    <div className="flex gap-1.5">
      <button onClick={() => say(text)} className="flex-1 py-1.5 rounded-xl bg-[#C49E3A] text-[#002147] text-[12px] font-black flex items-center justify-center gap-1">
        {audio?.s === 'failed' ? <><RotateCcw size={13} />تعذّر الصوت، إعادة المحاولة</> : audio?.s === 'loading' ? 'سارة تجهّز الصوت…' : <><Volume2 size={13} />{step === 'dialogue' ? 'اسمع الحوار' : 'اشرحي يا سارة'}</>}
      </button>
      <button onClick={() => { if (paused) { resumeNarrator(); setPaused(false); } else { pauseNarrator(); setPaused(true); } }} className="px-3 py-1.5 rounded-xl bg-[#002147] text-amber-300 text-[12px] font-black">{paused ? '▶️ كمّلي' : '⏸️ إيقاف مؤقت'}</button>
    </div>
  );
  const go = (s: Step) => { saraStopNarrator(); setAudio(null); setStep(s); };
  const stepNo = { learn: 1, dialogue: 2, practice: 3, role: 4, done: 4 }[step];
  return (
    <div className="flex-1 min-h-0 flex flex-col p-2.5 gap-1.5 overflow-hidden" data-testid="daily-lesson">
      <div className="flex items-center gap-2">
        <button onClick={onBack} className="p-1.5 rounded-lg bg-[#002147] text-white" aria-label="back"><ArrowRight size={16} /></button>
        <p className="flex-1 text-[14px] font-black text-[#002147] truncate">{((l.order - 1) % 30) + 1}. {l.icon} {l.titleAr}</p>
        <span className="text-[10px] font-black px-1.5 rounded bg-[#002147] text-amber-300">{stepNo}/4</span>
      </div>
      {step === 'learn' && <>
        {controls(learnText)}
        <p className="text-[12.5px] leading-snug font-bold text-slate-700 bg-white rounded-xl border-2 border-amber-300 p-2"><MixedText text={l.introAr} /></p>
        <div className="grid gap-1.5">
          {l.phrases.map((p, i) => (
            <button key={i} onClick={() => say(p.en)} className="text-start rounded-xl bg-[#002147] px-2.5 py-1.5 flex items-center gap-2">
              <Volume2 size={14} className="text-[#C49E3A] shrink-0" />
              <span className="flex-1 min-w-0"><span dir="ltr" className="block text-[13.5px] font-black text-white text-left">{p.en}</span><span className="block text-[12px] font-bold text-amber-300">{p.ar}</span></span>
            </button>
          ))}
        </div>
        <button onClick={() => go('dialogue')} className="mt-auto py-2.5 rounded-xl bg-[#002147] text-amber-300 font-black text-sm">التالي: الحوار</button>
      </>}
      {step === 'dialogue' && <>
        {controls(dialogueText)}
        <div className="grid gap-1.5">
          {l.dialogue.map((d, i) => (
            <div key={i} className={`rounded-xl px-2.5 py-1.5 border-2 ${d.sp === 'A' ? 'bg-white border-amber-300' : 'bg-[#002147] border-[#002147]'}`}>
              <p dir="ltr" className={`text-[13.5px] font-black text-left ${d.sp === 'A' ? 'text-[#002147]' : 'text-white'}`}>{d.sp === 'A' ? '👩 Sara: ' : '🙋 You: '}{d.en}</p>
              <p className={`text-[12px] font-bold ${d.sp === 'A' ? 'text-slate-500' : 'text-amber-300'}`}>{d.ar}</p>
            </div>
          ))}
        </div>
        <button onClick={() => go('practice')} className="mt-auto py-2.5 rounded-xl bg-[#002147] text-amber-300 font-black text-sm">التالي: التمارين</button>
      </>}
      {step === 'practice' && <>
        <p className="text-[12px] font-black text-[#C49E3A]">تمرين {qi + 1}/3: وش معنى العبارة؟</p>
        <div className="rounded-2xl bg-white border-2 border-amber-300 p-3 text-center">
          <p dir="ltr" className="text-[18px] font-black text-[#002147]">{practice[qi].en}</p>
          <button onClick={() => say(practice[qi].en)} className="mt-1 px-2 py-0.5 rounded-lg bg-[#C49E3A] text-[#002147] text-[11px] font-black inline-flex items-center gap-1">{audio?.s === 'failed' ? <RotateCcw size={12} /> : <Volume2 size={12} />}اسمع</button>
        </div>
        <div className="grid gap-1.5">
          {practice[qi].options.map((o, oi) => {
            const st = picked === null ? 'bg-white border-slate-200' : oi === practice[qi].correct ? 'bg-emerald-100 border-emerald-500' : picked === oi ? 'bg-rose-100 border-rose-400' : 'opacity-60 border-slate-200';
            return <button key={oi} disabled={picked !== null} onClick={() => setPicked(oi)} className={`py-2 px-2 rounded-xl border-2 text-[14px] font-black text-[#002147] ${st}`}>{o}</button>;
          })}
        </div>
        {picked !== null && <button onClick={() => { const r = right + (picked === practice[qi].correct ? 1 : 0); setRight(r); setPicked(null); if (qi < 2) setQi(qi + 1); else go('role'); }} className="py-2.5 rounded-xl bg-[#002147] text-amber-300 font-black text-sm">التالي</button>}
      </>}
      {step === 'role' && (() => { const t = turns[ti]; return <>
        <p className="text-[12px] font-black text-[#C49E3A]">لعب الأدوار {ti + 1}/2: سارة تكلمك، اختر ردك وقله بصوتك</p>
        <button onClick={() => say(t.a.en)} className="text-start rounded-xl bg-white border-2 border-amber-300 px-2.5 py-2 flex items-center gap-2">
          {audio?.s === 'failed' ? <RotateCcw size={15} className="text-rose-600 shrink-0" /> : <Volume2 size={15} className="text-[#C49E3A] shrink-0" />}
          <span dir="ltr" className="flex-1 text-[14px] font-black text-[#002147] text-left">👩 {t.a.en}</span>
        </button>
        <div className="grid gap-1.5">
          {t.options.map((o, oi) => {
            const st = rp === null ? 'bg-white border-slate-200' : oi === t.correct ? 'bg-emerald-100 border-emerald-500' : rp === oi ? 'bg-rose-100 border-rose-400' : 'opacity-60 border-slate-200';
            return <button key={oi} dir="ltr" disabled={rp === t.correct} onClick={() => setRp(oi)} className={`py-1.5 px-2 rounded-xl border-2 text-[13px] font-bold text-[#002147] text-left ${st}`}>{o}</button>;
          })}
        </div>
        {rp !== null && rp !== t.correct && <p className="text-[11px] font-black text-rose-600">مو هذا الرد المناسب. جرّب مرة ثانية.</p>}
        {rp === t.correct && <div className="rounded-xl bg-[#002147] p-2">
          <p className="text-[12px] font-black text-amber-300">قلها بصوتك: <span className="text-white/80">{t.b.ar}</span></p>
          <SpeakingDrillCheck expected={t.b.en} isRtl attempts={tries} passed={spoke} onResult={ok => { setTries(n => n + 1); if (ok) setSpoke(true); }} />
          {(spoke || tries >= 3) && <button onClick={nextTurn} className="mt-1.5 w-full py-2 rounded-xl bg-[#C49E3A] text-[#002147] font-black text-sm">{ti + 1 < turns.length ? 'التالي' : 'إنهاء'}</button>}
        </div>}
      </>; })()}
      {step === 'done' && <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center">
        <p className="text-4xl">{practicePass ? '🎉' : '💪'}</p>
        <p className="text-[15px] font-black text-[#002147]">التمارين {right}/3</p>
        <p className="text-[13px] font-bold text-slate-600">{practicePass ? 'أحسنت! انفتح الموقف التالي.' : 'تحتاج ٢ من ٣ في التمارين عشان ينفتح التالي. أعد الدرس.'}</p>
        <div className="flex gap-2 w-full">
          {!practicePass && <button onClick={() => { setStep('learn'); setQi(0); setRight(0); setTi(0); }} className="flex-1 py-2.5 rounded-xl bg-[#002147] text-amber-300 font-black text-sm">أعد الدرس</button>}
          <button onClick={onBack} className="flex-1 py-2.5 rounded-xl bg-[#C49E3A] text-[#002147] font-black text-sm">رجوع للمواقف</button>
        </div>
      </div>}
    </div>
  );
};

export const SaraDailyPlayer: React.FC<Props> = ({ isOpen, onClose, uid, unlockAll }) => {
  const [unlockedRaw, setUnlocked] = useState(() => readUnlocked(DAILY_TRACK_ID, uid));
  const [active, setActive] = useState<SaraDailyLesson | null>(null);
  const [testing, setTesting] = useState<NewLevelId | null>(null);
  const [testTick, setTestTick] = useState(0);
  useEffect(() => {
    if (!isOpen) return;
    setUnlocked(readUnlocked(DAILY_TRACK_ID, uid));
    if (uid) syncTrackProgress(uid, [DAILY_TRACK_ID]).then(c => { if (c) setUnlocked(readUnlocked(DAILY_TRACK_ID, uid)); });
  }, [isOpen, uid]);
  if (!isOpen) return null;
  const passed = Math.min(DAILY_LESSONS.length, unlockedRaw - 1);
  const onPassed = (l: SaraDailyLesson) => setUnlocked(cur => {
    const next = l.order + 1; if (next <= cur) return cur;
    try { localStorage.setItem(progressKey(DAILY_TRACK_ID, uid), String(next)); } catch { /* ignore */ }
    void pushTrackProgress(uid, DAILY_TRACK_ID, next); return next;
  });
  return (
    <div className="fixed inset-0 z-[210] bg-slate-950/60 flex items-stretch justify-center" dir="rtl">
      <div data-testid="sara-daily" className="w-full max-w-xl h-[100dvh] bg-[#fdfaf3] flex flex-col overflow-hidden">
        <div className="shrink-0 flex items-center gap-2 px-3 py-2 bg-[#002147] text-white">
          <span className="text-lg">🌍</span>
          <p className="flex-1 text-sm font-black">إنجليزي الحياة اليومية{active ? ` — ${levelTitleAr(active.levelId)}` : ''}</p>
          <span className="text-[11px] text-amber-300 font-bold">{passed}/{DAILY_LESSONS.length}</span>
          <button onClick={() => { saraStopNarrator(); onClose(); }} className="p-1.5 rounded-lg hover:bg-white/10" aria-label="close"><X size={18} /></button>
        </div>
        {active ? <Lesson key={active.id} l={active} onBack={() => setActive(null)} onPassed={() => onPassed(active)} /> : (
          <SaraLevelledList lessons={DAILY_LESSONS} unlockedRaw={unlockedRaw} unlockAll={unlockAll} uid={uid} track="daily" trackId={DAILY_TRACK_ID}
            refresh={testTick} onOpen={l => setActive(DAILY_LESSONS.find(x => x.id === l.id) || null)} onTest={lv => setTesting(lv)} />
        )}
        {testing && <SaraNewLevelTest track="daily" level={testing} uid={uid} onClose={() => { setTesting(null); setTestTick(n => n + 1); }} />}
      </div>
    </div>
  );
};
export default SaraDailyPlayer;
