import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Search,
  X,
  Sparkles,
  GraduationCap,
  Brain,
  MessageSquare,
  PenTool,
  Volume2,
  Baby,
  Flame,
  Award,
  Mic,
  CheckCircle2,
  ChevronRight,
  Filter,
  Layers,
  BookMarked,
  Video
} from 'lucide-react';
import {
  CurriculumLesson,
  ACADEMIC_SECTION_DEFINITIONS,
  getAllCurriculumLessons
} from '../utils/academicCurriculumCatalogue';

interface SaraCurriculumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson: (lesson: CurriculumLesson) => void;
  activeLessonId?: string | null;
  isRtl?: boolean;
}

const PILLAR_ICONS: Record<string, any> = {
  grammar: Brain,
  reading: BookOpen,
  writing: PenTool,
  conversation: MessageSquare,
  expression: Sparkles,
  oxford: Award,
  pronunciation: Mic,
  stories: Volume2,
  early_childhood: Baby,
  kids_stories: Sparkles,
  daily_dose: Flame,
  interactive_play: Layers,
  translation_language_lab: Layers,
  book_courses: BookMarked,
  video_lessons: Video
};

export const SaraCurriculumModal: React.FC<SaraCurriculumModalProps> = ({
  isOpen,
  onClose,
  onSelectLesson,
  activeLessonId,
  isRtl = true
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPillar, setSelectedPillar] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  // Load all master lessons once
  const allLessons = useMemo(() => {
    return getAllCurriculumLessons();
  }, []);

  // Filter lessons based on search, pillar, and level
  const filteredLessons = useMemo(() => {
    return allLessons.filter(lesson => {
      // Pillar filter
      if (selectedPillar !== 'all' && lesson.pillarId !== selectedPillar) {
        return false;
      }

      // Level filter
      if (selectedLevel !== 'all') {
        if (selectedLevel === 'Kid' && lesson.level !== 'Kid') return false;
        if (selectedLevel !== 'Kid' && lesson.level !== selectedLevel) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitleAr = lesson.titleAr?.toLowerCase().includes(query);
        const matchesTitleEn = lesson.titleEn?.toLowerCase().includes(query);
        const matchesDescAr = lesson.descriptionAr?.toLowerCase().includes(query);
        const matchesDescEn = lesson.descriptionEn?.toLowerCase().includes(query);
        const matchesCourse = lesson.courseLabelAr?.toLowerCase().includes(query) || lesson.courseLabelEn?.toLowerCase().includes(query);
        const matchesTag = lesson.categoryTagAr?.toLowerCase().includes(query) || lesson.categoryTagEn?.toLowerCase().includes(query);

        if (!matchesTitleAr && !matchesTitleEn && !matchesDescAr && !matchesDescEn && !matchesCourse && !matchesTag) {
          return false;
        }
      }

      return true;
    });
  }, [allLessons, selectedPillar, selectedLevel, searchQuery]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="bg-white border-2 border-amber-400/80 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden"
        >
          {/* ======================================================== */}
          {/* 1. MODAL HEADER */}
          {/* ======================================================== */}
          <div className="bg-gradient-to-r from-[#002147] via-[#0b2f5c] to-[#002147] px-4 sm:px-6 py-4 text-white border-b-2 border-amber-400/40 relative">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-xl sm:text-2xl shadow-inner shrink-0">
                  📚
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-amber-300 flex items-center gap-2">
                    <span>{isRtl ? 'مناهج الأكاديمية مع المعلمة سارة' : 'Academy Curriculums with Sara'}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400/20 text-amber-200 border border-amber-400/30">
                      {filteredLessons.length} {isRtl ? 'درس' : 'lessons'}
                    </span>
                  </h2>
                  <p className="text-xs text-slate-200/90 font-medium">
                    {isRtl 
                      ? 'اختر أي منهج تعليمي لتقوم سارة بشرحه بالصوت والكتابة على السبورة الذكية 👩‍🏫🎙️' 
                      : 'Select any curriculum lesson for Sara to explain with voice & on the smart whiteboard 👩‍🏫🎙️'}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all cursor-pointer shrink-0"
                title={isRtl ? 'إغلاق' : 'Close'}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 2. SEARCH & LEVEL FILTERS */}
          {/* ======================================================== */}
          <div className="p-3 sm:p-4 bg-slate-50 border-b border-slate-200 space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search size={16} className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${isRtl ? 'right-3' : 'left-3'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isRtl ? 'ابحث في المناهج (مثال: المضارع البسيط، أكسفورد، قراءة، استماع...)' : 'Search curriculums (e.g. Present Simple, Oxford, Reading...)'}
                className={`w-full bg-white border-2 border-slate-200 focus:border-[#002147] rounded-2xl py-2 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none transition-all ${
                  isRtl ? 'pr-9 pl-9' : 'pl-9 pr-9'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={`absolute top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs p-1 ${isRtl ? 'left-3' : 'right-3'}`}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Level Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar text-xs">
              <span className="text-slate-400 text-[10px] shrink-0 font-bold flex items-center gap-1">
                <Filter size={11} />
                {isRtl ? 'المستوى:' : 'Level:'}
              </span>
              {[
                { id: 'all', labelAr: 'الكل 🌐', labelEn: 'All 🌐' },
                { id: 'A1', labelAr: 'A1 مبتدئ', labelEn: 'A1 Beginner' },
                { id: 'A2', labelAr: 'A2 أساسي', labelEn: 'A2 Elementary' },
                { id: 'B1', labelAr: 'B1 متوسط', labelEn: 'B1 Intermediate' },
                { id: 'B2', labelAr: 'B2 فوق المتوسط', labelEn: 'B2 Upper-Int' },
                { id: 'C1', labelAr: 'C1 متقدم', labelEn: 'C1 Advanced' },
                { id: 'C2', labelAr: 'C2 إتقان', labelEn: 'C2 Mastery' },
                { id: 'Kid', labelAr: 'أطفال وبراعم 👶', labelEn: 'Kids 👶' }
              ].map(lvl => (
                <button
                  key={`lvl-${lvl.id}`}
                  onClick={() => setSelectedLevel(lvl.id)}
                  className={`px-2.5 py-1 rounded-xl font-bold shrink-0 transition-all cursor-pointer text-[11px] ${
                    selectedLevel === lvl.id
                      ? 'bg-[#002147] text-amber-300 font-black shadow-xs'
                      : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  {isRtl ? lvl.labelAr : lvl.labelEn}
                </button>
              ))}
            </div>

            {/* Pillar Categories Scroll Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
              <button
                onClick={() => setSelectedPillar('all')}
                className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1 text-[11px] ${
                  selectedPillar === 'all'
                    ? 'bg-[#002147] text-white font-black shadow-sm ring-2 ring-amber-400/40'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <span>🌐</span>
                <span>{isRtl ? 'كافة الأقسام' : 'All Pillars'}</span>
              </button>

              {ACADEMIC_SECTION_DEFINITIONS.map(pillar => {
                const Icon = PILLAR_ICONS[pillar.id] || BookOpen;
                const isSelected = selectedPillar === pillar.id;

                return (
                  <button
                    key={`pillar-${pillar.id}`}
                    onClick={() => setSelectedPillar(pillar.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1.5 text-[11px] ${
                      isSelected
                        ? 'bg-[#002147] text-amber-300 font-black shadow-sm ring-2 ring-amber-400/40'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <Icon size={12} className={isSelected ? 'text-amber-300' : pillar.color} />
                    <span>{isRtl ? pillar.nameAr : pillar.nameEn}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ======================================================== */}
          {/* 3. LESSONS LIST / GRID */}
          {/* ======================================================== */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-2.5 max-h-[60vh]">
            {filteredLessons.length === 0 ? (
              <div className="text-center py-12 px-4 space-y-3">
                <div className="w-14 h-14 mx-auto rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-2xl border border-amber-200">
                  🔍
                </div>
                <h3 className="text-sm font-black text-slate-800">
                  {isRtl ? 'لم يتم العثور على دروس مطابقة' : 'No matching curriculum lessons found'}
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {isRtl
                    ? 'جرب البحث بكلمة أخرى أو تغيير تصنيف القسم أو المستوى'
                    : 'Try changing your search terms or filters'}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedPillar('all');
                    setSelectedLevel('all');
                  }}
                  className="px-3 py-1.5 bg-[#002147] text-amber-300 rounded-xl text-xs font-bold cursor-pointer hover:bg-slate-800"
                >
                  {isRtl ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}
                </button>
              </div>
            ) : (
              filteredLessons.map((lesson, idx) => {
                const Icon = PILLAR_ICONS[lesson.pillarId] || BookOpen;
                const isActive = String(activeLessonId) === String(lesson.id);

                return (
                  <div
                    key={`curriculum-item-${lesson.pillarId}-${lesson.id}-${idx}`}
                    className={`bg-white border-2 rounded-2xl p-3 sm:p-4 transition-all hover:shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isActive
                        ? 'border-amber-400 ring-2 ring-amber-300/40 bg-amber-50/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {/* Lesson Meta and Info */}
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[#002147] shrink-0 mt-0.5">
                        <Icon size={18} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap mb-1">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                            lesson.level === 'A1' ? 'bg-emerald-100 text-emerald-800' :
                            lesson.level === 'A2' ? 'bg-cyan-100 text-cyan-800' :
                            lesson.level === 'B1' ? 'bg-blue-100 text-blue-800' :
                            lesson.level === 'B2' ? 'bg-indigo-100 text-indigo-800' :
                            lesson.level === 'C1' ? 'bg-purple-100 text-purple-800' :
                            lesson.level === 'C2' ? 'bg-rose-100 text-rose-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {lesson.level}
                          </span>

                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                            {isRtl ? lesson.courseLabelAr : lesson.courseLabelEn}
                          </span>

                          <span className="text-[10px] text-slate-400 font-medium">
                            ⏱️ {lesson.duration}
                          </span>

                          {isActive && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-amber-400 text-slate-950 flex items-center gap-0.5">
                              <CheckCircle2 size={10} />
                              {isRtl ? 'المشروح حالياً' : 'Active'}
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm sm:text-base font-black text-[#002147] truncate">
                          {isRtl ? lesson.titleAr : lesson.titleEn}
                        </h4>

                        <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                          {isRtl ? lesson.descriptionAr : lesson.descriptionEn}
                        </p>
                      </div>
                    </div>

                    {/* Action Button: Explain this lesson with Sara */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => {
                          onSelectLesson(lesson);
                          onClose();
                        }}
                        className="px-3.5 py-2 rounded-xl bg-[#002147] hover:bg-[#C49E3A] text-amber-300 hover:text-slate-950 font-black text-xs transition-all flex items-center gap-1.5 shadow-sm cursor-pointer active:scale-95"
                        title={isRtl ? 'اطلب من سارة شرح هذا المنهج بالصوت وعلى السبورة' : 'Ask Sara to explain this lesson'}
                      >
                        <span>👩‍🏫🎙️</span>
                        <span>{isRtl ? 'اشرحي لي هذا الدرس' : 'Explain with Sara'}</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* ======================================================== */}
          {/* 4. MODAL FOOTER */}
          {/* ======================================================== */}
          <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold flex items-center gap-1">
              <span>💡</span>
              {isRtl ? 'عند اختيار الدرس، ستضعه سارة على السبورة الذكية وتشرحه لك بالصوت فوراً' : 'Selecting a lesson opens it on the Smart Whiteboard with voice'}
            </span>
            <button
              onClick={onClose}
              className="px-3 py-1 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold transition-all cursor-pointer"
            >
              {isRtl ? 'إغلاق' : 'Close'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
