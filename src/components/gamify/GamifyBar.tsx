import React, { Suspense, lazy, useState } from 'react';
import type { GamifyData } from './useGamifyData';
import { flameStage, liveStreak } from '../../lib/gamify';
import StreakSheet from './StreakSheet';
import StudentRoom from './StudentRoom';

const WeeklyAchievementCard = lazy(() => import('./WeeklyAchievementCard'));

/** 🔥 / 🏠 / 🏅 row under the teacher header on every lesson map. Opens sheets; never writes progress or XP. */
export function GamifyBar({ data, lang = 'ar' }: { data: GamifyData; lang?: 'ar' | 'en' }) {
  const t = (ar: string, en: string) => (lang === 'en' ? en : ar);
  const [open, setOpen] = useState<null | 'streak' | 'room' | 'card'>(null);
  const days = liveStreak(data.streak, data.today);
  const stage = flameStage(days);
  const btn = 'flex-1 min-w-0 flex items-center justify-center gap-1.5 px-2 py-2 rounded-2xl border-2 border-b-4 text-[12px] font-black active:translate-y-0.5 active:border-b-2 bg-white';
  return (
    <>
      <div data-testid="gamify-bar" className="flex gap-2 px-3 pb-2">
        <button data-testid="gamify-streak" onClick={() => setOpen('streak')} className={`${btn} border-orange-200 text-[#e07f00]`}>
          <span className={`leading-none ${stage.level === 0 ? 'grayscale opacity-50' : ''}`} style={{ fontSize: 14 + stage.level * 2 }}>🔥</span>
          <span className="truncate">{t('سلسلتي', 'My streak')}</span>
        </button>
        <button data-testid="gamify-room-open" onClick={() => setOpen('room')} className={`${btn} border-sky-200 text-[#1c8fd6]`}>
          <span className="text-[16px] leading-none">🏠</span><span className="truncate">{t('غرفتي', 'My room')}</span>
        </button>
        <button data-testid="gamify-card-open" onClick={() => setOpen('card')} className={`${btn} border-amber-200 text-[#9a7b20]`}>
          <span className="text-[16px] leading-none">🏅</span><span className="truncate">{t('بطاقة الأهل', 'Parent card')}</span>
        </button>
      </div>
      {open === 'streak' && <StreakSheet streak={data.streak} today={data.today} lang={lang} onClose={() => setOpen(null)} />}
      {open === 'room' && <StudentRoom uid={data.uid} xp={data.xp} name={data.name} lang={lang} onClose={() => setOpen(null)} />}
      {open === 'card' && (
        <Suspense fallback={<div className="fixed inset-0 z-[400] bg-slate-950/60 flex items-center justify-center text-white font-black">…</div>}>
          <WeeklyAchievementCard uid={data.uid} name={data.name} streak={data.streak} xp={data.xp} today={data.today} onClose={() => setOpen(null)} />
        </Suspense>
      )}
    </>
  );
}
export default GamifyBar;
