/**
 * Pure helpers for Sara's zigzag lesson map (display only).
 * Progress is READ from the existing unlock counter (`unlocked` = highest open lesson order);
 * nothing here writes progress, XP or certificates.
 */
export type MapNodeState = 'done' | 'current' | 'locked';

/** Same rule as the lesson list: open when order <= unlocked, passed when order < unlocked. */
export function mapNodeState(order: number, unlocked: number, unlockAll = false): MapNodeState {
  if (order < unlocked) return 'done';
  if (order === unlocked) return 'current';
  return unlockAll ? 'current' : 'locked';
}

/** True when the lesson can be opened (identical to the list's `l.order <= unlocked`). */
export const mapNodeOpen = (order: number, unlocked: number, unlockAll = false) => unlockAll || order <= unlocked;

/** The lesson to jump to: the first not-yet-passed lesson, else the last one. */
export function currentLessonOrder(orders: number[], unlocked: number): number | null {
  if (!orders.length) return null;
  const next = orders.find(o => o >= unlocked);
  return next ?? orders[orders.length - 1];
}

/** Horizontal zigzag offset (in node-widths) for the n-th node of a section: 0, 1, 1.6, 1, 0, -1, -1.6, -1, ... */
const WAVE = [0, 0.9, 1.5, 0.9, 0, -0.9, -1.5, -0.9];
export const zigzagOffset = (index: number) => WAVE[((index % WAVE.length) + WAVE.length) % WAVE.length];

/** Lesson families: which keyword list wins first and which emojis fill the gaps. */
export type MapKind = 'grammar' | 'conversation' | 'reading' | 'writing' | 'listening' | 'pronunciation' | 'vocabulary' | 'daily';

/** Sounds & speech (pronunciation, reading-aloud lessons). */
const SOUND_ICONS: [RegExp, string][] = [
  [/intonation|pitch|tone|sarcas|surprise|exclamation|emotion/i, '📈'],
  [/stress|rhythm|syllab|thought group|pace/i, '🥁'],
  [/\bth\b|tongue/i, '👅'],
  [/vowel|schwa|\bee\b|\boo\b|long a|short i|magic e|\bu vs|\bo vs|\be vs|oa vs|oy vs|ow vs|er vs|walk vs/i, '🅰️'],
  [/silent/i, '🤫'],
  [/link|connected|weak form|strong form|elision|assimilation|contraction|reduction|fast speech|dropping|disappearing|glottal/i, '🔗'],
  [/homophone|spelling|ough|same spelling|confusable|minimal pair|mispronounc/i, '🔤'],
  [/-ed|-s endings|ending|suffix|-tion|-sion|-ture|-sure|-age|-ous|-ate|prefix/i, '🧩'],
  [/cluster|consonant/i, '🧱'],
  [/phonics|letter sound|blending|digraph|alphabet/i, '🔠'],
  [/number|year|date|teen|abbreviation/i, '🔢'],
  [/american|british|flap/i, '🌍'],
  [/aloud|shadowing|speech|presentation|fluen|challenge|filler/i, '🎤'],
  [/question|echo|choice|tag/i, '❓'],
  [/ vs |\bvs\b/i, '👄'],
];

/** Everyday & academic topics (conversation, listening, reading, writing, vocabulary). */
const TOPIC_ICONS: [RegExp, string][] = [
  [/\breview\b|\bfinal\b/i, '🏆'],
  [/greet|hello/i, '👋'],
  [/meet|introduc|yourself|networking/i, '🤝'],
  [/family|relationship/i, '👨‍👩‍👧'],
  [/airport|flight|passport|travel|holiday|announcement/i, '✈️'],
  [/hotel|landlord|renting|flat\b|home|house/i, '🏨'],
  [/doctor|pharmac|health|clinic|medic|antibiotic|emergenc|sugar|fitness/i, '🩺'],
  [/restaurant|food|drink|dinner|menu|recipe|cooking/i, '🍽️'],
  [/direction|getting around|taxi|metro|rail|transport|garage/i, '🧭'],
  [/shop|cloth|returns|exchange|advert/i, '🛍️'],
  [/bank|money|saving|price|financ|econom|cost|fraud/i, '💰'],
  [/phone|call\b|calls|voicemail/i, '📞'],
  [/weather|temperature|climate|solar|cooling/i, '🌤️'],
  [/hobb|free time|sport|leisure/i, '⚽'],
  [/invitation|plan|congratulat|occasion|party/i, '🎉'],
  [/apolog|excuse|complain|refund|customer|sympathy|thank/i, '🙏'],
  [/job|interview|work|meeting|team|board|supervisor|colleague|business|professional|\bcv\b|cover letter|linkedin|chairing|minutes|proposal|executive/i, '💼'],
  [/opinion|agree|debate|pros and cons|argument|persua|negotiat|rebuttal|bias|for-and-against|thesis/i, '⚖️'],
  [/email|letter/i, '📧'],
  [/news|report|documentary|article|editorial|headline/i, '📰'],
  [/summar|abstract|definition/i, '📋'],
  [/stor|novel|narrat|dialogue|metaphor|show, don/i, '📚'],
  [/describ|people|personality|body language|feeling/i, '🧑'],
  [/school|classroom|study|studies|universit|exam|admission|graduat|phd|lecture|research|academic/i, '🎓'],
  [/museum|history|incense|wisdom|culture/i, '🏛️'],
  [/science|footprint|psycholog|memor|nudge|philosoph|procrastinat|decision/i, '🧠'],
  [/technolog|\bai\b|smart|digital|technical/i, '🤖'],
  [/environment|coral|nature|desalination|circular|water/i, '🌊'],
  [/sleep/i, '😴'],
  [/graph|chart|timetable/i, '📊'],
  [/skim|scan|inference|infer|context|purpose|tone|implied|between the lines/i, '🔎'],
  [/edit|proofread/i, '🖍️'],
  [/present|speech|talk|signpost|rhetoric/i, '🎤'],
  [/language|countries|nationalit/i, '🗣️'],
  [/time|clock|\bday/i, '⏰'],
  [/number/i, '🔢'],
  [/suggest|advice|recommend|instruction/i, '💡'],
];

/** Grammar points. */
const GRAMMAR_ICONS: [RegExp, string][] = [
  [/\breview\b|\btest\b|\bfinal\b/i, '🏆'],
  [/introduc|yourself|greet/i, '👋'],
  [/\bfamily\b/i, '👨‍👩‍👧'],
  [/\bthis\b|\bthese\b|\bthose\b|there is|there are/i, '👉'],
  [/phrasal|idiom|collocation/i, '🧠'],
  [/countable|quantif|\bsome\b|\bany\b|how much|how many|quantity|proportion|distributive/i, '🔢'],
  [/condition|\bwish\b|if only|unless|provided|as long as|unreal/i, '🔀'],
  [/deduction|\bmodal|hedging|\bmay\b|\bmight\b|possib|probab/i, '🎲'],
  [/subjunctive|formal|register|styl|academic|politeness/i, '🎩'],
  [/invers|emphas|cleft|fronting/i, '✨'],
  [/passive|causative|have something done/i, '🔁'],
  [/report|\bsaid\b|\btold\b/i, '🗣️'],
  [/question|\btags?\b|\bdid\b|\bdo & does\b/i, '❓'],
  [/negati/i, '🚫'],
  [/future|\bwill\b|going to|arrangement/i, '🔮'],
  [/past perfect|used to|\bwould\b|\bwas\b|\bwere\b|\bpast\b|narrative/i, '⏪'],
  [/perfect|\bsince\b|\byet\b|already|experience/i, '⏳'],
  [/present|continuous|\bsimple\b|\btense|stative|routine/i, '⏰'],
  [/\bmust|have to|obligation|need/i, '📏'],
  [/should|advice|ought|had better/i, '💡'],
  [/\bcan\b|\bcan't\b|\bcould\b|\bable to\b|abilit/i, '💪'],
  [/compar|superlative/i, '📊'],
  [/relative|\bwho\b|\bwhich\b|whatever|whoever|clause/i, '🔗'],
  [/gerund|infinitive|verb pattern/i, '🧩'],
  [/link|connect|conjunction|contrast|concession|discourse|parallel|complex sentence|apposition/i, '🪢'],
  [/adverb|frequency|manner/i, '⚡'],
  [/adjective|modifier|colou?r/i, '🎨'],
  [/article|generic reference/i, '📰'],
  [/preposition|time reference/i, '📍'],
  [/noun|nominal|word formation|plural|possess|pronoun/i, '📦'],
  [/punctuation|ellipsis|substitution|absolute/i, '✂️'],
  [/so\/such|\btoo\b|enough|as if|as though|rather|it's time/i, '⚖️'],
  [/alphabet|letter/i, '🔠'],
  [/number|telling the time|days/i, '🔢'],
  [/imperative/i, '📢'],
  [/like|dislike/i, '❤️'],
  [/food|direction/i, '🍽️'],
  [/\bbe\b|\bam\b|\bis\b|\bare\b|\bhave\b|\bhas\b/i, '🙋'],
];

const FALLBACKS: Record<MapKind, string[]> = {
  grammar: ['📘', '✏️', '🌟', '🎯'],
  conversation: ['💬', '🗨️', '🙋', '🤝'],
  reading: ['📖', '🔎', '📚', '📰'],
  writing: ['✍️', '📝', '🖊️', '📄'],
  listening: ['🎧', '📻', '🔊', '🎙️'],
  pronunciation: ['👄', '🗣️', '🔊', '🎵'],
  vocabulary: ['📗', '🔤', '💡', '⭐'],
  daily: ['🌍', '💬', '🏙️', '⭐'],
};
const ORDER: Record<MapKind, [RegExp, string][][]> = {
  grammar: [GRAMMAR_ICONS, TOPIC_ICONS],
  conversation: [TOPIC_ICONS],
  listening: [TOPIC_ICONS, SOUND_ICONS, GRAMMAR_ICONS],
  reading: [SOUND_ICONS, TOPIC_ICONS],
  writing: [TOPIC_ICONS, GRAMMAR_ICONS],
  pronunciation: [SOUND_ICONS, TOPIC_ICONS],
  vocabulary: [TOPIC_ICONS],
  daily: [TOPIC_ICONS],
};
/** A fitting emoji for a lesson, picked from its English title (lesson's own icon wins when the data has one). */
export function lessonIcon(titleEn: string, index = 0, kind: MapKind = 'grammar'): string {
  for (const list of ORDER[kind]) for (const [re, icon] of list) if (re.test(titleEn)) return icon;
  const fb = FALLBACKS[kind];
  return fb[index % fb.length];
}

/** Node colours per level (Duolingo-like bright circles; each level its own colour). */
export const LEVEL_COLORS: Record<string, { fill: string; shadow: string; soft: string }> = {
  a: { fill: '#58cc02', shadow: '#46a302', soft: '#d7ffb8' },
  b1: { fill: '#1cb0f6', shadow: '#1899d6', soft: '#ddf4ff' },
  b2: { fill: '#ce82ff', shadow: '#a568cc', soft: '#f4e3ff' },
  c1: { fill: '#ff9600', shadow: '#cc7800', soft: '#ffefd6' },
  c2: { fill: '#ff4b4b', shadow: '#ea2b2b', soft: '#ffe0e0' },
};
const PALETTE = [LEVEL_COLORS.a, LEVEL_COLORS.b1, LEVEL_COLORS.b2, LEVEL_COLORS.c1, LEVEL_COLORS.c2,
  { fill: '#00c2a8', shadow: '#009e89', soft: '#d5fbf5' }, { fill: '#ff6fae', shadow: '#d9508f', soft: '#ffe3f0' }];
/** Colour for the n-th level of a track; `offset` lets each track start on its own colour. */
export function levelColor(_levelId: string, levelIndex = 0, offset = 0) {
  return PALETTE[(((levelIndex + offset) % PALETTE.length) + PALETTE.length) % PALETTE.length];
}

/** Each specialised teacher's emoji family + first level colour on the map (keyed by persona id). */
export const TEACHER_MAP_STYLE: Record<string, { kind: MapKind; colorOffset: number }> = {
  grammar: { kind: 'grammar', colorOffset: 0 },        // نورة
  business: { kind: 'conversation', colorOffset: 1 },  // محمد
  exams: { kind: 'writing', colorOffset: 3 },          // علي
  lama: { kind: 'pronunciation', colorOffset: 6 },     // لمى
  reem: { kind: 'vocabulary', colorOffset: 5 },        // ريم
  haya: { kind: 'grammar', colorOffset: 2 },           // هيا
  jana: { kind: 'grammar', colorOffset: 4 },           // جنى
  lina: { kind: 'daily', colorOffset: 3 },             // لينا
};
export const teacherMapStyle = (personaId: string) => TEACHER_MAP_STYLE[personaId] || { kind: 'grammar' as MapKind, colorOffset: 0 };
