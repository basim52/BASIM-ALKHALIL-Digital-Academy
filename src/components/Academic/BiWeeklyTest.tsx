import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Volume2, 
  Trophy, 
  Star, 
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Award
} from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { UserProfile } from '../../types';

interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number;
  explanation: string;
  explanationAr: string;
}

const LEVEL_QUESTIONS: Record<string, Question[]> = {
  a1: [
    {
      id: 1,
      text: "She _______ a doctor.",
      options: ["is", "am", "are", "have"],
      correct: 0,
      explanation: "We use 'is' with third-person singular subjects (He, She, It).",
      explanationAr: "نستخدم 'is' مع الضمائر المفردة للغائب مثل (هو، هي)."
    },
    {
      id: 2,
      text: "I have two _______.",
      options: ["dog", "dogs", "cat", "dog's"],
      correct: 1,
      explanation: "Using plural form 'dogs' for number two.",
      explanationAr: "نستخدم صيغة الجمع 'dogs' لوجود العدد اثنين."
    },
    {
      id: 3,
      text: "He _______ to the radio every evening.",
      options: ["listens", "listen", "listening", "listened"],
      correct: 0,
      explanation: "In Present Simple, singular subjects (He) take verb + -s.",
      explanationAr: "في المضارع البسيط، يأخذ الفعل s- مع الفاعل المفرد الغائب."
    },
    {
      id: 4,
      text: "Where _______ you from?",
      options: ["is", "am", "are", "do"],
      correct: 2,
      explanation: "We use 'are' with 'you'.",
      explanationAr: "نستخدم 'are' مع الضمير 'you'."
    },
    {
      id: 5,
      text: "My mother is _______ teacher.",
      options: ["a", "an", "the", "some"],
      correct: 0,
      explanation: "We use the indefinite article 'a' before consonant sounds.",
      explanationAr: "نستخدم أداة النكرة 'a' قبل الأسماء التي تبدأ بحرف ساكن."
    }
  ],
  a2: [
    {
      id: 1,
      text: "Yesterday we _______ to the park and played football.",
      options: ["go", "gone", "went", "going"],
      correct: 2,
      explanation: "The past tense of 'go' is 'went'.",
      explanationAr: "الصيغة الماضية للفعل 'go' هي 'went'."
    },
    {
      id: 2,
      text: "This is the _______ book I have ever read!",
      options: ["goodest", "better", "best", "more good"],
      correct: 2,
      explanation: "The superlative form of 'good' is 'best'.",
      explanationAr: "التفضيل الأقصى لصفة 'good' هو 'best' (الأفضل)."
    },
    {
      id: 3,
      text: "He didn't _______ anything at the supermarket.",
      options: ["buy", "bought", "buys", "buying"],
      correct: 0,
      explanation: "After 'did not / didn't', we use the base form of the verb.",
      explanationAr: "بعد 'didn't' نستخدم الفعل في مصدوره الأساسي دون أي تعديل."
    },
    {
      id: 4,
      text: "If it is sunny tomorrow, we _______ go to the beach.",
      options: ["will", "went", "would", "had gone"],
      correct: 0,
      explanation: "This is First Conditional: 'If + Present Simple, will + verb'.",
      explanationAr: "هذه الحالة الشرطية الأولى: 'If مضارع بسيط، وسوف (will) + مصدر الفعل'."
    },
    {
      id: 5,
      text: "They _______ living in London for three years.",
      options: ["have been", "has been", "are", "were"],
      correct: 0,
      explanation: "With plural 'They', we use 'have been' for present perfect continuous.",
      explanationAr: "مع الجمع 'They'، نستخدم 'have been' في زمن المضارع التام المستمر."
    }
  ],
  b1: [
    {
      id: 1,
      text: "If I _______ you, I would study harder for the exam.",
      options: ["am", "was", "were", "be"],
      correct: 2,
      explanation: "In second conditional, 'were' is used with 'I' for expressing advice.",
      explanationAr: "في الحالة الشرطية الثانية، نستخدم 'were' للتعبير عن النصيحة والتخيل."
    },
    {
      id: 2,
      text: "He told me that he _______ already finished his homework.",
      options: ["has", "have", "had", "is"],
      correct: 2,
      explanation: "In reported speech, present perfect shifts back to past perfect 'had finished'.",
      explanationAr: "في الكلام المنقول، يتغير المضارع التام ليصبح ماضياً تاماً 'had finished'."
    },
    {
      id: 3,
      text: "I look forward to _______ you at the party.",
      options: ["see", "seeing", "seen", "saw"],
      correct: 1,
      explanation: "The verb 'look forward to' is followed by a gerund (verb + -ing).",
      explanationAr: "التركيب 'look forward to' يتبعه اسم فاعل أو مصدر ينتهي بـ ing."
    },
    {
      id: 4,
      text: "The boy _______ phone was lost yesterday was very sad.",
      options: ["who", "which", "whose", "whom"],
      correct: 2,
      explanation: "'Whose' is a relative pronoun showing possession of the phone.",
      explanationAr: "نستخدم 'whose' كضمير وصل للدلالة على الملكية."
    },
    {
      id: 5,
      text: "You _______ go to the library if you want to find that book.",
      options: ["should", "ought", "need", "could to"],
      correct: 0,
      explanation: "'Should' is used to offer advice. 'Ought' would need 'to'.",
      explanationAr: "نستخدم 'should' لتقديم النصيحة وباقي الخيارات ينقصها حرف الجر 'to'."
    }
  ],
  b2: [
    {
      id: 1,
      text: "The windows are dirty; they need _______.",
      options: ["to wash", "washing", "washed", "be washing"],
      correct: 1,
      explanation: "Need can be followed by an -ing verb to indicate a passive meaning.",
      explanationAr: "الفعل 'need' يمكن أن يتبعه verb-ing ليعطي معنى المبني للمجهول."
    },
    {
      id: 2,
      text: "He succeeded _______ passing the difficult test on his second attempt.",
      options: ["in", "on", "at", "for"],
      correct: 0,
      explanation: "The preposition 'in' always complements 'succeeded'.",
      explanationAr: "حرف الجر 'in' هو الذي يأتي بعد الفعل 'succeeded' ليتم المعنى."
    },
    {
      id: 3,
      text: "By this time next year, I _______ from university.",
      options: ["will graduate", "will have graduated", "would graduate", "am graduating"],
      correct: 1,
      explanation: "Future Perfect 'will have graduated' indicates action complete before a set point.",
      explanationAr: "المستقبل التام 'will have graduated' يوضح اكتمال الفعل قبل نقطة زمنية في المستقبل."
    },
    {
      id: 4,
      text: "Hardly _______ entered the house when the storm started.",
      options: ["had I", "I had", "did I", "I did"],
      correct: 0,
      explanation: "When starting with negative/restrictive adverbs like 'Hardly', use inversion (Auxiliary + Subject).",
      explanationAr: "عند البدء بظروف سلبية مثل 'Hardly'، نقوم بقلب الفاعل مع الفعل المساعد."
    },
    {
      id: 5,
      text: "She wishes she _______ more attention to the guide yesterday.",
      options: ["paid", "has paid", "had paid", "would pay"],
      correct: 2,
      explanation: "Wishes about past events are expressed using the Past Perfect.",
      explanationAr: "التمني لحدث في الماضي يُصاغ باستخدام زمن الماضي التام (had + p.p)."
    }
  ],
  c1: [
    {
      id: 1,
      text: "Rarely _______ such a fascinating work of art in this gallery.",
      options: ["we see", "do we see", "we saw", "have we seen"],
      correct: 1,
      explanation: "Negative inversion uses 'do we see' for habitual/general emphasis.",
      explanationAr: "القلب اللغوي بعد 'Rarely' يحتاج لفعل مساعد فاعل فعل: 'do we see'."
    },
    {
      id: 2,
      text: "The research team’s groundbreaking study _______ the mystery of deep-sea life.",
      options: ["eluded", "elucidated", "elevated", "eliminated"],
      correct: 1,
      explanation: "'Elucidate' means to make clear, explain, or throw light upon.",
      explanationAr: "كلمة 'Elucidate' تعني يوضح، يشرح، أو يسلط الضوء على غموض فكرة."
    },
    {
      id: 3,
      text: "Had they known the weather would turn so quickly, they _______ their trip.",
      options: ["would postpone", "postponed", "would have postponed", "will have postponed"],
      correct: 2,
      explanation: "Third Conditional structure with inversion in the if-clause: 'Had they known ..., would have postponed'.",
      explanationAr: "جميلة شرطية من النوع الثالث مع قلب الجزء الأول: 'الماضي التام المقبول، would have + p.p'."
    },
    {
      id: 4,
      text: "She is a highly accomplished lawyer who is _______ in corporate finance law.",
      options: ["fluent", "conversant", "proficient", "assertive"],
      correct: 1,
      explanation: "Being 'conversant with/in' means being familiar with and knowledgeable about a subject.",
      explanationAr: "كون الشخص 'conversant in' يعني أنه ملم ومطلع ومتمكن جداً من هذا التخصص."
    },
    {
      id: 5,
      text: "The project was completed on time, albeit _______ a few minor guidelines.",
      options: ["with respect of", "despite of", "notwithstanding", "under the aegis of"],
      correct: 2,
      explanation: "'Notwithstanding' is acting here as a preposition meaning 'in spite of'.",
      explanationAr: "كلمة 'notwithstanding' تعني هنا بالرغم من / على الرغم من وجود بعض الإرشادات البسيطة."
    }
  ]
};

// Map C2 level to C1 questions for robustness, or any upper level
LEVEL_QUESTIONS['c2'] = LEVEL_QUESTIONS['c1'];

interface BiWeeklyTestProps {
  lang: 'en' | 'ar';
  level: string; // e.g. 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'
  unitId: string; // e.g. 'test-2'
  testTitle: string;
  userProfile: UserProfile | null;
  onBack: () => void;
  onComplete: (score: number, total: number) => void;
}

export const BiWeeklyTest: React.FC<BiWeeklyTestProps> = ({
  lang,
  level,
  unitId,
  testTitle,
  userProfile,
  onBack,
  onComplete
}) => {
  const isRtl = lang === 'ar';
  const normLevel = level.toLowerCase();
  const questions = LEVEL_QUESTIONS[normLevel] || LEVEL_QUESTIONS['a1'];
  
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentStep];

  const speakText = (text: string) => {
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {
      console.warn("TTS Error", e);
    }
  };

  useEffect(() => {
    if (currentQuestion && !showResult) {
      speakText(currentQuestion.text);
    }
  }, [currentStep, showResult]);

  const handleOptionClick = (idx: number) => {
    if (isConfirmed) return;
    setSelectedIdx(idx);
  };

  const handleConfirm = async () => {
    if (selectedIdx === null || isConfirmed) return;

    const isCorrect = selectedIdx === currentQuestion.correct;
    if (isCorrect) {
      setScore(s => s + 1);
      speakText("Correct answer. Well done!");
    } else {
      speakText("That's incorrect. Learn from the explanation.");
    }
    
    setIsConfirmed(true);
  };

  const handleNext = async () => {
    setSelectedIdx(null);
    setIsConfirmed(false);

    if (currentStep < questions.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      // Finished the test! Save to Firebase.
      const finalScore = score;
      const totalQuestions = questions.length;
      
      if (userProfile) {
        try {
          // 1. Add record to 'lessonResults'
          await addDoc(collection(db, 'lessonResults'), {
            userId: userProfile.uid,
            parentIds: (userProfile as any).linkedParentIds || [],
            lessonId: unitId,
            lessonTitle: testTitle,
            score: finalScore,
            total: totalQuestions,
            timestamp: serverTimestamp()
          });

          // 2. Add extra Points to User (e.g., 100 XP for completing a test!)
          const extraPoints = 100;
          const userRef = doc(db, 'users', userProfile.uid);
          await updateDoc(userRef, {
            points: (userProfile.points || 0) + extraPoints
          });
          
        } catch (e) {
          console.error("Error saving biweekly test results:", e);
        }
      }

      setShowResult(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 relative overflow-hidden flex flex-col items-center justify-start p-4">
      {/* Cool animated vector circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2" />

      {/* Header bar */}
      <div className="w-full max-w-4xl flex items-center justify-between p-4 z-10">
        <button
          onClick={onBack}
          className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-[#002147] hover:scale-110 active:scale-95 transition-all border border-slate-50"
        >
          <ArrowLeft size={22} className={isRtl ? 'rotate-180' : ''} />
        </button>

        <div className="flex-1 text-center">
          <span className="text-xs font-black text-indigo-600 tracking-widest uppercase">
            {isRtl ? `مستوى الخطة الدراسية: ${level}` : `Study Plan Level: ${level}`}
          </span>
          <h1 className="text-lg md:text-2xl font-black text-[#002147] mt-1 leading-tight">
            {isRtl ? 'الاختبار الدوري الشامل' : 'Bi-Weekly Comprehensive Test'}
          </h1>
        </div>

        <div className="w-12" />
      </div>

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={`step-${currentStep}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="w-full max-w-3xl mt-6 z-10"
          >
            <div className="bg-white rounded-[2.5rem] p-6 md:p-12 shadow-2xl border-4 border-slate-50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500" />
              
              {/* Head stats row */}
              <div className="flex justify-between items-center mb-8">
                <span className="text-xs font-bold text-slate-400">
                  {isRtl ? `السؤال ${currentStep + 1} من ${questions.length}` : `Question ${currentStep + 1} of ${questions.length}`}
                </span>

                <button
                  onClick={() => speakText(currentQuestion.text)}
                  className="w-10 h-10 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center transition-all cursor-pointer"
                  title={isRtl ? 'استمع للسؤال' : 'Listen to Question'}
                >
                  <Volume2 size={18} />
                </button>
              </div>

              {/* Quiz question label */}
              <h2 className="text-xl md:text-3xl font-black text-[#002147] leading-tight mb-8 font-mono text-center">
                {currentQuestion.text}
              </h2>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedIdx === idx;
                  const isCorrectAnswer = idx === currentQuestion.correct;
                  let cardStyle = 'border-slate-100 hover:border-indigo-300 hover:bg-indigo-50/10';

                  if (isConfirmed) {
                    if (isCorrectAnswer) {
                      cardStyle = 'border-emerald-500 bg-emerald-50/50 text-emerald-900';
                    } else if (isSelected) {
                      cardStyle = 'border-rose-500 bg-rose-50/50 text-rose-900';
                    } else {
                      cardStyle = 'border-slate-100 opacity-60';
                    }
                  } else if (isSelected) {
                    cardStyle = 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-300';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(idx)}
                      disabled={isConfirmed}
                      className={`p-5 rounded-2xl border-2 font-black transition-all flex items-center justify-between text-left ${cardStyle}`}
                    >
                      <span className="text-sm md:text-base">{option}</span>
                      {isConfirmed && isCorrectAnswer && (
                        <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0" />
                      )}
                      {isConfirmed && isSelected && !isCorrectAnswer && (
                        <XCircle size={20} className="text-rose-500 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Show explanation after confirmation */}
              {isConfirmed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-xs md:text-sm text-indigo-950 font-bold"
                >
                  <div className="flex items-center gap-2 mb-1.5 text-indigo-700 font-extrabold">
                    <Sparkles size={16} />
                    <span>{isRtl ? 'الشرح والتحليل اللغوي' : 'Grammar Explanation'}</span>
                  </div>
                  <p>{isRtl ? currentQuestion.explanationAr : currentQuestion.explanation}</p>
                </motion.div>
              )}

              {/* Footer action buttons */}
              <div className="mt-8 flex justify-end gap-3 border-t border-slate-100 pt-6">
                {!isConfirmed ? (
                  <button
                    onClick={handleConfirm}
                    disabled={selectedIdx === null}
                    className={`px-8 py-3 rounded-xl font-black text-xs md:text-sm transition-all shadow-md flex items-center gap-2 uppercase tracking-wider ${
                      selectedIdx !== null
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                    }`}
                  >
                    {isRtl ? 'تأكيد الإجابة' : 'Confirm'}
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-8 py-3 rounded-xl bg-[#002147] hover:bg-slate-800 text-white font-black text-xs md:text-sm transition-all shadow-md flex items-center gap-2 uppercase tracking-wider"
                  >
                    <span>
                      {currentStep === questions.length - 1
                        ? (isRtl ? 'إنهاء الامتحان ورصد الدرجة' : 'Finish & Grade')
                        : (isRtl ? 'السؤال التالي' : 'Next Question')}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl mt-12 z-10 text-center"
          >
            <div className="bg-white rounded-[3.5rem] p-10 shadow-2xl border-4 border-slate-50 relative overflow-hidden flex flex-col items-center">
              <div className="w-32 h-32 bg-amber-400 text-white rounded-full flex items-center justify-center shadow-xl mb-6">
                <Trophy size={60} className="animate-bounce" />
              </div>

              <h2 className="text-2xl md:text-4xl font-extrabold text-[#002147] mb-2 leading-tight">
                {isRtl ? 'تم اجتياز الاختبار الدوري بنجاح!' : 'Test Completed Successfully!'}
              </h2>
              
              <div className="flex bg-slate-50 rounded-2xl p-4 gap-6 px-8 mb-6 border border-slate-100 mt-4 shadow-sm">
                <div>
                  <span className="text-[10px] font-black uppercase text-slate-400 block tracking-widest">
                    {isRtl ? 'الدرجة الكلية' : 'SCORE'}
                  </span>
                  <span className="text-xl font-black text-[#002147]">
                    {score} / {questions.length}
                  </span>
                </div>
                <div className="w-[1px] bg-slate-200" />
                <div>
                  <span className="text-[10px] font-black uppercase text-slate-400 block tracking-widest">
                    {isRtl ? 'المعدل والتقييم' : 'GRADE'}
                  </span>
                  <span className="text-xl font-black text-emerald-600">
                    {Math.round((score / questions.length) * 100)}%
                  </span>
                </div>
                <div className="w-[1px] bg-slate-200" />
                <div>
                  <span className="text-[10px] font-black uppercase text-slate-300 block tracking-widest">
                    {isRtl ? 'نقاط الخبرة' : 'REWARD'}
                  </span>
                  <span className="text-xl font-black text-amber-500 flex items-center gap-0.5">
                    +100 XP
                  </span>
                </div>
              </div>

              <p className="text-slate-500 text-xs md:text-sm mb-8 leading-relaxed font-semibold max-w-sm">
                {isRtl
                  ? 'تم رصد نتيجتك وحفظها في صفحة تقدمك الدراسي، وقد حصلت على مكافأة 100 نقطة إضافية لحسابك!'
                  : 'Your score has been successfully cataloged and recorded in your Academic History. Keep up the amazing work!'}
              </p>

              <div className="w-full flex flex-col gap-3">
                <button
                  onClick={() => {
                    setCurrentStep(0);
                    setSelectedIdx(null);
                    setIsConfirmed(false);
                    setScore(0);
                    setShowResult(false);
                  }}
                  className="w-full py-4 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-2xl font-black text-xs md:text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw size={16} />
                  <span>{isRtl ? 'إعادة المحاولة مجدداً' : 'Retake Test'}</span>
                </button>

                <button
                  onClick={() => {
                    onComplete(score, questions.length);
                  }}
                  className="w-full py-4 bg-[#002147] hover:bg-slate-800 text-white rounded-2xl font-black text-xs md:text-sm tracking-widest uppercase transition-all shadow-lg shadow-blue-900/10"
                >
                  {isRtl ? 'العودة لجدول الخطة' : 'Back to Planner'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
