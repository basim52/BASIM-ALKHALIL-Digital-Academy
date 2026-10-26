import { setExplainLang } from '../lib/explainLang';
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { MessageCircle, 
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
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Gamepad2,
  Trash2,
  Brain,
  Phone,
  FileText,
  Headphones,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile, AppView, SaraBoardData, SaraChatResponse, TutorMemoryDoc, proficiencyLevel, CurriculumCategory, StudyPlan, LearningStyleType, LearningPacingType } from '../types';
import { Language, translations } from '../lib/translations';
import { auth, db, googleProvider } from '../lib/firebase';
import { signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { savePlacementLevel } from '../lib/placement';
import { doc, getDoc, setDoc, updateDoc, collection, addDoc, serverTimestamp, getDocs, query, orderBy, limit, increment, where, deleteDoc } from 'firebase/firestore';
import { speakAcademyText, playDirectSaraAudio, cancelAllSpeech, playSchoolBellChime } from '../lib/audio';
import { getStudentStreak, recordStreakActivity, StreakData } from '../services/streakService';
import { SmartWhiteboard } from './SmartWhiteboard';
import { MASTER_CURRICULUM } from '../data/masterCurriculum';
import { RolePlayScenario, ROLE_PLAY_SCENARIOS } from './RolePlayModal';
import { SaraPersonalNotebookModal } from './SaraPersonalNotebookModal';
import { SaraAdaptiveMemoryModal } from './SaraAdaptiveMemoryModal';
import { SaraParentInsightsModal } from './SaraParentInsightsModal';
import { SaraAchievementsModal } from './SaraAchievementsModal';
import { SaraLivePhoneCallModal } from './SaraLivePhoneCallModal';
import { FREE_CALL_PRESET } from './SaraLessonCall';
import { SaraCurriculumModal } from './SaraCurriculumModal';
import { SaraTracksHub } from './SaraTracksHub';
import { SaraListeningPlayer } from './SaraListeningPlayer';
import { SaraPronunciationPlayer } from './SaraPronunciationPlayer';
import { SaraVocabPlayer } from './SaraVocabPlayer';
import { SaraDailyPlayer } from './SaraDailyPlayer';
import { SaraExamPrep } from './SaraExamPrep';
import { DAILY_LESSONS } from '../data/saraTracks/dailyLife';
import { VOCAB_LESSONS } from '../data/saraTracks/vocabulary';
import { PRONUNCIATION_LESSONS } from '../data/saraTracks/pronunciation';
import { LISTENING_LESSONS } from '../data/saraTracks/listening';
import { FOUNDATIONS_TRACK as SARA_FOUND_T } from '../data/saraTracks/foundations';
import { ADVANCED_TRACK as SARA_ADV_T } from '../data/saraTracks/advanced';
import { CONVERSATION_TRACK as SARA_CONV_T } from '../data/saraTracks/conversation';
import { READING_TRACK as SARA_READ_T } from '../data/saraTracks/reading';
import { WRITING_TRACK as SARA_WRITE_T } from '../data/saraTracks/writing';
const saraBuilt = (...ts: { lessons: { content?: unknown }[] }[]) => ts.reduce((n, t) => n + t.lessons.filter(l => l.content).length, 0);
import { SaraTools, type SaraToolId } from './SaraTools';
import { MASTER_ADMINS, UserRole } from '../types';
import { getScenarioEducationalContent } from '../data/saraScenarioCurriculumData';
import { buildSaraLessonContext } from '../utils/saraLessonContext';
import { CurriculumLesson, getAllCurriculumLessons } from '../utils/academicCurriculumCatalogue';
import { loadOnboarding, readLocalOnboarding } from '../lib/onboarding';
const TodayPathCard = React.lazy(() => import('./onboarding/PathHome').then(m => ({ default: m.TodayPathCard })));

interface MessageItem {
  id: string;
  role: 'user' | 'sara';
  text: string;
  board?: SaraBoardData;
  actions?: { type: 'open_section'; sectionId: string }[];
  timestamp: number;
  /** Local-only status bubble (sign-in needed / retry). Never sent to the model. */
  notice?: 'auth' | 'retry';
  retryText?: string;
  retryOfId?: string;
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


/** Firestore rejects undefined and arrays-of-arrays; docs max ~1 MiB. Slim archive payloads. */
const SARA_SESSION_MAX_BYTES = 900_000;

function flattenNestedArraysForFirestore(value: unknown): unknown {
  if (value === null || value === undefined) return value;
  if (Array.isArray(value)) {
    return value.map((item) =>
      Array.isArray(item) ? JSON.stringify(item) : flattenNestedArraysForFirestore(item)
    );
  }
  if (typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = flattenNestedArraysForFirestore(v);
    }
    return out;
  }
  return value;
}

function trimBoardForSaraArchive(board: SaraBoardData | null | undefined): Record<string, unknown> | null {
  if (!board) return null;
  const trimmed: Record<string, unknown> = {
    title: board.title ?? null,
    sentence: board.sentence ?? null,
    highlight: board.highlight ?? null,
    correction: board.correction ?? null,
    quiz: board.quiz ?? null,
    quizzes: board.quizzes ?? null,
    notes: board.notes ?? null,
    formula: board.formula ?? null,
    diagram: board.diagram ?? null,
    teacherNote: board.teacherNote ?? null,
    phoneticBreakdown: board.phoneticBreakdown ?? null,
    grammarBreakdown: board.grammarBreakdown ?? null,
    drillChallenge: board.drillChallenge ?? null,
    learningTip: board.learningTip ?? null,
    commonPitfall: board.commonPitfall ?? null,
    mnemonic: board.mnemonic ?? null,
    ccq: board.ccq ?? null,
    vocabularyBank: board.vocabularyBank ?? null,
    speakingPrompt: board.speakingPrompt
      ? {
          instruction: board.speakingPrompt.instruction,
          sampleAnswer: board.speakingPrompt.sampleAnswer ?? null,
        }
      : null,
    voiceExplanation: board.voiceExplanation
      ? String(board.voiceExplanation).slice(0, 2000)
      : null,
  };
  return flattenNestedArraysForFirestore(
    JSON.parse(JSON.stringify(trimmed))
  ) as Record<string, unknown>;
}

function buildSaraSessionArchiveDoc(fields: {
  date: string;
  dateYmd: string;
  archivedAt: string;
  lessonTitle: string | null;
  lessonName: string | null;
  snippet: string;
  messages: MessageItem[];
  activeBoard: SaraBoardData | null;
  score?: number;
  total?: number;
  percentage?: number;
  pointsEarned?: number;
  status?: string;
}): Record<string, unknown> {
  const slimMessages = fields.messages.map((m) => ({
    role: m.role,
    text: String(m.text ?? '').slice(0, 4000),
    timestamp: typeof m.timestamp === 'number' ? m.timestamp : Date.now(),
  }));

  let docData: Record<string, unknown> = JSON.parse(
    JSON.stringify({
      date: fields.date,
      dateYmd: fields.dateYmd,
      archivedAt: fields.archivedAt,
      lessonTitle: fields.lessonTitle,
      lessonName: fields.lessonName,
      messagesCount: fields.messages.length,
      snippet: fields.snippet,
      messages: slimMessages,
      activeBoard: trimBoardForSaraArchive(fields.activeBoard),
      ...(fields.score !== undefined ? { score: fields.score } : {}),
      ...(fields.total !== undefined ? { total: fields.total } : {}),
      ...(fields.percentage !== undefined ? { percentage: fields.percentage } : {}),
      ...(fields.pointsEarned !== undefined ? { pointsEarned: fields.pointsEarned } : {}),
      ...(fields.status !== undefined ? { status: fields.status } : {}),
    })
  );
  docData = flattenNestedArraysForFirestore(docData) as Record<string, unknown>;

  const byteLen = (v: unknown) => new TextEncoder().encode(JSON.stringify(v)).length;
  while (byteLen(docData) > SARA_SESSION_MAX_BYTES) {
    const msgs = docData.messages as unknown[] | undefined;
    if (Array.isArray(msgs) && msgs.length > 4) {
      docData = {
        ...docData,
        messages: msgs.slice(0, Math.max(4, Math.ceil(msgs.length / 2))),
        messagesTruncated: true,
      };
      continue;
    }
    if (docData.activeBoard) {
      const board = docData.activeBoard as Record<string, unknown>;
      docData = {
        ...docData,
        activeBoard: {
          title: board.title ?? null,
          sentence: board.sentence ?? null,
        },
        boardTruncated: true,
      };
      if (byteLen(docData) > SARA_SESSION_MAX_BYTES) {
        docData = { ...docData, activeBoard: null };
      }
      break;
    }
    break;
  }
  return docData;
}


interface SaraTutorProps {
  lang: Language;
  profile: UserProfile;
  onNavigate: (view: AppView) => void;
  onBack: () => void;
  onProfileUpdated?: (updated: UserProfile) => void;
  onLangChange?: (newLang: Language) => void;
  onNavigateToLesson?: (courseId: string, level: string, unitId: string) => void;
  initialLesson?: any;
  /** Open a feature right away (used when old routes point here, e.g. the old voice-call screen). */
  initialAction?: 'call';
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
  onLangChange,
  onNavigateToLesson,
  initialLesson,
  initialAction
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
  // Sara's curriculum is being rebuilt: the board stays EMPTY. Every board write (chat replies,
  // restored sessions, lesson launches) is blocked here at the single state setter.
  const [activeBoard, _setActiveBoardRaw] = useState<SaraBoardData | null>(null);
  const setActiveBoard = useCallback((_next?: unknown) => { _setActiveBoardRaw(null); }, []);
  useEffect(() => {
    // One-time purge of old cached boards (version-bumped key).
    try {
      if (localStorage.getItem('sara_board_cache_v') === '2') return;
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const k = localStorage.key(i);
        if (!k || !k.startsWith('sara_')) continue;
        const raw = localStorage.getItem(k);
        if (!raw || !raw.includes('board')) continue;
        try {
          const strip = (v: any): any => Array.isArray(v) ? v.map(strip)
            : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).filter(([key]) => key !== 'board' && key !== 'activeBoard').map(([key, val]) => [key, strip(val)]))
            : v;
          localStorage.setItem(k, JSON.stringify(strip(JSON.parse(raw))));
        } catch { /* non-JSON value */ }
      }
      localStorage.setItem('sara_board_cache_v', '2');
    } catch { /* storage unavailable */ }
  }, []);
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);
  const [currentWhiteboardPageIndex, setCurrentWhiteboardPageIndex] = useState<number>(0);
  
  const handleWhiteboardPageIndexChange = useCallback((idx: number) => {
    setCurrentWhiteboardPageIndex(idx);
  }, []);
  
  // 3D Sara Character Floating Presence
  const [isSara3DOpen, setIsSara3DOpen] = useState(false);
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
  const [mobileTab, setMobileTab] = useState<'chat' | 'board' | 'curriculum' | 'scenarios' | 'lab'>('chat');
  // 💬 The chat lives on its own full-screen view. Browser/phone back closes it (one history entry while open).
  const [chatViewOpen, setChatViewOpen] = useState<boolean>(false);
  const chatHistoryPushedRef = useRef(false);
  const openChatView = useCallback(() => {
    setChatViewOpen(true);
    if (!chatHistoryPushedRef.current && typeof window !== 'undefined') {
      try { window.history.pushState({ ...(window.history.state || {}), saraChat: true }, ''); chatHistoryPushedRef.current = true; } catch (e) {}
    }
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ block: 'end' }), 60);
  }, []);
  const closeChatView = useCallback(() => {
    if (chatHistoryPushedRef.current) { try { window.history.back(); return; } catch (e) {} }
    setChatViewOpen(false);
  }, []);
  useEffect(() => {
    const onPop = () => { if (chatHistoryPushedRef.current) { chatHistoryPushedRef.current = false; setChatViewOpen(false); } };
    window.addEventListener('popstate', onPop);
    return () => {
      window.removeEventListener('popstate', onPop);
      // Leaving Sara's page with the chat open: drop our history entry so the app's back stays correct.
      if (chatHistoryPushedRef.current) { chatHistoryPushedRef.current = false; try { window.history.back(); } catch (e) {} }
    };
  }, []);
  // Lock page scroll behind the full-screen chat.
  useEffect(() => {
    if (!chatViewOpen) return;
    const prev = document.body.style.overflow; document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [chatViewOpen]);
  const [isMobileActivityCapsuleExpanded, setIsMobileActivityCapsuleExpanded] = useState<boolean>(false);
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
  const [isTimerEnabled, setIsTimerEnabled] = useState<boolean>(false);
  const [isTimeUpModalOpen, setIsTimeUpModalOpen] = useState<boolean>(false);
  const [isSessionTimeUp, setIsSessionTimeUp] = useState<boolean>(false);
  const hasTriggeredTimeUpRef = useRef<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Anything that talks to Sara from the main page (suggested questions, tools, triggers) opens the chat view:
  // open on any NEW message added after the page settled (old history / the greeting don't count).
  const chatMountedAtRef = useRef<number>(Date.now());
  const lastMsgCountRef = useRef<number>(0);
  useEffect(() => {
    const n = messages.length; const prevN = lastMsgCountRef.current; lastMsgCountRef.current = n;
    if (n <= prevN || chatViewOpen) return;
    const last = messages[n - 1] as any;
    const ts = Number(last?.timestamp) || 0;
    if (Date.now() - chatMountedAtRef.current < 2500 || ts < chatMountedAtRef.current + 2500) return;
    openChatView();
  }, [messages, chatViewOpen, openChatView]);
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
  const [saraTool, setSaraTool] = useState<SaraToolId | null>(null);
  const BOARD_TEACHERS: [string, string, string][] = [['sara', 'سارة', 'Sara'], ['grammar', 'نورة', 'Noura'], ['business', 'محمد', 'Mohammed'], ['exams', 'علي', 'Ali'], ['lama', 'لمى', 'Lama'], ['reem', 'ريم', 'Reem'], ['haya', 'هيا', 'Haya'], ['jana', 'جنى', 'Jana']];
  /** 🧑‍🏫 فصل المعلمين — the first thing on Sara's page: a full-width navy & gold hero with all 8 teacher portraits. */
  const renderTeachersBanner = () => (
          <button
            type="button"
            onClick={() => setSaraTool('board')}
            data-testid="sara-board-tool"
            aria-label={isRtl ? "فصل المعلمين" : "Teachers' Class"}
            className="group relative w-full overflow-hidden rounded-3xl border border-[#C49E3A]/70 bg-gradient-to-l from-[#001a38] via-[#002147] to-[#0a2d5c] px-4 py-5 sm:px-7 sm:py-7 text-start shadow-lg hover:shadow-xl hover:border-[#C49E3A] transition-all active:scale-[0.995] cursor-pointer"
          >
            <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-l from-transparent via-[#C49E3A] to-transparent" />
            <span aria-hidden className="pointer-events-none absolute -left-16 -top-16 w-56 h-56 rounded-full bg-[#C49E3A]/10 blur-3xl" />
            <span className="relative flex items-center gap-3 sm:gap-4">
              <span className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl border-2 border-[#C49E3A] bg-[#001a38] flex items-center justify-center text-[22px] sm:text-[26px] shadow-inner">🧑‍🏫</span>
              <span className="min-w-0 flex-1">
                <span className="block text-[20px] sm:text-[26px] font-black text-[#E8C766] leading-tight">{isRtl ? 'فصل المعلمين' : "Teachers' Class"}</span>
                <span className="block mt-1 text-[12px] sm:text-[14px] font-bold text-white/80">{isRtl ? 'دروس على السبورة بصوت كل معلم — اختر معلمك وابدأ' : "Board lessons in each teacher's own voice — pick a teacher and start"}</span>
              </span>
              <span className="hidden sm:inline-flex shrink-0 items-center gap-1.5 rounded-2xl bg-[#C49E3A] group-hover:bg-[#d4ae4a] text-[#002147] font-black text-[13px] px-4 py-2.5 shadow-md transition-colors">
                {isRtl ? 'ادخل الفصل' : 'Enter class'}{isRtl ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
              </span>
            </span>
            {/* 8 teacher portraits: 4×2 on phone, one row of 8 from tablet up. */}
            <span className="relative mt-5 sm:mt-6 grid grid-cols-4 md:grid-cols-8 gap-x-2 gap-y-4 sm:gap-x-3" data-testid="sara-board-teachers">
              {BOARD_TEACHERS.map(([img, a, e]) => (
                <span key={img} className="min-w-0 flex flex-col items-center gap-1.5">
                  <img src={`/tutors/${img}.webp`} alt="" width={80} height={80} loading="lazy" decoding="async" className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover bg-[#0a2d5c] border-2 border-[#C49E3A]/80 group-hover:border-[#C49E3A] shadow-md transition-colors" />
                  <span className="max-w-full truncate text-[12px] sm:text-[13px] font-black text-amber-100 leading-none">{isRtl ? a : e}</span>
                </span>
              ))}
            </span>
            <span className="sm:hidden relative mt-5 flex w-full items-center justify-center gap-1.5 rounded-2xl bg-[#C49E3A] text-[#002147] font-black text-[13px] py-2.5 shadow-md">
              {isRtl ? 'ادخل الفصل' : 'Enter class'}{isRtl ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
            </span>
          </button>
  );
  /** 💬 «تكلّم مع سارة» — the chat now lives on its own full-screen view; this card opens it. */
  const renderTalkToSaraCard = () => (
          <div data-testid="sara-talk-card" className="relative overflow-hidden rounded-3xl border border-[#C49E3A]/60 bg-gradient-to-l from-[#002147] to-[#0a2d5c] px-4 py-4 sm:px-6 sm:py-5 shadow-lg">
            <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-l from-transparent via-[#C49E3A] to-transparent" />
            <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                <img src="/tutors/sara.webp" alt="" width={64} height={64} className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-full object-cover bg-[#001a38] border-2 border-[#C49E3A] shadow-md" />
                <div className="min-w-0">
                  <h2 className="text-[18px] sm:text-[21px] font-black text-[#E8C766] leading-tight">{isRtl ? 'تكلّم مع سارة' : 'Talk to Sara'}</h2>
                  <p className="mt-1 text-[12px] sm:text-[13px] font-bold text-white/80">{isRtl ? 'اسألها أي شي بالعربي أو الإنجليزي، بالكتابة أو بصوتك' : 'Ask her anything in Arabic or English, by text or voice'}</p>
                </div>
              </div>
              <button type="button" onClick={() => openChatView()} data-testid="open-sara-chat"
                className="shrink-0 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#C49E3A] hover:bg-[#d4ae4a] text-[#002147] font-black text-[14px] px-6 py-3 shadow-md transition-all active:scale-95 cursor-pointer">
                <MessageCircle size={17} />{isRtl ? 'ابدأ المحادثة' : 'Start chatting'}
              </button>
            </div>
          </div>
  );
  const [isPhoneticModalOpen, _raw_setIsPhoneticModalOpen] = useState<boolean>(false);
  // Tool icon opens the matching Sara tool page (SaraTools).
  const setIsPhoneticModalOpen = (v: boolean | ((p: boolean) => boolean)) => { _raw_setIsPhoneticModalOpen(false); if (v === true) setSaraTool('pronunciation'); };
  const [phoneticTargetSentence, setPhoneticTargetSentence] = useState<string>('');
  const [isRolePlayModalOpen, _raw_setIsRolePlayModalOpen] = useState<boolean>(false);
  // Tool icon opens the matching Sara tool page (SaraTools).
  const setIsRolePlayModalOpen = (v: boolean | ((p: boolean) => boolean)) => { _raw_setIsRolePlayModalOpen(false); if (v === true) setSaraTool('roleplay'); };
  const [rolePlayInitialTab, setRolePlayInitialTab] = useState<'lesson' | 'exercises' | 'quiz' | 'simulate'>('lesson');
  const [rolePlayInitialId, setRolePlayInitialId] = useState<string | undefined>(undefined);
  const [isNotebookModalOpen, setIsNotebookModalOpen] = useState<boolean>(false);
  const [isAdaptiveMemoryModalOpen, setIsAdaptiveMemoryModalOpen] = useState<boolean>(false);
  const [isVoiceCoachModalOpen, _raw_setIsVoiceCoachModalOpen] = useState<boolean>(false);
  // Tool icon opens the matching Sara tool page (SaraTools).
  const setIsVoiceCoachModalOpen = (v: boolean | ((p: boolean) => boolean)) => { _raw_setIsVoiceCoachModalOpen(false); if (v === true) setSaraTool('voicecoach'); };
  const [isSpeedDrillModalOpen, _raw_setIsSpeedDrillModalOpen] = useState<boolean>(false);
  // Tool icon opens the matching Sara tool page (SaraTools).
  const setIsSpeedDrillModalOpen = (v: boolean | ((p: boolean) => boolean)) => { _raw_setIsSpeedDrillModalOpen(false); if (v === true) setSaraTool('speed'); };
  const [isParentInsightsModalOpen, setIsParentInsightsModalOpen] = useState<boolean>(false);
  const [isAchievementsModalOpen, setIsAchievementsModalOpen] = useState<boolean>(false);
  const [isWorksheetModalOpen, _raw_setIsWorksheetModalOpen] = useState<boolean>(false);
  // Tool icon opens the matching Sara tool page (SaraTools).
  const setIsWorksheetModalOpen = (v: boolean | ((p: boolean) => boolean)) => { _raw_setIsWorksheetModalOpen(false); if (v === true) setSaraTool('worksheet'); };
  const [isPhoneCallModalOpen, setIsPhoneCallModalOpen] = useState<boolean>(false);
  const [isFreeChatOpen, setIsFreeChatOpen] = useState<boolean>(false);
  useEffect(() => { if (initialAction === 'call') setIsPhoneCallModalOpen(true); }, [initialAction]);
  const [isContinuityBannerDismissed, setIsContinuityBannerDismissed] = useState<boolean>(false);

  // Active Curriculum Lesson & Modal States
  const [activeCurriculumLesson, setActiveCurriculumLesson] = useState<any | null>(null);
  const [isCurriculumModalOpen, setIsCurriculumModalOpen] = useState<boolean>(false);
  const [curriculumInitialPillar, setCurriculumInitialPillar] = useState<string>('all');

  const [isTrackOpen, setIsTrackOpen] = useState<boolean>(false);
  // Sara's spoken welcome arrives seconds after the page opens (AI reply). If the student already went into another
  // screen (فصل المعلمين / a tool / a track), keep the greeting as text only, so Sara's voice never talks over another teacher.
  const welcomeVoiceBlockedRef = useRef(false);
  welcomeVoiceBlockedRef.current = saraTool !== null || isTrackOpen;
  const [isListeningOpen, setIsListeningOpen] = useState(false);
  const [isPronOpen, setIsPronOpen] = useState(false);
  const [isVocabOpen, setIsVocabOpen] = useState(false);
  const [isDailyOpen, setIsDailyOpen] = useState(false);
  const [isExamOpen, setIsExamOpen] = useState(false);
  const [trackFilter, setTrackFilter] = useState<'all' | 'grammar' | 'conversation' | 'reading' | 'writing'>('all');
  const handleOpenCurriculum = (pillar: string = 'all') => {
    setCurriculumInitialPillar(pillar);
    // 📚/🌐 → all built tracks; 🧠 → foundations + advanced grammar; 💬 → conversation. Others stay "under construction".
    if (pillar === 'listening') { setIsListeningOpen(true); return; }
    if (pillar === 'pronunciation') { setIsPronOpen(true); return; }
    if (pillar === 'vocabulary') { setIsVocabOpen(true); return; }
    if (pillar === 'daily') { setIsDailyOpen(true); return; }
    if (pillar === 'all' || pillar === 'grammar' || pillar === 'conversation' || pillar === 'reading' || pillar === 'writing') { setTrackFilter(pillar); setIsTrackOpen(true); return; }
    setIsCurriculumModalOpen(true);
  };

  // 🗓️ Smart Academic Study Plan States (Identical to Academy)
  const [isStudyPlanModalOpen, _raw_setIsStudyPlanModalOpen] = useState<boolean>(false);
  // Tool icon opens the matching Sara tool page (SaraTools).
  const setIsStudyPlanModalOpen = (v: boolean | ((p: boolean) => boolean)) => { _raw_setIsStudyPlanModalOpen(false); if (v === true) setSaraTool('plan'); };
  const [activeStudyPlan, setActiveStudyPlan] = useState<StudyPlan | null>(null);
  const [isLoadingStudyPlan, setIsLoadingStudyPlan] = useState<boolean>(false);
  const [isStudyPlanBannerDismissed, setIsStudyPlanBannerDismissed] = useState<boolean>(false);
  /** The student's saved onboarding path plan (device first, then cloud) — only used to tidy the home banners. */
  const [pathPlanSaved, setPathPlanSaved] = useState<boolean>(() => { const r = readLocalOnboarding(profile?.uid) as any; return !!(r?.done && r?.plan); });
  useEffect(() => { let alive = true; loadOnboarding(profile?.uid, (profile as any)?.onboarding).then(r => { if (alive) setPathPlanSaved(!!(r?.done && r?.plan)); }).catch(() => {}); return () => { alive = false; }; }, [profile?.uid, (profile as any)?.onboarding?.updatedAt]); // eslint-disable-line react-hooks/exhaustive-deps
  const [isSmartPlanGeneratorOpen, _raw_setIsSmartPlanGeneratorOpen] = useState<boolean>(false);
  // Tool icon opens the matching Sara tool page (SaraTools).
  const setIsSmartPlanGeneratorOpen = (v: boolean | ((p: boolean) => boolean)) => { _raw_setIsSmartPlanGeneratorOpen(false); if (v === true) setSaraTool('plan'); };
  const [activeRolePlay, setActiveRolePlay] = useState<RolePlayScenario | null>(null);
  const [completedMissions, setCompletedMissions] = useState<number[]>([]);
  const [showHesitationEncouragement, setShowHesitationEncouragement] = useState<boolean>(false);
  const [hesitationHintText, setHesitationHintText] = useState<string>('');
  const [saraSpeechRate, setSaraSpeechRate] = useState<number>(1.0);
  const hesitationTimerRef = useRef<any>(null);

  // Lesson Completion & Result Tracking States
  const [isLessonCompletedModalOpen, setIsLessonCompletedModalOpen] = useState<boolean>(false);
  const [isSavingLessonResult, setIsSavingLessonResult] = useState<boolean>(false);
  /** Prevents duplicate lessonResults / XP / streak writes on archival retry */
  const lessonRewardsGrantedRef = useRef<Set<string>>(new Set());
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
  const [nextLessonAfterBreak, setNextLessonAfterBreak] = useState<any | null>(null);
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
    setExplainLang(nextLang); // one site-wide ع/EN switch
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

  // Select and launch a scenario or lesson with Sara
  // Old-curriculum lesson launches (plan banners, daily lessons, deep links) now open the new Sara tracks.
  const handleSelectCurriculumLesson = (_lesson?: any, _targetMode?: 'slides' | 'exercises' | 'quiz') => {
    cancelAllSpeech();
    setActiveCurriculumLesson(null);
    setIsCurriculumModalOpen(false);
    setIsStudyPlanModalOpen(false);
    setTrackFilter('all');
    setIsTrackOpen(true);
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
          try {
            localStorage.setItem(`sara_active_plan_${targetUid}`, JSON.stringify(plans[0]));
          } catch (_) {}
          return;
        } else {
          // If no plans found in cloud for this real user, clean up stale local storage!
          localStorage.removeItem(`sara_active_plan_${targetUid}`);
          localStorage.removeItem(`academic_saved_plans_${targetUid}`);
          setActiveStudyPlan(null);
          return;
        }
      }
      // For simulated/guest users
      const local = localStorage.getItem(`sara_active_plan_${targetUid}`);
      if (local) {
        setActiveStudyPlan(JSON.parse(local));
      } else {
        setActiveStudyPlan(null);
      }
    } catch (err) {
      console.debug('Active study plan fetch note:', err);
      // Fallback only if Firestore query errored (e.g. offline)
      const local = localStorage.getItem(`sara_active_plan_${targetUid}`);
      if (local) {
        try {
          setActiveStudyPlan(JSON.parse(local));
        } catch (_) {}
      }
    } finally {
      setIsLoadingStudyPlan(false);
    }
  }, [profile.uid]);

  // Handler to explicitly delete the active plan directly from Sara
  const handleDeleteActivePlan = useCallback(async () => {
    if (!window.confirm(isRtl ? 'هل أنت متأكد من حذف هذه الخطة الدراسية نهائياً؟' : 'Are you sure you want to delete this study plan?')) {
      return;
    }
    const targetUid = auth.currentUser?.uid || profile.uid;
    const planId = activeStudyPlan?.id;
    try {
      if (planId && !planId.startsWith('plan_') && !targetUid?.startsWith('sim_')) {
        await deleteDoc(doc(db, 'studyPlans', planId));
      }
    } catch (e) {
      console.warn('Failed to delete study plan from Firestore:', e);
    }
    if (targetUid) {
      localStorage.removeItem(`sara_active_plan_${targetUid}`);
      localStorage.removeItem(`academic_saved_plans_${targetUid}`);
    }
    localStorage.removeItem('sara_active_plan_guest');
    localStorage.removeItem('sara_active_plan_default');
    setActiveStudyPlan(null);
  }, [activeStudyPlan, isRtl, profile.uid]);

  useEffect(() => {
    fetchActiveStudyPlan();
  }, [fetchActiveStudyPlan]);

  // Featured Daily Scenario Quests (16 scenarios tailored with lesson explanations, exercises & tests)
  const todayScheduledLessons = useMemo<any[]>(() => {
    return ROLE_PLAY_SCENARIOS.slice(0, dailyLessonsTarget).map(sc => ({
      id: sc.id,
      pillarId: 'sara_scenarios',
      courseId: sc.category,
      courseLabelAr: sc.vibeAr,
      courseLabelEn: sc.vibeEn,
      titleAr: sc.titleAr,
      titleEn: sc.titleEn,
      level: '12Y',
      duration: '15 min',
      scenario: sc
    }));
  }, [dailyLessonsTarget]);

  // Priority: Match today's lesson from activeStudyPlan if available
  const todayScheduledPlanLesson = useMemo<any | null>(() => {
    if (!activeStudyPlan?.planItems || activeStudyPlan.planItems.length === 0) return null;
    const items = activeStudyPlan.planItems.filter((i: any) => !i.isCatchUpDay);
    if (items.length === 0) return null;
    const targetItem = items[currentDailyLessonIndex % items.length] || items[0];
    const allLessons = getAllCurriculumLessons();
    const matched = allLessons.find((l: any) =>
      l.id === targetItem.unitId ||
      (l.courseId === targetItem.courseId && l.level === targetItem.level) ||
      (l.titleAr && targetItem.topic && l.titleAr.includes(targetItem.topic))
    );
    return matched || {
      id: targetItem.unitId || `plan_item_${targetItem.id}`,
      pillarId: targetItem.courseId || 'grammar',
      courseId: targetItem.courseId || 'general',
      courseLabelAr: targetItem.courseLabel || 'خطة سارة الذكية',
      courseLabelEn: targetItem.courseLabel || 'Sara Smart Plan',
      titleAr: targetItem.topic || 'درس خطة سارة',
      titleEn: targetItem.topic || 'Sara Plan Lesson',
      level: targetItem.level || 'A1',
      duration: targetItem.duration || '20 min',
      planItem: targetItem
    };
  }, [activeStudyPlan, currentDailyLessonIndex]);

  const todayScheduledLesson = todayScheduledPlanLesson || todayScheduledLessons[currentDailyLessonIndex] || todayScheduledLessons[0] || null;

  // 📦 Migrate & Archive Completed Lesson Session (ترحيل الدرس الأول وحفظه بالأرشيف)
  const executeLessonArchival = async (
    lessonTitle: string,
    score: number,
    total: number,
    percentage: number,
    points: number
  ): Promise<boolean> => {
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

    const sessionData = buildSaraSessionArchiveDoc({
      date: formattedDate,
      dateYmd: todayYmd,
      archivedAt: now.toISOString(),
      lessonTitle: lessonTitle,
      lessonName: lessonTitle,
      snippet: `إنجاز وترحيل درس: ${lessonTitle} بنتيجة ${percentage}%`,
      messages,
      activeBoard: activeBoard || null,
      score,
      total,
      percentage,
      pointsEarned: points,
      status: 'migrated_completed'
    });

    const newLocalDoc = {
      id: `sess_migrated_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      ...sessionData,
      createdAt: now.toISOString()
    };

    // 1. Guaranteed Local Storage Archival First (حفظ فوري ومضمون بالأرشيف)
    try {
      const keysToSave = Array.from(new Set([
        `sara_archived_sessions_${profile.uid || 'guest'}`,
        targetUid ? `sara_archived_sessions_${targetUid}` : null,
        'sara_archived_sessions_global'
      ].filter(Boolean))) as string[];

      keysToSave.forEach(k => {
        try {
          const existing: any[] = JSON.parse(localStorage.getItem(k) || '[]');
          const filtered = existing.filter(s => s.id !== newLocalDoc.id);
          filtered.unshift(newLocalDoc);
          localStorage.setItem(k, JSON.stringify(filtered.slice(0, 100)));
        } catch (e) {
          console.warn(`LocalStorage archival error for ${k}:`, e);
        }
      });
    } catch (e) {
      console.warn('LocalStorage archival error:', e);
    }

    // 2. Immediately update in-memory archivedSessions state so archive viewer reflects it instantly
    setArchivedSessions(prev => [newLocalDoc, ...prev.filter(s => s.id !== newLocalDoc.id)]);

    // 3. Reset current live messages and board to present next lesson cleanly
    setMessages([]);
    setActiveBoard(null);
    localStorage.removeItem(SARA_STORAGE_KEY(profile.uid));

    // 4. Sync to Firestore (Best-Effort without blocking lesson progression)
    if (targetUid && !targetUid.startsWith('sim_')) {
      addDoc(collection(db, 'users', targetUid, 'saraSessions'), {
        ...sessionData,
        createdAt: serverTimestamp()
      }).catch(err => {
        console.debug('Firestore session archival sync note:', err);
      });

      setDoc(doc(db, 'users', targetUid, 'saraChat', 'current'), {
        messages: [],
        activeBoard: null,
        updatedAt: serverTimestamp()
      }).catch(err => {
        console.debug('Firestore clear current chat note:', err);
      });
    }

    return true;
  };

  // 🚀 Finish 2-minute break and launch the next lesson!
  const handleFinishBreakAndStartNextLesson = useCallback(() => {
    setIsDailyBreakActive(false);
    setIsBreakTimerRunning(false);
    playSchoolBellChime();

    const nextIdx = currentDailyLessonIndex + 1;
    let targetLesson = nextLessonAfterBreak;

    if (!targetLesson) {
      if (activeStudyPlan?.planItems && activeStudyPlan.planItems.length > 0) {
        const planItemsNonCatchup = activeStudyPlan.planItems.filter((i: any) => !i.isCatchUpDay);
        if (nextIdx < planItemsNonCatchup.length) {
          const targetItem = planItemsNonCatchup[nextIdx];
          const allLessons = getAllCurriculumLessons();
          const matched = allLessons.find((l: any) =>
            l.id === targetItem.unitId ||
            (l.courseId === targetItem.courseId && l.level === targetItem.level) ||
            (l.titleAr && targetItem.topic && l.titleAr.includes(targetItem.topic))
          );
          targetLesson = matched || {
            id: targetItem.unitId || `plan_item_${targetItem.id}`,
            pillarId: targetItem.courseId || 'grammar',
            courseId: targetItem.courseId || 'general',
            courseLabelAr: targetItem.courseLabel || 'خطة سارة الذكية',
            courseLabelEn: targetItem.courseLabel || 'Sara Smart Plan',
            titleAr: targetItem.topic || 'درس خطة سارة',
            titleEn: targetItem.topic || 'Sara Plan Lesson',
            level: targetItem.level || 'A1',
            duration: targetItem.duration || '20 min',
            planItem: targetItem
          };
        }
      } else {
        targetLesson = todayScheduledLessons[nextIdx];
      }
    }

    if (targetLesson) {
      setCurrentDailyLessonIndex(nextIdx);
      setNextLessonAfterBreak(null);
      handleSelectCurriculumLesson(targetLesson);
    }
  }, [currentDailyLessonIndex, nextLessonAfterBreak, todayScheduledLessons, activeStudyPlan]);

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

  // Start scenario or lesson with Sara
  const handleStartPlanLesson = (planItemOrUnitId: any) => {
    if (!planItemOrUnitId) {
      if (todayScheduledPlanLesson) {
        handleSelectCurriculumLesson(todayScheduledPlanLesson);
        return;
      }
      if (todayScheduledLessons[0]) {
        handleSelectCurriculumLesson(todayScheduledLessons[0]);
        return;
      }
      return;
    }

    const unitId = typeof planItemOrUnitId === 'string' 
      ? planItemOrUnitId 
      : (planItemOrUnitId.unitId || planItemOrUnitId.id);
    const courseId = typeof planItemOrUnitId === 'object' 
      ? (planItemOrUnitId.courseId || planItemOrUnitId.pillarId) 
      : null;
    const topic = typeof planItemOrUnitId === 'object'
      ? (planItemOrUnitId.topic || planItemOrUnitId.titleAr || planItemOrUnitId.titleEn)
      : null;
    const level = typeof planItemOrUnitId === 'object' ? planItemOrUnitId.level : undefined;

    // 1. Try finding in all unified curriculum lessons
    const allLessons = getAllCurriculumLessons();
    const matchedCurriculum = allLessons.find((l: any) =>
      (unitId && l.id === unitId) ||
      (courseId && level && l.courseId === courseId && l.level === level) ||
      (topic && l.titleAr && l.titleAr.includes(topic)) ||
      (topic && l.titleEn && l.titleEn.includes(topic))
    );

    if (matchedCurriculum) {
      handleSelectCurriculumLesson(matchedCurriculum);
      return;
    }

    // 2. If it's already a well-formed lesson object
    if (typeof planItemOrUnitId === 'object' && (planItemOrUnitId.titleAr || planItemOrUnitId.topic || planItemOrUnitId.pillarId || planItemOrUnitId.courseId)) {
      handleSelectCurriculumLesson({
        id: unitId || `plan_item_${Date.now()}`,
        pillarId: courseId || 'grammar',
        courseId: courseId || 'general',
        courseLabelAr: planItemOrUnitId.courseLabel || planItemOrUnitId.courseLabelAr || 'خطة سارة الذكية',
        courseLabelEn: planItemOrUnitId.courseLabel || planItemOrUnitId.courseLabelEn || 'Sara Smart Plan',
        titleAr: topic || planItemOrUnitId.titleAr || 'درس خطة سارة',
        titleEn: topic || planItemOrUnitId.titleEn || 'Sara Plan Lesson',
        level: level || 'A1',
        duration: planItemOrUnitId.duration || '20 min',
        planItem: planItemOrUnitId.planItem || planItemOrUnitId
      });
      return;
    }

    // 3. Otherwise check if matched with roleplay scenarios
    const matchedScenario = ROLE_PLAY_SCENARIOS.find(s => s.id === unitId) || 
      ROLE_PLAY_SCENARIOS.find(s => topic && (s.titleAr.includes(topic) || s.titleEn.includes(topic)));

    if (matchedScenario) {
      handleStartRolePlayScenario(matchedScenario);
      return;
    }

    if (todayScheduledPlanLesson) {
      handleSelectCurriculumLesson(todayScheduledPlanLesson);
      return;
    }

    handleStartRolePlayScenario(ROLE_PLAY_SCENARIOS[0]);
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

  // 🔐 Chat auth: wait for Firebase to restore the session before reading the token (tablet/local sessions race on mount).
  const getChatIdToken = async (): Promise<string> => {
    try { await (auth as any).authStateReady?.(); } catch { /* ignore */ }
    try { return auth.currentUser ? await auth.currentUser.getIdToken() : ''; } catch { return ''; }
  };
  const isWelcomeMsgId = (id?: string) => !!id && (id.startsWith('msg_sara_init') || id.startsWith('msg_sara_fallback') || id.startsWith('msg_welcome_'));
  const sortByTime = (list: MessageItem[]) => [...list].sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
  const buildAuthNotice = (retryText?: string, retryOfId?: string): MessageItem => ({
    id: `msg_sara_auth_${Date.now()}`,
    role: 'sara',
    text: isRtl
      ? 'عشان أقدر أرد عليك سجّل دخولك أولاً 🔐 اضغط الزر تحت وبعدها نكمل سوا.'
      : 'Please sign in first so I can reply to you 🔐 Tap the button below and we will continue.',
    notice: 'auth',
    retryText,
    retryOfId,
    timestamp: Date.now()
  });
  const buildRetryNotice = (kind: 'rate' | 'offline' | 'error', retryText: string, retryOfId?: string): MessageItem => ({
    id: `msg_sara_err_${Date.now()}`,
    role: 'sara',
    text: isRtl
      ? (kind === 'rate'
          ? 'ارسلت رسائل كثيرة بسرعة 😅 انتظر دقيقة وبعدها اضغط «أعد المحاولة».'
          : kind === 'offline'
            ? '📶 يبدو أن الإنترنت منقطع. تأكد من الاتصال واضغط «أعد المحاولة».'
            : 'صار خلل بسيط وما وصلني ردك 🙏 اضغط «أعد المحاولة».')
      : (kind === 'rate'
          ? 'Too many messages at once 😅 wait a minute, then tap Retry.'
          : kind === 'offline'
            ? '📶 You seem to be offline. Check your connection and tap Retry.'
            : 'Something went wrong and I could not reply 🙏 Tap Retry.'),
    notice: 'retry',
    retryText,
    retryOfId,
    timestamp: Date.now()
  });
  const [isChatSigningIn, setIsChatSigningIn] = useState(false);

  const handleRetryNotice = (notice: MessageItem) => {
    if (!notice.retryText) return;
    setMessages(prev => prev.filter(m => m.id !== notice.id && m.id !== notice.retryOfId));
    const t = notice.retryText;
    setTimeout(() => { if (isMountedRef.current) handleSendMessage(t); }, 0);
  };

  const handleChatSignIn = async (notice: MessageItem) => {
    if (isChatSigningIn) return;
    setIsChatSigningIn(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (!result?.user || !isMountedRef.current) return;
      const onlyNotices = messages.every(m => m.notice === 'auth' || isWelcomeMsgId(m.id));
      if (notice.retryText) {
        handleRetryNotice(notice);
      } else if (onlyNotices) {
        setMessages(prev => prev.filter(m => m.notice !== 'auth'));
        initWelcome();
      } else {
        setMessages(prev => prev.filter(m => m.id !== notice.id));
      }
    } catch (error: any) {
      console.error('Sara chat sign-in error:', error?.code, error?.message);
      if (error?.code === 'auth/popup-blocked') {
        try { await signInWithRedirect(auth, googleProvider); return; } catch (e) { console.error('signInWithRedirect fallback error:', e); }
      }
    } finally {
      if (isMountedRef.current) setIsChatSigningIn(false);
    }
  };

  const fallbackWelcome = (startedAt: number = Date.now()) => {
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
      timestamp: startedAt
    };
    setMessages(prev => sortByTime([welcomeMsg, ...prev.filter(m => !isWelcomeMsgId(m.id) && m.notice !== 'auth')]));
    setActiveBoard(welcomeMsg.board || null);
    if (voiceEnabled && isMountedRef.current && !welcomeVoiceBlockedRef.current) {
      playSaraVoice(text);
    }
  };

  const initWelcome = async () => {
    if (!isMountedRef.current) return;
    const startedAt = Date.now();
    setLoading(true);
    isThinkingRef.current = true;
    try {
      const idToken = await getChatIdToken();
      if (!isMountedRef.current) return;
      if (!idToken) {
        // No Firebase session (e.g. cached local session on a tablet): say so instead of staying silent.
        setMessages(prev => sortByTime([{ ...buildAuthNotice(), timestamp: startedAt }, ...prev.filter(m => !isWelcomeMsgId(m.id) && m.notice !== 'auth')]));
        return;
      }
      const snapshot = {
        name: profile.displayName,
        level: (profile as any).level || tutorMemory.level || 'A1',
        age: tutorMemory.age,
        interests: tutorMemory.interests || [],
        goal: tutorMemory.goal || 'General Fluency & School Success',
        learningStyle: tutorMemory.learningStyle || 'visual_interactive',
        learningPacing: tutorMemory.learningPacing || 'balanced',
        strengths: tutorMemory.strengths || [],
        masteredTopics: tutorMemory.masteredTopics || [],
        lastMemoryNotes: tutorMemory.notes?.slice(-5) || [],
        frequentMistakes: tutorMemory.frequentMistakes || [],
        wordsLearned: tutorMemory.wordsLearned || [],
        lastSessionTopic: tutorMemory.lastSessionTopic || '',
        lastSessionSummary: tutorMemory.lastSessionSummary || '',
        crossSessionHook: tutorMemory.crossSessionHook || ''
      };

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
          timestamp: startedAt
        };
        setMessages(prev => sortByTime([welcomeMsg, ...prev.filter(m => !isWelcomeMsgId(m.id) && m.notice !== 'auth')]));
        if (data.board) {
          setActiveBoard(data.board);
          if (data.board.openWhiteboard) {
            setIsWhiteboardOpen(true);
          }
        }
        if (voiceEnabled && isMountedRef.current && !welcomeVoiceBlockedRef.current) {
          playSaraVoice(conciseGreeting);
        }
        if (data.memory) {
          syncMemoryToFirestore(data.memory, data.sessionDone, data.board?.title || 'Daily Session');
        }
      } else if (res.status === 401) {
        setMessages(prev => sortByTime([{ ...buildAuthNotice(), timestamp: startedAt }, ...prev.filter(m => !isWelcomeMsgId(m.id) && m.notice !== 'auth')]));
      } else {
        fallbackWelcome(startedAt);
      }
    } catch (e) {
      console.warn('Welcome call error:', e);
      if (isMountedRef.current) {
        fallbackWelcome(startedAt);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
        isThinkingRef.current = false;
      }
    }
  };

  /** Save a previous live chat into the archive (same stores as the manual archive) without touching the live view. */
  const archivePriorChatSilently = (prior: MessageItem[], board: SaraBoardData | null) => {
    const clean = (prior || []).filter(m => m && typeof m.text === 'string' && !m.notice);
    if (!clean.some(m => m.role === 'user' && m.text.trim())) return; // greetings only: nothing worth archiving
    const now = new Date();
    const firstUser = clean.find(m => m.role === 'user' && m.text.trim());
    const snippet = (firstUser?.text || '').replace(/[*#_`]/g, '').trim().slice(0, 140);
    const sessionData = buildSaraSessionArchiveDoc({
      date: now.toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      dateYmd: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`,
      archivedAt: now.toISOString(),
      lessonTitle: null,
      lessonName: null,
      snippet,
      messages: sortByTime(clean),
      activeBoard: board,
      status: 'auto_archived_on_open'
    });
    const targetUid = auth.currentUser?.uid || profile.uid;
    const newLocalDoc = { id: `sess_auto_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`, ...sessionData, createdAt: now.toISOString() };
    const keysToSave = Array.from(new Set([
      `sara_archived_sessions_${profile.uid || 'guest'}`,
      targetUid ? `sara_archived_sessions_${targetUid}` : null,
      'sara_archived_sessions_global'
    ].filter(Boolean))) as string[];
    keysToSave.forEach(k => {
      try {
        const existing: any[] = JSON.parse(localStorage.getItem(k) || '[]');
        existing.unshift(newLocalDoc);
        localStorage.setItem(k, JSON.stringify(existing.slice(0, 100)));
      } catch (e) {
        console.warn(`LocalStorage auto-archive error for ${k}:`, e);
      }
    });
    setArchivedSessions(prev => [newLocalDoc, ...prev.filter(x => x.id !== newLocalDoc.id)]);
    if (targetUid && !targetUid.startsWith('sim_') && auth.currentUser) {
      addDoc(collection(db, 'users', targetUid, 'saraSessions'), { ...sessionData, createdAt: serverTimestamp() })
        .catch(err => console.debug('Firestore auto-archive note:', err));
    }
  };

  // Open chat: archive any previous live chat silently, then start fresh with one greeting
  useEffect(() => {
    isMountedRef.current = true;

    const restoreConversation = async () => {
      // Every opening starts clean: one fresh greeting. Any previous live chat is archived
      // silently (local + cloud) so nothing the student wrote is lost, but it is not piled into the live view.
      const key = SARA_STORAGE_KEY(profile.uid);
      const priors: { messages: MessageItem[]; activeBoard?: SaraBoardData | null }[] = [];
      let restoredPlacement: any = null;
      try {
        const localRaw = localStorage.getItem(key);
        if (localRaw) {
          const parsed = JSON.parse(localRaw);
          if (parsed && Array.isArray(parsed.messages) && parsed.messages.length > 0) {
            priors.push({ messages: parsed.messages, activeBoard: parsed.activeBoard || null });
            if (parsed.placementState) restoredPlacement = parsed.placementState;
          }
        }
      } catch (err) {
        console.warn('Error reading chat from localStorage:', err);
      }
      try { await (auth as any).authStateReady?.(); } catch { /* ignore */ }
      if (profile.uid) {
        try {
          const chatDoc = await getDoc(doc(db, 'users', profile.uid, 'saraChat', 'current'));
          const data = chatDoc.exists() ? chatDoc.data() : null;
          if (data && Array.isArray(data.messages) && data.messages.length > 0) {
            const lastCloud = data.messages[data.messages.length - 1];
            const dup = priors.some(pr => {
              const last = pr.messages[pr.messages.length - 1];
              return last && lastCloud && last.id === lastCloud.id && pr.messages.length === data.messages.length;
            });
            if (!dup) priors.push({ messages: data.messages, activeBoard: data.activeBoard || null });
            if (!restoredPlacement && data.placementState) restoredPlacement = data.placementState;
          }
        } catch (dbErr) {
          console.warn('Error loading chat from Firestore:', dbErr);
        }
      }
      if (!isMountedRef.current) return;
      if (restoredPlacement) setPlacementState({ ...restoredPlacement, isActive: false });
      priors.forEach(pr => archivePriorChatSilently(pr.messages, pr.activeBoard || null));
      try { localStorage.removeItem(key); } catch { /* ignore */ }

      if (!hasInitializedWelcomeRef.current) {
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

    const userOrLessonMessages = messages.filter(m => m.role === 'user' || (m.role === 'sara' && !m.id?.startsWith('msg_welcome_')));
    if (userOrLessonMessages.length === 0 && messages.length <= 1) {
      setShowSavedToast(true);
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
      activeRolePlay?.titleAr || 
      activeRolePlay?.titleEn || 
      (activeRolePlay as any)?.title || 
      lastSavedLessonResult?.lessonTitle || 
      (placementState?.stage && placementState.stage !== 'idle' ? (isRtl ? 'اختبار تحديد المستوى' : 'Placement Test') : null);

    // Extract brief snippet (نص مختصر)
    const userMsg = messages.find(m => m.role === 'user' && m.text?.trim());
    const firstSaraMsg = messages.find(m => m.role === 'sara' && m.text?.trim());
    const rawText = userMsg?.text || firstSaraMsg?.text || tutorMemory.lastSessionSummary || (isRtl ? 'جلسة تدريب مع سارة' : 'Sara Tutoring Session');
    const snippet = rawText.replace(/[*#_`]/g, '').trim().slice(0, 140);

    const sessionData = buildSaraSessionArchiveDoc({
      date: formattedDate,
      dateYmd: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`,
      archivedAt: now.toISOString(),
      lessonTitle: detectedLessonTitle || null,
      lessonName: detectedLessonTitle || null,
      snippet: snippet,
      messages,
      activeBoard: activeBoard || null
    });

    const targetUid = auth.currentUser?.uid || profile.uid;
    const newLocalDoc = {
      id: `sess_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      ...sessionData,
      createdAt: now.toISOString()
    };

    // 1. Guaranteed Local Storage Archival First across canonical keys (حفظ فوري ومضمون بالأرشيف)
    try {
      const keysToSave = Array.from(new Set([
        `sara_archived_sessions_${profile.uid || 'guest'}`,
        targetUid ? `sara_archived_sessions_${targetUid}` : null,
        'sara_archived_sessions_global'
      ].filter(Boolean))) as string[];

      keysToSave.forEach(k => {
        try {
          const existing: any[] = JSON.parse(localStorage.getItem(k) || '[]');
          const filtered = existing.filter(s => s.id !== newLocalDoc.id);
          filtered.unshift(newLocalDoc);
          localStorage.setItem(k, JSON.stringify(filtered.slice(0, 100)));
        } catch (e) {
          console.warn(`LocalStorage archive error for ${k}:`, e);
        }
      });
    } catch (e) {
      console.warn('LocalStorage archive error:', e);
    }

    // 2. Immediately update in-memory archivedSessions state
    setArchivedSessions(prev => [newLocalDoc, ...prev.filter(s => s.id !== newLocalDoc.id)]);

    // 3. Clear live chat & local storage (امسح الدردشة الحية وابدأ محادثة جديدة)
    setMessages([]);
    setActiveBoard(null);
    setIsRestoredSession(false);
    localStorage.removeItem(SARA_STORAGE_KEY(profile.uid));

    // 4. Sync to Firestore (Best-effort cloud backup)
    if (targetUid && !targetUid.startsWith('sim_')) {
      addDoc(collection(db, 'users', targetUid, 'saraSessions'), {
        ...sessionData,
        createdAt: serverTimestamp()
      }).catch(err => {
        console.debug('Firestore session archival note:', err);
      });

      setDoc(doc(db, 'users', targetUid, 'saraChat', 'current'), {
        messages: [],
        activeBoard: null,
        updatedAt: serverTimestamp()
      }).catch(err => {
        console.debug('Firestore clear current chat note:', err);
      });
    }

    // 5. Start short greeting ("وابدأ تحية قصيرة")
    const shortGreeting = isRtl
      ? `مرحباً يا بطل! 🌟 تم أرشفة جلستك السابقة بنجاح وحفظها في الأرشيف 🗂️. أنا معلمتك سارة، جاهزة لجلسة تدريب جديدة معك!`
      : `Welcome back, champ! 🌟 Your previous session was archived safely 🗂️. I'm Sara, ready for a fresh lesson!`;

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

  const fetchArchivedSessions = useCallback(async () => {
    setIsLoadingArchive(true);
    try {
      const list: any[] = [];
      const targetUid = auth.currentUser?.uid || profile.uid;

      if (targetUid && !targetUid.startsWith('sim_')) {
        try {
          let snap;
          try {
            const q = query(
              collection(db, 'users', targetUid, 'saraSessions'),
              orderBy('createdAt', 'desc'),
              limit(100)
            );
            snap = await getDocs(q);
          } catch {
            // Fallback query without orderBy if index is building
            snap = await getDocs(collection(db, 'users', targetUid, 'saraSessions'));
          }

          if (snap) {
            snap.forEach(docSnap => {
              list.push({ id: docSnap.id, ...docSnap.data() });
            });
            list.sort((a, b) => new Date(b.archivedAt || 0).getTime() - new Date(a.archivedAt || 0).getTime());
          }
        } catch (firestoreErr) {
          console.debug('Firestore saraSessions fetch note (using local cache):', firestoreErr);
        }
      }

      // Merge with localStorage backup across all possible profile keys
      try {
        const keysToTry = Array.from(new Set([
          `sara_archived_sessions_${profile.uid || 'guest'}`,
          targetUid ? `sara_archived_sessions_${targetUid}` : null,
          'sara_archived_sessions_guest',
          'sara_archived_sessions_global'
        ].filter(Boolean))) as string[];

        keysToTry.forEach(storageKey => {
          try {
            const localList: any[] = JSON.parse(localStorage.getItem(storageKey) || '[]');
            localList.forEach(localItem => {
              if (!list.some(item => item.id === localItem.id || (item.archivedAt && item.archivedAt === localItem.archivedAt))) {
                list.push(localItem);
              }
            });
          } catch (e) {
            console.warn('LocalStorage merge note:', e);
          }
        });
        list.sort((a, b) => new Date(b.archivedAt || 0).getTime() - new Date(a.archivedAt || 0).getTime());
      } catch (e) {
        console.warn('LocalStorage merge note:', e);
      }

      setArchivedSessions(list);
    } catch (err) {
      console.warn('Error fetching archived sessions:', err);
    } finally {
      setIsLoadingArchive(false);
    }
  }, [profile.uid]);

  useEffect(() => {
    fetchArchivedSessions();
  }, [fetchArchivedSessions]);

  useEffect(() => {
    if (initialLesson) {
      handleSelectCurriculumLesson(initialLesson);
    }
  }, [initialLesson]);

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

  // Start Role-Play Scenario with Real Explanation, Vocab, Grammar and Board Data
  const handleStartRolePlayScenario = (scenario: RolePlayScenario) => {
    setActiveRolePlay(scenario);
    setCompletedMissions([]);
    setIsRolePlayModalOpen(false);

    // Fetch deep pedagogical curriculum data for this scenario
    const edu = getScenarioEducationalContent(scenario.id);

    const introText = isRtl
      ? `🎭 تم تفعيل سيناريو: [${scenario.titleAr}]. سارة بدور (${scenario.roleSaraAr}) وأنت بدور (${scenario.roleStudentAr}).\n\n🎯 الهدف التعليمي: ${edu.conceptTitleAr} - ${edu.conceptAr}\n\n"${scenario.openingLine}"`
      : `🎭 Active Scenario: [${scenario.titleEn}]. Sara as (${scenario.roleSaraEn}) and You as (${scenario.roleStudentEn}).\n\n🎯 Learning Goal: ${edu.conceptTitleEn} - ${edu.conceptEn}\n\n"${scenario.openingLine}"`;

    // Build rich chalkboard data for the scenario
    const scenarioBoard: SaraBoardData = {
      title: `${scenario.badge} ${isRtl ? scenario.titleAr : scenario.titleEn}`,
      sentence: scenario.openingLine,
      highlight: scenario.openingLine.slice(0, 24),
      formula: edu.grammar.formula || undefined,
      notes: [
        isRtl ? `المكان: ${scenario.location}` : `Location: ${scenario.location}`,
        isRtl ? `القاعدة: ${edu.grammar.titleAr} (${edu.grammar.explanationAr})` : `Rule: ${edu.grammar.titleEn}`,
        isRtl ? `المهمة 1: ${scenario.missionsAr[0]}` : `Mission 1: ${scenario.missionsEn[0]}`,
        isRtl ? `كلمة مفتاحية: ${edu.vocabulary[0]?.word} = ${edu.vocabulary[0]?.meaningAr}` : `Key Vocab: ${edu.vocabulary[0]?.word} (${edu.vocabulary[0]?.meaningEn})`
      ],
      learningTip: isRtl ? edu.grammar.explanationAr : edu.grammar.explanationEn,
      vocabularyBank: edu.vocabulary.map(v => ({
        word: v.word,
        meaning: isRtl ? v.meaningAr : v.meaningEn,
        pos: 'noun/verb',
        example: v.exampleEn
      })),
      quiz: edu.quiz[0] ? {
        question: isRtl ? edu.quiz[0].questionAr : edu.quiz[0].questionEn,
        options: edu.quiz[0].options,
        answerIndex: edu.quiz[0].correctIndex,
        explanation: edu.quiz[0].explanationAr
      } : undefined,
      openWhiteboard: false
    };

    const introMsg: MessageItem = {
      id: `msg_rp_init_${Date.now()}`,
      role: 'sara',
      text: introText,
      board: scenarioBoard,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, introMsg]);
    setActiveBoard(scenarioBoard);

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

  // ==========================================
  // 🎓 Complete & Save Lesson Engine (تسجيل النتيجة وحفظها بعد خوض الاختبار الحقيقي)
  // ==========================================
  const handleCompleteAndSaveLesson = async (customScore?: number, customTotal?: number) => {
    if (isSavingLessonResult) return;

    // 🛡️ لا يُسمح برصد علامات عشوائية أو إنهاء الدرس دون خوض اختبار الإتقان الحقيقي!
    if (customScore === undefined || customTotal === undefined) {
      setIsWhiteboardOpen(true);
      setCurrentWhiteboardPageIndex(5); // الصفحة 6 هي صفحة اختبار الإتقان
      
      const testPrompt = isRtl
        ? 'عفواً يا بطل! لا يمكن إنهاء الدرس أو رصد الدرجة دون خوض اختبار الإتقان لقياس فهمك الحقيقي 🎯. لقد فتحت لك صفحة الاختبار على السبورة الذكية، أجب عن الأسئلة الآن لتحصل على درجتك الموثقة!'
        : 'Wait champion! You cannot complete the lesson without taking the mastery quiz to measure your actual understanding 🎯. I opened the quiz page on the whiteboard—answer the questions now to earn your verified score!';
      
      if (voiceEnabled) {
        playSaraVoice(testPrompt);
      }
      return;
    }

    // 🎯 Mastery gate: lessons with a masteryCheck are only completed/unlocked at or above the pass mark.
    const masteryPass = Number(activeCurriculumLesson?.masteryCheck?.passScore) || 0;
    if (masteryPass > 0 && customTotal > 0 && (customScore / customTotal) * 100 < masteryPass) {
      const pct = Math.round((customScore / customTotal) * 100);
      const msg = isRtl
        ? `نتيجتك ${pct}٪ وتحتاج ${masteryPass}٪ لإتقان الدرس وفتح الدرس التالي. راجع السبورة وأعد اختبار الإتقان 💪`
        : `You scored ${pct}% and need ${masteryPass}% to master this lesson and unlock the next one. Review the board and retry 💪`;
      if (voiceEnabled) playSaraVoice(msg);
      return;
    }

    setIsSavingLessonResult(true);

    try {
      // 1. Determine lesson metadata
      const lessonTitle = activeCurriculumLesson
        ? (isRtl ? (activeCurriculumLesson.titleAr || activeCurriculumLesson.titleEn) : (activeCurriculumLesson.titleEn || activeCurriculumLesson.titleAr))
        : activeRolePlay
        ? (isRtl ? activeRolePlay.titleAr : activeRolePlay.titleEn)
        : (activeBoard?.title || (isRtl ? 'حصة محادثة وتطبيق مع سارة' : 'Interactive Lesson with Sara'));

      const level = activeCurriculumLesson?.level || (profile as any).level || 'A1';
      const courseId = activeCurriculumLesson?.courseId || activeCurriculumLesson?.pillarId || (activeRolePlay ? activeRolePlay.category : 'sara_tutor');
      const courseLabel = activeCurriculumLesson
        ? (isRtl ? (activeCurriculumLesson.courseLabelAr || activeCurriculumLesson.courseLabelEn) : (activeCurriculumLesson.courseLabelEn || activeCurriculumLesson.courseLabelAr))
        : activeRolePlay
        ? (isRtl ? activeRolePlay.vibeAr : activeRolePlay.vibeEn)
        : (isRtl ? 'سيناريوهات سارة التفاعلية' : 'Sara Interactive Scenarios');
      const lessonId = activeCurriculumLesson?.id || activeRolePlay?.id || `sara_lesson_${Date.now()}`;

      // 2. Score calculation - Strictly from the verified test taken by the student!
      const totalQuestions = Math.max(1, customTotal);
      const boundedScore = Math.min(Math.max(0, customScore), totalQuestions);
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
      let nextLesson: any = null;
      let hasNextLessonToday = false;

      if (activeStudyPlan?.planItems && activeStudyPlan.planItems.length > 0) {
        const planItemsNonCatchup = activeStudyPlan.planItems.filter((i: any) => !i.isCatchUpDay);
        if (nextLessonIndex < planItemsNonCatchup.length) {
          const targetItem = planItemsNonCatchup[nextLessonIndex];
          const allLessons = getAllCurriculumLessons();
          const matched = allLessons.find((l: any) =>
            l.id === targetItem.unitId ||
            (l.courseId === targetItem.courseId && l.level === targetItem.level) ||
            (l.titleAr && targetItem.topic && l.titleAr.includes(targetItem.topic))
          );
          nextLesson = matched || {
            id: targetItem.unitId || `plan_item_${targetItem.id}`,
            pillarId: targetItem.courseId || 'grammar',
            courseId: targetItem.courseId || 'general',
            courseLabelAr: targetItem.courseLabel || 'خطة سارة الذكية',
            courseLabelEn: targetItem.courseLabel || 'Sara Smart Plan',
            titleAr: targetItem.topic || 'درس خطة سارة',
            titleEn: targetItem.topic || 'Sara Plan Lesson',
            level: targetItem.level || 'A1',
            duration: targetItem.duration || '20 min',
            planItem: targetItem
          };
          hasNextLessonToday = true;
        }
      } else {
        nextLesson = todayScheduledLessons[nextLessonIndex];
        hasNextLessonToday = nextLessonIndex < todayScheduledLessons.length && !!nextLesson;
      }

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

      // 4. Append completion card to chat stream (snapshot'd into archival; cleared only after addDoc success)
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

      // 5. Archive FIRST — chat/board/saraChat/current cleared only inside executeLessonArchival after addDoc success
      const archiveOk = await executeLessonArchival(lessonTitle, boundedScore, totalQuestions, percentage, pointsEarned);
      if (!archiveOk) {
        // Failure toast already shown; do NOT write lessonResults/XP/streak; break does not start
        return;
      }

      // 6. Start break / all-done FIRST so XP write failures cannot skip the next lesson
      const now = new Date();
      const todayYmd = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      const rewardKey = `${lessonId}_${todayYmd}`;

      // Mark lesson in today's completed tracker
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

      // 7. Persist results / XP / streak best-effort (only after archival succeeded; ref blocks double XP)
      try {
        if (!lessonRewardsGrantedRef.current.has(rewardKey)) {
          lessonRewardsGrantedRef.current.add(rewardKey);

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

          // LocalStorage backup of completed lessons
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
        }
      } catch (rewardErr) {
        console.warn('Best-effort lessonResults/XP/streak failed after archive:', rewardErr);
      }

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

    // 🔔 لا رصد لدرجات عشوائية عند انتهاء الوقت، بل الانتقال لاختبار الإتقان الحقيقي على السبورة!
    setIsWhiteboardOpen(true);
    setCurrentWhiteboardPageIndex(5);
    const timeUpMsg = isRtl
      ? 'انتهى وقت الحصة المقررة يا بطل! 🔔 والآن حان وقت اختبار الإتقان النهائي على السبورة لقياس فهمك الحقيقي وتحقيق درجتك الموثقة 🎯!'
      : 'Session time is up champion! 🔔 Now it is time for the final mastery quiz on the whiteboard to measure your true understanding and record your score 🎯!';
    if (voiceEnabled) {
      playSaraVoice(timeUpMsg);
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
      const updatedStrengths = Array.from(new Set([...(tutorMemory.strengths || []), ...(newMemory.newStrengths || [])])).slice(-25);
      const updatedMastered = Array.from(new Set([...(tutorMemory.masteredTopics || []), ...(newMemory.masteredTopics || [])])).slice(-25);

      const memUpdate: any = {
        notes: updatedNotes,
        frequentMistakes: updatedMistakes,
        wordsLearned: updatedWords,
        strengths: updatedStrengths,
        masteredTopics: updatedMastered,
        lastSessionAt: serverTimestamp(),
        lastSessionSummary: newMemory.newNotes?.[0] || tutorMemory.lastSessionSummary || 'Daily tutoring session'
      };

      if (newMemory.detectedLearningStyle && !tutorMemory.learningStyle) {
        memUpdate.learningStyle = newMemory.detectedLearningStyle;
      }
      if (newMemory.sessionTopic) {
        memUpdate.lastSessionTopic = newMemory.sessionTopic;
      }
      if (newMemory.crossSessionHook) {
        memUpdate.crossSessionHook = newMemory.crossSessionHook;
      }

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
          skill: currentSkill || activeBoard?.title || memUpdate.lastSessionTopic || 'Daily English Practice',
          quizScore: quizScoreCount
        };
        await setDoc(doc(db, 'tutorMemory', profile.uid, 'sessions', sessionId), sessionDoc);
      }
    } catch (err) {
      console.warn('Failed to sync tutor memory to Firestore:', err);
    }
  };

  // Update student learning style & pacing preferences
  const handleUpdateLearningStyle = async (style: LearningStyleType, pacing: LearningPacingType) => {
    if (!profile.uid) return;
    try {
      const updateData = {
        learningStyle: style,
        learningPacing: pacing
      };
      await setDoc(doc(db, 'tutorMemory', profile.uid), updateData, { merge: true });
      setTutorMemory(prev => ({
        ...prev,
        ...updateData
      }));
    } catch (err) {
      console.error('Failed to update student learning style:', err);
    }
  };

  // Clear or reset student memory for fresh start
  const handleClearMemory = async () => {
    if (!profile.uid) return;
    try {
      const resetData = {
        notes: [],
        frequentMistakes: [],
        wordsLearned: [],
        strengths: [],
        masteredTopics: [],
        lastSessionSummary: '',
        lastSessionTopic: '',
        crossSessionHook: ''
      };
      await setDoc(doc(db, 'tutorMemory', profile.uid), resetData, { merge: true });
      setTutorMemory(prev => ({
        ...prev,
        ...resetData
      }));
    } catch (err) {
      console.error('Failed to clear student tutor memory:', err);
    }
  };

  // ==========================================
  // 🎯 Placement Test Engine (المحادثة + 5 أسئلة + سبلنغ + ربط المناهج)
  // ==========================================

  // The old in-chat AI placement flow was removed; placement lives in Sara Tools (single official test).
  const startPlacementTest = () => {
    setSaraTool('placement');
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

    // 0A. Detect "Archive Session / Save Session" intent from voice or chat (أرشف الجلسة)
    const isArchiveSessionIntent = 
      lower.includes('أرشف') ||
      lower.includes('ارشف') ||
      lower.includes('أرشف الجلسة') ||
      lower.includes('ارشف الجلسة') ||
      lower.includes('أرشف الجلسه') ||
      lower.includes('ارشف الجلسه') ||
      lower.includes('احفظ الجلسة') ||
      lower.includes('احفظ الجلسه') ||
      lower.includes('حفظ الجلسة') ||
      lower.includes('حفظ الجلسه') ||
      lower.includes('أرشف المحادثة') ||
      lower.includes('ارشف المحادثة') ||
      lower.includes('احفظ المحادثة') ||
      lower.includes('أرشف محادثتنا') ||
      lower.includes('ارشف محادثتنا') ||
      lower.includes('أرشف هالجلسة') ||
      lower.includes('ارشف هالجلسة') ||
      lower.includes('أرشف جلستي') ||
      lower.includes('archive session') ||
      lower.includes('archive chat') ||
      lower === 'archive';

    if (isArchiveSessionIntent) {
      const userMsg: MessageItem = {
        id: `msg_user_${Date.now()}`,
        role: 'user',
        text: text,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, userMsg]);
      setInputText('');
      handleConfirmArchiveSession();
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

      setIsWhiteboardOpen(true);
      setCurrentWhiteboardPageIndex(5);
      const testMsg: MessageItem = {
        id: `msg_sara_quiz_prompt_${Date.now()}`,
        role: 'sara',
        text: isRtl
          ? 'بطلنا الرائع! قبل إنهاء الدرس ورصد النتيجة، يجب خوض اختبار الإتقان على السبورة الذكية لقياس فهمك الحقيقي 🎯. لقد فتحت لك صفحة الاختبار، أجب عن الأسئلة الآن!'
          : 'Great effort! Before finishing the lesson and recording your grade, please complete the mastery quiz on the whiteboard to measure your true verified score 🎯!',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, testMsg]);
      if (voiceEnabled) {
        playSaraVoice(testMsg.text);
      }
      return;
    }

    // 0B-1. Detect "Generate Smart Study Plan" intent from voice or chat
    const isPlanGenerationIntent = 
      lower.includes('توليد خطة') ||
      lower.includes('توليد خطه') ||
      lower.includes('توليد خطة ذكية') ||
      lower.includes('توليد خطه ذكيه') ||
      lower.includes('ابي خطة') ||
      lower.includes('أبي خطة') ||
      lower.includes('ابي خطه') ||
      lower.includes('أبي خطه') ||
      lower.includes('سوي لي خطة') ||
      lower.includes('سوي لي خطه') ||
      lower.includes('سويلي خطة') ||
      lower.includes('سويلي خطه') ||
      lower.includes('ولدي لي خطة') ||
      lower.includes('ولدي خطة') ||
      lower.includes('اعملي لي خطة') ||
      lower.includes('اعمل لي خطة') ||
      lower.includes('خطة ذكية') ||
      lower.includes('خطه ذكيه') ||
      lower.includes('جدول ذكي') ||
      lower.includes('generate plan') ||
      lower.includes('create plan') ||
      lower.includes('make a plan');

    if (isPlanGenerationIntent) {
      const userMsg: MessageItem = {
        id: `msg_user_${Date.now()}`,
        role: 'user',
        text: text,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, userMsg]);
      setInputText('');
      setIsSmartPlanGeneratorOpen(true);
      const planGreeting = isRtl
        ? `أهلاً بك يا بطل! 🌟 فتحت لك أداة توليد الخطة الذكية المخصصة فوراً ⚡. اختر مسارك المفضل والمدة المناسبة وسأصنع لك جدولاً أكاديمياً متكاملاً ندرسه معاً خطوة بخطوة على السبورة الذكية!`
        : `Welcome champion! 🌟 I opened the Smart Study Plan Generator for you ⚡. Choose your target track and schedule to begin learning step-by-step with me!`;
      const saraMsg: MessageItem = {
        id: `msg_sara_plan_gen_${Date.now()}`,
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

    // 0B-2. Detect "View Study Plan / Academic Schedule" intent from voice or chat
    const isStudyPlanIntent = 
      lower.includes('الخطة الدراسية') ||
      lower.includes('الخطه الدراسيه') ||
      lower.includes('خطتي الدراسية') ||
      lower.includes('خطتي الدراسيه') ||
      lower.includes('جدولي الدراسي') ||
      lower.includes('الجدول الدراسي') ||
      lower.includes('افتحي الخطة') ||
      lower.includes('افتحي الخطه') ||
      lower.includes('افتح الخطة') ||
      lower.includes('افتح الخطه') ||
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
      if (activeStudyPlan) {
        setIsStudyPlanModalOpen(true);
        const planGreeting = isRtl
          ? `أهلاً بك يا بطل! 🌟 فتحت لك جدول خطتك الدراسية النشطة 🗓️ تضم ${activeStudyPlan.planItems?.length || 0} درساً. يمكنك استعراض كافة المحطات أو البدء بالدرس المجدول فوراً!`
          : `Welcome champion! 🌟 I opened your active study plan 🗓️ containing ${activeStudyPlan.planItems?.length || 0} lessons. Let's study!`;
        const saraMsg: MessageItem = {
          id: `msg_sara_plan_active_${Date.now()}`,
          role: 'sara',
          text: planGreeting,
          timestamp: Date.now()
        };
        setMessages(prev => [...prev, saraMsg]);
        if (voiceEnabled) {
          playSaraVoice(planGreeting);
        }
      } else {
        setIsSmartPlanGeneratorOpen(true);
        const planGreeting = isRtl
          ? `أهلاً بك يا بطل! 🌟 لم تبدأ خطة دراسية بعد، لذلك فتحت لك أداة توليد الخطة الذكية المخصصة ⚡. اختر مسارك وسأنسق جدولك الأكاديمي فوراً!`
          : `Welcome champion! 🌟 You don't have an active study plan yet, so I opened the Smart Plan Generator ⚡. Choose your track to get started!`;
        const saraMsg: MessageItem = {
          id: `msg_sara_plan_new_${Date.now()}`,
          role: 'sara',
          text: planGreeting,
          timestamp: Date.now()
        };
        setMessages(prev => [...prev, saraMsg]);
        if (voiceEnabled) {
          playSaraVoice(planGreeting);
        }
      }
      return;
    }

    // 0B-3. Detect "Browse / Navigate to Lessons & Curriculums" intent from voice or chat
    const isGrammarLessonIntent = lower.includes('درس قواعد') || lower.includes('درس القواعد') || lower.includes('قواعد الانجليزي') || lower.includes('grammar lesson');
    const isConversationLessonIntent = lower.includes('درس محادثة') || lower.includes('درس المحادثة') || lower.includes('محادثة حرة') || lower.includes('speaking lesson') || lower.includes('conversation lesson');
    const isReadingLessonIntent = lower.includes('درس قراءة') || lower.includes('درس القراءة') || lower.includes('قصة وقراءة') || lower.includes('reading lesson');
    const isWritingLessonIntent = lower.includes('درس كتابة') || lower.includes('درس الكتابة') || lower.includes('تعبير') || lower.includes('writing lesson');

    const isLessonsIntent = 
      isGrammarLessonIntent ||
      isConversationLessonIntent ||
      isReadingLessonIntent ||
      isWritingLessonIntent ||
      lower.includes('الدروس') ||
      lower.includes('انتقل الى الدروس') ||
      lower.includes('انتقل للدروس') ||
      lower.includes('افتح الدروس') ||
      lower.includes('افتحي الدروس') ||
      lower.includes('ابي الدروس') ||
      lower.includes('أبي الدروس') ||
      lower.includes('ابي دروس') ||
      lower.includes('أبي دروس') ||
      lower.includes('مناهج سارة') ||
      lower.includes('المناهج') ||
      lower.includes('المنهج') ||
      lower.includes('قائمة الدروس') ||
      lower.includes('عرض الدروس') ||
      lower.includes('ودني للدروس') ||
      lower.includes('خذني للدروس') ||
      lower.includes('curriculum') ||
      lower.includes('lessons') ||
      lower.includes('open lessons') ||
      lower.includes('browse lessons');

    if (isLessonsIntent) {
      const userMsg: MessageItem = {
        id: `msg_user_${Date.now()}`,
        role: 'user',
        text: text,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, userMsg]);
      setInputText('');

      const targetPillar = isGrammarLessonIntent 
        ? 'grammar' 
        : isConversationLessonIntent 
        ? 'conversation' 
        : isReadingLessonIntent 
        ? 'reading' 
        : isWritingLessonIntent 
        ? 'writing' 
        : 'all';

      handleOpenCurriculum(targetPillar);
      const lessonsGreeting = isRtl
        ? `أهلاً بك يا بطل! 🌟 فتحت لك مكتبة مناهج سارة التخصصية والدروس التفاعلية فوراً 📚. اختر أي درس تود تعلمه لننطلق معاً بالشرح على السبورة الذكية والتمارين التطبيقية!`
        : `Welcome champion! 🌟 I opened Sara's Specialized Curriculums & Lessons library for you 📚. Pick any lesson to begin learning on the smart whiteboard with exercises!`;
      const saraMsg: MessageItem = {
        id: `msg_sara_lessons_${Date.now()}`,
        role: 'sara',
        text: lessonsGreeting,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, saraMsg]);
      if (voiceEnabled) {
        playSaraVoice(lessonsGreeting);
      }
      return;
    }

    // 0B-4. Detect "Start Lesson / Next Lesson" intent from voice or chat
    const isStartLessonIntent = 
      lower.includes('ابدأ الدرس') ||
      lower.includes('ابدا الدرس') ||
      lower.includes('ابدأ درس اليوم') ||
      lower.includes('ابدا درس اليوم') ||
      lower.includes('درس اليوم') ||
      lower.includes('الدرس التالي') ||
      lower.includes('انتقل للدرس التالي') ||
      lower.includes('start lesson') ||
      lower.includes('start today lesson') ||
      lower.includes('start today\'s lesson') ||
      lower.includes('next lesson');

    if (isStartLessonIntent) {
      const userMsg: MessageItem = {
        id: `msg_user_${Date.now()}`,
        role: 'user',
        text: text,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, userMsg]);
      setInputText('');

      if (isDailyBreakActive) {
        handleFinishBreakAndStartNextLesson();
      } else {
        handleStartPlanLesson(todayScheduledLesson);
      }
      return;
    }

    // If currently in conversational placement assessment
    

    // Intercept quiz & spelling interactions if placement test is actively running
    

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
        learningStyle: tutorMemory.learningStyle || 'visual_interactive',
        learningPacing: tutorMemory.learningPacing || 'balanced',
        strengths: tutorMemory.strengths || [],
        masteredTopics: tutorMemory.masteredTopics || [],
        lastMemoryNotes: tutorMemory.notes?.slice(-5) || [],
        frequentMistakes: tutorMemory.frequentMistakes || [],
        wordsLearned: tutorMemory.wordsLearned || [],
        lastSessionTopic: tutorMemory.lastSessionTopic || '',
        lastSessionSummary: tutorMemory.lastSessionSummary || '',
        crossSessionHook: tutorMemory.crossSessionHook || ''
      };

      // Compact history formatted as role + text (last 12); local status bubbles are never sent
      const compactHistory = newHistory.filter(m => !m.notice).slice(-12).map(m => ({
        role: m.role === 'sara' ? 'model' : 'user',
        text: m.text
      }));

      const idToken = await getChatIdToken();
      if (!isMountedRef.current) return;
      if (!idToken) {
        setMessages(prev => [...prev.filter(m => m.notice !== 'auth'), buildAuthNotice(text, userMsg.id)]);
        return;
      }
      const chatAbort = new AbortController();
      const chatAbortTimer = setTimeout(() => chatAbort.abort(), 60000);
      const response = await fetch('/api/sara/chat', {
        signal: chatAbort.signal,
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
          activeCurriculum: activeCurriculumLesson ? buildSaraLessonContext(activeCurriculumLesson) : undefined,
          timerDurationMinutes: timerDurationMinutes || 10,
          timerSecondsLeft: timerSecondsLeft,
          scenarioDetails: activeRolePlay ? {
            id: activeRolePlay.id,
            title: isRtl ? activeRolePlay.titleAr : activeRolePlay.titleEn,
            roleSara: isRtl ? activeRolePlay.roleSaraAr : activeRolePlay.roleSaraEn,
            roleStudent: isRtl ? activeRolePlay.roleStudentAr : activeRolePlay.roleStudentEn,
            location: activeRolePlay.location
          } : undefined
        })
      });

      clearTimeout(chatAbortTimer);
      if (!isMountedRef.current) return;
      if (response.status === 401) {
        setMessages(prev => [...prev.filter(m => m.notice !== 'auth'), buildAuthNotice(text, userMsg.id)]);
        return;
      }
      if (response.status === 429) {
        setMessages(prev => [...prev, buildRetryNotice('rate', text, userMsg.id)]);
        return;
      }
      if (!response.ok) {
        throw new Error(`Chat error status: ${response.status}`);
      }

      const data: SaraChatResponse = await response.json();
      if (!isMountedRef.current) return;
      if (!data || typeof data.reply !== 'string' || !data.reply.trim()) {
        throw new Error('Chat returned an empty reply');
      }

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
      setMessages(prev => [...prev, buildRetryNotice(isOffline ? 'offline' : 'error', text, userMsg.id)]);
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
        isThinkingRef.current = false;
      }
    }
  };

  // Mini quiz option selection
  const handleQuizOptionClick = (index: number) => {
    
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
        <div className="w-full px-3 sm:px-5 pt-2.5 pb-2 flex flex-wrap items-center gap-x-3 gap-y-2">
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
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <div className="relative">
              {/* Illustrated Avatar in Warm Modest Style with Pure White Hijab Framing Face */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#C49E3A] via-[#855B14] to-[#002147] p-0.5 shadow-md flex items-center justify-center overflow-hidden">
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

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-nowrap">
                <h1 className="text-sm sm:text-base font-black text-[#002147] leading-tight whitespace-nowrap">
                  {isRtl ? 'سارة – معلمتك 👩‍🏫' : 'Sara – Your English Tutor 👩‍🏫'}
                </h1>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] font-black rounded-full border border-emerald-200 flex items-center gap-1 whitespace-nowrap shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {isRtl ? 'متصلة الآن' : 'Online'}
                </span>
                {/* Auto-save & offline safety badge */}
                <span 
                  className={`px-2 py-0.5 rounded-full border text-[9px] font-bold transition-all hidden sm:flex items-center gap-1 whitespace-nowrap shrink-0 ${
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
              <p className="text-[11px] text-slate-500 font-bold truncate">
                {isRtl ? 'معلمتك الخليجية الذكية لتعلم الإنجليزية بمتعة' : 'Your personal smart English tutor'}
              </p>
            </div>
          </div>

          {/* Mobile Header Quick Actions (sm:hidden) */}
          <div className="flex sm:hidden items-center gap-1 [&>*:not(:first-child)]:hidden">
            {/* 1. All Sara Tools Drawer Trigger (⚡) */}
            <button
              onClick={() => setShowMobileToolsDrawer(true)}
              className="w-8 h-8 rounded-full border-2 border-amber-400 bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center font-black text-xs shadow-xs active:scale-90 transition-all cursor-pointer relative"
              title={isRtl ? 'جميع أدوات وأنشطة سارة ⚡' : 'All Sara Tools ⚡'}
              aria-label={isRtl ? 'أدوات سارة' : 'Sara Tools'}
            >
              <span>⚡</span>
              <span className="absolute -top-1 -end-1 px-1 py-0.2 rounded-full bg-slate-950 text-amber-300 text-[7px] font-black border border-amber-400">
                7
              </span>
            </button>

            {/* 2. Mobile Live Phone Call Button (📞) */}
            <button
              onClick={() => setIsPhoneCallModalOpen(true)}
              className="w-8 h-8 rounded-full border-2 border-teal-300 bg-teal-50 text-teal-800 flex items-center justify-center shadow-xs active:scale-90 transition-all cursor-pointer animate-pulse"
              title={isRtl ? 'مكالمة هاتفية مع سارة 📞' : 'Call Sara 📞'}
              aria-label={isRtl ? 'اتصال بسارة' : 'Call Sara'}
            >
              <Phone size={14} className="text-teal-600" />
            </button>

            {/* 3. Mobile Curriculums Button (📚) */}
            <button
              onClick={() => handleOpenCurriculum('all')}
              className="w-8 h-8 rounded-full border-2 border-amber-400 bg-gradient-to-tr from-amber-300 to-yellow-300 text-slate-950 flex items-center justify-center shadow-xs active:scale-90 transition-all cursor-pointer"
              title={isRtl ? 'مناهج سارة 📚' : "Sara's Curriculums 📚"}
              aria-label={isRtl ? 'مناهج سارة' : "Sara's Curriculums"}
            >
              <span className="text-xs">📚</span>
            </button>

            {/* Sara Arabic/English Language Toggle Button (Mobile) */}
            <button
              onClick={() => handleToggleLanguage()}
              className="px-2 py-1 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-[#002147] text-[11px] font-black transition-all cursor-pointer shadow-2xs active:scale-95 flex items-center gap-1"
              title={activeLang === 'ar' ? 'التبديل إلى English' : 'التبديل إلى عربي'}
            >
              <span className="text-xs">🌐</span>
              <span>{activeLang === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            {/* Live voice quick button */}
            <button
              onClick={toggleLiveVoiceMode}
              className={`p-1.5 px-2 rounded-xl border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                isLiveMode
                  ? 'bg-rose-500 border-rose-600 text-white animate-pulse shadow-sm'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
              }`}
              title={isLiveMode ? (isRtl ? 'إيقاف اللايف' : 'Stop Live') : (isRtl ? 'محادثة لايف' : 'Live Voice')}
            >
              <Radio size={14} className={isLiveMode ? 'animate-spin text-white' : 'text-emerald-700'} />
              {isLiveMode && <span className="text-[10px] font-black">{isRtl ? 'لايف' : 'LIVE'}</span>}
            </button>

            {/* Sara 3D Character Button */}
            <button
              onClick={() => setIsSara3DOpen(!isSara3DOpen)}
              className={`p-1.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center text-xs ${
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
              className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                voiceEnabled ? 'bg-amber-50 text-[#002147] border-amber-200' : 'bg-slate-100 text-slate-400 border-slate-200'
              }`}
              title={voiceEnabled ? (isRtl ? 'الصوت مفعّل' : 'Mute') : (isRtl ? 'الصوت مكتوم' : 'Unmute')}
            >
              {voiceEnabled ? <Volume2 size={15} className="text-[#C49E3A]" /> : <VolumeX size={15} />}
            </button>
          </div>

        </div>

        {/* Mobile Redesigned 5-Segment Tab Bar (md:hidden) */}
        <div className="md:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-md px-2 py-1.5 shadow-2xs">
          <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-2xl border border-slate-200/90">
            {/* 1. Chat Tab */}
            <button
              onClick={() => {
                setMobileTab('chat');
                setIsWhiteboardOpen(false);
              }}
              className={`flex-1 py-1.5 px-1 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 cursor-pointer ${
                mobileTab === 'chat'
                  ? 'bg-[#002147] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <span>🏠</span>
              <span className="text-[11px]">{isRtl ? 'سارة' : 'Sara'}</span>
            </button>

            {/* 2. Whiteboard Tab */}
            <button
              onClick={() => {
                setMobileTab('board');
              }}
              className={`flex-1 py-1.5 px-1 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 cursor-pointer relative ${
                mobileTab === 'board'
                  ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <span>📐</span>
              <span className="text-[11px]">{isRtl ? 'السبورة' : 'Board'}</span>
              {activeBoard && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse absolute top-1 end-1" />
              )}
            </button>

            {/* 3. Curricula & Smart Plan Tab */}
            <button
              onClick={() => {
                setMobileTab('curriculum');
              }}
              className={`flex-1 py-1.5 px-1 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 cursor-pointer relative ${
                mobileTab === 'curriculum'
                  ? 'bg-blue-600 text-white font-black shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <span>📚</span>
              <span className="text-[11px]">{isRtl ? 'المناهج' : 'Tracks'}</span>
              {activeStudyPlan && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-300 absolute top-1 end-1" />
              )}
            </button>

            {/* 4. Scenarios & Adventures Tab */}
            <button
              onClick={() => {
                setMobileTab('scenarios');
              }}
              className={`flex-1 py-1.5 px-1 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 cursor-pointer relative ${
                mobileTab === 'scenarios'
                  ? 'bg-purple-600 text-white font-black shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <span>🎮</span>
              <span className="text-[11px]">{isRtl ? 'المغامرات' : 'Quests'}</span>
              {activeRolePlay && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse absolute top-1 end-1" />
              )}
            </button>

            {/* 5. Learning Lab & Tools Tab */}
            <button
              onClick={() => {
                setMobileTab('lab');
              }}
              className={`flex-1 py-1.5 px-1 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 cursor-pointer relative ${
                mobileTab === 'lab'
                  ? 'bg-emerald-600 text-white font-black shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <span>⚡</span>
              <span className="text-[11px]">{isRtl ? 'المختبر' : 'Lab'}</span>
              {tutorMemory.frequentMistakes && tutorMemory.frequentMistakes.length > 0 && (
                <span className="w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[8px] font-black flex items-center justify-center absolute -top-1 -end-1">
                  {tutorMemory.frequentMistakes.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. MAIN CONTENT AREA (BOARD + CHAT) */}
      {/* ======================================================== */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 py-4 sm:px-5 sm:py-6 flex flex-col gap-5 overflow-hidden">
        <div className={mobileTab === 'chat' ? 'block' : 'hidden md:block'}>{renderTeachersBanner()}</div>

        
        {/* 🧭 TOP: the single «ابدأ درس اليوم» card from the saved path + this week's table (only when a path plan exists). */}
        {pathPlanSaved && (
          <div data-testid="sara-path-card" className={messages.length <= 3 ? 'block' : 'hidden md:block'}>
            <React.Suspense fallback={null}>
              <TodayPathCard uid={profile?.uid} profile={profile} hideWhenUnset
                onSetPath={() => onNavigate('onboarding' as AppView)} onOpenLesson={() => onNavigate('path-lesson' as AppView)}
                onOpenCheck={() => onNavigate('path-check' as AppView)} onChangePlan={() => onNavigate('path-plan' as AppView)} />
            </React.Suspense>
          </div>
        )}
        <div className={mobileTab === 'chat' ? 'block' : 'hidden md:block'}>{renderTalkToSaraCard()}</div>

        {/* ======================================================== */}
        {/* 2A-000. ACTIVE ACADEMIC STUDY PLAN BANNER (HUD) */}
        {/* ======================================================== */}
        {activeStudyPlan && !isStudyPlanBannerDismissed && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:block bg-gradient-to-r from-blue-900 via-[#002147] to-indigo-950 text-white p-3.5 sm:p-4 rounded-3xl shadow-xl border-2 border-blue-400/40 relative overflow-hidden"
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
                    {activeStudyPlan.trackTitleAr && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black shadow-2xs">
                        {isRtl ? activeStudyPlan.trackTitleAr : (activeStudyPlan.trackTitleEn || activeStudyPlan.trackTitleAr)}
                      </span>
                    )}
                  </div>
                  {todayScheduledLesson ? (
                    <p className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5 flex-wrap">
                      <span className="text-blue-200 font-bold">{isRtl ? 'درس اليوم المحدد:' : "Today's Lesson:"}</span>
                      <span className="text-amber-300 underline underline-offset-2">
                        {isRtl ? todayScheduledLesson.titleAr : todayScheduledLesson.titleEn}
                      </span>
                      <span className="text-[10px] px-2 py-0.2 rounded-md bg-white/10 text-slate-200 font-normal">
                        {isRtl ? todayScheduledLesson.courseLabelAr : todayScheduledLesson.courseLabelEn}
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
                  onClick={() => setIsSmartPlanGeneratorOpen(true)}
                  className="px-3 py-2 rounded-xl bg-blue-500/25 hover:bg-blue-500/40 text-blue-200 font-bold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer border border-blue-400/25"
                  title={isRtl ? 'توليد خطة جديدة' : 'Generate New Plan'}
                >
                  <Sparkles size={13} className="text-amber-300" />
                  <span>{isRtl ? 'خطة جديدة ⚡' : 'New Plan'}</span>
                </button>
                <button
                  onClick={handleDeleteActivePlan}
                  className="p-2 text-rose-300 hover:text-white rounded-xl hover:bg-rose-500/30 transition-colors cursor-pointer border border-rose-400/20"
                  title={isRtl ? 'حذف الخطة نهائياً' : 'Delete Plan Permanently'}
                >
                  <Trash2 size={14} />
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

        {/* 2A-000-B. INVITING BANNER IF NO ACTIVE PLAN YET */}
        {!activeStudyPlan && !pathPlanSaved && !isStudyPlanBannerDismissed && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:block bg-[#002147] text-white px-3.5 py-2.5 rounded-2xl shadow-md border border-[#C49E3A]/50 relative overflow-hidden"
          >
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center justify-center text-xl shrink-0">
                  🗓️
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                      {isRtl ? 'الخطة الأكاديمية الذكية' : 'Smart Academic Plan'}
                    </span>
                    <span className="text-xs text-white font-bold">
                      {isRtl ? 'جاهز لتوليد خطتك الدراسية الذكية مع سارة؟' : 'Ready to generate your smart plan?'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium">
                    {isRtl
                      ? 'دع سارة تصمم لك جدولاً أكاديمياً ذكياً يربط الدروس بالسبورة التفاعلية واختبارات الإتقان!'
                      : 'Let Sara design a smart academic schedule connected to the whiteboard and mastery quizzes!'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsSmartPlanGeneratorOpen(true)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles size={14} className="text-slate-950" />
                  <span>{isRtl ? 'توليد خطة ذكية الآن ⚡' : 'Generate Smart Plan Now'}</span>
                </button>
                <button
                  onClick={() => setIsStudyPlanBannerDismissed(true)}
                  className="p-1.5 text-blue-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  title={isRtl ? 'إخفاء' : 'Dismiss'}
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* 🔄 Resume + 🎮 Today's scenario: two compact equal cards in one row (stack on phone; a lone card spans the row). */}
        {((!isContinuityBannerDismissed && (tutorMemory.lastSessionTopic || tutorMemory.lastSessionSummary) && messages.length <= 3) || (!activeRolePlay && todayScheduledLesson && !isStudyPlanBannerDismissed)) && (
        <div data-testid="sara-quick-row" className="grid grid-cols-1 md:grid-cols-2 gap-3 md:[&>*:only-child]:col-span-2">
        {/* ======================================================== */}
        {/* 🧠 2A-0. SMART ADAPTIVE CROSS-SESSION CONTINUITY BANNER */}
        {/* ======================================================== */}
        {!isContinuityBannerDismissed && (tutorMemory.lastSessionTopic || tutorMemory.lastSessionSummary) && messages.length <= 3 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            data-testid="sara-resume-card" className="bg-[#002147] text-white border border-[#C49E3A]/45 rounded-2xl p-3 shadow-md relative overflow-hidden flex flex-col gap-2.5 min-w-0"
          >
            <div className="flex flex-col gap-2.5 h-full">
              <div className="flex items-start gap-2.5 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-xl bg-[#C49E3A]/15 border border-[#C49E3A]/40 flex items-center justify-center shrink-0">
                  <Brain size={18} className="text-[#E8C766]" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full bg-[#C49E3A]/20 text-[#E8C766] border border-[#C49E3A]/40 text-[10px] font-black">
                      {isRtl ? 'استئناف من الجلسة السابقة 🔄' : 'Resume Previous Session 🔄'}
                    </span>
                    <span className="text-[12.5px] font-black text-white truncate max-w-full">
                      {tutorMemory.lastSessionTopic || tutorMemory.lastSessionSummary}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-medium line-clamp-2">
                    {tutorMemory.crossSessionHook || (isRtl
                      ? 'تتذكر سارة أين توقفت في جلستك السابقة، هل ترغب في استئناف التحدي أو الانطلاق في موضوع جديد؟'
                      : 'Sara remembers where you stopped. Would you like to resume or start a fresh topic?')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap mt-auto">
                <button
                  onClick={() => {
                    setIsContinuityBannerDismissed(true);
                    const topic = tutorMemory.lastSessionTopic || tutorMemory.lastSessionSummary || 'our last lesson';
                    handleSendMessage(
                      isRtl
                        ? `سارة، مرحباً بعودتي! دعينا نستأنف ونتدرب على موضوعنا السابق: "${topic}". اطرحي علي تحدياً سريعاً!`
                        : `Sara, welcome back! Let's resume and practice our previous topic: "${topic}". Give me a quick challenge!`
                    );
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#C49E3A] hover:bg-[#d4ae4a] text-[#002147] font-black text-[11.5px] transition-all shadow-sm active:scale-95 flex items-center gap-1.5 cursor-pointer"
                >
                  <Zap size={14} />
                  <span>{isRtl ? 'استئناف التحدي ⚡' : 'Resume Challenge ⚡'}</span>
                </button>
                <button
                  onClick={() => {
                    setIsContinuityBannerDismissed(true);
                    handleSendMessage(
                      isRtl
                        ? 'سارة، جاهز ننطلق في موضوع جديد وشيق اليوم! اقترحي علي فكرة ممتعة أو درساً جديداً.'
                        : "Sara, I'm ready for a fresh, exciting topic today! Suggest a fun lesson or challenge."
                    );
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-white font-black text-[11.5px] transition-all border border-white/20 active:scale-95 flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles size={14} className="text-[#E8C766]" />
                  <span>{isRtl ? 'موضوع جديد 🚀' : 'New Topic 🚀'}</span>
                </button>
                <button
                  onClick={() => setIsContinuityBannerDismissed(true)}
                  className="ms-auto p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  title={isRtl ? 'إخفاء' : 'Dismiss'}
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* 2A-00. FEATURED DAILY SCENARIO QUEST BANNER */}
        {/* ======================================================== */}
        {!activeRolePlay && todayScheduledLesson && !isStudyPlanBannerDismissed && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            data-testid="sara-scenario-card" className="hidden md:flex bg-[#002147] text-white border border-[#C49E3A]/45 rounded-2xl p-3 shadow-md relative overflow-hidden flex-col gap-2.5 min-w-0"
          >
            <div className="flex items-start gap-2.5 min-w-0 flex-1">
              <div className="w-9 h-9 rounded-xl bg-[#C49E3A]/15 border border-[#C49E3A]/40 flex items-center justify-center text-lg shrink-0">
                {todayScheduledLesson.scenario?.badge || '🎮'}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#C49E3A]/20 text-[#E8C766] border border-[#C49E3A]/40">
                    {isRtl ? 'تحدي سيناريو اليوم 🌟' : "Today's Scenario Quest 🌟"}
                  </span>
                  <span className="text-[12.5px] font-black text-white truncate max-w-full">
                    {isRtl ? todayScheduledLesson.titleAr : todayScheduledLesson.titleEn}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 line-clamp-2 mt-0.5">
                  {isRtl 
                    ? 'شرح حقيقي + مفردات وقواعد + تمارين واختبار إتقان قبل بدء المحاكاة بالصوت! 🚀' 
                    : 'Real explanation, vocab & grammar, exercises and mastery quiz before voice role-play! 🚀'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap mt-auto">
              <button
                onClick={() => {
                  setIsRolePlayModalOpen(true);
                }}
                className="px-3 py-1.5 rounded-xl bg-[#C49E3A] hover:bg-[#d4ae4a] text-[#002147] font-black text-[11.5px] transition-all shadow-sm active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <BookOpen size={13} />
                <span>{isRtl ? 'الشرح والتمارين 📖' : 'Lesson & Exercises 📖'}</span>
              </button>

              <button
                onClick={() => {
                  if (todayScheduledLesson.scenario) {
                    handleStartRolePlayScenario(todayScheduledLesson.scenario);
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-white font-black text-[11.5px] transition-all border border-white/20 active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <Play size={13} className="fill-current" />
                <span>{isRtl ? 'بدء المحاكاة 🚀' : 'Start Simulation'}</span>
              </button>
            </div>
          </motion.div>
        )}

        </div>
        )}

        {/* 🧰 Sara's tools — moved out of the header into one titled card under the page's main cards. */}
        <section data-testid="sara-tools-card" className={`bg-white border border-slate-200 rounded-3xl shadow-sm px-3 py-4 sm:px-5 sm:py-5 ${mobileTab === 'chat' ? 'block' : 'hidden md:block'}`}>
          <h2 className="flex items-center gap-2 text-[15px] sm:text-[17px] font-black text-[#002147] mb-3 px-1">
            <span className="w-1.5 h-5 rounded-full bg-[#C49E3A]" />{isRtl ? 'أدوات سارة' : "Sara's tools"}
          </h2>
          {/* Sara tools: labeled sections (scrolls sideways on phone/tablet, wraps on desktop) */}
          <nav data-testid="sara-toolbar" className="flex items-stretch gap-2.5 overflow-x-auto md:overflow-visible md:flex-wrap no-scrollbar pb-1">
          <section className="shrink-0 md:flex-auto rounded-2xl bg-slate-50 border border-slate-200 px-2.5 pt-2 pb-1.5">
            <p className="text-[10px] font-black text-[#C49E3A] mb-1 px-0.5">{isRtl ? 'سارة' : 'Sara'}</p>
            <div className="flex items-start gap-1">
            <div className="flex flex-col items-center gap-1 w-[58px] shrink-0">
            {/* 📚 SARA EXCLUSIVE CURRICULUMS (Circular with Glowing Badge) */}
            <div className="relative group/btn">
              <button
                onClick={() => handleOpenCurriculum('all')}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-amber-400 bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-300 hover:from-amber-300 hover:to-yellow-200 text-slate-950 flex items-center justify-center transition-all cursor-pointer shadow-md hover:scale-110 active:scale-95 shrink-0 ring-2 ring-amber-300/60 relative"
                aria-label={isRtl ? 'مناهج سارة' : "Sara's Exclusive Curriculums"}
              >
                <span className="text-base sm:text-lg animate-bounce">📚</span>
              </button>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/btn:opacity-100 translate-y-1 group-hover/btn:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-950/95 backdrop-blur-md text-amber-300 text-xs font-black shadow-xl border border-amber-400/40 flex items-center gap-1.5">
                <span>📚</span>
                <span>{isRtl ? 'مناهج سارة 📚' : "Sara's Curriculum 📚"}</span>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-950 rotate-45 border-t border-l border-amber-400/40" />
              </div>
            </div>
              <span className="text-[10px] leading-tight font-bold text-slate-600 text-center whitespace-nowrap">{isRtl ? 'المناهج' : "Curricula"}</span>
            </div>
            <div className="flex flex-col items-center gap-1 w-[58px] shrink-0">
            {/* ✨ SMART WHITEBOARD */}
            <div className="relative group/btn">
              <button
                onClick={() => {
                  if (isWhiteboardOpen) {
                    setIsWhiteboardOpen(false);
                  } else {
                    openWhiteboardModal();
                  }
                }}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 shrink-0 ${
                  isWhiteboardOpen
                    ? 'bg-amber-100 text-amber-900 border-[#C49E3A] ring-2 ring-amber-300/40'
                    : 'bg-gradient-to-r from-amber-50 to-amber-100/60 hover:from-amber-100 hover:to-amber-200 text-[#855B14] border-[#C49E3A]/40'
                }`}
                aria-label={isRtl ? 'السبورة الذكية' : 'Whiteboard'}
              >
                <Sparkles size={16} className={`text-[#C49E3A] ${isWhiteboardOpen ? 'animate-spin' : 'animate-pulse'}`} />
              </button>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/btn:opacity-100 translate-y-1 group-hover/btn:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-900/95 backdrop-blur-md text-white text-xs font-black shadow-xl border border-slate-700/80 flex items-center gap-1.5">
                <span>✨</span>
                <span>{isRtl ? 'السبورة الذكية التفاعلية' : 'Smart Whiteboard'}</span>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-t border-l border-slate-700/80" />
              </div>
            </div>
              <span className="text-[10px] leading-tight font-bold text-slate-600 text-center whitespace-nowrap">{isRtl ? 'السبورة' : "Board"}</span>
            </div>
            <div className="flex flex-col items-center gap-1 w-[58px] shrink-0">
            {/* 🎯 PLACEMENT TEST */}
            <div className="relative group/btn">
              <button
                onClick={startPlacementTest}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 shrink-0 ${
                  placementState.isActive
                    ? 'bg-[#002147] text-amber-300 border-amber-400 ring-2 ring-amber-300/40 animate-pulse'
                    : 'bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-[#002147] border-blue-300'
                }`}
                aria-label={isRtl ? 'تحديد المستوى' : 'Placement Test'}
              >
                <Target size={16} className={placementState.isActive ? 'text-amber-300' : 'text-blue-600'} />
              </button>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/btn:opacity-100 translate-y-1 group-hover/btn:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-900/95 backdrop-blur-md text-white text-xs font-black shadow-xl border border-slate-700/80 flex items-center gap-1.5">
                <span>🎯</span>
                <span>{isRtl ? 'اختبار تحديد المستوى الشامل 🎯' : 'Placement Test 🎯'}</span>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-t border-l border-slate-700/80" />
              </div>
            </div>
              <span className="text-[10px] leading-tight font-bold text-slate-600 text-center whitespace-nowrap">{isRtl ? 'تحديد المستوى' : "Placement"}</span>
            </div>
            <div className="flex flex-col items-center gap-1 w-[58px] shrink-0">
            {/* 📄 PRINTABLE WORKSHEET */}
            <div className="relative group/btn">
              <button
                onClick={() => setIsWorksheetModalOpen(true)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 shrink-0 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-900 border-blue-300"
                aria-label={isRtl ? 'ورقة عمل' : 'Worksheet'}
              >
                <FileText size={16} className="text-blue-600" />
              </button>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/btn:opacity-100 translate-y-1 group-hover/btn:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-900/95 backdrop-blur-md text-white text-xs font-black shadow-xl border border-slate-700/80 flex items-center gap-1.5">
                <span>📄</span>
                <span>{isRtl ? 'توليد ورقة عمل قابلة للطباعة PDF 📄' : 'Printable Worksheet & PDF 📄'}</span>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-t border-l border-slate-700/80" />
              </div>
            </div>
              <span className="text-[10px] leading-tight font-bold text-slate-600 text-center whitespace-nowrap">{isRtl ? 'ورقة عمل' : "Worksheet"}</span>
            </div>
            <div className="flex flex-col items-center gap-1 w-[58px] shrink-0">
              <button onClick={() => handleOpenCurriculum('listening')} data-testid="sara-listening-icon"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-[#C49E3A] bg-[#002147] text-amber-300 flex items-center justify-center shadow-xs hover:scale-105 active:scale-95 shrink-0"
                aria-label={isRtl ? 'الاستماع' : 'Listening'}>
                <Headphones size={16} />
              </button>
              <span className="text-[10px] leading-tight font-bold text-slate-600 text-center whitespace-nowrap">{isRtl ? 'الاستماع' : "Listening"}</span>
            </div>
            <div className="flex flex-col items-center gap-1 w-[58px] shrink-0">
              <button onClick={() => handleOpenCurriculum('pronunciation')} data-testid="sara-pron-icon"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-[#C49E3A] bg-[#002147] text-amber-300 flex items-center justify-center shadow-xs hover:scale-105 active:scale-95 shrink-0"
                aria-label={isRtl ? 'النطق' : 'Pronunciation'}>
                <Mic size={16} />
              </button>
              <span className="text-[10px] leading-tight font-bold text-slate-600 text-center whitespace-nowrap">{isRtl ? 'النطق' : "Pronunciation"}</span>
            </div>
            <div className="flex flex-col items-center gap-1 w-[58px] shrink-0">
              <button onClick={() => handleOpenCurriculum('vocabulary')} data-testid="sara-vocab-icon"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-[#C49E3A] bg-[#002147] text-amber-300 flex items-center justify-center shadow-xs hover:scale-105 active:scale-95 shrink-0"
                aria-label={isRtl ? 'المفردات' : 'Vocabulary'}>
                <span className="text-[13px] font-black">Aa</span>
              </button>
              <span className="text-[10px] leading-tight font-bold text-slate-600 text-center whitespace-nowrap">{isRtl ? 'المفردات' : "Vocabulary"}</span>
            </div>
            <div className="flex flex-col items-center gap-1 w-[58px] shrink-0">
              <button onClick={() => setIsFreeChatOpen(true)} data-testid="sara-free-icon"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-[#C49E3A] bg-[#002147] text-amber-300 flex items-center justify-center shadow-xs hover:scale-105 active:scale-95 shrink-0"
                aria-label={isRtl ? 'محاورة حرة' : 'Free conversation'}>
                <MessageCircle size={16} />
              </button>
              <span className="text-[10px] leading-tight font-bold text-slate-600 text-center whitespace-nowrap">{isRtl ? 'محاورة حرة' : "Free talk"}</span>
            </div>
            <div className="flex flex-col items-center gap-1 w-[58px] shrink-0">
              <button onClick={() => handleOpenCurriculum('daily')} data-testid="sara-daily-icon"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-[#C49E3A] bg-[#002147] text-amber-300 flex items-center justify-center shadow-xs hover:scale-105 active:scale-95 shrink-0"
                aria-label={isRtl ? 'الحياة اليومية' : 'Everyday English'}>
                <Globe size={16} />
              </button>
              <span className="text-[10px] leading-tight font-bold text-slate-600 text-center whitespace-nowrap">{isRtl ? 'الحياة اليومية' : "Daily life"}</span>
            </div>
            <div className="flex flex-col items-center gap-1 w-[58px] shrink-0">
              <button onClick={() => setIsExamOpen(true)} data-testid="sara-exam-icon"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-[#C49E3A] bg-[#002147] text-amber-300 flex items-center justify-center shadow-xs hover:scale-105 active:scale-95 shrink-0"
                aria-label="IELTS / STEP">
                <span className="text-[9px] font-black">IELTS</span>
              </button>
              <span className="text-[10px] leading-tight font-bold text-slate-600 text-center whitespace-nowrap">IELTS/STEP</span>
            </div>
            <div className="flex flex-col items-center gap-1 w-[58px] shrink-0">
              <button
                onClick={() => setSaraTool('grammar')}
                data-testid="sara-grammar-tool"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 shrink-0 bg-[#002147] text-amber-300 border-[#C49E3A]"
                aria-label="تدقيق نحوي"
              >
                <span className="text-[15px]">✍️</span>
              </button>
              <span className="text-[10px] leading-tight font-bold text-slate-600 text-center whitespace-nowrap">{isRtl ? 'تدقيق نحوي' : "Grammar check"}</span>
            </div>
            </div>
          </section>
          <section className="shrink-0 md:flex-auto rounded-2xl bg-slate-50 border border-slate-200 px-2.5 pt-2 pb-1.5">
            <p className="text-[10px] font-black text-[#C49E3A] mb-1 px-0.5">{isRtl ? 'التدريب' : 'Practice'}</p>
            <div className="flex items-start gap-1">
            <div className="flex flex-col items-center gap-1 w-[58px] shrink-0">
            {/* 🎙️ LIVE VOICE MODE */}
            <div className="relative group/btn">
              <button
                onClick={toggleLiveVoiceMode}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 shrink-0 ${
                  isLiveMode
                    ? 'bg-rose-500 border-rose-600 text-white animate-pulse ring-2 ring-rose-400/40'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
                }`}
                aria-label={isRtl ? 'محادثة لايف' : 'Live Voice'}
              >
                <Radio size={16} className={isLiveMode ? 'animate-spin' : 'text-emerald-700'} />
              </button>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/btn:opacity-100 translate-y-1 group-hover/btn:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-900/95 backdrop-blur-md text-white text-xs font-black shadow-xl border border-slate-700/80 flex items-center gap-1.5">
                <span>🎙️</span>
                <span>{isLiveMode ? (isRtl ? 'إيقاف اللايف 🔴' : 'Stop Live Mode 🔴') : (isRtl ? 'محادثة لايف صوتية مستمرة 🎙️' : 'Live Voice Mode 🎙️')}</span>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-t border-l border-slate-700/80" />
              </div>
            </div>
              <span className="text-[10px] leading-tight font-bold text-slate-600 text-center whitespace-nowrap">{isRtl ? 'محادثة لايف' : "Live chat"}</span>
            </div>
            <div className="flex flex-col items-center gap-1 w-[58px] shrink-0">
            {/* 📞 LIVE PHONE CALL */}
            <div className="relative group/btn">
              <button
                onClick={() => setIsPhoneCallModalOpen(true)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 shrink-0 bg-gradient-to-tr from-teal-50 to-emerald-50 hover:from-teal-100 hover:to-emerald-100 text-teal-900 border-teal-300 ring-2 ring-teal-400/20"
                aria-label={isRtl ? 'اتصال بسارة' : 'Call Sara'}
              >
                <Phone size={16} className="text-teal-600 animate-pulse" />
              </button>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/btn:opacity-100 translate-y-1 group-hover/btn:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-900/95 backdrop-blur-md text-white text-xs font-black shadow-xl border border-slate-700/80 flex items-center gap-1.5">
                <span>📞</span>
                <span>{isRtl ? 'مكالمة هاتفية حية مع سارة 📞' : 'Live Phone Call with Sara 📞'}</span>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-t border-l border-slate-700/80" />
              </div>
            </div>
              <span className="text-[10px] leading-tight font-bold text-slate-600 text-center whitespace-nowrap">{isRtl ? 'اتصال' : "Call"}</span>
            </div>
            <div className="flex flex-col items-center gap-1 w-[58px] shrink-0">
            {/* 🎙️ PHONETIC LAB */}
            <div className="relative group/btn">
              <button
                onClick={() => {
                  setPhoneticTargetSentence(activeBoard?.sentence || 'Welcome to Basim Al-Khalil Digital Academy');
                  setIsPhoneticModalOpen(true);
                }}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 shrink-0 bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 text-purple-900 border-purple-200"
                aria-label={isRtl ? 'مختبر النطق' : 'Speech Lab'}
              >
                <Mic size={16} className="text-purple-600 animate-pulse" />
              </button>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/btn:opacity-100 translate-y-1 group-hover/btn:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-900/95 backdrop-blur-md text-white text-xs font-black shadow-xl border border-slate-700/80 flex items-center gap-1.5">
                <span>🎙️</span>
                <span>{isRtl ? 'مختبر مخارج الحروف وتصحيح النطق 🎙️' : 'Phonetic Pronunciation Lab 🎙️'}</span>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-t border-l border-slate-700/80" />
              </div>
            </div>
              <span className="text-[10px] leading-tight font-bold text-slate-600 text-center whitespace-nowrap">{isRtl ? 'مختبر النطق' : "Pronunciation lab"}</span>
            </div>
            <div className="flex flex-col items-center gap-1 w-[58px] shrink-0">
            {/* 🗣️ VOICE COACH */}
            <div className="relative group/btn">
              <button
                onClick={() => setIsVoiceCoachModalOpen(true)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 shrink-0 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 text-purple-900 border-purple-300"
                aria-label={isRtl ? 'مدرب النطق' : 'Voice Coach'}
              >
                <span className="text-sm">🗣️</span>
              </button>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/btn:opacity-100 translate-y-1 group-hover/btn:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-900/95 backdrop-blur-md text-white text-xs font-black shadow-xl border border-slate-700/80 flex items-center gap-1.5">
                <span>🗣️</span>
                <span>{isRtl ? 'مدرب النطق الصوتي الذكي 🎙️' : 'AI Speech Coach 🎙️'}</span>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-t border-l border-slate-700/80" />
              </div>
            </div>
              <span className="text-[10px] leading-tight font-bold text-slate-600 text-center whitespace-nowrap">{isRtl ? 'مدرب الصوت' : "Voice coach"}</span>
            </div>
            <div className="flex flex-col items-center gap-1 w-[58px] shrink-0">
            {/* 🎮 12Y ROLE-PLAY ADVENTURES */}
            <div className="relative group/btn">
              <button
                onClick={() => setIsRolePlayModalOpen(true)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 shrink-0 ${
                  activeRolePlay
                    ? 'bg-amber-400 text-slate-950 border-amber-500 ring-2 ring-amber-300/40'
                    : 'bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 text-[#002147] border-indigo-200'
                }`}
                aria-label={isRtl ? 'سيناريوهات 12 سنة' : '12Y Adventures'}
              >
                <span className="text-base">🎮</span>
              </button>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/btn:opacity-100 translate-y-1 group-hover/btn:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-900/95 backdrop-blur-md text-white text-xs font-black shadow-xl border border-slate-700/80 flex items-center gap-1.5">
                <span>🎮</span>
                <span>{isRtl ? 'سيناريوهات ومغامرات 12 سنة 🎮' : '12Y Role-Play & Adventures 🎮'}</span>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-t border-l border-slate-700/80" />
              </div>
            </div>
              <span className="text-[10px] leading-tight font-bold text-slate-600 text-center whitespace-nowrap">{isRtl ? 'لعب الأدوار' : "Role-play"}</span>
            </div>
            <div className="flex flex-col items-center gap-1 w-[58px] shrink-0">
            {/* ⚡ SPEED DRILLS */}
            <div className="relative group/btn">
              <button
                onClick={() => setIsSpeedDrillModalOpen(true)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 shrink-0 bg-gradient-to-r from-amber-50 to-yellow-50 hover:from-amber-100 hover:to-yellow-100 text-amber-900 border-amber-300"
                aria-label={isRtl ? 'تحديات السرعة' : 'Speed Drills'}
              >
                <Zap size={16} className="text-amber-600 animate-pulse" />
              </button>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/btn:opacity-100 translate-y-1 group-hover/btn:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-900/95 backdrop-blur-md text-white text-xs font-black shadow-xl border border-slate-700/80 flex items-center gap-1.5">
                <span>⚡</span>
                <span>{isRtl ? 'تحديات السرعة المصغرة ضد الوقت ⚡' : 'Speed Drills & Micro-Challenges ⚡'}</span>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-t border-l border-slate-700/80" />
              </div>
            </div>
              <span className="text-[10px] leading-tight font-bold text-slate-600 text-center whitespace-nowrap">{isRtl ? 'تحدي السرعة' : "Speed challenge"}</span>
            </div>
            </div>
          </section>
          <section className="shrink-0 md:flex-auto rounded-2xl bg-slate-50 border border-slate-200 px-2.5 pt-2 pb-1.5">
            <p className="text-[10px] font-black text-[#C49E3A] mb-1 px-0.5">{isRtl ? 'التقدّم' : 'Progress'}</p>
            <div className="flex items-start gap-1">
            <div className="flex flex-col items-center gap-1 w-[58px] shrink-0">
            {/* 🧠 SMART ADAPTIVE MEMORY */}
            <div className="relative group/btn">
              <button
                onClick={() => setIsAdaptiveMemoryModalOpen(true)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 shrink-0 bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-900 border-indigo-300 relative"
                aria-label={isRtl ? 'ذاكرة سارة' : 'Memory'}
              >
                <Brain size={16} className="text-indigo-600 animate-pulse" />
                {((tutorMemory.strengths?.length || 0) + (tutorMemory.masteredTopics?.length || 0)) > 0 && (
                  <span className="absolute -top-1 -end-1 w-4 h-4 rounded-full bg-indigo-600 text-white text-[9px] font-black flex items-center justify-center shadow-xs">
                    {(tutorMemory.strengths?.length || 0) + (tutorMemory.masteredTopics?.length || 0)}
                  </span>
                )}
              </button>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/btn:opacity-100 translate-y-1 group-hover/btn:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-900/95 backdrop-blur-md text-white text-xs font-black shadow-xl border border-slate-700/80 flex items-center gap-1.5">
                <span>🧠</span>
                <span>{isRtl ? 'ذاكرة سارة وملف التعلم المعرفي 🧠' : "Sara's Smart Memory & Profile 🧠"}</span>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-t border-l border-slate-700/80" />
              </div>
            </div>
              <span className="text-[10px] leading-tight font-bold text-slate-600 text-center whitespace-nowrap">{isRtl ? 'الذاكرة' : "Memory"}</span>
            </div>
            <div className="flex flex-col items-center gap-1 w-[58px] shrink-0">
            {/* 🏆 ACHIEVEMENTS & QUESTS */}
            <div className="relative group/btn">
              <button
                onClick={() => setIsAchievementsModalOpen(true)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 shrink-0 bg-gradient-to-r from-amber-50 to-yellow-50 hover:from-amber-100 hover:to-yellow-100 text-amber-900 border-amber-300"
                aria-label={isRtl ? 'الإنجازات' : 'Achievements'}
              >
                <Trophy size={16} className="text-amber-600" />
              </button>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/btn:opacity-100 translate-y-1 group-hover/btn:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-900/95 backdrop-blur-md text-white text-xs font-black shadow-xl border border-slate-700/80 flex items-center gap-1.5">
                <span>🏆</span>
                <span>{isRtl ? 'الأوسمة والمهام اليومية وجوائز الإتقان 🏆' : 'Achievements & Daily Quests 🏆'}</span>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-t border-l border-slate-700/80" />
              </div>
            </div>
              <span className="text-[10px] leading-tight font-bold text-slate-600 text-center whitespace-nowrap">{isRtl ? 'الإنجازات' : "Achievements"}</span>
            </div>
            <div className="flex flex-col items-center gap-1 w-[58px] shrink-0">
            {/* 📊 PARENT INSIGHTS */}
            <div className="relative group/btn">
              <button
                onClick={() => setIsParentInsightsModalOpen(true)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 shrink-0 bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 text-emerald-900 border-emerald-300"
                aria-label={isRtl ? 'تقرير ولي الأمر' : 'Parent Report'}
              >
                <Award size={16} className="text-emerald-600" />
              </button>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/btn:opacity-100 translate-y-1 group-hover/btn:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-900/95 backdrop-blur-md text-white text-xs font-black shadow-xl border border-slate-700/80 flex items-center gap-1.5">
                <span>📊</span>
                <span>{isRtl ? 'تحليلات ورؤى أولياء الأمور 📊' : 'Parent & Mentor Insights 📊'}</span>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-t border-l border-slate-700/80" />
              </div>
            </div>
              <span className="text-[10px] leading-tight font-bold text-slate-600 text-center whitespace-nowrap">{isRtl ? 'تقرير ولي الأمر' : "Parent report"}</span>
            </div>
            <div className="flex flex-col items-center gap-1 w-[58px] shrink-0">
            {/* 📓 ERROR NOTEBOOK */}
            <div className="relative group/btn">
              <button
                onClick={() => setIsNotebookModalOpen(true)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 shrink-0 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 text-[#855B14] border-amber-300 relative"
                aria-label={isRtl ? 'دفتر الأخطاء' : 'Notebook'}
              >
                <BookMarked size={16} className="text-[#C49E3A]" />
                {tutorMemory.frequentMistakes && tutorMemory.frequentMistakes.length > 0 && (
                  <span className="absolute -top-1 -end-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center shadow-xs">
                    {tutorMemory.frequentMistakes.length}
                  </span>
                )}
              </button>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/btn:opacity-100 translate-y-1 group-hover/btn:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-900/95 backdrop-blur-md text-white text-xs font-black shadow-xl border border-slate-700/80 flex items-center gap-1.5">
                <span>📓</span>
                <span>{isRtl ? 'دفتر الملاحظات والأخطاء الشخصي وبنك المفردات 📓' : 'My Error Notebook & Word Bank 📓'}</span>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-t border-l border-slate-700/80" />
              </div>
            </div>
              <span className="text-[10px] leading-tight font-bold text-slate-600 text-center whitespace-nowrap">{isRtl ? 'دفتر الأخطاء' : "Mistakes notebook"}</span>
            </div>
            <div className="flex flex-col items-center gap-1 w-[58px] shrink-0">
            {/* 🔥 STREAK */}
            <div className="relative group/btn">
              <div className="h-9 sm:h-10 px-2.5 rounded-full border-2 border-orange-200 bg-orange-50 text-[#ff9600] font-black text-xs flex items-center justify-center gap-1 shadow-xs cursor-default">
                <Flame size={15} className="animate-bounce-slow text-orange-500" />
                <span>{streak.current}</span>
              </div>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/btn:opacity-100 translate-y-1 group-hover/btn:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-900/95 backdrop-blur-md text-white text-xs font-black shadow-xl border border-slate-700/80 flex items-center gap-1.5">
                <span>🔥</span>
                <span>{isRtl ? `سلسلة الأيام المستمرة (${streak.current} يوم) 🔥` : `Daily Streak (${streak.current} days) 🔥`}</span>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-t border-l border-slate-700/80" />
              </div>
            </div>
              <span className="text-[10px] leading-tight font-bold text-slate-600 text-center whitespace-nowrap">{isRtl ? 'السلسلة' : "Streak"}</span>
            </div>
            </div>
          </section>
          <section className="shrink-0 md:flex-auto rounded-2xl bg-slate-50 border border-slate-200 px-2.5 pt-2 pb-1.5">
            <p className="text-[10px] font-black text-[#C49E3A] mb-1 px-0.5">{isRtl ? 'الأدوات' : 'Tools'}</p>
            <div className="flex items-start gap-1">
            <div className="flex flex-col items-center gap-1 w-[58px] shrink-0">
            {/* 👩‍🏫 SARA 3D CHARACTER */}
            <div className="relative group/btn">
              <button
                onClick={() => setIsSara3DOpen(!isSara3DOpen)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 shrink-0 ${
                  isSara3DOpen
                    ? 'bg-amber-100 text-amber-900 border-[#C49E3A] ring-2 ring-amber-300/40'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                }`}
                aria-label={isRtl ? 'سارة 3D' : 'Sara 3D'}
              >
                <span className="text-base">👩‍🏫</span>
              </button>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/btn:opacity-100 translate-y-1 group-hover/btn:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-900/95 backdrop-blur-md text-white text-xs font-black shadow-xl border border-slate-700/80 flex items-center gap-1.5">
                <span>👩‍🏫</span>
                <span>{isRtl ? (isSara3DOpen ? 'سارة 3D نشطة (اضغط للإخفاء) ✨' : 'عرض سارة 3D 👩‍🏫') : 'Toggle 3D Sara'}</span>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-t border-l border-slate-700/80" />
              </div>
            </div>
              <span className="text-[10px] leading-tight font-bold text-slate-600 text-center whitespace-nowrap">{isRtl ? 'سارة 3D' : "Sara 3D"}</span>
            </div>
            <div className="flex flex-col items-center gap-1 w-[58px] shrink-0">
            {/* ⚡ SPEECH SPEED */}
            <div className="relative group/btn">
              <button
                onClick={() => {
                  const nextRate = saraSpeechRate === 1.0 ? 0.8 : saraSpeechRate === 0.8 ? 1.2 : 1.0;
                  setSaraSpeechRate(nextRate);
                }}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 shrink-0 bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                aria-label="Speech Speed"
              >
                <span className="text-xs font-black">{saraSpeechRate === 0.8 ? '🐢' : saraSpeechRate === 1.2 ? '🚀' : '⚡'}</span>
              </button>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/btn:opacity-100 translate-y-1 group-hover/btn:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-900/95 backdrop-blur-md text-white text-xs font-black shadow-xl border border-slate-700/80 flex items-center gap-1.5">
                <span>⚡</span>
                <span>{isRtl ? `سرعة صوت سارة: ${saraSpeechRate}x (اضغط للتغيير) ⚡` : `Speech Speed: ${saraSpeechRate}x ⚡`}</span>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-t border-l border-slate-700/80" />
              </div>
            </div>
              <span className="text-[10px] leading-tight font-bold text-slate-600 text-center whitespace-nowrap">{isRtl ? 'سرعة الصوت' : "Voice speed"}</span>
            </div>
            <div className="flex flex-col items-center gap-1 w-[58px] shrink-0">
            {/* 📦 ARCHIVE CURRENT SESSION */}
            <div className="relative group/btn">
              <button
                onClick={() => setShowArchiveConfirm(true)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 shrink-0 bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300"
                aria-label={isRtl ? 'أرشف الجلسة' : 'Archive Session'}
              >
                <Archive size={16} className="text-amber-700" />
              </button>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/btn:opacity-100 translate-y-1 group-hover/btn:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-900/95 backdrop-blur-md text-white text-xs font-black shadow-xl border border-slate-700/80 flex items-center gap-1.5">
                <span>📦</span>
                <span>{isRtl ? 'أرشف الجلسة الحالية وبدء محادثة جديدة 📦' : 'Archive Session & Start Fresh 📦'}</span>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-t border-l border-slate-700/80" />
              </div>
            </div>
              <span className="text-[10px] leading-tight font-bold text-slate-600 text-center whitespace-nowrap">{isRtl ? 'أرشفة' : "Archive"}</span>
            </div>
            <div className="flex flex-col items-center gap-1 w-[58px] shrink-0">
            {/* 🗂️ SESSIONS ARCHIVE */}
            <div className="relative group/btn">
              <button
                onClick={() => {
                  fetchArchivedSessions();
                  setIsArchiveModalOpen(true);
                }}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 shrink-0 bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300"
                aria-label={isRtl ? 'الأرشيف' : 'Archive'}
              >
                <History size={16} className="text-slate-500" />
              </button>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/btn:opacity-100 translate-y-1 group-hover/btn:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-900/95 backdrop-blur-md text-white text-xs font-black shadow-xl border border-slate-700/80 flex items-center gap-1.5">
                <span>🗂️</span>
                <span>{isRtl ? 'استعراض واسترجاع أرشيف الجلسات 🗂️' : 'Sessions Archive 🗂️'}</span>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-t border-l border-slate-700/80" />
              </div>
            </div>
              <span className="text-[10px] leading-tight font-bold text-slate-600 text-center whitespace-nowrap">{isRtl ? 'الأرشيف' : "Archive list"}</span>
            </div>
            <div className="flex flex-col items-center gap-1 w-[58px] shrink-0">
            {/* 🌐 BILINGUAL SWITCHER */}
            <div className="relative group/btn">
              <button
                onClick={() => handleToggleLanguage()}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 shrink-0 bg-slate-100 hover:bg-slate-200 border-slate-200 text-[#002147] font-black text-xs"
                aria-label="Language Toggle"
              >
                <span className="text-sm">{activeLang === 'ar' ? '🇸🇦' : '🇬🇧'}</span>
              </button>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/btn:opacity-100 translate-y-1 group-hover/btn:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-900/95 backdrop-blur-md text-white text-xs font-black shadow-xl border border-slate-700/80 flex items-center gap-1.5">
                <span>🌐</span>
                <span>{activeLang === 'ar' ? 'التبديل إلى English (المحادثة الإنجليزية بالكامل) 🇬🇧' : 'Switch to Arabic Explanation 🇸🇦'}</span>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-t border-l border-slate-700/80" />
              </div>
            </div>
              <span className="text-[10px] leading-tight font-bold text-slate-600 text-center whitespace-nowrap">{isRtl ? 'اللغة' : "Language"}</span>
            </div>
            <div className="flex flex-col items-center gap-1 w-[58px] shrink-0">
            {/* 🔊 VOICE TOGGLE */}
            <div className="relative group/btn">
              <button
                onClick={() => {
                  if (isSpeaking) cancelAllSpeech();
                  setVoiceEnabled(!voiceEnabled);
                }}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 shrink-0 ${
                  voiceEnabled
                    ? 'bg-blue-50 text-[#002147] border-blue-200'
                    : 'bg-slate-100 text-slate-400 border-slate-200'
                }`}
                aria-label="Toggle Voice"
              >
                {voiceEnabled ? <Volume2 size={16} className="text-[#C49E3A]" /> : <VolumeX size={16} />}
              </button>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/btn:opacity-100 translate-y-1 group-hover/btn:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-900/95 backdrop-blur-md text-white text-xs font-black shadow-xl border border-slate-700/80 flex items-center gap-1.5">
                <span>{voiceEnabled ? '🔊' : '🔇'}</span>
                <span>{voiceEnabled ? (isRtl ? 'صوت سارة مفعّل (اضغط للكتم) 🔊' : 'Voice Enabled 🔊') : (isRtl ? 'صوت سارة مكتوم (اضغط للتشغيل) 🔇' : 'Voice Muted 🔇')}</span>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-t border-l border-slate-700/80" />
              </div>
            </div>
              <span className="text-[10px] leading-tight font-bold text-slate-600 text-center whitespace-nowrap">{isRtl ? 'الصوت' : "Sound"}</span>
            </div>
            </div>
          </section>
          </nav>
        </section>

        {/* Sara's tracks box removed (owner's ask): «كل مناهج سارة» = المناهج in the header tools + 📚 in the quick tools bar; «توليد خطة ذكية» = ✨ in the quick tools bar. */}

        {/* ======================================================== */}
        {/* 2A-0A. SARA ACTIVE CURRICULUM LESSON HUD BANNER */}
        {/* ======================================================== */}
        {activeCurriculumLesson && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:block bg-gradient-to-r from-slate-950 via-[#002147] to-[#0d3b66] text-white p-3.5 sm:p-4 rounded-3xl shadow-xl border-2 border-amber-400/60 relative overflow-hidden ring-2 ring-amber-400/20"
          >
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-2xl p-2 bg-amber-400 text-slate-950 rounded-2xl border border-amber-300 shadow-md shrink-0">
                  {activeCurriculumLesson.pillarIcon || '👩‍🏫'}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider px-2 py-0.5 rounded-full bg-black/40 border border-amber-400/30">
                      {isRtl ? activeCurriculumLesson.pillarNameAr : activeCurriculumLesson.pillarNameEn}
                    </span>
                    <span className="px-1.5 py-0.2 rounded-md bg-emerald-500/20 text-emerald-300 text-[9px] font-black border border-emerald-400/30">
                      {activeCurriculumLesson.levelCode || 'B1-B2'}
                    </span>
                  </div>
                  <h2 className="text-xs sm:text-sm font-black text-white truncate mt-0.5">
                    {isRtl ? activeCurriculumLesson.titleAr : activeCurriculumLesson.titleEn}
                  </h2>
                </div>
              </div>

              {/* Action Buttons: Turn Page / Exercises / Quiz / Open Board / Close */}
              <div className="flex items-center gap-1.5 shrink-0 ms-auto flex-wrap">
                <button
                  onClick={() => {
                    setIsWhiteboardOpen(true);
                    setCurrentWhiteboardPageIndex(prev => prev < 6 ? prev + 1 : 0);
                  }}
                  className="px-3 py-1.5 bg-gradient-to-r from-amber-400 to-yellow-300 hover:brightness-105 active:scale-95 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1 shadow-md cursor-pointer animate-pulse"
                  title={isRtl ? 'اقلب الصفحة واشرحي' : 'Turn Page & Explain'}
                >
                  <BookOpen size={13} />
                  <span>{isRtl ? 'اقلب الصفحة واشرحي 📄' : 'Turn Page 📄'}</span>
                </button>

                <button
                  onClick={() => {
                    setIsWhiteboardOpen(true);
                    setCurrentWhiteboardPageIndex(4);
                  }}
                  className="px-2.5 py-1.5 bg-blue-500/90 hover:bg-blue-600 text-white font-black rounded-xl text-xs flex items-center gap-1 shadow-xs cursor-pointer active:scale-95"
                  title={isRtl ? 'التمارين التطبيقية التفاعلية' : 'Practice Exercises'}
                >
                  <span>✍️</span>
                  <span>{isRtl ? 'التمارين ✍️' : 'Exercises'}</span>
                </button>

                <button
                  onClick={() => {
                    setIsWhiteboardOpen(true);
                    setCurrentWhiteboardPageIndex(6);
                  }}
                  className="px-2.5 py-1.5 bg-emerald-600/90 hover:bg-emerald-700 text-white font-black rounded-xl text-xs flex items-center gap-1 shadow-xs cursor-pointer active:scale-95"
                  title={isRtl ? 'امتحان الإتقان النهائي' : 'Mastery Quiz'}
                >
                  <Trophy size={13} />
                  <span>{isRtl ? 'الامتحان 🎯' : 'Quiz'}</span>
                </button>

                <button
                  onClick={() => setIsWhiteboardOpen(prev => !prev)}
                  className="px-2.5 py-1.5 bg-white/15 hover:bg-white/25 text-white font-bold rounded-xl text-xs flex items-center gap-1 border border-white/20 cursor-pointer active:scale-95"
                  title={isRtl ? 'فتح أو إغلاق السبورة الذكية' : 'Toggle Whiteboard'}
                >
                  <span>📋</span>
                  <span className="hidden xs:inline">{isRtl ? 'السبورة' : 'Board'}</span>
                </button>

                <button
                  onClick={() => setActiveCurriculumLesson(null)}
                  className="p-1.5 bg-white/10 hover:bg-rose-600/80 text-slate-300 hover:text-white rounded-xl text-xs transition-colors cursor-pointer"
                  title={isRtl ? 'إنهاء الدرس' : 'Close Lesson'}
                >
                  <X size={14} />
                </button>
              </div>
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
            className="hidden md:block bg-gradient-to-r from-slate-950 via-[#002147] to-slate-950 text-white p-3.5 sm:p-4 rounded-3xl shadow-xl border-2 border-amber-400/50 relative overflow-hidden ring-1 ring-amber-400/20"
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
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] bg-white/10 px-2 py-1 rounded-xl text-slate-200 font-bold border border-white/10 flex items-center gap-1">
                  <span>📍</span>
                  <span>{activeRolePlay.location}</span>
                </span>

                <button
                  onClick={() => {
                    setRolePlayInitialId(activeRolePlay.id);
                    setRolePlayInitialTab('lesson');
                    setIsRolePlayModalOpen(true);
                  }}
                  className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-black transition-all cursor-pointer shadow-xs flex items-center gap-1"
                  title={isRtl ? 'عرض الشرح والمفردات والقواعد' : 'View Lesson'}
                >
                  <BookOpen size={12} />
                  <span>{isRtl ? 'الشرح 📖' : 'Lesson'}</span>
                </button>

                <button
                  onClick={() => {
                    setRolePlayInitialId(activeRolePlay.id);
                    setRolePlayInitialTab('exercises');
                    setIsRolePlayModalOpen(true);
                  }}
                  className="px-2.5 py-1 bg-blue-500/80 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center gap-1"
                  title={isRtl ? 'التمارين التطبيقية التفاعلية' : 'Practice Exercises'}
                >
                  <span>✍️</span>
                  <span>{isRtl ? 'تمارين ✍️' : 'Drills'}</span>
                </button>

                <button
                  onClick={() => {
                    setRolePlayInitialId(activeRolePlay.id);
                    setRolePlayInitialTab('quiz');
                    setIsRolePlayModalOpen(true);
                  }}
                  className="px-2.5 py-1 bg-emerald-500/80 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center gap-1"
                  title={isRtl ? 'اختبار الإتقان للسيناريو' : 'Mastery Quiz'}
                >
                  <Trophy size={12} />
                  <span>{isRtl ? 'اختبار 🏆' : 'Quiz'}</span>
                </button>

                <button
                  onClick={() => setIsWhiteboardOpen(true)}
                  className="px-2.5 py-1 bg-white/15 hover:bg-white/25 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center gap-1 border border-white/15"
                  title={isRtl ? 'فتح سبورة سارة الذكية' : 'Open Board'}
                >
                  <span>📋</span>
                  <span>{isRtl ? 'السبورة' : 'Board'}</span>
                </button>

                <button
                  onClick={handleEndRolePlay}
                  className="px-2.5 py-1 bg-rose-500/80 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                >
                  {isRtl ? 'إنهاء ✕' : 'Exit ✕'}
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
        {/* 2A. INTERACTIVE "LESSON BOARD" CARD (DESKTOP) */}
        {/* ======================================================== */}
        <AnimatePresence>
          {activeBoard && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="hidden md:block bg-white border-2 border-b-4 border-slate-200 rounded-3xl p-4 sm:p-5 shadow-sm relative overflow-hidden"
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
        {/* MOBILE REDESIGNED SCREENS & SECTIONS (md:hidden) */}
        {/* ======================================================== */}

        {/* 1. Mobile Activity Status Capsule (Visible only on chat tab if an active plan, lesson, or roleplay exists) */}
        {mobileTab === 'chat' && (activeCurriculumLesson || activeRolePlay || (todayScheduledLesson && !isStudyPlanBannerDismissed)) && (
          <div className="md:hidden bg-gradient-to-r from-[#002147] via-[#093568] to-[#002147] text-white p-2.5 rounded-2xl border-2 border-amber-400/50 shadow-md">
            <div className="flex items-center justify-between gap-2">
              <div 
                className="flex items-center gap-2 min-w-0 flex-1 cursor-pointer"
                onClick={() => setIsMobileActivityCapsuleExpanded(!isMobileActivityCapsuleExpanded)}
              >
                <span className="text-lg shrink-0">
                  {activeCurriculumLesson ? activeCurriculumLesson.pillarIcon || '📚' : activeRolePlay ? activeRolePlay.badge || '🎮' : '🗓️'}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-black uppercase text-amber-300 tracking-wider px-1.5 py-0.2 rounded bg-white/10">
                      {activeCurriculumLesson ? (isRtl ? 'درس نشط' : 'Active Lesson') : activeRolePlay ? (isRtl ? 'مغامرة 12Y' : 'Quest') : (isRtl ? 'درس اليوم' : "Today's Goal")}
                    </span>
                    <span className="text-xs font-black text-white truncate">
                      {activeCurriculumLesson 
                        ? (isRtl ? activeCurriculumLesson.titleAr : activeCurriculumLesson.titleEn)
                        : activeRolePlay 
                        ? (isRtl ? activeRolePlay.titleAr : activeRolePlay.titleEn)
                        : todayScheduledLesson
                        ? (isRtl ? todayScheduledLesson.titleAr : todayScheduledLesson.titleEn)
                        : ''}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                {activeCurriculumLesson && (
                  <button
                    onClick={() => {
                      setMobileTab('board');
                      setCurrentWhiteboardPageIndex(prev => prev < 6 ? prev + 1 : 0);
                    }}
                    className="px-2 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-lg text-[10px] flex items-center gap-1 cursor-pointer active:scale-95 shadow-xs"
                  >
                    <span>📄</span>
                    <span>{isRtl ? 'اقلب' : 'Page'}</span>
                  </button>
                )}
                {todayScheduledLesson && !activeCurriculumLesson && !activeRolePlay && (
                  <button
                    onClick={() => handleStartPlanLesson(todayScheduledLesson)}
                    className="px-2 py-1 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black rounded-lg text-[10px] flex items-center gap-1 cursor-pointer active:scale-95 shadow-xs"
                  >
                    <span>🚀</span>
                    <span>{isRtl ? 'ابدأ' : 'Start'}</span>
                  </button>
                )}
                <button
                  onClick={() => setIsMobileActivityCapsuleExpanded(!isMobileActivityCapsuleExpanded)}
                  className="p-1 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                >
                  {isMobileActivityCapsuleExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>
            </div>

            {/* Expanded Details inside Mobile Capsule */}
            {isMobileActivityCapsuleExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 pt-2 border-t border-white/15 text-xs space-y-2"
              >
                {activeCurriculumLesson && (
                  <div className="flex items-center justify-between gap-1 flex-wrap">
                    <span className="text-[11px] text-amber-200">
                      {isRtl ? `المستوى: ${activeCurriculumLesson.levelCode} • القسم: ${activeCurriculumLesson.pillarNameAr}` : `Level: ${activeCurriculumLesson.levelCode}`}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setMobileTab('board');
                          setCurrentWhiteboardPageIndex(4);
                        }}
                        className="px-2 py-1 bg-blue-500 text-white rounded-lg text-[10px] font-bold"
                      >
                        ✍️ {isRtl ? 'تمارين' : 'Drills'}
                      </button>
                      <button
                        onClick={() => {
                          setMobileTab('board');
                          setCurrentWhiteboardPageIndex(6);
                        }}
                        className="px-2 py-1 bg-emerald-500 text-white rounded-lg text-[10px] font-bold"
                      >
                        🏆 {isRtl ? 'امتحان' : 'Quiz'}
                      </button>
                      <button
                        onClick={() => setMobileTab('board')}
                        className="px-2 py-1 bg-white/20 text-white rounded-lg text-[10px] font-bold"
                      >
                        📐 {isRtl ? 'السبورة' : 'Board'}
                      </button>
                      <button
                        onClick={() => setActiveCurriculumLesson(null)}
                        className="p-1 bg-white/10 hover:bg-rose-500 text-white rounded-lg text-[10px]"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}

                {activeRolePlay && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-emerald-300 font-bold">{isRtl ? `دورك: ${activeRolePlay.roleStudentAr}` : `You: ${activeRolePlay.roleStudentEn}`}</span>
                      <span className="text-amber-300 font-bold">{isRtl ? `سارة: ${activeRolePlay.roleSaraAr}` : `Sara: ${activeRolePlay.roleSaraEn}`}</span>
                    </div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] text-slate-300">
                        {isRtl ? `المهام: ${completedMissions.length} من ${activeRolePlay.missionsAr?.length || 3}` : `Missions: ${completedMissions.length}`}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setMobileTab('scenarios')}
                          className="px-2 py-1 bg-amber-400 text-slate-950 font-bold text-[10px] rounded-lg"
                        >
                          🎮 {isRtl ? 'المهام' : 'Tasks'}
                        </button>
                        <button
                          onClick={handleEndRolePlay}
                          className="px-2 py-1 bg-rose-500 text-white font-bold text-[10px] rounded-lg"
                        >
                          ✕ {isRtl ? 'إنهاء' : 'Exit'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {todayScheduledLesson && !activeCurriculumLesson && !activeRolePlay && (
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] text-blue-200">
                      {isRtl ? todayScheduledLesson.courseLabelAr : todayScheduledLesson.courseLabelEn}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleStartPlanLesson(todayScheduledLesson)}
                        className="px-2.5 py-1 bg-amber-400 text-slate-950 font-black rounded-lg text-[10px]"
                      >
                        🚀 {isRtl ? 'بدء الدرس' : 'Start'}
                      </button>
                      <button
                        onClick={() => setIsStudyPlanModalOpen(true)}
                        className="px-2 py-1 bg-white/20 text-white font-bold rounded-lg text-[10px]"
                      >
                        🗓️ {isRtl ? 'الخطة كاملة' : 'Plan'}
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        )}

        {/* 2. Mobile Dedicated Whiteboard Screen */}
        {mobileTab === 'board' && (
          <div className="md:hidden space-y-3 pb-6">
            <div className="bg-[#002147] border-2 border-amber-400/80 rounded-3xl p-4 text-white shadow-xl space-y-3">
              {/* Board Header Ribbon */}
              <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xl p-1 bg-amber-400 text-slate-950 rounded-xl shadow-xs">📐</span>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                      {isRtl ? 'السبورة الذكية التفاعلية' : 'Smart Whiteboard'}
                    </span>
                    <h2 className="text-xs sm:text-sm font-black text-white leading-tight">
                      {activeBoard?.title || (isRtl ? 'لوحة الشرح والطبشور 👩‍🏫' : 'Sara Blackboard 👩‍🏫')}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={openWhiteboardModal}
                    className="p-1 px-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 transition-all cursor-pointer flex items-center gap-1 text-[11px] font-black shadow-xs active:scale-95"
                    title={isRtl ? 'حفظ لوحة الشرح' : 'Save'}
                  >
                    <Camera size={12} />
                    <span>{isRtl ? 'حفظ' : 'Save'}</span>
                  </button>

                  <button
                    onClick={openWhiteboardModal}
                    className="p-1 px-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-all cursor-pointer flex items-center gap-1 text-[11px] font-bold border border-white/20"
                    title={isRtl ? 'السبورة الكاملة' : 'Full Board'}
                  >
                    <Sparkles size={12} className="text-amber-300" />
                    <span>{isRtl ? 'كاملة' : 'Full'}</span>
                  </button>
                </div>
              </div>

              {/* Target Sentence Display */}
              {activeBoard?.sentence ? (
                <div className="bg-black/40 border border-white/15 text-white p-3.5 rounded-2xl shadow-inner text-center">
                  <p className="text-sm sm:text-base font-bold tracking-wide font-sans leading-relaxed">
                    {activeBoard.sentence}
                  </p>
                  <div className="mt-2.5 flex items-center justify-center gap-1.5 flex-wrap">
                    <button
                      onClick={() => playSaraVoice(activeBoard.sentence!)}
                      className="px-2.5 py-1 bg-amber-400 text-slate-950 font-black rounded-xl text-[11px] flex items-center gap-1 cursor-pointer active:scale-95"
                    >
                      <Volume2 size={12} />
                      <span>{isRtl ? 'استمع للنطق 🔊' : 'Listen 🔊'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setPhoneticTargetSentence(activeBoard.sentence!);
                        setIsPhoneticModalOpen(true);
                      }}
                      className="px-2.5 py-1 bg-violet-600 text-white font-bold rounded-xl text-[11px] flex items-center gap-1 cursor-pointer active:scale-95"
                    >
                      <Mic size={12} />
                      <span>{isRtl ? 'حلّل نطقي 🎙️' : 'Speech Lab'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Empty Board Welcome & Instant Launchers */
                <div className="bg-black/30 border border-white/10 rounded-2xl p-3.5 text-center space-y-2.5">
                  <span className="text-3xl block">👩‍🏫📐</span>
                  <h3 className="text-xs font-black text-amber-300">
                    {isRtl ? 'السبورة جاهزة للشرح بالصوت والطبشور' : 'Board is ready for explanation!'}
                  </h3>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {isRtl ? 'اختر أي موضوع أو قاعدة لتبدأ سارة بكتابتها وشرحها صوتياً على السبورة:' : 'Choose a topic for Sara to write and explain on the board:'}
                  </p>
                  <div className="grid grid-cols-2 gap-1.5 pt-1 text-start">
                    {[
                      { t: isRtl ? 'قاعدة Past Continuous 📐' : 'Past Continuous 📐', q: isRtl ? 'سارة، اشرحي لي قاعدة Past Continuous بالتفصيل على السبورة بالصوت' : 'Explain Past Continuous on the board' },
                      { t: isRtl ? 'الفرق بين Since و For 🔍' : 'Since vs For 🔍', q: isRtl ? 'سارة، اشرحي لي الفرق بين Since و For مع أمثلة على السبورة' : 'Explain Since vs For on the board' },
                      { t: isRtl ? 'نطق الحروف الصامتة 🎙️' : 'Silent Letters 🎙️', q: isRtl ? 'سارة، اشرحي لي نطق الحروف الصامتة في الإنجليزية على السبورة' : 'Explain silent letters on the board' },
                      { t: isRtl ? 'صياغة إيميل رسمي ✍️' : 'Formal Email ✍️', q: isRtl ? 'سارة، اكتبي لي على السبورة هيكل إيميل عمل احترافي مع الشرح' : 'Write a formal email template on the board' }
                    ].map((launcher, lIdx) => (
                      <button
                        key={`mob-board-l-${lIdx}`}
                        onClick={() => {
                          handleSendMessage(launcher.q);
                          setMobileTab('board');
                        }}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-xl border border-white/15 text-[10px] font-bold text-white text-start transition-all cursor-pointer active:scale-95"
                      >
                        {launcher.t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Gentle Correction Card */}
              {activeBoard?.correction && (
                <div className="bg-black/40 border border-white/10 rounded-2xl p-2.5 flex items-center justify-around gap-2 text-xs">
                  <div className="flex items-center gap-1 text-rose-400 bg-rose-950/40 px-2.5 py-1 rounded-xl border border-rose-500/30">
                    <XCircle size={13} className="shrink-0" />
                    <span className="line-through font-bold opacity-80">{activeBoard.correction.wrong}</span>
                  </div>
                  <span className="text-slate-400 font-black">➔</span>
                  <div className="flex items-center gap-1 text-emerald-300 bg-emerald-950/40 px-2.5 py-1 rounded-xl border border-emerald-500/30 font-black">
                    <CheckCircle2 size={13} className="shrink-0 text-emerald-400" />
                    <span>{activeBoard.correction.right}</span>
                  </div>
                </div>
              )}

              {/* Pedagogical Formula / Tip */}
              {(activeBoard?.formula || activeBoard?.commonPitfall) && (
                <div className="bg-amber-400/10 border border-amber-400/30 rounded-2xl p-2.5 text-[11px] text-amber-200 space-y-1">
                  {activeBoard.formula && (
                    <div className="font-mono font-bold flex items-center gap-1.5">
                      <span>📐</span>
                      <span>{activeBoard.formula}</span>
                    </div>
                  )}
                  {activeBoard.commonPitfall && (
                    <div className="text-[10px] text-slate-300 flex items-center gap-1">
                      <span>⚠️</span>
                      <span>
                        {typeof activeBoard.commonPitfall === 'string'
                          ? activeBoard.commonPitfall
                          : `${activeBoard.commonPitfall.bad} ➔ ${activeBoard.commonPitfall.good} (${activeBoard.commonPitfall.explanation})`}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Mini-Quiz on Mobile */}
              {activeBoard?.quiz && (
                <div className="bg-black/50 border border-amber-300/40 rounded-2xl p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs font-black text-amber-300">
                    <span className="flex items-center gap-1">
                      <span>?</span>
                      <span>{activeBoard.quiz.question}</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-300">{chatQuizTimeLeft}s</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1.5">
                    {activeBoard.quiz.options.map((opt, oIdx) => {
                      const isSelected = quizSelectedOption === oIdx;
                      const isCorrect = oIdx === activeBoard.quiz?.answerIndex;
                      let optStyle = 'bg-white/10 hover:bg-white/20 text-white border-white/15';
                      if (quizSelectedOption !== null) {
                        if (isCorrect) optStyle = 'bg-emerald-500 text-slate-950 font-black border-emerald-400';
                        else if (isSelected) optStyle = 'bg-rose-500 text-white line-through border-rose-400';
                        else optStyle = 'opacity-40 bg-white/5 border-white/5 text-slate-400';
                      }
                      return (
                        <button
                          key={`mob-quiz-${oIdx}`}
                          disabled={quizSelectedOption !== null}
                          onClick={() => handleQuizOptionClick(oIdx)}
                          className={`p-2 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${optStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Bottom Action Strip */}
              <div className="pt-1 flex items-center gap-2">
                <button
                  onClick={() => { setMobileTab('chat'); openChatView(); }}
                  className="flex-1 py-2 px-3 bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 font-black text-xs rounded-xl transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <span>💬</span>
                  <span>{isRtl ? 'العودة للمحادثة مع سارة' : 'Back to Chat with Sara'}</span>
                </button>
                <button
                  onClick={openWhiteboardModal}
                  className="py-2 px-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-all cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>📋</span>
                  <span>{isRtl ? 'ملء الشاشة' : 'Fullscreen'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. Mobile Dedicated Curriculums & Smart Plan Screen */}
        {mobileTab === 'curriculum' && (
          <div className="md:hidden space-y-3.5 pb-6">
            {/* Smart Academic Plan Hero Card */}
            <div className="bg-gradient-to-br from-[#002147] via-blue-900 to-indigo-950 text-white p-4 rounded-3xl border-2 border-blue-400/50 shadow-xl space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-2xl font-black shadow-md shrink-0">
                  🗓️
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                      {isRtl ? 'الخطة الأكاديمية الذكية' : 'Smart Study Plan'}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <h3 className="text-sm font-black text-white mt-0.5">
                    {activeStudyPlan 
                      ? (isRtl ? (activeStudyPlan.trackTitleAr || 'خطتك النشطة جاهزة') : (activeStudyPlan.trackTitleEn || 'Active Plan Ready'))
                      : (isRtl ? 'صمم خطتك الدراسية المخصصة مع سارة' : 'Design your smart study plan')}
                  </h3>
                </div>
              </div>

              <p className="text-[11px] text-blue-100 font-medium leading-relaxed">
                {activeStudyPlan
                  ? (isRtl ? `تضم الخطة ${activeStudyPlan.planItems?.length || 0} درساً مرتبطة بالسبورة التفاعلية واختبارات الإتقان اليومية.` : `Plan includes ${activeStudyPlan.planItems?.length || 0} lessons linked to the smartboard.`)
                  : (isRtl ? 'حدد عدد الحصص، أيام الدراسة، والمناهج المستهدفة لتقوم سارة بتنظيم جدولك الدراسي فوراً!' : 'Select daily lessons, days, and subjects to generate your schedule!')}
              </p>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => setIsSmartPlanGeneratorOpen(true)}
                  className="flex-1 py-2.5 px-3 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Sparkles size={14} className="text-slate-950" />
                  <span>{isRtl ? 'توليد الخطة الذكية ⚡' : 'Generate Smart Plan ⚡'}</span>
                </button>
                {activeStudyPlan && (
                  <>
                    <button
                      onClick={() => setIsStudyPlanModalOpen(true)}
                      className="py-2.5 px-3 bg-white/15 hover:bg-white/25 text-white font-bold text-xs rounded-xl border border-white/20 transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <CalendarDays size={14} />
                      <span>{isRtl ? 'عرض الخطة' : 'View Plan'}</span>
                    </button>
                    <button
                      onClick={handleDeleteActivePlan}
                      className="py-2.5 px-3 bg-rose-500/20 hover:bg-rose-500/35 text-rose-300 font-bold text-xs rounded-xl border border-rose-400/30 transition-all cursor-pointer flex items-center justify-center gap-1"
                      title={isRtl ? 'حذف الخطة' : 'Delete Plan'}
                    >
                      <Trash2 size={14} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* The 4 Core Fluency Tracks Cards */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-black text-[#002147] flex items-center justify-between px-1">
                <span>{isRtl ? 'مناهج سارة' : 'Curriculum (under construction)'}</span>
                <span className="text-[10px] text-slate-500 font-bold">{isRtl ? 'دروس تفاعلية بالصوت والسبورة' : 'Interactive lessons'}</span>
              </h3>

              {/* 1. Spoken Grammar */}
              <div 
                onClick={() => handleOpenCurriculum('grammar')}
                className="bg-white border-2 border-blue-200 hover:border-blue-400 p-3.5 rounded-2xl shadow-xs transition-all cursor-pointer active:scale-98 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center text-xl shrink-0">🧠</span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-black text-[#002147]">{isRtl ? 'منهج القواعد التحدثية السريعة' : 'Spoken Grammar & Patterns'}</h4>
                      <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-blue-100 text-blue-800">{saraBuilt(SARA_FOUND_T, SARA_ADV_T)} درس</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5">{isRtl ? 'قواعد سريعة للحديث بثقة بدون تردد' : 'Spoken rules for instant fluency'}</p>
                  </div>
                </div>
                <ChevronRight size={16} className={`text-blue-600 shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
              </div>

              {/* 2. Conversation & Speaking */}
              <div 
                onClick={() => handleOpenCurriculum('conversation')}
                className="bg-white border-2 border-cyan-200 hover:border-cyan-400 p-3.5 rounded-2xl shadow-xs transition-all cursor-pointer active:scale-98 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-900 flex items-center justify-center text-xl shrink-0">💬</span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-black text-[#002147]">{isRtl ? 'منهج المحادثة والطلاقة التفاعلية' : 'Active Conversation & Fluency'}</h4>
                      <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-cyan-100 text-cyan-800">{saraBuilt(SARA_CONV_T)} درس</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5">{isRtl ? 'حوارات يومية وتدريب صوتي على سرعة الرد' : 'Daily conversations & voice speed'}</p>
                  </div>
                </div>
                <ChevronRight size={16} className={`text-cyan-600 shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
              </div>

              {/* 3. Reading & Phonetics */}
              <div 
                onClick={() => handleOpenCurriculum('reading')}
                className="bg-white border-2 border-emerald-200 hover:border-emerald-400 p-3.5 rounded-2xl shadow-xs transition-all cursor-pointer active:scale-98 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center text-xl shrink-0">📖</span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-black text-[#002147]">{isRtl ? 'منهج القراءة التعبيرية والنطق الصوتي' : 'Expressive Reading & Phonetics'}</h4>
                      <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">{saraBuilt(SARA_READ_T)} درس</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5">{isRtl ? 'إتقان نطق الأصوات والكلمات الصعبة' : 'Master phonetics and accents'}</p>
                  </div>
                </div>
                <ChevronRight size={16} className={`text-emerald-600 shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
              </div>

              {/* 4. Writing */}
              <div 
                onClick={() => handleOpenCurriculum('writing')}
                className="bg-white border-2 border-purple-200 hover:border-purple-400 p-3.5 rounded-2xl shadow-xs transition-all cursor-pointer active:scale-98 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-purple-100 text-purple-900 flex items-center justify-center text-xl shrink-0">✍️</span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-black text-[#002147]">{isRtl ? 'منهج الكتابة التعبيرية الحوارية' : 'Conversational Writing'}</h4>
                      <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-purple-100 text-purple-800">{saraBuilt(SARA_WRITE_T)} درس</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5">{isRtl ? 'كتابة رسائل رسمية وإيميلات احترافية' : 'Formal emails & essay writing'}</p>
                  </div>
                </div>
                <ChevronRight size={16} className={`text-purple-600 shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
              </div>
              {/* 5. Listening */}
              <div onClick={() => handleOpenCurriculum('listening')}
                className="bg-white border-2 border-amber-300 hover:border-amber-400 p-3.5 rounded-2xl shadow-xs transition-all cursor-pointer active:scale-98 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#002147] text-amber-300 flex items-center justify-center text-xl shrink-0">🎧</span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-black text-[#002147]">{isRtl ? 'منهج الاستماع' : 'Listening'}</h4>
                      <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">{LISTENING_LESSONS.length} درس</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5">{isRtl ? 'حوارات بصوت سارة، أسئلة فهم وإملاء' : "Sara's dialogues, questions & dictation"}</p>
                  </div>
                </div>
                <ChevronRight size={16} className={`text-amber-600 shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
              </div>
              {/* 6. Pronunciation */}
              <div onClick={() => handleOpenCurriculum('pronunciation')}
                className="bg-white border-2 border-amber-300 hover:border-amber-400 p-3.5 rounded-2xl shadow-xs transition-all cursor-pointer active:scale-98 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#002147] text-amber-300 flex items-center justify-center text-xl shrink-0">🗣️</span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-black text-[#002147]">{isRtl ? 'منهج النطق' : 'Pronunciation'}</h4>
                      <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">{PRONUNCIATION_LESSONS.length} درس</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5">{isRtl ? 'الأصوات الصعبة على العربي، اسمع وسجّل صوتك' : 'Hard sounds: listen & record'}</p>
                  </div>
                </div>
                <ChevronRight size={16} className={`text-amber-600 shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
              </div>
              {/* 7. Vocabulary */}
              <div onClick={() => handleOpenCurriculum('vocabulary')}
                className="bg-white border-2 border-amber-300 hover:border-amber-400 p-3.5 rounded-2xl shadow-xs transition-all cursor-pointer active:scale-98 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#002147] text-amber-300 flex items-center justify-center text-xl shrink-0">🔤</span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-black text-[#002147]">{isRtl ? 'منهج المفردات' : 'Vocabulary'}</h4>
                      <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">{VOCAB_LESSONS.length} درس · {VOCAB_LESSONS.reduce((n, l) => n + l.words.length, 0)} كلمة</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5">{isRtl ? 'كلمات يومية بالمواضيع، بطاقات ومراجعة متباعدة' : 'Topic words, flashcards & spaced review'}</p>
                  </div>
                </div>
                <ChevronRight size={16} className={`text-amber-600 shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
              </div>
              {/* 8. Everyday English */}
              <div onClick={() => handleOpenCurriculum('daily')}
                className="bg-white border-2 border-amber-300 hover:border-amber-400 p-3.5 rounded-2xl shadow-xs transition-all cursor-pointer active:scale-98 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#002147] text-amber-300 flex items-center justify-center text-xl shrink-0">🌍</span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-black text-[#002147]">{isRtl ? 'إنجليزي الحياة اليومية' : 'Everyday English'}</h4>
                      <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">{DAILY_LESSONS.length} موقف</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5">{isRtl ? 'المطار والفندق والمطعم والطبيب، حوارات ولعب أدوار' : 'Real-life situations & role-play'}</p>
                  </div>
                </div>
                <ChevronRight size={16} className={`text-amber-600 shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
              </div>
            </div>

            {/* Browse All Curriculums Hub Button */}
            <button
              onClick={() => handleOpenCurriculum('all')}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#002147] to-[#0d3b66] hover:brightness-110 text-amber-300 font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer active:scale-98 border border-amber-400/40"
            >
              <span>🌐</span>
              <span>{isRtl ? 'استعراض كافة مناهج وأقسام الأكاديمية (18 قسماً) ➔' : 'Browse All Academy Curricula (18 Sections) ➔'}</span>
            </button>
          </div>
        )}

        {/* 4. Mobile Dedicated Scenarios & 12Y Adventures Screen */}
        {mobileTab === 'scenarios' && (
          <div className="md:hidden space-y-3.5 pb-6">
            {/* Active Role-Play HUD if one is running */}
            {activeRolePlay ? (
              <div className="bg-gradient-to-br from-[#002147] via-slate-900 to-[#002147] text-white p-4 rounded-3xl border-2 border-amber-400/60 shadow-xl space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl p-1 bg-amber-400 text-slate-950 rounded-xl shadow-xs">
                      {activeRolePlay.badge}
                    </span>
                    <div>
                      <span className="text-[10px] font-black uppercase text-amber-300">
                        {isRtl ? 'مغامرة نشطة 🎮' : 'Active Quest 🎮'}
                      </span>
                      <h3 className="text-xs font-black text-white">
                        {isRtl ? activeRolePlay.titleAr : activeRolePlay.titleEn}
                      </h3>
                    </div>
                  </div>
                  <button
                    onClick={handleEndRolePlay}
                    className="p-1 px-2.5 bg-rose-500 text-white rounded-xl text-[10px] font-bold"
                  >
                    {isRtl ? 'إنهاء ✕' : 'Exit ✕'}
                  </button>
                </div>

                {/* Roles info */}
                <div className="grid grid-cols-2 gap-2 bg-black/40 border border-white/10 rounded-2xl p-2 text-xs">
                  <div className="text-center">
                    <span className="text-slate-400 text-[10px] block">{isRtl ? 'دورك:' : 'You:'}</span>
                    <span className="font-black text-emerald-300 text-[11px]">{isRtl ? activeRolePlay.roleStudentAr : activeRolePlay.roleStudentEn}</span>
                  </div>
                  <div className="text-center border-s border-white/15">
                    <span className="text-slate-400 text-[10px] block">{isRtl ? 'دور سارة:' : 'Sara:'}</span>
                    <span className="font-black text-amber-300 text-[11px]">{isRtl ? activeRolePlay.roleSaraAr : activeRolePlay.roleSaraEn}</span>
                  </div>
                </div>

                {/* Missions Checklist */}
                <div className="space-y-1.5">
                  <span className="text-[10px] text-amber-200 font-bold block">
                    {isRtl ? `المهام المستهدفة (${completedMissions.length}/${activeRolePlay.missionsAr?.length || 3}):` : 'Target Missions:'}
                  </span>
                  {(isRtl ? activeRolePlay.missionsAr : activeRolePlay.missionsEn).map((mission, mIdx) => {
                    const isDone = completedMissions.includes(mIdx);
                    return (
                      <div 
                        key={`mob-m-${mIdx}`} 
                        className={`flex items-center gap-2 p-2 rounded-xl text-xs border ${
                          isDone ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' : 'bg-black/30 border-white/10 text-slate-200'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                          isDone ? 'bg-emerald-400 text-slate-950' : 'bg-white/20 text-slate-300'
                        }`}>
                          {isDone ? '✓' : mIdx + 1}
                        </span>
                        <span className={`truncate text-[11px] ${isDone ? 'line-through opacity-80' : 'font-bold'}`}>{mission}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Suggested Quick Replies */}
                {activeRolePlay.starterPrompts && activeRolePlay.starterPrompts.length > 0 && (
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] text-slate-300 font-bold block">{isRtl ? '💡 ردود مقترحة (اضغط للإرسال والمحادثة):' : 'Suggested replies:'}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeRolePlay.starterPrompts.map((p, pIdx) => (
                        <button
                          key={`mob-rp-p-${pIdx}`}
                          onClick={() => {
                            handleSendMessage(p);
                            setMobileTab('chat');
                          }}
                          className="p-1.5 px-2 bg-white/10 hover:bg-amber-400 hover:text-slate-950 text-white rounded-xl text-[10px] font-bold border border-white/10 transition-all cursor-pointer active:scale-95"
                        >
                          "{p}"
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => { setMobileTab('chat'); openChatView(); }}
                  className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                >
                  <span>💬</span>
                  <span>{isRtl ? 'المحادثة الحية في المغامرة ↵' : 'Chat in Quest ↵'}</span>
                </button>
              </div>
            ) : (
              /* If no active scenario: Showcase 6 Scenarios Cards */
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-[#002147] to-[#0a3568] text-white p-3.5 rounded-2xl border-2 border-indigo-400/40 shadow-sm flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl p-1.5 bg-amber-400 text-slate-950 rounded-xl shadow-xs">🎮</span>
                    <div>
                      <h3 className="text-xs font-black text-white">{isRtl ? 'مغامرات وسيناريوهات سارة (12 سنة)' : 'Sara 12Y Adventures Hub'}</h3>
                      <p className="text-[10px] text-blue-200">{isRtl ? 'مواقف ومحادثات حقيقية ممتعة بالصوت رد برد!' : 'Voice interactive simulations!'}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {ROLE_PLAY_SCENARIOS.slice(0, 6).map((sc) => (
                    <div 
                      key={`mob-sc-${sc.id}`}
                      onClick={() => {
                        handleStartRolePlayScenario(sc);
                        setMobileTab('chat');
                      }}
                      className="bg-white border-2 border-slate-200 hover:border-amber-400 p-3 rounded-2xl shadow-2xs hover:shadow-sm transition-all cursor-pointer active:scale-95 flex flex-col justify-between gap-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{sc.badge}</span>
                        <span className="text-[9px] font-black px-1.5 py-0.2 rounded-full bg-indigo-100 text-indigo-900">12Y</span>
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-[#002147] leading-snug line-clamp-1">{isRtl ? sc.titleAr : sc.titleEn}</h4>
                        <p className="text-[9px] text-slate-500 line-clamp-1 mt-0.5">{sc.location}</p>
                      </div>
                      <button className="w-full py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-lg text-[10px] font-black flex items-center justify-center gap-1">
                        <span>🚀</span>
                        <span>{isRtl ? 'ابدأ المغامرة' : 'Start'}</span>
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setIsRolePlayModalOpen(true)}
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-indigo-900 to-[#002147] text-white font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer border border-indigo-400/40"
                >
                  <Gamepad2 size={15} className="text-amber-300" />
                  <span>{isRtl ? 'استعراض كافة السيناريوهات والمغامرات (16) 🎮' : 'Browse All Scenarios (16) 🎮'}</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* 5. Mobile Dedicated Learning Lab & Tools Screen */}
        {mobileTab === 'lab' && (
          <div className="md:hidden space-y-3 pb-6">
            <div className="bg-white border-2 border-slate-200 rounded-3xl p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xl p-1 bg-emerald-100 text-emerald-800 rounded-xl">⚡</span>
                  <div>
                    <h3 className="text-xs font-black text-[#002147]">{isRtl ? 'مختبر التعلم والأدوات الذكية' : 'Sara Learning Lab'}</h3>
                    <p className="text-[10px] text-slate-500 font-medium">{isRtl ? 'أدوات النطق، دفتر الأخطاء، والتحكم بالصوت' : 'Speech lab, notebook, voice settings'}</p>
                  </div>
                </div>
              </div>

              {/* Grid of Lab Tools with Full 7 Developments */}
              <div className="grid grid-cols-2 gap-2">
                {/* 1. Live Phone Call with Sara (#7 - Featured Full Width) */}
                <div 
                  onClick={() => setIsPhoneCallModalOpen(true)}
                  className="col-span-2 bg-gradient-to-r from-teal-500 via-teal-600 to-emerald-600 border-2 border-teal-400 p-3.5 rounded-2xl cursor-pointer active:scale-95 transition-all flex items-center justify-between text-white shadow-md relative overflow-hidden"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shrink-0">
                      📞
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-black text-white">{isRtl ? 'مكالمة هاتفية حية مع سارة' : 'Live Phone Call with Sara'}</h4>
                        <span className="text-[9px] font-black px-1.5 py-0.2 rounded-full bg-emerald-400 text-slate-950 animate-pulse">
                          {isRtl ? 'لايف بدون لمس' : 'Hands-Free'}
                        </span>
                      </div>
                      <p className="text-[10px] text-teal-100">{isRtl ? 'محادثة صوتية حرة بـ 6 سيناريوهات واقعية' : 'Voice conversation in 6 real scenarios'}</p>
                    </div>
                  </div>
                  <span className="text-sm font-black text-teal-200">➔</span>
                </div>

                {/* 2. Achievements & Daily Quests (#5) */}
                <div 
                  onClick={() => setIsAchievementsModalOpen(true)}
                  className="bg-gradient-to-br from-amber-50 to-yellow-100 border-2 border-amber-300 p-3 rounded-2xl cursor-pointer active:scale-95 transition-all flex flex-col justify-between gap-2 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">🏆</span>
                    <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-amber-500 text-slate-950">
                      {isRtl ? 'جوائز' : 'Quests'}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-amber-950">{isRtl ? 'الأوسمة والمهام اليومية' : 'Achievements & Quests'}</h4>
                    <p className="text-[9px] text-slate-600">{isRtl ? 'شارات الإتقان وXP والمهام' : 'Badges, XP & streak'}</p>
                  </div>
                </div>

                {/* 3. Printable Worksheet Generator (#6) */}
                <div 
                  onClick={() => setIsWorksheetModalOpen(true)}
                  className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-300 p-3 rounded-2xl cursor-pointer active:scale-95 transition-all flex flex-col justify-between gap-2 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">📄</span>
                    <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-blue-600 text-white">
                      PDF
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-blue-950">{isRtl ? 'توليد ورقة عمل PDF' : 'Printable Worksheet'}</h4>
                    <p className="text-[9px] text-slate-600">{isRtl ? 'واجبات واختبار الدرس للطباعة' : 'Print homework & quiz'}</p>
                  </div>
                </div>

                {/* 4. AI Voice Coach (#2) */}
                <div 
                  onClick={() => setIsVoiceCoachModalOpen(true)}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 p-3 rounded-2xl cursor-pointer active:scale-95 transition-all flex flex-col justify-between gap-2 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">🗣️</span>
                    <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-purple-600 text-white">
                      {isRtl ? 'صوتي' : 'Voice'}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-purple-950">{isRtl ? 'مدرب النطق الصوتي' : 'AI Speech Coach'}</h4>
                    <p className="text-[9px] text-slate-600">{isRtl ? 'تحسين مخارج الحروف والطلاقة' : 'Pronunciation & confidence'}</p>
                  </div>
                </div>

                {/* 5. Interactive Speed Drills (#3) */}
                <div 
                  onClick={() => setIsSpeedDrillModalOpen(true)}
                  className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-300 p-3 rounded-2xl cursor-pointer active:scale-95 transition-all flex flex-col justify-between gap-2 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">⚡</span>
                    <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-amber-500 text-slate-950">
                      {isRtl ? 'سباق' : 'Drills'}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-amber-950">{isRtl ? 'تحديات السرعة المصغرة' : 'Speed Drills'}</h4>
                    <p className="text-[9px] text-slate-600">{isRtl ? 'تركيب جمل وصيد أخطاء' : 'Sentence builder vs time'}</p>
                  </div>
                </div>

                {/* 6. Parent & Mentor Insights (#4) */}
                <div 
                  onClick={() => setIsParentInsightsModalOpen(true)}
                  className="col-span-2 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300 p-3 rounded-2xl cursor-pointer active:scale-95 transition-all flex items-center justify-between gap-2 shadow-2xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl p-1.5 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">📊</span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-black text-emerald-950">{isRtl ? 'تحليلات ورؤى أولياء الأمور' : 'Parent & Mentor Insights'}</h4>
                        <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-emerald-600 text-white">CEFR</span>
                      </div>
                      <p className="text-[10px] text-slate-600 font-medium">{isRtl ? 'ملخص أسبوعي، مؤشر الطلاقة، وبطاقة التقرير' : 'Weekly digest, fluency meter & report card'}</p>
                    </div>
                  </div>
                  <span className="text-sm font-black text-emerald-700">➔</span>
                </div>

                {/* 7. Smart Adaptive Memory */}
                <div 
                  onClick={() => setIsAdaptiveMemoryModalOpen(true)}
                  className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 p-3 rounded-2xl cursor-pointer active:scale-95 transition-all flex flex-col justify-between gap-2 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">🧠</span>
                    <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-indigo-600 text-white">
                      {isRtl ? 'ذاكرة' : 'Memory'}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-indigo-950">{isRtl ? 'ذاكرة سارة وملف التعلم' : 'Smart Memory'}</h4>
                    <p className="text-[9px] text-slate-600">{isRtl ? 'أسلوب التعلم ونقاط القوة' : 'Cognitive learning profile'}</p>
                  </div>
                </div>

                {/* 8. Speech Lab */}
                <div 
                  onClick={() => {
                    setPhoneticTargetSentence(activeBoard?.sentence || 'Welcome to Basim Al-Khalil Digital Academy');
                    setIsPhoneticModalOpen(true);
                  }}
                  className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 p-3 rounded-2xl cursor-pointer active:scale-95 transition-all flex flex-col justify-between gap-2 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">🎙️</span>
                    <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-purple-600 text-white">{isRtl ? 'فوري' : "Instant"}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-purple-950">{isRtl ? 'مختبر مخارج النطق' : 'Speech Lab'}</h4>
                    <p className="text-[9px] text-slate-600">{isRtl ? 'تصحيح ومقارنة نطقك الصوتي' : 'Real-time AI voice evaluation'}</p>
                  </div>
                </div>

                {/* 9. Error Notebook */}
                <div 
                  onClick={() => setIsNotebookModalOpen(true)}
                  className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 p-3 rounded-2xl cursor-pointer active:scale-95 transition-all flex flex-col justify-between gap-2 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">📓</span>
                    {tutorMemory.frequentMistakes && tutorMemory.frequentMistakes.length > 0 && (
                      <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-rose-500 text-white">
                        {tutorMemory.frequentMistakes.length} {isRtl ? 'أخطاء' : 'errors'}
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[#855B14]">{isRtl ? 'دفتر الأخطاء والتقرير' : 'Error Notebook'}</h4>
                    <p className="text-[9px] text-slate-600">{isRtl ? 'مفردات وملاحظات الحصص' : 'Mistakes & personal notes'}</p>
                  </div>
                </div>

                {/* 10. Placement Test */}
                <div 
                  onClick={() => startPlacementTest()}
                  className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 p-3 rounded-2xl cursor-pointer active:scale-95 transition-all flex flex-col justify-between gap-2 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">🎯</span>
                    <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-blue-600 text-white">{isRtl ? 'معتمد' : "Certified"}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[#002147]">{isRtl ? 'تحديد المستوى الشامل' : 'Placement Test'}</h4>
                    <p className="text-[9px] text-slate-600">{isRtl ? 'محادثة + 5 أسئلة + سبلنغ' : 'Speaking + quiz + spelling'}</p>
                  </div>
                </div>

                {/* 11. Sara 3D Character */}
                <div 
                  onClick={() => setIsSara3DOpen(!isSara3DOpen)}
                  className={`border-2 p-3 rounded-2xl cursor-pointer active:scale-95 transition-all flex flex-col justify-between gap-2 shadow-2xs ${
                    isSara3DOpen ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-300/40' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">👩‍🏫</span>
                    <span className={`text-[9px] font-black px-1.5 py-0.2 rounded ${isSara3DOpen ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                      {isSara3DOpen ? (isRtl ? 'نشطة' : 'ON') : (isRtl ? 'معطلة' : 'OFF')}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900">{isRtl ? 'سارة 3D التفاعلية' : 'Sara 3D Character'}</h4>
                    <p className="text-[9px] text-slate-600">{isRtl ? 'شخصية عائمة مرافقة' : 'Interactive companion'}</p>
                  </div>
                </div>
              </div>

              {/* Speed Controller Row */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-xs font-black text-[#002147] flex items-center gap-1">
                  <span>⚡</span>
                  <span>{isRtl ? 'سرعة صوت سارة:' : 'Sara Speed:'}</span>
                </span>
                <div className="flex items-center gap-1">
                  {[
                    { r: 0.8, l: '🐢 0.8x' },
                    { r: 1.0, l: '⚡ 1.0x' },
                    { r: 1.2, l: '🚀 1.2x' }
                  ].map(sp => (
                    <button
                      key={`mob-sp-lab-${sp.r}`}
                      onClick={() => setSaraSpeechRate(sp.r)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        saraSpeechRate === sp.r ? 'bg-[#002147] text-amber-300 shadow-xs' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {sp.l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Archive Row */}
              <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => setShowArchiveConfirm(true)}
                  className="flex-1 py-2 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
                >
                  <Archive size={13} />
                  <span>{isRtl ? 'أرشفة الجلسة الحالية' : 'Archive Session'}</span>
                </button>
                <button
                  onClick={() => {
                    fetchArchivedSessions();
                    setIsArchiveModalOpen(true);
                  }}
                  className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
                >
                  <History size={13} />
                  <span>{isRtl ? 'استعراض الأرشيف' : 'View Archive'}</span>
                </button>
              </div>

              <button
                onClick={() => { setMobileTab('chat'); openChatView(); }}
                className="w-full py-2.5 bg-[#002147] text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md active:scale-95 mt-1"
              >
                <span>💬</span>
                <span>{isRtl ? 'العودة للمحادثة مع سارة' : 'Back to Chat with Sara'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 2B. CHAT HISTORY CONTAINER */}
        {/* ======================================================== */}
        {/* 💬 Dedicated full-screen chat view (opened from «تكلّم مع سارة» or anything that talks to Sara). */}
        <div data-testid="sara-chat-view" role="dialog" aria-modal={chatViewOpen} aria-label={isRtl ? 'المحادثة مع سارة' : 'Chat with Sara'}
          className={chatViewOpen ? 'fixed inset-0 z-[45] bg-[#F8FAFC] flex flex-col' : 'hidden'}>
          <div className="shrink-0 bg-gradient-to-l from-[#001a38] via-[#002147] to-[#0a2d5c] border-b-2 border-[#C49E3A]/70 shadow-md">
            <div className="max-w-4xl mx-auto w-full px-3 sm:px-5 py-2.5 flex items-center gap-3">
              <button type="button" onClick={closeChatView} data-testid="close-sara-chat"
                className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black text-[12.5px] px-3 py-2 cursor-pointer active:scale-95 transition-all">
                {isRtl ? <ArrowRight size={15} /> : <ArrowLeft size={15} />}<span>{isRtl ? 'صفحة سارة' : "Sara's page"}</span>
              </button>
              <img src="/tutors/sara.webp" alt="" width={36} height={36} className="w-9 h-9 rounded-full object-cover border-2 border-[#C49E3A] bg-[#001a38]" />
              <div className="min-w-0">
                <div className="text-[15px] font-black text-[#E8C766] leading-tight">{isRtl ? 'المحادثة مع سارة' : 'Chat with Sara'}</div>
                <div className="text-[11px] font-bold text-white/70 truncate">{loading ? (isRtl ? 'سارة تكتب…' : 'Sara is typing…') : (isRtl ? 'معلمتك الخليجية الذكية' : 'Your smart Gulf tutor')}</div>
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-0 max-w-4xl w-full mx-auto px-3 sm:px-5 pt-3 flex flex-col gap-3">
        <div data-testid="sara-chat-panel" className="flex-1 min-h-0 bg-white border-2 border-slate-200 rounded-3xl p-3 sm:p-5 overflow-y-auto overscroll-contain space-y-3.5 shadow-sm">
          {/* Active Placement Test Step Indicator */}
          

          {sortByTime(messages).map((msg) => {
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

                  {isSara && msg.notice === 'auth' && (
                    <button
                      onClick={() => handleChatSignIn(msg)}
                      disabled={isChatSigningIn}
                      className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#002147] hover:bg-[#0a2d5c] text-white font-black text-xs shadow-sm border border-[#C49E3A] transition-all cursor-pointer active:scale-95 disabled:opacity-60"
                    >
                      <span>🔐</span>
                      <span>{isChatSigningIn ? (isRtl ? 'جارٍ تسجيل الدخول...' : 'Signing in...') : (isRtl ? 'سجّل الدخول عبر Google' : 'Sign in with Google')}</span>
                    </button>
                  )}
                  {isSara && msg.notice === 'retry' && msg.retryText && (
                    <button
                      onClick={() => handleRetryNotice(msg)}
                      disabled={loading}
                      className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C49E3A] hover:bg-[#d4b04f] text-[#002147] font-black text-xs shadow-sm transition-all cursor-pointer active:scale-95 disabled:opacity-60"
                    >
                      <span>↻</span>
                      <span>{isRtl ? 'أعد المحاولة' : 'Retry'}</span>
                    </button>
                  )}

                  {/* 📐 Smart Whiteboard Card inside Message Bubble */}
                  {false && isSara && msg.board && (
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

                      {/* Interactive Shortcuts for Lesson Navigation */}
                      <div className="flex items-center gap-1.5 pt-2 mt-2 border-t border-amber-200/80 flex-wrap">
                        <button
                          onClick={() => {
                            if (msg.board) setActiveBoard(msg.board);
                            setIsWhiteboardOpen(true);
                            setCurrentWhiteboardPageIndex(prev => prev < 6 ? prev + 1 : 0);
                          }}
                          className="px-2.5 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[11px] shadow-2xs flex items-center gap-1 cursor-pointer active:scale-95"
                        >
                          <span>📄</span>
                          <span>{isRtl ? 'اقلب الصفحة واشرحي ➔' : 'Turn Page ➔'}</span>
                        </button>

                        <button
                          onClick={() => {
                            if (msg.board) setActiveBoard(msg.board);
                            setIsWhiteboardOpen(true);
                            setCurrentWhiteboardPageIndex(4);
                          }}
                          className="px-2.5 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-[11px] shadow-2xs flex items-center gap-1 cursor-pointer active:scale-95"
                        >
                          <span>✍️</span>
                          <span>{isRtl ? 'التمارين التطبيقية' : 'Exercises'}</span>
                        </button>

                        <button
                          onClick={() => {
                            if (msg.board) setActiveBoard(msg.board);
                            setIsWhiteboardOpen(true);
                            setCurrentWhiteboardPageIndex(6);
                          }}
                          className="px-2.5 py-1 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-[11px] shadow-2xs flex items-center gap-1 cursor-pointer active:scale-95"
                        >
                          <span>🎯</span>
                          <span>{isRtl ? 'امتحان الإتقان' : 'Mastery Exam'}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Actions to open an existing academy section */}
                  {false && isSara && msg.actions && msg.actions.length > 0 && (
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
            

            {/* Stage 2: 5-Question Diagnostic Quiz Card */}
            

            {/* Stage 3: Mini Spelling Card */}
            

            {/* Stage 4: Official Certificate & Linked Curricula Card */}
            
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
        <div data-testid="sara-input-bar" className="shrink-0 bg-[#F8FAFC] pt-1 pb-3 pb-safe space-y-2">
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

          {/* Quick Suggestion & Interactive Tools Toolbar (Circular Neat Dock with Hover Tooltips) */}
          <div className="hidden lg:flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 text-[11px] font-bold text-slate-600 no-scrollbar items-center">
            <span className="text-slate-400 shrink-0 text-[10px] hidden sm:inline">{isRtl ? 'أدوات سارة السريعة:' : 'Quick Tools:'}</span>

            {/* 1. 📚 SARA'S CURRICULUMS (Circular with Tooltip) */}
            <div className="relative group/toolchip shrink-0">
              <button
                onClick={() => handleOpenCurriculum('all')}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-amber-400 bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-300 hover:from-amber-300 hover:to-yellow-200 text-slate-950 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-110 active:scale-95 shrink-0 ring-1 ring-amber-300/60 relative"
                aria-label={isRtl ? 'مناهج سارة' : "Sara's Curriculums"}
              >
                <span className="text-sm sm:text-base">📚</span>
              </button>
              <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 opacity-0 group-hover/toolchip:opacity-100 translate-y-1 group-hover/toolchip:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-950/95 backdrop-blur-md text-amber-300 text-xs font-black shadow-xl border border-amber-400/40 flex items-center gap-1.5">
                <span>📚</span>
                <span>{isRtl ? 'مناهج سارة 📚' : "Sara's Curriculum 📚"}</span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-950 rotate-45 border-b border-r border-amber-400/40" />
              </div>
            </div>

            {/* 2. 📞 LIVE PHONE CALL WITH SARA (#7) */}
            <div className="relative group/toolchip shrink-0">
              <button
                onClick={() => setIsPhoneCallModalOpen(true)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-teal-400 bg-gradient-to-tr from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-110 active:scale-95 shrink-0 ring-1 ring-teal-300/40 animate-pulse"
                aria-label={isRtl ? 'مكالمة هاتفية مع سارة' : 'Call Sara'}
              >
                <Phone size={15} />
              </button>
              <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 opacity-0 group-hover/toolchip:opacity-100 translate-y-1 group-hover/toolchip:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-950/95 backdrop-blur-md text-teal-300 text-xs font-black shadow-xl border border-teal-400/40 flex items-center gap-1.5">
                <span>📞</span>
                <span>{isRtl ? 'مكالمة هاتفية حية ومباشرة مع سارة 📞' : 'Live Phone Call with Sara 📞'}</span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-950 rotate-45 border-b border-r border-teal-400/40" />
              </div>
            </div>

            {/* 3. 🗣️ VOICE COACH (#2) */}
            <div className="relative group/toolchip shrink-0">
              <button
                onClick={() => setIsVoiceCoachModalOpen(true)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-purple-300 bg-gradient-to-tr from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 text-purple-900 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-110 active:scale-95 shrink-0"
                aria-label={isRtl ? 'مدرب النطق الصوتي' : 'Voice Coach'}
              >
                <span className="text-xs sm:text-sm">🗣️</span>
              </button>
              <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 opacity-0 group-hover/toolchip:opacity-100 translate-y-1 group-hover/toolchip:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-950/95 backdrop-blur-md text-purple-300 text-xs font-black shadow-xl border border-purple-400/40 flex items-center gap-1.5">
                <span>🗣️</span>
                <span>{isRtl ? 'مدرب النطق الصوتي التفاعلي الذكي 🎙️' : 'AI Speech Coach & Pronunciation 🎙️'}</span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-950 rotate-45 border-b border-r border-purple-400/40" />
              </div>
            </div>

            {/* 4. ⚡ SPEED DRILLS (#3) */}
            <div className="relative group/toolchip shrink-0">
              <button
                onClick={() => setIsSpeedDrillModalOpen(true)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-amber-300 bg-gradient-to-tr from-amber-50 to-yellow-50 hover:from-amber-100 hover:to-yellow-100 text-amber-900 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-110 active:scale-95 shrink-0"
                aria-label={isRtl ? 'تحديات السرعة' : 'Speed Drills'}
              >
                <Zap size={15} className="text-amber-600 animate-pulse" />
              </button>
              <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 opacity-0 group-hover/toolchip:opacity-100 translate-y-1 group-hover/toolchip:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-950/95 backdrop-blur-md text-amber-300 text-xs font-black shadow-xl border border-amber-400/40 flex items-center gap-1.5">
                <span>⚡</span>
                <span>{isRtl ? 'تحديات السرعة المصغرة ضد الوقت ⚡' : 'Speed Drills & Micro-Challenges ⚡'}</span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-950 rotate-45 border-b border-r border-amber-400/40" />
              </div>
            </div>

            {/* 5. 🏆 ACHIEVEMENTS & QUESTS (#5) */}
            <div className="relative group/toolchip shrink-0">
              <button
                onClick={() => setIsAchievementsModalOpen(true)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-amber-300 bg-gradient-to-tr from-amber-50 to-yellow-100 hover:from-amber-100 hover:to-yellow-200 text-amber-900 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-110 active:scale-95 shrink-0"
                aria-label={isRtl ? 'الإنجازات والمهام' : 'Achievements'}
              >
                <Trophy size={15} className="text-amber-600" />
              </button>
              <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 opacity-0 group-hover/toolchip:opacity-100 translate-y-1 group-hover/toolchip:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-950/95 backdrop-blur-md text-amber-300 text-xs font-black shadow-xl border border-amber-400/40 flex items-center gap-1.5">
                <span>🏆</span>
                <span>{isRtl ? 'منصة الأوسمة والمهام اليومية وجوائز الإتقان 🏆' : 'Achievements & Daily Quests 🏆'}</span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-950 rotate-45 border-b border-r border-amber-400/40" />
              </div>
            </div>

            {/* 6. 📄 PRINTABLE WORKSHEET (#6) */}
            <div className="relative group/toolchip shrink-0">
              <button
                onClick={() => setIsWorksheetModalOpen(true)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-blue-300 bg-gradient-to-tr from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-900 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-110 active:scale-95 shrink-0"
                aria-label={isRtl ? 'ورقة عمل PDF' : 'Worksheet PDF'}
              >
                <FileText size={15} className="text-blue-600" />
              </button>
              <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 opacity-0 group-hover/toolchip:opacity-100 translate-y-1 group-hover/toolchip:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-950/95 backdrop-blur-md text-blue-300 text-xs font-black shadow-xl border border-blue-400/40 flex items-center gap-1.5">
                <span>📄</span>
                <span>{isRtl ? 'توليد ورقة عمل قابلة للطباعة وتصدير PDF 📄' : 'Printable Worksheet & PDF 📄'}</span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-950 rotate-45 border-b border-r border-blue-400/40" />
              </div>
            </div>

            {/* 7. 📊 PARENT INSIGHTS (#4) */}
            <div className="relative group/toolchip shrink-0">
              <button
                onClick={() => setIsParentInsightsModalOpen(true)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-emerald-300 bg-gradient-to-tr from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 text-emerald-900 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-110 active:scale-95 shrink-0"
                aria-label={isRtl ? 'تقرير ولي الأمر' : 'Parent Report'}
              >
                <Award size={15} className="text-emerald-600" />
              </button>
              <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 opacity-0 group-hover/toolchip:opacity-100 translate-y-1 group-hover/toolchip:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-950/95 backdrop-blur-md text-emerald-300 text-xs font-black shadow-xl border border-emerald-400/40 flex items-center gap-1.5">
                <span>📊</span>
                <span>{isRtl ? 'تحليلات ورؤى أولياء الأمور CEFR 📊' : 'Parent & Mentor Insights 📊'}</span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-950 rotate-45 border-b border-r border-emerald-400/40" />
              </div>
            </div>

            {/* 8. 🧠 SMART MEMORY */}
            <div className="relative group/toolchip shrink-0">
              <button
                onClick={() => setIsAdaptiveMemoryModalOpen(true)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-indigo-300 bg-gradient-to-tr from-indigo-50 via-purple-50 to-indigo-50 hover:from-indigo-100 text-indigo-900 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-110 active:scale-95 shrink-0"
                aria-label={isRtl ? 'ذاكرة سارة' : 'Smart Memory'}
              >
                <Brain size={15} className="text-indigo-600" />
              </button>
              <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 opacity-0 group-hover/toolchip:opacity-100 translate-y-1 group-hover/toolchip:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-950/95 backdrop-blur-md text-indigo-300 text-xs font-black shadow-xl border border-indigo-400/40 flex items-center gap-1.5">
                <span>🧠</span>
                <span>{isRtl ? 'ذاكرة سارة الذكية وملف التعلم المعرفي 🧠' : "Sara's Smart Memory & Profile 🧠"}</span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-950 rotate-45 border-b border-r border-indigo-400/40" />
              </div>
            </div>

            {/* 9. ✨ WHITEBOARD EXPLAIN */}
            <div className="relative group/toolchip shrink-0">
              <button
                onClick={() => {
                  if (!activeBoard) {
                    openWhiteboardModal();
                  } else {
                    setIsWhiteboardOpen(true);
                  }
                  handleSendMessage(isRtl ? 'سارة، اشرحي لي الدرس على السبورة الذكية بالصوت بالتفصيل 📐🎙️' : 'Sara, please explain this lesson on the smart whiteboard with voice 📐🎙️');
                }}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-amber-300 bg-gradient-to-tr from-amber-50 to-yellow-100 hover:from-amber-100 text-amber-950 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-110 active:scale-95 shrink-0"
                aria-label={isRtl ? 'السبورة التفاعلية' : 'Smart Board'}
              >
                <Sparkles size={15} className="text-[#C49E3A]" />
              </button>
              <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 opacity-0 group-hover/toolchip:opacity-100 translate-y-1 group-hover/toolchip:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-950/95 backdrop-blur-md text-amber-300 text-xs font-black shadow-xl border border-amber-400/40 flex items-center gap-1.5">
                <span>📐</span>
                <span>{isRtl ? 'اشرحي لي على السبورة الذكية بالصوت 📐🎙️' : 'Explain on Smart Whiteboard 📐🎙️'}</span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-950 rotate-45 border-b border-r border-amber-400/40" />
              </div>
            </div>

            {/* 10. 🎯 PLACEMENT TEST */}
            <div className="relative group/toolchip shrink-0">
              <button
                onClick={startPlacementTest}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-110 active:scale-95 shrink-0 ${
                  placementState.isActive
                    ? 'bg-[#002147] text-amber-300 border-amber-400 ring-1 ring-amber-300 animate-pulse'
                    : 'bg-gradient-to-tr from-blue-50 to-indigo-50 border-blue-300 text-blue-900 hover:from-blue-100'
                }`}
                aria-label={isRtl ? 'تحديد المستوى' : 'Placement Test'}
              >
                <Target size={15} className={placementState.isActive ? 'text-amber-300' : 'text-blue-600'} />
              </button>
              <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 opacity-0 group-hover/toolchip:opacity-100 translate-y-1 group-hover/toolchip:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-950/95 backdrop-blur-md text-blue-300 text-xs font-black shadow-xl border border-blue-400/40 flex items-center gap-1.5">
                <span>🎯</span>
                <span>{isRtl ? 'اختبار تحديد المستوى الشامل المعتمد 🎯' : 'Placement Test & CEFR Diagnostic 🎯'}</span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-950 rotate-45 border-b border-r border-blue-400/40" />
              </div>
            </div>

            {/* 11. 🗓️ SMART STUDY PLAN */}
            <div className="relative group/toolchip shrink-0">
              <button
                onClick={() => setIsSmartPlanGeneratorOpen(true)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-indigo-400 bg-gradient-to-tr from-indigo-500 to-blue-600 hover:from-indigo-400 hover:to-blue-500 text-white flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-110 active:scale-95 shrink-0"
                aria-label={isRtl ? 'خطة دراسية ذكية' : 'Smart Plan'}
              >
                <Sparkles size={14} className="text-amber-300 animate-pulse" />
              </button>
              <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 opacity-0 group-hover/toolchip:opacity-100 translate-y-1 group-hover/toolchip:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-950/95 backdrop-blur-md text-amber-300 text-xs font-black shadow-xl border border-indigo-400/40 flex items-center gap-1.5">
                <span>🗓️</span>
                <span>{isRtl ? 'توليد خطة دراسية ذكية مخصصة مع سارة ⚡' : 'Generate Smart Study Plan ⚡'}</span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-950 rotate-45 border-b border-r border-indigo-400/40" />
              </div>
            </div>

            {/* 12. 🎮 12Y ADVENTURES */}
            <div className="relative group/toolchip shrink-0">
              <button
                onClick={() => setIsRolePlayModalOpen(true)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-indigo-300 bg-gradient-to-tr from-indigo-50 via-purple-50 to-blue-50 hover:from-indigo-100 text-[#002147] flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-110 active:scale-95 shrink-0"
                aria-label={isRtl ? 'مغامرات 12 سنة' : '12Y Adventures'}
              >
                <Gamepad2 size={15} className="text-indigo-600" />
              </button>
              <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 opacity-0 group-hover/toolchip:opacity-100 translate-y-1 group-hover/toolchip:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-950/95 backdrop-blur-md text-purple-300 text-xs font-black shadow-xl border border-purple-400/40 flex items-center gap-1.5">
                <span>🎮</span>
                <span>{isRtl ? 'سيناريوهات ومغامرات سن 12 سنة 🎮' : '12Y Role-Play & Adventures 🎮'}</span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-950 rotate-45 border-b border-r border-purple-400/40" />
              </div>
            </div>

            {/* 13. 🎙️ LIVE VOICE TOGGLE */}
            <div className="relative group/toolchip shrink-0">
              <button
                onClick={toggleLiveVoiceMode}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-110 active:scale-95 shrink-0 ${
                  isLiveMode 
                    ? 'bg-rose-500 border-rose-600 text-white animate-pulse' 
                    : 'bg-emerald-50 border-emerald-300 hover:bg-emerald-100 text-emerald-800'
                }`}
                aria-label={isRtl ? 'محادثة صوتية لايف' : 'Live Voice Mode'}
              >
                <Radio size={14} className={isLiveMode ? 'animate-spin' : ''} />
              </button>
              <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 opacity-0 group-hover/toolchip:opacity-100 translate-y-1 group-hover/toolchip:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-950/95 backdrop-blur-md text-emerald-300 text-xs font-black shadow-xl border border-emerald-400/40 flex items-center gap-1.5">
                <span>🎙️</span>
                <span>{isLiveMode ? (isRtl ? 'إيقاف محادثة اللايف ⏹️' : 'Stop Live Mode ⏹️') : (isRtl ? 'بدء محادثة صوتية لايف (رد برد) 🎙️' : 'Start Live Voice Chat 🎙️')}</span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-950 rotate-45 border-b border-r border-emerald-400/40" />
              </div>
            </div>

            {/* 14. 🌐 LANGUAGE TOGGLE */}
            <div className="relative group/toolchip shrink-0">
              <button
                onClick={() => handleToggleLanguage()}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-slate-300 bg-slate-100 hover:bg-slate-200 text-[#002147] flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-110 active:scale-95 shrink-0 font-black text-xs"
                aria-label="Toggle Language"
              >
                <span>{activeLang === 'ar' ? '🇬🇧' : '🇸🇦'}</span>
              </button>
              <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 opacity-0 group-hover/toolchip:opacity-100 translate-y-1 group-hover/toolchip:translate-y-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-950/95 backdrop-blur-md text-white text-xs font-black shadow-xl border border-slate-700/80 flex items-center gap-1.5">
                <span>🌐</span>
                <span>{activeLang === 'ar' ? 'التبديل إلى English 🇬🇧' : 'التبديل إلى العربية 🇸🇦'}</span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-950 rotate-45 border-b border-r border-slate-700/80" />
              </div>
            </div>

            {/* Visual separator between circular tools and text prompts */}
            <div className="h-5 w-px bg-slate-300 shrink-0 mx-1" />
            <span className="text-slate-400 shrink-0 text-[10px] hidden sm:inline">{isRtl ? 'أسئلة مقترحة:' : 'Prompts:'}</span>

            {/* Conversational prompt chips */}
            {[
              { ar: 'علميني قاعدة جديدة اليوم 📐', en: 'Teach me a new rule 📐' },
              { ar: 'اختبريني بـ 3 أسئلة سريعة 🎯', en: 'Give me a 3-question quiz 🎯' },
              { ar: 'وش أخطائي اللي لازم أعدلها؟ 🔍', en: 'What mistakes should I fix? 🔍' },
              { ar: 'جاهز أمارس جمل محادثة 🗣️', en: 'Ready to practice conversation 🗣️' }
            ].map((chip, cIdx) => (
              <button
                key={`chip-${cIdx}`}
                onClick={() => handleSendMessage(isRtl ? chip.ar : chip.en)}
                className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-white border border-slate-200 hover:border-[#002147] hover:bg-slate-50 shrink-0 transition-all cursor-pointer shadow-2xs text-[10px] sm:text-xs font-bold whitespace-nowrap"
              >
                {isRtl ? chip.ar : chip.en}
              </button>
            ))}
          </div>
        </div>
          </div>
        </div>
      </main>

      {/* 4. Smart Whiteboard Modal / Chalkboard */}
      <SmartWhiteboard
        isOpen={isWhiteboardOpen}
        onClose={() => setIsWhiteboardOpen(false)}
        boardData={null}
        isRtl={isRtl}
        onSpeak={(txt, onEnd) => playSaraVoice(txt, onEnd)}
        onQuizAnswer={handleQuizOptionClick}
        quizSelectedOption={quizSelectedOption}
        quizFeedback={quizFeedback}
        onFinishLesson={(score, total) => handleCompleteAndSaveLesson(score, total)}
        isLessonActive={!!activeCurriculumLesson}
        onOpenCurriculum={() => handleOpenCurriculum('all')}
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
        dailyLessonInfo={{
          current: currentDailyLessonIndex + 1,
          total: todayScheduledLessons.length,
          hasNext: currentDailyLessonIndex < todayScheduledLessons.length - 1
        }}
      />

      {/* 5. «سارة 3D» tool: the same 3D Sara + engine as the call (free conversation, 10 s reply window, dedupe, review) */}
      {isSara3DOpen && <SaraLivePhoneCallModal isOpen onClose={() => setIsSara3DOpen(false)} studentName={profile.displayName || ''}
        studentLevel={(profile as any).level || tutorMemory.level || 'A1'} isRtl={isRtl} studentId={profile.uid}
        preset={{ ...FREE_CALL_PRESET, titleAr: 'سارة 3D — تكلّم معها', titleEn: 'Sara 3D — talk with her', icon: '👩‍🏫' }} />}

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
                {/* 0. Featured: Sara Specialized Curriculums (Full width) */}
                <button
                  onClick={() => {
                    setShowMobileToolsDrawer(false);
                    handleOpenCurriculum('all');
                  }}
                  className="col-span-2 p-3.5 rounded-2xl border-2 border-amber-400 bg-gradient-to-r from-amber-400/20 via-amber-100 to-amber-400/20 text-[#002147] text-start flex items-center justify-between gap-3 transition-all cursor-pointer shadow-xs active:scale-98"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-2 rounded-xl bg-amber-400 text-slate-950 shadow-xs">📚</span>
                    <div>
                      <div className="text-xs font-black text-[#002147]">{isRtl ? 'مناهج سارة التخصصية 📚' : "Sara's Core Curriculums"}</div>
                      <div className="text-[10px] text-slate-600 font-medium">{isRtl ? 'القواعد، المحادثة، الكتابة، القراءة' : 'Grammar, Speaking, Writing, Reading'}</div>
                    </div>
                  </div>
                  <span className="text-xs font-black text-amber-700">➔</span>
                </button>

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
                    setPhoneticTargetSentence(activeBoard?.sentence || 'Welcome to Basim Al-Khalil Digital Academy');
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

                {/* 5. Smart Adaptive Memory & Learning Profile */}
                <button
                  onClick={() => {
                    setShowMobileToolsDrawer(false);
                    setIsAdaptiveMemoryModalOpen(true);
                  }}
                  className="p-3 rounded-2xl border-2 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 text-indigo-950 hover:bg-indigo-100 text-start flex flex-col justify-between gap-2 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">🧠</span>
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-indigo-600 text-white">
                      {isRtl ? 'تكيفي' : 'Adaptive'}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-black">{isRtl ? 'ذاكرة سارة الذكية 🧠' : 'Smart Memory 🧠'}</div>
                    <div className="text-[10px] text-slate-500 font-medium">{isRtl ? 'أسلوب التعلم ونقاط القوة' : 'Learning style & strengths'}</div>
                  </div>
                </button>

                {/* 5A. Voice Coach & Pronunciation Diagnostics */}
                <button
                  onClick={() => {
                    setShowMobileToolsDrawer(false);
                    setIsVoiceCoachModalOpen(true);
                  }}
                  className="p-3 rounded-2xl border-2 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 text-purple-950 hover:bg-purple-100 text-start flex flex-col justify-between gap-2 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">🎙️</span>
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-purple-600 text-white">
                      {isRtl ? 'صوتي' : 'Voice'}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-black">{isRtl ? 'مدرب النطق الصوتي 🎙️' : 'Voice Coach 🎙️'}</div>
                    <div className="text-[10px] text-slate-500 font-medium">{isRtl ? 'مخارج الحروف ودعم الثقة' : 'Pronunciation & Confidence'}</div>
                  </div>
                </button>

                {/* 5B. Speed Drills */}
                <button
                  onClick={() => {
                    setShowMobileToolsDrawer(false);
                    setIsSpeedDrillModalOpen(true);
                  }}
                  className="p-3 rounded-2xl border-2 bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 text-amber-950 hover:bg-amber-100 text-start flex flex-col justify-between gap-2 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">⚡</span>
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950">
                      {isRtl ? 'سباق' : 'Speed'}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-black">{isRtl ? 'تحديات السرعة ⚡' : 'Speed Drills ⚡'}</div>
                    <div className="text-[10px] text-slate-500 font-medium">{isRtl ? 'تركيب جمل وصيد أخطاء' : 'Sentence builder & bugs'}</div>
                  </div>
                </button>

                {/* 5C. Parent Insights Hub */}
                <button
                  onClick={() => {
                    setShowMobileToolsDrawer(false);
                    setIsParentInsightsModalOpen(true);
                  }}
                  className="p-3 rounded-2xl border-2 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 text-emerald-950 hover:bg-emerald-100 text-start flex flex-col justify-between gap-2 transition-all cursor-pointer col-span-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">📊</span>
                      <div className="text-xs font-black">{isRtl ? 'تحليلات التقدم وتقارير أولياء الأمور 📊' : 'Parent & Mentor Insights 📊'}</div>
                    </div>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                      CEFR {(profile as any).level || tutorMemory.level || 'A1'}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">{isRtl ? 'ملخص أسبوعي موجه للوالدين • مؤشر الطلاقة • بطاقة تقرير رسمي للتصدير' : 'Weekly digest, CEFR meter, official report card'}</div>
                </button>

                {/* 5D. Live Phone Call with Sara (#7) */}
                <button
                  onClick={() => {
                    setShowMobileToolsDrawer(false);
                    setIsPhoneCallModalOpen(true);
                  }}
                  className="p-3 rounded-2xl border-2 bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-300 text-teal-950 hover:bg-teal-100 text-start flex flex-col justify-between gap-2 transition-all cursor-pointer col-span-2 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">📞</span>
                      <div className="text-xs font-black">{isRtl ? 'مكالمة هاتفية حية مع سارة 📞' : 'Live Phone Call with Sara 📞'}</div>
                    </div>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-teal-600 text-white animate-pulse">
                      {isRtl ? 'حر اليدين' : 'Hands-Free'}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    {isRtl ? 'تحدث مع سارة عبر الهاتف مباشرة دون لمس الشاشة في 6 مواقف واقعية' : 'Realistic voice phone conversation in 6 real-world scenarios'}
                  </div>
                </button>

                {/* 5E. Achievements & Quests (#5) */}
                <button
                  onClick={() => {
                    setShowMobileToolsDrawer(false);
                    setIsAchievementsModalOpen(true);
                  }}
                  className="p-3 rounded-2xl border-2 bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 text-amber-950 hover:bg-amber-100 text-start flex flex-col justify-between gap-2 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">🏆</span>
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950">
                      XP
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-black">{isRtl ? 'الأوسمة والمهام 🏆' : 'Achievements 🏆'}</div>
                    <div className="text-[10px] text-slate-500 font-medium">{isRtl ? 'مهام يومية وشارات إتقان' : 'Daily quests & badges'}</div>
                  </div>
                </button>

                {/* 5F. Printable Worksheet (#6) */}
                <button
                  onClick={() => {
                    setShowMobileToolsDrawer(false);
                    setIsWorksheetModalOpen(true);
                  }}
                  className="p-3 rounded-2xl border-2 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 text-blue-950 hover:bg-blue-100 text-start flex flex-col justify-between gap-2 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">📄</span>
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-blue-600 text-white">
                      PDF
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-black">{isRtl ? 'ورقة عمل للطباعة 📄' : 'Printable Worksheet 📄'}</div>
                    <div className="text-[10px] text-slate-500 font-medium">{isRtl ? 'تصدير PDF من الدرس' : 'Export PDF from lesson'}</div>
                  </div>
                </button>

                {/* 6. Sara Independent Fluency Curriculums */}
                <button
                  onClick={() => {
                    setShowMobileToolsDrawer(false);
                    handleOpenCurriculum('all');
                  }}
                  className="p-3.5 rounded-2xl border-2 bg-gradient-to-br from-amber-100/90 to-yellow-50 border-amber-400 text-slate-950 hover:bg-amber-100 text-start flex flex-col justify-between gap-2 transition-all cursor-pointer col-span-2 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl p-1.5 rounded-xl bg-amber-400 text-slate-950 shadow-2xs">📚</span>
                      <div>
                        <div className="text-xs font-black text-[#002147] flex items-center gap-1.5">
                          <span>{isRtl ? 'مناهج سارة التخصصية المستقلة للطلاقة' : "Sara's Independent Fluency Curriculums"}</span>
                          <span className="px-1.5 py-0.2 rounded-full bg-slate-950 text-amber-300 text-[9px] font-black">
                            {isRtl ? 'جديد ✨' : 'NEW'}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-600 font-medium">
                          {isRtl ? '5 مسارات: الأساسيات، القواعد، المحادثة، القراءة، الكتابة' : '5 tracks ready'}
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
                    {isRtl ? 'أكاديمية باسم الخليل للغة الإنجليزية' : 'Basim Al-Khalil Digital Academy'}
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
                    {isRtl ? 'أكاديمية باسم الخليل للغة الإنجليزية • توثيق النتيجة 🎓' : 'Basim Al-Khalil Digital Academy • Recorded Result 🎓'}
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
                      fetchActiveStudyPlan();
                      setIsStudyPlanModalOpen(true);
                    }}
                    className="w-full py-3 bg-[#002147] hover:bg-[#073060] active:scale-98 text-amber-300 rounded-2xl font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-300/40"
                  >
                    <CalendarDays size={16} />
                    <span>{isRtl ? 'متابعة الخطة الدراسية 🗓️' : 'Continue Study Plan 🗓️'}</span>
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

      {/* ======================================================== */}
      {/* 7C. 2-MINUTE REST BREAK SYSTEM MODAL (استراحة دقيقتين وترحيل الدرس وعرض التالي) */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isDailyBreakActive && nextLessonAfterBreak && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-7 shadow-2xl border-4 border-amber-400 relative overflow-hidden text-center"
            >
              {/* Decorative aura glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-amber-300/30 to-teal-300/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-300/30 to-purple-300/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-4">
                {/* Coffee & Meditation Avatar */}
                <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-br from-amber-500 via-amber-400 to-yellow-500 text-slate-950 flex items-center justify-center shadow-xl border-2 border-white ring-4 ring-amber-300/40">
                  <Coffee size={32} className="animate-bounce" />
                </div>

                {/* Header Badge */}
                <div>
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 border border-amber-300">
                    <Sparkles size={13} className="text-amber-600" />
                    <span>{isRtl ? 'استراحة محارب ذكية (دقيقتان) ☕🧘‍♂️' : 'Smart 2-Minute Rest Break ☕🧘‍♂️'}</span>
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#002147] mt-2">
                    {isRtl ? `تم ترحيل الدرس ${currentDailyLessonIndex + 1} بنجاح! خذ نفساً عميقاً` : `Lesson ${currentDailyLessonIndex + 1} Archived! Take a Deep Breath`}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-bold mt-1">
                    {isRtl 
                      ? 'استرح لمدة دقيقتين لتجديد نشاطك وتركيزك، وسنبدأ الدرس التالي تلقائياً فور انتهاء العداد 🌟'
                      : 'Rest for 2 minutes to refresh your focus. The next lesson will start automatically! 🌟'}
                  </p>
                </div>

                {/* Daily Journey Stepper HUD */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3">
                  <div className="flex items-center justify-between text-[11px] font-black text-slate-500 mb-2">
                    <span>{isRtl ? 'خريطة مسار دروس اليوم' : "Today's Lessons Journey"}</span>
                    <span className="text-amber-600 font-black">
                      {isRtl ? `المكتمل: ${currentDailyLessonIndex + 1} من ${todayScheduledLessons.length}` : `Done: ${currentDailyLessonIndex + 1} of ${todayScheduledLessons.length}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2 flex-wrap text-xs">
                    {todayScheduledLessons.map((l, idx) => {
                      const isDone = idx <= currentDailyLessonIndex;
                      const isNext = idx === currentDailyLessonIndex + 1;
                      return (
                        <React.Fragment key={l.id || idx}>
                          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-xl font-black transition-all ${
                            isDone 
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs'
                              : isNext
                                ? 'bg-amber-100 text-amber-900 border-2 border-amber-400 ring-2 ring-amber-300/30 animate-pulse'
                                : 'bg-slate-100 text-slate-400 border border-slate-200'
                          }`}>
                            <span>{isDone ? '✅' : isNext ? '⏳' : '🔒'}</span>
                            <span>{isRtl ? `درس ${idx + 1}` : `Lesson ${idx + 1}`}</span>
                          </div>
                          {idx < todayScheduledLessons.length - 1 && (
                            <span className="text-slate-300 font-bold">➔</span>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>

                {/* Big Circular Countdown Display */}
                <div className="py-2 flex flex-col items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    {/* Breathing animated circle pulse */}
                    <div className="absolute w-32 h-32 rounded-full bg-amber-400/20 animate-ping pointer-events-none" />
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#002147] to-[#093568] border-4 border-amber-400 text-white flex flex-col items-center justify-center shadow-xl">
                      <span className="text-3xl font-black font-mono tracking-tight text-amber-300">
                        {Math.floor(breakSecondsLeft / 60)}:{(breakSecondsLeft % 60).toString().padStart(2, '0')}
                      </span>
                      <span className="text-[10px] text-amber-200 font-bold uppercase mt-0.5">
                        {isBreakTimerRunning ? (isRtl ? 'شهيق ... زفير 🌸' : 'Inhale ... Exhale 🌸') : (isRtl ? 'مؤقت متوقف ⏸️' : 'Paused ⏸️')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Next Lesson Preview Card */}
                <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border-2 border-blue-200 rounded-2xl p-3.5 text-start">
                  <div className="flex items-center gap-1.5 text-blue-900 font-black text-xs mb-1">
                    <BookOpen size={14} className="text-blue-600" />
                    <span>{isRtl ? 'الدرس القادم بعد انتهاء الاستراحة مباشرة:' : 'Up Next Immediately After Break:'}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="font-black text-slate-900 text-sm">
                        {isRtl ? nextLessonAfterBreak.titleAr : nextLessonAfterBreak.titleEn}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        {isRtl ? nextLessonAfterBreak.courseLabelAr : nextLessonAfterBreak.courseLabelEn} • {nextLessonAfterBreak.level}
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-xl bg-blue-600 text-white font-black text-[10px]">
                      {isRtl ? `الدرس ${currentDailyLessonIndex + 2}` : `Lesson ${currentDailyLessonIndex + 2}`}
                    </span>
                  </div>
                </div>

                {/* Quick Wellness Tips Grid */}
                <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-600 font-bold">
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <span className="text-base block mb-0.5">💧</span>
                    <span>{isRtl ? 'اشرب كوب ماء' : 'Drink Water'}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <span className="text-base block mb-0.5">🧘‍♂️</span>
                    <span>{isRtl ? 'خذ نفساً عميقاً' : 'Deep Breaths'}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <span className="text-base block mb-0.5">👀</span>
                    <span>{isRtl ? 'أرح عينيك' : 'Rest Eyes'}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => setIsBreakTimerRunning(prev => !prev)}
                    className="py-3 px-4 rounded-2xl border-2 border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-black text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                    title={isBreakTimerRunning ? 'إيقاف مؤقت للاستراحة' : 'استئناف الاستراحة'}
                  >
                    {isBreakTimerRunning ? <Pause size={14} /> : <Play size={14} />}
                    <span>{isBreakTimerRunning ? (isRtl ? 'إيقاف مؤقت ⏸️' : 'Pause') : (isRtl ? 'استئناف ▶️' : 'Resume')}</span>
                  </button>

                  <button
                    onClick={handleFinishBreakAndStartNextLesson}
                    className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:brightness-105 active:scale-95 text-slate-950 font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ring-2 ring-amber-300/50"
                  >
                    <Zap size={16} className="text-slate-950" />
                    <span>
                      {isRtl
                        ? `تخطي الاستراحة والبدء بالدرس (${currentDailyLessonIndex + 2}) فوراً ⚡`
                        : `Skip Break & Start Lesson (${currentDailyLessonIndex + 2}) Now ⚡`}
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* 7D. ALL DAILY LESSONS COMPLETED CELEBRATION MODAL */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isAllDailyLessonsCompletedModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-4 border-emerald-400 relative overflow-hidden text-center"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-emerald-400/30 to-amber-400/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-teal-400/30 to-blue-400/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-[#002147] via-[#093568] to-[#002147] border-2 border-emerald-400 text-white flex items-center justify-center shadow-xl">
                  <Trophy size={42} className="text-amber-400 animate-bounce" />
                </div>

                <div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 border border-emerald-300">
                    <Sparkles size={13} className="text-emerald-600" />
                    <span>{isRtl ? 'إنجاز اليوم الأكاديمي مكتمل 100% 🌟' : '100% Daily Academic Target Achieved 🌟'}</span>
                  </span>
                  <h3 className="text-2xl font-black text-[#002147] mt-2">
                    {isRtl ? 'مبارك يا بطل! أتممت جميع دروس اليوم 🏆' : 'Congratulations! All Lessons Completed Today 🏆'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-bold mt-1">
                    {isRtl
                      ? `تم ترحيل كافة الدروس (${todayScheduledLessons.length} دروس) وتوثيق نتائجها في ملفك وسجل درجاتك بنجاح!`
                      : `All ${todayScheduledLessons.length} lessons were completed, archived, and recorded successfully!`}
                  </p>
                </div>

                {/* Lessons Completed Summary List */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-start space-y-2">
                  <div className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                    {isRtl ? 'الدروس التي تم إنجازها وترحيلها اليوم:' : 'Lessons Completed & Archived Today:'}
                  </div>
                  {todayScheduledLessons.map((l, i) => (
                    <div key={l.id || i} className="flex items-center justify-between bg-white p-2 rounded-xl border border-slate-100 shadow-2xs text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                        <div>
                          <div className="font-black text-slate-800">{isRtl ? l.titleAr : l.titleEn}</div>
                          <div className="text-[10px] text-slate-500">{isRtl ? l.courseLabelAr : l.courseLabelEn}</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-black text-[10px]">
                        {isRtl ? 'تم الترحيل والأرشفة ✅' : 'Archived ✅'}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => {
                      setIsAllDailyLessonsCompletedModalOpen(false);
                      fetchActiveStudyPlan();
                      setIsStudyPlanModalOpen(true);
                    }}
                    className="flex-1 py-3 px-4 rounded-2xl bg-[#002147] hover:bg-[#073060] text-amber-300 font-black text-xs sm:text-sm transition-all shadow-md cursor-pointer border border-amber-300/40"
                  >
                    <span>{isRtl ? 'عرض الخطة الدراسية 🗓️' : 'View Study Plan 🗓️'}</span>
                  </button>

                  <button
                    onClick={() => setIsAllDailyLessonsCompletedModalOpen(false)}
                    className="py-3 px-4 rounded-2xl border-2 border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-black text-xs transition-all cursor-pointer"
                  >
                    <span>{isRtl ? 'إغلاق ومتابعة' : 'Close'}</span>
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
        onOpenAdaptiveMemory={() => setIsAdaptiveMemoryModalOpen(true)}
      />

      {/* 11. Sara Adaptive Memory & Cognitive Profile Modal */}
      <SaraAdaptiveMemoryModal
        isOpen={isAdaptiveMemoryModalOpen}
        onClose={() => setIsAdaptiveMemoryModalOpen(false)}
        tutorMemory={tutorMemory}
        studentName={profile.displayName || ''}
        studentLevel={(profile as any).level || tutorMemory.level || 'A1'}
        isRtl={isRtl}
        onUpdateLearningStyle={handleUpdateLearningStyle}
        onClearMemory={handleClearMemory}
        onPracticeTopic={(topicPrompt) => {
          handleSendMessage(topicPrompt);
        }}
        onPracticeMistake={(mistakePrompt) => {
          const prompt = isRtl
            ? `سارة، أود أن نتدرب معاً على هذه النقطة اللغوية لأتقنها تماماً: "${mistakePrompt}". اشرحيها لي بنمطك الذكي واطرحي علي سؤالاً تطبيقياً!`
            : `Sara, let's practice this specific grammar point so I master it completely: "${mistakePrompt}". Explain it and give me a practice challenge!`;
          handleSendMessage(prompt);
        }}
      />



      {/* 11D. Sara Parent & Mentor Insights Hub Modal */}
      <SaraParentInsightsModal
        isOpen={isParentInsightsModalOpen}
        onClose={() => setIsParentInsightsModalOpen(false)}
        tutorMemory={tutorMemory}
        studentName={profile.displayName || ''}
        studentLevel={(profile as any).level || tutorMemory.level || 'A1'}
        studentStreak={streak.current || 1}
        isRtl={isRtl}
        studentUid={profile.uid}
      />

      {/* 11E. Sara Achievements, Quests & Trophy Hub Modal (#5) */}
      <SaraAchievementsModal
        isOpen={isAchievementsModalOpen}
        onClose={() => setIsAchievementsModalOpen(false)}
        tutorMemory={tutorMemory}
        studentName={profile.displayName || ''}
        studentLevel={(profile as any).level || tutorMemory.level || 'A1'}
        studentStreak={streak.current || 1}
        totalXP={(streak as any).totalXP || 100}
        isRtl={isRtl}
        onClaimQuestXP={(xp, questId) => {
          setStreak(prev => ({
            ...prev,
            totalXP: (prev as any).totalXP ? (prev as any).totalXP + xp : xp
          }));
          syncMemoryToFirestore({ newNotes: [`Claimed quest reward +${xp} XP (${questId})`] }, false, 'Quest Reward');
        }}
      />


      {/* Free open conversation (no targets, no scoring) */}
      {isFreeChatOpen && <SaraLivePhoneCallModal isOpen onClose={() => setIsFreeChatOpen(false)} studentName={profile.displayName || ''}
        studentLevel={(profile as any).level || tutorMemory.level || 'A1'} isRtl={isRtl} studentId={profile.uid} preset={FREE_CALL_PRESET} dailyTopic />}
      {/* 11G. Sara Live Interactive Hands-Free Phone Call Modal (#7) */}
      <SaraLivePhoneCallModal
        isOpen={isPhoneCallModalOpen}
        onClose={() => setIsPhoneCallModalOpen(false)}
        studentName={profile.displayName || ''}
        studentLevel={(profile as any).level || tutorMemory.level || 'A1'}
        isRtl={isRtl}
        studentId={profile.uid}
        lessonTitle={activeCurriculumLesson ? (activeCurriculumLesson.titleEn || activeCurriculumLesson.titleAr) : undefined}
        recentMistakes={tutorMemory.frequentMistakes}
        preset={FREE_CALL_PRESET}
        dailyTopic={true}
        onSuccessXP={(xp) => {
          setStreak(prev => ({
            ...prev,
            totalXP: (prev as any).totalXP ? (prev as any).totalXP + xp : xp
          }));
        }}
        onSaveCallSummary={(summary) => {
          syncMemoryToFirestore({ newNotes: [summary] }, false, 'Live Phone Call');
        }}
        onSendTranscriptToChat={(transcript) => {
          if (transcript.length === 0) return;
          const phoneDebrief = isRtl
            ? `📞 ملخص المكالمة الهاتفية الحية مع سارة (${transcript.length} جولات تبادلية). تم تسجيل الأداء بنجاح في سجل الطالب.`
            : `📞 Live phone call completed with Sara (${transcript.length} turns). Performance recorded successfully.`;
          const saraMsg: MessageItem = {
            id: `msg_sara_call_${Date.now()}`,
            role: 'sara',
            text: phoneDebrief,
            timestamp: Date.now()
          };
          setMessages(prev => [...prev, saraMsg]);
        }}
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

      <SaraTools tool={saraTool} onClose={() => { cancelAllSpeech(); setSaraTool(null); }} uid={profile.uid}
        onOpenTrack={id => { const m: Record<string, string> = { foundations: 'grammar', advanced_v2: 'grammar', conversation_v2: 'conversation', reading_v2: 'reading', writing_v2: 'writing', listening: 'listening', pronunciation: 'pronunciation', vocabulary: 'vocabulary', daily: 'daily' };
          if (id === 'exam-prep') setIsExamOpen(true); else handleOpenCurriculum(m[id] || 'all'); }}
        unlockAll={MASTER_ADMINS.includes(String((profile as any).email || auth.currentUser?.email || '').trim().toLowerCase()) || (profile as any).role === UserRole.PARENT || (profile as any).role === UserRole.ADMIN} />
      <SaraExamPrep isOpen={isExamOpen} onClose={() => { cancelAllSpeech(); setIsExamOpen(false); }} uid={profile.uid} />
      <SaraDailyPlayer isOpen={isDailyOpen} onClose={() => { cancelAllSpeech(); setIsDailyOpen(false); }} uid={profile.uid}
        unlockAll={MASTER_ADMINS.includes(String((profile as any).email || auth.currentUser?.email || '').trim().toLowerCase()) || (profile as any).role === UserRole.PARENT || (profile as any).role === UserRole.ADMIN} />
      <SaraVocabPlayer isOpen={isVocabOpen} onClose={() => { cancelAllSpeech(); setIsVocabOpen(false); }} uid={profile.uid}
        unlockAll={MASTER_ADMINS.includes(String((profile as any).email || auth.currentUser?.email || '').trim().toLowerCase()) || (profile as any).role === UserRole.PARENT || (profile as any).role === UserRole.ADMIN} />
      <SaraPronunciationPlayer isOpen={isPronOpen} onClose={() => { cancelAllSpeech(); setIsPronOpen(false); }} uid={profile.uid}
        unlockAll={MASTER_ADMINS.includes(String((profile as any).email || auth.currentUser?.email || '').trim().toLowerCase()) || (profile as any).role === UserRole.PARENT || (profile as any).role === UserRole.ADMIN} />
      <SaraListeningPlayer isOpen={isListeningOpen} onClose={() => { cancelAllSpeech(); setIsListeningOpen(false); }} uid={profile.uid}
        unlockAll={MASTER_ADMINS.includes(String((profile as any).email || auth.currentUser?.email || '').trim().toLowerCase()) || (profile as any).role === UserRole.PARENT || (profile as any).role === UserRole.ADMIN} />
      <SaraTracksHub key={trackFilter} filter={trackFilter} isOpen={isTrackOpen} onClose={() => { cancelAllSpeech(); setIsTrackOpen(false); }} uid={profile.uid}
        unlockAll={MASTER_ADMINS.includes(String((profile as any).email || auth.currentUser?.email || '').trim().toLowerCase()) || (profile as any).role === UserRole.PARENT || (profile as any).role === UserRole.ADMIN} />

      {/* 13. Sara Independent Fluency Curriculum Modal */}
      <SaraCurriculumModal
        isOpen={isCurriculumModalOpen}
        onClose={() => setIsCurriculumModalOpen(false)}
        onSelectLesson={() => handleSelectCurriculumLesson()}
        activeLessonId={activeCurriculumLesson?.id}
        initialPillar={curriculumInitialPillar}
        isRtl={isRtl}
      />


    </div>
  );
};
