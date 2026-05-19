import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface MascotProps {
  mood: 'happy' | 'thinking' | 'celebrating' | 'idle';
  isRtl: boolean;
  message?: string;
  onClick?: () => void;
  accessory?: string;
}

const ACCESSORIES: Record<string, string> = {
  'hero_cape': '🦸',
  'smart_glasses': '👓',
  'party_hat': '🥳',
  'crown': '👑',
  'artist_beret': '👨‍🎨',
  'explorer_hat': '🤠'
};

export const Mascot: React.FC<MascotProps> = ({ mood, isRtl, message, onClick, accessory }) => {
  const getEmoji = () => {
    switch (mood) {
      case 'happy': return '✨ 🦁 ✨';
      case 'celebrating': return '🎉 🦁 🎉';
      case 'thinking': return '🤔 🦁';
      default: return '🦁';
    }
  };

  const speak = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = isRtl ? 'ar-SA' : 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1.1; // Slightly higher for friendly mascot
    window.speechSynthesis.speak(utterance);
  };

  React.useEffect(() => {
    if (message && mood !== 'idle') {
      speak(message);
    }
  }, [message]);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed bottom-8 ${isRtl ? 'left-8' : 'right-8'} z-50`}
      onClick={onClick}
    >
      <div className="relative group">
        {/* Chat Bubble */}
        <AnimatePresence mode="wait">
          {(message || mood !== 'idle') && (
            <motion.div
              key={`mascot-msg-${mood}-${message?.substring(0, 20)}`}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className={`absolute bottom-full mb-6 ${isRtl ? 'left-0' : 'right-0'} bg-white px-6 py-4 rounded-[2rem] shadow-2xl border-4 border-amber-400 min-w-[200px] max-w-[300px]`}
            >
              <p className={`text-sm font-black text-[#002147] leading-relaxed ${isRtl ? 'font-arabic' : 'font-sans'}`}>
                {message || (mood === 'celebrating' ? (isRtl ? 'أحسنت صنعاً! أنا فخور بك!' : 'Great Job! I am proud of you!') : 
                 mood === 'thinking' ? (isRtl ? 'دعني أفكر... همممم' : 'Let me think... hmm...') :
                 (isRtl ? 'أنت رائع حقاً! استمر في التعلم!' : 'You are doing great! Keep learning!'))}
              </p>
              <div className={`absolute top-full ${isRtl ? 'left-8' : 'right-8'} w-6 h-6 bg-white border-r-4 border-b-4 border-amber-400 rotate-45 -mt-[14px]`} />
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
          <div className="relative z-10 flex flex-col items-center">
             {accessory && ACCESSORIES[accessory] && (
               <motion.span 
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 className="absolute -top-1 text-base md:text-2xl z-20"
               >
                 {ACCESSORIES[accessory]}
               </motion.span>
             )}
             <span>{getEmoji()}</span>
          </div>
        </motion.div>

        {/* Glow */}
        <div className="absolute inset-0 bg-amber-400 rounded-[2rem] blur-2xl opacity-20 -z-10 animate-pulse" />
      </div>
    </motion.div>
  );
};
