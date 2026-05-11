import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  Volume2, 
  Lightbulb, 
  BookOpen, 
  Layers, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  X,
  Check,
  Star,
  Trophy
} from 'lucide-react';
import { Lesson } from '../types';

interface ReadingLessonProps {
  lesson: Partial<Lesson>;
  isRtl: boolean;
  onFinish: (score?: number) => void;
}

type TabType = 'warmup' | 'reading' | 'vocabulary' | 'comprehension';

export const ReadingLesson: React.FC<ReadingLessonProps> = ({ lesson, isRtl, onFinish }) => {
  const [activeTab, setActiveTab] = useState<TabType>('warmup');
  const [isPlaying, setIsPlaying] = useState<string | null>(null); // paragraph index or null
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastQuizResult, setLastQuizResult] = useState<{ correct: boolean, explanation: string } | null>(null);

  const synthesis = typeof window !== 'undefined' ? window.speechSynthesis : null;

  const stopSpeaking = () => {
    if (synthesis) {
      synthesis.cancel();
      setIsPlaying(null);
    }
  };

  const speak = (text: string, lang: 'en' | 'ar', id: string) => {
    if (!synthesis) return;

    if (isPlaying === id) {
      stopSpeaking();
      return;
    }

    stopSpeaking();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'en' ? 'en-US' : 'ar-SA';
    utterance.rate = 0.9;
    
    utterance.onend = () => {
      setIsPlaying(null);
    };

    utterance.onerror = () => {
      setIsPlaying(null);
    };

    setIsPlaying(id);
    synthesis.speak(utterance);
  };

  useEffect(() => {
    return () => {
      if (synthesis) synthesis.cancel();
    };
  }, [synthesis]);

  const tabs = [
    { id: 'warmup', label: isRtl ? 'التهيئة' : 'Warm-Up', icon: <Lightbulb size={20} /> },
    { id: 'reading', label: isRtl ? 'النص المقروء' : 'The Text', icon: <BookOpen size={20} /> },
    { id: 'vocabulary', label: isRtl ? 'المفردات' : 'Vocabulary', icon: <Layers size={20} /> },
    { id: 'comprehension', label: isRtl ? 'الفهم والاستيعاب' : 'Comprehension', icon: <CheckCircle2 size={20} /> },
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

  return (
    <div className={`min-h-screen bg-cream text-ink font-sans selection:bg-amber-accent/20 ${isRtl ? 'rtl' : 'ltr'}`}>
      {/* Header Section (Based on Image Styling) */}
      <header className="bg-oxford-navy text-cream pt-16 pb-24 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-accent/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="bg-oxford-gold text-oxford-navy px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest leading-none">
              {isRtl ? 'منهج القراءة' : 'Reading Curriculum'}
            </span>
            <span className="bg-white/10 text-cream/80 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest leading-none border border-white/10">
              {lesson.proficiencyLevel || 'A1'}
            </span>
            <span className="bg-white/10 text-cream/80 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest leading-none border border-white/10">
              {isRtl ? '٣٠ دقيقة' : '30 min lesson'}
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black leading-tight tracking-tight">
              {isRtl ? `منهج القراءة — ${lesson.titleAr}` : `Reading Curriculum — ${lesson.title}`}
            </h1>
            <div className="flex gap-2">
              <button 
                onClick={() => speak(isRtl ? lesson.titleAr || '' : lesson.title || '', isRtl ? 'ar' : 'en', 'title-audio')}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isPlaying === 'title-audio' ? 'bg-amber-accent text-white scale-110 shadow-lg' : 'bg-white/10 text-cream hover:bg-amber-accent hover:scale-110'}`}
              >
                {isPlaying === 'title-audio' ? <Pause size={18} /> : <Volume2 size={18} />}
              </button>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <p className="text-oxford-gold/80 font-medium text-lg md:text-xl max-w-2xl font-tajawal">
              {isRtl ? lesson.warmup?.missionAr : lesson.warmup?.mission}
            </p>
            <button 
              onClick={() => speak(isRtl ? lesson.warmup?.missionAr || '' : lesson.warmup?.mission || '', isRtl ? 'ar' : 'en', 'mission-audio')}
              className={`mt-1 hover:text-amber-accent transition-colors ${isPlaying === 'mission-audio' ? 'text-amber-accent' : 'text-oxford-gold/40'}`}
            >
              <Volume2 size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area with Beige Container */}
      <div className="max-w-5xl mx-auto -mt-12 mb-20 px-4 md:px-8 relative z-20">
        <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(26,18,9,0.05)] border border-oxford-navy/5 overflow-hidden">
          
          {/* Custom Tabs */}
          <div className="flex border-b border-oxford-navy/5 overflow-x-auto no-scrollbar bg-cream/30">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-6 px-4 transition-all relative font-black text-xs uppercase tracking-widest ${
                  activeTab === tab.id 
                    ? 'text-amber-accent bg-white' 
                    : 'text-oxford-navy/40 hover:text-oxford-navy/80 hover:bg-white/50'
                }`}
              >
                <div className={`p-1.5 rounded-lg transition-colors ${activeTab === tab.id ? 'bg-amber-accent/10 text-amber-accent' : 'bg-transparent text-oxford-navy/40'}`}>
                  {tab.icon}
                </div>
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="readingTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-amber-accent"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="p-8 md:p-12 lg:p-16 min-h-[500px]">
            <AnimatePresence mode="wait">
              {/* WARM-UP TAB */}
              {activeTab === 'warmup' && (
                <motion.div 
                  key="warmup"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-amber-accent/10 flex items-center justify-center text-amber-accent">
                      <Lightbulb size={32} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-serif font-black">{isRtl ? 'التهيئة الذهنية' : 'Warm-Up'}</h2>
                      <p className="text-oxford-navy/50 font-tajawal">{isRtl ? 'نشط عقلك قبل أن نبدأ' : 'Activate your thinking before we study'}</p>
                    </div>
                  </div>

                  <div className="bg-cream/50 rounded-3xl p-8 border-l-8 border-oxford-gold hover:translate-y-[-4px] transition-transform shadow-sm">
                    <p className="text-xl md:text-2xl leading-relaxed text-oxford-navy font-medium italic mb-6">
                      {isRtl ? 'فكر في هذا الأمر: ' : 'Think about it: '}
                      {isRtl ? 'كم مرة تقرأ باللغة الإنجليزية في يومك المعتاد؟ هل تلاحظ كيف ترتبط الكلمات ببعضها البعض؟' : 'How often do you read in English in your typical day? Do you notice how words connect to each other?'}
                    </p>
                    <button 
                      onClick={() => speak(isRtl ? 'فكر في هذا الأمر: كم مرة تقرأ باللغة الإنجليزية في يومك المعتاد؟ هل تلاحظ كيف ترتبط الكلمات ببعضها البعض؟' : 'Think about it: How often do you read in English in your typical day? Do you notice how words connect to each other?', isRtl ? 'ar' : 'en', 'warmup-text')}
                      className="flex items-center gap-2 bg-oxford-navy text-white px-5 py-3 rounded-xl font-bold hover:bg-amber-accent transition-colors"
                    >
                      {isPlaying === 'warmup-text' ? <Pause size={18} /> : <Volume2 size={18} />}
                      {isRtl ? 'استمع للسؤال' : 'Listen to Question'}
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-lg font-black uppercase tracking-widest text-oxford-gold">{isRtl ? 'أهداف الدرس' : 'Lesson Objectives'}</h3>
                      <ul className="space-y-3">
                        {(isRtl ? lesson.warmup?.objectivesAr : lesson.warmup?.objectives)?.map((obj, i) => (
                          <li key={i} className="flex items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-oxford-navy/5 shadow-sm group hover:border-oxford-gold transition-colors">
                            <div className="flex items-start gap-3">
                              <CheckCircle2 className="mt-1 text-oxford-gold group-hover:scale-110 transition-transform" size={20} />
                              <span className="font-medium text-oxford-navy/80">{obj}</span>
                            </div>
                            <button 
                              onClick={() => speak(obj, isRtl ? 'ar' : 'en', `objective-${i}`)}
                              className={`p-2 rounded-lg transition-all ${isPlaying === `objective-${i}` ? 'bg-amber-accent text-white' : 'text-oxford-navy/20 hover:text-amber-accent hover:bg-amber-accent/10'}`}
                            >
                              <Volume2 size={16} />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-oxford-navy p-8 rounded-3xl text-cream flex flex-col justify-center">
                      <Star className="text-oxford-gold mb-4" size={32} />
                      <h4 className="text-xl font-serif font-black mb-2">{isRtl ? 'التحدي اليومي' : 'Daily Challenge'}</h4>
                      <p className="text-cream/70 leading-relaxed font-tajawal">
                        {isRtl ? 'حاول قراءة النص بذكاء، لا تركز على كل حرف بل ابحث عن المعنى العام أولاً.' : 'Try to read the text intelligently. Don\'t focus on every single letter; look for the general meaning first.'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* READING TEXT TAB */}
              {activeTab === 'reading' && (
                <motion.div 
                  key="reading"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-oxford-navy/5">
                    <div>
                      <h2 className="text-3xl font-serif font-black mb-2">{isRtl ? 'النص القرائي' : 'The Reading Passage'}</h2>
                      <p className="text-oxford-navy/50 font-tajawal">{isRtl ? 'اقرأ واستمع بدقة' : 'Read and listen carefully'}</p>
                    </div>
                    <div className="flex gap-2">
                       <button 
                         onClick={() => speak(lesson.readingText?.paragraphs.map(p => p.en).join(' ') || '', 'en', 'read-all-en')}
                         className="flex items-center gap-2 bg-oxford-navy text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-amber-accent transition-colors"
                       >
                         {isPlaying === 'read-all-en' ? <Pause size={14} /> : <Volume2 size={14} />}
                         {isRtl ? 'استمع للنص كاملاً (EN)' : 'Play Full Audio (EN)'}
                       </button>
                    </div>
                  </div>

                  <div className="space-y-16">
                    {lesson.readingText?.paragraphs.map((para, idx) => (
                      <div key={idx} className="group relative">
                        {/* English Part */}
                        <div className={`p-8 md:p-10 rounded-t-3xl border-2 transition-all ${isPlaying === `para-en-${idx}` ? 'bg-amber-accent/5 border-amber-accent' : 'bg-white border-oxford-navy/5'}`}>
                          <div className="flex justify-between items-start gap-4 mb-6">
                            <span className="font-mono text-oxford-gold font-black bg-oxford-navy/5 px-3 py-1 rounded-lg text-sm">{(idx + 1).toString().padStart(2, '0')}</span>
                            <button 
                              onClick={() => speak(para.en, 'en', `para-en-${idx}`)}
                              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isPlaying === `para-en-${idx}` ? 'bg-amber-accent text-white' : 'bg-oxford-navy text-white hover:bg-amber-accent hover:scale-110'}`}
                            >
                              {isPlaying === `para-en-${idx}` ? <Pause size={20} /> : <Volume2 size={20} />}
                            </button>
                          </div>
                          <p className="text-xl md:text-2xl leading-[1.8] font-roboto font-medium text-oxford-navy selection:bg-amber-accent/10">
                            {para.en}
                          </p>
                        </div>

                        {/* Arabic Translation (Subtle) */}
                        <div className={`p-8 md:p-10 rounded-b-3xl border-2 border-t-0 transition-all ${isPlaying === `para-ar-${idx}` ? 'bg-oxford-gold/5 border-oxford-gold' : 'bg-cream/20 border-oxford-navy/5'}`}>
                           <div className="flex justify-start mb-4">
                              <button 
                                onClick={() => speak(para.ar, 'ar', `para-ar-${idx}`)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-tajawal font-bold text-sm transition-all ${isPlaying === `para-ar-${idx}` ? 'bg-oxford-gold text-oxford-navy' : 'text-oxford-navy/40 hover:text-oxford-gold hover:bg-oxford-gold/10'}`}
                              >
                                {isPlaying === `para-ar-${idx}` ? <Pause size={14} /> : <Volume2 size={14} />}
                                {isRtl ? 'استمع للترجمة' : 'Listen to Arabic'}
                              </button>
                           </div>
                           <p className="text-lg md:text-xl leading-relaxed font-tajawal text-oxford-navy/60">
                             {para.ar}
                           </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* VOCABULARY TAB */}
              {activeTab === 'vocabulary' && (
                <motion.div 
                  key="vocabulary"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                  <div className="pb-8 border-b border-oxford-navy/5">
                    <h2 className="text-3xl font-serif font-black mb-2">{isRtl ? 'قاموس المصطلحات' : 'Vocabulary Bank'}</h2>
                    <p className="text-oxford-navy/50 font-tajawal">{isRtl ? 'كلمات جديدة وأمثلة تطبيقية' : 'New words and active examples'}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                    {lesson.vocabulary?.map((vocab, vIdx) => (
                      <div key={vIdx} className="bg-white border-2 border-oxford-navy/5 rounded-[2rem] p-8 hover:border-amber-accent transition-all group shadow-sm hover:shadow-xl">
                        <div className="flex justify-between items-start mb-6">
                           <div className="w-14 h-14 rounded-2xl bg-oxford-navy text-oxford-gold flex items-center justify-center group-hover:bg-amber-accent group-hover:text-white transition-all shadow-lg">
                             <Layers size={28} />
                           </div>
                           <button 
                             onClick={() => speak(vocab.word, 'en', `vocab-${vIdx}`)}
                             className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isPlaying === `vocab-${vIdx}` ? 'bg-amber-accent text-white' : 'bg-oxford-navy/5 text-oxford-navy hover:bg-amber-accent hover:text-white'}`}
                           >
                             {isPlaying === `vocab-${vIdx}` ? <Pause size={18} /> : <Volume2 size={18} />}
                           </button>
                        </div>

                        <div className="space-y-4">
                           <div>
                             <h3 className="text-2xl font-black font-roboto text-oxford-navy flex items-center gap-3">
                               {vocab.word}
                               <span className="text-oxford-navy/30 text-sm font-mono font-medium">/{vocab.phonetic}/</span>
                             </h3>
                             <p className="text-xl font-tajawal text-oxford-gold font-black mt-1">{vocab.meaningAr}</p>
                           </div>

                           <div className="p-5 bg-cream/50 rounded-2xl border border-dashed border-oxford-navy/10 mt-6 overflow-hidden relative">
                              <p className="text-xs font-black uppercase tracking-[0.2em] text-oxford-navy/30 mb-4">{isRtl ? 'مثال تطبيقي' : 'Context Sentence'}</p>
                              <p className="text-lg font-medium text-oxford-navy/80 italic font-roboto leading-relaxed">
                                "{vocab.example}"
                              </p>
                              <button 
                                onClick={() => speak(vocab.example, 'en', `vocab-ex-${vIdx}`)}
                                className="absolute right-4 bottom-4 w-8 h-8 rounded-lg bg-oxford-navy/5 text-oxford-navy hover:bg-amber-accent hover:text-white flex items-center justify-center transition-all"
                              >
                                <Volume2 size={14} />
                              </button>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* COMPREHENSION TAB */}
              {activeTab === 'comprehension' && (
                <motion.div 
                  key="comprehension"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="max-w-3xl mx-auto"
                >
                  {!quizFinished && lesson.quiz ? (
                    <div className="space-y-12">
                      <div className="flex items-center justify-between gap-6 bg-oxford-navy text-cream p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-2 bg-oxford-gold" />
                        <div>
                          <h2 className="text-2xl font-serif font-black">{isRtl ? 'اختبار الفهم' : 'Comprehension Check'}</h2>
                          <p className="text-oxford-gold/80 font-black text-xs uppercase tracking-widest mt-1">
                            {isRtl ? 'أثبت أنك عبقري بالقراءة' : 'Prove your reading mastery'}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="block text-oxford-gold text-2xl font-black font-mono">{(currentQuizIndex + 1).toString().padStart(2, '0')}</span>
                          <span className="block text-cream/40 text-[10px] font-black uppercase tracking-widest leading-none">
                            {isRtl ? `من أصل ${lesson.quiz.length}` : `of ${lesson.quiz.length}`}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-10 px-4">
                        <h3 className="text-2xl md:text-3xl font-serif font-black leading-tight text-oxford-navy">
                          {isRtl ? lesson.quiz[currentQuizIndex].questionAr : lesson.quiz[currentQuizIndex].question}
                        </h3>

                        <div className="grid gap-4">
                          {(isRtl ? lesson.quiz[currentQuizIndex].optionsAr : lesson.quiz[currentQuizIndex].options).map((opt, i) => (
                            <button
                              key={i}
                              onClick={() => checkAnswer(i)}
                              disabled={showFeedback}
                              className={`group text-right flex items-center justify-between p-6 rounded-3xl border-2 text-lg font-bold transition-all ${
                                showFeedback && i === lesson.quiz![currentQuizIndex].correctIndex
                                  ? 'border-correct bg-correct/5 text-correct'
                                  : showFeedback && lastQuizResult?.correct === false && i === lesson.quiz![currentQuizIndex].correctIndex
                                    ? 'border-correct bg-correct/5 text-correct'
                                    : showFeedback && i !== lesson.quiz![currentQuizIndex].correctIndex
                                      ? 'border-oxford-navy/5 bg-cream/20 opacity-40'
                                      : 'border-oxford-navy/5 bg-white hover:border-amber-accent hover:shadow-xl'
                              }`}
                            >
                              <span className="flex-1 font-tajawal">{opt}</span>
                              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                                showFeedback && i === lesson.quiz![currentQuizIndex].correctIndex ? 'bg-correct border-correct text-cream' : 'border-oxford-navy/10 group-hover:border-amber-accent'
                              }`}>
                                {showFeedback && i === lesson.quiz![currentQuizIndex].correctIndex ? <Check size={16} /> : <span className="text-xs font-mono">{String.fromCharCode(65 + i)}</span>}
                              </div>
                            </button>
                          ))}
                        </div>

                        <AnimatePresence>
                          {showFeedback && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`p-8 rounded-[2rem] border-2 flex gap-6 ${lastQuizResult?.correct ? 'bg-correct/5 border-correct text-correct shadow-[0_10px_30px_rgba(30,122,69,0.1)]' : 'bg-wrong/5 border-wrong text-wrong'}`}
                            >
                              <div className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center bg-white shadow-sm">
                                {lastQuizResult?.correct ? <CheckCircle2 size={24} /> : <X size={24} />}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-black text-xs uppercase tracking-widest mb-2">
                                  {lastQuizResult?.correct ? (isRtl ? 'أحسنت القراءة!' : 'Great Reading!') : (isRtl ? 'حاول مرة أخرى...' : 'Try thinking again...')}
                                </h4>
                                <p className="text-oxford-navy leading-relaxed font-tajawal font-medium">
                                  {lastQuizResult?.explanation}
                                </p>
                                <button 
                                  onClick={handleNextQuiz}
                                  className="mt-6 flex items-center gap-2 py-4 px-10 bg-oxford-navy text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-amber-accent hover:shadow-xl hover:-translate-y-1 transition-all"
                                >
                                  {currentQuizIndex < lesson.quiz!.length - 1 ? (isRtl ? 'السؤال التالي' : 'Next Question') : (isRtl ? 'عرض النتيجة النهائية' : 'View Score')}
                                  {isRtl ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-20 px-12 bg-oxford-navy text-cream rounded-[3rem] shadow-2xl relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-oxford-gold/10 blur-[100px] rounded-full" />
                       <div className="w-32 h-32 bg-oxford-gold rounded-full flex items-center justify-center mx-auto mb-10 relative shadow-[0_0_50px_rgba(196,158,58,0.3)]">
                          <Trophy size={64} className="text-oxford-navy" />
                       </div>
                       <h2 className="text-4xl md:text-5xl font-serif font-black mb-6 leading-tight">{isRtl ? 'خبير القراءة!' : 'Reading Expert!'}</h2>
                       <p className="text-xl text-cream/70 mb-12 max-w-lg mx-auto leading-relaxed font-tajawal">
                         {isRtl ? `درجة رائعة: ${score} من ${lesson.quiz?.length || 0}. لقد أثبت أنك تستطيع استخلاص المعاني بدقة متناهية.` : `Impressive Score: ${score}/${lesson.quiz?.length || 0}. You've proven your ability to extract meaning with surgical precision.`}
                       </p>
                       <button 
                         onClick={() => onFinish(score)}
                         className="group py-6 px-16 bg-oxford-gold text-oxford-navy rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-white transition-all flex items-center gap-3 mx-auto"
                       >
                         {isRtl ? 'عودة للمسار التعليمي' : 'Back to Journey'}
                         {isRtl ? <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-2" /> : <ChevronRight size={20} className="transition-transform group-hover:translate-x-2" />}
                       </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Navigation Footer for Scrolling UX */}
      <footer className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-2 p-2 bg-oxford-navy/90 backdrop-blur-md rounded-full shadow-2xl border border-white/10">
         {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${activeTab === tab.id ? 'bg-oxford-gold text-oxford-navy scale-110 shadow-lg' : 'text-cream/50 hover:text-cream'}`}
            >
              {tab.icon}
            </button>
         ))}
      </footer>
    </div>
  );
};
