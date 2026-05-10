import { Lesson } from "../../types";

export const socialMediaA2: Lesson = {
  id: 'w_a2_3',
  title: 'Social Media Posts',
  titleAr: 'منشورات التواصل الاجتماعي',
  slides: [
    { id: 's1', type: 'intro', content: 'On social media, we use informal language and hashtags to share our lives.', contentAr: 'نستخدم لغة غير رسمية ووسوم (هاشتاج) في وسائل التواصل الاجتماعي لمشاركة حياتنا.' },
    { id: 's2', type: 'vocabulary', content: 'Post, Captions, Hashtag (#), Engagement, Update.', contentAr: 'منشور، تعليق، وسم، تفاعل، تحديث.' },
    { id: 's3', type: 'exercise', question: 'What do you call the short text under a photo?', questionAr: 'ماذا تسمى النصوص القصيرة تحت الصورة؟', options: ['A title', 'A caption', 'A footer', 'A menu'], correctIndex: 1 }
  ]
};
