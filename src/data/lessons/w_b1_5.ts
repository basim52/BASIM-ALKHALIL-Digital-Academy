import { Lesson } from "../../types";

export const comparativeWritingB1: Lesson = {
  id: 'w_b1_5',
  title: 'Comparing & Contrasting',
  titleAr: 'المقارنة والتباين',
  slides: [
    { id: 's1', type: 'intro', content: 'Writing about similarities and differences helps organize analytical thoughts.', contentAr: 'تساعد الكتابة عن أوجه التشابه والاختلاف في تنظيم الأفكار التحليلية.' },
    { id: 's2', type: 'vocabulary', content: 'In contrast, Similarly, Likewise, Whereas, On the other hand.', contentAr: 'على النقيض، وبالمثل، كذلك، في حين، من ناحية أخرى.' },
    { id: 's3', type: 'exercise', question: 'Which word shows a contrast?', questionAr: 'أي كلمة تظهر التباين؟', options: ['Similarly', 'On the other hand', 'Likewise', 'Also'], correctIndex: 1 }
  ]
};
