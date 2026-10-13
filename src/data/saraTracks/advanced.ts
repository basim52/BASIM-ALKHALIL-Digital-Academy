import type { SaraTrack } from './foundations';
import { ADVANCED_B1 } from './advancedB1';
import { ADVANCED_B2 } from './advancedB2';
import { ADVANCED_C1 } from './advancedC1';
import { ADVANCED_C2 } from './advancedC2';

/** Advanced grammar track: 4 levels × 30 lessons. all 120 lessons built. */
export const ADVANCED_TRACK: SaraTrack = {
  id: 'advanced',
  titleAr: 'القواعد المتقدمة',
  titleEn: 'Advanced Grammar',
  levels: [
    { id: 'b1', titleAr: 'المستوى المتوسط (B1)', titleEn: 'Intermediate (B1)' },
    { id: 'b2', titleAr: 'فوق المتوسط (B2)', titleEn: 'Upper-Intermediate (B2)' },
    { id: 'c1', titleAr: 'المتقدم (C1)', titleEn: 'Advanced (C1)' },
    { id: 'c2', titleAr: 'الاحترافي (C2)', titleEn: 'Proficiency (C2)' }
  ],
  lessons: [
    ...ADVANCED_B1,
    ...ADVANCED_B2,
    ...ADVANCED_C1,
    ...ADVANCED_C2
  ]
};
