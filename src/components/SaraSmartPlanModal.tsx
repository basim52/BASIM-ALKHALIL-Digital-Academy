import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Sparkles,
  CalendarDays,
  Clock,
  BookOpen,
  CheckCircle2,
  Brain,
  Rocket,
  Flame,
  Award,
  ChevronRight,
  Filter,
  Check,
  Calendar,
  Layers,
  Zap,
  ArrowRight
} from 'lucide-react';
import {
  SPECIALIZED_PLAN_TRACKS,
  SpecializedPlanTrack,
  buildSmartAcademicPlan,
  getAllCurriculumLessons,
  CurriculumLesson,
  PlanItem,
  PlanGenerationConfig
} from '../utils/academicCurriculumCatalogue';
import { UserProfile, StudyPlan } from '../types';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { playSchoolBellChime } from '../lib/audio';

interface SaraSmartPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile | null;
  isRtl?: boolean;
  onPlanGenerated: (plan: StudyPlan) => void;
  onStartFirstLesson?: (lesson: CurriculumLesson) => void;
  onViewFullPlan?: (plan: StudyPlan) => void;
}

export const SaraSmartPlanModal: React.FC<SaraSmartPlanModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  isRtl = true,
  onPlanGenerated,
  onStartFirstLesson,
  onViewFullPlan
}) => {
  const [selectedTrackId, setSelectedTrackId] = useState<string>('speak_without_fear');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [weeksToGenerate, setWeeksToGenerate] = useState<number>(4);
  const [lessonsPerDay, setLessonsPerDay] = useState<number>(1);
  const [difficultyLevel, setDifficultyLevel] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [selectedDaysMode, setSelectedDaysMode] = useState<'weekday' | 'all' | 'weekend'>('weekday');
  const [preferredTime, setPreferredTime] = useState<string>('19:00');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedPlanResult, setGeneratedPlanResult] = useState<StudyPlan | null>(null);

  const selectedTrack = SPECIALIZED_PLAN_TRACKS.find(t => t.id === selectedTrackId) || SPECIALIZED_PLAN_TRACKS[0];

  // Filtered tracks
  const filteredTracks = SPECIALIZED_PLAN_TRACKS.filter(track => {
    if (categoryFilter === 'all') return true;
    return track.category === categoryFilter;
  });

  const getDaysArray = (mode: 'weekday' | 'all' | 'weekend') => {
    if (mode === 'weekday') return [0, 1, 2, 3, 4]; // Sun to Thu
    if (mode === 'all') return [0, 1, 2, 3, 4, 5, 6]; // All days
    return [4, 5, 6]; // Thu, Fri, Sat
  };

  const handleSelectTrack = (track: SpecializedPlanTrack) => {
    setSelectedTrackId(track.id);
    if (track.recommendedDurationWeeks) {
      setWeeksToGenerate(track.recommendedDurationWeeks);
    }
    if (track.recommendedLessonsPerDay) {
      setLessonsPerDay(track.recommendedLessonsPerDay);
    }
    if (track.difficultyLevel && track.difficultyLevel !== 'all') {
      setDifficultyLevel(track.difficultyLevel as any);
    }
  };

  // Generate Smart Plan
  const handleGeneratePlan = async () => {
    setIsGenerating(true);

    try {
      const studentName = userProfile?.displayName || (userProfile as any)?.name || (isRtl ? 'بطل سارة' : 'Sara Champion');
      const today = new Date();
      const startDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      const selectedDays = getDaysArray(selectedDaysMode);

      const config: PlanGenerationConfig = {
        studentName,
        startDate,
        preferredTime,
        selectedDays,
        weeksToGenerate,
        lessonsPerDay,
        difficultyLevel,
        trackId: selectedTrackId,
        includeBiWeeklyTests: true,
        includeCatchUpDay: true,
        isRtl
      };

      const planItems: PlanItem[] = buildSmartAcademicPlan(config);

      const planData: StudyPlan = {
        userId: userProfile?.uid || 'guest',
        studentName,
        createdAt: new Date().toISOString(),
        startDate,
        preferredTime,
        selectedDays,
        selectedCategories: selectedTrack.recommendedPillars || [],
        planItems,
        lessonsPerDay,
        weeksToGenerate,
        trackId: selectedTrackId,
        trackTitleAr: selectedTrack.titleAr,
        trackTitleEn: selectedTrack.titleEn
      };

      // 1. Save to LocalStorage immediately for instant local access
      const storageKey = `sara_active_plan_${userProfile?.uid || 'guest'}`;
      try {
        localStorage.setItem(storageKey, JSON.stringify(planData));
      } catch (err) {
        console.debug('Local plan save error:', err);
      }

      // 2. Save to Firestore if authenticated
      const targetUid = auth.currentUser?.uid || userProfile?.uid;
      if (targetUid && !targetUid.startsWith('sim_')) {
        try {
          const docRef = await addDoc(collection(db, 'studyPlans'), {
            ...planData,
            userId: targetUid,
            parentIds: (userProfile as any)?.linkedParentIds || [],
            createdAt: serverTimestamp()
          });
          planData.id = docRef.id;
        } catch (e) {
          console.warn('Firestore studyPlans save notice:', e);
        }
      }

      playSchoolBellChime();
      setGeneratedPlanResult(planData);
      onPlanGenerated(planData);
    } catch (err) {
      console.error('Plan generation failed:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Find curriculum lesson for first scheduled item
  const handleStartLessonAction = () => {
    if (!generatedPlanResult || !generatedPlanResult.planItems || generatedPlanResult.planItems.length === 0) return;
    const firstItem = generatedPlanResult.planItems.find(item => !item.isCatchUpDay) || generatedPlanResult.planItems[0];
    const allLessons = getAllCurriculumLessons();
    const matched = allLessons.find(l => 
      l.id === firstItem.unitId || 
      (l.courseId === firstItem.courseId && l.level === firstItem.level) ||
      (l.titleAr && firstItem.topic && l.titleAr.includes(firstItem.topic))
    );

    const lessonToLaunch: CurriculumLesson = matched || {
      id: firstItem.unitId || `plan_first_${firstItem.id}`,
      pillarId: (firstItem as any).pillarId || firstItem.courseId || 'grammar',
      courseId: firstItem.courseId || 'general',
      courseLabelAr: firstItem.courseLabel || 'خطة سارة الذكية',
      courseLabelEn: firstItem.courseLabel || 'Sara Smart Plan',
      titleAr: firstItem.topic || 'درس خطة سارة الأول',
      titleEn: firstItem.topic || 'First Lesson',
      level: firstItem.level || 'A1',
      duration: firstItem.duration || '20 min'
    };

    onClose();
    if (onStartFirstLesson) {
      onStartFirstLesson(lessonToLaunch);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden my-auto"
        >
          {/* Top Header */}
          <div className="bg-gradient-to-r from-[#002147] via-blue-900 to-indigo-950 text-white p-5 sm:p-6 relative overflow-hidden shrink-0">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center text-2xl shadow-lg font-black shrink-0">
                  ⚡
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                      <span>{isRtl ? 'توليد خطة ذكية داخل سارة' : 'Generate Smart Plan with Sara'}</span>
                      <Sparkles size={18} className="text-amber-300 animate-pulse" />
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-blue-200 font-medium mt-0.5">
                    {isRtl
                      ? 'جدولة أكاديمية مخصصة لأهدافك ومستواك، مربوطة بالسبورة الذكية والشرح الصوتي مع سارة 👩‍🏫'
                      : 'Personalized academic schedule linked with Sara smart whiteboard and voice explanations!'}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/15"
                title={isRtl ? 'إغلاق' : 'Close'}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {!generatedPlanResult ? (
              <>
                {/* 1. Track Filter Tabs */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <label className="text-xs font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                      <Filter size={14} className="text-blue-600" />
                      <span>{isRtl ? '١. اختر المسار أو الهدف التعليمي' : '1. Choose Track or Educational Goal'}</span>
                    </label>
                    <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      {SPECIALIZED_PLAN_TRACKS.length} {isRtl ? 'مساراً معتمداً' : 'tracks'}
                    </span>
                  </div>

                  {/* Category Pills */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {[
                      { id: 'all', labelAr: '🌟 جميع المسارات', labelEn: 'All Tracks' },
                      { id: 'fluency', labelAr: '🗣️ طلاقة ومحادثة', labelEn: 'Fluency' },
                      { id: 'goal', labelAr: '🎯 أهداف وامتحانات', labelEn: 'Goals & Tests' },
                      { id: 'lifestyle', labelAr: '⏱️ أسلوب حياة وعادات', labelEn: 'Habits & Life' },
                      { id: 'kids', labelAr: '🦁 أطفال وبراعم', labelEn: 'Kids & Phonics' },
                      { id: 'ai_professional', labelAr: '🤖 ذكاء اصطناعي وتطوير', labelEn: 'AI & Growth' }
                    ].map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setCategoryFilter(cat.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer border ${
                          categoryFilter === cat.id
                            ? 'bg-[#002147] text-white border-[#002147] shadow-sm'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-transparent'
                        }`}
                      >
                        {isRtl ? cat.labelAr : cat.labelEn}
                      </button>
                    ))}
                  </div>

                  {/* Tracks Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                    {filteredTracks.map(track => {
                      const isSelected = selectedTrackId === track.id;
                      return (
                        <div
                          key={track.id}
                          onClick={() => handleSelectTrack(track)}
                          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between text-right ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50/70 shadow-md ring-2 ring-blue-500/20'
                              : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/60'
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-2.5 left-2.5 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm">
                              <Check size={14} />
                            </div>
                          )}

                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-2xl">{track.icon}</span>
                              <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 shadow-2xs">
                                {isRtl ? track.badgeAr : track.badgeEn}
                              </span>
                            </div>
                            <h4 className="text-sm font-black text-[#002147] line-clamp-1 mb-1">
                              {isRtl ? track.titleAr : track.titleEn}
                            </h4>
                            <p className="text-[11px] text-slate-600 font-medium line-clamp-2 leading-relaxed">
                              {isRtl ? track.descAr : track.descEn}
                            </p>
                          </div>

                          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-500">
                            <span className="flex items-center gap-1">
                              <Clock size={11} className="text-blue-500" />
                              <span>{track.recommendedDurationWeeks || 4} {isRtl ? 'أسابيع' : 'wks'}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <BookOpen size={11} className="text-amber-500" />
                              <span>{track.recommendedLessonsPerDay || 1} {isRtl ? 'درس/يوم' : 'lsn/day'}</span>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Configuration Parameters */}
                <div className="bg-slate-50 p-4 sm:p-5 rounded-3xl border border-slate-200/80 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-black">
                      ٢
                    </span>
                    <h3 className="text-sm font-black text-[#002147]">
                      {isRtl ? 'تخصيص معايير الخطة والأوقات' : 'Configure Schedule & Parameters'}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {/* Duration Weeks */}
                    <div className="bg-white p-3 rounded-2xl border border-slate-200">
                      <label className="text-[11px] font-black text-slate-600 block mb-1.5">
                        {isRtl ? 'مدة الخطة:' : 'Plan Duration:'}
                      </label>
                      <select
                        value={weeksToGenerate}
                        onChange={e => setWeeksToGenerate(Number(e.target.value))}
                        className="w-full text-xs font-black text-[#002147] bg-slate-50 border border-slate-200 rounded-xl p-2 cursor-pointer focus:outline-none focus:border-blue-500"
                      >
                        <option value={4}>{isRtl ? '٤ أسابيع (شهر واحد - ٣٠ يوماً)' : '4 Weeks (1 Month)'}</option>
                        <option value={8}>{isRtl ? '٨ أسابيع (شهران)' : '8 Weeks (2 Months)'}</option>
                        <option value={12}>{isRtl ? '١٢ أسبوعاً (٣ أشهر)' : '12 Weeks (3 Months)'}</option>
                        <option value={14}>{isRtl ? '١٤ أسبوعاً (رحلة الـ ١٠٠ يوم)' : '14 Weeks (100 Days)'}</option>
                      </select>
                    </div>

                    {/* Lessons per day */}
                    <div className="bg-white p-3 rounded-2xl border border-slate-200">
                      <label className="text-[11px] font-black text-slate-600 block mb-1.5">
                        {isRtl ? 'كثافة الدروس:' : 'Daily Lessons:'}
                      </label>
                      <select
                        value={lessonsPerDay}
                        onChange={e => setLessonsPerDay(Number(e.target.value))}
                        className="w-full text-xs font-black text-[#002147] bg-slate-50 border border-slate-200 rounded-xl p-2 cursor-pointer focus:outline-none focus:border-blue-500"
                      >
                        <option value={1}>{isRtl ? 'درس واحد يومياً (~١٥ دقيقة)' : '1 Lesson / day (~15m)'}</option>
                        <option value={2}>{isRtl ? 'درسان يومياً (~٣٠ دقيقة)' : '2 Lessons / day (~30m)'}</option>
                        <option value={3}>{isRtl ? '٣ دروس يومياً (~٥٠ دقيقة)' : '3 Lessons / day (~50m)'}</option>
                      </select>
                    </div>

                    {/* Difficulty */}
                    <div className="bg-white p-3 rounded-2xl border border-slate-200">
                      <label className="text-[11px] font-black text-slate-600 block mb-1.5">
                        {isRtl ? 'مستوى الطالب:' : 'Target Level:'}
                      </label>
                      <select
                        value={difficultyLevel}
                        onChange={e => setDifficultyLevel(e.target.value as any)}
                        className="w-full text-xs font-black text-[#002147] bg-slate-50 border border-slate-200 rounded-xl p-2 cursor-pointer focus:outline-none focus:border-blue-500"
                      >
                        <option value="all">{isRtl ? '🌟 تدرج شامل (All Levels)' : 'All Levels'}</option>
                        <option value="beginner">{isRtl ? '🟢 مبتدئ (A1 - A2)' : 'Beginner (A1 - A2)'}</option>
                        <option value="intermediate">{isRtl ? '🔵 متوسط (B1 - B2)' : 'Intermediate (B1 - B2)'}</option>
                        <option value="advanced">{isRtl ? '🟣 متقدم (C1 - C2)' : 'Advanced (C1 - C2)'}</option>
                      </select>
                    </div>

                    {/* Preferred Study Time */}
                    <div className="bg-white p-3 rounded-2xl border border-slate-200">
                      <label className="text-[11px] font-black text-slate-600 block mb-1.5">
                        {isRtl ? 'وقت المذاكرة المفضل:' : 'Preferred Time:'}
                      </label>
                      <select
                        value={preferredTime}
                        onChange={e => setPreferredTime(e.target.value)}
                        className="w-full text-xs font-black text-[#002147] bg-slate-50 border border-slate-200 rounded-xl p-2 cursor-pointer focus:outline-none focus:border-blue-500"
                      >
                        <option value="09:00">{isRtl ? '☀️ صباحاً (09:00 AM)' : 'Morning (09:00 AM)'}</option>
                        <option value="14:00">{isRtl ? '🌤️ ظهراً (02:00 PM)' : 'Afternoon (02:00 PM)'}</option>
                        <option value="19:00">{isRtl ? '🌆 مساءً (07:00 PM)' : 'Evening (07:00 PM)'}</option>
                        <option value="21:00">{isRtl ? '🌙 ليلاً (09:00 PM)' : 'Night (09:00 PM)'}</option>
                      </select>
                    </div>
                  </div>

                  {/* Study Days Mode */}
                  <div className="flex items-center gap-2 pt-1 flex-wrap">
                    <span className="text-xs font-black text-slate-700 ml-2">
                      {isRtl ? 'أيام الدراسة الأسبوعية:' : 'Weekly Days:'}
                    </span>
                    {[
                      { id: 'weekday', labelAr: 'نظامي: الأحد إلى الخميس (٥ أيام)', labelEn: 'Sun - Thu (5 Days)' },
                      { id: 'all', labelAr: 'مستمر: طوال أيام الأسبوع (٧ أيام)', labelEn: 'Every Day (7 Days)' },
                      { id: 'weekend', labelAr: 'مرن: نهاية الأسبوع (٣ أيام)', labelEn: 'Weekends (3 Days)' }
                    ].map(opt => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedDaysMode(opt.id as any)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                          selectedDaysMode === opt.id
                            ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                            : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        {isRtl ? opt.labelAr : opt.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Summary calculation badge */}
                <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent p-4 rounded-2xl border border-amber-300/40 flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-700 flex items-center justify-center text-xl shrink-0">
                      💡
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-800">
                        {isRtl ? 'تقدير الخطة الذكية:' : 'Smart Plan Estimate:'}
                      </p>
                      <p className="text-[11px] text-slate-600 font-medium">
                        {isRtl
                          ? `ستتضمن خطتك قرابة ${weeksToGenerate * (selectedDaysMode === 'all' ? 7 : (selectedDaysMode === 'weekend' ? 3 : 5)) * lessonsPerDay} درساً مقسمة بانتظام، مع اختبارات قياس ومحطات مراجعة لسد الثغرات!`
                          : `Plan includes approx. ${weeksToGenerate * (selectedDaysMode === 'all' ? 7 : (selectedDaysMode === 'weekend' ? 3 : 5)) * lessonsPerDay} lessons with review and milestones!`}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Success Result View */
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 px-4 sm:px-8 text-center space-y-6"
              >
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500 to-green-400 text-white flex items-center justify-center text-4xl mx-auto shadow-xl ring-8 ring-emerald-50">
                  🎉
                </div>

                <div>
                  <h3 className="text-2xl font-black text-[#002147] mb-1">
                    {isRtl ? 'تم توليد خطتك الذكية بنجاح يا بطل!' : 'Smart Plan Generated Successfully!'}
                  </h3>
                  <p className="text-sm text-slate-600 font-medium max-w-lg mx-auto leading-relaxed">
                    {isRtl
                      ? `تم بناء خطة "${generatedPlanResult.trackTitleAr}" بنجاح، وتضم ${generatedPlanResult.planItems?.length || 0} درساً أكاديمياً مربوطة بالسبورة الذكية مع سارة.`
                      : `"${generatedPlanResult.trackTitleEn}" generated with ${generatedPlanResult.planItems?.length || 0} academic lessons linked to Sara whiteboard.`}
                  </p>
                </div>

                {/* First Lesson Feature Box */}
                {generatedPlanResult.planItems?.[0] && (
                  <div className="bg-slate-50 border-2 border-blue-200/80 rounded-2xl p-4 text-right max-w-md mx-auto shadow-sm">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      {isRtl ? '🚀 درسك الأول المجدول:' : 'First Scheduled Lesson:'}
                    </span>
                    <h4 className="text-base font-black text-[#002147] mt-1.5">
                      {generatedPlanResult.planItems[0].topic}
                    </h4>
                    <p className="text-xs text-slate-500 font-bold mt-0.5">
                      {generatedPlanResult.planItems[0].courseLabel} • {generatedPlanResult.planItems[0].duration}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-center gap-3 flex-wrap pt-2">
                  <button
                    onClick={handleStartLessonAction}
                    className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
                  >
                    <Rocket size={18} />
                    <span>{isRtl ? 'ابدأ الدرس الأول الآن مع سارة 🚀' : 'Start First Lesson Now'}</span>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      if (onViewFullPlan) onViewFullPlan(generatedPlanResult);
                    }}
                    className="px-5 py-3.5 rounded-2xl bg-[#002147] hover:bg-blue-900 text-white font-black text-sm flex items-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer"
                  >
                    <CalendarDays size={18} />
                    <span>{isRtl ? 'عرض الخطة كاملة في الجدول 🗓️' : 'View Full Schedule'}</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Bottom Footer Action */}
          {!generatedPlanResult && (
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-600 font-black text-xs transition-all cursor-pointer"
              >
                {isRtl ? 'إلغاء' : 'Cancel'}
              </button>

              <button
                type="button"
                disabled={isGenerating}
                onClick={handleGeneratePlan}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-blue-600/30 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{isRtl ? 'جارٍ توليد الخطة الذكية...' : 'Generating Smart Plan...'}</span>
                  </>
                ) : (
                  <>
                    <Zap size={16} className="text-amber-300 fill-amber-300" />
                    <span>{isRtl ? 'توليد الخطة الذكية الآن بواسطة سارة ⚡' : 'Generate Smart Plan Now ⚡'}</span>
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
