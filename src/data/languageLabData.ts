
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
  },
  112: {
    id: 112,
    title: 'Words: The World Around Us & Sports',
    titleAr: 'الكلمات: العالم من حولنا والرياضة',
    type: 'word-study',
    explanation: 'We use different words for nature and sports. A canyon is a deep valley with high sides. A stream is like a small river. In sports, we bounce, kick, or skip.',
    explanationAr: 'نستخدم كلمات مختلفة لوصف الطبيعة والرياضة. الأخدود (Canyon) هو واد عميق بجوانب مرتفعة. الجدول (Stream) هو مثل نهر صغير. في الرياضة، نقوم بالنط (bounce)، الركل (kick)، أو القفز (skip).',
    examples: [
      { en: "She uses her hand to bounce the ball.", ar: "تستخدم يدها لنط الكرة." },
      { en: "The stream flows through the canyon.", ar: "يتدفق الجدول عبر الأخدود." }
    ],
    exercises: [
      { id: 1, type: 'choose', question: "When you play soccer, you _______ the ball.", options: ['bounce', 'kick'], correct: 'kick', img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=400&q=80' },
      { id: 2, type: 'complete', question: "She uses her hand to _______ the ball on the ground.", correct: 'bounce', img: 'https://images.unsplash.com/photo-1544919982-b61976f0ba43?auto=format&fit=crop&w=400&q=80' },
      { id: 3, type: 'choose', question: "A ______ is a deep valley with very steep sides.", options: ['plain', 'canyon', 'lake'], correct: 'canyon', img: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=400&q=80' },
      { id: 4, type: 'complete', question: "A _______ is a small, narrow river.", correct: 'stream', img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80' },
      { id: 5, type: 'complete', question: "Two friends learned to _______ when they were little.", correct: 'skip', img: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  113: {
    id: 113,
    title: 'Word Study: Ancient Civilizations',
    titleAr: 'دراسة الكلمات: الحضارات القديمة',
    type: 'word-study',
    explanation: 'History is the study of the past. Archaeologists find artifacts like pottery and tools to learn about how people lived thousands of years ago.',
    explanationAr: 'التاريخ هو دراسة الماضي. يجد علماء الآثار قطعاً أثرية مثل الفخار والأدوات ليتعلموا كيف عاش الناس قبل آلاف السنين.',
    examples: [
      { en: "The Romans built amazing aqueducts.", ar: "بنى الرومان قنوات مياه مذهلة." },
      { en: "They found a golden mask in the tomb.", ar: "وجدوا قناعاً ذهبياً في المقبرة." }
    ],
    exercises: [
      { id: 1, type: 'choose', question: "An _______ studies old things from the past.", options: ['Artist', 'Archaeologist', 'Doctor'], correct: 'Archaeologist' },
      { id: 2, type: 'complete', question: "Ancient Egyptians built the _______.", correct: 'Pyramids', img: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=400&q=80' },
      { id: 3, type: 'identify', question: "Is a phone an ancient artifact?", options: ['Yes', 'No'], correct: 'No' }
    ]
  },
  114: {
    id: 114,
    title: 'Words: Extreme Weather',
    titleAr: 'الكلمات: الطقس القاسي',
    type: 'word-study',
    explanation: 'Extreme weather can be dangerous. Hurricanes are strong storms with wind, and droughts happen when there is no rain for a long time.',
    explanationAr: 'الطقس القاسي قد يكون خطيراً. الأعاصير هي عواصف قوية مع رياح، والجفاف يحدث عندما لا يكون هناك مطر لفترة طويلة.',
    examples: [
      { en: "The flood covered the streets with water.", ar: "غمر الفيضان الشوارع بالماء." },
      { en: "A tornado is a spinning tube of air.", ar: "الإعصار القمعي هو أنبوب دوار من الهواء." }
    ],
    exercises: [
      { id: 1, type: 'choose', question: "A long time without rain is a _______.", options: ['flood', 'drought', 'storm'], correct: 'drought' },
      { id: 2, type: 'complete', question: "The _______ had very strong winds.", correct: 'hurricane', img: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&w=400&q=80' },
      { id: 3, type: 'unscramble', question: "is / dangerous / Lightning / extreme / weather / .", correct: 'Lightning is dangerous extreme weather.' }
    ]
  },
  115: {
    id: 115,
    title: 'Grammar: Health and Nutrition',
    titleAr: 'القواعد: الصحة والتغذية',
    type: 'grammar',
    explanation: 'We use modal verbs to talk about health rules. You "should" eat vegetables and "must" wash your hands.',
    explanationAr: 'نستخدم الأفعال الناقصة للتحدث عن القواعد الصحية. "ينبغي" (should) أن تأكل الخضروات و"يجب" (must) أن تغسل يديك.',
    examples: [
      { en: "You should sleep eight hours.", ar: "ينبغي أن تنام ثماني ساعات." },
      { en: "You must not eat too much sugar.", ar: "يجب ألا تأكل الكثير من السكر." }
    ],
    exercises: [
      { id: 1, type: 'choose', question: "You _______ drink water every day.", options: ['should', 'shouldn\'t'], correct: 'should' },
      { id: 2, type: 'complete', question: "Fruits have many _______ that help us grow.", correct: 'vitamins', img: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=400&q=80' },
      { id: 3, type: 'identify', question: "Is pizza a healthy vegetable?", options: ['Yes', 'No'], correct: 'No' }
    ]
  },
  116: {
    id: 116,
    title: 'Words: Technology and Future',
    titleAr: 'الكلمات: التكنولوجيا والمستقبل',
    type: 'word-study',
    explanation: 'Technology changes how we live. We use "smart" devices, "wireless" connections, and "digital" tools every day.',
    explanationAr: 'التكنولوجيا تغير طريقة عيشنا. نستخدم أجهزة "ذكية"، اتصالات "لاسلكية"، وأدوات "رقمية" كل يوم.',
    examples: [
      { en: "I use a tablet to study.", ar: "أستخدم الجهاز اللوحي للدراسة." },
      { en: "Robots might help us in the future.", ar: "قد تساعدنا الروبوتات في المستقبل." }
    ],
    exercises: [
      { id: 1, type: 'choose', question: "A ______ is a machine that works like a person.", options: ['Computer', 'Robot', 'Phone'], correct: 'Robot', img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80' },
      { id: 2, type: 'complete', question: "The internet is a _______ network.", correct: 'global' },
      { id: 3, type: 'unscramble', question: "smart / My / is / watch / helpful / .", correct: 'My smart watch is helpful.' }
    ]
  },
  117: {
    id: 117,
    title: 'Word Study: Ocean Life',
    titleAr: 'دراسة الكلمات: حياة المحيطات',
    type: 'word-study',
    explanation: 'The ocean is full of life. From tiny plankton to giant whales, animals have adapted to breathe and move underwater.',
    explanationAr: 'المحيط مليء بالحياة. من العوالق الصغيرة إلى الحيتان العملاقة، تكيفت الحيوانات للتنفس والحركة تحت الماء.',
    examples: [
      { en: "Sharks have sharp teeth.", ar: "أسماك القرش لها أسنان حادة." },
      { en: "Coral reefs are colorful underwater gardens.", ar: "الشعاب المرجانية هي حدائق ملونة تحت الماء." }
    ],
    exercises: [
      { id: 1, type: 'choose', question: "What is the largest animal in the ocean?", options: ['Dolphin', 'Shark', 'Blue Whale'], correct: 'Blue Whale', img: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=400&q=80' },
      { id: 2, type: 'complete', question: "Fish use _______ to breathe underwater.", correct: 'gills' },
      { id: 3, type: 'choose', question: "Octopuses have ______ arms.", options: ['6', '8', '10'], correct: '8' }
    ]
  },
  118: {
    id: 118,
    title: 'Words: Space Frontiers',
    titleAr: 'الكلمات: حدود الفضاء',
    type: 'word-study',
    explanation: 'Our solar system has eight planets. The Sun is a star, and the Moon orbits the Earth. Astronauts travel in spaceships.',
    explanationAr: 'نظامنا الشمسي يحتوي على ثمانية كواكب. الشمس نجم، والقمر يدور حول الأرض. يسافر رواد الفضاء في سفن فضائية.',
    examples: [
      { en: "Mars is called the Red Planet.", ar: "يسمى المريخ الكوكب الأحمر." },
      { en: "Astronauts wear space suits.", ar: "يرتدي رواد الفضاء بدلات فضائية." }
    ],
    exercises: [
      { id: 1, type: 'choose', question: "The _______ is at the center of our solar system.", options: ['Earth', 'Moon', 'Sun'], correct: 'Sun', img: 'https://images.unsplash.com/photo-1532386233331-0dbb85a08230?auto=format&fit=crop&w=400&q=80' },
      { id: 2, type: 'complete', question: "A person who travels to space is an _______.", correct: 'astronaut', img: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=400&q=80' },
      { id: 3, type: 'identify', question: "Is the Moon a star?", options: ['Yes', 'No'], correct: 'No' }
    ]
  },
  119: {
    id: 119,
    title: 'Word Study: Ecosystems',
    titleAr: 'دراسة الكلمات: النظم البيئية',
    type: 'word-study',
    explanation: 'An ecosystem is a community of living and non-living things. Habitats include deserts, rainforests, and tundras.',
    explanationAr: 'النظام البيئي هو مجتمع من الكائنات الحية وغير الحية. تشمل الموائل الصحاري والغابات المطيرة والتندرا.',
    examples: [
      { en: "The rainforest is very humid.", ar: "الغابة المطيرة رطبة جداً." },
      { en: "Camels live in the desert.", ar: "تعيش الجمال في الصحراء." }
    ],
    exercises: [
      { id: 1, type: 'choose', question: "Where would you find a polar bear?", options: ['Desert', 'Rainforest', 'Arctic'], correct: 'Arctic', img: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&w=400&q=80' },
      { id: 2, type: 'complete', question: "The _______ has many trees and lots of rain.", correct: 'rainforest' },
      { id: 3, type: 'choose', question: "An animal that eats only plants is an _______.", options: ['Omnivore', 'Herbivore', 'Carnivore'], correct: 'Herbivore' }
    ]
  },
  120: {
    id: 120,
    title: 'Words: Art and Expression',
    titleAr: 'الكلمات: الفن والتعبير',
    type: 'word-study',
    explanation: 'Artists use different media to express ideas. Painters use canvas, while sculptors use clay or stone.',
    explanationAr: 'يستخدم الفنانون وسائط مختلفة للتعبير عن الأفكار. يستخدم الرسامون القماش، بينما يستخدم النحاتون الطين أو الحجر.',
    examples: [
      { en: "She is painting a landscape.", ar: "هي ترسم منظراً طبيعياً." },
      { en: "The statue is made of marble.", ar: "التمثال مصنوع من الرخام." }
    ],
    exercises: [
      { id: 1, type: 'choose', question: "A ______ is a picture of a person.", options: ['Landscape', 'Portrait', 'Still Life'], correct: 'Portrait', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80' },
      { id: 2, type: 'complete', question: "Artists use a _______ to mix colors.", correct: 'palette', img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80' },
      { id: 3, type: 'unscramble', question: "beautiful / The / is / sculpture / .", correct: 'The sculpture is beautiful.' }
    ]
  },
  121: {
    id: 121,
    title: 'Word Study: Transport',
    titleAr: 'دراسة الكلمات: النقل',
    type: 'word-study',
    explanation: 'Transportation helps us travel. We use public transport like buses and trains or private transport like cars and bikes.',
    explanationAr: 'تساعدنا وسائل النقل على السفر. نستخدم النقل العام مثل الحافلات والقطارات أو النقل الخاص مثل السيارات والدراجات.',
    examples: [
      { en: "The airplane took off from the airport.", ar: "أقلعت الطائرة من المطار." },
      { en: "I ride my bike to school.", ar: "أركب دراجتي إلى المدرسة." }
    ],
    exercises: [
      { id: 1, type: 'choose', question: "Which transport travels on tracks?", options: ['Bus', 'Boat', 'Train'], correct: 'Train', img: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=400&q=80' },
      { id: 2, type: 'complete', question: "A _______ flies in the sky.", correct: 'helicopter', img: 'https://images.unsplash.com/photo-1509130298739-651801c76e96?auto=format&fit=crop&w=400&q=80' },
      { id: 3, type: 'identify', question: "Are cars public transport?", options: ['Yes', 'No'], correct: 'No' }
    ]
  },
  122: {
    id: 122,
    title: 'Words: Values and Communities',
    titleAr: 'الكلمات: القيم والمجتمعات',
    type: 'word-study',
    explanation: 'Being part of a community means following rules and being kind. We should help others and share what we have.',
    explanationAr: 'كونك جزءاً من المجتمع يعني اتباع القواعد والتعامل بلطف. يجب أن نساعد الآخرين ونشارك ما لدينا.',
    examples: [
      { en: "It is important to be honest.", ar: "من المهم أن تكون صادقاً." },
      { en: "We should respect our elders.", ar: "ينبغي أن نحترم كبار السن." }
    ],
    exercises: [
      { id: 1, type: 'choose', question: "If you find a lost wallet, you should be _______.", options: ['Selfish', 'Honest', 'Angry'], correct: 'Honest' },
      { id: 2, type: 'complete', question: "Helping others is a good ______.", correct: 'value' },
      { id: 3, type: 'choose', question: "Sharing toys with friends is _______.", options: ['kind', 'mean', 'bad'], correct: 'kind' }
    ]
  }
};
