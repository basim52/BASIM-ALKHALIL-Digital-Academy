import type { SaraTrack } from '../saraTracks/foundations';
import { NOURA_L1, type TutorLesson } from './nouraL1';
/** Specialty tutor tracks. Kept OUT of SARA_TRACKS so Sara's plan/basket/unlocking/level tests are unaffected. */
export type TutorTrack = SaraTrack & { lessons: TutorLesson[]; personaId: 'grammar' | 'business' | 'exams' };
export const NOURA_TRACK: TutorTrack = {
  id: 'tutor-noura', personaId: 'grammar',
  titleAr: 'أخطاء العرب الشائعة مع نورة', titleEn: 'Common Mistakes of Arabic Speakers',
  levels: [{ id: 'l1', titleAr: 'المستوى الأول: أخطاء أساسية', titleEn: 'Level 1: Basic mistakes' }],
  lessons: NOURA_L1,
};
export const TUTOR_TRACKS: TutorTrack[] = [NOURA_TRACK];
export type { TutorLesson };
