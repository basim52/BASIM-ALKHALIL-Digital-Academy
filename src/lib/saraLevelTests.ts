import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import type { SaraTrack, SaraTrackLesson, SaraChoiceQuestion } from '../data/saraTracks/foundations';

/** End-of-level test: 15–20 questions drawn from the level's own lessons (no AI calls), one per screen. */
export const LEVEL_TEST_PASS = 80;

export interface LevelTestQuestion { lessonId: string; lessonOrder: number; lessonTitleAr: string; q: SaraChoiceQuestion }
export interface LevelTestAttempt {
  trackId: string; trackTitleAr: string; levelId: string; levelTitleAr: string;
  score: number; correct: number; total: number; passed: boolean;
  wrongByLesson: Record<string, number>;
  weakLessons: { id: string; order: number; titleAr: string; wrong: number }[];
  createdAtMs: number;
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

/** Up to 18 questions: one per lesson first (spread across the level), then fill from remaining questions; options shuffled. */
export function buildLevelTest(lessons: SaraTrackLesson[], count = 18): LevelTestQuestion[] {
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
  return shuffle(out);
}

export function scoreLevelTest(track: SaraTrack, levelId: string, levelTitleAr: string, qs: LevelTestQuestion[], answers: number[]): LevelTestAttempt {
  const wrongByLesson: Record<string, number> = {};
  let correct = 0;
  qs.forEach((x, i) => { if (answers[i] === x.q.correctIndex) correct++; else wrongByLesson[x.lessonId] = (wrongByLesson[x.lessonId] || 0) + 1; });
  const score = Math.round((correct / Math.max(1, qs.length)) * 100);
  const weakLessons = Object.entries(wrongByLesson).map(([id, wrong]) => {
    const l = track.lessons.find(x => x.id === id)!;
    return { id, order: l.order, titleAr: l.titleAr, wrong };
  }).sort((a, b) => b.wrong - a.wrong || a.order - b.order);
  return { trackId: track.id, trackTitleAr: track.titleAr, levelId, levelTitleAr, score, correct, total: qs.length,
    passed: score >= LEVEL_TEST_PASS, wrongByLesson, weakLessons, createdAtMs: Date.now() };
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

export interface LevelTestSummary { trackId: string; trackTitleAr: string; levelId: string; levelTitleAr: string; latest: LevelTestAttempt; best: LevelTestAttempt; attempts: number }
export function summarizeLevelTests(list: LevelTestAttempt[]): LevelTestSummary[] {
  const m = new Map<string, LevelTestSummary>();
  for (const a of list.slice().sort((x, y) => x.createdAtMs - y.createdAtMs)) {
    const k = `${a.trackId}:${a.levelId}`;
    const cur = m.get(k);
    if (!cur) m.set(k, { trackId: a.trackId, trackTitleAr: a.trackTitleAr, levelId: a.levelId, levelTitleAr: a.levelTitleAr, latest: a, best: a, attempts: 1 });
    else { cur.latest = a; cur.attempts++; if (a.score > cur.best.score) cur.best = a; }
  }
  return [...m.values()];
}
