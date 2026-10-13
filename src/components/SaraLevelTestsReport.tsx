import React, { useEffect, useState } from 'react';
import { loadLevelTestAttempts, summarizeLevelTests, LEVEL_TEST_PASS, type LevelTestSummary } from '../lib/saraLevelTests';

/** Sara end-of-level tests per track/level: latest + best score, pass/fail, weak lessons, date. Used in parent report + analytics. */
export const SaraLevelTestsReport: React.FC<{ studentId?: string; isRtl?: boolean }> = ({ studentId, isRtl = true }) => {
  const [rows, setRows] = useState<LevelTestSummary[] | null>(null);
  useEffect(() => {
    if (!studentId) { setRows([]); return; }
    let alive = true;
    loadLevelTestAttempts(studentId).then(list => { if (alive) setRows(summarizeLevelTests(list)); });
    return () => { alive = false; };
  }, [studentId]);
  const fmt = (ms: number) => new Date(ms).toLocaleDateString(isRtl ? 'ar-SA' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  return (
    <div data-testid="sara-level-tests-report" dir={isRtl ? 'rtl' : 'ltr'} className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-sm space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-xl">🏁</span>
        <h3 className="text-sm sm:text-base font-black text-[#002147] flex-1">{isRtl ? 'اختبارات نهاية المستوى مع سارة' : "Sara's end-of-level tests"}</h3>
        <span className="text-[10px] font-black text-slate-500">{isRtl ? `النجاح ${LEVEL_TEST_PASS}%` : `Pass ${LEVEL_TEST_PASS}%`}</span>
      </div>
      {rows === null && <p className="text-xs text-slate-400 font-bold">{isRtl ? 'جاري التحميل…' : 'Loading…'}</p>}
      {rows && rows.length === 0 && <p className="text-xs text-slate-500 font-bold">{isRtl ? 'ما فيه اختبارات مستوى بعد. تفتح بعد اجتياز الدرس الأخير من كل مستوى.' : 'No level tests yet.'}</p>}
      {rows && rows.length > 0 && (
        <div className="grid gap-2">
          {rows.map(r => (
            <div key={`${r.trackId}:${r.levelId}`} className={`rounded-2xl p-3 border ${r.best.passed ? 'bg-emerald-50/60 border-emerald-200' : 'bg-rose-50/60 border-rose-200'}`}>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[13px] font-black text-[#002147]">{r.trackTitleAr} · {r.levelTitleAr}</span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${r.best.passed ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}>{r.best.passed ? (isRtl ? 'ناجح' : 'Passed') : (isRtl ? 'لم ينجح بعد' : 'Not yet')}</span>
                <span className="flex-1" />
                <span className="text-[11px] font-bold text-slate-500">{fmt(r.latest.createdAtMs)}</span>
              </div>
              <div className="mt-1 flex gap-4 text-[12px] font-black text-slate-700">
                <span>{isRtl ? 'آخر نتيجة' : 'Latest'}: {r.latest.score}%</span>
                <span>{isRtl ? 'أفضل نتيجة' : 'Best'}: {r.best.score}%</span>
                <span>{isRtl ? 'المحاولات' : 'Attempts'}: {r.attempts}</span>
              </div>
              {r.latest.weakLessons.length > 0 && (
                <p className="mt-1 text-[11px] font-bold text-slate-600">
                  {isRtl ? 'دروس ضعيفة: ' : 'Weak lessons: '}
                  {r.latest.weakLessons.slice(0, 5).map(w => `${w.order}. ${w.titleAr}`).join(' · ')}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
