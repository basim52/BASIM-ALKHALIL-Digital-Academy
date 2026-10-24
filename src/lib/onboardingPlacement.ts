/**
 * Short adaptive placement (8 items, one of them listening) built ONLY from real lesson questions
 * (check + exercises) of Sara's tracks, so every answer key is the lesson's own.
 * Bands: A1 = Foundations 1–15 · A2 = Foundations 16–30 · B1/B2/C1 = Advanced levels b1/b2/c1.
 * Up/down staircase: right → one band up, wrong → one band down.
 */
import { FOUNDATIONS_TRACK, type SaraChoiceQuestion, type SaraTrackLesson } from '../data/saraTracks/foundations';
import { ADVANCED_TRACK } from '../data/saraTracks/advanced';
import { BANDS, shuffleQ, type CefrBand, type LevelAnswer, type PlacementResult } from './onboarding';

export const PLACEMENT_ITEMS = 8;
export const LISTENING_AT = 3; // 4th item

const bandLessons = (b: number): SaraTrackLesson[] => {
  const f = FOUNDATIONS_TRACK.lessons.filter(l => l.content);
  if (b === 0) return f.filter(l => l.order <= 15);
  if (b === 1) return f.filter(l => l.order > 15);
  return ADVANCED_TRACK.lessons.filter(l => l.content && l.levelId === ['b1', 'b2', 'c1'][b - 2]);
};
// Questions that point back at the lesson page ("in the example above") are useless out of context.
const standalone = (q: SaraChoiceQuestion) => q.options.length >= 2 && q.correctIndex >= 0 && q.correctIndex < q.options.length && !/المثال|الدرس|فوق|سارة|الشرح/.test(q.promptAr);

export interface PlacementItem { kind: 'choice' | 'listen'; band: number; lessonId: string; q: SaraChoiceQuestion; audio?: string }
const rand = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];

export function startBand(level: LevelAnswer): number { return level === 'intermediate' ? 2 : level === 'understand' ? 1 : 0; }

export function makeItem(band: number, index: number, used: Set<string>): PlacementItem {
  const lessons = bandLessons(band);
  if (index === LISTENING_AT) {
    // Pick a short real example sentence; distractors are other real example sentences of the same band.
    const sents = Array.from(new Set(lessons.flatMap(l => l.content!.example.map(e => e.en.trim()))))
      .filter(s => s.split(/\s+/).length >= 3 && s.length <= 70);
    const target = rand(sents.filter(s => !used.has(s))) || rand(sents);
    const others = sents.filter(s => s !== target).sort(() => Math.random() - 0.5).slice(0, 3);
    used.add(target);
    return { kind: 'listen', band, lessonId: 'listening', audio: target, q: shuffleQ({ promptAr: 'اسمع الجملة واختر اللي سمعته', promptEn: 'Listen and choose what you heard', options: [target, ...others], correctIndex: 0 }) };
  }
  const pool = lessons.flatMap(l => [l.content!.check, ...(l.content!.exercises || [])].filter(Boolean).filter(standalone).map(q => ({ l, q: q as SaraChoiceQuestion })));
  const fresh = pool.filter(x => !used.has(x.q.promptAr));
  const pick = rand(fresh.length ? fresh : pool);
  used.add(pick.q.promptAr);
  return { kind: 'choice', band, lessonId: pick.l.id, q: shuffleQ(pick.q) };
}
export const nextBand = (band: number, right: boolean) => Math.max(0, Math.min(BANDS.length - 1, band + (right ? 1 : -1)));

/** Placed band = highest band where the student was right at least once and not wrong more often than right. */
export function scorePlacement(log: { band: number; right: boolean | null }[]): PlacementResult {
  const answered = log.filter(x => x.right !== null);
  const correct = answered.filter(x => x.right).length;
  let band = 0;
  for (let b = BANDS.length - 1; b >= 0; b--) {
    const r = answered.filter(x => x.band === b && x.right).length, w = answered.filter(x => x.band === b && !x.right).length;
    if (r >= 1 && r >= w) { band = b; break; }
  }
  const total = answered.length;
  return { level: BANDS[band] as CefrBand, band, correct, total, score: total ? Math.round((correct / total) * 100) : 0, at: Date.now() };
}
