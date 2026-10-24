import React, { useState, useMemo } from 'react';
import {
  Search,
  Lock,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { useT } from '../lib/explainLang';
import {
  SectionShell,
  GoldCard,
  LessonTile,
  PrimaryButton,
  GhostButton,
  ProgressPill,
  TutorFace,
} from './ui/academy';

interface ModernCurriculumHomeProps {
  lang: 'en' | 'ar';
  onBack: () => void;
  onNavigate: (view: any, level?: any) => void;
}

interface CurriculumModule {
  id: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  category: 'reading' | 'grammar' | 'conversation' | 'writing' | 'expression';
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  unitsCount: number;
  badgeEn: string;
  badgeAr: string;
  targetView: string;
}

const MODERN_MODULES: CurriculumModule[] = [
  // READING
  {
    id: 'reading_a1',
    titleEn: 'Reading Companion (Level A1)',
    titleAr: 'رفيق القراءة (المستوى التأسيسي A1)',
    descEn: 'Master foundational phonics, sight words, and simple sentence decoding with interactive audio support.',
    descAr: 'أتقن الصوتيات التأسيسية، الكلمات البصرية، وفك شفرات الجمل البسيطة مع دعم صوتي تفاعلي.',
    category: 'reading',
    level: 'A1',
    unitsCount: 5,
    badgeEn: 'Foundational',
    badgeAr: 'تأسيسي',
    targetView: 'reading-curriculum',
  },
  {
    id: 'reading_a2',
    titleEn: 'Reading Companion (Level A2)',
    titleAr: 'رفيق القراءة (المستوى المبتدئ المتقدم A2)',
    descEn: 'Explore workplace culture, trade dialogues, and narrative sequences with guided comprehension.',
    descAr: 'استكشف ثقافة العمل، الحوارات التجارية، والتسلسل القصصي مع تمارين استيعاب موجهة.',
    category: 'reading',
    level: 'A2',
    unitsCount: 5,
    badgeEn: 'Elementary',
    badgeAr: 'مبتدئ متقدم',
    targetView: 'reading-curriculum',
  },
  {
    id: 'reading_b1',
    titleEn: 'Reading Companion (Level B1)',
    titleAr: 'رفيق القراءة (المستوى المتوسط B1)',
    descEn: 'Analyze subtextual inference, fact vs. opinion, cultural heritage, and modern journalism.',
    descAr: 'حلل الاستنتاجات الضمنية، الحقيقة مقابل الرأي، التراث الثقافي، والصحافة الحديثة.',
    category: 'reading',
    level: 'B1',
    unitsCount: 5,
    badgeEn: 'Intermediate',
    badgeAr: 'متوسط',
    targetView: 'reading-curriculum',
  },
  {
    id: 'reading_b2',
    titleEn: 'Reading Companion (Level B2)',
    titleAr: 'رفيق القراءة (المستوى فوق المتوسط B2)',
    descEn: 'Deconstruct rhetorical structures, executive reports, critical perspectives, and persuasion.',
    descAr: 'فكك البنى البلاغية، التقارير التنفيذية، وجهات النظر النقدية، وأساليب الإقناع.',
    category: 'reading',
    level: 'B2',
    unitsCount: 5,
    badgeEn: 'Upper-Intermediate',
    badgeAr: 'فوق المتوسط',
    targetView: 'reading-curriculum',
  },
  {
    id: 'reading_c1',
    titleEn: 'Reading Companion (Level C1)',
    titleAr: 'رفيق القراءة (المستوى المتقدم C1)',
    descEn: 'Engage with academic abstracts, legal texts, philosophical inquiry, and technical innovation.',
    descAr: 'تفاعل مع الملخصات الأكاديمية، النصوص القانونية، الفكر الفلسفي، والابتكار التقني.',
    category: 'reading',
    level: 'C1',
    unitsCount: 5,
    badgeEn: 'Advanced',
    badgeAr: 'متقدم',
    targetView: 'reading-curriculum',
  },
  {
    id: 'reading_c2',
    titleEn: 'Reading Companion (Level C2)',
    titleAr: 'رفيق القراءة (مستوى الإتقان C2)',
    descEn: 'Master etymological nuances, cross-disciplinary synthesis, and classical literary critique.',
    descAr: 'أتقن الدقائق الاشتقاقية، التركيب المعرفي متعدد التخصصات، والنقد الأدبي الكلاسيكي.',
    category: 'reading',
    level: 'C2',
    unitsCount: 5,
    badgeEn: 'Mastery',
    badgeAr: 'إتقان تام',
    targetView: 'reading-curriculum',
  },

  // GRAMMAR
  {
    id: 'grammar_a1',
    titleEn: 'Grammar Companion (Level A1)',
    titleAr: 'رفيق القواعد (المستوى التأسيسي A1)',
    descEn: 'Build rock-solid sentences using parts of speech, present simple, plurals, and articles.',
    descAr: 'ابنِ جملاً متينة باستخدام أقسام الكلام، المضارع البسيط، الجموع، وأدوات التعريف.',
    category: 'grammar',
    level: 'A1',
    unitsCount: 5,
    badgeEn: 'Core Rules',
    badgeAr: 'قواعد أساسية',
    targetView: 'grammar-curriculum',
  },
  {
    id: 'grammar_a2',
    titleEn: 'Grammar Companion (Level A2)',
    titleAr: 'رفيق القواعد (المستوى المبتدئ المتقدم A2)',
    descEn: 'Master past simple, future plans, comparative adjectives, and everyday modal verbs.',
    descAr: 'أتقن الماضي البسيط، الخطط المستقبلية، صفات المقارنة، والأفعال الناقصة اليومية.',
    category: 'grammar',
    level: 'A2',
    unitsCount: 5,
    badgeEn: 'Essential Structure',
    badgeAr: 'تراكيب ضرورية',
    targetView: 'grammar-curriculum',
  },
  {
    id: 'grammar_b1',
    titleEn: 'Grammar Companion (Level B1)',
    titleAr: 'رفيق القواعد (المستوى المتوسط B1)',
    descEn: 'Conquer present perfect, relative clauses, passive voice, and conditional sentences.',
    descAr: 'تمكّن من المضارع التام، جمل الوصل، المبني للمجهول، والجمل الشرطية.',
    category: 'grammar',
    level: 'B1',
    unitsCount: 5,
    badgeEn: 'Intermediate Logic',
    badgeAr: 'منطق متوسط',
    targetView: 'grammar-curriculum',
  },
  {
    id: 'grammar_b2',
    titleEn: 'Grammar Companion (Level B2)',
    titleAr: 'رفيق القواعد (المستوى فوق المتوسط B2)',
    descEn: 'Command narrative tenses, mixed conditionals, reported speech, and advanced passives.',
    descAr: 'تحكم في أزمنة السرد، الشرطيات المركبة، الكلام المنقول، والمبني للمجهول المتقدم.',
    category: 'grammar',
    level: 'B2',
    unitsCount: 5,
    badgeEn: 'Fluency Syntax',
    badgeAr: 'نحو الطلاقة',
    targetView: 'grammar-curriculum',
  },
  {
    id: 'grammar_c1',
    titleEn: 'Grammar Companion (Level C1)',
    titleAr: 'رفيق القواعد (المستوى المتقدم C1)',
    descEn: 'Elevate your style with negative inversion, cleft sentences, participle clauses, and subjunctive.',
    descAr: 'ارتقِ بأسلوبك عبر القلب النحوي، الجمل المنقسمة، عبارات اسم الفاعل، وصيغة الشرط والالتزام.',
    category: 'grammar',
    level: 'C1',
    unitsCount: 5,
    badgeEn: 'Academic Syntax',
    badgeAr: 'نحو أكاديمي',
    targetView: 'grammar-curriculum',
  },
  {
    id: 'grammar_c2',
    titleEn: 'Grammar Companion (Level C2)',
    titleAr: 'رفيق القواعد (مستوى الإتقان C2)',
    descEn: 'Achieve native-like precision with stylistic inversion, nominalization, and register shifts.',
    descAr: 'حقق دقة المتحدث الأصلي عبر القلب البلاغي، المصدرية الأكاديمية، والتحول المقامي.',
    category: 'grammar',
    level: 'C2',
    unitsCount: 5,
    badgeEn: 'Native Precision',
    badgeAr: 'دقة احترافية',
    targetView: 'grammar-curriculum',
  },

  // CONVERSATION
  {
    id: 'conv_a1',
    titleEn: 'Conversation Companion (Level A1)',
    titleAr: 'رفيق المحادثة (المستوى التأسيسي A1)',
    descEn: 'Speak confidently in daily greetings, family introductions, cafes, shopping, and routines.',
    descAr: 'تحدث بثقة في التحيات اليومية، التعريف بالعائلة، المقاهي، التسوق، والروتين اليومي.',
    category: 'conversation',
    level: 'A1',
    unitsCount: 5,
    badgeEn: 'Daily Speech',
    badgeAr: 'تحدث يومي',
    targetView: 'conversation-curriculum',
  },
  {
    id: 'conv_a2',
    titleEn: 'Conversation Companion (Level A2)',
    titleAr: 'رفيق المحادثة (المستوى المبتدئ المتقدم A2)',
    descEn: 'Make social plans, describe people, navigate travel airports, and discuss health & hobbies.',
    descAr: 'رتب خططاً اجتماعية، صِف الأشخاص، تحدث في المطارات والسفر، وناقش الصحة والهوايات.',
    category: 'conversation',
    level: 'A2',
    unitsCount: 5,
    badgeEn: 'Social Fluency',
    badgeAr: 'طلاقة اجتماعية',
    targetView: 'conversation-curriculum',
  },
  {
    id: 'conv_b1',
    titleEn: 'Conversation Companion (Level B1)',
    titleAr: 'رفيق المحادثة (المستوى المتوسط B1)',
    descEn: 'Give structured advice, express opinions, succeed in job interviews, and share ambitions.',
    descAr: 'قدم نصائح منظمة، عبّر عن آرائك، انجح في مقابلات العمل، وشارك طموحاتك.',
    category: 'conversation',
    level: 'B1',
    unitsCount: 5,
    badgeEn: 'Active Dialogue',
    badgeAr: 'حوار فعّال',
    targetView: 'conversation-curriculum',
  },
  {
    id: 'conv_b2',
    titleEn: 'Conversation Companion (Level B2)',
    titleAr: 'رفيق المحادثة (المستوى فوق المتوسط B2)',
    descEn: 'Lead business meetings, debate complex topics, resolve conflicts, and analyze media news.',
    descAr: 'قُد اجتماعات العمل، ناقش القضايا المعقدة، حل المشكلات، وحلل الأخبار الإعلامية.',
    category: 'conversation',
    level: 'B2',
    unitsCount: 5,
    badgeEn: 'Professional Talk',
    badgeAr: 'تحدث مهني',
    targetView: 'conversation-curriculum',
  },
  {
    id: 'conv_c1',
    titleEn: 'Conversation Companion (Level C1)',
    titleAr: 'رفيق المحادثة (المستوى المتقدم C1)',
    descEn: 'Deliver persuasive presentations, negotiate strategically, and discuss abstract concepts.',
    descAr: 'قدم عروضاً مقنعة، تفاوض بذكاء استراتيجي، وناقش المفاهيم المجردة بطلاقة.',
    category: 'conversation',
    level: 'C1',
    unitsCount: 5,
    badgeEn: 'Executive Oratory',
    badgeAr: 'خطابة تنفيذية',
    targetView: 'conversation-curriculum',
  },
  {
    id: 'conv_c2',
    titleEn: 'Conversation Companion (Level C2)',
    titleAr: 'رفيق المحادثة (مستوى الإتقان C2)',
    descEn: 'Command idiomatic precision, subtle humour, high-stakes diplomacy, and philosophical debate.',
    descAr: 'امتلك الدقة الاصطلاحية، الدعابة الذكية، الدبلوماسية الرفيعة، والمناظرة الفلسفية.',
    category: 'conversation',
    level: 'C2',
    unitsCount: 5,
    badgeEn: 'Rhetorical Mastery',
    badgeAr: 'براعة بلاغية',
    targetView: 'conversation-curriculum',
  },

  // WRITING
  {
    id: 'writing_a1',
    titleEn: 'Writing Companion (Level A1)',
    titleAr: 'رفيق الكتابة (المستوى التأسيسي A1)',
    descEn: 'Master the alphabet, basic sentence building, punctuation rules, and personal notes.',
    descAr: 'أتقن الأبجدية، بناء الجمل الأساسية، علامات الترقيم، وكتابة الملاحظات الشخصية.',
    category: 'writing',
    level: 'A1',
    unitsCount: 5,
    badgeEn: 'Foundational Writing',
    badgeAr: 'كتابة تأسيسية',
    targetView: 'writing-curriculum',
  },
  {
    id: 'writing_a2',
    titleEn: 'Writing Companion (Level A2)',
    titleAr: 'رفيق الكتابة (المستوى المبتدئ المتقدم A2)',
    descEn: 'Use linking words, describe your day, write social posts, and compose short emails.',
    descAr: 'استخدم أدوات الربط، صِف يومك، اكتب منشورات قصيرة، وصِغ رسائل بريد إلكتروني مبسطة.',
    category: 'writing',
    level: 'A2',
    unitsCount: 5,
    badgeEn: 'Practical Writing',
    badgeAr: 'كتابة عملية',
    targetView: 'writing-curriculum',
  },
  {
    id: 'writing_b1',
    titleEn: 'Writing Companion (Level B1)',
    titleAr: 'رفيق الكتابة (المستوى المتوسط B1)',
    descEn: 'Structure cohesive paragraphs, craft engaging stories, and write formal emails.',
    descAr: 'ابنِ فقرات متماسكة، صِغ قصصاً مشوقة، واكتب رسائل بريد إلكتروني رسمية.',
    category: 'writing',
    level: 'B1',
    unitsCount: 5,
    badgeEn: 'Structured Composition',
    badgeAr: 'إنشاء منظم',
    targetView: 'writing-curriculum',
  },
  {
    id: 'writing_b2',
    titleEn: 'Writing Companion (Level B2)',
    titleAr: 'رفيق الكتابة (المستوى فوق المتوسط B2)',
    descEn: 'Write analytical essays, executive summaries, critical reviews, and smooth transitions.',
    descAr: 'اكتب مقالات تحليلية، ملخصات تنفيذية، مراجعات نقدية، وانتقالات سلسة بين الأفكار.',
    category: 'writing',
    level: 'B2',
    unitsCount: 5,
    badgeEn: 'Essay & Reports',
    badgeAr: 'مقالات وتقارير',
    targetView: 'writing-curriculum',
  },
  {
    id: 'writing_c1',
    titleEn: 'Writing Companion (Level C1)',
    titleAr: 'رفيق الكتابة (المستوى المتقدم C1)',
    descEn: 'Design academic theses, professional proposals, and nuanced critical analyses.',
    descAr: 'صمم أطروحات أكاديمية، مقترحات مهنية، وتحليلات نقدية دقيقة الأسلوب.',
    category: 'writing',
    level: 'C1',
    unitsCount: 5,
    badgeEn: 'Academic & Corporate',
    badgeAr: 'أكاديمي ومؤسسي',
    targetView: 'writing-curriculum',
  },
  {
    id: 'writing_c2',
    titleEn: 'Writing Companion (Level C2)',
    titleAr: 'رفيق الكتابة (مستوى الإتقان C2)',
    descEn: 'Achieve stylistic mastery, research logic, and syntactic precision in complex discourse.',
    descAr: 'حقق السيادة الأسلوبية، المنطق البحثي، والدقة التركيبية في الخطابات المعقدة.',
    category: 'writing',
    level: 'C2',
    unitsCount: 5,
    badgeEn: 'Authorial Mastery',
    badgeAr: 'إتقان تأليفي',
    targetView: 'writing-curriculum',
  },

  // EXPRESSION
  {
    id: 'exp_a1',
    titleEn: 'Expression Companion (Level A1)',
    titleAr: 'رفيق التعبير (المستوى التأسيسي A1)',
    descEn: 'Express feelings, family bonds, colors, daily habits, and personal likes & dislikes.',
    descAr: 'عبّر عن المشاعر، الروابط العائلية، الألوان، العادات اليومية، وما تحبه أو تفضله.',
    category: 'expression',
    level: 'A1',
    unitsCount: 5,
    badgeEn: 'Self Expression',
    badgeAr: 'تعبير ذاتي',
    targetView: 'expression-curriculum',
  },
  {
    id: 'exp_a2',
    titleEn: 'Expression Companion (Level A2)',
    titleAr: 'رفيق التعبير (المستوى المبتدئ المتقدم A2)',
    descEn: 'Share hobbies, tell personal anecdotes, give directions, and express future intentions.',
    descAr: 'شارك هواياتك، اروِ مواقفك الشخصية، صِف الاتجاهات، وعبّر عن نواياك المستقبلية.',
    category: 'expression',
    level: 'A2',
    unitsCount: 5,
    badgeEn: 'Creative Voice',
    badgeAr: 'صوت إبداعي',
    targetView: 'expression-curriculum',
  },
  {
    id: 'exp_b1',
    titleEn: 'Expression Companion (Level B1)',
    titleAr: 'رفيق التعبير (المستوى المتوسط B1)',
    descEn: 'Articulate cultural experiences, reasoned opinions, life ambitions, and logical arguments.',
    descAr: 'عبّر بوضوح عن التجارب الثقافية، الآراء المعللة، طموحات الحياة، والحجج المنطقية.',
    category: 'expression',
    level: 'B1',
    unitsCount: 5,
    badgeEn: 'Articulate Thought',
    badgeAr: 'فكر فصيح',
    targetView: 'expression-curriculum',
  },
  {
    id: 'exp_b2',
    titleEn: 'Expression Companion (Level B2)',
    titleAr: 'رفيق التعبير (المستوى فوق المتوسط B2)',
    descEn: 'Engage in abstract debates, hypothetical scenarios, social issues, and environmental discourse.',
    descAr: 'خُض نقاشات مجردة، سيناريوهات افتراضية، قضايا اجتماعية، وخطابات بيئية معمقة.',
    category: 'expression',
    level: 'B2',
    unitsCount: 5,
    badgeEn: 'Critical Expression',
    badgeAr: 'تعبير نقدي',
    targetView: 'expression-curriculum',
  },
  {
    id: 'exp_c1',
    titleEn: 'Expression Companion (Level C1)',
    titleAr: 'رفيق التعبير (المستوى المتقدم C1)',
    descEn: 'Explore ethics, aesthetics, diplomatic nuance, strategic thinking, and global advocacy.',
    descAr: 'استكشف الأخلاقيات، الجماليات، الدبلوماسية الدقيقة، التفكير الاستراتيجي، والمناصرة العالمية.',
    category: 'expression',
    level: 'C1',
    unitsCount: 5,
    badgeEn: 'High Rhetoric',
    badgeAr: 'بيان رفيع',
    targetView: 'expression-curriculum',
  },
  {
    id: 'exp_c2',
    titleEn: 'Expression Companion (Level C2)',
    titleAr: 'رفيق التعبير (مستوى الإتقان C2)',
    descEn: 'Synthesize macroeconomic audits, existential inquiry, and supreme linguistic fluidity.',
    descAr: 'اجمع بين التحليل الكلي، التساؤل الفلسفي، والانسيابية اللغوية الفائقة.',
    category: 'expression',
    level: 'C2',
    unitsCount: 5,
    badgeEn: 'Supreme Eloquence',
    badgeAr: 'فصاحة عليا',
    targetView: 'expression-curriculum',
  },
];

const UPCOMING_LOCKED_UNITS = [
  {
    id: 'locked_vr',
    en: 'Speaking Lab VR',
    ar: 'مختبر المحادثة الافتراضي',
    level: 'B2',
  },
  {
    id: 'locked_ielts',
    en: 'IELTS Intensive',
    ar: 'معسكر الآيلتس المكثف',
    level: 'C1',
  },
  {
    id: 'locked_biz',
    en: 'Business English',
    ar: 'إنجليزية الأعمال والشركات',
    level: 'B2',
  },
  {
    id: 'locked_toefl',
    en: 'TOEFL Prep',
    ar: 'التحضير لاختبار التوفل',
    level: 'C1',
  },
];

const CATEGORY_EMOJI: Record<CurriculumModule['category'], string> = {
  reading: '📖',
  grammar: '📐',
  conversation: '💬',
  writing: '✍️',
  expression: '🎭',
};

export const ModernCurriculumHome: React.FC<ModernCurriculumHomeProps> = ({
  lang,
  onNavigate,
}) => {
  const t = useT();
  const isRtl = lang === 'ar';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', labelEn: 'All Pathways', labelAr: 'جميع المسارات', emoji: '🏛️' },
    { id: 'reading', labelEn: 'Reading', labelAr: 'القراءة', emoji: '📖' },
    { id: 'grammar', labelEn: 'Grammar', labelAr: 'القواعد', emoji: '📐' },
    { id: 'conversation', labelEn: 'Conversation', labelAr: 'المحادثة', emoji: '💬' },
    { id: 'writing', labelEn: 'Writing', labelAr: 'الكتابة', emoji: '✍️' },
    { id: 'expression', labelEn: 'Expression', labelAr: 'التعبير', emoji: '🎭' },
  ];

  const levels = ['ALL', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  const filteredModules = useMemo(() => {
    return MODERN_MODULES.filter((m) => {
      const matchesCat = selectedCategory === 'all' || m.category === selectedCategory;
      const matchesLvl = selectedLevel === 'ALL' || m.level === selectedLevel;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        m.titleEn.toLowerCase().includes(q) ||
        m.titleAr.toLowerCase().includes(q) ||
        m.descEn.toLowerCase().includes(q) ||
        m.descAr.toLowerCase().includes(q);
      return matchesCat && matchesLvl && matchesSearch;
    });
  }, [selectedCategory, selectedLevel, searchQuery]);

  const totalUnitsVisible = useMemo(
    () => filteredModules.reduce((sum, m) => sum + m.unitsCount, 0),
    [filteredModules]
  );

  return (
    <SectionShell dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero Area: Navy Card with Gold Frame (no gradient or blur blob) */}
      <div className="rounded-2xl bg-[#002147] border-2 border-[#C49E3A] p-5 sm:p-6 shadow-sm text-white space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5 min-w-0">
            <TutorFace tutor="sara" size="sm" />
            <div className="min-w-0">
              <span className="inline-block text-[11px] font-black text-[#E6C36A] uppercase tracking-wider">
                🏛️ {t('الإطار الأوروبي المرجعي CEFR (A1 – C2)', 'CEFR Academic Curriculum (A1 – C2)')}
              </span>
              <h2 className="text-lg sm:text-2xl font-black text-white leading-snug mt-0.5">
                {t(
                  'منصة المسارات الأكاديمية الشاملة',
                  'Comprehensive Academic Pathways Hub'
                )}
              </h2>
              <p className="text-xs sm:text-sm font-bold text-[#E6C36A]/90 mt-1 leading-relaxed">
                {t(
                  'اختر المهارة والمستوى المناسب لتبدأ وحداتك التفاعلية في القراءة، القواعد، المحادثة، الكتابة، والتعبير.',
                  'Select your skill and CEFR level to launch interactive units across Reading, Grammar, Conversation, Writing, and Expression.'
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <PrimaryButton
              onClick={() => onNavigate('reading-curriculum', 'A1')}
              className="text-xs sm:text-sm"
            >
              <Sparkles size={15} />
              <span>{t('ابدأ من A1', 'Start at A1')}</span>
            </PrimaryButton>
          </div>
        </div>

        {/* Real Progress / Filter Summary Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#C49E3A]/30">
          <ProgressPill>
            📚 {filteredModules.length} / {MODERN_MODULES.length}{' '}
            {t('مسار متاح', 'Active Tracks')}
          </ProgressPill>
          <ProgressPill>
            📖 {totalUnitsVisible} {t('وحدة دراسية', 'Study Units')}
          </ProgressPill>
          <ProgressPill>
            🎯 {selectedLevel === 'ALL' ? 'A1–C2' : selectedLevel}
          </ProgressPill>
          <ProgressPill>
            🔒 {UPCOMING_LOCKED_UNITS.length} {t('مسارات قادمة', 'Upcoming Tracks')}
          </ProgressPill>
        </div>
      </div>

      {/* Filters & Search Card */}
      <GoldCard className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search
            size={17}
            className={`absolute top-1/2 -translate-y-1/2 text-[#C49E3A] ${
              isRtl ? 'right-3.5' : 'left-3.5'
            }`}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t(
              'ابحث عن مسار أو مهارة أو مستوى...',
              'Search pathways, skills, or levels...'
            )}
            className={`w-full rounded-xl border border-[#C49E3A]/40 bg-[#fdfaf3] py-2.5 text-sm font-bold text-[#002147] placeholder:text-[#002147]/50 focus:outline-none focus:ring-2 focus:ring-[#C49E3A] ${
              isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'
            }`}
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-2 rounded-xl text-xs font-black border transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5 min-h-[40px] ${
                  active
                    ? 'bg-[#002147] text-[#E6C36A] border-[#C49E3A]'
                    : 'bg-white text-[#002147] border-[#C49E3A]/40 hover:border-[#C49E3A]'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{t(cat.labelAr, cat.labelEn)}</span>
              </button>
            );
          })}
        </div>

        {/* CEFR Level Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#C49E3A]/20">
          <span className="text-xs font-black text-[#002147]">
            🎓 {t('تصفية حسب المستوى (CEFR):', 'Filter by CEFR Level:')}
          </span>
          <div className="flex flex-wrap items-center gap-1.5" dir="ltr">
            {levels.map((lvl) => {
              const active = selectedLevel === lvl;
              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black border transition-transform active:scale-95 cursor-pointer min-h-[36px] ${
                    active
                      ? 'bg-[#C49E3A] text-[#002147] border-[#002147]'
                      : 'bg-[#fdfaf3] text-[#002147] border-[#C49E3A]/40 hover:border-[#C49E3A]'
                  }`}
                >
                  {lvl === 'ALL' ? t('الكل', 'ALL') : lvl}
                </button>
              );
            })}
          </div>
        </div>
      </GoldCard>

      {/* Unit / Level Grid: LessonTile Grid (2 cols mobile, 3 desktop) */}
      <GoldCard className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#C49E3A]/30 pb-3">
          <h3 className="text-base sm:text-lg font-black text-[#002147]">
            📂 {t('الوحدات والمستويات الدراسية', 'Units & CEFR Level Grid')}
          </h3>
          <div className="flex items-center gap-2">
            <ProgressPill>
              {filteredModules.length} {t('مسار', 'Tracks')}
            </ProgressPill>
            <ProgressPill>
              {totalUnitsVisible} {t('وحدة', 'Units')}
            </ProgressPill>
          </div>
        </div>

        {filteredModules.length === 0 ? (
          <div className="rounded-2xl bg-[#fdfaf3] border border-[#C49E3A]/40 p-6 text-center space-y-3">
            <p className="text-sm font-black text-[#002147]">
              🔍 {t('لا توجد مسارات مطابقة لبحثك الحالي', 'No pathways match your current filter')}
            </p>
            <GhostButton
              onClick={() => {
                setSelectedCategory('all');
                setSelectedLevel('ALL');
                setSearchQuery('');
              }}
            >
              <RotateCcw size={15} />
              <span>{t('إعادة ضبط الفلاتر', 'Reset Filters')}</span>
            </GhostButton>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredModules.map((module, idx) => (
              <LessonTile
                key={module.id}
                order={idx + 1}
                emoji={CATEGORY_EMOJI[module.category]}
                title={t(module.titleAr, module.titleEn)}
                subtitle={`${module.unitsCount} ${t('وحدات', 'Units')} • ${t(
                  module.badgeAr,
                  module.badgeEn
                )}`}
                level={module.level}
                onClick={() => onNavigate(module.targetView, module.level)}
              />
            ))}
          </div>
        )}

        {/* Locked / Upcoming Units Dimmed with a Gold Lock */}
        <div className="pt-4 border-t border-[#C49E3A]/30 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#002147] text-[#C49E3A] flex items-center justify-center shrink-0">
                <Lock size={13} />
              </span>
              <h4 className="text-sm sm:text-base font-black text-[#002147]">
                {t('مسارات متقدمة قيد الإطلاق (مقفلة)', 'Upcoming Advanced Tracks (Locked)')}
              </h4>
            </div>
            <ProgressPill>
              🔒 {UPCOMING_LOCKED_UNITS.length} {t('قريباً', 'Coming Soon')}
            </ProgressPill>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {UPCOMING_LOCKED_UNITS.map((item, idx) => (
              <LessonTile
                key={item.id}
                order={filteredModules.length + idx + 1}
                title={t(item.ar, item.en)}
                subtitle={t('قريباً ضمن التحديث القادم', 'Coming Soon')}
                level={item.level}
                locked={true}
              />
            ))}
          </div>
        </div>
      </GoldCard>
    </SectionShell>
  );
};

export default ModernCurriculumHome;
