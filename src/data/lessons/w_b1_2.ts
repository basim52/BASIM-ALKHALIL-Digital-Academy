import { Lesson } from "../../types";

export const storytellingB1: Lesson = {
  id: 'w_b1_2',
  title: 'Storytelling Basics',
  titleAr: 'أساسيات رواية القصص',
  slides: [
    { id: 's1', type: 'intro', content: 'Writing a story requires a clear sequence of events and a perspective.', contentAr: 'تتطلب كتابة القصة تسلسلاً واضحاً للأحداث ومنظوراً سردياً.' },
    { id: 's2', type: 'vocabulary', content: 'Beginning, Middle, End, Plot, Character, Conflict.', contentAr: 'البداية، الوسط، النهاية، الحبكة، الشخصية، الصراع.' },
    { id: 's3', type: 'exercise', question: 'What is the "Plot" of a story?', questionAr: 'ما هي "الحبكة" في القصة؟', options: ['The main character', 'The sequence of events', 'The background colors', 'The font used'], correctIndex: 1 }
  ]
};
