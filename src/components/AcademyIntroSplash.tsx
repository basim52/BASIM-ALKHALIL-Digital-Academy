import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { playAcademyIntroSound } from '../lib/audio';

interface AcademyIntroSplashProps {
  isRtl?: boolean;
  onFinish?: () => void;
  loadingMessage?: string;
  autoDismissDelayMs?: number; // Optional auto-dismiss after delay
}

export const AcademyIntroSplash: React.FC<AcademyIntroSplashProps> = ({
  isRtl = true,
  onFinish,
  loadingMessage,
  autoDismissDelayMs
}) => {
  const [stage, setStage] = useState<'initial' | 'boom' | 'glowing'>('initial');
  const soundTriggeredRef = useRef<boolean>(false);

  useEffect(() => {
    // Play the Netflix-style academy intro theme
    const triggerAudio = () => {
      if (soundTriggeredRef.current) return;
      soundTriggeredRef.current = true;
      try {
        playAcademyIntroSound(0.85).catch(() => {});
      } catch {
        // Safe catch
      }
    };

    const entryTimer = setTimeout(() => {
      setStage('boom');
      triggerAudio();
    }, 120);

    const glowTimer = setTimeout(() => {
      setStage('glowing');
    }, 450);

    // If browser autoplay policy requires user interaction, play on first pointerdown
    const handleInteraction = () => {
      triggerAudio();
    };
    window.addEventListener('pointerdown', handleInteraction, { once: true });
    window.addEventListener('keydown', handleInteraction, { once: true });

    let dismissTimer: NodeJS.Timeout | null = null;
    if (autoDismissDelayMs && onFinish) {
      dismissTimer = setTimeout(() => {
        onFinish();
      }, autoDismissDelayMs);
    }

    return () => {
      clearTimeout(entryTimer);
      clearTimeout(glowTimer);
      window.removeEventListener('pointerdown', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      if (dismissTimer) clearTimeout(dismissTimer);
    };
  }, [autoDismissDelayMs, onFinish]);

  const handleFinish = () => {
    if (!soundTriggeredRef.current) {
      soundTriggeredRef.current = true;
      try {
        playAcademyIntroSound(0.85).catch(() => {});
      } catch {
        // Safe catch
      }
    }
    if (onFinish) {
      onFinish();
    }
  };

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-radial from-[#002147] via-[#001733] to-[#000b1a] text-white select-none"
    >
      {/* Cinematic Golden Light Rays / Starburst Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-amber-500/20 via-yellow-300/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-400/20 rounded-full blur-2xl" />
      </div>

      {/* Main Centerpiece - Clean Written Presentation */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-lg">
        {/* The Golden Crest */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 15 }}
          animate={{ 
            scale: stage === 'boom' ? 1.05 : 1, 
            opacity: 1, 
            y: 0 
          }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 22,
            duration: 0.6 
          }}
          className="relative mb-6"
        >
          {/* Outer Golden Aura */}
          <div className="absolute -inset-3 bg-gradient-to-r from-amber-400/30 via-yellow-300/50 to-amber-500/30 rounded-3xl blur-xl opacity-75 transition duration-500 animate-pulse" />
          
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-b from-[#002f66] to-[#001738] border-2 border-[#C49E3A] flex items-center justify-center shadow-[0_0_40px_rgba(196,158,58,0.45)]">
            <span className="font-serif font-black text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFF2B2] via-[#F3C048] to-[#C49E3A] drop-shadow-[0_2px_10px_rgba(243,192,72,0.8)] tracking-tight">
              B
            </span>

            {/* Sparkle badge */}
            <div className="absolute -top-2 -right-2 bg-amber-400 text-slate-950 p-1 rounded-full shadow-lg">
              <Sparkles size={14} className="animate-spin" style={{ animationDuration: '6s' }} />
            </div>
          </div>
        </motion.div>

        {/* Written Academy Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-2"
        >
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-100 drop-shadow-sm font-serif">
            {isRtl ? 'أكاديمية باسم الخليل الرقمية' : 'Basim Al Khalil Digital Academy'}
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/80 font-medium tracking-wide">
            {isRtl ? 'بوابة التميز والطلاقة الأكاديمية الشاملة 🌟' : 'Gateway to Academic Excellence & Fluency 🌟'}
          </p>
        </motion.div>

        {/* Written Loading Indicator and Progress Bar */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: '100%' }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="mt-8 w-48 sm:w-64 max-w-xs space-y-2.5"
        >
          <div className="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden border border-amber-400/20 shadow-inner">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.6, 
                ease: "easeInOut" 
              }}
              className="h-full w-1/2 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full shadow-[0_0_12px_#fbbf24]"
            />
          </div>
          <p className="text-[12px] text-amber-300/80 font-medium text-center">
            {loadingMessage || (isRtl ? 'جارٍ افتتاح منصة الأكاديمية...' : 'Launching Academy Experience...')}
          </p>
        </motion.div>

        {/* Action Button if onFinish available */}
        {onFinish && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6"
          >
            <button
              type="button"
              onClick={handleFinish}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <span>{isRtl ? 'دخول الأكاديمية' : 'Enter Academy'}</span>
              <ArrowIcon size={14} />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
