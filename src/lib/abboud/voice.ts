import { createManagedAudio, managedSpeak, unlockAudioForMobile } from '../audio';
import type { Speaker } from './protocol';
/** `voiceName` (optional, live class only) overrides the speaker's own voice, e.g. Abboud's TTS fallback. */
export type VoiceTurn = { speaker: Speaker; text: string; voiceName?: string };
/**
 * Each speaker's own Gemini voice. They must be in the server's ALLOWED_VOICES (src/server/routes.ts):
 * any other name is silently replaced by Sara's «Kore», which is how Badr («Puck») used to speak in Sara's voice.
 * Badr: a male voice; Reem: an upbeat female voice different from Sara's.
 */
export const SPEAKER_VOICES: Record<Speaker, string> = { badr: 'Orus', reem: 'Laomedeia', sara: 'Kore' };
const voices = SPEAKER_VOICES;
/** Browser-voice fallback (TTS quota/outage): a different installed voice per speaker when possible, and the
 *  children always at a higher pitch than Sara, so Badr and Reem never sound like her. */
export const BROWSER_VOICE: Record<Speaker, { index: number; pitch: number }> = { sara: { index: 0, pitch: 1 }, badr: { index: 1, pitch: 1.2 }, reem: { index: 2, pitch: 1.4 } };

/** Activity-owned queue: completion means ended, not merely a fulfilled TTS fetch. */
export class ClassroomVoice {
  private generation = 0;
  private audioCache = new Map<string, string>();
  private nativeReplay = new Set<string>();
  private controller: AbortController | null = null;
  private audio: HTMLAudioElement | null = null;
  private utterance: SpeechSynthesisUtterance | null = null;
  private release: (() => void) | null = null;
  private url: string | null = null;
  unlock() { unlockAudioForMobile(); }
  stop() {
    this.generation++;
    this.controller?.abort();
    this.controller = null;
    if (this.audio) { this.audio.onplaying = null; this.audio.onended = null; this.audio.onerror = null; this.audio.pause(); this.audio.removeAttribute('src'); this.audio.load(); }
    if (this.utterance) { this.utterance.onend = null; this.utterance.onerror = null; window.speechSynthesis?.cancel(); this.utterance = null; }
    if (this.url) { URL.revokeObjectURL(this.url); this.url = null; }
    this.release?.(); this.release = null;
  }
  async play(turns: VoiceTurn[], active: (speaker: Speaker | null) => void, fallback: () => void) {
    this.stop();
    const generation = this.generation;
    const controller = new AbortController(); this.controller = controller;
    try {
      for (const turn of turns) {
        if (generation !== this.generation) return;
        const lang = /[\u0600-\u06ff]/.test(turn.text) ? 'ar' : 'en';
        const cacheKey = `${(turn.voiceName || voices[turn.speaker])}:${lang}:${turn.text}`;
        let audio = this.audioCache.get(cacheKey) || null;
        // Cached replay reaches audio.play() synchronously inside the user's click, with no new TTS await.
        if (!audio && !this.nativeReplay.has(cacheKey)) {
          const fetchTimeout = setTimeout(() => controller.abort(), 15000);
          try {
            const response = await fetch('/api/tts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: controller.signal, body: JSON.stringify({ text: turn.text, lang, voiceName: (turn.voiceName || voices[turn.speaker]) }) });
            const data: unknown = await response.json();
            if (response.ok && typeof data === 'object' && data !== null && 'audio' in data && typeof data.audio === 'string' && data.audio.length > 0) {
              audio = data.audio;
              if (generation === this.generation) {
                if (this.audioCache.size >= 8) { const oldest = this.audioCache.keys().next().value; if (oldest) this.audioCache.delete(oldest); }
                this.audioCache.set(cacheKey, audio);
              }
            }
          } catch {
            if (generation !== this.generation) return;
            if (controller.signal.aborted) throw new Error('TTS_TIMEOUT');
          } finally { clearTimeout(fetchTimeout); }
        }
        if (generation !== this.generation) return;
        if (!audio) {
          if (this.nativeReplay.size >= 8) { const oldest = this.nativeReplay.values().next().value; if (oldest) this.nativeReplay.delete(oldest); }
          this.nativeReplay.add(cacheKey);
          fallback();
        }
        await new Promise<void>((resolve, reject) => {
          let settled = false;
          const finish = (error?: Error) => {
            if (settled) return; settled = true; clearTimeout(timer); this.release = null;
            if (this.url) { URL.revokeObjectURL(this.url); this.url = null; }
            active(null); error ? reject(error) : resolve();
          };
          // Only a playback watchdog, never a lesson deadline or completion signal.
          const timer = setTimeout(() => finish(new Error('AUDIO_TIMEOUT')), 45000);
          this.release = () => finish();
          if (audio) {
            try {
              const bytes = Uint8Array.from(atob(audio), c => c.charCodeAt(0));
              this.url = URL.createObjectURL(new Blob([bytes], { type: 'audio/wav' }));
              this.audio ||= createManagedAudio();
              this.audio.onplaying = () => active(turn.speaker);
              this.audio.onended = () => finish();
              this.audio.onerror = () => finish(new Error('AUDIO_FAILED'));
              this.audio.src = this.url;
              this.audio.play().catch(() => finish(new Error('AUDIO_BLOCKED')));
            } catch { finish(new Error('AUDIO_FAILED')); }
          } else if (window.speechSynthesis && typeof SpeechSynthesisUtterance !== 'undefined') {
            const u = new SpeechSynthesisUtterance(turn.text); this.utterance = u;
            u.lang = lang === 'ar' ? 'ar-SA' : 'en-US';
            const available = window.speechSynthesis.getVoices().filter(v => v.lang.startsWith(lang));
            const own = BROWSER_VOICE[turn.speaker];
            u.voice = available.length ? available[own.index % available.length] : null;
            u.pitch = own.pitch;
            u.onstart = () => active(turn.speaker);
            u.onend = () => { this.utterance = null; finish(); };
            u.onerror = () => { this.utterance = null; finish(new Error('AUDIO_FAILED')); };
            managedSpeak(u);
          } else finish(new Error('AUDIO_UNSUPPORTED'));
        });
      }
    } finally {
      if (generation === this.generation) { this.stop(); active(null); }
    }
  }
}
