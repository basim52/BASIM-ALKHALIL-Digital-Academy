import { Lesson } from "../../types";

export const abstractConceptsWritingC1: Lesson = {
  id: 'w_c1_5',
  title: 'Abstract Concepts',
  titleAr: 'المفاهيم المجردة',
  slides: [
    { id: 's1', type: 'intro', content: 'Writing about abstract ideas requires logical precision and the use of relevant examples.', contentAr: 'تتطلب الكتابة عن الأفكار المجردة دقة منطقية واستخدام أمثلة ذات صلة.' },
    { id: 's2', type: 'vocabulary', content: 'Philosophy, Ethics, Justice, Governance, Dialectic.', contentAr: 'فلسفة، أخلاق، عدالة، حوكمة، جدلية.' },
    { id: 's3', type: 'exercise', question: 'Which word relates to the study of right and wrong?', questionAr: 'أي كلمة تتعلق بدراسة الصواب والخطأ؟', options: ['Physics', 'Ethics', 'Biology', 'Chemistry'], correctIndex: 1 }
  ]
};
