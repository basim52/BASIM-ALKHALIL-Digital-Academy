/**
 * Student onboarding / guidance ("وجّهني"): welcome answers → short adaptive placement → recommended path.
 * Stored on users/{uid}.onboarding (owner-writable field, no rule changes) + localStorage fallback.
 * Progress itself is NOT duplicated here: the path only points at existing tracks (tutor tracks / Sara tracks)
 * and reads their existing unlocked counters, so nothing about current progress or parent links changes.
 */
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { TUTOR_TRACKS, type TutorTrack } from '../data/tutorTracks';
import { FOUNDATIONS_TRACK, type SaraTrack, type SaraTrackLesson, type SaraChoiceQuestion } from '../data/saraTracks/foundations';
import { ADVANCED_TRACK } from '../data/saraTracks/advanced';
import { readTutorUnlocked, saveTutorUnlocked } from './tutorProgress';
import { pushTrackProgress } from './saraProgressSync';

export type WhoAnswer = 'child' | 'student' | 'employee' | 'adult';
export type GoalAnswer = 'travel' | 'school' | 'exams' | 'work' | 'start';
export type LevelAnswer = 'none' | 'words' | 'understand' | 'intermediate';
export type MinutesAnswer = 10 | 20 | 30;
export interface OnboardingAnswers { who: WhoAnswer; goal: GoalAnswer; level: LevelAnswer; minutes: MinutesAnswer }

export type CefrBand = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
export const BANDS: CefrBand[] = ['A1', 'A2', 'B1', 'B2', 'C1'];
export interface PlacementResult { level: CefrBand; band: number; correct: number; total: number; score: number; at: number }

export type PathId = 'from-zero' | 'kids' | 'exams' | 'work' | 'sara';
export interface PathStep { kind: 'tutor' | 'sara'; trackId: string; startOrder: number }
export interface PathCheckpoint { at: number; lessonsDone: number; trackId: string; correct: number; total: number; outcome: 'up' | 'keep' | 'review' }
export interface OnboardingRecord {
  v: 1;
  done: boolean;
  answers: OnboardingAnswers;
  placement: PlacementResult | null; // null = skipped («ما أعرف شي»)
  path: PathId;
  steps: PathStep[];
  /** Unlocked counters of the path tracks at the moment the path was saved (lessons after this count toward the 10-lesson checks). */
  baseline: Record<string, number>;
  /** Lessons unlocked by placement/level-up jumps (not studied) — subtracted in reports so numbers stay real. */
  skipped: Record<string, number>;
  /** Lessons jumped by level-ups after the baseline (not studied) — excluded from the 10-lesson count. */
  jumpsSinceBaseline?: number;
  checkpoints: PathCheckpoint[];
  updatedAt: number;
}

import { LS, LS_LATER, readLocalOnboarding } from './onboardingGate';
export { readLocalOnboarding, deferOnboarding, isDeferred, isExistingStudent, shouldGateOnboarding } from './onboardingGate';

/** Cloud ∪ device (newest wins). */
export async function loadOnboarding(uid?: string, profileField?: unknown): Promise<OnboardingRecord | null> {
  const local = readLocalOnboarding(uid);
  let cloud = (profileField && typeof profileField === 'object') ? profileField as OnboardingRecord : null;
  if (!cloud && uid) { try { cloud = ((await getDoc(doc(db, 'users', uid))).data()?.onboarding as OnboardingRecord) || null; } catch { /* offline */ } }
  const best = [local, cloud].filter(Boolean).sort((a, b) => (b!.updatedAt || 0) - (a!.updatedAt || 0))[0] || null;
  if (best && uid) { try { localStorage.setItem(LS(uid), JSON.stringify(best)); } catch { /* ignore */ } }
  return best;
}
export async function saveOnboarding(uid: string | undefined, rec: OnboardingRecord): Promise<boolean> {
  rec = { ...rec, updatedAt: Date.now() };
  try { localStorage.setItem(LS(uid), JSON.stringify(rec)); localStorage.removeItem(LS_LATER(uid)); } catch { /* ignore */ }
  if (!uid) return false;
  try { await updateDoc(doc(db, 'users', uid), { onboarding: JSON.parse(JSON.stringify(rec)), onboardingDeferredAt: null }); return true; }
  catch (e) { console.debug('onboarding save note:', e); return false; }
}
/* ───────── tracks & progress ───────── */
export const tutorTrack = (id: string): TutorTrack | undefined => TUTOR_TRACKS.find(t => t.id === id);
const SARA_PATH_TRACKS: SaraTrack[] = [FOUNDATIONS_TRACK, ADVANCED_TRACK];
export const pathTrack = (s: PathStep): SaraTrack | TutorTrack | undefined => s.kind === 'tutor' ? tutorTrack(s.trackId) : SARA_PATH_TRACKS.find(t => t.id === s.trackId);
const saraLocal = (id: string, uid?: string) => { try { return Math.max(1, Number(localStorage.getItem(`sara_track_${id}_${uid || 'guest'}`)) || 1); } catch { return 1; } };
/** Unlocked order of a path track: furthest of device and cloud copies (same merge the app already uses). */
export function readStepUnlocked(s: PathStep, uid?: string, profile?: any): number {
  const cloud = Number((s.kind === 'tutor' ? profile?.tutorTrackProgress : profile?.saraTrackProgress)?.[s.trackId]) || 1;
  return Math.max(cloud, s.kind === 'tutor' ? readTutorUnlocked(s.trackId, uid) : saraLocal(s.trackId, uid));
}
/** Raise (never lower) a track's unlocked counter. Returns how many lessons were jumped. */
export function raiseUnlocked(s: PathStep, uid: string | undefined, profile: any, to: number): number {
  const cur = readStepUnlocked(s, uid, profile);
  if (to <= cur) return 0;
  if (s.kind === 'tutor') saveTutorUnlocked(s.trackId, uid, to);
  else { try { localStorage.setItem(`sara_track_${s.trackId}_${uid || 'guest'}`, String(to)); } catch { /* ignore */ } void pushTrackProgress(uid, s.trackId, to); }
  return to - cur;
}

/* ───────── path mapping ───────── */
const FROM_ZERO = ['tutor-lama', 'tutor-reem', 'tutor-haya', 'tutor-jana'];
const levelStart = (track: SaraTrack | TutorTrack | undefined, levelId: string) => track?.lessons.find(l => l.levelId === levelId)?.order || 1;

/**
 * Mapping (approved by the owner):
 *  child → colourful from-zero teachers (Lama→Reem→Haya→Jana→Sara), starting teacher by placement
 *  «ما أعرف شي» → from zero: Lama→Reem→Haya→Jana→Sara
 *  exams → Ali + Jana's exercises · work → Mohammed + Noura
 *  everyone else → Sara at the placed level (A1–A2 Foundations, B1+ Advanced at that level)
 */
export function buildPath(a: OnboardingAnswers, p: PlacementResult | null): { path: PathId; steps: PathStep[] } {
  const band = p ? p.band : 0;
  const tutor = (id: string, startOrder = 1): PathStep => ({ kind: 'tutor', trackId: id, startOrder });
  const saraAt = (b: number): PathStep => b <= 0 ? { kind: 'sara', trackId: FOUNDATIONS_TRACK.id, startOrder: 1 }
    : b === 1 ? { kind: 'sara', trackId: FOUNDATIONS_TRACK.id, startOrder: 16 }
    : { kind: 'sara', trackId: ADVANCED_TRACK.id, startOrder: levelStart(ADVANCED_TRACK, ['b1', 'b2', 'c1'][Math.min(2, b - 2)]) };
  if (a.who === 'child' && band < 2) {
    const from = a.level === 'none' || !p ? 0 : band === 0 ? 1 : 2;
    return { path: 'kids', steps: [...FROM_ZERO.slice(from).map(id => tutor(id)), saraAt(0)] };
  }
  if (a.level === 'none') return { path: 'from-zero', steps: [...FROM_ZERO.map(id => tutor(id)), saraAt(0)] };
  if (a.goal === 'exams') return { path: 'exams', steps: [tutor('tutor-ali'), tutor('tutor-jana')] };
  if (a.goal === 'work') return { path: 'work', steps: [tutor('tutor-mohammed'), tutor('tutor-noura')] };
  return { path: 'sara', steps: [saraAt(band)] };
}

/**
 * Save the path as the student's own. Only the FIRST step can jump ahead (Sara at the placed level);
 * counters are only ever raised and the jump is recorded in `skipped` so reports subtract it.
 */
export async function commitPath(uid: string | undefined, profile: any, answers: OnboardingAnswers, placement: PlacementResult | null, prev?: OnboardingRecord | null): Promise<OnboardingRecord> {
  const { path, steps } = buildPath(answers, placement);
  const skipped: Record<string, number> = { ...(prev?.skipped || {}) };
  if (steps[0] && steps[0].startOrder > 1) { const j = raiseUnlocked(steps[0], uid, profile, steps[0].startOrder); if (j) skipped[steps[0].trackId] = (skipped[steps[0].trackId] || 0) + j; }
  const baseline: Record<string, number> = {};
  for (const s of steps) baseline[s.trackId] = Math.max(readStepUnlocked(s, uid, profile), s === steps[0] ? s.startOrder : 1);
  const rec: OnboardingRecord = { v: 1, done: true, answers, placement, path, steps, baseline, skipped, jumpsSinceBaseline: 0, checkpoints: [], updatedAt: Date.now() };
  await saveOnboarding(uid, rec);
  return rec;
}

export const PATH_INFO: Record<PathId, { titleAr: string; titleEn: string; descAr: string; descEn: string }> = {
  'from-zero': { titleAr: 'مسار من الصفر', titleEn: 'From-zero path', descAr: 'نبدأ بالحروف والأصوات، بعدها الكلمات والجمل، وبعدها التمارين، وتكمل مع سارة.', descEn: 'Letters and sounds first, then words, sentences and practice, then on with Sara.' },
  kids: { titleAr: 'مسار الأطفال الملوّن', titleEn: 'Colourful kids path', descAr: 'معلمات الأطفال خطوة بخطوة: حروف، كلمات، جمل وتمارين ممتعة.', descEn: 'Kids teachers step by step: letters, words, sentences and fun practice.' },
  exams: { titleAr: 'مسار الاختبارات', titleEn: 'Exams path', descAr: 'استراتيجيات IELTS مع علي، وتمارين مراجعة مع جنى.', descEn: 'IELTS strategies with Ali, plus review practice with Jana.' },
  work: { titleAr: 'مسار العمل', titleEn: 'Work path', descAr: 'إنجليزية الأعمال مع محمد، وتصحيح الأخطاء الشائعة مع نورة.', descEn: 'Business English with Mohammed, plus common-mistake fixes with Noura.' },
  sara: { titleAr: 'مسار سارة حسب مستواك', titleEn: "Sara's path at your level", descAr: 'سارة تشرح لك القواعد والجمل خطوة بخطوة من مستواك.', descEn: 'Sara teaches grammar and sentences step by step from your level.' },
};
/** Portrait file (/tutors/{id}.webp) for a path step. */
export function stepPortrait(s: PathStep): string {
  if (s.kind === 'sara') return 'sara';
  return tutorTrack(s.trackId)?.personaId || 'sara';
}
export function stepTitle(s: PathStep, en: boolean): string { const t = pathTrack(s); return t ? (en ? t.titleEn : t.titleAr) : s.trackId; }

/* ───────── next lesson & checkpoints ───────── */
export interface NextLesson { step: PathStep; stepIndex: number; track: SaraTrack | TutorTrack; lesson: SaraTrackLesson; order: number }
/** First path track that still has lessons left → its next unlocked lesson. */
export function nextPathLesson(rec: OnboardingRecord, uid?: string, profile?: any): NextLesson | null {
  for (let i = 0; i < rec.steps.length; i++) {
    const s = rec.steps[i]; const track = pathTrack(s); if (!track) continue;
    const u = readStepUnlocked(s, uid, profile);
    if (u <= track.lessons.length) {
      const lesson = track.lessons.find(l => l.order === u) || track.lessons[0];
      return { step: s, stepIndex: i, track, lesson, order: lesson.order };
    }
  }
  return null;
}
/** Lessons completed since the path was saved (all path tracks). */
export function lessonsSincePath(rec: OnboardingRecord, uid?: string, profile?: any): number {
  const moved = rec.steps.reduce((n, s) => n + Math.max(0, readStepUnlocked(s, uid, profile) - Math.max(1, rec.baseline?.[s.trackId] || 1)), 0);
  return Math.max(0, moved - (rec.jumpsSinceBaseline || 0));
}
export const CHECK_EVERY = 10;
export function checkpointDue(rec: OnboardingRecord, uid?: string, profile?: any): boolean {
  if (!rec?.done) return false;
  return Math.floor(lessonsSincePath(rec, uid, profile) / CHECK_EVERY) > (rec.checkpoints?.length || 0);
}
const shuffle = <T,>(a: T[]): T[] => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
export function shuffleQ(q: SaraChoiceQuestion): SaraChoiceQuestion {
  const idx = shuffle(q.options.map((_, i) => i));
  return { ...q, options: idx.map(i => q.options[i]), correctIndex: idx.indexOf(q.correctIndex) };
}
export interface CheckQ { lesson: SaraTrackLesson; q: SaraChoiceQuestion }
/** ~5 real questions from the last 10 completed lessons of the track the student is on. */
export function buildCheckpoint(rec: OnboardingRecord, uid?: string, profile?: any, count = 5): { step: PathStep; track: SaraTrack | TutorTrack; qs: CheckQ[] } | null {
  let pick: { s: PathStep; u: number } | null = null;
  for (const s of rec.steps) { const u = readStepUnlocked(s, uid, profile); if (u > 1) pick = { s, u }; const t = pathTrack(s); if (t && u <= t.lessons.length) break; }
  if (!pick) return null;
  const track = pathTrack(pick.s)!;
  const done = track.lessons.filter(l => l.order < pick!.u && l.content).slice(-CHECK_EVERY);
  const pool: CheckQ[] = [];
  for (const l of shuffle(done)) { const c = l.content!; const qs = [c.check, ...(c.exercises || [])].filter(Boolean) as SaraChoiceQuestion[]; if (qs.length) pool.push({ lesson: l, q: shuffleQ(qs[Math.floor(Math.random() * qs.length)]) }); }
  if (!pool.length) return null;
  return { step: pick.s, track, qs: pool.slice(0, count) };
}
/** Level-up after an excellent check: jump to the start of the next level of the same track (never lowers). */
export function nextLevelOrder(track: SaraTrack | TutorTrack, currentOrder: number): number | null {
  const cur = track.lessons.find(l => l.order === Math.min(currentOrder, track.lessons.length));
  const ids = (track.levels || []).map(v => v.id);
  const i = cur?.levelId ? ids.indexOf(cur.levelId) : -1;
  if (i < 0 || i + 1 >= ids.length) return null;
  return levelStart(track, ids[i + 1]);
}
