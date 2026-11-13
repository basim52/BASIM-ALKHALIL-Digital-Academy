import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PICTURE_SENTENCE_SETS, type PictureSentenceSet } from '../data/classroom/pictureSentences';
import { MAX_ATTEMPTS, attemptsLeft, chipLabel, firstWordChip, initialState, scramble, submit, tokenize, type PuzzleState } from '../lib/pictureSentenceBuilder';
import { ClassroomVoice, type VoiceTurn } from '../lib/abboud/voice';

/** The voice queue the activity needs; tests inject a fake. */
export interface SentenceVoice { play: (turns: VoiceTurn[], active: (s: VoiceTurn['speaker'] | null) => void, fallback: () => void) => Promise<void>; stop: () => void; unlock: () => void }
export interface PictureSentenceBuilderProps {
  onClose: () => void;
  /** Teacher of the class that opened the activity (default Sara). `voiceName` is their own TTS voice. */
  teacherNameAr?: string; voiceName?: string; teacherGender?: 'female' | 'male';
  sets?: PictureSentenceSet[];
  voice?: SentenceVoice;
  random?: () => number;
}

const NEON = ['#4f7cff', '#8b5cf6'];
const glow = (i: number, on = false) => {
  const c = NEON[i % 2];
  return { border: `2px solid ${c}`, boxShadow: on ? `0 0 0 2px #facc15, 0 0 18px ${c}` : `0 0 12px ${c}99, inset 0 0 10px ${c}33` };
};

/**
 * 🧩 «ركّب الجملة» — a classroom activity. A neon card of 5 picture rows (circle picture + full English sentence +
 * Arabic meaning + 🔊). One row is the puzzle: its English is hidden and its words are scrambled into small chips at the
 * bottom. Three attempts with growing hints, then the answer. Standalone: nothing is saved, no XP, no progress.
 */
export const PictureSentenceBuilder: React.FC<PictureSentenceBuilderProps> = ({ onClose, teacherNameAr = 'سارة', voiceName, teacherGender = 'female', sets = PICTURE_SENTENCE_SETS, voice: injected, random }) => {
  const voice = useRef<SentenceVoice>(injected || new ClassroomVoice());
  const she = teacherGender === 'female';
  const [setIdx, setSetIdx] = useState(0);
  const [rowIdx, setRowIdx] = useState(0);
  const [round, setRound] = useState(0);
  const [used, setUsed] = useState<number[]>([]);
  const [state, setState] = useState<PuzzleState>(initialState());
  const [notice, setNotice] = useState('');
  const [speaking, setSpeaking] = useState<string | null>(null);
  const set = sets[setIdx];
  const done = rowIdx >= set.rows.length;
  const row = set.rows[Math.min(rowIdx, set.rows.length - 1)];
  const words = useMemo(() => tokenize(row.en), [row.en]);
  const order = useMemo(() => scramble(words, random), [words, round]); // eslint-disable-line react-hooks/exhaustive-deps
  const hintChip = state.hint !== 'none' && state.status === 'building' && used.length === 0 ? firstWordChip(words, order, used) : null;

  useEffect(() => () => voice.current.stop(), []);
  const say = (text: string) => {
    voice.current.unlock(); setSpeaking(text);
    const turn: VoiceTurn = voiceName ? { speaker: 'sara', text, voiceName } : { speaker: 'sara', text };
    void voice.current.play([turn], () => {}, () => {}).catch(() => setNotice('ما اشتغل الصوت الحين؛ اقرأ الجملة بعينك وجرّب 🔊 بعد شوي.')).finally(() => setSpeaking(s => (s === text ? null : s)));
  };
  const resetPuzzle = () => { setUsed([]); setState(initialState()); setNotice(''); setRound(r => r + 1); };
  const goRow = (i: number) => { voice.current.stop(); setRowIdx(i); resetPuzzle(); };
  const goSet = (i: number) => { voice.current.stop(); setSetIdx(i); setRowIdx(0); resetPuzzle(); };

  const pick = (wordIndex: number) => {
    if (state.status !== 'building' || used.includes(wordIndex)) return;
    const next = [...used, wordIndex];
    setUsed(next); setNotice('');
    if (next.length < words.length) return;
    const result = submit(state, next.map(i => words[i]), words);
    setState(result.state);
    if (result.outcome === 'correct') { setNotice(`👏 صح! اسمع ${teacherNameAr} وقلها ${she ? 'وراها' : 'وراه'} بصوت عالي.`); say(row.en); }
    else if (result.outcome === 'revealed') { setNotice('ولا يهمك، هذي الجملة الصحيحة. اسمعها وقلها بصوتك.'); say(row.en); }
    else {
      setUsed([]);
      if (result.state.hint === 'first-word') setNotice(`قريب! لوّنّا لك أول كلمة. باقي ${attemptsLeft(result.state)} محاولات.`);
      else { setNotice(`اسمع ${teacherNameAr} ${she ? 'تقول' : 'يقول'} الجملة، وجرّب مرة أخيرة.`); say(row.en); }
    }
  };
  const unpick = (pos: number) => { if (state.status === 'building') setUsed(u => u.filter((_, i) => i !== pos)); };
  const finished = state.status !== 'building';
  const builtText = words.join(' ');

  return (
    <div className="fixed inset-0 z-[320] bg-black/70 flex items-stretch sm:items-center justify-center p-0 sm:p-4" dir="rtl" role="dialog" aria-modal="true" aria-labelledby="psb-title" data-testid="picture-sentence-builder">
      <div className="w-full sm:max-w-2xl max-h-full overflow-y-auto sm:rounded-3xl p-3 sm:p-5 text-white" style={{ background: 'radial-gradient(circle at 50% 0%, #16245a 0%, #0A1533 60%)' }}>
        <header className="flex items-center gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <h2 id="psb-title" className="text-lg sm:text-2xl font-black text-yellow-300">🧩 ركّب الجملة مع {teacherNameAr}</h2>
            <p className="text-[12px] sm:text-sm text-white/75">شوف الصورة والمعنى، وركّب الجملة الإنجليزية من الكلمات تحت. نشاط تدريب فقط، بدون نقاط.</p>
          </div>
          <button type="button" onClick={() => { voice.current.stop(); onClose(); }} className="shrink-0 rounded-xl bg-white/10 border border-white/20 px-3 py-2 font-bold" aria-label="إغلاق ركّب الجملة">إغلاق</button>
        </header>

        <nav className="flex gap-1.5 overflow-x-auto pb-2 mb-2" aria-label="المجموعات">
          {sets.map((s, i) => (
            <button key={s.id} type="button" onClick={() => goSet(i)} aria-pressed={i === setIdx} data-testid={`psb-set-${i + 1}`}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[12px] font-black border ${i === setIdx ? 'bg-yellow-300 text-[#0A1533] border-yellow-200' : 'bg-white/5 border-white/20 text-white/85'}`}>
              {i + 1}. {s.titleAr} <span className="opacity-70">({s.words})</span>
            </button>
          ))}
        </nav>

        <ol className="flex flex-col gap-2.5" aria-label="بطاقة الجمل">
          {set.rows.map((r, i) => {
            const target = !done && i === rowIdx;
            const hidden = target && !finished;
            return (
              <li key={r.id} data-testid={`psb-row-${i + 1}`} className="relative flex items-center gap-3 rounded-2xl px-3 py-2.5 bg-[#0d1b45]/80" style={glow(i, target)}>
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-yellow-300 text-[#0A1533] font-black text-sm flex items-center justify-center shadow">{i + 1}</span>
                <span aria-hidden="true" className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/95 flex items-center justify-center text-2xl sm:text-3xl" style={{ boxShadow: `0 0 0 3px ${NEON[i % 2]}` }}>{r.emoji}</span>
                <div className="flex-1 min-w-0">
                  {hidden
                    ? <p className="text-[15px] sm:text-lg font-black text-yellow-300">🧩 ركّبها تحت…</p>
                    : <p dir="ltr" className="text-left text-[15px] sm:text-lg font-black" data-testid={`psb-row-en-${i + 1}`}>{r.en}</p>}
                  <p className="text-[12px] sm:text-sm text-white/75">{r.ar}</p>
                </div>
                {!hidden && <button type="button" onClick={() => say(r.en)} aria-label={`اسمع: ${r.en}`} className={`shrink-0 w-10 h-10 rounded-full bg-white/10 border border-white/25 ${speaking === r.en ? 'animate-pulse ring-2 ring-yellow-300' : ''}`}>🔊</button>}
              </li>
            );
          })}
        </ol>

        {done ? (
          <section className="mt-4 rounded-2xl p-4 text-center bg-[#0d1b45]" style={glow(1)} data-testid="psb-set-done">
            <p className="text-3xl">🏆</p>
            <p className="font-black text-yellow-300 text-lg">خلّصت جمل «{set.titleAr}»!</p>
            <p className="text-sm text-white/80 mb-3">اقرأ البطاقة كلها بصوتك مع {teacherNameAr}.</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <button type="button" onClick={() => goRow(0)} className="rounded-xl bg-white/10 border border-white/25 px-4 py-2 font-bold">أعد المجموعة</button>
              {setIdx + 1 < sets.length && <button type="button" onClick={() => goSet(setIdx + 1)} className="rounded-xl bg-yellow-300 text-[#0A1533] px-4 py-2 font-black">المجموعة التالية ←</button>}
            </div>
          </section>
        ) : (
          <section className="mt-4 rounded-2xl p-3 bg-[#0d1b45]" style={glow(0)} aria-label="ركّب الجملة" data-testid="psb-puzzle">
            <div className="flex items-center justify-between gap-2 mb-2 text-[12px] sm:text-sm">
              <span className="font-black text-yellow-300">الجملة {rowIdx + 1} من {set.rows.length}: {row.emoji} {row.ar}</span>
              <span data-testid="psb-attempts" className="text-white/80">{finished ? '' : `المحاولات: ${attemptsLeft(state)} من ${MAX_ATTEMPTS}`}</span>
            </div>
            <div dir="ltr" data-testid="psb-built" className="min-h-[48px] rounded-xl border-2 border-dashed border-white/25 px-2 py-2 flex flex-wrap gap-1.5 items-center">
              {finished
                ? <span className={`text-[16px] sm:text-xl font-black ${state.status === 'solved' ? 'text-emerald-300' : 'text-yellow-200'}`} data-testid="psb-answer">{builtText}</span>
                : used.length === 0
                  ? <span className="text-white/40 text-[12px] w-full text-right" dir="rtl">اضغط الكلمات بالترتيب…</span>
                  : used.map((wi, pos) => <button key={`${wi}-${pos}`} type="button" onClick={() => unpick(pos)} className="rounded-lg bg-white text-[#0A1533] px-2.5 py-1.5 text-[14px] sm:text-base font-black">{pos === 0 ? (words[wi] === 'I' ? 'I' : words[wi][0].toUpperCase() + words[wi].slice(1)) : words[wi]}</button>)}
            </div>
            {!finished && <div dir="ltr" className="mt-2 flex flex-wrap gap-1.5 justify-center" data-testid="psb-chips">
              {order.map(wi => {
                const taken = used.includes(wi);
                const lit = hintChip === wi;
                return <button key={wi} type="button" disabled={taken} onClick={() => pick(wi)} data-hint={lit ? 'first' : undefined}
                  className={`rounded-full px-3 py-1.5 text-[12px] sm:text-sm font-bold border transition ${taken ? 'opacity-25 border-white/10' : lit ? 'bg-yellow-300 text-[#0A1533] border-yellow-200 ring-2 ring-yellow-300' : 'bg-white/10 border-white/30 text-white'}`}>{chipLabel(words[wi], wi)}</button>;
              })}
            </div>}
            {notice && <p role="status" data-testid="psb-notice" className="mt-2 text-center text-[13px] sm:text-sm font-bold text-yellow-100">{notice}</p>}
            <div className="mt-2 flex flex-wrap gap-2 justify-center">
              {!finished && used.length > 0 && <button type="button" onClick={() => setUsed([])} className="rounded-xl bg-white/10 border border-white/20 px-3 py-1.5 text-sm">↺ امسح</button>}
              {!finished && state.wrong >= 2 && <button type="button" onClick={() => say(row.en)} className="rounded-xl bg-white/10 border border-white/20 px-3 py-1.5 text-sm">🔊 اسمعها مرة ثانية</button>}
              {finished && <>
                <p className="w-full text-center text-[13px] text-white/85">🎙️ دورك: قل الجملة بصوت عالي مع {teacherNameAr}.</p>
                <button type="button" onClick={() => say(row.en)} className="rounded-xl bg-white/10 border border-white/25 px-3 py-2 text-sm font-bold">🔊 سمّعني مرة ثانية</button>
                <button type="button" onClick={() => goRow(rowIdx + 1)} className="rounded-xl bg-yellow-300 text-[#0A1533] px-4 py-2 text-sm font-black">{rowIdx + 1 < set.rows.length ? 'الجملة التالية ←' : 'خلّصت البطاقة ←'}</button>
              </>}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
export default PictureSentenceBuilder;
