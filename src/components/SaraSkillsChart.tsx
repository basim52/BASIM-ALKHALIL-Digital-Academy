import React, { useEffect, useState } from 'react';
import { computeSaraSkills, type SaraSkills } from '../lib/saraSkills';

const COLORS: Record<string, string> = { grammar: 'bg-[#1cb0f6]', conversation: 'bg-[#ff9600]', reading: 'bg-[#58cc02]', writing: 'bg-[#b87cf8]' };

/** Skills chart from real Sara data (track progress, level tests, placement). New student → zeros + a friendly hint. */
export const SaraSkillsChart: React.FC<{ uid?: string; isRtl?: boolean; placementLevel?: string | null; onStart?: () => void }> = ({ uid, isRtl = true, placementLevel, onStart }) => {
  const [data, setData] = useState<SaraSkills | null>(null);
  useEffect(() => { let alive = true; computeSaraSkills(uid, placementLevel).then(d => { if (alive) setData(d); }); return () => { alive = false; }; }, [uid, placementLevel]);
  return (
    <div data-testid="sara-skills-chart" className="space-y-4">
      {placementLevel && <p className="text-[11px] font-black text-[#002147]">{isRtl ? `مستواك الرسمي: ${placementLevel}` : `Level: ${placementLevel}`}</p>}
      {(data?.skills || []).map(s => (
        <div key={s.id}>
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="font-black text-slate-600 text-[11px]">{isRtl ? s.labelAr : s.labelEn}</span>
            <span className="text-slate-800 font-extrabold text-xs">%{s.pct}</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full ${COLORS[s.id]} rounded-full transition-all`} style={{ width: `${s.pct}%` }} /></div>
          <p className="mt-1 text-[10px] font-bold text-slate-400">{s.passed}/{s.total} {isRtl ? 'درس' : 'lessons'}{s.testBest !== null ? (isRtl ? ` · آخر اختبار مستوى ${s.testBest}%` : ` · last level test ${s.testBest}%`) : ''}</p>
        </div>
      ))}
      {data && !data.hasData && (
        <button onClick={onStart} className="w-full py-2.5 rounded-xl bg-[#002147] text-amber-300 text-xs font-black">{isRtl ? '🚀 ابدأ أول درس مع سارة' : '🚀 Start your first lesson'}</button>
      )}
      {!data && <p className="text-xs text-slate-400 font-bold">{isRtl ? 'جاري التحميل…' : 'Loading…'}</p>}
    </div>
  );
};
export default SaraSkillsChart;
