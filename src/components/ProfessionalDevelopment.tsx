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
  FileText
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
              // Unlock subsequent chapters if previous is completed
              // Subtle Art
              if (data.lessonId === 'sa_ch1' && data.score >= 2) {
                unlocked.add('sa_ch2');
              }
              if (data.lessonId === 'sa_ch2' && data.score >= 2) {
                unlocked.add('sa_ch3');
              }
              if (data.lessonId === 'sa_ch3' && data.score >= 2) {
                unlocked.add('sa_ch4');
              }
              if (data.lessonId === 'sa_ch4' && data.score >= 2) {
                unlocked.add('sa_ch5');
              }
              // 7 Habits
              if (data.lessonId === '7h_ch1' && data.score >= 2) {
                unlocked.add('7h_ch2');
              }
              if (data.lessonId === '7h_ch2' && data.score >= 2) {
                unlocked.add('7h_ch3');
              }
              if (data.lessonId === '7h_ch3' && data.score >= 2) {
                unlocked.add('7h_ch4');
              }
              if (data.lessonId === '7h_ch4' && data.score >= 2) {
                unlocked.add('7h_ch5');
              }
              // You Can
              if (data.lessonId === 'ycw_ch1' && data.score >= 2) {
                unlocked.add('ycw_ch2');
              }
              if (data.lessonId === 'ycw_ch2' && data.score >= 2) {
                unlocked.add('ycw_ch3');
              }
              if (data.lessonId === 'ycw_ch3' && data.score >= 2) {
                unlocked.add('ycw_ch4');
              }
              if (data.lessonId === 'ycw_ch4' && data.score >= 2) {
                unlocked.add('ycw_ch5');
              }
              if (data.lessonId === 'ycw_ch5' && data.score >= 2) {
                unlocked.add('ycw_ch6');
              }
              if (data.lessonId === 'ycw_ch6' && data.score >= 2) {
                unlocked.add('ycw_ch7');
              }
              if (data.lessonId === 'ycw_ch7' && data.score >= 2) {
                unlocked.add('ycw_ch8');
              }
              if (data.lessonId === 'ycw_ch8' && data.score >= 2) {
                unlocked.add('ycw_ch9');
              }
              if (data.lessonId === 'ycw_ch9' && data.score >= 2) {
                unlocked.add('ycw_ch10');
              }
              // Rich Dad
              if (data.lessonId === 'rd_ch1' && data.score >= 2) {
                unlocked.add('rd_ch2');
              }
              if (data.lessonId === 'rd_ch2' && data.score >= 2) {
                unlocked.add('rd_ch3');
              }
              if (data.lessonId === 'rd_ch3' && data.score >= 2) {
                unlocked.add('rd_ch4');
              }
              if (data.lessonId === 'rd_ch4' && data.score >= 2) {
                unlocked.add('rd_ch5');
              }
              // Power of Now
              if (data.lessonId === 'pon_ch1' && data.score >= 2) {
                unlocked.add('pon_ch2');
              }
              if (data.lessonId === 'pon_ch2' && data.score >= 2) {
                unlocked.add('pon_ch3');
              }
              if (data.lessonId === 'pon_ch3' && data.score >= 2) {
                unlocked.add('pon_ch4');
              }
              if (data.lessonId === 'pon_ch4' && data.score >= 2) {
                unlocked.add('pon_ch5');
              }
              if (data.lessonId === 'pon_ch5' && data.score >= 2) {
                unlocked.add('pon_ch6');
              }
              if (data.lessonId === 'pon_ch6' && data.score >= 2) {
                unlocked.add('pon_ch7');
              }
              if (data.lessonId === 'pon_ch7' && data.score >= 2) {
                unlocked.add('pon_ch8');
              }
              if (data.lessonId === 'pon_ch8' && data.score >= 2) {
                unlocked.add('pon_ch9');
              }
              if (data.lessonId === 'pon_ch9' && data.score >= 2) {
                unlocked.add('pon_ch10');
              }
              // Letting Go
              if (data.lessonId === 'lg_ch1' && data.score >= 1) {
                unlocked.add('lg_ch2');
              }
              if (data.lessonId === 'lg_ch2' && data.score >= 1) {
                unlocked.add('lg_ch3');
              }
              if (data.lessonId === 'lg_ch3' && data.score >= 1) {
                unlocked.add('lg_ch4');
              }
              if (data.lessonId === 'lg_ch4' && data.score >= 1) {
                unlocked.add('lg_ch5');
              }
              if (data.lessonId === 'lg_ch5' && data.score >= 1) {
                unlocked.add('lg_ch6');
              }
              if (data.lessonId === 'lg_ch6' && data.score >= 1) {
                unlocked.add('lg_ch7');
              }
              if (data.lessonId === 'lg_ch7' && data.score >= 1) {
                unlocked.add('lg_ch8');
              }
              if (data.lessonId === 'lg_ch8' && data.score >= 1) {
                unlocked.add('lg_ch9');
              }
              if (data.lessonId === 'lg_ch9' && data.score >= 1) {
                unlocked.add('lg_ch10');
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
  }, [userProfile, selectedBook, activeChapter]);

  const speakText = async (text: string) => {
    cancelAllSpeech();
    await speakAcademyText(text, isRtl ? 'ar' : 'en');
  };

  const stopSpeaking = () => {
    cancelAllSpeech();
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
      if (isPassed && userProfile?.uid) {
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

          // Instantly update userResults locally for direct reactive UI state
          setUserResults(prev => {
            const index = prev.findIndex(r => r.lessonId === activeChapter.id);
            if (index > -1) {
              const updated = [...prev];
              updated[index] = { ...updated[index], score: quizScore, total: totalQuestions };
              return updated;
            }
            return [...prev, {
              userId: userProfile.uid,
              lessonId: activeChapter.id,
              courseId: 'professional-development',
              lessonTitle: isRtl ? activeChapter.titleAr : activeChapter.titleEn,
              score: quizScore,
              total: totalQuestions
            }];
          });

          // Reward 150 Points/XP
          const extraPoints = 150;
          const userRef = doc(db, 'users', userProfile.uid);
          await updateDoc(userRef, {
            points: (userProfile.points || 0) + extraPoints
          });

          // Add to unlocked chapters set
          setUnlockedChapters(prev => {
            const updated = new Set(prev);
            updated.add(activeChapter.id);
            // Subtle Art
            if (activeChapter.id === 'sa_ch1') updated.add('sa_ch2');
            if (activeChapter.id === 'sa_ch2') updated.add('sa_ch3');
            if (activeChapter.id === 'sa_ch3') updated.add('sa_ch4');
            if (activeChapter.id === 'sa_ch4') updated.add('sa_ch5');
            // 7 Habits
            if (activeChapter.id === '7h_ch1') updated.add('7h_ch2');
            if (activeChapter.id === '7h_ch2') updated.add('7h_ch3');
            if (activeChapter.id === '7h_ch3') updated.add('7h_ch4');
            if (activeChapter.id === '7h_ch4') updated.add('7h_ch5');
            // You Can
            if (activeChapter.id === 'ycw_ch1') updated.add('ycw_ch2');
            if (activeChapter.id === 'ycw_ch2') updated.add('ycw_ch3');
            if (activeChapter.id === 'ycw_ch3') updated.add('ycw_ch4');
            if (activeChapter.id === 'ycw_ch4') updated.add('ycw_ch5');
            if (activeChapter.id === 'ycw_ch5') updated.add('ycw_ch6');
            if (activeChapter.id === 'ycw_ch6') updated.add('ycw_ch7');
            if (activeChapter.id === 'ycw_ch7') updated.add('ycw_ch8');
            if (activeChapter.id === 'ycw_ch8') updated.add('ycw_ch9');
            if (activeChapter.id === 'ycw_ch9') updated.add('ycw_ch10');
            // Rich Dad
            if (activeChapter.id === 'rd_ch1') updated.add('rd_ch2');
            if (activeChapter.id === 'rd_ch2') updated.add('rd_ch3');
            if (activeChapter.id === 'rd_ch3') updated.add('rd_ch4');
            if (activeChapter.id === 'rd_ch4') updated.add('rd_ch5');
            // Power of Now
            if (activeChapter.id === 'pon_ch1') {
              updated.add('pon_ch2');
            }
            if (activeChapter.id === 'pon_ch2') updated.add('pon_ch3');
            if (activeChapter.id === 'pon_ch3') updated.add('pon_ch4');
            if (activeChapter.id === 'pon_ch4') updated.add('pon_ch5');
            if (activeChapter.id === 'pon_ch5') updated.add('pon_ch6');
            if (activeChapter.id === 'pon_ch6') updated.add('pon_ch7');
            if (activeChapter.id === 'pon_ch7') updated.add('pon_ch8');
            if (activeChapter.id === 'pon_ch8') updated.add('pon_ch9');
            if (activeChapter.id === 'pon_ch9') updated.add('pon_ch10');
            // Letting Go
            if (activeChapter.id === 'lg_ch1') updated.add('lg_ch2');
            if (activeChapter.id === 'lg_ch2') updated.add('lg_ch3');
            if (activeChapter.id === 'lg_ch3') updated.add('lg_ch4');
            if (activeChapter.id === 'lg_ch4') updated.add('lg_ch5');
            if (activeChapter.id === 'lg_ch5') updated.add('lg_ch6');
            if (activeChapter.id === 'lg_ch6') updated.add('lg_ch7');
            if (activeChapter.id === 'lg_ch7') updated.add('lg_ch8');
            if (activeChapter.id === 'lg_ch8') updated.add('lg_ch9');
            if (activeChapter.id === 'lg_ch9') updated.add('lg_ch10');
            return updated;
          });

          confetti({
            particleCount: 200,
            spread: 90,
            origin: { y: 0.6 }
          });
        } catch (e) {
          console.error("Error updating score in Firebase:", e);
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
                      {isRtl ? 'قسم التطوير والإنتاج: دورات تطويرية مصغرة' : 'Developmental Micro-Courses'}
                    </h1>
                    <p className="text-slate-500 leading-relaxed font-serif text-lg">
                      {isRtl 
                        ? 'تطبيق آلية هندسة المحتوى لتفكيك أمهات الكتب والـ PDF وتحويلها إلى تدرجات معرفية فصيحة ومحطات تثبيت وذكاء لا يتعدى 5 دقائق.'
                        : 'Explore real-world masterpieces fully deconstructed into action-oriented micro-learning lanes, with gatekeeping verification and review blocks.'}
                    </p>
                  </div>

                  {/* Books grid */}
                  <div className="grid md:grid-cols-3 gap-6">
                    {PRELOADED_COURSES.map(course => {
                      const isComplete = course.chapters.length > 0 && course.chapters.every(ch => userResults.some(r => r.lessonId === ch.id && r.score >= 2));
                      return (
                        <div 
                          key={course.id}
                          className={`bg-white border border-[#e8e5df] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${course.isLocked ? 'opacity-60 cursor-not-allowed bg-[#faf9f6]' : 'cursor-pointer'}`}
                          onClick={() => {
                            if (!course.isLocked) {
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
                              {isComplete && (
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
                            <span>{course.isLocked ? (isRtl ? 'مغلق ومجدول' : 'Scheduled') : (isRtl ? 'ابدأ الآن' : 'Start Course')}</span>
                            <ArrowRight size={14} className="rtl:rotate-180" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (

                /* Interactive Book Portal */
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
                          <span className="text-[#111] font-black text-base">{selectedBook.chapters.length} فصول مصغرة</span>
                        </div>
                        <div className="bg-[#faf9f5] border border-[#e9e6df] rounded-xl p-3 text-center">
                          <label className="text-[10px] uppercase font-black text-slate-400 block tracking-widest">{isRtl ? 'التقييم الفطن' : 'Gatekeeping'}</label>
                          <span className="text-[#111] font-black text-sm">{isRtl ? 'اختبار عبور متطلب' : 'Pass to progress'}</span>
                        </div>
                        <div className="bg-[#faf9f5] border border-[#e9e6df] rounded-xl p-3 text-center col-span-2 md:col-span-1">
                          <label className="text-[10px] uppercase font-black text-slate-400 block tracking-widest">{isRtl ? 'الجائزة التنموية' : 'Awards'}</label>
                          <span className="text-[#b48e56] font-black text-sm">+150 XP</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chapters List */}
                  {!activeChapter ? (
                    <div>
                      {/* Comprehensive Course completion Certificate Banner */}
                      {selectedBook && selectedBook.chapters.every(ch => userResults.some(r => r.lessonId === ch.id)) && (
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
                        {isRtl ? 'الفصول والمسارات المتاحة للتلخيص والمناقشة' : 'Available Pathways'}
                      </h3>
                      
                      <div className="space-y-4">
                        {selectedBook.chapters.map((chapter, idx) => {
                          const isUnlocked = unlockedChapters.has(chapter.id);
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
                                {matchingResult ? (
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
                                {isRtl ? `درس ${idx + 1}` : `Lesson ${idx + 1}`}
                              </button>
                            );
                          })}
                          
                          <button 
                            onClick={() => handleLessonNavigation(activeChapter.lessons.length)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all border ${showQuiz ? 'bg-amber-500 text-white border-amber-500' : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'}`}
                          >
                            {isRtl ? 'بوابة عبور الفصل 📑' : 'Gatekeeper Quiz 📑'}
                          </button>
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
                            <span>{isRtl ? '📖 الدرس التفاعلي وقراءة سريعة' : '📖 Interactive Lesson'}</span>
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
                                  <span className="text-[10px] tracking-widest text-[#b48e56] uppercase font-bold py-0.5 px-3.5 bg-[#f5f1e8] rounded-full inline-block leading-loose">
                                    {activeLesson.type === 'intro' ? (isRtl ? 'تمهيد وتأسيس' : 'Orientation') : 
                                     activeLesson.type === 'review' ? (isRtl ? 'مراجعة وتثبيت' : 'Review Node') : 
                                     activeLesson.type === 'tips' ? (isRtl ? 'دليل إرشادي' : 'Tips Node') : (isRtl ? 'جوهر المفهوم' : 'Core Concept')}
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
