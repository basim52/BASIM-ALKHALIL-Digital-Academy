import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { translations, Language } from '../../lib/translations';
import { 
  ArrowLeft, 
  Mic, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  XCircle,
  Trophy,
  Star,
  RefreshCcw,
  Play,
  ChevronRight
} from 'lucide-react';

interface PracticeWord {
  id: string;
  word: string;
  wordAr: string;
  emoji: string;
  color: string;
  category: 'animals' | 'food' | 'objects';
}

const PRACTICE_WORDS: PracticeWord[] = [
  { id: 'apple', word: 'Apple', wordAr: 'تفاحة', emoji: '🍎', color: '#ef4444', category: 'food' },
  { id: 'cat', word: 'Cat', wordAr: 'قطة', emoji: '🐱', color: '#fbbf24', category: 'animals' },
  { id: 'banana', word: 'Banana', wordAr: 'موزة', emoji: '🍌', color: '#fcd34d', category: 'food' },
  { id: 'dog', word: 'Dog', wordAr: 'كلب', emoji: '🐶', color: '#92400e', category: 'animals' },
  { id: 'sun', word: 'Sun', wordAr: 'شمس', emoji: '☀️', color: '#f59e0b', category: 'objects' },
  { id: 'bird', word: 'Bird', wordAr: 'عصفور', emoji: '🐦', color: '#3b82f6', category: 'animals' },
  { id: 'car', word: 'Car', wordAr: 'سيارة', emoji: '🚗', color: '#dc2626', category: 'objects' },
  { id: 'ball', word: 'Ball', wordAr: 'كرة', emoji: '⚽', color: '#10b981', category: 'objects' },
  { id: 'pizza', word: 'Pizza', wordAr: 'بيتزا', emoji: '🍕', color: '#ea580c', category: 'food' },
  { id: 'milk', word: 'Milk', wordAr: 'حليب', emoji: '🥛', color: '#94a3b8', category: 'food' },
];

export const PronunciationLesson = ({ lang, onBack, onComplete }: { lang: Language, onBack: () => void, onComplete?: (score: number, total: number) => void }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'wrong'>('none');
  const [score, setScore] = useState(0);
  const [recognizedText, setRecognizedText] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [micError, setMicError] = useState<'none' | 'denied' | 'unsupported' | 'notFound'>('none');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Game logic states
  const [attempts, setAttempts] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const MAX_TOTAL_ATTEMPTS = 12;

  // Refs for logic in callbacks (avoid stale state)
  const currentIndexRef = useRef(0);
  const totalAttemptsRef = useRef(0);
  const attemptsRef = useRef(0);
  const isProcessingRef = useRef(false);

  useEffect(() => { currentIndexRef.current = currentIndex; }, [currentIndex]);
  useEffect(() => { totalAttemptsRef.current = totalAttempts; }, [totalAttempts]);
  useEffect(() => { attemptsRef.current = attempts; }, [attempts]);
  useEffect(() => { isProcessingRef.current = isProcessing; }, [isProcessing]);

  const currentWord = PRACTICE_WORDS[currentIndex % PRACTICE_WORDS.length];
  
  // Speech Recognition setup
  const recognitionRef = useRef<any>(null);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition && !recognitionRef.current) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        setRecognizedText(transcript);
        if (validateRef.current) {
          validateRef.current(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setMicError('denied');
        }
        setIsListening(false);
        setIsProcessingState(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') setMicError('denied');
      };

      recognitionRef.current = recognition;
    }
    
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e) {}
      }
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    };
  }, []);

  const speak = useCallback((text: string, forceLang?: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = forceLang || 'en-US';
    utterance.rate = 0.85;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  }, []);

  const startListening = async () => {
    if (!recognitionRef.current || isProcessingRef.current) {
      if (!recognitionRef.current) setMicError('unsupported');
      return;
    }
    
    // Stop any ongoing speech or transitions
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }
    
    setMicError('none');
    
    try {
      if (isListening) {
        try { recognitionRef.current.stop(); } catch(e) {}
        return;
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setMicError('unsupported');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());

      setRecognizedText('');
      setFeedback('none');
      setIsListening(true);
      
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.warn('Recognition start failed:', e);
        setIsListening(false);
      }
    } catch (err: any) {
      console.error('Mic access error:', err);
      setIsListening(false);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setMicError('denied');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setMicError('notFound');
      } else {
        setMicError('denied');
      }
    }
  };

  const handleSkip = () => {
    if (isProcessingRef.current) return;
    setIsProcessingState(true);
    speak(`That's okay! Let's try the next one.`);
    transitionTimeoutRef.current = setTimeout(nextModeOrFinish, 1500);
  };

  const setIsProcessingState = (value: boolean) => {
    setIsProcessing(value);
    isProcessingRef.current = value;
  };

  const nextModeOrFinish = () => {
    setIsProcessingState(false);
    
    if (totalAttemptsRef.current + 1 >= MAX_TOTAL_ATTEMPTS) {
      setShowCelebration(true);
      if (onComplete) onComplete(score, MAX_TOTAL_ATTEMPTS);
      return;
    }

    const next = (currentIndexRef.current + 1) % PRACTICE_WORDS.length;
    setCurrentIndex(next);
    setAttempts(0);
    setTotalAttempts(prev => prev + 1);
    setFeedback('none');
    setRecognizedText('');
  };

  const validatePronunciation = (transcript: string) => {
    if (isProcessingRef.current) return;

    const target = currentWord.word.toLowerCase();
    
    // Clean and split
    const cleanTranscript = (transcript || '').toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").trim();
    const transcriptParts = cleanTranscript.split(/\s+/);
    
    const isCorrect = cleanTranscript === target || 
                      transcriptParts.includes(target) ||
                      (cleanTranscript.length >= 3 && target.includes(cleanTranscript));

    if (isCorrect) {
      setFeedback('correct');
      setIsProcessingState(true);
      setScore(prev => prev + 1);
      speak("Great job!");
      transitionTimeoutRef.current = setTimeout(nextModeOrFinish, 2000);
    } else {
      setFeedback('wrong');
      const nextAttempts = attemptsRef.current + 1;
      setAttempts(nextAttempts);

      if (nextAttempts >= 2) {
        setIsProcessingState(true);
        speak(`It's okay, let's try another one. That was ${target}.`);
        transitionTimeoutRef.current = setTimeout(nextModeOrFinish, 2500);
      } else {
        speak("Try again!");
        transitionTimeoutRef.current = setTimeout(() => {
          setFeedback('none');
          setIsProcessingState(false);
          speak(currentWord.word);
        }, 1500);
      }
    }
  };

  const validateRef = useRef(validatePronunciation);
  useEffect(() => {
    validateRef.current = validatePronunciation;
  }, [validatePronunciation]);

  const resetGame = () => {
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    
    setCurrentIndex(0);
    setScore(0);
    setFeedback('none');
    setShowCelebration(false);
    setRecognizedText('');
    setAttempts(0);
    setTotalAttempts(0);
    setIsProcessing(false);
  };

  return (
    <div 
      className="min-h-screen transition-colors duration-700 p-4 md:p-10 flex flex-col items-center relative overflow-hidden"
      style={{ backgroundColor: `${currentWord.color}15` }}
    >
      <div className="w-full max-w-6xl flex items-center justify-between mb-8 z-20">
        <button 
          onClick={onBack}
          className="w-12 h-12 md:w-16 md:h-16 bg-white shadow-lg rounded-xl md:rounded-2xl flex items-center justify-center text-[#002147] hover:scale-110 active:scale-90 transition-all border border-slate-50"
        >
          <ArrowLeft size={24} className={isRtl ? 'rotate-180' : ''} />
        </button>
        
        <div className="text-center px-1">
          <h1 className="text-xl md:text-5xl font-black text-[#002147] mb-1 tracking-tight">
            {(t as any).pronunciationTitle}
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="bg-[#002147] text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2">
              <Trophy size={16} className="text-yellow-400" />
              <span>{score}</span>
            </div>
            <div className="bg-white/80 text-[#002147] px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2 border border-[#002147]/10">
              <Star size={16} className="text-indigo-500" />
              <span>{totalAttempts} / {MAX_TOTAL_ATTEMPTS}</span>
            </div>
          </div>
        </div>

        <button 
          onClick={resetGame}
          className="w-12 h-12 md:w-16 md:h-16 bg-white shadow-lg rounded-xl md:rounded-2xl flex items-center justify-center text-[#C49E3A] hover:scale-110 active:scale-90 transition-all border border-slate-50"
        >
          <RefreshCcw size={24} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl z-10 transition-all">
        <AnimatePresence mode="wait">
          {micError !== 'none' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[3rem] p-8 md:p-12 text-center shadow-2xl flex flex-col items-center gap-6 border-4 border-rose-100"
            >
              <div className="w-20 h-20 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500">
                <Mic size={40} className="opacity-50" />
                <XCircle size={24} className="absolute mt-10 ml-10" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-[#002147] mb-2">{(t as any).micErrorTitle}</h2>
                <p className="text-slate-500 max-w-md">
                  {micError === 'denied' ? (t as any).micError : 
                   micError === 'notFound' ? (t as any).micNotFound : 
                   (t as any).micNotSupported}
                </p>
              </div>
              <button 
                onClick={() => {
                  setMicError('none');
                  startListening();
                }}
                className="px-8 py-3 bg-[#002147] text-white rounded-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-lg"
              >
                {isRtl ? 'حاول مرة أخرى' : 'Try Again'}
              </button>
            </motion.div>
          ) : !showCelebration ? (
            <motion.div 
              key={currentWord.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              className="w-full flex flex-col items-center text-center gap-6 md:gap-10"
            >
              <div 
                className="w-48 h-48 md:w-72 md:h-72 rounded-[3rem] md:rounded-[5rem] shadow-2xl flex flex-col items-center justify-center text-[100px] md:text-[150px] bg-white border-8 transition-colors relative"
                style={{ borderColor: feedback === 'correct' ? '#10b981' : feedback === 'wrong' ? '#ef4444' : 'white' }}
              >
                <span>{currentWord.emoji}</span>
                
                {/* Attempt Dots */}
                <div className="absolute -bottom-4 bg-white px-4 py-1 rounded-full shadow-lg border border-slate-100 flex gap-1.5">
                  {[...Array(2)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        i < attempts ? 'bg-rose-500' : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-4xl md:text-7xl font-black text-[#002147] mb-2 md:mb-4">
                  {currentWord.word}
                </h2>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-xl md:text-3xl font-bold text-[#002147]/60">
                    {currentWord.wordAr}
                  </span>
                  <button 
                    onClick={() => speak(currentWord.word)}
                    className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-md flex items-center justify-center text-[#C49E3A] hover:scale-110 active:scale-90 transition-all"
                  >
                    <Play fill="currentColor" size={20} />
                  </button>
                </div>
              </div>

              <div className="w-full max-w-sm">
                <AnimatePresence>
                  {feedback !== 'none' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mb-4 md:mb-8 font-black text-lg md:text-2xl flex items-center justify-center gap-2 ${
                        feedback === 'correct' ? 'text-emerald-500' : 'text-rose-500'
                      }`}
                    >
                      {feedback === 'correct' ? (
                        <>
                          <CheckCircle2 size={32} />
                          <span>Excellent!</span>
                        </>
                      ) : (
                        <>
                          <XCircle size={32} />
                          <span>{(t as any).tryAgain}</span>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative group">
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={startListening}
                    disabled={isListening || isProcessing}
                    className={`w-full py-4 md:py-6 rounded-3xl md:rounded-[2.5rem] font-black text-xl md:text-3xl shadow-2xl flex items-center justify-center gap-4 transition-all active:scale-95 ${
                      isListening 
                      ? 'bg-rose-500 text-white animate-pulse' 
                      : isProcessing
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-[#002147] text-white hover:bg-[#001530]'
                    } disabled:opacity-80`}
                  >
                    <Mic size={32} className={isListening ? 'animate-bounce' : ''} />
                    <span>{isListening ? (t as any).listening : (t as any).startRecording}</span>
                  </button>

                  <button
                    onClick={handleSkip}
                    disabled={isProcessing}
                    className="w-full py-3 rounded-2xl font-bold bg-slate-100 text-slate-400 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{isRtl ? 'تخطّي هذه الكلمة' : 'Skip this word'}</span>
                    <ChevronRight size={18} className={isRtl ? 'rotate-180' : ''} />
                  </button>
                </div>
                  
                  {isListening && (
                    <motion.div 
                      layoutId="mic-ripple"
                      className="absolute -inset-2 bg-rose-400/20 rounded-[3rem] -z-10 animate-ping"
                    />
                  )}
                </div>

                {recognizedText && (
                  <p className="mt-4 text-[#002147]/40 font-bold italic">
                    " {recognizedText} "
                  </p>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[3rem] p-10 md:p-16 text-center shadow-2xl flex flex-col items-center gap-8"
            >
              <div className="w-32 h-32 md:w-48 md:h-48 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-500">
                <Trophy size={80} className="animate-bounce" />
              </div>
              <div>
                <h2 className="text-3xl md:text-5xl font-black text-[#002147] mb-2">{t.excellent}</h2>
                <p className="text-xl md:text-2xl font-bold text-slate-400 mb-4">{isRtl ? 'أكملت جميع الكلمات بنجاح!' : 'You mastered all the words!'}</p>
                
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col gap-3 w-full max-w-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Score</span>
                    <span className="text-xl font-black text-[#002147]">{score} / {MAX_TOTAL_ATTEMPTS}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} fill="#fbbf24" className="text-yellow-400 w-8 h-8 md:w-10 md:h-10" />)}
              </div>
              <button 
                onClick={resetGame}
                className="px-10 py-4 bg-[#002147] text-white rounded-2xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-xl"
              >
                {isRtl ? 'العب مرة أخرى' : 'Play Again'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Helper text */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white/60 backdrop-blur-sm px-6 py-2 rounded-full border border-white/80 text-center z-10 hidden md:block">
        <p className="text-xs uppercase tracking-widest font-black text-[#002147]/60">
          {(t as any).pronounceThis}
        </p>
      </div>
    </div>
  );
};
