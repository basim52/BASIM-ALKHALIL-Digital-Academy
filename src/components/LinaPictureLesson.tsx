import React, { useEffect, useMemo, useState } from 'react';
import { Volume2, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import type { PicLesson } from '../data/tutorTracks/lina';
import { picTotal } from '../data/tutorTracks/lina';
import type { KidsTheme } from '../data/saraBoardPersonas';

/**
 * 🖼️ لينا's picture lesson: each sentence with its own illustration, then activities on the pictures:
 * listen and choose the picture, order the pictures by the story, and «وش الغلط في الصورة؟».
 * Scores only (first try); the caller saves progress with the existing tutor counter when it ends.
 */
type Phase = { k: 'learn'; i: number } | { k: 'choose'; n: number } | { k: 'order' } | { k: 'wrong' };
export interface LinaPictureLessonProps {
  lessonId: string;
  pics: PicLesson;
  theme: KidsTheme;
  t: (ar: string, en: string) => string;
  teacherNameAr: string;
  teacherNameEn: string;
  /** This teacher's own cloud voice. */
  say: (text: string) => void;
  stop: () => void;
  onDone: (correct: number, total: number) => void;
}

const hash = (s: string) => { let h = 7; for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return h; };
/** Stable shuffle per lesson; `notIdentity` keeps «order the story» from starting already solved. */
export function stableShuffle(n: number, salt: string, notIdentity = false): number[] {
  const a = Array.from({ length: n }, (_, i) => i); let h = hash(salt) || 1;
  for (let i = n - 1; i > 0; i--) { h = (h * 1103515245 + 12345) >>> 0; const j = h % (i + 1); [a[i], a[j]] = [a[j], a[i]]; }
  if (notIdentity && n > 1 && a.every((v, i) => v === i)) a.push(a.shift()!);
  return a;
}
const words = (s: string) => s.replace(/[.!?,]/g, '').split(/\s+/).filter(Boolean);

export const LinaPictureLesson: React.FC<LinaPictureLessonProps> = ({ lessonId, pics, theme, t, teacherNameAr, teacherNameEn, say, stop, onDone }) => {
  const { scenes } = pics;
  const total = picTotal(pics);
  const [phase, setPhase] = useState<Phase>({ k: 'learn', i: 0 });
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [seq, setSeq] = useState<number[]>([]);
  const [orderTried, setOrderTried] = useState(false);
  const [zoom, setZoom] = useState<string | null>(null);
  const chooseOrder = useMemo(() => pics.choose.map((_, n) => stableShuffle(scenes.length, `${lessonId}-c${n}`)), [pics, scenes.length, lessonId]);
  const orderMix = useMemo(() => stableShuffle(scenes.length, `${lessonId}-o`, true), [scenes.length, lessonId]);
  const wrongWords = useMemo(() => words(pics.wrong.en), [pics]);
  const fixed = useMemo(() => pics.wrong.en.replace(new RegExp(`\\b${pics.wrong.bad}\\b`), pics.wrong.fix), [pics]);

  // Each screen speaks its English sentence once (the learn card / the sentence to find / the wrong sentence).
  useEffect(() => {
    if (phase.k === 'learn') say(scenes[phase.i].en);
    else if (phase.k === 'choose') say(scenes[pics.choose[phase.n]].en);
    else if (phase.k === 'wrong') say(pics.wrong.en);
    return () => stop();
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  const advance = () => {
    setPicked(null); setSeq([]); setOrderTried(false);
    if (phase.k === 'learn') setPhase(phase.i + 1 < scenes.length ? { k: 'learn', i: phase.i + 1 } : { k: 'choose', n: 0 });
    else if (phase.k === 'choose') setPhase(phase.n + 1 < pics.choose.length ? { k: 'choose', n: phase.n + 1 } : { k: 'order' });
    else if (phase.k === 'order') setPhase({ k: 'wrong' });
    else onDone(score, total);
  };
  const step = phase.k === 'learn' ? 0 : phase.k === 'choose' ? 1 + phase.n : phase.k === 'order' ? 1 + pics.choose.length : total;
  const card = 'rounded-2xl bg-white overflow-hidden';
  const Pic: React.FC<{ src: string; alt: string; className?: string; testId?: string }> = ({ src, alt, className = '', testId }) => (
    <img src={src} alt={alt} draggable={false} loading="eager" decoding="async" data-testid={testId} className={`w-full aspect-square object-cover bg-slate-100 ${className}`} />
  );
  const Next: React.FC<{ label: string; disabled?: boolean }> = ({ label, disabled }) => (
    <button data-testid="lina-next" disabled={disabled} onClick={() => { stop(); advance(); }} className="shrink-0 w-full py-3 rounded-xl text-white text-[15px] font-black disabled:opacity-40" style={{ background: theme.accent }}>{label}</button>
  );
  const Listen: React.FC<{ text: string }> = ({ text }) => (
    <button data-testid="lina-listen" onClick={() => say(text)} className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 text-[#001a38] text-[12px] font-black"><Volume2 size={14} /> {t('اسمع', 'Listen')}</button>
  );

  let body: React.ReactNode;
  if (phase.k === 'learn') {
    const s = scenes[phase.i];
    body = (<div data-testid="lina-pic-learn" className="flex-1 min-h-0 flex flex-col gap-2">
      <p className="text-[12px] font-black text-amber-200 shrink-0">🖼️ {t(`الصورة ${phase.i + 1} من ${scenes.length} · اسمع وكرر`, `Picture ${phase.i + 1} of ${scenes.length} · listen and repeat`)}</p>
      <div className={`${card} min-h-0 flex-1 flex flex-col`} style={{ border: `4px solid ${theme.accent}` }}>
        <button className="min-h-0 flex-1 flex items-center justify-center bg-slate-50" onClick={() => setZoom(s.img)} aria-label={t('كبّر الصورة', 'Enlarge picture')}>
          <img src={s.img} alt={s.en} data-testid="lina-scene-img" draggable={false} className="max-h-full max-w-full aspect-square object-contain" />
        </button>
        <button data-testid="lina-scene-en" dir="ltr" onClick={() => say(s.en)} className="shrink-0 px-3 pt-2 text-[20px] font-black text-start flex items-center gap-2" style={{ color: theme.ink }}><Volume2 size={18} className="shrink-0" style={{ color: theme.accent }} /> {s.en}</button>
        <p className="shrink-0 px-3 pb-2 text-[13px] font-bold text-slate-500">{s.ar}</p>
      </div>
      <Next label={phase.i + 1 < scenes.length ? t('الصورة التالية', 'Next picture') : t('يلا نلعب بالصور! 🎮', "Let's play! 🎮")} />
    </div>);
  } else if (phase.k === 'choose') {
    const target = pics.choose[phase.n]; const s = scenes[target];
    body = (<div data-testid="lina-choose" className="flex-1 min-h-0 flex flex-col gap-2">
      <div className="flex items-center gap-2 shrink-0"><p className="flex-1 text-[13px] font-black text-amber-200">👂 {t('اسمع واختر الصورة الصحيحة', 'Listen and choose the right picture')}</p><Listen text={s.en} /></div>
      {picked !== null && <p dir="ltr" className="shrink-0 text-[16px] font-black text-white text-start">{s.en}</p>}
      <div className="grid grid-cols-2 gap-2 min-h-0 content-start">
        {chooseOrder[phase.n].map(si => {
          const st = picked === null ? theme.accent + '55' : si === target ? '#10B981' : si === picked ? '#F43F5E' : '#e5e7eb';
          return <button key={si} data-testid={`lina-choose-opt-${si}`} data-correct={si === target ? '1' : '0'} disabled={picked !== null}
            onClick={() => { setPicked(si); if (si === target) setScore(x => x + 1); }}
            className={`${card} transition-transform active:scale-95`} style={{ border: `4px solid ${st}` }}><Pic src={scenes[si].img} alt="" /></button>;
        })}
      </div>
      {picked !== null && <p className={`text-[13px] font-black shrink-0 ${picked === target ? 'text-emerald-300' : 'text-rose-300'}`}>{picked === target ? <><CheckCircle2 size={15} className="inline" /> {t('صح! برافو', 'Correct!')}</> : <><XCircle size={15} className="inline" /> {t('الصورة الصحيحة عليها إطار أخضر', 'The right picture has the green frame')}</>}</p>}
      <div className="flex-1" />
      <Next label={t('التالي', 'Next')} disabled={picked === null} />
    </div>);
  } else if (phase.k === 'order') {
    const full = seq.length === scenes.length;
    const right = full && seq.every((v, i) => v === i);
    body = (<div data-testid="lina-order" className="flex-1 min-h-0 flex flex-col gap-2">
      <div className="flex items-center gap-2 shrink-0"><p className="flex-1 text-[13px] font-black text-amber-200">📖 {t('رتّب الصور حسب القصة: اضغطها بالترتيب', 'Put the pictures in story order: tap them in order')}</p>
        {seq.length > 0 && !full && <button onClick={() => setSeq([])} className="shrink-0 p-1.5 rounded-lg bg-white/10" aria-label={t('من جديد', 'Start again')}><RotateCcw size={15} /></button>}</div>
      <div className="grid grid-cols-2 gap-2 min-h-0 content-start">
        {orderMix.map(si => {
          const pos = seq.indexOf(si);
          const st = !full ? (pos >= 0 ? theme.accent : theme.accent + '40') : (pos === si ? '#10B981' : '#F43F5E');
          return <button key={si} data-testid={`lina-order-opt-${si}`} disabled={pos >= 0 || full}
            onClick={() => { const nx = [...seq, si]; setSeq(nx); say(scenes[si].en); if (nx.length === scenes.length) { const ok = nx.every((v, i) => v === i); if (ok && !orderTried) setScore(x => x + 1); setOrderTried(true); } }}
            className={`${card} relative`} style={{ border: `4px solid ${st}` }}>
            <Pic src={scenes[si].img} alt="" />
            {pos >= 0 && <span className="absolute top-1.5 start-1.5 w-8 h-8 rounded-full text-white text-[16px] font-black flex items-center justify-center shadow" style={{ background: theme.accent }}>{pos + 1}</span>}
            {full && pos !== si && <span className="absolute bottom-1.5 end-1.5 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[12px] font-black">{t(`مكانها ${si + 1}`, `goes ${si + 1}`)}</span>}
          </button>;
        })}
      </div>
      {full && <p data-testid="lina-order-result" className={`text-[13px] font-black shrink-0 ${right ? 'text-emerald-300' : 'text-rose-300'}`}>{right ? <><CheckCircle2 size={15} className="inline" /> {t('ترتيب صح! قصة حلوة', 'Right order! Nice story')}</> : <><XCircle size={15} className="inline" /> {t('قريب! شوف الأرقام الخضرا', 'Close! See the green numbers')}</>}</p>}
      {full && !right && <button onClick={() => setSeq([])} className="shrink-0 py-2 rounded-xl bg-white/10 text-[13px] font-black">{t('جرّب مرة ثانية', 'Try again')}</button>}
      <div className="flex-1" />
      <Next label={t('التالي', 'Next')} disabled={!full} />
    </div>);
  } else {
    const w = pics.wrong; const s = scenes[w.scene];
    const done = picked !== null; const ok = done && wrongWords[picked!].toLowerCase() === w.bad.toLowerCase();
    body = (<div data-testid="lina-wrong" className="flex-1 min-h-0 flex flex-col gap-2">
      <div className="flex items-center gap-2 shrink-0"><p className="flex-1 text-[13px] font-black text-amber-200">🔍 {t('وش الغلط في الصورة؟ اضغط الكلمة الغلط', "What's wrong with the picture? Tap the wrong word")}</p><Listen text={w.en} /></div>
      <div className={`${card} shrink min-h-0`} style={{ border: `4px solid ${theme.accent}` }}><Pic src={s.img} alt="" className="max-h-[38vh] object-contain" /></div>
      <div dir="ltr" className="flex flex-wrap gap-1.5 shrink-0">
        {wrongWords.map((wd, i) => {
          const bad = wd.toLowerCase() === w.bad.toLowerCase();
          const st = !done ? 'bg-white text-[#001a38] border-amber-300' : bad ? 'bg-emerald-100 text-emerald-900 border-emerald-500' : i === picked ? 'bg-rose-100 text-rose-900 border-rose-500' : 'bg-white/60 text-slate-500 border-slate-200';
          return <button key={i} data-testid={`lina-wrong-word-${i}`} data-bad={bad ? '1' : '0'} disabled={done}
            onClick={() => { setPicked(i); if (bad) setScore(x => x + 1); say(fixed); }}
            className={`px-3 py-2 rounded-xl border-2 text-[17px] font-black ${st}`}>{wd}</button>;
        })}
      </div>
      {done && <div data-testid="lina-wrong-fix" className="shrink-0 rounded-xl bg-white/10 p-2">
        <p className={`text-[13px] font-black ${ok ? 'text-emerald-300' : 'text-rose-300'}`}>{ok ? t('صح! لقيت الغلط 🎉', 'Yes! You found it 🎉') : t('الغلط كان:', 'The mistake was:')} <span dir="ltr">{w.bad} → {w.fix}</span></p>
        <p dir="ltr" className="text-[16px] font-black text-white text-start">{fixed}</p>
      </div>}
      <div className="flex-1" />
      <Next label={t('النتيجة', 'Result')} disabled={!done} />
    </div>);
  }

  return (
    <div data-testid="lina-picture-lesson" className="flex-1 min-h-0 flex flex-col gap-2">
      <div className="shrink-0 flex items-center gap-2">
        <span className="text-[11px] font-black text-white/80">{t(teacherNameAr, teacherNameEn)}</span>
        <div className="flex-1 flex gap-1" aria-hidden>{Array.from({ length: total + 1 }, (_, i) => <span key={i} className="h-2 flex-1 rounded-full" style={{ background: i <= step ? theme.accent : 'rgba(255,255,255,.18)' }} />)}</div>
        <span data-testid="lina-stars" className="text-[12px] font-black text-amber-300">⭐ {score}</span>
      </div>
      {body}
      {zoom && <button data-testid="lina-zoom" onClick={() => setZoom(null)} className="fixed inset-0 z-[300] bg-black/85 flex items-center justify-center p-3"><img src={zoom} alt="" className="max-w-full max-h-full rounded-2xl" /></button>}
    </div>
  );
};
export default LinaPictureLesson;
