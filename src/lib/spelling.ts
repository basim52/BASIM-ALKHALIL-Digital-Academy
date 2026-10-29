import { VISUAL_DICTIONARY } from '../data/visualDictionary';
import LEXICON from '../data/spellingLexicon.json';

/** One «complete the spelling» item: a word from the lesson with 1–3 missing letters, its real Arabic meaning, and the lesson sentence it sits in. */
export interface SpellingItem {
  word: string;
  ar: string;
  /** Sentence that contains the word (from the lesson / dictionary data); '' → the word is shown alone. */
  sentence: string;
  /** Indexes of the hidden letters inside `word` (never 0). */
  blanks: number[];
  /** Letter tiles: the missing letters + distractors, deterministic order. */
  tiles: string[];
}

type Ex = { en: string; ar: string };
type LessonLike = { id: string; levelId?: string; content?: { example: Ex[] } | null; kids?: { cards: { en: string; ar: string }[] } };

const isWord = (w: string) => /^[a-z]{3,12}$/i.test(w);
const hasArabic = (s: string) => /[\u0600-\u06FF]/.test(s);
const hash = (s: string) => { let h = 2166136261; for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0; return h; };
const STOP = new Set('the and you are was were this that with have has had for not but his her its our they them she him what when where who your from there their will would can could did does been into than then very just also some'.split(' '));

let dict: Map<string, { ar: string; sentence: string }> | null = null;
const dictionary = () => {
  if (dict) return dict;
  dict = new Map();
  // word → Arabic meaning that already exists in the lesson data (scripts/build-spelling-lexicon.ts), sentence from the visual dictionary when it has one
  for (const [w, ar] of Object.entries(LEXICON as Record<string, string>)) dict.set(w, { ar, sentence: '' });
  for (const c of VISUAL_DICTIONARY) for (const it of c.items) if (isWord(it.word) && hasArabic(it.meaning_ar)) dict.set(it.word.toLowerCase(), { ar: it.meaning_ar.trim(), sentence: it.sentence || '' });
  return dict;
};

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);
/** Hidden letters: 1 for ≤4 letters, 2 for ≤7, 3 for longer; never the first letter; vowels first (the usual spelling trap), spread out. */
export function pickBlanks(word: string): number[] {
  const n = word.length; const k = n <= 4 ? 1 : n <= 7 ? 2 : 3;
  const idx = Array.from({ length: n - 1 }, (_, i) => i + 1);
  const h = hash(word);
  const score = (i: number) => (VOWELS.has(word[i].toLowerCase()) ? 0 : 10) + ((h >> (i % 16)) & 7);
  const out: number[] = [];
  for (const i of idx.sort((a, b) => score(a) - score(b))) { if (out.length >= k) break; if (out.every(j => Math.abs(j - i) > 1)) out.push(i); }
  for (const i of idx) { if (out.length >= k) break; if (!out.includes(i)) out.push(i); }
  return out.sort((a, b) => a - b);
}
const tilesFor = (word: string, blanks: number[]) => {
  const miss = blanks.map(i => word[i].toLowerCase());
  const pool = 'aeiouyrlnst'.split('').filter(c => !miss.includes(c));
  const h = hash(word + '#');
  const extra: string[] = []; for (let j = 0; extra.length < 3; j++) { const ch = pool[(h + j * 7) % pool.length]; if (!extra.includes(ch)) extra.push(ch); }
  return [...miss, ...extra].map((c, i) => [c, (hash(word + i) % 997)] as const).sort((a, b) => a[1] - b[1]).map(x => x[0]);
};

/** Spelling items for one lesson. Only words with a real Arabic meaning in the data:
 *  1) single-word lesson examples ({en:'brother', ar:'أخ'}), 2) the kids picture cards, 3) the app's visual dictionary for words used in the lesson's sentences.
 *  ~2 per lesson (up to 4 for vocabulary-heavy lessons); none when no suitable word exists. */
export function spellingItemsFor(lesson: LessonLike): SpellingItem[] {
  const c = lesson.content; if (!c) return [];
  const sentences = c.example.map(e => e.en).filter(s => s.trim().split(/\s+/).length >= 3);
  const found = (w: string) => sentences.find(s => new RegExp(`\\b${w}\\b`, 'i').test(s)) || '';
  const cand = new Map<string, { ar: string; sentence: string; vocab: boolean }>();
  const add = (w: string, ar: string, sentence: string, vocab: boolean) => { const k = w.toLowerCase(); if (isWord(w) && hasArabic(ar) && !STOP.has(k) && !cand.has(k)) cand.set(k, { ar: ar.trim(), sentence, vocab }); };
  for (const e of c.example) { const w = e.en.trim().replace(/[.!?]$/, ''); if (isWord(w)) add(w, e.ar, found(w) || dictionary().get(w.toLowerCase())?.sentence || '', true); }
  for (const k of lesson.kids?.cards || []) { const w = k.en.trim().replace(/[.!?]$/, ''); if (isWord(w)) add(w, k.ar, found(w) || '', true); }
  for (const s of sentences) for (const raw of s.split(/[^A-Za-z']+/)) { const d = dictionary().get(raw.toLowerCase()); if (d && raw.length >= 4) add(raw.toLowerCase(), d.ar, s, false); }
  const list = [...cand.entries()].map(([word, v]) => ({ word, ...v }))
    .sort((a, b) => Number(!!b.sentence) - Number(!!a.sentence) || (hash(lesson.id + a.word) % 101) - (hash(lesson.id + b.word) % 101));
  const vocabHeavy = list.filter(x => x.vocab).length >= 5;
  return list.slice(0, vocabHeavy ? 4 : 2).map(x => { const blanks = pickBlanks(x.word); return { word: x.word, ar: x.ar, sentence: x.sentence, blanks, tiles: tilesFor(x.word, blanks) }; });
}

/** Deterministic feedback from the diff between what the student filled and the real word (no invented facts). */
export function spellingFeedback(item: SpellingItem, filled: string[]): { ok: boolean; wrong: { pos: number; got: string; want: string }[]; tips: string[] } {
  const w = item.word.toLowerCase();
  const wrong = item.blanks.map((pos, k) => ({ pos, got: (filled[k] || '').toLowerCase(), want: w[pos] })).filter(x => x.got !== x.want);
  const tips: string[] = [];
  const near = (re: RegExp) => { for (const m of w.matchAll(re)) if (wrong.some(x => x.pos >= m.index! && x.pos < m.index! + m[0].length)) return m[0]; return null; };
  const dbl = near(/([a-z])\1/g); if (dbl) tips.push(`الكلمة فيها حرف مكرر «${dbl}»: نكتبه مرتين مع إنه ينطق مرة وحدة.`);
  const silent = near(/^kn|^wr|mb$|gh/g); if (silent) tips.push(`«${silent}» فيها حرف ما ينطق، لازم تحفظ شكل الكلمة مكتوب.`);
  if (/[^aeiou]e$/.test(w) && wrong.some(x => x.pos === w.length - 1)) tips.push('الـ e في آخر الكلمة ما تنطق، لكنها جزء من الكتابة.');
  const team = near(/ee|ea|oo|ou|ai|ay|oa|ie/g); if (team) tips.push(`«${team}» حرفين علة مع بعض يطلعون صوت واحد.`);
  if (!tips.length && wrong.some(x => VOWELS.has(x.want))) tips.push('حروف العلة a e i o u أكثر شي يلخبط في الكتابة؛ قل الكلمة ببطء واسمع الصوت اللي في النص.');
  if (!tips.length && wrong.length) tips.push('قل الكلمة ببطء حرف حرف وقارنها بالكلمة الصحيحة.');
  return { ok: wrong.length === 0, wrong, tips };
}

/** Problems for scripts/audit-questions.ts. */
export function spellingProblems(it: SpellingItem): string[] {
  const p: string[] = [];
  if (!isWord(it.word)) p.push(`bad word «${it.word}»`);
  if (!hasArabic(it.ar)) p.push('no Arabic meaning');
  if (!it.blanks.length || it.blanks.length > 3) p.push(`blanks ${it.blanks.length}`);
  if (it.blanks.includes(0)) p.push('first letter blank');
  if (it.blanks.some(i => i >= it.word.length)) p.push('blank out of range');
  if (it.word.length <= 4 && it.blanks.length > 1) p.push('too many blanks for short word');
  if (it.blanks.some(i => !it.tiles.includes(it.word[i].toLowerCase()))) p.push('missing letter not in tiles');
  if (it.sentence && !new RegExp(`\\b${it.word}\\b`, 'i').test(it.sentence)) p.push('word not in sentence');
  return p;
}
