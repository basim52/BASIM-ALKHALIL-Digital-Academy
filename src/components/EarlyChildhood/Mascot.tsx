import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface MascotProps {
  mood: 'happy' | 'thinking' | 'celebrating' | 'idle';
  isRtl: boolean;
}

export const Mascot: React.FC<MascotProps> = ({ mood, isRtl }) => {
  const getEmoji = () => {
    switch (mood) {
      case 'happy': return '✨ 🦁 ✨';
      case 'celebrating': return '🎉 🦁 🎉';
      case 'thinking': return '🤔 🦁';
      default: return '🦁';
    }
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed bottom-8 ${isRtl ? 'left-8' : 'right-8'} z-50`}
    >
      <div className="relative group">
        {/* Chat Bubble */}
        <AnimatePresence>
          {mood !== 'idle' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className={`absolute bottom-full mb-4 ${isRtl ? 'left-0' : 'right-0'} bg-white px-4 py-2 rounded-2xl shadow-xl border border-slate-100 whitespace-nowrap`}
            >
              <p className="text-[10px] font-black uppercase text-oxford-navy">
                {mood === 'celebrating' ? (isRtl ? 'أحسنت صنعاً!' : 'Great Job!') : 
                 mood === 'thinking' ? (isRtl ? 'امممم...' : 'Hmm...') :
                 (isRtl ? 'أنت رائع!' : 'You are doing great!')}
              </p>
              <div className={`absolute top-full ${isRtl ? 'left-4' : 'right-4'} w-3 h-3 bg-white border-r border-b border-slate-100 rotate-45 -mt-[7px]`} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={mood === 'celebrating' ? {
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.2, 1]
          } : mood === 'thinking' ? {
            rotate: [0, 5, -5, 0],
          } : {
            y: [0, -5, 0]
          }}
          transition={{
            duration: mood === 'celebrating' ? 0.5 : 2,
            repeat: mood === 'celebrating' ? 2 : Infinity,
            ease: 'easeInOut'
          }}
          className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-[2rem] shadow-2xl border-4 border-amber-400 flex items-center justify-center text-3xl md:text-5xl cursor-pointer hover:scale-110 transition-transform relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent" />
          <span className="relative z-10">{getEmoji()}</span>
        </motion.div>

        {/* Glow */}
        <div className="absolute inset-0 bg-amber-400 rounded-[2rem] blur-2xl opacity-20 -z-10 animate-pulse" />
      </div>
    </motion.div>
  );
};
