import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { translations, Language } from '../lib/translations';
import { OxfordUnitLesson, OLD_OXFORD_LESSONS } from './OxfordUnitLesson';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { 
  ArrowLeft, 
  Search,
  BookOpen,
  Sparkles,
  Trophy,
  HelpCircle,
  Award,
  ChevronRight,
  Library
} from 'lucide-react';

interface OxfordClassicCompanionProps {
  lang: Language;
  onBack: () => void;
  initialUnitId?: string | number | null;
  userProfile?: any;
}

const COLORS = [
  { bg: 'bg-blue-600', text: 'text-blue-600', light: 'bg-blue-50 border-blue-100', hover: 'hover:border-blue-300', accent: 'text-blue-500' },
  { bg: 'bg-emerald-600', text: 'text-emerald-600', light: 'bg-emerald-50 border-emerald-100', hover: 'hover:border-emerald-300', accent: 'text-emerald-500' },
  { bg: 'bg-amber-600', text: 'text-amber-600', light: 'bg-amber-50 border-amber-100', hover: 'hover:border-amber-300', accent: 'text-amber-500' },
  { bg: 'bg-rose-600', text: 'text-rose-600', light: 'bg-rose-50 border-rose-100', hover: 'hover:border-rose-300', accent: 'text-rose-500' },
  { bg: 'bg-purple-600', text: 'text-purple-600', light: 'bg-purple-50 border-purple-100', hover: 'hover:border-purple-300', accent: 'text-purple-500' },
  { bg: 'bg-sky-600', text: 'text-sky-600', light: 'bg-sky-50 border-sky-100', hover: 'hover:border-sky-300', accent: 'text-sky-500' },
];

export const OxfordClassicCompanion = ({ lang, onBack, initialUnitId, userProfile }: OxfordClassicCompanionProps) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);
  const [userResults, setUserResults] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  useEffect(() => {
    if (initialUnitId) {
      setActiveLessonId(String(initialUnitId));
    }
  }, [initialUnitId]);

  const fetchResults = async () => {
    if (!userProfile?.uid) return;
    try {
      const q = query(
        collection(db, 'lessonResults'),
        where('userId', '==', userProfile.uid)
      );
      const snap = await getDocs(q);
      const results: any[] = [];
      snap.forEach(doc => {
        results.push(doc.data());
      });
      setUserResults(results);
    } catch (e) {
      console.error("Error fetching lesson results in Oxford Classic:", e);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [userProfile, activeLessonId]);

  if (activeLessonId) {
    return (
      <OxfordUnitLesson 
        lang={lang} 
        unitId={activeLessonId} 
        onBack={() => {
          setActiveLessonId(null);
          fetchResults();
        }} 
        userProfile={userProfile} 
      />
    );
  }

  // Filter units
  const filteredUnitKeys = Object.keys(OLD_OXFORD_LESSONS).filter(key => {
    const unit = OLD_OXFORD_LESSONS[key];
    const bigQuestionNorm = (unit.bigQuestion || '').toLowerCase();
    const bigQuestionArNorm = (unit.bigQuestionAr || '');
    const matchesSearch = bigQuestionNorm.includes(searchQuery.toLowerCase()) || 
                          bigQuestionArNorm.includes(searchQuery) ||
                          `unit ${key}`.includes(searchQuery.toLowerCase()) ||
                          `الوحدة ${key}`.includes(searchQuery);

    const matchesVocab = unit.vocab?.some((v: any) => 
      v.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.ar.includes(searchQuery)
    );

    return matchesSearch || matchesVocab;
  });

  return (
    <div className={`flex-1 p-6 md:p-12 overflow-y-auto ${isRtl ? 'font-arabic' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-[#002147] transition-colors mb-8 font-bold">
          <ArrowLeft size={18} className={isRtl ? 'rotate-180' : ''} />
          {isRtl ? 'العودة للرئيسية' : 'Back to Dashboard'}
        </button>

        <header className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#002147] p-3 rounded-2xl text-[#C49E3A] shadow-lg border border-[#C49E3A]/20">
                  <Library size={24} />
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-[#002147] tracking-tight">
                  {isRtl ? 'قاموس أكسفورد المصور الكلاسيكي' : 'Classic Oxford Picture Dictionary'}
                </h1>
              </div>
              <p className="text-slate-500 font-medium text-lg max-w-2xl leading-relaxed">
                {isRtl 
                  ? 'منهج أكسفورد المصور القديم كاملاً، يحتوي على 36 وحدة تفاعلية لتعلم المفردات الأساسية وبناء الجمل بالصور والاختبارات.' 
                  : 'The complete classic Oxford curriculum visual bank. Explore 36 interactive units with pronunciation exercises, picture matches, and quizzes.'}
              </p>
            </div>
            
            <div className="relative w-full md:w-80">
              <input 
                type="text"
                placeholder={isRtl ? 'بحث في الوحدات أو الكلمات...' : 'Search units or words...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 pl-12 text-sm focus:outline-none focus:border-[#002147] transition-all shadow-sm"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
            </div>
          </div>
        </header>

        {/* Plan 7: Live Level-based Oxford Challenge Test Preps / Quick Mock Exams */}
        <OxfordTestPrepChallenge lang={lang} isRtl={isRtl} />

        {/* Units Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUnitKeys.map((key) => {
            const unit = OLD_OXFORD_LESSONS[key];
            const numKey = Number(key);
            const colorScheme = COLORS[(numKey - 1) % COLORS.length];
            
            // Check completed status
            const completedResult = userResults.find(r => r.lessonId === String(key) && r.courseId === 'oxford');
            const isCompleted = !!completedResult;

            return (
              <motion.div
                key={key}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 transition-all flex flex-col h-full"
              >
                {/* Visual Header Banner */}
                <div className={`p-6 ${colorScheme.light} border-b flex justify-between items-start relative overflow-hidden`}>
                  <div className="relative z-10">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${colorScheme.text} bg-white/80 px-2.5 py-1 rounded-full border border-current shadow-sm`}>
                      {isRtl ? `الوحدة ${key}` : `Unit ${key}`}
                    </span>
                    <h3 className="text-xl font-black text-[#002147] mt-3 leading-snug tracking-tight">
                      {isRtl ? unit.bigQuestionAr || `الوحدة الرابعة: الطعام` : unit.bigQuestion}
                    </h3>
                  </div>
                  <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none">
                    <BookOpen size={120} className={colorScheme.text} />
                  </div>

                  {isCompleted && (
                    <span className="bg-emerald-500 text-white p-1.5 rounded-full shadow-md z-10">
                      <Award size={18} />
                    </span>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider mb-3">
                      {isRtl ? 'مفردات الوحدة ومصطلحاتها' : 'Unit Vocabulary Bank'}
                    </h4>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {unit.vocab?.slice(0, 6).map((item: any, i: number) => (
                        <span 
                          key={i} 
                          className="bg-slate-50 text-slate-600 border border-slate-100 rounded-xl px-3 py-1.5 text-xs font-bold leading-none hover:bg-slate-100 transition-all cursor-pointer"
                          title={isRtl ? item.ar : item.word}
                        >
                          {isRtl ? item.ar : item.word}
                        </span>
                      ))}
                      {unit.vocab?.length > 6 && (
                        <span className="bg-slate-100 text-slate-500 rounded-xl px-2.5 py-1.5 text-xs font-black">
                          +{unit.vocab.length - 6}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions & Completion */}
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                    {isCompleted ? (
                      <div className="flex items-center gap-1.5">
                        <Trophy size={14} className="text-amber-500" />
                        <span className="text-xs font-black text-amber-600">
                          {isRtl ? `الدرجة: ${completedResult.score}/${completedResult.total || 10}` : `Score: ${completedResult.score}/${completedResult.total || 10}`}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <HelpCircle size={14} />
                        <span className="text-xs font-bold">{isRtl ? 'غير مكتمل' : 'Not completed'}</span>
                      </div>
                    )}

                    <button
                      onClick={() => setActiveLessonId(String(key))}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-white ${colorScheme.bg} shadow-md transition-all hover:brightness-110 active:scale-95`}
                    >
                      <span>{isRtl ? 'ابدأ النشاط ⚡' : 'Start Unit ⚡'}</span>
                      <ChevronRight size={14} className={isRtl ? 'rotate-180' : ''} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredUnitKeys.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm mt-8">
            <Library size={48} className="text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-black text-slate-500 mb-1">
              {isRtl ? 'لا توجد نتائج مطابقة' : 'No matching results'}
            </h3>
            <p className="text-slate-400 text-sm">
              {isRtl ? 'جرب البحث عن وحدة أو كلمة أخرى...' : 'Try searching for another unit or keyword...'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Plan 7: Live Level-based Oxford Challenge Test Preps / Quick Mock Exams
interface OxfordTestPrepChallengeProps {
  lang: Language;
  isRtl: boolean;
}

const OxfordTestPrepChallenge = ({ lang, isRtl }: OxfordTestPrepChallengeProps) => {
  const [activeLevel, setActiveLevel] = React.useState<'A A1' | 'A A2' | 'A B1' | 'A B2'>('A A1');
  const [currentQuizIndex, setCurrentQuizIndex] = React.useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = React.useState<number | null>(null);
  const [isAnswered, setIsAnswered] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [quizFinished, setQuizFinished] = React.useState(false);

  const quizzes = {
    'A A1': [
      { q: "Complete with the correct word: 'Please slice the ______ for the salad.'", a: ["onion", "backpack", "notebook", "airplane"], correct: 0 },
      { q: "What is the correct vocabulary word for a place where books are kept?", a: ["Garage", "Library", "Kitchen", "Airport"], correct: 1 },
    ],
    'A A2': [
      { q: "Select the match: 'We use a ______ to measure body temperature.'", a: ["microscope", "calculator", "thermometer", "compass"], correct: 2 },
      { q: "Which academic word defines: 'A custom or traditional belief passed down through generations.'", a: ["Heritage", "Routine", "Instruction", "Syllable"], correct: 0 },
    ],
    'A B1': [
      { q: "Complete: 'My English grades have improved _______ since I adopted the weekly study planner.'", a: ["hardly", "magnificently", "negatively", "accidentally"], correct: 1 },
      { q: "Which exact verb means: 'To look at something very closely and critically.'", a: ["Ignore", "Analyze", "Translate", "Dismiss"], correct: 1 },
    ],
    'A B2': [
      { q: "Select the standard academic term: 'Theoretical frameworks structure our research ______.'", a: ["hypotheses", "pronunciations", "stickers", "backpacks"], correct: 0 },
      { q: "An elegant academic solution is often highly praised for its simplicity and ______.", a: ["clutter", "precision", "volume", "coarseness"], correct: 1 },
    ]
  };

  const handleLevelChange = (lvl: 'A A1' | 'A A2' | 'A B1' | 'A B2') => {
    setActiveLevel(lvl);
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  const handleAnswerSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedAnswer(idx);
    setIsAnswered(true);
    const correctIdx = quizzes[activeLevel][currentQuizIndex || 0].correct;
    if (idx === correctIdx) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    const list = quizzes[activeLevel];
    if (currentQuizIndex !== null && currentQuizIndex + 1 < list.length) {
      setCurrentQuizIndex(prev => (prev || 0) + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const currentQuiz = currentQuizIndex !== null ? quizzes[activeLevel][currentQuizIndex] : null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-10 bg-gradient-to-br from-[#002147] to-[#011429] p-8 rounded-[2.5rem] text-white border-2 border-[#C49E3A]/40 relative overflow-hidden shadow-xl"
    >
      <div className="absolute top-0 right-0 w-44 h-44 bg-[#C49E3A]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-white/10">
          <div>
            <span className="text-[10px] font-black uppercase text-[#C49E3A] tracking-wider bg-[#C49E3A]/10 px-3 py-1 rounded-md">
              {isRtl ? 'الخطة 7: معسكر محاكاة اختبارات أكسفورد الدولية 🏆' : 'Plan 7: Oxford International Challenge Prep 🏆'}
            </span>
            <h2 className="text-xl md:text-2xl font-black mt-2">
              {isRtl ? 'محاكاة اختبارات تحديد المستوى الفورية 📝' : 'Oxford Level-Based Diagnostic Tracker'}
            </h2>
            <p className="text-xs text-slate-300 font-medium mt-1">
              {isRtl ? 'اختر مستواك المستهدف لخوض محاكاة حية مدتها دقيقة والحصول على وسام الدقة!' : 'Choose your target level below to start a quick live 2-question diagnostic match.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {(['A A1', 'A A2', 'A B1', 'A B2'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => handleLevelChange(lvl)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  activeLevel === lvl 
                    ? 'bg-[#C49E3A] text-[#002147] shadow-md' 
                    : 'bg-white/10 hover:bg-white/20 text-slate-200'
                }`}
              >
                {lvl.replace('A ', '')}
              </button>
            ))}
          </div>
        </div>

        {currentQuizIndex === null ? (
          <div className="text-center py-6">
            <button
              onClick={() => handleLevelChange(activeLevel)}
              className="px-6 py-3 bg-[#C49E3A] text-[#002147] rounded-2xl font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              {isRtl ? 'ابدأ تحدي المستوى الفوري ⚡' : 'Start Diagnostic Live Challenge ⚡'}
            </button>
          </div>
        ) : quizFinished ? (
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center space-y-4">
            <span className="text-4xl">🎓</span>
            <div>
              <h3 className="text-lg font-black text-white">
                {isRtl ? 'اكتملت محاكاة التحدي بنجاح!' : 'Diagnostic Challenge Completed!'}
              </h3>
              <p className="text-xs text-slate-300 font-bold mt-1">
                {isRtl 
                  ? `لقد حصلت على درجة ${score} من أصل 2 بمستوى أكسفورد ${activeLevel.replace('A ', '')}` 
                  : `You scored ${score} out of 2 on the Oxford ${activeLevel.replace('A ', '')} exam preparation match.`}
              </p>
            </div>
            <button
              onClick={() => handleLevelChange(activeLevel)}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[11px] font-black cursor-pointer transition-all"
            >
              {isRtl ? 'إعادة المحاولة 🔄' : 'Try Again 🔄'}
            </button>
          </div>
        ) : (
          currentQuiz && (
            <div className="space-y-6">
              <div className="flex justify-between items-center text-xs font-bold text-[#C49E3A]">
                <span>{isRtl ? `سؤال ${currentQuizIndex + 1} من 2` : `Question ${currentQuizIndex + 1} of 2`}</span>
                <span>{activeLevel.replace('A ', '')} {isRtl ? 'مستوى أكسفورد' : 'Oxford Prep'}</span>
              </div>

              <div className="bg-white/5 border border-white/10 p-5 rounded-3xl">
                <p className="text-sm font-black text-white leading-relaxed">{currentQuiz.q}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentQuiz.a.map((opt, oIdx) => {
                  const isSelected = selectedAnswer === oIdx;
                  const isCorrect = oIdx === currentQuiz.correct;
                  const btnColor = isAnswered
                    ? isCorrect
                      ? 'bg-emerald-600/30 border-emerald-500 text-emerald-200'
                      : isSelected
                        ? 'bg-red-600/30 border-red-500 text-red-200'
                        : 'bg-white/5 border-white/5 text-slate-400 opacity-55'
                    : isSelected
                      ? 'bg-[#C49E3A]/20 border-[#C49E3A] text-white'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-white';

                  return (
                    <button
                      key={oIdx}
                      disabled={isAnswered}
                      onClick={() => handleAnswerSelect(oIdx)}
                      className={`p-4 rounded-2xl border text-xs font-black transition-all flex justify-between items-center ${btnColor} cursor-pointer text-left`}
                    >
                      <span>{opt}</span>
                      {isAnswered && isCorrect && <span className="text-emerald-400 text-xs font-black">✓ Correct</span>}
                      {isAnswered && isSelected && !isCorrect && <span className="text-red-400 text-xs font-black">✗ Incorr.</span>}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNext}
                    className="px-5 py-2.5 bg-[#C49E3A] text-[#002147] rounded-xl text-xs font-black cursor-pointer hover:brightness-110 active:scale-95 transition-all"
                  >
                    {isRtl ? 'التالي ➔' : 'Next ➔'}
                  </button>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </motion.div>
  );
};
