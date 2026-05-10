import { Lesson } from "../../types";

export const colorsArtE1: Lesson = {
  id: 'e_a1_3',
  title: 'Colors & Simple Art',
  titleAr: 'الألوان والفن البسيط',
  slides: [
    { id: 's1', type: 'intro', content: 'Describing the colors around you is a basic form of expression.', contentAr: 'وصف الألوان من حولك هو شكل أساسي من أشكال التعبير.' },
    { id: 's2', type: 'vocabulary', content: 'Red, Blue, Green, Yellow, Painting, Drawing.', contentAr: 'أحمر، أزرق، أخضر، أصفر، رسم بالألوان، رسم بالرصاص.' },
    { id: 's3', type: 'exercise', question: 'What color is the sky usually?', questionAr: 'ما لون السماء عادةً؟', options: ['Green', 'Blue', 'Red', 'Yellow'], correctIndex: 1 }
  ]
};
