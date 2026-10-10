import React, { useState, useMemo } from 'react';
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
  ChevronLeft,
  Filter,
  Check,
  Calendar,
  Layers,
  Zap,
  ArrowRight,
  Sliders,
  PenTool,
  MessageSquare,
  Mic,
  Volume2,
  Baby,
  Gamepad2,
  Globe,
  BookMarked,
  Video,
  Cpu,
  CheckSquare,
  Square,
  Sun,
  Moon
} from 'lucide-react';
import {
  SPECIALIZED_PLAN_TRACKS,
  SpecializedPlanTrack,
  ACADEMIC_SECTION_DEFINITIONS,
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

type ModalTab = 'track' | 'pillars' | 'days_sessions' | 'schedule_options';

const DAYS_OF_WEEK = [
  { index: 0, ar: 'الأحد', en: 'Sun' },
  { index: 1, ar: 'الاثنين', en: 'Mon' },
  { index: 2, ar: 'الثلاثاء', en: 'Tue' },
  { index: 3, ar: 'الأربعاء', en: 'Wed' },
  { index: 4, ar: 'الخميس', en: 'Thu' },
  { index: 5, ar: 'الجمعة', en: 'Fri' },
  { index: 6, ar: 'السبت', en: 'Sat' }
];

const SESSIONS_OPTIONS = [
  {
    count: 1,
    titleAr: 'حصة واحدة يومياً',
    titleEn: '1 Lesson / day',
    descAr: 'جلسة خفيفة ومريحة (~١٥ دقيقة)',
    descEn: 'Light & breezy (~15 min)',
    badgeAr: 'مرن وسهل',
    badgeEn: 'Flexible'
  },
  {
    count: 2,
    titleAr: 'حصتان يومياً',
    titleEn: '2 Lessons / day',
    descAr: 'وتيرة متوازنة ومنتظمة (~٣٠ دقيقة)',
    descEn: 'Balanced pace (~30 min)',
    badgeAr: 'الموصى به ⭐',
    badgeEn: 'Recommended ⭐'
  },
  {
    count: 3,
    titleAr: '٣ حصص يومياً',
    titleEn: '3 Lessons / day',
    descAr: 'وتيرة مكثفة وتقدم سريع (~٤٥ دقيقة)',
    descEn: 'Intensive pace (~45 min)',
    badgeAr: 'تقدم سريع 🚀',
    badgeEn: 'Fast-Track 🚀'
  },
  {
    count: 4,
    titleAr: '٤ حصص يومياً',
    titleEn: '4 Lessons / day',
    descAr: 'معسكر تدريبي مركز (~٦٠ دقيقة)',
    descEn: 'Deep immersion (~60 min)',
    badgeAr: 'معسكر مكثف 🔥',
    badgeEn: 'Bootcamp 🔥'
  },
  {
    count: 5,
    titleAr: '٥ حصص يومياً',
    titleEn: '5 Lessons / day',
    descAr: 'ماراثون أكاديمي شامل (~٧٥ دقيقة)',
    descEn: 'Academic marathon (~75 min)',
    badgeAr: 'أقصى طاقة ⚡',
    badgeEn: 'Maximum ⚡'
  }
];

const DURATION_OPTIONS = [
  { weeks: 4, labelAr: '٤ أسابيع (شهر واحد - ٣٠ يوماً)', labelEn: '4 Weeks (1 Month)', badgeAr: 'انطلاقة سريعة' },
  { weeks: 8, labelAr: '٨ أسابيع (شهران - ٦٠ يوماً)', labelEn: '8 Weeks (2 Months)', badgeAr: 'تثبيت العادة' },
  { weeks: 12, labelAr: '١٢ أسبوعاً (٣ أشهر - ٩٠ يوماً)', labelEn: '12 Weeks (3 Months)', badgeAr: 'تحول شامل ⭐' },
  { weeks: 14, labelAr: '١٤ أسبوعاً (تحدي الـ ١٠٠ يوم)', labelEn: '14 Weeks (100 Days)', badgeAr: 'رحلة المائة يوم 🏆' },
  { weeks: 16, labelAr: '١٦ أسبوعاً (فصل أكاديمي كامل)', labelEn: '16 Weeks (Semester)', badgeAr: 'دبلوم متكامل' }
];

const DIFFICULTY_OPTIONS = [
  { value: 'all', labelAr: '🌟 شامل كل المستويات (تدرج تلقائي)', labelEn: 'All Levels (Adaptive)', descAr: 'تبدأ الخطة من مستواك وتتصاعد تدريجياً لضمان الشمولية' },
  { value: 'beginner', labelAr: '🟢 مبتدئ وبراعم (A1 - A2)', labelEn: 'Beginner (A1 - A2)', descAr: 'تركيز على الأساسيات، الكلمات الأولى، وتراكيب الجمل المبسطة' },
  { value: 'intermediate', labelAr: '🔵 متوسط ويافعين (B1 - B2)', labelEn: 'Intermediate (B1 - B2)', descAr: 'تراكيب متقدمة، طلاقة محادثة، وقراءة استيعابية عميقة' },
  { value: 'advanced', labelAr: '🟣 متقدم وكبار (C1 - C2)', labelEn: 'Advanced (C1 - C2)', descAr: 'احتراف بلاغي، نقاشات حية، ومفردات تخصصية واختبارات دولية' }
];

export const SaraSmartPlanModal: React.FC<SaraSmartPlanModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  isRtl = true,
  onPlanGenerated,
  onStartFirstLesson,
  onViewFullPlan
}) => {
  // Navigation tab
  const [activeTab, setActiveTab] = useState<ModalTab>('track');

  // Track selection
  const [selectedTrackId, setSelectedTrackId] = useState<string>('speak_without_fear');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Included Subjects/Curriculum Pillars (المقررات)
  const [selectedPillars, setSelectedPillars] = useState<string[]>(
    ACADEMIC_SECTION_DEFINITIONS.map(p => p.id)
  );

  // Weekly Study Days (الأيام)
  const [selectedDays, setSelectedDays] = useState<number[]>([0, 1, 2, 3, 4]); // Sun to Thu

  // Daily Lessons / Sessions (عدد الحصص)
  const [lessonsPerDay, setLessonsPerDay] = useState<number>(2);

  // Plan Duration (المدة الزمنية)
  const [weeksToGenerate, setWeeksToGenerate] = useState<number>(4);

  // Target Difficulty (المستوى المستهدف)
  const [difficultyLevel, setDifficultyLevel] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

  // Start Date (تاريخ البدء)
  const todayStr = useMemo(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  }, []);
  const [startDate, setStartDate] = useState<string>(todayStr);

  // Preferred Time (الوقت المفضل)
  const [preferredTime, setPreferredTime] = useState<string>('19:00');

  // Additional Pedagogical Toggles
  const [includeBiWeeklyTests, setIncludeBiWeeklyTests] = useState<boolean>(true);
  const [includeCatchUpDay, setIncludeCatchUpDay] = useState<boolean>(true);

  // Generation status & result
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedPlanResult, setGeneratedPlanResult] = useState<StudyPlan | null>(null);

  // All unified lessons cached
  const allCurriculumLessons = useMemo(() => getAllCurriculumLessons(), []);

  const selectedTrack = useMemo(() => {
    return SPECIALIZED_PLAN_TRACKS.find(t => t.id === selectedTrackId) || SPECIALIZED_PLAN_TRACKS[0];
  }, [selectedTrackId]);

  // Filtered tracks
  const filteredTracks = useMemo(() => {
    return SPECIALIZED_PLAN_TRACKS.filter(track => {
      if (categoryFilter === 'all') return true;
      return track.category === categoryFilter;
    });
  }, [categoryFilter]);

  // Toggle individual study day
  const toggleDay = (dayIndex: number) => {
    if (selectedDays.includes(dayIndex)) {
      if (selectedDays.length > 1) {
        setSelectedDays(selectedDays.filter(d => d !== dayIndex));
      }
    } else {
      setSelectedDays([...selectedDays, dayIndex].sort((a, b) => a - b));
    }
  };

  // Set day presets
  const setDaysPreset = (preset: 'weekdays' | 'all' | 'weekend' | 'three_days') => {
    if (preset === 'weekdays') setSelectedDays([0, 1, 2, 3, 4]); // Sun - Thu
    else if (preset === 'all') setSelectedDays([0, 1, 2, 3, 4, 5, 6]); // 7 Days
    else if (preset === 'weekend') setSelectedDays([4, 5, 6]); // Thu, Fri, Sat
    else if (preset === 'three_days') setSelectedDays([0, 2, 4]); // Sun, Tue, Thu
  };

  // Toggle individual pillar / curriculum subject
  const togglePillar = (pillarId: string) => {
    if (selectedPillars.includes(pillarId)) {
      if (selectedPillars.length > 1) {
        setSelectedPillars(selectedPillars.filter(id => id !== pillarId));
      }
    } else {
      setSelectedPillars([...selectedPillars, pillarId]);
    }
  };

  // Select all pillars
  const handleSelectAllPillars = () => {
    setSelectedPillars(ACADEMIC_SECTION_DEFINITIONS.map(p => p.id));
  };

  // Clear pillars (keep at least one core)
  const handleClearPillars = () => {
    setSelectedPillars(['grammar', 'reading', 'conversation']);
  };

  // Reset pillars to current track's recommended list
  const handleResetPillarsToTrack = () => {
    if (selectedTrack.recommendedPillars && selectedTrack.recommendedPillars.length > 0) {
      setSelectedPillars(selectedTrack.recommendedPillars);
    } else {
      handleSelectAllPillars();
    }
  };

  // Track selection handler with auto-tuning
  const handleSelectTrack = (track: SpecializedPlanTrack) => {
    setSelectedTrackId(track.id);
    if (track.recommendedDurationWeeks) {
      setWeeksToGenerate(track.recommendedDurationWeeks);
    }
    if (track.recommendedLessonsPerDay) {
      setLessonsPerDay(track.recommendedLessonsPerDay);
    }
    if (track.recommendedDays && track.recommendedDays.length > 0) {
      setSelectedDays(track.recommendedDays);
    }
    if (track.recommendedPillars && track.recommendedPillars.length > 0) {
      setSelectedPillars(track.recommendedPillars);
    }
    if (track.difficultyLevel && track.difficultyLevel !== 'all') {
      setDifficultyLevel(track.difficultyLevel as any);
    }
  };

  // Calculate live estimate stats
  const totalEstimatedLessons = useMemo(() => {
    return weeksToGenerate * selectedDays.length * lessonsPerDay;
  }, [weeksToGenerate, selectedDays.length, lessonsPerDay]);

  const estimatedDailyMinutes = useMemo(() => {
    return lessonsPerDay * 15;
  }, [lessonsPerDay]);

  const estimatedEndDate = useMemo(() => {
    try {
      const d = new Date(startDate || todayStr);
      if (isNaN(d.getTime())) return '';
      d.setDate(d.getDate() + (weeksToGenerate * 7));
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    } catch {
      return '';
    }
  }, [startDate, todayStr, weeksToGenerate]);

  // Quick date pickers
  const handleSetQuickDate = (type: 'today' | 'tomorrow' | 'next_sunday') => {
    const d = new Date();
    if (type === 'tomorrow') {
      d.setDate(d.getDate() + 1);
    } else if (type === 'next_sunday') {
      const day = d.getDay();
      const diff = day === 0 ? 7 : (7 - day);
      d.setDate(d.getDate() + diff);
    }
    setStartDate(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`);
  };

  // Render pillar icon
  const renderPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return <Brain size={18} className="text-blue-600" />;
      case 'BookOpen': return <BookOpen size={18} className="text-emerald-600" />;
      case 'PenTool': return <PenTool size={18} className="text-purple-600" />;
      case 'MessageSquare': return <MessageSquare size={18} className="text-cyan-600" />;
      case 'Award': return <Award size={18} className="text-amber-600" />;
      case 'Mic': return <Mic size={18} className="text-orange-600" />;
      case 'Volume2': return <Volume2 size={18} className="text-indigo-600" />;
      case 'Baby': return <Baby size={18} className="text-pink-500" />;
      case 'Sparkles': return <Sparkles size={18} className="text-sky-600" />;
      case 'Flame': return <Flame size={18} className="text-rose-600" />;
      case 'Gamepad2': return <Gamepad2 size={18} className="text-violet-600" />;
      case 'Globe': return <Globe size={18} className="text-teal-600" />;
      case 'BookMarked': return <BookMarked size={18} className="text-amber-700" />;
      case 'Video': return <Video size={18} className="text-rose-600" />;
      case 'Cpu': return <Cpu size={18} className="text-violet-600" />;
      default: return <BookOpen size={18} className="text-blue-600" />;
    }
  };

  // Generate Smart Plan
  const handleGeneratePlan = async () => {
    setIsGenerating(true);

    try {
      const studentName = userProfile?.displayName || (userProfile as any)?.name || (isRtl ? 'بطل سارة' : 'Sara Champion');
      const sortedDays = [...selectedDays].sort((a, b) => a - b);

      const config: PlanGenerationConfig = {
        studentName,
        startDate: startDate || todayStr,
        preferredTime,
        selectedDays: sortedDays,
        weeksToGenerate,
        lessonsPerDay,
        difficultyLevel,
        selectedPillars,
        trackId: selectedTrackId,
        includeBiWeeklyTests,
        includeCatchUpDay,
        isRtl
      };

      const planItems: PlanItem[] = buildSmartAcademicPlan(config);

      const planData: StudyPlan = {
        userId: userProfile?.uid || 'guest',
        studentName,
        createdAt: new Date().toISOString(),
        startDate: startDate || todayStr,
        preferredTime,
        selectedDays: sortedDays,
        selectedCategories: selectedPillars,
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
        localStorage.setItem(`academic_saved_plans_${userProfile?.uid || 'guest'}`, JSON.stringify([planData]));
      } catch (err) {
        console.debug('Local plan save notice:', err);
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
          console.warn('Firestore studyPlans save note:', e);
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

  // Launch first lesson with Sara
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
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full max-w-5xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden my-auto"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#002147] via-blue-900 to-indigo-950 text-white p-4 sm:p-6 relative overflow-hidden shrink-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center text-2xl shadow-lg font-black shrink-0">
                  ⚡
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                      <span>{isRtl ? 'الخطة الذكية في سارة' : 'Sara Smart Academic Planner'}</span>
                      <Sparkles size={18} className="text-amber-300 animate-pulse" />
                    </h2>
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/30">
                      {isRtl ? 'خيارات مخصصة متكاملة' : 'Full Custom Parameters'}
                    </span>
                  </div>
                  <p className="text-xs text-blue-200 font-medium mt-0.5 line-clamp-1">
                    {isRtl
                      ? 'حدد المقررات، عدد الحصص، أيام الأسبوع، والمدة لتولد سارة جدولاً أكاديمياً مربوطاً بالسبورة والذكاء الاصطناعي 👩‍🏫'
                      : 'Customize courses, session counts, days, and duration for Sara to generate a tailored roadmap!'}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/15 shrink-0"
                title={isRtl ? 'إغلاق' : 'Close'}
              >
                <X size={20} />
              </button>
            </div>

            {/* Quick Status Badges Row on Header */}
            {!generatedPlanResult && (
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10 overflow-x-auto scrollbar-none text-[11px] font-bold">
                <span className="px-2.5 py-1 rounded-xl bg-white/10 text-amber-300 border border-amber-300/20 whitespace-nowrap flex items-center gap-1.5">
                  <span>🎯</span>
                  <span>{isRtl ? selectedTrack.titleAr : selectedTrack.titleEn}</span>
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-white/10 text-blue-200 border border-blue-300/20 whitespace-nowrap flex items-center gap-1.5">
                  <BookOpen size={12} />
                  <span>{selectedPillars.length} {isRtl ? 'مقررات مشمولة' : 'courses'}</span>
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-white/10 text-emerald-200 border border-emerald-300/20 whitespace-nowrap flex items-center gap-1.5">
                  <CalendarDays size={12} />
                  <span>{selectedDays.length} {isRtl ? 'أيام أسبوعياً' : 'days/wk'}</span>
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-white/10 text-purple-200 border border-purple-300/20 whitespace-nowrap flex items-center gap-1.5">
                  <Clock size={12} />
                  <span>{lessonsPerDay} {isRtl ? 'حصص/يوم' : 'lessons/day'}</span>
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-white/10 text-yellow-200 border border-yellow-300/20 whitespace-nowrap flex items-center gap-1.5">
                  <Flame size={12} />
                  <span>{weeksToGenerate} {isRtl ? 'أسابيع' : 'wks'}</span>
                </span>
              </div>
            )}
          </div>

          {/* Navigation Tabs (Available when building plan) */}
          {!generatedPlanResult && (
            <div className="bg-slate-100 border-b border-slate-200 px-4 sm:px-6 pt-3 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
              {[
                {
                  id: 'track' as ModalTab,
                  labelAr: '🎯 ١. المسار التخصصي',
                  labelEn: '1. Track Archetype',
                  subAr: selectedTrack.badgeAr
                },
                {
                  id: 'pillars' as ModalTab,
                  labelAr: `📚 ٢. المقررات (${selectedPillars.length})`,
                  labelEn: `2. Courses (${selectedPillars.length})`,
                  subAr: `${selectedPillars.length}/${ACADEMIC_SECTION_DEFINITIONS.length} مقرر`
                },
                {
                  id: 'days_sessions' as ModalTab,
                  labelAr: `🗓️ ٣. الأيام والحصص`,
                  labelEn: `3. Days & Sessions`,
                  subAr: `${selectedDays.length} أيام • ${lessonsPerDay} حصص`
                },
                {
                  id: 'schedule_options' as ModalTab,
                  labelAr: `⚙️ ٤. الجدولة والخيارات`,
                  labelEn: `4. Schedule & Options`,
                  subAr: `${weeksToGenerate} أسابيع • ${preferredTime}`
                }
              ].map(tab => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2.5 rounded-t-2xl font-black text-xs transition-all cursor-pointer relative whitespace-nowrap flex flex-col items-center gap-0.5 border-t border-x ${
                      isActive
                        ? 'bg-white text-blue-600 border-slate-200 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-200/60'
                    }`}
                  >
                    <span>{isRtl ? tab.labelAr : tab.labelEn}</span>
                    <span className="text-[10px] font-bold text-slate-400">
                      {tab.subAr}
                    </span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Modal Content Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {!generatedPlanResult ? (
              <>
                {/* TAB 1: 🎯 TRACK ARCHETYPE */}
                {activeTab === 'track' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div>
                        <h3 className="text-sm font-black text-[#002147] flex items-center gap-2">
                          <Filter size={16} className="text-blue-600" />
                          <span>{isRtl ? 'اختر مسارك الأكاديمي أو هدفك التخصصي' : 'Select Target Track or Educational Archetype'}</span>
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">
                          {isRtl
                            ? 'يقترح المسار المقررات الموصى بها ووتيرة التعلم، ويمكنك تعديلها وتخصيصها بالكامل في التبويبات التالية.'
                            : 'The track configures recommended pillars and pace, fully customizable in subsequent tabs.'}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-xl text-xs font-black border border-blue-200">
                        <span>{SPECIALIZED_PLAN_TRACKS.length}</span>
                        <span>{isRtl ? 'مساراً معتمداً' : 'tracks'}</span>
                      </div>
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                      {[
                        { id: 'all', labelAr: '🌟 جميع المسارات', labelEn: 'All Tracks' },
                        { id: 'fluency', labelAr: '🗣️ طلاقة ومحادثة', labelEn: 'Fluency' },
                        { id: 'goal', labelAr: '🎯 أهداف وامتحانات', labelEn: 'Goals & Tests' },
                        { id: 'lifestyle', labelAr: '⏱️ عادات ونمط حياة', labelEn: 'Habits & Life' },
                        { id: 'kids', labelAr: '🦁 أطفال وتأسيس', labelEn: 'Kids & Phonics' },
                        { id: 'ai_professional', labelAr: '🤖 ذكاء اصطناعي وتطوير ذات', labelEn: 'AI & Growth' }
                      ].map(cat => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setCategoryFilter(cat.id)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer border ${
                            categoryFilter === cat.id
                              ? 'bg-[#002147] text-white border-[#002147] shadow-xs'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200/60'
                          }`}
                        >
                          {isRtl ? cat.labelAr : cat.labelEn}
                        </button>
                      ))}
                    </div>

                    {/* Tracks Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
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
                                <span>{track.recommendedLessonsPerDay || 2} {isRtl ? 'حصص/يوم' : 'lsn/day'}</span>
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar size={11} className="text-emerald-500" />
                                <span>{track.recommendedDays?.length || 5} {isRtl ? 'أيام' : 'days'}</span>
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* TAB 2: 📚 CURRICULUM SUBJECTS (المقررات والأقسام) */}
                {activeTab === 'pillars' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3 flex-wrap bg-slate-50 p-4 rounded-2xl border border-slate-200">
                      <div>
                        <h3 className="text-sm font-black text-[#002147] flex items-center gap-2">
                          <BookOpen size={16} className="text-blue-600" />
                          <span>{isRtl ? 'المقررات والأقسام الأكاديمية المشمولة بالخطة' : 'Curriculum Courses & Included Academic Pillars'}</span>
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">
                          {isRtl
                            ? `حدد المقررات التي ترغب بدراستها في جدولك الأكاديمي (${selectedPillars.length} من أصل ${ACADEMIC_SECTION_DEFINITIONS.length} مقرر مختارة).`
                            : `Select courses to include in your schedule (${selectedPillars.length}/${ACADEMIC_SECTION_DEFINITIONS.length} selected).`}
                        </p>
                      </div>

                      {/* Quick Actions for Pillars */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={handleSelectAllPillars}
                          className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-black hover:bg-blue-700 transition-colors cursor-pointer shadow-xs"
                        >
                          {isRtl ? '✓ تحديد جميع المقررات' : '✓ Select All'}
                        </button>
                        <button
                          type="button"
                          onClick={handleResetPillarsToTrack}
                          className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black hover:bg-amber-200 transition-colors cursor-pointer"
                        >
                          {isRtl ? '🎯 مقترحات المسار المختار' : '🎯 Track Defaults'}
                        </button>
                        <button
                          type="button"
                          onClick={handleClearPillars}
                          className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-black transition-colors cursor-pointer"
                        >
                          {isRtl ? 'مسح التحديد' : 'Clear'}
                        </button>
                      </div>
                    </div>

                    {/* Courses Multi-Select Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {ACADEMIC_SECTION_DEFINITIONS.map(pillar => {
                        const isSelected = selectedPillars.includes(pillar.id);
                        const pillarLessonCount = allCurriculumLessons.filter(l => l.pillarId === pillar.id).length;

                        return (
                          <div
                            key={pillar.id}
                            onClick={() => togglePillar(pillar.id)}
                            className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                              isSelected
                                ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-1 ring-blue-500/20'
                                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80 opacity-70'
                            }`}
                          >
                            <div>
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-2xs shrink-0">
                                    {renderPillarIcon(pillar.iconName)}
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-black text-[#002147] line-clamp-1">
                                      {isRtl ? pillar.nameAr : pillar.nameEn}
                                    </h4>
                                    <span className="text-[10px] font-bold text-slate-400">
                                      {pillarLessonCount > 0 ? `${pillarLessonCount} ${isRtl ? 'درساً متوافراً' : 'lessons'}` : (isRtl ? 'منهج متكامل' : 'Core module')}
                                    </span>
                                  </div>
                                </div>

                                <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                                  isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
                                }`}>
                                  {isSelected && <Check size={13} strokeWidth={3} />}
                                </div>
                              </div>

                              <p className="text-[11px] text-slate-600 font-medium line-clamp-2 leading-relaxed">
                                {isRtl ? pillar.descAr : pillar.descEn}
                              </p>
                            </div>

                            <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-black">
                              <span className={isSelected ? 'text-blue-700' : 'text-slate-400'}>
                                {isSelected ? (isRtl ? 'مشمول في الخطة ✓' : 'Included ✓') : (isRtl ? 'غير مشمول' : 'Excluded')}
                              </span>
                              <span className="text-slate-400 font-mono text-[9px]">
                                {pillar.id}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* TAB 3: 🗓️ DAYS & SESSIONS (الأيام وعدد الحصص) */}
                {activeTab === 'days_sessions' && (
                  <div className="space-y-6">
                    {/* 1. Study Days Section */}
                    <div className="bg-slate-50 p-4 sm:p-5 rounded-3xl border border-slate-200/80 space-y-4">
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div>
                          <h3 className="text-sm font-black text-[#002147] flex items-center gap-2">
                            <CalendarDays size={16} className="text-blue-600" />
                            <span>{isRtl ? 'أيام الدراسة الأسبوعية' : 'Weekly Study Days'}</span>
                          </h3>
                          <p className="text-xs text-slate-500 font-medium">
                            {isRtl
                              ? `اضغط على أي يوم لتفعيله أو إلغائه (${selectedDays.length} أيام مختارة أسبوعياً).`
                              : `Click any day to toggle on/off (${selectedDays.length} days selected).`}
                          </p>
                        </div>

                        {/* Presets */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <button
                            type="button"
                            onClick={() => setDaysPreset('weekdays')}
                            className="px-3 py-1 rounded-xl bg-white border border-slate-200 hover:border-blue-400 text-slate-700 text-xs font-black transition-all cursor-pointer shadow-2xs"
                          >
                            {isRtl ? 'أيام العمل (الأحد - الخميس)' : 'Sun - Thu (5 Days)'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setDaysPreset('all')}
                            className="px-3 py-1 rounded-xl bg-white border border-slate-200 hover:border-blue-400 text-slate-700 text-xs font-black transition-all cursor-pointer shadow-2xs"
                          >
                            {isRtl ? 'طوال الأسبوع (٧ أيام)' : 'All 7 Days'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setDaysPreset('weekend')}
                            className="px-3 py-1 rounded-xl bg-white border border-slate-200 hover:border-blue-400 text-slate-700 text-xs font-black transition-all cursor-pointer shadow-2xs"
                          >
                            {isRtl ? 'نهاية الأسبوع (الخميس - السبت)' : 'Weekend (3 Days)'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setDaysPreset('three_days')}
                            className="px-3 py-1 rounded-xl bg-white border border-slate-200 hover:border-blue-400 text-slate-700 text-xs font-black transition-all cursor-pointer shadow-2xs"
                          >
                            {isRtl ? 'موزع (أحد - ثلاثاء - خميس)' : 'Sun / Tue / Thu'}
                          </button>
                        </div>
                      </div>

                      {/* 7 Days Interactive Buttons */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                        {DAYS_OF_WEEK.map(day => {
                          const isSelected = selectedDays.includes(day.index);
                          return (
                            <button
                              key={day.index}
                              type="button"
                              onClick={() => toggleDay(day.index)}
                              className={`py-3 px-2 rounded-2xl border-2 font-black transition-all text-center cursor-pointer flex flex-col items-center justify-center gap-1 ${
                                isSelected
                                  ? 'border-blue-600 bg-blue-600 text-white shadow-md ring-2 ring-blue-500/20 scale-[1.02]'
                                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center gap-1">
                                <span className="text-xs sm:text-sm font-black">{isRtl ? day.ar : day.en}</span>
                                {isSelected && <Check size={14} className="text-amber-300" strokeWidth={3} />}
                              </div>
                              <span className={`text-[10px] font-bold ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                                {day.en}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 2. Daily Lessons / Sessions Count Section */}
                    <div className="bg-slate-50 p-4 sm:p-5 rounded-3xl border border-slate-200/80 space-y-4">
                      <div>
                        <h3 className="text-sm font-black text-[#002147] flex items-center gap-2">
                          <Sliders size={16} className="text-blue-600" />
                          <span>{isRtl ? 'عدد الحصص والدروس اليومية' : 'Daily Lessons & Session Frequency'}</span>
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">
                          {isRtl
                            ? 'اختر عدد الحصص التي تدرسها مع سارة يومياً في أيام جدولك المعتمدة.'
                            : 'Choose how many lessons to study with Sara per active study day.'}
                        </p>
                      </div>

                      {/* 5 Sessions Cards Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                        {SESSIONS_OPTIONS.map(opt => {
                          const isSelected = lessonsPerDay === opt.count;
                          return (
                            <div
                              key={opt.count}
                              onClick={() => setLessonsPerDay(opt.count)}
                              className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between text-right ${
                                isSelected
                                  ? 'border-blue-600 bg-white shadow-md ring-2 ring-blue-500/20 scale-[1.02]'
                                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70'
                              }`}
                            >
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <div className={`w-8 h-8 rounded-xl font-black text-sm flex items-center justify-center ${
                                    isSelected ? 'bg-blue-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-700'
                                  }`}>
                                    {opt.count}
                                  </div>
                                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-md ${
                                    isSelected ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-slate-100 text-slate-500'
                                  }`}>
                                    {isRtl ? opt.badgeAr : opt.badgeEn}
                                  </span>
                                </div>

                                <h4 className="text-xs font-black text-[#002147] mb-1">
                                  {isRtl ? opt.titleAr : opt.titleEn}
                                </h4>
                                <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                                  {isRtl ? opt.descAr : opt.descEn}
                                </p>
                              </div>

                              <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] font-bold text-blue-600 flex items-center justify-between">
                                <span>~{opt.count * 15} {isRtl ? 'دقيقة/يوم' : 'min/day'}</span>
                                {isSelected && <Check size={12} strokeWidth={3} />}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: ⚙️ SCHEDULE & ADVANCED OPTIONS (الجدولة والخيارات) */}
                {activeTab === 'schedule_options' && (
                  <div className="space-y-5">
                    {/* 1. Plan Duration */}
                    <div className="bg-slate-50 p-4 sm:p-5 rounded-3xl border border-slate-200/80 space-y-3">
                      <label className="text-xs font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                        <Clock size={14} className="text-blue-600" />
                        <span>{isRtl ? 'المدة الزمنية للخطة' : 'Plan Duration'}</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                        {DURATION_OPTIONS.map(opt => {
                          const isSelected = weeksToGenerate === opt.weeks;
                          return (
                            <button
                              key={opt.weeks}
                              type="button"
                              onClick={() => setWeeksToGenerate(opt.weeks)}
                              className={`p-3 rounded-2xl border-2 font-black text-xs text-right transition-all cursor-pointer flex items-center justify-between gap-2 ${
                                isSelected
                                  ? 'border-blue-600 bg-white text-[#002147] shadow-md ring-2 ring-blue-500/20'
                                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                              }`}
                            >
                              <div>
                                <span className="block font-black text-xs">
                                  {isRtl ? opt.labelAr : opt.labelEn}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400 mt-0.5 block">
                                  {isRtl ? opt.badgeAr : opt.labelEn}
                                </span>
                              </div>
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                                isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'
                              }`}>
                                {isSelected && <Check size={12} />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 2. Target Level & Start Date & Time in a Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* Target Difficulty */}
                      <div className="bg-slate-50 p-4 sm:p-5 rounded-3xl border border-slate-200/80 space-y-3">
                        <label className="text-xs font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                          <Brain size={14} className="text-blue-600" />
                          <span>{isRtl ? 'المستوى الدراسي المستهدف' : 'Target Difficulty Level'}</span>
                        </label>
                        <div className="space-y-2">
                          {DIFFICULTY_OPTIONS.map(opt => {
                            const isSelected = difficultyLevel === opt.value;
                            return (
                              <div
                                key={opt.value}
                                onClick={() => setDifficultyLevel(opt.value as any)}
                                className={`p-2.5 px-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-2 ${
                                  isSelected
                                    ? 'border-blue-600 bg-white shadow-xs text-[#002147]'
                                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                                }`}
                              >
                                <div>
                                  <span className="text-xs font-black block">
                                    {isRtl ? opt.labelAr : opt.labelEn}
                                  </span>
                                  <span className="text-[10px] text-slate-400 font-medium block">
                                    {isRtl ? opt.descAr : ''}
                                  </span>
                                </div>
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border ${
                                  isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'
                                }`}>
                                  {isSelected && <Check size={10} />}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Start Date & Preferred Time */}
                      <div className="bg-slate-50 p-4 sm:p-5 rounded-3xl border border-slate-200/80 space-y-4">
                        {/* Start Date */}
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs font-black text-slate-700 flex items-center gap-1.5">
                              <Calendar size={14} className="text-blue-600" />
                              <span>{isRtl ? 'تاريخ بدء الخطة:' : 'Start Date:'}</span>
                            </label>
                            <div className="flex items-center gap-1 text-[10px] font-black">
                              <button
                                type="button"
                                onClick={() => handleSetQuickDate('today')}
                                className="text-blue-600 hover:underline cursor-pointer"
                              >
                                {isRtl ? 'اليوم' : 'Today'}
                              </button>
                              <span className="text-slate-300">|</span>
                              <button
                                type="button"
                                onClick={() => handleSetQuickDate('tomorrow')}
                                className="text-slate-500 hover:underline cursor-pointer"
                              >
                                {isRtl ? 'غداً' : 'Tomorrow'}
                              </button>
                              <span className="text-slate-300">|</span>
                              <button
                                type="button"
                                onClick={() => handleSetQuickDate('next_sunday')}
                                className="text-slate-500 hover:underline cursor-pointer"
                              >
                                {isRtl ? 'الأحد القادم' : 'Next Sun'}
                              </button>
                            </div>
                          </div>
                          <input
                            type="date"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                            className="w-full text-xs font-black text-[#002147] bg-white border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        {/* Preferred Time */}
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs font-black text-slate-700 flex items-center gap-1.5">
                              <Clock size={14} className="text-blue-600" />
                              <span>{isRtl ? 'وقت المذاكرة المفضل:' : 'Preferred Time:'}</span>
                            </label>
                            <div className="flex items-center gap-1 text-[10px] font-black">
                              {[
                                { time: '09:00', label: isRtl ? 'صباحاً' : 'Morning' },
                                { time: '14:00', label: isRtl ? 'ظهراً' : 'Afternoon' },
                                { time: '19:00', label: isRtl ? 'مساءً' : 'Evening' },
                                { time: '21:00', label: isRtl ? 'ليلاً' : 'Night' }
                              ].map(p => (
                                <button
                                  key={p.time}
                                  type="button"
                                  onClick={() => setPreferredTime(p.time)}
                                  className={`px-1.5 py-0.5 rounded cursor-pointer ${
                                    preferredTime === p.time ? 'bg-blue-100 text-blue-700' : 'text-slate-500 hover:underline'
                                  }`}
                                >
                                  {p.label}
                                </button>
                              ))}
                            </div>
                          </div>
                          <input
                            type="time"
                            value={preferredTime}
                            onChange={e => setPreferredTime(e.target.value)}
                            className="w-full text-xs font-black text-[#002147] bg-white border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        {/* Tests & Catchup Toggles */}
                        <div className="space-y-2 pt-1 border-t border-slate-200/80">
                          <label className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 cursor-pointer">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 size={16} className="text-indigo-600 shrink-0" />
                              <div>
                                <span className="text-xs font-black text-slate-800 block">
                                  {isRtl ? 'اختبارات تقييم نصف شهرية' : 'Bi-weekly Milestone Tests'}
                                </span>
                                <span className="text-[10px] text-slate-500 font-medium block">
                                  {isRtl ? 'قياس دوري كل أسبوعين للتأكد من رسوخ المفاهيم' : 'Measure progress every 2 weeks'}
                                </span>
                              </div>
                            </div>
                            <input
                              type="checkbox"
                              checked={includeBiWeeklyTests}
                              onChange={e => setIncludeBiWeeklyTests(e.target.checked)}
                              className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                            />
                          </label>

                          <label className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 cursor-pointer">
                            <div className="flex items-center gap-2">
                              <span className="text-base shrink-0">☕</span>
                              <div>
                                <span className="text-xs font-black text-slate-800 block">
                                  {isRtl ? 'يوم استشفاء وتعويض مرن' : 'Catch-Up & Rest Day'}
                                </span>
                                <span className="text-[10px] text-slate-500 font-medium block">
                                  {isRtl ? 'تعويض أي درس فائت دون انقطاع الـ Streak' : 'Protect streaks with flexible catch-up'}
                                </span>
                              </div>
                            </div>
                            <input
                              type="checkbox"
                              checked={includeCatchUpDay}
                              onChange={e => setIncludeCatchUpDay(e.target.checked)}
                              className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Live Smart Plan Estimate Bar (Always visible before generating) */}
                <div className="bg-gradient-to-r from-blue-50 via-indigo-50/50 to-amber-50/60 p-4 rounded-2xl border border-blue-200/80 flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-[#002147] text-amber-300 flex items-center justify-center text-xl shadow-md shrink-0">
                      💡
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black text-[#002147]">
                          {isRtl ? 'تقدير الخطة الذكية المخصصة:' : 'Smart Plan Dynamic Estimate:'}
                        </span>
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-600 text-white">
                          {totalEstimatedLessons} {isRtl ? 'درساً مجدولاً' : 'total lessons'}
                        </span>
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                          {selectedPillars.length} {isRtl ? 'مقررات' : 'courses'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 font-medium mt-0.5">
                        {isRtl
                          ? `تتضمن الخطة ${weeksToGenerate} أسابيع (${selectedDays.length} أيام/أسبوع × ${lessonsPerDay} حصص يومياً ~${estimatedDailyMinutes} دقيقة) • تنتهي قرابة ${estimatedEndDate}.`
                          : `${weeksToGenerate} weeks (${selectedDays.length} days/wk × ${lessonsPerDay} lessons/day ~${estimatedDailyMinutes} min) • Target end: ${estimatedEndDate}.`}
                      </p>
                    </div>
                  </div>

                  {/* Tab Navigation shortcut */}
                  <div className="flex items-center gap-2">
                    {activeTab !== 'track' && (
                      <button
                        type="button"
                        onClick={() => {
                          if (activeTab === 'schedule_options') setActiveTab('days_sessions');
                          else if (activeTab === 'days_sessions') setActiveTab('pillars');
                          else if (activeTab === 'pillars') setActiveTab('track');
                        }}
                        className="px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-white text-slate-700 text-xs font-black transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <ChevronRight size={14} className={isRtl ? '' : 'rotate-180'} />
                        <span>{isRtl ? 'القسم السابق' : 'Previous'}</span>
                      </button>
                    )}

                    {activeTab !== 'schedule_options' && (
                      <button
                        type="button"
                        onClick={() => {
                          if (activeTab === 'track') setActiveTab('pillars');
                          else if (activeTab === 'pillars') setActiveTab('days_sessions');
                          else if (activeTab === 'days_sessions') setActiveTab('schedule_options');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-900 text-xs font-black transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <span>{isRtl ? 'القسم التالي' : 'Next'}</span>
                        <ChevronLeft size={14} className={isRtl ? '' : 'rotate-180'} />
                      </button>
                    )}
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
                      ? `تم بناء خطة "${generatedPlanResult.trackTitleAr || 'الخطة الأكاديمية'}" بنجاح، وتضم ${generatedPlanResult.planItems?.length || 0} درساً أكاديمياً عبر ${generatedPlanResult.selectedCategories?.length || selectedPillars.length} مقررات، مربوطة بالسبورة الذكية والشرح الصوتي مع سارة.`
                      : `"${generatedPlanResult.trackTitleEn || 'Academic Plan'}" generated with ${generatedPlanResult.planItems?.length || 0} lessons across ${generatedPlanResult.selectedCategories?.length || selectedPillars.length} courses!`}
                  </p>
                </div>

                {/* Plan Highlights Summary */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-lg mx-auto text-xs font-bold text-slate-700">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">{isRtl ? 'إجمالي الحصص' : 'Total Lessons'}</span>
                    <span className="text-sm font-black text-blue-600">{generatedPlanResult.planItems?.length || 0}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">{isRtl ? 'المقررات' : 'Courses'}</span>
                    <span className="text-sm font-black text-emerald-600">{generatedPlanResult.selectedCategories?.length || selectedPillars.length}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">{isRtl ? 'الأيام أسبوعياً' : 'Days/Week'}</span>
                    <span className="text-sm font-black text-indigo-600">{generatedPlanResult.selectedDays?.length || selectedDays.length}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">{isRtl ? 'الحصص باليوم' : 'Lessons/Day'}</span>
                    <span className="text-sm font-black text-amber-600">{generatedPlanResult.lessonsPerDay || lessonsPerDay}</span>
                  </div>
                </div>

                {/* First Lesson Feature Box */}
                {generatedPlanResult.planItems?.[0] && (
                  <div className="bg-slate-50 border-2 border-blue-200/80 rounded-2xl p-4 text-right max-w-md mx-auto shadow-sm">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      {isRtl ? '🚀 درسك الأول المجدول على السبورة الذكية:' : 'First Scheduled Lesson:'}
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

          {/* Bottom Footer Actions */}
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
                disabled={isGenerating || selectedPillars.length === 0 || selectedDays.length === 0}
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
