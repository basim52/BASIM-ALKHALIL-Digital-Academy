import type { SaraTrackLesson, SaraChoiceQuestion } from './foundations';
import type { SaraCurriculumLesson, SaraQuestion } from '../saraCurriculum/types';

/** Level id + title of the foundation level built from src/data/saraCurriculum (30 lessons, Pre-A1 → B2). */
export const FOUNDATION_LEVEL = { id: 'a', titleAr: 'التأسيس (من الصفر إلى B2)', titleEn: 'Foundations (Pre-A1 → B2)' };
export const FOUNDATION_COUNT = 30;

const toChoice = (q: SaraQuestion): SaraChoiceQuestion => ({ promptAr: q.questionAr, promptEn: q.questionEn, options: q.options, correctIndex: q.correctIndex });

/** One page per lesson: idea (desc + rule), example (3 lines), a check and 3 exercises — all from the authored data. */
export function curriculumToTrack(src: SaraCurriculumLesson[]): SaraTrackLesson[] {
  return src.slice(0, FOUNDATION_COUNT).map((l, i) => {
    const alt = [l.commonMistakes?.[0] ? `انتبه: نقول ${l.commonMistakes[0].correct} مو ${l.commonMistakes[0].incorrect}. ${l.commonMistakes[0].whyAr}` : '', ...(l.whiteboardNotes?.pointsAr || []).slice(0, 2)].filter(Boolean).join(' ');
    const qs = l.quiz.length ? l.quiz : (l.masteryCheck?.questions || []);
    return {
      id: l.id, order: i + 1, levelId: FOUNDATION_LEVEL.id, titleAr: l.titleAr, titleEn: l.titleEn,
      content: {
        explanationAr: `${l.descAr} ${l.keyPattern.ruleAr}`.trim(),
        altExplanationAr: alt || l.keyPattern.ruleAr,
        example: (l.practicalExamples.length ? l.practicalExamples : l.grammarFocus?.examples || []).slice(0, 3).map(e => ({ en: e.en, ar: e.ar })),
        check: toChoice(qs[0]),
        exercises: qs.slice(1, 4).map(toChoice)
      }
    };
  });
}

/** Existing levels move after the foundation level; ids stay, orders shift. */
export const shiftOrders = (ls: SaraTrackLesson[]) => ls.map(l => ({ ...l, order: l.order + FOUNDATION_COUNT }));

/** Track ids changed when the foundation level was prepended (v2). Old progress counts lessons of the old numbering. */
export const LEGACY_TRACK_IDS: Record<string, string> = { advanced_v2: 'advanced', conversation_v2: 'conversation', reading_v2: 'reading', writing_v2: 'writing' };
/** Convert a legacy unlocked count: a student who had started keeps their place (foundation level counted as done). */
export const migrateLegacyCount = (n: number) => (n > 1 ? n + FOUNDATION_COUNT : 1);
