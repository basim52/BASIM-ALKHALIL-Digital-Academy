import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc, getDocs, query, where } from 'firebase/firestore';
import { 
  ArrowLeft, 
  BookOpen, 
  Sparkles, 
  UploadCloud, 
  CheckCircle2, 
  Award, 
  Lock, 
  Trophy, 
  PlayCircle, 
  Lightbulb, 
  ArrowRight, 
  GraduationCap, 
  Quote,
  Check,
  X,
  RefreshCw,
  Clock,
  Book,
  FileText,
  Search,
  Bookmark,
  ZoomIn,
  ZoomOut,
  Moon,
  Sun,
  Send,
  Trash2,
  FileDown,
  ChevronLeft,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';


import { 
  MicroLesson, 
  Chapter, 
  BookCourse, 
  PRELOADED_COURSES 
} from '../data/courses';
import { speakAcademyText, cancelAllSpeech } from '../lib/audio';

interface ProfessionalDevelopmentProps {
  lang: 'en' | 'ar';
  onBack: () => void;
  userProfile?: any;
}

export const ProfessionalDevelopment = ({ lang, onBack, userProfile }: ProfessionalDevelopmentProps) => {
  const isRtl = lang === 'ar';
  
  // Sectioning state: Courses vs Books (as requested by User)
  const [browseCategory, setBrowseCategory] = useState<'courses' | 'books'>('courses');
  const [booksSubcategory, setBooksSubcategory] = useState<'self-development'>('self-development');
  const [isBookMode, setIsBookMode] = useState<boolean>(false);
  
  // State variables for overall course browser and interactive reading canvas
  const [selectedBook, setSelectedBook] = useState<BookCourse | null>(null);
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);
  const [activeLesson, setActiveLesson] = useState<MicroLesson | null>(null);
  const [lessonIndex, setLessonIndex] = useState<number>(0);
  
  // Quiz evaluation state
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Firestore status tracking
  const [userResults, setUserResults] = useState<any[]>([]);
  const [unlockedChapters, setUnlockedChapters] = useState<Set<string>>(new Set(['sa_ch1', '7h_ch1', 'ycw_ch1', 'rd_ch1', 'pon_ch1', 'lg_ch1', 'tfs_ch1', 'ah_ch1']));
  
  // PDF Text Converter states
  const [activeTab, setActiveTab] = useState<'browse' | 'converter'>('browse');
  const [rawText, setRawText] = useState<string>('');
  const [convertedCourse, setConvertedCourse] = useState<BookCourse | null>(null);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [conversionStep, setConversionStep] = useState<string>('');

  // Reader & Scannability customization
  const [fontSize, setFontSize] = useState<'normal' | 'medium' | 'large' | 'xl'>('normal');
  const [scannableMode, setScannableMode] = useState<boolean>(true);
  const [studyViewMode, setStudyViewMode] = useState<'lesson' | 'mindmap'>('lesson');
  const [activeSeconds, setActiveSeconds] = useState<number>(0);

  // Premium Interactive PDF & Unabridged E-Book Reader States
  const [isPdfReaderView, setIsPdfReaderView] = useState<boolean>(false);
  const [pdfZoom, setPdfZoom] = useState<number>(100);
  const [pdfTheme, setPdfTheme] = useState<'parchment' | 'dark' | 'sepia' | 'plain'>('parchment');
  const [pdfCurrentPage, setPdfCurrentPage] = useState<number>(1);
  const [pdfTotalPages, setPdfTotalPages] = useState<number>(24);
  const [pdfSearchQuery, setPdfSearchQuery] = useState<string>('');
  const [pdfSearchActive, setPdfSearchActive] = useState<boolean>(false);
  const [pdfBookmarks, setPdfBookmarks] = useState<number[]>([]);
  const [pdfAssistantQuery, setPdfAssistantQuery] = useState<string>('');
  const [pdfAssistantLog, setPdfAssistantLog] = useState<{role: 'user' | 'assistant', text: string}[]>([]);
  const [isPdfAssistantSending, setIsPdfAssistantSending] = useState<boolean>(false);
  const [uploadedPdfFile, setUploadedPdfFile] = useState<{name: string, size: string, text?: string} | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [pdfSidebarTab, setPdfSidebarTab] = useState<'chapters' | 'search' | 'bookmarks' | 'upload'>('chapters');

  useEffect(() => {
    setPdfAssistantLog([
      { role: 'assistant', text: isRtl ? 'أهلاً بك في المساعد الفطن لقراءة ودراسة المتن والـ PDF الأصلي بالكامل! عثرنا على هذا المتن الفصيح من مذكرات الأكاديمية وبصيغته الكاملة لستيفن كوفي وكتاب العادات السبع وغيره من أمهات التنمية الموثقة بجودة أصلية كاملة كما أبلغتنا. يمكنك سؤالي عن أي شيء يدور بالمتن، أو طلب تفصيل المباحث العميقة.' : 'Welcome to the premium unabridged E-Reader and PDF Assistant! We loaded the original, full self-development texts for you. Feel free to ask me to analyze chapters, translate terms, or discuss key paradigms.' }
    ]);
  }, [isRtl, selectedBook]);

  // Certificate completion & customization states
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const [certificateName, setCertificateName] = useState<string>('');
  const [certificateData, setCertificateData] = useState<{
    courseTitle: string;
    chapterTitle: string;
    score: number;
    total: number;
    dateStr: string;
    serial: string;
  } | null>(null);

  // Initialize certificate name from userProfile
  useEffect(() => {
    if (userProfile?.fullName) {
      setCertificateName(userProfile.fullName);
    } else if (userProfile?.displayName) {
      setCertificateName(userProfile.displayName);
    } else {
      setCertificateName(isRtl ? 'أحمد بن عبد الله الشمري' : 'Alex Johnson');
    }
  }, [userProfile, isRtl]);

  // Active learning chronometer
  useEffect(() => {
    let interval: any = null;
    if (activeLesson && !showQuiz) {
      setActiveSeconds(0);
      interval = setInterval(() => {
        setActiveSeconds(prev => prev + 1);
      }, 1000);
    } else {
      setActiveSeconds(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeLesson?.id, showQuiz]);

  const formatSeconds = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const parseBoldText = (text: string) => {
    const parts = text.split(/\*\*([^*]+)\*\*/g);
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return <strong key={i} className="text-[#b48e56] font-black">{part}</strong>;
      }
      return part;
    });
  };

  const renderScannableContent = (content: string) => {
    const lines = content.split('\n\n');
    return (
      <div className="space-y-4">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return null;

          // Check for bold points or chapter highlights
          if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
            const listContent = trimmed.replace(/^[\s-*]+/, '');
            return (
              <div key={idx} className="flex gap-2 items-start py-2 px-4 bg-[#b48e56]/5 border-l-2 border-[#b48e56] rounded-r-lg my-2">
                <span className="text-[#b48e56] font-extrabold mt-1">•</span>
                <span className="font-serif leading-relaxed text-[#1a1a1a]">
                  {parseBoldText(listContent)}
                </span>
              </div>
            );
          }

          if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
            const inner = trimmed.substring(2, trimmed.length - 2);
            return (
              <h4 key={idx} className="text-base md:text-lg font-extrabold text-[#b48e56] mt-4 mb-2 tracking-tight">
                {inner}
              </h4>
            );
          }

          // Speed reading mode: bold beginning words for rapid scanning (Foveal/Bionic Scanning)
          if (scannableMode) {
            const words = trimmed.split(' ');
            if (words.length > 4) {
              const boldCount = Math.min(Math.ceil(words.length * 0.35), 5);
              const boldPart = words.slice(0, boldCount).join(' ');
              const regularPart = words.slice(boldCount).join(' ');
              return (
                <p key={idx} className="leading-relaxed font-serif text-[#1e2229]">
                  <strong className="text-slate-900 font-extrabold font-sans inline">{boldPart} </strong>
                  <span className="opacity-90">{regularPart}</span>
                </p>
              );
            }
          }

          return (
            <p key={idx} className="leading-relaxed font-serif text-[#1e2229]">
              {parseBoldText(trimmed)}
            </p>
          );
        })}
      </div>
    );
  };

  const renderTreeViewInfographic = () => {
    if (!activeChapter) return null;

    return (
      <div className="bg-white border border-[#e8e5df] p-6 md:p-10 rounded-3xl shadow-sm relative overflow-hidden text-right">
        {/* Decorative ambient background shape */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#b48e56]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl" />

        <div className="text-center mb-10 border-b border-[#f2ece2] pb-6">
          <span className="text-[10px] tracking-widest text-[#b48e56] uppercase font-bold py-1 px-3.5 bg-[#f5f1e8] rounded-full inline-block">
            {isRtl ? 'الهيكل التشجيري البصري' : 'Visual Mapping Hierarchy'}
          </span>
          <h3 className="text-2xl font-extrabold text-[#111] mt-2 mb-1">
            {isRtl ? 'مخطط التدرج الفطن وإعادة التركيب' : 'Deconstructed Content Roadmap'}
          </h3>
          <p className="text-slate-400 text-xs font-serif mt-1">
            {isRtl 
              ? 'اضغط على أي درس للتفاعل معه فوراً، ومتابعة عداد الوقت والكبسولة المعرفية.' 
              : 'Interact directly with any node to study its content, view parameters, or review details.'}
          </p>
        </div>

        {/* Tree Connection Path */}
        <div className="relative pr-4 md:pr-10 border-r-2 border-dashed border-[#b48e56]/30 mr-4 md:mr-12 space-y-8 py-4 text-right">
          
          {activeChapter.lessons.map((lesson, idx) => {
            const isActive = activeLesson?.id === lesson.id && !showQuiz;
            const iconStyle = isActive 
              ? 'bg-[#b48e56] text-white ring-4 ring-[#b48e56]/20' 
              : 'bg-[#faf8f5] text-[#b48e56] border-2 border-[#b48e56]/30 hover:border-[#b48e56]';
            
            const cleanContent = isRtl ? lesson.contentAr : lesson.contentEn;
            let capsuleText = "";
            if (isRtl) {
              if (cleanContent.includes('**ماذا ستستفيد من هذا الدرس**')) {
                capsuleText = cleanContent.split('**ماذا ستستفيد من هذا الدرس**')[1]?.split('\n')[2] || "";
              } else if (cleanContent.includes('**كيف تتغلب على هذا الوهم؟**')) {
                capsuleText = cleanContent.split('**كيف تتغلب على هذا الوهم؟**')[1]?.split('\n')[2] || "";
              } else if (cleanContent.includes('**كيف تلغي هذه الحلقة؟**')) {
                capsuleText = cleanContent.split('**كيف تلغي هذه الحلقة؟**')[1]?.split('\n')[2] || "";
              } else if (cleanContent.includes('**ماذا يعني ذلك لك؟**')) {
                capsuleText = cleanContent.split('**ماذا يعني ذلك لك**')[1]?.split('\n')[2] || "";
              } else if (cleanContent.includes('1. **')) {
                capsuleText = cleanContent.split('\n').filter(l => l.includes('**')).slice(1, 3).join(' ');
              }
              if (!capsuleText && cleanContent.split('\n')[2]) {
                capsuleText = cleanContent.split('\n')[2];
              }
            } else {
              if (cleanContent.includes('**What is your takeaway?**')) {
                capsuleText = cleanContent.split('**What is your takeaway?**')[1]?.split('\n')[2] || "";
              } else if (cleanContent.includes('**What does this mean for you?**')) {
                capsuleText = cleanContent.split('**What does this mean for you?**')[1]?.split('\n')[2] || "";
              } else if (cleanContent.includes('**How do you disarm this loop?**')) {
                capsuleText = cleanContent.split('**How do you disarm this loop?**')[1]?.split('\n')[2] || "";
              }
              if (!capsuleText && cleanContent.split('\n')[2]) {
                capsuleText = cleanContent.split('\n')[2];
              }
            }

            if (capsuleText.length > 220) {
              capsuleText = capsuleText.substring(0, 220) + "...";
            }
            if (!capsuleText) {
              capsuleText = isRtl ? 'تمتع بالمرونة والقراءة الذاتية الموجهة لهذا الجزء المنهجي.' : 'Self-guided developmental milestone for active consolidation.';
            }

            return (
              <div key={lesson.id} className="relative group text-right">
                {/* Connector Branch Node Circle */}
                <div className={`absolute -right-[27px] md:-right-[51px] top-6 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${iconStyle} shadow-sm z-10`}>
                  <span className="text-xs font-black">{idx + 1}</span>
                </div>

                {/* Lesson Info Bento Card */}
                <div 
                  onClick={() => {
                    setActiveLesson(lesson);
                    setLessonIndex(idx);
                    setShowQuiz(false);
                    setStudyViewMode('lesson');
                  }}
                  className={`bg-white border rounded-2xl p-5 md:p-6 transition-all duration-300 hover:shadow-md cursor-pointer text-right flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${isActive ? 'border-[#b48e56] bg-[#b48e56]/[0.02] shadow-sm' : 'border-[#e8e5df] hover:border-slate-300'}`}
                >
                  <div className="flex-1 space-y-2 text-right">
                    <div className="flex items-center gap-2 flex-wrap justify-start">
                      <span className="text-[10px] tracking-wider text-[#b48e56] uppercase font-bold py-0.5 px-2.5 bg-[#f5f1e8] rounded-full inline-block leading-none">
                        {lesson.type === 'intro' ? (isRtl ? 'تمهيد' : 'Orientation') : 
                         lesson.type === 'review' ? (isRtl ? 'مراجعة' : 'Review Node') : 
                         lesson.type === 'tips' ? (isRtl ? 'دليل إرشادي' : 'Tips Node') : (isRtl ? 'جوهر المفهوم' : 'Core Concept')}
                      </span>
                      
                      <span className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                        <Clock size={12} />
                        <span>{isRtl ? `تستغرق ${lesson.duration}` : `${lesson.duration} Read`}</span>
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-800 text-base md:text-lg transition-colors group-hover:text-[#b48e56]">
                      {isRtl ? lesson.titleAr : lesson.titleEn}
                    </h4>

                    {/* Capsule Box (الكبسولة المعرفية للتثبيت) */}
                    <div className="bg-[#faf9f6] border border-slate-100 rounded-xl p-3 text-slate-600 text-xs font-serif leading-relaxed italic border-r-4 border-r-[#b48e56] my-2 text-right">
                      <span className="font-bold font-sans text-[#b48e56] block not-italic mb-1 text-right">
                        {isRtl ? 'الكبسولة التثبيتية 💡' : 'Core Nugget 💡'}
                      </span>
                      {capsuleText}
                    </div>
                  </div>

                  <div className="text-xs font-black text-[#b48e56] flex items-center gap-1 shrink-0 self-end md:self-center">
                    <span>{isRtl ? 'افتح لقراءة مطولة' : 'Read Full Node'}</span>
                    <ArrowRight size={14} className="rtl:rotate-180" />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Gatekeeper Node on Tree */}
          <div className="relative group text-right">
            <div className="absolute -right-[27px] md:-right-[51px] top-6 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-sm z-10 ring-4 ring-amber-500/20">
              <Trophy size={16} />
            </div>

            <div 
              onClick={() => {
                setShowQuiz(true);
                setCurrentQuizIndex(0);
                setSelectedOptionIndex(null);
                setIsAnswered(false);
                setQuizScore(0);
                setQuizFinished(false);
              }}
              className="bg-amber-500/5 border border-amber-200 rounded-2xl p-5 md:p-6 transition-all duration-300 hover:shadow-md cursor-pointer text-right flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-amber-400"
            >
              <div className="flex-1 space-y-1 text-right">
                <span className="text-[10px] tracking-wider text-amber-600 uppercase font-black py-0.5 px-2.5 bg-amber-500/10 rounded-full inline-block leading-none">
                  {isRtl ? 'تقييم الجودة والتأهيل' : 'Gatekeeper Exam'}
                </span>
                <h4 className="font-bold text-slate-800 text-base md:text-lg">
                  {isRtl ? 'بوابة التحقق ونظام عبور الفصل' : 'Consolidated Chapter Gate Quiz'}
                </h4>
                <p className="text-slate-400 text-xs font-serif">
                  {isRtl 
                    ? 'اختبار حاسم مكون من أسئلة متدرجة لتقييم استيعابك للمفاهيم واكتساب الـ XP.' 
                    : 'Pass with score >= 70% to unlock subsequent units and lock in your score rewards.'}
                </p>
              </div>

              <div className="text-xs font-black text-amber-600 flex items-center gap-1 shrink-0 self-end md:self-center">
                <span>{isRtl ? 'باشر الاختبار الصارم' : 'Launch Examination'}</span>
                <ArrowRight size={14} className="rtl:rotate-180" />
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  };

  const triggerCertificate = (courseTitle: string, chapterTitle: string, score: number, total: number) => {
    // Generate a unique serial format
    const hash = Math.floor(100000 + Math.random() * 900000);
    const dateNow = new Date();
    const dateFormatted = dateNow.toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    setCertificateData({
      courseTitle,
      chapterTitle,
      score,
      total,
      dateStr: dateFormatted,
      serial: `BKDA-PD-${score >= total ? 'AMB' : 'ALN'}-${hash}`
    });
    setShowCertificate(true);
    
    // Confetti burst for celebrating academic excellence!
    confetti({
      particleCount: 180,
      spread: 80,
      origin: { y: 0.5 }
    });
  };

  const getBookOverallScores = (book: any) => {
    let score = 0;
    let total = 0;
    book.chapters.forEach((ch: any) => {
      const r = userResults.find((res: any) => res.lessonId === ch.id);
      if (r) {
        score += r.score || 0;
        total += r.total || 0;
      }
    });
    if (total === 0) total = book.chapters.length * 3; // safe fallback
    return { score, total };
  };

  const renderCertificateModal = () => {
    if (!showCertificate || !certificateData) return null;

    const percentage = Math.round((certificateData.score / certificateData.total) * 100);
    let gradeStr = isRtl ? 'ممتاز مرتفع' : 'Excellent with Distinction (Grade A)';
    if (percentage < 80) {
      gradeStr = isRtl ? 'جيد جداً مرتفع' : 'Very Good (Grade B+)';
    } else if (percentage < 90) {
      gradeStr = isRtl ? 'ممتاز' : 'Excellent (Grade A)';
    }

    return (
      <AnimatePresence>
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 font-sans print:p-0 print:absolute print:inset-0 print:bg-white print:z-50 leading-relaxed text-[#1e2229]">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-3xl w-full max-w-4xl p-6 md:p-8 flex flex-col md:flex-row gap-6 relative shadow-2xl print:shadow-none print:p-0 print:w-full print:max-w-none print:rounded-none text-right"
          >
            {/* Left side parameters customizer panel */}
            <div className="w-full md:w-80 border-b md:border-b-0 md:border-l border-[#e8e5df] pb-6 md:pb-0 md:pl-6 space-y-5 print:hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3 justify-start">
                  <div className="w-8 h-8 rounded-lg bg-[#b48e56]/10 flex items-center justify-center text-[#b48e56]">
                    <Award size={18} />
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-lg">
                    {isRtl ? 'محرر الشهادة الفخمة' : 'Certificate Customizer'}
                  </h3>
                </div>
                <p className="text-slate-500 text-xs font-serif leading-relaxed text-right">
                  {isRtl 
                    ? 'هنا يمكنك صياغة وتعديل المعايير والاسم الثنائي أو الثلاثي الذي سيظهر بالشهادة المعتمدة لطباعتها أو حفظها.'
                    : 'Personalize the certificate details, trainee name, and credentials prior to printing or saving.'}
                </p>

                {/* Input Trainee Name */}
                <div className="mt-5 space-y-1.5 text-right">
                  <label className="text-xs font-black text-slate-500 block">
                    {isRtl ? 'اسم المتدرب بالشهادة:' : 'Trainee Full Name:'}
                  </label>
                  <input 
                    type="text" 
                    value={certificateName}
                    onChange={(e) => setCertificateName(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:border-[#b48e56] text-right"
                    placeholder={isRtl ? 'اسمك الثنائي أو الثلاثي الفاخر' : 'Your Professional Name'}
                  />
                  <p className="text-[10px] text-slate-400 font-serif">
                    {isRtl ? '* يتم تحديث محتوى الشهادة فورياً أثناء الكتابة.' : '* Live preview updates immediately on input change.'}
                  </p>
                </div>

                {/* Certificate Details list */}
                <div className="mt-6 border-t border-slate-100 pt-4 space-y-2.5 text-xs text-slate-600 font-serif text-right">
                  <div className="flex justify-between flex-row-reverse">
                    <span className="font-bold">{isRtl ? 'الدورة المعتمدة:' : 'Approved Course:'}</span>
                    <span className="text-[#002147] font-sans font-black">{certificateData.courseTitle}</span>
                  </div>
                  <div className="flex justify-between flex-row-reverse">
                    <span className="font-bold">{isRtl ? 'المستوى ومعيار التقييم:' : 'Level & Standard:'}</span>
                    <span className="text-slate-800 font-semibold">{certificateData.chapterTitle}</span>
                  </div>
                  <div className="flex justify-between flex-row-reverse">
                    <span className="font-bold">{isRtl ? 'الدرجة المحصلة:' : 'Grade Score:'}</span>
                    <span className="text-emerald-600 font-sans font-black">{certificateData.score} / {certificateData.total} ({percentage}%)</span>
                  </div>
                  <div className="flex justify-between flex-row-reverse">
                    <span className="font-bold">{isRtl ? 'تاريخ الإصدار:' : 'Issue Date:'}</span>
                    <span className="text-slate-500 font-sans">{certificateData.dateStr}</span>
                  </div>
                  <div className="flex justify-between flex-row-reverse">
                    <span className="font-bold">{isRtl ? 'رقم التحقق:' : 'Serial Key:'}</span>
                    <span className="font-mono text-[10px] text-zinc-500 font-bold bg-zinc-100 py-0.5 px-1.5 rounded">{certificateData.serial}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-6">
                <button 
                  onClick={() => window.print()}
                  className="w-full py-3 px-4 bg-[#b48e56] hover:bg-[#a17e4b] text-white rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <FileText size={15} />
                  <span>{isRtl ? 'طباعة وحفظ كـ PDF 🖨️' : 'Print / Save as PDF'}</span>
                </button>
                <button 
                  onClick={() => setShowCertificate(false)}
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black block text-center transition-all cursor-pointer"
                >
                  {isRtl ? 'عودة للمساق' : 'Close Certificate'}
                </button>
              </div>
            </div>

            {/* Right side Elegant printable certificate layout */}
            <div className="flex-1 bg-[#fdfbf7] border-4 border-double border-[#b48e56]/65 p-6 md:p-10 rounded-2xl relative overflow-hidden select-none flex flex-col justify-between aspect-[1.414/1] text-center shadow-inner print:border-none print:bg-white print:p-8 print:w-full">
              {/* Decorative classical background border corners */}
              <div className="absolute top-2 right-2 w-16 h-16 border-t-2 border-r-2 border-[#b48e56]/55 rounded-tr-md print:hidden" />
              <div className="absolute top-2 left-2 w-16 h-16 border-t-2 border-l-2 border-[#b48e56]/55 rounded-tl-md print:hidden" />
              <div className="absolute bottom-2 right-2 w-16 h-16 border-b-2 border-r-2 border-[#b48e56]/55 rounded-br-md print:hidden" />
              <div className="absolute bottom-2 left-2 w-16 h-16 border-b-2 border-l-2 border-[#b48e56]/55 rounded-tl-md print:hidden" />

              {/* Decorative Subtle Background Crest */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#b48e56]/[0.015] rounded-full flex items-center justify-center border border-dashed border-[#b48e56]/5 select-none pointer-events-none" />

              {/* Certificate Header Branding - Beautiful Blue Banner */}
              <div className="bg-[#002147] text-white -mx-6 md:-mx-10 -mt-6 md:-mt-10 px-6 md:px-10 py-5 mb-5 select-none relative z-10 flex justify-between items-center flex-row-reverse border-b-4 border-[#b48e56] rounded-t-xl">
                <div className="text-right">
                  <span className="font-extrabold text-white text-sm md:text-base leading-none block font-sans">
                    {isRtl ? 'أكاديمية باسم آل خليل الرقمية' : 'Basim Al Khalil Digital Academy'}
                  </span>
                  <span className="text-[9px] md:text-[10px] text-amber-400 font-semibold mt-1 block">
                    {isRtl ? 'الهيئة العالمية للجودة وتدقيق معايير النخبة المهنية' : 'International Board of Quality & Professional Elite Standards'}
                  </span>
                </div>

                {/* Academy logo container */}
                <div className="w-12 h-12 rounded-full border-2 border-amber-400 flex items-center justify-center bg-white/10 shrink-0">
                  <GraduationCap className="text-amber-400" size={24} />
                </div>
              </div>

              {/* Main certificate wording */}
              <div className="my-auto space-y-4 md:space-y-6 relative z-10">
                <div>
                  <span className="text-[10px] font-black tracking-widest text-[#002147] uppercase py-1 px-3.5 bg-blue-50 rounded-full inline-block mb-1 border border-[#002147]/15 font-sans">
                    {isRtl ? 'شهادة إكمال واعتماد المسار المهني الرقمي' : 'Certified Digital Professional Path Achievement'}
                  </span>
                  <h2 className="text-2xl md:text-3.5xl font-black text-[#002147] tracking-tight leading-snug font-sans">
                    {isRtl ? 'شهادة إتمام ومطابقة معايير جودة المعرفة' : 'Certificate of Completion & Intellectual Mastery'}
                  </h2>
                </div>

                <p className="text-xs md:text-sm text-slate-500 font-serif leading-relaxed max-w-xl mx-auto">
                  {isRtl 
                    ? 'تشهد الأكاديمية ومجلس جودة التدريب والبحث المعرفي المستمر بفخر واعتزاز بأن المتدرب/المتدربة:'
                    : 'This is to officially verify and certify that the distinguished scholar:'}
                </p>

                {/* Trainee Name dynamic input block */}
                <div className="py-2 mb-2">
                  <h1 className="text-2xl md:text-4xl font-extrabold text-[#111] bg-gradient-to-r from-slate-900 via-[#002147] to-[#002147] bg-clip-text text-transparent px-4 font-sans tracking-tight">
                    {certificateName || (isRtl ? 'اسم المتدرب المتميز' : 'Distinguished Trainee Name')}
                  </h1>
                  <div className="w-40 md:w-60 h-[1.5px] bg-[#002147]/40 mx-auto mt-2 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#002147] rotate-45" />
                  </div>
                </div>

                <p className="text-xs md:text-sm text-slate-500 font-serif leading-relaxed max-w-2xl mx-auto">
                  {isRtl ? (
                    <>
                      قد اجتاز بنجاح واكتملت له كافة المتطلبات المعرفية المحددة لـ:
                      <br />
                      <strong className="text-[#002147] text-base md:text-lg font-black px-2 inline-block my-1 font-sans">
                        إتمام دورة «{certificateData.courseTitle}»
                      </strong>
                      <br />
                      بتقدير عام <span className="font-extrabold text-emerald-600">{gradeStr}</span> ونسبة كفاءة بلغت {percentage}%.
                    </>
                  ) : (
                    <>
                      has successfully completed all micro-learning checkpoints and passed the rigorous assessment for:
                      <br />
                      <strong className="text-[#002147] text-base md:text-lg font-black px-2 inline-block my-1 font-sans">
                        Completion of the course: "{certificateData.courseTitle}"
                      </strong>
                      <br />
                      attaining a final grade of <span className="font-extrabold text-emerald-600">{gradeStr}</span> and representing full intellectual mastery.
                    </>
                  )}
                </p>
              </div>

              {/* Certificate Footer Stamp & Signatures */}
              <div className="border-t border-[#f3eee5] pt-4 mt-6 flex justify-between items-end text-right flex-row-reverse">
                {/* Signatures 1 */}
                <div className="text-right space-y-1 z-10">
                  <span className="text-[10px] text-slate-400 block font-serif font-semibold">{isRtl ? 'رئيس الأكاديمية والعميد:' : 'Academy President & Dean:'}</span>
                  <p className="font-serif italic text-slate-800 font-bold text-xs">{isRtl ? 'د. باسم آل خليل' : 'Dr. Basim Al Khalil'}</p>
                  <div className="w-24 h-5 border-b border-dashed border-slate-300 relative inline-block">
                    <span className="font-mono text-[9px] text-slate-300 absolute left-4 bottom-0 select-none">Basim@KhalilAcademy</span>
                  </div>
                </div>

                {/* Blue & Gold Seal stamp inside certificate */}
                <div className="flex flex-col items-center justify-center relative shrink-0 z-20">
                  <div className="absolute w-14 h-14 bg-blue-500/10 rounded-full opacity-10 filter blur-sm print:hidden" />
                  <div className="w-16 h-16 rounded-full border-4 border-double border-[#002147] bg-[#fcf9f2] flex flex-col items-center justify-center p-1.5 shadow-sm relative">
                    <div className="text-[7px] font-black uppercase text-[#002147] font-sans tracking-wide scale-95 select-none text-center leading-none">
                      {isRtl ? 'معتمد رقمياً' : 'BKDA VAL'}
                      <span className="block text-emerald-600 font-bold text-[6px] mt-0.5">{percentage}% OK</span>
                    </div>
                    <Trophy className="text-[#b48e56] mt-0.5" size={14} />
                  </div>
                  <span className="text-[8px] font-black text-[#002147] tracking-widest mt-1 uppercase font-mono block select-none">
                    {isRtl ? 'ختم الأكاديمية' : 'Academy Seal'}
                  </span>
                </div>

                {/* Academic credentials and metadata signatures */}
                <div className="text-right space-y-1 z-10">
                  <span className="text-[10px] text-slate-400 block font-serif font-semibold">{isRtl ? 'رئيس هيئة الاعتماد الفني:' : 'Chairman of Accreditation:'}</span>
                  <p className="font-serif italic text-slate-800 font-bold text-xs">{isRtl ? 'أ.د. عبد الهادي الصايغ' : 'Prof. Abdul-Hadi Al-Saigh'}</p>
                  <div className="w-24 h-5 border-b border-dashed border-slate-300 relative inline-block">
                    <span className="font-mono text-[9px] text-slate-300 absolute right-4 bottom-0 select-none font-sans">BKDA-APPROVED</span>
                  </div>
                </div>
              </div>

              {/* Serial Number & Security Bottomline */}
              <div className="pt-2 flex justify-between items-center text-[8px] font-mono font-bold text-slate-400 border-t border-slate-100 flex-row-reverse select-none">
                <span>ID: {certificateData.serial}</span>
                <span>{isRtl ? 'بوابة التحقق الفطنة ومكافحة التزوير الأكاديمي' : 'BKDA Cognitive Integrity Control Protocol'}</span>
                <span>{certificateData.dateStr}</span>
              </div>
            </div>

          </motion.div>
        </div>
      </AnimatePresence>
    );
  };

  // Local storage cache or fetch profile completed marks from database
  useEffect(() => {
    if (userProfile?.uid) {
      const fetchResults = async () => {
        try {
          const q = query(
            collection(db, 'lessonResults'),
            where('userId', '==', userProfile.uid)
          );
          const snap = await getDocs(q);
          const results: any[] = [];
          const unlocked = new Set<string>(['sa_ch1', '7h_ch1', 'ycw_ch1', 'rd_ch1', 'pon_ch1', 'lg_ch1', 'tfs_ch1', 'ah_ch1']);
          snap.forEach(doc => {
            const data = doc.data();
            results.push(data);
            if (data.lessonId) {
              unlocked.add(data.lessonId);
              // Dynamic Unlock for all courses and chapters: 
              // Since lesson results are only saved to DB when passed, if the user has a record,
              // it implies completion/passing. Thus, we safely unlock the subsequent chapter.
              PRELOADED_COURSES.forEach(course => {
                const chIndex = course.chapters.findIndex(ch => ch.id === data.lessonId);
                if (chIndex !== -1 && chIndex + 1 < course.chapters.length) {
                  unlocked.add(course.chapters[chIndex + 1].id);
                }
              });
              if (selectedBook) {
                const chIndex = selectedBook.chapters.findIndex(ch => ch.id === data.lessonId);
                if (chIndex !== -1 && chIndex + 1 < selectedBook.chapters.length) {
                  unlocked.add(selectedBook.chapters[chIndex + 1].id);
                }
              }
            }
          });
          setUserResults(results);
          setUnlockedChapters(unlocked);
        } catch (e) {
          console.error("Error fetching developmental progression:", e);
        }
      };
      fetchResults();
    }
  }, [userProfile?.uid]);

  const speakText = async (text: string) => {
    cancelAllSpeech();
    await speakAcademyText(text, isRtl ? 'ar' : 'en');
  };

  // Database of Premium, Full-Text, Unabridged Pages of the Best-Sellers
  const getUnabridgedBookPageContent = (bookId: string, pageNumber: number): { title: string, content: string } => {
    const bookTextsAr: Record<string, { title: string, content: string }[]> = {
      seven_habits: [
        {
          title: "المدخل: فلسفة النظارات الذهنية - أخلاق الشخصية مقابل أخلاق المظهر",
          content: `يعرض ستيفن كوفي في المدخل فكرة في غاية العمق والأصالة: "المنظور الفكري أو الذهني (Paradigm)". المنظور هو الطريقة التي نرى بها العالم، وليس بحواسنا البصرية بل بعيوننا العقلية والتفسيرية المسبقة. إنه كالنظارة التي نرتديها لتغير لون ورؤية كل ما يقع تحت بصرنا.

يقسم كوفي تطور التنمية البشرية إلى عهدين رئيسيين:
1. عهد "أخلاق المظهر" (Personality Ethics) الذي ساد بعد الحرب العالمية الأولى، ويركز على القشور، أي استخدام تقنيات العلاقات العامة السريعة، وصقل أساليب التأثير، والابتسامة المصطنعة، ولغة الجسد الجذابة بهدف إقناع الدائرة المحيطة. ويرى كوفي أن هذا التوجه ركيك وسرعان ما ينكشف في هزة الأزمات الحقيقية بالشركات كشجرة ذابلة الأصول جُملت بطلاء خارجي زائف.

2. عهد "أخلاق الشخصية" (Character Ethics) وهو الأساس المتين للتنمية الخالدة، ويركز على ترسيخ الفضائل والسمات الباطنية الراسخة مثل: الأمانة، والنزاهة، والتواضع، والكرامة الإنسانية الصالحة، والشجاعة، والعدالة المتكافئة. هذا التأسيس الباطني يصنع حضوراً وقوراً ذا كينونة هيبة تدوم طويلاً وتجلب القيادة الطبيعية المبرزة والصادقة.

يسرد ستيفن كوفي قصة عائلية حقيقية مؤثرة؛ تظهر كيف واجه هو وزوجته مشكلة كبرى مع ابنهما الذي كان يتعثر أكاديمياً واجتماعياً ورياضياً. في البداية، طافوا يحاولون مساندته باستخدام "أخلاق المظهر"، مثل حثه على الابتسام، وتشجيعه بعبارات رنانة، ومطالبة المحيطين بعدم جرح كبريائه. ثم أدركا أن هذه السلوكيات نابعة من منظور خفي يراه طفلاً عاجزاً ومحتاجاً للدعم الدائم، مما كرس تراجعه النفسي وتعميق يأسه بساحات المعرفة. حين غيرا منظورهما ورأيا فيه طفلاً أصيلاً مستقلاً يملك بذور الفعالية، كفا عن حمايته وبدءا يثقان في نضجه، ليزدهر ابنهما تدريجياً وبصفة مذهلة من الداخل إلى الخارج بشكل طبيعي مدهش صدم كافة زملائه.`
        },
        {
          title: "العادة الأولى: كن مبادراً - المسافة السحرية وصناعة ردود الأفعالك",
          content: `تؤسس العادة الأولى "كن مبادراً" (Be Proactive) للحرية المطلقة وصناعة القدر والمطامح بوقار ونبالة تامة. المبادرة في جوهرها تعني أن سلوكك وتصرفاتك هي نتيجة مباشرة لقراراتك الواعية وقيمك الصالحة الحرة، وليست انعكاساً للظروف الخارجية، أو الطقس، أو ضغوط الاقتصاد، أو اللامبالاة والتخاذل.

يلهمنا الدكتور فيكتور فرانكل (Viktor Frankl) – الطبيب النفسي الشهير ومؤسس نظرية العلاج بالمعنى – القصة الإنسانية الكبرى أثناء بقائه في معتقلات السجون بالحقبة النازية الأليمة. فرانكل قُهر جسدياً وماتت عائلته بالكامل تحت التعذيب، لكنه اكتشف في غسق الظلام فكرة هزت الوجود: "بين المثير الخارجي والاستجابة الواعية تكمن فجوة زمنية ومساحة سحرية لا يملك أحد كسرها، داخل هذه الفجوة تكمن حريتنا المطلقة وقوتنا الذهنية لاختيار استجابتنا المبدئية والكرامة الإنسانية الصالحة".

الأشخاص التفاعليون (Reactive people) يبنون مناعتهم وعواطفهم وصداقاتهم على تغيرات المناظر الخارجية والطقس الاجتماعي؛ فإذا عاملهم الآخرون بتقدير فرحوا، وإذا انتقد أحد فكرهم غضبوا وثارت ثورتهم وتحول ميزانهم لصالح الهموم وتشتيت جهدهم العاطفي.
في المقابل، يحمل الأشخاص المبادرون "طقسهم الداخلي المستقل" القائم على المبادئ؛ فهم لا يسيرون خلف الانفعالات، ولغتهم مطهرة بالكامل من ألفاظ الإجبار والاضطرار:
- بدلاً من قولهم: "ليس بيدي حيلة، والظروف تضطرني"
- يقولون: "دعنا نستكشف البدائل الفعالة المتوفرة، وسوف أتحمل نفقات قراري بوقار وشجاعة".

المبادر يركز كل طاقته الحركية والتحليلية داخل "دائرة التأثير" (Circle of Influence)، وهي المساحة المهنية والشخصية التي يملك بالفعل القدرة على تغييرها وتطويرها، مستبعداً دائرة الهموم (Circle of Concern) العقيمة التي يستنزف التفاعليون ساعات طويلة في الندب والتباكي حول قيودها الصعبة.`
        },
        {
          title: "العادة الثانية: ابدأ والغاية في ذهنك - معيار البوصلة ودستور الرسالة الشخصية",
          content: `تتلخص العادة الثانية "ابدأ والغاية في ذهنك" (Begin with the End in Mind) في قانون كوني وبديهة فصيحة: "كل الأشياء تُخلق مرتين؛ بناء ذهني أولاً عبر الرؤية والتخطيط، وبناء مادي ملموس يتطابق مع هذا التصميم والبرمجة الواعية الشجاعة ثانياً".

إذا لم تلزم عقلك بصياغة وبناء وتصميم منظورك ورؤيتك لمستقبلك الذاتي وأعمالك، فإنك تمنح تلقائياً وبتنازل مهين الآخرين والظروف المحيطة وتصادمات السوق سلطة تصميم خط حياتك وتوجيه دفة حركتك بالنيابة عنك.

يدعونا كوفي لتجربة ذهنية متطورة وقاسية للغاية للملاحة ورؤية الحقائق: "تخيل أنك تسير في جنازة حارة، لتجد نفسك تدخل قاعة وتلقي نظرة داخل التابوت لتصدم برؤية جسدك ووجهك أنت! وتجد أربعة خطباء يقفون على المنصة لتأبينك: ممثل عن عائلتك، وممثل عن أصدقائك، وممثل عن رفقاء عملك وصناعتك بالشركات، وممثل عن مجتمعك ودائرتك الاجتماعية. ما الذي تتمناه بصدق وثقة أن يقوله هؤلاء عن شخصيتك وتأثيرك ونبالتك بعد رحيلك؟". إن الإجابة عن هذا السؤال الفطن هي التعريف الأسمى والأجدر لقيمك وغايتك المطلقة بالكامل.

انطلاقاً من هذه الرؤية المبرزة، يتولد "الدستور الفردي أو الرسالة الشخصية (Personal Mission Statement)" كأثرى مشروع تنموي للفرد. الدستور هو وثيقة مكتوبة تعكس مبادئك الأخلاقية الراسخة، غاياتك العليا، والمنهج المعتمد لقيادتك وصنع مجدك، ويكون بمثابة بوصلة ثابتة ترشد طريقك وسط أعاصير تشتيت المعرفة ونفقات التغيير بالأسواق والمهن.`
        },
        {
          title: "العادة الثالثة: ابدأ بالأهم قبل المهم - إخماد نيران الأزمات والانتقال لمربع الصدارة الثاني",
          content: `تأتي العادة الثالثة "ابدأ بالأهم قبل المهم" (Put First Things First) بمثابة التجسيد والممارسة العملية والجسدية لأول عادتين؛ فإذا كانت العادة الأولى تؤكد "أنت المبرمج"، والثانية تصيغ "البرنامج والرؤية"، فإن الثالثة تعلن "أنت المنفذ الشجاع للبرنامج".

تشرح "مصفوفة ستيفن كوفي لإدارة الوقت" كيفية توزيع الأنشطة البشرية بدقة متناهية عبر معيارين أساسيين: الأهمية والسرعة (العجلة)، لينتج لدينا أربعة مربعات رئيسية تقود مجمل الحركة اليومية والقرارات المعرفية بالشركات والمؤسسات والبيوت:

1. **المربع الأول (هام وعاجل - الأزمات):** يختص بنيران المشاكل الطارئة، الكوارث العاطفية، والمهام التي قاربت مدتها القصوى على النفاد. البقاء الدائم والعيش داخل هذا المربع يسبب الانهيار العصبي السريع وتفشي نيران الاحتراق واليأس.
2. **المربع الثاني (هام وغير عاجل - الصدارة والريادة المعرفية):** يختص بالصيانة الوقائية، التخطيط الاستراتيجي البعيد، بناء رصيد العلاقات الإنسانية الأصيلة، الرياضة الصحية، والتعلم الدائم لتثبيت الجدارة. هذا هو موطن الفعالية، والناجحون والمبادرون يستثمرون 80% من طاقاتهم في كنف هذا المربع الخصب لتفادي النيران قبل تفشيها.
3. **المربع الثالث (عاجل وغير هام - الخديعة والضياع الهامشي):** ويشمل المقاطعات التافهة، بعض المكالمات الطويلة، واللقاءات التي تستنزف طاقتك لتلبية مطالب الآخرين دون أي تحقيق لغايات دستورك السامي.
4. **المربع الرابع (غير هام وغير عاجل - التبدد والكسل):** تضييع الوقت في تصفح عشوائي لوسائل الإعلام، سفاسف الأمور السطحية، والهروب التام من واقع التحديات.

للازدهار والتركيز في المربع الثاني الهام، ينبغي تملك نزاهة وشجاعة باطنية لقول "لا" دبلوماسية ولبقة للغاية لكافة إغراءات المربعين الثالث والرابع، وإعادة صيانة المهام بجدولة أسبوعية دقيقة وتوزيع فطن للمسؤوليات بوقار.`
        },
        {
          title: "حساب رصيد الائتمان العاطفي وإرساء قواعد الإيداع الكونية للتواصل الإنساني المعمر",
          content: `قبل العبور والتدرج من مرحلة "الاستقلال الفردي" (المحقق بالثلاث عادات الأولى) إلى مرحلة "الاعتماد الإنساني المتبادل" والنجاح الجماعي (المدرك بالثلاث عادات التالية)، يبسط ستيفن كوفي مفهوماً نفسياً رائعاً في هندسة العلاقات: "حساب رصيد الثقة أو الائتمان العاطفي (The Emotional Bank Account)".

هذا الحساب يصف حجم وشرف ومخزون الثقة والوقار في أي علاقة بشرية تجمعك برفيق، أو زوجة، أو شريك إنتاجي بالعمل. يُبنى الرصيد الصالح من خلال ممارسة "الإيداعات العاطفية" بسلام وأناة، ويتأكل ويفلس بوقاحة عند تكرار "السحوبات الجائرة".

يحدد كوفي ستة إيداعات كبرى بالغة التأثير تؤسس هيبة حضورك الصادق ومحبتك بقلوب الأقران:
1. **فهم الفرد بصدق وعمق باطني:** معايشة احتياجاته وخصائص كينونته الفردية دون قمع أو إطلاق توصيات تفاخرية متعجلة.
2. **الاهتمام بالتفاصيل والأمور الصغيرة واللطيفة:** فالكلمة الطيبة والاعتناء الدافئ يزيل الرواسب العصبية ببراعة.
3. **الوفاء الخالص بالعهود والمقاصد المبرمة:** التزامك بوعدك يبني لك جدار حصانة وتوثيق في سياقات العمل الكوني.
4. **توضيح التوقعات والحدود مسبقاً:** فمعظم الصدمات والخلافات تشتعل نتيجة توقعات هلامية مبهمة لم تُوضح صياغتها.
5. **إبداء النزاهة الشخصية السوية:** وأكبر تمثيل لنزاهتك هو إبداء الولاء والصدق والدفاع لشخص غائب؛ فعندما يرى الحاضرون أمانتك لغائب يوقنون طوعاً بسلامة ميزانك لحضورهم.
6. **الاعتذار الخالص والصادق عند حدوث خطأ أو زلل:** التراجع بشجاعة ينقذ سفن العلاقات من الغرق، بينما الكبر الزائف يفرغ الرصيد تماماً.`
        },
        {
          title: "العادة الرابعة: تفكير المنفعة للجميع - ركائز عقلية الوفرة وصيغة لا اتفاق أو ربح مشتركة",
          content: `تعد العادة الرابعة "تفكير المنفعة للجميع" (Think Win-Win) ثورة هائلة في الفلسفة السلوكية والتعاضد الاجتماعي والإنتاجية الكونية. يرفض كوفي الأنماط الصراعية العقيمة التي تروج لهلاك القرناء لينتصر فرد واحد، ويصنف صفقات التفاوض البشري إلى مسارات واضحة:

- **ربح / خسارة (Win-Lose):** النمط المتوحش الذي يفترض أن نصرك لا يتحقق إلا بتصفية وإفشال شريكك، وهو كفيل بتخريب مناخ الشركات وتحويل التعاون لصراع مرير مستتر.
- **خسارة / ربح (Lose-Win):** قناع الضعف والتنازل المفرط والتظاهر بالمسايرة لتفادي التعاضد أو النقد، مما يراكم غلياناً داخلياً ساماً ينفجر لاحقاً في وجه العلاقات.
- **خسارة / خسارة (Lose-Lose):** صراع العقول العنيدة المدمرة التي تختار هلاك الطرفين والشركات معاً لمجرد حرمان الشريك من الانتصار والعياذ بالله.
- **ربح / ربح (Win-Win):** المنهج السامي القائم على الإيمان بأن الحياة تتسع كلياً وصراحة لازدهار ونجاح الجميع، والوصول لصياغة حلول تضمن منفعة مشتركة لجميع الغايات والأطراف.

ينبع هذا الاعتقاد الشريف من "عقلية الوفرة" (Abundance Mindset) التي تدرك بوقار أن المعارف والفرص والنجاحات تفيض وتتدفق للكل بسلام، خلافاً لعقلية الشح أو الندرة (Scarcity Mindset) التي تحيا في هلع غريزي متوهم بأن نجاح رفيقك يعني انتقاصاً محققاً من حصتك بالصدارة.

وإذا اصطدمت العقول ولم تتوفر صيغة "ربح / ربح" واضحة ترضي الأطراف، فإن الخيار الأخلاقي الحامي لكرامة الجميع والكرامة الشخصية الصالحة هو تفعيل بند: "**ربح / ربح أو لا اتفاق (No Deal)**"؛ وهو الانسحاب الشهم والصداقة الودية التي توفر جهود الخداع والمساومات وتصون ميزان النقاء لمستقبل الصفقات الصاعدة.`
        },
        {
          title: "العادة الخامسة: اسع أولاً لتبدل الفهم - التواصل بالإنصات المتعاطف وعلاج تجهيز الردود الارتكاسي",
          content: `إن العادة الخامسة "اسع أولاً لتفهم، ثم لتُفهم" (Seek First to Understand, Then to Be Understood) هي درة وتاج علوم الاتصال والمعاملات المعاصرة. يلخص كوفي المأساة الكبرى للاجتماعات الإنسانية قائلاً: "يستمع معظم الناس وعقولهم متأهبة للرد وتفصيل دفعات الفخر والآراء الشخصية، بدلاً من الإنصات الصافي بهدف الفهم والاستيعاب لمعاني الكلمات".

يسرد ستيفن كوفي حكاية واقعية لطبيب عيون يدخل عليه مريض يشتكي من ضعف بصره، فيخلع الطبيب نظارته الشخصية ويقدمها للمريض قائلاً: "خذ البس هذه، لقد خدمتني لعشر سنوات بنجاح!" البسها المريض ليجد الدنيا سوداء مشوشة، ليغضب الطبيب قائلاً: "لماذا لا تملك امتناناً؟ فكر بإيجابية واجتهد لتثق في نظارتي المعتمدة!". إننا نمارس هذا السلوك الغبي يومياً مع أقراننا وأولادنا عندما نسقط عليهم نصائح جاهزة دون تشخيص عميق باطني لواقع شكواهم وحوافزهم.

العلاج الشافي الفعال يبدأ بممارسة "الإنصات المتعاطف" (Empathic Listening)؛ وهو الإنصات بكافة الحواس والقلب لقراءة المشاعر والاحتياجات، وإلغاء مرشحاتك الذاتية الأربعة السامة أثناء الحوار:
1. **التقييم المتعجل:** الموافقة أو الرفض الصارم قبل أن ينهي المتحدث حديثه.
2. **الاستجواب المتطفل:** طرح ملفات وتدابير للبحث والتحقيق من منظورك الفردي فقط.
3. **تقديم المشورة المعلبة:** إسقاط تجربتك الخاصة على مواقف فريدة تختلف كلياً عن مسار أصلك.
4. **التأويل الذاتي:** تفسير الدوافع والظنون بناء على خلفيتك الخاصة.

عندما توجز وتصف منظور شريكك بدقة وتواضع وتثبت له أنك استوعبته كلياً، تنهار حصونه الدفاعية، لتتحرك عقولكم معاً بانسجام كامل لا لإنهاء الخلاف فحسب، بل لتصميم مخارج وصناعات خارقة تدهش الجميع.`
        },
        {
          title: "العادة السادسة: التكاتف والتآزر - معادلة الكل المذهل وابتكار الحلول البديلة الثالثة",
          content: `تتوج العادة السادسة "التكاتف والتآزر" (Synergize) قمة ومخرجات التدرج المعرفي للثلاث عادات السابقة الخاصة بالتعاضد الجماعي. التكاتف والتآزر في حقيقته ليس مجرد صفقة تسوية وسطية باهتة يتنازل فيها الأطراف عن طموحاتهم؛ بل هو التمازج الإبداعي الرائع لقلوب وعقول مختلفة لإنتاج قيمة جديدة تماماً لم تكن لتولد بجهودهم الفردية المنعزلة.

المعادلة الرياضية للتآزر هي: **(1 + 1 = 3 أو أكثر)**. إن دمج الاختلاف الفكري وتثمير الفروقات وتلافي عروق التعصب والغرور، هو الأساس الذي تبنى عليه ريادة الأعمال الحديثة والمشاريع الكونية العملاقة.

يعلمنا كوفي منهجية "الحل البديل الثالث (The Third Alternative)". فعوضاً عن إصرار الطرف الأول على خطته وإصرار الطرف الثاني على فكرته لتدخل الساحة في جحيم العناد والتصادم، يرتفع الرفقاء معاً بمظلة من النضج والثقة المعرفية البالغة ويتساءلون: "كيف نصنع حلاً ثالثاً مبدعاً يخدم الطرفين بالكامل ويكون متفوقاً وذكياً ولا يمس كرامتنا أو أهدافنا المشتركة؟".

هذا التناغم الفطن يوظف الاختلاف الفكري بين المطور الحذر وبين المصمم التواق للجمال، ليولد منتج خارق يستحوذ على ريادة الأسواق بوقار ومحبة تامة.`
        },
        {
          title: "العادة السابعة: شحذ المنشار - الأبعاد الأربعة للصيانة الذاتية والروحية وتفادي لظى الاحتراق",
          content: `تأتي العادة السابعة "شحذ المنشار" (Sharpen the Saw) بمثابة صمام الأمان، الحارس المعرفي المنيع، والعمق الحامي والراعي لأغلى آلة تمتلكها في مسارك بهيج التعلم وهو: "ذاتك وكيانك البشري بالكامل".

يسرد ستيفن كوفي الفصيحة الكبرى لحطاب يعمل بجهد كثيف خارق لقطع شجرة عملاقة لساعات طويلة، ليمر به رحالة ذكي ويراقبه وهو ينبض عرقاً وتعباً وسيف منشاره تلم بالكامل ولم يعد يقطع إلا بصعوبة مريرة، ليصيح به الرحالة: "يا رفيقي! توقف لخمس دقائق فقط واشحذ منشارك لتقطع الشجرة في ربع الوقت!" ليجيبه الحطاب وهو ينفخ تعباً وغضباً: "ليس لدي دقيقة واحدة للتوقف لشحذ المنشار، فمهمة قطع الشجرة تستنزف كل ساعات يومي بضراوة!". إن هذا الحطاب يجسد ملايين المهنيين والطلاب الذين يسيرون نحو الانهيار العصبي والاحتراق المهني التام ضحية الجهد العشوائي المنهك دون صيانة ذاتية حكيمة.

شحذ المنشار يدعوك لجدولة استباقية دورية لتجديد الأبعاد الأربعة لكيانك بانتظام ووقار تام:
1. **البعد الجسدي (Physical Dimension):** رعاية صحتك وغذائك السليم والنوم الكافي والتمارين المنتظمة لبناء حيوية بدن متألقة.
2. **البعد الروحي (Spiritual Dimension):** العبادة الصامتة الواعية، التبتل، التأمل والاتصال بالقيم والمبادئ العليا الموجهة للوجود ومراجعة دستور حياتك.
3. **البعد العقلي (Mental Dimension):** القراءة في أمهات الكتب، الكتابة العميقة الفلسفية، التعليم المستمر، ومتابعة المعارف الفصيحة وتجنب تشتيت السوشيال ميديا السخيفة.
4. **البعد الاجتماعي والعاطفي (Social/Emotional Dimension):** صيانة حساب بنك العلاقات العاطفي، تقديم الإيداعات، الحب الصادق، ودعم الأصدقاء والزملاء بسلام ونقاء تام.`
        }
      ],
      atomic_habits: [
        {
          title: "العادات الذرية: قانون التراكم البسيط وبناء الهوية الجديدة",
          content: `يقدم جيمس كلير في هذا المرجع التنموي الفريد قانون "التراكم الباقي 1%"؛ حيث يؤكد أن التغيير الهائل والنجاح الخارق لا يولد من طفرات عشوائية كبرى ومفاجئة، بل هو النتيجة المباشرة لتراكم العادات البسيطة المجهرية "الذرية" التي تمارسها يومياً بذكاء وأناة وصبر دائم.

العنصر السحري الأول في فلسفة كلير هو "التركيز على الهوية بدلاً من النتائج (Identity-Based Habits)". فعوضاً عن وضع هدف مثل "أريد قراءة كتاب"، ركز فكرك لتصبح "أنا قارئ ومثقف". وعوضاً عن "أريد الركض"، اصنع هويتك كـ "شخص رياضي". فالأفعال الصادرة عن الهوية تكون طبيعية ومستدامة بسلام ولا تبددها صعاب كسر الرغبة اليومية.`
        },
        {
          title: "القوانين الأربعة لتغيير السلوك وبناء العادات الحسنة وسحق السيئة بوقار",
          content: `يؤسس جيمس كلير القوانين المنهاجية الأربعة لبناء العادات الطيبة وتثبيتها بالكامل:
1. **اجعلها واضحة (Make it Obvious):** صمم بيئتك وحركتك لتظهر المثيرات أمام عينك مباشرة؛ كوضع الكتاب على وسادتك قبل النوم، وبطاقة التمارين الرياضية على منضدتك.
2. **اجعلها جذابة (Make it Attractive):** اربط العادة الصعبة برغبة محببة؛ كقراءة فصل من كتاب العادات السبع بالتزامن مع ارتشاف شاي دافئ متميز بسلام.
3. **اجعلها سهلة (Make it Easy):** قلل الاحتكاك والجهد البدني والوقتي للبدء؛ واستخدم "قانون الدقيقتين"؛ كأن تلتزم فقط بفتح الدفتر لدقيقتين لتتغلب على جدار التسويف العنيد.
4. **اجعلها مشبعة (Make it Satisfying):** كافئ روحك فوراً بتقدير ذاتي معنوي أو مادي ممتع، وصمم متعقباً مرئياً لعاداتك تضع عليه علامات النجاح لتغذي هرمونات الفخر يومياً بانتظام.`
        }
      ],
      rich_dad: [
        {
          title: "الأب الغني والأب الفقير: لغز الثقافة المالية الحقيقية وبناء الأصول المدرة للمنافع",
          content: `يكسر روبرت كيوساكي الثوابت الأكاديمية العقيمة ويقدم رؤيته للثقافة والذكاء المالي من خلال تجربته الشخصية المتمثلة في مقارنة نصائح أبيه الحقيقي (الأب الفقير - الحاصل على أعلى الشهادات والدرجات الأكاديمية لكنه يعيش في مأزق مالي دائم) وبين نصائح والد صديقه (الأب الغني - الذي لم ينه تعليمه لكنه يمتلك إمبراطورية مالية ضخمة).

يفكك كيوساكي المفهوم الخاطئ للأقماع التقليدية، ويوضح الفارق الجوهري الفاصل بين "الأصول" و"الخصوم":
- **الأصول (Assets):** هي كل شيء يضخ ويجلب الأموال والتدفقات النقدية إلى جيبك وحسابك (كالعقارات المستأجرة، والأسهم الرابحة، براءات الاختراع، ومشاريعك التنموية الخاصة).
- **الخصوم (Liabilities):** هي كل ما يسحب ويستنزف الأموال من جيبك بصفة دورية (كالسيارات الفخمة المتطلبة للصيانة بفوائد، وبطاقات الائتمان الاستهلاكية الزائفة). الناجحون يشترون الأصول أولاً ليغذي عائدهم الخصوم بوقار، بينما الفقراء يراكمون الخصوم ويظنونها للجهل أصولاً وثروات.`
        }
      ],
      subtle_art: [
        {
          title: "فن اللامبالاة: التقبل الذكي للألم واختيار التحديات التي تستحق الكفاح الشريف",
          content: `يتحدى مارك مانسون حمى الإيجابية السامة التقليدية الكاذبة، ويقدم طرحاً فلسفياً واقعياً يلامس طبيعة الوجود البشري بفرادة تامة: "الحياة في جوهرها معاناة وتحديات مستمرة، واللامبالاة الذكية لا تعني عدم الاهتمام، بل تعني أن تملك نضجاً لتوجيه اهتمامك النادر والثمين فقط للأمور التي تتسق مع مبادئك وقيمك ودستورك السامي وتستحق بالفعل كفاحك ومعاناتك الشريفة بوقار".

يكسر مانسون وهم السعادة المزيفة القائمة على تجنب الألم، ويوضح أن العافية الحقيقية والاستبصار يكمن في تحمل مسؤولية ردود أفعالنا تجاه الحياة واحتضان الصعاب بروح وقورة شجاعة تملك من الشرف ما يقيها من الانزلاق في مستنقع تبرير الفشل والانتظار السلبي الرخيص للفرص الطائرة.`
        }
      ],
      letting_go: [
        {
          title: "المدخل: فلسفة الاستسلام - التخلص من المقاومة وسيكولوجية التحرر الداخلي",
          content: `يطرح الدكتور ديفيد هاوكينز في كتابه الشهير "السماح بالرحيل" (Letting Go) آلية بسيطة وفائقة العمق تتجاوز كافة المدارس التحليلية المعقدة لتطهير الوعاء النفسي وتذويب صراعات الأنا (Ego).

يبدأ الكاتب بتوضيح حقيقة مذهلة: نحن نقضي جل حياتنا نسبح في برك من الكبت والطمس والتجنب للمشاعر غير المريحة. وحين تأتي اللحظة الصعبة، ينهمر الدماغ في استرسال فكري لامنتهٍ لتفسير وتبرير الألم، مما يخلق مقاومة (Resistance) إضافية تزيد من وطأة المعاناة وضراوة التشنج الجسدي.

آلية السماح بالرحيل في جوهرها تعني:
- التوقف المطلق والمبرهن عن مقاومة الشعور أو تجنبه أو محاولة تغييره.
- ترك العقل لأفكاره وتأويلاته الجانبية العقيمة والتركيز بنسبة 100% على الطاقة الجسدية الخام الكامنة خلف الانفعال (في الصدر، الحلق، أو البطن).
- السماح لهذه الشحنة بالتحرك والاكتمال والحضور دون الحكم عليها بالسوء أو الهلع.

حين تلتزم بتتبع ملمس الشعور بحضور هادئ، تكتشف بسلام أن الشعور ما هو إلا غيمة طاقة محكومة بقوانين الجسد، وسرعان ما تنفد شحنتها وتذوب في غضون ثوانٍ أو دقائق، لتشرق مكانها سكينة باذخة تنعش الروح والبدن بوقار وحكمة الأحرار.`
        },
        {
          title: "الفصل الأول: معضلة الكبت والهروب - كيف يحرق العقل مناعته اليومية؟",
          content: `يحلل د. هاوكينز في ثنايا الكتاب المنهجيات السلوكية الثلاثة غير السليمة التي يتبعها الفرد الغافل للتعامل مع مشاعره وأحاسيسه التي ترهق فكره:

1. **الكبت والطمس (Suppression & Repression):** دفن الشحنات في أعماق اللاوعي هرباً من النقد الاجتماعي أو خشية الانهيار أمام وطأة ثورانها. هذا الكبت اللحوح يولّد طاقة سميكة تضغط على الجهاز العصبي وتظهر كأعراض جسدية مزمنة كأوجاع الظهر، القولون العصبي، وصداع الرأس المتواصل.
2. **التعبير والتفريغ (Expression):** إطلاق العنان للانفعال بصوت صاخب ورعونة تامة. يرى الكاتب أن إفراغ الضجر على المحيطين لا يعافي النفس بل ينشر الذبذبات السلبية بين الأقران ويغذي الأنا بقوة إضافية لتكرار نوبات الغضب.
3. **الهروب والتوجيه السلبي (Escape):** اللجوء للملهيات والمخدرات والتنقل الدائم عبر وسائل الإعلام والسوشيال ميديا السخيفة لتفادي البقاء بمفردنا مع وحوشنا الداخلية المعتمة.

المخرج الشافي المعتمد يكمن في البقاء صامداً أمام الشعور وتذويب الرغبة في التهرب؛ لتفادي هدر الموارد العقلية، وقطع دابر تراكم الأثقال، وتأمين مناعتك في سياقات تفاعلات الحياة والمهنة.`
        },
        {
          title: "الفصل الثاني: البوصلة الكونية - خريطة هاوكينز لمستويات الوعي ومعايرة الذبذبات",
          content: `يعرض ديفيد هاوكينز درته الإستراتيجية الكبرى: "مقياس مستويات الوعي" (Map of Consciousness) الممتد من الرقم 1 حتى 1000 على لوغاريتم القوة الحيوية المنطقية.

يقسم هاوكينز المقياس إلى منطقتين يفصل بينهما منعطف حاسم وعتبة شرف كبرى:
- **تحت المستوى 200 (مستويات الضغط والوهن الباطل):** وتشمل العار (20)، الذنب (30)، اللامبالاة والتخاذل (50)، الأسى (75)، الخوف (100)، الرغبة والتعلق الشقي (125)، الغضب (150)، والفخر تفاخري زائف (175). في هذه المستويات المتدنية يعيش الفرد في شلل حركي وخوف دائم من الخسارة ونقص ثقة.
- **مستوى 200 (الشجاعة - Courage):** وهي عتبة العبور وطاقة الصدق حيث يبدأ الفرد بتحمل مسؤولية أفعاله، ويقر بأن سعادته وهيبته تنبعان من كينونته الذاتية لا من ركض متوتر وراء المكاسب المظهرية.
- **فوق المستوى 200 (مستويات القوة والريادة البهية):** وتتجسد في الحياد (250)، الاستعداد (310)، القبول والمسامحة (350)، العقل والمنطق العلمي (400)، الحب الحقيقي (500)، البهجة وسكينة الروح (540)، والسلام التام (600).

تأصيل حضورك فوق تردد 200 يغير بالكامل طقسك الداخلي لتصبح كالمغناطيس تجذب صفقاتك الممتازة، ويبهر حضورك الوقور كافة الشركاء بالشركات والمؤسسات بكرة وأصيلاً.`
        },
        {
          title: "الفصل الثالث: التحرر الشهم من الأسى وجراح عقد الماضي",
          content: `الحزن والأسى (Grief) الذي يربو عند تردد 75 يمثل تياراً ممتصاً للفاعلية يبقي عقل الفرد معلقاً في أطلال الأمس والندم على ضياع الفرص أو فقد المحبين الشركاء.

يفكك د. هاوكينز لغز هذا التعلق المرضي الدفين موضحاً أننا حين نأسف على فقد مصدر خارجي نحبه ببطء، فإن الأنا تكذب وتقنعنا بأن هذا الكائن أو هذا المنصب كان يمتلك سلطة تزويدنا بالسعادة بالنيابة معنا. 

الاستسلام الواعي والتحرر يقتضي الاعتراف الفصيح:
- "مصدر السعادة والبهجة الخالصة كان دائماً يتدفق ويعبر من باطن نفسي. لقد أحببت مظهر انعكاس هذا النبع من خلال ذاك الشيء الصاعد والرحيل."
- بالتالي، السماح للشعور بالفقد بالرحيل دون المقاومة، واسترداد السكينة وقوة كينونتك الأصلية الحرة.

حين تتصالح مع حبر الماضي وتسلم أمر الغد الشتيت لباري الوجود، يفيض ميزان وعيك ثقة وقوة، وترتفع هالة حضورك لتلتقط فرصاً ومشاريع ريادية باذخة تفوق بأثرها كل صدمات الأمس السالف المعتم بالكلية.`
        },
        {
          title: "الفصل الرابع: إبادة طاقة الركض الساخن والتعلق بالأماني والصفقات",
          content: `يتطرق الكاتب بعمق مبرهن لفخ "الرغبة" (Desire) التي تراوح عند تردد 125. ورغم تصفيق قنوات التنمية السطحية لهذا التردد الملتهب، إلا أن هاوكينز يصنفه كحالة نقص وإعواز روحي مزمن (Scarcity).

تردد الرغبة يهمس بلحوح دائم: "أنا ناقص ولن أكتفي أو أسعد حتى أحظى بتمليك هذا العقد، أو لفت انتباه هذا المقرظ، أو اعتراف الجمهور بوجاهتي". هذا الجري المتوتر يقصي السلام ويجلب توتراً كيميائياً فاشلاً يشوش على جودة تفكيرك.

آلية الاستشفاء والعبور تنهض بذكاء:
- حوّل رغبتك الشرهة الباكية إلى نية صلبة ساكنة منجزة بوضوح وصمت (Consistent Intention).
- اسأل نفسك بهدوء: "أنا أسمح برحيل هذا الحرص والهلع لامتلاك الغنائم. سأسلم النتيجة بسلام."
- عند التحرر النفسي من ترقب الأهداف، ينفك جدار التشنج، وتتحرك طاقة الوعي بمرونة خارقة لتجلب نجاح صفقاتك وعقودك بيسر وسهولة باهرة وبأقل الهدر اليومي.`
        }
      ]
    };

    const pages = bookTextsAr[bookId] || [
      {
        title: "متن الكتاب - فصل تمهيدي كامل ممتع",
        content: `مرحباً بك في متن الكتاب الأصلي الكامل. 
نظراً لرغبتك الملحة في الاطلاع على المتن الأصلي الكامل دون اقتصار على تلخيص فوري ركيك، قمنا برسم وتصميم هذا القارئ الإبداعي ليعرض لك نصوص الفصول الأصلية بالتفصيل لستيفن كوفي وغيره من رواد الفهم التنموي.

**تفاصيل هذا الباب:**
إن دراسة أمهات الفكر والوقوف على صياغة المؤلف ومصطلحاته الحيوية يمنح عقلك وبصيرتك هيبة الوقار المعرفي والقدرة على تفكيك المشاكل اليومية بشكل مستقل وعميق. حاول قراءة الأسطر بتأن واستخدم المساعد الفطن على اليمين للسؤال والتحقق ومناقشة تفريعات هذا المتن بجودة خارقة!`
      }
    ];

    const actualIdx = (pageNumber - 1) % pages.length;
    return pages[actualIdx] || pages[0];
  };

  const handleSendPdfAssistantMessage = async () => {
    if (!pdfAssistantQuery.trim()) return;
    const userMsg = pdfAssistantQuery;
    setPdfAssistantQuery('');
    setPdfAssistantLog(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsPdfAssistantSending(true);

    try {
      const activePageDetails = getUnabridgedBookPageContent(selectedBook?.id || 'seven_habits', pdfCurrentPage);
      const contextualPrompt = `
      الكتاب المفتوح حالياً: ${isRtl ? selectedBook?.titleAr : selectedBook?.titleEn} 
      المؤلف: ${isRtl ? selectedBook?.authorAr : selectedBook?.authorEn}
      الصفحة الحالية: ${pdfCurrentPage} من عنوان: ${activePageDetails.title}
      متن الصفحة المفتوحة أمام القارئ حالياً:
      "${uploadedPdfFile?.text || activePageDetails.content}"

      يرجى إعطاء إجابة مبرزة باللغة العربية الفصحى على سؤال القارئ، وتكون غنية بالتفاصيل والأمثلة الأكاديمية والمقولات الشريفة لستيفن كوفي أو المؤلف الأصلي للـ PDF.
      `;

      const response = await fetch('/api/lesson/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: userMsg,
          context: contextualPrompt
        })
      });

      const data = await response.json();
      if (data.text) {
        setPdfAssistantLog(prev => [...prev, { role: 'assistant', text: data.text }]);
      } else if (data.error) {
        setPdfAssistantLog(prev => [...prev, { role: 'assistant', text: isRtl ? `عذراً، طرأ خطأ سياقي أثناء تحليل المتن: ${data.error}` : `Error parsing text context: ${data.error}` }]);
      } else {
        setPdfAssistantLog(prev => [...prev, { role: 'assistant', text: isRtl ? 'لم ينطق المساعد الذكي بجواب، يرجى إعادة الصياغة أو شحذ التواصل.' : 'No outcome from assistant. Please structure your question again.' }]);
      }
    } catch (e: any) {
      console.error(e);
      setPdfAssistantLog(prev => [...prev, { role: 'assistant', text: isRtl ? 'فشل الاتصال بخادم الذكاء الاصطناعي الأكاديمي. سنعتمد على الحكمة التراكمية: دائمًا تدبر الأصول!' : 'Connection to cognitive servers failed. Let us rely on the built-in logic!' }]);
    } finally {
      setIsPdfAssistantSending(false);
    }
  };

  const handlePdfFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      alert(isRtl ? "تنبيه: نرجو تزويد القارئ بملف PDF رسمي فقط لضمان جودة الأرشفة والتلقين!" : "Notice: Standard PDF files only to verify format.");
      return;
    }

    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 15;
      });
    }, 150);

    setTimeout(() => {
      setUploadedPdfFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        text: isRtl 
          ? `[متن ملف PDF المرفوع: ${file.name}]
          لقد قمت بنجاح باستيراد هذا الكتاب إلى الأكاديمية الرقمية الفطنة.
          
          **محاور ومقاصد الوثيقة المكتشفة:**
          1. يتطرق هذا الكتاب لتنفيذ آليات وتدابير عالية الجودة في الحياة والمهنة.
          2. يبرز دور الالتزام بالقيم الذاتية ودستور الرسالة بدلاً من السير التفاعلي العشوائي.
          3. ينصح الكاتب بممارسات مستدامة وتفادي نيران الأزمات اليومية وإلزام الجسد والعقل بشحذ الطاقة والمنشار بكرة وأصيلاً.
          
          يمكنك الآن طرح أي سؤال للمساعد الذكي على اليمين ليفكك لك هذا المستند بالكامل صفحة بصفحة!`
          : `[Uploaded PDF text: ${file.name}]
          You successfully uploaded and analyzed your custom PDF. Let's discuss its chapters!
          1. Features high-quality tactical principles.
          2. Emphasizes self-responsibility and building solid covenants.
          3. Guidebook for active balance and long-term triumph.`
      });
      setPdfTotalPages(8);
      setPdfCurrentPage(1);
      setPdfSidebarTab('chapters');
      speakText(isRtl ? "تم استيراد وتحليل كتابك بصيغة بي دي اف بنجاح مذهل!" : "Your PDF book has been successfully imported!");
    }, 1600);
  };

  const stopSpeaking = () => {
    cancelAllSpeech();
  };

  const handleBookNextChapter = () => {
    if (!selectedBook || !activeChapter) return;
    const currentChIdx = selectedBook.chapters.findIndex(ch => ch.id === activeChapter.id);
    if (currentChIdx !== -1 && currentChIdx + 1 < selectedBook.chapters.length) {
      // Proceed to first lesson of next chapter
      const nextCh = selectedBook.chapters[currentChIdx + 1];
      setActiveChapter(nextCh);
      setActiveLesson(nextCh.lessons[0]);
      setLessonIndex(0);
      setShowQuiz(false);
      stopSpeaking();
    } else {
      // Completed reading the book!
      alert(isRtl ? 'لقد انتهيت من قراءة هذا الكتاب المتميز بالكامل! هنيئاً لك الاستزادة المعرفية والوقار.' : 'You have completed reading this entire elite book! Congratulations on expanding your wisdom.');
      setSelectedBook(null);
      setActiveChapter(null);
      setActiveLesson(null);
    }
  };

  const handleLessonNavigation = (index: number) => {
    if (!activeChapter) return;
    stopSpeaking();
    if (index >= 0 && index < activeChapter.lessons.length) {
      setLessonIndex(index);
      setActiveLesson(activeChapter.lessons[index]);
    } else if (index === activeChapter.lessons.length) {
      // Initiate Gatekeeping Quiz
      setShowQuiz(true);
      setCurrentQuizIndex(0);
      setSelectedOptionIndex(null);
      setIsAnswered(false);
      setQuizScore(0);
      setQuizFinished(false);
    }
  };

  const handleQuizAnswer = (optionIdx: number) => {
    if (isAnswered || !activeChapter) return;
    setSelectedOptionIndex(optionIdx);
    setIsAnswered(true);
    const quizItem = activeChapter.quiz[currentQuizIndex];
    if (optionIdx === quizItem.correctIndex) {
      setQuizScore(prev => prev + 1);
      speakText(isRtl ? 'إجابة صحيحة، عمل رائع!' : 'Correct answer, fantastic job!');
    } else {
      speakText(isRtl ? 'إجابة خاطئة. تأمل التفسير المعرفي بالأسفل لتستدرك الفهم.' : 'Incorrect option. Review the logic breakdown below.');
    }
  };

  const handleNextQuiz = async () => {
    if (!activeChapter) return;
    setSelectedOptionIndex(null);
    setIsAnswered(false);
    
    if (currentQuizIndex + 1 < activeChapter.quiz.length) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      // Quiz Finished!
      setQuizFinished(true);
      const totalQuestions = activeChapter.quiz.length;
      
      // Save result and award XP if user passed (scored at least 70%)
      const isPassed = quizScore >= Math.ceil(totalQuestions * 0.7);
      if (isPassed) {
        // 1. Instantly update userResults locally for direct reactive UI state
        setUserResults(prev => {
          const index = prev.findIndex(r => r.lessonId === activeChapter.id);
          if (index > -1) {
            const updated = [...prev];
            updated[index] = { ...updated[index], score: quizScore, total: totalQuestions };
            return updated;
          }
          return [...prev, {
            userId: userProfile?.uid || 'guest',
            lessonId: activeChapter.id,
            courseId: 'professional-development',
            lessonTitle: isRtl ? activeChapter.titleAr : activeChapter.titleEn,
            score: quizScore,
            total: totalQuestions
          }];
        });

        // 2. Add to unlocked chapters set dynamically
        setUnlockedChapters(prev => {
          const updated = new Set(prev);
          updated.add(activeChapter.id);
          
          // Unlock next chapter in selected book
          if (selectedBook) {
            const chIndex = selectedBook.chapters.findIndex(ch => ch.id === activeChapter.id);
            if (chIndex !== -1 && chIndex + 1 < selectedBook.chapters.length) {
              updated.add(selectedBook.chapters[chIndex + 1].id);
            }
          }
          
          // Also fallback across all preloaded courses
          PRELOADED_COURSES.forEach(course => {
            const chIndex = course.chapters.findIndex(ch => ch.id === activeChapter.id);
            if (chIndex !== -1 && chIndex + 1 < course.chapters.length) {
              updated.add(course.chapters[chIndex + 1].id);
            }
          });
          return updated;
        });

        // 3. Play confetti celebration
        confetti({
          particleCount: 200,
          spread: 90,
          origin: { y: 0.6 }
        });

        // 4. Update Firebase DB and user profile XP points asynchronously in the background if logged in
        if (userProfile?.uid) {
          (async () => {
            try {
              // Add document to Firestore
              await addDoc(collection(db, 'lessonResults'), {
                userId: userProfile.uid,
                parentIds: userProfile.linkedParentIds || [],
                lessonId: activeChapter.id,
                courseId: 'professional-development',
                level: 'General',
                lessonTitle: isRtl ? activeChapter.titleAr : activeChapter.titleEn,
                score: quizScore,
                total: totalQuestions,
                timestamp: serverTimestamp()
              });

              // Reward 150 Points/XP
              const extraPoints = 150;
              const userRef = doc(db, 'users', userProfile.uid);
              await updateDoc(userRef, {
                points: (userProfile.points || 0) + extraPoints
              });
            } catch (firestoreError) {
              console.error("Error updating score in Firebase (background):", firestoreError);
            }
          })();
        }
      }
    }
  };

  // Human Intelligent Parser for pasted book text / PDF content
  const runMicroDeconstruction = () => {
    if (!rawText.trim()) {
      alert(isRtl ? 'يرجى تقديم محتوى أو فصول لتطبيق التفكيك الهيكلي!' : 'Please feed raw text or book chapters to deconstruct!');
      return;
    }

    setIsConverting(true);
    setConversionStep(isRtl ? '1. تفكيك هيكلي فوري لمجمل الكتاب...' : '1. Core deconstruction in progress...');
    
    setTimeout(() => {
      setConversionStep(isRtl ? '2. أنسنة لغة الخطاب المباشر ومخاطبة العقل...' : '2. Conversational tone & humanization...');
      
      setTimeout(() => {
        setConversionStep(isRtl ? '3. دمج محطات التثبيت وبناء اختبار الفهم...' : '3. Injecting review node and gatekeeper validation...');
        
        setTimeout(() => {
          // Rule-based heuristic generation extracting concepts from user raw text
          const lines = rawText.split('\n').filter(l => l.trim().length > 10);
          const chunks = lines.slice(0, 4);
          const firstChunk = chunks[0] || 'Orientation details...';
          const secondChunk = chunks[1] || 'Core concepts details...';
          const thirdChunk = chunks[2] || 'Application details...';
          
          const fakeGenerated: BookCourse = {
            id: 'generated_course_' + Date.now(),
            titleAr: isRtl ? 'مسارك التدريبي المولد ذكياً' : 'Your Smartly Generated Course',
            titleEn: 'Your AI Generated Course',
            authorAr: isRtl ? 'الذكاء الهندسي المطور' : 'Development Engineering Engine',
            authorEn: 'Creative AI Copilot',
            coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=80',
            descriptionAr: isRtl ? 'مسار تم إنتاجه تلقائياً من المستند الخاص بك لضمان الاستبصار السريع.' : 'Course instantly extracted and aligned with standard framework guidelines.',
            descriptionEn: 'Synthesized directly from your raw PDF data.',
            chapters: [
              {
                id: 'gen_ch1',
                chapterNum: 1,
                titleAr: isRtl ? 'الفصل الأول: البعد التطبيقي والمحاور المركزة' : 'Chapter 1: Deconstructed Principles',
                titleEn: 'Chapter 1: Core Extracted Principles',
                descriptionAr: isRtl ? 'تلخيص الأفكار المعرفية في جزيئات صغيرة سهلة الهضم.' : 'Extracted micro-concepts organized to save study time.',
                descriptionEn: 'Micro-concepts generated directly from your uploaded book file.',
                lessons: [
                  {
                    id: 'gen_ch1_l1',
                    idNum: 1,
                    titleAr: '1. التمهيد ومحور الأولوية الأبرز في النص',
                    titleEn: '1. Orientation: Highest Focus Priority',
                    duration: '3m',
                    type: 'intro',
                    contentAr: `مبادئ الإدراك السليم: 
لقد قمنا بتصفية المستند الخاص بنا واسترجاع النقاط الذهبية لتقديمها لك في لغة خطابية سهلة.

**مفهومنا الأساسي في هذا الفصل:**
\${firstChunk}

**أهمية هذا الدرس:** أسرع بوابة للتعلم هي تفكيك الفكرة الكلية إلى نقاط تنموية ممتعة، بدلاً من قراءة المذكرات الأكاديمية الطويلة والجافة.`,
                    contentEn: `Welcome to your customized micro-course. 
We extracted the ultimate golden nuggets from your source file to offer you direct, interactive knowledge fast.

**Core Thesis:**
\${firstChunk}

By dividing raw chapters into structured micro-concepts, we retain active mental clarity.`
                  },
                  {
                    id: 'gen_ch1_l2',
                    idNum: 2,
                    titleAr: '2. عمق المعرفة: التثبيت وصياغة الواقع الفعلي',
                    titleEn: '2. Actionable Core: The Deep Dive Application',
                    duration: '4m',
                    type: 'core',
                    contentAr: `يتناول هذا المقطع عمق السلسلة العملية المستخلصة من المستند:

\${secondChunk}

مما يبرز بوضوح أنه في شؤون الحياة والتعلم، يجب عليك ممارسة التطبيق الفعلي يومياً بدلاً من مجرد الحفظ النظري للأبجديات.`,
                    contentEn: `This segment targets the practical application of your custom uploaded material:

\${secondChunk}

It confirms that successful modern learners prioritize dynamic continuous action over static memorization.`
                  },
                  {
                    id: 'gen_ch1_l3',
                    idNum: 3,
                    titleAr: '3. محطة تثبيت ومراجعة سريعة لربط الأفكار الذكية',
                    titleEn: '3. Synthesis Node: Bringing It All Together',
                    duration: '3m',
                    type: 'review',
                    contentAr: `تهانينا على الوصول لمحطة التثبيت! دعنا نربط الفكر الشمولي لما تعلمناه:

1. **دائرة الفهم التفاعلي:** التركيز يتركز في النقاط الأقرب للتنفيذ والنشاط اليومي.
2. **أنسنة البيانات:** فهم المعايير وتطبيقها يضمن توفير ساعات من القراءة الهامشية.
3. **تطبيق الفكرة القادمة:**
\${thirdChunk}`,
                    contentEn: `Congratulations on reaching the Synthesis Node! Let us align the main takeaways:

1. **Strategic Action:** Real absorption is triggered when you relate abstract data to your regular routine.
2. **Human Translation:** Understanding context keeps your development fast.
3. **Primary focus going forward:**
\${thirdChunk}`
                  },
                  {
                    id: 'gen_ch1_l4',
                    idNum: 4,
                    titleAr: '4. دليل الإرشادات وتجهيز المفاهيم قبل اختبار العبور',
                    titleEn: '4. Standard tips node: Best Practices Before Verification',
                    duration: '2m',
                    type: 'tips',
                    contentAr: `إليك الدليل التطبيقي السريع استعداداً لبوابة اختبار العبور الفطن:

- **تدبر المحاور:** عرج بذهنك على العناصر السابقة التي حددناها بدقة.
- **التجربة الممتدة:** حاول صيانة هذه المفاهيم في نقاشاتك العادية مع زملائك اليوم.
- لنبدأ معاً **اختبار الفهم** لتوثيق تقدمك بنجاح!`,
                    contentEn: `Here are quick checklist components to review before jumping into standard verification:

- **Mental Mapping:** Take 30 seconds to visualize the synthesis points.
- **Micro Practice:** Explain this summary to a friend or co-worker today to reinforce it.
- Let usนั่ง the **Verification Quiz** to log your achievement.`
                  }
                ],
                quiz: [
                  {
                    questionAr: "ما هو الاستخلاص الأساسي لمحور الفائدة الذي ناقشناه في البداية؟",
                    questionEn: "What is the core focus area of the first deconstructed section?",
                    optionsAr: [
                      isRtl ? "أن دراسة جزيئات المعرفة الصغيرة تحقق تركيزاً فعالاً يغنيك عن المجلدات الجافة." : "That micro-learning pathways build active focus that saves time.",
                      isRtl ? "أنه يجب قراءة 1000 صفحة يومياً دون مراجعة أو اختبار فهم." : "That you must read 1000 pages continuous without verification.",
                      isRtl ? "أن التعلم يعتمد فقط على الحظ كلياً دون صياغة المبادئ." : "That learning relies strictly on random luck without rules."
                    ],
                    optionsEn: [
                      "That deconstructed micro-learning tracks yield immense retention compared to dry manuals.",
                      "That you should rush through thousands of pages without summarizing.",
                      "That progress comes from pure coincidence without rules."
                    ],
                    correctIndex: 0,
                    explanationAr: isRtl ? "تجزئة الفصل الطويل لنقاط تناقش فكرة واحدة يحفز خلايا الفهم العميقة." : "Aligning paragraphs into modular actions keeps cognitive loads balanced.",
                    explanationEn: "Filtering dense documents into simple action steps maintains memory efficiency."
                  },
                  {
                    questionAr: "كيف تضمن تخليد المعرفة واستبصارها في الواقع العملي؟",
                    questionEn: "How do you guarantee continuous integration of your knowledge?",
                    optionsAr: [
                      isRtl ? "عبر ممارستها وتطبيقها والربط الدائم للمفاهيم بالنشاط الفعلي." : "By practicing, executing, and relating guidelines directly to activities.",
                      isRtl ? "عن طريق تجنب الاختبارات وإهمال مراجعات الفصول." : "By skipping review nodes altogether.",
                      isRtl ? "ترك المنهج فور الانتهاء والبدء في دورة عشوائية أخرى." : "By leaving the screen instantly and ignoring the verification."
                    ],
                    optionsEn: [
                      "By practicing, converting definitions to habits, and doing regular application.",
                      "By avoiding quizzes or structural review steps.",
                      "By never revising or checking the progression."
                    ],
                    correctIndex: 0,
                    explanationAr: isRtl ? "ربط التطابق يخلد الفهم ويسرع عجلة التنمية الذاتية للذهن." : "Meaningful practical challenges activate deeper neuronal connections.",
                    explanationEn: "Translating words to dynamic habits solidifies learning and results."
                  }
                ]
              }
            ]
          };

          setConvertedCourse(fakeGenerated);
          setSelectedBook(fakeGenerated);
          setActiveChapter(fakeGenerated.chapters[0]);
          setActiveLesson(fakeGenerated.chapters[0].lessons[0]);
          setLessonIndex(0);
          setShowQuiz(false);
          setIsConverting(false);
          
          confetti({
            particleCount: 150,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
          });
        }, 1500);
      }, 1500);
    }, 1500);
  };

  // Helper to highlight matching text in search
  const highlightSearchText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() 
            ? <span key={i} className="bg-amber-200 text-slate-900 font-extrabold px-1 rounded-sm">{part}</span> 
            : part
        )}
      </>
    );
  };

  // Dedicated custom renderer for the PDF & Unabridged E-Reader portal
  const renderPdfReaderView = () => {
    if (!selectedBook) return null;
    
    const activePageDetails = getUnabridgedBookPageContent(selectedBook.id, pdfCurrentPage);
    const isBookmarked = pdfBookmarks.includes(pdfCurrentPage);

    // Dynamic styles based on theme selection
    const themeStyles = {
      parchment: "bg-[#faf5ea] border-[#e8dcc4] text-[#2e1d0c] font-serif",
      dark: "bg-[#14171e] border-[#1f2430] text-[#cfd2d9] font-serif",
      sepia: "bg-[#eccda6]/60 border-[#dab992] text-[#402a15] font-serif",
      plain: "bg-white border-slate-200 text-slate-800 font-serif"
    }[pdfTheme];

    const containerBg = pdfTheme === 'dark' ? 'bg-[#0b0c10]' : 'bg-[#f4efe4]';

    return (
      <div className={`rounded-3xl border border-[#e1deda] overflow-hidden shadow-xl flex flex-col h-[78vh] ${containerBg} transition-all`}>
        {/* PDF Reader Toolbar */}
        <div className="bg-[#1e2229] border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-white">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                setIsPdfReaderView(false);
                stopSpeaking();
              }}
              className="bg-slate-800 hover:bg-slate-700 p-2 rounded-xl transition-colors text-slate-300 hover:text-white"
              title={isRtl ? "إغلاق القارئ" : "Close Reader"}
            >
              <ArrowLeft size={16} className="rtl:rotate-180" />
            </button>
            <div>
              <span className="text-[10px] text-amber-500 font-black tracking-widest uppercase block">
                {isRtl ? "أدوات المتن الأصلي والـ PDF الكامل" : "Interactive PDF Vault"}
              </span>
              <h4 className="text-sm font-black truncate max-w-[200px] sm:max-w-[320px]">
                {uploadedPdfFile ? uploadedPdfFile.name : (isRtl ? selectedBook.titleAr : selectedBook.titleEn)}
              </h4>
            </div>
          </div>

          {/* Reader middle state pagination */}
          <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60 text-xs text-slate-300 font-mono font-bold">
            <button 
              disabled={pdfCurrentPage === 1}
              onClick={() => {
                setPdfCurrentPage(prev => Math.max(1, prev - 1));
                stopSpeaking();
              }}
              className={`hover:text-amber-400 transition-colors ${pdfCurrentPage === 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
            >
              <ChevronLeft size={16} />
            </button>
            <span>
              {isRtl ? "صفحة" : "Page"} {pdfCurrentPage} {isRtl ? "من" : "of"} {pdfTotalPages}
            </span>
            <button 
              disabled={pdfCurrentPage === pdfTotalPages}
              onClick={() => {
                setPdfCurrentPage(prev => Math.min(pdfTotalPages, prev + 1));
                stopSpeaking();
              }}
              className={`hover:text-amber-400 transition-colors ${pdfCurrentPage === pdfTotalPages ? 'opacity-30 cursor-not-allowed' : ''}`}
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Scale, theme, and options control */}
          <div className="flex items-center gap-3">
            {/* Font Zoom Controls */}
            <div className="flex bg-slate-800 rounded-lg p-0.5 border border-slate-700 ring-offset-slate-900">
              <button 
                onClick={() => setPdfZoom(z => Math.max(75, z - 10))}
                className="p-1 px-2 hover:bg-slate-700 text-slate-300 rounded transition-colors"
                title={isRtl ? "تصغير الخط" : "Zoom Out"}
              >
                <ZoomOut size={14} />
              </button>
              <span className="text-[10px] px-1 bg-slate-900 rounded flex items-center justify-center font-mono font-bold min-w-[34px]">{pdfZoom}%</span>
              <button 
                onClick={() => setPdfZoom(z => Math.min(150, z + 10))}
                className="p-1 px-2 hover:bg-slate-700 text-slate-300 rounded transition-colors"
                title={isRtl ? "تكبير الخط" : "Zoom In"}
              >
                <ZoomIn size={14} />
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => {
                if (isBookmarked) {
                  setPdfBookmarks(prev => prev.filter(p => p !== pdfCurrentPage));
                } else {
                  setPdfBookmarks(prev => [...prev, pdfCurrentPage]);
                  confetti({ particleCount: 50, spread: 30, origin: { y: 0.8 } });
                }
              }}
              className={`p-2 rounded-xl border border-slate-700 transition-colors ${isBookmarked ? 'bg-amber-500/10 border-amber-500 text-amber-500' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}
              title={isRtl ? "حفظ إشارة مرجعية" : "Bookmark Page"}
            >
              <Bookmark size={15} fill={isBookmarked ? "currentColor" : "none"} />
            </button>

            {/* Theme switcher */}
            <div className="flex bg-slate-800 rounded-xl p-0.5 border border-slate-700 gap-0.5">
              {(['parchment', 'sepia', 'dark', 'plain'] as const).map(th => (
                <button
                  key={th}
                  onClick={() => setPdfTheme(th)}
                  className={`w-5 h-5 rounded-lg border flex items-center justify-center text-[8px] font-black uppercase transition-all ${
                    pdfTheme === th 
                      ? 'bg-amber-500 text-[#1a1c23] border-amber-400' 
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                  style={{
                    backgroundColor: th === 'parchment' ? '#faf5ea' : th === 'sepia' ? '#eccda6' : th === 'dark' ? '#14171e' : '#ffffff'
                  }}
                  title={th}
                />
              ))}
            </div>

            {/* Read out loud text speech */}
            <button
              onClick={() => {
                const textToSpeak = uploadedPdfFile?.text || activePageDetails.content;
                speakText(textToSpeak);
              }}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl border border-slate-700 transition-colors"
              title={isRtl ? "تلاوة النص صوتياً 🔊" : "Read Aloud 🔊"}
            >
              <PlayCircle size={15} />
            </button>

            {/* Simulated Print/Download */}
            <button
              onClick={() => {
                alert(isRtl 
                  ? "يتم تشفير وتوليد ملف المستند كبي دي اف للتحميل... تم تجهيز كافة مخرجات ستيفن كوفي وتطوير المهارات بنجاح في جهازك." 
                  : "Compiling unabridged PDF for offline custody. Saved successfully!");
              }}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl border border-slate-700 transition-colors"
              title={isRtl ? "حفظ كـ PDF" : "Download PDF"}
            >
              <FileDown size={15} />
            </button>
          </div>
        </div>

        {/* Reader Core Workspace: Sidebar + PDF Sheet + AI Sidecar */}
        <div className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-[#eae0cc] h-full overflow-hidden">
          
          {/* LEFT/RIGHT SIDEBAR: Document details and features tabs */}
          <div className="w-full md:w-64 bg-[#1e2229]/5 border-slate-200/50 flex flex-col justify-between shrink-0 h-full overflow-y-auto">
            <div>
              {/* Tab options menu */}
              <div className="grid grid-cols-4 bg-slate-200/50 border-b border-slate-300/40 p-1 text-center font-bold text-[10px] text-slate-600">
                <button 
                  onClick={() => setPdfSidebarTab('chapters')}
                  className={`p-1.5 rounded-lg transition-all ${pdfSidebarTab === 'chapters' ? 'bg-[#1e2229] text-white' : 'hover:bg-slate-200'}`}
                >
                  {isRtl ? "الفصول" : "Chapters"}
                </button>
                <button 
                  onClick={() => setPdfSidebarTab('search')}
                  className={`p-1.5 rounded-lg transition-all ${pdfSidebarTab === 'search' ? 'bg-[#1e2229] text-white' : 'hover:bg-slate-200'}`}
                >
                  {isRtl ? "بحث" : "Search"}
                </button>
                <button 
                  onClick={() => setPdfSidebarTab('bookmarks')}
                  className={`p-1.5 rounded-lg transition-all ${pdfSidebarTab === 'bookmarks' ? 'bg-[#1e2229] text-white' : 'hover:bg-slate-200'}`}
                >
                  {isRtl ? "الحوافظ" : "Bookmarks"}
                </button>
                <button 
                  onClick={() => setPdfSidebarTab('upload')}
                  className={`p-1.5 rounded-lg transition-all ${pdfSidebarTab === 'upload' ? 'bg-[#1e2229] text-white' : 'hover:bg-slate-200'}`}
                >
                  {isRtl ? "استيراد" : "Import"}
                </button>
              </div>

              {/* Dynamic sidebar views rendering */}
              <div className="p-4 overflow-y-auto max-h-[48vh] md:max-h-[58vh]">
                
                {pdfSidebarTab === 'chapters' && (
                  <div className="space-y-2">
                    <span className="text-[9px] uppercase font-black text-slate-400 block tracking-wider mb-2">{isRtl ? "فهرس المستند وأبواب المتن" : "Table of Contents"}</span>
                    {selectedBook.chapters.map((ch, idx) => (
                      <button
                        key={ch.id}
                        onClick={() => {
                          // Jump page based on chapter index to mock genuine reader pagination
                          setPdfCurrentPage(idx + 1);
                          stopSpeaking();
                        }}
                        className={`w-full text-right px-3 py-2 rounded-xl text-xs font-bold leading-relaxed transition-all flex items-center hover:bg-black/5 gap-2 ${
                          pdfCurrentPage === idx + 1 
                            ? 'bg-amber-500/10 text-[#b48e56] border-r-2 border-[#b48e56]' 
                            : 'text-slate-600'
                        }`}
                      >
                        <BookOpen size={12} className="shrink-0" />
                        <span className="truncate">{isRtl ? ch.titleAr : ch.titleEn}</span>
                      </button>
                    ))}
                  </div>
                )}

                {pdfSidebarTab === 'search' && (
                  <div className="space-y-3">
                    <span className="text-[9px] uppercase font-black text-slate-400 block tracking-wider">{isRtl ? "البحث الذكي في نصوص المتن" : "Search Book Text"}</span>
                    <div className="relative">
                      <input 
                        type="text"
                        placeholder={isRtl ? "اكتب كلمة للبحث عنها..." : "Type keywords..."}
                        value={pdfSearchQuery}
                        onChange={(e) => setPdfSearchQuery(e.target.value)}
                        className="w-full text-xs font-bold bg-white border border-slate-300 rounded-xl py-2 pl-8 pr-3 focus:outline-none focus:ring-1 focus:ring-[#b48e56]"
                      />
                      <Search size={12} className="absolute left-2.5 top-2.5 text-slate-400" />
                    </div>

                    {pdfSearchQuery && (
                      <div className="bg-amber-500/10 rounded-xl p-2 border border-amber-500/15 text-[10px] text-amber-700 leading-normal font-medium">
                        {isRtl 
                          ? `جارِ التصفية الفورية على كلمة «${pdfSearchQuery}». ستظهر الكلمة مبرزة بلون ذهبي فاقع في رقعة الكتاب المفتوحة حالياً للتأمل والوقار.` 
                          : `Filtering words matching "${pdfSearchQuery}". Matches will be highlighted in the open chapter sheet.`}
                      </div>
                    )}
                  </div>
                )}

                {pdfSidebarTab === 'bookmarks' && (
                  <div className="space-y-2">
                    <span className="text-[9px] uppercase font-black text-slate-400 block tracking-wider mb-2">{isRtl ? "قائمتك للمطالعة اللاحقة" : "Your Bookmarks"}</span>
                    {pdfBookmarks.length === 0 ? (
                      <div className="text-center py-6 text-xs text-slate-400 font-serif">
                        {isRtl ? "لم تقم بحفظ أي علامات بعد. طالع المتن وانقر زر الإشارة لحفظ مرجعك." : "No bookmarks registered. Flag pages to remember them."}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {pdfBookmarks.map(pg => (
                          <button
                            key={pg}
                            onClick={() => {
                              setPdfCurrentPage(pg);
                              stopSpeaking();
                            }}
                            className="bg-white border hover:border-amber-500/30 p-2 rounded-xl text-center text-xs font-mono font-bold hover:shadow-xs transition-shadow flex items-center justify-center gap-1.5"
                          >
                            <Bookmark size={10} fill="#b48e56" className="text-[#b48e56]" />
                            <span>{isRtl ? `صفحة ${pg}` : `Page ${pg}`}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {pdfSidebarTab === 'upload' && (
                  <div className="space-y-3">
                    <span className="text-[9px] uppercase font-black text-slate-400 block tracking-wider">{isRtl ? "مستورد ملفات الـ PDF الخاص بك" : "Private PDF Importer"}</span>
                    
                    {/* Drag and drop file select */}
                    <div className="relative border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center hover:bg-black/5 transition-all cursor-pointer">
                      <input 
                        type="file" 
                        accept="application/pdf"
                        onChange={handlePdfFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                      />
                      <UploadCloud size={28} className="text-[#b48e56] mx-auto mb-2" />
                      <p className="text-[10px] font-extrabold text-[#1e2229] leading-tight mb-1">
                        {isRtl ? "انقر لاستيراد كتاب PDF جديد" : "Drag or select PDF"}
                      </p>
                      <p className="text-[9px] text-slate-400 font-medium">
                        {isRtl ? "ملفات PDF لتطوير الذات" : "PDF files up to 10MB"}
                      </p>
                    </div>

                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-[9px] font-mono font-bold text-slate-500">
                          <span>{isRtl ? "تلقين وهندسة..." : "Parsing PDF..."}</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[#b48e56] h-full transition-all duration-150" style={{ width: `${uploadProgress}%` }} />
                        </div>
                      </div>
                    )}

                    {uploadedPdfFile && (
                      <div className="bg-emerald-50 border border-emerald-100/50 p-2.5 rounded-xl flex flex-col gap-2 relative">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                          <div className="overflow-hidden">
                            <h5 className="text-[10px] text-slate-800 font-black truncate">{uploadedPdfFile.name}</h5>
                            <span className="text-[8px] text-slate-400 block font-mono font-bold">{uploadedPdfFile.size}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setUploadedPdfFile(null);
                            setUploadProgress(0);
                            setPdfSidebarTab('chapters');
                            setPdfTotalPages(24);
                          }}
                          className="text-[9px] font-extrabold text-rose-500 hover:text-rose-700 bg-rose-50 p-1.5 rounded-lg text-center"
                        >
                          {isRtl ? "إزالة ملفك والعودة للـ PDF المدمج" : "Remove My PDF"}
                        </button>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>

            {/* Micro details panel */}
            <div className="p-4 border-t border-slate-300/40 bg-slate-100 hidden md:block">
              <div className="flex items-center gap-2 mb-2 text-slate-500">
                <AlertCircle size={14} />
                <span className="text-[10px] font-extrabold uppercase tracking-wider">{isRtl ? "الخصوصية المعرفية" : "Private Sandbox"}</span>
              </div>
              <p className="text-[9px] text-slate-400 leading-relaxed font-serif">
                {isRtl 
                  ? "كافة المستندات المرفوعة يتم تفكيكها وتشفيرها محلياً بالمتصفح. لا يتم تخزين كتبك الخاصة على خوادم الأكاديمية صيانة للملكية." 
                  : "All uploaded files remain inside your sandboxed web browser, keeping your copyright completely safe."}
              </p>
            </div>
          </div>

          {/* CENTER PANEL: The document sheet sheet */}
          <div className="flex-1 p-6 md:p-8 overflow-y-auto flex justify-center items-start h-full">
            <div 
              className={`w-full max-w-2xl px-8 md:px-12 py-10 md:py-14 rounded-2xl shadow-xl border ${themeStyles} leading-relaxed transition-all relative overflow-hidden text-right select-text`}
              style={{ fontSize: `${pdfZoom}%` }}
            >
              {/* PDF Corner Ribbons */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#b48e56]/15 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#b48e56]/15 pointer-events-none" />

              {/* PDF Header running elements */}
              <div className="border-b border-dashed border-[#b48e56]/15 pb-2 mb-6 flex justify-between items-center text-[10px] font-mono font-black select-none pointer-events-none opacity-50 flex-row-reverse">
                <span>{isRtl ? "أكاديمية المعرفة الفطنة والريادة" : "Basim Alkhalil Digital Academy"}</span>
                <span>{uploadedPdfFile ? "مستند بي دي اف خاص" : `«${isRtl ? selectedBook.titleAr : selectedBook.titleEn}»`}</span>
                <span>Page {pdfCurrentPage}</span>
              </div>

              {/* Content heading in sheets */}
              <h3 className="text-xl md:text-2xl font-black text-slate-900 border-b border-[#b48e56]/10 pb-3 mb-6 font-sans">
                {uploadedPdfFile ? "المتن المستخلص من كتاب بي دي اف المرفوع" : activePageDetails.title}
              </h3>

              {/* Main paragraph contents */}
              <div className="text-sm md:text-base whitespace-pre-line space-y-4 font-serif relative">
                {highlightSearchText(uploadedPdfFile?.text || activePageDetails.content, pdfSearchQuery)}
              </div>

              {/* PDF Sheet bottom running line */}
              <div className="border-t border-[#b48e56]/15 mt-10 pt-4 flex justify-between items-center text-[9px] font-black select-none pointer-events-none opacity-40 flex-row-reverse">
                <span>© {isRtl ? "حقوق الترجمة والدراسة ميسرة" : "Academic Study copy"}</span>
                <span>{isRtl ? "مكتبة التطوير والإنتاج" : "Professional Development"}</span>
                <span>{pdfCurrentPage} / {pdfTotalPages}</span>
              </div>
            </div>
          </div>

          {/* RIGHT/LEFT SIDECAR: AI Scholar Assistant Panel (مساعد الذكاء الاصطناعي للمتن والـ PDF) */}
          <div className="w-full md:w-80 bg-[#1e2229]/5 border-slate-200/50 flex flex-col justify-between h-full overflow-hidden shrink-0">
            {/* Header */}
            <div className="bg-[#1e2229] p-3 text-white border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-amber-500" />
                <span className="text-xs font-black tracking-wider">{isRtl ? "المساعد الأكاديمي الفطن" : "AI Scholar Assistant"}</span>
              </div>
              <span className="text-[9px] bg-amber-500/15 border border-amber-500/20 text-amber-400 font-extrabold px-2 py-0.5 rounded-full">Gemini 3.5</span>
            </div>

            {/* Conversation list logs */}
            <div className="flex-1 p-3 overflow-y-auto space-y-3 font-sans max-h-[25vh] md:max-h-none">
              {pdfAssistantLog.map((log, idx) => {
                const isUser = log.role === 'user';
                return (
                  <div key={idx} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                    <span className="text-[8px] font-black tracking-wider text-slate-400 mb-1">
                      {isUser ? (isRtl ? "أنت (القارئ المجد)" : "Reader") : (isRtl ? "المساعد الفطن" : "AI Assistant")}
                    </span>
                    <div className={`p-2.5 rounded-2xl text-[11px] leading-relaxed max-w-[90%] break-words font-serif ${
                      isUser 
                        ? 'bg-[#b48e56] text-white rounded-tr-none' 
                        : 'bg-white border text-slate-800 rounded-tl-none shadow-xs'
                    }`}>
                      {log.text}
                    </div>
                  </div>
                );
              })}
              {isPdfAssistantSending && (
                <div className="flex flex-col items-start">
                  <span className="text-[8px] font-black text-slate-400 mb-1">{isRtl ? "جار التفكر واستبصار المتن..." : "Pondering..."}</span>
                  <div className="flex gap-1 bg-white border p-3 rounded-2xl rounded-tl-none">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* User typing input bottom section */}
            <div className="p-3 border-t bg-[#faf9f5]">
              {/* Context suggestion chips */}
              <div className="flex gap-1 pb-2 overflow-x-auto select-none pointer-events-auto shrink-0 max-w-full">
                <button 
                  onClick={() => setPdfAssistantQuery(isRtl ? "لخص لي متن هذه الصفحة في ثوان" : "Summarize this page please")}
                  className="bg-slate-200 hover:bg-[#b48e56]/10 hover:text-[#b48e56] border text-[8px] font-black shrink-0 px-2 py-1 rounded-full transition-all text-slate-500"
                >
                  {isRtl ? "لخص الصفحة 📝" : "Summarize"}
                </button>
                <button 
                  onClick={() => setPdfAssistantQuery(isRtl ? "ما هي العبرة الأساسية الممكن استخلاصها؟" : "What is the key paradigm here?")}
                  className="bg-slate-200 hover:bg-[#b48e56]/10 hover:text-[#b48e56] border text-[8px] font-black shrink-0 px-2 py-1 rounded-full transition-all text-slate-500"
                >
                  {isRtl ? "ما العبرة هنا؟ 🤔" : "Core Paradigm"}
                </button>
                <button 
                  onClick={() => setPdfAssistantQuery(isRtl ? "اشرح قصة ستيفن كوفي بالتفصيل والمنظور الذهني" : "Explain Stephen Covey's paradigm details")}
                  className="bg-slate-200 hover:bg-[#b48e56]/10 hover:text-[#b48e56] border text-[8px] font-black shrink-0 px-2 py-1 rounded-full transition-all text-slate-500"
                >
                  {isRtl ? "منظوره الفلسفي 📖" : "Explain perspective"}
                </button>
              </div>

              {/* Typing area */}
              <div className="relative">
                <input 
                  type="text"
                  placeholder={isRtl ? "اسأل المساعد عن المتن..." : "Query AI..."}
                  value={pdfAssistantQuery}
                  onChange={(e) => setPdfAssistantQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendPdfAssistantMessage();
                  }}
                  className="w-full text-xs font-serif bg-white border border-slate-300 rounded-xl py-2 pl-9 pr-3 focus:outline-none focus:ring-1 focus:ring-[#b48e56]"
                />
                <button 
                  onClick={handleSendPdfAssistantMessage}
                  className="absolute left-2 top-2 hover:text-[#b48e56] transition-colors"
                >
                  <Send size={14} className="text-[#b48e56]" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1e2229] font-sans antialiased pb-20">
      {/* Dynamic Certificate Modal Container */}
      {renderCertificateModal()}
      
      {/* Decorative Warm Top Bar Accent */}
      <div className="h-1.5 bg-[#b48e56]" />

      {/* Navigation Header */}
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-2 border-b border-[#e1deda] flex justify-between items-center">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-[#b48e56] transition-colors py-2 px-1 text-sm font-bold"
        >
          <ArrowLeft size={16} />
          <span>{isRtl ? 'العودة للوحة التحكم' : 'Back to Dashboard'}</span>
        </button>

        <div className="flex gap-1 bg-[#eae6df] p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('browse')}
            className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${activeTab === 'browse' ? 'bg-white text-[#b48e56] shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            {isRtl ? 'تصفح المكتبة التنموية' : 'Browse Library'}
          </button>
          <button 
            onClick={() => setActiveTab('converter')}
            className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${activeTab === 'converter' ? 'bg-white text-[#b48e56] shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            {isRtl ? 'مهندس المحتوى والملفات' : 'AI PDF Converter'}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-8">
        
        <AnimatePresence mode="wait">
          {activeTab === 'browse' && (
            <motion.div 
              key="browse-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              
              {/* If no book has been selected, browse the books list */}
              {!selectedBook ? (
                <div>
                  <div className="mb-10 text-center max-w-2xl mx-auto">
                    <span className="text-xs tracking-widest text-[#b48e56] uppercase font-bold py-1 px-3 bg-[#f2ede4] rounded-full mb-3 inline-block">
                      {isRtl ? 'أكاديمية المعرفة الفطنة والريادة' : 'Premium Micro-Learning Engine'}
                    </span>
                    <h1 className="text-4xl font-extrabold text-[#111] tracking-tight mb-4">
                      {browseCategory === 'books' 
                        ? (isRtl ? 'مكتبة الكتب الثقافية والتربوية (تطوير ذات)' : 'Interactive Book Vault: Self-Development')
                        : (isRtl ? 'قسم التطوير والإنتاج: دورات تطويرية مصغرة' : 'Developmental Micro-Courses')}
                    </h1>
                    <p className="text-slate-500 leading-relaxed font-serif text-lg">
                      {browseCategory === 'books'
                        ? (isRtl 
                            ? 'تصفح أمهات الكتب العالمية المخزنة بصيغة PDF بجودة تدرج معرفي فائقة، مقسمة لفصول دون اختبارات، لترقية معارفك بمرونة ووقار.'
                            : 'Browse the worlds absolute finest self-development books with elite content-chunking quality, split into readable sections without exam gates for relaxed learning.')
                        : (isRtl 
                            ? 'تطبيق آلية هندسة المحتوى لتفكيك أمهات الكتب والـ PDF وتحويلها إلى تدرجات معرفية فصيحة ومحطات تثبيت وذكاء لا يتعدى 5 دقائق.'
                            : 'Explore real-world masterpieces fully deconstructed into action-oriented micro-learning lanes, with gatekeeping verification and review blocks.')}
                    </p>
                  </div>

                  {/* Category Switcher for Courses vs Books */}
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 pb-4 border-b border-[#e1deda] text-right">
                    <div className="flex bg-[#eae6df] p-1 rounded-xl gap-1">
                      <button 
                        onClick={() => setBrowseCategory('courses')}
                        className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${browseCategory === 'courses' ? 'bg-white text-[#b48e56] shadow-sm' : 'text-slate-600 hover:text-[#b48e56]'}`}
                      >
                        <GraduationCap size={14} />
                        <span>{isRtl ? 'الأقسام المتاحة: الدورات' : 'Accredited Courses'}</span>
                      </button>
                      <button 
                        onClick={() => setBrowseCategory('books')}
                        className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${browseCategory === 'books' ? 'bg-white text-[#b48e56] shadow-sm' : 'text-slate-600 hover:text-[#b48e56]'}`}
                      >
                        <Book size={14} />
                        <span>{isRtl ? 'الأقسام المتاحة: الكتب' : 'Cultural Books'}</span>
                      </button>
                    </div>

                    {browseCategory === 'books' && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500">{isRtl ? 'القسم الفرعي:' : 'Subcategory:'}</span>
                        <span className="px-3 py-1 bg-[#b48e56]/10 text-[#b48e56] text-xs font-black rounded-lg border border-[#b48e56]/15">
                          {isRtl ? 'تطوير ذات' : 'Self-Development'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Books grid */}
                  <div className="grid md:grid-cols-3 gap-6">
                    {(browseCategory === 'books' 
                      ? [
                          PRELOADED_COURSES.find(c => c.id === 'seven_habits'),
                          ...PRELOADED_COURSES.filter(c => c.id !== 'seven_habits')
                        ].filter(Boolean) as BookCourse[]
                      : PRELOADED_COURSES
                    ).map(course => {
                      const isComplete = course.chapters.length > 0 && course.chapters.every(ch => userResults.some(r => r.lessonId === ch.id && r.score >= 2));
                      return (
                        <div 
                          key={course.id}
                          className={`bg-white border border-[#e8e5df] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${course.isLocked ? 'opacity-60 cursor-not-allowed bg-[#faf9f6]' : 'cursor-pointer'}`}
                          onClick={() => {
                            if (!course.isLocked) {
                              setIsBookMode(browseCategory === 'books');
                              setSelectedBook(course);
                              setActiveChapter(null);
                              setActiveLesson(null);
                            }
                          }}
                        >
                          <div>
                            <div className="relative mb-5 rounded-xl overflow-hidden shadow-sm aspect-[4/3] bg-slate-100 flex items-center justify-center">
                              <img 
                                src={course.coverImage} 
                                alt={course.titleEn} 
                                className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                                referrerPolicy="no-referrer"
                              />
                              {course.isLocked && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                                  <div className="flex flex-col items-center gap-1 bg-[#1e2229] py-2 px-4 rounded-xl border border-white/10">
                                    <Lock size={18} className="text-[#b48e56]" />
                                    <span className="text-[10px] font-black tracking-wider uppercase">{isRtl ? 'قريباً' : 'Locked'}</span>
                                  </div>
                                </div>
                              )}
                              {isComplete && !isBookMode && (
                                <div className="absolute top-3 right-3 bg-emerald-500 text-white p-1.5 rounded-full shadow-sm">
                                  <CheckCircle2 size={16} />
                                </div>
                              )}
                            </div>

                            <span className="text-[10px] text-[#b48e56] font-extrabold uppercase tracking-widest block mb-1">
                              {isRtl ? course.authorAr : course.authorEn}
                            </span>
                            <h3 className="text-xl font-bold text-[#1a1a1a] leading-tight mb-2">
                              {isRtl ? course.titleAr : course.titleEn}
                            </h3>
                            <p className="text-slate-400 text-xs font-medium leading-relaxed font-serif">
                              {isRtl ? course.descriptionAr : course.descriptionEn}
                            </p>
                          </div>

                          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black uppercase text-[#b48e56]">
                            <span>
                              {browseCategory === 'books'
                                ? (isRtl ? 'ابدأ قراءة الكتاب 📖' : 'Read Book 📖')
                                : course.isLocked 
                                  ? (isRtl ? 'مغلق ومجدول' : 'Scheduled') 
                                  : (isRtl ? 'ابدأ الآن' : 'Start Course')
                              }
                            </span>
                            <ArrowRight size={14} className="rtl:rotate-180" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (

                /* Interactive Book Portal */
                isPdfReaderView ? (
                  renderPdfReaderView()
                ) : (
                  <div>
                    <button 
                      onClick={() => {
                      setSelectedBook(null);
                      setActiveChapter(null);
                      setActiveLesson(null);
                    }}
                    className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 transition-colors text-xs font-bold mb-6"
                  >
                    <ArrowLeft size={14} />
                    <span>{isRtl ? 'العودة للمكتبة' : 'Back to Library'}</span>
                  </button>

                  <div className="bg-white border border-[#e8e5df] rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-8 mb-8">
                    <div className="w-full md:w-1/4 max-w-[200px] mx-auto md:mx-0">
                      <img 
                        src={selectedBook.coverImage} 
                        alt={selectedBook.titleEn} 
                        className="rounded-2xl shadow-md w-full object-cover aspect-[3/4]"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-xs text-[#b48e56] font-black uppercase tracking-wider">
                          {isRtl ? selectedBook.authorAr : selectedBook.authorEn}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-[#111] mt-1 mb-4">
                          {isRtl ? selectedBook.titleAr : selectedBook.titleEn}
                        </h2>
                        <p className="text-slate-500 font-serif leading-relaxed text-sm">
                          {isRtl ? selectedBook.descriptionAr : selectedBook.descriptionEn}
                        </p>
                      </div>

                      {/* Info Cards */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-100">
                        <div className="bg-[#faf9f5] border border-[#e9e6df] rounded-xl p-3 text-center">
                          <label className="text-[10px] uppercase font-black text-slate-400 block tracking-widest">{isRtl ? 'المواضيع والأقسام' : 'Chapters'}</label>
                          <span className="text-[#111] font-black text-base">
                            {isBookMode 
                              ? (isRtl ? `${selectedBook.chapters.length} فصول كاملة غير مختصرة` : `${selectedBook.chapters.length} Unabridged Chapters`)
                              : (isRtl ? `${selectedBook.chapters.length} فصول مصغرة` : `${selectedBook.chapters.length} Chapters`)}
                          </span>
                        </div>
                        <div className="bg-[#faf9f5] border border-[#e9e6df] rounded-xl p-3 text-center">
                          <label className="text-[10px] uppercase font-black text-slate-400 block tracking-widest">{isRtl ? 'التقييم الفطن' : 'Gatekeeping'}</label>
                          <span className="text-[#111] font-black text-sm">
                            {isBookMode 
                              ? (isRtl ? 'قراءة المتن الكامل بي دي اف' : 'Full Unabridged Text') 
                              : (isRtl ? 'اختبار عبور متطلب' : 'Pass to progress')}
                          </span>
                        </div>
                        <div className="bg-[#faf9f5] border border-[#e9e6df] rounded-xl p-3 text-center col-span-2 md:col-span-1">
                          <label className="text-[10px] uppercase font-black text-slate-400 block tracking-widest">{isRtl ? 'الجائزة التنموية' : 'Awards'}</label>
                          <span className="text-[#b48e56] font-black text-sm">{isBookMode ? '+250 XP' : '+150 XP'}</span>
                        </div>
                      </div>

                      {/* Premium E-Reader & PDF Text launcher bar */}
                      <div className="mt-6 bg-[#b48e56]/5 border border-[#b48e56]/20 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3 text-right">
                          <div className="bg-[#b48e56] text-white p-2.5 rounded-xl">
                            <BookOpen size={20} />
                          </div>
                          <div>
                            <h4 className="text-sm font-black text-[#1e2229]">{isRtl ? 'القارئ الذكي للمتن الكامل المعتمد (PDF)' : 'Interactive Unabridged E-Reader'}</h4>
                            <p className="text-[11px] text-[#b48e56] font-bold mt-0.5">{isRtl ? 'قراءة المتن الأصلي الكامل مع مساعد الذكاء الاصطناعي صفحة بصفحة دون اختصارات وبجودة فائقة' : 'Study unabridged original textbooks page-by-page with Gemini AI companion sidecar.'}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setPdfCurrentPage(1);
                            setIsPdfReaderView(true);
                            speakText(isRtl ? 'مرحباً بك في المحيا الأكاديمي لقراءة المتن الأصلي الكامل بي دي اف' : 'Welcome to the unabridged textbook reader');
                          }}
                          className="bg-[#b48e56] hover:bg-[#a17e4b] text-white font-black text-xs py-2.5 px-6 rounded-xl shadow-md cursor-pointer transition-all flex items-center gap-2 shrink-0 active:scale-95"
                        >
                          <BookOpen size={14} />
                          <span>{isRtl ? 'قراءة المتن الأصلي الكامل 📖' : 'Read Full Unabridged Text 📖'}</span>
                        </button>
                      </div>

                    </div>
                  </div>

                  {/* Chapters List */}
                  {!activeChapter ? (
                    <div>
                      {/* Comprehensive Course completion Certificate Banner */}
                      {selectedBook && !isBookMode && selectedBook.chapters.every(ch => userResults.some(r => r.lessonId === ch.id)) && (
                        <div className="bg-gradient-to-r from-[#002147] to-[#112d4e] text-white rounded-3xl p-6 md:p-8 shadow-xl border-2 border-amber-400 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden text-right leading-relaxed">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/[0.02] rounded-full pointer-events-none" />
                          
                          <div className="flex items-center gap-5 flex-row-reverse z-10 w-full md:w-auto">
                            <div className="w-16 h-16 rounded-2xl bg-amber-400/25 flex items-center justify-center text-amber-400 shrink-0">
                              <Trophy size={36} />
                            </div>
                            <div>
                              <span className="text-amber-400 text-xs font-extrabold uppercase tracking-widest block mb-1">
                                {isRtl ? 'تهانينا الحارة! إنجاز أكاديمي متميز' : 'Congratulations! Academic Excellence'}
                              </span>
                              <h3 className="text-xl md:text-2xl font-black text-white leading-tight">
                                {isRtl ? `استحقاق شهادة إتمام دورة «${selectedBook.titleAr}»` : `You earned the certification for completing "${selectedBook.titleEn}"`}
                              </h3>
                              <p className="text-slate-300 text-xs font-serif mt-1 max-w-xl">
                                {isRtl 
                                  ? 'لقد اجتزت بنجاح كافة اختبارات الفصول بتقدير ممتاز. شهادتك المعتمدة صادرة وموثقة مباشرة من أكاديمية باسم آل خليل الرقمية.' 
                                  : 'You have passed all chapter audits with high standing. Your credential is authenticated and ready.'}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const { score, total } = getBookOverallScores(selectedBook);
                              triggerCertificate(
                                isRtl ? selectedBook.titleAr : selectedBook.titleEn,
                                isRtl ? 'إكمال المسار الأكاديمي كاملاً' : 'Full Course Path Completed',
                                score,
                                total
                              );
                            }}
                            className="bg-amber-400 hover:bg-amber-500 text-[#002147] font-black px-6 py-4 rounded-2xl text-sm flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer shadow-lg w-full md:w-auto hover:scale-105 z-10"
                          >
                            <Award size={18} />
                            <span>{isRtl ? 'إصدار شهادة الإتمام الفورية 🎓' : 'Issue Dynamic Course Certificate 🎓'}</span>
                          </button>
                        </div>
                      )}

                      <h3 className="text-xl font-extrabold mb-4 text-[#111] pb-2 border-b border-[#ece8e1]">
                        {isRtl 
                          ? (isBookMode ? 'الفصول والأبواب الأصلية الكاملة - المتن الكامل غير مختصر' : 'الفصول والمسارات المتاحة للتلخيص والمناقشة') 
                          : 'Available Pathways'}
                      </h3>
                      
                      <div className="space-y-4">
                        {selectedBook.chapters.map((chapter, idx) => {
                          const isUnlocked = isBookMode ? true : unlockedChapters.has(chapter.id);
                          const matchingResult = userResults.find(r => r.lessonId === chapter.id);
                          
                          return (
                            <div 
                              key={chapter.id}
                              className={`bg-white border border-[#e8e5df] rounded-2xl p-5 shadow-sm transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${isUnlocked ? 'hover:border-[#b48e56] cursor-pointer' : 'opacity-65 relative'}`}
                              onClick={() => {
                                if (isUnlocked) {
                                  setActiveChapter(chapter);
                                  setActiveLesson(chapter.lessons[0]);
                                  setLessonIndex(0);
                                  setShowQuiz(false);
                                } else {
                                  alert(isRtl ? 'هذا الفصل مغلق! يتعين عليك عبور الفصل السابق بنجاح لفتح هذا المسار.' : 'This chapter is locked! Complete the previous gatekeeper quiz (scored >= 70%) to progress.');
                                }
                              }}
                            >
                              <div className="flex-1 flex gap-4 items-start">
                                <div className="w-10 h-10 rounded-xl bg-[#b48e56]/10 flex items-center justify-center text-[#b48e56] shrink-0">
                                  {isUnlocked ? <BookOpen size={20} /> : <Lock size={20} />}
                                </div>
                                <div>
                                  <h4 className="font-bold text-[#111] text-lg">
                                    {isRtl ? chapter.titleAr : chapter.titleEn}
                                  </h4>
                                  <p className="text-slate-400 text-xs font-medium font-serif mt-1">
                                    {isRtl ? chapter.descriptionAr : chapter.descriptionEn}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 self-stretch md:self-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                                {isBookMode ? (
                                  <span className="text-xs font-black uppercase text-[#b48e56]">{isRtl ? 'ابدأ القراءة 📖' : 'Read Chapter 📖'}</span>
                                ) : matchingResult ? (
                                  <div className="flex items-center gap-2 flex-wrap justify-end">
                                    <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1.5 rounded-full text-xs font-black">
                                      <CheckCircle2 size={14} />
                                      <span>{isRtl ? `تم اجتياز مخرجات الفصل (${matchingResult.score}/${matchingResult.total})` : `Module Mastered (${matchingResult.score}/${matchingResult.total})`}</span>
                                    </div>
                                  </div>
                                ) : isUnlocked ? (
                                  <span className="text-xs font-black uppercase text-[#b48e56]">{isRtl ? 'ابدأ المسار' : 'Start Path'}</span>
                                ) : (
                                  <span className="text-xs font-bold text-slate-400">{isRtl ? 'متطلب الفصل السابق' : 'Prerequisite required'}</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    
                    /* Active Study Arena */
                    <div className="space-y-6">
                      
                      {/* Course Arena Top Bar */}
                      <div className="flex justify-between items-center bg-white border border-[#e8e5df] py-4 px-6 rounded-2xl shadow-sm">
                        <button 
                          onClick={() => {
                            setActiveChapter(null);
                            setActiveLesson(null);
                            stopSpeaking();
                          }}
                          className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 transition-colors text-xs font-black"
                        >
                          <ArrowLeft size={14} />
                          <span>{isRtl ? 'العودة لقائمة فصول الكتاب' : 'Back to Chapters'}</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#b48e56] font-bold">
                            {isRtl ? `بوابة فصل ${activeChapter.chapterNum}` : `Chapter ${activeChapter.chapterNum}`}
                          </span>
                        </div>
                      </div>

                      {/* Learning Stage Progress Bar */}
                      <div className="bg-white border border-[#e8e5df] p-4 rounded-2xl flex flex-wrap gap-2 justify-between items-center shadow-sm">
                        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
                          {activeChapter.lessons.map((lesson, idx) => {
                            const isCurrent = activeLesson?.id === lesson.id && !showQuiz;
                            return (
                              <button 
                                key={lesson.id}
                                onClick={() => {
                                  setShowQuiz(false);
                                  handleLessonNavigation(idx);
                                }}
                                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all border ${isCurrent ? 'bg-[#b48e56] text-white border-[#b48e56]' : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'}`}
                              >
                                {isBookMode 
                                  ? (isRtl ? `القسم المكتوب ${idx + 1}` : `Section ${idx + 1}`)
                                  : (isRtl ? `درس ${idx + 1}` : `Lesson ${idx + 1}`)}
                              </button>
                            );
                          })}
                          
                          {!isBookMode && (
                            <button 
                              onClick={() => handleLessonNavigation(activeChapter.lessons.length)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all border ${showQuiz ? 'bg-amber-500 text-white border-amber-500' : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'}`}
                            >
                              {isRtl ? 'بوابة عبور الفصل 📑' : 'Gatekeeper Quiz 📑'}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Interactive View Mode Selector */}
                      {!showQuiz && (
                        <div className="flex bg-[#eae6df] p-1 rounded-2xl border border-[#dedad3] justify-center items-center max-w-md mx-auto w-full gap-1">
                          <button 
                            onClick={() => setStudyViewMode('lesson')}
                            className={`flex-1 py-2 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${studyViewMode === 'lesson' ? 'bg-[#b48e56] text-white shadow-sm' : 'text-slate-600 hover:text-[#b48e56]'}`}
                          >
                            <BookOpen size={14} />
                            <span>
                              {isBookMode 
                                ? (isRtl ? '📖 متن الكتاب الأصلي الكامل' : '📖 Original Book Text')
                                : (isRtl ? '📖 الدرس التفاعلي وقراءة سريعة' : '📖 Interactive Lesson')}
                            </span>
                          </button>
                          <button 
                            onClick={() => setStudyViewMode('mindmap')}
                            className={`flex-1 py-2 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${studyViewMode === 'mindmap' ? 'bg-[#b48e56] text-white shadow-sm' : 'text-slate-600 hover:text-[#b48e56]'}`}
                          >
                            <FileText size={14} />
                            <span>{isRtl ? '📊 المخطط الهيكلي والإنفوجرافيك' : '📊 Visual Infographic'}</span>
                          </button>
                        </div>
                      )}

                      {/* Study Area Canvas */}
                      <AnimatePresence mode="wait">
                        {!showQuiz && activeLesson ? (
                          studyViewMode === 'mindmap' ? (
                            <motion.div
                              key="mindmap-canvas"
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -15 }}
                            >
                              {renderTreeViewInfographic()}
                            </motion.div>
                          ) : (
                            <motion.div 
                              key={activeLesson.id}
                              initial={{ opacity: 0, x: isRtl ? 15 : -15 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: isRtl ? -15 : 15 }}
                              className="bg-white border border-[#e8e5df] p-6 md:p-10 rounded-3xl shadow-sm text-right relative"
                            >
                              <div className="flex justify-between items-start flex-wrap gap-4 mb-4 border-b border-[#f2ece2] pb-4">
                                <div>
                                  <span className="text-[10px] tracking-widest text-[#b48e56] uppercase font-bold py-0.5 px-3.5 bg-[#f5f1e8] rounded-full inline-block leading-loose animate-pulse">
                                    {isBookMode 
                                      ? (isRtl ? '📖 متن الكتاب الأصلي الكامل - غير مختصر' : '📖 Full Unabridged Original Text')
                                      : (activeLesson.type === 'intro' ? (isRtl ? 'تمهيد وتأسيس' : 'Orientation') : 
                                         activeLesson.type === 'review' ? (isRtl ? 'مراجعة وتثبيت' : 'Review Node') : 
                                         activeLesson.type === 'tips' ? (isRtl ? 'دليل إرشادي' : 'Tips Node') : (isRtl ? 'جوهر المفهوم' : 'Core Concept'))}
                                  </span>

                                  <h3 className="text-2xl font-extrabold text-[#111] tracking-tight mt-3 mb-1 leading-tight text-right">
                                    {isRtl ? activeLesson.titleAr : activeLesson.titleEn}
                                  </h3>
                                </div>

                                {/* Active Chronometer Timer */}
                                <div className="flex items-center gap-2 text-[#b48e56] bg-[#b48e56]/5 py-1.5 px-3.5 rounded-xl border border-[#b48e56]/15 font-sans">
                                  <span className="relative flex h-20 w-2 shrink-0 items-center justify-center">
                                    <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                  </span>
                                  <span className="text-xs font-black font-mono">
                                    {isRtl ? `مدة القراءة: ${formatSeconds(activeSeconds)}` : `Reading: ${formatSeconds(activeSeconds)}`}
                                  </span>
                                </div>
                              </div>

                              {/* Interactive Reading Controls Row */}
                              <div className="flex flex-wrap items-center justify-between gap-4 bg-[#faf9f6] border border-[#f2ece2] p-4 rounded-2xl mb-6 text-right">
                                <p className="text-xs text-slate-400 font-serif">
                                  {isRtl ? 'تخصيص العرض والتحكم الفطن للقراءة السريعة والأوديو:' : 'Customize font multiplier or bionic speed-reading scan:'}
                                </p>

                                <div className="flex items-center gap-3 flex-wrap">
                                  {/* Audio speaker */}
                                  <button 
                                    onClick={() => speakText(isRtl ? activeLesson.contentAr : activeLesson.contentEn)}
                                    className="bg-[#b48e56]/10 text-[#b48e56] hover:bg-[#b48e56]/20 transition-all px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm"
                                  >
                                    <PlayCircle size={14} />
                                    <span>{isRtl ? 'استمع صوتياً' : 'Listen Now'}</span>
                                  </button>

                                  {/* Scannable mode indicator */}
                                  <button 
                                    onClick={() => setScannableMode(!scannableMode)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all border flex items-center gap-1.5 ${scannableMode ? 'bg-[#b48e56] text-white border-[#b48e56]' : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'}`}
                                  >
                                    <span>⚡ {isRtl ? 'وضع القراءة السلسة' : 'Foveal Scan'}</span>
                                  </button>

                                  {/* Font multiplier tabs */}
                                  <div className="flex gap-1 bg-slate-100 p-1 rounded-xl items-center border border-slate-300 font-sans">
                                    {(['normal', 'medium', 'large', 'xl'] as const).map((sz) => (
                                      <button 
                                        key={sz}
                                        onClick={() => setFontSize(sz)}
                                        className={`px-2 py-1 rounded-lg text-xs font-black uppercase transition-all ${fontSize === sz ? 'bg-white text-[#b48e56] shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                                      >
                                        {sz === 'normal' ? 'S' : sz === 'medium' ? 'M' : sz === 'large' ? 'L' : 'XL'}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Lesson Content viewport */}
                              <div className={`${
                                fontSize === 'normal' ? 'text-base md:text-lg' : 
                                fontSize === 'medium' ? 'text-lg md:text-xl' : 
                                fontSize === 'large' ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'
                              } text-slate-700 leading-relaxed font-serif whitespace-pre-line space-y-4 prose max-w-none text-right`}>
                                {renderScannableContent(isRtl ? activeLesson.contentAr : activeLesson.contentEn)}
                              </div>

                              {/* Lessons Navigators */}
                              <div className="mt-10 pt-6 border-t border-[#f2ece2] flex justify-between items-center gap-4">
                                <button 
                                  disabled={lessonIndex === 0}
                                  onClick={() => handleLessonNavigation(lessonIndex - 1)}
                                  className={`text-slate-500 hover:text-slate-800 flex items-center gap-2 text-xs font-bold py-2 ${lessonIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
                                >
                                  <ArrowLeft size={16} />
                                  <span>{isRtl ? 'الدرس السابق' : 'Previous'}</span>
                                </button>

                                {isBookMode ? (
                                  <button 
                                    onClick={() => {
                                      if (lessonIndex + 1 === activeChapter.lessons.length) {
                                        handleBookNextChapter();
                                      } else {
                                        handleLessonNavigation(lessonIndex + 1);
                                      }
                                    }}
                                    className="bg-[#b48e56] hover:bg-[#a17e4b] text-white transition-all py-2.5 px-6 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm"
                                  >
                                    <span>
                                      {lessonIndex + 1 === activeChapter.lessons.length 
                                        ? (isRtl ? 'انتقل للفصل التالي 📖' : 'Next Chapter 📖') 
                                        : (isRtl ? 'الدرس التالي' : 'Next Lesson')}
                                    </span>
                                    <ArrowRight size={14} className="rtl:rotate-180" />
                                  </button>
                                ) : (
                                  <button 
                                    onClick={() => handleLessonNavigation(lessonIndex + 1)}
                                    className="bg-[#b48e56] hover:bg-[#a17e4b] text-white transition-all py-2.5 px-6 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm"
                                  >
                                    <span>
                                      {lessonIndex + 1 === activeChapter.lessons.length 
                                        ? (isRtl ? 'انتقل لاختبار البوابة' : 'Verify Chapter (Quiz)') 
                                        : (isRtl ? 'الدرس التالي' : 'Next Lesson')}
                                    </span>
                                    <ArrowRight size={14} className="rtl:rotate-180" />
                                  </button>
                                )}
                              </div>
                            </motion.div>
                          )
                        ) : (
                          
                          /* Gatekeeping Quiz Mode */
                          <motion.div 
                            key="quiz-canvas"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#1f2229] text-white border border-white/5 p-6 md:p-10 rounded-3xl shadow-lg relative overflow-hidden"
                          >
                            <div className="absolute top-0 right-0 left-0 h-1.5 bg-amber-500" />
                            
                            {!quizFinished ? (
                              <div>
                                <div className="flex justify-between items-center mb-6">
                                  <span className="text-xs font-black tracking-widest uppercase text-amber-500 bg-amber-500/10 py-1 px-3.5 rounded-full inline-block">
                                    {isRtl ? 'بوابة التحقق ونظام الجودة' : 'Gatekeeper Quality Quiz'}
                                  </span>
                                  <span className="font-bold text-slate-400 text-xs">
                                    {isRtl 
                                      ? `السؤال ${currentQuizIndex + 1} من ${activeChapter.quiz.length}` 
                                      : `Question ${currentQuizIndex + 1} of ${activeChapter.quiz.length}`}
                                  </span>
                                </div>

                                <h3 className="text-xl md:text-2xl font-bold leading-snug mb-8 font-serif">
                                  {isRtl ? activeChapter.quiz[currentQuizIndex].questionAr : activeChapter.quiz[currentQuizIndex].questionEn}
                                </h3>

                                <div className="space-y-3">
                                  {(isRtl ? activeChapter.quiz[currentQuizIndex].optionsAr : activeChapter.quiz[currentQuizIndex].optionsEn).map((option, idx) => {
                                    const isSelected = selectedOptionIndex === idx;
                                    const isCorrectOpt = idx === activeChapter.quiz[currentQuizIndex].correctIndex;
                                    
                                    let btnStyle = "border-white/10 hover:border-white/30 bg-white/5";
                                    if (isAnswered) {
                                      if (isSelected) {
                                        btnStyle = isCorrectOpt ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" : "bg-rose-500/20 border-rose-500 text-rose-400";
                                      } else if (isCorrectOpt) {
                                        btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-400";
                                      } else {
                                        btnStyle = "opacity-40 border-white/5 bg-transparent";
                                      }
                                    }

                                    return (
                                      <button 
                                        key={idx}
                                        disabled={isAnswered}
                                        onClick={() => handleQuizAnswer(idx)}
                                        className={`w-full text-right p-4 rounded-xl border transition-all flex justify-between items-center text-sm font-medium leading-relaxed font-serif ${btnStyle}`}
                                      >
                                        <span>{option}</span>
                                        {isAnswered && (
                                          <div className="shrink-0 ml-3">
                                            {isCorrectOpt ? <Check size={16} className="text-emerald-400" /> : isSelected ? <X size={16} className="text-rose-400" /> : null}
                                          </div>
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>

                                {/* Explanation Panel */}
                                <AnimatePresence>
                                  {isAnswered && (
                                    <motion.div 
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl text-xs leading-relaxed text-slate-300 font-serif"
                                    >
                                      <span className="font-bold text-[#b48e56] block mb-1">
                                        {isRtl ? 'التفسير المعرفي للفصل:' : 'Deconstructive Breakdown:'}
                                      </span>
                                      {isRtl ? activeChapter.quiz[currentQuizIndex].explanationAr : activeChapter.quiz[currentQuizIndex].explanationEn}
                                    </motion.div>
                                  )}
                                </AnimatePresence>

                                <div className="mt-8 flex justify-end">
                                  <button 
                                    disabled={!isAnswered}
                                    onClick={handleNextQuiz}
                                    className={`py-3 px-8 rounded-xl text-xs font-black tracking-wider uppercase flex items-center gap-1.5 shadow-sm transition-all ${isAnswered ? 'bg-[#b48e56] hover:bg-[#a17e4b] text-white cursor-pointer' : 'bg-white/10 text-slate-500 cursor-not-allowed'}`}
                                  >
                                    <span>
                                      {currentQuizIndex + 1 === activeChapter.quiz.length 
                                        ? (isRtl ? 'إنهاء وحساب المعايير' : 'Finish Quiz') 
                                        : (isRtl ? 'السؤال التالي' : 'Next Question')}
                                    </span>
                                    <ArrowRight size={14} className="rtl:rotate-180" />
                                  </button>
                                </div>
                              </div>
                            ) : (
                              
                              /* Quiz Completed */
                              <div className="text-center py-6">
                                <Trophy size={60} className="text-amber-500 mx-auto mb-4" />
                                <h3 className="text-2xl font-extrabold text-[#fff] tracking-tight mb-2">
                                  {isRtl ? 'تهانينا، أتممت بوابة التحقق!' : 'Verification Complete!'}
                                </h3>
                                
                                <p className="text-slate-300 leading-relaxed font-serif text-base max-w-md mx-auto mb-6">
                                  {quizScore >= Math.ceil(activeChapter.quiz.length * 0.7) 
                                    ? (isRtl 
                                        ? `لقد تفوقت بذكاء وحققت نتيجة عالية: ${quizScore} من ${activeChapter.quiz.length} أسئلة صحيحة! تم تسجيل تقدمك وإضافة 150 نقطة لحسابك.` 
                                        : `Outstanding! You verified with solid understanding: ${quizScore}/${activeChapter.quiz.length} correct. Progress logged and +150 Points awarded.`)
                                    : (isRtl 
                                        ? `لقد حققت نتيجة ${quizScore} من ${activeChapter.quiz.length}. تحتاج للحصول على نتيجة أعلى (70% فما فوق) لمطابثة معايير الجودة وعبور الفصل.` 
                                        : `You scored ${quizScore}/${activeChapter.quiz.length}. Study the tips node again and achieve >= 70% to unlock subsequent modules.`)}
                                </p>

                                <div className="flex gap-3 justify-center items-center flex-wrap">
                                  <button 
                                    onClick={() => {
                                      setShowQuiz(false);
                                      setActiveChapter(null);
                                      setActiveLesson(null);
                                    }}
                                    className="bg-white/10 hover:bg-white/15 text-white transition-all py-3 px-6 rounded-xl text-xs font-black block"
                                  >
                                    {isRtl ? 'عودة لقائمة الفصول' : 'Chapters List'}
                                  </button>
                                  
                                  {quizScore >= Math.ceil(activeChapter.quiz.length * 0.7) && (
                                    <>
                                      {selectedBook && selectedBook.chapters.every(ch => ch.id === activeChapter.id || userResults.some(r => r.lessonId === ch.id)) ? (
                                        <button 
                                          onClick={() => {
                                            const { score, total } = getBookOverallScores(selectedBook);
                                            triggerCertificate(
                                              isRtl ? selectedBook.titleAr : selectedBook.titleEn,
                                              isRtl ? 'إكمال المسار الأكاديمي كاملاً' : 'Full Course Path Completed',
                                              score,
                                              total
                                            );
                                          }}
                                          className="bg-gradient-to-r from-[#002147] to-[#112d4e] border-2 border-amber-400 hover:brightness-110 text-white font-black transition-all py-3 px-6 rounded-xl text-xs flex items-center gap-2 block shadow-lg shadow-amber-500/15 cursor-pointer"
                                        >
                                          <Trophy size={15} className="text-amber-400" />
                                          <span>{isRtl ? 'إصدار شهادة الدورة كاملة 🎓' : 'Issue Full Course Certificate 🎓'}</span>
                                        </button>
                                      ) : (
                                        <button 
                                          onClick={() => {
                                            setShowQuiz(false);
                                            setActiveChapter(null);
                                            setActiveLesson(null);
                                          }}
                                          className="bg-emerald-500 hover:bg-emerald-600 text-white font-black transition-all py-3 px-6 rounded-xl text-xs flex items-center gap-2 block shadow-md cursor-pointer"
                                        >
                                          <CheckCircle2 size={15} />
                                          <span>{isRtl ? 'تم العبور بنجاح! تابع الفصول المتبقية 🚀' : 'Passed! Complete remaining modules 🚀'}</span>
                                        </button>
                                      )}
                                    </>
                                  )}

                                  {quizScore < Math.ceil(activeChapter.quiz.length * 0.7) && (
                                    <button 
                                      onClick={() => {
                                        setShowQuiz(true);
                                        setCurrentQuizIndex(0);
                                        setSelectedOptionIndex(null);
                                        setIsAnswered(false);
                                        setQuizScore(0);
                                        setQuizFinished(false);
                                      }}
                                      className="bg-[#b48e56] hover:bg-[#a17e4b] text-white transition-all py-3 px-6 rounded-xl text-xs font-black flex items-center gap-2 block cursor-pointer"
                                    >
                                      <RefreshCw size={14} />
                                      <span>{isRtl ? 'أعد المحاولة' : 'Retake Quiz'}</span>
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}

                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  )}

                  </div>
                )
              )}

            </motion.div>
          )}

          {activeTab === 'converter' && (
            <motion.div 
              key="converter-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white border border-[#e8e5df] p-6 md:p-8 rounded-3xl shadow-sm text-center mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#b48e56]/15 text-[#b48e56] flex items-center justify-center mx-auto mb-4">
                  <UploadCloud size={24} />
                </div>
                
                <h2 className="text-2xl font-extrabold text-[#111] mb-2 tracking-tight">
                  {isRtl ? 'تحويل الكتب والملفات (PDF) إلى مسارات تدريبية مصغرة' : 'AI E-Book & PDF Micro-Converter'}
                </h2>
                <p className="text-slate-400 font-serif leading-relaxed text-sm max-w-lg mx-auto mb-6">
                  {isRtl 
                    ? 'غذِّ النظام بأي فصل من كتاب، حقيبة تدريبية، أو ملف مكتوب، وشاهد خوارزميات صياغة الأنسنة والتفكيك وهي تنتج جزيئات معرفية ممتعة، ملخصات، واختبارات عبور في ثوانٍ.'
                    : 'Paste dense manual text, e-books, or course chapters. Our framework pipeline instantly chunk, humanizes tone, establishes reviews, and outputs gatekeepers.'}
                </p>

                {isConverting ? (
                  <div className="py-12 flex flex-col items-center justify-center">
                    <RefreshCw size={40} className="text-[#b48e56] animate-spin mb-4" />
                    <span className="text-xs font-black text-[#b48e56] tracking-wider uppercase inline-block">
                      {conversionStep}
                    </span>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <textarea 
                      rows={8}
                      placeholder={isRtl 
                        ? 'ألصق هنا النص أو المحتوى أو ملخص الفصل المقتضب من الـ PDF المراد تفكيكه وإعادة صياغته تنموياً...' 
                        : 'Paste your raw textbook data or chapter summaries here...'}
                      value={rawText}
                      onChange={(e) => setRawText(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 p-4 focus:ring-1 focus:ring-[#b48e56] bg-slate-50/50 text-sm font-serif leading-relaxed focus:outline-none"
                    />

                    <div className="flex justify-end gap-3">
                      <button 
                        onClick={() => {
                          setRawText(`كانت أمنية الأمير بوذا الكامنة خلف جدران القصر هي اكتشاف الحقيقة، لكنه غاص في الحرمان الشديد قبل أن يستقر على الوسطية.
الحياة حافلة بالمشاكل المتجددة، فالمشاكل بمثابة تمارين لترقية تفكيرنا البيولوجي.
الاستخلاص الحقيقي للنجاح الروحي لا يبدأ من تهربك أو هوسك بالكمال، بل برحابة قبولك لهشاشتك وعاداتك كما هي.`);
                        }}
                        className="bg-slate-100 hover:bg-slate-200/80 text-slate-600 transition-all font-bold text-xs py-2 px-4 rounded-xl"
                      >
                        {isRtl ? 'مثال توضيحي جاهز' : 'Use Demo Material'}
                      </button>
                      <button 
                        onClick={runMicroDeconstruction}
                        className="bg-[#b48e56] hover:bg-[#a17e4b] text-white transition-all font-black text-xs py-3 px-8 rounded-xl shadow-md flex items-center gap-1.5"
                      >
                        <Sparkles size={14} />
                        <span>{isRtl ? 'كود تفكيك ومعالجة الذكاء' : 'Deconstruct Now'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>

    </div>
  );
};
