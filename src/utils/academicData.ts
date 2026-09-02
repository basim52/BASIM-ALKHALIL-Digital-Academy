import { 
  BookOpen, 
  Brain, 
  PenTool, 
  Mic, 
  Globe, 
  Gamepad2, 
  Volume2, 
  Flame, 
  Award, 
  MessageSquare, 
  Baby, 
  CheckCircle2, 
  Sparkles,
  LucideIcon 
} from 'lucide-react';

export interface AcademicPillar {
  id: string;
  key: string;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  icon: LucideIcon;
  color: string;
  bgGradient: string;
  borderColor: string;
  textColor: string;
  route: string;
}

export const ACADEMIC_PILLARS: AcademicPillar[] = [
  {
    id: 'grammar',
    key: 'grammar',
    nameAr: 'القواعد والتراكيب النحوية',
    nameEn: 'Grammar & Syntax',
    descAr: 'المعادلات النحوية البصرية، تشخيص الجمل، وألغاز غرف الهروب للقواعد.',
    descEn: 'Visual syntax formulas, live sentence diagnosis, and escape room logic puzzles.',
    icon: Brain,
    color: 'bg-blue-500',
    bgGradient: 'from-blue-600 to-indigo-700',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-600',
    route: 'grammar-academy'
  },
  {
    id: 'reading',
    key: 'reading',
    nameAr: 'القراءة والطلاقة والاستيعاب',
    nameEn: 'Reading & Comprehension',
    descAr: 'النصوص التفاعلية المسموعة المتزامنة، القاموس السياقي، واختبارات قياس الفهم.',
    descEn: 'Audio-synchronized reading passages, contextual dictionaries, and comprehension quizzes.',
    icon: BookOpen,
    color: 'bg-emerald-500',
    bgGradient: 'from-emerald-600 to-teal-700',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-600',
    route: 'reading-lab'
  },
  {
    id: 'writing',
    key: 'writing',
    nameAr: 'التعبير والكتابة والإملاء',
    nameEn: 'Writing, Expression & Spelling',
    descAr: 'صياغة المقالات مع تصحيح الذكاء الاصطناعي، أدوات البلاغة، والإملاء الصوتي العلمي.',
    descEn: 'AI essay evaluation, rhetorical transitions, and phonics spelling drills.',
    icon: PenTool,
    color: 'bg-purple-500',
    bgGradient: 'from-purple-600 to-fuchsia-700',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-600',
    route: 'writing-spelling-studio'
  },
  {
    id: 'pronunciation',
    key: 'pronunciation',
    nameAr: 'المخارج والنطق الصوتي',
    nameEn: 'Phonetics & Pronunciation',
    descAr: 'تحليل الموجات الصوتية الفوري، قياس النبرة، وتدريبات النطق الدقيق للكلمات.',
    descEn: 'Real-time mic waveform analysis, syllable coloring, and pitch calibration.',
    icon: Mic,
    color: 'bg-amber-500',
    bgGradient: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-600',
    route: 'pronunciation-lab'
  },
  {
    id: 'translation',
    key: 'translation',
    nameAr: 'الترجمة الحية وسياق اللغات',
    nameEn: 'Live Translation & Context',
    descAr: 'الترجمة بالسياقات والمستويات المتعددة، تفكيك القواعد، ومطابقة العبارات.',
    descEn: 'Multi-tone contextual translation, grammar block breakdown, and matching games.',
    icon: Globe,
    color: 'bg-teal-500',
    bgGradient: 'from-teal-600 to-cyan-700',
    borderColor: 'border-teal-200',
    textColor: 'text-teal-600',
    route: 'live-translate'
  },
  {
    id: 'games_etiquette',
    key: 'games_etiquette',
    nameAr: 'الألعاب التعليمية والآداب الراقية',
    nameEn: 'Educational Games & Etiquette',
    descAr: 'ألغاز الذوق والآداب، تصحيح العادات اليومية، وكاريوكي الأغاني الإنجليزية.',
    descEn: 'Social manners, daily habit corrections, flashcards, and lyric karaoke.',
    icon: Gamepad2,
    color: 'bg-rose-500',
    bgGradient: 'from-rose-500 to-pink-600',
    borderColor: 'border-rose-200',
    textColor: 'text-rose-600',
    route: 'educational-games'
  },
  {
    id: 'stories',
    key: 'stories',
    nameAr: 'القصص المسموعة ومغامرات نور',
    nameEn: 'Audio Stories & Adventures',
    descAr: 'سلسلة مغامرات نور في لندن المسموعة، نصوص متزامنة، واختبارات الاستماع.',
    descEn: 'Noor in London audio adventures, synced reader, and vocabulary quizzes.',
    icon: Volume2,
    color: 'bg-indigo-500',
    bgGradient: 'from-indigo-600 to-blue-700',
    borderColor: 'border-indigo-200',
    textColor: 'text-indigo-600',
    route: 'kids-story-player'
  },
  {
    id: 'daily_dose',
    key: 'daily_dose',
    nameAr: 'الجرعة اليومية وتصحيح الأخطاء',
    nameEn: 'Daily Dose & Error Clinic',
    descAr: 'شذرات لغوية تفاعلية مركزة وتصحيح الأخطاء الشائعة في 5 دقائق.',
    descEn: 'High-impact 5-minute micro-learning focused on error eradication and nuance.',
    icon: Flame,
    color: 'bg-orange-500',
    bgGradient: 'from-orange-500 to-amber-600',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-600',
    route: 'adults-daily-dose'
  },
  {
    id: 'oxford',
    key: 'oxford',
    nameAr: 'سلسلة مناهج أكسفورد المصورة',
    nameEn: 'Oxford Discover Curriculum',
    descAr: 'المنهج التفاعلي الدولي من أكسفورد، أسئلة الوحدة، والأنشطة الإثرائية.',
    descEn: 'Comprehensive Oxford Discover modules, big questions, and unit activities.',
    icon: Award,
    color: 'bg-blue-600',
    bgGradient: 'from-blue-700 to-slate-900',
    borderColor: 'border-blue-300',
    textColor: 'text-blue-700',
    route: 'oxford-discover'
  },
  {
    id: 'conversation',
    key: 'conversation',
    nameAr: 'المحادثة والذكاء الاصطناعي',
    nameEn: 'AI Dialogue & Fluency',
    descAr: 'التحدث الصوتي المباشر مع رفيق المحادثة الذكي وتصحيح الأخطاء التلقائي.',
    descEn: 'Voice-to-voice interactive conversations with instant feedback and correction.',
    icon: MessageSquare,
    color: 'bg-cyan-500',
    bgGradient: 'from-cyan-600 to-blue-600',
    borderColor: 'border-cyan-200',
    textColor: 'text-cyan-600',
    route: 'ai-chat'
  },
  {
    id: 'early_childhood',
    key: 'early_childhood',
    nameAr: 'الطفولة المبكرة والبراعم',
    nameEn: 'Early Childhood Phonics',
    descAr: 'تأسيس الحروف الهجائية، الكلمات الأولى البسيطة، وألعاب بناء الذاكرة للصغار.',
    descEn: 'Preschool phonics, first vocabulary, alphabet shapes, and picture games.',
    icon: Baby,
    color: 'bg-pink-500',
    bgGradient: 'from-pink-500 to-rose-600',
    borderColor: 'border-pink-200',
    textColor: 'text-pink-600',
    route: 'early-childhood'
  },
  {
    id: 'assessments',
    key: 'assessments',
    nameAr: 'الاختبارات الشاملة وتحديد المستوى',
    nameEn: 'Comprehensive Assessments & Placement',
    descAr: 'الاختبارات الدورية النصف شهرية، اختبارات تحديد المستوى والتقييم النهائي.',
    descEn: 'Bi-weekly tests, placement diagnostic exams, and term assessments.',
    icon: CheckCircle2,
    color: 'bg-violet-600',
    bgGradient: 'from-violet-600 to-indigo-800',
    borderColor: 'border-violet-200',
    textColor: 'text-violet-600',
    route: 'academic-planner'
  }
];

/**
 * Maps any result entry (from Firestore `lessonResults`) to one of our standardized academic pillars
 */
export function mapResultToPillar(item: any): AcademicPillar {
  const course = String(item.courseId || '').toLowerCase().trim();
  const lesson = String(item.lessonId || '').toLowerCase().trim();
  const title = String(item.lessonTitle || '').toLowerCase().trim();

  // 1. Grammar
  if (
    course.includes('grammar') || 
    course.includes('syntax') || 
    course === 'escape_room' || 
    lesson.startsWith('g_') || 
    lesson.startsWith('puz_') ||
    title.includes('grammar') || 
    title.includes('قواعد')
  ) {
    return ACADEMIC_PILLARS.find(p => p.id === 'grammar')!;
  }

  // 2. Reading
  if (
    course.includes('reading') || 
    lesson.startsWith('r_') || 
    lesson.startsWith('read_') ||
    title.includes('reading') || 
    title.includes('قراءة')
  ) {
    return ACADEMIC_PILLARS.find(p => p.id === 'reading')!;
  }

  // 3. Writing & Spelling
  if (
    course.includes('writing') || 
    course.includes('spelling') || 
    course.includes('expression') || 
    lesson.startsWith('w_') || 
    lesson.startsWith('spell_') || 
    title.includes('writing') || 
    title.includes('كتابة') || 
    title.includes('إملاء')
  ) {
    return ACADEMIC_PILLARS.find(p => p.id === 'writing')!;
  }

  // 4. Pronunciation
  if (
    course.includes('pronunciation') || 
    course.includes('phonetic') || 
    lesson.includes('pronunciation') || 
    title.includes('pronunciation') || 
    title.includes('نطق')
  ) {
    return ACADEMIC_PILLARS.find(p => p.id === 'pronunciation')!;
  }

  // 5. Translation
  if (
    course.includes('translate') || 
    course.includes('translation') || 
    title.includes('translate') || 
    title.includes('ترجمة')
  ) {
    return ACADEMIC_PILLARS.find(p => p.id === 'translation')!;
  }

  // 6. Educational Games & Etiquette
  if (
    course.includes('game') || 
    course.includes('etiquette') || 
    course.includes('habit') || 
    course === 'family_activities' || 
    course === 'english_songs' || 
    course === 'animated_storyboard' || 
    course === 'flashcards_hub' ||
    lesson.startsWith('song_') || 
    lesson.startsWith('fc_')
  ) {
    return ACADEMIC_PILLARS.find(p => p.id === 'games_etiquette')!;
  }

  // 7. Stories & Noor's Adventures
  if (
    course.includes('story') || 
    course.includes('stories') || 
    course.includes('noor') || 
    lesson.startsWith('story_') || 
    lesson.startsWith('kids_story_')
  ) {
    return ACADEMIC_PILLARS.find(p => p.id === 'stories')!;
  }

  // 8. Daily Dose
  if (
    course.includes('daily') || 
    course.includes('dose') || 
    lesson.startsWith('dose_') || 
    lesson.startsWith('dd_')
  ) {
    return ACADEMIC_PILLARS.find(p => p.id === 'daily_dose')!;
  }

  // 9. Oxford Series
  if (
    course.includes('oxford') || 
    lesson.startsWith('ox_') || 
    title.includes('oxford')
  ) {
    return ACADEMIC_PILLARS.find(p => p.id === 'oxford')!;
  }

  // 10. Conversation & AI Chat
  if (
    course.includes('conversation') || 
    course.includes('chat') || 
    course.includes('dialog') || 
    title.includes('conversation') || 
    title.includes('محادثة')
  ) {
    return ACADEMIC_PILLARS.find(p => p.id === 'conversation')!;
  }

  // 11. Early Childhood
  if (
    course.includes('child') || 
    course.includes('toddler') || 
    course.includes('early') || 
    lesson.startsWith('toddler_')
  ) {
    return ACADEMIC_PILLARS.find(p => p.id === 'early_childhood')!;
  }

  // 12. Assessments & Tests
  if (
    course.includes('test') || 
    course.includes('placement') || 
    course.includes('exam') || 
    course.includes('assessment') || 
    lesson.startsWith('test_')
  ) {
    return ACADEMIC_PILLARS.find(p => p.id === 'assessments')!;
  }

  // Default fallback to general grammar/skills
  return ACADEMIC_PILLARS[0];
}

export interface StandardizedResult {
  id: string;
  pillar: AcademicPillar;
  lessonId: string;
  lessonTitle: string;
  score: number;
  total: number;
  percentage: number;
  level?: string;
  timestamp: Date;
  rawItem: any;
}

export interface AcademicKPIs {
  totalActivities: number;
  overallGPA: number;
  estimatedHours: number;
  pillarStats: {
    [pillarId: string]: {
      pillar: AcademicPillar;
      count: number;
      avgScore: number;
      masteryTier: 'mastered' | 'proficient' | 'in_progress' | 'unattempted';
    };
  };
  inferredCefrLevel: string;
  weakestPillars: AcademicPillar[];
  strongestPillars: AcademicPillar[];
  weeklyActivity: { name: string; dayIndex: number; count: number; avg: number }[];
  timeOfDayActivity: { name: string; count: number; color: string }[];
}

export function processAcademicResults(rawResults: any[], isRtl = true): {
  standardized: StandardizedResult[];
  kpis: AcademicKPIs;
} {
  const standardized: StandardizedResult[] = rawResults.map((r, idx) => {
    const pillar = mapResultToPillar(r);
    const score = typeof r.score === 'number' ? r.score : 0;
    const total = typeof r.total === 'number' && r.total > 0 ? r.total : (score > 0 ? score : 100);
    const percentage = total > 0 ? Math.min(100, Math.round((score / total) * 100)) : 0;
    
    let dt = new Date();
    if (r.timestamp?.toDate) {
      dt = r.timestamp.toDate();
    } else if (r.timestamp instanceof Date) {
      dt = r.timestamp;
    } else if (typeof r.timestamp === 'string' || typeof r.timestamp === 'number') {
      dt = new Date(r.timestamp);
    }

    return {
      id: r.id || `res-${idx}-${Date.now()}`,
      pillar,
      lessonId: r.lessonId || 'unit_general',
      lessonTitle: r.lessonTitle || (isRtl ? pillar.nameAr : pillar.nameEn),
      score,
      total,
      percentage,
      level: r.level || 'B1',
      timestamp: isNaN(dt.getTime()) ? new Date() : dt,
      rawItem: r
    };
  });

  // Sort by date descending
  standardized.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  // Aggregate stats per pillar
  const pillarStatsMap: AcademicKPIs['pillarStats'] = {};
  ACADEMIC_PILLARS.forEach(p => {
    pillarStatsMap[p.id] = {
      pillar: p,
      count: 0,
      avgScore: 0,
      masteryTier: 'unattempted'
    };
  });

  let totalScoreSum = 0;
  let totalScoreCount = 0;

  standardized.forEach(item => {
    const pId = item.pillar.id;
    if (pillarStatsMap[pId]) {
      pillarStatsMap[pId].count += 1;
      pillarStatsMap[pId].avgScore += item.percentage;
    }
    totalScoreSum += item.percentage;
    totalScoreCount += 1;
  });

  ACADEMIC_PILLARS.forEach(p => {
    const st = pillarStatsMap[p.id];
    if (st.count > 0) {
      st.avgScore = Math.round(st.avgScore / st.count);
      if (st.avgScore >= 85) st.masteryTier = 'mastered';
      else if (st.avgScore >= 70) st.masteryTier = 'proficient';
      else st.masteryTier = 'in_progress';
    } else {
      st.masteryTier = 'unattempted';
    }
  });

  const overallGPA = totalScoreCount > 0 ? Math.round(totalScoreSum / totalScoreCount) : 0;
  const estimatedHours = parseFloat((standardized.length * 0.5).toFixed(1));

  // Determine Inferred CEFR Level
  let inferredCefrLevel = 'A2 (Beginner-Intermediate)';
  if (overallGPA >= 92 && standardized.length >= 10) inferredCefrLevel = 'C1 (Advanced Fluent)';
  else if (overallGPA >= 82 && standardized.length >= 5) inferredCefrLevel = 'B2 (Upper Intermediate)';
  else if (overallGPA >= 70) inferredCefrLevel = 'B1 (Intermediate Independent)';
  else if (overallGPA >= 50) inferredCefrLevel = 'A2 (Elementary)';
  else inferredCefrLevel = 'A1 (Foundational Starter)';

  // Weakest & Strongest Pillars (among attempted)
  const attemptedPillars = ACADEMIC_PILLARS
    .filter(p => pillarStatsMap[p.id].count > 0)
    .sort((a, b) => pillarStatsMap[a.id].avgScore - pillarStatsMap[b.id].avgScore);

  const weakestPillars = attemptedPillars.slice(0, 3);
  const strongestPillars = [...attemptedPillars].reverse().slice(0, 3);

  // Weekly distribution
  const daysAr = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const daysEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekCounts = [0, 0, 0, 0, 0, 0, 0];
  const weekSums = [0, 0, 0, 0, 0, 0, 0];

  standardized.forEach(item => {
    const day = item.timestamp.getDay();
    weekCounts[day] += 1;
    weekSums[day] += item.percentage;
  });

  const weeklyActivity = daysAr.map((nameAr, idx) => ({
    name: isRtl ? nameAr : daysEn[idx],
    dayIndex: idx,
    count: weekCounts[idx],
    avg: weekCounts[idx] > 0 ? Math.round(weekSums[idx] / weekCounts[idx]) : 0
  }));

  // Time of Day Activity
  let morning = 0;
  let afternoon = 0;
  let evening = 0;
  let night = 0;

  standardized.forEach(item => {
    const hr = item.timestamp.getHours();
    if (hr >= 5 && hr < 12) morning++;
    else if (hr >= 12 && hr < 17) afternoon++;
    else if (hr >= 17 && hr < 22) evening++;
    else night++;
  });

  const timeOfDayActivity = [
    { name: isRtl ? 'صباحي (5am-12pm)' : 'Morning (5am-12pm)', count: morning, color: '#3b82f6' },
    { name: isRtl ? 'ظهيرة (12pm-5pm)' : 'Afternoon (12pm-5pm)', count: afternoon, color: '#10b981' },
    { name: isRtl ? 'مسائي (5pm-10pm)' : 'Evening (5pm-10pm)', count: evening, color: '#f59e0b' },
    { name: isRtl ? 'ليلي (10pm-5am)' : 'Night (10pm-5am)', count: night, color: '#8b5cf6' }
  ].filter(t => t.count > 0);

  return {
    standardized,
    kpis: {
      totalActivities: standardized.length,
      overallGPA,
      estimatedHours,
      pillarStats: pillarStatsMap,
      inferredCefrLevel,
      weakestPillars,
      strongestPillars,
      weeklyActivity,
      timeOfDayActivity
    }
  };
}

/**
 * Generates actionable 3-step remediation strategy for any chosen pillar
 */
export function getRemedialRecommendations(pillarId: string, isRtl = true): {
  title: string;
  steps: { stepNum: number; headline: string; description: string; targetRoute: string }[];
} {
  const pillar = ACADEMIC_PILLARS.find(p => p.id === pillarId) || ACADEMIC_PILLARS[0];

  if (pillarId === 'grammar') {
    return {
      title: isRtl ? 'مسار تمكين القواعد والتراكيب النحوية' : 'Grammar & Syntax Mastery Track',
      steps: [
        {
          stepNum: 1,
          headline: isRtl ? 'مراجعة المعادلات البصرية وقواعد الأزمنة' : 'Review Visual Syntax Formulas',
          description: isRtl ? 'ادخل لأكاديمية القواعد وركز على تفكيك عناصر الجملة وتحديد الأزمنة الدقيقة.' : 'Enter Grammar Academy and analyze sentence constituent formulas.',
          targetRoute: 'grammar-academy'
        },
        {
          stepNum: 2,
          headline: isRtl ? 'حل ألغاز غرفة الهروب النحوية' : 'Solve Grammar Escape Room Puzzles',
          description: isRtl ? 'طبق القواعد في سياق لعب مشوق لترسيخ الروابط والتصريفات الصحيحة.' : 'Apply syntax rules inside interactive escape challenges to solidify verb forms.',
          targetRoute: 'escape-room'
        },
        {
          stepNum: 3,
          headline: isRtl ? 'إجراء تشخيص فوري للجمل مع الذكاء الاصطناعي' : 'Run Live Sentence Diagnosis with AI',
          description: isRtl ? 'اكتب 3 جمل من صياغتك ودع المحلل الذكي يستخرج الأخطاء ويقترح البديل الأنسب.' : 'Compose 3 sentences and let the AI Sentence Doctor inspect them.',
          targetRoute: 'grammar-academy'
        }
      ]
    };
  }

  if (pillarId === 'reading') {
    return {
      title: isRtl ? 'مسار تسريع القراءة والاستيعاب القرائي' : 'Reading Fluency & Comprehension Track',
      steps: [
        {
          stepNum: 1,
          headline: isRtl ? 'الاستماع للنصوص المتزامنة بصوت ناطق' : 'Listen to Synchronized Audio Passages',
          description: isRtl ? 'شغل القارئ الصوتي في مختبر القراءة وتابع الكلمات الملونة أثناء النطق.' : 'Play the synchronized speech engine in Reading Lab to follow words in real time.',
          targetRoute: 'reading-lab'
        },
        {
          stepNum: 2,
          headline: isRtl ? 'توليد قصة مخصصة بمستواك اللغوي' : 'Generate Custom Level-Tailored Passages',
          description: isRtl ? 'اطلب من مولد القصص الذكي نصاً قصيراً حول موضوع تحبه وحل اختبار الفهم.' : 'Generate a personalized passage on your favorite topic and complete the retention quiz.',
          targetRoute: 'reading-lab'
        },
        {
          stepNum: 3,
          headline: isRtl ? 'إتقان بنك المفردات السياقية' : 'Master Contextual Vocabulary Bank',
          description: isRtl ? 'احفظ 5 كلمات معجمية جديدة واقرأ أمثلتها التوضيحية.' : 'Store 5 new words in your glossary and review their contextual usages.',
          targetRoute: 'reading-lab'
        }
      ]
    };
  }

  if (pillarId === 'writing') {
    return {
      title: isRtl ? 'مسار الإملاء وصياغة المقالات البليغة' : 'Writing, Rhetoric & Spelling Track',
      steps: [
        {
          stepNum: 1,
          headline: isRtl ? 'تدريبات الإملاء الصوتي والقواعد الصوتية' : 'Scientific Phonics & Spelling Drills',
          description: isRtl ? 'استمع للنطق الصوتي واكتب الكلمة بدقة لتقوية الذاكرة الإملائية.' : 'Listen to the audio pronunciation and spell words correctly to train memory.',
          targetRoute: 'writing-spelling-studio'
        },
        {
          stepNum: 2,
          headline: isRtl ? 'استخدام روابط البلاغة والانتقال الذكي' : 'Utilize Rhetorical Transition Blocks',
          description: isRtl ? 'ادمج عبارات الربط الأكاديمية مثل (Furthermore, In contrast) في جملك.' : 'Incorporate academic transitions to create smooth, cohesive essays.',
          targetRoute: 'writing-spelling-studio'
        },
        {
          stepNum: 3,
          headline: isRtl ? 'كتابة فقرة وإرسالها للتقييم الفوري' : 'Submit Paragraph for AI Evaluation',
          description: isRtl ? 'اكتب موضوعاً قصيراً واحصل على تقرير تشخيصي فوري بنقاط القوة والتحسين.' : 'Write a short prompt response and receive instant rubric breakdown.',
          targetRoute: 'writing-spelling-studio'
        }
      ]
    };
  }

  if (pillarId === 'pronunciation') {
    return {
      title: isRtl ? 'مسار تحسين النطق ومطابقة النبرة الصوتية' : 'Pronunciation & Pitch Matching Track',
      steps: [
        {
          stepNum: 1,
          headline: isRtl ? 'معايرة الميكروفون وتحليل الموجات' : 'Calibrate Mic & Waveform Analysis',
          description: isRtl ? 'سجل صوتك وقارن الرسم البياني للموجة الصوتية مع المتحدث الأصلي.' : 'Record your voice and contrast waveform plots with native speakers.',
          targetRoute: 'pronunciation-lab'
        },
        {
          stepNum: 2,
          headline: isRtl ? 'التدريب على المقاطع الصوتية الملونة' : 'Color-Coded Syllable Drills',
          description: isRtl ? 'كرر نطق الكلمات الصعبة حتى تتحول جميع المقاطع للون الأخضر.' : 'Repeat multi-syllable phrases until all color indicators turn green.',
          targetRoute: 'pronunciation-lab'
        },
        {
          stepNum: 3,
          headline: isRtl ? 'تحدي القراءة السريعة الواضحة' : 'High-Clarity Read-Aloud Challenge',
          description: isRtl ? 'اقرأ جملاً كاملة بنبرة واثقة وسرعة متوازنة.' : 'Read full sentences with consistent pacing and natural intonation.',
          targetRoute: 'pronunciation-lab'
        }
      ]
    };
  }

  // Default general remediation
  return {
    title: isRtl ? `مسار التمكين المخصص: ${pillar.nameAr}` : `Personalized Track: ${pillar.nameEn}`,
    steps: [
      {
        stepNum: 1,
        headline: isRtl ? 'إنهاء جلسة تدريبية مركزة' : 'Complete a Focused Training Unit',
        description: isRtl ? `ادخل لقسم ${pillar.nameAr} وأكمل التحدي الأساسي لليوم.` : `Enter ${pillar.nameEn} and complete the primary daily challenge.`,
        targetRoute: pillar.route
      },
      {
        stepNum: 2,
        headline: isRtl ? 'مراجعة الأسئلة غير المكتملة' : 'Review Unattempted Questions',
        description: isRtl ? 'تحقق من أسباب الإجابات الخاطئة وكرر المحاولة لتحقيق 100%.' : 'Understand incorrect choices and retry to reach full mastery.',
        targetRoute: pillar.route
      },
      {
        stepNum: 3,
        headline: isRtl ? 'التثبيت عبر رفيق المحادثة الذكي' : 'Reinforce with AI Dialogue Partner',
        description: isRtl ? 'ناقش موضوع هذا القسم مع باسم لتحويل المعرفة إلى ممارسة حية.' : 'Discuss the topic with the AI tutor to solidify active fluency.',
        targetRoute: 'ai-chat'
      }
    ]
  };
}
