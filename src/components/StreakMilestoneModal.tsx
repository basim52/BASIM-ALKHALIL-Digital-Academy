import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trophy, Flame, X, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MILESTONE_MESSAGES } from '../services/streakService';

interface StreakMilestoneModalProps {
  milestone: number | null;
  currentStreak: number;
  isOpen: boolean;
  onClose: () => void;
  lang?: 'ar' | 'en';
}

export const StreakMilestoneModal: React.FC<StreakMilestoneModalProps> = ({
  milestone,
  currentStreak,
  isOpen,
  onClose,
  lang = 'ar'
}) => {
  const isRtl = lang === 'ar';

  useEffect(() => {
    if (isOpen && milestone) {
      // Launch celebratory confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff9600', '#ffc800', '#58cc02', '#002147', '#C49E3A']
        });
        const timeout = setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff9600', '#ff4b4b', '#ffc800']
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff9600', '#ff4b4b', '#ffc800']
          });
        }, 300);
        return () => clearTimeout(timeout);
      } catch (e) {
        console.error('Confetti effect notice:', e);
      }
    }
  }, [isOpen, milestone]);

  if (!isOpen || !milestone) return null;

  const info = MILESTONE_MESSAGES[milestone] || {
    title: `🔥 إنجاز باهر! ${milestone} يوماً من التعلم`,
    desc: `تهانينا الحارة! لقد حققت ${milestone} يوماً متتالياً من التعلم والمثابرة في أكاديمية باسم الخليل الرقمية.`,
    icon: '🔥'
  };

  const handleShare = () => {
    const text = `🎉 حققت إنجاز ${milestone} يوماً متواصلاً من التعلم في أكاديمية باسم الخليل الرقمية! 🔥📚\nانضم إلينا وطور لغتك كل يوم:\n${typeof window !== 'undefined' ? window.location.origin : 'https://basim-academy.com'}`;
    if (navigator.share) {
      navigator.share({ title: info.title, text }).catch(() => {});
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  return (
    <AnimatePresence>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md ${isRtl ? 'font-arabic' : 'font-sans'}`}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-gradient-to-b from-[#002147] via-[#002b5c] to-[#011b38] rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 text-white shadow-2xl border-2 border-[#C49E3A]/40 overflow-hidden text-center"
        >
          {/* Background Ambient Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#C49E3A]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 sm:top-5 sm:left-5 text-white/60 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all cursor-pointer z-10"
            aria-label="إغلاق"
          >
            <X size={18} />
          </button>

          {/* Milestone Badge Flame Graphic */}
          <div className="relative mx-auto mt-2 mb-4 w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              className="w-full h-full rounded-full bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-300 p-1 shadow-lg shadow-orange-500/30 flex items-center justify-center"
            >
              <div className="w-full h-full rounded-full bg-[#002147] flex flex-col items-center justify-center border-2 border-white/20">
                <span className="text-4xl sm:text-5xl select-none animate-bounce-slow">🔥</span>
                <span className="text-xl sm:text-2xl font-black text-[#ffc800] tracking-tight mt-1 font-mono">
                  {milestone}
                </span>
                <span className="text-[10px] font-bold text-white/80">
                  {isRtl ? 'يوم متواصل' : 'Days Streak'}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Title and Message */}
          <div className="space-y-2 mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-bold text-[#ffc800]">
              <Sparkles size={14} className="animate-spin-slow text-[#ffc800]" />
              <span>{isRtl ? 'إنجاز شعلة التعلم الأسطورية' : 'Streak Milestone Unlocked!'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
              {info.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-sm mx-auto">
              {info.desc}
            </p>
          </div>

          {/* Summary Stats pill */}
          <div className="grid grid-cols-2 gap-3 mb-6 bg-white/5 border border-white/10 rounded-2xl p-3">
            <div className="text-center">
              <span className="text-[10px] text-white/60 block font-bold">{isRtl ? 'الشعلة الحالية' : 'Current'}</span>
              <span className="text-lg font-black text-[#ff9600]">🔥 {currentStreak} {isRtl ? 'يوم' : 'd'}</span>
            </div>
            <div className="text-center border-r border-white/10">
              <span className="text-[10px] text-white/60 block font-bold">{isRtl ? 'الهدف القادم' : 'Next Target'}</span>
              <span className="text-lg font-black text-amber-300">
                🎯 {[3, 7, 14, 30, 60, 100].find((m) => m > currentStreak) || 100}+ {isRtl ? 'يوم' : 'd'}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-xs sm:text-sm py-3 px-4 rounded-xl sm:rounded-2xl shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <Share2 size={16} />
              <span>{isRtl ? 'مشاركة الإنجاز 📲' : 'Share Milestone 📲'}</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2 bg-[#C49E3A] hover:bg-[#d8b046] text-[#002147] font-black text-xs sm:text-sm py-3 px-4 rounded-xl sm:rounded-2xl shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <Trophy size={16} />
              <span>{isRtl ? 'متابعة التعلم والتألق 🚀' : 'Keep Learning 🚀'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
