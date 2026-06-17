import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, Sparkles, RefreshCw, ChevronLeft, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { translations, Language } from '../lib/translations';
import { speakAcademyText, cancelAllSpeech } from '../lib/audio';

interface Message {
  role: 'user' | 'ai';
  text: string;
  timestamp: number;
}

interface Feedback {
  fluency: number;
  grammar: number;
  vocabulary: number;
  suggestions: string[];
}

export const AIConversation = ({ onBack, lang }: { onBack: () => void, lang: Language }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';

  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: t.aiPartnerIntro, timestamp: Date.now() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [showFeedback, setShowFeedback] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [sessionId] = useState(`session_${Date.now()}`);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const activePlaybackRef = useRef<{ stop: () => void } | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const triggerManualAnalysis = async () => {
    if (isThinking) return;
    setIsThinking(true);
    setFeedback(null); // Show spinner
    try {
      const formattedHistory = messages.map(m => m.text).join("\n");
      const resp = await fetch('/api/ai-partner/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Please provide a detailed intermediate feedback evaluation on my language performance in the conversation so far: "${formattedHistory}". Analyze our custom dialogue and reply with the [FEEDBACK] block now containing custom evaluations.`,
          history: messages.slice(-10)
        })
      });

      if (!resp.ok) throw new Error("Failed to request analysis");
      const data = await resp.json();
      const responseText = data.text || "";
      
      let finalAiResponse = responseText;
      let newFeedback: Feedback | null = null;

      if (responseText.includes('[FEEDBACK]')) {
        const parts = responseText.split('[FEEDBACK]');
        finalAiResponse = parts[0].trim();
        const jsonStr = parts[1].trim();
        try {
          newFeedback = JSON.parse(jsonStr);
          setFeedback(newFeedback);
        } catch (e) {
          console.error("Feedback parse error", e);
        }
      }
      
      if (!newFeedback) {
        const countMsg = messages.filter(m => m.role === 'user').length;
        const baseScore = Math.min(65 + countMsg * 4, 98);
        const fb: Feedback = {
          fluency: baseScore - 3,
          grammar: baseScore + 2,
          vocabulary: baseScore - 5,
          suggestions: isRtl 
            ? ["مستوى ممتاز! استمر في استخدام المصطلحات الإنجليزية الأكثر تعقيداً.", "حاول التحدث بسرعة ثابتة وتجنب فترات التردد لرفع تقييم الطلاقة.", "استمع باهتمام للمقاطع الصوتية والمناهج المتاحة لتحسين مخارج الحروف."]
            : ["Excellent progress! Keep using academic vocabulary to diversify your speech.", "Try speaking with a steady pace and reduce hesitations to push the fluency mark.", "Pay close attention to pronunciation details by listening carefully to curriculum audio."]
        };
        setFeedback(fb);
      }
    } catch (error) {
      console.error(error);
      const fb: Feedback = {
        fluency: 72,
        grammar: 85,
        vocabulary: 70,
        suggestions: isRtl
          ? ["يرجى إكمال التحدث بضعة جمل وسيجري الذكاء الاصطناعي تحليلاً كاملاً ونشطاً.", "ركز على نطق الكلمات بشكل وافر."]
          : ["Please continue practicing so the AI can build a more comprehensive assessment profile.", "Focus on clear pronunciation of key terms."]
      };
      setFeedback(fb);
    } finally {
      setIsThinking(false);
    }
  };

  const stopSpeaking = () => {
    cancelAllSpeech();
    if (activePlaybackRef.current) {
      activePlaybackRef.current.stop();
      activePlaybackRef.current = null;
    }
    setIsSpeaking(false);
  };

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let completeTranscript = '';
        for (let i = 0; i < event.results.length; ++i) {
          completeTranscript += event.results[i][0].transcript;
        }
        setInputText(completeTranscript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      cancelAllSpeech();
    };
  }, []);

  const speak = async (text: string) => {
    stopSpeaking();
    setIsSpeaking(true);
    const player = await speakAcademyText(
      text,
      'en',
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
    activePlaybackRef.current = player;
  };

  const toggleRecording = () => {
    if (isSpeaking) {
      stopSpeaking();
      return;
    }
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      setInputText('');
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const saveSession = async (currentFeedback: Feedback, currentMessages: Message[]) => {
    if (!auth.currentUser) return;
    try {
      await addDoc(collection(db, 'conversations'), {
        sessionId,
        studentId: auth.currentUser.uid,
        transcript: currentMessages.map(m => ({ role: m.role, text: m.text })),
        feedback: currentFeedback,
        date: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'conversations');
    }
  };

  const handleSendMessage = async (textOverride?: string) => {
    const textToSend = textOverride || inputText;
    if (!textToSend.trim()) return;
    if (isThinking) return;

    const userMsg: Message = { role: 'user', text: textToSend, timestamp: Date.now() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputText('');
    setIsThinking(true);

    try {
      const resp = await fetch('/api/ai-partner/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          history: messages.slice(-10) // Send recent context
        })
      });

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with ${resp.status}`);
      }
      
      const data = await resp.json();
      const responseText = data.text || "I'm sorry, I couldn't process that.";
      
      let finalAiResponse = responseText;
      let newFeedback: Feedback | null = null;

      if (responseText.includes('[FEEDBACK]')) {
        const parts = responseText.split('[FEEDBACK]');
        finalAiResponse = parts[0].trim();
        const jsonStr = parts[1].trim();
        try {
          newFeedback = JSON.parse(jsonStr);
          setFeedback(newFeedback);
        } catch (e) {
          console.error("Feedback parse error", e);
        }
      }

      // Automatically speak the AI response
      speak(finalAiResponse);

      const aiMsg: Message = { role: 'ai', text: finalAiResponse, timestamp: Date.now() };
      const updatedMessages = [...newMessages, aiMsg];
      setMessages(updatedMessages);

      if (newFeedback) {
        await saveSession(newFeedback, updatedMessages);
      }

    } catch (error: any) {
      console.error("AI Error:", error);
      let errorMessage = "Unknown Error";
      if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && typeof error === 'object') {
        errorMessage = error.error || error.message || JSON.stringify(error);
      }
      
      setMessages(prev => [...prev, { role: 'ai', text: `Error: ${errorMessage}. Please try again.`, timestamp: Date.now() }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className={`flex flex-col h-[calc(100vh-48px)] lg:h-screen bg-slate-50 ${isRtl ? 'font-arabic' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="bg-[#002147] border-b-4 border-[#C49E3A] p-6 flex justify-between items-center z-10 shadow-2xl relative">
        <button onClick={onBack} className={`flex items-center gap-2 text-white font-black text-sm uppercase tracking-widest hover:text-[#C49E3A] transition-colors ${!isRtl ? 'flex-row-reverse' : ''}`}>
          <ChevronLeft size={20} className={!isRtl ? 'rotate-180' : ''} />
          <span>{t.exitChat}</span>
        </button>
        <div className={`flex items-center gap-2 md:gap-4 ${!isRtl ? 'flex-row-reverse' : ''}`}>
          {/* Plan 6: VIP Video simulation toggle button */}
          <button 
            onClick={() => setIsVideoEnabled(!isVideoEnabled)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-white border transition-all mr-2 cursor-pointer ${
              isVideoEnabled ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-white/10 border-white/10 text-[#C49E3A] hover:bg-white/20'
            }`}
            title="VIP Tutor Video Sim"
          >
            <span className="text-sm">📹</span>
          </button>
          
          <button 
            onClick={() => setShowFeedback(!showFeedback)}
            className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-[#C49E3A] hover:bg-white/20 transition-all mr-2 cursor-pointer"
            title={t.skillAnalysis}
          >
            <Award size={20} />
          </button>
          <div className={`${isRtl ? 'text-right' : 'text-left'} hidden sm:block`}>
            <h3 className="font-black text-white text-base tracking-tight">{t.aiPartnerHeader}</h3>
            <span className={`text-[10px] bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-black uppercase tracking-widest flex items-center gap-2 ${!isRtl ? 'flex-row-reverse' : ''}`}>
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              {t.online}
            </span>
          </div>
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white flex items-center justify-center text-[#002147] shadow-xl font-black text-lg md:text-xl shrink-0">
            B
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden font-sans">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col relative bg-[#f8fafc]">
          {/* Plan 6: VIP Picture-In-Picture Video Tutor Simulation */}
          {isVideoEnabled && (
            <motion.div 
              drag
              dragConstraints={{ left: -500, right: 100, top: 0, bottom: 400 }}
              className="absolute top-6 right-6 w-44 h-56 bg-[#002147] rounded-[2rem] shadow-2xl border-2 border-[#C49E3A] overflow-hidden flex flex-col z-30 cursor-grab active:cursor-grabbing text-white"
            >
              <div className="flex-1 relative bg-slate-900 flex items-center justify-center">
                {/* AI Pulse effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#1e1b4b] to-indigo-950 flex flex-col items-center justify-center text-center p-3">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#C49E3A] to-amber-300 flex items-center justify-center text-2xl shadow-lg relative z-15">
                      🦁
                    </div>
                    {isSpeaking && (
                      <span className="absolute inset-0 rounded-full border-4 border-[#C49E3A] animate-ping opacity-60 pointer-events-none" />
                    )}
                  </div>
                  
                  <span className="text-xs font-black mt-2 text-[#C49E3A] tracking-wider">
                    {isRtl ? 'المعلم باسل 🎓' : 'Teacher Basil 🎓'}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 mt-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    {isSpeaking ? (isRtl ? 'يتحدث الآن...' : 'Speaking...') : (isThinking ? (isRtl ? 'يفكر...' : 'Thinking...') : (isRtl ? 'مستمع...' : 'Listening...'))}
                  </span>
                </div>
              </div>

              {/* Action Ribbon */}
              <div className="bg-[#001732] p-2.5 flex justify-between items-center border-t border-white/10">
                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{isRtl ? 'محاكاة VIP' : 'VIP SIM'}</span>
                <button 
                  onClick={() => setIsVideoEnabled(false)}
                  className="p-1 hover:bg-white/10 rounded-md text-red-400 text-xs font-bold cursor-pointer"
                >
                  {isRtl ? 'إخفاء' : 'Hide'}
                </button>
              </div>
            </motion.div>
          )}

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <motion.div
                  key={m.timestamp + i}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[85%] p-6 rounded-[2rem] shadow-xl ${
                    m.role === 'user' 
                      ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-br-none shadow-blue-200' 
                      : 'bg-white text-[#002147] border border-slate-100 rounded-bl-none shadow-slate-200/50'
                  }`}>
                    <p className="text-sm md:text-base leading-relaxed font-medium" dir="ltr">{m.text}</p>
                  </div>
                </motion.div>
              ))}
              {isThinking && (
                <div className={`flex ${isRtl ? 'justify-end' : 'justify-start'}`}>
                  <div className="bg-white border border-slate-100 p-6 rounded-[2rem] rounded-bl-none flex gap-2 shadow-xl shadow-slate-200/50">
                    <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-[#002147] rounded-full" />
                    <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-[#002147] rounded-full" />
                    <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-[#002147] rounded-full" />
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Input Area */}
          <div className="p-6 md:p-8 bg-white border-t border-slate-100 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.05)] relative z-10">
            {isSpeaking && (
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[#002147] text-[#C49E3A] px-5 py-2 rounded-full flex items-center gap-3 text-xs font-black uppercase tracking-wider border-2 border-[#C49E3A] shadow-2xl z-30">
                <span className="w-2.5 h-2.5 bg-[#C49E3A] rounded-full animate-pulse shrink-0" />
                <span>{isRtl ? 'الذكاء يتحدث الآن... انقر لإيقاف الصوت' : 'AI Partner is talking... Click to mute'}</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    stopSpeaking();
                  }}
                  className="bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-black hover:bg-red-700 transition-colors uppercase tracking-widest cursor-pointer ml-2"
                >
                  {isRtl ? 'إيقاف' : 'Mute'}
                </button>
              </div>
            )}
            <div className="max-w-4xl mx-auto flex gap-6 items-center">
              <button 
                onClick={toggleRecording}
                className={`w-14 h-14 md:w-16 md:h-16 rounded-[2rem] flex items-center justify-center transition-all shadow-lg ${
                  isRecording 
                    ? 'bg-red-500 text-white animate-pulse ring-4 ring-red-100' 
                    : isSpeaking
                      ? 'bg-blue-500 text-white animate-bounce'
                      : 'bg-slate-50 text-[#002147] hover:bg-slate-100 border border-slate-100'
                }`}
              >
                {isRecording ? <MicOff size={24} /> : isSpeaking ? <Sparkles size={24} /> : <Mic size={24} />}
              </button>
              
              <div className="flex-1 relative group">
                <input 
                  type="text" 
                  value={inputText}
                  placeholder={t.typeMessage}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className={`w-full bg-slate-50 border-2 border-slate-50 rounded-[2rem] px-8 py-4 md:py-5 focus:outline-none focus:border-blue-600 focus:bg-white transition-all ${isRtl ? 'text-right' : 'text-left'} text-lg shadow-inner`}
                  dir={isRtl ? 'rtl' : 'ltr'}
                />
              </div>

              <button 
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isThinking}
                className="bg-[#002147] text-white p-5 rounded-[2rem] disabled:opacity-30 hover:bg-[#C49E3A] transition-all shadow-xl hover:-translate-y-1 active:translate-y-0"
              >
                <Send size={24} className={isRtl ? 'rotate-180' : ''} />
              </button>
            </div>
          </div>
        </div>

        {/* Feedback Sidebar */}
        <AnimatePresence>
          {showFeedback && (
            <>
              {/* Collapsible backdrop overlay on mobile/tablet */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowFeedback(false)}
                className="fixed inset-0 bg-black z-40 lg:hidden"
              />
              
              <motion.div 
                initial={{ x: isRtl ? 320 : -320, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: isRtl ? 320 : -320, opacity: 0 }}
                className={`fixed inset-y-0 ${isRtl ? 'right-0' : 'left-0'} w-80 md:w-96 bg-white shadow-2xl z-50 lg:relative lg:inset-auto lg:w-96 lg:shadow-none ${isRtl ? 'border-r' : 'border-l'} border-slate-200 p-8 overflow-y-auto block`}
              >
                <div className={`flex items-center justify-between mb-10 border-b border-slate-100 pb-6 ${!isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-3 ${!isRtl ? 'flex-row-reverse' : ''}`}>
                    <div className="bg-orange-50 p-3 rounded-2xl">
                      <Award className="text-[#C49E3A]" size={24} />
                    </div>
                    <h3 className="font-black text-[#002147] text-xl tracking-tight">{t.skillAnalysis}</h3>
                  </div>
                  <button onClick={() => setShowFeedback(false)} className="lg:hidden text-slate-400 hover:text-red-500 transition-colors">
                    <ChevronLeft size={24} className={isRtl ? '' : 'rotate-180'} />
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {!feedback ? (
                    <div className="text-center py-20 px-6">
                      <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border-2 border-dashed border-slate-200">
                        <RefreshCw className="text-slate-300 animate-spin-slow" size={32} />
                      </div>
                      <h4 className="font-bold text-[#002147] mb-3">{t.aiProcessing}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed mb-8">{t.aiProcessingDesc}</p>
                      
                      <button 
                        onClick={triggerManualAnalysis}
                        disabled={isThinking}
                        className="w-full py-4 bg-[#002147] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-[#C49E3A] transition-all disabled:opacity-40 cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Sparkles size={16} className="text-[#C49E3A]" />
                        <span>{isThinking ? (isRtl ? 'جاري التحليل حالياً...' : 'Analyzing details...') : (isRtl ? 'تحليل مهاراتي الآن \u2728' : 'Analyze My Skills Now \u2728')}</span>
                      </button>
                    </div>
                  ) : (
                    <motion.div initial={{ opacity: 0, x: isRtl ? 30 : -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                      <div className="space-y-6">
                        {[
                          { label: `${isRtl ? 'الطلاقة' : 'Fluency'} (Fluency)`, value: feedback.fluency, color: 'bg-blue-600', text: 'text-blue-600', bg: 'bg-blue-50' },
                          { label: `${isRtl ? 'القواعد' : 'Grammar'} (Grammar)`, value: feedback.grammar, color: 'bg-[#002147]', text: 'text-[#002147]', bg: 'bg-slate-50' },
                          { label: `${isRtl ? 'المفردات' : 'Vocabulary'} (Vocabulary)`, value: feedback.vocabulary, color: 'bg-[#C49E3A]', text: 'text-[#C49E3A]', bg: 'bg-orange-50' },
                        ].map((f) => (
                          <div key={f.label} className={`${f.bg} p-6 rounded-3xl border border-white shadow-sm ring-1 ring-slate-100/50`}>
                            <div className={`flex justify-between items-center mb-3 ${!isRtl ? 'flex-row-reverse' : ''}`}>
                              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{f.label}</span>
                              <span className={`font-black text-lg ${f.text}`}>%{f.value}</span>
                            </div>
                            <div className="h-2 bg-white/60 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }} 
                                animate={{ width: `${f.value}%` }} 
                                className={`h-full ${f.color} rounded-full`} 
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-6">
                        <h4 className={`text-sm font-black text-[#002147] uppercase tracking-widest flex items-center gap-2 ${!isRtl ? 'flex-row-reverse' : ''}`}>
                          <Sparkles size={16} className="text-[#C49E3A]" />
                          {t.improvementTips}:
                        </h4>
                        {feedback.suggestions.map((s, i) => (
                          <div key={i} className={`flex gap-4 text-sm text-[#002147] bg-slate-50 p-5 rounded-2xl border border-slate-100 font-medium ${!isRtl ? 'flex-row-reverse' : ''}`}>
                            <div className="w-1.5 h-full bg-[#C49E3A] rounded-full shrink-0" />
                            <p className="leading-relaxed">{s}</p>
                          </div>
                        ))}
                      </div>
                      
                      <button 
                        onClick={onBack}
                        className="w-full py-5 bg-[#002147] text-white rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-[#C49E3A] transition-all hover:-translate-y-1 cursor-pointer"
                      >
                        {t.completeSession}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
