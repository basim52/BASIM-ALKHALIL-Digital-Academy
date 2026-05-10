import { Lesson } from "../../types";

export const describingPlacesA2: Lesson = {
  id: 'w_a2_5',
  title: 'Describing Places',
  titleAr: 'وصف الأماكن',
  slides: [
    { id: 's1', type: 'intro', content: 'Use adjectives to describe your home or neighborhood.', contentAr: 'استخدم الصفات لوصف منزلك أو حيك.' },
    { id: 's2', type: 'vocabulary', content: 'Modern, Quiet, Crowded, Near, Far, Beautiful.', contentAr: 'حديث، هادئ، مزدحم، قريب، بعيد، جميل.' },
    { id: 's3', type: 'exercise', question: 'Which word describes a place with many people?', questionAr: 'أي كلمة تصف مكاناً فيه الكثير من الناس؟', options: ['Quiet', 'Crowded', 'Empty', 'Small'], correctIndex: 1 }
  ]
};
