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
  category: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "How ________ are you?",
    options: ["old", "age", "years", "long"],
    correct: 0,
    category: "Basics"
  },
  {
    id: 2,
    text: "He ________ to school every day.",
    options: ["go", "goes", "going", "gone"],
    correct: 1,
    category: "Grammar"
  },
  {
    id: 3,
    text: "I ________ a movie when the phone rang.",
    options: ["am watching", "watched", "was watching", "watch"],
    correct: 2,
    category: "Tenses"
  },
  {
    id: 4,
    text: "She's much taller ________ her brother.",
    options: ["as", "that", "than", "from"],
    correct: 2,
    category: "Comparisons"
  },
  {
    id: 5,
    text: "By the time we arrived, the train ________.",
    options: ["had left", "has left", "was leaving", "leaves"],
    correct: 0,
    category: "Advanced Tenses"
  },
  {
    id: 6,
    text: "If I ________ more money, I would buy a new car.",
    options: ["have", "had", "would have", "had had"],
    correct: 1,
    category: "Conditionals"
  },
  {
    id: 7,
    text: "I look forward to ________ you soon.",
    options: ["see", "seeing", "seen", "saw"],
    correct: 1,
    category: "Gerunds"
  },
  {
    id: 8,
    text: "Hardly ________ had I entered the room when the lights went out.",
    options: ["ever", "scarcely", "never", "no sooner"],
    correct: 1,
    category: "Inversion"
  },
  {
    id: 9,
    text: "The book ________ by a famous author last year.",
    options: ["wrote", "was written", "has written", "is written"],
    correct: 1,
    category: "Passive Voice"
  },
  {
    id: 10,
    text: "I wish I ________ more for the test yesterday.",
    options: ["studied", "had studied", "would study", "study"],
    correct: 1,
    category: "Wishes"
  }
];

export const PlacementTest = ({ onComplete, lang }: { onComplete: (level: proficiencyLevel) => void, lang: Language }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);
    
    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
      if (currentStep < QUESTIONS.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setIsFinished(true);
      }
    }, 400);
  };

  const calculateLevel = (): proficiencyLevel => {
    const score = answers.filter((ans, i) => ans === QUESTIONS[i].correct).length;
    if (score <= 2) return proficiencyLevel.A1;
    if (score <= 4) return proficiencyLevel.A2;
    if (score <= 6) return proficiencyLevel.B1;
    if (score <= 8) return proficiencyLevel.B2;
    return proficiencyLevel.C1;
  };

  const determinedLevel = calculateLevel();
  const score = answers.filter((ans, i) => ans === QUESTIONS[i].correct).length;

  const getStrengths = () => {
    const categories = Array.from(new Set(QUESTIONS.map(q => q.category)));
    return categories.map(cat => {
      const catQuestions = QUESTIONS.filter(q => q.category === cat);
      const correctInCat = catQuestions.filter(q => {
        const index = QUESTIONS.findIndex(ques => ques.id === q.id);
        return answers[index] === q.correct;
      }).length;
      return { category: cat, percentage: (correctInCat / catQuestions.length) * 100 };
    }).filter(s => s.percentage >= 50).slice(0, 3);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className={`min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 md:p-6 ${isRtl ? 'font-arabic' : 'font-sans'} selection:bg-blue-100 relative overflow-hidden`}>
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl -mr-48 -mt-48 opacity-50" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C49E3A]/5 rounded-full blur-3xl -ml-48 -mb-48 opacity-50" />
      
      <div className="max-w-2xl w-full bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/50 relative z-10">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#002147] via-[#C49E3A] to-[#002147]" />
        
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div 
              key="test"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: isRtl ? 100 : -100 }}
              className="p-8 md:p-14 pt-16"
              dir={isRtl ? 'rtl' : 'ltr'}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#002147] text-white rounded-2xl flex items-center justify-center shadow-lg font-black text-xl shrink-0">
                    {currentStep + 1}
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-[#002147] tracking-tight">{t.placementTestTitle}</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{QUESTIONS[currentStep].category}</p>
                  </div>
                </div>
                <div className="text-right">
                   <div className="text-xs font-black text-[#002147] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      {t.grammarAssessment}
                   </div>
                </div>
              </div>

              <div className="h-2 bg-slate-100 rounded-full mb-12 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#002147] to-[#C49E3A]"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                  transition={{ type: 'spring', stiffness: 50 }}
                />
              </div>

              <div className="mb-12">
                <motion.h3 
                  key={currentStep}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl md:text-3xl font-black text-[#002147] leading-tight text-center" dir="ltr"
                >
                  {QUESTIONS[currentStep].text.split('________').map((part, i) => (
                    <React.Fragment key={i}>
                      {part}
                      {i === 0 && (
                        <span className="mx-2 px-6 py-1 bg-blue-50 text-blue-600 border-b-4 border-blue-600 rounded-xl inline-block shadow-sm">
                          _____
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </motion.h3>
              </div>

              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 gap-4"
              >
                {QUESTIONS[currentStep].options.map((option, i) => (
                  <motion.button
                    key={i}
                    variants={itemVariants}
                    whileHover={{ scale: 1.01, x: isRtl ? -5 : 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(i)}
                    className="w-full p-6 text-left border-2 border-slate-50 bg-slate-50/50 rounded-[2rem] hover:border-[#C49E3A] hover:bg-white transition-all font-bold text-[#002147] flex justify-between items-center group shadow-sm"
                    dir={isRtl ? 'rtl' : 'ltr'}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white text-[#002147] border border-slate-200 flex items-center justify-center font-black group-hover:bg-[#C49E3A] group-hover:text-white transition-colors">
                        {String.fromCharCode(65 + i)}
                      </div>
                      <span className="text-lg" dir="ltr">{option}</span>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 md:p-14 text-center pt-20"
              dir={isRtl ? 'rtl' : 'ltr'}
            >
              <div className="relative">
                <div className="w-24 h-24 bg-[#C49E3A] text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl rotate-6 group overflow-hidden">
                  <Award size={48} />
                  <div className="absolute inset-0 bg-white/20 translate-y-12 rotate-45" />
                </div>
              </div>
              
              <h2 className="text-4xl font-black text-[#002147] mb-2 tracking-tighter">
                {isRtl ? 'إنجاز رائع!' : 'Great Result!'}
              </h2>
              <p className="text-slate-400 font-medium mb-10">{t.finishedDesc}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="bg-[#002147] text-white p-8 rounded-[2.5rem] text-center relative overflow-hidden flex flex-col justify-center">
                  <p className="text-[#C49E3A] text-[10px] font-black uppercase tracking-widest mb-2">Target Proficiency</p>
                  <span className="text-6xl font-black tabular-nums">{determinedLevel}</span>
                  <p className="text-blue-200/60 text-xs font-bold mt-2">{t.globalStandard}</p>
                  <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-white/5 rounded-full" />
                </div>

                <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 text-right">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center justify-end gap-2">
                    {isRtl ? 'نقاط القوة' : 'Proficiency Strengths'}
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  </h4>
                  <div className="space-y-3">
                    {getStrengths().length > 0 ? getStrengths().map((s, idx) => (
                      <div key={idx} className="flex flex-col gap-1">
                        <div className="flex justify-between text-xs font-bold text-[#002147]">
                          <span>{s.category}</span>
                          <span>{Math.round(s.percentage)}%</span>
                        </div>
                        <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${s.percentage}%` }}
                            className="h-full bg-emerald-500"
                          />
                        </div>
                      </div>
                    )) : (
                      <p className="text-xs text-slate-400 font-bold">ابدأ رحلتك لتطوير مهاراتك</p>
                    )}
                  </div>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-blue-50/50 rounded-3xl p-6 mb-10 border border-blue-100/50"
              >
                  <div className="flex items-center gap-4 text-left" dir={isRtl ? 'rtl' : 'ltr'}>
                     <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-blue-600 shrink-0">
                        <BookOpen size={24} />
                     </div>
                     <div>
                        <h5 className="text-sm font-black text-[#002147]">
                          {determinedLevel === proficiencyLevel.A1 || determinedLevel === proficiencyLevel.A2 
                            ? (isRtl ? 'بداية واعدة جداً!' : 'A very promising start!')
                            : (isRtl ? 'مستوى متقدم ومميز!' : 'Advanced English level!')}
                        </h5>
                        <p className="text-xs text-blue-600/80 font-medium mt-1 leading-relaxed">
                          {isRtl ? 'لقد قمنا بتخصيص منهج كامل يناسب مستواك الحالي وسرعة استيعابك.' : 'We have customized a full curriculum suited to your current level and learning pace.'}
                        </p>
                     </div>
                  </div>
              </motion.div>

              <button
                onClick={() => onComplete(determinedLevel)}
                className="w-full bg-[#002147] hover:bg-[#C49E3A] text-white py-6 rounded-3xl font-black text-sm uppercase tracking-widest shadow-2xl transition-all shadow-blue-900/10 flex items-center justify-center gap-4 active:scale-[0.98]"
              >
                <span>{t.goToDashboard}</span>
                <ChevronRight size={20} className={`${isRtl ? 'rotate-180' : ''}`} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
