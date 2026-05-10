import { Lesson } from "../../types";

export const listsNotesA1: Lesson = {
  id: 'w_a1_5',
  title: 'Simple Lists & Notes',
  titleAr: 'القوائم والملاحظات',
  slides: [
    { id: 's1', type: 'intro', content: 'Writing short lists helps organize your day.', contentAr: 'تساعدك كتابة القوائم القصيرة في تنظيم يومك.' },
    { id: 's2', type: 'vocabulary', content: 'Shopping list, Reminder, Bullet points, Checklist.', contentAr: 'قائمة تسوق، تذكير، نقاط، قائمة تحقق.' },
    { id: 's3', type: 'exercise', question: 'Which item typically goes on a shopping list?', questionAr: 'أي من هذه العناصر يوضع عادةً في قائمة التسوق؟', options: ['Milk', 'Sky', 'Mountain', 'Cloud'], correctIndex: 0 }
  ]
};
