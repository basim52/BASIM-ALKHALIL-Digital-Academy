import type { SaraTrackLesson, SaraChoiceQuestion } from './foundations';

export type Q = [promptAr: string, options: string[], correctIndex: number, promptEn?: string];
/** Rotate options by k so the correct answer is not always in the same slot (content is authored correct-first). */
const q = ([promptAr, opts, ci, promptEn]: Q, k = 0): SaraChoiceQuestion => {
  const n = opts.length; const r = ((k % n) + n) % n;
  const options = opts.map((_, i) => opts[(i - r + n) % n]);
  const correctIndex = (ci + r) % n;
  return promptEn ? { promptAr, promptEn, options, correctIndex } : { promptAr, options, correctIndex };
};

/** Lesson factory for an advanced level; n is the 1-based position inside the level. */
export const makeL = (levelId: string, startOrder: number) =>
  (n: number, titleAr: string, titleEn: string, explanationAr: string, altExplanationAr: string,
    example: [string, string][], check: Q, exercises: Q[]): SaraTrackLesson => ({
    id: `adv-${levelId}-${String(n).padStart(2, '0')}`, order: startOrder + n - 1, levelId, titleAr, titleEn,
    content: { explanationAr, altExplanationAr, example: example.map(([en, ar]) => ({ en, ar })), check: q(check, n), exercises: exercises.map((e, i) => q(e, n + i + 1)) }
  });
