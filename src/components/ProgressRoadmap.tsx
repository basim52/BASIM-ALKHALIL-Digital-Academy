import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { translations, Language } from '../lib/translations';
import { 
  Trophy, 
  CheckCircle2, 
  Download, 
  Brain, 
  ArrowUpRight, 
  Lock, 
  BookOpen, 
  Sparkles, 
  Award,
  Zap,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Target
} from 'lucide-react';
import { proficiencyLevel } from '../types';
import html2canvas from 'html2canvas';

interface ProgressRoadmapProps {
  lang: Language;
  currentLevel: string;
  studentName?: string;
  onNavigateToAdaptive?: () => void;
  onStartLevelTest?: () => void;
}

export interface CEFRLevelDetails {
  id: string;
  label: string;
  badge: string;
  icon: string;
  titleAr: string;
  titleEn: string;
  stageAr: string;
  stageEn: string;
  wordsTargetAr: string;
  wordsTargetEn: string;
  ieltsScore: string;
  cambridgeExam: string;
  grammarFocusAr: string;
  grammarFocusEn: string;
  canDoAr: string;
  canDoEn: string;
  colorGradient: string;
  accentColor: string;
  percentageThreshold: number;
}

export const CEFR_LEVELS_CATALOGUE: CEFRLevelDetails[] = [
  {
    id: proficiencyLevel.A1,
    label: 'A1',
    badge: '🌱',
    icon: '🌱',
    titleAr: 'المستوى التأسيسي والمبتدئ',
    titleEn: 'Beginner / Breakthrough',
    stageAr: 'مرحلة البداية والتأسيس',
    stageEn: 'Foundational Stage',
    wordsTargetAr: '500 - 800 كلمة شائعة',
    wordsTargetEn: '500 - 800 core words',
    ieltsScore: 'IELTS 2.0 - 3.0',
    cambridgeExam: 'Young Learners / A1 Movers',
    grammarFocusAr: 'الضمائر، الأفعال الأساسية (to be, have)، زمن المضارع البسيط، وتكوين الجمل القصيرة.',
    grammarFocusEn: 'Pronouns, basic verbs (be, have, do), present simple tense, and short question formation.',
    canDoAr: 'التعريف بالنفس والأسرة، إلقاء التحيات، السؤال عن الأسعار والاتجاهات، وفهم العبارات اليومية البسيطة.',
    canDoEn: 'Introduce oneself, greet politely, ask simple questions about directions and prices, and recognize basic everyday phrases.',
    colorGradient: 'from-blue-600 to-indigo-600',
    accentColor: '#2563eb',
    percentageThreshold: 17
  },
  {
    id: proficiencyLevel.A2,
    label: 'A2',
    badge: '🌿',
    icon: '🌿',
    titleAr: 'المستوى الأساسي والتعارف اليومي',
    titleEn: 'Elementary / Waystage',
    stageAr: 'مرحلة بناء الجمل والتواصل',
    stageEn: 'Conversational Basics',
    wordsTargetAr: '1,000 - 1,500 كلمة',
    wordsTargetEn: '1,000 - 1,500 words',
    ieltsScore: 'IELTS 3.5 - 4.0',
    cambridgeExam: 'Cambridge A2 Key (KET)',
    grammarFocusAr: 'زمن الماضي البسيط، المستقبل البسيط، صيغ المقارنة والتفضيل، وحروف الجر الزمنية والمكانية.',
    grammarFocusEn: 'Past simple, future will/going to, comparatives & superlatives, prepositions of time and place.',
    canDoAr: 'وصف الروتين اليومي، التحدث عن الرحلات والهوايات، التسوق وطلب الوجبات في المطعم، والتعبير عن الإعجاب والرفض.',
    canDoEn: 'Describe daily routines, recount past experiences, order food and shop confidently, and express personal likes and dislikes.',
    colorGradient: 'from-emerald-600 to-teal-600',
    accentColor: '#059669',
    percentageThreshold: 33
  },
  {
    id: proficiencyLevel.B1,
    label: 'B1',
    badge: '🌳',
    icon: '🌳',
    titleAr: 'المستوى المتوسط والطلاقة الحوارية',
    titleEn: 'Intermediate / Threshold',
    stageAr: 'مرحلة الاستقلالية والتعبير الحر',
    stageEn: 'Independent Speaker',
    wordsTargetAr: '2,000 - 3,000 كلمة',
    wordsTargetEn: '2,000 - 3,000 words',
    ieltsScore: 'IELTS 4.5 - 5.5',
    cambridgeExam: 'Cambridge B1 Preliminary (PET)',
    grammarFocusAr: 'المضارع التام، الجمل الشرطية (If Conditionals)، أفعال المودال، والمبني للمجهول البسيط.',
    grammarFocusEn: 'Present perfect, first & second conditionals, modal verbs (should/must), passive voice fundamentals.',
    canDoAr: 'إبداء الرأي في النقاشات، رواية القصص والمغامرات، حل المشكلات غير المتوقعة أثناء السفر، وكتابة نصوص مترابطة.',
    canDoEn: 'Express personal opinions, narrate personal stories, handle unexpected travel situations, and write coherent connected texts.',
    colorGradient: 'from-amber-500 to-amber-600',
    accentColor: '#d97706',
    percentageThreshold: 50
  },
  {
    id: proficiencyLevel.B2,
    label: 'B2',
    badge: '🌻',
    icon: '🌻',
    titleAr: 'فوق المتوسط والطلاقة الأكاديمية',
    titleEn: 'Upper Intermediate / Vantage',
    stageAr: 'مرحلة النقاش والطلاقة التلقائية',
    stageEn: 'Professional Fluency',
    wordsTargetAr: '4,000 - 5,000 كلمة',
    wordsTargetEn: '4,000 - 5,000 words',
    ieltsScore: 'IELTS 6.0 - 7.0',
    cambridgeExam: 'Cambridge B2 First (FCE)',
    grammarFocusAr: 'أزمنة الأفعال المركبة، الكلام المنقول (Reported Speech)، التراكيب الشرطية المتقدمة والمصطلحات الشائعة.',
    grammarFocusEn: 'Complex compound tenses, reported speech, mixed conditionals, idioms, and advanced phrasal verbs.',
    canDoAr: 'التحدث العفوي السلس دون تردد، النقاش في قضايا معقدة، كتابة مقالات نقدية، واستيعاب الأفلام والمحاضرات بسهولة.',
    canDoEn: 'Converse spontaneously without searching for words, debate complex issues, write analytical essays, and comprehend lectures easily.',
    colorGradient: 'from-orange-500 to-red-500',
    accentColor: '#ea580c',
    percentageThreshold: 67
  },
  {
    id: proficiencyLevel.C1,
    label: 'C1',
    badge: '🌟',
    icon: '🌟',
    titleAr: 'المستوى المتقدم والاحترافي',
    titleEn: 'Advanced / Autonomous',
    stageAr: 'مرحلة الكفاءة الفكرية واللغوية العالية',
    stageEn: 'Effective Proficiency',
    wordsTargetAr: '6,500 - 8,000 كلمة',
    wordsTargetEn: '6,500 - 8,000 words',
    ieltsScore: 'IELTS 7.5 - 8.0',
    cambridgeExam: 'Cambridge C1 Advanced (CAE)',
    grammarFocusAr: 'التراكيب البلاغية المعقدة، أسلوب التقديم والتأخير (Inversion)، والمفردات الأكاديمية والمهنية الدقيقة.',
    grammarFocusEn: 'Rhetorical devices, grammatical inversion, subtle subjunctive mood, and academic collocations.',
    canDoAr: 'فهم النصوص الطويلة واستيعاب المعاني الضمنية، استخدام اللغة بمرونة للأغراض الاجتماعية والأكاديمية، والإنتاج الفكري الواضح.',
    canDoEn: 'Understand implicit nuances in demanding texts, express ideas effortlessly, and produce clear, well-structured complex discourse.',
    colorGradient: 'from-purple-600 to-indigo-700',
    accentColor: '#7c3aed',
    percentageThreshold: 83
  },
  {
    id: proficiencyLevel.C2,
    label: 'C2',
    badge: '👑',
    icon: '👑',
    titleAr: 'الإتقان التام والطلاقة الشاملة',
    titleEn: 'Mastery / Near-Native',
    stageAr: 'مرحلة التحدث كأهل اللغة الأصليين',
    stageEn: 'Mastery & Native Parity',
    wordsTargetAr: '10,000+ كلمة متخصصة',
    wordsTargetEn: '10,000+ specialized words',
    ieltsScore: 'IELTS 8.5 - 9.0',
    cambridgeExam: 'Cambridge C2 Proficiency (CPE)',
    grammarFocusAr: 'التحكم التام والبديهي في أدق أسرار اللغة وفروقها المعنوية والأسلوبية.',
    grammarFocusEn: 'Effortless command of subtle stylistic nuances, stylistic shifts, and idiomatic precision.',
    canDoAr: 'فهم وتلخيص ونقد كل ما يُسمع أو يُقرأ دون أدنى جهد، والتعبير التلقائي الدقيق حتى في أعقد المواقف العلمية والأدبية.',
    canDoEn: 'Effortlessly summarize and critique information from disparate sources, and express spontaneously with high precision.',
    colorGradient: 'from-indigo-700 to-[#002147]',
    accentColor: '#002147',
    percentageThreshold: 100
  }
];

export const ProgressRoadmap: React.FC<ProgressRoadmapProps> = ({ 
  lang, 
  currentLevel, 
  studentName, 
  onNavigateToAdaptive,
  onStartLevelTest
}) => {
  const isRtl = lang === 'ar';
  const roadmapRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  
  // Find index of current student level
  const normalizedLevel = currentLevel?.toUpperCase() || 'A1';
  const currentIndex = CEFR_LEVELS_CATALOGUE.findIndex(l => l.id.toUpperCase() === normalizedLevel || l.label.toUpperCase() === normalizedLevel);
  const safeCurrentIndex = currentIndex === -1 ? 0 : currentIndex;

  // Selected level to inspect details (defaults to current level)
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevelDetails>(
    CEFR_LEVELS_CATALOGUE[safeCurrentIndex] || CEFR_LEVELS_CATALOGUE[0]
  );

  const selectedIndex = CEFR_LEVELS_CATALOGUE.findIndex(l => l.id === selectedLevel.id);

  const handleExportImage = async () => {
    if (!roadmapRef.current || isExporting) return;
    setIsExporting(true);
    
    try {
      const canvas = await html2canvas(roadmapRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById('cefr-unified-roadmap');
          if (clonedElement) {
            clonedElement.style.padding = '32px';
            clonedElement.style.borderRadius = '24px';
          }
        }
      });
      
      const link = document.createElement('a');
      link.download = `CEFR-Roadmap-${studentName ? studentName.replace(/\s+/g, '_') : 'Student'}-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Error exporting roadmap image:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const currentLevelData = CEFR_LEVELS_CATALOGUE[safeCurrentIndex];
  const overallProgressPercentage = Math.round(((safeCurrentIndex + 1) / CEFR_LEVELS_CATALOGUE.length) * 100);

  return (
    <div 
      id="cefr-unified-roadmap"
      ref={roadmapRef}
      className={`bg-white rounded-3xl p-5 sm:p-7 md:p-8 border border-slate-200/90 shadow-sm relative overflow-hidden ${isRtl ? 'font-arabic' : 'font-sans'}`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-amber-400 to-indigo-600" />

      {/* Unified Main Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#002147] to-[#0a3565] text-amber-300 flex items-center justify-center text-2xl shadow-md shrink-0 border border-amber-300/30">
            🗺️
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg sm:text-xl font-black text-[#002147]">
                {isRtl ? 'خارطة التقدم والمستويات للغات الأوروبية (CEFR)' : 'CEFR Global Language Roadmap'}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black border border-blue-200">
                {isRtl ? 'معيار دولي موثق' : 'Official International Standard'}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {isRtl 
                ? 'خارطة الطريق الأكاديمية لاكتساب الطلاقة الكاملة من التأسيس حتى الإتقان الشامل' 
                : 'Your structured path towards native-like English fluency & international certification'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          {onNavigateToAdaptive && (
            <button
              onClick={onNavigateToAdaptive}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:brightness-105 active:scale-98 text-white rounded-xl font-black text-xs transition-all shadow-xs cursor-pointer border border-white/20"
              title={isRtl ? 'تشخيص الثغرات والمسار التكيفي' : 'AI Adaptive Diagnosis'}
            >
              <Brain size={14} className="text-amber-300" />
              <span>{isRtl ? 'المسار التكيفي (AI)' : 'Adaptive AI Path'}</span>
              <ArrowUpRight size={13} />
            </button>
          )}

          <button
            onClick={handleExportImage}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-[#002147] text-white rounded-xl font-bold text-xs transition-all shadow-xs active:scale-98 cursor-pointer disabled:opacity-50"
            title={isRtl ? 'تحميل المسار كصورة عالية الدقة' : 'Download Roadmap Image'}
          >
            <Download size={13} className="text-amber-300" />
            <span>{isExporting ? (isRtl ? 'جاري التحميل...' : 'Downloading...') : (isRtl ? 'تحميل المسار كصورة' : 'Save as Image')}</span>
          </button>
        </div>
      </div>

      {/* Interactive Horizontal CEFR Nodes Track */}
      <div className="py-8 sm:py-10">
        <div className="text-center mb-6">
          <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider">
            {isRtl ? 'اضغط على أي مستوى لاستعراض مهاراته ومتطلباته:' : 'Click any level to inspect required skills & milestones:'}
          </span>
        </div>

        <div className="relative px-2 sm:px-6">
          {/* Background Connecting Track Line */}
          <div className="absolute top-1/2 left-8 right-8 h-2 bg-slate-100 -translate-y-6 rounded-full hidden sm:block" />
          
          {/* Active Filled Progress Line */}
          <div 
            className="absolute top-1/2 h-2 bg-gradient-to-r from-blue-600 via-emerald-500 to-amber-500 -translate-y-6 rounded-full transition-all duration-700 hidden sm:block"
            style={{
              [isRtl ? 'right' : 'left']: '2rem',
              width: `${Math.min(94, Math.max(5, (safeCurrentIndex / (CEFR_LEVELS_CATALOGUE.length - 1)) * 90))}%`
            }}
          />

          {/* Nodes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 sm:gap-2 items-start relative z-10">
            {CEFR_LEVELS_CATALOGUE.map((level, idx) => {
              const isCompleted = idx < safeCurrentIndex;
              const isCurrent = idx === safeCurrentIndex;
              const isSelected = selectedLevel.id === level.id;
              const isLocked = idx > safeCurrentIndex;

              return (
                <button
                  key={`cefr-node-${level.id}`}
                  onClick={() => setSelectedLevel(level)}
                  className={`w-full flex flex-col items-center p-2 rounded-2xl transition-all cursor-pointer text-center relative group ${
                    isSelected ? 'scale-105' : 'hover:scale-102'
                  }`}
                >
                  {/* Visual Node Orb */}
                  <div className={`w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center text-2xl sm:text-3xl relative transition-all shadow-md ${
                    isCurrent
                      ? `bg-gradient-to-br ${level.colorGradient} text-white shadow-xl ring-4 ring-blue-400/40 scale-110`
                      : isCompleted
                        ? 'bg-emerald-50 text-emerald-700 border-2 border-emerald-400/60 shadow-xs'
                        : isSelected
                          ? 'bg-slate-100 border-2 border-slate-400 text-slate-800'
                          : 'bg-slate-50 border border-slate-200 text-slate-400 opacity-70'
                  }`}>
                    <span className={isCurrent ? 'animate-bounce' : ''}>{level.badge}</span>

                    {/* Status Badge Overlays */}
                    {isCompleted && (
                      <div className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white p-1 rounded-full shadow-md">
                        <CheckCircle2 size={14} />
                      </div>
                    )}

                    {isCurrent && (
                      <span className="absolute -top-2.5 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] shadow-sm uppercase tracking-wider animate-pulse">
                        {isRtl ? 'المستوى الحالي' : 'Active'}
                      </span>
                    )}

                    {isLocked && !isCompleted && !isCurrent && (
                      <div className="absolute -bottom-1 -right-1 bg-slate-300 text-slate-600 p-1 rounded-full shadow-xs">
                        <Lock size={11} />
                      </div>
                    )}
                  </div>

                  {/* Level Code & Name */}
                  <div className="mt-3 flex flex-col items-center">
                    <span className={`text-base sm:text-lg font-black ${
                      isCurrent ? 'text-blue-700' : isCompleted ? 'text-emerald-700' : 'text-slate-600'
                    }`}>
                      {level.label}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold truncate max-w-[90px]">
                      {isRtl ? level.stageAr.split(' ')[1] || level.stageAr : level.titleEn.split('/')[0]}
                    </span>
                    
                    {/* Active Selection Indicator */}
                    <div className={`h-1 w-6 rounded-full mt-1.5 transition-all ${
                      isSelected ? 'bg-amber-400 w-10' : 'bg-transparent'
                    }`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Level Detailed Showcase Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`level-card-${selectedLevel.id}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-slate-50 border-2 border-slate-200/90 rounded-3xl p-4 sm:p-6 space-y-4 shadow-inner"
        >
          {/* Header of Selected Level */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <span className="text-3xl p-2 bg-white rounded-2xl border border-slate-200 shadow-xs">
                {selectedLevel.badge}
              </span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base sm:text-lg font-black text-[#002147]">
                    {selectedLevel.label} — {isRtl ? selectedLevel.titleAr : selectedLevel.titleEn}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                    selectedIndex === safeCurrentIndex
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : selectedIndex < safeCurrentIndex
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-slate-200 text-slate-700'
                  }`}>
                    {selectedIndex === safeCurrentIndex 
                      ? (isRtl ? '🎯 مستواك الفعلي حالياً' : '🎯 Your Current Enrolled Level')
                      : selectedIndex < safeCurrentIndex
                        ? (isRtl ? '✅ تم إتقان هذا المستوى' : '✅ Completed Level')
                        : (isRtl ? '🔒 مستوى قادم' : '🔒 Upcoming Milestone')}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-bold mt-0.5">
                  {isRtl ? selectedLevel.stageAr : selectedLevel.stageEn}
                </p>
              </div>
            </div>

            {/* International Benchmark Pill */}
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-2xl border border-slate-200 shadow-2xs self-start sm:self-auto">
              <Award size={15} className="text-amber-500 shrink-0" />
              <div className="text-start">
                <span className="text-[10px] text-slate-400 font-black block uppercase tracking-wider leading-none">
                  {isRtl ? 'المكافئ الدولي:' : 'Global Equivalents:'}
                </span>
                <span className="text-xs font-black text-[#002147]">
                  {selectedLevel.ieltsScore} • {selectedLevel.cambridgeExam.split('/')[0]}
                </span>
              </div>
            </div>
          </div>

          {/* 4 Pillars of this Level Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* 1. Vocabulary Target */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 text-blue-700 font-black text-xs">
                <BookOpen size={14} />
                <span>{isRtl ? 'الحصيلة والمفردات المستهدفة:' : 'Vocabulary Target:'}</span>
              </div>
              <p className="text-xs text-slate-700 font-bold leading-relaxed">
                {isRtl ? selectedLevel.wordsTargetAr : selectedLevel.wordsTargetEn}
              </p>
            </div>

            {/* 2. Grammar & Structure */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 text-purple-700 font-black text-xs">
                <Sparkles size={14} />
                <span>{isRtl ? 'التركيز القواعدي والتركيب:' : 'Grammar Competency:'}</span>
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                {isRtl ? selectedLevel.grammarFocusAr : selectedLevel.grammarFocusEn}
              </p>
            </div>

            {/* 3. Speaking & Practical Can-Do */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1 md:col-span-2">
              <div className="flex items-center gap-1.5 text-emerald-700 font-black text-xs">
                <ShieldCheck size={14} />
                <span>{isRtl ? 'القدرات اللغوية والتواصل الواقعي (Can-Do Descriptors):' : 'Spoken Communication & Can-Do Skills:'}</span>
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                {isRtl ? selectedLevel.canDoAr : selectedLevel.canDoEn}
              </p>
            </div>
          </div>

          {/* Next Action Call-to-Action for Current Level */}
          {selectedIndex === safeCurrentIndex && onStartLevelTest && (
            <div className="bg-gradient-to-r from-[#002147] via-[#093568] to-[#002147] rounded-2xl p-4 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-2.5 text-center sm:text-start">
                <Target size={22} className="text-amber-300 shrink-0" />
                <div>
                  <h4 className="font-black text-xs sm:text-sm text-white">
                    {isRtl 
                      ? `جاهز للترقية والانتقال إلى المستوى التالي (${CEFR_LEVELS_CATALOGUE[Math.min(CEFR_LEVELS_CATALOGUE.length - 1, safeCurrentIndex + 1)].label})؟` 
                      : `Ready to test for the next level (${CEFR_LEVELS_CATALOGUE[Math.min(CEFR_LEVELS_CATALOGUE.length - 1, safeCurrentIndex + 1)].label})?`}
                  </h4>
                  <p className="text-[11px] text-amber-200/80 font-medium">
                    {isRtl ? 'خض اختبار تحديد وترقية المستوى المعتمد لتحديث ملفك الأكاديمي' : 'Take the certified placement exam to advance your level profile'}
                  </p>
                </div>
              </div>

              <button
                onClick={onStartLevelTest}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 hover:brightness-105 active:scale-98 text-slate-950 font-black text-xs transition-all shadow-md shrink-0 cursor-pointer border border-white/30"
              >
                {isRtl ? 'بدء اختبار ترقية المستوى 🎯' : 'Start Level Test 🎯'}
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Bottom Summary Bar */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2 font-bold">
          <Trophy size={16} className="text-amber-500" />
          <span>
            {isRtl 
              ? `المستوى الحالي المسجل: ${currentLevelData?.label} (${currentLevelData?.titleAr})` 
              : `Current Enrolled Level: ${currentLevelData?.label} (${currentLevelData?.titleEn})`}
          </span>
        </div>

        <div className="flex items-center gap-2 font-black text-[#002147]">
          <span>{isRtl ? 'نسبة إنجاز المسار الكلي:' : 'Overall Path Completion:'}</span>
          <span className="px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 font-extrabold text-xs">
            {overallProgressPercentage}%
          </span>
        </div>
      </div>
    </div>
  );
};
