import { Lesson } from "../../types";

export const alphabetA1: Lesson = {
  id: 'w_a1_1',
  title: 'Alphabet & Letter Formation',
  titleAr: 'تكوين الحروف',
  slides: [
    {
      id: 's1',
      type: 'intro',
      content: 'Mastering the English alphabet is the first step to writing. We will focus on uppercase and lowercase letter formation.',
      contentAr: 'إتقان الأبجدية الإنجليزية هو الخطوة الأولى للكتابة. سنركز على تكوين الحروف الكبيرة والصغيرة.',
    },
    {
      id: 's2',
      type: 'vocabulary',
      content: 'Lowercase (a, b, c), Uppercase (A, B, C), Vowels (A, E, I, O, U), Consonants.',
      contentAr: 'الحروف الصغيرة، الحروف الكبيرة، حروف العلة، الحروف الساكنة.',
    },
    {
      id: 's3',
      type: 'exercise',
      question: 'Which of these is a VOWEL?',
      questionAr: 'أي من هذه حرف علة؟',
      options: ['B', 'E', 'D', 'F'],
      correctIndex: 1,
    }
  ]
};
