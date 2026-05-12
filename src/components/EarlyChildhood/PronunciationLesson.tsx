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

  const currentWord = PRACTICE_WORDS[currentIndex];
  
  // Speech Recognition setup
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        setRecognizedText(transcript);
        validatePronunciation(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
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

  const startListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }
    setRecognizedText('');
    setFeedback('none');
    setIsListening(true);
    recognitionRef.current.start();
  };

  const validatePronunciation = (transcript: string) => {
    const target = currentWord.word.toLowerCase();
    
    // Fuzzy matching logic - very simple for children
    if (transcript.includes(target) || target.includes(transcript)) {
      setFeedback('correct');
      setScore(prev => prev + 1);
      speak("Excellent! Well done!");
      
      setTimeout(() => {
        if (currentIndex < PRACTICE_WORDS.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setFeedback('none');
          setRecognizedText('');
        } else {
          setShowCelebration(true);
        }
      }, 2000);
    } else {
      setFeedback('wrong');
      speak("Good try! Listen again and try to repeat.");
      // Automatically play the correct pronunciation after a short delay
      setTimeout(() => {
        speak(currentWord.word);
      }, 2000);
    }
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setFeedback('none');
    setShowCelebration(false);
    setRecognizedText('');
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
          <div className="flex items-center justify-center gap-2">
            <div className="bg-[#002147] text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2">
              <Trophy size={16} className="text-yellow-400" />
              <span>{score}</span>
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
          {!showCelebration ? (
            <motion.div 
              key={currentWord.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              className="w-full flex flex-col items-center text-center gap-6 md:gap-10"
            >
              <div 
                className="w-48 h-48 md:w-72 md:h-72 rounded-[3rem] md:rounded-[5rem] shadow-2xl flex items-center justify-center text-[100px] md:text-[150px] bg-white border-8 transition-colors"
                style={{ borderColor: feedback === 'correct' ? '#10b981' : feedback === 'wrong' ? '#ef4444' : 'white' }}
              >
                {currentWord.emoji}
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
                  <button 
                    onClick={startListening}
                    disabled={isListening}
                    className={`w-full py-4 md:py-6 rounded-3xl md:rounded-[2.5rem] font-black text-xl md:text-3xl shadow-2xl flex items-center justify-center gap-4 transition-all active:scale-95 ${
                      isListening 
                      ? 'bg-rose-500 text-white animate-pulse' 
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
                <p className="text-xl md:text-2xl font-bold text-slate-400">{isRtl ? 'أكملت جميع الكلمات بنجاح!' : 'You mastered all the words!'}</p>
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
