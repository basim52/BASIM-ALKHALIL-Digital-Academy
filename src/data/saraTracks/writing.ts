import type { SaraTrack } from './foundations';
import { curriculumToTrack, shiftOrders, FOUNDATION_LEVEL } from './fromCurriculum';
import { SARA_CONVERSATIONAL_WRITING_LESSONS } from '../saraCurriculum/writingLessons';
import { WRITE_B1 } from './writeB1';
import { WRITE_B2 } from './writeB2';
import { WRITE_C1 } from './writeC1';
import { WRITE_C2 } from './writeC2';

/** Writing track: same 4 levels as Advanced Grammar, 30 lessons each (120). */
export const WRITING_TRACK: SaraTrack = {
  id: 'writing_v2',
  titleAr: 'الكتابة',
  titleEn: 'Writing',
  levels: [
    FOUNDATION_LEVEL,
    { id: 'b1', titleAr: 'المتوسط (B1)', titleEn: 'Intermediate (B1)' },
    { id: 'b2', titleAr: 'فوق المتوسط (B2)', titleEn: 'Upper-Intermediate (B2)' },
    { id: 'c1', titleAr: 'المتقدم (C1)', titleEn: 'Advanced (C1)' },
    { id: 'c2', titleAr: 'الاحترافي (C2)', titleEn: 'Proficiency (C2)' }
  ],
  lessons: [...curriculumToTrack(SARA_CONVERSATIONAL_WRITING_LESSONS), ...shiftOrders([...WRITE_B1, ...WRITE_B2, ...WRITE_C1, ...WRITE_C2])]
};
