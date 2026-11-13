/**
 * Pure logic for the playful «ابن جملتك» activity:
 * emoji for the golden word, category-aware sentence templates, and a/an grammar.
 * Does not persist anything or touch XP / progress.
 */
export type WordCategory =
  | 'body'
  | 'clothes'
  | 'food'
  | 'animals'
  | 'family'
  | 'school'
  | 'home'
  | 'colors'
  | 'sport'
  | 'generic';

export interface FilledTemplate {
  id: string;
  en: string;
  ar: string;
  patternEn: string;
}

const WORD_EMOJI: Record<string, string> = {
  head: '🗣️', eye: '👁️', ear: '👂', nose: '👃', mouth: '👄', hand: '✋', foot: '🦶',
  leg: '🦵', tooth: '🦷', teeth: '🦷', hair: '💇', arm: '💪', finger: '☝️', face: '🙂',
  body: '🧍', neck: '🧣', back: '↩️', shoulder: '🤷', knee: '🦵', toe: '🦶',
  shirt: '👕', trousers: '👖', dress: '👗', shoe: '👟', shoes: '👟', hat: '🎩',
  jacket: '🧥', coat: '🧥', skirt: '👗', socks: '🧦', bag: '🎒',
  apple: '🍎', apples: '🍎', bread: '🍞', rice: '🍚', water: '💧', milk: '🥛',
  pizza: '🍕', chicken: '🍗', salad: '🥗', banana: '🍌', egg: '🥚', juice: '🧃',
  cat: '🐱', dog: '🐶', bird: '🐦', fish: '🐟', horse: '🐴', animal: '🐾',
  mother: '👩', father: '👨', sister: '👧', brother: '👦', family: '👨‍👩‍👧', baby: '👶',
  pen: '🖊️', pencil: '✏️', book: '📖', school: '🏫', class: '🧑‍🏫', homework: '📝', exam: '📋',
  house: '🏠', home: '🏠', door: '🚪', window: '🪟', bed: '🛏️', kitchen: '🍳', table: '🪑',
  red: '🔴', blue: '🔵', green: '🟢', yellow: '🟡', black: '⚫', white: '⚪',
  football: '⚽', tennis: '🎾', swimming: '🏊', basketball: '🏀',
};

const UNCOUNTABLE = new Set([
  'hair', 'water', 'rice', 'milk', 'bread', 'homework', 'music', 'english',
  'food', 'fruit', 'furniture', 'money', 'advice', 'swimming',
]);
const PLURAL = new Set([
  'trousers', 'scissors', 'glasses', 'clothes', 'shoes', 'socks', 'eyes', 'teeth',
  'ears', 'hands', 'feet', 'apples',
]);

const TITLE_CATEGORY: Array<[RegExp, WordCategory]> = [
  [/\bbody\b|جسم|faces?|parts of the body/i, 'body'],
  [/\bclothes\b|ملابس|wear/i, 'clothes'],
  [/\bfood\b|\beat\b|طعام|أكل|fruit|مأكول/i, 'food'],
  [/\banimal|حيوان|pets?\b|حيوانات/i, 'animals'],
  [/\bfamily\b|أسرة|عائلم|عائلة/i, 'family'],
  [/\bcolour|color|ألوان|لون/i, 'colors'],
  [/\bsport|football|tennis|رياض|كرة/i, 'sport'],
  [/\bschool\b|مدرسة|classroom|homework|مدرس/i, 'school'],
  [/\bhome\b|\bhouse\b|بيت|منزل|مطبخ/i, 'home'],
];

const WORD_CATEGORY: Partial<Record<string, WordCategory>> = {};
const addWords = (cat: WordCategory, words: string[]) => { for (const w of words) WORD_CATEGORY[w] = cat; };
addWords('body', ['head', 'eye', 'ear', 'nose', 'mouth', 'hand', 'foot', 'leg', 'tooth', 'teeth', 'hair', 'arm', 'finger', 'face', 'body', 'neck', 'back', 'shoulder', 'knee', 'toe']);
addWords('clothes', ['shirt', 'trousers', 'dress', 'shoe', 'shoes', 'hat', 'jacket', 'coat', 'skirt', 'socks']);
addWords('food', ['apple', 'apples', 'bread', 'rice', 'water', 'milk', 'pizza', 'chicken', 'salad', 'banana', 'egg', 'juice', 'food']);
addWords('animals', ['cat', 'dog', 'bird', 'fish', 'horse', 'animal']);
addWords('family', ['mother', 'father', 'sister', 'brother', 'family', 'baby']);
addWords('school', ['pen', 'pencil', 'book', 'school', 'class', 'homework', 'exam', 'bag']);
addWords('home', ['house', 'home', 'door', 'window', 'bed', 'kitchen', 'table']);
addWords('colors', ['red', 'blue', 'green', 'yellow', 'black', 'white']);
addWords('sport', ['football', 'tennis', 'swimming', 'basketball', 'soccer']);

const GENERIC_EMOJI = '✨';

export const article = (word: string): 'a' | 'an' | '' => {
  const w = word.trim().toLowerCase();
  if (!w || UNCOUNTABLE.has(w) || PLURAL.has(w)) return '';
  return /^[aeiou]/.test(w) ? 'an' : 'a';
};

export const withArticle = (word: string): string => {
  const a = article(word);
  return a ? `${a} ${word}` : word;
};

export const isCountNoun = (word: string): boolean => article(word) !== '';

export function wordEmoji(word: string, icon?: string): string {
  if (icon && icon !== '🔤') return icon;
  const key = word.trim().toLowerCase();
  return WORD_EMOJI[key] || GENERIC_EMOJI;
}

export function detectCategory(titleEn = '', titleAr = '', wordEn = ''): WordCategory {
  const key = wordEn.trim().toLowerCase();
  if (key && WORD_CATEGORY[key]) return WORD_CATEGORY[key]!;
  const title = `${titleEn} ${titleAr}`;
  for (const [re, cat] of TITLE_CATEGORY) if (re.test(title)) return cat;
  return 'generic';
}

export function capitalizeSentence(text: string): string {
  const t = text.trim().replace(/[.?!]+$/, '');
  if (!t) return t;
  return t[0].toUpperCase() + t.slice(1);
}

type Builder = (wordEn: string, wordAr: string) => { en: string; ar: string; patternEn: string } | null;

interface RawTemplate { id: string; categories: Array<WordCategory | 'all'>; build: Builder }

const noun = (id: string, categories: RawTemplate['categories'], build: Builder): RawTemplate => ({ id, categories, build });

const NOUN_TEMPLATES: RawTemplate[] = [
  noun('touch-my', ['body'], (en, ar) => WORD_CATEGORY[en.toLowerCase()] === 'body' ? { en: `I can touch my ${en}`, ar: `أقدر ألمس ${ar}`, patternEn: 'I can touch my ___' } : null),
  noun('cat-big', ['body'], (en, ar) => WORD_CATEGORY[en.toLowerCase()] === 'body' && isCountNoun(en) ? { en: `My cat has a big ${en}`, ar: `قطتي عندها ${ar} كبير`, patternEn: 'My cat has a big ___' } : null),
  noun('wash-my', ['body'], (en, ar) => ['hand', 'hands', 'face', 'foot', 'feet'].includes(en.toLowerCase()) ? { en: `I wash my ${en}`, ar: `أغسل ${ar}`, patternEn: 'I wash my ___' } : { en: `This is my ${en}`, ar: `هذا ${ar} حقي`, patternEn: 'This is my ___' }),
  noun('see', ['body', 'animals', 'generic'], (en, ar) => ({ en: `I see ${withArticle(en)}`, ar: `أشوف ${ar}`, patternEn: 'I see ___' })),
  noun('wear', ['clothes'], (en, ar) => {
    const w = en.toLowerCase();
    if (w === 'trousers' || w === 'socks' || w === 'shoes' || w === 'glasses') return { en: `I wear ${en}`, ar: `ألبس ${ar}`, patternEn: 'I wear ___' };
    return { en: `I wear ${withArticle(en)}`, ar: `ألبس ${ar}`, patternEn: 'I wear ___' };
  }),
  noun('my-clothes', ['clothes'], (en, ar) => ({ en: `This is my ${en}`, ar: `هذا ${ar} حقي`, patternEn: 'This is my ___' })),
  noun('eat', ['food'], (en, ar) => ({ en: `I eat ${withArticle(en)}`, ar: `آكل ${ar}`, patternEn: 'I eat ___' })),
  noun('like-food', ['food'], (en, ar) => ({ en: `I like ${en}`, ar: `أنا أحب ${ar}`, patternEn: 'I like ___' })),
  noun('pet', ['animals'], (en, ar) => ({ en: `I have ${withArticle(en)}`, ar: `عندي ${ar}`, patternEn: 'I have ___' })),
  noun('animal-cute', ['animals'], (en, ar) => ({ en: `The ${en} is cute`, ar: `${ar} لطيف`, patternEn: 'The ___ is cute' })),
  noun('family-love', ['family'], (en, ar) => ({ en: `I love my ${en}`, ar: `أحب ${ar}`, patternEn: 'I love my ___' })),
  noun('family-this', ['family'], (en, ar) => ({ en: `This is my ${en}`, ar: `هذا ${ar}`, patternEn: 'This is my ___' })),
  noun('school-have', ['school'], (en, ar) => ({ en: `I have ${withArticle(en)}`, ar: `عندي ${ar}`, patternEn: 'I have ___' })),
  noun('school-use', ['school'], (en, ar) => ({ en: `I use my ${en}`, ar: `أستخدم ${ar}`, patternEn: 'I use my ___' })),
  noun('home-in', ['home'], (en, ar) => ({ en: `I see ${withArticle(en)}`, ar: `أشوف ${ar}`, patternEn: 'I see ___' })),
  noun('color-like', ['colors'], (en, ar) => ({ en: `I like ${en}`, ar: `أحب اللون ${ar}`, patternEn: 'I like ___' })),
  noun('color-is', ['colors'], (en, ar) => ({ en: `My favourite colour is ${en}`, ar: `لوني المفضّل هو ${ar}`, patternEn: 'My favourite colour is ___' })),
  noun('sport-like', ['sport'], (en, ar) => ({ en: `I like ${en}`, ar: `أنا أحب ${ar}`, patternEn: 'I like ___' })),
  noun('sport-play', ['sport'], (en, ar) => {
    const w = en.toLowerCase();
    if (w === 'swimming') return { en: 'I go swimming', ar: 'أروح أسبح', patternEn: 'I go ___' };
    return { en: `I play ${en}`, ar: `ألعب ${ar}`, patternEn: 'I play ___' };
  }),
  // Generic fallbacks — always offered so every word has a wheel.
  noun('this-is-my', ['all'], (en, ar) => ({ en: `This is my ${en}`, ar: `هذا ${ar} حقي`, patternEn: 'This is my ___' })),
  noun('i-like', ['all'], (en, ar) => ({ en: `I like ${en}`, ar: `أنا أحب ${ar}`, patternEn: 'I like ___' })),
  noun('favourite-word', ['all'], (en, ar) => ({ en: `My favourite word is ${en}`, ar: `كلمتي المفضلة هي ${ar}`, patternEn: 'My favourite word is ___' })),
  noun('i-have', ['all'], (en, ar) => ({ en: `I have ${withArticle(en)}`, ar: `عندي ${ar}`, patternEn: 'I have ___' })),
];

const PHRASE_VARIANTS: Record<string, Array<(en: string, ar: string) => { en: string; ar: string; patternEn: string }>> = {
  like: [
    (en, ar) => ({ en: `I like ${en}`, ar: `أنا أحب ${ar}`, patternEn: 'I like ___' }),
    (en, ar) => ({ en: `I really like ${en}`, ar: `أنا أحب ${ar} كثير`, patternEn: 'I really like ___' }),
  ],
  favourite: [
    (en, ar) => ({ en: `My favourite is ${en}`, ar: `المفضّل عندي هو ${ar}`, patternEn: 'My favourite is ___' }),
    (en, ar) => ({ en: `I love ${en}`, ar: `أنا أحب ${ar}`, patternEn: 'I love ___' }),
  ],
  can: [
    (en, ar) => ({ en: `I can ${en}`, ar: `أنا أقدر ${ar}`, patternEn: 'I can ___' }),
    (en, ar) => ({ en: `Today I can ${en}`, ar: `اليوم أقدر ${ar}`, patternEn: 'Today I can ___' }),
  ],
  want: [
    (en, ar) => ({ en: `I want to ${en}`, ar: `أنا أبغى ${ar}`, patternEn: 'I want to ___' }),
    (en, ar) => ({ en: `One day I want to ${en}`, ar: `يوم من الأيام أبغى ${ar}`, patternEn: 'One day I want to ___' }),
  ],
  now: [
    (en, ar) => ({ en: `I am ${en} now`, ar: `أنا ${ar} الآن`, patternEn: 'I am ___ now' }),
    (en, ar) => ({ en: `Right now I am ${en}`, ar: `الحين أنا ${ar}`, patternEn: 'Right now I am ___' }),
  ],
  went: [
    (en, ar) => ({ en: `I went to ${en} yesterday`, ar: `رحت إلى ${ar} أمس`, patternEn: 'I went to ___ yesterday' }),
  ],
  outcome: [
    (en, ar) => ({ en: `It will help me ${en}`, ar: `بيساعدني ${ar}`, patternEn: 'It will help me ___' }),
  ],
};

/** Noun-style wheel for vocab / "favourite word" cards, filtered to the word's category. */
export function nounTemplates(wordEn: string, wordAr: string, category: WordCategory): FilledTemplate[] {
  const seen = new Set<string>();
  const out: FilledTemplate[] = [];
  for (const raw of NOUN_TEMPLATES) {
    if (!raw.categories.includes('all') && !raw.categories.includes(category)) continue;
    const built = raw.build(wordEn, wordAr);
    if (!built) continue;
    const en = capitalizeSentence(built.en);
    if (seen.has(en.toLowerCase())) continue;
    seen.add(en.toLowerCase());
    out.push({ id: raw.id, en, ar: built.ar, patternEn: built.patternEn });
  }
  return out;
}

/** Wheel for phrase-slot cards (I can / I want to / …), keeping the existing grammar. */
export function phraseTemplates(cardId: string, phraseEn: string, phraseAr: string, fallback: FilledTemplate): FilledTemplate[] {
  const makers = PHRASE_VARIANTS[cardId] || PHRASE_VARIANTS[cardId === 'fav-word' ? 'favourite' : ''];
  if (!makers) return [fallback];
  const seen = new Set<string>();
  const out: FilledTemplate[] = [];
  for (const [i, make] of makers.entries()) {
    const built = make(phraseEn, phraseAr);
    const en = capitalizeSentence(built.en);
    if (seen.has(en.toLowerCase())) continue;
    seen.add(en.toLowerCase());
    out.push({ id: `${cardId}-${i}`, en, ar: built.ar, patternEn: built.patternEn });
  }
  return out.length ? out : [fallback];
}

export function templatesForCard(opts: {
  cardId: string;
  wordEn: string;
  wordAr: string;
  category: WordCategory;
  beforeEn: string;
  afterEn: string;
  beforeAr: string;
  afterAr: string;
}): FilledTemplate[] {
  const fallback: FilledTemplate = {
    id: 'original',
    en: capitalizeSentence(`${opts.beforeEn}${opts.wordEn}${opts.afterEn}`),
    ar: `${opts.beforeAr}${opts.wordAr}${opts.afterAr}`.trim(),
    patternEn: `${opts.beforeEn}___${opts.afterEn}`.replace(/\s+\./, '.').trim(),
  };
  if (opts.cardId === 'fav-word') {
    const list = nounTemplates(opts.wordEn, opts.wordAr, opts.category);
    return list.length ? list : [fallback];
  }
  return phraseTemplates(opts.cardId, opts.wordEn, opts.wordAr, fallback);
}

/** Next wheel index; never stays on the current slot when another exists. */
export function spinIndex(count: number, current: number, random: () => number = Math.random): number {
  if (count <= 1) return 0;
  for (let i = 0; i < 8; i++) {
    const next = Math.floor(random() * count);
    if (next !== current) return next;
  }
  return (current + 1) % count;
}

export function spokenSentence(en: string): string {
  const t = en.trim();
  if (!t) return t;
  return /[.?!]$/.test(t) ? t : `${t}.`;
}
