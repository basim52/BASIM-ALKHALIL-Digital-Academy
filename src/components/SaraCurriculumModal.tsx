import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Brain,
  MessageSquare,
  BookOpen,
  PenTool,
  Search,
  X,
  Sparkles,
  Award,
  ChevronRight,
  Flame,
  Volume2,
  Mic,
  ArrowRight
} from 'lucide-react';
import {
  SaraCurriculumLesson,
  SaraPillarId,
  ALL_SARA_EXCLUSIVE_LESSONS,
  SARA_PILLARS_META
} from '../data/saraExclusiveCurriculums';

interface SaraCurriculumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson: (lesson: SaraCurriculumLesson) => void;
  activeLessonId?: string | null;
  initialPillar?: string;
  isRtl?: boolean;
}

export const SaraCurriculumModal: React.FC<SaraCurriculumModalProps> = ({
  isOpen,
  onClose,
  onSelectLesson,
  activeLessonId,
  initialPillar = 'all',
  isRtl = true
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPillar, setSelectedPillar] = useState<string>(initialPillar || 'all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  useEffect(() => {
    if (initialPillar) {
      setSelectedPillar(initialPillar);
    }
  }, [initialPillar, isOpen]);

  // Filter lessons based on search, pillar, and level
  const filteredLessons = useMemo(() => {
    return ALL_SARA_EXCLUSIVE_LESSONS.filter((lesson) => {
      // Pillar filter
      if (selectedPillar !== 'all' && lesson.pillarId !== selectedPillar) {
        return false;
      }

      // Level filter
      if (selectedLevel !== 'all') {
        if (selectedLevel === 'starter' && !lesson.level.includes('Starter')) return false;
        if (selectedLevel === 'intermediate' && !lesson.level.includes('Intermediate')) return false;
        if (selectedLevel === 'advanced' && !lesson.level.includes('Advanced')) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitleAr = lesson.titleAr?.toLowerCase().includes(query);
        const matchesTitleEn = lesson.titleEn?.toLowerCase().includes(query);
        const matchesDescAr = (lesson.descAr || '')?.toLowerCase().includes(query);
        const matchesDescEn = (lesson.descEn || '')?.toLowerCase().includes(query);
        const matchesFormula = lesson.keyPattern?.formula?.toLowerCase().includes(query);
        const matchesGoal = lesson.speakingGoalAr?.toLowerCase().includes(query);

        if (!matchesTitleAr && !matchesTitleEn && !matchesDescAr && !matchesDescEn && !matchesFormula && !matchesGoal) {
          return false;
        }
      }

      return true;
    });
  }, [selectedPillar, selectedLevel, searchQuery]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-md flex flex-col items-center justify-center p-2 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-amber-300/60 overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-[#002147] via-[#0b3366] to-[#002147] text-white p-4 sm:p-6 border-b border-amber-400/40 relative">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center text-2xl shadow-lg font-black shrink-0">
                  📚
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg sm:text-xl font-black text-amber-300 flex items-center gap-1.5">
                      <span>{isRtl ? 'مناهج سارة التخصصية المستقلة' : "Sara's Independent Curriculums"}</span>
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-300/40 text-[11px] font-black">
                      {isRtl ? '4 مسارات للطلاقة الشفهية ✨' : '4 Spoken Fluency Tracks ✨'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 font-medium mt-1">
                    {isRtl
                      ? 'مناهج جديدة كلياً مصممة لمعلمتك الذكية سارة: قوالب كلام فورية، كسر حاجز الخوف، وتدريب صوتي على السبورة.'
                      : 'Brand new, dedicated fluency tracks for Sara: instant speech patterns, fear-breaking drills & smart whiteboard.'}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 sm:p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer border border-white/10 shrink-0"
                title={isRtl ? 'إغلاق' : 'Close'}
              >
                <X size={20} />
              </button>
            </div>

            {/* Search Bar & Level Filters */}
            <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <div className="relative flex-1">
                <Search size={16} className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${isRtl ? 'right-3' : 'left-3'}`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isRtl
                      ? 'ابحث في مناهج سارة (القواعد، المحادثة، القراءة، الكتابة...)'
                      : "Search Sara's lessons (grammar, speaking, reading, writing)..."
                  }
                  className={`w-full bg-slate-900/60 border border-amber-400/30 rounded-2xl py-2 sm:py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-all ${
                    isRtl ? 'pr-9 pl-3' : 'pl-9 pr-3'
                  }`}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className={`absolute top-1/2 -translate-y-1/2 text-slate-400 hover:text-white ${isRtl ? 'left-3' : 'right-3'}`}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Level Selector */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                <button
                  onClick={() => setSelectedLevel('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    selectedLevel === 'all'
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'bg-white/10 hover:bg-white/15 text-slate-200'
                  }`}
                >
                  {isRtl ? 'كل المستويات' : 'All Levels'}
                </button>
                <button
                  onClick={() => setSelectedLevel('starter')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    selectedLevel === 'starter'
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'bg-white/10 hover:bg-white/15 text-slate-200'
                  }`}
                >
                  {isRtl ? 'مبتدئ' : 'Starter'}
                </button>
                <button
                  onClick={() => setSelectedLevel('intermediate')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    selectedLevel === 'intermediate'
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'bg-white/10 hover:bg-white/15 text-slate-200'
                  }`}
                >
                  {isRtl ? 'متوسط' : 'Intermediate'}
                </button>
                <button
                  onClick={() => setSelectedLevel('advanced')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    selectedLevel === 'advanced'
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'bg-white/10 hover:bg-white/15 text-slate-200'
                  }`}
                >
                  {isRtl ? 'متقدم' : 'Advanced'}
                </button>
              </div>
            </div>
          </div>

          {/* 4 Dedicated Pillars Tabs */}
          <div className="bg-slate-50 border-b border-slate-200 p-2 sm:p-3 overflow-x-auto no-scrollbar flex items-center gap-2">
            <button
              onClick={() => setSelectedPillar('all')}
              className={`px-3.5 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shrink-0 shadow-2xs ${
                selectedPillar === 'all'
                  ? 'bg-[#002147] text-amber-300 ring-2 ring-amber-400/50 shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <span>🌐</span>
              <span>{isRtl ? 'كافة مناهج سارة (الكل)' : 'All Curriculums'}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 text-white font-mono">
                {ALL_SARA_EXCLUSIVE_LESSONS.length}
              </span>
            </button>

            {SARA_PILLARS_META.map((meta) => {
              const count = ALL_SARA_EXCLUSIVE_LESSONS.filter((l) => l.pillarId === meta.id).length;
              const isActive = selectedPillar === meta.id;
              return (
                <button
                  key={meta.id}
                  onClick={() => setSelectedPillar(meta.id)}
                  className={`px-3 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shrink-0 shadow-2xs ${
                    isActive
                      ? `bg-gradient-to-r ${meta.color} text-white ring-2 ring-amber-400/50 shadow-sm`
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  <span>{meta.icon}</span>
                  <span>{isRtl ? meta.shortTitleAr : meta.shortTitleEn}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Lessons Grid */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-5 bg-slate-100/50 space-y-4">
            {filteredLessons.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-slate-200 text-slate-400 flex items-center justify-center text-3xl">
                  🔍
                </div>
                <h4 className="text-base font-black text-slate-700">
                  {isRtl ? 'لا توجد دروس مطابقة لبحثك' : 'No lessons matched your search'}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  {isRtl ? 'جرب البحث بكلمات أخرى أو اختر مساراً مختلفاً' : 'Try searching for other terms or choose another track'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                {filteredLessons.map((lesson) => {
                  const isCurrent = activeLessonId === lesson.id;
                  const meta = SARA_PILLARS_META.find((p) => p.id === lesson.pillarId);

                  return (
                    <motion.div
                      key={lesson.id}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.15 }}
                      className={`bg-white rounded-3xl border-2 transition-all p-4 sm:p-5 shadow-xs hover:shadow-md flex flex-col justify-between ${
                        isCurrent
                          ? 'border-amber-400 ring-4 ring-amber-300/30'
                          : 'border-slate-200 hover:border-amber-300'
                      }`}
                    >
                      <div>
                        {/* Card Header */}
                        <div className="flex items-start justify-between gap-2 mb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl p-2 rounded-2xl bg-amber-50 border border-amber-200 shrink-0">
                              {lesson.pillarIcon}
                            </span>
                            <div>
                              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                                {isRtl ? lesson.pillarNameAr : lesson.pillarNameEn}
                              </span>
                              <span className="mx-1 text-slate-300">•</span>
                              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                                {lesson.level}
                              </span>
                            </div>
                          </div>

                          {isCurrent && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black border border-emerald-300 animate-pulse">
                              {isRtl ? 'قيد الدراسة الآن ✨' : 'Active Lesson ✨'}
                            </span>
                          )}
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-sm sm:text-base font-black text-[#002147] mb-1 leading-snug">
                          {isRtl ? lesson.titleAr : lesson.titleEn}
                        </h3>
                        <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                          {isRtl ? lesson.descAr : lesson.descEn}
                        </p>

                        {/* Speaking Formula & Goal Box */}
                        <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-50/70 via-slate-50 to-amber-50/70 border border-amber-200/80 mb-3 space-y-2">
                          <div className="flex items-center gap-1.5 text-[11px] font-black text-amber-900">
                            <span>🎯</span>
                            <span>{isRtl ? 'هدف الطلاقة:' : 'Speaking Goal:'}</span>
                            <span className="font-semibold text-slate-700 text-[11px]">
                              {isRtl ? lesson.speakingGoalAr : lesson.speakingGoalEn}
                            </span>
                          </div>

                          <div className="p-2 rounded-xl bg-white border border-amber-300/60 font-mono text-xs text-[#002147] font-bold shadow-2xs flex items-center justify-between">
                            <span className="truncate">{lesson.keyPattern?.formula || 'Daily Spoken English Pattern'}</span>
                            <span className="text-[10px] font-sans px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800">
                              {isRtl ? 'القالب التحدثي' : 'Key Formula'}
                            </span>
                          </div>
                        </div>

                        {/* Practical Spoken Examples Preview */}
                        <div className="space-y-1.5 mb-3">
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                            {isRtl ? 'مثال تحدثي مباشر:' : 'Spoken Example:'}
                          </span>
                          {lesson.practicalExamples.slice(0, 1).map((ex, i) => (
                            <div
                              key={i}
                              className="text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 flex items-start gap-2"
                            >
                              <span className="text-amber-500 mt-0.5">💬</span>
                              <div>
                                <p className="font-black text-[#002147]">{ex.en}</p>
                                <p className="text-[11px] text-slate-500 font-medium">{ex.ar}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => onSelectLesson(lesson)}
                        className="w-full py-2.5 px-4 rounded-2xl font-black text-xs sm:text-sm cursor-pointer transition-all flex items-center justify-center gap-2 shadow-sm active:scale-98 bg-gradient-to-r from-[#002147] to-[#0d3b66] hover:from-[#093568] hover:to-[#002147] text-amber-300 hover:text-yellow-200 border border-amber-400/40"
                      >
                        <Sparkles size={15} className="text-amber-300" />
                        <span>
                          {isRtl
                            ? 'ابدأ هذا الدرس مع سارة على السبورة 👩‍🏫'
                            : 'Start on Smart Board with Sara 👩‍🏫'}
                        </span>
                        {isRtl ? <ArrowRight size={14} className="rotate-180" /> : <ChevronRight size={14} />}
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2 font-medium">
              <span className="text-amber-500 font-black">💡 ميزة خاصة بسارة:</span>
              <span>
                {isRtl
                  ? 'عند اختيار أي درس، تقوم سارة بفتحه على السبورة التفاعلية وشرحه بالصوت والنطق الصحيح.'
                  : 'Sara automatically opens any chosen lesson on the interactive whiteboard with voice explanation.'}
              </span>
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer"
            >
              {isRtl ? 'إغلاق النافذة' : 'Close Window'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
