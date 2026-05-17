import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, ChevronDown, Check, X, ArrowRight, ArrowLeft, Timer, Award, MessageCircle, BookOpen, PenTool, HelpCircle, Volume2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Lesson } from '../types';


interface InteractiveLessonProps {
  lesson: Partial<Lesson>;
  isRtl: boolean;
  onFinish: (score?: number) => void;
  onBack: () => void;
}

export const InteractiveLesson: React.FC<InteractiveLessonProps> = ({ lesson, isRtl, onFinish, onBack }) => {
  const [activeTab, setActiveTab] = useState<'warmup' | 'explanation' | 'exercises' | 'quiz'>('warmup');
  const [isPlayingId, setIsPlayingId] = useState<string | null>(null);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [score, setScore] = useState(0);

  const synthesis = typeof window !== 'undefined' ? window.speechSynthesis : null;

  const stopSpeaking = () => {
    if (synthesis) {
      synthesis.cancel();
      setIsPlayingId(null);
    }
  };

  const speak = (text: string, lang: 'en' | 'ar', id: string) => {
    if (!synthesis) return;

    if (isPlayingId === id) {
      stopSpeaking();
      return;
    }

    stopSpeaking();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'en' ? 'en-US' : 'ar-SA';
    utterance.rate = 0.9;
    
    utterance.onend = () => {
      setIsPlayingId(null);
    };

    utterance.onerror = (event) => {
      console.error("Speech Error:", event);
      setIsPlayingId(null);
    };

    setIsPlayingId(id);
    synthesis.speak(utterance);
  };

  useEffect(() => {
    return () => window.speechSynthesis.cancel();
  }, []);
  const [quizFinished, setQuizFinished] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastQuizResult, setLastQuizResult] = useState<{ correct: boolean, explanation: string } | null>(null);
  
  // Exercise state
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<string, string>>({});
  const [showExerciseValidation, setShowExerciseValidation] = useState(false);

  const tabs = [
    { id: 'warmup', label: isRtl ? 'التهيئة' : 'Warm-Up', icon: <BookOpen size={18} /> },
    { id: 'explanation', label: isRtl ? 'الشرح' : 'Explanation', icon: <MessageCircle size={18} /> },
    { id: 'exercises', label: isRtl ? 'تمارين' : 'Exercises', icon: <PenTool size={18} /> },
    { id: 'quiz', label: isRtl ? 'اختبار' : 'Quiz', icon: <HelpCircle size={18} /> },
  ];

  const togglePause = () => {
    if (!synthesis) return;
    if (synthesis.paused) {
      synthesis.resume();
      setIsPlayingId(isPlayingId); // Keep ID
    } else {
      synthesis.pause();
    }
  };

  const handleNextQuiz = () => {
    if (lesson.quiz && currentQuizIndex < lesson.quiz.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setShowFeedback(false);
    } else {
      setQuizFinished(true);
    }
  };

  const checkAnswer = (index: number) => {
    if (!lesson.quiz || showFeedback) return;
    const q = lesson.quiz[currentQuizIndex];
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
  
  return (
    <div className={`min-h-screen bg-cream text-ink font-sans selection:bg-amber-accent/20 ${isRtl ? 'rtl' : 'ltr'}`}>
      {/* Premium Header - Matching ReadingLesson Style */}
      <header className="bg-oxford-navy text-cream pt-10 pb-20 md:pt-16 md:pb-24 px-4 md:px-8 relative overflow-hidden">
        {/* Back Button */}
        <div className="max-w-5xl mx-auto mb-8 relative z-30">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-cream/60 hover:text-white transition-all group font-black text-xs uppercase tracking-widest"
          >
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-amber-accent group-hover:text-white transition-all">
              <ArrowLeft size={20} className={isRtl ? 'rotate-180' : ''} />
            </div>
            {isRtl ? 'الرجوع للقائمة' : 'Back to Curriculum'}
          </button>
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-accent/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="bg-oxford-gold text-oxford-navy px-3 md:px-4 py-1 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest leading-none">
              {isRtl ? 'المنهج الأكاديمي' : 'Academic Curriculum'}
            </span>
            <span className="bg-white/10 text-cream/80 px-3 md:px-4 py-1 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest leading-none border border-white/10">
              {lesson.proficiencyLevel || 'A1'}
            </span>
            <span className="bg-white/10 text-cream/80 px-3 md:px-4 py-1 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest leading-none border border-white/10">
              {isRtl ? '٢٠ دقيقة' : '20 min lesson'}
            </span>
          </div>
          
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-4">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-serif font-black leading-tight tracking-tight">
              {isRtl ? lesson.titleAr : lesson.title}
            </h1>
            <div className="flex gap-2">
              <button 
                onClick={() => speak(isRtl ? lesson.titleAr || '' : lesson.title || '', isRtl ? 'ar' : 'en', 'title-audio')}
                className={`w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all ${isPlayingId === 'title-audio' ? 'bg-amber-accent text-white scale-110 shadow-lg' : 'bg-white/10 text-cream hover:bg-amber-accent hover:scale-110'}`}
              >
                {isPlayingId === 'title-audio' ? <Pause size={20} /> : <Volume2 size={20} />}
              </button>
              {isPlayingId === 'title-audio' && (
                <button 
                  onClick={stopSpeaking}
                  className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <p className="text-oxford-gold/80 font-medium text-base md:text-xl max-w-2xl font-tajawal leading-relaxed">
              {isRtl ? lesson.warmup?.missionAr : lesson.warmup?.mission}
            </p>
            <button 
              onClick={() => speak(isRtl ? lesson.warmup?.missionAr || '' : lesson.warmup?.mission || '', isRtl ? 'ar' : 'en', 'mission-audio')}
              className={`mt-1 hover:text-amber-accent transition-colors ${isPlayingId === 'mission-audio' ? 'text-amber-accent' : 'text-oxford-gold/40'}`}
            >
              <Volume2 size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area - Overlapping Container */}
      <div className="max-w-5xl mx-auto -mt-12 mb-24 px-4 md:px-8 relative z-20">
        <div className="bg-white rounded-[2.5rem] shadow-[0_30px_60px_rgba(26,18,9,0.08)] border border-oxford-navy/5 overflow-hidden">
          
          {/* Custom Tabs Bar */}
          <div className="flex border-b border-oxford-navy/5 overflow-x-auto no-scrollbar bg-[#fcfdfd]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 md:flex-1 min-w-[max-content] md:min-w-[140px] flex items-center justify-center gap-2 md:gap-3 py-4 md:py-6 px-4 transition-all relative font-black text-[10px] md:text-xs uppercase tracking-[0.15em] whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'text-amber-accent bg-white shadow-inner' 
                    : 'text-oxford-navy/40 hover:text-oxford-navy/80 hover:bg-white/50'
                }`}
              >
                <div className={`p-1.5 md:p-2 rounded-xl transition-colors ${activeTab === tab.id ? 'bg-amber-accent/10 text-amber-accent' : 'bg-transparent text-oxford-navy/40'}`}>
                  {React.cloneElement(tab.icon as React.ReactElement<{ size: number }>, { size: 16 })}
                </div>
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-amber-accent"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-14 lg:p-20 min-h-[600px]">
        <AnimatePresence mode="wait">
          {activeTab === 'warmup' && (
            <motion.section 
              key="warmup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="bg-ink text-cream p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-accent/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
                <BookOpen size={48} className="mb-8 text-amber-accent" />
                <h2 className="text-3xl md:text-4xl font-serif font-black mb-6">
                  {isRtl ? 'ماذا ستتعلم اليوم؟' : "Today's Mission"}
                </h2>
                <div className="prose prose-invert prose-lg max-w-none prose-p:text-cream/80 leading-relaxed font-medium">
                  {isRtl 
                    ? (lesson.warmup?.missionAr || 'في هذا الدرس، سنقوم باستكشاف مفاهيم جديدة لتمكينك لغوياً.') 
                    : (lesson.warmup?.mission || "In this lesson, we will explore new concepts to empower your linguistic skills.")}
                </div>

                {/* Audio Player UI */}
                <div className="mt-8 flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <button 
                    onClick={() => speak(isRtl ? lesson.warmup?.missionAr || '' : lesson.warmup?.mission || '', isRtl ? 'ar' : 'en', 'mission')}
                    className="w-12 h-12 rounded-xl bg-amber-accent flex items-center justify-center text-white hover:scale-105 transition-transform"
                  >
                    {isPlayingId === 'mission' ? <Pause size={20} /> : <Volume2 size={20} />}
                  </button>
                  <div className="flex-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-cream/40 mb-1">
                      {isRtl ? 'استمع للمهمة العلمية' : 'Listen to Academic Mission'}
                    </p>
                    <p className="text-xs text-oxford-gold font-bold">
                      {isRtl ? 'صوت ذكاء اصطناعي لتعزيز النطق' : 'AI Voice for pronunciation'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {(isRtl ? (lesson.warmup?.objectivesAr || []) : (lesson.warmup?.objectives || [])).map((obj, i) => (
                  <div key={`objective-${i}`} className="bg-white/50 border border-ink/5 p-8 rounded-3xl hover:border-amber-accent/30 transition-all group flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 bg-cream border border-ink/5 rounded-2xl flex items-center justify-center text-amber-accent font-mono text-xl font-black group-hover:scale-110 transition-transform">
                          0{i+1}
                        </div>
                        <button 
                          onClick={() => speak(obj, isRtl ? 'ar' : 'en', `obj-${i}`)}
                          className={`p-2 rounded-lg transition-colors ${isPlayingId === `obj-${i}` ? 'bg-amber-accent text-white' : 'text-ink/10 hover:text-amber-accent hover:bg-amber-accent/10'}`}
                        >
                          <Volume2 size={16} />
                        </button>
                      </div>
                      <h3 className="text-xl font-bold mb-4 font-serif">{isRtl ? `الهدف رقم ${i+1}` : `Objective 0${i+1}`}</h3>
                      <p className="text-ink/60 leading-relaxed">
                        {obj}
                      </p>
                    </div>
                  </div>
                ))}
                {(!lesson.warmup?.objectives) && [1, 2, 3].map(i => (
                  <div key={`dummy-obj-${i}`} className="bg-white/50 border border-ink/5 p-8 rounded-3xl hover:border-amber-accent/30 transition-all group">
                    <div className="w-12 h-12 bg-cream border border-ink/5 rounded-2xl flex items-center justify-center text-amber-accent mb-6 font-mono text-xl font-black group-hover:scale-110 transition-transform">
                      0{i}
                    </div>
                    <h3 className="text-xl font-bold mb-4 font-serif">{isRtl ? `الهدف رقم ${i}` : `Objective 0${i}`}</h3>
                    <p className="text-ink/60 leading-relaxed">
                      {isRtl ? 'فهم القواعد الأساسية وتطبيقها في جمل بسيطة وواضحة.' : 'Understand the core rules and apply them in simple, clear sentences.'}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {activeTab === 'explanation' && (
            <motion.section 
              key="explanation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center bg-white p-4 md:p-6 rounded-[2rem] border border-ink/5 shadow-sm">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-oxford-navy text-white rounded-xl md:rounded-2xl flex items-center justify-center">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-serif font-black leading-tight">{isRtl ? 'استمع للشرح الأكاديمي' : 'Listen to Academic Explanation'}</h3>
                    <p className="text-[10px] text-oxford-navy/40 font-black uppercase tracking-widest leading-none mt-1">
                      {isRtl ? 'صوت ذكاء اصطناعي' : 'AI Voice Assistance'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => speak(isRtl ? lesson.contentAr || '' : lesson.content || '', isRtl ? 'ar' : 'en', 'explanation-audio')}
                  className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all ${isPlayingId === 'explanation-audio' ? 'bg-amber-accent text-white scale-110 shadow-lg' : 'bg-oxford-navy text-white hover:bg-amber-accent'}`}
                >
                  {isPlayingId === 'explanation-audio' ? <Pause size={28} /> : <Volume2 size={28} />}
                </button>
              </div>

              <div className={`markdown-body prose prose-slate md:prose-lg max-w-none 
                prose-headings:font-serif prose-headings:font-black prose-headings:text-ink
                prose-p:text-ink/70 prose-p:leading-relaxed
                prose-strong:text-amber-accent prose-strong:font-black
                prose-blockquote:border-l-4 prose-blockquote:border-amber-accent prose-blockquote:bg-amber-accent/5 prose-blockquote:py-2 prose-blockquote:rounded-r-2xl
                prose-table:border prose-table:border-slate-200 prose-th:bg-slate-50 prose-th:p-4 prose-td:p-4 prose-td:border prose-td:border-slate-100 overflow-x-auto custom-markdown-content
                ${isRtl ? 'font-tajawal' : 'font-roboto'}
              `}>
                <ReactMarkdown>{isRtl ? lesson.contentAr || '' : lesson.content || ''}</ReactMarkdown>
              </div>
            </motion.section>
          )}

          {activeTab === 'exercises' && (
            <motion.section 
              key="exercises"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {lesson.exercises && lesson.exercises.length > 0 ? (
                lesson.exercises.map((ex, idx) => (
                  <div key={`exercise-block-${idx}-${ex.type || 'default'}`} className="bg-white p-10 rounded-[2.5rem] border border-ink/5 shadow-xl">
                    <div className="flex items-center gap-3 mb-10">
                      <PenTool className="text-amber-accent" size={24} />
                      <h3 className="text-2xl font-serif font-black">
                        {(isRtl ? ex.instructionAr : ex.instruction) || (isRtl ? "تمرين تطبيقي" : "Practical Exercise")}
                      </h3>
                    </div>

                    <div className="space-y-10">
                      {(ex.type === 'fill' || !ex.type) && (
                        <div className="space-y-6">
                           {ex.items.map((item: any, i: number) => {
                             const userAns = exerciseAnswers[`${idx}-${i}`] || "";
                             const isCorrect = userAns.trim().toLowerCase() === (item.answer || "").trim().toLowerCase();
                             
                             return (
                               <div key={`exercise-item-${idx}-${i}`} className="space-y-4">
                                 <div className="text-2xl leading-loose font-medium flex gap-4">
                                   <span className="text-ink/30 font-mono text-sm leading-none mt-4">{i+1}.</span>
                                   <div className="flex-1">
                                      <ReactMarkdown>{isRtl ? (item.textAr || item.text) : item.text}</ReactMarkdown>
                                   </div>
                                 </div>
                                 <div className="flex items-center gap-3">
                                   <input 
                                     type="text" 
                                     value={userAns}
                                     onChange={(e) => handleExerciseInput(idx, i, e.target.value)}
                                     placeholder={isRtl ? "اكتب الإجابة..." : "Type answer..."}
                                     className={`flex-1 max-w-md p-4 bg-cream/30 border-2 rounded-2xl outline-none font-bold transition-all ${
                                       showExerciseValidation 
                                         ? isCorrect ? 'border-correct bg-correct/5 text-correct' : 'border-wrong bg-wrong/5 text-wrong'
                                         : 'border-ink/5 focus:border-amber-accent'
                                     }`}
                                   />
                                   {showExerciseValidation && (
                                     <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                       {isCorrect ? <Check className="text-correct" size={20} /> : <X className="text-wrong" size={20} />}
                                     </motion.div>
                                   )}
                                 </div>
                                 {showExerciseValidation && !isCorrect && (
                                   <p className="text-xs font-bold text-correct">
                                     {isRtl ? `الإجابة الصحيحة: ${item.answer}` : `Correct answer: ${item.answer}`}
                                   </p>
                                 )}
                               </div>
                             );
                           })}
                        </div>
                      )}
                      
                      {ex.type === 'match' && (
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="space-y-4">
                             {ex.items.map((item: any, i: number) => (
                               <div key={`match-left-${idx}-${i}`} className="p-5 bg-ink text-cream rounded-2xl font-bold flex justify-between items-center group cursor-pointer hover:bg-amber-accent transition-colors">
                                 {isRtl ? item.textAr : item.text}
                                 <div className="w-6 h-6 rounded-full border border-cream/20 flex items-center justify-center text-[10px]">{i+1}</div>
                               </div>
                             ))}
                           </div>
                           <div className="space-y-4">
                             {[...ex.items].sort(() => Math.random() - 0.5).map((item: any, i: number) => (
                               <button key={`match-right-${idx}-${i}`} className="w-full text-right p-5 bg-white border-2 border-ink/5 hover:border-amber-accent rounded-2xl font-bold transition-all">
                                 {isRtl ? item.answerAr || item.answer : item.answer}
                                </button>
                             ))}
                           </div>
                         </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white p-10 rounded-[2.5rem] border border-ink/5 shadow-xl">
                  <div className="flex items-center gap-3 mb-10">
                    <PenTool className="text-amber-accent" size={24} />
                    <h3 className="text-2xl font-serif font-black">{isRtl ? 'تحقق من فهمك' : 'Practical Check-up'}</h3>
                  </div>
                  <p className="text-ink/60">{isRtl ? 'لا توجد تمارين إضافية لهذا الدرس، يرجى الانتقال للاختبار.' : 'No additional exercises for this lesson. Please proceed to the quiz.'}</p>
                </div>
              )}
              
              {lesson.exercises && lesson.exercises.length > 0 && (
                <button 
                  onClick={checkExerciseAnswers}
                  className="w-full py-5 bg-oxford-navy text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-amber-accent transition-all shadow-xl hover:-translate-y-1"
                >
                  {isRtl ? 'تحقق من الإجابات' : 'Check Answers'}
                </button>
              )}
            </motion.section>
          )}

          {activeTab === 'quiz' && (
            <motion.section 
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto"
            >
              {!quizFinished && lesson.quiz ? (
                <div className="space-y-10">
                  <div className="flex justify-between items-center bg-white/50 p-4 rounded-3xl border border-ink/5">
                    <div className="flex gap-2">
                      {lesson.quiz.map((_, i) => (
                        <div 
                          key={`quiz-indicator-${i}`} 
                          className={`w-3 h-3 rounded-full transition-all duration-500 ${
                            i === currentQuizIndex ? 'bg-amber-accent w-8' : 
                            i < currentQuizIndex ? 'bg-correct' : 'bg-ink/10'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-mono text-sm font-black text-ink/40">
                      {currentQuizIndex + 1}/{lesson.quiz.length}
                    </span>
                  </div>

                  <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-accent/5 blur-3xl group-hover:bg-amber-accent/10 transition-colors" />
                    
                    <h3 className="text-3xl md:text-4xl font-serif font-black mb-12 leading-tight">
                      {isRtl ? lesson.quiz[currentQuizIndex].questionAr : lesson.quiz[currentQuizIndex].question}
                    </h3>

                    <div className="grid gap-4">
                      {(isRtl ? lesson.quiz[currentQuizIndex].optionsAr : lesson.quiz[currentQuizIndex].options).map((opt, i) => (
                        <button
                          key={`quiz-option-${currentQuizIndex}-${i}`}
                          onClick={() => checkAnswer(i)}
                          disabled={showFeedback}
                          className={`relative group flex items-center justify-between p-6 rounded-3xl border-2 text-lg font-bold transition-all ${
                            showFeedback && i === lesson.quiz![currentQuizIndex].correctIndex
                              ? 'border-correct bg-correct/5 text-correct shadow-[0_0_20px_rgba(30,122,69,0.1)]'
                              : showFeedback && lastQuizResult?.correct === false && i === lesson.quiz![currentQuizIndex].correctIndex // Still show correct one if wrong
                                ? 'border-correct bg-correct/5 text-correct'
                                : showFeedback && i !== lesson.quiz![currentQuizIndex].correctIndex
                                  ? 'border-ink/5 bg-ink/5 opacity-50 grayscale'
                                  : 'border-ink/5 bg-cream/30 hover:border-amber-accent hover:bg-cream hover:shadow-lg'
                          }`}
                        >
                          <span className="flex-1 text-right">{opt}</span>
                          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                            showFeedback && i === lesson.quiz![currentQuizIndex].correctIndex ? 'bg-correct border-correct text-cream' : 'border-ink/10 group-hover:border-amber-accent'
                          }`}>
                            {showFeedback && i === lesson.quiz![currentQuizIndex].correctIndex ? <Check size={16} /> : <span className="text-xs font-mono">{String.fromCharCode(65 + i)}</span>}
                          </div>
                        </button>
                      ))}
                    </div>

                    <AnimatePresence>
                      {showFeedback && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className={`mt-10 p-8 rounded-3xl border-2 flex gap-6 ${lastQuizResult?.correct ? 'bg-correct/5 border-correct text-correct' : 'bg-wrong/5 border-wrong text-wrong'}`}
                        >
                          <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-sm">
                            {lastQuizResult?.correct ? <Check size={24} /> : <X size={24} />}
                          </div>
                          <div>
                            <h4 className="font-black text-xs uppercase tracking-widest mb-2">
                              {lastQuizResult?.correct ? (isRtl ? 'إجابة عبقرية!' : 'Brilliant Answer!') : (isRtl ? 'ليست تماماً...' : 'Not quite...')}
                            </h4>
                            <p className="text-ink leading-relaxed opacity-80">
                              {lastQuizResult?.explanation}
                            </p>
                            <button 
                              onClick={handleNextQuiz}
                              className="mt-6 flex items-center gap-2 py-3 px-8 bg-ink text-cream rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all w-fit"
                            >
                              {currentQuizIndex < lesson.quiz!.length - 1 ? (isRtl ? 'السؤال التالي' : 'Next Question') : (isRtl ? 'عرض النتيجة' : 'View Score')}
                              <ArrowRight size={14} className={isRtl ? "rotate-180" : ""} />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20 px-8 bg-white rounded-[4rem] shadow-2xl border border-ink/5">
                  <div className="w-32 h-32 bg-amber-accent/10 rounded-full flex items-center justify-center mx-auto mb-10 relative">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }} 
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <Award size={64} className="text-amber-accent" />
                    </motion.div>
                    <div className="absolute inset-0 border-4 border-dashed border-amber-accent/30 rounded-full animate-spin-slow" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif font-black mb-6">{isRtl ? 'أحسنت يا بطل!' : 'Lesson Mastered!'}</h2>
                  <p className="text-xl text-ink/60 mb-12 max-w-lg mx-auto leading-relaxed">
                    {isRtl ? `لقد أتممت الدرس بنجاح وحصلت على ${score} من ${lesson.quiz?.length || 0} نقاط. أنت تسير في الطريق الصحيح نحو الإتقان.` : `You've successfully completed the lesson with a score of ${score}/${lesson.quiz?.length || 0}. You are on the fast track to mastery.`}
                  </p>
                  <button 
                    onClick={() => onFinish(score)}
                    className="group py-6 px-16 bg-amber-accent text-white rounded-3xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:shadow-amber-accent/30 hover:-translate-y-2 active:translate-y-0 transition-all flex items-center gap-3 mx-auto"
                  >
                    {isRtl ? 'إكمال المنهج' : 'Back to Curriculum'}
                    <ArrowRight size={20} className={`transition-transform group-hover:translate-x-2 ${isRtl ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </div>

    </div>
  </div>
</div>
  );
};
