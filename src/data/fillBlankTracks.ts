import { FILL_BLANK_LESSONS, FILL_BLANK_TRACK_ID, type FillBlankTrack } from './saraTracks/fillBlank';
import { NOURA_FILL_BLANK_LESSONS } from './tutorTracks/fillBlankNoura';
import { MOHAMMED_FILL_BLANK_LESSONS } from './tutorTracks/fillBlankMohammed';
import { ALI_FILL_BLANK_LESSONS } from './tutorTracks/fillBlankAli';

/** 🧩 Complete-the-sentence tracks: one per tutor, each in that tutor's own face + cloud voice. */
export const SARA_FILL_BLANK: FillBlankTrack = { id: FILL_BLANK_TRACK_ID, store: 'sara', personaId: 'sara', voice: 'Kore', titleAr: 'أكمل الجملة مع سارة', titleEn: 'Complete the Sentence with Sara', lessons: FILL_BLANK_LESSONS };
export const TUTOR_FILL_BLANK_TRACKS: FillBlankTrack[] = [
  { id: 'fill_blank_noura', store: 'tutor', personaId: 'grammar', voice: 'Aoede', titleAr: 'أكمل الجملة مع نورة', titleEn: 'Complete the Sentence with Noura', lessons: NOURA_FILL_BLANK_LESSONS },
  { id: 'fill_blank_mohammed', store: 'tutor', personaId: 'business', voice: 'Charon', titleAr: 'أكمل الجملة مع محمد', titleEn: 'Complete the Sentence with Mohammed', lessons: MOHAMMED_FILL_BLANK_LESSONS },
  { id: 'fill_blank_ali', store: 'tutor', personaId: 'exams', voice: 'Orus', titleAr: 'أكمل الجملة مع علي', titleEn: 'Complete the Sentence with Ali', lessons: ALI_FILL_BLANK_LESSONS },
];
export const ALL_FILL_BLANK_TRACKS: FillBlankTrack[] = [SARA_FILL_BLANK, ...TUTOR_FILL_BLANK_TRACKS];
