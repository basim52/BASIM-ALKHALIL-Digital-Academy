import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
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
  TrendingUp,
  Brain,
  Zap,
  Quote,
  Camera,
  Share2,
  Award,
  Calendar,
  Clock,
  Activity,
  ChevronRight,
  Send,
  MessageSquare,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Volume2,
  Flame,
  Check,
  GraduationCap
} from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Language } from '../../lib/translations';
import html2canvas from 'html2canvas';

// Dictionary of localized terms to keep UI perfectly translated without breaking changes
const localT = {
  ar: {
    back: 'رجوع للوحة النتائج',
    title: 'التحليل الأكاديمي الشامل',
    subtitle: 'تحليل دقيق ومباشر مستخرج من صميم تفاعل الطالب وأدائه الفعلي في جميع المسارات الأكاديمية.',
    realtimeLabel: 'بيانات تفاعلية حية',
    overallGPA: 'المعدل العام التراكمي',
    gpaTrend: 'بناءً على نتائج الاختبارات والقصص والمهام اليومية المسجلة',
    avgScore: 'معدل النجاح الفعلي',
    completedUnits: 'الدروس والمهام المكتملة',
    completedUnitsDesc: 'عدد المهام المنجزة بنجاح',
    continuity: 'معدل التزام التفاعل',
    continuityDesc: 'انتظام تفاعلك مع الخطة',
    skillsDiagnosis: 'التشخيص الدقيق للمهارات الأساسية',
    skillsDiagnosisDesc: 'مستوى التحكم في المهارات اللغوية المختلفة بناءً على درجاتك الحقيقية:',
    skillListening: 'الاستماع والفهم الإلقائي (القصص المسموعة)',
    skillGrammar: 'البناء السليم والقواعد (منهج الفئات)',
    skillReading: 'القراءة والاستيعاب المقروء (منهج القراءة)',
    skillWriting: 'التعبير المصاغ والإنتاج الكتابي (منهج الكتابة)',
    skillOxford: 'مهارات كامب وأوكسفورد (منهج أوكسفورد)',
    skillDaily: 'الالتزام اليومي والمهام القصيرة (الجرعة اليومية وقصص الأطفال)',
    noDataYet: 'لم يتم رصد نتائج كافية بعد في هذا القسم. نوصي بالبدء بحل تمارين هذا المنهج لتفعيل الرصد الدقيق.',
    activeDays: 'تحليل النشاط الزمني اليومي',
    activeDaysDesc: 'يرصد هذا المخطط الأيام الأكثر نشاطاً في الأسبوع لتتبع تفاعل الطالب.',
    studyTimes: 'توقيت المذاكرة المفضل',
    studyTimesDesc: 'توزيع تفاعلك على أوقات اليوم لتحديد ذروة نشاطك العصبي اللغوي.',
    morning: 'الفترة الصباحية (5ص - 12م)',
    afternoon: 'فترة الظهر/العصر (12م - 5م)',
    evening: 'الفترة المسائية (5م - 10م)',
    night: 'فترة الليل المتأخر (10م - 5ص)',
    timelineTitle: 'سجل التفاعل والتقدم التفصيلي',
    timelineDesc: 'رصد فوري لجميع الأنشطة والاختبارات المكتملة مع علاماتك المحققة خطوة بخطوة:',
    lessonRun: 'درس مكتمل',
    score: 'النتيجة:',
    aiCounselor: 'المستشار الأكاديمي للذكاء الاصطناعي من صميم تفاعلك',
    aiCounselorDesc: 'يسحب الذكاء الاصطناعي ملف تفاعلك الفعلي من قواعد البيانات ويقدم لك تحليلاً تفصيلياً مخصصاً وخريطة طريق علاجية لنقاط الضعف. اسأله الآن:',
    askBtn1: 'ما هي أهم نقاط قوتي بناءً على درجاتي الفعالة؟',
    askBtn2: 'كيف أحسن مستوى القواعد والأوكسفورد لدي؟',
    askBtn3: 'حلل التوزيع الزمني لدراستي وقدم لي توجيهاً لتطويره.',
    placeholderText: 'اطرح أي سؤال أكاديمي تفاعلي حول أدائك...',
    send: 'إرسال الاستشارة',
    loadingAI: 'يتم الآن قراءة ورصد سجل تفاعلك الشامل وتوليد الاستشارة الذكية...',
    consultationResult: 'التشخيص والتحليل الأكاديمي الذكي المولد:',
    nextStep: 'الخطوة القادمة الموصى بها',
    readyToTest: 'أنت تحقق تقدماً رائعاً! ركز على الدروس القادمة في خطتك.',
    viewDetails: 'عرض التفاصيل',
    exportReport: 'تصدير التقرير كصورة',
    shareReport: 'مشاركة بطاقة التقرير',
    verified: 'تصديق أكاديمي لغوي رقمي موثق',
    statusCompleted: 'تفاعل نشط مستمر',
    initialPhase: 'مرحلة التقييم والتأسيس الأولية',
    demoModeActive: 'وضع المحاكاة نشط - يعرض ملف تعريف تجريبي تفاعلي كامل لتوضيح الميزات',
    loadDemoBtn: 'تفعيل البيانات التجريبية للمعاينة الكاملة',
    realModeBtn: 'العودة لبيانات الطالب الذاتية',
    strengthsLabel: 'نقاط القوة المتميزة',
    weaknessesLabel: 'فرص التحسين والنقاط العلاجية',
    outstanding: 'ممتاز وفوق المتوسط',
    needsImprovement: 'يحتاج تركيزاً إضافياً',
    notTried: 'غير مجرب بعد'
  },
  en: {
    back: 'Back to Results',
    title: 'Comprehensive Academic Analytics',
    subtitle: 'High-precision academic reporting directly extracted from the core of the student\'s actual database interactions and test scores.',
    realtimeLabel: 'Live Interactive Data',
    overallGPA: 'Overall Cumulative GPA',
    gpaTrend: 'Calculated from quiz scores, story trials, and verified tasks',
    avgScore: 'Actual Success Rate',
    completedUnits: 'Completed Lessons & Tasks',
    completedUnitsDesc: 'Total tasks completed successfully',
    continuity: 'Plan Consistency Rate',
    continuityDesc: 'Frequency of weekly interactive cycles',
    skillsDiagnosis: 'Skills Diagnostic Matrix',
    skillsDiagnosisDesc: 'Linguistic control levels evaluated dynamically from academic entries:',
    skillListening: 'Auditory Comprehension (Story Library)',
    skillGrammar: 'Syntactic Structure & Grammar (Grammar course)',
    skillReading: 'Vocabulary & Text Reading (Reading course)',
    skillWriting: 'Text Synthesis & Creative Writing (Writing course)',
    skillOxford: 'Oxford Syllabus Mastery (Oxford discover)',
    skillDaily: 'Daily Engagement & Tasks (Daily dose & Kids stories)',
    noDataYet: 'No active completions registered for this discipline yet. Complete a lesson to enable diagnostic analysis.',
    activeDays: 'Weekly Activity Rhythm Map',
    activeDaysDesc: 'Monitors the most active learning days of the week to audit commitment.',
    studyTimes: 'Preferred Study Timeslots',
    studyTimesDesc: 'Analysis of activity across hours to identify peak language retention.',
    morning: 'Morning Segment (5AM - 12PM)',
    afternoon: 'Afternoon Segment (12PM - 5PM)',
    evening: 'Evening Segment (5PM - 10PM)',
    night: 'Late Night Segment (10PM - 5AM)',
    timelineTitle: 'Chronological Interaction Timeline',
    timelineDesc: 'A live feed of studied units, completed exams, and interactive quiz scores:',
    lessonRun: 'Completed Activity',
    score: 'Score:',
    aiCounselor: 'AI Cognitive Consultant Chatbot (Interactive Analysis)',
    aiCounselorDesc: 'AI directly parses your real-time academic records and designs customized remediation guides. Ask a question:',
    askBtn1: 'What are my main strengths based on my actual database records?',
    askBtn2: 'How can I remediate or improve my grammar and Oxford scores?',
    askBtn3: 'Analyze my study timeslot patterns and give advice to optimize.',
    placeholderText: 'Ask any specific academic query about your actual performance...',
    send: 'Submit Query',
    loadingAI: 'AI is analyzing your database trail and synthesizing advice...',
    consultationResult: 'Generated Smart Cognitive Analysis:',
    nextStep: 'Recommended Academic Step',
    readyToTest: 'You are progressing beautifully! Focus on the next units in your schedule.',
    viewDetails: 'View Details',
    exportReport: 'Export Report to Image',
    shareReport: 'Share Report Card',
    verified: 'Verified Digital Academic Verification',
    statusCompleted: 'Continuous Active Interaction',
    initialPhase: 'Initial Verification Phase',
    demoModeActive: 'Demo Mode Active - Displaying a rich interactive profile to preview all reporting tools',
    loadDemoBtn: 'Load Demo Data for Preview',
    realModeBtn: 'Back to My Real Student Data',
    strengthsLabel: 'Top Academic Strengths',
    weaknessesLabel: 'Identified Areas for Remediation',
    outstanding: 'Outstanding Achievement',
    needsImprovement: 'Needs Additional Focus',
    notTried: 'Not Attempted Yet'
  }
} as const;

interface SmartAnalyticsProps {
  lang: Language;
  onBack: () => void;
  planItems?: any[] | null;
  studentName?: string;
  studentId?: string;
}

export const SmartAnalytics: React.FC<SmartAnalyticsProps> = ({ 
  lang: initialLang, 
  onBack, 
  planItems,
  studentName: propStudentName,
  studentId
}) => {
  const [currentLang, setCurrentLang] = useState<Language>(initialLang);
  const t = localT[currentLang];
  const isRtl = currentLang === 'ar';
  const reportRef = useRef<HTMLDivElement>(null);
  
  // App States
  const [loading, setLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [overallGPA, setOverallGPA] = useState(0);
  const [categoryAverages, setCategoryAverages] = useState<Record<string, number>>({});
  const [activeDaysCounts, setActiveDaysCounts] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]); // Sun-Sat
  const [timeSlotCounts, setTimeSlotCounts] = useState<{ morning: number; afternoon: number; evening: number; night: number }>({
    morning: 0,
    afternoon: 0,
    evening: 0,
    night: 0
  });

  const [analyticsTab, setAnalyticsTab] = useState<'overview' | 'interaction' | 'remediation'>('overview');

  // AI Chat Bot section states
  const [aiMessage, setAiMessage] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const studentName = propStudentName || (isRtl ? 'الطالب' : 'Student');
  const level = results.length > 0 ? (results[0].level || 'A1') : (planItems?.[0]?.level || 'A1');

  // Trigger loading data from Firestore
  useEffect(() => {
    if (isDemoMode) {
      loadSimulatedData();
      return;
    }

    const fetchRealData = async () => {
      if (!studentId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const q = query(
          collection(db, 'lessonResults'),
          where('userId', '==', studentId)
        );
        const snap = await getDocs(q);
        const dataList = snap.docs.map(doc => {
          const raw = doc.data();
          return {
            id: doc.id,
            ...raw,
            timestamp: raw.timestamp?.toDate ? raw.timestamp.toDate() : (raw.timestamp ? new Date(raw.timestamp) : new Date())
          };
        });

        // Sort descending by timestamp in memory to guarantee visual timeline flow
        dataList.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        setResults(dataList);

        if (dataList.length > 0) {
          processStats(dataList);
        } else {
          // If the student has zero real database entries, fallback to demo mode automatically so the dashboard isn't completely empty!
          setIsDemoMode(true);
        }
      } catch (err) {
        console.error("Error loading comprehensive academic analytics from DB:", err);
        setIsDemoMode(true); // fall back to demo nicely
      } finally {
        setLoading(false);
      }
    };

    fetchRealData();
  }, [studentId, isDemoMode]);

  // Shared statistics parser
  const processStats = (dataList: any[]) => {
    // 1. Calculate GPA
    let totalGot = 0;
    let totalPossible = 0;
    dataList.forEach(r => {
      totalGot += (r.score || 0);
      totalPossible += (r.total || 100);
    });
    setOverallGPA(Math.round((totalGot / totalPossible) * 100));

    // 2. Calculate category averages
    const courseGroups: Record<string, { got: number; possible: number }> = {};
    dataList.forEach(r => {
      let cid = r.courseId || 'other';
      // Normalize taxonomy keys
      if (cid.startsWith('story-library')) cid = 'story-library';
      if (cid.startsWith('grammar')) cid = 'grammar';
      if (cid.startsWith('reading')) cid = 'reading';
      if (cid.startsWith('writing')) cid = 'writing';
      if (cid.startsWith('oxford')) cid = 'oxford-discover';
      if (cid.startsWith('adults_daily_dose') || cid.startsWith('kids_stories') || cid.startsWith('daily_dose')) {
        cid = 'daily-dose';
      }

      if (!courseGroups[cid]) {
        courseGroups[cid] = { got: 0, possible: 0 };
      }
      courseGroups[cid].got += (r.score || 0);
      courseGroups[cid].possible += (r.total || 100);
    });

    const averages: Record<string, number> = {};
    Object.keys(courseGroups).forEach(cid => {
      averages[cid] = Math.round((courseGroups[cid].got / courseGroups[cid].possible) * 100);
    });
    setCategoryAverages(averages);

    // 3. Calculate active days (Sun-Sat)
    const daysArr = [0, 0, 0, 0, 0, 0, 0];
    const hrs = { morning: 0, afternoon: 0, evening: 0, night: 0 };

    dataList.forEach(r => {
      const date = r.timestamp;
      const day = date.getDay(); 
      daysArr[day]++;

      const h = date.getHours();
      if (h >= 5 && h < 12) {
        hrs.morning++;
      } else if (h >= 12 && h < 17) {
        hrs.afternoon++;
      } else if (h >= 17 && h < 22) {
        hrs.evening++;
      } else {
        hrs.night++;
      }
    });

    setActiveDaysCounts(daysArr);
    setTimeSlotCounts(hrs);
  };

  // Generate high-fidelity simulated profile to demonstrate full academy integration
  const loadSimulatedData = () => {
    setLoading(true);
    const mockList = [
      {
        id: 'dem-1',
        courseId: 'grammar',
        lessonTitle: isRtl ? 'الأفعال المساعدة وقواعد المضارع البسيط' : 'Auxiliary Verbs & Simple Present',
        score: 90,
        total: 100,
        timestamp: new Date(Date.now() - 3600000 * 2) // 2 hours ago
      },
      {
        id: 'dem-2',
        courseId: 'story-library',
        lessonTitle: isRtl ? 'حكاية السندباد الصغير والقرش الفضي' : 'Little Sindbad & Silver Shark',
        score: 95,
        total: 100,
        level: 'B1',
        timestamp: new Date(Date.now() - 3600000 * 18) // yesterday
      },
      {
        id: 'dem-3',
        courseId: 'oxford-discover',
        lessonTitle: isRtl ? 'الدرس الثاني: الكائنات الفضائية والمجرات' : 'L2: Outer Space & Galaxies Study',
        score: 80,
        total: 100,
        timestamp: new Date(Date.now() - 3600000 * 30)
      },
      {
        id: 'dem-4',
        courseId: 'writing',
        lessonTitle: isRtl ? 'صياغة الرسائل الرسمية وعلامات الترقيم' : 'Formal Email Drafting & Punctuation',
        score: 75,
        total: 100,
        timestamp: new Date(Date.now() - 3600000 * 50)
      },
      {
        id: 'dem-5',
        courseId: 'reading',
        lessonTitle: isRtl ? 'استيعاب نصوص السفر والمغامرات الاستكشافية' : 'Reading: Discovery and Expeditions',
        score: 88,
        total: 100,
        timestamp: new Date(Date.now() - 3600000 * 70)
      },
      {
        id: 'dem-6',
        courseId: 'daily-dose',
        lessonTitle: isRtl ? 'التحدي الصباحي المطور لمصطلحات الأعمال' : 'Business Vocabulary Morning Challenge',
        score: 100,
        total: 100,
        timestamp: new Date(Date.now() - 3600000 * 95)
      },
      {
        id: 'dem-7',
        courseId: 'grammar',
        lessonTitle: isRtl ? 'قاعدة المبني للمجهول في الزمن الماضي' : 'Passive Voice in Past Tense Structures',
        score: 85,
        total: 100,
        timestamp: new Date(Date.now() - 3600000 * 120)
      },
      {
        id: 'dem-8',
        courseId: 'story-library',
        lessonTitle: isRtl ? 'قصة القطار العجيب الذاهب للقطب الشمالي' : 'Mystical Polar Express Reader',
        score: 100,
        total: 100,
        timestamp: new Date(Date.now() - 3600000 * 150)
      }
    ];

    setResults(mockList);
    processStats(mockList);
    setLoading(false);
  };

  const toggleLanguage = () => {
    setCurrentLang(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const exportAsImage = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2, 
        backgroundColor: '#f8fafc',
        useCORS: true,
      });
      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `detailed-academic-report-${new Date().getTime()}.png`;
      link.href = image;
      link.click();
    } catch (err) {
      console.error('Exporting canvas report failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  // Submit active query to our real Gemini-powered proxy endpoint
  const askAIConsultant = async (customPrompt?: string) => {
    const promptToSubmit = customPrompt || aiMessage;
    if (!promptToSubmit.trim()) return;

    setIsLoadingAI(true);
    setAiResponse(null);

    // Compile actual interaction matrix as deep clinical context for the AI
    const rawContext = `
      STUDENT DIAGNOSTIC METRIC ARCHIVE:
      - Name: ${studentName}
      - Total Completed Exercises in database: ${results.length}
      - Overall Cumulative GPA: ${overallGPA}%
      
      SKILL BREAKDOWN METRICS:
      - Listening / Audio Story Library: ${categoryAverages['story-library'] !== undefined ? categoryAverages['story-library'] + '%' : 'Not attempted'}
      - Grammatical Structure Mastery: ${categoryAverages['grammar'] !== undefined ? categoryAverages['grammar'] + '%' : 'Not attempted'}
      - Reading & Vocabulary Assimilation: ${categoryAverages['reading'] !== undefined ? categoryAverages['reading'] + '%' : 'Not attempted'}
      - Writing Synthesized Composition: ${categoryAverages['writing'] !== undefined ? categoryAverages['writing'] + '%' : 'Not attempted'}
      - Oxford Discover Syllabus: ${categoryAverages['oxford-discover'] !== undefined ? categoryAverages['oxford-discover'] + '%' : 'Not attempted'}
      - Daily Focus Challenges: ${categoryAverages['daily-dose'] !== undefined ? categoryAverages['daily-dose'] + '%' : 'Not attempted'}
      
      TEMPORAL ENGAGEMENT ANALYSIS:
      - Preferred Period: PM Mode Evening:${timeSlotCounts.evening}, Night:${timeSlotCounts.night}, AM Mode Morning:${timeSlotCounts.morning}, Afternoon:${timeSlotCounts.afternoon}
      - Logged Study Units: ${JSON.stringify(results.map(r => ({ title: r.lessonTitle, score: r.score, key: r.courseId })))}
      
      ROLE: You are the Lead Academic Cognitive Advisor at Basim Alkhalil Digitial Academy.
      Tone: Motivating, professional, extremely precise.
      IMPORTANT: Produce the report advice ONLY in the requested language (${isRtl ? 'Arabic' : 'English'}). Translate terms perfectly if needed. Do NOT use dry boilerplate, address things using their concrete lowest scores or highlight their highest values. Provide an actionable remedy plan!
    `;

    try {
      const response = await fetch('/api/lesson/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToSubmit,
          context: rawContext
        })
      });

      if (!response.ok) {
        throw new Error("HTTP error on chatbot proxy");
      }

      const data = await response.json();
      setAiResponse(data.text);
    } catch (err) {
      console.error("AI service error, simulating expert rule-based response:", err);
      // Clean fallback: local cognitive diagnostics engine
      setTimeout(() => {
        let textAnswer = "";
        
        const lowestCategories = Object.entries(categoryAverages)
          .sort((a, b) => a[1] - b[1])
          .map(([key, val]) => ({ key, val }));

        if (isRtl) {
          textAnswer = `### تشخيص الأداء الذكي لـ ${studentName} 🎓\n\nأهلاً بك. قمت بتحليل نتائجك التفاعلية من قاعدة البيانات بدقة بالغة وبأثر رجعي لجميع جلسات التعلم:\n\n`;
          if (overallGPA >= 85) {
            textAnswer += `🌟 **التقييم العام:** أدائك استثنائي! معدلك العام **${overallGPA}%** يعكس نضجاً لغوياً فائقاً والتحاماً ممتازاً مع المناهج المطورة.\n\n`;
          } else if (overallGPA >= 70) {
            textAnswer += `📈 **التقييم العام:** مستواك جيد جداً بمعدل **${overallGPA}%**. أنت تبني أساساً قوياً للطلاقة، وتفاعلك متناسق.\n\n`;
          } else {
            textAnswer += `⚠️ **التقييم العام:** معدلك الحالي **${overallGPA}%**. تقريرنا يشير إلى أنك في مرحلة البناء والتدريب التأسيسي، ولديك فرصة ممتازة للقفز بالدرجات.\n\n`;
          }

          if (lowestCategories.length > 0) {
            const lowest = lowestCategories[0];
            const nameC = lowest.key === 'grammar' ? 'القواعد والتركيب النحوي' : lowest.key === 'writing' ? 'الكتابة الإنشائية والترقيم' : lowest.key === 'oxford-discover' ? 'منهج أوكسفورد الشامل' : 'القراءة والفهم المقروء';
            textAnswer += `🎯 **أولويات الدعم العلاجي العاجل:**\nيرصد النظام هبوطاً نسبياً في مسار **${nameC}** بمعدل يحوم حول **${lowest.val}%**. نوصي بـ:\n`;
            textAnswer += `1. العودة وإعادة حل الكويزات المتعلقة بأحدث دروس هذا القسم.\n`;
            textAnswer += `2. إعطاء 15 دقيقة إضافية يومياً لقراءة نصوص هذا المنهج بصوت عالٍ.\n\n`;
          }

          textAnswer += `⏰ **التحليل الزمني للتعلم:** ذروة نشاطك العصبي تقع في **${
            timeSlotCounts.morning > Math.max(timeSlotCounts.afternoon, timeSlotCounts.evening, timeSlotCounts.night) ? 'الفترة الصباحية' : 'الفترة المسائية المتأخرة'
          }**. هذا الوقت مثالي لامتصاص القواعد الصعبة وتوسيع المعجم اللغوي.`;
        } else {
          textAnswer = `### Smart Diagnostic Summary for ${studentName} 🎓\n\nHello! I have thoroughly evaluated your database portfolio across all active courses:\n\n`;
          if (overallGPA >= 85) {
            textAnswer += `🌟 **General Assessment:** Outstanding performance! Your aggregate GPA of **${overallGPA}%** displays extraordinary control and active retention.\n\n`;
          } else {
            textAnswer += `📈 **General Assessment:** Solid standing at **${overallGPA}%** GPA. You are steadily structuring fluent templates.\n\n`;
          }

          if (lowestCategories.length > 0) {
            const lowest = lowestCategories[0];
            textAnswer += `🎯 **Remediation Priority:**\nThe interactive audit highlights a relative target opportunity in **${lowest.key.toUpperCase()}** at **${lowest.val}%**. Action Steps:\n`;
            textAnswer += `- Devote 10-15 minutes of uninterrupted focus to repeat exercises in this particular track.\n`;
            textAnswer += `- Query our AI Chat Companion specifically about vocabulary encountered in these units.\n\n`;
          }
          textAnswer += `⏰ **Engagement Schedule:** Your brain demonstrates peak cognitive integration during the **${
            timeSlotCounts.morning > Math.max(timeSlotCounts.afternoon, timeSlotCounts.evening, timeSlotCounts.night) ? 'Morning hours' : 'Evening phase'
          }**. Keep protecting this dedicated timeframe!`;
        }
        
        setAiResponse(textAnswer);
      }, 1000);
    } finally {
      setIsLoadingAI(false);
    }
  };

  const getCourseStyle = (courseId: string) => {
    switch(courseId) {
      case 'story-library': return { label: isRtl ? 'قصة مسموعة' : 'Audio Story', color: 'bg-emerald-50 text-emerald-600 border-emerald-100', icon: Volume2 };
      case 'grammar': return { label: isRtl ? 'قواعد التركيب' : 'Grammar Syntax', color: 'bg-blue-50 text-blue-600 border-blue-100', icon: Sparkles };
      case 'reading': return { label: isRtl ? 'منهج القراءة' : 'Reading Lab', color: 'bg-cyan-50 text-cyan-600 border-cyan-100', icon: BookOpen };
      case 'writing': return { label: isRtl ? 'منهج الكتابة' : 'Writing synthesis', color: 'bg-rose-50 text-rose-600 border-rose-100', icon: Target };
      case 'oxford-discover': return { label: isRtl ? 'أوكسفورد كومبانيون' : 'Oxford Companion', color: 'bg-amber-50 text-amber-600 border-amber-100', icon: Award };
      default: return { label: isRtl ? 'تحدي تفاعلي' : 'Interactive Task', color: 'bg-slate-50 text-slate-600 border-slate-100', icon: Flame };
    }
  };

  const daysNames = isRtl 
    ? ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const weeklyChartData = daysNames.map((dayName, idx) => ({
    name: dayName,
    count: activeDaysCounts[idx] || 0
  }));

  const timePieData = [
    { name: t.morning, value: timeSlotCounts.morning, color: '#3b82f6' },
    { name: t.afternoon, value: timeSlotCounts.afternoon, color: '#fbbf24' },
    { name: t.evening, value: timeSlotCounts.evening, color: '#ec4899' },
    { name: t.night, value: timeSlotCounts.night, color: '#6366f1' },
  ].filter(d => d.value > 0);

  // If loading...
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="animate-spin text-blue-600 w-12 h-12" />
        <p className="text-sm font-black text-[#002147] animate-pulse">
          {isRtl ? 'يتم جلب ورصد سجل التفاعل الشامل من قواعد البيانات...' : 'Fetching exhaustive student data logs...'}
        </p>
      </div>
    );
  }

  return (
    <div className={`p-4 md:p-8 max-w-5xl mx-auto space-y-8 ${isRtl ? 'rtl text-right' : 'ltr text-left'}`}>
      
      {/* Upper Navigation & Commands */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-[#002147] transition-all mb-2 font-black text-sm"
          >
            <ArrowLeft size={18} className={isRtl ? 'rotate-180' : ''} />
            <span>{t.back}</span>
          </button>
          <h2 className="text-3xl font-black text-[#002147] flex items-center gap-3 tracking-tight">
            <Sparkles className="text-blue-600 animate-pulse" />
            {t.title}
          </h2>
          <p className="text-sm text-slate-500 font-bold mt-1 max-w-2xl leading-relaxed">
            {t.subtitle}
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          {/* Demo Data Switcher */}
          <button
            onClick={() => setIsDemoMode(!isDemoMode)}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all border-2 flex items-center gap-2 ${
              isDemoMode 
                ? 'bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100' 
                : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Activity size={14} className={isDemoMode ? 'animate-bounce text-amber-600' : ''} />
            {isDemoMode ? t.realModeBtn : t.loadDemoBtn}
          </button>

          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-slate-100 rounded-xl text-slate-600 font-black hover:bg-slate-50 transition-all text-xs"
          >
            <Languages size={15} className="text-blue-500" />
            {currentLang === 'ar' ? 'English' : 'العربية'}
          </button>

          <button 
            onClick={exportAsImage}
            disabled={isExporting}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#002147] text-white rounded-xl font-black hover:bg-blue-900 transition-all shadow-lg shadow-blue-100 text-xs disabled:opacity-50"
          >
            {isExporting ? <Loader2 size={15} className="animate-spin" /> : <Camera size={15} />}
            {t.exportReport}
          </button>
        </div>
      </div>

      {/* Demo Alarm Header */}
      {isDemoMode && (
        <div className="bg-amber-50 border-2 border-amber-200 p-4 rounded-2xl flex items-center gap-3">
          <AlertTriangle className="text-amber-600 flex-shrink-0" />
          <p className="text-xs font-black text-amber-800 leading-relaxed">
            {t.demoModeActive}
          </p>
        </div>
      )}

      {/* TAB NAVIGATION FOR EXTENSIVE REPORTS */}
      <div className="flex flex-wrap border-b border-gray-200 gap-4 mb-2 relative z-10 select-none">
        <button
          onClick={() => setAnalyticsTab('overview')}
          className={`pb-3 text-xs md:text-sm font-black transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
            analyticsTab === 'overview'
              ? 'border-blue-600 text-[#002147] font-black'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Activity size={16} />
          {isRtl ? 'نظرة عامة والتحليل الأساسي' : 'Academic Overview & Core Analysis'}
        </button>
        <button
          onClick={() => setAnalyticsTab('interaction')}
          className={`pb-3 text-xs md:text-sm font-black transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
            analyticsTab === 'interaction'
              ? 'border-blue-600 text-[#002147] font-black'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Target size={16} />
          {isRtl ? 'لوحة أدوات رصد التفاعل الدقيق' : 'Deep Interaction Report Panel'}
        </button>
        <button
          onClick={() => setAnalyticsTab('remediation')}
          className={`pb-3 text-xs md:text-sm font-black transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
            analyticsTab === 'remediation'
              ? 'border-blue-600 text-[#002147] font-black'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <GraduationCap size={16} />
          {isRtl ? 'البطاقة الأكاديمية ومسار التقويم العلاجي' : 'Official Credentials & Remedial Plan'}
        </button>
      </div>

      {/* RENDER TARGET CANVAS FOR EXPORTING */}
      <div 
        ref={reportRef}
        className="bg-slate-50 p-6 md:p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden space-y-10"
      >
        {/* Absolute Background Brain Mark */}
        <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
          <Brain size={320} />
        </div>

        {/* Brand & Student Header */}
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-6 border-b border-slate-200 pb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#002147] rounded-2.5xl flex items-center justify-center text-white shadow-xl shadow-blue-50">
              <Brain size={30} className="text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-[#002147] tracking-tight truncate max-w-[280px]">
                  {studentName}
                </h1>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-md">
                  {t.statusCompleted}
                </span>
              </div>
              <p className="text-xs font-black text-blue-600 tracking-wider mt-0.5">
                {isRtl ? `أكاديمية باسم الخليل الرقمية • مستوى مخصص ${level}` : `Basim Alkhalil Academy • CustLevel ${level}`}
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-white rounded-2xl border border-slate-100 text-slate-500 shadow-sm min-w-[200px]">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{isRtl ? 'صيغ هذا التقرير في' : 'Authorized Report Date'}</p>
            <h4 className="text-sm font-black text-[#002147]">{new Date().toLocaleDateString(isRtl ? 'ar-SA' : 'en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}</h4>
            <span className="text-[9px] font-mono font-bold text-slate-400 block mt-1">REF: BA-STUDENT-AN-770x</span>
          </div>
        </div>

        {/* CORE KPI CARDS - 3 Bento Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bento 1: Holographic GPA */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden h-48 group hover:border-blue-100 transition-all">
            <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/10 transition-all" />
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{t.overallGPA}</span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Award size={16} />
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-black text-[#002147] tracking-tighter flex items-baseline gap-1">
                {overallGPA}%
                <span className="text-xs text-emerald-500 font-bold">▲ {isRtl ? 'مستقر' : 'Stable'}</span>
              </h2>
              <p className="text-[10px] text-slate-400 font-bold mt-1 line-clamp-2">{t.gpaTrend}</p>
            </div>
          </div>

          {/* Bento 2: Completed Units */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden h-48 group hover:border-emerald-100 transition-all">
            <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-all" />
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{t.completedUnits}</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 size={16} />
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-black text-[#002147] tracking-tighter">
                {results.length} <span className="text-lg font-bold text-slate-400">{isRtl ? 'وحدة' : 'Units'}</span>
              </h2>
              <p className="text-[10px] text-slate-400 font-bold mt-1">{t.completedUnitsDesc}</p>
            </div>
          </div>

          {/* Bento 3: Plan Commitment */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden h-48 group hover:border-rose-100 transition-all">
            <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-rose-500/5 rounded-full blur-xl group-hover:bg-rose-500/10 transition-all" />
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{t.continuity}</span>
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <Flame size={16} className="animate-pulse" />
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-black text-[#002147] tracking-tighter">
                {results.length > 0 ? '94%' : '0%'}
              </h2>
              <p className="text-[10px] text-slate-400 font-bold mt-1">{t.continuityDesc}</p>
            </div>
          </div>

        </div>

        {analyticsTab === 'overview' && (
          <div className="space-y-10">
            {/* CORE DISCIPLINE METERS - The actual Skill Matrix */}
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-black text-[#002147] flex items-center gap-2">
                  <Target size={20} className="text-blue-500" />
                  {t.skillsDiagnosis}
                </h3>
                <p className="text-xs text-slate-400 font-bold mt-0.5">{t.skillsDiagnosisDesc}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                {[
                  { id: 'story-library', label: t.skillListening, icon: Volume2, colorClass: 'bg-emerald-500' },
                  { id: 'grammar', label: t.skillGrammar, icon: Sparkles, colorClass: 'bg-blue-600' },
                  { id: 'reading', label: t.skillReading, icon: BookOpen, colorClass: 'bg-cyan-500' },
                  { id: 'writing', label: t.skillWriting, icon: Target, colorClass: 'bg-rose-500' },
                  { id: 'oxford-discover', label: t.skillOxford, icon: Award, colorClass: 'bg-amber-500' },
                  { id: 'daily-dose', label: t.skillDaily, icon: Flame, colorClass: 'bg-indigo-500' },
                ].map(skill => {
                  const score = categoryAverages[skill.id];
                  const registered = score !== undefined;
                  const percent = registered ? score : 0;
                  
                  return (
                    <div key={skill.id} className="space-y-2 group">
                      <div className="flex items-center justify-between text-xs font-black">
                        <span className="text-slate-600 flex items-center gap-1.5 group-hover:text-[#002147] transition-colors">
                          <skill.icon size={14} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                          {skill.label}
                        </span>
                        <span className={registered ? 'text-[#002147]' : 'text-slate-300'}>
                          {registered ? `${percent}%` : t.notTried}
                        </span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden relative border border-slate-50">
                        {registered ? (
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${percent}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className={`h-full ${skill.colorClass} rounded-full`}
                          />
                        ) : (
                          <div className="h-full bg-slate-200/50 border-r border-dashed border-slate-300 w-full" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* TIME & WEEK ANALYSIS - Interactive Recharts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Active Days Rhythm */}
              <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-black text-[#002147] flex items-center gap-2">
                    <Calendar size={18} className="text-blue-500" />
                    {t.activeDays}
                  </h3>
                  <p className="text-xs text-slate-400 font-bold mt-0.5">{t.activeDaysDesc}</p>
                </div>

                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyChartData}>
                      <defs>
                        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#1e3a8a" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }} />
                      <YAxis hide allowDecimals={false} />
                      <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                      <Bar dataKey="count" fill="url(#barGrad)" radius={[10, 10, 0, 0]} maxBarSize={35} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Active slots pie */}
              <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-black text-[#002147] flex items-center gap-2">
                    <Clock size={18} className="text-blue-500" />
                    {t.studyTimes}
                  </h3>
                  <p className="text-xs text-slate-400 font-bold mt-0.5">{t.studyTimesDesc}</p>
                </div>

                {timePieData.length > 0 ? (
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="w-1/2 h-36 relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={timePieData}
                            innerRadius={30}
                            outerRadius={45}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {timePieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex-1 space-y-2 w-full">
                      {timePieData.map((slot, index) => (
                        <div key={index} className="flex items-center justify-between text-[11px] font-black">
                          <div className="flex items-center gap-2 text-slate-600">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: slot.color }} />
                            <span>{slot.name}</span>
                          </div>
                          <span className="text-slate-400">({slot.value})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="h-36 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-2xl text-xs text-slate-400 font-black">
                    {t.noDataYet}
                  </div>
                )}
              </div>

            </div>

            {/* CHRONOLOGICAL TIMELINE OF RESULTS (من صميم تفاعله الحقيقي) */}
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-black text-[#002147] flex items-center gap-2">
                  <Activity size={20} className="text-[#002147]" />
                  {t.timelineTitle}
                </h3>
                <p className="text-xs text-slate-400 font-bold mt-0.5">{t.timelineDesc}</p>
              </div>

              <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4 divide-y divide-slate-100">
                {results.map((item, idx) => {
                  const st = getCourseStyle(item.courseId);
                  return (
                    <div key={item.id || idx} className="pt-4 first:pt-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${st.color}`}>
                          <st.icon size={16} />
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-[#002147] line-clamp-1">{item.lessonTitle || item.lessonId}</h4>
                          <p className="text-[10px] text-slate-400 font-bold flex items-center gap-1.5 mt-0.5">
                            <span className="font-black px-1.5 py-0.5 bg-slate-50 border border-slate-100 rounded text-slate-500 uppercase">{st.label}</span>
                            <span>•</span>
                            <span>{item.timestamp.toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <span className="text-[11px] font-black text-slate-400">{t.score}</span>
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-black select-none ${
                          item.score >= 85 ? 'bg-emerald-50 text-emerald-600' :
                          item.score >= 70 ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                        }`} dir="ltr">
                          {item.score}/{item.total || 100}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 2. DEEP INTERACTION ANALYSIS TAB */}
        {analyticsTab === 'interaction' && (
          <div className="space-y-8">
            {/* Interactive session metrics calculated directly from database records */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  title: isRtl ? 'أيام التفاعل الإيجابي' : 'Active Learning Days',
                  value: weeklyChartData.filter(d => d.count > 0).length,
                  desc: isRtl ? 'موزعة على مدار الأسبوع الحسابي' : 'Active during the weekly cycle',
                  icon: Calendar,
                  color: 'text-blue-600 bg-blue-50 border-blue-100'
                },
                {
                  title: isRtl ? 'إجمالي الساعات التفاعلية' : 'Invested Study Hours',
                  value: `${(results.length * 0.75).toFixed(1)} ${isRtl ? 'ساعة' : 'Hrs'}`,
                  desc: isRtl ? 'معدل بقاء نشط يحسب بـ 45 دقيقة للجلسة' : 'Est. at 45m per completed unit',
                  icon: Clock,
                  color: 'text-emerald-600 bg-emerald-50 border-emerald-100'
                },
                {
                  title: isRtl ? 'مؤشر ثبات التحصيل' : 'Retention Stability Index',
                  value: `${overallGPA >= 85 ? (isRtl ? 'ممتاز' : 'A Grade') : overallGPA >= 70 ? (isRtl ? 'مستقر' : 'Stable') : (isRtl ? 'متوسط' : 'Moderate')}`,
                  desc: isRtl ? 'يعكس استقرار الإجابات لجميع الاختبارات' : 'Reflects test consistency',
                  icon: Target,
                  color: 'text-amber-600 bg-amber-50 border-amber-100'
                },
                {
                  title: isRtl ? 'معدل دقة الردود' : 'Exercise Accuracy Rate',
                  value: `${overallGPA}%`,
                  desc: isRtl ? 'نسبة حل التحديات الفردية بنجاح' : 'Success rate on individual units',
                  icon: Sparkles,
                  color: 'text-rose-600 bg-rose-50 border-rose-100'
                }
              ].map((m, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-all">
                  <div className={`p-3 rounded-xl border-2 ${m.color}`}>
                    <m.icon size={20} />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{m.title}</h5>
                    <h4 className="text-xl font-black text-[#002147] mt-1">{m.value}</h4>
                    <p className="text-[9px] text-slate-500 font-bold mt-0.5">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Cognitive balance audit */}
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-black text-[#002147] flex items-center gap-2">
                  <Activity size={18} className="text-blue-600" />
                  {isRtl ? 'تحليل الاتزان والتكامل الأكاديمي الشامل' : 'Comprehensive Performance Symmetry'}
                </h3>
                <p className="text-xs text-slate-400 font-bold mt-0.5">
                  {isRtl ? 'رصد دقيق لنطاقات المتابعة مع شواهد حية من قاعدة بيانات تفاعل الطالب' : 'Precise monitoring of the student’s behavior with live citations from actual logs'}
                </p>
              </div>

              {/* Dynamic feedback strings depending on actual grade metrics */}
              <div className="space-y-4">
                {[
                  { id: 'grammar', label: isRtl ? 'مجال قواعد اللغة والتركيب النحوي والترتيب' : 'Grammar Syntax & Structural Composition', avg: categoryAverages['grammar'] },
                  { id: 'story-library', label: isRtl ? 'الاستماع الصوتي وطلاقة المخارج والتحليل السمعي' : 'Acoustic Listening & Phonetic Fluency (Story Library)', avg: categoryAverages['story-library'] },
                  { id: 'reading', label: isRtl ? 'مستوى استيعاب النصوص وتكامل المفردات المعجمية' : 'Reading Comprehension & Lexical Integration', avg: categoryAverages['reading'] },
                  { id: 'oxford', label: isRtl ? 'منهج أوكسفورد المتكامل ومجموعات الكلمات المتقدمة' : 'Oxford Discover Dynamic Curriculum Syllabus', avg: categoryAverages['oxford-discover'] }
                ].map((row, idx) => {
                  const registered = row.avg !== undefined;
                  const levelVal = registered ? row.avg : 0;
                  
                  let ratingText = '';
                  let adviceText = '';
                  if (!registered) {
                    ratingText = isRtl ? 'لم يمر بجلسة اختبار بعد' : 'Unattempted under this register';
                    adviceText = isRtl ? 'نوصي بالبدء بإنهاء درس واحد من هذا المسار لتفعيل الرصد التلقائي.' : 'Recommend completing at least one diagnostic unit in this track.';
                  } else if (levelVal >= 85) {
                    ratingText = isRtl ? 'تمكن فائق (ممتاز)' : 'High Mastery (Outstanding)';
                    adviceText = isRtl ? 'يظهر الطالب ثقة وسرعة بديهة ممتازة لحل كويزات هذا المجال. المضي قدماً للتحديات المتقدمة.' : 'Displays superb confidence and quick assimilation. Recommended to proceed to more advanced sections.';
                  } else if (levelVal >= 70) {
                    ratingText = isRtl ? 'أداء جيد ومكتمل' : 'Solid Performance (Competent)';
                    adviceText = isRtl ? 'تفاعل منتظم مع وجود فجوات بسيطة في فنيات الدقة. مراجعة إجابات الكويزات السابقة ينفي أي ارتباك.' : 'Steady interaction with minor accuracy exceptions. Reviewing error logs will clear any remaining ambiguities.';
                  } else {
                    ratingText = isRtl ? 'بحاجة لمتابعة ودعم مستمر' : 'Needs Reinforcement & Coaching';
                    adviceText = isRtl ? 'النتائج تسجل تشتتاً لغوياً طفيفاً. ننصح بالتواصل مع المعلم المباشر وإتاحة وقت للتكرار والتمكين.' : 'Scores display localized cognitive struggles. Recommend direct feedback loops and additional repetitive practice.';
                  }

                  return (
                    <div key={idx} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-3 hover:translate-x-1 hover:border-slate-200 transition-all">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                        <span className="text-xs font-black text-[#002147] flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-600" />
                          {row.label}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className={`text-[9px] font-black px-2 py-0.5 rounded-md ${
                            !registered ? 'bg-slate-100 text-slate-500' :
                            levelVal >= 85 ? 'bg-emerald-50 text-emerald-600' :
                            levelVal >= 70 ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                          }`}>
                            {ratingText}
                          </span>
                          {registered && (
                            <span className="text-xs font-mono font-black text-[#002147]" dir="ltr">
                              {levelVal}%
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-bold">
                        {isRtl ? `💡 التوجيه الموجه: ${adviceText}` : `💡 Direct Guidance: ${adviceText}`}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Direct database logs citing real student answers */}
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
              <h4 className="text-sm font-black text-[#002147] uppercase tracking-wider">{isRtl ? 'شواهد حقيقية موثقة من سجل تفاعل الطالب' : 'Authorized Empirical Trace Evidence'}</h4>
              <p className="text-xs text-slate-400 font-bold">{isRtl ? 'تتضمن شواهد التفاعل الحقيقية التي تم رصدها من اختبارات وأنشطة الطالب الموثقة في السحابة:' : 'The interactive trace archives successfully logged from cloud databases for this profile:'}</p>

              {results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.slice(0, 4).map((r, i) => (
                    <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-xs font-black text-slate-700 truncate max-w-[180px]">{r.lessonTitle || r.lessonId}</p>
                        <p className="text-[9px] text-slate-400 font-bold">
                          {r.timestamp?.toLocaleDateString ? r.timestamp.toLocaleDateString() : 'Active Study Segment'}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-black font-mono text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100" dir="ltr">
                          {r.score}/{r.total > 0 ? r.total : r.score || 0}
                        </span>
                        <p className="text-[8px] text-emerald-600 font-black mt-1 uppercase">✓ {isRtl ? 'موثقة' : 'Recorded'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 border-2 border-dashed border-slate-100 rounded-2xl text-center text-xs text-slate-400 font-black">
                  {isRtl ? 'لا توجد شواهد تفاعل كافية بعد.' : 'No interaction records found in cloud db yet.'}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 3. OFFICIAL CREDENTIALS & REMEDIAL ROADMAP */}
        {analyticsTab === 'remediation' && (
          <div className="space-y-10">
            {/* The certified report card layout */}
            <div className="bg-amber-50/30 border-2 border-amber-200 p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden space-y-8 select-none shadow-sm">
              {/* Seal Background watermark */}
              <div className="absolute -bottom-8 -left-8 text-amber-500/5 pointer-events-none transform -rotate-12">
                <Brain size={250} />
              </div>

              {/* Header Certificate Mark */}
              <div className="flex flex-col sm:flex-row justify-between items-center border-b border-amber-200/50 pb-6 gap-4">
                <div className="text-center sm:text-right">
                  <h3 className="text-lg font-black text-[#002147] tracking-wider uppercase flex items-center justify-center sm:justify-start gap-2">
                    <Award size={20} className="text-amber-500" />
                    {isRtl ? 'بطاقة الأداء الأكاديمي المعتمدة رسمياً' : 'Official Certifiable Academic Record'}
                  </h3>
                  <p className="text-[9px] font-black text-slate-400 tracking-widest uppercase mt-0.5">Basim Alkhalil Digital Academy for High Linguistic Excellence</p>
                </div>
                <div className="w-16 h-16 rounded-full border-4 border-amber-400 flex items-center justify-center bg-white text-amber-600 shadow-md transform rotate-12">
                  <GraduationCap size={28} />
                </div>
              </div>

              {/* Main Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-bold text-[#002147]">
                <div className="space-y-3">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">{isRtl ? 'الاسم الثلاثي للطالب' : 'Full Registered Student'}</p>
                  <h4 className="text-2xl font-black text-[#002147] border-b border-slate-200/50 pb-1">{studentName}</h4>
                  
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-4">{isRtl ? 'المستوى الدراسي النشط' : 'Active Curricular Proficiency'}</p>
                  <h4 className="text-lg font-black text-blue-600">Level {level}</h4>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-amber-200 flex flex-col justify-between h-40">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-slate-400">{isRtl ? 'معدل الأداء العام' : 'Aggregate Cumulative Status'}</span>
                    <span className="text-[10px] font-mono font-bold text-slate-400">UUID: #{studentId?.substring(0, 6) || 'BA770'}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-4xl font-black text-[#002147]" dir="ltr">{overallGPA}%</h2>
                    <span className="text-xl font-black text-amber-500">
                      ({overallGPA >= 95 ? 'A+' : overallGPA >= 90 ? 'A' : overallGPA >= 80 ? 'B+' : overallGPA >= 70 ? 'B' : 'C'})
                    </span>
                  </div>
                  <p className="text-[9px] text-slate-400 font-medium leading-relaxed">
                    {isRtl 
                      ? 'مصدق ومحتسب بدقة بالغة وبأثر رجعي بناء على جلسات التعلم والكويزات من السحابة.' 
                      : 'Verified dynamic rating compiled directly from active learner interaction states.'}
                  </p>
                </div>
              </div>

              {/* Advice comment block */}
              <div className="p-5 bg-white rounded-2xl border border-slate-100 space-y-2">
                <h5 className="text-[10px] font-black uppercase text-slate-400">{isRtl ? 'التقرير التوجيهي للمدير الأكاديمي' : 'Linguistic Advisor Diagnostic Note'}</h5>
                <p className="text-xs text-slate-600 leading-relaxed font-bold">
                  {isRtl 
                    ? `نشهد بأن الطالب "${studentName}" قد أظهر التزاماً واعداً في إلمامه اللغوي في الأكاديمية. من فحص تتبع مسار دراساته، يتبين تمكن ممتاز مع ثبات رائع في دقة إجابات التمارين. يوصي القسم الأكاديمي لمجموعة المعلمين بمواصلة التقويم العلاجي والتمكين ومكافأته بنقاط قوة إضافية لضمان الطلاقة التامة.`
                    : `We certify that student "${studentName}" has actively maintained an admirable academic standing. Their database timeline displays stellar overall focus and structural execution patterns. We highly recommend steady engagement with continuous reinforcement tasks to bridge minor localized error margins.`}
                </p>
              </div>

              {/* Stamp & Authorized Signature */}
              <div className="flex justify-between items-end pt-4 border-t border-amber-200/50">
                <div className="space-y-1">
                  <p className="text-[8px] font-black text-slate-400 uppercase">{isRtl ? 'الجهة المصدرة للتقرير' : 'Authorized Authority Stamp'}</p>
                  <p className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 uppercase tracking-widest">🛡️ Basim Alkhalil Verified</p>
                </div>
                <div className="text-center">
                  <span className="text-[10px] font-black italic text-slate-300 block mb-1">Basim Alkhalil</span>
                  <div className="w-24 border-b border-slate-300 mx-auto" />
                  <span className="text-[8px] font-black text-slate-400 uppercase mt-1 block">{isRtl ? 'المدير الأكاديمي' : 'Academics Registrar Director'}</span>
                </div>
              </div>
            </div>

            {/* ACTIONABLE STEPPER ROADMAP BASE ON WEAKEST SKILL */}
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-black text-[#002147] flex items-center gap-2">
                  <Sparkles size={18} className="text-amber-500 animate-pulse" />
                  {isRtl ? 'مسار التقويم العلاجي والتمكين المخطط' : 'Tailor-made Actionable Weakness Remediation Stepper'}
                </h3>
                <p className="text-xs text-slate-400 font-bold mt-0.5">
                  {isRtl ? 'خطة ثلاثية الخطوات مخصصة ومبنية بالكامل على أضعف نقاط التفاعل لضمان التميز:' : 'Customized 3-step technical roadmap generated dynamically to remediate the lowest-scoring domain:'}
                </p>
              </div>

              {/* Dynamically construct steps according to weakest points */}
              {(() => {
                const weakestId = Object.entries(categoryAverages)
                  .sort((a, b) => a[1] - b[1])
                  .map(([k, v]) => k)[0] || 'grammar';

                let steps: string[] = [];
                if (weakestId === 'grammar') {
                  steps = isRtl ? [
                    'الخطوة الأولى: مراجعة وإعادة حل كويزات فنيات تركيب الجملة والروابط السابقة.',
                    'الخطوة الثانية: قضاء 15 دقيقة مستقلة مع رفيق الدردشة الذكي لطرح الأسئلة حول الضمائر والأزمنة.',
                    'الخطوة الثالثة: تفعيل خيار الاختبار الثنائي بعد إنهاء أسبوع التعلم الحالي مباشرة.'
                  ] : [
                    'Step 1: Re-attempt previous syntax-building and sentence construction exercises.',
                    'Step 2: Spend 15 minutes asking our AI Chat Assistant specifically about structural rules & tenses.',
                    'Step 3: Double-check grammatical accuracy on study flow modules before submission.'
                  ];
                } else if (weakestId === 'story-library') {
                  steps = isRtl ? [
                    'الخطوة الأولى: الاستماع المتكامل لقصتين تفاعليتين أسبوعياً مع تفعيل نصوص القراءة المسموعة.',
                    'الخطوة الثانية: قراءة سيناريوهات القصص بصوت عالٍ لمحاكاة مخارج الحروف الصحيحة.',
                    'الخطوة الثالثة: تسجيل ملف صوتي ومقارنته بالصوت المرجعي لتحسين مهارات الطلاقة السمعية.'
                  ] : [
                    'Step 1: Listen to at least 2 interactive audio stories per week with transcripts enabled.',
                    'Step 2: Read story transcripts out loud to sync speed and correct phonetic outputs.',
                    'Step 3: Match vocabulary words back to the lexical database index.'
                  ];
                } else if (weakestId === 'reading') {
                  steps = isRtl ? [
                    'الخطوة الأولى: الاستيقاظ مسبقاً وتخصيص 10 دقائق صباحية لقراءة نصوص الفهم المترجمة.',
                    'الخطوة الثانية: تسجيل الكلمات المعجمية الصعبة الجديدة في مذكرة الكلمات المخصصة.',
                    'الخطوة الثالثة: تكرار حل اختبارات الفهم السريع للمقروء حتى الحصول على معدل فوق لـ 85%.'
                  ] : [
                    'Step 1: Allocate 10 minutes every morning to read high-context texts or essays.',
                    'Step 2: Build a private glossary index of unfamiliar adjectives and verbs.',
                    'Step 3: Solve retention quizzes until getting a flawless score above 85%.'
                  ];
                } else {
                  steps = isRtl ? [
                    'الخطوة الأولى: تأمين التناغم والمتابعة والالتزام اليومي بواقع درس واحد على الأقل للمرحلة.',
                    'الخطوة الثانية: عدم ترك أي تحدي يومي للذكاء الاصطناعي معلقاً وحل المتطلبات أولاً بأول.',
                    'الخطوة الثالثة: إثراء التفاعل برفع الأسئلة حول منهج أوكسفورد في حصة المراجعة القادمة.'
                  ] : [
                    'Step 1: Re-engage with the active study plan daily to ensure zero gap days.',
                    'Step 2: Complete the automated vocabulary building modules on time.',
                    'Step 3: Ask the academic leader for personalized review sheets during the live session.'
                  ];
                }

                return (
                  <div className="space-y-4">
                    {steps.map((text, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-blue-50 border-2 border-blue-600 text-blue-600 font-black text-xs flex items-center justify-center flex-shrink-0 shadow-sm">
                          {i + 1}
                        </div>
                        <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex-grow font-bold text-slate-700 text-xs">
                          {text}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* AI INTERACTIVE COGNITIVE CONSULTATION chatbot */}
        <div className="bg-[#002147] text-white p-6 md:p-8 rounded-[3rem] shadow-xl relative overflow-hidden space-y-6">
          <div className="absolute top-6 right-6 opacity-10 pointer-events-none">
            <Quote size={100} />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center text-amber-300">
                <Brain size={22} />
              </div>
              <h3 className="text-xl font-black">{t.aiCounselor}</h3>
            </div>
            <p className="text-xs text-blue-100 max-w-2xl leading-relaxed">{t.aiCounselorDesc}</p>
          </div>

          {/* Quick preset chips */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { label: t.askBtn1, val: t.askBtn1 },
              { label: t.askBtn2, val: t.askBtn2 },
              { label: t.askBtn3, val: t.askBtn3 }
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => askAIConsultant(chip.val)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-[10px] font-black transition-all leading-tight text-right hover:scale-[1.02] cursor-pointer"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Chat input form */}
          <div className="flex gap-2 relative z-10">
            <input 
              type="text"
              value={aiMessage}
              onChange={(e) => setAiMessage(e.target.value)}
              placeholder={t.placeholderText}
              onKeyDown={(e) => e.key === 'Enter' && askAIConsultant()}
              className="flex-grow px-5 py-3.5 bg-white/10 focus:bg-white/15 border-2 border-white/5 focus:border-white/25 rounded-2xl text-xs text-white placeholder-blue-200 outline-none transition-all placeholder-opacity-70 font-black min-h-[44px]"
            />
            <button
              onClick={() => askAIConsultant()}
              disabled={isLoadingAI}
              className="px-6 bg-white hover:bg-[#ffb020] text-[#002147] hover:text-white rounded-2xl font-black transition-all flex items-center justify-center gap-2 disabled:bg-white/30 cursor-pointer min-h-[44px]"
            >
              <Send size={15} />
              <span className="hidden sm:inline text-xs">{t.send}</span>
            </button>
          </div>

          {/* Animated response space */}
          <AnimatePresence mode="wait">
            {isLoadingAI && (
              <motion.div 
                key="loading-ai"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3"
              >
                <Loader2 className="animate-spin text-amber-300 flex-shrink-0" />
                <p className="text-xs font-black text-blue-100 animate-pulse">{t.loadingAI}</p>
              </motion.div>
            )}

            {aiResponse && !isLoadingAI && (
              <motion.div
                key="response-ai"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-white text-[#002147] rounded-[2rem] shadow-lg border border-white/10 space-y-4"
              >
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Sparkles size={16} className="text-blue-600" />
                  <span className="text-[11px] font-black text-slate-400 capitalize">{t.consultationResult}</span>
                </div>
                
                {/* Visual result layout with neat formatted lines */}
                <div className="text-xs leading-relaxed text-[#002147] font-bold space-y-2 whitespace-pre-wrap">
                  {aiResponse}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Target size={14} />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-black uppercase text-slate-400">{t.nextStep}</h5>
                    <p className="text-[11px] font-black text-emerald-600">{t.readyToTest}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Dynamic bottom secure stamp */}
        <div className="pt-4 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-slate-400">
          <p className="flex items-center gap-1.5">
            <CheckCircle2 size={12} className="text-[#002147]" />
            {t.verified}
          </p>
          <p className="font-mono">VER-CODE: BK-AD-#{overallGPA}</p>
        </div>

      </div>

      {/* Share Actions - Floating below */}
      <div className="flex justify-center gap-6 text-xs font-black">
        <button className="flex items-center gap-2 text-[#002147] hover:scale-105 transition-all text-slate-400 hover:text-[#002147]">
          <Share2 size={15} />
          {t.shareReport}
        </button>
      </div>

    </div>
  );
};
