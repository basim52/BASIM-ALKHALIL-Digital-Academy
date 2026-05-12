import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { translations, Language } from '../../lib/translations';
import { 
  ArrowLeft, 
  Volume2, 
  PartyPopper,
  Cat,
  Dog,
  Fish,
  Bird,
  Rabbit,
  Moon,
  Sun,
  Umbrella,
  Smartphone,
  Music,
  Camera,
  Heart,
  Star as StarIcon,
  Cloud,
  Zap,
  Leaf,
  Ghost,
  Flower,
  Car,
  Plane,
  Ship,
  Wind,
  Gamepad2,
  Trophy,
  Star
} from 'lucide-react';

interface LetterOption {
  letter: string;
  word: string;
  wordAr: string;
  icon?: any;
  emoji?: string;
  color: string;
  shadowColor: string;
}

const LETTER_GROUPS = [
  {
    id: 1,
    title: 'Level 1: A-G',
    titleAr: 'المستوى الأول: أ-ج',
    letters: [
      { letter: 'A', word: 'Apple', wordAr: 'تفاحة', emoji: '🍎', color: '#ef4444', shadowColor: 'rgba(239, 68, 68, 0.4)' },
      { letter: 'B', word: 'Ball', wordAr: 'كرة', emoji: '⚽', color: '#3b82f6', shadowColor: 'rgba(59, 130, 246, 0.4)' },
      { letter: 'C', word: 'Cat', wordAr: 'قطة', icon: Cat, color: '#f59e0b', shadowColor: 'rgba(245, 158, 11, 0.4)' },
      { letter: 'D', word: 'Dog', wordAr: 'كلب', icon: Dog, color: '#92400e', shadowColor: 'rgba(146, 64, 14, 0.4)' },
      { letter: 'E', word: 'Egg', wordAr: 'بيضة', emoji: '🥚', color: '#facc15', shadowColor: 'rgba(250, 204, 21, 0.4)' },
      { letter: 'F', word: 'Fish', wordAr: 'سمكة', icon: Fish, color: '#06b6d4', shadowColor: 'rgba(6, 182, 212, 0.4)' },
      { letter: 'G', word: 'Grapes', wordAr: 'عنب', emoji: '🍇', color: '#a855f7', shadowColor: 'rgba(168, 85, 247, 0.4)' },
    ]
  },
  {
    id: 2,
    title: 'Level 2: H-N',
    titleAr: 'المستوى الثاني: ح-ن',
    letters: [
      { letter: 'H', word: 'Hat', wordAr: 'قبعة', emoji: '🎩', color: '#8b5cf6', shadowColor: 'rgba(139, 92, 246, 0.4)' },
      { letter: 'I', word: 'Ice Cream', wordAr: 'آيس كريم', emoji: '🍦', color: '#ec4899', shadowColor: 'rgba(236, 72, 153, 0.4)' },
      { letter: 'J', word: 'Juice', wordAr: 'عصير', emoji: '🧃', color: '#f97316', shadowColor: 'rgba(249, 115, 22, 0.4)' },
      { letter: 'K', word: 'Kite', wordAr: 'طائرة ورقية', emoji: '🪁', color: '#38bdf8', shadowColor: 'rgba(56, 189, 248, 0.4)' },
      { letter: 'L', word: 'Lion', wordAr: 'أسد', emoji: '🦁', color: '#ea580c', shadowColor: 'rgba(234, 88, 12, 0.4)' },
      { letter: 'M', word: 'Moon', wordAr: 'قمر', icon: Moon, color: '#475569', shadowColor: 'rgba(71, 85, 105, 0.4)' },
      { letter: 'N', word: 'Nest', wordAr: 'عش', emoji: '🪺', color: '#16a34a', shadowColor: 'rgba(22, 163, 74, 0.4)' },
    ]
  },
  {
    id: 3,
    title: 'Level 3: O-U',
    titleAr: 'المستوى الثالث: و-ي',
    letters: [
      { letter: 'O', word: 'Orange', wordAr: 'برتقال', emoji: '🍊', color: '#fb923c', shadowColor: 'rgba(251, 146, 60, 0.4)' },
      { letter: 'P', word: 'Pen', wordAr: 'قلم', emoji: '🖊️', color: '#64748b', shadowColor: 'rgba(100, 116, 139, 0.4)' },
      { letter: 'Q', word: 'Queen', wordAr: 'ملكة', emoji: '👸', color: '#db2777', shadowColor: 'rgba(219, 39, 119, 0.4)' },
      { letter: 'R', word: 'Rabbit', wordAr: 'أرنب', icon: Rabbit, color: '#94a3b8', shadowColor: 'rgba(148, 163, 184, 0.4)' },
      { letter: 'S', word: 'Sun', wordAr: 'شمس', icon: Sun, color: '#facc15', shadowColor: 'rgba(250, 204, 21, 0.4)' },
      { letter: 'T', word: 'Tiger', wordAr: 'نمر', emoji: '🐯', color: '#ea580c', shadowColor: 'rgba(234, 88, 12, 0.4)' },
      { letter: 'U', word: 'Umbrella', wordAr: 'مظلة', icon: Umbrella, color: '#6366f1', shadowColor: 'rgba(99, 102, 241, 0.4)' },
    ]
  },
  {
    id: 4,
    title: 'Level 4: V-Z',
    titleAr: 'المستوى الرابع: المتمكن',
    letters: [
      { letter: 'V', word: 'Van', wordAr: 'شاحنة', icon: Car, color: '#dc2626', shadowColor: 'rgba(220, 38, 38, 0.4)' },
      { letter: 'W', word: 'Whale', wordAr: 'حوت', emoji: '🐋', color: '#0ea5e9', shadowColor: 'rgba(14, 165, 233, 0.4)' },
      { letter: 'X', word: 'Xylophone', wordAr: 'إكسيلوفون', icon: Music, color: '#a855f7', shadowColor: 'rgba(168, 85, 247, 0.4)' },
      { letter: 'Y', word: 'Yo-yo', wordAr: 'يويو', emoji: '🪀', color: '#ec4899', shadowColor: 'rgba(236, 72, 153, 0.4)' },
      { letter: 'Z', word: 'Zebra', wordAr: 'حمار وحشي', emoji: '🦓', color: '#111827', shadowColor: 'rgba(17, 24, 39, 0.4)' },
    ]
  }
];

export const LettersLesson = ({ lang, onBack }: { lang: Language, onBack: () => void }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const [activeLevel, setActiveLevel] = useState(1);
  const [activeLetter, setActiveLetter] = useState<LetterOption | null>(null);
  const [showExcellent, setShowExcellent] = useState(false);
  const [gameMode, setGameMode] = useState(false);
  const [targetLetter, setTargetLetter] = useState<LetterOption | null>(null);
  const [score, setScore] = useState(0);

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.75;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  }, []);

  const startNewLevel = useCallback(() => {
    const currentGroup = LETTER_GROUPS.find(g => g.id === activeLevel) || LETTER_GROUPS[0];
    const randomIndex = Math.floor(Math.random() * currentGroup.letters.length);
    const newTarget = currentGroup.letters[randomIndex];
    setTargetLetter(newTarget);
    
    setTimeout(() => {
      speak(`Find the letter ${newTarget.letter}`);
    }, 500);
  }, [activeLevel, speak]);

  const toggleGameMode = () => {
    const nextMode = !gameMode;
    setGameMode(nextMode);
    if (nextMode) {
      setScore(0);
      startNewLevel();
    } else {
      setTargetLetter(null);
    }
  };

  const handleLetterClick = (item: LetterOption) => {
    if (gameMode && targetLetter) {
        if (item.letter === targetLetter.letter) {
            const nextScore = score + 1;
            setScore(nextScore);
            
            if (nextScore >= 10) {
              speak(isRtl ? "رائع! لقد وجدت جميع الحروف العشرة! أنت عبقري في الحروف!" : "Amazing! You found all 10 letters! You are a letter genius!");
              setShowExcellent(true);
              setTimeout(() => {
                setShowExcellent(false);
                setGameMode(false);
                setScore(0);
                setTargetLetter(null);
              }, 4000);
              return;
            }

            speak(isRtl ? `ممتاز! هذا هو حرف ${item.letter}` : `Excellent! This is the letter ${item.letter}`);
            setShowExcellent(true);
            setTimeout(() => {
                setShowExcellent(false);
                startNewLevel();
            }, 1500);
        } else {
            speak(isRtl ? `لا، هذا هو حرف ${item.letter}. حاول مرة أخرى!` : `No, that is the letter ${item.letter}. Try again!`);
        }
    } else {
        setActiveLetter(item);
        speak(`${item.letter}. ${item.word}`);
        setShowExcellent(true);
        setTimeout(() => setShowExcellent(false), 2000);
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }
  };

  const currentGroup = LETTER_GROUPS.find(g => g.id === activeLevel) || LETTER_GROUPS[0];

  return (
    <div 
      className="min-h-screen transition-colors duration-700 p-4 md:p-10 flex flex-col items-center relative overflow-x-hidden"
      style={{ backgroundColor: activeLetter ? `${activeLetter.color}15` : '#f8fafc' }}
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
                {isRtl ? `أين الحرف ${targetLetter?.letter}؟` : `Find the Letter ${targetLetter?.letter}!`}
              </h1>
              <div className="flex items-center justify-center gap-2">
                <div className="bg-[#002147] text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                  <Trophy size={16} className="text-yellow-400" />
                  <span>{score}</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-xl md:text-5xl font-black text-[#002147] mb-1 tracking-tight">
                {t.letters}
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
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 z-10">
           {LETTER_GROUPS.map((group) => (
             <button
               key={group.id}
               onClick={() => {
                 setActiveLevel(group.id);
                 setActiveLetter(null);
                 speak(group.title);
               }}
               className={`px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl font-black text-[10px] md:text-sm uppercase tracking-widest transition-all ${
                 activeLevel === group.id 
                 ? 'bg-[#002147] text-white shadow-xl scale-105' 
                 : 'bg-white text-[#002147] hover:bg-slate-50 border border-slate-100'
               }`}
             >
               {isRtl ? group.titleAr : group.title}
             </button>
           ))}
        </div>
      )}

      <motion.div 
        key={activeLevel}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-6 w-full max-w-6xl z-10 px-2 ${gameMode ? 'mt-8' : ''}`}
      >
        {currentGroup.letters.map((item) => (
          <motion.button
            key={item.letter}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleLetterClick(item)}
            className={`aspect-square bg-white rounded-[1.75rem] md:rounded-[2.5rem] shadow-md flex flex-col items-center justify-center gap-1 md:gap-2 relative group overflow-hidden border-4 transition-all ${
              activeLetter?.letter === item.letter ? 'border-slate-200' : 'border-slate-50'
            }`}
          >
            <span 
              className="text-4xl md:text-6xl font-black transition-transform group-activeList:scale-110"
              style={{ color: item.color }}
            >
              {item.letter}
            </span>
            <div className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-slate-50/80 border border-slate-100 shadow-inner">
               {item.icon ? (
                 <item.icon className="w-5 h-5 md:w-7 md:h-7" style={{ color: item.color }} />
               ) : (
                 <span className="text-xl md:text-2xl">{item.emoji}</span>
               )}
            </div>
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {activeLetter && !gameMode && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="mt-10 mb-20 text-center z-10 max-w-sm w-full mx-auto px-4"
          >
             <div 
               className="w-32 h-32 md:w-56 md:h-56 rounded-[2.5rem] md:rounded-[3.5rem] flex items-center justify-center text-white shadow-2xl mx-auto border-4 md:border-8 border-white relative"
               style={{ backgroundColor: activeLetter.color }}
             >
                <span className="text-7xl md:text-[14rem] font-black leading-none">{activeLetter.letter}</span>
                <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-14 h-14 md:w-20 md:h-20 bg-white rounded-2xl md:rounded-3xl shadow-xl flex items-center justify-center border-2 md:border-4 border-slate-50">
                   {activeLetter.icon ? (
                     <activeLetter.icon className="w-8 h-8 md:w-10 md:h-10" style={{ color: activeLetter.color }} />
                   ) : (
                     <span className="text-2xl md:text-4xl">{activeLetter.emoji}</span>
                   )}
                </div>
             </div>
             <div className="mt-6 md:mt-8 bg-white/90 backdrop-blur-md p-5 md:p-8 rounded-3xl md:rounded-[2.5rem] shadow-xl border border-white/50">
                <p className="text-xl md:text-5xl font-black text-[#002147] tracking-tight">{activeLetter.letter} for {activeLetter.word}</p>
                <div className="flex items-center justify-center gap-2 mt-1">
                   <p className="text-base md:text-2xl font-bold text-slate-400">{isRtl ? activeLetter.wordAr : ''}</p>
                   <span className="text-xl md:text-2xl">{activeLetter.emoji}</span>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showExcellent && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="bg-white/90 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl border-4 border-emerald-400 text-center">
              <PartyPopper size={64} className="mx-auto mb-4 text-emerald-500" />
              <h2 className="text-4xl font-black text-[#002147]">{t.excellent}</h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none -z-10">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl"
        />
      </div>
    </div>
  );
};
