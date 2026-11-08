// batch: Abboud The Teacher miniature classroom simulation
import React, { useState, useEffect, useRef } from 'react';
import { speakAcademyText, cancelAllSpeech } from '../lib/audio';

export interface AbboudTeacherProps {
  uid?: string;
  onClose: () => void;
  onSessionComplete?: (sessionId: number, xpEarned: number) => void;
}

export interface SessionConfig {
  id: number;
  titleAr: string;
  titleEn: string;
  emoji: string;
  chalkTargetWords: string[];
  chalkRuleAr: string;
  chalkRuleEn: string;
  saraObjectiveAr: string;
  saraObjectiveEn: string;
  hintPhrases: { ar: string; en: string }[];
  badgeNameAr: string;
  badgeIcon: string;
}

export const SESSIONS_CONFIG: SessionConfig[] = [
  {
    id: 1,
    titleAr: "التحية والتعريف بالاسم",
    titleEn: "Greetings & Names",
    emoji: "👋",
    chalkTargetWords: ["Hello!", "My name is...", "What is your name?", "Nice to meet you!"],
    chalkRuleAr: "نقول: Hello للتحية، و My name is للتعريف بالاسم، و What is your name للسؤال.",
    chalkRuleEn: "Greet with 'Hello', introduce with 'My name is [Name]', ask 'What is your name?'.",
    saraObjectiveAr: "هدف الحصة: درّب الطلاب على التحية وسؤال الشخص عن اسمه والرد باسمه.",
    saraObjectiveEn: "Goal: Train students to greet, ask someone's name, and state their own name.",
    hintPhrases: [
      { ar: "مرحباً يا طلاب! عندما نقابل أحداً نقول: Hello! ثم نعرف بأنفسنا: My name is...", en: "Hello students! When we meet someone, we say Hello! Then My name is..." },
      { ar: "للسؤال عن الاسم نسأل: What is your name? ونجيب: My name is... ونقول: Nice to meet you!", en: "To ask a name: What is your name? Answer: My name is... and say Nice to meet you!" },
    ],
    badgeNameAr: "وسام معلّم التحية والتعارف",
    badgeIcon: "🎖️"
  },
  {
    id: 2,
    titleAr: "الألوان والأشياء",
    titleEn: "Colors & Objects",
    emoji: "🎨",
    chalkTargetWords: ["red", "blue", "yellow", "green", "book", "pencil", "bag"],
    chalkRuleAr: "القاعدة الذهبية: في الإنجليزية يأتي اللون قبل الشيء: a red book وليس book red!",
    chalkRuleEn: "Rule: Color comes BEFORE the noun: a blue bag, a yellow pencil.",
    saraObjectiveAr: "هدف الحصة: تعليم الألوان الأساسية وتثبيت قاعدة تقديم اللون على الشيء.",
    saraObjectiveEn: "Goal: Teach primary colors and ensure Color + Object word order.",
    hintPhrases: [
      { ar: "في الإنجليزية نضع اللون أولاً! نقول: a red book و a blue bag لأن الصفة تسبق الاسم.", en: "In English, color comes first: a red book and a blue bag. Adjective before noun!" },
      { ar: "الألوان: red أحمر، blue أزرق، yellow أصفر. والأشياء: book كتاب، pencil قلم، bag حقيبة.", en: "Colors: red, blue, yellow. Objects: book, pencil, bag." },
    ],
    badgeNameAr: "وسام معلّم الألوان والمفردات",
    badgeIcon: "🎨"
  },
  {
    id: 3,
    titleAr: "الأعداد من 1 إلى 10 والكميات",
    titleEn: "Numbers & Quantities",
    emoji: "🔢",
    chalkTargetWords: ["one", "two", "three", "four", "five", "How many...?", "books / pencils"],
    chalkRuleAr: "المفرد بدون s: one book. والجمع نضيف له حرف s: two books, three pencils.",
    chalkRuleEn: "Singular (no -s): one pencil. Plural (add -s): two pencils, three books.",
    saraObjectiveAr: "هدف الحصة: العد من 1 إلى 10 والتمييز العملي بين المفرد والجمع مع حرف s.",
    saraObjectiveEn: "Goal: Counting 1-10 and using plural -s correctly with quantities.",
    hintPhrases: [
      { ar: "إذا كان لدينا شيء واحد نقول: one book بدون s. وإذا أكثر نضيف s: two books!", en: "For one thing: one book (no s). For more: two books (add -s)!" },
      { ar: "للسؤال عن العدد: How many pencils do you have? والجواب: I have three pencils.", en: "To ask quantity: How many pencils do you have? Answer: I have three pencils." },
    ],
    badgeNameAr: "وسام معلّم الأرقام الذكي",
    badgeIcon: "🔢"
  },
  {
    id: 4,
    titleAr: "الجمل البسيطة والتعبير",
    titleEn: "Simple Sentences",
    emoji: "📝",
    chalkTargetWords: ["This is a...", "I like...", "Subject + Verb + Object"],
    chalkRuleAr: "بنية الجملة: نبدأ بالفاعل ثم الفعل ثم المفعول: I like apples / This is a bag.",
    chalkRuleEn: "Sentence Order: Subject + Verb + Object (I like apples, This is a book).",
    saraObjectiveAr: "هدف الحصة: بناء جمل بسيطة وصحيحة باستخدام This is و I like.",
    saraObjectiveEn: "Goal: Building simple sentences with 'This is a...' and 'I like...'.",
    hintPhrases: [
      { ar: "الجملة الإنجليزية تبدأ بالشخص ثم الفعل: I like apples (أنا أحب التفاح).", en: "An English sentence starts with Subject then Verb: I like apples." },
      { ar: "للإشارة إلى شيء قريب نقول: This is a book أو This is a pencil.", en: "To point to something near: This is a book, This is a pencil." },
    ],
    badgeNameAr: "وسام صانع الجمل المتقنة",
    badgeIcon: "📝"
  },
  {
    id: 5,
    titleAr: "المراجعة وتحدي المعلّم الشامل",
    titleEn: "Master Review Challenge",
    emoji: "🏆",
    chalkTargetWords: ["Hello!", "Color + Object", "Plural -s", "I like..."],
    chalkRuleAr: "تحدي المعلّم: اشرح خلاصة القواعد، وأجب بدر، وصحّح خطأ ريم المركّب لتنال الشهادة!",
    chalkRuleEn: "Master Challenge: Explain the core rules, answer Badr, and fix Reem's error.",
    saraObjectiveAr: "هدف الحصة: اختبار قدرة عبود على مراجعة المواضيع السابقة وتوجيه الطالبين.",
    saraObjectiveEn: "Goal: Comprehensive review of previous 4 topics with teacher evaluation.",
    hintPhrases: [
      { ar: "اليوم نراجع: التحية (Hello)، والألوان قبل الأسماء (red book)، وجمع الأرقام (two books)، وتركيب الجمل (I like).", en: "Today we review greetings, colors before nouns, plurals with -s, and sentences with I like." },
      { ar: "أهم قاعدتين: اللون يسبق الشيء: a blue bag. والجمع يحتاج s: three pencils.", en: "Two main rules: Color before noun (a blue bag), and plural takes -s (three pencils)." },
    ],
    badgeNameAr: "شهادة ووسام المعلّم الصغير المعتمد",
    badgeIcon: "🌟"
  }
];

type ClassroomTurn =
  | 'abboud_explain'   // 1. Abboud teaches concept
  | 'badr_asking'      // 2. Badr asks question
  | 'abboud_answering' // 3. Abboud answers Badr
  | 'reem_practicing'  // 4. Reem makes mistake
  | 'abboud_correcting'// 5. Abboud fixes Reem's mistake
  | 'session_wrapup';  // 6. Sara evaluates & finishes

interface UserProgress {
  completedSessions: number[];
  sessionScores: Record<number, number>;
  lastUpdated: string;
}

export const AbboudTeacherActivity: React.FC<AbboudTeacherProps> = ({ uid, onClose, onSessionComplete }) => {
  const [selectedSessionId, setSelectedSessionId] = useState<number>(1);
  const [currentTurn, setCurrentTurn] = useState<ClassroomTurn>('abboud_explain');
  
  // Abboud speech & input state
  const [teacherSpeechInput, setTeacherSpeechInput] = useState<string>('');
  const [isListeningMic, setIsListeningMic] = useState<boolean>(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [micSupported, setMicSupported] = useState<boolean>(true);
  const [isHintsOpen, setIsHintsOpen] = useState<boolean>(false);

  // Turn data from AI
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);
  const [isFallbackMode, setIsFallbackMode] = useState<boolean>(false);
  
  // Real conversation contents
  const [badrQuestion, setBadrQuestion] = useState<{ ar: string; en: string; spoken: string }>({ ar: '', en: '', spoken: '' });
  const [badrReaction, setBadrReaction] = useState<string>('');
  const [reemAttempt, setReemAttempt] = useState<{ ar: string; en: string; spoken: string; mistakeDesc: string }>({ ar: '', en: '', spoken: '', mistakeDesc: '' });
  const [reemReaction, setReemReaction] = useState<{ ar: string; en: string; spoken: string }>({ ar: '', en: '', spoken: '' });
  const [saraGuidance, setSaraGuidance] = useState<{ ar: string; spoken: string }>({ ar: '', spoken: '' });
  const [saraInterventionAlert, setSaraInterventionAlert] = useState<string | null>(null);
  
  // Audio state
  const [activeSpeaker, setActiveSpeaker] = useState<'sara' | 'badr' | 'reem' | 'abboud' | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Student emotion/visual states
  const [badrState, setBadrState] = useState<'listening' | 'asking' | 'delighted'>('listening');
  const [reemState, setReemState] = useState<'listening' | 'trying' | 'confused' | 'happy'>('listening');

  // Web Speech Recognition reference
  const recognitionRef = useRef<any>(null);
  const isComponentMounted = useRef<boolean>(true);

  // Persistence per UID
  const storageKey = `abboud_teacher_progress_${uid || 'guest'}`;
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return { completedSessions: [], sessionScores: {}, lastUpdated: new Date().toISOString() };
  });

  const session = SESSIONS_CONFIG.find(s => s.id === selectedSessionId) || SESSIONS_CONFIG[0];

  useEffect(() => {
    isComponentMounted.current = true;
    const hasSR = typeof window !== 'undefined' && !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
    setMicSupported(hasSR);

    return () => {
      isComponentMounted.current = false;
      cancelAllSpeech();
      try {
        if (recognitionRef.current) recognitionRef.current.abort();
      } catch (_) {}
    };
  }, []);

  // Save progress safely without overwriting global XP
  const saveSessionCompletion = (sid: number) => {
    setProgress(prev => {
      const isAlready = prev.completedSessions.includes(sid);
      const nextCompleted = isAlready ? prev.completedSessions : [...prev.completedSessions, sid];
      const xp = sid === 5 ? 100 : 35;
      const updated: UserProgress = {
        completedSessions: nextCompleted,
        sessionScores: { ...prev.sessionScores, [sid]: 100 },
        lastUpdated: new Date().toISOString()
      };
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch (_) {}

      if (!isAlready && onSessionComplete) {
        onSessionComplete(sid, xp);
      }
      return updated;
    });
  };

  // Safe voice playback with sequential highlighting
  const playCharacterSpeech = async (text: string, lang: 'ar' | 'en', voice: 'Kore' | 'Puck' | 'Fenrir' | 'Aoede', speaker: 'sara' | 'badr' | 'reem' | 'abboud') => {
    if (isMuted || !text.trim()) return;
    cancelAllSpeech();
    setActiveSpeaker(speaker);

    try {
      await speakAcademyText(
        text,
        lang,
        () => {
          if (isComponentMounted.current) setActiveSpeaker(speaker);
        },
        () => {
          if (isComponentMounted.current) setActiveSpeaker(null);
        },
        voice,
        1.0
      );
    } catch (_) {
      if (isComponentMounted.current) setActiveSpeaker(null);
    }
  };

  const stopAllSpeech = () => {
    cancelAllSpeech();
    setActiveSpeaker(null);
  };

  // Speech Recognition management
  const startMicRecording = () => {
    setMicError(null);
    const SR = typeof window !== 'undefined' && ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
    if (!SR) {
      setMicError('المتصفح لا يدعم التعرّف الصوتي التلقائي؛ يمكنك الكتابة في الخانة مباشرة.');
      return;
    }

    try {
      if (recognitionRef.current) recognitionRef.current.abort();
    } catch (_) {}

    stopAllSpeech();
    const recognition = new SR();
    recognition.lang = 'ar-SA'; // Primary instruction language with auto English recognition
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      if (isComponentMounted.current) setIsListeningMic(true);
    };

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        finalTranscript += event.results[i][0].transcript;
      }
      if (finalTranscript && isComponentMounted.current) {
        setTeacherSpeechInput(finalTranscript);
      }
    };

    recognition.onerror = (event: any) => {
      const err = event?.error;
      if (isComponentMounted.current) {
        setIsListeningMic(false);
        if (err === 'not-allowed') {
          setMicError('تم رفض إذن المايكروفون. يمكنك السماح بالوصول أو الكتابة في الخانة.');
        } else if (err === 'no-speech') {
          setMicError('لم يتم التقاط صوت. تحدّث بوضوح بالقرب من المايكروفون أو اكتب شرحك.');
        } else {
          setMicError('تعذّر التقاط الصوت بدقة. يمكنك الكتابة مباشرة.');
        }
      }
    };

    recognition.onend = () => {
      if (isComponentMounted.current) setIsListeningMic(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch (e: any) {
      setIsListeningMic(false);
      setMicError('تعذّر بدء تسجيل الصوت. يمكنك الكتابة في الخانة.');
    }
  };

  const stopMicRecording = () => {
    try {
      if (recognitionRef.current) recognitionRef.current.stop();
    } catch (_) {}
    setIsListeningMic(false);
  };

  // Switch session
  const handleSelectSession = (sid: number) => {
    stopAllSpeech();
    stopMicRecording();
    setSelectedSessionId(sid);
    setCurrentTurn('abboud_explain');
    setTeacherSpeechInput('');
    setMicError(null);
    setSaraInterventionAlert(null);
    setBadrState('listening');
    setReemState('listening');
    setBadrQuestion({ ar: '', en: '', spoken: '' });
    setBadrReaction('');
    setReemAttempt({ ar: '', en: '', spoken: '', mistakeDesc: '' });
    setReemReaction({ ar: '', en: '', spoken: '' });
    setSaraGuidance({ ar: '', spoken: '' });
  };

  // Submit Abboud's Explanation (Turn 1 -> Turn 2)
  const handleSubmitExplanation = async () => {
    const text = teacherSpeechInput.trim();
    if (!text || isAiThinking) return;

    stopMicRecording();
    stopAllSpeech();
    setIsAiThinking(true);
    setSaraInterventionAlert(null);

    try {
      const res = await fetch('/api/sara/abboud-teacher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: session.id,
          stage: 'explain',
          teacherSpeech: text,
        })
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setIsFallbackMode(Boolean(data.isFallback));

      if (data.status === 'inaccurate' || data.status === 'off_topic') {
        setSaraInterventionAlert(data.saraIntervention || "أستاذ عبود، انتبه لموضوع الحصة وحاول تركيز الشرح على المفهوم المستهدف.");
      }

      setBadrQuestion({
        ar: data.badrQuestionAr || "أستاذ عبود! هل يمكن أن توضح لنا بمثال؟",
        en: data.badrQuestionEn || "Teacher Abboud! Could you give an example?",
        spoken: data.badrSpoken || data.badrQuestionEn || data.badrQuestionAr
      });

      setBadrState('asking');
      setCurrentTurn('badr_asking');
      setTeacherSpeechInput('');

      // Speak Badr's question aloud
      const textToSpeak = data.badrSpoken || data.badrQuestionAr;
      const lang = /^[A-Za-z0-9\s.,!?'"-]+$/.test(textToSpeak) ? 'en' : 'ar';
      playCharacterSpeech(textToSpeak, lang, 'Fenrir', 'badr');
    } catch (_) {
      // Fallback
      setIsFallbackMode(true);
      setBadrQuestion({
        ar: "أستاذ عبود! هل أقول My name is بدر أو I am بدر؟ وما الفرق؟",
        en: "Teacher Abboud! Should I say My name is Badr or I am Badr?",
        spoken: "Teacher Abboud! Should I say My name is Badr or I am Badr?"
      });
      setBadrState('asking');
      setCurrentTurn('badr_asking');
      setTeacherSpeechInput('');
    } finally {
      setIsAiThinking(false);
    }
  };

  // Submit Abboud's Answer to Badr (Turn 2 -> Turn 3)
  const handleSubmitAnswerToBadr = async () => {
    const text = teacherSpeechInput.trim();
    if (!text || isAiThinking) return;

    stopMicRecording();
    stopAllSpeech();
    setIsAiThinking(true);
    setSaraInterventionAlert(null);

    try {
      const res = await fetch('/api/sara/abboud-teacher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: session.id,
          stage: 'answer_badr',
          badrQuestion: badrQuestion.ar,
          teacherSpeech: text,
        })
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setIsFallbackMode(Boolean(data.isFallback));

      setBadrReaction(data.badrReaction || "شكراً يا أستاذ عبود! الآن اتضحت لي الفكرة تماماً.");
      setBadrState('delighted');

      setReemAttempt({
        ar: data.reemAttemptAr || "ريم تحاول التطبيق لكنها ترتكب خطأ تربوياً هادفاً",
        en: data.reemAttemptEn || "Hello! My name is book!",
        spoken: data.reemSpoken || data.reemAttemptEn || "Hello! My name is book!",
        mistakeDesc: data.reemMistakeDescription || "ريم استخدمت كلمة book بدلاً من اسمها."
      });

      setReemState('trying');
      setCurrentTurn('reem_practicing');
      setTeacherSpeechInput('');

      // Play Reem's spoken mistake
      playCharacterSpeech(data.reemSpoken || data.reemAttemptEn, 'en', 'Aoede', 'reem');
    } catch (_) {
      setIsFallbackMode(true);
      setBadrReaction("فهمت عليك يا أستاذي! شكراً لك.");
      setBadrState('delighted');
      setReemAttempt({
        ar: "ريم تحاول التعريف بنفسها",
        en: "Hello! My name is book! What you name?",
        spoken: "Hello! My name is book! What you name?",
        mistakeDesc: "ريم وضعت book بدلاً من اسمها وحذفت is في السؤال."
      });
      setReemState('trying');
      setCurrentTurn('reem_practicing');
      setTeacherSpeechInput('');
    } finally {
      setIsAiThinking(false);
    }
  };

  // Submit Abboud's Correction to Reem (Turn 3 -> Turn 4)
  const handleSubmitCorrectionToReem = async () => {
    const text = teacherSpeechInput.trim();
    if (!text || isAiThinking) return;

    stopMicRecording();
    stopAllSpeech();
    setIsAiThinking(true);

    try {
      const res = await fetch('/api/sara/abboud-teacher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: session.id,
          stage: 'correct_reem',
          originalMistake: reemAttempt.en,
          teacherCorrection: text,
        })
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setIsFallbackMode(Boolean(data.isFallback));

      setReemReaction({
        ar: data.reemReactionAr || "شكراً يا أستاذ عبود! الآن فهمت الخطأ!",
        en: data.reemReactionEn || "Now I get it! Thank you teacher!",
        spoken: data.reemSpoken || data.reemReactionEn || "Thank you teacher!"
      });
      setReemState('happy');

      setSaraGuidance({
        ar: data.saraSummaryAr || "أحسنت يا أستاذ عبود! حصة تدريبية ناجحة عززت فهم الطلاب بدقة ولطف.",
        spoken: data.saraSpoken || data.saraSummaryAr || "أحسنت يا أستاذ عبود!"
      });

      saveSessionCompletion(session.id);
      setCurrentTurn('session_wrapup');
      setTeacherSpeechInput('');

      // Play Reem's reaction first, then Sara's wrapup
      playCharacterSpeech(data.reemSpoken || data.reemReactionEn, 'en', 'Aoede', 'reem');
    } catch (_) {
      setIsFallbackMode(true);
      setReemReaction({
        ar: "شكراً يا أستاذ عبود! الآن فهمت التصحيح ولن أكرره!",
        en: "Thank you Teacher Abboud! Now I understand!",
        spoken: "Thank you Teacher Abboud! Now I understand!"
      });
      setReemState('happy');
      setSaraGuidance({
        ar: "خلاصة الحصة: تدرّبنا على المفهوم المستهدف وصحّح عبود خطأ ريم بلطف وحكمة. عمل رائع!",
        spoken: "ممتاز يا عبود! حصة تدريبية متقنة."
      });
      saveSessionCompletion(session.id);
      setCurrentTurn('session_wrapup');
      setTeacherSpeechInput('');
    } finally {
      setIsAiThinking(false);
    }
  };

  const isCompleted = progress.completedSessions.includes(session.id);

  return (
    <div
      data-testid="abboud-classroom-modal"
      className="fixed inset-0 z-[220] bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-[#fdfaf3] rounded-3xl border-2 border-[#C49E3A] shadow-2xl flex flex-col max-h-[95vh] overflow-hidden text-[#002147] animate-in fade-in duration-200"
        dir="rtl"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Bar: Room Title, Session Selector, Sound Controls, Close */}
        <header className="shrink-0 bg-gradient-to-r from-[#002147] via-[#002b5c] to-[#002147] text-white px-3 sm:px-5 py-3 border-b-2 border-[#C49E3A]/60 flex items-center justify-between gap-2 shadow-md">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-10 h-10 rounded-2xl bg-[#C49E3A] text-2xl flex items-center justify-center shadow-inner shrink-0">
              👨‍🏫
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-black text-white truncate">
                  فصل المعلّم عبود · Teacher Abboud's Class
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/30 text-emerald-300 border border-emerald-400/40">
                  فصل محاكاة تفاعلي
                </span>
              </div>
              <p className="text-[11px] text-white/75 font-bold truncate">
                طالبان افتراضيان بالذكاء الاصطناعي يسمعان شرحك ويتفاعلان معك
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                if (activeSpeaker) stopAllSpeech();
                setIsMuted(!isMuted);
              }}
              title={isMuted ? "تشغيل الصوت" : "كتم الصوت"}
              className="px-2 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold flex items-center gap-1 text-white transition-colors"
            >
              <span>{isMuted ? '🔇' : '🔊'}</span>
              <span className="hidden sm:inline">{isMuted ? 'الصوت مكتوم' : 'الصوت مفعل'}</span>
            </button>
            <button
              onClick={onClose}
              data-testid="abboud-classroom-close-btn"
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white text-sm font-black flex items-center justify-center transition-all"
              aria-label="إغلاق الفصل"
            >
              ✕
            </button>
          </div>
        </header>

        {/* 5-Session Horizontal Tab Ribbon */}
        <div className="shrink-0 bg-white border-b border-[#C49E3A]/25 px-3 py-1.5 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {SESSIONS_CONFIG.map(s => {
            const isCur = s.id === selectedSessionId;
            const isDone = progress.completedSessions.includes(s.id);
            return (
              <button
                key={s.id}
                onClick={() => handleSelectSession(s.id)}
                data-testid={`session-btn-${s.id}`}
                className={`shrink-0 px-3 py-1.5 rounded-xl border text-xs font-black flex items-center gap-1.5 transition-all active:scale-95 ${
                  isCur
                    ? 'bg-[#002147] text-white border-[#C49E3A] shadow-sm'
                    : 'bg-[#fdfaf3] text-[#002147] border-[#C49E3A]/30 hover:bg-amber-50'
                }`}
              >
                <span>{s.emoji}</span>
                <span>{`حصة ${s.id}`}</span>
                {isDone && <span className="text-emerald-500 text-xs">✓</span>}
              </button>
            );
          })}
        </div>

        {/* Fallback mode alert if AI is unreachable */}
        {isFallbackMode && (
          <div className="bg-blue-50 border-b border-blue-200 px-3 py-1 text-[11px] font-bold text-blue-900 flex items-center justify-between">
            <span>⚡ وضع الإرشاد الصفي المباشر: الفصل يستمر دون انقطاع.</span>
            <span className="text-[10px] text-blue-700">احتياطي آمن</span>
          </div>
        )}

        {/* Main Classroom Viewport */}
        <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4 space-y-3">
          
          {/* 1. MINI CLASSROOM CHALKBOARD (السبورة الصفية الصغيرة) */}
          <div className="relative bg-[#0d2a20] rounded-2xl border-4 border-[#8B5E34] shadow-lg p-3 sm:p-4 text-emerald-100 overflow-hidden">
            {/* Wooden Board Frame Accents */}
            <div className="absolute top-1 left-2 text-[10px] font-mono text-amber-200/40">CHALKBOARD</div>
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-amber-300 font-black text-xs sm:text-sm tracking-wide">
                    {`📌 سبورة الحصة ${session.id}: ${session.titleAr}`}
                  </span>
                  <span className="text-[11px] text-emerald-300 font-bold font-mono" dir="ltr">
                    ({session.titleEn})
                  </span>
                </div>
                {/* Chalk target keywords */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1" dir="ltr">
                  {session.chalkTargetWords.map((word, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-white/10 border border-white/20 text-xs font-mono font-bold text-amber-200 shadow-xs"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>

              {/* Supervisor Sara Miniature Desk in Corner */}
              <div className="shrink-0 bg-[#002147]/80 border border-[#C49E3A]/60 rounded-xl p-2 text-white flex items-center gap-2 max-w-[200px] shadow-md">
                <span className="text-2xl">👩‍🏫</span>
                <div className="text-[10px] leading-tight">
                  <span className="block font-black text-amber-300">المشرفة سارة</span>
                  <span className="text-white/80 block mt-0.5">{session.saraObjectiveAr}</span>
                </div>
              </div>
            </div>

            {/* Chalk Rule Line */}
            <div className="mt-2.5 pt-2 border-t border-emerald-800/60 flex items-center justify-between text-xs font-bold text-amber-100/90">
              <p>✏️ {session.chalkRuleAr}</p>
              <button
                type="button"
                onClick={() => playCharacterSpeech(session.saraObjectiveAr, 'ar', 'Kore', 'sara')}
                className="px-2 py-0.5 rounded bg-emerald-900/80 hover:bg-emerald-800 text-[10px] text-amber-200 border border-emerald-700 flex items-center gap-1 shrink-0"
              >
                <span>{activeSpeaker === 'sara' ? '⏹️' : '🔊'}</span>
                <span>توجيه سارة</span>
              </button>
            </div>
          </div>

          {/* Sara Gentle Alert (Appears only when she intervenes or corrects off-topic) */}
          {saraInterventionAlert && (
            <div className="bg-amber-100/90 border-2 border-amber-400 rounded-2xl p-2.5 text-xs font-bold text-[#002147] flex items-center gap-2 animate-in slide-in-from-top-2">
              <span className="text-lg">💡</span>
              <div className="flex-1">
                <span className="font-black text-amber-900">توجيه المشرفة سارة للمعلّم: </span>
                <span>{saraInterventionAlert}</span>
              </div>
            </div>
          )}

          {/* 2. THE CLASSROOM DESKS: BADR & REEM (الطالبان الافتراضيان) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            
            {/* STUDENT 1: BADR (بدر) */}
            <div
              className={`rounded-2xl border-2 p-3 sm:p-4 bg-white shadow-sm transition-all flex flex-col justify-between ${
                activeSpeaker === 'badr'
                  ? 'border-sky-500 ring-2 ring-sky-300'
                  : badrState === 'asking'
                  ? 'border-sky-400 bg-sky-50/30'
                  : 'border-[#C49E3A]/30'
              }`}
            >
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <span className="w-11 h-11 rounded-full bg-sky-100 border-2 border-sky-400 flex items-center justify-center text-2xl shadow-inner">
                      👦
                    </span>
                    <span className="absolute -bottom-1 -right-1 text-xs">
                      {badrState === 'asking' ? '❓' : badrState === 'delighted' ? '👏' : '👂'}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs sm:text-sm font-black text-[#002147]">الطالب بدر</h4>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-sky-100 text-sky-800">
                        افتراضي AI
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500">
                      {badrState === 'asking' ? 'يطرح سؤالاً حول شرحك' : badrState === 'delighted' ? 'فهم الإجابة' : 'يستمع لشرح المعلّم'}
                    </span>
                  </div>
                </div>

                {badrQuestion.ar && (
                  <button
                    type="button"
                    onClick={() => playCharacterSpeech(badrQuestion.spoken || badrQuestion.ar, 'ar', 'Fenrir', 'badr')}
                    className="p-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 text-xs font-bold"
                    title="إعادة سماع سؤال بدر"
                  >
                    {activeSpeaker === 'badr' ? '⏹️' : '🔊'}
                  </button>
                )}
              </div>

              {/* Badr's Speech Bubble Area */}
              <div className="my-2.5 min-h-[60px] flex items-center">
                {badrQuestion.ar ? (
                  <div className="relative w-full bg-sky-50 border border-sky-200 rounded-2xl p-2.5 text-xs font-bold text-sky-950">
                    <p className="leading-relaxed">«{badrQuestion.ar}»</p>
                    {badrQuestion.en && (
                      <p className="text-[11px] text-sky-700 mt-0.5 font-mono" dir="ltr">
                        "{badrQuestion.en}"
                      </p>
                    )}
                    {badrReaction && (
                      <p className="mt-1.5 pt-1.5 border-t border-sky-200 text-emerald-800 font-black text-[11px]">
                        ✓ بدر: {badrReaction}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic text-center w-full">
                    بدر يجلس بانتظار استماع شرحك للدرس...
                  </p>
                )}
              </div>

              {/* Status pill */}
              <div className="text-[10px] font-black text-slate-500 flex items-center justify-between">
                <span>مقعد الطالب الأول</span>
                {currentTurn === 'badr_asking' && (
                  <span className="text-sky-600 animate-pulse font-black">
                    بانتظار إجابة المعلّم عبود...
                  </span>
                )}
              </div>
            </div>

            {/* STUDENT 2: REEM (ريم) */}
            <div
              className={`rounded-2xl border-2 p-3 sm:p-4 bg-white shadow-sm transition-all flex flex-col justify-between ${
                activeSpeaker === 'reem'
                  ? 'border-rose-500 ring-2 ring-rose-300'
                  : reemState === 'trying'
                  ? 'border-rose-400 bg-rose-50/30'
                  : 'border-[#C49E3A]/30'
              }`}
            >
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <span className="w-11 h-11 rounded-full bg-rose-100 border-2 border-rose-400 flex items-center justify-center text-2xl shadow-inner">
                      👧
                    </span>
                    <span className="absolute -bottom-1 -right-1 text-xs">
                      {reemState === 'trying' ? '✍️' : reemState === 'happy' ? '😊' : '👂'}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs sm:text-sm font-black text-[#002147]">الطالبة ريم</h4>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-rose-100 text-rose-800">
                        افتراضية AI
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500">
                      {reemState === 'trying' ? 'تطبق بجملة (خطأ تربوي هادف)' : reemState === 'happy' ? 'استوعبت التصحيح' : 'تستمع وتشارك'}
                    </span>
                  </div>
                </div>

                {reemAttempt.en && (
                  <button
                    type="button"
                    onClick={() => playCharacterSpeech(reemAttempt.spoken || reemAttempt.en, 'en', 'Aoede', 'reem')}
                    className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200 text-xs font-bold"
                    title="إعادة سماع ما قالته ريم"
                  >
                    {activeSpeaker === 'reem' ? '⏹️' : '🔊'}
                  </button>
                )}
              </div>

              {/* Reem's Speech Bubble Area */}
              <div className="my-2.5 min-h-[60px] flex items-center">
                {reemAttempt.en ? (
                  <div className="relative w-full bg-rose-50 border border-rose-200 rounded-2xl p-2.5 text-xs font-bold text-rose-950">
                    <p className="font-mono text-xs sm:text-sm font-black text-rose-900" dir="ltr">
                      «{reemAttempt.en}»
                    </p>
                    <p className="text-[10px] text-rose-700 mt-1">
                      🔍 <strong>خطأ ريم: </strong> {reemAttempt.mistakeDesc}
                    </p>
                    {reemReaction.ar && (
                      <p className="mt-1.5 pt-1.5 border-t border-rose-200 text-emerald-800 font-black text-[11px]">
                        ✓ ريم: {reemReaction.ar} ({reemReaction.en})
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic text-center w-full">
                    ريم تستعد لتطبيق الدرس بعد إجابة بدر...
                  </p>
                )}
              </div>

              {/* Status pill */}
              <div className="text-[10px] font-black text-slate-500 flex items-center justify-between">
                <span>مقعد الطالبة الثانية</span>
                {currentTurn === 'reem_practicing' && (
                  <span className="text-rose-600 animate-pulse font-black">
                    تحتاج تصحيح المعلّم عبود...
                  </span>
                )}
              </div>
            </div>

          </div>

          {/* 3. SESSION WRAP-UP MODAL / BANNER (عند اكتمال الحصة) */}
          {currentTurn === 'session_wrapup' && (
            <div className="bg-gradient-to-r from-emerald-50 via-white to-amber-50 rounded-2xl border-2 border-emerald-500 p-4 shadow-md text-center space-y-2.5 animate-in zoom-in-95">
              <span className="text-3xl inline-block">{session.badgeIcon}</span>
              <div>
                <h3 className="text-sm sm:text-base font-black text-[#002147]">
                  {saraGuidance.ar || "أحسنت يا أستاذ عبود! أتممت الحصة التدريبية بنجاح."}
                </h3>
                <p className="text-xs font-bold text-[#C49E3A] mt-0.5">
                  حصلت على: {session.badgeNameAr} (+{session.id === 5 ? 100 : 35} XP)
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                {session.id < 5 ? (
                  <button
                    type="button"
                    onClick={() => handleSelectSession(session.id + 1)}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md active:scale-95 transition-transform"
                  >
                    الحصة التالية ({session.id + 1}) ←
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2 rounded-xl bg-[#002147] hover:bg-[#001a38] text-amber-300 font-black text-xs shadow-md active:scale-95 transition-transform"
                  >
                    إنهاء والعودة لفصل سارة 👏
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleSelectSession(session.id)}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-[#002147] border border-slate-300 font-bold text-xs"
                >
                  إعادة الحصة 🔄
                </button>
              </div>
            </div>
          )}

          {/* 4. ABBOUD'S TEACHER INTERACTIVE CONSOLE (منصة المعلّم عبود) */}
          {currentTurn !== 'session_wrapup' && (
            <div className="bg-white rounded-2xl border-2 border-[#C49E3A]/60 p-3 sm:p-4 shadow-md space-y-3">
              {/* Turn Instruction Header */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#002147] text-amber-300 font-black text-xs flex items-center justify-center">
                    {currentTurn === 'abboud_explain' ? '1' : currentTurn === 'badr_asking' ? '2' : '3'}
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-[#002147]">
                      {currentTurn === 'abboud_explain'
                        ? 'الخطوة 1: اشرح الدرس لبدر وريم بصوتك أو كتابةً'
                        : currentTurn === 'badr_asking'
                        ? 'الخطوة 2: أجب عن سؤال بدر ووضّح له النقطة'
                        : 'الخطوة 3: وجّه ريم وصحّح لها خطأها اللغوي'}
                    </h4>
                    <span className="text-[10px] text-slate-500 font-bold">
                      تحدث عبر المايكروفون ثم راجع النص وأرسله للطلاب
                    </span>
                  </div>
                </div>

                {/* Optional collapsed hints toggle */}
                <button
                  type="button"
                  onClick={() => setIsHintsOpen(!isHintsOpen)}
                  className="text-[11px] font-bold text-[#C49E3A] hover:underline flex items-center gap-1"
                >
                  <span>💡 {isHintsOpen ? 'إخفاء الأفكار المقترحة' : 'أفكار مقترحة للشرح (اختياري)'}</span>
                </button>
              </div>

              {/* Folded Hints Accordion (اختياري ومطوي افتراضياً) */}
              {isHintsOpen && (
                <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-200 text-xs font-bold text-[#002147] space-y-1.5 animate-in slide-in-from-top-1">
                  <span className="text-[10px] font-black text-[#C49E3A] block">
                    يمكنك الاستئناس بإحدى هذه العبارات وصياغتها بأسلوبك:
                  </span>
                  {session.hintPhrases.map((hint, idx) => (
                    <div
                      key={idx}
                      onClick={() => setTeacherSpeechInput(hint.ar)}
                      className="cursor-pointer hover:bg-white p-1.5 rounded-lg border border-amber-200/50 transition-colors text-[11px]"
                    >
                      <p>{hint.ar}</p>
                      <p className="text-[10px] text-slate-500 font-mono" dir="ltr">{hint.en}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Live Speech Recognition & Edit Field */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {/* Primary Mic Button */}
                  {micSupported && (
                    <button
                      type="button"
                      data-testid="abboud-mic-btn"
                      onClick={isListeningMic ? stopMicRecording : startMicRecording}
                      className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95 ${
                        isListeningMic
                          ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse'
                          : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white'
                      }`}
                    >
                      <span>{isListeningMic ? '⏹️ إيقاف التسجيل' : '🎙️ اضغط وتحدّث بصوتك'}</span>
                    </button>
                  )}

                  {isListeningMic && (
                    <span className="text-xs font-bold text-rose-600 animate-pulse flex items-center gap-1">
                      <span>●</span>
                      <span>جاري الاستماع لكلامك الآن...</span>
                    </span>
                  )}
                </div>

                {/* Mic Error Alert */}
                {micError && (
                  <p className="text-[11px] font-bold text-rose-700 bg-rose-50 p-2 rounded-lg border border-rose-200">
                    ⚠️ {micError}
                  </p>
                )}

                {/* Editable Transcript Field */}
                <div>
                  <label className="block text-[11px] font-black text-slate-600 mb-1">
                    تفريغ كلامك (يمكنك تعديل أي كلمة هنا قبل الإرسال، أو الكتابة مباشرة):
                  </label>
                  <textarea
                    rows={2}
                    value={teacherSpeechInput}
                    onChange={e => setTeacherSpeechInput(e.target.value)}
                    placeholder={
                      currentTurn === 'abboud_explain'
                        ? 'تحدث عبر المايك أو اكتب شرحك هنا لبدر وريم...'
                        : currentTurn === 'badr_asking'
                        ? 'تحدث عبر المايك أو اكتب إجابتك على سؤال بدر هنا...'
                        : 'تحدث عبر المايك أو اكتب تصحيحك وتوجيهك لريم هنا...'
                    }
                    className="w-full p-2.5 rounded-xl border border-[#C49E3A]/40 bg-[#fdfaf3] text-xs sm:text-sm font-bold text-[#002147] placeholder:text-slate-400 outline-none focus:border-[#C49E3A] focus:bg-white"
                  />
                </div>
              </div>

              {/* Action Buttons: Send to Students */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-500 font-bold">
                  {teacherSpeechInput.trim().length > 0 ? `✓ جاهز للإرسال (${teacherSpeechInput.trim().length} حرف)` : 'بانتظار كلامك أو كتابتك...'}
                </span>

                <button
                  type="button"
                  data-testid="abboud-send-speech-btn"
                  disabled={!teacherSpeechInput.trim() || isAiThinking}
                  onClick={
                    currentTurn === 'abboud_explain'
                      ? handleSubmitExplanation
                      : currentTurn === 'badr_asking'
                      ? handleSubmitAnswerToBadr
                      : handleSubmitCorrectionToReem
                  }
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#002147] to-[#003366] hover:from-[#001a38] hover:to-[#002852] disabled:opacity-40 text-amber-300 font-black text-xs sm:text-sm shadow-md active:scale-95 transition-transform flex items-center gap-2 border border-[#C49E3A]/60"
                >
                  {isAiThinking ? (
                    <>
                      <span className="animate-spin text-sm">⏳</span>
                      <span>الطلاب يفكرون في كلامك...</span>
                    </>
                  ) : (
                    <>
                      <span>📢</span>
                      <span>
                        {currentTurn === 'abboud_explain'
                          ? 'إلقاء الشرح على الطلاب'
                          : currentTurn === 'badr_asking'
                          ? 'إرسال الإجابة لبدر'
                          : 'إرسال التصحيح لريم'}
                      </span>
                      <span>←</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer info bar */}
        <footer className="shrink-0 bg-white border-t border-[#C49E3A]/25 px-4 py-2 flex items-center justify-between text-[11px] font-bold text-slate-600">
          <div className="flex items-center gap-2">
            <span>الحصص المكتملة: {progress.completedSessions.length} من 5</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(id => (
                <span
                  key={id}
                  className={`w-2.5 h-2.5 rounded-full ${
                    progress.completedSessions.includes(id) ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#002147] hover:text-[#C49E3A] font-black underline"
          >
            إغلاق الفصل ✕
          </button>
        </footer>
      </div>
    </div>
  );
};

export default AbboudTeacherActivity;
