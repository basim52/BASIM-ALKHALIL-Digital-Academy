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
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile, AppView, SaraBoardData, SaraChatResponse, TutorMemoryDoc } from '../types';
import { Language, translations } from '../lib/translations';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc, collection, addDoc, serverTimestamp, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { speakAcademyText, cancelAllSpeech } from '../lib/audio';
import { getStudentStreak, StreakData } from '../services/streakService';

interface MessageItem {
  id: string;
  role: 'user' | 'sara';
  text: string;
  board?: SaraBoardData;
  actions?: { type: 'open_section'; sectionId: string }[];
  timestamp: number;
}

interface SaraTutorProps {
  lang: Language;
  profile: UserProfile;
  onNavigate: (view: AppView) => void;
  onBack: () => void;
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
  onBack
}) => {
  const isRtl = lang === 'ar';
  const t = translations[lang];

  // State
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [activeBoard, setActiveBoard] = useState<SaraBoardData | null>(null);
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

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const currentSpeechControlRef = useRef<{ stop: () => void } | null>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(prev => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };

      recognition.onerror = (err: any) => {
        console.warn('Speech recognition error:', err);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

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

  // Initial welcome message from Sara when opening the session
  useEffect(() => {
    const initWelcome = async () => {
      setLoading(true);
      try {
        // Fetch placement test or snapshot info
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
            message: `Hello Teacher Sara! I'm starting our session today. My name is ${profile.displayName}.`,
            snapshot: snapshot,
            history: []
          })
        });

        if (res.ok) {
          const data: SaraChatResponse = await res.json();
          const welcomeMsg: MessageItem = {
            id: `msg_sara_init`,
            role: 'sara',
            text: data.reply,
            board: data.board,
            actions: data.actions,
            timestamp: Date.now()
          };
          setMessages([welcomeMsg]);
          if (data.board) {
            setActiveBoard(data.board);
          }
          if (voiceEnabled && data.reply) {
            playSaraVoice(data.reply);
          }
          if (data.memory) {
            syncMemoryToFirestore(data.memory, data.sessionDone, data.board?.title || 'Daily Session');
          }
        } else {
          fallbackWelcome();
        }
      } catch (e) {
        console.warn('Welcome call error:', e);
        fallbackWelcome();
      } finally {
        setLoading(false);
      }
    };

    const fallbackWelcome = () => {
      const studentName = profile.displayName.split(' ')[0] || (isRtl ? 'يا بطل' : 'friend');
      const text = isRtl
        ? `هلا والله ${studentName}! أنا معلمتك سارة، مستانسة وايد بوجودك معاي اليوم 🌟 جاهز نبدأ رحلتنا الممتعة بالإنجليزية؟ وش تحب نسوي اليوم؟`
        : `Hello ${studentName}! I'm Sara, your English teacher, and I'm so happy you're here today 🌟 Ready for a fun English lesson?`;
      
      const welcomeMsg: MessageItem = {
        id: `msg_sara_fallback_0`,
        role: 'sara',
        text: text,
        board: {
          title: isRtl ? 'الترحيب والمراجعة 🌟' : 'Welcome & Warm-up 🌟',
          sentence: 'Welcome to your daily English session!',
          highlight: 'Welcome'
        },
        actions: [
          { type: 'open_section', sectionId: 'grammar-academy' }
        ],
        timestamp: Date.now()
      };
      setMessages([welcomeMsg]);
      setActiveBoard(welcomeMsg.board || null);
      if (voiceEnabled) {
        playSaraVoice(text);
      }
    };

    initWelcome();

    return () => {
      cancelAllSpeech();
    };
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Voice playback with Sara's tone
  const playSaraVoice = async (text: string) => {
    cancelAllSpeech();
    setIsSpeaking(true);
    try {
      const player = await speakAcademyText(
        text,
        'ar',
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
      currentSpeechControlRef.current = player;
    } catch (err) {
      console.warn('Sara voice error:', err);
      setIsSpeaking(false);
    }
  };

  // Toggle voice recognition
  const toggleListening = () => {
    if (!speechSupported || !recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      cancelAllSpeech();
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.warn('Recognition start error:', err);
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

  // Send message handler
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || loading) return;

    // Add user message to chat
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
          history: compactHistory
        })
      });

      if (!response.ok) {
        throw new Error(`Chat error status: ${response.status}`);
      }

      const data: SaraChatResponse = await response.json();

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
      }

      // Voice playback
      if (voiceEnabled && data.reply) {
        playSaraVoice(data.reply);
      }

      // Sync memory
      if (data.memory) {
        syncMemoryToFirestore(data.memory, data.sessionDone, data.board?.title);
      }
    } catch (err: any) {
      console.error('Sara chat error:', err);
      const fallbackMsg: MessageItem = {
        id: `msg_sara_err_${Date.now()}`,
        role: 'sara',
        text: isRtl 
          ? 'أعتذر منك يا بطل! واجهت مشكلة بسيطة في الاتصال. خلنا نحاول مرة ثانية أو اسألني بطريقة ثانية 🌟'
          : 'Oops, little connection issue! Let us try that again 🌟',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
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
              {/* Illustrated Avatar in Modest Hijab */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#002147] via-[#1a3a60] to-[#C49E3A] p-0.5 shadow-md flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 100 100" className="w-full h-full rounded-full bg-[#fdfbf7]">
                  {/* Background Soft Circle */}
                  <circle cx="50" cy="50" r="48" fill="#eef2f6" />
                  
                  {/* Modest Hijab drape */}
                  <path d="M 22 45 C 22 24 34 14 50 14 C 66 14 78 24 78 45 C 78 68 82 86 85 96 C 75 99 25 99 15 96 C 18 86 22 68 22 45 Z" fill="#002147" />
                  
                  {/* Face oval */}
                  <ellipse cx="50" cy="48" rx="19" ry="22" fill="#FDDFCF" />
                  
                  {/* Inner modest hijab undercap */}
                  <path d="M 32 37 C 38 31 62 31 68 37 C 62 34 38 34 32 37 Z" fill="#C49E3A" />
                  
                  {/* Eyes */}
                  <ellipse cx="43" cy="46" rx="2.5" ry="3.2" fill="#2d3748" />
                  <ellipse cx="57" cy="46" rx="2.5" ry="3.2" fill="#2d3748" />
                  <circle cx="44.2" cy="45" r="1" fill="#ffffff" />
                  <circle cx="58.2" cy="45" r="1" fill="#ffffff" />
                  
                  {/* Eyebrows */}
                  <path d="M 39 41 Q 43 39 47 41" stroke="#4a5568" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  <path d="M 53 41 Q 57 39 61 41" stroke="#4a5568" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  
                  {/* Gentle warm smile */}
                  <path d="M 44 56 Q 50 62 56 56" stroke="#c53030" strokeWidth="2" strokeLinecap="round" fill="none" />
                  
                  {/* Rosy cheeks */}
                  <circle cx="37" cy="52" r="3" fill="#fca5a5" opacity="0.5" />
                  <circle cx="63" cy="52" r="3" fill="#fca5a5" opacity="0.5" />
                  
                  {/* Hijab wrap around chin */}
                  <path d="M 31 52 C 34 68 45 74 50 74 C 55 74 66 68 69 52 C 73 66 74 88 74 95 C 62 98 38 98 26 95 C 26 88 27 66 31 52 Z" fill="#002147" />
                  <path d="M 42 74 Q 50 82 58 74 Q 50 78 42 74" fill="#C49E3A" />
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
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm sm:text-base font-black text-[#002147] leading-tight">
                  {isRtl ? 'سارة – معلمتك 👩‍🏫' : 'Sara – Your English Tutor 👩‍🏫'}
                </h1>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] font-black rounded-full border border-emerald-200">
                  {isRtl ? 'متصلة الآن' : 'Online'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-bold">
                {isRtl ? 'معلمتك الخليجية الذكية لتعلم الإنجليزية بمتعة' : 'Your personal smart English tutor'}
              </p>
            </div>
          </div>

          {/* Right Controls: Streak Badge & Voice Toggle */}
          <div className="flex items-center gap-2">
            {/* Streak Badge */}
            <div className="flex items-center gap-1 px-2.5 py-1.5 bg-orange-50 border-2 border-orange-200 rounded-2xl text-[#ff9600] font-black text-xs shadow-sm">
              <Flame size={15} className="animate-bounce-slow text-orange-500" />
              <span>{streak.current} {isRtl ? 'يوم' : 'd'}</span>
            </div>

            {/* Voice Toggle Button */}
            <button
              onClick={() => {
                if (isSpeaking) cancelAllSpeech();
                setVoiceEnabled(!voiceEnabled);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border-2 text-xs font-black transition-all cursor-pointer ${
                voiceEnabled
                  ? 'bg-blue-50 text-[#002147] border-blue-200 shadow-sm'
                  : 'bg-slate-100 text-slate-400 border-slate-200'
              }`}
              title={isRtl ? 'تشغيل أو كتم صوت سارة' : 'Toggle Sara Voice'}
            >
              {voiceEnabled ? <Volume2 size={16} className="text-[#C49E3A]" /> : <VolumeX size={16} />}
              <span className="hidden sm:inline">
                {voiceEnabled ? (isRtl ? 'سارة تتكلم' : 'Voice On') : (isRtl ? 'صامت' : 'Muted')}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. MAIN CONTENT AREA (BOARD + CHAT) */}
      {/* ======================================================== */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-3 sm:p-5 flex flex-col gap-4 overflow-hidden">
        
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

                {/* Speak button for Board sentence */}
                {activeBoard.sentence && (
                  <button
                    onClick={() => playSaraVoice(activeBoard.sentence!)}
                    className="p-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-[#002147] border border-slate-200 transition-all cursor-pointer"
                    title={isRtl ? 'استمع لنطق الجملة' : 'Listen to sentence'}
                  >
                    <Volume2 size={16} className="text-[#C49E3A]" />
                  </button>
                )}
              </div>

              {/* Target Sentence Display with Glow Highlight */}
              {activeBoard.sentence && (
                <div className="bg-[#002147] text-white p-3.5 sm:p-4 rounded-2xl shadow-inner mb-3 text-center">
                  <p className="text-base sm:text-lg font-bold tracking-wide font-sans">
                    {activeBoard.sentence.split(activeBoard.highlight || '___NON_EXISTENT___').map((part, i, arr) => (
                      <React.Fragment key={`sentence-part-${i}`}>
                        <span>{part}</span>
                        {i < arr.length - 1 && activeBoard.highlight && (
                          <span className="px-2 py-0.5 bg-[#C49E3A] text-slate-900 rounded-lg font-black shadow-sm mx-1 animate-pulse inline-block">
                            {activeBoard.highlight}
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              )}

              {/* Gentle Correction Card: Red crossed out -> Green correct */}
              {activeBoard.correction && (
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
                      <button
                        onClick={() => playSaraVoice(msg.text)}
                        className="p-1 hover:text-[#C49E3A] transition-colors cursor-pointer"
                        title={isRtl ? 'إعادة استماع' : 'Replay audio'}
                      >
                        <Volume2 size={13} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}

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

          <div ref={messagesEndRef} />
        </div>

        {/* ======================================================== */}
        {/* 2C. INPUT CONTROLS (MIC + TEXT INPUT + SEND) */}
        {/* ======================================================== */}
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-2.5 sm:p-3 shadow-md flex items-center gap-2">
          {/* Microphone button (Web Speech API) */}
          {speechSupported && (
            <button
              onClick={toggleListening}
              className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-center shrink-0 ${
                isListening
                  ? 'bg-rose-500 border-rose-600 text-white animate-pulse shadow-md shadow-rose-200'
                  : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-[#002147]'
              }`}
              title={isListening ? (isRtl ? 'جارٍ الاستماع... اضغط للإيقاف' : 'Listening... click to stop') : (isRtl ? 'تحدث بالمايك' : 'Speak via mic')}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
          )}

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
              isListening
                ? (isRtl ? 'تحدث الآن، سارة تستمع لك...' : 'Listening, speak now...')
                : (isRtl ? 'اكتب لسارة بالعربية أو الإنجليزية...' : 'Type to Sara in Arabic or English...')
            }
            className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
          />

          {/* Send Button */}
          <button
            onClick={() => handleSendMessage()}
            disabled={loading || !inputText.trim()}
            className="p-3 bg-[#002147] hover:bg-[#C49E3A] active:scale-95 disabled:opacity-40 disabled:hover:bg-[#002147] text-white rounded-2xl transition-all shadow-md flex items-center justify-center shrink-0 cursor-pointer"
            title={isRtl ? 'إرسال' : 'Send'}
          >
            <Send size={18} className={isRtl ? 'rotate-180' : ''} />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-[11px] font-bold text-slate-600 no-scrollbar">
          <span className="text-slate-400 shrink-0 text-[10px]">{isRtl ? 'اقتراحات سريعة:' : 'Quick prompts:'}</span>
          {[
            { ar: 'علميني قاعدة جديدة اليوم 📐', en: 'Teach me a new rule 📐' },
            { ar: 'اختبريني بـ 3 أسئلة سريعة 🎯', en: 'Give me a 3-question quiz 🎯' },
            { ar: 'وش أخطائي اللي لازم أعدلها؟ 🔍', en: 'What mistakes should I fix? 🔍' },
            { ar: 'جاهز أمارس جمل محادثة 🗣️', en: 'Ready to practice conversation 🗣️' }
          ].map((chip, cIdx) => (
            <button
              key={`chip-${cIdx}`}
              onClick={() => handleSendMessage(isRtl ? chip.ar : chip.en)}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-[#002147] hover:bg-slate-50 shrink-0 transition-all cursor-pointer shadow-2xs"
            >
              {isRtl ? chip.ar : chip.en}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};
