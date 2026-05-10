import { Lesson } from "../../types";

export const paragraphStructureB1: Lesson = {
  id: 'w_b1_1',
  title: 'Paragraph Structure',
  titleAr: 'هيكل الفقرة',
  slides: [
    { id: 's1', type: 'intro', content: 'A paragraph should focus on one main idea. It starts with a topic sentence.', contentAr: 'يجب أن تركز الفقرة على فكرة رئيسية واحدة. تبدأ بجملة مفتاحية (Topic Sentence).' },
    { id: 's2', type: 'vocabulary', content: 'Topic sentence, Supporting details, Concluding sentence, Unity.', contentAr: 'جملة مفتاحية، تفاصيل داعمة، جملة ختامية، الوحدة الموضوعية.' },
    { id: 's3', type: 'exercise', question: 'What is the first sentence of a paragraph usually called?', questionAr: 'ماذا تسمى الجملة الأولى من الفقرة عادةً؟', options: ['Ending sentence', 'Topic sentence', 'Small talk', 'Appendix'], correctIndex: 1 }
  ]
};
