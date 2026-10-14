import type { SaraTrack } from './foundations';
import { curriculumToTrack, shiftOrders, FOUNDATION_LEVEL } from './fromCurriculum';
import { SARA_ACTIVE_CONVERSATION_LESSONS } from '../saraCurriculum/conversationLessons';
import { CONV_B1 } from './convB1';
import { CONV_B2 } from './convB2';
import { CONV_C1 } from './convC1';
import { CONV_C2 } from './convC2';

/** Conversation track: same 4 levels as Advanced Grammar, 30 real-life situations each (120). */
export const CONVERSATION_TRACK: SaraTrack = {
  id: 'conversation_v2',
  titleAr: 'المحادثة',
  titleEn: 'Conversation',
  levels: [
    FOUNDATION_LEVEL,
    { id: 'b1', titleAr: 'المتوسط (B1)', titleEn: 'Intermediate (B1)' },
    { id: 'b2', titleAr: 'فوق المتوسط (B2)', titleEn: 'Upper-Intermediate (B2)' },
    { id: 'c1', titleAr: 'المتقدم (C1)', titleEn: 'Advanced (C1)' },
    { id: 'c2', titleAr: 'الاحترافي (C2)', titleEn: 'Proficiency (C2)' }
  ],
  lessons: [...curriculumToTrack(SARA_ACTIVE_CONVERSATION_LESSONS), ...shiftOrders([...CONV_B1, ...CONV_B2, ...CONV_C1, ...CONV_C2])]
};
