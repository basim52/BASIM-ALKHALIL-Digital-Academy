import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles,
  Headset,
  Loader2,
  BrainCircuit,
  MessageCircle,
  HelpCircle
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
  const isLiveReadyRef = useRef(false);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const audioQueueRef = useRef<AudioBufferSourceNode[]>([]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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
      const data = await resp.json();
      if (data.text) {
        setMessages(prev => [...prev, { role: 'assistant', text: data.text }]);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setError(isRtl ? 'عذراً، حدث خطأ في محاولة التواصل.' : 'Sorry, something went wrong with the chat.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearAudioQueue = () => {
    audioQueueRef.current.forEach(source => {
      try { source.stop(); } catch(e) {}
    });
    audioQueueRef.current = [];
    nextStartTimeRef.current = 0;
  };

  const toggleLiveMode = async () => {
    if (!isLiveMode) {
      // Start Live Mode
      setError(null);
      
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) {
        setError(isRtl ? 'متصفحك لا يدعم الصوت المتقدم' : 'Browser does not support required Audio API');
        return;
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError(isRtl ? 'متصفحك لا يدعم الوصول للميكروفون' : 'Browser does not support microphone access');
        return;
      }

      try {
        // Initialize AudioContext immediately on user gesture
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioCtxClass({ sampleRate: 16000 });
        }
        if (audioCtxRef.current.state === 'suspended') {
          await audioCtxRef.current.resume();
        }

        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const url = `${protocol}//${window.location.host}/ws/live`;
        console.log("Connecting to WebSocket:", url);
        const ws = new WebSocket(url);
        wsRef.current = ws;

        ws.onopen = () => {
          ws.send(JSON.stringify({ context: `Lesson: ${lessonTitle}. Content: ${lessonContent}` }));
        };

        ws.onmessage = (event) => {
          const msg = JSON.parse(event.data);
          
          if (msg.status === 'ready') {
            setIsLiveMode(true);
            setIsLiveReady(true);
            isLiveReadyRef.current = true;
            startRecording();
            return;
          }

          if (msg.error) {
            setError(msg.error);
            ws.close();
            return;
          }

          if (msg.audio) {
            playAudio(msg.audio);
          }

          if (msg.interrupted) {
            clearAudioQueue();
          }

          if (msg.text) {
            setMessages(prev => {
               const last = prev[prev.length - 1];
               if (last?.role === 'assistant') {
                 const newMessages = [...prev];
                 newMessages[newMessages.length-1] = { role: 'assistant', text: msg.text };
                 return newMessages;
               }
               return [...prev, { role: 'assistant', text: msg.text }];
            });
          }

          if (msg.userText) {
             // Optional: show what user said in real-time
             setMessages(prev => {
                const filtered = prev.filter(m => m.role === 'user' && m.text === msg.userText);
                if (filtered.length > 0) return prev;
                // Add temporary user message
                return [...prev, { role: 'user', text: msg.userText }];
             });
          }
        };

        ws.onerror = () => {
          setError(isRtl ? 'خطأ في الاتصال بالمباشر' : 'Live connection error');
          setIsLiveMode(false);
          setIsLiveReady(false);
        };

        ws.onclose = () => {
          setIsLiveMode(false);
          setIsLiveReady(false);
          isLiveReadyRef.current = false;
          stopRecording();
          clearAudioQueue();
        };

      } catch (err) {
        console.error("Failed to start Live Mode:", err);
        setError(isRtl ? 'لم نتمكن من بدء الوضع المباشر' : 'Failed to start Live Mode');
      }
    } else {
      // Stop Live Mode
      wsRef.current?.close();
      setIsLiveMode(false);
      setIsLiveReady(false);
      stopRecording();
    }
  };

  const startRecording = async () => {
    try {
      if (!audioCtxRef.current) return;
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = audioCtxRef.current.createMediaStreamSource(stream);
      const processor = audioCtxRef.current.createScriptProcessor(4096, 1, 1);
      
      processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        const pcm16 = float32ToInt16(inputData);
        const base64 = arrayBufferToBase64(pcm16.buffer);
        if (wsRef.current?.readyState === WebSocket.OPEN && isLiveReadyRef.current) {
          wsRef.current.send(JSON.stringify({ audio: base64 }));
        }
      };

      source.connect(processor);
      processor.connect(audioCtxRef.current.destination);
      processorRef.current = processor;
      setIsRecording(true);
    } catch (err: any) {
      console.error("Mic error:", err);
      setError(isRtl ? 'يجب السماح بالوصول للميكروفون' : 'Microphone access required');
      setIsLiveMode(false);
      setIsLiveReady(false);
      wsRef.current?.close();
    }
  };

  const stopRecording = () => {
    processorRef.current?.disconnect();
    setIsRecording(false);
  };

  const float32ToInt16 = (buffer: Float32Array) => {
    let l = buffer.length;
    let buf = new Int16Array(l);
    while (l--) {
      buf[l] = Math.max(-1, Math.min(1, buffer[l])) * 0x7FFF;
    }
    return buf;
  };

  const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const playAudio = async (base64: string) => {
    if (!audioCtxRef.current) return;
    try {
      const binary = window.atob(base64);
      const len = binary.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
      const pcm16 = new Int16Array(bytes.buffer);
      const float32 = new Float32Array(pcm16.length);
      for (let i = 0; i < pcm16.length; i++) float32[i] = pcm16[i] / 32768;

      const buffer = audioCtxRef.current.createBuffer(1, float32.length, 16000);
      buffer.getChannelData(0).set(float32);
      
      const source = audioCtxRef.current.createBufferSource();
      source.buffer = buffer;
      source.connect(audioCtxRef.current.destination);
      
      const now = audioCtxRef.current.currentTime;
      if (nextStartTimeRef.current < now) nextStartTimeRef.current = now;
      source.start(nextStartTimeRef.current);
      
      audioQueueRef.current.push(source);
      nextStartTimeRef.current += buffer.duration;
      
      source.onended = () => {
        audioQueueRef.current = audioQueueRef.current.filter(s => s !== source);
      };
    } catch(err) {
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
            <div className="bg-oxford-navy p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-oxford-gold rounded-xl flex items-center justify-center text-oxford-navy">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="text-white font-black text-xs sm:text-sm uppercase tracking-widest">AI Lesson Assistant</h3>
                  <p className="text-oxford-gold text-[9px] sm:text-[10px] uppercase tracking-wider font-bold">Live Learning Support</p>
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
                     : 'bg-oxford-navy/5 text-oxford-navy hover:bg-oxford-navy hover:text-white'
                 }`}
               >
                 <Headset size={16} />
                 {isLiveMode ? (isRtl ? 'إيقاف المباشر' : 'Stop Live') : (isRtl ? 'بدء الوضع المباشر' : 'Start Live Mode')}
               </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 text-red-600 px-6 py-2 text-[10px] font-tajawal font-bold border-b border-red-100">
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
                  <BrainCircuit size={48} className="mx-auto mb-4 text-oxford-navy" />
                  <p className="font-tajawal text-sm text-slate-600 font-medium px-8">{welcomeText}</p>
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
                      ? 'bg-oxford-navy text-white rounded-br-none' 
                      : 'bg-white text-oxford-navy border border-slate-100 rounded-bl-none'
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
                    <Loader2 size={16} className="animate-spin text-oxford-navy/40" />
                    <span className="text-[10px] font-black uppercase text-slate-300">
                      {isLiveMode ? 'Connecting Voice...' : 'Thinkng...'}
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
                    className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 font-tajawal text-sm focus:outline-none focus:ring-2 focus:ring-oxford-gold transition-all min-h-[44px]"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={isLoading || !inputText.trim() || isLiveMode}
                    className="w-12 h-12 bg-oxford-navy text-white rounded-xl flex items-center justify-center hover:bg-amber-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
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
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 bg-oxford-navy text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,33,71,0.3)] group relative border-4 border-white ${isOpen ? 'rotate-90' : ''} transition-all`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <X key="close" size={28} />
          ) : (
            <div key="open" className="relative">
              <MessageCircle size={28} />
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-oxford-gold rounded-full border-2 border-oxford-navy" 
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
