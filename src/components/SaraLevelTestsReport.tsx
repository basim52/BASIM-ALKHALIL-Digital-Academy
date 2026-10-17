import React, { useEffect, useState } from 'react';
import { loadTrackProgress } from '../lib/saraProgressSync';
import { FOUNDATIONS_TRACK } from '../data/saraTracks/foundations';
import { ADVANCED_TRACK } from '../data/saraTracks/advanced';
import { CONVERSATION_TRACK } from '../data/saraTracks/conversation';
import { READING_TRACK } from '../data/saraTracks/reading';
import { WRITING_TRACK } from '../data/saraTracks/writing';
import { NEW_SKILL_TRACKS } from '../lib/saraSkills';
import { loadExamResults, type ExamResults } from '../lib/saraExamSync';
import { EXAM_SETS } from '../data/saraTracks/examPrep';
import { loadCallRecords, type CallRecord } from '../lib/saraCallLink';
import { loadLevelTestAttempts, summarizeLevelTests, LEVEL_TEST_PASS, type LevelTestSummary } from '../lib/saraLevelTests';

/** Sara end-of-level tests per track/level: latest + best score, pass/fail, weak lessons, date. Used in parent report + analytics. */
export const SaraLevelTestsReport: React.FC<{ studentId?: string; isRtl?: boolean }> = ({ studentId, isRtl = true }) => {
  const [rows, setRows] = useState<LevelTestSummary[] | null>(null);
  const [prog, setProg] = useState<Record<string, number>>({});
  const [exam, setExam] = useState<ExamResults>({});
  const [calls, setCalls] = useState<CallRecord[]>([]);
  useEffect(() => {
    if (!studentId) { setRows([]); return; }
    let alive = true;
    loadLevelTestAttempts(studentId).then(list => { if (alive) setRows(summarizeLevelTests(list)); });
    loadTrackProgress(studentId).then(p => { if (alive) setProg(p); });
    loadExamResults(studentId).then(e => { if (alive) setExam(e); });
    loadCallRecords(studentId).then(c => { if (alive) setCalls(c); });
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
      {Object.keys(prog).length > 0 && (
        <div data-testid="sara-track-progress" className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
          {[FOUNDATIONS_TRACK, ADVANCED_TRACK, CONVERSATION_TRACK, READING_TRACK, WRITING_TRACK, ...NEW_SKILL_TRACKS].map(t => {
            const done = Math.min(t.lessons.length, Math.max(0, (Number(prog[t.id]) || 1) - 1));
            return (
              <div key={t.id} className="rounded-xl bg-slate-50 border border-slate-200 px-2 py-1.5">
                <p className="text-[10px] font-black text-slate-600 truncate">{t.titleAr}</p>
                <p className="text-[12px] font-black text-[#002147]">{done}/{t.lessons.length} {isRtl ? 'درس' : 'lessons'}</p>
                <div className="h-1 rounded bg-slate-200 mt-0.5"><div className="h-full rounded bg-amber-400" style={{ width: `${(done / t.lessons.length) * 100}%` }} /></div>
              </div>
            );
          })}
        </div>
      )}
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
      {EXAM_SETS.some(x => exam[x.id]) && (
        <div data-testid="sara-exam-report" className="space-y-1.5">
          <p className="text-[12px] font-black text-[#002147]">{isRtl ? '🎓 تدريب IELTS و STEP (عدد الإجابات الصحيحة والوقت — ليس توقعاً للدرجة)' : '🎓 IELTS & STEP practice (raw correct answers and time — not a score prediction)'}</p>
          <div className="grid gap-1.5 sm:grid-cols-2">
            {EXAM_SETS.filter(x => exam[x.id]).map(x => { const r = exam[x.id]; const t = (n: number) => `${Math.floor(n / 60)}:${String(n % 60).padStart(2, '0')}`; return (
              <div key={x.id} className="rounded-xl bg-slate-50 border border-slate-200 px-2.5 py-1.5">
                <p className="text-[11px] font-black text-slate-700 truncate">{x.exam} · {x.kind === 'reading' ? (isRtl ? 'قراءة' : 'Reading') : (isRtl ? 'استماع' : 'Listening')} · {x.titleEn}</p>
                <p className="text-[11px] font-bold text-slate-600">{isRtl ? 'أفضل' : 'Best'}: {r.correct}/{r.total} ({t(r.timeSec)}) · {isRtl ? 'آخر' : 'Last'}: {r.lastCorrect}/{r.total} ({t(r.lastTimeSec)}) · {isRtl ? 'محاولات' : 'Attempts'}: {r.attempts} · {fmt(r.lastAt)}</p>
              </div>); })}
          </div>
        </div>
      )}
      {calls.length > 0 && (
        <div data-testid="sara-calls-report" className="space-y-1.5">
          <p className="text-[12px] font-black text-[#002147]">{isRtl ? '📞 مكالمات المحادثة مع سارة (آخر 5)' : '📞 Speaking calls with Sara (last 5)'}</p>
          <div className="grid gap-1.5 sm:grid-cols-2">
            {calls.slice(-5).reverse().map(c => (
              <div key={c.at} className="rounded-xl bg-slate-50 border border-slate-200 px-2.5 py-1.5">
                <div className="flex items-center gap-2 text-[11px] font-black text-[#002147]">
                  <span className="truncate flex-1">{isRtl ? c.scenarioAr : c.scenario}</span>
                  <span className="text-slate-500 font-bold">{fmt(c.at)}</span>
                </div>
                <p className="text-[11px] font-bold text-slate-600">
                  {`${Math.floor(c.seconds / 60)}:${String(c.seconds % 60).padStart(2, '0')}`} · {c.turns} {isRtl ? 'مداخلة' : 'turns'} · {c.words} {isRtl ? 'كلمة' : 'words'}
                </p>
                {c.review && <p className="text-[10.5px] font-bold text-[#002147] line-clamp-2">📝 {c.review.verdictAr} {c.review.points.slice(0, 2).map(p => `«${p.said}» ← ${p.better}`).join(' · ')}</p>}
                {c.topicEn && <p className="text-[10px] font-black text-[#002147]">{isRtl ? `موضوع اليوم (${c.dateKey || c.weekKey || ''}): ${c.topicAr || c.topicEn}` : `Daily topic (${c.dateKey || c.weekKey || ''}): ${c.topicEn}`}</p>}
                {c.focus?.length > 0 && <p className="text-[10px] font-bold text-amber-700 truncate">{isRtl ? 'التركيز: ' : 'Focus: '}{c.focus.join(' · ')}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
