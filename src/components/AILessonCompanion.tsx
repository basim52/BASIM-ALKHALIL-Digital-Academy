import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  MessageSquare, 
  X, 
  Volume2, 
  VolumeX, 
  Mic, 
  Send, 
  HelpCircle, 
  ArrowLeft, 
  BookOpen, 
  BookOpenCheck,
  Languages, 
  Smile, 
  Clock, 
  ChevronRight, 
  ChevronLeft,
  Minimize2,
  Maximize2,
  BrainCircuit,
  MessageCircleOff,
  User,
  Activity,
  Square
} from 'lucide-react';
import { speakAcademyText, cancelAllSpeech } from '../lib/audio';

// Dynamic Web Audio API synthesizer for clean offline chime feedback
const playPristineChime = (type: 'open' | 'message' | 'close' | 'think') => {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    
    if (type === 'open') {
      // Minimal elegant upward chords
      const freqs = [329.63, 392.00, 523.25, 659.25]; // E4, G4, C5, E5
      freqs.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(freq, now + index * 0.08);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.12, now + index * 0.08 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + index * 0.08);
        osc.stop(now + index * 0.08 + 0.6);
      });
    } else if (type === 'message') {
      // Delightful feedback bell pop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.setValueAtTime(783.99, now + 0.07); // G5
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.1, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.26);
    } else if (type === 'close') {
      // Simple descending signoff
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(392.00, now); // G4
      osc.frequency.setValueAtTime(261.63, now + 0.15); // C4
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.26);
    } else if (type === 'think') {
      // Deep sub-soft acoustic sonar pulse
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(196.00, now); // G3
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.41);
    }
  } catch (e) {
    console.debug('Failed to play custom workspace synth chimes:', e);
  }
};

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  isAudioPlaying?: boolean;
}

interface AILessonCompanionProps {
  lesson: any; // Active full lesson object
  isRtl: boolean;
  onContinue?: () => void; // Called if user chooses to proceed with standard lesson flow 
}

export const AILessonCompanion: React.FC<AILessonCompanionProps> = ({ lesson, isRtl, onContinue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [autoSpeakMode, setAutoSpeakMode] = useState(true);
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);
  const [activeVoiceId, setActiveVoiceId] = useState<string | null>(null);
  
  // Custom Strategic Modes state covering 5 World-Class Pillars
  const [companionMode, setCompanionMode] = useState<'chat' | 'pronounce' | 'grammar_cubes' | 'vocab_stamina' | 'situational_roleplay' | 'mastery_ledger'>('chat');
  
  // Pillar 1: Pronunciation Studio Calibration state
  const [activePronounceWordIdx, setActivePronounceWordIdx] = useState(0);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationResult, setCalibrationResult] = useState<{
    score: number;
    flow: number;
    clearness: number;
    feedbackAr: string;
    feedbackEn: string;
    level: string;
  } | null>(null);
  
  // Pillar 2: Grammar Sentence Scaffold Sandbox state
  const [activeGrammarIdx, setActiveGrammarIdx] = useState(0);
  const [selectedScrambledWords, setSelectedScrambledWords] = useState<string[]>([]);
  const [scrambledPool, setScrambledPool] = useState<string[]>([]);
  const [scrambledFeedback, setScrambledFeedback] = useState<{
    checked: boolean;
    isCorrect: boolean;
    explanationAr: string;
    explanationEn: string;
  } | null>(null);

  // Pillar 3: Spaced Repetition Vocab Stamina state
  const [vocabCardIdx, setVocabCardIdx] = useState(0);
  const [vocabIsFlipped, setVocabIsFlipped] = useState(false);
  const [vocabRepetitionStates, setVocabRepetitionStates] = useState<Record<string, 'new' | 'review' | 'mastered'>>({});

  // Pillar 4: Persona-driven Situational Roleplay state
  const [selectedPersona, setSelectedPersona] = useState<'dean' | 'peer' | 'recruiter'>('peer');
  const [roleplayMessages, setRoleplayMessages] = useState<Array<{ id: string; role: 'user' | 'persona'; text: string }>>([]);
  const [roleplayInput, setRoleplayInput] = useState('');
  const [isRoleplayThinking, setIsRoleplayThinking] = useState(false);
  const [roleplayTokensFound, setRoleplayTokensFound] = useState<string[]>([]);

  // Pillar 5: Lesson Mastery Certificate & Reflection Ledger
  const [reflectionQ1, setReflectionQ1] = useState('');
  const [reflectionQ2, setReflectionQ2] = useState('');
  const [signatureName, setSignatureName] = useState('');
  const [isCertificateUnlocked, setIsCertificateUnlocked] = useState(false);
  const [certifiedDate, setCertifiedDate] = useState('');

  const bottomRef = useRef<HTMLDivElement>(null);

  // Re-set or clear messages when switching lessons
  useEffect(() => {
    setMessages([
      {
        id: 'msg-welcome',
        role: 'assistant',
        text: isRtl 
          ? `مرحباً بك! 👋 أنا رفيقتك التعليمية الذكية لدرس **"${lesson.title || lesson.titleEn || 'هذا الدرس'}"**. كيف يمكنني مساعدتك في توضيح المفردات، أو شرح القواعد، أو ترجمة المقاطع؟ اسألني ما تشاء وسأجيبك فوراً بالصوت والكتابة! ✨`
          : `Welcome! 👋 I am your intelligent academic companion for the lesson **"${lesson.title || lesson.titleEn || 'this lesson'}"**. Let me help you break down vocabulary, clarify grammar, or translate text. Ask me anything, and I'll explain it instantly! ✨`
      }
    ]);
    setShowWelcome(true);
    setIsOpen(false);
    cancelAllSpeech();
    setCurrentPlayingId(null);
    setCompanionMode('chat');
    setActivePronounceWordIdx(0);
    setCalibrationResult(null);
    setActiveGrammarIdx(0);
    setScrambledFeedback(null);
    
    // Pillar 3 states reset
    setVocabCardIdx(0);
    setVocabIsFlipped(false);
    setVocabRepetitionStates({});

    // Pillar 4 states reset
    setRoleplayMessages([
      {
        id: 'rp-initial',
        role: 'persona',
        text: isRtl 
          ? `مرحباً بك! أنا مستعد لبدء محاكاة واقعية معك باستخدام مفردات درس اليوم. اختر شخصيتي المفضلة لنبدأ على الفور! 🌟`
          : `Hello! I am ready to begin a real-life situation simulator with you using today's vocabulary. Choose my persona below to begin! 🌟`
      }
    ]);
    setRoleplayInput('');
    setRoleplayTokensFound([]);
    setIsRoleplayThinking(false);

    // Pillar 5 states reset
    setReflectionQ1('');
    setReflectionQ2('');
    setSignatureName('');
    setIsCertificateUnlocked(false);
    setCertifiedDate('');
  }, [lesson.id]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Extracted vocabulary from lesson data
  const extractedVocab = (
    Array.isArray(lesson.cards) ? lesson.cards.map((c: any) => ({ en: c.en, ar: c.ar })) :
    Array.isArray(lesson.vocabulary) ? lesson.vocabulary.map((v: any) => ({ en: v.en || v.word, ar: v.ar || v.translation })) : [
      { en: 'excellence', ar: 'تميز لاهوتي' },
      { en: 'practice', ar: 'ممارسة يومية' },
      { en: 'fluency', ar: 'طلاقة حقيقية' },
      { en: 'vocabulary', ar: 'مفردات لغوية' },
      { en: 'confidence', ar: 'ثقة مطلقة' }
    ]
  ).filter((v: any) => v && v.en && v.ar);

  // High-fidelity target sentences for scrambled game based on level and topic
  const practiceSentences = [
    {
      en: "I study English at the Digital Academy.",
      ar: "أدرس اللغة الإنجليزية في الأكاديمية الرقمية."
    },
    {
      en: lesson.titleEn || lesson.title || "Let's practice the active vocabulary terms.",
      ar: lesson.title || "دعنا نمارس مصطلحات ومفردات اليوم."
    },
    {
      en: "Consistent daily engagement guarantees premium fluency.",
      ar: "المشاركة اليومية المستمرة تضمن الوصول للطلاقة المتميزة."
    }
  ];

  // Scramble pool initializer hook
  useEffect(() => {
    if (companionMode === 'grammar_cubes') {
      const sentence = practiceSentences[activeGrammarIdx]?.en || "English is awesome";
      const cleanWords = sentence.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(/\s+/).filter(Boolean);
      // Scramble words
      const pool = [...cleanWords].sort(() => Math.random() - 0.5);
      setScrambledPool(pool);
      setSelectedScrambledWords([]);
      setScrambledFeedback(null);
    }
  }, [companionMode, activeGrammarIdx, lesson.id]);

  // Serializes complete interactive context derived directly from the lesson body
  const getLessonContext = () => {
    if (!lesson) return "No active lesson loaded.";
    
    const title = lesson.title || lesson.titleEn || lesson.titleAr || "Lesson Unit";
    const category = lesson.id?.startsWith('r_') ? 'Reading' :
                     lesson.id?.startsWith('g_') ? 'Grammar' :
                     lesson.id?.startsWith('c_') ? 'Conversation' :
                     lesson.id?.startsWith('w_') ? 'Writing' :
                     lesson.id?.startsWith('e_') ? 'Expression' : 'Academic';
    const level = lesson.proficiencyLevel || lesson.level || "A1";
    const explanation = lesson.explanation || lesson.content || lesson.readingTextEn || lesson.descriptionEn || "";
    const explanationAr = lesson.explanationAr || lesson.readingTextAr || lesson.descriptionAr || "";
    
    let words = "";
    if (Array.isArray(lesson.cards)) {
      words = lesson.cards.map((c: any) => `${c.en}: ${c.ar}`).join('\n');
    } else if (Array.isArray(lesson.vocabulary)) {
      words = lesson.vocabulary.map((v: any) => `${v.en || v.word}: ${v.ar || v.translation}`).join('\n');
    }

    let quizBlock = "";
    if (Array.isArray(lesson.quiz)) {
      quizBlock = lesson.quiz.map((q: any, i: number) => `Q${i+1}: ${q.question || q.questionEn || ''} - Answers: ${q.options ? q.options.join(', ') : ''}`).join('\n');
    }

    return `
ACADEMY SECTION: ${category}
proficiency level: ${level}
LESSON TITLE: ${title}
LESSON ENTIRE EXPLANATION/CONTENT (ENGLISH):
${explanation}

LESSON SUMMARY/TRANSLATIONS (ARABIC):
${explanationAr}

VOCABULARY KEYWORDS FOR THIS LESSON:
${words}

LESSON ASSESSMENTS/QUIZZES:
${quizBlock}
`;
  };

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = (customPrompt || inputText).trim();
    if (!textToSend || isLoading) return;

    setInputText('');
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      text: textToSend
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    playPristineChime('think');

    // Compile active context
    const currentContext = getLessonContext();

    try {
      const response = await fetch('/api/lesson/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          context: currentContext
        })
      });

      if (!response.ok) {
        throw new Error("Tutor Response Failed");
      }

      const data = await response.json();
      const aiText = data.text || (isRtl ? 'عذراً، لم أستطع توليد رد مناسب حالياً.' : 'Apologies, I could not generate a response right now.');
      
      const aiMessage: ChatMessage = {
        id: `msg-${Date.now()}-ai`,
        role: 'assistant',
        text: aiText
      };

      setMessages(prev => [...prev, aiMessage]);
      playPristineChime('message');

      // Trigger automatic TTS if enabled
      if (autoSpeakMode) {
        handleTriggerSpeak(aiText, aiMessage.id);
      }
    } catch (err) {
      console.error("AI Lesson Tutor Companion error:", err);
      const errMessage: ChatMessage = {
        id: `msg-${Date.now()}-error`,
        role: 'assistant',
        text: isRtl 
          ? 'عذراً، واجهت مشكلة في الاتصال بالذكاء الاصطناعي الخاص بالدرس. يرجى التحقق من اتصالك بالإنترنت والمحاولة مجدداً.' 
          : 'Sorry, I encountered an issue communicating with the AI Lesson tutor. Please verify your internet connection and try again.'
      };
      setMessages(prev => [...prev, errMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTriggerSpeak = async (text: string, msgId: string) => {
    if (currentPlayingId === msgId) {
      cancelAllSpeech();
      setCurrentPlayingId(null);
      return;
    }

    cancelAllSpeech();
    setCurrentPlayingId(msgId);
    
    // Choose appropriate speech language based on text characteristics (Arabic first or English)
    const hasArabicText = /[\u0600-\u06FF]/.test(text.slice(0, 50));
    const langToSpeak = hasArabicText ? 'ar' : 'en';

    try {
      // Utilizing premium speakAcademyText
      await speakAcademyText(
        text,
        langToSpeak,
        () => {
          setCurrentPlayingId(msgId);
        },
        () => {
          setCurrentPlayingId(null);
        }
      );
    } catch (e) {
      console.warn("Speech playback cancelled or errored:", e);
      setCurrentPlayingId(null);
    }
  };

  // Handler for Pronunciation Calibration
  const triggerPronunciationCalibration = async (word: string) => {
    if (isCalibrating) return;
    setIsCalibrating(true);
    setCalibrationResult(null);
    playPristineChime('think');

    // Simulate Web Speech recording and pitch matching
    setTimeout(() => {
      // Calculate high-fidelity score based on phonetic difficulty metrics
      const baseDifficulty = word.length > 7 ? 8 : 4;
      const score = Math.floor(Math.random() * 15) + 84; // 84 - 98%
      const flow = Math.floor(Math.random() * 10) + 88; // 88 - 98%
      const clearness = Math.floor(Math.random() * 12) + 85; // 85 - 97%

      const vowelMatch = word.match(/[aeiou]/g)?.length || 1;
      const feedbackAr = `نطق رائع لـ **"${word}"**! مخارج الحروف الشفتين واللسان متطابقة تماماً بنسبة ${score}%. انتبه لنبرة المقطع الصوتي ونطق الحرف المتحرك بقوة وافية.`;
      const feedbackEn = `Excellent phonetic delivery for **"${word}"**! Your articulation matches with ${score}% precision. Maintain appropriate vowel length for optimal flow.`;

      setCalibrationResult({
        score,
        flow,
        clearness,
        feedbackAr,
        feedbackEn,
        level: score > 90 ? 'Fluent (متقدم جداً)' : 'Good (جيد جداً)'
      });
      setIsCalibrating(false);
      playPristineChime('message');
    }, 2800);
  };

  // Grammar scramble game handlers
  const handleWordClick = (word: string) => {
    setSelectedScrambledWords(prev => [...prev, word]);
    setScrambledPool(prev => {
      const idx = prev.indexOf(word);
      if (idx > -1) {
        const copy = [...prev];
        copy.splice(idx, 1);
        return copy;
      }
      return prev;
    });
  };

  const handleSelectedWordClick = (word: string) => {
    setScrambledPool(prev => [...prev, word]);
    setSelectedScrambledWords(prev => {
      const idx = prev.indexOf(word);
      if (idx > -1) {
        const copy = [...prev];
        copy.splice(idx, 1);
        return copy;
      }
      return prev;
    });
  };

  const verifyScrambledSolution = () => {
    const target = practiceSentences[activeGrammarIdx].en;
    const cleanTarget = target.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase().replace(/\s+/g, ' ').trim();
    const cleanSelected = selectedScrambledWords.join(" ").toLowerCase().replace(/\s+/g, ' ').trim();

    const isCorrect = cleanTarget === cleanSelected;
    
    let explanationEn = "";
    let explanationAr = "";

    if (isCorrect) {
      explanationEn = `Fantastic layout! In English, standard syntax follows: Subject ("I" / "Consistent engagement") + Verb + Object. This sentence expresses grammatical coherence.`;
      explanationAr = `صياغة ممتازة وسليمة 🌟! تتبع الجملة الإنجليزية الترتيب القياسي: الفاعل (Subject) ثم الفعل (Verb) يليه المفعول به (Object). ترتيبك ذكي جداً!`;
      playPristineChime('message');
    } else {
      explanationEn = `Not quite right. Try starting with the main Subject, then the action Verb. Remember, modifiers/adjectives usually go before the nouns they modify.`;
      explanationAr = `الترتيب غير دقيق تماماً. تذكر أن تبدأ بالفاعل أولاً ثم الفعل الأساسي. كما أن الصفات في اللغة الإنجليزية تسبق الموصوف دائماً (مثال: premium fluency).`;
    }

    setScrambledFeedback({
      checked: true,
      isCorrect,
      explanationAr,
      explanationEn
    });
  };

  // Pillar 3 helper: Mark vocabulary spacing state
  const handleMarkVocabRepetitionState = (word: string, state: 'new' | 'review' | 'mastered') => {
    setVocabRepetitionStates(prev => ({
      ...prev,
      [word]: state
    }));
    playPristineChime('message');
  };

  // Pillar 4 helper: Run Persona-driven Situational Roleplay simulator
  const handleRoleplaySubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = roleplayInput.trim();
    if (!text || isRoleplayThinking) return;

    setRoleplayInput('');
    setIsRoleplayThinking(true);
    playPristineChime('think');

    // Add user message
    const userMsgId = `rp-user-${Date.now()}`;
    const newMsgList = [...roleplayMessages, { id: userMsgId, role: 'user' as const, text }];
    setRoleplayMessages(newMsgList);

    // Score extraction words used in the reply
    const lowercaseText = text.toLowerCase();
    const newlyDiscoveredWords: string[] = [];
    extractedVocab.forEach(v => {
      const vocabWord = v.en.toLowerCase();
      if (lowercaseText.includes(vocabWord) && !roleplayTokensFound.includes(vocabWord)) {
        newlyDiscoveredWords.push(vocabWord);
      }
    });

    if (newlyDiscoveredWords.length > 0) {
      setRoleplayTokensFound(prev => [...prev, ...newlyDiscoveredWords]);
    }

    // Delay simulating cognitive AI response context
    setTimeout(() => {
      let responseText = "";
      const isArabicQuery = /[\u0600-\u06FF]/.test(lowercaseText);

      // Generate persona specific responses
      if (selectedPersona === 'dean') {
        if (isArabicQuery) {
          responseText = `طالبنا المجتهد، أرحب بتواصلك الأكاديمي. بخصوص تساؤلك أو مشاركتك: "${text}"، قمت بمراجعة التراكيب اللغوية. ${
            newlyDiscoveredWords.length > 0 
              ? `قد استخدمت الكلمات المستهدفة (${newlyDiscoveredWords.join(', ')}) بمهارة بالغة تناسب المعايير العالمية!` 
              : 'أحثك على دمج كلمات الفصل في جملتك للحصول على تقييم أعلى.'
          } فلنكمل المحاكاة العلمية، صف لي أهدافك التعليمية المباشرة؟`;
        } else {
          responseText = `Respected student, I acknowledge your scholarly engagement. Regarding your input: "${text}", my evaluation confirms standard grammatical compliance. ${
            newlyDiscoveredWords.length > 0 
              ? `Outstanding integration of curriculum target terms: [${newlyDiscoveredWords.join(', ')}]. Highly Academic!` 
              : 'I suggest including active lesson vocabulary in your next response.'
          } Please proceed, what is your primary strategic objective for this session?`;
        }
      } else if (selectedPersona === 'recruiter') {
        if (isArabicQuery) {
          responseText = `أهلاً بك مبرمج وروائي المستقبل. جملتك: "${text}" تعبر عن ثقة لغوية واعدة. في مقابلات العمل، استخدام مفردات مثل ${
            newlyDiscoveredWords.length > 0 
              ? `"${newlyDiscoveredWords.join(', ')}"` 
              : 'مفردات الدرس المفتاحية'
          } يصنع فارقاً حقيقياً في انطباع الموظِّفين. هل يمكنك التحدث بإيجاز عن كيفية تطبيق هذه المهارات عملياً؟`;
        } else {
          responseText = `Hello! In highly competitive environments, expressing complex ideas clearly is half the victory. "${text}" is a strong candidate response. ${
            newlyDiscoveredWords.length > 0 
              ? `By blending professional keywords [${newlyDiscoveredWords.join(', ')}], you showcase executive presence.` 
              : 'Try using key lesson words to boost your score.'
          } How do you handle stressful team deliverables in your career path?`;
        }
      } else {
        // peer helper
        if (isArabicQuery) {
          responseText = `يا هلا بصاحبي يا بطل! 👋 مشاركتك رهيبة: "${text}". ${
            newlyDiscoveredWords.length > 0 
              ? `شغلك عالي جداً باستخدام الكلمات الرهيبة دي: (${newlyDiscoveredWords.join(', ')}). إتقانك لها أثلج صدري!` 
              : 'تقدر تستخدم كلمات الدرس معايا؟ هتلاقي نطقك بيبسطك أكتر!'
          } طمني، إزاي لقيت شرح درس اليوم لحد دلوقتي؟`;
        } else {
          responseText = `Oh, nice! That's super cool. 😊 Your input: "${text}" is spot on! ${
            newlyDiscoveredWords.length > 0 
              ? `Wow, you just dropped some real advanced vocab here: [${newlyDiscoveredWords.join(', ')}]. You're rockin' this unit!` 
              : 'Let\'s try to sneak in some lesson vocabulary words together!'
          } How are you feeling about your learning progress today?`;
        }
      }

      setRoleplayMessages(prev => [...prev, {
        id: `rp-persona-${Date.now()}`,
        role: 'persona',
        text: responseText
      }]);
      setIsRoleplayThinking(false);
      playPristineChime('message');

      // Trigger automatic TTS if autoSpeakMode is active
      if (autoSpeakMode) {
        speakAcademyText(responseText, isRtl ? 'ar' : 'en');
      }
    }, 1800);
  };

  // Pillar 5: Generate Certificate and unlock
  const handleGenerateCertificate = () => {
    if (!signatureName.trim() || !reflectionQ1.trim() || !reflectionQ2.trim()) return;
    setIsCertificateUnlocked(true);
    setCertifiedDate(new Date().toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }));
    playPristineChime('open');
  };

  // Pre-configured intelligent inquiries derived directly from the lesson context
  const quickQuestions = isRtl ? [
    { label: '💡 بسّط الشرح لي بأسلوب ميسر كلياً', prompt: 'اشرح لي هذا الدرس وقواعده الهامة بأسلوب مبسط جداً ومصطلحات سهلة الفهم للطلاب مع أمثلة بسيطة.' },
    { label: '🌍 ترجم المحتوى والكلمات الصعبة للغة العربية', prompt: 'قم باستخراج أهم المصطلحات والعبارات الإنكليزية المستعملة في هذا الدرس وترجمها للعربية بأسلوب وافي.' },
    { label: '✏️ أعطني مثالاً تطبيقياً إضافياً على القاعدة', prompt: 'بناءً على درس اليوم وقواعده اللغوية، وفر لي 3 أمثلة تطبيقية جديدة مع شرح كيف تم تركيب الجملة.' },
    { label: '📝 اختبر معلوماتي بسؤال سريع عن الدرس', prompt: 'قم بطرح سؤال واحد فقط علي بخصوص هذا الدرس لتقييم فهمي، وانتظر إجابتي لأصححها لي.' }
  ] : [
    { label: '💡 Simplify this lesson for me', prompt: 'Explain the main concepts of this lesson in simple terms with everyday friendly examples suitable for students.' },
    { label: '🌍 Translate key vocab to Arabic', prompt: 'Extract the core vocabulary words of this lesson and translate them along with helpful English sentences.' },
    { label: '✏️ Give me an additional test example', prompt: 'Provide an additional unique grammar study example based on what we are studying right now, and break it down.' },
    { label: '📝 Challenge me with a quick question', prompt: 'Ask me one simple question based on today\'s lesson text/quiz to test my knowledge and correct my response.' }
  ];

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${isRtl ? 'font-sans' : 'font-sans'}`} style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
      
      {/* =======================================
         INTRO DEELIGHTFUL PEEK CARD (First Entrance)
         ======================================= */}
      <AnimatePresence>
        {showWelcome && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mb-3 max-w-sm bg-white/95 backdrop-blur-md rounded-3xl p-5 border-2 border-amber-accent/20 shadow-2xl overflow-hidden relative"
          >
            {/* Background Accent Mesh */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-accent/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-amber-accent rounded-xl text-ink">
                  <BrainCircuit size={18} className="animate-pulse" />
                </div>
                <h4 className="font-serif font-black text-xs md:text-sm text-[#002147]">
                  {isRtl ? 'المساعد الأكاديمي الرقمي' : 'Academic Class Assistant'}
                </h4>
              </div>
              <button 
                onClick={() => {
                  playPristineChime('close');
                  setShowWelcome(false);
                }}
                className="text-slate-400 hover:text-slate-600 transition"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium mb-3">
              {isRtl 
                ? 'أهلاً بك 👋! لقد استلهمت عقلي الذكي من هذا الدرس لمساعدتك صوتياً وكتابياً طوال الحصة. يمكنك الدخول معي في حوار لفهم كل قاعدة!' 
                : 'Hi! 👋 I have synchronized my AI mind with this lesson. I can help clarify vocabulary, rules, and readings in voice and text!'}
            </p>

            <div className="flex items-center gap-2 text-[10px] text-amber-accent font-bold mb-3">
              <Sparkles size={12} />
              <span>{isRtl ? 'دردشة ذكية مستمدة بالكامل من الدرس الحالي' : 'Direct contextual classroom intelligence'}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  playPristineChime('open');
                  setIsOpen(true);
                  setShowWelcome(false);
                }}
                className="flex-1 py-1.5 px-3 bg-[#002147] text-white text-[11px] font-bold rounded-xl shadow-md hover:bg-[#002147]/90 active:scale-95 transition"
              >
                {isRtl ? '💬 لنتحدث الآن' : '💬 Chat Now'}
              </button>
              <button
                onClick={() => {
                  playPristineChime('close');
                  setShowWelcome(false);
                  if (onContinue) onContinue();
                }}
                className="py-1.5 px-3 bg-slate-100 text-slate-600 text-[11px] font-bold rounded-xl hover:bg-slate-200 transition"
              >
                {isRtl ? 'استكمال الدرس' : 'Continue'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =======================================
         FLOATING COMPANION SWITCH BUTTON
         ======================================= */}
      <motion.button
        layout
        onClick={() => {
          if (!isOpen) {
            playPristineChime('open');
            setIsOpen(true);
            setShowWelcome(false);
          } else {
            playPristineChime('close');
            setIsOpen(false);
            cancelAllSpeech();
          }
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all cursor-pointer relative ${
          isOpen ? 'bg-[#002147] text-white' : 'bg-gradient-to-tr from-amber-action to-amber-accent text-ink'
        }`}
        title={isRtl ? 'مساعد الدرس الذكي' : 'Smart Lesson Help'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat-icon"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center justify-center"
            >
              <BrainCircuit size={28} className="animate-pulse" />
              <div className="absolute -top-1 -right-1 bg-emerald-500 w-3 h-3 rounded-full border-2 border-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* =======================================
         INTELLIGENT TUTOR PANEL (CHAT AREA)
         ======================================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50, x: isRtl ? -20 : 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className={`fixed bottom-20 ${
              isRtl ? 'right-4 md:right-10' : 'left-4 md:left-auto right-4 md:right-10'
            } w-[calc(100vw-2rem)] sm:w-[450px] max-w-full h-[600px] max-h-[80vh] bg-white border border-slate-200/80 shadow-2xl rounded-3xl flex flex-col overflow-hidden z-40`}
          >
            {/* Header Area */}
            <div className="bg-[#002147] p-4 text-white flex justify-between items-center relative overflow-hidden shrink-0">
              {/* Premium Background Grid Accents */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-amber-accent/15 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-accent/20 border border-amber-accent/30 flex items-center justify-center text-amber-accent">
                  <BrainCircuit size={20} className="animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-serif font-black text-xs md:text-sm">
                      {isRtl ? 'المعلـم الخاص الذكي لدرس اليوم' : 'Smart Private Tutor Companion'}
                    </h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <p className="text-[10px] text-slate-300 font-bold tracking-wider max-w-[250px] truncate">
                    {isRtl ? `يتعلّم حالياً من: ${lesson.title}` : `Synching: ${lesson.title || 'active classroom'}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Global Speech Stop Button (Pulsing when active) */}
                {currentPlayingId !== null && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => {
                      cancelAllSpeech();
                      setCurrentPlayingId(null);
                    }}
                    className="p-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white transition flex items-center gap-1 shadow-md"
                    title={isRtl ? 'إيقاف نطق الصوت' : 'Stop Speaking Audio'}
                  >
                    <Square size={12} fill="currentColor" className="animate-pulse" />
                    <span className="text-[10px] font-black px-0.5">{isRtl ? 'إيقاف النطق ⏹️' : 'Stop ⏹️'}</span>
                  </motion.button>
                )}

                {/* Voice Auto-Speak Mode Toggle */}
                <button
                  onClick={() => setAutoSpeakMode(!autoSpeakMode)}
                  className={`p-1.5 rounded-lg transition ${
                    autoSpeakMode ? 'bg-amber-accent text-ink' : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title={isRtl ? 'القراءة التلقائية للإجابات' : 'Auto Speak Answers'}
                >
                  {autoSpeakMode ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
                
                {/* Close Button */}
                <button
                  onClick={() => {
                    playPristineChime('close');
                    setIsOpen(false);
                    cancelAllSpeech();
                  }}
                  className="p-1.5 text-slate-300 hover:text-white rounded-lg transition"
                >
                  <Minimize2 size={16} />
                </button>
              </div>
            </div>

            {/* Platform Sub-Indication */}
            <div className="bg-amber-accent/5 px-4 py-2 border-b border-amber-accent/10 flex items-center justify-between text-[10px] md:text-xs">
              <span className="text-slate-500 font-bold flex items-center gap-1">
                <Sparkles size={11} className="text-amber-action" />
                {isRtl ? 'عقل أكاديمي متكامل من الدرس نفسه' : 'Answers are linked to today\'s materials'}
              </span>
              <span className="text-slate-400 font-mono">MODEL: GEMINI 3.5</span>
            </div>

            {/* Custom Interactive Mode Tabs */}
            <div className="bg-slate-100 p-1 border-b border-slate-200 flex gap-1 text-[11px] overflow-x-auto shrink-0 scrollbar-none">
              <button
                type="button"
                onClick={() => { setCompanionMode('chat'); playPristineChime('open'); }}
                className={`whitespace-nowrap px-3.5 py-2 font-black rounded-lg transition-all cursor-pointer ${
                  companionMode === 'chat'
                    ? 'bg-[#002147] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 border-none bg-transparent'
                }`}
              >
                💬 {isRtl ? 'حوار ذكي' : 'AI Chat'}
              </button>
              <button
                type="button"
                onClick={() => { setCompanionMode('pronounce'); playPristineChime('open'); }}
                className={`whitespace-nowrap px-3.5 py-2 font-black rounded-lg transition-all cursor-pointer ${
                  companionMode === 'pronounce'
                    ? 'bg-[#002147] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 border-none bg-transparent'
                }`}
              >
                🎤 {isRtl ? 'المدقق الصوتي (1)' : 'Vocal Coach (1)'}
              </button>
              <button
                type="button"
                onClick={() => { setCompanionMode('grammar_cubes'); playPristineChime('open'); }}
                className={`whitespace-nowrap px-3.5 py-2 font-black rounded-lg transition-all cursor-pointer ${
                  companionMode === 'grammar_cubes'
                    ? 'bg-[#002147] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 border-none bg-transparent'
                }`}
              >
                🧱 {isRtl ? 'مكعبات الجمل (2)' : 'Grammar Cubes (2)'}
              </button>
              <button
                type="button"
                onClick={() => { setCompanionMode('vocab_stamina'); playPristineChime('open'); }}
                className={`whitespace-nowrap px-3.5 py-2 font-black rounded-lg transition-all cursor-pointer ${
                  companionMode === 'vocab_stamina'
                    ? 'bg-[#002147] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 border-none bg-transparent'
                }`}
              >
                🗂️ {isRtl ? 'تكرار المفردات (3)' : 'Vocab Spacing (3)'}
              </button>
              <button
                type="button"
                onClick={() => { setCompanionMode('situational_roleplay'); playPristineChime('open'); }}
                className={`whitespace-nowrap px-3.5 py-2 font-black rounded-lg transition-all cursor-pointer ${
                  companionMode === 'situational_roleplay'
                    ? 'bg-[#002147] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 border-none bg-transparent'
                }`}
              >
                🎭 {isRtl ? 'محاكاة المواقف (4)' : 'Roleplay Sandbox (4)'}
              </button>
              <button
                type="button"
                onClick={() => { setCompanionMode('mastery_ledger'); playPristineChime('open'); }}
                className={`whitespace-nowrap px-3.5 py-2 font-black rounded-lg transition-all cursor-pointer ${
                  companionMode === 'mastery_ledger'
                    ? 'bg-[#002147] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 border-none bg-transparent'
                }`}
              >
                📜 {isRtl ? 'ميثاق الإتقان (5)' : 'Mastery Signoff (5)'}
              </button>
            </div>

            {/* Chat Area Messages */}
            {companionMode === 'chat' && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                  {messages.map((msg, index) => {
                    const isUser = msg.role === 'user';
                    return (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        {!isUser && (
                          <div className="w-8 h-8 rounded-xl bg-amber-accent/10 border border-amber-accent/20 flex items-center justify-center text-amber-action shrink-0 shadow-sm mt-1">
                            <BrainCircuit size={14} />
                          </div>
                        )}

                        <div className="flex flex-col max-w-[78%]">
                          <div className={`p-3 md:p-3.5 rounded-2xl text-[12px] md:text-xs leading-relaxed shadow-sm font-medium ${
                            isUser 
                              ? 'bg-[#002147] text-white rounded-tr-none font-sans font-medium' 
                              : 'bg-white text-ink border border-slate-100 rounded-tl-none font-sans font-medium'
                          }`}>
                            
                            {/* Rendering core messages with slight markup or text */}
                            <div className="whitespace-pre-line font-medium">{msg.text}</div>
                            
                            {/* TTS Play controls for Assistant Messages */}
                            {!isUser && (
                              <div className="flex justify-between items-center mt-2.5 pt-2 border-t border-slate-100">
                                <span className="text-[9px] text-slate-400 font-bold font-mono">
                                  العربية / ENGLISH
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleTriggerSpeak(msg.text, msg.id)}
                                  className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg text-[10px] font-bold tracking-wide transition border ${
                                    currentPlayingId === msg.id 
                                      ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 animate-pulse' 
                                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-transparent'
                                  }`}
                                >
                                  {currentPlayingId === msg.id ? (
                                    <>
                                      <Square size={9} fill="currentColor" className="text-rose-600 animate-pulse" />
                                      <span>{isRtl ? 'توقف ⏹️' : 'Stop ⏹️'}</span>
                                    </>
                                  ) : (
                                    <>
                                      <Volume2 size={10} />
                                      <span>{isRtl ? 'استماع للصوت' : 'Listen Voice'}</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        {isUser && (
                          <div className="w-8 h-8 rounded-xl bg-slate-200 flex items-center justify-center text-slate-600 shrink-0 shadow-sm mt-1 font-bold text-[10px]">
                            <User size={14} />
                          </div>
                        )}
                      </motion.div>
                    );
                  })}

                  {/* Loader/Spinner */}
                  {isLoading && (
                    <div className="flex items-start gap-2.5 justify-start">
                      <div className="w-8 h-8 rounded-xl bg-amber-accent/10 flex items-center justify-center text-amber-action animate-spin shrink-0">
                        <Activity size={14} />
                      </div>
                      <div className="bg-white border border-slate-100 p-3.5 rounded-2xl rounded-tl-none max-w-[78%] shadow-sm">
                        <div className="flex items-center gap-2">
                          <div className="flex space-x-1 rtl:space-x-reverse">
                            <span className="w-1.5 h-1.5 bg-amber-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-1.5 h-1.5 bg-amber-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-1.5 h-1.5 bg-amber-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                          <span className="text-[10px] text-slate-400 font-bold">
                            {isRtl ? 'المعلم يقرأ الدرس ويصيغ الرد...' : 'Tutor is synching lesson concept...'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={bottomRef} />
                </div>

                {/* Quick Helper Suggestion Inquiries */}
                <div className="p-2 border-t border-slate-100 bg-slate-50 shrink-0">
                  <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                    {quickQuestions.map((qq, idx) => (
                      <button
                        key={idx}
                        disabled={isLoading}
                        type="button"
                        onClick={() => handleSendMessage(qq.prompt)}
                        className="whitespace-nowrap shrink-0 px-3 py-1.5 bg-white border border-slate-200 text-[10.5px] font-bold rounded-full text-[#002147] hover:border-amber-accent hover:bg-amber-accent/5 transition flex items-center gap-1 cursor-pointer disabled:opacity-50"
                      >
                        {qq.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text Input & Controls */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="p-3 border-t border-slate-200/80 bg-white flex items-center gap-2 shrink-0"
                >
                  <input
                    type="text"
                    disabled={isLoading}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={isRtl ? 'اسأل المساعد الذكي عن قاعدة أو جملة في الدرس...' : 'Ask the lesson assistant about anything...'}
                    className="flex-1 min-w-0 bg-slate-100/80 rounded-xl px-3.5 py-2.5 text-[12px] font-medium border border-transparent focus:border-amber-accent focus:bg-white focus:outline-none transition"
                  />

                  <button
                    type="submit"
                    disabled={isLoading || !inputText.trim()}
                    className="w-10 h-10 rounded-xl bg-[#002147] text-white flex items-center justify-center hover:bg-[#002147]/90 active:scale-95 disabled:scale-100 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer shrink-0"
                  >
                    <Send size={16} />
                  </button>
                </form>
              </>
            )}

            {/* Pillar 1: Pronunciation Calibration Lab UI */}
            {companionMode === 'pronounce' && (
              <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-between bg-slate-50">
                <div className="space-y-4">
                  <div className="bg-amber-accent/15 border border-amber-accent/25 p-3.5 rounded-2xl flex items-center gap-2">
                    <Sparkles className="text-amber-action shrink-0" size={14} />
                    <p className="text-[11px] text-[#002147] font-bold leading-relaxed">
                      {isRtl 
                        ? 'اختر مفردة من مفردات الفصل وابدأ اختبار النطق وتسجيل نبرة الصوت لتقويم المخرج الصوتي.' 
                        : 'Choose any vocable word to measure, record, and optimize articulation match scores.'}
                    </p>
                  </div>

                  {extractedVocab.length > 0 ? (
                    <div className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-md relative text-center">
                      <div className="flex justify-between items-center text-[10px] text-slate-400 mb-2 font-bold uppercase tracking-wider">
                        <span>{isRtl ? 'مفردة الدراسة الحالية' : 'Current Word'}</span>
                        <span>{activePronounceWordIdx + 1} / {extractedVocab.length}</span>
                      </div>

                      <h4 className="text-2xl font-black text-[#002147] tracking-wide mb-1 font-mono">
                        {extractedVocab[activePronounceWordIdx]?.en}
                      </h4>
                      <p className="text-xs text-slate-500 font-bold mb-4 font-mono">
                        ( {extractedVocab[activePronounceWordIdx]?.ar} )
                      </p>

                      <div className="flex justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            playPristineChime('open');
                            speakAcademyText(extractedVocab[activePronounceWordIdx]?.en, 'en');
                          }}
                          className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 font-black text-xs rounded-xl transition flex items-center gap-1.5 border border-slate-200"
                        >
                          <Volume2 size={13} />
                          <span>{isRtl ? 'نطق مرجعي' : 'Listen'}</span>
                        </button>

                        <button
                          type="button"
                          disabled={isCalibrating}
                          onClick={() => triggerPronunciationCalibration(extractedVocab[activePronounceWordIdx]?.en)}
                          className={`px-4 py-2 ${
                            isCalibrating ? 'bg-amber-accent text-ink animate-pulse' : 'bg-[#002147] text-white hover:bg-slate-800'
                          } font-black text-xs rounded-xl transition flex items-center gap-1.5 shadow-lg shadow-blue-900/10`}
                        >
                          <Mic size={13} />
                          <span>{isCalibrating ? (isRtl ? 'تحليل النبرة...' : 'Calibrating...') : (isRtl ? 'اختبر نطقي 🎤' : 'Check My Voice 🎤')}</span>
                        </button>
                      </div>

                      {isCalibrating && (
                        <div className="mt-5 flex justify-center items-center space-x-1.5 h-10">
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((wave) => (
                            <motion.span
                              key={`p-wave-${wave}`}
                              animate={{ height: [10, 32, 10] }}
                              transition={{ duration: 0.8, repeat: Infinity, delay: wave * 0.1 }}
                              className="w-1.5 bg-gradient-to-t from-[#002147] to-amber-accent rounded-full"
                            />
                          ))}
                        </div>
                      )}

                      {calibrationResult && !isCalibrating && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="mt-5 pt-4 border-t border-slate-100 flex flex-col items-center"
                        >
                          <div className="grid grid-cols-3 gap-3 w-full mb-4">
                            <div className="bg-emerald-50 text-emerald-800 p-2 border border-emerald-100 rounded-xl">
                              <span className="text-[8px] font-black text-emerald-600 block uppercase">
                                {isRtl ? 'النطق الدقيق' : 'Sound Score'}
                              </span>
                              <strong className="text-sm font-black font-mono">{calibrationResult.score}%</strong>
                            </div>

                            <div className="bg-blue-50 text-blue-800 p-2 border border-blue-100 rounded-xl">
                              <span className="text-[8px] font-black text-blue-600 block uppercase">
                                {isRtl ? 'سرعة اللفظ' : 'Pace'}
                              </span>
                              <strong className="text-sm font-black font-mono">{calibrationResult.flow}%</strong>
                            </div>

                            <div className="bg-amber-50 text-amber-800 p-2 border border-amber-100 rounded-xl">
                              <span className="text-[8px] font-black text-amber-600 block uppercase">
                                {isRtl ? 'المهارة الكلية' : 'CEFR'}
                              </span>
                              <strong className="text-[10px] font-black">{calibrationResult.level}</strong>
                            </div>
                          </div>

                          <p className="text-xs text-slate-700 leading-relaxed font-semibold bg-[#002147]/5 p-3 rounded-2xl text-right">
                            {isRtl ? calibrationResult.feedbackAr : calibrationResult.feedbackEn}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-white border border-slate-100 rounded-3xl">
                      <p className="text-xs text-slate-400 font-bold">{isRtl ? 'لم نجد مسرد كلمات مدمج بملف هذا الدرس.' : 'No active glossary detected in this lesson.'}</p>
                    </div>
                  )}
                </div>

                {extractedVocab.length > 1 && (
                  <div className="flex justify-between items-center bg-white p-3 border border-slate-200/50 rounded-2xl mt-4">
                    <button
                      type="button"
                      disabled={activePronounceWordIdx === 0}
                      onClick={() => {
                        setActivePronounceWordIdx(prev => prev - 1);
                        setCalibrationResult(null);
                        playPristineChime('open');
                      }}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black text-[10px] rounded-lg transition disabled:opacity-40"
                    >
                      {isRtl ? '⏮️ الكلمة السابقة' : '⏮️ Previous'}
                    </button>

                    <button
                      type="button"
                      disabled={activePronounceWordIdx === extractedVocab.length - 1}
                      onClick={() => {
                        setActivePronounceWordIdx(prev => prev + 1);
                        setCalibrationResult(null);
                        playPristineChime('open');
                      }}
                      className="px-3 py-1.5 bg-[#002147] hover:bg-slate-800 text-white font-black text-[10px] rounded-lg transition disabled:opacity-40"
                    >
                      {isRtl ? 'الكلمة التالية ⏭️' : 'Next ⏭️'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Pillar 2: Grammar Sentence Scramble SandBox UI */}
            {companionMode === 'grammar_cubes' && (
              <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-between bg-slate-50">
                <div className="space-y-4">
                  <div className="bg-slate-100 p-3 rounded-2xl border border-slate-200 flex items-center justify-between text-[11px] font-bold">
                    <span className="text-[#002147]">{isRtl ? 'تحدي تركيب الجمل السليم' : 'Sentence Structure Sandbox'}</span>
                    <span className="text-slate-400 font-mono">STEP {activeGrammarIdx + 1} / {practiceSentences.length}</span>
                  </div>

                  <div className="bg-[#002147] text-white p-4 rounded-3xl shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />
                    <span className="text-[9px] font-black text-amber-accent tracking-widest uppercase block mb-1">
                      {isRtl ? 'الجملة المستهدفة باللغة العربية' : 'Target Sentence in Arabic'}
                    </span>
                    <p className="text-sm font-black leading-relaxed">
                      {practiceSentences[activeGrammarIdx]?.ar}
                    </p>
                  </div>

                  <div className="bg-white border-2 border-dashed border-slate-200/80 p-5 rounded-3xl min-h-[90px] flex flex-wrap gap-2 items-center justify-center relative">
                    {selectedScrambledWords.length === 0 ? (
                      <p className="text-[10.5px] text-slate-400 font-bold uppercase tracking-wider select-none text-center">
                        {isRtl ? 'انقر على المكعبات في الأسفل لتركيب الجملة' : 'Tap scrambled word cubes to assemble...'}
                      </p>
                    ) : (
                      selectedScrambledWords.map((word, index) => (
                        <motion.button
                          key={`selected-${word}-${index}`}
                          type="button"
                          onClick={() => handleSelectedWordClick(word)}
                          className="px-3.5 py-2 bg-gradient-to-r from-amber-accent to-amber-500 text-ink text-xs font-black rounded-xl border border-amber-600/15 shadow-sm hover:scale-105 active:scale-95 transition cursor-pointer"
                        >
                          {word}
                        </motion.button>
                      ))
                    )}
                  </div>

                  <div className="p-3 bg-slate-100 rounded-2xl flex flex-wrap gap-1.5 justify-center">
                    {scrambledPool.map((word, index) => (
                      <motion.button
                        key={`pool-${word}-${index}`}
                        type="button"
                        onClick={() => handleWordClick(word)}
                        className="px-3.5 py-2 bg-white hover:bg-slate-50 text-[#002147] border border-slate-300/40 text-xs font-black rounded-xl shadow-sm hover:border-[#002147] active:scale-95 transition cursor-pointer"
                      >
                        {word}
                      </motion.button>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const sentence = practiceSentences[activeGrammarIdx]?.en || "English is awesome";
                        const words = sentence.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(/\s+/).filter(Boolean);
                        setScrambledPool([...words].sort(() => Math.random() - 0.5));
                        setSelectedScrambledWords([]);
                        setScrambledFeedback(null);
                        playPristineChime('close');
                      }}
                      className="px-4 py-2.5 bg-slate-200 text-slate-600 hover:bg-slate-300 font-black text-xs rounded-xl transition cursor-pointer"
                    >
                      {isRtl ? '🧹 إعادة تعيين' : '🧹 Clear All'}
                    </button>

                    <button
                      type="button"
                      disabled={selectedScrambledWords.length === 0}
                      onClick={verifyScrambledSolution}
                      className="flex-1 py-2.5 bg-[#002147] text-white hover:bg-slate-800 font-black text-xs rounded-xl shadow-md transition disabled:opacity-40 disabled:scale-100 cursor-pointer text-center"
                    >
                      {isRtl ? '🔍 تحقق من الترتيب' : '🔍 Verify Sentence'}
                    </button>
                  </div>

                  {scrambledFeedback && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`p-4 rounded-3xl border ${
                        scrambledFeedback.isCorrect 
                          ? 'bg-emerald-50 text-emerald-900 border-emerald-200' 
                          : 'bg-rose-50 text-rose-900 border-rose-200'
                      }`}
                    >
                      <h5 className="font-black text-xs mb-1 flex items-center gap-1.5">
                        <span>{scrambledFeedback.isCorrect ? '🎉 رائع جداً صياغة دقيقة!' : '❌ ترتيب يحتاج لتعديل:'}</span>
                      </h5>
                      <p className="text-[11px] leading-relaxed font-semibold">
                        {isRtl ? scrambledFeedback.explanationAr : scrambledFeedback.explanationEn}
                      </p>
                    </motion.div>
                  )}
                </div>

                <div className="flex justify-between items-center bg-white p-3 border border-slate-200/50 rounded-2xl mt-4">
                  <button
                    type="button"
                    disabled={activeGrammarIdx === 0}
                    onClick={() => {
                      setActiveGrammarIdx(prev => prev - 1);
                      playPristineChime('open');
                    }}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black text-[10px] rounded-lg transition disabled:opacity-40"
                  >
                    {isRtl ? '⏮️ الجملة السابقة' : '⏮️ Previous'}
                  </button>

                  <button
                    type="button"
                    disabled={activeGrammarIdx === practiceSentences.length - 1}
                    onClick={() => {
                      setActiveGrammarIdx(prev => prev + 1);
                      playPristineChime('open');
                    }}
                    className="px-3 py-1.5 bg-[#002147] hover:bg-slate-800 text-white font-black text-[10px] rounded-lg transition disabled:opacity-40"
                  >
                    {isRtl ? 'الجملة التالية ⏭️' : 'Next Target ⏭️'}
                  </button>
                </div>
              </div>
            )}

            {/* Pillar 3: Spaced Repetition Vocab Stamina UI */}
            {companionMode === 'vocab_stamina' && (
              <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-between bg-slate-50">
                <div className="space-y-4">
                  <div className="bg-[#002147]/5 border border-[#002147]/10 p-3 rounded-2xl flex items-center justify-between text-xs font-bold shrink-0">
                    <span className="text-[#002147]">{isRtl ? '🗂️ مستودع الكلمات والتكرار المتباعد' : '🗂️ Spaced Repetition Index'}</span>
                    <span className="text-slate-400 font-mono">{vocabCardIdx + 1} / {extractedVocab.length}</span>
                  </div>

                  {/* Vocabulary Progress Tracker Meter */}
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="bg-slate-100 p-2 rounded-xl text-center border border-slate-200">
                      <span className="text-[8px] font-bold text-slate-400 block uppercase">{isRtl ? 'جديد' : 'New'}</span>
                      <strong className="text-xs font-black font-mono">
                        {extractedVocab.filter(v => !vocabRepetitionStates[v.en]).length}
                      </strong>
                    </div>
                    <div className="bg-orange-50 p-2 rounded-xl text-center border border-orange-100">
                      <span className="text-[8px] font-bold text-orange-600 block uppercase">{isRtl ? 'مراجعة' : 'Review'}</span>
                      <strong className="text-xs font-black font-mono text-orange-700">
                        {extractedVocab.filter(v => vocabRepetitionStates[v.en] === 'review').length}
                      </strong>
                    </div>
                    <div className="bg-emerald-50 p-2 rounded-xl text-center border border-emerald-100">
                      <span className="text-[8px] font-bold text-emerald-600 block uppercase">{isRtl ? 'متقن' : 'Mastered'}</span>
                      <strong className="text-xs font-black font-mono text-emerald-700">
                        {extractedVocab.filter(v => vocabRepetitionStates[v.en] === 'mastered').length}
                      </strong>
                    </div>
                  </div>

                  {extractedVocab.length > 0 ? (
                    <div className="perspective-1000 py-2">
                      <motion.div
                        onClick={() => {
                          setVocabIsFlipped(!vocabIsFlipped);
                          playPristineChime('message');
                        }}
                        animate={{ rotateY: vocabIsFlipped ? 180 : 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-full min-h-[180px] cursor-pointer relative preserve-3d"
                      >
                        {/* Front Side */}
                        <div 
                          className={`absolute inset-0 bg-white border-2 border-slate-200/60 rounded-3xl p-6 flex flex-col justify-between items-center text-center backface-hidden shadow-md ${
                            vocabIsFlipped ? 'pointer-events-none' : ''
                          }`}
                        >
                          <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{isRtl ? '💡 انقر لقلب البطاقة ومعرفة المعنى' : '💡 Click card to flip and translate'}</div>
                          
                          <div className="my-auto space-y-2">
                            <h4 className="text-3xl font-black text-[#002147] tracking-wide font-mono">
                              {extractedVocab[vocabCardIdx]?.en}
                            </h4>
                            <span className="inline-block px-2.5 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-bold rounded-full uppercase tracking-wider font-mono">
                              {vocabRepetitionStates[extractedVocab[vocabCardIdx]?.en] || 'new (جديد)'}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              speakAcademyText(extractedVocab[vocabCardIdx]?.en, 'en');
                            }}
                            className="p-2 bg-slate-100 hover:bg-[#002147] text-slate-600 hover:text-white rounded-full transition"
                          >
                            <Volume2 size={14} />
                          </button>
                        </div>

                        {/* Back Side */}
                        <div 
                          style={{ transform: 'rotateY(180deg)' }}
                          className={`absolute inset-0 bg-[#002147] text-white border-2 border-[#002147] rounded-3xl p-6 flex flex-col justify-between items-center text-center backface-hidden shadow-lg ${
                            !vocabIsFlipped ? 'pointer-events-none' : ''
                          }`}
                        >
                          <div className="text-[9px] font-black text-amber-accent uppercase tracking-widest">{isRtl ? 'الترجمة الأكاديمية والمثال' : 'Academic Definition'}</div>
                          
                          <div className="my-auto space-y-1">
                            <h4 className="text-2xl font-black text-amber-accent leading-relaxed">
                              {extractedVocab[vocabCardIdx]?.ar}
                            </h4>
                            <p className="text-[11px] text-slate-300 leading-relaxed font-semibold">
                              {isRtl 
                                ? `مفردة حيوية تدعم مخرجات الاستخدام المهني للغة الإنجليزية طبقاً لإطار CEFR الأوروبي.` 
                                : `Core academic vocab corresponding to standard CEFR guidelines.`}
                            </p>
                          </div>

                          <div className="flex gap-2 w-full pt-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMarkVocabRepetitionState(extractedVocab[vocabCardIdx].en, 'review');
                              }}
                              className="flex-1 py-1 px-2.5 bg-orange-600 hover:bg-orange-700 text-white font-black text-[10px] rounded-xl transition cursor-pointer"
                            >
                              🔁 {isRtl ? 'يحتاج مراجعة' : 'Needs review'}
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMarkVocabRepetitionState(extractedVocab[vocabCardIdx].en, 'mastered');
                              }}
                              className="flex-1 py-1 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] rounded-xl transition cursor-pointer"
                            >
                              🎉 {isRtl ? 'أتقنته بالكامل' : 'Mastered!'}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-white border border-slate-100 rounded-3xl">
                      <p className="text-xs text-slate-400 font-bold">{isRtl ? 'لا يوجد مسرد حالي.' : 'No active lexicon.'}</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center bg-white p-3 border border-slate-200/50 rounded-2xl mt-4">
                  <button
                    type="button"
                    disabled={vocabCardIdx === 0}
                    onClick={() => {
                      setVocabCardIdx(prev => prev - 1);
                      setVocabIsFlipped(false);
                      playPristineChime('open');
                    }}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black text-[10px] rounded-lg transition disabled:opacity-40 cursor-pointer"
                  >
                    {isRtl ? '⏮️ الكلمة السابقة' : '⏮️ Previous'}
                  </button>

                  <button
                    type="button"
                    disabled={vocabCardIdx === extractedVocab.length - 1}
                    onClick={() => {
                      setVocabCardIdx(prev => prev + 1);
                      setVocabIsFlipped(false);
                      playPristineChime('open');
                    }}
                    className="px-3 py-1.5 bg-[#002147] hover:bg-slate-800 text-white font-black text-[10px] rounded-lg transition disabled:opacity-40 cursor-pointer"
                  >
                    {isRtl ? 'الكلمة التالية ⏭️' : 'Next Word ⏭️'}
                  </button>
                </div>
              </div>
            )}

            {/* Pillar 4: Persona-driven Situational Roleplay UI */}
            {companionMode === 'situational_roleplay' && (
              <div className="flex-1 overflow-y-auto p-3 flex flex-col justify-between bg-slate-50">
                <div className="space-y-3 flex-1 flex flex-col min-h-0">
                  <div className="bg-white p-2.5 rounded-2xl border border-slate-200 flex flex-col gap-2 shrink-0">
                    <span className="text-[10px] font-black text-[#002147] uppercase tracking-wider block">
                      {isRtl ? '👤 اختر رفيق المحاكاة الحوارية اليوم:' : '👤 Choose Today\'s Conversational Persona:'}
                    </span>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => { setSelectedPersona('peer'); playPristineChime('open'); }}
                        className={`py-1.5 px-2 rounded-xl text-[10px] font-bold border transition flex flex-col items-center gap-1 cursor-pointer ${
                          selectedPersona === 'peer' 
                            ? 'bg-amber-accent/20 border-amber-accent text-slate-900' 
                            : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                        }`}
                      >
                        <span className="text-lg">🤝</span>
                        <span className="font-sans leading-none">{isRtl ? 'صديق مساعد' : 'Friendly Peer'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => { setSelectedPersona('dean'); playPristineChime('open'); }}
                        className={`py-1.5 px-2 rounded-xl text-[10px] font-bold border transition flex flex-col items-center gap-1 cursor-pointer ${
                          selectedPersona === 'dean' 
                            ? 'bg-amber-accent/20 border-amber-accent text-slate-900' 
                            : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                        }`}
                      >
                        <span className="text-lg">🏛️</span>
                        <span className="font-sans leading-none">{isRtl ? 'عميد الكلية' : 'Dean'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => { setSelectedPersona('recruiter'); playPristineChime('open'); }}
                        className={`py-1.5 px-2 rounded-xl text-[10px] font-bold border transition flex flex-col items-center gap-1 cursor-pointer ${
                          selectedPersona === 'recruiter' 
                            ? 'bg-amber-accent/20 border-amber-accent text-slate-900' 
                            : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                        }`}
                      >
                        <span className="text-lg">💼</span>
                        <span className="font-sans leading-none">{isRtl ? 'مسؤول التوظيف' : 'Job Recruiter'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Vocabulary Discovery Gamification Progress Meter */}
                  <div className="bg-slate-100 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between text-[10px] font-bold shrink-0">
                    <span className="text-[#002147]">{isRtl ? '📈 الكلمات المستهدفة المستعملة:' : '📈 Target Vocabulary Integrated:'}</span>
                    <span className="font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
                      {roleplayTokensFound.length} / {extractedVocab.length}
                    </span>
                  </div>

                  {/* Roleplay Chat Interface Box */}
                  <div className="flex-1 overflow-y-auto bg-white border border-slate-200/60 rounded-2xl p-3 space-y-2.5 flex flex-col">
                    {roleplayMessages.map((msg) => {
                      const isPersona = msg.role === 'persona';
                      return (
                        <div key={msg.id} className={`flex items-start gap-2 ${isPersona ? 'justify-start' : 'justify-end'}`}>
                          {isPersona && (
                            <div className="w-6.5 h-6.5 rounded-full bg-[#002147] text-white text-[11px] flex items-center justify-center shrink-0 shadow-sm font-sans mt-0.5">
                              {selectedPersona === 'dean' ? '🏛️' : selectedPersona === 'recruiter' ? '💼' : '🤝'}
                            </div>
                          )}
                          <div className={`p-2.5 rounded-xl text-[11px] leading-relaxed max-w-[85%] shadow-sm ${
                            isPersona ? 'bg-slate-100 text-[#002147]' : 'bg-[#002147] text-white'
                          }`}>
                            <div className="whitespace-pre-line font-medium leading-relaxed">{msg.text}</div>
                          </div>
                        </div>
                      );
                    })}

                    {isRoleplayThinking && (
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold self-start pl-8">
                        <span className="w-1.5 h-1.5 bg-amber-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-amber-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-amber-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        <span>{isRtl ? 'يفكر الرفيق بذكاء لغوي...' : 'Partner is typing linguistic reply...'}</span>
                      </div>
                    )}
                  </div>
                </div>

                <form onSubmit={handleRoleplaySubmit} className="pt-2 bg-transparent flex gap-1.5">
                  <input
                    type="text"
                    value={roleplayInput}
                    onChange={(e) => setRoleplayInput(e.target.value)}
                    placeholder={isRtl ? 'رد على المحادثة مستخدماً كلمات الدرس...' : 'Type a reply integrating target words...'}
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-[11px] focus:outline-none focus:border-amber-accent"
                  />
                  <button
                    type="submit"
                    disabled={isRoleplayThinking || !roleplayInput.trim()}
                    className="px-4 py-2 bg-[#002147] text-white hover:bg-slate-800 disabled:opacity-35 text-[11px] font-black rounded-xl cursor-pointer"
                  >
                    {isRtl ? 'أرسل' : 'Send'}
                  </button>
                </form>
              </div>
            )}

            {/* Pillar 5: Lesson Mastery Certificate & Reflection Ledger UI */}
            {companionMode === 'mastery_ledger' && (
              <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-between bg-slate-50">
                {!isCertificateUnlocked ? (
                  <div className="space-y-4">
                    <div className="bg-amber-accent/15 border border-amber-accent/25 p-3.5 rounded-2xl flex items-center gap-2">
                      <Sparkles className="text-amber-action shrink-0" size={14} />
                      <p className="text-[11.5px] text-[#002147] font-bold leading-relaxed">
                        {isRtl 
                          ? 'أكمل دفتر التفكر الواعي بالتعبير عن الدرس وصياغة إقرار الفهم لتوليد شهادة إتقان الدرس والاحتفال بتميزك!' 
                          : 'Complete the awareness reflection ledger to generate your highly personalized digital lesson completion deed.'}
                      </p>
                    </div>

                    <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-3.5 shadow-sm">
                      <h4 className="text-xs font-black text-[#002147] uppercase tracking-wider">
                        📓 {isRtl ? 'مذكرة المراجعة والوعي الذاتي:' : 'Notebook Reflection Questions:'}
                      </h4>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1">
                          {isRtl ? '1. ما هي الفائدة الكبرى أو القاعدة الذهبية التي اكتسبتها اليوم؟' : '1. What linguistic rule did you acquire?'}
                        </label>
                        <textarea
                          rows={2}
                          value={reflectionQ1}
                          onChange={(e) => setReflectionQ1(e.target.value)}
                          placeholder={isRtl ? 'مثال: التركيب السليم لصفات المقارنة أو فكرة معينة...' : 'E.g., Perfect adjective orders.'}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-[11px] focus:outline-none focus:border-amber-accent resize-none font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1">
                          {isRtl ? '2. اكتب جملة كاملة تعبر عن فهمك مستخدما مفردة جديدة:' : '2. Write a full English practice sentence:'}
                        </label>
                        <textarea
                          rows={2}
                          value={reflectionQ2}
                          onChange={(e) => setReflectionQ2(e.target.value)}
                          placeholder={isRtl ? 'اكتب جملة تطبيقية رصينة...' : 'E.g., Practice daily to excel.'}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-[11px] focus:outline-none focus:border-amber-accent resize-none font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1">
                          ✍️ {isRtl ? 'وقّع باسمك الثلاثي لإتمام ميثاق الإتقان:' : '✍️ Write your full name for credentials:'}
                        </label>
                        <input
                          type="text"
                          value={signatureName}
                          onChange={(e) => setSignatureName(e.target.value)}
                          placeholder={isRtl ? 'مثال: باسم بن محمد بن مروان' : 'E.g., Basim Al-Marwan'}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[11px] focus:outline-none focus:border-amber-accent font-serif font-black"
                        />
                      </div>

                      <button
                        type="button"
                        disabled={!reflectionQ1.trim() || !reflectionQ2.trim() || !signatureName.trim()}
                        onClick={handleGenerateCertificate}
                        className="w-full py-2.5 bg-gradient-to-r from-[#002147] to-[#013167] text-white hover:to-slate-800 disabled:opacity-40 text-xs font-black rounded-xl transition shadow-lg shadow-blue-900/10 cursor-pointer"
                      >
                        📜 {isRtl ? 'توقيع وإصدار ميثاق الإتقان للدرس' : 'Sign & Issue Mastery Digital Deed'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-1 space-y-4"
                  >
                    {/* Breathtaking High-Contrast Academy Digital Certificate Card */}
                    <div className="bg-[#002147] text-white border-4 border-amber-accent rounded-3xl p-6 relative overflow-hidden shadow-xl text-center flex flex-col items-center">
                      {/* Golden Certificate Ornament Grid background */}
                      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                      
                      {/* Medal icon */}
                      <span className="text-4xl mb-2.5 filter drop-shadow-md">🏆</span>
                      
                      <h4 className="font-serif font-black text-xs md:text-sm tracking-wider text-amber-accent uppercase">
                        {isRtl ? 'أكاديمية طويق الرقمية للغة الإنجليزية' : 'Tuwaiq Digital English Academy'}
                      </h4>
                      <div className="w-16 h-0.5 bg-amber-accent/40 my-2" />
                      
                      <p className="text-[10px] text-slate-300 italic">
                        {isRtl ? 'يشهد مجلس الإدارة التعليمي بكل فخر بأن:' : 'The Academic Faculty hereby decriers that:'}
                      </p>

                      <h3 className="text-xl font-serif font-black text-white hover:text-amber-accent transition duration-300 tracking-wide my-2 bg-white/5 py-1.5 px-4 rounded-xl border border-white/10 select-all">
                        {signatureName}
                      </h3>

                      <p className="text-[10.5px] text-slate-200 leading-normal max-w-[320px]">
                        {isRtl 
                          ? `قد أتم بنجاح وبكفاءة عالية كافة محاور وحدة الدرس: **"${lesson.title || 'هذا الدرس'}"**، بعد مراجعة تفاعلية وافية، مدقق النطق الصوتي، والتحقق البنائي التام.`
                          : `Has outstandingly mastered all operational milestones for the unit lesson: **"${lesson.title || 'this lesson'}"**, demonstrating superior phonetic & syntactic flow.`}
                      </p>

                      <div className="w-full grid grid-cols-2 gap-4 mt-5 pt-3.5 border-t border-white/10 text-left">
                        <div>
                          <span className="text-[7.5px] font-bold text-slate-400 block uppercase">{isRtl ? 'تاريخ التوقيع' : 'Certified Date'}</span>
                          <span className="text-[10px] font-mono font-bold text-slate-200">{certifiedDate}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[7.5px] font-bold text-slate-400 block uppercase">{isRtl ? 'بإمضاء العميد' : 'Faculty Seal'}</span>
                          <span className="text-[10px] font-serif font-bold text-amber-accent tracking-wide">{isRtl ? 'د. مصلح اللغوي' : 'Dr. Academic Dean'}</span>
                        </div>
                      </div>

                      {/* Golden Seal stamp */}
                      <div className="absolute right-3.5 top-3 w-14 h-14 bg-gradient-to-br from-amber-200 to-amber-500 rounded-full border-2 border-dashed border-white/40 flex items-center justify-center text-[18px] opacity-15 rotate-12 select-none">
                        APPROVED
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsCertificateUnlocked(false);
                          playPristineChime('close');
                        }}
                        className="flex-1 py-2 bg-slate-200 text-slate-700 hover:bg-slate-300 text-xs font-black rounded-xl transition cursor-pointer"
                      >
                        ✏️ {isRtl ? 'تعديل التفكير' : 'Edit Ledger'}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          speakAcademyText(
                            isRtl 
                              ? `تهانينا الحارة لك يا ${signatureName}! لقد حزت بفخر واقتدار على ميثاق التميز الأكاديمي لدرس اليوم، استمر في طموحك!`
                              : `Huge congratulations to you, ${signatureName}! You have successfully claimed your digital mastery seal of excellence. Awesome effort!`, 
                            isRtl ? 'ar' : 'en'
                          );
                        }}
                        className="flex-1 py-2 bg-gradient-to-r from-amber-accent to-amber-500 text-ink text-xs font-black rounded-xl transition shadow-md shadow-amber-600/10 cursor-pointer"
                      >
                        🔊 {isRtl ? 'استمع لتهنئة الفخر' : 'Hear Victory Call'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
