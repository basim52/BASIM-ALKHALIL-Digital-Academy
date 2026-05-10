import { Lesson } from "../../types";

export const describingDayA2: Lesson = {
  id: 'w_a2_2',
  title: 'Describing My Day',
  titleAr: 'وصف يومي',
  slides: [
    { id: 's1', type: 'intro', content: 'Writing about your daily routine help you practice time management vocabulary and basic verbs.', contentAr: 'تساعدك الكتابة عن روتينك اليومي في ممارسة مفردات إدارة الوقت والأفعال الأساسية.' },
    { id: 's2', type: 'vocabulary', content: 'Morning, Afternoon, Evening, At 8 o’clock, Usually, Every day.', contentAr: 'الصباح، بعد الظهر، المساء، في الساعة الثامنة، عادةً، كل يوم.' },
    { id: 's3', type: 'exercise', question: 'Fill in: "I ___ breakfast at 7 AM."', questionAr: 'أكمل: "أنا ___ الإفطار في الساعة السابعة صباحاً."', options: ['go', 'have', 'sleep', 'run'], correctIndex: 1 }
  ]
};
