import type { SaraTrack } from '../saraTracks/foundations';
import { NOURA_L1, type TutorLesson } from './nouraL1';
import { NOURA_L2 } from './nouraL2';
import { NOURA_L3 } from './nouraL3';
import { MOHAMMED_L1 } from './mohammedL1';
import { MOHAMMED_L2 } from './mohammedL2';
import { ALI_L1 } from './aliL1';
import { ALI_L2 } from './aliL2';
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
export type TutorTrack = SaraTrack & { lessons: TutorLesson[]; personaId: 'grammar' | 'business' | 'exams' };
export const NOURA_TRACK: TutorTrack = {
  id: 'tutor-noura', personaId: 'grammar',
  titleAr: 'أخطاء العرب الشائعة مع نورة', titleEn: 'Common Mistakes of Arabic Speakers',
  levels: [
    { id: 'l1', titleAr: 'المستوى الأول: أخطاء أساسية', titleEn: 'Level 1: Basic mistakes' },
    { id: 'l2', titleAr: 'المستوى الثاني: أخطاء الأفعال والأزمنة', titleEn: 'Level 2: Verb and tense mistakes' },
    { id: 'l3', titleAr: 'المستوى الثالث: اختيار الكلمة الصحيحة', titleEn: 'Level 3: Choosing the right word' },
  ],
  lessons: [...spread(NOURA_L1), ...NOURA_L2, ...NOURA_L3],
};
export const MOHAMMED_TRACK: TutorTrack = {
  id: 'tutor-mohammed', personaId: 'business',
  titleAr: 'إنجليزية الأعمال مع محمد', titleEn: 'Business English',
  levels: [
    { id: 'l1', titleAr: 'المستوى الأول: التواصل المهني اليومي', titleEn: 'Level 1: Everyday professional communication' },
    { id: 'l2', titleAr: 'المستوى الثاني: الاجتماعات والعمل الجماعي', titleEn: 'Level 2: Meetings and teamwork' },
  ],
  lessons: [...MOHAMMED_L1, ...MOHAMMED_L2],
};
export const ALI_TRACK: TutorTrack = {
  id: 'tutor-ali', personaId: 'exams',
  titleAr: 'استراتيجيات IELTS مع علي', titleEn: 'IELTS Strategies',
  levels: [
    { id: 'l1', titleAr: 'المستوى الأول: فهم الاختبار وأساسيات المهارات', titleEn: 'Level 1: The test and first strategies' },
    { id: 'l2', titleAr: 'المستوى الثاني: الكتابة Task 1 و Task 2', titleEn: 'Level 2: Writing Task 1 and Task 2' },
  ],
  lessons: [...ALI_L1, ...ALI_L2],
};
export const TUTOR_TRACKS: TutorTrack[] = [NOURA_TRACK, MOHAMMED_TRACK, ALI_TRACK];
export type { TutorLesson };
