import React, { useMemo, useState } from 'react';
import { BidiText } from './BidiText';
import { SpellingItem, spellingFeedback } from '../lib/spelling';

/** «أكمل الكلمة» — tap letter tiles (or type) to fill the missing letters; Arabic meaning in small text; on a wrong answer explain the error + tip, then retry or continue. */
export const SpellingExercise: React.FC<{ item: SpellingItem; onDone: (firstTry: boolean) => void; speak?: (word: string) => void; kids?: boolean }> = ({ item, onDone, speak, kids }) => {
  const n = item.blanks.length;
  const [filled, setFilled] = useState<string[]>(() => Array(n).fill(''));
  const [res, setRes] = useState<null | ReturnType<typeof spellingFeedback>>(null);
  const [tries, setTries] = useState(0);
  const w = item.word;
  const put = (ch: string) => { if (res) return; setFilled(prev => { const k = prev.findIndex(x => !x); if (k < 0) return prev; const f = [...prev]; f[k] = ch.toLowerCase(); return f; }); };
  const clear = (k: number) => { if (res) return; setFilled(prev => { const f = [...prev]; f[k] = ''; return f; }); };
  const check = () => { const r = spellingFeedback(item, filled); setRes(r); setTries(t => t + 1); if (r.ok) speak?.(w); };
  const retry = () => { setFilled(Array(n).fill('')); setRes(null); };

  const masked = useMemo(() => w.split('').map((c, i) => (item.blanks.includes(i) ? '_' : c)).join(''), [w, item.blanks]);
  const sentenceParts = useMemo(() => {
    if (!item.sentence) return null;
    const m = new RegExp(`\\b${w}\\b`, 'i').exec(item.sentence); if (!m) return null;
    return [item.sentence.slice(0, m.index), item.sentence.slice(m.index + w.length)];
  }, [item.sentence, w]);

  const word = (
    <span className="inline-flex flex-col items-center align-top mx-0.5">
      <span className="inline-flex gap-0.5" dir="ltr">
        {w.split('').map((c, i) => {
          const k = item.blanks.indexOf(i);
          if (k < 0) return <span key={i} className="font-black text-[#002147]">{c}</span>;
          const bad = res && res.wrong.some(x => x.pos === i);
          return <button key={i} onClick={() => clear(k)} aria-label={`حرف ناقص ${k + 1}`}
            className={`min-w-[22px] h-7 px-0.5 rounded-md border-b-[3px] font-black text-center ${res ? (bad ? 'bg-rose-100 border-rose-500 text-rose-700' : 'bg-emerald-100 border-emerald-500 text-emerald-700') : filled[k] ? 'bg-[#fdfaf3] border-[#C49E3A] text-[#002147]' : 'bg-white border-[#C49E3A] text-slate-300'}`}>{filled[k] || '_'}</button>;
        })}
      </span>
      <span dir="rtl" className="text-[10px] font-bold text-slate-500 mt-0.5 leading-none">{item.ar}</span>
    </span>
  );

  return (
    <div className="space-y-2" dir="rtl">
      <p className="text-[13px] font-black text-slate-800"><BidiText text={`أكمل الحروف الناقصة: ${masked}`} /></p>
      <div dir="ltr" className={`rounded-2xl bg-[#fdfaf3] border border-[#C49E3A]/40 px-3 py-2 text-[#002147] font-bold leading-[2.2] ${kids ? 'text-[19px]' : 'text-[16px]'}`}>
        {sentenceParts ? <>{sentenceParts[0]}{word}{sentenceParts[1]}</> : word}
      </div>
      {!res && <>
        <div className="flex flex-wrap justify-center gap-1.5" dir="ltr">
          {item.tiles.map((t, i) => <button key={i} onClick={() => put(t)} className={`${kids ? 'w-12 h-12 text-[20px]' : 'w-10 h-10 text-[17px]'} rounded-xl bg-[#002147] text-[#C49E3A] font-black shadow active:scale-95`}>{t}</button>)}
        </div>
        <div className="flex gap-1.5 items-center">
          <input dir="ltr" inputMode="text" autoCapitalize="none" autoCorrect="off" spellCheck={false} maxLength={n} placeholder="أو اكتب الحروف"
            value={filled.join('')} onChange={e => { const v = e.target.value.replace(/[^a-z]/gi, '').toLowerCase().slice(0, n); setFilled(Array.from({ length: n }, (_, k) => v[k] || '')); }}
            className="flex-1 min-w-0 h-9 rounded-xl border-2 border-slate-200 px-2 text-[14px] font-bold text-[#002147]" />
          <button disabled={filled.some(x => !x)} onClick={check} className="h-9 px-4 rounded-xl bg-[#C49E3A] text-[#002147] font-black text-[13px] disabled:opacity-40">تحقّق</button>
        </div>
      </>}
      {res && (res.ok ? (
        <div className="rounded-xl bg-emerald-50 border border-emerald-300 p-2 text-[13px] font-bold text-emerald-800">
          ✅ صح! <span dir="ltr" className="font-black">{w}</span> = {item.ar}
          <button onClick={() => onDone(tries === 1)} className="block w-full mt-2 h-9 rounded-xl bg-[#002147] text-white font-black">التالي ←</button>
        </div>
      ) : (
        <div className="rounded-xl bg-rose-50 border border-rose-300 p-2 text-[12.5px] font-bold text-slate-800 space-y-1">
          <p>❌ الكتابة الصحيحة: <span dir="ltr" className="font-black text-[15px]">{w.split('').map((c, i) => <span key={i} className={item.blanks.includes(i) ? 'text-[#C49E3A] underline decoration-2' : 'text-[#002147]'}>{c}</span>)}</span> ({item.ar})</p>
          {res.wrong.map(x => <p key={x.pos}>• الحرف رقم {x.pos + 1}: كتبت «<span dir="ltr">{x.got || '—'}</span>» والصحيح «<span dir="ltr" className="text-[#C49E3A] font-black">{x.want}</span>»</p>)}
          {res.tips.map((t, i) => <p key={i} className="text-[#002147]">💡 <BidiText text={t} /></p>)}
          <div className="flex gap-1.5 pt-1">
            <button onClick={retry} className="flex-1 h-9 rounded-xl bg-[#C49E3A] text-[#002147] font-black">حاول مرة ثانية</button>
            <button onClick={() => onDone(false)} className="flex-1 h-9 rounded-xl bg-[#002147] text-white font-black">كمّل</button>
          </div>
        </div>
      ))}
    </div>
  );
};
