import React, { useState, useEffect, useRef } from 'react';
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
  BookMarked
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile, AppView, SaraBoardData, SaraChatResponse, TutorMemoryDoc, proficiencyLevel, CurriculumCategory } from '../types';
import { Language, translations } from '../lib/translations';
import { auth, db } from '../lib/firebase';
import { savePlacementLevel } from '../lib/placement';
import { doc, getDoc, setDoc, updateDoc, collection, addDoc, serverTimestamp, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { speakAcademyText, cancelAllSpeech, playSchoolBellChime } from '../lib/audio';
import { getStudentStreak, StreakData } from '../services/streakService';
import { SmartWhiteboard } from './SmartWhiteboard';
import { Sara3DCharacter } from './Sara3DCharacter';
import { MASTER_CURRICULUM } from '../data/masterCurriculum';
import { PhoneticAnalyzerModal } from './PhoneticAnalyzerModal';
import { RolePlayModal, RolePlayScenario, ROLE_PLAY_SCENARIOS } from './RolePlayModal';
import { SaraPersonalNotebookModal } from './SaraPersonalNotebookModal';
import { SaraCurriculumModal } from './SaraCurriculumModal';
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
  const SARA_STORAGE_KEY = (uid?: string) => `sara_chat_history_${uid || 'guest'}`;

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
  const [activeRolePlay, setActiveRolePlay] = useState<RolePlayScenario | null>(null);
  const [completedMissions, setCompletedMissions] = useState<number[]>([]);
  const [showHesitationEncouragement, setShowHesitationEncouragement] = useState<boolean>(false);
  const [hesitationHintText, setHesitationHintText] = useState<string>('');
  const [saraSpeechRate, setSaraSpeechRate] = useState<number>(1.0);
  const hesitationTimerRef = useRef<any>(null);

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

  // Start a fresh new chat session with archive
  const handleStartNewSession = async () => {
    cancelAllSpeech();
    setShowNewChatConfirm(false);

    // Archive current session to Firestore if it has messages
    if (messages.length > 0 && profile.uid) {
      try {
        const archiveDoc = {
          messages,
          archivedAt: new Date().toISOString(),
          summary: tutorMemory.lastSessionSummary || 'Previous tutoring session',
          messagesCount: messages.length
        };
        await addDoc(collection(db, 'users', profile.uid, 'saraSessions'), archiveDoc);
      } catch (err) {
        console.warn('Archive session note:', err);
      }
    }

    // Clear local storage key
    localStorage.removeItem(SARA_STORAGE_KEY(profile.uid));

    // Reset messages and states
    setMessages([]);
    setActiveBoard(null);
    setIsRestoredSession(false);
    setPlacementState({
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

    // Run fresh welcome
    initWelcome();
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

  // Trigger when session timer reaches 0
  const handleSessionTimeUp = () => {
    if (!isMountedRef.current) return;
    setIsSessionTimeUp(true);
    setIsTimerRunning(false);
    setIsTimeUpModalOpen(true);
    playSchoolBellChime();

    const timeUpNotice = isRtl
      ? `🔔 انتهت الحصة التعليمية المقررة (${timerDurationMinutes} دقائق) يا بطل! أبدعت اليوم واستفدت من وقتك بجدارة. فخورة بالتزامك وجهدك الرائع في هذه الجلسة! 🌟 يمكنك تمديد الحصة أو مراجعة ما تعلمناه.`
      : `🔔 The scheduled lesson time (${timerDurationMinutes} mins) has completed! Outstanding effort today. I am proud of your dedication and progress! 🌟`;

    const timeUpMsg: MessageItem = {
      id: `msg_time_up_${Date.now()}`,
      role: 'sara',
      text: timeUpNotice,
      board: {
        title: isRtl ? '🔔 رن جرس نهاية الحصة التعليمية 🎓' : '🔔 Lesson Bell Has Rung 🎓',
        sentence: 'Great session! Consistency is the secret to mastering English.',
        highlight: 'Consistency is the secret',
        formula: 'Effort + Time = Mastery',
        notes: [
          isRtl ? `أكملت بنجاح حصة مركزة مدتها ${timerDurationMinutes} دقيقة` : `Completed a ${timerDurationMinutes}-minute focused session`,
          isRtl ? 'الاستمرار اليومي هو سر الطلاقة الحقيقية والتفوق' : 'Daily practice is the key to true fluency'
        ],
        openWhiteboard: true
      },
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, timeUpMsg]);
    setActiveBoard(timeUpMsg.board || null);

    if (voiceEnabled) {
      playSaraVoice(timeUpNotice);
    }
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
        playSaraVoice(data.reply, () => {
          if (liveModeRef.current && isMountedRef.current) {
            setTimeout(() => {
              if (liveModeRef.current && !isSpeakingRef.current && !isThinkingRef.current && isMountedRef.current) {
                startListeningTurn();
              }
            }, 350);
          }
        });
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

    // Auto-inform Sara about answer
    const chosenText = activeBoard.quiz.options[index];
    const answerFeedbackMsg = isCorrect 
      ? `اخترت: "${chosenText}" (إجابة صحيحة 🎉)`
      : `اخترت: "${chosenText}" (أحتاج مساعدة لتصحيحها)`;
    handleSendMessage(answerFeedbackMsg);
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

            {/* Start Fresh Session / Archive Button */}
            <button
              onClick={() => setShowNewChatConfirm(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-2xl border-2 text-xs font-bold transition-all cursor-pointer bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300 shadow-2xs"
              title={isRtl ? 'بدء محادثة جديدة (مع أرشفة محادثتك الحالية بأمان)' : 'Start Fresh Chat (archives previous)'}
            >
              <RotateCcw size={13} className="text-slate-500" />
              <span className="hidden lg:inline">{isRtl ? 'محادثة جديدة' : 'New Chat'}</span>
              <span className="hidden sm:inline lg:hidden">{isRtl ? 'جديدة' : 'New'}</span>
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

            {/* 🎙️ Phonetic Pronunciation Lab Button */}
            <button
              onClick={() => {
                setPhoneticTargetSentence(activeBoard?.sentence || 'Welcome to Basim Alkhalil Academy');
                setIsPhoneticModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-2xl border-2 text-xs font-black transition-all cursor-pointer shadow-sm bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 text-purple-900 border-purple-200"
              title={isRtl ? 'مختبر مخارج الحروف وتصحيح النطق الصوتي الفوري' : 'Phonetic Pronunciation Lab'}
            >
              <Mic size={14} className="text-purple-600 animate-pulse" />
              <span className="hidden lg:inline">{isRtl ? 'مختبر النطق 🎙️' : 'Speech Lab 🎙️'}</span>
              <span className="hidden sm:inline lg:hidden">{isRtl ? 'النطق 🎙️' : 'Lab 🎙️'}</span>
            </button>

            {/* 🎭 Role-Play Scenarios Button */}
            <button
              onClick={() => setIsRolePlayModalOpen(true)}
              className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-2xl border-2 text-xs font-black transition-all cursor-pointer shadow-sm ${
                activeRolePlay
                  ? 'bg-amber-100 text-amber-900 border-amber-400 ring-2 ring-amber-300/40'
                  : 'bg-gradient-to-r from-teal-50 to-emerald-50 hover:from-teal-100 hover:to-emerald-100 text-teal-900 border-teal-200'
              }`}
              title={isRtl ? 'سيناريوهات المحادثة وتقمص الأدوار (المطار، المقهى، الطبيب...)' : 'Real-world Role-play Scenarios'}
            >
              <span className="text-sm">🎭</span>
              <span className="hidden lg:inline">{isRtl ? (activeRolePlay ? 'السيناريو نشط 🎭' : 'سيناريوهات 🎭') : 'Role Play 🎭'}</span>
              <span className="hidden sm:inline lg:hidden">{isRtl ? 'سيناريو' : 'Roles'}</span>
            </button>

            {/* ⚡ Sara Speech Speed Controller (0.8x / 1.0x / 1.2x) */}
            <button
              onClick={() => {
                const nextRate = saraSpeechRate === 1.0 ? 0.8 : saraSpeechRate === 0.8 ? 1.2 : 1.0;
                setSaraSpeechRate(nextRate);
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-2xl border-2 text-xs font-black transition-all cursor-pointer bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
              title={isRtl ? `سرعة صوت سارة: ${saraSpeechRate}x (اضغط للتغيير: 0.8x هادئ، 1.0x طبيعي، 1.2x سريع)` : `Speech Speed: ${saraSpeechRate}x`}
            >
              <span className="text-xs">{saraSpeechRate === 0.8 ? '🐢 0.8x' : saraSpeechRate === 1.2 ? '🚀 1.2x' : '⚡ 1.0x'}</span>
            </button>

            {/* 📓 My Error Notebook & Progress Hub Button */}
            <button
              onClick={() => setIsNotebookModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-2xl border-2 text-xs font-black transition-all cursor-pointer shadow-sm bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 text-[#855B14] border-amber-300"
              title={isRtl ? 'دفتر الملاحظات والأخطاء الشخصي + بنك المفردات + تقرير ولي الأمر 📓' : 'My Error Notebook & Parent Report 📓'}
            >
              <BookMarked size={14} className="text-[#C49E3A]" />
              <span className="hidden lg:inline">{isRtl ? 'دفتر الأخطاء والتقرير 📓' : 'Notebook 📓'}</span>
              <span className="hidden sm:inline lg:hidden">{isRtl ? 'دفتر 📓' : 'Notes'}</span>
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

        {/* Mobile Swipeable Action Ribbon (sm:hidden) */}
        <div className="sm:hidden border-t border-slate-100 bg-slate-50/95 backdrop-blur-xs px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar shadow-2xs">
          {/* Whiteboard */}
          <button
            onClick={() => {
              if (isWhiteboardOpen) setIsWhiteboardOpen(false);
              else openWhiteboardModal();
            }}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-black shrink-0 border transition-all flex items-center gap-1 cursor-pointer ${
              isWhiteboardOpen ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-xs' : 'bg-white text-slate-700 border-slate-200'
            }`}
          >
            <span>📐</span>
            <span>{isRtl ? 'السبورة' : 'Whiteboard'}</span>
          </button>

          {/* Sara 3D */}
          <button
            onClick={() => setIsSara3DOpen(!isSara3DOpen)}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-black shrink-0 border transition-all flex items-center gap-1 cursor-pointer ${
              isSara3DOpen ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-xs' : 'bg-white text-slate-700 border-slate-200'
            }`}
          >
            <span>👩‍🏫</span>
            <span>{isRtl ? 'سارة 3D' : 'Sara 3D'}</span>
          </button>

          {/* Placement Test */}
          <button
            onClick={startPlacementTest}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-black shrink-0 border transition-all flex items-center gap-1 cursor-pointer ${
              placementState.isActive ? 'bg-[#002147] text-amber-300 border-amber-400 animate-pulse' : 'bg-blue-50 text-blue-900 border-blue-200'
            }`}
          >
            <Target size={12} className={placementState.isActive ? 'text-amber-300' : 'text-blue-600'} />
            <span>{isRtl ? 'تحديد المستوى' : 'Placement'}</span>
          </button>

          {/* Timer */}
          <button
            onClick={() => setShowTimerDropdown(!showTimerDropdown)}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-black shrink-0 border transition-all flex items-center gap-1 cursor-pointer ${
              !isTimerEnabled || timerDurationMinutes === 0
                ? 'bg-white text-slate-600 border-slate-200'
                : timerSecondsLeft === 0
                ? 'bg-rose-100 text-rose-900 border-rose-300 animate-pulse'
                : 'bg-emerald-50 text-emerald-900 border-emerald-300'
            }`}
          >
            <Clock size={12} />
            <span className="font-mono">
              {!isTimerEnabled || timerDurationMinutes === 0 ? (isRtl ? 'مؤقت ⏱️' : 'Timer') : formatTimerDisplay(timerSecondsLeft)}
            </span>
          </button>

          {/* Pronunciation Lab */}
          <button
            onClick={() => {
              setPhoneticTargetSentence(activeBoard?.sentence || 'Welcome to Basim Alkhalil Academy');
              setIsPhoneticModalOpen(true);
            }}
            className="px-2.5 py-1 rounded-xl text-[11px] font-black shrink-0 border bg-purple-50 text-purple-900 border-purple-200 flex items-center gap-1 cursor-pointer"
          >
            <Mic size={12} className="text-purple-600" />
            <span>{isRtl ? 'مختبر النطق' : 'Speech Lab'}</span>
          </button>

          {/* Role Play */}
          <button
            onClick={() => setIsRolePlayModalOpen(true)}
            className="px-2.5 py-1 rounded-xl text-[11px] font-black shrink-0 border bg-teal-50 text-teal-900 border-teal-200 flex items-center gap-1 cursor-pointer"
          >
            <span>🎭</span>
            <span>{isRtl ? 'سيناريوهات' : 'Role-Play'}</span>
          </button>

          {/* Notebook */}
          <button
            onClick={() => setIsNotebookModalOpen(true)}
            className="px-2.5 py-1 rounded-xl text-[11px] font-black shrink-0 border bg-amber-50 text-[#855B14] border-amber-200 flex items-center gap-1 cursor-pointer"
          >
            <span>📓</span>
            <span>{isRtl ? 'دفتر الأخطاء' : 'Notebook'}</span>
          </button>

          {/* Speed Toggle */}
          <button
            onClick={() => {
              const nextRate = saraSpeechRate === 1.0 ? 0.8 : saraSpeechRate === 0.8 ? 1.2 : 1.0;
              setSaraSpeechRate(nextRate);
            }}
            className="px-2.5 py-1 rounded-xl text-[11px] font-black shrink-0 border bg-white text-slate-700 border-slate-200 flex items-center gap-1 cursor-pointer"
          >
            <span>{saraSpeechRate === 0.8 ? '🐢 0.8x' : saraSpeechRate === 1.2 ? '🚀 1.2x' : '⚡ 1.0x'}</span>
          </button>

          {/* New Chat */}
          <button
            onClick={() => setShowNewChatConfirm(true)}
            className="px-2.5 py-1 rounded-xl text-[11px] font-black shrink-0 border bg-white text-slate-700 border-slate-200 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw size={11} className="text-slate-500" />
            <span>{isRtl ? 'جديدة' : 'New'}</span>
          </button>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. MAIN CONTENT AREA (BOARD + CHAT) */}
      {/* ======================================================== */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-3 sm:p-5 flex flex-col gap-4 overflow-hidden">
        
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
                <p className="text-[11px] text-slate-600 truncate mt-0.5">
                  {isRtl ? 'المنهج المشروح حالياً مع سارة بالصوت والكتابة على السبورة الذكية 👩‍🏫📐' : 'Active curriculum lesson being explained by Sara'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => {
                  setIsWhiteboardOpen(true);
                  if (voiceEnabled) {
                    const exp = buildSaraCurriculumExplanation(activeCurriculumLesson, activeLang);
                    playSaraVoice(exp.spokenIntro);
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition-all cursor-pointer flex items-center gap-1 shadow-2xs active:scale-95"
                title={isRtl ? 'فتح السبورة الذكية وإعادة الشرح الصوتي' : 'Replay audio walkthrough on whiteboard'}
              >
                <span>📐🎙️</span>
                <span>{isRtl ? 'إعادة الشرح' : 'Re-explain'}</span>
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
        {/* 2A-0. ROLE-PLAY ACTIVE SCENARIO SIMULATION BANNER */}
        {/* ======================================================== */}
        {activeRolePlay && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-slate-900 via-[#002147] to-[#093568] text-white p-3.5 sm:p-4 rounded-3xl shadow-lg border-2 border-[#C49E3A]/40 relative overflow-hidden"
          >
            <div className="flex items-center justify-between gap-2 mb-2.5 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-2xl p-1 bg-white/10 rounded-2xl border border-white/10">{activeRolePlay.badge}</span>
                <div>
                  <span className="text-[10px] font-black uppercase text-[#C49E3A] tracking-wider block">
                    {isRtl ? 'محاكاة واقعية جارية 🎭' : 'Active Scenario Simulation 🎭'}
                  </span>
                  <h2 className="text-sm sm:text-base font-black text-white">
                    {isRtl ? activeRolePlay.titleAr : activeRolePlay.titleEn}
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] bg-white/10 px-2.5 py-1 rounded-xl text-slate-200 font-bold border border-white/10">
                  📍 {activeRolePlay.location}
                </span>
                <button
                  onClick={handleEndRolePlay}
                  className="px-2.5 py-1 bg-rose-500/80 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                >
                  {isRtl ? 'إنهاء السيناريو ✕' : 'Exit Role-Play ✕'}
                </button>
              </div>
            </div>

            {/* Roles info */}
            <div className="grid grid-cols-2 gap-2 bg-white/10 rounded-2xl p-2 text-xs mb-3">
              <div className="text-center py-1">
                <span className="text-slate-300 text-[10px] block font-bold">{isRtl ? 'دور سارة:' : 'Sara Role:'}</span>
                <span className="font-black text-[#FDE68A]">{isRtl ? activeRolePlay.roleSaraAr : activeRolePlay.roleSaraEn}</span>
              </div>
              <div className="text-center py-1 border-s border-white/15">
                <span className="text-slate-300 text-[10px] block font-bold">{isRtl ? 'دورك أنت:' : 'Your Role:'}</span>
                <span className="font-black text-emerald-300">{isRtl ? activeRolePlay.roleStudentAr : activeRolePlay.roleStudentEn}</span>
              </div>
            </div>

            {/* Scenario Completion Celebration Banner */}
            {completedMissions.length >= (activeRolePlay.missionsAr?.length || 3) && (
              <div className="bg-gradient-to-r from-amber-500/30 via-emerald-500/30 to-amber-500/30 border-2 border-amber-300/80 rounded-2xl p-2.5 mb-3 text-center shadow-lg">
                <span className="text-xs sm:text-sm font-black text-amber-200 flex items-center justify-center gap-1.5">
                  <span>🏆</span>
                  <span>{isRtl ? 'كفو يا بطل! أتممت جميع مهام هذا السيناريو بامتياز وطلاقة! 🌟' : 'Bravo! You mastered all missions in this scenario! 🌟'}</span>
                </span>
              </div>
            )}

            {/* Missions Tracker */}
            <div className="space-y-1.5 mb-3">
              <span className="text-[11px] font-black text-amber-200 block">
                {isRtl ? 'مهام المحادثة المستهدفة:' : 'Target Missions:'}
              </span>
              {(isRtl ? activeRolePlay.missionsAr : activeRolePlay.missionsEn).map((mission, mIdx) => {
                const isDone = completedMissions.includes(mIdx);
                return (
                  <div key={`mission-${mIdx}`} className="flex items-center gap-2 text-xs bg-black/25 px-3 py-1.5 rounded-xl border border-white/5">
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${isDone ? 'bg-emerald-500 text-white' : 'bg-white/20 text-slate-300'}`}>
                      {isDone ? '✓' : mIdx + 1}
                    </span>
                    <span className={`flex-1 font-bold ${isDone ? 'line-through text-slate-400' : 'text-slate-100'}`}>
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
                  {isRtl ? '💡 جمل مقترحة (اضغط للإرسال والمحادثة فوراً):' : '💡 Suggested phrases (tap to send):'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeRolePlay.starterPrompts.map((prompt, pIdx) => (
                    <button
                      key={`rp-p-${pIdx}`}
                      onClick={() => handleSendMessage(prompt)}
                      className="text-[11px] bg-white/15 hover:bg-[#C49E3A] hover:text-slate-950 text-slate-100 px-2.5 py-1 rounded-xl transition-all cursor-pointer font-bold border border-white/10"
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

              {/* Interactive Mini-Quiz inside the Board */}
              {activeBoard.quiz && (
                <div className="bg-amber-50/50 border-2 border-amber-200 rounded-2xl p-3.5 sm:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded-full bg-[#C49E3A] text-white text-[10px] font-black flex items-center justify-center">?</span>
                    <p className="text-xs sm:text-sm font-black text-[#002147]">
                      {activeBoard.quiz.question}
                    </p>
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
                  : (isRtl ? 'اكتب لسارة بالعربية أو الإنجليزية، أو اضغط محادثة لايف...' : 'Type to Sara in Arabic or English, or start Live...')
              }
              className="flex-1 bg-transparent px-2 sm:px-2.5 py-1.5 text-sm sm:text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none min-w-0"
            />

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
              onClick={() => setShowNewChatConfirm(true)}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#002147] hover:bg-slate-100 text-slate-600 shrink-0 transition-all cursor-pointer shadow-2xs flex items-center gap-1 font-bold text-[10px] sm:text-xs"
            >
              <RotateCcw size={11} />
              <span>{isRtl ? '🔄 محادثة جديدة' : '🔄 New Chat'}</span>
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
        onSpeak={(txt) => playSaraVoice(txt)}
        onQuizAnswer={handleQuizOptionClick}
        quizSelectedOption={quizSelectedOption}
        quizFeedback={quizFeedback}
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

      {/* 6. Start New Chat Confirmation Modal */}
      <AnimatePresence>
        {showNewChatConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-5 sm:p-6 max-w-sm w-full border-2 border-slate-200 shadow-2xl text-center space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto text-xl shadow-xs">
                🔄
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-black text-[#002147]">
                  {isRtl ? 'بدء محادثة جديدة مع سارة؟' : 'Start Fresh Chat with Sara?'}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                  {isRtl
                    ? 'سيتم أرشفة وحفظ محادثتك الحالية بأمان حتى لا تفقد أي معلومة، وتبدأ سارة معك جلسة تدريبية جديدة بترحيب ونشاط 🌟'
                    : 'Your current chat will be safely archived so no progress is lost, and Sara will begin a fresh practice lesson with you 🌟'}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setShowNewChatConfirm(false)}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 text-slate-600 font-black text-xs hover:bg-slate-50 transition-all cursor-pointer"
                >
                  {isRtl ? 'إلغاء وإكمال الحالية' : 'Cancel & Continue'}
                </button>
                <button
                  onClick={handleStartNewSession}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#002147] hover:bg-[#C49E3A] text-white font-black text-xs transition-all shadow-md cursor-pointer"
                >
                  {isRtl ? 'نعم، ابدأ جديدة 🚀' : 'Yes, Start New 🚀'}
                </button>
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
    </div>
  );
};
