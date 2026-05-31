import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Search, 
  Volume2, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  HelpCircle, 
  Award, 
  Heart,
  Lightbulb,
  CheckCircle2, 
  Play, 
  Info,
  Layers,
  Flame,
  Star,
  Check,
  X
} from 'lucide-react';
import { VISUAL_DICTIONARY, DictionaryItem, DictionaryCategory } from '../data/visualDictionary';
import { UserProfile } from '../types';

interface VisualDictionaryProps {
  lang: 'ar' | 'en';
  userProfile: UserProfile | null;
  onBack: () => void;
  onXPAdded?: (xp: number) => void;
}

export const VisualDictionary: React.FC<VisualDictionaryProps> = ({
  lang,
  userProfile,
  onBack,
  onXPAdded
}) => {
  const isRtl = lang === 'ar';

  const [activeCategory, setActiveCategory] = useState<string>('house');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<DictionaryItem | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
  
  // Game state
  const [interactionMode, setInteractionMode] = useState<'browse' | 'quiz'>('browse');
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizQuestions, setQuizQuestions] = useState<Array<{
    correctAnswer: DictionaryItem;
    allOptions: string[];
    userAnswer: string | null;
    isCorrect: boolean | null;
  }>>([]);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Filter dictionary items by category & search
  const categoryData = VISUAL_DICTIONARY.find(cat => cat.id === activeCategory) || VISUAL_DICTIONARY[0];
  const pageItems = categoryData.items.filter(item => {
    const q = searchQuery.toLowerCase();
    return item.word.toLowerCase().includes(q) || item.meaning_ar.includes(q);
  });

  // Browser Sound Speech Synthesizer
  const speakWordOrSentence = (text: string, id: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.82; // Kid-friendly pace

      const voices = window.speechSynthesis.getVoices();
      const EnglishVoice = voices.find(v => v.lang.startsWith('en'));
      if (EnglishVoice) utterance.voice = EnglishVoice;

      utterance.onstart = () => setIsSpeaking(id);
      utterance.onend = () => setIsSpeaking(null);
      utterance.onerror = () => setIsSpeaking(null);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  // Setup / Reset the Vocabulary Quiz
  const startCategoryQuiz = () => {
    const currentItems = [...categoryData.items];
    if (currentItems.length < 3) return;

    // Create 5 random questions
    const selectedQuestions = [];
    const shuffled = [...currentItems].sort(() => 0.5 - Math.random());
    const limit = Math.min(5, shuffled.length);

    for (let i = 0; i < limit; i++) {
      const correct = shuffled[i];
      // get 2 random wrong options from either same or other categories
      const wrongPool = VISUAL_DICTIONARY.flatMap(c => c.items)
        .filter(item => item.word !== correct.word);
      const shuffledWrong = wrongPool.sort(() => 0.5 - Math.random()).slice(0, 2);
      
      const options = [correct.meaning_ar, ...shuffledWrong.map(w => w.meaning_ar)]
        .sort(() => 0.5 - Math.random());

      selectedQuestions.push({
        correctAnswer: correct,
        allOptions: options,
        userAnswer: null,
        isCorrect: null
      });
    }

    setQuizQuestions(selectedQuestions);
    setQuizIndex(0);
    setQuizScore(0);
    setQuizFinished(false);
    setInteractionMode('quiz');
  };

  const handleSelectQuizAnswer = (opt: string) => {
    if (quizQuestions[quizIndex].userAnswer !== null) return; // Answer locked

    const updated = [...quizQuestions];
    const curQ = updated[quizIndex];
    curQ.userAnswer = opt;
    curQ.isCorrect = opt === curQ.correctAnswer.meaning_ar;
    
    if (curQ.isCorrect) {
      setQuizScore(prev => prev + 1);
    }
    
    setQuizQuestions(updated);

    // Speak the English word out loud so they connect sound with meaning
    speakWordOrSentence(curQ.correctAnswer.word, `quiz_${quizIndex}`);
  };

  const nextQuizQuestion = () => {
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
      // Award XP
      const wonXP = quizScore * 10;
      if (wonXP > 0 && onXPAdded) {
        onXPAdded(wonXP);
      }
    }
  };

  // Pre-select first item on category change
  useEffect(() => {
    if (categoryData.items.length > 0) {
      setSelectedItem(categoryData.items[0]);
    }
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-[#FAF9F5] pb-24 text-slate-800">
      
      {/* Decorative Pastel Arch */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#FFF5DE] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 pt-6 relative z-10">

        {/* Header Breadcrumbs */}
        <div className={`flex flex-col md:flex-row justify-between items-center gap-4 mb-8 pb-4 border-b border-orange-100 ${isRtl ? 'md:flex-row-reverse text-right' : 'text-left'}`}>
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-500/10 shrink-0">
              <BookOpen size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-[#002147] tracking-tight">
                {isRtl ? 'القاموس المصور للأطفال 🎨' : 'Kids Illustrated Dictionary 🎨'}
              </h1>
              <p className="text-xs text-amber-700 font-bold tracking-widest mt-0.5">
                {isRtl ? 'افهم معاني الكلمات بصور كرتونية، استمع للنطق واختبر ذاكرتك' : 'Learn kitchen, room & house words in clean cartoon graphics'}
              </p>
            </div>
          </div>

          <button
            onClick={onBack}
            className={`flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-black text-xs transition-all cursor-pointer ${isRtl ? 'flex-row-reverse' : ''}`}
          >
            <span>{isRtl ? 'العودة للمنصة ↩️' : 'Back to Academy ↩️'}</span>
          </button>
        </div>

        {/* Selection Category Tabs Bar */}
        <div className="flex items-center justify-between gap-4 flex-wrap mb-6 bg-white p-3 rounded-2xl border border-amber-100/60 shadow-xs">
          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
            {VISUAL_DICTIONARY.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setInteractionMode('browse');
                  }}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs shrink-0 transition-all flex items-center gap-2 cursor-pointer ${
                    isActive 
                      ? 'bg-amber-500 text-white shadow-md shadow-amber-500/15' 
                      : 'bg-[#fafafa] text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-sm">{cat.emoji}</span>
                  <span>{isRtl ? cat.name_ar : cat.name_en}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (interactionMode === 'browse') {
                  startCategoryQuiz();
                } else {
                  setInteractionMode('browse');
                }
              }}
              className={`px-4 py-2.5 rounded-xl font-black text-xs transition-all flex items-center gap-2 cursor-pointer border ${
                interactionMode === 'quiz'
                  ? 'bg-red-50 text-red-700 border-red-200'
                  : 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/10 hover:bg-indigo-700'
              }`}
            >
              <Lightbulb size={14} className={interactionMode === 'browse' ? 'animate-pulse' : ''} />
              <span>
                {interactionMode === 'quiz' 
                  ? (isRtl ? 'تصفح الكلمات 📖' : 'Browse Words 📖') 
                  : (isRtl ? 'ابدأ غاز الكلمات 🎯' : 'Spelling Game 🎯')}
              </span>
            </button>
          </div>
        </div>

        {interactionMode === 'browse' ? (
          /* =======================================
             BROWSE MODE: CARDS AND DETAILED SPLIT 
             ======================================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left sidebar: List of words matching search */}
            <div className="col-span-1 lg:col-span-4 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
                
                {/* Word search bar */}
                <div className="relative">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isRtl ? 'ابحث عن كلمة بالإنجليزية أو العربية...' : 'Search animal or room items...'}
                    className={`w-full bg-slate-50 rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold border-0 focus:ring-2 focus:ring-amber-400 focus:bg-white outline-hidden ${
                      isRtl ? 'text-right' : 'text-left'
                    }`}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 border-b pb-2">
                  <span>{isRtl ? 'قائمة المفردات المتوفرة' : 'VOCABULARY ITEMS'}</span>
                  <span>{pageItems.length} {isRtl ? 'مفردة' : 'words'}</span>
                </div>

                {/* Vertical scroll list */}
                <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1 scrollbar-thin">
                  {pageItems.length === 0 ? (
                    <div className="text-center py-10 space-y-2 text-slate-400">
                      <p className="text-xs font-bold">{isRtl ? 'لا توجد كلمات مطابقة لبحثك' : 'No vocabulary matching search'}</p>
                    </div>
                  ) : (
                    pageItems.map((item) => {
                      const isSelected = selectedItem?.word === item.word;
                      return (
                        <button
                          key={item.word}
                          onClick={() => setSelectedItem(item)}
                          className={`w-full text-left p-3 rounded-xl border flex items-center justify-between gap-3 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#002147] border-[#002147] text-[#C49E3A] shadow-md scale-[1.02]'
                              : 'bg-white border-slate-150 hover:bg-slate-50 text-slate-700'
                          } ${isRtl ? 'flex-row-reverse text-right' : ''}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl bg-slate-100 p-1.5 rounded-lg text-slate-700 shrink-0">{item.emoji}</span>
                            <div>
                              <h4 className="font-sans font-black text-sm capitalize">{item.word}</h4>
                              <p className={`text-[10px] font-semibold text-slate-400 ${isSelected ? 'text-slate-300' : ''}`}>
                                {item.meaning_ar}
                              </p>
                            </div>
                          </div>
                          
                          <ChevronRight size={14} className={`${isSelected ? 'text-[#C49E3A]' : 'text-slate-300'} ${isRtl ? 'rotate-180' : ''}`} />
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Right Display Area: Fine details, visual cards & sentences */}
            <div className="col-span-1 lg:col-span-8">
              {selectedItem ? (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden flex flex-col md:flex-row min-h-[460px]">
                  
                  {/* Visual cartoon preview left half */}
                  <div className="w-full md:w-1/2 bg-[#FCFAF0] p-6 flex flex-col justify-between items-center border-b md:border-b-0 md:border-r border-slate-100">
                    <div>
                      <span className="text-[9px] font-black tracking-widest text-[#002147] uppercase bg-amber-100 px-2.5 py-1 rounded-md">
                        {isRtl ? 'المظهر التوضيحي 🎨' : 'CARTOON DECOR'}
                      </span>
                    </div>

                    {/* Simulation cartoon frame with picsum seed */}
                    <div className="my-6 relative flex flex-col items-center">
                      <div className="absolute inset-0 bg-[#C49E3A]/5 rounded-full scale-110 animate-pulse" />
                      <div className="w-40 h-40 rounded-full border-4 border-amber-300/30 bg-white flex items-center justify-center text-8xl shadow-lg relative z-10 transition-all hover:rotate-6">
                        {selectedItem.emoji}
                      </div>

                      {/* Generative Visual design specs */}
                      <div className="mt-4 text-center max-w-xs">
                        <span className="text-[10px] font-black text-amber-800 leading-snug">
                          {isRtl ? 'أبعاد الصورة المقترحة للذكاء الاصطناعي:' : 'AI Generation Prompt:'}
                        </span>
                        <p className="text-[9px] text-slate-400 leading-normal italic mt-1 bg-slate-100/60 p-2 rounded-lg text-justify font-mono">
                          {selectedItem.image_prompt}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => speakWordOrSentence(selectedItem.word, selectedItem.word)}
                      className={`flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-black text-xs rounded-xl shadow-lg shadow-amber-500/10 cursor-pointer transition-all ${
                        isSpeaking === selectedItem.word ? 'animate-bounce' : ''
                      }`}
                    >
                      <Volume2 size={14} />
                      <span>{isRtl ? 'استمع للكلمة 🔊' : 'Listen Pronunciation 🔊'}</span>
                    </button>
                  </div>

                  {/* Verbal and examples right half */}
                  <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                    <div className="space-y-6">
                      
                      {/* English spelling name */}
                      <div className="space-y-1">
                        <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                          {isRtl ? 'الكلمة باللغة الإنجليزية' : 'English Spelling'}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-sans font-black text-[#002147] capitalize tracking-tight flex items-center gap-3">
                          {selectedItem.word}
                        </h2>
                      </div>

                      {/* Arabic Translation */}
                      <div className="space-y-1 bg-slate-50 p-4 rounded-2xl border border-slate-105">
                        <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block">
                          {isRtl ? 'المعنى بالعربية' : 'Arabic Translation'}
                        </span>
                        <p className="text-2xl font-black text-amber-600 text-right">
                          {selectedItem.meaning_ar}
                        </p>
                      </div>

                      {/* Context Sentences */}
                      <div className="space-y-2">
                        <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block">
                          {isRtl ? 'مثال معبر في جملة' : 'Example Sentence context'}
                        </span>
                        
                        <div className="bg-amber-50/40 border border-amber-150/40 p-4 rounded-2xl space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-sans font-bold text-slate-800 text-sm md:text-base italic leading-relaxed">
                              &ldquo; {selectedItem.sentence} &rdquo;
                            </p>
                            
                            <button
                              onClick={() => speakWordOrSentence(selectedItem.sentence, `sentence_${selectedItem.word}`)}
                              className={`p-1.5 bg-white border border-amber-250 rounded-lg text-amber-700 hover:bg-slate-50 shrink-0 cursor-pointer ${
                                isSpeaking === `sentence_${selectedItem.word}` ? 'animate-spin' : ''
                              }`}
                            >
                              <Volume2 size={13} />
                            </button>
                          </div>

                          {selectedItem.sentence_ar && (
                            <p className="text-xs text-slate-400 font-bold text-right pt-1 border-t border-dashed border-amber-100">
                              {selectedItem.sentence_ar}
                            </p>
                          )}
                        </div>
                      </div>

                    </div>

                    {/* Small tip widget */}
                    <div className="mt-8 pt-4 border-t border-slate-50 flex items-start gap-2.5 text-[10px] text-slate-400">
                      <Info size={14} className="text-amber-500 shrink-0 mt-0.5" />
                      <p className="leading-relaxed">
                        {isRtl 
                          ? 'تدرّب على قراءة الجملة والكلمة بصوتك مستعيناً بنطق اللفظ الإنجليزي لتثبيت المعلومة وحصد نطق مميز.' 
                          : 'Try reading the sentence out loud to understand context. Click the voice button to listen again.'}
                      </p>
                    </div>

                  </div>

                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-slate-200 border-dashed p-12 text-center text-slate-400">
                  <p>{isRtl ? 'اختر كلمة من القائمة لتعرض بياناتها المصورة' : 'Select a word to view detailed visual card'}</p>
                </div>
              )}
            </div>

          </div>
        ) : (
          /* =======================================
             QUIZ MODE: SPELLING & FLASH CHALLENGES
             ======================================= */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden min-h-[430px] flex flex-col justify-between">
            
            {!quizFinished ? (
              <>
                {/* Quiz Header Progress */}
                <div className="bg-slate-50 border-b border-light-100 px-6 py-4 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-black tracking-widest text-[#002147]">
                      {isRtl ? 'لعبة تخمين المفردات' : 'WORD TRIVIA CHALLENGE'}
                    </span>
                    <h3 className="text-sm font-bold text-slate-500">
                      {isRtl ? 'السؤال' : 'Question'} <strong className="text-slate-800">{quizIndex + 1} / {quizQuestions.length}</strong>
                    </h3>
                  </div>

                  <div className="bg-amber-100 text-amber-800 font-black text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
                    <Star size={13} fill="currentColor" />
                    <span>{quizScore} {isRtl ? 'صحيحة' : 'correct'}</span>
                  </div>
                </div>

                {/* Question Body */}
                <div className="p-6 md:p-8 space-y-6 flex-1 flex flex-col justify-center">
                  
                  {/* Illustrated Word bubble */}
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-24 h-24 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-5xl shadow-md">
                      {quizQuestions[quizIndex]?.correctAnswer.emoji}
                    </div>

                    <div className="space-y-1">
                      <h2 className="text-3xl font-sans font-black text-[#002147] tracking-tight capitalize">
                        {quizQuestions[quizIndex]?.correctAnswer.word}
                      </h2>
                      <span className="text-xs text-slate-400 font-bold block">
                        &ldquo; {quizQuestions[quizIndex]?.correctAnswer.sentence} &rdquo;
                      </span>
                    </div>
                  </div>

                  {/* Multiple Choice Options */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl mx-auto w-full">
                    {quizQuestions[quizIndex]?.allOptions.map((opt) => {
                      const isSelected = quizQuestions[quizIndex].userAnswer === opt;
                      const isCorrectAnswer = opt === quizQuestions[quizIndex].correctAnswer.meaning_ar;
                      const hasAnswered = quizQuestions[quizIndex].userAnswer !== null;

                      let btnStyle = "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50";
                      let indicatorColor = null;

                      if (hasAnswered) {
                        if (isCorrectAnswer) {
                          btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-800";
                          indicatorColor = <Check className="text-emerald-600 stroke-[3px]" size={16} />;
                        } else if (isSelected) {
                          btnStyle = "bg-red-50 border-red-400 text-red-800";
                          indicatorColor = <X className="text-red-600 stroke-[3px]" size={16} />;
                        } else {
                          btnStyle = "bg-white border-slate-150 text-slate-400 opacity-60";
                        }
                      }

                      return (
                        <button
                          key={opt}
                          disabled={hasAnswered}
                          onClick={() => handleSelectQuizAnswer(opt)}
                          className={`p-4 rounded-2xl border-2 text-center text-base font-black transition-all cursor-pointer flex items-center justify-center gap-2 select-none ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {indicatorColor}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation card displayed once chosen */}
                  {quizQuestions[quizIndex]?.userAnswer !== null && (
                    <div className="bg-slate-50 p-4 rounded-2xl border text-center text-xs font-bold text-slate-500 max-w-md mx-auto space-y-1">
                      <p>
                        {quizQuestions[quizIndex].isCorrect 
                          ? (isRtl ? 'إجابة عبقرية تماماً! أحسنت وبوركت 🥳' : 'Awesome job! Smashed it completely 🥳')
                          : (isRtl ? `خطأ بسيط! الخيار الصحيح هو: "${quizQuestions[quizIndex].correctAnswer.meaning_ar}"` : `Not quite! The correct meaning is: "${quizQuestions[quizIndex].correctAnswer.meaning_ar}"`)}
                      </p>
                    </div>
                  )}

                </div>

                {/* Next button footer */}
                {quizQuestions[quizIndex]?.userAnswer !== null && (
                  <div className="bg-slate-50 border-t p-4 flex justify-end">
                    <button
                      onClick={nextQuizQuestion}
                      className="px-6 py-2.5 bg-[#002147] text-white hover:bg-[#002752] rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <span>
                        {quizIndex < quizQuestions.length - 1 
                          ? (isRtl ? 'السؤال التالي ➡️' : 'Next Question ➡️') 
                          : (isRtl ? 'إنهاء التحدي وحصد الجوائز 🏆' : 'Finish Trivia & Save 🏆')}
                      </span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Quiz Summary Screen */
              <div className="p-8 text-center space-y-6 flex flex-col items-center justify-center my-auto min-h-[350px]">
                <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500 animate-bounce">
                  <Award size={48} strokeWidth={2.5} />
                </div>

                <div className="space-y-2">
                  <h2 className="text-3xl font-sans font-black text-[#002147]">
                    {isRtl ? 'اكتملت اللعبة بنجاح! 🎉' : 'Trivia Smashed! 🎉'}
                  </h2>
                  <p className="text-slate-500 font-bold">
                    {isRtl 
                      ? `تمكنت من الإجابة على ${quizScore} من 5 أسئلة للمفردات بالشكل الصحيح.` 
                      : `You answered ${quizScore} out of 5 questions correctly.`}
                  </p>
                </div>

                {/* Score badge details */}
                <div className="bg-[#FAF9F5] rounded-2xl border border-amber-100 p-4 max-w-xs w-full flex items-center justify-around">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block">{isRtl ? 'الدرجة' : 'SCORE'}</span>
                    <strong className="text-2xl font-black text-amber-500">{quizScore * 20}%</strong>
                  </div>
                  <div className="border-r h-8 border-slate-200" />
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block">{isRtl ? 'نقاط فوز' : 'REWARD'}</span>
                    <strong className="text-2xl font-black text-emerald-600">+{quizScore * 10} XP</strong>
                  </div>
                </div>

                {/* CTA Options */}
                <div className="flex items-center gap-3 w-full max-w-sm">
                  <button
                    onClick={startCategoryQuiz}
                    className="flex-1 py-3 bg-[#002147] hover:bg-[#002a5c] text-white rounded-xl font-black text-xs uppercase tracking-wider cursor-pointer"
                  >
                    {isRtl ? 'إعادة اللعب 🔄' : 'Try Again 🔄'}
                  </button>
                  <button
                    onClick={() => setInteractionMode('browse')}
                    className="flex-1 py-3 bg-white hover:bg-slate-50 text-[#002147] border border-slate-200 rounded-xl font-black text-xs uppercase tracking-wider cursor-pointer"
                  >
                    {isRtl ? 'العودة للتصفح' : 'Go to Cards'}
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
