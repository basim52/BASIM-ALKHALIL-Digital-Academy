import React, { useEffect, useState } from 'react';
import { boardTokens, classroomBoard, type BoardCorrection } from '../lib/abboud/board';
import type { BoardFocus, Message } from '../lib/abboud/protocol';

export default function AbboudClassroomBoard({ source, checked, correction, responses, responseFocus, busy, onAsk, onRead }: {
  source: string; checked: boolean; correction: BoardCorrection | null; responses: Message[]; responseFocus: string; busy: boolean;
  onAsk: (focus: BoardFocus) => void; onRead: (text: string) => void;
}) {
  const [selected, setSelected] = useState('');
  useEffect(() => { setSelected(''); }, [source, correction?.incorrect]);
  const tokens = boardTokens(source);
  const calls = classroomBoard(source, correction);
  return <section aria-label="السبورة التفاعلية" data-testid="abboud-interactive-board" data-board-size="large" className="abboud-board rounded-xl border-4 border-amber-800 bg-emerald-950 text-white" dir="rtl">
    <h3 className="abboud-board-title text-center font-bold">سبورة عبود التفاعلية</h3>
    <div className="abboud-board-body" tabIndex={0} aria-label="محتوى سبورة عبود">
    {!source && <p className="mt-2 text-center text-sm text-emerald-100">اشرح بصوتك؛ هنا تظهر كلماتك وألوانك وأعدادك، ثم اضغط ما تريد مناقشته مع الطالبين.</p>}
    {source && <>
      <p className="mt-2 text-xs text-emerald-100">كلام عبود كما ورد · {checked ? 'ناقشه الطالبان' : 'لم يتحقق منه الطالبان بعد'}</p>
      {calls.map((call, i) => {
        if (call.tool === 'drawBoardText') return <button key={i} type="button" dir="auto" onClick={() => setSelected(source.slice(0, 200))} aria-pressed={selected === source.slice(0, 200)} className="abboud-board-source mt-2 w-full rounded-lg border border-white/30 break-words p-3 text-start focus:outline-amber-300">{call.payload.content}</button>;
        if (call.tool === 'highlightError') return <div key={i} className="mt-3 rounded-lg bg-white/10 p-3"><p className="text-xs">التصحيح الذي تحقّقنا منه بعد شرح عبود:</p><del dir="auto" className="text-rose-200">{call.payload.incorrectSnippet}</del><span aria-hidden="true"> ← </span><ins dir="auto" className="text-emerald-200">{call.payload.correctedSnippet}</ins></div>;
        if (call.tool === 'addNote') return <div key={i} className="mt-3 rounded-lg border border-amber-300 p-2"><p className="text-xs text-amber-100">محاولة ريم — بانتظار تصحيح عبود، وليست إجابة صحيحة:</p><p dir="auto">{call.payload.content}</p></div>;
        return null;
      })}
      <div className="mt-3 flex flex-wrap justify-center gap-2" aria-label="كلمات من شرح عبود">
        {tokens.map(token => <button type="button" key={token.text} aria-pressed={selected === token.text} onClick={() => setSelected(token.text)} className={`rounded-lg border px-3 py-2 text-sm ${selected === token.text ? 'border-amber-300 bg-white/20 ring-2 ring-amber-300' : 'border-white/25 bg-white/5'}`}>
          <span dir="auto">{token.text}</span>
          {token.color && <span aria-label={`لون ${token.text}`} style={{ backgroundColor: token.color }} className="mr-2 inline-block h-4 w-4 rounded-full border border-white" />}
          {token.count && <span aria-label={`عدد ${token.count}`} className="mt-1 block text-amber-200" dir="ltr">{'●'.repeat(token.count)}</span>}
        </button>)}
      </div>
      {selected && <div className="mt-3 rounded-xl bg-black/20 p-3">
        <p className="text-sm">المحدّد: <b dir="auto">{selected}</b></p>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          <button type="button" disabled={busy} onClick={() => onRead(selected)} className="rounded-lg border px-3 py-2 disabled:opacity-40">🔊 اقرأ المحدّد</button>
          <button type="button" disabled={busy} onClick={() => onAsk({ text: selected, speaker: 'badr' })} className="rounded-lg bg-indigo-600 px-3 py-2 disabled:opacity-40">بدر، طبّق هذا</button>
          <button type="button" disabled={busy} onClick={() => onAsk({ text: selected, speaker: 'reem' })} className="rounded-lg bg-violet-600 px-3 py-2 disabled:opacity-40">ريم، طبّقي هذا</button>
        </div><p className="mt-2 text-xs text-emerald-100">القراءة تكرر المكتوب فقط، وليست تصحيحاً. إجابة الطالب تُطلب من الذكاء الاصطناعي ولا تنهي الدرس أو تمنح نقاطاً.</p>
      </div>}
    </>}
    {responses.length > 0 && <div role="log" aria-label="إجابات السبورة" className="mt-3 space-y-2"><p className="text-xs text-emerald-100">آخر إجابة عن: <span dir="auto">{responseFocus}</span></p>{responses.map((m, i) => <p key={i} dir="auto" className="rounded-lg bg-white/10 p-2 text-sm"><b>{m.speaker === 'badr' ? 'بدر' : m.speaker === 'reem' ? 'ريم' : 'سارة'}: </b>{m.text}</p>)}</div>}
    </div>
  </section>;
}
