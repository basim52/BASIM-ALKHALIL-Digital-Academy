import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Mic, 
  MicOff, 
  Languages, 
  HelpCircle, 
  CheckCircle2, 
  RotateCcw, 
  BookOpen, 
  ArrowRight,
  Maximize2,
  Minimize2,
  ChevronDown,
  Sparkle,
  GripVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface AIOmniCompanionProps {
  isRtl?: boolean;
  currentContext?: string;
  onNavigateToView?: (view: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  phonetics?: string;
}

export const AIOmniCompanion: React.FC<AIOmniCompanionProps> = ({
  isRtl = true,
  currentContext = 'General Academy',
  onNavigateToView
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'pronounce' | 'translate' | 'quiz'>('chat');
  
  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: isRtl 
        ? 'أهلاً بك يا بطل في أكاديمية باسم آل خليل! 🌟 أنا رفيقك الذكي. كيف يمكنني مساعدتك في تعلم الإنجليزية اليوم؟'
        : 'Welcome champion to Basim Alkhalil Academy! 🌟 I am your AI co-pilot. How can I assist your English journey today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [tutorMode, setTutorMode] = useState<'general' | 'grammar' | 'vocab' | 'culture'>('general');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Pronunciation Coach State
  const [pronouncePhrase, setPronouncePhrase] = useState('Pronunciation is key to confidence');
  const [pronounceResult, setPronounceResult] = useState<any>(null);
  const [isAnalyzingPronounce, setIsAnalyzingPronounce] = useState(false);

  // Smart Translator State
  const [transInput, setTransInput] = useState('');
  const [transResult, setTransResult] = useState<any>(null);
  const [isTranslating, setIsTranslating] = useState(false);

  // Adaptive Quiz State
  const [quizTopic, setQuizTopic] = useState('Conversational Phrasal Verbs');
  const [quizLevel, setQuizLevel] = useState('B1');
  const [quizData, setQuizData] = useState<any>(null);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Drag & constraints ref for full-screen draggable button
  const dragConstraintsRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Text-To-Speech function
  const speakText = (text: string, lang = 'en-US') => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    
    // Clean text from markdown symbols for clean speech
    const clean = text.replace(/[\*#_`]/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = lang;
    utterance.rate = 0.9;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  // Speech-To-Text function
  const toggleSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(isRtl ? 'خاصية التعرف على الصوت غير مدعومة في هذا المتصفح' : 'Speech recognition not supported in this browser');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = activeTab === 'translate' ? 'ar-SA' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (activeTab === 'chat') {
          setInputMessage(transcript);
        } else if (activeTab === 'pronounce') {
          setPronouncePhrase(transcript);
        } else if (activeTab === 'translate') {
          setTransInput(transcript);
        }
      };

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  // Send message to instant tutor
  const handleSendMessage = async (e?: React.FormEvent, directText?: string) => {
    if (e) e.preventDefault();
    const textToSend = (directText || inputMessage).trim();
    if (!textToSend || isLoading) return;

    setInputMessage('');
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const historyPayload = messages.slice(-6).map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        text: m.text
      }));

      const res = await fetch('/api/ai/instant-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          context: currentContext,
          mode: tutorMode,
          history: historyPayload
        })
      });

      if (!res.ok) throw new Error('Failed to reach AI tutor');
      const data = await res.json();
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.reply || (isRtl ? 'أحسنت! استمر في التدرب.' : 'Well done! Keep practicing.'),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);

      // Speak snippet if brief
      if (aiMsg.text.length < 150 && !/[\u0600-\u06FF]/.test(aiMsg.text)) {
        speakText(aiMsg.text);
      }
    } catch (err: any) {
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: isRtl 
          ? 'معك خطوة بخطوة! تذكر أن كل كلمة تمارسها اليوم تبني ثقتك وطلاقتك غداً.'
          : 'With you step by step! Every sentence practiced brings you closer to effortless fluency.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Analyze Pronunciation
  const handleAnalyzePronunciation = async () => {
    if (!pronouncePhrase.trim() || isAnalyzingPronounce) return;
    setIsAnalyzingPronounce(true);
    setPronounceResult(null);

    try {
      const res = await fetch('/api/ai/live-pronunciation-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phrase: pronouncePhrase.trim() })
      });
      const data = await res.json();
      setPronounceResult(data);
      speakText(pronouncePhrase);
    } catch (err) {
      setPronounceResult({
        phrase: pronouncePhrase,
        ipa: "/.../",
        syllables: pronouncePhrase,
        stressPattern: "Standard Word Stress",
        arabicSpeakersTip: "احرص على مد الحروف الصوتية وعدم اختصارها، ونطق الحرف P بنفخة هواء واضحة.",
        similarSoundingWords: ["practice", "clarity", "fluency"]
      });
    } finally {
      setIsAnalyzingPronounce(false);
    }
  };

  // Translate Contextually
  const handleTranslate = async () => {
    if (!transInput.trim() || isTranslating) return;
    setIsTranslating(true);
    setTransResult(null);

    try {
      const res = await fetch('/api/ai/smart-translator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: transInput.trim(), context: currentContext })
      });
      const data = await res.json();
      setTransResult(data);
    } catch (err) {
      setTransResult({
        natural: transInput,
        formal: transInput,
        casual: transInput,
        phonetics: "",
        culturalNote: "ملاحظة: الترجمة تعتمد على سياق الجملة والغرض من الحديث."
      });
    } finally {
      setIsTranslating(false);
    }
  };

  // Generate Adaptive Quiz
  const handleGenerateQuiz = async () => {
    if (isGeneratingQuiz) return;
    setIsGeneratingQuiz(true);
    setQuizData(null);
    setSelectedAnswers({});
    setQuizSubmitted(false);

    try {
      const res = await fetch('/api/ai/adaptive-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: quizTopic, level: quizLevel, count: 3 })
      });
      const data = await res.json();
      setQuizData(data);
    } catch (err) {
      setQuizData({
        title: `Quiz: ${quizTopic}`,
        level: quizLevel,
        questions: [
          {
            id: 'q1',
            questionEn: "I look forward to ______ from you soon.",
            questionAr: "اختر الصيغة الصحيحة بعد look forward to:",
            options: ["hear", "hearing", "heard", "hears"],
            correctIndex: 1,
            explanation: "'Look forward to' is followed by a gerund (-ing form)."
          },
          {
            id: 'q2',
            questionEn: "By the time we arrived, the lecture ______.",
            questionAr: "اختر الزمن المناسب للحدث الأسبق في الماضي:",
            options: ["had started", "started", "has started", "starts"],
            correctIndex: 0,
            explanation: "Past Perfect (had + past participle) expresses an action completed before another past event."
          }
        ]
      });
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  const calculateQuizScore = () => {
    if (!quizData?.questions) return 0;
    let correct = 0;
    quizData.questions.forEach((q: any) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    return correct;
  };

  return (
    <>
      {/* Full-viewport boundary for dragging anywhere */}
      <div 
        ref={dragConstraintsRef} 
        className="fixed inset-0 pointer-events-none z-[990] overflow-hidden select-none" 
        aria-hidden="true"
      />

      {/* DRAGGABLE FLOATING TRIGGER BUTTON */}
      {!isOpen && (
        <motion.div
          drag
          dragConstraints={dragConstraintsRef}
          dragElastic={0.15}
          dragMomentum={false}
          onDragStart={() => {
            isDraggingRef.current = true;
          }}
          onDragEnd={() => {
            setTimeout(() => {
              isDraggingRef.current = false;
            }, 180);
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileDrag={{ scale: 1.1, cursor: 'grabbing', filter: 'brightness(1.08)' }}
          className={`fixed bottom-24 ${isRtl ? 'left-4 sm:left-6' : 'right-4 sm:right-6'} z-[995] touch-none select-none cursor-grab active:cursor-grabbing`}
          dir={isRtl ? 'rtl' : 'ltr'}
          aria-label={isRtl ? 'المساعد الذكي للأكاديمية - قابل للسحب' : 'AI Academy Companion - Draggable'}
        >
          <div
            onClick={() => {
              if (isDraggingRef.current) return;
              setIsOpen(true);
            }}
            className="flex items-center gap-2 sm:gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-gradient-to-r from-[#58cc02] via-[#22c55e] to-[#1cb0f6] text-white rounded-full shadow-2xl border-2 border-white/90 backdrop-blur-md group select-none cursor-pointer active:scale-95 transition-transform"
          >
            {/* Drag grip handle */}
            <div 
              className="text-white/70 group-hover:text-white transition-colors flex items-center justify-center -mr-1"
              title={isRtl ? 'اسحب لنقل الزر لأي مكان' : 'Drag to move anywhere'}
            >
              <GripVertical size={16} />
            </div>

            {/* AI Avatar with status pulse */}
            <div className="relative shrink-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white/20 rounded-full flex items-center justify-center shadow-inner">
                <Bot size={20} className="text-white animate-bounce [animation-duration:2.5s]" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 border-2 border-white rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 border-2 border-white rounded-full" />
            </div>

            {/* Label & Drag hint */}
            <div className={`${isRtl ? 'text-right' : 'text-left'}`}>
              <div className="flex items-center gap-1">
                <span className="font-black text-xs leading-tight whitespace-nowrap">
                  {isRtl ? 'المساعد الذكي 🪄' : 'AI Tutor 🪄'}
                </span>
              </div>
              <span className="text-[9px] text-white/90 font-bold opacity-80 leading-none block whitespace-nowrap">
                {isRtl ? 'اسحبني لأي مكان ✋' : 'Drag anywhere ✋'}
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* EXPANDED AI ASSISTANT MODAL OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <div 
            className="fixed inset-0 z-[1050] flex items-center justify-center p-3 sm:p-4 md:p-6" 
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 w-full max-w-lg md:max-w-xl h-[620px] max-h-[88vh] bg-white rounded-3xl shadow-2xl border-4 border-slate-100 flex flex-col overflow-hidden backdrop-blur-xl"
            >
            {/* MODAL HEADER */}
            <div className="bg-gradient-to-r from-[#58cc02] via-[#22c55e] to-[#1cb0f6] p-4 text-white flex items-center justify-between shrink-0 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                  <Bot size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="font-black text-sm leading-none flex items-center gap-2">
                    <span>{isRtl ? 'رفيق أكاديمية باسم آل خليل الذكي' : 'Alkhalil AI Companion'}</span>
                    <Sparkles size={14} className="text-amber-300" />
                  </h3>
                  <p className="text-[10px] text-white/80 font-bold mt-1">
                    {isRtl ? 'مدعوم بنموذج Gemini 3.7 Flash فائق الذكاء' : 'Powered by Gemini 3.7 Flash Engine'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {onNavigateToView && (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onNavigateToView('real-time-voice-call');
                    }}
                    className="px-2.5 py-1 rounded-xl bg-white/20 hover:bg-white/30 text-white flex items-center gap-1.5 text-[10px] font-black transition-all cursor-pointer border border-white/30"
                    title={isRtl ? 'فتح المكالمة الصوتية المباشرة' : 'Open Live Voice Call'}
                  >
                    <Mic size={12} className="animate-pulse" />
                    <span>{isRtl ? 'مكالمة مباشرة 📞' : 'Live Call 📞'}</span>
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* TAB BAR NAVIGATION */}
            <div className="flex items-center border-b border-slate-200 bg-slate-50 p-1 shrink-0 text-xs font-black">
              {[
                { id: 'chat', labelAr: 'المحادثة 💬', labelEn: 'Tutor Chat 💬' },
                { id: 'pronounce', labelAr: 'النطق واللفظ 🗣️', labelEn: 'Pronounce 🗣️' },
                { id: 'translate', labelAr: 'المترجم 🌐', labelEn: 'Translator 🌐' },
                { id: 'quiz', labelAr: 'اختبار ذكي ⚡', labelEn: 'Adaptive Quiz ⚡' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-2 px-1 text-center rounded-xl transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-[#58cc02] shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {isRtl ? tab.labelAr : tab.labelEn}
                </button>
              ))}
            </div>

            {/* TAB 1: INSTANT TUTOR CHAT */}
            {activeTab === 'chat' && (
              <div className="flex-1 flex flex-col justify-between overflow-hidden p-4 bg-[#F8FAFC]">
                {/* Mode Selector Chips */}
                <div className="flex items-center gap-1.5 pb-2 border-b border-slate-200/80 shrink-0 overflow-x-auto text-[11px] font-black no-scrollbar">
                  {[
                    { id: 'general', labelAr: 'الرفيق العام 🤖', labelEn: 'General AI 🤖' },
                    { id: 'grammar', labelAr: 'تدقيق نحوي ✍️', labelEn: 'Grammar Coach ✍️' },
                    { id: 'vocab', labelAr: 'مفردات وسياق 📚', labelEn: 'Vocab & Idioms 📚' },
                    { id: 'culture', labelAr: 'إتيكيت وثقافة 🌍', labelEn: 'Culture & Etiquette 🌍' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setTutorMode(m.id as any)}
                      className={`px-2.5 py-1 rounded-lg border whitespace-nowrap transition-all cursor-pointer ${
                        tutorMode === m.id
                          ? 'bg-[#58cc02] text-white border-[#58cc02] shadow-sm font-black scale-105'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {isRtl ? m.labelAr : m.labelEn}
                    </button>
                  ))}
                </div>

                {/* Message Log */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-1 pt-2">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-3.5 text-xs font-semibold leading-relaxed shadow-sm ${
                          m.sender === 'user'
                            ? 'bg-[#58cc02] text-white rounded-br-none'
                            : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{m.text}</p>
                        <div className="flex items-center justify-between gap-2 mt-2 pt-1 border-t border-black/5 text-[9px] opacity-75 font-bold">
                          <span>{m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          {m.sender === 'ai' && (
                            <button
                              onClick={() => speakText(m.text)}
                              className="flex items-center gap-1 hover:text-[#58cc02] transition-colors"
                            >
                              <Volume2 size={12} />
                              <span>{isRtl ? 'استمع' : 'Listen'}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-slate-200 rounded-2xl p-3 rounded-bl-none flex items-center gap-2 text-xs font-black text-slate-400">
                        <div className="w-2 h-2 bg-[#58cc02] rounded-full animate-ping" />
                        <span>{isRtl ? 'الرفيق الذكي يفكر ويكتب...' : 'AI Tutor is thinking...'}</span>
                      </div>
                    </div>
                  )}
                  <div ref={chatBottomRef} />
                </div>

                {/* Quick Prompts Suggestions */}
                <div className="flex items-center gap-1.5 py-2 overflow-x-auto text-[10px] font-bold text-slate-600 no-scrollbar shrink-0">
                  <span className="text-slate-400 shrink-0">{isRtl ? 'اقتراحات سريعة:' : 'Quick:'}</span>
                  {(isRtl ? [
                    'كيف أفرق بين Since و For؟',
                    'أعطني 3 مصطلحات للاعتذار بلباقة',
                    'صحح لي: "I am agree with you"',
                    'كيف أسأل عن الاتجاهات باحترافية؟'
                  ] : [
                    'Difference between Since and For?',
                    '3 Polite ways to disagree',
                    'Correct: "I am agree with you"',
                    'Asking for directions fluently'
                  ]).map((promptText, pIdx) => (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => handleSendMessage(undefined, promptText)}
                      className="px-2.5 py-1 bg-white border border-slate-200 hover:border-[#58cc02] hover:text-[#58cc02] rounded-lg whitespace-nowrap shadow-xs transition-colors shrink-0 cursor-pointer"
                    >
                      {promptText}
                    </button>
                  ))}
                </div>

                {/* Chat Input Bar */}
                <form onSubmit={handleSendMessage} className="pt-2 border-t border-slate-200 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleSpeechRecognition}
                    className={`p-3 rounded-xl border transition-all ${
                      isListening 
                        ? 'bg-rose-500 text-white animate-pulse border-rose-600' 
                        : 'bg-white text-slate-500 hover:text-[#58cc02] border-slate-200 shadow-sm'
                    }`}
                    title={isRtl ? 'تحدث صوتياً' : 'Voice Input'}
                  >
                    {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                  </button>

                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={isRtl ? 'اطرح سؤالاً، اطلب شرح قاعدة، أو صحح جملة...' : 'Ask grammar questions, explain words...'}
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-[#58cc02] transition-colors shadow-sm"
                  />

                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isLoading}
                    className="p-3 bg-[#58cc02] disabled:opacity-50 text-white rounded-xl shadow-md hover:bg-[#63e104] transition-all active:scale-95"
                  >
                    <Send size={16} className={isRtl ? 'rotate-180' : ''} />
                  </button>
                </form>
              </div>
            )}

            {/* TAB 2: PRONUNCIATION & ACCENT COACH */}
            {activeTab === 'pronounce' && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8FAFC]">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider">
                    {isRtl ? 'اكتب الجملة أو الكلمة لتحليل نطقها ومخارج حروفها:' : 'Enter phrase to analyze pronunciation & phonetics:'}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={pronouncePhrase}
                      onChange={(e) => setPronouncePhrase(e.target.value)}
                      className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-[#58cc02]"
                    />
                    <button
                      onClick={toggleSpeechRecognition}
                      className={`p-2.5 rounded-xl border ${isListening ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-600'}`}
                    >
                      <Mic size={16} />
                    </button>
                  </div>

                  <button
                    onClick={handleAnalyzePronunciation}
                    disabled={isAnalyzingPronounce || !pronouncePhrase.trim()}
                    className="w-full py-2.5 bg-[#58cc02] text-white font-black text-xs rounded-xl shadow-md hover:bg-[#63e104] transition-all flex items-center justify-center gap-2"
                  >
                    {isAnalyzingPronounce ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Sparkles size={14} />
                        <span>{isRtl ? 'تحليل النطق والتشكيل الصوتي 🪄' : 'Analyze Pronunciation 🪄'}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Analysis Result */}
                {pronounceResult && (
                  <div className="bg-white p-4 rounded-2xl border-2 border-[#58cc02]/30 shadow-sm space-y-3 animate-fade-in">
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="text-xs font-black text-slate-800">{pronounceResult.phrase}</span>
                      <button
                        onClick={() => speakText(pronounceResult.phrase)}
                        className="px-3 py-1 bg-[#58cc02]/10 text-[#58cc02] font-black text-[10px] rounded-lg flex items-center gap-1 hover:bg-[#58cc02] hover:text-white transition-all"
                      >
                        <Volume2 size={13} />
                        <span>{isRtl ? 'نطق سليم' : 'Play Audio'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-slate-50 p-2.5 rounded-xl">
                        <span className="block text-[9px] text-slate-400 font-bold uppercase">{isRtl ? 'الرمز الصوتي (IPA):' : 'IPA:'}</span>
                        <span className="font-mono font-black text-slate-700">{pronounceResult.ipa}</span>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl">
                        <span className="block text-[9px] text-slate-400 font-bold uppercase">{isRtl ? 'النطق بالعربية:' : 'Phonetics:'}</span>
                        <span className="font-black text-[#58cc02]">{pronounceResult.arabizedPhonetics}</span>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-xl text-xs space-y-1">
                      <span className="block text-[9px] text-slate-400 font-bold uppercase">{isRtl ? 'المقاطع الصوتية وموضع النبر (Stress):' : 'Syllables & Stress:'}</span>
                      <span className="font-black text-indigo-600">{pronounceResult.syllables}</span>
                    </div>

                    {pronounceResult.arabicSpeakersTip && (
                      <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-900 font-medium">
                        <span className="block text-[10px] font-black text-amber-700 uppercase mb-1">
                          {isRtl ? '💡 نصيحة النطق للمتحدثين بالعربية:' : '💡 Pronunciation Tip:'}
                        </span>
                        {pronounceResult.arabicSpeakersTip}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: SMART CONTEXTUAL TRANSLATOR */}
            {activeTab === 'translate' && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8FAFC]">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider">
                    {isRtl ? 'النص المراد ترجمته سياقياً مع درجات الفصاحة:' : 'Text to translate contextually:'}
                  </label>
                  <textarea
                    rows={3}
                    value={transInput}
                    onChange={(e) => setTransInput(e.target.value)}
                    placeholder={isRtl ? 'اكتب جملة بالإنجليزية أو العربية...' : 'Enter English or Arabic sentence...'}
                    className="w-full border border-slate-200 rounded-xl p-3 text-xs font-semibold outline-none focus:border-[#58cc02] resize-none"
                  />
                  <button
                    onClick={handleTranslate}
                    disabled={isTranslating || !transInput.trim()}
                    className="w-full py-2.5 bg-[#1cb0f6] text-white font-black text-xs rounded-xl shadow-md hover:bg-[#189cdb] transition-all flex items-center justify-center gap-2"
                  >
                    {isTranslating ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Languages size={15} />
                        <span>{isRtl ? 'ترجمة سياقية ذكية 🌐' : 'Translate Contextually 🌐'}</span>
                      </>
                    )}
                  </button>
                </div>

                {transResult && (
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3 text-xs animate-fade-in">
                    <div className="space-y-2">
                      <div className="bg-emerald-50 border border-emerald-100 p-2.5 rounded-xl">
                        <span className="block text-[9px] font-black text-emerald-700 uppercase">{isRtl ? 'الترجمة الطبيعية الأكثر دقة:' : 'Natural Translation:'}</span>
                        <span className="font-black text-emerald-950 text-sm mt-0.5 block">{transResult.natural}</span>
                      </div>

                      {transResult.formal && (
                        <div className="bg-blue-50 border border-blue-100 p-2.5 rounded-xl">
                          <span className="block text-[9px] font-black text-blue-700 uppercase">{isRtl ? 'الصيغة الرسمية / المهنية (Formal):' : 'Formal / Business:'}</span>
                          <span className="font-bold text-blue-950 mt-0.5 block">{transResult.formal}</span>
                        </div>
                      )}

                      {transResult.casual && (
                        <div className="bg-amber-50 border border-amber-100 p-2.5 rounded-xl">
                          <span className="block text-[9px] font-black text-amber-700 uppercase">{isRtl ? 'الصيغة العامية واليومية (Casual):' : 'Casual / Colloquial:'}</span>
                          <span className="font-bold text-amber-950 mt-0.5 block">{transResult.casual}</span>
                        </div>
                      )}

                      {transResult.culturalNote && (
                        <p className="text-[11px] text-slate-500 font-medium italic border-t pt-2">
                          💡 {transResult.culturalNote}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: ADAPTIVE AI QUIZ */}
            {activeTab === 'quiz' && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8FAFC]">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={quizTopic}
                      onChange={(e) => setQuizTopic(e.target.value)}
                      placeholder="Topic (e.g. Travel, Past Simple, Phrasal Verbs)"
                      className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:border-[#58cc02]"
                    />
                    <select
                      value={quizLevel}
                      onChange={(e) => setQuizLevel(e.target.value)}
                      className="border border-slate-200 rounded-xl px-2 py-2 text-xs font-black bg-white"
                    >
                      {['A1', 'A2', 'B1', 'B2', 'C1'].map((lvl) => (
                        <option key={lvl} value={lvl}>{lvl}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleGenerateQuiz}
                    disabled={isGeneratingQuiz}
                    className="w-full py-2.5 bg-gradient-to-r from-[#58cc02] to-[#22c55e] text-white font-black text-xs rounded-xl shadow-md hover:brightness-105 transition-all flex items-center justify-center gap-2"
                  >
                    {isGeneratingQuiz ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Sparkles size={14} />
                        <span>{isRtl ? 'توليد اختبار فوري بالذكاء الاصطناعي 🪄' : 'Generate Adaptive Quiz 🪄'}</span>
                      </>
                    )}
                  </button>
                </div>

                {quizData?.questions && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center justify-between text-xs font-black text-slate-700 bg-white p-3 rounded-2xl border">
                      <span>{quizData.title}</span>
                      <span className="bg-[#58cc02] text-white px-2 py-0.5 rounded-full text-[10px]">{quizData.level}</span>
                    </div>

                    {quizData.questions.map((q: any, idx: number) => (
                      <div key={q.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2.5 text-xs">
                        <p className="font-black text-slate-800 leading-snug">
                          {idx + 1}. {q.questionEn}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold">
                          {q.questionAr}
                        </p>

                        <div className="grid grid-cols-1 gap-1.5 pt-1">
                          {q.options.map((opt: string, optIdx: number) => {
                            const isSelected = selectedAnswers[q.id] === optIdx;
                            const isCorrect = optIdx === q.correctIndex;
                            let style = "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100";
                            
                            if (quizSubmitted) {
                              if (isCorrect) {
                                style = "bg-emerald-100 border-emerald-400 text-emerald-900 font-black";
                              } else if (isSelected && !isCorrect) {
                                style = "bg-rose-100 border-rose-400 text-rose-900 font-bold line-through";
                              }
                            } else if (isSelected) {
                              style = "bg-[#58cc02] text-white border-[#58cc02] font-black";
                            }

                            return (
                              <button
                                key={optIdx}
                                disabled={quizSubmitted}
                                onClick={() => setSelectedAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                                className={`p-2.5 rounded-xl border text-right transition-all flex items-center justify-between ${style}`}
                              >
                                <span>{opt}</span>
                                {quizSubmitted && isCorrect && <CheckCircle2 size={14} className="text-emerald-700" />}
                              </button>
                            );
                          })}
                        </div>

                        {quizSubmitted && q.explanation && (
                          <p className="text-[10px] text-slate-500 font-medium bg-slate-50 p-2 rounded-xl mt-2">
                            💡 {q.explanation}
                          </p>
                        )}
                      </div>
                    ))}

                    {/* Quiz Submit & Score */}
                    {!quizSubmitted ? (
                      <button
                        onClick={() => {
                          setQuizSubmitted(true);
                          confetti({ particleCount: 60, spread: 60, origin: { y: 0.8 } });
                        }}
                        disabled={Object.keys(selectedAnswers).length === 0}
                        className="w-full py-3 bg-[#58cc02] text-white font-black text-xs rounded-2xl shadow-lg hover:bg-[#63e104] transition-all"
                      >
                        {isRtl ? 'تصحيح الإجابات وحساب النتيجة 🏆' : 'Submit & Check Answers 🏆'}
                      </button>
                    ) : (
                      <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-center space-y-2">
                        <p className="font-black text-emerald-900 text-sm">
                          {isRtl ? 'نتيجتك:' : 'Your Score:'} {calculateQuizScore()} / {quizData.questions.length} 🌟
                        </p>
                        <button
                          onClick={handleGenerateQuiz}
                          className="px-4 py-2 bg-emerald-600 text-white font-black text-xs rounded-xl shadow hover:bg-emerald-700 transition-all"
                        >
                          {isRtl ? 'اختبار جديد 🔄' : 'New Quiz 🔄'}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
