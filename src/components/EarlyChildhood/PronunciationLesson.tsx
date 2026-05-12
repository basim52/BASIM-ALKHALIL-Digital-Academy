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
  Play
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

export const PronunciationLesson = ({ lang, onBack }: { lang: Language, onBack: () => void }) => {
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
  const [reviewQueue, setReviewQueue] = useState<number[]>([]);
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [reviewSuccesses, setReviewSuccesses] = useState(0);

  // Refs for logic in callbacks (avoid stale state)
  const currentIndexRef = useRef(0);
  const isReviewingRef = useRef(false);
  const reviewIndexRef = useRef(0);
  const reviewQueueRef = useRef<number[]>([]);
  const attemptsRef = useRef(0);
  const reviewSuccessesRef = useRef(0);
  const isProcessingRef = useRef(false);

  useEffect(() => { currentIndexRef.current = currentIndex; }, [currentIndex]);
  useEffect(() => { isReviewingRef.current = isReviewing; }, [isReviewing]);
  useEffect(() => { reviewIndexRef.current = reviewIndex; }, [reviewIndex]);
  useEffect(() => { reviewQueueRef.current = reviewQueue; }, [reviewQueue]);
  useEffect(() => { attemptsRef.current = attempts; }, [attempts]);
  useEffect(() => { reviewSuccessesRef.current = reviewSuccesses; }, [reviewSuccesses]);
  useEffect(() => { isProcessingRef.current = isProcessing; }, [isProcessing]);

  const wordIndex = isReviewing ? reviewQueue[reviewIndex] : currentIndex;
  const currentWord = PRACTICE_WORDS[wordIndex];
  
  // Speech Recognition setup
  const recognitionRef = useRef<any>(null);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition && !recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
    }

    if (recognitionRef.current) {
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        setRecognizedText(transcript);
        if (validateRef.current) {
          validateRef.current(transcript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setMicError('denied');
        }
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
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
    if (!recognitionRef.current || isProcessing) {
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
        recognitionRef.current.stop();
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

  const setIsProcessingState = (value: boolean) => {
    setIsProcessing(value);
    isProcessingRef.current = value;
  };

  const nextModeOrFinish = () => {
    setIsProcessingState(false);
    
    if (!isReviewingRef.current) {
      if (currentIndexRef.current < PRACTICE_WORDS.length - 1) {
        const next = currentIndexRef.current + 1;
        setCurrentIndex(next);
        setAttempts(0);
        setFeedback('none');
        setRecognizedText('');
      } else {
        if (reviewQueueRef.current.length > 0) {
          setIsReviewing(true);
          setReviewIndex(0);
          setReviewSuccesses(0);
          setAttempts(0);
          setFeedback('none');
          setRecognizedText('');
          speak("Now let's review the words you missed! Say each correctly twice.");
        } else {
          setShowCelebration(true);
        }
      }
    } else {
      if (reviewIndexRef.current < reviewQueueRef.current.length - 1) {
        setReviewIndex(prev => prev + 1);
        setReviewSuccesses(0);
        setAttempts(0);
        setFeedback('none');
        setRecognizedText('');
      } else {
        setShowCelebration(true);
      }
    }
  };

  const validatePronunciation = (transcript: string) => {
    const wordIdx = isReviewingRef.current ? reviewQueueRef.current[reviewIndexRef.current] : currentIndexRef.current;
    const targetWord = PRACTICE_WORDS[wordIdx];
    const target = targetWord.word.toLowerCase();
    
    // More robust matching
    const transcriptParts = transcript.split(' ');
    const isCorrect = transcript.includes(target) || 
                      transcriptParts.some(p => p === target) ||
                      (transcript.length >= 3 && target.includes(transcript));

    if (isCorrect) {
      setFeedback('correct');
      setIsProcessingState(true);
      
      if (isReviewingRef.current) {
        const nextSuccessCount = reviewSuccessesRef.current + 1;
        setReviewSuccesses(nextSuccessCount);
        
        if (nextSuccessCount >= 2) {
          setScore(prev => prev + 1);
          speak("Excellent! You mastered it!");
          transitionTimeoutRef.current = setTimeout(nextModeOrFinish, 2000);
        } else {
          speak("One more time!");
          transitionTimeoutRef.current = setTimeout(() => {
            setFeedback('none');
            setIsProcessingState(false);
          }, 1500);
        }
      } else {
        setScore(prev => prev + 1);
        speak("Excellent! Well done!");
        transitionTimeoutRef.current = setTimeout(nextModeOrFinish, 2000);
      }
    } else {
      setFeedback('wrong');
      const nextAttempts = attemptsRef.current + 1;
      setAttempts(nextAttempts);

      if (nextAttempts >= 3 && !isReviewingRef.current) {
        setIsProcessingState(true);
        setReviewQueue(prev => [...prev, currentIndexRef.current]);
        speak("Let's try this one later. Next word!");
        transitionTimeoutRef.current = setTimeout(nextModeOrFinish, 2500);
      } else {
        speak("Good try! Listen and repeat.");
        transitionTimeoutRef.current = setTimeout(() => {
          speak(targetWord.word);
        }, 2000);
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
    setReviewQueue([]);
    setIsReviewing(false);
    setReviewIndex(0);
    setReviewSuccesses(0);
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
            {isReviewing ? (isRtl ? 'مراجعة الكلمات' : 'Review Mode') : (t as any).pronunciationTitle}
          </h1>
          <div className="flex items-center justify-center gap-2">
            <div className="bg-[#002147] text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2">
              <Trophy size={16} className="text-yellow-400" />
              <span>{score}</span>
            </div>
            {isReviewing && (
              <div className="bg-indigo-500 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
                Reviewing
              </div>
            )}
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
                  {[...Array(3)].map((_, i) => (
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
                {isReviewing && (
                  <div className="flex justify-center gap-2 mb-2">
                    <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 ${reviewSuccesses >= 1 ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      <CheckCircle2 size={12} /> Step 1
                    </div>
                    <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 ${reviewSuccesses >= 2 ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      <CheckCircle2 size={12} /> Step 2
                    </div>
                  </div>
                )}
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
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Perfect Score</span>
                    <span className="text-xl font-black text-[#002147]">{PRACTICE_WORDS.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Words Reviewed</span>
                    <span className="text-xl font-black text-indigo-500">{reviewQueue.length}</span>
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
