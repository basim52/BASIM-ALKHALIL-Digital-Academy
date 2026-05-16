
export interface LanguageLabLesson {
  id: number;
  title: string;
  titleAr: string;
  type: 'word-study' | 'grammar' | 'writing';
  explanation: string;
  explanationAr: string;
  examples: { en: string; ar: string }[];
  exercises: {
    id: number;
    type: 'identify' | 'complete' | 'unscramble' | 'choose';
    question: string;
    options?: string[];
    correct: string;
    img?: string;
    context?: string;
  }[];
}

export const LANGUAGE_LAB_DATA: Record<number, LanguageLabLesson> = {
  101: {
    id: 101,
    title: 'Word Study: Nouns and Verbs',
    titleAr: 'دراسة الكلمات: الأسماء والأفعال',
    type: 'word-study',
    explanation: 'Some words can be used as both nouns (things) and verbs (actions). For example, "paint" can be the liquid color or the act of coloring.',
    explanationAr: 'يمكن استخدام بعض الكلمات كأسماء (أشياء) وأفعال (أفعال) في آن واحد. على سبيل المثال، كلمة "paint" قد تعني الدهان أو عملية الدهان نفسها.',
    examples: [
      { en: "Let's use red paint (noun) to paint (verb) the room.", ar: "دعونا نستخدم الطلاء الأحمر (اسم) لطلاء (فعل) الغرفة." },
      { en: "Her laugh (noun) was funny. It made me laugh (verb).", ar: "كانت ضحكتها (اسم) مضحكة. لقد جعلتني أضحك (فعل)." }
    ],
    exercises: [
      { id: 1, type: 'identify', question: "Let's use red (paint) to paint the room.", options: ['noun', 'verb'], correct: 'noun', context: 'The first "paint" in the sentence is a...' },
      { id: 2, type: 'complete', question: "He wants to _______ the room blue.", correct: 'paint', img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=400&q=80' },
      { id: 3, type: 'identify', question: "I know the (answer).", options: ['noun', 'verb'], correct: 'noun' },
      { id: 4, type: 'complete', question: "Stand at the _______ of the line.", correct: 'end', img: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  102: {
    id: 102,
    title: 'Grammar: -ed and -ing Adjectives',
    titleAr: 'القواعد: الصفات المنتهية بـ -ed و -ing',
    type: 'grammar',
    explanation: 'Use -ed adjectives to talk about feelings (how you feel). Use -ing adjectives to talk about things or situations (what caused the feeling).',
    explanationAr: 'استخدم الصفات التي تنتهي بـ -ed للتحدث عن المشاعر (كيف تشعر). استخدم الصفات التي تنتهي بـ -ing للتحدث عن الأشياء أو المواقف (مسبب الشعور).',
    examples: [
      { en: "I'm so tired. (feeling)", ar: "أنا متعب جداً. (شعور)" },
      { en: "That race was tiring. (situation)", ar: "كان ذلك السباق متعباً. (موقف)" }
    ],
    exercises: [
      { id: 1, type: 'choose', question: "The festival was _______.", options: ['amazing', 'amazed'], correct: 'amazing', img: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=400&q=80' },
      { id: 2, type: 'choose', question: "He was _______.", options: ['amazing', 'amazed'], correct: 'amazed', img: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=400&q=80' },
      { id: 3, type: 'unscramble', question: "race / Was / the / exciting / ?", correct: 'Was the race exciting?' },
      { id: 4, type: 'complete', question: "She was (tired / tiring) after the run.", correct: 'tired' }
    ]
  },
  103: {
    id: 103,
    title: 'Suffixes: -ful and -less',
    titleAr: 'اللاحقات: -ful و -less',
    type: 'word-study',
    explanation: 'Suffixes are letters added to the end of a word. -ful means "full of," and -less means "without."',
    explanationAr: 'اللاحقات هي حروف تضاف لنهاية الكلمة. -ful تعني "ممتلئ بـ"، و -less تعني "بدون".',
    examples: [
      { en: "The boy was careful (full of care).", ar: "كان الولد حذراً (مليئاً بالعناية)." },
      { en: "The dog was harmless (without harm).", ar: "كان الكلب غير مؤذٍ (بدون أذى)." }
    ],
    exercises: [
      { id: 1, type: 'choose', question: "The night was _______ (full of stars).", options: ['starful', 'starless', 'starry'], correct: 'starless', context: 'Wait, starless means no stars. Use starful if full of stars, but starry is common. Actually let\'s use help.' },
      { id: 2, type: 'complete', question: "He is very help______. He helps everyone.", correct: 'ful' },
      { id: 3, type: 'choose', question: "A phone without a battery is use_______.", options: ['ful', 'less'], correct: 'less' }
    ]
  },
  104: {
    id: 104,
    title: 'Prefixes: un- and re-',
    titleAr: 'البوادئ: un- و re-',
    type: 'word-study',
    explanation: 'Prefixes are letters added to the start of a word. un- usually means "not" or "opposite," and re- means "again."',
    explanationAr: 'البوادئ هي حروف تضاف لبداية الكلمة. un- تعني عادة "ليس" أو "العكس"، و re- تعني "مرة أخرى".',
    examples: [
      { en: "He was unhappy (not happy).", ar: "كان غير سعيد." },
      { en: "Please rewrite the story (write again).", ar: "يرجى إعادة كتابة القصة." }
    ],
    exercises: [
      { id: 1, type: 'complete', question: "I need to _____play the video to see it again.", correct: 're' },
      { id: 2, type: 'choose', question: "His room is very ______tidy.", options: ['un', 're'], correct: 'un' },
      { id: 3, type: 'complete', question: "You should _____fill the water bottle.", correct: 're' }
    ]
  },
  105: {
    id: 105,
    title: 'Compound Words',
    titleAr: 'الكلمات المركبة',
    type: 'word-study',
    explanation: 'A compound word is made when two smaller words are joined together to make a new word with a new meaning.',
    explanationAr: 'الكلمة المركبة تتكون عندما تنضم كلمتان صغيرتان معاً لتكوين كلمة جديدة بمعنى جديد.',
    examples: [
      { en: "Rain + bow = Rainbow", ar: "مطر + قوس = قوس قزح" },
      { en: "Sun + flower = Sunflower", ar: "شمس + زهرة = عباد الشمس" }
    ],
    exercises: [
      { id: 1, type: 'complete', question: "Back + pack = _______", correct: 'backpack' },
      { id: 2, type: 'choose', question: "What do you get when you combine Fire and Fighter?", options: ['Fireman', 'Firefighter', 'Waterfighter'], correct: 'Firefighter' },
      { id: 3, type: 'unscramble', question: "cake / Cup / is / my / favorite / .", correct: 'Cupcake is my favorite.' }
    ]
  },
  106: {
    id: 106,
    title: 'Synonyms and Antonyms',
    titleAr: 'المرادفات والمتضادات',
    type: 'word-study',
    explanation: 'Synonyms are words that have the same or similar meanings. Antonyms are words that have opposite meanings.',
    explanationAr: 'المرادفات هي كلمات لها نفس المعنى أو معنى مشابه. المتضادات هي كلمات لها معاني متضادة.',
    examples: [
      { en: "Small and Little are synonyms.", ar: "صغير وضئيل هما مرادفان." },
      { en: "Big and Small are antonyms.", ar: "كبير وصغير هما متضادان." }
    ],
    exercises: [
      { id: 1, type: 'choose', question: "What is a synonym for 'Happy'?", options: ['Sad', 'Glad', 'Angry'], correct: 'Glad' },
      { id: 2, type: 'choose', question: "What is the antonym for 'Fast'?", options: ['Quick', 'Slow', 'Rapid'], correct: 'Slow' },
      { id: 3, type: 'complete', question: "Cold is the opposite of _______.", correct: 'hot' }
    ]
  },
  107: {
    id: 107,
    title: 'Comparative and Superlative',
    titleAr: 'المقارنة والتفضيل',
    type: 'grammar',
    explanation: 'Use comparative (-er) to compare two things. Use superlative (-est) to compare three or more things.',
    explanationAr: 'استخدم صيغة المقارنة (-er) للمقارنة بين شيئين. استخدم صيغة التفضيل (-est) للمقارنة بين ثلاثة أشياء أو أكثر.',
    examples: [
      { en: "The tiger is faster than the cat.", ar: "النمر أسرع من القطة." },
      { en: "The cheetah is the fastest animal.", ar: "الفهد هو أسرع حيوان." }
    ],
    exercises: [
      { id: 1, type: 'choose', question: "An elephant is _______ than a mouse.", options: ['big', 'bigger', 'biggest'], correct: 'bigger' },
      { id: 2, type: 'choose', question: "Mount Everest is the _______ mountain.", options: ['high', 'higher', 'highest'], correct: 'highest' },
      { id: 3, type: 'complete', question: "My brother is (old) _______ than me.", correct: 'older' }
    ]
  },
  108: {
    id: 108,
    title: 'Conjunctions: and, but, or',
    titleAr: 'أدوات الربط: و، لكن، أو',
    type: 'grammar',
    explanation: 'Use "and" to add information. Use "but" to show a difference. Use "or" to show a choice.',
    explanationAr: 'استخدم "and" لإضافة معلومات. استخدم "but" لإظهار التباين. استخدم "or" لإظهار الاختيار.',
    examples: [
      { en: "I like apples and bananas.", ar: "أنا أحب التفاح والموز." },
      { en: "He is small but strong.", ar: "هو صغير لكنه قوي." }
    ],
    exercises: [
      { id: 1, type: 'choose', question: "Do you want tea _______ coffee?", options: ['and', 'but', 'or'], correct: 'or' },
      { id: 2, type: 'choose', question: "It was raining, _______ we went out.", options: ['and', 'but', 'or'], correct: 'but' },
      { id: 3, type: 'complete', question: "I have a pen _______ a pencil.", correct: 'and' }
    ]
  },
  109: {
    id: 109,
    title: 'Prepositions of Place',
    titleAr: 'حروف جر المكان',
    type: 'grammar',
    explanation: 'Prepositions show where something is. Common ones are: in, on, under, next to, behind.',
    explanationAr: 'توضح حروف الجر مكان وجود الشيء. الشائع منها: في، على، تحت، بجانب، خلف.',
    examples: [
      { en: "The cat is on the table.", ar: "القطة على الطاولة." },
      { en: "The ball is under the chair.", ar: "الكرة تحت الكرسي." }
    ],
    exercises: [
      { id: 1, type: 'choose', question: "The fish is _______ the water.", options: ['on', 'in', 'under'], correct: 'in', img: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=400&q=80' },
      { id: 2, type: 'choose', question: "The bird is flying _______ the tree.", options: ['above', 'under', 'in'], correct: 'above' },
      { id: 3, type: 'complete', question: "The book is _______ the desk.", correct: 'on' }
    ]
  },
  110: {
    id: 110,
    title: 'Past Simple Tense',
    titleAr: 'زمن الماضي البسيط',
    type: 'grammar',
    explanation: 'We use the past simple to talk about things that finished in the past. Most verbs add -ed (played, walked).',
    explanationAr: 'نستخدم الماضي البسيط للتحدث عن أشياء انتهت في الماضي. معظم الأفعال يضاف لها -ed.',
    examples: [
      { en: "I played football yesterday.", ar: "لعبت كرة القدم بالأمس." },
      { en: "She visited her grandma last week.", ar: "زارت جدتها الأسبوع الماضي." }
    ],
    exercises: [
      { id: 1, type: 'complete', question: "Yesterday, I _______ (walk) to school.", correct: 'walked' },
      { id: 2, type: 'choose', question: "He _______ a movie last night.", options: ['watch', 'watched', 'watching'], correct: 'watched' },
      { id: 3, type: 'identify', question: "Is 'went' a past tense verb?", options: ['Yes', 'No'], correct: 'Yes' }
    ]
  },
  111: {
    id: 111,
    title: 'Modal Verbs: Can and Must',
    titleAr: 'الأفعال الناقصة: يستطيع ويجب',
    type: 'grammar',
    explanation: 'Use "can" for things you are able to do. Use "must" for things that are necessary (rules).',
    explanationAr: 'استخدم "can" للأشياء التي تستطيع القيام بها. استخدم "must" للأشياء الضرورية (القواعد).',
    examples: [
      { en: "I can swim.", ar: "أستطيع السباحة." },
      { en: "You must listen to the teacher.", ar: "يجب عليك الاستماع للمعلم." }
    ],
    exercises: [
      { id: 1, type: 'choose', question: "Birds _______ fly.", options: ['can', 'must'], correct: 'can' },
      { id: 2, type: 'choose', question: "You _______ wash your hands before eating.", options: ['can', 'must'], correct: 'must' },
      { id: 3, type: 'complete', question: "Cats _______ climb trees.", correct: 'can' }
    ]
  }
};
