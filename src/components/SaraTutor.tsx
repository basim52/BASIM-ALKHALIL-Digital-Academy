import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  Flame, 
  BookOpen, 
  RotateCcw,
  Check,
  Award,
  Radio,
  Zap,
  Play,
  Pause,
  PenTool,
  Target,
  Trophy,
  Star,
  ChevronRight,
  HelpCircle,
  Compass,
  Timer,
  Clock,
  Bell,
  Plus,
  Camera,
  Palette,
  BookMarked,
  Sliders,
  X,
  Layers,
  Archive,
  History,
  Calendar,
  CalendarDays,
  Coffee,
  Eye,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile, AppView, SaraBoardData, SaraChatResponse, TutorMemoryDoc, proficiencyLevel, CurriculumCategory, StudyPlan } from '../types';
import { Language, translations } from '../lib/translations';
import { auth, db } from '../lib/firebase';
import { savePlacementLevel } from '../lib/placement';
import { doc, getDoc, setDoc, updateDoc, collection, addDoc, serverTimestamp, getDocs, query, orderBy, limit, increment, where } from 'firebase/firestore';
import { speakAcademyText, playDirectSaraAudio, cancelAllSpeech, playSchoolBellChime } from '../lib/audio';
import { getStudentStreak, recordStreakActivity, StreakData } from '../services/streakService';
import { SmartWhiteboard } from './SmartWhiteboard';
import { Sara3DCharacter } from './Sara3DCharacter';
import { MASTER_CURRICULUM } from '../data/masterCurriculum';
import { PhoneticAnalyzerModal } from './PhoneticAnalyzerModal';
import { RolePlayModal, RolePlayScenario, ROLE_PLAY_SCENARIOS } from './RolePlayModal';
import { SaraPersonalNotebookModal } from './SaraPersonalNotebookModal';
import { SaraCurriculumModal } from './SaraCurriculumModal';
import { StudyPlanner } from './Academic/StudyPlanner';
import { CurriculumLesson, getAllCurriculumLessons } from '../utils/academicCurriculumCatalogue';
import { buildSaraCurriculumExplanation } from '../utils/saraCurriculumExplainer';

interface MessageItem {
  id: string;
  role: 'user' | 'sara';
  text: string;
  board?: SaraBoardData;
  actions?: { type: 'open_section'; sectionId: string }[];
  timestamp: number;
}

export interface DiagnosticQuestion {
  id: string;
  levelTarget: proficiencyLevel;
  questionEn: string;
  questionAr: string;
  options: string[];
  correctIndex: number;
  explanationAr: string;
  explanationEn: string;
}

export const PLACEMENT_5_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'pq_1',
    levelTarget: proficiencyLevel.A1,
    questionEn: 'Sarah and I ______ excited to study English today.',
    questionAr: 'اختر الفعل المساعد المناسب للجملة (Sarah and I):',
    options: ['am', 'is', 'are', 'be'],
    correctIndex: 2,
    explanationAr: '"Sarah and I" تعني نحن (We)، ولذلك نستخدم صيغة الجمع "are".',
    explanationEn: '"Sarah and I" functions as "We", which takes the plural verb "are".'
  },
  {
    id: 'pq_2',
    levelTarget: proficiencyLevel.A2,
    questionEn: 'Yesterday, we ______ all the vocabulary words for the exam.',
    questionAr: 'اختر الفعل في صيغة الماضي البسيط المناسبة لكلمة Yesterday:',
    options: ['study', 'studies', 'studied', 'studying'],
    correctIndex: 2,
    explanationAr: 'كلمة Yesterday تدل على الماضي البسيط، لذا نستخدم التصريف الثاني "studied".',
    explanationEn: 'The time marker "Yesterday" indicates the past simple tense "studied".'
  },
  {
    id: 'pq_3',
    levelTarget: proficiencyLevel.B1,
    questionEn: 'Fahad has always been interested ______ learning modern programming.',
    questionAr: 'ما هو حرف الجر الصحيح الذي يقترن دائماً بكلمة "interested"؟',
    options: ['at', 'in', 'on', 'with'],
    correctIndex: 1,
    explanationAr: 'الصفة "interested" تتطلب حرف الجر "in" (مهتم بـ).',
    explanationEn: 'The adjective "interested" takes the preposition "in".'
  },
  {
    id: 'pq_4',
    levelTarget: proficiencyLevel.B2,
    questionEn: 'Although the lecture was complex, the professor gave a ______ explanation that made it easy to grasp.',
    questionAr: 'اختر الصفة الأنسب لوصف الشرح الواضح والدقيق:',
    options: ['vague', 'lucid', 'harsh', 'doubtful'],
    correctIndex: 1,
    explanationAr: 'كلمة "lucid" تعني واضح وشديد الجلاء والفهم، وتناسب سياق سهولة الاستيعاب.',
    explanationEn: '"lucid" means clearly expressed and easy to understand.'
  },
  {
    id: 'pq_5',
    levelTarget: proficiencyLevel.C1,
    questionEn: 'Hardly ______ the classroom when the exam started.',
    questionAr: 'اختر التركيب البلاغي السليم للقلب (Inversion) بعد Hardly:',
    options: ['had the students entered', 'the students entered', 'did the students entered', 'the students had entered'],
    correctIndex: 0,
    explanationAr: 'في أسلوب القلب الأكاديمي، بعد الظرف النافي "Hardly" يأتي الفعل المساعد قبل الفاعل: [Had + Subject + V3].',
    explanationEn: 'Negative adverbs like "Hardly" trigger subject-auxiliary inversion: [Had + subject + entered].'
  }
];

export interface SpellingItem {
  id: string;
  word: string;
  levelTarget: proficiencyLevel;
  meaningAr: string;
  meaningEn: string;
  hintMask: string;
  sentenceContext: string;
}

export const PLACEMENT_SPELLING_ITEMS: SpellingItem[] = [
  {
    id: 'sp_1',
    word: 'beautiful',
    levelTarget: proficiencyLevel.A1,
    meaningAr: 'جميل / رائع',
    meaningEn: 'Pleasing the senses or mind aesthetically',
    hintMask: 'b _ _ _ t _ _ _ l',
    sentenceContext: 'She painted a ______ picture of the sunrise.'
  },
  {
    id: 'sp_2',
    word: 'environment',
    levelTarget: proficiencyLevel.B1,
    meaningAr: 'البيئة المحيطة الطبيعية',
    meaningEn: 'The surroundings or conditions in which an organism lives',
    hintMask: 'e n _ _ _ _ n m _ _ t',
    sentenceContext: 'We must protect our natural ______ from pollution.'
  },
  {
    id: 'sp_3',
    word: 'necessary',
    levelTarget: proficiencyLevel.B2,
    meaningAr: 'ضروري / لا غنى عنه',
    meaningEn: 'Required to be done, achieved, or present; essential',
    hintMask: 'n _ c _ _ s _ _ y',
    sentenceContext: 'Daily speaking practice is ______ for achieving native fluency.'
  }
];

export interface PlacementState {
  isActive: boolean;
  stage: 'idle' | 'conversation' | 'quiz' | 'spelling' | 'result';
  conversationTurn: number; // 0: Question 1, 1: Question 2
  conversationAnswers: string[];
  conversationScore: number; // 0-30
  quizCurrentIndex: number; // 0-4
  quizAnswers: { selectedIndex: number; isCorrect: boolean }[];
  quizScore: number; // 0-50
  spellingCurrentIndex: number; // 0-2
  spellingAnswers: { input: string; isCorrect: boolean }[];
  spellingScore: number; // 0-20
  diagnosedLevel: proficiencyLevel | null;
  totalScore: number;
}

interface SaraTutorProps {
  lang: Language;
  profile: UserProfile;
  onNavigate: (view: AppView) => void;
  onBack: () => void;
  onProfileUpdated?: (updated: UserProfile) => void;
  onLangChange?: (newLang: Language) => void;
}

const SECTION_LABELS: Record<string, { ar: string; en: string }> = {
  'grammar-academy': { ar: 'أكاديمية القواعد والتراكيب 📐', en: 'Grammar Academy 📐' },
  'reading-lab': { ar: 'مختبر القراءة والفهم 📖', en: 'Reading Lab 📖' },
  'writing-spelling-studio': { ar: 'استوديو التعبير والإملاء ✍️', en: 'Writing & Spelling Studio ✍️' },
  'pronunciation-lab': { ar: 'معمل الصوتيات والمخارج 🎙️', en: 'Pronunciation Lab 🎙️' },
  'flashcards-hub': { ar: 'بطاقات المفردات 🗂️', en: 'Flashcards Hub 🗂️' },
  'story-library': { ar: 'مكتبة القصص الممتعة 📚', en: 'Story Library 📚' },
  'educational-games': { ar: 'واحة الألعاب والآداب 🎮', en: 'Games & Etiquette 🎮' },
  'roleplay-challenges': { ar: 'تحديات تقمص الأدوار 🎭', en: 'Role Play Challenges 🎭' },
  'visual-dictionary': { ar: 'القاموس البصري الناطق 🖼️', en: 'Visual Dictionary 🖼️' },
  'english-songs': { ar: 'أغاني وكاريوكي إنجليزي 🎵', en: 'English Songs 🎵' },
  'interactive-learning': { ar: 'بوابة الألعاب والأنشطة 🎪', en: 'Interactive Playroom 🎪' },
  'escape-room': { ar: 'غرف الهروب النحوية 🔐', en: 'Grammar Escape Room 🔐' },
  'live-translate': { ar: 'المترجم المباشر 🌐', en: 'Live Translate 🌐' },
  'early-childhood': { ar: 'قسم الصغار التأسيسي 👶', en: 'Early Childhood 👶' },
};

export const SaraTutor: React.FC<SaraTutorProps> = ({
  lang,
  profile,
  onNavigate,
  onBack,
  onProfileUpdated,
  onLangChange
}) => {
  const [activeLang, setActiveLang] = useState<Language>(lang);

  useEffect(() => {
    setActiveLang(lang);
  }, [lang]);

  const isRtl = activeLang === 'ar';
  const t = translations[activeLang];

  // State
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [activeBoard, setActiveBoard] = useState<SaraBoardData | null>(null);
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);
  const [currentWhiteboardPageIndex, setCurrentWhiteboardPageIndex] = useState<number>(0);
  
  const handleWhiteboardPageIndexChange = useCallback((idx: number) => {
    setCurrentWhiteboardPageIndex(idx);
  }, []);
  
  // 3D Sara Character Floating Presence
  const [isSara3DOpen, setIsSara3DOpen] = useState(true);
  const [lastSaraSpeech, setLastSaraSpeech] = useState<string>('');
  
  // Live Voice Mode state
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [speechLang, setSpeechLang] = useState<'en-US' | 'ar-SA'>(() => lang === 'ar' ? 'ar-SA' : 'en-US');
  const [liveStatus, setLiveStatus] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');

  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [quizScoreCount, setQuizScoreCount] = useState<number>(0);
  const [chatQuizTimeLeft, setChatQuizTimeLeft] = useState<number>(30);
  const [chatQuizTimeUp, setChatQuizTimeUp] = useState<boolean>(false);
  const [chatQuizStarted, setChatQuizStarted] = useState<boolean>(false);
  const [tutorMemory, setTutorMemory] = useState<TutorMemoryDoc>({
    notes: [],
    frequentMistakes: [],
    wordsLearned: [],
    dailyCount: 0
  });
  const [streak, setStreak] = useState<StreakData>({ current: 0, longest: 0, lastActiveDate: '', freezesLeft: 1 });
  const [sessionStartTime] = useState<number>(Date.now());
  const [sessionId] = useState<string>(() => `sara_sess_${Date.now()}`);

  // 🎯 Placement Test System State
  const [placementState, setPlacementState] = useState<PlacementState>({
    isActive: false,
    stage: 'idle',
    conversationTurn: 0,
    conversationAnswers: [],
    conversationScore: 0,
    quizCurrentIndex: 0,
    quizAnswers: [],
    quizScore: 0,
    spellingCurrentIndex: 0,
    spellingAnswers: [],
    spellingScore: 0,
    diagnosedLevel: null,
    totalScore: 0
  });
  const [spellingInputText, setSpellingInputText] = useState('');
  const [spellingFeedback, setSpellingFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [placementQuizSelected, setPlacementQuizSelected] = useState<number | null>(null);
  const [placementQuizFeedback, setPlacementQuizFeedback] = useState<'correct' | 'wrong' | null>(null);
  const placementQuizTimerRef = useRef<any>(null);
  const placementSpellingTimerRef = useRef<any>(null);

  // Chat Persistence & Unmount Lifecycle Refs
  const isMountedRef = useRef<boolean>(true);
  const [isSavedBadgeVisible, setIsSavedBadgeVisible] = useState<boolean>(false);
  const [isRestoredSession, setIsRestoredSession] = useState<boolean>(false);
  const [showNewChatConfirm, setShowNewChatConfirm] = useState<boolean>(false);
  const [showMobileToolsDrawer, setShowMobileToolsDrawer] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<'chat' | 'board' | 'sara3d'>('chat');
  const SARA_STORAGE_KEY = (uid?: string) => `sara_chat_history_${uid || 'guest'}`;

  // Session Archive States
  const [showArchiveConfirm, setShowArchiveConfirm] = useState<boolean>(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState<boolean>(false);
  const [archivedSessions, setArchivedSessions] = useState<any[]>([]);
  const [isLoadingArchive, setIsLoadingArchive] = useState<boolean>(false);
  const [viewingSession, setViewingSession] = useState<any | null>(null);

  // Lesson Timer State (5 min, 10 min, 15 min, or custom)
  const [timerDurationMinutes, setTimerDurationMinutes] = useState<number>(10);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(10 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [isTimerEnabled, setIsTimerEnabled] = useState<boolean>(true);
  const [isTimeUpModalOpen, setIsTimeUpModalOpen] = useState<boolean>(false);
  const [isSessionTimeUp, setIsSessionTimeUp] = useState<boolean>(false);
  const [showTimerDropdown, setShowTimerDropdown] = useState<boolean>(false);
  const timerDropdownRef = useRef<HTMLDivElement>(null);
  const hasTriggeredTimeUpRef = useRef<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const currentSpeechControlRef = useRef<{ stop: () => void } | null>(null);
  const hasInitializedWelcomeRef = useRef<boolean>(false);
  
  // Real-time synchronization refs to avoid state closures in event listeners
  const liveModeRef = useRef<boolean>(false);
  const isSpeakingRef = useRef<boolean>(false);
  const isThinkingRef = useRef<boolean>(false);
  const isListeningRef = useRef<boolean>(false);

  useEffect(() => {
    liveModeRef.current = isLiveMode;
  }, [isLiveMode]);

  useEffect(() => {
    isSpeakingRef.current = isSpeaking;
  }, [isSpeaking]);

  useEffect(() => {
    isThinkingRef.current = loading;
  }, [loading]);

  // Plan 1: Voice & Speech Intelligence States (Phonetics, Hesitation, Role-Play)
  const [isPhoneticModalOpen, setIsPhoneticModalOpen] = useState<boolean>(false);
  const [phoneticTargetSentence, setPhoneticTargetSentence] = useState<string>('');
  const [isRolePlayModalOpen, setIsRolePlayModalOpen] = useState<boolean>(false);
  const [isNotebookModalOpen, setIsNotebookModalOpen] = useState<boolean>(false);

  // Academy Curriculums Hub States (Link Sara to all academy curriculums)
  const [isCurriculumModalOpen, setIsCurriculumModalOpen] = useState<boolean>(false);
  const [activeCurriculumLesson, setActiveCurriculumLesson] = useState<CurriculumLesson | null>(null);

  // 🗓️ Smart Academic Study Plan States (Identical to Academy)
  const [isStudyPlanModalOpen, setIsStudyPlanModalOpen] = useState<boolean>(false);
  const [activeStudyPlan, setActiveStudyPlan] = useState<StudyPlan | null>(null);
  const [isLoadingStudyPlan, setIsLoadingStudyPlan] = useState<boolean>(false);
  const [isStudyPlanBannerDismissed, setIsStudyPlanBannerDismissed] = useState<boolean>(false);
  const [activeRolePlay, setActiveRolePlay] = useState<RolePlayScenario | null>(null);
  const [completedMissions, setCompletedMissions] = useState<number[]>([]);
  const [showHesitationEncouragement, setShowHesitationEncouragement] = useState<boolean>(false);
  const [hesitationHintText, setHesitationHintText] = useState<string>('');
  const [saraSpeechRate, setSaraSpeechRate] = useState<number>(1.0);
  const hesitationTimerRef = useRef<any>(null);

  // Lesson Completion & Result Tracking States
  const [isLessonCompletedModalOpen, setIsLessonCompletedModalOpen] = useState<boolean>(false);
  const [isSavingLessonResult, setIsSavingLessonResult] = useState<boolean>(false);
  const [lastSavedLessonResult, setLastSavedLessonResult] = useState<{
    lessonTitle: string;
    level: string;
    courseLabel: string;
    score: number;
    total: number;
    percentage: number;
    pointsEarned: number;
    durationMins: number;
    savedAt: string;
  } | null>(null);
  const [showSavedToast, setShowSavedToast] = useState<boolean>(false);
  const [archiveErrorToast, setArchiveErrorToast] = useState<string | null>(null);

  // 🗓️ Daily Multi-Lesson Queue & 2-Minute Rest Break System (نظام استراحة دقيقتين وترحيل الدروس المتتابعة)
  const [dailyLessonsTarget, setDailyLessonsTarget] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('sara_daily_lessons_target');
      if (saved) return Math.min(5, Math.max(1, parseInt(saved, 10)));
    } catch (_) {}
    return 3; // Default 3 lessons per day, supports 1, 2, or 3!
  });
  const [currentDailyLessonIndex, setCurrentDailyLessonIndex] = useState<number>(0);
  const [todayCompletedLessonIds, setTodayCompletedLessonIds] = useState<string[]>(() => {
    try {
      const now = new Date();
      const todayYmd = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      const saved = localStorage.getItem(`sara_today_completed_${todayYmd}`);
      return saved ? JSON.parse(saved) : [];
    } catch (_) {
      return [];
    }
  });

  // ☕ 2-Minute Break System (استراحة دقيقتين بين كل درس وترحيل الدرس)
  const [isDailyBreakActive, setIsDailyBreakActive] = useState<boolean>(false);
  const [breakSecondsLeft, setBreakSecondsLeft] = useState<number>(120); // 120s = 2 mins
  const [isBreakTimerRunning, setIsBreakTimerRunning] = useState<boolean>(true);
  const [nextLessonAfterBreak, setNextLessonAfterBreak] = useState<CurriculumLesson | null>(null);
  const [isAllDailyLessonsCompletedModalOpen, setIsAllDailyLessonsCompletedModalOpen] = useState<boolean>(false);

  // Clear silence hesitation timer
  const clearHesitationTimer = () => {
    if (hesitationTimerRef.current) {
      clearTimeout(hesitationTimerRef.current);
      hesitationTimerRef.current = null;
    }
    setShowHesitationEncouragement(false);
  };

  // Arm silence hesitation timer (triggers gentle reassurance after 7s of hesitation)
  const armHesitationDetection = () => {
    clearHesitationTimer();
    hesitationTimerRef.current = setTimeout(() => {
      if (isMountedRef.current && !isSpeakingRef.current && !isThinkingRef.current && !placementState.isActive) {
        setShowHesitationEncouragement(true);
        const hints = isRtl ? [
          'خذ وقتك يا بطل! أنا أسمعك بكل هدوء 🌟',
          'لا تقلق من التردد، المحاولة هي بداية الطلاقة والتميز! 💡',
          'هل تحب أن أعيد السؤال أو أقدم لك تلميحاً؟ 🌸'
        ] : [
          "Take your time! I'm right here with you 🌟",
          "Don't worry about mistakes, you're doing great! 💡",
          "Want me to repeat or give you a hint? 🌸"
        ];
        const hint = hints[Math.floor(Math.random() * hints.length)];
        setHesitationHintText(hint);

        setTimeout(() => {
          if (isMountedRef.current) setShowHesitationEncouragement(false);
        }, 6000);
      }
    }, 7000);
  };

  // Dedicated opener that ensures activeBoard is ready for teaching
  const openWhiteboardModal = () => {
    if (!activeBoard) {
      setActiveBoard({
        title: isRtl ? 'سبورة الشرح والتطبيق الذكية 📐' : 'Smart Interactive Whiteboard 📐',
        sentence: 'Welcome! I am Sara, your English teacher.',
        highlight: 'I am Sara',
        formula: 'Subject + Verb + Object',
        notes: [
          isRtl ? 'طريقة التعريف بالنفس: نقول "I am [اسمك]"' : 'Self-introduction: say "I am [Your Name]"',
          isRtl ? 'صيغة الترحيب الودية بالإنجليزية: "Welcome to our class!"' : 'Friendly greeting: "Welcome to our class!"'
        ],
        openWhiteboard: true
      });
    }
    setIsWhiteboardOpen(true);
  };

  // Language Switcher Handler for Sara (Arabic 🇸🇦 / English 🇬🇧)
  const handleToggleLanguage = (targetLang?: Language) => {
    const nextLang = targetLang || (activeLang === 'ar' ? 'en' : 'ar');
    if (nextLang === activeLang && targetLang) return;

    setActiveLang(nextLang);
    const nextSpeechLang = nextLang === 'ar' ? 'ar-SA' : 'en-US';
    setSpeechLang(nextSpeechLang);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.lang = nextSpeechLang;
      } catch (_) {}
    }

    if (onLangChange) {
      onLangChange(nextLang);
    }

    // Friendly spoken announcement and welcome from Sara in the chosen language
    if (voiceEnabled) {
      if (nextLang === 'en') {
        playSaraVoice("Awesome! I've switched to English immersion mode. Let's practice speaking and learning together! 🌸");
      } else {
        playSaraVoice("أهلاً بك! تم التبديل إلى اللغة العربية للشرح والتوضيح خطوة بخطوة 🌸");
      }
    }
  };

  // Select and explain an Academy Curriculum Lesson with Sara
  const handleSelectCurriculumLesson = (lesson: CurriculumLesson) => {
    setActiveCurriculumLesson(lesson);

    // 1. Build rich pedagogical explanation & board data
    const explanation = buildSaraCurriculumExplanation(lesson, activeLang);
    setActiveBoard(explanation.boardData);
    setCurrentWhiteboardPageIndex(0);
    setQuizSelectedOption(null);
    setQuizFeedback(null);
    setIsWhiteboardOpen(true);

    // 2. Add message to chat history
    const curriculumMsg: MessageItem = {
      id: `msg_sara_curriculum_${Date.now()}`,
      role: 'sara',
      text: explanation.chatMessage,
      board: explanation.boardData,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, curriculumMsg]);

    // 3. Play voice explanation from Sara out loud
    if (voiceEnabled) {
      playSaraVoice(explanation.spokenIntro);
    }

    // 4. Save progress note to tutorMemory if student is signed in
    if (profile.uid) {
      syncMemoryToFirestore({
        newNotes: [`درس الطالب منهج: ${lesson.titleAr} (${lesson.courseLabelAr})`],
        mistakes: [],
        wordsLearned: []
      }, false, lesson.titleAr);
    }
  };

  // 🗓️ Fetch active study plan for student (exact same studyPlans collection as Academy)
  const fetchActiveStudyPlan = useCallback(async () => {
    const targetUid = auth.currentUser?.uid || profile.uid;
    if (!targetUid) return;
    setIsLoadingStudyPlan(true);
    try {
      if (!targetUid.startsWith('sim_')) {
        const q = query(
          collection(db, 'studyPlans'),
          where('userId', '==', targetUid)
        );
        const snap = await getDocs(q);
        if (!snap.empty) {
          const plans = snap.docs.map(d => ({ id: d.id, ...d.data() } as StudyPlan));
          plans.sort((a: any, b: any) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
          setActiveStudyPlan(plans[0]);
          return;
        }
      }
      const local = localStorage.getItem(`sara_active_plan_${targetUid}`);
      if (local) {
        setActiveStudyPlan(JSON.parse(local));
      }
    } catch (err) {
      console.debug('Active study plan fetch note:', err);
    } finally {
      setIsLoadingStudyPlan(false);
    }
  }, [profile.uid]);

  useEffect(() => {
    fetchActiveStudyPlan();
  }, [fetchActiveStudyPlan]);

  // Compute today's scheduled lessons queue (supports 1, 2, or 3 lessons per day with automatic sequence!)
  const todayScheduledLessons = useMemo<CurriculumLesson[]>(() => {
    const all = getAllCurriculumLessons();
    const list: CurriculumLesson[] = [];

    // 1. If study plan has lessons for today
    if (activeStudyPlan?.planItems && activeStudyPlan.planItems.length > 0) {
      const now = new Date();
      const todayYmd = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      const todayMonthShort = now.toLocaleDateString('en-US', { month: 'short' });
      const todayDay = now.getDate();

      const matchedPlanItems = activeStudyPlan.planItems.filter((item: any) => {
        if (!item) return false;
        if (item.scheduledAt && item.scheduledAt.startsWith(todayYmd)) return true;
        if (item.dateLabel && typeof item.dateLabel === 'string') {
          if (item.dateLabel.includes(todayYmd)) return true;
          if (item.dateLabel.includes(String(todayDay)) && (item.dateLabel.includes(todayMonthShort) || item.dateLabel.includes('أكتوبر') || item.dateLabel.includes('Oct'))) return true;
        }
        return false;
      });

      matchedPlanItems.forEach((pi: any) => {
        const found = all.find(l => 
          l.id === pi.unitId || 
          (pi.courseId && l.courseId === pi.courseId && l.level === pi.level) ||
          (pi.topic && (l.titleAr?.includes(pi.topic) || l.titleEn?.includes(pi.topic)))
        );
        if (found && !list.some(x => x.id === found.id)) {
          list.push(found);
        } else if (pi.topic) {
          list.push({
            id: pi.id || pi.unitId || `plan_lesson_${list.length + 1}`,
            pillarId: pi.courseId || 'grammar',
            courseId: pi.courseId || 'general',
            courseLabelAr: pi.courseLabel || (isRtl ? 'المنهج الأكاديمي' : 'Academic Curriculum'),
            courseLabelEn: pi.courseLabel || 'Academic Curriculum',
            titleAr: pi.topic,
            titleEn: pi.topic,
            level: pi.level || 'A1',
            duration: pi.duration || '45 min'
          });
        }
      });
    }

    // 2. If an activeCurriculumLesson is active, sequence it first and append consecutive lessons
    if (activeCurriculumLesson) {
      if (!list.some(x => x.id === activeCurriculumLesson.id)) {
        list.unshift(activeCurriculumLesson);
      }
      const sameCourse = all.filter(l => l.courseId === activeCurriculumLesson.courseId || l.pillarId === activeCurriculumLesson.pillarId);
      const curIdx = sameCourse.findIndex(l => l.id === activeCurriculumLesson.id);
      let offset = 1;
      while (list.length < dailyLessonsTarget && curIdx !== -1 && curIdx + offset < sameCourse.length) {
        const nextInCourse = sameCourse[curIdx + offset];
        if (!list.some(x => x.id === nextInCourse.id)) {
          list.push(nextInCourse);
        }
        offset++;
      }
    }

    // 3. Fallback sequential lessons to ensure queue length matches dailyLessonsTarget
    let fallbackIdx = 0;
    while (list.length < dailyLessonsTarget && fallbackIdx < all.length) {
      const cand = all[fallbackIdx];
      if (!list.some(x => x.id === cand.id)) {
        list.push(cand);
      }
      fallbackIdx++;
    }

    return list.slice(0, dailyLessonsTarget);
  }, [activeStudyPlan, activeCurriculumLesson, dailyLessonsTarget, isRtl]);

  const todayScheduledLesson = todayScheduledLessons[currentDailyLessonIndex] || todayScheduledLessons[0] || null;

  // 📦 Migrate & Archive Completed Lesson Session (ترحيل الدرس الأول وحفظه بالأرشيف)
  const executeLessonArchival = async (
    lessonTitle: string,
    score: number,
    total: number,
    percentage: number,
    points: number
  ) => {
    const now = new Date();
    const targetUid = auth.currentUser?.uid || profile.uid;
    const todayYmd = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const formattedDate = now.toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const sessionData = {
      date: formattedDate,
      dateYmd: todayYmd,
      archivedAt: now.toISOString(),
      lessonTitle: lessonTitle,
      lessonName: lessonTitle,
      messagesCount: messages.length,
      snippet: `إنجاز وترحيل درس: ${lessonTitle} بنتيجة ${percentage}%`,
      messages: messages,
      activeBoard: activeBoard || null,
      score,
      total,
      percentage,
      pointsEarned: points,
      status: 'migrated_completed'
    };

    if (targetUid) {
      try {
        await addDoc(collection(db, 'users', targetUid, 'saraSessions'), {
          ...sessionData,
          createdAt: serverTimestamp()
        });
      } catch (err) {
        console.warn('Error saving archived session to Firestore:', err);
      }
    }

    try {
      const storageKey = `sara_archived_sessions_${targetUid || 'guest'}`;
      const existing: any[] = JSON.parse(localStorage.getItem(storageKey) || '[]');
      existing.unshift({
        id: `sess_migrated_${Date.now()}`,
        ...sessionData
      });
      localStorage.setItem(storageKey, JSON.stringify(existing.slice(0, 100)));
    } catch (e) {}

    // Reset current live messages and board to present the next lesson cleanly
    setMessages([]);
    setActiveBoard(null);
    if (targetUid && !targetUid.startsWith('sim_')) {
      try {
        await setDoc(doc(db, 'users', targetUid, 'saraChat', 'current'), {
          messages: [],
          activeBoard: null,
          updatedAt: serverTimestamp()
        });
      } catch (_) {}
    }
  };

  // 🚀 Finish 2-minute break and launch the next lesson!
  const handleFinishBreakAndStartNextLesson = useCallback(() => {
    setIsDailyBreakActive(false);
    setIsBreakTimerRunning(false);
    playSchoolBellChime();

    const nextIdx = currentDailyLessonIndex + 1;
    const targetLesson = nextLessonAfterBreak || todayScheduledLessons[nextIdx];

    if (targetLesson) {
      setCurrentDailyLessonIndex(nextIdx);
      setNextLessonAfterBreak(null);
      handleSelectCurriculumLesson(targetLesson);
    }
  }, [currentDailyLessonIndex, nextLessonAfterBreak, todayScheduledLessons]);

  // ⏱️ 2-Minute Break Countdown Timer Effect (120 seconds countdown)
  useEffect(() => {
    if (!isDailyBreakActive || !isBreakTimerRunning) return;

    const timer = setInterval(() => {
      setBreakSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishBreakAndStartNextLesson();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isDailyBreakActive, isBreakTimerRunning, handleFinishBreakAndStartNextLesson]);

  // Start lesson from study plan with Sara
  const handleStartPlanLesson = (planItemOrUnitId: any) => {
    const unitId = typeof planItemOrUnitId === 'string' ? planItemOrUnitId : planItemOrUnitId?.unitId;
    const allLessons = getAllCurriculumLessons();
    const lesson = allLessons.find(l => 
      l.id === unitId || 
      (planItemOrUnitId?.courseId && l.courseId === planItemOrUnitId.courseId && l.level === planItemOrUnitId.level) ||
      (l.titleAr && planItemOrUnitId?.topic && l.titleAr.includes(planItemOrUnitId.topic)) ||
      (l.titleEn && planItemOrUnitId?.topic && l.titleEn.includes(planItemOrUnitId.topic))
    );

    if (lesson) {
      handleSelectCurriculumLesson(lesson);
    } else if (planItemOrUnitId?.topic) {
      const syntheticLesson: CurriculumLesson = {
        id: planItemOrUnitId.id || `custom_${Date.now()}`,
        pillarId: planItemOrUnitId.courseId || 'grammar',
        courseId: planItemOrUnitId.courseId || 'general',
        courseLabelAr: planItemOrUnitId.courseLabel || 'المنهج الأكاديمي',
        courseLabelEn: planItemOrUnitId.courseLabel || 'Academic Curriculum',
        titleAr: planItemOrUnitId.topic,
        titleEn: planItemOrUnitId.topic,
        level: planItemOrUnitId.level || 'A1',
        duration: planItemOrUnitId.duration || '45 min'
      };
      handleSelectCurriculumLesson(syntheticLesson);
    }
    setIsStudyPlanModalOpen(false);
  };

  // Turn-by-turn microphone listening trigger
  const startListeningTurn = () => {
    if (!speechSupported || !recognitionRef.current) return;
    if (isSpeakingRef.current) {
      cancelAllSpeech();
      isSpeakingRef.current = false;
      setIsSpeaking(false);
    }

    try {
      recognitionRef.current.lang = speechLang;
      recognitionRef.current.start();
      setIsListening(true);
      isListeningRef.current = true;
      setLiveStatus('listening');
    } catch (err: any) {
      console.debug('Recognition session restart notice:', err.message);
    }
  };

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = speechLang;

      recognition.onstart = () => {
        setIsListening(true);
        isListeningRef.current = true;
        setLiveStatus('listening');
      };

      recognition.onresult = (event: any) => {
        // Prevent recording audio echo while Sara is speaking
        if (isSpeakingRef.current) return;

        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript && transcript.trim()) {
          const userWords = transcript.trim();
          setInputText(userWords);
          setIsListening(false);
          isListeningRef.current = false;

          // Auto-send immediately in Live Voice Mode
          if (liveModeRef.current) {
            setLiveStatus('thinking');
            handleSendMessage(userWords);
          }
        }
      };

      recognition.onerror = (err: any) => {
        console.warn('Speech recognition status:', err);
        setIsListening(false);
        isListeningRef.current = false;
        
        // If in live mode and user didn't intentionally abort, re-listen smoothly
        if (liveModeRef.current && err.error !== 'aborted' && !isSpeakingRef.current && !isThinkingRef.current) {
          setTimeout(() => {
            if (liveModeRef.current && !isSpeakingRef.current && !isThinkingRef.current) {
              startListeningTurn();
            }
          }, 800);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        isListeningRef.current = false;
      };

      recognitionRef.current = recognition;
    }
  }, [speechLang]);

  // Fetch streak & student tutor memory
  useEffect(() => {
    if (!profile.uid) return;

    // Load streak
    getStudentStreak(profile.uid).then(st => {
      if (st) setStreak(st);
    }).catch(err => console.warn('Could not load streak:', err));

    // Load tutor memory from Firestore
    const loadMemory = async () => {
      try {
        const memDoc = await getDoc(doc(db, 'tutorMemory', profile.uid));
        if (memDoc.exists()) {
          const data = memDoc.data() as TutorMemoryDoc;
          setTutorMemory(data);
        }
      } catch (err) {
        console.warn('Could not load tutorMemory doc:', err);
      }
    };
    loadMemory();
  }, [profile.uid]);

  // ==========================================
  // 💾 Chat Persistence & Welcome Handlers
  // ==========================================

  const fallbackWelcome = () => {
    if (!isMountedRef.current) return;
    const text = isRtl
      ? 'أهلاً بك! أنا سارة 🌸 جاهز نبدأ نتعلم إنجليزي اليوم؟'
      : 'Hello! I am Sara 🌸 Ready to learn English today?';
    
    const welcomeMsg: MessageItem = {
      id: `msg_sara_fallback_0`,
      role: 'sara',
      text: text,
      board: {
        title: isRtl ? 'سبورة الشرح الذكية 📐' : 'Smart Interactive Whiteboard 📐',
        sentence: 'Welcome! I am Sara, your English teacher.',
        highlight: 'I am Sara',
        openWhiteboard: false
      },
      actions: [
        { type: 'open_section', sectionId: 'grammar-academy' }
      ],
      timestamp: Date.now()
    };
    setMessages([welcomeMsg]);
    setActiveBoard(welcomeMsg.board || null);
    if (voiceEnabled && isMountedRef.current) {
      playSaraVoice(text);
    }
  };

  const initWelcome = async () => {
    if (!isMountedRef.current) return;
    setLoading(true);
    isThinkingRef.current = true;
    try {
      const snapshot = {
        name: profile.displayName,
        level: (profile as any).level || tutorMemory.level || 'A1',
        age: tutorMemory.age,
        interests: tutorMemory.interests || [],
        goal: tutorMemory.goal || 'General Fluency & School Success',
        lastMemoryNotes: tutorMemory.notes?.slice(-5) || [],
        frequentMistakes: tutorMemory.frequentMistakes || [],
        wordsLearned: tutorMemory.wordsLearned || []
      };

      const idToken = auth.currentUser ? await auth.currentUser.getIdToken() : '';
      const res = await fetch('/api/sara/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(idToken ? { 'Authorization': `Bearer ${idToken}` } : {})
        },
        body: JSON.stringify({
          message: `Hello Teacher Sara! My name is ${profile.displayName}. Start our session.`,
          snapshot: snapshot,
          history: [],
          preferredLang: activeLang
        })
      });

      if (!isMountedRef.current) return;

      if (res.ok) {
        const data: SaraChatResponse = await res.json();
        if (!isMountedRef.current) return;

        const conciseGreeting = data.reply || (isRtl ? 'أهلاً بك! أنا سارة 🌸' : 'Hello! I am Sara 🌸');
        const welcomeMsg: MessageItem = {
          id: `msg_sara_init`,
          role: 'sara',
          text: conciseGreeting,
          board: data.board,
          actions: data.actions,
          timestamp: Date.now()
        };
        setMessages([welcomeMsg]);
        if (data.board) {
          setActiveBoard(data.board);
          if (data.board.openWhiteboard) {
            setIsWhiteboardOpen(true);
          }
        }
        if (voiceEnabled && isMountedRef.current) {
          playSaraVoice(conciseGreeting);
        }
        if (data.memory) {
          syncMemoryToFirestore(data.memory, data.sessionDone, data.board?.title || 'Daily Session');
        }
      } else {
        fallbackWelcome();
      }
    } catch (e) {
      console.warn('Welcome call error:', e);
      if (isMountedRef.current) {
        fallbackWelcome();
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
        isThinkingRef.current = false;
      }
    }
  };

  // Restore chat on mount (LocalStorage first, then Firestore) or initialize fresh
  useEffect(() => {
    isMountedRef.current = true;

    const restoreConversation = async () => {
      let restored = false;
      const key = SARA_STORAGE_KEY(profile.uid);

      // 1. Check local storage first (instant, works offline if internet is disconnected!)
      try {
        const localRaw = localStorage.getItem(key);
        if (localRaw) {
          const parsed = JSON.parse(localRaw);
          if (parsed && Array.isArray(parsed.messages) && parsed.messages.length > 0) {
            setMessages(parsed.messages);
            if (parsed.activeBoard) setActiveBoard(parsed.activeBoard);
            if (parsed.placementState) setPlacementState(parsed.placementState);
            hasInitializedWelcomeRef.current = true;
            restored = true;
            setIsRestoredSession(true);
            setIsSavedBadgeVisible(true);
            setTimeout(() => {
              if (isMountedRef.current) setIsSavedBadgeVisible(false);
            }, 3000);
          }
        }
      } catch (err) {
        console.warn('Error reading chat from localStorage:', err);
      }

      // 2. If no local chat, check Firestore cloud backup
      if (!restored && profile.uid) {
        try {
          const chatDoc = await getDoc(doc(db, 'users', profile.uid, 'saraChat', 'current'));
          if (chatDoc.exists()) {
            const data = chatDoc.data();
            if (data && Array.isArray(data.messages) && data.messages.length > 0) {
              setMessages(data.messages);
              if (data.activeBoard) setActiveBoard(data.activeBoard);
              if (data.placementState) setPlacementState(data.placementState);
              hasInitializedWelcomeRef.current = true;
              restored = true;
              setIsRestoredSession(true);
              // Save to localStorage for offline readiness
              localStorage.setItem(key, JSON.stringify({
                messages: data.messages,
                activeBoard: data.activeBoard,
                placementState: data.placementState,
                savedAt: Date.now()
              }));
              setIsSavedBadgeVisible(true);
              setTimeout(() => {
                if (isMountedRef.current) setIsSavedBadgeVisible(false);
              }, 3000);
            }
          }
        } catch (dbErr) {
          console.warn('Error loading chat from Firestore:', dbErr);
        }
      }

      // 3. If no existing chat found anywhere, start fresh welcome session
      if (!restored && !hasInitializedWelcomeRef.current) {
        hasInitializedWelcomeRef.current = true;
        initWelcome();
      }
    };

    restoreConversation();

    // Cleanup: IMMEDIATELY silence all speech, stop recognition, mark unmounted
    return () => {
      isMountedRef.current = false;
      liveModeRef.current = false;
      cancelAllSpeech();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }
    };
  }, [profile.uid]);

  // Auto-save conversation to LocalStorage (instant offline resilience) and Firestore
  useEffect(() => {
    if (!messages || messages.length === 0) return;
    const key = SARA_STORAGE_KEY(profile.uid);

    const payload = {
      messages,
      activeBoard,
      placementState,
      savedAt: Date.now()
    };

    // 1. Instant LocalStorage save (protects against browser refresh, tab close, or lost wifi!)
    try {
      localStorage.setItem(key, JSON.stringify(payload));
      setIsSavedBadgeVisible(true);
      const timer = setTimeout(() => {
        if (isMountedRef.current) setIsSavedBadgeVisible(false);
      }, 2500);
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }

    // 2. Debounced cloud backup to Firestore
    if (profile.uid) {
      const syncTimer = setTimeout(async () => {
        if (!isMountedRef.current) return;
        try {
          await setDoc(doc(db, 'users', profile.uid, 'saraChat', 'current'), {
            messages,
            activeBoard: activeBoard || null,
            placementState: placementState || null,
            updatedAt: serverTimestamp()
          }, { merge: true });
        } catch (err) {
          console.debug('Firestore auto-save note (offline safe):', err);
        }
      }, 1500);

      return () => clearTimeout(syncTimer);
    }
  }, [messages, activeBoard, placementState, profile.uid]);

  // Confirm Archiving Current Session
  const handleConfirmArchiveSession = async () => {
    cancelAllSpeech();
    setShowArchiveConfirm(false);
    setShowNewChatConfirm(false);
    setIsLessonCompletedModalOpen(false);

    if (!messages || messages.length === 0) {
      return;
    }

    const now = new Date();
    const formattedDate = now.toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Find lesson name if present
    const detectedLessonTitle = 
      activeCurriculumLesson?.titleAr ||
      activeCurriculumLesson?.titleEn ||
      (activeCurriculumLesson as any)?.title || 
      lastSavedLessonResult?.lessonTitle || 
      activeRolePlay?.titleAr || 
      activeRolePlay?.titleEn || 
      (activeRolePlay as any)?.title || 
      (placementState?.stage && placementState.stage !== 'idle' ? (isRtl ? 'اختبار تحديد المستوى' : 'Placement Test') : null);

    // Extract brief snippet (نص مختصر)
    const userMsg = messages.find(m => m.role === 'user' && m.text?.trim());
    const firstSaraMsg = messages.find(m => m.role === 'sara' && m.text?.trim());
    const rawText = userMsg?.text || firstSaraMsg?.text || tutorMemory.lastSessionSummary || (isRtl ? 'جلسة تدريب مع سارة' : 'Sara Tutoring Session');
    const snippet = rawText.replace(/[*#_`]/g, '').trim().slice(0, 140);

    const sessionData = {
      date: formattedDate,
      dateYmd: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`,
      archivedAt: now.toISOString(),
      lessonTitle: detectedLessonTitle || null,
      lessonName: detectedLessonTitle || null,
      messagesCount: messages.length,
      snippet: snippet,
      messages: messages,
      activeBoard: activeBoard || null
    };

    // 1. Save to users/{userId}/saraSessions in Firestore
    const targetUid = auth.currentUser?.uid || profile.uid;
    let archiveSuccess = false;

    if (targetUid) {
      try {
        await addDoc(collection(db, 'users', targetUid, 'saraSessions'), {
          ...sessionData,
          createdAt: serverTimestamp()
        });
        archiveSuccess = true;
      } catch (err) {
        console.warn('Error archiving session in Firestore:', err);
        archiveSuccess = false;
      }
    } else {
      archiveSuccess = false;
    }

    // إذا فشل addDoc: لا تمسح saraChat ولا الدردشة على الشاشة، خل الدردشة كما هي وأظهر رسالة قصيرة: «ما انحفظت الجلسة، حاول مرة ثانية»
    if (!archiveSuccess) {
      setArchiveErrorToast('ما انحفظت الجلسة، حاول مرة ثانية');
      setTimeout(() => setArchiveErrorToast(null), 4000);
      return;
    }

    // 2. Local storage backup only after addDoc success
    try {
      const storageKey = `sara_archived_sessions_${targetUid || 'guest'}`;
      const existing: any[] = JSON.parse(localStorage.getItem(storageKey) || '[]');
      existing.unshift({
        id: `sess_${Date.now()}`,
        ...sessionData
      });
      localStorage.setItem(storageKey, JSON.stringify(existing.slice(0, 100)));
    } catch (e) {
      console.warn('LocalStorage archive error:', e);
    }

    // 3. Clear live chat & local storage ONLY AFTER addDoc SUCCESS (امسح الدردشة الحية)
    setMessages([]);
    setActiveBoard(null);
    setIsRestoredSession(false);
    localStorage.removeItem(SARA_STORAGE_KEY(profile.uid));

    if (targetUid && !targetUid.startsWith('sim_')) {
      try {
        await setDoc(doc(db, 'users', targetUid, 'saraChat', 'current'), {
          messages: [],
          activeBoard: null,
          updatedAt: serverTimestamp()
        });
      } catch (e) {
        console.debug('Error clearing live chat:', e);
      }
    }

    // Notice: Do NOT delete tutorMemory! (Keep tutorMemory intact)

    // 4. Start short greeting ("وابدأ تحية قصيرة")
    const shortGreeting = isRtl
      ? `مرحباً يا بطل! 🌟 تم أرشفة جلستك السابقة بنجاح. أنا سارة، جاهزة لجلسة تدريب جديدة معك!`
      : `Welcome back, champ! 🌟 Your previous session was archived safely. I'm Sara, ready for a fresh lesson!`;

    const welcomeMsg: MessageItem = {
      id: `msg_welcome_${Date.now()}`,
      role: 'sara',
      text: shortGreeting,
      timestamp: Date.now()
    };

    setMessages([welcomeMsg]);
    setShowSavedToast(true);
  };

  const handleCancelArchiveSession = () => {
    setShowArchiveConfirm(false);
    // إذا قال لا: خل الدردشة كما هي (leave chat as is)
  };

  const fetchArchivedSessions = async () => {
    setIsLoadingArchive(true);
    try {
      const list: any[] = [];
      const targetUid = auth.currentUser?.uid || profile.uid;
      if (targetUid && !targetUid.startsWith('sim_')) {
        try {
          const q = query(
            collection(db, 'users', targetUid, 'saraSessions'),
            orderBy('createdAt', 'desc'),
            limit(100)
          );
          const snap = await getDocs(q);
          snap.forEach(docSnap => {
            list.push({ id: docSnap.id, ...docSnap.data() });
          });
        } catch {
          // Fallback query without orderBy if index is building or composite
          const snap = await getDocs(collection(db, 'users', targetUid, 'saraSessions'));
          snap.forEach(docSnap => {
            list.push({ id: docSnap.id, ...docSnap.data() });
          });
          list.sort((a, b) => new Date(b.archivedAt || 0).getTime() - new Date(a.archivedAt || 0).getTime());
        }
      }

      // Merge with localStorage backup for offline/simulated students
      try {
        const storageKey = `sara_archived_sessions_${targetUid || 'guest'}`;
        const localList: any[] = JSON.parse(localStorage.getItem(storageKey) || '[]');
        localList.forEach(localItem => {
          if (!list.some(item => item.id === localItem.id || (item.archivedAt && item.archivedAt === localItem.archivedAt))) {
            list.push(localItem);
          }
        });
        list.sort((a, b) => new Date(b.archivedAt || 0).getTime() - new Date(a.archivedAt || 0).getTime());
      } catch (e) {}

      setArchivedSessions(list);
    } catch (err) {
      console.warn('Error fetching archived sessions:', err);
    } finally {
      setIsLoadingArchive(false);
    }
  };

  const handleRestoreSessionToLive = (session: any) => {
    if (!session || !session.messages) return;
    cancelAllSpeech();
    setMessages(session.messages);
    if (session.activeBoard) {
      setActiveBoard(session.activeBoard);
    }
    setIsRestoredSession(true);

    // Sync to Firestore saraChat/current
    const targetUid = auth.currentUser?.uid || profile.uid;
    if (targetUid && !targetUid.startsWith('sim_')) {
      setDoc(doc(db, 'users', targetUid, 'saraChat', 'current'), {
        messages: session.messages,
        activeBoard: session.activeBoard || null,
        updatedAt: serverTimestamp()
      }, { merge: true }).catch(console.warn);
    }

    // Sync to local storage
    try {
      localStorage.setItem(SARA_STORAGE_KEY(profile.uid), JSON.stringify({
        messages: session.messages,
        activeBoard: session.activeBoard || null,
        timestamp: Date.now()
      }));
    } catch (e) {}

    setIsArchiveModalOpen(false);
    setViewingSession(null);
    setShowSavedToast(true);
  };

  // Start a fresh new chat session with archive
  const handleStartNewSession = async () => {
    handleConfirmArchiveSession();
  };

  // Start Role-Play Scenario
  const handleStartRolePlayScenario = (scenario: RolePlayScenario) => {
    setActiveRolePlay(scenario);
    setCompletedMissions([]);
    setIsRolePlayModalOpen(false);

    const introText = isRtl
      ? `🎭 تم تفعيل سيناريو: [${scenario.titleAr}]. سارة بدور (${scenario.roleSaraAr}) وأنت بدور (${scenario.roleStudentAr}).\n\n"${scenario.openingLine}"`
      : `🎭 Active Scenario: [${scenario.titleEn}]. Sara as (${scenario.roleSaraEn}) and You as (${scenario.roleStudentEn}).\n\n"${scenario.openingLine}"`;

    const introMsg: MessageItem = {
      id: `msg_rp_init_${Date.now()}`,
      role: 'sara',
      text: introText,
      board: {
        title: `${scenario.badge} ${isRtl ? scenario.titleAr : scenario.titleEn}`,
        sentence: scenario.openingLine,
        highlight: scenario.openingLine.slice(0, 20),
        notes: [
          isRtl ? `المكان: ${scenario.location}` : `Location: ${scenario.location}`,
          isRtl ? `المهمة 1: ${scenario.missionsAr[0]}` : `Mission 1: ${scenario.missionsEn[0]}`
        ],
        openWhiteboard: false
      },
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, introMsg]);
    setActiveBoard(introMsg.board || null);

    if (voiceEnabled) {
      playSaraVoice(scenario.openingLine);
    }
  };

  // Exit Role-Play Scenario
  const handleEndRolePlay = () => {
    const summaryMsg: MessageItem = {
      id: `msg_rp_end_${Date.now()}`,
      role: 'sara',
      text: isRtl 
        ? `🎉 أبدعت يا بطل في محاكاة موقف [${activeRolePlay?.titleAr}]! أتقنت الحديث بثقة واكتسبت تعابير واقعية مهمة. جاهزة لأي محادثة أو تمرين جديد! 🌟`
        : `🎉 Wonderful performance in [${activeRolePlay?.titleEn}]! You spoke with great confidence. Ready for our next lesson! 🌟`,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, summaryMsg]);
    setActiveRolePlay(null);
    setCompletedMissions([]);
  };

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Voice playback with Sara's female tone ('Kore')
  const playSaraVoice = async (text: string, onEndCallback?: () => void, customDisplayText?: string) => {
    if (!isMountedRef.current) return;
    cancelAllSpeech();
    setIsSpeaking(true);
    isSpeakingRef.current = true;
    setLiveStatus('speaking');
    setLastSaraSpeech(customDisplayText !== undefined ? customDisplayText : text);

    // Auto-detect whether utterance is primarily Arabic or English
    const hasArabic = /[\u0600-\u06FF]/.test(text);
    const audioLang: 'ar' | 'en' = hasArabic ? 'ar' : 'en';

    try {
      const player = await speakAcademyText(
        text,
        audioLang,
        () => {
          if (!isMountedRef.current) {
            cancelAllSpeech();
            return;
          }
          setIsSpeaking(true);
          isSpeakingRef.current = true;
          setLiveStatus('speaking');
        },
        () => {
          if (!isMountedRef.current) return;
          setIsSpeaking(false);
          isSpeakingRef.current = false;
          if (!liveModeRef.current) {
            setLiveStatus('idle');
          }
          // Arm hesitation detection after Sara finishes speaking
          if (liveModeRef.current || activeRolePlay) {
            armHesitationDetection();
          }
          onEndCallback?.();
        },
        'Kore', // Female voice explicitly!
        saraSpeechRate
      );

      if (!isMountedRef.current) {
        cancelAllSpeech();
        player.stop();
        return;
      }
      currentSpeechControlRef.current = player;
    } catch (err) {
      console.warn('Sara voice error:', err);
      if (isMountedRef.current) {
        setIsSpeaking(false);
        isSpeakingRef.current = false;
        onEndCallback?.();
      }
    }
  };

  // Ultra-fast zero-latency direct playback when studio audio was co-generated by server
  const playSaraDirectSpeech = async (base64Audio: string, text: string, onEndCallback?: () => void) => {
    if (!isMountedRef.current) return;
    cancelAllSpeech();
    setIsSpeaking(true);
    isSpeakingRef.current = true;
    setLiveStatus('speaking');
    setLastSaraSpeech(text);

    try {
      const player = await playDirectSaraAudio(
        base64Audio,
        () => {
          if (!isMountedRef.current) {
            cancelAllSpeech();
            return;
          }
          setIsSpeaking(true);
          isSpeakingRef.current = true;
          setLiveStatus('speaking');
        },
        () => {
          if (!isMountedRef.current) return;
          setIsSpeaking(false);
          isSpeakingRef.current = false;
          if (!liveModeRef.current) {
            setLiveStatus('idle');
          }
          if (liveModeRef.current || activeRolePlay) {
            armHesitationDetection();
          }
          onEndCallback?.();
        },
        saraSpeechRate
      );

      if (!isMountedRef.current) {
        cancelAllSpeech();
        player.stop();
        return;
      }
      currentSpeechControlRef.current = player;
    } catch (err) {
      console.warn('Direct Sara speech error, falling back to standard TTS:', err);
      playSaraVoice(text, onEndCallback);
    }
  };

  // Lesson Timer Countdown Effect
  useEffect(() => {
    if (!isTimerEnabled || !isTimerRunning || timerDurationMinutes === 0 || timerSecondsLeft <= 0) return;

    const timerInterval = setInterval(() => {
      setTimerSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          if (!hasTriggeredTimeUpRef.current) {
            hasTriggeredTimeUpRef.current = true;
            handleSessionTimeUp();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [isTimerEnabled, isTimerRunning, timerDurationMinutes, timerSecondsLeft]);

  // Floating 30s Countdown Timer for Active Whiteboard / Chat Quiz
  useEffect(() => {
    if (!activeBoard?.quiz || quizSelectedOption !== null) return;
    setChatQuizTimeLeft(30);
    setChatQuizTimeUp(false);
    setChatQuizStarted(false);
  }, [activeBoard?.quiz, quizSelectedOption]);

  useEffect(() => {
    if (!activeBoard?.quiz || quizSelectedOption !== null || !chatQuizStarted) return;

    const quizTimer = setInterval(() => {
      setChatQuizTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(quizTimer);
          setChatQuizTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(quizTimer);
  }, [activeBoard?.quiz, quizSelectedOption, chatQuizStarted]);

  // Click outside to close timer dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (timerDropdownRef.current && !timerDropdownRef.current.contains(e.target as Node)) {
        setShowTimerDropdown(false);
      }
    };
    if (showTimerDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showTimerDropdown]);

  // ==========================================
  // 🎓 Complete & Save Lesson Engine (تسجيل النتيجة وحفظها ونطق انتهى الدرس)
  // ==========================================
  const handleCompleteAndSaveLesson = async (customScore?: number, customTotal?: number) => {
    if (isSavingLessonResult) return;
    setIsSavingLessonResult(true);

    try {
      // 1. Determine lesson metadata
      const lessonTitle = activeCurriculumLesson
        ? (isRtl ? activeCurriculumLesson.titleAr : activeCurriculumLesson.titleEn)
        : (activeBoard?.title || (isRtl ? 'حصة محادثة وتطبيق مع سارة' : 'Interactive Lesson with Sara'));

      const level = activeCurriculumLesson?.level || (profile as any).level || 'A1';
      const courseId = activeCurriculumLesson?.pillarId || 'sara_tutor';
      const courseLabel = activeCurriculumLesson
        ? (isRtl ? activeCurriculumLesson.courseLabelAr : activeCurriculumLesson.courseLabelEn)
        : (isRtl ? 'أكاديمية اللغة الإنجليزية' : 'English Academy');
      const lessonId = activeCurriculumLesson?.id || `sara_lesson_${Date.now()}`;

      // 2. Score calculation
      const totalQuestions = customTotal ?? (activeBoard?.quiz ? 1 : Math.max(1, Math.min(5, Math.floor(messages.length / 3))));
      const correctAnswers = customScore ?? Math.max(1, quizScoreCount || 1);
      const boundedScore = Math.min(correctAnswers, totalQuestions);
      const percentage = Math.round((boundedScore / totalQuestions) * 100);
      const durationMins = Math.max(1, Math.round((Date.now() - sessionStartTime) / 60000));
      const pointsEarned = Math.max(30, (boundedScore * 15) + (messages.length >= 6 ? 20 : 10));

      const resultSummary = {
        lessonTitle,
        level,
        courseLabel,
        score: boundedScore,
        total: totalQuestions,
        percentage,
        pointsEarned,
        durationMins,
        savedAt: new Date().toLocaleTimeString(isRtl ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit' })
      };

      setLastSavedLessonResult(resultSummary);

      // 3. Determine if there is another scheduled lesson for today
      const nextLessonIndex = currentDailyLessonIndex + 1;
      const nextLesson = todayScheduledLessons[nextLessonIndex];
      const hasNextLessonToday = nextLessonIndex < todayScheduledLessons.length && !!nextLesson;

      // 3B. Sara Speaks Out Loud (The Exact Words tailored to 1st, 2nd, or 3rd lesson)
      const spokenCelebration = hasNextLessonToday
        ? (isRtl
            ? `انتهى الدرس! مبارك يا بطل، أتممت الدرس بنجاح وتم ترحيله إلى سجل إنجازاتك. حان وقت استراحة محارب قصيرة لمدة دقيقتين للاسترخاء وشرب الماء، وبعدها سننطلق معاً إلى درسنا التالي!`
            : `Lesson completed! Congratulations champion, this lesson is archived. Now take a 2-minute break to relax and hydrate, then we will start our next lesson!`)
        : (isRtl
            ? `انتهى الدرس! مبارك يا بطل، أتممت جميع دروسك المقررة لهذا اليوم بنجاح وحققت نتيجة ${percentage} بالمئة. تم تسجيل نتيجتك وحفظ تقدمك في ملفك الأكاديمي بجدارة! 🌟🎓`
            : `The lesson has ended! Congratulations champion, you completed today's scheduled lessons successfully with a score of ${percentage} percent. Your results and progress have been recorded! 🌟🎓`);

      if (voiceEnabled) {
        playSaraVoice(spokenCelebration);
      }

      // 4. Save to Firestore if student is logged in
      if (profile.uid) {
        // A. Add to 'lessonResults' (feeds StudyPlanner, ResultsChart, ParentWeeklyReportCard, Badges, etc.)
        await addDoc(collection(db, 'lessonResults'), {
          userId: profile.uid,
          parentIds: (profile as any).linkedParentIds || [],
          lessonId: lessonId,
          courseId: courseId,
          level: level,
          lessonTitle: lessonTitle,
          score: boundedScore,
          total: totalQuestions,
          percentage: percentage,
          xpEarned: pointsEarned,
          timestamp: serverTimestamp(),
          source: 'sara_tutor'
        });

        // B. Add to 'user_progress'
        const progressRef = doc(db, 'user_progress', `${profile.uid}_sara_${lessonId}`);
        await setDoc(progressRef, {
          userId: profile.uid,
          lessonId: `sara_${lessonId}`,
          title: lessonTitle,
          score: boundedScore,
          total: totalQuestions,
          percentage: percentage,
          completed: true,
          updatedAt: new Date(),
          level: level
        }, { merge: true });

        // C. Increment XP points on users collection
        try {
          await updateDoc(doc(db, 'users', profile.uid), {
            points: increment(pointsEarned)
          });
        } catch (e) {
          console.warn('Could not increment user points doc:', e);
        }

        // D. Daily streak activity
        try {
          await recordStreakActivity(profile.uid);
        } catch (e) {
          console.warn('Could not record streak:', e);
        }

        // E. Sync to tutorMemory & session log
        await syncMemoryToFirestore({
          newNotes: [`أتم الطالب بنجاح درس: ${lessonTitle} (${level}) بنتيجة ${percentage}% وحصل على +${pointsEarned} نقطة 🌟`],
          mistakes: [],
          wordsLearned: activeBoard?.sentence ? [activeBoard.highlight || 'lesson'].filter(Boolean) : []
        }, true, `Lesson Completed: ${lessonTitle}`);

        // F. Update parent AuthenticatedApp state
        if (onProfileUpdated) {
          onProfileUpdated({
            ...profile,
            points: ((profile as any).points || 0) + pointsEarned
          } as any);
        }
      }

      // 5. LocalStorage backup
      try {
        const localKey = `sara_completed_lessons_${profile.uid || 'guest'}`;
        const prevSaved = JSON.parse(localStorage.getItem(localKey) || '[]');
        prevSaved.unshift({
          ...resultSummary,
          id: lessonId,
          timestamp: Date.now()
        });
        localStorage.setItem(localKey, JSON.stringify(prevSaved.slice(0, 30)));
      } catch (e) {}

      // 6. Append completion card to chat stream
      const completionMsg: MessageItem = {
        id: `msg_lesson_complete_${Date.now()}`,
        role: 'sara',
        text: isRtl
          ? `🎓 **انتهى الدرس وسُجلت النتيجة بنجاح!** 🌟\n\nكفو عليك يا بطل! أتممت بنجاح درس: **${lessonTitle}** (${courseLabel})\n• 📊 **الدرجة المحققة:** ${percentage}% (${boundedScore}/${totalQuestions})\n• ⚡ **نقاط التميز المكتسبة:** +${pointsEarned} XP\n• ⏱️ **وقت التعلم:** ${durationMins} دقيقة\n• 💾 **حالة الحفظ:** تم التوثيق في سجل درجاتك ودفتر المتابعة بنجاح ✅`
          : `🎓 **Lesson Completed & Result Recorded!** 🌟\n\nOutstanding work! You finished: **${lessonTitle}** (${courseLabel})\n• 📊 **Score:** ${percentage}% (${boundedScore}/${totalQuestions})\n• ⚡ **XP Earned:** +${pointsEarned} XP\n• ⏱️ **Duration:** ${durationMins} mins\n• 💾 **Status:** Recorded & saved to your academic gradebook ✅`,
        board: {
          title: isRtl ? `🎓 نتيجة إتمام درس: ${lessonTitle}` : `🎓 Result: ${lessonTitle}`,
          sentence: `Great job mastering: "${lessonTitle}"!`,
          highlight: `${percentage}% Score`,
          formula: `Score: ${boundedScore}/${totalQuestions} • +${pointsEarned} XP`,
          notes: [
            isRtl ? `تم حفظ الدرجة (${percentage}%) بنجاح في سجل الأكاديمية.` : `Score (${percentage}%) successfully recorded in academy database.`,
            isRtl ? 'الاستمرار اليومي والممارسة هما أساس الوصول إلى الطلاقة التامة.' : 'Daily consistency is the foundation of true fluency.'
          ],
          openWhiteboard: true
        },
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, completionMsg]);
      setActiveBoard(completionMsg.board || null);

      // 7. Migration & 2-Minute Break System Or All-Done Modal
      // A. Archive and migrate session to Firestore & LocalStorage ("ترحيل الدرس")
      await executeLessonArchival(lessonTitle, boundedScore, totalQuestions, percentage, pointsEarned);

      // B. Mark lesson in today's completed tracker
      const now = new Date();
      const todayYmd = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      const newCompleted = Array.from(new Set([...todayCompletedLessonIds, lessonId]));
      setTodayCompletedLessonIds(newCompleted);
      try {
        localStorage.setItem(`sara_today_completed_${todayYmd}`, JSON.stringify(newCompleted));
      } catch (_) {}

      if (hasNextLessonToday && nextLesson) {
        // Close whiteboard
        setIsWhiteboardOpen(false);
        setIsLessonCompletedModalOpen(false);

        // Activate 2-minute rest break
        setNextLessonAfterBreak(nextLesson);
        setBreakSecondsLeft(120); // 2 minutes (120 seconds)
        setIsBreakTimerRunning(true);
        setIsDailyBreakActive(true);
      } else {
        // Last lesson of today! Open celebratory modal
        setIsWhiteboardOpen(false);
        setIsDailyBreakActive(false);
        setIsLessonCompletedModalOpen(false);
        setIsAllDailyLessonsCompletedModalOpen(true);
      }

      setShowSavedToast(true);
      setTimeout(() => setShowSavedToast(false), 5000);

    } catch (err) {
      console.error('Error completing and saving lesson:', err);
    } finally {
      setIsSavingLessonResult(false);
    }
  };

  // Trigger when session timer reaches 0
  const handleSessionTimeUp = () => {
    if (!isMountedRef.current) return;
    setIsSessionTimeUp(true);
    setIsTimerRunning(false);
    playSchoolBellChime();

    // Automatically complete & record lesson results, and speak out loud
    handleCompleteAndSaveLesson();
  };

  const selectTimerDuration = (mins: number) => {
    setTimerDurationMinutes(mins);
    setShowTimerDropdown(false);
    hasTriggeredTimeUpRef.current = false;
    setIsSessionTimeUp(false);
    if (mins === 0) {
      setIsTimerEnabled(false);
      setIsTimerRunning(false);
    } else {
      setIsTimerEnabled(true);
      setTimerSecondsLeft(mins * 60);
      setIsTimerRunning(true);
    }
  };

  const extendSessionByMinutes = (mins: number = 5) => {
    hasTriggeredTimeUpRef.current = false;
    setIsSessionTimeUp(false);
    setIsTimeUpModalOpen(false);
    setTimerSecondsLeft(prev => prev + mins * 60);
    setIsTimerRunning(true);
    setIsTimerEnabled(true);
  };

  const restartTimer = () => {
    hasTriggeredTimeUpRef.current = false;
    setIsSessionTimeUp(false);
    setIsTimeUpModalOpen(false);
    setTimerSecondsLeft(timerDurationMinutes * 60);
    setIsTimerRunning(true);
  };

  const toggleTimerPause = () => {
    setIsTimerRunning(prev => !prev);
  };

  const formatTimerDisplay = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Toggle single turn voice recognition
  const toggleListening = () => {
    if (!speechSupported || !recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      isListeningRef.current = false;
    } else {
      cancelAllSpeech();
      startListeningTurn();
    }
  };

  // Toggle Live Turn-by-Turn Voice Mode (رد برد صوتي)
  const toggleLiveVoiceMode = () => {
    if (isLiveMode) {
      liveModeRef.current = false;
      setIsLiveMode(false);
      setLiveStatus('idle');
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      cancelAllSpeech();
    } else {
      liveModeRef.current = true;
      setIsLiveMode(true);
      setVoiceEnabled(true);
      // If Sara is not talking, start listening right away!
      if (!isSpeakingRef.current && !loading) {
        startListeningTurn();
      }
    }
  };

  // Sync memory update to Firestore
  const syncMemoryToFirestore = async (newMemory: any, sessionDone?: boolean, currentSkill?: string) => {
    if (!profile.uid) return;

    try {
      // 1. Merge tutorMemory doc
      const updatedNotes = Array.from(new Set([...(tutorMemory.notes || []), ...(newMemory.newNotes || [])])).slice(-30);
      const updatedMistakes = Array.from(new Set([...(tutorMemory.frequentMistakes || []), ...(newMemory.mistakes || [])])).slice(-20);
      const updatedWords = Array.from(new Set([...(tutorMemory.wordsLearned || []), ...(newMemory.wordsLearned || [])])).slice(-100);

      const memUpdate: any = {
        notes: updatedNotes,
        frequentMistakes: updatedMistakes,
        wordsLearned: updatedWords,
        lastSessionAt: serverTimestamp(),
        lastSessionSummary: newMemory.newNotes?.[0] || tutorMemory.lastSessionSummary || 'Daily tutoring session'
      };

      await setDoc(doc(db, 'tutorMemory', profile.uid), memUpdate, { merge: true });

      setTutorMemory(prev => ({
        ...prev,
        ...memUpdate
      }));

      // 2. If session is done, record session in tutorMemory/{uid}/sessions/{sessionId}
      if (sessionDone) {
        const sessionDoc = {
          startedAt: new Date(sessionStartTime).toISOString(),
          endedAt: new Date().toISOString(),
          summary: newMemory.newNotes?.join('. ') || 'Completed daily English session with Sara',
          skill: currentSkill || activeBoard?.title || 'Daily English Practice',
          quizScore: quizScoreCount
        };
        await setDoc(doc(db, 'tutorMemory', profile.uid, 'sessions', sessionId), sessionDoc);
      }
    } catch (err) {
      console.warn('Failed to sync tutor memory to Firestore:', err);
    }
  };

  // ==========================================
  // 🎯 Placement Test Engine (المحادثة + 5 أسئلة + سبلنغ + ربط المناهج)
  // ==========================================

  const startPlacementTest = () => {
    cancelAllSpeech();
    setPlacementState({
      isActive: true,
      stage: 'conversation',
      conversationTurn: 0,
      conversationAnswers: [],
      conversationScore: 0,
      quizCurrentIndex: 0,
      quizAnswers: [],
      quizScore: 0,
      spellingCurrentIndex: 0,
      spellingAnswers: [],
      spellingScore: 0,
      diagnosedLevel: null,
      totalScore: 0
    });
    setSpellingInputText('');
    setSpellingFeedback(null);
    setPlacementQuizSelected(null);
    setPlacementQuizFeedback(null);

    const introText = isRtl
      ? 'أهلاً بك يا بطل في اختبار تحديد المستوى الشامل مع سارة! 🎯 سنبدأ أولاً بالمحادثة الشفهية. عرّفني بنفسك بالإنجليزية: اسمك، من أين أنت، وما تحب القيام به في وقت فراغك؟ 🎙️ تفضل بالتحدث بالمايك أو الكتابة.'
      : 'Welcome champion to your comprehensive level placement with Sara! 🎯 We begin with spoken conversation. Tell me about yourself in English: your name, where you are from, and your favorite hobby? 🎙️ Speak via mic or type.';

    const introMsg: MessageItem = {
      id: `msg_placement_intro_${Date.now()}`,
      role: 'sara',
      text: introText,
      board: {
        title: isRtl ? 'اختبار تحديد المستوى – المرحلة 1: المحادثة الشفهية 🎙️' : 'Placement Test – Stage 1: Spoken Conversation 🎙️',
        sentence: 'Tell me about yourself: What is your name and favorite hobby?',
        highlight: 'Tell me about yourself',
        formula: 'Speaking Fluency + Vocabulary Usage',
        notes: [
          isRtl ? 'المرحلة 1 من 3: محادثة شفهية تفاعلية (سؤالان)' : 'Stage 1 of 3: Interactive Speaking (2 Questions)',
          isRtl ? 'تحدث بحرية بالمايك أو اكتب إجابتك وسأقيم طلاقتك وتعبيرك' : 'Speak via mic or type your response'
        ],
        openWhiteboard: true
      },
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, introMsg]);
    setActiveBoard(introMsg.board || null);
    setIsWhiteboardOpen(true);
    if (voiceEnabled) {
      playSaraVoice(introText);
    }
  };

  const advancePlacementQuiz = (targetIndex?: number) => {
    if (placementQuizTimerRef.current) {
      clearTimeout(placementQuizTimerRef.current);
      placementQuizTimerRef.current = null;
    }

    setPlacementQuizSelected(null);
    setPlacementQuizFeedback(null);
    setQuizSelectedOption(null);
    setQuizFeedback(null);

    setPlacementState(prev => {
      const nextIndex = targetIndex !== undefined ? targetIndex : prev.quizCurrentIndex + 1;

      if (nextIndex < 5) {
        const nextQ = PLACEMENT_5_QUESTIONS[nextIndex];
        setActiveBoard({
          title: isRtl ? `اختبار تحديد المستوى – السؤال ${nextIndex + 1} من 5 📝` : `Placement Diagnostic Quiz – Question ${nextIndex + 1}/5 📝`,
          sentence: nextQ.questionEn,
          highlight: undefined, // Hidden until student selects option
          notes: [
            isRtl ? nextQ.questionAr : 'Select the best grammatical/vocabulary fit:',
            isRtl ? `المستوى المستهدف: ${nextQ.levelTarget}` : `Target Level: ${nextQ.levelTarget}`
          ],
          quiz: {
            question: nextQ.questionEn,
            options: nextQ.options,
            answerIndex: nextQ.correctIndex
          },
          openWhiteboard: true
        });

        return {
          ...prev,
          quizCurrentIndex: nextIndex
        };
      } else {
        // Transition to Stage 3: Spelling Test
        const firstSpelling = PLACEMENT_SPELLING_ITEMS[0];
        const spellingIntro = isRtl
          ? 'كفو يا بطل! أتممت اختبار الـ 5 أسئلة بنجاح 📝👏. ننتقل الآن للمرحلة الثالثة: امتحان كتابة سبلنغ صغير (3 كلمات) لاختبار مهارة التهجئة والإملاء! استمع للكلمة واكتبها في المربع.'
          : 'Great job! You finished the 5 questions 📝👏. Now moving to Stage 3: Mini Spelling Exam (3 words) to check spelling and orthography! Listen and write the word.';

        const spellingIntroMsg: MessageItem = {
          id: `msg_spelling_intro_${Date.now()}`,
          role: 'sara',
          text: spellingIntro,
          board: {
            title: isRtl ? 'اختبار تحديد المستوى – المرحلة 3: امتحان السبلنغ (1 من 3) ✍️' : 'Placement – Stage 3: Spelling Test (1/3) ✍️',
            sentence: firstSpelling.sentenceContext,
            highlight: undefined, // Anti-cheating: hidden until student submits
            notes: [
              isRtl ? `المعنى: ${firstSpelling.meaningAr}` : `Meaning: ${firstSpelling.meaningEn}`,
              isRtl ? `تلميح الأحرف: ${firstSpelling.hintMask}` : `Mask: ${firstSpelling.hintMask}`
            ],
            openWhiteboard: true
          },
          timestamp: Date.now()
        };

        setMessages(mPrev => [...mPrev, spellingIntroMsg]);
        setActiveBoard(spellingIntroMsg.board || null);
        if (voiceEnabled) {
          playSaraVoice(spellingIntro, () => {
            setTimeout(() => {
              playSaraVoice(
                firstSpelling.word,
                undefined,
                isRtl ? '🎧 استمع لنطق الكلمة واكتبها في المربع...' : '🎧 Listen to the word and type the spelling...'
              );
            }, 400);
          });
        }

        return {
          ...prev,
          stage: 'spelling',
          spellingCurrentIndex: 0
        };
      }
    });
  };

  const handlePlacementQuizAnswer = (selectedIndex: number) => {
    if (placementQuizSelected !== null) return;
    const currentQ = PLACEMENT_5_QUESTIONS[placementState.quizCurrentIndex];
    if (!currentQ) return;

    if (placementQuizTimerRef.current) {
      clearTimeout(placementQuizTimerRef.current);
      placementQuizTimerRef.current = null;
    }

    setPlacementQuizSelected(selectedIndex);
    const isCorrect = selectedIndex === currentQ.correctIndex;
    setPlacementQuizFeedback(isCorrect ? 'correct' : 'wrong');
    setQuizSelectedOption(selectedIndex);
    setQuizFeedback(isCorrect ? 'correct' : 'wrong');

    // Anti-cheating: Reveal correct answer on active board ONLY after student makes a choice
    setActiveBoard(prev => prev ? {
      ...prev,
      highlight: currentQ.options[currentQ.correctIndex]
    } : null);

    const addedPoints = isCorrect ? 10 : 0;
    setPlacementState(prev => ({
      ...prev,
      quizScore: prev.quizScore + addedPoints,
      quizAnswers: [...prev.quizAnswers, { selectedIndex, isCorrect }]
    }));

    // Auto advance after 1300ms or student can advance immediately anytime via button
    placementQuizTimerRef.current = setTimeout(() => {
      advancePlacementQuiz();
    }, 1300);
  };

  const advancePlacementSpelling = (targetIndex?: number) => {
    if (placementSpellingTimerRef.current) {
      clearTimeout(placementSpellingTimerRef.current);
      placementSpellingTimerRef.current = null;
    }

    setSpellingInputText('');
    setSpellingFeedback(null);

    setPlacementState(prev => {
      const nextIndex = targetIndex !== undefined ? targetIndex : prev.spellingCurrentIndex + 1;

      if (nextIndex < 3) {
        const nextSp = PLACEMENT_SPELLING_ITEMS[nextIndex];
        setActiveBoard({
          title: isRtl ? `اختبار تحديد المستوى – امتحان السبلنغ (${nextIndex + 1} من 3) ✍️` : `Placement – Spelling Test (${nextIndex + 1}/3) ✍️`,
          sentence: nextSp.sentenceContext,
          highlight: undefined, // Hidden until student submits
          notes: [
            isRtl ? `المعنى: ${nextSp.meaningAr}` : `Meaning: ${nextSp.meaningEn}`,
            isRtl ? `تلميح الأحرف: ${nextSp.hintMask}` : `Mask: ${nextSp.hintMask}`
          ],
          openWhiteboard: true
        });

        if (voiceEnabled) {
          playSaraVoice(
            nextSp.word,
            undefined,
            isRtl ? '🎧 استمع لنطق الكلمة واكتبها في المربع...' : '🎧 Listen to the word and type the spelling...'
          );
        }

        return {
          ...prev,
          spellingCurrentIndex: nextIndex
        };
      } else {
        // Complete evaluation!
        finalizePlacementEvaluation(
          prev.conversationScore,
          prev.quizScore,
          prev.spellingScore
        );
        return prev;
      }
    });
  };

  const handlePlacementSpellingSubmit = (typedWord: string) => {
    if (spellingFeedback !== null || !typedWord.trim()) return;
    const currentSp = PLACEMENT_SPELLING_ITEMS[placementState.spellingCurrentIndex];
    if (!currentSp) return;

    if (placementSpellingTimerRef.current) {
      clearTimeout(placementSpellingTimerRef.current);
      placementSpellingTimerRef.current = null;
    }

    const cleanInput = typedWord.trim().toLowerCase();
    const isCorrect = cleanInput === currentSp.word.toLowerCase();
    setSpellingFeedback(isCorrect ? 'correct' : 'wrong');

    // Anti-cheating: Reveal spelling on board ONLY after submit
    setActiveBoard(prev => prev ? {
      ...prev,
      highlight: currentSp.word
    } : null);

    const addedPoints = isCorrect ? 6.67 : 0;
    setPlacementState(prev => ({
      ...prev,
      spellingScore: prev.spellingScore + addedPoints,
      spellingAnswers: [...prev.spellingAnswers, { input: typedWord, isCorrect }]
    }));

    // Auto advance after 1300ms or student can advance immediately anytime via button
    placementSpellingTimerRef.current = setTimeout(() => {
      advancePlacementSpelling();
    }, 1300);
  };

  const finalizePlacementEvaluation = async (
    convScore: number,
    qScore: number,
    spScore: number
  ) => {
    const rawTotal = Math.round(convScore + qScore + spScore);
    const finalTotal = Math.min(100, Math.max(15, rawTotal));

    // Determine CEFR Level
    let level: proficiencyLevel = proficiencyLevel.A1;
    if (finalTotal >= 88) level = proficiencyLevel.C1;
    else if (finalTotal >= 75) level = proficiencyLevel.B2;
    else if (finalTotal >= 55) level = proficiencyLevel.B1;
    else if (finalTotal >= 35) level = proficiencyLevel.A2;
    else level = proficiencyLevel.A1;

    setPlacementState(prev => ({
      ...prev,
      stage: 'result',
      diagnosedLevel: level,
      totalScore: finalTotal,
      conversationScore: convScore,
      quizScore: qScore,
      spellingScore: spScore
    }));

    // Retrieve actual units from MASTER_CURRICULUM for this diagnosed level
    const readingUnit = MASTER_CURRICULUM[CurriculumCategory.READING]?.[level]?.[0];
    const writingUnit = MASTER_CURRICULUM[CurriculumCategory.WRITING]?.[level]?.[0];
    const grammarUnit = MASTER_CURRICULUM[CurriculumCategory.GRAMMAR]?.[level]?.[0];
    const conversationUnit = MASTER_CURRICULUM[CurriculumCategory.CONVERSATION]?.[level]?.[0];

    const finalBoard: SaraBoardData = {
      title: isRtl ? `شهادة تحديد المستوى المعتمدة: ${level} 🎓` : `Official Level Placement Certificate: ${level} 🎓`,
      sentence: `Your Certified English Level is ${level} (Score: ${finalTotal}/100)`,
      highlight: level,
      formula: `Speaking: ${Math.round(convScore)}/30 + Quiz: ${Math.round(qScore)}/50 + Spelling: ${Math.round(spScore)}/20 = ${finalTotal}%`,
      notes: [
        isRtl ? `مستواك المعتمد في الأكاديمية: [${level}]` : `Accredited Level: [${level}]`,
        isRtl ? `وحدة القراءة الموصى بها: "${readingUnit?.titleAr || 'القراءة'}"` : `Recommended Reading: "${readingUnit?.title || ''}"`,
        isRtl ? `وحدة التعبير والكتابة: "${writingUnit?.titleAr || 'الكتابة'}"` : `Recommended Writing: "${writingUnit?.title || ''}"`,
        isRtl ? `وحدة القواعد والتراكيب: "${grammarUnit?.titleAr || 'القواعد'}"` : `Recommended Grammar: "${grammarUnit?.title || ''}"`,
        isRtl ? `وحدة المحادثة والطلاقة: "${conversationUnit?.titleAr || 'المحادثة'}"` : `Recommended Conversation: "${conversationUnit?.title || ''}"`
      ],
      openWhiteboard: true
    };
    setActiveBoard(finalBoard);
    setIsWhiteboardOpen(true);

    // Save to Firestore & backend
    try {
      if (profile.uid) {
        // Level is saved by the server (rules block students from writing `level` directly)
        await savePlacementLevel(level, {
          totalScore: finalTotal,
          conversationScore: convScore,
          quizScore: qScore,
          spellingScore: spScore
        });

        // Update memory in Firestore
        syncMemoryToFirestore({
          newNotes: [`أتم الطالب اختبار تحديد المستوى بنجاح وحصل على المستوى ${level} بمجموع ${finalTotal}%`],
          mistakes: [],
          wordsLearned: ['placement', 'diagnostic', 'curriculum', level]
        }, true, `Placement Evaluation: Level ${level}`);
      }
    } catch (err) {
      console.warn('Error saving placement evaluation:', err);
    }

    // Update parent UserProfile state in AuthenticatedApp
    if (onProfileUpdated) {
      onProfileUpdated({
        ...profile,
        level: level,
        placementTestCompleted: true
      } as any);
    }

    // Sara speaks celebration
    const resultSpeech = isRtl
      ? `مبروك يا بطل! تم تحديد مستواك المعتمد في الأكاديمية بنجاح: مستوى ${level}. ربطت لك كل المناهج المعتمدة المناسبة لمستواك، وجاهزة نبدأ الدرس الأول معاً!`
      : `Congratulations! Your certified English proficiency level is ${level}. I have unlocked and linked your full curriculum roadmap. Let us start!`;

    const resultMsg: MessageItem = {
      id: `msg_placement_result_${Date.now()}`,
      role: 'sara',
      text: resultSpeech,
      board: finalBoard,
      actions: [
        { type: 'open_section', sectionId: 'reading-lab' },
        { type: 'open_section', sectionId: 'grammar-academy' },
        { type: 'open_section', sectionId: 'writing-spelling-studio' },
        { type: 'open_section', sectionId: 'pronunciation-lab' }
      ],
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, resultMsg]);

    if (voiceEnabled) {
      playSaraVoice(resultSpeech);
    }
  };

  // Send message handler
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || loading) return;

    // Check if user is triggering placement test verbally or by text
    const lower = text.toLowerCase();
    const isPlacementTrigger = 
      lower.includes('تحديد المستوى') || 
      lower.includes('حدد مستواي') || 
      lower.includes('اختبر مستواي') || 
      lower.includes('placement') || 
      lower.includes('امتحني لتحديد') || 
      lower.includes('اختبار المستوى');

    if (isPlacementTrigger && !placementState.isActive) {
      // Add user's message
      const userMsg: MessageItem = {
        id: `msg_user_${Date.now()}`,
        role: 'user',
        text: text,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, userMsg]);
      setInputText('');
      startPlacementTest();
      return;
    }

    // 0. Detect "End Lesson / Finish Lesson" intent from voice or chat
    const isFinishLessonIntent = 
      lower.includes('انتهى الدرس') ||
      lower.includes('انتهت الحصة') ||
      lower.includes('أنهيت الدرس') ||
      lower.includes('أنهينا الدرس') ||
      lower.includes('خلصت الدرس') ||
      lower.includes('خلصنا الدرس') ||
      lower.includes('تم إنهاء الدرس') ||
      lower.includes('أكملت الدرس') ||
      lower.includes('انتهينا') ||
      lower.includes('إنهاء الدرس') ||
      lower.includes('انهاء الدرس') ||
      lower.includes('finish lesson') ||
      lower.includes('end lesson') ||
      lower.includes('finished the lesson') ||
      lower.includes('lesson finished') ||
      lower.includes('lesson done') ||
      lower.includes('complete lesson');

    if (isFinishLessonIntent) {
      const userMsg: MessageItem = {
        id: `msg_user_${Date.now()}`,
        role: 'user',
        text: text,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, userMsg]);
      setInputText('');
      handleCompleteAndSaveLesson();
      return;
    }

    // 0B. Detect "Study Plan / Academic Schedule" intent from voice or chat
    const isStudyPlanIntent = 
      lower.includes('الخطة الدراسية') ||
      lower.includes('خطتي الدراسية') ||
      lower.includes('جدولي الدراسي') ||
      lower.includes('الجدول الدراسي') ||
      lower.includes('افتحي الخطة') ||
      lower.includes('افتح الخطة') ||
      lower.includes('وش درسي اليوم') ||
      lower.includes('ما هو درسي اليوم') ||
      lower.includes('study plan') ||
      lower.includes('my schedule');

    if (isStudyPlanIntent) {
      const userMsg: MessageItem = {
        id: `msg_user_${Date.now()}`,
        role: 'user',
        text: text,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, userMsg]);
      setInputText('');
      fetchActiveStudyPlan();
      setIsStudyPlanModalOpen(true);
      const planGreeting = isRtl
        ? `أهلاً بك يا بطل! 🌟 فتحت لك الخطة الأكاديمية والجدول الدراسي الذكي 🗓️. يمكنك متابعة جدولك، أو اختيار أي درس لتشرحه لك سارة مباشرة بالصوت والسبورة!`
        : `Welcome champ! 🌟 I opened your Smart Academic Study Plan 🗓️. You can browse your schedule and click any lesson to study with me on the whiteboard!`;
      const saraMsg: MessageItem = {
        id: `msg_sara_plan_${Date.now()}`,
        role: 'sara',
        text: planGreeting,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, saraMsg]);
      if (voiceEnabled) {
        playSaraVoice(planGreeting);
      }
      return;
    }

    // Check if user is asking to browse/link to curriculums or explain a specific curriculum
    const isCurriculumIntent = 
      lower.includes('مناهج') ||
      lower.includes('منهج') ||
      lower.includes('curriculum') ||
      lower.includes('curricula') ||
      lower.includes('العادات الذرية') ||
      lower.includes('العادات السبع') ||
      lower.includes('الأب الغني') ||
      lower.includes('الاب الغني') ||
      lower.includes('فن اللامبالاة') ||
      lower.includes('قوة الآن') ||
      lower.includes('قوة الان') ||
      lower.includes('السماح بالرحيل') ||
      lower.includes('أكسفورد') ||
      lower.includes('oxford');

    if (isCurriculumIntent && !placementState.isActive) {
      const allCatalogLessons = getAllCurriculumLessons();
      let matchedLesson: CurriculumLesson | undefined;

      if (lower.includes('عادات ذرية') || lower.includes('العادات الذرية') || lower.includes('atomic')) {
        matchedLesson = allCatalogLessons.find(l => l.courseId === 'atomic_habits');
      } else if (lower.includes('عادات السبع') || lower.includes('العادات السبع') || lower.includes('seven habits')) {
        matchedLesson = allCatalogLessons.find(l => l.courseId === 'seven_habits');
      } else if (lower.includes('أب غني') || lower.includes('الأب الغني') || lower.includes('rich dad')) {
        matchedLesson = allCatalogLessons.find(l => l.courseId === 'rich_dad');
      } else if (lower.includes('فن اللامبالاة') || lower.includes('subtle art')) {
        matchedLesson = allCatalogLessons.find(l => l.courseId === 'subtle_art');
      } else if (lower.includes('قوة الآن') || lower.includes('قوة الان') || lower.includes('power of now')) {
        matchedLesson = allCatalogLessons.find(l => l.courseId === 'power_of_now');
      } else if (lower.includes('السماح بالرحيل') || lower.includes('letting go')) {
        matchedLesson = allCatalogLessons.find(l => l.courseId === 'letting_go');
      } else if (lower.includes('أكسفورد') || lower.includes('oxford')) {
        matchedLesson = allCatalogLessons.find(l => l.pillarId === 'oxford');
      } else if (lower.includes('قواعد') || lower.includes('grammar')) {
        matchedLesson = allCatalogLessons.find(l => l.pillarId === 'grammar');
      } else if (lower.includes('قراءة') || lower.includes('reading')) {
        matchedLesson = allCatalogLessons.find(l => l.pillarId === 'reading');
      } else if (lower.includes('محادثة') || lower.includes('speaking') || lower.includes('conversation')) {
        matchedLesson = allCatalogLessons.find(l => l.pillarId === 'conversation');
      } else if (lower.includes('تعبير') || lower.includes('كتابة') || lower.includes('writing')) {
        matchedLesson = allCatalogLessons.find(l => l.pillarId === 'writing');
      } else if (lower.includes('نطق') || lower.includes('صوتيات') || lower.includes('pronunciation')) {
        matchedLesson = allCatalogLessons.find(l => l.pillarId === 'pronunciation');
      } else if (lower.includes('جرعة') || lower.includes('daily dose')) {
        matchedLesson = allCatalogLessons.find(l => l.pillarId === 'daily_dose');
      }

      // Add user message
      const userMsg: MessageItem = {
        id: `msg_user_${Date.now()}`,
        role: 'user',
        text: text,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, userMsg]);
      setInputText('');

      if (matchedLesson) {
        handleSelectCurriculumLesson(matchedLesson);
        return;
      }

      // General curriculum inquiry / linking request
      setIsCurriculumModalOpen(true);
      const saraReplyMsg: MessageItem = {
        id: `msg_sara_${Date.now()}`,
        role: 'sara',
        text: isRtl
          ? 'أهلاً بك يا بطل! 🌟 تم ربط سارة بجميع مناهج الأكاديمية بالكامل (القواعد، القراءة، المحادثة، التعبير، أكسفورد، كتب تطوير الذات العالمية كالعادات الذرية، الصوتيات، والدروس المرئية). فتحت لك نافذة المناهج الآن، اختر أي منهج وسأشرحه لك فوراً بالصوت والسبورة الذكية! 📚👩‍🏫📐'
          : 'Welcome! I have connected to all academy curriculums (Grammar, Reading, Conversation, Oxford Discover, Bestseller Books like Atomic Habits, Pronunciation, and Video Lessons). I have opened the curriculum catalogue for you—pick any lesson and I will teach it on the whiteboard with audio! 📚👩‍🏫📐',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, saraReplyMsg]);
      if (voiceEnabled) {
        playSaraVoice(isRtl
          ? 'أهلاً بك! ربطت لك جميع مناهج الأكاديمية، فتحت لك النافذة لتختار أي درس وسأشرحه لك فوراً على السبورة الذكية 🌸'
          : 'Welcome! I am connected to all academy curriculums. Pick any lesson and let us learn together! 🌸'
        );
      }
      return;
    }

    // If currently in conversational placement assessment
    if (placementState.isActive && placementState.stage === 'conversation') {
      const userMsg: MessageItem = {
        id: `msg_user_${Date.now()}`,
        role: 'user',
        text: text,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, userMsg]);
      setInputText('');

      // Evaluate conversational turn
      const wordsCount = text.trim().split(/\s+/).length;
      const hasEnglish = /[a-zA-Z]/.test(text);
      let turnPoints = 8;
      if (wordsCount >= 7 && hasEnglish) turnPoints = 15;
      else if (wordsCount >= 4 && hasEnglish) turnPoints = 12;
      else if (hasEnglish) turnPoints = 10;

      const currentScore = placementState.conversationScore + turnPoints;
      const updatedAnswers = [...placementState.conversationAnswers, text];

      if (placementState.conversationTurn === 0) {
        // Ask Conversation Question 2
        setPlacementState(prev => ({
          ...prev,
          conversationTurn: 1,
          conversationScore: currentScore,
          conversationAnswers: updatedAnswers
        }));

        const q2Text = isRtl
          ? 'ما شاء الله عليك! أحييك على تعبيرك ومحاولتك الجميلة 👏. والآن سؤال المحادثة الثاني: ما هو هدفك من تعلم اللغة الإنجليزية، أو صف لي يوماً مفضلاً لك أو كيف تقضي عطلتك؟ 🌟 (تفضل بالمايك أو الكتابة).'
          : 'Great job! I love your speaking attempt 👏. Now question 2: What is your main goal in learning English, or describe your favorite day? 🌟 (Speak via mic or type).';

        const q2Msg: MessageItem = {
          id: `msg_conv_q2_${Date.now()}`,
          role: 'sara',
          text: q2Text,
          board: {
            title: isRtl ? 'اختبار تحديد المستوى – محادثة شفهية (سؤال 2 من 2) 🎙️' : 'Placement Test – Conversation (Question 2/2) 🎙️',
            sentence: 'What is your goal in English, or describe your favorite day?',
            highlight: 'What is your goal in English?',
            notes: [
              isRtl ? 'المحادثة الشفهية: سؤال 2 من 2' : 'Spoken Conversation: Question 2 of 2',
              isRtl ? 'صف طموحك أو روتينك لتقييم المفردات وصياغة الجمل' : 'Describe your goal or routine'
            ],
            openWhiteboard: true
          },
          timestamp: Date.now()
        };

        setMessages(prev => [...prev, q2Msg]);
        setActiveBoard(q2Msg.board || null);
        if (voiceEnabled) {
          playSaraVoice(q2Text);
        }
        return;
      } else {
        // Conversation stage finished -> Transition to 5-Question Quiz!
        const firstQ = PLACEMENT_5_QUESTIONS[0];
        setPlacementState(prev => ({
          ...prev,
          stage: 'quiz',
          conversationScore: currentScore,
          conversationAnswers: updatedAnswers,
          quizCurrentIndex: 0
        }));

        const quizIntroText = isRtl
          ? 'أبدعت في مرحلة المحادثة الشفهية! 🎙️👏 ننتقل الآن إلى المرحلة الثانية: اختبار مكون من 5 أسئلة ذكية لتشخيص مستواك الدقيق في القواعد والمفردات. تفضل باختيار الإجابة الصحيحة أدناه!'
          : 'Awesome spoken interaction! 🎙️👏 Now moving to Stage 2: A 5-question diagnostic quiz to check grammar and vocabulary. Pick the correct answers below!';

        const quizIntroMsg: MessageItem = {
          id: `msg_quiz_intro_${Date.now()}`,
          role: 'sara',
          text: quizIntroText,
          board: {
            title: isRtl ? 'اختبار تحديد المستوى – السؤال 1 من 5 📝' : 'Placement Diagnostic Quiz – Question 1/5 📝',
            sentence: firstQ.questionEn,
            highlight: undefined, // Hidden until student selects answer
            notes: [
              isRtl ? firstQ.questionAr : 'Select the best option:',
              isRtl ? `المستوى المستهدف: ${firstQ.levelTarget}` : `Target: ${firstQ.levelTarget}`
            ],
            quiz: {
              question: firstQ.questionEn,
              options: firstQ.options,
              answerIndex: firstQ.correctIndex
            },
            openWhiteboard: true
          },
          timestamp: Date.now()
        };

        setMessages(prev => [...prev, quizIntroMsg]);
        setActiveBoard(quizIntroMsg.board || null);
        if (voiceEnabled) {
          playSaraVoice(quizIntroText);
        }
        return;
      }
    }

    // Intercept quiz & spelling interactions if placement test is actively running
    if (placementState.isActive) {
      if (placementState.stage === 'quiz') {
        const cleanT = text.trim().toLowerCase();
        if (cleanT === 'next' || cleanT === 'التالي' || cleanT === 'السؤال التالي' || cleanT === 'بعده') {
          advancePlacementQuiz();
          setInputText('');
          return;
        }

        const currentQ = PLACEMENT_5_QUESTIONS[placementState.quizCurrentIndex];
        if (currentQ) {
          const letterMap: Record<string, number> = { 'a': 0, 'b': 1, 'c': 2, 'd': 3, '1': 0, '2': 1, '3': 2, '4': 3, 'أ': 0, 'ب': 1, 'ج': 2, 'د': 3 };
          if (letterMap[cleanT] !== undefined) {
            handlePlacementQuizAnswer(letterMap[cleanT]);
            setInputText('');
            return;
          }

          const optMatch = currentQ.options.findIndex(
            o => o.toLowerCase() === cleanT || cleanT.includes(o.toLowerCase()) || o.toLowerCase().includes(cleanT)
          );
          if (optMatch !== -1) {
            handlePlacementQuizAnswer(optMatch);
            setInputText('');
            return;
          }
        }
      } else if (placementState.stage === 'spelling') {
        const cleanT = text.trim().toLowerCase();
        if (cleanT === 'next' || cleanT === 'التالي' || cleanT === 'الكلمة التالية') {
          advancePlacementSpelling();
          setInputText('');
          return;
        }
        handlePlacementSpellingSubmit(text);
        setInputText('');
        return;
      }
    }

    // Clear any hesitation prompt
    clearHesitationTimer();

    // Advance role-play missions on student interaction
    if (activeRolePlay) {
      setCompletedMissions(prev => {
        if (prev.length < (activeRolePlay.missionsAr?.length || 3)) {
          return [...prev, prev.length];
        }
        return prev;
      });
    }

    // Add user message to chat for normal conversation
    const userMsg: MessageItem = {
      id: `msg_user_${Date.now()}`,
      role: 'user',
      text: text,
      timestamp: Date.now()
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputText('');
    setLoading(true);

    try {
      // Prepare compact student snapshot
      const snapshot = {
        name: profile.displayName,
        level: (profile as any).level || tutorMemory.level || 'A1',
        age: tutorMemory.age,
        interests: tutorMemory.interests || [],
        goal: tutorMemory.goal || 'General English Fluency',
        lastMemoryNotes: tutorMemory.notes?.slice(-5) || [],
        frequentMistakes: tutorMemory.frequentMistakes || [],
        wordsLearned: tutorMemory.wordsLearned || []
      };

      // Compact history formatted as role + text (last 12)
      const compactHistory = newHistory.slice(-12).map(m => ({
        role: m.role === 'sara' ? 'model' : 'user',
        text: m.text
      }));

      const idToken = auth.currentUser ? await auth.currentUser.getIdToken() : '';
      const response = await fetch('/api/sara/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(idToken ? { 'Authorization': `Bearer ${idToken}` } : {})
        },
        body: JSON.stringify({
          message: text,
          snapshot: snapshot,
          history: compactHistory,
          rolePlay: activeRolePlay ? {
            id: activeRolePlay.id,
            title: isRtl ? activeRolePlay.titleAr : activeRolePlay.titleEn,
            roleSara: isRtl ? activeRolePlay.roleSaraAr : activeRolePlay.roleSaraEn,
            roleStudent: isRtl ? activeRolePlay.roleStudentAr : activeRolePlay.roleStudentEn,
            location: activeRolePlay.location,
            missions: isRtl ? activeRolePlay.missionsAr : activeRolePlay.missionsEn
          } : undefined,
          preferredLang: activeLang,
          timerDurationMinutes: timerDurationMinutes || 10,
          timerSecondsLeft: timerSecondsLeft,
          activeCurriculum: activeCurriculumLesson ? {
            id: activeCurriculumLesson.id,
            pillarId: activeCurriculumLesson.pillarId,
            courseLabelAr: activeCurriculumLesson.courseLabelAr,
            courseLabelEn: activeCurriculumLesson.courseLabelEn,
            titleAr: activeCurriculumLesson.titleAr,
            titleEn: activeCurriculumLesson.titleEn,
            level: activeCurriculumLesson.level,
            descriptionAr: activeCurriculumLesson.descriptionAr,
            descriptionEn: activeCurriculumLesson.descriptionEn
          } : undefined
        })
      });

      if (!response.ok) {
        throw new Error(`Chat error status: ${response.status}`);
      }

      if (!isMountedRef.current) return;

      const data: SaraChatResponse = await response.json();
      if (!isMountedRef.current) return;

      const saraMsg: MessageItem = {
        id: `msg_sara_${Date.now()}`,
        role: 'sara',
        text: data.reply,
        board: data.board,
        actions: data.actions,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, saraMsg]);

      // Update active board if provided
      if (data.board) {
        setActiveBoard(data.board);
        setQuizSelectedOption(null);
        setQuizFeedback(null);
        if (data.board.openWhiteboard) {
          setIsWhiteboardOpen(true);
        }
      }

      // Voice playback & Turn-by-Turn Live loop continuation
      if ((voiceEnabled || liveModeRef.current) && data.reply && isMountedRef.current) {
        const handleTurnContinuation = () => {
          if (liveModeRef.current && isMountedRef.current) {
            setTimeout(() => {
              if (liveModeRef.current && !isSpeakingRef.current && !isThinkingRef.current && isMountedRef.current) {
                startListeningTurn();
              }
            }, 350);
          }
        };

        if (data.audio) {
          // Zero-latency instant playback of Sara's pre-rendered studio 'Kore' audio!
          playSaraDirectSpeech(data.audio, data.reply, handleTurnContinuation);
        } else {
          playSaraVoice(data.reply, handleTurnContinuation);
        }
      } else if (liveModeRef.current && isMountedRef.current) {
        setTimeout(() => {
          if (liveModeRef.current && !isSpeakingRef.current && !isThinkingRef.current && isMountedRef.current) {
            startListeningTurn();
          }
        }, 350);
      }

      // Sync memory
      if (data.memory && isMountedRef.current) {
        syncMemoryToFirestore(data.memory, data.sessionDone, data.board?.title);
      }
    } catch (err: any) {
      if (!isMountedRef.current) return;
      console.error('Sara chat error:', err);
      const isOffline = typeof navigator !== 'undefined' && !navigator.onLine;
      const fallbackMsg: MessageItem = {
        id: `msg_sara_err_${Date.now()}`,
        role: 'sara',
        text: isRtl 
          ? (isOffline 
              ? '📶 يبدو أن اتصال الإنترنت ضعيف أو منقطع مؤقتاً. لا تقلق، محادثتك بالكامل محفوظة بأمان على جهازك وستتمكن من إكمالها فور عودة الاتصال! 💾' 
              : 'أعتذر منك يا بطل! واجهت مشكلة بسيطة في الاتصال، ومحادثتك محفوظة بأمان. تفضل بالمحاولة مرة ثانية 🌟')
          : 'Network connection issue. Your conversation is safely stored offline and ready to continue anytime! 💾',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
        isThinkingRef.current = false;
      }
    }
  };

  // Mini quiz option selection
  const handleQuizOptionClick = (index: number) => {
    if (placementState.isActive && placementState.stage === 'quiz') {
      handlePlacementQuizAnswer(index);
      return;
    }
    if (!activeBoard?.quiz || quizSelectedOption !== null) return;
    setQuizSelectedOption(index);
    const isCorrect = index === activeBoard.quiz.answerIndex;
    setQuizFeedback(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) {
      setQuizScoreCount(prev => prev + 1);
    }

    // Immediate enthusiastic vocal feedback from Sara without delay
    if (voiceEnabled) {
      const immediateAudio = isCorrect 
        ? (isRtl ? 'كفو عليك يا بطل! إجابة صحيحة وممتازة 🌟 أحسنت، واصل التدريب والتعلم معي!' : 'Awesome job! That is correct! 🌟 Great effort, let us keep practicing and learning!')
        : (isRtl ? 'محاولة جيدة يا بطل! لاحظ الخيار الصحيح المظلل بالأخضر، ونكمل درسنا معاً 👏' : 'Good try! Notice the correct green option, let us continue our lesson together! 👏');
      playSaraVoice(immediateAudio);
    }
  };

  return (
    <div className={`min-h-screen bg-[#F8FAFC] flex flex-col ${isRtl ? 'font-arabic' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* ======================================================== */}
      {/* 1. TOP HEADER & SARA AVATAR CARD */}
      {/* ======================================================== */}
      <header className="bg-white border-b-2 border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          {/* Back button */}
          <button
            onClick={() => {
              cancelAllSpeech();
              if (recognitionRef.current) {
                try { recognitionRef.current.abort(); } catch (e) {}
              }
              onBack();
            }}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#002147] transition-all cursor-pointer flex items-center gap-1.5"
            title={isRtl ? 'العودة للرئيسية' : 'Back to Home'}
          >
            {isRtl ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
            <span className="text-xs font-black hidden sm:inline">{isRtl ? 'الرئيسية' : 'Home'}</span>
          </button>

          {/* Sara Avatar & Identity Card */}
          <div className="flex items-center gap-3 flex-1 justify-center sm:justify-start">
            <div className="relative">
              {/* Illustrated Avatar in Warm Modest Style with Pure White Hijab Framing Face */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#C49E3A] via-[#855B14] to-[#002147] p-0.5 shadow-md flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 100 100" className="w-full h-full rounded-full bg-[#002147]">
                  {/* Background Royal Navy Circle */}
                  <circle cx="50" cy="50" r="48" fill="#002147" />
                  
                  {/* Outer White Hijab Drape framing the head */}
                  <path d="M 22 45 C 22 24 34 14 50 14 C 66 14 78 24 78 45 C 78 68 82 86 85 96 C 75 99 25 99 15 96 C 18 86 22 68 22 45 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />
                  
                  {/* Warm Glowing Face Oval */}
                  <ellipse cx="50" cy="48" rx="19" ry="22" fill="#FFE4D4" />
                  
                  {/* Pure White Forehead Undercap Band with Gold Ribbon */}
                  <path d="M 32 37 C 38 31 62 31 68 37 C 62 34 38 34 32 37 Z" fill="#FFFFFF" />
                  <path d="M 33 36 Q 50 31 67 36" stroke="#C49E3A" strokeWidth="1.5" strokeLinecap="round" fill="none" />

                  {/* Soft Warm Chestnut Hair Accent Strands */}
                  <path d="M 35 38 Q 42 41 46 38" stroke="#362013" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                  
                  {/* Eyes */}
                  <ellipse cx="43" cy="46" rx="2.5" ry="3.2" fill="#2d1c12" />
                  <ellipse cx="57" cy="46" rx="2.5" ry="3.2" fill="#2d1c12" />
                  <circle cx="44.2" cy="45" r="1" fill="#ffffff" />
                  <circle cx="58.2" cy="45" r="1" fill="#ffffff" />
                  
                  {/* Eyebrows (Warm Dark Brown) */}
                  <path d="M 39 41 Q 43 39 47 41" stroke="#362013" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                  <path d="M 53 41 Q 57 39 61 41" stroke="#362013" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                  
                  {/* Gentle warm smile */}
                  <path d="M 44 56 Q 50 62 56 56" stroke="#DE5264" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                  
                  {/* Rosy peach cheeks */}
                  <circle cx="37" cy="52" r="3.2" fill="#FF8A80" opacity="0.6" />
                  <circle cx="63" cy="52" r="3.2" fill="#FF8A80" opacity="0.6" />
                  
                  {/* Pure White Scarf Wrap Around Chin and Neck */}
                  <path d="M 31 56 C 34 68 45 73 50 73 C 55 73 66 68 69 56 C 73 66 74 88 74 95 C 62 98 38 98 26 95 C 26 88 27 66 31 56 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />
                  <path d="M 38 72 Q 50 78 62 72" stroke="#C49E3A" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                </svg>
              </div>

              {/* Speaking Indicator Ripple Animation */}
              {isSpeaking && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#58cc02] opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-[#58cc02] border-2 border-white items-center justify-center text-[8px] text-white">
                    🔊
                  </span>
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h1 className="text-sm sm:text-base font-black text-[#002147] leading-tight">
                  {isRtl ? 'سارة – معلمتك 👩‍🏫' : 'Sara – Your English Tutor 👩‍🏫'}
                </h1>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] font-black rounded-full border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {isRtl ? 'متصلة الآن' : 'Online'}
                </span>
                {/* Auto-save & offline safety badge */}
                <span 
                  className={`px-2 py-0.5 rounded-full border text-[9px] font-bold transition-all flex items-center gap-1 ${
                    isSavedBadgeVisible
                      ? 'bg-blue-100 text-blue-900 border-blue-300 ring-2 ring-blue-300/40 font-black'
                      : 'bg-slate-100 text-slate-500 border-slate-200'
                  }`}
                  title={isRtl ? 'محادثتك محفوظة تلقائياً في جهازك والسحابة حتى لو انقطع النت أو أغلقت الصفحة' : 'Chat is automatically saved offline and in the cloud'}
                >
                  <span>💾</span>
                  <span className="hidden xs:inline">{isRtl ? (isSavedBadgeVisible ? 'تم الحفظ 💾' : 'محفوظة تلقائياً') : 'Auto-saved'}</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-bold">
                {isRtl ? 'معلمتك الخليجية الذكية لتعلم الإنجليزية بمتعة' : 'Your personal smart English tutor'}
              </p>
            </div>
          </div>

          {/* Mobile Essential Quick Bar (sm:hidden) */}
          <div className="flex sm:hidden items-center gap-1">
            {/* Sara Arabic/English Language Toggle Button (Mobile) */}
            <button
              onClick={() => handleToggleLanguage()}
              className="px-2 py-1.5 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-[#002147] border-amber-300 shadow-2xs active:scale-95"
              title={activeLang === 'ar' ? 'التبديل إلى English' : 'التبديل إلى عربي'}
            >
              <span className="text-xs">🌐</span>
              <span className="text-[11px] font-black">{activeLang === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            {/* Academy Curriculums Hub Button (Mobile) */}
            <button
              onClick={() => setIsCurriculumModalOpen(true)}
              className={`p-2 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-center ${
                activeCurriculumLesson
                  ? 'bg-amber-100 text-amber-950 border-[#C49E3A] ring-1 ring-amber-400'
                  : 'bg-amber-50 hover:bg-amber-100 text-[#002147] border-amber-300'
              }`}
              title={isRtl ? 'مناهج الأكاديمية' : 'Curriculums'}
            >
              <BookOpen size={15} className="text-[#C49E3A]" />
            </button>

            {/* Live voice quick button */}
            <button
              onClick={toggleLiveVoiceMode}
              className={`p-2 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-center ${
                isLiveMode
                  ? 'bg-rose-500 border-rose-600 text-white animate-pulse'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
              }`}
              title={isLiveMode ? (isRtl ? 'إيقاف اللايف' : 'Stop Live') : (isRtl ? 'محادثة لايف' : 'Live Voice')}
            >
              <Radio size={15} className={isLiveMode ? 'animate-spin text-white' : ''} />
            </button>

            {/* Smart Whiteboard Button */}
            <button
              onClick={() => {
                if (isWhiteboardOpen) {
                  setIsWhiteboardOpen(false);
                } else {
                  openWhiteboardModal();
                }
              }}
              className={`p-2 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-center ${
                isWhiteboardOpen
                  ? 'bg-amber-100 text-amber-900 border-[#C49E3A]'
                  : 'bg-amber-50 text-[#855B14] border-amber-300'
              }`}
              title={isRtl ? 'السبورة الذكية' : 'Smart Whiteboard'}
            >
              <Sparkles size={15} className={`text-[#C49E3A] ${isWhiteboardOpen ? 'animate-spin' : ''}`} />
            </button>

            {/* Sara 3D Character Button */}
            <button
              onClick={() => setIsSara3DOpen(!isSara3DOpen)}
              className={`p-2 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-center text-xs ${
                isSara3DOpen
                  ? 'bg-amber-100 border-[#C49E3A] ring-1 ring-amber-300'
                  : 'bg-slate-50 border-slate-200'
              }`}
              title={isRtl ? 'سارة 3D' : 'Sara 3D'}
            >
              <span className="text-sm">👩‍🏫</span>
            </button>

            {/* Voice Mute/Unmute */}
            <button
              onClick={() => {
                if (isSpeaking) cancelAllSpeech();
                setVoiceEnabled(!voiceEnabled);
              }}
              className={`p-2 rounded-xl border-2 transition-all cursor-pointer ${
                voiceEnabled ? 'bg-amber-50 text-[#002147] border-amber-200' : 'bg-slate-100 text-slate-400 border-slate-200'
              }`}
              title={voiceEnabled ? (isRtl ? 'الصوت مفعّل' : 'Mute') : (isRtl ? 'الصوت مكتوم' : 'Unmute')}
            >
              {voiceEnabled ? <Volume2 size={15} className="text-[#C49E3A]" /> : <VolumeX size={15} />}
            </button>
          </div>

          {/* Desktop Right Controls (hidden sm:flex) */}
          <div className="hidden sm:flex items-center gap-1.5 sm:gap-2 flex-wrap justify-end">
            {/* 🌐 Sara Arabic / English Bilingual Dual Toggle Button */}
            <div className="flex items-center bg-slate-100/90 p-0.5 rounded-2xl border-2 border-slate-200 shadow-xs">
              <button
                onClick={() => {
                  if (activeLang !== 'ar') handleToggleLanguage('ar');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  activeLang === 'ar'
                    ? 'bg-[#002147] text-amber-300 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
                title="التبديل إلى الشرح باللغة العربية"
              >
                <span>🇸🇦</span>
                <span>عربي</span>
              </button>
              <button
                onClick={() => {
                  if (activeLang !== 'en') handleToggleLanguage('en');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  activeLang === 'en'
                    ? 'bg-[#002147] text-amber-300 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
                title="Switch to English Immersion Mode"
              >
                <span>🇬🇧</span>
                <span>English</span>
              </button>
            </div>

            {/* ⏱️ Lesson Duration Timer Pill & Dropdown */}
            <div className="relative" ref={timerDropdownRef}>
              <button
                onClick={() => setShowTimerDropdown(!showTimerDropdown)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-2xl border-2 text-xs font-black transition-all cursor-pointer shadow-sm ${
                  !isTimerEnabled || timerDurationMinutes === 0
                    ? 'bg-slate-50 text-slate-600 border-slate-200'
                    : timerSecondsLeft === 0
                    ? 'bg-rose-100 text-rose-900 border-rose-300 ring-2 ring-rose-400/40 animate-pulse'
                    : timerSecondsLeft < 60
                    ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
                    : timerSecondsLeft < 180
                    ? 'bg-amber-50 text-amber-800 border-amber-300'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                }`}
                title={isRtl ? 'مؤقت الحصة (5 د، 10 د، 15 د)' : 'Lesson Timer (5m, 10m, 15m)'}
              >
                {timerSecondsLeft === 0 ? (
                  <Bell size={14} className="text-rose-600 animate-bounce" />
                ) : (
                  <Clock size={14} className={isTimerRunning && isTimerEnabled && timerDurationMinutes > 0 ? 'text-[#002147] animate-pulse' : 'text-slate-400'} />
                )}

                <span className="font-mono text-xs">
                  {!isTimerEnabled || timerDurationMinutes === 0
                    ? (isRtl ? 'حر ♾️' : 'Open')
                    : formatTimerDisplay(timerSecondsLeft)}
                </span>

                <span className="text-[10px] hidden sm:inline text-slate-500 font-sans">
                  {timerSecondsLeft === 0
                    ? (isRtl ? 'انتهت 🔔' : 'Done')
                    : isRtl
                    ? `(${timerDurationMinutes} د)`
                    : `(${timerDurationMinutes}m)`}
                </span>
              </button>

              {/* Timer Dropdown Menu */}
              {showTimerDropdown && (
                <div className="absolute top-full mt-2 end-0 w-64 bg-white border-2 border-slate-200 rounded-2xl shadow-xl p-3.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-100">
                    <span className="text-xs font-black text-[#002147] flex items-center gap-1.5">
                      <Timer size={15} className="text-[#C49E3A]" />
                      {isRtl ? 'مؤقت الحصة مع سارة' : 'Lesson Timer'}
                    </span>
                    <button
                      onClick={() => setShowTimerDropdown(false)}
                      className="text-slate-400 hover:text-slate-600 text-xs p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-500 font-bold mb-2">
                    {isRtl ? 'اختر مدة الحصة ليرن الجرس عند انتهائها:' : 'Set lesson duration to ring the bell when finished:'}
                  </p>

                  {/* Preset Buttons */}
                  <div className="grid grid-cols-3 gap-1.5 mb-3">
                    {[5, 10, 15].map(mins => (
                      <button
                        key={`preset-${mins}`}
                        onClick={() => selectTimerDuration(mins)}
                        className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                          timerDurationMinutes === mins && isTimerEnabled
                            ? 'bg-[#002147] text-amber-300 border-[#002147] font-black shadow-xs ring-2 ring-amber-300/40'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 font-bold'
                        }`}
                      >
                        <div className="text-sm font-black">{mins}</div>
                        <div className="text-[10px]">{isRtl ? 'دقائق' : 'mins'}</div>
                      </button>
                    ))}
                  </div>

                  {/* Actions inside Dropdown */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    {isTimerEnabled && timerDurationMinutes > 0 && (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={toggleTimerPause}
                          className="flex-1 py-1.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                        >
                          {isTimerRunning ? <Pause size={12} /> : <Play size={12} />}
                          <span>{isTimerRunning ? (isRtl ? 'إيقاف مؤقت' : 'Pause') : (isRtl ? 'استئناف' : 'Resume')}</span>
                        </button>
                        <button
                          onClick={() => extendSessionByMinutes(5)}
                          className="py-1.5 px-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-black flex items-center gap-1 cursor-pointer"
                          title={isRtl ? 'إضافة 5 دقائق إضافية' : 'Add 5 minutes'}
                        >
                          <Plus size={12} />
                          <span>5+ {isRtl ? 'د' : 'm'}</span>
                        </button>
                      </div>
                    )}

                    <button
                      onClick={() => selectTimerDuration(0)}
                      className={`w-full py-1.5 px-2 rounded-xl text-xs font-bold text-center transition-all cursor-pointer ${
                        !isTimerEnabled || timerDurationMinutes === 0
                          ? 'bg-blue-100 text-blue-900 font-black'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      {isRtl ? 'محادثة مفتوحة (بدون مؤقت) ♾️' : 'Open session (No timer) ♾️'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Archive Session Button */}
            <button
              onClick={() => setShowArchiveConfirm(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-2xl border-2 text-xs font-black transition-all cursor-pointer bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300 shadow-2xs"
              title={isRtl ? 'أرشف الجلسة الحالية وبدء محادثة جديدة' : 'Archive current session & start fresh'}
            >
              <Archive size={13} className="text-amber-700" />
              <span className="hidden lg:inline">{isRtl ? 'أرشف الجلسة 📦' : 'Archive Session 📦'}</span>
              <span className="hidden sm:inline lg:hidden">{isRtl ? 'أرشف 📦' : 'Archive 📦'}</span>
            </button>

            {/* Sessions Archive Viewer Button */}
            <button
              onClick={() => {
                fetchArchivedSessions();
                setIsArchiveModalOpen(true);
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-2xl border-2 text-xs font-bold transition-all cursor-pointer bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300 shadow-2xs"
              title={isRtl ? 'استعراض أرشيف جلسات سارة واسترجاعها' : 'View past sessions archive & restore'}
            >
              <History size={13} className="text-slate-500" />
              <span className="hidden lg:inline">{isRtl ? 'الأرشيف 🗂️' : 'Archive 🗂️'}</span>
              <span className="hidden sm:inline lg:hidden">{isRtl ? 'الأرشيف' : 'Archive'}</span>
            </button>

            {/* 📚 Academy Curriculums Hub Button */}
            <button
              onClick={() => setIsCurriculumModalOpen(true)}
              className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-2xl border-2 text-xs font-black transition-all cursor-pointer shadow-sm ${
                activeCurriculumLesson
                  ? 'bg-amber-100 text-amber-950 border-[#C49E3A] ring-2 ring-amber-300/50 shadow-md'
                  : 'bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 text-[#002147] border-amber-300'
              }`}
              title={isRtl ? 'استعراض واختيار مناهج الأكاديمية لتشرحها سارة بالصوت والسبورة 📚' : 'Browse Academy Curriculums'}
            >
              <BookOpen size={14} className="text-[#C49E3A]" />
              <span className="hidden lg:inline">{isRtl ? 'مناهج الأكاديمية 📚' : 'Curriculums 📚'}</span>
              <span className="hidden sm:inline lg:hidden">{isRtl ? 'المناهج 📚' : 'Curricula'}</span>
              {activeCurriculumLesson && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              )}
            </button>

            {/* 🗓️ Smart Academic Study Plan Button */}
            <button
              onClick={() => {
                fetchActiveStudyPlan();
                setIsStudyPlanModalOpen(true);
              }}
              className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-2xl border-2 text-xs font-black transition-all cursor-pointer shadow-sm ${
                activeStudyPlan
                  ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-950 border-blue-400 ring-2 ring-blue-300/40 shadow-xs'
                  : 'bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-[#002147] border-blue-300'
              }`}
              title={isRtl ? 'الخطة الأكاديمية والجدول الدراسي الذكي 🗓️' : 'Smart Academic Study Plan 🗓️'}
            >
              <CalendarDays size={14} className="text-blue-600" />
              <span className="hidden lg:inline">{isRtl ? 'الخطة الدراسية 🗓️' : 'Study Plan 🗓️'}</span>
              <span className="hidden sm:inline lg:hidden">{isRtl ? 'الخطة 🗓️' : 'Plan 🗓️'}</span>
              {activeStudyPlan && (
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              )}
            </button>

            {/* Placement Test Trigger Button */}
            <button
              onClick={startPlacementTest}
              className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-2xl border-2 text-xs font-black transition-all cursor-pointer shadow-sm ${
                placementState.isActive
                  ? 'bg-[#002147] text-amber-300 border-amber-400 ring-2 ring-amber-300/40 animate-pulse'
                  : 'bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-[#002147] border-blue-300'
              }`}
              title={isRtl ? 'اختبار تحديد المستوى الشامل (محادثة + 5 أسئلة + سبلنغ + ربط المناهج)' : 'Comprehensive Placement Test'}
            >
              <Target size={15} className={placementState.isActive ? 'text-amber-300' : 'text-blue-600'} />
              <span className="hidden lg:inline">{isRtl ? 'تحديد المستوى 🎯' : 'Placement Test 🎯'}</span>
              <span className="hidden sm:inline lg:hidden">{isRtl ? 'المستوى 🎯' : 'Test 🎯'}</span>
            </button>

            {/* Sara 3D Floating Character Toggle Button */}
            <button
              onClick={() => setIsSara3DOpen(!isSara3DOpen)}
              className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-2xl border-2 text-xs font-black transition-all cursor-pointer shadow-sm ${
                isSara3DOpen
                  ? 'bg-amber-100 text-amber-900 border-[#C49E3A] ring-2 ring-amber-300/40'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
              title={isRtl ? 'عرض أو إخفاء شخصية سارة ثلاثية الأبعاد 3D العائمة' : 'Toggle 3D Floating Sara Character'}
            >
              <span className="text-sm">👩‍🏫</span>
              <span className="hidden lg:inline">{isRtl ? (isSara3DOpen ? 'سارة 3D نشطة ✨' : 'سارة 3D 👩‍🏫') : 'Sara 3D'}</span>
              <span className="hidden sm:inline lg:hidden">{isRtl ? 'سارة 3D' : '3D'}</span>
            </button>

            {/* Summon Smart Whiteboard Button */}
            <button
              onClick={() => {
                if (isWhiteboardOpen) {
                  setIsWhiteboardOpen(false);
                } else {
                  openWhiteboardModal();
                }
              }}
              className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-2xl border-2 text-xs font-black transition-all cursor-pointer shadow-sm ${
                isWhiteboardOpen
                  ? 'bg-amber-100 text-amber-900 border-[#C49E3A]'
                  : 'bg-gradient-to-r from-amber-50 to-amber-100/60 hover:from-amber-100 hover:to-amber-200 text-[#855B14] border-[#C49E3A]/40'
              }`}
              title={isRtl ? 'استدعاء السبورة الذكية للشرح والكتابة بالطبشور' : 'Summon Smart Whiteboard'}
            >
              <Sparkles size={15} className={`text-[#C49E3A] ${isWhiteboardOpen ? 'animate-spin' : 'animate-pulse'}`} />
              <span className="hidden lg:inline">{isRtl ? 'السبورة الذكية' : 'Whiteboard'}</span>
              <span className="hidden sm:inline lg:hidden">{isRtl ? 'السبورة' : 'Board'}</span>
            </button>

            {/* Live Turn-by-Turn Voice Mode Button */}
            <button
              onClick={toggleLiveVoiceMode}
              className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-2xl border-2 text-xs font-black transition-all cursor-pointer shadow-sm ${
                isLiveMode
                  ? 'bg-rose-500 border-rose-600 text-white animate-pulse'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
              }`}
              title={isRtl ? 'محادثة لايف صوتية مستمرة (رد برد صوتي)' : 'Continuous Live Voice Mode'}
            >
              <Radio size={14} className={isLiveMode ? 'animate-spin' : ''} />
              <span className="hidden lg:inline">{isLiveMode ? (isRtl ? 'اللايف نشط 🔴' : 'Live Active 🔴') : (isRtl ? 'محادثة لايف 🎙️' : 'Live Voice 🎙️')}</span>
              <span className="hidden sm:inline lg:hidden">{isLiveMode ? 'لايف 🔴' : 'لايف 🎙️'}</span>
            </button>

            {/* Tablet Tools Drawer Opener (sm:flex xl:hidden) */}
            <button
              onClick={() => setShowMobileToolsDrawer(true)}
              className="hidden sm:flex xl:hidden items-center gap-1.5 px-2.5 py-1.5 rounded-2xl border-2 text-xs font-black transition-all cursor-pointer shadow-xs bg-amber-50 hover:bg-amber-100 text-[#855B14] border-amber-300"
              title={isRtl ? 'الأدوات التعليمية الإضافية (النطق، السيناريوهات، التقرير، السرعة)' : 'More Learning Tools'}
            >
              <Sliders size={14} className="text-[#C49E3A]" />
              <span>{isRtl ? 'المزيد ⚡' : 'Tools ⚡'}</span>
              {tutorMemory.frequentMistakes && tutorMemory.frequentMistakes.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center">
                  {tutorMemory.frequentMistakes.length}
                </span>
              )}
            </button>

            {/* 🎙️ Phonetic Pronunciation Lab Button (Tablets md: >= 768px & Desktop) */}
            <button
              onClick={() => {
                setPhoneticTargetSentence(activeBoard?.sentence || 'Welcome to Basim Alkhalil Academy');
                setIsPhoneticModalOpen(true);
              }}
              className="hidden md:flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-2xl border-2 text-xs font-black transition-all cursor-pointer shadow-sm bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 text-purple-900 border-purple-200"
              title={isRtl ? 'مختبر مخارج الحروف وتصحيح النطق الصوتي الفوري' : 'Phonetic Pronunciation Lab'}
            >
              <Mic size={14} className="text-purple-600 animate-pulse" />
              <span>{isRtl ? 'مختبر النطق 🎙️' : 'Speech Lab 🎙️'}</span>
            </button>

            {/* 🎭 Role-Play Scenarios Button (Tablets md: >= 768px & Desktop) */}
            <button
              onClick={() => setIsRolePlayModalOpen(true)}
              className={`hidden md:flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-2xl border-2 text-xs font-black transition-all cursor-pointer shadow-sm ${
                activeRolePlay
                  ? 'bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 border-amber-300 ring-2 ring-amber-300/40 shadow-md'
                  : 'bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 text-[#002147] border-indigo-200 hover:border-indigo-300'
              }`}
              title={isRtl ? 'سيناريوهات ومغامرات سارة لسن 12 سنة (ألعاب، كورة، روبوت، فضاء...)' : 'Sara 12YO Role-Play & Adventures'}
            >
              <span className="text-sm">🎮</span>
              <span>{isRtl ? (activeRolePlay ? 'المغامرة نشطة 🎮' : 'سيناريوهات 12 سنة 🎮') : '12Y Adventures 🎮'}</span>
            </button>

            {/* ⚡ Sara Speech Speed Controller (Desktop >= 1280px) */}
            <button
              onClick={() => {
                const nextRate = saraSpeechRate === 1.0 ? 0.8 : saraSpeechRate === 0.8 ? 1.2 : 1.0;
                setSaraSpeechRate(nextRate);
              }}
              className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 rounded-2xl border-2 text-xs font-black transition-all cursor-pointer bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
              title={isRtl ? `سرعة صوت سارة: ${saraSpeechRate}x (اضغط للتغيير: 0.8x هادئ، 1.0x طبيعي، 1.2x سريع)` : `Speech Speed: ${saraSpeechRate}x`}
            >
              <span className="text-xs">{saraSpeechRate === 0.8 ? '🐢 0.8x' : saraSpeechRate === 1.2 ? '🚀 1.2x' : '⚡ 1.0x'}</span>
            </button>

            {/* 📓 My Error Notebook & Progress Hub Button (Tablet Landscape & Desktop >= 1024px) */}
            <button
              onClick={() => setIsNotebookModalOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-2xl border-2 text-xs font-black transition-all cursor-pointer shadow-sm bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 text-[#855B14] border-amber-300"
              title={isRtl ? 'دفتر الملاحظات والأخطاء الشخصي + بنك المفردات + تقرير ولي الأمر 📓' : 'My Error Notebook & Parent Report 📓'}
            >
              <BookMarked size={14} className="text-[#C49E3A]" />
              <span>{isRtl ? 'دفتر الأخطاء 📓' : 'Notebook 📓'}</span>
              {tutorMemory.frequentMistakes && tutorMemory.frequentMistakes.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center">
                  {tutorMemory.frequentMistakes.length}
                </span>
              )}
            </button>

            {/* Streak Badge */}
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 bg-orange-50 border-2 border-orange-200 rounded-2xl text-[#ff9600] font-black text-xs shadow-sm">
              <Flame size={15} className="animate-bounce-slow text-orange-500" />
              <span>{streak.current} {isRtl ? 'يوم' : 'd'}</span>
            </div>

            {/* Voice Toggle Button */}
            <button
              onClick={() => {
                if (isSpeaking) cancelAllSpeech();
                setVoiceEnabled(!voiceEnabled);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl border-2 text-xs font-black transition-all cursor-pointer ${
                voiceEnabled
                  ? 'bg-blue-50 text-[#002147] border-blue-200 shadow-sm'
                  : 'bg-slate-100 text-slate-400 border-slate-200'
              }`}
              title={isRtl ? 'تشغيل أو كتم صوت سارة' : 'Toggle Sara Voice'}
            >
              {voiceEnabled ? <Volume2 size={15} className="text-[#C49E3A]" /> : <VolumeX size={15} />}
            </button>
          </div>
        </div>

        {/* Mobile Segmented Navigation & Tools Bar (sm:hidden) */}
        <div className="sm:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-md px-2.5 py-1.5 flex items-center justify-between gap-1.5 shadow-2xs">
          {/* Main 3 Segmented Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-2xl border border-slate-200/80 flex-1">
            {/* Chat Tab */}
            <button
              onClick={() => {
                setMobileTab('chat');
                setIsWhiteboardOpen(false);
              }}
              className={`flex-1 py-1.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 cursor-pointer ${
                mobileTab === 'chat' && !isWhiteboardOpen
                  ? 'bg-[#002147] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>💬</span>
              <span>{isRtl ? 'المحادثة' : 'Chat'}</span>
            </button>

            {/* Whiteboard Tab */}
            <button
              onClick={() => {
                setMobileTab('board');
                if (!activeBoard) {
                  openWhiteboardModal();
                } else {
                  setIsWhiteboardOpen(true);
                }
              }}
              className={`flex-1 py-1.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 cursor-pointer ${
                isWhiteboardOpen
                  ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>📐</span>
              <span>{isRtl ? 'السبورة' : 'Board'}</span>
            </button>

            {/* Sara 3D Tab */}
            <button
              onClick={() => {
                setMobileTab('sara3d');
                setIsSara3DOpen(!isSara3DOpen);
              }}
              className={`flex-1 py-1.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 cursor-pointer ${
                isSara3DOpen
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>👩‍🏫</span>
              <span>{isRtl ? 'سارة 3D' : 'Sara 3D'}</span>
            </button>
          </div>

          {/* Quick Action Sheet Opener (⚡ المزيد من الأدوات) */}
          <button
            onClick={() => setShowMobileToolsDrawer(true)}
            className="py-1.5 px-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#855B14] border border-amber-300 font-black text-xs flex items-center gap-1 cursor-pointer shrink-0 transition-all shadow-2xs active:scale-95"
            title={isRtl ? 'الأدوات والأنشطة الإضافية (النطق، السيناريوهات، التقرير...)' : 'More Learning Tools'}
          >
            <Sliders size={13} className="text-[#C49E3A]" />
            <span className="text-[11px] font-black">{isRtl ? 'الأدوات' : 'Tools'}</span>
            {tutorMemory.frequentMistakes && tutorMemory.frequentMistakes.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center">
                {tutorMemory.frequentMistakes.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. MAIN CONTENT AREA (BOARD + CHAT) */}
      {/* ======================================================== */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-3 sm:p-5 flex flex-col gap-4 overflow-hidden">
        
        {/* ======================================================== */}
        {/* 2A-000. ACTIVE ACADEMIC STUDY PLAN BANNER (HUD) */}
        {/* ======================================================== */}
        {activeStudyPlan && !isStudyPlanBannerDismissed && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-900 via-[#002147] to-indigo-950 text-white p-3.5 sm:p-4 rounded-3xl shadow-xl border-2 border-blue-400/40 relative overflow-hidden"
          >
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center justify-center text-xl shrink-0 shadow-inner">
                  🗓️
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="px-2 py-0.5 rounded-md bg-blue-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                      {isRtl ? 'خطتك الدراسية النشطة' : 'Active Study Plan'}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-blue-200 font-bold hidden sm:inline">
                      {activeStudyPlan.studentName ? (isRtl ? `طالب: ${activeStudyPlan.studentName}` : `Student: ${activeStudyPlan.studentName}`) : ''}
                    </span>
                  </div>
                  {todayScheduledLesson ? (
                    <p className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5 flex-wrap">
                      <span className="text-blue-200 font-bold">{isRtl ? 'درس اليوم المحدد:' : "Today's Lesson:"}</span>
                      <span className="text-amber-300 underline underline-offset-2">{todayScheduledLesson.topic}</span>
                      <span className="text-[10px] px-2 py-0.2 rounded-md bg-white/10 text-slate-200 font-normal">
                        {todayScheduledLesson.courseLabel}
                      </span>
                    </p>
                  ) : (
                    <p className="text-xs text-blue-100 font-bold">
                      {isRtl ? `الخطة جاهزة وتضم ${activeStudyPlan.planItems?.length || 0} درساً` : `Plan ready with ${activeStudyPlan.planItems?.length || 0} lessons`}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                {todayScheduledLesson && (
                  <button
                    onClick={() => handleStartPlanLesson(todayScheduledLesson)}
                    className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>🚀</span>
                    <span>{isRtl ? 'ابدأ درس اليوم مع سارة' : "Start Today's Lesson"}</span>
                  </button>
                )}
                <button
                  onClick={() => setIsStudyPlanModalOpen(true)}
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer border border-white/15"
                  title={isRtl ? 'عرض وتعديل الخطة كاملة' : 'View Full Plan'}
                >
                  <CalendarDays size={13} />
                  <span>{isRtl ? 'عرض الخطة 🗓️' : 'Full Plan'}</span>
                </button>
                <button
                  onClick={() => setIsStudyPlanBannerDismissed(true)}
                  className="p-1.5 text-blue-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  title={isRtl ? 'إخفاء مؤقت' : 'Hide'}
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* 2A-00. ACTIVE ACADEMY CURRICULUM LESSON BANNER */}
        {/* ======================================================== */}
        {activeCurriculumLesson && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-amber-500/15 via-amber-400/25 to-amber-500/15 border-2 border-amber-400/70 rounded-3xl p-3 sm:p-4 shadow-xs flex items-center justify-between gap-3 flex-wrap"
          >
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-2xl bg-[#002147] text-amber-300 flex items-center justify-center text-lg shrink-0 shadow-xs">
                📚
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#002147] text-amber-300">
                    {activeCurriculumLesson.level}
                  </span>
                  <span className="text-xs sm:text-sm font-black text-[#002147] truncate">
                    {isRtl ? activeCurriculumLesson.titleAr : activeCurriculumLesson.titleEn}
                  </span>
                  <span className="text-[11px] text-slate-600 font-bold hidden sm:inline">
                    • {isRtl ? activeCurriculumLesson.courseLabelAr : activeCurriculumLesson.courseLabelEn}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-[#002147] text-amber-300 font-black text-[10px] shadow-2xs">
                    <span>📚</span>
                    <span>{isRtl ? `دروس اليوم: درس ${currentDailyLessonIndex + 1} من ${todayScheduledLessons.length}` : `Today: Lesson ${currentDailyLessonIndex + 1} of ${todayScheduledLessons.length}`}</span>
                  </div>

                  {/* Daily Target Switcher (1, 2, or 3 lessons per day) */}
                  <div className="flex items-center gap-1 bg-white/80 border border-amber-300/80 rounded-lg p-0.5 text-[10px]">
                    <span className="text-slate-500 font-bold px-1">{isRtl ? 'المقرر:' : 'Daily:'}</span>
                    {[1, 2, 3].map((num) => (
                      <button
                        key={num}
                        onClick={() => {
                          setDailyLessonsTarget(num);
                          try {
                            localStorage.setItem('sara_daily_lessons_target', String(num));
                          } catch (_) {}
                        }}
                        className={`px-1.5 py-0.5 rounded font-black transition-all cursor-pointer ${
                          dailyLessonsTarget === num
                            ? 'bg-[#002147] text-amber-300 shadow-2xs'
                            : 'text-slate-600 hover:bg-amber-100'
                        }`}
                        title={isRtl ? `تحديد ${num} دروس لليوم` : `${num} lessons per day`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 truncate mt-0.5">
                  {isRtl ? 'المنهج المشروح حالياً مع سارة بالصوت والكتابة على السبورة الذكية 👩‍🏫📐' : 'Active curriculum lesson being explained by Sara'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
              {isSessionTimeUp || timerSecondsLeft === 0 ? (
                <button
                  onClick={() => handleCompleteAndSaveLesson()}
                  disabled={isSavingLessonResult}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:brightness-110 text-white font-black text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95 border border-emerald-400/50"
                  title={isRtl ? 'اكتمل وقت الحصة! إنهاء وتسجيل النتيجة 🎓' : 'Time is up! Finish Lesson & Record Result 🎓'}
                >
                  <Trophy size={14} className="text-amber-300 animate-bounce" />
                  <span>{isRtl ? 'إنهاء الدرس وحفظ النتيجة 🎓' : 'Finish & Save Result 🎓'}</span>
                </button>
              ) : (
                <>
                  <div className="px-2.5 py-1 rounded-xl bg-amber-400/20 text-[#002147] font-black text-xs flex items-center gap-1.5 border border-amber-400/50">
                    <Clock size={13} className="text-amber-600 animate-pulse" />
                    <span>{isRtl ? `الحصة مستمرة: باقي ${formatTimerDisplay(timerSecondsLeft)}` : `Session in progress: ${formatTimerDisplay(timerSecondsLeft)}`}</span>
                  </div>
                  <button
                    onClick={() => handleCompleteAndSaveLesson()}
                    disabled={isSavingLessonResult}
                    className="px-2.5 py-1.5 rounded-xl bg-white/70 hover:bg-white text-slate-600 hover:text-slate-900 font-bold text-xs transition-all cursor-pointer flex items-center gap-1 border border-slate-300/80 active:scale-95"
                    title={isRtl ? 'إنهاء مبكر وحفظ التقدم' : 'Finish early and save'}
                  >
                    <Trophy size={12} className="text-amber-500" />
                    <span>{isRtl ? 'إنهاء مبكر' : 'Finish early'}</span>
                  </button>
                </>
              )}
              <div className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs border border-slate-300">
                <span>📄</span>
                <span>{isRtl ? `صفحة ${currentWhiteboardPageIndex + 1} من 6` : `Page ${currentWhiteboardPageIndex + 1} of 6`}</span>
              </div>
              <button
                onClick={() => {
                  setIsWhiteboardOpen(true);
                  if (currentWhiteboardPageIndex < 5) {
                    setCurrentWhiteboardPageIndex(prev => prev + 1);
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-105 active:scale-95 text-slate-950 font-black text-xs transition-all cursor-pointer flex items-center gap-1 shadow-sm ring-2 ring-amber-300/40"
                title={isRtl ? 'اقلب صفحة السبورة للشرح التالي' : 'Turn whiteboard slide'}
              >
                <span>📄</span>
                <span>{isRtl ? 'اقلب الصفحة ➔' : 'Turn Page ➔'}</span>
              </button>
              <button
                onClick={() => {
                  setIsWhiteboardOpen(true);
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition-all cursor-pointer flex items-center gap-1 shadow-2xs active:scale-95"
                title={isRtl ? 'فتح السبورة الذكية والشرح خطوة بخطوة' : 'Open whiteboard step-by-step'}
              >
                <span>📐🎙️</span>
                <span>{isRtl ? 'السبورة خطوة بخطوة' : 'Step-by-step'}</span>
              </button>
              <button
                onClick={() => setIsCurriculumModalOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-[#002147] border border-slate-300 font-black text-xs transition-all cursor-pointer shadow-2xs"
                title={isRtl ? 'تغيير المنهج واختيار درس آخر' : 'Change curriculum lesson'}
              >
                <span>{isRtl ? 'تغيير المنهج 🔄' : 'Change 🔄'}</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* 2A-0. ROLE-PLAY ACTIVE SCENARIO SIMULATION BANNER (12Y GAMING HUD) */}
        {/* ======================================================== */}
        {activeRolePlay && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-slate-950 via-[#002147] to-slate-950 text-white p-3.5 sm:p-4 rounded-3xl shadow-xl border-2 border-amber-400/50 relative overflow-hidden ring-1 ring-amber-400/20"
          >
            {/* Top Bar: Title & Exit */}
            <div className="flex items-center justify-between gap-2 mb-2.5 flex-wrap">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl p-1.5 bg-amber-400 text-slate-950 rounded-2xl border border-amber-300 shadow-md">
                  {activeRolePlay.badge}
                </span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider">
                      {isRtl ? 'مغامرة ومحاكاة حية 🎮' : 'Live Scenario Quest 🎮'}
                    </span>
                    <span className="px-1.5 py-0.2 rounded-md bg-emerald-500/20 text-emerald-300 text-[9px] font-black border border-emerald-400/30">
                      12Y
                    </span>
                  </div>
                  <h2 className="text-sm sm:text-base font-black text-white">
                    {isRtl ? activeRolePlay.titleAr : activeRolePlay.titleEn}
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] bg-white/10 px-2.5 py-1 rounded-xl text-slate-200 font-bold border border-white/10 flex items-center gap-1">
                  <span>📍</span>
                  <span>{activeRolePlay.location}</span>
                </span>
                <button
                  onClick={handleEndRolePlay}
                  className="px-2.5 py-1 bg-rose-500/80 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                >
                  {isRtl ? 'إنهاء السيناريو ✕' : 'Exit Quest ✕'}
                </button>
              </div>
            </div>

            {/* Roles info */}
            <div className="grid grid-cols-2 gap-2 bg-black/40 border border-white/10 rounded-2xl p-2 text-xs mb-3">
              <div className="text-center py-1">
                <span className="text-slate-400 text-[10px] block font-bold">{isRtl ? 'دورك أنت:' : 'Your Role:'}</span>
                <span className="font-black text-emerald-300">{isRtl ? activeRolePlay.roleStudentAr : activeRolePlay.roleStudentEn}</span>
              </div>
              <div className="text-center py-1 border-s border-white/15">
                <span className="text-slate-400 text-[10px] block font-bold">{isRtl ? 'دور سارة:' : 'Sara Role:'}</span>
                <span className="font-black text-amber-300">{isRtl ? activeRolePlay.roleSaraAr : activeRolePlay.roleSaraEn}</span>
              </div>
            </div>

            {/* Mission Completion Progress Bar */}
            <div className="mb-2.5">
              <div className="flex items-center justify-between text-[11px] font-black text-amber-200 mb-1">
                <span>{isRtl ? 'مهام المحادثة المستهدفة:' : 'Target Missions:'}</span>
                <span className="text-[10px] text-slate-300 font-bold">
                  {completedMissions.length} / {activeRolePlay.missionsAr?.length || 3} {isRtl ? 'مكتملة' : 'Completed'}
                </span>
              </div>
              {/* Progress track */}
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-500"
                  style={{ width: `${Math.min(100, (completedMissions.length / (activeRolePlay.missionsAr?.length || 3)) * 100)}%` }}
                />
              </div>
            </div>

            {/* Scenario Completion Celebration Banner */}
            {completedMissions.length >= (activeRolePlay.missionsAr?.length || 3) && (
              <div className="bg-gradient-to-r from-amber-500/30 via-emerald-500/30 to-amber-500/30 border-2 border-amber-300/80 rounded-2xl p-2.5 mb-3 text-center shadow-lg animate-pulse">
                <span className="text-xs sm:text-sm font-black text-amber-200 flex items-center justify-center gap-1.5">
                  <span>🏆</span>
                  <span>{isRtl ? 'كفو يا بطل! أتممت جميع مهام هذا السيناريو بامتياز وطلاقة! 🌟' : 'Bravo! You mastered all missions in this scenario! 🌟'}</span>
                </span>
              </div>
            )}

            {/* Missions List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5 mb-3">
              {(isRtl ? activeRolePlay.missionsAr : activeRolePlay.missionsEn).map((mission, mIdx) => {
                const isDone = completedMissions.includes(mIdx);
                return (
                  <div key={`mission-${mIdx}`} className={`flex items-center gap-2 text-xs px-2.5 py-1.5 rounded-xl border transition-all ${
                    isDone 
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' 
                      : 'bg-black/30 border-white/5 text-slate-200'
                  }`}>
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                      isDone ? 'bg-emerald-400 text-slate-950' : 'bg-white/20 text-slate-300'
                    }`}>
                      {isDone ? '✓' : mIdx + 1}
                    </span>
                    <span className={`flex-1 font-bold truncate ${isDone ? 'line-through opacity-80' : ''}`} title={mission}>
                      {mission}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Starter Suggestions Chips */}
            {activeRolePlay.starterPrompts && activeRolePlay.starterPrompts.length > 0 && (
              <div>
                <span className="text-[10px] text-slate-300 block mb-1 font-bold">
                  {isRtl ? '💡 جمل مقترحة للرد فوراً (اضغط للإرسال والمحادثة):' : '💡 Suggested quick replies (tap to speak):'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeRolePlay.starterPrompts.map((prompt, pIdx) => (
                    <button
                      key={`rp-p-${pIdx}`}
                      onClick={() => handleSendMessage(prompt)}
                      className="text-[11px] bg-white/10 hover:bg-amber-400 hover:text-slate-950 text-slate-100 px-2.5 py-1 rounded-xl transition-all cursor-pointer font-bold border border-white/10"
                    >
                      "{prompt}"
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* 2A-1. GENTLE HESITATION REASSURANCE TOAST */}
        {/* ======================================================== */}
        <AnimatePresence>
          {showHesitationEncouragement && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 p-3 rounded-2xl shadow-sm flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-amber-400 text-white flex items-center justify-center text-sm font-black shrink-0 animate-bounce">
                🌟
              </div>
              <div className="flex-1">
                <p className="text-xs font-black text-[#855B14]">
                  {hesitationHintText}
                </p>
              </div>
              <button
                onClick={() => setShowHesitationEncouragement(false)}
                className="text-slate-400 hover:text-slate-600 text-xs px-2 py-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* ======================================================== */}
        {/* 2A. INTERACTIVE "LESSON BOARD" CARD */}
        {/* ======================================================== */}
        <AnimatePresence>
          {activeBoard && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border-2 border-b-4 border-slate-200 rounded-3xl p-4 sm:p-5 shadow-sm relative overflow-hidden"
            >
              {/* Board Header Ribbon */}
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-amber-50 text-[#C49E3A] flex items-center justify-center font-black text-xs border border-amber-200">
                    📋
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      {isRtl ? 'لوحة الدرس التفاعلية' : 'Lesson Board'}
                    </span>
                    <h2 className="text-xs sm:text-sm font-black text-[#002147] leading-tight">
                      {activeBoard.title || (isRtl ? 'المهارة المستهدفة 🎯' : 'Target Skill 🎯')}
                    </h2>
                  </div>
                </div>

                {/* Header buttons: Speak + Summon Whiteboard + Save Board */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={openWhiteboardModal}
                    className="p-1.5 px-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 transition-all cursor-pointer flex items-center gap-1 text-xs font-black shadow-2xs active:scale-95"
                    title={isRtl ? 'حفظ لوحة الشرح وتلوينها كصورة 📸' : 'Save Whiteboard as Image 📸'}
                  >
                    <Camera size={13} className="text-slate-900" />
                    <span className="hidden sm:inline">{isRtl ? 'حفظ اللوحة 📸' : 'Save Board 📸'}</span>
                  </button>

                  <button
                    onClick={openWhiteboardModal}
                    className="p-1.5 px-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#855B14] border border-amber-200 transition-all cursor-pointer flex items-center gap-1 text-xs font-bold shadow-2xs"
                    title={isRtl ? 'استدعاء السبورة الذكية للشرح الكامل وتغيير الألوان' : 'Open Whiteboard'}
                  >
                    <Sparkles size={13} className="text-[#C49E3A]" />
                    <span className="hidden sm:inline">{isRtl ? 'السبورة الذكية' : 'Whiteboard'}</span>
                  </button>

                  {activeBoard.sentence && (
                    <>
                      <button
                        onClick={() => {
                          setPhoneticTargetSentence(activeBoard.sentence!);
                          setIsPhoneticModalOpen(true);
                        }}
                        className="p-1.5 px-2.5 rounded-xl bg-violet-50 hover:bg-violet-100 text-violet-800 border border-violet-200 transition-all cursor-pointer flex items-center gap-1 text-xs font-bold shadow-2xs"
                        title={isRtl ? 'تحليل ومقارنة نطقك الصوتي للجملة مع سارة' : 'Analyze your pronunciation with Sara'}
                      >
                        <Mic size={13} className="text-violet-600 animate-pulse" />
                        <span className="hidden sm:inline">{isRtl ? 'حلّل نطقي 🎙️' : 'Analyze Speech 🎙️'}</span>
                      </button>

                      <button
                        onClick={() => playSaraVoice(activeBoard.sentence!)}
                        className="p-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-[#002147] border border-slate-200 transition-all cursor-pointer"
                        title={isRtl ? 'استمع لنطق الجملة' : 'Listen to sentence'}
                      >
                        <Volume2 size={16} className="text-[#C49E3A]" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Target Sentence Display with Glow Highlight */}
              {activeBoard.sentence && (
                <div className="bg-[#002147] text-white p-3.5 sm:p-4 rounded-2xl shadow-inner mb-3 text-center">
                  <p className="text-base sm:text-lg font-bold tracking-wide font-sans">
                    {(() => {
                      const isAwaitingQuiz = (!!activeBoard.quiz && quizSelectedOption === null) || 
                        (placementState.isActive && placementState.stage === 'quiz' && placementQuizSelected === null);
                      const shouldHighlight = !isAwaitingQuiz && !!activeBoard.highlight;

                      return activeBoard.sentence.split(shouldHighlight ? activeBoard.highlight! : '___NON_EXISTENT___').map((part, i, arr) => (
                        <React.Fragment key={`sentence-part-${i}`}>
                          <span>{part}</span>
                          {i < arr.length - 1 && shouldHighlight && (
                            <span className="px-2 py-0.5 bg-[#C49E3A] text-slate-900 rounded-lg font-black shadow-sm mx-1 animate-pulse inline-block">
                              {activeBoard.highlight}
                            </span>
                          )}
                        </React.Fragment>
                      ));
                    })()}
                  </p>
                </div>
              )}

              {/* Gentle Correction Card: Red crossed out -> Green correct (hidden if awaiting quiz to prevent cheating) */}
              {activeBoard.correction && (!activeBoard.quiz || quizSelectedOption !== null) && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 mb-3 flex flex-col sm:flex-row items-center justify-around gap-2 text-xs sm:text-sm">
                  <div className="flex items-center gap-1.5 text-rose-600 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200">
                    <XCircle size={15} className="shrink-0" />
                    <span className="line-through font-bold opacity-80">{activeBoard.correction.wrong}</span>
                  </div>
                  <span className="text-slate-400 font-black text-base">➔</span>
                  <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 font-black">
                    <CheckCircle2 size={15} className="shrink-0 text-emerald-600" />
                    <span>{activeBoard.correction.right}</span>
                  </div>
                </div>
              )}

              {/* Interactive Mini-Quiz inside the Board with Floating 30s Countdown Timer */}
              {activeBoard.quiz && (
                <div className="relative bg-amber-50/60 border-2 border-amber-200 rounded-2xl p-3.5 sm:p-4 shadow-sm">
                  {/* Floating 30s Timer Badge (المؤقت العائم بجانب السؤال) */}
                  <div className="absolute -top-3 end-4 z-10">
                    {!chatQuizStarted ? (
                      <button
                        onClick={() => setChatQuizStarted(true)}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-400 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[11px] shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer animate-pulse"
                        title={isRtl ? 'بدء العد التنازلي 30 ثانية' : 'Start 30s Timer'}
                      >
                        <Play size={10} className="fill-slate-950" />
                        <span>{isRtl ? 'ابدأ المؤقت ▶️ (30ث)' : 'Start Timer ▶️ (30s)'}</span>
                      </button>
                    ) : (
                      <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border shadow-sm backdrop-blur-md font-mono font-black text-[11px] transition-all ${
                        chatQuizTimeUp 
                          ? 'bg-rose-600 text-white border-rose-300 animate-bounce' 
                          : chatQuizTimeLeft <= 5 
                            ? 'bg-rose-500 text-white border-rose-300 animate-pulse' 
                            : chatQuizTimeLeft <= 10 
                              ? 'bg-amber-400 text-slate-950 border-amber-200' 
                              : 'bg-[#002147] text-amber-300 border-amber-300/40'
                      }`}>
                        <Timer size={12} className={!chatQuizTimeUp && chatQuizTimeLeft <= 10 ? 'animate-spin' : ''} />
                        <span>{chatQuizTimeUp ? (isRtl ? 'انتهى الوقت ⏱️' : 'Time Up! ⏱️') : `${chatQuizTimeLeft} ثانية`}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-5 h-5 rounded-full bg-[#C49E3A] text-white text-[10px] font-black flex items-center justify-center shrink-0">?</span>
                      <p className="text-xs sm:text-sm font-black text-[#002147] truncate">
                        {activeBoard.quiz.question}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        if (activeBoard.quiz?.question) {
                          playSaraVoice(activeBoard.quiz.question);
                          setChatQuizStarted(true);
                        }
                      }}
                      className="px-2 py-0.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95 shrink-0"
                      title={isRtl ? 'سارة تقرأ السؤال ويبدأ التوقيت' : 'Sara reads question & starts timer'}
                    >
                      <Volume2 size={11} className="text-amber-700" />
                      <span>{isRtl ? 'طرح السؤال 🎙️' : 'Read 🎙️'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                    {activeBoard.quiz.options.map((opt, oIdx) => {
                      const isSelected = quizSelectedOption === oIdx;
                      const isCorrect = oIdx === activeBoard.quiz?.answerIndex;
                      
                      let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:border-[#002147] hover:bg-slate-50';
                      if (quizSelectedOption !== null) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-black';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'bg-rose-100 border-rose-400 text-rose-900 line-through';
                        } else {
                          btnStyle = 'bg-white/60 border-slate-200 text-slate-400 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={`quiz-opt-${oIdx}`}
                          disabled={quizSelectedOption !== null}
                          onClick={() => handleQuizOptionClick(oIdx)}
                          className={`p-2.5 rounded-xl border-2 text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {quizSelectedOption !== null && isCorrect && (
                            <Check size={14} className="text-emerald-700" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {quizFeedback && (
                    <motion.p 
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-[11px] font-black mt-2 text-center ${quizFeedback === 'correct' ? 'text-emerald-700' : 'text-amber-800'}`}
                    >
                      {quizFeedback === 'correct' 
                        ? (isRtl ? '🎉 كفو عليك! إجابة ممتازة وصحيحة 100%' : '🎉 Awesome job! That is correct!')
                        : (isRtl ? '👏 محاولة حلوة! لاحظ الإجابة الصحيحة الخضراء أعلاه' : '👏 Good try! Notice the correct green answer above')}
                    </motion.p>
                  )}

                  {quizSelectedOption !== null && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-3 pt-2.5 border-t border-amber-200/60 flex items-center justify-between gap-2 flex-wrap"
                    >
                      <div className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                        <Sparkles size={13} className="text-amber-500" />
                        <span>{isRtl ? 'أحسنت حل التمرين! واصل الدرس:' : 'Great job! Continue your lesson:'}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          onClick={() => {
                            handleSendMessage(isRtl ? 'سارة، اعطيني سؤالاً ثانياً أو تمريناً جديداً لنكمل الدرس 🎯' : 'Sara, give me another challenge or question to continue the lesson 🎯');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:brightness-105 text-slate-950 font-black text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                        >
                          <span>{isRtl ? 'سؤال وتحدي جديد 🎯' : 'Next Challenge 🎯'}</span>
                        </button>
                        <button
                          onClick={() => {
                            if (!activeBoard) {
                              openWhiteboardModal();
                            } else {
                              setIsWhiteboardOpen(true);
                            }
                          }}
                          className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-[#002147] border border-slate-300 font-bold text-xs shadow-2xs flex items-center gap-1 transition-all cursor-pointer active:scale-95"
                        >
                          <span>{isRtl ? 'السبورة الذكية 📐' : 'Smart Board 📐'}</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ======================================================== */}
        {/* 2B. CHAT HISTORY CONTAINER */}
        {/* ======================================================== */}
        <div className="flex-1 bg-white border-2 border-slate-200 rounded-3xl p-3 sm:p-5 overflow-y-auto space-y-3.5 shadow-sm min-h-[280px]">
          {/* Active Placement Test Step Indicator */}
          {placementState.isActive && (
            <div className="bg-gradient-to-r from-[#002147] via-[#09325e] to-[#002147] text-white p-3 sm:p-4 rounded-2xl border-2 border-amber-300/40 shadow-md mb-2">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shadow-xs">🎯</span>
                  <div>
                    <h3 className="text-xs sm:text-sm font-black text-[#FDE68A]">
                      {isRtl ? 'اختبار تحديد المستوى الشامل مع سارة' : 'Comprehensive Placement Test with Sara'}
                    </h3>
                    <p className="text-[10px] text-amber-200/80">
                      {isRtl ? 'محادثة شفهية + 5 أسئلة + سبلنغ + ربط بالمناهج' : 'Speaking + 5 Questions + Spelling + Curriculum Link'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setPlacementState(prev => ({ ...prev, isActive: false }))}
                  className="text-[10px] text-slate-300 hover:text-white px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 transition-all cursor-pointer font-bold"
                >
                  {isRtl ? 'إنهاء الاختبار ✕' : 'Exit Test ✕'}
                </button>
              </div>

              {/* 4 Steps Indicator Bar */}
              <div className="grid grid-cols-4 gap-1.5 text-center text-[10px] font-bold">
                <div className={`p-1.5 rounded-xl border transition-all ${
                  placementState.stage === 'conversation'
                    ? 'bg-amber-400 text-slate-950 border-amber-300 font-black shadow-xs ring-2 ring-amber-300/50'
                    : placementState.stage !== 'idle'
                    ? 'bg-emerald-500/25 text-emerald-300 border-emerald-500/40 font-bold'
                    : 'bg-black/30 text-slate-400 border-white/10'
                }`}>
                  1. {isRtl ? 'محادثة 🎙️' : 'Speaking 🎙️'}
                </div>
                <div className={`p-1.5 rounded-xl border transition-all ${
                  placementState.stage === 'quiz'
                    ? 'bg-amber-400 text-slate-950 border-amber-300 font-black shadow-xs ring-2 ring-amber-300/50'
                    : placementState.stage === 'spelling' || placementState.stage === 'result'
                    ? 'bg-emerald-500/25 text-emerald-300 border-emerald-500/40 font-bold'
                    : 'bg-black/30 text-slate-400 border-white/10'
                }`}>
                  2. {isRtl ? '5 أسئلة 📝' : '5 Quiz 📝'}
                </div>
                <div className={`p-1.5 rounded-xl border transition-all ${
                  placementState.stage === 'spelling'
                    ? 'bg-amber-400 text-slate-950 border-amber-300 font-black shadow-xs ring-2 ring-amber-300/50'
                    : placementState.stage === 'result'
                    ? 'bg-emerald-500/25 text-emerald-300 border-emerald-500/40 font-bold'
                    : 'bg-black/30 text-slate-400 border-white/10'
                }`}>
                  3. {isRtl ? 'سبلنغ ✍️' : 'Spelling ✍️'}
                </div>
                <div className={`p-1.5 rounded-xl border transition-all ${
                  placementState.stage === 'result'
                    ? 'bg-amber-400 text-slate-950 border-amber-300 font-black shadow-xs ring-2 ring-amber-300/50'
                    : 'bg-black/30 text-slate-400 border-white/10'
                }`}>
                  4. {isRtl ? 'المستوى 🎓' : 'Level 🎓'}
                </div>
              </div>
            </div>
          )}

          {messages.map((msg) => {
            const isSara = msg.role === 'sara';

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-2.5 items-end ${isSara ? 'justify-start' : 'justify-end'}`}
              >
                {/* Sara Avatar on her bubbles */}
                {isSara && (
                  <div className="w-8 h-8 rounded-full bg-[#002147] text-white flex items-center justify-center shrink-0 text-xs shadow-sm font-black border border-amber-300">
                    س
                  </div>
                )}

                <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3 sm:p-4 text-xs sm:text-sm relative shadow-sm ${
                  isSara 
                    ? 'bg-slate-50 text-slate-800 border border-slate-200 rounded-bl-sm'
                    : 'bg-[#002147] text-white rounded-br-sm'
                }`}>
                  {/* Message Text */}
                  <p className="leading-relaxed whitespace-pre-wrap font-medium">
                    {msg.text}
                  </p>

                  {/* 📐 Smart Whiteboard Card inside Message Bubble */}
                  {isSara && msg.board && (
                    <div className="mt-3 p-3 rounded-2xl bg-gradient-to-r from-amber-50 to-amber-100/60 border border-amber-300 text-xs text-[#002147] shadow-2xs">
                      <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                        <span className="font-black text-amber-950 flex items-center gap-1.5 text-xs sm:text-sm">
                          <span className="text-base">📐</span>
                          <span>{msg.board.title || (isRtl ? 'سبورة الشرح والتطبيق' : 'Smart Whiteboard')}</span>
                        </span>
                        <div className="flex items-center gap-1">
                          {msg.board.voiceExplanation && (
                            <button
                              onClick={() => {
                                if (msg.board?.voiceExplanation) {
                                  playSaraVoice(msg.board.voiceExplanation);
                                }
                              }}
                              className="px-2 py-1 rounded-xl bg-amber-200/80 hover:bg-amber-300 text-amber-900 font-bold text-[10px] flex items-center gap-1 transition-all cursor-pointer shadow-2xs active:scale-95"
                              title={isRtl ? 'استمع لشرح سارة الصوتي على السبورة' : 'Hear Sara explain'}
                            >
                              <Volume2 size={11} className="text-amber-800" />
                              <span>{isRtl ? 'الشرح 🎙️' : 'Explain'}</span>
                            </button>
                          )}
                          <button
                            onClick={() => {
                              if (msg.board) {
                                setActiveBoard(msg.board);
                                setIsWhiteboardOpen(true);
                              }
                            }}
                            className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-[11px] shadow-xs flex items-center gap-1 transition-all cursor-pointer active:scale-95"
                            title={isRtl ? 'فتح السبورة التفاعلية لهذا الشرح' : 'Open chalkboard for this explanation'}
                          >
                            <Sparkles size={11} className="text-slate-950 animate-pulse" />
                            <span>{isRtl ? 'افتح السبورة 📐' : 'Open Board 📐'}</span>
                          </button>
                        </div>
                      </div>

                      {msg.board.sentence && (
                        <p className="font-mono text-slate-900 font-bold bg-white/80 px-2.5 py-1 rounded-xl border border-amber-200/70 text-[11px] sm:text-xs truncate" dir="ltr">
                          "{msg.board.sentence}"
                        </p>
                      )}

                      {/* Pedagogical Badges inside Bubble */}
                      <div className="flex items-center gap-1.5 flex-wrap mt-2 pt-1.5 border-t border-amber-200/60">
                        {msg.board.formula && (
                          <span className="text-[10px] px-2 py-0.5 rounded-lg bg-white/70 text-[#002147] font-mono font-bold border border-amber-200/60">
                            📐 {msg.board.formula}
                          </span>
                        )}
                        {msg.board.commonPitfall && (
                          <span className="text-[10px] px-2 py-0.5 rounded-lg bg-rose-100 text-rose-800 font-black border border-rose-200">
                            ⚠️ {isRtl ? 'فخ شائع' : 'Pitfall'}
                          </span>
                        )}
                        {msg.board.phoneticBreakdown && (
                          <span className="text-[10px] px-2 py-0.5 rounded-lg bg-teal-100 text-teal-800 font-black border border-teal-200">
                            🎙️ {isRtl ? 'نطق صوتي' : 'Phonetics'}
                          </span>
                        )}
                        {msg.board.quiz && (
                          <span className="text-[10px] px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 font-black border border-emerald-200">
                            🎯 {isRtl ? 'كويز تفاعلي' : 'Quiz'}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions to open an existing academy section */}
                  {isSara && msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200 flex flex-wrap gap-2">
                      {msg.actions.map((act, aIdx) => {
                        const secMeta = SECTION_LABELS[act.sectionId] || { ar: act.sectionId, en: act.sectionId };
                        return (
                          <button
                            key={`action-${aIdx}`}
                            onClick={() => {
                              cancelAllSpeech();
                              onNavigate(act.sectionId as AppView);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#58cc02] hover:bg-[#46a302] active:scale-95 text-white font-black text-xs shadow-sm transition-all cursor-pointer"
                          >
                            <ExternalLink size={13} />
                            <span>{isRtl ? `افتح التمرين: ${secMeta.ar}` : `Open Practice: ${secMeta.en}`}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Bubble Footer: Timestamp & Audio Replay */}
                  <div className="mt-2 flex items-center justify-between gap-3 text-[10px] opacity-70">
                    <span>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>

                    {isSara && (
                      <div className="flex items-center gap-1.5">
                        {/* Quick Pronunciation Practice Button for English text */}
                        {/[a-zA-Z]{3,}/.test(msg.text) && (
                          <button
                            onClick={() => {
                              const englishMatches = msg.text.match(/[A-Za-z0-9 ,.'!?-]{6,}/g);
                              const sentenceToPractice = englishMatches && englishMatches.length > 0 
                                ? englishMatches.sort((a, b) => b.length - a.length)[0].trim() 
                                : msg.text;
                              setPhoneticTargetSentence(sentenceToPractice);
                              setIsPhoneticModalOpen(true);
                            }}
                            className="px-2 py-0.5 rounded-lg bg-violet-100 hover:bg-violet-200 text-violet-800 text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                            title={isRtl ? 'حلل نطقك الصوتي لهذه الجملة وقارنه بسارة' : 'Analyze pronunciation with Sara'}
                          >
                            <Mic size={10} className="text-violet-600" />
                            <span>{isRtl ? 'تمرن على النطق' : 'Speech Lab'}</span>
                          </button>
                        )}

                        <button
                          onClick={() => playSaraVoice(msg.text)}
                          className="p-1 hover:text-[#C49E3A] transition-colors cursor-pointer"
                          title={isRtl ? 'إعادة استماع' : 'Replay audio'}
                        >
                          <Volume2 size={13} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* ======================================================== */}
          {/* 🎯 PLACEMENT TEST INTERACTIVE CARDS INSIDE CHAT */}
          {/* ======================================================== */}
          <AnimatePresence>
            {/* Conversation Turn Prompt Banner */}
            {placementState.isActive && placementState.stage === 'conversation' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-blue-50/80 border-2 border-blue-200 rounded-2xl p-3.5 sm:p-4 text-xs shadow-xs"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-black text-[10px] flex items-center justify-center">🎙️</span>
                    <span className="font-black text-[#002147]">
                      {isRtl ? `المرحلة 1: محادثة شفهية (سؤال ${placementState.conversationTurn + 1} من 2)` : `Stage 1: Speaking (Question ${placementState.conversationTurn + 1} of 2)`}
                    </span>
                  </div>
                  <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-lg">
                    {isRtl ? 'استخدم المايك أو اكتب' : 'Use mic or type'}
                  </span>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {placementState.conversationTurn === 0
                    ? (isRtl ? 'سارة تنتظر إجابتك للتعريف بنفسك وهواياتك بالإنجليزية. تحدث مباشرة بالمايك أو اكتب في الأسفل 🌟' : 'Sara is waiting for you to introduce yourself. Speak with your mic or type below 🌟')
                    : (isRtl ? 'سارة تنتظر إجابتك عن طموحك أو روتينك المفضل. تحدث أو اكتب وسننتقل بعدها لاختبار الـ 5 أسئلة 🎯' : 'Sara is waiting for your goal/routine. Speak or type to proceed to the quiz 🎯')}
                </p>
              </motion.div>
            )}

            {/* Stage 2: 5-Question Diagnostic Quiz Card */}
            {placementState.isActive && placementState.stage === 'quiz' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-amber-50/70 border-2 border-amber-300 rounded-2xl p-4 shadow-sm"
              >
                {(() => {
                  const currentQ = PLACEMENT_5_QUESTIONS[placementState.quizCurrentIndex];
                  if (!currentQ) return null;

                  return (
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-black text-amber-900 bg-amber-200/80 px-2.5 py-1 rounded-xl">
                          {isRtl ? `السؤال ${placementState.quizCurrentIndex + 1} من 5` : `Question ${placementState.quizCurrentIndex + 1} of 5`}
                        </span>
                        <span className="text-[10px] font-black text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-lg">
                          {isRtl ? `المستوى: ${currentQ.levelTarget}` : `Level: ${currentQ.levelTarget}`}
                        </span>
                      </div>

                      <p className="text-sm sm:text-base font-black text-[#002147] mb-1 leading-snug">
                        {currentQ.questionEn}
                      </p>
                      <p className="text-xs text-slate-600 font-bold mb-3">
                        {isRtl ? currentQ.questionAr : 'Select the correct option to complete the sentence:'}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {currentQ.options.map((opt, optIdx) => {
                          const isSelected = placementQuizSelected === optIdx;
                          const isCorrect = optIdx === currentQ.correctIndex;
                          let btnColor = 'bg-white border-slate-200 text-slate-800 hover:border-[#002147] hover:bg-slate-50';
                          if (placementQuizSelected !== null) {
                            if (isCorrect) {
                              btnColor = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-black';
                            } else if (isSelected && !isCorrect) {
                              btnColor = 'bg-rose-100 border-rose-500 text-rose-900 line-through';
                            } else {
                              btnColor = 'bg-white/60 border-slate-200 text-slate-400 opacity-60';
                            }
                          }

                          return (
                            <button
                              key={`pq-opt-${optIdx}`}
                              disabled={placementQuizSelected !== null}
                              onClick={() => handlePlacementQuizAnswer(optIdx)}
                              className={`p-2.5 rounded-xl border-2 text-xs font-bold transition-all text-center flex items-center justify-between px-3 cursor-pointer ${btnColor}`}
                            >
                              <span>{opt}</span>
                              {placementQuizSelected !== null && isCorrect && (
                                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                              )}
                              {placementQuizSelected !== null && isSelected && !isCorrect && (
                                <XCircle size={16} className="text-rose-600 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {placementQuizFeedback && (
                        <motion.div
                          initial={{ opacity: 0, y: 3 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`mt-3 p-2.5 rounded-xl text-xs font-bold ${
                            placementQuizFeedback === 'correct' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-rose-100 text-rose-800 border border-rose-200'
                          }`}
                        >
                          <p>{isRtl ? currentQ.explanationAr : currentQ.explanationEn}</p>
                        </motion.div>
                      )}

                      {placementQuizSelected !== null && (
                        <button
                          type="button"
                          onClick={() => advancePlacementQuiz()}
                          className="mt-3 w-full py-2.5 px-4 bg-gradient-to-r from-[#002147] to-[#1e3a5f] hover:from-[#C49E3A] hover:to-[#a88226] text-white rounded-xl font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer active:scale-98"
                        >
                          <span>
                            {placementState.quizCurrentIndex < 4
                              ? (isRtl ? 'السؤال التالي ➡️' : 'Next Question ➡️')
                              : (isRtl ? 'الانتقال لامتحان السبلنغ ✍️' : 'Proceed to Spelling Exam ✍️')}
                          </span>
                        </button>
                      )}
                    </div>
                  );
                })()}
              </motion.div>
            )}

            {/* Stage 3: Mini Spelling Card */}
            {placementState.isActive && placementState.stage === 'spelling' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-indigo-50/70 border-2 border-indigo-200 rounded-2xl p-4 shadow-sm"
              >
                {(() => {
                  const currentSp = PLACEMENT_SPELLING_ITEMS[placementState.spellingCurrentIndex];
                  if (!currentSp) return null;

                  return (
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-black text-indigo-900 bg-indigo-100 px-2.5 py-1 rounded-xl">
                          {isRtl ? `امتحان السبلنغ: الكلمة ${placementState.spellingCurrentIndex + 1} من 3 ✍️` : `Spelling: Word ${placementState.spellingCurrentIndex + 1} of 3 ✍️`}
                        </span>
                        <button
                          onClick={() => playSaraVoice(
                            currentSp.word,
                            undefined,
                            isRtl ? '🎧 استمع لنطق الكلمة واكتبها في المربع...' : '🎧 Listen to the word and type the spelling...'
                          )}
                          className="px-2.5 py-1 bg-[#C49E3A] hover:bg-[#d8b045] active:scale-95 text-slate-900 font-black text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Volume2 size={14} />
                          <span>{isRtl ? 'استمع للنطق 🔊' : 'Listen 🔊'}</span>
                        </button>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-indigo-100 mb-3 space-y-1">
                        <p className="text-xs text-slate-500 font-bold">{isRtl ? 'استمع لنطق سارة واكتب الكلمة بدقة:' : 'Listen to Sara and type the word:'}</p>
                        <p className="text-sm font-black text-[#002147]">{currentSp.sentenceContext}</p>
                        <p className="text-xs text-indigo-700 font-bold">{isRtl ? `💡 المعنى: ${currentSp.meaningAr}` : `💡 Meaning: ${currentSp.meaningEn}`}</p>
                        <div className="pt-1">
                          <span className="text-[11px] text-slate-400 font-mono tracking-widest">{isRtl ? 'تلميح الأحرف:' : 'Hint:'} {currentSp.hintMask}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={spellingInputText}
                          onChange={(e) => setSpellingInputText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handlePlacementSpellingSubmit(spellingInputText);
                            }
                          }}
                          disabled={spellingFeedback !== null}
                          placeholder={isRtl ? 'اكتب تهجئة الكلمة هنا (مثال: word)...' : 'Type the spelling here...'}
                          className="flex-1 bg-white border-2 border-indigo-200 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs sm:text-sm font-black text-[#002147] tracking-wider focus:outline-none"
                        />
                        <button
                          onClick={() => handlePlacementSpellingSubmit(spellingInputText)}
                          disabled={spellingFeedback !== null || !spellingInputText.trim()}
                          className="px-4 py-2 bg-[#002147] hover:bg-[#C49E3A] disabled:opacity-40 text-white rounded-xl font-black text-xs transition-all shadow-sm cursor-pointer"
                        >
                          {isRtl ? 'تحقق ↵' : 'Check ↵'}
                        </button>
                      </div>

                      {spellingFeedback && (
                        <motion.div
                          initial={{ opacity: 0, y: 3 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`mt-2.5 p-2 rounded-xl text-xs font-black text-center ${
                            spellingFeedback === 'correct' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {spellingFeedback === 'correct'
                            ? (isRtl ? '🎉 كفو! تهجئة صحيحة وممتازة 100%!' : '🎉 Perfect spelling!')
                            : (isRtl ? `👏 التهجئة الصحيحة هي: "${currentSp.word}"` : `👏 The correct spelling is: "${currentSp.word}"`)}
                        </motion.div>
                      )}

                      {spellingFeedback !== null && (
                        <button
                          type="button"
                          onClick={() => advancePlacementSpelling()}
                          className="mt-3 w-full py-2.5 px-4 bg-gradient-to-r from-[#002147] to-[#1e3a5f] hover:from-[#C49E3A] hover:to-[#a88226] text-white rounded-xl font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer active:scale-98"
                        >
                          <span>
                            {placementState.spellingCurrentIndex < 2
                              ? (isRtl ? 'الكلمة التالية ➡️' : 'Next Word ➡️')
                              : (isRtl ? 'عرض النتيجة الشاملة واحتساب المستوى 🏆' : 'View Placement Results 🏆')}
                          </span>
                        </button>
                      )}
                    </div>
                  );
                })()}
              </motion.div>
            )}

            {/* Stage 4: Official Certificate & Linked Curricula Card */}
            {placementState.isActive && placementState.stage === 'result' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-gradient-to-br from-[#002147] via-[#08305c] to-[#002147] text-white border-4 border-[#C49E3A] rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#C49E3A]/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 space-y-4">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C49E3A] to-[#a37f26] text-slate-900 font-black text-xl flex items-center justify-center shadow-lg">
                        🎓
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                          {isRtl ? 'الشهادة المعتمدة لأكاديمية باسم الخليل' : 'Basim Alkhalil Academy Placement'}
                        </span>
                        <h3 className="text-lg sm:text-xl font-black text-white">
                          {isRtl ? 'نتيجة تحديد المستوى وخارطة المناهج' : 'Level Diagnostic & Curriculum Pathway'}
                        </h3>
                      </div>
                    </div>

                    {/* Level Badge */}
                    <div className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 font-black text-base sm:text-lg rounded-2xl shadow-md border-2 border-white/30 flex items-center gap-2">
                      <Trophy size={18} className="text-slate-900" />
                      <span>{isRtl ? `المستوى المعتمد: ${placementState.diagnosedLevel}` : `Level: ${placementState.diagnosedLevel}`}</span>
                    </div>
                  </div>

                  {/* Score Breakdown Pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                    <div className="bg-black/40 p-2.5 rounded-2xl border border-white/10">
                      <span className="text-slate-400 text-[10px] block">{isRtl ? 'المحادثة الشفهية' : 'Speaking'}</span>
                      <span className="text-amber-300 font-black text-sm">{Math.round(placementState.conversationScore)}/30</span>
                    </div>
                    <div className="bg-black/40 p-2.5 rounded-2xl border border-white/10">
                      <span className="text-slate-400 text-[10px] block">{isRtl ? 'الاختبار (5 أسئلة)' : 'Quiz'}</span>
                      <span className="text-amber-300 font-black text-sm">{Math.round(placementState.quizScore)}/50</span>
                    </div>
                    <div className="bg-black/40 p-2.5 rounded-2xl border border-white/10">
                      <span className="text-slate-400 text-[10px] block">{isRtl ? 'امتحان السبلنغ' : 'Spelling'}</span>
                      <span className="text-amber-300 font-black text-sm">{Math.round(placementState.spellingScore)}/20</span>
                    </div>
                    <div className="bg-[#C49E3A]/20 p-2.5 rounded-2xl border border-[#C49E3A]/40">
                      <span className="text-amber-200 text-[10px] block font-bold">{isRtl ? 'المجموع النهائي' : 'Total Score'}</span>
                      <span className="text-[#FDE68A] font-black text-sm">{placementState.totalScore}%</span>
                    </div>
                  </div>

                  {/* LINKED EXISTING CURRICULA ACCORDING TO DIAGNOSED LEVEL */}
                  <div className="bg-black/50 border border-white/15 rounded-2xl p-3.5 space-y-3">
                    <div className="flex items-center gap-2">
                      <Compass size={16} className="text-[#C49E3A]" />
                      <h4 className="text-xs sm:text-sm font-black text-[#FDE68A]">
                        {isRtl ? `وحدات المناهج المعتمدة المخصصة لمستواك (${placementState.diagnosedLevel})` : `Curriculum Units Tailored for ${placementState.diagnosedLevel}`}
                      </h4>
                    </div>

                    {(() => {
                      const lvl = placementState.diagnosedLevel || proficiencyLevel.A1;
                      const rUnit = MASTER_CURRICULUM[CurriculumCategory.READING]?.[lvl]?.[0];
                      const wUnit = MASTER_CURRICULUM[CurriculumCategory.WRITING]?.[lvl]?.[0];
                      const gUnit = MASTER_CURRICULUM[CurriculumCategory.GRAMMAR]?.[lvl]?.[0];
                      const cUnit = MASTER_CURRICULUM[CurriculumCategory.CONVERSATION]?.[lvl]?.[0];

                      return (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div className="bg-white/5 p-2.5 rounded-xl border border-white/10 flex items-start gap-2">
                            <span className="text-amber-400 text-sm">📖</span>
                            <div>
                              <span className="text-[10px] text-slate-400 block">{isRtl ? 'وحدة القراءة والفهم:' : 'Reading Unit:'}</span>
                              <span className="font-bold text-white">{isRtl ? rUnit?.titleAr : rUnit?.title}</span>
                            </div>
                          </div>
                          <div className="bg-white/5 p-2.5 rounded-xl border border-white/10 flex items-start gap-2">
                            <span className="text-amber-400 text-sm">📐</span>
                            <div>
                              <span className="text-[10px] text-slate-400 block">{isRtl ? 'وحدة القواعد والتراكيب:' : 'Grammar Unit:'}</span>
                              <span className="font-bold text-white">{isRtl ? gUnit?.titleAr : gUnit?.title}</span>
                            </div>
                          </div>
                          <div className="bg-white/5 p-2.5 rounded-xl border border-white/10 flex items-start gap-2">
                            <span className="text-amber-400 text-sm">✍️</span>
                            <div>
                              <span className="text-[10px] text-slate-400 block">{isRtl ? 'وحدة التعبير والكتابة:' : 'Writing Unit:'}</span>
                              <span className="font-bold text-white">{isRtl ? wUnit?.titleAr : wUnit?.title}</span>
                            </div>
                          </div>
                          <div className="bg-white/5 p-2.5 rounded-xl border border-white/10 flex items-start gap-2">
                            <span className="text-amber-400 text-sm">🗣️</span>
                            <div>
                              <span className="text-[10px] text-slate-400 block">{isRtl ? 'وحدة المحادثة والطلاقة:' : 'Speaking Unit:'}</span>
                              <span className="font-bold text-white">{isRtl ? cUnit?.titleAr : cUnit?.title}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Direct Action Navigation Buttons */}
                  <div className="pt-1 flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        cancelAllSpeech();
                        onNavigate('reading-lab');
                      }}
                      className="flex-1 min-w-[130px] px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>📖 {isRtl ? 'مختبر القراءة' : 'Reading Lab'}</span>
                    </button>
                    <button
                      onClick={() => {
                        cancelAllSpeech();
                        onNavigate('grammar-academy');
                      }}
                      className="flex-1 min-w-[130px] px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>📐 {isRtl ? 'أكاديمية القواعد' : 'Grammar Academy'}</span>
                    </button>
                    <button
                      onClick={() => {
                        cancelAllSpeech();
                        onNavigate('writing-spelling-studio');
                      }}
                      className="flex-1 min-w-[130px] px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs rounded-xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>✍️ {isRtl ? 'استوديو التعبير' : 'Writing Studio'}</span>
                    </button>
                    <button
                      onClick={() => {
                        cancelAllSpeech();
                        onNavigate('pronunciation-lab');
                      }}
                      className="flex-1 min-w-[130px] px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white font-black text-xs rounded-xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>🎙️ {isRtl ? 'معمل النطق' : 'Pronunciation'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setPlacementState(prev => ({ ...prev, isActive: false }));
                        handleSendMessage(isRtl ? `أنا جاهز يا سارة لنبدأ درسي الأول في مستوى ${placementState.diagnosedLevel}!` : `Sara, let us start my first lesson in level ${placementState.diagnosedLevel}!`);
                      }}
                      className="w-full px-4 py-2.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Sparkles size={16} className="text-slate-900" />
                      <span>{isRtl ? `ابدأ درسك الأول في مستوى [${placementState.diagnosedLevel}] مع سارة الآن 🚀` : `Start First Lesson with Sara Now 🚀`}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading indicator */}
          {loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-slate-400 text-xs py-2 px-3 bg-slate-50 w-fit rounded-2xl border border-slate-200"
            >
              <div className="w-2 h-2 rounded-full bg-[#002147] animate-ping" />
              <span>{isRtl ? 'سارة تفكر وترد عليك...' : 'Sara is thinking...'}</span>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* 2B.1 EMBEDDED LIVE VOICE CONSOLE INSIDE SARA'S CHAT */}
          {/* ======================================================== */}
          <AnimatePresence>
            {isLiveMode && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                className="bg-gradient-to-r from-[#002147] via-[#093566] to-[#002147] text-white p-3.5 sm:p-4 rounded-2xl border-2 border-amber-300/50 shadow-md my-2"
              >
                <div className="flex items-center justify-between flex-wrap gap-2.5">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-xs border-2 shadow-sm ${
                        liveStatus === 'listening' ? 'bg-emerald-500 border-emerald-300 animate-pulse text-white' :
                        liveStatus === 'speaking' ? 'bg-[#C49E3A] border-amber-200 text-slate-900 animate-bounce-slow' :
                        'bg-sky-600 border-sky-300 text-white'
                      }`}>
                        {liveStatus === 'listening' ? <Mic size={17} /> : liveStatus === 'speaking' ? <Volume2 size={17} /> : <Sparkles size={17} />}
                      </div>
                      <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-amber-300">
                          {isRtl ? 'المحادثة الصوتية المباشرة (لايف رد برد)' : 'Live Voice Session (Turn-by-Turn):'}
                        </span>
                        {/* Soundwave Bars */}
                        <div className="flex items-center gap-0.5 h-3 px-1">
                          {[1, 2, 3, 4, 5].map((bar) => (
                            <motion.span
                              key={`live-wave-bar-${bar}`}
                              animate={{
                                height: (liveStatus === 'listening' || liveStatus === 'speaking') ? [3, 14, 5, 12, 3] : 3
                              }}
                              transition={{ duration: 0.5, repeat: Infinity, delay: bar * 0.08 }}
                              className="w-1 bg-amber-300 rounded-full inline-block"
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs font-bold text-slate-100 mt-0.5">
                        {liveStatus === 'listening' && (isRtl ? '🎙️ سارة تستمع إليك الآن... تفضل بالتحدث' : '🎙️ Sara is listening... speak your sentence')}
                        {liveStatus === 'thinking' && (isRtl ? '💭 سارة تفكر وتجهّز الرد الصوتي...' : '💭 Sara is thinking...')}
                        {liveStatus === 'speaking' && (isRtl ? '🗣️ سارة تتحدث معك الآن بصوتها 🔊' : '🗣️ Sara is speaking to you now 🔊')}
                        {liveStatus === 'idle' && (isRtl ? 'جاهزة لبدء الاستماع...' : 'Ready to listen...')}
                      </p>
                    </div>
                  </div>

                  {/* Integrated Controls */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    {/* Speech language selector */}
                    <div className="flex items-center bg-black/40 rounded-xl p-0.5 border border-white/10 text-[10px]">
                      <button
                        onClick={() => setSpeechLang('ar-SA')}
                        className={`px-2 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                          speechLang === 'ar-SA' ? 'bg-[#C49E3A] text-slate-900 font-black' : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        🇸🇦 عربي
                      </button>
                      <button
                        onClick={() => setSpeechLang('en-US')}
                        className={`px-2 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                          speechLang === 'en-US' ? 'bg-[#C49E3A] text-slate-900 font-black' : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        🇬🇧 English
                      </button>
                    </div>

                    {liveStatus === 'speaking' && (
                      <button
                        onClick={() => {
                          cancelAllSpeech();
                          startListeningTurn();
                        }}
                        className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs cursor-pointer shadow-sm transition-all"
                      >
                        {isRtl ? 'تحدث الآن 🎙️' : 'Speak Now 🎙️'}
                      </button>
                    )}

                    <button
                      onClick={toggleLiveVoiceMode}
                      className="px-2.5 py-1 bg-rose-600/90 hover:bg-rose-600 text-white font-bold rounded-xl text-xs cursor-pointer shadow-sm transition-all"
                    >
                      {isRtl ? 'إنهاء اللايف ⏹️' : 'Stop Live ⏹️'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* ======================================================== */}
        {/* 2C. INPUT CONTROLS (INTEGRATED LIVE + MIC + TEXT + SEND) */}
        {/* ======================================================== */}
        <div className="sticky bottom-0 z-30 bg-[#F8FAFC]/95 backdrop-blur-md pt-1 pb-safe space-y-2">
          <div className={`bg-white border-2 rounded-2xl sm:rounded-3xl p-1.5 sm:p-2.5 shadow-md flex items-center gap-1.5 sm:gap-2 transition-all ${
            isLiveMode ? 'border-amber-400 ring-2 ring-amber-300/40' : 'border-slate-200'
          }`}>
            {/* Integrated Live Voice Mode Button directly in the input bar */}
            <button
              onClick={toggleLiveVoiceMode}
              className={`px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-1.5 shrink-0 text-xs font-black shadow-xs ${
                isLiveMode
                  ? 'bg-rose-500 border-rose-600 text-white animate-pulse'
                  : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-800'
              }`}
              title={isLiveMode ? (isRtl ? 'إيقاف المحادثة اللايف' : 'End Live Voice') : (isRtl ? 'تشغيل المحادثة الصوتية المباشرة (رد برد)' : 'Start Live Voice Mode')}
            >
              {isLiveMode ? <Radio size={16} className="animate-spin text-white" /> : <Mic size={16} className="text-emerald-700" />}
              <span className="hidden sm:inline">
                {isLiveMode 
                  ? (isRtl ? 'لايف نشط 🔴' : 'Live Active 🔴') 
                  : (isRtl ? 'محادثة لايف 🎙️' : 'Live Voice 🎙️')}
              </span>
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={
                isLiveMode
                  ? (isRtl ? 'المحادثة اللايف نشطة... تحدث بالمايك وسارة تجيبك، أو اكتب هنا...' : 'Live mode active... speak or type here...')
                  : (isRtl ? 'اكتب لسارة بالعربية أو الإنجليزية، أو اضغط المايك للإملاء...' : 'Type to Sara in Arabic or English, or tap mic...')
              }
              className="flex-1 bg-transparent px-2 sm:px-2.5 py-1.5 text-sm sm:text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none min-w-0"
            />

            {/* Quick Speech Dictation Mic (إملاء صوتي بالمايك للتابلت والجوال) */}
            {!isLiveMode && speechSupported && (
              <button
                type="button"
                onClick={() => {
                  if (isListening) {
                    recognitionRef.current?.stop();
                    setIsListening(false);
                    isListeningRef.current = false;
                  } else {
                    if (isSpeaking) cancelAllSpeech();
                    try {
                      recognitionRef.current?.start();
                      setIsListening(true);
                      isListeningRef.current = true;
                    } catch (e) {
                      console.warn('Speech recognition start failed:', e);
                    }
                  }
                }}
                className={`p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer flex items-center justify-center shrink-0 active:scale-95 ${
                  isListening
                    ? 'bg-amber-400 border-amber-500 text-slate-950 shadow-md animate-bounce'
                    : 'bg-slate-100 hover:bg-amber-50 border-slate-200 text-slate-600 hover:text-amber-800'
                }`}
                title={isRtl ? (isListening ? 'جارٍ الاستماع لإملائك... انقر للإيقاف' : 'إملاء صوتي فوري بالمايك 🎙️') : 'Quick Voice Dictation 🎙️'}
              >
                <Mic size={18} className={isListening ? 'text-slate-950 animate-pulse' : 'text-slate-600'} />
              </button>
            )}

            {/* Send Button */}
            <button
              onClick={() => handleSendMessage()}
              disabled={loading || !inputText.trim()}
              className="p-2.5 sm:p-3 bg-[#002147] hover:bg-[#C49E3A] active:scale-95 disabled:opacity-40 disabled:hover:bg-[#002147] text-white rounded-xl sm:rounded-2xl transition-all shadow-md flex items-center justify-center shrink-0 cursor-pointer"
              title={isRtl ? 'إرسال' : 'Send'}
            >
              <Send size={18} className={isRtl ? 'rotate-180' : ''} />
            </button>
          </div>

          {/* Quick Suggestion Chips */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 text-[11px] font-bold text-slate-600 no-scrollbar">
            <span className="text-slate-400 shrink-0 text-[10px]">{isRtl ? 'اقتراحات سريعة:' : 'Quick prompts:'}</span>
            {/* Sara Arabic / English Language Toggle Chip */}
            <button
              onClick={() => handleToggleLanguage()}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-[#002147] shrink-0 transition-all cursor-pointer font-black flex items-center gap-1.5 text-[10px] sm:text-xs shadow-2xs active:scale-95"
              title={activeLang === 'ar' ? 'التبديل إلى English' : 'التبديل إلى عربي'}
            >
              <span>🌐</span>
              <span>{activeLang === 'ar' ? 'English 🇬🇧' : 'عربي 🇸🇦'}</span>
            </button>

            {/* 📚 Academy Curriculums Selection Chip */}
            <button
              onClick={() => setIsCurriculumModalOpen(true)}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-amber-400 bg-amber-100/70 hover:bg-amber-100 text-[#002147] shrink-0 transition-all cursor-pointer font-black flex items-center gap-1.5 text-[10px] sm:text-xs shadow-xs active:scale-95"
              title={isRtl ? 'اختر أي منهج لتشرحه سارة' : 'Choose a curriculum for Sara to explain'}
            >
              <span>📚</span>
              <span>{isRtl ? 'اختر منهجاً لتشرحه سارة' : 'Choose Curriculum'}</span>
            </button>

            {/* 🗓️ Smart Academic Study Plan Chip */}
            <button
              onClick={() => {
                fetchActiveStudyPlan();
                setIsStudyPlanModalOpen(true);
              }}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-blue-400 bg-blue-100/70 hover:bg-blue-100 text-[#002147] shrink-0 transition-all cursor-pointer font-black flex items-center gap-1.5 text-[10px] sm:text-xs shadow-xs active:scale-95"
              title={isRtl ? 'الخطة الأكاديمية والجدول الدراسي الذكي' : 'Smart Study Planner'}
            >
              <span>🗓️</span>
              <span>{isRtl ? 'الخطة الدراسية 🗓️' : 'Study Plan 🗓️'}</span>
            </button>
            <button
              onClick={toggleLiveVoiceMode}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border shrink-0 transition-all cursor-pointer font-black flex items-center gap-1 text-[10px] sm:text-xs ${
                isLiveMode 
                  ? 'bg-rose-50 border-rose-300 text-rose-700' 
                  : 'bg-emerald-50 border-emerald-300 hover:bg-emerald-100 text-emerald-800'
              }`}
            >
              <Radio size={12} className={isLiveMode ? 'animate-spin' : ''} />
              <span>{isLiveMode ? (isRtl ? '⏹️ إيقاف اللايف' : '⏹️ Stop Live') : (isRtl ? '🎙️ محادثة لايف (رد برد)' : '🎙️ Start Live Voice Chat')}</span>
            </button>
            <button
              onClick={startPlacementTest}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border shrink-0 transition-all cursor-pointer font-black flex items-center gap-1 shadow-2xs text-[10px] sm:text-xs ${
                placementState.isActive
                  ? 'bg-[#002147] text-amber-300 border-amber-400 ring-2 ring-amber-300/40 animate-pulse'
                  : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300 hover:from-blue-100 hover:to-indigo-100 text-[#002147]'
              }`}
            >
              <Target size={12} className={placementState.isActive ? 'text-amber-300' : 'text-blue-600'} />
              <span>{isRtl ? '🎯 اختبار تحديد المستوى' : '🎯 Placement Test'}</span>
            </button>
            <button
              onClick={() => {
                if (!activeBoard) {
                  openWhiteboardModal();
                } else {
                  setIsWhiteboardOpen(true);
                }
                handleSendMessage(isRtl ? 'سارة، اشرحي لي الدرس على السبورة الذكية بالصوت بالتفصيل 📐🎙️' : 'Sara, please explain this lesson on the smart whiteboard with voice 📐🎙️');
              }}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border shrink-0 transition-all cursor-pointer font-black flex items-center gap-1 shadow-2xs text-[10px] sm:text-xs bg-gradient-to-r from-amber-50 to-amber-100 border-amber-300 hover:from-amber-100 hover:to-amber-200 text-slate-900"
            >
              <span>📐🎙️</span>
              <span>{isRtl ? 'اشرحي لي على السبورة بالصوت' : 'Explain on Whiteboard Aloud'}</span>
            </button>
            {[
              { ar: 'علميني قاعدة جديدة اليوم 📐', en: 'Teach me a new rule 📐' },
              { ar: 'اختبريني بـ 3 أسئلة سريعة 🎯', en: 'Give me a 3-question quiz 🎯' },
              { ar: 'وش أخطائي اللي لازم أعدلها؟ 🔍', en: 'What mistakes should I fix? 🔍' },
              { ar: 'جاهز أمارس جمل محادثة 🗣️', en: 'Ready to practice conversation 🗣️' }
            ].map((chip, cIdx) => (
              <button
                key={`chip-${cIdx}`}
                onClick={() => handleSendMessage(isRtl ? chip.ar : chip.en)}
                className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-white border border-slate-200 hover:border-[#002147] hover:bg-slate-50 shrink-0 transition-all cursor-pointer shadow-2xs text-[10px] sm:text-xs"
              >
                {isRtl ? chip.ar : chip.en}
              </button>
            ))}
            <button
              onClick={() => setIsRolePlayModalOpen(true)}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-300 hover:border-indigo-400 hover:from-indigo-100 hover:to-purple-100 text-[#002147] shrink-0 transition-all cursor-pointer shadow-2xs flex items-center gap-1 font-black text-[10px] sm:text-xs"
              title={isRtl ? 'استوديو سيناريوهات ومغامرات سارة لسن 12 سنة' : 'Sara 12Y Adventures & Scenarios'}
            >
              <span>🎮</span>
              <span>{isRtl ? 'مغامرات وسيناريوهات 12 سنة' : '12Y Scenarios Hub'}</span>
            </button>
            <button
              onClick={() => setShowArchiveConfirm(true)}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-amber-50 border border-amber-300 hover:border-amber-400 hover:bg-amber-100 text-amber-900 shrink-0 transition-all cursor-pointer shadow-2xs flex items-center gap-1 font-bold text-[10px] sm:text-xs"
              title={isRtl ? 'أرشف الجلسة' : 'Archive Session'}
            >
              <Archive size={11} className="text-amber-700" />
              <span>{isRtl ? '📦 أرشف الجلسة' : '📦 Archive'}</span>
            </button>
            <button
              onClick={() => {
                fetchArchivedSessions();
                setIsArchiveModalOpen(true);
              }}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#002147] hover:bg-slate-100 text-slate-600 shrink-0 transition-all cursor-pointer shadow-2xs flex items-center gap-1 font-bold text-[10px] sm:text-xs"
              title={isRtl ? 'الأرشيف' : 'Archive'}
            >
              <History size={11} className="text-slate-500" />
              <span>{isRtl ? '🗂️ الأرشيف' : '🗂️ Archive'}</span>
            </button>
          </div>
        </div>
      </main>

      {/* 4. Smart Whiteboard Modal / Chalkboard */}
      <SmartWhiteboard
        isOpen={isWhiteboardOpen}
        onClose={() => setIsWhiteboardOpen(false)}
        boardData={activeBoard}
        isRtl={isRtl}
        onSpeak={(txt, onEnd) => playSaraVoice(txt, onEnd)}
        onQuizAnswer={handleQuizOptionClick}
        quizSelectedOption={quizSelectedOption}
        quizFeedback={quizFeedback}
        onFinishLesson={(score, total) => handleCompleteAndSaveLesson(score, total)}
        isLessonActive={!!activeCurriculumLesson}
        currentPageIndex={currentWhiteboardPageIndex}
        onPageIndexChange={handleWhiteboardPageIndexChange}
        onRequestOnBoard={async (reqText) => {
          await handleSendMessage(reqText);
        }}
        isSaraThinking={loading}
        isSaraSpeaking={isSpeaking}
        onStopSpeak={() => {
          cancelAllSpeech();
          setIsSpeaking(false);
          isSpeakingRef.current = false;
        }}
        onToggleSara3D={() => setIsSara3DOpen(!isSara3DOpen)}
        isSara3DOpen={isSara3DOpen}
        currentLang={activeLang}
        onToggleLang={() => handleToggleLanguage()}
        onOpenCurriculum={() => setIsCurriculumModalOpen(true)}
        dailyLessonInfo={{
          current: currentDailyLessonIndex + 1,
          total: todayScheduledLessons.length,
          hasNext: currentDailyLessonIndex < todayScheduledLessons.length - 1
        }}
      />

      {/* 5. 3D Interactive Floating Avatar Character of Sara */}
      <Sara3DCharacter
        isOpen={isSara3DOpen}
        onToggle={() => setIsSara3DOpen(!isSara3DOpen)}
        isRtl={isRtl}
        isSpeaking={isSpeaking}
        isLiveMode={isLiveMode}
        liveStatus={liveStatus}
        currentSpeechText={lastSaraSpeech}
        isWhiteboardOpen={isWhiteboardOpen}
        isExplainingWhiteboard={isSpeaking && isWhiteboardOpen}
        currentLang={activeLang}
        onToggleLang={() => handleToggleLanguage()}
        onOpenCurriculum={() => setIsCurriculumModalOpen(true)}
        onCharacterClick={() => {
          if (!isSpeaking) {
            const greetings = isRtl
              ? [
                  'أنا معك خطوة بخطوة يا بطل! 🌟 انظر للسبورة لنشرح سوا!',
                  'هل ترغب أن نمارس بعض الجمل الصوتية معاً الآن؟ 🎙️',
                  'أنا سارة، رفيقتك ومعلمتك الشخصية في الأكاديمية! ✨',
                  'أحسنت في استمرارك ومثابرتك في التعلم! 👏'
                ]
              : [
                  "I'm here with you step by step! 🌟 Let's check the board together!",
                  'Ready to practice some English sentences together? 🎙️',
                  "I'm Sara, your personal mentor at the Academy! ✨",
                  'Keep up the fantastic momentum! 👏'
                ];
            const phrase = greetings[Math.floor(Math.random() * greetings.length)];
            playSaraVoice(phrase);
          }
        }}
      />

      {/* 6. Archive Session Confirmation Modal («أرشف هالجلسة؟») */}
      <AnimatePresence>
        {(showArchiveConfirm || showNewChatConfirm) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-5 sm:p-6 max-w-sm w-full border-2 border-slate-200 shadow-2xl text-center space-y-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center mx-auto text-2xl shadow-xs">
                📦
              </div>

              <div>
                <h3 className="text-lg font-black text-[#002147]">
                  {isRtl ? 'أرشف هالجلسة؟' : 'Archive this session?'}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                  {isRtl
                    ? 'سيتم نقل محادثة الجلسة الحالية إلى مستند جديد في أرشيف جلساتك بأمان، ومسح الدردشة الحية لتبدأ سارة معك بتحية جديدة 🌟'
                    : 'Current session chat will be transferred to your archive, and live chat will be cleared with a fresh greeting 🌟'}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleCancelArchiveSession}
                  className="flex-1 py-3 px-4 rounded-xl border-2 border-slate-200 text-slate-700 font-black text-sm hover:bg-slate-100 transition-all cursor-pointer"
                >
                  {isRtl ? 'لا' : 'No'}
                </button>
                <button
                  onClick={handleConfirmArchiveSession}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#002147] hover:bg-[#073060] text-amber-300 font-black text-sm transition-all shadow-md cursor-pointer border border-amber-300/40"
                >
                  {isRtl ? 'نعم' : 'Yes'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6B. Mobile & Tablet Quick Actions Drawer Modal */}
      <AnimatePresence>
        {showMobileToolsDrawer && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end md:justify-center items-center p-0 md:p-4 bg-slate-950/70 backdrop-blur-xs xl:hidden">
            {/* Backdrop click to dismiss */}
            <div 
              className="absolute inset-0" 
              onClick={() => setShowMobileToolsDrawer(false)} 
            />

            <motion.div
              initial={{ y: '100%', opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="bg-white rounded-t-3xl md:rounded-3xl border-t-2 md:border-2 border-slate-200 shadow-2xl p-4 sm:p-6 max-h-[88dvh] max-w-lg w-full flex flex-col overflow-hidden relative z-10"
              dir={isRtl ? 'rtl' : 'ltr'}
            >
              {/* Drag handle & Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-[#855B14] flex items-center justify-center text-sm font-black shadow-xs">
                    ⚡
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#002147]">
                      {isRtl ? 'أدوات وأنشطة سارة التعليمية' : 'Sara Learning Hub'}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {isRtl ? 'اختر النشاط أو الأداة التي ترغب بها' : 'Select an activity or tool'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowMobileToolsDrawer(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Tools Grid */}
              <div className="grid grid-cols-2 gap-2.5 py-3 overflow-y-auto max-h-[60dvh] no-scrollbar">
                {/* 1. Placement Test */}
                <button
                  onClick={() => {
                    setShowMobileToolsDrawer(false);
                    startPlacementTest();
                  }}
                  className={`p-3 rounded-2xl border-2 text-start flex flex-col justify-between gap-2 transition-all cursor-pointer ${
                    placementState.isActive
                      ? 'bg-[#002147] text-white border-amber-400 ring-2 ring-amber-300'
                      : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 text-blue-950 hover:bg-blue-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">🎯</span>
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-blue-600 text-white">
                      {isRtl ? 'مستواك' : 'Level'}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-black">{isRtl ? 'تحديد المستوى' : 'Placement Test'}</div>
                    <div className="text-[10px] text-slate-500 font-medium">{isRtl ? 'تشخيص دقيق للقدرات' : 'Accurate test'}</div>
                  </div>
                </button>

                {/* 2. Phonetic Speech Lab */}
                <button
                  onClick={() => {
                    setShowMobileToolsDrawer(false);
                    setPhoneticTargetSentence(activeBoard?.sentence || 'Welcome to Basim Alkhalil Academy');
                    setIsPhoneticModalOpen(true);
                  }}
                  className="p-3 rounded-2xl border-2 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 text-purple-950 hover:bg-purple-100 text-start flex flex-col justify-between gap-2 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">🎙️</span>
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-purple-600 text-white">
                      {isRtl ? 'فوري' : 'Live'}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-black">{isRtl ? 'مختبر مخارج النطق' : 'Pronunciation Lab'}</div>
                    <div className="text-[10px] text-slate-500 font-medium">{isRtl ? 'تصحيح صوتي مباشر' : 'Voice correction'}</div>
                  </div>
                </button>

                {/* 3. Real-world Role-Play */}
                <button
                  onClick={() => {
                    setShowMobileToolsDrawer(false);
                    setIsRolePlayModalOpen(true);
                  }}
                  className={`p-3 rounded-2xl border-2 text-start flex flex-col justify-between gap-2 transition-all cursor-pointer ${
                    activeRolePlay
                      ? 'bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 border-amber-300 ring-2 ring-amber-300'
                      : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 border-indigo-200 text-[#002147] hover:bg-indigo-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">🎮</span>
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-indigo-600 text-white">
                      {isRtl ? '12 سنة' : '12Y'}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-black">{isRtl ? 'سيناريوهات ومغامرات 12 سنة' : '12Y Role-Play Hub'}</div>
                    <div className="text-[10px] text-slate-500 font-medium">{isRtl ? 'ألعاب، كورة، روبوت، فضاء...' : 'Gaming, Football, STEM...'}</div>
                  </div>
                </button>

                {/* 4. Notebook & Parent Report */}
                <button
                  onClick={() => {
                    setShowMobileToolsDrawer(false);
                    setIsNotebookModalOpen(true);
                  }}
                  className="p-3 rounded-2xl border-2 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 text-[#855B14] hover:bg-amber-100 text-start flex flex-col justify-between gap-2 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">📓</span>
                    {tutorMemory.frequentMistakes && tutorMemory.frequentMistakes.length > 0 && (
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-rose-500 text-white">
                        {tutorMemory.frequentMistakes.length} {isRtl ? 'أخطاء' : 'errors'}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-black">{isRtl ? 'دفتر الأخطاء والتقرير' : 'Error Notebook'}</div>
                    <div className="text-[10px] text-slate-500 font-medium">{isRtl ? 'مفردات وتقارير الإتقان' : 'Mistakes & vocab'}</div>
                  </div>
                </button>

                {/* 5. Academy Curricula Selection */}
                <button
                  onClick={() => {
                    setShowMobileToolsDrawer(false);
                    setIsCurriculumModalOpen(true);
                  }}
                  className="p-3 rounded-2xl border-2 bg-gradient-to-br from-amber-100/70 to-yellow-50 border-amber-300 text-[#002147] hover:bg-amber-100 text-start flex flex-col justify-between gap-2 transition-all cursor-pointer col-span-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">📚</span>
                      <div>
                        <div className="text-xs font-black">{isRtl ? 'مناهج الأكاديمية التفاعلية' : 'Academy Curriculums'}</div>
                        <div className="text-[10px] text-slate-600 font-medium">
                          {isRtl ? 'دروس القواعد، الصوتيات، المحادثة والقصص' : 'Grammar, Phonics, Speaking & Stories'}
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={16} className={`text-slate-400 ${isRtl ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {/* 6. Smart Academic Study Plan */}
                <button
                  onClick={() => {
                    setShowMobileToolsDrawer(false);
                    fetchActiveStudyPlan();
                    setIsStudyPlanModalOpen(true);
                  }}
                  className="p-3 rounded-2xl border-2 bg-gradient-to-br from-blue-100/70 to-indigo-50 border-blue-300 text-[#002147] hover:bg-blue-100 text-start flex flex-col justify-between gap-2 transition-all cursor-pointer col-span-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🗓️</span>
                      <div>
                        <div className="text-xs font-black">{isRtl ? 'الخطة الأكاديمية والجدول الدراسي الذكي' : 'Smart Study Plan & Schedule'}</div>
                        <div className="text-[10px] text-slate-600 font-medium">
                          {isRtl ? 'جدول زمني مخصص، أيام الدراسة، ودروسك اليومية مع سارة' : 'Custom schedule, study days, and daily lessons with Sara'}
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={16} className={`text-slate-400 ${isRtl ? 'rotate-180' : ''}`} />
                  </div>
                </button>
              </div>

              {/* Bottom Quick Preferences (Speed + Timer + Language + New Chat) */}
              <div className="pt-3 border-t border-slate-100 space-y-2 pb-safe">
                <div className="flex items-center justify-between gap-2">
                  {/* Speed toggle */}
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl flex-1 justify-between">
                    <span className="text-[10px] font-black text-slate-500 ps-1">{isRtl ? 'السرعة:' : 'Speed:'}</span>
                    <div className="flex items-center gap-0.5">
                      {[
                        { r: 0.8, l: '🐢 0.8x' },
                        { r: 1.0, l: '⚡ 1.0x' },
                        { r: 1.2, l: '🚀 1.2x' }
                      ].map(sp => (
                        <button
                          key={`mob-sp-${sp.r}`}
                          onClick={() => setSaraSpeechRate(sp.r)}
                          className={`px-2 py-1 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
                            saraSpeechRate === sp.r ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                          }`}
                        >
                          {sp.l}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Language Toggle */}
                  <button
                    onClick={() => handleToggleLanguage()}
                    className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#002147] text-xs font-black flex items-center gap-1 cursor-pointer transition-all shrink-0"
                  >
                    <span>🌐</span>
                    <span>{activeLang === 'ar' ? 'English' : 'عربي'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {/* Timer selection */}
                  <button
                    onClick={() => {
                      setShowMobileToolsDrawer(false);
                      setShowTimerDropdown(true);
                    }}
                    className="flex-1 py-2 px-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Clock size={13} className="text-amber-500" />
                    <span>{isRtl ? 'مؤقت الجلسة:' : 'Session Timer:'}</span>
                    <span className="font-mono font-black">{formatTimerDisplay(timerSecondsLeft)}</span>
                  </button>

                  {/* Archive Session */}
                  <button
                    onClick={() => {
                      setShowMobileToolsDrawer(false);
                      setShowArchiveConfirm(true);
                    }}
                    className="py-2 px-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black flex items-center gap-1 cursor-pointer shrink-0 transition-all"
                    title={isRtl ? 'أرشف الجلسة' : 'Archive'}
                  >
                    <Archive size={12} className="text-amber-700" />
                    <span>{isRtl ? 'أرشف' : 'Archive'}</span>
                  </button>

                  {/* View Archive */}
                  <button
                    onClick={() => {
                      setShowMobileToolsDrawer(false);
                      fetchArchivedSessions();
                      setIsArchiveModalOpen(true);
                    }}
                    className="py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-black flex items-center gap-1 cursor-pointer shrink-0 transition-all"
                    title={isRtl ? 'الأرشيف' : 'Archive'}
                  >
                    <History size={12} className="text-slate-500" />
                    <span>{isRtl ? 'الأرشيف' : 'Archive'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 7. End of Lesson Bell & Summary Modal */}
      <AnimatePresence>
        {isTimeUpModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border-4 border-[#C49E3A] relative overflow-hidden text-center"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-4">
                {/* Bell Icon & Animation */}
                <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-br from-[#002147] to-[#0a3568] border-2 border-amber-300 text-white flex items-center justify-center shadow-lg">
                  <Bell size={32} className="text-amber-400 animate-bounce" />
                </div>

                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#C49E3A] block mb-1">
                    {isRtl ? 'أكاديمية باسم الخليل للغة الإنجليزية' : 'Basim Alkhalil Academy'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#002147]">
                    {isRtl ? 'انتهت الحصة المقررة! 🔔🎓' : 'Lesson Time Completed! 🔔🎓'}
                  </h3>
                  <p className="text-xs text-slate-500 font-bold mt-1">
                    {isRtl
                      ? `أتممت ${timerDurationMinutes} دقيقة من التعلم والمحادثة النشطة مع سارة.`
                      : `You completed ${timerDurationMinutes} minutes of focused practice with Sara.`}
                  </p>
                </div>

                {/* Session Highlights Pill Grid */}
                <div className="grid grid-cols-2 gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-2xs">
                    <span className="text-slate-400 block text-[10px] font-bold">{isRtl ? 'مدة الحصة' : 'Duration'}</span>
                    <span className="font-black text-[#002147] text-sm">{timerDurationMinutes} {isRtl ? 'دقائق ⏱️' : 'mins'}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-100 shadow-2xs">
                    <span className="text-slate-400 block text-[10px] font-bold">{isRtl ? 'الرسائل والمحادثة' : 'Messages'}</span>
                    <span className="font-black text-[#002147] text-sm">{messages.length} {isRtl ? 'رسالة 💬' : 'msgs'}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => extendSessionByMinutes(5)}
                    className="w-full py-3 bg-[#002147] hover:bg-[#073060] active:scale-98 text-amber-300 rounded-2xl font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-300/40"
                  >
                    <Plus size={16} />
                    <span>{isRtl ? 'تمديد الحصة (+5 دقائق إضافية ⏱️)' : 'Extend +5 minutes ⏱️'}</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={restartTimer}
                      className="py-2.5 bg-amber-50 hover:bg-amber-100 text-[#855B14] rounded-2xl font-black text-xs border border-amber-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw size={14} />
                      <span>{isRtl ? 'بدء مؤقت جديد' : 'New Timer'}</span>
                    </button>

                    <button
                      onClick={() => setIsTimeUpModalOpen(false)}
                      className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen size={14} />
                      <span>{isRtl ? 'مراجعة المحادثة' : 'Review Chat'}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      cancelAllSpeech();
                      setIsTimeUpModalOpen(false);
                      onNavigate('grammar-academy');
                    }}
                    className="w-full py-2 text-slate-500 hover:text-[#002147] text-xs font-bold transition-colors cursor-pointer"
                  >
                    {isRtl ? 'الذهاب إلى أقسام الأكاديمية والتمارين ➔' : 'Explore Academy Curriculum ➔'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 7B. Celebration Lesson Completion & Saved Result Modal */}
      <AnimatePresence>
        {isLessonCompletedModalOpen && lastSavedLessonResult && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border-4 border-[#C49E3A] relative overflow-hidden text-center"
            >
              {/* Background celebration glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-amber-400/30 to-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-gradient-to-tr from-teal-400/20 to-blue-400/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-4">
                {/* Trophy & Sparkles Avatar */}
                <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-br from-[#002147] via-[#093568] to-[#002147] border-2 border-amber-300 text-white flex items-center justify-center shadow-xl">
                  <Trophy size={36} className="text-amber-400 animate-bounce" />
                </div>

                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#C49E3A] block mb-1">
                    {isRtl ? 'أكاديمية باسم الخليل للغة الإنجليزية • توثيق النتيجة 🎓' : 'Basim Alkhalil Academy • Recorded Result 🎓'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#002147]">
                    {isRtl ? 'انتهى الدرس وسُجلت النتيجة بنجاح! 🏆' : 'Lesson Finished & Result Saved! 🏆'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-bold mt-1">
                    {isRtl
                      ? `كفو عليك يا بطل! أتممت بنجاح دراسة: "${lastSavedLessonResult.lessonTitle}"`
                      : `Great achievement! You completed: "${lastSavedLessonResult.lessonTitle}"`}
                  </p>
                </div>

                {/* Score & Highlights Metric Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs">
                  <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-2xs">
                    <span className="text-slate-400 block text-[10px] font-bold">{isRtl ? 'الدرجة المحققة' : 'Final Score'}</span>
                    <span className="font-black text-emerald-600 text-base sm:text-lg">{lastSavedLessonResult.percentage}%</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-2xs">
                    <span className="text-slate-400 block text-[10px] font-bold">{isRtl ? 'نقاط التميز' : 'XP Points'}</span>
                    <span className="font-black text-amber-500 text-base sm:text-lg">+{lastSavedLessonResult.pointsEarned} XP</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-2xs">
                    <span className="text-slate-400 block text-[10px] font-bold">{isRtl ? 'المستوى' : 'Level'}</span>
                    <span className="font-black text-[#002147] text-base">{lastSavedLessonResult.level}</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-2xs">
                    <span className="text-slate-400 block text-[10px] font-bold">{isRtl ? 'مدة الحصة' : 'Duration'}</span>
                    <span className="font-black text-[#002147] text-base">{lastSavedLessonResult.durationMins} {isRtl ? 'د' : 'm'}</span>
                  </div>
                </div>

                {/* Verified Saved to Database Badge */}
                <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-400/80 rounded-2xl p-3 text-xs text-emerald-950 font-bold flex items-center justify-center gap-2 shadow-xs">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span>
                    {isRtl
                      ? 'تم توثيق النتيجة وحفظها في قاعدة بيانات الأكاديمية وسجل درجاتك بنجاح 💾✅'
                      : 'Result recorded & saved to academy database & your gradebook ✅'}
                  </span>
                </div>

                {/* Archive Prompt: «أرشف هالجلسة؟» */}
                <div className="bg-amber-50/90 border-2 border-amber-300 rounded-2xl p-3.5 text-center space-y-2">
                  <div className="flex items-center justify-center gap-1.5 text-[#002147] font-black text-sm">
                    <Archive size={16} className="text-amber-700" />
                    <span>{isRtl ? 'أرشف هالجلسة؟' : 'Archive this session?'}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium">
                    {isRtl
                      ? 'حفظ رسائل هذا الدرس في مستند منفصل بالأرشيف وبدء جلسة جديدة بتحية قصيرة؟'
                      : 'Save this lesson to archive document and start a fresh session with a short greeting?'}
                  </p>
                  <div className="flex items-center gap-2.5 pt-1">
                    <button
                      onClick={() => {
                        setIsLessonCompletedModalOpen(false);
                      }}
                      className="flex-1 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-black text-xs transition-all cursor-pointer"
                    >
                      {isRtl ? 'لا' : 'No'}
                    </button>
                    <button
                      onClick={handleConfirmArchiveSession}
                      className="flex-1 py-2 rounded-xl bg-[#002147] hover:bg-[#073060] text-amber-300 font-black text-xs transition-all shadow-md cursor-pointer border border-amber-300/40"
                    >
                      {isRtl ? 'نعم' : 'Yes'}
                    </button>
                  </div>
                </div>

                {/* Action Navigation Buttons */}
                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => {
                      setIsLessonCompletedModalOpen(false);
                      setIsCurriculumModalOpen(true);
                    }}
                    className="w-full py-3 bg-[#002147] hover:bg-[#073060] active:scale-98 text-amber-300 rounded-2xl font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-300/40"
                  >
                    <BookOpen size={16} />
                    <span>{isRtl ? 'اختيار الدرس التالي من المناهج 📚' : 'Pick Next Curriculum Lesson 📚'}</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setIsLessonCompletedModalOpen(false);
                        setIsNotebookModalOpen(true);
                      }}
                      className="py-2.5 bg-amber-50 hover:bg-amber-100 text-[#855B14] rounded-2xl font-black text-xs border border-amber-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles size={14} className="text-amber-500" />
                      <span>{isRtl ? 'دفتر الملاحظات 📓' : 'Personal Notebook'}</span>
                    </button>
                    <button
                      onClick={() => setIsLessonCompletedModalOpen(false)}
                      className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>{isRtl ? 'متابعة المحادثة 💬' : 'Keep Chatting 💬'}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      cancelAllSpeech();
                      setIsLessonCompletedModalOpen(false);
                      onNavigate('grammar-academy');
                    }}
                    className="w-full py-2 text-slate-500 hover:text-[#002147] text-xs font-bold transition-colors cursor-pointer"
                  >
                    {isRtl ? 'الذهاب إلى أقسام الأكاديمية والتمارين ➔' : 'Explore Academy Curriculum ➔'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Save Confirmation Toast */}
      <AnimatePresence>
        {showSavedToast && (
          <motion.div
            initial={{ opacity: 0, y: -25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -25, scale: 0.95 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-60 bg-emerald-600 text-white px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 border-2 border-emerald-300 font-black text-xs sm:text-sm pointer-events-none"
          >
            <CheckCircle2 size={16} className="text-amber-300" />
            <span>{isRtl ? 'تم تسجيل النتيجة وحفظ تقدم الدرس بنجاح! 🎓💾' : 'Lesson result recorded and saved successfully! 🎓💾'}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Archive Error Toast */}
      <AnimatePresence>
        {archiveErrorToast && (
          <motion.div
            initial={{ opacity: 0, y: -25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -25, scale: 0.95 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-[100] bg-rose-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 border-2 border-rose-300 font-black text-xs sm:text-sm pointer-events-none"
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            <XCircle size={18} className="text-white shrink-0" />
            <span>{archiveErrorToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 8. Phonetic Voice Analyzer & Pronunciation Lab Modal */}
      <PhoneticAnalyzerModal
        isOpen={isPhoneticModalOpen}
        onClose={() => setIsPhoneticModalOpen(false)}
        targetSentence={phoneticTargetSentence || activeBoard?.sentence || 'Welcome to Basim Alkhalil Academy'}
        isRtl={isRtl}
        onSuccessXP={(xp) => {
          setStreak(prev => ({
            ...prev,
            totalXP: (prev as any).totalXP ? (prev as any).totalXP + xp : xp
          }));
        }}
      />

      {/* 9. Role-Play Scenarios Hub Modal */}
      <RolePlayModal
        isOpen={isRolePlayModalOpen}
        onClose={() => setIsRolePlayModalOpen(false)}
        onStartScenario={handleStartRolePlayScenario}
        isRtl={isRtl}
      />

      {/* 10. Personal Error Notebook, Vocab Bank & Parent Progress Card Modal */}
      <SaraPersonalNotebookModal
        isOpen={isNotebookModalOpen}
        onClose={() => setIsNotebookModalOpen(false)}
        tutorMemory={tutorMemory}
        studentName={profile.displayName || ''}
        studentLevel={(profile as any).level || tutorMemory.level || 'A1'}
        studentStreak={streak.current || 1}
        isRtl={isRtl}
        onTestMistake={(mistakePrompt) => {
          const prompt = isRtl
            ? `سارة، أود أن تختبريني في هذه النقطة اللغوية لأتأكد من إتقاني لها: "${mistakePrompt}". اطرحي علي سؤالاً تدريبياً سريعاً!`
            : `Sara, please test me on this grammar rule to verify my mastery: "${mistakePrompt}". Give me a quick practice question!`;
          handleSendMessage(prompt);
        }}
        onSpeakText={(text) => playSaraVoice(text)}
      />

      {/* 11. Academy Curriculums Explorer & Linking Modal with Sara */}
      <SaraCurriculumModal
        isOpen={isCurriculumModalOpen}
        onClose={() => setIsCurriculumModalOpen(false)}
        onSelectLesson={handleSelectCurriculumLesson}
        activeLessonId={activeCurriculumLesson?.id}
        isRtl={isRtl}
      />

      {/* 12. Sara Sessions Archive Modal & Read-Only Viewer */}
      <AnimatePresence>
        {isArchiveModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden border-2 border-slate-200 shadow-2xl"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#002147] via-[#093568] to-[#002147] p-4 sm:p-5 text-white flex items-center justify-between border-b-2 border-amber-400/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-300 border border-amber-300/40 flex items-center justify-center text-xl shadow-inner">
                    🗂️
                  </div>
                  <div>
                    <h3 className="font-black text-base sm:text-lg">
                      {isRtl ? 'أرشيف جلسات سارة 🗂️' : "Sara's Sessions Archive 🗂️"}
                    </h3>
                    <p className="text-[11px] text-amber-200/80 font-medium">
                      {isRtl 
                        ? 'جلساتك السابقة مسجلة ومحفوظة للقراءة فقط، ويمكنك إرجاع أي جلسة للدردشة الحية' 
                        : 'Past sessions saved read-only. You can restore any session to live chat anytime.'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsArchiveModalOpen(false);
                    setViewingSession(null);
                  }}
                  className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                  title={isRtl ? 'إغلاق' : 'Close'}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
                {viewingSession ? (
                  /* READ-ONLY SESSION VIEWER */
                  <div className="space-y-4">
                    {/* Read-Only Banner & Action Bar */}
                    <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-2 border-amber-300 rounded-2xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-950 font-black text-[10px] uppercase mb-1">
                          <span>🔒</span>
                          <span>{isRtl ? 'وضع القراءة فقط' : 'Read-Only Mode'}</span>
                        </div>
                        <h4 className="font-black text-xs sm:text-sm text-[#002147]">
                          {viewingSession.lessonTitle || viewingSession.lessonName
                            ? (isRtl ? `درس: ${viewingSession.lessonTitle || viewingSession.lessonName}` : `Lesson: ${viewingSession.lessonTitle || viewingSession.lessonName}`)
                            : (isRtl ? 'جلسة محادثة عامة' : 'General Practice Session')}
                        </h4>
                        <p className="text-[10px] text-slate-500 font-bold mt-0.5">
                          📅 {viewingSession.date || (viewingSession.archivedAt ? new Date(viewingSession.archivedAt).toLocaleDateString(isRtl ? 'ar-EG' : 'en-US') : '---')} • 💬 {viewingSession.messagesCount || viewingSession.messages?.length || 0} {isRtl ? 'رسالة' : 'messages'}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => setViewingSession(null)}
                          className="flex-1 sm:flex-none px-3 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-white transition-all cursor-pointer"
                        >
                          {isRtl ? 'العودة للأرشيف ➔' : 'Back to List ➔'}
                        </button>
                        <button
                          onClick={() => handleRestoreSessionToLive(viewingSession)}
                          className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-[#002147] hover:bg-[#C49E3A] text-white font-black text-xs transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <RotateCcw size={13} />
                          <span>{isRtl ? 'إرجاع للدردشة الحية 💬' : 'Restore to Live Chat 💬'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Messages Stream (Read-Only) */}
                    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-3 max-h-[50vh] overflow-y-auto">
                      {viewingSession.messages && viewingSession.messages.length > 0 ? (
                        viewingSession.messages.map((m: any, mIdx: number) => {
                          const isSara = m.role === 'sara';
                          return (
                            <div
                              key={m.id || `view_msg_${mIdx}`}
                              className={`flex items-start gap-2.5 ${isSara ? '' : (isRtl ? 'flex-row-reverse text-right' : 'flex-row-reverse text-left')}`}
                            >
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm shadow-xs ${
                                isSara ? 'bg-[#002147] text-amber-300' : 'bg-[#58cc02] text-white'
                              }`}>
                                {isSara ? '👩‍🏫' : '🧑‍🎓'}
                              </div>
                              <div className={`max-w-[85%] rounded-2xl p-3 text-xs sm:text-sm font-medium leading-relaxed shadow-2xs ${
                                isSara 
                                  ? 'bg-white text-slate-800 border border-slate-200' 
                                  : 'bg-[#58cc02] text-white'
                              }`}>
                                <p className="whitespace-pre-wrap">{m.text}</p>
                                {m.board && (
                                  <div className="mt-2 p-2 rounded-xl bg-amber-50 border border-amber-200 text-xs text-[#002147]">
                                    <span className="font-bold block">📐 {m.board.title || 'لوحة السبورة'}</span>
                                    {m.board.sentence && <span className="italic block mt-0.5 text-slate-600">"{m.board.sentence}"</span>}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-center text-xs text-slate-400 py-6">
                          {isRtl ? 'لا توجد رسائل مسجلة في هذه الجلسة' : 'No messages found in this session'}
                        </p>
                      )}
                    </div>

                    {/* Bottom Restore Call-To-Action */}
                    <button
                      onClick={() => handleRestoreSessionToLive(viewingSession)}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#002147] via-[#0a3669] to-[#002147] hover:brightness-110 text-amber-300 font-black text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer border border-amber-300/40"
                    >
                      <RotateCcw size={15} />
                      <span>{isRtl ? 'استرجاع هذه الجلسة إلى الدردشة الحية لمتابعتها الآن 🚀' : 'Restore this session to live chat now 🚀'}</span>
                    </button>
                  </div>
                ) : (
                  /* ARCHIVED SESSIONS LIST */
                  <div className="space-y-3">
                    {isLoadingArchive ? (
                      <div className="py-12 text-center space-y-2">
                        <div className="w-8 h-8 border-3 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
                        <p className="text-xs text-slate-400 font-bold">{isRtl ? 'جاري تحميل الأرشيف...' : 'Loading sessions archive...'}</p>
                      </div>
                    ) : archivedSessions.length === 0 ? (
                      <div className="py-12 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-6 space-y-2">
                        <div className="text-4xl">📦</div>
                        <h4 className="font-black text-sm text-[#002147]">
                          {isRtl ? 'لا توجد جلسات مؤرشفة بعد' : 'No Archived Sessions Yet'}
                        </h4>
                        <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                          {isRtl
                            ? 'كل جلسة درس تُحفظ لوحدها. عند نهاية أي درس أو عند ضغط زر «أرشف الجلسة»، سيتم حفظ رسائل الجلسة هنا للقراءة أو الاسترجاع.'
                            : 'Each lesson session is archived separately. When you complete a lesson or click Archive Session, it will appear here.'}
                        </p>
                      </div>
                    ) : (
                      archivedSessions.map((session, sIdx) => (
                        <div
                          key={session.id || `sess_${sIdx}`}
                          className="bg-white rounded-2xl border-2 border-slate-200 hover:border-amber-300/80 p-4 transition-all shadow-xs hover:shadow-md space-y-2.5"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-xs text-slate-700 flex items-center gap-1">
                                <Calendar size={13} className="text-amber-500" />
                                <span>{session.date || (session.archivedAt ? new Date(session.archivedAt).toLocaleDateString(isRtl ? 'ar-EG' : 'en-US') : '---')}</span>
                              </span>
                              {(session.lessonTitle || session.lessonName) && (
                                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 font-black text-[10px]">
                                  📚 {session.lessonTitle || session.lessonName}
                                </span>
                              )}
                            </div>
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold text-[10px]">
                              💬 {session.messagesCount || session.messages?.length || 0} {isRtl ? 'رسالة' : 'msgs'}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 font-medium line-clamp-2 leading-relaxed bg-slate-50/70 p-2 rounded-xl border border-slate-100 italic">
                            "{session.snippet || (session.messages?.[0]?.text?.slice(0, 100)) || 'جلسة تدريبية'}"
                          </p>

                          <div className="flex items-center justify-end gap-2 pt-1">
                            <button
                              onClick={() => setViewingSession(session)}
                              className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-black text-xs flex items-center gap-1 transition-all cursor-pointer"
                            >
                              <Eye size={12} className="text-slate-500" />
                              <span>{isRtl ? 'استعراض (قراءة فقط)' : 'View (Read-Only)'}</span>
                            </button>
                            <button
                              onClick={() => handleRestoreSessionToLive(session)}
                              className="px-3 py-1.5 rounded-xl bg-[#002147] hover:bg-[#C49E3A] text-white font-black text-xs flex items-center gap-1 transition-all shadow-xs cursor-pointer"
                            >
                              <RotateCcw size={12} className="text-amber-300" />
                              <span>{isRtl ? 'إرجاع للدردشة الحية 💬' : 'Restore to Live'}</span>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 13. Smart Academic Study Planner Modal (Exact same as Academy) */}
      <AnimatePresence>
        {isStudyPlanModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-md flex flex-col">
            <div className="min-h-full flex flex-col bg-slate-50 relative">
              <StudyPlanner
                lang={activeLang}
                userProfile={profile as any}
                onBack={() => {
                  setIsStudyPlanModalOpen(false);
                  fetchActiveStudyPlan();
                }}
                isSaraModal={true}
                onStartWithSara={(curriculumLesson) => {
                  setIsStudyPlanModalOpen(false);
                  handleSelectCurriculumLesson(curriculumLesson);
                }}
                onNavigateToLesson={(courseId, level, unitId) => {
                  handleStartPlanLesson({ courseId, level, unitId });
                }}
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
