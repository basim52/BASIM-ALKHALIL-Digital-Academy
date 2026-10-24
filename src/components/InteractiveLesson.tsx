import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pause, Check, X, ArrowRight, ArrowLeft, BookOpen, MessageCircle, PenTool, HelpCircle, Volume2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Lesson } from '../types';
import { speakAcademyText, cancelAllSpeech } from '../lib/audio';
import { AILessonCompanion } from './AILessonCompanion';
import { buildInteractiveLessonQuiz } from '../utils/academicCurriculumCatalogue';
import { SectionShell, GoldCard, PrimaryButton, GhostButton, AnswerOption, ProgressPill, TutorFace } from './ui/academy';


interface InteractiveLessonProps {
  lesson: Partial<Lesson>;
  isRtl: boolean;
  onFinish: (score?: number, total?: number) => void;
  onBack: () => void;
}

export const InteractiveLesson: React.FC<InteractiveLessonProps> = ({ lesson, isRtl, onFinish, onBack }) => {
  const [activeTab, setActiveTab] = useState<'warmup' | 'explanation' | 'exercises' | 'quiz'>('warmup');
  const [isPlayingId, setIsPlayingId] = useState<string | null>(null);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [score, setScore] = useState(0);

  const stopSpeaking = () => {
    cancelAllSpeech();
    setIsPlayingId(null);
  };

  const speak = async (text: string, lang: 'en' | 'ar', id: string) => {
    if (isPlayingId === id) {
      stopSpeaking();
      return;
    }

    setIsPlayingId(id);
    await speakAcademyText(
      text,
      lang,
      () => setIsPlayingId(id),
      () => setIsPlayingId(null)
    );
  };

  useEffect(() => {
    return () => cancelAllSpeech();
  }, []);
  const [quizFinished, setQuizFinished] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastQuizResult, setLastQuizResult] = useState<{ correct: boolean, explanation: string } | null>(null);

  // Guarantee verified quiz questions for any curriculum lesson
  const activeQuiz = React.useMemo(() => {
    if (Array.isArray(lesson.quiz) && lesson.quiz.length > 0) {
      return lesson.quiz;
    }
    const pillar = lesson.id?.startsWith('r_') ? 'reading' :
                   lesson.id?.startsWith('g_') ? 'grammar' :
                   lesson.id?.startsWith('c_') ? 'conversation' :
                   lesson.id?.startsWith('w_') ? 'writing' :
                   lesson.id?.startsWith('e_') ? 'expression' : 'general';
    return buildInteractiveLessonQuiz(pillar, {
      titleEn: lesson.title,
      titleAr: lesson.titleAr,
      readingTextEn: lesson.content,
      readingTextAr: lesson.contentAr,
      explanationEn: lesson.content,
      explanationAr: lesson.contentAr
    });
  }, [lesson]);
  
  // Exercise state
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<string, string>>({});
  const [showExerciseValidation, setShowExerciseValidation] = useState(false);

  const tabs = [
    { id: 'warmup', label: isRtl ? 'التهيئة' : 'Warm-Up', icon: <BookOpen size={18} /> },
    { id: 'explanation', label: isRtl ? 'الشرح' : 'Explanation', icon: <MessageCircle size={18} /> },
    { id: 'exercises', label: isRtl ? 'تمارين' : 'Exercises', icon: <PenTool size={18} /> },
    { id: 'quiz', label: isRtl ? 'اختبار' : 'Quiz', icon: <HelpCircle size={18} /> },
  ];

  const handleNextQuiz = () => {
    if (activeQuiz && currentQuizIndex < activeQuiz.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setShowFeedback(false);
    } else {
      setQuizFinished(true);
    }
  };

  const checkAnswer = (index: number) => {
    if (!activeQuiz || showFeedback) return;
    const q = activeQuiz[currentQuizIndex];
    const isCorrect = index === q.correctIndex;
    if (isCorrect) setScore(prev => prev + 1);
    
    setLastQuizResult({
      correct: isCorrect,
      explanation: isRtl ? q.explanationAr : q.explanation
    });
    setShowFeedback(true);
  };

  const handleExerciseInput = (exIdx: number, itemIdx: number, val: string) => {
    setExerciseAnswers(prev => ({
      ...prev,
      [`${exIdx}-${itemIdx}`]: val
    }));
  };

  const checkExerciseAnswers = () => {
    setShowExerciseValidation(true);
  };

  // Content processing for "Grammar" view
  // In a real app we might parse the markdown to generate accordions, 
  // but for now we'll render the markdown and provide specialized blocks if text includes markers
  
  const stepIndex = tabs.findIndex(t => t.id === activeTab);
  const currentStep = stepIndex >= 0 ? stepIndex + 1 : 1;
  const totalSteps = tabs.length;
  const stepProgress = (currentStep / totalSteps) * 100;

  return (
    <SectionShell dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Lesson Header Card */}
      <GoldCard className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <TutorFace tutor="sara" size="sm" isSpeaking={isPlayingId !== null} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <ProgressPill>{lesson.proficiencyLevel || 'A1'}</ProgressPill>
                <span className="text-[11px] font-bold text-[#002147]/70">
                  {isRtl ? '٢٠ دقيقة' : '20 min'}
                </span>
              </div>
              <h1 className="text-sm sm:text-base md:text-lg font-black text-[#002147] leading-tight truncate">
                {isRtl ? lesson.titleAr || lesson.title : lesson.title || lesson.titleAr}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <button 
              type="button"
              onClick={() => speak(isRtl ? lesson.titleAr || '' : lesson.title || '', isRtl ? 'ar' : 'en', 'title-audio')}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors active:scale-95 ${
                isPlayingId === 'title-audio'
                  ? 'bg-[#C49E3A] text-[#002147]'
                  : 'bg-[#002147] text-[#E6C36A] hover:bg-[#001a38]'
              }`}
              title="Play title audio"
              aria-label="Play title audio"
            >
              {isPlayingId === 'title-audio' ? <Pause size={16} /> : <Volume2 size={16} />}
            </button>
            {isPlayingId === 'title-audio' && (
              <button 
                type="button"
                onClick={stopSpeaking}
                className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition-colors"
                title="Stop audio"
                aria-label="Stop audio"
              >
                <X size={16} />
              </button>
            )}
            <GhostButton onClick={onBack} className="!px-3 !py-1.5 !text-xs">
              <ArrowLeft size={14} className={isRtl ? 'rotate-180' : ''} />
              <span>{isRtl ? 'المنهج' : 'Curriculum'}</span>
            </GhostButton>
          </div>
        </div>
      </GoldCard>

      {/* Thin Gold Progress Bar on top showing real current step / total */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-black text-[#002147] px-1">
          <span>
            {isRtl ? `الخطوة ${currentStep} من ${totalSteps}: ${tabs[stepIndex]?.label}` : `Step ${currentStep} of ${totalSteps}: ${tabs[stepIndex]?.label}`}
          </span>
          <ProgressPill>
            {Math.round(stepProgress)}%
          </ProgressPill>
        </div>
        <div className="w-full h-1.5 bg-[#C49E3A]/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#C49E3A] transition-all duration-300 rounded-full"
            style={{ width: `${stepProgress}%` }}
          />
        </div>
      </div>

      {/* Step Tabs Navigation */}
      <div className="flex gap-1.5 sm:gap-2 p-1.5 bg-white border border-[#C49E3A]/40 rounded-2xl overflow-x-auto">
        {tabs.map((tab, idx) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 min-w-[75px] sm:min-w-[110px] flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl font-black text-xs transition-all active:scale-95 ${
                isActive
                  ? 'bg-[#002147] text-[#E6C36A] shadow-sm'
                  : 'text-[#002147]/70 hover:text-[#002147] hover:bg-[#fdfaf3]'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-[#C49E3A]/20 text-[#002147] text-[10px] flex items-center justify-center font-bold">
                {idx + 1}
              </span>
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 'warmup' && (
            <motion.div
              key="warmup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GoldCard className="p-4 sm:p-6 space-y-5">
                <div className="flex items-center justify-between gap-3 border-b border-[#C49E3A]/20 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📖</span>
                    <h2 className="text-sm sm:text-base font-black text-[#002147]">
                      {isRtl ? 'ماذا ستتعلم اليوم؟' : "Today's Mission"}
                    </h2>
                  </div>
                  <button 
                    type="button"
                    onClick={() => speak(isRtl ? lesson.warmup?.missionAr || '' : lesson.warmup?.mission || '', isRtl ? 'ar' : 'en', 'mission')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-colors active:scale-95 ${
                      isPlayingId === 'mission'
                        ? 'bg-[#C49E3A] text-[#002147]'
                        : 'bg-[#002147] text-[#E6C36A] hover:bg-[#001a38]'
                    }`}
                  >
                    {isPlayingId === 'mission' ? <Pause size={14} /> : <Volume2 size={14} />}
                    <span>{isRtl ? 'استمع للمهمة' : 'Listen'}</span>
                  </button>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-[#fdfaf3] border border-[#C49E3A]/30 text-xs sm:text-sm font-bold text-[#002147] leading-relaxed">
                  {isRtl 
                    ? (lesson.warmup?.missionAr || 'في هذا الدرس، سنقوم باستكشاف مفاهيم جديدة لتمكينك لغوياً.') 
                    : (lesson.warmup?.mission || "In this lesson, we will explore new concepts to empower your linguistic skills.")}
                </div>

                <div className="space-y-2.5 pt-1">
                  <h3 className="text-xs sm:text-sm font-black text-[#002147]">
                    {isRtl ? 'الأهداف التعليمية للدرس:' : 'Lesson Objectives:'}
                  </h3>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3">
                    {(isRtl ? (lesson.warmup?.objectivesAr || []) : (lesson.warmup?.objectives || [])).map((obj, i) => (
                      <div key={`objective-${i}`} className="p-3 rounded-2xl bg-white border border-[#C49E3A]/40 flex flex-col justify-between gap-2 shadow-xs">
                        <div className="flex items-center justify-between">
                          <span className="w-5 h-5 rounded-full bg-[#002147] text-[#E6C36A] text-[10px] font-black flex items-center justify-center">
                            0{i+1}
                          </span>
                          <button 
                            type="button"
                            onClick={() => speak(obj, isRtl ? 'ar' : 'en', `obj-${i}`)}
                            className={`p-1 rounded-lg transition-colors ${isPlayingId === `obj-${i}` ? 'bg-[#C49E3A] text-[#002147]' : 'text-[#002147]/60 hover:text-[#002147] hover:bg-[#C49E3A]/10'}`}
                            title="Speak objective"
                            aria-label="Speak objective"
                          >
                            <Volume2 size={13} />
                          </button>
                        </div>
                        <p className="text-xs font-bold text-[#002147] leading-relaxed">{obj}</p>
                      </div>
                    ))}
                    {(!lesson.warmup?.objectives || lesson.warmup.objectives.length === 0) && [1, 2, 3].map(i => (
                      <div key={`dummy-obj-${i}`} className="p-3 rounded-2xl bg-white border border-[#C49E3A]/40 flex flex-col justify-between gap-2 shadow-xs">
                        <span className="w-5 h-5 rounded-full bg-[#002147] text-[#E6C36A] text-[10px] font-black flex items-center justify-center">
                          0{i}
                        </span>
                        <p className="text-xs font-bold text-[#002147] leading-relaxed">
                          {isRtl ? 'فهم القواعد الأساسية وتطبيقها في جمل بسيطة وواضحة.' : 'Understand the core rules and apply them in simple, clear sentences.'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#C49E3A]/20 flex justify-end">
                  <PrimaryButton onClick={() => setActiveTab('explanation')}>
                    <span>{isRtl ? 'الانتقال إلى الشرح' : 'Continue to Explanation'}</span>
                    <ArrowRight size={14} className={isRtl ? 'rotate-180' : ''} />
                  </PrimaryButton>
                </div>
              </GoldCard>
            </motion.div>
          )}

          {activeTab === 'explanation' && (
            <motion.div 
              key="explanation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GoldCard className="p-4 sm:p-6 space-y-5">
                <div className="flex items-center justify-between gap-3 border-b border-[#C49E3A]/20 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">💬</span>
                    <h2 className="text-sm sm:text-base font-black text-[#002147]">
                      {isRtl ? 'الشرح الأكاديمي' : 'Academic Explanation'}
                    </h2>
                  </div>
                  <button 
                    type="button"
                    onClick={() => speak(isRtl ? lesson.contentAr || '' : lesson.content || '', isRtl ? 'ar' : 'en', 'explanation-audio')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-colors active:scale-95 ${
                      isPlayingId === 'explanation-audio'
                        ? 'bg-[#C49E3A] text-[#002147]'
                        : 'bg-[#002147] text-[#E6C36A] hover:bg-[#001a38]'
                    }`}
                  >
                    {isPlayingId === 'explanation-audio' ? <Pause size={14} /> : <Volume2 size={14} />}
                    <span>{isRtl ? 'استمع للشرح' : 'Listen'}</span>
                  </button>
                </div>

                <div className="prose max-w-none text-xs sm:text-sm font-bold text-[#002147] leading-relaxed prose-headings:font-black prose-headings:text-[#002147] prose-strong:text-[#002147] prose-strong:font-black prose-blockquote:border-r-4 prose-blockquote:border-[#C49E3A] prose-blockquote:bg-[#fdfaf3] prose-blockquote:p-3 prose-blockquote:rounded-xl">
                  <ReactMarkdown>{isRtl ? lesson.contentAr || '' : lesson.content || ''}</ReactMarkdown>
                </div>

                <div className="pt-3 border-t border-[#C49E3A]/20 flex items-center justify-between gap-2">
                  <GhostButton onClick={() => setActiveTab('warmup')}>
                    <ArrowLeft size={14} className={isRtl ? 'rotate-180' : ''} />
                    <span>{isRtl ? 'السابق: التهيئة' : 'Back: Warm-Up'}</span>
                  </GhostButton>
                  <PrimaryButton onClick={() => setActiveTab('exercises')}>
                    <span>{isRtl ? 'التالي: التمارين' : 'Next: Exercises'}</span>
                    <ArrowRight size={14} className={isRtl ? 'rotate-180' : ''} />
                  </PrimaryButton>
                </div>
              </GoldCard>
            </motion.div>
          )}

          {activeTab === 'exercises' && (
            <motion.div 
              key="exercises"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GoldCard className="p-4 sm:p-6 space-y-5">
                <div className="flex items-center gap-2 border-b border-[#C49E3A]/20 pb-3">
                  <span className="text-xl">✍️</span>
                  <h2 className="text-sm sm:text-base font-black text-[#002147]">
                    {isRtl ? 'التمارين التطبيقية' : 'Practical Exercises'}
                  </h2>
                </div>

                {lesson.exercises && lesson.exercises.length > 0 ? (
                  lesson.exercises.map((ex, idx) => (
                    <div key={`exercise-block-${idx}-${ex.type || 'default'}`} className="p-3.5 sm:p-4 rounded-2xl bg-[#fdfaf3] border border-[#C49E3A]/30 space-y-4">
                      <h3 className="text-xs sm:text-sm font-black text-[#002147]">
                        {(isRtl ? ex.instructionAr : ex.instruction) || (isRtl ? "تمرين تطبيقي" : "Practical Exercise")}
                      </h3>

                      <div className="space-y-4">
                      {(ex.type === 'fill' || !ex.type) && (
                        <div className="space-y-3.5">
                          {ex.items.map((item: any, i: number) => {
                            const userAns = exerciseAnswers[`${idx}-${i}`] || "";
                            const isCorrect = userAns.trim().toLowerCase() === (item.answer || "").trim().toLowerCase();
                            
                            return (
                              <div key={`exercise-item-${idx}-${i}`} className="space-y-1.5">
                                <div className="text-xs sm:text-sm font-bold text-[#002147] flex items-start gap-2">
                                  <span className="w-5 h-5 rounded-full bg-[#002147] text-[#E6C36A] text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                                    {i+1}
                                  </span>
                                  <div className="flex-1">
                                    <ReactMarkdown>{isRtl ? (item.textAr || item.text) : item.text}</ReactMarkdown>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <input 
                                    type="text" 
                                    value={userAns}
                                    onChange={(e) => handleExerciseInput(idx, i, e.target.value)}
                                    placeholder={isRtl ? "اكتب الإجابة..." : "Type answer..."}
                                    className={`flex-1 max-w-md p-2.5 sm:p-3 bg-white border-2 rounded-xl text-xs sm:text-sm font-bold text-[#002147] outline-none transition-all ${
                                      showExerciseValidation 
                                        ? isCorrect ? "border-green-600 bg-green-50 text-green-900" : "border-red-600 bg-red-50 text-red-900"
                                        : "border-[#C49E3A]/40 focus:border-[#C49E3A]"
                                    }`}
                                  />
                                  {showExerciseValidation && (
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                      {isCorrect ? <Check className="text-green-600" size={18} /> : <X className="text-red-600" size={18} />}
                                    </motion.div>
                                  )}
                                </div>
                                {showExerciseValidation && !isCorrect && (
                                  <p className="text-xs font-black text-green-700">
                                    {isRtl ? `الإجابة الصحيحة: ${item.answer}` : `Correct answer: ${item.answer}`}
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                      
                      {ex.type === 'match' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-2">
                            {ex.items.map((item: any, i: number) => (
                              <div key={`match-left-${idx}-${i}`} className="p-2.5 bg-white border border-[#C49E3A]/40 rounded-xl font-bold text-xs sm:text-sm text-[#002147] flex justify-between items-center">
                                <span>{isRtl ? item.textAr : item.text}</span>
                                <span className="w-5 h-5 rounded-full bg-[#002147] text-[#E6C36A] text-[10px] flex items-center justify-center">{i+1}</span>
                              </div>
                            ))}
                          </div>
                          <div className="space-y-2">
                            {[...ex.items].sort(() => Math.random() - 0.5).map((item: any, i: number) => (
                              <div key={`match-right-${idx}-${i}`} className="p-2.5 bg-white border border-[#C49E3A]/40 rounded-xl font-bold text-xs sm:text-sm text-[#002147] text-start">
                                {isRtl ? item.answerAr || item.answer : item.answer}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 sm:p-6 rounded-2xl bg-[#fdfaf3] border border-[#C49E3A]/30 text-center">
                  <p className="text-xs sm:text-sm font-bold text-[#002147]">
                    {isRtl ? "لا توجد تمارين إضافية لهذا الدرس، يرجى الانتقال للاختبار." : "No additional exercises for this lesson. Please proceed to the quiz."}
                  </p>
                </div>
              )}
              
              {lesson.exercises && lesson.exercises.length > 0 && (
                <div className="flex justify-start">
                  <PrimaryButton onClick={checkExerciseAnswers}>
                    {isRtl ? "تحقق من الإجابات" : "Check Answers"}
                  </PrimaryButton>
                </div>
              )}

              <div className="pt-3 border-t border-[#C49E3A]/20 flex items-center justify-between gap-2">
                <GhostButton onClick={() => setActiveTab('explanation')}>
                  <ArrowLeft size={14} className={isRtl ? "rotate-180" : ""} />
                  <span>{isRtl ? "السابق: الشرح" : "Back: Explanation"}</span>
                </GhostButton>
                <PrimaryButton onClick={() => setActiveTab('quiz')}>
                  <span>{isRtl ? "التالي: الاختبار" : "Next: Quiz"}</span>
                  <ArrowRight size={14} className={isRtl ? "rotate-180" : ""} />
                </PrimaryButton>
              </div>
            </GoldCard>
          </motion.div>
        )}

          {activeTab === 'quiz' && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GoldCard className="p-4 sm:p-6 space-y-5">
                {!quizFinished && activeQuiz && activeQuiz.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3 border-b border-[#C49E3A]/20 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🎯</span>
                        <h2 className="text-sm sm:text-base font-black text-[#002147]">
                          {isRtl ? "اختبار الإتقان" : "Mastery Quiz"}
                        </h2>
                      </div>
                      <ProgressPill>
                        {currentQuizIndex + 1} / {activeQuiz.length}
                      </ProgressPill>
                    </div>

                    <h3 className="text-xs sm:text-sm font-black text-[#002147] leading-relaxed">
                      {isRtl ? activeQuiz[currentQuizIndex].questionAr : activeQuiz[currentQuizIndex].question}
                    </h3>

                    <div className="grid gap-2">
                      {(isRtl ? activeQuiz[currentQuizIndex].optionsAr : activeQuiz[currentQuizIndex].options).map((opt, i) => {
                        let state: "normal" | "correct" | "wrong" = "normal";
                        if (showFeedback) {
                          if (i === activeQuiz[currentQuizIndex].correctIndex) {
                            state = "correct";
                          }
                        }
                        return (
                          <AnswerOption
                            key={`quiz-option-${currentQuizIndex}-${i}`}
                            label={opt}
                            state={state}
                            disabled={showFeedback}
                            onClick={() => checkAnswer(i)}
                          />
                        );
                      })}
                    </div>

                    <AnimatePresence>
                      {showFeedback && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={`p-3.5 sm:p-4 rounded-2xl border-2 flex flex-col gap-2 ${
                            lastQuizResult?.correct 
                              ? "bg-green-50 border-green-600 text-green-950" 
                              : "bg-red-50 border-red-600 text-red-950"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-base">{lastQuizResult?.correct ? "✓" : "✗"}</span>
                            <h4 className="font-black text-xs uppercase tracking-wide">
                              {lastQuizResult?.correct ? (isRtl ? "إجابة عبقرية!" : "Brilliant Answer!") : (isRtl ? "إجابة غير صحيحة" : "Not quite right")}
                            </h4>
                          </div>
                          <p className="text-xs font-bold leading-relaxed opacity-90">
                            {lastQuizResult?.explanation}
                          </p>
                          <div className="pt-2 flex justify-end">
                            <PrimaryButton onClick={handleNextQuiz} className="!px-3 !py-1.5 !text-xs">
                              <span>{currentQuizIndex < activeQuiz.length - 1 ? (isRtl ? "السؤال التالي" : "Next Question") : (isRtl ? "عرض النتيجة" : "View Score")}</span>
                              <ArrowRight size={14} className={isRtl ? "rotate-180" : ""} />
                            </PrimaryButton>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="pt-3 border-t border-[#C49E3A]/20 flex items-center justify-between gap-2">
                      <GhostButton onClick={() => setActiveTab('exercises')}>
                        <ArrowLeft size={14} className={isRtl ? "rotate-180" : ""} />
                        <span>{isRtl ? "السابق: التمارين" : "Back: Exercises"}</span>
                      </GhostButton>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 sm:py-8 px-2 space-y-3">
                    <div className="w-14 h-14 rounded-full bg-[#002147] text-[#E6C36A] flex items-center justify-center mx-auto text-2xl border-2 border-[#C49E3A] shadow-sm">
                      🏆
                    </div>
                    <h2 className="text-lg sm:text-xl font-black text-[#002147]">
                      {isRtl ? "أحسنت يا بطل!" : "Lesson Mastered!"}
                    </h2>
                    <p className="text-xs sm:text-sm font-bold text-[#002147]/70 max-w-md mx-auto leading-relaxed">
                      {isRtl ? `لقد أتممت الدرس واختبار الإتقان بنجاح وحصلت على ${score} من ${activeQuiz?.length || 0} نقاط موثقة.` : `You have successfully completed the lesson and mastery test with a verified score of ${score}/${activeQuiz?.length || 0}.`}
                    </p>
                    <div className="pt-2 flex justify-center">
                      <PrimaryButton onClick={() => onFinish(score, activeQuiz?.length || 5)}>
                        <span>{isRtl ? "إكمال المنهج" : "Back to Curriculum"}</span>
                        <ArrowRight size={14} className={isRtl ? "rotate-180" : ""} />
                      </PrimaryButton>
                    </div>
                  </div>
                )}
              </GoldCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* AI Lesson Companion */}
      <AILessonCompanion lesson={lesson} isRtl={isRtl} />
    </SectionShell>
  );
};
