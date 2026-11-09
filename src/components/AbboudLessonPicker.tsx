import React from 'react';
import { CUSTOM_LESSON_ID, LAST_LESSON_ID, SESSIONS_CONFIG, type Lesson } from '../lib/abboud/curriculum';

const groups: { id: Lesson['group']; label: string }[] = [{ id: 'basics', label: 'الأساسيات' }, { id: 'topics', label: 'مواضيع جديدة' }];
const CUSTOM_LABEL = '✨ درس من اختياري';
/** 15 short lessons + «درس من اختياري»: a grouped native select on phones, one scrollable chip row on wider screens. */
export default function AbboudLessonPicker({ lessonId, completed, stars, certificate, onPick, onCertificate }: {
  lessonId: number; completed: readonly number[]; stars: number; certificate: boolean;
  onPick: (id: number) => void; onCertificate: () => void;
}) {
  const label = (s: Lesson) => `${s.emoji} ${s.titleAr}${completed.includes(s.id) ? ' ✓' : ''}`;
  const done = SESSIONS_CONFIG.filter(s => completed.includes(s.id)).length;
  return <nav aria-label="الدروس القصيرة" className="abboud-lessons">
    <label className="abboud-lesson-select text-sm sm:hidden">الدرس <select aria-label="اختر الدرس القصير" value={lessonId} onChange={e => onPick(Number(e.target.value))} className="mr-2 min-w-0 max-w-full rounded-xl border bg-white p-2">
      {groups.map(g => <optgroup key={g.id} label={g.label}>{SESSIONS_CONFIG.filter(s => s.group === g.id).map(s => <option key={s.id} value={s.id}>{label(s)}</option>)}</optgroup>)}
      <optgroup label="من اختيارك"><option value={CUSTOM_LESSON_ID}>{CUSTOM_LABEL}</option></optgroup>
    </select></label>
    <div className="abboud-lesson-chips hidden gap-2 sm:flex" role="group" aria-label="اختيار الدرس">
      {SESSIONS_CONFIG.map(s => <button type="button" key={s.id} onClick={() => onPick(s.id)} aria-pressed={lessonId === s.id} className={`rounded-xl px-3 py-2 text-sm ${lessonId === s.id ? 'bg-indigo-700 text-white' : 'bg-white'}`}>{label(s)}</button>)}
      <button type="button" onClick={() => onPick(CUSTOM_LESSON_ID)} aria-pressed={lessonId === CUSTOM_LESSON_ID} className={`rounded-xl border-2 border-dashed border-amber-400 px-3 py-2 text-sm ${lessonId === CUSTOM_LESSON_ID ? 'bg-amber-200' : 'bg-amber-50'}`}>{CUSTOM_LABEL}</button>
    </div>
    <p className="abboud-lesson-progress" data-testid="abboud-progress" aria-label={`أكملت ${done} من ${LAST_LESSON_ID} درساً، ولديك ${stars} نجمة معلّم`}>
      <span>📗 {done}/{LAST_LESSON_ID}</span><span data-testid="abboud-stars">⭐ {stars}</span>
      {certificate && <button type="button" onClick={onCertificate} className="rounded-lg bg-amber-400 px-2 py-1 font-bold text-slate-900">🎓 الشهادة</button>}
    </p>
  </nav>;
}
