import { FILL_BLANK_LESSONS, FILL_BLANK_TRACK_ID, type FillBlankTrack } from './saraTracks/fillBlank';
import { NOURA_FILL_BLANK_LESSONS } from './tutorTracks/fillBlankNoura';
import { MOHAMMED_FILL_BLANK_LESSONS } from './tutorTracks/fillBlankMohammed';
import { ALI_FILL_BLANK_LESSONS } from './tutorTracks/fillBlankAli';
import { LAMA_FILL_BLANK_LESSONS } from './tutorTracks/fillBlankLama';
import { REEM_FILL_BLANK_LESSONS } from './tutorTracks/fillBlankReem';
import { HAYA_FILL_BLANK_LESSONS } from './tutorTracks/fillBlankHaya';
import { JANA_FILL_BLANK_LESSONS } from './tutorTracks/fillBlankJana';

/** 🧩 Complete-the-sentence tracks: one per tutor, each in that tutor's own face + cloud voice. */
export const SARA_FILL_BLANK: FillBlankTrack = { id: FILL_BLANK_TRACK_ID, store: 'sara', personaId: 'sara', voice: 'Kore', titleAr: 'أكمل الجملة مع سارة', titleEn: 'Complete the Sentence with Sara', lessons: FILL_BLANK_LESSONS };
export const TUTOR_FILL_BLANK_TRACKS: FillBlankTrack[] = [
  { id: 'fill_blank_noura', store: 'tutor', personaId: 'grammar', voice: 'Aoede', titleAr: 'أكمل الجملة مع نورة', titleEn: 'Complete the Sentence with Noura', lessons: NOURA_FILL_BLANK_LESSONS },
  { id: 'fill_blank_mohammed', store: 'tutor', personaId: 'business', voice: 'Charon', titleAr: 'أكمل الجملة مع محمد', titleEn: 'Complete the Sentence with Mohammed', lessons: MOHAMMED_FILL_BLANK_LESSONS },
  { id: 'fill_blank_ali', store: 'tutor', personaId: 'exams', voice: 'Orus', titleAr: 'أكمل الجملة مع علي', titleEn: 'Complete the Sentence with Ali', lessons: ALI_FILL_BLANK_LESSONS },
  // «من الصفر» teachers: a picture on every card, their own level names.
  { id: 'fill_blank_lama', store: 'tutor', personaId: 'lama', voice: 'Achernar', titleAr: 'أكمل الكلمة مع لمى', titleEn: 'Complete the Word with Lama', lessons: LAMA_FILL_BLANK_LESSONS, levels: [{ ar: 'حروف وكلمات قصيرة', en: 'Letters and short words' }] },
  { id: 'fill_blank_reem', store: 'tutor', personaId: 'reem', voice: 'Laomedeia', titleAr: 'أكمل الجملة مع ريم', titleEn: 'Complete the Sentence with Reem', lessons: REEM_FILL_BLANK_LESSONS, levels: [{ ar: 'كلمات كل يوم في جمل', en: 'Everyday words in sentences' }] },
  { id: 'fill_blank_haya', store: 'tutor', personaId: 'haya', voice: 'Vindemiatrix', titleAr: 'أكمل الجملة مع هيا', titleEn: 'Complete the Sentence with Haya', lessons: HAYA_FILL_BLANK_LESSONS, levels: [{ ar: 'أنا وأشيائي', en: 'Me and My Things' }, { ar: 'أقدر وأبي وفيه', en: 'I Can, I Want, There Is' }, { ar: 'جمل الحياة اليومية', en: 'Sentences for Daily Life' }] },
  { id: 'fill_blank_jana', store: 'tutor', personaId: 'jana', voice: 'Autonoe', titleAr: 'أكمل الجملة مع جنى', titleEn: 'Complete the Sentence with Jana', lessons: JANA_FILL_BLANK_LESSONS, levels: [{ ar: 'تمارين البداية', en: 'First Practice' }, { ar: 'تمارين الجمل', en: 'Sentence Practice' }, { ar: 'تمارين ومراجعة شاملة', en: 'Practice and Full Review' }] },
];
export const ALL_FILL_BLANK_TRACKS: FillBlankTrack[] = [SARA_FILL_BLANK, ...TUTOR_FILL_BLANK_TRACKS];
