import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { abboudBoardCalls, boardReplayKey, boardTokens, type BoardCorrection } from '../lib/abboud/board';
import type { BoardFocus, Message } from '../lib/abboud/protocol';

/** Sara's own interactive board (same chunk Sara's class already loads); Abboud only feeds it actions. */
const SaraBoard = lazy(() => import('./TutorTldrawBoard'));

/** A failed chunk download must not take the classroom (students, mic, typing) down with it. */
class BoardLoadBoundary extends React.Component<{ children: React.ReactNode }, { failed: boolean; attempt: number }> {
  state = { failed: false, attempt: 0 };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (!this.state.failed) return <React.Fragment key={this.state.attempt}>{this.props.children}</React.Fragment>;
    return <div role="alert" className="abboud-board-fallback">
      <p>تعذّر تحميل سبورة سارة التفاعلية. الفصل والميكروفون يعملان، وكلامك ظاهر أدناه.</p>
      <button type="button" onClick={() => this.setState(s => ({ failed: false, attempt: s.attempt + 1 }))} className="rounded-lg bg-amber-400 px-3 py-2 font-bold text-slate-900">إعادة تحميل السبورة</button>
    </div>;
  }
}

export default function AbboudClassroomBoard({ lessonTitle, source, checked, correction, responses, responseFocus, busy, saraSpeaking, expanded, onExpandedChange, onAsk, onRead }: {
  lessonTitle: string; source: string; checked: boolean; correction: BoardCorrection | null; responses: Message[]; responseFocus: string; busy: boolean;
  saraSpeaking: boolean; expanded: boolean; onExpandedChange: (next: boolean) => void;
  onAsk: (focus: BoardFocus) => void; onRead: (text: string) => void;
}) {
  const [selected, setSelected] = useState('');
  useEffect(() => { setSelected(''); }, [source, correction?.incorrect]);
  const tokens = boardTokens(source);
  const calls = useMemo(() => abboudBoardCalls({ lessonTitle, source, checked, correction, responses }), [lessonTitle, source, checked, correction, responses]);
  return <section aria-label="السبورة التفاعلية" data-testid="abboud-interactive-board" data-board="sara" className="abboud-board" dir="rtl">
    <div className="abboud-board-surface">
      <BoardLoadBoundary>
        <Suspense fallback={<div className="abboud-board-fallback">جاري فتح السبورة…</div>}>
          <SaraBoard calls={calls} personaId="sara" lessonTitle={lessonTitle} speaking={saraSpeaking} replayKey={boardReplayKey(calls)}
            expanded={expanded} onExpandedChange={onExpandedChange} onSpeak={source ? () => onRead(source) : undefined} />
        </Suspense>
      </BoardLoadBoundary>
    </div>
    <div className="abboud-board-picks" tabIndex={0} aria-label="اختيارات من شرح عبود لبدر وريم">
      {!source && <p className="text-center text-sm">اشرح بصوتك؛ تظهر كلماتك وألوانك وأعدادك على سبورة سارة، ثم اختر منها ما يطبّقه بدر أو ريم.</p>}
      {source && <>
        <p className="text-xs">كلام عبود كما ورد · {checked ? 'ناقشه الطالبان' : 'لم يتحقق منه الطالبان بعد'}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-2" aria-label="كلمات من شرح عبود">
          {tokens.map(token => <button type="button" key={token.text} aria-pressed={selected === token.text} onClick={() => setSelected(token.text)} className={`rounded-lg border px-3 py-2 text-sm ${selected === token.text ? 'border-amber-500 bg-amber-100 ring-2 ring-amber-400' : 'border-slate-300 bg-white'}`}>
            <span dir="auto">{token.text}</span>
            {token.color && <span aria-label={`لون ${token.text}`} style={{ backgroundColor: token.color }} className="mr-2 inline-block h-4 w-4 rounded-full border border-slate-400" />}
            {token.count && <span aria-label={`عدد ${token.count}`} className="mt-1 block text-amber-700" dir="ltr">{'●'.repeat(token.count)}</span>}
          </button>)}
        </div>
        {selected && <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm">المحدّد: <b dir="auto">{selected}</b></span>
          <button type="button" disabled={busy} onClick={() => onRead(selected)} className="rounded-lg border px-3 py-2 disabled:opacity-40">🔊 اقرأ المحدّد</button>
          <button type="button" disabled={busy} onClick={() => onAsk({ text: selected, speaker: 'badr' })} className="rounded-lg bg-indigo-600 px-3 py-2 text-white disabled:opacity-40">بدر، طبّق هذا</button>
          <button type="button" disabled={busy} onClick={() => onAsk({ text: selected, speaker: 'reem' })} className="rounded-lg bg-violet-600 px-3 py-2 text-white disabled:opacity-40">ريم، طبّقي هذا</button>
        </div>}
        {responses.length > 0 && <div role="log" aria-label="إجابات السبورة" className="mt-2 text-sm"><span className="text-xs">آخر إجابة عن: <span dir="auto">{responseFocus}</span> — </span>{responses.map((m, i) => <span key={i} dir="auto"><b>{m.speaker === 'badr' ? 'بدر' : m.speaker === 'reem' ? 'ريم' : 'سارة'}: </b>{m.text} </span>)}</div>}
      </>}
    </div>
  </section>;
}
