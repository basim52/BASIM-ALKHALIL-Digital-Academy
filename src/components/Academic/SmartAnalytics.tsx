import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  BarChart3, 
  ArrowLeft, 
  Download, 
  Languages, 
  Sparkles, 
  Target, 
  Brain, 
  Camera, 
  Award, 
  Calendar, 
  Clock, 
  Activity, 
  Send, 
  Loader2, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  Volume2, 
  Flame, 
  GraduationCap,
  Filter,
  Search,
  Printer,
  ChevronRight,
  Zap,
  Quote,
  Layers,
  ExternalLink,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { Language } from '../../lib/translations';
import { toPng } from 'html-to-image';
import { 
  ACADEMIC_PILLARS, 
  AcademicPillar, 
  processAcademicResults, 
  getRemedialRecommendations,
  StandardizedResult
} from '../../utils/academicData';

interface SmartAnalyticsProps {
  lang: Language;
  onBack: () => void;
  planItems?: any[] | null;
  studentName?: string;
  studentId?: string;
  level?: string;
  onNavigateToSection?: (sectionId: string) => void;
}

export const SmartAnalytics: React.FC<SmartAnalyticsProps> = ({
  lang,
  onBack,
  studentName = 'الطالب المتميز',
  studentId = 'student_001',
  level = 'B1',
  onNavigateToSection
}) => {
  const [currentLang, setCurrentLang] = useState<Language>(lang);
  const isRtl = currentLang === 'ar';
  const reportRef = useRef<HTMLDivElement>(null);
  const certificateRef = useRef<HTMLDivElement>(null);

  // States
  const [loading, setLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [rawResults, setRawResults] = useState<any[]>([]);
  const [activePortalTab, setActivePortalTab] = useState<'analytics' | 'extraction' | 'certificate' | 'remediation' | 'ai_counselor'>('analytics');

  // Report Extraction Filter States
  const [filterPillar, setFilterPillar] = useState<string>('all');
  const [filterGradeRange, setFilterGradeRange] = useState<'all' | 'high' | 'mid' | 'low'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // AI Counselor States
  const [aiMessage, setAiMessage] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  // Selected Pillar for Deep-Dive Modal / Remediation
  const [selectedPillarForRemediation, setSelectedPillarForRemediation] = useState<string>('grammar');

  // Toggle Language
  const toggleLanguage = () => {
    setCurrentLang(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  // Mock Simulated Data for Demonstration
  const loadSimulatedData = () => {
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    
    return [
      { id: 'sim-1', courseId: 'grammar_academy', lessonId: 'g_past_perfect', lessonTitle: isRtl ? 'أكاديمية القواعد: الماضي التام والروابط الزمنية' : 'Grammar: Past Perfect & Temporal Connectors', score: 95, total: 100, level: 'B1', timestamp: new Date(now - 1 * day) },
      { id: 'sim-2', courseId: 'reading_lab', lessonId: 'r_london_history', lessonTitle: isRtl ? 'مختبر القراءة: تاريخ معالم لندن العريقة' : 'Reading Lab: Historic London Landmarks', score: 90, total: 100, level: 'B1', timestamp: new Date(now - 2 * day) },
      { id: 'sim-3', courseId: 'writing_studio', lessonId: 'w_essay_ai_future', lessonTitle: isRtl ? 'استوديو التعبير: صياغة مقال الذكاء الاصطناعي' : 'Writing Studio: Essay on Future of AI', score: 88, total: 100, level: 'B1', timestamp: new Date(now - 3 * day) },
      { id: 'sim-4', courseId: 'pronunciation_lab', lessonId: 'pron_connected_speech', lessonTitle: isRtl ? 'معمل النطق: مخارج الحروف والنبرة المتصلة' : 'Pronunciation: Connected Speech & Rhythm', score: 85, total: 100, level: 'B1', timestamp: new Date(now - 4 * day) },
      { id: 'sim-5', courseId: 'educational_games', lessonId: 'etiquette_royal_knights', lessonTitle: isRtl ? 'واحة الألعاب: فرسان الذوق والآداب الراقية' : 'Educational Games: Royal Etiquette Knights', score: 100, total: 100, level: 'All', timestamp: new Date(now - 5 * day) },
      { id: 'sim-6', courseId: 'kids_stories', lessonId: 'kids_story_001', lessonTitle: isRtl ? 'مغامرات نور: الوصول إلى مطار هيثرو' : 'Noor Adventures: Arriving at Heathrow', score: 92, total: 100, level: 'A2', timestamp: new Date(now - 6 * day) },
      { id: 'sim-7', courseId: 'adults_daily_dose', lessonId: 'dd_common_errors_01', lessonTitle: isRtl ? 'الجرعة اليومية: تصحيح أخطاء حروف الجر' : 'Daily Dose: Preposition Error Clinic', score: 80, total: 100, level: 'B1', timestamp: new Date(now - 7 * day) },
      { id: 'sim-8', courseId: 'oxford_discover', lessonId: 'ox_unit_3_energy', lessonTitle: isRtl ? 'منهج أكسفورد: الوحدة 3 - الطاقة المتجددة' : 'Oxford Discover: Unit 3 Renewable Energy', score: 78, total: 100, level: 'B1', timestamp: new Date(now - 8 * day) },
      { id: 'sim-9', courseId: 'live_translate', lessonId: 'trans_idioms_01', lessonTitle: isRtl ? 'المترجم الحي: صياغة الأمثال والتعابير الاصطلاحية' : 'Live Translate: Idioms & Nuance Sandbox', score: 84, total: 100, level: 'B1', timestamp: new Date(now - 9 * day) },
      { id: 'sim-10', courseId: 'bi-weekly-test', lessonId: 'test_midterm_01', lessonTitle: isRtl ? 'الاختبار النصف شهري الشامل' : 'Comprehensive Bi-Weekly Assessment', score: 88, total: 100, level: 'B1', timestamp: new Date(now - 10 * day) }
    ];
  };

  // Fetch Live Results from Firestore
  useEffect(() => {
    async function fetchResults() {
      setLoading(true);
      try {
        if (!studentId || studentId.startsWith('sim_') || isDemoMode) {
          setRawResults(loadSimulatedData());
          setLoading(false);
          return;
        }

        const q = query(
          collection(db, 'lessonResults'),
          where('userId', '==', studentId),
          orderBy('timestamp', 'desc'),
          limit(100)
        );

        const snap = await getDocs(q);
        if (snap.empty) {
          // Fallback to simulated data if no results logged yet
          setRawResults(loadSimulatedData());
          setIsDemoMode(true);
        } else {
          const list = snap.docs.map(d => ({
            id: d.id,
            ...d.data()
          }));
          setRawResults(list);
        }
      } catch (err) {
        console.warn('Firestore fetch failed, activating demonstration mode:', err);
        setRawResults(loadSimulatedData());
        setIsDemoMode(true);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [studentId, isDemoMode]);

  // Process data with unified Taxonomy & Metrics
  const { standardized, kpis } = useMemo(() => {
    return processAcademicResults(rawResults, isRtl);
  }, [rawResults, isRtl]);

  // Set initial selected remediation pillar to the student's weakest domain
  useEffect(() => {
    if (kpis.weakestPillars.length > 0) {
      setSelectedPillarForRemediation(kpis.weakestPillars[0].id);
    }
  }, [kpis.weakestPillars]);

  // Filtered Results for Extraction Tool
  const filteredResults = useMemo(() => {
    return standardized.filter(item => {
      // Pillar Filter
      if (filterPillar !== 'all' && item.pillar.id !== filterPillar) return false;

      // Grade Range Filter
      if (filterGradeRange === 'high' && item.percentage < 90) return false;
      if (filterGradeRange === 'mid' && (item.percentage < 70 || item.percentage >= 90)) return false;
      if (filterGradeRange === 'low' && item.percentage >= 70) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = item.lessonTitle.toLowerCase().includes(q);
        const matchId = item.lessonId.toLowerCase().includes(q);
        const matchPillar = (isRtl ? item.pillar.nameAr : item.pillar.nameEn).toLowerCase().includes(q);
        if (!matchTitle && !matchId && !matchPillar) return false;
      }

      return true;
    });
  }, [standardized, filterPillar, filterGradeRange, searchQuery, isRtl]);

  // Filtered Stats
  const filteredAverage = useMemo(() => {
    if (filteredResults.length === 0) return 0;
    const sum = filteredResults.reduce((acc, curr) => acc + curr.percentage, 0);
    return Math.round(sum / filteredResults.length);
  }, [filteredResults]);

  // Export report / certificate as High-Resolution PNG
  const exportAsImage = async (targetRef: React.RefObject<HTMLDivElement | null>, filename: string) => {
    if (!targetRef.current || isExporting) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(targetRef.current, {
        quality: 0.95,
        backgroundColor: '#ffffff',
        pixelRatio: 2
      });
      const link = document.createElement('a');
      link.download = `${filename}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export image error:', err);
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  // AI Counselor Request
  const askAIConsultant = async (customPrompt?: string) => {
    const queryText = customPrompt || aiMessage;
    if (!queryText.trim() || isLoadingAI) return;

    setIsLoadingAI(true);
    setAiResponse(null);

    try {
      const resp = await fetch('/api/lesson/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `أنت المستشار الأكاديمي والتربوي الذكي في أكاديمية باسم الخليل الرقمية.
بيانات أداء الطالب الحالي:
- الاسم: ${studentName}
- المستوى اللغوي: ${level} (المقدر دولياً: ${kpis.inferredCefrLevel})
- المعدل التراكمي الإجمالي: ${kpis.overallGPA}%
- إجمالي الأنشطة المنجزة: ${kpis.totalActivities} نشاط
- أضعف المجالات: ${kpis.weakestPillars.map(p => isRtl ? p.nameAr : p.nameEn).join(', ') || 'لا يوجد'}
- أقوى المجالات: ${kpis.strongestPillars.map(p => isRtl ? p.nameAr : p.nameEn).join(', ') || 'جميعها ممتازة'}

سؤال الطالب أو ولي الأمر:
"${queryText}"

المطلوب:
1. قدم تحليلاً دقيقاً ومطمئناً بأسلوب أكاديمي راقٍ ومشجع.
2. حدد نقطتي قوة بارزتين ونقطة واحدة تحتاج تمكيناً.
3. اقترح خطة عمل علاجية عملية من 3 خطوات واضحة قابلة للتطبيق خلال الأسبوع الحالي.
صغ الإجابة بنقاط منسقة وواضحة جداً باللغة العربية الفصحى.`,
          userLevel: level,
          lessonContext: 'بوابة المتابعة الأكاديمية الذكية واستخلاص التقارير'
        })
      });

      const data = await resp.json();
      setAiResponse(data.reply || data.text || 'شكراً لسؤالك. يُظهر تحليلك الأكاديمي تقدماً متوازناً، ونوصي بمواصلة ممارسة تدريبات القواعد والتعبير بانتظام.');
      setAiMessage('');
    } catch (err) {
      console.error('AI Counselor Error:', err);
      setAiResponse(
        isRtl 
          ? `بناءً على نتائجك الأكاديمية ومعدلك التراكمي (${kpis.overallGPA}%)، أداؤك متميز في الأقسام الأساسية! نوصيك بزيادة التركيز على ${kpis.weakestPillars[0]?.nameAr || 'القواعد'} وإتمام 3 تمارين إضافية هذا الأسبوع لرفع معدلك فوق 90%.`
          : `Based on your aggregate GPA (${kpis.overallGPA}%), your progress is solid! We recommend allocating 15 extra minutes to ${kpis.weakestPillars[0]?.nameEn || 'Grammar'} to boost your score above 90%.`
      );
    } finally {
      setIsLoadingAI(false);
    }
  };

  const activeRemedialTrack = useMemo(() => {
    return getRemedialRecommendations(selectedPillarForRemediation, isRtl);
  }, [selectedPillarForRemediation, isRtl]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fdfbf7] flex flex-col items-center justify-center p-8 space-y-4">
        <Loader2 size={40} className="animate-spin text-[#002147]" />
        <p className="text-sm font-black text-[#002147] animate-pulse">
          {isRtl ? 'جارٍ تجميع ومطابقة بيانات الأقسام واستخلاص التقارير...' : 'Aggregating cross-section metrics and generating reports...'}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] py-6 px-4 md:px-8 max-w-7xl mx-auto space-y-8" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* 1. TOP HEADER & PORTAL BRANDING */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-[#b48e56]/20">
        <div className="flex items-center gap-3.5">
          <div className="w-13 h-13 bg-gradient-to-br from-[#002147] to-[#0a3a70] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-950/20">
            <Brain size={28} className="text-[#C49E3A]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-black text-[#002147]">
                {isRtl ? 'بوابة المتابعة الأكاديمية الذكية 📊' : 'Smart Academic Tracking Portal 📊'}
              </h1>
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 bg-amber-50 text-[#C49E3A] border border-[#C49E3A]/30 rounded-full">
                {isRtl ? 'نظام الربط الشامل' : 'All-Sections Hub'}
              </span>
            </div>
            <p className="text-xs text-[#b48e56] font-bold tracking-wide mt-0.5">
              {isRtl 
                ? 'استخلاص التقارير التراكمية، تشخيص المهارات الـ 12، واستخراج الشهادات الرسمية' 
                : 'Cross-sectional report extraction, 12-pillar skill diagnosis, and official certifiable records'}
            </p>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-end">
          <button
            onClick={() => setIsDemoMode(prev => !prev)}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all border flex items-center gap-2 cursor-pointer ${
              isDemoMode 
                ? 'bg-amber-50 border-amber-300 text-amber-800' 
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Activity size={14} className={isDemoMode ? 'text-amber-600 animate-spin' : ''} />
            {isDemoMode ? (isRtl ? 'نمط المحاكاة الإثرائي ⚡' : 'Demo Data ⚡') : (isRtl ? 'البيانات الموثقة 🔒' : 'Live Data 🔒')}
          </button>

          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 font-black hover:bg-slate-50 transition-all text-xs cursor-pointer"
          >
            <Languages size={14} className="text-blue-600" />
            {currentLang === 'ar' ? 'English' : 'العربية'}
          </button>

          <button
            onClick={() => exportAsImage(reportRef, `academic-report-${studentName}`)}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 bg-[#002147] text-white rounded-xl font-black hover:bg-blue-900 transition-all shadow-md text-xs cursor-pointer disabled:opacity-50"
          >
            {isExporting ? <Loader2 size={14} className="animate-spin" /> : <Camera size={14} className="text-[#C49E3A]" />}
            {isRtl ? 'تصدير التقرير 📸' : 'Export PNG 📸'}
          </button>

          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-black text-xs transition-all cursor-pointer"
          >
            <ArrowLeft size={14} />
            {isRtl ? 'العودة ↩️' : 'Back ↩️'}
          </button>
        </div>
      </div>

      {/* Demo Mode Alert Banner */}
      {isDemoMode && (
        <div className="bg-amber-50/90 border border-amber-200 p-4 rounded-2xl flex items-center justify-between gap-3 text-amber-800">
          <div className="flex items-center gap-2.5">
            <AlertTriangle size={18} className="text-amber-600 flex-shrink-0" />
            <p className="text-xs font-bold leading-relaxed">
              {isRtl 
                ? 'يتم الآن عرض سجلات تفاعلية محاكية تغطي كافة أقسام الأكاديمية لتوضيح كفاءة الربط واستخلاص التقارير.' 
                : 'Displaying comprehensive interactive simulation data across all academy sections to demonstrate report extraction.'}
            </p>
          </div>
          <button 
            onClick={() => setIsDemoMode(false)}
            className="px-3 py-1 bg-amber-600 text-white rounded-lg text-[10px] font-black hover:bg-amber-700 transition-colors whitespace-nowrap"
          >
            {isRtl ? 'تحميل بياناتي الحقيقية' : 'Load My Real Data'}
          </button>
        </div>
      )}

      {/* 2. PORTAL PRIMARY TABS NAVIGATION */}
      <div className="flex overflow-x-auto pb-2 border-b border-slate-200 gap-2 select-none scrollbar-none">
        {[
          { id: 'analytics', labelAr: 'التحليلات ومصفوفة المهارات 📊', labelEn: 'Skill Matrix & Analytics 📊', icon: Activity },
          { id: 'extraction', labelAr: 'استخلاص التقارير والتصفية 📑', labelEn: 'Report Extraction & Filters 📑', icon: Filter },
          { id: 'certificate', labelAr: 'الشهادة وبطاقة الأداء المعتمدة 🎓', labelEn: 'Official Certified Record 🎓', icon: GraduationCap },
          { id: 'remediation', labelAr: 'خريطة الدعم والتقويم العلاجي 🩺', labelEn: 'Remediation Roadmap 🩺', icon: Sparkles },
          { id: 'ai_counselor', labelAr: 'المستشار الأكاديمي الذكي 🤖', labelEn: 'AI Academic Counselor 🤖', icon: Brain }
        ].map(tab => {
          const isActive = activePortalTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActivePortalTab(tab.id as any)}
              className={`px-4 py-2.5 text-xs font-black rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#002147] text-white shadow-md shadow-blue-950/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <tab.icon size={15} className={isActive ? 'text-[#C49E3A]' : 'text-slate-400'} />
              <span>{isRtl ? tab.labelAr : tab.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* RENDER VIEW ACCORDING TO ACTIVE TAB */}

      {/* TAB 1: FULL CROSS-SECTION ANALYTICS & PILLAR RADAR */}
      {activePortalTab === 'analytics' && (
        <div ref={reportRef} className="space-y-8 bg-transparent">
          
          {/* Top Bento Stats Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Bento 1: Overall GPA */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-blue-200 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{isRtl ? 'المعدل التراكمي الشامل' : 'Cumulative Overall GPA'}</span>
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Award size={16} />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-baseline gap-2">
                  <h2 className="text-3xl font-black text-[#002147]">{kpis.overallGPA}%</h2>
                  <span className="text-xs text-emerald-600 font-bold">
                    {kpis.overallGPA >= 85 ? (isRtl ? 'امتياز 🌟' : 'Excellent') : (isRtl ? 'مستقر 📈' : 'Steady')}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-bold mt-1">
                  {isRtl ? 'محسوب بدقة عبر كافة نتائج الأقسام' : 'Aggregated across all module results'}
                </p>
              </div>
            </div>

            {/* Bento 2: Completed Activities */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-emerald-200 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{isRtl ? 'إجمالي الأنشطة المنجزة' : 'Total Logged Activities'}</span>
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 size={16} />
                </div>
              </div>
              <div className="mt-4">
                <h2 className="text-3xl font-black text-[#002147]">
                  {kpis.totalActivities} <span className="text-xs font-bold text-slate-400">{isRtl ? 'نشاطاً' : 'Units'}</span>
                </h2>
                <p className="text-[10px] text-slate-400 font-bold mt-1">
                  {isRtl ? 'شاملة الاختبارات والتمارين والكويزات' : 'Including quizzes, drills and tests'}
                </p>
              </div>
            </div>

            {/* Bento 3: International CEFR Standard */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-amber-200 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{isRtl ? 'المستوى المعياري (CEFR)' : 'Estimated CEFR Level'}</span>
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-[#C49E3A] flex items-center justify-center">
                  <GraduationCap size={16} />
                </div>
              </div>
              <div className="mt-4">
                <h2 className="text-2xl font-black text-[#002147] truncate">{kpis.inferredCefrLevel.split(' ')[0]}</h2>
                <p className="text-[10px] text-slate-400 font-bold mt-1 truncate">
                  {kpis.inferredCefrLevel}
                </p>
              </div>
            </div>

            {/* Bento 4: Total Study Investment */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-purple-200 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{isRtl ? 'ساعات التعلم التفاعلي' : 'Active Study Hours'}</span>
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Clock size={16} />
                </div>
              </div>
              <div className="mt-4">
                <h2 className="text-3xl font-black text-[#002147]">
                  {kpis.estimatedHours} <span className="text-xs font-bold text-slate-400">{isRtl ? 'ساعة' : 'Hrs'}</span>
                </h2>
                <p className="text-[10px] text-slate-400 font-bold mt-1">
                  {isRtl ? 'زمن التعلم المركز في التطبيق' : 'Calculated focused learning duration'}
                </p>
              </div>
            </div>

          </div>

          {/* 12 ACADEMIC PILLARS MATRIX - Fully linked to each section */}
          <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-lg font-black text-[#002147] flex items-center gap-2">
                  <Layers size={20} className="text-[#C49E3A]" />
                  {isRtl ? 'مصفوفة المهارات والأقسام اللغوية الـ 12' : 'The 12 Linguistic Academic Pillars'}
                </h3>
                <p className="text-xs text-slate-400 font-bold mt-0.5">
                  {isRtl 
                    ? 'انقر على أي قسم لعرض تفاصيله أو الانتقال للتدريب المباشر فوراً' 
                    : 'Click on any pillar to view detailed progress or jump directly to practice'}
                </p>
              </div>
              <span className="text-[10px] font-black px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full">
                {isRtl ? 'تحديث فوري ومتصل' : 'Live Sync Active'}
              </span>
            </div>

            {/* Grid of all 12 Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ACADEMIC_PILLARS.map(pillar => {
                const stat = kpis.pillarStats[pillar.id];
                const count = stat?.count || 0;
                const avg = stat?.avgScore || 0;
                const tier = stat?.masteryTier || 'unattempted';

                return (
                  <div
                    key={pillar.id}
                    className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between group relative"
                  >
                    <div>
                      {/* Top icon and badge */}
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${pillar.bgGradient} shadow-xs`}>
                          <pillar.icon size={18} />
                        </div>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-md border ${
                          tier === 'mastered' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          tier === 'proficient' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          tier === 'in_progress' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          'bg-slate-100 text-slate-400 border-slate-200'
                        }`}>
                          {tier === 'mastered' ? (isRtl ? 'متمكن 🌟' : 'Mastered 🌟') :
                           tier === 'proficient' ? (isRtl ? 'متقدم ⚡' : 'Proficient ⚡') :
                           tier === 'in_progress' ? (isRtl ? 'قيد البناء 📈' : 'In Progress 📈') :
                           (isRtl ? 'لم يبدأ بعد ⏳' : 'Not Started ⏳')}
                        </span>
                      </div>

                      {/* Titles & Desc */}
                      <h4 className="text-sm font-black text-[#002147] group-hover:text-blue-700 transition-colors">
                        {isRtl ? pillar.nameAr : pillar.nameEn}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-bold line-clamp-2 mt-1">
                        {isRtl ? pillar.descAr : pillar.descEn}
                      </p>
                    </div>

                    {/* Progress Bar & Jump Button */}
                    <div className="mt-4 pt-3 border-t border-slate-200/60 space-y-2.5">
                      <div className="flex justify-between items-center text-[10px] font-black">
                        <span className="text-slate-500">
                          {count > 0 ? `${count} ${isRtl ? 'نشاط منجز' : 'units done'}` : (isRtl ? 'لا سجلات' : 'No records')}
                        </span>
                        <span className="text-[#002147] font-bold">
                          {count > 0 ? `${avg}%` : '--'}
                        </span>
                      </div>

                      <div className="w-full h-2 bg-slate-200/70 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${count > 0 ? avg : 0}%` }}
                          transition={{ duration: 0.8 }}
                          className={`h-full ${pillar.color} rounded-full`}
                        />
                      </div>

                      {/* Direct Jump Button to Section */}
                      {onNavigateToSection && (
                        <button
                          onClick={() => onNavigateToSection(pillar.route)}
                          className="w-full mt-2 py-1.5 px-3 bg-white hover:bg-[#002147] text-[#002147] hover:text-white border border-slate-200 rounded-xl text-[10px] font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>{isRtl ? 'الانتقال للقسم والممارسة ➔' : 'Jump to Section ➔'}</span>
                          <ExternalLink size={10} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* WEEKLY ACTIVITY & TIME OF DAY CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Chart 1: Weekly Distribution */}
            <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200/80 shadow-xs space-y-4">
              <div>
                <h3 className="text-base font-black text-[#002147] flex items-center gap-2">
                  <Calendar size={18} className="text-blue-600" />
                  {isRtl ? 'توزيع التفاعل على أيام الأسبوع' : 'Weekly Activity Rhythm'}
                </h3>
                <p className="text-[10px] text-slate-400 font-bold mt-0.5">
                  {isRtl ? 'معدل الدروس المنجزة يومياً' : 'Completed lessons by day of week'}
                </p>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={kpis.weeklyActivity}>
                    <defs>
                      <linearGradient id="blueBarGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#002147" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#64748b' }} />
                    <YAxis hide allowDecimals={false} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                    <Bar dataKey="count" fill="url(#blueBarGrad)" radius={[8, 8, 0, 0]} maxBarSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Time of Day Concentration */}
            <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-black text-[#002147] flex items-center gap-2">
                  <Clock size={18} className="text-amber-500" />
                  {isRtl ? 'أوقات ذروة الاستيعاب والتعلم' : 'Peak Learning Study Times'}
                </h3>
                <p className="text-[10px] text-slate-400 font-bold mt-0.5">
                  {isRtl ? 'تفضيل الطالب للفترات الزمنية' : 'Distribution of active study sessions'}
                </p>
              </div>

              {kpis.timeOfDayActivity.length > 0 ? (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
                  <div className="w-40 h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={kpis.timeOfDayActivity}
                          innerRadius={35}
                          outerRadius={55}
                          paddingAngle={4}
                          dataKey="count"
                        >
                          {kpis.timeOfDayActivity.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 space-y-2 w-full">
                    {kpis.timeOfDayActivity.map((slot, index) => (
                      <div key={index} className="flex items-center justify-between text-xs font-black p-2 bg-slate-50 rounded-xl">
                        <div className="flex items-center gap-2 text-slate-700">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: slot.color }} />
                          <span>{slot.name}</span>
                        </div>
                        <span className="text-[#002147]">({slot.count} {isRtl ? 'جلسة' : 'sessions'})</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-40 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-2xl text-xs text-slate-400 font-bold">
                  {isRtl ? 'لا توجد بيانات كافية بعد' : 'No study times recorded yet'}
                </div>
              )}
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: REPORT EXTRACTION & FILTER QUERY TOOL */}
      {activePortalTab === 'extraction' && (
        <div className="space-y-6">
          
          {/* Filter Bar Controls */}
          <div className="bg-white p-6 rounded-[2rem] border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-black text-[#002147] flex items-center gap-2">
                  <Filter size={18} className="text-[#C49E3A]" />
                  {isRtl ? 'مستخلص التقارير والاستعلام التفاعلي' : 'Interactive Report Extractor & Query'}
                </h3>
                <p className="text-xs text-slate-400 font-bold mt-0.5">
                  {isRtl ? 'استخرج وصنف نتائج التمارين حسب القسم والدرجة والتاريخ فوراً' : 'Filter and extract student records by category, score tier and query'}
                </p>
              </div>

              {/* Print / Export Filtered Result Button */}
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100 rounded-xl text-xs font-black transition-all cursor-pointer"
              >
                <Printer size={14} />
                {isRtl ? 'طباعة النتائج المستخلصة 🖨️' : 'Print Extracted Results 🖨️'}
              </button>
            </div>

            {/* Filter inputs row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              
              {/* Pillar Selector */}
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">
                  {isRtl ? 'تصفية حسب القسم / المهارة' : 'Filter by Pillar'}
                </label>
                <select
                  value={filterPillar}
                  onChange={(e) => setFilterPillar(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-[#002147] outline-none"
                >
                  <option value="all">{isRtl ? 'جميع الأقسام الـ 12' : 'All 12 Pillars'}</option>
                  {ACADEMIC_PILLARS.map(p => (
                    <option key={p.id} value={p.id}>
                      {isRtl ? p.nameAr : p.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              {/* Grade Tier Selector */}
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">
                  {isRtl ? 'نطاق الدرجات والتحصيل' : 'Score Range'}
                </label>
                <select
                  value={filterGradeRange}
                  onChange={(e) => setFilterGradeRange(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-[#002147] outline-none"
                >
                  <option value="all">{isRtl ? 'كافة الدرجات' : 'All Scores'}</option>
                  <option value="high">{isRtl ? 'درجات التميز (≥ 90%)' : 'Excellence (≥ 90%)'}</option>
                  <option value="mid">{isRtl ? 'درجات مقبولة (70% - 89%)' : 'Good (70% - 89%)'}</option>
                  <option value="low">{isRtl ? 'تحتاج مراجعة (< 70%)' : 'Needs Review (< 70%)'}</option>
                </select>
              </div>

              {/* Live Search */}
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">
                  {isRtl ? 'بحث في أسماء الدروس' : 'Search Lessons'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isRtl ? 'ابحث باسم الدرس أو المعرف...' : 'Search by title or lesson ID...'}
                    className="w-full pr-8 pl-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-[#002147] outline-none placeholder:text-slate-400"
                  />
                  <Search size={14} className="absolute right-2.5 top-3 text-slate-400 pointer-events-none" />
                </div>
              </div>

            </div>

            {/* Extracted Stats Badge Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-black">
              <span className="px-3 py-1 bg-slate-100 rounded-lg text-slate-700">
                {isRtl ? `النتائج المستخلصة: ${filteredResults.length}` : `Extracted Records: ${filteredResults.length}`}
              </span>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg">
                {isRtl ? `متوسط درجات التصفية: ${filteredAverage}%` : `Filtered Average: ${filteredAverage}%`}
              </span>
            </div>
          </div>

          {/* Extracted Records Table */}
          <div className="bg-white rounded-[2rem] border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-black">
                  <tr>
                    <th className="p-4">{isRtl ? 'عنوان النشاط والدرس' : 'Lesson & Activity'}</th>
                    <th className="p-4">{isRtl ? 'القسم الأكاديمي' : 'Academic Pillar'}</th>
                    <th className="p-4">{isRtl ? 'التاريخ والوقت' : 'Date & Time'}</th>
                    <th className="p-4">{isRtl ? 'الدرجة والنسبة' : 'Score & Ratio'}</th>
                    <th className="p-4">{isRtl ? 'التقييم' : 'Status'}</th>
                    <th className="p-4 text-center">{isRtl ? 'الإجراء' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-bold text-[#002147]">
                  {filteredResults.length > 0 ? (
                    filteredResults.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="p-4">
                          <div className="font-black text-sm text-[#002147]">{item.lessonTitle}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{item.lessonId}</div>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black text-white bg-gradient-to-r ${item.pillar.bgGradient}`}>
                            <item.pillar.icon size={11} />
                            {isRtl ? item.pillar.nameAr : item.pillar.nameEn}
                          </span>
                        </td>
                        <td className="p-4 text-slate-500 text-[11px]">
                          {item.timestamp.toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                        <td className="p-4 font-mono font-black text-sm" dir="ltr">
                          <span className={`${
                            item.percentage >= 85 ? 'text-emerald-600' :
                            item.percentage >= 70 ? 'text-blue-600' : 'text-amber-600'
                          }`}>
                            {item.score}/{item.total} ({item.percentage}%)
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                            item.percentage >= 85 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            item.percentage >= 70 ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                            'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {item.percentage >= 85 ? (isRtl ? 'ممتاز ✓' : 'Excellent ✓') :
                             item.percentage >= 70 ? (isRtl ? 'جيد جداً ✓' : 'Very Good ✓') :
                             (isRtl ? 'يحتاج تدريب ⚠️' : 'Practice ⚠️')}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          {onNavigateToSection && (
                            <button
                              onClick={() => onNavigateToSection(item.pillar.route)}
                              className="px-3 py-1 bg-slate-100 hover:bg-[#002147] text-slate-700 hover:text-white rounded-lg text-[10px] font-black transition-all cursor-pointer"
                            >
                              {isRtl ? 'إعادة المحاولة ➔' : 'Retry ➔'}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-10 text-center text-slate-400 font-bold">
                        {isRtl ? 'لا توجد نتائج تطابق معايير التصفية المحددة' : 'No records match the current filter criteria'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: OFFICIAL CERTIFIED ACADEMIC REPORT CARD */}
      {activePortalTab === 'certificate' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-black text-[#002147]">
                {isRtl ? 'بطاقة الأداء والتقرير الأكاديمي المعتمد رسمياً' : 'Official Certifiable Academic Record'}
              </h3>
              <p className="text-xs text-slate-400 font-bold">
                {isRtl ? 'وثيقة تقييم أكاديمية شاملة ومصدقة بأثر رجعي لجميع الأقسام' : 'Official certified record with supervisor endorsement'}
              </p>
            </div>
            <button
              onClick={() => exportAsImage(certificateRef, `official-certificate-${studentName}`)}
              disabled={isExporting}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#002147] to-[#0a3a70] text-white rounded-xl font-black shadow-lg text-xs cursor-pointer disabled:opacity-50"
            >
              {isExporting ? <Loader2 size={15} className="animate-spin" /> : <Award size={15} className="text-[#C49E3A]" />}
              {isRtl ? 'تحميل الشهادة الرسمية 🎓' : 'Download Certificate 🎓'}
            </button>
          </div>

          {/* CERTIFICATE CANVAS FOR EXPORT */}
          <div
            ref={certificateRef}
            className="bg-white border-4 border-[#C49E3A]/40 p-8 md:p-12 rounded-[2.5rem] shadow-xl relative overflow-hidden space-y-8"
          >
            {/* Background Watermark Seal */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
              <Brain size={420} />
            </div>

            {/* Certificate Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center pb-6 border-b-2 border-[#C49E3A]/30 gap-4">
              <div className="text-center sm:text-right space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-xs font-black text-[#C49E3A] uppercase tracking-widest">
                    Basim Alkhalil Digital Academy
                  </span>
                  <ShieldCheck size={16} className="text-emerald-600" />
                </div>
                <h2 className="text-2xl font-black text-[#002147]">
                  {isRtl ? 'بطاقة التقرير الأكاديمي الشامل والتقييم اللغوي' : 'Comprehensive Academic Report & Proficiency Card'}
                </h2>
                <p className="text-[10px] text-slate-400 font-bold">
                  {isRtl ? 'أكاديمية باسم الخليل للتميز اللغوي والتعليم الذكي' : 'Basim Alkhalil Academy for Linguistic Excellence'}
                </p>
              </div>

              {/* Gold Medallion */}
              <div className="w-18 h-18 rounded-full border-4 border-[#C49E3A] bg-amber-50/50 flex flex-col items-center justify-center text-[#002147] shadow-inner">
                <GraduationCap size={26} className="text-[#C49E3A]" />
                <span className="text-[8px] font-black uppercase text-[#002147] mt-0.5">VERIFIED</span>
              </div>
            </div>

            {/* Student & Level Info Bento */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-[9px] font-black uppercase text-slate-400 block">{isRtl ? 'اسم الطالب' : 'Student Name'}</span>
                <span className="text-base font-black text-[#002147] block mt-1">{studentName}</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-[9px] font-black uppercase text-slate-400 block">{isRtl ? 'المستوى المقدر (CEFR)' : 'Proficiency Tier'}</span>
                <span className="text-base font-black text-blue-700 block mt-1">{kpis.inferredCefrLevel.split(' ')[0]}</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-[9px] font-black uppercase text-slate-400 block">{isRtl ? 'المعدل التراكمي' : 'Aggregate GPA'}</span>
                <span className="text-base font-black text-emerald-600 block mt-1" dir="ltr">{kpis.overallGPA}%</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-[9px] font-black uppercase text-slate-400 block">{isRtl ? 'تاريخ الإصدار' : 'Issue Date'}</span>
                <span className="text-xs font-black text-slate-700 block mt-1">
                  {new Date().toLocaleDateString(isRtl ? 'ar-SA' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
              </div>
            </div>

            {/* Pillar Breakdown Table Inside Certificate */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-[#002147] uppercase tracking-wider">
                {isRtl ? 'مؤشرات التمكن عبر محاور الأكاديمية:' : 'Performance Breakdown Across Academic Pillars:'}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {ACADEMIC_PILLARS.slice(0, 8).map(p => {
                  const stat = kpis.pillarStats[p.id];
                  return (
                    <div key={p.id} className="p-3 bg-amber-50/20 border border-[#C49E3A]/20 rounded-xl flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-700 truncate">{isRtl ? p.nameAr : p.nameEn}</span>
                      <span className="text-xs font-mono font-black text-[#002147]" dir="ltr">
                        {stat?.count > 0 ? `${stat.avgScore}%` : '--'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Academic Director Evaluation Paragraph */}
            <div className="p-5 bg-slate-50/80 border border-slate-200 rounded-2xl space-y-2">
              <h5 className="text-[10px] font-black uppercase text-slate-400">
                {isRtl ? 'التوصية الأكاديمية المعتمدة' : 'Official Academic Supervisor Appraisal'}
              </h5>
              <p className="text-xs text-slate-700 leading-relaxed font-bold">
                {isRtl
                  ? `تشهد أكاديمية باسم الخليل الرقمية بأن الطالب "${studentName}" أظهر تفاعلاً إيجابياً ومتميزاً في مختلف المهارات اللغوية، وحقق معدلاً تراكمياً (${kpis.overallGPA}%) يعكس كفاءة واستيعاباً واعداً. نوصي باستمرار التقويم الدوري والممارسة المستمرة للارتقاء للمستوى المتقدم.`
                  : `Basim Alkhalil Digital Academy certifies that student "${studentName}" has demonstrated consistent and commendable engagement across core linguistic skills, achieving a cumulative score of ${kpis.overallGPA}%. Continued deliberate practice is highly endorsed.`}
              </p>
            </div>

            {/* Official Signature and Seal Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t-2 border-[#C49E3A]/30 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-[10px] font-black">
                  🛡️ {isRtl ? 'وثيقة موثقة رقمياً • كود التحقق:' : 'Digital Verified Document • UUID:'} {studentId?.substring(0, 8) || 'BA-770X'}
                </div>
              </div>

              <div className="text-center sm:text-left space-y-1">
                <span className="text-xs font-black italic text-slate-600 block">Basim Alkhalil</span>
                <div className="w-28 border-b-2 border-slate-400 mx-auto sm:mx-0" />
                <span className="text-[9px] font-black uppercase text-slate-400 block">
                  {isRtl ? 'المشرف الأكاديمي العام' : 'Chief Academic Director'}
                </span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 4: DIAGNOSTIC & REMEDIATION ROADMAP */}
      {activePortalTab === 'remediation' && (
        <div className="space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200/90 shadow-xs space-y-6">
            <div>
              <h3 className="text-lg font-black text-[#002147] flex items-center gap-2">
                <Sparkles size={20} className="text-[#C49E3A] animate-pulse" />
                {isRtl ? 'خريطة الدعم والتقويم العلاجي الموجه' : 'Targeted Diagnostic & Remediation Roadmap'}
              </h3>
              <p className="text-xs text-slate-400 font-bold mt-0.5">
                {isRtl 
                  ? 'اختر أي قسم لإنشاء مسار علاجي مخصص من 3 خطوات فوراً مع روابط الانتقال المباشر' 
                  : 'Select any pillar to generate an actionable 3-step remediation strategy with instant links'}
              </p>
            </div>

            {/* Pillar selection chips */}
            <div className="flex flex-wrap gap-2">
              {ACADEMIC_PILLARS.map(p => {
                const isSelected = selectedPillarForRemediation === p.id;
                const stat = kpis.pillarStats[p.id];
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPillarForRemediation(p.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#002147] text-white shadow-md'
                        : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <p.icon size={13} className={isSelected ? 'text-[#C49E3A]' : 'text-slate-400'} />
                    <span>{isRtl ? p.nameAr : p.nameEn}</span>
                    {stat?.count > 0 && (
                      <span className={`text-[9px] px-1.5 py-0.2 rounded-md ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {stat.avgScore}%
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Remediation 3 Steps Card */}
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                <h4 className="text-sm font-black text-[#002147]">
                  {activeRemedialTrack.title}
                </h4>
                <span className="text-[10px] font-black px-2.5 py-1 bg-amber-100 text-amber-900 rounded-lg">
                  {isRtl ? 'خطة 7 أيام' : '7-Day Plan'}
                </span>
              </div>

              <div className="space-y-4">
                {activeRemedialTrack.steps.map(step => (
                  <div key={step.stepNum} className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 font-black text-xs flex items-center justify-center flex-shrink-0 border border-blue-200">
                        {step.stepNum}
                      </div>
                      <div className="space-y-0.5">
                        <h5 className="text-xs font-black text-[#002147]">{step.headline}</h5>
                        <p className="text-[11px] text-slate-500 font-bold">{step.description}</p>
                      </div>
                    </div>

                    {onNavigateToSection && (
                      <button
                        onClick={() => onNavigateToSection(step.targetRoute)}
                        className="px-4 py-2 bg-[#002147] hover:bg-blue-900 text-white rounded-xl text-[11px] font-black transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer whitespace-nowrap"
                      >
                        <span>{isRtl ? 'ابدأ الخطوة الآن ➔' : 'Start Step ➔'}</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 5: AI ACADEMIC & COGNITIVE COUNSELOR */}
      {activePortalTab === 'ai_counselor' && (
        <div className="bg-[#002147] text-white p-6 md:p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden space-y-6">
          <div className="absolute top-6 right-6 opacity-10 pointer-events-none">
            <Quote size={120} />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center text-[#C49E3A]">
                <Brain size={26} />
              </div>
              <div>
                <h3 className="text-xl font-black">{isRtl ? 'المستشار الأكاديمي والتربوي الذكي 🤖' : 'AI Academic Counselor 🤖'}</h3>
                <p className="text-xs text-blue-200 mt-0.5">
                  {isRtl ? 'تحليل ذكي متكامل لأداء الطالب مع توصيات إرشادية مخصصة' : 'Deep generative appraisal and personalized guidance'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick preset chips */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              isRtl ? 'ما هي أفضل طريقة لرفع معدلي في القواعد هذا الأسبوع؟' : 'How can I raise my Grammar score this week?',
              isRtl ? 'كيف أستعد للاختبار النصف شهري القادم بنجاح؟' : 'How should I prepare for the upcoming assessment?',
              isRtl ? 'حلل نقاط قوتي وضعفي وقدم لي جدولاً علاجياً.' : 'Analyze my strengths & weaknesses with a weekly schedule.'
            ].map((text, idx) => (
              <button
                key={idx}
                onClick={() => askAIConsultant(text)}
                className="px-3.5 py-2 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl text-[11px] font-black transition-all text-right hover:scale-[1.01] cursor-pointer"
              >
                💡 {text}
              </button>
            ))}
          </div>

          {/* Chat input form */}
          <div className="flex gap-2 relative z-10 pt-2">
            <input 
              type="text"
              value={aiMessage}
              onChange={(e) => setAiMessage(e.target.value)}
              placeholder={isRtl ? 'اكتب استفسارك الأكاديمي أو التربوي هنا...' : 'Type your academic inquiry here...'}
              onKeyDown={(e) => e.key === 'Enter' && askAIConsultant()}
              className="flex-grow px-5 py-3.5 bg-white/10 focus:bg-white/20 border-2 border-white/10 focus:border-white/30 rounded-2xl text-xs text-white placeholder-blue-200 outline-none transition-all font-black min-h-[44px]"
            />
            <button
              onClick={() => askAIConsultant()}
              disabled={isLoadingAI}
              className="px-6 bg-[#C49E3A] hover:bg-amber-500 text-[#002147] font-black rounded-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer min-h-[44px]"
            >
              {isLoadingAI ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              <span className="hidden sm:inline text-xs">{isRtl ? 'إرسال' : 'Send'}</span>
            </button>
          </div>

          {/* Response Container */}
          <AnimatePresence mode="wait">
            {isLoadingAI && (
              <motion.div 
                key="loading-ai"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3"
              >
                <Loader2 className="animate-spin text-[#C49E3A] flex-shrink-0" />
                <p className="text-xs font-black text-blue-100 animate-pulse">
                  {isRtl ? 'جارٍ تحليل سجلاتك في الأقسام وصياغة التوجيه الأكاديمي...' : 'Synthesizing your academic logs and crafting recommendations...'}
                </p>
              </motion.div>
            )}

            {aiResponse && !isLoadingAI && (
              <motion.div
                key="response-ai"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-white text-[#002147] rounded-[2rem] shadow-xl border border-white/10 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-[#C49E3A]" />
                    <span className="text-xs font-black text-slate-500 uppercase">{isRtl ? 'نتيجة التشخيص والتوجيه الأكاديمي' : 'Diagnostic Consultation Result'}</span>
                  </div>
                  <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    ✓ {isRtl ? 'مستند لسجلاتك الحقيقية' : 'Based on real data'}
                  </span>
                </div>
                
                <div className="text-xs leading-relaxed text-[#002147] font-bold whitespace-pre-wrap">
                  {aiResponse}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}

    </div>
  );
};
export default SmartAnalytics;
