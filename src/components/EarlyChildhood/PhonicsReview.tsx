import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Volume2, 
  Trophy, 
  Star, 
  Heart,
  ChevronRight,
  Music,
  Play,
  RotateCcw
} from 'lucide-react';

interface Question {
  id: string;
  type: 'sound-match' | 'odd-one-out' | 'visual-match';
  audio: string;
  target: string;
  options: { id: string; emoji: string; text: string; textAr: string }[];
  correctId: string;
}

const REVIEW_QUESTIONS: Question[] = [
  {
    id: 'q1',
    type: 'sound-match',
    audio: 'Which one starts with A?',
    target: 'A',
    options: [
      { id: '1', emoji: '🍎', text: 'Apple', textAr: 'تفاحة' },
      { id: '2', emoji: '🐻', text: 'Bear', textAr: 'دب' },
      { id: '3', emoji: '🚗', text: 'Car', textAr: 'سيارة' },
    ],
    correctId: '1'
  },
  {
    id: 'q2',
    type: 'odd-one-out',
    audio: 'Which one does not belong?',
    target: 'B',
    options: [
      { id: '1', emoji: '🍌', text: 'Banana', textAr: 'موزة' },
      { id: '2', emoji: '🐦', text: 'Bird', textAr: 'عصفور' },
      { id: '3', emoji: '🍎', text: 'Apple', textAr: 'تفاحة' },
    ],
    correctId: '3'
  },
  {
    id: 'q3',
    type: 'sound-match',
    audio: 'Which one starts with C?',
    target: 'C',
    options: [
      { id: '1', emoji: '🥛', text: 'Cup', textAr: 'كوب' },
      { id: '2', emoji: '🐶', text: 'Dog', textAr: 'كلب' },
      { id: '3', emoji: '🐟', text: 'Fish', textAr: 'سمكة' },
    ],
    correctId: '1'
  }
];

export const PhonicsReview = ({ lang, onBack }: { lang: 'en' | 'ar', onBack: () => void }) => {
  const isRtl = lang === 'ar';
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentQuestion = REVIEW_QUESTIONS[currentStep];

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (!showResult) {
      speak(currentQuestion.audio);
    }
  }, [currentStep, showResult]);

  const handleOptionClick = (optionId: string) => {
    if (selectedId) return;

    setSelectedId(optionId);
    const correct = optionId === currentQuestion.correctId;
    setIsCorrect(correct);

    if (correct) {
      setScore(s => s + 1);
      speak("Wonderful!");
    } else {
      speak("Try again!");
    }

    setTimeout(() => {
      if (currentStep < REVIEW_QUESTIONS.length - 1) {
        setCurrentStep(s => s + 1);
        setSelectedId(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2" />

      {/* Header */}
      <div className="p-6 flex items-center justify-between relative z-10 max-w-6xl mx-auto w-full">
        <button 
          onClick={onBack}
          className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-[#002147] hover:scale-110 active:scale-95 transition-all border border-slate-50"
        >
          <ArrowLeft size={24} className={isRtl ? 'rotate-180' : ''} />
        </button>
        
        <div className="flex-1 text-center">
            <h1 className="text-xl md:text-3xl font-black text-[#002147] uppercase tracking-tight">
              {isRtl ? 'تحدي الصوتيات' : 'PHONICS CHALLENGE'}
            </h1>
            <div className="flex items-center justify-center gap-1 mt-1">
               {Array.from({ length: REVIEW_QUESTIONS.length }).map((_, i) => (
                  <div 
                    key={`step-${i}`}
                    className={`h-2 rounded-full transition-all ${i === currentStep ? 'w-8 bg-blue-500' : (i < currentStep ? 'w-4 bg-emerald-400' : 'w-4 bg-slate-200')}`}
                  />
               ))}
            </div>
        </div>

        <div className="w-12" />
      </div>

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={`question-${currentQuestion.id}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="max-w-4xl mx-auto mt-12 px-6 relative z-10"
          >
            <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border-4 border-slate-50 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400" />
               
               <div className="flex flex-col items-center text-center">
                  <div 
                    onClick={() => speak(currentQuestion.audio)}
                    className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 hover:scale-110 active:scale-95 transition-all cursor-pointer mb-8"
                  >
                     <Volume2 size={40} />
                  </div>
                  
                  <h2 className="text-2xl md:text-5xl font-black text-[#002147] leading-tight mb-12">
                    {isRtl ? (currentQuestion.type === 'odd-one-out' ? 'أيهما الوحيد المختلف؟' : 'أيهما يبدأ بـ ' + currentQuestion.target + '؟') : currentQuestion.audio}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {currentQuestion.options.map((option) => (
                      <motion.button
                        key={option.id}
                        whileHover={{ y: -10, scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleOptionClick(option.id)}
                        className={`relative p-8 rounded-[2.5rem] border-4 transition-all flex flex-col items-center gap-4 group ${
                          selectedId === option.id
                            ? (isCorrect ? 'border-emerald-500 bg-emerald-50' : 'border-red-500 bg-red-50')
                            : 'border-slate-50 bg-slate-50/30 hover:bg-white hover:shadow-xl'
                        }`}
                      >
                         <span className="text-7xl md:text-9xl group-hover:drop-shadow-xl transition-all">{option.emoji}</span>
                         <span className="text-xl md:text-2xl font-black text-[#002147] uppercase tracking-tight">{option.text}</span>
                         {isRtl && <span className="text-lg font-bold text-slate-400">{option.textAr}</span>}
                         
                         {selectedId === option.id && (
                           <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg ${isCorrect ? 'bg-emerald-500' : 'bg-red-500'}`}>
                              {isCorrect ? <Star size={24} fill="white" /> : <Star size={24} />}
                           </div>
                         )}
                      </motion.button>
                    ))}
                  </div>
               </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto mt-20 px-6 text-center"
          >
             <div className="bg-white rounded-[4rem] p-12 shadow-2xl border-4 border-slate-50 relative overflow-hidden">
                <div className="w-40 h-40 bg-yellow-400 rounded-full flex items-center justify-center text-white shadow-2xl mx-auto mb-8 animate-bounce">
                   <Trophy size={80} strokeWidth={2.5} />
                </div>
                
                <h2 className="text-4xl md:text-6xl font-black text-[#002147] mb-4">
                  {isRtl ? 'بطل الصوتيات!' : 'PHONICS CHAMP!'}
                </h2>
                <p className="text-lg md:text-2xl font-bold text-slate-400 mb-8">
                  {isRtl ? `لقد حصلت على ${score} من ${REVIEW_QUESTIONS.length}` : `You got ${score} out of ${REVIEW_QUESTIONS.length}`}
                </p>

                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => {
                      setCurrentStep(0);
                      setScore(0);
                      setShowResult(false);
                      setSelectedId(null);
                    }}
                    className="w-full py-6 bg-[#002147] text-white rounded-3xl font-black text-lg uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 hover:scale-105 transition-all"
                  >
                    <RotateCcw size={24} />
                    {isRtl ? 'إعادة التحدي' : 'TRY AGAIN'}
                  </button>
                  
                  <button
                    onClick={onBack}
                    className="w-full py-6 bg-slate-100 text-[#002147] rounded-3xl font-black text-lg uppercase tracking-widest hover:bg-slate-200 transition-all"
                  >
                    {isRtl ? 'العودة للرئيسية' : 'BACK HOME'}
                  </button>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
