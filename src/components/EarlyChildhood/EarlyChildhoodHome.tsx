import React, { useState } from 'react';
import { motion } from 'motion/react';
import { translations, Language } from '../../lib/translations';
import { 
  Palette, 
  Hash, 
  Dog, 
  Shapes, 
  Type,
  Lock,
  ChevronRight,
  TrendingUp,
  User,
  Clock,
  Sparkles,
  Mic
} from 'lucide-react';
import { ColorsLesson } from './ColorsLesson';
import { NumbersLesson } from './NumbersLesson';
import { AnimalsLesson } from './AnimalsLesson';
import { ShapesLesson } from './ShapesLesson';
import { LettersLesson } from './LettersLesson';
import { FirstWordsLesson } from './FirstWordsLesson';
import { PronunciationLesson } from './PronunciationLesson';

const KID_COURSES = [
  { id: 'first-words', nameKey: 'firstWords', icon: Sparkles, color: 'bg-yellow-400', shadow: 'shadow-yellow-900/20', unlocked: true },
  { id: 'pronunciation', nameKey: 'pronunciation', icon: Mic, color: 'bg-indigo-500', shadow: 'shadow-indigo-900/20', unlocked: true },
  { id: 'colors', nameKey: 'colors', icon: Palette, color: 'bg-rose-500', shadow: 'shadow-rose-900/20', unlocked: true },
  { id: 'numbers', nameKey: 'numbers', icon: Hash, color: 'bg-blue-500', shadow: 'shadow-blue-900/20', unlocked: true },
  { id: 'animals', nameKey: 'animals', icon: Dog, color: 'bg-emerald-500', shadow: 'shadow-emerald-900/20', unlocked: true },
  { id: 'shapes', nameKey: 'shapes', icon: Shapes, color: 'bg-orange-500', shadow: 'shadow-orange-900/20', unlocked: true },
  { id: 'letters', nameKey: 'letters', icon: Type, color: 'bg-purple-500', shadow: 'shadow-purple-900/20', unlocked: true },
];

export const EarlyChildhoodHome = ({ lang }: { lang: Language }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [showParentDashboard, setShowParentDashboard] = useState(false);

  if (activeLesson === 'first-words') {
    return <FirstWordsLesson t={t} isRtl={isRtl} onBack={() => setActiveLesson(null)} />;
  }
  if (activeLesson === 'pronunciation') {
    return <PronunciationLesson lang={lang} onBack={() => setActiveLesson(null)} />;
  }
  if (activeLesson === 'colors') {
    return <ColorsLesson lang={lang} onBack={() => setActiveLesson(null)} />;
  }
  if (activeLesson === 'numbers') {
    return <NumbersLesson lang={lang} onBack={() => setActiveLesson(null)} />;
  }
  if (activeLesson === 'animals') {
    return <AnimalsLesson lang={lang} onBack={() => setActiveLesson(null)} />;
  }
  if (activeLesson === 'shapes') {
    return <ShapesLesson lang={lang} onBack={() => setActiveLesson(null)} />;
  }
  if (activeLesson === 'letters') {
    return <LettersLesson lang={lang} onBack={() => setActiveLesson(null)} />;
  }

  return (
    <div className={`min-h-screen bg-[#f8fafc] p-4 md:p-10 ${isRtl ? 'font-arabic' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="max-w-6xl mx-auto flex flex-col items-center justify-between gap-6 mb-8 md:mb-16">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-start">
          <div className="w-16 md:w-24 h-16 md:h-24 bg-[#002147] text-white rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center shadow-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <TrendingUp className="w-8 h-8 md:w-10 md:h-10 relative z-10" />
          </div>
          <div>
            <h1 className="text-2xl md:text-5xl font-black text-[#002147] mb-1 tracking-tight">{t.earlyChildhood}</h1>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px] md:text-xs">{t.kidsLearningDesc}</p>
          </div>
        </div>

        <button 
          onClick={() => setShowParentDashboard(!showParentDashboard)}
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-white px-5 py-3 rounded-2xl border-2 border-slate-100 shadow-sm hover:border-[#C49E3A] active:scale-95 transition-all text-[#002147]"
        >
          <User size={18} />
          <span className="font-black text-[10px] md:text-sm uppercase tracking-widest">{isRtl ? 'لوحة ولي الأمر' : 'Parent Dashboard'}</span>
        </button>
      </header>

      {showParentDashboard ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 mb-20"
        >
          <div className="p-6 md:p-12 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
            <div>
              <h2 className="text-lg md:text-2xl font-black text-[#002147]">{isRtl ? 'متابعة الطفل' : 'Progress Tracking'}</h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[8px] md:text-[10px] mt-0.5">{isRtl ? 'آخر إنجازات طفلك' : 'Your kid\'s latest achievements'}</p>
            </div>
            <button onClick={() => setShowParentDashboard(false)} className="text-[#002147] font-black text-sm">{isRtl ? 'إغلاق' : 'Close'}</button>
          </div>
          <div className="p-6 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-blue-50/50 rounded-2xl md:rounded-3xl p-5 md:p-6 border border-blue-100">
               <Clock className="text-blue-600 mb-3 md:mb-4 w-6 h-6 md:w-8 md:h-8" />
               <h3 className="text-[#002147] font-bold text-xs md:text-base mb-0.5">{isRtl ? 'وقت الشاشة اليوم' : 'Daily Screen Time'}</h3>
               <p className="text-xl md:text-2xl font-black text-blue-600">45 Min</p>
            </div>
            <div className="bg-emerald-50/50 rounded-2xl md:rounded-3xl p-5 md:p-6 border border-emerald-100">
               <TrendingUp className="text-emerald-600 mb-3 md:mb-4 w-6 h-6 md:w-8 md:h-8" />
               <h3 className="text-[#002147] font-bold text-xs md:text-base mb-0.5">{isRtl ? 'مستوى التقدم' : 'Progress Rate'}</h3>
               <p className="text-xl md:text-2xl font-black text-emerald-600">82%</p>
            </div>
            <div className="bg-purple-50/50 rounded-2xl md:rounded-3xl p-5 md:p-6 border border-purple-100">
               <Palette className="text-purple-600 mb-3 md:mb-4 w-6 h-6 md:w-8 md:h-8" />
               <h3 className="text-[#002147] font-bold text-xs md:text-base mb-0.5">{isRtl ? 'الدرس النشط' : 'Active Lesson'}</h3>
               <p className="text-xl md:text-2xl font-black text-purple-600">{isRtl ? 'الألوان' : 'Colors'}</p>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 pb-20">
          {KID_COURSES.map((course) => (
            <motion.button
              key={course.id}
              whileHover={course.unlocked ? { y: -8, scale: 1.02 } : {}}
              whileTap={course.unlocked ? { scale: 0.95 } : {}}
              onClick={() => course.unlocked && setActiveLesson(course.id)}
              className={`relative bg-white rounded-2xl md:rounded-[3rem] p-4 md:p-10 text-center border-2 transition-all flex flex-col items-center group overflow-hidden ${
                course.unlocked 
                ? `border-slate-50 hover:border-[#002147]/10 ${course.shadow} shadow-sm` 
                : 'border-slate-100 opacity-60 grayscale'
              }`}
            >
              {!course.unlocked && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
                  <div className="w-10 h-10 md:w-16 md:h-16 bg-[#002147] text-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-xl">
                    <Lock size={18} className="md:w-7 md:h-7" />
                  </div>
                </div>
              )}

              <div className={`w-16 md:w-32 h-16 md:h-32 ${course.color} text-white rounded-2xl md:rounded-[2.5rem] flex items-center justify-center mb-4 md:mb-8 shadow-xl transition-transform group-hover:rotate-12`}>
                <course.icon className="w-8 h-8 md:w-14 md:h-14" strokeWidth={2.5} />
              </div>

              <h3 className="text-base md:text-3xl font-black text-[#002147] leading-tight mb-1 md:mb-2">{(t as any)[course.nameKey]}</h3>
              
              <div className="flex items-center gap-1 text-slate-400 font-bold uppercase tracking-widest text-[8px] md:text-xs mt-1">
                <span>{course.unlocked ? (isRtl ? 'ابدأ اللعب' : 'Start Playing') : (isRtl ? 'فتح بـ 10' : 'Unlock for 10')}</span>
                <ChevronRight size={10} className={`md:w-4 md:h-4 ${isRtl ? 'rotate-180' : ''}`} />
              </div>

              {/* Decorative Circle */}
              <div className={`absolute -bottom-8 -right-8 w-16 h-16 md:w-32 md:h-32 ${course.color} opacity-5 rounded-full`} />
            </motion.button>
          ))}
        </div>
      )}

      {/* Decorative background mascot */}
      <div className="fixed bottom-0 right-0 w-64 md:w-96 pointer-events-none opacity-20 -z-10 grayscale">
         {/* Placeholder for mascot illustration */}
      </div>
    </div>
  );
};
