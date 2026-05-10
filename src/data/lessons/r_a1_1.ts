import { Lesson } from "../../types";

export const phonemicA1: Lesson = {
  id: 'r_a1_1',
  title: 'Phonemic Awareness Foundations',
  titleAr: 'أسس الوعي الصوتي',
  slides: [
    { id: 's1', type: 'intro', content: 'English has 44 sounds (phonemes). Learning them helps you read any word.', contentAr: 'اللغة الإنجليزية بها 44 صوتاً. تعلمها يساعدك على قراءة أي كلمة.' },
    { id: 's2', type: 'vocabulary', content: 'Phoneme, Sound, Symbol, Decoding.', contentAr: 'وحدة صوتية، صوت، رمز، فك الرموز.' },
    { id: 's3', type: 'exercise', question: 'How many phonemes are there in English?', questionAr: 'كم عدد الوحدات الصوتية في الإنجليزية؟', options: ['26', '44', '50', '32'], correctIndex: 1 }
  ]
};
