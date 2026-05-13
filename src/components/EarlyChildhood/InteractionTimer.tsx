import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Mic, MicOff, AlertCircle } from 'lucide-react';

interface InteractionTimerProps {
  remainingMinutes: number;
  onTimeUp: () => void;
  onTick: (remainingSeconds: number) => void;
}

export const InteractionTimer: React.FC<InteractionTimerProps> = ({ 
  remainingMinutes, 
  onTimeUp,
  onTick
}) => {
  const [secondsLeft, setSecondsLeft] = useState(remainingMinutes * 60);
  const [isTalking, setIsTalking] = useState(false);
  const [inactiveTime, setInactiveTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(Date.now());

  useEffect(() => {
    // Initialize Audio Context for Silence Detection
    const initAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        const source = audioContextRef.current.createMediaStreamSource(stream);
        source.connect(analyserRef.current);
        
        analyserRef.current.fftSize = 256;
        const bufferLength = analyserRef.current.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);
        
        detectSilence();
      } catch (err) {
        console.error("Microphone access denied:", err);
      }
    };

    const detectSilence = () => {
      if (!analyserRef.current || !dataArrayRef.current) return;
      
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      
      // Calculate average volume
      let sum = 0;
      for (let i = 0; i < dataArrayRef.current.length; i++) {
        sum += dataArrayRef.current[i];
      }
      const averageVolume = sum / dataArrayRef.current.length;
      
      const threshold = 15; // Sensitivity threshold
      const talking = averageVolume > threshold;
      
      setIsTalking(talking);
      
      if (talking) {
        setInactiveTime(0);
      } else {
        setInactiveTime(prev => prev + (1/60)); // Roughly per frame at 60fps
      }

      animationFrameRef.current = requestAnimationFrame(detectSilence);
    };

    initAudio();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  useEffect(() => {
    // Main Countdown Logic
    const timer = setInterval(() => {
      const now = Date.now();
      const delta = (now - lastTickRef.current) / 1000;
      lastTickRef.current = now;

      // Logic: Pause if inactive for > 30 seconds
      if (inactiveTime >= 30) {
        setIsPaused(true);
        return;
      }

      setIsPaused(false);

      if (secondsLeft > 0) {
        const newSeconds = Math.max(0, secondsLeft - delta);
        setSecondsLeft(newSeconds);
        onTick(newSeconds);
        
        if (newSeconds <= 0) {
          onTimeUp();
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft, inactiveTime, onTimeUp, onTick]);

  const displayMinutes = Math.floor(secondsLeft / 60);
  const displaySeconds = Math.floor(secondsLeft % 60);

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col items-end gap-2 pointer-events-none">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`flex items-center gap-3 px-6 py-3 rounded-full shadow-2xl border-2 transition-colors ${
          secondsLeft < 60 ? 'bg-red-50 border-red-200 text-red-600' : 
          isPaused ? 'bg-slate-50 border-slate-200 text-slate-400' :
          'bg-white border-emerald-100 text-emerald-600'
        }`}
      >
        <div className="relative">
          <Clock className={`w-5 h-5 ${isPaused ? '' : 'animate-spin-slow'}`} />
          {isTalking && (
             <motion.div 
               animate={{ scale: [1, 1.5, 1] }} 
               transition={{ repeat: Infinity, duration: 1 }}
               className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full" 
             />
          )}
        </div>
        
        <div className="flex flex-col">
          <span className="text-xl font-black tabular-nums leading-none">
            {displayMinutes}:{displaySeconds.toString().padStart(2, '0')}
          </span>
          <span className="text-[8px] font-bold uppercase tracking-widest opacity-70">
            {isPaused ? 'إيقاف مؤقت (صمت)' : 'رصيد الوقت النشط'}
          </span>
        </div>

        {isPaused ? <MicOff size={16} /> : <Mic size={16} className={isTalking ? 'animate-bounce' : ''} />}
      </motion.div>

      <AnimatePresence>
        {isPaused && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-amber-50 border border-amber-100 px-4 py-2 rounded-xl text-amber-700 flex items-center gap-2"
          >
            <AlertCircle size={14} />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              العداد متوقف بسبب الصمت.. تكلم لتستمر!
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
