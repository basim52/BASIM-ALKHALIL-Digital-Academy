import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Send, 
  Sparkles,
  Headset,
  Loader2,
  BrainCircuit,
  MessageCircle,
  Bell,
  XCircle,
  CheckCircle,
  Calendar,
  Mic,
  MicOff,
  Volume2,
  VolumeX
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

interface LessonAssistantProps {
  lessonTitle: string;
  lessonContent: string;
  isRtl: boolean;
}

export const LessonAssistant: React.FC<LessonAssistantProps> = ({ lessonTitle, lessonContent, isRtl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [isLiveReady, setIsLiveReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Clean up on unmount or mode toggle
  useEffect(() => {
    return () => {
      cleanupLiveMode();
    };
  }, []);

  const cleanupLiveMode = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (audioCtxRef.current) {
      if (audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(console.error);
      }
      audioCtxRef.current = null;
    }
    setIsLiveMode(false);
    setIsLiveReady(false);
    setIsLoading(false);
  };

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: inputText };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);
    setError(null);

    try {
      const resp = await fetch('/api/lesson/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: inputText,
          context: `Lesson Title: ${lessonTitle}\nContent: ${lessonContent}`
        })
      });
      if (!resp.ok) {
        throw new Error(`Server responded with ${resp.status}`);
      }

      const data = await resp.json();
      if (data.text) {
        setMessages(prev => [...prev, { role: 'assistant', text: data.text }]);
      }
    } catch (err: any) {
      console.error("Chat error:", err);
      setError(`${isRtl ? 'خطأ:' : 'Error:'} ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLiveMode = async () => {
    if (isLiveMode) {
      cleanupLiveMode();
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtxClass({ sampleRate: 16000 });
      audioCtxRef.current = audioCtx;
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = audioCtx.createMediaStreamSource(stream);
      
      const processor = audioCtx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      // More robust WebSocket URL construction
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const host = window.location.host;
      const url = `${protocol}//${host}/ws/live`;
      
      console.log(`[Assistant] Connecting to: ${url}`);
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("[Assistant] WebSocket connection opened");
        setIsLiveMode(true);
        ws.send(JSON.stringify({ 
          context: `Lesson: ${lessonTitle}. Content: ${lessonContent}`,
          start: true
        }));
      };

      ws.onmessage = async (event) => {
        try {
          const msg = JSON.parse(event.data);
          
          if (msg.status === 'ready') {
            console.log("[Assistant] Live session ready on server");
            setIsLiveReady(true);
            setIsLoading(false);
            
            // Start sending audio once ready
            source.connect(processor);
            processor.connect(audioCtx.destination);
            
            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmData = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                pcmData[i] = Math.max(-1, Math.min(1, inputData[i])) * 0x7FFF;
              }
              
              // Safe and efficient binary to base64
              const uint8 = new Uint8Array(pcmData.buffer);
              let binary = '';
              for (let i = 0; i < uint8.length; i++) {
                binary += String.fromCharCode(uint8[i]);
              }
              const base64Audio = btoa(binary);

              if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ audio: base64Audio }));
              }
            };
          }
          
          if (msg.audio) {
            playAudioChunk(msg.audio);
          }

          if (msg.text) {
             setMessages(prev => [...prev, { role: 'assistant', text: msg.text }]);
          }

          if (msg.error) {
            console.error("[Assistant] Server reported error:", msg.error);
            setError(msg.error);
            cleanupLiveMode();
          }
        } catch (e) {
          console.error("[Assistant] Error processing websocket message:", e);
        }
      };

      ws.onerror = (e) => {
        console.error("[Assistant] WebSocket error details:", e);
        setError(isRtl ? "خطأ في الاتصال بالمساعد المباشر. يرجى المحاولة مرة أخرى." : "Error connecting to Live Assistant. Please try again.");
        cleanupLiveMode();
      };

      ws.onclose = (event) => {
        console.log(`[Assistant] WebSocket closed. Code: ${event.code}, Clean: ${event.wasClean}`);
        cleanupLiveMode();
      };

    } catch (err: any) {
      console.error("[Assistant] Live mode initialization error:", err);
      setError(isRtl ? "لم نتمكن من الوصول للميكروفون أو بدء الجلسة" : "Could not access microphone or start session");
      cleanupLiveMode();
    }
  };

  const playAudioChunk = async (base64Audio: string) => {
    if (!audioCtxRef.current) return;
    
    try {
      const binaryString = atob(base64Audio);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      const audioBuffer = await audioCtxRef.current.decodeAudioData(bytes.buffer);
      const source = audioCtxRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioCtxRef.current.destination);
      
      const now = audioCtxRef.current.currentTime;
      if (nextStartTimeRef.current < now) {
        nextStartTimeRef.current = now;
      }
      
      source.start(nextStartTimeRef.current);
      nextStartTimeRef.current += audioBuffer.duration;
    } catch (err) {
      console.error("Audio playback error:", err);
    }
  };

  const welcomeText = isRtl 
    ? `أهلاً بك! أنا مساعدك الذكي لدرس "${lessonTitle}". هل لديك أي استفسار حول المحتوى؟`
    : `Welcome! I'm your AI assistant for "${lessonTitle}". Do you have any questions about the content?`;

  return (
    <div className={`fixed bottom-6 ${isRtl ? 'left-6' : 'right-6'} z-[100]`} dir={isRtl ? 'rtl' : 'ltr'}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[calc(100vw-2.5rem)] sm:w-[400px] md:w-[450px] h-[600px] max-h-[85vh] bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-200 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#002147] p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#C49E3A] rounded-xl flex items-center justify-center text-[#002147]">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="text-white font-black text-xs sm:text-sm uppercase tracking-widest">{isRtl ? 'المساعد المباشر' : 'Live Assistant'}</h3>
                  <p className="text-[#C49E3A] text-[9px] sm:text-[10px] uppercase tracking-wider font-bold">Live Learning Support</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Live Mode Toggle Bar */}
            <div className="bg-slate-50 border-b border-slate-100 p-3 flex flex-col sm:flex-row items-center justify-between px-6 gap-2 sm:gap-0">
               <div className="flex items-center gap-2">
                 <div className={`w-2 h-2 rounded-full ${isLiveMode ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`} />
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                   {isLiveMode ? (isRtl ? 'الوضع المباشر نشط' : 'Live Mode Active') : (isRtl ? 'محادثة كتابية' : 'Text Chat')}
                 </span>
               </div>
               <button 
                 onClick={toggleLiveMode}
                 className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all min-h-[44px] sm:min-h-0 ${
                   isLiveMode 
                     ? 'bg-red-500 text-white shadow-lg' 
                     : 'bg-[#002147]/5 text-[#002147] hover:bg-[#002147] hover:text-white'
                 }`}
               >
                 <Headset size={16} />
                 {isLiveMode ? (isRtl ? 'إيقاف المباشر' : 'Stop Live') : (isRtl ? 'بدء الوضع المباشر' : 'Start Live Mode')}
               </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 text-red-600 px-6 py-2 text-[10px] font-bold border-b border-red-100 italic">
                ⚠️ {error}
              </div>
            )}

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/30 no-scrollbar"
            >
              {messages.length === 0 && (
                <div className="text-center py-10 opacity-50">
                  <BrainCircuit size={48} className="mx-auto mb-4 text-[#002147]" />
                  <p className="text-sm text-slate-600 font-medium px-8">{welcomeText}</p>
                </div>
              )}
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[90%] sm:max-w-[85%] p-4 rounded-2xl shadow-sm ${
                    m.role === 'user' 
                      ? 'bg-[#002147] text-white rounded-br-none' 
                      : 'bg-white text-[#002147] border border-slate-100 rounded-bl-none'
                  }`}>
                    <div className="prose prose-sm prose-slate max-w-none prose-p:my-1">
                      <ReactMarkdown>{m.text}</ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              ))}
              {(isLoading || (isLiveMode && !isLiveReady)) && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 rounded-bl-none flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-[#002147]/40" />
                    <span className="text-[10px] font-black uppercase text-slate-300">
                      {isLiveMode ? 'Connecting Voice...' : 'Thinking...'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100">
               <div className="relative flex items-center gap-2">
                  <input 
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={isRtl ? 'اسأل أي شيء حول الدرس...' : 'Ask anything about the lesson...'}
                    className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#C49E3A] transition-all min-h-[44px]"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={isLoading || !inputText.trim() || isLiveMode}
                    className="w-12 h-12 bg-[#002147] text-white rounded-xl flex items-center justify-center hover:bg-[#C49E3A] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    <Send size={20} />
                  </button>
               </div>
               <p className="mt-2 text-[8px] text-center text-slate-400 uppercase tracking-widest font-black">
                 {isRtl ? 'المساعد التعليمي الذكي - مدرسة باسم الخليل' : 'Basim Alkhalil AI Academic Assistant'}
               </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        id="live-assistant-toggle"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 bg-[#002147] text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,33,71,0.3)] group relative border-4 border-white ${isOpen ? 'rotate-90' : ''} transition-all`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <X key="close" size={28} />
          ) : (
            <div key="open" className="relative">
              <BrainCircuit size={28} />
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-[#C49E3A] rounded-full border-2 border-[#002147]" 
              />
            </div>
          )}
        </AnimatePresence>
        
        {/* Tooltip */}
        {!isOpen && (
          <div className={`absolute ${isRtl ? 'right-full mr-4' : 'left-full ml-4'} top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-xl shadow-xl border border-slate-100 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}>
            <p className="text-[#002147] font-black text-[10px] uppercase tracking-widest">
              {isRtl ? 'اسأل المساعد' : 'Ask AI Assistant'}
            </p>
          </div>
        )}
      </motion.button>
    </div>
  );
};
