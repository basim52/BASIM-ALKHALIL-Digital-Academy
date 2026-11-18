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

/** A fitting emoji for a grammar lesson, picked from its English title. */
const ICONS: [RegExp, string][] = [
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
  [/adjective|modifier/i, '🎨'],
  [/article|generic reference/i, '📰'],
  [/preposition|time reference/i, '📍'],
  [/noun|nominal|word formation|plural|possess/i, '📦'],
  [/punctuation|ellipsis|substitution|absolute/i, '✂️'],
  [/so\/such|\btoo\b|enough|as if|as though|rather|it's time/i, '⚖️'],
  [/\bbe\b|\bam\b|\bis\b|\bare\b|\bhave\b|\bhas\b/i, '🙋'],
];
const FALLBACK = ['📘', '✏️', '🌟', '🎯'];
export function lessonIcon(titleEn: string, index = 0): string {
  for (const [re, icon] of ICONS) if (re.test(titleEn)) return icon;
  return FALLBACK[index % FALLBACK.length];
}

/** Node colours per level (Duolingo-like bright circles; each level its own colour). */
export const LEVEL_COLORS: Record<string, { fill: string; shadow: string; soft: string }> = {
  a: { fill: '#58cc02', shadow: '#46a302', soft: '#d7ffb8' },
  b1: { fill: '#1cb0f6', shadow: '#1899d6', soft: '#ddf4ff' },
  b2: { fill: '#ce82ff', shadow: '#a568cc', soft: '#f4e3ff' },
  c1: { fill: '#ff9600', shadow: '#cc7800', soft: '#ffefd6' },
  c2: { fill: '#ff4b4b', shadow: '#ea2b2b', soft: '#ffe0e0' },
};
const ROTATION = ['#58cc02', '#1cb0f6', '#ce82ff', '#ff9600', '#ff4b4b'];
export function levelColor(levelId: string, levelIndex = 0) {
  const c = LEVEL_COLORS[levelId];
  if (c) return c;
  const fill = ROTATION[levelIndex % ROTATION.length];
  return { fill, shadow: fill, soft: '#f1f5f9' };
}
