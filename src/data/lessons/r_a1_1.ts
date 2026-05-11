import { Lesson } from "../../types";

export const phonemicA1: Lesson = {
  id: 'r_a1_1',
  title: 'Phonemic Awareness Foundations',
  titleAr: 'أسس الوعي الصوتي',
  warmup: {
    mission: 'Unlock the hidden sounds of English to read any word with confidence.',
    missionAr: 'اكتشف الأصوات الخفية في اللغة الإنجليزية لتتمكن من قراءة أي كلمة بثقة.',
    objectives: [
      'Recognize the difference between letters and phonemes.',
      'Identify critical sounds like /s/, /a/, /t/, /p/.',
      'Understand how symbols represent sounds.'
    ],
    objectivesAr: [
      'التمييز بين الحروف والوحدات الصوتية.',
      'تحديد الأصوات الحيوية مثل /s/, /a/, /t/, /p/.',
      'فهم كيف تمثل الرموز الأصوات المختلفة.'
    ]
  },
  readingText: {
    paragraphs: [
      {
        en: 'English is a special language. It has 26 letters in the alphabet, but it has 44 unique sounds called phonemes. When we read, we don\'t just look at letters; we listen to the music of the sounds.',
        ar: 'اللغة الإنجليزية لغة مميزة. تحتوي على 26 حرفاً في الأبجدية، لكنها تمتلك 44 صوتاً فريداً يسمى "phonemes". عندما نقرأ، نحن لا ننظر فقط إلى الحروف؛ بل نستمع إلى موسيقى الأصوات.'
      },
      {
        en: 'For example, look at the word "CAT". It has three letters: C, A, and T. It also has three sounds: /k/, /æ/, and /t/. If you know the sounds, you can read the word perfectly every time.',
        ar: 'على سبيل المثال، انظر إلى كلمة "CAT". تحتوي على ثلاثة حروف: C و A و T. كما تحتوي أيضاً على ثلاثة أصوات: /k/ و /æ/ و /t/. إذا كنت تعرف الأصوات، يمكنك قراءة الكلمة بشكل مثالي في كل مرة.'
      }
    ]
  },
  vocabulary: [
    {
      word: 'Phoneme',
      phonetic: 'ˈfoʊniːm',
      meaningAr: 'وحدة صوتية',
      example: 'The word "sun" has three phonemes.'
    },
    {
      word: 'Decoding',
      phonetic: 'diːˈkoʊdɪŋ',
      meaningAr: 'فك الرموز / التهجئة',
      example: 'Decoding helps you read new words by their sounds.'
    }
  ],
  quiz: [
    {
      question: "How many phonemes (sounds) are there in the English language?",
      questionAr: "كم عدد الوحدات الصوتية (الأصوات) في اللغة الإنجليزية؟",
      options: ["26", "44", "52", "12"],
      optionsAr: ["26", "44", "52", "12"],
      correctIndex: 1,
      explanation: "There are 26 letters but 44 distinct sounds in English.",
      explanationAr: "يوجد 26 حرفاً ولكن هناك 44 صوتاً مميزاً في الإنجليزية."
    },
    {
      question: "What is a 'phoneme'?",
      questionAr: "ما هو الـ 'phoneme'؟",
      options: ["A type of book", "A unique sound", "A long word", "A letter"],
      optionsAr: ["نوع من الكتب", "صوت فريد", "كلمة طويلة", "حرف"],
      correctIndex: 1,
      explanation: "A phoneme is the smallest unit of sound in a language.",
      explanationAr: "الوحدة الصوتية هي أصغر وحدة صوت في اللغة."
    }
  ]
};
