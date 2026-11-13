import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Volume2, RotateCcw, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import { saraNarrate, saraStopNarrator, saraUnlockNarrator } from './SaraTrackPlayer';
import { buildSentenceCards, saveSentenceActivity, type SentenceCard, type SentenceBuilderInput } from '../lib/saraSentenceBuilder';
import {
  detectCategory,
  spokenSentence,
  spinIndex,
  templatesForCard,
  wordEmoji,
  type FilledTemplate,
} from '../lib/goldenWordPlay';
import { attemptsLeft, chipLabel, firstWordChip, initialState, MAX_ATTEMPTS, scramble, submit, tokenize, type PuzzleState } from '../lib/pictureSentenceBuilder';
import './SaraSentenceBuilder.css';

interface Props extends SentenceBuilderInput {
  trackId: string; lessonId: string; uid?: string;
  onDone: () => void; doneLabel: string;
  talkSlot?: (sentences: string[]) => React.ReactNode;
  /** Test hook — production uses Sara's existing cloud voice. */
  speak?: (text: string, onFail: () => void, onDone: () => void) => void;
  random?: () => number;
}

interface Bead { en: string; emoji: string }

const SPARKS = ['✨', '⭐', '🌟', '✨', '⭐', '💫'];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** 🧩 ابن جملتك — playful golden-word activity inside a lesson. Counter and save callbacks stay the same. */
export const SaraSentenceBuilder: React.FC<Props> = ({ trackId, lessonId, uid, onDone, doneLabel, talkSlot, speak, random, ...input }) => {
  const cards: SentenceCard[] = useMemo(() => buildSentenceCards(input), [input.titleEn, input.level]); // eslint-disable-line react-hooks/exhaustive-deps
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState<Record<string, number>>({});
  const [built, setBuilt] = useState<string[]>([]);
  const [doneCards, setDoneCards] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [finished, setFinished] = useState(false);
  const [audio, setAudio] = useState<null | 'loading' | 'failed'>(null);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [popping, setPopping] = useState(false);
  const [tIdx, setTIdx] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [used, setUsed] = useState<number[]>([]);
  const [puzzle, setPuzzle] = useState<PuzzleState>(initialState());
  const [round, setRound] = useState(0);
  const [notice, setNotice] = useState('');
  const [necklace, setNecklace] = useState<Bead[]>([]);
  const savedRef = useRef(false);
  const spinTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const c = cards[idx];
  const chosen = c.options[sel[c.id] || 0] || c.options[0];
  const emoji = wordEmoji(chosen.en, chosen.icon || c.icon);
  const category = detectCategory(input.titleEn, input.titleAr, chosen.en);
  const templates: FilledTemplate[] = useMemo(
    () => templatesForCard({
      cardId: c.id, wordEn: chosen.en, wordAr: chosen.ar, category,
      beforeEn: c.beforeEn, afterEn: c.afterEn, beforeAr: c.beforeAr, afterAr: c.afterAr,
    }),
    [c.id, chosen.en, chosen.ar, category, c.beforeEn, c.afterEn, c.beforeAr, c.afterAr],
  );
  const safeIdx = templates.length ? tIdx % templates.length : 0;
  const current = templates[safeIdx] || templates[0];
  const target = current ? spokenSentence(current.en) : '';
  const words = useMemo(() => tokenize(current?.en || ''), [current?.en]);
  const order = useMemo(() => scramble(words, random), [words, round]); // eslint-disable-line react-hooks/exhaustive-deps
  const isOpen = !!revealed[c.id];
  const hintChip = puzzle.hint === 'first-word' && puzzle.status === 'building' && used.length === 0 ? firstWordChip(words, order, used) : null;

  const say = (text: string) => {
    if (speak) { setAudio('loading'); speak(text, () => setAudio('failed'), () => setAudio(null)); return; }
    saraUnlockNarrator(); setAudio('loading');
    saraNarrate(text, () => setAudio('failed'), () => setAudio('failed'), () => setAudio(null));
    setTimeout(() => setAudio(a => (a === 'loading' ? null : a)), 1600);
  };

  useEffect(() => () => { saraStopNarrator(); if (spinTimer.current) clearTimeout(spinTimer.current); }, []);
  useEffect(() => {
    setUsed([]); setPuzzle(initialState()); setNotice(''); setRound(r => r + 1); setOpen(false); setTIdx(0);
  }, [idx, chosen.en]);
  useEffect(() => {
    setUsed([]); setPuzzle(initialState()); setNotice(''); setRound(r => r + 1);
  }, [tIdx]);

  const collect = (sentence: string) => {
    setBuilt(b => (b.includes(sentence) ? b : [...b, sentence]));
    setDoneCards(d => (d.includes(c.id) ? d : [...d, c.id]));
    setNecklace(n => (n.some(bead => bead.en === chosen.en) ? n : [...n, { en: chosen.en, emoji }]));
  };

  const openGift = () => {
    setRevealed(r => ({ ...r, [c.id]: true }));
    setPopping(true);
    if (!prefersReducedMotion()) setTimeout(() => setPopping(false), 700);
    else setPopping(false);
  };

  const pickWord = (oi: number) => {
    setSel(s => ({ ...s, [c.id]: oi }));
    setOpen(false);
    setPopping(true);
    if (!prefersReducedMotion()) setTimeout(() => setPopping(false), 700);
    else setPopping(false);
  };

  const landSpin = () => {
    setTIdx(i => spinIndex(templates.length, i, random));
    setSpinning(false);
    setUsed([]); setPuzzle(initialState()); setNotice(''); setRound(r => r + 1);
  };
  const spin = () => {
    if (templates.length < 2 || spinning || puzzle.status !== 'building') return;
    if (prefersReducedMotion()) { landSpin(); return; }
    setSpinning(true);
    if (spinTimer.current) clearTimeout(spinTimer.current);
    spinTimer.current = setTimeout(landSpin, 720);
  };

  const pickChip = (wordIndex: number) => {
    if (puzzle.status !== 'building' || used.includes(wordIndex)) return;
    const next = [...used, wordIndex];
    setUsed(next); setNotice('');
    if (next.length < words.length) return;
    const result = submit(puzzle, next.map(i => words[i]), words);
    setPuzzle(result.state);
    if (result.outcome === 'correct') {
      collect(target);
      setNotice('👏 صح! اسمع سارة وقلها وراها بصوت عالي.');
      say(target);
    } else if (result.outcome === 'revealed') {
      collect(target);
      setNotice('ولا يهمك، هذي الجملة الصحيحة. اسمعها وقلها بصوتك.');
      say(target);
    } else {
      setUsed([]);
      if (result.state.hint === 'first-word') setNotice(`قريب! لوّنّا لك أول كلمة. باقي ${attemptsLeft(result.state)} محاولات.`);
      else { setNotice('اسمع سارة تقول الجملة، وجرّب مرة أخيرة.'); say(target); }
    }
  };
  const unpick = (pos: number) => { if (puzzle.status === 'building') setUsed(u => u.filter((_, i) => i !== pos)); };

  const finish = () => {
    setFinished(true);
    if (!savedRef.current) {
      savedRef.current = true;
      void saveSentenceActivity(uid, { trackId, lessonId, lessonTitleAr: input.titleAr, sentencesBuilt: built.length, sentences: built, at: Date.now() });
    }
  };
  const restart = () => {
    setFinished(false); setIdx(0); setBuilt([]); setDoneCards([]); setSel({}); setRevealed({}); setNecklace([]);
    setUsed([]); setPuzzle(initialState()); setNotice(''); savedRef.current = false;
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
        <button onClick={restart} className="flex-1 py-2.5 rounded-xl bg-white border-2 border-amber-300 text-[#002147] text-[13px] font-black">↻ أعد بناء الجمل</button>
        <button onClick={onDone} data-testid="sentence-builder-done-btn" className="flex-1 py-2.5 rounded-xl bg-[#002147] text-amber-300 text-[13px] font-black">{doneLabel}</button>
      </div>
    </div>
  );

  const solved = puzzle.status !== 'building';

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

      <div className="ssb-necklace shrink-0" data-testid="golden-necklace" aria-label="العقد الذهبي لهذه الجلسة">
        <span className="ssb-necklace__string" aria-hidden="true" />
        {necklace.length === 0
          ? <span className="text-[10px] font-bold text-amber-700/70 px-2">العقد الذهبي: اجمع كلماتك هنا</span>
          : necklace.map(bead => (
            <span key={bead.en} title={bead.en} data-testid={`necklace-bead-${bead.en}`} className="ssb-necklace__bead">{bead.emoji}</span>
          ))}
        <span className="ssb-necklace__string" aria-hidden="true" />
      </div>

      <div className="flex gap-1 shrink-0">{cards.map(x => <span key={x.id} className={`h-1.5 flex-1 rounded-full ${doneCards.includes(x.id) ? 'bg-emerald-500' : x.id === c.id ? 'bg-[#C49E3A]' : 'bg-slate-200'}`} />)}</div>

      <div className="rounded-3xl bg-[#002147] border-2 border-[#C49E3A] p-4 text-white relative overflow-hidden shrink-0">
        {!isOpen ? (
          <button type="button" onClick={openGift} data-testid="golden-gift" className="ssb-gift">
            <span className="ssb-gift__box" aria-hidden="true">🎁</span>
            <span className="text-[13px] font-black text-amber-300">افتح الكلمة الذهبية</span>
            <span className="text-[11px] font-bold text-white/70">{c.labelAr}</span>
          </button>
        ) : (
          <div className="flex items-start gap-3">
            <div className={`ssb-word-pop relative shrink-0 ${popping ? 'is-pop' : ''}`} data-testid="golden-word-reveal">
              <span className="ssb-word-pop__emoji" data-testid="golden-word-emoji">{emoji}</span>
              {popping && SPARKS.map((s, i) => (
                <span key={i} className="ssb-sparkle" style={{ top: `${-4 + (i % 3) * 12}px`, [(i < 3 ? 'right' : 'left')]: `${-6 + i * 4}px` }} aria-hidden="true">{s}</span>
              ))}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-black text-amber-300">{c.labelAr}</p>
              <p dir="ltr" className="mt-1 text-[22px] leading-snug font-black text-left">
                <button type="button" onClick={() => setOpen(v => !v)} data-testid="sentence-slot" className="px-2 py-0.5 rounded-lg bg-[#C49E3A] text-[#002147] underline decoration-2 underline-offset-4 active:scale-95">{chosen.en}</button>
              </p>
              <p data-testid="sentence-ar" className="mt-1 text-[16px] font-black text-amber-100 leading-relaxed">{chosen.ar}</p>
            </div>
          </div>
        )}
        {isOpen && (
          <button type="button" onClick={() => say(target)} data-testid="sentence-listen" className="mt-3 w-full py-2 rounded-xl bg-[#C49E3A] text-[#002147] text-[13px] font-black flex items-center justify-center gap-1.5">
            {audio === 'failed' ? <><RotateCcw size={15} /> تعذّر الصوت — إعادة المحاولة</> : audio === 'loading' ? 'سارة تجهّز الصوت…' : <><Volume2 size={15} /> اسمعها بصوت سارة</>}
          </button>
        )}
      </div>

      {isOpen && (
        <div className="ssb-wheel shrink-0" data-testid="sentence-wheel">
          <button type="button" onClick={() => { if (!spinning && puzzle.status === 'building') setTIdx(i => (i + templates.length - 1) % templates.length); }} className="px-2 py-2 rounded-xl bg-white border border-amber-300 text-[#002147] disabled:opacity-40" aria-label="القالب السابق" disabled={spinning || templates.length < 2}>›</button>
          <div className={`ssb-wheel__frame ${spinning ? 'is-spinning' : ''}`}>
            <p className="text-[10px] font-black text-amber-700/80">دوّر قالب الجملة</p>
            <p dir="ltr" className="ssb-wheel__pattern text-left text-[14px] sm:text-[16px] font-black text-[#002147] truncate" data-testid="wheel-pattern">{current?.patternEn}</p>
          </div>
          <button type="button" onClick={() => { if (!spinning && puzzle.status === 'building') setTIdx(i => (i + 1) % templates.length); }} className="px-2 py-2 rounded-xl bg-white border border-amber-300 text-[#002147]" aria-label="القالب التالي" disabled={spinning || templates.length < 2}>‹</button>
          <button type="button" onClick={spin} data-testid="wheel-spin" disabled={spinning || templates.length < 2 || puzzle.status !== 'building'} className="shrink-0 px-3 py-2 rounded-xl bg-[#002147] text-amber-300 text-[12px] font-black disabled:opacity-40">🎡 دوّر</button>
        </div>
      )}

      {isOpen && open && (
        <div className="grid grid-cols-2 gap-1.5 shrink-0" data-testid="sentence-options">
          {c.options.map((op, oi) => (
            <button key={op.en} type="button" onClick={() => pickWord(oi)} className={`rounded-2xl border-2 p-2.5 text-start active:scale-[0.98] ${oi === (sel[c.id] || 0) ? 'bg-amber-100 border-[#C49E3A]' : 'bg-white border-slate-200'}`}>
              <span className="flex items-center gap-1.5" dir="ltr"><span className="text-lg">{wordEmoji(op.en, op.icon || c.icon)}</span><span className="text-[14px] font-black text-[#002147] leading-tight">{op.en}</span></span>
              <span className="block mt-0.5 text-[12px] font-bold text-slate-500">{op.ar}</span>
            </button>
          ))}
        </div>
      )}
      {isOpen && !open && (
        <button type="button" onClick={() => setOpen(true)} className="shrink-0 py-2.5 rounded-2xl bg-white border-2 border-dashed border-[#C49E3A] text-[#002147] text-[13px] font-black">بدّل الكلمة الذهبية ↕</button>
      )}

      {isOpen && (
        <div className="rounded-2xl border-2 border-amber-200 bg-white p-2.5 shrink-0" data-testid="golden-puzzle">
          <div className="flex items-center justify-between gap-2 mb-1.5 text-[11px] font-black">
            <span className="text-[#002147]">ركّب الجملة من الكلمات</span>
            <span data-testid="puzzle-attempts" className="text-slate-500">{solved ? '' : `المحاولات: ${attemptsLeft(puzzle)} من ${MAX_ATTEMPTS}`}</span>
          </div>
          <div dir="ltr" data-testid="puzzle-built" className="min-h-[44px] rounded-xl border-2 border-dashed border-amber-300/80 px-2 py-1.5 flex flex-wrap gap-1.5 items-center">
            {solved
              ? <span className={`text-[15px] sm:text-lg font-black ${puzzle.status === 'solved' ? 'text-emerald-700' : 'text-amber-800'}`} data-testid="puzzle-answer">{current.en}</span>
              : used.length === 0
                ? <span className="text-slate-400 text-[12px] w-full text-right font-bold" dir="rtl">اضغط الكلمات بالترتيب…</span>
                : used.map((wi, pos) => (
                  <button key={`${wi}-${pos}`} type="button" onClick={() => unpick(pos)} className="rounded-lg bg-[#002147] text-amber-300 px-2 py-1 text-[13px] sm:text-[15px] font-black">
                    {pos === 0 ? (words[wi] === 'I' ? 'I' : words[wi][0].toUpperCase() + words[wi].slice(1)) : words[wi]}
                  </button>
                ))}
          </div>
          {!solved && (
            <div dir="ltr" className="mt-2 flex flex-wrap gap-1.5 justify-center" data-testid="puzzle-chips">
              {order.map(wi => {
                const taken = used.includes(wi);
                const lit = hintChip === wi;
                return (
                  <button key={wi} type="button" disabled={taken} onClick={() => pickChip(wi)} data-hint={lit ? 'first' : undefined}
                    className={`rounded-full px-3 py-1.5 text-[12px] sm:text-sm font-bold border ${taken ? 'opacity-25 border-slate-200' : lit ? 'bg-amber-300 text-[#002147] border-amber-400 ring-2 ring-amber-300' : 'bg-white border-amber-300 text-[#002147]'}`}>
                    {chipLabel(words[wi], wi)}
                  </button>
                );
              })}
            </div>
          )}
          {notice && <p role="status" data-testid="puzzle-notice" className="mt-1.5 text-center text-[12px] sm:text-[13px] font-bold text-[#002147]">{notice}</p>}
        </div>
      )}

      <div className="mt-auto flex gap-2 shrink-0">
        <button disabled={idx === 0} onClick={() => { setIdx(i => i - 1); setOpen(false); }} className="px-3 py-2.5 rounded-xl bg-white border-2 border-amber-300 text-[#002147] disabled:opacity-40" aria-label="previous"><ArrowRight size={16} /></button>
        {idx + 1 < cards.length ? (
          <button disabled={!doneCards.includes(c.id)} onClick={() => { setIdx(i => i + 1); setOpen(false); }} data-testid="sentence-next" className="flex-1 py-2.5 rounded-xl bg-[#002147] text-amber-300 text-[14px] font-black disabled:opacity-40 flex items-center justify-center gap-1">بطاقة جديدة <ArrowLeft size={15} /></button>
        ) : (
          <button disabled={!doneCards.includes(c.id)} onClick={finish} data-testid="sentence-finish" className="flex-1 py-2.5 rounded-xl bg-[#C49E3A] text-[#002147] text-[14px] font-black disabled:opacity-40 flex items-center justify-center gap-1"><CheckCircle2 size={16} /> خلصت الجمل</button>
        )}
      </div>
      <p className="text-center text-[10.5px] font-bold text-slate-400 shrink-0">افتح الكلمة، دوّر القالب، وركّب الجملة. سارة تنطقها بعد ما تبنيها، وتقدر تسمعها متى ما تبي.</p>
    </div>
  );
};
export default SaraSentenceBuilder;
