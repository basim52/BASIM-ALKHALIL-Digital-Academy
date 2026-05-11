import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { translations, Language } from '../../lib/translations';
import { 
  ArrowLeft, 
  Volume2, 
  Sparkles,
  PartyPopper,
  Dog,
  Cat,
  Bird,
  Fish,
  Rabbit,
  Bug,
  Turtle,
  Mouse,
  Squirrel,
  Snail,
  Shrimp,
  Shell
} from 'lucide-react';

interface AnimalOption {
  id: string;
  name: string;
  nameAr: string;
  icon: any;
  color: string;
  shadowColor: string;
  fact: string;
  factAr: string;
}

const ANIMAL_GROUPS = [
  {
    id: 'farm',
    title: 'Farm & Home',
    titleAr: 'المزرعة والمنزل',
    animals: [
      { id: 'dog', name: 'Dog', nameAr: 'كلب', icon: Dog, color: '#f97316', shadowColor: 'rgba(249, 115, 22, 0.4)', fact: 'A loyal friend!', factAr: 'صديق وفي!' },
      { id: 'cat', name: 'Cat', nameAr: 'قطة', icon: Cat, color: '#a855f7', shadowColor: 'rgba(168, 85, 247, 0.4)', fact: 'Meow meow!', factAr: 'مياو مياو!' },
      { id: 'bird', name: 'Bird', nameAr: 'عصفور', icon: Bird, color: '#3b82f6', shadowColor: 'rgba(59, 130, 246, 0.4)', fact: 'I can fly!', factAr: 'أستطيع الطيران!' },
      { id: 'rabbit', name: 'Rabbit', nameAr: 'أرنب', icon: Rabbit, color: '#ec4899', shadowColor: 'rgba(236, 72, 153, 0.4)', fact: 'I love carrots!', factAr: 'أحب الجزر!' },
    ]
  },
  {
    id: 'jungle',
    title: 'Wild Jungle',
    titleAr: 'الغابة البرية',
    animals: [
      { id: 'bug', name: 'Bug', nameAr: 'حشرة', icon: Bug, color: '#ef4444', shadowColor: 'rgba(239, 68, 68, 0.4)', fact: 'Tiny but strong!', factAr: 'صغير وقوي!' },
      { id: 'mouse', name: 'Mouse', nameAr: 'فأر', icon: Mouse, color: '#64748b', shadowColor: 'rgba(100, 116, 139, 0.4)', fact: 'I like cheese!', factAr: 'أحب الجبن!' },
      { id: 'squirrel', name: 'Squirrel', nameAr: 'سنجاب', icon: Squirrel, color: '#92400e', shadowColor: 'rgba(146, 64, 14, 0.4)', fact: 'I love nuts!', factAr: 'أحب البندق!' },
      { id: 'snail', name: 'Snail', nameAr: 'حلزون', icon: Snail, color: '#84cc16', shadowColor: 'rgba(132, 204, 22, 0.4)', fact: 'I am slow!', factAr: 'أنا بطيء!' },
    ]
  },
  {
    id: 'sea',
    title: 'Blue Sea',
    titleAr: 'البحر الأزرق',
    animals: [
      { id: 'fish', name: 'Fish', nameAr: 'سمكة', icon: Fish, color: '#06b6d4', shadowColor: 'rgba(6, 182, 212, 0.4)', fact: 'I love water!', factAr: 'أحب الماء!' },
      { id: 'turtle', name: 'Turtle', nameAr: 'سلحفاة', icon: Turtle, color: '#22c55e', shadowColor: 'rgba(34, 197, 94, 0.4)', fact: 'I live long!', factAr: 'أعيش طويلاً!' },
      { id: 'shrimp', name: 'Shrimp', nameAr: 'جمبري', icon: Shrimp, color: '#f43f5e', shadowColor: 'rgba(244, 63, 94, 0.4)', fact: 'Deep sea friend!', factAr: 'صديق البحر!' },
      { id: 'shell', name: 'Shell', nameAr: 'صدفة', icon: Shell, color: '#fbbf24', shadowColor: 'rgba(251, 191, 36, 0.4)', fact: 'Under the sea!', factAr: 'تحت البحر!' },
    ]
  }
];

export const AnimalsLesson = ({ lang, onBack }: { lang: Language, onBack: () => void }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const [activeTab, setActiveTab] = useState('farm');
  const [activeAnimal, setActiveAnimal] = useState<AnimalOption | null>(null);
  const [showExcellent, setShowExcellent] = useState(false);

  const speak = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  };

  const handleAnimalClick = (animal: AnimalOption) => {
    setActiveAnimal(animal);
    speak(animal.name);
    
    setShowExcellent(true);
    setTimeout(() => setShowExcellent(false), 2000);

    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const currentGroup = ANIMAL_GROUPS.find(g => g.id === activeTab) || ANIMAL_GROUPS[0];

  return (
    <div 
      className="min-h-screen transition-colors duration-700 p-4 md:p-10 flex flex-col items-center relative overflow-x-hidden"
      style={{ backgroundColor: activeAnimal ? `${activeAnimal.color}15` : '#f8fafc' }}
    >
      <div className="w-full max-w-6xl flex items-center justify-between mb-6 md:mb-8 z-20">
        <button 
          onClick={onBack}
          className="w-12 h-12 md:w-16 md:h-16 bg-white shadow-lg rounded-xl md:rounded-2xl flex items-center justify-center text-[#002147] hover:scale-110 active:scale-90 transition-all border border-slate-50"
        >
          <ArrowLeft size={24} className={isRtl ? 'rotate-180' : ''} />
        </button>
        
        <div className="text-center px-1">
          <h1 className="text-xl md:text-5xl font-black text-[#002147] mb-1 tracking-tight">
            {t.animals}
          </h1>
          <div className="flex items-center justify-center gap-1.5 text-slate-500 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/80 shadow-sm">
            <Volume2 size={16} />
            <span className="text-[10px] md:text-sm font-bold uppercase tracking-wider">{t.pressToHear}</span>
          </div>
        </div>

        <div className="w-12 h-12 md:w-16 md:h-16" />
      </div>

      {/* Tabs - Mobile optimized */}
      <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-8 z-10">
        {ANIMAL_GROUPS.map((group) => (
          <button
            key={group.id}
            onClick={() => {
              setActiveTab(group.id);
              setActiveAnimal(null);
              speak(group.title);
            }}
            className={`px-4 md:px-8 py-2 md:py-4 rounded-xl md:rounded-3xl font-black text-[10px] md:text-sm uppercase tracking-widest transition-all ${
              activeTab === group.id 
              ? 'bg-[#002147] text-white shadow-xl scale-105' 
              : 'bg-white text-[#002147] hover:bg-slate-50 border border-slate-100'
            }`}
          >
            {isRtl ? group.titleAr : group.title}
          </button>
        ))}
      </div>

      <motion.div 
        key={activeTab}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-10 w-full max-w-5xl z-10 px-2 pb-20"
      >
        {currentGroup.animals.map((animal) => (
          <motion.button
            key={animal.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleAnimalClick(animal)}
            className={`aspect-square bg-white rounded-[2rem] md:rounded-[3rem] shadow-lg flex flex-col items-center justify-center gap-3 md:gap-4 relative group overflow-hidden border-4 transition-all ${
              activeAnimal?.id === animal.id ? 'border-slate-200' : 'border-slate-50'
            }`}
          >
            <div 
              className="w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-[2rem] flex items-center justify-center text-white shadow-md group-activeList:scale-110 transition-transform"
              style={{ backgroundColor: animal.color }}
            >
              <animal.icon className="w-10 h-10 md:w-16 md:h-16" />
            </div>
            <span className="text-base md:text-2xl font-black text-[#002147]">
              {isRtl ? animal.nameAr : animal.name}
            </span>
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {activeAnimal && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-4 right-4 text-center bg-white/95 backdrop-blur px-6 py-4 rounded-2xl border-2 border-white shadow-2xl z-20 max-w-sm mx-auto"
          >
             <h3 className="text-lg md:text-2xl font-black text-[#002147] leading-tight">{isRtl ? activeAnimal.factAr : activeAnimal.fact}</h3>
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

      {/* Decorative Blobs */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
};
