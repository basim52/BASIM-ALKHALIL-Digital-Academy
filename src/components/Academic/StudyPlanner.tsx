import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';
import { 
  Calendar, 
  BookOpen, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  BarChart2, 
  Brain, 
  ArrowLeft,
  CalendarDays,
  Layout,
  CheckCircle2,
  Plus,
  Trash2,
  Trash,
  Check,
  Save,
  Filter,
  Download,
  Share2
} from 'lucide-react';
import { translations, Language } from '../../lib/translations';
import { ALL_READING_UNITS } from '../ReadingCurriculumCompanion';
import { ALL_GRAMMAR_UNITS } from '../GrammarCurriculumCompanion';
import { ALL_WRITING_UNITS } from '../WritingCurriculumCompanion';
import { OXFORD_UNITS } from '../OxfordDiscoverCompanion';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { UserProfile, StudyPlan } from '../../types';

// Mapping curriculums for the selection UI
const AVAILABLE_CATEGORIES = [
  { 
    id: 'advanced', 
    labelEn: 'Advanced Programs', 
    labelAr: 'المناهج المتطورة', 
    descAr: 'تشمل القراءة، القواعد، والكتابة بذكاء',
    descEn: 'Includes Reading, Grammar, and Advanced Writing',
    icon: Sparkles, 
    color: 'text-indigo-600', 
    bg: 'bg-indigo-50',
    subCourses: ['reading', 'grammar', 'writing']
  },
  { 
    id: 'oxford', 
    labelEn: 'Oxford Series', 
    labelAr: 'سلسلة أكسفورد المصورة', 
    descAr: 'المنهج العالمي المصور بجميع مستوياته',
    descEn: 'World-renowned illustrated curriculum for all levels',
    icon: BookOpen, 
    color: 'text-amber-600', 
    bg: 'bg-amber-50',
    subCourses: ['oxford']
  },
];

interface StudyPlannerProps {
  lang: Language;
  onBack: () => void;
  onNavigateToResults: () => void;
  onNavigateToLesson: (courseId: string, level: string, unitId: string) => void;
}

interface PlanItem {
  id: string;
  week: number;
  day: string;
  courseId: string;
  courseLabel: string;
  topic: string;
  duration: string;
  month: number;
  level: string;
  unitId: string;
  dateLabel?: string;
  timeLabel?: string;
}

export const StudyPlanner: React.FC<StudyPlannerProps & { userProfile: UserProfile | null }> = ({ 
  lang, 
  userProfile,
  onBack, 
  onNavigateToResults,
  onNavigateToLesson 
}) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['advanced']);
  const [selectedDays, setSelectedDays] = useState<number[]>([0, 1, 2, 3, 4]); // Default Sun-Thu
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [preferredTime, setPreferredTime] = useState('16:00');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<PlanItem[] | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [coveredUnitIds, setCoveredUnitIds] = useState<Set<string>>(new Set());
  const [loadPreviousLoading, setLoadPreviousLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'create' | 'history'>('create');
  const [savedPlans, setSavedPlans] = useState<StudyPlan[]>([]);
  const [selectedSavedPlan, setSelectedSavedPlan] = useState<StudyPlan | null>(null);
  const [studentName, setStudentName] = useState('');
  const [showAddLessonModal, setShowAddLessonModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const tableRef = React.useRef<HTMLDivElement>(null);

  const handleExportImage = async () => {
    if (!tableRef.current) return;
    setIsExporting(true);
    try {
      // Small delay to ensure any hover states/transitions are settled
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const dataUrl = await toPng(tableRef.current, {
        quality: 1.0,
        pixelRatio: 4, // Higher quality for extreme clarity
        backgroundColor: '#ffffff',
        style: {
          borderRadius: '0px',
          padding: '40px',
          width: '1200px', // Force a wider width during export to balance proportions
          display: 'flex',
          flexDirection: 'column',
        },
        filter: (node) => {
          const exclusionClasses = ['export-exclude'];
          return !exclusionClasses.some(cls => (node as HTMLElement).classList?.contains?.(cls));
        }
      });
      
      const fileName = `StudyPlan_${studentName.replace(/\s+/g, '_') || 'Student'}_${new Date().toLocaleDateString()}.png`;
      saveAs(dataUrl, fileName);
    } catch (error) {
      console.error('Error exporting image:', error);
      alert(isRtl ? 'حدث خطأ أثناء تصدير الصورة' : 'Error exporting image');
    } finally {
      setIsExporting(false);
    }
  };

  const fetchSavedPlans = async () => {
    if (!userProfile) return;
    setLoadPreviousLoading(true);
    try {
      const UserRole = { ADMIN: 'admin', STUDENT: 'student', PARENT: 'parent' };
      const isAdmin = (userProfile as any).role === UserRole.ADMIN;
      
      let q;
      if (isAdmin) {
        q = query(collection(db, 'studyPlans'));
      } else {
        q = query(collection(db, 'studyPlans'), where('userId', '==', userProfile.uid));
      }

      const querySnapshot = await getDocs(q);
      const plans: StudyPlan[] = [];
      const covered = new Set<string>();
      
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Record<string, any>;
        if (data) {
          const plan = { id: doc.id, ...data } as StudyPlan;
          plans.push(plan);
          if (plan.planItems) {
            plan.planItems.forEach((item: any) => {
              const key = `${item.courseId}:${item.level}:${item.unitId}`;
              covered.add(key);
            });
          }
        }
      });
      
      setSavedPlans(plans.sort((a, b) => {
        const dateA = a.createdAt?.seconds || 0;
        const dateB = b.createdAt?.seconds || 0;
        return dateB - dateA;
      }));
      setCoveredUnitIds(covered);
    } catch (error) {
      console.error('Error fetching previous plans:', error);
    } finally {
      setLoadPreviousLoading(false);
    }
  };

  useEffect(() => {
    const initPlanner = async () => {
      await fetchSavedPlans();
      if (userProfile && !studentName) {
        setStudentName(userProfile.displayName || '');
      }
    };
    initPlanner();
  }, [userProfile]);

  // Handle auto-loading the latest plan if we just switched to history or on initial load
  useEffect(() => {
    if (savedPlans.length > 0 && !generatedPlan && !isGenerating && activeTab === 'create') {
      // If we have plans but we are on create tab with no plan, maybe switch to history?
      // Actually, if they just opened the planner and have content, show it.
      setActiveTab('history');
      handleSelectSavedPlan(savedPlans[0]);
    }
  }, [savedPlans]);

  const handleSelectSavedPlan = (plan: StudyPlan) => {
    setSelectedSavedPlan(plan);
    setGeneratedPlan(plan.planItems);
    if (plan.studentName) setStudentName(plan.studentName);
    if (plan.startDate) setStartDate(plan.startDate);
    if (plan.preferredTime) setPreferredTime(plan.preferredTime);
    if (plan.selectedDays) setSelectedDays(plan.selectedDays);
    if (plan.selectedCategories) setSelectedCategories(plan.selectedCategories);
  };

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleDay = (dayIdx: number) => {
    setSelectedDays(prev => 
      prev.includes(dayIdx) 
        ? prev.filter(d => d !== dayIdx) 
        : [...prev, dayIdx].sort()
    );
  };

  const generatePlan = async () => {
    if (selectedCategories.length === 0) {
      alert(isRtl ? 'يرجى اختيار فئة واحدة على الأقل' : 'Please select at least one category');
      return;
    }

    if (selectedDays.length === 0) {
      alert(isRtl ? 'يرجى اختيار يوم واحد على الأقل للدراسة' : 'Please select at least one study day');
      return;
    }

    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const mockPlan: PlanItem[] = [];
    const daysAr = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const daysEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const activeLevel = 'A1';
    
    const allAvailableLessons: { courseId: string; label: string; topic: string; unitId: string; level: string }[] = [];
    
    if (selectedCategories.includes('advanced')) {
       // Reading
       ALL_READING_UNITS[activeLevel].forEach(u => {
         allAvailableLessons.push({ 
           courseId: 'reading', 
           label: isRtl ? 'القراءة المتطورة' : 'Elite Reading', 
           topic: isRtl ? u.titleAr : u.titleEn,
           unitId: u.id,
           level: activeLevel
         });
       });
       // Grammar
       ALL_GRAMMAR_UNITS[activeLevel].forEach(u => {
         allAvailableLessons.push({ 
           courseId: 'grammar', 
           label: isRtl ? 'القواعد المتطورة' : 'Advanced Grammar', 
           topic: isRtl ? u.titleAr : u.titleEn,
           unitId: u.id,
           level: activeLevel
         });
       });
       // Writing
       ALL_WRITING_UNITS[activeLevel].forEach(u => {
        allAvailableLessons.push({ 
          courseId: 'writing', 
          label: isRtl ? 'الكتابة المتطورة' : 'Advanced Writing', 
          topic: isRtl ? u.titleAr : u.titleEn,
          unitId: u.id,
          level: activeLevel
        });
      });
    }
    
    if (selectedCategories.includes('oxford')) {
       OXFORD_UNITS.forEach(u => {
         allAvailableLessons.push({ 
           courseId: 'oxford', 
           label: isRtl ? 'أكسفورد المصور' : 'Oxford Discover', 
           topic: isRtl ? u.titleAr : u.titleEn,
           unitId: String(u.id),
           level: 'General'
         });
       });
    }

    // Filter out already studied lessons
    const filteredLessons = allAvailableLessons.filter(lesson => {
      const key = `${lesson.courseId}:${lesson.level}:${lesson.unitId}`;
      return !coveredUnitIds.has(key);
    });

    // If no filtered lessons left, but we have original ones, we might want to tell the user or reset
    // Actually, following user intent: "do not generate what was studied"
    // If empty, we use the original ones but show a warning or fallback?
    // Let's stick strictly to the request.
    
    let finalLessons = filteredLessons;
    let fallbackToStudied = false;

    if (finalLessons.length === 0 && allAvailableLessons.length > 0) {
      // If we depleted all lessons, maybe we wrap around?
      // Or just use the original ones if the user really wants a plan
      finalLessons = allAvailableLessons;
      fallbackToStudied = true;
    }

    if (finalLessons.length === 0) {
      finalLessons.push({ courseId: 'general', label: 'Basim', topic: 'General Lesson', unitId: '0', level: 'A1' });
    }

    let lessonPtr = 0;
    let currentDate = new Date(startDate);
    
    // We want to generate roughly 12 weeks of content (3 months)
    const weeksToGenerate = 12;
    
    for (let w = 1; w <= weeksToGenerate; w++) {
      const monthNum = Math.ceil(w / 4);
      const weekInMonth = ((w - 1) % 4) + 1;
      
      // For each week, we find the days the student wants to study
      // and skip those they don't.
      
      let studyDaysInThisWeek = 0;
      // Loop through 7 days of the week
      for (let i = 0; i < 7; i++) {
        const dayIdx = currentDate.getDay();
        
        if (selectedDays.includes(dayIdx)) {
          const lesson = finalLessons[lessonPtr % finalLessons.length];
          
          mockPlan.push({
            id: `plan-w${w}-d${i}`,
            month: monthNum,
            week: weekInMonth,
            day: isRtl ? daysAr[dayIdx] : daysEn[dayIdx],
            courseId: lesson.courseId,
            courseLabel: lesson.label,
            topic: lesson.topic,
            duration: '45 min',
            level: lesson.level,
            unitId: lesson.unitId,
            dateLabel: currentDate.toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'short' }),
            timeLabel: preferredTime
          });
          
          lessonPtr++;
          studyDaysInThisWeek++;
        }
        
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
    
    if (fallbackToStudied && coveredUnitIds.size > 0) {
      alert(isRtl 
        ? 'تم استكمال جميع الدروس المتاحة. تمت إعادة استخدام بعض الدروس لملء الخطة.' 
        : 'All available lessons have been completed. some lessons were reused to fill the plan.');
    }
    
    setGeneratedPlan(mockPlan);
    setIsGenerating(false);
  };

  const handleSavePlan = async () => {
    if (!generatedPlan || !userProfile) {
      alert(isRtl ? 'يرجى تسجيل الدخول أولاً' : 'Please sign in to save your plan');
      return;
    }

    if (!studentName.trim()) {
      alert(isRtl ? 'يرجى إدخال اسم الطالب' : 'Please enter student name');
      return;
    }

    setIsSaving(true);
    try {
      const planData: any = {
        studentName: studentName.trim(),
        startDate,
        preferredTime,
        selectedDays,
        selectedCategories,
        planItems: generatedPlan
      };

      if (selectedSavedPlan && selectedSavedPlan.id) {
        // Update existing
        await updateDoc(doc(db, 'studyPlans', selectedSavedPlan.id), {
          ...planData,
          updatedAt: serverTimestamp()
        });
      } else {
        // Create new
        const newPlan = {
          ...planData,
          userId: userProfile.uid,
          createdAt: serverTimestamp(),
        };
        await addDoc(collection(db, 'studyPlans'), newPlan);
      }
      
      setSaveSuccess(true);
      fetchSavedPlans();
      setTimeout(() => setSaveSuccess(false), 3000);
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
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };

  const handleDeleteLesson = (lessonId: string) => {
    if (!generatedPlan) return;
    setGeneratedPlan(prev => prev ? prev.filter(item => item.id !== lessonId) : null);
  };

  const handleAddLesson = (lesson: any) => {
    if (!generatedPlan) return;
    
    // Find last date to increment
    const lastItem = generatedPlan[generatedPlan.length - 1];
    let nextDate = new Date();
    if (lastItem && lastItem.dateLabel) {
      // Very basic date parsing - in a real app we'd store raw Date objects
      nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + 1);
    }

    const newItem: PlanItem = {
      id: `manual-${Date.now()}`,
      month: lastItem ? lastItem.month : 1,
      week: lastItem ? lastItem.week : 1,
      day: isRtl ? 'إضافي' : 'Extra',
      courseId: lesson.courseId,
      courseLabel: lesson.label,
      topic: lesson.topic,
      duration: '45 min',
      level: lesson.level,
      unitId: lesson.unitId,
      dateLabel: nextDate.toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'short' }),
      timeLabel: preferredTime
    };

    setGeneratedPlan(prev => prev ? [...prev, newItem] : [newItem]);
    setShowAddLessonModal(false);
  };

  return (
    <div className={`p-4 md:p-8 max-w-7xl mx-auto ${isRtl ? 'rtl' : 'ltr'}`}>
      <div className="flex flex-col items-center mb-10">
        <div className="flex items-center justify-between w-full mb-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-[#002147] transition-colors"
          >
            <ArrowLeft size={20} className={isRtl ? 'rotate-180' : ''} />
            <span className="font-bold">{isRtl ? 'رجوع للرئيسية' : 'Back to Dashboard'}</span>
          </button>
          <div className="text-center">
              <h2 className="text-3xl font-black text-[#002147] flex items-center gap-3 justify-center mb-1">
              <Brain className="text-blue-600" />
              {t.academicPlanner}
              </h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Powered by AI Study Engine</p>
          </div>
          <div className="w-10 md:block" />
        </div>

        <div className="bg-slate-100 p-1.5 rounded-[2rem] flex items-center gap-1">
          <button 
            onClick={() => {
              setActiveTab('create');
              setSelectedSavedPlan(null);
              setGeneratedPlan(null);
            }}
            className={`px-8 py-3 rounded-[1.5rem] text-sm font-black transition-all ${
              activeTab === 'create' 
                ? 'bg-white text-blue-600 shadow-md' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {isRtl ? 'توليد خطة جديدة' : 'Create New Plan'}
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`px-8 py-3 rounded-[1.5rem] text-sm font-black transition-all ${
              activeTab === 'history' 
                ? 'bg-white text-blue-600 shadow-md' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {isRtl ? 'الخطط المحفوظة' : 'Saved Plans'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Controls */}
        <div className="lg:col-span-1 space-y-6">
          {activeTab === 'create' ? (
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-bl-[3rem] -z-10 group-hover:scale-110 transition-transform" />
              
              <h3 className="font-black text-[#002147] mb-6 flex items-center gap-2 text-lg">
                <Layout size={20} className="text-blue-500" />
                {isRtl ? 'تخصيص الخطة' : 'Customize Plan'}
              </h3>
              
              <div className="space-y-8">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                    {isRtl ? 'المناهج المختارة' : 'Selected Curriculums'}
                  </label>
                  <div className="grid grid-cols-1 gap-4">
                    {AVAILABLE_CATEGORIES.map(category => (
                      <button
                        key={category.id}
                        onClick={() => toggleCategory(category.id)}
                        className={`flex flex-col p-6 rounded-3xl border-2 transition-all text-right ${
                          selectedCategories.includes(category.id) 
                            ? 'border-blue-600 bg-blue-50' 
                            : 'border-slate-100 bg-slate-50 hover:border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-3">
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${selectedCategories.includes(category.id) ? 'bg-blue-600 text-white' : 'bg-white text-slate-400 border border-slate-100 shadow-sm'}`}>
                            <category.icon size={20} />
                          </div>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            selectedCategories.includes(category.id) ? 'bg-blue-600 border-blue-600' : 'border-slate-200 bg-white'
                          }`}>
                            {selectedCategories.includes(category.id) && <CheckCircle2 size={14} className="text-white" />}
                          </div>
                        </div>
                        <span className={`text-base font-black mb-1 ${selectedCategories.includes(category.id) ? 'text-blue-600' : 'text-[#002147]'}`}>
                          {isRtl ? category.labelAr : category.labelEn}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">
                          {isRtl ? category.descAr : category.descEn}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                    {isRtl ? 'أيام الدراسة المختارة' : 'Selected Study Days'}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'].map((day, idx) => {
                      const dayLabelsEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                      const isSelected = selectedDays.includes(idx);
                      return (
                        <button
                          key={idx}
                          onClick={() => toggleDay(idx)}
                          className={`flex-1 min-w-[60px] py-3 rounded-xl border-2 font-black text-xs transition-all ${
                            isSelected 
                              ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-100' 
                              : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'
                          }`}
                        >
                          {isRtl ? day : dayLabelsEn[idx]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                      {isRtl ? 'تاريخ البدء' : 'Start Date'}
                    </label>
                    <div className="relative">
                      <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      <input 
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 pl-11 text-sm font-black text-[#002147] focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                      {isRtl ? 'وقت الدراسة المفضل' : 'Preferred Study Time'}
                    </label>
                    <div className="relative">
                      <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      <input 
                        type="time"
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 pl-11 text-sm font-black text-[#002147] focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-blue-50 rounded-[2rem] border border-blue-100 mb-2">
                  <div className="flex items-center gap-2 text-blue-600 font-black text-xs mb-1 uppercase tracking-widest">
                    <CheckCircle2 size={14} />
                    {isRtl ? 'الدروس المنجزة' : 'Covered Lessons'}
                  </div>
                  <p className="text-[10px] text-blue-700/60 font-bold leading-relaxed">
                    {isRtl 
                      ? `تم التعرف على ${coveredUnitIds.size} درساً سابقاً. لن يتم تكرارها في خطتك الجديدة.` 
                      : `Identified ${coveredUnitIds.size} previously studied lessons. They will not be repeated.`}
                  </p>
                </div>

                <div className="p-5 bg-amber-50 rounded-[2rem] border border-amber-100">
                  <div className="flex items-center gap-2 text-amber-600 font-black text-xs mb-1 uppercase tracking-widest">
                    <Clock size={14} />
                    {t.plannerDuration}
                  </div>
                  <p className="text-[10px] text-amber-700/60 font-bold leading-relaxed">
                    {isRtl ? 'سيقوم الذكاء الاصطناعي بتوزيع الوحدات الدراسية من المناهج المختارة بشكل متوازن خلال 3 أشهر.' : 'AI will distribute units from selected curriculums evenly throughout your 3-month term.'}
                  </p>
                </div>

                <button 
                  onClick={generatePlan}
                  disabled={isGenerating}
                  className="w-full bg-[#002147] text-white py-5 rounded-[2rem] font-black flex items-center justify-center gap-3 hover:bg-blue-900 transition-all shadow-xl shadow-blue-100 disabled:opacity-50 active:scale-95"
                >
                  {isGenerating ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                      <Sparkles size={20} />
                    </motion.div>
                  ) : (
                    <Sparkles size={20} />
                  )}
                  {t.generatePlanner}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <h3 className="font-black text-[#002147] mb-6 flex items-center gap-2 text-lg">
                  <CalendarDays size={20} className="text-blue-500" />
                  {isRtl ? 'سجل الخطط' : 'Plans History'}
                </h3>
                
                <div className="space-y-3">
                  {loadPreviousLoading ? (
                    <div className="flex flex-col items-center justify-center py-10">
                       <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                          <Sparkles size={24} className="text-blue-200" />
                       </motion.div>
                    </div>
                  ) : savedPlans.length === 0 ? (
                    <div className="text-center py-10">
                       <p className="text-xs font-black text-slate-300 uppercase tracking-widest">
                         {isRtl ? 'لا يوجد خطط محفوظة بعد' : 'No saved plans yet'}
                       </p>
                    </div>
                  ) : (
                    savedPlans.map(plan => (
                      <div key={plan.id} className="flex items-center gap-2 group/plan">
                        <button
                          onClick={() => handleSelectSavedPlan(plan)}
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
                               {isRtl ? 'بدأ في: ' : 'Started: '} {plan.startDate}
                             </span>
                          </div>
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePlan(plan.id!, e);
                          }}
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
        <div className="lg:col-span-3">
          {!generatedPlan && !isGenerating ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 md:p-20 bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[3.5rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                 <CalendarDays size={400} />
              </div>
              <div className="w-28 h-28 bg-white rounded-[2.5rem] flex items-center justify-center text-slate-200 shadow-xl mb-8 relative z-10">
                <CalendarDays size={56} />
              </div>
              <h3 className="text-3xl font-black text-[#002147] mb-4 relative z-10">
                {isRtl ? 'ابتدئ رحلة النجاح الآن' : 'Start Your Success Journey'}
              </h3>
              <p className="text-slate-400 max-w-sm font-bold text-sm leading-relaxed mb-10 relative z-10">
                {isRtl ? 'اختر مناهجك المفضلة ودع المعلم الذكي ينظم وقتك بما يضمن لك أفضل استيعاب تعليمي.' : 'Choose your favorite curriculums and let the AI Tutor organize your time for maximum educational impact.'}
              </p>
              <div className="flex gap-4 relative z-10">
                 <div className="px-4 py-2 bg-white rounded-full border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest shadow-sm">
                    Automated
                 </div>
                 <div className="px-4 py-2 bg-white rounded-full border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest shadow-sm">
                    Organized
                 </div>
                 <div className="px-4 py-2 bg-white rounded-full border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest shadow-sm">
                    Connected
                 </div>
              </div>
            </div>
          ) : isGenerating ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-white border border-slate-200 rounded-[3.5rem] shadow-sm relative overflow-hidden">
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ repeat: Infinity, duration: 6 }}
                className="absolute inset-0 bg-blue-50/20 backdrop-blur-3xl -z-10"
              />
              <div className="relative mb-10">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 180, 270, 360]
                  }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="w-40 h-40 bg-blue-50 rounded-full flex items-center justify-center"
                />
                <div className="absolute inset-0 flex items-center justify-center text-blue-600">
                  <Sparkles size={64} className="animate-pulse" />
                </div>
              </div>
              <h3 className="text-3xl font-black text-[#002147] mb-3">
                {isRtl ? 'جاري تحليل الوحدات الدراسية...' : 'Analyzing Course Units...'}
              </h3>
              <p className="text-slate-500 font-bold max-w-sm">
                {isRtl ? 'نقوم الآن بتوزيع الدروس من المناهج المختارة لصناعة أفضل خطة دراسية تناسب أيامك.' : 'Distributing lessons from selected curriculums to create the perfect study path for your schedule.'}
              </p>
              
              <div className="mt-12 flex gap-2">
                 {[0, 1, 2].map(i => (
                    <motion.div 
                      key={i}
                      animate={{ height: [10, 30, 10] }}
                      transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                      className="w-1 bg-blue-600 rounded-full"
                    />
                 ))}
              </div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-10"
            >
              {/* Summary Stats Strip */}
              <div className="flex flex-wrap gap-4">
                 {[
                    { label: isRtl ? 'إجمالي الدروس' : 'Total Lessons', value: generatedPlan?.length, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: isRtl ? 'معدل التركيز' : 'Focus Level', value: 'Elite', color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: isRtl ? 'المدة' : 'Duration', value: '3 Months', color: 'text-rose-600', bg: 'bg-rose-50' },
                 ].map((stat, i) => (
                    <div key={i} className={`${stat.bg} ${stat.color} px-6 py-4 rounded-[2rem] flex-1 min-w-[150px] shadow-sm flex flex-col items-center justify-center border-b-4 border-current/20`}>
                       <span className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{stat.label}</span>
                       <span className="text-xl font-black">{stat.value}</span>
                    </div>
                 ))}
              </div>

              {/* Interactive Schedule Table */}
              <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-sm">
                      <Calendar size={28} />
                    </div>
                    <div>
                        <h4 className="font-black text-[#002147] text-xl">
                            {isRtl ? 'جدول المناهج المتكامل' : 'Integrated Curriculum Schedule'}
                        </h4>
                        <p className="text-xs text-indigo-500 font-bold tracking-tight uppercase">
                            Click on any lesson to open it directly
                        </p>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="relative w-full md:w-64">
                      <Layout size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      <input 
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder={isRtl ? 'اسم الطالب (مثال: عبود)' : 'Student Name (e.g. Abboud)'}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 pl-11 text-xs font-black text-[#002147] focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                      />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                      <button 
                        onClick={handleSavePlan}
                        disabled={isSaving || saveSuccess}
                        className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-xs font-black transition-all ${
                          saveSuccess 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        } disabled:opacity-50 min-w-[180px]`}
                      >
                         {isSaving ? (
                           <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                             <Sparkles size={16} />
                           </motion.div>
                         ) : saveSuccess ? (
                           <CheckCircle2 size={16} />
                         ) : (
                           <Save size={16} />
                         )}
                         {saveSuccess ? (isRtl ? 'تم الحفظ بنجاح' : 'Saved Successfully') : (isRtl ? 'حفظ الخطة' : 'Save Plan')}
                      </button>
                      <button 
                        onClick={onNavigateToResults}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#002147] text-white rounded-2xl text-xs font-black hover:bg-blue-900 transition-all h-full"
                      >
                        <BarChart2 size={16} />
                        {isRtl ? 'المعدلات التعليمية' : 'Learning Avg'}
                      </button>
                      <button 
                        onClick={handleExportImage}
                        disabled={isExporting || !generatedPlan}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl text-xs font-black hover:bg-emerald-700 transition-all h-full disabled:opacity-50"
                      >
                        {isExporting ? (
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                            <Download size={16} />
                          </motion.div>
                        ) : (
                          <Share2 size={16} />
                        )}
                        {isRtl ? 'تصدير للواتساب' : 'WhatsApp Export'}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div ref={tableRef} className="overflow-x-auto min-h-[500px] bg-white p-4 md:p-8 rounded-[3rem]">
                  {/* Export Header */}
                  <div className="mb-10 p-10 bg-gradient-to-br from-[#002147] to-blue-900 rounded-[2.5rem] text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                    <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                            <Sparkles className="text-blue-300" size={24} />
                          </div>
                          <h2 className="text-2xl font-black tracking-tight">
                            {isRtl ? 'أكاديمية باسم آل خليل الرقمية' : 'Basim Al Khalil Digital Academy'}
                          </h2>
                        </div>
                        <div className="space-y-1">
                          <span className="text-blue-200 text-xs font-black uppercase tracking-[0.2em]">
                            {isRtl ? 'خطة الدراسة الذكية' : 'Smart Learning Journey'}
                          </span>
                          <h1 className="text-4xl font-black text-white">
                            {studentName || (isRtl ? 'اسم الطالب' : 'Student Name')}
                          </h1>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/10 backdrop-blur-md p-6 rounded-[2rem] border border-white/10">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-blue-200 uppercase mb-1">{isRtl ? 'إجمالي الدروس' : 'Total Lessons'}</span>
                          <span className="text-xl font-black">{generatedPlan?.length || 0}</span>
                        </div>
                        <div className="flex flex-col border-r border-white/10 pr-4">
                          <span className="text-[10px] font-black text-blue-200 uppercase mb-1">{isRtl ? 'مدة الخطة' : 'Duration'}</span>
                          <span className="text-xl font-black">90 {isRtl ? 'يوم' : 'Days'}</span>
                        </div>
                        <div className="flex flex-col border-r border-white/10 pr-4">
                          <span className="text-[10px] font-black text-blue-200 uppercase mb-1">{isRtl ? 'معدل التركيز' : 'Focus Rate'}</span>
                          <span className="text-xl font-black">98%</span>
                        </div>
                        <div className="flex flex-col border-l border-white/10 pl-4">
                          <span className="text-[10px] font-black text-blue-200 uppercase mb-1">{isRtl ? 'الحالة' : 'Status'}</span>
                          <div className="flex items-center gap-2">
                             <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                             <span className="text-sm font-black text-emerald-400">{isRtl ? 'نشط' : 'Active'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50/50 text-left">
                        <th className={`p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ${isRtl ? 'text-right' : 'text-left'}`}>
                          {isRtl ? 'التصنيف الزمني' : 'Timeline'}
                        </th>
                        <th className={`p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ${isRtl ? 'text-right' : 'text-left'}`}>
                          {isRtl ? 'المحتوى' : 'Curriculum Content'}
                        </th>
                        <th className="p-6"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {generatedPlan?.map((item) => (
                        <tr 
                          key={item.id} 
                          onClick={() => onNavigateToLesson(item.courseId, item.level, item.unitId)}
                          className="hover:bg-blue-50/30 transition-all group cursor-pointer"
                        >
                          <td className="p-6 w-56">
                            <div className="flex flex-col gap-1">
                               <div className="flex items-center gap-2">
                                  <span className="bg-white border border-slate-100 text-[#002147] px-3 py-1 rounded-full text-[10px] font-black shadow-sm inline-block w-fit">
                                    Month {item.month} • Week {item.week}
                                  </span>
                                  {item.dateLabel && (
                                     <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                                        {item.dateLabel}
                                     </span>
                                  )}
                               </div>
                               <div className="flex items-center gap-2 mt-1">
                                  <span className="text-sm font-black text-slate-400 uppercase tracking-widest">
                                     {item.day}
                                  </span>
                                  {item.timeLabel && (
                                     <span className="text-[10px] font-bold text-slate-300">
                                        at {item.timeLabel}
                                     </span>
                                  )}
                               </div>
                            </div>
                          </td>
                          <td className="p-6">
                            <div className="flex items-start gap-4">
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner shrink-0 ${
                                item.courseId === 'reading' ? 'bg-emerald-50 text-emerald-600' : 
                                item.courseId === 'grammar' ? 'bg-blue-50 text-blue-600' : 
                                'bg-purple-50 text-purple-600'
                              }`}>
                                {item.courseId === 'reading' ? <BookOpen size={20} /> : <Sparkles size={20} />}
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.courseLabel}</span>
                                   <div className="w-1 h-1 rounded-full bg-slate-300" />
                                   <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Duration: {item.duration}</span>
                                </div>
                                <p className="text-lg font-black text-[#002147] group-hover:text-blue-600 transition-colors leading-tight">{item.topic}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-6 text-right">
                             <div className="flex items-center justify-end gap-3 translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all export-exclude">
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteLesson(item.id);
                                  }}
                                  className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                                >
                                  <Trash2 size={18} />
                                </button>
                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Go to Classroom</span>
                                <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                                   <ChevronRight size={18} className={isRtl ? 'rotate-180' : ''} />
                                </div>
                             </div>
                          </td>
                        </tr>
                      ))}
                      <tr className="export-exclude">
                        <td colSpan={3} className="p-4">
                          <button 
                            onClick={() => setShowAddLessonModal(true)}
                            className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center gap-2 text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all font-black text-xs uppercase"
                          >
                            <Plus size={16} />
                            {isRtl ? 'إضافة درس يدوي' : 'Add Lesson Manually'}
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bottom Call to Actions */}
              <div className="flex flex-col md:flex-row gap-6">
                 <button 
                  onClick={onNavigateToResults}
                  className="flex-1 bg-white border border-slate-200 p-8 rounded-[3rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
                 >
                    <div className="flex items-center justify-between mb-4">
                       <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <BarChart2 size={24} />
                       </div>
                       <ChevronRight className={`text-slate-300 group-hover:text-blue-600 ${isRtl ? 'rotate-180' : ''}`} />
                    </div>
                    <h5 className="text-xl font-black text-[#002147] mb-2">{t.academicResults}</h5>
                    <p className="text-sm text-slate-400 font-bold">{isRtl ? 'تتبع تقدمك وحلل درجاتك بذكاء.' : 'Track your progress and analyze your grades smartly.'}</p>
                 </button>

                 <div className="flex-1 bg-[#002147] p-8 rounded-[3rem] shadow-xl shadow-blue-100 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform">
                       <CheckCircle2 size={120} />
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-between">
                       <div>
                          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                             <Sparkles size={24} className="text-amber-400" />
                          </div>
                          <h5 className="text-xl font-black mb-2">{isRtl ? 'الهدف التعليمي' : 'Learning Objective'}</h5>
                          <p className="text-sm text-blue-200/70 font-medium">
                            {isRtl ? 'إكمال المنهج بنسبة 95% قبل نهاية الفصل الدراسي.' : 'Complete 95% of the curriculum before the term ends.'}
                          </p>
                       </div>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}
        </div>
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
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xl font-black text-[#002147]">
                  {isRtl ? 'إضافة مادة أو درس' : 'Add Subject or Lesson'}
                </h3>
                <button onClick={() => setShowAddLessonModal(false)} className="text-slate-400 hover:text-rose-500">
                  <Plus className="rotate-45" size={24} />
                </button>
              </div>
              
              <div className="p-8 overflow-y-auto space-y-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase mb-3 block">
                    {isRtl ? 'اختر مادة من المناهج المتاحة' : 'Choose Lesson from Curriculums'}
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      ...ALL_READING_UNITS['A1'].map(u => ({ courseId: 'reading', label: isRtl ? 'القراءة' : 'Reading', topic: isRtl ? u.titleAr : u.titleEn, unitId: u.id, level: 'A1' })),
                      ...ALL_GRAMMAR_UNITS['A1'].map(u => ({ courseId: 'grammar', label: isRtl ? 'القواعد' : 'Grammar', topic: isRtl ? u.titleAr : u.titleEn, unitId: u.id, level: 'A1' })),
                      ...ALL_WRITING_UNITS['A1'].map(u => ({ courseId: 'writing', label: isRtl ? 'الكتابة' : 'Writing', topic: isRtl ? u.titleAr : u.titleEn, unitId: u.id, level: 'A1' })),
                      ...OXFORD_UNITS.slice(0, 10).map(u => ({ courseId: 'oxford', label: 'Oxford', topic: isRtl ? u.titleAr : u.titleEn, unitId: String(u.id), level: 'General' }))
                    ].map((lesson, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAddLesson(lesson)}
                        className="w-full text-right flex items-center justify-between p-4 bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 rounded-2xl transition-all"
                      >
                        <div>
                          <span className="text-[10px] font-black text-blue-600 block mb-1 uppercase opacity-60">{lesson.label}</span>
                          <span className="text-sm font-black text-[#002147]">{lesson.topic}</span>
                        </div>
                        <Plus size={16} className="text-blue-600" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
