import { Lesson } from "../../types";

export const environmentalPrintA1: Lesson = {
  id: 'r_a1_3',
  title: 'Environmental Print & Signs',
  titleAr: 'النصوص البيئية واللوحات',
  slides: [
    { id: 's1', type: 'intro', content: 'Reading signs in the street and names of objects at home is a great way to start reading.', contentAr: 'قراءة اللوحات في الشارع وأسماء الأشياء في المنزل هي طريقة رائعة لبدء القراءة.' },
    { id: 's2', type: 'vocabulary', content: 'Exit, Entrance, Open, Closed, Push, Pull.', contentAr: 'خروج، دخول، مفتوح، مغلق، ادفع، اسحب.' },
    { id: 's3', type: 'exercise', question: 'What does a "CLOSED" sign mean?', questionAr: 'ماذا تعني لوحة مغلق؟', options: ['The shop is open', 'The shop is not open', 'The shop is new', 'The shop is big'], correctIndex: 1 }
  ]
};
