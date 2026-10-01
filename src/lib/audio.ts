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
 * Standard native browser speech synthesis fallback with female teacher voice prioritization
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
  utterance.pitch = 1.15; // Feminine, warm teacher tone

  try {
    const voices = window.speechSynthesis.getVoices();
    const langPrefix = lang === "en" ? "en" : "ar";
    const matchingVoices = voices.filter(v => v.lang.toLowerCase().startsWith(langPrefix));

    const femaleVoice = matchingVoices.find(v => {
      const name = v.name.toLowerCase();
      return name.includes("female") ||
             name.includes("laila") ||
             name.includes("salma") ||
             name.includes("hoda") ||
             name.includes("zeina") ||
             name.includes("maryam") ||
             name.includes("samantha") ||
             name.includes("zira") ||
             name.includes("jenny") ||
             name.includes("kore");
    }) || matchingVoices[0];

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

/**
 * Main Premium TTS function
 * Fetches high-definition female audio from Gemini ('Kore') and plays it, with smooth native backup.
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

  try {
    const response = await fetch("/api/tts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: cleanText, lang, voiceName })
    });

    // Check if superseded while awaiting network response
    if (requestId !== globalSpeechRequestId) {
      return { stop: () => {} };
    }

    if (!response.ok) {
      throw new Error(`TTS server responded with ${response.status}`);
    }

    const data = await response.json();
    if (!data || !data.audio) {
      throw new Error("No readable audio returned from TTS endpoint");
    }

    // Check again if superseded before playing
    if (requestId !== globalSpeechRequestId) {
      return { stop: () => {} };
    }

    const player = await playAudioBuffer(data.audio, onEnd, playbackRate);
    if (player && requestId === globalSpeechRequestId) {
      currentPlayingNode = player;
      return player;
    } else {
      throw new Error("Audio buffer play returned null");
    }
  } catch (error) {
    // If superseded by a newer call, don't play fallback
    if (requestId !== globalSpeechRequestId) {
      return { stop: () => {} };
    }

    console.warn("Falling back to local browser synthesis:", error);
    const fallback = playNativeFallback(cleanText, lang, onEnd, playbackRate);
    currentPlayingNode = fallback;
    return fallback;
  }
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
    const player = await playAudioBuffer(base64Audio, onEnd, playbackRate);
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

