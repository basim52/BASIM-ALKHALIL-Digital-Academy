import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Volume2, 
  Star, 
  PartyPopper,
  Gamepad2,
  Trophy
} from 'lucide-react';

interface WordOption {
  id: string;
  word: string;
  wordAr: string;
  image?: string;
  color: string;
  shadowColor: string;
  emoji: string;
}

interface WordLevel {
  id: number;
  title: string;
  titleAr: string;
  emoji: string;
  words: WordOption[];
}

interface FirstWordsLessonProps {
  onBack: () => void;
  isRtl: boolean;
  t: any;
}

const WORD_LEVELS: WordLevel[] = [
  {
    id: 1,
    title: 'Greetings',
    titleAr: 'التحيات',
    emoji: '👋',
    words: [
      { id: 'hello', word: 'Hello', wordAr: 'مرحباً', emoji: '👋', color: '#FFADAD', shadowColor: 'rgba(255, 173, 173, 0.4)' },
      { id: 'bye', word: 'Goodbye', wordAr: 'مع السلامة', emoji: '👋', color: '#9BFBC1', shadowColor: 'rgba(155, 251, 193, 0.4)' },
      { id: 'morning', word: 'Good Morning', wordAr: 'صباح الخير', emoji: '☀️', color: '#FDFFB6', shadowColor: 'rgba(253, 255, 182, 0.4)' },
      { id: 'night', word: 'Good Night', wordAr: 'تصبح على خير', emoji: '🌙', color: '#A0C4FF', shadowColor: 'rgba(160, 196, 255, 0.4)' },
      { id: 'welcome', word: 'Welcome', wordAr: 'أهلاً بك', emoji: '🤝', color: '#BDB2FF', shadowColor: 'rgba(189, 178, 255, 0.4)' },
      { id: 'yes', word: 'Yes', wordAr: 'نعم', emoji: '✅', color: '#CAFFBF', shadowColor: 'rgba(202, 255, 191, 0.4)' },
      { id: 'no', word: 'No', wordAr: 'لا', emoji: '❌', color: '#FFD6A5', shadowColor: 'rgba(255, 214, 165, 0.4)' },
      { id: 'ok', word: 'Okay', wordAr: 'حسناً', emoji: '👌', color: '#FFC6FF', shadowColor: 'rgba(255, 198, 255, 0.4)' },
      { id: 'friend', word: 'Friend', wordAr: 'صديق', emoji: '👦', color: '#9BFBC1', shadowColor: 'rgba(155, 251, 193, 0.4)' },
      { id: 'love', word: 'I Love You', wordAr: 'أنا أحبك', emoji: '❤️', color: '#FFADAD', shadowColor: 'rgba(255, 173, 173, 0.4)' },
    ]
  },
  {
    id: 2,
    title: 'Manners',
    titleAr: 'الأدب والذوق',
    emoji: '💖',
    words: [
      { id: 'please', word: 'Please', wordAr: 'من فضلك', emoji: '🙏', color: '#FFADAD', shadowColor: 'rgba(255, 173, 173, 0.4)' },
      { id: 'thanks', word: 'Thank you', wordAr: 'شكراً لك', emoji: '💖', color: '#9BFBC1', shadowColor: 'rgba(155, 251, 193, 0.4)' },
      { id: 'sorry', word: 'Sorry', wordAr: 'أنا آسف', emoji: '🥺', color: '#A0C4FF', shadowColor: 'rgba(160, 196, 255, 0.4)' },
      { id: 'help', word: 'Help me', wordAr: 'ساعدني', emoji: '🙋', color: '#BDB2FF', shadowColor: 'rgba(189, 178, 255, 0.4)' },
      { id: 'share', word: 'Share', wordAr: 'شارك', emoji: '🎁', color: '#CAFFBF', shadowColor: 'rgba(202, 255, 191, 0.4)' },
      { id: 'wait', word: 'Wait', wordAr: 'انتظر', emoji: '⏳', color: '#FFD6A5', shadowColor: 'rgba(255, 214, 165, 0.4)' },
      { id: 'nice', word: 'Kind', wordAr: 'لطيف', emoji: '🌈', color: '#FFC6FF', shadowColor: 'rgba(255, 198, 255, 0.4)' },
      { id: 'listen', word: 'Listen', wordAr: 'اسمع', emoji: '👂', color: '#9BFBC1', shadowColor: 'rgba(155, 251, 193, 0.4)' },
      { id: 'look', word: 'Look', wordAr: 'انظر', emoji: '👀', color: '#FDFFB6', shadowColor: 'rgba(253, 255, 182, 0.4)' },
      { id: 'quiet', word: 'Quiet', wordAr: 'هادئ', emoji: '🤫', color: '#A0C4FF', shadowColor: 'rgba(160, 196, 255, 0.4)' },
    ]
  },
  {
    id: 3,
    title: 'About Me',
    titleAr: 'عني أنا',
    emoji: '🧒',
    words: [
      { id: 'me', word: 'Me', wordAr: 'أنا', emoji: '🧒', color: '#FFADAD', shadowColor: 'rgba(255, 173, 173, 0.4)' },
      { id: 'name', word: 'My Name', wordAr: 'اسمي', emoji: '🏷️', color: '#9BFBC1', shadowColor: 'rgba(155, 251, 193, 0.4)' },
      { id: 'boy', word: 'Boy', wordAr: 'ولد', emoji: '👦', color: '#A0C4FF', shadowColor: 'rgba(160, 196, 255, 0.4)' },
      { id: 'girl', word: 'Girl', wordAr: 'بنت', emoji: '👧', color: '#FFC6FF', shadowColor: 'rgba(255, 198, 255, 0.4)' },
      { id: 'age', word: 'Age', wordAr: 'عمري', emoji: '🎂', color: '#FDFFB6', shadowColor: 'rgba(253, 255, 182, 0.4)' },
      { id: 'head', word: 'Head', wordAr: 'رأس', emoji: '💆', color: '#BDB2FF', shadowColor: 'rgba(189, 178, 255, 0.4)' },
      { id: 'eye', word: 'Eye', wordAr: 'عين', emoji: '👁️', color: '#FFD6A5', shadowColor: 'rgba(255, 214, 165, 0.4)' },
      { id: 'nose', word: 'Nose', wordAr: 'أنف', emoji: '👃', color: '#CAFFBF', shadowColor: 'rgba(202, 255, 191, 0.4)' },
      { id: 'hand', word: 'Hand', wordAr: 'يد', emoji: '✋', color: '#FFADAD', shadowColor: 'rgba(255, 173, 173, 0.4)' },
      { id: 'feet', word: 'Foot', wordAr: 'قدم', emoji: '🦶', color: '#9BFBC1', shadowColor: 'rgba(155, 251, 193, 0.4)' },
    ]
  },
  {
    id: 4,
    title: 'Actions',
    titleAr: 'أفعال',
    emoji: '🏃',
    words: [
      { id: 'run', word: 'Run', wordAr: 'يجري', emoji: '🏃', color: '#FFADAD', shadowColor: 'rgba(255, 173, 173, 0.4)' },
      { id: 'jump', word: 'Jump', wordAr: 'يقفز', emoji: '🦘', color: '#9BFBC1', shadowColor: 'rgba(155, 251, 193, 0.4)' },
      { id: 'eat', word: 'Eat', wordAr: 'يأكل', emoji: '🍎', color: '#FDFFB6', shadowColor: 'rgba(253, 255, 182, 0.4)' },
      { id: 'drink', word: 'Drink', wordAr: 'يشرب', emoji: '🥤', color: '#A0C4FF', shadowColor: 'rgba(160, 196, 255, 0.4)' },
      { id: 'sleep', word: 'Sleep', wordAr: 'نام', emoji: '😴', color: '#BDB2FF', shadowColor: 'rgba(189, 178, 255, 0.4)' },
      { id: 'play', word: 'Play', wordAr: 'لعب', emoji: '🎾', color: '#CAFFBF', shadowColor: 'rgba(202, 255, 191, 0.4)' },
      { id: 'laugh', word: 'Laugh', wordAr: 'ضحك', emoji: '😆', color: '#FFD6A5', shadowColor: 'rgba(255, 214, 165, 0.4)' },
      { id: 'cry', word: 'Cry', wordAr: 'بكى', emoji: '😢', color: '#FFC6FF', shadowColor: 'rgba(255, 198, 255, 0.4)' },
      { id: 'walk', word: 'Walk', wordAr: 'مشى', emoji: '🚶', color: '#9BFBC1', shadowColor: 'rgba(155, 251, 193, 0.4)' },
      { id: 'sing', word: 'Sing', wordAr: 'غنى', emoji: '🎤', color: '#FFADAD', shadowColor: 'rgba(255, 173, 173, 0.4)' },
    ]
  },
  {
    id: 5,
    title: 'Feelings',
    titleAr: 'المشاعر',
    emoji: '😊',
    words: [
      { id: 'happy', word: 'Happy', wordAr: 'سعيد', emoji: '😊', color: '#FFADAD', shadowColor: 'rgba(255, 173, 173, 0.4)' },
      { id: 'sad', word: 'Sad', wordAr: 'حزين', emoji: '😢', color: '#A0C4FF', shadowColor: 'rgba(160, 196, 255, 0.4)' },
      { id: 'angry', word: 'Angry', wordAr: 'غاضب', emoji: '😠', color: '#ef4444', shadowColor: 'rgba(239, 68, 68, 0.4)' },
      { id: 'scared', word: 'Scared', wordAr: 'خائف', emoji: '😨', color: '#BDB2FF', shadowColor: 'rgba(189, 178, 255, 0.4)' },
      { id: 'excited', word: 'Excited', wordAr: 'متحمس', emoji: '🤩', color: '#FFD6A5', shadowColor: 'rgba(255, 214, 165, 0.4)' },
      { id: 'tired', word: 'Tired', wordAr: 'تعبان', emoji: '😴', color: '#94a3b8', shadowColor: 'rgba(148, 163, 184, 0.4)' },
      { id: 'hungry', word: 'Hungry', wordAr: 'جائع', emoji: '😋', color: '#CAFFBF', shadowColor: 'rgba(202, 255, 191, 0.4)' },
      { id: 'thirsty', word: 'Thirsty', wordAr: 'عطشان', emoji: '💧', color: '#3b82f6', shadowColor: 'rgba(59, 130, 246, 0.4)' },
      { id: 'brave', word: 'Brave', wordAr: 'شجاع', emoji: '🦁', color: '#ea580c', shadowColor: 'rgba(234, 88, 12, 0.4)' },
      { id: 'funny', word: 'Funny', wordAr: 'مضحك', emoji: '🤡', color: '#FFC6FF', shadowColor: 'rgba(255, 198, 255, 0.4)' },
    ]
  }
];

export const FirstWordsLesson: React.FC<FirstWordsLessonProps> = ({ onBack, isRtl, t }) => {
  const [activeLevel, setActiveLevel] = useState(1);
  const [learnedWords, setLearnedWords] = useState<Set<string>>(new Set());
  const [showExcellent, setShowExcellent] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [gameMode, setGameMode] = useState(false);
  const [targetWord, setTargetWord] = useState<WordOption | null>(null);
  const [score, setScore] = useState(0);

  const currentLevel = WORD_LEVELS.find(l => l.id === activeLevel) || WORD_LEVELS[0];

  const speak = useCallback((text: string, lang: string = 'en-US') => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, []);

  const startNewLevel = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * currentLevel.words.length);
    const newTarget = currentLevel.words[randomIndex];
    setTargetWord(newTarget);
    
    setTimeout(() => {
      speak(`Find the word ${newTarget.word}`);
    }, 500);
  }, [currentLevel, speak]);

  const toggleGameMode = () => {
    const nextMode = !gameMode;
    setGameMode(nextMode);
    if (nextMode) {
      setScore(0);
      startNewLevel();
    } else {
      setTargetWord(null);
    }
  };

  const handleWordClick = (word: WordOption) => {
    if (gameMode && targetWord) {
        if (word.id === targetWord.id) {
            const nextScore = score + 1;
            setScore(nextScore);
            
            if (nextScore >= 10) {
              speak(isRtl ? "رائع! لقد وجدت جميع الكلمات العشرة! أنت قارئ متميز!" : "Amazing! You found all 10 words! You are an outstanding reader!");
              setShowExcellent(true);
              setTimeout(() => {
                setShowExcellent(false);
                setGameMode(false);
                setScore(0);
                setTargetWord(null);
              }, 4000);
              return;
            }

            speak(isRtl ? `ممتاز! هذه هي كلمة ${word.wordAr}` : `Excellent! This is ${word.word}`);
            setShowExcellent(true);
            setTimeout(() => {
                setShowExcellent(false);
                startNewLevel();
            }, 1500);
        } else {
            speak(isRtl ? `لا، هذه كلمة ${word.wordAr}. حاول مرة أخرى!` : `No, that is ${word.word}. Try again!`);
        }
    } else {
        setActiveId(word.id);
        speak(word.word);
        
        setLearnedWords(prev => {
          const next = new Set(prev);
          next.add(word.id);
          return next;
        });

        setTimeout(() => setActiveId(null), 1000);
    }
  };

  useEffect(() => {
    if (gameMode) return;
    const currentWordsLearned = Array.from(learnedWords).filter(id => 
      currentLevel.words.some(w => w.id === id)
    );
    if (currentWordsLearned.length === currentLevel.words.length && !showExcellent && currentLevel.words.length > 0) {
      setShowExcellent(true);
      setTimeout(() => setShowExcellent(false), 3000);
    }
  }, [learnedWords.size, activeLevel, gameMode, currentLevel]);

  const progressCount = Array.from(learnedWords).filter(id => 
    currentLevel.words.some(w => w.id === id)
  ).length;

  return (
    <div className="min-h-screen bg-[#FDFCF0] relative overflow-x-hidden font-sans pb-32">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-[#FDFCF0]/80 backdrop-blur-md px-4 py-3 border-b border-slate-100 mb-4 md:mb-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button 
            onClick={onBack}
            className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white shadow-md flex items-center justify-center text-[#002147] hover:scale-110 active:scale-90 transition-transform border border-slate-50"
          >
            <ArrowLeft size={20} className={isRtl ? 'rotate-180' : ''} />
          </button>
          
          <div className="text-center px-1">
            {gameMode ? (
              <div className="animate-bounce">
                <h1 className="text-lg md:text-2xl font-black text-[#002147] leading-tight">
                  {isRtl ? `أين هو "${targetWord?.wordAr}"؟` : `Find "${targetWord?.word}"!`}
                </h1>
                <div className="flex items-center justify-center gap-1.5">
                   <Trophy size={14} className="text-yellow-500" />
                   <span className="text-sm font-black text-[#002147]">{score}</span>
                </div>
              </div>
            ) : (
                <>
                  <h1 className="text-base md:text-2xl font-black text-[#002147] leading-tight line-clamp-1">
                    {isRtl ? currentLevel.titleAr : currentLevel.title}
                  </h1>
                  <p className="text-[10px] md:text-sm text-slate-500 font-bold opacity-70">
                    {t.hearAndLearn}
                  </p>
                </>
            )}
          </div>

          <button 
            onClick={toggleGameMode}
            className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl shadow-md flex items-center justify-center transition-all ${
                gameMode ? 'bg-[#002147] text-white' : 'bg-white text-[#C49E3A] border border-slate-50'
            }`}
          >
            <Gamepad2 size={20} />
          </button>
        </div>
      </div>

      {!gameMode && (
        <div className="px-4 mb-6">
          <div className="max-w-6xl mx-auto flex overflow-x-auto gap-2 pb-4 no-scrollbar snap-x scroll-smooth -mx-4 px-4">
             {WORD_LEVELS.map((level) => (
               <button
                 key={level.id}
                 onClick={() => {
                   setActiveLevel(level.id);
                   speak(isRtl ? level.titleAr : level.title);
                 }}
                 className={`flex-shrink-0 snap-start px-4 md:px-6 py-3 md:py-3.5 rounded-xl md:rounded-2xl font-black text-[10px] md:text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                   activeLevel === level.id 
                   ? 'bg-[#002147] text-white shadow-xl -translate-y-0.5' 
                   : 'bg-white text-[#002147] border border-slate-200 hover:border-[#002147]/20'
                 }`}
               >
                 <span className="text-base md:text-xl">{level.emoji}</span>
                 <span className="truncate max-w-[100px] md:max-w-none">{isRtl ? level.titleAr : level.title}</span>
               </button>
             ))}
          </div>
        </div>
      )}

      <motion.div 
        key={activeLevel}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 px-4 pb-12 ${gameMode ? 'mt-8' : ''}`}
      >
        {currentLevel.words.map((word) => (
          <motion.button
            key={word.id}
            onClick={() => handleWordClick(word)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.9 }}
            animate={activeId === word.id ? { 
              rotate: [0, -5, 5, -5, 5, 0],
              scale: [1, 1.05, 1]
            } : {}}
            className="relative group p-0 outline-none"
          >
            <div 
              className={`aspect-square rounded-[1.5rem] md:rounded-[2.5rem] p-3 md:p-6 flex flex-col items-center justify-center transition-all duration-300 shadow-md border-b-4 ${
                learnedWords.has(word.id) && !gameMode ? 'ring-4 ring-emerald-400/30' : 'hover:shadow-xl'
              }`}
              style={{ 
                backgroundColor: word.color,
                borderColor: word.shadowColor,
              }}
            >
              <span className="text-4xl md:text-7xl drop-shadow-md group-activeList:scale-110 transition-transform">
                {word.emoji}
              </span>
              
              <div className="bg-white/50 backdrop-blur-sm px-2 md:px-4 py-1.5 md:py-2.5 rounded-xl md:rounded-2xl border border-white/40 text-center w-full mt-2">
                <p className="text-[10px] md:text-base font-black text-[#002147] truncate leading-none mb-0.5">{word.word}</p>
                {isRtl && <p className="text-[8px] md:text-xs font-bold text-[#002147]/70 truncate leading-none">{word.wordAr}</p>}
              </div>

              {learnedWords.has(word.id) && !gameMode && (
                <div className="absolute top-2 left-2 w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center text-white shadow-sm">
                  <Star size={12} fill="white" />
                </div>
              )}
            </div>
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {showExcellent && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4"
          >
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[3rem] shadow-2xl border-4 border-emerald-400 text-center max-w-sm w-full">
              <PartyPopper size={40} className="mx-auto mb-4 text-emerald-500" />
              <h2 className="text-3xl md:text-4xl font-black text-[#002147] mb-1">{t.excellent}</h2>
              <div className="flex justify-center gap-2 mt-4 text-yellow-400">
                {[1, 2, 3].map(i => <Star key={i} className="w-8 h-8 fill-yellow-400" />)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
