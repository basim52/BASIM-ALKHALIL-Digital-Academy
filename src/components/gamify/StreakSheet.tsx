import React, { useState } from 'react';
import { X, Volume2 } from 'lucide-react';
import type { StreakData } from '../../services/streakService';
import { flameStage, liveStreak, saraStreakLine, weekStudyDays, weeklyBadge, WEEK_BADGES } from '../../lib/gamify';

/** 🔥 Daily streak: flame that grows, this week's study days, weekly badge and Sara's encouragement (read only). */
export function StreakSheet({ streak, today, lang = 'ar', onClose }: { streak: StreakData | null; today: string; lang?: 'ar' | 'en'; onClose: () => void }) {
  const t = (ar: string, en: string) => (lang === 'en' ? en : ar);
  const days = liveStreak(streak, today);
  const stage = flameStage(days);
  const week = weekStudyDays(days > 0 ? streak : null, today);
  const studied = week.filter(d => d.studied).length;
  const badge = weeklyBadge(studied);
  const studiedToday = !!streak && streak.lastActiveDate === today;
  const line = saraStreakLine(days, studiedToday, lang);
  const [speaking, setSpeaking] = useState(false);
  const speak = async () => {
    // Sara's existing lesson narrator (short line only; not the phone call).
    try {
      const m = await import('../SaraTrackPlayer');
      m.saraUnlockNarrator(); setSpeaking(true);
      const done = () => setSpeaking(false);
      await m.saraNarrate(line, done, done, done);
    } catch { setSpeaking(false); }
  };
  return (
    <div data-testid="gamify-streak-sheet" className="fixed inset-0 z-[400] bg-slate-950/60 flex items-end sm:items-center justify-center" dir={lang === 'en' ? 'ltr' : 'rtl'} onClick={onClose}>
      <style>{`@keyframes gf-flick{0%,100%{transform:scale(var(--s)) rotate(-2deg)}50%{transform:scale(calc(var(--s)*1.06)) rotate(2deg)}} .gf-flame{animation:gf-flick 1.3s ease-in-out infinite;transform-origin:50% 90%}`}</style>
      <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 pb-7 shadow-2xl max-h-[92vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-2">
          <p className="text-[16px] font-black text-[#002147]">{t('سلسلة الأيام', 'Daily streak')}</p>
          <button onClick={onClose} aria-label={t('إغلاق', 'Close')} className="p-1.5 rounded-xl bg-slate-100"><X size={18} /></button>
        </div>
        <div className="flex flex-col items-center py-3">
          <div className="h-[120px] flex items-end justify-center">
            <span data-testid="gamify-flame" data-level={stage.level} className={`gf-flame text-[64px] leading-none ${stage.level === 0 ? 'grayscale opacity-40' : ''}`} style={{ ['--s' as any]: stage.scale }}>🔥</span>
          </div>
          <p className="mt-2 text-[28px] font-black text-[#ff7a00]">{days} <span className="text-[15px]">{t(days === 1 ? 'يوم' : 'أيام ورا بعض', days === 1 ? 'day' : 'days in a row')}</span></p>
          <p className="text-[12px] font-bold text-slate-500">{t(stage.labelAr, stage.labelEn)}{streak?.longest ? t(` · أطول سلسلة ${streak.longest}`, ` · best ${streak.longest}`) : ''}</p>
        </div>
        <div className="grid grid-cols-7 gap-1.5 mt-2" data-testid="gamify-week">
          {week.map(d => (
            <div key={d.date} className="flex flex-col items-center gap-1">
              <span data-studied={d.studied ? '1' : '0'} className={`w-9 h-9 rounded-full flex items-center justify-center text-[16px] border-2 ${d.studied ? 'bg-[#ff9600] border-[#e07f00]' : d.isToday ? 'bg-white border-[#ff9600] border-dashed' : 'bg-slate-100 border-slate-200'}`}>{d.studied ? '🔥' : d.future ? '' : d.isToday ? '⏳' : ''}</span>
              <span className={`text-[10px] font-black ${d.isToday ? 'text-[#ff7a00]' : 'text-slate-500'}`}>{d.dayAr}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl bg-gradient-to-br from-[#002147] to-[#0b3d7a] p-3 text-white">
          <p className="text-[12px] font-black text-amber-200">{t('وسام الأسبوع', 'Weekly badge')} · {t(`${studied} من 7 أيام`, `${studied} of 7 days`)}</p>
          <div className="flex gap-2 mt-2">
            {WEEK_BADGES.map(b => {
              const got = studied >= b.min;
              return (
                <div key={b.tier} data-testid={`gamify-badge-${b.tier}`} data-earned={got ? '1' : '0'} className={`flex-1 rounded-xl p-2 text-center ${got ? 'bg-white/20 border-2 border-[#E6C36A]' : 'bg-white/5 border-2 border-white/10'}`}>
                  <span className={`text-[28px] block ${got ? '' : 'grayscale opacity-40'}`}>{b.emoji}</span>
                  <span className="text-[10px] font-black block">{t(`${b.min} أيام`, `${b.min} days`)}</span>
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-[12px] font-bold">
            {badge.earned ? t(`🎉 كسبت ${badge.earned.nameAr}!`, `🎉 You earned the ${badge.earned.nameEn}!`) : ''}
            {badge.next ? t(` باقي ${badge.daysToNext} ${badge.daysToNext === 1 ? 'يوم' : 'أيام'} على ${badge.next.emoji}`, ` ${badge.daysToNext} more day(s) to ${badge.next.emoji}`) : ''}
          </p>
        </div>
        <div className="mt-4 flex items-start gap-3">
          <img src="/tutors/sara.webp" alt="" width={48} height={48} className="w-12 h-12 rounded-full object-cover border-2 border-[#E6C36A] shrink-0" />
          <div className="flex-1 rounded-2xl rounded-ss-sm bg-amber-50 border border-amber-200 p-3">
            <p data-testid="gamify-sara-line" className="text-[13px] font-black text-slate-800 leading-relaxed">{line}</p>
            <button onClick={speak} disabled={speaking} className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#002147] text-white text-[11px] font-black disabled:opacity-60">
              <Volume2 size={14} /> {speaking ? t('سارة تتكلم…', 'Sara is speaking…') : t('اسمع سارة', 'Hear Sara')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default StreakSheet;
