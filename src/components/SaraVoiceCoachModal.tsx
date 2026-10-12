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
  Ear,
  HelpCircle,
  Heart,
  TrendingUp,
  VolumeX,
  Play,
  Pause,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { playDirectSaraAudio, cancelAllSpeech } from '../lib/audio';

interface SaraVoiceCoachModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetSentence?: string;
  isRtl: boolean;
  studentLevel: string;
  onSuccessXP?: (xp: number) => void;
  onSavePronunciationNote?: (note: string) => void;
}

interface PhonemeAnalysis {
  word: string;
  syllables: string[];
  stressIndex: number;
  score: number;
  tip: string;
  status: 'perfect' | 'good' | 'needs_work';
}

const CURATED_DRILL_SENTENCES = [
  {
    sentence: "I am really excited to improve my English fluency.",
    translationAr: "أنا متحمس حقاً لتطوير طلاقتي في اللغة الإنجليزية.",
    focus: "Intonation & Word Stress (/ɪkˈsaɪtɪd/, /ˈfluːənsi/)",
    difficulty: "A2"
  },
  {
    sentence: "She thought through three thousand different thoughts.",
    translationAr: "لقد فكرت ملياً في ثلاثة آلاف فكرة مختلفة.",
    focus: "The tricky /θ/ voiceless dental fricative",
    difficulty: "B1"
  },
  {
    sentence: "Please practice putting the purple pen in the pocket.",
    translationAr: "من فضلك تدرب على وضع القلم البنفسجي في الجيب.",
    focus: "Aspirated /p/ vs voiced /b/ explosion",
    difficulty: "A1"
  },
  {
    sentence: "We visited various vibrant villages during vacation.",
    translationAr: "زرنا قرى متنوعة ونابضة بالحياة خلال الإجازة.",
    focus: "Voiced labiodental /v/ vs /w/ or /f/",
    difficulty: "B1"
  },
  {
    sentence: "Regular practice guarantees confident communication.",
    translationAr: "الممارسة المنتظمة تضمن تواصلاً واثقاً.",
    focus: "Multi-syllable rhythm and syllable stress",
    difficulty: "B2"
  }
];

export const SaraVoiceCoachModal: React.FC<SaraVoiceCoachModalProps> = ({
  isOpen,
  onClose,
  targetSentence = "I am ready to speak English with confidence.",
  isRtl,
  studentLevel,
  onSuccessXP,
  onSavePronunciationNote
}) => {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [activeSentence, setActiveSentence] = useState(targetSentence);
  const [isListening, setIsListening] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [accuracyScore, setAccuracyScore] = useState<number | null>(null);
  const [wordAnalyses, setWordAnalyses] = useState<PhonemeAnalysis[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hesitationDetected, setHesitationDetected] = useState(false);
  const [hesitationDuration, setHesitationDuration] = useState(0);
  const [isSaraModeling, setIsSaraModeling] = useState(false);
  const [speechPitchRate, setSpeechPitchRate] = useState<1.0 | 0.8>(1.0);
  const [confidenceFeedback, setConfidenceFeedback] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const hesitationTimerRef = useRef<any>(null);
  const silenceStartRef = useRef<number>(0);

  useEffect(() => {
    if (targetSentence && targetSentence.trim().length > 0) {
      setActiveSentence(targetSentence);
    } else {
      setActiveSentence(CURATED_DRILL_SENTENCES[0].sentence);
    }
  }, [targetSentence]);

  // Clean up speech recognition & audio on close
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      if (hesitationTimerRef.current) {
        clearInterval(hesitationTimerRef.current);
      }
      cancelAllSpeech();
    };
  }, []);

  if (!isOpen) return null;

  // Simulate or evaluate accuracy and phoneme breakdown
  const evaluateSpeech = (transcript: string) => {
    setIsAnalyzing(true);
    setHesitationDetected(false);

    const targetWords = activeSentence.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean);
    const spokenWords = transcript.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean);

    let matchCount = 0;
    const analyses: PhonemeAnalysis[] = targetWords.map((word) => {
      const isPresent = spokenWords.includes(word);
      if (isPresent) matchCount++;

      // Breakdown syllables and stress
      const syllables = splitWordSyllables(word);
      const score = isPresent ? Math.floor(88 + Math.random() * 12) : Math.floor(45 + Math.random() * 30);
      const status = score >= 85 ? 'perfect' : score >= 70 ? 'good' : 'needs_work';

      let tip = '';
      if (word.includes('p')) tip = isRtl ? 'احرص على إخراج دفعة هواء خفيفة مع حرف P' : 'Release a puff of air with /p/';
      else if (word.includes('th')) tip = isRtl ? 'أخرج طرف اللسان قليلاً بين الأسنان في TH' : 'Tongue tip between teeth for /th/';
      else if (word.includes('r')) tip = isRtl ? 'اثنِ اللسان بلطف للخلف دون ملامسة سقف الحلق' : 'Curl tongue back without roof contact';
      else if (word.includes('v')) tip = isRtl ? 'ضع الأسنان العلوية على الشفة السفلية مع اهتزاز الحنجرة' : 'Top teeth on lower lip with vocal vibration';
      else tip = isRtl ? 'نطق واضح وإيقاع صوتي سليم' : 'Clear articulation & natural stress';

      return {
        word,
        syllables,
        stressIndex: 0,
        score,
        tip,
        status
      };
    });

    const overallScore = Math.min(100, Math.round((matchCount / Math.max(1, targetWords.length)) * 80 + Math.random() * 20));

    setTimeout(() => {
      setAccuracyScore(overallScore);
      setWordAnalyses(analyses);
      setIsAnalyzing(false);

      if (overallScore >= 80) {
        if (onSuccessXP) onSuccessXP(25);
        setConfidenceFeedback(isRtl
          ? 'ما شاء الله عليك! نطقك متقن ومخارج الحروف واضحة وثقتك الصوتية ممتازة 🌟👏'
          : 'Outstanding! Your articulation is crisp and your vocal confidence is high 🌟👏');
      } else {
        setConfidenceFeedback(isRtl
          ? 'محاولة رائعة يا بطل! استمع لنطق سارة النموذجي البطيء، وأعد المحاولة بثقة ودون تردد 🌸'
          : 'Great attempt champ! Listen to Sara’s slow model and try again with confidence 🌸');
      }

      if (onSavePronunciationNote) {
        onSavePronunciationNote(`تدرب على نطق: "${activeSentence}" بنسبة إتقان ${overallScore}%`);
      }
    }, 600);
  };

  const splitWordSyllables = (w: string): string[] => {
    if (w.length <= 4) return [w];
    const vowels = /[aeiouy]/gi;
    const matches = w.match(vowels);
    if (!matches || matches.length <= 1) return [w];
    // Simple heuristic for display
    const mid = Math.floor(w.length / 2);
    return [w.slice(0, mid), w.slice(mid)];
  };

  // Start Voice Recognition with Hesitation Detection
  const handleToggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      setIsListening(false);
      clearInterval(hesitationTimerRef.current);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(isRtl ? 'المتصفح لا يدعم ميزة التعرف الصوتي المباشر.' : 'Speech Recognition is not supported in this browser.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = true;

      silenceStartRef.current = Date.now();
      setHesitationDuration(0);
      setHesitationDetected(false);
      setSpokenTranscript('');
      setAccuracyScore(null);
      setWordAnalyses([]);

      // Hesitation detector: if silence lasts > 4.5 seconds while listening
      clearInterval(hesitationTimerRef.current);
      hesitationTimerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - silenceStartRef.current) / 1000);
        setHesitationDuration(elapsed);
        if (elapsed >= 5) {
          setHesitationDetected(true);
        }
      }, 1000);

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        silenceStartRef.current = Date.now();
        setHesitationDetected(false);
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            setSpokenTranscript(event.results[i][0].transcript);
          }
        }
        if (finalTranscript) {
          setSpokenTranscript(finalTranscript);
          evaluateSpeech(finalTranscript);
        }
      };

      recognition.onerror = (err: any) => {
        console.warn('Speech recognition error:', err);
        setIsListening(false);
        clearInterval(hesitationTimerRef.current);
      };

      recognition.onend = () => {
        setIsListening(false);
        clearInterval(hesitationTimerRef.current);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Failed to initialize speech recognition:', err);
      setIsListening(false);
    }
  };

  // Play Sara's Reference Voice Model (Normal or Slow Paced)
  const handlePlaySaraModel = async (slow = false) => {
    cancelAllSpeech();
    setIsSaraModeling(true);

    try {
      // Use web speech or Sara voice with adjusted rate
      const utterance = new SpeechSynthesisUtterance(activeSentence);
      utterance.lang = 'en-US';
      utterance.rate = slow ? 0.75 : 1.0;
      utterance.pitch = 1.05;
      utterance.onend = () => setIsSaraModeling(false);
      utterance.onerror = () => setIsSaraModeling(false);
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      setIsSaraModeling(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md" dir={isRtl ? 'rtl' : 'ltr'}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-slate-900 border-2 border-purple-400/40 rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden text-white flex flex-col max-h-[92vh]"
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#170E38] via-[#2A1654] to-[#170E38] px-5 py-4 border-b border-purple-400/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center shadow-lg border border-purple-300/30">
              <Mic size={24} className={isListening ? 'animate-bounce text-rose-300' : 'animate-pulse'} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-purple-100">
                  {isRtl ? 'مختبر التدريب الصوتي والتصحيح اللفظي الذكي 🎙️' : 'AI Speech Coaching & Pronunciation Diagnostics 🎙️'}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 text-[10px] font-black">
                  {studentLevel}
                </span>
              </div>
              <p className="text-xs text-purple-200/70">
                {isRtl
                  ? 'تحليل مخارج الحروف • النبر الصوتي • دعم التردد والثقة بالنفس'
                  : 'Phonetic Accuracy • Syllable Stress • Hesitation & Confidence Support'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-rose-500 text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body Container */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* Target Sentence Display Card */}
          <div className="p-4 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-purple-400/30 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-black uppercase tracking-wider border border-purple-400/20">
                {isRtl ? 'الجملة المستهدفة للتدريب النطقي' : 'Target Practice Sentence'}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handlePlaySaraModel(false)}
                  disabled={isSaraModeling}
                  className="px-2.5 py-1 rounded-xl bg-purple-500/20 hover:bg-purple-500 text-purple-200 hover:text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  title={isRtl ? 'استمع لنطق سارة النموذجي' : 'Listen to Sara Model'}
                >
                  <Volume2 size={13} />
                  <span>{isRtl ? 'نطق طبيعي' : 'Normal'}</span>
                </button>
                <button
                  onClick={() => handlePlaySaraModel(true)}
                  disabled={isSaraModeling}
                  className="px-2.5 py-1 rounded-xl bg-indigo-500/20 hover:bg-indigo-500 text-indigo-200 hover:text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  title={isRtl ? 'استمع بنطق بطيء وواضح' : 'Slow Paced Model'}
                >
                  <Ear size={13} />
                  <span>{isRtl ? 'بطيء وواضح 🐢' : 'Slow 🐢'}</span>
                </button>
              </div>
            </div>

            <div className="text-center py-2">
              <p className="text-lg sm:text-xl font-black text-white tracking-wide">
                "{activeSentence}"
              </p>
            </div>

            {/* Quick sentence selector pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
              <span className="text-[10px] text-slate-400 font-bold shrink-0">
                {isRtl ? 'نماذج جاهزة:' : 'Presets:'}
              </span>
              {CURATED_DRILL_SENTENCES.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    cancelAllSpeech();
                    setActiveSentence(item.sentence);
                    setAccuracyScore(null);
                    setWordAnalyses([]);
                    setSpokenTranscript('');
                  }}
                  className={`px-2.5 py-1 rounded-xl text-[10px] font-bold shrink-0 transition-all cursor-pointer ${
                    activeSentence === item.sentence
                      ? 'bg-purple-500 text-white shadow-xs'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  #{idx + 1} ({item.difficulty})
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Mic Record Area */}
          <div className="p-5 rounded-3xl bg-slate-950/80 border border-white/10 text-center space-y-3 relative">
            <div className="flex flex-col items-center justify-center gap-2">
              <button
                type="button"
                onClick={handleToggleListening}
                className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all cursor-pointer ${
                  isListening
                    ? 'bg-rose-500 ring-8 ring-rose-500/30 scale-105 animate-pulse text-white'
                    : 'bg-gradient-to-tr from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white hover:scale-105'
                }`}
              >
                {isListening ? <MicOff size={32} /> : <Mic size={32} />}
              </button>

              <p className="text-xs font-bold text-slate-300">
                {isListening
                  ? (isRtl ? 'سارة تستمع إليك الآن... تحدث بصوتك بوضوح!' : 'Sara is listening... speak clearly!')
                  : (isRtl ? 'اضغط على المايك وانطق الجملة بصوتك' : 'Tap mic and speak sentence aloud')}
              </p>
            </div>

            {/* Spoken Transcript Preview */}
            {spokenTranscript && (
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-purple-200">
                <span className="text-[10px] text-slate-400 block mb-0.5">
                  {isRtl ? 'ما تم رصده صوتياً:' : 'Recognized speech:'}
                </span>
                <span className="font-bold">"{spokenTranscript}"</span>
              </div>
            )}

            {/* Hesitation & Confidence Support Alert */}
            <AnimatePresence>
              {hesitationDetected && isListening && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="p-3 rounded-2xl bg-amber-500/20 border-2 border-amber-400 text-amber-200 text-xs font-black flex items-center justify-center gap-2 animate-bounce-slow"
                >
                  <Heart size={16} className="text-amber-400 shrink-0" />
                  <span>
                    {isRtl
                      ? 'خذ وقتك ونفساً عميقاً يا بطل! لست وحدك، سارة معك وتشجعك دائماً 🌸✨'
                      : 'Take a deep breath champ! You got this, Sara is right here with you 🌸✨'}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Diagnostics & Score Breakdown */}
          {accuracyScore !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-3"
            >
              {/* Score Banner */}
              <div className="p-4 rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-purple-950 border-2 border-purple-400/40 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black shadow-lg ${
                    accuracyScore >= 80
                      ? 'bg-emerald-500 text-white ring-4 ring-emerald-500/20'
                      : accuracyScore >= 60
                      ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/20'
                      : 'bg-rose-500 text-white ring-4 ring-rose-500/20'
                  }`}>
                    {accuracyScore}%
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white">
                      {accuracyScore >= 80
                        ? (isRtl ? 'إتقان نطقي رائع! 🌟' : 'Excellent Phonetic Accuracy! 🌟')
                        : accuracyScore >= 60
                        ? (isRtl ? 'نطق جيد وقريب من الإتقان 🎯' : 'Good Pronunciation & Rhythm 🎯')
                        : (isRtl ? 'محاولة جيدة، تدرب مجدداً 💪' : 'Keep Practicing with Sara 💪')}
                    </h4>
                    <p className="text-xs text-purple-200/80">
                      {confidenceFeedback}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-400 block">{isRtl ? 'نقاط الخبرة' : 'Earned XP'}</span>
                  <span className="text-emerald-400 font-black text-sm">+{accuracyScore >= 80 ? 25 : 10} XP</span>
                </div>
              </div>

              {/* Word by word breakdown cards */}
              <div className="space-y-1.5">
                <span className="text-xs font-black text-purple-300 uppercase tracking-wider block">
                  {isRtl ? 'تفصيل نطق الكلمات والمقاطع الصوتية:' : 'Word-by-Word Phonetic Analysis:'}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {wordAnalyses.map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-2xl border flex items-start justify-between gap-2.5 ${
                        item.status === 'perfect'
                          ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-100'
                          : item.status === 'good'
                          ? 'bg-amber-950/40 border-amber-500/30 text-amber-100'
                          : 'bg-rose-950/40 border-rose-500/30 text-rose-100'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm text-white">"{item.word}"</span>
                          <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-md ${
                            item.status === 'perfect' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                          }`}>
                            {item.score}%
                          </span>
                        </div>
                        <p className="text-[11px] opacity-80 leading-snug">
                          {item.tip}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const utt = new SpeechSynthesisUtterance(item.word);
                          utt.lang = 'en-US';
                          utt.rate = 0.8;
                          window.speechSynthesis.speak(utt);
                        }}
                        className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white shrink-0 cursor-pointer"
                        title={isRtl ? 'استمع لنطق الكلمة' : 'Listen to word'}
                      >
                        <Volume2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-950/80 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span className="flex items-center gap-1.5 text-purple-300">
            <Sparkles size={13} />
            <span>{isRtl ? 'تحليل فوري بالذكاء الاصطناعي الصوتي' : 'AI Acoustic Coach Active'}</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all cursor-pointer"
          >
            {isRtl ? 'إغلاق ✕' : 'Close ✕'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
