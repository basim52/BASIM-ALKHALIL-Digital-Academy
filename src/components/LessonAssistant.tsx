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
  const [isRecording, setIsRecording] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);

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
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLiveMode = async () => {
    if (!isLiveMode) {
      // Start Live Mode
      try {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const ws = new WebSocket(`${protocol}//${window.location.host}/live`);
        wsRef.current = ws;

        ws.onopen = () => {
          ws.send(JSON.stringify({ context: `Lesson: ${lessonTitle}. Content: ${lessonContent}` }));
          setIsLiveMode(true);
          startRecording();
        };

        ws.onmessage = (event) => {
          const msg = JSON.parse(event.data);
          if (msg.audio) {
            playAudio(msg.audio);
          }
          if (msg.text) {
            // Optionally update message history with transcript
            setMessages(prev => {
               // Only add if last message is not assistant or different text
               const last = prev[prev.length - 1];
               if (last?.role === 'assistant') {
                 const newMessages = [...prev];
                 newMessages[newMessages.length-1] = { role: 'assistant', text: msg.text };
                 return newMessages;
               }
               return [...prev, { role: 'assistant', text: msg.text }];
            });
          }
        };

        ws.onclose = () => {
          setIsLiveMode(false);
          stopRecording();
        };

      } catch (err) {
        console.error("Failed to start Live Mode:", err);
      }
    } else {
      // Stop Live Mode
      wsRef.current?.close();
      setIsLiveMode(false);
      stopRecording();
    }
  };

  const startRecording = async () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext({ sampleRate: 16000 });
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = audioCtxRef.current.createMediaStreamSource(stream);
      const processor = audioCtxRef.current.createScriptProcessor(4096, 1, 1);
      
      processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        // Convert to PCM int16 or just send as float if server handles it.
        // Guidelines say: pcmToBase64(e.inputBuffer.getChannelData(0))
        const pcm16 = float32ToInt16(inputData);
        const base64 = arrayBufferToBase64(pcm16.buffer);
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({ audio: base64 }));
        }
      };

      source.connect(processor);
      processor.connect(audioCtxRef.current.destination);
      processorRef.current = processor;
      setIsRecording(true);
    } catch (err) {
      console.error("Mic error:", err);
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
      buf[l] = Math.min(1, buffer[l]) * 0x7FFF;
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
    
    // Simple scheduling
    const now = audioCtxRef.current.currentTime;
    if (nextStartTimeRef.current < now) nextStartTimeRef.current = now;
    source.start(nextStartTimeRef.current);
    nextStartTimeRef.current += buffer.duration;
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
            className="mb-4 w-[350px] md:w-[450px] h-[600px] max-h-[80vh] bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-200 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-oxford-navy p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-oxford-gold rounded-xl flex items-center justify-center text-oxford-navy">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="text-white font-black text-sm uppercase tracking-widest">AI Lesson Tutor</h3>
                  <p className="text-oxford-gold text-[10px] uppercase tracking-wider font-bold">Powered by Gemini</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Live Mode Toggle Bar */}
            <div className="bg-slate-50 border-b border-slate-100 p-3 flex items-center justify-between px-6">
               <div className="flex items-center gap-2">
                 <div className={`w-2 h-2 rounded-full ${isLiveMode ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`} />
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                   {isLiveMode ? (isRtl ? 'الوضع المباشر نشط' : 'Live Mode Active') : (isRtl ? 'محادثة كتابية' : 'Text Chat')}
                 </span>
               </div>
               <button 
                 onClick={toggleLiveMode}
                 className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                   isLiveMode 
                     ? 'bg-red-500 text-white shadow-lg' 
                     : 'bg-oxford-navy/5 text-oxford-navy hover:bg-oxford-navy hover:text-white'
                 }`}
               >
                 {isLiveMode ? <Headset size={14} /> : <Headset size={14} />}
                 {isLiveMode ? (isRtl ? 'إيقاف المباشر' : 'Stop Live') : (isRtl ? 'بدء الوضع المباشر' : 'Start Live Mode')}
               </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30 no-scrollbar"
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
                  <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
                    m.role === 'user' 
                      ? 'bg-oxford-navy text-white rounded-br-none' 
                      : 'bg-white text-oxford-navy border border-slate-100 rounded-bl-none'
                  }`}>
                    <div className="prose prose-sm prose-slate max-w-none">
                      <ReactMarkdown>{m.text}</ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 rounded-bl-none flex gap-2">
                    <Loader2 size={16} className="animate-spin text-oxford-navy/40" />
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
                    className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 font-tajawal text-sm focus:outline-none focus:ring-2 focus:ring-oxford-gold transition-all"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={isLoading || !inputText.trim()}
                    className="w-12 h-12 bg-oxford-navy text-white rounded-xl flex items-center justify-center hover:bg-amber-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    <Send size={20} />
                  </button>
               </div>
               <p className="mt-2 text-[8px] text-center text-slate-400 uppercase tracking-widest font-black">
                 {isRtl ? 'المساعد التعليمي الذكي - مدرسة باسم الخليل' : 'Basim Alkhalil Smart Assistant'}
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
