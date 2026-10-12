/**
 * Local, deterministic checker for spoken answers (Web Speech API transcript vs expected answer).
 * - Normalises case, punctuation, contractions and number words.
 * - Personal/open answers (name, age, city...) are checked by PATTERN: proper nouns and numbers in the
 *   model answer are "slots" that accept any word, so "I'm Noura, I'm 25, I'm from Abha" passes a model of
 *   "I'm Faisal. I'm ten years old. I'm from Riyadh."
 * - Word-level alignment (LCS) gives a similarity score; missing words are reported for highlighting.
 */
const CONTRACTIONS: Record<string, string> = {
  "i'm": 'i am', "you're": 'you are', "he's": 'he is', "she's": 'she is', "it's": 'it is', "we're": 'we are',
  "they're": 'they are', "that's": 'that is', "there's": 'there is', "what's": 'what is', "where's": 'where is',
  "isn't": 'is not', "aren't": 'are not', "don't": 'do not', "doesn't": 'does not', "didn't": 'did not',
  "can't": 'can not', "cannot": 'can not', "won't": 'will not', "i'll": 'i will', "you'll": 'you will',
  "i've": 'i have', "i'd": 'i would', "let's": 'let us', "wasn't": 'was not', "weren't": 'were not'
};
const NUMBER_WORDS = new Set(['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety','hundred']);
const FILLERS = new Set(['um', 'uh', 'erm', 'ah', 'hmm', 'well', 'so', 'okay', 'ok']);

export function normalizeSpoken(text: string): string[] {
  const lower = (text || '').toLowerCase().replace(/[’‘`]/g, "'");
  return lower
    .replace(/[^a-z0-9'\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .flatMap(w => (CONTRACTIONS[w] ? CONTRACTIONS[w].split(' ') : [w.replace(/'s$/, '').replace(/'/g, '')]))
    .filter(w => w && !FILLERS.has(w));
}

const isNumberish = (w: string) => /^\d+$/.test(w) || NUMBER_WORDS.has(w);

type Tok = { w: string; slot: boolean };

/** Tokenise the model answer, marking proper nouns / numbers as open slots. */
export function buildTemplate(expected: string): Tok[] {
  const raw = (expected || '').replace(/[’‘`]/g, "'").split(/\s+/).filter(Boolean);
  const out: Tok[] = [];
  raw.forEach((word, i) => {
    const clean = word.replace(/[^A-Za-z0-9']/g, '');
    if (!clean) return;
    const prevEndsSentence = i === 0 || /[.!?]$/.test(raw[i - 1]);
    const isProper = /^[A-Z][a-z]/.test(clean) && !prevEndsSentence && clean !== 'I';
    const parts = normalizeSpoken(clean);
    parts.forEach(p => out.push({ w: p, slot: isProper || isNumberish(p) }));
  });
  return out;
}

export interface SpokenCheckResult {
  score: number;          // 0..1 similarity over fixed (non-slot) words
  passed: boolean;
  mode: 'pattern' | 'exact';
  missing: string[];      // expected words not heard
  extra: string[];        // heard words not in the model (excluding slot fillers)
  heard: string[];
  slotsFilled: number;
  slotsTotal: number;
}

export function checkSpokenAnswer(transcript: string, expected: string, threshold?: number): SpokenCheckResult {
  const tpl = buildTemplate(expected);
  const heard = normalizeSpoken(transcript);
  const slotsTotal = tpl.filter(t => t.slot).length;
  const mode: 'pattern' | 'exact' = slotsTotal > 0 ? 'pattern' : 'exact';
  // LCS where a slot matches any heard word.
  const n = tpl.length, m = heard.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) {
    const match = tpl[i].slot || tpl[i].w === heard[j];
    dp[i][j] = match ? 1 + dp[i + 1][j + 1] : Math.max(dp[i + 1][j], dp[i][j + 1]);
  }
  const matchedTpl = new Set<number>(), matchedHeard = new Set<number>();
  let i = 0, j = 0;
  while (i < n && j < m) {
    if ((tpl[i].slot || tpl[i].w === heard[j]) && dp[i][j] === 1 + dp[i + 1][j + 1]) { matchedTpl.add(i); matchedHeard.add(j); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) i++; else j++;
  }
  const fixed = tpl.map((t, k) => ({ ...t, k })).filter(t => !t.slot);
  const fixedHit = fixed.filter(t => matchedTpl.has(t.k)).length;
  const slotsFilled = tpl.filter((t, k) => t.slot && matchedTpl.has(k)).length;
  const fixedScore = fixed.length ? fixedHit / fixed.length : 1;
  const slotScore = slotsTotal ? slotsFilled / slotsTotal : 1;
  const score = mode === 'pattern' ? fixedScore * 0.8 + slotScore * 0.2 : fixedScore;
  const missing = fixed.filter(t => !matchedTpl.has(t.k)).map(t => t.w);
  const extra = heard.filter((_, k) => !matchedHeard.has(k));
  const need = threshold ?? (mode === 'pattern' ? 0.7 : 0.85);
  return { score, passed: heard.length > 0 && score >= need, mode, missing, extra, heard, slotsFilled, slotsTotal };
}
