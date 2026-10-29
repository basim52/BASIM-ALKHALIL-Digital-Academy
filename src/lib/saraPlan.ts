import type { SaraTrack } from '../data/saraTracks/foundations';
import { FOUNDATIONS_TRACK } from '../data/saraTracks/foundations';
import { ADVANCED_TRACK } from '../data/saraTracks/advanced';
import { CONVERSATION_TRACK } from '../data/saraTracks/conversation';
import { READING_TRACK } from '../data/saraTracks/reading';
import { WRITING_TRACK } from '../data/saraTracks/writing';
import { NEW_SKILL_TRACKS, computeSaraSkills } from './saraSkills';
import { loadTrackProgress } from './saraProgressSync';
import { loadLevelTestAttempts, summarizeLevelTests, trackLevels, LEVEL_TEST_PASS, type LevelTestAttempt } from './saraLevelTests';
import { SARA_NEW_LEVELS } from './saraLevelGate';
import { EXAM_SETS } from '../data/saraTracks/examPrep';
import { loadExamResults, readExamResults, type ExamResults } from './saraExamSync';

/**
 * Sara weekly plan — same rules as the academy planner (study days, lessons per day, skip covered lessons,
 * weakness first, alternate subjects, a catch-up day), plus Sara's own rules:
 *  • only the real next lesson of each track, in order (later ones are marked "opens after the previous");
 *  • new-track levels are gated by the level test (as in the players); a test is planned before the next level;
 *  • weak lessons from real level tests become review tasks (max 1 a day); the weakest skill gets more slots;
 *  • IELTS/STEP practice only once the student has started it (next unattempted set, else the weakest one);
 *  • a brand-new student starts at Foundations lesson 1; no invented numbers anywhere.
 */
export type PlanKind = 'lesson' | 'review' | 'test' | 'exam' | 'catchup';
export interface PlanTask { key: string; kind: PlanKind; trackId: string; trackAr: string; titleAr: string; order?: number; levelId?: string; setId?: string; open: boolean; reasonAr: string }
export interface PlanDay { dayIdx: number; labelAr: string; study: boolean; tasks: PlanTask[] }
export interface SaraPlan { weekStart: string; createdAt: number; perDay: number; studyDays: number[]; isNew: boolean; focusAr: string[]; days: PlanDay[]; priorityTrackId?: string; fromBasket?: boolean;
  /** Built from the onboarding path plan (lib/pathPlan) — tasks may point at tutor tracks; done-state via pathTaskDone. */
  fromPath?: boolean; pathOption?: 'light' | 'medium' | 'intense' }
export interface PlanState { unlocked: Record<string, number>; passedTests: Set<string>; attemptedTests?: Set<string>; exam: ExamResults }

export const CORE_TRACKS: SaraTrack[] = [FOUNDATIONS_TRACK, ADVANCED_TRACK, CONVERSATION_TRACK, READING_TRACK, WRITING_TRACK];
export const ALL_PLAN_TRACKS: SaraTrack[] = [...CORE_TRACKS, ...NEW_SKILL_TRACKS];
const NEW_IDS = new Set(NEW_SKILL_TRACKS.map(t => t.id));
const SKILL_OF: Record<string, string> = { foundations: 'grammar', advanced_v2: 'grammar', conversation_v2: 'conversation', reading_v2: 'reading', writing_v2: 'writing', listening: 'listening', pronunciation: 'pronunciation', vocabulary: 'vocabulary', daily: 'daily' };
const DAY_AR = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
/** Week order Saturday → Friday (as the rest of Sara). */
export const WEEK_ORDER = [6, 0, 1, 2, 3, 4, 5];
export const DEFAULT_STUDY_DAYS = [6, 0, 1, 2, 3, 4]; // Sat–Thu; Friday = rest

const isoDate = (x: Date) => `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`;
export function weekStartIso(d = new Date()): string {
  const x = new Date(d); x.setHours(0, 0, 0, 0); x.setDate(x.getDate() - ((x.getDay() + 1) % 7));
  return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`;
}
const localUnlocked = (id: string, uid?: string) => { try { return Number(localStorage.getItem(`sara_track_${id}_${uid || 'guest'}`)) || 1; } catch { return 1; } };
const localTests = (uid?: string): LevelTestAttempt[] => { try { return JSON.parse(localStorage.getItem(`sara_level_tests_${uid || 'guest'}`) || '[]'); } catch { return []; } };
const built = (t: SaraTrack) => t.lessons.filter(l => NEW_IDS.has(t.id) || l.content);

/** Real state: progress (cloud ∪ device), passed level tests, IELTS/STEP results. */
export async function loadPlanState(uid?: string): Promise<PlanState & { attempts: LevelTestAttempt[] }> {
  const [remote, cloudTests, cloudExam] = await Promise.all([
    uid ? loadTrackProgress(uid).catch(() => ({} as Record<string, number>)) : Promise.resolve({} as Record<string, number>),
    uid ? loadLevelTestAttempts(uid).catch(() => []) : Promise.resolve([] as LevelTestAttempt[]),
    uid ? loadExamResults(uid).catch(() => ({} as ExamResults)) : Promise.resolve({} as ExamResults),
  ]);
  const unlocked: Record<string, number> = {};
  for (const t of ALL_PLAN_TRACKS) unlocked[t.id] = Math.max(Number((remote as any)[t.id]) || 1, localUnlocked(t.id, uid));
  const seen = new Set<number>(); const attempts = [...cloudTests, ...localTests(uid)].filter(a => { const k = a.createdAtMs; if (seen.has(k)) return false; seen.add(k); return true; });
  const passedTests = new Set(attempts.filter(a => a.passed).map(a => `${a.trackId}:${a.levelId}`));
  const exam: ExamResults = { ...cloudExam };
  for (const [k, v] of Object.entries(readExamResults(uid))) if (!exam[k] || v.lastAt > exam[k].lastAt) exam[k] = v;
  const attemptedTests = new Set(attempts.map(a => `${a.trackId}:${a.levelId}`));
  return { unlocked, passedTests, attemptedTests, exam, attempts };
}

/** Is this task already done according to real progress? (reviews are ticked by the student) */
export function taskDone(t: PlanTask, s: PlanState, weekStartMs: number): boolean {
  if (t.kind === 'lesson') return (s.unlocked[t.trackId] || 1) > (t.order || 0);
  // A taken test counts (failing never blocks: 3 attempts / 30 days, official result = last attempt).
  if (t.kind === 'test') return (s.attemptedTests || s.passedTests).has(`${t.trackId}:${t.levelId}`);
  if (t.kind === 'exam') return !!(t.setId && s.exam[t.setId] && s.exam[t.setId].lastAt >= weekStartMs);
  return false;
}

/** Sequence of upcoming items for one track, strictly in order, with level tests where the app requires them. */
function trackQueue(t: SaraTrack, s: PlanState, unlockAll: boolean, max: number): PlanTask[] {
  const out: PlanTask[] = []; const u = s.unlocked[t.id] || 1; const list = built(t);
  const isNew = NEW_IDS.has(t.id);
  const levelOf = (order: number) => isNew ? SARA_NEW_LEVELS.find(v => order >= v.from && order <= v.to) : undefined;
  let first = true;
  for (const l of list) {
    if (out.length >= max) break;
    if (l.order < u) continue;
    // New tracks: the next level opens only after the previous level's test (same gate as the players).
    if (isNew && l.order > 1 && (l.order - 1) % 30 === 0) {
      const prev = levelOf(l.order - 1)!;
      if (!s.passedTests.has(`${t.id}:${prev.id}`) && !unlockAll) {
        out.push({ key: `test:${t.id}:${prev.id}`, kind: 'test', trackId: t.id, trackAr: t.titleAr, levelId: prev.id, titleAr: `اختبار نهاية ${prev.titleAr}`, open: first,
          reasonAr: `لازم تنجح ${LEVEL_TEST_PASS}% عشان ينفتح المستوى التالي` });
        first = false;
        if (out.length >= max) break;
      }
    }
    out.push({ key: `lesson:${t.id}:${l.id}`, kind: 'lesson', trackId: t.id, trackAr: t.titleAr, order: l.order, titleAr: `${isNew ? ((l.order - 1) % 30) + 1 : l.order}. ${l.titleAr}`,
      open: unlockAll || first, reasonAr: first ? 'الدرس التالي في المسار' : unlockAll ? 'التالي بالترتيب (كل الدروس مفتوحة لحسابك)' : 'ينفتح بعد إنهاء الدرس اللي قبله' });
    first = false;
  }
  // Core tracks with levels: once a level's lessons are all passed, recommend its end test if not passed yet.
  if (!isNew && t.levels?.length) {
    for (const lv of trackLevels(t)) {
      const ls = lv.lessons.filter(x => x.content); if (!ls.length) continue;
      const last = Math.max(...ls.map(x => x.order));
      if (u > last && !s.passedTests.has(`${t.id}:${lv.id}`)) { out.unshift({ key: `test:${t.id}:${lv.id}`, kind: 'test', trackId: t.id, trackAr: t.titleAr, levelId: lv.id, titleAr: `اختبار نهاية ${lv.titleAr}`, open: true, reasonAr: 'خلصت دروس المستوى — ثبّتها بالاختبار' }); break; }
    }
  }
  return out;
}

export async function buildSaraPlan(uid: string | undefined, unlockAll: boolean, opts: { perDay?: number; studyDays?: number[] } = {}): Promise<SaraPlan> {
  const perDay = Math.min(3, Math.max(1, opts.perDay || 2));
  const studyDays = (opts.studyDays && opts.studyDays.length ? opts.studyDays : DEFAULT_STUDY_DAYS).slice();
  const st = await loadPlanState(uid);
  const skills = await computeSaraSkills(uid).catch(() => null);
  const started = ALL_PLAN_TRACKS.filter(t => (st.unlocked[t.id] || 1) > 1);
  const isNew = started.length === 0 && st.attempts.length === 0 && Object.keys(st.exam).length === 0;
  const focusAr: string[] = [];

  // Weakness from real results: failed/latest level tests → weak lessons; skill weight from best test / progress.
  const summaries = summarizeLevelTests(st.attempts).filter(x => x.trackId !== 'placement');
  const reviews: PlanTask[] = summaries.flatMap(x => (x.latest.passed ? x.latest.weakLessons.slice(0, 1) : x.latest.weakLessons).map(w => ({ w, x })))
    .sort((a, b) => b.w.wrong - a.w.wrong).slice(0, 6)
    .map(({ w, x }) => ({ key: `review:${x.trackId}:${w.id}`, kind: 'review' as const, trackId: x.trackId, trackAr: x.trackTitleAr, titleAr: `مراجعة: ${w.order}. ${w.titleAr}`, open: true,
      reasonAr: `غلطت فيه ${w.wrong} ${w.wrong === 1 ? 'سؤال' : 'أسئلة'} في اختبار ${x.levelTitleAr}` }));
  const weakSkill = skills?.skills.filter(s => s.testBest !== null && (s.testBest as number) < LEVEL_TEST_PASS).sort((a, b) => (a.testBest as number) - (b.testBest as number))[0];
  if (weakSkill) focusAr.push(`أضعف مهارة حسب اختباراتك: ${weakSkill.labelAr} (${weakSkill.testBest}%)`);
  if (reviews.length) focusAr.push(`${reviews.length} ${reviews.length === 1 ? 'درس يحتاج' : 'دروس تحتاج'} مراجعة من نتائج الاختبارات`);

  // Active tracks: new student → Foundations first, then vocabulary + everyday English join; otherwise started tracks (+ grammar base).
  let active: SaraTrack[];
  if (isNew) { active = [FOUNDATIONS_TRACK, NEW_SKILL_TRACKS.find(t => t.id === 'vocabulary')!, NEW_SKILL_TRACKS.find(t => t.id === 'daily')!]; focusAr.unshift('طالب جديد: نبدأ من الدرس الأول في أساسيات الإنجليزي'); }
  else {
    active = started.filter(t => (st.unlocked[t.id] || 1) <= built(t).length || t.levels?.length);
    if (!active.some(t => SKILL_OF[t.id] === 'grammar')) { const g = (st.unlocked[FOUNDATIONS_TRACK.id] || 1) <= built(FOUNDATIONS_TRACK).length ? FOUNDATIONS_TRACK : ADVANCED_TRACK; active.unshift(g); }
    const wt = (t: SaraTrack) => { const sk = skills?.skills.find(s => s.id === SKILL_OF[t.id]); if (!sk) return 0; return (sk.testBest !== null && sk.testBest < LEVEL_TEST_PASS ? 100 - sk.testBest : 0) + (100 - sk.pct) / 10; };
    active = active.sort((a, b) => wt(b) - wt(a)).slice(0, 4);
  }

  // Queues per track (enough for the week), weakest track gets double share.
  const studyCount = studyDays.length;
  const need = studyCount * perDay + 2;
  const queues = active.map(t => trackQueue(t, st, unlockAll, need));
  const rotation: number[] = [];
  queues.forEach((_, i) => { rotation.push(i); if (i === 0 && !isNew && weakSkill && SKILL_OF[active[0].id] === weakSkill.id) rotation.push(i); });
  const ptr = queues.map(() => 0);

  // IELTS/STEP: only once started; next unattempted set of the same exam/kind, else retry the weakest.
  let examTask: PlanTask | null = null;
  const attempted = EXAM_SETS.filter(x => st.exam[x.id]);
  if (attempted.length) {
    const last = attempted.sort((a, b) => st.exam[b.id].lastAt - st.exam[a.id].lastAt)[0];
    const next = EXAM_SETS.find(x => x.exam === last.exam && x.kind === last.kind && !st.exam[x.id]);
    const weakest = attempted.slice().sort((a, b) => st.exam[a.id].correct / (st.exam[a.id].total || 1) - st.exam[b.id].correct / (st.exam[b.id].total || 1))[0];
    const set = next || weakest;
    const r = st.exam[set.id];
    examTask = { key: `exam:${set.id}`, kind: 'exam', trackId: 'exam-prep', trackAr: 'IELTS / STEP', setId: set.id, titleAr: set.titleAr, open: true,
      reasonAr: next ? 'المجموعة التالية في تدريبك' : `إعادة: أفضل نتيجة ${r.correct}/${r.total}` };
  }

  // Rolling 7 days starting today (so a plan made on Thursday still has a full week ahead).
  const start = new Date(); start.setHours(0, 0, 0, 0);
  const ws = isoDate(start);
  const order = Array.from({ length: 7 }, (_, k) => (start.getDay() + k) % 7);
  const lastStudy = [...order].reverse().find(d => studyDays.includes(d));
  let ri = 0, rv = 0, rot = 0; let examPlaced = false; let studyN = 0;
  const days: PlanDay[] = order.map((d, pos) => {
    const study = studyDays.includes(d);
    const tasks: PlanTask[] = [];
    if (study) {
      studyN++;
      if (d === lastStudy && studyCount >= 4) {
        tasks.push({ key: `catchup:${ws}`, kind: 'catchup', trackId: '', trackAr: 'يوم تعويض', titleAr: 'كمّل أي مهمة فاتتك هالأسبوع', open: true, reasonAr: 'مثل خطة الأكاديمية: يوم مرن للتعويض والمراجعة' });
        if (reviews[rv]) tasks.push(reviews[rv++]);
      } else {
        if (!isNew && reviews[rv] && ri % 2 === 0) tasks.push(reviews[rv++]);
        ri++;
        if (examTask && !examPlaced && studyN >= 3) { tasks.push(examTask); examPlaced = true; }
        const used = new Set<string>(); let guard = 0;
        while (tasks.length < perDay && guard++ < rotation.length * 3) {
          const qi = rotation[rot++ % rotation.length]; const t = active[qi]; if (!t) break;
          if (used.has(t.id)) continue;
          // new student: vocabulary from the 2nd study day, everyday English from the 3rd (gentle start)
          if (isNew && ((t.id === 'vocabulary' && studyN < 2) || (t.id === 'daily' && studyN < 3))) continue;
          const item = queues[qi][ptr[qi]]; if (!item) continue;
          ptr[qi]++; used.add(t.id); tasks.push(item);
        }
      }
    }
    return { dayIdx: d, labelAr: pos === 0 ? `اليوم (${DAY_AR[d]})` : pos === 1 ? `بكرة (${DAY_AR[d]})` : DAY_AR[d], study, tasks };
  });
  if (examTask && !examPlaced) { const d = days.find(x => x.study && x.tasks.length && x.tasks[0].kind !== 'catchup'); if (d) d.tasks.push(examTask); }
  return { weekStart: ws, createdAt: Date.now(), perDay, studyDays, isNew, focusAr, days, priorityTrackId: !isNew && weakSkill && SKILL_OF[active[0]?.id] === weakSkill.id ? active[0].id : undefined };
}

const PKEY = (uid?: string) => `sara_plan_v2_${uid || 'guest'}`;
/** Saved plan, valid for 7 days from its start (then a fresh plan is built from the new progress). */
export const readSavedPlan = (uid?: string): SaraPlan | null => {
  try { const v = localStorage.getItem(PKEY(uid)); if (!v) return null; const p = JSON.parse(v) as SaraPlan;
    const age = (Date.now() - new Date(p.weekStart + 'T00:00:00').getTime()) / 86400000; return age >= 0 && age < 7 ? p : null; } catch { return null; }
};
export const savePlan = (uid: string | undefined, p: SaraPlan) => { try { localStorage.setItem(PKEY(uid), JSON.stringify(p)); } catch { /* ignore */ } };

/* ---------------- Full roadmap (all tracks, all levels) ---------------- */
/** Time estimate per lesson (minutes) — shown to the student as an estimate, same idea as the academy's lesson durations. */
export const LESSON_MIN = (trackId: string) => (NEW_IDS.has(trackId) ? 12 : 20);
export const TEST_MIN = 15;
export interface RoadLesson { order: number; num: number; titleAr: string; state: 'done' | 'next' | 'open' | 'locked' | 'soon'; inBasket?: boolean }
export interface RoadLevel { id: string; titleAr: string; lessons: RoadLesson[]; testPassed: boolean | null }
export interface RoadTrack { id: string; titleAr: string; total: number; done: number; remaining: number; levels: RoadLevel[]; finish?: string; minutesLeft: number }
export interface Roadmap { tracks: RoadTrack[]; totalLessons: number; doneLessons: number; remainingLessons: number; testsLeft: number; minutesPerDay: number; weeklyMinutes: number;
  studyDaysPerWeek: number; perDay: number; weeks: number; months: number; finish: string; totalMinutesLeft: number }

const addDays = (d: Date, n: number) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };

/** Every track and level with real progress/lock state; finish dates simulated day by day with the chosen study days and lessons/day (round-robin, priority track twice). */
export function buildRoadmap(st: PlanState, opts: { perDay: number; studyDays: number[]; unlockAll: boolean; priorityTrackId?: string; basket?: string[]; basketOnly?: boolean }): Roadmap {
  const bset = new Set(opts.basket || []); const only = !!opts.basketOnly;
  const tracks: RoadTrack[] = ALL_PLAN_TRACKS.map(t => {
    const u = st.unlocked[t.id] || 1; const isNew = NEW_IDS.has(t.id);
    const lvls = isNew ? SARA_NEW_LEVELS.map(v => ({ id: v.id as string, titleAr: v.titleAr, lessons: t.lessons.filter(l => l.order >= v.from && l.order <= v.to) }))
      : trackLevels(t).map(v => ({ id: v.id, titleAr: v.titleAr, lessons: v.lessons }));
    const levels: RoadLevel[] = lvls.filter(v => v.lessons.length).map((v, vi, arr) => {
      const prevPassed = vi === 0 || !isNew || st.passedTests.has(`${t.id}:${arr[vi - 1].id}`);
      return { id: v.id, titleAr: v.titleAr, testPassed: v.id === 'all' ? null : st.passedTests.has(`${t.id}:${v.id}`),
        lessons: v.lessons.map(l => {
          const builtL = isNew || !!l.content;
          const state: RoadLesson['state'] = l.order < u ? 'done' : !builtL ? 'soon' : l.order === u && (prevPassed || opts.unlockAll) ? 'next' : opts.unlockAll ? 'open' : 'locked';
          return { order: l.order, num: isNew ? ((l.order - 1) % 30) + 1 : l.order, titleAr: l.titleAr, state, inBasket: bset.has(`${t.id}:${l.order}`) };
        }) };
    });
    const b = only ? built(t).filter(l => bset.has(`${t.id}:${l.order}`)) : built(t); const done = b.filter(l => l.order < u).length;
    const remaining = b.length - done;
    return { id: t.id, titleAr: t.titleAr, total: b.length, done, remaining, levels, minutesLeft: remaining * LESSON_MIN(t.id) };
  });
  // Level tests still needed in the new tracks (they gate the next level) — counted in time, not as lessons.
  let testsLeft = 0;
  for (const t of tracks) if (NEW_IDS.has(t.id)) for (const v of t.levels) if (v.testPassed === false && v.lessons.some(l => l.state !== 'done' && (!only || l.inBasket))) testsLeft++;
  const perDay = Math.min(3, Math.max(1, opts.perDay)); const sd = opts.studyDays.length ? opts.studyDays : DEFAULT_STUDY_DAYS;
  // Simulate: each study day takes perDay lessons from the tracks in turn (priority track twice per round).
  const left: Record<string, number> = {}; tracks.forEach(t => { left[t.id] = t.remaining; });
  const rot: string[] = []; tracks.forEach(t => { if (t.remaining) { rot.push(t.id); if (t.id === opts.priorityTrackId) rot.push(t.id); } });
  let day = new Date(); day.setHours(0, 0, 0, 0); let r = 0, guard = 0; let lastDay = day;
  let remainingAll = tracks.reduce((a, t) => a + t.remaining, 0);
  while (remainingAll > 0 && guard++ < 4000) {
    if (sd.includes(day.getDay())) {
      const used = new Set<string>(); let k = 0, g2 = 0;
      while (k < perDay && remainingAll > 0 && g2++ < rot.length * 2 + 2) {
        const id = rot[r++ % rot.length]; if (!left[id] || used.has(id)) continue;
        left[id]--; remainingAll--; used.add(id); k++; lastDay = day;
        if (!left[id]) { const tr = tracks.find(x => x.id === id)!; tr.finish = isoDate(day); }
      }
    }
    day = addDays(day, 1);
  }
  const total = tracks.reduce((a, t) => a + t.total, 0), doneL = tracks.reduce((a, t) => a + t.done, 0), rem = total - doneL;
  const now = new Date(); now.setHours(0, 0, 0, 0);
  const days = Math.max(0, Math.round((lastDay.getTime() - now.getTime()) / 86400000) + 1);
  const minutesPerDay = Math.round(perDay * (tracks.filter(t => t.remaining).reduce((a, t) => a + LESSON_MIN(t.id), 0) / Math.max(1, tracks.filter(t => t.remaining).length)));
  return { tracks, totalLessons: total, doneLessons: doneL, remainingLessons: rem, testsLeft, perDay, studyDaysPerWeek: sd.length, minutesPerDay, weeklyMinutes: minutesPerDay * sd.length,
    weeks: rem ? Math.ceil(days / 7) : 0, months: rem ? Math.round((days / 30.44) * 10) / 10 : 0, finish: rem ? isoDate(lastDay) : '', totalMinutesLeft: tracks.reduce((a, t) => a + t.minutesLeft, 0) + testsLeft * TEST_MIN };
}

/* ---------------- 🧺 Lesson basket (student builds their own plan) ---------------- */
export interface BasketData { items: string[]; updatedAt: number }
const BKEY = (uid?: string) => `sara_basket_${uid || 'guest'}`;
export const basketKey = (trackId: string, order: number) => `${trackId}:${order}`;
export const readBasket = (uid?: string): BasketData => { try { const v = JSON.parse(localStorage.getItem(BKEY(uid)) || 'null'); if (v && Array.isArray(v.items)) return v; } catch { /* ignore */ } return { items: [], updatedAt: 0 }; };
export const writeBasketLocal = (uid: string | undefined, b: BasketData) => { try { localStorage.setItem(BKEY(uid), JSON.stringify(b)); } catch { /* ignore */ } };
const trackById = (id: string) => ALL_PLAN_TRACKS.find(t => t.id === id);
/** Keep only real built lessons, in curriculum order (done ones stay so progress shows). */
export function cleanBasket(items: string[], _st?: PlanState): string[] {
  const out: string[] = [];
  for (const t of ALL_PLAN_TRACKS) { for (const l of built(t)) { const k = basketKey(t.id, l.order); if (items.includes(k)) out.push(k); } }
  return out;
}
/** Add lessons; for a normal student a locked lesson brings the lessons before it (in-order unlocking). Returns how many prerequisites were added. */
export function basketAdd(items: string[], st: PlanState, trackId: string, orders: number[], unlockAll: boolean): { items: string[]; prereq: number } {
  const t = trackById(trackId); if (!t) return { items, prereq: 0 };
  const u = st.unlocked[t.id] || 1; const set = new Set(items); const want = new Set(orders.filter(o => o >= u));
  let prereq = 0;
  if (!unlockAll && want.size) { const max = Math.max(...want); for (const l of built(t)) if (l.order >= u && l.order < max && !want.has(l.order) && !set.has(basketKey(t.id, l.order))) { want.add(l.order); prereq++; } }
  for (const o of want) if (built(t).some(l => l.order === o)) set.add(basketKey(t.id, o));
  return { items: cleanBasket([...set], st), prereq };
}
/** Remove lessons; for a normal student, removing a lesson also removes the later basket lessons of that track that depend on it. */
export function basketRemove(items: string[], trackId: string, orders: number[], unlockAll: boolean): string[] {
  const min = Math.min(...orders); const rm = new Set(orders.map(o => basketKey(trackId, o)));
  return items.filter(k => { const [id, o] = [k.slice(0, k.lastIndexOf(':')), Number(k.slice(k.lastIndexOf(':') + 1))]; return !(rm.has(k) || (!unlockAll && id === trackId && o > min)); });
}
/** Smart suggestion: the tracks the smart plan picked (same rules), ~4 weeks of their next lessons. */
export function smartBasket(plan: SaraPlan, st: PlanState, unlockAll: boolean): string[] {
  const ids = [...new Set(plan.days.flatMap(d => d.tasks).filter(x => x.kind === 'lesson').map(x => x.trackId))];
  if (!ids.length) return [];
  const total = plan.perDay * plan.studyDays.length * 4;
  let items: string[] = [];
  ids.forEach(id => { const t = trackById(id)!; const u = st.unlocked[id] || 1; const share = Math.ceil(total / ids.length) * (id === plan.priorityTrackId ? 2 : 1);
    const next = built(t).filter(l => l.order >= u).slice(0, share).map(l => l.order); items = basketAdd(items, st, id, next, unlockAll).items; });
  return items;
}
/** 7-day schedule from the basket only (same day rules: in-order, level tests before a gated level, one lesson per track a day, catch-up day). */
export async function buildBasketPlan(uid: string | undefined, unlockAll: boolean, items: string[], opts: { perDay?: number; studyDays?: number[] } = {}): Promise<SaraPlan> {
  const perDay = Math.min(3, Math.max(1, opts.perDay || 2));
  const studyDays = (opts.studyDays && opts.studyDays.length ? opts.studyDays : DEFAULT_STUDY_DAYS).slice();
  const st = await loadPlanState(uid);
  const bset = new Set(cleanBasket(items, st));
  const tracks = ALL_PLAN_TRACKS.filter(t => built(t).some(l => bset.has(basketKey(t.id, l.order))));
  const queues = tracks.map(t => {
    const q = trackQueue(t, st, unlockAll, 9999); const maxB = Math.max(...built(t).filter(l => bset.has(basketKey(t.id, l.order))).map(l => l.order));
    return q.filter((x, i) => x.kind === 'lesson' ? bset.has(basketKey(t.id, x.order!)) : q.slice(i + 1).some(y => y.kind === 'lesson' && (y.order || 0) <= maxB)).map(x => x.kind === 'lesson' ? { ...x, reasonAr: `من سلتك · ${x.reasonAr}` } : x);
  });
  const ptr = queues.map(() => 0);
  const start = new Date(); start.setHours(0, 0, 0, 0); const ws = isoDate(start);
  const order = Array.from({ length: 7 }, (_, k) => (start.getDay() + k) % 7);
  const lastStudy = [...order].reverse().find(d => studyDays.includes(d));
  let rot = 0;
  const days: PlanDay[] = order.map((d, pos) => {
    const study = studyDays.includes(d); const tasks: PlanTask[] = [];
    if (study && queues.length) {
      if (d === lastStudy && studyDays.length >= 4) tasks.push({ key: `catchup:${ws}`, kind: 'catchup', trackId: '', trackAr: 'يوم تعويض', titleAr: 'كمّل أي مهمة فاتتك هالأسبوع', open: true, reasonAr: 'يوم مرن للتعويض والمراجعة' });
      else { const used = new Set<number>(); let g = 0;
        while (tasks.length < perDay && g++ < queues.length * 2) { const qi = rot++ % queues.length; if (used.has(qi)) continue; const it = queues[qi][ptr[qi]]; if (!it) continue; ptr[qi]++; used.add(qi); tasks.push(it); } }
    }
    return { dayIdx: d, labelAr: pos === 0 ? `اليوم (${DAY_AR[d]})` : pos === 1 ? `بكرة (${DAY_AR[d]})` : DAY_AR[d], study, tasks };
  });
  const left = queues.reduce((a, q, i) => a + q.length - ptr[i], 0);
  return { weekStart: ws, createdAt: Date.now(), perDay, studyDays, isNew: false, days, fromBasket: true,
    focusAr: [`خطتك من سلتك: ${bset.size} درس من ${tracks.length} ${tracks.length === 1 ? 'منهج' : 'مناهج'}`, ...(left ? [`${left} مهمة من السلة للأسابيع الجاية`] : [])] };
}
