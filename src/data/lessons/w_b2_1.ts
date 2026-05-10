import { Lesson } from "../../types";

export const essayFoundationsB2: Lesson = {
  id: 'w_b2_1',
  title: 'Essay Foundations',
  titleAr: 'أسس المقالة',
  slides: [
    { id: 's1', type: 'intro', content: 'A good essay has a strong thesis statement and a clear structure.', contentAr: 'تتميز المقالة الجيدة ببيان أطروحة قوي وهيكل واضح.' },
    { id: 's2', type: 'vocabulary', content: 'Thesis statement, Introduction, Body paragraph, Conclusion, Evidence.', contentAr: 'بيان الأطروحة، المقدمة، فقرة العرض، الخاتمة، الدليل.' },
    { id: 's3', type: 'exercise', question: 'Where is the "Thesis Statement" usually found?', questionAr: 'أين يوجد "بيان الأطروحة" عادةً؟', options: ['In the conclusion', 'In the introduction', 'In an appendix', 'On the cover only'], correctIndex: 1 }
  ]
};
