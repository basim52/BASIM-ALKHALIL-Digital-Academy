import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { translations, Language } from '../../lib/translations';
import { 
  ArrowLeft, 
  Volume2, 
  Palette, 
  Sparkles,
  PartyPopper
} from 'lucide-react';

interface ColorOption {
  name: string;
  nameAr: string;
  hex: string;
  textColor: string;
  shadowColor: string;
}

const COLORS: ColorOption[] = [
  { name: 'Red', nameAr: 'أحمر', hex: '#ef4444', textColor: 'white', shadowColor: 'rgba(239, 68, 68, 0.4)' },
  { name: 'Blue', nameAr: 'أزرق', hex: '#3b82f6', textColor: 'white', shadowColor: 'rgba(59, 130, 246, 0.4)' },
  { name: 'Green', nameAr: 'أخضر', hex: '#22c55e', textColor: 'white', shadowColor: 'rgba(34, 197, 94, 0.4)' },
  { name: 'Yellow', nameAr: 'أصفر', hex: '#eab308', textColor: 'white', shadowColor: 'rgba(234, 179, 8, 0.4)' },
  { name: 'Purple', nameAr: 'بنفسجي', hex: '#a855f7', textColor: 'white', shadowColor: 'rgba(168, 85, 247, 0.4)' },
  { name: 'Orange', nameAr: 'برتقالي', hex: '#f97316', textColor: 'white', shadowColor: 'rgba(249, 115, 22, 0.4)' },
  { name: 'Pink', nameAr: 'وردي', hex: '#ec4899', textColor: 'white', shadowColor: 'rgba(236, 72, 153, 0.4)' },
  { name: 'Brown', nameAr: 'بني', hex: '#78350f', textColor: 'white', shadowColor: 'rgba(120, 53, 15, 0.4)' },
  { name: 'Gray', nameAr: 'رمادي', hex: '#64748b', textColor: 'white', shadowColor: 'rgba(100, 116, 139, 0.4)' },
  { name: 'Black', nameAr: 'أسود', hex: '#111827', textColor: 'white', shadowColor: 'rgba(17, 24, 39, 0.4)' },
  { name: 'White', nameAr: 'أبيض', hex: '#ffffff', textColor: 'slate-900', shadowColor: 'rgba(255, 255, 255, 0.4)' },
];

export const ColorsLesson = ({ lang, onBack }: { lang: Language, onBack: () => void }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const [activeColor, setActiveColor] = useState<ColorOption | null>(null);
  const [showExcellent, setShowExcellent] = useState(false);

  const speak = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1.1; 
    window.speechSynthesis.speak(utterance);
  };

  const handleColorClick = (color: ColorOption) => {
    setActiveColor(color);
    speak(color.name);
    
    setShowExcellent(true);
    setTimeout(() => setShowExcellent(false), 2000);

    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  return (
    <div 
      className="min-h-screen transition-colors duration-700 p-4 md:p-10 flex flex-col items-center relative overflow-hidden"
      style={{ backgroundColor: activeColor ? `${activeColor.hex}20` : '#f8fafc' }}
    >
      <div className="w-full max-w-6xl flex items-center justify-between mb-6 md:mb-8 z-20">
        <button 
          onClick={onBack}
          className="w-12 h-12 md:w-16 md:h-16 bg-white shadow-lg rounded-xl md:rounded-2xl flex items-center justify-center text-[#002147] hover:scale-110 active:scale-90 transition-all outline-none border border-slate-50"
        >
          <ArrowLeft size={24} className={isRtl ? 'rotate-180' : ''} />
        </button>
        
        <div className="text-center px-1">
          <h1 className="text-xl md:text-5xl font-black text-[#002147] mb-1 md:mb-2 tracking-tight">
            {t.learnColors}
          </h1>
          <div className="flex items-center justify-center gap-1.5 text-slate-500 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/80 shadow-sm">
            <Volume2 size={16} className="md:w-6 md:h-6" />
            <span className="text-[10px] md:text-sm font-bold uppercase tracking-wider">{t.pressToHear}</span>
          </div>
        </div>

        <div className="w-12 h-12 md:w-16 md:h-16" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6 w-full max-w-6xl z-10 pb-20">
        {COLORS.map((color) => (
          <motion.button
            key={color.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleColorClick(color)}
            className={`aspect-square rounded-[1.75rem] md:rounded-[2.5rem] shadow-lg flex flex-col items-center justify-center gap-2 md:gap-3 relative group overflow-hidden border-4 transition-all ${
              activeColor?.name === color.name 
              ? 'border-[#002147] ring-4 ring-[#002147]/10 scale-105' 
              : 'border-white'
            }`}
            style={{ 
              backgroundColor: color.hex,
            }}
          >
            <div className="p-2 md:p-4 bg-white/20 backdrop-blur-md rounded-xl md:rounded-2xl flex items-center justify-center text-white border border-white/20">
              <Palette className="w-6 h-6 md:w-10 md:h-10" strokeWidth={2.5} />
            </div>
            <span className={`text-sm md:text-xl font-black drop-shadow-sm ${color.hex === '#ffffff' ? 'text-slate-800' : 'text-white'}`}>
              {isRtl ? color.nameAr : color.name}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Success Animation overlay */}
      <AnimatePresence>
        {showExcellent && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-6"
          >
            <div className="bg-white/95 backdrop-blur-xl p-8 md:p-16 rounded-[3rem] md:rounded-[4rem] shadow-2xl border-4 border-emerald-400 text-center flex flex-col items-center gap-4 md:gap-6 max-w-sm w-full">
              <div className="w-16 h-16 md:w-32 md:h-32 bg-emerald-100 text-emerald-600 rounded-2xl md:rounded-[2.5rem] flex items-center justify-center shadow-md">
                <PartyPopper className="w-10 h-10 md:w-16 md:h-16" />
              </div>
              <div>
                <h2 className="text-3xl md:text-6xl font-black text-[#002147] mb-1">{t.excellent}</h2>
                <p className="text-base md:text-2xl font-bold text-emerald-600 tracking-tight">{t.congratulations}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Animated Blobs */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[10%] left-[5%] w-64 h-64 bg-red-400/10 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], x: [0, -50, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" 
        />
      </div>
    </div>
  );
};
