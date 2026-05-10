import { Lesson } from "../../types";

export const connectivesA2: Lesson = {
  id: 'w_a2_1',
  title: 'Connective Writing',
  titleAr: 'الكتابة المترابطة',
  slides: [
    { id: 's1', type: 'intro', content: 'Connectors like "and", "but", and "or" help you write longer, smoother sentences.', contentAr: 'تساعدك الروابط مثل "and" و "but" و "or" على كتابة جمل أطول وأكثر سلاسة.' },
    { id: 's2', type: 'vocabulary', content: 'And (addition), But (contrast), Or (choice), Because (reason).', contentAr: 'و، ولكن، أو، لأن.' },
    { id: 's3', type: 'exercise', question: 'I like tea ___ I don\'t like coffee.', questionAr: 'أنا أحب الشاي ___ لا أحب القهوة.', options: ['and', 'but', 'because', 'so'], correctIndex: 1 }
  ]
};
