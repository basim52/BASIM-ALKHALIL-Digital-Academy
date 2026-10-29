import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import type { SaraTrack, SaraTrackLesson, SaraChoiceQuestion } from '../data/saraTracks/foundations';

/** End-of-level test (weighted marks out of 100, pass 60): 10 questions drawn from the level's own lessons (no AI calls), one per screen. */
export const LEVEL_TEST_PASS = 60;

/** Question difficulty → raw weight (easy 5 · medium 10 · hard 15), scaled so a test is always out of 100. */
export type Difficulty = 'easy' | 'medium' | 'hard';
const RAW: Record<Difficulty, number> = { easy: 5, medium: 10, hard: 15 };
const words = (t?: string) => (t || '').trim().split(/\s+/).filter(Boolean).length;
/**
 * Transparent heuristic (the lesson data has no difficulty field; an explicit `difficulty` wins when present):
 * - easy: every option is one word (word / pronoun / short-form pick) and the English prompt is ≤ 8 words;
 * - hard: an option of 7+ words, or an English prompt / shown text of 12+ words (reading a longer sentence, several rules at once);
 * - medium: everything else (choosing or correcting a sentence).
 */
export function difficultyOf(q: { promptEn?: string; show?: string; options: string[]; difficulty?: string }): Difficulty {
  if (q.difficulty === 'easy' || q.difficulty === 'medium' || q.difficulty === 'hard') return q.difficulty;
  const maxOpt = Math.max(0, ...q.options.map(o => words(String(o))));
  const promptLen = Math.max(words(q.promptEn), words(q.show));
  if (maxOpt >= 7 || promptLen >= 12) return 'hard';
  if (maxOpt <= 1 && promptLen <= 8) return 'easy';
  return 'medium';
}
/** Marks per question (whole numbers, largest-remainder rounding) that add up to exactly 100. */
export function weightedMarks(ds: Difficulty[]): number[] {
  if (!ds.length) return [];
  const raw = ds.map(d => RAW[d]); const sum = raw.reduce((a, b) => a + b, 0);
  const exact = raw.map(r => (r * 100) / sum); const out = exact.map(Math.floor);
  let left = 100 - out.reduce((a, b) => a + b, 0);
  exact.map((e, i) => [e - Math.floor(e), i] as const).sort((a, b) => b[0] - a[0]).forEach(([, i]) => { if (left > 0) { out[i]++; left--; } });
  return out;
}
export interface LevelTestItem { difficulty: Difficulty; marks: number; got: number }
/** Score a test out of 100 with weighted marks. */
export function gradeWeighted(qs: { difficulty?: string; promptEn?: string; show?: string; options: string[]; correctIndex: number }[], answers: number[]) {
  const ds = qs.map(difficultyOf); const marks = weightedMarks(ds);
  const items: LevelTestItem[] = qs.map((q, i) => ({ difficulty: ds[i], marks: marks[i], got: answers[i] === q.correctIndex ? marks[i] : 0 }));
  return { items, score: items.reduce((a, x) => a + x.got, 0) };
}

export interface LevelTestQuestion { lessonId: string; lessonOrder: number; lessonTitleAr: string; q: SaraChoiceQuestion }
export interface LevelTestAttempt {
  trackId: string; trackTitleAr: string; levelId: string; levelTitleAr: string;
  score: number; correct: number; total: number; passed: boolean;
  wrongByLesson: Record<string, number>;
  weakLessons: { id: string; order: number; titleAr: string; wrong: number }[];
  createdAtMs: number;
  /** Added Oct 2026 (weighted marks): per-question difficulty / marks / marks got. Older attempts don't have it. */
  items?: LevelTestItem[];
  /** 'weighted' when score uses weighted marks out of 100. */
  scoring?: 'weighted';
}

/** Levels of a track; Foundations has no levels → one level of all its lessons. */
export function trackLevels(track: SaraTrack): { id: string; titleAr: string; lessons: SaraTrackLesson[] }[] {
  if (!track.levels?.length) return [{ id: 'all', titleAr: track.titleAr, lessons: track.lessons }];
  return track.levels.map(v => ({ id: v.id, titleAr: v.titleAr, lessons: track.lessons.filter(l => l.levelId === v.id) }));
}

function shuffle<T>(a: T[]): T[] {
  const r = a.slice();
  for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
}

/** Up to 10 questions: one per lesson first (spread across the level), then fill from remaining questions; options shuffled. */
export function buildLevelTest(lessons: SaraTrackLesson[], target = 10): LevelTestQuestion[] {
  const count = target * 2;
  const pools = shuffle(lessons.filter(l => l.content)).map(l => ({ l, qs: shuffle([l.content!.check, ...l.content!.exercises]) }));
  const out: LevelTestQuestion[] = [];
  const seen = new Set<string>();
  for (let round = 0; out.length < count && round < 6; round++) {
    for (const { l, qs } of pools) {
      if (out.length >= count) break;
      const q = qs[round];
      if (!q) continue;
      const key = q.promptAr + '|' + (q.promptEn || '');
      if (seen.has(key)) continue;
      seen.add(key);
      const order = shuffle(q.options.map((_, i) => i));
      out.push({ lessonId: l.id, lessonOrder: l.order, lessonTitleAr: l.titleAr,
        q: { ...q, options: order.map(i => q.options[i]), correctIndex: order.indexOf(q.correctIndex) } });
    }
  }
  // balanced mix: aim for ~30% easy, 40% medium, 30% hard from a pool twice the size, then fill with whatever is left
  const pool = out; const want: Record<Difficulty, number> = { easy: Math.round(target * 0.3), hard: Math.round(target * 0.3), medium: 0 };
  want.medium = target - want.easy - want.hard;
  const picked: LevelTestQuestion[] = []; const rest: LevelTestQuestion[] = [];
  for (const x of pool) { const d = difficultyOf(x.q); if (want[d] > 0) { want[d]--; picked.push(x); } else rest.push(x); }
  return shuffle([...picked, ...rest.slice(0, Math.max(0, target - picked.length))]);
}

export function scoreLevelTest(track: SaraTrack, levelId: string, levelTitleAr: string, qs: LevelTestQuestion[], answers: number[]): LevelTestAttempt {
  const wrongByLesson: Record<string, number> = {};
  let correct = 0;
  qs.forEach((x, i) => { if (answers[i] === x.q.correctIndex) correct++; else wrongByLesson[x.lessonId] = (wrongByLesson[x.lessonId] || 0) + 1; });
  const { items, score } = gradeWeighted(qs.map(x => x.q), answers);
  const weakLessons = Object.entries(wrongByLesson).map(([id, wrong]) => {
    const l = track.lessons.find(x => x.id === id)!;
    return { id, order: l.order, titleAr: l.titleAr, wrong };
  }).sort((a, b) => b.wrong - a.wrong || a.order - b.order);
  return { trackId: track.id, trackTitleAr: track.titleAr, levelId, levelTitleAr, score, correct, total: qs.length,
    passed: score >= LEVEL_TEST_PASS, wrongByLesson, weakLessons, createdAtMs: Date.now(), items, scoring: 'weighted' };
}

/** Save every attempt under the student: users/{uid}/saraLevelTests/{auto}. Local copy too (guests / offline). */
export async function saveLevelTestAttempt(uid: string | undefined, a: LevelTestAttempt): Promise<boolean> {
  try {
    const k = `sara_level_tests_${uid || 'guest'}`;
    const list = JSON.parse(localStorage.getItem(k) || '[]');
    list.push(a); localStorage.setItem(k, JSON.stringify(list.slice(-200)));
  } catch { /* ignore */ }
  if (!uid) return false;
  try { await addDoc(collection(db, 'users', uid, 'saraLevelTests'), a); return true; } catch (e) { console.debug('saraLevelTests save note:', e); return false; }
}

export async function loadLevelTestAttempts(uid: string): Promise<LevelTestAttempt[]> {
  try {
    const snap = await getDocs(collection(db, 'users', uid, 'saraLevelTests'));
    return snap.docs.map(d => d.data() as LevelTestAttempt);
  } catch (e) {
    console.debug('saraLevelTests load note (local cache):', e);
    try { return JSON.parse(localStorage.getItem(`sara_level_tests_${uid}`) || '[]'); } catch { return []; }
  }
}

export interface LevelTestSummary { trackId: string; trackTitleAr: string; levelId: string; levelTitleAr: string; latest: LevelTestAttempt; best: LevelTestAttempt; attempts: number; /** attempts in the last 30 days (max 3) */ recent: number }
export function summarizeLevelTests(list: LevelTestAttempt[]): LevelTestSummary[] {
  const m = new Map<string, LevelTestSummary>();
  for (const a of list.slice().sort((x, y) => x.createdAtMs - y.createdAtMs)) {
    const k = `${a.trackId}:${a.levelId}`;
    const cur = m.get(k);
    if (!cur) m.set(k, { trackId: a.trackId, trackTitleAr: a.trackTitleAr, levelId: a.levelId, levelTitleAr: a.levelTitleAr, latest: a, best: a, attempts: 1, recent: 0 });
    else { cur.latest = a; cur.attempts++; if (a.score > cur.best.score) cur.best = a; }
  }
  const now = Date.now(); const seen = new Set<string>();
  for (const a of list) { const k = `${a.trackId}:${a.levelId}:${a.createdAtMs}`; if (seen.has(k)) continue; seen.add(k); if (now - a.createdAtMs < 30 * 24 * 60 * 60 * 1000) m.get(`${a.trackId}:${a.levelId}`)!.recent++; }
  return [...m.values()];
}
