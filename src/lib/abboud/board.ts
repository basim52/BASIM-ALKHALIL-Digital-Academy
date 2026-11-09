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
const COLOR_MARK: Record<string, string> = { '#ef4444': '🔴', '#3b82f6': '🔵', '#facc15': '🟡', '#22c55e': '🟢' };
const NAMES: Record<string, string> = { badr: 'بدر', reem: 'ريم', sara: 'سارة', abboud: 'عبود' };
export interface AbboudBoardContent {
  lessonTitle: string; source: string; checked: boolean; correction: BoardCorrection | null;
  responses: readonly { speaker: string; text: string }[];
}
/**
 * Turns Abboud's actual explanation into Sara's board actions, drawn by Sara's own board.
 * Only what was said appears: the spoken text, the colours/numbers it contained, Reem's attempt
 * (marked unverified) or the verified correction, and the latest student replies from the board.
 */
export function abboudBoardActions({ lessonTitle, source, checked, correction, responses }: AbboudBoardContent): BoardAction[] {
  const actions: BoardAction[] = lessonTitle ? [{ kind: 'title', text: lessonTitle.slice(0, 60) }] : [];
  if (!source) return actions;
  actions.push({ kind: 'text', text: `🎙️ عبود: ${source.slice(0, 1200)}`, ar: checked ? 'ناقشه الطالبان' : 'لم يتحقق منه الطالبان بعد' });
  for (const token of boardTokens(source).filter(t => t.color || t.count).slice(0, 4)) {
    actions.push({ kind: 'arrow', from: token.text, to: token.color ? COLOR_MARK[token.color] || token.text : '●'.repeat(token.count || 0) });
  }
  if (correction) actions.push(correction.accepted
    ? { kind: 'fix', wrong: correction.incorrect, right: correction.correct }
    : { kind: 'highlight', text: `محاولة ريم — بانتظار تصحيح عبود: ${correction.incorrect}` });
  for (const reply of responses.slice(-2)) actions.push({ kind: 'highlight', text: `${NAMES[reply.speaker] || reply.speaker}: ${reply.text}`.slice(0, 300) });
  return actions;
}
export const abboudBoardCalls = (content: AbboudBoardContent) => toToolCalls(abboudBoardActions(content));
/** Stable numeric key so Sara's board redraws (write-on) exactly when the content changes. */
export function boardReplayKey(calls: unknown[]) {
  const text = JSON.stringify(calls); let hash = 7;
  for (let i = 0; i < text.length; i++) hash = (hash * 31 + text.charCodeAt(i)) | 0;
  return (hash >>> 0) || 1;
}
export function interactionError(status: number) {
  if (status === 401 || status === 403) return 'تعذّر السماح بطلب الفصل. سجّل الدخول مجدداً ثم حاول؛ كلامك محفوظ ولم يتقدّم الدرس.';
  if (status === 429) return 'وصلنا للحد المؤقت للخدمة. حاول بعد قليل؛ كلامك محفوظ ولم يتقدّم الدرس.';
  if (status === 500) return 'خادم الفصل تعذّر تشغيله. كلامك محفوظ، ولم يصل رد من الطالبين؛ جرّب لاحقاً.';
  if (status === 502) return 'وصل رد غير صالح من الذكاء الاصطناعي. لم نعتبر الشرح صحيحاً؛ كلامك محفوظ للمحاولة.';
  return 'تعذّر اتصال الذكاء الاصطناعي أو لم يصل رد صالح. لم يتقدّم الدرس ولم نعتبر الشرح صحيحاً. كلامك محفوظ للمحاولة مجدداً.';
}
