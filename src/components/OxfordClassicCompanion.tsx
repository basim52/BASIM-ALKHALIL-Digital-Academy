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
