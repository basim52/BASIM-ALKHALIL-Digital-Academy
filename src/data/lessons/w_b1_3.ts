import { Lesson } from "../../types";

export const persuasiveB1: Lesson = {
  id: 'w_b1_3',
  title: 'Persuasive Essentials',
  titleAr: 'أساسيات الإقناع',
  slides: [
    { id: 's1', type: 'intro', content: 'To persuade someone, you need to provide reasons and evidence for your opinion.', contentAr: 'لإقناع شخص ما، يجب عليك تقديم أسباب وأدلة تدعم رأيك.' },
    { id: 's2', type: 'vocabulary', content: 'Opinion, Evidence, Persuasion, Convinced, Argument.', contentAr: 'رأي، دليل، إقناع، مقتنع، حجة.' },
    { id: 's3', type: 'exercise', question: 'Which word means to "make someone believe"?', questionAr: 'أي كلمة تعني "جعل شخص ما يصدق"؟', options: ['Inform', 'Persuade', 'Ignore', 'Forget'], correctIndex: 1 }
  ]
};
