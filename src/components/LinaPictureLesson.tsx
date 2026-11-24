import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { Volume2, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import type { PicLesson } from '../data/tutorTracks/lina';
import { picTotal } from '../data/tutorTracks/lina';
import type { KidsTheme } from '../data/saraBoardPersonas';
import { TutorVideoFace } from './tutor3d/TutorVideoFace';
import './tutor3d/tutorBoard.css';
import { useLandscapeSplit } from '../lib/useLandscapeSplit';
const LinaSayIt = lazy(() => import('./LinaSayIt'));

/**
 * 🖼️ لينا's picture lesson: each sentence with its own illustration, then activities on the pictures:
 * listen and choose the picture, «اسمع واختر» among the class's pictures (text hidden), order the pictures by the story
 * (or «وصّل الصورة بجملتها» in lessons without a story), «وش الغلط في الصورة؟», then «قلها بصوتك» (mic practice, never blocks).
 * Scores only (first try); the caller saves progress with the existing tutor counter when it ends.
 */
type Phase = { k: 'learn'; i: number } | { k: 'choose'; n: number } | { k: 'listen' } | { k: 'order' } | { k: 'match' } | { k: 'wrong' } | { k: 'say' };
export interface LinaPictureLessonProps {
  lessonId: string;
  pics: PicLesson;
  theme: KidsTheme;
  t: (ar: string, en: string) => string;
  teacherNameAr: string;
  teacherNameEn: string;
  /** Teacher persona id for the talking video face (same TutorVideoFace as Sara and the other teachers). */
  faceId?: string;
  /** True while the teacher's voice is playing (the face switches to its talk loop). */
  speaking?: boolean;
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

export const LinaPictureLesson: React.FC<LinaPictureLessonProps> = ({ lessonId, pics, theme, t, teacherNameAr, teacherNameEn, faceId, speaking = false, say, stop, onDone }) => {
  const { scenes } = pics;
  const land = useLandscapeSplit();
  const total = picTotal(pics);
  const [phase, setPhase] = useState<Phase>({ k: 'learn', i: 0 });
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [seq, setSeq] = useState<number[]>([]);
  const [orderTried, setOrderTried] = useState(false);
  const [zoom, setZoom] = useState<string | null>(null);
  // «وصّل»: the side tapped first (picture or sentence), matched scene indexes, the pair that just missed, mistakes made
  const [sel, setSel] = useState<{ side: 'pic' | 'sen'; i: number } | null>(null);
  const [matched, setMatched] = useState<number[]>([]);
  const [miss, setMiss] = useState<{ pic: number; sen: number } | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const listenOpts = useMemo(() => {
    if (!pics.listen) return [];
    const all = [scenes[pics.listen.scene], ...pics.listen.decoys];
    return stableShuffle(all.length, `${lessonId}-l`).map(i => ({ s: all[i], right: i === 0 }));
  }, [pics, scenes, lessonId]);
  const matchPics = useMemo(() => stableShuffle(scenes.length, `${lessonId}-mp`), [scenes.length, lessonId]);
  const matchSens = useMemo(() => stableShuffle(scenes.length, `${lessonId}-ms`, true), [scenes.length, lessonId]);
  const sayScene = pics.say != null ? scenes[pics.say] : null;
  const chooseOrder = useMemo(() => pics.choose.map((_, n) => stableShuffle(scenes.length, `${lessonId}-c${n}`)), [pics, scenes.length, lessonId]);
  const orderMix = useMemo(() => stableShuffle(scenes.length, `${lessonId}-o`, true), [scenes.length, lessonId]);
  const wrongWords = useMemo(() => words(pics.wrong.en), [pics]);
  const fixed = useMemo(() => pics.wrong.en.replace(new RegExp(`\\b${pics.wrong.bad}\\b`), pics.wrong.fix), [pics]);

  // Each screen speaks its English sentence once (the learn card / the sentence to find / the wrong sentence).
  useEffect(() => {
    if (phase.k === 'learn') say(scenes[phase.i].en);
    else if (phase.k === 'choose') say(scenes[pics.choose[phase.n]].en);
    else if (phase.k === 'wrong') say(pics.wrong.en);
    else if (phase.k === 'listen' && pics.listen) say(scenes[pics.listen.scene].en);
    else if (phase.k === 'say' && sayScene) say(sayScene.en);
    return () => stop();
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  const advance = () => {
    setPicked(null); setSeq([]); setOrderTried(false); setSel(null); setMatched([]); setMiss(null); setMistakes(0);
    const story: Phase = pics.match ? { k: 'match' } : { k: 'order' };
    if (phase.k === 'learn') setPhase(phase.i + 1 < scenes.length ? { k: 'learn', i: phase.i + 1 } : { k: 'choose', n: 0 });
    else if (phase.k === 'choose') setPhase(phase.n + 1 < pics.choose.length ? { k: 'choose', n: phase.n + 1 } : pics.listen ? { k: 'listen' } : story);
    else if (phase.k === 'listen') setPhase(story);
    else if (phase.k === 'order' || phase.k === 'match') setPhase({ k: 'wrong' });
    else if (phase.k === 'wrong' && sayScene) setPhase({ k: 'say' });
    else onDone(score, total);
  };
  const L = pics.listen ? 1 : 0;
  const step = phase.k === 'learn' ? 0 : phase.k === 'choose' ? 1 + phase.n : phase.k === 'listen' ? 1 + pics.choose.length : phase.k === 'order' || phase.k === 'match' ? 1 + pics.choose.length + L : total;
  const card = 'rounded-2xl bg-white overflow-hidden';
  const Pic: React.FC<{ src: string; alt: string; className?: string; testId?: string }> = ({ src, alt, className = '', testId }) => (
    <img src={src} alt={alt} draggable={false} loading="eager" decoding="async" data-testid={testId} className={`block w-full aspect-square object-contain bg-slate-50 ${className}`} />
  );
  const Next: React.FC<{ label: string; disabled?: boolean }> = ({ label, disabled }) => (
    <div className="sticky bottom-0 z-10 shrink-0 bg-[#001a38] pt-1"><button data-testid="lina-next" disabled={disabled} onClick={() => { stop(); advance(); }} className="w-full py-3 rounded-xl text-white text-[15px] font-black disabled:opacity-40" style={{ background: theme.accent }}>{label}</button></div>
  );
  const Listen: React.FC<{ text: string }> = ({ text }) => (
    <button data-testid="lina-listen" onClick={() => say(text)} className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 text-[#001a38] text-[12px] font-black"><Volume2 size={14} /> {t('اسمع', 'Listen')}</button>
  );

  /** Tablet landscape: picture(s) on one side, sentence / words / options and the Next button on the other. */
  const split = (id: string, pic: React.ReactNode, side: React.ReactNode, next: React.ReactNode) => (
    <div data-testid={id} data-layout="split" className="lina-split flex-1 min-h-0 flex flex-row gap-3">
      <div data-testid="lina-split-pic" className="lina-split-pic h-full max-w-[56%] aspect-square shrink-0 min-h-0 min-w-0 flex items-center justify-center">{pic}</div>
      <div data-testid="lina-split-side" className="lina-split-side flex-1 min-w-0 min-h-0 flex flex-col gap-2">
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain flex flex-col gap-2">{side}</div>
        {next}
      </div>
    </div>
  );
  const grid2x2 = (cells: React.ReactNode) => <div data-testid="lina-pic-grid" className="grid grid-cols-2 grid-rows-2 gap-2 w-full h-full">{cells}</div>;

  let body: React.ReactNode;
  if (phase.k === 'learn') {
    const s = scenes[phase.i];
    const label = <p className="text-[12px] font-black text-amber-200 shrink-0">🖼️ {t(`الصورة ${phase.i + 1} من ${scenes.length} · اسمع وكرر`, `Picture ${phase.i + 1} of ${scenes.length} · listen and repeat`)}</p>;
    const zoomBtn = (cls: string) => (
      <button className={`min-h-0 flex items-center justify-center bg-slate-50 ${cls}`} onClick={() => setZoom(s.img)} aria-label={t('كبّر الصورة', 'Enlarge picture')}>
        <img src={s.img} alt={s.en} data-testid="lina-scene-img" draggable={false} className="max-h-full max-w-full aspect-square object-contain" />
      </button>
    );
    const en = <button data-testid="lina-scene-en" dir="ltr" onClick={() => say(s.en)} className={`shrink-0 px-3 pt-2 font-black text-start flex items-center gap-2 ${land ? 'text-[26px] leading-tight' : 'text-[20px]'}`} style={{ color: theme.ink }}><Volume2 size={land ? 22 : 18} className="shrink-0" style={{ color: theme.accent }} /> {s.en}</button>;
    const ar = <p className={`shrink-0 px-3 pb-2 font-bold text-slate-500 ${land ? 'text-[16px]' : 'text-[13px]'}`}>{s.ar}</p>;
    const next = <Next label={phase.i + 1 < scenes.length ? t('الصورة التالية', 'Next picture') : t('يلا نلعب بالصور! 🎮', "Let's play! 🎮")} />;
    body = land ? split('lina-pic-learn',
      <div className={`${card} w-full h-full flex`} style={{ border: `4px solid ${theme.accent}` }}>{zoomBtn('flex-1 w-full h-full')}</div>,
      <>{label}<div className="rounded-2xl bg-white shrink-0" style={{ border: `4px solid ${theme.accent}` }}>{en}{ar}</div></>,
      next) : (<div data-testid="lina-pic-learn" className="flex-1 min-h-0 flex flex-col gap-2">
      {label}
      <div className={`${card} min-h-0 flex-1 flex flex-col`} style={{ border: `4px solid ${theme.accent}` }}>
        {zoomBtn('flex-1')}
        {en}
        {ar}
      </div>
      {next}
    </div>);
  } else if (phase.k === 'choose') {
    const target = pics.choose[phase.n]; const s = scenes[target];
    const head = <div className="flex items-center gap-2 shrink-0"><p className="flex-1 text-[13px] font-black text-amber-200">👂 {t('اسمع واختر الصورة الصحيحة', 'Listen and choose the right picture')}</p><Listen text={s.en} /></div>;
    const said = picked !== null && <p dir="ltr" className={`shrink-0 font-black text-white text-start ${land ? 'text-[22px]' : 'text-[16px]'}`}>{s.en}</p>;
    const cells = chooseOrder[phase.n].map(si => {
      const st = picked === null ? theme.accent + '55' : si === target ? '#10B981' : si === picked ? '#F43F5E' : '#e5e7eb';
      return <button key={si} data-testid={`lina-choose-opt-${si}`} data-correct={si === target ? '1' : '0'} disabled={picked !== null}
        onClick={() => { setPicked(si); if (si === target) setScore(x => x + 1); }}
        className={`${card} transition-transform active:scale-95 ${land ? 'min-h-0 min-w-0' : ''}`} style={{ border: `4px solid ${st}` }}><Pic src={scenes[si].img} alt="" className={land ? 'h-full' : ''} /></button>;
    });
    const fb = picked !== null && <p className={`text-[13px] font-black shrink-0 ${picked === target ? 'text-emerald-300' : 'text-rose-300'}`}>{picked === target ? <><CheckCircle2 size={15} className="inline" /> {t('صح! برافو', 'Correct!')}</> : <><XCircle size={15} className="inline" /> {t('الصورة الصحيحة عليها إطار أخضر', 'The right picture has the green frame')}</>}</p>;
    const next = <Next label={t('التالي', 'Next')} disabled={picked === null} />;
    body = land ? split('lina-choose', grid2x2(cells), <>{head}{said}{fb}</>, next) : (<div data-testid="lina-choose" className="flex-1 min-h-0 flex flex-col gap-2 overflow-y-auto overscroll-contain scroll-pb-16">
      {head}
      {said}
      <div className="grid grid-cols-2 gap-2 shrink-0 content-start w-full max-w-[max(13rem,calc(100dvh-19rem))] mx-auto">{cells}</div>
      {fb}
      <div className="flex-1" />
      {next}
    </div>);
  } else if (phase.k === 'listen' && pics.listen) {
    const target = scenes[pics.listen.scene];
    const head = <div className="flex items-center gap-2 shrink-0"><p className="flex-1 text-[13px] font-black text-amber-200">🎧 {t('اسمع لينا واختر الصورة: الجملة مخفية!', 'Listen to Lina and pick the picture: the sentence is hidden!')}</p></div>;
    const again = <button data-testid="lina-listen-again" onClick={() => say(target.en)} className="shrink-0 w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-400 text-[#001a38] text-[15px] font-black"><Volume2 size={18} /> {t('اسمعها مرة ثانية', 'Hear it again')}</button>;
    const said = picked !== null && <p data-testid="lina-listen-said" dir="ltr" className={`shrink-0 font-black text-white text-start ${land ? 'text-[22px]' : 'text-[16px]'}`}>{target.en}</p>;
    const cells = listenOpts.map((o, n) => {
      const st = picked === null ? theme.accent + '55' : o.right ? '#10B981' : n === picked ? '#F43F5E' : '#e5e7eb';
      return <button key={o.s.img} data-testid={`lina-listen-opt-${n}`} data-correct={o.right ? '1' : '0'} disabled={picked !== null}
        onClick={() => { setPicked(n); if (o.right) setScore(x => x + 1); }}
        className={`${card} transition-transform active:scale-95 ${land ? 'min-h-0 min-w-0' : ''}`} style={{ border: `4px solid ${st}` }}><Pic src={o.s.img} alt="" className={land ? 'h-full' : ''} /></button>;
    });
    const ok = picked !== null && listenOpts[picked]?.right;
    const fb = picked !== null && <p data-testid="lina-listen-fb" className={`text-[13px] font-black shrink-0 ${ok ? 'text-emerald-300' : 'text-rose-300'}`}>{ok ? <><CheckCircle2 size={15} className="inline" /> {t('سمعتها صح! برافو', 'You heard it right!')}</> : <><XCircle size={15} className="inline" /> {t('الصورة الصحيحة عليها إطار أخضر', 'The right picture has the green frame')}</>}</p>;
    const next = <Next label={t('التالي', 'Next')} disabled={picked === null} />;
    body = land ? split('lina-listen', grid2x2(cells), <>{head}{again}{said}{fb}</>, next) : (<div data-testid="lina-listen" className="flex-1 min-h-0 flex flex-col gap-2 overflow-y-auto overscroll-contain scroll-pb-16">
      {head}
      {again}
      <div className="grid grid-cols-2 gap-2 shrink-0 content-start w-full max-w-[max(13rem,calc(100dvh-20rem))] mx-auto">{cells}</div>
      {said}
      {fb}
      <div className="flex-1" />
      {next}
    </div>);
  } else if (phase.k === 'match') {
    const COLORS = ['#10B981', '#3B82F6', '#A855F7', '#F59E0B'];
    const done = matched.length === scenes.length;
    const colorOf = (si: number) => COLORS[matched.indexOf(si) % COLORS.length];
    const tryPair = (picI: number, senI: number) => {
      setSel(null);
      if (picI === senI) { const nx = [...matched, picI]; setMatched(nx); setMiss(null); say(scenes[picI].en); if (nx.length === scenes.length && mistakes === 0) setScore(x => x + 1); }
      else { setMiss({ pic: picI, sen: senI }); setMistakes(m => m + 1); }
    };
    const tapPic = (si: number) => { if (matched.includes(si)) return; setMiss(null); if (sel?.side === 'sen') tryPair(si, sel.i); else setSel({ side: 'pic', i: si }); };
    const tapSen = (si: number) => { if (matched.includes(si)) return; setMiss(null); say(scenes[si].en); if (sel?.side === 'pic') tryPair(sel.i, si); else setSel({ side: 'sen', i: si }); };
    const head = <p className="shrink-0 text-[13px] font-black text-amber-200">🔗 {t('وصّل كل صورة بجملتها: اضغط الصورة وبعدين جملتها', 'Match each picture to its sentence: tap a picture, then its sentence')}</p>;
    const picCells = matchPics.map(si => {
      const m = matched.includes(si); const on = sel?.side === 'pic' && sel.i === si; const bad = miss?.pic === si;
      const st = m ? colorOf(si) : bad ? '#F43F5E' : on ? '#FBBF24' : theme.accent + '55';
      return <button key={si} data-testid={`lina-match-pic-${si}`} data-matched={m ? '1' : '0'} disabled={m} onClick={() => tapPic(si)}
        className={`${card} relative transition-transform active:scale-95 ${land ? 'min-h-0 min-w-0' : ''} ${on ? 'scale-[1.03]' : ''}`} style={{ border: `4px solid ${st}` }}>
        <Pic src={scenes[si].img} alt="" className={land ? 'h-full' : ''} />
        {m && <span className="absolute top-1 start-1 w-7 h-7 rounded-full text-white text-[14px] font-black flex items-center justify-center shadow" style={{ background: colorOf(si) }}>✓</span>}
      </button>;
    });
    const senBtns = <div className="flex flex-col gap-1.5 shrink-0">{matchSens.map(si => {
      const m = matched.includes(si); const on = sel?.side === 'sen' && sel.i === si; const bad = miss?.sen === si;
      const st = m ? { background: colorOf(si) + '22', borderColor: colorOf(si), color: '#fff' } : bad ? { background: '#ffe4e6', borderColor: '#F43F5E', color: '#881337' } : on ? { background: '#FEF3C7', borderColor: '#FBBF24', color: '#001a38' } : { background: '#fff', borderColor: '#FCD34D', color: '#001a38' };
      return <button key={si} data-testid={`lina-match-sen-${si}`} data-matched={m ? '1' : '0'} dir="ltr" disabled={m} onClick={() => tapSen(si)}
        className={`w-full px-3 py-2 rounded-xl border-2 text-start font-black ${land ? 'text-[17px]' : 'text-[15px]'}`} style={st}>{m ? '✓ ' : ''}{scenes[si].en}</button>;
    })}</div>;
    const fb = miss ? <p data-testid="lina-match-miss" className="shrink-0 text-[13px] font-black text-rose-300"><XCircle size={15} className="inline" /> {t('مو هذي جملتها، جرّب ثانية', 'Not that one, try again')}</p>
      : done ? <p data-testid="lina-match-done" className="shrink-0 text-[13px] font-black text-emerald-300"><CheckCircle2 size={15} className="inline" /> {mistakes === 0 ? t('وصّلتها كلها صح! 🎉', 'All matched right! 🎉') : t('خلصت التوصيل! برافو', 'All matched! Well done')}</p> : null;
    const next = <Next label={t('التالي', 'Next')} disabled={!done} />;
    body = land ? split('lina-match', grid2x2(picCells), <>{head}{senBtns}{fb}</>, next) : (<div data-testid="lina-match" className="flex-1 min-h-0 flex flex-col gap-2 overflow-y-auto overscroll-contain scroll-pb-16">
      {head}
      <div className="grid grid-cols-4 gap-1.5 shrink-0 w-full max-w-[36rem] mx-auto">{picCells}</div>
      {senBtns}
      {fb}
      <div className="flex-1" />
      {next}
    </div>);
  } else if (phase.k === 'say' && sayScene) {
    const head = <p className="shrink-0 text-[13px] font-black text-amber-200">🎤 {t('قلها بصوتك! اسمع لينا وبعدين قل الجملة', 'Say it yourself! Hear Lina, then say the sentence')}</p>;
    const sentence = <p data-testid="lina-say-sentence" dir="ltr" className={`shrink-0 font-black text-white text-start ${land ? 'text-[24px] leading-tight' : 'text-[19px]'}`}>{sayScene.en}</p>;
    const ar = <p className="shrink-0 text-[13px] font-bold text-white/70">{sayScene.ar}</p>;
    const box = <Suspense fallback={<p className="text-[12px] text-white/70">…</p>}><LinaSayIt sentence={sayScene.en} t={t} accent={theme.accent} say={say} stop={stop} /></Suspense>;
    const frame = <div className={`${card} h-full max-w-full aspect-square`} style={{ border: `4px solid ${theme.accent}` }}><Pic src={sayScene.img} alt={sayScene.en} testId="lina-say-img" className="h-full" /></div>;
    const next = <Next label={t('النتيجة', 'Result')} />;
    body = land ? split('lina-say', frame, <>{head}{sentence}{ar}{box}</>, next) : (<div data-testid="lina-say" className="flex-1 min-h-0 flex flex-col gap-2 overflow-y-auto overscroll-contain scroll-pb-16">
      {head}
      <div className="flex-1 min-h-[6rem] max-h-[42dvh] flex justify-center">{frame}</div>
      {sentence}
      {ar}
      {box}
      {next}
    </div>);
  } else if (phase.k === 'order') {
    const full = seq.length === scenes.length;
    const right = full && seq.every((v, i) => v === i);
    const head = <div className="flex items-center gap-2 shrink-0"><p className="flex-1 text-[13px] font-black text-amber-200">📖 {t('رتّب الصور حسب القصة: اضغطها بالترتيب', 'Put the pictures in story order: tap them in order')}</p>
      {seq.length > 0 && !full && <button onClick={() => setSeq([])} className="shrink-0 p-1.5 rounded-lg bg-white/10" aria-label={t('من جديد', 'Start again')}><RotateCcw size={15} /></button>}</div>;
    const cells = orderMix.map(si => {
      const pos = seq.indexOf(si);
      const st = !full ? (pos >= 0 ? theme.accent : theme.accent + '40') : (pos === si ? '#10B981' : '#F43F5E');
      return <button key={si} data-testid={`lina-order-opt-${si}`} disabled={pos >= 0 || full}
        onClick={() => { const nx = [...seq, si]; setSeq(nx); say(scenes[si].en); if (nx.length === scenes.length) { const ok = nx.every((v, i) => v === i); if (ok && !orderTried) setScore(x => x + 1); setOrderTried(true); } }}
        className={`${card} relative ${land ? 'min-h-0 min-w-0' : ''}`} style={{ border: `4px solid ${st}` }}>
        <Pic src={scenes[si].img} alt="" className={land ? 'h-full' : ''} />
        {pos >= 0 && <span className="absolute top-1.5 start-1.5 w-8 h-8 rounded-full text-white text-[16px] font-black flex items-center justify-center shadow" style={{ background: theme.accent }}>{pos + 1}</span>}
        {full && pos !== si && <span className="absolute bottom-1.5 end-1.5 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[12px] font-black">{t(`مكانها ${si + 1}`, `goes ${si + 1}`)}</span>}
      </button>;
    });
    const res = full && <p data-testid="lina-order-result" className={`text-[13px] font-black shrink-0 ${right ? 'text-emerald-300' : 'text-rose-300'}`}>{right ? <><CheckCircle2 size={15} className="inline" /> {t('ترتيب صح! قصة حلوة', 'Right order! Nice story')}</> : <><XCircle size={15} className="inline" /> {t('قريب! شوف الأرقام الخضرا', 'Close! See the green numbers')}</>}</p>;
    const again = full && !right && <button onClick={() => setSeq([])} className="shrink-0 py-2 rounded-xl bg-white/10 text-[13px] font-black">{t('جرّب مرة ثانية', 'Try again')}</button>;
    const story = land && seq.length > 0 && <ol dir="ltr" data-testid="lina-order-story" className="shrink-0 flex flex-col gap-1 text-start">{seq.map((si, i) => <li key={si} className="text-[15px] font-black text-white"><span className="text-amber-300">{i + 1}.</span> {scenes[si].en}</li>)}</ol>;
    const next = <Next label={t('التالي', 'Next')} disabled={!full} />;
    body = land ? split('lina-order', grid2x2(cells), <>{head}{story}{res}{again}</>, next) : (<div data-testid="lina-order" className="flex-1 min-h-0 flex flex-col gap-2 overflow-y-auto overscroll-contain scroll-pb-16">
      {head}
      <div className="grid grid-cols-2 gap-2 shrink-0 content-start w-full max-w-[max(13rem,calc(100dvh-19rem))] mx-auto">{cells}</div>
      {res}
      {again}
      <div className="flex-1" />
      {next}
    </div>);
  } else {
    const w = pics.wrong; const s = scenes[w.scene];
    const done = picked !== null; const ok = done && wrongWords[picked!].toLowerCase() === w.bad.toLowerCase();
    const head = <div className="flex items-center gap-2 shrink-0"><p className="flex-1 text-[13px] font-black text-amber-200">🔍 {t('وش الغلط في الصورة؟ اضغط الكلمة الغلط', "What's wrong with the picture? Tap the wrong word")}</p><Listen text={w.en} /></div>;
    const frame = <div data-testid="lina-wrong-frame" className={`${card} h-full max-w-full aspect-square`} style={{ border: `4px solid ${theme.accent}` }}><Pic src={s.img} alt={s.en} testId="lina-wrong-img" className="h-full" /></div>;
    const wordsEl = <div dir="ltr" className="flex flex-wrap gap-1.5 shrink-0">
      {wrongWords.map((wd, i) => {
        const bad = wd.toLowerCase() === w.bad.toLowerCase();
        const st = !done ? 'bg-white text-[#001a38] border-amber-300' : bad ? 'bg-emerald-100 text-emerald-900 border-emerald-500' : i === picked ? 'bg-rose-100 text-rose-900 border-rose-500' : 'bg-white/60 text-slate-500 border-slate-200';
        return <button key={i} data-testid={`lina-wrong-word-${i}`} data-bad={bad ? '1' : '0'} disabled={done}
          onClick={() => { setPicked(i); if (bad) setScore(x => x + 1); say(fixed); }}
          className={`px-3 py-2 rounded-xl border-2 text-[17px] font-black ${st}`}>{wd}</button>;
      })}
    </div>;
    const fix = done && <div data-testid="lina-wrong-fix" className="shrink-0 rounded-xl bg-white/10 p-2">
      <p className={`text-[13px] font-black ${ok ? 'text-emerald-300' : 'text-rose-300'}`}>{ok ? t('صح! لقيت الغلط 🎉', 'Yes! You found it 🎉') : t('الغلط كان:', 'The mistake was:')} <span dir="ltr">{w.bad} → {w.fix}</span></p>
      <p dir="ltr" className="text-[16px] font-black text-white text-start">{fixed}</p>
    </div>;
    const next = <Next label={sayScene ? t('التالي', 'Next') : t('النتيجة', 'Result')} disabled={!done} />;
    body = land ? split('lina-wrong', frame, <>{head}{wordsEl}{fix}</>, next) : (<div data-testid="lina-wrong" className="flex-1 min-h-0 flex flex-col gap-2 overflow-y-auto overscroll-contain scroll-pb-16">
      {head}
      <div className="flex-1 min-h-[7rem] flex justify-center">{frame}</div>
      {wordsEl}
      {fix}
      {next}
    </div>);
  }

  return (
    <div data-testid="lina-picture-lesson" data-layout={land ? 'split' : 'stack'} className="flex-1 min-h-0 flex flex-col gap-2">
      <div className="shrink-0 flex items-center gap-2">
        {faceId && <button type="button" data-testid="lina-face" data-speaking={speaking ? '1' : '0'} aria-label={t(`استمع لـ${teacherNameAr}`, `Listen to ${teacherNameEn}`)}
          onClick={() => say(phase.k === 'learn' ? scenes[phase.i].en : phase.k === 'choose' ? scenes[pics.choose[phase.n]].en : phase.k === 'wrong' ? pics.wrong.en : phase.k === 'listen' && pics.listen ? scenes[pics.listen.scene].en : phase.k === 'say' && sayScene ? sayScene.en : scenes[0].en)}
          className={`relative shrink-0 ${land ? 'w-11 h-11' : 'w-14 h-14'} rounded-full overflow-hidden bg-[#001a38]`} style={{ border: `3px solid ${theme.accent}`, boxShadow: speaking ? `0 0 14px ${theme.accent}` : undefined }}>
          <TutorVideoFace id={faceId} alt={t(teacherNameAr, teacherNameEn)} isSpeaking={speaking} onFail={() => {}} />
        </button>}
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
