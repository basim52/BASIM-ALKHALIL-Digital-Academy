import type { SaraTrack } from './foundations';
import { READ_B1 } from './readB1';
import { READ_B2 } from './readB2';
import { READ_C1 } from './readC1';
import { READ_C2 } from './readC2';

/** Reading & Pronunciation track: same 4 levels as Advanced Grammar, 30 lessons each (120). */
export const READING_TRACK: SaraTrack = {
  id: 'reading',
  titleAr: 'القراءة والنطق',
  titleEn: 'Reading & Pronunciation',
  levels: [
    { id: 'b1', titleAr: 'المتوسط (B1)', titleEn: 'Intermediate (B1)' },
    { id: 'b2', titleAr: 'فوق المتوسط (B2)', titleEn: 'Upper-Intermediate (B2)' },
    { id: 'c1', titleAr: 'المتقدم (C1)', titleEn: 'Advanced (C1)' },
    { id: 'c2', titleAr: 'الاحترافي (C2)', titleEn: 'Proficiency (C2)' }
  ],
  lessons: [...READ_B1, ...READ_B2, ...READ_C1, ...READ_C2]
};
