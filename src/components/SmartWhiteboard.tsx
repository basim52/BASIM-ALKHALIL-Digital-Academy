import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { 
  X, 
  RotateCcw, 
  RotateCw,
  Trash2, 
  Download, 
  PenTool, 
  Highlighter, 
  Eraser, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Check, 
  Maximize2, 
  Minimize2,
  Palette,
  Camera,
  Wand2,
  Sliders,
  Undo2,
  Redo2,
  CircleDot,
  LayoutTemplate,
  Smile,
  ZoomIn,
  ZoomOut,
  Scaling,
  Minus,
  Plus,
  GripHorizontal,
  Move,
  Mic,
  MicOff,
  Send,
  VolumeX,
  Bot,
  RefreshCw,
  MessageSquarePlus,
  Play,
  Pause,
  AlertCircle,
  GraduationCap,
  Lightbulb,
  Layers,
  Target,
  Timer,
  Trophy,
  MoreVertical,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence, useDragControls } from 'motion/react';
import { SaraBoardData, SaraBoardQuiz } from '../types';
import { playSnapshotShutterSound, prefetchAcademyAudio } from '../lib/audio';
import { buildLimitedLessonQuizSet, shuffleQuiz } from '../utils/quizUtils';

interface SmartWhiteboardProps {
  isOpen: boolean;
  onClose: () => void;
  boardData: SaraBoardData | null;
  isRtl: boolean;
  onSpeak: (text: string, onEnd?: () => void) => void;
  onQuizAnswer?: (index: number) => void;
  quizSelectedOption?: number | null;
  quizFeedback?: 'correct' | 'wrong' | null;
  onRequestOnBoard?: (requestText: string) => Promise<void> | void;
  isSaraThinking?: boolean;
  isSaraSpeaking?: boolean;
  onStopSpeak?: () => void;
  onToggleSara3D?: () => void;
  isSara3DOpen?: boolean;
  onSaraTriggerGesture?: (gesture: string) => void;
  currentLang?: 'ar' | 'en';
  onToggleLang?: () => void;
  onOpenCurriculum?: () => void;
  onFinishLesson?: (score?: number, total?: number) => void;
  isLessonActive?: boolean;
  currentPageIndex?: number;
  onPageIndexChange?: (index: number) => void;
  dailyLessonInfo?: { current: number; total: number; hasNext?: boolean };
}

// ========================================================
// 1. KID-FRIENDLY BACKGROUND THEMES
// ========================================================
export interface WhiteboardTheme {
  id: string;
  nameAr: string;
  nameEn: string;
  emoji: string;
  bgHex: string;
  gradientToHex: string;
  borderHex: string;
  headerFrom: string;
  headerVia: string;
  headerTo: string;
  textColor: string;
  textSecondary: string;
  accentHex: string;
  cardBg: string;
  cardBorder: string;
  gridColor: string;
  isLight: boolean;
}

export const WHITEBOARD_THEMES: WhiteboardTheme[] = [
  {
    id: 'maldives_turquoise',
    nameAr: 'شاطئ المالديف الفيروزي',
    nameEn: 'Maldives Turquoise',
    emoji: '🏖️',
    bgHex: '#083344',
    gradientToHex: '#0E7490',
    borderHex: '#2DD4BF',
    headerFrom: '#04212c',
    headerVia: '#083b48',
    headerTo: '#04212c',
    textColor: 'text-white',
    textSecondary: 'text-teal-100/80',
    accentHex: '#2DD4BF',
    cardBg: 'rgba(4, 33, 44, 0.75)',
    cardBorder: 'rgba(45, 212, 191, 0.35)',
    gridColor: 'rgba(45, 212, 191, 0.08)',
    isLight: false
  },
  {
    id: 'summer_peach',
    nameAr: 'شروق الصيف الخوخي والذهبي',
    nameEn: 'Summer Peach Sunrise',
    emoji: '🌅',
    bgHex: '#431407',
    gradientToHex: '#EA580C',
    borderHex: '#FDBA74',
    headerFrom: '#270e02',
    headerVia: '#431407',
    headerTo: '#270e02',
    textColor: 'text-white',
    textSecondary: 'text-orange-100/80',
    accentHex: '#FDBA74',
    cardBg: 'rgba(67, 20, 7, 0.75)',
    cardBorder: 'rgba(253, 186, 116, 0.35)',
    gridColor: 'rgba(253, 186, 116, 0.08)',
    isLight: false
  },
  {
    id: 'lemon_mint',
    nameAr: 'ليمون ونعناع صيفي مثلج',
    nameEn: 'Icy Lemon & Mint',
    emoji: '🍋',
    bgHex: '#022c22',
    gradientToHex: '#047857',
    borderHex: '#FACC15',
    headerFrom: '#011a14',
    headerVia: '#032c21',
    headerTo: '#011a14',
    textColor: 'text-white',
    textSecondary: 'text-emerald-100/80',
    accentHex: '#FACC15',
    cardBg: 'rgba(2, 44, 34, 0.75)',
    cardBorder: 'rgba(250, 204, 21, 0.35)',
    gridColor: 'rgba(250, 204, 21, 0.08)',
    isLight: false
  },
  {
    id: 'ocean_waves',
    nameAr: 'أمواج المحيط الصيفية',
    nameEn: 'Azure Ocean Waves',
    emoji: '🌊',
    bgHex: '#0b192c',
    gradientToHex: '#1D4ED8',
    borderHex: '#38BDF8',
    headerFrom: '#040d1a',
    headerVia: '#0c2340',
    headerTo: '#040d1a',
    textColor: 'text-white',
    textSecondary: 'text-sky-100/80',
    accentHex: '#38BDF8',
    cardBg: 'rgba(11, 25, 44, 0.75)',
    cardBorder: 'rgba(56, 189, 248, 0.35)',
    gridColor: 'rgba(56, 189, 248, 0.08)',
    isLight: false
  },
  {
    id: 'tropical_sunset',
    nameAr: 'غروب استوائي وزهور الهيبسكس',
    nameEn: 'Tropical Sunset Hibiscus',
    emoji: '🌺',
    bgHex: '#4c0519',
    gradientToHex: '#BE185D',
    borderHex: '#FB7185',
    headerFrom: '#2c030e',
    headerVia: '#430617',
    headerTo: '#2c030e',
    textColor: 'text-white',
    textSecondary: 'text-pink-100/80',
    accentHex: '#FB7185',
    cardBg: 'rgba(76, 5, 25, 0.75)',
    cardBorder: 'rgba(251, 113, 133, 0.35)',
    gridColor: 'rgba(251, 113, 133, 0.08)',
    isLight: false
  },
  {
    id: 'caribbean_palm',
    nameAr: 'جزر الكاريبي والنخيل الاستوائي',
    nameEn: 'Caribbean Island Palms',
    emoji: '🌴',
    bgHex: '#064e3b',
    gradientToHex: '#047857',
    borderHex: '#34D399',
    headerFrom: '#032a20',
    headerVia: '#053f30',
    headerTo: '#032a20',
    textColor: 'text-white',
    textSecondary: 'text-emerald-100/80',
    accentHex: '#6EE7B7',
    cardBg: 'rgba(3, 35, 27, 0.65)',
    cardBorder: 'rgba(52, 211, 153, 0.28)',
    gridColor: 'rgba(52, 211, 153, 0.07)',
    isLight: false
  },
  {
    id: 'white_sand_beach',
    nameAr: 'رمال الشاطئ البيضاء واللؤلؤ',
    nameEn: 'Pristine White Beach',
    emoji: '🐚',
    bgHex: '#F0FDF4',
    gradientToHex: '#E0F2FE',
    borderHex: '#0284C7',
    headerFrom: '#0F172A',
    headerVia: '#1E293B',
    headerTo: '#0F172A',
    textColor: 'text-slate-900',
    textSecondary: 'text-slate-600',
    accentHex: '#0369A1',
    cardBg: 'rgba(255, 255, 255, 0.94)',
    cardBorder: 'rgba(2, 132, 199, 0.22)',
    gridColor: 'rgba(2, 132, 199, 0.06)',
    isLight: true
  },
  {
    id: 'summer_mango_berry',
    nameAr: 'آيس كريم المانجو والتوت المنعش',
    nameEn: 'Mango & Berry Gelato',
    emoji: '🍧',
    bgHex: '#3b0764',
    gradientToHex: '#581c87',
    borderHex: '#FACC15',
    headerFrom: '#200336',
    headerVia: '#320655',
    headerTo: '#200336',
    textColor: 'text-white',
    textSecondary: 'text-purple-100/80',
    accentHex: '#FDE047',
    cardBg: 'rgba(27, 4, 45, 0.65)',
    cardBorder: 'rgba(250, 204, 21, 0.28)',
    gridColor: 'rgba(250, 204, 21, 0.07)',
    isLight: false
  }
];

// ========================================================
// 2. EXPANDED KID-FRIENDLY PEN COLORS
// ========================================================
export interface PenColor {
  name: string;
  value: string;
  labelAr: string;
  labelEn: string;
}

export const SMART_PEN_COLORS: PenColor[] = [
  { name: 'white', value: '#FFFFFF', labelAr: 'أبيض طبشوري', labelEn: 'Chalk White' },
  { name: 'gold', value: '#FACC15', labelAr: 'أصفر شمسي', labelEn: 'Sunny Gold' },
  { name: 'orange', value: '#FB923C', labelAr: 'برتقالي مرح', labelEn: 'Vibrant Orange' },
  { name: 'coral', value: '#F43F5E', labelAr: 'أحمر مرجاني', labelEn: 'Coral Red' },
  { name: 'pink', value: '#F472B6', labelAr: 'وردي حلاوة', labelEn: 'Candy Pink' },
  { name: 'purple', value: '#A855F7', labelAr: 'بنفسجي نيون', labelEn: 'Neon Violet' },
  { name: 'sky', value: '#38BDF8', labelAr: 'أزرق سماوي', labelEn: 'Sky Blue' },
  { name: 'emerald', value: '#34D399', labelAr: 'أخضر نعناعي', labelEn: 'Mint Green' },
  { name: 'black', value: '#1E293B', labelAr: 'فحم أسود', labelEn: 'Charcoal Black' },
  { name: 'brown', value: '#92400E', labelAr: 'بني شوكولاتة', labelEn: 'Chocolate Brown' }
];

// ========================================================
// 3. READY EDUCATIONAL WHITEBOARD TEMPLATES
// ========================================================
export interface WhiteboardTemplate {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: string;
  descAr: string;
  descEn: string;
}

export const WHITEBOARD_TEMPLATES: WhiteboardTemplate[] = [
  {
    id: 'tenses',
    nameAr: 'مخطط الأزمنة (Tenses Timeline)',
    nameEn: 'Tenses Timeline',
    icon: '⏳',
    descAr: 'خط زمني يقسم: الماضي (Past) ➔ الحاضر (Present) ➔ المستقبل (Future)',
    descEn: 'Chronological timeline: Past ➔ Present ➔ Future with markers'
  },
  {
    id: 'four_lines',
    nameAr: 'تسطير كراسة الإنجليزية (4-Lines)',
    nameEn: '4-Line Handwriting Paper',
    icon: '📝',
    descAr: 'المسطرة الكلاسيكية لكتابة الحروف بارتفاعاتها السليمة',
    descEn: 'English 4-line ruler for perfect letter heights'
  },
  {
    id: 'comparative',
    nameAr: 'جدول المقارنة والتفضيل',
    nameEn: 'Comparison Table',
    icon: '⚖️',
    descAr: 'جدول بـ 3 أعمدة: الصفة الأصلية | صيغة المقارنة (-er) | صيغة التفضيل (-est)',
    descEn: '3 columns: Positive | Comparative (-er) | Superlative (-est)'
  },
  {
    id: 'family_tree',
    nameAr: 'شجرة عائلة الكلمات (Word Family)',
    nameEn: 'Word Family Tree',
    icon: '🌳',
    descAr: 'جذع للكلمة الأصل وفروع للاسم والفعل والصفة والظرف',
    descEn: 'Root trunk with branches for Noun, Verb, Adjective, Adverb'
  },
  {
    id: 'irregular_verbs',
    nameAr: 'جدول الأفعال الشاذة (Irregular Verbs)',
    nameEn: 'Irregular Verbs Matrix',
    icon: '🔄',
    descAr: 'جدول لتصريف الأفعال: المصدر (V1) | الماضي (V2) | اسم المفعول (V3)',
    descEn: 'Verb conjugation table: Base (V1) | Past (V2) | Participle (V3)'
  }
];

export const KID_STICKERS = ['⭐', '🏆', '👑', '💖', '👍', '🔥', '💡', '💯', '🚀', '🌈', '🎓', '🌟'];

export interface BoardSizePreset {
  id: string;
  nameAr: string;
  nameEn: string;
  width: number;
  height: number;
  icon: string;
  descAr: string;
  descEn: string;
}

export const BOARD_SIZE_PRESETS: BoardSizePreset[] = [
  { id: 'compact', nameAr: 'مصغرة (بجانب المحادثة)', nameEn: 'Compact (Side-by-side)', width: 540, height: 480, icon: '📱', descAr: 'صغيرة لا تحجب المحادثة', descEn: 'Small, fits beside chat' },
  { id: 'standard', nameAr: 'عادية (متوازنة افتراضية)', nameEn: 'Standard (Default)', width: 780, height: 600, icon: '💻', descAr: 'المقاس الكلاسيكي المتوازن', descEn: 'Balanced standard view' },
  { id: 'large', nameAr: 'مكبرة (مساحة شرح واسعة)', nameEn: 'Large (Spacious)', width: 980, height: 720, icon: '🖥️', descAr: 'مساحة واسعة للرسومات والشرح', descEn: 'Spacious for notes & diagrams' },
  { id: 'wide', nameAr: 'عريضة جداً (استوديو سبورة)', nameEn: 'Ultra Wide (Studio)', width: 1200, height: 800, icon: '📐', descAr: 'أقصى مساحة للكتابة والتلوين', descEn: 'Maximum room for drawing' },
];

// 🛡️ Error Boundary to gracefully catch any rendering errors inside the whiteboard
interface WhiteboardErrorBoundaryProps {
  children: React.ReactNode;
  isRtl?: boolean;
  onClose?: () => void;
}

interface WhiteboardErrorBoundaryState {
  hasError: boolean;
}

class WhiteboardErrorBoundary extends React.Component<WhiteboardErrorBoundaryProps, WhiteboardErrorBoundaryState> {
  constructor(props: WhiteboardErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('SmartWhiteboard Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-slate-900 border border-amber-400/40 rounded-2xl p-6 text-center max-w-sm text-white shadow-2xl">
            <div className="text-3xl mb-2">⚠️</div>
            <p className="text-sm font-black mb-4">
              {this.props.isRtl ? 'صار خطأ في السبورة' : 'صار خطأ في السبورة'}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                this.props.onClose?.();
              }}
              className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-black text-xs hover:bg-amber-300 transition-all cursor-pointer"
            >
              {this.props.isRtl ? 'إغلاق السبورة' : 'Close Whiteboard'}
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const SmartWhiteboardComponent: React.FC<SmartWhiteboardProps> = ({
  isOpen,
  onClose,
  boardData,
  isRtl,
  onSpeak,
  onQuizAnswer,
  quizSelectedOption,
  quizFeedback,
  onRequestOnBoard,
  isSaraThinking = false,
  isSaraSpeaking = false,
  onStopSpeak,
  onToggleSara3D,
  isSara3DOpen = true,
  onSaraTriggerGesture,
  currentLang = 'ar',
  onToggleLang,
  onOpenCurriculum,
  onFinishLesson,
  isLessonActive,
  currentPageIndex: controlledPageIndex,
  onPageIndexChange,
  dailyLessonInfo
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Whiteboard Appearance State (Default: Fresh Summer Maldives Turquoise)
  const [activeThemeId, setActiveThemeId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('alkhalil_whiteboard_theme');
      if (saved) {
        if (saved === 'summer_peach_sunrise') return 'summer_peach';
        if (saved === 'azure_ocean') return 'ocean_waves';
        if (saved === 'tropical_hibiscus') return 'tropical_sunset';
        if (WHITEBOARD_THEMES.some(t => t.id === saved)) {
          return saved;
        }
      }
    }
    return 'maldives_turquoise';
  });
  const [showThemePicker, setShowThemePicker] = useState<boolean>(false);
  
  // Drawing Tools State
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedTool, setSelectedTool] = useState<'pen' | 'highlighter' | 'glow' | 'eraser'>('pen');
  const [selectedColor, setSelectedColor] = useState<string>('#FACC15');
  const [lineWidth, setLineWidth] = useState<number>(6);
  
  // Step-by-Step History (Undo & Redo)
  const [history, setHistory] = useState<ImageData[]>([]);
  const [redoHistory, setRedoHistory] = useState<ImageData[]>([]);
  
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [mobileMode, setMobileMode] = useState<'fullscreen' | 'half'>('fullscreen');
  const [activeTab, setActiveTab] = useState<'content' | 'draw'>('content');
  const [contentViewFilter, setContentViewFilter] = useState<'all' | 'focus' | 'notes' | 'practice'>('all');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);
  const [showBrushSizePopover, setShowBrushSizePopover] = useState(false);
  const [showTemplatePicker, setShowTemplatePicker] = useState<boolean>(false);
  const [showStickerPicker, setShowStickerPicker] = useState<boolean>(false);
  const [showMobileMoreMenu, setShowMobileMoreMenu] = useState<boolean>(false);

  // Limited 5-Question Lesson Quiz & Floating 30s Countdown Timer
  const [quizQuestionIndex, setQuizQuestionIndex] = useState<number>(0);
  const [localQuizSelectedOption, setLocalQuizSelectedOption] = useState<number | null>(null);
  const [localQuizFeedback, setLocalQuizFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [quizTimeLeft, setQuizTimeLeft] = useState<number>(30);
  const [hasTimerStarted, setHasTimerStarted] = useState<boolean>(false);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [quizTimeUp, setQuizTimeUp] = useState<boolean>(false);
  // Concept Checking Question (CCQ) State
  const [ccqSelectedOption, setCcqSelectedOption] = useState<number | null>(null);

  // 📖 Whiteboard Guided Pages System (تقسيم السبورة لصفحات متدرجة تفاعلية وربط الشرح بالصوت خطوة بخطوة)
  const [whiteboardViewMode, setWhiteboardViewMode] = useState<'paged' | 'scroll'>('paged');
  const [internalPageIndex, setInternalPageIndex] = useState<number>(0);
  const currentPageIndex = controlledPageIndex !== undefined ? controlledPageIndex : internalPageIndex;
  const prevControlledPageRef = useRef<number | undefined>(controlledPageIndex);

  const setCurrentPageIndex = useCallback((idx: number | ((prev: number) => number)) => {
    const next = typeof idx === 'function' ? idx(currentPageIndex) : idx;
    prevControlledPageRef.current = next;
    if (controlledPageIndex === undefined) {
      setInternalPageIndex(next);
    }
    if (onPageIndexChange) {
      onPageIndexChange(next);
    }
  }, [controlledPageIndex, currentPageIndex, onPageIndexChange]);

  const [completedPages, setCompletedPages] = useState<Set<number>>(new Set([0]));
  const [pageTurnPromptActive, setPageTurnPromptActive] = useState<boolean>(false);

  // ⏩ Auto-advance countdown timer
  const [autoAdvanceEnabled, setAutoAdvanceEnabled] = useState<boolean>(false);
  const [autoAdvanceCountdown, setAutoAdvanceCountdown] = useState<number | null>(null);
  const autoAdvanceIntervalRef = useRef<any>(null);

  // 💡 Sequential highlighting synchronized with Sara's voice
  const [activeHighlightKey, setActiveHighlightKey] = useState<string | null>(null);
  const highlightTimeoutsRef = useRef<any[]>([]);

  const cancelAutoAdvance = useCallback(() => {
    if (autoAdvanceIntervalRef.current) {
      clearInterval(autoAdvanceIntervalRef.current);
      autoAdvanceIntervalRef.current = null;
    }
    setAutoAdvanceCountdown(null);
  }, []);

  const clearHighlightTimeouts = useCallback(() => {
    highlightTimeoutsRef.current.forEach(t => clearTimeout(t));
    highlightTimeoutsRef.current = [];
  }, []);

  interface WhiteboardSlidePage {
    id: string;
    pageNumber: number;
    titleAr: string;
    titleEn: string;
    icon: string;
    subtitleAr: string;
    subtitleEn: string;
    speechText: string;
    sectionType: 'objective' | 'formula' | 'rules' | 'pitfalls' | 'speaking' | 'quiz';
  }

  const whiteboardPages = useMemo<WhiteboardSlidePage[]>(() => {
    if (!boardData) return [];
    const list: WhiteboardSlidePage[] = [];

    // Page 1: Objective & Native Model Sentence
    if (boardData.title || boardData.sentence) {
      const p1Speech = isRtl
        ? `أهلاً بك يا بطل في صفحتنا الأولى من درس: ${boardData.title || 'الدرس الأكاديمي'}! 🌸 هدفنا الأساسي اليوم هو إتقان هذا المفهوم والتحدث به بطلاقة. استمع جيداً لجملتنا النموذجية المكتوبة على السبورة: "${boardData.sentence || ''}". ${boardData.highlight ? `ولاحظ التركيز على كلمة: "${boardData.highlight}".` : ''} ${boardData.phoneticBreakdown?.tip ? `ونصيحة النطق: ${boardData.phoneticBreakdown.tip}.` : ''} هل استوعبت هذا النموذج جيداً؟ اضغط على زر 'اقلب الصفحة 📄' لنكتشف القاعدة التركيبية معاً!`
        : `Welcome champion to Page 1 of our lesson: ${boardData.title || 'Target Lesson'}! 🌸 Our main goal today is mastering this structure for fluent speaking. Listen to our core model: "${boardData.sentence || ''}". ${boardData.highlight ? `Notice: "${boardData.highlight}".` : ''} Got this model? Click 'Turn Page 📄' to discover the grammar formula!`;

      list.push({
        id: 'page_objective',
        pageNumber: 1,
        titleAr: 'الهدف والنموذج',
        titleEn: 'Model & Target',
        icon: '🌟',
        subtitleAr: 'الجملة النموذجية والهدف التواصلي',
        subtitleEn: 'Native Model Sentence & Objective',
        speechText: p1Speech,
        sectionType: 'objective'
      });
    }

    // Page 2: Formula & Syntax Breakdown
    if (boardData.formula || boardData.grammarBreakdown || boardData.drillChallenge) {
      const p2Speech = isRtl
        ? `أحسنت! نحن الآن في الصفحة الثانية: القاعدة والصيغة التركيبية 📐. القاعدة التي كتبتها لك على السبورة هي: ${boardData.formula || 'تركيب الجملة السليم'}. ${boardData.grammarBreakdown?.parts ? 'لاحظ تفكيك الجملة بالألوان: الفاعل بالأزرق، والفعل بالأصفر، وبقية الجملة بالأخضر.' : ''} ${boardData.drillChallenge ? `وهناك تحدي تدريبي لتثبيت القاعدة: ${boardData.drillChallenge.instruction}.` : ''} تأمل تفكيك الجملة، وعندما تكون جاهزاً، اضغط على 'اقلب الصفحة 📄' لنرى القواعد التفصيلية والأمثلة!`
        : `Great! We are now on Page 2: Formula & Syntax Anatomy 📐. Our structural rule is: ${boardData.formula || 'Sentence Formula'}. Study the color-coded syntax. When you're ready, click 'Turn Page 📄' for detailed rules and real models!`;

      list.push({
        id: 'page_formula',
        pageNumber: list.length + 1,
        titleAr: 'القاعدة والتركيب',
        titleEn: 'Formula & Syntax',
        icon: '📐',
        subtitleAr: 'الصيغة التركيبية وتفكيك الجملة',
        subtitleEn: 'Grammar Formula & Sentence Dissection',
        speechText: p2Speech,
        sectionType: 'formula'
      });
    }

    // Page 3: Detailed Rules & Real-World Models
    if ((Array.isArray(boardData.notes) && boardData.notes.length > 0) || boardData.diagram) {
      const p3Speech = isRtl
        ? `مرحباً بك في الصفحة الثالثة: القواعد التفصيلية والأمثلة الحية 📌. إليك أهم النقاط الذهبية: ${Array.isArray(boardData.notes) ? boardData.notes.slice(0, 3).join('. ') : ''}. تطبيق هذه النماذج في حياتك اليومية يمنحك ثقة عالية. راجع الأمثلة المكتوبة بالطبشور، واضغط على 'اقلب الصفحة 📄' لنكشف الفخاخ اللغوية الشائعة!`
        : `Welcome to Page 3: Detailed Rules & Real-World Models 📌. Key takeaways: ${Array.isArray(boardData.notes) ? boardData.notes.slice(0, 3).join('. ') : ''}. Review these models, then click 'Turn Page 📄' to uncover common traps!`;

      list.push({
        id: 'page_rules',
        pageNumber: list.length + 1,
        titleAr: 'الأركان والأمثلة',
        titleEn: 'Rules & Models',
        icon: '📌',
        subtitleAr: 'النقاط الذهبية والنماذج التطبيقية',
        subtitleEn: 'Golden Takeaways & Real Life Models',
        speechText: p3Speech,
        sectionType: 'rules'
      });
    }

    // Page 4: Common Pitfalls & Mnemonic Hook
    if (boardData.commonPitfall || boardData.correction || boardData.mnemonic || boardData.ccq) {
      const p4Speech = isRtl
        ? `وصلنا إلى الصفحة الرابعة: تنبيه الفخاخ الشائعة وحيلة الذاكرة الذكية ⚠️! ${boardData.commonPitfall ? `انتبه جيداً: لا تقل "${boardData.commonPitfall.bad}"، بل قل دائماً "${boardData.commonPitfall.good}". والسبب: ${boardData.commonPitfall.explanation}.` : ''} ${boardData.mnemonic ? `وحيلة الذاكرة: ${boardData.mnemonic}.` : ''} أتقنت هذه النقطة؟ اضغط على 'اقلب الصفحة 📄' لننتقل لبنك المفردات وتحدي التحدث!`
        : `Here is Page 4: Common Pitfalls & Smart Memory Hook ⚠️! ${boardData.commonPitfall ? `Watch out for this trap: avoid saying "${boardData.commonPitfall.bad}", always say "${boardData.commonPitfall.good}".` : ''} ${boardData.mnemonic ? `Memory hook: ${boardData.mnemonic}.` : ''} Mastered this? Click 'Turn Page 📄' for vocabulary and speaking!`;

      list.push({
        id: 'page_pitfalls',
        pageNumber: list.length + 1,
        titleAr: 'الفخاخ والذاكرة',
        titleEn: 'Traps & Memory',
        icon: '⚠️',
        subtitleAr: 'أخطاء شائعة وحيلة الحفظ الذكي',
        subtitleEn: 'L1 Pitfalls & Mnemonic Key',
        speechText: p4Speech,
        sectionType: 'pitfalls'
      });
    }

    // Page 5: Vocabulary Bank & Speaking Challenge
    if ((Array.isArray(boardData.vocabularyBank) && boardData.vocabularyBank.length > 0) || boardData.speakingPrompt) {
      const p5Speech = isRtl
        ? `نحن الآن في الصفحة الخامسة: بنك المفردات وتحدي التحدث الصوتي 🎙️. ${Array.isArray(boardData.vocabularyBank) && boardData.vocabularyBank.length > 0 ? `كتبت لك أهم الكلمات مع نطقها: ${boardData.vocabularyBank.map(v => v.word).join('، ')}.` : ''} ${boardData.speakingPrompt ? `والآن دورك لتتحدث بالمايك: ${boardData.speakingPrompt.instruction}.` : ''} تدرب على النطق بالصوت، ثم اضغط على 'اقلب الصفحة 📄' لخوض التحدي والاختبار النهائي!`
        : `We are on Page 5: Vocabulary Bank & Speaking Challenge 🎙️. ${Array.isArray(boardData.vocabularyBank) && boardData.vocabularyBank.length > 0 ? `Key words: ${boardData.vocabularyBank.map(v => v.word).join(', ')}.` : ''} ${boardData.speakingPrompt ? `Now speak into your mic: ${boardData.speakingPrompt.instruction}.` : ''} Click 'Turn Page 📄' for the final mastery quiz!`;

      list.push({
        id: 'page_speaking',
        pageNumber: list.length + 1,
        titleAr: 'المفردات والتحدث',
        titleEn: 'Vocab & Speaking',
        icon: '🎙️',
        subtitleAr: 'بنك الكلمات وتحدي التحدث بالمايك',
        subtitleEn: 'Vocabulary Bank & Oral Challenge',
        speechText: p5Speech,
        sectionType: 'speaking'
      });
    }

    // Page 6: Mastery Quiz Challenge (Always guaranteed for every curriculum lesson)
    const p6Speech = isRtl
      ? `وصلنا إلى الصفحة الختامية: اختبار الإتقان النهائي 🎯! أمامك 5 أسئلة تدريبية لقياس مدى استيعابك للقاعدة، كل سؤال له مؤقت 30 ثانية. اقرأ كل سؤال بتركيز وانطلق لتحقيق العلامة الكاملة!`
      : `We arrived at Page 6: Final Mastery Challenge 🎯! Here is your progressive 5-question test with a 30-second countdown. Read each question carefully and aim for a perfect score!`;

    list.push({
      id: 'page_quiz',
      pageNumber: list.length + 1,
      titleAr: 'اختبار الإتقان',
      titleEn: 'Mastery Quiz',
      icon: '🎯',
      subtitleAr: 'تحدي الأسئلة الخمسة وقياس النتيجة',
      subtitleEn: '5-Question Timed Challenge',
      speechText: p6Speech,
      sectionType: 'quiz'
    });

    return list;
  }, [boardData, isRtl]);

  // 🚀 Rate-Limit Safe Pre-warmer: Gently pre-caches ONLY the immediate next page
  // after Sara starts speaking current page, never blasting the API with simultaneous calls
  useEffect(() => {
    if (!isOpen || !whiteboardPages) return;
    const nextPage = whiteboardPages[currentPageIndex + 1];
    if (nextPage && nextPage.speechText) {
      const timer = setTimeout(() => {
        const hasArabic = /[\u0600-\u06FF]/.test(nextPage.speechText);
        prefetchAcademyAudio(nextPage.speechText, hasArabic ? 'ar' : 'en');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, currentPageIndex, whiteboardPages]);

  const activeSlidePage = whiteboardPages[currentPageIndex] || whiteboardPages[0];

  const explainPage = useCallback((pageIdx: number) => {
    if (!whiteboardPages || whiteboardPages.length === 0) return;
    const page = whiteboardPages[pageIdx];
    if (!page) return;

    cancelAutoAdvance();
    clearHighlightTimeouts();
    setIsExplainingAll(true);
    setActiveExplanationSection(page.sectionType as any);
    setCurrentExplanationText(page.speechText);
    setPageTurnPromptActive(false);
    onSaraTriggerGesture?.('explaining');
    setCompletedPages(prev => new Set(prev).add(pageIdx));

    // Progressive highlight timings synchronized with what Sara speaks on this page
    if (page.sectionType === 'objective') {
      setActiveHighlightKey('sentence');
      const t1 = setTimeout(() => setActiveHighlightKey('highlight_word'), 4000);
      const t2 = setTimeout(() => setActiveHighlightKey('phonetic'), 11000);
      highlightTimeoutsRef.current = [t1, t2];
    } else if (page.sectionType === 'formula') {
      setActiveHighlightKey('formula');
      const t1 = setTimeout(() => setActiveHighlightKey('breakdown'), 5000);
      const t2 = setTimeout(() => setActiveHighlightKey('drill'), 13000);
      highlightTimeoutsRef.current = [t1, t2];
    } else if (page.sectionType === 'rules') {
      setActiveHighlightKey('notes');
      const t1 = setTimeout(() => setActiveHighlightKey('diagram'), 9000);
      highlightTimeoutsRef.current = [t1];
    } else if (page.sectionType === 'pitfalls') {
      setActiveHighlightKey('pitfall');
      const t1 = setTimeout(() => setActiveHighlightKey('correction'), 6000);
      const t2 = setTimeout(() => setActiveHighlightKey('mnemonic'), 12000);
      highlightTimeoutsRef.current = [t1, t2];
    } else if (page.sectionType === 'speaking') {
      setActiveHighlightKey('vocab');
      const t1 = setTimeout(() => setActiveHighlightKey('speaking'), 8000);
      highlightTimeoutsRef.current = [t1];
    } else if (page.sectionType === 'quiz') {
      setActiveHighlightKey('quiz');
    }

    onSpeak(page.speechText, () => {
      setIsExplainingAll(false);
      setPageTurnPromptActive(true);
      if (autoAdvanceEnabled && pageIdx < whiteboardPages.length - 1) {
        let count = 4;
        setAutoAdvanceCountdown(count);
        if (autoAdvanceIntervalRef.current) clearInterval(autoAdvanceIntervalRef.current);
        autoAdvanceIntervalRef.current = setInterval(() => {
          count -= 1;
          if (count <= 0) {
            cancelAutoAdvance();
            const nextIdx = pageIdx + 1;
            setCurrentPageIndex(nextIdx);
            explainPage(nextIdx);
          } else {
            setAutoAdvanceCountdown(count);
          }
        }, 1000);
      }
    });
  }, [whiteboardPages, onSpeak, onSaraTriggerGesture, autoAdvanceEnabled, cancelAutoAdvance, clearHighlightTimeouts, setCurrentPageIndex]);

  const handleNextPage = useCallback(() => {
    cancelAutoAdvance();
    if (currentPageIndex < whiteboardPages.length - 1) {
      const nextIdx = currentPageIndex + 1;
      setCurrentPageIndex(nextIdx);
      explainPage(nextIdx);
    }
  }, [currentPageIndex, whiteboardPages.length, explainPage, cancelAutoAdvance, setCurrentPageIndex]);

  const handlePrevPage = useCallback(() => {
    cancelAutoAdvance();
    if (currentPageIndex > 0) {
      const prevIdx = currentPageIndex - 1;
      setCurrentPageIndex(prevIdx);
      explainPage(prevIdx);
    }
  }, [currentPageIndex, explainPage, cancelAutoAdvance, setCurrentPageIndex]);

  // Capped at 5 questions maximum per lesson
  const currentQuizList = React.useMemo(() => {
    if (Array.isArray(boardData?.quizzes) && boardData.quizzes.length > 0) {
      return boardData.quizzes.slice(0, 5).map(q => {
        const safeQuiz = Array.isArray(q?.options) ? q : { ...q, options: [] as string[] };
        const shuffled = shuffleQuiz(safeQuiz, false);
        return {
          ...shuffled,
          options: Array.isArray(shuffled.options) ? shuffled.options : []
        };
      });
    }
    if (boardData) {
      return buildLimitedLessonQuizSet(
        boardData.title || (isRtl ? 'الدرس الحالي' : 'Current Lesson'),
        boardData.sentence,
        boardData.formula,
        boardData.quiz,
        isRtl
      );
    }
    return buildLimitedLessonQuizSet(
      isRtl ? 'الدرس الحالي' : 'Current Lesson',
      undefined,
      undefined,
      undefined,
      isRtl
    );
  }, [boardData, isRtl]);

  const activeQuestion: SaraBoardQuiz | undefined = currentQuizList[quizQuestionIndex] || boardData?.quiz;
  const totalQuestions = currentQuizList.length || 1;

  // Sync / Reset on question change or new boardData
  useEffect(() => {
    setQuizTimeLeft(activeQuestion?.timeLimitSeconds || 30);
    setHasTimerStarted(false);
    setIsTimerRunning(false);
    setQuizTimeUp(false);
    setLocalQuizSelectedOption(null);
    setLocalQuizFeedback(null);
    setCcqSelectedOption(null);
  }, [quizQuestionIndex, boardData]);

  // Floating 30s Countdown Timer Effect (Starts after Sara reads question or student clicks Start)
  useEffect(() => {
    if (!isOpen || activeTab !== 'content' || !activeQuestion || quizCompleted || !hasTimerStarted || !isTimerRunning) {
      return;
    }
    if (localQuizSelectedOption !== null) {
      return;
    }

    const timer = setInterval(() => {
      setQuizTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setQuizTimeUp(true);
          setIsTimerRunning(false);
          setLocalQuizFeedback('wrong');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, activeTab, activeQuestion, quizCompleted, hasTimerStarted, isTimerRunning, localQuizSelectedOption]);

  const handleAnswerQuestion = (optionIndex: number) => {
    if (localQuizSelectedOption !== null || quizTimeUp) return;
    setIsTimerRunning(false);
    setLocalQuizSelectedOption(optionIndex);

    const isCorrect = optionIndex === activeQuestion?.answerIndex;
    setLocalQuizFeedback(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
    }

    if (onQuizAnswer) {
      onQuizAnswer(optionIndex);
    }
  };

  const handleNextQuestion = () => {
    if (quizQuestionIndex < totalQuestions - 1) {
      setQuizQuestionIndex(prev => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuizQuestionIndex(0);
    setQuizScore(0);
    setQuizCompleted(false);
    setQuizTimeLeft(30);
    setQuizTimeUp(false);
    setHasTimerStarted(false);
    setIsTimerRunning(false);
    setLocalQuizSelectedOption(null);
    setLocalQuizFeedback(null);
  };

  // Sara Whiteboard Voice Explainer State
  const [isExplainingAll, setIsExplainingAll] = useState(false);
  const [activeExplanationSection, setActiveExplanationSection] = useState<'formula' | 'sentence' | 'correction' | 'notes' | 'diagram' | 'quiz' | null>(null);
  const [currentExplanationText, setCurrentExplanationText] = useState<string>('');
  const explanationTimeoutRef = useRef<any>(null);

  // Student Whiteboard Requests ("تتفاعل مع الطلب")
  const [boardRequestInput, setBoardRequestInput] = useState('');
  const [isListeningRequest, setIsListeningRequest] = useState(false);
  const [requestNotice, setRequestNotice] = useState<string | null>(null);
  const requestRecognitionRef = useRef<any>(null);

  // 🎙️ Page-specific Voice Question States (سؤال الطالب بالمايك لكل صفحة قبل التقليب)
  const [isListeningPageQuestion, setIsListeningPageQuestion] = useState(false);
  const [pageQuestionInput, setPageQuestionInput] = useState('');
  const [showPageQuestionBox, setShowPageQuestionBox] = useState(false);
  const [pageQuestionNotice, setPageQuestionNotice] = useState<string | null>(null);
  const pageQuestionRecognitionRef = useRef<any>(null);

  // Stop voice explanation if user closes modal or clicks stop
  const stopVoiceExplanation = useCallback(() => {
    if (explanationTimeoutRef.current) {
      clearTimeout(explanationTimeoutRef.current);
      explanationTimeoutRef.current = null;
    }
    setIsExplainingAll(false);
    setActiveExplanationSection(null);
    setCurrentExplanationText('');
    onStopSpeak?.();
  }, [onStopSpeak]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      cancelAutoAdvance();
      clearHighlightTimeouts();
      if (explanationTimeoutRef.current) clearTimeout(explanationTimeoutRef.current);
      if (requestRecognitionRef.current) {
        try { requestRecognitionRef.current.abort(); } catch (_) {}
      }
      if (pageQuestionRecognitionRef.current) {
        try { pageQuestionRecognitionRef.current.abort(); } catch (_) {}
      }
    };
  }, [cancelAutoAdvance, clearHighlightTimeouts]);

  // When Sara stops speaking externally, activate page-turn prompt and keep highlight active immediately
  useEffect(() => {
    if (!isSaraSpeaking && isExplainingAll) {
      const t = setTimeout(() => {
        setIsExplainingAll(false);
        setPageTurnPromptActive(true);
      }, 80);
      return () => clearTimeout(t);
    }
  }, [isSaraSpeaking, isExplainingAll]);

  // Synchronize initial highlight if Sara was already speaking intro on Page 1
  useEffect(() => {
    if (isOpen && isSaraSpeaking && currentPageIndex === 0 && !activeHighlightKey) {
      setActiveHighlightKey('sentence');
      const t1 = setTimeout(() => setActiveHighlightKey('highlight_word'), 4000);
      const t2 = setTimeout(() => setActiveHighlightKey('phonetic'), 11000);
      highlightTimeoutsRef.current = [t1, t2];
    }
  }, [isOpen, isSaraSpeaking, currentPageIndex, activeHighlightKey]);

  // When external controlledPageIndex changes while open, automatically explain that page
  useEffect(() => {
    if (isOpen && controlledPageIndex !== undefined && controlledPageIndex !== prevControlledPageRef.current) {
      prevControlledPageRef.current = controlledPageIndex;
      explainPage(controlledPageIndex);
    }
  }, [isOpen, controlledPageIndex, explainPage]);

  // Explain single section
  const handleExplainSection = (section: 'formula' | 'sentence' | 'correction' | 'notes' | 'diagram' | 'quiz') => {
    if (!boardData) return;
    stopVoiceExplanation();
    setActiveExplanationSection(section);
    onSaraTriggerGesture?.('pointing');

    let textToSpeak = '';
    if (section === 'formula' && boardData.formula) {
      textToSpeak = isRtl
        ? `هذه هي قاعدة الجملة بالإنجليزية: ${boardData.formula}. تتكون القاعدة من هذه الأركان لتركيب جملة سليمة.`
        : `Here is the grammar formula: ${boardData.formula}. Follow these components to form correct sentences.`;
    } else if (section === 'sentence' && boardData.sentence) {
      textToSpeak = isRtl
        ? `استمع جيداً لمثالنا على السبورة: "${boardData.sentence}". ${boardData.highlight ? `وركز على نطق: "${boardData.highlight}".` : ''}`
        : `Listen carefully to our example: "${boardData.sentence}". ${boardData.highlight ? `Pay special attention to "${boardData.highlight}".` : ''}`;
    } else if (section === 'correction' && boardData.correction) {
      textToSpeak = isRtl
        ? `انتبه يا بطل، الصيغة الصحيحة هي "${boardData.correction.right}" بدلاً من "${boardData.correction.wrong}". محاولة رائعة!`
        : `Notice the natural form is "${boardData.correction.right}" instead of "${boardData.correction.wrong}". Great effort!`;
    } else if (section === 'notes' && Array.isArray(boardData.notes) && boardData.notes.length > 0) {
      textToSpeak = isRtl
        ? `إليك أهم النقاط الذهبية في درسنا اليوم: ${boardData.notes.join('. ')}`
        : `Here are the key takeaways for today: ${boardData.notes.join('. ')}`;
    } else if (section === 'diagram' && boardData.diagram && Array.isArray(boardData.diagram.items)) {
      const itemsList = boardData.diagram.items.map(it => `${it.title}: ${it.desc}`).join(', ');
      textToSpeak = isRtl
        ? `في هذا المخطط التوضيحي، نتعلم: ${itemsList}`
        : `In this vocabulary diagram, let's learn: ${itemsList}`;
    } else if (section === 'quiz' && boardData.quiz) {
      const quizOpts = Array.isArray(boardData.quiz.options) ? boardData.quiz.options : [];
      textToSpeak = isRtl
        ? `سؤال التحدي السريع على السبورة: "${boardData.quiz.question}". والخيارات هي: ${quizOpts.join('، أو ')}. فكّر واختر الإجابة الصحيحة!`
        : `Whiteboard challenge question: "${boardData.quiz.question}". Your choices are: ${quizOpts.join(', or ')}. Pick the right one!`;
    }

    if (textToSpeak) {
      setCurrentExplanationText(textToSpeak);
      onSpeak(textToSpeak);
    }
  };

  // Full Whiteboard Walkthrough
  const handleExplainWholeBoard = () => {
    if (!boardData) return;
    setIsExplainingAll(true);
    onSaraTriggerGesture?.('explaining');

    // If teacher provided custom voice explanation script
    if (boardData.voiceExplanation) {
      setCurrentExplanationText(boardData.voiceExplanation);
      onSpeak(boardData.voiceExplanation);
      setActiveExplanationSection('formula');
      return;
    }

    // Build comprehensive multi-part explanation
    const parts: string[] = [];
    parts.push(isRtl 
      ? `أهلاً يا بطل! انظر معي للسبورة اليوم، موضوعنا هو: ${boardData.title || 'المهارة المستهدفة'}.`
      : `Welcome! Look at the board today, our lesson is: ${boardData.title || 'Target Skill'}.`);

    if (boardData.formula) {
      parts.push(isRtl
        ? `قاعدتنا الأساسية هي: ${boardData.formula}.`
        : `Our core rule is: ${boardData.formula}.`);
    }

    if (boardData.sentence) {
      parts.push(isRtl
        ? `ومثالنا العملي: "${boardData.sentence}". ${boardData.highlight ? `انتبه خصوصاً لكلمة "${boardData.highlight}".` : ''}`
        : `And our example is: "${boardData.sentence}". ${boardData.highlight ? `Notice "${boardData.highlight}".` : ''}`);
    }

    if (boardData.correction) {
      parts.push(isRtl
        ? `والصحيح أن نقول: "${boardData.correction.right}" بدلاً من "${boardData.correction.wrong}".`
        : `And we say "${boardData.correction.right}" instead of "${boardData.correction.wrong}".`);
    }

    if (Array.isArray(boardData.notes) && boardData.notes.length > 0) {
      parts.push(isRtl
        ? `وأهم الملاحظات الذهبية: ${boardData.notes.slice(0, 2).join('. ')}.`
        : `Key golden tips: ${boardData.notes.slice(0, 2).join('. ')}.`);
    }

    if (boardData.quiz) {
      parts.push(isRtl
        ? `والآن يا بطل، جرب حل سؤال التحدي في أسفل السبورة!`
        : `Now, try solving the challenge question at the bottom of the board!`);
    }

    const fullScript = parts.join(' ');
    setCurrentExplanationText(fullScript);
    setActiveExplanationSection('formula');
    onSpeak(fullScript);

    // Timed progression of active section highlight
    if (boardData.sentence) {
      explanationTimeoutRef.current = setTimeout(() => {
        setActiveExplanationSection('sentence');
        if (boardData.quiz) {
          explanationTimeoutRef.current = setTimeout(() => {
            setActiveExplanationSection('quiz');
          }, 6000);
        }
      }, 5000);
    }
  };

  // Student Whiteboard Request Handler ("تتفاعل مع الطلب")
  const handleSubmitBoardRequest = async (overrideText?: string) => {
    const text = (overrideText || boardRequestInput).trim();
    if (!text || isSaraThinking) return;

    setBoardRequestInput('');
    setRequestNotice(isRtl ? 'سارة تستقبل طلبك وتكتب على السبورة... 🪄✨' : 'Sara is updating the whiteboard for you... 🪄✨');
    onSaraTriggerGesture?.('explaining');

    try {
      if (onRequestOnBoard) {
        await onRequestOnBoard(text);
      }
      setTimeout(() => {
        setRequestNotice(null);
      }, 4000);
    } catch (e) {
      console.warn('Board request error:', e);
      setRequestNotice(null);
    }
  };

  // Speech Recognition on Whiteboard
  const handleStartVoiceRequest = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(isRtl ? 'الميكروفون غير مدعوم في متصفحك الحالي، يمكنك كتابة طلبك في المربع' : 'Microphone not supported, please type your request');
      return;
    }

    try {
      if (requestRecognitionRef.current) {
        try { requestRecognitionRef.current.abort(); } catch (_) {}
      }

      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = isRtl ? 'ar-SA' : 'en-US';

      rec.onstart = () => {
        setIsListeningRequest(true);
        setRequestNotice(isRtl ? 'تحدث الآن، سارة تستمع لطلبك... 🎙️' : 'Speak now, Sara is listening... 🎙️');
      };

      rec.onresult = (e: any) => {
        const transcript = e.results?.[0]?.[0]?.transcript;
        if (transcript && transcript.trim()) {
          const userSpeech = transcript.trim();
          setBoardRequestInput(userSpeech);
          setIsListeningRequest(false);
          handleSubmitBoardRequest(userSpeech);
        }
      };

      rec.onerror = (err: any) => {
        console.warn('Whiteboard speech request error:', err);
        setIsListeningRequest(false);
        setRequestNotice(null);
      };

      rec.onend = () => {
        setIsListeningRequest(false);
      };

      requestRecognitionRef.current = rec;
      rec.start();
    } catch (err) {
      console.warn('Could not start whiteboard recognition:', err);
      setIsListeningRequest(false);
    }
  };

  const handleStopVoiceRequest = () => {
    if (requestRecognitionRef.current) {
      try { requestRecognitionRef.current.stop(); } catch (_) {}
      setIsListeningRequest(false);
      setRequestNotice(null);
    }
  };

  // 💡 Page-specific Quick Question Suggestions tailored to each of the 6 slide pages
  const getPageQuickQuestions = useCallback((sectionType?: string, rtl?: boolean): string[] => {
    if (rtl) {
      switch (sectionType) {
        case 'objective':
          return [
            'اشرحي لي معنى الجملة بأسلوب آخر 💡',
            'كيف أنطق هذه الجملة بطلاقة وسرعة؟ 🗣️',
            'هل تستخدم هذه الجملة في المحادثات اليومية؟ 🌟'
          ];
        case 'formula':
          return [
            'لماذا رُتِّبت الجملة بهذا الترتيب النحوي؟ 📐',
            'هل يمكن استخدام زمن أو صيغة أخرى؟ ✍️',
            'اعطيني تطبيقاً مختلفاً على هذه القاعدة 💡'
          ];
        case 'rules':
          return [
            'اعطيني مثالاً واقعياً إضافياً على هذه النقطة 📌',
            'كيف أربط بين هذه القاعدة وما تعلمته سابقاً؟ 🧠',
            'ما هي أهم نقطة يجب أن أركز عليها هنا؟ 🎯'
          ];
        case 'pitfalls':
          return [
            'لماذا يقع الكثير في هذا الخطأ الشائع؟ ⚠️',
            'كيف أثبت الصواب في ذاكرتي ولا أنساه؟ 🧠',
            'هل هناك فخاخ أخرى مشابهة لهذه النقطة؟ 🔍'
          ];
        case 'speaking':
          return [
            'انطقي لي هذه الكلمات ببطء وبوضوح 🎙️',
            'ضعي هذه المفردة في جملة محادثة حية 💬',
            'كيف أستخدم هذا التعبير في موقف حقيقي؟ 🌟'
          ];
        case 'quiz':
          return [
            'أعطني تلميحاً ذكياً قبل أن أحل السؤال 🎯',
            'اشرحي لي فكرة السؤال باختصار ❓',
            'كيف أفكر في استبعاد الخيارات الخاطئة؟ 💡'
          ];
        default:
          return [
            'اشرحي لي هذه النقطة بمثال إضافي 💡',
            'عندي استفسار عن هذه الجزئية 🎙️'
          ];
      }
    } else {
      switch (sectionType) {
        case 'objective':
          return [
            'Can you explain this model sentence simply? 💡',
            'How can I pronounce this naturally? 🗣️',
            'Is this common in daily conversations? 🌟'
          ];
        case 'formula':
          return [
            'Why is the sentence structured this way? 📐',
            'Can we use another tense here? ✍️',
            'Give me another formula example 💡'
          ];
        case 'rules':
          return [
            'Give me another real-life example 📌',
            'What is the most important takeaway here? 🎯'
          ];
        case 'pitfalls':
          return [
            'Why is this mistake so common? ⚠️',
            'How does the memory hook work? 🧠'
          ];
        case 'speaking':
          return [
            'Pronounce these words slowly for me 🎙️',
            'Use this word in a natural sentence 💬'
          ];
        case 'quiz':
          return [
            'Give me a helpful hint for this question 🎯',
            'Explain what this question is testing ❓'
          ];
        default:
          return [
            'Explain this with another example 💡',
            'I have a question about this part 🎙️'
          ];
      }
    }
  }, []);

  // 🎙️ Start listening to the student's question on the current page before turning
  const handleStartPageVoiceQuestion = useCallback((page?: WhiteboardSlidePage) => {
    cancelAutoAdvance();
    onStopSpeak?.();
    setShowPageQuestionBox(true);

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setPageQuestionNotice(isRtl ? 'الميكروفون غير متاح في متصفحك، يمكنك كتابة سؤالك في المربع لسارة' : 'Microphone unavailable, you can type your question here');
      return;
    }

    try {
      if (pageQuestionRecognitionRef.current) {
        try { pageQuestionRecognitionRef.current.abort(); } catch (_) {}
      }

      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = true;
      rec.lang = isRtl ? 'ar-SA' : 'en-US';

      const pageTitle = page ? (isRtl ? page.titleAr : page.titleEn) : (isRtl ? 'هذه الصفحة' : 'this page');

      rec.onstart = () => {
        setIsListeningPageQuestion(true);
        setPageQuestionNotice(isRtl ? `سارة تستمع لسؤالك عن "${pageTitle}".. تكلّم الآن 🎙️` : `Sara is listening to your question about "${pageTitle}".. Speak now 🎙️`);
      };

      rec.onresult = (e: any) => {
        const results = e.results;
        const transcript = results[results.length - 1][0].transcript;
        if (transcript && transcript.trim()) {
          setPageQuestionInput(transcript.trim());
        }
      };

      rec.onerror = (err: any) => {
        console.warn('Page question voice error:', err);
        setIsListeningPageQuestion(false);
        if (err.error === 'not-allowed') {
          setPageQuestionNotice(isRtl ? 'يرجى السماح بالوصول للمايك من إعدادات المتصفح، أو كتابة سؤالك في المربع' : 'Please allow mic access in your browser or type your question');
        } else {
          setPageQuestionNotice(isRtl ? 'انتهى الاستماع، راجع سؤالك واضغط إرسال لسارة 🚀' : 'Listening ended, review and send your question to Sara 🚀');
        }
      };

      rec.onend = () => {
        setIsListeningPageQuestion(false);
      };

      pageQuestionRecognitionRef.current = rec;
      rec.start();
    } catch (err) {
      console.warn('Could not start page question speech recognition:', err);
      setIsListeningPageQuestion(false);
    }
  }, [cancelAutoAdvance, isRtl, onStopSpeak]);

  const handleStopPageVoiceQuestion = useCallback(() => {
    if (pageQuestionRecognitionRef.current) {
      try { pageQuestionRecognitionRef.current.stop(); } catch (_) {}
      setIsListeningPageQuestion(false);
    }
  }, []);

  const handleSubmitPageQuestion = useCallback(async (customText?: string) => {
    const rawQuestion = (customText !== undefined ? customText : pageQuestionInput).trim();
    if (!rawQuestion) return;

    handleStopPageVoiceQuestion();
    cancelAutoAdvance();

    const targetPage = whiteboardPages[currentPageIndex];
    const pageTitle = targetPage ? (isRtl ? targetPage.titleAr : targetPage.titleEn) : (isRtl ? 'هذه الصفحة' : 'this slide');
    const pageSub = targetPage ? (isRtl ? targetPage.subtitleAr : targetPage.subtitleEn) : '';

    const formattedRequest = isRtl
      ? `سارة، لدي سؤال عن جزئية صفحة (${pageTitle}${pageSub ? ` - ${pageSub}` : ''}): "${rawQuestion}"`
      : `Teacher Sara, I have a question about slide (${pageTitle}${pageSub ? ` - ${pageSub}` : ''}): "${rawQuestion}"`;

    setPageQuestionNotice(isRtl ? `سارة تشرح لك الآن إجابة سؤالك عن "${pageTitle}"... 🌸` : `Sara is answering your question about "${pageTitle}"... 🌸`);
    
    try {
      if (onRequestOnBoard) {
        await onRequestOnBoard(formattedRequest);
      }
    } catch (err) {
      console.warn('Error submitting page question:', err);
    }

    setPageQuestionInput('');
    setTimeout(() => {
      setShowPageQuestionBox(false);
      setPageQuestionNotice(null);
    }, 4500);
  }, [cancelAutoAdvance, currentPageIndex, handleStopPageVoiceQuestion, isRtl, onRequestOnBoard, pageQuestionInput, whiteboardPages]);

  // Animate Chalk Drawing on Canvas Tab
  const handleDrawChalkExplanation = () => {
    setActiveTab('draw');
    saveState();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    // Draw realistic teacher chalkboard header and notes
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Chalk border
    ctx.strokeStyle = 'rgba(253, 230, 138, 0.45)';
    ctx.lineWidth = 3;
    ctx.setLineDash([12, 6]);
    ctx.strokeRect(20, 20, width - 40, height - 40);
    ctx.setLineDash([]);

    // Teacher chalkboard title
    ctx.font = 'bold 22px "Comic Sans MS", "Caveat", cursive, sans-serif';
    ctx.fillStyle = '#FDE68A';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(253, 230, 138, 0.6)';
    ctx.shadowBlur = 8;
    ctx.fillText(`✎ ${boardData?.title || 'Teacher Sara Chalkboard'}`, width / 2, 55);

    // Formula or sentence
    if (boardData?.formula) {
      ctx.font = 'bold 18px monospace, sans-serif';
      ctx.fillStyle = '#67E8F9';
      ctx.fillText(`[Rule]: ${boardData.formula}`, width / 2, 105);
    }

    if (boardData?.sentence) {
      ctx.font = 'bold 20px "Comic Sans MS", "Caveat", cursive, sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(`"${boardData.sentence}"`, width / 2, 155);

      // Chalk underline under highlight
      if (boardData.highlight) {
        ctx.strokeStyle = '#FBBF24';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(width / 2 - 120, 172);
        ctx.lineTo(width / 2 + 120, 172);
        ctx.stroke();
      }
    }

    // Notes
    if (Array.isArray(boardData?.notes) && boardData.notes.length > 0) {
      ctx.font = '15px system-ui, sans-serif';
      ctx.textAlign = isRtl ? 'right' : 'left';
      ctx.fillStyle = '#E2E8F0';
      const textX = isRtl ? width - 50 : 50;
      let startY = 220;
      boardData.notes.slice(0, 3).forEach((n, idx) => {
        ctx.fillText(`★ ${n}`, textX, startY + idx * 36);
      });
    }

    ctx.restore();
    playSnapshotShutterSound();
    onSaraTriggerGesture?.('pointing');

    if (boardData?.sentence) {
      onSpeak(boardData.sentence);
    }
  };
  
  // Custom Size and Scaling State (التحكم بحجم السبورة تكبيراً وتصغيراً حسب الرغبة)
  const [customSize, setCustomSize] = useState<{ width: number; height: number }>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('alkhalil_whiteboard_size');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed.width === 'number' && typeof parsed.height === 'number') {
            const maxW = window.innerWidth - 20;
            const maxH = window.innerHeight - 24;
            return {
              width: Math.min(maxW, parsed.width),
              height: Math.min(maxH, parsed.height)
            };
          }
        } catch (e) {}
      }
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isTablet = w >= 640 && w <= 1200;
      if (isTablet) {
        const isLandscape = w >= h;
        // Perfect proportions for iPad Mini, iPad 10.2", iPad Air 10.9", iPad Pro 11", and Android tablets
        const availW = w - 96; // accounts for 80px tablet rail + margins
        const availH = h - 84; // accounts for 64px tablet top bar + margins
        return {
          width: Math.min(isLandscape ? 980 : 700, Math.round(availW * 0.98)),
          height: Math.min(isLandscape ? 680 : 860, Math.round(availH * 0.95))
        };
      }
      if (w < 640) {
        return {
          width: Math.round(w * 0.96),
          height: Math.round(h * 0.84)
        };
      }
    }
    return { width: 880, height: 640 };
  });
  const [showSizeMenu, setShowSizeMenu] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const sizeMenuRef = useRef<HTMLDivElement>(null);
  const resizeStartRef = useRef<{
    startX: number;
    startY: number;
    startW: number;
    startH: number;
    corner: 'bottom-left' | 'bottom-right' | 'bottom' | 'left' | 'right';
  } | null>(null);

  const updateBoardSize = useCallback((newWidth: number, newHeight: number) => {
    const maxWidth = typeof window !== 'undefined' ? window.innerWidth - 24 : 1400;
    const maxHeight = typeof window !== 'undefined' ? window.innerHeight - 32 : 900;
    const clampedW = Math.round(Math.max(360, Math.min(maxWidth, newWidth)));
    const clampedH = Math.round(Math.max(360, Math.min(maxHeight, newHeight)));
    const next = { width: clampedW, height: clampedH };
    setCustomSize(next);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('alkhalil_whiteboard_size', JSON.stringify(next));
      } catch (e) {}
    }
  }, []);

  const handleScaleUp = () => {
    if (isMaximized) setIsMaximized(false);
    updateBoardSize(customSize.width * 1.15, customSize.height * 1.15);
  };

  const handleScaleDown = () => {
    if (isMaximized) setIsMaximized(false);
    updateBoardSize(customSize.width * 0.85, customSize.height * 0.85);
  };

  const handleResetSize = () => {
    if (isMaximized) setIsMaximized(false);
    updateBoardSize(780, 600);
  };

  const handleApplyPreset = (w: number, h: number) => {
    if (isMaximized) setIsMaximized(false);
    updateBoardSize(w, h);
    setShowSizeMenu(false);
  };

  const handleApplyTabletPreset = () => {
    if (typeof window !== 'undefined') {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isLandscape = w >= h;
      const targetW = Math.min(isLandscape ? 980 : 700, Math.round((w - 96) * 0.98));
      const targetH = Math.min(isLandscape ? 680 : 860, Math.round((h - 84) * 0.95));
      handleApplyPreset(targetW, targetH);
    } else {
      handleApplyPreset(880, 660);
    }
  };

  const startCornerResize = (e: React.MouseEvent | React.TouchEvent, corner: 'bottom-left' | 'bottom-right' | 'bottom' | 'left' | 'right') => {
    e.preventDefault();
    e.stopPropagation();
    if (isMaximized) setIsMaximized(false);

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    resizeStartRef.current = {
      startX: clientX,
      startY: clientY,
      startW: customSize.width,
      startH: customSize.height,
      corner
    };
    setIsResizing(true);
  };

  useEffect(() => {
    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!resizeStartRef.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      
      const deltaY = clientY - resizeStartRef.current.startY;
      let deltaX = clientX - resizeStartRef.current.startX;
      
      if (resizeStartRef.current.corner === 'bottom-left' || resizeStartRef.current.corner === 'left') {
        deltaX = -deltaX;
      }
      
      const newW = resizeStartRef.current.corner === 'bottom'
        ? resizeStartRef.current.startW
        : resizeStartRef.current.startW + deltaX;
      const newH = (resizeStartRef.current.corner === 'left' || resizeStartRef.current.corner === 'right')
        ? resizeStartRef.current.startH
        : resizeStartRef.current.startH + deltaY;

      updateBoardSize(newW, newH);
    };

    const onPointerUp = () => {
      if (resizeStartRef.current) {
        resizeStartRef.current = null;
        setIsResizing(false);
      }
    };

    if (isResizing) {
      window.addEventListener('mousemove', onPointerMove);
      window.addEventListener('mouseup', onPointerUp);
      window.addEventListener('touchmove', onPointerMove, { passive: false });
      window.addEventListener('touchend', onPointerUp);
    }

    return () => {
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
    };
  }, [isResizing, updateBoardSize]);

  // Click outside to close size menu
  useEffect(() => {
    if (!showSizeMenu) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (sizeMenuRef.current && !sizeMenuRef.current.contains(e.target as Node)) {
        setShowSizeMenu(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [showSizeMenu]);

  const dragControls = useDragControls();
  const [positionKey, setPositionKey] = useState(0);

  const currentTheme = useMemo(() => {
    let resolvedId = activeThemeId;
    if (resolvedId === 'summer_peach_sunrise') resolvedId = 'summer_peach';
    if (resolvedId === 'azure_ocean') resolvedId = 'ocean_waves';
    if (resolvedId === 'tropical_hibiscus') resolvedId = 'tropical_sunset';
    return WHITEBOARD_THEMES.find(t => t.id === resolvedId) || WHITEBOARD_THEMES[0];
  }, [activeThemeId]);

  // Auto-adapt pen color if user selects white theme and current pen is white
  useEffect(() => {
    if (currentTheme.isLight && selectedColor === '#FFFFFF') {
      setSelectedColor('#1E293B');
    } else if (!currentTheme.isLight && selectedColor === '#1E293B') {
      setSelectedColor('#FACC15');
    }
  }, [activeThemeId]);

  const resetPosition = () => {
    setPositionKey(prev => prev + 1);
  };

  // Resize canvas when opened, tab changed, window resized, or custom size adjusted
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      const width = Math.max(320, rect.width);
      const height = Math.max(380, rect.height);

      const ctx = canvas.getContext('2d');
      let prevData: ImageData | null = null;
      if (ctx && canvas.width > 0 && canvas.height > 0) {
        try {
          prevData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        } catch (e) {}
      }

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (prevData) {
          try {
            ctx.putImageData(prevData, 0, 0);
          } catch (e) {}
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isOpen, isMaximized, activeTab, customSize.width, customSize.height]);

  // Save state for undo/redo
  const saveState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    try {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory(prev => [...prev.slice(-25), data]);
      // Clear redo history on new action
      setRedoHistory([]);
    } catch (e) {}
  }, []);

  // Step-by-Step Undo
  const undoLastStroke = () => {
    const canvas = canvasRef.current;
    if (!canvas || history.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      // Save current state to redoHistory before undoing
      const currentData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setRedoHistory(prev => [...prev.slice(-25), currentData]);
    } catch (e) {}

    const newHistory = [...history];
    const previous = newHistory.pop();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (previous) {
      ctx.putImageData(previous, 0, 0);
    }
    setHistory(newHistory);
  };

  // Step-by-Step Redo
  const redoStroke = () => {
    const canvas = canvasRef.current;
    if (!canvas || redoHistory.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      // Save current state to history before redoing
      const currentData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory(prev => [...prev.slice(-25), currentData]);
    } catch (e) {}

    const newRedo = [...redoHistory];
    const nextState = newRedo.pop();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (nextState) {
      ctx.putImageData(nextState, 0, 0);
    }
    setRedoHistory(newRedo);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    saveState();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Stamp Kid Sticker on Canvas
  const stampStickerOnCanvas = (emoji: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    saveState();
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    // Stamp with slight random offset from center
    const posX = width / 2 + (Math.random() - 0.5) * (width * 0.45);
    const posY = height / 2 + (Math.random() - 0.5) * (height * 0.4);

    ctx.save();
    ctx.font = '54px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 10;
    ctx.fillText(emoji, posX, posY);
    ctx.restore();

    playSnapshotShutterSound();
    setShowStickerPicker(false);
  };

  // Apply Educational Template to Whiteboard
  const applyWhiteboardTemplate = (templateId: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    saveState();
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const textColor = currentTheme.isLight ? '#0F172A' : '#FFFFFF';
    const accentColor = currentTheme.borderHex || '#FACC15';
    const gridColor = currentTheme.isLight ? '#94A3B8' : '#64748B';

    if (templateId === 'four_lines') {
      const lineSpacing = 32;
      const startY = Math.max(65, (height - (lineSpacing * 3 * 3)) / 2);

      for (let set = 0; set < 3; set++) {
        const topY = startY + set * (lineSpacing * 3 + 45);
        if (topY + lineSpacing * 3 > height - 30) break;

        // Top line (Headline) - Solid Blue
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 2;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(35, topY);
        ctx.lineTo(width - 35, topY);
        ctx.stroke();

        // Midline - Dashed Amber
        ctx.strokeStyle = '#FBBF24';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([8, 6]);
        ctx.beginPath();
        ctx.moveTo(35, topY + lineSpacing);
        ctx.lineTo(width - 35, topY + lineSpacing);
        ctx.stroke();

        // Baseline - Solid Emerald
        ctx.strokeStyle = '#34D399';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(35, topY + lineSpacing * 2);
        ctx.lineTo(width - 35, topY + lineSpacing * 2);
        ctx.stroke();

        // Descender line - Dashed Rose
        ctx.strokeStyle = '#F43F5E';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.moveTo(35, topY + lineSpacing * 3);
        ctx.lineTo(width - 35, topY + lineSpacing * 3);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.font = 'bold 12px monospace';
        ctx.fillStyle = gridColor;
        ctx.textAlign = 'left';
        ctx.fillText(`Set ${set + 1}: Practice English alphabet handwriting`, 40, topY - 8);
      }
    } else if (templateId === 'tenses') {
      const midY = height / 2;
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(50, midY);
      ctx.lineTo(width - 50, midY);
      ctx.stroke();

      // Arrow tip
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.moveTo(width - 40, midY);
      ctx.lineTo(width - 60, midY - 12);
      ctx.lineTo(width - 60, midY + 12);
      ctx.closePath();
      ctx.fill();

      const colWidth = (width - 140) / 3;
      const stages = [
        { title: 'PAST (الماضي)', sub: 'Yesterday / -ed / did', emoji: '⏮️', x: 70 + colWidth * 0.5 },
        { title: 'PRESENT (الحاضر)', sub: 'Now / -s / am, is, are', emoji: '▶️', x: 70 + colWidth * 1.5 },
        { title: 'FUTURE (المستقبل)', sub: 'Tomorrow / will / going to', emoji: '⏭️', x: 70 + colWidth * 2.5 }
      ];

      stages.forEach(st => {
        ctx.fillStyle = accentColor;
        ctx.beginPath();
        ctx.arc(st.x, midY, 13, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = currentTheme.isLight ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.6)';
        ctx.strokeStyle = currentTheme.borderHex;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(st.x - 85, midY - 95, 170, 72, 14);
        ctx.fill();
        ctx.stroke();

        ctx.textAlign = 'center';
        ctx.font = '900 14px system-ui, sans-serif';
        ctx.fillStyle = textColor;
        ctx.fillText(`${st.emoji} ${st.title}`, st.x, midY - 65);

        ctx.font = 'bold 11px system-ui, sans-serif';
        ctx.fillStyle = gridColor;
        ctx.fillText(st.sub, st.x, midY - 42);

        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(st.x, midY - 23);
        ctx.lineTo(st.x, midY);
        ctx.stroke();
        ctx.setLineDash([]);
      });
    } else if (templateId === 'comparative') {
      const startX = 35;
      const startY = 65;
      const tableWidth = width - 70;
      const colW = tableWidth / 3;
      const rowH = 50;

      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.roundRect(startX, startY, tableWidth, 44, [12, 12, 0, 0]);
      ctx.fill();

      const headers = [
        '1. Positive (الصفة الأصلية)',
        '2. Comparative (المقارنة)',
        '3. Superlative (التفضيل)'
      ];

      ctx.font = '900 13px system-ui, sans-serif';
      ctx.fillStyle = '#0F172A';
      ctx.textAlign = 'center';
      headers.forEach((h, idx) => {
        ctx.fillText(h, startX + colW * idx + colW / 2, startY + 27);
      });

      for (let r = 0; r < 4; r++) {
        const y = startY + 44 + r * rowH;
        ctx.fillStyle = r % 2 === 0 ? (currentTheme.isLight ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.35)') : (currentTheme.isLight ? 'rgba(240,240,240,0.85)' : 'rgba(255,255,255,0.06)');
        ctx.fillRect(startX, y, tableWidth, rowH);

        ctx.strokeStyle = currentTheme.isLight ? '#CBD5E1' : 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 1;
        ctx.strokeRect(startX, y, tableWidth, rowH);
        ctx.strokeRect(startX + colW, y, colW, rowH);
        ctx.strokeRect(startX + colW * 2, y, colW, rowH);
      }
    } else if (templateId === 'family_tree') {
      const centerX = width / 2;
      ctx.fillStyle = '#854D0E';
      ctx.beginPath();
      ctx.roundRect(centerX - 50, height - 110, 100, 75, 12);
      ctx.fill();

      ctx.textAlign = 'center';
      ctx.font = '900 14px system-ui, sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText('ROOT WORD', centerX, height - 78);
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.fillText('(أصل الكلمة)', centerX, height - 58);

      const branches = [
        { name: 'NOUN (الاسم)', sub: 'e.g. Success', x: centerX - 180, y: height - 230, color: '#38BDF8' },
        { name: 'VERB (الفعل)', sub: 'e.g. Succeed', x: centerX - 60, y: height - 270, color: '#34D399' },
        { name: 'ADJECTIVE (الصفة)', sub: 'e.g. Successful', x: centerX + 60, y: height - 270, color: '#FBBF24' },
        { name: 'ADVERB (الظرف)', sub: 'e.g. Successfully', x: centerX + 180, y: height - 230, color: '#F472B6' }
      ];

      branches.forEach(b => {
        ctx.strokeStyle = '#78350F';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(centerX, height - 110);
        ctx.quadraticCurveTo(centerX, b.y + 40, b.x, b.y + 20);
        ctx.stroke();

        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.roundRect(b.x - 65, b.y - 28, 130, 56, 14);
        ctx.fill();

        ctx.fillStyle = '#0F172A';
        ctx.font = '900 12px system-ui, sans-serif';
        ctx.fillText(b.name, b.x, b.y - 7);
        ctx.font = 'bold 10px system-ui, sans-serif';
        ctx.fillText(b.sub, b.x, b.y + 12);
      });
    } else if (templateId === 'irregular_verbs') {
      const startX = 35;
      const startY = 65;
      const tableWidth = width - 70;
      const colW = tableWidth / 3;
      const rowH = 46;

      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.roundRect(startX, startY, tableWidth, 42, [12, 12, 0, 0]);
      ctx.fill();

      ctx.font = '900 13px system-ui, sans-serif';
      ctx.fillStyle = '#0F172A';
      ctx.textAlign = 'center';
      ctx.fillText('Base Form (المصدر V1)', startX + colW * 0.5, startY + 26);
      ctx.fillText('Past Simple (الماضي V2)', startX + colW * 1.5, startY + 26);
      ctx.fillText('Past Participle (اسم المفعول V3)', startX + colW * 2.5, startY + 26);

      const sampleRows = [
        ['go', 'went', 'gone'],
        ['see', 'saw', 'seen'],
        ['write', 'wrote', 'written'],
        ['speak', 'spoke', 'spoken'],
        ['take', 'took', 'taken']
      ];

      sampleRows.forEach((row, rIdx) => {
        const y = startY + 42 + rIdx * rowH;
        ctx.fillStyle = rIdx % 2 === 0 ? (currentTheme.isLight ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.35)') : (currentTheme.isLight ? 'rgba(240,240,240,0.85)' : 'rgba(255,255,255,0.06)');
        ctx.fillRect(startX, y, tableWidth, rowH);

        ctx.strokeStyle = currentTheme.isLight ? '#CBD5E1' : 'rgba(255,255,255,0.15)';
        ctx.strokeRect(startX, y, tableWidth, rowH);

        ctx.font = 'bold 14px monospace';
        ctx.fillStyle = textColor;
        ctx.fillText(row[0], startX + colW * 0.5, y + 28);
        ctx.fillStyle = '#F59E0B';
        ctx.fillText(row[1], startX + colW * 1.5, y + 28);
        ctx.fillStyle = '#10B981';
        ctx.fillText(row[2], startX + colW * 2.5, y + 28);
      });
    }

    ctx.restore();
    playSnapshotShutterSound();
    setShowTemplatePicker(false);
  };

  const activePointerTypeRef = useRef<string | null>(null);

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement> | React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0, pressure: 0.5, pointerType: 'mouse' };
    const rect = canvas.getBoundingClientRect();
    
    if ('pointerType' in e) {
      const pe = e as React.PointerEvent;
      const pressure = pe.pressure && pe.pressure > 0 ? pe.pressure : 0.5;
      return {
        x: pe.clientX - rect.left,
        y: pe.clientY - rect.top,
        pressure,
        pointerType: pe.pointerType
      };
    } else if ('touches' in e && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
        pressure: 0.5,
        pointerType: 'touch'
      };
    } else if ('clientX' in e) {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        pressure: 0.5,
        pointerType: 'mouse'
      };
    }
    return { x: 0, y: 0, pressure: 0.5, pointerType: 'mouse' };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement> | React.PointerEvent<HTMLCanvasElement>) => {
    if ('touches' in e && e.cancelable) {
      e.preventDefault();
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y, pressure, pointerType } = getCanvasCoords(e);

    // Palm rejection on tablets: If student is drawing with an Apple Pencil or stylus, ignore inadvertent palm touches
    if (activePointerTypeRef.current === 'pen' && pointerType === 'touch') {
      return;
    }
    if (pointerType === 'pen') {
      activePointerTypeRef.current = 'pen';
    }

    saveState();
    setIsDrawing(true);

    ctx.beginPath();
    ctx.moveTo(x, y);

    // Dynamic width calculation based on Apple Pencil / Stylus pressure
    const dynamicWidth = pointerType === 'pen' && pressure > 0 
      ? lineWidth * (0.65 + pressure * 0.7) 
      : lineWidth;

    if (selectedTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = Math.max(18, dynamicWidth * 3.5);
      ctx.shadowBlur = 0;
    } else if (selectedTool === 'highlighter') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = `${selectedColor}55`; // translucent glow
      ctx.lineWidth = dynamicWidth * 3.5;
      ctx.shadowBlur = 0;
    } else if (selectedTool === 'glow') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = dynamicWidth;
      ctx.shadowColor = selectedColor;
      ctx.shadowBlur = 14;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = dynamicWidth;
      ctx.shadowBlur = 0;
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement> | React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    if ('touches' in e && e.cancelable) {
      e.preventDefault();
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y, pressure, pointerType } = getCanvasCoords(e);

    // Ignore palm touches while pen is active
    if (activePointerTypeRef.current === 'pen' && pointerType === 'touch') {
      return;
    }

    // Dynamic pressure responsiveness for Apple Pencil / Stylus
    if (pointerType === 'pen' && pressure > 0 && selectedTool !== 'highlighter') {
      const dynamicWidth = selectedTool === 'eraser' 
        ? Math.max(18, lineWidth * (0.65 + pressure * 0.7) * 3.5)
        : lineWidth * (0.65 + pressure * 0.7);
      ctx.lineWidth = dynamicWidth;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    activePointerTypeRef.current = null;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.closePath();
    ctx.shadowBlur = 0;
  };

  // ========================================================
  // 3. MASTER "SAVE WHITEBOARD AS IMAGE" ENGINE
  // ========================================================
  const saveWhiteboardAsImage = () => {
    try {
      playSnapshotShutterSound();

      const exportWidth = 1200;
      let estimatedHeight = 720;
      if (boardData?.formula) estimatedHeight += 110;
      if (boardData?.sentence) estimatedHeight += 120;
      if (boardData?.correction) estimatedHeight += 90;
      if (Array.isArray(boardData?.notes) && boardData.notes.length > 0) estimatedHeight += boardData.notes.length * 45 + 50;
      if (boardData?.diagram) estimatedHeight += 140;
      if (boardData?.quiz) estimatedHeight += 140;

      const exportHeight = Math.max(850, estimatedHeight);

      const exportCanvas = document.createElement('canvas');
      exportCanvas.width = exportWidth;
      exportCanvas.height = exportHeight;
      const ctx = exportCanvas.getContext('2d');
      if (!ctx) return;

      // 1. Draw themed background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, exportWidth, exportHeight);
      bgGrad.addColorStop(0, currentTheme.bgHex);
      bgGrad.addColorStop(1, currentTheme.gradientToHex);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, exportWidth, exportHeight);

      // 2. Draw subtle grid
      ctx.strokeStyle = currentTheme.gridColor;
      ctx.lineWidth = 1.5;
      for (let x = 0; x < exportWidth; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, exportHeight);
        ctx.stroke();
      }
      for (let y = 0; y < exportHeight; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(exportWidth, y);
        ctx.stroke();
      }

      // 3. Draw outer frame
      ctx.lineWidth = 14;
      ctx.strokeStyle = currentTheme.borderHex;
      ctx.strokeRect(7, 7, exportWidth - 14, exportHeight - 14);

      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.strokeRect(16, 16, exportWidth - 32, exportHeight - 32);

      // 4. Header Bar Banner
      ctx.fillStyle = currentTheme.isLight ? '#0F172A' : '#140E06';
      ctx.fillRect(18, 18, exportWidth - 36, 95);

      ctx.fillStyle = currentTheme.borderHex;
      ctx.fillRect(18, 110, exportWidth - 36, 4);

      ctx.textAlign = 'right';
      ctx.fillStyle = currentTheme.borderHex;
      ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
      ctx.fillText('أكاديمية باسم الخليل للغة الإنجليزية 🏛️', exportWidth - 50, 52);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '900 30px system-ui, -apple-system, sans-serif';
      const title = boardData?.title || 'لوحة الشرح التفاعلية مع المعلمة سارة 👩‍🏫';
      ctx.fillText(title, exportWidth - 50, 92);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#94A3B8';
      ctx.font = 'bold 15px monospace';
      const now = new Date();
      const dateStr = now.toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' });
      ctx.fillText(`🗓️ ${dateStr}`, 45, 55);
      ctx.fillStyle = currentTheme.borderHex;
      ctx.font = 'bold 16px system-ui, sans-serif';
      ctx.fillText('شرح المعلمة سارة 👩‍🏫', 45, 88);

      // 5. Draw Content Blocks
      let curY = 150;
      const textMainColor = currentTheme.isLight ? '#0F172A' : '#FFFFFF';
      const textSecondaryColor = currentTheme.isLight ? '#334155' : '#CBD5E1';

      if (boardData?.formula) {
        ctx.fillStyle = currentTheme.isLight ? '#EFF6FF' : 'rgba(196, 158, 58, 0.18)';
        ctx.strokeStyle = currentTheme.borderHex;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(50, curY, exportWidth - 100, 75, 18);
        ctx.fill();
        ctx.stroke();

        ctx.textAlign = 'right';
        ctx.fillStyle = currentTheme.isLight ? '#0369A1' : '#FDE68A';
        ctx.font = 'bold 15px system-ui, sans-serif';
        ctx.fillText('قاعدة وتكوين الجملة 📐', exportWidth - 75, curY + 28);

        ctx.textAlign = 'center';
        ctx.fillStyle = currentTheme.isLight ? '#0F172A' : '#FFFFFF';
        ctx.font = '900 24px monospace';
        ctx.fillText(boardData.formula, exportWidth / 2, curY + 58);

        curY += 95;
      }

      if (boardData?.sentence) {
        ctx.fillStyle = currentTheme.isLight ? '#FFFFFF' : 'rgba(0, 0, 0, 0.55)';
        ctx.strokeStyle = currentTheme.isLight ? '#CBD5E1' : 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(50, curY, exportWidth - 100, 95, 20);
        ctx.fill();
        ctx.stroke();

        ctx.textAlign = 'right';
        ctx.fillStyle = currentTheme.isLight ? '#0284C7' : '#FCD34D';
        ctx.font = 'bold 15px system-ui, sans-serif';
        ctx.fillText('الجملة المستهدفة للشرح 🎯', exportWidth - 75, curY + 30);

        ctx.textAlign = 'center';
        ctx.fillStyle = textMainColor;
        ctx.font = '900 26px system-ui, sans-serif';
        ctx.fillText(`"${boardData.sentence}"`, exportWidth / 2, curY + 68);

        curY += 115;
      }

      if (boardData?.correction) {
        const cardWidth = exportWidth - 100;
        ctx.fillStyle = currentTheme.isLight ? '#F1F5F9' : 'rgba(0, 0, 0, 0.4)';
        ctx.strokeStyle = currentTheme.isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(50, curY, cardWidth, 70, 16);
        ctx.fill();
        ctx.stroke();

        ctx.textAlign = 'center';
        ctx.font = 'bold 20px system-ui, sans-serif';
        ctx.fillStyle = '#EF4444';
        ctx.fillText(`❌ الخطأ: ${boardData.correction.wrong}`, exportWidth / 2 - 200, curY + 43);

        ctx.fillStyle = currentTheme.borderHex;
        ctx.fillText('➔', exportWidth / 2, curY + 43);

        ctx.fillStyle = '#10B981';
        ctx.fillText(`✅ الصواب: ${boardData.correction.right}`, exportWidth / 2 + 200, curY + 43);

        curY += 90;
      }

      if (Array.isArray(boardData?.notes) && boardData.notes.length > 0) {
        const notesBoxHeight = 45 + boardData.notes.length * 36;
        ctx.fillStyle = currentTheme.isLight ? '#FFFFFF' : 'rgba(0, 0, 0, 0.35)';
        ctx.strokeStyle = currentTheme.isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(50, curY, exportWidth - 100, notesBoxHeight, 20);
        ctx.fill();
        ctx.stroke();

        ctx.textAlign = 'right';
        ctx.fillStyle = currentTheme.isLight ? '#B45309' : '#FCD34D';
        ctx.font = '900 17px system-ui, sans-serif';
        ctx.fillText('نقاط الشرح الذهبية من المعلمة سارة 💡', exportWidth - 75, curY + 30);

        ctx.font = 'bold 18px system-ui, sans-serif';
        ctx.fillStyle = textSecondaryColor;
        boardData.notes.forEach((note, idx) => {
          const itemY = curY + 62 + idx * 34;
          ctx.fillStyle = currentTheme.borderHex;
          ctx.fillText('✦', exportWidth - 80, itemY);
          ctx.fillStyle = textMainColor;
          ctx.fillText(note, exportWidth - 105, itemY);
        });

        curY += notesBoxHeight + 20;
      }

      if (boardData?.diagram && Array.isArray(boardData.diagram.items) && boardData.diagram.items.length > 0) {
        ctx.fillStyle = currentTheme.isLight ? '#FFFFFF' : 'rgba(0, 0, 0, 0.35)';
        ctx.strokeStyle = currentTheme.isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(50, curY, exportWidth - 100, 95, 20);
        ctx.fill();
        ctx.stroke();

        ctx.textAlign = 'right';
        ctx.fillStyle = currentTheme.isLight ? '#0284C7' : '#38BDF8';
        ctx.font = '900 16px system-ui, sans-serif';
        ctx.fillText(boardData.diagram.label || 'المفردات والتراكيب 🌟', exportWidth - 75, curY + 28);

        const colWidth = (exportWidth - 140) / Math.min(3, boardData.diagram.items.length);
        boardData.diagram.items.slice(0, 3).forEach((item, i) => {
          const colX = exportWidth - 75 - (i * colWidth);
          ctx.textAlign = 'right';
          ctx.fillStyle = textMainColor;
          ctx.font = '900 17px system-ui, sans-serif';
          ctx.fillText(`${item.icon || '📌'} ${item.title}`, colX, curY + 58);
          ctx.fillStyle = textSecondaryColor;
          ctx.font = 'normal 14px system-ui, sans-serif';
          ctx.fillText(item.desc, colX, curY + 80);
        });

        curY += 115;
      }

      // Draw User Chalk Drawings OVERLAY
      const studentCanvas = canvasRef.current;
      if (studentCanvas && studentCanvas.width > 0 && studentCanvas.height > 0) {
        ctx.drawImage(studentCanvas, 50, 140, exportWidth - 100, exportHeight - 220);
      }

      // Footer
      ctx.fillStyle = currentTheme.isLight ? '#0F172A' : '#140E06';
      ctx.fillRect(18, exportHeight - 65, exportWidth - 36, 47);

      ctx.textAlign = 'right';
      ctx.fillStyle = currentTheme.borderHex;
      ctx.font = 'bold 16px system-ui, sans-serif';
      ctx.fillText('احتفظ بهذه البطاقة للمراجعة والتميز الأكاديمي 🌟🎓', exportWidth - 45, exportHeight - 35);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#94A3B8';
      ctx.font = 'bold 14px system-ui, sans-serif';
      ctx.fillText('سارة - رفيقتك الذكية لتعلم الإنجليزية 👩‍🏫', 45, exportHeight - 35);

      const cleanTitle = (boardData?.title || 'شرح_سارة')
        .replace(/[^\w\u0600-\u06FF\s-]/g, '')
        .trim()
        .replace(/\s+/g, '_')
        .slice(0, 30);

      const fileName = `بطاقة_شرح_سارة_${cleanTitle}_${Date.now()}.png`;
      const link = document.createElement('a');
      link.download = fileName;
      link.href = exportCanvas.toDataURL('image/png', 1.0);
      link.click();

      setSaveSuccessMessage(isRtl ? 'تم حفظ لوحة الشرح كصورة بنجاح! 📸🎉 يمكنك الآن مراجعتها في أي وقت.' : 'Whiteboard image saved successfully! 📸🎉');
      setTimeout(() => {
        setSaveSuccessMessage(null);
      }, 4000);

    } catch (err) {
      console.error('Error saving whiteboard image:', err);
    }
  };

  if (!isOpen) return null;

  // Minimized floating dock pill (عند تصغير السبورة كشريط عائم)
  if (isMinimized) {
    return (
      <AnimatePresence>
        <motion.div
          key="smart-whiteboard-minimized-dock"
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          className="fixed bottom-5 end-5 z-50 flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-900/98 backdrop-blur-md rounded-2xl border-2 shadow-2xl cursor-pointer hover:scale-105 active:scale-95 transition-all select-none"
          style={{
            borderColor: currentTheme.borderHex,
            boxShadow: `0 12px 30px rgba(0, 0, 0, 0.6), 0 0 20px ${currentTheme.borderHex}55`,
          }}
          onClick={() => setIsMinimized(false)}
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          <div 
            className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-950 font-black text-sm shrink-0 shadow-inner"
            style={{ backgroundColor: currentTheme.borderHex }}
          >
            {currentTheme.emoji}
          </div>
          <div className="flex flex-col text-start min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-white truncate">
                {isRtl ? 'السبورة الذكية 📐' : 'Smart Whiteboard 📐'}
              </span>
              <span className="text-[10px] text-amber-300 font-black px-1.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 font-mono">
                {customSize.width}×{customSize.height}
              </span>
            </div>
            <span className="text-[10px] text-amber-200/80 font-bold truncate">
              {isRtl ? 'انقر لتكبير السبورة وإعادتها' : 'Click to expand & restore'}
            </span>
          </div>

          <div className="flex items-center gap-1 ms-1" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsMinimized(false)}
              className="p-1.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 hover:text-white transition-all cursor-pointer"
              title={isRtl ? 'تكبير واستعادة السبورة' : 'Restore whiteboard'}
            >
              <Maximize2 size={13} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white transition-all cursor-pointer"
              title={isRtl ? 'إغلاق' : 'Close'}
            >
              <X size={13} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        key={`smart-whiteboard-${positionKey}-${isMaximized}-${activeThemeId}`}
        drag={!isMaximized && (typeof window !== 'undefined' ? window.innerWidth >= 1024 : false)}
        dragListener={false}
        dragControls={dragControls}
        dragMomentum={false}
        dragElastic={0.05}
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
        className={`fixed z-[75] flex flex-col font-sans transition-[border-radius,box-shadow] select-none ${
          isMaximized 
            ? 'inset-0 sm:inset-2 md:inset-3 lg:inset-4 xl:inset-6 rounded-none sm:rounded-3xl border-0 sm:border-4' 
            : mobileMode === 'half'
              ? 'inset-x-0 bottom-0 top-auto h-[58dvh] max-h-[75dvh] rounded-t-3xl rounded-b-none border-t-4 border-x-0 border-b-0 sm:hidden'
              : 'inset-0 sm:inset-auto sm:top-4 md:top-[74px] md:bottom-3 md:start-[88px] md:end-3 md:left-auto md:right-auto md:translate-x-0 lg:top-6 lg:left-1/2 lg:-translate-x-1/2 lg:start-auto lg:end-auto xl:left-auto xl:translate-x-0 xl:right-6 rounded-none sm:rounded-3xl border-0 sm:border-4'
        } shadow-2xl overflow-hidden`}
        style={{
          borderColor: currentTheme.borderHex,
          backgroundColor: currentTheme.bgHex,
          boxShadow: `0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 30px ${currentTheme.borderHex}44`,
          ...(!isMaximized && typeof window !== 'undefined' && window.innerWidth >= 1024
            ? {
                width: `${Math.min(window.innerWidth - 20, customSize.width)}px`,
                height: `${Math.min(window.innerHeight - 24, customSize.height)}px`,
                maxWidth: 'calc(100vw - 20px)',
                maxHeight: 'calc(100vh - 24px)',
              }
            : {}),
        }}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* ======================================================== */}
        {/* SUCCESS TOAST BANNER */}
        {/* ======================================================== */}
        <AnimatePresence>
          {saveSuccessMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-12 left-2 right-2 sm:top-14 sm:left-4 sm:right-4 z-60 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-xl border-2 border-emerald-300 flex items-center justify-between text-xs sm:text-sm font-black"
            >
              <div className="flex items-center gap-2 truncate">
                <Camera size={16} className="text-emerald-200 animate-bounce shrink-0" />
                <span className="truncate">{saveSuccessMessage}</span>
              </div>
              <button 
                onClick={() => setSaveSuccessMessage(null)}
                className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 shrink-0"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Pull Handle Bar & Mode Switcher */}
        <div 
          onClick={() => setMobileMode(prev => prev === 'fullscreen' ? 'half' : 'fullscreen')}
          className="sm:hidden flex items-center justify-between px-4 py-1.5 cursor-pointer bg-black/30 text-[10px] font-black text-amber-200/90 border-b border-white/5 active:bg-black/40"
        >
          <div className="flex items-center gap-1">
            <span>{mobileMode === 'fullscreen' ? '◫' : '⛶'}</span>
            <span>{mobileMode === 'fullscreen' ? (isRtl ? 'عرض نصف الشاشة' : 'Half View') : (isRtl ? 'ملء كامل الشاشة' : 'Full Screen')}</span>
          </div>
          <div className="w-12 h-1.5 rounded-full bg-white/40" />
          <span className="text-[9px] text-amber-300/80">{isRtl ? 'اضغط للتبديل' : 'Tap to toggle'}</span>
        </div>

        {/* ======================================================== */}
        {/* TOP WOODEN / BRASS HEADER BAR (DRAGGABLE HANDLE) */}
        {/* ======================================================== */}
        <div 
          onPointerDown={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest('button, input, select, a, textarea')) return;
            if (typeof window !== 'undefined' && window.innerWidth < 640) return;
            dragControls.start(e);
          }}
          onDoubleClick={() => {
            if (typeof window !== 'undefined' && window.innerWidth < 640) {
              setMobileMode(prev => prev === 'fullscreen' ? 'half' : 'fullscreen');
            } else {
              setIsMaximized(!isMaximized);
            }
          }}
          className={`bg-gradient-to-r ${currentTheme.headerFrom} ${currentTheme.headerVia} ${currentTheme.headerTo} px-2.5 sm:px-4 py-2 sm:py-3 border-b-2 flex items-center justify-between shrink-0 shadow-md select-none sm:touch-none ${
            !isMaximized ? 'sm:cursor-grab sm:active:cursor-grabbing' : ''
          }`}
          style={{ borderColor: `${currentTheme.borderHex}66` }}
        >
          <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
            <div 
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-slate-900 shadow-inner font-black text-xs sm:text-sm shrink-0"
              style={{ backgroundColor: currentTheme.borderHex }}
            >
              {currentTheme.emoji}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h3 
                  className="text-xs sm:text-sm lg:text-base font-black tracking-wide truncate"
                  style={{ color: currentTheme.accentHex }}
                >
                  <span className="sm:hidden">{isRtl ? 'السبورة 📐' : 'Whiteboard 📐'}</span>
                  <span className="hidden sm:inline lg:hidden">{isRtl ? 'السبورة الذكية 📐' : 'Smartboard 📐'}</span>
                  <span className="hidden lg:inline">{isRtl ? 'السبورة الذكية للشرح 📐' : 'Smart Whiteboard 📐'}</span>
                </h3>
              </div>
              <p className="hidden md:block text-[9px] sm:text-[10px] lg:text-[11px] text-amber-200/70 font-medium truncate max-w-[100px] lg:max-w-[240px]">
                {boardData?.title || (isRtl ? 'مساحة الشرح والكتابة' : 'Interactive chalkboard')}
              </p>
            </div>

            {/* Mode Switch Tabs (الشرح vs الرسم vs التحدي) */}
            <div className="flex bg-black/40 p-0.5 rounded-xl border border-white/10 text-xs font-bold shrink-0">
              <button
                onClick={() => {
                  setActiveTab('content');
                  if (contentViewFilter === 'practice') setContentViewFilter('all');
                }}
                className={`px-2 sm:px-2.5 py-1 rounded-lg transition-all cursor-pointer text-[11px] sm:text-xs flex items-center gap-1 ${
                  activeTab === 'content' && contentViewFilter !== 'practice'
                    ? 'text-slate-900 shadow-sm font-black'
                    : 'text-amber-100/70 hover:text-white'
                }`}
                style={{
                  backgroundColor: activeTab === 'content' && contentViewFilter !== 'practice' ? currentTheme.borderHex : 'transparent'
                }}
              >
                <span>📋</span>
                <span>{isRtl ? 'الشرح' : 'Notes'}</span>
              </button>
              <button
                onClick={() => setActiveTab('draw')}
                className={`px-2 sm:px-2.5 py-1 rounded-lg transition-all cursor-pointer text-[11px] sm:text-xs flex items-center gap-1 ${
                  activeTab === 'draw'
                    ? 'text-slate-900 shadow-sm font-black'
                    : 'text-amber-100/70 hover:text-white'
                }`}
                style={{
                  backgroundColor: activeTab === 'draw' ? currentTheme.borderHex : 'transparent'
                }}
              >
                <span>✍️</span>
                <span>{isRtl ? 'الرسم' : 'Draw'}</span>
              </button>
              {(boardData?.quiz || (Array.isArray(boardData?.quizzes) && boardData.quizzes.length > 0)) && (
                <button
                  onClick={() => {
                    setActiveTab('content');
                    setContentViewFilter('practice');
                  }}
                  className={`px-2 sm:px-2.5 py-1 rounded-lg transition-all cursor-pointer text-[11px] sm:text-xs flex items-center gap-1 ${
                    activeTab === 'content' && contentViewFilter === 'practice'
                      ? 'text-slate-900 shadow-sm font-black'
                      : 'text-amber-300 hover:text-white'
                  }`}
                  style={{
                    backgroundColor: activeTab === 'content' && contentViewFilter === 'practice' ? currentTheme.borderHex : 'transparent'
                  }}
                >
                  <span>🎯</span>
                  <span>{isRtl ? 'التحدي' : 'Quiz'}</span>
                </button>
              )}
            </div>
          </div>

          {/* SECTION 2: TOOLS & WINDOW CONTROLS (RIGHT) */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* Theme Picker Toggle */}
            <div className="relative">
              <button
                onClick={() => setShowThemePicker(!showThemePicker)}
                className="p-1.5 sm:px-2.5 sm:py-1 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-black flex items-center gap-1 transition-all cursor-pointer text-amber-200"
                title={isRtl ? 'تغيير ألوان وخلفية السبورة للأطفال' : 'Change Whiteboard Theme'}
              >
                <Palette size={14} />
                <span className="hidden md:inline">{isRtl ? 'الخلفية' : 'Theme'}</span>
                <span className="text-xs">{currentTheme.emoji}</span>
              </button>

              {/* Theme Picker Dropdown */}
              <AnimatePresence>
                {showThemePicker && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: 5 }}
                    className="absolute top-full mt-2 end-0 w-72 sm:w-80 bg-[#0f172a]/95 backdrop-blur-xl border-2 border-amber-400/60 rounded-3xl shadow-2xl p-3.5 z-60 text-white animate-in fade-in"
                  >
                    <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-white/10 text-xs font-black text-amber-300">
                      <span className="flex items-center gap-1.5 text-sm">
                        <span>🏖️</span>
                        <span>{isRtl ? 'ثيمات صيفية منعشة للسبورة:' : 'Summer Whiteboard Themes:'}</span>
                      </span>
                      <button 
                        onClick={() => setShowThemePicker(false)}
                        className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer text-xs"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-1.5 max-h-64 overflow-y-auto pe-1">
                      {WHITEBOARD_THEMES.map(theme => (
                        <button
                          key={`theme-${theme.id}`}
                          onClick={() => {
                            setActiveThemeId(theme.id);
                            if (typeof window !== 'undefined') {
                              try {
                                localStorage.setItem('alkhalil_whiteboard_theme', theme.id);
                              } catch (e) {}
                            }
                            setShowThemePicker(false);
                          }}
                          className={`flex items-center justify-between p-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer border ${
                            activeThemeId === theme.id
                              ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-slate-950 font-black shadow-lg border-white scale-[1.02]'
                              : 'bg-white/5 hover:bg-white/15 text-slate-100 border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="text-xl filter drop-shadow-sm shrink-0">{theme.emoji}</span>
                            <div className="text-start truncate">
                              <div className={`font-black text-xs truncate ${activeThemeId === theme.id ? 'text-slate-950' : 'text-white'}`}>
                                {isRtl ? theme.nameAr : theme.nameEn}
                              </div>
                              <div className={`text-[10px] truncate ${activeThemeId === theme.id ? 'text-slate-800 font-bold' : 'text-amber-200/70'}`}>
                                {isRtl ? theme.nameEn : theme.nameAr}
                              </div>
                            </div>
                          </div>

                          {/* Dual-color preview pill (Border + Canvas background) */}
                          <div className="flex items-center -space-x-1.5 rtl:space-x-reverse shrink-0 ms-2">
                            <div 
                              className="w-4 h-4 rounded-full border border-white/70 shadow-sm"
                              style={{ backgroundColor: theme.borderHex }}
                              title="Border Accent"
                            />
                            <div 
                              className="w-5 h-5 rounded-full border-2 border-white/90 shadow-md ring-1 ring-black/40"
                              style={{ backgroundColor: theme.bgHex }}
                              title="Canvas Surface"
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Save Board as Image Button (Header) */}
            <button
              onClick={saveWhiteboardAsImage}
              className="p-1.5 sm:px-2 sm:py-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1 shadow-sm transition-all cursor-pointer active:scale-95 shrink-0"
              title={isRtl ? 'حفظ اللوحة بالكامل كصورة للمراجعة لاحقاً 📸' : 'Save Whiteboard as Image 📸'}
            >
              <Camera size={14} className="text-slate-900" />
              <span className="hidden lg:inline">{isRtl ? 'حفظ اللوحة' : 'Save'}</span>
            </button>

            {/* Daily Lesson Progress Badge (e.g. درس 1 من 3) */}
            {dailyLessonInfo && (
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-500/20 text-blue-200 border border-blue-400/40 text-xs font-black shrink-0">
                <span>📚</span>
                <span>{isRtl ? `درس ${dailyLessonInfo.current} من ${dailyLessonInfo.total}` : `Lesson ${dailyLessonInfo.current} of ${dailyLessonInfo.total}`}</span>
              </div>
            )}

            {/* Finish Lesson & Save Result Button (Only when quiz is actually completed or as progress badge) */}
            {onFinishLesson && quizCompleted ? (
              <button
                onClick={() => onFinishLesson(quizScore, totalQuestions)}
                className="p-1.5 sm:px-2.5 sm:py-1 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:brightness-110 text-white font-black text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer active:scale-95 border border-emerald-300/40 shrink-0"
                title={isRtl ? 'إنهاء الدرس وتسجيل النتيجة وحفظ التقدم 🎓' : 'Finish Lesson & Record Result 🎓'}
              >
                <Trophy size={14} className="text-amber-300" />
                <span className="hidden lg:inline">{isRtl ? 'إنهاء وحفظ 🎓' : 'Finish & Save 🎓'}</span>
                <span className="lg:hidden">{isRtl ? 'إنهاء' : 'Finish'}</span>
              </button>
            ) : totalQuestions > 1 ? (
              <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-400/20 text-amber-200 border border-amber-400/30 text-xs font-bold shrink-0">
                <span>🎯</span>
                <span>{isRtl ? `تحدي ${quizQuestionIndex + 1} من ${totalQuestions}` : `Question ${quizQuestionIndex + 1} of ${totalQuestions}`}</span>
              </div>
            ) : null}

            {/* Whiteboard Scale & Size Controller (تكبير وتصغير حسب الرغبة) */}
            <div className="relative hidden lg:flex items-center bg-black/40 p-0.5 rounded-xl border border-white/10 text-xs font-bold" ref={sizeMenuRef}>
              {/* Zoom Out Button (-) */}
              <button
                onClick={handleScaleDown}
                className="p-1 sm:px-1.5 sm:py-1 rounded-lg text-amber-200/80 hover:text-white hover:bg-white/15 transition-all cursor-pointer flex items-center justify-center"
                title={isRtl ? 'تصغير حجم السبورة 15% (-)' : 'Shrink whiteboard 15% (-)'}
              >
                <Minus size={13} />
              </button>

              {/* Current Size / Presets Dropdown Toggle */}
              <button
                onClick={() => setShowSizeMenu(!showSizeMenu)}
                className="px-1.5 sm:px-2 py-1 rounded-lg text-amber-200 hover:text-white hover:bg-white/10 transition-all cursor-pointer flex items-center gap-1 text-[11px] font-black"
                title={isRtl ? 'التحكم بمقاسات السبورة وتكبيرها/تصغيرها حسب الرغبة 📐' : 'Whiteboard size controls & presets 📐'}
              >
                <Scaling size={12} className="text-amber-400" />
                <span>{customSize.width}×{customSize.height}</span>
              </button>

              {/* Zoom In Button (+) */}
              <button
                onClick={handleScaleUp}
                className="p-1 sm:px-1.5 sm:py-1 rounded-lg text-amber-200/80 hover:text-white hover:bg-white/15 transition-all cursor-pointer flex items-center justify-center"
                title={isRtl ? 'تكبير حجم السبورة 15% (+)' : 'Enlarge whiteboard 15% (+)'}
              >
                <Plus size={13} />
              </button>

              {/* Size Menu Dropdown */}
              <AnimatePresence>
                {showSizeMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.94, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: 5 }}
                    className="absolute top-full mt-2 end-0 w-64 sm:w-72 bg-[#0e1726] border-2 border-amber-400/50 rounded-2xl shadow-2xl p-3 z-60 text-white backdrop-blur-md"
                  >
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs font-black text-amber-300">
                      <span className="flex items-center gap-1">
                        📐 {isRtl ? 'مقاسات وتكبير السبورة:' : 'Whiteboard Size Presets:'}
                      </span>
                      <span className="text-[10px] text-amber-400 bg-amber-400/20 px-1.5 py-0.5 rounded-full font-mono">
                        {customSize.width}×{customSize.height}
                      </span>
                    </div>

                    {/* Presets List */}
                    <div className="space-y-1.5">
                      <button
                        onClick={() => handleApplyPreset(560, 460)}
                        className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-slate-200 transition-all cursor-pointer text-start"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">📱</span>
                          <div>
                            <div className="font-black text-white">{isRtl ? 'مدمجة صغيرة' : 'Compact (Side)'}</div>
                            <div className="text-[10px] text-slate-400 font-normal">{isRtl ? 'مناسبة للمحادثة الجانبية' : '560 × 460 px'}</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-amber-300">560×460</span>
                      </button>

                      <button
                        onClick={() => handleApplyPreset(780, 600)}
                        className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-slate-200 transition-all cursor-pointer text-start"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">💻</span>
                          <div>
                            <div className="font-black text-white">{isRtl ? 'قياسية متوازنة' : 'Standard Balanced'}</div>
                            <div className="text-[10px] text-slate-400 font-normal">{isRtl ? 'المقاس الأنسب للشرح' : '780 × 600 px'}</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-amber-300">780×600</span>
                      </button>

                      <button
                        onClick={handleApplyTabletPreset}
                        className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-slate-200 transition-all cursor-pointer text-start"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">📟</span>
                          <div>
                            <div className="font-black text-white">{isRtl ? 'تابلت وآيباد ذكي (iPad / Tablet)' : 'Smart iPad & Tablet'}</div>
                            <div className="text-[10px] text-slate-400 font-normal">{isRtl ? 'مقاس متجاوب ومثالي للتابلت وقلم أبل' : 'Optimized touch & stylus ratio'}</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-amber-300">Tablet Fit</span>
                      </button>

                      <button
                        onClick={() => handleApplyPreset(980, 720)}
                        className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-slate-200 transition-all cursor-pointer text-start"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">📱</span>
                          <div>
                            <div className="font-black text-white">{isRtl ? 'آيباد برو / شاشة لمس واسعة' : 'iPad Pro / Touch Expanded'}</div>
                            <div className="text-[10px] text-slate-400 font-normal">{isRtl ? 'مساحة عريضة فائقة ومريحة للرسم' : '980 × 720 px'}</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-amber-300">980×720</span>
                      </button>

                      <button
                        onClick={() => handleApplyPreset(1060, 750)}
                        className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-slate-200 transition-all cursor-pointer text-start"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">🖥️</span>
                          <div>
                            <div className="font-black text-white">{isRtl ? 'كبيرة واسعة' : 'Large Expanded'}</div>
                            <div className="text-[10px] text-slate-400 font-normal">{isRtl ? 'مساحة واسعة للرسم والقواعد' : '1060 × 750 px'}</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-amber-300">1060×750</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsMaximized(true);
                          setShowSizeMenu(false);
                        }}
                        className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold bg-amber-400/10 hover:bg-amber-400/20 text-amber-200 border border-amber-400/30 transition-all cursor-pointer text-start"
                      >
                        <div className="flex items-center gap-2">
                          <Maximize2 size={14} className="text-amber-400" />
                          <span className="font-black">{isRtl ? 'ملء كامل الشاشة' : 'Fullscreen / Maximize'}</span>
                        </div>
                        <span className="text-[10px] font-mono text-amber-300">100%</span>
                      </button>
                    </div>

                    {/* Fine Adjustment Zoom Buttons */}
                    <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between gap-1.5 text-xs">
                      <button
                        onClick={handleScaleDown}
                        className="flex-1 py-1.5 px-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-200 font-bold flex items-center justify-center gap-1 cursor-pointer transition-all text-[11px]"
                      >
                        <Minus size={12} />
                        <span>{isRtl ? 'تصغير -15%' : 'Zoom -'}</span>
                      </button>
                      <button
                        onClick={handleResetSize}
                        className="p-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-amber-300 font-bold flex items-center justify-center cursor-pointer transition-all"
                        title={isRtl ? 'استعادة الحجم الافتراضي' : 'Reset Size'}
                      >
                        <RotateCcw size={12} />
                      </button>
                      <button
                        onClick={handleScaleUp}
                        className="flex-1 py-1.5 px-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-200 font-bold flex items-center justify-center gap-1 cursor-pointer transition-all text-[11px]"
                      >
                        <Plus size={12} />
                        <span>{isRtl ? 'تكبير +15%' : 'Zoom +'}</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Half/Full Screen Toggle (sm:hidden) */}
            <button
              onClick={() => setMobileMode(prev => prev === 'fullscreen' ? 'half' : 'fullscreen')}
              className="sm:hidden p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 transition-all cursor-pointer text-xs flex items-center gap-1 font-bold shrink-0"
              title={mobileMode === 'fullscreen' ? (isRtl ? 'تصغير لنصف الشاشة ◫' : 'Half screen') : (isRtl ? 'تكبير كامل الشاشة ⛶' : 'Full screen')}
            >
              <Scaling size={13} />
              <span className="text-[10px]">{mobileMode === 'fullscreen' ? (isRtl ? 'نصف' : 'Half') : (isRtl ? 'كامل' : 'Full')}</span>
            </button>

            {/* Grouped Window Controls Pill (Tidy & Consistent across tablet & desktop) */}
            <div className="flex items-center gap-1 bg-black/35 p-0.5 rounded-xl border border-white/10 shrink-0">
              {/* Reset position button (desktop only) */}
              {!isMaximized && (
                <button
                  onClick={resetPosition}
                  className="hidden lg:block p-1.5 rounded-lg text-amber-200/80 hover:text-amber-200 hover:bg-white/10 transition-all cursor-pointer"
                  title={isRtl ? 'إعادة للموضع الافتراضي' : 'Reset position'}
                >
                  <RotateCcw size={13} />
                </button>
              )}

              {/* Minimize to dock pill button */}
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1.5 rounded-lg text-amber-200/80 hover:text-amber-200 hover:bg-white/10 transition-all cursor-pointer"
                title={isRtl ? 'تصغير إلى شريط عائم أسفل الشاشة' : 'Minimize to floating dock'}
              >
                <Minus size={13} />
              </button>

              {/* Maximize toggle */}
              <button
                onClick={() => {
                  if (typeof window !== 'undefined' && window.innerWidth < 640) {
                    setMobileMode(prev => prev === 'fullscreen' ? 'half' : 'fullscreen');
                  } else {
                    setIsMaximized(!isMaximized);
                  }
                }}
                className="p-1.5 rounded-lg text-amber-200/80 hover:text-amber-200 hover:bg-white/10 transition-all cursor-pointer"
                title={isMaximized ? (isRtl ? 'استعادة الحجم' : 'Restore') : (isRtl ? 'تكبير كامل الشاشة' : 'Maximize')}
              >
                {isMaximized ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
              </button>

              {/* Close button */}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white transition-all cursor-pointer shrink-0"
                title={isRtl ? 'إغلاق السبورة' : 'Close whiteboard'}
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SARA VOICE EXPLAINER CONTROL RIBBON */}
        {/* ======================================================== */}
        <div className="bg-slate-950/60 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 border-b border-white/10 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar text-xs shrink-0 select-none">
          {/* Sara Status & Soundwave Indicator */}
          <div className="flex items-center gap-2.5 min-w-0 shrink-0">
            <div className="relative shrink-0">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-tr from-[#002147] to-[#0d4a8f] border-2 flex items-center justify-center text-sm shadow-md transition-transform ${
                isSaraSpeaking ? 'border-amber-400 ring-2 ring-amber-400/50 scale-105' : 'border-white/30'
              }`}>
                👩‍🏫
              </div>
              {isSaraSpeaking && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
                </span>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 font-black text-amber-200">
                <span>{isRtl ? 'المعلمة سارة' : 'Teacher Sara'}</span>
                {isSaraSpeaking ? (
                  <span className="inline-flex items-center gap-1 text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/40 animate-pulse shrink-0">
                    <Volume2 size={11} className="text-amber-400" />
                    <span>{isRtl ? 'تشرح بالصوت 🎙️' : 'Explaining 🎙️'}</span>
                  </span>
                ) : isSaraThinking ? (
                  <span className="inline-flex items-center gap-1 text-[10px] bg-purple-400/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-400/40 shrink-0">
                    <Sparkles size={11} className="animate-spin" />
                    <span>{isRtl ? 'تجهز السبورة... 🪄' : 'Updating... 🪄'}</span>
                  </span>
                ) : (
                  <span className="text-[10px] text-emerald-300/90 font-bold flex items-center gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{isRtl ? 'جاهزة للشرح 🌟' : 'Ready 🌟'}</span>
                  </span>
                )}
              </div>
              <p className="text-[10px] text-amber-100/70 truncate max-w-[160px] xs:max-w-[220px] sm:max-w-[340px]">
                {currentExplanationText || (isRtl ? 'انقر "اشرحي بالصوت" أو اطلب أي قاعدة ومثال من سارة' : 'Click "Explain Aloud" or ask Sara to write anything')}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Select Curriculum on Whiteboard */}
            {onOpenCurriculum && (
              <button
                onClick={onOpenCurriculum}
                className="px-2 sm:px-2.5 py-1.5 rounded-xl border border-amber-400/40 bg-amber-400/15 hover:bg-amber-400/30 text-amber-200 hover:text-white text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
                title={isRtl ? 'استعراض واختيار مناهج الأكاديمية لشرحها على السبورة' : 'Select Academy Curriculum'}
              >
                <span>📚</span>
                <span className="text-[11px]">{isRtl ? 'المناهج' : 'Curricula'}</span>
              </button>
            )}

            {/* Sara Arabic / English Language Toggle */}
            {onToggleLang && (
              <button
                onClick={onToggleLang}
                className="px-2 sm:px-2.5 py-1.5 rounded-xl border border-amber-400/40 bg-white/10 hover:bg-white/20 text-amber-300 text-xs font-black flex items-center gap-1 transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
                title={isRtl ? 'تبديل لغة الشرح لسارة بين العربية والإنجليزية' : 'Toggle explanation language (Arabic / English)'}
              >
                <span className="text-[11px]">🌐</span>
                <span className="text-[11px] font-black">{currentLang === 'ar' ? 'English' : 'عربي'}</span>
              </button>
            )}

            {/* Toggle Sara 3D Presence */}
            {onToggleSara3D && (
              <button
                onClick={onToggleSara3D}
                className={`px-2 sm:px-2.5 py-1.5 rounded-xl border text-xs font-black transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                  isSara3DOpen
                    ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-sm'
                    : 'bg-white/10 hover:bg-white/20 text-amber-200 border-white/20'
                }`}
                title={isRtl ? 'إظهار / إخفاء مجسم سارة 3D بجانب السبورة' : 'Toggle Sara 3D Character'}
              >
                <span className="text-[11px]">👩‍🏫</span>
                <span className="text-[11px]">{isRtl ? 'سارة 3D' : 'Sara 3D'}</span>
              </button>
            )}

            {isSaraSpeaking ? (
              <button
                onClick={stopVoiceExplanation}
                className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-rose-500/25 hover:bg-rose-500/40 border border-rose-500/40 text-rose-200 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
              >
                <VolumeX size={14} className="text-rose-400" />
                <span>{isRtl ? 'إيقاف الصوت ⏹️' : 'Stop Audio ⏹️'}</span>
              </button>
            ) : (
              <button
                onClick={handleExplainWholeBoard}
                className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95 shrink-0"
                title={isRtl ? 'سارة تشرح كامل السبورة بالصوت وتمر على الأقسام' : 'Sara explains whole whiteboard with voice'}
              >
                <Volume2 size={14} className="animate-bounce" />
                <span>{isRtl ? 'اشرحي لي السبورة 🎙️' : 'Explain Aloud 🎙️'}</span>
              </button>
            )}

            <button
              onClick={handleDrawChalkExplanation}
              className="px-2 sm:px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-amber-200 font-bold text-xs flex items-center gap-1 transition-all cursor-pointer shrink-0"
              title={isRtl ? 'رسم وشرح تفاعلي بالطبشور على اللوح' : 'Write with chalk on board'}
            >
              <PenTool size={13} />
              <span className="hidden sm:inline">{isRtl ? 'طبشور ✍️' : 'Chalk ✍️'}</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MAIN BOARD CHALKBOARD / WHITEBOARD CANVAS */}
        {/* ======================================================== */}
        <div 
          ref={containerRef}
          className={`flex-1 overflow-y-auto p-4 sm:p-5 relative min-h-[380px] select-none ${currentTheme.textColor}`}
          style={{
            backgroundColor: currentTheme.bgHex,
            backgroundImage: `
              radial-gradient(circle at 50% 50%, ${currentTheme.gradientToHex} 0%, transparent 85%),
              linear-gradient(${currentTheme.gridColor} 1px, transparent 1px),
              linear-gradient(90deg, ${currentTheme.gridColor} 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 32px 32px, 32px 32px'
          }}
        >
          {/* TAB 1: STRUCTURED CONTENT FROM SARA */}
          {activeTab === 'content' && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 max-w-6xl mx-auto"
            >
              {/* ======================================================== */}
              {/* 🌟 1. SMART WHITEBOARD SLIDE DECK & VIEW MODE CONTROLLER */}
              {/* ======================================================== */}
              {whiteboardPages && whiteboardPages.length > 0 ? (
                <div className="flex flex-col gap-2 bg-black/45 p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl border border-white/10 backdrop-blur-md shadow-lg">
                  {/* Top Bar: Slide Tabs + Navigation Controls */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-full">
                      {/* Prev Page Button */}
                      <button
                        onClick={handlePrevPage}
                        disabled={currentPageIndex === 0}
                        className="px-2 sm:px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white font-black text-xs flex items-center gap-1 transition-all cursor-pointer shrink-0 active:scale-95"
                        title={isRtl ? 'الصفحة السابقة' : 'Previous Slide'}
                      >
                        {isRtl ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                        <span className="hidden sm:inline">{isRtl ? 'السابق' : 'Prev'}</span>
                      </button>

                      {/* Slide Tabs */}
                      {whiteboardPages.map((page, pIdx) => {
                        const isCurrent = currentPageIndex === pIdx;
                        const isDone = completedPages.has(pIdx);
                        return (
                          <button
                            key={`slide-tab-${page.id}`}
                            onClick={() => {
                              cancelAutoAdvance();
                              setCurrentPageIndex(pIdx);
                              explainPage(pIdx);
                            }}
                            className={`px-2.5 py-1 sm:py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shrink-0 active:scale-95 ${
                              isCurrent
                                ? 'bg-amber-400 text-slate-950 font-black shadow-lg scale-102 ring-2 ring-white/60'
                                : isDone
                                  ? 'bg-white/10 hover:bg-white/20 text-emerald-300 border border-emerald-400/30'
                                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
                            }`}
                          >
                            <span>{page.icon}</span>
                            <span>{isRtl ? page.titleAr : page.titleEn}</span>
                            {isDone && !isCurrent && <span className="text-[10px] text-emerald-400 font-bold">✓</span>}
                          </button>
                        );
                      })}

                      {/* Next Page Button */}
                      <button
                        onClick={handleNextPage}
                        disabled={currentPageIndex >= whiteboardPages.length - 1}
                        className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-30 disabled:cursor-not-allowed text-slate-950 font-black text-xs flex items-center gap-1 transition-all cursor-pointer shrink-0 shadow-sm active:scale-95"
                        title={isRtl ? 'الصفحة التالية والشرح' : 'Next Slide'}
                      >
                        <span className="hidden sm:inline">{isRtl ? 'التالي ➔' : 'Next ➔'}</span>
                        {isRtl ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                      </button>
                    </div>

                    {/* Secondary Controls: Explain Page + Auto-Advance + View Mode */}
                    <div className="flex items-center gap-1.5 shrink-0 ms-auto">
                      <button
                        onClick={() => explainPage(currentPageIndex)}
                        className="px-2.5 py-1 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 border border-amber-400/40 text-xs font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                        title={isRtl ? 'سارة تشرح هذه الصفحة بالصوت' : 'Sara explains this page'}
                      >
                        <Volume2 size={13} className="text-amber-400 animate-pulse" />
                        <span>{isRtl ? 'شرح الصفحة 🎙️' : 'Explain Page 🎙️'}</span>
                      </button>

                      <button
                        onClick={() => {
                          const newVal = !autoAdvanceEnabled;
                          setAutoAdvanceEnabled(newVal);
                          if (!newVal) cancelAutoAdvance();
                        }}
                        className={`px-2 sm:px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer border ${
                          autoAdvanceEnabled
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400 font-black ring-1 ring-emerald-400/40'
                            : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                        }`}
                        title={isRtl ? 'تشغيل التقليب التلقائي بين الصفحات بعد انتهاء الشرح' : 'Auto-advance pages'}
                      >
                        <span>{autoAdvanceEnabled ? '⏩' : '⏸️'}</span>
                        <span className="hidden md:inline">{isRtl ? 'الشرح التلقائي' : 'Auto-Advance'}</span>
                      </button>

                      <button
                        onClick={() => setWhiteboardViewMode(prev => prev === 'paged' ? 'scroll' : 'paged')}
                        className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                        title={isRtl ? 'التبديل بين عرض الصفحات وعرض السبورة الكاملة' : 'Toggle Slide vs Scroll view'}
                      >
                        <span>{whiteboardViewMode === 'paged' ? '📜' : '📄'}</span>
                        <span className="hidden lg:inline">{whiteboardViewMode === 'paged' ? (isRtl ? 'عرض كامل' : 'Scroll View') : (isRtl ? 'عرض الصفحات' : 'Slides View')}</span>
                      </button>
                    </div>
                  </div>

                  {/* If in Scroll mode, also show the section filter tabs */}
                  {whiteboardViewMode === 'scroll' && (
                    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pt-1 border-t border-white/10">
                      {[
                        { id: 'all', labelAr: '🌟 عرض شامل', labelEn: '🌟 Master View' },
                        { id: 'focus', labelAr: '📐 القاعدة والمثال', labelEn: '📐 Formula & Sentence' },
                        { id: 'notes', labelAr: '💡 النقاط والمفردات', labelEn: '💡 Notes & Vocab' },
                        { id: 'practice', labelAr: '🎯 التصحيح والكويز', labelEn: '🎯 Practice & Quiz' },
                      ].map(tab => {
                        const isSelected = contentViewFilter === tab.id;
                        return (
                          <button
                            key={`tab-filter-${tab.id}`}
                            onClick={() => setContentViewFilter(tab.id as any)}
                            className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer shrink-0 ${
                              isSelected
                                ? 'text-slate-950 shadow-md font-black'
                                : 'text-amber-100/70 hover:text-white hover:bg-white/10'
                            }`}
                            style={{
                              backgroundColor: isSelected ? currentTheme.borderHex : 'transparent'
                            }}
                          >
                            <span>{isRtl ? tab.labelAr : tab.labelEn}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : null}

              {/* Active Audio Walkthrough Banner when Sara is Speaking */}
              {whiteboardViewMode === 'paged' && (isSaraSpeaking || isExplainingAll) && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-500/15 to-amber-600/20 border-2 border-amber-400/60 shadow-lg flex items-center justify-between gap-3 text-amber-200 backdrop-blur-md"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-sm shrink-0 animate-pulse">
                      🎙️
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 block">
                        {isRtl ? 'سارة تشرح هذه الصفحة الآن:' : 'Sara is explaining this slide now:'}
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-white truncate">
                        {currentExplanationText || activeSlidePage?.speechText || ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={stopVoiceExplanation}
                      className="px-2.5 py-1 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-400/40 text-xs font-bold transition-all cursor-pointer active:scale-95"
                    >
                      <VolumeX size={13} />
                      <span className="hidden sm:inline">{isRtl ? 'إيقاف' : 'Stop'}</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ======================================================== */}
              {/* 🌟 2. EMPTY STATE WHEN BOARD HAS NO LESSON YET */}
              {/* ======================================================== */}
              {(!boardData || (!boardData.formula && !boardData.sentence && !boardData.notes && !boardData.diagram && !boardData.quiz)) && (
                <div 
                  className="rounded-3xl border-2 border-dashed p-6 sm:p-10 text-center space-y-4 shadow-xl"
                  style={{
                    backgroundColor: currentTheme.cardBg,
                    borderColor: `${currentTheme.borderHex}66`
                  }}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400/20 to-amber-500/30 border-2 border-amber-400 mx-auto flex items-center justify-center text-3xl shadow-inner animate-bounce">
                    👩‍🏫
                  </div>
                  <div className="space-y-1 max-w-md mx-auto">
                    <h3 className="text-base sm:text-lg font-black" style={{ color: currentTheme.accentHex }}>
                      {isRtl ? 'أهلاً بك في السبورة الذكية مع المعلمة سارة! 🌟' : 'Welcome to Teacher Sara’s Smartboard! 🌟'}
                    </h3>
                    <p className={`text-xs ${currentTheme.isLight ? 'text-slate-600' : 'text-amber-100/70'}`}>
                      {isRtl 
                        ? 'السبورة جاهزة لشرح أي قاعدة، استعراض المناهج، أو الإجابة على أي استفسار بالصوت والكتابة.' 
                        : 'Whiteboard is ready to explain grammar, explore curricula, or test your skills.'}
                    </p>
                  </div>

                  {/* Ready Action Starter Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-xl mx-auto pt-2">
                    {[
                      { 
                        icon: '📘', 
                        titleAr: 'شرح قاعدة زمن المضارع البسيط', 
                        titleEn: 'Explain Present Simple Rule',
                        prompt: isRtl ? 'سارة، اشرحي لي قاعدة زمن المضارع البسيط (Present Simple) على السبورة مع أمثلة وكويز' : 'Sara, explain Present Simple on the whiteboard with formula and quiz'
                      },
                      { 
                        icon: '❓', 
                        titleAr: 'كيف أفرق بين Do و Does في السؤال؟', 
                        titleEn: 'How to use Do vs Does in questions?',
                        prompt: isRtl ? 'سارة، وضحي لي على السبورة الفرق بين Do و Does في تكوين السؤال مع تصحيح الأخطاء' : 'Sara, show me the difference between Do and Does on the whiteboard'
                      },
                      { 
                        icon: '🎯', 
                        titleAr: 'كويز تفاعلي سريع لاختبار القواعد', 
                        titleEn: 'Quick Interactive Grammar Quiz',
                        prompt: isRtl ? 'سارة، ضعي لي كويز وسؤال تحدي على السبورة لاختبار مستواي' : 'Sara, give me a quick quiz challenge on the board'
                      },
                      { 
                        icon: '🎨', 
                        titleAr: 'خريطة مفردات ورسم بياني توضيحي', 
                        titleEn: 'Vocabulary Diagram & Mind Map',
                        prompt: isRtl ? 'سارة، ارسمي لي خريطة مفردات ومخطط توضيحي لكلمات يومية شائعة' : 'Sara, draw a vocabulary diagram on the whiteboard'
                      }
                    ].map((starter, sIdx) => (
                      <button
                        key={`starter-card-${sIdx}`}
                        onClick={() => handleSubmitBoardRequest(starter.prompt)}
                        disabled={isSaraThinking}
                        className="p-3 rounded-2xl border text-start flex items-start gap-2.5 hover:scale-102 transition-all cursor-pointer group shadow-sm"
                        style={{
                          backgroundColor: currentTheme.isLight ? '#FFFFFF' : 'rgba(255,255,255,0.06)',
                          borderColor: currentTheme.cardBorder
                        }}
                      >
                        <span className="text-xl shrink-0 p-1.5 rounded-xl bg-black/20 group-hover:scale-110 transition-transform">
                          {starter.icon}
                        </span>
                        <div className="min-w-0 flex-1">
                          <span className="text-xs font-black block group-hover:text-amber-300 transition-colors" style={{ color: currentTheme.accentHex }}>
                            {isRtl ? starter.titleAr : starter.titleEn}
                          </span>
                          <span className="text-[10px] text-amber-200/60 font-medium">
                            {isRtl ? 'انقر للشرح المباشر على السبورة 🪄' : 'Click to explain on board'}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {onOpenCurriculum && (
                    <div className="pt-2">
                      <button
                        onClick={onOpenCurriculum}
                        className="px-4 py-2 rounded-xl text-slate-950 font-black text-xs inline-flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                        style={{ backgroundColor: currentTheme.borderHex }}
                      >
                        <BookOpen size={14} />
                        <span>{isRtl ? 'استعراض واختيار منهج من الأكاديمية (14 مساراً) 📚' : 'Browse Academy Curricula 📚'}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ======================================================== */}
              {/* 🌟 3. HERO CORE BLACKBOARD: FORMULA & TARGET SENTENCE */}
              {/* ======================================================== */}
              {((whiteboardViewMode === 'paged' && (activeSlidePage?.sectionType === 'objective' || activeSlidePage?.sectionType === 'formula')) ||
                (whiteboardViewMode === 'scroll' && (contentViewFilter === 'all' || contentViewFilter === 'focus'))) &&
                (boardData?.formula || boardData?.sentence) && (
                <div 
                  className={`rounded-2xl sm:rounded-3xl p-4 sm:p-5 border-2 shadow-2xl transition-all relative overflow-hidden ${
                    activeExplanationSection === 'formula' || activeExplanationSection === 'sentence' || activeHighlightKey === 'formula' || activeHighlightKey === 'sentence'
                      ? 'ring-4 ring-amber-400 border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.35)] scale-[1.008]'
                      : ''
                  }`}
                  style={{
                    backgroundColor: currentTheme.cardBg,
                    borderColor: activeExplanationSection === 'formula' || activeExplanationSection === 'sentence' || activeHighlightKey === 'formula' || activeHighlightKey === 'sentence'
                      ? '#FACC15'
                      : currentTheme.borderHex
                  }}
                >
                  {/* Hero Header Ribbon */}
                  <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-white/10">
                    <div className="flex items-center gap-2 min-w-0">
                      <span 
                        className="px-2.5 py-1 rounded-xl text-[10px] sm:text-xs font-black text-slate-950 uppercase tracking-wider shrink-0 flex items-center gap-1 shadow-sm"
                        style={{ backgroundColor: currentTheme.borderHex }}
                      >
                        <GraduationCap size={13} />
                        <span>{isRtl ? (activeSlidePage?.sectionType === 'formula' ? 'القاعدة والصيغة التركيبية 📐' : 'اللوحة المركزية للشرح 🌟') : 'Core Chalkboard'}</span>
                      </span>

                      {boardData?.title && (
                        <h4 className="text-xs sm:text-sm font-black truncate" style={{ color: currentTheme.accentHex }}>
                          {boardData.title}
                        </h4>
                      )}
                    </div>

                    {/* Quick Voice & Pronounce Controls */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {boardData?.sentence && (
                        <button
                          onClick={() => onSpeak(boardData.sentence!)}
                          className="px-2.5 py-1 rounded-xl text-slate-950 font-black text-[11px] sm:text-xs shadow-sm flex items-center gap-1 transition-all cursor-pointer hover:scale-105 active:scale-95"
                          style={{ backgroundColor: currentTheme.borderHex }}
                          title={isRtl ? 'نطق الجملة بالصوت الطبيعي' : 'Pronounce sentence'}
                        >
                          <Volume2 size={13} />
                          <span>{isRtl ? 'نطق الجملة 🗣️' : 'Pronounce'}</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleExplainSection(boardData?.formula ? 'formula' : 'sentence')}
                        className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 border border-white/15 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                        title={isRtl ? 'سارة تشرح القاعدة والمثال بالصوت' : 'Sara explains rule and sentence'}
                      >
                        <Volume2 size={12} className="text-amber-400" />
                        <span className="hidden xs:inline">{isRtl ? 'شرح القاعدة 🎙️' : 'Explain'}</span>
                      </button>
                    </div>
                  </div>

                  {/* 📐 FORMULA ROW */}
                  {boardData?.formula && (whiteboardViewMode === 'paged' ? activeSlidePage?.sectionType === 'formula' : true) && (
                    <div className={`mb-4 text-center p-3 rounded-2xl transition-all ${activeHighlightKey === 'formula' ? 'ring-2 ring-amber-400 bg-amber-400/10' : ''}`}>
                      <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-amber-300/80 block mb-2">
                        {isRtl ? 'قاعدة وتكوين الجملة (Structure) 📐' : 'Sentence Structure 📐'}
                      </span>
                      <div className="text-sm sm:text-lg md:text-xl font-black font-mono tracking-wide flex items-center justify-center flex-wrap gap-1.5 sm:gap-2">
                        {boardData.formula.split('+').map((item, idx) => (
                          <React.Fragment key={`formula-token-${idx}`}>
                            <span 
                              className="px-3 py-1.5 rounded-xl border shadow-sm transition-transform hover:scale-105"
                              style={{
                                backgroundColor: currentTheme.isLight ? '#F1F5F9' : 'rgba(0,0,0,0.55)',
                                borderColor: currentTheme.borderHex,
                                color: currentTheme.isLight ? '#0F172A' : '#FDE68A'
                              }}
                            >
                              {item.trim()}
                            </span>
                            {idx < boardData.formula!.split('+').length - 1 && (
                              <span style={{ color: currentTheme.borderHex }} className="font-black text-base sm:text-xl px-0.5">+</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 🎯 TARGET EXAMPLE ROW */}
                  {boardData?.sentence && (whiteboardViewMode === 'paged' ? activeSlidePage?.sectionType === 'objective' : true) && (
                    <div className={`rounded-2xl bg-black/25 border p-3 sm:p-4 text-center transition-all ${
                      activeHighlightKey === 'sentence' ? 'border-amber-400 ring-2 ring-amber-400/50 shadow-lg' : 'border-white/10'
                    }`}>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-300/80">
                          {isRtl ? 'المثال التطبيقي المباشر 🎯' : 'Target Example 🎯'}
                        </span>
                        {boardData.highlight && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all ${
                            activeHighlightKey === 'highlight_word'
                              ? 'bg-amber-400 text-slate-950 font-black border-white animate-pulse'
                              : 'text-amber-200 bg-amber-400/20 border-amber-400/40'
                          }`}>
                            {isRtl ? `التركيز على: "${boardData.highlight}"` : `Focus: "${boardData.highlight}"`}
                          </span>
                        )}
                      </div>

                      <p className={`text-lg sm:text-2xl md:text-3xl font-black tracking-wide leading-relaxed ${currentTheme.textColor}`}>
                        {(() => {
                          const isAwaitingQuiz = !!boardData?.quiz && (quizSelectedOption === null || quizSelectedOption === undefined);
                          const shouldShowHighlight = !isAwaitingQuiz && !!boardData?.highlight;

                          return boardData.sentence.split(shouldShowHighlight ? boardData.highlight! : '___NON_EXISTENT___').map((part, i, arr) => (
                            <React.Fragment key={`sent-piece-${i}`}>
                              <span>{part}</span>
                              {i < arr.length - 1 && shouldShowHighlight && (
                                <span 
                                  className={`px-3 py-1 mx-1.5 rounded-xl font-black shadow-lg transition-all inline-block border ${
                                    activeHighlightKey === 'highlight_word'
                                      ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 ring-4 ring-amber-300 scale-105 border-white animate-pulse'
                                      : 'text-slate-950 border-amber-200'
                                  }`}
                                  style={{ backgroundColor: activeHighlightKey === 'highlight_word' ? undefined : currentTheme.borderHex }}
                                >
                                  {boardData.highlight}
                                </span>
                              )}
                            </React.Fragment>
                          ));
                        })()}
                      </p>
                    </div>
                  )}

                  {/* 📐 GRAMMAR SYNTAX DISSECTION */}
                  {boardData?.grammarBreakdown && (whiteboardViewMode === 'paged' ? activeSlidePage?.sectionType === 'formula' : true) && (
                    <div className={`mt-3 p-3 rounded-2xl bg-black/30 border text-center transition-all ${
                      activeHighlightKey === 'breakdown' ? 'border-amber-400 ring-2 ring-amber-400/50' : 'border-white/10'
                    }`}>
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-300/80 block mb-2">
                        {isRtl ? 'تفكيك عناصر الجملة نحوياً (Syntax Breakdown) 📐' : 'Sentence Syntax Breakdown 📐'}
                      </span>
                      <div className="flex items-center justify-center flex-wrap gap-2">
                        {Array.isArray(boardData.grammarBreakdown.parts) && boardData.grammarBreakdown.parts.map((p, pIdx) => {
                          const colorClass = 
                            p.color === 'blue' ? 'bg-blue-500/20 text-blue-200 border-blue-400/40' :
                            p.color === 'amber' ? 'bg-amber-500/20 text-amber-200 border-amber-400/40' :
                            p.color === 'emerald' ? 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40' :
                            p.color === 'purple' ? 'bg-purple-500/20 text-purple-200 border-purple-400/40' :
                            'bg-rose-500/20 text-rose-200 border-rose-400/40';
                          return (
                            <div key={`gb-${pIdx}`} className={`px-3 py-1.5 rounded-xl border flex flex-col items-center ${colorClass}`}>
                              <span className="text-[9px] font-bold opacity-80 uppercase">{p.label}</span>
                              <span className="text-sm sm:text-base font-black font-mono">{p.text}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 🎙️ PHONETICS & SYLLABLES LAB */}
                  {boardData?.phoneticBreakdown && (whiteboardViewMode === 'paged' ? activeSlidePage?.sectionType === 'objective' : true) && (
                    <div className={`mt-3 p-3 rounded-2xl bg-gradient-to-r from-teal-950/40 to-slate-900/60 border transition-all ${
                      activeHighlightKey === 'phonetic' ? 'border-teal-400 ring-2 ring-teal-400/60' : 'border-teal-400/30'
                    }`}>
                      <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                        <div className="flex items-center gap-2">
                          <span className="p-1 rounded-lg bg-teal-400 text-slate-950 font-black text-xs">🎙️</span>
                          <span className="text-xs font-black text-teal-200">
                            {isRtl ? 'معمل النطق الصوتي والمقاطع (Phonetics Lab)' : 'Phonetics & Syllables Lab'}
                          </span>
                        </div>
                        {boardData.phoneticBreakdown.ipa && (
                          <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-black/40 text-teal-300 border border-teal-400/30" dir="ltr">
                            {boardData.phoneticBreakdown.ipa}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-center gap-2 flex-wrap py-1">
                        {Array.isArray(boardData.phoneticBreakdown.syllables) && boardData.phoneticBreakdown.syllables.map((syl, sIdx) => (
                          <React.Fragment key={`syl-${sIdx}`}>
                            <button
                              onClick={() => onSpeak(syl)}
                              className="px-3 py-1.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-100 border border-teal-300/40 font-black text-sm transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
                              title={isRtl ? 'استمع لهذا المقطع الصوتي' : 'Hear syllable'}
                            >
                              {syl}
                            </button>
                            {sIdx < (boardData.phoneticBreakdown?.syllables?.length || 1) - 1 && (
                              <span className="text-teal-400 font-black text-sm">•</span>
                            )}
                          </React.Fragment>
                        ))}

                        <button
                          onClick={() => onSpeak(boardData.phoneticBreakdown!.word)}
                          className="ms-2 px-3 py-1.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer"
                          title={isRtl ? 'استمع للكلمة كاملة بنطق نقي' : 'Hear complete word'}
                        >
                          <Volume2 size={13} />
                          <span>{isRtl ? 'انطق الكلمة' : 'Hear Word'}</span>
                        </button>
                      </div>

                      {boardData.phoneticBreakdown.tip && (
                        <p className="text-[11px] text-teal-100/80 font-bold mt-2 pt-1.5 border-t border-teal-500/20 text-center">
                          💡 {boardData.phoneticBreakdown.tip}
                        </p>
                      )}
                    </div>
                  )}

                  {/* ⚡ INSTANT MASTERY DRILL CHALLENGE */}
                  {boardData?.drillChallenge && (whiteboardViewMode === 'paged' ? activeSlidePage?.sectionType === 'formula' : true) && (
                    <div className={`mt-3 p-3 rounded-2xl bg-gradient-to-r from-amber-950/40 to-slate-900/60 border transition-all ${
                      activeHighlightKey === 'drill' ? 'border-amber-400 ring-2 ring-amber-400/60' : 'border-amber-400/40'
                    }`}>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-black uppercase text-amber-300 flex items-center gap-1.5">
                          <span>⚡</span>
                          <span>{isRtl ? 'تحدي الإتقان والتطبيق الفوري (Mastery Drill)' : 'Instant Mastery Drill'}</span>
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30 font-black">
                          {boardData.drillChallenge.type}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-black text-white mb-2">
                        {boardData.drillChallenge.instruction}
                      </p>
                      <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-black/40 border border-white/10 flex-wrap">
                        <span className="text-xs text-amber-200 font-bold font-mono">
                          {boardData.drillChallenge.hint ? `💡 تلميح: ${boardData.drillChallenge.hint}` : `🎯 الحل: ${boardData.drillChallenge.targetText}`}
                        </span>
                        <button
                          onClick={() => onSpeak(boardData.drillChallenge!.targetText)}
                          className="px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[11px] flex items-center gap-1 transition-all cursor-pointer shadow-xs active:scale-95"
                        >
                          <Volume2 size={12} />
                          <span>{isRtl ? 'استمع للحل النموذجي' : 'Hear Model Answer'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ======================================================== */}
              {/* 🌟 4. DUAL-COLUMN ORGANIZED CONTENT GRID */}
              {/* Column 1: Deep Explanations (Notes & Diagram & Mnemonic & Vocab) */}
              {/* Column 2: Application & Testing (Pitfalls, Correction, CCQ, Speaking, Quiz) */}
              {/* ======================================================== */}
              {(boardData?.notes || boardData?.diagram || boardData?.correction || boardData?.quiz || boardData?.commonPitfall || boardData?.mnemonic || boardData?.ccq || boardData?.vocabularyBank || boardData?.speakingPrompt) && (
                <div className={`grid gap-4 items-start ${
                  whiteboardViewMode === 'paged' ? 'grid-cols-1' : contentViewFilter === 'all' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
                }`}>
                  
                  {/* ==================================================== */}
                  {/* SIDE A: المفاهيم والشرح الذهبي (Notes & Diagram) */}
                  {/* ==================================================== */}
                  {(whiteboardViewMode === 'paged' 
                    ? (activeSlidePage?.sectionType === 'rules' || activeSlidePage?.sectionType === 'speaking')
                    : (contentViewFilter === 'all' || contentViewFilter === 'notes')) && (
                    <div className="space-y-4">
                      {/* 💡 GOLDEN NOTES CARD */}
                      {Array.isArray(boardData?.notes) && boardData.notes.length > 0 && 
                        (whiteboardViewMode === 'paged' ? activeSlidePage?.sectionType === 'rules' : true) && (
                        <div 
                          className={`border rounded-2xl sm:rounded-3xl p-4 shadow-xl transition-all ${
                            activeExplanationSection === 'notes' || activeHighlightKey === 'notes'
                              ? 'ring-4 ring-amber-400 border-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.35)] scale-[1.01]'
                              : ''
                          }`}
                          style={{
                            backgroundColor: currentTheme.cardBg,
                            borderColor: activeExplanationSection === 'notes' || activeHighlightKey === 'notes' ? '#FACC15' : currentTheme.cardBorder
                          }}
                        >
                          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                            <h4 
                              className="text-xs sm:text-sm font-black flex items-center gap-1.5"
                              style={{ color: currentTheme.accentHex }}
                            >
                              <Lightbulb size={15} className="text-amber-400" />
                              <span>{isRtl ? 'نقاط الشرح الذهبية 💡' : 'Key Golden Takeaways 💡'}</span>
                            </h4>

                            <button
                              onClick={() => handleExplainSection('notes')}
                              className="px-2 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 text-amber-200 border border-white/15 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                              title={isRtl ? 'سارة تشرح هذه النقاط بالصوت' : 'Sara explains key notes'}
                            >
                              <Volume2 size={12} className="text-amber-400" />
                              <span>{isRtl ? 'استمع للشرح 🎙️' : 'Explain'}</span>
                            </button>
                          </div>

                          <div className="space-y-2.5">
                            {boardData.notes.map((note, nIdx) => (
                              <div 
                                key={`note-${nIdx}`} 
                                className="flex items-start gap-2.5 p-2 rounded-xl bg-white/5 border border-white/5 hover:border-amber-400/30 transition-colors"
                              >
                                <span 
                                  className="w-5 h-5 rounded-lg text-slate-950 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5 shadow-xs"
                                  style={{ backgroundColor: currentTheme.borderHex }}
                                >
                                  {nIdx + 1}
                                </span>
                                <p className="text-xs sm:text-sm font-medium leading-relaxed flex-1">
                                  {note}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 🧠 SMART MNEMONIC HOOK CARD (Rendered on pitfalls page in paged mode or notes in scroll) */}
                      {boardData?.mnemonic && (whiteboardViewMode === 'paged' ? activeSlidePage?.sectionType === 'pitfalls' : true) && (
                        <div
                          className={`border rounded-2xl sm:rounded-3xl p-4 shadow-xl transition-all bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-slate-900/60 ${
                            activeHighlightKey === 'mnemonic' ? 'border-amber-400 ring-4 ring-amber-400/40 shadow-2xl scale-[1.01]' : 'border-purple-400/40'
                          }`}
                        >
                          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                            <h4 className="text-xs sm:text-sm font-black flex items-center gap-1.5 text-purple-200">
                              <span className="text-base">🧠</span>
                              <span>{isRtl ? 'حيلة الذاكرة الذكية (Smart Memory Hook) 💡' : 'Smart Memory Hook 💡'}</span>
                            </h4>
                            <button
                              onClick={() => onSpeak(boardData.mnemonic!)}
                              className="px-2 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 text-purple-200 border border-white/15 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                              title={isRtl ? 'سارة تقرأ حيلة الذاكرة' : 'Hear memory hook'}
                            >
                              <Volume2 size={12} className="text-purple-300" />
                              <span>{isRtl ? 'استمع 🎙️' : 'Listen'}</span>
                            </button>
                          </div>
                          <p className="text-xs sm:text-sm font-black text-amber-200 leading-relaxed bg-black/35 p-2.5 rounded-xl border border-purple-400/20">
                            ✨ {boardData.mnemonic}
                          </p>
                        </div>
                      )}

                      {/* 📚 VOCABULARY BANK CARD */}
                      {Array.isArray(boardData?.vocabularyBank) && boardData.vocabularyBank.length > 0 && 
                        (whiteboardViewMode === 'paged' ? activeSlidePage?.sectionType === 'speaking' : true) && (
                        <div
                          className={`border rounded-2xl sm:rounded-3xl p-4 shadow-xl transition-all bg-gradient-to-r from-cyan-950/40 via-teal-950/30 to-slate-900/60 ${
                            activeHighlightKey === 'vocab' ? 'border-cyan-400 ring-4 ring-cyan-400/40 scale-[1.01]' : 'border-cyan-400/40'
                          }`}
                        >
                          <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-white/10">
                            <h4 className="text-xs sm:text-sm font-black flex items-center gap-1.5 text-cyan-200">
                              <BookOpen size={15} className="text-cyan-400" />
                              <span>{isRtl ? 'بنك مفردات الدرس (Vocabulary Bank) 📚' : 'Lesson Vocabulary Bank 📚'}</span>
                            </h4>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-200 border border-cyan-400/30">
                              {boardData.vocabularyBank.length} {isRtl ? 'كلمات' : 'words'}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {boardData.vocabularyBank.map((vocab, vIdx) => (
                              <div
                                key={`vocab-${vIdx}`}
                                className="p-2.5 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between gap-1 hover:border-cyan-400/40 transition-all"
                              >
                                <div className="flex items-center justify-between gap-1">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs sm:text-sm font-black text-white font-mono">{vocab.word}</span>
                                    {vocab.pos && (
                                      <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-cyan-400/20 text-cyan-300 font-bold border border-cyan-400/30">
                                        {vocab.pos}
                                      </span>
                                    )}
                                  </div>
                                  <button
                                    onClick={() => onSpeak(vocab.word)}
                                    className="p-1 rounded-md bg-white/10 hover:bg-cyan-400 hover:text-slate-950 text-cyan-200 transition-all cursor-pointer"
                                    title={isRtl ? 'نطق الكلمة' : 'Hear pronunciation'}
                                  >
                                    <Volume2 size={12} />
                                  </button>
                                </div>
                                <span className="text-xs text-amber-200 font-bold">{vocab.meaning}</span>
                                {vocab.example && (
                                  <span className="text-[10px] text-slate-300 italic border-t border-white/10 pt-1 mt-0.5">
                                    "{vocab.example}"
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 🎨 VOCABULARY & CONCEPT DIAGRAM */}
                      {boardData?.diagram && (whiteboardViewMode === 'paged' ? activeSlidePage?.sectionType === 'rules' : true) && (
                        <div 
                          className={`border rounded-2xl sm:rounded-3xl p-4 shadow-xl transition-all ${
                            activeExplanationSection === 'diagram' || activeHighlightKey === 'diagram'
                              ? 'ring-4 ring-amber-400 border-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.35)] scale-[1.01]'
                              : ''
                          }`}
                          style={{
                            backgroundColor: currentTheme.cardBg,
                            borderColor: activeExplanationSection === 'diagram' || activeHighlightKey === 'diagram' ? '#FACC15' : currentTheme.cardBorder
                          }}
                        >
                          <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
                            <h4 
                              className="text-xs sm:text-sm font-black flex items-center gap-1.5"
                              style={{ color: currentTheme.accentHex }}
                            >
                              <Layers size={15} className="text-amber-400" />
                              <span>{boardData.diagram.label || (isRtl ? 'خريطة المفردات والمفاهيم 🎨' : 'Concept Diagram 🎨')}</span>
                            </h4>

                            <button
                              onClick={() => handleExplainSection('diagram')}
                              className="px-2 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 text-amber-200 border border-white/15 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                              title={isRtl ? 'سارة تشرح هذا المخطط بالصوت' : 'Sara explains diagram'}
                            >
                              <Volume2 size={12} className="text-amber-400" />
                              <span>{isRtl ? 'استمع للشرح 🎙️' : 'Explain'}</span>
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {Array.isArray(boardData.diagram.items) && boardData.diagram.items.map((item, dIdx) => (
                              <div 
                                key={`diag-${dIdx}`} 
                                className="border rounded-xl p-2.5 hover:border-amber-400/50 transition-all bg-white/5"
                                style={{ borderColor: currentTheme.cardBorder }}
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  {item.icon && <span className="text-base">{item.icon}</span>}
                                  <span 
                                    className="text-xs sm:text-sm font-black truncate"
                                    style={{ color: currentTheme.accentHex }}
                                  >
                                    {item.title}
                                  </span>
                                </div>
                                <p className={`text-[11px] leading-relaxed ${currentTheme.isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                                  {item.desc}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ==================================================== */}
                  {/* SIDE B: التطبيق والممارسة (Correction & Quiz) */}
                  {/* ==================================================== */}
                  {((whiteboardViewMode === 'paged'
                    ? (activeSlidePage?.sectionType === 'pitfalls' || activeSlidePage?.sectionType === 'speaking' || activeSlidePage?.sectionType === 'quiz')
                    : (contentViewFilter === 'all' || contentViewFilter === 'practice'))) && (
                    <div className="space-y-4">
                      {/* ⚠️ COMMON PITFALL ALERT CARD */}
                      {boardData?.commonPitfall && (whiteboardViewMode === 'paged' ? activeSlidePage?.sectionType === 'pitfalls' : true) && (
                        <div
                          className={`border rounded-2xl sm:rounded-3xl p-4 shadow-xl transition-all bg-gradient-to-r from-rose-950/40 via-amber-950/30 to-slate-900/60 ${
                            activeHighlightKey === 'pitfall' ? 'border-amber-400 ring-4 ring-amber-400/50 shadow-[0_0_25px_rgba(251,191,36,0.4)] scale-[1.01]' : 'border-rose-400/40'
                          }`}
                        >
                          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                            <span className="text-xs sm:text-sm font-black flex items-center gap-1.5 text-rose-200">
                              <AlertCircle size={15} className="text-rose-400" />
                              <span>{isRtl ? 'احذر هذا الفخ الشائع (Common Pitfall) ⚠️' : 'Common Pitfall Alert ⚠️'}</span>
                              {activeHighlightKey === 'pitfall' && (
                                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 animate-pulse ms-1">
                                  {isRtl ? '🎙️ سارة تشرح الآن' : '🎙️ Sara Explaining'}
                                </span>
                              )}
                            </span>
                            <button
                              onClick={() => onSpeak(boardData.commonPitfall!.good)}
                              className="px-2 py-0.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                              title={isRtl ? 'استمع للصواب' : 'Hear correct phrase'}
                            >
                              <Volume2 size={12} className="text-emerald-400" />
                              <span>{isRtl ? 'انطق الصواب 🎙️' : 'Hear Correct'}</span>
                            </button>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm mb-2">
                            <div className="flex items-center gap-2 text-rose-300 bg-rose-950/60 border border-rose-500/30 p-2.5 rounded-xl">
                              <XCircle size={16} className="text-rose-400 shrink-0" />
                              <div className="min-w-0">
                                <span className="text-[10px] text-rose-400/80 font-bold block">{isRtl ? '❌ تجنب هذا:' : '❌ Avoid:'}</span>
                                <span className="line-through font-bold">{boardData.commonPitfall.bad}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 p-2.5 rounded-xl font-black">
                              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                              <div className="min-w-0">
                                <span className="text-[10px] text-emerald-400/80 font-bold block">{isRtl ? '✅ الصواب النموذجي:' : '✅ Say this:'}</span>
                                <span>{boardData.commonPitfall.good}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-amber-100/90 font-medium leading-relaxed bg-black/35 p-2 rounded-xl border border-white/5">
                            💡 <span className="font-bold">{isRtl ? 'لماذا؟' : 'Why?'}</span> {boardData.commonPitfall.explanation}
                          </p>
                        </div>
                      )}

                      {/* 🔄 MISTAKE CORRECTION CARD */}
                      {boardData?.correction && (whiteboardViewMode === 'paged' ? activeSlidePage?.sectionType === 'pitfalls' : true) && (!boardData.quiz || (quizSelectedOption !== null && quizSelectedOption !== undefined)) && (
                        <div 
                          className={`border rounded-2xl sm:rounded-3xl p-4 shadow-xl transition-all ${
                            activeExplanationSection === 'correction' || activeHighlightKey === 'correction'
                              ? 'ring-4 ring-amber-400 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.35)] scale-[1.01]'
                              : ''
                          }`}
                          style={{
                            backgroundColor: currentTheme.cardBg,
                            borderColor: activeExplanationSection === 'correction' || activeHighlightKey === 'correction' ? '#FACC15' : currentTheme.cardBorder
                          }}
                        >
                          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                            <span className="text-xs font-black flex items-center gap-1.5" style={{ color: currentTheme.accentHex }}>
                              <Target size={14} className="text-emerald-400" />
                              <span>{isRtl ? 'تصحيح الأخطاء الشائعة 🔄' : 'Natural vs Common Mistake 🔄'}</span>
                              {activeHighlightKey === 'correction' && (
                                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 animate-pulse ms-1">
                                  {isRtl ? '🎙️ سارة تشرح الآن' : '🎙️ Sara Explaining'}
                                </span>
                              )}
                            </span>

                            <button
                              onClick={() => handleExplainSection('correction')}
                              className="px-2 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 text-amber-200 border border-white/15 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                            >
                              <Volume2 size={12} className="text-amber-400" />
                              <span>{isRtl ? 'استمع للتصحيح 🎙️' : 'Explain'}</span>
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                            <div className="flex items-center gap-2 text-rose-300 bg-rose-950/60 border border-rose-500/30 p-2.5 rounded-xl">
                              <XCircle size={16} className="text-rose-400 shrink-0" />
                              <div className="min-w-0">
                                <span className="text-[10px] text-rose-400/80 font-bold block">{isRtl ? 'تجنب هذا ✕' : 'Avoid ✕'}</span>
                                <span className="line-through font-bold">{boardData.correction.wrong}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 p-2.5 rounded-xl font-black">
                              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                              <div className="min-w-0">
                                <span className="text-[10px] text-emerald-400/80 font-bold block">{isRtl ? 'الصحيح الطبيعي ✓' : 'Correct ✓'}</span>
                                <span>{boardData.correction.right}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ❓ CONCEPT CHECKING QUESTION (CCQ) */}
                      {boardData?.ccq && (whiteboardViewMode === 'paged' ? activeSlidePage?.sectionType === 'pitfalls' : true) && (
                        <div
                          className="border rounded-2xl sm:rounded-3xl p-4 shadow-xl transition-all bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-slate-900/60 border-blue-400/40"
                        >
                          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                            <h4 className="text-xs sm:text-sm font-black flex items-center gap-1.5 text-blue-200">
                              <span className="text-base">❓</span>
                              <span>{isRtl ? 'فحص الفهم السريع (Concept Check) 🔍' : 'Concept Checking Question (CCQ) 🔍'}</span>
                            </h4>
                            <button
                              onClick={() => onSpeak(boardData.ccq!.question)}
                              className="px-2 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 text-blue-200 border border-white/15 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                            >
                              <Volume2 size={12} className="text-blue-300" />
                              <span>{isRtl ? 'قراءة 🎙️' : 'Read'}</span>
                            </button>
                          </div>
                          <p className="text-xs sm:text-sm font-bold text-white mb-2.5">
                            {boardData.ccq.question}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {Array.isArray(boardData.ccq.options) && boardData.ccq.options.map((opt, oIdx) => {
                              const isSelected = ccqSelectedOption === oIdx;
                              const isCorrect = oIdx === boardData.ccq!.answerIndex;
                              let btnClass = 'bg-white/10 hover:bg-white/20 text-white border-white/15';
                              if (ccqSelectedOption !== null) {
                                if (isCorrect) {
                                  btnClass = 'bg-emerald-500/30 border-emerald-400 text-emerald-200 font-black ring-2 ring-emerald-400/50';
                                } else if (isSelected && !isCorrect) {
                                  btnClass = 'bg-rose-500/30 border-rose-400 text-rose-200 line-through';
                                } else {
                                  btnClass = 'bg-black/20 text-slate-400 border-white/5 opacity-50';
                                }
                              }
                              return (
                                <button
                                  key={`ccq-opt-${oIdx}`}
                                  disabled={ccqSelectedOption !== null}
                                  onClick={() => setCcqSelectedOption(oIdx)}
                                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${btnClass}`}
                                >
                                  <span>{opt}</span>
                                  {ccqSelectedOption !== null && isCorrect && <Check size={14} className="text-emerald-400" />}
                                </button>
                              );
                            })}
                          </div>
                          {ccqSelectedOption !== null && boardData.ccq.explanation && (
                            <p className="text-xs text-amber-200 font-medium mt-2 pt-2 border-t border-white/10">
                              💡 {boardData.ccq.explanation}
                            </p>
                          )}
                        </div>
                      )}

                      {/* 🎙️ SPEAKING & PRODUCTION CHALLENGE */}
                      {boardData?.speakingPrompt && (whiteboardViewMode === 'paged' ? activeSlidePage?.sectionType === 'speaking' : true) && (
                        <div
                          className={`border rounded-2xl sm:rounded-3xl p-4 shadow-xl transition-all bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-slate-900/60 ${
                            activeHighlightKey === 'speaking' ? 'border-emerald-400 ring-4 ring-emerald-400/50 shadow-[0_0_25px_rgba(16,185,129,0.4)] scale-[1.01]' : 'border-emerald-400/40'
                          }`}
                        >
                          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                            <span className="text-xs sm:text-sm font-black flex items-center gap-1.5 text-emerald-200">
                              <Mic size={15} className="text-emerald-400" />
                              <span>{isRtl ? 'تحدي التحدث الصوتي مع سارة 🎙️' : 'Speaking Production Challenge 🎙️'}</span>
                              {activeHighlightKey === 'speaking' && (
                                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-400 text-slate-950 animate-pulse ms-1">
                                  {isRtl ? '🎙️ سارة تدعوك للحديث الآن' : '🎙️ Sara Speaking Prompt'}
                                </span>
                              )}
                            </span>
                            {boardData.speakingPrompt.sampleAnswer && (
                              <button
                                onClick={() => onSpeak(boardData.speakingPrompt!.sampleAnswer!)}
                                className="px-2 py-0.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                                title={isRtl ? 'استمع للإجابة النموذجية' : 'Hear sample answer'}
                              >
                                <Volume2 size={12} className="text-emerald-400" />
                                <span>{isRtl ? 'إجابة نموذجية 🎙️' : 'Sample Answer'}</span>
                              </button>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm font-black text-white mb-2 leading-relaxed">
                            {boardData.speakingPrompt.instruction}
                          </p>
                          {boardData.speakingPrompt.sampleAnswer && (
                            <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                              <span className="text-[10px] text-emerald-300/80 font-bold block mb-0.5">
                                {isRtl ? 'نموذج مقترح للحديث:' : 'Suggested speaking model:'}
                              </span>
                              <span className="text-xs text-emerald-200 font-bold italic font-mono">
                                "{boardData.speakingPrompt.sampleAnswer}"
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* 🎯 INTERACTIVE WHITEBOARD QUIZ CHALLENGE (LIMITED 5 QUESTIONS + FLOATING 30s TIMER) */}
                      {activeQuestion && (whiteboardViewMode === 'paged' ? activeSlidePage?.sectionType === 'quiz' : true) && (
                        <div 
                          className={`relative border-2 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-xl transition-all ${
                            activeExplanationSection === 'quiz'
                              ? 'ring-4 ring-amber-400 border-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.35)] scale-[1.01]'
                              : ''
                          }`}
                          style={{
                            backgroundColor: currentTheme.cardBg,
                            borderColor: activeExplanationSection === 'quiz' ? '#FACC15' : `${currentTheme.borderHex}88`
                          }}
                        >
                          {quizCompleted ? (
                            /* 🏆 LESSON QUIZ COMPLETION SUMMARY CARD */
                            <div className="text-center py-4 space-y-4">
                              <div className="w-16 h-16 rounded-3xl bg-amber-400/20 border-2 border-amber-400/50 flex items-center justify-center mx-auto text-amber-300 shadow-lg">
                                <Trophy size={36} className="text-amber-400 animate-bounce" />
                              </div>

                              <div>
                                <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 block mb-1">
                                  {isRtl ? 'اكتمل اختبار الدرس بنجاح 🎓' : 'Lesson Quiz Completed 🎓'}
                                </span>
                                <h4 className="text-lg sm:text-xl font-black text-white">
                                  {isRtl ? `درجتك النهائية: ${quizScore} من ${totalQuestions}` : `Your Score: ${quizScore} of ${totalQuestions}`}
                                </h4>
                                <p className="text-xs text-slate-300 font-bold mt-1">
                                  {Math.round((quizScore / totalQuestions) * 100)}% {isRtl ? 'نسبة الإتقان لهذا الدرس' : 'Mastery Rate'}
                                </p>
                              </div>

                              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-amber-200 font-medium max-w-md mx-auto">
                                💬 {quizScore === totalQuestions 
                                  ? (isRtl ? 'ما شاء الله تبارك الله! إتقان مطلق وعلامة كاملة يا بطل! 🌟' : 'Outstanding! Perfect score on this lesson! 🌟')
                                  : quizScore >= Math.ceil(totalQuestions / 2)
                                    ? (isRtl ? 'أداء ممتاز ورائع! استوعبت معظم مفاهيم الدرس ونفخر بتقدمك 👏' : 'Great effort! You mastered key concepts well 👏')
                                    : (isRtl ? 'محاولة طيبة وبداية للتعلم! راجع الشرح على السبورة وسأساعدك دائماً 🌸' : 'Good practice! Review the whiteboard notes to reinforce 🌸')}
                              </div>

                              <div className="flex items-center justify-center gap-2 pt-2 flex-wrap">
                                {onFinishLesson && (
                                  <button
                                    onClick={() => onFinishLesson(quizScore, totalQuestions)}
                                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:brightness-110 text-white font-black text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95 border border-emerald-300/40"
                                    title={isRtl ? 'إنهاء الدرس وتسجيل النتيجة وحفظ التقدم في ملفك 🎓' : 'Finish Lesson & Save Result in Profile 🎓'}
                                  >
                                    <Trophy size={16} className="text-amber-300 animate-bounce" />
                                    <span>
                                      {dailyLessonInfo && dailyLessonInfo.hasNext
                                        ? (isRtl 
                                            ? `🎓 إنهاء وترحيل الدرس ${dailyLessonInfo.current} ➔ استراحة دقيقتين ☕ ثم الدرس التالي`
                                            : `🎓 Archive Lesson ${dailyLessonInfo.current} ➔ 2-Min Break ☕ then Next Lesson`)
                                        : (isRtl ? '🎓 إنهاء وترحيل الدرس وحفظ النتيجة' : '🎓 Finish, Archive & Save Result')}
                                    </span>
                                  </button>
                                )}
                                <button
                                  onClick={handleRestartQuiz}
                                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md active:scale-95"
                                >
                                  <RefreshCw size={13} />
                                  <span>{isRtl ? 'إعادة التحدي 🔄' : 'Retry Quiz 🔄'}</span>
                                </button>
                                <button
                                  onClick={() => setContentViewFilter('focus')}
                                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                                >
                                  <BookOpen size={13} />
                                  <span>{isRtl ? 'مراجعة الشرح 📖' : 'Review Notes 📖'}</span>
                                </button>
                                {onRequestOnBoard && (
                                  <button
                                    onClick={() => {
                                      onRequestOnBoard(isRtl ? 'سارة، أتممت أسئلة التحدي بنجاح! هاتي تدريباً للمحادثة والتحدث الصوتي بالمايك لنكمل وقت الحصة 🎙️' : 'Sara, I finished the quiz! Give me a speaking and conversation challenge to continue our session 🎙️');
                                      onClose();
                                    }}
                                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:brightness-105 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md active:scale-95"
                                  >
                                    <Mic size={13} />
                                    <span>{isRtl ? 'مواصلة التدريب الصوتي 🎙️' : 'Continue Speaking 🎙️'}</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          ) : (
                            /* 📝 ACTIVE QUESTION VIEW */
                            <div>
                              {/* Header with question count, read aloud, and 30s countdown timer */}
                              <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-white/10 flex-wrap">
                                <div className="flex items-center gap-2 min-w-0">
                                  <span 
                                    className="w-7 h-7 rounded-xl text-slate-900 font-black text-xs flex items-center justify-center shadow-xs shrink-0"
                                    style={{ backgroundColor: currentTheme.borderHex }}
                                  >
                                    ?
                                  </span>
                                  <div className="min-w-0">
                                    <span className="text-xs font-black uppercase tracking-wider block truncate" style={{ color: currentTheme.accentHex }}>
                                      {isRtl ? 'تحدي الدرس السريع 🎯' : 'Lesson Quiz Challenge 🎯'}
                                    </span>
                                    <span className="text-[10px] font-mono text-amber-300/90 font-bold">
                                      {isRtl ? `السؤال ${quizQuestionIndex + 1} من ${totalQuestions}` : `Question ${quizQuestionIndex + 1} of ${totalQuestions}`}
                                    </span>
                                  </div>
                                </div>

                                {/* Timer & Read Controls (Never clipped on mobile) */}
                                <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
                                  <button
                                    onClick={() => {
                                      if (activeQuestion?.question) {
                                        onSpeak(activeQuestion.question);
                                        // Start timer countdown as Sara asks / reads the question
                                        setHasTimerStarted(true);
                                        setIsTimerRunning(true);
                                      }
                                    }}
                                    className="px-2.5 py-1 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 border border-amber-400/30 text-[10px] sm:text-xs font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95 shadow-2xs"
                                    title={isRtl ? 'سارة تقرأ السؤال بصوتها ويبدأ التوقيت فوراً' : 'Sara reads question and timer starts'}
                                  >
                                    <Volume2 size={12} className="text-amber-400" />
                                    <span>{isRtl ? 'طرح السؤال 🎙️' : 'Read 🎙️'}</span>
                                  </button>

                                  {/* 30-Second Countdown Timer Badge */}
                                  {!hasTimerStarted ? (
                                    <button
                                      onClick={() => {
                                        setHasTimerStarted(true);
                                        setIsTimerRunning(true);
                                      }}
                                      className="flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-xl border-2 border-amber-300 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-slate-950 font-black text-[11px] sm:text-xs shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer animate-pulse"
                                      title={isRtl ? 'بدء العد التنازلي للمؤقت (30 ثانية)' : 'Start 30s Timer'}
                                    >
                                      <Play size={11} className="fill-slate-950 text-slate-950" />
                                      <span>{isRtl ? 'ابدأ المؤقت ▶️ (30ث)' : 'Start (30s)'}</span>
                                    </button>
                                  ) : (
                                    <div className="flex items-center gap-1">
                                      <div className={`flex items-center gap-1 px-2.5 py-1 rounded-xl border-2 shadow-sm font-mono font-black text-[11px] sm:text-xs transition-all ${
                                        quizTimeUp 
                                          ? 'bg-rose-600 text-white border-rose-300 animate-bounce shadow-rose-600/50' 
                                          : quizTimeLeft <= 5 
                                            ? 'bg-rose-500 text-white border-rose-300 animate-pulse shadow-rose-500/50' 
                                            : quizTimeLeft <= 10 
                                              ? 'bg-amber-400 text-slate-950 border-amber-200 shadow-amber-400/40' 
                                              : 'bg-indigo-600/90 text-white border-indigo-400/60 shadow-indigo-600/30'
                                      }`}>
                                        <Timer size={12} className={isTimerRunning && quizTimeLeft <= 10 ? 'animate-spin' : ''} />
                                        <span>{quizTimeUp ? (isRtl ? 'انتهى الوقت ⏱️' : 'Time Up!') : `${quizTimeLeft} ث`}</span>
                                      </div>

                                      {!quizTimeUp && localQuizSelectedOption === null && (
                                        <button
                                          onClick={() => setIsTimerRunning(prev => !prev)}
                                          className="w-6 h-6 rounded-lg bg-black/40 hover:bg-black/60 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer text-[10px]"
                                          title={isTimerRunning ? (isRtl ? 'إيقاف مؤقت' : 'Pause') : (isRtl ? 'استئناف' : 'Resume')}
                                        >
                                          {isTimerRunning ? <Pause size={10} /> : <Play size={10} className="fill-white" />}
                                        </button>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Progress bar across question card */}
                              <div className="w-full h-1.5 bg-black/30 rounded-full overflow-hidden mb-3">
                                <div 
                                  className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-300"
                                  style={{ width: `${((quizQuestionIndex + 1) / totalQuestions) * 100}%` }}
                                />
                              </div>

                              {/* Question text */}
                              <p className="text-xs sm:text-sm font-black mb-3 px-1 leading-relaxed" style={{ color: currentTheme.accentHex }}>
                                {activeQuestion.question}
                              </p>

                              {/* Options: Full-width, multi-line, touch-friendly, 2x2 grid on tablets/desktop */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                                {(Array.isArray(activeQuestion.options) ? activeQuestion.options : []).map((opt, oIdx) => {
                                  const isSelected = localQuizSelectedOption === oIdx;
                                  const isCorrect = oIdx === activeQuestion.answerIndex;

                                  let btnClass = 'bg-white/10 border-white/15 text-slate-200 hover:bg-white/20 hover:border-amber-300';
                                  if (currentTheme.isLight) {
                                    btnClass = 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200';
                                  }

                                  if (localQuizSelectedOption !== null || quizTimeUp) {
                                    if (isCorrect) {
                                      btnClass = 'bg-emerald-600/40 border-emerald-400 text-emerald-200 font-black ring-2 ring-emerald-400/50';
                                    } else if (isSelected && !isCorrect) {
                                      btnClass = 'bg-rose-600/40 border-rose-400 text-rose-200 line-through';
                                    } else {
                                      btnClass = 'bg-black/20 border-transparent text-slate-500 opacity-50';
                                    }
                                  }

                                  const optionLetters = ['A', 'B', 'C', 'D'];

                                  return (
                                    <button
                                      key={`wb-opt-${quizQuestionIndex}-${oIdx}`}
                                      disabled={localQuizSelectedOption !== null || quizTimeUp}
                                      onClick={() => handleAnswerQuestion(oIdx)}
                                      className={`w-full min-h-[46px] p-3 rounded-2xl border-2 text-xs sm:text-sm font-bold transition-all text-start flex items-center justify-between gap-3 cursor-pointer ${btnClass}`}
                                    >
                                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                        <span className="w-6 h-6 rounded-xl bg-black/30 border border-white/20 text-xs font-mono font-black flex items-center justify-center shrink-0">
                                          {optionLetters[oIdx] || oIdx + 1}
                                        </span>
                                        <span className="break-words leading-relaxed whitespace-normal flex-1">{opt}</span>
                                      </div>
                                      {(localQuizSelectedOption !== null || quizTimeUp) && isCorrect && (
                                        <Check size={18} className="text-emerald-300 shrink-0 animate-bounce" />
                                      )}
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Feedback / Time Up Indicator */}
                              {(localQuizFeedback || quizTimeUp) && (
                                <motion.div 
                                  initial={{ opacity: 0, y: 4 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className={`mt-3 p-2.5 rounded-xl text-xs font-black text-center border ${
                                    quizTimeUp 
                                      ? 'bg-rose-500/20 text-rose-200 border-rose-400/40'
                                      : localQuizFeedback === 'correct' 
                                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40' 
                                        : 'bg-amber-400/20 text-amber-200 border-amber-400/40'
                                  }`}
                                >
                                  {quizTimeUp 
                                    ? (isRtl ? '⏱️ انتهى وقت الإجابة (30 ثانية)! تم إظهار الخيار الصحيح بالأخضر' : '⏱️ Time is up (30s)! Correct answer highlighted in green')
                                    : localQuizFeedback === 'correct' 
                                      ? (isRtl ? '🎉 كفو عليك يا بطل! إجابة صحيحة وممتازة 🌟' : '🎉 Excellent! That is correct! 🌟')
                                      : (isRtl ? '👏 محاولة جيدة! ركز على الخيار الأخضر الصحيح' : '👏 Good try! Note the green correct option')}
                                </motion.div>
                              )}

                              {/* Next question / Finish challenge button */}
                              {(localQuizSelectedOption !== null || quizTimeUp) && (
                                <motion.div 
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="mt-3 flex justify-end"
                                >
                                  <button
                                    onClick={handleNextQuestion}
                                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer active:scale-95"
                                  >
                                    <span>
                                      {quizQuestionIndex < totalQuestions - 1
                                        ? (isRtl ? `السؤال التالي (${quizQuestionIndex + 2} من ${totalQuestions}) ➡️` : `Next Question (${quizQuestionIndex + 2}/${totalQuestions}) ➡️`)
                                        : (isRtl ? 'عرض النتيجة الإجمالية 🏆' : 'View Final Score 🏆')}
                                    </span>
                                  </button>
                                </motion.div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                </div>
              )}

              {/* ======================================================== */}
              {/* 🌟 4.5 INTERACTIVE SLIDE PAGE TURNER BANNER */}
              {/* ======================================================== */}
              {whiteboardViewMode === 'paged' && whiteboardPages && whiteboardPages.length > 0 && activeSlidePage && (
                <motion.div 
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="sticky bottom-2 z-30 mx-auto max-w-4xl w-full p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 shadow-2xl border-2 border-white ring-4 ring-amber-400/40 backdrop-blur-md transition-all my-3"
                >
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-10 h-10 rounded-2xl bg-slate-950 text-white flex items-center justify-center text-lg shrink-0 shadow-inner">
                        👩‍🏫
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-950 text-amber-300">
                            {isRtl ? `صفحة ${currentPageIndex + 1} من ${whiteboardPages.length}` : `Slide ${currentPageIndex + 1} of ${whiteboardPages.length}`}
                          </span>
                          <span className="text-xs font-black text-slate-900 truncate">
                            {isRtl ? activeSlidePage.titleAr : activeSlidePage.titleEn}
                          </span>
                          {autoAdvanceCountdown !== null && (
                            <span className="text-[11px] font-black font-mono px-2 py-0.5 rounded-full bg-rose-600 text-white animate-pulse">
                              ⏱️ {autoAdvanceCountdown}s
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm font-black text-slate-950 mt-0.5">
                          {currentPageIndex < whiteboardPages.length - 1
                            ? (isRtl ? 'هل استوعبت هذا يا بطل؟ هل نقلب الصفحة؟ 📄' : 'Did you get this champion? Shall we turn the page? 📄')
                            : (isRtl ? 'وصلت للصفحة الأخيرة! تفضل بحل كويز الإتقان 🎯' : 'You reached the final slide! Tackle the mastery quiz 🎯')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ms-auto">
                      {currentPageIndex > 0 && (
                        <button
                          onClick={handlePrevPage}
                          className="px-3 py-2 rounded-xl bg-slate-950/20 hover:bg-slate-950/30 text-slate-950 font-bold text-xs flex items-center gap-1 transition-all cursor-pointer active:scale-95"
                          title={isRtl ? 'الصفحة السابقة' : 'Previous page'}
                        >
                          {isRtl ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                          <span>{isRtl ? 'السابق' : 'Prev'}</span>
                        </button>
                      )}

                      <button
                        onClick={() => explainPage(currentPageIndex)}
                        className="px-3 py-2 rounded-xl bg-slate-950/15 hover:bg-slate-950/25 text-slate-950 font-bold text-xs flex items-center gap-1 transition-all cursor-pointer active:scale-95"
                        title={isRtl ? 'إعادة استماع شرح هذه الصفحة' : 'Replay explanation'}
                      >
                        <Volume2 size={13} />
                        <span className="hidden sm:inline">{isRtl ? 'إعادة الشرح 🎙️' : 'Replay 🎙️'}</span>
                      </button>

                      {/* 🎙️ زر المايك لسؤال الطالب عن هذه الصفحة قبل التقليب (في كل الصفحات الست) */}
                      <button
                        onClick={() => {
                          if (isListeningPageQuestion) {
                            handleStopPageVoiceQuestion();
                            if (pageQuestionInput.trim()) {
                              handleSubmitPageQuestion();
                            }
                          } else {
                            handleStartPageVoiceQuestion(activeSlidePage);
                          }
                        }}
                        className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95 ${
                          isListeningPageQuestion
                            ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse ring-2 ring-white shadow-rose-500/50'
                            : 'bg-white hover:bg-slate-50 text-slate-950 border border-slate-950/20 shadow-sm'
                        }`}
                        title={isRtl ? `اسأل سارة بالمايك عن جزئية (${activeSlidePage.titleAr}) قبل التقليب 🎙️` : `Ask Sara by mic about (${activeSlidePage.titleEn}) before turning page 🎙️`}
                      >
                        {isListeningPageQuestion ? (
                          <>
                            <MicOff size={15} className="animate-spin text-white" />
                            <span>{isRtl ? 'أسمعك.. تكلّم 🔴' : 'Listening.. 🔴'}</span>
                          </>
                        ) : (
                          <>
                            <Mic size={15} className="text-rose-600 animate-bounce" />
                            <span>{isRtl ? 'اسأل بالمايك 🎙️' : 'Ask by Mic 🎙️'}</span>
                          </>
                        )}
                      </button>

                      {currentPageIndex < whiteboardPages.length - 1 ? (
                        <button
                          onClick={handleNextPage}
                          className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-black text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-xl hover:scale-105 active:scale-95 ring-2 ring-white/70 animate-pulse"
                        >
                          <span>{isRtl ? 'اقلب الصفحة واشرحي 📄 ➔' : 'Turn Page & Explain 📄 ➔'}</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            if (activeQuestion?.question) {
                              onSpeak(activeQuestion.question);
                              setHasTimerStarted(true);
                              setIsTimerRunning(true);
                            }
                          }}
                          className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-xl hover:scale-105 active:scale-95 ring-2 ring-white/70"
                        >
                          <span>{isRtl ? 'ابدأ كويز الإتقان 🎯' : 'Start Mastery Quiz 🎯'}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Interactive Question Drawer for the Current Page */}
                  <AnimatePresence>
                    {(showPageQuestionBox || isListeningPageQuestion || pageQuestionNotice || pageQuestionInput) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 pt-3 border-t border-slate-950/15 overflow-hidden w-full"
                      >
                        <div className="bg-slate-950/95 text-white p-3 rounded-2xl border border-white/20 shadow-xl space-y-2">
                          <div className="flex items-center justify-between gap-2 text-xs font-black">
                            <div className="flex items-center gap-1.5 text-amber-300 min-w-0">
                              <span className="text-sm shrink-0">🎙️</span>
                              <span className="truncate">
                                {isRtl 
                                  ? `سؤالك لسارة عن جزئية: "${activeSlidePage.titleAr}" (${activeSlidePage.subtitleAr})`
                                  : `Your question to Sara about: "${activeSlidePage.titleEn}" (${activeSlidePage.subtitleEn})`}
                              </span>
                            </div>
                            <button
                              onClick={() => {
                                handleStopPageVoiceQuestion();
                                setShowPageQuestionBox(false);
                                setPageQuestionNotice(null);
                              }}
                              className="p-1 rounded-lg hover:bg-white/20 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                              title={isRtl ? 'إغلاق' : 'Close'}
                            >
                              <X size={14} />
                            </button>
                          </div>

                          {pageQuestionNotice && (
                            <div className="text-[11px] font-bold text-amber-200 bg-amber-500/20 border border-amber-400/30 p-2 rounded-xl flex items-center gap-1.5">
                              <Sparkles size={12} className="text-amber-300 shrink-0 animate-spin" />
                              <span>{pageQuestionNotice}</span>
                            </div>
                          )}

                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={pageQuestionInput}
                              onChange={(e) => setPageQuestionInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleSubmitPageQuestion();
                                }
                              }}
                              placeholder={
                                isListeningPageQuestion
                                  ? (isRtl ? 'تحدث الآن، سارة تسمعك...' : 'Speak now, Sara is listening...')
                                  : (isRtl ? `تحدث بالمايك أو اكتب أي سؤال عن (${activeSlidePage.titleAr})...` : `Speak or type your question about (${activeSlidePage.titleEn})...`)
                              }
                              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                            />

                            <button
                              onClick={() => {
                                if (isListeningPageQuestion) {
                                  handleStopPageVoiceQuestion();
                                  if (pageQuestionInput.trim()) handleSubmitPageQuestion();
                                } else {
                                  handleStartPageVoiceQuestion(activeSlidePage);
                                }
                              }}
                              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                                isListeningPageQuestion
                                  ? 'bg-rose-600 hover:bg-rose-700 text-white border-white animate-pulse'
                                  : 'bg-white/10 hover:bg-white/20 text-amber-300 border-white/20'
                              }`}
                              title={isListeningPageQuestion ? (isRtl ? 'إيقاف وإرسال' : 'Stop & Send') : (isRtl ? 'تحدث بالمايك' : 'Speak')}
                            >
                              {isListeningPageQuestion ? <MicOff size={15} /> : <Mic size={15} />}
                            </button>

                            <button
                              disabled={!pageQuestionInput.trim()}
                              onClick={() => handleSubmitPageQuestion()}
                              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                            >
                              <span>{isRtl ? 'إرسال السؤال' : 'Ask Sara'}</span>
                              <Send size={12} className={isRtl ? 'rotate-180' : ''} />
                            </button>
                          </div>

                          {/* Quick Suggestion Chips for this specific page */}
                          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
                            <span className="text-[10px] text-slate-400 font-bold shrink-0">
                              {isRtl ? 'أسئلة سريعة مقترحة:' : 'Quick questions:'}
                            </span>
                            {getPageQuickQuestions(activeSlidePage.sectionType, isRtl).map((qq, idx) => (
                              <button
                                key={`qq-${activeSlidePage.id}-${idx}`}
                                onClick={() => {
                                  setPageQuestionInput(qq);
                                  handleSubmitPageQuestion(qq);
                                }}
                                className="px-2 py-0.5 rounded-lg bg-white/10 hover:bg-amber-400/20 text-amber-200 hover:text-amber-100 border border-white/15 text-[10px] font-bold whitespace-nowrap transition-colors cursor-pointer shrink-0"
                              >
                                {qq}
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* ======================================================== */}
              {/* 🌟 5. DOCKED INTERACTION CONSOLE WITH TEACHER SARA */}
              {/* ======================================================== */}
              <div 
                className="border-2 rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 shadow-2xl space-y-2.5 mt-2 backdrop-blur-md"
                style={{
                  backgroundColor: currentTheme.isLight ? 'rgba(255,255,255,0.96)' : 'rgba(8, 18, 32, 0.90)',
                  borderColor: `${currentTheme.borderHex}aa`
                }}
              >
                {/* Console Header */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-base animate-pulse">🪄</span>
                    <h4 
                      className="text-xs sm:text-sm font-black truncate"
                      style={{ color: currentTheme.accentHex }}
                    >
                      {isRtl ? 'اطلب من المعلمة سارة على السبورة:' : 'Ask Teacher Sara on Whiteboard:'}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setActiveTab('draw')}
                      className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 border border-white/15 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                    >
                      <PenTool size={12} />
                      <span className="hidden sm:inline">{isRtl ? 'أدوات الرسم ✍️' : 'Drawing'}</span>
                    </button>

                    <button
                      onClick={saveWhiteboardAsImage}
                      className="px-2.5 py-1 rounded-xl text-slate-950 font-black text-[11px] shadow-sm flex items-center gap-1 transition-all cursor-pointer hover:scale-105 active:scale-95"
                      style={{ backgroundColor: currentTheme.borderHex }}
                    >
                      <Camera size={13} />
                      <span className="hidden sm:inline">{isRtl ? 'حفظ 📸' : 'Save'}</span>
                    </button>
                  </div>
                </div>

                {/* Shimmer Feedback Banner when processing */}
                <AnimatePresence>
                  {(requestNotice || isSaraThinking) && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="p-2 rounded-xl bg-amber-400/25 border border-amber-400/50 text-amber-200 text-xs font-bold flex items-center gap-2 shadow-sm"
                    >
                      <Sparkles size={14} className="text-amber-400 animate-spin shrink-0" />
                      <span className="truncate">{requestNotice || (isRtl ? 'سارة تستقبل طلبك وتكتب على السبورة... 🪄✨' : 'Sara is preparing your whiteboard... 🪄✨')}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Quick Request Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                  {[
                    { id: 'explain_all', labelAr: '🎙️ شرح شامل', labelEn: '🎙️ Explain All', action: () => handleExplainWholeBoard() },
                    { id: 'another_example', labelAr: '✍️ مثال إضافي', labelEn: '✍️ Another Example', action: () => handleSubmitBoardRequest(isRtl ? 'سارة، اعطيني مثالاً إضافياً ومختلفاً على السبورة' : 'Sara, give me another example on the board') },
                    { id: 'simplify', labelAr: '💡 بسطي الشرح', labelEn: '💡 Simplify', action: () => handleSubmitBoardRequest(isRtl ? 'سارة، بسطي لي شرح هذه القاعدة على السبورة بأسلوب أسهل' : 'Sara, simplify this explanation on the board') },
                    { id: 'new_quiz', labelAr: '❓ كويز جديد', labelEn: '❓ New Quiz', action: () => handleSubmitBoardRequest(isRtl ? 'سارة، اطرحي علي سؤال أو كويز جديد على السبورة' : 'Sara, give me a new quiz on the board') },
                    { id: 'slow_pronounce', labelAr: '🗣️ نطق بطيء', labelEn: '🗣️ Speak Slowly', action: () => { if (boardData?.sentence) onSpeak(boardData.sentence); } },
                    { id: 'vocab_diagram', labelAr: '🎨 خريطة مفردات', labelEn: '🎨 Vocab Map', action: () => handleSubmitBoardRequest(isRtl ? 'سارة، ارسمي لي مخطط ورسم بياني توضيحي للمفردات على السبورة' : 'Sara, draw a vocabulary diagram on the board') },
                    { id: 'chalk_write', labelAr: '📝 كتابة بالطبشور', labelEn: '📝 Chalkboard', action: () => handleDrawChalkExplanation() },
                  ].map(chip => (
                    <button
                      key={`req-chip-${chip.id}`}
                      onClick={chip.action}
                      disabled={isSaraThinking}
                      className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 border border-white/15 text-[11px] font-bold text-amber-200 shrink-0 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isRtl ? chip.labelAr : chip.labelEn}
                    </button>
                  ))}
                </div>

                {/* Input Bar: Voice Microphone + Text Box + Send */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={isListeningRequest ? handleStopVoiceRequest : handleStartVoiceRequest}
                    className={`p-2 sm:p-2.5 rounded-xl border font-black text-xs transition-all cursor-pointer flex items-center justify-center shrink-0 shadow-md ${
                      isListeningRequest
                        ? 'bg-rose-500 text-white border-rose-300 ring-4 ring-rose-500/40 animate-pulse'
                        : 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 border-amber-300 hover:scale-105 active:scale-95'
                    }`}
                    title={isListeningRequest ? (isRtl ? 'إيقاف الاستماع' : 'Stop') : (isRtl ? 'تحدث واطلب من سارة بصوتك 🎙️' : 'Speak to Sara 🎙️')}
                  >
                    {isListeningRequest ? <MicOff size={16} /> : <Mic size={16} />}
                  </button>

                  <input
                    type="text"
                    value={boardRequestInput}
                    onChange={(e) => setBoardRequestInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSubmitBoardRequest();
                      }
                    }}
                    placeholder={
                      isListeningRequest
                        ? (isRtl ? 'سارة تسمعك الآن... تحدث بطلبك 🎙️' : 'Sara is listening... speak now 🎙️')
                        : (isRtl ? 'اطلب من سارة: اشرحي كذا، اعطيني مثال، اكتبي بالطبشور...' : 'Ask Sara: explain this, give an example, write on board...')
                    }
                    disabled={isSaraThinking}
                    className={`flex-1 px-3 py-2 rounded-xl text-xs font-medium border transition-all outline-hidden ${
                      currentTheme.isLight 
                        ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-amber-500' 
                        : 'bg-black/35 border-white/20 text-white placeholder:text-slate-400 focus:border-amber-400'
                    }`}
                  />

                  <button
                    onClick={() => handleSubmitBoardRequest()}
                    disabled={!boardRequestInput.trim() || isSaraThinking}
                    className="p-2 sm:px-3 sm:py-2 rounded-xl text-slate-950 font-black text-xs flex items-center gap-1 transition-all cursor-pointer shadow-md disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shrink-0"
                    style={{ backgroundColor: currentTheme.borderHex }}
                    title={isRtl ? 'إرسال الطلب لسارة' : 'Send request'}
                  >
                    <Send size={14} className={isRtl ? 'rotate-180' : ''} />
                    <span className="hidden sm:inline">{isRtl ? 'إرسال' : 'Send'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: INTERACTIVE CHALK DRAWING CANVAS */}
          <div className={`${activeTab === 'draw' ? 'block' : 'hidden'} absolute inset-0`}>
            <canvas
              ref={canvasRef}
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerCancel={stopDrawing}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className={`w-full h-full touch-none select-none ${
                selectedTool === 'eraser' ? 'cursor-cell' : 'cursor-crosshair'
              }`}
            />
          </div>
        </div>

        {/* ======================================================== */}
        {/* DEDICATED INTERACTIVE DRAWING TOOLBAR (شريط أدوات الرسم) */}
        {/* Includes: Brush Size Selector, Eraser, Step-by-Step Undo/Redo */}
        {/* ======================================================== */}
        {activeTab === 'draw' && (
          <div 
            className={`bg-gradient-to-r ${currentTheme.headerFrom} ${currentTheme.headerVia} ${currentTheme.headerTo} px-2 sm:px-3 py-1.5 sm:py-2 border-t-2 flex flex-col gap-1.5 sm:gap-2 shrink-0 select-none shadow-xl`}
            style={{ borderColor: `${currentTheme.borderHex}88` }}
          >
            {/* ======================================================== */}
            {/* MOBILE DEDICATED TOUCH-FRIENDLY TOOLBAR (sm:hidden) */}
            {/* Optimized for finger drawing, kids, and small mobile viewports */}
            {/* ======================================================== */}
            <div className="flex flex-col gap-2 sm:hidden pb-safe">
              {/* Mobile Line 1: Primary Tools + Undo/Redo/Clear + Templates/Stickers */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 w-full">
                {/* Tools Selector */}
                <div className="flex items-center gap-1 bg-black/45 p-1 rounded-2xl border border-white/10 shrink-0">
                  <button
                    onClick={() => setSelectedTool('pen')}
                    className={`min-h-[38px] px-2.5 py-1.5 rounded-xl border text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedTool === 'pen'
                        ? 'text-slate-900 border-white shadow-sm scale-102 font-black'
                        : 'bg-white/5 text-amber-200/80 border-transparent hover:bg-white/10'
                    }`}
                    style={{
                      backgroundColor: selectedTool === 'pen' ? currentTheme.borderHex : undefined
                    }}
                  >
                    <PenTool size={14} />
                    <span>{isRtl ? 'قلم' : 'Pen'}</span>
                  </button>

                  <button
                    onClick={() => setSelectedTool('highlighter')}
                    className={`min-h-[38px] px-2.5 py-1.5 rounded-xl border text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedTool === 'highlighter'
                        ? 'text-slate-900 border-white shadow-sm scale-102 font-black'
                        : 'bg-white/5 text-amber-200/80 border-transparent hover:bg-white/10'
                    }`}
                    style={{
                      backgroundColor: selectedTool === 'highlighter' ? currentTheme.borderHex : undefined
                    }}
                  >
                    <Highlighter size={14} />
                    <span>{isRtl ? 'تظليل' : 'Highlight'}</span>
                  </button>

                  <button
                    onClick={() => setSelectedTool('glow')}
                    className={`min-h-[38px] px-2.5 py-1.5 rounded-xl border text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedTool === 'glow'
                        ? 'text-slate-900 border-white shadow-sm scale-102 font-black'
                        : 'bg-white/5 text-amber-200/80 border-transparent hover:bg-white/10'
                    }`}
                    style={{
                      backgroundColor: selectedTool === 'glow' ? currentTheme.borderHex : undefined
                    }}
                  >
                    <Wand2 size={14} />
                    <span>{isRtl ? 'سحري ✨' : 'Glow'}</span>
                  </button>

                  <button
                    onClick={() => setSelectedTool('eraser')}
                    className={`min-h-[38px] px-2.5 py-1.5 rounded-xl border text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedTool === 'eraser'
                        ? 'bg-rose-500 text-white border-white shadow-md ring-2 ring-rose-300 scale-102 animate-pulse'
                        : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                    }`}
                  >
                    <Eraser size={14} />
                    <span>{isRtl ? 'ممحاة' : 'Eraser'}</span>
                  </button>
                </div>

                {/* Undo / Redo / Clear */}
                <div className="flex items-center gap-1 bg-black/45 p-1 rounded-2xl border border-white/10 shrink-0">
                  <button
                    onClick={undoLastStroke}
                    disabled={history.length === 0}
                    className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 text-amber-200 disabled:opacity-30 cursor-pointer flex items-center justify-center transition-all"
                    title={isRtl ? 'تراجع' : 'Undo'}
                  >
                    <RotateCcw size={15} />
                  </button>
                  <button
                    onClick={redoStroke}
                    disabled={redoHistory.length === 0}
                    className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 text-amber-200 disabled:opacity-30 cursor-pointer flex items-center justify-center transition-all"
                    title={isRtl ? 'إعادة' : 'Redo'}
                  >
                    <RotateCw size={15} />
                  </button>
                  <button
                    onClick={clearCanvas}
                    className="w-9 h-9 rounded-xl bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white cursor-pointer flex items-center justify-center transition-all"
                    title={isRtl ? 'مسح الكل' : 'Clear'}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                {/* Templates & Stickers & Save */}
                <div className="flex items-center gap-1 bg-black/45 p-1 rounded-2xl border border-white/10 shrink-0 relative">
                  <button
                    onClick={() => {
                      setShowTemplatePicker(!showTemplatePicker);
                      setShowStickerPicker(false);
                    }}
                    className={`min-h-[38px] px-2.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer transition-all border ${
                      showTemplatePicker ? 'bg-amber-400 text-slate-950 border-white' : 'bg-white/5 text-amber-200 border-transparent hover:bg-white/10'
                    }`}
                  >
                    <LayoutTemplate size={14} />
                    <span>{isRtl ? 'قوالب 📐' : 'Templates'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowStickerPicker(!showStickerPicker);
                      setShowTemplatePicker(false);
                    }}
                    className={`min-h-[38px] px-2.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer transition-all border ${
                      showStickerPicker ? 'bg-amber-400 text-slate-950 border-white' : 'bg-white/5 text-amber-200 border-transparent hover:bg-white/10'
                    }`}
                  >
                    <Smile size={14} />
                    <span>{isRtl ? 'ملصقات ⭐' : 'Stickers'}</span>
                  </button>
                  <button
                    onClick={saveWhiteboardAsImage}
                    className="min-h-[38px] px-2.5 py-1.5 rounded-xl text-slate-950 font-black cursor-pointer shadow-xs active:scale-95 flex items-center gap-1"
                    style={{ backgroundColor: currentTheme.borderHex }}
                    title={isRtl ? 'حفظ كصورة' : 'Save'}
                  >
                    <Camera size={14} />
                    <span>{isRtl ? 'حفظ' : 'Save'}</span>
                  </button>
                </div>
              </div>

              {/* Mobile Line 2: Colors Carousel + Touch-Friendly Brush Sizes */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/10">
                {/* Generous Color circles */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 flex-1">
                  {SMART_PEN_COLORS.map(c => {
                    const isSelected = selectedColor === c.value && selectedTool !== 'eraser';
                    return (
                      <button
                        key={`mob-pen-color-${c.name}`}
                        onClick={() => {
                          setSelectedColor(c.value);
                          if (selectedTool === 'eraser') setSelectedTool('pen');
                        }}
                        style={{ backgroundColor: c.value }}
                        className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer shrink-0 ${
                          isSelected
                            ? 'border-white scale-115 shadow-md ring-2 ring-white/70'
                            : 'border-black/50 opacity-90 hover:opacity-100'
                        }`}
                        title={isRtl ? c.labelAr : c.labelEn}
                      />
                    );
                  })}
                </div>

                {/* 3 Clear Brush Size Pills */}
                <div className="flex items-center gap-1 bg-black/45 px-2 py-1 rounded-2xl border border-white/10 shrink-0">
                  {[
                    { size: 3, labelAr: 'رفيع', labelEn: 'S' },
                    { size: 8, labelAr: 'وسط', labelEn: 'M' },
                    { size: 18, labelAr: 'عريض', labelEn: 'L' }
                  ].map(({ size, labelAr, labelEn }) => (
                    <button
                      key={`mob-brush-preset-${size}`}
                      onClick={() => setLineWidth(size)}
                      className={`min-h-[32px] px-2.5 py-0.5 rounded-xl text-[11px] font-black transition-all cursor-pointer flex items-center justify-center ${
                        lineWidth === size 
                          ? 'text-slate-950 font-black shadow-xs' 
                          : 'text-slate-300 hover:text-white bg-white/5'
                      }`}
                      style={{
                        backgroundColor: lineWidth === size ? currentTheme.borderHex : undefined
                      }}
                    >
                      {isRtl ? labelAr : labelEn}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* DESKTOP & TABLET SPACIOUS TOOLBAR (hidden sm:flex) */}
            {/* Optimized for iPads, Stylus/Apple Pencil & Touch Tablets */}
            {/* ======================================================== */}
            <div className="hidden sm:flex flex-col gap-2">
              {/* ROW 1: CORE DRAWING TOOLS, BRUSH SIZE CHIPS & STEP ACTIONS */}
              <div className="flex items-center justify-between gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5">
                
                {/* SECTION A: DRAWING TOOLS & ERASER */}
                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-2xl border border-white/10 shrink-0">
                  <button
                    onClick={() => setSelectedTool('pen')}
                    className={`px-2.5 py-1.5 rounded-xl border text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedTool === 'pen'
                        ? 'text-slate-900 border-white shadow-md scale-105'
                        : 'bg-white/5 text-amber-200/80 border-transparent hover:bg-white/10'
                    }`}
                    style={{
                      backgroundColor: selectedTool === 'pen' ? currentTheme.borderHex : undefined
                    }}
                    title={isRtl ? 'قلم ذكي / طبشور ناعم' : 'Smart Chalk Pen'}
                  >
                    <PenTool size={14} />
                    <span>{isRtl ? 'قلم' : 'Pen'}</span>
                  </button>

                  <button
                    onClick={() => setSelectedTool('highlighter')}
                    className={`px-2.5 py-1.5 rounded-xl border text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedTool === 'highlighter'
                        ? 'text-slate-900 border-white shadow-md scale-105'
                        : 'bg-white/5 text-amber-200/80 border-transparent hover:bg-white/10'
                    }`}
                    style={{
                      backgroundColor: selectedTool === 'highlighter' ? currentTheme.borderHex : undefined
                    }}
                    title={isRtl ? 'تظليل فسفوري شفاف لتحديد الكلمات' : 'Highlighter'}
                  >
                    <Highlighter size={14} />
                    <span>{isRtl ? 'تظليل' : 'Highlight'}</span>
                  </button>

                  <button
                    onClick={() => setSelectedTool('glow')}
                    className={`px-2.5 py-1.5 rounded-xl border text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedTool === 'glow'
                        ? 'text-slate-900 border-white shadow-md scale-105'
                        : 'bg-white/5 text-amber-200/80 border-transparent hover:bg-white/10'
                    }`}
                    style={{
                      backgroundColor: selectedTool === 'glow' ? currentTheme.borderHex : undefined
                    }}
                    title={isRtl ? 'قلم النجوم المضيء السحري للأطفال ✨' : 'Magic Glow Pen ✨'}
                  >
                    <Wand2 size={14} />
                    <span>{isRtl ? 'سحري ✨' : 'Glow ✨'}</span>
                  </button>

                  {/* THE DEDICATED ERASER TOOL */}
                  <button
                    onClick={() => setSelectedTool('eraser')}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedTool === 'eraser'
                        ? 'bg-rose-500 text-white border-white shadow-lg ring-2 ring-rose-300 scale-105 animate-pulse'
                        : 'bg-rose-500/15 text-rose-300 border-rose-500/30 hover:bg-rose-500/30'
                    }`}
                    title={isRtl ? 'ممحاة السبورة لمسح أي رسمة أو خط' : 'Whiteboard Eraser'}
                  >
                    <Eraser size={15} />
                    <span>{isRtl ? 'ممحاة 🧹' : 'Eraser 🧹'}</span>
                  </button>
                </div>

                {/* SECTION B: BRUSH SIZE SELECTOR (TOUCH-OPTIMIZED FOR TABLETS) */}
                <div className="flex items-center gap-1.5 bg-black/40 px-2 sm:px-2.5 py-1 rounded-2xl border border-white/10 shrink-0">
                  {/* Live Circle Preview Indicator */}
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center bg-black/50 border border-white/30 shrink-0"
                    title={isRtl ? `الحجم الحالي: ${lineWidth}px` : `Size: ${lineWidth}px`}
                  >
                    <div 
                      className="rounded-full transition-all"
                      style={{
                        width: `${Math.max(4, Math.min(20, lineWidth))}px`,
                        height: `${Math.max(4, Math.min(20, lineWidth))}px`,
                        backgroundColor: selectedTool === 'eraser' ? '#F43F5E' : selectedColor,
                        boxShadow: selectedTool === 'glow' ? `0 0 6px ${selectedColor}` : undefined
                      }}
                    />
                  </div>

                  {/* Preset Chips (Direct Fast Tap for Stylus / Touch) */}
                  <div className="flex items-center gap-1">
                    {[
                      { size: 3, label: 'ناعم 3p', labelEn: 'S', titleAr: 'ناعم 3px' },
                      { size: 7, label: 'متوسط 7p', labelEn: 'M', titleAr: 'متوسط 7px' },
                      { size: 14, label: 'عريض 14p', labelEn: 'L', titleAr: 'عريض 14px' },
                      { size: 26, label: 'XL 26p', labelEn: 'XL', titleAr: 'تلوين عريض 26px' }
                    ].map(({ size, label, labelEn, titleAr }) => (
                      <button
                        key={`brush-preset-${size}`}
                        onClick={() => setLineWidth(size)}
                        className={`px-2 py-1 rounded-lg text-[10px] sm:text-[11px] font-black transition-all cursor-pointer flex items-center justify-center ${
                          lineWidth === size 
                            ? 'text-slate-950 font-black shadow-xs' 
                            : 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10'
                        }`}
                        style={{
                          backgroundColor: lineWidth === size ? currentTheme.borderHex : undefined
                        }}
                        title={titleAr}
                      >
                        <span className="hidden md:inline">{isRtl ? label : labelEn}</span>
                        <span className="md:hidden">{labelEn}</span>
                      </button>
                    ))}
                  </div>

                  {/* Slider for precision (Large Screens) */}
                  <input
                    type="range"
                    min="2"
                    max="32"
                    value={lineWidth}
                    onChange={(e) => setLineWidth(Number(e.target.value))}
                    className="hidden xl:inline-block w-20 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-400"
                    title={`${lineWidth}px`}
                  />
                </div>

                {/* SECTION C: STEP-BY-STEP UNDO, REDO & CLEAR */}
                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-2xl border border-white/10 shrink-0">
                  {/* STEP-BY-STEP UNDO */}
                  <button
                    onClick={undoLastStroke}
                    disabled={history.length === 0}
                    className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none text-amber-200 border border-white/10 transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
                    title={isRtl ? `تراجع عن الخطوة السابقة (${history.length})` : 'Undo Step'}
                  >
                    <RotateCcw size={14} />
                    <span>{isRtl ? 'تراجع' : 'Undo'}</span>
                    {history.length > 0 && (
                      <span className="text-[9px] px-1 py-0.2 rounded-full bg-amber-400/20 text-amber-300">
                        {history.length}
                      </span>
                    )}
                  </button>

                  {/* STEP-BY-STEP REDO */}
                  <button
                    onClick={redoStroke}
                    disabled={redoHistory.length === 0}
                    className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none text-amber-200 border border-white/10 transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
                    title={isRtl ? `إعادة الخطوة (${redoHistory.length})` : 'Redo Step'}
                  >
                    <RotateCw size={14} />
                    <span className="hidden xs:inline">{isRtl ? 'إعادة' : 'Redo'}</span>
                  </button>

                  {/* CLEAR ALL CANVAS */}
                  <button
                    onClick={clearCanvas}
                    className="p-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 transition-all cursor-pointer"
                    title={isRtl ? 'مسح السبورة بالكامل' : 'Clear Whiteboard'}
                  >
                    <Trash2 size={14} />
                  </button>

                  {/* SAVE BOARD AS IMAGE */}
                  <button
                    onClick={saveWhiteboardAsImage}
                    className="px-2.5 py-1.5 rounded-xl text-slate-950 shadow-md font-black text-xs flex items-center gap-1 cursor-pointer active:scale-95 transition-all"
                    style={{ backgroundColor: currentTheme.borderHex }}
                    title={isRtl ? 'حفظ اللوحة بالكامل كصورة عالية الدقة 📸' : 'Save Whiteboard Image'}
                  >
                    <Camera size={13} className="text-slate-900" />
                    <span className="hidden sm:inline">{isRtl ? 'حفظ 📸' : 'Save 📸'}</span>
                  </button>
                </div>
              </div>

              {/* ROW 2: EXPANDED 10 PEN COLORS + TEMPLATES & STICKERS (BALANCED FOR IPAD & TABLETS) */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/10 overflow-x-auto no-scrollbar py-0.5">
                {/* 10 Kid-Friendly Colors with smooth touch scroll */}
                <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto no-scrollbar py-0.5">
                  <span className="text-[10px] text-amber-200/70 font-bold hidden sm:inline ml-1">
                    {isRtl ? 'الألوان:' : 'Colors:'}
                  </span>

                  {SMART_PEN_COLORS.map(c => {
                    const isSelected = selectedColor === c.value && selectedTool !== 'eraser';
                    return (
                      <button
                        key={`pen-color-${c.name}`}
                        onClick={() => {
                          setSelectedColor(c.value);
                          if (selectedTool === 'eraser') setSelectedTool('pen');
                        }}
                        style={{ backgroundColor: c.value }}
                        className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer shrink-0 ${
                          isSelected
                            ? 'border-white scale-125 shadow-lg shadow-amber-300/40 z-10 ring-2 ring-white/50'
                            : 'border-black/50 hover:scale-110 opacity-90'
                        }`}
                        title={isRtl ? c.labelAr : c.labelEn}
                      />
                    );
                  })}
                </div>

                {/* Templates, Stickers & Stylus Status */}
                <div className="flex items-center gap-1.5 shrink-0 relative">
                  {/* Tablet Stylus & Palm Rejection Status Indicator */}
                  <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/40 border border-white/10 text-amber-300 text-[10px] font-black">
                    <PenTool size={11} className="text-amber-400" />
                    <span>{isRtl ? 'حساسية القلم واللمس نشطة ✏️' : 'Stylus Active ✏️'}</span>
                  </div>

                  {/* TEMPLATES POPUP BUTTON */}
                  <button
                    onClick={() => {
                      setShowTemplatePicker(!showTemplatePicker);
                      setShowStickerPicker(false);
                    }}
                    className={`px-2.5 py-1.5 rounded-xl border text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                      showTemplatePicker
                        ? 'bg-amber-400 text-slate-950 border-white shadow-md'
                        : 'bg-white/5 text-amber-200 hover:bg-white/10 border-white/10'
                    }`}
                    title={isRtl ? 'قوالب تعليمية جاهزة (مخطط الأزمنة، تسطير كراسة الإنجليزية، جدول المقارنة...)' : 'Ready Educational Templates'}
                  >
                    <LayoutTemplate size={14} className="text-amber-300" />
                    <span>{isRtl ? 'قوالب جاهزة 📐' : 'Templates 📐'}</span>
                  </button>

                  {/* STICKERS TRAY BUTTON */}
                  <button
                    onClick={() => {
                      setShowStickerPicker(!showStickerPicker);
                      setShowTemplatePicker(false);
                    }}
                    className={`px-2.5 py-1.5 rounded-xl border text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                      showStickerPicker
                        ? 'bg-amber-400 text-slate-950 border-white shadow-md'
                        : 'bg-white/5 text-amber-200 hover:bg-white/10 border-white/10'
                    }`}
                    title={isRtl ? 'ملصقات ونجوم تشجيعية للأطفال ⭐' : 'Fun Kid Stickers ⭐'}
                  >
                    <Smile size={14} className="text-amber-300" />
                    <span>{isRtl ? 'ملصقات ⭐' : 'Stickers ⭐'}</span>
                  </button>

                  {/* TEMPLATE PICKER POPOVER */}
                  {showTemplatePicker && (
                    <div className="fixed inset-x-3 bottom-24 sm:absolute sm:inset-auto sm:bottom-full sm:mb-2 sm:end-0 sm:w-80 bg-slate-900/98 border-2 border-amber-400/80 rounded-2xl p-3.5 shadow-2xl z-50 text-white backdrop-blur-md animate-in fade-in zoom-in-95 max-h-[60vh] flex flex-col">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 shrink-0">
                        <span className="text-xs font-black text-amber-300 flex items-center gap-1">
                          📐 {isRtl ? 'اختر قالباً جاهزاً للتطبيق:' : 'Select Whiteboard Template:'}
                        </span>
                        <button 
                          onClick={() => setShowTemplatePicker(false)}
                          className="text-slate-400 hover:text-white text-xs p-1 cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="space-y-1.5 overflow-y-auto flex-1">
                        {WHITEBOARD_TEMPLATES.map(tpl => (
                          <button
                            key={`tpl-${tpl.id}`}
                            onClick={() => applyWhiteboardTemplate(tpl.id)}
                            className="w-full text-start p-2 rounded-xl bg-white/5 hover:bg-amber-400 hover:text-slate-950 transition-all cursor-pointer border border-white/10 group flex items-start gap-2.5"
                          >
                            <span className="text-xl p-1 bg-black/30 rounded-lg group-hover:bg-slate-900/20">{tpl.icon}</span>
                            <div className="flex-1">
                              <span className="text-xs font-black block">{isRtl ? tpl.nameAr : tpl.nameEn}</span>
                              <span className="text-[10px] text-slate-300 group-hover:text-slate-800 line-clamp-1">
                                {isRtl ? tpl.descAr : tpl.descEn}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STICKER PICKER POPOVER */}
                  {showStickerPicker && (
                    <div className="fixed inset-x-4 bottom-24 sm:absolute sm:inset-auto sm:bottom-full sm:mb-2 sm:end-0 sm:w-64 bg-slate-900/98 border-2 border-amber-400/80 rounded-2xl p-3.5 shadow-2xl z-50 text-white backdrop-blur-md animate-in fade-in zoom-in-95">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                        <span className="text-xs font-black text-amber-300 flex items-center gap-1">
                          ⭐ {isRtl ? 'ختم ملصق تشجيعي على السبورة:' : 'Stamp Kid Sticker:'}
                        </span>
                        <button 
                          onClick={() => setShowStickerPicker(false)}
                          className="text-slate-400 hover:text-white text-xs p-1 cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="grid grid-cols-4 gap-2">
                        {KID_STICKERS.map((stk, sIdx) => (
                          <button
                            key={`stk-${sIdx}`}
                            onClick={() => stampStickerOnCanvas(stk)}
                            className="text-2xl p-2 rounded-xl bg-white/5 hover:bg-white/20 active:scale-125 transition-all cursor-pointer flex items-center justify-center border border-white/10"
                            title={isRtl ? `ختم ${stk}` : `Stamp ${stk}`}
                          >
                            {stk}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Status Hint */}
                <div className="text-[10px] text-amber-200/60 font-medium truncate hidden xl:block">
                  {selectedTool === 'eraser' 
                    ? (isRtl ? '🧹 الممحاة نشطة: مرر فوق أي جزء لمسحه' : '🧹 Eraser Active')
                    : selectedTool === 'glow'
                    ? (isRtl ? '✨ قلم النجوم المضيء: خطوط متوهجة للأطفال' : '✨ Magic Glow Pen')
                    : selectedTool === 'highlighter'
                    ? (isRtl ? '🖍️ تظليل فوسفوري شفاف' : '🖍️ Highlighter')
                    : (isRtl ? '✏️ قلم الطبشور الذكي' : '✏️ Smart Chalk')}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* INTERACTIVE RESIZE HANDLES & DIMENSION BADGE (تكبير وتصغير السبورة بحرية) */}
        {/* ======================================================== */}
        {!isMaximized && (
          <>
            {/* Active Resizing Floating Dimension Indicator */}
            {isResizing && (
              <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
                <div className="px-4 py-2 rounded-2xl bg-black/90 backdrop-blur-md border-2 border-amber-400 text-amber-300 font-black text-sm shadow-2xl flex items-center gap-2 animate-pulse">
                  <Scaling size={16} className="text-amber-400" />
                  <span className="font-mono">{customSize.width} × {customSize.height} px</span>
                </div>
              </div>
            )}

            {/* Bottom-Right Corner Resize Grip Handle */}
            <div
              onMouseDown={(e) => startCornerResize(e, 'bottom-right')}
              onTouchStart={(e) => startCornerResize(e, 'bottom-right')}
              className="hidden sm:flex absolute bottom-0 end-0 w-7 h-7 items-center justify-center cursor-nwse-resize touch-none select-none z-40 text-amber-400/80 hover:text-amber-300 hover:scale-125 transition-transform"
              title={isRtl ? 'اسحب لتكبير وتصغير السبورة بحرية 📐' : 'Drag to resize whiteboard 📐'}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" className="fill-current rotate-0 rtl:-scale-x-100">
                <circle cx="10" cy="10" r="1.5" />
                <circle cx="6" cy="10" r="1.5" />
                <circle cx="10" cy="6" r="1.5" />
                <circle cx="2" cy="10" r="1.5" />
                <circle cx="6" cy="6" r="1.5" />
                <circle cx="10" cy="2" r="1.5" />
              </svg>
            </div>

            {/* Bottom-Left Corner Resize Grip Handle */}
            <div
              onMouseDown={(e) => startCornerResize(e, 'bottom-left')}
              onTouchStart={(e) => startCornerResize(e, 'bottom-left')}
              className="hidden sm:flex absolute bottom-0 start-0 w-7 h-7 items-center justify-center cursor-nesw-resize touch-none select-none z-40 text-amber-400/80 hover:text-amber-300 hover:scale-125 transition-transform"
              title={isRtl ? 'اسحب لتكبير وتصغير السبورة بحرية 📐' : 'Drag to resize whiteboard 📐'}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" className="fill-current -scale-x-100 rtl:rotate-0">
                <circle cx="10" cy="10" r="1.5" />
                <circle cx="6" cy="10" r="1.5" />
                <circle cx="10" cy="6" r="1.5" />
                <circle cx="2" cy="10" r="1.5" />
                <circle cx="6" cy="6" r="1.5" />
                <circle cx="10" cy="2" r="1.5" />
              </svg>
            </div>

            {/* Bottom Edge Resize Bar (Adjust Height) */}
            <div
              onMouseDown={(e) => startCornerResize(e, 'bottom')}
              onTouchStart={(e) => startCornerResize(e, 'bottom')}
              className="hidden sm:flex absolute bottom-0 inset-x-8 h-2 items-center justify-center cursor-ns-resize touch-none select-none z-30 group"
              title={isRtl ? 'اسحب لضبط ارتفاع السبورة ↕️' : 'Drag to adjust height ↕️'}
            >
              <div className="w-16 h-1 rounded-full bg-white/20 group-hover:bg-amber-400/80 transition-colors" />
            </div>

            {/* Right Edge Resize Zone */}
            <div
              onMouseDown={(e) => startCornerResize(e, 'right')}
              onTouchStart={(e) => startCornerResize(e, 'right')}
              className="hidden sm:block absolute top-12 bottom-6 end-0 w-2 cursor-ew-resize touch-none select-none z-30 hover:bg-amber-400/40 transition-colors"
              title={isRtl ? 'اسحب لضبط عرض السبورة ↔️' : 'Drag to adjust width ↔️'}
            />

            {/* Left Edge Resize Zone */}
            <div
              onMouseDown={(e) => startCornerResize(e, 'left')}
              onTouchStart={(e) => startCornerResize(e, 'left')}
              className="hidden sm:block absolute top-12 bottom-6 start-0 w-2 cursor-ew-resize touch-none select-none z-30 hover:bg-amber-400/40 transition-colors"
              title={isRtl ? 'اسحب لضبط عرض السبورة ↔️' : 'Drag to adjust width ↔️'}
            />
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export const SmartWhiteboard: React.FC<SmartWhiteboardProps> = (props) => {
  return (
    <WhiteboardErrorBoundary isRtl={props.isRtl} onClose={props.onClose}>
      <SmartWhiteboardComponent {...props} />
    </WhiteboardErrorBoundary>
  );
};
