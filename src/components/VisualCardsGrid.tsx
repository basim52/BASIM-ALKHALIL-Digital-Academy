import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Volume2, X, ArrowLeft } from 'lucide-react';
import VisualCardArt from './visualCards/VisualCardArt';
import type { VisualCard } from '../data/saraVisualCards';
import { saraNarrate, saraStopNarrator, saraUnlockNarrator } from './SaraTrackPlayer';

function shuffle<T>(a: T[], seed: number): T[] {
  const r = [...a]; let s = seed * 9301 + 49297;
  for (let i = r.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const j = Math.floor((s / 233280) * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
}

interface Props { cards: VisualCard[]; titleAr: string; seed?: number; onDone: () => void; doneLabel?: string }

/** Illustrated word cards (tap → bigger card, Sara says English then Arabic, ✓ seen) followed by a short picture quiz. Practice only: no score is saved. */
export const VisualCardsGrid: React.FC<Props> = ({ cards, titleAr, seed = 1, onDone, doneLabel = 'كمّل الدرس' }) => {
  const [seen, setSeen] = useState<Set<number>>(new Set());
  const [open, setOpen] = useState<number | null>(null);
  const [mode, setMode] = useState<'cards' | 'quiz' | 'done'>('cards');
  const quiz = useMemo(() => shuffle(cards.map((_, i) => i), seed).slice(0, Math.min(5, cards.length)).map((ci, k) => {
    const others = shuffle(cards.map((_, i) => i).filter(i => i !== ci), seed + k + 1).slice(0, 2);
    const opts = shuffle([ci, ...others], seed + k + 7);
    return { ci, opts };
  }), [cards, seed]);
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [right, setRight] = useState(0);
  useEffect(() => () => saraStopNarrator(), []);
  const speak = (t: string) => { saraUnlockNarrator(); saraNarrate(t, () => {}, () => {}, () => {}); };
  const tap = (i: number) => { setOpen(i); setSeen(s => new Set(s).add(i)); speak(`${cards[i].en}. ${cards[i].ar}`); };

  if (mode === 'quiz' || mode === 'done') {
    if (mode === 'done') return (
      <div data-testid="visual-quiz-done" className="flex-1 flex flex-col items-center justify-center gap-3 text-center p-3">
        <p className="text-4xl">{right === quiz.length ? '🌟' : '👏'}</p>
        <p className="text-[15px] font-black text-[#002147]">{right}/{quiz.length} صحيحة في تمرين الصور</p>
        <button onClick={() => { saraStopNarrator(); onDone(); }} className="w-full py-2.5 rounded-xl bg-[#002147] text-amber-300 font-black text-sm">{doneLabel}</button>
      </div>
    );
    const q = quiz[qi]; const card = cards[q.ci]; const wrong = picked !== null && picked !== q.ci;
    return (
      <div data-testid="visual-quiz" className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-2 p-1">
        <p className="text-[12px] font-black text-[#C49E3A]">تمرين الصور {qi + 1}/{quiz.length}: أي كلمة تناسب الصورة؟</p>
        <div className="rounded-2xl bg-white border-2 border-amber-300 p-2 flex justify-center">
          <VisualCardArt scene={card.scene} className="w-full max-w-[260px] h-auto rounded-xl" label="?" />
        </div>
        <div className="grid gap-1.5">
          {q.opts.map(oi => {
            const st = picked === null ? 'bg-white border-slate-200' : oi === q.ci ? 'bg-emerald-100 border-emerald-500' : picked === oi ? 'bg-rose-100 border-rose-400' : 'opacity-60 border-slate-200';
            return <button key={oi} dir="ltr" disabled={picked !== null} onClick={() => { setPicked(oi); if (oi === q.ci) { setRight(r => r + 1); speak(`${card.en}. ممتاز`); } else speak(`${card.en}. ${card.whyAr}`); }}
              className={`py-2 rounded-xl border-2 text-[16px] font-black text-[#002147] ${st}`}>{cards[oi].en}</button>;
          })}
        </div>
        {picked !== null && <div className={`rounded-xl p-2 text-[12.5px] font-bold ${wrong ? 'bg-rose-50 text-rose-800' : 'bg-emerald-50 text-emerald-800'}`}>
          {wrong ? <>الجواب الصحيح <span dir="ltr" className="font-black">{card.en}</span> ({card.ar}). {card.whyAr}</> : <>صح! <span dir="ltr" className="font-black">{card.en}</span> = {card.ar}</>}
        </div>}
        {picked !== null && <button onClick={() => { setPicked(null); if (qi + 1 < quiz.length) setQi(qi + 1); else setMode('done'); }} className="py-2.5 rounded-xl bg-[#002147] text-amber-300 font-black text-sm">التالي</button>}
      </div>
    );
  }

  return (
    <div data-testid="visual-cards" className="flex-1 min-h-0 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <p className="flex-1 text-[12.5px] font-black text-[#002147]">🖼️ {titleAr}: اضغط كل بطاقة واسمع سارة</p>
        <span className="text-[10px] font-black px-1.5 rounded bg-[#002147] text-amber-300">{seen.size}/{cards.length} ✓</span>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-1.5">
          {cards.map((cd, i) => (
            <button key={cd.en + i} data-testid="visual-card" onClick={() => tap(i)} className={`relative rounded-xl bg-white border-2 ${seen.has(i) ? 'border-emerald-400' : 'border-amber-200'} p-1 flex flex-col items-center shadow-sm active:scale-95 transition`}>
              {seen.has(i) && <CheckCircle2 size={15} className="absolute top-1 left-1 text-emerald-500 bg-white rounded-full" />}
              <p dir="ltr" className="text-[15px] leading-tight font-black text-[#002147]">{cd.en}</p>
              <p className="text-[11px] leading-tight font-bold text-[#C49E3A]">{cd.ar}</p>
              <VisualCardArt scene={cd.scene} className="w-full h-auto rounded-lg mt-0.5" label={cd.en} />
            </button>
          ))}
        </div>
      </div>
      <button onClick={() => { saraStopNarrator(); setMode('quiz'); }} className="py-2.5 rounded-xl bg-[#002147] text-amber-300 font-black text-sm flex items-center justify-center gap-1">تمرين الصور <ArrowLeft size={15} /></button>
      <button onClick={() => { saraStopNarrator(); onDone(); }} className="py-1 text-[11px] font-bold text-slate-500 underline">تخطّ البطاقات وكمّل الدرس</button>
      {open !== null && (
        <div className="fixed inset-0 z-[260] bg-slate-950/70 flex items-center justify-center p-4" onClick={() => setOpen(null)} data-testid="visual-card-big">
          <div className="w-full max-w-sm rounded-3xl bg-white border-4 border-[#C49E3A] p-3 flex flex-col items-center gap-1 animate-[pop_.2s_ease-out]" onClick={e => e.stopPropagation()}>
            <button onClick={() => setOpen(null)} className="self-start p-1 rounded-lg bg-slate-100" aria-label="close"><X size={16} /></button>
            <p dir="ltr" className="text-4xl font-black text-[#002147]">{cards[open].en}</p>
            <p className="text-2xl font-black text-[#C49E3A]">{cards[open].ar}</p>
            <VisualCardArt scene={cards[open].scene} className="w-full h-auto rounded-2xl" label={cards[open].en} />
            <p className="text-[12.5px] font-bold text-slate-600 text-center">{cards[open].whyAr}</p>
            <div className="flex gap-2 w-full">
              <button onClick={() => speak(`${cards[open].en}. ${cards[open].ar}`)} className="flex-1 py-2 rounded-xl bg-[#C49E3A] text-[#002147] font-black text-sm flex items-center justify-center gap-1"><Volume2 size={15} />اسمع مرة ثانية</button>
              <button onClick={() => { const n = open + 1; if (n < cards.length) tap(n); else setOpen(null); }} className="flex-1 py-2 rounded-xl bg-[#002147] text-amber-300 font-black text-sm">{open + 1 < cards.length ? 'البطاقة التالية' : 'تم'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default VisualCardsGrid;
