import { toToolCalls, type BoardAction } from '../boardActions.js';
import type { Reply } from './protocol.js';

const COLORS: Record<string, string> = { red: '#ef4444', blue: '#3b82f6', yellow: '#facc15', green: '#22c55e', أحمر: '#ef4444', أزرق: '#3b82f6', أصفر: '#facc15', أخضر: '#22c55e', احمر: '#ef4444', ازرق: '#3b82f6', اصفر: '#facc15', اخضر: '#22c55e' };
const ARABIC_NUMBERS: Record<string, number> = { واحد: 1, اثنان: 2, اثنين: 2, ثلاثة: 3, ثلاثه: 3, أربعة: 4, اربعة: 4, خمسة: 5, خمسه: 5, ستة: 6, سته: 6, سبعة: 7, سبعه: 7, ثمانية: 8, ثمانيه: 8, تسعة: 9, تسعه: 9, عشرة: 10, عشره: 10 };
const NUMBERS = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
export type BoardToken = { text: string; color?: string; count?: number };
export type BoardCorrection = NonNullable<Reply['misconception']> & { accepted: boolean };
export function boardTokens(text: string): BoardToken[] {
  const tokens = [...new Set(text.match(/[\p{L}\p{N}]+(?:['’][\p{L}]+)?/gu) || [])].slice(0, 20);
  return tokens.map(text => {
    const lower = text.toLowerCase();
    const normalized = text.replace(/[٠-٩]/g, n => String('٠١٢٣٤٥٦٧٨٩'.indexOf(n)));
    const color = Object.hasOwn(COLORS, lower) ? COLORS[lower] : undefined;
    const number = NUMBERS.indexOf(lower) + 1 || (Object.hasOwn(ARABIC_NUMBERS, lower) ? ARABIC_NUMBERS[lower] : 0) || Number(normalized);
    return { text, ...(color ? { color } : {}), ...(Number.isInteger(number) && number >= 1 && number <= 10 ? { count: number } : {}) };
  });
}
/** Reuse Sara's small structured board-action vocabulary, not its heavy drawing/editor bundle. */
export function classroomBoard(source: string, correction: BoardCorrection | null) {
  const actions: BoardAction[] = source ? [{ kind: 'text', text: source.slice(0, 1200) }] : [];
  if (correction) actions.push(correction.accepted
    ? { kind: 'fix', wrong: correction.incorrect, right: correction.correct }
    : { kind: 'highlight', text: correction.incorrect });
  return toToolCalls(actions);
}
export function interactionError(status: number) {
  if (status === 401 || status === 403) return 'تعذّر السماح بطلب الفصل. سجّل الدخول مجدداً ثم حاول؛ كلامك محفوظ ولم يتقدّم الدرس.';
  if (status === 429) return 'وصلنا للحد المؤقت للخدمة. حاول بعد قليل؛ كلامك محفوظ ولم يتقدّم الدرس.';
  if (status === 500) return 'خادم الفصل تعذّر تشغيله. كلامك محفوظ، ولم يصل رد من الطالبين؛ جرّب لاحقاً.';
  if (status === 502) return 'وصل رد غير صالح من الذكاء الاصطناعي. لم نعتبر الشرح صحيحاً؛ كلامك محفوظ للمحاولة.';
  return 'تعذّر اتصال الذكاء الاصطناعي أو لم يصل رد صالح. لم يتقدّم الدرس ولم نعتبر الشرح صحيحاً. كلامك محفوظ للمحاولة مجدداً.';
}
