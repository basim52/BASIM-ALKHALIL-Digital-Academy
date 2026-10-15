/**
 * Live loudness of Sara's voice for the avatar's lip-sync.
 * The cloud TTS clip (WAV/PCM) is read once into a small loudness envelope (one value per 20 ms) and the avatar
 * reads it at the audio element's currentTime. Nothing is inserted into the audio path, so playback, latency and
 * iOS/Android routing stay exactly as they were. Non-PCM clips → level is estimated from playback (null envelope).
 */
let cur: { el: HTMLAudioElement; env: Float32Array | null; frame: number } | null = null;

function envelope(bytes: Uint8Array): { env: Float32Array; frame: number } | null {
  try {
    const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    if (String.fromCharCode(...bytes.subarray(0, 4)) !== 'RIFF') return null;
    let p = 12, fmt: { ch: number; rate: number; bits: number } | null = null;
    while (p + 8 <= bytes.length) {
      const id = String.fromCharCode(...bytes.subarray(p, p + 4)); const size = dv.getUint32(p + 4, true);
      if (id === 'fmt ') fmt = { ch: dv.getUint16(p + 10, true), rate: dv.getUint32(p + 12, true), bits: dv.getUint16(p + 22, true) };
      if (id === 'data' && fmt && fmt.bits === 16) {
        const start = p + 8, n = Math.floor(Math.min(size, bytes.length - start) / 2 / fmt.ch);
        const frame = 0.02, per = Math.max(1, Math.round(fmt.rate * frame)); const out = new Float32Array(Math.ceil(n / per));
        let peak = 1e-4;
        for (let f = 0; f < out.length; f++) {
          let sum = 0, c = 0; for (let i = f * per; i < Math.min(n, (f + 1) * per); i += 2) { const v = dv.getInt16(start + i * 2 * fmt.ch, true) / 32768; sum += v * v; c++; }
          out[f] = Math.sqrt(sum / Math.max(1, c)); if (out[f] > peak) peak = out[f];
        }
        for (let f = 0; f < out.length; f++) out[f] = Math.min(1, out[f] / (peak * 0.8));
        return { env: out, frame };
      }
      p += 8 + size + (size % 2);
    }
  } catch { /* not a PCM WAV */ }
  return null;
}

/** Called by the audio player right after a Sara clip starts (off the critical path). */
export function registerSaraSpeech(el: HTMLAudioElement, bytes: Uint8Array) {
  cur = { el, env: null, frame: 0.02 };
  const mine = cur;
  setTimeout(() => { const e = envelope(bytes); if (cur === mine && e) { mine.env = e.env; mine.frame = e.frame; } }, 0);
}

/** 0..1 loudness of Sara's voice right now (0 when nothing plays). */
export function getSaraSpeechLevel(): number {
  const c = cur; if (!c) return 0;
  const el = c.el;
  if (el.paused || el.ended || !el.src) return 0;
  if (!c.env) return 0.35 + 0.3 * Math.abs(Math.sin(el.currentTime * 13)); // fallback rhythm while the envelope is not ready
  const i = Math.floor(el.currentTime / c.frame);
  return c.env[Math.min(c.env.length - 1, Math.max(0, i))] || 0;
}
