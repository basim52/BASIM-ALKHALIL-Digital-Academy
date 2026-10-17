import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Volume2, RotateCcw, CheckCircle2, MessageCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { saraNarrate, saraStopNarrator, saraUnlockNarrator } from './SaraTrackPlayer';
import { buildSentenceCards, saveSentenceActivity, type SentenceCard } from '../lib/saraSentenceBuilder';
import type { SentenceBuilderInput } from '../lib/saraSentenceBuilder';

interface Props extends SentenceBuilderInput {
  trackId: string; lessonId: string; uid?: string;
  onDone: () => void; doneLabel: string;
  talkSlot?: (sentences: string[]) => React.ReactNode;
}

/** 🧩 Build your sentence — inside a lesson. Sara (cloud voice) reads each sentence first and after every swap. */
export const SaraSentenceBuilder: React.FC<Props> = ({ trackId, lessonId, uid, onDone, doneLabel, talkSlot, ...input }) => {
  const cards: SentenceCard[] = useMemo(() => buildSentenceCards(input), [input.titleEn, input.level]); // eslint-disable-line react-hooks/exhaustive-deps
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState<Record<string, number>>({});
  const [built, setBuilt] = useState<string[]>([]);
  const [doneCards, setDoneCards] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [finished, setFinished] = useState(false);
  const [audio, setAudio] = useState<null | 'loading' | 'failed'>(null);
  const savedRef = useRef(false);
  const c = cards[idx];
  const chosen = c.options[sel[c.id] || 0] || c.options[0];
  const en = `${c.beforeEn}${chosen.en}${c.afterEn}`;
  const ar = `${c.beforeAr}${chosen.ar}${c.afterAr}`;
  const say = (text: string) => {
    saraUnlockNarrator(); setAudio('loading');
    saraNarrate(text, () => setAudio('failed'), () => setAudio('failed'), () => setAudio(null));
    setTimeout(() => setAudio(a => (a === 'loading' ? null : a)), 1600);
  };
  useEffect(() => { say(en); }, [idx]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => saraStopNarrator(), []);
  const choose = (oi: number) => {
    const next = `${c.beforeEn}${c.options[oi].en}${c.afterEn}`;
    setSel(s => ({ ...s, [c.id]: oi }));
    setBuilt(b => (b.includes(next) ? b : [...b, next]));
    setDoneCards(d => (d.includes(c.id) ? d : [...d, c.id]));
    setOpen(false);
    say(next);
  };
  const finish = () => {
    setFinished(true);
    if (!savedRef.current) {
      savedRef.current = true;
      void saveSentenceActivity(uid, { trackId, lessonId, lessonTitleAr: input.titleAr, sentencesBuilt: built.length, sentences: built, at: Date.now() });
    }
  };
  if (finished) return (
    <div data-testid="sentence-builder-done" className="flex-1 min-h-0 flex flex-col gap-2 p-3 overflow-hidden">
      <div className="rounded-3xl bg-[#002147] border-2 border-[#C49E3A] p-4 text-center text-white flex flex-col items-center gap-2">
        <span className="text-4xl">🏆</span>
        <p className="text-lg font-black text-amber-300">بنَيت {built.length} {built.length === 1 ? 'جملة' : 'جمل'}</p>
        <p className="text-[12px] font-bold text-white/75 leading-relaxed">الحين قلها بصوتك مع سارة، وخَلّ المحادثة تكمل من عندك.</p>
      </div>
      <div className="grid gap-1.5" dir="ltr">
        {built.slice(0, 3).map(s => <p key={s} className="px-3 py-2 rounded-xl bg-white border border-amber-300 text-[13px] font-black text-[#002147] text-left truncate">{s}</p>)}
        {built.length > 3 && <p className="text-[11px] font-bold text-slate-500 text-center">+{built.length - 3} جمل ثانية جاهزة للمحادثة</p>}
      </div>
      {talkSlot?.(built)}
      <div className="mt-auto flex gap-2">
        <button onClick={() => { setFinished(false); setIdx(0); setBuilt([]); setDoneCards([]); setSel({}); savedRef.current = false; }} className="flex-1 py-2.5 rounded-xl bg-white border-2 border-amber-300 text-[#002147] text-[13px] font-black">↻ أعد بناء الجمل</button>
        <button onClick={onDone} data-testid="sentence-builder-done-btn" className="flex-1 py-2.5 rounded-xl bg-[#002147] text-amber-300 text-[13px] font-black">{doneLabel}</button>
      </div>
    </div>
  );
  return (
    <div data-testid="sentence-builder" className="flex-1 min-h-0 flex flex-col gap-2 p-2.5 overflow-hidden">
      <div className="flex items-center gap-2 shrink-0">
        <span className="w-9 h-9 rounded-2xl bg-[#002147] border-2 border-[#C49E3A] flex items-center justify-center text-lg">🧩</span>
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-black text-[#002147] leading-tight">ابنِ جملتك</p>
          <p className="text-[11px] font-bold text-slate-500 truncate">{input.titleAr} · غيّر الكلمة الذهبية واصنع جملة جديدة</p>
        </div>
        <span data-testid="sentences-built-count" className="shrink-0 px-2 py-1 rounded-full bg-[#002147] text-amber-300 text-[11px] font-black">بنَيت {built.length} جمل</span>
        <span className="shrink-0 px-2 py-1 rounded-full bg-white border border-amber-300 text-[#002147] text-[11px] font-black">{idx + 1}/{cards.length}</span>
      </div>
      <div className="flex gap-1 shrink-0">{cards.map(x => <span key={x.id} className={`h-1.5 flex-1 rounded-full ${doneCards.includes(x.id) ? 'bg-emerald-500' : x.id === c.id ? 'bg-[#C49E3A]' : 'bg-slate-200'}`} />)}</div>

      <div className="rounded-3xl bg-[#002147] border-2 border-[#C49E3A] p-4 text-white relative overflow-hidden shrink-0">
        <div className="flex items-start gap-3">
          <span className="text-4xl leading-none shrink-0">{chosen.icon || c.icon}</span>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-black text-amber-300">{c.labelAr}</p>
            <p dir="ltr" className="mt-1 text-[22px] leading-snug font-black text-left">
              {c.beforeEn}
              <button onClick={() => setOpen(v => !v)} data-testid="sentence-slot" className="mx-0.5 px-2 py-0.5 rounded-lg bg-[#C49E3A] text-[#002147] underline decoration-2 underline-offset-4 active:scale-95">{chosen.en}</button>
              {c.afterEn}
            </p>
            <p data-testid="sentence-ar" className="mt-2 text-[16px] font-black text-amber-100 leading-relaxed">{ar}</p>
          </div>
        </div>
        <button onClick={() => say(en)} data-testid="sentence-listen" className="mt-3 w-full py-2 rounded-xl bg-[#C49E3A] text-[#002147] text-[13px] font-black flex items-center justify-center gap-1.5">
          {audio === 'failed' ? <><RotateCcw size={15} /> تعذّر الصوت — إعادة المحاولة</> : audio === 'loading' ? 'سارة تجهّز الصوت…' : <><Volume2 size={15} /> اسمعها بصوت سارة</>}
        </button>
      </div>

      {open ? (
        <div className="grid grid-cols-2 gap-1.5 shrink-0" data-testid="sentence-options">
          {c.options.map((op, oi) => (
            <button key={op.en} onClick={() => choose(oi)} className={`rounded-2xl border-2 p-2.5 text-start active:scale-[0.98] ${oi === (sel[c.id] || 0) ? 'bg-amber-100 border-[#C49E3A]' : 'bg-white border-slate-200'}`}>
              <span className="flex items-center gap-1.5" dir="ltr"><span className="text-lg">{op.icon || c.icon}</span><span className="text-[14px] font-black text-[#002147] leading-tight">{op.en}</span></span>
              <span className="block mt-0.5 text-[12px] font-bold text-slate-500">{op.ar}</span>
            </button>
          ))}
        </div>
      ) : (
        <button onClick={() => setOpen(true)} className="shrink-0 py-2.5 rounded-2xl bg-white border-2 border-dashed border-[#C49E3A] text-[#002147] text-[13px] font-black">بدّل الكلمة الذهبية ↕</button>
      )}

      <div className="mt-auto flex gap-2 shrink-0">
        <button disabled={idx === 0} onClick={() => { setIdx(i => i - 1); setOpen(false); }} className="px-3 py-2.5 rounded-xl bg-white border-2 border-amber-300 text-[#002147] disabled:opacity-40" aria-label="previous"><ArrowRight size={16} /></button>
        {idx + 1 < cards.length ? (
          <button disabled={!doneCards.includes(c.id)} onClick={() => { setIdx(i => i + 1); setOpen(false); }} data-testid="sentence-next" className="flex-1 py-2.5 rounded-xl bg-[#002147] text-amber-300 text-[14px] font-black disabled:opacity-40 flex items-center justify-center gap-1">بطاقة جديدة <ArrowLeft size={15} /></button>
        ) : (
          <button disabled={!doneCards.includes(c.id)} onClick={finish} data-testid="sentence-finish" className="flex-1 py-2.5 rounded-xl bg-[#C49E3A] text-[#002147] text-[14px] font-black disabled:opacity-40 flex items-center justify-center gap-1"><CheckCircle2 size={16} /> خلصت الجمل</button>
        )}
      </div>
      <p className="text-center text-[10.5px] font-bold text-slate-400 shrink-0">سارة تنطق الجملة أولاً، وبعد كل تبديل تنطق الجملة الجديدة.</p>
    </div>
  );
};
export default SaraSentenceBuilder;
