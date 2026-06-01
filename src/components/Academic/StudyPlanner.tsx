import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';
import { 
  Calendar, 
  BookOpen, 
  Clock, 
  Sparkles, 
  Volume2,
  Flame,
  Award,
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
  Share2,
  MessageSquare,
  Palette,
  Gamepad2,
  Music,
  Film,
  Key,
  Users,
  Baby
} from 'lucide-react';
import { translations, Language } from '../../lib/translations';
import { ALL_READING_UNITS } from '../ReadingCurriculumCompanion';
import { ALL_GRAMMAR_UNITS } from '../GrammarCurriculumCompanion';
import { ALL_WRITING_UNITS } from '../WritingCurriculumCompanion';
import { ALL_CONVERSATION_UNITS } from '../ConversationCurriculumCompanion';
import { ALL_EXPRESSION_UNITS } from '../ExpressionCurriculumCompanion';
import { OXFORD_UNITS } from '../OxfordDiscoverCompanion';
import { OXFORD_LESSONS } from '../../data/oxfordLessonsData';
import { OLD_OXFORD_LESSONS } from '../OxfordUnitLesson';
import { STORIES } from '../StoryLibrary';
import { KIDS_STORIES } from '../../data/kidsStories';
import { ADULTS_DAILY_DOSES } from '../../data/adultsDailyDose';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { UserProfile, StudyPlan } from '../../types';
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
} from '../../data/interactiveCurriculum';

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
    subCourses: ['reading', 'grammar', 'writing', 'conversation', 'expression']
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
  { 
    id: 'interactive_learning', 
    labelEn: 'Interactive Play', 
    labelAr: 'التعليم التفاعلي ⚡', 
    descAr: 'الألعاب والقصص والحوارات والقاموس المصور وغرفة الهروب والبيتزا العائلية بذكاء',
    descEn: 'High-engagement games, karaoke, role-play challenges, and family rooms',
    icon: Gamepad2, 
    color: 'text-amber-600', 
    bg: 'bg-amber-50',
    subCourses: ['english_songs', 'animated_storyboard', 'escape_room', 'roleplay_challenges', 'visual_dictionary', 'family_activities', 'adults_daily_dose', 'kids_stories']
  },
  { 
    id: 'listening_stories', 
    labelEn: 'Auditory Stories', 
    labelAr: 'القصص المسموعة', 
    descAr: 'قصص تفاعلية مسموعة تعزز الفهم والاستماع',
    descEn: 'Interactive listening stories to improve auditory comprehension',
    icon: Volume2, 
    color: 'text-emerald-600', 
    bg: 'bg-emerald-50',
    subCourses: ['story-library']
  },
  { 
    id: 'daily_dose', 
    labelEn: 'Daily Dose', 
    labelAr: 'الجرعة اليومية', 
    descAr: 'دروس يومية ممتعة وسريعة للفهم البصري واللغوي',
    descEn: 'Bite-sized daily lessons for high-impact visual reinforcement',
    icon: Flame, 
    color: 'text-rose-600', 
    bg: 'bg-rose-50',
    subCourses: ['adults_daily_dose']
  },
  { 
    id: 'kids_stories', 
    labelEn: 'Educational Stories', 
    labelAr: 'قصص تعليمية', 
    descAr: 'قصص تعليمية تفاعلية وقصيرة للأطفال واليافعين',
    descEn: 'Interactive and educational narratives for younger learners',
    icon: Award, 
    color: 'text-cyan-600', 
    bg: 'bg-cyan-50',
    subCourses: ['kids_stories']
  },
  { 
    id: 'early_childhood', 
    labelEn: 'Early Childhood Academy', 
    labelAr: 'أكاديمية الطفولة المبكرة 👶', 
    descAr: 'المفردات الأولى، الأرقام، الألوان، الأشكال، تلوين تفاعلي ونطق البراعم لسن 2-6 سنوات',
    descEn: 'First words, numbers, colors, shapes, interactive coloring and baby pronunciation',
    icon: Baby, 
    color: 'text-pink-500', 
    bg: 'bg-pink-50',
    subCourses: ['early_childhood']
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
  isTest?: boolean;
  scheduledAt?: string;
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
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['advanced', 'oxford', 'interactive_learning', 'early_childhood']);
  const [difficultyLevel, setDifficultyLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [selectedDays, setSelectedDays] = useState<number[]>([0, 1, 2, 3, 4]); // Default Sun-Thu
  const [weeksToGenerate, setWeeksToGenerate] = useState<number>(13); // Default to 13 weeks (3 Months)
  const [lessonsPerDay, setLessonsPerDay] = useState<number>(2); // Default to 2 lessons per day
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [preferredTime, setPreferredTime] = useState('16:00');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<PlanItem[] | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [lessonResults, setLessonResults] = useState<any[]>([]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };
  const [coveredUnitIds, setCoveredUnitIds] = useState<Set<string>>(new Set());
  const [loadPreviousLoading, setLoadPreviousLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'create' | 'history'>('create');
  const [savedPlans, setSavedPlans] = useState<StudyPlan[]>([]);
  const [selectedSavedPlan, setSelectedSavedPlan] = useState<StudyPlan | null>(null);
  const [studentName, setStudentName] = useState('');
  const [bypassTestLock, setBypassTestLock] = useState(true);
  const [showAddLessonModal, setShowAddLessonModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const tableRef = React.useRef<HTMLDivElement>(null);

  const handleExportImage = async () => {
    if (!generatedPlan || generatedPlan.length === 0) return;
    setIsExporting(true);
    
    // We will export in chunks of 18 lessons per page to ensure 5-6 pages for a 90-day plan
    const ITEMS_PER_PAGE = 18;
    const totalPages = Math.ceil(generatedPlan.length / ITEMS_PER_PAGE);

    try {
      // Extended delay for initial paint stability
      await new Promise(resolve => setTimeout(resolve, 800));

      for (let page = 0; page < totalPages; page++) {
        const element = document.getElementById(`expert-export-page-${page}`);
        if (!element) continue;

        // Take a small pause between pages to prevent browser overload
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const dataUrl = await toPng(element, {
          quality: 1.0,
          pixelRatio: 2, // Standard high quality
          backgroundColor: '#ffffff',
          cacheBust: true,
          style: {
            transform: 'none',
            margin: '0',
            width: '1200px'
          }
        });
        
        const fileName = `Academy_Plan_${studentName.replace(/\s+/g, '_') || 'Student'}_Page_${page + 1}.png`;
        saveAs(dataUrl, fileName);
      }
    } catch (error) {
      console.error('Expert Export Error:', error);
      alert(isRtl ? 'حدث خطأ في النظام الخبير للتصدير - جرب تحديث الصفحة' : 'Expert System Error: Image export failed. Please refresh.');
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
      
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Record<string, any>;
        if (data) {
          const plan = { id: doc.id, ...data } as StudyPlan;
          plans.push(plan);
        }
      });
      
      setSavedPlans(plans.sort((a, b) => {
        const dateA = a.createdAt?.seconds || 0;
        const dateB = b.createdAt?.seconds || 0;
        return dateB - dateA;
      }));

      // Fetch lesson results and populate truly covered (completed) units
      const resultsQ = query(collection(db, 'lessonResults'), where('userId', '==', userProfile.uid));
      const resultsSnapshot = await getDocs(resultsQ);
      const results: any[] = [];
      const covered = new Set<string>();
      
      resultsSnapshot.forEach(doc => {
        const data = doc.data();
        results.push({ id: doc.id, ...data });
        
        let courseId = data.courseId;
        if (!courseId) {
          if (data.lessonId?.startsWith('r_')) courseId = 'reading';
          else if (data.lessonId?.startsWith('g_')) courseId = 'grammar';
          else if (data.lessonId?.startsWith('c_')) courseId = 'conversation';
          else if (data.lessonId?.startsWith('w_')) courseId = 'writing';
          else if (data.lessonId?.startsWith('e_')) courseId = 'expression';
          else if (!isNaN(Number(data.lessonId)) || data.lessonId?.startsWith('oxford')) courseId = 'oxford';
        }
        
        let level = data.level;
        if (!level) {
          if (courseId === 'oxford') {
            level = 'General';
          } else if (data.lessonId) {
            const parts = data.lessonId.split('_');
            if (parts.length > 1) {
              level = parts[1].toUpperCase();
            }
          }
        }
        if (!level) level = 'A1';

        const key = `${courseId}:${level}:${data.lessonId}`;
        covered.add(key);
      });
      
      setLessonResults(results);
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
    if (plan.lessonsPerDay) setLessonsPerDay(plan.lessonsPerDay);
    if ((plan as any).weeksToGenerate) {
      setWeeksToGenerate((plan as any).weeksToGenerate);
    } else if (plan.planItems && plan.planItems.length > 0) {
      const maxWeek = Math.max(...plan.planItems.map(item => item.week), 0);
      if (maxWeek > 8) setWeeksToGenerate(13);
      else if (maxWeek > 4) setWeeksToGenerate(8);
      else if (maxWeek > 0) setWeeksToGenerate(4);
    }
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

    const activeLevels: string[] = [];
    if (difficultyLevel === 'beginner') {
      activeLevels.push('A1');
    } else if (difficultyLevel === 'intermediate') {
      activeLevels.push('A2', 'B1');
    } else {
      activeLevels.push('B1', 'B2');
    }
    
    const earlyChildhoodLessons: { courseId: string; label: string; topic: string; unitId: string; level: string }[] = [];
    const advancedLessons: { courseId: string; label: string; topic: string; unitId: string; level: string }[] = [];
    const oxfordLessons: { courseId: string; label: string; topic: string; unitId: string; level: string }[] = [];
    const listeningStoryLessons: { courseId: string; label: string; topic: string; unitId: string; level: string }[] = [];
    const dailyDoseLessons: { courseId: string; label: string; topic: string; unitId: string; level: string }[] = [];
    const kidsStoryLessons: { courseId: string; label: string; topic: string; unitId: string; level: string }[] = [];
    
    // Generate Early Childhood Lessons
    if (selectedCategories.includes('early_childhood')) {
      const childhoodItems = [
        {
          courseId: 'early_childhood',
          label: isRtl ? 'الكلمات الأولى 👶' : 'First Words 👶',
          topic: isRtl ? 'الكلمات الأولى من حولنا بالصوت والصورة 👶' : 'Bilingual First Words & Audios 👶',
          unitId: 'first-words',
          level: 'Kid'
        },
        {
          courseId: 'early_childhood',
          label: isRtl ? 'الألوان الممتعة 🎨' : 'Fun Colors 🎨',
          topic: isRtl ? 'تعلم الألوان وتراكيبها بالنطق السليم 🎨' : 'Fun Colors Identification and Games 🎨',
          unitId: 'colors',
          level: 'Kid'
        },
        {
          courseId: 'early_childhood',
          label: isRtl ? 'الأرقام المبكرة 🔢' : 'Early Numbers 🔢',
          topic: isRtl ? 'عد الأرقام بالإنجليزية والتمارين التفاعلية 🔢' : 'Count numbers & complete fun questions 🔢',
          unitId: 'numbers',
          level: 'Kid'
        },
        {
          courseId: 'early_childhood',
          label: isRtl ? 'أصدقاء صوتيات الحروف 🔤' : 'Phonics Letters A-Z 🔤',
          topic: isRtl ? 'شخصيات وصوتيات الحروف والقصص الكرتونية الحية 🔤' : 'Phonics Letter friends, characters & drawing 🔤',
          unitId: 'letters',
          level: 'Kid'
        },
        {
          courseId: 'early_childhood',
          label: isRtl ? 'عالم الحيوانات 🦁' : 'Animal Kingdom 🦁',
          topic: isRtl ? 'أسماء وأصوات الحيوانات في المزرعة والغابة 🦁' : 'Animal names & phonetic calls 🦁',
          unitId: 'animals',
          level: 'Kid'
        },
        {
          courseId: 'early_childhood',
          label: isRtl ? 'الأشكال والأبعاد 📐' : 'Shapes & Dimensions 📐',
          topic: isRtl ? 'التعرف على المربع والدائرة والنجوم وتلوينها 📐' : 'Master concrete shapes: circle, square & stars 📐',
          unitId: 'shapes',
          level: 'Kid'
        },
        {
          courseId: 'early_childhood',
          label: isRtl ? 'معمل النطق للبراعم 🎙️' : 'Mascot Pronunciation 🎙️',
          topic: isRtl ? 'سجل صوتك مع تميمة الحظ الذكية لتصحيح النطق 🎙️' : 'Record & check word pronunciation with feedback 🎙️',
          unitId: 'pronunciation',
          level: 'Kid'
        },
        {
          courseId: 'early_childhood',
          label: isRtl ? 'المرسم الإبداعي 🖌️' : 'Creative Lab 🖌️',
          topic: isRtl ? 'تلوين ورسم وربط الصوت بالصورة 🖌️' : 'Digital drawing board and acoustic matching 🖌️',
          unitId: 'creative-lab',
          level: 'Kid'
        },
        {
          courseId: 'early_childhood',
          label: isRtl ? 'تحدي بطل الصوتيات 🏆' : 'Phonics Champ Challenge 🏆',
          topic: isRtl ? 'مراجعة وتطابق وحل ألغاز بطل الصوتيات التفاعلية 🏆' : 'Complete comprehensive review, sticker matching & win',
          unitId: 'phonics-review',
          level: 'Kid'
        }
      ];

      childhoodItems.forEach(item => {
        let isSuitable = false;
        if (difficultyLevel === 'beginner') {
          isSuitable = true;
        } else if (difficultyLevel === 'intermediate') {
          if (['letters', 'pronunciation', 'creative-lab', 'phonics-review', 'animals'].includes(item.unitId)) {
            isSuitable = true;
          }
        } else {
          if (['pronunciation', 'phonics-review'].includes(item.unitId)) {
            isSuitable = true;
          }
        }

        if (isSuitable) {
          earlyChildhoodLessons.push(item);
        }
      });
    }

    if (selectedCategories.includes('advanced')) {
      activeLevels.forEach(lvl => {
        // Reading
        if (ALL_READING_UNITS[lvl as any]) {
          ALL_READING_UNITS[lvl as any].forEach(u => {
            advancedLessons.push({ 
              courseId: 'reading', 
              label: isRtl ? 'القراءة المتطورة ' + lvl : 'Elite Reading ' + lvl, 
              topic: isRtl ? u.titleAr : u.titleEn,
              unitId: u.id,
              level: lvl
            });
          });
        }
        // Grammar
        if (ALL_GRAMMAR_UNITS[lvl as any]) {
          ALL_GRAMMAR_UNITS[lvl as any].forEach(u => {
            advancedLessons.push({ 
              courseId: 'grammar', 
              label: isRtl ? 'القواعد المتطورة ' + lvl : 'Advanced Grammar ' + lvl, 
              topic: isRtl ? u.titleAr : u.titleEn,
              unitId: u.id,
              level: lvl
            });
          });
        }
        // Writing
        if (ALL_WRITING_UNITS[lvl as any]) {
          ALL_WRITING_UNITS[lvl as any].forEach(u => {
           advancedLessons.push({ 
             courseId: 'writing', 
             label: isRtl ? 'الكتابة المتطورة ' + lvl : 'Advanced Writing ' + lvl, 
             topic: isRtl ? u.titleAr : u.titleEn,
             unitId: u.id,
             level: lvl
           });
          });
        }
        // Conversation
        if ((ALL_CONVERSATION_UNITS as any)[lvl]) {
          (ALL_CONVERSATION_UNITS as any)[lvl].forEach((u: any) => {
            advancedLessons.push({ 
              courseId: 'conversation', 
              label: isRtl ? 'المحادثة المتطورة ' + lvl : 'Advanced Conversation ' + lvl, 
              topic: isRtl ? u.titleAr : u.titleEn,
              unitId: u.id,
              level: lvl
            });
          });
        }
        // Expression
        if ((ALL_EXPRESSION_UNITS as any)[lvl]) {
          (ALL_EXPRESSION_UNITS as any)[lvl].forEach((u: any) => {
            advancedLessons.push({ 
              courseId: 'expression', 
              label: isRtl ? 'التعبير المطور ' + lvl : 'Enhanced Expression ' + lvl, 
              topic: isRtl ? u.titleAr : u.titleEn,
              unitId: u.id,
              level: lvl
            });
          });
        }
      });
    }
    
    if (selectedCategories.includes('oxford')) {
       OXFORD_UNITS.forEach((u, index) => {
         let isAppropriate = false;
         const lesson = OXFORD_LESSONS.find(l => l.id === u.id);
         if (lesson) {
           const cat = lesson.category;
           if (difficultyLevel === 'beginner' && (cat === 'phonics_heroes' || cat === 'oxford_reading_adventures')) {
             isAppropriate = true;
           } else if (difficultyLevel === 'intermediate' && (cat === 'clil_discover' || cat === 'values_stories')) {
             isAppropriate = true;
           } else if (difficultyLevel === 'advanced' && (cat === 'project_time' || cat === 'grammar_friends' || cat === 'everyday_english')) {
             isAppropriate = true;
           }
         }
         
         if (isAppropriate) {
           oxfordLessons.push({ 
             courseId: 'oxford', 
             label: isRtl ? 'أكسفورد المصور' : 'Oxford Discover', 
             topic: isRtl ? u.titleAr : u.titleEn,
             unitId: String(u.id),
             level: difficultyLevel === 'beginner' ? 'Basic' : difficultyLevel === 'intermediate' ? 'Junior' : 'Advanced'
           });
         }
       });
    }

    if (selectedCategories.includes('listening_stories')) {
      STORIES.forEach(s => {
        listeningStoryLessons.push({
          courseId: 'story-library',
          label: isRtl ? 'القصص المسموعة' : 'Auditory Story',
          topic: isRtl ? s.titleAr : s.titleEn,
          unitId: s.id,
          level: s.level
        });
      });
    }

    if (selectedCategories.includes('daily_dose')) {
      ADULTS_DAILY_DOSES.forEach(d => {
        dailyDoseLessons.push({
          courseId: 'adults_daily_dose',
          label: isRtl ? 'الجرعة اليومية' : 'Daily Dose',
          topic: isRtl ? d.title_ar : d.title_en,
          unitId: d.lesson_id,
          level: d.level
        });
      });
    }

    if (selectedCategories.includes('kids_stories')) {
      KIDS_STORIES.forEach(s => {
        kidsStoryLessons.push({
          courseId: 'kids_stories',
          label: isRtl ? 'قصص تعليمية' : 'Educational Story',
          topic: isRtl ? s.title_ar : s.title_en,
          unitId: s.lesson_id,
          level: s.level
        });
      });
    }

    const interactiveLessons: { courseId: string; label: string; topic: string; unitId: string; level: string }[] = [];

    if (selectedCategories.includes('interactive_learning')) {
      // 1. English Songs
      const songFilter = difficultyLevel === 'beginner' ? 'أطفال' : difficultyLevel === 'advanced' ? 'كبار' : null;
      const songs = ENGLISH_WITH_SONGS_DATA.filter(s => !songFilter || s.level === songFilter);
      songs.forEach(s => {
        interactiveLessons.push({
          courseId: 'english_songs',
          label: isRtl ? 'الأغاني التفاعلية 🎵' : 'Interactive Songs 🎵',
          topic: isRtl ? `أغنية ممتعة: ${s.title} (${s.level})` : `Song Karaoke: ${s.title} (${s.level === 'أطفال' ? 'Kids' : 'Adults'})`,
          unitId: s.id,
          level: s.level === 'أطفال' ? 'Kids' : 'Adults'
        });
      });

      // 2. Cartoon Series
      CARTOON_SERIES_DATA.forEach(c => {
        interactiveLessons.push({
          courseId: 'animated_storyboard',
          label: isRtl ? 'مشاهد لندن الكرتونية 🎬' : 'London Storyboards 🎬',
          topic: isRtl ? `حلقة كرتون: ${c.title_ar}` : `Episode: Noor's London Adventures`,
          unitId: c.id,
          level: 'Cartoon'
        });
      });

      // 3. Escape Room
      ESCAPE_ROOM_PUZZLES_DATA.forEach(p => {
        interactiveLessons.push({
          courseId: 'escape_room',
          label: isRtl ? 'غرفة هروب القواعد 🔐' : 'Grammar Escape Room 🔐',
          topic: isRtl ? `أحجية ذكية: ${p.title_ar}` : `Puzzle Solving Adventure`,
          unitId: p.id,
          level: 'Logic Play'
        });
      });

      // 4. Roleplay Challenges
      ROLE_PLAY_CHALLENGES_DATA.forEach(r => {
        interactiveLessons.push({
          courseId: 'roleplay_challenges',
          label: isRtl ? 'حوارات تمثيلية 🎭' : 'Roleplay Scenarios 🎭',
          topic: isRtl ? `تحدي تفاعلي: ${r.title_ar} (${r.category})` : `Roleplay challenge: ${r.category} conversation`,
          unitId: r.id,
          level: 'B1 Speaking'
        });
      });

      // 5. Visual Dictionary
      VISUAL_DICTIONARY_DATA.forEach(v => {
        interactiveLessons.push({
          courseId: 'visual_dictionary',
          label: isRtl ? 'القاموس المصور 🎨' : 'Visual Dictionary 🎨',
          topic: isRtl ? `مفردات بصرية: ${v.category_ar} (${v.words_count} كلمات)` : `Vocab Category: ${v.category_ar}`,
          unitId: v.id,
          level: 'A1 Basics'
        });
      });

      // 6. Family Games / Cooking
      FAMILY_GAMES_DATA.forEach(g => {
        interactiveLessons.push({
          courseId: 'family_activities',
          label: isRtl ? 'مسابقات العائلة 👨‍👩‍👧‍👦' : 'Family Play 👨‍👩‍👧‍👦',
          topic: isRtl ? `لعبة عائلية: ${g.title_ar}` : `Family Activity & Game`,
          unitId: g.id,
          level: 'Co-op Play'
        });
      });

      COOKING_CHALLENGES_DATA.forEach(cook => {
        interactiveLessons.push({
          courseId: 'family_activities',
          label: isRtl ? 'مطبخ العائلة بالإنجليزية 🍕' : 'Family Cooking 🍕',
          topic: isRtl ? `وصفة طبخ وتحدث: ${cook.title_en}` : `Cooking recipe vocab: ${cook.title_en}`,
          unitId: cook.id,
          level: 'Cook & Play'
        });
      });
    }

    // Interleave lessons from all enabled lists to create a perfect mix
    const allAvailableLessons: { courseId: string; label: string; topic: string; unitId: string; level: string }[] = [];
    const enabledLists = [
      earlyChildhoodLessons,
      advancedLessons,
      oxfordLessons,
      listeningStoryLessons,
      dailyDoseLessons,
      kidsStoryLessons,
      interactiveLessons
    ].filter(list => list.length > 0);

    if (enabledLists.length > 0) {
      const maxLen = Math.max(...enabledLists.map(list => list.length));
      for (let i = 0; i < maxLen; i++) {
        for (const list of enabledLists) {
          if (i < list.length) {
            allAvailableLessons.push(list[i]);
          }
        }
      }
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
    
    // Generates content according to selected weeksToGenerate state
    for (let w = 1; w <= weeksToGenerate; w++) {
      const monthNum = Math.ceil(w / 4);
      const weekInMonth = ((w - 1) % 4) + 1;
      
      let lastStudyDateThisWeek: Date | null = null;
      let studyDaysInThisWeek = 0;
      
      // Loop through 7 days of the week
      for (let i = 0; i < 7; i++) {
        const dayIdx = currentDate.getDay();
        
        if (selectedDays.includes(dayIdx)) {
          lastStudyDateThisWeek = new Date(currentDate);
          
          const scheduledAt = new Date(currentDate);
          const [h, m] = preferredTime.split(':').map(Number);
          scheduledAt.setHours(h, m, 0, 0);

          // Add up to lessonsPerDay lessons of the day
          for (let s = 1; s <= lessonsPerDay; s++) {
            if (lessonPtr < finalLessons.length) {
              const currentLesson = finalLessons[lessonPtr];
              const lessonScheduledAt = new Date(scheduledAt);
              if (s > 1) {
                lessonScheduledAt.setHours(lessonScheduledAt.getHours() + (s - 1)); // Offset consecutive lessons by 1 hour
              }

              mockPlan.push({
                id: `plan-w${w}-d${i}-s${s}`,
                month: monthNum,
                week: weekInMonth,
                day: isRtl ? daysAr[dayIdx] : daysEn[dayIdx],
                courseId: currentLesson.courseId,
                courseLabel: currentLesson.label,
                topic: currentLesson.topic,
                duration: '45 min',
                level: currentLesson.level,
                unitId: currentLesson.unitId,
                dateLabel: currentDate.toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'short' }),
                timeLabel: `${String(lessonScheduledAt.getHours()).padStart(2, '0')}:${String(lessonScheduledAt.getMinutes()).padStart(2, '0')}`,
                scheduledAt: lessonScheduledAt.toISOString()
              });
              lessonPtr++;
            }
          }
          
          studyDaysInThisWeek++;
        }
        
        currentDate.setDate(currentDate.getDate() + 1);
      }

      // Add bi-weekly test at the end of every 2nd week
      if (w % 2 === 0 && lastStudyDateThisWeek) {
        const testDate = new Date(lastStudyDateThisWeek);
        const testScheduledAt = new Date(testDate);
        const [h, m] = preferredTime.split(':').map(Number);
        testScheduledAt.setHours(h + lessonsPerDay, m, 0, 0); // Scheduled after the normal lessons

        mockPlan.push({
          id: `test-w${w}`,
          month: monthNum,
          week: weekInMonth,
          day: isRtl ? daysAr[testDate.getDay()] : daysEn[testDate.getDay()],
          courseId: 'test',
          courseLabel: isRtl ? 'اختبار' : 'Assessment',
          topic: isRtl ? `اختبار المراجعة الشامل (الأسبوع ${w-1}-${w})` : `Comprehensive Review Test (Week ${w-1}-${w})`,
          duration: '60 min',
          level: activeLevels[0] || 'A1',
          unitId: `test-${w}`,
          dateLabel: testDate.toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'short' }),
          timeLabel: `${String(testScheduledAt.getHours()).padStart(2, '0')}:${String(testScheduledAt.getMinutes()).padStart(2, '0')}`,
          scheduledAt: testScheduledAt.toISOString(),
          isTest: true
        });
      }
    }
    
    if (fallbackToStudied && coveredUnitIds.size > 0) {
      alert(isRtl 
        ? 'تم استكمال جميع الدروس المتاحة. تمت إعادة استخدام بعض الدروس لملء الخطة.' 
        : 'All available lessons have been completed. some lessons were reused to fill the plan.');
    }
    
    // Preserve manual lessons if they exist in the current view
    const manualLessons = (generatedPlan || []).filter(item => item.id.startsWith('manual-'));
    setGeneratedPlan([...mockPlan, ...manualLessons]);
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
        lessonsPerDay,
        weeksToGenerate,
        planItems: generatedPlan
      };

      if (selectedSavedPlan && selectedSavedPlan.id) {
        // Update existing
        await updateDoc(doc(db, 'studyPlans', selectedSavedPlan.id), {
          ...planData,
          parentIds: (userProfile as any).linkedParentIds || [],
          updatedAt: serverTimestamp()
        });
      } else {
        // Create new
        const newPlan = {
          ...planData,
          userId: userProfile.uid,
          parentIds: (userProfile as any).linkedParentIds || [],
          createdAt: serverTimestamp(),
        };
        await addDoc(collection(db, 'studyPlans'), newPlan);
      }
      
      setSaveSuccess(true);
      showToast(isRtl ? 'تم حفظ الخطة بنجاح في قاعدة البيانات' : 'Plan saved successfully to database');
      setTimeout(() => setSaveSuccess(false), 3000);
      fetchSavedPlans();
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
      nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + 1);
    }

    const newItem: PlanItem = {
      id: `manual-${Date.now()}`,
      month: lesson.month || (lastItem ? lastItem.month : 1),
      week: lesson.week || (lastItem ? lastItem.week : 1),
      day: lesson.day || (isRtl ? 'إضافي' : 'Extra'),
      courseId: lesson.courseId,
      courseLabel: lesson.label,
      topic: lesson.topic,
      duration: '45 min',
      level: lesson.level,
      unitId: lesson.unitId,
      dateLabel: lesson.dateLabel || nextDate.toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'short' }),
      timeLabel: lesson.timeLabel || preferredTime
    };

    // Improved insertion logic: insert after the day we clicked on
    if (addContext) {
      const dayItems = generatedPlan.filter(item => 
        item.day === addContext.day && 
        item.week === addContext.week && 
        item.month === addContext.month
      );
      
      if (dayItems.length > 0) {
        const lastIndex = generatedPlan.lastIndexOf(dayItems[dayItems.length - 1]);
        const newPlan = [...generatedPlan];
        newPlan.splice(lastIndex + 1, 0, newItem);
        setGeneratedPlan(newPlan);
      } else {
        setGeneratedPlan(prev => prev ? [...prev, newItem] : [newItem]);
      }
    } else {
      setGeneratedPlan(prev => prev ? [...prev, newItem] : [newItem]);
    }

    showToast(isRtl ? 'تم إضافة الدرس بنجاح للجدول' : 'Lesson added successfully to table');
    setAddContext(null);
    setShowAddLessonModal(false);
  };

  const [addContext, setAddContext] = useState<{ day: string; week: number; month: number; dateLabel?: string } | null>(null);

  const openAddContext = (day: string, week: number, month: number, dateLabel?: string) => {
    setAddContext({ day, week, month, dateLabel });
    setShowAddLessonModal(true);
  };

  const [modalSearch, setModalSearch] = useState('');
  const [modalCategory, setModalCategory] = useState<string>('all');
  const [modalLevel, setModalLevel] = useState<string>('all');

  const getAllAvailableLessons = () => {
    const lessons: any[] = [];
    
    // Flatten all units from all curriculums across all levels
    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;
    
    levels.forEach(lvl => {
      if (ALL_READING_UNITS[lvl]) {
        ALL_READING_UNITS[lvl].forEach(u => {
          lessons.push({ ...u, courseId: 'reading', label: isRtl ? 'القراءة' : 'Reading', topic: isRtl ? u.titleAr : u.titleEn, unitId: String(u.id), level: lvl });
        });
      }
      if (ALL_GRAMMAR_UNITS[lvl]) {
        ALL_GRAMMAR_UNITS[lvl].forEach(u => {
          lessons.push({ ...u, courseId: 'grammar', label: isRtl ? 'القواعد' : 'Grammar', topic: isRtl ? u.titleAr : u.titleEn, unitId: String(u.id), level: lvl });
        });
      }
      if (ALL_WRITING_UNITS[lvl]) {
        ALL_WRITING_UNITS[lvl].forEach(u => {
          lessons.push({ ...u, courseId: 'writing', label: isRtl ? 'الكتابة' : 'Writing', topic: isRtl ? u.titleAr : u.titleEn, unitId: String(u.id), level: lvl });
        });
      }
      if ((ALL_CONVERSATION_UNITS as any)[lvl]) {
        (ALL_CONVERSATION_UNITS as any)[lvl].forEach((u: any) => {
          lessons.push({ ...u, courseId: 'conversation', label: isRtl ? 'المحادثة' : 'Conversation', topic: isRtl ? u.titleAr : u.titleEn, unitId: String(u.id), level: lvl });
        });
      }
      if ((ALL_EXPRESSION_UNITS as any)[lvl]) {
        (ALL_EXPRESSION_UNITS as any)[lvl].forEach((u: any) => {
          lessons.push({ ...u, courseId: 'expression', label: isRtl ? 'التعبير' : 'Expression', topic: isRtl ? u.titleAr : u.titleEn, unitId: String(u.id), level: lvl });
        });
      }
    });

    OXFORD_UNITS.forEach(u => {
      lessons.push({ ...u, courseId: 'oxford', label: 'Oxford', topic: isRtl ? u.titleAr : u.titleEn, unitId: String(u.id), level: 'General' });
    });

    Object.keys(OLD_OXFORD_LESSONS).forEach(key => {
      const u = OLD_OXFORD_LESSONS[key];
      lessons.push({
        id: `old_${key}`,
        courseId: 'oxford',
        label: isRtl ? 'أوكسفورد الكلاسيكي' : 'Classic Oxford',
        topic: isRtl ? (u.bigQuestionAr || u.bigQuestion) : u.bigQuestion,
        unitId: `old_${key}`,
        level: 'General'
      });
    });

    // Filter out existing ones that are ALREADY in the generated plan
    // Using a composite key for robust checking
    const existingKeys = new Set(
      (generatedPlan || []).map(i => `${i.courseId}:${i.level}:${String(i.unitId)}`.toLowerCase())
    );
    
    return lessons.filter(l => {
      const key = `${l.courseId}:${l.level}:${String(l.unitId)}`.toLowerCase();
      if (existingKeys.has(key)) return false;
      
      const searchStr = modalSearch.toLowerCase();
      const matchesSearch = !modalSearch || 
                           l.topic.toLowerCase().includes(searchStr) || 
                           l.label.toLowerCase().includes(searchStr);
      
      const matchesCategory = modalCategory === 'all' || l.courseId === modalCategory;
      const matchesLevel = modalLevel === 'all' || l.level === modalLevel;
      
      return matchesSearch && matchesCategory && matchesLevel;
    });
  };

  const availableLessons = getAllAvailableLessons();

  const getLessonResult = (item: PlanItem) => {
    return lessonResults.find(r => r.lessonId === item.unitId);
  };

  const getAchievementData = () => {
    if (!generatedPlan) return null;
    const completed = generatedPlan.filter(item => getLessonResult(item));
    const total = generatedPlan.length;
    const avgScore = completed.length > 0 
      ? completed.reduce((acc, curr) => {
          const res = getLessonResult(curr);
          return acc + (res?.score || 0);
        }, 0) / completed.length
      : 0;
    
    return {
      completedCount: completed.length,
      totalCount: total,
      percentage: total > 0 ? (completed.length / total) * 100 : 0,
      averageScore: avgScore,
      completedLessons: completed
    };
  };

  const achievement = getAchievementData();

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
              // Don't clear current plan state so they don't lose their view
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

                <div className="space-y-4">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    {isRtl ? 'مستوى الصعوبة الدراسي (الخطة الذكية)' : 'Academic Difficulty Level (Smart AI)'}
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { value: 'beginner', labelAr: 'مبتدئ / براعم 👶', labelEn: 'Beginner / Kids', descAr: 'مناسب للأطفال والأساسيات والطفولة المبكرة', descEn: 'A1 Basics & Early Childhood' },
                      { value: 'intermediate', labelAr: 'متوسط / يافعين 🚀', labelEn: 'Intermediate / Junior', descAr: 'منهج أكسفورد واليافعين والمتقدم البسيط', descEn: 'A2/B1 Oxford Mid & Junior Play' },
                      { value: 'advanced', labelAr: 'متقدم / الكبار 🔥', labelEn: 'Advanced / Adults', descAr: 'القراءة والكتابة المتطورة والجرعة اليومية', descEn: 'B1/B2 Elite Reading & Adults' }
                    ].map((levelItem) => {
                      const isSelected = difficultyLevel === levelItem.value;
                      return (
                        <button
                          key={levelItem.value}
                          type="button"
                          onClick={() => setDifficultyLevel(levelItem.value as any)}
                          className={`flex flex-col items-center justify-center p-4 rounded-3xl border-2 transition-all cursor-pointer text-center ${
                            isSelected 
                              ? 'border-blue-600 bg-[#002147] text-white shadow-lg shadow-blue-100 scale-[1.02] font-black' 
                              : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                          }`}
                        >
                          <span className="text-xs font-black mb-1">
                            {isRtl ? levelItem.labelAr : levelItem.labelEn}
                          </span>
                          <span className={`text-[9px] font-bold text-center leading-relaxed ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                            {isRtl ? levelItem.descAr : levelItem.descEn}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                    {isRtl ? 'عدد الدروس في اليوم الواحد (العدد الأقصى 5)' : 'Lessons per Day (Max 5)'}
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((num) => {
                      const isSelected = lessonsPerDay === num;
                      return (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setLessonsPerDay(num)}
                          className={`flex-1 py-3 rounded-xl border-2 font-black text-sm transition-all ${
                            isSelected 
                              ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-100' 
                              : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'
                          }`}
                        >
                          {num}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                    {isRtl ? 'المدة الزمنية للخطة الدراسية' : 'Study Plan Duration'}
                  </label>
                  <div className="flex gap-3">
                    {[
                      { value: 4, labelAr: 'شهر واحد', labelEn: '1 Month' },
                      { value: 8, labelAr: 'شهرين', labelEn: '2 Months' },
                      { value: 13, labelAr: '3 أشهر', labelEn: '3 Months' }
                    ].map((opt) => {
                      const isSelected = weeksToGenerate === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setWeeksToGenerate(opt.value)}
                          className={`flex-1 py-3 px-1 rounded-xl border-2 font-black text-[11px] transition-all whitespace-nowrap ${
                            isSelected 
                              ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-100' 
                              : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'
                          }`}
                        >
                          {isRtl ? opt.labelAr : opt.labelEn}
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
                    {weeksToGenerate === 4 
                      ? (isRtl ? 'سيقوم الذكاء الاصطناعي بتوزيع الوحدات الدراسية بشكل متوازن خلال شهر واحد.' : 'AI will distribute units evenly throughout your 1-month term.')
                      : weeksToGenerate === 8
                      ? (isRtl ? 'سيقوم الذكاء الاصطناعي بتوزيع الوحدات الدراسية بشكل متوازن خلال شهرين.' : 'AI will distribute units evenly throughout your 2-month term.')
                      : (isRtl ? 'سيقوم الذكاء الاصطناعي بتوزيع الوحدات الدراسية بشكل متوازن خلال 3 أشهر.' : 'AI will distribute units evenly throughout your 3-month term.')
                    }
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
                    { label: isRtl ? 'الدروس المنجزة' : 'Completed', value: achievement?.completedCount, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: isRtl ? 'نسبة الإنجاز' : 'Completion %', value: `${Math.round(achievement?.percentage || 0)}%`, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { 
                      label: isRtl ? 'المدة' : 'Duration', 
                      value: weeksToGenerate === 4 
                        ? (isRtl ? 'شهر' : '1 Month') 
                        : weeksToGenerate === 8 
                        ? (isRtl ? 'شهرين' : '2 Months') 
                        : (isRtl ? '3 أشهر' : '3 Months'), 
                      color: 'text-rose-600', 
                      bg: 'bg-rose-50' 
                    },
                 ].map((stat, i) => (
                    <div key={i} className={`${stat.bg} ${stat.color} px-6 py-4 rounded-[2rem] flex-1 min-w-[150px] shadow-sm flex flex-col items-center justify-center border-b-4 border-current/20`}>
                       <span className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{stat.label}</span>
                       <span className="text-xl font-black">{stat.value}</span>
                    </div>
                 ))}
              </div>

              {/* Achievement Report Section */}
              {achievement && achievement.completedCount > 0 && (
                <div className="bg-gradient-to-br from-[#002147] to-blue-900 rounded-[3rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
                  
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                    <div className="flex-1 text-center md:text-right">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                        <Sparkles size={14} />
                        {isRtl ? 'تقرير إنجاز الطالب - خاص بولي الأمر' : 'Parent Achievement Report'}
                      </div>
                      <h3 className="text-3xl md:text-5xl font-serif font-black mb-4">
                        {isRtl ? `فخورون بتقدم ${studentName}!` : `Proud of ${studentName}'s Progress!`}
                      </h3>
                      <p className="text-blue-100/70 font-medium text-lg max-w-2xl leading-relaxed mb-8">
                        {isRtl 
                          ? `لقد أتم طفلك ${achievement.completedCount} درساً بنجاح من أصل ${achievement.totalCount}. معدل الدرجات في الاختبارات هو ${achievement.averageScore.toFixed(1)} من نقاط الدرس.`
                          : `Your child has successfully completed ${achievement.completedCount} out of ${achievement.totalCount} lessons. The average test score is ${achievement.averageScore.toFixed(1)} points.`}
                      </p>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="bg-white/5 border border-white/10 p-4 rounded-3xl backdrop-blur-sm">
                          <CheckCircle2 className="text-emerald-400 mb-2" size={24} />
                          <div className="text-2xl font-black">{achievement.completedCount}</div>
                          <div className="text-[10px] font-bold text-blue-200/50 uppercase">{isRtl ? 'درس مكتمل' : 'Lessons Done'}</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-4 rounded-3xl backdrop-blur-sm">
                          <BarChart2 className="text-amber-400 mb-2" size={24} />
                          <div className="text-2xl font-black">{Math.round(achievement.percentage)}%</div>
                          <div className="text-[10px] font-bold text-blue-200/50 uppercase">{isRtl ? 'نسبة الإنجاز' : 'Completion'}</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-4 rounded-3xl backdrop-blur-sm">
                          <Brain className="text-indigo-400 mb-2" size={24} />
                          <div className="text-2xl font-black">{achievement.averageScore.toFixed(1)}</div>
                          <div className="text-[10px] font-bold text-blue-200/50 uppercase">{isRtl ? 'متوسط الاختبار' : 'Avg Quiz Score'}</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-4 rounded-3xl backdrop-blur-sm">
                          <Palette className="text-rose-400 mb-2" size={24} />
                          <div className="text-2xl font-black">Elite</div>
                          <div className="text-[10px] font-bold text-blue-200/50 uppercase">{isRtl ? 'رتبة التعلم' : 'Learning Rank'}</div>
                        </div>
                      </div>

                      {/* Recent Completed Lessons List */}
                      <div className="mt-8 bg-white/5 rounded-[2rem] p-6 border border-white/10 text-right">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200/60 mb-4">{isRtl ? 'آخر الدروس المكتملة والمذاكرة' : 'Recent Lessons Studied'}</h4>
                        <div className="flex flex-wrap gap-2 justify-end">
                          {achievement.completedLessons.slice(-6).reverse().map(item => {
                            const res = getLessonResult(item);
                            return (
                              <div key={item.id} className="bg-white/10 px-4 py-2 rounded-xl text-[10px] font-black flex items-center gap-2 border border-white/5">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                <span className="opacity-80">{item.topic}</span>
                                <span className="text-blue-300 ml-1" dir="ltr">
                                  ({res?.total > 0 ? `${res.score}/${res.total}` : `${res?.score || 0}`})
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-48 h-48 md:w-64 md:h-64 relative flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90">
                        <circle
                          cx="50%"
                          cy="50%"
                          r="45%"
                          className="fill-none stroke-white/5 stroke-[8]"
                        />
                        <motion.circle
                          cx="50%"
                          cy="50%"
                          r="45%"
                          className="fill-none stroke-blue-500 stroke-[12] transition-all duration-1000 ease-out"
                          strokeDasharray="283"
                          strokeDashoffset={283 - (283 * achievement.percentage) / 100}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-4xl md:text-5xl font-black">{Math.round(achievement.percentage)}%</span>
                        <span className="text-[10px] font-bold text-blue-200/50 uppercase tracking-widest">{isRtl ? 'تم' : 'Done'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

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
                    {/* Test lock control switch */}
                    <button
                      onClick={() => setBypassTestLock(!bypassTestLock)}
                      className={`flex items-center gap-2 px-4 py-3.5 rounded-2xl text-xs font-black transition-all border ${
                        bypassTestLock
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-md flex items-center justify-center border-2 transition-all ${
                        bypassTestLock ? 'bg-amber-500 border-amber-500 text-white' : 'bg-transparent border-slate-300'
                      }`}>
                        {bypassTestLock && <span className="text-[10px] leading-none">✓</span>}
                      </div>
                      <span>
                        {isRtl ? 'إتاحة جميع الاختبارات للتجربة' : 'Bypass Test Locking (Demo/Control)'}
                      </span>
                    </button>
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
                
                <div ref={tableRef} className="overflow-x-auto min-h-[500px] bg-white p-4 md:p-8 rounded-[3rem] border border-slate-100">
                  {/* Expert Export Header */}
                  <div className="mb-10 p-12 bg-[#002147] rounded-[3rem] text-white relative overflow-hidden border-b-[8px] border-amber-400">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-6">
                           <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                             <Sparkles className="text-amber-400" size={32} />
                           </div>
                           <div>
                              <h2 className="text-2xl font-black tracking-tight text-white/90">
                                {isRtl ? 'أكاديمية باسم آل خليل الرقمية' : 'Basim Al Khalil Digital Academy'}
                              </h2>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                                <span className="text-[10px] font-black text-blue-200 uppercase tracking-widest">
                                  {isRtl ? 'نظام التعلم الذكي المعتمد' : 'Certified Smart Learning System'}
                                </span>
                              </div>
                           </div>
                        </div>
                        <div className="mt-8">
                          <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">
                            {isRtl ? 'خطة التفوق العلمي' : 'Academic Excellence Roadmap'}
                          </span>
                          <h1 className="text-5xl font-black text-white leading-tight">
                            {studentName || (isRtl ? 'اسم الطالب' : 'Student Name')}
                          </h1>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 bg-white/5 p-8 rounded-[2.5rem] border border-white/5 min-w-[320px]">
                        <div className="space-y-1">
                           <span className="text-[9px] font-black text-blue-300/60 uppercase">{isRtl ? 'إنجاز الدروس' : 'Curriculum Load'}</span>
                           <div className="text-2xl font-black">{generatedPlan?.length || 0} {isRtl ? 'وحدات' : 'Units'}</div>
                        </div>
                        <div className="space-y-1 border-r border-white/10 pr-6">
                           <span className="text-[9px] font-black text-blue-300/60 uppercase">{isRtl ? 'الجدول الزمني' : 'Timeline'}</span>
                           <div className="text-2xl font-black">90 {isRtl ? 'يوم' : 'Days'}</div>
                        </div>
                        <div className="space-y-1">
                           <span className="text-[9px] font-black text-blue-300/60 uppercase">{isRtl ? 'مستوى التركيز' : 'Focus Intensity'}</span>
                           <div className="text-2xl font-black text-emerald-400">Elite 100%</div>
                        </div>
                        <div className="space-y-1 border-r border-white/10 pr-6">
                           <span className="text-[9px] font-black text-blue-300/60 uppercase">{isRtl ? 'البرنامج' : 'Program'}</span>
                           <div className="text-2xl font-black text-amber-400">Pro-Active</div>
                        </div>
                      </div>
                    </div>
                  </div>

      <div className="px-2">
        <table className="w-full border-separate border-spacing-y-4">
          <thead>
            <tr className="text-[#002147]/40">
              <th className={`px-6 text-[11px] font-black uppercase tracking-[0.2em] pb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                {isRtl ? 'التصنيف والموعد' : 'Timeline & Schedule'}
              </th>
              <th className={`px-6 text-[11px] font-black uppercase tracking-[0.2em] pb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                {isRtl ? 'المواد والوحدات الدراسية' : 'Curriculum Subjects'}
              </th>
              <th className="px-6 pb-4"></th>
            </tr>
          </thead>
          <tbody>
            {(() => {
              // Group plan items by day
              const groupedItems: { [key: string]: PlanItem[] } = {};
              generatedPlan?.forEach(item => {
                const dayKey = `${item.month}-${item.week}-${item.day}-${item.dateLabel}`;
                if (!groupedItems[dayKey]) groupedItems[dayKey] = [];
                groupedItems[dayKey].push(item);
              });

              return Object.entries(groupedItems).map(([dayKey, items], idx) => {
                const firstItem = items[0];
                return (
                  <tr 
                    key={dayKey} 
                    className={`group transition-all ${idx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'} rounded-3xl`}
                  >
                    <td className="p-8 rounded-l-3xl border-y border-l border-slate-100 group-hover:border-blue-200 transition-colors align-top">
                      <div className="flex flex-col gap-2">
                         <div className="flex items-center gap-2">
                            <span className="bg-[#002147] text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase shadow-sm">
                              {isRtl ? 'أسبوع' : 'Week'} {firstItem.week}
                            </span>
                            {firstItem.dateLabel && (
                               <span className="text-[10px] font-black text-blue-600 border border-blue-100 bg-blue-50 px-2.5 py-0.5 rounded-lg">
                                  {firstItem.dateLabel}
                               </span>
                            )}
                         </div>
                         <div className="flex items-center gap-3 mt-1">
                            <span className="text-base font-black text-[#002147]">
                               {firstItem.day}
                            </span>
                            {firstItem.timeLabel && (
                               <div className="flex items-center gap-1.5 text-slate-400">
                                  <div className="w-1 h-1 rounded-full bg-slate-300" />
                                  <span className="text-xs font-black">{firstItem.timeLabel}</span>
                               </div>
                            )}
                         </div>
                      </div>
                    </td>
                    <td className="p-8 border-y border-slate-100 group-hover:border-blue-200 transition-colors">
                      <div className="flex flex-wrap gap-6">
                          {items.map((item) => {
                            const isTest = item.isTest;
                            const now = new Date();
                            const scheduledAt = item.scheduledAt ? new Date(item.scheduledAt) : null;
                            
                            // Test lock logic: open 20 minutes before schedule
                            const openTime = scheduledAt ? new Date(scheduledAt.getTime() - 20 * 60000) : null;
                            const isLocked = isTest && openTime && now < openTime && !bypassTestLock;
                            
                            const handleClick = () => {
                              if (isLocked) {
                                alert(isRtl 
                                  ? `${translations[lang].testOpensIn}`
                                  : `${translations[lang].testOpensIn}`);
                                return;
                              }
                              onNavigateToLesson(item.courseId, item.level, item.unitId);
                            };

                            return (
                              <div 
                                key={item.id}
                                onClick={handleClick}
                                className={`flex-1 min-w-[300px] flex items-center gap-6 p-4 rounded-2xl border transition-all group/item cursor-pointer ${
                                  isLocked 
                                    ? 'bg-slate-50 border-slate-200 opacity-60 grayscale cursor-not-allowed' 
                                    : 'border-transparent hover:border-blue-200 hover:bg-blue-50/30'
                                }`}
                              >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover/item:scale-110 ${
                                  isTest ? 'bg-indigo-700 text-white shadow-indigo-200' :
                                  item.courseId === 'reading' ? 'bg-emerald-600 text-white shadow-emerald-100' : 
                                  item.courseId === 'grammar' ? 'bg-blue-600 text-white shadow-blue-100' : 
                                  item.courseId === 'oxford' ? 'bg-amber-500 text-white shadow-amber-100' : 
                                  item.courseId === 'story-library' ? 'bg-emerald-600 text-white shadow-emerald-100' :
                                  item.courseId === 'adults_daily_dose' ? 'bg-rose-500 text-white shadow-rose-100' :
                                  item.courseId === 'kids_stories' ? 'bg-cyan-600 text-white shadow-cyan-100' :
                                  item.courseId === 'conversation' ? 'bg-indigo-500 text-white shadow-indigo-100' :
                                  item.courseId === 'writing' ? 'bg-rose-500 text-white shadow-rose-100' :
                                  item.courseId === 'english_songs' ? 'bg-blue-500 text-white shadow-blue-100' :
                                  item.courseId === 'animated_storyboard' ? 'bg-teal-500 text-white shadow-teal-100' :
                                  item.courseId === 'escape_room' ? 'bg-purple-500 text-white shadow-purple-100' :
                                  item.courseId === 'roleplay_challenges' ? 'bg-indigo-600 text-white shadow-indigo-100' :
                                  item.courseId === 'visual_dictionary' ? 'bg-rose-500 text-white shadow-rose-100' :
                                  item.courseId === 'family_activities' ? 'bg-emerald-500 text-white shadow-emerald-100' :
                                  item.courseId === 'early_childhood' ? 'bg-pink-500 text-white shadow-pink-100' :
                                  'bg-indigo-600 text-white shadow-indigo-100'
                                }`}>
                                  {isTest ? <CheckCircle2 size={24} /> :
                                   item.courseId === 'reading' ? <BookOpen size={24} /> : 
                                   item.courseId === 'oxford' ? <BookOpen size={24} /> : 
                                   item.courseId === 'story-library' ? <Volume2 size={24} /> :
                                   item.courseId === 'adults_daily_dose' ? <Flame size={24} /> :
                                   item.courseId === 'kids_stories' ? <Award size={24} /> :
                                   item.courseId === 'english_songs' ? <Music size={24} /> :
                                   item.courseId === 'animated_storyboard' ? <Film size={24} /> :
                                   item.courseId === 'escape_room' ? <Key size={24} /> :
                                   item.courseId === 'roleplay_challenges' ? <Users size={24} /> :
                                   item.courseId === 'visual_dictionary' ? <Palette size={24} /> :
                                   item.courseId === 'family_activities' ? <Sparkles size={24} /> :
                                   item.courseId === 'early_childhood' ? <Baby size={24} /> :
                                   <Sparkles size={24} />}
                                </div>
                                <div className="space-y-1 flex-1">
                                  <div className="flex items-center gap-2">
                                     <span className={`${isTest ? 'text-indigo-600 font-black' : 'text-slate-400'} text-[10px] uppercase tracking-widest`}>
                                       {isTest ? translations[lang].biWeeklyTest : item.courseLabel}
                                     </span>
                                     <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                     <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">{item.duration}</span>
                                     {!isTest && (
                                       <button 
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteLesson(item.id);
                                          }}
                                          className="ml-auto p-1.5 text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover/item:opacity-100"
                                        >
                                          <Trash2 size={14} />
                                        </button>
                                     )}
                                  </div>
                                  <p className={`text-lg font-black leading-tight transition-colors ${
                                    isLocked ? 'text-slate-400' : 'text-[#002147] group-hover/item:text-blue-600'
                                  }`}>
                                    {item.topic}
                                  </p>
                                  
                                  {isLocked && openTime && (
                                    <div className="flex items-center gap-2 mt-2">
                                      <Clock size={12} className="text-amber-500" />
                                      <span className="text-[10px] font-black text-amber-600">
                                        {translations[lang].testOpensAt} {openTime.toLocaleTimeString(isRtl ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
                                      </span>
                                    </div>
                                  )}

                                  {(() => {
                                    const result = getLessonResult(item);
                                    if (result) {
                                      return (
                                        <div className="flex items-center gap-2 mt-2">
                                          <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100 flex items-center gap-1 shadow-sm">
                                            <CheckCircle2 size={10} />
                                            {isRtl ? 'تم' : 'Done'}
                                          </span>
                                          <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100 shadow-sm" dir="ltr">
                                            {result.total > 0 ? `${result.score}/${result.total}` : `${result.score || 0}`}
                                          </span>
                                        </div>
                                      );
                                    }
                                    return null;
                                  })()}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </td>
                    <td className="p-8 rounded-r-3xl border-y border-r border-slate-100 group-hover:border-blue-200 transition-colors text-right relative align-top">
                       <div className="flex items-center justify-end gap-3 transform transition-all export-exclude">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              openAddContext(firstItem.day, firstItem.week, firstItem.month, firstItem.dateLabel);
                            }}
                            className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-sm border border-blue-100"
                            title={isRtl ? 'إضافة مادة لهذا اليوم' : 'Add subject to this day'}
                          >
                            <Plus size={20} />
                          </button>
                          <div className="w-10 h-10 bg-slate-50 text-slate-300 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-200 transition-all">
                             <ChevronRight size={20} className={isRtl ? 'rotate-180' : ''} />
                          </div>
                       </div>
                    </td>
                  </tr>
                );
              });
            })()}

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

      {/* Hidden Export Pages Container */}
      <div className="fixed top-[-9999px] left-[-9999px] pointer-events-none">
        {generatedPlan && Array.from({ length: Math.ceil(generatedPlan.length / 18) }).map((_, pageIdx) => {
          const ITEMS_PER_PAGE = 18;
          const start = pageIdx * ITEMS_PER_PAGE;
          const end = start + ITEMS_PER_PAGE;
          const chunk = generatedPlan.slice(start, end);
          
          return (
            <div 
              key={pageIdx}
              id={`expert-export-page-${pageIdx}`}
              className="bg-white p-12 overflow-hidden"
              style={{ width: '1200px' }}
            >
              {/* Expert Export Header */}
              <div className="mb-10 p-12 bg-[#002147] rounded-[3rem] text-white relative overflow-hidden border-b-[8px] border-amber-400">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                
                <div className="relative z-10 flex items-center justify-between gap-10">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                       <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                         <Sparkles className="text-amber-400" size={32} />
                       </div>
                       <div>
                          <h2 className="text-2xl font-black tracking-tight text-white/90">
                            {isRtl ? 'أكاديمية باسم آل خليل الرقمية' : 'Basim Al Khalil Digital Academy'}
                          </h2>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                            <span className="text-[10px] font-black text-blue-200 uppercase tracking-widest">
                              {isRtl ? 'نظام التعلم الذكي المعتمد' : 'Certified Smart Learning System'}
                            </span>
                          </div>
                       </div>
                    </div>
                    <div className="mt-8">
                      <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">
                        {isRtl ? 'خطة التفوق العلمي - صفحة ' : 'Academic Excellence Roadmap - Page '} {pageIdx + 1}
                      </span>
                      <h1 className="text-5xl font-black text-white leading-tight">
                        {studentName || (isRtl ? 'اسم الطالب' : 'Student Name')}
                      </h1>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 bg-white/5 p-8 rounded-[2.5rem] border border-white/5 min-w-[320px]">
                    <div className="space-y-1">
                       <span className="text-[9px] font-black text-blue-300/60 uppercase">{isRtl ? 'إنجاز الدروس' : 'Curriculum Load'}</span>
                       <div className="text-2xl font-black">{generatedPlan.length} {isRtl ? 'وحدات' : 'Units'}</div>
                    </div>
                    <div className="space-y-1 border-r border-white/10 pr-6">
                       <span className="text-[9px] font-black text-blue-300/60 uppercase">{isRtl ? 'الجدول الزمني' : 'Timeline'}</span>
                       <div className="text-2xl font-black">90 {isRtl ? 'يوم' : 'Days'}</div>
                    </div>
                    <div className="space-y-1">
                       <span className="text-[9px] font-black text-blue-300/60 uppercase">{isRtl ? 'مستوى التركيز' : 'Focus Intensity'}</span>
                       <div className="text-2xl font-black text-emerald-400">Elite 100%</div>
                    </div>
                    <div className="space-y-1 border-r border-white/10 pr-6">
                       <span className="text-[9px] font-black text-blue-300/60 uppercase">{isRtl ? 'البرنامج' : 'Program'}</span>
                       <div className="text-2xl font-black text-amber-400">Pro-Active</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-2">
                <table className="w-full border-separate border-spacing-y-4">
                  <thead>
                    <tr className="text-[#002147]/40">
                      <th className={`px-6 text-[11px] font-black uppercase tracking-[0.2em] pb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                        {isRtl ? 'التصنيف والموعد' : 'Timeline & Schedule'}
                      </th>
                      <th className={`px-6 text-[11px] font-black uppercase tracking-[0.2em] pb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                        {isRtl ? 'المواد والوحدات الدراسية' : 'Curriculum Subjects'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const groupedChunk: { [key: string]: PlanItem[] } = {};
                      chunk.forEach(item => {
                        const dayKey = `${item.month}-${item.week}-${item.day}-${item.dateLabel}`;
                        if (!groupedChunk[dayKey]) groupedChunk[dayKey] = [];
                        groupedChunk[dayKey].push(item);
                      });

                      return Object.entries(groupedChunk).map(([dayKey, items], idx) => {
                        const firstItem = items[0];
                        return (
                          <tr 
                            key={dayKey} 
                            className={`transition-all ${idx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'} rounded-3xl`}
                          >
                            <td className="p-8 rounded-l-3xl border-y border-l border-slate-100 align-top">
                              <div className="flex flex-col gap-2">
                                 <div className="flex items-center gap-2">
                                    <span className="bg-[#002147] text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase shadow-sm">
                                      {isRtl ? 'أسبوع' : 'Week'} {firstItem.week}
                                    </span>
                                    {firstItem.dateLabel && (
                                       <span className="text-[10px] font-black text-blue-600 border border-blue-100 bg-blue-50 px-2.5 py-0.5 rounded-lg">
                                          {firstItem.dateLabel}
                                       </span>
                                    )}
                                 </div>
                                 <div className="flex items-center gap-3 mt-1">
                                    <span className="text-base font-black text-[#002147]">
                                       {firstItem.day}
                                    </span>
                                    {firstItem.timeLabel && (
                                       <div className="flex items-center gap-1.5 text-slate-400">
                                          <div className="w-1 h-1 rounded-full bg-slate-300" />
                                          <span className="text-xs font-black">{firstItem.timeLabel}</span>
                                       </div>
                                    )}
                                 </div>
                              </div>
                            </td>
                            <td className="p-8 rounded-r-3xl border-y border-r border-slate-100">
                              <div className="flex flex-wrap gap-6">
                                {items.map((item) => (
                                  <div key={item.id} className="flex-1 min-w-[250px] flex items-center gap-6 p-4 rounded-2xl border border-slate-50 bg-white/50">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${
                                      item.courseId === 'reading' ? 'bg-emerald-600 text-white shadow-emerald-100' : 
                                      item.courseId === 'grammar' ? 'bg-blue-600 text-white shadow-blue-100' : 
                                      item.courseId === 'oxford' ? 'bg-amber-500 text-white shadow-amber-100' : 
                                      item.courseId === 'story-library' ? 'bg-emerald-600 text-white shadow-emerald-100' :
                                      item.courseId === 'adults_daily_dose' ? 'bg-rose-500 text-white shadow-rose-100' :
                                      item.courseId === 'kids_stories' ? 'bg-cyan-600 text-white shadow-cyan-100' :
                                      item.courseId === 'early_childhood' ? 'bg-pink-500 text-white shadow-pink-100' :
                                      item.courseId === 'conversation' ? 'bg-indigo-500 text-white shadow-indigo-100' :
                                      item.courseId === 'writing' ? 'bg-rose-500 text-white shadow-rose-100' :
                                      'bg-indigo-600 text-white shadow-indigo-100'
                                    }`}>
                                      {item.courseId === 'reading' ? <BookOpen size={24} /> : 
                                       item.courseId === 'oxford' ? <BookOpen size={24} /> : 
                                       item.courseId === 'story-library' ? <Volume2 size={24} /> :
                                       item.courseId === 'adults_daily_dose' ? <Flame size={24} /> :
                                       item.courseId === 'kids_stories' ? <Award size={24} /> :
                                       item.courseId === 'early_childhood' ? <Baby size={24} /> :
                                       <Sparkles size={24} />}
                                    </div>
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-3">
                                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.courseLabel}</span>
                                         <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                         <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">{item.duration}</span>
                                      </div>
                                      <p className="text-xl font-black text-[#002147] leading-tight">
                                        {item.topic}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </td>
                          </tr>
                        );
                      });
                    })()}
                  </tbody>
                </table>
              </div>
              
              {/* Footer Info for Expert Branding */}
              <div className="mt-12 flex items-center justify-between border-t border-slate-100 pt-8 opacity-40">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                       <Sparkles size={16} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#002147]">Al Khalil Academy AI Engine</span>
                 </div>
                 <span className="text-[9px] font-black text-slate-400">EXPERT ACADEMIC REPORT • 2026</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 rounded-3xl shadow-2xl flex items-center gap-3 border-2 ${
              toast.type === 'success' 
                ? 'bg-white border-emerald-100 text-emerald-600' 
                : 'bg-white border-rose-100 text-rose-600'
            }`}
          >
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
              toast.type === 'success' ? 'bg-emerald-50' : 'bg-rose-50'
            }`}>
              {toast.type === 'success' ? <CheckCircle2 size={24} /> : <Sparkles size={24} className="rotate-45" />}
            </div>
            <p className="font-black text-sm whitespace-nowrap">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
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
                <div>
                   <h3 className="text-xl font-black text-[#002147]">
                     {isRtl ? 'إضافة مادة أو درس' : 'Add Subject or Lesson'}
                   </h3>
                   {addContext && (
                     <p className="text-xs font-bold text-blue-600 mt-1">
                        {isRtl ? `إضافة إلى: ${addContext.day} - ${addContext.dateLabel}` : `Adding to: ${addContext.day} - ${addContext.dateLabel}`}
                     </p>
                   )}
                </div>
                <button onClick={() => setShowAddLessonModal(false)} className="text-slate-400 hover:text-rose-500">
                  <Plus className="rotate-45" size={24} />
                </button>
              </div>
              
              <div className="p-8 overflow-y-auto space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-3">
                    <input 
                      type="text"
                      placeholder={isRtl ? 'بحث عن درس...' : 'Search for a lesson...'}
                      value={modalSearch}
                      onChange={(e) => setModalSearch(e.target.value)}
                      className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-black outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    />
                    <select 
                      value={modalCategory}
                      onChange={(e) => setModalCategory(e.target.value)}
                      className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-black outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    >
                      <option value="all">{isRtl ? 'كل المواد' : 'All Subjects'}</option>
                      <option value="reading">{isRtl ? 'القراءة' : 'Reading'}</option>
                      <option value="grammar">{isRtl ? 'القواعد' : 'Grammar'}</option>
                      <option value="writing">{isRtl ? 'الكتابة' : 'Writing'}</option>
                      <option value="conversation">{isRtl ? 'المحادثة' : 'Conversation'}</option>
                      <option value="expression">{isRtl ? 'التعبير' : 'Expression'}</option>
                      <option value="oxford">Oxford</option>
                    </select>
                    <select 
                      value={modalLevel}
                      onChange={(e) => setModalLevel(e.target.value)}
                      className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-black outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    >
                      <option value="all">{isRtl ? 'كل المستويات' : 'All Levels'}</option>
                      <option value="A1">A1</option>
                      <option value="A2">A2</option>
                      <option value="B1">B1</option>
                      <option value="B2">B2</option>
                      <option value="C1">C1</option>
                      <option value="C2">C2</option>
                      <option value="General">General</option>
                    </select>
                  </div>

                  <label className="text-[10px] font-black text-slate-400 uppercase mb-3 block">
                    {isRtl ? `الدروس المتاحة (${availableLessons.length})` : `Available Lessons (${availableLessons.length})`}
                  </label>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {availableLessons.length > 0 ? (
                      availableLessons.slice(0, 50).map((lesson, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAddLesson({ ...lesson, ...addContext })}
                          className="w-full text-right flex items-center justify-between p-4 bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 rounded-2xl transition-all group"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${
                              lesson.courseId === 'reading' ? 'bg-emerald-600' : 
                              lesson.courseId === 'grammar' ? 'bg-blue-600' : 
                              lesson.courseId === 'writing' ? 'bg-indigo-600' : 
                              lesson.courseId === 'conversation' ? 'bg-rose-600' :
                              lesson.courseId === 'expression' ? 'bg-purple-600' :
                              'bg-amber-500'
                            }`}>
                              {lesson.courseId === 'reading' ? <BookOpen size={18} /> : 
                               lesson.courseId === 'conversation' ? <MessageSquare size={18} /> :
                               lesson.courseId === 'expression' ? <Palette size={18} /> :
                               <Sparkles size={18} />}
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{lesson.label}</span>
                                <span className="text-[9px] font-black text-slate-400 border border-slate-200 px-1 rounded uppercase">{lesson.level}</span>
                              </div>
                              <span className="text-sm font-black text-[#002147] group-hover:text-blue-600 transition-colors">{lesson.topic}</span>
                            </div>
                          </div>
                          <Plus size={16} className="text-blue-600 group-hover:scale-125 transition-transform" />
                        </button>
                      ))
                    ) : (
                      <div className="py-10 text-center">
                        <p className="text-xs font-black text-slate-300 uppercase">
                          {isRtl ? 'لا توجد دروس تطابق بحثك' : 'No lessons found matching your filters'}
                        </p>
                      </div>
                    )}
                    {availableLessons.length > 50 && (
                       <p className="text-[10px] text-center text-slate-400 font-bold">
                         {isRtl ? 'أظهرنا أول 50 نتيجة، جرب تقليل البحث' : 'Showing first 50 results, try filtering to find more'}
                       </p>
                    )}
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
