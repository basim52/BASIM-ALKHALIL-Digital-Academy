/**
 * «ركّب الجملة» — picture sentence cards for the classrooms (فصل المعلمين + فصل عبود).
 * Static, beginner content. Independent of Sara's curriculum/tracks, progress, XP and certificates.
 * Sets grow in length: 3 words → 4 → 5 → 6–7. Pictures are emoji in circles (no photos of people).
 * Sentences carry no punctuation so they split cleanly into word chips.
 */
export interface PictureSentence { id: string; emoji: string; en: string; ar: string }
export interface PictureSentenceSet { id: string; titleAr: string; titleEn: string; words: string; rows: PictureSentence[] }

export const PICTURE_SENTENCE_SETS: PictureSentenceSet[] = [
  {
    id: 'set-1', titleAr: 'جمل قصيرة عن يومي', titleEn: 'Short sentences about my day', words: '٣ كلمات',
    rows: [
      { id: 's1-1', emoji: '🍚', en: 'I eat rice', ar: 'أنا آكل رز' },
      { id: 's1-2', emoji: '💧', en: 'I drink water', ar: 'أنا أشرب ماء' },
      { id: 's1-3', emoji: '😴', en: 'I am sleepy', ar: 'أنا نعسان' },
      { id: 's1-4', emoji: '🐱', en: 'I love cats', ar: 'أنا أحب القطط' },
      { id: 's1-5', emoji: '📖', en: 'She reads books', ar: 'هي تقرأ كتب' },
    ],
  },
  {
    id: 'set-2', titleAr: 'في البيت والمدرسة', titleEn: 'At home and school', words: '٤ كلمات',
    rows: [
      { id: 's2-1', emoji: '⚽', en: 'The boy plays football', ar: 'الولد يلعب كرة قدم' },
      { id: 's2-2', emoji: '🏫', en: 'I go to school', ar: 'أنا أروح المدرسة' },
      { id: 's2-3', emoji: '🍎', en: 'She eats an apple', ar: 'هي تاكل تفاحة' },
      { id: 's2-4', emoji: '🐶', en: 'The dog is happy', ar: 'الكلب مبسوط' },
      { id: 's2-5', emoji: '🌧️', en: 'It is raining today', ar: 'الجو ممطر اليوم' },
    ],
  },
  {
    id: 'set-3', titleAr: 'وش يصير الحين؟', titleEn: 'What is happening now?', words: '٥ كلمات',
    rows: [
      { id: 's3-1', emoji: '⚽', en: 'The boy is playing football', ar: 'الولد يلعب كرة قدم الحين' },
      { id: 's3-2', emoji: '🍳', en: 'My mom is cooking dinner', ar: 'أمي تطبخ العشاء' },
      { id: 's3-3', emoji: '🎮', en: 'I play with my brother', ar: 'ألعب مع أخوي' },
      { id: 's3-4', emoji: '🐦', en: 'The bird is in the tree', ar: 'العصفور فوق الشجرة' },
      { id: 's3-5', emoji: '🎉', en: 'We have a party today', ar: 'عندنا حفلة اليوم' },
    ],
  },
  {
    id: 'set-4', titleAr: 'جمل أطول شوي', titleEn: 'A bit longer', words: '٦–٧ كلمات',
    rows: [
      { id: 's4-1', emoji: '🚌', en: 'We go to school by bus', ar: 'نروح المدرسة بالباص' },
      { id: 's4-2', emoji: '🪥', en: 'I brush my teeth every night', ar: 'أفرّش أسناني كل ليلة' },
      { id: 's4-3', emoji: '📚', en: 'I do my homework after school', ar: 'أسوي واجباتي بعد المدرسة' },
      { id: 's4-4', emoji: '🛒', en: 'We buy fruit from the market', ar: 'نشتري فواكه من السوق' },
      { id: 's4-5', emoji: '🏖️', en: 'We go to the beach on Friday', ar: 'نروح البحر يوم الجمعة' },
    ],
  },
];
