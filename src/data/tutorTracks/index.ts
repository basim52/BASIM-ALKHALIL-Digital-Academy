import type { SaraTrack } from '../saraTracks/foundations';
import type { PersonaId } from '../saraBoardPersonas';
import { NOURA_L1, type TutorLesson } from './nouraL1';
import { NOURA_L2 } from './nouraL2';
import { NOURA_L3 } from './nouraL3';
import { NOURA_L4 } from './nouraL4';
import { MOHAMMED_L1 } from './mohammedL1';
import { MOHAMMED_L2 } from './mohammedL2';
import { MOHAMMED_L3 } from './mohammedL3';
import { MOHAMMED_L4 } from './mohammedL4';
import { ALI_L1 } from './aliL1';
import { ALI_L2 } from './aliL2';
import { ALI_L3 } from './aliL3';
import { ALI_L4 } from './aliL4';
import { LAMA_LESSONS } from './lama';
import { REEM_LESSONS } from './reem';
import { HAYA_LESSONS } from './haya';
import { JANA_LESSONS } from './jana';
/** Specialty tutor tracks. Kept OUT of SARA_TRACKS so Sara's plan/basket/unlocking/level tests are unaffected. Level map: docs/tutor-curricula-levels.md */
/** Level 1 was written with most answers in position B: move each correct answer to a stable pseudo-random position (swap only, same options). */
const spread = (lessons: TutorLesson[]): TutorLesson[] => lessons.map(l => {
  if (!l.content) return l;
  const fix = (q: typeof l.content.check, salt: string) => {
    let h = 7; for (const ch of l.id + salt) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    const t = h % q.options.length; if (t === q.correctIndex) return q;
    const o = [...q.options]; [o[t], o[q.correctIndex]] = [o[q.correctIndex], o[t]];
    return { ...q, options: o, correctIndex: t };
  };
  return { ...l, content: { ...l.content, check: fix(l.content.check, 'c'), exercises: l.content.exercises.map((e, i) => fix(e, `e${i}`)) } };
});
export type TutorTrack = SaraTrack & { lessons: TutorLesson[]; personaId: Exclude<PersonaId, 'sara'> };
export const NOURA_TRACK: TutorTrack = {
  id: 'tutor-noura', personaId: 'grammar',
  titleAr: 'أخطاء العرب الشائعة مع نورة', titleEn: 'Common Mistakes of Arabic Speakers',
  levels: [
    { id: 'l1', titleAr: 'المستوى الأول: أخطاء أساسية', titleEn: 'Level 1: Basic mistakes' },
    { id: 'l2', titleAr: 'المستوى الثاني: أخطاء الأفعال والأزمنة', titleEn: 'Level 2: Verb and tense mistakes' },
    { id: 'l3', titleAr: 'المستوى الثالث: اختيار الكلمة الصحيحة', titleEn: 'Level 3: Choosing the right word' },
    { id: 'l4', titleAr: 'المستوى الرابع: أخطاء الجملة والكتابة', titleEn: 'Level 4: Sentence and writing mistakes' },
  ],
  lessons: [...spread(NOURA_L1), ...NOURA_L2, ...NOURA_L3, ...NOURA_L4],
};
export const MOHAMMED_TRACK: TutorTrack = {
  id: 'tutor-mohammed', personaId: 'business',
  titleAr: 'إنجليزية الأعمال مع محمد', titleEn: 'Business English',
  levels: [
    { id: 'l1', titleAr: 'المستوى الأول: التواصل المهني اليومي', titleEn: 'Level 1: Everyday professional communication' },
    { id: 'l2', titleAr: 'المستوى الثاني: الاجتماعات والعمل الجماعي', titleEn: 'Level 2: Meetings and teamwork' },
    { id: 'l3', titleAr: 'المستوى الثالث: مقابلات العمل والسيرة الذاتية', titleEn: 'Level 3: Job interviews and the CV' },
    { id: 'l4', titleAr: 'المستوى الرابع: العروض التقديمية والتفاوض', titleEn: 'Level 4: Presentations and negotiation' },
  ],
  lessons: [...MOHAMMED_L1, ...MOHAMMED_L2, ...MOHAMMED_L3, ...MOHAMMED_L4],
};
export const ALI_TRACK: TutorTrack = {
  id: 'tutor-ali', personaId: 'exams',
  titleAr: 'استراتيجيات IELTS مع علي', titleEn: 'IELTS Strategies',
  levels: [
    { id: 'l1', titleAr: 'المستوى الأول: فهم الاختبار وأساسيات المهارات', titleEn: 'Level 1: The test and first strategies' },
    { id: 'l2', titleAr: 'المستوى الثاني: الكتابة Task 1 و Task 2', titleEn: 'Level 2: Writing Task 1 and Task 2' },
    { id: 'l3', titleAr: 'المستوى الثالث: المحادثة Part 2 و Part 3', titleEn: 'Level 3: Speaking Part 2 and Part 3' },
    { id: 'l4', titleAr: 'المستوى الرابع: القراءة والاستماع المتقدم', titleEn: 'Level 4: Advanced Reading and Listening' },
  ],
  lessons: [...ALI_L1, ...ALI_L2, ...ALI_L3, ...ALI_L4],
};
/** «من الصفر» teachers (kids and adult beginners, A0–A1). */
export const LAMA_TRACK: TutorTrack = {
  id: 'tutor-lama', personaId: 'lama',
  titleAr: 'الحروف والأصوات مع لمى', titleEn: 'Letters and Sounds with Lama',
  levels: [
    { id: 'l1', titleAr: 'المستوى الأول: الحروف وأصواتها', titleEn: 'Level 1: Letters and Their Sounds' },
    { id: 'l2', titleAr: 'المستوى الثاني: الحروف المتحركة القصيرة والطويلة', titleEn: 'Level 2: Short and Long Vowels' },
    { id: 'l3', titleAr: 'المستوى الثالث: أصوات مركبة وقراءة', titleEn: 'Level 3: Sound Blends and Reading' },
  ],
  lessons: LAMA_LESSONS,
};
export const REEM_TRACK: TutorTrack = {
  id: 'tutor-reem', personaId: 'reem',
  titleAr: 'كلمات كل يوم مع ريم', titleEn: 'Everyday Words with Reem',
  levels: [
    { id: 'l1', titleAr: 'المستوى الأول: أنا وبيتي', titleEn: 'Level 1: Me and My Home' },
    { id: 'l2', titleAr: 'المستوى الثاني: الأكل والحيوانات والوقت', titleEn: 'Level 2: Food, Animals and Time' },
    { id: 'l3', titleAr: 'المستوى الثالث: كلمات كل يوم برا البيت', titleEn: 'Level 3: Everyday Words Outside' },
  ],
  lessons: REEM_LESSONS,
};
export const HAYA_TRACK: TutorTrack = {
  id: 'tutor-haya', personaId: 'haya',
  titleAr: 'جمل أساسية مع هيا', titleEn: 'Basic Sentences with Haya',
  levels: [
    { id: 'l1', titleAr: 'المستوى الأول: أنا وأشيائي', titleEn: 'Level 1: Me and My Things' },
    { id: 'l2', titleAr: 'المستوى الثاني: أقدر وأبي وفيه', titleEn: 'Level 2: I Can, I Want, There Is' },
    { id: 'l3', titleAr: 'المستوى الثالث: جمل الحياة اليومية', titleEn: 'Level 3: Sentences for Daily Life' },
  ],
  lessons: HAYA_LESSONS,
};
export const JANA_TRACK: TutorTrack = {
  id: 'tutor-jana', personaId: 'jana',
  titleAr: 'تمارين ومراجعة مع جنى', titleEn: 'Practice and Review with Jana',
  levels: [
    { id: 'l1', titleAr: 'المستوى الأول: تمارين البداية', titleEn: 'Level 1: First Practice' },
    { id: 'l2', titleAr: 'المستوى الثاني: تمارين الجمل', titleEn: 'Level 2: Sentence Practice' },
    { id: 'l3', titleAr: 'المستوى الثالث: تمارين ومراجعة شاملة', titleEn: 'Level 3: Practice and Full Review' },
  ],
  lessons: JANA_LESSONS,
};
export const TUTOR_TRACKS: TutorTrack[] = [NOURA_TRACK, MOHAMMED_TRACK, ALI_TRACK, LAMA_TRACK, REEM_TRACK, HAYA_TRACK, JANA_TRACK];
export type { TutorLesson };
