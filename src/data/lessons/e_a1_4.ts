import { Lesson } from "../../types";

export const routineE1: Lesson = {
  id: 'e_a1_4',
  title: 'My Daily Routine',
  titleAr: 'روتيني اليومي',
  slides: [
    { id: 's1', type: 'intro', content: 'Sharing your day is a part of daily expression.', contentAr: 'مشاركة يومك هو جزء من التعبير اليومي.' },
    { id: 's2', type: 'exercise', question: 'I ___ up at 7 AM.', questionAr: 'أنا ___ في الساعة السابعة صباحاً.', options: ['wake', 'sleep', 'run', 'eat'], correctIndex: 0 }
  ]
};
