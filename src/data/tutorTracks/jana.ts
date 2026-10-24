/** Practice and Review with Jana: 120 «من الصفر» lessons (4 levels × 30; lessons 1-30 = level 1, ids/orders unchanged), card board per lesson. Generated from /workspace/kidsgen (literal spoken lines: trigram allow-list → voice works without a token). */
import type { TutorLesson } from './nouraL1';

export const JANA_LESSONS: TutorLesson[] = [
 {
  "id": "jana-01",
  "order": 1,
  "levelId": "l1",
  "titleAr": "a أو an",
  "titleEn": "a or an",
  "content": {
   "explanationAr": "نستخدم a قبل الكلمة اللي تبدأ بصوت ساكن مثل a cat، و an قبل الصوت المتحرك مثل an apple.",
   "altExplanationAr": "الحروف المتحركة a e i o u. قل الكلمة وشوف أول صوت فيها.",
   "example": [
    {
     "en": "I have an apple.",
     "ar": "عندي تفاحة."
    },
    {
     "en": "This is a cat.",
     "ar": "هذي قطة."
    },
    {
     "en": "She has an egg.",
     "ar": "عندها بيضة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I have ___ apple.",
    "options": [
     "a",
     "an",
     "the"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "This is ___ cat.",
     "options": [
      "an",
      "two",
      "a"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "She has an egg.",
     "options": [
      "عندها بيضة.",
      "أبي برتقالة.",
      "عنده سيارة."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I want ___ orange.",
     "options": [
      "a",
      "an",
      "two"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "a or an"
   },
   {
    "kind": "highlight",
    "text": "a or an"
   },
   {
    "kind": "example",
    "en": "I have an apple.",
    "ar": "عندي تفاحة."
   },
   {
    "kind": "example",
    "en": "This is a cat.",
    "ar": "هذي قطة."
   }
  ],
  "kids": {
   "listTitle": "a or an",
   "cards": [
    {
     "emoji": "🍎",
     "en": "I have an apple.",
     "ar": "عندي تفاحة.",
     "hl": "an"
    },
    {
     "emoji": "🐱",
     "en": "This is a cat.",
     "ar": "هذي قطة.",
     "hl": "a"
    },
    {
     "emoji": "🥚",
     "en": "She has an egg.",
     "ar": "عندها بيضة.",
     "hl": "an"
    },
    {
     "emoji": "🍊",
     "en": "I want an orange.",
     "ar": "أبي برتقالة.",
     "hl": "an"
    },
    {
     "emoji": "🚗",
     "en": "He has a car.",
     "ar": "عنده سيارة.",
     "hl": "a"
    },
    {
     "emoji": "🐘",
     "en": "There is an elephant.",
     "ar": "فيه فيل.",
     "hl": "an"
    }
   ],
   "say": "a or an I have an apple. This is a cat. She has an egg. I want an orange. He has a car. There is an elephant."
  }
 },
 {
  "id": "jana-02",
  "order": 2,
  "levelId": "l1",
  "titleAr": "المفرد والجمع",
  "titleEn": "One and many",
  "content": {
   "explanationAr": "للجمع نضيف s غالبًا: one book و two books. وبعض الكلمات تتغير: one child و two children.",
   "altExplanationAr": "الكلمات اللي آخرها s أو sh أو ch نضيف لها es: one box و two boxes.",
   "example": [
    {
     "en": "I have two books.",
     "ar": "عندي كتابين."
    },
    {
     "en": "There are three boxes.",
     "ar": "فيه ثلاث صناديق."
    },
    {
     "en": "There are five children.",
     "ar": "فيه خمس أطفال."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I have two ___.",
    "options": [
     "book",
     "bookes",
     "books"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "There are three ___.",
     "options": [
      "boxes",
      "box",
      "boxs"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "There are five children.",
     "options": [
      "آكل تفاحتين.",
      "فيه خمس أطفال.",
      "رجولي بردانة."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I eat two ___.",
     "options": [
      "apple",
      "appless",
      "apples"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "One and many"
   },
   {
    "kind": "highlight",
    "text": "One and Many"
   },
   {
    "kind": "example",
    "en": "I have two books.",
    "ar": "عندي كتابين."
   },
   {
    "kind": "example",
    "en": "There are three boxes.",
    "ar": "فيه ثلاث صناديق."
   }
  ],
  "kids": {
   "listTitle": "One and Many",
   "cards": [
    {
     "emoji": "📚",
     "en": "I have two books.",
     "ar": "عندي كتابين.",
     "hl": "books"
    },
    {
     "emoji": "📦",
     "en": "There are three boxes.",
     "ar": "فيه ثلاث صناديق.",
     "hl": "boxes"
    },
    {
     "emoji": "🧒",
     "en": "There are five children.",
     "ar": "فيه خمس أطفال.",
     "hl": "children"
    },
    {
     "emoji": "🍎",
     "en": "I eat two apples.",
     "ar": "آكل تفاحتين.",
     "hl": "apples"
    },
    {
     "emoji": "🦶",
     "en": "My feet are cold.",
     "ar": "رجولي بردانة.",
     "hl": "feet"
    },
    {
     "emoji": "🐑",
     "en": "I see four sheep.",
     "ar": "أشوف أربع خرفان.",
     "hl": "sheep"
    }
   ],
   "say": "One and Many I have two books. There are three boxes. There are five children. I eat two apples. My feet are cold. I see four sheep."
  }
 },
 {
  "id": "jana-03",
  "order": 3,
  "levelId": "l1",
  "titleAr": "الصورة والكلمة",
  "titleEn": "Picture and word",
  "content": {
   "explanationAr": "شوف الصورة واختر الكلمة الصح. هذا التمرين يراجع كلمات ريم.",
   "altExplanationAr": "لو ما تذكر الكلمة، قل أول صوت في اسم الشي وفكّر.",
   "example": [
    {
     "en": "This is a camel.",
     "ar": "هذا جمل."
    },
    {
     "en": "That is a mosque.",
     "ar": "ذاك مسجد."
    },
    {
     "en": "I like bananas.",
     "ar": "أحب الموز."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "This is a ___.",
    "options": [
     "camel",
     "cow",
     "cat"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "That is a ___.",
     "options": [
      "school",
      "mosque",
      "bank"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I like bananas.",
     "options": [
      "عندي دراجة.",
      "أشوف القمر.",
      "أحب الموز."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I have a ___.",
     "options": [
      "bike",
      "bus",
      "boat"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Picture and word"
   },
   {
    "kind": "highlight",
    "text": "Match the Picture"
   },
   {
    "kind": "example",
    "en": "This is a camel.",
    "ar": "هذا جمل."
   },
   {
    "kind": "example",
    "en": "That is a mosque.",
    "ar": "ذاك مسجد."
   }
  ],
  "kids": {
   "listTitle": "Match the Picture",
   "cards": [
    {
     "emoji": "🐪",
     "en": "This is a camel.",
     "ar": "هذا جمل.",
     "hl": "camel"
    },
    {
     "emoji": "🕌",
     "en": "That is a mosque.",
     "ar": "ذاك مسجد.",
     "hl": "mosque"
    },
    {
     "emoji": "🍌",
     "en": "I like bananas.",
     "ar": "أحب الموز.",
     "hl": "bananas"
    },
    {
     "emoji": "🚲",
     "en": "I have a bike.",
     "ar": "عندي دراجة.",
     "hl": "bike"
    },
    {
     "emoji": "🌙",
     "en": "I see the moon.",
     "ar": "أشوف القمر.",
     "hl": "moon"
    },
    {
     "emoji": "🦅",
     "en": "The falcon is fast.",
     "ar": "الصقر سريع.",
     "hl": "falcon"
    }
   ],
   "say": "Match the Picture This is a camel. That is a mosque. I like bananas. I have a bike. I see the moon. The falcon is fast."
  }
 },
 {
  "id": "jana-04",
  "order": 4,
  "levelId": "l1",
  "titleAr": "am و is و are",
  "titleEn": "am, is or are",
  "content": {
   "explanationAr": "I معها am، و He و She و It معها is، و You و We و They معها are.",
   "altExplanationAr": "احفظها: I am، he is، they are.",
   "example": [
    {
     "en": "I am Jana.",
     "ar": "أنا جنى."
    },
    {
     "en": "He is my friend.",
     "ar": "هو صاحبي."
    },
    {
     "en": "We are students.",
     "ar": "احنا طلاب."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ Jana.",
    "options": [
     "is",
     "am",
     "are"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He ___ my friend.",
     "options": [
      "am",
      "are",
      "is"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "We are students.",
     "options": [
      "احنا طلاب.",
      "هذي قطة صغيرة.",
      "هم في المدرسة."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "It ___ a small cat.",
     "options": [
      "are",
      "is",
      "am"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "am, is or are"
   },
   {
    "kind": "highlight",
    "text": "am, is, are"
   },
   {
    "kind": "example",
    "en": "I am Jana.",
    "ar": "أنا جنى."
   },
   {
    "kind": "example",
    "en": "He is my friend.",
    "ar": "هو صاحبي."
   }
  ],
  "kids": {
   "listTitle": "am, is, are",
   "cards": [
    {
     "emoji": "🧕",
     "en": "I am Jana.",
     "ar": "أنا جنى.",
     "hl": "am"
    },
    {
     "emoji": "👦",
     "en": "He is my friend.",
     "ar": "هو صاحبي.",
     "hl": "is"
    },
    {
     "emoji": "👫",
     "en": "We are students.",
     "ar": "احنا طلاب.",
     "hl": "are"
    },
    {
     "emoji": "🐱",
     "en": "It is a small cat.",
     "ar": "هذي قطة صغيرة.",
     "hl": "is"
    },
    {
     "emoji": "🏫",
     "en": "They are at school.",
     "ar": "هم في المدرسة.",
     "hl": "are"
    },
    {
     "emoji": "🙂",
     "en": "You are kind.",
     "ar": "انت طيب.",
     "hl": "are"
    }
   ],
   "say": "am, is, are I am Jana. He is my friend. We are students. It is a small cat. They are at school. You are kind."
  }
 },
 {
  "id": "jana-05",
  "order": 5,
  "levelId": "l1",
  "titleAr": "my و your و his و her",
  "titleEn": "my, your, his, her",
  "content": {
   "explanationAr": "my يعني حقي، your حقك، his حقه، her حقها.",
   "altExplanationAr": "his للولد و her للبنت: Ali and his car، Sara and her bag.",
   "example": [
    {
     "en": "This is my book.",
     "ar": "هذا كتابي."
    },
    {
     "en": "Is this your bag?",
     "ar": "هذي شنطتك؟"
    },
    {
     "en": "Ali loves his car.",
     "ar": "علي يحب سيارته."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "This is ___ book.",
    "options": [
     "me",
     "I",
     "my"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Is this ___ bag?",
     "options": [
      "your",
      "you",
      "you are"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Ali loves his car.",
     "options": [
      "سارة معها جوالها.",
      "علي يحب سيارته.",
      "نحب بيتنا."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Sara has ___ phone.",
     "options": [
      "his",
      "she",
      "her"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "my, your, his, her"
   },
   {
    "kind": "highlight",
    "text": "my, your, his, her"
   },
   {
    "kind": "example",
    "en": "This is my book.",
    "ar": "هذا كتابي."
   },
   {
    "kind": "example",
    "en": "Is this your bag?",
    "ar": "هذي شنطتك؟"
   }
  ],
  "kids": {
   "listTitle": "my, your, his, her",
   "cards": [
    {
     "emoji": "📖",
     "en": "This is my book.",
     "ar": "هذا كتابي.",
     "hl": "my"
    },
    {
     "emoji": "🎒",
     "en": "Is this your bag?",
     "ar": "هذي شنطتك؟",
     "hl": "your"
    },
    {
     "emoji": "👦",
     "en": "Ali loves his car.",
     "ar": "علي يحب سيارته.",
     "hl": "his"
    },
    {
     "emoji": "🧕",
     "en": "Sara has her phone.",
     "ar": "سارة معها جوالها.",
     "hl": "her"
    },
    {
     "emoji": "🏠",
     "en": "We love our house.",
     "ar": "نحب بيتنا.",
     "hl": "our"
    },
    {
     "emoji": "🐱",
     "en": "They feed their cat.",
     "ar": "يأكّلون قطتهم.",
     "hl": "their"
    }
   ],
   "say": "my, your, his, her This is my book. Is this your bag? Ali loves his car. Sara has her phone. We love our house. They feed their cat."
  }
 },
 {
  "id": "jana-06",
  "order": 6,
  "levelId": "l1",
  "titleAr": "in و on و under",
  "titleEn": "in, on, under",
  "content": {
   "explanationAr": "in يعني داخل، on يعني فوق الشي، under يعني تحت.",
   "altExplanationAr": "تخيل صندوق: الكرة in the box داخل، on the box فوق، under the box تحت.",
   "example": [
    {
     "en": "The ball is in the box.",
     "ar": "الكرة داخل الصندوق."
    },
    {
     "en": "The book is on the desk.",
     "ar": "الكتاب على الطاولة."
    },
    {
     "en": "The cat is under the table.",
     "ar": "القطة تحت الطاولة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "The ball is ___ the box.",
    "options": [
     "in",
     "on",
     "under"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The book is ___ the desk.",
     "options": [
      "in",
      "on",
      "under"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "The cat is under the table.",
     "options": [
      "الحليب في الثلاجة.",
      "الصورة على الجدار.",
      "القطة تحت الطاولة."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The milk is ___ the fridge.",
     "options": [
      "in",
      "on",
      "under"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "in, on, under"
   },
   {
    "kind": "highlight",
    "text": "Where Is It?"
   },
   {
    "kind": "example",
    "en": "The ball is in the box.",
    "ar": "الكرة داخل الصندوق."
   },
   {
    "kind": "example",
    "en": "The book is on the desk.",
    "ar": "الكتاب على الطاولة."
   }
  ],
  "kids": {
   "listTitle": "Where Is It?",
   "cards": [
    {
     "emoji": "📦",
     "en": "The ball is in the box.",
     "ar": "الكرة داخل الصندوق.",
     "hl": "in"
    },
    {
     "emoji": "📖",
     "en": "The book is on the desk.",
     "ar": "الكتاب على الطاولة.",
     "hl": "on"
    },
    {
     "emoji": "🐱",
     "en": "The cat is under the table.",
     "ar": "القطة تحت الطاولة.",
     "hl": "under"
    },
    {
     "emoji": "🥛",
     "en": "The milk is in the fridge.",
     "ar": "الحليب في الثلاجة.",
     "hl": "in"
    },
    {
     "emoji": "🖼️",
     "en": "The picture is on the wall.",
     "ar": "الصورة على الجدار.",
     "hl": "on"
    },
    {
     "emoji": "👟",
     "en": "My shoes are under the bed.",
     "ar": "حذائي تحت السرير.",
     "hl": "under"
    }
   ],
   "say": "Where Is It? The ball is in the box. The book is on the desk. The cat is under the table. The milk is in the fridge. The picture is on the wall. My shoes are under the bed."
  }
 },
 {
  "id": "jana-07",
  "order": 7,
  "levelId": "l1",
  "titleAr": "at و in و on للوقت",
  "titleEn": "at, in, on for time",
  "content": {
   "explanationAr": "at مع الساعة: at five. on مع الأيام: on Friday. in مع الشهور والسنين وأوقات اليوم: in the morning.",
   "altExplanationAr": "استثناء: نقول at night مو in night.",
   "example": [
    {
     "en": "The class is at five.",
     "ar": "الحصة الساعة خمس."
    },
    {
     "en": "We pray on Friday.",
     "ar": "نصلي يوم الجمعة."
    },
    {
     "en": "I study in the morning.",
     "ar": "أذاكر الصبح."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "The class is ___ five.",
    "options": [
     "on",
     "at",
     "in"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We pray ___ Friday.",
     "options": [
      "at",
      "in",
      "on"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I study in the morning.",
     "options": [
      "أذاكر الصبح.",
      "الجو بارد في يناير.",
      "أنام بالليل."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "It is cold ___ January.",
     "options": [
      "on",
      "in",
      "at"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "at, in, on for time"
   },
   {
    "kind": "highlight",
    "text": "Time: at, in, on"
   },
   {
    "kind": "example",
    "en": "The class is at five.",
    "ar": "الحصة الساعة خمس."
   },
   {
    "kind": "example",
    "en": "We pray on Friday.",
    "ar": "نصلي يوم الجمعة."
   }
  ],
  "kids": {
   "listTitle": "Time: at, in, on",
   "cards": [
    {
     "emoji": "🕔",
     "en": "The class is at five.",
     "ar": "الحصة الساعة خمس.",
     "hl": "at"
    },
    {
     "emoji": "🕌",
     "en": "We pray on Friday.",
     "ar": "نصلي يوم الجمعة.",
     "hl": "on"
    },
    {
     "emoji": "🌅",
     "en": "I study in the morning.",
     "ar": "أذاكر الصبح.",
     "hl": "in"
    },
    {
     "emoji": "❄️",
     "en": "It is cold in January.",
     "ar": "الجو بارد في يناير.",
     "hl": "in"
    },
    {
     "emoji": "🌃",
     "en": "I sleep at night.",
     "ar": "أنام بالليل.",
     "hl": "at"
    },
    {
     "emoji": "📅",
     "en": "My birthday is on Monday.",
     "ar": "عيد ميلادي يوم الاثنين.",
     "hl": "on"
    }
   ],
   "say": "Time: at, in, on The class is at five. We pray on Friday. I study in the morning. It is cold in January. I sleep at night. My birthday is on Monday."
  }
 },
 {
  "id": "jana-08",
  "order": 8,
  "levelId": "l1",
  "titleAr": "to و for و at مع الأفعال",
  "titleEn": "to, for, at with verbs",
  "content": {
   "explanationAr": "بعض الأفعال لها كلمة ثابتة بعدها: wait for يعني انتظر، listen to يعني اسمع، look at يعني شوف.",
   "altExplanationAr": "احفظهم مع بعض كقطعة وحدة: Wait for me. Listen to me. Look at me.",
   "example": [
    {
     "en": "Wait for me.",
     "ar": "انتظرني."
    },
    {
     "en": "Listen to the teacher.",
     "ar": "اسمع المعلم."
    },
    {
     "en": "Look at the board.",
     "ar": "شوف السبورة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Wait ___ me.",
    "options": [
     "to",
     "at",
     "for"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Listen ___ the teacher.",
     "options": [
      "to",
      "for",
      "at"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Look at the board.",
     "options": [
      "أروح المدرسة.",
      "شوف السبورة.",
      "شكرًا على الهدية."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I go ___ school.",
     "options": [
      "at",
      "for",
      "to"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "to, for, at with verbs"
   },
   {
    "kind": "highlight",
    "text": "Wait for me"
   },
   {
    "kind": "example",
    "en": "Wait for me.",
    "ar": "انتظرني."
   },
   {
    "kind": "example",
    "en": "Listen to the teacher.",
    "ar": "اسمع المعلم."
   }
  ],
  "kids": {
   "listTitle": "Wait for me",
   "cards": [
    {
     "emoji": "⏳",
     "en": "Wait for me.",
     "ar": "انتظرني.",
     "hl": "for"
    },
    {
     "emoji": "👂",
     "en": "Listen to the teacher.",
     "ar": "اسمع المعلم.",
     "hl": "to"
    },
    {
     "emoji": "👀",
     "en": "Look at the board.",
     "ar": "شوف السبورة.",
     "hl": "at"
    },
    {
     "emoji": "🏫",
     "en": "I go to school.",
     "ar": "أروح المدرسة.",
     "hl": "to"
    },
    {
     "emoji": "📞",
     "en": "Thank you for the gift.",
     "ar": "شكرًا على الهدية.",
     "hl": "for"
    },
    {
     "emoji": "🙋",
     "en": "Ask for help.",
     "ar": "اطلب مساعدة.",
     "hl": "for"
    }
   ],
   "say": "Wait for me Wait for me. Listen to the teacher. Look at the board. I go to school. Thank you for the gift. Ask for help."
  }
 },
 {
  "id": "jana-09",
  "order": 9,
  "levelId": "l1",
  "titleAr": "have و has",
  "titleEn": "have or has",
  "content": {
   "explanationAr": "I و You و We و They معهم have، و He و She و It معهم has.",
   "altExplanationAr": "لو الكلمة ولد أو بنت أو شي واحد استخدم has: My sister has a cat.",
   "example": [
    {
     "en": "My sister has a cat.",
     "ar": "أختي عندها قطة."
    },
    {
     "en": "I have a car.",
     "ar": "عندي سيارة."
    },
    {
     "en": "They have two sons.",
     "ar": "عندهم ولدين."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "My sister ___ a cat.",
    "options": [
     "has",
     "have",
     "is"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I ___ a car.",
     "options": [
      "has",
      "have",
      "am"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "They have two sons.",
     "options": [
      "عندها شنطة جديدة.",
      "عندنا حديقة كبيرة.",
      "عندهم ولدين."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She ___ a new bag.",
     "options": [
      "has",
      "have",
      "is"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "have or has"
   },
   {
    "kind": "highlight",
    "text": "have, has"
   },
   {
    "kind": "example",
    "en": "My sister has a cat.",
    "ar": "أختي عندها قطة."
   },
   {
    "kind": "example",
    "en": "I have a car.",
    "ar": "عندي سيارة."
   }
  ],
  "kids": {
   "listTitle": "have, has",
   "cards": [
    {
     "emoji": "🐱",
     "en": "My sister has a cat.",
     "ar": "أختي عندها قطة.",
     "hl": "has"
    },
    {
     "emoji": "🚗",
     "en": "I have a car.",
     "ar": "عندي سيارة.",
     "hl": "have"
    },
    {
     "emoji": "👫",
     "en": "They have two sons.",
     "ar": "عندهم ولدين.",
     "hl": "have"
    },
    {
     "emoji": "🧕",
     "en": "She has a new bag.",
     "ar": "عندها شنطة جديدة.",
     "hl": "has"
    },
    {
     "emoji": "🏠",
     "en": "We have a big garden.",
     "ar": "عندنا حديقة كبيرة.",
     "hl": "have"
    },
    {
     "emoji": "🐶",
     "en": "The dog has a ball.",
     "ar": "الكلب عنده كرة.",
     "hl": "has"
    }
   ],
   "say": "have, has My sister has a cat. I have a car. They have two sons. She has a new bag. We have a big garden. The dog has a ball."
  }
 },
 {
  "id": "jana-10",
  "order": 10,
  "levelId": "l1",
  "titleAr": "مراجعة دروس لمى",
  "titleEn": "Lama's lessons review",
  "content": {
   "explanationAr": "نراجع كلمات لمى: اختر الكلمة اللي تكمل الجملة وانتبه لصوتها.",
   "altExplanationAr": "قل الكلمة بصوت عالي قبل ما تختار.",
   "example": [
    {
     "en": "I see a fish.",
     "ar": "أشوف سمكة."
    },
    {
     "en": "The ship is big.",
     "ar": "السفينة كبيرة."
    },
    {
     "en": "I like cheese.",
     "ar": "أحب الجبن."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I see a ___.",
    "options": [
     "dish",
     "fish",
     "wish"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The ___ is big.",
     "options": [
      "sheep",
      "shop",
      "ship"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I like cheese.",
     "options": [
      "أحب الجبن.",
      "عندي ثلاث أقلام.",
      "هذا الكيك زين."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I have ___ pens.",
     "options": [
      "tree",
      "three",
      "free"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Lama's lessons review"
   },
   {
    "kind": "highlight",
    "text": "Review: Lama's Sounds"
   },
   {
    "kind": "example",
    "en": "I see a fish.",
    "ar": "أشوف سمكة."
   },
   {
    "kind": "example",
    "en": "The ship is big.",
    "ar": "السفينة كبيرة."
   }
  ],
  "kids": {
   "listTitle": "Review: Lama's Sounds",
   "cards": [
    {
     "emoji": "🐟",
     "en": "I see a fish.",
     "ar": "أشوف سمكة.",
     "hl": "fish"
    },
    {
     "emoji": "🚢",
     "en": "The ship is big.",
     "ar": "السفينة كبيرة.",
     "hl": "ship"
    },
    {
     "emoji": "🧀",
     "en": "I like cheese.",
     "ar": "أحب الجبن.",
     "hl": "cheese"
    },
    {
     "emoji": "3️⃣",
     "en": "I have three pens.",
     "ar": "عندي ثلاث أقلام.",
     "hl": "three"
    },
    {
     "emoji": "🎂",
     "en": "This cake is good.",
     "ar": "هذا الكيك زين.",
     "hl": "cake"
    },
    {
     "emoji": "⭐",
     "en": "Look at the star.",
     "ar": "شوف النجمة.",
     "hl": "star"
    }
   ],
   "say": "Review: Lama's Sounds I see a fish. The ship is big. I like cheese. I have three pens. This cake is good. Look at the star."
  }
 },
 {
  "id": "jana-11",
  "order": 11,
  "levelId": "l1",
  "titleAr": "like و likes",
  "titleEn": "like or likes",
  "content": {
   "explanationAr": "I و You و We و They معهم like، و He و She معهم likes بـ s.",
   "altExplanationAr": "قاعدة الـ s: مع He و She و It الفعل ياخذ s في المضارع.",
   "example": [
    {
     "en": "She likes tea.",
     "ar": "تحب الشاي."
    },
    {
     "en": "I like football.",
     "ar": "أحب الكرة."
    },
    {
     "en": "He likes books.",
     "ar": "يحب الكتب."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "She ___ tea.",
    "options": [
     "like",
     "liking",
     "likes"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I ___ football.",
     "options": [
      "like",
      "likes",
      "liking"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "He likes books.",
     "options": [
      "نحب القطط.",
      "يحب الكتب.",
      "أخوي يحب الشوكولاتة."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We ___ cats.",
     "options": [
      "likes",
      "are like",
      "like"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "like or likes"
   },
   {
    "kind": "highlight",
    "text": "like, likes"
   },
   {
    "kind": "example",
    "en": "She likes tea.",
    "ar": "تحب الشاي."
   },
   {
    "kind": "example",
    "en": "I like football.",
    "ar": "أحب الكرة."
   }
  ],
  "kids": {
   "listTitle": "like, likes",
   "cards": [
    {
     "emoji": "🍵",
     "en": "She likes tea.",
     "ar": "تحب الشاي.",
     "hl": "likes"
    },
    {
     "emoji": "⚽",
     "en": "I like football.",
     "ar": "أحب الكرة.",
     "hl": "like"
    },
    {
     "emoji": "📖",
     "en": "He likes books.",
     "ar": "يحب الكتب.",
     "hl": "likes"
    },
    {
     "emoji": "🐱",
     "en": "We like cats.",
     "ar": "نحب القطط.",
     "hl": "like"
    },
    {
     "emoji": "🍫",
     "en": "My brother likes chocolate.",
     "ar": "أخوي يحب الشوكولاتة.",
     "hl": "likes"
    },
    {
     "emoji": "🍎",
     "en": "They like apples.",
     "ar": "يحبون التفاح.",
     "hl": "like"
    }
   ],
   "say": "like, likes She likes tea. I like football. He likes books. We like cats. My brother likes chocolate. They like apples."
  }
 },
 {
  "id": "jana-12",
  "order": 12,
  "levelId": "l1",
  "titleAr": "don't و doesn't",
  "titleEn": "don't or doesn't",
  "content": {
   "explanationAr": "للنفي نقول I don't، ومع He و She نقول doesn't، والفعل بعدها بدون s.",
   "altExplanationAr": "She doesn't like مو She doesn't likes.",
   "example": [
    {
     "en": "I don't like onions.",
     "ar": "ما أحب البصل."
    },
    {
     "en": "She doesn't drink coffee.",
     "ar": "ما تشرب قهوة."
    },
    {
     "en": "He doesn't have a car.",
     "ar": "ما عنده سيارة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ like onions.",
    "options": [
     "don't",
     "doesn't",
     "not"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She ___ drink coffee.",
     "options": [
      "don't",
      "doesn't",
      "isn't"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "He doesn't have a car.",
     "options": [
      "ما يسكنون هنا.",
      "ما نسبح في الشتاء.",
      "ما عنده سيارة."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "They ___ live here.",
     "options": [
      "don't",
      "doesn't",
      "aren't"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "don't or doesn't"
   },
   {
    "kind": "highlight",
    "text": "don't, doesn't"
   },
   {
    "kind": "example",
    "en": "I don't like onions.",
    "ar": "ما أحب البصل."
   },
   {
    "kind": "example",
    "en": "She doesn't drink coffee.",
    "ar": "ما تشرب قهوة."
   }
  ],
  "kids": {
   "listTitle": "don't, doesn't",
   "cards": [
    {
     "emoji": "🧅",
     "en": "I don't like onions.",
     "ar": "ما أحب البصل.",
     "hl": "don't"
    },
    {
     "emoji": "☕",
     "en": "She doesn't drink coffee.",
     "ar": "ما تشرب قهوة.",
     "hl": "doesn't"
    },
    {
     "emoji": "🚗",
     "en": "He doesn't have a car.",
     "ar": "ما عنده سيارة.",
     "hl": "have"
    },
    {
     "emoji": "👫",
     "en": "They don't live here.",
     "ar": "ما يسكنون هنا.",
     "hl": "don't"
    },
    {
     "emoji": "🏊",
     "en": "We don't swim in winter.",
     "ar": "ما نسبح في الشتاء.",
     "hl": "don't"
    },
    {
     "emoji": "📺",
     "en": "My father doesn't watch TV.",
     "ar": "أبوي ما يشوف تلفزيون.",
     "hl": "watch"
    }
   ],
   "say": "don't, doesn't I don't like onions. She doesn't drink coffee. He doesn't have a car. They don't live here. We don't swim in winter. My father doesn't watch TV."
  }
 },
 {
  "id": "jana-13",
  "order": 13,
  "levelId": "l1",
  "titleAr": "can و can't",
  "titleEn": "can or can't",
  "content": {
   "explanationAr": "can يعني يقدر، و can't يعني ما يقدر. شوف الصورة واختر.",
   "altExplanationAr": "الفعل بعد can دايمًا بدون s وبدون to.",
   "example": [
    {
     "en": "A fish can swim.",
     "ar": "السمكة تقدر تسبح."
    },
    {
     "en": "An elephant can't fly.",
     "ar": "الفيل ما يقدر يطير."
    },
    {
     "en": "A baby can't drive.",
     "ar": "الرضيع ما يقدر يسوق."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "A fish ___ swim.",
    "options": [
     "can't",
     "can",
     "cans"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "An elephant ___ fly.",
     "options": [
      "can",
      "is",
      "can't"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "A baby can't drive.",
     "options": [
      "الرضيع ما يقدر يسوق.",
      "الصقر يقدر يطير.",
      "أمي تطبخ زين."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "A falcon can ___.",
     "options": [
      "flies",
      "fly",
      "flying"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "can or can't"
   },
   {
    "kind": "highlight",
    "text": "can, can't"
   },
   {
    "kind": "example",
    "en": "A fish can swim.",
    "ar": "السمكة تقدر تسبح."
   },
   {
    "kind": "example",
    "en": "An elephant can't fly.",
    "ar": "الفيل ما يقدر يطير."
   }
  ],
  "kids": {
   "listTitle": "can, can't",
   "cards": [
    {
     "emoji": "🐟",
     "en": "A fish can swim.",
     "ar": "السمكة تقدر تسبح.",
     "hl": "can"
    },
    {
     "emoji": "🐘",
     "en": "An elephant can't fly.",
     "ar": "الفيل ما يقدر يطير.",
     "hl": "can't"
    },
    {
     "emoji": "👶",
     "en": "A baby can't drive.",
     "ar": "الرضيع ما يقدر يسوق.",
     "hl": "can't"
    },
    {
     "emoji": "🦅",
     "en": "A falcon can fly.",
     "ar": "الصقر يقدر يطير.",
     "hl": "fly"
    },
    {
     "emoji": "🧕",
     "en": "My mother can cook well.",
     "ar": "أمي تطبخ زين.",
     "hl": "cook"
    },
    {
     "emoji": "🐢",
     "en": "A turtle can't run fast.",
     "ar": "السلحفاة ما تقدر تركض بسرعة.",
     "hl": "run"
    }
   ],
   "say": "can, can't A fish can swim. An elephant can't fly. A baby can't drive. A falcon can fly. My mother can cook well. A turtle can't run fast."
  }
 },
 {
  "id": "jana-14",
  "order": 14,
  "levelId": "l1",
  "titleAr": "there is و there are",
  "titleEn": "there is or there are",
  "content": {
   "explanationAr": "There is لشي واحد، و There are لأكثر من واحد.",
   "altExplanationAr": "شوف الكلمة اللي بعدها: لو فيها s للجمع استخدم are.",
   "example": [
    {
     "en": "There is an apple.",
     "ar": "فيه تفاحة."
    },
    {
     "en": "There are five books.",
     "ar": "فيه خمس كتب."
    },
    {
     "en": "There is a cat in my room.",
     "ar": "فيه قطة في غرفتي."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "There ___ an apple.",
    "options": [
     "are",
     "am",
     "is"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "There ___ five books.",
     "options": [
      "are",
      "is",
      "am"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "There is a cat in my room.",
     "options": [
      "فيه أشجار كثيرة.",
      "فيه قطة في غرفتي.",
      "فيه سيارة برا."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "There ___ many trees.",
     "options": [
      "is",
      "has",
      "are"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "there is or there are"
   },
   {
    "kind": "highlight",
    "text": "There is, There are"
   },
   {
    "kind": "example",
    "en": "There is an apple.",
    "ar": "فيه تفاحة."
   },
   {
    "kind": "example",
    "en": "There are five books.",
    "ar": "فيه خمس كتب."
   }
  ],
  "kids": {
   "listTitle": "There is, There are",
   "cards": [
    {
     "emoji": "🍎",
     "en": "There is an apple.",
     "ar": "فيه تفاحة.",
     "hl": "is"
    },
    {
     "emoji": "📚",
     "en": "There are five books.",
     "ar": "فيه خمس كتب.",
     "hl": "are"
    },
    {
     "emoji": "🐱",
     "en": "There is a cat in my room.",
     "ar": "فيه قطة في غرفتي.",
     "hl": "is"
    },
    {
     "emoji": "🌳",
     "en": "There are many trees.",
     "ar": "فيه أشجار كثيرة.",
     "hl": "are"
    },
    {
     "emoji": "🚗",
     "en": "There is a car outside.",
     "ar": "فيه سيارة برا.",
     "hl": "is"
    },
    {
     "emoji": "🧒",
     "en": "There are two children.",
     "ar": "فيه طفلين.",
     "hl": "are"
    }
   ],
   "say": "There is, There are There is an apple. There are five books. There is a cat in my room. There are many trees. There is a car outside. There are two children."
  }
 },
 {
  "id": "jana-15",
  "order": 15,
  "levelId": "l1",
  "titleAr": "كلمات السؤال",
  "titleEn": "Question words",
  "content": {
   "explanationAr": "اختر كلمة السؤال الصح: What للشي، Where للمكان، Who للشخص، When للوقت.",
   "altExplanationAr": "فكّر في الجواب أول: لو الجواب مكان فالسؤال Where.",
   "example": [
    {
     "en": "What is your name?",
     "ar": "وش اسمك؟"
    },
    {
     "en": "Where do you live?",
     "ar": "وين تسكن؟"
    },
    {
     "en": "Who is your teacher?",
     "ar": "مين معلمتك؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ is your name?",
    "options": [
     "What",
     "Where",
     "Who"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ do you live?",
     "options": [
      "What",
      "Where",
      "When"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Who is your teacher?",
     "options": [
      "متى الحصة؟",
      "كم أخ عندك؟",
      "مين معلمتك؟"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ is the class?",
     "options": [
      "When",
      "Who",
      "What"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Question words"
   },
   {
    "kind": "highlight",
    "text": "What, Where, Who, When"
   },
   {
    "kind": "example",
    "en": "What is your name?",
    "ar": "وش اسمك؟"
   },
   {
    "kind": "example",
    "en": "Where do you live?",
    "ar": "وين تسكن؟"
   }
  ],
  "kids": {
   "listTitle": "What, Where, Who, When",
   "cards": [
    {
     "emoji": "❓",
     "en": "What is your name?",
     "ar": "وش اسمك؟",
     "hl": "What"
    },
    {
     "emoji": "📍",
     "en": "Where do you live?",
     "ar": "وين تسكن؟",
     "hl": "Where"
    },
    {
     "emoji": "🧕",
     "en": "Who is your teacher?",
     "ar": "مين معلمتك؟",
     "hl": "Who"
    },
    {
     "emoji": "🕐",
     "en": "When is the class?",
     "ar": "متى الحصة؟",
     "hl": "When"
    },
    {
     "emoji": "🔢",
     "en": "How many brothers do you have?",
     "ar": "كم أخ عندك؟",
     "hl": "many"
    },
    {
     "emoji": "🎂",
     "en": "How old are you?",
     "ar": "كم عمرك؟",
     "hl": "old"
    }
   ],
   "say": "What, Where, Who, When What is your name? Where do you live? Who is your teacher? When is the class? How many brothers do you have? How old are you?"
  }
 },
 {
  "id": "jana-16",
  "order": 16,
  "levelId": "l1",
  "titleAr": "ترتيب الكلمات",
  "titleEn": "Word order",
  "content": {
   "explanationAr": "الجملة الإنجليزية ترتيبها: الشخص ثم الفعل ثم الباقي، مثل I eat rice. والصفة قبل الاسم: a big house.",
   "altExplanationAr": "بالعربي «بيت كبير» لكن بالإنجليزي big house، الصفة أول.",
   "example": [
    {
     "en": "I live in a big house.",
     "ar": "أسكن في بيت كبير."
    },
    {
     "en": "She has a red car.",
     "ar": "عندها سيارة حمرا."
    },
    {
     "en": "I have a small dog.",
     "ar": "عندي كلب صغير."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I live in a ___ house.",
    "options": [
     "house",
     "big",
     "live"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She has a ___ car.",
     "options": [
      "car",
      "has",
      "red"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I have a small dog.",
     "options": [
      "عندي كلب صغير.",
      "أشرب شاي حار.",
      "هذا كتاب زين."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I drink ___ tea.",
     "options": [
      "tea",
      "hot",
      "drink"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Word order"
   },
   {
    "kind": "highlight",
    "text": "Word Order"
   },
   {
    "kind": "example",
    "en": "I live in a big house.",
    "ar": "أسكن في بيت كبير."
   },
   {
    "kind": "example",
    "en": "She has a red car.",
    "ar": "عندها سيارة حمرا."
   }
  ],
  "kids": {
   "listTitle": "Word Order",
   "cards": [
    {
     "emoji": "🏠",
     "en": "I live in a big house.",
     "ar": "أسكن في بيت كبير.",
     "hl": "big"
    },
    {
     "emoji": "🚗",
     "en": "She has a red car.",
     "ar": "عندها سيارة حمرا.",
     "hl": "red"
    },
    {
     "emoji": "🐶",
     "en": "I have a small dog.",
     "ar": "عندي كلب صغير.",
     "hl": "small"
    },
    {
     "emoji": "🍵",
     "en": "I drink hot tea.",
     "ar": "أشرب شاي حار.",
     "hl": "hot"
    },
    {
     "emoji": "📖",
     "en": "This is a good book.",
     "ar": "هذا كتاب زين.",
     "hl": "good"
    },
    {
     "emoji": "🐱",
     "en": "He has a white cat.",
     "ar": "عنده قطة بيضا.",
     "hl": "white"
    }
   ],
   "say": "Word Order I live in a big house. She has a red car. I have a small dog. I drink hot tea. This is a good book. He has a white cat."
  }
 },
 {
  "id": "jana-17",
  "order": 17,
  "levelId": "l1",
  "titleAr": "الأضداد",
  "titleEn": "Opposites",
  "content": {
   "explanationAr": "اختر الكلمة اللي معناها يناسب الجملة. ركّز على الأضداد: big و small، hot و cold.",
   "altExplanationAr": "اقرأ الجملة كاملة، وبعدها فكّر: الشي هذا كبير ولا صغير؟",
   "example": [
    {
     "en": "An elephant is big.",
     "ar": "الفيل كبير."
    },
    {
     "en": "A mouse is small.",
     "ar": "الفأر صغير."
    },
    {
     "en": "The sun is hot.",
     "ar": "الشمس حارة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "An elephant is ___.",
    "options": [
     "small",
     "short",
     "big"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "A mouse is ___.",
     "options": [
      "small",
      "big",
      "tall"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "The sun is hot.",
     "options": [
      "الثلج بارد.",
      "الشمس حارة.",
      "الصاروخ سريع."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Ice is ___.",
     "options": [
      "hot",
      "warm",
      "cold"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Opposites"
   },
   {
    "kind": "highlight",
    "text": "Opposites"
   },
   {
    "kind": "example",
    "en": "An elephant is big.",
    "ar": "الفيل كبير."
   },
   {
    "kind": "example",
    "en": "A mouse is small.",
    "ar": "الفأر صغير."
   }
  ],
  "kids": {
   "listTitle": "Opposites",
   "cards": [
    {
     "emoji": "🐘",
     "en": "An elephant is big.",
     "ar": "الفيل كبير.",
     "hl": "big"
    },
    {
     "emoji": "🐭",
     "en": "A mouse is small.",
     "ar": "الفأر صغير.",
     "hl": "small"
    },
    {
     "emoji": "🔥",
     "en": "The sun is hot.",
     "ar": "الشمس حارة.",
     "hl": "hot"
    },
    {
     "emoji": "🧊",
     "en": "Ice is cold.",
     "ar": "الثلج بارد.",
     "hl": "cold"
    },
    {
     "emoji": "🚀",
     "en": "A rocket is fast.",
     "ar": "الصاروخ سريع.",
     "hl": "fast"
    },
    {
     "emoji": "🐢",
     "en": "A turtle is slow.",
     "ar": "السلحفاة بطيئة.",
     "hl": "slow"
    }
   ],
   "say": "Opposites An elephant is big. A mouse is small. The sun is hot. Ice is cold. A rocket is fast. A turtle is slow."
  }
 },
 {
  "id": "jana-18",
  "order": 18,
  "levelId": "l1",
  "titleAr": "أسوي الحين: ing",
  "titleEn": "Present continuous",
  "content": {
   "explanationAr": "اللي يصير الحين: am أو is أو are مع الفعل و ing.",
   "altExplanationAr": "شوف وش قبل الفراغ: لو فيه is فالفعل لازم ينتهي بـ ing.",
   "example": [
    {
     "en": "I am reading now.",
     "ar": "أنا أقرا الحين."
    },
    {
     "en": "She is cooking.",
     "ar": "هي تطبخ."
    },
    {
     "en": "They are playing.",
     "ar": "هم يلعبون."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I am ___ now.",
    "options": [
     "reading",
     "read",
     "reads"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She is ___.",
     "options": [
      "cook",
      "cooking",
      "cooks"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "They are playing.",
     "options": [
      "الرضيع نايم.",
      "الحين تمطر.",
      "هم يلعبون."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The baby is ___.",
     "options": [
      "sleeping",
      "sleep",
      "sleeps"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Present continuous"
   },
   {
    "kind": "highlight",
    "text": "Now: ...ing"
   },
   {
    "kind": "example",
    "en": "I am reading now.",
    "ar": "أنا أقرا الحين."
   },
   {
    "kind": "example",
    "en": "She is cooking.",
    "ar": "هي تطبخ."
   }
  ],
  "kids": {
   "listTitle": "Now: ...ing",
   "cards": [
    {
     "emoji": "📖",
     "en": "I am reading now.",
     "ar": "أنا أقرا الحين.",
     "hl": "reading"
    },
    {
     "emoji": "🍳",
     "en": "She is cooking.",
     "ar": "هي تطبخ.",
     "hl": "cooking"
    },
    {
     "emoji": "⚽",
     "en": "They are playing.",
     "ar": "هم يلعبون.",
     "hl": "playing"
    },
    {
     "emoji": "😴",
     "en": "The baby is sleeping.",
     "ar": "الرضيع نايم.",
     "hl": "sleeping"
    },
    {
     "emoji": "🌧️",
     "en": "It is raining now.",
     "ar": "الحين تمطر.",
     "hl": "raining"
    },
    {
     "emoji": "🏊",
     "en": "We are swimming.",
     "ar": "احنا نسبح.",
     "hl": "swimming"
    }
   ],
   "say": "Now: ...ing I am reading now. She is cooking. They are playing. The baby is sleeping. It is raining now. We are swimming."
  }
 },
 {
  "id": "jana-19",
  "order": 19,
  "levelId": "l1",
  "titleAr": "and و but و because و or",
  "titleEn": "and, but, because, or",
  "content": {
   "explanationAr": "and يعني و، but يعني بس، because يعني لأن، or يعني أو.",
   "altExplanationAr": "في السؤال عن اختيار نستخدم or: Tea or coffee?",
   "example": [
    {
     "en": "Tea or coffee?",
     "ar": "شاي أو قهوة؟"
    },
    {
     "en": "I like apples and grapes.",
     "ar": "أحب التفاح والعنب."
    },
    {
     "en": "It is sunny but cold.",
     "ar": "مشمس بس بارد."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Tea ___ coffee?",
    "options": [
     "and",
     "or",
     "but"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I like apples ___ grapes.",
     "options": [
      "or",
      "because",
      "and"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "It is sunny but cold.",
     "options": [
      "مشمس بس بارد.",
      "تعبان لأني ركضت.",
      "أقدر أقعد أو أروح."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I am tired ___ I ran.",
     "options": [
      "but",
      "because",
      "or"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "and, but, because, or"
   },
   {
    "kind": "highlight",
    "text": "Joining Words"
   },
   {
    "kind": "example",
    "en": "Tea or coffee?",
    "ar": "شاي أو قهوة؟"
   },
   {
    "kind": "example",
    "en": "I like apples and grapes.",
    "ar": "أحب التفاح والعنب."
   }
  ],
  "kids": {
   "listTitle": "Joining Words",
   "cards": [
    {
     "emoji": "🍵",
     "en": "Tea or coffee?",
     "ar": "شاي أو قهوة؟",
     "hl": "or"
    },
    {
     "emoji": "🍎",
     "en": "I like apples and grapes.",
     "ar": "أحب التفاح والعنب.",
     "hl": "and"
    },
    {
     "emoji": "🥶",
     "en": "It is sunny but cold.",
     "ar": "مشمس بس بارد.",
     "hl": "but"
    },
    {
     "emoji": "😴",
     "en": "I am tired because I ran.",
     "ar": "تعبان لأني ركضت.",
     "hl": "because"
    },
    {
     "emoji": "🏠",
     "en": "I can stay or go.",
     "ar": "أقدر أقعد أو أروح.",
     "hl": "or"
    },
    {
     "emoji": "📖",
     "en": "She reads and writes.",
     "ar": "تقرا وتكتب.",
     "hl": "and"
    }
   ],
   "say": "Joining Words Tea or coffee? I like apples and grapes. It is sunny but cold. I am tired because I ran. I can stay or go. She reads and writes."
  }
 },
 {
  "id": "jana-20",
  "order": 20,
  "levelId": "l1",
  "titleAr": "مراجعة دروس ريم",
  "titleEn": "Reem's lessons review",
  "content": {
   "explanationAr": "نراجع كلمات ريم داخل جمل: ألوان، أرقام، أكل، حيوانات، أماكن.",
   "altExplanationAr": "شوف الصورة، تساعدك تتذكر الكلمة.",
   "example": [
    {
     "en": "The sky is blue.",
     "ar": "السماء زرقا."
    },
    {
     "en": "I have seven pens.",
     "ar": "عندي سبع أقلام."
    },
    {
     "en": "I eat bread.",
     "ar": "آكل خبز."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "The sky is ___.",
    "options": [
     "red",
     "green",
     "blue"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I have ___ pens.",
     "options": [
      "seven",
      "six",
      "eleven"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I eat bread.",
     "options": [
      "البقرة تعطينا حليب.",
      "آكل خبز.",
      "الطبيب في المستشفى."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The cow gives us ___.",
     "options": [
      "water",
      "tea",
      "milk"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Reem's lessons review"
   },
   {
    "kind": "highlight",
    "text": "Review: Reem's Words"
   },
   {
    "kind": "example",
    "en": "The sky is blue.",
    "ar": "السماء زرقا."
   },
   {
    "kind": "example",
    "en": "I have seven pens.",
    "ar": "عندي سبع أقلام."
   }
  ],
  "kids": {
   "listTitle": "Review: Reem's Words",
   "cards": [
    {
     "emoji": "🔵",
     "en": "The sky is blue.",
     "ar": "السماء زرقا.",
     "hl": "blue"
    },
    {
     "emoji": "7️⃣",
     "en": "I have seven pens.",
     "ar": "عندي سبع أقلام.",
     "hl": "seven"
    },
    {
     "emoji": "🍞",
     "en": "I eat bread.",
     "ar": "آكل خبز.",
     "hl": "bread"
    },
    {
     "emoji": "🐄",
     "en": "The cow gives us milk.",
     "ar": "البقرة تعطينا حليب.",
     "hl": "milk"
    },
    {
     "emoji": "🏥",
     "en": "The doctor is at the hospital.",
     "ar": "الطبيب في المستشفى.",
     "hl": "hospital"
    },
    {
     "emoji": "☀️",
     "en": "It is sunny today.",
     "ar": "الجو مشمس اليوم.",
     "hl": "sunny"
    }
   ],
   "say": "Review: Reem's Words The sky is blue. I have seven pens. I eat bread. The cow gives us milk. The doctor is at the hospital. It is sunny today."
  }
 },
 {
  "id": "jana-21",
  "order": 21,
  "levelId": "l1",
  "titleAr": "was و were",
  "titleEn": "was or were",
  "content": {
   "explanationAr": "was مع I و He و She و It، و were مع You و We و They.",
   "altExplanationAr": "زي is و are بس في الماضي: is صارت was، و are صارت were.",
   "example": [
    {
     "en": "I was tired.",
     "ar": "كنت تعبان."
    },
    {
     "en": "They were at home.",
     "ar": "كانوا في البيت."
    },
    {
     "en": "It was hot yesterday.",
     "ar": "كان الجو حار أمس."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ tired.",
    "options": [
     "was",
     "were",
     "am"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "They ___ at home.",
     "options": [
      "was",
      "were",
      "are"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "It was hot yesterday.",
     "options": [
      "تأخرنا.",
      "كانت مبسوطة.",
      "كان الجو حار أمس."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We ___ late.",
     "options": [
      "were",
      "was",
      "are"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "was or were"
   },
   {
    "kind": "highlight",
    "text": "was, were"
   },
   {
    "kind": "example",
    "en": "I was tired.",
    "ar": "كنت تعبان."
   },
   {
    "kind": "example",
    "en": "They were at home.",
    "ar": "كانوا في البيت."
   }
  ],
  "kids": {
   "listTitle": "was, were",
   "cards": [
    {
     "emoji": "😴",
     "en": "I was tired.",
     "ar": "كنت تعبان.",
     "hl": "was"
    },
    {
     "emoji": "👫",
     "en": "They were at home.",
     "ar": "كانوا في البيت.",
     "hl": "were"
    },
    {
     "emoji": "🔥",
     "en": "It was hot yesterday.",
     "ar": "كان الجو حار أمس.",
     "hl": "was"
    },
    {
     "emoji": "🏫",
     "en": "We were late.",
     "ar": "تأخرنا.",
     "hl": "were"
    },
    {
     "emoji": "🧕",
     "en": "She was happy.",
     "ar": "كانت مبسوطة.",
     "hl": "was"
    },
    {
     "emoji": "🙂",
     "en": "You were right.",
     "ar": "كان معك حق.",
     "hl": "were"
    }
   ],
   "say": "was, were I was tired. They were at home. It was hot yesterday. We were late. She was happy. You were right."
  }
 },
 {
  "id": "jana-22",
  "order": 22,
  "levelId": "l1",
  "titleAr": "الماضي: ed",
  "titleEn": "Past with ed",
  "content": {
   "explanationAr": "للماضي نضيف ed: play صارت played، و cook صارت cooked.",
   "altExplanationAr": "كلمة yesterday أو last week تقول لك إن الجملة في الماضي.",
   "example": [
    {
     "en": "I played football yesterday.",
     "ar": "لعبت كرة أمس."
    },
    {
     "en": "We watched TV last night.",
     "ar": "شفنا تلفزيون البارحة."
    },
    {
     "en": "She cooked dinner.",
     "ar": "طبخت العشا."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ football yesterday.",
    "options": [
     "play",
     "played",
     "playing"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We ___ TV last night.",
     "options": [
      "watch",
      "watching",
      "watched"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "She cooked dinner.",
     "options": [
      "طبخت العشا.",
      "اتصل علي أمس.",
      "مشوا للبيت."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He ___ me yesterday.",
     "options": [
      "call",
      "called",
      "calling"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Past with ed"
   },
   {
    "kind": "highlight",
    "text": "Yesterday: ...ed"
   },
   {
    "kind": "example",
    "en": "I played football yesterday.",
    "ar": "لعبت كرة أمس."
   },
   {
    "kind": "example",
    "en": "We watched TV last night.",
    "ar": "شفنا تلفزيون البارحة."
   }
  ],
  "kids": {
   "listTitle": "Yesterday: ...ed",
   "cards": [
    {
     "emoji": "⚽",
     "en": "I played football yesterday.",
     "ar": "لعبت كرة أمس.",
     "hl": "played"
    },
    {
     "emoji": "📺",
     "en": "We watched TV last night.",
     "ar": "شفنا تلفزيون البارحة.",
     "hl": "watched"
    },
    {
     "emoji": "🍳",
     "en": "She cooked dinner.",
     "ar": "طبخت العشا.",
     "hl": "cooked"
    },
    {
     "emoji": "📞",
     "en": "He called me yesterday.",
     "ar": "اتصل علي أمس.",
     "hl": "called"
    },
    {
     "emoji": "🚶",
     "en": "They walked home.",
     "ar": "مشوا للبيت.",
     "hl": "walked"
    },
    {
     "emoji": "🧹",
     "en": "I cleaned my room.",
     "ar": "نظفت غرفتي.",
     "hl": "cleaned"
    }
   ],
   "say": "Yesterday: ...ed I played football yesterday. We watched TV last night. She cooked dinner. He called me yesterday. They walked home. I cleaned my room."
  }
 },
 {
  "id": "jana-23",
  "order": 23,
  "levelId": "l1",
  "titleAr": "الماضي الشاذ",
  "titleEn": "Irregular past",
  "content": {
   "explanationAr": "بعض الأفعال ما ناخذ ed، تتغير كلها: go صارت went، و eat صارت ate.",
   "altExplanationAr": "احفظها مع بعض: go went، eat ate، see saw، have had.",
   "example": [
    {
     "en": "I went to school.",
     "ar": "رحت المدرسة."
    },
    {
     "en": "We ate rice.",
     "ar": "أكلنا رز."
    },
    {
     "en": "I saw a camel.",
     "ar": "شفت جمل."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ to school.",
    "options": [
     "goed",
     "go",
     "went"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We ___ rice.",
     "options": [
      "ate",
      "eated",
      "eat"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I saw a camel.",
     "options": [
      "كان عندها هدية.",
      "شفت جمل.",
      "قرا كتاب."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She ___ a gift.",
     "options": [
      "haved",
      "has",
      "had"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Irregular past"
   },
   {
    "kind": "highlight",
    "text": "Irregular Past"
   },
   {
    "kind": "example",
    "en": "I went to school.",
    "ar": "رحت المدرسة."
   },
   {
    "kind": "example",
    "en": "We ate rice.",
    "ar": "أكلنا رز."
   }
  ],
  "kids": {
   "listTitle": "Irregular Past",
   "cards": [
    {
     "emoji": "🏫",
     "en": "I went to school.",
     "ar": "رحت المدرسة.",
     "hl": "went"
    },
    {
     "emoji": "🍽️",
     "en": "We ate rice.",
     "ar": "أكلنا رز.",
     "hl": "ate"
    },
    {
     "emoji": "👀",
     "en": "I saw a camel.",
     "ar": "شفت جمل.",
     "hl": "saw"
    },
    {
     "emoji": "🎁",
     "en": "She had a gift.",
     "ar": "كان عندها هدية.",
     "hl": "had"
    },
    {
     "emoji": "📖",
     "en": "He read a book.",
     "ar": "قرا كتاب.",
     "hl": "read"
    },
    {
     "emoji": "✈️",
     "en": "They came by plane.",
     "ar": "جوا بالطيارة.",
     "hl": "came"
    }
   ],
   "say": "Irregular Past I went to school. We ate rice. I saw a camel. She had a gift. He read a book. They came by plane."
  }
 },
 {
  "id": "jana-24",
  "order": 24,
  "levelId": "l1",
  "titleAr": "going to و will",
  "titleEn": "going to or will",
  "content": {
   "explanationAr": "going to للخطة اللي ناويها، و will لقرار الحين أو وعد.",
   "altExplanationAr": "بعد going to و will الفعل بدون s وبدون ed.",
   "example": [
    {
     "en": "I am going to travel.",
     "ar": "بسافر."
    },
    {
     "en": "I will help you.",
     "ar": "بساعدك."
    },
    {
     "en": "She is going to visit her aunt.",
     "ar": "بتزور خالتها."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I am going to ___.",
    "options": [
     "travel",
     "travels",
     "travelled"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I will ___ you.",
     "options": [
      "helps",
      "help",
      "helped"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "She is going to visit her aunt.",
     "options": [
      "بتمطر بكرة.",
      "بتصل عليك.",
      "بتزور خالتها."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "It will ___ tomorrow.",
     "options": [
      "rain",
      "rains",
      "rained"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "going to or will"
   },
   {
    "kind": "highlight",
    "text": "Future"
   },
   {
    "kind": "example",
    "en": "I am going to travel.",
    "ar": "بسافر."
   },
   {
    "kind": "example",
    "en": "I will help you.",
    "ar": "بساعدك."
   }
  ],
  "kids": {
   "listTitle": "Future",
   "cards": [
    {
     "emoji": "✈️",
     "en": "I am going to travel.",
     "ar": "بسافر.",
     "hl": "travel"
    },
    {
     "emoji": "🙋",
     "en": "I will help you.",
     "ar": "بساعدك.",
     "hl": "help"
    },
    {
     "emoji": "🧕",
     "en": "She is going to visit her aunt.",
     "ar": "بتزور خالتها.",
     "hl": "visit"
    },
    {
     "emoji": "🌧️",
     "en": "It will rain tomorrow.",
     "ar": "بتمطر بكرة.",
     "hl": "rain"
    },
    {
     "emoji": "📞",
     "en": "I will call you.",
     "ar": "بتصل عليك.",
     "hl": "call"
    },
    {
     "emoji": "🏖️",
     "en": "We are going to swim.",
     "ar": "بنسبح.",
     "hl": "swim"
    }
   ],
   "say": "Future I am going to travel. I will help you. She is going to visit her aunt. It will rain tomorrow. I will call you. We are going to swim."
  }
 },
 {
  "id": "jana-25",
  "order": 25,
  "levelId": "l1",
  "titleAr": "some و any",
  "titleEn": "some or any",
  "content": {
   "explanationAr": "some في الجملة المثبتة: I have some water. و any في السؤال والنفي: Do you have any water?",
   "altExplanationAr": "لما تطلب بأدب نستخدم some حتى في السؤال: Can I have some tea?",
   "example": [
    {
     "en": "I have some water.",
     "ar": "عندي شوية ماي."
    },
    {
     "en": "Is there any milk?",
     "ar": "فيه حليب؟"
    },
    {
     "en": "We don't have any bread.",
     "ar": "ما عندنا خبز."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I have ___ water.",
    "options": [
     "any",
     "some",
     "a"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Is there ___ milk?",
     "options": [
      "some",
      "a",
      "any"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "We don't have any bread.",
     "options": [
      "ما عندنا خبز.",
      "ممكن شوية شاي؟",
      "فيه شوية تفاح."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Can I have ___ tea?",
     "options": [
      "any",
      "some",
      "many"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "some or any"
   },
   {
    "kind": "highlight",
    "text": "some, any"
   },
   {
    "kind": "example",
    "en": "I have some water.",
    "ar": "عندي شوية ماي."
   },
   {
    "kind": "example",
    "en": "Is there any milk?",
    "ar": "فيه حليب؟"
   }
  ],
  "kids": {
   "listTitle": "some, any",
   "cards": [
    {
     "emoji": "💧",
     "en": "I have some water.",
     "ar": "عندي شوية ماي.",
     "hl": "some"
    },
    {
     "emoji": "🥛",
     "en": "Is there any milk?",
     "ar": "فيه حليب؟",
     "hl": "any"
    },
    {
     "emoji": "🍞",
     "en": "We don't have any bread.",
     "ar": "ما عندنا خبز.",
     "hl": "any"
    },
    {
     "emoji": "🍵",
     "en": "Can I have some tea?",
     "ar": "ممكن شوية شاي؟",
     "hl": "some"
    },
    {
     "emoji": "🍎",
     "en": "There are some apples.",
     "ar": "فيه شوية تفاح.",
     "hl": "some"
    },
    {
     "emoji": "🍪",
     "en": "Do you have any sweets?",
     "ar": "عندك حلاوة؟",
     "hl": "any"
    }
   ],
   "say": "some, any I have some water. Is there any milk? We don't have any bread. Can I have some tea? There are some apples. Do you have any sweets?"
  }
 },
 {
  "id": "jana-26",
  "order": 26,
  "levelId": "l1",
  "titleAr": "كلمات الأدب",
  "titleEn": "Polite words",
  "content": {
   "explanationAr": "كلمات تخلي كلامك لطيف: please لو سمحت، thank you شكرًا، sorry آسف، excuse me لو سمحت.",
   "altExplanationAr": "excuse me قبل ما تسأل أو تمر، و sorry لما تغلط.",
   "example": [
    {
     "en": "Excuse me, where is the bank?",
     "ar": "لو سمحت، وين البنك؟"
    },
    {
     "en": "Thank you very much.",
     "ar": "شكرًا جزيلًا."
    },
    {
     "en": "Sorry, I am late.",
     "ar": "آسف، تأخرت."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ me, where is the bank?",
    "options": [
     "Sorry",
     "Thank",
     "Excuse"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ you very much.",
     "options": [
      "Thank",
      "Please",
      "Sorry"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Sorry, I am late.",
     "options": [
      "ماي لو سمحت.",
      "آسف، تأخرت.",
      "العفو."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Water, ___.",
     "options": [
      "sorry",
      "thanks",
      "please"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Polite words"
   },
   {
    "kind": "highlight",
    "text": "Polite Words"
   },
   {
    "kind": "example",
    "en": "Excuse me, where is the bank?",
    "ar": "لو سمحت، وين البنك؟"
   },
   {
    "kind": "example",
    "en": "Thank you very much.",
    "ar": "شكرًا جزيلًا."
   }
  ],
  "kids": {
   "listTitle": "Polite Words",
   "cards": [
    {
     "emoji": "🙋",
     "en": "Excuse me, where is the bank?",
     "ar": "لو سمحت، وين البنك؟",
     "hl": "Excuse"
    },
    {
     "emoji": "🙏",
     "en": "Thank you very much.",
     "ar": "شكرًا جزيلًا.",
     "hl": "Thank"
    },
    {
     "emoji": "😔",
     "en": "Sorry, I am late.",
     "ar": "آسف، تأخرت.",
     "hl": "Sorry"
    },
    {
     "emoji": "💧",
     "en": "Water, please.",
     "ar": "ماي لو سمحت.",
     "hl": "please"
    },
    {
     "emoji": "😊",
     "en": "You are welcome.",
     "ar": "العفو.",
     "hl": "welcome"
    },
    {
     "emoji": "👋",
     "en": "Nice to meet you.",
     "ar": "تشرفت بمعرفتك.",
     "hl": "meet"
    }
   ],
   "say": "Polite Words Excuse me, where is the bank? Thank you very much. Sorry, I am late. Water, please. You are welcome. Nice to meet you."
  }
 },
 {
  "id": "jana-27",
  "order": 27,
  "levelId": "l1",
  "titleAr": "الأرقام والوقت",
  "titleEn": "Numbers and time",
  "content": {
   "explanationAr": "نقول الوقت: It is five o'clock يعني الساعة خمس. و half past six يعني ست ونص.",
   "altExplanationAr": "نسأل What time is it? والجواب It is ...",
   "example": [
    {
     "en": "It is five o'clock.",
     "ar": "الساعة خمس."
    },
    {
     "en": "It is half past six.",
     "ar": "الساعة ست ونص."
    },
    {
     "en": "What time is it?",
     "ar": "كم الساعة؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "It is ___ o'clock.",
    "options": [
     "five",
     "fifth",
     "fifty"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "It is ___ past six.",
     "options": [
      "halve",
      "half",
      "have"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "What time is it?",
     "options": [
      "عندي اثنا عشر قلم.",
      "في الأسبوع سبع أيام.",
      "كم الساعة؟"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I have ___ pens.",
     "options": [
      "twelve",
      "twenty",
      "two"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Numbers and time"
   },
   {
    "kind": "highlight",
    "text": "Numbers and Time"
   },
   {
    "kind": "example",
    "en": "It is five o'clock.",
    "ar": "الساعة خمس."
   },
   {
    "kind": "example",
    "en": "It is half past six.",
    "ar": "الساعة ست ونص."
   }
  ],
  "kids": {
   "listTitle": "Numbers and Time",
   "cards": [
    {
     "emoji": "🕔",
     "en": "It is five o'clock.",
     "ar": "الساعة خمس.",
     "hl": "five"
    },
    {
     "emoji": "🕡",
     "en": "It is half past six.",
     "ar": "الساعة ست ونص.",
     "hl": "half"
    },
    {
     "emoji": "🕐",
     "en": "What time is it?",
     "ar": "كم الساعة؟",
     "hl": "time"
    },
    {
     "emoji": "🔢",
     "en": "I have twelve pens.",
     "ar": "عندي اثنا عشر قلم.",
     "hl": "twelve"
    },
    {
     "emoji": "📅",
     "en": "There are seven days in a week.",
     "ar": "في الأسبوع سبع أيام.",
     "hl": "seven"
    },
    {
     "emoji": "🎂",
     "en": "I am twenty years old.",
     "ar": "عمري عشرين سنة.",
     "hl": "twenty"
    }
   ],
   "say": "Numbers and Time It is five o'clock. It is half past six. What time is it? I have twelve pens. There are seven days in a week. I am twenty years old."
  }
 },
 {
  "id": "jana-28",
  "order": 28,
  "levelId": "l1",
  "titleAr": "مراجعة دروس هيا",
  "titleEn": "Haya's lessons review",
  "content": {
   "explanationAr": "نراجع جمل هيا: I am و I have و I like و I can و There is و I want.",
   "altExplanationAr": "اقرأ الجملة كاملة بصوت عالي بعد ما تختار.",
   "example": [
    {
     "en": "I am happy.",
     "ar": "أنا مبسوط."
    },
    {
     "en": "I have a cat.",
     "ar": "عندي قطة."
    },
    {
     "en": "She likes bananas.",
     "ar": "تحب الموز."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ happy.",
    "options": [
     "is",
     "am",
     "are"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I ___ a cat.",
     "options": [
      "has",
      "am",
      "have"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "She likes bananas.",
     "options": [
      "تحب الموز.",
      "أقدر أسبح.",
      "فيه حديقة قريبة."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I can ___.",
     "options": [
      "swims",
      "swim",
      "swimming"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Haya's lessons review"
   },
   {
    "kind": "highlight",
    "text": "Review: Haya's Sentences"
   },
   {
    "kind": "example",
    "en": "I am happy.",
    "ar": "أنا مبسوط."
   },
   {
    "kind": "example",
    "en": "I have a cat.",
    "ar": "عندي قطة."
   }
  ],
  "kids": {
   "listTitle": "Review: Haya's Sentences",
   "cards": [
    {
     "emoji": "😊",
     "en": "I am happy.",
     "ar": "أنا مبسوط.",
     "hl": "am"
    },
    {
     "emoji": "🐱",
     "en": "I have a cat.",
     "ar": "عندي قطة.",
     "hl": "have"
    },
    {
     "emoji": "🍌",
     "en": "She likes bananas.",
     "ar": "تحب الموز.",
     "hl": "likes"
    },
    {
     "emoji": "🏊",
     "en": "I can swim.",
     "ar": "أقدر أسبح.",
     "hl": "swim"
    },
    {
     "emoji": "🌳",
     "en": "There is a park near here.",
     "ar": "فيه حديقة قريبة.",
     "hl": "is"
    },
    {
     "emoji": "💧",
     "en": "I want some water.",
     "ar": "أبي شوية ماي.",
     "hl": "want"
    }
   ],
   "say": "Review: Haya's Sentences I am happy. I have a cat. She likes bananas. I can swim. There is a park near here. I want some water."
  }
 },
 {
  "id": "jana-29",
  "order": 29,
  "levelId": "l1",
  "titleAr": "حروف الجر مخلوطة",
  "titleEn": "Mixed prepositions",
  "content": {
   "explanationAr": "نخلط كل اللي تعلمناه: in و on و at و to و for، في المكان والوقت والأفعال.",
   "altExplanationAr": "لو احترت، تذكّر الأمثلة: in the box، on Friday، at five، listen to، wait for.",
   "example": [
    {
     "en": "Please wait for me.",
     "ar": "انتظرني لو سمحت."
    },
    {
     "en": "The bus comes at seven.",
     "ar": "الباص يجي الساعة سبع."
    },
    {
     "en": "I travel on Sunday.",
     "ar": "أسافر يوم الأحد."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Please wait ___ me.",
    "options": [
     "to",
     "on",
     "for"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The bus comes ___ seven.",
     "options": [
      "at",
      "on",
      "in"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I travel on Sunday.",
     "options": [
      "اسمع هذا.",
      "أسافر يوم الأحد.",
      "المفتاح في السيارة."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Listen ___ this.",
     "options": [
      "for",
      "at",
      "to"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Mixed prepositions"
   },
   {
    "kind": "highlight",
    "text": "in, on, at, to, for"
   },
   {
    "kind": "example",
    "en": "Please wait for me.",
    "ar": "انتظرني لو سمحت."
   },
   {
    "kind": "example",
    "en": "The bus comes at seven.",
    "ar": "الباص يجي الساعة سبع."
   }
  ],
  "kids": {
   "listTitle": "in, on, at, to, for",
   "cards": [
    {
     "emoji": "⏳",
     "en": "Please wait for me.",
     "ar": "انتظرني لو سمحت.",
     "hl": "for"
    },
    {
     "emoji": "🕔",
     "en": "The bus comes at seven.",
     "ar": "الباص يجي الساعة سبع.",
     "hl": "at"
    },
    {
     "emoji": "📅",
     "en": "I travel on Sunday.",
     "ar": "أسافر يوم الأحد.",
     "hl": "on"
    },
    {
     "emoji": "👂",
     "en": "Listen to this.",
     "ar": "اسمع هذا.",
     "hl": "to"
    },
    {
     "emoji": "🔑",
     "en": "The key is in the car.",
     "ar": "المفتاح في السيارة.",
     "hl": "in"
    },
    {
     "emoji": "🏖️",
     "en": "We go to the beach in summer.",
     "ar": "نروح البحر في الصيف.",
     "hl": "in"
    }
   ],
   "say": "in, on, at, to, for Please wait for me. The bus comes at seven. I travel on Sunday. Listen to this. The key is in the car. We go to the beach in summer."
  }
 },
 {
  "id": "jana-30",
  "order": 30,
  "levelId": "l1",
  "titleAr": "المراجعة النهائية",
  "titleEn": "Final review",
  "content": {
   "explanationAr": "المراجعة الأخيرة: تمارين من كل الدروس. خذ وقتك واقرأ كل جملة.",
   "altExplanationAr": "لو غلطت لا تشيل هم، اسمع الجواب الصح وعيده.",
   "example": [
    {
     "en": "I would like an apple.",
     "ar": "أبي تفاحة."
    },
    {
     "en": "They are my friends.",
     "ar": "هم أصحابي."
    },
    {
     "en": "He played football yesterday.",
     "ar": "لعب كرة أمس."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I would like ___ apple.",
    "options": [
     "an",
     "a",
     "any"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "They ___ my friends.",
     "options": [
      "is",
      "are",
      "am"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "He played football yesterday.",
     "options": [
      "رحت المدرسة بالباص.",
      "بتصل عليك بكرة.",
      "لعب كرة أمس."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I ___ to school by bus.",
     "options": [
      "went",
      "go",
      "goes"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Final review"
   },
   {
    "kind": "highlight",
    "text": "Final Review"
   },
   {
    "kind": "example",
    "en": "I would like an apple.",
    "ar": "أبي تفاحة."
   },
   {
    "kind": "example",
    "en": "They are my friends.",
    "ar": "هم أصحابي."
   }
  ],
  "kids": {
   "listTitle": "Final Review",
   "cards": [
    {
     "emoji": "🍎",
     "en": "I would like an apple.",
     "ar": "أبي تفاحة.",
     "hl": "an"
    },
    {
     "emoji": "👫",
     "en": "They are my friends.",
     "ar": "هم أصحابي.",
     "hl": "are"
    },
    {
     "emoji": "⚽",
     "en": "He played football yesterday.",
     "ar": "لعب كرة أمس.",
     "hl": "played"
    },
    {
     "emoji": "🏫",
     "en": "I went to school by bus.",
     "ar": "رحت المدرسة بالباص.",
     "hl": "went"
    },
    {
     "emoji": "📞",
     "en": "I will call you tomorrow.",
     "ar": "بتصل عليك بكرة.",
     "hl": "will"
    },
    {
     "emoji": "🙏",
     "en": "Thank you for your help.",
     "ar": "شكرًا على مساعدتك.",
     "hl": "for"
    }
   ],
   "say": "Final Review I would like an apple. They are my friends. He played football yesterday. I went to school by bus. I will call you tomorrow. Thank you for your help."
  }
 },
 {
  "id": "jana-31",
  "order": 31,
  "levelId": "l2",
  "titleAr": "تمرين: s مع he و she",
  "titleEn": "Practice: he plays, she plays",
  "content": {
   "explanationAr": "تمرين: مع he و she و it نضيف s للفعل. اختر الفعل الصح لكل جملة.",
   "altExplanationAr": "Ali plays. The cat sleeps. It works.",
   "example": [
    {
     "en": "My cousin works in a lab.",
     "ar": "ولد عمي يشتغل في مختبر."
    },
    {
     "en": "The squirrel climbs the tree.",
     "ar": "السنجاب يتسلق الشجرة."
    },
    {
     "en": "Our teacher speaks three languages.",
     "ar": "معلمتنا تتكلم ثلاث لغات."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "My cousin ___ in a lab.",
    "options": [
     "work",
     "works",
     "working"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The squirrel ___ the tree.",
     "options": [
      "climb",
      "climbing",
      "climbs"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Our teacher speaks three languages.",
     "options": [
      "معلمتنا تتكلم ثلاث لغات.",
      "هالساعة سعرها خمسين ريال.",
      "النهر يجري للبحر."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "This watch ___ fifty riyals.",
     "options": [
      "cost",
      "costs",
      "costing"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: he plays, she plays"
   },
   {
    "kind": "highlight",
    "text": "Verb + s"
   },
   {
    "kind": "example",
    "en": "My cousin works in a lab.",
    "ar": "ولد عمي يشتغل في مختبر."
   },
   {
    "kind": "example",
    "en": "The squirrel climbs the tree.",
    "ar": "السنجاب يتسلق الشجرة."
   }
  ],
  "kids": {
   "listTitle": "Verb + s",
   "cards": [
    {
     "emoji": "🧑‍🔬",
     "en": "My cousin works in a lab.",
     "ar": "ولد عمي يشتغل في مختبر.",
     "hl": "works"
    },
    {
     "emoji": "🐿️",
     "en": "The squirrel climbs the tree.",
     "ar": "السنجاب يتسلق الشجرة.",
     "hl": "climbs"
    },
    {
     "emoji": "🧑‍🏫",
     "en": "Our teacher speaks three languages.",
     "ar": "معلمتنا تتكلم ثلاث لغات.",
     "hl": "speaks"
    },
    {
     "emoji": "⌚",
     "en": "This watch costs fifty riyals.",
     "ar": "هالساعة سعرها خمسين ريال.",
     "hl": "costs"
    },
    {
     "emoji": "🌊",
     "en": "The river runs to the sea.",
     "ar": "النهر يجري للبحر.",
     "hl": "runs"
    },
    {
     "emoji": "🧕",
     "en": "Aunt Huda makes the best bread.",
     "ar": "خالتي هدى تسوي أطيب خبز.",
     "hl": "makes"
    }
   ],
   "say": "Verb + s My cousin works in a lab. The squirrel climbs the tree. Our teacher speaks three languages. This watch costs fifty riyals. The river runs to the sea. Aunt Huda makes the best bread."
  }
 },
 {
  "id": "jana-32",
  "order": 32,
  "levelId": "l2",
  "titleAr": "تمرين: do أو does في السؤال",
  "titleEn": "Practice: Do or Does?",
  "content": {
   "explanationAr": "تمرين: Do مع I و you و we و they، و Does مع he و she و it. اختر الكلمة الصح.",
   "altExplanationAr": "Do you swim? Does she swim?",
   "example": [
    {
     "en": "Do your sisters play tennis?",
     "ar": "خواتك يلعبون تنس؟"
    },
    {
     "en": "Does the dog bite?",
     "ar": "الكلب يعض؟"
    },
    {
     "en": "Does this bakery open early?",
     "ar": "هالمخبز يفتح بدري؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ your sisters play tennis?",
    "options": [
     "Does",
     "Are",
     "Do"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ the dog bite?",
     "options": [
      "Does",
      "Do",
      "Is"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Does this bakery open early?",
     "options": [
      "تسمع راديو؟",
      "هالمخبز يفتح بدري؟",
      "هالطريق يروح للطايف؟"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ you listen to the radio?",
     "options": [
      "Does",
      "Are",
      "Do"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Do or Does?"
   },
   {
    "kind": "highlight",
    "text": "Do · Does"
   },
   {
    "kind": "example",
    "en": "Do your sisters play tennis?",
    "ar": "خواتك يلعبون تنس؟"
   },
   {
    "kind": "example",
    "en": "Does the dog bite?",
    "ar": "الكلب يعض؟"
   }
  ],
  "kids": {
   "listTitle": "Do · Does",
   "cards": [
    {
     "emoji": "🏓",
     "en": "Do your sisters play tennis?",
     "ar": "خواتك يلعبون تنس؟",
     "hl": "Do"
    },
    {
     "emoji": "🐕",
     "en": "Does the dog bite?",
     "ar": "الكلب يعض؟",
     "hl": "Does"
    },
    {
     "emoji": "🍞",
     "en": "Does this bakery open early?",
     "ar": "هالمخبز يفتح بدري؟",
     "hl": "Does"
    },
    {
     "emoji": "🎧",
     "en": "Do you listen to the radio?",
     "ar": "تسمع راديو؟",
     "hl": "Do"
    },
    {
     "emoji": "🛣️",
     "en": "Does this road go to Taif?",
     "ar": "هالطريق يروح للطايف؟",
     "hl": "Does"
    },
    {
     "emoji": "🧒",
     "en": "Do the children wear uniforms?",
     "ar": "الأطفال يلبسون زي؟",
     "hl": "Do"
    }
   ],
   "say": "Do · Does Do your sisters play tennis? Does the dog bite? Does this bakery open early? Do you listen to the radio? Does this road go to Taif? Do the children wear uniforms?"
  }
 },
 {
  "id": "jana-33",
  "order": 33,
  "levelId": "l2",
  "titleAr": "تمرين: is أو does",
  "titleEn": "Practice: Is or Does?",
  "content": {
   "explanationAr": "تمرين: نستخدم is مع الصفة أو ing: Is she tired? Is he running? ونستخدم does مع الفعل العادي: Does she run?",
   "altExplanationAr": "Is it cold? Does it snow?",
   "example": [
    {
     "en": "Is the baby asleep?",
     "ar": "البيبي نايم؟"
    },
    {
     "en": "Does your brother run every day?",
     "ar": "أخوك يركض كل يوم؟"
    },
    {
     "en": "Does it snow in Tabuk?",
     "ar": "تثلج في تبوك؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ the baby asleep?",
    "options": [
     "Is",
     "Does",
     "Do"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ your brother run every day?",
     "options": [
      "Is",
      "Does",
      "Do"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Does it snow in Tabuk?",
     "options": [
      "الماي بارد؟",
      "هي تغني الحين؟",
      "تثلج في تبوك؟"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ the water cold?",
     "options": [
      "Is",
      "Does",
      "Do"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Is or Does?"
   },
   {
    "kind": "highlight",
    "text": "Is · Does"
   },
   {
    "kind": "example",
    "en": "Is the baby asleep?",
    "ar": "البيبي نايم؟"
   },
   {
    "kind": "example",
    "en": "Does your brother run every day?",
    "ar": "أخوك يركض كل يوم؟"
   }
  ],
  "kids": {
   "listTitle": "Is · Does",
   "cards": [
    {
     "emoji": "😴",
     "en": "Is the baby asleep?",
     "ar": "البيبي نايم؟",
     "hl": "Is"
    },
    {
     "emoji": "🏃",
     "en": "Does your brother run every day?",
     "ar": "أخوك يركض كل يوم؟",
     "hl": "Does"
    },
    {
     "emoji": "❄️",
     "en": "Does it snow in Tabuk?",
     "ar": "تثلج في تبوك؟",
     "hl": "Does"
    },
    {
     "emoji": "🧊",
     "en": "Is the water cold?",
     "ar": "الماي بارد؟",
     "hl": "Is"
    },
    {
     "emoji": "🎤",
     "en": "Is she singing now?",
     "ar": "هي تغني الحين؟",
     "hl": "Is"
    },
    {
     "emoji": "🐎",
     "en": "Does your uncle have horses?",
     "ar": "عمك عنده خيل؟",
     "hl": "Does"
    }
   ],
   "say": "Is · Does Is the baby asleep? Does your brother run every day? Does it snow in Tabuk? Is the water cold? Is she singing now? Does your uncle have horses?"
  }
 },
 {
  "id": "jana-34",
  "order": 34,
  "levelId": "l2",
  "titleAr": "تمرين: I و he و she و we و they",
  "titleEn": "Practice: Subject Pronouns",
  "content": {
   "explanationAr": "تمرين: نبدل الاسم بضمير: Ali ← he، Sara ← she، the book ← it، Ali and I ← we، the boys ← they.",
   "altExplanationAr": "Sara is my friend. She is kind.",
   "example": [
    {
     "en": "Sara is ten. She is in grade four.",
     "ar": "سارة عمرها عشر. هي في رابع."
    },
    {
     "en": "Fahad is my neighbour. He is very funny.",
     "ar": "فهد جارنا. هو دمه خفيف."
    },
    {
     "en": "I like this book. It is very good.",
     "ar": "أحب هالكتاب. هو مرة حلو."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Sara is ten. ___ is in grade four.",
    "options": [
     "He",
     "She",
     "It"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Fahad is my neighbour. ___ is very funny.",
     "options": [
      "She",
      "They",
      "He"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I like this book. It is very good.",
     "options": [
      "أحب هالكتاب. هو مرة حلو.",
      "أنا وعلي عيال عم. نلعب مع بعض.",
      "البقر في الحقل. ياكلون عشب."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Ali and I are cousins. ___ play together.",
     "options": [
      "They",
      "We",
      "He"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Subject Pronouns"
   },
   {
    "kind": "highlight",
    "text": "Subject pronouns"
   },
   {
    "kind": "example",
    "en": "Sara is ten. She is in grade four.",
    "ar": "سارة عمرها عشر. هي في رابع."
   },
   {
    "kind": "example",
    "en": "Fahad is my neighbour. He is very funny.",
    "ar": "فهد جارنا. هو دمه خفيف."
   }
  ],
  "kids": {
   "listTitle": "Subject pronouns",
   "cards": [
    {
     "emoji": "👧",
     "en": "Sara is ten. She is in grade four.",
     "ar": "سارة عمرها عشر. هي في رابع.",
     "hl": "She"
    },
    {
     "emoji": "👦",
     "en": "Fahad is my neighbour. He is very funny.",
     "ar": "فهد جارنا. هو دمه خفيف.",
     "hl": "He"
    },
    {
     "emoji": "📕",
     "en": "I like this book. It is very good.",
     "ar": "أحب هالكتاب. هو مرة حلو.",
     "hl": "It"
    },
    {
     "emoji": "👫",
     "en": "Ali and I are cousins. We play together.",
     "ar": "أنا وعلي عيال عم. نلعب مع بعض.",
     "hl": "We"
    },
    {
     "emoji": "🐄",
     "en": "The cows are in the field. They eat grass.",
     "ar": "البقر في الحقل. ياكلون عشب.",
     "hl": "They"
    },
    {
     "emoji": "🎒",
     "en": "Where is my bag? Is it in the car?",
     "ar": "وين شنطتي؟ هي في السيارة؟",
     "hl": "it"
    }
   ],
   "say": "Subject pronouns Sara is ten. She is in grade four. Fahad is my neighbour. He is very funny. I like this book. It is very good. Ali and I are cousins. We play together. The cows are in the field. They eat grass. Where is my bag? Is it in the car?"
  }
 },
 {
  "id": "jana-35",
  "order": 35,
  "levelId": "l2",
  "titleAr": "تمرين: me و him و her و us و them",
  "titleEn": "Practice: Object Pronouns",
  "content": {
   "explanationAr": "تمرين: بعد الفعل أو بعد كلمات مثل with و for نقول me و him و her و us و them.",
   "altExplanationAr": "Come with us. This is for her.",
   "example": [
    {
     "en": "Come with us to the mall.",
     "ar": "تعال معنا للمول."
    },
    {
     "en": "This present is for her.",
     "ar": "هالهدية لها."
    },
    {
     "en": "Please send them an email.",
     "ar": "لو سمحت أرسل لهم إيميل."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Come with ___ to the mall.",
    "options": [
     "we",
     "our",
     "us"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "This present is for ___.",
     "options": [
      "her",
      "she",
      "hers"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Please send them an email.",
     "options": [
      "تشوفني؟",
      "لو سمحت أرسل لهم إيميل.",
      "مرّر له الكورة!"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Can you see ___?",
     "options": [
      "I",
      "my",
      "me"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Object Pronouns"
   },
   {
    "kind": "highlight",
    "text": "Object pronouns"
   },
   {
    "kind": "example",
    "en": "Come with us to the mall.",
    "ar": "تعال معنا للمول."
   },
   {
    "kind": "example",
    "en": "This present is for her.",
    "ar": "هالهدية لها."
   }
  ],
  "kids": {
   "listTitle": "Object pronouns",
   "cards": [
    {
     "emoji": "🚗",
     "en": "Come with us to the mall.",
     "ar": "تعال معنا للمول.",
     "hl": "us"
    },
    {
     "emoji": "🎀",
     "en": "This present is for her.",
     "ar": "هالهدية لها.",
     "hl": "her"
    },
    {
     "emoji": "📧",
     "en": "Please send them an email.",
     "ar": "لو سمحت أرسل لهم إيميل.",
     "hl": "them"
    },
    {
     "emoji": "🙂",
     "en": "Can you see me?",
     "ar": "تشوفني؟",
     "hl": "me"
    },
    {
     "emoji": "⚽",
     "en": "Pass him the ball!",
     "ar": "مرّر له الكورة!",
     "hl": "him"
    },
    {
     "emoji": "🧑‍🤝‍🧑",
     "en": "My friends always wait for me.",
     "ar": "أصحابي دايمًا ينتظروني.",
     "hl": "me"
    }
   ],
   "say": "Object pronouns Come with us to the mall. This present is for her. Please send them an email. Can you see me? Pass him the ball! My friends always wait for me."
  }
 },
 {
  "id": "jana-36",
  "order": 36,
  "levelId": "l2",
  "titleAr": "تمرين: our و their و its",
  "titleEn": "Practice: our, their, its",
  "content": {
   "explanationAr": "تمرين: our لنا، their لهم، its له (للأشياء والحيوانات). انتبه: its بدون فاصلة.",
   "altExplanationAr": "The bird is in its nest.",
   "example": [
    {
     "en": "This is our new house.",
     "ar": "هذا بيتنا الجديد."
    },
    {
     "en": "The bird is in its nest.",
     "ar": "الطير في عشه."
    },
    {
     "en": "The Ahmads sold their car.",
     "ar": "عائلة أحمد باعوا سيارتهم."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "This is ___ new house.",
    "options": [
     "our",
     "us",
     "we"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The bird is in ___ nest.",
     "options": [
      "it's",
      "its",
      "it"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "The Ahmads sold their car.",
     "options": [
      "مدرستنا فيها مكتبة كبيرة.",
      "الجرو يلعب بلعبته.",
      "عائلة أحمد باعوا سيارتهم."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ school has a big library.",
     "options": [
      "Our",
      "Us",
      "We"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: our, their, its"
   },
   {
    "kind": "highlight",
    "text": "Possessives"
   },
   {
    "kind": "example",
    "en": "This is our new house.",
    "ar": "هذا بيتنا الجديد."
   },
   {
    "kind": "example",
    "en": "The bird is in its nest.",
    "ar": "الطير في عشه."
   }
  ],
  "kids": {
   "listTitle": "Possessives",
   "cards": [
    {
     "emoji": "🏡",
     "en": "This is our new house.",
     "ar": "هذا بيتنا الجديد.",
     "hl": "our"
    },
    {
     "emoji": "🐦",
     "en": "The bird is in its nest.",
     "ar": "الطير في عشه.",
     "hl": "its"
    },
    {
     "emoji": "🚙",
     "en": "The Ahmads sold their car.",
     "ar": "عائلة أحمد باعوا سيارتهم.",
     "hl": "their"
    },
    {
     "emoji": "🏫",
     "en": "Our school has a big library.",
     "ar": "مدرستنا فيها مكتبة كبيرة.",
     "hl": "Our"
    },
    {
     "emoji": "🐶",
     "en": "The puppy is playing with its toy.",
     "ar": "الجرو يلعب بلعبته.",
     "hl": "its"
    },
    {
     "emoji": "👨‍👩‍👧",
     "en": "They love their grandparents.",
     "ar": "يحبون جدهم وجدتهم.",
     "hl": "their"
    }
   ],
   "say": "Possessives This is our new house. The bird is in its nest. The Ahmads sold their car. Our school has a big library. The puppy is playing with its toy. They love their grandparents."
  }
 },
 {
  "id": "jana-37",
  "order": 37,
  "levelId": "l2",
  "titleAr": "تمرين: this و that و these و those",
  "titleEn": "Practice: this, that, these, those",
  "content": {
   "explanationAr": "تمرين: this (قريب، واحد)، that (بعيد، واحد)، these (قريب، أكثر من واحد)، those (بعيد، أكثر من واحد).",
   "altExplanationAr": "This apple. These apples. That car. Those cars.",
   "example": [
    {
     "en": "These apples are sweet.",
     "ar": "هالتفاح حالي."
    },
    {
     "en": "That car over there is my dad's.",
     "ar": "هذيك السيارة هناك حق أبوي."
    },
    {
     "en": "This flower smells lovely.",
     "ar": "هالوردة ريحتها حلوة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ apples are sweet.",
    "options": [
     "This",
     "These",
     "That"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ car over there is my dad's.",
     "options": [
      "Those",
      "These",
      "That"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "This flower smells lovely.",
     "options": [
      "هالوردة ريحتها حلوة.",
      "شوف هذيك الغيوم فوق التلال.",
      "هالشرابات نظيفة؟"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Look at ___ clouds over the hills.",
     "options": [
      "that",
      "those",
      "this"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: this, that, these, those"
   },
   {
    "kind": "highlight",
    "text": "Demonstratives"
   },
   {
    "kind": "example",
    "en": "These apples are sweet.",
    "ar": "هالتفاح حالي."
   },
   {
    "kind": "example",
    "en": "That car over there is my dad's.",
    "ar": "هذيك السيارة هناك حق أبوي."
   }
  ],
  "kids": {
   "listTitle": "Demonstratives",
   "cards": [
    {
     "emoji": "🍎",
     "en": "These apples are sweet.",
     "ar": "هالتفاح حالي.",
     "hl": "These"
    },
    {
     "emoji": "🚗",
     "en": "That car over there is my dad's.",
     "ar": "هذيك السيارة هناك حق أبوي.",
     "hl": "That"
    },
    {
     "emoji": "🌺",
     "en": "This flower smells lovely.",
     "ar": "هالوردة ريحتها حلوة.",
     "hl": "This"
    },
    {
     "emoji": "🏔️",
     "en": "Look at those clouds over the hills.",
     "ar": "شوف هذيك الغيوم فوق التلال.",
     "hl": "those"
    },
    {
     "emoji": "🧦",
     "en": "Are these socks clean?",
     "ar": "هالشرابات نظيفة؟",
     "hl": "these"
    },
    {
     "emoji": "🏢",
     "en": "Is that your office building?",
     "ar": "هذاك مبنى مكتبك؟",
     "hl": "that"
    }
   ],
   "say": "Demonstratives These apples are sweet. That car over there is my dad's. This flower smells lovely. Look at those clouds over the hills. Are these socks clean? Is that your office building?"
  }
 },
 {
  "id": "jana-38",
  "order": 38,
  "levelId": "l2",
  "titleAr": "تمرين: جمع الكلمات",
  "titleEn": "Practice: Plurals",
  "content": {
   "explanationAr": "تمرين الجمع: box ← boxes، baby ← babies، وجمع شاذ: child ← children، man ← men، foot ← feet، tooth ← teeth.",
   "altExplanationAr": "One child, two children. One tooth, many teeth.",
   "example": [
    {
     "en": "The babies are sleeping.",
     "ar": "البيبيهات نايمين."
    },
    {
     "en": "Put the boxes in the car.",
     "ar": "حط الصناديق في السيارة."
    },
    {
     "en": "Ten children are in the bus.",
     "ar": "عشرة أطفال في الباص."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "The ___ are sleeping.",
    "options": [
     "babys",
     "baby",
     "babies"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Put the ___ in the car.",
     "options": [
      "boxes",
      "boxs",
      "box"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Ten children are in the bus.",
     "options": [
      "فرّش أسنانك بعد الوجبات.",
      "عشرة أطفال في الباص.",
      "رجولي توجعني بعد المشي الطويل."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Brush your ___ after meals.",
     "options": [
      "tooths",
      "tooth",
      "teeth"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Plurals"
   },
   {
    "kind": "highlight",
    "text": "Plurals"
   },
   {
    "kind": "example",
    "en": "The babies are sleeping.",
    "ar": "البيبيهات نايمين."
   },
   {
    "kind": "example",
    "en": "Put the boxes in the car.",
    "ar": "حط الصناديق في السيارة."
   }
  ],
  "kids": {
   "listTitle": "Plurals",
   "cards": [
    {
     "emoji": "👶",
     "en": "The babies are sleeping.",
     "ar": "البيبيهات نايمين.",
     "hl": "babies"
    },
    {
     "emoji": "📦",
     "en": "Put the boxes in the car.",
     "ar": "حط الصناديق في السيارة.",
     "hl": "boxes"
    },
    {
     "emoji": "🧒",
     "en": "Ten children are in the bus.",
     "ar": "عشرة أطفال في الباص.",
     "hl": "children"
    },
    {
     "emoji": "🦷",
     "en": "Brush your teeth after meals.",
     "ar": "فرّش أسنانك بعد الوجبات.",
     "hl": "teeth"
    },
    {
     "emoji": "🦶",
     "en": "My feet hurt after the long walk.",
     "ar": "رجولي توجعني بعد المشي الطويل.",
     "hl": "feet"
    },
    {
     "emoji": "👨",
     "en": "Three men are waiting outside.",
     "ar": "ثلاثة رجال ينتظرون برا.",
     "hl": "men"
    }
   ],
   "say": "Plurals The babies are sleeping. Put the boxes in the car. Ten children are in the bus. Brush your teeth after meals. My feet hurt after the long walk. Three men are waiting outside."
  }
 },
 {
  "id": "jana-39",
  "order": 39,
  "levelId": "l2",
  "titleAr": "تمرين: a أو some",
  "titleEn": "Practice: a or some",
  "content": {
   "explanationAr": "تمرين: a لشي واحد نعدّه: a banana. و some لأكثر من واحد أو لشي ما نعدّه: some bananas، some rice.",
   "altExplanationAr": "I want a sandwich and some juice.",
   "example": [
    {
     "en": "I want a sandwich.",
     "ar": "أبي ساندويتش."
    },
    {
     "en": "Can I have some rice?",
     "ar": "ممكن شوية رز؟"
    },
    {
     "en": "We bought some bananas.",
     "ar": "اشترينا موز."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I want ___ sandwich.",
    "options": [
     "a",
     "some",
     "an"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Can I have ___ rice?",
     "options": [
      "a",
      "some",
      "an"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "We bought some bananas.",
     "options": [
      "فيه جبن في الثلاجة.",
      "أكلت بيضة على الفطور.",
      "اشترينا موز."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "There is ___ cheese in the fridge.",
     "options": [
      "some",
      "a",
      "an"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: a or some"
   },
   {
    "kind": "highlight",
    "text": "a · some"
   },
   {
    "kind": "example",
    "en": "I want a sandwich.",
    "ar": "أبي ساندويتش."
   },
   {
    "kind": "example",
    "en": "Can I have some rice?",
    "ar": "ممكن شوية رز؟"
   }
  ],
  "kids": {
   "listTitle": "a · some",
   "cards": [
    {
     "emoji": "🥪",
     "en": "I want a sandwich.",
     "ar": "أبي ساندويتش.",
     "hl": "a"
    },
    {
     "emoji": "🍚",
     "en": "Can I have some rice?",
     "ar": "ممكن شوية رز؟",
     "hl": "some"
    },
    {
     "emoji": "🍌",
     "en": "We bought some bananas.",
     "ar": "اشترينا موز.",
     "hl": "some"
    },
    {
     "emoji": "🧀",
     "en": "There is some cheese in the fridge.",
     "ar": "فيه جبن في الثلاجة.",
     "hl": "some"
    },
    {
     "emoji": "🥚",
     "en": "I ate an egg for breakfast.",
     "ar": "أكلت بيضة على الفطور.",
     "hl": "an"
    },
    {
     "emoji": "🫖",
     "en": "Would you like some tea?",
     "ar": "تبي شاي؟",
     "hl": "some"
    }
   ],
   "say": "a · some I want a sandwich. Can I have some rice? We bought some bananas. There is some cheese in the fridge. I ate an egg for breakfast. Would you like some tea?"
  }
 },
 {
  "id": "jana-40",
  "order": 40,
  "levelId": "l2",
  "titleAr": "تمرين: much أو many",
  "titleEn": "Practice: much or many",
  "content": {
   "explanationAr": "تمرين: many مع الأشياء اللي نعدّها: many cars. و much مع اللي ما نعدّه: much money، much time.",
   "altExplanationAr": "We don't have much time. There are many people here.",
   "example": [
    {
     "en": "We don't have much time.",
     "ar": "ما عندنا وقت كثير."
    },
    {
     "en": "There are many cars on the road.",
     "ar": "فيه سيارات كثير في الطريق."
    },
    {
     "en": "He doesn't spend much money.",
     "ar": "ما يصرف فلوس كثير."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "We don't have ___ time.",
    "options": [
     "many",
     "much",
     "lot"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "There are ___ cars on the road.",
     "options": [
      "much",
      "lot",
      "many"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "He doesn't spend much money.",
     "options": [
      "ما يصرف فلوس كثير.",
      "كم شجرة في الحديقة؟",
      "لا تشرب غازيات كثير."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "How ___ trees are in the park?",
     "options": [
      "much",
      "many",
      "lot"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: much or many"
   },
   {
    "kind": "highlight",
    "text": "much · many"
   },
   {
    "kind": "example",
    "en": "We don't have much time.",
    "ar": "ما عندنا وقت كثير."
   },
   {
    "kind": "example",
    "en": "There are many cars on the road.",
    "ar": "فيه سيارات كثير في الطريق."
   }
  ],
  "kids": {
   "listTitle": "much · many",
   "cards": [
    {
     "emoji": "⏳",
     "en": "We don't have much time.",
     "ar": "ما عندنا وقت كثير.",
     "hl": "much"
    },
    {
     "emoji": "🚘",
     "en": "There are many cars on the road.",
     "ar": "فيه سيارات كثير في الطريق.",
     "hl": "many"
    },
    {
     "emoji": "💰",
     "en": "He doesn't spend much money.",
     "ar": "ما يصرف فلوس كثير.",
     "hl": "much"
    },
    {
     "emoji": "🌳",
     "en": "How many trees are in the park?",
     "ar": "كم شجرة في الحديقة؟",
     "hl": "many"
    },
    {
     "emoji": "🥛",
     "en": "Don't drink too much soda.",
     "ar": "لا تشرب غازيات كثير.",
     "hl": "much"
    },
    {
     "emoji": "📸",
     "en": "She took many pictures.",
     "ar": "أخذت صور كثيرة.",
     "hl": "many"
    }
   ],
   "say": "much · many We don't have much time. There are many cars on the road. He doesn't spend much money. How many trees are in the park? Don't drink too much soda. She took many pictures."
  }
 },
 {
  "id": "jana-41",
  "order": 41,
  "levelId": "l2",
  "titleAr": "تمرين: a few و a little و a lot of",
  "titleEn": "Practice: a few, a little, a lot of",
  "content": {
   "explanationAr": "تمرين: a few (شوية) مع اللي نعدّه، a little (شوية) مع اللي ما نعدّه، a lot of (كثير) مع الاثنين.",
   "altExplanationAr": "I have a few friends and a little money.",
   "example": [
    {
     "en": "I have a few friends at my new school.",
     "ar": "عندي كم صديقة في مدرستي الجديدة."
    },
    {
     "en": "Add a little salt.",
     "ar": "حط شوية ملح."
    },
    {
     "en": "She has a lot of books.",
     "ar": "عندها كتب كثيرة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I have a ___ friends at my new school.",
    "options": [
     "little",
     "much",
     "few"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Add a ___ salt.",
     "options": [
      "little",
      "few",
      "many"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "She has a lot of books.",
     "options": [
      "انتظر كم دقيقة لو سمحت.",
      "عندها كتب كثيرة.",
      "حط شوية عسل في شايك."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Wait a ___ minutes, please.",
     "options": [
      "little",
      "much",
      "few"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: a few, a little, a lot of"
   },
   {
    "kind": "highlight",
    "text": "Quantities"
   },
   {
    "kind": "example",
    "en": "I have a few friends at my new school.",
    "ar": "عندي كم صديقة في مدرستي الجديدة."
   },
   {
    "kind": "example",
    "en": "Add a little salt.",
    "ar": "حط شوية ملح."
   }
  ],
  "kids": {
   "listTitle": "Quantities",
   "cards": [
    {
     "emoji": "👭",
     "en": "I have a few friends at my new school.",
     "ar": "عندي كم صديقة في مدرستي الجديدة.",
     "hl": "few"
    },
    {
     "emoji": "🧂",
     "en": "Add a little salt.",
     "ar": "حط شوية ملح.",
     "hl": "little"
    },
    {
     "emoji": "📚",
     "en": "She has a lot of books.",
     "ar": "عندها كتب كثيرة.",
     "hl": "lot"
    },
    {
     "emoji": "🕐",
     "en": "Wait a few minutes, please.",
     "ar": "انتظر كم دقيقة لو سمحت.",
     "hl": "few"
    },
    {
     "emoji": "🍯",
     "en": "Put a little honey in your tea.",
     "ar": "حط شوية عسل في شايك.",
     "hl": "little"
    },
    {
     "emoji": "🌧️",
     "en": "We had a lot of rain this year.",
     "ar": "جانا مطر كثير هالسنة.",
     "hl": "lot"
    }
   ],
   "say": "Quantities I have a few friends at my new school. Add a little salt. She has a lot of books. Wait a few minutes, please. Put a little honey in your tea. We had a lot of rain this year."
  }
 },
 {
  "id": "jana-42",
  "order": 42,
  "levelId": "l2",
  "titleAr": "تمرين: الصفة قبل الاسم",
  "titleEn": "Practice: Adjective Before Noun",
  "content": {
   "explanationAr": "تمرين: بالإنجليزي الصفة تجي قبل الاسم: a red car (مو a car red). والصفة ما تاخذ s للجمع: big houses.",
   "altExplanationAr": "She has a beautiful voice.",
   "example": [
    {
     "en": "My uncle has a red car.",
     "ar": "عمي عنده سيارة حمرا."
    },
    {
     "en": "She has a beautiful voice.",
     "ar": "صوتها جميل."
    },
    {
     "en": "They live in big houses.",
     "ar": "يسكنون في بيوت كبيرة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "My uncle has a ___ car.",
    "options": [
     "red",
     "reds",
     "redly"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She has a ___ voice.",
     "options": [
      "beauty",
      "beautiful",
      "beautifully"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "They live in big houses.",
     "options": [
      "عندنا كلب صغير أبيض.",
      "أحتاج معطف دافي.",
      "يسكنون في بيوت كبيرة."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We have a small ___ dog.",
     "options": [
      "white",
      "whites",
      "whiter"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Adjective Before Noun"
   },
   {
    "kind": "highlight",
    "text": "Adjectives"
   },
   {
    "kind": "example",
    "en": "My uncle has a red car.",
    "ar": "عمي عنده سيارة حمرا."
   },
   {
    "kind": "example",
    "en": "She has a beautiful voice.",
    "ar": "صوتها جميل."
   }
  ],
  "kids": {
   "listTitle": "Adjectives",
   "cards": [
    {
     "emoji": "🚗",
     "en": "My uncle has a red car.",
     "ar": "عمي عنده سيارة حمرا.",
     "hl": "red"
    },
    {
     "emoji": "🎤",
     "en": "She has a beautiful voice.",
     "ar": "صوتها جميل.",
     "hl": "beautiful"
    },
    {
     "emoji": "🏠",
     "en": "They live in big houses.",
     "ar": "يسكنون في بيوت كبيرة.",
     "hl": "big"
    },
    {
     "emoji": "🐶",
     "en": "We have a small white dog.",
     "ar": "عندنا كلب صغير أبيض.",
     "hl": "white"
    },
    {
     "emoji": "🧥",
     "en": "I need a warm coat.",
     "ar": "أحتاج معطف دافي.",
     "hl": "warm"
    },
    {
     "emoji": "🍉",
     "en": "This is a sweet watermelon.",
     "ar": "هذي بطيخة حالية.",
     "hl": "sweet"
    }
   ],
   "say": "Adjectives My uncle has a red car. She has a beautiful voice. They live in big houses. We have a small white dog. I need a warm coat. This is a sweet watermelon."
  }
 },
 {
  "id": "jana-43",
  "order": 43,
  "levelId": "l2",
  "titleAr": "تمرين: مكان كلمات التكرار",
  "titleEn": "Practice: Where Frequency Words Go",
  "content": {
   "explanationAr": "تمرين: كلمة التكرار تجي قبل الفعل العادي: I always walk. لكن بعد is و am و are: She is always happy.",
   "altExplanationAr": "He is never late. He never comes late.",
   "example": [
    {
     "en": "She is always happy.",
     "ar": "هي دايمًا مبسوطة."
    },
    {
     "en": "I often walk after dinner.",
     "ar": "كثير أمشي بعد العشا."
    },
    {
     "en": "He is never late for work.",
     "ar": "ما يتأخر أبدًا على الدوام."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "She is ___ happy.",
    "options": [
     "ever",
     "always",
     "soon"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I ___ walk after dinner.",
     "options": [
      "ever",
      "soon",
      "often"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "He is never late for work.",
     "options": [
      "ما يتأخر أبدًا على الدوام.",
      "غالبًا ناكل بيض يوم الجمعة.",
      "خالتي أحيانًا تتصل بالليل."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We ___ eat eggs on Friday.",
     "options": [
      "ever",
      "usually",
      "soon"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Where Frequency Words Go"
   },
   {
    "kind": "highlight",
    "text": "Frequency word order"
   },
   {
    "kind": "example",
    "en": "She is always happy.",
    "ar": "هي دايمًا مبسوطة."
   },
   {
    "kind": "example",
    "en": "I often walk after dinner.",
    "ar": "كثير أمشي بعد العشا."
   }
  ],
  "kids": {
   "listTitle": "Frequency word order",
   "cards": [
    {
     "emoji": "🙂",
     "en": "She is always happy.",
     "ar": "هي دايمًا مبسوطة.",
     "hl": "always"
    },
    {
     "emoji": "🚶",
     "en": "I often walk after dinner.",
     "ar": "كثير أمشي بعد العشا.",
     "hl": "often"
    },
    {
     "emoji": "⏰",
     "en": "He is never late for work.",
     "ar": "ما يتأخر أبدًا على الدوام.",
     "hl": "never"
    },
    {
     "emoji": "🍳",
     "en": "We usually eat eggs on Friday.",
     "ar": "غالبًا ناكل بيض يوم الجمعة.",
     "hl": "usually"
    },
    {
     "emoji": "📞",
     "en": "My aunt sometimes calls at night.",
     "ar": "خالتي أحيانًا تتصل بالليل.",
     "hl": "sometimes"
    },
    {
     "emoji": "🧹",
     "en": "They are usually busy in the morning.",
     "ar": "غالبًا يكونون مشغولين الصبح.",
     "hl": "usually"
    }
   ],
   "say": "Frequency word order She is always happy. I often walk after dinner. He is never late for work. We usually eat eggs on Friday. My aunt sometimes calls at night. They are usually busy in the morning."
  }
 },
 {
  "id": "jana-44",
  "order": 44,
  "levelId": "l2",
  "titleAr": "تمرين: next to و between و behind",
  "titleEn": "Practice: Place Words",
  "content": {
   "explanationAr": "تمرين كلمات المكان: next to جنب، between بين، behind ورا، in front of قدام، opposite مقابل، above فوق.",
   "altExplanationAr": "The clock is above the door.",
   "example": [
    {
     "en": "The clock is above the door.",
     "ar": "الساعة فوق الباب."
    },
    {
     "en": "The lamp is next to the sofa.",
     "ar": "الأباجورة جنب الكنبة."
    },
    {
     "en": "The teddy is between the pillows.",
     "ar": "الدبدوب بين المخدات."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "The clock is ___ the door.",
    "options": [
     "below",
     "between",
     "above"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The lamp is ___ to the sofa.",
     "options": [
      "next",
      "above",
      "between"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "The teddy is between the pillows.",
     "options": [
      "الصيدلية مقابل المستشفى.",
      "الدبدوب بين المخدات.",
      "سيكلي ورا الكراج."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The pharmacy is ___ the hospital.",
     "options": [
      "above",
      "between",
      "opposite"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Place Words"
   },
   {
    "kind": "highlight",
    "text": "Place prepositions"
   },
   {
    "kind": "example",
    "en": "The clock is above the door.",
    "ar": "الساعة فوق الباب."
   },
   {
    "kind": "example",
    "en": "The lamp is next to the sofa.",
    "ar": "الأباجورة جنب الكنبة."
   }
  ],
  "kids": {
   "listTitle": "Place prepositions",
   "cards": [
    {
     "emoji": "🕰️",
     "en": "The clock is above the door.",
     "ar": "الساعة فوق الباب.",
     "hl": "above"
    },
    {
     "emoji": "🛋️",
     "en": "The lamp is next to the sofa.",
     "ar": "الأباجورة جنب الكنبة.",
     "hl": "next"
    },
    {
     "emoji": "🧸",
     "en": "The teddy is between the pillows.",
     "ar": "الدبدوب بين المخدات.",
     "hl": "between"
    },
    {
     "emoji": "🏥",
     "en": "The pharmacy is opposite the hospital.",
     "ar": "الصيدلية مقابل المستشفى.",
     "hl": "opposite"
    },
    {
     "emoji": "🚲",
     "en": "My bike is behind the garage.",
     "ar": "سيكلي ورا الكراج.",
     "hl": "behind"
    },
    {
     "emoji": "🌴",
     "en": "There's a palm tree in front of the school.",
     "ar": "فيه نخلة قدام المدرسة.",
     "hl": "front"
    }
   ],
   "say": "Place prepositions The clock is above the door. The lamp is next to the sofa. The teddy is between the pillows. The pharmacy is opposite the hospital. My bike is behind the garage. There's a palm tree in front of the school."
  }
 },
 {
  "id": "jana-45",
  "order": 45,
  "levelId": "l2",
  "titleAr": "تمرين: كلمات الحركة",
  "titleEn": "Practice: into, out of, across",
  "content": {
   "explanationAr": "تمرين كلمات الحركة: into لداخل، out of لبرا، up فوق، down تحت، across من جهة لجهة، through من خلال.",
   "altExplanationAr": "The cat jumped into the box.",
   "example": [
    {
     "en": "The cat jumped into the box.",
     "ar": "القطة نطت داخل الصندوق."
    },
    {
     "en": "She ran out of the room.",
     "ar": "ركضت برا الغرفة."
    },
    {
     "en": "Walk across the street carefully.",
     "ar": "امش من الجهة الثانية للشارع بحذر."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "The cat jumped ___ the box.",
    "options": [
     "into",
     "onto",
     "out"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She ran ___ of the room.",
     "options": [
      "into",
      "out",
      "up"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Walk across the street carefully.",
     "options": [
      "القطار يمشي داخل النفق.",
      "اطلع السلم بشويش.",
      "امش من الجهة الثانية للشارع بحذر."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The train goes ___ the tunnel.",
     "options": [
      "through",
      "across",
      "onto"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: into, out of, across"
   },
   {
    "kind": "highlight",
    "text": "Movement"
   },
   {
    "kind": "example",
    "en": "The cat jumped into the box.",
    "ar": "القطة نطت داخل الصندوق."
   },
   {
    "kind": "example",
    "en": "She ran out of the room.",
    "ar": "ركضت برا الغرفة."
   }
  ],
  "kids": {
   "listTitle": "Movement",
   "cards": [
    {
     "emoji": "📦",
     "en": "The cat jumped into the box.",
     "ar": "القطة نطت داخل الصندوق.",
     "hl": "into"
    },
    {
     "emoji": "🚪",
     "en": "She ran out of the room.",
     "ar": "ركضت برا الغرفة.",
     "hl": "out"
    },
    {
     "emoji": "🛣️",
     "en": "Walk across the street carefully.",
     "ar": "امش من الجهة الثانية للشارع بحذر.",
     "hl": "across"
    },
    {
     "emoji": "🌳",
     "en": "The train goes through the tunnel.",
     "ar": "القطار يمشي داخل النفق.",
     "hl": "through"
    },
    {
     "emoji": "🪜",
     "en": "Climb up the ladder slowly.",
     "ar": "اطلع السلم بشويش.",
     "hl": "up"
    },
    {
     "emoji": "🛝",
     "en": "The kids slide down the slide.",
     "ar": "الأطفال يتزحلقون نازلين.",
     "hl": "down"
    }
   ],
   "say": "Movement The cat jumped into the box. She ran out of the room. Walk across the street carefully. The train goes through the tunnel. Climb up the ladder slowly. The kids slide down the slide."
  }
 },
 {
  "id": "jana-46",
  "order": 46,
  "levelId": "l2",
  "titleAr": "تمرين: before و after",
  "titleEn": "Practice: before and after",
  "content": {
   "explanationAr": "تمرين: before يعني قبل، و after يعني بعد: Wash your hands before eating. Rest after work.",
   "altExplanationAr": "Wash before meals. Rest after work.",
   "example": [
    {
     "en": "Wash your hands before meals.",
     "ar": "اغسل يدينك قبل الوجبات."
    },
    {
     "en": "Dad rests after work.",
     "ar": "أبوي يرتاح بعد الدوام."
    },
    {
     "en": "We eat breakfast after Fajr.",
     "ar": "نفطر بعد الفجر."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Wash your hands ___ meals.",
    "options": [
     "after",
     "before",
     "during"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Dad rests ___ work.",
     "options": [
      "before",
      "until",
      "after"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "We eat breakfast after Fajr.",
     "options": [
      "نفطر بعد الفجر.",
      "تمدد قبل الركض.",
      "لا تسبح على طول بعد الغدا."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Stretch ___ running.",
     "options": [
      "after",
      "before",
      "until"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: before and after"
   },
   {
    "kind": "highlight",
    "text": "before · after"
   },
   {
    "kind": "example",
    "en": "Wash your hands before meals.",
    "ar": "اغسل يدينك قبل الوجبات."
   },
   {
    "kind": "example",
    "en": "Dad rests after work.",
    "ar": "أبوي يرتاح بعد الدوام."
   }
  ],
  "kids": {
   "listTitle": "before · after",
   "cards": [
    {
     "emoji": "🧼",
     "en": "Wash your hands before meals.",
     "ar": "اغسل يدينك قبل الوجبات.",
     "hl": "before"
    },
    {
     "emoji": "🛋️",
     "en": "Dad rests after work.",
     "ar": "أبوي يرتاح بعد الدوام.",
     "hl": "after"
    },
    {
     "emoji": "🌅",
     "en": "We eat breakfast after Fajr.",
     "ar": "نفطر بعد الفجر.",
     "hl": "after"
    },
    {
     "emoji": "👟",
     "en": "Stretch before running.",
     "ar": "تمدد قبل الركض.",
     "hl": "before"
    },
    {
     "emoji": "🍽️",
     "en": "Don't swim right after lunch.",
     "ar": "لا تسبح على طول بعد الغدا.",
     "hl": "after"
    },
    {
     "emoji": "🛏️",
     "en": "Read a story before bed.",
     "ar": "اقرأ قصة قبل النوم.",
     "hl": "before"
    }
   ],
   "say": "before · after Wash your hands before meals. Dad rests after work. We eat breakfast after Fajr. Stretch before running. Don't swim right after lunch. Read a story before bed."
  }
 },
 {
  "id": "jana-47",
  "order": 47,
  "levelId": "l2",
  "titleAr": "تمرين: الأول والثاني",
  "titleEn": "Practice: first, second, third",
  "content": {
   "explanationAr": "تمرين الأرقام الترتيبية: first الأول، second الثاني، third الثالث، fourth الرابع، fifth الخامس، tenth العاشر.",
   "altExplanationAr": "She came first in the race.",
   "example": [
    {
     "en": "She came first in the race.",
     "ar": "طلعت الأولى في السباق."
    },
    {
     "en": "My brother came second.",
     "ar": "أخوي طلع الثاني."
    },
    {
     "en": "We live on the third floor.",
     "ar": "نسكن في الدور الثالث."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "She came ___ in the race.",
    "options": [
     "one",
     "once",
     "first"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "My brother came ___.",
     "options": [
      "second",
      "two",
      "twice"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "We live on the third floor.",
     "options": [
      "اليوم خامس يوم لي في الشغل.",
      "نسكن في الدور الثالث.",
      "عيد ميلاد أخوي العاشر."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Today is my ___ day at work.",
     "options": [
      "five",
      "fifty",
      "fifth"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: first, second, third"
   },
   {
    "kind": "highlight",
    "text": "Ordinal numbers"
   },
   {
    "kind": "example",
    "en": "She came first in the race.",
    "ar": "طلعت الأولى في السباق."
   },
   {
    "kind": "example",
    "en": "My brother came second.",
    "ar": "أخوي طلع الثاني."
   }
  ],
  "kids": {
   "listTitle": "Ordinal numbers",
   "cards": [
    {
     "emoji": "🥇",
     "en": "She came first in the race.",
     "ar": "طلعت الأولى في السباق.",
     "hl": "first"
    },
    {
     "emoji": "🥈",
     "en": "My brother came second.",
     "ar": "أخوي طلع الثاني.",
     "hl": "second"
    },
    {
     "emoji": "🏢",
     "en": "We live on the third floor.",
     "ar": "نسكن في الدور الثالث.",
     "hl": "third"
    },
    {
     "emoji": "📅",
     "en": "Today is my fifth day at work.",
     "ar": "اليوم خامس يوم لي في الشغل.",
     "hl": "fifth"
    },
    {
     "emoji": "🎂",
     "en": "It's my brother's tenth birthday.",
     "ar": "عيد ميلاد أخوي العاشر.",
     "hl": "tenth"
    },
    {
     "emoji": "🚪",
     "en": "Take the fourth door on the left.",
     "ar": "خذ الباب الرابع على اليسار.",
     "hl": "fourth"
    }
   ],
   "say": "Ordinal numbers She came first in the race. My brother came second. We live on the third floor. Today is my fifth day at work. It's my brother's tenth birthday. Take the fourth door on the left."
  }
 },
 {
  "id": "jana-48",
  "order": 48,
  "levelId": "l2",
  "titleAr": "تمرين: التواريخ والشهور",
  "titleEn": "Practice: Dates and Months",
  "content": {
   "explanationAr": "تمرين التواريخ: نقول on مع التاريخ: on the 5th of May، و in مع الشهر: in March.",
   "altExplanationAr": "My birthday is on the 3rd of June.",
   "example": [
    {
     "en": "My birthday is on the 3rd of June.",
     "ar": "يوم ميلادي في ٣ يونيو."
    },
    {
     "en": "Spring starts in March.",
     "ar": "الربيع يبدأ في مارس."
    },
    {
     "en": "National Day is on the 23rd of September.",
     "ar": "اليوم الوطني في ٢٣ سبتمبر."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "My birthday is ___ the 3rd of June.",
    "options": [
     "on",
     "in",
     "at"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Spring starts ___ March.",
     "options": [
      "on",
      "in",
      "at"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "National Day is on the 23rd of September.",
     "options": [
      "المدرسة تخلص في يونيو.",
      "كم التاريخ اليوم؟",
      "اليوم الوطني في ٢٣ سبتمبر."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "School finishes ___ June.",
     "options": [
      "in",
      "on",
      "at"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Dates and Months"
   },
   {
    "kind": "highlight",
    "text": "Dates"
   },
   {
    "kind": "example",
    "en": "My birthday is on the 3rd of June.",
    "ar": "يوم ميلادي في ٣ يونيو."
   },
   {
    "kind": "example",
    "en": "Spring starts in March.",
    "ar": "الربيع يبدأ في مارس."
   }
  ],
  "kids": {
   "listTitle": "Dates",
   "cards": [
    {
     "emoji": "🎂",
     "en": "My birthday is on the 3rd of June.",
     "ar": "يوم ميلادي في ٣ يونيو.",
     "hl": "on"
    },
    {
     "emoji": "🌸",
     "en": "Spring starts in March.",
     "ar": "الربيع يبدأ في مارس.",
     "hl": "in"
    },
    {
     "emoji": "🇸🇦",
     "en": "National Day is on the 23rd of September.",
     "ar": "اليوم الوطني في ٢٣ سبتمبر.",
     "hl": "on"
    },
    {
     "emoji": "🏫",
     "en": "School finishes in June.",
     "ar": "المدرسة تخلص في يونيو.",
     "hl": "in"
    },
    {
     "emoji": "📅",
     "en": "What's the date today?",
     "ar": "كم التاريخ اليوم؟",
     "hl": "date"
    },
    {
     "emoji": "🗓️",
     "en": "February is the shortest month.",
     "ar": "فبراير أقصر شهر.",
     "hl": "shortest"
    }
   ],
   "say": "Dates My birthday is on the 3rd of June. Spring starts in March. National Day is on the 23rd of September. School finishes in June. What's the date today? February is the shortest month."
  }
 },
 {
  "id": "jana-49",
  "order": 49,
  "levelId": "l2",
  "titleAr": "تمرين: ربع ونص",
  "titleEn": "Practice: Quarter Past, Quarter To",
  "content": {
   "explanationAr": "تمرين الوقت: quarter past: وربع، half past: ونص، quarter to: إلا ربع. It's quarter to eight: ثمان إلا ربع.",
   "altExplanationAr": "It's quarter past three: ثلاث وربع.",
   "example": [
    {
     "en": "It's quarter past three.",
     "ar": "الساعة ثلاث وربع."
    },
    {
     "en": "It's half past seven.",
     "ar": "الساعة سبع ونص."
    },
    {
     "en": "It's quarter to eight.",
     "ar": "الساعة ثمان إلا ربع."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "It's quarter ___ three.",
    "options": [
     "to",
     "past",
     "after"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "It's ___ past seven.",
     "options": [
      "quarter",
      "middle",
      "half"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "It's quarter to eight.",
     "options": [
      "الساعة ثمان إلا ربع.",
      "الباص يجي الساعة تسع وعشر دقايق.",
      "البرنامج يبدأ الساعة ست إلا ثلث."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The bus comes at ten ___ nine.",
     "options": [
      "to",
      "past",
      "after"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Quarter Past, Quarter To"
   },
   {
    "kind": "highlight",
    "text": "Telling the time"
   },
   {
    "kind": "example",
    "en": "It's quarter past three.",
    "ar": "الساعة ثلاث وربع."
   },
   {
    "kind": "example",
    "en": "It's half past seven.",
    "ar": "الساعة سبع ونص."
   }
  ],
  "kids": {
   "listTitle": "Telling the time",
   "cards": [
    {
     "emoji": "🕒",
     "en": "It's quarter past three.",
     "ar": "الساعة ثلاث وربع.",
     "hl": "past"
    },
    {
     "emoji": "🕢",
     "en": "It's half past seven.",
     "ar": "الساعة سبع ونص.",
     "hl": "half"
    },
    {
     "emoji": "🕗",
     "en": "It's quarter to eight.",
     "ar": "الساعة ثمان إلا ربع.",
     "hl": "to"
    },
    {
     "emoji": "🚌",
     "en": "The bus comes at ten past nine.",
     "ar": "الباص يجي الساعة تسع وعشر دقايق.",
     "hl": "past"
    },
    {
     "emoji": "📺",
     "en": "The show starts at twenty to six.",
     "ar": "البرنامج يبدأ الساعة ست إلا ثلث.",
     "hl": "to"
    },
    {
     "emoji": "🕛",
     "en": "Lunch is at twelve o'clock.",
     "ar": "الغدا الساعة ثنعش.",
     "hl": "o'clock"
    }
   ],
   "say": "Telling the time It's quarter past three. It's half past seven. It's quarter to eight. The bus comes at ten past nine. The show starts at twenty to six. Lunch is at twelve o'clock."
  }
 },
 {
  "id": "jana-50",
  "order": 50,
  "levelId": "l2",
  "titleAr": "تمرين: تهجئة ing",
  "titleEn": "Practice: running, making, sitting",
  "content": {
   "explanationAr": "تمرين تهجئة ing: make ← making (نشيل e)، run ← running (نكرر الحرف)، sit ← sitting، lie ← lying.",
   "altExplanationAr": "She is making tea. He is running.",
   "example": [
    {
     "en": "Mom is making tea.",
     "ar": "ماما تسوي شاي."
    },
    {
     "en": "The boy is running fast.",
     "ar": "الولد يركض بسرعة."
    },
    {
     "en": "Who is sitting next to you?",
     "ar": "مين جالس جنبك؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Mom is ___ tea.",
    "options": [
     "makeing",
     "makking",
     "making"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The boy is ___ fast.",
     "options": [
      "running",
      "runing",
      "runeing"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Who is sitting next to you?",
     "options": [
      "يسبحون في المسبح.",
      "مين جالس جنبك؟",
      "تكتب قصة."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "They are ___ in the pool.",
     "options": [
      "swiming",
      "swimeing",
      "swimming"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: running, making, sitting"
   },
   {
    "kind": "highlight",
    "text": "-ing spelling"
   },
   {
    "kind": "example",
    "en": "Mom is making tea.",
    "ar": "ماما تسوي شاي."
   },
   {
    "kind": "example",
    "en": "The boy is running fast.",
    "ar": "الولد يركض بسرعة."
   }
  ],
  "kids": {
   "listTitle": "-ing spelling",
   "cards": [
    {
     "emoji": "🫖",
     "en": "Mom is making tea.",
     "ar": "ماما تسوي شاي.",
     "hl": "making"
    },
    {
     "emoji": "🏃",
     "en": "The boy is running fast.",
     "ar": "الولد يركض بسرعة.",
     "hl": "running"
    },
    {
     "emoji": "🪑",
     "en": "Who is sitting next to you?",
     "ar": "مين جالس جنبك؟",
     "hl": "sitting"
    },
    {
     "emoji": "🏊",
     "en": "They are swimming in the pool.",
     "ar": "يسبحون في المسبح.",
     "hl": "swimming"
    },
    {
     "emoji": "✍️",
     "en": "She is writing a story.",
     "ar": "تكتب قصة.",
     "hl": "writing"
    },
    {
     "emoji": "🛌",
     "en": "The cat is lying on the sofa.",
     "ar": "القطة منسدحة على الكنبة.",
     "hl": "lying"
    }
   ],
   "say": "-ing spelling Mom is making tea. The boy is running fast. Who is sitting next to you? They are swimming in the pool. She is writing a story. The cat is lying on the sofa."
  }
 },
 {
  "id": "jana-51",
  "order": 51,
  "levelId": "l2",
  "titleAr": "تمرين: like و love و enjoy مع ing",
  "titleEn": "Practice: I enjoy reading",
  "content": {
   "explanationAr": "تمرين: بعد like و love و enjoy و hate و finish يجي الفعل مع ing: I enjoy drawing. She finished eating.",
   "altExplanationAr": "He hates getting up early.",
   "example": [
    {
     "en": "I enjoy drawing animals.",
     "ar": "أستمتع برسم الحيوانات."
    },
    {
     "en": "She finished eating.",
     "ar": "خلصت أكل."
    },
    {
     "en": "He hates getting up early.",
     "ar": "يكره يصحى بدري."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I enjoy ___ animals.",
    "options": [
     "drawing",
     "draw",
     "draws"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She finished ___.",
     "options": [
      "eat",
      "eating",
      "eats"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "He hates getting up early.",
     "options": [
      "خالاتي يحبون التسوق.",
      "تحب التسلق؟",
      "يكره يصحى بدري."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "My aunts love ___.",
     "options": [
      "shopping",
      "shop",
      "shops"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: I enjoy reading"
   },
   {
    "kind": "highlight",
    "text": "Verb + ing"
   },
   {
    "kind": "example",
    "en": "I enjoy drawing animals.",
    "ar": "أستمتع برسم الحيوانات."
   },
   {
    "kind": "example",
    "en": "She finished eating.",
    "ar": "خلصت أكل."
   }
  ],
  "kids": {
   "listTitle": "Verb + ing",
   "cards": [
    {
     "emoji": "🖍️",
     "en": "I enjoy drawing animals.",
     "ar": "أستمتع برسم الحيوانات.",
     "hl": "drawing"
    },
    {
     "emoji": "🍽️",
     "en": "She finished eating.",
     "ar": "خلصت أكل.",
     "hl": "eating"
    },
    {
     "emoji": "⏰",
     "en": "He hates getting up early.",
     "ar": "يكره يصحى بدري.",
     "hl": "getting"
    },
    {
     "emoji": "🛍️",
     "en": "My aunts love shopping.",
     "ar": "خالاتي يحبون التسوق.",
     "hl": "shopping"
    },
    {
     "emoji": "🧗",
     "en": "Do you like climbing?",
     "ar": "تحب التسلق؟",
     "hl": "climbing"
    },
    {
     "emoji": "🎻",
     "en": "We enjoy listening to music.",
     "ar": "نستمتع بسماع الموسيقى.",
     "hl": "listening"
    }
   ],
   "say": "Verb + ing I enjoy drawing animals. She finished eating. He hates getting up early. My aunts love shopping. Do you like climbing? We enjoy listening to music."
  }
 },
 {
  "id": "jana-52",
  "order": 52,
  "levelId": "l2",
  "titleAr": "تمرين: am/is/are + ing أو المضارع",
  "titleEn": "Practice: Now or Usually?",
  "content": {
   "explanationAr": "تمرين: إذا فيه now أو Look! نستخدم ing. وإذا فيه every day أو usually نستخدم المضارع البسيط.",
   "altExplanationAr": "He usually walks, but today he is driving.",
   "example": [
    {
     "en": "He usually walks to work.",
     "ar": "غالبًا يمشي للدوام."
    },
    {
     "en": "Today he is driving.",
     "ar": "اليوم يسوق."
    },
    {
     "en": "Look! The bird is flying.",
     "ar": "شوف! الطير يطير."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "He usually ___ to work.",
    "options": [
     "is walking",
     "walks",
     "walk"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Today he is ___.",
     "options": [
      "drives",
      "drive",
      "driving"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Look! The bird is flying.",
     "options": [
      "شوف! الطير يطير.",
      "الطيور تطير للجنوب في الشتاء.",
      "اهدوا. جدي يقرأ."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Birds ___ south in winter.",
     "options": [
      "are flying",
      "fly",
      "flies"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Now or Usually?"
   },
   {
    "kind": "highlight",
    "text": "Simple vs continuous"
   },
   {
    "kind": "example",
    "en": "He usually walks to work.",
    "ar": "غالبًا يمشي للدوام."
   },
   {
    "kind": "example",
    "en": "Today he is driving.",
    "ar": "اليوم يسوق."
   }
  ],
  "kids": {
   "listTitle": "Simple vs continuous",
   "cards": [
    {
     "emoji": "🚶",
     "en": "He usually walks to work.",
     "ar": "غالبًا يمشي للدوام.",
     "hl": "walks"
    },
    {
     "emoji": "🚗",
     "en": "Today he is driving.",
     "ar": "اليوم يسوق.",
     "hl": "driving"
    },
    {
     "emoji": "👀",
     "en": "Look! The bird is flying.",
     "ar": "شوف! الطير يطير.",
     "hl": "flying"
    },
    {
     "emoji": "🦅",
     "en": "Birds fly south in winter.",
     "ar": "الطيور تطير للجنوب في الشتاء.",
     "hl": "fly"
    },
    {
     "emoji": "📖",
     "en": "Be quiet. Grandpa is reading.",
     "ar": "اهدوا. جدي يقرأ.",
     "hl": "reading"
    },
    {
     "emoji": "📰",
     "en": "Grandpa reads the paper every morning.",
     "ar": "جدي يقرأ الجريدة كل صباح.",
     "hl": "reads"
    }
   ],
   "say": "Simple vs continuous He usually walks to work. Today he is driving. Look! The bird is flying. Birds fly south in winter. Be quiet. Grandpa is reading. Grandpa reads the paper every morning."
  }
 },
 {
  "id": "jana-53",
  "order": 53,
  "levelId": "l2",
  "titleAr": "تمرين: have got و has got",
  "titleEn": "Practice: have got, has got",
  "content": {
   "explanationAr": "تمرين: have got و has got معناها «عندي أو عنده» بأسلوب بريطاني: I have got a cat. She has got blue eyes.",
   "altExplanationAr": "Have you got a pen? Yes, I have.",
   "example": [
    {
     "en": "I have got a black cat.",
     "ar": "عندي قطة سودا."
    },
    {
     "en": "She has got blue eyes.",
     "ar": "عيونها زرق."
    },
    {
     "en": "Have you got a pen?",
     "ar": "عندك قلم؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I have ___ a black cat.",
    "options": [
     "get",
     "gotten",
     "got"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She ___ got blue eyes.",
     "options": [
      "has",
      "have",
      "is"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Have you got a pen?",
     "options": [
      "ما عنده سيكل.",
      "عندك قلم؟",
      "عندنا ولدين."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He ___ got a bike.",
     "options": [
      "haven't",
      "isn't",
      "hasn't"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: have got, has got"
   },
   {
    "kind": "highlight",
    "text": "have got"
   },
   {
    "kind": "example",
    "en": "I have got a black cat.",
    "ar": "عندي قطة سودا."
   },
   {
    "kind": "example",
    "en": "She has got blue eyes.",
    "ar": "عيونها زرق."
   }
  ],
  "kids": {
   "listTitle": "have got",
   "cards": [
    {
     "emoji": "🐈",
     "en": "I have got a black cat.",
     "ar": "عندي قطة سودا.",
     "hl": "got"
    },
    {
     "emoji": "👁️",
     "en": "She has got blue eyes.",
     "ar": "عيونها زرق.",
     "hl": "has"
    },
    {
     "emoji": "✏️",
     "en": "Have you got a pen?",
     "ar": "عندك قلم؟",
     "hl": "Have"
    },
    {
     "emoji": "🚲",
     "en": "He hasn't got a bike.",
     "ar": "ما عنده سيكل.",
     "hl": "hasn't"
    },
    {
     "emoji": "🧒",
     "en": "We have got two kids.",
     "ar": "عندنا ولدين.",
     "hl": "have"
    },
    {
     "emoji": "🤧",
     "en": "Has your brother got a cold?",
     "ar": "أخوك مزكوم؟",
     "hl": "Has"
    }
   ],
   "say": "have got I have got a black cat. She has got blue eyes. Have you got a pen? He hasn't got a bike. We have got two kids. Has your brother got a cold?"
  }
 },
 {
  "id": "jana-54",
  "order": 54,
  "levelId": "l2",
  "titleAr": "تمرين: can للقدرة والإذن",
  "titleEn": "Practice: can for Ability and Permission",
  "content": {
   "explanationAr": "تمرين: can للقدرة: I can cook. وللإذن: You can go now. والنفي can't.",
   "altExplanationAr": "Can I go? Yes, you can.",
   "example": [
    {
     "en": "My sister can cook kabsa.",
     "ar": "أختي تعرف تطبخ كبسة."
    },
    {
     "en": "You can go home now.",
     "ar": "تقدر تروح البيت الحين."
    },
    {
     "en": "Penguins can't fly.",
     "ar": "البطاريق ما تطير."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "My sister ___ cook kabsa.",
    "options": [
     "can",
     "cans",
     "canned"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "You ___ go home now.",
     "options": [
      "cans",
      "can",
      "canning"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Penguins can't fly.",
     "options": [
      "ممكن آكل هالشوكولاتة؟",
      "بيبيكم يتكلم للحين؟",
      "البطاريق ما تطير."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ I eat this chocolate?",
     "options": [
      "Can",
      "Am",
      "Does"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: can for Ability and Permission"
   },
   {
    "kind": "highlight",
    "text": "can"
   },
   {
    "kind": "example",
    "en": "My sister can cook kabsa.",
    "ar": "أختي تعرف تطبخ كبسة."
   },
   {
    "kind": "example",
    "en": "You can go home now.",
    "ar": "تقدر تروح البيت الحين."
   }
  ],
  "kids": {
   "listTitle": "can",
   "cards": [
    {
     "emoji": "👩‍🍳",
     "en": "My sister can cook kabsa.",
     "ar": "أختي تعرف تطبخ كبسة.",
     "hl": "can"
    },
    {
     "emoji": "🚪",
     "en": "You can go home now.",
     "ar": "تقدر تروح البيت الحين.",
     "hl": "can"
    },
    {
     "emoji": "🐧",
     "en": "Penguins can't fly.",
     "ar": "البطاريق ما تطير.",
     "hl": "can't"
    },
    {
     "emoji": "🍫",
     "en": "Can I eat this chocolate?",
     "ar": "ممكن آكل هالشوكولاتة؟",
     "hl": "Can"
    },
    {
     "emoji": "🗣️",
     "en": "Can your baby talk yet?",
     "ar": "بيبيكم يتكلم للحين؟",
     "hl": "talk"
    },
    {
     "emoji": "🚫",
     "en": "Sorry, you can't come in.",
     "ar": "آسف، ما تقدر تدخل.",
     "hl": "can't"
    }
   ],
   "say": "can My sister can cook kabsa. You can go home now. Penguins can't fly. Can I eat this chocolate? Can your baby talk yet? Sorry, you can't come in."
  }
 },
 {
  "id": "jana-55",
  "order": 55,
  "levelId": "l2",
  "titleAr": "تمرين: الأوامر",
  "titleEn": "Practice: Instructions",
  "content": {
   "explanationAr": "تمرين: الأمر يبدأ بالفعل: Turn left. Mix the flour. والنهي Don't: Don't forget your bag.",
   "altExplanationAr": "Mix the eggs, then add the milk.",
   "example": [
    {
     "en": "Mix the flour and the eggs.",
     "ar": "اخلط الطحين مع البيض."
    },
    {
     "en": "Then add the milk.",
     "ar": "بعدين أضف الحليب."
    },
    {
     "en": "Don't forget your bag.",
     "ar": "لا تنسى شنطتك."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ the flour and the eggs.",
    "options": [
     "Mixes",
     "Mix",
     "Mixing"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Then ___ the milk.",
     "options": [
      "adds",
      "adding",
      "add"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Don't forget your bag.",
     "options": [
      "لا تنسى شنطتك.",
      "لف يسار عند الزاوية.",
      "لا تصارخ لو سمحت."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ left at the corner.",
     "options": [
      "Turns",
      "Turn",
      "Turning"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Instructions"
   },
   {
    "kind": "highlight",
    "text": "Imperatives"
   },
   {
    "kind": "example",
    "en": "Mix the flour and the eggs.",
    "ar": "اخلط الطحين مع البيض."
   },
   {
    "kind": "example",
    "en": "Then add the milk.",
    "ar": "بعدين أضف الحليب."
   }
  ],
  "kids": {
   "listTitle": "Imperatives",
   "cards": [
    {
     "emoji": "🥣",
     "en": "Mix the flour and the eggs.",
     "ar": "اخلط الطحين مع البيض.",
     "hl": "Mix"
    },
    {
     "emoji": "🥛",
     "en": "Then add the milk.",
     "ar": "بعدين أضف الحليب.",
     "hl": "add"
    },
    {
     "emoji": "🎒",
     "en": "Don't forget your bag.",
     "ar": "لا تنسى شنطتك.",
     "hl": "Don't"
    },
    {
     "emoji": "↩️",
     "en": "Turn left at the corner.",
     "ar": "لف يسار عند الزاوية.",
     "hl": "Turn"
    },
    {
     "emoji": "🔊",
     "en": "Don't shout, please.",
     "ar": "لا تصارخ لو سمحت.",
     "hl": "Don't"
    },
    {
     "emoji": "💡",
     "en": "Switch off the lights before you leave.",
     "ar": "طفّ الأنوار قبل ما تطلع.",
     "hl": "Switch"
    }
   ],
   "say": "Imperatives Mix the flour and the eggs. Then add the milk. Don't forget your bag. Turn left at the corner. Don't shout, please. Switch off the lights before you leave."
  }
 },
 {
  "id": "jana-56",
  "order": 56,
  "levelId": "l2",
  "titleAr": "تمرين: ترتيب السؤال",
  "titleEn": "Practice: Question Word Order",
  "content": {
   "explanationAr": "تمرين ترتيب السؤال: كلمة السؤال، بعدها do أو does أو is أو are، بعدها الشخص، بعدها الفعل: Where does she live?",
   "altExplanationAr": "What do you want? مو What you want?",
   "example": [
    {
     "en": "Where does she live?",
     "ar": "وين تسكن؟"
    },
    {
     "en": "What do you want to buy?",
     "ar": "وش تبي تشتري؟"
    },
    {
     "en": "When is dinner ready?",
     "ar": "متى العشا جاهز؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Where ___ she live?",
    "options": [
     "do",
     "is",
     "does"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "What ___ you want to buy?",
     "options": [
      "do",
      "does",
      "are"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "When is dinner ready?",
     "options": [
      "ليش متأخر؟",
      "متى العشا جاهز؟",
      "وش يشتغل أبوك؟"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Why ___ you late?",
     "options": [
      "do",
      "does",
      "are"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Question Word Order"
   },
   {
    "kind": "highlight",
    "text": "Question order"
   },
   {
    "kind": "example",
    "en": "Where does she live?",
    "ar": "وين تسكن؟"
   },
   {
    "kind": "example",
    "en": "What do you want to buy?",
    "ar": "وش تبي تشتري؟"
   }
  ],
  "kids": {
   "listTitle": "Question order",
   "cards": [
    {
     "emoji": "🏡",
     "en": "Where does she live?",
     "ar": "وين تسكن؟",
     "hl": "does"
    },
    {
     "emoji": "🛒",
     "en": "What do you want to buy?",
     "ar": "وش تبي تشتري؟",
     "hl": "do"
    },
    {
     "emoji": "🍽️",
     "en": "When is dinner ready?",
     "ar": "متى العشا جاهز؟",
     "hl": "is"
    },
    {
     "emoji": "🎒",
     "en": "Why are you late?",
     "ar": "ليش متأخر؟",
     "hl": "are"
    },
    {
     "emoji": "🧑‍🔧",
     "en": "What does your father do?",
     "ar": "وش يشتغل أبوك؟",
     "hl": "does"
    },
    {
     "emoji": "🏫",
     "en": "How do your kids go to school?",
     "ar": "كيف يروحون عيالك المدرسة؟",
     "hl": "do"
    }
   ],
   "say": "Question order Where does she live? What do you want to buy? When is dinner ready? Why are you late? What does your father do? How do your kids go to school?"
  }
 },
 {
  "id": "jana-57",
  "order": 57,
  "levelId": "l2",
  "titleAr": "تمرين: كلمات تتشابه",
  "titleEn": "Practice: it's or its, your or you're",
  "content": {
   "explanationAr": "تمرين على كلمات تتشابه: it's: it is، و its: له. you're: you are، و your: لك. they're: they are، و there: هناك، و their: لهم.",
   "altExplanationAr": "It's hot. The dog wagged its tail.",
   "example": [
    {
     "en": "It's very hot today.",
     "ar": "الجو حر مرة اليوم."
    },
    {
     "en": "The dog wagged its tail.",
     "ar": "الكلب هز ذيله."
    },
    {
     "en": "You're a great friend.",
     "ar": "أنت صديق رهيب."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ very hot today.",
    "options": [
     "It's",
     "Its",
     "It"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The dog wagged ___ tail.",
     "options": [
      "it's",
      "its",
      "it"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "You're a great friend.",
     "options": [
      "هذي كابك؟",
      "حط الصندوق هناك.",
      "أنت صديق رهيب."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Is this ___ cap?",
     "options": [
      "your",
      "you're",
      "you"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: it's or its, your or you're"
   },
   {
    "kind": "highlight",
    "text": "Look-alike words"
   },
   {
    "kind": "example",
    "en": "It's very hot today.",
    "ar": "الجو حر مرة اليوم."
   },
   {
    "kind": "example",
    "en": "The dog wagged its tail.",
    "ar": "الكلب هز ذيله."
   }
  ],
  "kids": {
   "listTitle": "Look-alike words",
   "cards": [
    {
     "emoji": "☀️",
     "en": "It's very hot today.",
     "ar": "الجو حر مرة اليوم.",
     "hl": "It's"
    },
    {
     "emoji": "🐕",
     "en": "The dog wagged its tail.",
     "ar": "الكلب هز ذيله.",
     "hl": "its"
    },
    {
     "emoji": "🙌",
     "en": "You're a great friend.",
     "ar": "أنت صديق رهيب.",
     "hl": "You're"
    },
    {
     "emoji": "🧢",
     "en": "Is this your cap?",
     "ar": "هذي كابك؟",
     "hl": "your"
    },
    {
     "emoji": "📍",
     "en": "Put the box over there.",
     "ar": "حط الصندوق هناك.",
     "hl": "there"
    },
    {
     "emoji": "🏃",
     "en": "They're running to the bus.",
     "ar": "يركضون للباص.",
     "hl": "They're"
    }
   ],
   "say": "Look-alike words It's very hot today. The dog wagged its tail. You're a great friend. Is this your cap? Put the box over there. They're running to the bus."
  }
 },
 {
  "id": "jana-58",
  "order": 58,
  "levelId": "l2",
  "titleAr": "مراجعة: الضمائر والكلمات الصغيرة",
  "titleEn": "Review: Pronouns and Little Words",
  "content": {
   "explanationAr": "مراجعة الضمائر و this و these و a و some و much و many.",
   "altExplanationAr": "ركز على الكلمة الصغيرة اللي تغير معنى الجملة.",
   "example": [
    {
     "en": "Grandma gave us some sweets.",
     "ar": "جدتي عطتنا حلاوة."
    },
    {
     "en": "Those insects are dangerous.",
     "ar": "هذيك الحشرات خطيرة."
    },
    {
     "en": "How much water is in the bottle?",
     "ar": "كم ماي في القارورة؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Grandma gave ___ some sweets.",
    "options": [
     "we",
     "us",
     "our"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ insects are dangerous.",
     "options": [
      "That",
      "This",
      "Those"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "How much water is in the bottle?",
     "options": [
      "كم ماي في القارورة؟",
      "أبي كمثرى لو سمحت.",
      "بيتهم جنب بيتنا."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I'd like ___ pear, please.",
     "options": [
      "an",
      "a",
      "some"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Review: Pronouns and Little Words"
   },
   {
    "kind": "highlight",
    "text": "Review"
   },
   {
    "kind": "example",
    "en": "Grandma gave us some sweets.",
    "ar": "جدتي عطتنا حلاوة."
   },
   {
    "kind": "example",
    "en": "Those insects are dangerous.",
    "ar": "هذيك الحشرات خطيرة."
   }
  ],
  "kids": {
   "listTitle": "Review",
   "cards": [
    {
     "emoji": "🎁",
     "en": "Grandma gave us some sweets.",
     "ar": "جدتي عطتنا حلاوة.",
     "hl": "us"
    },
    {
     "emoji": "🐞",
     "en": "Those insects are dangerous.",
     "ar": "هذيك الحشرات خطيرة.",
     "hl": "Those"
    },
    {
     "emoji": "💧",
     "en": "How much water is in the bottle?",
     "ar": "كم ماي في القارورة؟",
     "hl": "much"
    },
    {
     "emoji": "🍐",
     "en": "I'd like a pear, please.",
     "ar": "أبي كمثرى لو سمحت.",
     "hl": "a"
    },
    {
     "emoji": "🧑‍🤝‍🧑",
     "en": "Their house is next to ours.",
     "ar": "بيتهم جنب بيتنا.",
     "hl": "Their"
    },
    {
     "emoji": "🙋",
     "en": "Can you help her with the bags?",
     "ar": "تقدر تساعدها في الشنط؟",
     "hl": "her"
    }
   ],
   "say": "Review Grandma gave us some sweets. Those insects are dangerous. How much water is in the bottle? I'd like a pear, please. Their house is next to ours. Can you help her with the bags?"
  }
 },
 {
  "id": "jana-59",
  "order": 59,
  "levelId": "l2",
  "titleAr": "مراجعة: الأفعال في الحاضر",
  "titleEn": "Review: Present Verbs",
  "content": {
   "explanationAr": "مراجعة: s مع he و she، و do و does، و ing للي يصير الحين، و can.",
   "altExplanationAr": "She reads. Does she read? She is reading. She can read.",
   "example": [
    {
     "en": "The farmer gets up very early.",
     "ar": "المزارع يصحى بدري مرة."
    },
    {
     "en": "Does your parrot talk?",
     "ar": "ببغاؤك يتكلم؟"
    },
    {
     "en": "My brother is fixing his laptop.",
     "ar": "أخوي يصلح لابتوبه."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "The farmer ___ up very early.",
    "options": [
     "get",
     "getting",
     "gets"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ your parrot talk?",
     "options": [
      "Does",
      "Do",
      "Is"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "My brother is fixing his laptop.",
     "options": [
      "أختي الصغيرة تعرف تعزف بيانو.",
      "أخوي يصلح لابتوبه.",
      "الجمال ما تحتاج ماي كثير."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "My little sister ___ play the piano.",
     "options": [
      "cans",
      "is",
      "can"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Review: Present Verbs"
   },
   {
    "kind": "highlight",
    "text": "Review"
   },
   {
    "kind": "example",
    "en": "The farmer gets up very early.",
    "ar": "المزارع يصحى بدري مرة."
   },
   {
    "kind": "example",
    "en": "Does your parrot talk?",
    "ar": "ببغاؤك يتكلم؟"
   }
  ],
  "kids": {
   "listTitle": "Review",
   "cards": [
    {
     "emoji": "🧑‍🌾",
     "en": "The farmer gets up very early.",
     "ar": "المزارع يصحى بدري مرة.",
     "hl": "gets"
    },
    {
     "emoji": "🦜",
     "en": "Does your parrot talk?",
     "ar": "ببغاؤك يتكلم؟",
     "hl": "Does"
    },
    {
     "emoji": "🧑‍💻",
     "en": "My brother is fixing his laptop.",
     "ar": "أخوي يصلح لابتوبه.",
     "hl": "fixing"
    },
    {
     "emoji": "🎹",
     "en": "My little sister can play the piano.",
     "ar": "أختي الصغيرة تعرف تعزف بيانو.",
     "hl": "can"
    },
    {
     "emoji": "🐫",
     "en": "Camels don't need much water.",
     "ar": "الجمال ما تحتاج ماي كثير.",
     "hl": "don't"
    },
    {
     "emoji": "🧕",
     "en": "Mom never forgets our birthdays.",
     "ar": "ماما ما تنسى أعياد ميلادنا أبدًا.",
     "hl": "forgets"
    }
   ],
   "say": "Review The farmer gets up very early. Does your parrot talk? My brother is fixing his laptop. My little sister can play the piano. Camels don't need much water. Mom never forgets our birthdays."
  }
 },
 {
  "id": "jana-60",
  "order": 60,
  "levelId": "l2",
  "titleAr": "مراجعة المستوى الثاني",
  "titleEn": "Level 2 Review",
  "content": {
   "explanationAr": "مراجعة شاملة للمستوى الثاني من تمارين جنى. خذ وقتك في كل سؤال.",
   "altExplanationAr": "إذا غلطت، اقرأ الجملة مرة ثانية وفكر ليش.",
   "example": [
    {
     "en": "The dentist checked my teeth.",
     "ar": "دكتور الأسنان فحص أسناني."
    },
    {
     "en": "The lesson starts at half past eight.",
     "ar": "الدرس يبدأ الساعة ثمان ونص."
    },
    {
     "en": "Our team finished third.",
     "ar": "فريقنا طلع الثالث."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "The dentist checked my ___.",
    "options": [
     "teeth",
     "tooths",
     "tooth"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The lesson starts at ___ past eight.",
     "options": [
      "quarter",
      "half",
      "middle"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Our team finished third.",
     "options": [
      "القطة تغسل وجهها.",
      "ما فيه محلات كثير في شارعنا.",
      "فريقنا طلع الثالث."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The cat is washing ___ face.",
     "options": [
      "its",
      "it's",
      "her"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Level 2 Review"
   },
   {
    "kind": "highlight",
    "text": "Level 2 Review"
   },
   {
    "kind": "example",
    "en": "The dentist checked my teeth.",
    "ar": "دكتور الأسنان فحص أسناني."
   },
   {
    "kind": "example",
    "en": "The lesson starts at half past eight.",
    "ar": "الدرس يبدأ الساعة ثمان ونص."
   }
  ],
  "kids": {
   "listTitle": "Level 2 Review",
   "cards": [
    {
     "emoji": "🦷",
     "en": "The dentist checked my teeth.",
     "ar": "دكتور الأسنان فحص أسناني.",
     "hl": "teeth"
    },
    {
     "emoji": "🕣",
     "en": "The lesson starts at half past eight.",
     "ar": "الدرس يبدأ الساعة ثمان ونص.",
     "hl": "half"
    },
    {
     "emoji": "🥉",
     "en": "Our team finished third.",
     "ar": "فريقنا طلع الثالث.",
     "hl": "third"
    },
    {
     "emoji": "🐾",
     "en": "The cat is washing its face.",
     "ar": "القطة تغسل وجهها.",
     "hl": "its"
    },
    {
     "emoji": "🛍️",
     "en": "There aren't many shops in our street.",
     "ar": "ما فيه محلات كثير في شارعنا.",
     "hl": "many"
    },
    {
     "emoji": "🗓️",
     "en": "Ramadan is in March this year.",
     "ar": "رمضان في مارس هالسنة.",
     "hl": "in"
    }
   ],
   "say": "Level 2 Review The dentist checked my teeth. The lesson starts at half past eight. Our team finished third. The cat is washing its face. There aren't many shops in our street. Ramadan is in March this year."
  }
 },
 {
  "id": "jana-61",
  "order": 61,
  "levelId": "l3",
  "titleAr": "تمرين: Was أو Were في السؤال",
  "titleEn": "Practice: Was or Were?",
  "content": {
   "explanationAr": "تمرين: Was مع I و he و she و it، و Were مع you و we و they. اختر الكلمة الصح.",
   "altExplanationAr": "Was the bus full? Were you hungry?",
   "example": [
    {
     "en": "Was the bus full?",
     "ar": "كان الباص مليان؟"
    },
    {
     "en": "Were you hungry after the game?",
     "ar": "كنت جوعان بعد المباراة؟"
    },
    {
     "en": "Were the kids at school yesterday?",
     "ar": "كان الأطفال في المدرسة أمس؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ the bus full?",
    "options": [
     "Were",
     "Was",
     "Did"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ you hungry after the game?",
     "options": [
      "Was",
      "Did",
      "Were"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Were the kids at school yesterday?",
     "options": [
      "كان الأطفال في المدرسة أمس؟",
      "كانت الدنيا ظلام برا؟",
      "كانت الحفلة حلوة؟"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ it dark outside?",
     "options": [
      "Were",
      "Was",
      "Did"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Was or Were?"
   },
   {
    "kind": "highlight",
    "text": "Was · Were"
   },
   {
    "kind": "example",
    "en": "Was the bus full?",
    "ar": "كان الباص مليان؟"
   },
   {
    "kind": "example",
    "en": "Were you hungry after the game?",
    "ar": "كنت جوعان بعد المباراة؟"
   }
  ],
  "kids": {
   "listTitle": "Was · Were",
   "cards": [
    {
     "emoji": "🚌",
     "en": "Was the bus full?",
     "ar": "كان الباص مليان؟",
     "hl": "Was"
    },
    {
     "emoji": "🍔",
     "en": "Were you hungry after the game?",
     "ar": "كنت جوعان بعد المباراة؟",
     "hl": "Were"
    },
    {
     "emoji": "🎒",
     "en": "Were the kids at school yesterday?",
     "ar": "كان الأطفال في المدرسة أمس؟",
     "hl": "Were"
    },
    {
     "emoji": "🌙",
     "en": "Was it dark outside?",
     "ar": "كانت الدنيا ظلام برا؟",
     "hl": "Was"
    },
    {
     "emoji": "🎟️",
     "en": "Was the concert good?",
     "ar": "كانت الحفلة حلوة؟",
     "hl": "Was"
    },
    {
     "emoji": "🧑‍🤝‍🧑",
     "en": "Were your friends happy?",
     "ar": "كانوا أصحابك مبسوطين؟",
     "hl": "Were"
    }
   ],
   "say": "Was · Were Was the bus full? Were you hungry after the game? Were the kids at school yesterday? Was it dark outside? Was the concert good? Were your friends happy?"
  }
 },
 {
  "id": "jana-62",
  "order": 62,
  "levelId": "l3",
  "titleAr": "تمرين: الماضي بـ ed",
  "titleEn": "Practice: Past with ed",
  "content": {
   "explanationAr": "تمرين: أضف ed للفعل العادي في الماضي: clean ← cleaned، open ← opened، call ← called.",
   "altExplanationAr": "We cleaned the house last Thursday.",
   "example": [
    {
     "en": "We cleaned the house last Thursday.",
     "ar": "نظفنا البيت الخميس اللي فات."
    },
    {
     "en": "I opened my present.",
     "ar": "فتحت هديتي."
    },
    {
     "en": "Grandma called us in the evening.",
     "ar": "جدتي اتصلت علينا المساء."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "We ___ the house last Thursday.",
    "options": [
     "clean",
     "cleans",
     "cleaned"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I ___ my present.",
     "options": [
      "opened",
      "open",
      "opens"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Grandma called us in the evening.",
     "options": [
      "أبوي زرع شجرة ليمون.",
      "جدتي اتصلت علينا المساء.",
      "خلصنا اللغز."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Dad ___ a lemon tree.",
     "options": [
      "plant",
      "plants",
      "planted"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Past with ed"
   },
   {
    "kind": "highlight",
    "text": "-ed"
   },
   {
    "kind": "example",
    "en": "We cleaned the house last Thursday.",
    "ar": "نظفنا البيت الخميس اللي فات."
   },
   {
    "kind": "example",
    "en": "I opened my present.",
    "ar": "فتحت هديتي."
   }
  ],
  "kids": {
   "listTitle": "-ed",
   "cards": [
    {
     "emoji": "🧽",
     "en": "We cleaned the house last Thursday.",
     "ar": "نظفنا البيت الخميس اللي فات.",
     "hl": "cleaned"
    },
    {
     "emoji": "🎁",
     "en": "I opened my present.",
     "ar": "فتحت هديتي.",
     "hl": "opened"
    },
    {
     "emoji": "📞",
     "en": "Grandma called us in the evening.",
     "ar": "جدتي اتصلت علينا المساء.",
     "hl": "called"
    },
    {
     "emoji": "🌱",
     "en": "Dad planted a lemon tree.",
     "ar": "أبوي زرع شجرة ليمون.",
     "hl": "planted"
    },
    {
     "emoji": "🧩",
     "en": "We finished the puzzle.",
     "ar": "خلصنا اللغز.",
     "hl": "finished"
    },
    {
     "emoji": "🚶",
     "en": "They walked along the beach.",
     "ar": "مشوا على طول الشاطئ.",
     "hl": "walked"
    }
   ],
   "say": "-ed We cleaned the house last Thursday. I opened my present. Grandma called us in the evening. Dad planted a lemon tree. We finished the puzzle. They walked along the beach."
  }
 },
 {
  "id": "jana-63",
  "order": 63,
  "levelId": "l3",
  "titleAr": "تمرين: الماضي الشاذ أ",
  "titleEn": "Practice: Irregular Past A",
  "content": {
   "explanationAr": "تمرين الأفعال الشاذة: sleep ← slept، leave ← left، feel ← felt، keep ← kept، meet ← met.",
   "altExplanationAr": "I met my friend and felt happy.",
   "example": [
    {
     "en": "I slept for ten hours.",
     "ar": "نمت عشر ساعات."
    },
    {
     "en": "She left the house at seven.",
     "ar": "طلعت من البيت الساعة سبع."
    },
    {
     "en": "We felt very happy.",
     "ar": "حسينا بسعادة كبيرة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ for ten hours.",
    "options": [
     "slept",
     "sleeped",
     "sleep"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She ___ the house at seven.",
     "options": [
      "leaved",
      "left",
      "leave"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "We felt very happy.",
     "options": [
      "قابلت معلمتي في المول.",
      "احتفظ بألعابه القديمة.",
      "حسينا بسعادة كبيرة."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I ___ my teacher at the mall.",
     "options": [
      "met",
      "meeted",
      "meet"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Irregular Past A"
   },
   {
    "kind": "highlight",
    "text": "Irregular past A"
   },
   {
    "kind": "example",
    "en": "I slept for ten hours.",
    "ar": "نمت عشر ساعات."
   },
   {
    "kind": "example",
    "en": "She left the house at seven.",
    "ar": "طلعت من البيت الساعة سبع."
   }
  ],
  "kids": {
   "listTitle": "Irregular past A",
   "cards": [
    {
     "emoji": "🛌",
     "en": "I slept for ten hours.",
     "ar": "نمت عشر ساعات.",
     "hl": "slept"
    },
    {
     "emoji": "🚪",
     "en": "She left the house at seven.",
     "ar": "طلعت من البيت الساعة سبع.",
     "hl": "left"
    },
    {
     "emoji": "😊",
     "en": "We felt very happy.",
     "ar": "حسينا بسعادة كبيرة.",
     "hl": "felt"
    },
    {
     "emoji": "🤝",
     "en": "I met my teacher at the mall.",
     "ar": "قابلت معلمتي في المول.",
     "hl": "met"
    },
    {
     "emoji": "🧸",
     "en": "He kept his old toys.",
     "ar": "احتفظ بألعابه القديمة.",
     "hl": "kept"
    },
    {
     "emoji": "🛏️",
     "en": "The baby slept in our room.",
     "ar": "البيبي نام في غرفتنا.",
     "hl": "slept"
    }
   ],
   "say": "Irregular past A I slept for ten hours. She left the house at seven. We felt very happy. I met my teacher at the mall. He kept his old toys. The baby slept in our room."
  }
 },
 {
  "id": "jana-64",
  "order": 64,
  "levelId": "l3",
  "titleAr": "تمرين: الماضي الشاذ ب",
  "titleEn": "Practice: Irregular Past B",
  "content": {
   "explanationAr": "تمرين أفعال شاذة ثانية: run ← ran، sit ← sat، win ← won، begin ← began، drive ← drove، ride ← rode.",
   "altExplanationAr": "Our team won! The game began at five.",
   "example": [
    {
     "en": "I ran to the shop.",
     "ar": "ركضت للمحل."
    },
    {
     "en": "We sat under a tree.",
     "ar": "جلسنا تحت شجرة."
    },
    {
     "en": "Our team won the match.",
     "ar": "فريقنا فاز في المباراة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ to the shop.",
    "options": [
     "runned",
     "ran",
     "run"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We ___ under a tree.",
     "options": [
      "sitted",
      "sit",
      "sat"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Our team won the match.",
     "options": [
      "فريقنا فاز في المباراة.",
      "الفيلم بدأ الساعة تسع.",
      "أبوي ودّانا للبر."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The film ___ at nine.",
     "options": [
      "beginned",
      "began",
      "begin"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Irregular Past B"
   },
   {
    "kind": "highlight",
    "text": "Irregular past B"
   },
   {
    "kind": "example",
    "en": "I ran to the shop.",
    "ar": "ركضت للمحل."
   },
   {
    "kind": "example",
    "en": "We sat under a tree.",
    "ar": "جلسنا تحت شجرة."
   }
  ],
  "kids": {
   "listTitle": "Irregular past B",
   "cards": [
    {
     "emoji": "🏃",
     "en": "I ran to the shop.",
     "ar": "ركضت للمحل.",
     "hl": "ran"
    },
    {
     "emoji": "🪑",
     "en": "We sat under a tree.",
     "ar": "جلسنا تحت شجرة.",
     "hl": "sat"
    },
    {
     "emoji": "🏆",
     "en": "Our team won the match.",
     "ar": "فريقنا فاز في المباراة.",
     "hl": "won"
    },
    {
     "emoji": "🎬",
     "en": "The film began at nine.",
     "ar": "الفيلم بدأ الساعة تسع.",
     "hl": "began"
    },
    {
     "emoji": "🚙",
     "en": "Dad drove us to the desert.",
     "ar": "أبوي ودّانا للبر.",
     "hl": "drove"
    },
    {
     "emoji": "🐎",
     "en": "She rode a horse for the first time.",
     "ar": "ركبت خيل أول مرة.",
     "hl": "rode"
    }
   ],
   "say": "Irregular past B I ran to the shop. We sat under a tree. Our team won the match. The film began at nine. Dad drove us to the desert. She rode a horse for the first time."
  }
 },
 {
  "id": "jana-65",
  "order": 65,
  "levelId": "l3",
  "titleAr": "تمرين: الماضي الشاذ ج",
  "titleEn": "Practice: Irregular Past C",
  "content": {
   "explanationAr": "تمرين: break ← broke، forget ← forgot، lose ← lost، think ← thought، teach ← taught، catch ← caught.",
   "altExplanationAr": "I lost my pen, but I found it later.",
   "example": [
    {
     "en": "I broke a plate.",
     "ar": "كسرت صحن."
    },
    {
     "en": "He forgot his lunch box.",
     "ar": "نسي علبة غداه."
    },
    {
     "en": "We lost the car keys.",
     "ar": "ضيعنا مفاتيح السيارة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ a plate.",
    "options": [
     "breaked",
     "break",
     "broke"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He ___ his lunch box.",
     "options": [
      "forgot",
      "forgetted",
      "forget"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "We lost the car keys.",
     "options": [
      "فكرت فيك.",
      "ضيعنا مفاتيح السيارة.",
      "أبلة أمل علمتنا أغنية جديدة."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I ___ about you.",
     "options": [
      "thinked",
      "think",
      "thought"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Irregular Past C"
   },
   {
    "kind": "highlight",
    "text": "Irregular past C"
   },
   {
    "kind": "example",
    "en": "I broke a plate.",
    "ar": "كسرت صحن."
   },
   {
    "kind": "example",
    "en": "He forgot his lunch box.",
    "ar": "نسي علبة غداه."
   }
  ],
  "kids": {
   "listTitle": "Irregular past C",
   "cards": [
    {
     "emoji": "🍽️",
     "en": "I broke a plate.",
     "ar": "كسرت صحن.",
     "hl": "broke"
    },
    {
     "emoji": "🎒",
     "en": "He forgot his lunch box.",
     "ar": "نسي علبة غداه.",
     "hl": "forgot"
    },
    {
     "emoji": "🔑",
     "en": "We lost the car keys.",
     "ar": "ضيعنا مفاتيح السيارة.",
     "hl": "lost"
    },
    {
     "emoji": "💭",
     "en": "I thought about you.",
     "ar": "فكرت فيك.",
     "hl": "thought"
    },
    {
     "emoji": "👩‍🏫",
     "en": "Miss Amal taught us a new song.",
     "ar": "أبلة أمل علمتنا أغنية جديدة.",
     "hl": "taught"
    },
    {
     "emoji": "🐟",
     "en": "My uncle caught a big fish.",
     "ar": "عمي صاد سمكة كبيرة.",
     "hl": "caught"
    }
   ],
   "say": "Irregular past C I broke a plate. He forgot his lunch box. We lost the car keys. I thought about you. Miss Amal taught us a new song. My uncle caught a big fish."
  }
 },
 {
  "id": "jana-66",
  "order": 66,
  "levelId": "l3",
  "titleAr": "تمرين: didn't والفعل الأصلي",
  "titleEn": "Practice: didn't + Verb",
  "content": {
   "explanationAr": "تمرين: بعد didn't الفعل يرجع لأصله: I didn't see (مو didn't saw).",
   "altExplanationAr": "She didn't come. We didn't buy it.",
   "example": [
    {
     "en": "I didn't see the sign.",
     "ar": "ما شفت اللوحة."
    },
    {
     "en": "She didn't come to the party.",
     "ar": "ما جت الحفلة."
    },
    {
     "en": "We didn't buy anything.",
     "ar": "ما اشترينا شي."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I didn't ___ the sign.",
    "options": [
     "see",
     "saw",
     "seen"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She didn't ___ to the party.",
     "options": [
      "came",
      "come",
      "comes"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "We didn't buy anything.",
     "options": [
      "ما رد على جواله.",
      "ما أكلوا الكيكة.",
      "ما اشترينا شي."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He didn't ___ his phone.",
     "options": [
      "answer",
      "answered",
      "answers"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: didn't + Verb"
   },
   {
    "kind": "highlight",
    "text": "didn't"
   },
   {
    "kind": "example",
    "en": "I didn't see the sign.",
    "ar": "ما شفت اللوحة."
   },
   {
    "kind": "example",
    "en": "She didn't come to the party.",
    "ar": "ما جت الحفلة."
   }
  ],
  "kids": {
   "listTitle": "didn't",
   "cards": [
    {
     "emoji": "🙈",
     "en": "I didn't see the sign.",
     "ar": "ما شفت اللوحة.",
     "hl": "see"
    },
    {
     "emoji": "🚫",
     "en": "She didn't come to the party.",
     "ar": "ما جت الحفلة.",
     "hl": "come"
    },
    {
     "emoji": "🛒",
     "en": "We didn't buy anything.",
     "ar": "ما اشترينا شي.",
     "hl": "buy"
    },
    {
     "emoji": "📲",
     "en": "He didn't answer his phone.",
     "ar": "ما رد على جواله.",
     "hl": "answer"
    },
    {
     "emoji": "🍰",
     "en": "They didn't eat the cake.",
     "ar": "ما أكلوا الكيكة.",
     "hl": "eat"
    },
    {
     "emoji": "🌧️",
     "en": "It didn't stop raining all day.",
     "ar": "ما وقفت تمطر طول اليوم.",
     "hl": "stop"
    }
   ],
   "say": "didn't I didn't see the sign. She didn't come to the party. We didn't buy anything. He didn't answer his phone. They didn't eat the cake. It didn't stop raining all day."
  }
 },
 {
  "id": "jana-67",
  "order": 67,
  "levelId": "l3",
  "titleAr": "تمرين: أسئلة Did",
  "titleEn": "Practice: Did Questions",
  "content": {
   "explanationAr": "تمرين: نسأل بـ Did + الشخص + الفعل الأصلي: Did you win? Did she cook?",
   "altExplanationAr": "Did you like the film?",
   "example": [
    {
     "en": "Did you win the race?",
     "ar": "فزت في السباق؟"
    },
    {
     "en": "Did your mom cook today?",
     "ar": "أمك طبخت اليوم؟"
    },
    {
     "en": "Did you like the film?",
     "ar": "عجبك الفيلم؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Did you ___ the race?",
    "options": [
     "won",
     "win",
     "wins"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Did your mom ___ today?",
     "options": [
      "cooked",
      "cooks",
      "cook"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Did you like the film?",
     "options": [
      "عجبك الفيلم؟",
      "وصلته رسالتي؟",
      "استمتعوا بالإجازة؟"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Did he ___ my message?",
     "options": [
      "got",
      "get",
      "gets"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Did Questions"
   },
   {
    "kind": "highlight",
    "text": "Did"
   },
   {
    "kind": "example",
    "en": "Did you win the race?",
    "ar": "فزت في السباق؟"
   },
   {
    "kind": "example",
    "en": "Did your mom cook today?",
    "ar": "أمك طبخت اليوم؟"
   }
  ],
  "kids": {
   "listTitle": "Did",
   "cards": [
    {
     "emoji": "🏅",
     "en": "Did you win the race?",
     "ar": "فزت في السباق؟",
     "hl": "win"
    },
    {
     "emoji": "🍲",
     "en": "Did your mom cook today?",
     "ar": "أمك طبخت اليوم؟",
     "hl": "cook"
    },
    {
     "emoji": "🎞️",
     "en": "Did you like the film?",
     "ar": "عجبك الفيلم؟",
     "hl": "like"
    },
    {
     "emoji": "💌",
     "en": "Did he get my message?",
     "ar": "وصلته رسالتي؟",
     "hl": "get"
    },
    {
     "emoji": "🏝️",
     "en": "Did they enjoy the holiday?",
     "ar": "استمتعوا بالإجازة؟",
     "hl": "enjoy"
    },
    {
     "emoji": "🚌",
     "en": "Did we miss the bus?",
     "ar": "فاتنا الباص؟",
     "hl": "miss"
    }
   ],
   "say": "Did Did you win the race? Did your mom cook today? Did you like the film? Did he get my message? Did they enjoy the holiday? Did we miss the bus?"
  }
 },
 {
  "id": "jana-68",
  "order": 68,
  "levelId": "l3",
  "titleAr": "تمرين: كلمات السؤال في الماضي",
  "titleEn": "Practice: Past Wh- Questions",
  "content": {
   "explanationAr": "تمرين: Where did, What did, When did, Who did, Why did — والفعل بعدها بأصله.",
   "altExplanationAr": "Where did you put my glasses?",
   "example": [
    {
     "en": "Where did you put my glasses?",
     "ar": "وين حطيت نظارتي؟"
    },
    {
     "en": "Who did you see at the mall?",
     "ar": "مين شفت في المول؟"
    },
    {
     "en": "What did you get for Eid?",
     "ar": "وش جاك في العيد؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Where did you ___ my glasses?",
    "options": [
     "puts",
     "putting",
     "put"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Who did you ___ at the mall?",
     "options": [
      "see",
      "saw",
      "sees"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "What did you get for Eid?",
     "options": [
      "متى هبطوا؟",
      "وش جاك في العيد؟",
      "ليش البيبي صاح؟"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "When did they ___?",
     "options": [
      "landed",
      "lands",
      "land"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Past Wh- Questions"
   },
   {
    "kind": "highlight",
    "text": "Wh- + did"
   },
   {
    "kind": "example",
    "en": "Where did you put my glasses?",
    "ar": "وين حطيت نظارتي؟"
   },
   {
    "kind": "example",
    "en": "Who did you see at the mall?",
    "ar": "مين شفت في المول؟"
   }
  ],
  "kids": {
   "listTitle": "Wh- + did",
   "cards": [
    {
     "emoji": "👓",
     "en": "Where did you put my glasses?",
     "ar": "وين حطيت نظارتي؟",
     "hl": "put"
    },
    {
     "emoji": "🧑",
     "en": "Who did you see at the mall?",
     "ar": "مين شفت في المول؟",
     "hl": "see"
    },
    {
     "emoji": "🎁",
     "en": "What did you get for Eid?",
     "ar": "وش جاك في العيد؟",
     "hl": "get"
    },
    {
     "emoji": "🛬",
     "en": "When did they land?",
     "ar": "متى هبطوا؟",
     "hl": "land"
    },
    {
     "emoji": "😢",
     "en": "Why did the baby cry?",
     "ar": "ليش البيبي صاح؟",
     "hl": "cry"
    },
    {
     "emoji": "🚗",
     "en": "How did you come here?",
     "ar": "كيف جيت هنا؟",
     "hl": "come"
    }
   ],
   "say": "Wh- + did Where did you put my glasses? Who did you see at the mall? What did you get for Eid? When did they land? Why did the baby cry? How did you come here?"
  }
 },
 {
  "id": "jana-69",
  "order": 69,
  "levelId": "l3",
  "titleAr": "تمرين: ago و last و yesterday",
  "titleEn": "Practice: ago, last, yesterday",
  "content": {
   "explanationAr": "تمرين: ago تجي بعد المدة: two hours ago. و last قبل الكلمة: last Monday. و yesterday لحالها أو مع morning أو evening.",
   "altExplanationAr": "I saw him an hour ago.",
   "example": [
    {
     "en": "I saw him an hour ago.",
     "ar": "شفته قبل ساعة."
    },
    {
     "en": "We met last Monday.",
     "ar": "تقابلنا الاثنين اللي فات."
    },
    {
     "en": "They called yesterday evening.",
     "ar": "اتصلوا أمس المساء."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I saw him an hour ___.",
    "options": [
     "ago",
     "last",
     "before"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We met ___ Monday.",
     "options": [
      "ago",
      "last",
      "next"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "They called yesterday evening.",
     "options": [
      "انتقلنا هنا قبل خمس سنين.",
      "وش سويت الويكند اللي فات؟",
      "اتصلوا أمس المساء."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We moved here five years ___.",
     "options": [
      "ago",
      "last",
      "before"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: ago, last, yesterday"
   },
   {
    "kind": "highlight",
    "text": "Past time words"
   },
   {
    "kind": "example",
    "en": "I saw him an hour ago.",
    "ar": "شفته قبل ساعة."
   },
   {
    "kind": "example",
    "en": "We met last Monday.",
    "ar": "تقابلنا الاثنين اللي فات."
   }
  ],
  "kids": {
   "listTitle": "Past time words",
   "cards": [
    {
     "emoji": "⏱️",
     "en": "I saw him an hour ago.",
     "ar": "شفته قبل ساعة.",
     "hl": "ago"
    },
    {
     "emoji": "📆",
     "en": "We met last Monday.",
     "ar": "تقابلنا الاثنين اللي فات.",
     "hl": "last"
    },
    {
     "emoji": "🌇",
     "en": "They called yesterday evening.",
     "ar": "اتصلوا أمس المساء.",
     "hl": "yesterday"
    },
    {
     "emoji": "🏠",
     "en": "We moved here five years ago.",
     "ar": "انتقلنا هنا قبل خمس سنين.",
     "hl": "ago"
    },
    {
     "emoji": "🎄",
     "en": "What did you do last weekend?",
     "ar": "وش سويت الويكند اللي فات؟",
     "hl": "last"
    },
    {
     "emoji": "🌄",
     "en": "I woke up early yesterday morning.",
     "ar": "صحيت بدري أمس الصبح.",
     "hl": "yesterday"
    }
   ],
   "say": "Past time words I saw him an hour ago. We met last Monday. They called yesterday evening. We moved here five years ago. What did you do last weekend? I woke up early yesterday morning."
  }
 },
 {
  "id": "jana-70",
  "order": 70,
  "levelId": "l3",
  "titleAr": "تمرين: كان يسوي",
  "titleEn": "Practice: Past Continuous",
  "content": {
   "explanationAr": "تمرين: was أو were مع ing لشي كان يصير في الماضي: I was cooking at six. They were sleeping.",
   "altExplanationAr": "What were you doing at five?",
   "example": [
    {
     "en": "I was cooking at six o'clock.",
     "ar": "كنت أطبخ الساعة ست."
    },
    {
     "en": "They were sleeping at midnight.",
     "ar": "كانوا نايمين نص الليل."
    },
    {
     "en": "The teacher was explaining the lesson.",
     "ar": "المعلمة كانت تشرح الدرس."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ cooking at six o'clock.",
    "options": [
     "were",
     "was",
     "did"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "They ___ sleeping at midnight.",
     "options": [
      "was",
      "did",
      "were"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "The teacher was explaining the lesson.",
     "options": [
      "المعلمة كانت تشرح الدرس.",
      "كنا جالسين على البحر.",
      "الريح كانت قوية."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We were ___ on the beach.",
     "options": [
      "sit",
      "sitting",
      "sat"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Past Continuous"
   },
   {
    "kind": "highlight",
    "text": "was/were + ing"
   },
   {
    "kind": "example",
    "en": "I was cooking at six o'clock.",
    "ar": "كنت أطبخ الساعة ست."
   },
   {
    "kind": "example",
    "en": "They were sleeping at midnight.",
    "ar": "كانوا نايمين نص الليل."
   }
  ],
  "kids": {
   "listTitle": "was/were + ing",
   "cards": [
    {
     "emoji": "🍳",
     "en": "I was cooking at six o'clock.",
     "ar": "كنت أطبخ الساعة ست.",
     "hl": "was"
    },
    {
     "emoji": "💤",
     "en": "They were sleeping at midnight.",
     "ar": "كانوا نايمين نص الليل.",
     "hl": "were"
    },
    {
     "emoji": "🧑‍🏫",
     "en": "The teacher was explaining the lesson.",
     "ar": "المعلمة كانت تشرح الدرس.",
     "hl": "explaining"
    },
    {
     "emoji": "🏖️",
     "en": "We were sitting on the beach.",
     "ar": "كنا جالسين على البحر.",
     "hl": "sitting"
    },
    {
     "emoji": "🌬️",
     "en": "The wind was blowing hard.",
     "ar": "الريح كانت قوية.",
     "hl": "blowing"
    },
    {
     "emoji": "🎮",
     "en": "Was your brother playing games?",
     "ar": "كان أخوك يلعب ألعاب؟",
     "hl": "playing"
    }
   ],
   "say": "was/were + ing I was cooking at six o'clock. They were sleeping at midnight. The teacher was explaining the lesson. We were sitting on the beach. The wind was blowing hard. Was your brother playing games?"
  }
 },
 {
  "id": "jana-71",
  "order": 71,
  "levelId": "l3",
  "titleAr": "تمرين: when أو while",
  "titleEn": "Practice: when or while",
  "content": {
   "explanationAr": "تمرين: while مع الحدث الطويل (was أو were + ing)، و when مع الحدث القصير المفاجئ.",
   "altExplanationAr": "While we were eating, the doorbell rang.",
   "example": [
    {
     "en": "While we were eating, the doorbell rang.",
     "ar": "وإحنا ناكل، رن جرس الباب."
    },
    {
     "en": "He hurt his leg when he fell.",
     "ar": "تعور رجله لما طاح."
    },
    {
     "en": "My phone rang while I was driving.",
     "ar": "جوالي رن وأنا أسوق."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ we were eating, the doorbell rang.",
    "options": [
     "What",
     "Which",
     "While"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He hurt his leg ___ he fell.",
     "options": [
      "when",
      "which",
      "what"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "My phone rang while I was driving.",
     "options": [
      "الكهربا طفت لما بدت العاصفة.",
      "جوالي رن وأنا أسوق.",
      "القطة دخلت وأنا نايم."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The lights went off ___ the storm started.",
     "options": [
      "what",
      "which",
      "when"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: when or while"
   },
   {
    "kind": "highlight",
    "text": "when · while"
   },
   {
    "kind": "example",
    "en": "While we were eating, the doorbell rang.",
    "ar": "وإحنا ناكل، رن جرس الباب."
   },
   {
    "kind": "example",
    "en": "He hurt his leg when he fell.",
    "ar": "تعور رجله لما طاح."
   }
  ],
  "kids": {
   "listTitle": "when · while",
   "cards": [
    {
     "emoji": "🔔",
     "en": "While we were eating, the doorbell rang.",
     "ar": "وإحنا ناكل، رن جرس الباب.",
     "hl": "While"
    },
    {
     "emoji": "🤕",
     "en": "He hurt his leg when he fell.",
     "ar": "تعور رجله لما طاح.",
     "hl": "when"
    },
    {
     "emoji": "📞",
     "en": "My phone rang while I was driving.",
     "ar": "جوالي رن وأنا أسوق.",
     "hl": "while"
    },
    {
     "emoji": "⚡",
     "en": "The lights went off when the storm started.",
     "ar": "الكهربا طفت لما بدت العاصفة.",
     "hl": "when"
    },
    {
     "emoji": "🐈",
     "en": "The cat came in while I was sleeping.",
     "ar": "القطة دخلت وأنا نايم.",
     "hl": "while"
    },
    {
     "emoji": "🧑‍🤝‍🧑",
     "en": "I met Sara when I was at the bank.",
     "ar": "قابلت سارة لما كنت في البنك.",
     "hl": "when"
    }
   ],
   "say": "when · while While we were eating, the doorbell rang. He hurt his leg when he fell. My phone rang while I was driving. The lights went off when the storm started. The cat came in while I was sleeping. I met Sara when I was at the bank."
  }
 },
 {
  "id": "jana-72",
  "order": 72,
  "levelId": "l3",
  "titleAr": "تمرين: going to",
  "titleEn": "Practice: going to",
  "content": {
   "explanationAr": "تمرين: am أو is أو are + going to + الفعل للخطط والتوقعات. انتبه للفعل بعد to: going to visit (مو visits).",
   "altExplanationAr": "They are going to build a new mall.",
   "example": [
    {
     "en": "They are going to build a new mall.",
     "ar": "بيبنون مول جديد."
    },
    {
     "en": "My sister is going to get married.",
     "ar": "أختي بتتزوج."
    },
    {
     "en": "I am going to study hard this year.",
     "ar": "بذاكر بقوة هالسنة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "They are going to ___ a new mall.",
    "options": [
     "build",
     "builds",
     "built"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "My sister is going to ___ married.",
     "options": [
      "gets",
      "get",
      "got"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I am going to study hard this year.",
     "options": [
      "شوف السما! بتمطر قريب.",
      "ما بنطبخ الليلة.",
      "بذاكر بقوة هالسنة."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Look at the sky! It's going to ___ soon.",
     "options": [
      "rain",
      "rains",
      "rained"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: going to"
   },
   {
    "kind": "highlight",
    "text": "going to"
   },
   {
    "kind": "example",
    "en": "They are going to build a new mall.",
    "ar": "بيبنون مول جديد."
   },
   {
    "kind": "example",
    "en": "My sister is going to get married.",
    "ar": "أختي بتتزوج."
   }
  ],
  "kids": {
   "listTitle": "going to",
   "cards": [
    {
     "emoji": "🏗️",
     "en": "They are going to build a new mall.",
     "ar": "بيبنون مول جديد.",
     "hl": "build"
    },
    {
     "emoji": "🧕",
     "en": "My sister is going to get married.",
     "ar": "أختي بتتزوج.",
     "hl": "get"
    },
    {
     "emoji": "🎓",
     "en": "I am going to study hard this year.",
     "ar": "بذاكر بقوة هالسنة.",
     "hl": "am"
    },
    {
     "emoji": "🌩️",
     "en": "Look at the sky! It's going to rain soon.",
     "ar": "شوف السما! بتمطر قريب.",
     "hl": "rain"
    },
    {
     "emoji": "🍕",
     "en": "We aren't going to cook tonight.",
     "ar": "ما بنطبخ الليلة.",
     "hl": "aren't"
    },
    {
     "emoji": "🧳",
     "en": "Is he going to travel alone?",
     "ar": "بيسافر لحاله؟",
     "hl": "Is"
    }
   ],
   "say": "going to They are going to build a new mall. My sister is going to get married. I am going to study hard this year. Look at the sky! It's going to rain soon. We aren't going to cook tonight. Is he going to travel alone?"
  }
 },
 {
  "id": "jana-73",
  "order": 73,
  "levelId": "l3",
  "titleAr": "تمرين: will و won't",
  "titleEn": "Practice: will and won't",
  "content": {
   "explanationAr": "تمرين: will + الفعل الأصلي، والنفي won't. I will try. She won't be late.",
   "altExplanationAr": "Don't worry, I won't tell anyone.",
   "example": [
    {
     "en": "Don't worry, I won't tell anyone.",
     "ar": "لا تشيل هم، ما بقول لأحد."
    },
    {
     "en": "I will try again.",
     "ar": "بحاول مرة ثانية."
    },
    {
     "en": "She won't be late.",
     "ar": "ما بتتأخر."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Don't worry, I ___ tell anyone.",
    "options": [
     "don't",
     "won't",
     "didn't"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I will ___ again.",
     "options": [
      "tries",
      "tried",
      "try"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "She won't be late.",
     "options": [
      "ما بتتأخر.",
      "بتكون في البيت الليلة؟",
      "الرسالة بتوصل يوم الاثنين."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ you be at home tonight?",
     "options": [
      "Do",
      "Will",
      "Are"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: will and won't"
   },
   {
    "kind": "highlight",
    "text": "will · won't"
   },
   {
    "kind": "example",
    "en": "Don't worry, I won't tell anyone.",
    "ar": "لا تشيل هم، ما بقول لأحد."
   },
   {
    "kind": "example",
    "en": "I will try again.",
    "ar": "بحاول مرة ثانية."
   }
  ],
  "kids": {
   "listTitle": "will · won't",
   "cards": [
    {
     "emoji": "🤐",
     "en": "Don't worry, I won't tell anyone.",
     "ar": "لا تشيل هم، ما بقول لأحد.",
     "hl": "won't"
    },
    {
     "emoji": "💪",
     "en": "I will try again.",
     "ar": "بحاول مرة ثانية.",
     "hl": "try"
    },
    {
     "emoji": "⏰",
     "en": "She won't be late.",
     "ar": "ما بتتأخر.",
     "hl": "be"
    },
    {
     "emoji": "🏠",
     "en": "Will you be at home tonight?",
     "ar": "بتكون في البيت الليلة؟",
     "hl": "Will"
    },
    {
     "emoji": "📬",
     "en": "The letter will arrive on Monday.",
     "ar": "الرسالة بتوصل يوم الاثنين.",
     "hl": "arrive"
    },
    {
     "emoji": "🌦️",
     "en": "It will probably rain later.",
     "ar": "غالبًا بتمطر بعدين.",
     "hl": "will"
    }
   ],
   "say": "will · won't Don't worry, I won't tell anyone. I will try again. She won't be late. Will you be at home tonight? The letter will arrive on Monday. It will probably rain later."
  }
 },
 {
  "id": "jana-74",
  "order": 74,
  "levelId": "l3",
  "titleAr": "تمرين: tomorrow و next و in",
  "titleEn": "Practice: Future Time Words",
  "content": {
   "explanationAr": "تمرين: tomorrow بكرة، next week الأسبوع الجاي، in an hour بعد ساعة، tonight الليلة، later بعدين.",
   "altExplanationAr": "I'll finish it in an hour.",
   "example": [
    {
     "en": "I'll finish it in an hour.",
     "ar": "بخلصه بعد ساعة."
    },
    {
     "en": "We are going out tonight.",
     "ar": "بنطلع الليلة."
    },
    {
     "en": "The exam is next Tuesday.",
     "ar": "الاختبار الثلاثاء الجاي."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I'll finish it ___ an hour.",
    "options": [
     "ago",
     "last",
     "in"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We are going out ___.",
     "options": [
      "tonight",
      "last night",
      "yesterday"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "The exam is next Tuesday.",
     "options": [
      "بتصل عليك بعدين.",
      "الاختبار الثلاثاء الجاي.",
      "بكرة بيكون يوم مشغول."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I'll call you ___.",
     "options": [
      "ago",
      "last",
      "later"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Future Time Words"
   },
   {
    "kind": "highlight",
    "text": "Future time"
   },
   {
    "kind": "example",
    "en": "I'll finish it in an hour.",
    "ar": "بخلصه بعد ساعة."
   },
   {
    "kind": "example",
    "en": "We are going out tonight.",
    "ar": "بنطلع الليلة."
   }
  ],
  "kids": {
   "listTitle": "Future time",
   "cards": [
    {
     "emoji": "⌛",
     "en": "I'll finish it in an hour.",
     "ar": "بخلصه بعد ساعة.",
     "hl": "in"
    },
    {
     "emoji": "🌃",
     "en": "We are going out tonight.",
     "ar": "بنطلع الليلة.",
     "hl": "tonight"
    },
    {
     "emoji": "📅",
     "en": "The exam is next Tuesday.",
     "ar": "الاختبار الثلاثاء الجاي.",
     "hl": "next"
    },
    {
     "emoji": "🕐",
     "en": "I'll call you later.",
     "ar": "بتصل عليك بعدين.",
     "hl": "later"
    },
    {
     "emoji": "🌄",
     "en": "Tomorrow will be a busy day.",
     "ar": "بكرة بيكون يوم مشغول.",
     "hl": "Tomorrow"
    },
    {
     "emoji": "✈️",
     "en": "My cousins arrive in three days.",
     "ar": "عيال عمي يوصلون بعد ثلاث أيام.",
     "hl": "in"
    }
   ],
   "say": "Future time I'll finish it in an hour. We are going out tonight. The exam is next Tuesday. I'll call you later. Tomorrow will be a busy day. My cousins arrive in three days."
  }
 },
 {
  "id": "jana-75",
  "order": 75,
  "levelId": "l3",
  "titleAr": "تمرين: ing للمواعيد",
  "titleEn": "Practice: Plans with -ing",
  "content": {
   "explanationAr": "تمرين: am أو is أو are + ing لموعد مرتب في المستقبل، ومعه غالبًا وقت: I'm visiting Grandma on Friday.",
   "altExplanationAr": "What are you doing tomorrow?",
   "example": [
    {
     "en": "I'm visiting Grandma on Friday.",
     "ar": "بزور جدتي يوم الجمعة."
    },
    {
     "en": "We are playing a match on Sunday.",
     "ar": "عندنا مباراة يوم الأحد."
    },
    {
     "en": "Dad is seeing the doctor at four.",
     "ar": "أبوي عنده موعد مع الدكتور الساعة أربع."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I'm ___ Grandma on Friday.",
    "options": [
     "visiting",
     "visit",
     "visited"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We are ___ a match on Sunday.",
     "options": [
      "play",
      "playing",
      "played"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Dad is seeing the doctor at four.",
     "options": [
      "بتاخذ القطار بكرة؟",
      "بيجون على العشا الليلة.",
      "أبوي عنده موعد مع الدكتور الساعة أربع."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Are you ___ the train tomorrow?",
     "options": [
      "taking",
      "take",
      "took"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Plans with -ing"
   },
   {
    "kind": "highlight",
    "text": "Future arrangements"
   },
   {
    "kind": "example",
    "en": "I'm visiting Grandma on Friday.",
    "ar": "بزور جدتي يوم الجمعة."
   },
   {
    "kind": "example",
    "en": "We are playing a match on Sunday.",
    "ar": "عندنا مباراة يوم الأحد."
   }
  ],
  "kids": {
   "listTitle": "Future arrangements",
   "cards": [
    {
     "emoji": "👵",
     "en": "I'm visiting Grandma on Friday.",
     "ar": "بزور جدتي يوم الجمعة.",
     "hl": "visiting"
    },
    {
     "emoji": "⚽",
     "en": "We are playing a match on Sunday.",
     "ar": "عندنا مباراة يوم الأحد.",
     "hl": "playing"
    },
    {
     "emoji": "🧑‍⚕️",
     "en": "Dad is seeing the doctor at four.",
     "ar": "أبوي عنده موعد مع الدكتور الساعة أربع.",
     "hl": "seeing"
    },
    {
     "emoji": "🚆",
     "en": "Are you taking the train tomorrow?",
     "ar": "بتاخذ القطار بكرة؟",
     "hl": "taking"
    },
    {
     "emoji": "🍰",
     "en": "They are coming for dinner tonight.",
     "ar": "بيجون على العشا الليلة.",
     "hl": "coming"
    },
    {
     "emoji": "💇",
     "en": "She is getting a haircut after school.",
     "ar": "بتقص شعرها بعد المدرسة.",
     "hl": "getting"
    }
   ],
   "say": "Future arrangements I'm visiting Grandma on Friday. We are playing a match on Sunday. Dad is seeing the doctor at four. Are you taking the train tomorrow? They are coming for dinner tonight. She is getting a haircut after school."
  }
 },
 {
  "id": "jana-76",
  "order": 76,
  "levelId": "l3",
  "titleAr": "تمرين: could و couldn't",
  "titleEn": "Practice: could, couldn't",
  "content": {
   "explanationAr": "تمرين: could: كان يقدر (ماضي can)، و couldn't: ما قدر. وبعدهم الفعل الأصلي.",
   "altExplanationAr": "When I was small, I couldn't swim.",
   "example": [
    {
     "en": "When I was small, I couldn't swim.",
     "ar": "لما كنت صغير ما كنت أعرف أسبح."
    },
    {
     "en": "She could run very fast.",
     "ar": "كانت تقدر تركض بسرعة مرة."
    },
    {
     "en": "We couldn't find the hotel.",
     "ar": "ما قدرنا نلقى الفندق."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "When I was small, I ___ swim.",
    "options": [
     "can't",
     "couldn't",
     "won't"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She could ___ very fast.",
     "options": [
      "ran",
      "runs",
      "run"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "We couldn't find the hotel.",
     "options": [
      "ما قدرنا نلقى الفندق.",
      "كنا نشوف النجوم البارحة.",
      "ما قدرت أتذكر اسمه."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We ___ see the stars last night.",
     "options": [
      "can",
      "could",
      "will"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: could, couldn't"
   },
   {
    "kind": "highlight",
    "text": "could"
   },
   {
    "kind": "example",
    "en": "When I was small, I couldn't swim.",
    "ar": "لما كنت صغير ما كنت أعرف أسبح."
   },
   {
    "kind": "example",
    "en": "She could run very fast.",
    "ar": "كانت تقدر تركض بسرعة مرة."
   }
  ],
  "kids": {
   "listTitle": "could",
   "cards": [
    {
     "emoji": "🧒",
     "en": "When I was small, I couldn't swim.",
     "ar": "لما كنت صغير ما كنت أعرف أسبح.",
     "hl": "couldn't"
    },
    {
     "emoji": "🏃",
     "en": "She could run very fast.",
     "ar": "كانت تقدر تركض بسرعة مرة.",
     "hl": "run"
    },
    {
     "emoji": "🔍",
     "en": "We couldn't find the hotel.",
     "ar": "ما قدرنا نلقى الفندق.",
     "hl": "couldn't"
    },
    {
     "emoji": "🌌",
     "en": "We could see the stars last night.",
     "ar": "كنا نشوف النجوم البارحة.",
     "hl": "could"
    },
    {
     "emoji": "🧠",
     "en": "I couldn't remember his name.",
     "ar": "ما قدرت أتذكر اسمه.",
     "hl": "remember"
    },
    {
     "emoji": "🎹",
     "en": "Could your grandmother sing when she was young?",
     "ar": "جدتك كانت تعرف تغني لما كانت صغيرة؟",
     "hl": "Could"
    }
   ],
   "say": "could When I was small, I couldn't swim. She could run very fast. We couldn't find the hotel. We could see the stars last night. I couldn't remember his name. Could your grandmother sing when she was young?"
  }
 },
 {
  "id": "jana-77",
  "order": 77,
  "levelId": "l3",
  "titleAr": "تمرين: had to و didn't have to",
  "titleEn": "Practice: had to",
  "content": {
   "explanationAr": "تمرين: had to: كان لازم، و didn't have to: ما كان لازم. بعدهم الفعل الأصلي.",
   "altExplanationAr": "I had to get up at five.",
   "example": [
    {
     "en": "I had to get up at five.",
     "ar": "كان لازم أصحى الساعة خمس."
    },
    {
     "en": "We had to wait in a long line.",
     "ar": "اضطرينا ننتظر في طابور طويل."
    },
    {
     "en": "They didn't have to buy tickets.",
     "ar": "ما كان لازم يشترون تذاكر."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I had to ___ up at five.",
    "options": [
     "got",
     "gets",
     "get"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We had to ___ in a long line.",
     "options": [
      "wait",
      "waited",
      "waits"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "They didn't have to buy tickets.",
     "options": [
      "كان لازم تدفع زيادة.",
      "ما كان لازم يشترون تذاكر.",
      "كان لازم تلبس زي؟"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She had to ___ extra.",
     "options": [
      "paid",
      "pays",
      "pay"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: had to"
   },
   {
    "kind": "highlight",
    "text": "had to"
   },
   {
    "kind": "example",
    "en": "I had to get up at five.",
    "ar": "كان لازم أصحى الساعة خمس."
   },
   {
    "kind": "example",
    "en": "We had to wait in a long line.",
    "ar": "اضطرينا ننتظر في طابور طويل."
   }
  ],
  "kids": {
   "listTitle": "had to",
   "cards": [
    {
     "emoji": "⏰",
     "en": "I had to get up at five.",
     "ar": "كان لازم أصحى الساعة خمس.",
     "hl": "get"
    },
    {
     "emoji": "🚶",
     "en": "We had to wait in a long line.",
     "ar": "اضطرينا ننتظر في طابور طويل.",
     "hl": "wait"
    },
    {
     "emoji": "🎫",
     "en": "They didn't have to buy tickets.",
     "ar": "ما كان لازم يشترون تذاكر.",
     "hl": "have"
    },
    {
     "emoji": "🧾",
     "en": "She had to pay extra.",
     "ar": "كان لازم تدفع زيادة.",
     "hl": "pay"
    },
    {
     "emoji": "📚",
     "en": "Did you have to wear a uniform?",
     "ar": "كان لازم تلبس زي؟",
     "hl": "have"
    },
    {
     "emoji": "🧹",
     "en": "He had to clean his room first.",
     "ar": "كان لازم ينظف غرفته أول.",
     "hl": "clean"
    }
   ],
   "say": "had to I had to get up at five. We had to wait in a long line. They didn't have to buy tickets. She had to pay extra. Did you have to wear a uniform? He had to clean his room first."
  }
 },
 {
  "id": "jana-78",
  "order": 78,
  "levelId": "l3",
  "titleAr": "تمرين: used to",
  "titleEn": "Practice: used to",
  "content": {
   "explanationAr": "تمرين: used to لعادة في الماضي ما عادت موجودة. السؤال والنفي: Did you use to...? I didn't use to...",
   "altExplanationAr": "I didn't use to like vegetables.",
   "example": [
    {
     "en": "I didn't use to like vegetables.",
     "ar": "ما كنت أحب الخضار."
    },
    {
     "en": "This street used to be quiet.",
     "ar": "هالشارع كان هادي."
    },
    {
     "en": "My grandpa used to listen to the radio.",
     "ar": "جدي كان يسمع الراديو."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I didn't ___ to like vegetables.",
    "options": [
     "use",
     "used",
     "using"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "This street ___ to be quiet.",
     "options": [
      "use",
      "used",
      "uses"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "My grandpa used to listen to the radio.",
     "options": [
      "كنت تلبس نظارة؟",
      "كنا ساكنين في شقة صغيرة.",
      "جدي كان يسمع الراديو."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Did you ___ to wear glasses?",
     "options": [
      "use",
      "used",
      "uses"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: used to"
   },
   {
    "kind": "highlight",
    "text": "used to"
   },
   {
    "kind": "example",
    "en": "I didn't use to like vegetables.",
    "ar": "ما كنت أحب الخضار."
   },
   {
    "kind": "example",
    "en": "This street used to be quiet.",
    "ar": "هالشارع كان هادي."
   }
  ],
  "kids": {
   "listTitle": "used to",
   "cards": [
    {
     "emoji": "🥦",
     "en": "I didn't use to like vegetables.",
     "ar": "ما كنت أحب الخضار.",
     "hl": "use"
    },
    {
     "emoji": "🏘️",
     "en": "This street used to be quiet.",
     "ar": "هالشارع كان هادي.",
     "hl": "used"
    },
    {
     "emoji": "📻",
     "en": "My grandpa used to listen to the radio.",
     "ar": "جدي كان يسمع الراديو.",
     "hl": "used"
    },
    {
     "emoji": "🧢",
     "en": "Did you use to wear glasses?",
     "ar": "كنت تلبس نظارة؟",
     "hl": "use"
    },
    {
     "emoji": "🏠",
     "en": "We used to live in a small flat.",
     "ar": "كنا ساكنين في شقة صغيرة.",
     "hl": "used"
    },
    {
     "emoji": "🚲",
     "en": "She used to ride her bike to school.",
     "ar": "كانت تروح المدرسة بالسيكل.",
     "hl": "ride"
    }
   ],
   "say": "used to I didn't use to like vegetables. This street used to be quiet. My grandpa used to listen to the radio. Did you use to wear glasses? We used to live in a small flat. She used to ride her bike to school."
  }
 },
 {
  "id": "jana-79",
  "order": 79,
  "levelId": "l3",
  "titleAr": "تمرين: ever و never",
  "titleEn": "Practice: ever and never",
  "content": {
   "explanationAr": "تمرين: Have you ever...? نسأل عن تجربة. و I have never... يعني عمري ما. الفعل يكون بصيغة المفعول: been, seen, eaten.",
   "altExplanationAr": "Have you ever seen a camel race?",
   "example": [
    {
     "en": "Have you ever seen a camel race?",
     "ar": "قد شفت سباق هجن؟"
    },
    {
     "en": "I have never eaten octopus.",
     "ar": "عمري ما أكلت أخطبوط."
    },
    {
     "en": "Has your dad ever climbed a mountain?",
     "ar": "أبوك قد تسلق جبل؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Have you ever ___ a camel race?",
    "options": [
     "saw",
     "seen",
     "see"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I have ___ eaten octopus.",
     "options": [
      "ever",
      "yet",
      "never"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Has your dad ever climbed a mountain?",
     "options": [
      "أبوك قد تسلق جبل؟",
      "عمرنا ما ركبنا قارب.",
      "كتبت كتابين."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We have never ___ on a boat.",
     "options": [
      "was",
      "been",
      "be"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: ever and never"
   },
   {
    "kind": "highlight",
    "text": "ever · never"
   },
   {
    "kind": "example",
    "en": "Have you ever seen a camel race?",
    "ar": "قد شفت سباق هجن؟"
   },
   {
    "kind": "example",
    "en": "I have never eaten octopus.",
    "ar": "عمري ما أكلت أخطبوط."
   }
  ],
  "kids": {
   "listTitle": "ever · never",
   "cards": [
    {
     "emoji": "🐪",
     "en": "Have you ever seen a camel race?",
     "ar": "قد شفت سباق هجن؟",
     "hl": "seen"
    },
    {
     "emoji": "🙅",
     "en": "I have never eaten octopus.",
     "ar": "عمري ما أكلت أخطبوط.",
     "hl": "never"
    },
    {
     "emoji": "🏔️",
     "en": "Has your dad ever climbed a mountain?",
     "ar": "أبوك قد تسلق جبل؟",
     "hl": "climbed"
    },
    {
     "emoji": "🌊",
     "en": "We have never been on a boat.",
     "ar": "عمرنا ما ركبنا قارب.",
     "hl": "been"
    },
    {
     "emoji": "✍️",
     "en": "She has written two books.",
     "ar": "كتبت كتابين.",
     "hl": "written"
    },
    {
     "emoji": "🎢",
     "en": "Have they ever been to Six Flags?",
     "ar": "قد راحوا سكس فلاقز؟",
     "hl": "been"
    }
   ],
   "say": "ever · never Have you ever seen a camel race? I have never eaten octopus. Has your dad ever climbed a mountain? We have never been on a boat. She has written two books. Have they ever been to Six Flags?"
  }
 },
 {
  "id": "jana-80",
  "order": 80,
  "levelId": "l3",
  "titleAr": "تمرين: just و already و yet",
  "titleEn": "Practice: just, already, yet",
  "content": {
   "explanationAr": "تمرين: just: توّه، already: خلاص من قبل، yet: للحين (في السؤال والنفي وتجي آخر الجملة).",
   "altExplanationAr": "Has the film started yet? It has just started.",
   "example": [
    {
     "en": "The film has just started.",
     "ar": "الفيلم توه بدأ."
    },
    {
     "en": "Have you finished your salad yet?",
     "ar": "خلصت سلطتك ولا للحين؟"
    },
    {
     "en": "I have already packed my bag.",
     "ar": "خلاص جهزت شنطتي."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "The film has ___ started.",
    "options": [
     "yet",
     "ever",
     "just"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Have you finished your salad ___?",
     "options": [
      "yet",
      "already",
      "just"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I have already packed my bag.",
     "options": [
      "الطرد ما وصل للحين.",
      "خلاص جهزت شنطتي.",
      "توّني سويت قهوة."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The parcel hasn't arrived ___.",
     "options": [
      "already",
      "just",
      "yet"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: just, already, yet"
   },
   {
    "kind": "highlight",
    "text": "just · already · yet"
   },
   {
    "kind": "example",
    "en": "The film has just started.",
    "ar": "الفيلم توه بدأ."
   },
   {
    "kind": "example",
    "en": "Have you finished your salad yet?",
    "ar": "خلصت سلطتك ولا للحين؟"
   }
  ],
  "kids": {
   "listTitle": "just · already · yet",
   "cards": [
    {
     "emoji": "🎬",
     "en": "The film has just started.",
     "ar": "الفيلم توه بدأ.",
     "hl": "just"
    },
    {
     "emoji": "🥗",
     "en": "Have you finished your salad yet?",
     "ar": "خلصت سلطتك ولا للحين؟",
     "hl": "yet"
    },
    {
     "emoji": "🧳",
     "en": "I have already packed my bag.",
     "ar": "خلاص جهزت شنطتي.",
     "hl": "already"
    },
    {
     "emoji": "📬",
     "en": "The parcel hasn't arrived yet.",
     "ar": "الطرد ما وصل للحين.",
     "hl": "yet"
    },
    {
     "emoji": "☕",
     "en": "I have just made some coffee.",
     "ar": "توّني سويت قهوة.",
     "hl": "just"
    },
    {
     "emoji": "🎟️",
     "en": "We have already seen this film.",
     "ar": "شفنا هالفيلم من قبل.",
     "hl": "already"
    }
   ],
   "say": "just · already · yet The film has just started. Have you finished your salad yet? I have already packed my bag. The parcel hasn't arrived yet. I have just made some coffee. We have already seen this film."
  }
 },
 {
  "id": "jana-81",
  "order": 81,
  "levelId": "l3",
  "titleAr": "تمرين: for و since",
  "titleEn": "Practice: for and since",
  "content": {
   "explanationAr": "تمرين: for مع المدة: for two years. و since مع نقطة البداية: since 2020، since Monday.",
   "altExplanationAr": "I have lived here for ten years. I have lived here since 2016.",
   "example": [
    {
     "en": "We have lived here for ten years.",
     "ar": "ساكنين هنا من عشر سنين."
    },
    {
     "en": "She has worked here since 2019.",
     "ar": "تشتغل هنا من ٢٠١٩."
    },
    {
     "en": "I have waited for an hour.",
     "ar": "انتظرت ساعة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "We have lived here ___ ten years.",
    "options": [
     "for",
     "since",
     "from"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She has worked here ___ 2019.",
     "options": [
      "for",
      "since",
      "from"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I have waited for an hour.",
     "options": [
      "الجو حر من يوم الاثنين.",
      "إحنا أصحاب من زمان.",
      "انتظرت ساعة."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "It has been hot ___ Monday.",
     "options": [
      "since",
      "for",
      "from"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: for and since"
   },
   {
    "kind": "highlight",
    "text": "for · since"
   },
   {
    "kind": "example",
    "en": "We have lived here for ten years.",
    "ar": "ساكنين هنا من عشر سنين."
   },
   {
    "kind": "example",
    "en": "She has worked here since 2019.",
    "ar": "تشتغل هنا من ٢٠١٩."
   }
  ],
  "kids": {
   "listTitle": "for · since",
   "cards": [
    {
     "emoji": "🏡",
     "en": "We have lived here for ten years.",
     "ar": "ساكنين هنا من عشر سنين.",
     "hl": "for"
    },
    {
     "emoji": "📅",
     "en": "She has worked here since 2019.",
     "ar": "تشتغل هنا من ٢٠١٩.",
     "hl": "since"
    },
    {
     "emoji": "⏳",
     "en": "I have waited for an hour.",
     "ar": "انتظرت ساعة.",
     "hl": "for"
    },
    {
     "emoji": "☀️",
     "en": "It has been hot since Monday.",
     "ar": "الجو حر من يوم الاثنين.",
     "hl": "since"
    },
    {
     "emoji": "🤝",
     "en": "We have been friends for a long time.",
     "ar": "إحنا أصحاب من زمان.",
     "hl": "for"
    },
    {
     "emoji": "🏫",
     "en": "He has been a teacher since last year.",
     "ar": "صار معلم من السنة اللي فاتت.",
     "hl": "since"
    }
   ],
   "say": "for · since We have lived here for ten years. She has worked here since 2019. I have waited for an hour. It has been hot since Monday. We have been friends for a long time. He has been a teacher since last year."
  }
 },
 {
  "id": "jana-82",
  "order": 82,
  "levelId": "l3",
  "titleAr": "تمرين: المقارنة",
  "titleEn": "Practice: Comparatives",
  "content": {
   "explanationAr": "تمرين: الكلمة القصيرة + er: cheaper. الكلمة الطويلة: more + الكلمة: more useful. وشاذة: good ← better، bad ← worse.",
   "altExplanationAr": "My new phone is better than my old one.",
   "example": [
    {
     "en": "My new phone is better than my old one.",
     "ar": "جوالي الجديد أحسن من القديم."
    },
    {
     "en": "Apples are cheaper than mangoes.",
     "ar": "التفاح أرخص من المانجو."
    },
    {
     "en": "This app is more useful than that one.",
     "ar": "هالتطبيق أفيد من ذاك."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "My new phone is ___ than my old one.",
    "options": [
     "gooder",
     "better",
     "best"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Apples are ___ than mangoes.",
     "options": [
      "cheap",
      "cheapest",
      "cheaper"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "This app is more useful than that one.",
     "options": [
      "هالتطبيق أفيد من ذاك.",
      "أحس إني أسوأ اليوم.",
      "ليالي الشتاء أطول من ليالي الصيف."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I feel ___ today.",
     "options": [
      "bad",
      "worse",
      "worst"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Comparatives"
   },
   {
    "kind": "highlight",
    "text": "Comparatives"
   },
   {
    "kind": "example",
    "en": "My new phone is better than my old one.",
    "ar": "جوالي الجديد أحسن من القديم."
   },
   {
    "kind": "example",
    "en": "Apples are cheaper than mangoes.",
    "ar": "التفاح أرخص من المانجو."
   }
  ],
  "kids": {
   "listTitle": "Comparatives",
   "cards": [
    {
     "emoji": "📱",
     "en": "My new phone is better than my old one.",
     "ar": "جوالي الجديد أحسن من القديم.",
     "hl": "better"
    },
    {
     "emoji": "🍎",
     "en": "Apples are cheaper than mangoes.",
     "ar": "التفاح أرخص من المانجو.",
     "hl": "cheaper"
    },
    {
     "emoji": "🧠",
     "en": "This app is more useful than that one.",
     "ar": "هالتطبيق أفيد من ذاك.",
     "hl": "more"
    },
    {
     "emoji": "🤒",
     "en": "I feel worse today.",
     "ar": "أحس إني أسوأ اليوم.",
     "hl": "worse"
    },
    {
     "emoji": "🌙",
     "en": "Winter nights are longer than summer nights.",
     "ar": "ليالي الشتاء أطول من ليالي الصيف.",
     "hl": "longer"
    },
    {
     "emoji": "🏙️",
     "en": "Dubai is busier than our town.",
     "ar": "دبي أزحم من بلدتنا.",
     "hl": "busier"
    }
   ],
   "say": "Comparatives My new phone is better than my old one. Apples are cheaper than mangoes. This app is more useful than that one. I feel worse today. Winter nights are longer than summer nights. Dubai is busier than our town."
  }
 },
 {
  "id": "jana-83",
  "order": 83,
  "levelId": "l3",
  "titleAr": "تمرين: الأعلى درجة",
  "titleEn": "Practice: Superlatives",
  "content": {
   "explanationAr": "تمرين: the + est أو the most، وشاذة: the best، the worst. ونقول in قبل المكان: the best in the class.",
   "altExplanationAr": "Fatima is the cleverest girl in the class.",
   "example": [
    {
     "en": "Fatima is the cleverest girl in the class.",
     "ar": "فاطمة أشطر بنت في الفصل."
    },
    {
     "en": "This is the most delicious cake!",
     "ar": "هذي ألذ كيكة!"
    },
    {
     "en": "The Empty Quarter is the largest sand desert.",
     "ar": "الربع الخالي أكبر صحراء رملية."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Fatima is the ___ girl in the class.",
    "options": [
     "cleverer",
     "clever",
     "cleverest"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "This is the ___ delicious cake!",
     "options": [
      "most",
      "more",
      "much"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "The Empty Quarter is the largest sand desert.",
     "options": [
      "يوليو أحر شهر في الرياض.",
      "الربع الخالي أكبر صحراء رملية.",
      "السلحفاة أبطأ حيوان في السباق."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "July is the ___ month in Riyadh.",
     "options": [
      "hotter",
      "hot",
      "hottest"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Superlatives"
   },
   {
    "kind": "highlight",
    "text": "Superlatives"
   },
   {
    "kind": "example",
    "en": "Fatima is the cleverest girl in the class.",
    "ar": "فاطمة أشطر بنت في الفصل."
   },
   {
    "kind": "example",
    "en": "This is the most delicious cake!",
    "ar": "هذي ألذ كيكة!"
   }
  ],
  "kids": {
   "listTitle": "Superlatives",
   "cards": [
    {
     "emoji": "🧕",
     "en": "Fatima is the cleverest girl in the class.",
     "ar": "فاطمة أشطر بنت في الفصل.",
     "hl": "cleverest"
    },
    {
     "emoji": "🍫",
     "en": "This is the most delicious cake!",
     "ar": "هذي ألذ كيكة!",
     "hl": "most"
    },
    {
     "emoji": "🏜️",
     "en": "The Empty Quarter is the largest sand desert.",
     "ar": "الربع الخالي أكبر صحراء رملية.",
     "hl": "largest"
    },
    {
     "emoji": "🌡️",
     "en": "July is the hottest month in Riyadh.",
     "ar": "يوليو أحر شهر في الرياض.",
     "hl": "hottest"
    },
    {
     "emoji": "🐢",
     "en": "The tortoise is the slowest animal in the race.",
     "ar": "السلحفاة أبطأ حيوان في السباق.",
     "hl": "slowest"
    },
    {
     "emoji": "⭐",
     "en": "You are the kindest person I know.",
     "ar": "أنت أطيب شخص أعرفه.",
     "hl": "kindest"
    }
   ],
   "say": "Superlatives Fatima is the cleverest girl in the class. This is the most delicious cake! The Empty Quarter is the largest sand desert. July is the hottest month in Riyadh. The tortoise is the slowest animal in the race. You are the kindest person I know."
  }
 },
 {
  "id": "jana-84",
  "order": 84,
  "levelId": "l3",
  "titleAr": "تمرين: as ... as",
  "titleEn": "Practice: as ... as",
  "content": {
   "explanationAr": "تمرين: as + الصفة + as يعني «نفس الشي أو زي»: He is as tall as his father. والنفي: not as big as.",
   "altExplanationAr": "My bag is not as heavy as yours.",
   "example": [
    {
     "en": "Omar is as tall as his father.",
     "ar": "عمر طوله زي أبوه."
    },
    {
     "en": "My bag is not as heavy as yours.",
     "ar": "شنطتي مو ثقيلة زي شنطتك."
    },
    {
     "en": "A cat is not as fast as a cheetah.",
     "ar": "القطة مو سريعة زي الفهد."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Omar is as ___ as his father.",
    "options": [
     "tall",
     "taller",
     "tallest"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "My bag is not as ___ as yours.",
     "options": [
      "heavier",
      "heavy",
      "heaviest"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "A cat is not as fast as a cheetah.",
     "options": [
      "هالعصير حامض زي الليمون.",
      "شقتنا كبيرة زي بيتكم.",
      "القطة مو سريعة زي الفهد."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "This juice is as ___ as a lemon.",
     "options": [
      "sour",
      "sourer",
      "sourest"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: as ... as"
   },
   {
    "kind": "highlight",
    "text": "as ... as"
   },
   {
    "kind": "example",
    "en": "Omar is as tall as his father.",
    "ar": "عمر طوله زي أبوه."
   },
   {
    "kind": "example",
    "en": "My bag is not as heavy as yours.",
    "ar": "شنطتي مو ثقيلة زي شنطتك."
   }
  ],
  "kids": {
   "listTitle": "as ... as",
   "cards": [
    {
     "emoji": "🧍",
     "en": "Omar is as tall as his father.",
     "ar": "عمر طوله زي أبوه.",
     "hl": "tall"
    },
    {
     "emoji": "🎒",
     "en": "My bag is not as heavy as yours.",
     "ar": "شنطتي مو ثقيلة زي شنطتك.",
     "hl": "heavy"
    },
    {
     "emoji": "🐆",
     "en": "A cat is not as fast as a cheetah.",
     "ar": "القطة مو سريعة زي الفهد.",
     "hl": "fast"
    },
    {
     "emoji": "🍋",
     "en": "This juice is as sour as a lemon.",
     "ar": "هالعصير حامض زي الليمون.",
     "hl": "sour"
    },
    {
     "emoji": "🏠",
     "en": "Our flat is as big as your house.",
     "ar": "شقتنا كبيرة زي بيتكم.",
     "hl": "big"
    },
    {
     "emoji": "📕",
     "en": "The film wasn't as good as the book.",
     "ar": "الفيلم ما كان حلو زي الكتاب.",
     "hl": "good"
    }
   ],
   "say": "as ... as Omar is as tall as his father. My bag is not as heavy as yours. A cat is not as fast as a cheetah. This juice is as sour as a lemon. Our flat is as big as your house. The film wasn't as good as the book."
  }
 },
 {
  "id": "jana-85",
  "order": 85,
  "levelId": "l3",
  "titleAr": "تمرين: too و enough",
  "titleEn": "Practice: too and enough",
  "content": {
   "explanationAr": "تمرين: too: زيادة عن اللازم: too hot. و enough: كافي، وتجي بعد الصفة: old enough.",
   "altExplanationAr": "The tea is too hot. I'm not old enough to drive.",
   "example": [
    {
     "en": "The tea is too hot to drink.",
     "ar": "الشاي حار زيادة ما ينشرب."
    },
    {
     "en": "I'm not old enough to drive.",
     "ar": "عمري ما يكفي عشان أسوق."
    },
    {
     "en": "These trousers are too short.",
     "ar": "هالبنطلون قصير زيادة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "The tea is ___ hot to drink.",
    "options": [
     "enough",
     "too",
     "much"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I'm not old ___ to drive.",
     "options": [
      "too",
      "so",
      "enough"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "These trousers are too short.",
     "options": [
      "هالبنطلون قصير زيادة.",
      "الكراسي ما تكفي.",
      "هالشنطة غالية علي زيادة."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "There aren't ___ chairs.",
     "options": [
      "too",
      "enough",
      "so"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: too and enough"
   },
   {
    "kind": "highlight",
    "text": "too · enough"
   },
   {
    "kind": "example",
    "en": "The tea is too hot to drink.",
    "ar": "الشاي حار زيادة ما ينشرب."
   },
   {
    "kind": "example",
    "en": "I'm not old enough to drive.",
    "ar": "عمري ما يكفي عشان أسوق."
   }
  ],
  "kids": {
   "listTitle": "too · enough",
   "cards": [
    {
     "emoji": "🫖",
     "en": "The tea is too hot to drink.",
     "ar": "الشاي حار زيادة ما ينشرب.",
     "hl": "too"
    },
    {
     "emoji": "🚗",
     "en": "I'm not old enough to drive.",
     "ar": "عمري ما يكفي عشان أسوق.",
     "hl": "enough"
    },
    {
     "emoji": "👖",
     "en": "These trousers are too short.",
     "ar": "هالبنطلون قصير زيادة.",
     "hl": "too"
    },
    {
     "emoji": "🪑",
     "en": "There aren't enough chairs.",
     "ar": "الكراسي ما تكفي.",
     "hl": "enough"
    },
    {
     "emoji": "💸",
     "en": "This bag is too expensive for me.",
     "ar": "هالشنطة غالية علي زيادة.",
     "hl": "too"
    },
    {
     "emoji": "🏀",
     "en": "He is tall enough to play basketball.",
     "ar": "طوله يكفي يلعب كورة سلة.",
     "hl": "enough"
    }
   ],
   "say": "too · enough The tea is too hot to drink. I'm not old enough to drive. These trousers are too short. There aren't enough chairs. This bag is too expensive for me. He is tall enough to play basketball."
  }
 },
 {
  "id": "jana-86",
  "order": 86,
  "levelId": "l3",
  "titleAr": "تمرين: so و because و but",
  "titleEn": "Practice: so, because, but",
  "content": {
   "explanationAr": "تمرين: because للسبب، so للنتيجة، but للعكس. I was tired, so I slept. I slept because I was tired.",
   "altExplanationAr": "It was late, but we kept playing.",
   "example": [
    {
     "en": "I was tired, so I went to bed early.",
     "ar": "كنت تعبان، فنمت بدري."
    },
    {
     "en": "She took an umbrella because it was cloudy.",
     "ar": "أخذت مظلة لأن الجو غايم."
    },
    {
     "en": "It was late, but we kept playing.",
     "ar": "كان الوقت متأخر، بس كملنا لعب."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I was tired, ___ I went to bed early.",
    "options": [
     "because",
     "but",
     "so"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She took an umbrella ___ it was cloudy.",
     "options": [
      "because",
      "so",
      "but"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "It was late, but we kept playing.",
     "options": [
      "جلس في البيت لأنه مزكوم.",
      "كان الوقت متأخر، بس كملنا لعب.",
      "المحل كان مسكّر، فرجعنا البيت."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He stayed at home ___ he had a cold.",
     "options": [
      "so",
      "or",
      "because"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: so, because, but"
   },
   {
    "kind": "highlight",
    "text": "Linking words"
   },
   {
    "kind": "example",
    "en": "I was tired, so I went to bed early.",
    "ar": "كنت تعبان، فنمت بدري."
   },
   {
    "kind": "example",
    "en": "She took an umbrella because it was cloudy.",
    "ar": "أخذت مظلة لأن الجو غايم."
   }
  ],
  "kids": {
   "listTitle": "Linking words",
   "cards": [
    {
     "emoji": "😴",
     "en": "I was tired, so I went to bed early.",
     "ar": "كنت تعبان، فنمت بدري.",
     "hl": "so"
    },
    {
     "emoji": "🌂",
     "en": "She took an umbrella because it was cloudy.",
     "ar": "أخذت مظلة لأن الجو غايم.",
     "hl": "because"
    },
    {
     "emoji": "🌙",
     "en": "It was late, but we kept playing.",
     "ar": "كان الوقت متأخر، بس كملنا لعب.",
     "hl": "but"
    },
    {
     "emoji": "🤧",
     "en": "He stayed at home because he had a cold.",
     "ar": "جلس في البيت لأنه مزكوم.",
     "hl": "because"
    },
    {
     "emoji": "🛍️",
     "en": "The shop was closed, so we went home.",
     "ar": "المحل كان مسكّر، فرجعنا البيت.",
     "hl": "so"
    },
    {
     "emoji": "🍜",
     "en": "The soup was hot, but I ate it quickly.",
     "ar": "الشوربة كانت حارة، بس أكلتها بسرعة.",
     "hl": "but"
    }
   ],
   "say": "Linking words I was tired, so I went to bed early. She took an umbrella because it was cloudy. It was late, but we kept playing. He stayed at home because he had a cold. The shop was closed, so we went home. The soup was hot, but I ate it quickly."
  }
 },
 {
  "id": "jana-87",
  "order": 87,
  "levelId": "l3",
  "titleAr": "تمرين: first و then و after that",
  "titleEn": "Practice: Telling the Order",
  "content": {
   "explanationAr": "تمرين ترتيب الأحداث: First أولًا، Then بعدين، After that بعد كذا، Finally وأخيرًا.",
   "altExplanationAr": "First we packed, then we drove, and finally we arrived.",
   "example": [
    {
     "en": "First, wash the rice.",
     "ar": "أول شي، اغسل الرز."
    },
    {
     "en": "Then, boil some water.",
     "ar": "بعدين، اغلِ شوية ماي."
    },
    {
     "en": "After that, add a little salt.",
     "ar": "بعد كذا، حط شوية ملح."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___, wash the rice.",
    "options": [
     "First",
     "Ago",
     "Than"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___, boil some water.",
     "options": [
      "Than",
      "Then",
      "Ago"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "After that, add a little salt.",
     "options": [
      "وأخيرًا، وصلنا المخيم.",
      "أول شي، عبينا السيارة.",
      "بعد كذا، حط شوية ملح."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___, we arrived at the camp.",
     "options": [
      "Finally",
      "Final",
      "Finish"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Telling the Order"
   },
   {
    "kind": "highlight",
    "text": "first · then · finally"
   },
   {
    "kind": "example",
    "en": "First, wash the rice.",
    "ar": "أول شي، اغسل الرز."
   },
   {
    "kind": "example",
    "en": "Then, boil some water.",
    "ar": "بعدين، اغلِ شوية ماي."
   }
  ],
  "kids": {
   "listTitle": "first · then · finally",
   "cards": [
    {
     "emoji": "1️⃣",
     "en": "First, wash the rice.",
     "ar": "أول شي، اغسل الرز.",
     "hl": "First"
    },
    {
     "emoji": "🔥",
     "en": "Then, boil some water.",
     "ar": "بعدين، اغلِ شوية ماي.",
     "hl": "Then"
    },
    {
     "emoji": "🧂",
     "en": "After that, add a little salt.",
     "ar": "بعد كذا، حط شوية ملح.",
     "hl": "After"
    },
    {
     "emoji": "🏁",
     "en": "Finally, we arrived at the camp.",
     "ar": "وأخيرًا، وصلنا المخيم.",
     "hl": "Finally"
    },
    {
     "emoji": "🧳",
     "en": "First, we packed the car.",
     "ar": "أول شي، عبينا السيارة.",
     "hl": "First"
    },
    {
     "emoji": "🗺️",
     "en": "Then, we followed the map.",
     "ar": "بعدين، مشينا على الخريطة.",
     "hl": "Then"
    }
   ],
   "say": "first · then · finally First, wash the rice. Then, boil some water. After that, add a little salt. Finally, we arrived at the camp. First, we packed the car. Then, we followed the map."
  }
 },
 {
  "id": "jana-88",
  "order": 88,
  "levelId": "l3",
  "titleAr": "مراجعة: الماضي",
  "titleEn": "Review: The Past",
  "content": {
   "explanationAr": "مراجعة الماضي: ed والأفعال الشاذة و didn't و Did والماضي المستمر.",
   "altExplanationAr": "اقرأ الجملة وفكر: هل الفعل عادي ولا شاذ؟",
   "example": [
    {
     "en": "We bought a huge watermelon.",
     "ar": "اشترينا بطيخة ضخمة."
    },
    {
     "en": "I learned to swim last summer.",
     "ar": "تعلمت السباحة الصيف اللي فات."
    },
    {
     "en": "Did you read the story?",
     "ar": "قريت القصة؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "We ___ a huge watermelon.",
    "options": [
     "buyed",
     "bought",
     "buy"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I ___ to swim last summer.",
     "options": [
      "learn",
      "learns",
      "learned"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Did you read the story?",
     "options": [
      "قريت القصة؟",
      "أبوي كان يسوي الغدا لما وصلنا.",
      "ما أخذنا مظلة."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Dad was ___ lunch when we arrived.",
     "options": [
      "make",
      "making",
      "made"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Review: The Past"
   },
   {
    "kind": "highlight",
    "text": "Review"
   },
   {
    "kind": "example",
    "en": "We bought a huge watermelon.",
    "ar": "اشترينا بطيخة ضخمة."
   },
   {
    "kind": "example",
    "en": "I learned to swim last summer.",
    "ar": "تعلمت السباحة الصيف اللي فات."
   }
  ],
  "kids": {
   "listTitle": "Review",
   "cards": [
    {
     "emoji": "🍉",
     "en": "We bought a huge watermelon.",
     "ar": "اشترينا بطيخة ضخمة.",
     "hl": "bought"
    },
    {
     "emoji": "🏊",
     "en": "I learned to swim last summer.",
     "ar": "تعلمت السباحة الصيف اللي فات.",
     "hl": "learned"
    },
    {
     "emoji": "📖",
     "en": "Did you read the story?",
     "ar": "قريت القصة؟",
     "hl": "read"
    },
    {
     "emoji": "🧑‍🍳",
     "en": "Dad was making lunch when we arrived.",
     "ar": "أبوي كان يسوي الغدا لما وصلنا.",
     "hl": "making"
    },
    {
     "emoji": "☔",
     "en": "We didn't take an umbrella.",
     "ar": "ما أخذنا مظلة.",
     "hl": "take"
    },
    {
     "emoji": "🌴",
     "en": "They sat in the shade.",
     "ar": "جلسوا في الظل.",
     "hl": "sat"
    }
   ],
   "say": "Review We bought a huge watermelon. I learned to swim last summer. Did you read the story? Dad was making lunch when we arrived. We didn't take an umbrella. They sat in the shade."
  }
 },
 {
  "id": "jana-89",
  "order": 89,
  "levelId": "l3",
  "titleAr": "مراجعة: المستقبل والتجارب",
  "titleEn": "Review: Future and Experiences",
  "content": {
   "explanationAr": "مراجعة going to و will و ing للمواعيد و ever و just و for و since.",
   "altExplanationAr": "I'm going to... أو I'll... أو Have you ever...?",
   "example": [
    {
     "en": "One day I'm going to see the world.",
     "ar": "يوم من الأيام بشوف العالم."
    },
    {
     "en": "I'll answer the door.",
     "ar": "بفتح الباب أنا."
    },
    {
     "en": "We are leaving at dawn.",
     "ar": "بنمشي الفجر."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "One day I'm ___ to see the world.",
    "options": [
     "go",
     "gone",
     "going"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I'll ___ the door.",
     "options": [
      "answer",
      "answers",
      "answered"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "We are leaving at dawn.",
     "options": [
      "قد لمست حمار وحشي؟",
      "بنمشي الفجر.",
      "يتدرب هنا من مارس."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Have you ever ___ a zebra?",
     "options": [
      "touch",
      "touches",
      "touched"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Review: Future and Experiences"
   },
   {
    "kind": "highlight",
    "text": "Review"
   },
   {
    "kind": "example",
    "en": "One day I'm going to see the world.",
    "ar": "يوم من الأيام بشوف العالم."
   },
   {
    "kind": "example",
    "en": "I'll answer the door.",
    "ar": "بفتح الباب أنا."
   }
  ],
  "kids": {
   "listTitle": "Review",
   "cards": [
    {
     "emoji": "🌍",
     "en": "One day I'm going to see the world.",
     "ar": "يوم من الأيام بشوف العالم.",
     "hl": "going"
    },
    {
     "emoji": "🙋",
     "en": "I'll answer the door.",
     "ar": "بفتح الباب أنا.",
     "hl": "answer"
    },
    {
     "emoji": "🛫",
     "en": "We are leaving at dawn.",
     "ar": "بنمشي الفجر.",
     "hl": "leaving"
    },
    {
     "emoji": "🦓",
     "en": "Have you ever touched a zebra?",
     "ar": "قد لمست حمار وحشي؟",
     "hl": "touched"
    },
    {
     "emoji": "🏋️",
     "en": "He has trained here since March.",
     "ar": "يتدرب هنا من مارس.",
     "hl": "since"
    },
    {
     "emoji": "🍪",
     "en": "I have just baked some cookies.",
     "ar": "توّني خبزت كوكيز.",
     "hl": "just"
    }
   ],
   "say": "Review One day I'm going to see the world. I'll answer the door. We are leaving at dawn. Have you ever touched a zebra? He has trained here since March. I have just baked some cookies."
  }
 },
 {
  "id": "jana-90",
  "order": 90,
  "levelId": "l3",
  "titleAr": "مراجعة المستوى الثالث",
  "titleEn": "Level 3 Review",
  "content": {
   "explanationAr": "مراجعة شاملة للمستوى الثالث من تمارين جنى: الماضي، المستقبل، could و had to و used to، والمقارنة.",
   "altExplanationAr": "خذ وقتك، واقرأ الجملة كاملة قبل ما تختار.",
   "example": [
    {
     "en": "My dad used to be a teacher.",
     "ar": "أبوي كان معلم زمان."
    },
    {
     "en": "We couldn't see anything.",
     "ar": "ما قدرنا نشوف شي."
    },
    {
     "en": "She is the best player on the team.",
     "ar": "هي أحسن لاعبة في الفريق."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "My dad ___ to be a teacher.",
    "options": [
     "used",
     "use",
     "uses"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We ___ see anything.",
     "options": [
      "can't",
      "couldn't",
      "won't"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "She is the best player on the team.",
     "options": [
      "الماي مو بارد كفاية.",
      "بيسافر الناس للقمر للإجازات؟",
      "هي أحسن لاعبة في الفريق."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The water isn't cold ___.",
     "options": [
      "enough",
      "too",
      "very"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Level 3 Review"
   },
   {
    "kind": "highlight",
    "text": "Level 3 Review"
   },
   {
    "kind": "example",
    "en": "My dad used to be a teacher.",
    "ar": "أبوي كان معلم زمان."
   },
   {
    "kind": "example",
    "en": "We couldn't see anything.",
    "ar": "ما قدرنا نشوف شي."
   }
  ],
  "kids": {
   "listTitle": "Level 3 Review",
   "cards": [
    {
     "emoji": "🧑‍🏫",
     "en": "My dad used to be a teacher.",
     "ar": "أبوي كان معلم زمان.",
     "hl": "used"
    },
    {
     "emoji": "🔦",
     "en": "We couldn't see anything.",
     "ar": "ما قدرنا نشوف شي.",
     "hl": "couldn't"
    },
    {
     "emoji": "🏅",
     "en": "She is the best player on the team.",
     "ar": "هي أحسن لاعبة في الفريق.",
     "hl": "best"
    },
    {
     "emoji": "🧊",
     "en": "The water isn't cold enough.",
     "ar": "الماي مو بارد كفاية.",
     "hl": "enough"
    },
    {
     "emoji": "🚀",
     "en": "Will people travel to the moon for holidays?",
     "ar": "بيسافر الناس للقمر للإجازات؟",
     "hl": "travel"
    },
    {
     "emoji": "🧺",
     "en": "They had to carry everything.",
     "ar": "كان لازم يشيلون كل شي.",
     "hl": "carry"
    }
   ],
   "say": "Level 3 Review My dad used to be a teacher. We couldn't see anything. She is the best player on the team. The water isn't cold enough. Will people travel to the moon for holidays? They had to carry everything."
  }
 },
 {
  "id": "jana-91",
  "order": 91,
  "levelId": "l4",
  "titleAr": "تمرين: should و shouldn't",
  "titleEn": "Practice: should, shouldn't",
  "content": {
   "explanationAr": "تمرين: should للنصيحة، و shouldn't للنصيحة بعدم الفعل. بعدهم الفعل الأصلي.",
   "altExplanationAr": "You should drink more water.",
   "example": [
    {
     "en": "You should drink more water.",
     "ar": "المفروض تشرب ماي أكثر."
    },
    {
     "en": "You shouldn't use your phone in class.",
     "ar": "ما ينبغي تستخدم جوالك في الحصة."
    },
    {
     "en": "She should wear a coat today.",
     "ar": "المفروض تلبس جاكيت اليوم."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "You should ___ more water.",
    "options": [
     "drinks",
     "drink",
     "drank"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "You shouldn't ___ your phone in class.",
     "options": [
      "uses",
      "using",
      "use"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "She should wear a coat today.",
     "options": [
      "المفروض تلبس جاكيت اليوم.",
      "الأطفال ما ينبغي ياكلون حلاوة واجد.",
      "أروح لدكتور أسنان؟"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Kids shouldn't ___ too many sweets.",
     "options": [
      "eats",
      "eat",
      "eating"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: should, shouldn't"
   },
   {
    "kind": "highlight",
    "text": "should"
   },
   {
    "kind": "example",
    "en": "You should drink more water.",
    "ar": "المفروض تشرب ماي أكثر."
   },
   {
    "kind": "example",
    "en": "You shouldn't use your phone in class.",
    "ar": "ما ينبغي تستخدم جوالك في الحصة."
   }
  ],
  "kids": {
   "listTitle": "should",
   "cards": [
    {
     "emoji": "💧",
     "en": "You should drink more water.",
     "ar": "المفروض تشرب ماي أكثر.",
     "hl": "drink"
    },
    {
     "emoji": "📵",
     "en": "You shouldn't use your phone in class.",
     "ar": "ما ينبغي تستخدم جوالك في الحصة.",
     "hl": "use"
    },
    {
     "emoji": "🧥",
     "en": "She should wear a coat today.",
     "ar": "المفروض تلبس جاكيت اليوم.",
     "hl": "wear"
    },
    {
     "emoji": "🍬",
     "en": "Kids shouldn't eat too many sweets.",
     "ar": "الأطفال ما ينبغي ياكلون حلاوة واجد.",
     "hl": "eat"
    },
    {
     "emoji": "🦷",
     "en": "Should I see a dentist?",
     "ar": "أروح لدكتور أسنان؟",
     "hl": "see"
    },
    {
     "emoji": "🛌",
     "en": "We should go to bed now.",
     "ar": "المفروض ننام الحين.",
     "hl": "go"
    }
   ],
   "say": "should You should drink more water. You shouldn't use your phone in class. She should wear a coat today. Kids shouldn't eat too many sweets. Should I see a dentist? We should go to bed now."
  }
 },
 {
  "id": "jana-92",
  "order": 92,
  "levelId": "l4",
  "titleAr": "تمرين: must و mustn't و don't have to",
  "titleEn": "Practice: must, mustn't, don't have to",
  "content": {
   "explanationAr": "تمرين: must: لازم، mustn't: ممنوع، don't have to: مو لازم (براحتك).",
   "altExplanationAr": "You mustn't run near the pool. You don't have to come.",
   "example": [
    {
     "en": "You mustn't run near the pool.",
     "ar": "ممنوع تركض جنب المسبح."
    },
    {
     "en": "You must show your ticket.",
     "ar": "لازم تطلع تذكرتك."
    },
    {
     "en": "You don't have to help. I'm fine.",
     "ar": "مو لازم تساعد، أنا تمام."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "You ___ run near the pool.",
    "options": [
     "don't have",
     "haven't",
     "mustn't"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "You must ___ your ticket.",
     "options": [
      "show",
      "shows",
      "showed"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "You don't have to help. I'm fine.",
     "options": [
      "الطلاب ممنوع يتكلمون وقت الاختبار.",
      "مو لازم تساعد، أنا تمام.",
      "السواقين لازم يشيلون رخصة."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Students mustn't ___ during the test.",
     "options": [
      "talks",
      "talking",
      "talk"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: must, mustn't, don't have to"
   },
   {
    "kind": "highlight",
    "text": "must"
   },
   {
    "kind": "example",
    "en": "You mustn't run near the pool.",
    "ar": "ممنوع تركض جنب المسبح."
   },
   {
    "kind": "example",
    "en": "You must show your ticket.",
    "ar": "لازم تطلع تذكرتك."
   }
  ],
  "kids": {
   "listTitle": "must",
   "cards": [
    {
     "emoji": "🏊",
     "en": "You mustn't run near the pool.",
     "ar": "ممنوع تركض جنب المسبح.",
     "hl": "mustn't"
    },
    {
     "emoji": "🎫",
     "en": "You must show your ticket.",
     "ar": "لازم تطلع تذكرتك.",
     "hl": "show"
    },
    {
     "emoji": "🛋️",
     "en": "You don't have to help. I'm fine.",
     "ar": "مو لازم تساعد، أنا تمام.",
     "hl": "have"
    },
    {
     "emoji": "🔇",
     "en": "Students mustn't talk during the test.",
     "ar": "الطلاب ممنوع يتكلمون وقت الاختبار.",
     "hl": "talk"
    },
    {
     "emoji": "🪪",
     "en": "Drivers must carry a licence.",
     "ar": "السواقين لازم يشيلون رخصة.",
     "hl": "carry"
    },
    {
     "emoji": "🗓️",
     "en": "We don't have to work on Friday.",
     "ar": "مو لازم نشتغل يوم الجمعة.",
     "hl": "have"
    }
   ],
   "say": "must You mustn't run near the pool. You must show your ticket. You don't have to help. I'm fine. Students mustn't talk during the test. Drivers must carry a licence. We don't have to work on Friday."
  }
 },
 {
  "id": "jana-93",
  "order": 93,
  "levelId": "l4",
  "titleAr": "تمرين: may و might",
  "titleEn": "Practice: may and might",
  "content": {
   "explanationAr": "تمرين: may و might: يمكن (احتمال). بعدهم الفعل الأصلي: It might rain.",
   "altExplanationAr": "I might be late tonight.",
   "example": [
    {
     "en": "Take an umbrella. It might rain.",
     "ar": "خذ مظلة، يمكن تمطر."
    },
    {
     "en": "I might be late tonight.",
     "ar": "يمكن أتأخر الليلة."
    },
    {
     "en": "She may not come to the meeting.",
     "ar": "يمكن ما تجي الاجتماع."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Take an umbrella. It might ___.",
    "options": [
     "rain",
     "rains",
     "rained"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I might ___ late tonight.",
     "options": [
      "am",
      "be",
      "was"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "She may not come to the meeting.",
     "options": [
      "يمكن نروح نتزلج في دبي.",
      "الطرد يمكن يوصل بكرة.",
      "يمكن ما تجي الاجتماع."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We might ___ skiing in Dubai.",
     "options": [
      "go",
      "goes",
      "went"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: may and might"
   },
   {
    "kind": "highlight",
    "text": "may · might"
   },
   {
    "kind": "example",
    "en": "Take an umbrella. It might rain.",
    "ar": "خذ مظلة، يمكن تمطر."
   },
   {
    "kind": "example",
    "en": "I might be late tonight.",
    "ar": "يمكن أتأخر الليلة."
   }
  ],
  "kids": {
   "listTitle": "may · might",
   "cards": [
    {
     "emoji": "🌂",
     "en": "Take an umbrella. It might rain.",
     "ar": "خذ مظلة، يمكن تمطر.",
     "hl": "rain"
    },
    {
     "emoji": "🕗",
     "en": "I might be late tonight.",
     "ar": "يمكن أتأخر الليلة.",
     "hl": "be"
    },
    {
     "emoji": "🤷",
     "en": "She may not come to the meeting.",
     "ar": "يمكن ما تجي الاجتماع.",
     "hl": "come"
    },
    {
     "emoji": "🧊",
     "en": "We might go skiing in Dubai.",
     "ar": "يمكن نروح نتزلج في دبي.",
     "hl": "go"
    },
    {
     "emoji": "📦",
     "en": "The parcel may arrive tomorrow.",
     "ar": "الطرد يمكن يوصل بكرة.",
     "hl": "arrive"
    },
    {
     "emoji": "🎲",
     "en": "They might win, or they might lose.",
     "ar": "يمكن يفوزون ويمكن يخسرون.",
     "hl": "lose"
    }
   ],
   "say": "may · might Take an umbrella. It might rain. I might be late tonight. She may not come to the meeting. We might go skiing in Dubai. The parcel may arrive tomorrow. They might win, or they might lose."
  }
 },
 {
  "id": "jana-94",
  "order": 94,
  "levelId": "l4",
  "titleAr": "تمرين: would like",
  "titleEn": "Practice: would like",
  "content": {
   "explanationAr": "تمرين: I'd like: أبغى (بأدب). Would you like...?: تحب...؟ وبعدها اسم أو to + فعل.",
   "altExplanationAr": "Would you like some tea? I'd like to book a table.",
   "example": [
    {
     "en": "Would you like some dates?",
     "ar": "تحب تمر؟"
    },
    {
     "en": "I'd like to book a table for four.",
     "ar": "أبغى أحجز طاولة لأربعة."
    },
    {
     "en": "Would you like a piece of cake?",
     "ar": "تبغى قطعة كيك؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Would you ___ some dates?",
    "options": [
     "likes",
     "like",
     "liking"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I'd like ___ book a table for four.",
     "options": [
      "for",
      "at",
      "to"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Would you like a piece of cake?",
     "options": [
      "تبغى قطعة كيك؟",
      "نبغى غرفة هادية.",
      "تبغى تتعلم الرسم."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We ___ like a quiet room.",
     "options": [
      "will",
      "would",
      "did"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: would like"
   },
   {
    "kind": "highlight",
    "text": "would like"
   },
   {
    "kind": "example",
    "en": "Would you like some dates?",
    "ar": "تحب تمر؟"
   },
   {
    "kind": "example",
    "en": "I'd like to book a table for four.",
    "ar": "أبغى أحجز طاولة لأربعة."
   }
  ],
  "kids": {
   "listTitle": "would like",
   "cards": [
    {
     "emoji": "🌴",
     "en": "Would you like some dates?",
     "ar": "تحب تمر؟",
     "hl": "like"
    },
    {
     "emoji": "🍽️",
     "en": "I'd like to book a table for four.",
     "ar": "أبغى أحجز طاولة لأربعة.",
     "hl": "to"
    },
    {
     "emoji": "🧁",
     "en": "Would you like a piece of cake?",
     "ar": "تبغى قطعة كيك؟",
     "hl": "piece"
    },
    {
     "emoji": "🛏️",
     "en": "We would like a quiet room.",
     "ar": "نبغى غرفة هادية.",
     "hl": "would"
    },
    {
     "emoji": "🎨",
     "en": "She would like to learn painting.",
     "ar": "تبغى تتعلم الرسم.",
     "hl": "learn"
    },
    {
     "emoji": "🎧",
     "en": "What would you like to listen to?",
     "ar": "وش تحب تسمع؟",
     "hl": "would"
    }
   ],
   "say": "would like Would you like some dates? I'd like to book a table for four. Would you like a piece of cake? We would like a quiet room. She would like to learn painting. What would you like to listen to?"
  }
 },
 {
  "id": "jana-95",
  "order": 95,
  "levelId": "l4",
  "titleAr": "تمرين: How long و How far و How old",
  "titleEn": "Practice: How long, far, old?",
  "content": {
   "explanationAr": "تمرين: How old للعمر، How long للمدة أو الطول، How far للمسافة، How tall للطول، How often للتكرار.",
   "altExplanationAr": "How far is the airport? How long does it take?",
   "example": [
    {
     "en": "How old is your grandfather?",
     "ar": "كم عمر جدك؟"
    },
    {
     "en": "How far is the airport from here?",
     "ar": "كم يبعد المطار عن هنا؟"
    },
    {
     "en": "How long does the flight take?",
     "ar": "كم تاخذ الرحلة وقت؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "How ___ is your grandfather?",
    "options": [
     "long",
     "far",
     "old"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "How ___ is the airport from here?",
     "options": [
      "far",
      "long",
      "old"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "How long does the flight take?",
     "options": [
      "كم طول الزرافة؟",
      "كم تاخذ الرحلة وقت؟",
      "كم مرة تروح النادي؟"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "How ___ is a giraffe?",
     "options": [
      "old",
      "far",
      "tall"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: How long, far, old?"
   },
   {
    "kind": "highlight",
    "text": "How + adjective"
   },
   {
    "kind": "example",
    "en": "How old is your grandfather?",
    "ar": "كم عمر جدك؟"
   },
   {
    "kind": "example",
    "en": "How far is the airport from here?",
    "ar": "كم يبعد المطار عن هنا؟"
   }
  ],
  "kids": {
   "listTitle": "How + adjective",
   "cards": [
    {
     "emoji": "🎂",
     "en": "How old is your grandfather?",
     "ar": "كم عمر جدك؟",
     "hl": "old"
    },
    {
     "emoji": "🛣️",
     "en": "How far is the airport from here?",
     "ar": "كم يبعد المطار عن هنا؟",
     "hl": "far"
    },
    {
     "emoji": "⏲️",
     "en": "How long does the flight take?",
     "ar": "كم تاخذ الرحلة وقت؟",
     "hl": "long"
    },
    {
     "emoji": "🦒",
     "en": "How tall is a giraffe?",
     "ar": "كم طول الزرافة؟",
     "hl": "tall"
    },
    {
     "emoji": "🏋️",
     "en": "How often do you go to the gym?",
     "ar": "كم مرة تروح النادي؟",
     "hl": "often"
    },
    {
     "emoji": "🏊",
     "en": "How deep is the pool?",
     "ar": "كم عمق المسبح؟",
     "hl": "deep"
    }
   ],
   "say": "How + adjective How old is your grandfather? How far is the airport from here? How long does the flight take? How tall is a giraffe? How often do you go to the gym? How deep is the pool?"
  }
 },
 {
  "id": "jana-96",
  "order": 96,
  "levelId": "l4",
  "titleAr": "تمرين: الفعل + to",
  "titleEn": "Practice: Verb + to",
  "content": {
   "explanationAr": "تمرين: بعد want و need و hope و decide و plan و learn يجي to + الفعل الأصلي.",
   "altExplanationAr": "I hope to see you soon.",
   "example": [
    {
     "en": "I hope to see you soon.",
     "ar": "أتمنى أشوفك قريب."
    },
    {
     "en": "We decided to walk home.",
     "ar": "قررنا نمشي للبيت."
    },
    {
     "en": "He wants to become a programmer.",
     "ar": "يبغى يصير مبرمج."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I hope ___ see you soon.",
    "options": [
     "to",
     "for",
     "at"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We decided to ___ home.",
     "options": [
      "walking",
      "walk",
      "walked"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "He wants to become a programmer.",
     "options": [
      "لازم أدفع الفاتورة.",
      "يخططون يزورون أبها.",
      "يبغى يصير مبرمج."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I need to ___ the bill.",
     "options": [
      "pay",
      "paying",
      "paid"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Verb + to"
   },
   {
    "kind": "highlight",
    "text": "want to · need to"
   },
   {
    "kind": "example",
    "en": "I hope to see you soon.",
    "ar": "أتمنى أشوفك قريب."
   },
   {
    "kind": "example",
    "en": "We decided to walk home.",
    "ar": "قررنا نمشي للبيت."
   }
  ],
  "kids": {
   "listTitle": "want to · need to",
   "cards": [
    {
     "emoji": "🤞",
     "en": "I hope to see you soon.",
     "ar": "أتمنى أشوفك قريب.",
     "hl": "to"
    },
    {
     "emoji": "🧭",
     "en": "We decided to walk home.",
     "ar": "قررنا نمشي للبيت.",
     "hl": "walk"
    },
    {
     "emoji": "🧑‍💻",
     "en": "He wants to become a programmer.",
     "ar": "يبغى يصير مبرمج.",
     "hl": "become"
    },
    {
     "emoji": "🧾",
     "en": "I need to pay the bill.",
     "ar": "لازم أدفع الفاتورة.",
     "hl": "pay"
    },
    {
     "emoji": "✈️",
     "en": "They are planning to visit Abha.",
     "ar": "يخططون يزورون أبها.",
     "hl": "visit"
    },
    {
     "emoji": "🚴",
     "en": "My little brother learned to ride a bike.",
     "ar": "أخوي الصغير تعلم يسوق سيكل.",
     "hl": "ride"
    }
   ],
   "say": "want to · need to I hope to see you soon. We decided to walk home. He wants to become a programmer. I need to pay the bill. They are planning to visit Abha. My little brother learned to ride a bike."
  }
 },
 {
  "id": "jana-97",
  "order": 97,
  "levelId": "l4",
  "titleAr": "تمرين: الفعل + ing",
  "titleEn": "Practice: Verb + ing",
  "content": {
   "explanationAr": "تمرين: بعد enjoy و mind و stop و keep و avoid و practise يجي الفعل مع ing.",
   "altExplanationAr": "Do you mind opening the window?",
   "example": [
    {
     "en": "Do you mind opening the window?",
     "ar": "تمانع تفتح الشباك؟"
    },
    {
     "en": "My uncle stopped smoking.",
     "ar": "خالي ترك التدخين."
    },
    {
     "en": "Keep practising your English.",
     "ar": "استمر تتمرن على إنجليزيتك."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Do you mind ___ the window?",
    "options": [
     "open",
     "opening",
     "to open"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "My uncle stopped ___.",
     "options": [
      "smoke",
      "to smoke",
      "smoking"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Keep practising your English.",
     "options": [
      "استمر تتمرن على إنجليزيتك.",
      "أتجنب الأكل المقلي.",
      "تتمرن على الغناء كل يوم."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I avoid ___ fried food.",
     "options": [
      "eat",
      "eating",
      "to eat"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Verb + ing"
   },
   {
    "kind": "highlight",
    "text": "enjoy · mind · stop"
   },
   {
    "kind": "example",
    "en": "Do you mind opening the window?",
    "ar": "تمانع تفتح الشباك؟"
   },
   {
    "kind": "example",
    "en": "My uncle stopped smoking.",
    "ar": "خالي ترك التدخين."
   }
  ],
  "kids": {
   "listTitle": "enjoy · mind · stop",
   "cards": [
    {
     "emoji": "🪟",
     "en": "Do you mind opening the window?",
     "ar": "تمانع تفتح الشباك؟",
     "hl": "opening"
    },
    {
     "emoji": "🚭",
     "en": "My uncle stopped smoking.",
     "ar": "خالي ترك التدخين.",
     "hl": "smoking"
    },
    {
     "emoji": "🗣️",
     "en": "Keep practising your English.",
     "ar": "استمر تتمرن على إنجليزيتك.",
     "hl": "practising"
    },
    {
     "emoji": "🍟",
     "en": "I avoid eating fried food.",
     "ar": "أتجنب الأكل المقلي.",
     "hl": "eating"
    },
    {
     "emoji": "🎤",
     "en": "She practises singing every day.",
     "ar": "تتمرن على الغناء كل يوم.",
     "hl": "singing"
    },
    {
     "emoji": "🏃",
     "en": "The children kept running around.",
     "ar": "الأطفال ظلوا يركضون حوالين.",
     "hl": "running"
    }
   ],
   "say": "enjoy · mind · stop Do you mind opening the window? My uncle stopped smoking. Keep practising your English. I avoid eating fried food. She practises singing every day. The children kept running around."
  }
 },
 {
  "id": "jana-98",
  "order": 98,
  "levelId": "l4",
  "titleAr": "تمرين: الصفة أو الظرف",
  "titleEn": "Practice: Adjective or Adverb",
  "content": {
   "explanationAr": "تمرين: الصفة تصف الاسم (a careful driver)، والظرف يصف الفعل (drive carefully). أغلب الظروف تنتهي بـ ly، و good ← well.",
   "altExplanationAr": "She speaks English well.",
   "example": [
    {
     "en": "Please drive carefully.",
     "ar": "سوق بحذر لو سمحت."
    },
    {
     "en": "She speaks English well.",
     "ar": "تتكلم إنجليزي زين."
    },
    {
     "en": "The baby is sleeping. Talk quietly.",
     "ar": "البيبي نايم، تكلم بهدوء."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Please drive ___.",
    "options": [
     "careful",
     "care",
     "carefully"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She speaks English ___.",
     "options": [
      "well",
      "good",
      "best"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "The baby is sleeping. Talk quietly.",
     "options": [
      "هو طباخ حريص.",
      "البيبي نايم، تكلم بهدوء.",
      "الأرنب هرب بسرعة."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He is a ___ cook.",
     "options": [
      "carefully",
      "care",
      "careful"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Adjective or Adverb"
   },
   {
    "kind": "highlight",
    "text": "quick · quickly"
   },
   {
    "kind": "example",
    "en": "Please drive carefully.",
    "ar": "سوق بحذر لو سمحت."
   },
   {
    "kind": "example",
    "en": "She speaks English well.",
    "ar": "تتكلم إنجليزي زين."
   }
  ],
  "kids": {
   "listTitle": "quick · quickly",
   "cards": [
    {
     "emoji": "🚗",
     "en": "Please drive carefully.",
     "ar": "سوق بحذر لو سمحت.",
     "hl": "carefully"
    },
    {
     "emoji": "🗣️",
     "en": "She speaks English well.",
     "ar": "تتكلم إنجليزي زين.",
     "hl": "well"
    },
    {
     "emoji": "🤫",
     "en": "The baby is sleeping. Talk quietly.",
     "ar": "البيبي نايم، تكلم بهدوء.",
     "hl": "quietly"
    },
    {
     "emoji": "🧑‍🍳",
     "en": "He is a careful cook.",
     "ar": "هو طباخ حريص.",
     "hl": "careful"
    },
    {
     "emoji": "🐇",
     "en": "The rabbit ran away quickly.",
     "ar": "الأرنب هرب بسرعة.",
     "hl": "quickly"
    },
    {
     "emoji": "😃",
     "en": "They answered all the questions correctly.",
     "ar": "جاوبوا كل الأسئلة صح.",
     "hl": "correctly"
    }
   ],
   "say": "quick · quickly Please drive carefully. She speaks English well. The baby is sleeping. Talk quietly. He is a careful cook. The rabbit ran away quickly. They answered all the questions correctly."
  }
 },
 {
  "id": "jana-99",
  "order": 99,
  "levelId": "l4",
  "titleAr": "تمرين: bored أو boring",
  "titleEn": "Practice: -ed or -ing Adjectives",
  "content": {
   "explanationAr": "تمرين: ed لإحساس الشخص (I'm bored)، و ing لوصف الشي اللي يسبب الإحساس (the film is boring).",
   "altExplanationAr": "The trip was tiring, so we were tired.",
   "example": [
    {
     "en": "This programme is boring.",
     "ar": "هالبرنامج ممل."
    },
    {
     "en": "We were tired after the trip.",
     "ar": "كنا تعبانين بعد الرحلة."
    },
    {
     "en": "The football match was exciting.",
     "ar": "المباراة كانت مثيرة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "This programme is ___.",
    "options": [
     "boring",
     "bored",
     "bore"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We were ___ after the trip.",
     "options": [
      "tiring",
      "tired",
      "tire"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "The football match was exciting.",
     "options": [
      "تفاجأت بالخبر.",
      "هاللغز محير.",
      "المباراة كانت مثيرة."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I was ___ by the news.",
     "options": [
      "surprised",
      "surprising",
      "surprise"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: -ed or -ing Adjectives"
   },
   {
    "kind": "highlight",
    "text": "bored · boring"
   },
   {
    "kind": "example",
    "en": "This programme is boring.",
    "ar": "هالبرنامج ممل."
   },
   {
    "kind": "example",
    "en": "We were tired after the trip.",
    "ar": "كنا تعبانين بعد الرحلة."
   }
  ],
  "kids": {
   "listTitle": "bored · boring",
   "cards": [
    {
     "emoji": "🥱",
     "en": "This programme is boring.",
     "ar": "هالبرنامج ممل.",
     "hl": "boring"
    },
    {
     "emoji": "😩",
     "en": "We were tired after the trip.",
     "ar": "كنا تعبانين بعد الرحلة.",
     "hl": "tired"
    },
    {
     "emoji": "🤩",
     "en": "The football match was exciting.",
     "ar": "المباراة كانت مثيرة.",
     "hl": "exciting"
    },
    {
     "emoji": "😲",
     "en": "I was surprised by the news.",
     "ar": "تفاجأت بالخبر.",
     "hl": "surprised"
    },
    {
     "emoji": "🧩",
     "en": "This puzzle is confusing.",
     "ar": "هاللغز محير.",
     "hl": "confusing"
    },
    {
     "emoji": "🙂",
     "en": "Are you interested in history?",
     "ar": "أنت مهتم بالتاريخ؟",
     "hl": "interested"
    }
   ],
   "say": "bored · boring This programme is boring. We were tired after the trip. The football match was exciting. I was surprised by the news. This puzzle is confusing. Are you interested in history?"
  }
 },
 {
  "id": "jana-100",
  "order": 100,
  "levelId": "l4",
  "titleAr": "تمرين: الصفة وحرف الجر",
  "titleEn": "Practice: Adjective + Preposition",
  "content": {
   "explanationAr": "تمرين: بعض الصفات لها حرف جر ثابت: good at، afraid of، proud of، kind to، full of، different from.",
   "altExplanationAr": "My mum is proud of me.",
   "example": [
    {
     "en": "Layla is good at maths.",
     "ar": "ليلى شاطرة في الرياضيات."
    },
    {
     "en": "My brother is afraid of spiders.",
     "ar": "أخوي يخاف من العناكب."
    },
    {
     "en": "My mum is proud of me.",
     "ar": "أمي فخورة فيني."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Layla is good ___ maths.",
    "options": [
     "of",
     "at",
     "on"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "My brother is afraid ___ spiders.",
     "options": [
      "from",
      "at",
      "of"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "My mum is proud of me.",
     "options": [
      "أمي فخورة فيني.",
      "كن لطيف مع الحيوانات.",
      "المرطبان مليان عسل."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Be kind ___ animals.",
     "options": [
      "of",
      "to",
      "at"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Adjective + Preposition"
   },
   {
    "kind": "highlight",
    "text": "good at · afraid of"
   },
   {
    "kind": "example",
    "en": "Layla is good at maths.",
    "ar": "ليلى شاطرة في الرياضيات."
   },
   {
    "kind": "example",
    "en": "My brother is afraid of spiders.",
    "ar": "أخوي يخاف من العناكب."
   }
  ],
  "kids": {
   "listTitle": "good at · afraid of",
   "cards": [
    {
     "emoji": "🧮",
     "en": "Layla is good at maths.",
     "ar": "ليلى شاطرة في الرياضيات.",
     "hl": "at"
    },
    {
     "emoji": "🕷️",
     "en": "My brother is afraid of spiders.",
     "ar": "أخوي يخاف من العناكب.",
     "hl": "of"
    },
    {
     "emoji": "🏅",
     "en": "My mum is proud of me.",
     "ar": "أمي فخورة فيني.",
     "hl": "of"
    },
    {
     "emoji": "🤲",
     "en": "Be kind to animals.",
     "ar": "كن لطيف مع الحيوانات.",
     "hl": "to"
    },
    {
     "emoji": "🫙",
     "en": "The jar is full of honey.",
     "ar": "المرطبان مليان عسل.",
     "hl": "of"
    },
    {
     "emoji": "🍊",
     "en": "Oranges are different from lemons.",
     "ar": "البرتقال يختلف عن الليمون.",
     "hl": "from"
    }
   ],
   "say": "good at · afraid of Layla is good at maths. My brother is afraid of spiders. My mum is proud of me. Be kind to animals. The jar is full of honey. Oranges are different from lemons."
  }
 },
 {
  "id": "jana-101",
  "order": 101,
  "levelId": "l4",
  "titleAr": "تمرين: الأفعال المركبة",
  "titleEn": "Practice: Phrasal Verbs",
  "content": {
   "explanationAr": "تمرين أفعال مركبة شائعة: turn off، look for، wake up، put on، take off، give up.",
   "altExplanationAr": "Turn off the light, please.",
   "example": [
    {
     "en": "Turn off the light, please.",
     "ar": "طفّ النور لو سمحت."
    },
    {
     "en": "I'm looking for my keys.",
     "ar": "أدور مفاتيحي."
    },
    {
     "en": "What time do you wake up?",
     "ar": "متى تصحى؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Turn ___ the light, please.",
    "options": [
     "of",
     "in",
     "off"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I'm looking ___ my keys.",
     "options": [
      "for",
      "of",
      "to"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "What time do you wake up?",
     "options": [
      "البس الشال، الجو بارد.",
      "متى تصحى؟",
      "اخلع جزمتك لو سمحت."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Put ___ your scarf. It's cold.",
     "options": [
      "in",
      "up",
      "on"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Phrasal Verbs"
   },
   {
    "kind": "highlight",
    "text": "turn on · look for"
   },
   {
    "kind": "example",
    "en": "Turn off the light, please.",
    "ar": "طفّ النور لو سمحت."
   },
   {
    "kind": "example",
    "en": "I'm looking for my keys.",
    "ar": "أدور مفاتيحي."
   }
  ],
  "kids": {
   "listTitle": "turn on · look for",
   "cards": [
    {
     "emoji": "💡",
     "en": "Turn off the light, please.",
     "ar": "طفّ النور لو سمحت.",
     "hl": "off"
    },
    {
     "emoji": "🔎",
     "en": "I'm looking for my keys.",
     "ar": "أدور مفاتيحي.",
     "hl": "for"
    },
    {
     "emoji": "🌅",
     "en": "What time do you wake up?",
     "ar": "متى تصحى؟",
     "hl": "up"
    },
    {
     "emoji": "🧣",
     "en": "Put on your scarf. It's cold.",
     "ar": "البس الشال، الجو بارد.",
     "hl": "on"
    },
    {
     "emoji": "👟",
     "en": "Please take off your shoes.",
     "ar": "اخلع جزمتك لو سمحت.",
     "hl": "off"
    },
    {
     "emoji": "💪",
     "en": "Don't give up!",
     "ar": "لا تستسلم!",
     "hl": "up"
    }
   ],
   "say": "turn on · look for Turn off the light, please. I'm looking for my keys. What time do you wake up? Put on your scarf. It's cold. Please take off your shoes. Don't give up!"
  }
 },
 {
  "id": "jana-102",
  "order": 102,
  "levelId": "l4",
  "titleAr": "تمرين: who و which",
  "titleEn": "Practice: who and which",
  "content": {
   "explanationAr": "تمرين: who للناس، و which للأشياء والحيوانات: the man who..., the car which...",
   "altExplanationAr": "The girl who won the prize is my cousin.",
   "example": [
    {
     "en": "The girl who won the prize is my cousin.",
     "ar": "البنت اللي فازت بالجائزة بنت عمي."
    },
    {
     "en": "This is the phone which I bought.",
     "ar": "هذا الجوال اللي اشتريته."
    },
    {
     "en": "A nurse is a person who helps sick people.",
     "ar": "الممرضة شخص يساعد المرضى."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "The girl ___ won the prize is my cousin.",
    "options": [
     "who",
     "which",
     "where"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "This is the phone ___ I bought.",
     "options": [
      "who",
      "which",
      "where"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "A nurse is a person who helps sick people.",
     "options": [
      "الجمل حيوان يقدر يعيش بدون ماي أيام.",
      "عجبتني البيتزا اللي سويتها.",
      "الممرضة شخص يساعد المرضى."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "A camel is an animal ___ can live without water for days.",
     "options": [
      "which",
      "who",
      "where"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: who and which"
   },
   {
    "kind": "highlight",
    "text": "who · which"
   },
   {
    "kind": "example",
    "en": "The girl who won the prize is my cousin.",
    "ar": "البنت اللي فازت بالجائزة بنت عمي."
   },
   {
    "kind": "example",
    "en": "This is the phone which I bought.",
    "ar": "هذا الجوال اللي اشتريته."
   }
  ],
  "kids": {
   "listTitle": "who · which",
   "cards": [
    {
     "emoji": "🏆",
     "en": "The girl who won the prize is my cousin.",
     "ar": "البنت اللي فازت بالجائزة بنت عمي.",
     "hl": "who"
    },
    {
     "emoji": "📱",
     "en": "This is the phone which I bought.",
     "ar": "هذا الجوال اللي اشتريته.",
     "hl": "which"
    },
    {
     "emoji": "🧑‍⚕️",
     "en": "A nurse is a person who helps sick people.",
     "ar": "الممرضة شخص يساعد المرضى.",
     "hl": "who"
    },
    {
     "emoji": "🐫",
     "en": "A camel is an animal which can live without water for days.",
     "ar": "الجمل حيوان يقدر يعيش بدون ماي أيام.",
     "hl": "which"
    },
    {
     "emoji": "🍕",
     "en": "I liked the pizza which you made.",
     "ar": "عجبتني البيتزا اللي سويتها.",
     "hl": "which"
    },
    {
     "emoji": "👮",
     "en": "The man who helped us was a police officer.",
     "ar": "الرجال اللي ساعدنا كان شرطي.",
     "hl": "who"
    }
   ],
   "say": "who · which The girl who won the prize is my cousin. This is the phone which I bought. A nurse is a person who helps sick people. A camel is an animal which can live without water for days. I liked the pizza which you made. The man who helped us was a police officer."
  }
 },
 {
  "id": "jana-103",
  "order": 103,
  "levelId": "l4",
  "titleAr": "تمرين: something و anything و nothing",
  "titleEn": "Practice: some-, any-, no-",
  "content": {
   "explanationAr": "تمرين: something و somebody في الإيجاب، و anything و anybody في السؤال والنفي، و nothing و nobody بمعنى ولا شي أو ولا أحد.",
   "altExplanationAr": "Is anybody there? Nobody answered.",
   "example": [
    {
     "en": "I want something to eat.",
     "ar": "أبغى شي آكله."
    },
    {
     "en": "There isn't anybody at home.",
     "ar": "ما فيه أحد في البيت."
    },
    {
     "en": "I didn't say anything.",
     "ar": "ما قلت شي."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I want ___ to eat.",
    "options": [
     "anything",
     "something",
     "anybody"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "There isn't ___ at home.",
     "options": [
      "somebody",
      "nobody",
      "anybody"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I didn't say anything.",
     "options": [
      "ما قلت شي.",
      "ما فيه شي في الصندوق.",
      "أحد يدق الباب."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "There is ___ in the box.",
     "options": [
      "anything",
      "nothing",
      "nowhere"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: some-, any-, no-"
   },
   {
    "kind": "highlight",
    "text": "something · anything"
   },
   {
    "kind": "example",
    "en": "I want something to eat.",
    "ar": "أبغى شي آكله."
   },
   {
    "kind": "example",
    "en": "There isn't anybody at home.",
    "ar": "ما فيه أحد في البيت."
   }
  ],
  "kids": {
   "listTitle": "something · anything",
   "cards": [
    {
     "emoji": "🍪",
     "en": "I want something to eat.",
     "ar": "أبغى شي آكله.",
     "hl": "something"
    },
    {
     "emoji": "🚪",
     "en": "There isn't anybody at home.",
     "ar": "ما فيه أحد في البيت.",
     "hl": "anybody"
    },
    {
     "emoji": "🤐",
     "en": "I didn't say anything.",
     "ar": "ما قلت شي.",
     "hl": "anything"
    },
    {
     "emoji": "📭",
     "en": "There is nothing in the box.",
     "ar": "ما فيه شي في الصندوق.",
     "hl": "nothing"
    },
    {
     "emoji": "🙋",
     "en": "Somebody is knocking at the door.",
     "ar": "أحد يدق الباب.",
     "hl": "Somebody"
    },
    {
     "emoji": "🕵️",
     "en": "Nobody saw the thief.",
     "ar": "ولا أحد شاف الحرامي.",
     "hl": "Nobody"
    }
   ],
   "say": "something · anything I want something to eat. There isn't anybody at home. I didn't say anything. There is nothing in the box. Somebody is knocking at the door. Nobody saw the thief."
  }
 },
 {
  "id": "jana-104",
  "order": 104,
  "levelId": "l4",
  "titleAr": "تمرين: myself و yourself",
  "titleEn": "Practice: Reflexive Pronouns",
  "content": {
   "explanationAr": "تمرين: myself, yourself, himself, herself, itself, ourselves, themselves: بنفسي، بنفسك...",
   "altExplanationAr": "I made it myself!",
   "example": [
    {
     "en": "I made this cake myself.",
     "ar": "سويت هالكيكة بنفسي."
    },
    {
     "en": "She looked at herself in the mirror.",
     "ar": "طالعت نفسها في المراية."
    },
    {
     "en": "Be careful! Don't hurt yourself.",
     "ar": "انتبه! لا تعور نفسك."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I made this cake ___.",
    "options": [
     "me",
     "my",
     "myself"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She looked at ___ in the mirror.",
     "options": [
      "herself",
      "her",
      "himself"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Be careful! Don't hurt yourself.",
     "options": [
      "لبس نفسه بنفسه.",
      "انتبه! لا تعور نفسك.",
      "استانسنا في الحفلة."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He dressed ___.",
     "options": [
      "him",
      "his",
      "himself"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Reflexive Pronouns"
   },
   {
    "kind": "highlight",
    "text": "myself · herself"
   },
   {
    "kind": "example",
    "en": "I made this cake myself.",
    "ar": "سويت هالكيكة بنفسي."
   },
   {
    "kind": "example",
    "en": "She looked at herself in the mirror.",
    "ar": "طالعت نفسها في المراية."
   }
  ],
  "kids": {
   "listTitle": "myself · herself",
   "cards": [
    {
     "emoji": "🎂",
     "en": "I made this cake myself.",
     "ar": "سويت هالكيكة بنفسي.",
     "hl": "myself"
    },
    {
     "emoji": "🪞",
     "en": "She looked at herself in the mirror.",
     "ar": "طالعت نفسها في المراية.",
     "hl": "herself"
    },
    {
     "emoji": "🤕",
     "en": "Be careful! Don't hurt yourself.",
     "ar": "انتبه! لا تعور نفسك.",
     "hl": "yourself"
    },
    {
     "emoji": "🧒",
     "en": "He dressed himself.",
     "ar": "لبس نفسه بنفسه.",
     "hl": "himself"
    },
    {
     "emoji": "🎉",
     "en": "We enjoyed ourselves at the party.",
     "ar": "استانسنا في الحفلة.",
     "hl": "ourselves"
    },
    {
     "emoji": "🧑‍🤝‍🧑",
     "en": "They cooked dinner themselves.",
     "ar": "طبخوا العشا بنفسهم.",
     "hl": "themselves"
    }
   ],
   "say": "myself · herself I made this cake myself. She looked at herself in the mirror. Be careful! Don't hurt yourself. He dressed himself. We enjoyed ourselves at the party. They cooked dinner themselves."
  }
 },
 {
  "id": "jana-105",
  "order": 105,
  "levelId": "l4",
  "titleAr": "تمرين: الأسئلة الذيلية",
  "titleEn": "Practice: Question Tags",
  "content": {
   "explanationAr": "تمرين: نضيف سؤال قصير آخر الجملة عشان نتأكد: It's hot, isn't it? You like tea, don't you?",
   "altExplanationAr": "She can swim, can't she?",
   "example": [
    {
     "en": "It's hot today, isn't it?",
     "ar": "الجو حر اليوم، صح؟"
    },
    {
     "en": "You like green tea, don't you?",
     "ar": "تحب الشاي الأخضر، صح؟"
    },
    {
     "en": "She can swim, can't she?",
     "ar": "تعرف تسبح، صح؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "It's hot today, ___ it?",
    "options": [
     "isn't",
     "doesn't",
     "aren't"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "You like green tea, ___ you?",
     "options": [
      "aren't",
      "don't",
      "doesn't"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "She can swim, can't she?",
     "options": [
      "هم طلاب، صح؟",
      "ساكن قريب من هنا، صح؟",
      "تعرف تسبح، صح؟"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "They are students, ___ they?",
     "options": [
      "aren't",
      "don't",
      "isn't"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Question Tags"
   },
   {
    "kind": "highlight",
    "text": "isn't it? · don't you?"
   },
   {
    "kind": "example",
    "en": "It's hot today, isn't it?",
    "ar": "الجو حر اليوم، صح؟"
   },
   {
    "kind": "example",
    "en": "You like green tea, don't you?",
    "ar": "تحب الشاي الأخضر، صح؟"
   }
  ],
  "kids": {
   "listTitle": "isn't it? · don't you?",
   "cards": [
    {
     "emoji": "☀️",
     "en": "It's hot today, isn't it?",
     "ar": "الجو حر اليوم، صح؟",
     "hl": "isn't"
    },
    {
     "emoji": "🍵",
     "en": "You like green tea, don't you?",
     "ar": "تحب الشاي الأخضر، صح؟",
     "hl": "don't"
    },
    {
     "emoji": "🏊",
     "en": "She can swim, can't she?",
     "ar": "تعرف تسبح، صح؟",
     "hl": "can't"
    },
    {
     "emoji": "🧑‍🎓",
     "en": "They are students, aren't they?",
     "ar": "هم طلاب، صح؟",
     "hl": "aren't"
    },
    {
     "emoji": "🏠",
     "en": "He lives near here, doesn't he?",
     "ar": "ساكن قريب من هنا، صح؟",
     "hl": "doesn't"
    },
    {
     "emoji": "🌙",
     "en": "You were at home last night, weren't you?",
     "ar": "كنت في البيت أمس الليل، صح؟",
     "hl": "weren't"
    }
   ],
   "say": "isn't it? · don't you? It's hot today, isn't it? You like green tea, don't you? She can swim, can't she? They are students, aren't they? He lives near here, doesn't he? You were at home last night, weren't you?"
  }
 },
 {
  "id": "jana-106",
  "order": 106,
  "levelId": "l4",
  "titleAr": "تمرين: إذا… (الشرط الأول)",
  "titleEn": "Practice: First Conditional",
  "content": {
   "explanationAr": "تمرين: If + مضارع، والنتيجة will + الفعل: If it rains, we will stay home.",
   "altExplanationAr": "If you study, you will pass.",
   "example": [
    {
     "en": "If it rains, we will stay at home.",
     "ar": "إذا مطرت بنجلس في البيت."
    },
    {
     "en": "If you study, you will pass.",
     "ar": "إذا ذاكرت بتنجح."
    },
    {
     "en": "If we hurry, we'll catch the bus.",
     "ar": "إذا استعجلنا بنلحق الباص."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "If it ___, we will stay at home.",
    "options": [
     "will rain",
     "rains",
     "rained"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "If you study, you ___ pass.",
     "options": [
      "are",
      "did",
      "will"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "If we hurry, we'll catch the bus.",
     "options": [
      "إذا استعجلنا بنلحق الباص.",
      "إذا أكّلت الكلب بيلحقك.",
      "بتنبسط إذا اتصلت عليها."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "If you feed the dog, it will ___ you.",
     "options": [
      "follows",
      "follow",
      "followed"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: First Conditional"
   },
   {
    "kind": "highlight",
    "text": "If ... will"
   },
   {
    "kind": "example",
    "en": "If it rains, we will stay at home.",
    "ar": "إذا مطرت بنجلس في البيت."
   },
   {
    "kind": "example",
    "en": "If you study, you will pass.",
    "ar": "إذا ذاكرت بتنجح."
   }
  ],
  "kids": {
   "listTitle": "If ... will",
   "cards": [
    {
     "emoji": "🌧️",
     "en": "If it rains, we will stay at home.",
     "ar": "إذا مطرت بنجلس في البيت.",
     "hl": "rains"
    },
    {
     "emoji": "📚",
     "en": "If you study, you will pass.",
     "ar": "إذا ذاكرت بتنجح.",
     "hl": "will"
    },
    {
     "emoji": "🚌",
     "en": "If we hurry, we'll catch the bus.",
     "ar": "إذا استعجلنا بنلحق الباص.",
     "hl": "hurry"
    },
    {
     "emoji": "🐶",
     "en": "If you feed the dog, it will follow you.",
     "ar": "إذا أكّلت الكلب بيلحقك.",
     "hl": "follow"
    },
    {
     "emoji": "🍰",
     "en": "She'll be happy if you call her.",
     "ar": "بتنبسط إذا اتصلت عليها.",
     "hl": "call"
    },
    {
     "emoji": "🥶",
     "en": "If you don't wear a coat, you'll feel cold.",
     "ar": "إذا ما لبست جاكيت بتبرد.",
     "hl": "don't"
    }
   ],
   "say": "If ... will If it rains, we will stay at home. If you study, you will pass. If we hurry, we'll catch the bus. If you feed the dog, it will follow you. She'll be happy if you call her. If you don't wear a coat, you'll feel cold."
  }
 },
 {
  "id": "jana-107",
  "order": 107,
  "levelId": "l4",
  "titleAr": "تمرين: حقائق دائمة (الشرط الصفري)",
  "titleEn": "Practice: Zero Conditional",
  "content": {
   "explanationAr": "تمرين: للحقائق اللي دايم تصير: If + مضارع، والنتيجة مضارع: If you heat ice, it melts.",
   "altExplanationAr": "If you mix red and yellow, you get orange.",
   "example": [
    {
     "en": "If you heat ice, it melts.",
     "ar": "إذا سخنت الثلج يذوب."
    },
    {
     "en": "If you mix red and yellow, you get orange.",
     "ar": "إذا خلطت الأحمر والأصفر يطلع برتقالي."
    },
    {
     "en": "Plants die if they don't get water.",
     "ar": "النباتات تموت إذا ما جاها ماي."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "If you heat ice, it ___.",
    "options": [
     "melted",
     "melting",
     "melts"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "If you mix red and yellow, you ___ orange.",
     "options": [
      "get",
      "got",
      "getting"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Plants die if they don't get water.",
     "options": [
      "إذا لمست النار تحرقك.",
      "النباتات تموت إذا ما جاها ماي.",
      "إذا طاحت البيضة تنكسر."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "If you touch fire, it ___ you.",
     "options": [
      "burned",
      "burning",
      "burns"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Zero Conditional"
   },
   {
    "kind": "highlight",
    "text": "If ... (always)"
   },
   {
    "kind": "example",
    "en": "If you heat ice, it melts.",
    "ar": "إذا سخنت الثلج يذوب."
   },
   {
    "kind": "example",
    "en": "If you mix red and yellow, you get orange.",
    "ar": "إذا خلطت الأحمر والأصفر يطلع برتقالي."
   }
  ],
  "kids": {
   "listTitle": "If ... (always)",
   "cards": [
    {
     "emoji": "🧊",
     "en": "If you heat ice, it melts.",
     "ar": "إذا سخنت الثلج يذوب.",
     "hl": "melts"
    },
    {
     "emoji": "🎨",
     "en": "If you mix red and yellow, you get orange.",
     "ar": "إذا خلطت الأحمر والأصفر يطلع برتقالي.",
     "hl": "get"
    },
    {
     "emoji": "🌱",
     "en": "Plants die if they don't get water.",
     "ar": "النباتات تموت إذا ما جاها ماي.",
     "hl": "die"
    },
    {
     "emoji": "🔥",
     "en": "If you touch fire, it burns you.",
     "ar": "إذا لمست النار تحرقك.",
     "hl": "burns"
    },
    {
     "emoji": "🥚",
     "en": "If you drop an egg, it breaks.",
     "ar": "إذا طاحت البيضة تنكسر.",
     "hl": "breaks"
    },
    {
     "emoji": "🌡️",
     "en": "Water boils if you heat it to 100 degrees.",
     "ar": "الماي يغلي إذا سخنته لـ ١٠٠ درجة.",
     "hl": "boils"
    }
   ],
   "say": "If ... (always) If you heat ice, it melts. If you mix red and yellow, you get orange. Plants die if they don't get water. If you touch fire, it burns you. If you drop an egg, it breaks. Water boils if you heat it to 100 degrees."
  }
 },
 {
  "id": "jana-108",
  "order": 108,
  "levelId": "l4",
  "titleAr": "تمرين: المبني للمجهول",
  "titleEn": "Practice: The Passive",
  "content": {
   "explanationAr": "تمرين: is أو are + الفعل بصيغة المفعول لما يكون المهم الشي مو الفاعل: Dates are grown in Al-Ahsa.",
   "altExplanationAr": "This car was made in Japan.",
   "example": [
    {
     "en": "Dates are grown in Al-Ahsa.",
     "ar": "التمر يُزرع في الأحساء."
    },
    {
     "en": "This car was made in Japan.",
     "ar": "هالسيارة مصنوعة في اليابان."
    },
    {
     "en": "Cheese is made from milk.",
     "ar": "الجبن يُصنع من الحليب."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Dates are ___ in Al-Ahsa.",
    "options": [
     "grown",
     "grow",
     "grew"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "This car was ___ in Japan.",
     "options": [
      "make",
      "made",
      "makes"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Cheese is made from milk.",
     "options": [
      "العربي يُتكلم في دول كثيرة.",
      "الرسايل تتوصل كل صباح.",
      "الجبن يُصنع من الحليب."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Arabic is ___ in many countries.",
     "options": [
      "spoken",
      "speak",
      "spoke"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: The Passive"
   },
   {
    "kind": "highlight",
    "text": "is made in"
   },
   {
    "kind": "example",
    "en": "Dates are grown in Al-Ahsa.",
    "ar": "التمر يُزرع في الأحساء."
   },
   {
    "kind": "example",
    "en": "This car was made in Japan.",
    "ar": "هالسيارة مصنوعة في اليابان."
   }
  ],
  "kids": {
   "listTitle": "is made in",
   "cards": [
    {
     "emoji": "🌴",
     "en": "Dates are grown in Al-Ahsa.",
     "ar": "التمر يُزرع في الأحساء.",
     "hl": "grown"
    },
    {
     "emoji": "🚗",
     "en": "This car was made in Japan.",
     "ar": "هالسيارة مصنوعة في اليابان.",
     "hl": "made"
    },
    {
     "emoji": "🧀",
     "en": "Cheese is made from milk.",
     "ar": "الجبن يُصنع من الحليب.",
     "hl": "made"
    },
    {
     "emoji": "🗣️",
     "en": "Arabic is spoken in many countries.",
     "ar": "العربي يُتكلم في دول كثيرة.",
     "hl": "spoken"
    },
    {
     "emoji": "📮",
     "en": "The letters are delivered every morning.",
     "ar": "الرسايل تتوصل كل صباح.",
     "hl": "delivered"
    },
    {
     "emoji": "🕌",
     "en": "The mosque was built in 1950.",
     "ar": "المسجد انبنى عام ١٩٥٠.",
     "hl": "built"
    }
   ],
   "say": "is made in Dates are grown in Al-Ahsa. This car was made in Japan. Cheese is made from milk. Arabic is spoken in many countries. The letters are delivered every morning. The mosque was built in 1950."
  }
 },
 {
  "id": "jana-109",
  "order": 109,
  "levelId": "l4",
  "titleAr": "تمرين: say و tell",
  "titleEn": "Practice: say or tell",
  "content": {
   "explanationAr": "تمرين: tell + شخص (tell me, tell her)، و say بدون شخص (say hello, say something).",
   "altExplanationAr": "Tell me a story. She said goodbye.",
   "example": [
    {
     "en": "Tell me a story, please.",
     "ar": "احكي لي قصة لو سمحت."
    },
    {
     "en": "She said goodbye and left.",
     "ar": "قالت مع السلامة ومشت."
    },
    {
     "en": "Always tell the truth.",
     "ar": "دايم قول الصدق."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ me a story, please.",
    "options": [
     "Say",
     "Tell",
     "Speak"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She ___ goodbye and left.",
     "options": [
      "told",
      "talked",
      "said"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Always tell the truth.",
     "options": [
      "دايم قول الصدق.",
      "وش قال؟",
      "المعلمة قالت لنا نجلس."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "What did he ___?",
     "options": [
      "tell",
      "say",
      "talk"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: say or tell"
   },
   {
    "kind": "highlight",
    "text": "say · tell"
   },
   {
    "kind": "example",
    "en": "Tell me a story, please.",
    "ar": "احكي لي قصة لو سمحت."
   },
   {
    "kind": "example",
    "en": "She said goodbye and left.",
    "ar": "قالت مع السلامة ومشت."
   }
  ],
  "kids": {
   "listTitle": "say · tell",
   "cards": [
    {
     "emoji": "📖",
     "en": "Tell me a story, please.",
     "ar": "احكي لي قصة لو سمحت.",
     "hl": "Tell"
    },
    {
     "emoji": "👋",
     "en": "She said goodbye and left.",
     "ar": "قالت مع السلامة ومشت.",
     "hl": "said"
    },
    {
     "emoji": "🤥",
     "en": "Always tell the truth.",
     "ar": "دايم قول الصدق.",
     "hl": "tell"
    },
    {
     "emoji": "🗨️",
     "en": "What did he say?",
     "ar": "وش قال؟",
     "hl": "say"
    },
    {
     "emoji": "🧑‍🏫",
     "en": "The teacher told us to sit down.",
     "ar": "المعلمة قالت لنا نجلس.",
     "hl": "told"
    },
    {
     "emoji": "😊",
     "en": "Say thank you to your aunt.",
     "ar": "قل شكرًا لخالتك.",
     "hl": "Say"
    }
   ],
   "say": "say · tell Tell me a story, please. She said goodbye and left. Always tell the truth. What did he say? The teacher told us to sit down. Say thank you to your aunt."
  }
 },
 {
  "id": "jana-110",
  "order": 110,
  "levelId": "l4",
  "titleAr": "تمرين: make أو do",
  "titleEn": "Practice: make or do",
  "content": {
   "explanationAr": "تمرين: make للصنع والإنتاج (make tea, make a mistake, make noise)، و do للمهام والأعمال (do homework, do the dishes, do exercise).",
   "altExplanationAr": "Don't make noise. Did you do your homework?",
   "example": [
    {
     "en": "Can you make some tea?",
     "ar": "تقدر تسوي شاي؟"
    },
    {
     "en": "I do my homework after lunch.",
     "ar": "أحل واجبي بعد الغدا."
    },
    {
     "en": "Please don't make noise.",
     "ar": "لو سمحت لا تسوي إزعاج."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Can you ___ some tea?",
    "options": [
     "do",
     "take",
     "make"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I ___ my homework after lunch.",
     "options": [
      "do",
      "make",
      "take"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Please don't make noise.",
     "options": [
      "دور مين يغسل الصحون؟",
      "لو سمحت لا تسوي إزعاج.",
      "كلنا نغلط."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Whose turn is it to ___ the dishes?",
     "options": [
      "make",
      "take",
      "do"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: make or do"
   },
   {
    "kind": "highlight",
    "text": "make · do"
   },
   {
    "kind": "example",
    "en": "Can you make some tea?",
    "ar": "تقدر تسوي شاي؟"
   },
   {
    "kind": "example",
    "en": "I do my homework after lunch.",
    "ar": "أحل واجبي بعد الغدا."
   }
  ],
  "kids": {
   "listTitle": "make · do",
   "cards": [
    {
     "emoji": "🍵",
     "en": "Can you make some tea?",
     "ar": "تقدر تسوي شاي؟",
     "hl": "make"
    },
    {
     "emoji": "📝",
     "en": "I do my homework after lunch.",
     "ar": "أحل واجبي بعد الغدا.",
     "hl": "do"
    },
    {
     "emoji": "🔊",
     "en": "Please don't make noise.",
     "ar": "لو سمحت لا تسوي إزعاج.",
     "hl": "make"
    },
    {
     "emoji": "🍽️",
     "en": "Whose turn is it to do the dishes?",
     "ar": "دور مين يغسل الصحون؟",
     "hl": "do"
    },
    {
     "emoji": "❌",
     "en": "Everyone makes mistakes.",
     "ar": "كلنا نغلط.",
     "hl": "makes"
    },
    {
     "emoji": "🤸",
     "en": "We do exercise every morning.",
     "ar": "نتمرن كل صباح.",
     "hl": "do"
    }
   ],
   "say": "make · do Can you make some tea? I do my homework after lunch. Please don't make noise. Whose turn is it to do the dishes? Everyone makes mistakes. We do exercise every morning."
  }
 },
 {
  "id": "jana-111",
  "order": 111,
  "levelId": "l4",
  "titleAr": "تمرين: have و take",
  "titleEn": "Practice: have or take",
  "content": {
   "explanationAr": "تمرين تعابير ثابتة: have breakfast، have a shower، have fun، take a photo، take a taxi، take medicine.",
   "altExplanationAr": "Let's take a photo! Have fun!",
   "example": [
    {
     "en": "Let's take a photo here.",
     "ar": "خلنا ناخذ صورة هنا."
    },
    {
     "en": "I have a shower every morning.",
     "ar": "أتروش كل صباح."
    },
    {
     "en": "Have fun at the party!",
     "ar": "استانس في الحفلة!"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Let's ___ a photo here.",
    "options": [
     "take",
     "make",
     "do"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I ___ a shower every morning.",
     "options": [
      "take",
      "have",
      "do"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Have fun at the party!",
     "options": [
      "أخذنا تاكسي للمطار.",
      "خذ هالدوا مرتين في اليوم.",
      "استانس في الحفلة!"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We ___ a taxi to the airport.",
     "options": [
      "took",
      "made",
      "did"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: have or take"
   },
   {
    "kind": "highlight",
    "text": "have · take"
   },
   {
    "kind": "example",
    "en": "Let's take a photo here.",
    "ar": "خلنا ناخذ صورة هنا."
   },
   {
    "kind": "example",
    "en": "I have a shower every morning.",
    "ar": "أتروش كل صباح."
   }
  ],
  "kids": {
   "listTitle": "have · take",
   "cards": [
    {
     "emoji": "📸",
     "en": "Let's take a photo here.",
     "ar": "خلنا ناخذ صورة هنا.",
     "hl": "take"
    },
    {
     "emoji": "🚿",
     "en": "I have a shower every morning.",
     "ar": "أتروش كل صباح.",
     "hl": "have"
    },
    {
     "emoji": "🎈",
     "en": "Have fun at the party!",
     "ar": "استانس في الحفلة!",
     "hl": "Have"
    },
    {
     "emoji": "🚕",
     "en": "We took a taxi to the airport.",
     "ar": "أخذنا تاكسي للمطار.",
     "hl": "took"
    },
    {
     "emoji": "💊",
     "en": "Take this medicine twice a day.",
     "ar": "خذ هالدوا مرتين في اليوم.",
     "hl": "Take"
    },
    {
     "emoji": "🥞",
     "en": "What time do you have breakfast?",
     "ar": "متى تفطر؟",
     "hl": "have"
    }
   ],
   "say": "have · take Let's take a photo here. I have a shower every morning. Have fun at the party! We took a taxi to the airport. Take this medicine twice a day. What time do you have breakfast?"
  }
 },
 {
  "id": "jana-112",
  "order": 112,
  "levelId": "l4",
  "titleAr": "تمرين: borrow و lend، bring و take",
  "titleEn": "Practice: borrow/lend, bring/take",
  "content": {
   "explanationAr": "تمرين: borrow: تاخذ سلف، lend: تعطي سلف. bring: تجيب لمكانك، take: تودّي لمكان ثاني.",
   "altExplanationAr": "Can I borrow your pen? Can you lend me your pen?",
   "example": [
    {
     "en": "Can I borrow your pen?",
     "ar": "أقدر أستلف قلمك؟"
    },
    {
     "en": "Can you lend me your book?",
     "ar": "تقدر تسلفني كتابك؟"
    },
    {
     "en": "Bring some juice when you come.",
     "ar": "جيب معك عصير لما تجي."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Can I ___ your pen?",
    "options": [
     "lend",
     "borrow",
     "give"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Can you ___ me your book?",
     "options": [
      "borrow",
      "take",
      "lend"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Bring some juice when you come.",
     "options": [
      "جيب معك عصير لما تجي.",
      "ودّ الزبالة برا لو سمحت.",
      "استلف فلوس من أخوه."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ the rubbish out, please.",
     "options": [
      "Borrow",
      "Take",
      "Lend"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: borrow/lend, bring/take"
   },
   {
    "kind": "highlight",
    "text": "borrow · lend"
   },
   {
    "kind": "example",
    "en": "Can I borrow your pen?",
    "ar": "أقدر أستلف قلمك؟"
   },
   {
    "kind": "example",
    "en": "Can you lend me your book?",
    "ar": "تقدر تسلفني كتابك؟"
   }
  ],
  "kids": {
   "listTitle": "borrow · lend",
   "cards": [
    {
     "emoji": "🖊️",
     "en": "Can I borrow your pen?",
     "ar": "أقدر أستلف قلمك؟",
     "hl": "borrow"
    },
    {
     "emoji": "📘",
     "en": "Can you lend me your book?",
     "ar": "تقدر تسلفني كتابك؟",
     "hl": "lend"
    },
    {
     "emoji": "🧃",
     "en": "Bring some juice when you come.",
     "ar": "جيب معك عصير لما تجي.",
     "hl": "Bring"
    },
    {
     "emoji": "🗑️",
     "en": "Take the rubbish out, please.",
     "ar": "ودّ الزبالة برا لو سمحت.",
     "hl": "Take"
    },
    {
     "emoji": "💰",
     "en": "He borrowed money from his brother.",
     "ar": "استلف فلوس من أخوه.",
     "hl": "borrowed"
    },
    {
     "emoji": "🧸",
     "en": "I lent my bike to my cousin.",
     "ar": "سلّفت سيكلي لولد عمي.",
     "hl": "lent"
    }
   ],
   "say": "borrow · lend Can I borrow your pen? Can you lend me your book? Bring some juice when you come. Take the rubbish out, please. He borrowed money from his brother. I lent my bike to my cousin."
  }
 },
 {
  "id": "jana-113",
  "order": 113,
  "levelId": "l4",
  "titleAr": "تمرين: look و see و watch، hear و listen",
  "titleEn": "Practice: look, see, watch, hear, listen",
  "content": {
   "explanationAr": "تمرين: look at: تطالع بقصد، see: تشوف، watch: تتابع شي يتحرك. hear: تسمع، listen to: تنصت بقصد.",
   "altExplanationAr": "Listen to me! Can you hear the bell?",
   "example": [
    {
     "en": "Listen to me, please!",
     "ar": "اسمعني لو سمحت!"
    },
    {
     "en": "Can you hear the bell?",
     "ar": "تسمع الجرس؟"
    },
    {
     "en": "Look at this beautiful picture.",
     "ar": "طالع هالصورة الحلوة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ to me, please!",
    "options": [
     "Hear",
     "Look",
     "Listen"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Can you ___ the bell?",
     "options": [
      "hear",
      "listen",
      "watch"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Look at this beautiful picture.",
     "options": [
      "تابعنا المباراة في التلفزيون.",
      "طالع هالصورة الحلوة.",
      "أشوف نسر في السما."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We ___ the match on TV.",
     "options": [
      "looked",
      "heard",
      "watched"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: look, see, watch, hear, listen"
   },
   {
    "kind": "highlight",
    "text": "see · watch · listen"
   },
   {
    "kind": "example",
    "en": "Listen to me, please!",
    "ar": "اسمعني لو سمحت!"
   },
   {
    "kind": "example",
    "en": "Can you hear the bell?",
    "ar": "تسمع الجرس؟"
   }
  ],
  "kids": {
   "listTitle": "see · watch · listen",
   "cards": [
    {
     "emoji": "👂",
     "en": "Listen to me, please!",
     "ar": "اسمعني لو سمحت!",
     "hl": "Listen"
    },
    {
     "emoji": "🔔",
     "en": "Can you hear the bell?",
     "ar": "تسمع الجرس؟",
     "hl": "hear"
    },
    {
     "emoji": "🖼️",
     "en": "Look at this beautiful picture.",
     "ar": "طالع هالصورة الحلوة.",
     "hl": "Look"
    },
    {
     "emoji": "📺",
     "en": "We watched the match on TV.",
     "ar": "تابعنا المباراة في التلفزيون.",
     "hl": "watched"
    },
    {
     "emoji": "🦅",
     "en": "I can see an eagle in the sky.",
     "ar": "أشوف نسر في السما.",
     "hl": "see"
    },
    {
     "emoji": "🎙️",
     "en": "They listened to the news.",
     "ar": "سمعوا الأخبار.",
     "hl": "listened"
    }
   ],
   "say": "see · watch · listen Listen to me, please! Can you hear the bell? Look at this beautiful picture. We watched the match on TV. I can see an eagle in the sky. They listened to the news."
  }
 },
 {
  "id": "jana-114",
  "order": 114,
  "levelId": "l4",
  "titleAr": "تمرين: الإملاء",
  "titleEn": "Practice: Spelling",
  "content": {
   "explanationAr": "تمرين إملاء لكلمات يغلط فيها الناس كثير: because، friend، Wednesday، beautiful، different، February.",
   "altExplanationAr": "My friend is coming on Wednesday.",
   "example": [
    {
     "en": "She is my best friend.",
     "ar": "هي أعز صديقة لي."
    },
    {
     "en": "The test is on Wednesday.",
     "ar": "الاختبار يوم الأربعاء."
    },
    {
     "en": "What a beautiful garden!",
     "ar": "يا حلو هالحديقة!"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "She is my best ___.",
    "options": [
     "friend",
     "freind",
     "frend"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The test is on ___.",
     "options": [
      "Wensday",
      "Wednesday",
      "Wednsday"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "What a beautiful garden!",
     "options": [
      "عيد ميلادي في فبراير.",
      "إجاباتنا مختلفة.",
      "يا حلو هالحديقة!"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "My birthday is in ___.",
     "options": [
      "February",
      "Febuary",
      "Febrary"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Spelling"
   },
   {
    "kind": "highlight",
    "text": "Spelling"
   },
   {
    "kind": "example",
    "en": "She is my best friend.",
    "ar": "هي أعز صديقة لي."
   },
   {
    "kind": "example",
    "en": "The test is on Wednesday.",
    "ar": "الاختبار يوم الأربعاء."
   }
  ],
  "kids": {
   "listTitle": "Spelling",
   "cards": [
    {
     "emoji": "🤝",
     "en": "She is my best friend.",
     "ar": "هي أعز صديقة لي.",
     "hl": "friend"
    },
    {
     "emoji": "📅",
     "en": "The test is on Wednesday.",
     "ar": "الاختبار يوم الأربعاء.",
     "hl": "Wednesday"
    },
    {
     "emoji": "🌸",
     "en": "What a beautiful garden!",
     "ar": "يا حلو هالحديقة!",
     "hl": "beautiful"
    },
    {
     "emoji": "❄️",
     "en": "My birthday is in February.",
     "ar": "عيد ميلادي في فبراير.",
     "hl": "February"
    },
    {
     "emoji": "🔀",
     "en": "Our answers are different.",
     "ar": "إجاباتنا مختلفة.",
     "hl": "different"
    },
    {
     "emoji": "🙏",
     "en": "I was late because the road was busy.",
     "ar": "تأخرت لأن الطريق زحمة.",
     "hl": "because"
    }
   ],
   "say": "Spelling She is my best friend. The test is on Wednesday. What a beautiful garden! My birthday is in February. Our answers are different. I was late because the road was busy."
  }
 },
 {
  "id": "jana-115",
  "order": 115,
  "levelId": "l4",
  "titleAr": "تمرين: كتابة رسالة",
  "titleEn": "Practice: Writing a Message",
  "content": {
   "explanationAr": "تمرين: الرسالة تبدأ بـ Dear أو Hi + الاسم، وتنتهي بـ Best wishes أو See you soon. وفيها: Thank you for... و I hope...",
   "altExplanationAr": "Dear Noor, thank you for the lovely gift. Best wishes, Huda.",
   "example": [
    {
     "en": "Dear Noor, how are you?",
     "ar": "عزيزتي نور، كيف حالك؟"
    },
    {
     "en": "Thank you for the lovely gift.",
     "ar": "شكرًا على الهدية الحلوة."
    },
    {
     "en": "I hope you are well.",
     "ar": "أتمنى تكونين بخير."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ Noor, how are you?",
    "options": [
     "Dare",
     "Dear",
     "Deer"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Thank you ___ the lovely gift.",
     "options": [
      "to",
      "of",
      "for"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I hope you are well.",
     "options": [
      "أتمنى تكونين بخير.",
      "متشوقة أشوفك الشهر الجاي.",
      "مع أطيب التمنيات، هدى."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I can't ___ to see you next month.",
     "options": [
      "weight",
      "wait",
      "waits"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Writing a Message"
   },
   {
    "kind": "highlight",
    "text": "Dear · Best wishes"
   },
   {
    "kind": "example",
    "en": "Dear Noor, how are you?",
    "ar": "عزيزتي نور، كيف حالك؟"
   },
   {
    "kind": "example",
    "en": "Thank you for the lovely gift.",
    "ar": "شكرًا على الهدية الحلوة."
   }
  ],
  "kids": {
   "listTitle": "Dear · Best wishes",
   "cards": [
    {
     "emoji": "✉️",
     "en": "Dear Noor, how are you?",
     "ar": "عزيزتي نور، كيف حالك؟",
     "hl": "Dear"
    },
    {
     "emoji": "🎁",
     "en": "Thank you for the lovely gift.",
     "ar": "شكرًا على الهدية الحلوة.",
     "hl": "for"
    },
    {
     "emoji": "🤞",
     "en": "I hope you are well.",
     "ar": "أتمنى تكونين بخير.",
     "hl": "hope"
    },
    {
     "emoji": "📅",
     "en": "I can't wait to see you next month.",
     "ar": "متشوقة أشوفك الشهر الجاي.",
     "hl": "wait"
    },
    {
     "emoji": "💐",
     "en": "Best wishes, Huda.",
     "ar": "مع أطيب التمنيات، هدى.",
     "hl": "wishes"
    },
    {
     "emoji": "👋",
     "en": "Write back soon!",
     "ar": "رد علي قريب!",
     "hl": "Write"
    }
   ],
   "say": "Dear · Best wishes Dear Noor, how are you? Thank you for the lovely gift. I hope you are well. I can't wait to see you next month. Best wishes, Huda. Write back soon!"
  }
 },
 {
  "id": "jana-116",
  "order": 116,
  "levelId": "l4",
  "titleAr": "تمرين: الأزمنة مع بعض",
  "titleEn": "Practice: Mixed Tenses",
  "content": {
   "explanationAr": "تمرين يخلط الأزمنة: المضارع للعادة، و ing للحين، والماضي لشي خلص، و will أو going to للمستقبل. انتبه لكلمة الوقت.",
   "altExplanationAr": "Every day I walk, but yesterday I drove.",
   "example": [
    {
     "en": "I walk to work every day.",
     "ar": "أمشي للدوام كل يوم."
    },
    {
     "en": "Yesterday I drove to work.",
     "ar": "أمس رحت الدوام بالسيارة."
    },
    {
     "en": "Mum is cooking right now.",
     "ar": "أمي تطبخ الحين."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ to work every day.",
    "options": [
     "walking",
     "walks",
     "walk"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Yesterday I ___ to work.",
     "options": [
      "drove",
      "drive",
      "will drive"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Mum is cooking right now.",
     "options": [
      "بنطير لجدة الأسبوع الجاي.",
      "أمي تطبخ الحين.",
      "قرت ثلاث كتب هالشهر."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We ___ fly to Jeddah next week.",
     "options": [
      "did",
      "are",
      "will"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Mixed Tenses"
   },
   {
    "kind": "highlight",
    "text": "Mixed tenses"
   },
   {
    "kind": "example",
    "en": "I walk to work every day.",
    "ar": "أمشي للدوام كل يوم."
   },
   {
    "kind": "example",
    "en": "Yesterday I drove to work.",
    "ar": "أمس رحت الدوام بالسيارة."
   }
  ],
  "kids": {
   "listTitle": "Mixed tenses",
   "cards": [
    {
     "emoji": "🚶",
     "en": "I walk to work every day.",
     "ar": "أمشي للدوام كل يوم.",
     "hl": "walk"
    },
    {
     "emoji": "🚘",
     "en": "Yesterday I drove to work.",
     "ar": "أمس رحت الدوام بالسيارة.",
     "hl": "drove"
    },
    {
     "emoji": "🍲",
     "en": "Mum is cooking right now.",
     "ar": "أمي تطبخ الحين.",
     "hl": "cooking"
    },
    {
     "emoji": "🛫",
     "en": "We will fly to Jeddah next week.",
     "ar": "بنطير لجدة الأسبوع الجاي.",
     "hl": "will"
    },
    {
     "emoji": "📚",
     "en": "She has read three books this month.",
     "ar": "قرت ثلاث كتب هالشهر.",
     "hl": "read"
    },
    {
     "emoji": "⏳",
     "en": "They were waiting when I arrived.",
     "ar": "كانوا ينتظرون لما وصلت.",
     "hl": "were"
    }
   ],
   "say": "Mixed tenses I walk to work every day. Yesterday I drove to work. Mum is cooking right now. We will fly to Jeddah next week. She has read three books this month. They were waiting when I arrived."
  }
 },
 {
  "id": "jana-117",
  "order": 117,
  "levelId": "l4",
  "titleAr": "تمرين: الأرقام والأسعار",
  "titleEn": "Practice: Numbers and Prices",
  "content": {
   "explanationAr": "تمرين الأرقام الكبيرة والأسعار: hundred و thousand ما تاخذ s بعد الرقم: two hundred riyals.",
   "altExplanationAr": "How much is it? It's two hundred and fifty riyals.",
   "example": [
    {
     "en": "It costs two hundred riyals.",
     "ar": "سعره مئتين ريال."
    },
    {
     "en": "How much are these sunglasses?",
     "ar": "بكم هالنظارات الشمسية؟"
    },
    {
     "en": "The car costs fifty thousand riyals.",
     "ar": "السيارة بخمسين ألف ريال."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "It costs two ___ riyals.",
    "options": [
     "hundred",
     "hundreds",
     "hundredth"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "How ___ are these sunglasses?",
     "options": [
      "many",
      "much",
      "long"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "The car costs fifty thousand riyals.",
     "options": [
      "المجموع تسعة وتسعين ريال.",
      "عندك فكة؟",
      "السيارة بخمسين ألف ريال."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The ___ is ninety-nine riyals.",
     "options": [
      "total",
      "totally",
      "tool"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Practice: Numbers and Prices"
   },
   {
    "kind": "highlight",
    "text": "How much?"
   },
   {
    "kind": "example",
    "en": "It costs two hundred riyals.",
    "ar": "سعره مئتين ريال."
   },
   {
    "kind": "example",
    "en": "How much are these sunglasses?",
    "ar": "بكم هالنظارات الشمسية؟"
   }
  ],
  "kids": {
   "listTitle": "How much?",
   "cards": [
    {
     "emoji": "💵",
     "en": "It costs two hundred riyals.",
     "ar": "سعره مئتين ريال.",
     "hl": "hundred"
    },
    {
     "emoji": "🏷️",
     "en": "How much are these sunglasses?",
     "ar": "بكم هالنظارات الشمسية؟",
     "hl": "much"
    },
    {
     "emoji": "🚗",
     "en": "The car costs fifty thousand riyals.",
     "ar": "السيارة بخمسين ألف ريال.",
     "hl": "thousand"
    },
    {
     "emoji": "🧾",
     "en": "The total is ninety-nine riyals.",
     "ar": "المجموع تسعة وتسعين ريال.",
     "hl": "total"
    },
    {
     "emoji": "🪙",
     "en": "Do you have any change?",
     "ar": "عندك فكة؟",
     "hl": "change"
    },
    {
     "emoji": "🔖",
     "en": "Everything is half price today.",
     "ar": "كل شي بنص السعر اليوم.",
     "hl": "half"
    }
   ],
   "say": "How much? It costs two hundred riyals. How much are these sunglasses? The car costs fifty thousand riyals. The total is ninety-nine riyals. Do you have any change? Everything is half price today."
  }
 },
 {
  "id": "jana-118",
  "order": 118,
  "levelId": "l4",
  "titleAr": "مراجعة: النصيحة والقواعد",
  "titleEn": "Review: Advice and Rules",
  "content": {
   "explanationAr": "مراجعة should و must و might و would like و الفعل مع to أو ing.",
   "altExplanationAr": "You should... You mustn't... I'd like to...",
   "example": [
    {
     "en": "You should put on sunscreen.",
     "ar": "المفروض تحط واقي شمس."
    },
    {
     "en": "You mustn't cross on a red light.",
     "ar": "ممنوع تقطع والإشارة حمرا."
    },
    {
     "en": "The road might be foggy tonight.",
     "ar": "الطريق يمكن يكون فيه ضباب الليلة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "You should ___ on sunscreen.",
    "options": [
     "puts",
     "put",
     "putting"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "You ___ cross on a red light.",
     "options": [
      "don't have",
      "haven't",
      "mustn't"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "The road might be foggy tonight.",
     "options": [
      "الطريق يمكن يكون فيه ضباب الليلة.",
      "أبغى آيس كريم لو سمحت.",
      "تعلم يعزف قيتار."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I'd ___ an ice cream, please.",
     "options": [
      "likes",
      "like",
      "liking"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Review: Advice and Rules"
   },
   {
    "kind": "highlight",
    "text": "Review"
   },
   {
    "kind": "example",
    "en": "You should put on sunscreen.",
    "ar": "المفروض تحط واقي شمس."
   },
   {
    "kind": "example",
    "en": "You mustn't cross on a red light.",
    "ar": "ممنوع تقطع والإشارة حمرا."
   }
  ],
  "kids": {
   "listTitle": "Review",
   "cards": [
    {
     "emoji": "🧴",
     "en": "You should put on sunscreen.",
     "ar": "المفروض تحط واقي شمس.",
     "hl": "put"
    },
    {
     "emoji": "🛑",
     "en": "You mustn't cross on a red light.",
     "ar": "ممنوع تقطع والإشارة حمرا.",
     "hl": "mustn't"
    },
    {
     "emoji": "🌫️",
     "en": "The road might be foggy tonight.",
     "ar": "الطريق يمكن يكون فيه ضباب الليلة.",
     "hl": "be"
    },
    {
     "emoji": "🍦",
     "en": "I'd like an ice cream, please.",
     "ar": "أبغى آيس كريم لو سمحت.",
     "hl": "like"
    },
    {
     "emoji": "🎸",
     "en": "He learned to play the guitar.",
     "ar": "تعلم يعزف قيتار.",
     "hl": "play"
    },
    {
     "emoji": "🧹",
     "en": "Do you mind cleaning the table?",
     "ar": "تمانع تنظف الطاولة؟",
     "hl": "cleaning"
    }
   ],
   "say": "Review You should put on sunscreen. You mustn't cross on a red light. The road might be foggy tonight. I'd like an ice cream, please. He learned to play the guitar. Do you mind cleaning the table?"
  }
 },
 {
  "id": "jana-119",
  "order": 119,
  "levelId": "l4",
  "titleAr": "مراجعة: الكلمات والتعابير",
  "titleEn": "Review: Words and Phrases",
  "content": {
   "explanationAr": "مراجعة الأفعال المركبة و say أو tell و make أو do و have أو take و borrow أو lend.",
   "altExplanationAr": "اقرأ الجملة كاملة، وبعدين اختار التعبير الصح.",
   "example": [
    {
     "en": "Tell us about your trip.",
     "ar": "احكِ لنا عن رحلتك."
    },
    {
     "en": "Let's make a cake for Mum.",
     "ar": "خلنا نسوي كيكة لأمي."
    },
    {
     "en": "Can I borrow your torch?",
     "ar": "أقدر أستلف كشافك؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ us about your trip.",
    "options": [
     "Say",
     "Speak",
     "Tell"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Let's ___ a cake for Mum.",
     "options": [
      "make",
      "do",
      "take"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Can I borrow your torch?",
     "options": [
      "اخلع جاكيتك وارتاح.",
      "أقدر أستلف كشافك؟",
      "يومك سعيد!"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Take ___ your jacket and relax.",
     "options": [
      "of",
      "in",
      "off"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Review: Words and Phrases"
   },
   {
    "kind": "highlight",
    "text": "Review"
   },
   {
    "kind": "example",
    "en": "Tell us about your trip.",
    "ar": "احكِ لنا عن رحلتك."
   },
   {
    "kind": "example",
    "en": "Let's make a cake for Mum.",
    "ar": "خلنا نسوي كيكة لأمي."
   }
  ],
  "kids": {
   "listTitle": "Review",
   "cards": [
    {
     "emoji": "📖",
     "en": "Tell us about your trip.",
     "ar": "احكِ لنا عن رحلتك.",
     "hl": "Tell"
    },
    {
     "emoji": "🍰",
     "en": "Let's make a cake for Mum.",
     "ar": "خلنا نسوي كيكة لأمي.",
     "hl": "make"
    },
    {
     "emoji": "🔦",
     "en": "Can I borrow your torch?",
     "ar": "أقدر أستلف كشافك؟",
     "hl": "borrow"
    },
    {
     "emoji": "🧥",
     "en": "Take off your jacket and relax.",
     "ar": "اخلع جاكيتك وارتاح.",
     "hl": "off"
    },
    {
     "emoji": "🖐️",
     "en": "Have a good day!",
     "ar": "يومك سعيد!",
     "hl": "Have"
    },
    {
     "emoji": "👜",
     "en": "I'm looking for my handbag.",
     "ar": "أدور شنطة يدي.",
     "hl": "for"
    }
   ],
   "say": "Review Tell us about your trip. Let's make a cake for Mum. Can I borrow your torch? Take off your jacket and relax. Have a good day! I'm looking for my handbag."
  }
 },
 {
  "id": "jana-120",
  "order": 120,
  "levelId": "l4",
  "titleAr": "مراجعة المستوى الرابع",
  "titleEn": "Level 4 Review",
  "content": {
   "explanationAr": "مراجعة نهائية لتمارين جنى: الشرط، المبني للمجهول، who و which، والأسئلة الذيلية. نحو مستوى A2.",
   "altExplanationAr": "برافو! وصلت لآخر مستوى.",
   "example": [
    {
     "en": "If it is sunny, we will go to the beach.",
     "ar": "إذا كان الجو مشمس بنروح البحر."
    },
    {
     "en": "This vase was made in China.",
     "ar": "هالمزهرية مصنوعة في الصين."
    },
    {
     "en": "The woman who cooked this is my aunt.",
     "ar": "الحرمة اللي طبخت هذا خالتي."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "If it ___ sunny, we will go to the beach.",
    "options": [
     "is",
     "will be",
     "was"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "This vase was ___ in China.",
     "options": [
      "make",
      "made",
      "makes"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "The woman who cooked this is my aunt.",
     "options": [
      "تحب عصير المانجو، صح؟",
      "بنينا قلعة الرمل بنفسنا.",
      "الحرمة اللي طبخت هذا خالتي."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "You like mango juice, ___ you?",
     "options": [
      "don't",
      "aren't",
      "doesn't"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Level 4 Review"
   },
   {
    "kind": "highlight",
    "text": "Level 4 Review"
   },
   {
    "kind": "example",
    "en": "If it is sunny, we will go to the beach.",
    "ar": "إذا كان الجو مشمس بنروح البحر."
   },
   {
    "kind": "example",
    "en": "This vase was made in China.",
    "ar": "هالمزهرية مصنوعة في الصين."
   }
  ],
  "kids": {
   "listTitle": "Level 4 Review",
   "cards": [
    {
     "emoji": "🌞",
     "en": "If it is sunny, we will go to the beach.",
     "ar": "إذا كان الجو مشمس بنروح البحر.",
     "hl": "is"
    },
    {
     "emoji": "🏺",
     "en": "This vase was made in China.",
     "ar": "هالمزهرية مصنوعة في الصين.",
     "hl": "made"
    },
    {
     "emoji": "👩‍🍳",
     "en": "The woman who cooked this is my aunt.",
     "ar": "الحرمة اللي طبخت هذا خالتي.",
     "hl": "who"
    },
    {
     "emoji": "🧃",
     "en": "You like mango juice, don't you?",
     "ar": "تحب عصير المانجو، صح؟",
     "hl": "don't"
    },
    {
     "emoji": "🙌",
     "en": "We built the sandcastle ourselves.",
     "ar": "بنينا قلعة الرمل بنفسنا.",
     "hl": "ourselves"
    },
    {
     "emoji": "😮",
     "en": "The end of the story was surprising.",
     "ar": "نهاية القصة كانت مفاجئة.",
     "hl": "surprising"
    }
   ],
   "say": "Level 4 Review If it is sunny, we will go to the beach. This vase was made in China. The woman who cooked this is my aunt. You like mango juice, don't you? We built the sandcastle ourselves. The end of the story was surprising."
  }
 }
];
