import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';
import { 
  Calendar, 
  BookOpen, 
  Clock, 
  Sparkles, 
  Volume2,
  Flame,
  Award,
  ChevronRight, 
  ChevronLeft,
  BarChart2, 
  Brain, 
  ArrowLeft,
  CalendarDays,
  Layout,
  CheckCircle2,
  Plus,
  Trash2,
  Save,
  Filter,
  Share2,
  Download,
  MessageSquare,
  Palette,
  Gamepad2,
  Music,
  Film,
  Key,
  Users,
  Baby,
  Search,
  Check,
  Layers,
  Globe,
  PenTool,
  Mic,
  Sliders,
  X,
  CheckSquare,
  Square,
  Grid,
  ListFilter
} from 'lucide-react';
import { translations, Language } from '../../lib/translations';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { UserProfile, StudyPlan } from '../../types';
import { 
  getAllCurriculumLessons, 
  ACADEMIC_SECTION_DEFINITIONS, 
  buildSmartAcademicPlan, 
  CurriculumLesson,
  PlanItem,
  PlanGenerationConfig
} from '../../utils/academicCurriculumCatalogue';

interface StudyPlannerProps {
  lang: Language;
  onBack: () => void;
  onNavigateToResults: () => void;
  onNavigateToLesson: (courseId: string, level: string, unitId: string) => void;
  userProfile: UserProfile | null;
}

export const StudyPlanner: React.FC<StudyPlannerProps> = ({ 
  lang, 
  userProfile,
  onBack, 
  onNavigateToResults,
  onNavigateToLesson 
}) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  
  // Generation & Selection Modes
  const [generationMode, setGenerationMode] = useState<'auto' | 'custom'>('auto');
  const [activeTab, setActiveTab] = useState<'planner' | 'history'>('planner');
  const [scheduleViewMode, setScheduleViewMode] = useState<'timeline' | 'calendar'>('timeline');

  // Multi-department Selection States
  const [selectedPillars, setSelectedPillars] = useState<string[]>(
    ACADEMIC_SECTION_DEFINITIONS.map(p => p.id)
  );

  // Custom Selected Lessons Basket (Mode: Custom picking)
  const [customSelectedLessonIds, setCustomSelectedLessonIds] = useState<Set<string>>(new Set());
  const [customActivePillarTab, setCustomActivePillarTab] = useState<string>('grammar');
  const [customSearchQuery, setCustomSearchQuery] = useState('');
  const [customLevelFilter, setCustomLevelFilter] = useState<string>('all');

  // Schedule Parameters
  const [difficultyLevel, setDifficultyLevel] = useState<'beginner' | 'intermediate' | 'advanced' | 'all'>('intermediate');
  const [selectedDays, setSelectedDays] = useState<number[]>([0, 1, 2, 3, 4]); // Sun - Thu
  const [weeksToGenerate, setWeeksToGenerate] = useState<number>(13); // 13 weeks = 3 Months
  const [lessonsPerDay, setLessonsPerDay] = useState<number>(2);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [preferredTime, setPreferredTime] = useState('16:00');
  const [includeBiWeeklyTests, setIncludeBiWeeklyTests] = useState(true);
  const [bypassTestLock, setBypassTestLock] = useState(true);

  // Operational States
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<PlanItem[] | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [lessonResults, setLessonResults] = useState<any[]>([]);
  const [coveredUnitKeys, setCoveredUnitKeys] = useState<Set<string>>(new Set());
  const [loadPreviousLoading, setLoadPreviousLoading] = useState(false);
  const [savedPlans, setSavedPlans] = useState<StudyPlan[]>([]);
  const [selectedSavedPlan, setSelectedSavedPlan] = useState<StudyPlan | null>(null);
  const [studentName, setStudentName] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  // Manual Lesson Insertion Modal
  const [showAddLessonModal, setShowAddLessonModal] = useState(false);
  const [addContext, setAddContext] = useState<{ day: string; week: number; month: number; dateLabel?: string } | null>(null);
  const [modalSearch, setModalSearch] = useState('');
  const [modalPillar, setModalPillar] = useState<string>('all');
  const [modalLevel, setModalLevel] = useState<string>('all');

  // Calendar View Filter & Month Active
  const [calendarActiveMonth, setCalendarActiveMonth] = useState<number>(1);
  const [schedulePillarFilter, setSchedulePillarFilter] = useState<string>('all');

  const tableRef = useRef<HTMLDivElement>(null);

  // All unified lessons cached
  const allCurriculumLessons = useMemo(() => getAllCurriculumLessons(), []);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Fetch saved plans and completed lesson results
  const fetchSavedPlans = async () => {
    if (!userProfile) return;
    setLoadPreviousLoading(true);
    try {
      const isAdmin = (userProfile as any).role === 'admin';
      let q;
      if (isAdmin) {
        q = query(collection(db, 'studyPlans'));
      } else {
        q = query(collection(db, 'studyPlans'), where('userId', '==', userProfile.uid));
      }

      const querySnapshot = await getDocs(q);
      const plans: StudyPlan[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data() as Record<string, any>;
        if (data) {
          plans.push({ id: docSnap.id, ...data } as StudyPlan);
        }
      });

      setSavedPlans(plans.sort((a, b) => {
        const dateA = a.createdAt?.seconds || 0;
        const dateB = b.createdAt?.seconds || 0;
        return dateB - dateA;
      }));

      // Fetch lesson results to identify truly covered units
      const resultsQ = query(collection(db, 'lessonResults'), where('userId', '==', userProfile.uid));
      const resultsSnapshot = await getDocs(resultsQ);
      const results: any[] = [];
      const covered = new Set<string>();

      resultsSnapshot.forEach(docSnap => {
        const data = docSnap.data();
        results.push({ id: docSnap.id, ...data });
        let courseId = data.courseId || 'general';
        let level = data.level || 'A1';
        let lessonId = data.lessonId || '';
        covered.add(`${courseId}:${level}:${lessonId}`);
      });

      setLessonResults(results);
      setCoveredUnitKeys(covered);
    } catch (error) {
      console.error('Error fetching plans & results:', error);
    } finally {
      setLoadPreviousLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedPlans();
    if (userProfile && !studentName) {
      setStudentName(userProfile.displayName || '');
    }
  }, [userProfile]);

  // Load first plan if available
  useEffect(() => {
    if (savedPlans.length > 0 && !generatedPlan && !isGenerating && activeTab === 'planner') {
      handleSelectSavedPlan(savedPlans[0]);
    }
  }, [savedPlans]);

  const handleSelectSavedPlan = (plan: StudyPlan) => {
    setSelectedSavedPlan(plan);
    setGeneratedPlan(plan.planItems || []);
    if (plan.studentName) setStudentName(plan.studentName);
    if (plan.startDate) setStartDate(plan.startDate);
    if (plan.preferredTime) setPreferredTime(plan.preferredTime);
    if (plan.selectedDays) setSelectedDays(plan.selectedDays);
    if (plan.selectedCategories) setSelectedPillars(plan.selectedCategories);
    if (plan.lessonsPerDay) setLessonsPerDay(plan.lessonsPerDay);
    if ((plan as any).weeksToGenerate) {
      setWeeksToGenerate((plan as any).weeksToGenerate);
    } else if (plan.planItems && plan.planItems.length > 0) {
      const maxWeek = Math.max(...plan.planItems.map(item => item.week), 0);
      if (maxWeek > 8) setWeeksToGenerate(13);
      else if (maxWeek > 4) setWeeksToGenerate(8);
      else setWeeksToGenerate(4);
    }
    showToast(isRtl ? `تم تحميل خطة: ${plan.studentName}` : `Loaded plan: ${plan.studentName}`);
  };

  const togglePillarSelection = (pillarId: string) => {
    setSelectedPillars(prev => 
      prev.includes(pillarId) 
        ? prev.filter(id => id !== pillarId) 
        : [...prev, pillarId]
    );
  };

  const selectAllPillars = () => {
    setSelectedPillars(ACADEMIC_SECTION_DEFINITIONS.map(p => p.id));
  };

  const clearAllPillars = () => {
    setSelectedPillars([]);
  };

  const toggleCustomLesson = (lessonId: string) => {
    setCustomSelectedLessonIds(prev => {
      const next = new Set(prev);
      if (next.has(lessonId)) {
        next.delete(lessonId);
      } else {
        next.add(lessonId);
      }
      return next;
    });
  };

  const toggleSelectAllInCurrentPillar = (pillarLessons: CurriculumLesson[]) => {
    setCustomSelectedLessonIds(prev => {
      const next = new Set(prev);
      const allSelected = pillarLessons.every(l => next.has(l.id));
      if (allSelected) {
        pillarLessons.forEach(l => next.delete(l.id));
      } else {
        pillarLessons.forEach(l => next.add(l.id));
      }
      return next;
    });
  };

  const toggleDay = (dayIdx: number) => {
    setSelectedDays(prev => 
      prev.includes(dayIdx) 
        ? prev.filter(d => d !== dayIdx) 
        : [...prev, dayIdx].sort()
    );
  };

  // Execute Plan Generation
  const handleGeneratePlan = async () => {
    if (generationMode === 'auto' && selectedPillars.length === 0) {
      alert(isRtl ? 'يرجى اختيار قسم واحد على الأقل من الأقسام الأكاديمية' : 'Please select at least one academic section');
      return;
    }

    if (generationMode === 'custom' && customSelectedLessonIds.size === 0) {
      alert(isRtl ? 'يرجى اختيار درس أو وحدة واحدة على الأقل من الأقسام المتاحة' : 'Please select at least one lesson or unit from the departments');
      return;
    }

    if (selectedDays.length === 0) {
      alert(isRtl ? 'يرجى اختيار يوم واحد على الأقل للدراسة' : 'Please select at least one study day');
      return;
    }

    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1200));

    let manualQueue: CurriculumLesson[] | undefined = undefined;
    if (generationMode === 'custom') {
      manualQueue = allCurriculumLessons.filter(l => customSelectedLessonIds.has(l.id));
    }

    const config: PlanGenerationConfig = {
      studentName: studentName.trim() || (isRtl ? 'طالب الأكاديمية' : 'Academy Student'),
      startDate,
      preferredTime,
      selectedDays,
      weeksToGenerate,
      lessonsPerDay,
      difficultyLevel,
      selectedPillars,
      manualLessonsQueue: manualQueue,
      excludeCoveredKeys: coveredUnitKeys,
      includeBiWeeklyTests,
      isRtl
    };

    const newPlan = buildSmartAcademicPlan(config);
    setGeneratedPlan(newPlan);
    setIsGenerating(false);
    showToast(
      isRtl 
        ? `تم توليد الخطة بنجاح (${newPlan.length} درساً وواجب تقييمي)` 
        : `Plan generated successfully (${newPlan.length} lessons & assessments)`
    );
  };

  const handleSavePlan = async () => {
    if (!generatedPlan || !userProfile) {
      alert(isRtl ? 'يرجى تسجيل الدخول أولاً لحفظ خطتك' : 'Please sign in to save your plan');
      return;
    }

    if (!studentName.trim()) {
      alert(isRtl ? 'يرجى كتابة اسم الطالب' : 'Please enter student name');
      return;
    }

    setIsSaving(true);
    try {
      const planData: any = {
        studentName: studentName.trim(),
        startDate,
        preferredTime,
        selectedDays,
        selectedCategories: selectedPillars,
        lessonsPerDay,
        weeksToGenerate,
        planItems: generatedPlan,
        generationMode
      };

      if (selectedSavedPlan && selectedSavedPlan.id) {
        await updateDoc(doc(db, 'studyPlans', selectedSavedPlan.id), {
          ...planData,
          parentIds: (userProfile as any).linkedParentIds || [],
          updatedAt: serverTimestamp()
        });
      } else {
        const newPlan = {
          ...planData,
          userId: userProfile.uid,
          parentIds: (userProfile as any).linkedParentIds || [],
          createdAt: serverTimestamp(),
        };
        await addDoc(collection(db, 'studyPlans'), newPlan);
      }
      
      setSaveSuccess(true);
      showToast(isRtl ? 'تم حفظ الخطة بنجاح في قاعدة البيانات' : 'Plan saved successfully to database');
      setTimeout(() => setSaveSuccess(false), 3000);
      fetchSavedPlans();
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, 'studyPlans');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePlan = async (planId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm(isRtl ? 'هل أنت متأكد من حذف هذه الخطة؟' : 'Are you sure you want to delete this plan?')) return;
    
    try {
      await deleteDoc(doc(db, 'studyPlans', planId));
      if (selectedSavedPlan?.id === planId) {
        setSelectedSavedPlan(null);
        setGeneratedPlan(null);
      }
      fetchSavedPlans();
      showToast(isRtl ? 'تم حذف الخطة' : 'Plan deleted', 'error');
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };

  const handleDeleteLesson = (lessonId: string) => {
    if (!generatedPlan) return;
    setGeneratedPlan(prev => prev ? prev.filter(item => item.id !== lessonId) : null);
    showToast(isRtl ? 'تم حذف الدرس من الجدول' : 'Lesson removed from schedule');
  };

  const handleAddLessonFromModal = (lesson: CurriculumLesson) => {
    if (!generatedPlan) return;
    
    const lastItem = generatedPlan[generatedPlan.length - 1];
    const newItem: PlanItem = {
      id: `manual-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      month: addContext?.month || (lastItem ? lastItem.month : 1),
      week: addContext?.week || (lastItem ? lastItem.week : 1),
      day: addContext?.day || (isRtl ? 'إضافي' : 'Extra'),
      courseId: lesson.courseId,
      courseLabel: isRtl ? lesson.courseLabelAr : lesson.courseLabelEn,
      topic: isRtl ? lesson.titleAr : lesson.titleEn,
      duration: lesson.duration || '45 min',
      level: lesson.level || 'A1',
      unitId: lesson.id,
      dateLabel: addContext?.dateLabel || (lastItem?.dateLabel || new Date().toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'short' })),
      timeLabel: preferredTime
    };

    if (addContext) {
      const dayItems = generatedPlan.filter(item => 
        item.day === addContext.day && 
        item.week === addContext.week && 
        item.month === addContext.month
      );
      if (dayItems.length > 0) {
        const lastIndex = generatedPlan.lastIndexOf(dayItems[dayItems.length - 1]);
        const newPlan = [...generatedPlan];
        newPlan.splice(lastIndex + 1, 0, newItem);
        setGeneratedPlan(newPlan);
      } else {
        setGeneratedPlan(prev => prev ? [...prev, newItem] : [newItem]);
      }
    } else {
      setGeneratedPlan(prev => prev ? [...prev, newItem] : [newItem]);
    }

    showToast(isRtl ? 'تم إضافة الدرس بنجاح لجدول اليوم' : 'Lesson added successfully to day schedule');
    setAddContext(null);
    setShowAddLessonModal(false);
  };

  const openAddContext = (day: string, week: number, month: number, dateLabel?: string) => {
    setAddContext({ day, week, month, dateLabel });
    setShowAddLessonModal(true);
  };

  const handleExportImage = async () => {
    if (!generatedPlan || generatedPlan.length === 0) return;
    setIsExporting(true);
    const ITEMS_PER_PAGE = 18;
    const totalPages = Math.ceil(generatedPlan.length / ITEMS_PER_PAGE);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      for (let page = 0; page < totalPages; page++) {
        const element = document.getElementById(`planner-export-page-${page}`);
        if (!element) continue;

        await new Promise(resolve => setTimeout(resolve, 300));
        const dataUrl = await toPng(element, {
          quality: 1.0,
          pixelRatio: 2,
          backgroundColor: '#ffffff',
          cacheBust: true,
          style: {
            transform: 'none',
            margin: '0',
            width: '1200px'
          }
        });
        
        const fileName = `Academy_Plan_${studentName.replace(/\s+/g, '_') || 'Student'}_Page_${page + 1}.png`;
        saveAs(dataUrl, fileName);
      }
      showToast(isRtl ? 'تم تصدير صفحات الخطة بنجاح' : 'Plan exported successfully');
    } catch (error) {
      console.error('Export Error:', error);
      alert(isRtl ? 'حدث خطأ في تصدير الصورة' : 'Image export failed');
    } finally {
      setIsExporting(false);
    }
  };

  const getLessonResult = (item: PlanItem) => {
    return lessonResults.find(r => r.lessonId === item.unitId || r.lessonId === `${item.courseId}_${item.unitId}`);
  };

  const achievement = useMemo(() => {
    if (!generatedPlan || generatedPlan.length === 0) return null;
    const completed = generatedPlan.filter(item => getLessonResult(item));
    const total = generatedPlan.length;
    const avgScore = completed.length > 0 
      ? completed.reduce((acc, curr) => {
          const res = getLessonResult(curr);
          return acc + (res?.score || 0);
        }, 0) / completed.length
      : 0;
    
    return {
      completedCount: completed.length,
      totalCount: total,
      percentage: total > 0 ? (completed.length / total) * 100 : 0,
      averageScore: avgScore,
      completedLessons: completed
    };
  }, [generatedPlan, lessonResults]);

  // Filter lessons for modal
  const modalAvailableLessons = useMemo(() => {
    const existingKeys = new Set(
      (generatedPlan || []).map(i => `${i.courseId}:${i.level}:${String(i.unitId)}`.toLowerCase())
    );

    return allCurriculumLessons.filter(l => {
      const key = `${l.courseId}:${l.level}:${String(l.id)}`.toLowerCase();
      if (existingKeys.has(key)) return false;

      const matchesSearch = !modalSearch || 
        l.titleAr.toLowerCase().includes(modalSearch.toLowerCase()) || 
        l.titleEn.toLowerCase().includes(modalSearch.toLowerCase()) ||
        l.courseLabelAr.toLowerCase().includes(modalSearch.toLowerCase());

      const matchesPillar = modalPillar === 'all' || l.pillarId === modalPillar;
      const matchesLevel = modalLevel === 'all' || l.level === modalLevel;

      return matchesSearch && matchesPillar && matchesLevel;
    });
  }, [allCurriculumLessons, generatedPlan, modalSearch, modalPillar, modalLevel]);

  // Lessons inside Custom Selection tab
  const customSectionLessons = useMemo(() => {
    return allCurriculumLessons.filter(l => {
      if (l.pillarId !== customActivePillarTab) return false;
      const matchesSearch = !customSearchQuery || 
        l.titleAr.toLowerCase().includes(customSearchQuery.toLowerCase()) || 
        l.titleEn.toLowerCase().includes(customSearchQuery.toLowerCase());
      const matchesLevel = customLevelFilter === 'all' || l.level === customLevelFilter;
      return matchesSearch && matchesLevel;
    });
  }, [allCurriculumLessons, customActivePillarTab, customSearchQuery, customLevelFilter]);

  // Filter generated plan for schedule
  const filteredScheduleItems = useMemo(() => {
    if (!generatedPlan) return [];
    if (schedulePillarFilter === 'all') return generatedPlan;
    return generatedPlan.filter(item => {
      const matchPillar = ACADEMIC_SECTION_DEFINITIONS.find(p => p.id === schedulePillarFilter);
      if (!matchPillar) return true;
      return item.courseId.includes(schedulePillarFilter) || item.courseLabel.includes(matchPillar.nameAr) || item.courseLabel.includes(matchPillar.nameEn);
    });
  }, [generatedPlan, schedulePillarFilter]);

  const maxMonthInPlan = useMemo(() => {
    if (!generatedPlan || generatedPlan.length === 0) return 1;
    return Math.max(...generatedPlan.map(i => i.month), 1);
  }, [generatedPlan]);

  return (
    <div className={`p-4 md:p-8 max-w-7xl mx-auto ${isRtl ? 'rtl text-right' : 'ltr text-left'}`}>
      {/* Top Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center justify-between w-full mb-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-[#002147] transition-colors p-2 rounded-2xl hover:bg-slate-100"
          >
            <ArrowLeft size={20} className={isRtl ? 'rotate-180' : ''} />
            <span className="font-bold text-sm">{isRtl ? 'الرئيسية' : 'Dashboard'}</span>
          </button>
          <div className="text-center">
            <h2 className="text-2xl md:text-4xl font-black text-[#002147] flex items-center gap-3 justify-center mb-1">
              <Brain className="text-blue-600" size={36} />
              {isRtl ? 'الخطة الدراسية الذكية الشاملة' : 'Smart Academic Study Planner'}
            </h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
              {isRtl ? 'تغطي كافة أقسام ومناهج الأكاديمية الـ 12' : 'Full Integration Across All 12 Academy Pillars'}
            </p>
          </div>
          <div className="w-10" />
        </div>

        {/* Main Tab Switcher */}
        <div className="bg-slate-100 p-1.5 rounded-[2rem] flex items-center gap-1 shadow-inner">
          <button 
            onClick={() => setActiveTab('planner')}
            className={`px-8 py-3 rounded-[1.5rem] text-sm font-black transition-all ${
              activeTab === 'planner' 
                ? 'bg-white text-blue-600 shadow-md scale-[1.02]' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {isRtl ? 'بناء وتوليد الخطة 🚀' : 'Build & Generate Plan 🚀'}
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`px-8 py-3 rounded-[1.5rem] text-sm font-black transition-all ${
              activeTab === 'history' 
                ? 'bg-white text-blue-600 shadow-md scale-[1.02]' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {isRtl ? `الخطط المحفوظة (${savedPlans.length})` : `Saved Plans (${savedPlans.length})`}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left / Sidebar Controls */}
        <div className="lg:col-span-1 space-y-6">
          {activeTab === 'planner' ? (
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
              {/* Generation Mode Selector: Auto AI vs Custom Pick */}
              <div className="mb-6">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                  {isRtl ? 'أسلوب بناء الخطة' : 'Plan Construction Method'}
                </label>
                <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setGenerationMode('auto')}
                    className={`py-3 px-2 rounded-xl text-xs font-black transition-all flex flex-col items-center justify-center gap-1 ${
                      generationMode === 'auto'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Sparkles size={16} />
                    <span>{isRtl ? 'توليد ذكي شامل' : 'AI Auto-Generate'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setGenerationMode('custom')}
                    className={`py-3 px-2 rounded-xl text-xs font-black transition-all flex flex-col items-center justify-center gap-1 ${
                      generationMode === 'custom'
                        ? 'bg-[#002147] text-white shadow-md'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <CheckSquare size={16} />
                    <span>{isRtl ? 'اختيار يدوي للوحدات' : 'Custom Unit Picker'}</span>
                  </button>
                </div>
              </div>

              {/* Mode A: Auto AI Multi-Pillars Selection */}
              {generationMode === 'auto' && (
                <div className="space-y-6 mb-8 border-b border-slate-100 pb-8">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {isRtl ? `الأقسام المشمولة (${selectedPillars.length}/12)` : `Included Pillars (${selectedPillars.length}/12)`}
                    </label>
                    <div className="flex gap-2">
                      <button 
                        onClick={selectAllPillars}
                        className="text-[10px] font-black text-blue-600 hover:underline"
                      >
                        {isRtl ? 'الكل' : 'All'}
                      </button>
                      <span className="text-slate-300">|</span>
                      <button 
                        onClick={clearAllPillars}
                        className="text-[10px] font-black text-slate-400 hover:underline"
                      >
                        {isRtl ? 'مسح' : 'Clear'}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {ACADEMIC_SECTION_DEFINITIONS.map(p => {
                      const isSelected = selectedPillars.includes(p.id);
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => togglePillarSelection(p.id)}
                          className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all text-right ${
                            isSelected 
                              ? 'bg-blue-50/70 border-blue-300 text-[#002147]' 
                              : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black ${
                              isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                            }`}>
                              {isSelected ? <Check size={14} /> : <div className="w-2 h-2 rounded-full bg-slate-300" />}
                            </div>
                            <span className="text-xs font-black">{isRtl ? p.nameAr : p.nameEn}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Mode B: Custom Selected Lessons Summary Box */}
              {generationMode === 'custom' && (
                <div className="space-y-4 mb-8 border-b border-slate-100 pb-8">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black text-blue-900">
                        {isRtl ? 'الوحدات والدروس المختارة:' : 'Selected Units:'}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-xs font-black">
                        {customSelectedLessonIds.size} {isRtl ? 'درس' : 'lessons'}
                      </span>
                    </div>
                    <p className="text-[10px] text-blue-700/70 font-bold leading-relaxed">
                      {isRtl 
                        ? 'يمكنك تصفح واختيار الدروس من الواجهة الرئيسية وتخصيصها لكل قسم.' 
                        : 'Browse and check specific lessons in the main view for each section.'}
                    </p>
                    {customSelectedLessonIds.size > 0 && (
                      <button
                        onClick={() => setCustomSelectedLessonIds(new Set())}
                        className="text-[10px] font-black text-rose-600 mt-2 hover:underline block"
                      >
                        {isRtl ? 'إفراغ قائمة الدروس المختارة' : 'Clear selected lessons'}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* General Plan Parameters */}
              <div className="space-y-6">
                {/* Academic Difficulty */}
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                    {isRtl ? 'المستوى الدراسي المستهدف' : 'Academic Target Level'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'beginner', labelAr: 'مبتدئ / براعم 👶', labelEn: 'Beginner / Kids' },
                      { value: 'intermediate', labelAr: 'متوسط / يافعين 🚀', labelEn: 'Intermediate / Junior' },
                      { value: 'advanced', labelAr: 'متقدم / كبار 🔥', labelEn: 'Advanced / Adults' },
                      { value: 'all', labelAr: 'شامل كل المستويات 🌟', labelEn: 'All Levels Comprehensive' }
                    ].map(item => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => setDifficultyLevel(item.value as any)}
                        className={`p-3 rounded-2xl border-2 font-black text-xs transition-all text-center ${
                          difficultyLevel === item.value 
                            ? 'border-blue-600 bg-[#002147] text-white shadow-md' 
                            : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                        }`}
                      >
                        {isRtl ? item.labelAr : item.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                    {isRtl ? 'المدة الزمنية للخطة' : 'Plan Duration'}
                  </label>
                  <div className="flex gap-2">
                    {[
                      { value: 4, labelAr: 'شهر واحد (4 أسابيع)', labelEn: '1 Month' },
                      { value: 8, labelAr: 'شهران (8 أسابيع)', labelEn: '2 Months' },
                      { value: 13, labelAr: '3 أشهر (90 يوماً)', labelEn: '3 Months' }
                    ].map(opt => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setWeeksToGenerate(opt.value)}
                        className={`flex-1 py-3 px-1 rounded-2xl border-2 font-black text-[11px] transition-all text-center ${
                          weeksToGenerate === opt.value 
                            ? 'border-blue-600 bg-blue-600 text-white shadow-md' 
                            : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'
                        }`}
                      >
                        {isRtl ? opt.labelAr : opt.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Study Days */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {isRtl ? 'أيام الدراسة الأسبوعية' : 'Weekly Study Days'}
                    </label>
                    <div className="flex gap-2 text-[10px] font-black">
                      <button
                        type="button"
                        onClick={() => setSelectedDays([0, 1, 2, 3, 4, 5, 6])}
                        className="text-blue-600 hover:underline"
                      >
                        {isRtl ? 'كل الأيام' : 'All'}
                      </button>
                      <span className="text-slate-300">|</span>
                      <button
                        type="button"
                        onClick={() => setSelectedDays([0, 1, 2, 3, 4])}
                        className="text-slate-500 hover:underline"
                      >
                        {isRtl ? 'أيام العمل' : 'Weekdays'}
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
                    {[
                      { ar: 'الأحد', en: 'Sun' },
                      { ar: 'الاثنين', en: 'Mon' },
                      { ar: 'الثلاثاء', en: 'Tue' },
                      { ar: 'الأربعاء', en: 'Wed' },
                      { ar: 'الخميس', en: 'Thu' },
                      { ar: 'الجمعة', en: 'Fri' },
                      { ar: 'السبت', en: 'Sat' }
                    ].map((dayObj, idx) => {
                      const isSelected = selectedDays.includes(idx);
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => toggleDay(idx)}
                          className={`py-2.5 px-1 rounded-xl border-2 font-black text-[11px] sm:text-xs transition-all text-center ${
                            isSelected 
                              ? 'border-blue-600 bg-blue-600 text-white shadow-sm' 
                              : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'
                          }`}
                        >
                          {isRtl ? dayObj.ar : dayObj.en}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Lessons Per Day */}
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                    {isRtl ? 'عدد الدروس في اليوم' : 'Lessons per Day'}
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(num => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setLessonsPerDay(num)}
                        className={`flex-1 py-2.5 rounded-xl border-2 font-black text-xs transition-all ${
                          lessonsPerDay === num 
                            ? 'border-blue-600 bg-blue-600 text-white shadow-sm' 
                            : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Start Date & Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                      {isRtl ? 'تاريخ البدء' : 'Start Date'}
                    </label>
                    <input 
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-black text-[#002147] focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                      {isRtl ? 'الوقت المفضل' : 'Study Time'}
                    </label>
                    <input 
                      type="time"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-black text-[#002147] focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                  </div>
                </div>

                {/* Bi-weekly milestone tests toggle */}
                <div className="flex items-center justify-between p-3.5 bg-indigo-50/60 rounded-2xl border border-indigo-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-indigo-600" />
                    <span className="text-xs font-black text-indigo-900">
                      {isRtl ? 'اختبارات تقييم نصف شهرية' : 'Bi-weekly Milestone Tests'}
                    </span>
                  </div>
                  <input 
                    type="checkbox"
                    checked={includeBiWeeklyTests}
                    onChange={(e) => setIncludeBiWeeklyTests(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                  />
                </div>

                {/* Generate Action Button */}
                <button 
                  onClick={handleGeneratePlan}
                  disabled={isGenerating}
                  className="w-full bg-[#002147] text-white py-4 rounded-[2rem] font-black flex items-center justify-center gap-3 hover:bg-blue-900 transition-all shadow-xl shadow-blue-100 disabled:opacity-50 active:scale-95 text-sm"
                >
                  {isGenerating ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                      <Sparkles size={18} />
                    </motion.div>
                  ) : (
                    <Sparkles size={18} />
                  )}
                  {generationMode === 'auto' 
                    ? (isRtl ? 'توليد الخطة الذكية الآن' : 'Generate Smart Plan Now')
                    : (isRtl ? `جدولة الدروس المختارة (${customSelectedLessonIds.size})` : `Schedule Selected Lessons (${customSelectedLessonIds.size})`)}
                </button>
              </div>
            </div>
          ) : (
            /* Saved Plans History Tab */
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <h3 className="font-black text-[#002147] mb-6 flex items-center gap-2 text-lg">
                <CalendarDays size={20} className="text-blue-500" />
                {isRtl ? 'سجل الخطط المحفوظة' : 'Saved Plans Archive'}
              </h3>
              
              <div className="space-y-3">
                {loadPreviousLoading ? (
                  <div className="flex flex-col items-center justify-center py-10">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                      <Sparkles size={24} className="text-blue-400" />
                    </motion.div>
                  </div>
                ) : savedPlans.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-xs font-black text-slate-300 uppercase tracking-widest">
                      {isRtl ? 'لا توجد خطط محفوظة بعد' : 'No saved plans yet'}
                    </p>
                  </div>
                ) : (
                  savedPlans.map(plan => (
                    <div key={plan.id} className="flex items-center gap-2 group/plan">
                      <button
                        onClick={() => {
                          handleSelectSavedPlan(plan);
                          setActiveTab('planner');
                        }}
                        className={`flex-1 text-right p-4 rounded-3xl border-2 transition-all flex flex-col gap-1 ${
                          selectedSavedPlan?.id === plan.id 
                            ? 'border-blue-600 bg-blue-50' 
                            : 'border-slate-50 bg-slate-50/50 hover:border-slate-100'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-black text-[#002147]">{plan.studentName}</span>
                          <span className="text-[10px] font-black text-blue-600 opacity-60">
                            {plan.createdAt?.toDate ? plan.createdAt.toDate().toLocaleDateString(isRtl ? 'ar-EG' : 'en-US') : ''}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={12} className="text-slate-400" />
                          <span className="text-[10px] font-bold text-slate-400">
                            {plan.planItems?.length || 0} {isRtl ? 'درس ووحدة' : 'lessons'} • {plan.startDate}
                          </span>
                        </div>
                      </button>
                      <button 
                        onClick={(e) => handleDeletePlan(plan.id!, e)}
                        className="p-3 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-2xl transition-all shadow-sm border border-rose-100 bg-white group-hover/plan:scale-105 active:scale-95"
                        title={isRtl ? 'حذف الخطة' : 'Delete Plan'}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-8">
          {/* If Mode is CUSTOM and user wants to pick lessons */}
          {generationMode === 'custom' && activeTab === 'planner' && (
            <div className="bg-white p-6 md:p-8 rounded-[3rem] border border-slate-200 shadow-sm">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-black text-[#002147] flex items-center gap-2">
                    <Layers className="text-blue-600" size={24} />
                    {isRtl ? 'تصفح واختيار الدروس والوحدات من الأقسام' : 'Browse & Pick Lessons From All Departments'}
                  </h3>
                  <p className="text-xs text-slate-400 font-bold mt-1">
                    {isRtl 
                      ? 'حدد الدروس التي تود إضافتها لخطتك ثم انقر على زر الجدولة' 
                      : 'Select lessons to include in your customized plan, then click Schedule'}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <div className="relative flex-1 md:w-48">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text"
                      placeholder={isRtl ? 'بحث في الدروس...' : 'Search lessons...'}
                      value={customSearchQuery}
                      onChange={(e) => setCustomSearchQuery(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 pl-8 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <select
                    value={customLevelFilter}
                    onChange={(e) => setCustomLevelFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="all">{isRtl ? 'كل المستويات' : 'All Levels'}</option>
                    <option value="Kid">Kid / براعم</option>
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                    <option value="General">General</option>
                  </select>
                </div>
              </div>

              {/* Department Tabs Bar */}
              <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-thin">
                {ACADEMIC_SECTION_DEFINITIONS.map(pillar => {
                  const isActive = customActivePillarTab === pillar.id;
                  const countInPillar = allCurriculumLessons.filter(l => l.pillarId === pillar.id).length;
                  const selectedInPillar = allCurriculumLessons.filter(l => l.pillarId === pillar.id && customSelectedLessonIds.has(l.id)).length;
                  
                  return (
                    <button
                      key={pillar.id}
                      onClick={() => setCustomActivePillarTab(pillar.id)}
                      className={`px-4 py-3 rounded-2xl whitespace-nowrap text-xs font-black transition-all flex items-center gap-2 border ${
                        isActive 
                          ? 'bg-[#002147] text-white border-[#002147] shadow-md scale-[1.02]' 
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span>{isRtl ? pillar.nameAr : pillar.nameEn}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                        isActive ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {selectedInPillar > 0 ? `${selectedInPillar}/${countInPillar}` : countInPillar}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Section Header & Select All in section */}
              <div className="flex items-center justify-between mb-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-[#002147]">
                    {isRtl 
                      ? `الدروس المعروضة: (${customSectionLessons.length})` 
                      : `Available Lessons: (${customSectionLessons.length})`}
                  </span>
                </div>
                <button
                  onClick={() => toggleSelectAllInCurrentPillar(customSectionLessons)}
                  className="text-xs font-black text-blue-600 hover:underline flex items-center gap-1.5"
                >
                  <CheckSquare size={14} />
                  <span>
                    {customSectionLessons.every(l => customSelectedLessonIds.has(l.id))
                      ? (isRtl ? 'إلغاء تحديد كل دروس القسم' : 'Deselect All in Section')
                      : (isRtl ? 'تحديد كل دروس القسم' : 'Select All in Section')}
                  </span>
                </button>
              </div>

              {/* Lessons Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-1">
                {customSectionLessons.length === 0 ? (
                  <div className="col-span-2 py-12 text-center text-slate-400 font-bold text-xs">
                    {isRtl ? 'لا توجد دروس تطابق بحثك في هذا القسم' : 'No lessons found matching filters in this section'}
                  </div>
                ) : (
                  customSectionLessons.map(lesson => {
                    const isChecked = customSelectedLessonIds.has(lesson.id);
                    return (
                      <div
                        key={lesson.id}
                        onClick={() => toggleCustomLesson(lesson.id)}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                          isChecked 
                            ? 'bg-blue-50/80 border-blue-600 shadow-sm' 
                            : 'bg-white border-slate-100 hover:border-slate-200'
                        }`}
                      >
                        <div className={`mt-0.5 w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                          isChecked ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {isChecked && <Check size={12} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[9px] font-black px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase">
                              {lesson.level}
                            </span>
                            <span className="text-[9px] font-bold text-slate-400">
                              {lesson.duration}
                            </span>
                            {lesson.categoryTagAr && (
                              <span className="text-[9px] font-bold text-blue-600 mr-auto">
                                {isRtl ? lesson.categoryTagAr : lesson.categoryTagEn}
                              </span>
                            )}
                          </div>
                          <h4 className="text-xs font-black text-[#002147] leading-snug">
                            {isRtl ? lesson.titleAr : lesson.titleEn}
                          </h4>
                          {lesson.descriptionAr && (
                            <p className="text-[10px] text-slate-400 font-medium mt-1 line-clamp-1">
                              {isRtl ? lesson.descriptionAr : lesson.descriptionEn}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* If No Plan is Generated Yet */}
          {!generatedPlan && !isGenerating && (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 md:p-20 bg-slate-50/60 border-2 border-dashed border-slate-200 rounded-[3.5rem] relative overflow-hidden">
              <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-slate-300 shadow-xl mb-6">
                <CalendarDays size={48} />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-[#002147] mb-3">
                {isRtl ? 'ابدأ رحلة التعلم الذكي المنظم' : 'Start Your Structured Learning Journey'}
              </h3>
              <p className="text-slate-400 max-w-md font-bold text-sm leading-relaxed mb-8">
                {isRtl 
                  ? 'اختر الأقسام والمستويات المرغوبة ودع المحرك الأكاديمي يبني لك جدولاً متوازناً يضمن أعلى درجات الاستيعاب والطلاقة.' 
                  : 'Select your preferred curriculums and let our AI engine orchestrate an optimal schedule for mastery.'}
              </p>
              <button
                onClick={handleGeneratePlan}
                className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
              >
                {isRtl ? 'توليد الخطة الدراسية الآن' : 'Generate Study Plan Now'}
              </button>
            </div>
          )}

          {/* Generating Indicator */}
          {isGenerating && (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-white border border-slate-200 rounded-[3.5rem] shadow-sm">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                className="w-20 h-20 rounded-full border-4 border-blue-600 border-t-transparent mb-6"
              />
              <h3 className="text-2xl font-black text-[#002147] mb-2">
                {isRtl ? 'جاري بناء وتوزيع وحدات الخطة الدراسية...' : 'Assembling & Distributing Plan Units...'}
              </h3>
              <p className="text-slate-400 text-sm font-bold max-w-sm">
                {isRtl 
                  ? 'نقوم بتوزيع المواد والأيام والاختبارات التقييمية بأفضل تسلسل معرفي متوازن.' 
                  : 'Distributing subjects, daily loads, and milestone reviews for balanced retention.'}
              </p>
            </div>
          )}

          {/* Generated Plan Section */}
          {generatedPlan && !isGenerating && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Summary Stats Strip */}
              <div className="flex flex-wrap gap-4">
                {[
                  { label: isRtl ? 'إجمالي الدروس' : 'Total Lessons', value: generatedPlan.length, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: isRtl ? 'الدروس المنجزة' : 'Completed', value: achievement?.completedCount || 0, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { label: isRtl ? 'نسبة الإنجاز' : 'Completion %', value: `${Math.round(achievement?.percentage || 0)}%`, color: 'text-amber-600', bg: 'bg-amber-50' },
                  { 
                    label: isRtl ? 'المدة الزمنية' : 'Duration', 
                    value: weeksToGenerate === 4 
                      ? (isRtl ? 'شهر واحد' : '1 Month') 
                      : weeksToGenerate === 8 
                      ? (isRtl ? 'شهران' : '2 Months') 
                      : (isRtl ? '3 أشهر (90 يوم)' : '3 Months'), 
                    color: 'text-rose-600', 
                    bg: 'bg-rose-50' 
                  },
                ].map((stat, i) => (
                  <div key={i} className={`${stat.bg} ${stat.color} px-6 py-4 rounded-[2rem] flex-1 min-w-[140px] shadow-sm flex flex-col items-center justify-center border-b-4 border-current/20`}>
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{stat.label}</span>
                    <span className="text-xl font-black">{stat.value}</span>
                  </div>
                ))}
              </div>

              {/* Action Bar: View Switcher, Filter, Save, Export, Results */}
              <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden p-6 md:p-8">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-sm">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-[#002147] text-lg md:text-xl">
                        {isRtl ? 'جدول المناهج والدروس' : 'Integrated Curriculum Schedule'}
                      </h4>
                      <p className="text-xs text-indigo-600 font-bold">
                        {isRtl ? 'اضغط على أي درس للبدء والممارسة مباشرة 🎯' : 'Click on any lesson to open & practice directly 🎯'}
                      </p>
                    </div>
                  </div>

                  {/* Student Name & Controls */}
                  <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                    <input 
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder={isRtl ? 'اسم الطالب (مثال: عبود)' : 'Student Name (e.g. Abboud)'}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-black text-[#002147] focus:ring-2 focus:ring-blue-600 outline-none min-w-[160px]"
                    />

                    {/* View Switcher: Timeline vs Month Calendar */}
                    <div className="bg-slate-100 p-1 rounded-xl flex items-center">
                      <button
                        onClick={() => setScheduleViewMode('timeline')}
                        className={`p-2 rounded-lg text-xs font-black transition-all ${
                          scheduleViewMode === 'timeline' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'
                        }`}
                        title={isRtl ? 'عرض القائمة الزمنية' : 'Timeline View'}
                      >
                        <ListFilter size={16} />
                      </button>
                      <button
                        onClick={() => setScheduleViewMode('calendar')}
                        className={`p-2 rounded-lg text-xs font-black transition-all ${
                          scheduleViewMode === 'calendar' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'
                        }`}
                        title={isRtl ? 'عرض التقويم الشهري' : 'Calendar Grid View'}
                      >
                        <Grid size={16} />
                      </button>
                    </div>

                    <button 
                      onClick={handleSavePlan}
                      disabled={isSaving || saveSuccess}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all ${
                        saveSuccess 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      } disabled:opacity-50`}
                    >
                      {isSaving ? <Sparkles size={14} className="animate-spin" /> : <Save size={14} />}
                      <span>{saveSuccess ? (isRtl ? 'تم الحفظ' : 'Saved') : (isRtl ? 'حفظ الخطة' : 'Save Plan')}</span>
                    </button>

                    <button 
                      onClick={onNavigateToResults}
                      className="flex items-center gap-2 px-4 py-2.5 bg-[#002147] text-white rounded-xl text-xs font-black hover:bg-blue-900 transition-all"
                    >
                      <BarChart2 size={14} />
                      <span>{isRtl ? 'النتائج الأكاديمية' : 'Results'}</span>
                    </button>

                    <button 
                      onClick={handleExportImage}
                      disabled={isExporting}
                      className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-black hover:bg-emerald-700 transition-all disabled:opacity-50"
                    >
                      {isExporting ? <Download size={14} className="animate-bounce" /> : <Share2 size={14} />}
                      <span>{isRtl ? 'تصدير للواتساب' : 'WhatsApp Export'}</span>
                    </button>
                  </div>
                </div>

                {/* Filter by Department and Month Tab if Calendar */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-2">
                    <Filter size={14} className="text-slate-400" />
                    <select
                      value={schedulePillarFilter}
                      onChange={(e) => setSchedulePillarFilter(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-[#002147] outline-none"
                    >
                      <option value="all">{isRtl ? 'جميع الأقسام في الجدول' : 'All Departments'}</option>
                      {ACADEMIC_SECTION_DEFINITIONS.map(p => (
                        <option key={p.id} value={p.id}>{isRtl ? p.nameAr : p.nameEn}</option>
                      ))}
                    </select>
                  </div>

                  {/* Month Switcher */}
                  {maxMonthInPlan > 1 && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-400">{isRtl ? 'الشهر:' : 'Month:'}</span>
                      {Array.from({ length: maxMonthInPlan }).map((_, mIdx) => {
                        const mNum = mIdx + 1;
                        return (
                          <button
                            key={mNum}
                            onClick={() => setCalendarActiveMonth(mNum)}
                            className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                              calendarActiveMonth === mNum 
                                ? 'bg-blue-600 text-white shadow-sm' 
                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                            }`}
                          >
                            {isRtl ? `الشهر ${mNum}` : `Month ${mNum}`}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Schedule Body: TIMELINE VIEW */}
                {scheduleViewMode === 'timeline' && (
                  <div ref={tableRef} className="overflow-x-auto min-h-[400px]">
                    <table className="w-full border-separate border-spacing-y-4">
                      <thead>
                        <tr className="text-[#002147]/40">
                          <th className={`px-6 text-[11px] font-black uppercase tracking-[0.2em] pb-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                            {isRtl ? 'الموعد والتاريخ' : 'Date & Schedule'}
                          </th>
                          <th className={`px-6 text-[11px] font-black uppercase tracking-[0.2em] pb-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                            {isRtl ? 'المواد والوحدات المقررة' : 'Scheduled Lessons'}
                          </th>
                          <th className="px-6 pb-2"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {(() => {
                          const groupedItems: { [key: string]: PlanItem[] } = {};
                          filteredScheduleItems.forEach(item => {
                            const dayKey = `${item.month}-${item.week}-${item.day}-${item.dateLabel}`;
                            if (!groupedItems[dayKey]) groupedItems[dayKey] = [];
                            groupedItems[dayKey].push(item);
                          });

                          return Object.entries(groupedItems).map(([dayKey, items], idx) => {
                            const firstItem = items[0];
                            return (
                              <tr 
                                key={dayKey} 
                                className={`group transition-all ${idx % 2 === 0 ? 'bg-slate-50/60' : 'bg-white'} rounded-3xl`}
                              >
                                <td className="p-6 rounded-l-3xl border-y border-l border-slate-100 align-top min-w-[140px]">
                                  <div className="flex flex-col gap-1.5">
                                    <div className="flex items-center gap-2">
                                      <span className="bg-[#002147] text-white px-2.5 py-0.5 rounded-md text-[9px] font-black uppercase">
                                        {isRtl ? 'أسبوع' : 'Wk'} {firstItem.week}
                                      </span>
                                      {firstItem.dateLabel && (
                                        <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                                          {firstItem.dateLabel}
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                      <span className="text-base font-black text-[#002147]">
                                        {firstItem.day}
                                      </span>
                                      {firstItem.timeLabel && (
                                        <span className="text-xs font-bold text-slate-400">
                                          {firstItem.timeLabel}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </td>
                                
                                <td className="p-6 border-y border-slate-100">
                                  <div className="flex flex-wrap gap-4">
                                    {items.map(item => {
                                      const isTest = item.isTest;
                                      const res = getLessonResult(item);
                                      return (
                                        <div
                                          key={item.id}
                                          onClick={() => onNavigateToLesson(item.courseId, item.level, item.unitId)}
                                          className={`flex-1 min-w-[280px] p-4 rounded-2xl border transition-all cursor-pointer group/item relative ${
                                            isTest
                                              ? 'bg-indigo-50/70 border-indigo-200 hover:border-indigo-400'
                                              : 'bg-white border-slate-100 hover:border-blue-300 hover:shadow-md'
                                          }`}
                                        >
                                          <div className="flex items-start justify-between gap-2 mb-2">
                                            <div className="flex items-center gap-2">
                                              <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase ${
                                                isTest ? 'bg-indigo-600 text-white' : 'bg-blue-100 text-blue-800'
                                              }`}>
                                                {item.courseLabel}
                                              </span>
                                              <span className="text-[10px] font-black text-slate-400">
                                                {item.duration}
                                              </span>
                                            </div>
                                            {!isTest && (
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleDeleteLesson(item.id);
                                                }}
                                                className="text-slate-300 hover:text-rose-600 p-1 opacity-0 group-hover/item:opacity-100 transition-opacity"
                                                title={isRtl ? 'حذف من الجدول' : 'Delete'}
                                              >
                                                <Trash2 size={13} />
                                              </button>
                                            )}
                                          </div>
                                          <h5 className="text-sm font-black text-[#002147] group-hover/item:text-blue-600 transition-colors leading-snug">
                                            {item.topic}
                                          </h5>
                                          {res && (
                                            <div className="flex items-center gap-2 mt-2">
                                              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                                                <CheckCircle2 size={10} />
                                                {isRtl ? 'تم الإنجاز' : 'Completed'}
                                              </span>
                                              <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded" dir="ltr">
                                                ({res.total > 0 ? `${res.score}/${res.total}` : `${res.score || 0}`})
                                              </span>
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </td>

                                <td className="p-6 rounded-r-3xl border-y border-r border-slate-100 text-right align-top">
                                  <button 
                                    onClick={() => openAddContext(firstItem.day, firstItem.week, firstItem.month, firstItem.dateLabel)}
                                    className="w-9 h-9 flex items-center justify-center bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-sm border border-blue-100"
                                    title={isRtl ? 'إضافة درس لهذا اليوم' : 'Add lesson to this day'}
                                  >
                                    <Plus size={18} />
                                  </button>
                                </td>
                              </tr>
                            );
                          });
                        })()}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Schedule Body: CALENDAR GRID VIEW */}
                {scheduleViewMode === 'calendar' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, wIdx) => {
                      const weekNum = wIdx + 1;
                      const weekItems = filteredScheduleItems.filter(i => i.month === calendarActiveMonth && i.week === weekNum);
                      return (
                        <div key={weekNum} className="bg-slate-50/70 p-4 rounded-3xl border border-slate-200">
                          <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
                            <span className="text-xs font-black text-[#002147]">
                              {isRtl ? `الأسبوع ${weekNum}` : `Week ${weekNum}`}
                            </span>
                            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                              {weekItems.length} {isRtl ? 'دروس' : 'lessons'}
                            </span>
                          </div>

                          <div className="space-y-2.5">
                            {weekItems.length === 0 ? (
                              <p className="text-[10px] text-slate-400 font-bold text-center py-6">
                                {isRtl ? 'لا توجد دروس' : 'No lessons'}
                              </p>
                            ) : (
                              weekItems.map(item => (
                                <div
                                  key={item.id}
                                  onClick={() => onNavigateToLesson(item.courseId, item.level, item.unitId)}
                                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                                    item.isTest 
                                      ? 'bg-indigo-100/70 border-indigo-300' 
                                      : 'bg-white border-slate-100 hover:border-blue-400 shadow-sm'
                                  }`}
                                >
                                  <div className="flex items-center justify-between text-[9px] font-black text-slate-400 mb-1">
                                    <span>{item.day}</span>
                                    <span className="text-blue-600">{item.courseLabel}</span>
                                  </div>
                                  <p className="text-xs font-black text-[#002147] line-clamp-2">
                                    {item.topic}
                                  </p>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Export Offscreen Pages for High Quality WhatsApp Image */}
      <div className="fixed top-[-9999px] left-[-9999px] pointer-events-none">
        {generatedPlan && Array.from({ length: Math.ceil(generatedPlan.length / 18) }).map((_, pageIdx) => {
          const ITEMS_PER_PAGE = 18;
          const start = pageIdx * ITEMS_PER_PAGE;
          const chunk = generatedPlan.slice(start, start + ITEMS_PER_PAGE);

          return (
            <div 
              key={pageIdx}
              id={`planner-export-page-${pageIdx}`}
              className="bg-white p-12 overflow-hidden"
              style={{ width: '1200px' }}
            >
              {/* Header */}
              <div className="mb-10 p-10 bg-[#002147] rounded-[3rem] text-white relative overflow-hidden border-b-[8px] border-amber-400">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-amber-400 mb-1">
                      {isRtl ? 'أكاديمية باسم آل خليل للغات الرقمية' : 'Basim Al Khalil Digital Academy'}
                    </h2>
                    <h1 className="text-4xl font-black text-white">
                      {isRtl ? `الخطة الدراسية الذكية: ${studentName}` : `Academic Roadmap: ${studentName}`}
                    </h1>
                    <p className="text-xs text-blue-200 mt-2 font-bold">
                      {isRtl ? `الصفحة ${pageIdx + 1} من ${Math.ceil(generatedPlan.length / 18)}` : `Page ${pageIdx + 1} of ${Math.ceil(generatedPlan.length / 18)}`}
                    </p>
                  </div>
                  <div className="bg-white/10 p-6 rounded-2xl border border-white/10 text-center">
                    <span className="text-xs font-black text-blue-200 uppercase">{isRtl ? 'إجمالي الخطة' : 'Total Load'}</span>
                    <div className="text-3xl font-black">{generatedPlan.length} {isRtl ? 'وحدة' : 'Units'}</div>
                  </div>
                </div>
              </div>

              {/* Table */}
              <table className="w-full border-separate border-spacing-y-3">
                <tbody>
                  {chunk.map(item => (
                    <tr key={item.id} className="bg-slate-50 rounded-2xl">
                      <td className="p-4 rounded-l-2xl font-black text-xs text-[#002147] w-48">
                        <div>{item.day} - {item.dateLabel}</div>
                        <div className="text-[10px] text-blue-600 font-bold">{isRtl ? 'أسبوع' : 'Wk'} {item.week} • {item.timeLabel}</div>
                      </td>
                      <td className="p-4 font-black text-sm text-[#002147]">
                        <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded mr-2 ml-2">
                          {item.courseLabel}
                        </span>
                        {item.topic}
                      </td>
                      <td className="p-4 rounded-r-2xl text-[10px] font-black text-slate-400 text-right w-24">
                        {item.duration}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-bold">
                <span>Al Khalil Academy Official Certified Plan • 2026</span>
                <span>QR Verification & AI Mastery Standard</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Lesson Modal */}
      <AnimatePresence>
        {showAddLessonModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddLessonModal(false)}
              className="absolute inset-0 bg-[#002147]/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[80vh]"
            >
              <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-[#002147]">
                    {isRtl ? 'إضافة درس أو وحدة للجدول' : 'Add Lesson to Schedule'}
                  </h3>
                  {addContext && (
                    <p className="text-xs font-bold text-blue-600 mt-1">
                      {isRtl ? `إضافة إلى: ${addContext.day} - ${addContext.dateLabel}` : `Adding to: ${addContext.day} - ${addContext.dateLabel}`}
                    </p>
                  )}
                </div>
                <button onClick={() => setShowAddLessonModal(false)} className="text-slate-400 hover:text-rose-500">
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input 
                    type="text"
                    placeholder={isRtl ? 'بحث في الدروس...' : 'Search lessons...'}
                    value={modalSearch}
                    onChange={(e) => setModalSearch(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <select
                    value={modalPillar}
                    onChange={(e) => setModalPillar(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="all">{isRtl ? 'كل الأقسام' : 'All Sections'}</option>
                    {ACADEMIC_SECTION_DEFINITIONS.map(p => (
                      <option key={p.id} value={p.id}>{isRtl ? p.nameAr : p.nameEn}</option>
                    ))}
                  </select>
                  <select
                    value={modalLevel}
                    onChange={(e) => setModalLevel(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="all">{isRtl ? 'كل المستويات' : 'All Levels'}</option>
                    <option value="Kid">Kid</option>
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                  {modalAvailableLessons.length === 0 ? (
                    <div className="text-center py-10 text-slate-400 font-bold text-xs">
                      {isRtl ? 'لا توجد دروس تطابق بحثك' : 'No lessons found matching filters'}
                    </div>
                  ) : (
                    modalAvailableLessons.slice(0, 40).map(lesson => (
                      <button
                        key={lesson.id}
                        onClick={() => handleAddLessonFromModal(lesson)}
                        className="w-full text-right p-3.5 bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 rounded-2xl transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-[9px] font-black px-2 py-0.5 rounded bg-blue-600 text-white uppercase">
                            {lesson.level}
                          </span>
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 block">{lesson.courseLabelAr}</span>
                            <span className="text-xs font-black text-[#002147] group-hover:text-blue-600">{lesson.titleAr}</span>
                          </div>
                        </div>
                        <Plus size={16} className="text-blue-600 group-hover:scale-125 transition-transform" />
                      </button>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-3.5 rounded-3xl shadow-2xl flex items-center gap-3 border-2 ${
              toast.type === 'success' 
                ? 'bg-white border-emerald-200 text-emerald-700' 
                : 'bg-white border-rose-200 text-rose-700'
            }`}
          >
            <CheckCircle2 size={18} />
            <p className="font-black text-xs">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
