import { Lesson } from "../../types";

export const sentencesA1: Lesson = {
  id: 'w_a1_2',
  title: 'My First Sentences',
  titleAr: 'جميلي الأولى',
  slides: [
    { id: 's1', type: 'intro', content: 'A basic sentence in English usually follows the Subject + Verb + Object pattern.', contentAr: 'تتبع الجملة الأساسية في الإنجليزية عادةً نمط: الفاعل + الفعل + المفعول به.' },
    { id: 's2', type: 'vocabulary', content: 'Subject (I, You, She), Verb (drink, eat, run), Object (water, food).', contentAr: 'الفاعل، الفعل، المفعول به.' },
    { id: 's3', type: 'exercise', question: 'Complete the sentence: "I ___ coffee."', questionAr: 'أكمل الجملة: "أنا ___ القهوة."', options: ['drink', 'is', 'blue', 'apple'], correctIndex: 0 }
  ]
};
