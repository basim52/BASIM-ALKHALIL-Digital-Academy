import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { translations, Language } from '../lib/translations';
import { 
  ArrowLeft, 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  Trophy,
  Sparkles,
  HelpCircle,
  PlayCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface OxfordUnitLessonProps {
  lang: Language;
  unitId: number;
  onBack: () => void;
}

const LESSON_DATA = {
  1: {
    bigQuestion: "How do people have fun?",
    bigQuestionAr: "كيف يستمتع الناس؟",
    vocab: [
      { id: 1, word: 'festival', ar: 'مهرجان', img: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'folk dance', ar: 'رقص شعبي', img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'wedding', ar: 'حفل زفاف', img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=400&q=80' },
      { id: 4, word: 'family reunion', ar: 'لم شمل العائلة', img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80' },
      { id: 5, word: 'fair', ar: 'مدينة ملاهي/معرض', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80' },
      { id: 6, word: 'race', ar: 'سباق', img: 'https://images.unsplash.com/photo-1530549387074-d562463b3259?auto=format&fit=crop&w=400&q=80' },
      { id: 7, word: 'team', ar: 'فريق', img: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=400&q=80' },
      { id: 8, word: 'winner', ar: 'فائز', img: 'https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&w=400&q=80' },
      { id: 9, word: 'score', ar: 'النتيجة', img: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=400&q=80' },
      { id: 10, word: 'player', ar: 'لاعب', img: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=400&q=80' },
    ],
    quiz: [
      {
        id: 1,
        question: "She's a ________.",
        options: ['player', 'winner', 'team'],
        correct: 'winner',
        img: 'https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 2,
        question: "What's the ________?",
        options: ['winner', 'player', 'score'],
        correct: 'score',
        img: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  2: {
    bigQuestion: "Who are the people in your life?",
    bigQuestionAr: "من هم الأشخاص في حياتك؟",
    vocab: [
      { id: 1, word: 'parent', ar: 'والد/والدة', img: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'grandmother', ar: 'جدة', img: 'https://images.unsplash.com/photo-1552554720-6379512316e6?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'brother', ar: 'أخ', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' },
      { id: 4, word: 'sister', ar: 'أخت', img: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=400&q=80' },
      { id: 5, word: 'uncle', ar: 'عم/خال', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
      { id: 6, word: 'aunt', ar: 'عمة/خالة', img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80' },
      { id: 7, word: 'cousin', ar: 'ابن عم/خال', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80' },
      { id: 8, word: 'neighbor', ar: 'جار', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80' },
      { id: 9, word: 'friends', ar: 'أصدقاء', img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80' },
      { id: 10, word: 'baby', ar: 'طفل رضيع', img: 'https://images.unsplash.com/photo-1519689689253-ab9750242f77?auto=format&fit=crop&w=400&q=80' },
    ],
    quiz: [
      {
        id: 1,
        question: "This is my ________.",
        options: ['uncle', 'grandmother', 'neighbor'],
        correct: 'grandmother',
        img: 'https://images.unsplash.com/photo-1552554720-6379512316e6?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 2,
        question: "They are ________.",
        options: ['friends', 'parents', 'enemies'],
        correct: 'friends',
        img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  3: {
    bigQuestion: "How do we buy and sell things?",
    bigQuestionAr: "كيف نبيع ونشتري الأشياء؟",
    vocab: [
      { id: 1, word: 'market', ar: 'سوق', img: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'apples', ar: 'تفاح', img: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'bread', ar: 'خبز', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80' },
      { id: 4, word: 'coins', ar: 'عملات', img: 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&w=400&q=80' },
      { id: 5, word: 'vendor', ar: 'بائع', img: 'https://images.unsplash.com/photo-1543083477-4f7f44aad226?auto=format&fit=crop&w=400&q=80' },
      { id: 6, word: 'scales', ar: 'ميزان', img: 'https://images.unsplash.com/photo-1596727147705-61a532a659bd?auto=format&fit=crop&w=400&q=80' },
      { id: 7, word: 'basket', ar: 'سلة', img: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=400&q=80' },
      { id: 8, word: 'wallet', ar: 'محفظة', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80' },
      { id: 9, word: 'shop', ar: 'محل/دكان', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80' },
      { id: 10, word: 'customer', ar: 'زبون', img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80' },
    ],
    quiz: [
      {
        id: 1,
        question: "Use ________ to weigh fruit.",
        options: ['wallet', 'scales', 'basket'],
        correct: 'scales',
        img: 'https://images.unsplash.com/photo-1596727147705-61a532a659bd?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 2,
        question: "I have some ________.",
        options: ['coins', 'apples', 'shops'],
        correct: 'coins',
        img: 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  4: {
    bigQuestion: "How do we learn about the past?",
    bigQuestionAr: "كيف نتعلم عن الماضي؟",
    vocab: [
      { id: 1, word: 'temple', ar: 'معبد', img: 'https://images.unsplash.com/photo-1541432901042-261ec9099837?auto=format&fit=crop&w=400&q=80' },
      { id: 2, word: 'history', ar: 'تاريخ', img: 'https://images.unsplash.com/photo-1461360228754-6e81c478df8b?auto=format&fit=crop&w=400&q=80' },
      { id: 3, word: 'column', ar: 'عمود', img: 'https://images.unsplash.com/photo-1568249826372-c515a4521873?auto=format&fit=crop&w=400&q=80' },
      { id: 4, word: 'statue', ar: 'تمثال', img: 'https://images.unsplash.com/photo-1534839187421-5a0a3821017b?auto=format&fit=crop&w=400&q=80' },
      { id: 5, word: 'pyramid', ar: 'هرم', img: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=400&q=80' },
      { id: 6, word: 'tomb', ar: 'مقبرة/قبر', img: 'https://images.unsplash.com/photo-1534839187421-5a0a3821017b?auto=format&fit=crop&w=400&q=80' },
      { id: 7, word: 'ruins', ar: 'أطلال', img: 'https://images.unsplash.com/photo-1461360228754-6e81c478df8b?auto=format&fit=crop&w=400&q=80' },
      { id: 8, word: 'artifact', ar: 'قطعة أثرية', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80' },
      { id: 9, word: 'ancient', ar: 'قديم جداً', img: 'https://images.unsplash.com/photo-1541432901042-261ec9099837?auto=format&fit=crop&w=400&q=80' },
      { id: 10, word: 'pharaoh', ar: 'فرعون', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80' },
    ],
    quiz: [
      {
        id: 1,
        question: "This is an ________ statue.",
        options: ['ancient', 'new', 'player'],
        correct: 'ancient',
        img: 'https://images.unsplash.com/photo-1534839187421-5a0a3821017b?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 2,
        question: "The ________ are in Egypt.",
        options: ['pyramid', 'forest', 'market'],
        correct: 'pyramid',
        img: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=400&q=80'
      }
    ]
  }
};

export const OxfordUnitLesson = ({ lang, unitId, onBack }: OxfordUnitLessonProps) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const data = LESSON_DATA[unitId as keyof typeof LESSON_DATA];

  const [step, setStep] = useState<'intro' | 'matching' | 'quiz' | 'finish'>('intro');
  const [matchingStatus, setMatchingStatus] = useState<Record<number, boolean>>({});
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string | null>>({});
  const [score, setScore] = useState(0);

  const speak = (text: string, voiceLang: string = 'en-US') => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = voiceLang;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleMatch = (id: number, word: string) => {
    const item = data.vocab.find(v => v.id === id);
    if (item?.word === word) {
      setMatchingStatus(prev => ({ ...prev, [id]: true }));
      speak(word);
      if (Object.keys(matchingStatus).length + 1 === data.vocab.length) {
        setTimeout(() => setStep('quiz'), 1500);
      }
    }
  };

  const handleQuiz = (questionId: number, option: string) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: option }));
    const question = data.quiz.find(q => q.id === questionId);
    if (option === question?.correct) {
      setScore(prev => prev + 1);
      speak("Correct!", "en-US");
    } else {
      speak("Try again", "en-US");
    }

    if (Object.keys(quizAnswers).length + 1 === data.quiz.length) {
      setTimeout(() => {
        setStep('finish');
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 1500);
    }
  };

  return (
    <div className={`flex-1 p-6 md:p-12 overflow-y-auto bg-slate-50 ${isRtl ? 'font-arabic' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-[#002147] transition-colors mb-8 font-bold">
          <ArrowLeft size={18} className={isRtl ? 'rotate-180' : ''} />
          {isRtl ? 'العودة للملحق' : 'Back to Companion'}
        </button>

        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="text-center py-12"
            >
              <div className="bg-[#002147] text-white p-8 rounded-[3rem] shadow-2xl relative overflow-hidden mb-10">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20" />
                <div className="relative z-10">
                  <span className="px-4 py-1 bg-amber-500 rounded-full text-[12px] font-black uppercase tracking-widest mb-4 inline-block">
                    {t.oxfordBigQuestion}
                  </span>
                  <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                    {data.bigQuestion}
                  </h1>
                  <p className="text-xl text-blue-100 font-medium opacity-80">
                    {data.bigQuestionAr}
                  </p>
                  <button 
                    onClick={() => speak(data.bigQuestion)}
                    className="mt-6 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full mx-auto flex items-center justify-center transition-all group"
                  >
                    <Volume2 className="group-hover:scale-110 transition-transform" size={24} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                 <div className="bg-white p-8 rounded-[2rem] border border-slate-200 text-left rtl:text-right">
                    <h3 className="text-xl font-black text-[#002147] mb-4 flex items-center gap-3">
                       <PlayCircle className="text-blue-500" />
                       {isRtl ? 'خطة الدرس' : 'Lesson Plan'}
                    </h3>
                    <ul className="space-y-4 text-slate-500 font-bold">
                       <li className="flex items-center gap-3">
                          <CheckCircle2 className="text-emerald-500" size={18} />
                          {isRtl ? 'تعلم المفردات الأساسية' : 'Learn key vocabulary'}
                       </li>
                       <li className="flex items-center gap-3">
                          <CheckCircle2 className="text-emerald-500" size={18} />
                          {isRtl ? 'نشاط مطابقة الصور' : 'Matching activity'}
                       </li>
                       <li className="flex items-center gap-3">
                          <CheckCircle2 className="text-emerald-500" size={18} />
                          {isRtl ? 'اختيار الإجابة الصحيحة' : 'Circle the correct answer'}
                       </li>
                    </ul>
                 </div>
                 <div className="flex flex-col justify-center items-center p-8">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setStep('matching')}
                      className="w-full bg-[#002147] text-white py-6 rounded-2xl text-xl font-black shadow-xl shadow-blue-500/20 flex items-center justify-center gap-4 group"
                    >
                      {t.oxfordStart}
                      <PlayCircle size={28} className="translate-x-0 group-hover:translate-x-2 transition-transform" />
                    </motion.button>
                 </div>
              </div>
            </motion.div>
          )}

          {step === 'matching' && (
            <motion.div 
              key="matching"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center justify-between mb-8">
                 <div>
                    <h2 className="text-3xl font-black text-[#002147]">A. {t.oxfordMatchWords}</h2>
                    <p className="text-slate-400 font-bold">{isRtl ? 'انقر على الصورة الصحيحة للكلمة' : 'Click the correct image for each word'}</p>
                 </div>
                 <div className="bg-white px-5 py-2 rounded-xl border border-slate-200">
                    <span className="text-[#002147] font-black">{Object.keys(matchingStatus).length} / {data.vocab.length}</span>
                 </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {data.vocab.map((v) => (
                  <motion.button
                    key={v.id}
                    disabled={matchingStatus[v.id]}
                    onClick={() => handleMatch(v.id, v.word)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative aspect-square rounded-2xl overflow-hidden shadow-sm border-4 transition-all ${
                      matchingStatus[v.id] ? 'border-emerald-500 grayscale' : 'border-white hover:border-blue-500'
                    }`}
                  >
                    <img src={v.img} alt={v.word} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg py-1 px-2">
                       <p className="text-[10px] font-black text-[#002147] uppercase truncate">{v.word}</p>
                    </div>
                    {matchingStatus[v.id] && (
                      <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                         <div className="bg-white rounded-full p-2">
                            <CheckCircle2 className="text-emerald-500" size={24} />
                         </div>
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>

              <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg">
                       <HelpCircle size={24} />
                    </div>
                    <div>
                       <h4 className="font-black text-[#002147]">{isRtl ? 'تعليمات' : 'Instructions'}</h4>
                       <p className="text-sm font-medium text-blue-600">{isRtl ? 'طابق جميع الكلمات الـ 10 للانتقال للاختبار' : 'Match all 10 words to proceed to the quiz'}</p>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}

          {step === 'quiz' && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-center gap-4 mb-10">
                 <div className="w-14 h-14 bg-[#C49E3A] text-white rounded-2xl flex items-center justify-center shadow-lg">
                    <HelpCircle size={28} />
                 </div>
                 <div>
                    <h2 className="text-3xl font-black text-[#002147]">B. {t.oxfordQuizTime}</h2>
                    <p className="text-slate-400 font-bold">{isRtl ? 'اختر الإجابة الصحيحة بناءً على الصورة' : 'Choose the correct answer based on the picture'}</p>
                 </div>
              </div>

              <div className="space-y-12">
                {data.quiz.map((q, idx) => (
                  <div key={q.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl shadow-slate-100/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-inner bg-slate-100">
                        <img src={q.img} alt="Question" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                           <span className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-black">{idx + 1}</span>
                           <h3 className="text-2xl font-black text-[#002147]">{q.question}</h3>
                        </div>
                        <div className="space-y-4">
                          {q.options.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => handleQuiz(q.id, opt)}
                              className={`w-full py-4 px-6 rounded-2xl text-left rtl:text-right font-black transition-all border-2 ${
                                quizAnswers[q.id] === opt
                                  ? opt === q.correct 
                                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700' 
                                    : 'bg-rose-50 border-rose-500 text-rose-700'
                                  : 'bg-slate-50 border-transparent hover:border-blue-500 text-slate-500'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                 <span>{opt}</span>
                                 {quizAnswers[q.id] === opt && (
                                   opt === q.correct ? <CheckCircle2 size={20} /> : <XCircle size={20} />
                                 )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'finish' && (
            <motion.div 
              key="finish"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="w-40 h-40 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
                <Trophy size={80} />
              </div>
              <h2 className="text-5xl font-black text-[#002147] mb-6">
                {score === data.quiz.length ? t.oxfordExcellent : t.oxfordTryAgain}
              </h2>
              <p className="text-xl text-slate-400 font-bold mb-12">
                {isRtl 
                  ? `لقد أكملت الدرس بنجاح وحصلت على ${score} من ${data.quiz.length} في الاختبار!` 
                  : `You completed the lesson and scored ${score} out of ${data.quiz.length} in the quiz!`}
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                <button
                  onClick={() => {
                    setStep('intro');
                    setMatchingStatus({});
                    setQuizAnswers({});
                    setScore(0);
                  }}
                  className="bg-white border-2 border-[#002147] text-[#002147] px-10 py-4 rounded-2xl font-black hover:bg-[#002147] hover:text-white transition-all shadow-lg"
                >
                  {isRtl ? 'إعادة الدرس' : 'Restart Lesson'}
                </button>
                <button
                  onClick={onBack}
                  className="bg-[#002147] text-white px-10 py-4 rounded-2xl font-black flex items-center gap-3 hover:translate-y-[-2px] transition-all shadow-xl"
                >
                  <Sparkles size={20} />
                  {isRtl ? 'العودة للملحق' : 'Back to Companion'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
