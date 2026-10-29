import { BidiText } from './BidiText';
import React, { useEffect, useState } from 'react';
import { saraNarrate, saraStopNarrator, saraUnlockNarrator } from './SaraTrackPlayer';

/** Sara's interactive whiteboard (same look as the curricula board): lesson written with colours/icons, then its exercises; finishing passes the lesson. */
export const BOARD_THEME = { bgHex: '#083344', gradientToHex: '#0E7490', accentHex: '#2DD4BF', cardBg: 'rgba(4, 33, 44, 0.75)', cardBorder: 'rgba(45, 212, 191, 0.35)', gridColor: 'rgba(45, 212, 191, 0.08)' };
export interface BoardQuestion { promptAr: string; promptEn?: string; options: string[]; correctIndex: number; play?: string }
export interface BoardExample { en: string; ar?: string }
interface Props {
  titleAr: string; titleEn?: string; points: string[]; examples: BoardExample[]; examplesTitle?: string; questions: BoardQuestion[];
  compactExamples?: boolean; onClose: () => void; onPassed: () => void; onNextLesson?: () => void;
}
const icons = ['💡', '📌', '✨', '🎯', '🔑', '🧩'];
const hl = (t: string) => t.split(/([A-Za-z][A-Za-z'’\- ]*[A-Za-z])/g).map((p, i) => i % 2
  ? <mark key={i} dir="ltr" className="px-1 rounded bg-amber-300/90 text-slate-950 font-black">{p}</mark> : <span key={i}>{p}</span>);

export const BoardChoice: React.FC<{ q: BoardQuestion; picked: number | null; onPick: (i: number) => void; locked?: boolean }> = ({ q, picked, onPick, locked }) => (
  <div className="space-y-1.5">
    <p className="text-[13px] font-black text-slate-800 leading-snug"><BidiText text={q.promptAr} />{q.promptEn && <span dir="ltr" className="block text-[#002147] font-bold">{q.promptEn}</span>}</p>
    <div className="grid gap-1.5">
      {q.options.map((o, i) => {
        const state = picked === null ? '' : i === q.correctIndex && picked === i ? 'bg-emerald-100 border-emerald-500' : picked === i ? 'bg-rose-100 border-rose-400' : 'opacity-70';
        return <button key={i} disabled={locked} onClick={() => onPick(i)} dir="auto" className={`w-full text-start px-3 py-1 rounded-xl border-2 border-slate-200 bg-white text-[13px] font-bold active:scale-[0.99] ${state}`}>{o}</button>;
      })}
    </div>
  </div>
);

export const SaraLessonBoard: React.FC<Props> = ({ titleAr, titleEn, points, examples, examplesTitle, questions, compactExamples, onClose, onPassed, onNextLesson }) => {
  const th = BOARD_THEME;
  const [bStep, setBStep] = useState(0); const [bPick, setBPick] = useState<number | null>(null);
  const [audio, setAudio] = useState<'idle' | 'loading' | 'playing' | 'failed'>('idle');
  const steps = 2 + questions.length; const qi = bStep - 2;
  const q = qi >= 0 && qi < questions.length ? questions[qi] : null; const done = bStep >= steps;
  const solved = q !== null && bPick === q.correctIndex;
  const textFor = (s: number) => s === 0 ? [titleAr, ...points].join('. ') : s === 1 ? examples.map(e => e.en).join('. ') : (questions[s - 2]?.play || '');
  const say = (t: string) => {
    if (!t) return; saraUnlockNarrator(); setAudio('loading');
    saraNarrate(t, () => setAudio('failed'), () => setAudio('failed'), () => setAudio('idle'));
    setTimeout(() => setAudio(a => (a === 'loading' ? 'playing' : a)), 1500);
  };
  const stop = () => { saraStopNarrator(); setAudio('idle'); };
  useEffect(() => { if (bStep < 2) say(textFor(bStep)); else stop(); }, [bStep]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => saraStopNarrator(), []);
  const speakBtn = (bStep < 2 || q?.play) && (audio === 'failed'
    ? <button onClick={() => say(textFor(bStep))} data-testid="board-retry" className="px-2 py-0.5 rounded-lg bg-rose-100 text-rose-700 text-[11px] font-black">🔄 إعادة المحاولة</button>
    : <button onClick={audio === 'idle' ? () => say(textFor(bStep)) : stop} className="px-2 py-0.5 rounded-lg bg-amber-400 text-slate-950 text-[11px] font-black">{audio === 'idle' ? '🔊' : '⏹️'}</button>);
  return (
    <div data-testid="lesson-board" className="flex-1 min-h-0 flex flex-col gap-2 p-2.5 overflow-hidden" style={{ background: `linear-gradient(160deg, ${th.bgHex}, ${th.gradientToHex})` }}>
      <div className="shrink-0 flex items-center gap-2">
        <span className="px-2 py-0.5 rounded-full text-[11px] font-black text-slate-950" style={{ background: th.accentHex }}>🧑‍🏫 سبورة سارة</span>
        <span className="text-[11px] font-black text-teal-100/80">{Math.min(bStep + 1, steps)} / {steps}</span>
        <span className="flex-1" />
        {speakBtn}
        <button onClick={() => { stop(); onClose(); }} className="px-2 py-0.5 rounded-lg bg-white/10 text-white text-[11px] font-black">✖ رجوع للصفحة</button>
      </div>
      <div className="flex-1 min-h-0 rounded-2xl p-3 flex flex-col gap-2 overflow-hidden" style={{ background: th.cardBg, border: `2px solid ${th.cardBorder}`, backgroundImage: `linear-gradient(${th.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${th.gridColor} 1px, transparent 1px)`, backgroundSize: '22px 22px' }}>
        {bStep === 0 && (<>
          <p className="text-[17px] font-black" style={{ color: th.accentHex }}>📘 {titleAr}</p>
          {titleEn && <p dir="ltr" className="text-[12px] font-bold text-teal-100/80 text-start">{titleEn}</p>}
          {points.map((pt, i) => <p key={i} className="text-[13px] leading-relaxed font-semibold text-white flex gap-2"><span className="shrink-0">{icons[i % icons.length]}</span><span>{hl(pt)}</span></p>)}
        </>)}
        {bStep === 1 && (<>
          <p className="text-[16px] font-black text-amber-300">🗣️ {examplesTitle || 'مثال حي'}</p>
          {compactExamples ? (
            <div className="grid grid-cols-2 gap-1">
              {examples.map((e, i) => <div key={i} className="rounded-lg px-1.5 py-1 bg-white/10 border border-white/15 min-w-0"><p dir="ltr" className="text-[12px] font-black text-white text-start truncate">{e.en}</p>{e.ar && <p className="text-[11px] text-teal-100/90 font-semibold truncate">{e.ar}</p>}</div>)}
            </div>
          ) : examples.map((e, i) => (
            <div key={i} className="rounded-xl p-2 bg-white/10 border border-white/15">
              <p dir="ltr" className="text-[13px] font-black text-white text-start">{e.en}</p>
              {e.ar && <p className="text-[12px] text-teal-100/90 font-semibold">{e.ar}</p>}
            </div>
          ))}
        </>)}
        {q && (<>
          <p className="text-[16px] font-black text-amber-300">✍️ تمرين {qi + 1} من {questions.length}</p>
          <div className="rounded-xl p-2 bg-white"><BoardChoice q={q} picked={bPick} locked={solved} onPick={i => { setBPick(i); if (i !== q.correctIndex) setTimeout(() => setBPick(null), 900); }} /></div>
          {bPick !== null && <p className={`text-[13px] font-black ${solved ? 'text-emerald-300' : 'text-rose-300'}`}>{solved ? '✅ صح!' : '❌ حاول مرة ثانية'}</p>}
        </>)}
        {done && (
          <div className="flex-1 flex flex-col items-center justify-center gap-2 text-center">
            <p className="text-3xl">🎉</p>
            <p className="text-[15px] font-black text-white">{onNextLesson ? 'أحسنت! خلصت تمارين السبورة وانفتح لك الدرس التالي' : 'أحسنت! خلصت تمارين السبورة'}</p>
          </div>
        )}
      </div>
      <div className="shrink-0 flex gap-2">
        {bStep > 0 && !done && <button onClick={() => { stop(); setBStep(b => b - 1); setBPick(null); }} className="px-3 py-2 rounded-xl bg-white/10 text-white text-[13px] font-black">→ السابق</button>}
        {!done && (q === null || solved) && (
          <button data-testid="board-next" onClick={() => { stop(); setBPick(null); if (bStep + 1 >= steps) onPassed(); setBStep(b => b + 1); }}
            className="flex-1 py-2 rounded-xl text-slate-950 text-[13px] font-black" style={{ background: th.accentHex }}>{bStep + 1 >= steps ? '🏁 إنهاء' : 'التالي ←'}</button>
        )}
        {done && (onNextLesson
          ? <button data-testid="board-next-lesson" onClick={() => { stop(); onNextLesson(); }} className="flex-1 py-2 rounded-xl bg-[#58cc02] text-white text-[14px] font-black">✅ الدرس التالي ←</button>
          : <button onClick={() => { stop(); onClose(); }} className="flex-1 py-2 rounded-xl bg-[#58cc02] text-white text-[14px] font-black">✅ رجوع</button>)}
      </div>
    </div>
  );
};
export default SaraLessonBoard;
