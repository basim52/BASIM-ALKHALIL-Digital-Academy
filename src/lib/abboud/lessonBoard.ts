import type { BoardAction } from '../boardActions.js';
import type { Lesson } from './curriculum.js';

/**
 * The lesson reference Sara's board shows when a lesson starts (title, words with Arabic meanings and emoji, rule,
 * examples), and which of its items Abboud has really said. Matching is whole-word, on Abboud's own text only,
 * with a small tolerance for speech-recognition slips; it records that he said an item, not that he taught it right.
 */
export type LessonItem = { key: string; en: string };
const NUMBER_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
const CONTRACTIONS: Record<string, string[]> = {
  "what's": ['what', 'is'], "it's": ['it', 'is'], "i'm": ['i', 'am'], "that's": ['that', 'is'], "he's": ['he', 'is'], "she's": ['she', 'is'], "there's": ['there', 'is']
};
/** Lower-case English word tokens; digits 0–10 become number words ("2 books" → two books), common contractions expand. */
export function englishTokens(text: string): string[] {
  const latin = text.replace(/[٠-٩]/g, d => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d))).toLowerCase().replace(/[’‘]/g, "'");
  const out: string[] = [];
  for (const raw of latin.match(/[a-z]+(?:'[a-z]+)?|\d+/g) || []) {
    if (CONTRACTIONS[raw]) out.push(...CONTRACTIONS[raw]);
    else if (/^\d+$/.test(raw)) out.push(Number(raw) <= 10 ? NUMBER_WORDS[Number(raw)] : raw);
    else out.push(raw);
  }
  return out;
}
function distance(a: string, b: string) {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let previous = row[0]; row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const current = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1));
      previous = current;
    }
  }
  return row[b.length];
}
/** Same word, a plural of it, or (for words of 5+ letters) one letter off — never a mere substring. */
export function sameWord(said: string, word: string) {
  if (said === word) return true;
  if (word.length >= 3 && (said === `${word}s` || said === `${word}es`)) return true;
  return word.length >= 5 && Math.abs(said.length - word.length) <= 1 && distance(said, word) <= 1;
}
/** The item's words appear consecutively in one utterance (long examples of 5+ words may miss one word). */
export function saysItem(utterance: string, item: string) {
  const said = englishTokens(utterance); const ref = englishTokens(item);
  if (!ref.length) return false;
  const slack = ref.length >= 5 ? 1 : 0;
  for (let start = 0; start + ref.length - slack <= said.length; start++) {
    let misses = 0;
    for (let j = 0; j < ref.length && misses <= slack; j++) if (said[start + j] === undefined || !sameWord(said[start + j], ref[j])) misses++;
    if (misses <= slack) return true;
  }
  return false;
}
export function lessonItems(lesson: Lesson): LessonItem[] {
  return [...lesson.words.map((w, i) => ({ key: `w${i}`, en: w.en })), ...lesson.examples.map((e, i) => ({ key: `e${i}`, en: e.en }))];
}
/** Keys of the lesson items found in Abboud's utterances (pass ONLY Abboud's own text, never the students'). */
export function coveredItems(lesson: Lesson, abboudSpeech: readonly string[]): string[] {
  return lessonItems(lesson).filter(item => abboudSpeech.some(text => saysItem(text, item.en))).map(item => item.key);
}
export function spokenEnglishWords(abboudSpeech: readonly string[], max = 12): string[] {
  const words: string[] = [];
  for (const text of abboudSpeech) for (const word of text.match(/[A-Za-z]+(?:['’][A-Za-z]+)?/g) || []) {
    const w = word.toLowerCase().replace('’', "'");
    if (!words.includes(w)) words.push(w);
  }
  return words.slice(0, max);
}
/** The reference section, in the same BoardAction vocabulary Sara's lessons use (title, text, example). */
export function lessonBoardActions(lesson: Lesson, lessonTitle: string, explained: readonly string[], abboudSpeech: readonly string[]): BoardAction[] {
  const title: BoardAction = { kind: 'title', text: lessonTitle.slice(0, 60) };
  const items = lessonItems(lesson);
  if (!items.length) {
    // «درس من اختياري»: no reviewed content exists, so nothing is invented — only what Abboud actually says.
    const spoken = spokenEnglishWords(abboudSpeech);
    return [title, { kind: 'text', text: '✨ درس من اختيارك: لا يوجد محتوى جاهز مُراجَع لهذا الموضوع، فتظهر هنا كلماتك أنت.' },
      ...(spoken.length ? [{ kind: 'text' as const, text: `🔤 كلمات إنجليزية قلتها: ${spoken.join(', ')}` }] : [])];
  }
  const done = new Set(explained);
  const mark = (key: string) => done.has(key) ? '✅' : '▫️';
  const count = items.filter(item => done.has(item.key)).length;
  return [
    title,
    { kind: 'text', text: `📖 ${lesson.titleEn}`, ar: `📊 شرحت ${count} من ${items.length} · ✅ = تم شرحها` },
    { kind: 'text', text: `🔤 الكلمات\n${lesson.words.map((w, i) => `${mark(`w${i}`)} ${w.emoji} ${w.en} — ${w.ar}`).join('\n')}` },
    { kind: 'text', text: `📏 القاعدة: ${lesson.ruleAr}` },
    ...lesson.examples.map((e, i) => ({ kind: 'example' as const, en: `${done.has(`e${i}`) ? '✅ ' : ''}${e.en}`, ar: e.ar }))
  ];
}
