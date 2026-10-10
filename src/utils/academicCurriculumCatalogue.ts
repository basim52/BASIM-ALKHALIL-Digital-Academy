import { 
  ALL_READING_UNITS 
} from '../components/ReadingCurriculumCompanion';
import { 
  ALL_GRAMMAR_UNITS 
} from '../components/GrammarCurriculumCompanion';
import { 
  ALL_WRITING_UNITS 
} from '../components/WritingCurriculumCompanion';
import { 
  ALL_CONVERSATION_UNITS 
} from '../components/ConversationCurriculumCompanion';
import { 
  ALL_EXPRESSION_UNITS 
} from '../components/ExpressionCurriculumCompanion';
import { 
  OXFORD_UNITS 
} from '../components/OxfordDiscoverCompanion';
import { 
  OXFORD_LESSONS 
} from '../data/oxfordLessonsData';
import { 
  OLD_OXFORD_LESSONS 
} from '../components/OxfordUnitLesson';
import { 
  STORIES 
} from '../components/StoryLibrary';
import { 
  KIDS_STORIES 
} from '../data/kidsStories';
import { 
  ADULTS_DAILY_DOSES 
} from '../data/adultsDailyDose';
import { 
  PRONUNCIATION_LAB_DATA, 
  ROLE_PLAY_CHALLENGES_DATA, 
  VISUAL_DICTIONARY_DATA, 
  ENGLISH_WITH_SONGS_DATA, 
  CARTOON_SERIES_DATA, 
  ESCAPE_ROOM_PUZZLES_DATA, 
  FAMILY_GAMES_DATA, 
  STORY_ART_PROMPTS_DATA, 
  COOKING_CHALLENGES_DATA 
} from '../data/interactiveCurriculum';
import { LANGUAGE_LAB_DATA } from '../data/languageLabData';
import { COURSES } from '../data/courses';
import { PRODUCED_VIDEO_LESSONS } from '../data/producedVideoLessons';
import { MASTER_CURRICULUM } from '../data/masterCurriculum';
import { AI_CURRICULUM_DATA, ADVANCED_CURRICULUM_DATA } from '../components/AiCurriculum';
import { PROMPT_PROFESSIONAL_DATA } from '../components/PromptProData';
import { CurriculumCategory, proficiencyLevel } from '../types';

export interface CurriculumLesson {
  id: string;
  pillarId: string;
  courseId: string;
  courseLabelAr: string;
  courseLabelEn: string;
  titleAr: string;
  titleEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  level: string; // 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Kid' | 'General' | 'All'
  duration: string;
  categoryTagAr?: string;
  categoryTagEn?: string;
  planItem?: any;
}

export interface PillarCategoryDefinition {
  id: string;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  iconName: string;
  color: string;
  bgLight: string;
  borderColor: string;
  tagColor: string;
}

export const ACADEMIC_SECTION_DEFINITIONS: PillarCategoryDefinition[] = [
  {
    id: 'grammar',
    nameAr: 'القواعد والتراكيب النحوية',
    nameEn: 'Grammar & Syntax Academy',
    descAr: 'المعادلات النحوية البصرية والتشخيص الدقيق لجميع مستويات CEFR (A1 إلى C2)',
    descEn: 'Visual syntax formulas and precision grammar drills across CEFR A1-C2',
    iconName: 'Brain',
    color: 'text-blue-600',
    bgLight: 'bg-blue-50',
    borderColor: 'border-blue-200',
    tagColor: 'bg-blue-100 text-blue-800'
  },
  {
    id: 'reading',
    nameAr: 'القراءة والطلاقة والاستيعاب',
    nameEn: 'Reading & Comprehension Lab',
    descAr: 'النصوص التفاعلية المسموعة المتزامنة وأسئلة الفهم والتحليل النقدي',
    descEn: 'Synchronized audio reading passages, vocabulary deep-dives and comprehension checks',
    iconName: 'BookOpen',
    color: 'text-emerald-600',
    bgLight: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    tagColor: 'bg-emerald-100 text-emerald-800'
  },
  {
    id: 'writing',
    nameAr: 'التعبير والكتابة والإملاء',
    nameEn: 'Writing, Expression & Spelling',
    descAr: 'صياغة المقالات، أدوات الربط البلاغية، وتدريبات الإملاء الصوتي المنهجي',
    descEn: 'AI essay composition, stylistic transitions, and systematic phonics spelling',
    iconName: 'PenTool',
    color: 'text-purple-600',
    bgLight: 'bg-purple-50',
    borderColor: 'border-purple-200',
    tagColor: 'bg-purple-100 text-purple-800'
  },
  {
    id: 'conversation',
    nameAr: 'المحادثة والتواصل الذكي',
    nameEn: 'Conversation & AI Speaking',
    descAr: 'تحديات الحوار الواقعي والمحادثة التفاعلية مع تصحيح النطق الفوري',
    descEn: 'Real-world dialogue scenarios, roleplay prompts and voice conversation',
    iconName: 'MessageSquare',
    color: 'text-cyan-600',
    bgLight: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    tagColor: 'bg-cyan-100 text-cyan-800'
  },
  {
    id: 'oxford',
    nameAr: 'سلسلة مناهج أكسفورد المصورة',
    nameEn: 'Oxford Discover Curriculum',
    descAr: 'المنهج العالمي المصور بجميع وحداته وتحديات التفكير والقيم الإنسانية',
    descEn: 'World-renowned illustrated curriculum with big questions, values & CLIL projects',
    iconName: 'Award',
    color: 'text-amber-600',
    bgLight: 'bg-amber-50',
    borderColor: 'border-amber-200',
    tagColor: 'bg-amber-100 text-amber-800'
  },
  {
    id: 'pronunciation',
    nameAr: 'المخارج والنطق الصوتي والفونكس',
    nameEn: 'Phonetics & Pronunciation Lab',
    descAr: 'تدريب مخارج الحروف، المقاطع الصوتية، النبرة، والأزواج المتقاربة صوتياً',
    descEn: 'Phonetic waveforms, minimal pairs, syllable stress, and tongue twister drills',
    iconName: 'Mic',
    color: 'text-orange-600',
    bgLight: 'bg-orange-50',
    borderColor: 'border-orange-200',
    tagColor: 'bg-orange-100 text-orange-800'
  },
  {
    id: 'stories',
    nameAr: 'القصص المسموعة ومغامرات نور',
    nameEn: 'Auditory Stories & Noor in London',
    descAr: 'حلقات مغامرات نور في لندن والقصص التفاعلية متعددة المستويات',
    descEn: 'Noor in London serialized audio adventures with synced reading and listening quizzes',
    iconName: 'Volume2',
    color: 'text-indigo-600',
    bgLight: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    tagColor: 'bg-indigo-100 text-indigo-800'
  },
  {
    id: 'early_childhood',
    nameAr: 'أكاديمية الطفولة المبكرة والبراعم',
    nameEn: 'Early Childhood Phonics & Toddlers',
    descAr: 'الكلمات الأولى، الأرقام، الألوان، الأشكال، تلوين تفاعلي ونطق البراعم لسن 2-6 سنوات',
    descEn: 'First words, numbers, colors, shapes, interactive coloring, and mascot speech',
    iconName: 'Baby',
    color: 'text-pink-500',
    bgLight: 'bg-pink-50',
    borderColor: 'border-pink-200',
    tagColor: 'bg-pink-100 text-pink-800'
  },
  {
    id: 'kids_stories',
    nameAr: 'قصص الأطفال واليافعين التعليمية',
    nameEn: 'Kids & Junior Educational Stories',
    descAr: 'قصص مصورة هادفة وقصيرة تنمي القيم والمفردات اللغوية بأسلوب ممتع',
    descEn: 'Illustrated value-driven short stories designed for junior learners and teens',
    iconName: 'Sparkles',
    color: 'text-sky-600',
    bgLight: 'bg-sky-50',
    borderColor: 'border-sky-200',
    tagColor: 'bg-sky-100 text-sky-800'
  },
  {
    id: 'daily_dose',
    nameAr: 'الجرعة اليومية وتصحيح الأخطاء',
    nameEn: 'Daily Dose & Error Correction',
    descAr: 'شذرات لغوية سريعة ومكثفة لتصحيح الأخطاء الشائعة وبناء العادات اليومية',
    descEn: 'High-impact 5-minute micro-lessons targeting common mistakes and natural idioms',
    iconName: 'Flame',
    color: 'text-rose-600',
    bgLight: 'bg-rose-50',
    borderColor: 'border-rose-200',
    tagColor: 'bg-rose-100 text-rose-800'
  },
  {
    id: 'interactive_play',
    nameAr: 'التعليم التفاعلي والألعاب وغرف الهروب',
    nameEn: 'Interactive Play, Songs & Escape Rooms',
    descAr: 'كاريوكي الأغاني، ألغاز غرف هروب القواعد، القاموس المصور، ومطبخ العائلة',
    descEn: 'Songs karaoke, grammar escape rooms, visual dictionary, and family cooking challenges',
    iconName: 'Gamepad2',
    color: 'text-violet-600',
    bgLight: 'bg-violet-50',
    borderColor: 'border-violet-200',
    tagColor: 'bg-violet-100 text-violet-800'
  },
  {
    id: 'translation_language_lab',
    nameAr: 'الترجمة الحية ومختبر اللغة',
    nameEn: 'Live Translation & Language Lab',
    descAr: 'دراسة تركيب الكلمات، تفكيك الجمل، والترجمة بالسياقات والمستويات',
    descEn: 'Word study, suffix/prefix dissection, and contextual multi-tone translation',
    iconName: 'Globe',
    color: 'text-teal-600',
    bgLight: 'bg-teal-50',
    borderColor: 'border-teal-200',
    tagColor: 'bg-teal-100 text-teal-800'
  },
  {
    id: 'book_courses',
    nameAr: 'مناهج الكتب العالمية وتطوير الذات',
    nameEn: 'Bestseller Books & Self-Development',
    descAr: 'دروس مستخلصة من أمهات الكتب العالمية: العادات الذرية، العادات السبع، الأب الغني، فن اللامبالاة، وقوة الآن',
    descEn: 'Master lessons distilled from bestselling books: Atomic Habits, 7 Habits, Rich Dad Poor Dad, and more',
    iconName: 'BookMarked',
    color: 'text-amber-700',
    bgLight: 'bg-amber-50',
    borderColor: 'border-amber-300',
    tagColor: 'bg-amber-100 text-amber-900'
  },
  {
    id: 'video_lessons',
    nameAr: 'المناهج المرئية والاستوديو المصور',
    nameEn: 'Cinematic Video Lessons & Storyboards',
    descAr: 'مشاهد وسيناريوهات مصورة من شوارع لندن، المطار، والمكاتب مع حوارات ومواقف اجتماعية حية',
    descEn: 'Real-world video lessons from London streets, airports, and workspaces with interactive scenes',
    iconName: 'Video',
    color: 'text-rose-600',
    bgLight: 'bg-rose-50',
    borderColor: 'border-rose-200',
    tagColor: 'bg-rose-100 text-rose-800'
  },
  {
    id: 'ai_foundational',
    nameAr: 'البرنامج التأسيسي للذكاء الاصطناعي',
    nameEn: 'Foundational AI Literacy Program',
    descAr: 'المفاهيم الأساسية، كيف يفكر الصديق الرقمي، صيد الأنماط، فن الحوار والأمر الذهبي، والأخلاقيات (20 درساً)',
    descEn: 'Foundational AI principles, pattern hunting, generative models, golden prompts and ethics (20 lessons)',
    iconName: 'Cpu',
    color: 'text-violet-600',
    bgLight: 'bg-violet-50',
    borderColor: 'border-violet-200',
    tagColor: 'bg-violet-100 text-violet-800'
  },
  {
    id: 'ai_specialized',
    nameAr: 'المسارات التخصصية للذكاء الاصطناعي',
    nameEn: 'Advanced Specialized AI Tracks',
    descAr: 'النمذجة الرياضية، معالجة اللغات الطبيعية NLP، الرؤية الحاسوبية، والوكلاء الأذكياء (10 وحدات تخصصية)',
    descEn: 'Advanced neural modeling, NLP, computer vision, AI agents and workflow automation (10 modules)',
    iconName: 'Sparkles',
    color: 'text-cyan-600',
    bgLight: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    tagColor: 'bg-cyan-100 text-cyan-800'
  },
  {
    id: 'ai_prompt_pro',
    nameAr: 'أكاديمية احترافية المطالبات (Prompt Pro)',
    nameEn: 'Prompt Engineering Professional Academy',
    descAr: 'معمارية الأوامر المركبة Mega-Prompts، التفكير المتسلسل، محاكاة الشخصيات، وأمن المطالبات (24 درساً)',
    descEn: 'Mega-Prompting architecture, chain of thought reasoning, personas, and prompt security (24 lessons)',
    iconName: 'Terminal',
    color: 'text-amber-600',
    bgLight: 'bg-amber-50',
    borderColor: 'border-amber-200',
    tagColor: 'bg-amber-100 text-amber-800'
  },
  {
    id: 'professional_dev',
    nameAr: 'الدورات التطويرية وبناء المهارات القيادية',
    nameEn: 'Professional & Personal Development Courses',
    descAr: 'دورات تطويرية مكثفة من أمهات الكتب: العادات الذرية، العادات السبع، التفكير السريع والبطيء، والأب الغني',
    descEn: 'Executive development courses: Atomic Habits, 7 Habits, Thinking Fast & Slow, Rich Dad Poor Dad',
    iconName: 'GraduationCap',
    color: 'text-emerald-700',
    bgLight: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    tagColor: 'bg-emerald-100 text-emerald-800'
  }
];

/**
 * Builds the complete unified catalog of all lessons from all 12 academy departments.
 */
export function getAllCurriculumLessons(): CurriculumLesson[] {
  const all: CurriculumLesson[] = [];
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;

  // 1. GRAMMAR ACADEMY
  levels.forEach(lvl => {
    if (ALL_GRAMMAR_UNITS[lvl]) {
      ALL_GRAMMAR_UNITS[lvl].forEach(u => {
        all.push({
          id: String(u.id),
          pillarId: 'grammar',
          courseId: 'grammar',
          courseLabelAr: `القواعد المتطورة ${lvl}`,
          courseLabelEn: `Advanced Grammar ${lvl}`,
          titleAr: u.titleAr,
          titleEn: u.titleEn,
          descriptionAr: `قاعدة نحوية تفاعلية بمستوى ${lvl} مع أمثلة وتمارين تشخيصية`,
          descriptionEn: `Interactive grammar module at ${lvl} level with diagnostic exercises`,
          level: lvl,
          duration: '45 min',
          categoryTagAr: 'قواعد نحوية',
          categoryTagEn: 'Grammar'
        });
      });
    }
  });

  // 2. READING LAB
  levels.forEach(lvl => {
    if (ALL_READING_UNITS[lvl]) {
      ALL_READING_UNITS[lvl].forEach(u => {
        all.push({
          id: String(u.id),
          pillarId: 'reading',
          courseId: 'reading',
          courseLabelAr: `القراءة المتطورة ${lvl}`,
          courseLabelEn: `Elite Reading ${lvl}`,
          titleAr: u.titleAr,
          titleEn: u.titleEn,
          descriptionAr: `نص قراءة تفاعلي بمستوى ${lvl} مع تسجيل صوتي وتحليل للمفردات`,
          descriptionEn: `Interactive reading passage at ${lvl} level with synced audio`,
          level: lvl,
          duration: '40 min',
          categoryTagAr: 'قراءة واستيعاب',
          categoryTagEn: 'Reading'
        });
      });
    }
  });

  // 3. WRITING & EXPRESSION
  levels.forEach(lvl => {
    if (ALL_WRITING_UNITS[lvl]) {
      ALL_WRITING_UNITS[lvl].forEach(u => {
        all.push({
          id: String(u.id),
          pillarId: 'writing',
          courseId: 'writing',
          courseLabelAr: `الكتابة والتعبير ${lvl}`,
          courseLabelEn: `Writing & Spelling ${lvl}`,
          titleAr: u.titleAr,
          titleEn: u.titleEn,
          descriptionAr: `ورشة كتابة تفاعلية بمستوى ${lvl} مع تدقيق ذكي وصياغة متقدمة`,
          descriptionEn: `Writing workshop at ${lvl} level with AI feedback`,
          level: lvl,
          duration: '45 min',
          categoryTagAr: 'تعبير وكتابة',
          categoryTagEn: 'Writing'
        });
      });
    }
    if ((ALL_EXPRESSION_UNITS as any)[lvl]) {
      (ALL_EXPRESSION_UNITS as any)[lvl].forEach((u: any) => {
        all.push({
          id: String(u.id),
          pillarId: 'writing',
          courseId: 'expression',
          courseLabelAr: `التعبير الإبداعي ${lvl}`,
          courseLabelEn: `Creative Expression ${lvl}`,
          titleAr: u.titleAr,
          titleEn: u.titleEn,
          descriptionAr: `بناء الجمل والتعبير الحر بمستوى ${lvl}`,
          descriptionEn: `Sentence formulation & free expression at ${lvl}`,
          level: lvl,
          duration: '35 min',
          categoryTagAr: 'تعبير إبداعي',
          categoryTagEn: 'Expression'
        });
      });
    }
  });

  // 4. CONVERSATION
  levels.forEach(lvl => {
    if ((ALL_CONVERSATION_UNITS as any)[lvl]) {
      (ALL_CONVERSATION_UNITS as any)[lvl].forEach((u: any) => {
        all.push({
          id: String(u.id),
          pillarId: 'conversation',
          courseId: 'conversation',
          courseLabelAr: `المحادثة والتواصل ${lvl}`,
          courseLabelEn: `Speaking Club ${lvl}`,
          titleAr: u.titleAr,
          titleEn: u.titleEn,
          descriptionAr: `سيناريوهات حوار واقعية وتحدث مباشر بمستوى ${lvl}`,
          descriptionEn: `Real-life conversational scenarios at ${lvl}`,
          level: lvl,
          duration: '35 min',
          categoryTagAr: 'محادثة وتواصل',
          categoryTagEn: 'Speaking'
        });
      });
    }
  });

  // 5. OXFORD DISCOVER CURRICULUM
  OXFORD_UNITS.forEach(u => {
    all.push({
      id: String(u.id),
      pillarId: 'oxford',
      courseId: 'oxford',
      courseLabelAr: 'سلسلة أكسفورد المصورة',
      courseLabelEn: 'Oxford Discover',
      titleAr: u.titleAr || u.titleEn,
      titleEn: u.titleEn,
      descriptionAr: `وحدة تعليمية مصورة من منهج أكسفورد مع أنشطة التفكير والقيم`,
      descriptionEn: `Illustrated Oxford Discover unit with critical thinking & values`,
      level: 'General',
      duration: '50 min',
      categoryTagAr: 'منهج أكسفورد',
      categoryTagEn: 'Oxford'
    });
  });

  Object.keys(OLD_OXFORD_LESSONS).forEach(key => {
    const u = OLD_OXFORD_LESSONS[key];
    all.push({
      id: `old_${key}`,
      pillarId: 'oxford',
      courseId: 'oxford',
      courseLabelAr: 'أكسفورد الكلاسيكي',
      courseLabelEn: 'Classic Oxford Module',
      titleAr: u.bigQuestionAr || u.bigQuestion,
      titleEn: u.bigQuestion,
      descriptionAr: 'الوحدة المصورة الكلاسيكية مع السؤال الشامل',
      descriptionEn: 'Classic Oxford module featuring the Big Question',
      level: 'General',
      duration: '45 min',
      categoryTagAr: 'أكسفورد كلاسيكي',
      categoryTagEn: 'Oxford Classic'
    });
  });

  // 6. PRONUNCIATION LAB & PHONETICS
  PRONUNCIATION_LAB_DATA.forEach(p => {
    all.push({
      id: p.id,
      pillarId: 'pronunciation',
      courseId: 'pronunciation',
      courseLabelAr: 'معمل النطق الصوتي',
      courseLabelEn: 'Pronunciation Lab',
      titleAr: `تدريب نطق صوتي: ${p.title_ar || p.topic || p.id}`,
      titleEn: `Phonetics Lab: ${p.topic || p.title_ar || p.id}`,
      descriptionAr: 'تحليل موجة الصوت وتصحيح مخارج الحروف بالذكاء الاصطناعي',
      descriptionEn: 'Audio waveform analysis and AI pronunciation scoring',
      level: 'A2',
      duration: '25 min',
      categoryTagAr: 'صوتيات ونطق',
      categoryTagEn: 'Pronunciation'
    });
  });

  // 7. AUDITORY STORIES & NOOR IN LONDON
  STORIES.forEach(s => {
    all.push({
      id: s.id,
      pillarId: 'stories',
      courseId: 'story-library',
      courseLabelAr: 'القصص المسموعة ومغامرات نور',
      courseLabelEn: 'Auditory Story Library',
      titleAr: s.titleAr,
      titleEn: s.titleEn,
      descriptionAr: `قصة مسموعة تفاعلية بمستوى ${s.level} مع اختبار قياس الاستماع`,
      descriptionEn: `Audio story at level ${s.level} with listening comprehension`,
      level: s.level || 'B1',
      duration: '30 min',
      categoryTagAr: 'قصص مسموعة',
      categoryTagEn: 'Auditory Stories'
    });
  });

  // 8. EARLY CHILDHOOD & TODDLERS
  const childhoodModules = [
    { id: 'first-words', titleAr: 'الكلمات الأولى من حولنا بالصوت والصورة 👶', titleEn: 'First Words Around Us 👶', descAr: 'مفردات بصرية أساسية للأطفال مع النطق الصحيح' },
    { id: 'colors', titleAr: 'عالم الألوان الممتعة والتراكيب 🎨', titleEn: 'Fun Colors World 🎨', descAr: 'تمييز الألوان وتسميتها بالنطق الصحيح' },
    { id: 'numbers', titleAr: 'عد الأرقام بالإنجليزية والتمارين التفاعلية 🔢', titleEn: 'Early Numbers & Counting 🔢', descAr: 'الأرقام من 1 إلى 20 والألعاب التفاعلية' },
    { id: 'letters', titleAr: 'صوتيات الحروف والقصص الكرتونية A-Z 🔤', titleEn: 'Phonics Letters Friends A-Z 🔤', descAr: 'حروف اللغة الإنجليزية مع نطق الأصوات والرسوم' },
    { id: 'animals', titleAr: 'عالم الحيوانات وأصواتها في الغابة والمزرعة 🦁', titleEn: 'Animal Kingdom & Sounds 🦁', descAr: 'أسماء وأصوات الحيوانات ومطابقتها' },
    { id: 'shapes', titleAr: 'الأشكال الهندسية والأبعاد وتلوينها 📐', titleEn: 'Shapes & Dimensions 📐', descAr: 'الدائرة والمربع والمثلث والنجوم وتلوينها' },
    { id: 'pronunciation', titleAr: 'معمل النطق الذكي للبراعم مع التميمة 🎙️', titleEn: 'Mascot Pronunciation for Toddlers 🎙️', descAr: 'تسجيل الصوت وتصحيح نطق البراعم بأسلوب تشجيعي' },
    { id: 'creative-lab', titleAr: 'المرسم الإبداعي والتلوين الصوتي 🖌️', titleEn: 'Creative Lab & Coloring 🖌️', descAr: 'سبورة التلوين التفاعلية وربط الصورة بالصوت' },
    { id: 'phonics-review', titleAr: 'تحدي بطل الصوتيات والمراجعة الشاملة 🏆', titleEn: 'Phonics Champion Review Challenge 🏆', descAr: 'اختبار ممتع وأوسمة تشجيعية للأبطال الصغار' }
  ];

  childhoodModules.forEach(c => {
    all.push({
      id: c.id,
      pillarId: 'early_childhood',
      courseId: 'early_childhood',
      courseLabelAr: 'أكاديمية الطفولة المبكرة 👶',
      courseLabelEn: 'Early Childhood Academy 👶',
      titleAr: c.titleAr,
      titleEn: c.titleEn,
      descriptionAr: c.descAr,
      descriptionEn: 'Interactive foundational learning for toddlers and young learners',
      level: 'Kid',
      duration: '25 min',
      categoryTagAr: 'طفولة مبكرة',
      categoryTagEn: 'Early Childhood'
    });
  });

  // 9. KIDS & JUNIOR STORIES
  KIDS_STORIES.forEach(s => {
    all.push({
      id: s.lesson_id,
      pillarId: 'kids_stories',
      courseId: 'kids_stories',
      courseLabelAr: 'قصص الأطفال واليافعين',
      courseLabelEn: 'Kids & Junior Story',
      titleAr: s.title_ar,
      titleEn: s.title_en,
      descriptionAr: `قصة قصيرة مشوقة بمستوى ${s.level} مع اختبار فهم المفردات`,
      descriptionEn: `Engaging junior story at ${s.level} with quiz`,
      level: s.level || 'A1',
      duration: '25 min',
      categoryTagAr: 'قصص أطفال',
      categoryTagEn: 'Junior Stories'
    });
  });

  // 10. DAILY DOSE & ERROR CLINIC
  ADULTS_DAILY_DOSES.forEach(d => {
    all.push({
      id: d.lesson_id,
      pillarId: 'daily_dose',
      courseId: 'adults_daily_dose',
      courseLabelAr: 'الجرعة اليومية وتصحيح الأخطاء',
      courseLabelEn: 'Daily Dose & Error Clinic',
      titleAr: d.title_ar,
      titleEn: d.title_en,
      descriptionAr: `شذرة لغوية مركزة في 5 دقائق بمستوى ${d.level}`,
      descriptionEn: `Bite-sized daily dose targeted lesson at ${d.level}`,
      level: d.level || 'B1',
      duration: '15 min',
      categoryTagAr: 'جرعة يومية',
      categoryTagEn: 'Daily Dose'
    });
  });

  // 11. INTERACTIVE PLAY, SONGS, ESCAPE ROOMS & FAMILY
  ENGLISH_WITH_SONGS_DATA.forEach(s => {
    all.push({
      id: s.id,
      pillarId: 'interactive_play',
      courseId: 'english_songs',
      courseLabelAr: 'كاريوكي الأغاني الإنجليزية 🎵',
      courseLabelEn: 'English Songs Karaoke 🎵',
      titleAr: `أغنية تعليمية: ${s.title} (${s.level})`,
      titleEn: `Interactive Song: ${s.title} (${s.level})`,
      descriptionAr: 'غناء تفاعلي متزامن مع الكلمات لتحسين طلاقة النطق والإيقاع',
      descriptionEn: 'Lyric karaoke to build pronunciation rhythm and fluency',
      level: s.level === 'أطفال' ? 'Kid' : 'A2',
      duration: '20 min',
      categoryTagAr: 'أغاني تفاعلية',
      categoryTagEn: 'Songs'
    });
  });

  CARTOON_SERIES_DATA.forEach(c => {
    all.push({
      id: c.id,
      pillarId: 'interactive_play',
      courseId: 'animated_storyboard',
      courseLabelAr: 'مشاهد لندن الكرتونية 🎬',
      courseLabelEn: 'London Animated Storyboards 🎬',
      titleAr: `حلقة كرتون: ${c.title_ar}`,
      titleEn: `Episode: Noor in London - ${c.title_ar}`,
      descriptionAr: 'مشاهد كرتونية متتابعة مع حوارات ومواقف اجتماعية حية',
      descriptionEn: 'Animated sequence with real London conversations',
      level: 'A2',
      duration: '25 min',
      categoryTagAr: 'رسوم كرتونية',
      categoryTagEn: 'Animation'
    });
  });

  ESCAPE_ROOM_PUZZLES_DATA.forEach(p => {
    all.push({
      id: p.id,
      pillarId: 'interactive_play',
      courseId: 'escape_room',
      courseLabelAr: 'غرفة هروب القواعد 🔐',
      courseLabelEn: 'Grammar Escape Room 🔐',
      titleAr: `أحجية ذكية: ${p.title_ar}`,
      titleEn: `Grammar Puzzle: ${p.title_ar}`,
      descriptionAr: 'حل الألغاز النحوية لفتح الأبواب والهروب بذكاء',
      descriptionEn: 'Solve grammatical clues to unlock doors and escape',
      level: 'B1',
      duration: '30 min',
      categoryTagAr: 'غرفة هروب',
      categoryTagEn: 'Escape Room'
    });
  });

  ROLE_PLAY_CHALLENGES_DATA.forEach(r => {
    all.push({
      id: r.id,
      pillarId: 'interactive_play',
      courseId: 'roleplay_challenges',
      courseLabelAr: 'تحديات الحوار والتمثيل 🎭',
      courseLabelEn: 'Roleplay Challenges 🎭',
      titleAr: `تحدي تفاعلي: ${r.title_ar} (${r.category})`,
      titleEn: `Roleplay: ${r.title_ar} (${r.category})`,
      descriptionAr: 'تقمص الأدوار في مواقف عملية كالمطار والفندق والمطعم',
      descriptionEn: 'Roleplay scenarios in airports, restaurants and daily life',
      level: 'B1',
      duration: '30 min',
      categoryTagAr: 'حوار تمثيلي',
      categoryTagEn: 'Roleplay'
    });
  });

  VISUAL_DICTIONARY_DATA.forEach(v => {
    all.push({
      id: v.id,
      pillarId: 'interactive_play',
      courseId: 'visual_dictionary',
      courseLabelAr: 'القاموس المصور 🎨',
      courseLabelEn: 'Visual Dictionary 🎨',
      titleAr: `مفردات بصرية: ${v.category_ar} (${v.words_count} كلمات)`,
      titleEn: `Visual Vocab: ${v.category_ar} (${v.words_count} words)`,
      descriptionAr: 'تعلم الكلمات عبر الربط البصري والصوت وألعاب التخمين',
      descriptionEn: 'Visual association vocabulary cards with sound effects',
      level: 'A1',
      duration: '20 min',
      categoryTagAr: 'قاموس مصور',
      categoryTagEn: 'Visual Dictionary'
    });
  });

  FAMILY_GAMES_DATA.forEach(g => {
    all.push({
      id: g.id,
      pillarId: 'interactive_play',
      courseId: 'family_activities',
      courseLabelAr: 'مسابقات العائلة التفاعلية 👨‍👩‍👧‍👦',
      courseLabelEn: 'Family Co-op Play 👨‍👩‍👧‍👦',
      titleAr: `لعبة عائلية: ${g.title_ar}`,
      titleEn: `Family Activity: ${g.title_ar}`,
      descriptionAr: 'أنشطة وألعاب تنافسية ممتعة تشارك فيها الأسرة',
      descriptionEn: 'Cooperative interactive games for the entire family',
      level: 'General',
      duration: '30 min',
      categoryTagAr: 'أنشطة عائلية',
      categoryTagEn: 'Family Games'
    });
  });

  COOKING_CHALLENGES_DATA.forEach(cook => {
    all.push({
      id: cook.id,
      pillarId: 'interactive_play',
      courseId: 'family_activities',
      courseLabelAr: 'مطبخ العائلة بالإنجليزية 🍕',
      courseLabelEn: 'Family Kitchen Challenge 🍕',
      titleAr: `وصفة طبخ وتحدث: ${cook.title_en}`,
      titleEn: `Cooking & Speaking: ${cook.title_en}`,
      descriptionAr: 'تعلم مفردات الطبخ وإعداد الوصفات باللغة الإنجليزية',
      descriptionEn: 'Master cooking recipes and conversational food vocabulary',
      level: 'General',
      duration: '35 min',
      categoryTagAr: 'مطبخ العائلة',
      categoryTagEn: 'Cooking'
    });
  });

  // 12. TRANSLATION & LANGUAGE LAB
  Object.values(LANGUAGE_LAB_DATA).forEach(lab => {
    all.push({
      id: `lang_lab_${lab.id}`,
      pillarId: 'translation_language_lab',
      courseId: 'live_translate',
      courseLabelAr: 'مختبر اللغة والترجمة',
      courseLabelEn: 'Language Lab & Translation',
      titleAr: lab.titleAr,
      titleEn: lab.title,
      descriptionAr: lab.explanationAr,
      descriptionEn: lab.explanation,
      level: 'B1',
      duration: '30 min',
      categoryTagAr: 'مختبر لغة',
      categoryTagEn: 'Language Lab'
    });
  });

  // 13. WORLD BOOK COURSES & SELF-DEVELOPMENT
  COURSES.forEach(book => {
    const courseShortAr = book.titleAr.includes(':') ? book.titleAr.split(':')[0] : book.titleAr;
    const courseShortEn = book.titleEn.includes(':') ? book.titleEn.split(':')[0] : book.titleEn;

    book.chapters.forEach(ch => {
      ch.lessons.forEach(lesson => {
        all.push({
          id: `${book.id}__${lesson.id}`,
          pillarId: 'book_courses',
          courseId: book.id,
          courseLabelAr: courseShortAr,
          courseLabelEn: courseShortEn,
          titleAr: `${lesson.titleAr}`,
          titleEn: `${lesson.titleEn}`,
          descriptionAr: lesson.contentAr ? lesson.contentAr.slice(0, 160) + '...' : `درس من كتاب ${book.titleAr} للمؤلف ${book.authorAr}`,
          descriptionEn: lesson.contentEn ? lesson.contentEn.slice(0, 160) + '...' : `Lesson from ${book.titleEn} by ${book.authorEn}`,
          level: 'B2',
          duration: lesson.duration || '20 min',
          categoryTagAr: 'كتب عالمية',
          categoryTagEn: 'Bestseller Books'
        });
      });
    });
  });

  // 14. CINEMATIC PRODUCED VIDEO LESSONS & SCENARIOS
  PRODUCED_VIDEO_LESSONS.forEach(vid => {
    vid.scenes.forEach(scene => {
      all.push({
        id: `${vid.id}__scene_${scene.sceneNumber}`,
        pillarId: 'video_lessons',
        courseId: vid.id,
        courseLabelAr: vid.titleAr,
        courseLabelEn: vid.titleEn,
        titleAr: `المشهد ${scene.sceneNumber}: ${scene.titleAr}`,
        titleEn: `Scene ${scene.sceneNumber}: ${scene.titleEn}`,
        descriptionAr: scene.narration?.ar || vid.summaryAr,
        descriptionEn: scene.narration?.en || vid.summaryEn,
        level: vid.level,
        duration: vid.duration,
        categoryTagAr: 'دروس مرئية',
        categoryTagEn: 'Video Lesson'
      });
    });
  });

  // 15. FOUNDATIONAL AI PROGRAM (البرنامج التأسيسي للذكاء الاصطناعي - 20 درساً)
  AI_CURRICULUM_DATA.program_levels.forEach(lvl => {
    lvl.lessons.forEach(l => {
      all.push({
        id: `ai_foundational_l${l.lesson_number}`,
        pillarId: 'ai_foundational',
        courseId: 'ai_foundational',
        courseLabelAr: `الذكاء التأسيسي: المستوى ${lvl.level_number}`,
        courseLabelEn: `Foundational AI: Level ${lvl.level_number}`,
        titleAr: `الدرس ${l.lesson_number}: ${l.lesson_title}`,
        titleEn: `Lesson ${l.lesson_number}: ${l.lesson_title}`,
        descriptionAr: l.core_concept ? l.core_concept.slice(0, 150) : l.detailed_explanation?.slice(0, 150),
        descriptionEn: `Core AI Literacy lesson #${l.lesson_number}`,
        level: lvl.level_number <= 2 ? 'A1' : lvl.level_number <= 4 ? 'A2' : 'B1',
        duration: '25 min',
        categoryTagAr: 'ذكاء تأسيسي',
        categoryTagEn: 'AI Foundations'
      });
    });
  });

  // 16. ADVANCED SPECIALIZED AI TRACKS (المسارات التخصصية المتقدمة للذكاء الاصطناعي)
  ADVANCED_CURRICULUM_DATA.tracks.forEach((track, tIdx) => {
    track.lessons.forEach(l => {
      all.push({
        id: `ai_adv_t${tIdx + 1}_l${l.lesson_number}`,
        pillarId: 'ai_specialized',
        courseId: 'ai_specialized',
        courseLabelAr: track.track_name,
        courseLabelEn: `Specialized Track: ${track.track_name}`,
        titleAr: l.lesson_title,
        titleEn: l.lesson_title,
        descriptionAr: l.lesson_card?.content ? l.lesson_card.content.slice(0, 150) : track.track_description,
        descriptionEn: `Specialized AI deep-dive: ${l.lesson_title}`,
        level: 'B2',
        duration: '35 min',
        categoryTagAr: 'ذكاء تخصصي',
        categoryTagEn: 'Specialized AI'
      });
    });
  });

  // 17. PROMPT ENGINEERING PROFESSIONAL ACADEMY (احترافية المطالبات - 24 درساً)
  PROMPT_PROFESSIONAL_DATA.levels.forEach(lvl => {
    lvl.lessons.forEach(l => {
      all.push({
        id: `ai_prompt_pro_l${l.lesson_number}`,
        pillarId: 'ai_prompt_pro',
        courseId: 'ai_prompt_pro',
        courseLabelAr: `احترافية المطالبات: ${lvl.level_title}`,
        courseLabelEn: `Prompt Pro: ${lvl.level_title}`,
        titleAr: `المحاضرة ${l.lesson_number}: ${l.lesson_title}`,
        titleEn: `Lecture ${l.lesson_number}: ${l.lesson_title}`,
        descriptionAr: l.content ? l.content.slice(0, 150) : 'هندسة وصياغة المطالبات المتقدمة',
        descriptionEn: `Advanced Prompt Engineering lecture #${l.lesson_number}`,
        level: lvl.level_number <= 2 ? 'B2' : 'C1',
        duration: '30 min',
        categoryTagAr: 'احتراف المطالبات',
        categoryTagEn: 'Prompt Pro'
      });
    });
  });

  // 18. PROFESSIONAL & PERSONAL DEVELOPMENT COURSES (الدورات التطويرية والمهنية)
  COURSES.forEach(book => {
    book.chapters.forEach(chap => {
      all.push({
        id: `prof_dev_${book.id}_ch_${chap.id}`,
        pillarId: 'professional_dev',
        courseId: book.id,
        courseLabelAr: `دورة تطويرية: ${book.titleAr}`,
        courseLabelEn: `Professional Course: ${book.titleEn}`,
        titleAr: `${book.titleAr}: ${chap.titleAr}`,
        titleEn: `${book.titleEn}: ${chap.titleEn}`,
        descriptionAr: chap.descriptionAr || book.descriptionAr,
        descriptionEn: chap.descriptionEn || book.descriptionEn,
        level: 'B1',
        duration: '30 min',
        categoryTagAr: 'دورات تطويرية',
        categoryTagEn: 'Professional Courses'
      });
    });
  });

  // Deduplicate lessons by composite key to guarantee unique items
  const seenKeys = new Set<string>();
  const uniqueLessons: CurriculumLesson[] = [];
  for (const item of all) {
    const key = `${item.pillarId}:${item.id}`;
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      uniqueLessons.push(item);
    }
  }

  return uniqueLessons;
}

export interface PlanItem {
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
  isTest?: boolean;
  scheduledAt?: string;
  trackId?: string;
  trackBadge?: string;
  phaseLabel?: string;
  isCatchUpDay?: boolean;
}

export interface SpecializedPlanTrack {
  id: string;
  category: 'goal' | 'adaptive' | 'lifestyle' | 'academic' | 'kids' | 'fluency' | 'accountability' | 'ai_professional';
  titleAr: string;
  titleEn: string;
  badgeAr: string;
  badgeEn: string;
  descAr: string;
  descEn: string;
  icon: string;
  recommendedDurationWeeks: number;
  recommendedLessonsPerDay: number;
  recommendedDays: number[];
  recommendedPillars: string[];
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced' | 'all';
  color: string;
  gradient: string;
}

export const SPECIALIZED_PLAN_TRACKS: SpecializedPlanTrack[] = [
  // Academic Default
  {
    id: 'comprehensive',
    category: 'academic',
    titleAr: 'الخطة الأكاديمية الشاملة',
    titleEn: 'Comprehensive Academic Plan',
    badgeAr: '🎓 التأسيس والشمولية',
    badgeEn: '🎓 Comprehensive Foundation',
    descAr: 'خطة شاملة ومتوازنة تتنقل بين القواعد، القراءة، المحادثة، والكتابة لبناء أساس لغوي متين ومتكامل.',
    descEn: 'A balanced track rotating through grammar, reading, conversation, and writing for solid foundation.',
    icon: '📚',
    recommendedDurationWeeks: 13,
    recommendedLessonsPerDay: 2,
    recommendedDays: [0, 1, 2, 3, 4],
    recommendedPillars: [
      'grammar', 'reading', 'conversation', 'writing', 'expression',
      'oxford_discover', 'stories', 'adults_daily_dose', 'interactive_play'
    ],
    difficultyLevel: 'intermediate',
    color: 'blue',
    gradient: 'from-blue-600 via-indigo-600 to-sky-700'
  },

  // 1. Goal-Oriented Tracks (خطط الأهداف المتخصصة)
  {
    id: 'ielts_toefl',
    category: 'goal',
    titleAr: 'مسار اجتياز اختبارات الآيلتس والتوفل الأكاديمي',
    titleEn: 'IELTS & TOEFL Academic Sprint',
    badgeAr: '🎯 إعداد أكاديمي وامتحانات',
    badgeEn: '🎯 Academic Exam Preparation',
    descAr: 'مكثف يركز على القراءة الأكاديمية، الكتابة التحليلية، الكلمات المتقدمة، ومحاكاة المقابلة الشفهية مع سارة.',
    descEn: 'Focused intensive on academic reading, analytical writing, high-level vocabulary, and speaking interview simulations.',
    icon: '🎯',
    recommendedDurationWeeks: 4,
    recommendedLessonsPerDay: 2,
    recommendedDays: [0, 1, 2, 3, 4],
    recommendedPillars: ['reading', 'writing', 'conversation', 'grammar', 'translation_language_lab'],
    difficultyLevel: 'advanced',
    color: 'emerald',
    gradient: 'from-emerald-600 via-teal-600 to-cyan-700'
  },
  {
    id: 'business_interview',
    category: 'goal',
    titleAr: 'مسار المقابلات المهنية وإنجليزي الأعمال',
    titleEn: 'Job Interview & Business English',
    badgeAr: '💼 سوق العمل والشركات',
    badgeEn: '💼 Career & Workplace Mastery',
    descAr: 'تدريب احترافي على أسئلة مقابلات التوظيف، كتابة الإيميلات الرسمية، والتفاوض وعروض الأعمال مع محاكاة حية.',
    descEn: 'Master HR interview responses, professional emails, negotiation tactics, and business presentations.',
    icon: '💼',
    recommendedDurationWeeks: 4,
    recommendedLessonsPerDay: 2,
    recommendedDays: [0, 1, 2, 3, 4],
    recommendedPillars: ['conversation', 'expression', 'interactive_play', 'adults_daily_dose'],
    difficultyLevel: 'intermediate',
    color: 'amber',
    gradient: 'from-amber-600 via-orange-600 to-amber-700'
  },
  {
    id: 'traveler_survival',
    category: 'goal',
    titleAr: 'مسار السفر والمواقف السريعة (14 يوماً)',
    titleEn: "Traveler's Survival 14-Day Plan",
    badgeAr: '✈️ 14 يوماً للمواقف الحية',
    badgeEn: '✈️ 14-Day Real-Life Scenarios',
    descAr: 'محاكاة مواقف السفر: المطار، الفنادق، طلب الطعام، التوجيهات والمواقف الطارئة مع حوارات تفاعلية حية على السبورة.',
    descEn: 'Immersion in airport navigation, hotel check-ins, dining out, asking directions, and emergency dialogues.',
    icon: '✈️',
    recommendedDurationWeeks: 2,
    recommendedLessonsPerDay: 2,
    recommendedDays: [0, 1, 2, 3, 4, 5, 6],
    recommendedPillars: ['conversation', 'interactive_play', 'adults_daily_dose', 'stories'],
    difficultyLevel: 'all',
    color: 'cyan',
    gradient: 'from-cyan-600 via-blue-600 to-teal-700'
  },

  // 2. AI Remedial & Adaptive Plans (خطط تكيّفية لعلاج نقاط الضعف)
  {
    id: 'weakness_recovery',
    category: 'adaptive',
    titleAr: 'خطة رادار الضعف وسد الفجوات التلقائي',
    titleEn: 'AI Weakness Recovery Radar Plan',
    badgeAr: '⚡ علاج فوري وتثبيت القواعد',
    badgeEn: '⚡ Targeted Remedial & Reinforcement',
    descAr: 'تحلل سارة نتائج اختباراتك السابقة لتجمع فوراً الدروس والقواعد التي تحتاج تقوية وسد فجواتها بإشراف مباشر.',
    descEn: 'Sara detects lessons and quizzes where you scored under 80% and builds an agile recovery roadmap.',
    icon: '⚡',
    recommendedDurationWeeks: 2,
    recommendedLessonsPerDay: 2,
    recommendedDays: [0, 1, 2, 3, 4],
    recommendedPillars: ['grammar', 'reading', 'conversation', 'writing'],
    difficultyLevel: 'all',
    color: 'rose',
    gradient: 'from-rose-600 via-pink-600 to-red-700'
  },
  {
    id: 'spaced_repetition',
    category: 'adaptive',
    titleAr: 'خطة التكرار المتباعد والمراجعة الذكية',
    titleEn: 'Spaced Repetition & Retention Plan',
    badgeAr: '🧠 تثبيت في الذاكرة الدائمة',
    badgeEn: '🧠 Long-Term Memory Retention',
    descAr: 'جدولة مراجعات دورية ذكية بعد 3 أيام وأسبوع وأسبوعين لمنع النسيان وترسيخ المفردات والقواعد للأبد.',
    descEn: 'Strategic review intervals at 3-day, 7-day, and 14-day marks to cement lessons into long-term recall.',
    icon: '🧠',
    recommendedDurationWeeks: 6,
    recommendedLessonsPerDay: 2,
    recommendedDays: [0, 2, 4], // Sun, Tue, Thu
    recommendedPillars: [
      'grammar', 'reading', 'conversation', 'writing', 'expression', 'oxford_discover'
    ],
    difficultyLevel: 'intermediate',
    color: 'purple',
    gradient: 'from-purple-600 via-violet-600 to-indigo-700'
  },

  // 3. Lifestyle & Paced Plans (خطط نمط الحياة والوقت المتاح)
  {
    id: 'micro_10min',
    category: 'lifestyle',
    titleAr: 'خطة الـ 10 دقائق اليومية للمشغولين',
    titleEn: '10-Minute Daily Micro-Learning Track',
    badgeAr: '⏱️ 10 دقائق يومياً بلا ضغط',
    badgeEn: '⏱️ 10-Minute Daily Habit',
    descAr: 'درس واحد مركز يومياً مدته 10-15 دقيقة مع كويز سريع، مصمم للمشغولين للحفاظ على الاستمرارية وسلسلة الـ Streak.',
    descEn: 'One high-impact 10-minute lesson daily with a quick quiz, tailored for busy schedules without breaking streaks.',
    icon: '⏱️',
    recommendedDurationWeeks: 4,
    recommendedLessonsPerDay: 1,
    recommendedDays: [0, 1, 2, 3, 4, 5, 6],
    recommendedPillars: ['adults_daily_dose', 'conversation', 'grammar'],
    difficultyLevel: 'all',
    color: 'amber',
    gradient: 'from-amber-500 via-yellow-600 to-orange-600'
  },
  {
    id: 'weekend_bootcamp',
    category: 'lifestyle',
    titleAr: 'معسكر عطلة نهاية الأسبوع المكثف',
    titleEn: 'Weekend Intensive Bootcamp',
    badgeAr: '🚀 الجمعة والسبت فقط',
    badgeEn: '🚀 Friday & Saturday Focus',
    descAr: 'جرعة مكثفة يومي الجمعة والسبت فقط، 3 حصص يومياً مع فترات راحة مبرمجة وجلسات تطبيقية عميقة وممتعة.',
    descEn: 'Concentrated 3 lessons/day on Fridays and Saturdays only, featuring programmed breaks and deep practice.',
    icon: '🚀',
    recommendedDurationWeeks: 8,
    recommendedLessonsPerDay: 3,
    recommendedDays: [5, 6], // Fri, Sat
    recommendedPillars: ['grammar', 'reading', 'conversation', 'writing', 'interactive_play'],
    difficultyLevel: 'all',
    color: 'teal',
    gradient: 'from-teal-600 via-emerald-600 to-cyan-700'
  },
  {
    id: 'mastery_100day',
    category: 'lifestyle',
    titleAr: 'رحلة الـ 100 يوم للإتقان الشامل',
    titleEn: '100-Day Comprehensive Mastery Journey',
    badgeAr: '🏆 100 يوم نحو الطلاقة التامة',
    badgeEn: '🏆 100 Days to Full Fluency',
    descAr: 'رحلة متدرجة عبر 3 محطات رئيسية (تأسيس، طلاقة، تميز) مع اختبارات قياس ونهاية بالشهادة الذهبية المعتمدة.',
    descEn: 'A 100-day milestone roadmap across 3 progressive phases, concluding with a verified academy diploma.',
    icon: '🏆',
    recommendedDurationWeeks: 14,
    recommendedLessonsPerDay: 1,
    recommendedDays: [0, 1, 2, 3, 4],
    recommendedPillars: [
      'grammar', 'reading', 'conversation', 'writing', 'expression',
      'oxford_discover', 'stories', 'adults_daily_dose', 'interactive_play'
    ],
    difficultyLevel: 'all',
    color: 'indigo',
    gradient: 'from-indigo-600 via-purple-600 to-pink-600'
  },

  // 4. Kids & Phonics Adventure (خطط الأطفال والصوتيات التأسيسية)
  {
    id: 'phonics_safari',
    category: 'kids',
    titleAr: 'مغامرة الصوتيات وقراءة الكلمات (30 يوماً)',
    titleEn: 'Phonics Safari & Word Reading (30 Days)',
    badgeAr: '🦁 تأسيس الصوتيات والقراءة',
    badgeEn: '🦁 Phonics & Word Safari',
    descAr: 'خطة تأسيسية ممتعة للأطفال: أصوات الحروف، الدمج الصوتي، قراءة الكلمات الثلاثية (CVC)، وتشجيع صوتي حماسي من سارة.',
    descEn: 'Foundational phonics track for kids: letter sounds, phonetic blending, CVC decoding, and cheerful praise from Sara.',
    icon: '🦁',
    recommendedDurationWeeks: 4,
    recommendedLessonsPerDay: 1,
    recommendedDays: [0, 1, 2, 3, 4],
    recommendedPillars: ['oxford_discover', 'interactive_play', 'stories', 'translation_language_lab'],
    difficultyLevel: 'beginner',
    color: 'amber',
    gradient: 'from-amber-400 via-orange-500 to-yellow-600'
  },
  {
    id: 'storybook_reader',
    category: 'kids',
    titleAr: 'خطة قارئ القصص المصورة الصغير',
    titleEn: 'Little Storybook Reader Plan',
    badgeAr: '📖 قصص تفاعلية وخيال',
    badgeEn: '📖 Interactive Storybook Reader',
    descAr: 'قصة مصورة يومياً من مكتبة القصص التفاعلية، مع أسئلة فهم ممتعة وتمثيل أصوات شخصيات القصة مع سارة.',
    descEn: 'One illustrated story daily with fun comprehension quizzes and character voice roleplay with Sara.',
    icon: '📖',
    recommendedDurationWeeks: 4,
    recommendedLessonsPerDay: 1,
    recommendedDays: [0, 1, 2, 3, 4],
    recommendedPillars: ['stories', 'interactive_play'],
    difficultyLevel: 'beginner',
    color: 'emerald',
    gradient: 'from-emerald-400 via-teal-500 to-green-600'
  },

  // 5. Fluency & Confidence (خطة الطلاقة والتحدث دون خوف)
  {
    id: 'speak_without_fear',
    category: 'fluency',
    titleAr: 'تحدي الطلاقة والتحدث دون خوف (30 يوماً)',
    titleEn: '30-Day "Speak Without Fear" Challenge',
    badgeAr: '🗣️ كسر حاجز الخجل والطلاقة',
    badgeEn: '🗣️ Speak Without Fear',
    descAr: 'جلسات محادثة يومية متدرجة تبدأ من جملة واحدة وتصل إلى 5 دقائق من التحدث الحر، مع تدريب معمل النطق وتحديات تمثيل الأدوار.',
    descEn: 'Progressive daily speaking sessions scaling from single sentences to uninhibited fluency with pronunciation feedback.',
    icon: '🗣️',
    recommendedDurationWeeks: 4,
    recommendedLessonsPerDay: 2,
    recommendedDays: [0, 1, 2, 3, 4],
    recommendedPillars: ['conversation', 'interactive_play', 'expression', 'translation_language_lab'],
    difficultyLevel: 'intermediate',
    color: 'rose',
    gradient: 'from-rose-500 via-red-500 to-pink-600'
  },
  {
    id: 'accent_pronunciation',
    category: 'fluency',
    titleAr: 'معمل مخارج الحروف واللكنة الواضحة',
    titleEn: 'Clear Pronunciation & Accent Lab',
    badgeAr: '🎙️ تصحيح النطق ومخارج الأصوات',
    badgeEn: '🎙️ Accent & Clear Articulation',
    descAr: 'تدريب تفصيلي على الفروق الصوتية الصعبة (P vs B, TH, R/L)، التشديد والتنغيم اللغوي، ونطق العبارات بسلاسة تشبه المتحدث الأصلي.',
    descEn: 'Master tricky English phonemes, syllable stress, intonation patterns, and rhythm for clear, natural speech.',
    icon: '🎙️',
    recommendedDurationWeeks: 4,
    recommendedLessonsPerDay: 2,
    recommendedDays: [0, 1, 2, 3, 4],
    recommendedPillars: ['translation_language_lab', 'conversation', 'oxford_discover', 'interactive_play'],
    difficultyLevel: 'all',
    color: 'violet',
    gradient: 'from-violet-600 via-purple-600 to-indigo-700'
  },

  // 1B & 2B Enhancements: Study Abroad & Error Pattern Buster
  {
    id: 'study_abroad_readiness',
    category: 'goal',
    titleAr: 'مسار الابتعاث والدراسة بالجامعات الدولية',
    titleEn: 'Study Abroad & Campus English',
    badgeAr: '🌍 مهارات الحرم الجامعي والغربة',
    badgeEn: '🌍 Campus & Academic Living',
    descAr: 'تأهيل متكامل للحياة الجامعية: مناقشات المحاضرات، التواصل مع الأساتذة، تدوين الملاحظات الأكاديمية، والتعاملات الحياتية في السكن.',
    descEn: 'Comprehensive preparation for campus life: lecture listening, professor office hours, academic notes, and campus community life.',
    icon: '🌍',
    recommendedDurationWeeks: 6,
    recommendedLessonsPerDay: 2,
    recommendedDays: [0, 1, 2, 3, 4],
    recommendedPillars: ['conversation', 'reading', 'writing', 'interactive_play', 'adults_daily_dose'],
    difficultyLevel: 'advanced',
    color: 'sky',
    gradient: 'from-sky-600 via-blue-700 to-indigo-800'
  },
  {
    id: 'error_pattern_booster',
    category: 'adaptive',
    titleAr: 'خطة تفكيك وتصحيح الأخطاء الشائعة',
    titleEn: 'Common Mistakes Elimination Sprint',
    badgeAr: '🔍 تصحيح الأخطاء اللغوية المتكررة',
    badgeEn: '🔍 Common Mistakes Eraser',
    descAr: 'معالجة متخصصة لأكثر الأخطاء تكراراً في حروف الجر، الأزمنة المركبة، وترتيب الكلمات، مع شروح مقارنة ذكية وتمارين تركيز.',
    descEn: 'Targeted remediation of the top grammatical and structural pitfalls in tenses, prepositions, and word order.',
    icon: '🔍',
    recommendedDurationWeeks: 3,
    recommendedLessonsPerDay: 2,
    recommendedDays: [0, 1, 2, 3, 4],
    recommendedPillars: ['grammar', 'writing', 'reading', 'translation_language_lab'],
    difficultyLevel: 'intermediate',
    color: 'orange',
    gradient: 'from-orange-500 via-amber-600 to-red-600'
  },

  // 6. Habit & Accountability Engine & Exam Prep (محرك الالتزام ومراجعة الامتحانات المدرسية)
  {
    id: 'school_exam_cram',
    category: 'accountability',
    titleAr: 'خطة الاستعداد للاختبارات والامتحانات المدرسية',
    titleEn: 'School Exam & Final Test Sprint',
    badgeAr: '📝 مراجعة مكثفة وبنوك أسئلة',
    badgeEn: '📝 Exam Sprint & Test Mastery',
    descAr: 'مراجعة مكثفة قبل الاختبارات: نماذج أسئلة وتلخيص شامل للقواعد والمفردات وكويزات سريعة لضمان العلامة الكاملة.',
    descEn: 'High-intensity review sprint for school exams: test patterns, speed quizzes, grammar summaries, and targeted practice for top grades.',
    icon: '📝',
    recommendedDurationWeeks: 2,
    recommendedLessonsPerDay: 3,
    recommendedDays: [0, 1, 2, 3, 4],
    recommendedPillars: ['grammar', 'reading', 'writing', 'translation_language_lab', 'expression'],
    difficultyLevel: 'all',
    color: 'emerald',
    gradient: 'from-emerald-600 via-teal-600 to-green-700'
  },
  {
    id: 'smart_habit_accountability',
    category: 'accountability',
    titleAr: 'خطة الالتزام الذكي والتقرير الأسبوعي مع سارة',
    titleEn: "Sara's Accountability & Habit Coach",
    badgeAr: '🛡️ انضباط يومي وتقارير أسبوعية',
    badgeEn: '🛡️ Daily Habits & Weekly Reports',
    descAr: 'نظام انضباط يومي مدعوم بمرونة تعويض الأيام، متابعة سلسلة الإنجاز (Streak)، وتقارير أداء أسبوعية مفصلة مع تشجيع خاص من سارة.',
    descEn: 'Daily discipline system with flex catch-up days, streak tracking, detailed weekly report cards, and proactive Sara coaching.',
    icon: '🛡️',
    recommendedDurationWeeks: 8,
    recommendedLessonsPerDay: 1,
    recommendedDays: [0, 1, 2, 3, 4],
    recommendedPillars: [
      'grammar', 'reading', 'conversation', 'writing', 'adults_daily_dose', 'stories'
    ],
    difficultyLevel: 'all',
    color: 'blue',
    gradient: 'from-blue-600 via-indigo-700 to-violet-800'
  },
  {
    id: 'weekly_challenge_league',
    category: 'accountability',
    titleAr: 'دوري التحديات الأسبوعية ولوحة الشرف',
    titleEn: 'Weekly Challenge League & Honor Roll',
    badgeAr: '🎖️ مهام وتحديات نقاط الخبرة XP',
    badgeEn: '🎖️ Weekly XP & Milestone Quests',
    descAr: 'تحديات أسبوعية متجددة ومهام خاصة لكل أسبوع لجمع أوسمة التميز ومضاعفة نقاط الخبرة والتقدم السريع في لوحة المتصدرين.',
    descEn: 'Gamified weekly quest cycles: complete special missions, earn mastery badges, double XP, and climb the academy honor roll.',
    icon: '🎖️',
    recommendedDurationWeeks: 6,
    recommendedLessonsPerDay: 2,
    recommendedDays: [0, 1, 2, 3, 4],
    recommendedPillars: ['conversation', 'interactive_play', 'oxford_discover', 'grammar', 'stories'],
    difficultyLevel: 'intermediate',
    color: 'amber',
    gradient: 'from-amber-500 via-yellow-600 to-amber-700'
  },

  // 7. AI & Professional Development Tracks (الذكاء الاصطناعي والدورات التطويرية)
  {
    id: 'ai_foundational_track',
    category: 'ai_professional',
    titleAr: 'البرنامج التأسيسي للذكاء الاصطناعي (20 درساً)',
    titleEn: 'Foundational AI Literacy Program (20 Lessons)',
    badgeAr: '🤖 التأسيس وفهم النماذج',
    badgeEn: '🤖 Core AI Foundations',
    descAr: 'رحلة متكاملة في فهم كيفية تفكير الآلة وصيد الأنماط، فن الحوار والأمر الذهبي، استوديو الرسم والصوت، وبناء المشاريع والأخلاقيات.',
    descEn: 'A foundational journey understanding AI patterns, golden prompts, creative tools, mini-projects, and safety.',
    icon: '🤖',
    recommendedDurationWeeks: 4,
    recommendedLessonsPerDay: 1,
    recommendedDays: [0, 1, 2, 3, 4],
    recommendedPillars: ['ai_foundational'],
    difficultyLevel: 'all',
    color: 'violet',
    gradient: 'from-violet-600 via-indigo-600 to-purple-800'
  },
  {
    id: 'ai_specialized_track',
    category: 'ai_professional',
    titleAr: 'المسارات التخصصية المتقدمة في الذكاء الاصطناعي',
    titleEn: 'Specialized Advanced AI Tracks',
    badgeAr: '⚡ تخصص وتطبيقات عملية',
    badgeEn: '⚡ Advanced AI Tracks',
    descAr: 'تعمق في النمذجة الرياضية، معالجة اللغات الطبيعية NLP، الرؤية الحاسوبية، والوكلاء الأذكياء وأتمتة مسارات العمل.',
    descEn: 'Deep dive into neural networks, NLP, vision architectures, and autonomous AI agents.',
    icon: '⚡',
    recommendedDurationWeeks: 6,
    recommendedLessonsPerDay: 2,
    recommendedDays: [0, 1, 2, 3, 4],
    recommendedPillars: ['ai_specialized'],
    difficultyLevel: 'all',
    color: 'cyan',
    gradient: 'from-cyan-600 via-blue-600 to-teal-800'
  },
  {
    id: 'ai_prompt_pro_track',
    category: 'ai_professional',
    titleAr: 'أكاديمية احترافية وهندسة المطالبات (24 درساً)',
    titleEn: 'Prompt Engineering Pro Academy (24 Lessons)',
    badgeAr: '🏆 هندسة الأوامر المتقدمة',
    badgeEn: '🏆 Prompt Engineering Pro',
    descAr: 'إتقان صياغة الـ Mega-Prompts، التفكير المتسلسل (Chain of Thought)، محاكاة الخبراء، والتحصين ضد الاختراق والجيلبريك.',
    descEn: 'Master complex Mega-Prompts, multi-step reasoning, persona prompting, and prompt injection defense.',
    icon: '🏆',
    recommendedDurationWeeks: 6,
    recommendedLessonsPerDay: 2,
    recommendedDays: [0, 1, 2, 3, 4],
    recommendedPillars: ['ai_prompt_pro'],
    difficultyLevel: 'all',
    color: 'amber',
    gradient: 'from-amber-500 via-yellow-600 to-orange-700'
  },
  {
    id: 'professional_dev_track',
    category: 'ai_professional',
    titleAr: 'مسار الدورات التطويرية وبناء الشخصية القيادية',
    titleEn: 'Executive & Personal Development Courses',
    badgeAr: '📚 عادات وقيادة وتفكير',
    badgeEn: '📚 Executive Leadership & Habits',
    descAr: 'دروس تطبيقية مستخلصة من أمهات الكتب: العادات الذرية، العادات السبع، التفكير السريع والبطيء، وفن إدارة الأولويات والتفاوض.',
    descEn: 'Actionable leadership lessons from Atomic Habits, 7 Habits, Thinking Fast and Slow, and executive wisdom.',
    icon: '📚',
    recommendedDurationWeeks: 8,
    recommendedLessonsPerDay: 1,
    recommendedDays: [0, 1, 2, 3, 4],
    recommendedPillars: ['professional_dev', 'book_courses'],
    difficultyLevel: 'all',
    color: 'emerald',
    gradient: 'from-emerald-600 via-teal-600 to-green-700'
  },
  {
    id: 'ai_executive_mastery',
    category: 'ai_professional',
    titleAr: 'دبلوم الذكاء الاصطناعي والدورات التطويرية الشامل',
    titleEn: 'Comprehensive AI & Executive Growth Diploma',
    badgeAr: '🎓 الذكاء الاصطناعي والتطوير القيادي',
    badgeEn: '🎓 AI & Executive Diploma',
    descAr: 'خطة شاملة تجمع البرنامج التأسيسي، واحترافية المطالبات، والدورات التطويرية لصناعة قيادي متمكن من أدوات المستقبل.',
    descEn: 'An elite hybrid track weaving foundational AI, prompt engineering, and executive growth habits.',
    icon: '🎓',
    recommendedDurationWeeks: 12,
    recommendedLessonsPerDay: 2,
    recommendedDays: [0, 1, 2, 3, 4],
    recommendedPillars: ['ai_foundational', 'ai_prompt_pro', 'ai_specialized', 'professional_dev', 'conversation'],
    difficultyLevel: 'all',
    color: 'indigo',
    gradient: 'from-indigo-600 via-purple-700 to-pink-700'
  }
];

export interface PlanGenerationConfig {
  studentName: string;
  startDate: string;
  preferredTime: string;
  selectedDays: number[]; // 0=Sun, 1=Mon, ..., 6=Sat
  weeksToGenerate: number; // 4 (1 mo), 8 (2 mos), 13 (3 mos), 14 (100 days)
  lessonsPerDay: number; // 1 to 5
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced' | 'all';
  selectedPillars?: string[];
  manualLessonsQueue?: CurriculumLesson[]; // if student specifically picked lessons
  excludeCoveredKeys?: Set<string>;
  weaknessLessonKeys?: string[];
  includeBiWeeklyTests?: boolean;
  includeCatchUpDay?: boolean;
  isRtl?: boolean;
  trackId?: string; // 'comprehensive' | 'ielts_toefl' | 'business_interview' | 'traveler_survival' | 'weakness_recovery' | 'spaced_repetition' | 'micro_10min' | 'weekend_bootcamp' | 'mastery_100day' | 'phonics_safari' | 'storybook_reader' | 'speak_without_fear'
}

function parsePreferredTime(preferredTime?: string): { hours: number; minutes: number } {
  if (!preferredTime) return { hours: 16, minutes: 0 };
  const clean = String(preferredTime).trim();
  const isPM = /pm/i.test(clean);
  const isAM = /am/i.test(clean);
  const match = clean.match(/^(\d{1,2}):(\d{1,2})/);
  if (!match) return { hours: 16, minutes: 0 };
  let hours = parseInt(match[1], 10);
  let minutes = parseInt(match[2], 10);
  if (isNaN(hours)) hours = 16;
  if (isNaN(minutes)) minutes = 0;
  if (isPM && hours < 12) {
    hours += 12;
  } else if (isAM && hours === 12) {
    hours = 0;
  }
  hours = Math.max(0, Math.min(23, hours));
  minutes = Math.max(0, Math.min(59, minutes));
  return { hours, minutes };
}

/**
 * Intelligent Plan Builder & Scheduler that weaves chosen or auto-generated lessons
 * across weeks, months, and days with alternating pedagogical rhythm and review milestones.
 */
export function buildSmartAcademicPlan(config: PlanGenerationConfig): PlanItem[] {
  const isRtl = config.isRtl !== false;
  const daysAr = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const daysEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const activeTrack = SPECIALIZED_PLAN_TRACKS.find(t => t.id === config.trackId) || SPECIALIZED_PLAN_TRACKS[0];
  const trackBadge = isRtl ? activeTrack.badgeAr : activeTrack.badgeEn;

  let lessonsPool: CurriculumLesson[] = [];

  if (config.manualLessonsQueue && config.manualLessonsQueue.length > 0) {
    // Mode A: User manually picked specific lessons from each department
    lessonsPool = [...config.manualLessonsQueue];
  } else {
    // Mode B: Smart AI Auto-Generation from selected departments
    const allLessons = getAllCurriculumLessons();
    const activePillars = config.selectedPillars && config.selectedPillars.length > 0
      ? new Set(config.selectedPillars)
      : new Set(activeTrack.recommendedPillars || ACADEMIC_SECTION_DEFINITIONS.map(p => p.id));

    // Filter by difficulty level
    let filteredLessons = allLessons.filter(lesson => {
      if (!activePillars.has(lesson.pillarId)) return false;

      // Do not filter out AI or Professional Development courses by CEFR difficulty
      const isAiOrDev = lesson.pillarId.startsWith('ai_') || lesson.pillarId === 'professional_dev' || lesson.pillarId === 'book_courses';
      if (isAiOrDev) return true;

      if (config.difficultyLevel === 'beginner') {
        return ['Kid', 'A1', 'General'].includes(lesson.level);
      } else if (config.difficultyLevel === 'intermediate') {
        return ['A2', 'B1', 'General'].includes(lesson.level);
      } else if (config.difficultyLevel === 'advanced') {
        return ['B1', 'B2', 'C1', 'C2', 'Adults'].includes(lesson.level);
      }
      return true; // 'all'
    });

    // Track-specific intelligent filtering and prioritization:
    if (config.trackId === 'ielts_toefl') {
      // Prioritize academic, reading, analytical writing, advanced grammar, and interview speaking
      filteredLessons.sort((a, b) => {
        const textA = `${a.titleEn} ${a.descriptionEn || ''} ${a.pillarId}`.toLowerCase();
        const textB = `${b.titleEn} ${b.descriptionEn || ''} ${b.pillarId}`.toLowerCase();
        const ieltsRegex = /(academic|essay|argument|formal|debate|analysis|ielts|toefl|opinion|summary|advanced|presentation)/i;
        const scoreA = (ieltsRegex.test(textA) ? 10 : 0) + (['B2', 'C1', 'C2'].includes(a.level) ? 5 : 0);
        const scoreB = (ieltsRegex.test(textB) ? 10 : 0) + (['B2', 'C1', 'C2'].includes(b.level) ? 5 : 0);
        return scoreB - scoreA;
      });
    } else if (config.trackId === 'business_interview') {
      // Prioritize workplace, business, interview, HR, email, negotiation
      filteredLessons.sort((a, b) => {
        const textA = `${a.titleEn} ${a.descriptionEn || ''} ${a.pillarId}`.toLowerCase();
        const textB = `${b.titleEn} ${b.descriptionEn || ''} ${b.pillarId}`.toLowerCase();
        const bizRegex = /(interview|business|career|presentation|meeting|email|negotiat|workplace|office|client|professional|job|resume)/i;
        const scoreA = bizRegex.test(textA) ? 10 : 0;
        const scoreB = bizRegex.test(textB) ? 10 : 0;
        return scoreB - scoreA;
      });
    } else if (config.trackId === 'traveler_survival') {
      // Prioritize travel, airport, hotel, restaurant, directions, emergencies
      filteredLessons.sort((a, b) => {
        const textA = `${a.titleEn} ${a.descriptionEn || ''} ${a.pillarId}`.toLowerCase();
        const textB = `${b.titleEn} ${b.descriptionEn || ''} ${b.pillarId}`.toLowerCase();
        const travelRegex = /(travel|airport|hotel|flight|restaurant|menu|order|direction|taxi|emergency|vacation|passport|shopping|station)/i;
        const scoreA = travelRegex.test(textA) ? 10 : 0;
        const scoreB = travelRegex.test(textB) ? 10 : 0;
        return scoreB - scoreA;
      });
    } else if (config.trackId === 'weakness_recovery') {
      // If student has low-scoring lessons recorded, put those first at index 0!
      if (config.weaknessLessonKeys && config.weaknessLessonKeys.length > 0) {
        const weaknessSet = new Set(config.weaknessLessonKeys);
        filteredLessons.sort((a, b) => {
          const isAWeak = weaknessSet.has(a.id) || weaknessSet.has(`${a.courseId}:${a.level}:${a.id}`);
          const isBWeak = weaknessSet.has(b.id) || weaknessSet.has(`${b.courseId}:${b.level}:${b.id}`);
          if (isAWeak && !isBWeak) return -1;
          if (!isAWeak && isBWeak) return 1;
          return 0;
        });
      } else {
        // Fallback: prioritize core grammar and key syntax structures
        filteredLessons.sort((a, b) => (a.pillarId === 'grammar' ? -1 : 1));
      }
    } else if (config.trackId === 'phonics_safari') {
      // Prioritize kid-friendly phonics, sounds, letters, visual vocabulary, and Oxford Discover
      filteredLessons.sort((a, b) => {
        const textA = `${a.titleEn} ${a.descriptionEn || ''} ${a.pillarId} ${a.level}`.toLowerCase();
        const textB = `${b.titleEn} ${b.descriptionEn || ''} ${b.pillarId} ${b.level}`.toLowerCase();
        const phonicsRegex = /(phonics|sound|letter|alphabet|blend|cvc|word|rhyme|kid|child|visual)/i;
        const scoreA = (phonicsRegex.test(textA) ? 10 : 0) + (a.level === 'Kid' ? 8 : 0);
        const scoreB = (phonicsRegex.test(textB) ? 10 : 0) + (b.level === 'Kid' ? 8 : 0);
        return scoreB - scoreA;
      });
    } else if (config.trackId === 'storybook_reader') {
      // Prioritize story-based reading and narrative comprehension
      filteredLessons.sort((a, b) => {
        const textA = `${a.titleEn} ${a.descriptionEn || ''} ${a.pillarId}`.toLowerCase();
        const textB = `${b.titleEn} ${b.descriptionEn || ''} ${b.pillarId}`.toLowerCase();
        const storyRegex = /(story|stories|reader|tale|adventure|read|comprehension|book)/i;
        const scoreA = (storyRegex.test(textA) ? 10 : 0) + (a.pillarId === 'stories' ? 8 : 0);
        const scoreB = (storyRegex.test(textB) ? 10 : 0) + (b.pillarId === 'stories' ? 8 : 0);
        return scoreB - scoreA;
      });
    } else if (config.trackId === 'speak_without_fear') {
      // Prioritize pronunciation, conversation, roleplay, and confidence
      filteredLessons.sort((a, b) => {
        const textA = `${a.titleEn} ${a.descriptionEn || ''} ${a.pillarId}`.toLowerCase();
        const textB = `${b.titleEn} ${b.descriptionEn || ''} ${b.pillarId}`.toLowerCase();
        const speechRegex = /(speak|pronounc|conversation|dialogue|roleplay|confiden|fluency|talk)/i;
        const scoreA = (speechRegex.test(textA) ? 10 : 0) + (['conversation', 'interactive_play'].includes(a.pillarId) ? 5 : 0);
        const scoreB = (speechRegex.test(textB) ? 10 : 0) + (['conversation', 'interactive_play'].includes(b.pillarId) ? 5 : 0);
        return scoreB - scoreA;
      });
    } else if (config.trackId === 'accent_pronunciation') {
      // Prioritize phonetic nuances, pronunciation lab, tongue twisters, articulation
      filteredLessons.sort((a, b) => {
        const textA = `${a.titleEn} ${a.descriptionEn || ''} ${a.pillarId}`.toLowerCase();
        const textB = `${b.titleEn} ${b.descriptionEn || ''} ${b.pillarId}`.toLowerCase();
        const accentRegex = /(pronounc|accent|sound|phonetic|intonation|stress|rhyme|articulation|vowel|consonant)/i;
        const scoreA = (accentRegex.test(textA) ? 10 : 0) + (a.pillarId === 'translation_language_lab' ? 8 : 0);
        const scoreB = (accentRegex.test(textB) ? 10 : 0) + (b.pillarId === 'translation_language_lab' ? 8 : 0);
        return scoreB - scoreA;
      });
    } else if (config.trackId === 'study_abroad_readiness') {
      // Prioritize academic lectures, campus life, university discussion, note-taking
      filteredLessons.sort((a, b) => {
        const textA = `${a.titleEn} ${a.descriptionEn || ''} ${a.pillarId}`.toLowerCase();
        const textB = `${b.titleEn} ${b.descriptionEn || ''} ${b.pillarId}`.toLowerCase();
        const abroadRegex = /(university|campus|lecture|student|academic|discussion|abroad|presentation|professor|dorm|seminar)/i;
        const scoreA = abroadRegex.test(textA) ? 10 : 0;
        const scoreB = abroadRegex.test(textB) ? 10 : 0;
        return scoreB - scoreA;
      });
    } else if (config.trackId === 'error_pattern_booster') {
      // Prioritize tricky grammar, prepositions, tenses, syntax confusion
      filteredLessons.sort((a, b) => {
        const textA = `${a.titleEn} ${a.descriptionEn || ''} ${a.pillarId}`.toLowerCase();
        const textB = `${b.titleEn} ${b.descriptionEn || ''} ${b.pillarId}`.toLowerCase();
        const mistakeRegex = /(grammar|preposition|tense|verb|mistake|error|order|syntax|rule|passive|clause)/i;
        const scoreA = (mistakeRegex.test(textA) ? 10 : 0) + (a.pillarId === 'grammar' ? 7 : 0);
        const scoreB = (mistakeRegex.test(textB) ? 10 : 0) + (b.pillarId === 'grammar' ? 7 : 0);
        return scoreB - scoreA;
      });
    } else if (config.trackId === 'school_exam_cram') {
      // Prioritize exam questions, summaries, reading comprehension, grammar tests
      filteredLessons.sort((a, b) => {
        const textA = `${a.titleEn} ${a.descriptionEn || ''} ${a.pillarId}`.toLowerCase();
        const textB = `${b.titleEn} ${b.descriptionEn || ''} ${b.pillarId}`.toLowerCase();
        const examRegex = /(test|exam|grammar|comprehension|quiz|review|summary|question|structure|cloze)/i;
        const scoreA = (examRegex.test(textA) ? 10 : 0) + (['grammar', 'reading', 'writing'].includes(a.pillarId) ? 5 : 0);
        const scoreB = (examRegex.test(textB) ? 10 : 0) + (['grammar', 'reading', 'writing'].includes(b.pillarId) ? 5 : 0);
        return scoreB - scoreA;
      });
    } else if (config.trackId === 'smart_habit_accountability') {
      // Well-rounded core lessons rotating regularly
      filteredLessons.sort((a, b) => {
        const priorityOrder: { [k: string]: number } = { grammar: 1, conversation: 2, reading: 3, writing: 4, adults_daily_dose: 5 };
        const scoreA = priorityOrder[a.pillarId] || 10;
        const scoreB = priorityOrder[b.pillarId] || 10;
        return scoreA - scoreB;
      });
    } else if (config.trackId === 'weekly_challenge_league') {
      // Prioritize interactive roleplay, stories, challenges, and games
      filteredLessons.sort((a, b) => {
        const textA = `${a.titleEn} ${a.descriptionEn || ''} ${a.pillarId}`.toLowerCase();
        const textB = `${b.titleEn} ${b.descriptionEn || ''} ${b.pillarId}`.toLowerCase();
        const questRegex = /(game|challenge|play|story|roleplay|interactive|quest|dialogue)/i;
        const scoreA = (questRegex.test(textA) ? 10 : 0) + (['interactive_play', 'stories', 'conversation'].includes(a.pillarId) ? 6 : 0);
        const scoreB = (questRegex.test(textB) ? 10 : 0) + (['interactive_play', 'stories', 'conversation'].includes(b.pillarId) ? 6 : 0);
        return scoreB - scoreA;
      });
    }

    if (config.trackId === 'ai_foundational_track') {
      // Direct focus on the 20 foundational AI lessons in sequence
      const aiLessons = allLessons.filter(l => l.pillarId === 'ai_foundational');
      lessonsPool = aiLessons.length > 0 ? aiLessons : filteredLessons;
    } else if (config.trackId === 'ai_specialized_track') {
      // Direct focus on advanced specialized AI tracks in sequence
      const advLessons = allLessons.filter(l => l.pillarId === 'ai_specialized');
      lessonsPool = advLessons.length > 0 ? advLessons : filteredLessons;
    } else if (config.trackId === 'ai_prompt_pro_track') {
      // Direct focus on the 24 prompt engineering pro sessions in sequence
      const promptLessons = allLessons.filter(l => l.pillarId === 'ai_prompt_pro');
      lessonsPool = promptLessons.length > 0 ? promptLessons : filteredLessons;
    } else if (config.trackId === 'professional_dev_track') {
      // Direct focus on executive developmental courses and bestseller books in sequence
      const devLessons = allLessons.filter(l => l.pillarId === 'professional_dev' || l.pillarId === 'book_courses');
      lessonsPool = devLessons.length > 0 ? devLessons : filteredLessons;
    } else if (config.trackId === 'ai_executive_mastery') {
      // Balanced master sequence across all 4 pillars
      const aiFound = allLessons.filter(l => l.pillarId === 'ai_foundational');
      const aiPrompt = allLessons.filter(l => l.pillarId === 'ai_prompt_pro');
      const aiSpec = allLessons.filter(l => l.pillarId === 'ai_specialized');
      const profDev = allLessons.filter(l => l.pillarId === 'professional_dev' || l.pillarId === 'book_courses');
      const masteryPool: CurriculumLesson[] = [];
      const maxLen = Math.max(aiFound.length, aiPrompt.length, aiSpec.length, profDev.length);
      for (let i = 0; i < maxLen; i++) {
        if (i < aiFound.length) masteryPool.push(aiFound[i]);
        if (i < aiPrompt.length) masteryPool.push(aiPrompt[i]);
        if (i < profDev.length) masteryPool.push(profDev[i]);
        if (i < aiSpec.length) masteryPool.push(aiSpec[i]);
      }
      lessonsPool = masteryPool.length > 0 ? masteryPool : filteredLessons;
    } else {
      lessonsPool = filteredLessons;

      // Exclude already completed lessons if set (unless weakness recovery track, which deliberately re-targets them)
      if (config.trackId !== 'weakness_recovery' && config.excludeCoveredKeys && config.excludeCoveredKeys.size > 0) {
        const filtered = lessonsPool.filter(l => {
          const key = `${l.courseId}:${l.level}:${l.id}`;
          return !config.excludeCoveredKeys!.has(key);
        });
        if (filtered.length > 0) {
          lessonsPool = filtered;
        }
      }

      // Interleave across different pillars for maximum variety (Pedagogical Alternation)
      const groupedByPillar: { [key: string]: CurriculumLesson[] } = {};
      lessonsPool.forEach(l => {
        if (!groupedByPillar[l.pillarId]) groupedByPillar[l.pillarId] = [];
        groupedByPillar[l.pillarId].push(l);
      });

      const interleaved: CurriculumLesson[] = [];
      const pillarKeys = Object.keys(groupedByPillar);
      if (pillarKeys.length > 0) {
        const maxLen = Math.max(...pillarKeys.map(k => groupedByPillar[k].length));
        for (let i = 0; i < maxLen; i++) {
          for (const k of pillarKeys) {
            if (i < groupedByPillar[k].length) {
              interleaved.push(groupedByPillar[k][i]);
            }
          }
        }
        lessonsPool = interleaved;
      }
    }
  }

  // If pool is empty, create a fallback
  if (lessonsPool.length === 0) {
    lessonsPool.push({
      id: 'unit_general_1',
      pillarId: 'grammar',
      courseId: 'grammar',
      courseLabelAr: 'القواعد المتطورة A1',
      courseLabelEn: 'Advanced Grammar A1',
      titleAr: 'المعادلات النحوية الأساسية وبناء الجمل',
      titleEn: 'Basic Sentence Structure & Syntax',
      level: 'A1',
      duration: config.trackId === 'micro_10min' ? '12 min' : '45 min'
    });
  }

  const generatedItems: PlanItem[] = [];
  let lessonIdx = 0;
  let currentDate = (!config.startDate || isNaN(new Date(config.startDate).getTime())) 
    ? new Date() 
    : new Date(config.startDate);

  // Loop through weeks
  for (let w = 1; w <= config.weeksToGenerate; w++) {
    const monthNum = Math.ceil(w / 4);
    const weekInMonth = ((w - 1) % 4) + 1;
    let lastStudyDateThisWeek: Date | null = null;

    // Phase label for 100-day mastery journey
    let phaseLabel: string | undefined = undefined;
    if (config.trackId === 'mastery_100day') {
      if (w <= 4) phaseLabel = isRtl ? 'المرحلة 1: التأسيس وبناء المفردات' : 'Phase 1: Foundation & Core Vocabulary';
      else if (w <= 9) phaseLabel = isRtl ? 'المرحلة 2: الطلاقة وتطبيقات المحادثة' : 'Phase 2: Conversational Fluency';
      else phaseLabel = isRtl ? 'المرحلة 3: الإتقان الأكاديمي والتميز' : 'Phase 3: Academic Mastery & Excellence';
    }

    // Loop through 7 days of the week
    for (let i = 0; i < 7; i++) {
      const dayIdx = currentDate.getDay();

      if (config.selectedDays.includes(dayIdx)) {
        lastStudyDateThisWeek = new Date(currentDate);

        const scheduledAt = new Date(currentDate);
        const { hours: h, minutes: m } = parsePreferredTime(config.preferredTime);
        scheduledAt.setHours(h, m, 0, 0);

        // Add lessonsPerDay
        for (let s = 1; s <= config.lessonsPerDay; s++) {
          const currentLesson = lessonsPool[lessonIdx % lessonsPool.length];
          const lessonScheduledAt = new Date(scheduledAt);
          if (s > 1) {
            lessonScheduledAt.setHours(lessonScheduledAt.getHours() + (s - 1));
          }

          let topicLabel = isRtl ? currentLesson.titleAr : currentLesson.titleEn;
          let durationLabel = currentLesson.duration || '45 min';

          // Micro-learning duration adaptation
          if (config.trackId === 'micro_10min') {
            durationLabel = '12 min';
            topicLabel = isRtl ? `⏱️ [جرعة 10 دقائق] ${topicLabel}` : `⏱️ [10-Min Micro] ${topicLabel}`;
          } else if (config.trackId === 'spaced_repetition' && w > 1 && (lessonIdx % 3 === 0)) {
            topicLabel = isRtl ? `🔁 [مراجعة متباعدة] ${topicLabel}` : `🔁 [Spaced Review] ${topicLabel}`;
          } else if (config.trackId === 'weakness_recovery') {
            topicLabel = isRtl ? `⚡ [علاج وتثبيت] ${topicLabel}` : `⚡ [Weakness Recovery] ${topicLabel}`;
          } else if (config.trackId === 'ielts_toefl') {
            topicLabel = isRtl ? `🎯 [آيلتس أكاديمي] ${topicLabel}` : `🎯 [IELTS Prep] ${topicLabel}`;
          } else if (config.trackId === 'business_interview') {
            topicLabel = isRtl ? `💼 [إنجليزي مهني] ${topicLabel}` : `💼 [Business Prep] ${topicLabel}`;
          } else if (config.trackId === 'traveler_survival') {
            topicLabel = isRtl ? `✈️ [مواقف سفر] ${topicLabel}` : `✈️ [Traveler Scene] ${topicLabel}`;
          } else if (config.trackId === 'weekend_bootcamp') {
            topicLabel = isRtl ? `🚀 [معسكر الويكند] ${topicLabel}` : `🚀 [Weekend Intensive] ${topicLabel}`;
          } else if (config.trackId === 'phonics_safari') {
            topicLabel = isRtl ? `🦁 [صوتيات وتأسيس] ${topicLabel}` : `🦁 [Phonics Safari] ${topicLabel}`;
          } else if (config.trackId === 'storybook_reader') {
            topicLabel = isRtl ? `📖 [قصة وقراءة] ${topicLabel}` : `📖 [Storybook Reader] ${topicLabel}`;
          } else if (config.trackId === 'speak_without_fear') {
            topicLabel = isRtl ? `🗣️ [طلاقة وتحدث] ${topicLabel}` : `🗣️ [Speak Without Fear] ${topicLabel}`;
          } else if (config.trackId === 'accent_pronunciation') {
            topicLabel = isRtl ? `🎙️ [مخارج ونطق] ${topicLabel}` : `🎙️ [Pronunciation Lab] ${topicLabel}`;
          } else if (config.trackId === 'study_abroad_readiness') {
            topicLabel = isRtl ? `🌍 [ابتعاث جامعي] ${topicLabel}` : `🌍 [Study Abroad] ${topicLabel}`;
          } else if (config.trackId === 'error_pattern_booster') {
            topicLabel = isRtl ? `🔍 [تصحيح أخطاء] ${topicLabel}` : `🔍 [Mistake Buster] ${topicLabel}`;
          } else if (config.trackId === 'school_exam_cram') {
            topicLabel = isRtl ? `📝 [مراجعة امتحانات] ${topicLabel}` : `📝 [Exam Sprint] ${topicLabel}`;
          } else if (config.trackId === 'smart_habit_accountability') {
            topicLabel = isRtl ? `🛡️ [التزام يومي] ${topicLabel}` : `🛡️ [Habit Focus] ${topicLabel}`;
          } else if (config.trackId === 'weekly_challenge_league') {
            topicLabel = isRtl ? `🎖️ [تحدي الأسبوع] ${topicLabel}` : `🎖️ [Weekly Quest] ${topicLabel}`;
          } else if (config.trackId === 'ai_foundational_track') {
            topicLabel = isRtl ? `🤖 [ذكاء تأسيسي] ${topicLabel}` : `🤖 [AI Foundation] ${topicLabel}`;
          } else if (config.trackId === 'ai_specialized_track') {
            topicLabel = isRtl ? `⚡ [ذكاء تخصصي] ${topicLabel}` : `⚡ [AI Advanced] ${topicLabel}`;
          } else if (config.trackId === 'ai_prompt_pro_track') {
            topicLabel = isRtl ? `🏆 [احتراف مطالبات] ${topicLabel}` : `🏆 [Prompt Pro] ${topicLabel}`;
          } else if (config.trackId === 'professional_dev_track') {
            topicLabel = isRtl ? `📚 [دورة تطويرية] ${topicLabel}` : `📚 [Exec Growth] ${topicLabel}`;
          } else if (config.trackId === 'ai_executive_mastery') {
            topicLabel = isRtl ? `🎓 [دبلوم شامل] ${topicLabel}` : `🎓 [AI & Growth] ${topicLabel}`;
          }

          // Catch-Up Day (الاستشفاء والتعويض المرن في اليوم الأخير من الأسبوع)
          const isCatchUp = !!config.includeCatchUpDay && i === 6 && s === config.lessonsPerDay;
          if (isCatchUp) {
            topicLabel = isRtl ? `☕ [استشفاء وتعويض مرن] ${topicLabel}` : `☕ [Flex Catch-Up Day] ${topicLabel}`;
          }

          const safeIsoDate = !isNaN(lessonScheduledAt.getTime()) 
            ? lessonScheduledAt.toISOString() 
            : new Date().toISOString();

          generatedItems.push({
            id: `plan-w${w}-d${i}-s${s}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
            month: monthNum,
            week: weekInMonth,
            day: isRtl ? daysAr[dayIdx] : daysEn[dayIdx],
            courseId: currentLesson.courseId,
            courseLabel: isRtl ? currentLesson.courseLabelAr : currentLesson.courseLabelEn,
            topic: topicLabel,
            duration: durationLabel,
            level: currentLesson.level || 'A1',
            unitId: currentLesson.id,
            dateLabel: !isNaN(currentDate.getTime()) 
              ? currentDate.toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'short' })
              : '---',
            timeLabel: !isNaN(lessonScheduledAt.getTime())
              ? `${String(lessonScheduledAt.getHours()).padStart(2, '0')}:${String(lessonScheduledAt.getMinutes()).padStart(2, '0')}`
              : '16:00',
            scheduledAt: safeIsoDate,
            trackId: config.trackId || activeTrack.id,
            trackBadge,
            phaseLabel,
            isCatchUpDay: isCatchUp
          });

          lessonIdx++;
        }
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Add bi-weekly milestone assessment test at the end of every 2nd week (or weekly for IELTS)
    const shouldAddTest = config.includeBiWeeklyTests !== false && 
      ((config.trackId === 'ielts_toefl' ? true : w % 2 === 0) && lastStudyDateThisWeek);

    if (shouldAddTest && lastStudyDateThisWeek) {
      const testDate = new Date(lastStudyDateThisWeek);
      const testScheduledAt = new Date(testDate);
      const { hours: h, minutes: m } = parsePreferredTime(config.preferredTime);
      testScheduledAt.setHours(Math.min(23, h + config.lessonsPerDay), m, 0, 0);

      const testTitle = config.trackId === 'ielts_toefl'
        ? (isRtl ? `محاكاة اختبار الآيلتس الأكاديمي (الأسبوع ${w}) 🎯` : `IELTS Academic Mock Exam (Week ${w}) 🎯`)
        : config.trackId === 'business_interview'
        ? (isRtl ? `تقييم المقابلات وعروض الأعمال (الأسبوع ${w}) 💼` : `Business Interview Assessment (Week ${w}) 💼`)
        : config.trackId === 'ai_foundational_track'
        ? (isRtl ? `اختبار وتقييم مفاهيم الذكاء التأسيسي (الأسبوع ${w}) 🤖` : `Foundational AI Literacy Milestone Test (Week ${w}) 🤖`)
        : config.trackId === 'ai_prompt_pro_track'
        ? (isRtl ? `تقييم هندسة المطالبات والتحصين الأمني (الأسبوع ${w}) 🏆` : `Prompt Engineering & Security Defense Test (Week ${w}) 🏆`)
        : config.trackId === 'ai_specialized_track'
        ? (isRtl ? `اختبار المعماريات المتقدمة والنماذج التخصصية (الأسبوع ${w}) ⚡` : `Specialized AI Architecture Assessment (Week ${w}) ⚡`)
        : config.trackId === 'professional_dev_track'
        ? (isRtl ? `تقييم استيعاب أمهات الكتب وتطبيقات العادات القيادية (الأسبوع ${w}) 📚` : `Leadership & Habits Milestone Assessment (Week ${w}) 📚`)
        : config.trackId === 'ai_executive_mastery'
        ? (isRtl ? `التقييم الشامل لدبلوم الذكاء الاصطناعي والقيادة (الأسبوع ${w}) 🎓` : `Executive AI & Leadership Milestone Test (Week ${w}) 🎓`)
        : (isRtl 
            ? `اختبار المراجعة الشامل والتقييم النصف شهري (الأسبوع ${w - 1}-${w})` 
            : `Comprehensive Review Milestone Test (Week ${w - 1}-${w})`);

      const safeTestIsoDate = !isNaN(testScheduledAt.getTime()) 
        ? testScheduledAt.toISOString() 
        : new Date().toISOString();

      generatedItems.push({
        id: `test-w${w}-${Date.now().toString(36)}`,
        month: monthNum,
        week: weekInMonth,
        day: isRtl ? daysAr[testDate.getDay()] : daysEn[testDate.getDay()],
        courseId: 'test',
        courseLabel: isRtl ? 'اختبار تقييمي دوري' : 'Milestone Assessment',
        topic: testTitle,
        duration: config.trackId === 'micro_10min' ? '15 min' : '60 min',
        level: config.difficultyLevel === 'advanced' ? 'B2' : config.difficultyLevel === 'intermediate' ? 'B1' : 'A1',
        unitId: `test-${w}`,
        dateLabel: !isNaN(testDate.getTime()) 
          ? testDate.toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'short' })
          : '---',
        timeLabel: !isNaN(testScheduledAt.getTime())
          ? `${String(testScheduledAt.getHours()).padStart(2, '0')}:${String(testScheduledAt.getMinutes()).padStart(2, '0')}`
          : '17:00',
        scheduledAt: safeTestIsoDate,
        isTest: true,
        trackId: config.trackId || activeTrack.id,
        trackBadge,
        phaseLabel
      });
    }
  }

  return generatedItems;
}

export interface InteractiveLessonQuizItem {
  question: string;
  questionAr: string;
  options: string[];
  optionsAr: string[];
  correctIndex: number;
  explanation: string;
  explanationAr: string;
}

/**
 * Builds a verified 5-question interactive quiz for any curriculum unit
 * (Reading, Grammar, Conversation, Writing, Expression) to ensure no lesson
 * ever awards marks without an actual test.
 */
export function buildInteractiveLessonQuiz(
  pillarId: 'reading' | 'grammar' | 'conversation' | 'writing' | 'expression' | string,
  unit: any
): InteractiveLessonQuizItem[] {
  const titleEn = unit?.titleEn || 'Lesson';
  const titleAr = unit?.titleAr || 'الدرس';
  const questions: InteractiveLessonQuizItem[] = [];

  if (pillarId === 'reading') {
    const card = unit?.cards?.[0];
    const readingExcerpt = (unit?.readingTextEn || '').slice(0, 80);
    questions.push({
      question: `What is the key linguistic focus in "${titleEn}"?`,
      questionAr: `ما هو التركيز اللغوي الأساسي في درس: "${titleAr}"؟`,
      options: [
        card?.en ? `Understanding vocabulary such as "${card.en}"` : 'Accurate phonetic decoding & phrasing',
        'Skipping punctuation marks',
        'Reading words in reverse order',
        'Translating word by word without context'
      ],
      optionsAr: [
        card?.ar ? `فهم المفردات واستيعاب سياق "${card.ar}"` : 'الوعي الصوتي الدقيق والقراءة المعبرة',
        'تجاهل علامات الترقيم',
        'قراءة الكلمات بترتيب عكسي',
        'الترجمة الحرفية دون فهم السياق'
      ],
      correctIndex: 0,
      explanation: 'Active reading comprehension links vocabulary directly with phonetic accuracy.',
      explanationAr: 'الفهم القرائي الفعّال يربط بين المفردات الدقيقة واللفظ الصوتي السليم.'
    });

    questions.push({
      question: `In the passage: "${readingExcerpt || titleEn}...", how should you approach connected sentences?`,
      questionAr: `في نص القراءة: كيف يجب التعامل مع الجمل المترابطة؟`,
      options: [
        'Pause naturally at breath groups and punctuation',
        'Read as fast as possible without breathing',
        'Ignore all conjunction words',
        'Change word pronunciations randomly'
      ],
      optionsAr: [
        'التوقف الطبيعي عند علامات الترقيم ومجموعات النفس',
        'القراءة بأقصى سرعة ممكنة دون تنفس',
        'تجاهل جميع أدوات الربط',
        'تغيير نطق الكلمات عشوائياً'
      ],
      correctIndex: 0,
      explanation: 'Pacing and cadence determine listening comprehension and fluency.',
      explanationAr: 'الإيقاع السليم والتنغيم يحددان جودة الفهم القرائي والطلاقة.'
    });

    questions.push({
      question: `What does the word "${card?.en || 'fluency'}" mean in this reading context?`,
      questionAr: `ماذا تعني كلمة "${card?.en || 'fluency'}" في سياق هذا النص؟`,
      options: [
        card?.ar || 'المعنى اللغوي السليم في السياق',
        'معنى غير مرتبط تماماً بالنص',
        'عكس الدلالة المطلوبة',
        'كلمة عامية مهملة'
      ],
      optionsAr: [
        card?.ar || 'المعنى اللغوي السليم في السياق',
        'معنى غير مرتبط تماماً بالنص',
        'عكس الدلالة المطلوبة',
        'كلمة عامية مهملة'
      ],
      correctIndex: 0,
      explanation: `"${card?.en || 'The target word'}" conveys ${card?.ar || 'the intended meaning'} in English.`,
      explanationAr: `المفردة تدل بدقة على المعنى السياقي الصحيح في النص.`
    });

    questions.push({
      question: `How does practicing aloud improve your comprehension of "${titleEn}"?`,
      questionAr: `كيف يساهم التدريب الصوتي المسموع في تعزيز استيعاب درس "${titleAr}"؟`,
      options: [
        'It stimulates muscle memory and auditory reinforcement',
        'It causes you to forget the words faster',
        'It has no impact on language learning',
        'It replaces the need to understand grammar'
      ],
      optionsAr: [
        'ينشط الذاكرة العضلية والسمعية لترسيخ التراكيب',
        'يجعل الذاكرة تنسى الكلمات سريعاً',
        'ليس له أي أثر في اكتساب اللغة',
        'يلغي الحاجة لفهم القواعد'
      ],
      correctIndex: 0,
      explanation: 'Vocal repetition strengthens neurological language pathways.',
      explanationAr: 'التكرار الصوتي المسموع يرسخ الروابط العصبية للغة في الدماغ.'
    });

    questions.push({
      question: `Final Mastery: What is the main milestone achieved in "${titleEn}"?`,
      questionAr: `تحدي الإتقان: ما هو الإنجاز الأساسي المتحقق من إتمام "${titleAr}"؟`,
      options: [
        'Fluent reading with full comprehension and correct intonation',
        'Rushing through text without understanding',
        'Memorizing text without knowing what it means',
        'Avoiding English reading in daily life'
      ],
      optionsAr: [
        'القراءة بطلاقة وفهم عميق مع مراعاة نبرة الصوت السليمة',
        'المرور السريع على النص دون استيعاب',
        'حفظ النص صماً دون معرفة معناه',
        'تجنب القراءة بالإنجليزية في الحياة اليومية'
      ],
      correctIndex: 0,
      explanation: 'Mastery is achieved through integrated fluency and deep comprehension.',
      explanationAr: 'يتحقق الإتقان من خلال الجمع بين الطلاقة اللفظية والاستيعاب العميق.'
    });
  } else if (pillarId === 'grammar') {
    const rule = unit?.rules?.[0];
    const example = unit?.examples?.[0];
    questions.push({
      question: `What is the foundational rule in "${titleEn}"?`,
      questionAr: `ما هي القاعدة التأسيسية في درس: "${titleAr}"؟`,
      options: [
        rule?.titleEn || 'Correct auxiliary verb harmony and base tense structure',
        'Using random verb tenses in the same sentence',
        'Omitting helping verbs in all contexts',
        'Placing adjectives after verbs without agreement'
      ],
      optionsAr: [
        rule?.titleAr || 'توافق الفعل المساعد مع الفاعل وتصريف الزمن السليم',
        'استخدام أزمنة عشوائية في نفس الجملة',
        'حذف الأفعال المساعدة في جميع السياقات',
        'وضع الصفات بعد الأفعال دون مراعاة التوافق'
      ],
      correctIndex: 0,
      explanation: 'Grammar stability requires subject-verb harmony and correct tense usage.',
      explanationAr: 'سلامة القواعد تتطلب توافق الفاعل مع الفعل واستخدام الزمن المناسب.'
    });

    questions.push({
      question: `Which of the following correctly applies "${titleEn}"?`,
      questionAr: `أي من الخيارات التالية يطبق قاعدة "${titleAr}" بشكل صحيح تماماً؟`,
      options: [
        example?.en || 'She always prepares her studies with dedication.',
        'She always prepare her studies yesterday.',
        'She is prepare her studies last week.',
        'She preparing always with wrong verb.'
      ],
      optionsAr: [
        example ? `الجملة: "${example.en}" (${example.ar})` : 'التطبيق السليم للصيغة النحوية',
        'صياغة غير منضبطة مع زمن غير متوافق',
        'استخدام فعل مساعد خاطئ',
        'ترتيب خاطئ للظرف والفاعل'
      ],
      correctIndex: 0,
      explanation: 'Matches the exact grammatical formulation taught in this unit.',
      explanationAr: 'يطابق تماماً الصيغة النحوية الصحيحة الموضحة في الوحدة.'
    });

    questions.push({
      question: `What common mistake should you avoid when applying "${titleEn}"?`,
      questionAr: `ما هو الخطأ الشائع الذي يجب تجنبه عند تطبيق درس "${titleAr}"؟`,
      options: [
        'Confusing base verb forms with irregular past or present inflections',
        'Speaking in clear, complete sentences',
        'Practicing with real-world examples',
        'Reviewing common irregular verbs'
      ],
      optionsAr: [
        'خلط الفعل المجرد بالتصريفات الشاذة أو غير المتطابقة مع الزمن',
        'التحدث بجمل واضحة ومكتملة الأركان',
        'التدرب على أمثلة حية من واقع الحياة',
        'مراجعة الأفعال الشاذة الشائعة'
      ],
      correctIndex: 0,
      explanation: 'Maintaining grammatical consistency prevents communication ambiguity.',
      explanationAr: 'الحفاظ على الاتساق النحوي يمنع الغموض والخلط في المعنى.'
    });

    questions.push({
      question: `When forming questions in "${titleEn}", what is the standard word order?`,
      questionAr: `عند صياغة السؤال في درس "${titleAr}"، ما هو الترتيب النموذجي للكلمات؟`,
      options: [
        'Auxiliary Verb + Subject + Base Main Verb',
        'Main Verb + Subject + Auxiliary Verb',
        'Subject + Object + Question Word',
        'Object + Auxiliary Verb + Subject'
      ],
      optionsAr: [
        'الفعل المساعد + الفاعل + الفعل الرئيسي المجرد',
        'الفعل الرئيسي + الفاعل + الفعل المساعد',
        'الفاعل + المفعول به + أداة الاستفهام',
        'المفعول به + الفعل المساعد + الفاعل'
      ],
      correctIndex: 0,
      explanation: 'Standard English question syntax begins with the auxiliary or question word followed by subject.',
      explanationAr: 'الترتيب القياسي للسؤال الإنجليزي يبدأ بالفعل المساعد يليه الفاعل ثم الفعل الرئيسي.'
    });

    questions.push({
      question: `Final Challenge: How can you demonstrate complete mastery of "${titleEn}"?`,
      questionAr: `التحدي النهائي: كيف تثبت إتقانك التام لقاعدة "${titleAr}"؟`,
      options: [
        'Producing original sentences spontaneously in speaking and writing',
        'Relying on memorized tables without conversational practice',
        'Ignoring mistakes during speaking practice',
        'Never checking verb conjugations'
      ],
      optionsAr: [
        'إنتاج جمل أصلية من إنشائك بطلاقة وتلقائية في التحدث والكتابة',
        'الاعتماد على الجداول الصماء دون ممارسة حوارية',
        'تجاهل الأخطاء أثناء التحدث',
        'عدم مراجعة تصاريف الأفعال'
      ],
      correctIndex: 0,
      explanation: 'Autonomous language production is the gold standard of fluency.',
      explanationAr: 'الإنتاج اللغوي التلقائي في المحادثة هو المعيار الذهبي للإتقان.'
    });
  } else if (pillarId === 'conversation') {
    const phrase = unit?.phrases?.[0];
    const scenario = unit?.scenarios?.[0];
    questions.push({
      question: `In "${titleEn}", which expression delivers the most natural and polite impact?`,
      questionAr: `في درس المحادثة "${titleAr}"، أي تعبير يعطي انطباعاً طبيعياً ولبقاً؟`,
      options: [
        phrase?.en || 'It is an absolute pleasure to connect with you.',
        'I do not care about this topic.',
        'Why are you talking to me?',
        'Say what you want quickly.'
      ],
      optionsAr: [
        phrase ? `العبارة: "${phrase.en}" (${phrase.ar})` : 'الرد الدبلوماسي المهذب المتناسق مع الموقف',
        'لا يهمني هذا الموضوع مطلقاً',
        'لماذا تتحدث معي؟',
        'قل ما تريده بسرعة'
      ],
      correctIndex: 0,
      explanation: 'Polite social openers foster rapport and open professional dialogue.',
      explanationAr: 'العبارات الافتتاحية المهذبة تبني جسور التواصل الإيجابي وتفتح آفاق الحوار.'
    });

    questions.push({
      question: `How should you respond in the scenario: "${scenario?.titleEn || titleEn}"?`,
      questionAr: `كيف تتصرف بلباقة في الموقف الحواري: "${scenario?.titleAr || titleAr}"؟`,
      options: [
        'Listen actively, acknowledge their point, and contribute with respectful tone',
        'Interrupt immediately before they finish speaking',
        'Stay silent and look away awkwardly',
        'Use harsh words to dominate the conversation'
      ],
      optionsAr: [
        'الاستماع الفعّال، وإظهار التقدير، ثم المشاركة بنبرة صوت محترمة ومتزنة',
        'المقاطعة الفورية قبل أن يكمل الطرف الآخر كلامه',
        'الصمت التام والنظر بعيداً بحرج',
        'استخدام كلمات حادة لفرض السيطرة على الحوار'
      ],
      correctIndex: 0,
      explanation: 'Active listening and emotional intelligence are pillars of elite English communication.',
      explanationAr: 'الاستماع الفعّال والذكاء العاطفي هما ركيزتا التواصل الإنجليزي الراقي.'
    });

    questions.push({
      question: `What conversational filler buys you thinking time without breaking flow?`,
      questionAr: `أي من عبارات ملء الفراغ تمنحك وقتاً للتفكير دون قطع تدفق الحديث؟`,
      options: [
        '"Well, that is an interesting question, let me consider..."',
        '"Uhhhhh... I forgot all my words."',
        '"Shut up please while I think."',
        '"Never mind, I will not answer."'
      ],
      optionsAr: [
        '"حسناً، هذا سؤال ملهم للغاية، دعني أوضح..." ("Well, that is a great point...")',
        '"آآآآه... لقد نسيت الكلمات."',
        '"اصمت ريثما أفكر."',
        '"انسَ الأمر، لن أجيب."'
      ],
      correctIndex: 0,
      explanation: 'Fillers maintain speaking rhythm while allowing cognitive formulation.',
      explanationAr: 'عبارات الربط تحافظ على تدفق الكلام بينما يصيغ العقل الفكرة التالية.'
    });

    questions.push({
      question: `Which intonation pattern should you use for open-ended conversation questions?`,
      questionAr: `ما هو نمط نبرة الصوت (Intonation) الأنسب للأسئلة المفتوحة في المحادثة؟`,
      options: [
        'A warm, falling intonation at the end to show genuine curiosity',
        'A sharp monotone voice with no pitch variation',
        'Shouting the final word loudly',
        'Whispering so the listener cannot hear'
      ],
      optionsAr: [
        'نبرة دافئة منخفضة في نهاية السؤال لإبداء الاهتمام والفضول الإيجابي',
        'صوت حاد رتيب خالٍ من أي تنوع نغمي',
        'الصراخ بالكلمة الأخيرة بصوت مرتفع',
        'الهمس بحيث يتعذر على المستمع الفهم'
      ],
      correctIndex: 0,
      explanation: 'Natural intonation makes English speech engaging and approachable.',
      explanationAr: 'التنغيم الطبيعي يجعل الكلام الإنجليزي جذاباً وممتعاً للمستمع.'
    });

    questions.push({
      question: `Final Speaking Milestone: What is the true goal of "${titleEn}"?`,
      questionAr: `تحدي المحادثة النهائي: ما هو الهدف الحقيقي لدرس "${titleAr}"؟`,
      options: [
        'Speaking confidently, naturally, and connecting meaningfully with others',
        'Memorizing long monologues without interaction',
        'Translating in your head for five minutes before every sentence',
        'Speaking with anxiety and fear of making mistakes'
      ],
      optionsAr: [
        'التحدث بثقة وطلاقة وتلقائية وبناء تواصل إنساني راقٍ وفعّال',
        'حفظ خطب طويلة دون تفاعل حقيقي',
        'الترجمة في العقل لعدة دقائق قبل كل جملة',
        'التحدث بتوتر وخوف دائم من الوقوع في الخطأ'
      ],
      correctIndex: 0,
      explanation: 'Fluency is the freedom to express yourself with confidence.',
      explanationAr: 'الطلاقة الحقيقية هي القدرة على التعبير عن ذاتك بثقة وأريحية.'
    });
  } else {
    // Writing, Expression & General units
    questions.push({
      question: `What is the core takeaway of "${titleEn}"?`,
      questionAr: `ما هو المفهوم الجوهري المستفاد من درس: "${titleAr}"؟`,
      options: [
        'Clear structure, cohesive transitions, and precise expression',
        'Rambling without logical connection',
        'Ignoring paragraph development',
        'Writing without revision or proofreading'
      ],
      optionsAr: [
        'الهيكل الواضح، وروابط الجمل المتناسقة، ودقة التعبير اللغوي',
        'الاسترسال العشوائي دون تسلسل منطقي',
        'تجاهل بناء وتطوير الفقرة',
        'الكتابة دون مراجعة أو تدقيق'
      ],
      correctIndex: 0,
      explanation: 'Cohesion and precision create powerful English expression.',
      explanationAr: 'الترابط والدقة يصنعان التعبير الإنجليزي المؤثر والاحترافي.'
    });

    questions.push({
      question: `Which transition best links two complementary arguments in "${titleEn}"?`,
      questionAr: `أي أداة ربط هي الأنسب لربط فكرتين متكاملتين في هذا السياق؟`,
      options: [
        '"Furthermore" or "In addition"',
        '"On the contrary, nevertheless"',
        '"In spite of that"',
        '"Regardless of the contradiction"'
      ],
      optionsAr: [
        'أدوات الإضافة مثل: "Furthermore" أو "In addition" (علاوة على ذلك)',
        'أدوات التناقض الحاد',
        'أدوات الاستدراك غير المتطابقة',
        'تجاهل الربط تماماً'
      ],
      correctIndex: 0,
      explanation: 'Additive transitions smoothly bridge supporting points.',
      explanationAr: 'أدوات الإضافة تنقل القارئ بسلاسة بين النقاط التي تدعم الفكرة.'
    });

    questions.push({
      question: `How do you avoid literal translation from Arabic in "${titleEn}"?`,
      questionAr: `كيف تتجنب فخ الترجمة الحرفية من العربية في درس "${titleAr}"؟`,
      options: [
        'Think in English idioms and structure thoughts natively',
        'Translate word for word from Arabic',
        'Use an Arabic dictionary for every single preposition',
        'Apply Arabic syntax rules to English sentences'
      ],
      optionsAr: [
        'التفكير في التراكيب الإنجليزية الطبيعية وصياغة المعنى بأسلوب أهل اللغة',
        'الترجمة كلمة بكلمة من المعاجم الثنائية',
        'البحث عن معنى كل حرف جر بالعربية',
        'تطبيق قواعد النحو العربي على الجمل الإنجليزية'
      ],
      correctIndex: 0,
      explanation: 'Native idioms capture nuance that literal translations destroy.',
      explanationAr: 'التراكيب الإنجليزية الأصيلة تعبر عن المعنى بدقة يعجز عنها النقل الحرفي.'
    });

    questions.push({
      question: `What is the role of editing and revising in "${titleEn}"?`,
      questionAr: `ما هو دور التدقيق والمراجعة في إتقان مهارة "${titleAr}"؟`,
      options: [
        'Refining clarity, eliminating redundancy, and polishing tone',
        'Adding unnecessary complex words to confuse the reader',
        'Deleting all punctuation marks',
        'Changing the entire message randomly'
      ],
      optionsAr: [
        'تنقيح الأفكار، وحذف الحشو الزائد، وضبط نبرة النص بما يناسب الهدف',
        'إضافة كلمات معقدة غير ضرورية لإرباك القارئ',
        'حذف جميع علامات الترقيم',
        'تغيير الرسالة الأساسية عشوائياً'
      ],
      correctIndex: 0,
      explanation: 'Polishing is where good communication becomes exceptional.',
      explanationAr: 'المراجعة والتحرير هما المرحلة التي يتحول فيها النص إلى تحفة لغوية.'
    });

    questions.push({
      question: `Final Achievement: How do you know you have mastered "${titleEn}"?`,
      questionAr: `الإنجاز النهائي: كيف تتأكد من أنك أتقنت درس "${titleAr}" بالكامل؟`,
      options: [
        'You can formulate your own text with natural phrasing and high confidence',
        'You need someone to translate every sentence for you',
        'You cannot explain the concept in your own words',
        'You avoid using the skill in real-life communication'
      ],
      optionsAr: [
        'تستطيع صياغة نصوصك الخاصة بتعابير طبيعية وثقة عالية وبلا تردد',
        'تحتاج إلى شخص يترجم لك كل جملة',
        'تعجز عن شرح الفكرة بأسلوبك الخاص',
        'تتجنب استخدام المهارة في التواصل الواقعي'
      ],
      correctIndex: 0,
      explanation: 'Independent application is the ultimate marker of academic mastery.',
      explanationAr: 'القدرة على التطبيق المستقل هي المعيار الأسمى للإتقان الأكاديمي.'
    });
  }

  // Shuffle options for all questions so option 0 is not static
  return questions.map(q => {
    const indexed = q.options.map((opt, i) => ({ opt, optAr: q.optionsAr[i], isCorrect: i === q.correctIndex }));
    for (let i = indexed.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
    }
    let newCorrect = indexed.findIndex(item => item.isCorrect);
    if (newCorrect === 0 && indexed.length > 1) {
      const swapTarget = 1 + Math.floor(Math.random() * (indexed.length - 1));
      [indexed[0], indexed[swapTarget]] = [indexed[swapTarget], indexed[0]];
      newCorrect = swapTarget;
    }
    return {
      ...q,
      options: indexed.map(item => item.opt),
      optionsAr: indexed.map(item => item.optAr),
      correctIndex: newCorrect
    };
  });
}

