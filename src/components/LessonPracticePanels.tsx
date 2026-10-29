import { BidiText } from './BidiText';
import React, { useMemo, useState } from 'react';
import { Volume2, RotateCcw, CheckCircle2, XCircle } from 'lucide-react';
import type { SaraBoardExercise, SaraBoardQuestion } from '../types';
import SpeakingDrillCheck from './SpeakingDrillCheck';
import { normalizeSpoken, checkSpokenAnswer } from '../utils/speechAnswerCheck';

type Speak = (text: string, onEnd?: () => void) => void;
const card = 'p-3 rounded-2xl bg-black/40 border border-white/10 space-y-2';

/** Multiple-choice item, graded ONLY by correctIndex (never by comparing option text to `answer`). */
const MCItem: React.FC<{ prompt: string; sub?: string; options: string[]; correctIndex: number; explanationAr: string }> = ({ prompt, sub, options, correctIndex, explanationAr }) => {
  const [sel, setSel] = useState<number | null>(null);
  return (
    <div className={card}>
      <p className="text-xs sm:text-sm font-black text-white"><BidiText text={prompt} /></p>
      {sub && <p className="text-[11px] text-slate-300" dir="ltr">{sub}</p>}
      <div className="flex flex-wrap gap-1.5">
        {options.map((o, i) => {
          const picked = sel === i, right = i === correctIndex;
          const cls = sel === null ? 'bg-white/10 hover:bg-white/20 text-white' : right ? 'bg-emerald-500/30 text-emerald-100 border-emerald-400' : picked ? 'bg-rose-500/30 text-rose-100 border-rose-400' : 'bg-white/5 text-slate-400';
          return <button key={i} disabled={sel !== null} onClick={() => setSel(i)} className={`px-2.5 py-1 rounded-lg border border-white/10 text-xs font-bold cursor-pointer ${cls}`}>{o}</button>;
        })}
      </div>
      {sel !== null && (
        <div className="flex items-start gap-1.5 text-[11px]">
          {sel === correctIndex ? <CheckCircle2 size={13} className="text-emerald-300 shrink-0" /> : <XCircle size={13} className="text-rose-300 shrink-0" />}
          <span className="text-slate-200">{sel === correctIndex ? 'صح! ' : `الإجابة الصحيحة: ${options[correctIndex]}. `}{explanationAr}</span>
          <button onClick={() => setSel(null)} className="ms-auto text-slate-300 hover:text-white cursor-pointer"><RotateCcw size={12} /></button>
        </div>
      )}
    </div>
  );
};

/** Order-the-words item with tappable word chips. */
const OrderItem: React.FC<{ ex: SaraBoardExercise }> = ({ ex }) => {
  const pool = useMemo(() => {
    const raw = ex.promptEn.replace(/^Put the words in order:\s*/i, '');
    return raw.split(' / ').map((w, i) => ({ w, i }));
  }, [ex.promptEn]);
  const [picked, setPicked] = useState<number[]>([]);
  const [checked, setChecked] = useState<boolean | null>(null);
  const built = picked.map(i => pool[i].w).join(' ');
  const check = () => setChecked(normalizeSpoken(built).join(' ') === normalizeSpoken(ex.answer).join(' '));
  return (
    <div className={card}>
      <p className="text-xs sm:text-sm font-black text-white"><BidiText text={ex.promptAr} /></p>
      <div className="min-h-[34px] p-2 rounded-xl bg-white/5 border border-dashed border-white/20 flex flex-wrap gap-1.5" dir="ltr">
        {picked.map((i, k) => (
          <button key={k} onClick={() => { setPicked(p => p.filter((_, j) => j !== k)); setChecked(null); }} className="px-2 py-1 rounded-lg bg-amber-400 text-slate-950 text-xs font-black cursor-pointer">{pool[i].w}</button>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5" dir="ltr">
        {pool.map(({ w, i }) => picked.includes(i) ? null : (
          <button key={i} onClick={() => { setPicked(p => [...p, i]); setChecked(null); }} className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold cursor-pointer">{w}</button>
        ))}
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <button disabled={picked.length !== pool.length} onClick={check} className="px-3 py-1 rounded-lg bg-emerald-500 disabled:opacity-40 text-slate-950 text-xs font-black cursor-pointer">تحقّق</button>
        <button onClick={() => { setPicked([]); setChecked(null); }} className="px-2 py-1 rounded-lg bg-white/10 text-white text-xs cursor-pointer flex items-center gap-1"><RotateCcw size={11} />إعادة</button>
        {checked !== null && <span className={`text-[11px] font-bold ${checked ? 'text-emerald-300' : 'text-rose-300'}`}>{checked ? 'ممتاز! ترتيب صحيح ✅' : `غير صحيح. ${ex.explanationAr}`}</span>}
      </div>
    </div>
  );
};

/** Translate item: typed answer compared at word level with the model translation. */
const TranslateItem: React.FC<{ ex: SaraBoardExercise }> = ({ ex }) => {
  const [txt, setTxt] = useState('');
  const [res, setRes] = useState<null | { ok: boolean; pct: number }>(null);
  return (
    <div className={card}>
      <p className="text-xs sm:text-sm font-black text-white"><BidiText text={ex.promptAr} /></p>
      <input dir="ltr" value={txt} onChange={e => { setTxt(e.target.value); setRes(null); }} placeholder="Type in English…" className="w-full px-2.5 py-1.5 rounded-lg bg-white/10 border border-white/15 text-white text-xs" />
      <div className="flex items-center gap-2 flex-wrap">
        <button disabled={!txt.trim()} onClick={() => { const r = checkSpokenAnswer(txt, ex.answer, 0.8); setRes({ ok: r.passed, pct: Math.round(r.score * 100) }); }} className="px-3 py-1 rounded-lg bg-emerald-500 disabled:opacity-40 text-slate-950 text-xs font-black cursor-pointer">تحقّق</button>
        {res && <span className={`text-[11px] font-bold ${res.ok ? 'text-emerald-300' : 'text-rose-300'}`}>{res.ok ? `صح (${res.pct}٪) ✅` : `قريبة (${res.pct}٪).`} الترجمة المقترحة: <span dir="ltr">{ex.answer}</span></span>}
      </div>
    </div>
  );
};

export const LessonExercisesPanel: React.FC<{ exercises?: { easy: SaraBoardExercise[]; medium: SaraBoardExercise[]; hard: SaraBoardExercise[] }; review?: SaraBoardQuestion[] }> = ({ exercises, review }) => {
  const tiers = [
    { k: 'easy', label: 'سهل', items: Array.isArray(exercises?.easy) ? exercises!.easy : [] },
    { k: 'medium', label: 'متوسط', items: Array.isArray(exercises?.medium) ? exercises!.medium : [] },
    { k: 'hard', label: 'صعب', items: Array.isArray(exercises?.hard) ? exercises!.hard : [] },
    { k: 'review', label: 'مراجعة', items: [] as SaraBoardExercise[] },
  ].filter(t => t.k === 'review' ? Array.isArray(review) && review.length > 0 : t.items.length > 0);
  const [tab, setTab] = useState(tiers[0]?.k || 'easy');
  if (tiers.length === 0) return null;
  const cur = tiers.find(t => t.k === tab) || tiers[0];
  return (
    <div className="space-y-2" dir="rtl">
      <div className="flex gap-1.5 flex-wrap">
        {tiers.map(t => (
          <button key={t.k} onClick={() => setTab(t.k)} className={`px-3 py-1 rounded-full text-xs font-black cursor-pointer ${cur.k === t.k ? 'bg-amber-400 text-slate-950' : 'bg-white/10 text-white'}`}>{t.label}</button>
        ))}
      </div>
      {cur.k === 'review'
        ? review!.map((q, i) => <MCItem key={`r${i}`} prompt={q.questionAr} options={Array.isArray(q.options) ? q.options : []} correctIndex={q.correctIndex} explanationAr={q.explanationAr} />)
        : cur.items.map(ex => {
            if (ex.type === 'order') return <OrderItem key={ex.id} ex={ex} />;
            if (ex.type === 'translate') return <TranslateItem key={ex.id} ex={ex} />;
            if (Array.isArray(ex.options) && typeof ex.correctIndex === 'number') {
              return <MCItem key={ex.id} prompt={ex.promptAr} sub={ex.type === 'gap' ? ex.promptEn : undefined} options={ex.options} correctIndex={ex.correctIndex} explanationAr={ex.explanationAr} />;
            }
            return null;
          })}
    </div>
  );
};

export const ListeningPanel: React.FC<{ task?: { instructionsAr: string; script: string; questions: SaraBoardQuestion[] }; onSpeak: Speak }> = ({ task, onSpeak }) => {
  const [played, setPlayed] = useState(false);
  const [showScript, setShowScript] = useState(false);
  if (!task || !Array.isArray(task.questions) || task.questions.length === 0) return null;
  const spoken = task.script.split('\n').map(l => l.replace(/^[^:]{1,20}:\s*/, '')).join(' ');
  return (
    <div className={card} dir="rtl">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className="text-xs font-black text-sky-200">🎧 الاستماع: {task.instructionsAr}</span>
        <div className="flex gap-1.5">
          <button onClick={() => { onSpeak(spoken); setPlayed(true); }} className="px-3 py-1 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-black flex items-center gap-1 cursor-pointer"><Volume2 size={12} />{played ? 'إعادة الاستماع' : 'استمع للحوار'}</button>
          <button onClick={() => setShowScript(s => !s)} className="px-2 py-1 rounded-lg bg-white/10 text-white text-[11px] cursor-pointer">{showScript ? 'إخفاء النص' : 'عرض النص'}</button>
        </div>
      </div>
      {showScript && <pre className="whitespace-pre-wrap text-[11px] text-slate-200 bg-white/5 p-2 rounded-lg" dir="ltr">{task.script}</pre>}
      {task.questions.map((q, i) => <MCItem key={i} prompt={`${q.questionAr}`} sub={q.questionEn} options={Array.isArray(q.options) ? q.options : []} correctIndex={q.correctIndex} explanationAr={q.explanationAr} />)}
    </div>
  );
};

/** Self-managed mic check (attempt counting kept locally). */
export const MicCheck: React.FC<{ expected: string; isRtl: boolean }> = ({ expected, isRtl }) => {
  const [attempts, setAttempts] = useState(0);
  const [passed, setPassed] = useState(false);
  return <SpeakingDrillCheck expected={expected} isRtl={isRtl} attempts={attempts} passed={passed} maxAttemptsBeforeSkip={99} onResult={ok => { setAttempts(n => n + 1); if (ok) setPassed(true); }} />;
};

const stripIpa = (s: string) => s.replace(/\/[^/]*\//g, ' ').replace(/[→↗↘=]/g, ' ').replace(/\s+/g, ' ').trim();

export const PronunciationPanel: React.FC<{ focus?: { focus: string; items: string[]; tipAr: string }; onSpeak: Speak; isRtl: boolean }> = ({ focus, onSpeak, isRtl }) => {
  const [micFor, setMicFor] = useState<number | null>(null);
  if (!focus || !Array.isArray(focus.items) || focus.items.length === 0) return null;
  return (
    <div className={card} dir="rtl">
      <span className="text-xs font-black text-fuchsia-200">🔊 النطق: <span dir="ltr">{focus.focus}</span></span>
      <p className="text-[11px] text-slate-300">{focus.tipAr}</p>
      {focus.items.map((item, i) => {
        const parts = item.split(/\s+[–-]\s+/); // minimal pairs "a – b"
        return (
          <div key={i} className="p-2 rounded-xl bg-white/5 space-y-1">
            <div className="flex flex-wrap items-center gap-1.5" dir="ltr">
              {parts.map((p, k) => (
                <button key={k} onClick={() => onSpeak(stripIpa(p))} className="px-2 py-1 rounded-lg bg-fuchsia-500/20 hover:bg-fuchsia-500/40 text-fuchsia-100 text-xs font-bold flex items-center gap-1 cursor-pointer"><Volume2 size={11} />{p}</button>
              ))}
              <button onClick={() => setMicFor(micFor === i ? null : i)} className="ms-auto px-2 py-1 rounded-lg bg-white/10 text-white text-[11px] cursor-pointer">🎙️ جرّب نطقك</button>
            </div>
            {micFor === i && <MicCheck expected={stripIpa(item)} isRtl={isRtl} />}
          </div>
        );
      })}
    </div>
  );
};
