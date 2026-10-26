import { checkSpokenAnswer, normalizeSpoken } from './speechAnswerCheck';

/**
 * «ردّد مع المعلمة» scoring. Sentences: unchanged (checkSpokenAnswer). Single-word targets: Android often returns a
 * near-homophone for a short word said by a child («ball» → "bowl" / "Paul" / "bol" / "all"), which used to score
 * 0 or look like silence. A near match now earns partial credit (never a pass), an exact word stays 100%.
 */
export interface RepeatScore { score: number; transcript: string; missing: string[]; passed: boolean; heard: number; fuzzy: boolean }

const HOMOPHONES: Record<string, string[]> = {
  ball: ['bowl', 'bol', 'paul', 'pall', 'bal', 'boll', 'bull', 'fall'], cat: ['kat', 'cut', 'kit', 'cap'], dog: ['doug', 'dug', 'duck'],
  red: ['read', 'rid', 'rad'], blue: ['blew', 'bloo'], two: ['to', 'too', 'tu'], four: ['for', 'fore'], eight: ['ate', 'aight'],
  one: ['won', 'wan'], sun: ['son', 'some'], see: ['sea', 'c'], bee: ['be', 'b'], eye: ['i', 'aye'], tea: ['tee', 't'],
  pen: ['pin', 'ben', 'pan'], bed: ['bad', 'bid', 'bet'], hat: ['had', 'hot', 'hut'], fish: ['fiche', 'fresh'], car: ['card', 'kar'],
  book: ['look', 'buck'], apple: ['apel', 'appel'], milk: ['melk'], water: ['waiter', 'wader'], hello: ['halo', 'hallo', 'hullo'],
  yes: ['yeah', 'yas'], no: ['know', 'now'], night: ['knight', 'nite'], write: ['right', 'rite'], hear: ['here'], there: ['their', 'they\'re'],
};

const lev = (a: string, b: string): number => {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...new Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
};

/** Rough sound key: voiced/unvoiced pairs merged, vowels after the first letter dropped, doubles collapsed. */
export function soundKey(w: string): string {
  let s = w.toLowerCase().replace(/[^a-z]/g, '');
  if (!s) return '';
  s = s.replace(/^kn/, 'n').replace(/^wr/, 'r').replace(/ph/g, 'f').replace(/ck/g, 'k').replace(/gh/g, '').replace(/c(?=[eiy])/g, 's').replace(/c/g, 'k').replace(/q/g, 'k').replace(/x/g, 'ks');
  const map: Record<string, string> = { p: 'b', d: 't', g: 'k', v: 'f', z: 's', j: 'k' };
  s = s.split('').map(ch => map[ch] || ch).join('');
  const head = /[aeiou]/.test(s[0]) ? 'a' : s[0];
  const tail = s.slice(1).replace(/[aeiouwhy]/g, '');
  return (head + tail).replace(/(.)\1+/g, '$1');
}

/** 0 when not a near match; otherwise the partial credit for a single-word target. */
export function nearWordCredit(heard: string, target: string): number {
  if (!heard || !target || heard === target) return 0;
  if (HOMOPHONES[target]?.includes(heard)) return 0.75;
  const k1 = soundKey(heard), k2 = soundKey(target);
  if (k1 && k1 === k2) return 0.75;
  const d = lev(heard, target);
  if (d <= 1 || (target.length >= 6 && d <= 2)) return 0.7;
  if (k1 && k2 && k2.length >= 2 && lev(k1, k2) <= 1 && heard[0] === target[0]) return 0.6;
  return 0;
}

/** Best score among the recognizer's alternatives. null when nothing usable was heard. */
export function scoreRepeat(alts: string[], expected: string): RepeatScore | null {
  const target = normalizeSpoken(expected);
  let best: RepeatScore | null = null;
  for (const t of alts.filter(Boolean)) {
    const r = checkSpokenAnswer(t, expected);
    if (!r.heard.length) continue;
    let cand: RepeatScore = { score: r.score, transcript: t, missing: r.missing, passed: r.passed, heard: r.heard.length, fuzzy: false };
    if (target.length === 1 && !r.passed) {
      const credit = Math.max(0, ...r.heard.map(h => nearWordCredit(h, target[0])));
      if (credit > cand.score) cand = { score: credit, transcript: t, missing: [], passed: false, heard: r.heard.length, fuzzy: true };
    }
    if (!best || cand.score > best.score) best = cand;
  }
  return best;
}
