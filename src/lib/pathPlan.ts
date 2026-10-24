/**
 * Smart study plan for the onboarding path («خطتك الذكية»): the student picks one of three options
 * (خفيفة / متوسطة / مكثفة). Everything is computed from REAL lesson counts and the existing unlocked
 * counters — no invented numbers, and progress itself is never stored here.
 *
 *  • The choice + a small per-day log live on users/{uid}.onboarding.plan (owner-writable, no rule changes).
 *  • Sara's existing smart-plan storage is reused: users/{uid}.saraPlanSettings gets mode 'path' and the
 *    rolling 7-day SaraPlan is written with saraPlan.savePlan (fromPath: true), so «توليد خطة ذكية» shows it.
 *  • Missed day → nothing piles up: each new day is planned from the real next lesson (yesterday's ⏭️ moves forward).
 *  • 10-lesson checks: a «review» outcome adds its weak lessons as review tasks; a level-up raises the counters,
 *    so the plan simply continues from the new level.
 */
import { doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import {
  pathTrack, readStepUnlocked, lessonsSincePath, saveOnboarding, CHECK_EVERY,
  type OnboardingRecord, type PathStep, type PathPlanOptionId, type PathPlanLogCell, type PathPlanChoice,
} from './onboarding';
import type { SaraPlan, PlanTask, PlanDay } from './saraPlan';

export type { PathPlanOptionId, PathPlanLogCell, PathPlanChoice };

/* ───────── options ───────── */
export interface PathPlanOption {
  id: PathPlanOptionId; titleAr: string; titleEn: string; icon: string;
  /** 0 = Sunday … 6 = Saturday */
  studyDays: number[]; perDay: number; practiceDays: number[];
  /** Weekly review / 10-lesson check day. */
  checkDay: number;
  lessonsPerWeek: number;
}
/**
 * Future subscription package per plan option («الباقة المناسبة لهذه الخطة»).
 * Payments are on hold: every value stays null and the UI slot (data-slot="plan-package") stays hidden.
 * When packages exist, map planId → packageId here and render the slot — no prices or payment code live here.
 */
export const PLAN_PACKAGE_SLOT: Record<PathPlanOptionId, string | null> = { light: null, medium: null, intense: null };

const SUN_THU = [0, 1, 2, 3, 4];
/** The three options, shaped by the student's daily minutes (practice exercises only when there is time for them). */
export function planOptions(rec: OnboardingRecord): PathPlanOption[] {
  const m = Number(rec.answers?.minutes) || 10;
  const mk = (id: PathPlanOptionId, titleAr: string, titleEn: string, icon: string, studyDays: number[], perDay: number, practiceDays: number[]): PathPlanOption =>
    ({ id, titleAr, titleEn, icon, studyDays, perDay, practiceDays, checkDay: 6, lessonsPerWeek: studyDays.length * perDay });
  return [
    mk('light', 'خفيفة', 'Light', '🌱', [0, 2, 4], 1, m >= 20 ? [2] : []),
    mk('medium', 'متوسطة', 'Medium', '⭐', SUN_THU, 1, m >= 20 ? SUN_THU : [1, 3]),
    mk('intense', 'مكثفة', 'Intense', '🚀', SUN_THU, 2, SUN_THU),
  ];
}
/** Pre-highlighted option from the daily minutes answer (the student still picks). */
export const recommendedOption = (rec: OnboardingRecord): PathPlanOptionId => {
  const m = Number(rec.answers?.minutes) || 10; return m <= 10 ? 'light' : m <= 20 ? 'medium' : 'intense';
};
export const optionById = (rec: OnboardingRecord, id?: PathPlanOptionId) => planOptions(rec).find(o => o.id === id) || planOptions(rec)[1];

/* ───────── helpers ───────── */
export const DAY_AR = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
export const DAY_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const isoDay = (x: Date) => `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`;
const atMidnight = (x: Date) => { const d = new Date(x); d.setHours(0, 0, 0, 0); return d; };
const addDays = (x: Date, n: number) => { const d = new Date(x); d.setDate(d.getDate() + n); return d; };
const NAME: Record<string, [string, string, string]> = { // trackId → [ar, en, portrait]
  'tutor-noura': ['نورة', 'Noura', 'grammar'], 'tutor-mohammed': ['محمد', 'Mohammed', 'business'], 'tutor-ali': ['علي', 'Ali', 'exams'],
  'tutor-lama': ['لمى', 'Lama', 'lama'], 'tutor-reem': ['ريم', 'Reem', 'reem'], 'tutor-haya': ['هيا', 'Haya', 'haya'], 'tutor-jana': ['جنى', 'Jana', 'jana'],
};
const nameOf = (s: PathStep): [string, string, string] => (s.kind === 'tutor' ? NAME[s.trackId] : null) || ['سارة', 'Sara', 'sara'];
/** «أكمل الجملة» exercise track of each teacher (same ids/progress stores as SaraFillBlankPlayer). Lesson counts mirror data/fillBlankTracks.ts. */
const FB_COUNT: Record<string, number> = { fill_blank: 30, fill_blank_noura: 30, fill_blank_mohammed: 30, fill_blank_ali: 30, fill_blank_lama: 120, fill_blank_reem: 120, fill_blank_haya: 120, fill_blank_jana: 120 };
const fbOf = (s: PathStep): PathStep => s.kind === 'tutor' ? { kind: 'tutor', trackId: s.trackId.replace('tutor-', 'fill_blank_'), startOrder: 1 } : { kind: 'sara', trackId: 'fill_blank', startOrder: 1 };
const stepFor = (kind: 'tutor' | 'sara', trackId: string): PathStep => ({ kind, trackId, startOrder: 1 });
const pathLessons = (s: PathStep) => { const t = pathTrack(s); if (!t) return []; return (s.kind === 'sara' ? t.lessons.filter(l => l.content) : t.lessons).slice().sort((a, b) => a.order - b.order); };

/** Is this planned item already done according to real progress / the student's own tick? */
export function cellDone(c: PathPlanLogCell, rec: OnboardingRecord, uid?: string, profile?: any): boolean {
  if (c.kind === 'lesson' || c.kind === 'practice') return readStepUnlocked(stepFor(c.stepKind, c.trackId), uid, profile) > (c.order || 0);
  if (c.kind === 'check') return (rec.checkpoints?.length || 0) >= (c.order || 1);
  return !!rec.plan?.reviewed?.[c.key];
}

/* ───────── simulation (day by day, real lessons in order) ───────── */
interface QItem { step: PathStep; order: number; titleAr: string; titleEn: string; levelId?: string }
export interface SimDay { date: string; dayIdx: number; cells: PathPlanLogCell[]; study: boolean }
export interface SimResult {
  days: SimDay[];
  levelTitleAr: string; levelTitleEn: string; levelLeft: number; levelFinish: string | null;
  pathLeft: number; pathFinish: string | null;
}
function simulate(rec: OnboardingRecord, opt: PathPlanOption, uid: string | undefined, profile: any, start: Date, keepDays: number,
  floor: Record<string, number> = {}, pendingLessons = 0, pendingChecks = 0, withReviews = true): SimResult {
  const fl = (s: PathStep) => Math.max(readStepUnlocked(s, uid, profile), floor[s.trackId] || 0);
  const queue: QItem[] = [];
  for (const s of rec.steps) { const u = fl(s); for (const l of pathLessons(s)) if (l.order >= u) queue.push({ step: s, order: l.order, titleAr: l.titleAr, titleEn: l.titleEn, levelId: l.levelId }); }
  const first = queue[0];
  const ftrack = first && pathTrack(first.step);
  const lvl = first && ftrack?.levels?.find(v => v.id === first.levelId);
  let levelEnd = -1; if (first) queue.forEach((q, i) => { if (q.step === first.step && (lvl ? q.levelId === first.levelId : true)) levelEnd = i; });
  const fbU: Record<string, number> = {};
  // review tasks from the latest 10-lesson check (outcome «review»), within a week of it, not yet ticked
  const cps = rec.checkpoints || []; const lastCp = cps[cps.length - 1];
  const reviews: PathPlanLogCell[] = [];
  if (withReviews && lastCp && lastCp.outcome === 'review' && lastCp.weak?.length && Date.now() - lastCp.at < 7 * 86400000) {
    const s = rec.steps.find(x => x.trackId === lastCp.trackId);
    if (s) for (const w of lastCp.weak) { const key = `review:${lastCp.at}:${w.order}`; if (rec.plan?.reviewed?.[key]) continue; const [na, ne, who] = nameOf(s);
      reviews.push({ key, kind: 'review', stepKind: s.kind, trackId: s.trackId, order: w.order, labelAr: `مراجعة درس ${w.order} مع ${na}`, labelEn: `Review lesson ${w.order} with ${ne}`, subAr: w.titleAr, subEn: w.titleEn || w.titleAr, who }); }
  }
  let qi = 0; let done = lessonsSincePath(rec, uid, profile) + pendingLessons; let checks = (rec.checkpoints?.length || 0) + pendingChecks;
  let weekLessons: QItem[] = [];
  const days: SimDay[] = []; let levelFinish: string | null = null; let pathFinish: string | null = queue.length ? null : isoDay(start);
  for (let k = 0; k < 2000; k++) {
    const d = addDays(start, k); const di = d.getDay(); const iso = isoDay(d); const cells: PathPlanLogCell[] = [];
    if (di === 0) weekLessons = [];
    const study = opt.studyDays.includes(di);
    if (study) {
      if (reviews.length && k < 7) cells.push(reviews.shift()!);
      for (let n = 0; n < opt.perDay && qi < queue.length; n++, qi++) {
        const q = queue[qi]; const [na, ne, who] = nameOf(q.step);
        cells.push({ key: `path:${q.step.kind}:${q.step.trackId}:${q.order}`, kind: 'lesson', stepKind: q.step.kind, trackId: q.step.trackId, order: q.order,
          labelAr: `درس ${q.order} مع ${na}`, labelEn: `Lesson ${q.order} with ${ne}`, subAr: q.titleAr, subEn: q.titleEn, who });
        weekLessons.push(q); done++;
        if (qi === levelEnd) levelFinish = iso;
        if (qi === queue.length - 1) pathFinish = iso;
      }
      const cur = queue[Math.min(qi, queue.length - 1)];
      if (opt.practiceDays.includes(di) && cur) {
        const fb = fbOf(cur.step); const max = FB_COUNT[fb.trackId] || 0;
        const u = fbU[fb.trackId] ?? Math.max(readStepUnlocked(fb, uid, profile), floor[fb.trackId] || 0);
        if (u <= max) { fbU[fb.trackId] = u + 1; const [na, ne, who] = nameOf(cur.step); const word = fb.trackId === 'fill_blank_lama' ? ['أكمل الكلمة', 'Complete the word'] : ['أكمل الجملة', 'Complete the sentence'];
          cells.push({ key: `path:${fb.kind}:${fb.trackId}:${u}`, kind: 'practice', stepKind: fb.kind, trackId: fb.trackId, order: u, labelAr: `تمرين ${word[0]} ${u} مع ${na}`, labelEn: `${word[1]} ${u} with ${ne}`, who }); }
      }
    }
    if (di === opt.checkDay) {
      if (Math.floor(done / CHECK_EVERY) > checks) {
        checks++; cells.push({ key: `check:${checks}`, kind: 'check', stepKind: 'sara', trackId: '', order: checks, labelAr: `فحص قصير (٥ أسئلة) بعد ${checks * CHECK_EVERY} دروس`, labelEn: `Quick check (5 questions) after ${checks * CHECK_EVERY} lessons`, who: 'sara' });
      } else {
        const recent = weekLessons.slice(-2);
        if (!recent.length && first) { const back = pathLessons(first.step).filter(l => l.order < first.order).slice(-2); back.forEach(l => recent.push({ step: first.step, order: l.order, titleAr: l.titleAr, titleEn: l.titleEn })); }
        if (recent.length) { const s = recent[recent.length - 1].step; const [na, ne, who] = nameOf(s); const os = recent.map(r => r.order).join(' و ');
          cells.push({ key: `week-review:${iso}`, kind: 'review', stepKind: s.kind, trackId: s.trackId, order: recent[0].order, labelAr: `مراجعة الأسبوع: درس ${os} مع ${na}`, labelEn: `Weekly review: lesson ${recent.map(r => r.order).join(' & ')} with ${ne}`, who }); }
      }
    }
    if (k < keepDays) days.push({ date: iso, dayIdx: di, cells, study });
    if (k >= keepDays && qi >= queue.length) break;
  }
  return {
    days,
    levelTitleAr: lvl?.titleAr || ftrack?.titleAr || '', levelTitleEn: lvl?.titleEn || ftrack?.titleEn || '',
    levelLeft: levelEnd + 1, levelFinish, pathLeft: queue.length, pathFinish,
  };
}

/* ───────── option preview (nothing saved) ───────── */
export interface OptionPreview { option: PathPlanOption; week: SimDay[]; today: PathPlanLogCell[]; sim: SimResult }
/** «شكل أسبوعك»: the upcoming lessons laid out Sunday → Saturday, plus real finish dates from today. */
export function optionPreview(rec: OnboardingRecord, opt: PathPlanOption, uid?: string, profile?: any, fresh = false, now = new Date()): OptionPreview {
  const today = atMidnight(now);
  // fresh (admin preview / unsaved path): plan as a new student from the placement start lessons, ignoring this account's counters
  if (fresh) { uid = '__plan_preview__'; profile = null; }
  const floor: Record<string, number> = {}; for (const s of rec.steps) floor[s.trackId] = Math.max(1, s.startOrder || 1);
  const sim = simulate(rec, opt, uid, profile, today, 1, floor);
  const sunday = addDays(today, -today.getDay());
  const shape = simulate(rec, opt, uid, profile, sunday, 7, floor, 0, 0, false);
  return { option: opt, week: shape.days, today: sim.days[0]?.cells || [], sim };
}

/* ───────── live plan (chosen) ───────── */
export interface WeekRow { date: string; dayIdx: number; state: 'past' | 'today' | 'future'; beforePlan: boolean; study: boolean; cells: (PathPlanLogCell & { done: boolean })[] }
export interface LiveWeek { option: PathPlanOption; rows: WeekRow[]; todayCells: PathPlanLogCell[]; todayFromLog: boolean; sim: SimResult }
/** The calendar week (Sunday → Saturday) with ✅ from real progress. weekOffset 1 = next week. */
export function liveWeek(rec: OnboardingRecord, uid?: string, profile?: any, weekOffset = 0, now = new Date()): LiveWeek | null {
  if (!rec?.done || !rec.plan) return null;
  const opt = optionById(rec, rec.plan.option);
  const today = atMidnight(now); const T = isoDay(today);
  const logged = rec.plan.log?.[T];
  const todayCells = logged || simulate(rec, opt, uid, profile, today, 1).days[0]?.cells || [];
  const floor: Record<string, number> = {}; let pendL = 0, pendC = 0;
  for (const c of todayCells) {
    if ((c.kind === 'lesson' || c.kind === 'practice') && c.order) floor[c.trackId] = Math.max(floor[c.trackId] || 0, c.order + 1);
    const dn = cellDone(c, rec, uid, profile);
    if (c.kind === 'lesson' && !dn) pendL++; if (c.kind === 'check' && !dn) pendC++;
  }
  const tomorrow = addDays(today, 1);
  const fut = simulate(rec, opt, uid, profile, tomorrow, 14, floor, pendL, pendC, !logged);
  const sim = simulate(rec, opt, uid, profile, today, 1);
  const sunday = addDays(today, -today.getDay() + 7 * weekOffset);
  const startIso = isoDay(atMidnight(new Date(rec.plan.chosenAt || Date.now())));
  const rows: WeekRow[] = Array.from({ length: 7 }, (_, i) => {
    const d = addDays(sunday, i); const iso = isoDay(d); const di = d.getDay();
    const state: WeekRow['state'] = iso < T ? 'past' : iso === T ? 'today' : 'future';
    const cells = state === 'past' ? (rec.plan!.log?.[iso] || []) : state === 'today' ? todayCells : (fut.days.find(x => x.date === iso)?.cells || []);
    return { date: iso, dayIdx: di, state, beforePlan: iso < startIso, study: opt.studyDays.includes(di) || di === opt.checkDay, cells: cells.map(c => ({ ...c, done: cellDone(c, rec, uid, profile) })) };
  });
  return { option: opt, rows, todayCells, todayFromLog: !!logged, sim };
}

/** Freeze today's items into the log (once a day) so today never refills and the parent sees the same week. */
export async function ensureTodayLog(uid: string | undefined, rec: OnboardingRecord, profile?: any): Promise<OnboardingRecord | null> {
  const lw = liveWeek(rec, uid, profile); if (!lw || lw.todayFromLog || !uid) return null;
  const T = isoDay(atMidnight(new Date())); const cutoff = isoDay(addDays(atMidnight(new Date()), -14));
  const log: Record<string, PathPlanLogCell[]> = {};
  for (const [d, v] of Object.entries(rec.plan!.log || {})) if (d >= cutoff) log[d] = v;
  log[T] = lw.todayCells.map(({ key, kind, stepKind, trackId, order, labelAr, labelEn, subAr, subEn, who }) => JSON.parse(JSON.stringify({ key, kind, stepKind, trackId, order, labelAr, labelEn, subAr, subEn, who })));
  const nr: OnboardingRecord = { ...rec, plan: { ...rec.plan!, log } };
  await saveOnboarding(uid, nr);
  return nr;
}
export async function markReviewed(uid: string | undefined, rec: OnboardingRecord, key: string, on = true): Promise<OnboardingRecord> {
  const reviewed = { ...(rec.plan?.reviewed || {}) }; if (on) reviewed[key] = Date.now(); else delete reviewed[key];
  const nr: OnboardingRecord = { ...rec, plan: { ...(rec.plan as PathPlanChoice), reviewed } };
  await saveOnboarding(uid, nr); return nr;
}

/* ───────── Sara's existing smart plan (saraPlan / saraPlanSettings) ───────── */
const KIND: Record<PathPlanLogCell['kind'], PlanTask['kind']> = { lesson: 'lesson', practice: 'lesson', review: 'review', check: 'test' };
/** Rolling 7 days from today in Sara's SaraPlan shape (fromPath), so the «توليد خطة ذكية» card shows the same plan. */
export function toSaraPlan(rec: OnboardingRecord, uid?: string, profile?: any): SaraPlan | null {
  const lw = liveWeek(rec, uid, profile); if (!lw) return null;
  const nx = liveWeek(rec, uid, profile, 1)!;
  const all = [...lw.rows, ...nx.rows].filter(r => r.state !== 'past').slice(0, 7);
  const days: PlanDay[] = all.map((r, pos) => ({
    dayIdx: r.dayIdx, study: r.study,
    labelAr: pos === 0 ? `اليوم (${DAY_AR[r.dayIdx]})` : pos === 1 ? `بكرة (${DAY_AR[r.dayIdx]})` : DAY_AR[r.dayIdx],
    tasks: r.cells.map(c => ({ key: c.key, kind: KIND[c.kind], trackId: c.trackId, trackAr: c.kind === 'practice' ? 'تمرين' : c.kind === 'check' ? 'فحص المسار' : 'خطة مسارك', titleAr: c.subAr ? `${c.labelAr}: ${c.subAr}` : c.labelAr,
      order: c.order, levelId: c.kind === 'check' ? 'path-check' : undefined, open: true, reasonAr: c.kind === 'check' ? `كل ${CHECK_EVERY} دروس فحص قصير` : c.kind === 'review' ? 'مراجعة من خطتك' : `خطة ${lw.option.titleAr}` })),
  }));
  const fin = lw.sim.levelFinish ? `تخلص «${lw.sim.levelTitleAr}» تقريباً ${new Date(lw.sim.levelFinish + 'T00:00:00').toLocaleDateString('ar-SA', { day: 'numeric', month: 'long' })}` : '';
  return { weekStart: all[0]?.date || isoDay(new Date()), createdAt: Date.now(), perDay: lw.option.perDay, studyDays: lw.option.studyDays, isNew: false,
    focusAr: [`خطة مسارك: ${lw.option.titleAr} · ${lw.option.lessonsPerWeek} دروس بالأسبوع`, ...(fin ? [fin] : [])], days, fromPath: true, pathOption: lw.option.id };
}
/** Done-state of a fromPath SaraPlan task (tutor tracks included). */
export function pathTaskDone(t: PlanTask, rec: OnboardingRecord | null, uid?: string, profile?: any): boolean {
  if (!rec) return false;
  const p = t.key.split(':');
  if (p[0] === 'path') return readStepUnlocked(stepFor(p[1] as 'tutor' | 'sara', p[2]), uid, profile) > Number(p[3] || 0);
  if (p[0] === 'check') return (rec.checkpoints?.length || 0) >= Number(p[1] || 1);
  return !!rec.plan?.reviewed?.[t.key];
}
/** Make Sara's existing plan follow the chosen option (account + device copies, newest wins — same as before). */
export async function syncSaraPlan(uid: string | undefined, rec: OnboardingRecord, profile?: any): Promise<void> {
  if (!rec.plan) return;
  const opt = optionById(rec, rec.plan.option);
  const skey = `sara_plan_settings_${uid || 'guest'}`;
  let prev: any = null; try { prev = JSON.parse(localStorage.getItem(skey) || 'null'); } catch { /* ignore */ }
  const studyDays = Array.from(new Set([...opt.studyDays, opt.checkDay]));
  const full = { ...(prev || {}), perDay: opt.perDay, studyDays, mode: 'path', ticks: prev?.ticks || {}, updatedAt: Date.now() };
  try { localStorage.setItem(skey, JSON.stringify(full)); localStorage.setItem(`sara_plan_mode_${uid || 'guest'}`, JSON.stringify('path')); } catch { /* ignore */ }
  const sp = toSaraPlan(rec, uid, profile);
  if (sp) { const m = await import('./saraPlan'); m.savePlan(uid, sp); }
  // Cloud copy is fire-and-forget: the device copy is already written, so a slow/offline network never blocks the student.
  if (uid) updateDoc(doc(db, 'users', uid), { saraPlanSettings: JSON.parse(JSON.stringify(full)) }).catch(e => console.debug('plan settings note:', e));
}
/** Pick / change the plan option. Progress is untouched; past days of the log are kept, today onward is re-planned. */
export async function savePathPlanChoice(uid: string | undefined, rec: OnboardingRecord, option: PathPlanOptionId, profile?: any): Promise<OnboardingRecord> {
  const T = isoDay(atMidnight(new Date()));
  const prev = rec.plan;
  const log: Record<string, PathPlanLogCell[]> = {};
  for (const [d, v] of Object.entries(prev?.log || {})) if (d < T) log[d] = v;
  const plan: PathPlanChoice = { option, chosenAt: prev?.chosenAt || Date.now(), changedAt: Date.now(), log, reviewed: prev?.reviewed || {} };
  const nr: OnboardingRecord = { ...rec, plan, updatedAt: Date.now() };
  void saveOnboarding(uid, nr); // writes the device copy synchronously; cloud write continues in the background
  await syncSaraPlan(uid, nr, profile);
  return nr;
}

/** Short Arabic/English summary for Sara's chat context and the parent report. */
export function planSummary(rec: OnboardingRecord, uid?: string, profile?: any): { titleAr: string; titleEn: string; lessonsPerWeek: number; levelFinish: string | null; levelTitleAr: string; levelTitleEn: string; pathFinish: string | null } | null {
  const lw = liveWeek(rec, uid, profile); if (!lw) return null;
  return { titleAr: lw.option.titleAr, titleEn: lw.option.titleEn, lessonsPerWeek: lw.option.lessonsPerWeek, levelFinish: lw.sim.levelFinish, levelTitleAr: lw.sim.levelTitleAr, levelTitleEn: lw.sim.levelTitleEn, pathFinish: lw.sim.pathFinish };
}
