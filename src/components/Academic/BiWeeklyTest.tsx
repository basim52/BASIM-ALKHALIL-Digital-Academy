import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Volume2, 
  Trophy, 
  RotateCcw,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { UserProfile } from '../../types';
import { managedSpeak } from '../../lib/audio';
import {
  SectionShell,
  GoldCard,
  PrimaryButton,
  GhostButton,
  AnswerOption,
  ProgressPill,
  TutorFace
} from '../ui/academy';

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
  const t = (ar: string, en: string) => isRtl ? ar : en;
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
        managedSpeak(utterance);
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
            courseId: 'test',
            level: level || 'General',
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
    <SectionShell dir={isRtl ? 'rtl' : 'ltr'} className={`pb-20 ${isRtl ? 'font-arabic' : 'font-sans'}`}>
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b border-[#C49E3A]/25">
        <div className="flex items-center gap-3">
          <TutorFace tutor="sara" size="md" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-[#002147] tracking-tight">
                {t('الاختبار الدوري الشامل', 'Bi-Weekly Comprehensive Test')}
              </h1>
              <ProgressPill>
                {t(`مستوى الخطة: ${level.toUpperCase()}`, `Plan Level: ${level.toUpperCase()}`)}
              </ProgressPill>
            </div>
            <p className="text-xs text-[#002147]/70 font-bold mt-0.5">
              {t('تقييم أكاديمي نصف شهري لقياس مستوى التمكن اللغوي واستحقاق شهادة الإتقان', 'Bi-weekly academic assessment measuring language mastery and progress towards certification')}
            </p>
          </div>
        </div>

        <GhostButton onClick={onBack}>
          <ArrowLeft size={16} className={isRtl ? 'rotate-180' : ''} />
          <span>{t('العودة للخطة', 'Back to Planner')}</span>
        </GhostButton>
      </div>

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={`step-${currentStep}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-3xl mx-auto mt-4"
          >
            <GoldCard className="p-6 sm:p-8">
              {/* Question progress and audio */}
              <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-[#C49E3A]/20">
                <ProgressPill>
                  {t(`السؤال ${currentStep + 1} من ${questions.length}`, `Question ${currentStep + 1} of ${questions.length}`)}
                </ProgressPill>

                <GhostButton
                  onClick={() => speakText(currentQuestion.text)}
                  title={t('استمع للسؤال', 'Listen to Question')}
                >
                  <Volume2 size={16} />
                  <span>{t('استمع للسؤال', 'Listen')}</span>
                </GhostButton>
              </div>

              {/* Quiz question label */}
              <h2 className="text-lg sm:text-2xl font-black text-[#002147] leading-relaxed mb-6 font-mono text-center">
                {currentQuestion.text}
              </h2>

              {/* Options rendered via AnswerOption */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedIdx === idx;
                  const isCorrect = idx === currentQuestion.correct;
                  const optionState = isConfirmed
                    ? (isCorrect ? 'correct' : (isSelected ? 'wrong' : 'normal'))
                    : 'normal';

                  return (
                    <AnswerOption
                      key={idx}
                      label={option}
                      state={optionState}
                      selected={isSelected}
                      disabled={isConfirmed}
                      onClick={() => handleOptionClick(idx)}
                    />
                  );
                })}
              </div>

              {/* Grammar explanation after confirmation */}
              {isConfirmed && (
                <div className="mb-6 p-4 rounded-2xl bg-[#fdfaf3] border border-[#C49E3A]/40 text-xs sm:text-sm text-[#002147]">
                  <div className="flex items-center gap-2 mb-1.5 font-black text-[#002147]">
                    <Sparkles size={16} className="text-[#C49E3A] shrink-0" />
                    <span>{t('الشرح والتحليل اللغوي', 'Grammar Explanation')}</span>
                  </div>
                  <p className="font-bold leading-relaxed">
                    {isRtl ? currentQuestion.explanationAr : currentQuestion.explanation}
                  </p>
                </div>
              )}

              {/* Footer action buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-[#C49E3A]/20">
                {!isConfirmed ? (
                  <PrimaryButton
                    onClick={handleConfirm}
                    disabled={selectedIdx === null}
                  >
                    <span>{t('تأكيد الإجابة', 'Confirm Answer')}</span>
                  </PrimaryButton>
                ) : (
                  <PrimaryButton onClick={handleNext}>
                    <span>
                      {currentStep === questions.length - 1
                        ? t('إنهاء الامتحان ورصد الدرجة', 'Finish & Grade')
                        : t('السؤال التالي', 'Next Question')}
                    </span>
                  </PrimaryButton>
                )}
              </div>
            </GoldCard>
          </motion.div>
        ) : (
          <motion.div
            key="test-result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-xl mx-auto mt-6 text-center"
          >
            <GoldCard className="p-8 sm:p-10 flex flex-col items-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#002147] text-[#E6C36A] border-2 border-[#C49E3A] flex items-center justify-center shadow-md mb-4">
                <Trophy size={42} />
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-[#002147] mb-2 leading-tight">
                {t('تم اجتياز الاختبار الدوري بنجاح!', 'Test Completed Successfully!')}
              </h2>
              
              <div className="flex items-center justify-center gap-4 sm:gap-6 bg-[#fdfaf3] rounded-2xl p-4 border border-[#C49E3A]/30 my-4 w-full max-w-md">
                <div>
                  <span className="text-[10px] font-black uppercase text-[#002147]/60 block tracking-widest">
                    {t('الدرجة الكلية', 'SCORE')}
                  </span>
                  <span className="text-lg sm:text-xl font-black text-[#002147]">
                    {score} / {questions.length}
                  </span>
                </div>
                <div className="w-px h-8 bg-[#C49E3A]/30" />
                <div>
                  <span className="text-[10px] font-black uppercase text-[#002147]/60 block tracking-widest">
                    {t('المعدل والتقييم', 'GRADE')}
                  </span>
                  <span className="text-lg sm:text-xl font-black text-emerald-700">
                    {questions.length > 0 ? Math.round((score / questions.length) * 100) : 0}%
                  </span>
                </div>
                <div className="w-px h-8 bg-[#C49E3A]/30" />
                <div>
                  <span className="text-[10px] font-black uppercase text-[#002147]/60 block tracking-widest">
                    {t('نقاط الخبرة', 'REWARD')}
                  </span>
                  <span className="text-lg sm:text-xl font-black text-[#C49E3A]">
                    +100 XP
                  </span>
                </div>
              </div>

              <p className="text-[#002147]/75 text-xs sm:text-sm mb-6 leading-relaxed font-bold max-w-md">
                {t(
                  'تم رصد نتيجتك وحفظها في صفحة تقدمك الدراسي، وقد حصلت على مكافأة 100 نقطة إضافية لحسابك!',
                  'Your score has been successfully cataloged and recorded in your Academic History. Keep up the amazing work!'
                )}
              </p>

              <div className="w-full flex flex-col sm:flex-row gap-3 justify-center">
                <GhostButton
                  onClick={() => {
                    setCurrentStep(0);
                    setSelectedIdx(null);
                    setIsConfirmed(false);
                    setScore(0);
                    setShowResult(false);
                  }}
                  className="py-3 px-5 flex-1"
                >
                  <RotateCcw size={16} />
                  <span>{t('إعادة المحاولة مجدداً', 'Retake Test')}</span>
                </GhostButton>

                <PrimaryButton
                  onClick={() => {
                    onComplete(score, questions.length);
                  }}
                  className="py-3 px-5 flex-1"
                >
                  <CheckCircle2 size={16} />
                  <span>{t('العودة لجدول الخطة', 'Back to Planner')}</span>
                </PrimaryButton>
              </div>
            </GoldCard>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionShell>
  );
};
