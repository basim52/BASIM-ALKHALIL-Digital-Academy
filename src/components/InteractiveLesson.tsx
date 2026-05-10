import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, ChevronDown, Check, X, ArrowRight, Timer, Award, MessageCircle, BookOpen, PenTool, HelpCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Lesson } from '../types';

interface InteractiveLessonProps {
  lesson: Partial<Lesson>;
  isRtl: boolean;
  onFinish: (score?: number) => void;
}

export const InteractiveLesson: React.FC<InteractiveLessonProps> = ({ lesson, isRtl, onFinish }) => {
  const [activeTab, setActiveTab] = useState<'warmup' | 'explanation' | 'exercises' | 'quiz'>('warmup');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);

  const toggleAudio = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setPlaybackProgress(0);
    } else {
      const textToRead = isRtl 
        ? `${lesson.titleAr}. ${lesson.warmup?.missionAr || ''}` 
        : `${lesson.title}. ${lesson.warmup?.mission || ''}`;
      
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = isRtl ? 'ar-SA' : 'en-US';
      utterance.rate = 0.9; // Slightly slower for A1 learners
      
      utterance.onend = () => {
        setIsPlaying(false);
        setPlaybackProgress(100);
      };

      // Mock progress handling
      let startTime = Date.now();
      const estimatedDuration = textToRead.length * 80; // Rough estimate in ms
      const progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const currentProgress = Math.min((elapsed / estimatedDuration) * 100, 99);
        if (!window.speechSynthesis.speaking) {
          clearInterval(progressInterval);
        } else {
          setPlaybackProgress(currentProgress);
        }
      }, 100);

      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => window.speechSynthesis.cancel();
  }, []);
  const [quizFinished, setQuizFinished] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastQuizResult, setLastQuizResult] = useState<{ correct: boolean, explanation: string } | null>(null);

  const tabs = [
    { id: 'warmup', label: isRtl ? 'التهيئة' : 'Warm-Up', icon: <BookOpen size={18} /> },
    { id: 'explanation', label: isRtl ? 'الشرح' : 'Explanation', icon: <MessageCircle size={18} /> },
    { id: 'exercises', label: isRtl ? 'تمارين' : 'Exercises', icon: <PenTool size={18} /> },
    { id: 'quiz', label: isRtl ? 'اختبار' : 'Quiz', icon: <HelpCircle size={18} /> },
  ];

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

  // Content processing for "Grammar" view
  // In a real app we might parse the markdown to generate accordions, 
  // but for now we'll render the markdown and provide specialized blocks if text includes markers
  
  return (
    <div className={`min-h-screen bg-cream text-ink font-sans selection:bg-amber-accent/20 ${isRtl ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <header className="pt-12 pb-6 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-amber-accent/10 text-amber-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-accent/20">
                {isRtl ? 'المستوى' : 'Level'} {lesson.proficiencyLevel || 'B1'}
              </span>
              <span className="bg-ink/5 text-ink/60 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                {isRtl ? '١٥ دقيقة' : '15 min read'}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-black leading-tight tracking-tight max-w-3xl">
              {isRtl ? lesson.titleAr : lesson.title}
            </h1>
          </div>
          <div className="hidden lg:block">
            <div className="w-24 h-24 rounded-full border-4 border-amber-accent/20 flex items-center justify-center relative">
              <span className="font-mono text-2xl font-black text-amber-accent">
                {score}/{lesson.quiz?.length || 0}
              </span>
              <Award className="absolute -bottom-2 -right-2 text-amber-accent bg-cream p-1 rounded-full border border-amber-accent/20" size={24} />
            </div>
          </div>
        </div>
      </header>

      {/* Sticky Progress & Timer */}
      <div className="sticky top-0 z-50 bg-cream/80 backdrop-blur-xl border-b border-ink/5">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-4 flex items-center gap-6">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-ink text-cream flex items-center justify-center hover:bg-amber-accent transition-colors shadow-lg"
          >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} className={isRtl ? "rotate-180" : ""} fill="currentColor" />}
          </button>
          <div className="flex-1 h-3 bg-ink/10 rounded-full overflow-hidden relative">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-amber-accent h-full"
              initial={{ width: 0 }}
              animate={{ width: `${playbackProgress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="font-mono text-lg font-black tabular-nums tracking-tighter text-ink/40">
            {Math.floor(playbackProgress)}%
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="max-w-5xl mx-auto px-4 md:px-8 overflow-x-auto">
          <div className="flex gap-1 py-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-t-2xl transition-all relative font-black text-xs uppercase tracking-widest whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-cream text-amber-accent' 
                    : 'text-ink/40 hover:text-ink/80 hover:bg-ink/5'
                }`}
              >
                {tab.icon}
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-amber-accent"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 md:px-8 py-12 pb-32">
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
                    onClick={toggleAudio}
                    className="w-12 h-12 rounded-xl bg-amber-accent flex items-center justify-center text-white hover:scale-105 transition-transform"
                  >
                    {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                  </button>
                  <div className="flex-1">
                    <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-accent transition-all duration-300" 
                        style={{ width: `${playbackProgress}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] font-black uppercase tracking-widest text-cream/40">
                      <span>{isPlaying ? 'Playing...' : '0:00'}</span>
                      <span>{isRtl ? 'استمع للمقدمة العلمية' : 'Listen to Academic Intro'}</span>
                      <span>{isRtl ? 'صوت ذكاء اصطناعي' : 'AI Voice'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {(isRtl ? (lesson.warmup?.objectivesAr || []) : (lesson.warmup?.objectives || [])).map((obj, i) => (
                  <div key={i} className="bg-white/50 border border-ink/5 p-8 rounded-3xl hover:border-amber-accent/30 transition-all group">
                    <div className="w-12 h-12 bg-cream border border-ink/5 rounded-2xl flex items-center justify-center text-amber-accent mb-6 font-mono text-xl font-black group-hover:scale-110 transition-transform">
                      0{i+1}
                    </div>
                    <h3 className="text-xl font-bold mb-4 font-serif">{isRtl ? `الهدف رقم ${i+1}` : `Objective 0${i+1}`}</h3>
                    <p className="text-ink/60 leading-relaxed">
                      {obj}
                    </p>
                  </div>
                ))}
                {(!lesson.warmup?.objectives) && [1, 2, 3].map(i => (
                  <div key={i} className="bg-white/50 border border-ink/5 p-8 rounded-3xl hover:border-amber-accent/30 transition-all group">
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
              <div className="markdown-body prose prose-lg max-w-none 
                prose-headings:font-serif prose-headings:font-black prose-headings:text-ink
                prose-p:text-ink/70 prose-p:leading-relaxed
                prose-strong:text-amber-accent prose-strong:font-black
                prose-blockquote:border-l-4 prose-blockquote:border-amber-accent prose-blockquote:bg-amber-accent/5 prose-blockquote:py-2 prose-blockquote:rounded-r-2xl
              ">
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
                  <div key={idx} className="bg-white p-10 rounded-[2.5rem] border border-ink/5 shadow-xl">
                    <div className="flex items-center gap-3 mb-10">
                      <PenTool className="text-amber-accent" size={24} />
                      <h3 className="text-2xl font-serif font-black">{isRtl ? ex.instructionAr : ex.instruction}</h3>
                    </div>

                    <div className="space-y-10">
                      {ex.type === 'fill' && (
                        <div className="space-y-6">
                           {ex.items.map((item: any, i: number) => (
                             <div key={i} className="text-2xl leading-loose font-medium">
                               <span className="text-ink/30 mr-4 font-mono text-sm leading-none">{i+1}.</span>
                               {isRtl ? item.textAr : item.text}
                             </div>
                           ))}
                           <div className="mt-8 p-6 bg-cream rounded-2xl border border-dashed border-ink/10">
                             <p className="text-xs font-black uppercase tracking-widest text-ink/40 mb-4">{isRtl ? 'اكتب إجابتك هنا:' : 'Type your answers:'}</p>
                             <div className="flex flex-wrap gap-4">
                               {ex.items.map((_: any, i: number) => (
                                 <input 
                                   key={i}
                                   type="text" 
                                   placeholder={`(${i+1})`}
                                   className="w-32 p-3 bg-white border border-ink/10 rounded-xl focus:border-amber-accent outline-none font-bold"
                                 />
                               ))}
                             </div>
                           </div>
                        </div>
                      )}
                      
                      {ex.type === 'match' && (
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="space-y-4">
                             {ex.items.map((item: any, i: number) => (
                               <div key={i} className="p-5 bg-ink text-cream rounded-2xl font-bold flex justify-between items-center group cursor-pointer hover:bg-amber-accent transition-colors">
                                 {isRtl ? item.textAr : item.text}
                                 <div className="w-6 h-6 rounded-full border border-cream/20 flex items-center justify-center text-[10px]">{i+1}</div>
                               </div>
                             ))}
                           </div>
                           <div className="space-y-4">
                             {[...ex.items].sort(() => Math.random() - 0.5).map((item: any, i: number) => (
                               <button key={i} className="w-full text-right p-5 bg-white border-2 border-ink/5 hover:border-amber-accent rounded-2xl font-bold transition-all">
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
                <button className="w-full py-5 bg-ink text-cream rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-amber-accent transition-all shadow-xl hover:-translate-y-1">
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
                          key={i} 
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
                          key={i}
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
      </main>

      {/* Quick Navigation Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 pointer-events-none z-40 bg-gradient-to-t from-cream via-cream/80 to-transparent">
        <div className="max-w-5xl mx-auto flex justify-end pointer-events-auto">
          <button className="bg-ink text-cream w-16 h-16 rounded-full shadow-2xl hover:bg-amber-accent transition-all flex items-center justify-center group">
            <MessageCircle className="group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </footer>
    </div>
  );
};
