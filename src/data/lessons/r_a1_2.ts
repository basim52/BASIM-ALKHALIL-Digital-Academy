import { Lesson } from "../../types";

export const sightWordsA1: Lesson = {
  id: 'r_a1_2',
  title: 'Academic Sight Words (Set 1)',
  titleAr: 'الكلمات البصرية الأكاديمية (1)',
  slides: [
    { id: 's1', type: 'intro', content: 'Sight words are common words that you should recognize immediately without sounding them out.', contentAr: 'الكلمات البصرية هي كلمات شائعة يجب عليك التعرف عليها فوراً دون تهجئتها.' },
    { id: 's2', type: 'vocabulary', content: 'The, And, For, Are, With, They, That.', contentAr: 'أل، و، لـ، يكون، مع، هم، ذلك.' },
    { id: 's3', type: 'exercise', question: 'Which of these is a common sight word?', questionAr: 'أي من هذه كلمة بصرية شائعة؟', options: ['Elephant', 'The', 'Philosophy', 'Architecture'], correctIndex: 1 }
  ]
};
