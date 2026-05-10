import { Lesson } from "../../types";

export const thesisDesignC1: Lesson = {
  id: 'w_c1_1',
  title: 'Academic Thesis Design',
  titleAr: 'بناء الأطروحة الأكاديمية',
  slides: [
    { id: 's1', type: 'intro', content: 'An academic thesis must be specific, arguable, and defensible throughout the paper.', contentAr: 'يجب أن تكون الأطروحة الأكاديمية محددة وقابلة للنقاش وقابلة للدفاع عنها طوال البحث.' },
    { id: 's2', type: 'vocabulary', content: 'Hypothesis, Methodology, Argumentation, Defensible, Claim.', contentAr: 'فرضية، منهجية، محاججة، قابل للدفاع عنه، ادعاء.' },
    { id: 's3', type: 'exercise', question: 'Which word describes a statement that can be argued?', questionAr: 'أي كلمة تصف عبارة يمكن الجدال حولها؟', options: ['Fact', 'Arguable', 'Obvious', 'Universal'], correctIndex: 1 }
  ]
};
