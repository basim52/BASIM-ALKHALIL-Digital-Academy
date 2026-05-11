import { Lesson } from "../../types";

export const sightWordsA1: Lesson = {
  id: 'r_a1_2',
  title: 'Academic Sight Words (Set 1)',
  titleAr: 'الكلمات البصرية الأكاديمية (1)',
  warmup: {
    mission: 'Master the common words you see everywhere to read faster and smoother.',
    missionAr: 'أتقن الكلمات الشائعة التي تراها في كل مكان لتتمكن من القراءة بشكل أسرع وأكثر سلاسة.',
    objectives: [
      'Recognize high-frequency words instantly.',
      'Understand why some words don\'t follow standard spelling rules.',
      'Read short sentences containing common sight words.'
    ],
    objectivesAr: [
      'التعرف على الكلمات عالية التكرار فوراً.',
      'فهم لماذا لا تتبع بعض الكلمات قواعد التهجئة القياسية.',
      'قراءة جمل قصيرة تحتوي على كلمات بصرية شائعة.'
    ]
  },
  readingText: {
    paragraphs: [
      {
        en: 'Sight words are very important. They are the words we see most often in books and on the internet. We should not try to decode them sound by sound. Instead, we should recognize them as a whole picture.',
        ar: 'الكلمات البصرية مهمة جداً. هي الكلمات التي نراها غالباً في الكتب وعلى الإنترنت. يجب ألا نحاول تهجئتها صوتاً بصوت؛ بل يجب أن نتعرف عليها كصورة كاملة.'
      },
      {
        en: 'Common words like "THE", "AND", and "THEY" appear in almost every sentence. If you can read these words quickly, your reading will become much more fluent and natural.',
        ar: 'الكلمات الشائعة مثل "THE" و "AND" و "THEY" تظهر في كل جملة تقريباً. إذا استطعت قراءة هذه الكلمات بسرعة، ستصبح قراءتك أكثر طلاقة وطبيعية.'
      }
    ]
  },
  vocabulary: [
    {
      word: 'Sight Word',
      phonetic: 'saɪt wɜːrd',
      meaningAr: 'كلمة بصرية',
      example: 'The word "the" is a very common sight word.'
    },
    {
      word: 'Fluent',
      phonetic: 'ˈfluːənt',
      meaningAr: 'فصيح / طليق',
      example: 'Practicing words helps you become a fluent reader.'
    }
  ],
  quiz: [
    {
      question: "What is the best way to read a sight word?",
      questionAr: "ما هي أفضل طريقة لقراءة الكلمة البصرية؟",
      options: ["Spell it out loud", "Recognize it instantly", "Draw a picture of it", "Count the letters"],
      optionsAr: ["تهجئتها بصوت عالٍ", "التعرف عليها فوراً", "رسم صورة لها", "عد الحروف"],
      correctIndex: 1,
      explanation: "Sight words should be recognized as a whole at a glance.",
      explanationAr: "يجب التعرف على الكلمات البصرية ككتلة واحدة بمجرد النظر إليها."
    },
    {
      question: "Which of these is a common sight word?",
      questionAr: "أي من هذه الكلمات تعتبر كلمة بصرية شائعة؟",
      options: ["Elephant", "The", "Mountain", "Dictionary"],
      optionsAr: ["Elephant", "The", "Mountain", "Dictionary"],
      correctIndex: 1,
      explanation: "The word 'The' is used in almost every English sentence.",
      explanationAr: "كلمة 'The' تستخدم في كل جملة إنجليزية تقريباً."
    }
  ]
};
