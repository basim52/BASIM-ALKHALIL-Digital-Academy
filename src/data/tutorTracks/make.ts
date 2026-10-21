import type { SaraChoiceQuestion } from '../saraTracks/foundations';
import type { TutorLesson } from './nouraL1';
/** Shared lesson factory for the specialty tutors (same shape as nouraL1: content + 5-item board). */
export type Q = [string, string | null, string[], number];
export const q = ([promptAr, promptEn, options, correctIndex]: Q): SaraChoiceQuestion => ({ promptAr, ...(promptEn ? { promptEn } : {}), options, correctIndex });
export const makeLesson = (prefix: string, levelId: string) => (order: number, titleAr: string, titleEn: string, explanationAr: string, altExplanationAr: string, example: [string, string][], check: Q, exercises: Q[], rule: string, wrong: string, right: string): TutorLesson => ({
  id: `${prefix}-${String(order).padStart(2, '0')}`, order, levelId, titleAr, titleEn,
  content: { explanationAr, altExplanationAr, example: example.map(([en, ar]) => ({ en, ar })), check: q(check), exercises: exercises.map(q) },
  board: [{ kind: 'title', text: titleEn }, { kind: 'fix', wrong, right }, { kind: 'highlight', text: rule }, ...example.slice(0, 2).map(([en, ar]) => ({ kind: 'example' as const, en, ar }))],
});
