/**
 * Pure logic for «ركّب الجملة»: scramble a sentence into word chips, check the child's order,
 * and step through three attempts with growing hints:
 *   1st wrong → colour the correct first word; 2nd wrong → the teacher says the sentence;
 *   3rd wrong → show the correct answer. A correct build → the teacher reads it and the child repeats.
 * No storage, no XP, no progress.
 */
export const MAX_ATTEMPTS = 3;
export type Hint = 'none' | 'first-word' | 'speak' | 'answer';
export type Status = 'building' | 'solved' | 'revealed';
export interface PuzzleState { wrong: number; status: Status; hint: Hint }
export type Outcome = 'correct' | 'wrong' | 'revealed' | 'ignored';

export const tokenize = (sentence: string): string[] => sentence.trim().replace(/[.?!]+$/, '').split(/\s+/).filter(Boolean);
const norm = (w: string) => w.toLowerCase();
/** Chip label: the first word loses its capital (except «I») so the capital letter doesn't give the answer away. */
export const chipLabel = (word: string, index: number) => (index === 0 && word !== 'I' ? word.toLowerCase() : word);
export const isCorrectOrder = (built: string[], target: string[]) =>
  built.length === target.length && built.every((w, i) => norm(w) === norm(target[i]));

/** Shuffled chip order (indices into the sentence's words). Never returns the original order when another exists. */
export function scramble(words: string[], random: () => number = Math.random): number[] {
  const order = words.map((_, i) => i);
  if (new Set(words.map(norm)).size < 2) return order;
  for (let tries = 0; tries < 20; tries++) {
    for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
    if (!isCorrectOrder(order.map(i => words[i]), words)) return order;
  }
  // Deterministic fallback (e.g. a stuck random source): rotate by one, which always changes the order.
  return [...words.map((_, i) => i).slice(1), 0];
}

export const initialState = (): PuzzleState => ({ wrong: 0, status: 'building', hint: 'none' });
export const hintAfter = (wrong: number): Hint => (wrong <= 0 ? 'none' : wrong === 1 ? 'first-word' : wrong === 2 ? 'speak' : 'answer');
export const attemptsLeft = (s: PuzzleState) => Math.max(0, MAX_ATTEMPTS - s.wrong);

/** Check one finished build. Only full builds count as an attempt; once solved/revealed nothing changes. */
export function submit(state: PuzzleState, built: string[], target: string[]): { state: PuzzleState; outcome: Outcome } {
  if (state.status !== 'building' || built.length !== target.length) return { state, outcome: 'ignored' };
  if (isCorrectOrder(built, target)) return { state: { ...state, status: 'solved' }, outcome: 'correct' };
  const wrong = state.wrong + 1;
  const hint = hintAfter(wrong);
  if (wrong >= MAX_ATTEMPTS) return { state: { wrong, status: 'revealed', hint }, outcome: 'revealed' };
  return { state: { wrong, status: 'building', hint }, outcome: 'wrong' };
}

/** The first chip (position in the scrambled order) that holds the sentence's first word, for the colour hint. */
export function firstWordChip(words: string[], order: number[], used: number[]): number | null {
  const target = norm(words[0]);
  const slot = order.findIndex(i => !used.includes(i) && norm(words[i]) === target);
  return slot < 0 ? null : order[slot];
}
