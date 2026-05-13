import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { translations, Language } from '../../lib/translations';
import { 
  ArrowLeft, 
  Volume2, 
  Sparkles,
  PartyPopper,
  Star,
  Gamepad2,
  Trophy
} from 'lucide-react';
import { LessonAssistant } from '../LessonAssistant';

interface NumberOption {
  value: number;
  name: string;
  nameAr: string;
  color: string;
  shadowColor: string;
}

const NUMBER_GROUPS = [
  {
    id: 1,
    title: 'Level 1: 1-10',
    titleAr: 'المستوى الأول: ١-١٠',
    numbers: [
      { value: 1, name: 'One', nameAr: 'واحد', color: '#ef4444', shadowColor: 'rgba(239, 68, 68, 0.4)' },
      { value: 2, name: 'Two', nameAr: 'اثنان', color: '#3b82f6', shadowColor: 'rgba(59, 130, 246, 0.4)' },
      { value: 3, name: 'Three', nameAr: 'ثلاثة', color: '#22c55e', shadowColor: 'rgba(34, 197, 94, 0.4)' },
      { value: 4, name: 'Four', nameAr: 'أربعة', color: '#eab308', shadowColor: 'rgba(234, 179, 8, 0.4)' },
      { value: 5, name: 'Five', nameAr: 'خمسة', color: '#a855f7', shadowColor: 'rgba(168, 85, 247, 0.4)' },
      { value: 6, name: 'Six', nameAr: 'ستة', color: '#f97316', shadowColor: 'rgba(249, 115, 22, 0.4)' },
      { value: 7, name: 'Seven', nameAr: 'سبعة', color: '#ec4899', shadowColor: 'rgba(236, 72, 153, 0.4)' },
      { value: 8, name: 'Eight', nameAr: 'ثمانية', color: '#06b6d4', shadowColor: 'rgba(6, 182, 212, 0.4)' },
      { value: 9, name: 'Nine', nameAr: 'تسعة', color: '#6366f1', shadowColor: 'rgba(99, 102, 241, 0.4)' },
      { value: 10, name: 'Ten', nameAr: 'عشرة', color: '#10b981', shadowColor: 'rgba(16, 185, 129, 0.4)' },
    ]
  },
  {
    id: 2,
    title: 'Level 2: 11-20',
    titleAr: 'المستوى الثاني: ١١-٢٠',
    numbers: [
      { value: 11, name: 'Eleven', nameAr: 'أحد عشر', color: '#ef4444', shadowColor: 'rgba(239, 68, 68, 0.4)' },
      { value: 12, name: 'Twelve', nameAr: 'اثنا عشر', color: '#3b82f6', shadowColor: 'rgba(59, 130, 246, 0.4)' },
      { value: 13, name: 'Thirteen', nameAr: 'ثلاثة عشر', color: '#22c55e', shadowColor: 'rgba(34, 197, 94, 0.4)' },
      { value: 14, name: 'Fourteen', nameAr: 'أربعة عشر', color: '#eab308', shadowColor: 'rgba(234, 179, 8, 0.4)' },
      { value: 15, name: 'Fifteen', nameAr: 'خمسة عشر', color: '#a855f7', shadowColor: 'rgba(168, 85, 247, 0.4)' },
      { value: 16, name: 'Sixteen', nameAr: 'ستة عشر', color: '#f97316', shadowColor: 'rgba(249, 115, 22, 0.4)' },
      { value: 17, name: 'Seventeen', nameAr: 'سبعة عشر', color: '#ec4899', shadowColor: 'rgba(236, 72, 153, 0.4)' },
      { value: 18, name: 'Eighteen', nameAr: 'ثمانية عشر', color: '#06b6d4', shadowColor: 'rgba(6, 182, 212, 0.4)' },
      { value: 19, name: 'Nineteen', nameAr: 'تسعة عشر', color: '#6366f1', shadowColor: 'rgba(99, 102, 241, 0.4)' },
      { value: 20, name: 'Twenty', nameAr: 'عشرون', color: '#10b981', shadowColor: 'rgba(16, 185, 129, 0.4)' },
    ]
  }
];

export const NumbersLesson = ({ lang, onBack, onComplete }: { lang: Language, onBack: () => void, onComplete?: (score: number, total: number) => void }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const [activeLevel, setActiveLevel] = useState(1);
  const [activeNumber, setActiveNumber] = useState<NumberOption | null>(null);
  const [showExcellent, setShowExcellent] = useState(false);
  const [gameMode, setGameMode] = useState(false);
  const [targetNumber, setTargetNumber] = useState<NumberOption | null>(null);
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [itemAttempts, setItemAttempts] = useState(0);
  const MAX_TOTAL_ATTEMPTS = 12;

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  }, []);

  const finishGame = useCallback((finalScore: number) => {
    speak(isRtl 
      ? `انتهى اللعب! نتيجتك هي ${finalScore} من ${MAX_TOTAL_ATTEMPTS}. عمل رائع!` 
      : `Game over! Your score is ${finalScore} out of ${MAX_TOTAL_ATTEMPTS}. Great job!`);
    setShowExcellent(true);
    if (onComplete) onComplete(finalScore, MAX_TOTAL_ATTEMPTS);
    setTimeout(() => {
      setShowExcellent(false);
      setGameMode(false);
      setScore(0);
      setTotalAttempts(0);
      setItemAttempts(0);
      setTargetNumber(null);
    }, 4000);
  }, [isRtl, speak, totalAttempts]);

  const startNewLevel = useCallback(() => {
    const currentGroup = NUMBER_GROUPS.find(g => g.id === activeLevel) || NUMBER_GROUPS[0];
    const randomIndex = Math.floor(Math.random() * currentGroup.numbers.length);
    const newTarget = currentGroup.numbers[randomIndex];
    setTargetNumber(newTarget);
    setItemAttempts(0);
    
    setTimeout(() => {
      speak(`Find the number ${newTarget.value}`);
    }, 500);
  }, [activeLevel, speak]);

  const toggleGameMode = () => {
    const nextMode = !gameMode;
    setGameMode(nextMode);
    if (nextMode) {
      setScore(0);
      setTotalAttempts(0);
      setItemAttempts(0);
      startNewLevel();
    } else {
      setTargetNumber(null);
    }
  };

  const handleNumberClick = (num: NumberOption) => {
    if (gameMode && targetNumber) {
        const currentTotal = totalAttempts + 1;
        setTotalAttempts(currentTotal);

        if (num.value === targetNumber.value) {
            const nextScore = score + 1;
            setScore(nextScore);
            
            if (currentTotal >= MAX_TOTAL_ATTEMPTS) {
              finishGame(nextScore);
              return;
            }

            speak(isRtl ? `ممتاز! هذا هو الرقم ${num.value}` : `Excellent! This is the number ${num.value}`);
            setShowExcellent(true);
            setTimeout(() => {
                setShowExcellent(false);
                startNewLevel();
            }, 1500);
        } else {
            const nextItemAttempts = itemAttempts + 1;
            if (nextItemAttempts >= 2) {
              speak(isRtl ? `لا بأس، لنجرب رقماً آخر. هذا كان الرقم ${targetNumber.value}.` : `It's okay, let's try another number. That was the number ${targetNumber.value}.`);
              
              if (currentTotal >= MAX_TOTAL_ATTEMPTS) {
                setTimeout(() => finishGame(score), 2000);
              } else {
                setTimeout(startNewLevel, 2000);
              }
            } else {
              setItemAttempts(nextItemAttempts);
              speak(isRtl ? `لا، هذا هو الرقم ${num.value}. حاول مرة أخرى!` : `No, that is the number ${num.value}. Try again!`);
            }
        }
    } else {
        setActiveNumber(num);
        speak(num.name);
        setShowExcellent(true);
        setTimeout(() => setShowExcellent(false), 2000);
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }
  };

  const currentGroup = NUMBER_GROUPS.find(g => g.id === activeLevel) || NUMBER_GROUPS[0];

  return (
    <div 
      className="min-h-screen transition-colors duration-700 p-4 md:p-10 flex flex-col items-center relative overflow-x-hidden"
      style={{ backgroundColor: activeNumber ? `${activeNumber.color}15` : '#f8fafc' }}
    >
      <div className="w-full max-w-6xl flex items-center justify-between mb-6 md:mb-8 z-20">
        <button 
          onClick={onBack}
          className="w-12 h-12 md:w-16 md:h-16 bg-white shadow-lg rounded-xl md:rounded-2xl flex items-center justify-center text-[#002147] hover:scale-110 active:scale-90 transition-all border border-slate-50"
        >
          <ArrowLeft size={24} className={isRtl ? 'rotate-180' : ''} />
        </button>
        
        <div className="text-center px-1">
          {gameMode ? (
            <div className="animate-bounce">
              <h1 className="text-2xl md:text-5xl font-black text-[#002147] mb-1 md:mb-2 tracking-tight">
                {isRtl ? `أين الرقم ${targetNumber?.value}؟` : `Find the Number ${targetNumber?.value}!`}
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
          ) : (
            <>
              <h1 className="text-xl md:text-5xl font-black text-[#002147] mb-1 tracking-tight">
                {t.numbers}
              </h1>
              <div className="flex items-center justify-center gap-1.5 text-slate-500 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/80 shadow-sm">
                <Volume2 size={16} />
                <span className="text-[10px] md:text-sm font-bold uppercase tracking-wider">{t.pressToHear}</span>
              </div>
            </>
          )}
        </div>

        <button 
          onClick={toggleGameMode}
          className={`w-12 h-12 md:w-16 md:h-16 shadow-lg rounded-xl md:rounded-2xl flex items-center justify-center transition-all outline-none border ${
            gameMode 
            ? 'bg-[#002147] text-white border-white/20' 
            : 'bg-white text-[#C49E3A] border-slate-50 hover:bg-slate-50'
          }`}
        >
          <Gamepad2 size={24} />
        </button>
      </div>

      {!gameMode && (
        <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-8 z-10">
           {NUMBER_GROUPS.map((group) => (
             <button
               key={group.id}
               onClick={() => {
                 setActiveLevel(group.id);
                 setActiveNumber(null);
                 speak(group.title);
               }}
               className={`px-4 md:px-8 py-2 md:py-4 rounded-xl md:rounded-3xl font-black text-[10px] md:text-sm uppercase tracking-widest transition-all ${
                 activeLevel === group.id 
                 ? 'bg-[#002147] text-white shadow-xl scale-105' 
                 : 'bg-white text-[#002147] hover:bg-slate-50 border border-slate-100 shadow-sm'
               }`}
             >
               {isRtl ? group.titleAr : group.title}
             </button>
           ))}
        </div>
      )}

      <motion.div 
        key={activeLevel}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 gap-3 md:gap-6 w-full max-w-5xl z-10 px-2 ${gameMode ? 'mt-8' : ''}`}
      >
        {currentGroup.numbers.map((num) => (
          <motion.button
            key={num.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleNumberClick(num)}
            className="aspect-square rounded-[1.75rem] md:rounded-[2.5rem] shadow-lg flex flex-col items-center justify-center gap-1 relative group overflow-hidden"
            style={{ 
              backgroundColor: num.color,
              boxShadow: `0 8px 24px -8px ${num.shadowColor}`
            }}
          >
            <span className="text-4xl md:text-6xl font-black text-white drop-shadow-lg group-activeList:scale-110 transition-transform">
              {num.value}
            </span>
            <span className="text-[10px] md:text-sm font-bold text-white/80 uppercase tracking-tighter">
              {isRtl ? num.nameAr : num.name}
            </span>
          </motion.button>
        ))}
      </motion.div>

      {activeNumber && !gameMode && (
        <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-2 md:gap-3 max-w-3xl z-10 pb-10">
          <AnimatePresence mode="popLayout">
            {Array.from({ length: activeNumber.value }).map((_, i) => (
              <motion.div
                key={`${activeNumber.value}-${i}`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 15, delay: i * 0.02 }}
              >
                <div 
                  className="w-8 h-8 md:w-14 md:h-14 rounded-lg md:rounded-xl flex items-center justify-center text-white shadow-md border border-white/20"
                  style={{ backgroundColor: activeNumber.color }}
                >
                  <Star className="w-5 h-5 md:w-8 md:h-8" fill="currentColor" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {showExcellent && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-6"
          >
            <div className="bg-white/95 backdrop-blur-xl p-8 rounded-[3rem] shadow-2xl border-4 border-emerald-400 text-center flex flex-col items-center gap-4">
              <PartyPopper size={48} className="text-emerald-500 md:w-16 md:h-16" />
              <h2 className="text-3xl md:text-4xl font-black text-[#002147]">{t.excellent}</h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl" />
      </div>
      <LessonAssistant 
        lessonTitle={isRtl ? 'درس الأرقام' : 'Numbers Lesson'} 
        lessonContent="Counting from 1 to 10 with visuals, numerals, and pronunciation practice for young learners." 
        isRtl={isRtl} 
      />
    </div>
  );
};
