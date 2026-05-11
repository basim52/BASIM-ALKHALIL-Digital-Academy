
import { Lesson, proficiencyLevel } from "../../types";

export const everydayInteractionLesson: Lesson = {
  id: 'r_a1_5',
  title: "Everyday Interaction Texts",
  titleAr: "نصوص التفاعل اليومية",
  warmup: {
    mission: "Understand short messages and signs found in daily life like texts and cafe menus.",
    missionAr: "فهم الرسائل القصيرة واللوحات الموجودة في الحياة اليومية مثل الرسائل النصية وقوائم المقاهي.",
    objectives: [
      "Interpret common greetings in text messages.",
      "Read simple prices and items on a menu.",
      "Understand basic time expressions in social chats."
    ],
    objectivesAr: [
      "تفسير التحيات الشائعة في الرسائل النصية.",
      "قراءة الأسعار والأصناف البسيطة في القائمة.",
      "فهم تعبيرات الوقت الأساسية في المحادثات الاجتماعية."
    ]
  },
  readingText: {
    paragraphs: [
      {
        en: 'Hi! Where are you? I am at the cafe near the station. Are you coming? Yes, I am on my way. See you at 5:00 PM! Great, let\'s have some tea and cake. See you soon!',
        ar: 'مرحباً! أين أنت؟ أنا في المقهى القريب من المحطة. هل أنت قادم؟ نعم، أنا في طريقي. أراك في الساعة الخامسة مساءً! رائع، لنتناول بعض الشاي والكعك. أراك قريباً!'
      },
      {
        en: 'The cafe menu is simple. A cup of coffee is $3.00 and tea is $2.00. If you want something sweet, the chocolate cake is $4.50. I always look at the prices before I order.',
        ar: 'قائمة المقهى بسيطة. كوب القهوة بـ 3 دولارات والشاي بـ 2 دولار. إذا كنت تريد شيئاً حلواً، فكعكة الشوكولاتة بـ 4.50 دولار. أنا دائماً أنظر إلى الأسعار قبل أن أطلب.'
      }
    ]
  },
  vocabulary: [
    {
      word: 'Menu',
      phonetic: 'ˈmenjuː',
      meaningAr: 'قائمة طعام',
      example: 'Can I see the menu, please?'
    },
    {
      word: 'Soon',
      phonetic: 'suːn',
      meaningAr: 'قريباً',
      example: 'The train will arrive soon.'
    }
  ],
  quiz: [
    {
      question: "In a menu: 'Tea ... $2'. How much is the tea?",
      questionAr: "في قائمة طعام: 'Tea ... $2'. كم سعر الشاي؟",
      options: ["Free", "One dollar", "Two dollars", "Ten dollars"],
      optionsAr: ["مجاني", "دولار واحد", "دولاران", "عشرة دولارات"],
      correctIndex: 2,
      explanation: "The price listed is $2 (Two dollars).",
      explanationAr: "السعر الموضح هو دولارين."
    },
    {
      question: "A friend texts you: 'See you at 6:00'. What information is this?",
      questionAr: "صديق أرسل لك: 'See you at 6:00'. ما هي هذه المعلومة؟",
      options: ["A location", "A name", "A price", "A time"],
      optionsAr: ["موقع", "اسم", "سعر", "وقت"],
      correctIndex: 3,
      explanation: "'6:00' indicates a specific time.",
      explanationAr: "التوقيت '6:00' يشير بوضوح إلى الوقت."
    }
  ]
};
