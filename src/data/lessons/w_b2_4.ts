import { Lesson } from "../../types";

export const creativeNarrativeB2: Lesson = {
  id: 'w_b2_4',
  title: 'Creative Narrative',
  titleAr: 'السرد الإبداعي',
  slides: [
    { id: 's1', type: 'intro', content: 'In creative writing, we focus on descriptive language, character depth, and thematic arcs.', contentAr: 'نركز في الكتابة الإبداعية على اللغة الوصفية وعمق الشخصية والمسارات الموضوعية.' },
    { id: 's2', type: 'vocabulary', content: 'Protagonist, Antagonist, Setting, Climax, Resolution, Theme.', contentAr: 'البطل، الخصم، الإطار الزمني والمكاني، ذروة الأحداث، الحل، الموضوع.' },
    { id: 's3', type: 'exercise', question: 'What is the "Climax" of a story?', questionAr: 'ما هي "ذروة الأحداث" (Climax) في القصة؟', options: ['The end', 'The most intense part', 'The introduction', 'The character list'], correctIndex: 1 }
  ]
};
