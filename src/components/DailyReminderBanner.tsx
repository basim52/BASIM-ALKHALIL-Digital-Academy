import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Clock, X, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

interface DailyReminderBannerProps {
  streakCount: number;
  reminderTime: string;
  lang?: 'ar' | 'en';
  onStartStudy: () => void;
}

export const DailyReminderBanner: React.FC<DailyReminderBannerProps> = ({
  streakCount,
  reminderTime,
  lang = 'ar',
  onStartStudy
}) => {
  const [dismissed, setDismissed] = useState(false);
  const isRtl = lang === 'ar';

  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        className={`w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-2xl sm:rounded-3xl p-4 sm:p-5 text-white shadow-lg shadow-orange-500/20 border-2 border-white/20 relative overflow-hidden ${
          isRtl ? 'font-arabic' : 'font-sans'
        }`}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shrink-0 shadow-inner">
              <span className="select-none animate-bounce-slow">⏰</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/25 text-white">
                  {isRtl ? `تذكير الموعد (${reminderTime})` : `Daily Alarm (${reminderTime})`}
                </span>
                <span className="text-xs font-black text-amber-100 flex items-center gap-1">
                  <Flame size={13} className="text-white animate-pulse" />
                  {streakCount > 0 ? (
                    isRtl ? `شعلتك الحالية: ${streakCount} يوم` : `Streak: ${streakCount} days`
                  ) : (
                    isRtl ? 'ابدأ شعلتك الأولى اليوم' : 'Start your streak today'
                  )}
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-black text-white mt-0.5">
                {isRtl
                  ? 'وقت التعلم في أكاديمية باسم الخليل 📚 حان موعد جلستك اليومية!'
                  : 'Time to learn at Basim Alkhalil Academy 📚 Keep your streak alive!'}
              </h4>
              <p className="text-xs text-amber-50 font-medium">
                {isRtl
                  ? 'لم تكمل نشاطك لليوم بعد. أنجز درساً واحداً للحفاظ على استمرار الشعلة وزيادة رصيدك!'
                  : 'You haven\'t completed today\'s lesson yet. Complete 1 activity to keep your flame burning!'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
            <button
              onClick={onStartStudy}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-orange-600 hover:bg-amber-50 active:scale-95 font-black text-xs shadow-md transition-all cursor-pointer"
            >
              <span>{isRtl ? 'ابدأ التعلم الآن 🚀' : 'Start Learning 🚀'}</span>
              {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/15 transition-all cursor-pointer"
              title={isRtl ? 'إغلاق التنبيه' : 'Dismiss'}
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
