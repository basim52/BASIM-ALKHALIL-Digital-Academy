/**
 * Basim Alkhalil Academic Platform - Unified Speech Engine
 * Ultra-high fidelity Gemini TTS with resilient fallback.
 */

let globalSpeechRequestId = 0;
let currentPlayingNode: { stop: () => void } | null = null;
let activeUtterances: SpeechSynthesisUtterance[] = [];
let sharedAudioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!sharedAudioContext || sharedAudioContext.state === 'closed') {
    sharedAudioContext = new AudioContextClass();
  }
  if (sharedAudioContext.state === 'suspended') {
    sharedAudioContext.resume().catch(() => {});
  }
  return sharedAudioContext;
}

/**
 * Stop any active speech, whether premium Gemini TTS or native offline speech
 */
export const cancelAllSpeech = () => {
  // Invalidate any in-flight network requests immediately
  globalSpeechRequestId++;

  if (currentPlayingNode) {
    try {
      currentPlayingNode.stop();
    } catch (e) {
      console.debug("Error stopping active audio unit:", e);
    }
    currentPlayingNode = null;
  }

  // Suspend shared AudioContext immediately to silence any active hardware audio buffer
  if (sharedAudioContext && sharedAudioContext.state === 'running') {
    try {
      sharedAudioContext.suspend().catch(() => {});
    } catch (e) {}
  }

  if (typeof window !== "undefined") {
    // Pause any HTMLAudioElements playing on the page
    try {
      const audioElements = document.querySelectorAll('audio');
      audioElements.forEach(el => {
        try {
          el.pause();
          el.currentTime = 0;
        } catch (e) {}
      });
    } catch (e) {}

    // Cancel browser native speech synthesis
    if (window.speechSynthesis) {
      try {
        window.speechSynthesis.pause();
        window.speechSynthesis.cancel();
      } catch (e) {
        console.debug("Error stopping native synthesis:", e);
      }
      activeUtterances = [];
    }
  }
};

/**
 * Decodes base64 string directly into an ArrayBuffer
 */
function base64ToArrayBuffer(base64: string): ArrayBuffer {
  if (typeof window === "undefined") return new ArrayBuffer(0);
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * Unlocks audio contexts and allows autoplay on mobile Chrome / Safari
 */
let audioContextUnlocked = false;
export function unlockAudioForMobile() {
  if (typeof window === "undefined" || audioContextUnlocked) return;
  audioContextUnlocked = true;
  try {
    const ctx = getAudioContext();
    if (ctx && ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
  } catch (_) {}
}

if (typeof window !== "undefined") {
  const unlockEvents = ["click", "touchstart", "keydown"];
  const handleInitialUserGesture = () => {
    unlockAudioForMobile();
    unlockEvents.forEach((ev) => window.removeEventListener(ev, handleInitialUserGesture));
  };
  unlockEvents.forEach((ev) => window.addEventListener(ev, handleInitialUserGesture, { passive: true }));
}

/**
 * Plays decoded audio (WAV / PCM) reliably across all platforms (Android Chrome, iOS Safari, Desktop).
 * Uses HTML5 Audio with Blob URL as primary (native hardware accelerated, zero detached buffer issues),
 * with resilient Web Audio API fallback.
 */
async function playAudioSource(
  base64: string,
  onEnd?: () => void,
  playbackRate: number = 1.0
): Promise<{ stop: () => void } | null> {
  if (typeof window === "undefined") return null;

  try {
    // 1. Try HTML5 Audio with Blob URL (Universal Android Chrome & iOS compatibility)
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: "audio/wav" });
    const audioUrl = URL.createObjectURL(blob);
    const audio = new Audio();
    audio.src = audioUrl;
    audio.preload = "auto";
    if (playbackRate && playbackRate > 0) {
      audio.playbackRate = playbackRate;
    }

    let isFinished = false;
    const cleanup = () => {
      if (isFinished) return;
      isFinished = true;
      try {
        audio.pause();
        audio.removeAttribute("src");
        audio.load();
      } catch (_) {}
      try {
        URL.revokeObjectURL(audioUrl);
      } catch (_) {}
      if (currentPlayingNode?.stop) {
        currentPlayingNode = null;
      }
    };

    audio.onended = () => {
      cleanup();
      onEnd?.();
    };

    audio.onerror = () => {
      cleanup();
      // Try Web Audio API fallback
      playAudioBuffer(base64, onEnd, playbackRate);
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      await playPromise;
    }

    return {
      stop: () => {
        cleanup();
      }
    };
  } catch (html5Err) {
    console.debug("HTML5 audio playback failed, falling back to Web Audio API:", html5Err);
    return playAudioBuffer(base64, onEnd, playbackRate);
  }
}

/**
 * Plays decoded audio buffer (WAV / PCM) cleanly via Web Audio API
 */
async function playAudioBuffer(
  base64: string,
  onEnd?: () => void,
  playbackRate: number = 1.0
): Promise<{ stop: () => void } | null> {
  if (typeof window === "undefined") return null;

  const audioCtx = getAudioContext();
  if (!audioCtx) return null;
  if (audioCtx.state === 'suspended') {
    try {
      await audioCtx.resume();
    } catch (_) {}
  }

  const buffer = base64ToArrayBuffer(base64);
  let audioBuffer: AudioBuffer | null = null;

  try {
    // Attempt standard browser decode (perfect for audio/wav from Gemini)
    // Make a copy of the slice because decodeAudioData detaches the buffer
    const copyBuffer = buffer.slice(0);
    audioBuffer = await new Promise<AudioBuffer>((resolve, reject) => {
      audioCtx.decodeAudioData(copyBuffer, resolve, reject);
    });
  } catch (decodeErr) {
    // Fallback: If decodeAudioData fails (e.g. raw 24kHz 16-bit PCM), decode manually
    try {
      const int16Data = new Int16Array(buffer);
      const numSamples = int16Data.length;
      audioBuffer = audioCtx.createBuffer(1, numSamples, 24000);
      const channelData = audioBuffer.getChannelData(0);
      for (let i = 0; i < numSamples; i++) {
        channelData[i] = int16Data[i] / 32768.0;
      }
    } catch (manualErr) {
      console.warn("Both decodeAudioData and raw PCM parse failed:", manualErr);
      return null;
    }
  }

  if (!audioBuffer) return null;

  try {
    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    if (playbackRate && playbackRate > 0) {
      source.playbackRate.value = playbackRate;
    }
    source.connect(audioCtx.destination);

    let isFinished = false;

    source.onended = () => {
      if (isFinished) return;
      isFinished = true;
      if (currentPlayingNode?.stop) {
        currentPlayingNode = null;
      }
      onEnd?.();
    };

    source.start(0);

    return {
      stop: () => {
        if (isFinished) return;
        isFinished = true;
        try {
          source.stop();
        } catch (e) {}
      }
    };
  } catch (err) {
    console.warn("Error starting AudioBuffer source:", err);
    return null;
  }
}

/**
 * Standard native browser speech synthesis fallback with strictly feminine teacher pitch & voice selection
 */
function playNativeFallback(
  text: string,
  lang: "en" | "ar",
  onEnd?: () => void,
  playbackRate: number = 1.0
): { stop: () => void } {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    onEnd?.();
    return { stop: () => {} };
  }

  try {
    window.speechSynthesis.cancel();
  } catch (err) {}

  const utterance = new SpeechSynthesisUtterance(text);
  activeUtterances.push(utterance);

  utterance.lang = lang === "en" ? "en-US" : "ar-SA";
  utterance.rate = (lang === "en" ? 0.95 : 0.95) * playbackRate;
  // Feminine, cheerful teacher tone: Higher pitch ensures it never sounds like a low default robot
  utterance.pitch = 1.35;

  try {
    const voices = window.speechSynthesis.getVoices();
    const langPrefix = lang === "en" ? "en" : "ar";
    const matchingVoices = voices.filter(v => v.lang.toLowerCase().startsWith(langPrefix));

    const femaleVoice = matchingVoices.find(v => {
      const name = v.name.toLowerCase();
      return name.includes("female") ||
             name.includes("sara") ||
             name.includes("laila") ||
             name.includes("salma") ||
             name.includes("hoda") ||
             name.includes("zeina") ||
             name.includes("maryam") ||
             name.includes("samantha") ||
             name.includes("zira") ||
             name.includes("jenny") ||
             name.includes("kore");
    }) || matchingVoices.find(v => !v.name.toLowerCase().includes("male")) || matchingVoices[0];

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
  } catch (e) {
    console.debug("Voice selection lookup:", e);
  }

  utterance.onend = () => {
    activeUtterances = activeUtterances.filter(u => u !== utterance);
    if (currentPlayingNode?.stop) {
      currentPlayingNode = null;
    }
    onEnd?.();
  };

  utterance.onerror = (e) => {
    activeUtterances = activeUtterances.filter(u => u !== utterance);
    if (currentPlayingNode?.stop) {
      currentPlayingNode = null;
    }
    console.debug("Native speech ended with exception indicator:", e);
    onEnd?.();
  };

  window.speechSynthesis.speak(utterance);

  return {
    stop: () => {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
      activeUtterances = activeUtterances.filter(u => u !== utterance);
    }
  };
}

// Memory cache for TTS audio chunks to provide zero-latency instant speech on page turns
const ttsAudioCache = new Map<string, string>();
const inFlightPrefetch = new Map<string, Promise<string | null>>();
let clientTtsCooldownUntil = 0;

/**
 * Prefetches and caches audio in the background before the student turns the slide page
 */
export const prefetchAcademyAudio = async (
  text: string,
  lang: "en" | "ar",
  voiceName: string = "Kore"
): Promise<string | null> => {
  if (Date.now() < clientTtsCooldownUntil) return null;

  const cleanText = text
    .replace(/[*#_`~>]/g, "")
    .replace(/\[.*?\]\(.*?\)/g, "")
    .trim();

  if (!cleanText) return null;
  const cacheKey = `${lang}:${voiceName || "Kore"}:${cleanText}`;
  if (ttsAudioCache.has(cacheKey)) {
    return ttsAudioCache.get(cacheKey)!;
  }

  if (inFlightPrefetch.has(cacheKey)) {
    return inFlightPrefetch.get(cacheKey)!;
  }

  const fetchPromise = (async () => {
    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: cleanText, lang, voiceName: voiceName || "Kore" })
      });
      if (response.ok) {
        const data = await response.json();
        if (data && data.audio) {
          ttsAudioCache.set(cacheKey, data.audio);
          return data.audio as string;
        }
        if (data?.rateLimited) {
          clientTtsCooldownUntil = Date.now() + 50000;
        }
      } else if (response.status === 429) {
        clientTtsCooldownUntil = Date.now() + 50000;
      }
    } catch (_) {}
    return null;
  })();

  inFlightPrefetch.set(cacheKey, fetchPromise);
  try {
    const res = await fetchPromise;
    return res;
  } finally {
    inFlightPrefetch.delete(cacheKey);
  }
};

/**
 * Main Premium TTS function
 * Fetches high-definition female audio from Gemini ('Kore') and plays it with automatic retries.
 * Strictly maintains Sara's real voice without switching to default system robot.
 */
export const speakAcademyText = async (
  text: string,
  lang: "en" | "ar",
  onStart?: () => void,
  onEnd?: () => void,
  voiceName: string = "Kore",
  playbackRate: number = 1.0
): Promise<{ stop: () => void }> => {
  // Cancel active playback sessions and record request ID
  cancelAllSpeech();
  const requestId = ++globalSpeechRequestId;

  // Strip Markdown tags from text to have clean speech reading
  const cleanText = text
    .replace(/[*#_`~>]/g, "")
    .replace(/\[.*?\]\(.*?\)/g, "")
    .trim();

  if (!cleanText) {
    onEnd?.();
    return { stop: () => {} };
  }

  onStart?.();

  // 1. Instant Cache Hit: Zero Network Delay
  const cacheKey = `${lang}:${voiceName || "Kore"}:${cleanText}`;
  if (ttsAudioCache.has(cacheKey)) {
    const cachedAudio = ttsAudioCache.get(cacheKey)!;
    const player = await playAudioSource(cachedAudio, onEnd, playbackRate);
    if (player && requestId === globalSpeechRequestId) {
      currentPlayingNode = player;
      return player;
    }
  }

  // 1B. If under rate limit cooldown, use seamless feminine browser fallback immediately
  if (Date.now() < clientTtsCooldownUntil) {
    const fallback = playNativeFallback(cleanText, lang, onEnd, playbackRate);
    currentPlayingNode = fallback;
    return fallback;
  }

  // Retry up to 2 times for Sara's authentic Gemini voice before considering any fallback
  let lastError: any = null;
  for (let attempt = 0; attempt < 2; attempt++) {
    if (requestId !== globalSpeechRequestId) {
      return { stop: () => {} };
    }

    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: cleanText, lang, voiceName: voiceName || "Kore" })
      });

      if (requestId !== globalSpeechRequestId) {
        return { stop: () => {} };
      }

      if (response.status === 429) {
        clientTtsCooldownUntil = Date.now() + 50000;
        break; // Fast failover to native fallback without burning quota
      }

      if (!response.ok) {
        throw new Error(`TTS server error ${response.status}`);
      }

      const data = await response.json();
      if (data?.rateLimited) {
        clientTtsCooldownUntil = Date.now() + 50000;
        break;
      }

      if (!data || !data.audio) {
        throw new Error("No readable audio returned from TTS");
      }

      if (requestId !== globalSpeechRequestId) {
        return { stop: () => {} };
      }

      // Store in memory cache for subsequent instant replays
      ttsAudioCache.set(cacheKey, data.audio);

      const player = await playAudioSource(data.audio, onEnd, playbackRate);
      if (player && requestId === globalSpeechRequestId) {
        currentPlayingNode = player;
        return player;
      }
    } catch (err: any) {
      lastError = err;
      if (err.message?.includes("429") || err.message?.includes("RESOURCE_EXHAUSTED")) {
        clientTtsCooldownUntil = Date.now() + 50000;
        break;
      }
      if (attempt === 0) {
        await new Promise((r) => setTimeout(r, 200));
      }
    }
  }

  // If superseded by a newer call, don't play anything
  if (requestId !== globalSpeechRequestId) {
    return { stop: () => {} };
  }

  console.warn("Sara voice network retries exhausted, activating resilient fallback:", lastError);
  const fallback = playNativeFallback(cleanText, lang, onEnd, playbackRate);
  currentPlayingNode = fallback;
  return fallback;
};

/**
 * Instant Audio Player: Plays pre-rendered studio base64 audio directly (zero network latency)
 */
export const playDirectSaraAudio = async (
  base64Audio: string,
  onStart?: () => void,
  onEnd?: () => void,
  playbackRate: number = 1.0
): Promise<{ stop: () => void }> => {
  cancelAllSpeech();
  const requestId = ++globalSpeechRequestId;
  onStart?.();

  try {
    const player = await playAudioSource(base64Audio, onEnd, playbackRate);
    if (player && requestId === globalSpeechRequestId) {
      currentPlayingNode = player;
      return player;
    }
  } catch (err) {
    console.warn("Direct audio buffer playback error:", err);
  }
  onEnd?.();
  return { stop: () => {} };
};

/**
 * Play a gentle, clear academic school bell chime to signal the end of a lesson
 */
export const playSchoolBellChime = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  // Harmonious school bell sequence (E5 -> C5 -> G5 -> C6)
  const notes = [
    { freq: 659.25, time: 0.0, dur: 1.1 }, // E5
    { freq: 523.25, time: 0.35, dur: 1.3 }, // C5
    { freq: 783.99, time: 0.7, dur: 1.5 }, // G5
    { freq: 1046.50, time: 1.05, dur: 2.0 } // C6
  ];

  notes.forEach(({ freq, time, dur }) => {
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + time);
      
      // Bell envelope: sharp attack, gentle musical decay
      gain.gain.setValueAtTime(0.0001, now + time);
      gain.gain.exponentialRampToValueAtTime(0.25, now + time + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + time);
      osc.stop(now + time + dur + 0.1);
    } catch (e) {
      // AudioContext issue or suspended
    }
  });
};

/**
 * Play a delightful, crisp camera snapshot chime when saving the whiteboard image
 */
export const playSnapshotShutterSound = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    
    // Quick camera shutter click (burst of shaped white noise)
    const bufferSize = ctx.sampleRate * 0.04;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1200, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.18, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    whiteNoise.start(now);

    // Followed by a sparkling chime (C6 -> G6)
    const tones = [
      { freq: 1046.50, time: 0.05, dur: 0.25 }, // C6
      { freq: 1567.98, time: 0.12, dur: 0.35 }  // G6
    ];

    tones.forEach(({ freq, time, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + time);
      gain.gain.setValueAtTime(0.001, now + time);
      gain.gain.exponentialRampToValueAtTime(0.12, now + time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + time);
      osc.stop(now + time + dur);
    });
  } catch (e) {
    // Ignore if audio context cannot play
  }
};

/**
 * 🎬 Basim Al Khalil Digital Academy Intro Theme (موسيقى افتتاح الأكاديمية مثل نتفلكس)
 * Synthesizes a cinematic "Ta-Dum" orchestral fanfare:
 * 1. Punchy cinematic transient strike at t=0 ("Ta")
 * 2. Deep sub-bass cinematic boom at t=0.16s ("DUM")
 * 3. Blooming royal golden fifth chord (D2, A2, D3, F#3, A3, D4) with resonant filter sweep
 * 4. Shimmering golden harmonic sparkle tail over ~3 seconds
 */
export const playAcademyIntroSound = (volume: number = 0.85): Promise<void> => {
  return new Promise((resolve) => {
    try {
      const ctx = getAudioContext();
      if (!ctx) {
        resolve();
        return;
      }

      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(Math.min(1, Math.max(0, volume)), now);
      masterGain.connect(ctx.destination);

      // --- 1. Strike 1: "Ta" (t = 0.0s) - Crisp percussive attack & mid impact ---
      const strike1Osc = ctx.createOscillator();
      const strike1Gain = ctx.createGain();
      strike1Osc.type = 'triangle';
      strike1Osc.frequency.setValueAtTime(110, now);
      strike1Osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);
      strike1Gain.gain.setValueAtTime(0.45, now);
      strike1Gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      strike1Osc.connect(strike1Gain);
      strike1Gain.connect(masterGain);
      strike1Osc.start(now);
      strike1Osc.stop(now + 0.15);

      // --- 2. Strike 2: "DUM" (t = 0.16s) - Powerful sub-bass cinematic boom ---
      const hitTime = now + 0.16;

      // Sub-bass heavy punch (38Hz -> 75Hz punch, decaying gracefully)
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(95, hitTime);
      subOsc.frequency.exponentialRampToValueAtTime(42, hitTime + 0.25);
      subGain.gain.setValueAtTime(0.7, hitTime);
      subGain.gain.exponentialRampToValueAtTime(0.001, hitTime + 1.8);
      subOsc.connect(subGain);
      subGain.connect(masterGain);
      subOsc.start(hitTime);
      subOsc.stop(hitTime + 2.0);

      // Timpani body / warm mid-low presence
      const timpaniOsc = ctx.createOscillator();
      const timpaniGain = ctx.createGain();
      timpaniOsc.type = 'triangle';
      timpaniOsc.frequency.setValueAtTime(146.83, hitTime); // D3
      timpaniOsc.frequency.exponentialRampToValueAtTime(73.42, hitTime + 0.4);
      timpaniGain.gain.setValueAtTime(0.5, hitTime);
      timpaniGain.gain.exponentialRampToValueAtTime(0.001, hitTime + 1.2);
      timpaniOsc.connect(timpaniGain);
      timpaniGain.connect(masterGain);
      timpaniOsc.start(hitTime);
      timpaniOsc.stop(hitTime + 1.3);

      // --- 3. Royal Golden Academy Blooming Chord (D Major / Majestic 5th) ---
      // Notes: D2 (73.4Hz), A2 (110Hz), D3 (146.8Hz), F#3 (185.0Hz), A3 (220Hz), D4 (293.7Hz)
      const chordFreqs = [73.42, 110.0, 146.83, 185.0, 220.0, 293.66];
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(260, hitTime);
      filter.frequency.exponentialRampToValueAtTime(3200, hitTime + 0.45);
      filter.frequency.exponentialRampToValueAtTime(600, hitTime + 2.8);
      filter.Q.setValueAtTime(2.5, hitTime);
      filter.connect(masterGain);

      chordFreqs.forEach((freq, idx) => {
        const chordOsc = ctx.createOscillator();
        const chordGain = ctx.createGain();
        chordOsc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
        chordOsc.frequency.setValueAtTime(freq, hitTime);

        // Gentle detuning for lush stereo cinematic thickness
        chordOsc.detune.setValueAtTime((idx - 2.5) * 4, hitTime);

        const noteGain = 0.18 / Math.sqrt(chordFreqs.length);
        chordGain.gain.setValueAtTime(0.0001, hitTime);
        chordGain.gain.linearRampToValueAtTime(noteGain, hitTime + 0.12);
        chordGain.gain.exponentialRampToValueAtTime(0.0001, hitTime + 2.7);

        chordOsc.connect(chordGain);
        chordGain.connect(filter);

        chordOsc.start(hitTime);
        chordOsc.stop(hitTime + 2.8);
      });

      // --- 4. Golden Sparkle Shimmer (Cinematic magical fairy dust / bells) ---
      const sparkleTones = [
        { f: 1174.66, delay: 0.18, dur: 0.9 }, // D6
        { f: 1479.98, delay: 0.28, dur: 1.1 }, // F#6
        { f: 1760.00, delay: 0.38, dur: 1.3 }, // A6
        { f: 2349.32, delay: 0.48, dur: 1.8 }  // D7
      ];

      sparkleTones.forEach(({ f, delay, dur }) => {
        const sOsc = ctx.createOscillator();
        const sGain = ctx.createGain();
        const t = now + delay;
        sOsc.type = 'sine';
        sOsc.frequency.setValueAtTime(f, t);
        sGain.gain.setValueAtTime(0.0001, t);
        sGain.gain.exponentialRampToValueAtTime(0.08, t + 0.03);
        sGain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        sOsc.connect(sGain);
        sGain.connect(masterGain);
        sOsc.start(t);
        sOsc.stop(t + dur + 0.05);
      });

      setTimeout(() => {
        resolve();
      }, 2800);
    } catch (e) {
      resolve();
    }
  });
};

