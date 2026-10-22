/**
 * Read-only speech loudness for avatar lip-sync. The TTS WAV bytes are decoded into a small amplitude envelope
 * (no WebAudio routing, so playback is never affected); while that audio element plays, getSpeechLevel() returns
 * the envelope value at its currentTime (0..1). Returns -1 when no tracked speech is playing.
 */
const RATE = 60; // envelope samples per second
let active: { el: HTMLMediaElement; env: Float32Array } | null = null;

export function envelopeFromWav(bytes: Uint8Array): Float32Array | null {
  try {
    const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    const tag = (o: number) => String.fromCharCode(bytes[o], bytes[o + 1], bytes[o + 2], bytes[o + 3]);
    let sampleRate = 24000, channels = 1, bits = 16, dataOff = -1, dataLen = 0;
    if (tag(0) === 'RIFF' && tag(8) === 'WAVE') {
      let o = 12;
      while (o + 8 <= bytes.length) {
        const id = tag(o), len = dv.getUint32(o + 4, true);
        if (id === 'fmt ') { channels = dv.getUint16(o + 10, true); sampleRate = dv.getUint32(o + 12, true); bits = dv.getUint16(o + 22, true); }
        if (id === 'data') { dataOff = o + 8; dataLen = Math.min(len, bytes.length - dataOff); break; }
        o += 8 + len + (len & 1);
      }
    } else return null; // not a PCM WAV (e.g. MP3): avatar falls back to a speaking rhythm
    if (dataOff < 0 || bits !== 16) return null;
    const frame = 2 * channels, n = Math.floor(dataLen / frame), per = Math.max(1, Math.floor(sampleRate / RATE));
    const env = new Float32Array(Math.ceil(n / per));
    let peak = 1e-6;
    for (let i = 0; i < env.length; i++) {
      let s = 0, c = 0;
      for (let j = i * per; j < Math.min(n, (i + 1) * per); j += 4) { const v = dv.getInt16(dataOff + j * frame, true) / 32768; s += v * v; c++; }
      env[i] = Math.sqrt(s / Math.max(1, c)); if (env[i] > peak) peak = env[i];
    }
    for (let i = 0; i < env.length; i++) env[i] = Math.min(1, env[i] / (peak * 0.7));
    return env;
  } catch { return null; }
}
let playingEl: HTMLMediaElement | null = null;
let bufferPlaying = 0;
/** True only while real speech audio is actually playing (audio 'playing' event, or a running Web Audio buffer). */
export function isSpeechPlaying(): boolean {
  if (bufferPlaying > 0) return true;
  const e = playingEl; return !!e && !e.paused && !e.ended;
}
export function markBufferSpeech(on: boolean) { bufferPlaying = Math.max(0, bufferPlaying + (on ? 1 : -1)); }
export function watchSpeechElement(el: HTMLMediaElement) {
  el.addEventListener('playing', () => { playingEl = el; });
  const off = () => { if (playingEl === el) playingEl = null; };
  el.addEventListener('pause', off); el.addEventListener('ended', off); el.addEventListener('error', off); el.addEventListener('emptied', off);
}
export function trackSpeech(el: HTMLMediaElement, bytes: Uint8Array) {
  setTimeout(() => { const env = envelopeFromWav(bytes); if (!env) return; active = { el, env }; }, 0); // off the playback critical path
  const clear = () => { if (active?.el === el) active = null; };
  el.addEventListener('ended', clear, { once: true }); el.addEventListener('pause', clear, { once: true });
}
export function getSpeechLevel(): number {
  const a = active; if (!a || a.el.paused || a.el.ended) return -1;
  const i = Math.floor(a.el.currentTime * RATE);
  return i < a.env.length ? a.env[i] : 0;
}
