import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db, auth } from './firebase';
import { NEW_SKILL_TRACKS } from './saraSkills';
import { FOUNDATIONS_TRACK } from '../data/saraTracks/foundations';
import { ADVANCED_TRACK } from '../data/saraTracks/advanced';
import { CONVERSATION_TRACK } from '../data/saraTracks/conversation';
import { READING_TRACK } from '../data/saraTracks/reading';
import { WRITING_TRACK } from '../data/saraTracks/writing';
import { TUTOR_TRACKS } from '../data/tutorTracks';
import { FILL_BLANK_LESSONS, FILL_BLANK_TRACK_ID } from '../data/saraTracks/fillBlank';
import { TUTOR_FILL_BLANK_TRACKS } from '../data/fillBlankTracks';
import { LEGACY_TRACK_IDS, migrateLegacyCount } from '../data/saraTracks/fromCurriculum';
import { liveWeek } from './pathPlan';

/**
 * Sara + Teachers' Class progress for the parent report / progress analytics. REAL stored data only, read-only:
 *  - users/{uid}.saraTrackProgress / tutorTrackProgress = { [trackId]: unlockedOrder } → passed lessons = unlocked - 1
 *  - users/{uid}.saraCalls (finished calls), users/{uid}.saraExamPrep (IELTS/STEP practice sets)
 *  - users/{uid}/saraBoardSessions (board check questions), users/{uid}/saraLevelTests (end-of-level tests)
 *  - tutorMemory/{uid}.wordsLearned
 * Existing rules already allow owner / linked parent (parentIds) / admin to read all of these. Nothing is written.
 */
const SARA_TRACKS = [FOUNDATIONS_TRACK, ADVANCED_TRACK, CONVERSATION_TRACK, READING_TRACK, WRITING_TRACK, ...NEW_SKILL_TRACKS];
export interface TrackRow { id: string; titleAr: string; titleEn: string; passed: number; total: number; personaId?: string }
export interface SaraReport {
  sara: TrackRow[]; tutors: TrackRow[];
  lastAt: number; lastTrack: string | null;
  board: { n: number; week: number; correct: number; total: number; byPersona: Record<string, number>; last: { at: number; topic: string; personaId: string } | null };
  calls: { n: number; week: number; minutes: number; words: number; last: number };
  tests: { n: number; passed: number; attempts?: number; best: { name: string; score: number } | null; last: { name: string; score: number; at: number } | null };
  exams: { sets: number; correct: number; total: number };
  /** Onboarding path (users/{uid}.onboarding) — null when the student has not set one. */
  path: { titleAr: string; titleEn: string; level: string | null; minutes: number; checks: number } | null;
  /** Chosen path plan (onboarding.plan) — this week Sun→Sat with real done-state; null when no plan was chosen. */
  plan: { titleAr: string; titleEn: string; icon: string; lessonsPerWeek: number; done: number; planned: number; levelFinish: string | null; levelTitleAr: string; levelTitleEn: string; lastCheck: 'up' | 'keep' | 'review' | null;
    rows: { date: string; dayIdx: number; today: boolean; past: boolean; items: { labelAr: string; labelEn: string; done: boolean }[] }[] } | null;
  words: number;
  hasAny: boolean;
}
const DAY = 864e5;
const ms = (v: any) => (v?.toMillis ? v.toMillis() : typeof v?.seconds === 'number' ? v.seconds * 1000 : Number(v) || 0);
const localUnlocked = (k: string) => { try { return Number(localStorage.getItem(k)) || 1; } catch { return 1; } };

export async function loadSaraReport(uid: string): Promise<SaraReport | null> {
  if (!uid || uid.startsWith('sim_') || !auth.currentUser) return null;
  const own = auth.currentUser.uid === uid; // the student's own device may hold progress not yet synced
  const [u, bs, lt, mem] = await Promise.all([
    getDoc(doc(db, 'users', uid)).then(d => (d.data() || {}) as any).catch(() => ({} as any)),
    getDocs(collection(db, 'users', uid, 'saraBoardSessions')).then(s => s.docs.map(d => d.data() as any)).catch(() => [] as any[]),
    getDocs(collection(db, 'users', uid, 'saraLevelTests')).then(s => s.docs.map(d => d.data() as any)).catch(() => [] as any[]),
    getDoc(doc(db, 'tutorMemory', uid)).then(d => (d.data() || {}) as any).catch(() => ({} as any)),
  ]);
  const sp = (u.saraTrackProgress || {}) as Record<string, number>, tp = (u.tutorTrackProgress || {}) as Record<string, number>;
  // Lessons unlocked by placement / level-up jumps were not studied: never count them as passed.
  const skip = ((u.onboarding && u.onboarding.skipped) || {}) as Record<string, number>;
  const real = (id: string, n: number) => Math.max(0, n - (Number(skip[id]) || 0));
  const sara = SARA_TRACKS.map(t => {
    const lg = LEGACY_TRACK_IDS[t.id];
    let un = Number(sp[t.id]) || (lg ? migrateLegacyCount(Number(sp[lg]) || 1) : 1);
    if (own) un = Math.max(un, localUnlocked(`sara_track_${t.id}_${uid}`));
    return { id: t.id, titleAr: t.titleAr, titleEn: t.titleEn, total: t.lessons.length, passed: real(t.id, Math.max(0, Math.min(t.lessons.length, un - 1))) };
  });
  { // "Complete the sentence with Sara" (fill_blank) — same stored progress shape (unlocked order), read-only
    let un = Number(sp[FILL_BLANK_TRACK_ID]) || 1;
    if (own) un = Math.max(un, localUnlocked(`sara_track_${FILL_BLANK_TRACK_ID}_${uid}`));
    const total = FILL_BLANK_LESSONS.length;
    sara.push({ id: FILL_BLANK_TRACK_ID, titleAr: 'أكمل الجملة مع سارة', titleEn: 'Complete the Sentence with Sara', total, passed: Math.max(0, Math.min(total, un - 1)) });
  }
  const tutors = [...TUTOR_TRACKS, ...TUTOR_FILL_BLANK_TRACKS].map(t => {
    let un = Number(tp[t.id]) || 1;
    if (own) un = Math.max(un, localUnlocked(`tutor_track_${t.id}_${uid}`));
    return { id: t.id, titleAr: t.titleAr, titleEn: t.titleEn, personaId: t.personaId, total: t.lessons.length, passed: real(t.id, Math.max(0, Math.min(t.lessons.length, un - 1))) };
  });
  const since = Date.now() - 7 * DAY;
  const board: SaraReport['board'] = { n: 0, week: 0, correct: 0, total: 0, byPersona: {}, last: null };
  for (const b of bs) {
    const at = ms(b.createdAt); board.n++; if (at >= since) board.week++;
    board.correct += Number(b.checksCorrect) || 0; board.total += Number(b.checksTotal) || 0;
    const p = String(b.personaId || ''); board.byPersona[p] = (board.byPersona[p] || 0) + 1;
    if (at && (!board.last || at > board.last.at)) board.last = { at, topic: String(b.topic || ''), personaId: p };
  }
  const callList: any[] = Array.isArray(u.saraCalls) ? u.saraCalls : [];
  const calls = { n: callList.length, week: callList.filter(c => Number(c.at) >= since).length, minutes: Math.round(callList.reduce((s, c) => s + (Number(c.seconds) || 0), 0) / 60), words: callList.reduce((s, c) => s + (Number(c.words) || 0), 0), last: Math.max(0, ...callList.map(c => Number(c.at) || 0)) };
  // Official result per level = its LAST attempt (all attempts stay saved). n = levels tested, passed = levels whose last attempt passed.
  const lastByLevel = new Map<string, any>(); for (const a of lt) { const k = `${a.trackId}:${a.levelId}`; const c = lastByLevel.get(k); if (!c || (Number(a.createdAtMs) || 0) >= (Number(c.createdAtMs) || 0)) lastByLevel.set(k, a); }
  const tests: SaraReport['tests'] = { n: lastByLevel.size, attempts: lt.length, passed: [...lastByLevel.values()].filter(a => a.passed).length, best: null, last: null };
  for (const a of lt) {
    const name = String(a.levelTitleAr || a.levelId || ''), score = Math.round(Number(a.score) || 0), at = Number(a.createdAtMs) || 0;
    if (!tests.best || score > tests.best.score) tests.best = { name, score };
    if (!tests.last || at > tests.last.at) tests.last = { name, score, at };
  }
  const ex = Object.values((u.saraExamPrep || {}) as Record<string, any>);
  const exams = { sets: ex.length, correct: ex.reduce((s, r) => s + (Number(r?.correct) || 0), 0), total: ex.reduce((s, r) => s + (Number(r?.total) || 0), 0) };
  const words = Array.isArray(mem.wordsLearned) ? mem.wordsLearned.length : 0;
  const hasAny = sara.some(r => r.passed) || tutors.some(r => r.passed) || board.n > 0 || calls.n > 0 || tests.n > 0 || exams.sets > 0 || words > 0;
  const ob = u.onboarding && u.onboarding.done ? u.onboarding : null;
  const PI: Record<string, [string, string]> = { 'from-zero': ['مسار من الصفر', 'From-zero path'], kids: ['مسار الأطفال', 'Kids path'], exams: ['مسار الاختبارات', 'Exams path'], work: ['مسار العمل', 'Work path'], sara: ['مسار سارة حسب المستوى', "Sara's level path"] };
  const path = ob && PI[ob.path] ? { titleAr: PI[ob.path][0], titleEn: PI[ob.path][1], level: ob.placement?.level || null, minutes: Number(ob.answers?.minutes) || 0, checks: Array.isArray(ob.checkpoints) ? ob.checkpoints.length : 0 } : null;
  let plan: SaraReport['plan'] = null;
  try {
    const lw = ob?.plan ? liveWeek(ob, uid, u) : null;
    if (lw) {
      const lessons = lw.rows.flatMap(r => r.cells.filter(c => c.kind === 'lesson'));
      const cps = Array.isArray(ob.checkpoints) ? ob.checkpoints : [];
      plan = { titleAr: lw.option.titleAr, titleEn: lw.option.titleEn, icon: lw.option.icon, lessonsPerWeek: lw.option.lessonsPerWeek, done: lessons.filter(c => c.done).length, planned: lessons.length,
        levelFinish: lw.sim.levelFinish, levelTitleAr: lw.sim.levelTitleAr, levelTitleEn: lw.sim.levelTitleEn, lastCheck: cps.length ? cps[cps.length - 1].outcome : null,
        rows: lw.rows.map(r => ({ date: r.date, dayIdx: r.dayIdx, today: r.state === 'today', past: r.state === 'past', items: r.beforePlan && r.state === 'past' ? [] : r.cells.map(c => ({ labelAr: c.labelAr, labelEn: c.labelEn, done: c.done })) })) };
    }
  } catch (e) { console.debug('report plan note:', e); }
  return { path, plan, sara, tutors, lastAt: Number(u.saraTrackProgressAt) || 0, lastTrack: u.saraLastTrack || null, board, calls, tests, exams, words, hasAny };
}
