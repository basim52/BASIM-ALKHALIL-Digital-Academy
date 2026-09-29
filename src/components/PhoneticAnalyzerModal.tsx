import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw,
  Award,
  Zap,
  HelpCircle,
  Play,
  Flame,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { speakAcademyText, cancelAllSpeech } from '../lib/audio';

interface PhoneticAnalyzerModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetSentence: string;
  isRtl: boolean;
  onSuccessXP?: (xp: number) => void;
}

interface TrickySoundTip {
  phoneme: string;
  nameAr: string;
  nameEn: string;
  tipAr: string;
  tipEn: string;
  example: string;
}

const COMMON_TRICKY_SOUNDS: TrickySoundTip[] = [
  {
    phoneme: '/p/',
    nameAr: 'حرف P (الانفجاري)',
    nameEn: 'Unvoiced /p/',
    tipAr: 'احبس الهواء خلف شفتيك وافتحهما بدفعة هواء ملحوظة (ضع ورقة أمام فمك لتتحرك).',
    tipEn: 'Release air with a gentle puff. Don’t vibrate your vocal cords like /b/.',
    example: 'pen, practice, passport'
  },
  {
    phoneme: '/θ/ - /ð/',
    nameAr: 'صوت TH (اللثوي)',
    nameEn: 'TH sound',
    tipAr: 'أخرج طرف لسانك قليلاً بين أسنانك العلوية والسفلية (مثل: Think أو This).',
    tipEn: 'Place the tip of your tongue gently between your front teeth.',
    example: 'thank, think, the, that'
  },
  {
    phoneme: '/r/',
    nameAr: 'حرف R (المعكوف)',
    nameEn: 'English /r/',
    tipAr: 'اثنِ لسانك إلى الخلف قليلاً دون أن يلمس سقف الحلق، واجعل شفتيك مستديرتين.',
    tipEn: 'Curl your tongue slightly back without touching the roof of your mouth.',
    example: 'red, right, ready'
  },
  {
    phoneme: '/v/',
    nameAr: 'حرف V (الشفهي السني)',
    nameEn: 'Voiced /v/',
    tipAr: 'ضع أسنانك العلوية على شفتك السفلية واجعل حبالك الصوتية تهتز.',
    tipEn: 'Top teeth rest gently on bottom lip with vocal cord vibration.',
    example: 'very, visit, travel'
  }
];

export const PhoneticAnalyzerModal: React.FC<PhoneticAnalyzerModalProps> = ({
  isOpen,
  onClose,
  targetSentence,
  isRtl,
  onSuccessXP
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [analyzedWords, setAnalyzedWords] = useState<{ word: string; status: 'perfect' | 'good' | 'retry' }[]>([]);
  const [saraCoaching, setSaraCoaching] = useState<string>('');
  const [isPlayingReference, setIsPlayingReference] = useState(false);
  const [activePhonemeTip, setActivePhonemeTip] = useState<TrickySoundTip | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const recognitionRef = useRef<any>(null);

  // Clean the sentence
  const cleanTarget = targetSentence.trim() || 'Welcome to Basim Alkhalil Academy';

  // Detect which tricky sounds are in the sentence
  const detectedSounds = COMMON_TRICKY_SOUNDS.filter(s => {
    if (s.phoneme.includes('p') && /p/i.test(cleanTarget)) return true;
    if (s.phoneme.includes('th') && /th/i.test(cleanTarget)) return true;
    if (s.phoneme.includes('r') && /r/i.test(cleanTarget)) return true;
    if (s.phoneme.includes('v') && /v/i.test(cleanTarget)) return true;
    return false;
  });

  // Setup Web Speech Recognition
  useEffect(() => {
    if (!isOpen) return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setSpokenText(transcript);
      };

      recognition.onend = () => {
        setIsRecording(false);
        stopWaveformAnimation();
      };

      recognition.onerror = (err: any) => {
        console.warn('Speech recognition error in analyzer:', err);
        setIsRecording(false);
        stopWaveformAnimation();
      };

      recognitionRef.current = recognition;
    }

    return () => {
      stopRecording();
      cancelAllSpeech();
    };
  }, [isOpen]);

  // Evaluate spoken text against target when recording ends
  useEffect(() => {
    if (!isRecording && spokenText.trim().length > 0) {
      evaluatePronunciation(spokenText, cleanTarget);
    }
  }, [isRecording, spokenText]);

  // Audio Waveform Visualizer setup
  const startWaveformAnimation = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const drawWaveform = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        analyser.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Background subtle grid
        ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.2;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * canvas.height * 0.85;

          // Gradient color from Cyan to Gold
          const grad = ctx.createLinearGradient(0, canvas.height, 0, 0);
          grad.addColorStop(0, '#06B6D4');
          grad.addColorStop(0.5, '#F59E0B');
          grad.addColorStop(1, '#EF4444');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.roundRect(x, canvas.height - barHeight - 2, barWidth - 1.5, barHeight + 2, [3, 3, 0, 0]);
          ctx.fill();

          x += barWidth;
        }

        animFrameIdRef.current = requestAnimationFrame(drawWaveform);
      };

      drawWaveform();
    } catch (e) {
      console.warn('Audio visualization mic error:', e);
    }
  };

  const stopWaveformAnimation = () => {
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }

    // Draw idle line on canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
      }
    }
  };

  const startRecording = () => {
    setSpokenText('');
    setScore(null);
    setSaraCoaching('');
    setIsRecording(true);
    startWaveformAnimation();

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.warn('Recognition start error:', e);
      }
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    stopWaveformAnimation();
  };

  // Levenshtein & Word matching calculation
  const evaluatePronunciation = (userSpoken: string, target: string) => {
    const targetWords = target.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(Boolean);
    const spokenWords = userSpoken.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(Boolean);

    let matchCount = 0;
    const evaluated = targetWords.map((tWord) => {
      const exactMatch = spokenWords.includes(tWord);
      if (exactMatch) {
        matchCount += 1;
        return { word: tWord, status: 'perfect' as const };
      }

      // Check partial match
      const closeMatch = spokenWords.some(sWord => {
        const diff = Math.abs(sWord.length - tWord.length);
        if (diff <= 2 && (sWord.includes(tWord.slice(0, 3)) || tWord.includes(sWord.slice(0, 3)))) {
          return true;
        }
        return false;
      });

      if (closeMatch) {
        matchCount += 0.6;
        return { word: tWord, status: 'good' as const };
      }

      return { word: tWord, status: 'retry' as const };
    });

    const calculatedScore = Math.min(100, Math.max(20, Math.round((matchCount / Math.max(1, targetWords.length)) * 100)));
    setScore(calculatedScore);
    setAnalyzedWords(evaluated);

    // Sara verbal coaching response
    let feedback = '';
    if (calculatedScore >= 85) {
      feedback = isRtl 
        ? 'ما شاء الله عليك! نطق بريطاني/أمريكي فصيح ومخارج حروف متقنة جداً 🌟'
        : 'Outstanding articulation! Your pronunciation was crisp, clear, and confident 🌟';
      onSuccessXP?.(25);
    } else if (calculatedScore >= 65) {
      feedback = isRtl
        ? 'محاولة جميلة وقريبة جداً! ركز على مخارج الحروف الملونة بالأصفر لتصل إلى 100% 👏'
        : 'Good effort! Pay close attention to the highlighted sounds to reach 100% 👏';
      onSuccessXP?.(15);
    } else {
      feedback = isRtl
        ? 'بداية طيبة، استمع لنطق سارة مرة أخرى وكرر معها بهدوء، ستتقنها بالتأكيد! 💪'
        : 'Good start! Listen to Sara one more time and repeat gently, you can do it! 💪';
    }

    setSaraCoaching(feedback);
  };

  const playReferenceVoice = async (slow: boolean = false) => {
    setIsPlayingReference(true);
    cancelAllSpeech();
    try {
      await speakAcademyText(
        cleanTarget,
        'en',
        () => setIsPlayingReference(true),
        () => setIsPlayingReference(false),
        'Kore'
      );
    } catch (e) {
      setIsPlayingReference(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm" dir={isRtl ? 'rtl' : 'ltr'}>
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 15 }}
        className="bg-slate-900 border-2 border-amber-400/40 rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden text-white flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#141E30] to-[#243B55] px-4 py-3 border-b border-amber-400/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-sm shadow-md">
              🎙️
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-amber-200">
                {isRtl ? 'محلل ومطابق مخارج الحروف الذكي' : 'Phonetic Pronunciation Analyzer'}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-slate-300">
                {isRtl ? 'مقارنة دقة نطقك الصوتي مع المعلمة سارة' : 'Compare your voice waveform with Teacher Sara'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-rose-500 text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* Target Sentence Box */}
          <div className="bg-black/40 border-2 border-amber-400/30 rounded-2xl p-4 text-center relative shadow-inner">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-300/80 block mb-1">
              {isRtl ? 'الجملة المستهدفة للنطق 🎯' : 'Target Pronunciation Sentence 🎯'}
            </span>
            <p className="text-lg sm:text-xl font-bold font-sans text-white tracking-wide leading-relaxed">
              "{cleanTarget}"
            </p>

            <div className="mt-3 flex items-center justify-center gap-2">
              <button
                onClick={() => playReferenceVoice(false)}
                disabled={isPlayingReference}
                className="px-3 py-1.5 rounded-xl bg-[#002147] hover:bg-[#073060] border border-amber-300/40 text-amber-300 text-xs font-black flex items-center gap-1.5 transition-all shadow-sm cursor-pointer disabled:opacity-50"
              >
                <Volume2 size={14} className={isPlayingReference ? 'animate-bounce' : ''} />
                <span>{isRtl ? 'استمع لنطق سارة' : 'Listen to Sara'}</span>
              </button>
            </div>
          </div>

          {/* Waveform Visualizer Canvas */}
          <div className="bg-slate-950 rounded-2xl p-3 border border-slate-800 relative overflow-hidden text-center shadow-inner">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2 px-1">
              <span className="flex items-center gap-1.5 font-bold">
                <span className={`w-2 h-2 rounded-full ${isRecording ? 'bg-rose-500 animate-ping' : 'bg-slate-600'}`} />
                {isRecording 
                  ? (isRtl ? 'سارة تستمع لموجات صوتك الآن...' : 'Live recording your voice...')
                  : (isRtl ? 'مخطط الترددات الصوتية' : 'Acoustic Waveform')}
              </span>
              <span className="text-[10px] text-amber-300/70 font-mono">256 FFT Spectrogram</span>
            </div>

            <canvas
              ref={canvasRef}
              width={500}
              height={75}
              className="w-full h-[75px] rounded-xl bg-slate-900 border border-slate-800/80"
            />

            {/* Live spoken transcript preview */}
            {spokenText && (
              <div className="mt-2.5 p-2 bg-slate-900/90 rounded-xl border border-slate-700/60 text-xs font-mono text-amber-300">
                <span className="text-slate-400 block text-[10px]">{isRtl ? 'ما تم التقاطه من صوتك:' : 'You said:'}</span>
                "{spokenText}"
              </div>
            )}
          </div>

          {/* Evaluation Results Card */}
          {score !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-amber-400/40 rounded-2xl p-4 space-y-3"
            >
              {/* Score Meter */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">{isRtl ? 'دقة مخارج الحروف' : 'Phonetic Accuracy'}</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className={`text-3xl font-black ${
                      score >= 80 ? 'text-emerald-400' : score >= 60 ? 'text-amber-300' : 'text-rose-400'
                    }`}>
                      {score}%
                    </span>
                    <span className="text-xs text-slate-400">/ 100%</span>
                  </div>
                </div>

                <div className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs font-black flex items-center gap-1.5">
                  <Award size={15} className="text-amber-400" />
                  <span>{score >= 80 ? 'ممتاز ⭐⭐⭐' : score >= 60 ? 'جيد جداً ⭐⭐' : 'يحتاج تكرار ⭐'}</span>
                </div>
              </div>

              {/* Word by Word Status breakdown */}
              {analyzedWords.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {analyzedWords.map((item, idx) => (
                    <span
                      key={`word-${idx}`}
                      className={`px-2.5 py-1 rounded-xl text-xs font-black border flex items-center gap-1 ${
                        item.status === 'perfect'
                          ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300'
                          : item.status === 'good'
                          ? 'bg-amber-950/70 border-amber-500/50 text-amber-300'
                          : 'bg-rose-950/70 border-rose-500/50 text-rose-300'
                      }`}
                    >
                      {item.status === 'perfect' && <CheckCircle2 size={12} />}
                      {item.status === 'retry' && <AlertCircle size={12} />}
                      <span>{item.word}</span>
                    </span>
                  ))}
                </div>
              )}

              {/* Sara Verbal Coaching */}
              {saraCoaching && (
                <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-2.5 text-xs text-amber-200 flex items-start gap-2">
                  <Sparkles size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  <p className="font-bold leading-relaxed">{saraCoaching}</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Tricky Sound Badges in This Sentence */}
          {detectedSounds.length > 0 && (
            <div className="bg-black/30 border border-slate-800 rounded-2xl p-3">
              <span className="text-[10px] font-black uppercase text-slate-400 block mb-2 flex items-center gap-1">
                <Info size={12} className="text-amber-400" />
                {isRtl ? 'الأصوات الصعبة في هذه الجملة (اضغط لمعرفة طريقة اللسان):' : 'Tricky sounds in this sentence (Click for guide):'}
              </span>

              <div className="flex flex-wrap gap-2">
                {detectedSounds.map(tip => (
                  <button
                    key={`sound-tip-${tip.phoneme}`}
                    onClick={() => setActivePhonemeTip(activePhonemeTip?.phoneme === tip.phoneme ? null : tip)}
                    className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      activePhonemeTip?.phoneme === tip.phoneme
                        ? 'bg-amber-400 text-slate-950 border-amber-300 font-black'
                        : 'bg-slate-800/80 hover:bg-slate-800 text-amber-200 border-slate-700'
                    }`}
                  >
                    <span>{tip.phoneme}</span>
                    <span className="text-[10px] opacity-80">({isRtl ? tip.nameAr : tip.nameEn})</span>
                  </button>
                ))}
              </div>

              {activePhonemeTip && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2.5 p-3 rounded-xl bg-amber-400/15 border border-amber-400/40 text-xs text-amber-100 space-y-1 font-medium"
                >
                  <p className="font-black text-amber-300">
                    💡 {isRtl ? activePhonemeTip.tipAr : activePhonemeTip.tipEn}
                  </p>
                  <p className="text-[11px] text-slate-300">
                    {isRtl ? 'أمثلة مشابهة:' : 'Examples:'} <span className="font-mono text-white">{activePhonemeTip.example}</span>
                  </p>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-950/80 px-4 py-3 border-t border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => {
              setSpokenText('');
              setScore(null);
              setSaraCoaching('');
            }}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>{isRtl ? 'إعادة' : 'Reset'}</span>
          </button>

          {/* Primary Record Button */}
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`flex-1 py-3 px-4 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-95 ${
              isRecording
                ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse border-2 border-rose-300'
                : 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-slate-950 hover:brightness-105 border-2 border-amber-200'
            }`}
          >
            {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
            <span>
              {isRecording 
                ? (isRtl ? 'اضغط لإنهاء التسجيل والتحليل ⏹️' : 'Stop & Analyze ⏹️')
                : (isRtl ? 'اضغط وتحدث بصوتك الآن 🎙️' : 'Tap & Speak Now 🎙️')}
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
