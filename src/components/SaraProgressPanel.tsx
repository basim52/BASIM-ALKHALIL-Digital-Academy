import React, { useEffect, useState } from 'react';
import { L, useExplainLang } from '../lib/explainLang';
import { loadSaraReport, type SaraReport, type TrackRow } from '../lib/saraReportData';
import { personaById } from '../data/saraBoardPersonas';
import { LinkedChildPicker } from './LinkedChildPicker';

/** Sara + Teachers' Class progress (real stored data only), navy/gold. Used in the parent report and progress analytics. */
const GOLD = '#C49E3A';
export const SaraProgressPanel: React.FC<{ uid: string; compact?: boolean; pickChild?: boolean }> = ({ uid: uidProp, compact = false, pickChild = false }) => {
  const [picked, setPicked] = useState(uidProp); useEffect(() => setPicked(uidProp), [uidProp]);
  const uid = pickChild ? picked : uidProp;
  const picker = pickChild ? <LinkedChildPicker value={picked} onChange={u => setPicked(u)} className="mb-2" /> : null;
  const [lang] = useExplainLang(); const en = lang === 'en';
  const [d, setD] = useState<SaraReport | null | undefined>(undefined);
  useEffect(() => { let alive = true; setD(undefined); void loadSaraReport(uid).then(r => { if (alive) setD(r); }); return () => { alive = false; }; }, [uid]);
  const date = (t: number) => (t ? new Date(t).toLocaleDateString(en ? 'en-GB' : 'ar-SA-u-nu-latn', { day: 'numeric', month: 'short' }) : '—');
  const Bar = ({ r }: { r: TrackRow }) => {
    const pct = r.total ? Math.round((r.passed / r.total) * 100) : 0;
    const p = r.personaId ? personaById(r.personaId) : null;
    return (
      <div className="py-1">
        <div className="flex items-center justify-between gap-2 text-[11.5px] font-bold text-white">
          <span className="truncate">{p ? `${p.emoji} ` : ''}{en ? r.titleEn : r.titleAr}</span>
          <span className="whitespace-nowrap" style={{ color: GOLD }}>{r.passed}/{r.total}</span>
        </div>
        <div className="mt-1 h-1.5 rounded-full bg-white/15 overflow-hidden"><div className="h-full rounded-full" style={{ width: `${pct}%`, background: GOLD }} /></div>
      </div>
    );
  };
  const Tile = ({ label, value, note }: { label: string; value: string; note?: string }) => (
    <div className="rounded-2xl bg-[#0a2d5c] border border-[#C49E3A]/40 p-2.5">
      <p className="text-[10.5px] font-bold text-white/70 leading-tight">{label}</p>
      <p className="text-[18px] font-black leading-tight" style={{ color: GOLD }}>{value}</p>
      {note && <p className="text-[10px] font-bold text-white/60 leading-tight line-clamp-2">{note}</p>}
    </div>
  );
  const box = 'rounded-3xl bg-[#001a38] border border-[#C49E3A]/40 p-3 text-white';
  if (d === undefined) return <div data-testid="sara-progress-panel" className={box}>{picker}<p className="text-[12px] font-bold text-white/70">{L('جاري تحميل تقدم سارة والمعلمين…', 'Loading Sara and teachers progress…')}</p></div>;
  if (d === null) return null;
  const started = (rows: TrackRow[]) => rows.filter(r => r.passed > 0);
  const saraRows = started(d.sara), tutorRows = started(d.tutors);
  const acc = d.board.total ? Math.round((d.board.correct / d.board.total) * 100) : null;
  return (
    <section data-testid="sara-progress-panel" dir={en ? 'ltr' : 'rtl'} className={box}>
      {picker}
      <div className="flex items-center justify-between gap-2 mb-2">
        <p className="text-[13px] font-black">{L('👩‍💼 تقدم سارة وفصل المعلمين', "👩‍💼 Sara & Teachers' Class progress")}</p>
        <span className="text-[10px] font-bold text-white/60">{L('بيانات حقيقية محفوظة فقط', 'Real saved data only')}</span>
      </div>
      {d.path && (
        <p data-testid="report-path" className="mb-2 rounded-2xl bg-[#0a2d5c] border border-[#C49E3A]/40 px-3 py-2 text-[12px] font-bold text-white/85">
          🧭 {L('المسار', 'Path')}: <span style={{ color: GOLD }}>{L(d.path.titleAr, d.path.titleEn)}</span>
          {d.path.level ? ` · ${L('المستوى من اختبار التحديد', 'Placement level')}: ${d.path.level}` : ''}
          {d.path.minutes ? ` · ${L(`${d.path.minutes} دقيقة يومياً`, `${d.path.minutes} min/day`)}` : ''}
          {d.path.checks ? ` · ${L(`مراجعات المسار ${d.path.checks}`, `Path checks ${d.path.checks}`)}` : ''}
        </p>
      )}
      {d.plan && (
        <div data-testid="report-plan" className="mb-2 rounded-2xl bg-[#0a2d5c] border border-[#C49E3A]/40 px-3 py-2 text-white/85">
          <p className="text-[12px] font-black">{d.plan.icon} {L('الخطة', 'Plan')}: <span style={{ color: GOLD }}>{L(d.plan.titleAr, d.plan.titleEn)}</span>
            <span className="font-bold text-white/70"> · {L(`${d.plan.lessonsPerWeek} دروس بالأسبوع · هذا الأسبوع ${d.plan.done}/${d.plan.planned}`, `${d.plan.lessonsPerWeek} lessons/week · this week ${d.plan.done}/${d.plan.planned}`)}</span></p>
          {d.plan.levelFinish && <p className="text-[11px] font-bold text-white/70">{L(`يخلص «${d.plan.levelTitleAr}» تقريباً ${new Date(d.plan.levelFinish + 'T00:00:00').toLocaleDateString('ar-SA', { day: 'numeric', month: 'long' })}`, `“${d.plan.levelTitleEn}” done around ${new Date(d.plan.levelFinish + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}`)}
            {d.plan.lastCheck ? ` · ${d.plan.lastCheck === 'up' ? L('آخر فحص: انتقل لمستوى أعلى ⬆️', 'Last check: moved up ⬆️') : d.plan.lastCheck === 'review' ? L('آخر فحص: مراجعة 🔁', 'Last check: review 🔁') : L('آخر فحص: جيد 👍', 'Last check: good 👍')}` : ''}</p>}
          <div className="mt-1.5 grid grid-cols-7 gap-1">
            {d.plan.rows.map(r => (
              <div key={r.date} data-testid="report-plan-day" className={`rounded-lg px-1 py-1 text-center ${r.today ? 'bg-[#C49E3A] text-[#002147]' : 'bg-white/5'}`}>
                <p className="text-[9.5px] font-black">{en ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][r.dayIdx] : ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'][r.dayIdx]}</p>
                <p className="text-[11px] leading-tight" title={r.items.map(i => L(i.labelAr, i.labelEn)).join('\n')}>{r.items.length ? r.items.map((i, k) => <span key={k}>{i.done ? '✅' : r.past ? '⏭️' : '•'}</span>) : '—'}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {!d.hasAny ? <p className="text-[12px] font-bold text-white/70">{L('ما فيه نشاط محفوظ مع سارة أو المعلمين للحين.', 'No saved activity with Sara or the teachers yet.')}</p> : <>
        <div className={`grid ${compact ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'} gap-2`}>
          <Tile label={L('دروس سارة المجتازة', "Sara lessons passed")} value={String(d.sara.reduce((s, r) => s + r.passed, 0))} note={d.lastAt ? L(`آخر تقدم ${date(d.lastAt)}`, `Last progress ${date(d.lastAt)}`) : undefined} />
          <Tile label={L('دروس فصل المعلمين', "Teachers' Class lessons")} value={String(d.tutors.reduce((s, r) => s + r.passed, 0))} />
          <Tile label={L('حصص السبورة', 'Board sessions')} value={String(d.board.n)} note={acc !== null ? L(`أسئلة التحقق ${d.board.correct}/${d.board.total} (${acc}%) · هذا الأسبوع ${d.board.week}`, `Check questions ${d.board.correct}/${d.board.total} (${acc}%) · this week ${d.board.week}`) : undefined} />
          <Tile label={L('مكالمات سارة', 'Calls with Sara')} value={String(d.calls.n)} note={d.calls.n ? L(`${d.calls.minutes} دقيقة · ${d.calls.words} كلمة · آخرها ${date(d.calls.last)}`, `${d.calls.minutes} min · ${d.calls.words} words · last ${date(d.calls.last)}`) : undefined} />
          <Tile label={L('اختبارات نهاية المستوى', 'End-of-level tests')} value={d.tests.n ? `${d.tests.passed}/${d.tests.n}` : '—'} note={d.tests.last ? L(`آخرها ${d.tests.last.name}: ${d.tests.last.score}%`, `Last: ${d.tests.last.name} ${d.tests.last.score}%`) : L('ما فيه اختبار محفوظ', 'No saved test')} />
          <Tile label={L('تدريب IELTS / STEP', 'IELTS / STEP practice')} value={d.exams.sets ? `${d.exams.correct}/${d.exams.total}` : '—'} note={d.exams.sets ? L(`${d.exams.sets} مجموعة (أفضل نتيجة لكل مجموعة)`, `${d.exams.sets} sets (best result per set)`) : undefined} />
          <Tile label={L('كلمات في ذاكرة سارة', "Words in Sara's memory")} value={String(d.words)} />
        </div>
        {(saraRows.length > 0 || tutorRows.length > 0) && (
          <div className={`mt-3 grid ${compact ? '' : 'md:grid-cols-2'} gap-3`}>
            {saraRows.length > 0 && <div className="rounded-2xl bg-[#0a2d5c] border border-[#C49E3A]/30 p-2.5"><p className="text-[11.5px] font-black mb-1" style={{ color: GOLD }}>{L('مناهج سارة', "Sara's curricula")}</p>{saraRows.map(r => <Bar key={r.id} r={r} />)}</div>}
            {tutorRows.length > 0 && <div className="rounded-2xl bg-[#0a2d5c] border border-[#C49E3A]/30 p-2.5"><p className="text-[11.5px] font-black mb-1" style={{ color: GOLD }}>{L('فصل المعلمين', "Teachers' Class")}</p>{tutorRows.map(r => <Bar key={r.id} r={r} />)}</div>}
          </div>
        )}
        {d.board.last && <p className="mt-2 text-[10.5px] font-bold text-white/65">{L(`آخر حصة سبورة مع ${personaById(d.board.last.personaId).nameAr}: ${d.board.last.topic} · ${date(d.board.last.at)}`, `Last board session with ${personaById(d.board.last.personaId).nameEn}: ${d.board.last.topic} · ${date(d.board.last.at)}`)}</p>}
      </>}
    </section>
  );
};
export default SaraProgressPanel;
