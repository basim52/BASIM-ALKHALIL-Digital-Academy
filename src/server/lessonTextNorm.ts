// Shared normalizer for the lesson-text allow-list (build script + server).
export function lessonWords(s: string): string[] {
  return String(s || '').toLowerCase()
    .replace(/[\u064B-\u0652\u0640\u0670]/g, '') // Arabic diacritics + tatweel
    .replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه')
    .split(/[^\p{L}\p{N}]+/u).filter(Boolean);
}
/** 32-bit FNV-1a hash of a word trigram. */
export function trigramHash(a: string, b: string, c: string): number {
  let h = 0x811c9dc5; const s = a + ' ' + b + ' ' + c;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); }
  return h >>> 0;
}
export function textTrigrams(s: string): number[] {
  const w = lessonWords(s); const out: number[] = [];
  for (let i = 0; i + 2 < w.length; i++) out.push(trigramHash(w[i], w[i + 1], w[i + 2]));
  return out;
}
