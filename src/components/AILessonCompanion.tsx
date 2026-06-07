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
  Activity
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
  }, [lesson.id]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

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

            {/* Chat Area Messages */}
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
                          ? 'bg-[#002147] text-white rounded-tr-none' 
                          : 'bg-white text-ink border border-slate-100 rounded-tl-none'
                      }`}>
                        
                        {/* Rendering core messages with slight markup or text */}
                        <div className="whitespace-pre-line font-medium">{msg.text}</div>
                        
                        {/* TTS Play controls for Assistant Messages */}
                        {!isUser && (
                          <div className="flex justify-between items-center mt-2.5 pt-2 border-t border-slate-100">
                            <span className="text-[9px] text-slate-400 font-bold">
                              العربية / ENGLISH
                            </span>
                            <button
                              onClick={() => handleTriggerSpeak(msg.text, msg.id)}
                              className={`flex items-center gap-1 py-1 px-2.5 rounded-lg text-[10px] font-bold tracking-wide transition ${
                                currentPlayingId === msg.id 
                                  ? 'bg-amber-accent text-ink animate-pulse' 
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              {currentPlayingId === msg.id ? (
                                <>
                                  <Activity size={10} className="text-amber-action animate-bounce" />
                                  <span>{isRtl ? 'جارٍ التشغيل...' : 'Playing...'}</span>
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
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
