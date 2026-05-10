import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, CheckCircle2, Award, BookOpen } from 'lucide-react';
import { proficiencyLevel } from '../types';

import { translations, Language } from '../lib/translations';

interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "He ________ to school every day.",
    options: ["go", "goes", "going", "gone"],
    correct: 1
  },
  {
    id: 2,
    text: "I ________ a movie when the phone rang.",
    options: ["am watching", "watched", "was watching", "watch"],
    correct: 2
  },
  {
    id: 3,
    text: "By the time we arrived, the train ________.",
    options: ["had left", "has left", "was leaving", "leaves"],
    correct: 0
  },
  {
    id: 4,
    text: "If I ________ more money, I would buy a new car.",
    options: ["have", "had", "would have", "had had"],
    correct: 1
  },
  {
    id: 5,
    text: "She's much taller ________ her brother.",
    options: ["as", "that", "than", "from"],
    correct: 2
  }
];

export const PlacementTest = ({ onComplete, lang }: { onComplete: (level: proficiencyLevel) => void, lang: Language }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);
    
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
    }
  };

  const calculateLevel = (): proficiencyLevel => {
    const score = answers.filter((ans, i) => ans === QUESTIONS[i].correct).length;
    if (score <= 1) return proficiencyLevel.A1;
    if (score === 2) return proficiencyLevel.A2;
    if (score === 3) return proficiencyLevel.B1;
    if (score === 4) return proficiencyLevel.B2;
    return proficiencyLevel.C1;
  };

  const determinedLevel = calculateLevel();

  return (
    <div className={`min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 ${isRtl ? 'font-arabic' : 'font-sans'} selection:bg-blue-100`}>
      <div className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 relative">
        <div className="absolute top-0 left-0 w-full h-8 bg-[#002147]" />
        <div className="absolute top-8 left-0 w-full h-1 bg-[#C49E3A]" />
        
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div 
              key="test"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: isRtl ? 50 : -50 }}
              className="p-10 md:p-14 pt-20"
              dir={isRtl ? 'rtl' : 'ltr'}
            >
              <div className={`flex justify-between items-center mb-6 md:mb-12 ${!isRtl ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-3 md:gap-4 ${!isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#002147] text-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg font-black text-lg md:text-xl shrink-0">
                    B
                  </div>
                  <h2 className="text-xl md:text-2xl font-black text-[#002147] tracking-tight line-clamp-1">{t.placementTestTitle}</h2>
                </div>
                <div className={`${isRtl ? 'text-right' : 'text-left'} shrink-0`}>
                  <span className="text-slate-400 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] block">{t.step} {currentStep + 1} {t.of} {QUESTIONS.length}</span>
                  <span className="text-blue-600 font-black text-[10px] md:text-xs">{t.grammarAssessment}</span>
                </div>
              </div>

              <div className="h-1.5 bg-slate-50 rounded-full mb-16 overflow-hidden ring-1 ring-slate-100">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-600 to-indigo-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>

              <div className="mb-8 md:mb-12 text-center">
                <h3 className="text-xl md:text-3xl font-black text-[#002147] leading-relaxed tracking-tight group" dir="ltr">
                  {QUESTIONS[currentStep].text.split('________').map((part, i) => (
                    <React.Fragment key={i}>
                      {part}
                      {i === 0 && <span className="mx-2 px-3 md:px-4 py-0.5 md:py-1 bg-blue-50 text-blue-600 border-b-2 md:border-b-4 border-blue-600 rounded md:rounded-lg">_____</span>}
                    </React.Fragment>
                  ))}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-3 md:gap-4">
                {QUESTIONS[currentStep].options.map((option, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(i)}
                    className={`w-full p-4 md:p-6 ${isRtl ? 'text-right' : 'text-left'} border-2 border-slate-50 bg-slate-50/50 rounded-2xl md:rounded-3xl hover:border-[#002147] hover:bg-white transition-all font-bold text-[#002147] flex justify-between items-center ${!isRtl ? 'flex-row-reverse' : ''} group shadow-sm hover:shadow-xl`}
                    dir="ltr"
                  >
                    <span className="text-base md:text-lg">{option}</span>
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg md:rounded-xl border-2 border-slate-200 group-hover:bg-[#002147] group-hover:border-[#002147] transition-all flex items-center justify-center text-white font-black text-[10px] md:text-xs shrink-0">
                      {String.fromCharCode(65 + i)}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-14 text-center pt-24"
              dir={isRtl ? 'rtl' : 'ltr'}
            >
              <div className="w-28 h-28 bg-emerald-50 text-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-xl shadow-emerald-900/10 border-4 border-white rotate-12">
                <Award size={56} />
              </div>
              <h2 className="text-4xl font-black text-[#002147] mb-4 tracking-tighter">{t.finishedTitle}</h2>
              <p className="text-slate-400 font-medium mb-12 leading-relaxed px-6">{t.finishedDesc}</p>

              <div className="bg-[#002147] text-white p-10 rounded-[3rem] mb-12 relative overflow-hidden shadow-[0_20px_50px_rgba(0,33,71,0.3)] border-b-8 border-[#C49E3A]">
                <div className="relative z-10">
                  <p className="text-[#C49E3A] text-xs font-black uppercase tracking-[0.3em] mb-4">{t.globalStandard}</p>
                  <div className={`flex items-center justify-center gap-4 mb-4 ${!isRtl ? 'flex-row-reverse' : ''}`}>
                    <span className="text-6xl font-black tracking-tighter">{determinedLevel}</span>
                    <div className="h-12 w-px bg-white/20" />
                    <span className="text-xl font-bold opacity-80">{determinedLevel === proficiencyLevel.B1 ? t.intermediate : determinedLevel}</span>
                  </div>
                  <p className="text-blue-100/60 text-sm font-medium">
                    {determinedLevel === proficiencyLevel.A1 || determinedLevel === proficiencyLevel.A2 
                      ? t.promisingStart 
                      : t.advancedLevel}
                  </p>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-12 translate-x-12 blur-3xl" />
                <CheckCircle2 size={150} className="absolute -bottom-10 -left-10 text-white/5" />
              </div>

              <button
                onClick={() => onComplete(determinedLevel)}
                className="w-full bg-[#002147] text-white py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:bg-[#C49E3A] transition-all flex items-center justify-center gap-4 group"
              >
                <span>{t.goToDashboard}</span>
                <ChevronRight size={20} className={`${isRtl ? 'rotate-180' : ''} group-hover:translate-x-2 transition-transform`} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
