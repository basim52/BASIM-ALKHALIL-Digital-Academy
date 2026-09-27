import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Flame, Calendar, Clock, Bell, Shield, CheckCircle2, ChevronRight, Download, Sparkles } from 'lucide-react';
import {
  StreakData,
  DayDotStatus,
  getSevenDayStreakDots,
  downloadDailyReminderIcs,
  getRiyadhDateStr,
  getRiyadhTimeStr,
  STREAK_MILESTONES
} from '../services/streakService';

interface DailyStreakCardProps {
  userId: string;
  streak: StreakData;
  activeDatesSet?: Set<string>;
  lang?: 'ar' | 'en';
  onCelebrateMilestone?: (milestone: number) => void;
  onOpenLessons?: () => void;
}

export const DailyStreakCard: React.FC<DailyStreakCardProps> = ({
  userId,
  streak,
  activeDatesSet = new Set(),
  lang = 'ar',
  onCelebrateMilestone,
  onOpenLessons
}) => {
  const isRtl = lang === 'ar';
  const todayRiyadhStr = getRiyadhDateStr();
  const isStudiedToday = streak.lastActiveDate === todayRiyadhStr;

  // 7-day row of dots
  const dots: DayDotStatus[] = getSevenDayStreakDots(streak, activeDatesSet);

  // Reminder time state
  const storageKey = `dailyReminderTime_${userId}`;
  const [reminderTime, setReminderTime] = useState<string>(() => {
    try {
      return localStorage.getItem(storageKey) || '18:00';
    } catch {
      return '18:00';
    }
  });
  const [showReminderSettings, setShowReminderSettings] = useState(false);
  const [icsDownloaded, setIcsDownloaded] = useState(false);

  const handleSaveReminderAndDownloadIcs = () => {
    try {
      localStorage.setItem(storageKey, reminderTime);
      localStorage.setItem(`dailyReminderActive_${userId}`, 'true');
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }

    downloadDailyReminderIcs(reminderTime, typeof window !== 'undefined' ? window.location.origin : undefined);
    setIcsDownloaded(true);
    setTimeout(() => setIcsDownloaded(false), 3500);
  };

  return (
    <div
      className={`p-5 sm:p-6 bg-white border-2 border-b-4 border-slate-200 rounded-2xl sm:rounded-[2rem] shadow-sm relative overflow-hidden text-slate-800 ${isRtl ? 'font-arabic' : 'font-sans'}`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Top Background Gradient Effect */}
      <div className="absolute top-0 right-0 w-64 h-32 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />

      {/* Header: Flame Icon, Title & Longest/Freeze Stats */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
        <div className="flex items-center gap-3.5">
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 text-white flex items-center justify-center text-3xl shadow-md shadow-orange-500/20 shrink-0 border-b-3 border-orange-600">
            <span className="select-none animate-bounce-slow">🔥</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-black text-[#002147]">
                {isRtl ? 'شعلة التعلم اليومية' : 'Daily Learning Streak'}
              </h3>
              {isStudiedToday ? (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-black flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  {isRtl ? 'أُنجز اليوم' : 'Completed Today'}
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200 text-[10px] font-black animate-pulse flex items-center gap-1">
                  <span>⏳</span>
                  {isRtl ? 'بانتظار نشاط اليوم' : 'Awaiting Activity'}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {isRtl
                ? 'أكمل درساً أو نشاطاً واحداً على الأقل يومياً للحفاظ على استمرار الشعلة وتوقيت الرياض (Asia/Riyadh).'
                : 'Complete at least 1 lesson daily to maintain your streak (Asia/Riyadh timezone).'}
            </p>
          </div>
        </div>

        {/* Current & Longest Stat Pills */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          {/* Current streak */}
          <div className="flex-1 sm:flex-initial px-3.5 py-2 bg-orange-50/80 border border-orange-200 rounded-2xl text-center">
            <span className="text-[10px] text-orange-600 font-bold block uppercase tracking-wider">
              {isRtl ? 'الشعلة الحالية' : 'Current'}
            </span>
            <span className="text-base sm:text-lg font-black text-orange-600 font-mono flex items-center justify-center gap-1">
              <span>🔥</span>
              <span>{streak.current}</span>
              <span className="text-xs font-sans">{isRtl ? 'يوم' : 'days'}</span>
            </span>
          </div>

          {/* Longest streak */}
          <div className="flex-1 sm:flex-initial px-3.5 py-2 bg-amber-50/80 border border-amber-200 rounded-2xl text-center">
            <span className="text-[10px] text-amber-700 font-bold block uppercase tracking-wider">
              {isRtl ? 'أطول شعلة' : 'Longest'}
            </span>
            <span className="text-base sm:text-lg font-black text-amber-700 font-mono flex items-center justify-center gap-1">
              <span>⚡</span>
              <span>{streak.longest}</span>
              <span className="text-xs font-sans">{isRtl ? 'يوم' : 'days'}</span>
            </span>
          </div>

          {/* Freezes Left */}
          <div
            className="flex-1 sm:flex-initial px-3.5 py-2 bg-blue-50/80 border border-blue-200 rounded-2xl text-center"
            title={isRtl ? 'تجميد مجاني أسبوعياً يحمي شعلتك عند تفويت يوم واحد' : '1 Free weekly streak freeze protects missed days'}
          >
            <span className="text-[10px] text-blue-700 font-bold block uppercase tracking-wider">
              {isRtl ? 'تجميد الأيام' : 'Freezes'}
            </span>
            <span className="text-base sm:text-lg font-black text-blue-700 font-mono flex items-center justify-center gap-1">
              <span>🛡️</span>
              <span>{streak.freezesLeft}</span>
            </span>
          </div>
        </div>
      </div>

      {/* 7-DAY ROW OF DOTS (DONE / MISSED) */}
      <div className="my-4 p-4 bg-slate-50/80 border border-slate-200/80 rounded-2xl">
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="font-black text-slate-700 flex items-center gap-1.5">
            <Calendar size={14} className="text-slate-500" />
            {isRtl ? 'سجل الأيام السبعة الأخيرة (إنجاز / غياب):' : 'Last 7 Days (Done / Missed):'}
          </span>
          <span className="text-[11px] text-slate-400 font-bold">
            {isStudiedToday ? (
              <span className="text-emerald-600 font-black">{isRtl ? '✨ شعلة اليوم مشتعلة!' : '✨ Today is active!'}</span>
            ) : (
              <span className="text-orange-600 font-black">{isRtl ? '🔥 أكمل نشاطاً لتثبيت اليوم' : '🔥 Complete activity today'}</span>
            )}
          </span>
        </div>

        {/* The 7 Dots */}
        <div className="grid grid-cols-7 gap-2 sm:gap-3 text-center">
          {dots.map((d) => {
            const isDone = d.status === 'done';
            const isTodayPending = d.status === 'today-pending';

            return (
              <div key={d.dateStr} className="flex flex-col items-center gap-1.5">
                {/* Day label */}
                <span className={`text-[10px] sm:text-xs font-bold truncate ${d.isToday ? 'text-orange-600 font-black' : 'text-slate-500'}`}>
                  {d.isToday ? (isRtl ? 'اليوم' : 'Today') : d.shortDayAr}
                </span>

                {/* Dot Element */}
                <div
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all ${
                    isDone
                      ? 'bg-gradient-to-tr from-orange-500 to-amber-400 text-white shadow-md shadow-orange-500/25 scale-105'
                      : isTodayPending
                      ? 'bg-orange-50 border-2 border-dashed border-orange-400 text-orange-500 animate-pulse'
                      : 'bg-slate-200/70 text-slate-400 border border-slate-300'
                  }`}
                  title={`${d.dayLabelAr} (${d.dateStr}): ${isDone ? 'منجز' : isTodayPending ? 'بانتظار دراسة اليوم' : 'فائت'}`}
                >
                  {isDone ? (
                    <span className="text-sm sm:text-base select-none">🔥</span>
                  ) : isTodayPending ? (
                    <span className="text-xs font-black">؟</span>
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-slate-300" />
                  )}
                </div>

                {/* Sub status text */}
                <span className={`text-[9px] font-bold ${isDone ? 'text-emerald-600' : isTodayPending ? 'text-orange-500' : 'text-slate-400'}`}>
                  {isDone ? (isRtl ? 'تم' : 'Done') : isTodayPending ? (isRtl ? 'اليوم' : 'Today') : (isRtl ? 'فائت' : 'Missed')}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* MILESTONE BADGES ROW */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none text-xs">
        <span className="text-[11px] font-black text-slate-400 shrink-0 flex items-center gap-1">
          <Sparkles size={13} className="text-[#C49E3A]" />
          {isRtl ? 'المحطات:' : 'Milestones:'}
        </span>
        {STREAK_MILESTONES.map((m) => {
          const reached = streak.current >= m;
          return (
            <button
              key={`milestone-badge-${m}`}
              onClick={() => onCelebrateMilestone && onCelebrateMilestone(m)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-black transition-all shrink-0 cursor-pointer ${
                reached
                  ? 'bg-amber-100 text-amber-900 border border-amber-300 hover:scale-105 shadow-xs'
                  : 'bg-slate-100 text-slate-400 border border-slate-200 opacity-75 hover:opacity-100'
              }`}
              title={reached ? `انقر للاحتفال بمحطة ${m} يوماً!` : `الهدف: ${m} يوماً متواصلاً`}
            >
              <span>{reached ? '🏆' : '🔒'}</span>
              <span>{m} {isRtl ? 'يوم' : 'd'}</span>
            </button>
          );
        })}
      </div>

      {/* DAILY REMINDER: ذكّرني يوميًا (.ics & In-App) */}
      <div className="mt-4 pt-3.5 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Bell size={16} />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-800 flex items-center gap-1.5">
                <span>{isRtl ? 'ذكّرني يوميًا' : 'Daily Reminder'}</span>
                <span className="text-[10px] px-2 py-0.2 rounded-md bg-blue-50 text-blue-700 font-bold border border-blue-200">
                  {reminderTime}
                </span>
              </h4>
              <p className="text-[11px] text-slate-500 font-medium">
                {isRtl
                  ? 'اختر موعدك المفضل لتنزيل تنبيه تقويم دوري (.ics) وتلقي إشعار داخل الأكاديمية.'
                  : 'Pick daily study hour to download recurring calendar alarm (.ics) & in-app reminder.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowReminderSettings(!showReminderSettings)}
            className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 text-xs font-black transition-all cursor-pointer"
          >
            <Clock size={14} />
            <span>{showReminderSettings ? (isRtl ? 'إخفاء الإعدادات' : 'Close') : (isRtl ? 'تحديد الوقت والتقويم ⏰' : 'Pick Time ⏰')}</span>
          </button>
        </div>

        {/* Expanded Reminder Configuration Form */}
        {showReminderSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3 p-3.5 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-3"
          >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex items-center gap-2 flex-1">
                <label className="text-xs font-black text-slate-700 shrink-0">
                  {isRtl ? 'وقت التذكير اليومي:' : 'Daily reminder time:'}
                </label>
                <input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-black font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handleSaveReminderAndDownloadIcs}
                className="flex items-center justify-center gap-2 bg-[#002147] hover:bg-blue-900 active:scale-95 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer"
              >
                <Download size={14} />
                <span>{isRtl ? 'تحميل ملف التقويم (.ics) 📅' : 'Download Calendar .ics 📅'}</span>
              </button>
            </div>

            {icsDownloaded && (
              <div className="p-2.5 bg-emerald-100/80 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-black flex items-center gap-1.5 animate-fade-in">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>
                  {isRtl
                    ? `🎉 تم حفظ موعد التذكير (${reminderTime}) وتحميل ملف التقويم! افتح الملف لإضافته إلى تقويم Google أو Apple.`
                    : `🎉 Reminder time saved (${reminderTime}) and .ics downloaded! Open to add to your calendar.`}
                </span>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};
