import { createManagedAudio, managedSpeak, unlockAudioForMobile } from '../audio';
import type { Speaker } from './protocol';
export type VoiceTurn = { speaker: Speaker; text: string };
const voices = { badr: 'Puck', reem: 'Aoede', sara: 'Kore' };

/** Activity-owned queue: completion means ended, not merely a fulfilled TTS fetch. */
export class ClassroomVoice {
  private generation = 0;
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
        let audio: string | null = null;
        const fetchTimeout = setTimeout(() => controller.abort(), 15000);
        try {
          const response = await fetch('/api/tts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: controller.signal, body: JSON.stringify({ text: turn.text, lang, voiceName: voices[turn.speaker] }) });
          const data: unknown = await response.json();
          if (response.ok && typeof data === 'object' && data !== null && 'audio' in data && typeof data.audio === 'string' && data.audio.length > 0) audio = data.audio;
        } catch {
          if (generation !== this.generation) return;
          if (controller.signal.aborted) throw new Error('TTS_TIMEOUT');
        } finally { clearTimeout(fetchTimeout); }
        if (generation !== this.generation) return;
        if (!audio) fallback();
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
            u.voice = available[turn.speaker === 'badr' && available.length > 1 ? 1 : 0] || null;
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
