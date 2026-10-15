import React, { useEffect, useMemo, useState } from 'react';
import { X, ArrowRight, Volume2, RotateCcw, Clock, BookOpen, Headphones, CheckCircle2 } from 'lucide-react';
import MixedText from './MixedText';
import { EXAM_SETS, type ExamKind, type ExamSet } from '../data/saraTracks/examPrep';
import { saraNarrate, saraStopNarrator, saraUnlockNarrator } from './SaraTrackPlayer';
import { readExamResults, saveExamAttempt, syncExamResults } from '../lib/saraExamSync';

interface Props { isOpen: boolean; onClose: () => void; uid?: string }
const spoken = (s: ExamSet) => s.text.map(t => t.replace(/^[^:]{1,20}:\s*/, '')).join(' ');
const fmt = (sec: number) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;

const intro = (s: ExamSet) => s.kind === 'reading'
  ? `تدريب قراءة ${s.exam}. عندك ${s.minutes} دقائق. اقرأ النص ثم جاوب على ${s.questions.length} أسئلة. تقدر ترجع للنص في أي وقت.`
  : `تدريب استماع ${s.exam}. بشغّل لك المقطع، وتقدر تسمعه مرة ثانية للتدريب. عندك ${s.minutes} دقائق للإجابة على ${s.questions.length} أسئلة.`;

const Runner: React.FC<{ s: ExamSet; uid?: string; onBack: () => void }> = ({ s, uid, onBack }) => {
  const [phase, setPhase] = useState<'intro' | 'text' | 'q' | 'result' | 'review'>('intro');
  const [qi, setQi] = useState(0); const [answers, setAnswers] = useState<(number | null)[]>(() => s.questions.map(() => null));
  const [left, setLeft] = useState(s.minutes * 60); const [showText, setShowText] = useState(false);
  const [audio, setAudio] = useState<'idle' | 'loading' | 'playing' | 'failed'>('idle'); const [plays, setPlays] = useState(0);
  const [ri, setRi] = useState(0); const [saved, setSaved] = useState<boolean | null>(null);
  const say = (t: string, isTrack = false) => {
    saraUnlockNarrator(); setAudio('loading');
    saraNarrate(t, () => setAudio('failed'), () => setAudio('failed'), () => setAudio('idle'));
    setTimeout(() => setAudio(a => (a === 'loading' ? 'playing' : a)), 1500);
    if (isTrack) setPlays(p => p + 1);
  };
  useEffect(() => { say(intro(s)); return () => saraStopNarrator(); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const running = phase === 'text' || phase === 'q';
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setLeft(x => (x > 0 ? x - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [running]);
  const finish = () => {
    saraStopNarrator();
    const correct = s.questions.filter((q, i) => answers[i] === q.correctIndex).length;
    saveExamAttempt(uid, s.id, correct, s.questions.length, s.minutes * 60 - left).then(ok => setSaved(ok));
    setPhase('result');
  };
  useEffect(() => { if (running && left === 0) finish(); }, [left, running]); // eslint-disable-line react-hooks/exhaustive-deps
  const correct = s.questions.filter((q, i) => answers[i] === q.correctIndex).length;
  const wrong = s.questions.map((q, i) => ({ q, i })).filter(x => answers[x.i] !== x.q.correctIndex);
  const q = s.questions[qi];
  const start = () => { saraStopNarrator(); setPhase(s.kind === 'reading' ? 'text' : 'q'); if (s.kind === 'listening') say(spoken(s), true); };

  const AudioBar = s.kind === 'listening' ? (
    <div className="flex items-center gap-2 rounded-xl bg-[#002147] text-amber-300 px-2.5 py-1.5 text-[12px] font-bold">
      <Headphones size={16} />
      <span className="flex-1">{audio === 'loading' ? 'سارة تجهّز الصوت…' : audio === 'failed' ? 'تعذّر تشغيل صوت سارة' : plays ? `سمعته ${plays} ${plays > 1 ? 'مرات' : 'مرة'}` : 'المقطع'}</span>
      {audio === 'failed' ? <button onClick={() => say(spoken(s))} className="flex items-center gap-1 rounded-lg bg-amber-300 text-[#002147] px-2 py-1"><RotateCcw size={13} />إعادة المحاولة</button>
        : plays < 2 && <button onClick={() => say(spoken(s), true)} disabled={audio === 'loading'} className="flex items-center gap-1 rounded-lg bg-amber-300 text-[#002147] px-2 py-1 disabled:opacity-50"><Volume2 size={13} />{plays ? 'اسمع مرة ثانية' : 'شغّل'}</button>}
    </div>) : null;

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-2 p-3" data-testid="exam-run">
      <div className="flex items-center gap-2 text-[#002147]">
        <button onClick={() => { saraStopNarrator(); onBack(); }} aria-label="back" className="p-1"><ArrowRight size={18} /></button>
        <p className="flex-1 text-[13px] font-black truncate">{s.exam} · {s.titleAr}</p>
        {running && <span className={`flex items-center gap-1 text-[12px] font-black rounded-lg px-2 py-0.5 ${left < 60 ? 'bg-red-100 text-red-700' : 'bg-slate-100'}`}><Clock size={13} />{fmt(left)}</span>}
      </div>
      {phase === 'intro' && (<div className="flex-1 min-h-0 flex flex-col gap-2">
        <div className="rounded-2xl border-2 border-[#C49E3A] bg-white p-3 text-[13px] font-bold text-slate-700 leading-relaxed">{intro(s)}</div>
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-2.5 text-[12px] text-slate-700 font-bold">أسئلة أصلية مكتوبة للتدريب على أسلوب الاختبار، مو مأخوذة من اختبارات حقيقية. النتيجة = عدد إجاباتك الصحيحة فقط، وما تعني توقّع لدرجتك الرسمية.</div>
        {audio === 'failed' && <button onClick={() => say(intro(s))} className="self-start flex items-center gap-1 rounded-lg bg-[#002147] text-amber-300 px-2.5 py-1.5 text-[12px] font-bold"><RotateCcw size={13} />اشرحي يا سارة</button>}
        <div className="flex-1" />
        <button onClick={start} className="rounded-xl bg-[#002147] text-amber-300 font-black py-3">ابدأ — المؤقت يشتغل</button>
      </div>)}
      {phase === 'text' && (<div className="flex-1 min-h-0 flex flex-col gap-2">
        <p className="text-[11px] font-bold text-[#C49E3A]">{s.titleEn}</p>
        <div className="flex-1 min-h-0 overflow-hidden rounded-2xl bg-white border border-slate-200 p-3 text-[13px] leading-[1.55] text-slate-800" dir="ltr">{s.text.map((t, i) => <p key={i}>{t}</p>)}</div>
        <button onClick={() => setPhase('q')} className="rounded-xl bg-[#002147] text-amber-300 font-black py-2.5">إلى الأسئلة</button>
      </div>)}
      {phase === 'q' && (<div className="flex-1 min-h-0 flex flex-col gap-2">
        {AudioBar}
        {showText ? (<>
          <div className="flex-1 min-h-0 overflow-hidden rounded-2xl bg-white border border-slate-200 p-3 text-[13px] leading-[1.55] text-slate-800" dir="ltr">{s.text.map((t, i) => <p key={i}>{t}</p>)}</div>
          <button onClick={() => setShowText(false)} className="rounded-xl bg-[#002147] text-amber-300 font-black py-2.5">رجوع للسؤال</button>
        </>) : (<>
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
            <span>سؤال {qi + 1} من {s.questions.length}</span>
            {q.type === 'tfng' && <span className="rounded bg-slate-100 px-1.5">TRUE / FALSE / NOT GIVEN</span>}
            <span className="flex-1" />
            {s.kind === 'reading' && <button onClick={() => setShowText(true)} className="flex items-center gap-1 text-[#002147]"><BookOpen size={13} />النص</button>}
          </div>
          <p className="rounded-2xl bg-white border-2 border-[#C49E3A] p-3 text-[14px] font-bold text-[#002147]" dir="ltr">{q.q}</p>
          <div className="flex flex-col gap-1.5">
            {q.options.map((o, i) => (
              <button key={i} dir="ltr" onClick={() => setAnswers(a => a.map((x, j) => (j === qi ? i : x)))}
                className={`text-left rounded-xl border-2 px-3 py-2 text-[13px] font-bold ${answers[qi] === i ? 'border-[#002147] bg-[#002147] text-amber-300' : 'border-slate-200 bg-white text-slate-700'}`}>{o}</button>
            ))}
          </div>
          <div className="flex-1" />
          <div className="flex gap-2">
            {qi > 0 && <button onClick={() => setQi(qi - 1)} className="flex-1 rounded-xl border-2 border-[#002147] text-[#002147] font-black py-2.5">السابق</button>}
            {qi < s.questions.length - 1
              ? <button onClick={() => setQi(qi + 1)} className="flex-1 rounded-xl bg-[#002147] text-amber-300 font-black py-2.5">التالي</button>
              : <button onClick={finish} className="flex-1 rounded-xl bg-[#C49E3A] text-[#002147] font-black py-2.5">إنهاء وتصحيح</button>}
          </div>
        </>)}
      </div>)}
      {phase === 'result' && (<div className="flex-1 min-h-0 flex flex-col gap-2 items-stretch">
        <div className="rounded-2xl bg-[#002147] text-amber-300 p-4 text-center">
          <p className="text-[12px] font-bold">إجاباتك الصحيحة</p>
          <p className="text-3xl font-black">{correct} / {s.questions.length}</p>
          <p className="text-[12px] font-bold mt-1">الوقت المستخدم: {fmt(s.minutes * 60 - left)}{left === 0 ? ' · انتهى الوقت' : ''}</p>
        </div>
        <p className="text-[12px] font-bold text-slate-600">هذي نتيجة تدريب فقط، مو توقّع لدرجة {s.exam} الرسمية.{uid ? (saved === false ? ' · انحفظت على الجهاز' : saved ? ' · انحفظت في تقريرك' : '') : ''}</p>
        <div className="flex-1" />
        {wrong.length > 0 && <button onClick={() => { setRi(0); setPhase('review'); }} className="rounded-xl border-2 border-[#002147] text-[#002147] font-black py-2.5">راجع الأخطاء ({wrong.length})</button>}
        <button onClick={() => { saraStopNarrator(); onBack(); }} className="rounded-xl bg-[#002147] text-amber-300 font-black py-2.5">رجوع للتمارين</button>
      </div>)}
      {phase === 'review' && wrong[ri] && (<div className="flex-1 min-h-0 flex flex-col gap-2">
        <p className="text-[11px] font-bold text-slate-500">خطأ {ri + 1} من {wrong.length} · سؤال {wrong[ri].i + 1}</p>
        <p className="rounded-2xl bg-white border-2 border-[#C49E3A] p-3 text-[14px] font-bold text-[#002147]" dir="ltr">{wrong[ri].q.q}</p>
        <p className="text-[13px] font-bold text-red-700" dir="ltr">✗ {answers[wrong[ri].i] == null ? '—' : wrong[ri].q.options[answers[wrong[ri].i]!]}</p>
        <p className="text-[13px] font-bold text-emerald-700 flex items-center gap-1" dir="ltr"><CheckCircle2 size={14} />{wrong[ri].q.options[wrong[ri].q.correctIndex]}</p>
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-2.5 text-[13px] font-bold text-slate-700"><MixedText text={wrong[ri].q.whyAr} /></div>
        <div className="flex-1" />
        <button onClick={() => (ri < wrong.length - 1 ? setRi(ri + 1) : setPhase('result'))} className="rounded-xl bg-[#002147] text-amber-300 font-black py-2.5">{ri < wrong.length - 1 ? 'التالي' : 'رجوع للنتيجة'}</button>
      </div>)}
    </div>
  );
};

export const SaraExamPrep: React.FC<Props> = ({ isOpen, onClose, uid }) => {
  const [exam, setExam] = useState<ExamKind>('IELTS'); const [kind, setKind] = useState<'reading' | 'listening'>('reading');
  const [active, setActive] = useState<ExamSet | null>(null); const [tick, setTick] = useState(0);
  useEffect(() => { if (isOpen) syncExamResults(uid).then(ch => { if (ch) setTick(t => t + 1); }); }, [isOpen, uid]);
  const best = useMemo(() => readExamResults(uid), [uid, tick, isOpen]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!isOpen) return null;
  const sets = EXAM_SETS.filter(s => s.exam === exam && s.kind === kind);
  return (
    <div className="fixed inset-0 z-[120] bg-slate-50 flex flex-col" dir="rtl" data-testid="sara-exam">
      <div className="shrink-0 flex items-center gap-2 bg-[#002147] text-amber-300 px-3 py-2.5">
        <p className="flex-1 text-sm font-black">تحضير IELTS و STEP</p>
        <button onClick={() => { saraStopNarrator(); onClose(); }} aria-label="close"><X size={20} /></button>
      </div>
      {active ? <Runner key={active.id} s={active} uid={uid} onBack={() => { setActive(null); setTick(t => t + 1); }} /> : (
        <div className="flex-1 min-h-0 flex flex-col gap-2 p-3">
          <div className="grid grid-cols-2 gap-1.5">
            {(['IELTS', 'STEP'] as ExamKind[]).map(e => <button key={e} onClick={() => setExam(e)} className={`rounded-xl py-2 font-black text-[13px] border-2 ${exam === e ? 'bg-[#002147] text-amber-300 border-[#002147]' : 'bg-white text-[#002147] border-slate-200'}`}>{e}</button>)}
            {(['reading', 'listening'] as const).map(k => <button key={k} onClick={() => setKind(k)} className={`rounded-xl py-2 font-black text-[13px] border-2 flex items-center justify-center gap-1 ${kind === k ? 'bg-[#C49E3A] text-[#002147] border-[#C49E3A]' : 'bg-white text-[#002147] border-slate-200'}`}>{k === 'reading' ? <><BookOpen size={14} />قراءة</> : <><Headphones size={14} />استماع</>}</button>)}
          </div>
          <p className="text-[11px] font-bold text-slate-500">تمارين بوقت محدد بأسئلة أصلية. النتيجة عدد الإجابات الصحيحة فقط.</p>
          <div className="grid grid-cols-1 gap-1.5">
            {sets.map(s => { const b = best[s.id]; return (
              <button key={s.id} onClick={() => setActive(s)} className="text-right rounded-xl bg-white border-2 border-slate-200 hover:border-[#C49E3A] px-3 py-2 flex items-center gap-2">
                <span className="flex-1 min-w-0"><span className="block text-[13px] font-black text-[#002147] truncate">{s.titleAr}</span>
                  <span className="block text-[11px] font-bold text-slate-500">{s.questions.length} أسئلة · {s.minutes} دقائق</span></span>
                {b && <span className="text-[11px] font-black text-emerald-700">أفضل: {b.correct}/{b.total}</span>}
              </button>); })}
          </div>
        </div>)}
    </div>
  );
};
export default SaraExamPrep;
