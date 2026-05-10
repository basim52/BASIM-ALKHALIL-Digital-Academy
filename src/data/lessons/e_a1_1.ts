import { Lesson } from "../../types";

export const emotionsE1: Lesson = {
  id: 'e_a1_1',
  title: 'Basic Emotions',
  titleAr: 'المشاعر الأساسية',
  slides: [
    { id: 's1', type: 'intro', content: 'Learning to express your basic feelings is a core part of communication.', contentAr: 'تعلم التعبير عن مشاعرك الأساسية هو جزء أساسي من التواصل.' },
    { id: 's2', type: 'vocabulary', content: 'Happy, Sad, Angry, Surprised, Tired.', contentAr: 'سعيد، حزين، غاضب، متفاجئ، متعب.' },
    { id: 's3', type: 'exercise', question: 'How do you feel when you get a gift?', questionAr: 'كيف تشعر عندما تحصل على هدية؟', options: ['Angry', 'Sad', 'Happy', 'Tired'], correctIndex: 2 }
  ]
};
