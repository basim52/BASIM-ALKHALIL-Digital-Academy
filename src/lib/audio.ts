/**
 * Basim Alkhalil Academic Platform - Unified Speech Engine
 * Features Ultra-high fidelity Gemini 3.1 TTS ('gemini-3.1-flash-tts-preview')
 * and seamless local SpeechSynthesis fallback.
 */

let currentPlayingNode: { stop: () => void } | null = null;

/**
 * Stop any active speech, whether premium Gemini TTS or native offline speech
 */
export const cancelAllSpeech = () => {
  if (currentPlayingNode) {
    try {
      currentPlayingNode.stop();
    } catch (e) {
      console.debug("Error stopping active audio unit:", e);
    }
    currentPlayingNode = null;
  }
  if (typeof window !== "undefined" && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      console.debug("Error stopping native synthesis:", e);
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
 * Plays raw linear 16-bit PCM mono audio data at 24000Hz (native Gemini TTS format)
 */
function playPCM24k(
  base64: string,
  onEnd?: () => void,
  onError?: (err: any) => void
): { stop: () => void } | null {
  if (typeof window === "undefined") return null;
  
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) {
      throw new Error("Web Audio API is not supported in this browser environment.");
    }
    
    const audioCtx = new AudioContextClass();
    const buffer = base64ToArrayBuffer(base64);
    
    // Int16Array reads the 16-bit PCM integer samples
    const int16Data = new Int16Array(buffer);
    const numSamples = int16Data.length;
    
    // Create mono audio channel at 24,000Hz (the sampling rate of gemini-3.1-flash-tts-preview)
    const audioBuffer = audioCtx.createBuffer(1, numSamples, 24000);
    const channelData = audioBuffer.getChannelData(0);
    
    // Convert 16-bit integer raw samples to normalized float range (-1.0 to 1.0)
    for (let i = 0; i < numSamples; i++) {
      channelData[i] = int16Data[i] / 32768.0;
    }
    
    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioCtx.destination);
    
    let isFinished = false;
    
    source.onended = () => {
      if (isFinished) return;
      isFinished = true;
      onEnd?.();
      // Safe context closure to save browser audio channels
      audioCtx.close().catch(() => {});
    };
    
    source.start(0);
    
    return {
      stop: () => {
        if (isFinished) return;
        isFinished = true;
        try {
          source.stop();
        } catch (e) {}
        audioCtx.close().catch(() => {});
      }
    };
  } catch (err) {
    onError?.(err);
    return null;
  }
}

/**
 * Standard native browser speech synthesis fallback
 */
function playNativeFallback(
  text: string,
  lang: "en" | "ar",
  onEnd?: () => void
): { stop: () => void } {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    onEnd?.();
    return { stop: () => {} };
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang === "en" ? "en-US" : "ar-SA";
  utterance.rate = 0.95;

  utterance.onend = () => {
    onEnd?.();
  };

  utterance.onerror = (e) => {
    console.debug("Native speech ended with exception indicator:", e);
    onEnd?.();
  };

  window.speechSynthesis.speak(utterance);

  return {
    stop: () => {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
  };
}

/**
 * Main Premium TTS function
 * Fetches high-definition audio from Gemini and plays it, with smooth native backup.
 */
export const speakAcademyText = async (
  text: string,
  lang: "en" | "ar",
  onStart?: () => void,
  onEnd?: () => void
): Promise<{ stop: () => void }> => {
  // Cancel active playback sessions
  cancelAllSpeech();
  
  onStart?.();

  // Strip Markdown tags from text to have clean speech reading
  const cleanText = text
    .replace(/[*#_`~>]/g, "") // remove Markdown formats
    .replace(/\[.*?\]\(.*?\)/g, "") // remove links
    .trim();

  try {
    const response = await fetch("/api/tts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: cleanText, lang })
    });

    if (!response.ok) {
      throw new Error(`Premium speech request failed with status ${response.status}`);
    }

    const data = await response.json();
    if (!data || !data.audio) {
      throw new Error("No readable audio vector returned from advanced Gemini speech server.");
    }

    const player = playPCM24k(data.audio, onEnd, (err) => {
      console.warn("Premium TTS pipeline playback error; shifting back to local system voice", err);
      const fallback = playNativeFallback(cleanText, lang, onEnd);
      currentPlayingNode = fallback;
    });

    if (player) {
      currentPlayingNode = player;
      return player;
    } else {
      throw new Error("Failed to prepare premium play channel.");
    }
  } catch (error) {
    console.warn("Could not load high fidelity online voice; playing through offline default fallback", error);
    const fallback = playNativeFallback(cleanText, lang, onEnd);
    currentPlayingNode = fallback;
    return fallback;
  }
};
