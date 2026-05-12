import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { translations, Language } from '../../lib/translations';
import { 
  ArrowLeft, 
  Volume2, 
  Sparkles,
  PartyPopper,
  Square,
  Circle,
  Triangle,
  Star,
  Hexagon,
  Diamond,
  Pentagon,
  Moon,
  Heart,
  Gamepad2,
  Trophy
} from 'lucide-react';

interface ShapeOption {
  id: string;
  name: string;
  nameAr: string;
  icon: any;
  color: string;
  shadowColor: string;
}

const SHAPE_GROUPS = [
  {
    id: 1,
    title: 'Basic Shapes',
    titleAr: 'أشكال أساسية',
    shapes: [
      { id: 'circle', name: 'Circle', nameAr: 'دائرة', icon: Circle, color: '#3b82f6', shadowColor: 'rgba(59, 130, 246, 0.4)' },
      { id: 'square', name: 'Square', nameAr: 'مربع', icon: Square, color: '#ef4444', shadowColor: 'rgba(239, 68, 68, 0.4)' },
      { id: 'triangle', name: 'Triangle', nameAr: 'مثلث', icon: Triangle, color: '#22c55e', shadowColor: 'rgba(34, 197, 94, 0.4)' },
      { id: 'heart', name: 'Heart', nameAr: 'قلب', icon: Heart, color: '#ec4899', shadowColor: 'rgba(236, 72, 153, 0.4)' },
    ]
  },
  {
    id: 2,
    title: 'Advanced Shapes',
    titleAr: 'أشكال متقدمة',
    shapes: [
      { id: 'star', name: 'Star', nameAr: 'نجمة', icon: Star, color: '#eab308', shadowColor: 'rgba(234, 179, 8, 0.4)' },
      { id: 'moon', name: 'Moon', nameAr: 'هلال', icon: Moon, color: '#6366f1', shadowColor: 'rgba(99, 102, 241, 0.4)' },
      { id: 'diamond', name: 'Diamond', nameAr: 'معين', icon: Diamond, color: '#d946ef', shadowColor: 'rgba(217, 70, 239, 0.4)' },
      { id: 'hexagon', name: 'Hexagon', nameAr: 'سداسي', icon: Hexagon, color: '#a855f7', shadowColor: 'rgba(168, 85, 247, 0.4)' },
      { id: 'pentagon', name: 'Pentagon', nameAr: 'خماسي', icon: Pentagon, color: '#f97316', shadowColor: 'rgba(249, 115, 22, 0.4)' },
    ]
  }
];

export const ShapesLesson = ({ lang, onBack }: { lang: Language, onBack: () => void }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  
  const [activeLevel, setActiveLevel] = useState(1);
  const [activeShape, setActiveShape] = useState<ShapeOption | null>(null);
  const [showExcellent, setShowExcellent] = useState(false);
  const [gameMode, setGameMode] = useState(false);
  const [targetShape, setTargetShape] = useState<ShapeOption | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const speak = useCallback((text: string, forceLang?: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = forceLang || 'en-US';
    utterance.rate = 0.85;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  }, []);

  const startNewGameLevel = useCallback(() => {
    const currentGroup = SHAPE_GROUPS.find(g => g.id === activeLevel) || SHAPE_GROUPS[0];
    const randomIndex = Math.floor(Math.random() * currentGroup.shapes.length);
    const newTarget = currentGroup.shapes[randomIndex];
    setTargetShape(newTarget);
    
    setTimeout(() => {
      speak(`Find the ${newTarget.name}`);
    }, 500);
  }, [activeLevel, speak]);

  const toggleGameMode = () => {
    const nextMode = !gameMode;
    setGameMode(nextMode);
    if (nextMode) {
      setScore(0);
      setStreak(0);
      startNewGameLevel();
    } else {
      setTargetShape(null);
    }
  };

  const handleShapeClick = (shape: ShapeOption) => {
    setActiveShape(shape);
    
    if (gameMode && targetShape) {
      if (shape.name === targetShape.name) {
        const nextScore = score + 1;
        setScore(nextScore);
        setStreak(prev => prev + 1);
        
        if (nextScore >= 10) {
          speak(isRtl ? "رائع! لقد وجدت جميع الأشكال العشرة! أنت مهندس صغير بطل!" : "Fantastic! You found all 10 shapes! You are a champion little engineer!");
          setShowExcellent(true);
          setTimeout(() => {
            setShowExcellent(false);
            setGameMode(false);
            setScore(0);
            setTargetShape(null);
          }, 4000);
          return;
        }

        speak(isRtl ? "ممتاز! عمل رائع!" : "Excellent! Great job!");
        setShowExcellent(true);
        
        setTimeout(() => {
          setShowExcellent(false);
          startNewGameLevel();
        }, 1500);
      } else {
        setStreak(0);
        speak(isRtl ? `هذا ${shape.nameAr}. حاول مرة أخرى!` : `That is a ${shape.name}. Try again!`);
      }
    } else {
      speak(shape.name);
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
    }
  };

  const currentGroup = SHAPE_GROUPS.find(g => g.id === activeLevel) || SHAPE_GROUPS[0];

  return (
    <div 
      className="min-h-screen transition-colors duration-700 p-4 md:p-10 flex flex-col items-center relative overflow-x-hidden"
      style={{ backgroundColor: activeShape ? `${activeShape.color}15` : '#f8fafc' }}
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
                {isRtl ? `أين الشكل ${targetShape?.nameAr}؟` : `Find the ${targetShape?.name}!`}
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
                {t.shapes}
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

      {/* Level Selector */}
      {!gameMode && (
        <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-8 z-10">
           {SHAPE_GROUPS.map((group) => (
             <button
               key={group.id}
               onClick={() => {
                 setActiveLevel(group.id);
                 setActiveShape(null);
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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8 w-full max-w-5xl z-10 px-2 pb-20 ${gameMode ? 'mt-8' : ''}`}
      >
        {currentGroup.shapes.map((shape) => (
          <motion.button
            key={shape.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleShapeClick(shape)}
            className="aspect-square bg-white rounded-[2rem] md:rounded-[3rem] shadow-lg flex flex-col items-center justify-center gap-3 md:gap-4 relative group border-4 transition-all"
            style={{ 
              borderColor: activeShape?.id === shape.id ? shape.color : 'transparent',
              boxShadow: activeShape?.id === shape.id ? `0 0 20px ${shape.shadowColor}` : ''
            }}
          >
            <div 
              className="text-white p-4 md:p-6 rounded-2xl md:rounded-[2rem] shadow-md group-activeList:scale-110 transition-transform"
              style={{ backgroundColor: shape.color }}
            >
              <shape.icon className="w-8 h-8 md:w-16 md:h-16" strokeWidth={2.5} />
            </div>
            <span className="text-sm md:text-2xl font-black text-[#002147]">
              {isRtl ? shape.nameAr : shape.name}
            </span>
          </motion.button>
        ))}
      </motion.div>

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
              {streak > 1 && (
                <div className="flex gap-1 mt-2">
                  {Array.from({ length: Math.min(streak, 3) }).map((_, i) => (
                    <Trophy key={i} className="text-yellow-400 w-8 h-8 md:w-10 md:h-10" />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-20 -left-20 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" 
      />
    </div>
  );
};

