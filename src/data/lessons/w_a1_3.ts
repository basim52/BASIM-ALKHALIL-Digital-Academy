import { Lesson } from "../../types";

export const punctuationA1: Lesson = {
  id: 'w_a1_3',
  title: 'Basic Punctuation',
  titleAr: 'علامات الترقيم الأساسية',
  slides: [
    { id: 's1', type: 'intro', content: 'Punctuation marks show us where sentences end and where to pause.', contentAr: 'توضح لنا علامات الترقيم أين تنتهي الجمل وأين يجب التوقف.' },
    { id: 's2', type: 'vocabulary', content: 'Full Stop / Period (.), Comma (,), Question Mark (?).', contentAr: 'النقطة، الفاصلة، علامة الاستفهام.' },
    { id: 's3', type: 'exercise', question: 'Which mark is used at the end of a question?', questionAr: 'أي علامة تُستخدم في نهاية السؤال؟', options: ['.', ',', '?', '!'], correctIndex: 2 }
  ]
};
