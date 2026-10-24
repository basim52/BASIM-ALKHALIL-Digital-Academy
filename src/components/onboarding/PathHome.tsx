import React, { useEffect, useMemo, useState } from 'react';
import { Play, Compass, ClipboardCheck } from 'lucide-react';
import { useT, isEn } from '../../lib/explainLang';
import { loadOnboarding, readLocalOnboarding, nextPathLesson, checkpointDue, stepPortrait, stepTitle, PATH_INFO, CHECK_EVERY, type OnboardingRecord } from '../../lib/onboarding';

/** Hook: the student's saved path (device first, then cloud). */
export function useOnboarding(uid?: string, profile?: any, refresh = 0): OnboardingRecord | null | undefined {
  const [rec, setRec] = useState<OnboardingRecord | null | undefined>(() => readLocalOnboarding(uid) || undefined);
  useEffect(() => { let alive = true; loadOnboarding(uid, profile?.onboarding).then(r => { if (alive) setRec(r); }); return () => { alive = false; }; }, [uid, refresh, profile?.onboarding?.updatedAt]); // eslint-disable-line react-hooks/exhaustive-deps
  return rec;
}

/** Top of the student home: one big «ابدأ درس اليوم», or the small «حدّد مسارك» banner while no path is set. */
export const TodayPathCard: React.FC<{ uid?: string; profile: any; onSetPath: () => void; onOpenLesson: () => void; onOpenCheck: () => void }> = ({ uid, profile, onSetPath, onOpenLesson, onOpenCheck }) => {
  const t = useT();
  const rec = useOnboarding(uid, profile);
  const next = useMemo(() => (rec?.done ? nextPathLesson(rec, uid, profile) : null), [rec, uid, profile]);
  if (rec === undefined) return null;
  if (!rec?.done) {
    return (
      <button onClick={onSetPath} dir="rtl" data-testid="set-path-banner"
        className="w-full flex items-center gap-3 rounded-2xl border-2 border-[#C49E3A] bg-[#fdfaf3] text-[#002147] px-4 py-3 text-start active:scale-[0.99]">
        <Compass className="text-[#C49E3A] shrink-0" size={22} />
        <span className="flex-1 min-w-0">
          <span className="block text-[14px] font-black">{t('حدّد مسارك', 'Set your path')}</span>
          <span className="block text-[11px] font-bold text-slate-600">{t('٤ أسئلة واختبار قصير، ونرتب لك درسك اليومي', '4 questions and a short test, then your daily lesson is ready')}</span>
        </span>
        <span className="text-[12px] font-black text-[#C49E3A]">{t('ابدأ', 'Start')}</span>
      </button>
    );
  }
  const due = checkpointDue(rec, uid, profile);
  return (
    <div dir="rtl" className="space-y-2" data-testid="today-path">
      <button onClick={next ? onOpenLesson : onSetPath} data-testid="start-today-lesson"
        className="w-full rounded-3xl bg-gradient-to-l from-[#002147] to-[#0a3366] border-2 border-[#C49E3A] text-white px-4 py-4 flex items-center gap-3 shadow-lg active:scale-[0.99] text-start">
        <img src={`/tutors/${next ? stepPortrait(next.step) : 'sara'}.webp`} alt="" className="w-14 h-14 rounded-full border-2 border-[#E6C36A] object-cover shrink-0" />
        <span className="flex-1 min-w-0">
          <span className="block text-[20px] font-black text-[#E6C36A] leading-tight">{next ? t('ابدأ درس اليوم', "Start today's lesson") : t('خلّصت مسارك! 🎉', 'Path finished! 🎉')}</span>
          <span className="block text-[12px] font-bold text-white/80 truncate mt-0.5">
            {next ? `${stepTitle(next.step, isEn())} · ${t('درس', 'Lesson')} ${next.order}: ${isEn() ? next.lesson.titleEn : next.lesson.titleAr}` : t('اختر هدف جديد يكمل معك', 'Pick a new goal to keep going')}
          </span>
        </span>
        <span className="w-11 h-11 rounded-full bg-[#C49E3A] text-[#002147] flex items-center justify-center shrink-0"><Play size={20} fill="currentColor" /></span>
      </button>
      <div className="flex items-center justify-between gap-2 px-1">
        <span className="text-[11px] font-bold text-slate-500">{t(PATH_INFO[rec.path].titleAr, PATH_INFO[rec.path].titleEn)}</span>
        <button onClick={onSetPath} className="text-[11px] font-black text-[#002147] underline underline-offset-2" data-testid="change-goal">{t('غيّر هدفك', 'Change your goal')}</button>
      </div>
      {due && (
        <button onClick={onOpenCheck} data-testid="path-check-due" className="w-full flex items-center gap-2 rounded-2xl bg-[#fdfaf3] border border-[#C49E3A] px-3 py-2.5 text-[#002147] text-start">
          <ClipboardCheck size={18} className="text-[#C49E3A]" />
          <span className="flex-1 text-[13px] font-black">{t(`خلّصت ${CHECK_EVERY} دروس — فحص قصير (٥ أسئلة)`, `${CHECK_EVERY} lessons done — quick check (5 questions)`)}</span>
        </button>
      )}
    </div>
  );
};

