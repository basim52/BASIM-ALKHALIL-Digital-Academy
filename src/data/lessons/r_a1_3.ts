import { Lesson } from "../../types";

export const environmentalPrintA1: Lesson = {
  id: 'r_a1_3',
  title: 'Environmental Print & Signs',
  titleAr: 'النصوص البيئية واللوحات',
  warmup: {
    mission: 'Learn to read the world around you starting with everyday signs and symbols.',
    missionAr: 'تعلم قراءة العالم من حولك بدءاً من اللوحات والرموز اليومية.',
    objectives: [
      'Identify common public signs and their meanings.',
      'Understand simple commands found in public places.',
      'Connect visual symbols with English words.'
    ],
    objectivesAr: [
      'تحديد اللوحات العامة الشائعة ومعانيها.',
      'فهم الأوامر البسيطة الموجودة في الأماكن العامة.',
      'ربط الرموز البصرية بالكلمات الإنجليزية.'
    ]
  },
  readingText: {
    paragraphs: [
      {
        en: 'When you walk in the city, you see many signs. These signs tell you important information. For example, a big green sign that says "EXIT" shows you where to go out of a building.',
        ar: 'عندما تمشي في المدينة، ترى العديد من اللوحات. هذه اللوحات تخبرك بمعلومات مهمة. على سبيل المثال، لوحة خضراء كبيرة مكتوب عليها "EXIT" توضح لك مكان الخروج من المبنى.'
      },
      {
        en: 'At a shop door, you might see "PUSH" or "PULL". "PUSH" means you move the door away from you. "PULL" means you move the door towards you. Knowing these signs makes life much easier!',
        ar: 'عند باب المتجر، قد ترى "PUSH" أو "PULL". كلمة "PUSH" تعني أن تدفع الباب بعيداً عنك. وكلمة "PULL" تعني أن تسحب الباب نحوك. معرفة هذه اللوحات تجعل الحياة أسهل بكثير!'
      }
    ]
  },
  vocabulary: [
    {
      word: 'Entrance',
      phonetic: 'ˈentrəns',
      meaningAr: 'مدخل',
      example: 'Please use the main entrance of the library.'
    },
    {
      word: 'Exit',
      phonetic: 'ˈeksɪt',
      meaningAr: 'مخرج',
      example: 'In an emergency, look for the green exit sign.'
    }
  ],
  quiz: [
    {
      question: "What does a sign that says 'PULL' mean?",
      questionAr: "ماذا تعني لوحة مكتوب عليها 'PULL'؟",
      options: ["Move the door away", "Move the door towards you", "Do not enter", "Stop walking"],
      optionsAr: ["دفع الباب بعيداً", "سحب الباب نحوك", "عدم الدخول", "التوقف عن المشي"],
      correctIndex: 1,
      explanation: "PULL means to move something towards yourself.",
      explanationAr: "كلمة PULL تعني سحب الشيء باتجاهك."
    },
    {
      question: "Where would you typically see an 'EXIT' sign?",
      questionAr: "أين ترى عادةً لوحة 'EXIT'؟",
      options: ["On a table", "Above a door", "In a book", "Inside a car"],
      optionsAr: ["على الطاولة", "فوق الباب", "داخل كتاب", "داخل السيارة"],
      correctIndex: 1,
      explanation: "EXIT signs are usually placed above doors that lead out of a building.",
      explanationAr: "لوحات EXIT توضع عادةً فوق الأبواب التي تؤدي إلى خارج المبنى."
    }
  ]
};
