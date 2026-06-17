export interface GameQuestion {
  q: string;
  opts: string[];
  ans: string;
}

export interface SnakeQuestion {
  q: string;
  opts: string[];
  ans: string;
}

export interface DialogueScenario {
  situationAr: string;
  situationEn: string;
  options: {
    t: string;
    s: number;
    f: string;
  }[];
}

export interface GardenDrop {
  word: string;
  correct: boolean;
}

export interface DragonAttack {
  attackAr: string;
  attackEn: string;
  options: {
    text: string;
    dmg: number;
    heal: number;
    desc: string;
  }[];
}

export interface DetectivePair {
  choices: string[];
  correct: string;
}

export interface JigsawSentence {
  sentence: string;
  options: string[];
  ans: string;
}

export interface EtiquetteRoomChallenge {
  roomNameAr: string;
  roomNameEn: string;
  challengeAr: string;
  challengeEn: string;
  options: string[];
  correctIdx: number;
}

export interface SecondHandWord {
  display: string;
  options: { text: string; adds: string; res: string; isCorrect: boolean }[];
  basePrice: number;
}

export interface CaesarCipherPuzzle {
  cipher: string;
  keyShift: number;
  hintAr: string;
  hintEn: string;
  ans: string;
}

export interface BridgePrompt {
  sentence: string;
  options: string[];
  ans: string;
}

export interface EmotionFlower {
  emoji: string;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  options: { txt: string; points: number }[];
}

export interface PhraseChefRecipe {
  titleAr: string;
  titleEn: string;
  subjectsCount: number;
  verbsCount: number;
  objectsCount: number;
  subjects: string[];
  verbs: string[];
  objects: string[];
  correctCombo: string[]; // [subject, verb, object]
}

export interface CulturalCountry {
  nameAr: string;
  nameEn: string;
  scenarioAr: string;
  scenarioEn: string;
  options: { txt: string; correct: boolean }[];
}

// ============================================================================
// DATA TABLES FOR ALL 20 INTEGRATED GAMES
// ============================================================================

// 1. Treasure Hunt questions (8x8 Grid Puzzles)
export const treasureMapQuestionsData: GameQuestion[] = [
  { q: "What is the past tense of 'go'?", opts: ["goed", "went", "gone", "going"], ans: "went" },
  { q: "Choose the correct sentence:", opts: ["He go to school.", "He goes to school.", "He gone to school.", "He going."], ans: "He goes to school." },
  { q: "Complete: She has already ___ her breakfast.", opts: ["eats", "eaten", "ate", "eating"], ans: "eaten" },
  { q: "Find the synonym of 'Quick':", opts: ["Slow", "Rapid", "Heavy", "Quiet"], ans: "Rapid" },
  { q: "Which word means 'extremely clean'?", opts: ["Immaculate", "Dirty", "Messy", "Slick"], ans: "Immaculate" },
  { q: "The plural of 'child' is:", opts: ["childs", "childes", "children", "childrens"], ans: "children" },
  { q: "Complete: If it rains, we ___ inside.", opts: ["stay", "will stay", "would stay", "stayed"], ans: "will stay" },
  { q: "Which preposition fits: She is good ___ drawing.", opts: ["at", "in", "on", "with"], ans: "at" },
  { q: "What is the opposite of 'generous'?", opts: ["giving", "kind", "stingy", "helpful"], ans: "stingy" },
  { q: "The chef ___ delicious pasta yesterday.", opts: ["cooks", "cooked", "is cooking", "cook"], ans: "cooked" },
  { q: "Choose the correct spelling:", opts: ["necessary", "necesary", "neccesary", "necesarry"], ans: "necessary" },
  { q: "Fill in: I can't find my keys ___.", opts: ["nowhere", "anywhere", "somewhere", "where"], ans: "anywhere" },
  { q: "Which word is a verb?", opts: ["happy", "softly", "listen", "beautiful"], ans: "listen" },
  { q: "Which word means 'to ask for politely'?", opts: ["demand", "request", "shout", "grab"], ans: "request" },
  { q: "Complete: This book is ___ than that one.", opts: ["gooder", "better", "best", "more good"], ans: "better" }
];

// 2. Word Battle random words
export const wordBattlePoolData: string[] = [
  "accommodation", "beautiful", "necessary", "Wednesday", "definitely", "separate", "environment",
  "government", "knowledge", "friendship", "adventure", "important", "yesterday", "tomorrow",
  "different", "difficult", "bicycle", "restaurant", "sustainable", "hospitality", "generosity",
  "courteous", "patience", "sincerely", "experience", "discipline", "community", "grateful"
];

// 3. Snakes & Ladders grammar quiz questions
export const snakesQuestionsData: SnakeQuestion[] = [
  { q: "Choose correct: She ___ a book every night.", opts: ["reads", "read", "is reading", "has read"], ans: "reads" },
  { q: "I ___ to London last summer vacation.", opts: ["goes", "went", "gone", "was going"], ans: "went" },
  { q: "They ___ soccer when it started to pour.", opts: ["were playing", "played", "are playing", "plays"], ans: "were playing" },
  { q: "The test was ___ than I expected.", opts: ["easiest", "easier", "more easy", "easy"], ans: "easier" },
  { q: "Identify the noun: The children played happily.", opts: ["children", "happily", "played", "the"], ans: "children" },
  { q: "We need ___ sugar for the cake.", opts: ["a few", "some", "many", "an"], ans: "some" },
  { q: "He doesn't ___ any money left.", opts: ["has", "have", "had", "having"], ans: "have" },
  { q: "If we ___ early, we will catch the bus.", opts: ["leave", "leaves", "will leave", "left"], ans: "leave" },
  { q: "The keys are ___ the kitchen counter.", opts: ["under", "on", "in", "between"], ans: "on" },
  { q: "I have ___ this cinematic movie three times.", opts: ["see", "saw", "seen", "seeing"], ans: "seen" },
  { q: "Which one is an adverb?", opts: ["quickly", "quick", "quicker", "quickness"], ans: "quickly" },
  { q: "Choose the correct spelling:", opts: ["recive", "receive", "receve", "recevei"], ans: "receive" },
  { q: "He is ___ tallest student in this class.", opts: ["the", "a", "an", "some"], ans: "the" },
  { q: "Would you like ___ apple?", opts: ["a", "an", "the", "some"], ans: "an" },
  { q: "They have lived here ___ five years.", opts: ["since", "for", "during", "while"], ans: "for" }
];

// 5. Dialogue Ambassador Scenarios
export const dialogueAmbassadorScenariosData: DialogueScenario[] = [
  {
    situationAr: "قابلت زميلاً جديداً في بهو الأكاديمية لأول مرة. ماذا تقول؟",
    situationEn: "You meet someone for the first time in the main corridor. Select reply:",
    options: [
      { t: "Hey, what's up?", s: -5, f: "Too informal for first meetings!" },
      { t: "Nice to meet you. How are you?", s: 20, f: "Excellent! Polite and correct." },
      { t: "Who are you?", s: -15, f: "Extremely rude!" },
      { t: "Hello, it's a pleasure to meet you.", s: 25, f: "Magnificent hospitality style!" }
    ]
  },
  {
    situationAr: "أحد زملائك أسقط كتبه على الأرض بالخطأ. كيف تتصرف؟",
    situationEn: "Your classmate accidentally drops their books on the floor. What do you do?",
    options: [
      { t: "Haha look at you!", s: -20, f: "Very unkind and discourteous!" },
      { t: "Walk away like you saw nothing.", s: 0, f: "Indifferent response." },
      { t: "Let me help you pick those up.", s: 25, f: "Wonderful helpful gesture!" },
      { t: "Pick them up and throw them.", s: -15, f: "Aggressive behavior." }
    ]
  },
  {
    situationAr: "تريد لفت انتباه المعلم للحديث في الفصل.",
    situationEn: "You want to get the teacher's attention in class. How do you respond?",
    options: [
      { t: "Scream: TEACHER LOOK AT ME!", s: -10, f: "Disruptive classroom behavior!" },
      { t: "Raise your hand and wait calmly.", s: 25, f: "Optimal respectful learning manners." },
      { t: "Tap the desk loudly.", s: -5, f: "Impatient and distracting." },
      { t: "Stand up and walk to the front without asking.", s: -5, f: "Disorganized." }
    ]
  },
  {
    situationAr: "تلقيت هدية من صديق لم تعجبك كثيراً.",
    situationEn: "You receive a gift from a friend that you don't really like. What do you say?",
    options: [
      { t: "Wow, this is terrible.", s: -25, f: "Incredibly hurtful and ungrateful." },
      { t: "Thank you so much for thinking of me! I appreciate it.", s: 25, f: "Elegant manners focus on the thought and effort." },
      { t: "I'll give this to someone else.", s: -15, f: "Tactless." },
      { t: "Keep silent and frown.", s: -5, f: "Awkward and cold." }
    ]
  },
  {
    situationAr: "صديقك وصل متأخراً 15 دقيقة على موعدكما.",
    situationEn: "Your friend arrives 15 minutes late to your meeting. How do you react?",
    options: [
      { t: "Shout: You always ruin everything!", s: -15, f: "Aggressive and angry statement." },
      { t: "I was a bit worried! Glad you made it safely.", s: 25, f: "Graceful and caring tone." },
      { t: "It's fine, but please text me next time.", s: 20, f: "Polite and constructive boundary setting." },
      { t: "Ignore them for the rest of the day.", s: -10, f: "Passive-aggressive." }
    ]
  }
];

// 6. Spelling Hero Words
export const spellingHeroTargetsData: string[] = [
  "beautiful", "accommodation", "separate", "knowledge", "environment",
  "necessary", "grateful", "receive", "friendship", "patience",
  "Wednesday", "difficult", "community", "generosity", "courteous",
  "definitely", "yesterday", "important", "sincerely", "chocolate"
];

// 7. Grammar Garden raindrops past participle training pairs
export const grammarGardenRaindropsData: GardenDrop[] = [
  { word: "Written", correct: true },
  { word: "Writed", correct: false },
  { word: "Eaten", correct: true },
  { word: "Eated", correct: false },
  { word: "Chosen", correct: true },
  { word: "Choosed", correct: false },
  { word: "Broken", correct: true },
  { word: "Broked", correct: false },
  { word: "Taken", correct: true },
  { word: "Tooked", correct: false },
  { word: "Known", correct: true },
  { word: "Knowed", correct: false },
  { word: "Done", correct: true },
  { word: "Doed", correct: false },
  { word: "Seen", correct: true },
  { word: "Seed", correct: false },
  { word: "Spoken", correct: true },
  { word: "Spoked", correct: false }
];

// 8. Knight of Polite Words encounters with the bad Rudeness Dragon
export const politeKnightDragonAttacksData: DragonAttack[] = [
  {
    attackAr: "التنين يهدد: 'لا أحد يهتم بك هنا أيها الغريب!'",
    attackEn: "The Dragon snarls: 'No one cares about you here, stranger!'",
    options: [
      {
        text: "I don't care about you either, ugly lizard!",
        dmg: 0,
        heal: 0,
        desc: "The dragon laughs and burns you with a hot fire blast! (-25 HP)"
      },
      {
        text: "I understand you feel lonely. Let's talk peacefully.",
        dmg: 35,
        heal: 20,
        desc: "An arrow of understanding pierces his anger, and restores your health! (+20 HP)"
      }
    ]
  },
  {
    attackAr: "التنين يصرخ: 'طريقي! ابتعد من هنا فوراً وإلا سحقتك!'",
    attackEn: "The Dragon shouts: 'My way! Move away now or I will crush you!'",
    options: [
      {
        text: "Excuse me, could we please share the path kindly?",
        dmg: 35,
        heal: 15,
        desc: "The shield of courtesy blocks his roar and calms his breath!"
      },
      {
        text: "Try it if you dare, you overgrown snake!",
        dmg: 0,
        heal: 0,
        desc: "He counters with a powerful tail swipe! (-25 HP)"
      }
    ]
  },
  {
    attackAr: "التنين يستهزئ: 'درعك قديم وضعيف مثل كلماتك!'",
    attackEn: "The Dragon scoffs: 'Your shield is rusty and weak, just like your words!'",
    options: [
      {
        text: "My shield is bad? You should look in the mirror!",
        dmg: 0,
        heal: 0,
        desc: "You let annoyance take over. The dragon strikes your blind spot! (-25 HP)"
      },
      {
        text: "Thank you for the feedback. I will always strive to polish and improve it.",
        dmg: 40,
        heal: 25,
        desc: "Ultimate humble response! The dragon is blinded by the shine of your grace!"
      }
    ]
  },
  {
    attackAr: "التنين يعترض: 'لماذا يجب علي أن أتحدث بنبرة مهذبة معك؟'",
    attackEn: "The Dragon resists: 'Why should I speak with courtesy to you?'",
    options: [
      {
        text: "Because respectful dialogue builds bridges and cures anger.",
        dmg: 45,
        heal: 30,
        desc: "A pure golden blast of wisdom deals fatal styling blow to his aggressive posture!"
      },
      {
        text: "Because I'll hit you with my sword if you don't!",
        dmg: 5,
        heal: 0,
        desc: "A hostile reply. It deals minor raw damage, but you feel exhausted. (-20 HP)"
      }
    ]
  }
];

// 9. Pronunciation Detective sounds comparisons
export const pronunciationDetectivePairsData: DetectivePair[] = [
  { choices: ["ship", "sheep"], correct: "ship" },
  { choices: ["bat", "pat"], correct: "bat" },
  { choices: ["sink", "think"], correct: "think" },
  { choices: ["wet", "wait"], correct: "wet" },
  { choices: ["live", "leave"], correct: "leave" },
  { choices: ["sit", "seat"], correct: "sit" },
  { choices: ["heart", "hurt"], correct: "heart" },
  { choices: ["fan", "van"], correct: "fan" },
  { choices: ["tin", "thin"], correct: "thin" },
  { choices: ["pen", "pin"], correct: "pen" }
];

// 10. Picture Puzzle sentences to solve all 9 jigsaw sections
export const picturePuzzleListData: JigsawSentence[] = [
  { sentence: "The delicious milk is ___ the crystal glass.", options: ["in", "on", "at", "by", "under", "into"], ans: "in" },
  { sentence: "The happy father sits comfortable ___ the dining table.", options: ["at", "in", "with", "into", "on", "from"], ans: "at" },
  { sentence: "The mother served hot soup ___ dinner time.", options: ["at", "on", "into", "by", "under", "with"], ans: "at" },
  { sentence: "A clean napkin goes ___ the silver fork.", options: ["beside", "in", "into", "above", "through", "on"], ans: "beside" },
  { sentence: "A beautiful vase is sitting ___ the middle of the table.", options: ["in", "on", "at", "by", "into", "under"], ans: "in" },
  { sentence: "The plate was placed carefully ___ the wooden table.", options: ["on", "into", "at", "by", "under", "in"], ans: "on" },
  { sentence: "We put all dirty bowls ___ the kitchen sink afterwards.", options: ["in", "on", "at", "above", "with", "by"], ans: "in" },
  { sentence: "The family gathered ___ the table to thank God.", options: ["around", "into", "under", "over", "at", "on"], ans: "around" },
  { sentence: "The spoon is sitting ___ the soup bowl.", options: ["next to", "inside", "on", "into", "at", "with"], ans: "next to" }
];

// 11. Kingdom of Etiquette Castle Rooms & their scenarios
export const kingdomOfEtiquetteRoomsData: EtiquetteRoomChallenge[] = [
  {
    roomNameAr: "بهو الاستقبال 🛋️",
    roomNameEn: "Reception Hall 🛋️",
    challengeAr: "عند دخولك منزل أقاربك لزيارتهم، التصرف اللائق الأول هو:",
    challengeEn: "When entering your relative's home for a visit, the first polite behavior is:",
    options: ["إلقاء السلام والتحية بابتسامة", "الدخول والجري للغرفة مباشرة", "البدء باللعب بالهاتف والجلوس صامتاً"],
    correctIdx: 0
  },
  {
    roomNameAr: "صالة الطعام الكبرى 🍽️",
    roomNameEn: "Grand Dining Room 🍽️",
    challengeAr: "قبل بدء مضغ الطعام والشراب، ماذا يجب أن تقول لمن معك؟",
    challengeEn: "Before chewing food and pouring beverages, what should you say?",
    options: ["أريد الأكل حالاً دون كلام", "قول 'بسم الله' وتمني وجبة شهية لهم", "إبداء التذمر من شكل الصحن"],
    correctIdx: 1
  },
  {
    roomNameAr: "مجلس الحوار المهذب 💬",
    roomNameEn: "Dialogue Chamber 💬",
    challengeAr: "إذا اختلف معك زميل في الرأي أثناء نقاش، ما هو السلوك الراقي السليم؟",
    challengeEn: "If a peer disagrees with your opinion during a talk, what is correct?",
    options: ["الاستماع له بأدب ثم النقاش بهدوء", "الصراخ عالياً ومقاطعته مباشرة", "السخرية والضحك منه متهكماً"],
    correctIdx: 0
  },
  {
    roomNameAr: "المكتبة الملكية 📚",
    roomNameEn: "Royal Library 📚",
    challengeAr: "تريد استعارة كتاب قيم من زميلك لقراءته. كيف تطلب؟",
    challengeEn: "You wish to borrow an expensive book from your friend. How do you query?",
    options: ["سحب الكتاب من يده عنوة", "هل تسمح لي باستعارة هذا الكتاب من فضلك؟", "سآخذه وأعيده غداً دون علمه"],
    correctIdx: 1
  },
  {
    roomNameAr: "عرش الكرم والضيافة 👑",
    roomNameEn: "Throne Room of Hospitality 👑",
    challengeAr: "جاءك رفيقك زائراً في بيتك. ما هي أصول الكرم الأولى؟",
    challengeEn: "A guest arrives at your house. What is the fundamental manner of hosting?",
    options: ["الترحيب به وبشاشة الوجه وتقديم الضيافة له", "تركه بالصالة وحده والذهاب لغرفتك", "إخباره بوجوب الرحيل مبكراً"],
    correctIdx: 0
  }
];

// 13. Word Market broken words
export const wordMarketRustyWordsData: SecondHandWord[] = [
  {
    display: "happy",
    options: [
      { text: "un- + happy", adds: "un-", res: "unhappy", isCorrect: true },
      { text: "happy + -less", adds: "-less", res: "happyless", isCorrect: false }
    ],
    basePrice: 30
  },
  {
    display: "care",
    options: [
      { text: "care + -less", adds: "-less", res: "careless", isCorrect: true },
      { text: "care + -s", adds: "-s", res: "cares", isCorrect: false }
    ],
    basePrice: 40
  },
  {
    display: "use",
    options: [
      { text: "use + -ful", adds: "-ful", res: "useful", isCorrect: true },
      { text: "re- + use", adds: "re-", res: "reuse", isCorrect: true }
    ],
    basePrice: 35
  },
  {
    display: "write",
    options: [
      { text: "re- + write", adds: "re-", res: "rewrite", isCorrect: true },
      { text: "write + -less", adds: "-less", res: "writeless", isCorrect: false }
    ],
    basePrice: 45
  },
  {
    display: "help",
    options: [
      { text: "help + -less", adds: "-less", res: "helpless", isCorrect: true },
      { text: "help + -ful", adds: "-ful", res: "helpful", isCorrect: true }
    ],
    basePrice: 30
  },
  {
    display: "kind",
    options: [
      { text: "kind + -ness", adds: "-ness", res: "kindness", isCorrect: true },
      { text: "un- + kind", adds: "un-", res: "unkind", isCorrect: true }
    ],
    basePrice: 50
  },
  {
    display: "agree",
    options: [
      { text: "dis- + agree", adds: "dis-", res: "disagree", isCorrect: true },
      { text: "re- + agree", adds: "re-", res: "reagree", isCorrect: false }
    ],
    basePrice: 35
  }
];

// 14. Politeness Ciphers list
export const politenessCiphersListData: CaesarCipherPuzzle[] = [
  {
    cipher: "Khoor, krz duh brx?",
    keyShift: -3,
    hintAr: "تحية ترحيب كلاسيكية ومعناها 'مرحباً، كيف حالك؟'",
    hintEn: "Standard polite greeting deciphers to 'Hello, how are you?'",
    ans: "hello, how are you?"
  },
  {
    cipher: "Sohdvh vshdn nlndob",
    keyShift: -3,
    hintAr: "أمر مهذب للحديث بلطف ومعناه 'من فضلك تحدث بلطف'",
    hintEn: "Courteous request deciphers to 'Please speak kindly'",
    ans: "please speak kindly"
  },
  {
    cipher: "Wkdqn brx vr pxek",
    keyShift: -3,
    hintAr: "أسمى عبارات الشكر ومعناها 'شكراً لك جزيلاً'",
    hintEn: "Deep gratitude deciphers to 'Thank you so much'",
    ans: "thank you so much"
  },
  {
    cipher: "Hashvh ph",
    keyShift: -3,
    hintAr: "طلب الاستئذان اللطيف ومعناه 'اعذرني'",
    hintEn: "Polite pardon deciphers to 'Excuse me'",
    ans: "excuse me"
  }
];

// 16. Communication Bridge items
export const communicationBridgePromptsData: BridgePrompt[] = [
  { sentence: "If I were you, I ___ join study rooms now.", options: ["would", "will", "going", "must"], ans: "would" },
  { sentence: "If she practices daily, her English ___ improve.", options: ["will", "would", "has", "did"], ans: "will" },
  { sentence: "If we had run faster, we ___ have won the race.", options: ["would", "will", "do", "are"], ans: "would" },
  { sentence: "Unless you speak politely, people ___ not listen.", options: ["will", "would", "shall", "does"], ans: "will" },
  { sentence: "He would assist you if you ___ him politely.", options: ["asked", "ask", "asking", "asks"], ans: "asked" },
  { sentence: "If I ___ the answer, I would declare it happily.", options: ["knew", "know", "knowing", "has known"], ans: "knew" }
];

// 17. Garden of Emotions withered flowers
export const gardenOfEmotionsFlowersData: EmotionFlower[] = [
  {
    emoji: "🥀",
    nameAr: "زهرة الحزن",
    nameEn: "Sorrow Flower",
    descAr: "تشعر بقلة التقدير وتحتاج لكلمات دافئة ترفع المعنويات.",
    descEn: "Feels unappreciated and asks for soft warm words to elevate spirits.",
    options: [
      { txt: "Everything will be okay. You are highly valued!", points: 20 },
      { txt: "Just ignore the sadness.", points: 0 },
      { txt: "I am always here for you to talk to.", points: 25 },
      { txt: "Why are you always complaining?", points: 0 }
    ]
  },
  {
    emoji: "💢",
    nameAr: "زهرة الغضب",
    nameEn: "Anger Flower",
    descAr: "أوراقها تحمر بوهج الغضب العنيف وتحتاج لكلمات تهدئ روعها.",
    descEn: "Its leaves glow with fierce heat of anger. Choose a phrase that calms it down:",
    options: [
      { txt: "Stop being so angry!", points: 0 },
      { txt: "I understand you are frustrated, let's calm down together.", points: 25 },
      { txt: "I am ready to listen whenever you want to share.", points: 20 },
      { txt: "You are being too dramatic.", points: 0 }
    ]
  },
  {
    emoji: "😰",
    nameAr: "زهرة القلق الخائف",
    nameEn: "Anxiety Flower",
    descAr: "ترتعد خوفاً من الامتحانات والتحديات الدراسية الصعبة.",
    descEn: "Pales with fear of learning tests and evaluations. Comfort her:",
    options: [
      { txt: "Don't worry, you've trained hard and we trust in your capability!", points: 25 },
      { txt: "If you fail, it will be bad.", points: 0 },
      { txt: "Take a deep breath. Mistakes help us learn and grow.", points: 20 },
      { txt: "Tests are very dangerous.", points: 0 }
    ]
  },
  {
    emoji: "😴",
    nameAr: "زهرة التعب والكسل",
    nameEn: "Exhaustion Flower",
    descAr: "ذابلة ومجهدة بسبب قلة النوم والتعب الدراسي من المذاكرة الطويلة.",
    descEn: "Drooping because of long study hours. Best supportive words of encouragement:",
    options: [
      { txt: "You should work harder!", points: 0 },
      { txt: "Rest well, clear your mind, and you will shine brighter tomorrow!", points: 25 },
      { txt: "Your health is paramount. Take a refreshing walk first.", points: 20 },
      { txt: "Sleep is for the weak.", points: 0 }
    ]
  }
];

// 18. Phrase Chef recipes
export const phraseChefRecipesData: PhraseChefRecipe[] = [
  {
    titleAr: "وصفة الزمن المضارع البسيط",
    titleEn: "Simple Present Recipe",
    subjectsCount: 3,
    verbsCount: 3,
    objectsCount: 3,
    subjects: ["The cat", "Samantha", "They"],
    verbs: ["drinks", "reads", "play"],
    objects: ["milk", "books", "soccer"],
    correctCombo: ["The cat", "drinks", "milk"]
  },
  {
    titleAr: "وصفة الزمن الماضي المهذب",
    titleEn: "Polite Past Tense Recipe",
    subjectsCount: 3,
    verbsCount: 3,
    objectsCount: 3,
    subjects: ["He", "She", "The student"],
    verbs: ["spoke", "thanked", "greeted"],
    objects: ["politely", "the teacher", "the guest warmly"],
    correctCombo: ["She", "thanked", "the teacher"]
  },
  {
    titleAr: "وصفة طلب المساعدة المؤدب",
    titleEn: "Polite Request Recipe",
    subjectsCount: 3,
    verbsCount: 3,
    objectsCount: 3,
    subjects: ["Could you", "May I", "Would you mind"],
    verbs: ["please pass", "borrow", "lending me"],
    objects: ["the salt?", "a pen?", "your book?"],
    correctCombo: ["Could you", "please pass", "the salt?"]
  }
];

// 19. Dark Cave spelling pool
export const darkCaveSpellingPoolData: string[] = [
  "beautiful", "independent", "scenery", "microscope", "definitely",
  "patience", "environment", "courteous", "grateful", "hospitality"
];

// 20. Cultural Festival country locations
export const culturalFestivalLocationsData: CulturalCountry[] = [
  {
    nameAr: "اليابان 🇯🇵",
    nameEn: "Japan 🇯🇵",
    scenarioAr: "دخلت قاعة معلمين يابانيين لأول مرة لتقديم التحية المهذبة المتبعة هناك:",
    scenarioEn: "You enter a Japanese school hall. Choose the proper respectful greeting custom:",
    options: [
      { txt: "Bow slightly from the waist and say 'Konnichiwa'", correct: true },
      { txt: "Raise hand and wave rapidly.", correct: false },
      { txt: "Hug their lead supervisor tightly.", correct: false }
    ]
  },
  {
    nameAr: "فرنسا 🇫🇷",
    nameEn: "France 🇫🇷",
    scenarioAr: "على المائدة الفرنسية الراقية، عندما ترغب في بدء الطعام بأدب تقول:",
    scenarioEn: "At an elegant French dining table, what do you say before starting the feast?",
    options: [
      { txt: "Say 'Bon appétit' with a warm smile", correct: true },
      { txt: "Start chewing before others sit down.", correct: false },
      { txt: "Blow on hot food loudly.", correct: false }
    ]
  },
  {
    nameAr: "المملكة العربية السعودية 🇸🇦",
    nameEn: "Saudi Arabia 🇸🇦",
    scenarioAr: "أثناء ضيافة وفد زائر لبيتك في الثقافة العربية الأصيلة، من أسمى آداب الكرم تقديم:",
    scenarioEn: "Hosting guests in Saudi hospitality customs. What is the fundamental polite welcome offer?",
    options: [
      { txt: "Dates and hot local Arabic Coffee (Qahwa)", correct: true },
      { txt: "A cup of cold tap water only.", correct: false },
      { txt: "Asking them directly to get their own food.", correct: false }
    ]
  },
  {
    nameAr: "إيطاليا 🇮🇹",
    nameEn: "Italy 🇮🇹",
    scenarioAr: "عند مقابلة صديق إيطالي مقرب في روما للترحيب به بود غير رسمي:",
    scenarioEn: "Greeting a close friend in public streets of Rome. Common warm informal welcome is:",
    options: [
      { txt: "Say 'Ciao!' cheerfully", correct: true },
      { txt: "Nod coldly and walk away.", correct: false },
      { txt: "Fist bump aggressively.", correct: false }
    ]
  },
  {
    nameAr: "الهند 🇮🇳",
    nameEn: "India 🇮🇳",
    scenarioAr: "كيف ترحب بوقار واحترام بمسؤول أو والد صديقك في الهند؟",
    scenarioEn: "Expressing deep greeting respect to parents or senior officials in India:",
    options: [
      { txt: "Press hands together in front of the chest and say 'Namaste'", correct: true },
      { txt: "Give a high-five.", correct: false },
      { txt: "Whistle to catch attention.", correct: false }
    ]
  },
  {
    nameAr: "المملكة المتحدة 🇬🇧",
    nameEn: "United Kingdom 🇬🇧",
    scenarioAr: "عند شرب الشاي الإنجليزي التقليدي مع الأصدقاء، السلوك الودود اللبق هو:",
    scenarioEn: "Enjoying traditional English afternoon tea with peers. Gentle table manner includes:",
    options: [
      { txt: "Stir cup gently without clinking the spoon against metal, say 'Thank you'", correct: true },
      { txt: "Slurp tea very loudly directly from the pot.", correct: false },
      { txt: "Splash tea drops casually on the tablecloth.", correct: false }
    ]
  }
];
