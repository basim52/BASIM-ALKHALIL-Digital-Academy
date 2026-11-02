/** Free public word APIs (no keys): Free Dictionary (pronunciation), Datamuse (spelling suggestions).
 *  Every call is cached (memory + localStorage) and fails soft: callers get null/[] and simply hide the feature. */

const mem = new Map<string, unknown>();
const LS = 'bk_wordapi_v1:';
const TTL = 30 * 24 * 3600 * 1000;

function read<T>(key: string): T | undefined {
  if (mem.has(key)) return mem.get(key) as T;
  try {
    const raw = localStorage.getItem(LS + key);
    if (raw) { const o = JSON.parse(raw); if (Date.now() - o.t < TTL) { mem.set(key, o.v); return o.v as T; } }
  } catch { /* ignore */ }
  return undefined;
}
function write(key: string, v: unknown) {
  mem.set(key, v);
  try { localStorage.setItem(LS + key, JSON.stringify({ t: Date.now(), v })); } catch { /* quota: memory only */ }
}
const inflight = new Map<string, Promise<unknown>>();
async function cached<T>(key: string, fallback: T, load: () => Promise<T>): Promise<T> {
  const hit = read<T>(key); if (hit !== undefined) return hit;
  if (inflight.has(key)) return inflight.get(key) as Promise<T>;
  const p = (async () => {
    try { const v = await load(); write(key, v); return v; }
    catch { return fallback; } // network error: don't cache, try again next time
    finally { inflight.delete(key); }
  })();
  inflight.set(key, p);
  return p;
}
async function getJson(url: string, ms = 6000): Promise<any> {
  const c = new AbortController(); const t = setTimeout(() => c.abort(), ms);
  try { const r = await fetch(url, { signal: c.signal }); if (r.status === 404) return null; if (!r.ok) throw new Error(String(r.status)); return await r.json(); }
  finally { clearTimeout(t); }
}
const clean = (w: string) => w.trim().toLowerCase();
const isWord = (w: string) => /^[a-z][a-z' -]{0,40}$/.test(w);

export interface Pronunciation { audio: string | null; ipa: string | null }

export function getPronunciation(word: string): Promise<Pronunciation | null> {
  const w = clean(word); if (!isWord(w)) return Promise.resolve(null);
  return cached<Pronunciation | null>('dict:' + w, null, async () => {
    const d = await getJson(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(w)}`);
    if (!Array.isArray(d)) return null;
    const ph = d.flatMap((e: any) => e.phonetics || []);
    const pick = ph.find((p: any) => p.audio && /-us\.mp3$/.test(p.audio)) || ph.find((p: any) => p.audio);
    const ipa = pick?.text || d[0]?.phonetic || ph.find((p: any) => p.text)?.text || null;
    return { audio: pick?.audio || null, ipa };
  });
}

export interface SpellCheck { realWordFreq: number; suggestions: string[] }
/** Datamuse: is `typed` itself a common English word (frequency per million), and which words is it spelled/sounds like. */
export function spellCheck(typed: string): Promise<SpellCheck | null> {
  const w = clean(typed); if (!isWord(w)) return Promise.resolve(null);
  return cached<SpellCheck | null>('sp2:' + w, null, async () => {
    const q = encodeURIComponent(w);
    const [sp, sl] = await Promise.all([
      getJson(`https://api.datamuse.com/words?sp=${q}&md=f&max=5`),
      getJson(`https://api.datamuse.com/words?sl=${q}&max=5`),
    ]);
    const spA: any[] = Array.isArray(sp) ? sp : []; const slA: any[] = Array.isArray(sl) ? sl : [];
    const exact = spA.find(x => x.word === w);
    const f = Number(String((exact?.tags || []).find((t: string) => t.startsWith('f:')) || 'f:0').slice(2)) || 0;
    const suggestions = [...spA, ...slA].map(x => String(x.word)).filter(x => x !== w);
    return { realWordFreq: f, suggestions: Array.from(new Set(suggestions)) };
  });
}

let current: HTMLAudioElement | null = null;
export function speakFallback(word: string) {
  try {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(word); u.lang = 'en-US'; u.rate = 0.85;
    window.speechSynthesis.speak(u);
  } catch { /* ignore */ }
}
/** Play the real recorded pronunciation; falls back to the browser voice. */
export async function playWord(word: string): Promise<void> {
  const p = await getPronunciation(word);
  if (p?.audio) {
    try { current?.pause(); current = new Audio(p.audio); await current.play(); return; } catch { /* fall through */ }
  }
  speakFallback(word);
}
