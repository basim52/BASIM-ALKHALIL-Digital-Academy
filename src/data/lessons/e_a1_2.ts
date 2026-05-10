import { Lesson } from "../../types";

export const familyFriendsE1: Lesson = {
  id: 'e_a1_2',
  title: 'Family & Friends',
  titleAr: 'العائلة والأصدقاء',
  slides: [
    { id: 's1', type: 'intro', content: 'Talking about people close to you helps build connections.', contentAr: 'الحديث عن الأشخاص المقربين منك يساعد في بناء الروابط.' },
    { id: 's2', type: 'vocabulary', content: 'Mother, Father, Friend, Brother, Sister.', contentAr: 'أم، أب، صديق، أخ، أخت.' },
    { id: 's3', type: 'exercise', question: 'Who is your father\'s son?', questionAr: 'من هو ابن أبيك؟', options: ['My sister', 'My brother', 'My uncle', 'My friend'], correctIndex: 1 }
  ]
};
