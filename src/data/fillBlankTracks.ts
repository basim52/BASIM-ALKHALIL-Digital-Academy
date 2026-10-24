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
  // «من الصفر» teachers: a picture on every card, 4 levels × 30 lessons with their own level names.
  { id: 'fill_blank_lama', store: 'tutor', personaId: 'lama', voice: 'Achernar', titleAr: 'أكمل الكلمة مع لمى', titleEn: 'Complete the Word with Lama', lessons: LAMA_FILL_BLANK_LESSONS, perLevel: 30, levels: [{ ar: 'المستوى الأول: الحروف وأصواتها', en: 'Level 1: Letters and Their Sounds' }, { ar: 'المستوى الثاني: قراءة الكلمات القصيرة', en: 'Level 2: Reading Short Words' }, { ar: 'المستوى الثالث: كلمات البصر في جمل', en: 'Level 3: Sight Words in Sentences' }, { ar: 'المستوى الرابع: قصص قصيرة للقراءة', en: 'Level 4: Short Stories to Read' }] },
  { id: 'fill_blank_reem', store: 'tutor', personaId: 'reem', voice: 'Laomedeia', titleAr: 'أكمل الجملة مع ريم', titleEn: 'Complete the Sentence with Reem', lessons: REEM_FILL_BLANK_LESSONS, perLevel: 30, levels: [{ ar: 'المستوى الأول: كلماتي الأولى', en: 'Level 1: My First Words' }, { ar: 'المستوى الثاني: بيتي ومدينتي وأكلي', en: 'Level 2: My Home, My City and My Food' }, { ar: 'المستوى الثالث: أفعال وصفات ومواقف', en: 'Level 3: Actions, Describing Words and Places' }, { ar: 'المستوى الرابع: كلمات الحياة والعمل', en: 'Level 4: Words for Life and Work' }] },
  { id: 'fill_blank_haya', store: 'tutor', personaId: 'haya', voice: 'Vindemiatrix', titleAr: 'أكمل الجملة مع هيا', titleEn: 'Complete the Sentence with Haya', lessons: HAYA_FILL_BLANK_LESSONS, perLevel: 30, levels: [{ ar: 'المستوى الأول: جملي الأولى', en: 'Level 1: My First Sentences' }, { ar: 'المستوى الثاني: المضارع البسيط والأسئلة', en: 'Level 2: Present Simple and Questions' }, { ar: 'المستوى الثالث: الماضي والمستقبل', en: 'Level 3: Past and Future' }, { ar: 'المستوى الرابع: جمل للحياة اليومية', en: 'Level 4: Sentences for Everyday Life' }] },
  { id: 'fill_blank_jana', store: 'tutor', personaId: 'jana', voice: 'Autonoe', titleAr: 'أكمل الجملة مع جنى', titleEn: 'Complete the Sentence with Jana', lessons: JANA_FILL_BLANK_LESSONS, perLevel: 30, levels: [{ ar: 'المستوى الأول: تمارين البداية', en: 'Level 1: First Practice' }, { ar: 'المستوى الثاني: تمارين الحاضر والقواعد', en: 'Level 2: Present and Grammar Practice' }, { ar: 'المستوى الثالث: تمارين الماضي والمستقبل', en: 'Level 3: Past and Future Practice' }, { ar: 'المستوى الرابع: تمارين شاملة نحو A2', en: 'Level 4: Mixed Practice towards A2' }] },
];
export const ALL_FILL_BLANK_TRACKS: FillBlankTrack[] = [SARA_FILL_BLANK, ...TUTOR_FILL_BLANK_TRACKS];
