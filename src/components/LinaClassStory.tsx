import React, { useEffect, useRef, useState } from 'react';
import { Volume2, CheckCircle2, XCircle } from 'lucide-react';
import type { LinaClass } from '../data/tutorTracks/lina';
import { useLandscapeSplit } from '../lib/useLandscapeSplit';

/**
 * 📖 «قصة الفصل» (لينا): after a class's last lesson — 4 pictures Lina narrates one by one, then 2 questions about the story,
 * then the class badge. Practice only: it never changes progress (the badge itself comes from the existing counter).
 * The only thing kept is a «seen» flag in localStorage so the map can tick the story.
 */
export const linaStoryKey = (classId: string, uid?: string) => `lina_story_${classId}_${uid || 'guest'}`;
export const linaStorySeen = (classId: string, uid?: string) => { try { return localStorage.getItem(linaStoryKey(classId, uid)) === '1'; } catch { return false; } };

type Step = { k: 'page'; i: number } | { k: 'q'; i: number } | { k: 'end' };
export interface LinaClassStoryProps {
  cls: LinaClass;
  uid?: string;
  t: (ar: string, en: string) => string;
  accent: string;
  say: (text: string) => void;
  stop: () => void;
  onClose: () => void;
}

const StoryNext: React.FC<{ label: string; disabled?: boolean; accent: string; onNext: () => void }> = ({ label, disabled, accent, onNext }) => (
  <div className="sticky bottom-0 z-10 shrink-0 bg-[#001a38] pt-1"><button data-testid="lina-story-next" disabled={disabled} onClick={onNext} className="w-full py-3 rounded-xl text-white text-[15px] font-black disabled:opacity-40" style={{ background: accent }}>{label}</button></div>
);

export const LinaClassStory: React.FC<LinaClassStoryProps> = ({ cls, uid, t, accent, say, stop, onClose }) => {
  const land = useLandscapeSplit();
  const { story } = cls;
  const [step, setStep] = useState<Step>({ k: 'page', i: 0 });
  const [picked, setPicked] = useState<number | null>(null);
  const [right, setRight] = useState(0);
  // Latest voice functions in a ref, so a new say/stop from the parent never replays the page.
  const voice = useRef({ say, stop });
  useEffect(() => { voice.current = { say, stop }; }, [say, stop]);
  useEffect(() => {
    const { say, stop } = voice.current;
    if (step.k === 'page') say(story.pages[step.i].en);
    else if (step.k === 'q') say(story.questions[step.i].promptEn);
    else { try { localStorage.setItem(linaStoryKey(cls.id, uid), '1'); } catch { /* ignore */ } }
    return () => stop();
  }, [step, story, cls.id, uid]);
  const next = () => {
    stop(); setPicked(null);
    if (step.k === 'page') setStep(step.i + 1 < story.pages.length ? { k: 'page', i: step.i + 1 } : { k: 'q', i: 0 });
    else if (step.k === 'q') setStep(step.i + 1 < story.questions.length ? { k: 'q', i: step.i + 1 } : { k: 'end' });
    else onClose();
  };
  const total = story.pages.length + story.questions.length;
  const at = step.k === 'page' ? step.i : step.k === 'q' ? story.pages.length + step.i : total;
  const frame = (img: string, alt: string) => <div className="rounded-2xl bg-white overflow-hidden h-full max-w-full aspect-square" style={{ border: `4px solid ${accent}` }}><img src={img} alt={alt} data-testid="lina-story-img" draggable={false} loading="eager" className="block w-full h-full aspect-square object-contain bg-slate-50" /></div>;
  const layout = (id: string, pic: React.ReactNode, side: React.ReactNode, nx: React.ReactNode) => land ? (
    <div data-testid={id} data-layout="split" className="flex-1 min-h-0 flex flex-row gap-3">
      <div className="h-full max-w-[56%] aspect-square shrink-0 min-h-0 min-w-0 flex items-center justify-center">{pic}</div>
      <div className="flex-1 min-w-0 min-h-0 flex flex-col gap-2"><div className="flex-1 min-h-0 overflow-y-auto overscroll-contain flex flex-col gap-2">{side}</div>{nx}</div>
    </div>
  ) : (
    <div data-testid={id} data-layout="stack" className="flex-1 min-h-0 flex flex-col gap-2 overflow-y-auto overscroll-contain scroll-pb-16">
      {pic && <div className="flex-1 min-h-[7rem] max-h-[46dvh] flex justify-center">{pic}</div>}
      {side}
      <div className="flex-1" />
      {nx}
    </div>
  );

  let body: React.ReactNode;
  if (step.k === 'page') {
    const p = story.pages[step.i];
    body = layout('lina-story-page', frame(p.img, p.en), <>
      <p className="shrink-0 text-[12px] font-black text-amber-200">📖 {t(`${story.titleAr} · الصورة ${step.i + 1} من ${story.pages.length}`, `${story.titleEn} · picture ${step.i + 1} of ${story.pages.length}`)}</p>
      <button data-testid="lina-story-en" dir="ltr" onClick={() => say(p.en)} className={`shrink-0 rounded-2xl bg-white px-3 py-2 font-black text-start flex items-center gap-2 text-[#001a38] ${land ? 'text-[24px] leading-tight' : 'text-[19px]'}`}><Volume2 size={20} className="shrink-0" style={{ color: accent }} /> {p.en}</button>
      <p className="shrink-0 text-[13px] font-bold text-white/75">{p.ar}</p>
    </>, <StoryNext accent={accent} onNext={next} label={step.i + 1 < story.pages.length ? t('كمّل القصة', 'Next picture') : t('يلا أسئلة القصة ❓', 'Story questions ❓')} />);
  } else if (step.k === 'q') {
    const q = story.questions[step.i];
    const opts = <div className="grid gap-1.5 shrink-0">{q.options.map((o, i) => {
      const st = picked === null ? 'bg-white text-[#001a38] border-amber-300' : i === q.correctIndex ? 'bg-emerald-100 text-emerald-900 border-emerald-500' : i === picked ? 'bg-rose-100 text-rose-900 border-rose-500' : 'bg-white/60 text-slate-600 border-slate-200';
      return <button key={i} dir="ltr" data-testid={`lina-story-opt-${i}`} data-correct={i === q.correctIndex ? '1' : '0'} disabled={picked !== null}
        onClick={() => { setPicked(i); say(o); if (i === q.correctIndex) setRight(r => r + 1); }} className={`px-3 py-2.5 rounded-xl border-2 text-[17px] font-black text-start ${st}`}>{o}</button>;
    })}</div>;
    const fb = picked !== null && <p className={`text-[13px] font-black shrink-0 ${picked === q.correctIndex ? 'text-emerald-300' : 'text-rose-300'}`}>{picked === q.correctIndex ? <><CheckCircle2 size={15} className="inline" /> {t('صح!', 'Correct!')}</> : <><XCircle size={15} className="inline" /> {t('الجواب:', 'Answer:')} <span dir="ltr">{q.options[q.correctIndex]}</span></>}</p>;
    const strip = <div className="grid grid-cols-4 gap-1.5 shrink-0 w-full max-w-[30rem]">{story.pages.map((p, i) => <img key={p.img} src={p.img} alt="" loading={i === 0 ? 'eager' : 'lazy'} className="w-full aspect-square object-cover rounded-xl border-2 border-white/30" />)}</div>;
    body = layout('lina-story-q', land ? <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full h-full">{story.pages.map((p, i) => <img key={p.img} src={p.img} alt="" loading={i === 0 ? 'eager' : 'lazy'} className="w-full h-full min-h-0 object-cover rounded-xl border-2 border-white/30" />)}</div> : null, <>
      <p className="shrink-0 text-[12px] font-black text-amber-200">❓ {t(`سؤال ${step.i + 1} من ${story.questions.length} عن القصة`, `Question ${step.i + 1} of ${story.questions.length} about the story`)}</p>
      {!land && strip}
      <div className="shrink-0 rounded-2xl bg-white p-3" style={{ border: `4px solid ${accent}` }}>
        <p className="text-[14px] font-black text-[#001a38]">{q.promptAr}</p>
        <button dir="ltr" onClick={() => say(q.promptEn)} className="mt-1 text-[17px] font-black text-start text-[#001a38] flex items-center gap-1.5"><Volume2 size={16} style={{ color: accent }} /> {q.promptEn}</button>
      </div>
      {opts}{fb}
    </>, <StoryNext accent={accent} onNext={next} label={step.i + 1 < story.questions.length ? t('التالي', 'Next') : t('شارتي 🏅', 'My badge 🏅')} disabled={picked === null} />);
  } else {
    body = layout('lina-story-end', null, <div className="flex-1 flex flex-col items-center justify-center gap-2 text-center">
      <span data-testid="lina-story-badge" className="w-24 h-24 rounded-full flex items-center justify-center text-[48px] shadow-lg" style={{ background: 'radial-gradient(circle at 30% 30%, #FDE68A, #F59E0B)', border: '5px solid #fff' }}>{cls.badgeEmoji}</span>
      <p className="text-[20px] font-black text-amber-300">🏅 {t(cls.badgeAr, cls.badgeEn)}</p>
      <p data-testid="lina-story-score" className="text-[14px] font-bold text-white/85">{t(`خلصت قصة الفصل! جاوبت ${right} من ${story.questions.length} صح`, `Story done! You got ${right} of ${story.questions.length} right`)}</p>
    </div>, <StoryNext accent={accent} onNext={next} label={t('رجوع للخريطة', 'Back to the map')} />);
  }
  return (
    <div data-testid="lina-story" data-layout={land ? 'split' : 'stack'} className="flex-1 min-h-0 flex flex-col gap-2">
      <div className="shrink-0 flex gap-1" aria-hidden>{Array.from({ length: total + 1 }, (_, i) => <span key={i} className="h-2 flex-1 rounded-full" style={{ background: i <= at ? accent : 'rgba(255,255,255,.18)' }} />)}</div>
      {body}
    </div>
  );
};
export default LinaClassStory;
