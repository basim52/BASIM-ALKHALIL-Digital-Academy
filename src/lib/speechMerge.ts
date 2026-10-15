/**
 * Merging speech-recognition pieces without duplicates.
 * Browsers (especially Chrome on Android with continuous=true) re-send earlier results, send cumulative finals
 * ("hello" → "hello there"), or repeat the same final after a restart. These helpers keep each word once.
 */
const norm = (w: string) => w.toLowerCase().replace(/[^\p{L}\p{N}']/gu, '');
const words = (s: string) => s.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean);

/** Join two pieces: if one contains the other keep the longer; else overlap the end of `a` with the start of `b`. */
export function mergeSpeech(a: string, b: string): string {
  const A = words(a), B = words(b);
  if (!A.length) return B.join(' ');
  if (!B.length) return A.join(' ');
  const nA = A.map(norm), nB = B.map(norm);
  const has = (big: string[], small: string[]) => { for (let i = 0; i + small.length <= big.length; i++) if (small.every((w, k) => big[i + k] === w)) return true; return false; };
  if (has(nB, nA)) return B.join(' ');
  if (has(nA, nB)) return A.join(' ');
  for (let k = Math.min(A.length, B.length); k > 0; k--) if (nA.slice(-k).every((w, i) => w === nB[i])) return [...A, ...B.slice(k)].join(' ');
  return [...A, ...B].join(' ');
}

/** "اهلا اهلا اهلا" / "hi there hi there" → once (whole text made of one phrase repeated). */
export function collapseRepeats(s: string): string {
  const W = words(s); const n = W.map(norm);
  for (let len = 1; len <= W.length / 2; len++) {
    if (W.length % len) continue;
    let ok = true; for (let i = len; i < W.length && ok; i++) ok = n[i] === n[i % len];
    if (ok) return W.slice(0, len).join(' ');
  }
  // also drop immediate repeats of the same phrase inside the text (stutter from re-sent results)
  const out: string[] = []; const no: string[] = [];
  for (let i = 0; i < W.length; i++) {
    out.push(W[i]); no.push(n[i]);
    for (let len = Math.floor(out.length / 2); len >= 2; len--) {
      const a = no.slice(-2 * len, -len).join(' '), b = no.slice(-len).join(' ');
      if (a === b) { out.splice(-len); no.splice(-len); break; }
    }
  }
  return out.join(' ');
}

/** Text of one recognition session from its result list (finals by index + current interim), deduped. */
export function sessionText(finals: string[], interim: string): string {
  return collapseRepeats(mergeSpeech(finals.filter(Boolean).reduce((acc, f) => mergeSpeech(acc, f), ''), interim));
}
