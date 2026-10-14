import React, { useEffect, useState } from 'react';
import { computeContinue, setContinueTarget, type ContinueTarget } from '../lib/saraContinue';

/** Home: "continue where you left off" (or "start your first lesson" for a new student). Navy/gold. */
export const SaraContinueCard: React.FC<{ uid?: string; onOpen: () => void }> = ({ uid, onOpen }) => {
  const [t, setT] = useState<ContinueTarget | null>(null);
  useEffect(() => { let alive = true; computeContinue(uid).then(d => { if (alive) setT(d); }); return () => { alive = false; }; }, [uid]);
  const go = () => { if (!t) return; setContinueTarget({ trackId: t.trackId, lessonId: t.lessonId }); onOpen(); };
  const pct = t && t.total ? Math.round((t.passed / t.total) * 100) : 0;
  return (
    <button data-testid="sara-continue-card" onClick={go} disabled={!t} dir="rtl"
      className="w-full text-right rounded-3xl bg-[#002147] border-2 border-b-4 border-[#C49E3A] p-4 sm:p-5 flex items-center gap-3.5 shadow-sm active:scale-[0.99] transition-transform disabled:opacity-70">
      <div className="w-12 h-12 shrink-0 rounded-2xl bg-[#C49E3A]/15 border border-[#C49E3A]/50 flex items-center justify-center text-2xl">{t?.isNew ? '🚀' : '▶️'}</div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-black text-amber-300">{!t ? 'جاري التحميل…' : t.isNew ? 'ابدأ أول درس' : 'كمّل من حيث وقفت'}</p>
        <p className="text-[13px] sm:text-base font-black text-white leading-snug line-clamp-2">{t ? (t.isNew ? `الدرس 1: ${t.lessonTitleAr}` : `${t.lessonId ? `الدرس ${t.lessonOrder}: ${t.lessonTitleAr}` : 'خلصت الدروس، افتح اختبار المستوى'}`) : '\u00a0'}</p>
        {t && !t.isNew && (
          <div className="mt-1.5 flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-white/15 rounded-full overflow-hidden"><div className="h-full bg-[#C49E3A] rounded-full" style={{ width: `${pct}%` }} /></div>
            <span className="text-[10px] font-bold text-white/70 shrink-0 truncate max-w-[45%]">{t.trackTitleAr} · {t.passed}/{t.total}</span>
          </div>
        )}
      </div>
      <span className="w-9 h-9 shrink-0 rounded-xl bg-[#C49E3A] text-[#002147] flex items-center justify-center font-black">←</span>
    </button>
  );
};
export default SaraContinueCard;
