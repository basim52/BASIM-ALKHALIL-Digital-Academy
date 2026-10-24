import React, { useMemo, useState } from 'react';
import { ArrowRight, CalendarDays, ChevronLeft, RefreshCw } from 'lucide-react';
import { useT, isEn } from '../../lib/explainLang';
import type { OnboardingRecord } from '../../lib/onboarding';
import {
  planOptions, recommendedOption, optionPreview, liveWeek, DAY_AR, DAY_EN, PLAN_PACKAGE_SLOT, isoDay,
  savePathPlanChoice, type PathPlanOptionId, type SimDay, type PathPlanLogCell,
} from '../../lib/pathPlan';

const fmtDate = (iso: string | null, en: boolean) => iso ? new Date(iso + 'T00:00:00').toLocaleDateString(en ? 'en-GB' : 'ar-SA', { day: 'numeric', month: 'long' }) : '';
const KIND_ICON: Record<PathPlanLogCell['kind'], string> = { lesson: '📘', practice: '✏️', review: '🔁', check: '📝' };

const CellLine: React.FC<{ c: PathPlanLogCell; done?: boolean; missed?: boolean; dark?: boolean }> = ({ c, done, missed, dark }) => {
  const t = useT();
  return (
    <li className="flex items-start gap-1.5 leading-snug" data-testid="plan-cell" data-kind={c.kind} data-done={done ? '1' : '0'}>
      <span aria-hidden className="shrink-0">{done ? '✅' : missed ? '⏭️' : KIND_ICON[c.kind]}</span>
      <span className="min-w-0">
        <span className={`block text-[12px] font-black ${done ? 'line-through opacity-60' : ''}`}>{t(c.labelAr, c.labelEn)}</span>
        {c.subAr && <span className={`block text-[10.5px] font-bold truncate ${dark ? 'text-white/60' : 'text-slate-500'}`} dir="auto">{t(c.subAr, c.subEn || c.subAr)}</span>}
        {missed && !done && <span className="block text-[10px] font-bold text-amber-600">{t('انتقل لليوم الجاي', 'Moved forward')}</span>}
      </span>
    </li>
  );
};

/** Sunday → Saturday template of one option. */
const WeekShape: React.FC<{ days: SimDay[] }> = ({ days }) => {
  const en = isEn();
  return (
    <div className="mt-2 rounded-xl border border-[#C49E3A]/40 overflow-hidden" data-testid="plan-week-shape">
      {days.map(d => (
        <div key={d.date} className={`flex gap-2 px-2.5 py-1.5 border-b last:border-b-0 border-[#C49E3A]/20 ${d.cells.length ? 'bg-white' : 'bg-slate-50'}`}>
          <span className="w-14 shrink-0 text-[11px] font-black text-[#C49E3A]">{en ? DAY_EN[d.dayIdx] : DAY_AR[d.dayIdx]}</span>
          {d.cells.length ? <ul className="flex-1 min-w-0 space-y-0.5 text-[#002147]">{d.cells.map(c => <CellLine key={c.key} c={c} />)}</ul>
            : <span className="text-[11px] font-bold text-slate-400">{en ? 'Rest' : 'راحة'}</span>}
        </div>
      ))}
    </div>
  );
};

/** The three plan options; the recommended one (by daily minutes) is pre-highlighted, the student picks. */
export const PlanPicker: React.FC<{ rec: OnboardingRecord; uid?: string; profile?: any; fresh?: boolean; value?: PathPlanOptionId | null; onPick: (id: PathPlanOptionId) => void; busy?: boolean }> = ({ rec, uid, profile, fresh, value, onPick, busy }) => {
  const t = useT(); const en = isEn();
  const rec0 = recommendedOption(rec);
  const opts = useMemo(() => planOptions(rec).map(o => optionPreview(rec, o, uid, profile, fresh)), [rec, uid, profile, fresh]);
  const [open, setOpen] = useState<PathPlanOptionId>(value || rec0);
  return (
    <div className="space-y-2" data-testid="plan-picker">
      <p className="text-[14px] font-black text-white">{t('اختر خطتك الأسبوعية', 'Choose your weekly plan')}</p>
      <p className="text-[11px] font-bold text-white/65 -mt-1">{t('تقدر تغيّرها بأي وقت بدون ما يضيع تقدمك.', 'You can change it any time without losing progress.')}</p>
      {opts.map(({ option: o, week, today, sim }) => {
        const chosen = value === o.id; const isOpen = open === o.id; const isRec = rec0 === o.id;
        return (
          <div key={o.id} data-testid={`plan-option-${o.id}`} data-recommended={isRec ? '1' : '0'} data-chosen={chosen ? '1' : '0'}
            className={`rounded-2xl bg-[#fdfaf3] text-[#002147] border-2 ${chosen ? 'border-emerald-500 ring-2 ring-emerald-300' : isRec ? 'border-[#C49E3A] ring-2 ring-[#E6C36A]/60' : 'border-[#C49E3A]/35'}`}>
            <button className="w-full flex items-center gap-2 px-3 py-2.5 text-start" onClick={() => setOpen(o.id)} data-testid={`plan-option-head-${o.id}`}>
              <span className="text-2xl" aria-hidden>{o.icon}</span>
              <span className="flex-1 min-w-0">
                <span className="flex items-center gap-1.5 text-[15px] font-black">{t(o.titleAr, o.titleEn)}
                  {isRec && <span className="text-[10px] font-black bg-[#C49E3A] text-[#002147] rounded-full px-2 py-0.5">{t('يناسب وقتك', 'Fits your time')}</span>}
                  {chosen && <span className="text-[10px] font-black bg-emerald-500 text-white rounded-full px-2 py-0.5">{t('خطتك', 'Your plan')}</span>}
                </span>
                <span className="block text-[11px] font-bold text-slate-600">
                  {t(`${o.lessonsPerWeek} دروس بالأسبوع · ${o.studyDays.length} أيام · ${o.perDay > 1 ? `${o.perDay} دروس باليوم` : 'درس باليوم'}${o.practiceDays.length ? ` · تمرين ${o.practiceDays.length === o.studyDays.length ? 'كل يوم دراسة' : `${o.practiceDays.length} مرات`}` : ''} · السبت مراجعة/فحص`,
                    `${o.lessonsPerWeek} lessons/week · ${o.studyDays.length} days · ${o.perDay} a day${o.practiceDays.length ? ` · practice ×${o.practiceDays.length}` : ''} · Sat review/check`)}
                </span>
              </span>
              <ChevronLeft size={16} className={`shrink-0 text-[#C49E3A] transition-transform ${isOpen ? '-rotate-90' : ''}`} />
            </button>
            {isOpen && (
              <div className="px-3 pb-3">
                {today.length > 0 && <p className="text-[12px] font-black">{t('اليوم: ', 'Today: ')}<span className="font-bold">{today.map(c => t(c.labelAr, c.labelEn)).join(' + ')}</span></p>}
                <p className="text-[11px] font-black text-[#C49E3A] mt-2 flex items-center gap-1"><CalendarDays size={13} /> {t('شكل أسبوعك', 'Your week')}</p>
                <WeekShape days={week} />
                <p className="mt-2 text-[11.5px] font-bold text-slate-700 leading-5" data-testid="plan-finish">
                  {sim.levelFinish
                    ? t(`باقي ${sim.levelLeft} درس في «${sim.levelTitleAr}» — تخلصه تقريباً ${fmtDate(sim.levelFinish, false)}`, `${sim.levelLeft} lessons left in “${sim.levelTitleEn}” — done around ${fmtDate(sim.levelFinish, true)}`)
                    : t('خلّصت دروس هذا المستوى', 'Level lessons done')}
                  {sim.pathFinish && sim.pathLeft > sim.levelLeft ? t(` · المسار كامل (${sim.pathLeft} درس) تقريباً ${fmtDate(sim.pathFinish, false)}`, ` · whole path (${sim.pathLeft} lessons) around ${fmtDate(sim.pathFinish, true)}`) : ''}
                </p>
                <p className="text-[10px] font-bold text-slate-400">{t('محسوب من عدد الدروس الفعلي — يتعدل مع تقدمك وفحص كل ١٠ دروس.', 'From the real lesson count — updates with your progress and the 10-lesson checks.')}</p>
                <button disabled={busy || chosen} onClick={() => onPick(o.id)} data-testid={`plan-pick-${o.id}`}
                  className={`mt-2.5 w-full py-2.5 rounded-xl font-black text-[13px] ${chosen ? 'bg-emerald-500 text-white' : 'bg-[#002147] text-[#E6C36A] active:scale-[0.99]'} disabled:opacity-90`}>
                  {chosen ? t('✓ هذي خطتك', '✓ This is your plan') : busy ? t('جارٍ الحفظ…', 'Saving…') : t(`اختر الخطة ${o.titleAr}`, `Choose ${o.titleEn}`)}
                </button>
              </div>
            )}
            {/* «الباقة المناسبة لهذه الخطة» — reserved slot for a future package per plan option (PLAN_PACKAGE_SLOT in lib/pathPlan). Hidden: no prices, no payment code. */}
            <div data-slot="plan-package" data-plan-id={o.id} data-package-id={PLAN_PACKAGE_SLOT[o.id] || ''} hidden aria-hidden />
          </div>
        );
      })}
    </div>
  );
};

/** Student home / report: this week Sunday → Saturday with ✅ from real progress. */
export const PathWeekTable: React.FC<{ rec: OnboardingRecord; uid?: string; profile?: any; onChange?: () => void; compact?: boolean; light?: boolean }> = ({ rec, uid, profile, onChange, compact, light }) => {
  const t = useT(); const en = isEn();
  const [off, setOff] = useState(0);
  const lw = useMemo(() => liveWeek(rec, uid, profile, off), [rec, uid, profile, off]);
  if (!lw) return null;
  const T = isoDay(new Date());
  const last = rec.checkpoints?.[rec.checkpoints.length - 1];
  const all = lw.rows.flatMap(r => r.cells.filter(c => c.kind === 'lesson'));
  const doneN = all.filter(c => c.done).length;
  return (
    <div className={`rounded-2xl border border-[#C49E3A]/50 ${light ? 'bg-white' : 'bg-[#fdfaf3]'} text-[#002147] p-3`} dir="rtl" data-testid="path-week">
      <div className="flex items-center gap-2">
        <CalendarDays size={16} className="text-[#C49E3A]" />
        <span className="flex-1 text-[13px] font-black">{t(`خطتك ${lw.option.titleAr} ${lw.option.icon}`, `Your ${lw.option.titleEn} plan ${lw.option.icon}`)}
          <span className="text-[11px] font-bold text-slate-500"> · {off ? t('الأسبوع الجاي', 'Next week') : t(`هذا الأسبوع ${doneN}/${all.length}`, `This week ${doneN}/${all.length}`)}</span></span>
        {onChange && <button onClick={onChange} className="text-[11px] font-black underline underline-offset-2 flex items-center gap-1" data-testid="change-plan"><RefreshCw size={11} />{t('غيّر خطتي', 'Change my plan')}</button>}
      </div>
      {last && (
        <p className="mt-1 text-[11px] font-bold text-slate-600" data-testid="plan-check-note">
          {last.outcome === 'up' ? t('⬆️ آخر فحص ممتاز — انتقلت للمستوى التالي والخطة تكمل منه', '⬆️ Last check excellent — moved up a level, the plan continues from there')
            : last.outcome === 'review' ? t('🔁 آخر فحص: أضفنا مراجعة للدروس اللي غلطت فيها', '🔁 Last check: review of the missed lessons was added')
            : t('👍 آخر فحص جيد — نكمل بنفس المستوى', '👍 Last check good — same level')}
        </p>
      )}
      <div className="mt-2 space-y-1">
        {lw.rows.map(r => {
          const missed = r.state === 'past';
          return (
            <div key={r.date} data-testid="path-week-day" data-date={r.date} className={`flex gap-2 rounded-lg px-2 py-1.5 ${r.date === T ? 'bg-[#002147] text-white' : r.cells.length ? 'bg-white' : 'bg-slate-50'}`}>
              <span className={`w-14 shrink-0 text-[11px] font-black ${r.date === T ? 'text-[#E6C36A]' : 'text-[#C49E3A]'}`}>{r.date === T ? t('اليوم', 'Today') : en ? DAY_EN[r.dayIdx] : DAY_AR[r.dayIdx]}</span>
              {r.beforePlan && r.state === 'past' ? <span className="text-[11px] font-bold text-slate-400">{t('قبل خطتك', 'Before your plan')}</span>
                : r.cells.length ? <ul className="flex-1 min-w-0 space-y-0.5">{(compact ? r.cells.slice(0, 2) : r.cells).map(c => <CellLine key={c.key} c={c} done={c.done} missed={missed && !c.done} dark={r.date === T} />)}</ul>
                : <span className={`text-[11px] font-bold ${r.date === T ? 'text-white/60' : 'text-slate-400'}`}>{r.study && r.state === 'past' ? '—' : t('راحة', 'Rest')}</span>}
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-[10.5px] font-bold text-slate-500">{lw.sim.levelFinish ? t(`تخلص «${lw.sim.levelTitleAr}» تقريباً ${fmtDate(lw.sim.levelFinish, false)}`, `“${lw.sim.levelTitleEn}” done around ${fmtDate(lw.sim.levelFinish, true)}`) : ''}</span>
        <button onClick={() => setOff(off ? 0 : 1)} className="text-[11px] font-black text-[#002147] underline underline-offset-2" data-testid="plan-next-week">{off ? t('هذا الأسبوع', 'This week') : t('الأسبوع الجاي', 'Next week')}</button>
      </div>
    </div>
  );
};

/** Fullscreen «غيّر خطتي»: switch option, progress stays (only today onward is re-planned). */
export const PathPlanScreen: React.FC<{ uid?: string; profile?: any; rec: OnboardingRecord | null | undefined; onClose: () => void; onSaved?: (r: OnboardingRecord) => void }> = ({ uid, profile, rec, onClose, onSaved }) => {
  const t = useT();
  const [cur, setCur] = useState<OnboardingRecord | null>(rec || null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  React.useEffect(() => { if (rec) setCur(rec); }, [rec?.updatedAt]); // eslint-disable-line react-hooks/exhaustive-deps
  const pick = async (id: PathPlanOptionId) => {
    if (!cur || busy) return; setBusy(true);
    try { const nr = await savePathPlanChoice(uid, cur, id, profile); setCur(nr); onSaved?.(nr); setMsg(t('انحفظت خطتك ✓ — تقدمك ما تغيّر', 'Plan saved ✓ — your progress is unchanged')); }
    finally { setBusy(false); }
  };
  return (
    <div dir="rtl" className="min-h-[100dvh] bg-gradient-to-b from-[#002147] to-[#00152e] text-white" data-testid="path-plan-screen">
      <div className="flex items-center gap-2 px-4 pt-4">
        <button onClick={onClose} aria-label={t('رجوع', 'Back')} className="p-2 rounded-xl bg-white/10" data-testid="path-plan-back"><ArrowRight size={16} /></button>
        <h1 className="flex-1 text-lg font-black">{cur?.plan ? t('غيّر خطتي', 'Change my plan') : t('اختر خطتك', 'Choose your plan')}</h1>
        <img src="/tutors/sara.webp" alt="" className="w-9 h-9 rounded-full border-2 border-[#C49E3A] object-cover" />
      </div>
      <div className="max-w-xl mx-auto px-4 py-4 space-y-3">
        {!cur?.done ? <p className="text-[13px] font-bold text-white/75">{t('حدّد مسارك أول، بعدها اختر خطتك.', 'Set your path first, then choose a plan.')}</p> : (
          <>
            <PlanPicker rec={cur} uid={uid} profile={profile} value={cur.plan?.option || null} onPick={pick} busy={busy} />
            {msg && <p className="text-center text-[12px] font-black text-emerald-300" data-testid="path-plan-saved">{msg}</p>}
            {cur.plan && <button onClick={onClose} className="w-full py-3 rounded-xl border-2 border-[#C49E3A] text-[#E6C36A] font-black text-sm" data-testid="path-plan-done">{t('تم', 'Done')}</button>}
          </>
        )}
      </div>
    </div>
  );
};
export default PathPlanScreen;
