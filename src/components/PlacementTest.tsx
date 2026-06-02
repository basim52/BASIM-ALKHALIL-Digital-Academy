import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Award, 
  BookOpen, 
  ArrowLeft, 
  CalendarDays, 
  Clock, 
  Download, 
  Sparkles, 
  Zap, 
  Check, 
  School 
} from 'lucide-react';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';
import { proficiencyLevel, UserProfile, StudentProfile } from '../types';
import { translations, Language } from '../lib/translations';

// Import all curricula variables to generate direct automated study plans
import { ALL_READING_UNITS } from './ReadingCurriculumCompanion';
import { ALL_GRAMMAR_UNITS } from './GrammarCurriculumCompanion';
import { ALL_WRITING_UNITS } from './WritingCurriculumCompanion';
import { ALL_CONVERSATION_UNITS } from './ConversationCurriculumCompanion';
import { ALL_EXPRESSION_UNITS } from './ExpressionCurriculumCompanion';
import { OXFORD_UNITS } from './OxfordDiscoverCompanion';
import { OXFORD_LESSONS } from '../data/oxfordLessonsData';
import { OLD_OXFORD_LESSONS } from './OxfordUnitLesson';
import { STORIES } from './StoryLibrary';
import { KIDS_STORIES } from '../data/kidsStories';
import { ADULTS_DAILY_DOSES } from '../data/adultsDailyDose';
import { 
  PRONUNCIATION_LAB_DATA, 
  ROLE_PLAY_CHALLENGES_DATA, 
  VISUAL_DICTIONARY_DATA, 
  ENGLISH_WITH_SONGS_DATA, 
  CARTOON_SERIES_DATA, 
  ESCAPE_ROOM_PUZZLES_DATA, 
  FAMILY_GAMES_DATA, 
  COOKING_CHALLENGES_DATA 
} from '../data/interactiveCurriculum';

import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore';

interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number;
  category: string;
}

// 15 expert-formulated questions matching CEFR standards (A1 to C2)
const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "My sister and I ________ playing tennis at the club right now.",
    options: ["is", "am", "are", "be"],
    correct: 2,
    category: "Basics & Pronouns (A1)"
  },
  {
    id: 2,
    text: "Sarah always ________ her homework before dinner.",
    options: ["finished", "finish", "finishes", "finishing"],
    correct: 2,
    category: "Present Simple (A1-A2)"
  },
  {
    id: 3,
    text: "While they ________ for the bus, it started to rain heavily.",
    options: ["waited", "were waiting", "are waiting", "have waited"],
    correct: 1,
    category: "Past Simple vs Continuous (A2)"
  },
  {
    id: 4,
    text: "This is definitely ________ film I have ever watched in my life.",
    options: ["the most exciting", "more exciting", "excitingest", "as exciting as"],
    correct: 0,
    category: "Comparisons & Adjectives (A2-B1)"
  },
  {
    id: 5,
    text: "We ________ in this city for over ten years now and we absolutely love it.",
    options: ["lived", "are living", "have lived", "will live"],
    correct: 2,
    category: "Present Perfect (B1)"
  },
  {
    id: 6,
    text: "By the time the manager arrived, the employees ________ the main contract.",
    options: ["had already signed", "already signed", "have already signed", "were signing"],
    correct: 0,
    category: "Past Perfect Structure (B1-B2)"
  },
  {
    id: 7,
    text: "If I ________ more free time, I would enroll in the advanced academy program.",
    options: ["have", "had", "would have", "had had"],
    correct: 1,
    category: "Conditionals - Type II (B2)"
  },
  {
    id: 8,
    text: "The academic director highly suggested ________ a mock exam before the formal presentation.",
    options: ["to take", "taking", "take", "for taking"],
    correct: 1,
    category: "Gerunds vs Infinitives (B2)"
  },
  {
    id: 9,
    text: "The final graduation certificates ________ by the Dean late last evening.",
    options: ["were signed", "was signed", "had signed", "have been signed"],
    correct: 0,
    category: "Passive Voice Formulation (B2)"
  },
  {
    id: 10,
    text: "She curiously asked me where ________ during the previous summer holiday.",
    options: ["did I travel", "I had traveled", "I traveled", "had I traveled"],
    correct: 1,
    category: "Reported Speech Structure (B2-C1)"
  },
  {
    id: 11,
    text: "It is highly recommended that each candidate ________ their documentation before enrollment.",
    options: ["renews", "renew", "renewed", "should renew"],
    correct: 1,
    category: "Subjunctive Mood (C1)"
  },
  {
    id: 12,
    text: "Seldom ________ such a brilliant display of academic and linguistic excellence.",
    options: ["we have witnessed", "have we witnessed", "did we witnessed", "we witnessed"],
    correct: 1,
    category: "Negative Adverbial Inversion (C1)"
  },
  {
    id: 13,
    text: "The shocking research findings ________ a devastating blow to the traditional learning theories.",
    options: ["made", "struck", "dealt", "gave"],
    correct: 2,
    category: "Collocations & Idiomatic Lexis (C1-C2)"
  },
  {
    id: 14,
    text: "He is recognized as being highly capable ________ handling our most demanding legal translation clients.",
    options: ["to", "for", "of", "with"],
    correct: 2,
    category: "Prepositional Verb Idioms (C1-C2)"
  },
  {
    id: 15,
    text: "I ________ have gone to the formal graduation ceremony, but I was simply too exhausted.",
    options: ["must", "should", "would", "could"],
    correct: 2,
    category: "Hypothetical Past Willingness (C2)"
  }
];

export const PlacementTest = ({ 
  onComplete, 
  onBack, 
  lang,
  userProfile,
  setUserProfile 
}: { 
  onComplete: (level: proficiencyLevel) => void;
  onBack: () => void;
  lang: Language;
  userProfile: UserProfile | null;
  setUserProfile?: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  // Scheduler & Plan linkage wizard states
  const [wizardStep, setWizardStep] = useState<'report' | 'schedule'>('report');
  const [selectedDays, setSelectedDays] = useState<number[]>([0, 2, 4]); // Sun, Tue, Thu
  const [preferredTime, setPreferredTime] = useState('16:00');
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [isExportingCert, setIsExportingCert] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);
    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
      if (currentStep < QUESTIONS.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setIsFinished(true);
        savePlacementProgressLocally(newAnswers);
      }
    }, 350);
  };

  const calculateLevel = (): proficiencyLevel => {
    const scoreVal = answers.filter((ans, i) => ans === QUESTIONS[i].correct).length;
    if (scoreVal <= 3) return proficiencyLevel.A1;
    if (scoreVal <= 6) return proficiencyLevel.A2;
    if (scoreVal <= 9) return proficiencyLevel.B1;
    if (scoreVal <= 12) return proficiencyLevel.B2;
    return proficiencyLevel.C1;
  };

  const determinedLevel = calculateLevel();
  const score = answers.filter((ans, i) => ans === QUESTIONS[i].correct).length;

  const getBilingualBulletPoints = (lvl: string, scoreVal: number) => {
    if (lvl === proficiencyLevel.A1 || scoreVal <= 3) {
      return {
        titleAr: "تقرير تقييم تأسيسي (المستوى التأسيسي A1)",
        titleEn: "Foundational Placement Report (A1 Level)",
        arabic: [
          "يملك الطالب أساسيات واعدة في التعرف على بعض الضمائر والكلمات البسيطة.",
          "يحتاج إلى تقوية فاعلة في تراكيب الجمل المكتملة والمؤشرات النحوية الأساسية.",
          "تم إعداد منهاج مخصص يدمج 'برامج الطفولة المبكرة' و'القاموس البصري الكرتوني'.",
          "التركيز سيكون في تلمس الكلمات المنطوقة ورفع ثقة الطالب الذاتية أسبوعياً."
        ],
        english: [
          "The student demonstrates good potential in recognizing basic pronouns and core words.",
          "Active grammar reinforcement is recommended for complete sentence structures.",
          "A customized syllabus is designed leveraging 'Early Childhood' and cartoon aids.",
          "The upcoming milestones will focus on oral articulation and raising spoken confidence."
        ]
      };
    } else if (lvl === proficiencyLevel.A2 || scoreVal <= 6) {
      return {
        titleAr: "تقرير تقييم ابتدائي (المستوى الابتدائي A2)",
        titleEn: "Promising Primary Report (A2 Level)",
        arabic: [
          "يظهر الطالب فهمًا جيدًا للزمن المضارع والأسئلة الحوارية العادية.",
          "يحتاج إلى تدريب مستمر على بناء جمل صحيحة نحويًا وتطوير طلاقة النطق.",
          "منهاج الطالب سيشمل 'العالم بالإنجليزية' للمبتدئين وتدريبات تفاعلية قصيرة.",
          "الاستراتيجية تركز على نطق الكلمات الشائعة وتسهيل سرد المحادثات اليومية."
        ],
        english: [
          "The student shows a good grasp of the present context and daily questionnaire items.",
          "Continuous practice is advised to structure grammatically sound statements.",
          "Syllabus includes 'World in English' modules paired with short interactive tasks.",
          "Direct focus will be on colloquial articulation and expanding oral conversational skills."
        ]
      };
    } else if (lvl === proficiencyLevel.B1 || scoreVal <= 9) {
      return {
        titleAr: "تقرير تقييم متوسط (المستوى المتوسط B1)",
        titleEn: "Splendid Intermediate Report (B1 Level)",
        arabic: [
          "يملك الطالب مهارات جيدة في الفهم السماعي وقراءة النصوص القصيرة السهلة.",
          "يتطلب العمل على زيادة استخدام الأزمنة المستقبلية والشرطية الكثيرة في الحديث.",
          "الخطة الدراسية ستتضمن مناهج 'أكسفورد ديسكفر الأكاديمية' وقصص عميقة.",
          "نهدف إلى تمكين الطالب من التعبير وصياغة جمل أطول بقرينة لغوية متكاملة."
        ],
        english: [
          "The student displays fine listening and reading comprehension of moderate passages.",
          "Further practice is needed with complex future tenses and conditional structures.",
          "The tailored pathway integrates 'Oxford Discover Academic' and detailed reading lessons.",
          "Our objective is to empower the student to formulate personal perspectives fluently."
        ]
      };
    } else if (lvl === proficiencyLevel.B2 || scoreVal <= 12) {
      return {
        titleAr: "تقرير تقييم فوق المتوسط (المستوى B2)",
        titleEn: "Outstanding Upper-Intermediate Report (B2 Level)",
        arabic: [
          "يبرهن الطالب على ثقة وطلاقة ملموسة في المناقشات والتعبير اللغوي المكتوب.",
          "يحتاج للانتقال لمهارات البحث الأكاديمي وصياغة المقالات النقدية والجدلية.",
          "المنهاج المعتمد يركز على مناقشة المواضيع الحديثة وسلسلة المحادثات العميقة.",
          "المستهدف هو إكساب الطالب قدرات خطابية وثقافية عالية تواكب المعايير الدولية."
        ],
        english: [
          "The student exhibits tangible confidence and flow in both spoken and written communication.",
          "Transitioning towards academic research and refined argumentative writing is advised.",
          "The assigned curriculum centers around modern analytical topics and deep conversation series.",
          "The target is to develop speech presentation skills matching standard global criteria."
        ]
      };
    } else {
      return {
        titleAr: "تقرير تقييم متقدم واعد (المستوى المتقدم C1/C2)",
        titleEn: "Exceptional Advanced Report (C1/C2 Level)",
        arabic: [
          "يتميز الطالب بمستوى استثنائي وقدرة واضحة على صياغة وبناء أفكار معقدة ببراعة.",
          "يوصى بالانخراط في كتابة البحوث العلمية والخطابة والتفنيد المنهجي المقارن.",
          "تم تخصيص مناهج 'مستشار تطوير الأكاديمية' وكيل التنمية الذاتية المعمق لتحدي قدراته.",
          "سنركز على الصقل الخطابي التام للنقاشات والتفاعلات الاحترافية بمستوى أكاديمي نخبوي."
        ],
        english: [
          "The student stands out with outstanding mastery, structuring advanced concepts with ease.",
          "Engaging in advanced scholarly essays, public speaking, and critical debating is highly recommended.",
          "Assigned custom PD (Professional Development) and deep development modules to push boundaries.",
          "Focus lies on professional-grade conversational polish and elite academic interactions."
        ]
      };
    }
  };

  const savePlacementProgressLocally = async (finalAnswers: number[]) => {
    if (!userProfile) return;
    try {
      const scoreVal = finalAnswers.filter((ans, i) => ans === QUESTIONS[i].correct).length;
      let calculatedLvl = proficiencyLevel.A1;
      if (scoreVal <= 3) calculatedLvl = proficiencyLevel.A1;
      else if (scoreVal <= 6) calculatedLvl = proficiencyLevel.A2;
      else if (scoreVal <= 9) calculatedLvl = proficiencyLevel.B1;
      else if (scoreVal <= 12) calculatedLvl = proficiencyLevel.B2;
      else calculatedLvl = proficiencyLevel.C1;

      await setDoc(doc(db, 'students', userProfile.uid), {
        level: calculatedLvl,
        placementTestCompleted: true,
        placementScore: scoreVal,
        placementAnswers: finalAnswers,
        completedAt: new Date().toISOString()
      }, { merge: true });

      if (setUserProfile) {
        setUserProfile(prev => prev ? { ...prev, level: calculatedLvl } as any : null);
      }
    } catch (err) {
      console.error("Error saving placement details on handleAnswer completion:", err);
    }
  };

  const getStrengths = () => {
    const categories = Array.from(new Set(QUESTIONS.map(q => q.category.split(' (')[0])));
    return categories.map(cat => {
      const catQuestions = QUESTIONS.filter(q => q.category.startsWith(cat));
      const correctInCat = catQuestions.filter(q => {
        const index = QUESTIONS.findIndex(ques => ques.id === q.id);
        return answers[index] === q.correct;
      }).length;
      return { category: cat, percentage: (correctInCat / catQuestions.length) * 100 };
    }).filter(s => s.percentage >= 50).slice(0, 3);
  };

  // Automated study plan compiler & save directly to studyPlans
  const compileAndSavePlan = async () => {
    if (!userProfile) {
      // Graceful fallback to onComplete if there's no logged in user profile context
      onComplete(determinedLevel);
      return;
    }
    setIsGeneratingPlan(true);

    try {
      const activeLevels: string[] = [];
      const difficultyLevel = 
        determinedLevel === proficiencyLevel.A1 ? 'beginner' :
        determinedLevel === proficiencyLevel.A2 || determinedLevel === proficiencyLevel.B1 ? 'intermediate' : 'advanced';

      if (difficultyLevel === 'beginner') {
        activeLevels.push('A1');
      } else if (difficultyLevel === 'intermediate') {
        activeLevels.push('A2', 'B1');
      } else {
        activeLevels.push('B1', 'B2');
      }

      const earlyChildhoodLessons: any[] = [];
      const advancedLessons: any[] = [];
      const oxfordLessons: any[] = [];
      const listeningStoryLessons: any[] = [];
      const dailyDoseLessons: any[] = [];
      const kidsStoryLessons: any[] = [];
      const interactiveLessons: any[] = [];

      // 1. Compile Early Childhood
      const childhoodItems = [
        { courseId: 'early_childhood', label: isRtl ? 'الكلمات الأولى 👶' : 'First Words 👶', topic: isRtl ? 'الكلمات الأولى من حولنا بالصوت والصورة 👶' : 'Bilingual First Words & Audios 👶', unitId: 'first-words', level: 'Kid' },
        { courseId: 'early_childhood', label: isRtl ? 'الألوان الممتعة 🎨' : 'Fun Colors 🎨', topic: isRtl ? 'تعلم الألوان وتراكيبها بالنطق السليم 🎨' : 'Fun Colors Identification and Games 🎨', unitId: 'colors', level: 'Kid' },
        { courseId: 'early_childhood', label: isRtl ? 'الأرقام المبكرة 🔢' : 'Early Numbers 🔢', topic: isRtl ? 'عد الأرقام بالإنجليزية والتمارين التفاعلية 🔢' : 'Count numbers & complete fun questions 🔢', unitId: 'numbers', level: 'Kid' },
        { courseId: 'early_childhood', label: isRtl ? 'أصدقاء صوتيات الحروف 🔤' : 'Phonics Letters A-Z 🔤', topic: isRtl ? 'شخصيات وصوتيات الحروف والقصص الكرتونية الحية 🔤' : 'Phonics Letter friends, characters & drawing 🔤', unitId: 'letters', level: 'Kid' }
      ];
      childhoodItems.forEach(item => {
        if (difficultyLevel === 'beginner' || (difficultyLevel === 'intermediate' && item.unitId === 'letters')) {
          earlyChildhoodLessons.push(item);
        }
      });

      // 2. Compile Advanced/Standard
      activeLevels.forEach(lvl => {
        if (ALL_READING_UNITS[lvl as any]) {
          ALL_READING_UNITS[lvl as any].forEach(u => {
            advancedLessons.push({ courseId: 'reading', label: isRtl ? 'القراءة المتطورة ' + lvl : 'Elite Reading ' + lvl, topic: isRtl ? u.titleAr : u.titleEn, unitId: u.id, level: lvl });
          });
        }
        if (ALL_GRAMMAR_UNITS[lvl as any]) {
          ALL_GRAMMAR_UNITS[lvl as any].forEach(u => {
            advancedLessons.push({ courseId: 'grammar', label: isRtl ? 'القواعد المتطورة ' + lvl : 'Advanced Grammar ' + lvl, topic: isRtl ? u.titleAr : u.titleEn, unitId: u.id, level: lvl });
          });
        }
        if (ALL_WRITING_UNITS[lvl as any]) {
          ALL_WRITING_UNITS[lvl as any].forEach(u => {
            advancedLessons.push({ courseId: 'writing', label: isRtl ? 'الكتابة المتطورة ' + lvl : 'Advanced Writing ' + lvl, topic: isRtl ? u.titleAr : u.titleEn, unitId: u.id, level: lvl });
          });
        }
        if ((ALL_CONVERSATION_UNITS as any)[lvl]) {
          (ALL_CONVERSATION_UNITS as any)[lvl].forEach((u: any) => {
            advancedLessons.push({ courseId: 'conversation', label: isRtl ? 'المحادثة المتطورة ' + lvl : 'Advanced Conversation ' + lvl, topic: isRtl ? u.titleAr : u.titleEn, unitId: u.id, level: lvl });
          });
        }
        if ((ALL_EXPRESSION_UNITS as any)[lvl]) {
          (ALL_EXPRESSION_UNITS as any)[lvl].forEach((u: any) => {
            advancedLessons.push({ courseId: 'expression', label: isRtl ? 'التعبير المطور ' + lvl : 'Enhanced Expression ' + lvl, topic: isRtl ? u.titleAr : u.titleEn, unitId: u.id, level: lvl });
          });
        }
      });

      // 3. Oxford series mapping
      OXFORD_UNITS.forEach(u => {
        const lesson = OXFORD_LESSONS.find(l => l.id === u.id);
        if (lesson) {
          const cat = lesson.category;
          let isAppropriate = false;
          if (difficultyLevel === 'beginner' && (cat === 'phonics_heroes' || cat === 'oxford_reading_adventures')) isAppropriate = true;
          else if (difficultyLevel === 'intermediate' && (cat === 'clil_discover' || cat === 'values_stories')) isAppropriate = true;
          else if (difficultyLevel === 'advanced' && (cat === 'project_time' || cat === 'grammar_friends')) isAppropriate = true;

          if (isAppropriate) {
            oxfordLessons.push({
              courseId: 'oxford',
              label: isRtl ? 'أكسفورد المصور' : 'Oxford Discover',
              topic: isRtl ? u.titleAr : u.titleEn,
              unitId: String(u.id),
              level: difficultyLevel === 'beginner' ? 'Basic' : difficultyLevel === 'intermediate' ? 'Junior' : 'Advanced'
            });
          }
        }
      });

      // 4. Stories
      STORIES.forEach(s => {
        listeningStoryLessons.push({ courseId: 'story-library', label: isRtl ? 'القصص المسموعة' : 'Auditory Story', topic: isRtl ? s.titleAr : s.titleEn, unitId: s.id, level: s.level });
      });

      // 5. Daily Doses
      ADULTS_DAILY_DOSES.forEach(d => {
        dailyDoseLessons.push({ courseId: 'adults_daily_dose', label: isRtl ? 'الجرعة اليومية' : 'Daily Dose', topic: isRtl ? d.title_ar : d.title_en, unitId: d.lesson_id, level: d.level });
      });

      // 6. Kids stories
      KIDS_STORIES.forEach(s => {
        kidsStoryLessons.push({ courseId: 'kids_stories', label: isRtl ? 'قصص تعليمية' : 'Educational Story', topic: isRtl ? s.title_ar : s.title_en, unitId: s.lesson_id, level: s.level });
      });

      // 7. Interactive play compile
      const filterKey = difficultyLevel === 'beginner' ? 'أطفال' : difficultyLevel === 'advanced' ? 'كبار' : null;
      const songs = ENGLISH_WITH_SONGS_DATA.filter(s => !filterKey || s.level === filterKey);
      songs.forEach(s => {
        interactiveLessons.push({ courseId: 'english_songs', label: isRtl ? 'الأغاني التفاعلية 🎵' : 'Interactive Songs 🎵', topic: isRtl ? `أغنية ممتعة: ${s.title}` : `Song Karaoke: ${s.title}`, unitId: s.id, level: 'Interactive' });
      });

      CARTOON_SERIES_DATA.forEach(c => {
        interactiveLessons.push({ 
          courseId: 'animated_storyboard', 
          label: isRtl ? 'مشاهد لندن الكرتونية 🎬' : 'London Storyboard 🎬', 
          topic: isRtl ? `حلقة كرتون: ${c.title_ar}` : `Episode: Noor's London Adventures`, 
          unitId: c.id, 
          level: 'Cartoon' 
        });
      });

      ESCAPE_ROOM_PUZZLES_DATA.forEach(p => {
        interactiveLessons.push({ 
          courseId: 'escape_room', 
          label: isRtl ? 'غرفة الهروب 🔐' : 'Escape Room 🔐', 
          topic: isRtl ? `أحجية ذكية: ${p.title_ar}` : `Puzzle Solving Adventure`, 
          unitId: p.id, 
          level: 'Puzzle' 
        });
      });

      ROLE_PLAY_CHALLENGES_DATA.forEach(r => {
        interactiveLessons.push({ 
          courseId: 'roleplay_challenges', 
          label: isRtl ? 'حوار تمثيلي 🎭' : 'Roleplay Scenario 🎭', 
          topic: isRtl ? `تحدي تفاعلي: ${r.title_ar} (${r.category})` : `Roleplay challenge: ${r.category} conversation`, 
          unitId: r.id, 
          level: 'Speaking' 
        });
      });

      // Integrate together
      const allAvailableLessons: any[] = [];
      const listsToMerge = [
        earlyChildhoodLessons,
        advancedLessons,
        oxfordLessons,
        listeningStoryLessons,
        dailyDoseLessons,
        kidsStoryLessons,
        interactiveLessons
      ].filter(l => l.length > 0);

      if (listsToMerge.length > 0) {
        const longest = Math.max(...listsToMerge.map(l => l.length));
        for (let i = 0; i < longest; i++) {
          for (const list of listsToMerge) {
            if (i < list.length) {
              allAvailableLessons.push(list[i]);
            }
          }
        }
      }

      // Populate plan items (13 weeks term, 2 lessons/day count)
      const weeksToGenerate = 13;
      const lessonsPerDay = 2;
      const daysAr = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
      const daysEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      const mockPlan: any[] = [];
      let lp = 0;
      let dateCursor = new Date();
      const startStr = dateCursor.toISOString().split('T')[0];

      for (let w = 1; w <= weeksToGenerate; w++) {
        const monthNum = Math.ceil(w / 4);
        const seqWeek = ((w - 1) % 4) + 1;
        let lastStudyInWeek: Date | null = null;

        for (let dIdx = 0; dIdx < 7; dIdx++) {
          const currentDayOfWeek = dateCursor.getDay();

          if (selectedDays.includes(currentDayOfWeek)) {
            lastStudyInWeek = new Date(dateCursor);
            const baseScheduled = new Date(dateCursor);
            const [h, m] = preferredTime.split(':').map(Number);
            baseScheduled.setHours(h, m, 0, 0);

            for (let lessonIndex = 1; lessonIndex <= lessonsPerDay; lessonIndex++) {
              if (lp < allAvailableLessons.length) {
                const pickedLesson = allAvailableLessons[lp];
                const finalScheduled = new Date(baseScheduled);
                if (lessonIndex > 1) {
                  finalScheduled.setHours(finalScheduled.getHours() + (lessonIndex - 1));
                }

                mockPlan.push({
                  id: `plan-w${w}-d${dIdx}-s${lessonIndex}`,
                  month: monthNum,
                  week: seqWeek,
                  day: isRtl ? daysAr[currentDayOfWeek] : daysEn[currentDayOfWeek],
                  courseId: pickedLesson.courseId,
                  courseLabel: pickedLesson.label,
                  topic: pickedLesson.topic,
                  duration: '45 min',
                  level: pickedLesson.level,
                  unitId: pickedLesson.unitId,
                  dateLabel: dateCursor.toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'short' }),
                  timeLabel: `${String(finalScheduled.getHours()).padStart(2, '0')}:${String(finalScheduled.getMinutes()).padStart(2, '0')}`,
                  scheduledAt: finalScheduled.toISOString()
                });
                lp++;
              }
            }
          }
          dateCursor.setDate(dateCursor.getDate() + 1);
        }

        // Add Bi-Weekly Review test automatically
        if (w % 2 === 0 && lastStudyInWeek) {
          const testScheduled = new Date(lastStudyInWeek);
          const [h, m] = preferredTime.split(':').map(Number);
          testScheduled.setHours(h + lessonsPerDay, m, 0, 0);

          mockPlan.push({
            id: `test-w${w}`,
            month: monthNum,
            week: seqWeek,
            day: isRtl ? daysAr[lastStudyInWeek.getDay()] : daysEn[lastStudyInWeek.getDay()],
            courseId: 'test',
            courseLabel: isRtl ? 'اختبار مراجعة' : 'Review Test',
            topic: isRtl ? `اختبار المراجعة الشامل الأسبوع (${w-1}-${w})` : `Comprehensive Review Test (Week ${w-1}-${w})`,
            duration: '60 min',
            level: determinedLevel,
            unitId: `test-${w}`,
            dateLabel: lastStudyInWeek.toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'short' }),
            timeLabel: `${String(testScheduled.getHours()).padStart(2, '0')}:${String(testScheduledAtHourStr(testScheduled.getHours()))}`,
            scheduledAt: testScheduled.toISOString(),
            isTest: true
          });
        }
      }

      function testScheduledAtHourStr(h: number) {
        return "00";
      }

      // Create studyPlans database entry
      const actualPlanDoc = {
        studentName: userProfile.displayName || 'طالب متميز',
        startDate: startStr,
        preferredTime,
        selectedDays,
        selectedCategories: difficultyLevel === 'beginner' ? ['early_childhood', 'interactive_learning'] : ['advanced', 'oxford', 'interactive_learning'],
        lessonsPerDay,
        weeksToGenerate,
        planItems: mockPlan,
        userId: userProfile.uid,
        parentIds: (userProfile as any).linkedParentIds || [],
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'studyPlans'), actualPlanDoc);

      // Write completion state to students collection so metadata is kept fully locked
      await setDoc(doc(db, 'students', userProfile.uid), {
        level: determinedLevel,
        placementTestCompleted: true,
        placementScore: score,
        placementAnswers: answers,
        completedAt: new Date().toISOString()
      }, { merge: true });
      
      // Update local react context if needed
      if (setUserProfile) {
        setUserProfile(prev => prev ? { ...prev, level: determinedLevel } as any : null);
      }

      // Complete
      onComplete(determinedLevel);
    } catch (e) {
      console.error("Error creating plan item during placement assessment:", e);
      onComplete(determinedLevel);
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const handleExportCertificate = async () => {
    const element = document.getElementById('placement-certified-report');
    if (!element) return;
    setIsExportingCert(true);
    
    try {
      // Small pause to let image render correctly
      await new Promise(resolve => setTimeout(resolve, 500));
      const dataUrl = await toPng(element, {
        quality: 1.0,
        pixelRatio: 2.5, // Ultra-high expert resolution
        backgroundColor: '#030712', // slate-950
        cacheBust: true,
      });

      const fileName = `Academy_Placement_Certificate_${(userProfile?.displayName || 'Student').replace(/\s+/g, '_')}.png`;
      saveAs(dataUrl, fileName);
    } catch (error) {
      console.error('Exporting assessment report failed:', error);
      alert(isRtl ? 'تفريغ الصورة المبرمجة فشل، يرجى إعادة محاولة تصدير الشهادة.' : 'Exporting failed. Please try again.');
    } finally {
      setIsExportingCert(false);
    }
  };

  const toggleDay = (dayIdx: number) => {
    setSelectedDays(prev => 
      prev.includes(dayIdx) ? prev.filter(d => d !== dayIdx) : [...prev, dayIdx].sort()
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className={`min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4 md:p-8 ${isRtl ? 'font-arabic' : 'font-sans'} selection:bg-amber-100 relative overflow-hidden`}>
      {/* Immersive background bubbles */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl -mr-64 -mt-64 opacity-50 select-none pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-100/20 rounded-full blur-3xl -ml-64 -mb-64 opacity-50 select-none pointer-events-none" />

      <div className="max-w-2xl w-full bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/50 relative z-10">
        <div className="absolute top-0 left-0 w-full h-2.5 bg-gradient-to-r from-[#002147] via-[#C49E3A] to-[#002147]" />

        {/* Header Back Button */}
        {!isFinished && (
          <div className="absolute top-6 left-6 z-20">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-slate-400 hover:text-[#002147] transition-all group"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-[#002147] group-hover:text-white transition-all shadow-sm">
                <ArrowLeft size={16} className={isRtl ? 'rotate-180' : ''} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">{isRtl ? 'رجوع' : 'Back'}</span>
            </button>
          </div>
        )}

        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div 
              key="test-questions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: isRtl ? 120 : -120 }}
              className="p-6 md:p-12 pt-16"
              dir={isRtl ? 'rtl' : 'ltr'}
            >
              {/* Question Header & Progress Info */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#002147] to-[#1e3a5f] text-white rounded-2xl flex items-center justify-center shadow-lg font-black text-lg shrink-0">
                    {currentStep + 1}
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-[#002147] tracking-tight">{t.placementTestTitle}</h2>
                    <p className="text-[10px] text-[#C49E3A] font-black uppercase tracking-widest">{QUESTIONS[currentStep].category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-black text-[#002147] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    {isRtl ? 'تقييم كفاءة ومفردات' : 'Proficiency Assessment'}
                  </div>
                </div>
              </div>

              {/* Real-time Indicator Bar */}
              <div className="h-2 bg-slate-100 rounded-full mb-10 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#002147] to-[#C49E3A]"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                  transition={{ type: 'spring', stiffness: 55 }}
                />
              </div>

              {/* Dynamic Sentence Question Area */}
              <div className="mb-10 min-h-24 flex items-center justify-center bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                <motion.h3 
                  key={currentStep}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl md:text-2xl font-bold text-[#002147] leading-relaxed text-center" dir="ltr"
                >
                  {QUESTIONS[currentStep].text.split('________').map((part, idx) => (
                    <React.Fragment key={idx}>
                      {part}
                      {idx === 0 && (
                        <span className="mx-2 px-5 py-0.5 bg-blue-50 text-blue-600 border-b-4 border-blue-500 rounded-lg inline-block font-black select-none shadow-sm">
                          ______
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </motion.h3>
              </div>

              {/* Grid Options Selection */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {QUESTIONS[currentStep].options.map((option, i) => (
                  <motion.button
                    key={i}
                    variants={itemVariants}
                    whileHover={{ scale: 1.015, y: -2 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleAnswer(i)}
                    className="w-full p-5 text-left border-2 border-slate-100 bg-white rounded-2xl hover:border-[#C49E3A] hover:bg-slate-50/20 transition-all font-bold text-[#002147] flex justify-between items-center group shadow-sm"
                    dir={isRtl ? 'rtl' : 'ltr'}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 text-[#002147] border border-slate-200 flex items-center justify-center font-black group-hover:bg-[#C49E3A] group-hover:text-white transition-colors">
                        {String.fromCharCode(65 + i)}
                      </div>
                      <span className="text-md" dir="ltr">{option}</span>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <div className="p-6 md:p-12" dir={isRtl ? 'rtl' : 'ltr'}>
              {wizardStep === 'report' ? (
                <motion.div 
                  key="result-slide"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-8"
                >
                  {/* Title Banner */}
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-[#C49E3A]/10 text-[#C49E3A] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#C49E3A]/30">
                      <Award size={32} />
                    </div>
                    <span className="text-[10px] font-black tracking-widest text-[#C49E3A] uppercase bg-[#C49E3A]/15 px-4 py-1.5 rounded-full border border-[#C49E3A]/25 inline-block">
                      {isRtl ? 'تم إصدار التقرير الجامعي المعتمد' : 'ACADEMIC PLACEMENT REPORT ISSUED'}
                    </span>
                    <h2 className="text-3xl font-black text-[#002147] mt-3">
                      {isRtl ? 'تهانينا! تم تحديد مستواك' : 'Congratulations! Your Level Is Ready'}
                    </h2>
                    <p className="text-slate-400 text-sm">{t.finishedDesc}</p>
                  </div>

                  {/* Bilingual Result Score Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#002147] text-white p-6 rounded-[2rem] text-center relative overflow-hidden flex flex-col justify-center items-center shadow-lg">
                      <p className="text-[#C49E3A] text-[9px] font-black uppercase tracking-widest mb-1.5">CEFR LEVEL / المستوى اللغوي</p>
                      <span className="text-5xl font-black tracking-tight text-white mb-1">{determinedLevel}</span>
                      <p className="text-blue-200/50 text-[10px] uppercase font-bold">{t.globalStandard}</p>
                    </div>

                    <div className="bg-[#fcfcfd] border border-slate-150 p-6 rounded-[2rem] shadow-sm flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block mb-3">
                          {isRtl ? 'نقاط القوة اللغوية' : 'Linguistic Strengths'}
                        </span>
                        <div className="space-y-3">
                          {getStrengths().length > 0 ? getStrengths().map((strength, sIdx) => (
                            <div key={sIdx} className="space-y-1">
                              <div className="flex justify-between text-xs text-[#002147]">
                                <span className="font-bold">{strength.category}</span>
                                <span className="font-mono text-slate-400">{Math.round(strength.percentage)}%</span>
                              </div>
                              <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${strength.percentage}%` }} />
                              </div>
                            </div>
                          )) : (
                            <p className="text-xs text-slate-400 font-bold italic">
                              {isRtl ? 'توصيات لغوية ممتازة تبدأ من اليوم' : 'Exciting learning recommendations starting today'}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Elegant Bilingual Spot Report Card */}
                  <div className="bg-gradient-to-br from-[#002147]/5 to-[#C49E3A]/5 border-2 border-[#C49E3A]/20 rounded-[2rem] p-6 md:p-8 space-y-6">
                    <div className="flex items-center gap-3 justify-center mb-4 border-b border-slate-100 pb-4">
                      <Sparkles className="text-[#C49E3A]" size={20} />
                      <h3 className="font-black text-[#002147] text-center leading-none text-base md:text-lg">
                        {isRtl ? 'التقرير اللغوي الفوري ثنائي اللغة' : 'Instant Bilingual Placement Report'}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x md:divide-slate-200/60" dir={isRtl ? 'rtl' : 'ltr'}>
                      {/* Arabic Summary Section */}
                      <div className={`space-y-3 pb-4 md:pb-0 ${isRtl ? 'md:pl-6 text-right' : 'md:pr-1'}`}>
                        <span className="text-xs font-black text-[#C49E3A] bg-[#C49E3A]/10 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                          التحليل والتقييم اللغوي بالعربية
                        </span>
                        <div className="space-y-2.5 mt-2">
                          {getBilingualBulletPoints(determinedLevel, score).arabic.map((pt, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-right">
                              <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                              <p className="text-xs text-slate-600 leading-relaxed font-bold">{pt}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* English Summary Section */}
                      <div className={`space-y-3 pt-4 md:pt-0 ${isRtl ? 'md:pr-6 text-left' : 'md:pl-1'}`}>
                        <span className="text-xs font-black text-[#002147] bg-[#002147]/5 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                          English Linguistic Observations
                        </span>
                        <div className="space-y-2.5 mt-2" dir="ltr">
                          {getBilingualBulletPoints(determinedLevel, score).english.map((pt, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-left">
                              <CheckCircle2 size={16} className="text-[#C49E3A] shrink-0 mt-0.5" />
                              <p className="text-xs text-slate-650 leading-relaxed font-semibold">{pt}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Download stamp PDF/certificate Button and Navigate Button */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleExportCertificate}
                      disabled={isExportingCert}
                      className="flex-1 bg-white border-2 border-slate-200 text-[#002147] hover:border-[#C49E3A] px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-40"
                    >
                      {isExportingCert ? (
                        <div className="w-4 h-4 border-2 border-[#002147] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Download size={14} className="text-[#C49E3A]" />
                      )}
                      <span>{isRtl ? 'تحميل الشهادة المعتمدة بختم الأكاديمية' : 'Download Certified Seal Certificate'}</span>
                    </button>

                    <button
                      onClick={() => setWizardStep('schedule')}
                      className="flex-1 bg-[#002147] hover:bg-[#C49E3A] text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all active:scale-95"
                    >
                      <span>{isRtl ? 'المتابعة لتخصيص خطتك الدراسية' : 'Proceed to Customize Plan'}</span>
                      <ChevronRight size={14} className={isRtl ? 'rotate-180' : ''} />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="schedule-slide"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-2">
                    <div className="w-14 h-14 bg-blue-50 text-[#002147] rounded-full flex items-center justify-center mx-auto mb-3">
                      <CalendarDays size={28} />
                    </div>
                    <h3 className="text-2xl font-black text-[#002147]">
                      {isRtl ? 'اختر الأيام والأوقات التي تفضلها فقط' : 'Choose Your Preferred Days & Times Only'}
                    </h3>
                    <p className="text-slate-400 text-xs">
                      {isRtl 
                        ? 'بصفتنا خبراء لغويين، قمنا باختيار المناهج الملائمة لتقييمك تلقائياً بالتزامن مع جدولك.'
                        : 'Our linguistic systems pre-selected the exact curricula matching your CEFR range.'}
                    </p>
                  </div>

                  {/* Day Picker Grid */}
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest block text-right">
                      {isRtl ? 'حدد أيام الدراسة المفضلة' : 'Select Study Days'}
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                      {[
                        { labelAr: 'أحد', labelEn: 'Sun', idx: 0 },
                        { labelAr: 'اثنين', labelEn: 'Mon', idx: 1 },
                        { labelAr: 'ثلث', labelEn: 'Tue', idx: 2 },
                        { labelAr: 'أربع', labelEn: 'Wed', idx: 3 },
                        { labelAr: 'خميس', labelEn: 'Thu', idx: 4 },
                        { labelAr: 'جمعة', labelEn: 'Fri', idx: 5 },
                        { labelAr: 'سبت', labelEn: 'Sat', idx: 6 }
                      ].map((day, sIndex) => {
                        const isChosen = selectedDays.includes(day.idx);
                        return (
                          <button
                            key={sIndex}
                            onClick={() => toggleDay(day.idx)}
                            className={`p-3 rounded-xl border-2 font-bold text-xs transition-all flex flex-col items-center gap-1 ${
                              isChosen 
                                ? 'bg-[#002147] border-[#002147] text-white shadow-lg shadow-blue-900/10' 
                                : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300'
                            }`}
                          >
                            <span>{isRtl ? day.labelAr : day.labelEn}</span>
                            {isChosen && <div className="w-1 h-1 rounded-full bg-[#C49E3A]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Picker elegant element */}
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest block text-right">
                      {isRtl ? 'وقت الدراسة المفضل' : 'Preferred Study Time'}
                    </label>
                    <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <Clock className="text-[#C49E3A] shrink-0" size={20} />
                      <input 
                        type="time" 
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="bg-transparent font-bold text-lg text-[#002147] w-full focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Terms terms details */}
                  <div className="bg-slate-50/55 rounded-2xl p-4 border border-dashed border-slate-250 text-center text-[11px] text-slate-400 font-medium">
                    {isRtl 
                      ? 'سيقوم محول الأكاديمية الذكي الآن ببناء جدول دراسي متكامل لمدة 13 أسبوعاً وحفظه على حسابك مباشرة.'
                      : 'The system compiler will forge a complete 13-week syllabus linked directly to your database profile.'}
                  </div>

                  {/* CTA Save direct and compile */}
                  <button
                    onClick={() => compileAndSavePlan()}
                    disabled={isGeneratingPlan || selectedDays.length === 0}
                    className="w-full bg-[#002147] hover:bg-[#C49E3A] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl transition-all active:scale-[0.98] disabled:opacity-40"
                  >
                    {isGeneratingPlan ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{isRtl ? 'جاري بناء وتوثيق خطتك الدراسية الذكية...' : 'Compiling Your Academy Syllabus...'}</span>
                      </>
                    ) : (
                      <>
                        <Zap size={18} className="text-[#C49E3A]" />
                        <span>{isRtl ? 'التحق الآن وتوليد الخطة الدراسية مباشرة' : 'Enroll & Launch Smart Syllabus Now'}</span>
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* OFF-SCREEN CERTIFICATE CARD TO EXPORT AS IMAGES (Bilingual, Academy logo & seal stamp verified) */}
      <div style={{ position: 'absolute', left: '-9999px', top: '0', pointerEvents: 'none' }}>
        <div 
          id="placement-certified-report"
          className="w-[850px] h-[1150px] bg-gradient-to-br from-[#FCFBF9] via-[#FAF9F5] to-[#F3F2EC] text-[#002147] p-14 flex flex-col justify-between relative border-[12px] border-double border-[#C49E3A] font-sans overflow-hidden"
          dir="rtl"
        >
          {/* Subtle backgrounds */}
          <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[550px] bg-amber-500/5 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[550px] bg-blue-500/5 rounded-full blur-[90px] pointer-events-none" />

          {/* Golden frame brackets */}
          <div className="absolute top-5 right-5 w-14 h-14 border-t-4 border-r-4 border-[#C49E3A]" />
          <div className="absolute top-5 left-5 w-14 h-14 border-t-4 border-l-4 border-[#C49E3A]" />
          <div className="absolute bottom-5 right-5 w-14 h-14 border-b-4 border-r-4 border-[#C49E3A]" />
          <div className="absolute bottom-5 left-5 w-14 h-14 border-b-4 border-l-4 border-[#C49E3A]" />

          <div className="flex flex-col items-center justify-between h-full bg-white/95 backdrop-blur-md p-6 border border-[#C49E3A]/20 rounded-[2rem] shadow-sm">
            {/* Header Brand */}
            <div className="text-center space-y-3 w-full">
              <div className="flex justify-center mb-3">
                <div className="w-20 h-20 bg-[#002147] border-2 border-[#C49E3A] rounded-2xl flex items-center justify-center relative overflow-hidden shadow-2xl">
                  <School size={40} className="text-[#C49E3A]" />
                  <div className="absolute inset-0 bg-white/5 rotate-45 translate-y-10" />
                </div>
              </div>
              <h1 className="text-3xl font-black tracking-tight text-[#002147] font-arabic leading-none">
                أكاديمية باسم الخليل لتعليم اللغات
              </h1>
              <p className="text-sm font-sans text-[#C49E3A] font-bold uppercase tracking-widest mt-1">
                Basim Al-Khalil Academy for Languages
              </p>
              <div className="h-[2px] w-48 bg-gradient-to-r from-transparent via-[#C49E3A] to-transparent mx-auto mt-2" />
            </div>

            {/* Document Verification Label */}
            <div className="text-center space-y-2">
              <span className="text-[10px] font-black tracking-widest text-[#8C6915] uppercase bg-[#C49E3A]/10 px-5 py-2 rounded-full border border-[#C49E3A]/20">
                OFFICIAL REPORT & PLACEMENT CERTIFICATE
              </span>
              <h2 className="text-2xl font-black text-[#002147] font-arabic mt-3">
                شهادة إنجاز تقييم تحديد المستوى اللغوي الأكاديمي
              </h2>
              <p className="text-xs text-slate-500 font-sans tracking-wide">
                Authorized Educational Placement Document Verification
              </p>
            </div>

            {/* Core recipient statement */}
            <div className="w-full text-center px-10 my-4 space-y-4">
              <p className="text-md text-slate-650 font-arabic leading-relaxed">
                بموجب أحكام الاختبار والتقييم الدوري المعتمد بالأكاديمية، تشهد لجنتنا التعليمية برأسة البروفيسور وأستاذ اللغات الجامعي بأن الطالب:
              </p>
              <div className="py-2 border-b-2 border-dashed border-[#C49E3A]/40 w-fit mx-auto px-16">
                <span className="text-3xl font-extrabold text-[#002147] font-arabic">
                  {userProfile?.displayName || 'طالب متميز'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono tracking-wider">
                Student ID: {userProfile?.uid || 'ACS-982-PL'}
              </p>
              <p className="text-xs text-slate-600 font-arabic leading-relaxed">
                قد أتم بكفاءة عالية كامل الأسئلة اللغوية النموذجية ومفردات النطق بنتيجة تفصيلية أكدت الاستعداد التام للمستوى الموضح أدناه:
              </p>
            </div>

            {/* Results score panel */}
            <div className="grid grid-cols-2 gap-8 w-full px-16 my-4">
              <div className="bg-[#002147]/5 border border-[#002147]/10 p-5 rounded-3xl text-center">
                <span className="text-[10px] font-black text-[#002147]/60 uppercase tracking-widest block mb-1">
                  النتيجة الإجمالية / Score
                </span>
                <span className="text-4xl font-black text-[#002147]">{score} / 15</span>
              </div>
              <div className="bg-gradient-to-br from-[#C49E3A]/5 to-[#C49E3A]/10 w-full border border-[#C49E3A]/40 p-5 rounded-3xl text-center">
                <span className="text-[10px] font-black text-[#8C6915] uppercase tracking-widest block mb-1">
                  المستوى الحائز عليه / Level
                </span>
                <span className="text-4xl font-black text-[#8C6915]">{determinedLevel}</span>
              </div>
            </div>

            {/* Dynamic Bilateral Placement Bullet Points */}
            <div className="w-full px-16 my-2 text-right">
              <div className="bg-[#FCFBF7] border border-[#C49E3A]/20 p-5 rounded-2xl w-full">
                <span className="text-[10px] font-black text-[#8C6915] uppercase tracking-wider block mb-3 text-center border-b border-slate-100 pb-2">
                  {getBilingualBulletPoints(determinedLevel, score).titleAr} | {getBilingualBulletPoints(determinedLevel, score).titleEn}
                </span>
                
                <div className="grid grid-cols-2 gap-5 text-right font-sans" dir="rtl">
                  {/* Arabic block */}
                  <div className="space-y-2 border-l border-slate-200/80 pl-4 text-right">
                    <span className="text-[9px] font-black text-slate-500 block mb-1">📌 تفاصيل التقييم اللغوي:</span>
                    {getBilingualBulletPoints(determinedLevel, score).arabic.map((pt, idx) => (
                      <p key={idx} className="text-[10px] leading-relaxed text-slate-700 flex items-start gap-1 justify-start flex-row-reverse text-right">
                        <span className="text-[#C49E3A] shrink-0 font-bold">•</span>
                        <span>{pt}</span>
                      </p>
                    ))}
                  </div>

                  {/* English block */}
                  <div className="space-y-2 text-left" dir="ltr">
                    <span className="text-[9px] font-black text-[#002147]/70 block mb-1">📌 Academic Milestones:</span>
                    {getBilingualBulletPoints(determinedLevel, score).english.map((pt, idx) => (
                      <p key={idx} className="text-[10px] leading-relaxed text-slate-700 flex items-start gap-1">
                        <span className="text-[#C49E3A] shrink-0 font-bold">•</span>
                        <span>{pt}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Triple stamps, signatures and details verification */}
            <div className="w-full flex justify-between items-end px-16 mt-6">
              {/* Professor seal */}
              <div className="text-center space-y-2">
                <p className="text-[9px] tracking-widest text-[#C49E3A] uppercase font-sans">FACULTY DIRECTORY</p>
                <div className="h-10 w-28 border border-[#C49E3A]/20 bg-[#C49E3A]/5 rounded-xl flex items-center justify-center">
                  <span className="font-serif italic text-xs text-[#002147]/90">B. Al-Khalil</span>
                </div>
                <p className="text-[8px] text-slate-500 font-arabic">أ. د. باسم الخليل</p>
              </div>

              {/* Verified Circular stamp seal representing "ختم شيك" */}
              <div className="relative select-none rotate-2">
                <div className="w-24 h-24 border-2 border-dashed border-[#002147]/45 rounded-full flex items-center justify-center p-1 relative bg-[#FAF9F5]/70 shadow-sm">
                  <div className="w-full h-full border border-double border-[#002147]/50 rounded-full flex flex-col items-center justify-center text-center p-1 text-[6px] font-black uppercase text-[#002147] relative">
                    <div className="absolute inset-1.5 border border-dotted border-[#002147]/30 rounded-full" />
                    <span className="text-[5px] tracking-widest text-[#002147] font-bold">BASIM ACADEMY</span>
                    <div className="w-8 h-8 rounded-full border border-[#002147]/20 flex items-center justify-center bg-[#C49E3A]/10 z-10 my-0.5 relative">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#C49E3A]">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <div className="absolute bg-[#002147] text-white font-black text-[4px] py-0.5 px-1 uppercase rounded tracking-widest rotate-[-15deg] whitespace-nowrap shadow">
                        APPROVED
                      </div>
                    </div>
                    <span className="text-[4px] tracking-widest text-slate-500">CERTIFIED SEAL</span>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="text-center space-y-2">
                <p className="text-[9px] tracking-widest text-slate-500 uppercase font-sans">ISSUE DATE / التاريخ</p>
                <div className="text-[10px] font-mono font-bold text-[#002147] bg-[#002147]/5 py-1.5 px-3 rounded-lg border border-[#002147]/10">
                  {new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <p className="text-[8px] text-slate-500">وثيقة إلكترونية رسمية</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
