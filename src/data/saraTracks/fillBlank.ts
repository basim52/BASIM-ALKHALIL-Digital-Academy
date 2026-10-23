/**
 * Sara "Complete the sentence" (fill the blank) — new exercise type on the tutor board.
 * Each card: English sentence with one blank + Arabic meaning + 3 option chips.
 * Every spoken line is written here literally, so it is real curriculum text (trigram allow-list → voice works without a token).
 */
export interface SaraBlankCard {
  /** Full correct sentence. */
  en: string;
  /** The missing word (must appear in `en`). */
  answer: string;
  ar: string;
  options: string[];
  /** Spoken first: the sentence with the blank + the question. */
  sayAsk: string;
  /** Spoken after a correct pick (laugh cue: "Excellent"). */
  sayRight: string;
  /** Spoken after a wrong pick / no pick. */
  sayReveal: string;
}
export interface SaraBlankLesson { id: string; order: number; titleAr: string; titleEn: string; icon: string; introAr: string; introEn: string; cards: SaraBlankCard[] }

export const FILL_BLANK_TRACK_ID = 'fill_blank';

export const FILL_BLANK_LESSONS: SaraBlankLesson[] = [
  {
    id: 'fill-blank-01', order: 1, icon: '🧩',
    titleAr: 'حروف الجر مع me', titleEn: 'Prepositions with me',
    introAr: 'كل فعل له حرف جر يمشي معه. اسمع الجملة من سارة، واختر الكلمة الناقصة قبل ما تقولها!',
    introEn: 'Each verb has its own preposition. Listen to Sara and pick the missing word before she says it!',
    cards: [
      { en: 'Wait for me', answer: 'for', ar: 'انتظرني', options: ['for', 'at', 'to'],
        sayAsk: 'Wait ... me. Which word is missing?', sayRight: 'Excellent! Wait for me.', sayReveal: 'The answer is for. Wait for me.' },
      { en: 'Look at me', answer: 'at', ar: 'انظر إليّ', options: ['for', 'on', 'at'],
        sayAsk: 'Look ... me. Which word is missing?', sayRight: 'Excellent! Look at me.', sayReveal: 'The answer is at. Look at me.' },
      { en: 'Listen to me', answer: 'to', ar: 'استمع إليّ', options: ['at', 'to', 'for'],
        sayAsk: 'Listen ... me. Which word is missing?', sayRight: 'Excellent! Listen to me.', sayReveal: 'The answer is to. Listen to me.' },
      { en: 'Reply to me', answer: 'to', ar: 'رُدّ عليّ', options: ['to', 'on', 'at'],
        sayAsk: 'Reply ... me. Which word is missing?', sayRight: 'Excellent! Reply to me.', sayReveal: 'The answer is to. Reply to me.' },
      { en: 'Depend on me', answer: 'on', ar: 'اعتمد عليّ', options: ['to', 'at', 'on'],
        sayAsk: 'Depend ... me. Which word is missing?', sayRight: 'Excellent! Depend on me.', sayReveal: 'The answer is on. Depend on me.' },
      { en: 'Smile at me', answer: 'at', ar: 'ابتسم لي', options: ['in', 'at', 'for'],
        sayAsk: 'Smile ... me. Which word is missing?', sayRight: 'Excellent! Smile at me.', sayReveal: 'The answer is at. Smile at me.' },
      { en: 'Talk to me', answer: 'to', ar: 'كلّمني', options: ['to', 'on', 'in'],
        sayAsk: 'Talk ... me. Which word is missing?', sayRight: 'Excellent! Talk to me.', sayReveal: 'The answer is to. Talk to me.' },
      { en: 'Believe in me', answer: 'in', ar: 'ثِق بي', options: ['at', 'to', 'in'],
        sayAsk: 'Believe ... me. Which word is missing?', sayRight: 'Excellent! Believe in me.', sayReveal: 'The answer is in. Believe in me.' },
    ],
  },
];
