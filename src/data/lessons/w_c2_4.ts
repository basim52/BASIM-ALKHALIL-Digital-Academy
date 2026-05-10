import { Lesson } from "../../types";

export const philosophicalDiscourseC2: Lesson = {
  id: 'w_c2_4',
  title: 'Philosophical Discourse',
  titleAr: 'الخطاب الفلسفي',
  slides: [
    { id: 's1', type: 'intro', content: 'Constructing high-level dialectical arguments involves engaging with complex ethical and social issues.', contentAr: 'يتضمن بناء الحجج الجدلية عالية المستوى التعامل مع القضايا الأخلاقية والاجتماعية المعقدة.' },
    { id: 's2', type: 'vocabulary', content: 'Dialectic, Axiom, Epistemology, Paradigm shift, Societal.', contentAr: 'جدلية، بديهية، نظرية المعرفة، تحول في النموذج الفكري، مجتمعي.' },
    { id: 's3', type: 'exercise', question: 'What is a "Paradigm Shift"?', questionAr: 'ما هو "التحول في النموذج الفكري" (Paradigm Shift)؟', options: ['A small mistake', 'A fundamental change in approach', 'A new book', 'A car parts'], correctIndex: 1 }
  ]
};
