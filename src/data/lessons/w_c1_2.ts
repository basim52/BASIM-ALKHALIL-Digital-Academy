import { Lesson } from "../../types";

export const nuanceStyleC1: Lesson = {
  id: 'w_c1_2',
  title: 'Nuance & Style',
  titleAr: 'الدقة والأسلوب',
  slides: [
    { id: 's1', type: 'intro', content: 'Style involves choosing the right tone and register for your specific audience.', contentAr: 'يتضمن الأسلوب اختيار النبرة والمستوى اللغوي المناسب لجمهورك المحدد.' },
    { id: 's2', type: 'vocabulary', content: 'Register, Tone, Nuance, Euphemism, Diction.', contentAr: 'مستوى اللغة، النبرة، الفروق الدقيقة، التلطيف، انتقاء الألفاظ.' },
    { id: 's3', type: 'exercise', question: 'What is "Diction" in writing?', questionAr: 'ماذا يعني مصطلح "Diction" في الكتابة؟', options: ['A dictionary', 'Choice of words', 'Speaking speed', 'Font style'], correctIndex: 1 }
  ]
};
