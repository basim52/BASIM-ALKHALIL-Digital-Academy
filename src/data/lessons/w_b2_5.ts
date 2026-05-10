import { Lesson } from "../../types";

export const reviewWritingB2: Lesson = {
  id: 'w_b2_5',
  title: 'Review Writing',
  titleAr: 'كتابة المراجعات',
  slides: [
    { id: 's1', type: 'intro', content: 'Writing a review involves evaluating a product or work of art and providing a recommendation.', contentAr: 'تتضمن كتابة المراجعة تقييم منتج أو عمل فني وتقديم توصية.' },
    { id: 's2', type: 'vocabulary', content: 'Critique, Evaluation, Pros and Cons, Recommendation, Summary.', contentAr: 'نقد، تقييم، الإيجابيات والسلبيات، توصية، ملخص.' },
    { id: 's3', type: 'exercise', question: 'What does "Pros and Cons" refer to?', questionAr: 'إلى ماذا يشير مصطلح "الإيجابيات والسلبيات" (Pros and Cons)؟', options: ['Prices and locations', 'Advantages and disadvantages', 'Friends and family', 'Input and output'], correctIndex: 1 }
  ]
};
