/** Basic Sentences with Haya: 120 «من الصفر» lessons (4 levels × 30; lessons 1-30 = level 1, ids/orders unchanged), card board per lesson. Generated from /workspace/kidsgen (literal spoken lines: trigram allow-list → voice works without a token). */
import type { TutorLesson } from './nouraL1';

export const HAYA_LESSONS: TutorLesson[] = [
 {
  "id": "haya-01",
  "order": 1,
  "levelId": "l1",
  "titleAr": "أنا: I am",
  "titleEn": "I am",
  "content": {
   "explanationAr": "نبدأ الجملة بـ I am يعني «أنا». بعدها اسمك أو شعورك أو عمرك: I am Haya، I am happy.",
   "altExplanationAr": "بالعربي نقول «أنا مبسوط» بدون فعل، لكن بالإنجليزي لازم am: I am happy مو I happy.",
   "example": [
    {
     "en": "I am Haya.",
     "ar": "أنا هيا."
    },
    {
     "en": "I am happy.",
     "ar": "أنا مبسوطة."
    },
    {
     "en": "I am ten.",
     "ar": "عمري عشر سنين."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ Haya.",
    "options": [
     "am",
     "is",
     "are"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I am ___.",
     "options": [
      "sad",
      "happy",
      "tired"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I am ten.",
     "options": [
      "أنا طالب.",
      "أنا من السعودية.",
      "عمري عشر سنين."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I am a ___.",
     "options": [
      "student",
      "students",
      "study"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "I am"
   },
   {
    "kind": "highlight",
    "text": "I am ..."
   },
   {
    "kind": "example",
    "en": "I am Haya.",
    "ar": "أنا هيا."
   },
   {
    "kind": "example",
    "en": "I am happy.",
    "ar": "أنا مبسوطة."
   }
  ],
  "kids": {
   "listTitle": "I am ...",
   "cards": [
    {
     "emoji": "🧕",
     "en": "I am Haya.",
     "ar": "أنا هيا.",
     "hl": "am"
    },
    {
     "emoji": "😊",
     "en": "I am happy.",
     "ar": "أنا مبسوطة.",
     "hl": "happy"
    },
    {
     "emoji": "🎂",
     "en": "I am ten.",
     "ar": "عمري عشر سنين.",
     "hl": "ten"
    },
    {
     "emoji": "📚",
     "en": "I am a student.",
     "ar": "أنا طالب.",
     "hl": "student"
    },
    {
     "emoji": "🇸🇦",
     "en": "I am from Saudi Arabia.",
     "ar": "أنا من السعودية.",
     "hl": "from"
    },
    {
     "emoji": "😴",
     "en": "I am tired.",
     "ar": "أنا تعبان.",
     "hl": "tired"
    }
   ],
   "say": "I am ... I am Haya. I am happy. I am ten. I am a student. I am from Saudi Arabia. I am tired."
  }
 },
 {
  "id": "haya-02",
  "order": 2,
  "levelId": "l1",
  "titleAr": "هو وهي وهم",
  "titleEn": "He, She and They",
  "content": {
   "explanationAr": "لما نتكلم عن ولد نقول He is، وعن بنت She is، وعن أكثر من واحد They are.",
   "altExplanationAr": "is مع واحد، و are مع الجمع: She is my sister. They are my friends.",
   "example": [
    {
     "en": "He is my brother.",
     "ar": "هو أخوي."
    },
    {
     "en": "She is my sister.",
     "ar": "هي أختي."
    },
    {
     "en": "He is a teacher.",
     "ar": "هو معلم."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ is my brother.",
    "options": [
     "She",
     "He",
     "They"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ is my sister.",
     "options": [
      "He",
      "They",
      "She"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "He is a teacher.",
     "options": [
      "هو معلم.",
      "هي طبيبة.",
      "هم أصحابي."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She ___ a doctor.",
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
    "text": "He, She and They"
   },
   {
    "kind": "highlight",
    "text": "He is, She is, They are"
   },
   {
    "kind": "example",
    "en": "He is my brother.",
    "ar": "هو أخوي."
   },
   {
    "kind": "example",
    "en": "She is my sister.",
    "ar": "هي أختي."
   }
  ],
  "kids": {
   "listTitle": "He is, She is, They are",
   "cards": [
    {
     "emoji": "👦",
     "en": "He is my brother.",
     "ar": "هو أخوي.",
     "hl": "He"
    },
    {
     "emoji": "🧕",
     "en": "She is my sister.",
     "ar": "هي أختي.",
     "hl": "She"
    },
    {
     "emoji": "👨‍🏫",
     "en": "He is a teacher.",
     "ar": "هو معلم.",
     "hl": "is"
    },
    {
     "emoji": "🧕",
     "en": "She is a doctor.",
     "ar": "هي طبيبة.",
     "hl": "is"
    },
    {
     "emoji": "👫",
     "en": "They are my friends.",
     "ar": "هم أصحابي.",
     "hl": "are"
    },
    {
     "emoji": "🏫",
     "en": "They are at school.",
     "ar": "هم في المدرسة.",
     "hl": "at"
    }
   ],
   "say": "He is, She is, They are He is my brother. She is my sister. He is a teacher. She is a doctor. They are my friends. They are at school."
  }
 },
 {
  "id": "haya-03",
  "order": 3,
  "levelId": "l1",
  "titleAr": "هذا: This is",
  "titleEn": "This is",
  "content": {
   "explanationAr": "نستخدم This is للشي القريب منا. نأشر عليه ونقول: This is my book يعني هذا كتابي.",
   "altExplanationAr": "This للمفرد القريب. لو أكثر من واحد نقول These are: These are my books.",
   "example": [
    {
     "en": "This is my book.",
     "ar": "هذا كتابي."
    },
    {
     "en": "This is my bag.",
     "ar": "هذي شنطتي."
    },
    {
     "en": "This is a chair.",
     "ar": "هذا كرسي."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ is my book.",
    "options": [
     "These",
     "They",
     "This"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "This is ___ bag.",
     "options": [
      "my",
      "me",
      "I"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "This is a chair.",
     "options": [
      "هذي تفاحة.",
      "هذا كرسي.",
      "هذا جوالي."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "This is ___ apple.",
     "options": [
      "a",
      "two",
      "an"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "This is"
   },
   {
    "kind": "highlight",
    "text": "This is ..."
   },
   {
    "kind": "example",
    "en": "This is my book.",
    "ar": "هذا كتابي."
   },
   {
    "kind": "example",
    "en": "This is my bag.",
    "ar": "هذي شنطتي."
   }
  ],
  "kids": {
   "listTitle": "This is ...",
   "cards": [
    {
     "emoji": "📖",
     "en": "This is my book.",
     "ar": "هذا كتابي.",
     "hl": "This"
    },
    {
     "emoji": "🎒",
     "en": "This is my bag.",
     "ar": "هذي شنطتي.",
     "hl": "my"
    },
    {
     "emoji": "🪑",
     "en": "This is a chair.",
     "ar": "هذا كرسي.",
     "hl": "a"
    },
    {
     "emoji": "🍎",
     "en": "This is an apple.",
     "ar": "هذي تفاحة.",
     "hl": "an"
    },
    {
     "emoji": "📱",
     "en": "This is my phone.",
     "ar": "هذا جوالي.",
     "hl": "is"
    },
    {
     "emoji": "🐱",
     "en": "This is our cat.",
     "ar": "هذي قطتنا.",
     "hl": "our"
    }
   ],
   "say": "This is ... This is my book. This is my bag. This is a chair. This is an apple. This is my phone. This is our cat."
  }
 },
 {
  "id": "haya-04",
  "order": 4,
  "levelId": "l1",
  "titleAr": "ذاك: That is",
  "titleEn": "That is",
  "content": {
   "explanationAr": "نستخدم That is للشي البعيد عنا: That is a plane يعني ذيك طيارة.",
   "altExplanationAr": "This للقريب و That للبعيد. أشّر بعيد وقل That is the sun.",
   "example": [
    {
     "en": "That is a plane.",
     "ar": "ذيك طيارة."
    },
    {
     "en": "That is the sun.",
     "ar": "ذيك الشمس."
    },
    {
     "en": "That is my house.",
     "ar": "ذاك بيتي."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ is a plane.",
    "options": [
     "That",
     "Those",
     "They"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "That is ___ sun.",
     "options": [
      "a",
      "the",
      "an"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "That is my house.",
     "options": [
      "ذاك مسجد.",
      "ذيك شجرة كبيرة.",
      "ذاك بيتي."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "That is a ___.",
     "options": [
      "mosque",
      "mouse",
      "most"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "That is"
   },
   {
    "kind": "highlight",
    "text": "That is ..."
   },
   {
    "kind": "example",
    "en": "That is a plane.",
    "ar": "ذيك طيارة."
   },
   {
    "kind": "example",
    "en": "That is the sun.",
    "ar": "ذيك الشمس."
   }
  ],
  "kids": {
   "listTitle": "That is ...",
   "cards": [
    {
     "emoji": "✈️",
     "en": "That is a plane.",
     "ar": "ذيك طيارة.",
     "hl": "That"
    },
    {
     "emoji": "☀️",
     "en": "That is the sun.",
     "ar": "ذيك الشمس.",
     "hl": "the"
    },
    {
     "emoji": "🏠",
     "en": "That is my house.",
     "ar": "ذاك بيتي.",
     "hl": "house"
    },
    {
     "emoji": "🕌",
     "en": "That is a mosque.",
     "ar": "ذاك مسجد.",
     "hl": "mosque"
    },
    {
     "emoji": "🌳",
     "en": "That is a big tree.",
     "ar": "ذيك شجرة كبيرة.",
     "hl": "big"
    },
    {
     "emoji": "🚌",
     "en": "That is the school bus.",
     "ar": "ذاك باص المدرسة.",
     "hl": "bus"
    }
   ],
   "say": "That is ... That is a plane. That is the sun. That is my house. That is a mosque. That is a big tree. That is the school bus."
  }
 },
 {
  "id": "haya-05",
  "order": 5,
  "levelId": "l1",
  "titleAr": "عندي: I have",
  "titleEn": "I have",
  "content": {
   "explanationAr": "نقول I have يعني «عندي»: I have a cat يعني عندي قطة.",
   "altExplanationAr": "بعد I have نحط a قبل الشي المفرد: I have a pen. وللجمع بدون a: I have two pens.",
   "example": [
    {
     "en": "I have a cat.",
     "ar": "عندي قطة."
    },
    {
     "en": "I have a pen.",
     "ar": "عندي قلم."
    },
    {
     "en": "I have one brother.",
     "ar": "عندي أخ واحد."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ a cat.",
    "options": [
     "has",
     "have",
     "am"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I have ___ pen.",
     "options": [
      "an",
      "two",
      "a"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I have one brother.",
     "options": [
      "عندي أخ واحد.",
      "عندي دراجة جديدة.",
      "عندي تفاحتين."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I have a ___ bike.",
     "options": [
      "now",
      "new",
      "knew"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "I have"
   },
   {
    "kind": "highlight",
    "text": "I have ..."
   },
   {
    "kind": "example",
    "en": "I have a cat.",
    "ar": "عندي قطة."
   },
   {
    "kind": "example",
    "en": "I have a pen.",
    "ar": "عندي قلم."
   }
  ],
  "kids": {
   "listTitle": "I have ...",
   "cards": [
    {
     "emoji": "🐱",
     "en": "I have a cat.",
     "ar": "عندي قطة.",
     "hl": "have"
    },
    {
     "emoji": "🖊️",
     "en": "I have a pen.",
     "ar": "عندي قلم.",
     "hl": "a"
    },
    {
     "emoji": "👦",
     "en": "I have one brother.",
     "ar": "عندي أخ واحد.",
     "hl": "one"
    },
    {
     "emoji": "🚲",
     "en": "I have a new bike.",
     "ar": "عندي دراجة جديدة.",
     "hl": "new"
    },
    {
     "emoji": "🍎",
     "en": "I have two apples.",
     "ar": "عندي تفاحتين.",
     "hl": "apples"
    },
    {
     "emoji": "👟",
     "en": "We have new shoes.",
     "ar": "عندنا أحذية جديدة.",
     "hl": "have"
    }
   ],
   "say": "I have ... I have a cat. I have a pen. I have one brother. I have a new bike. I have two apples. We have new shoes."
  }
 },
 {
  "id": "haya-06",
  "order": 6,
  "levelId": "l1",
  "titleAr": "عنده: has",
  "titleEn": "He has, She has",
  "content": {
   "explanationAr": "مع He و She نقول has بدل have: She has a bag يعني عندها شنطة.",
   "altExplanationAr": "I و You و We و They معهم have، و He و She و It معهم has.",
   "example": [
    {
     "en": "She has a bag.",
     "ar": "عندها شنطة."
    },
    {
     "en": "He has a car.",
     "ar": "عنده سيارة."
    },
    {
     "en": "My brother has a dog.",
     "ar": "أخوي عنده كلب."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "She ___ a bag.",
    "options": [
     "have",
     "is",
     "has"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He ___ a car.",
     "options": [
      "has",
      "have",
      "are"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "My brother has a dog.",
     "options": [
      "عندها جوال.",
      "أخوي عنده كلب.",
      "عندهم بيت كبير."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She ___ a phone.",
     "options": [
      "have",
      "is",
      "has"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "He has, She has"
   },
   {
    "kind": "highlight",
    "text": "He has, She has"
   },
   {
    "kind": "example",
    "en": "She has a bag.",
    "ar": "عندها شنطة."
   },
   {
    "kind": "example",
    "en": "He has a car.",
    "ar": "عنده سيارة."
   }
  ],
  "kids": {
   "listTitle": "He has, She has",
   "cards": [
    {
     "emoji": "👜",
     "en": "She has a bag.",
     "ar": "عندها شنطة.",
     "hl": "has"
    },
    {
     "emoji": "🚗",
     "en": "He has a car.",
     "ar": "عنده سيارة.",
     "hl": "has"
    },
    {
     "emoji": "🐶",
     "en": "My brother has a dog.",
     "ar": "أخوي عنده كلب.",
     "hl": "has"
    },
    {
     "emoji": "📱",
     "en": "She has a phone.",
     "ar": "عندها جوال.",
     "hl": "has"
    },
    {
     "emoji": "👫",
     "en": "They have a big house.",
     "ar": "عندهم بيت كبير.",
     "hl": "have"
    },
    {
     "emoji": "🐱",
     "en": "The cat has green eyes.",
     "ar": "القطة عيونها خضر.",
     "hl": "has"
    }
   ],
   "say": "He has, She has She has a bag. He has a car. My brother has a dog. She has a phone. They have a big house. The cat has green eyes."
  }
 },
 {
  "id": "haya-07",
  "order": 7,
  "levelId": "l1",
  "titleAr": "أحب: I like",
  "titleEn": "I like",
  "content": {
   "explanationAr": "نقول I like للشي اللي نحبه: I like apples يعني أحب التفاح.",
   "altExplanationAr": "مع He و She نضيف s: She likes tea. ومع I و You و We بدون s.",
   "example": [
    {
     "en": "I like apples.",
     "ar": "أحب التفاح."
    },
    {
     "en": "I like tea.",
     "ar": "أحب الشاي."
    },
    {
     "en": "I like football.",
     "ar": "أحب كرة القدم."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ apples.",
    "options": [
     "like",
     "likes",
     "liking"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I like ___.",
     "options": [
      "tree",
      "tea",
      "ten"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I like football.",
     "options": [
      "أحب القطط.",
      "تحب الكتب.",
      "أحب كرة القدم."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I like ___.",
     "options": [
      "cats",
      "cat",
      "a cat"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "I like"
   },
   {
    "kind": "highlight",
    "text": "I like ..."
   },
   {
    "kind": "example",
    "en": "I like apples.",
    "ar": "أحب التفاح."
   },
   {
    "kind": "example",
    "en": "I like tea.",
    "ar": "أحب الشاي."
   }
  ],
  "kids": {
   "listTitle": "I like ...",
   "cards": [
    {
     "emoji": "🍎",
     "en": "I like apples.",
     "ar": "أحب التفاح.",
     "hl": "like"
    },
    {
     "emoji": "🍵",
     "en": "I like tea.",
     "ar": "أحب الشاي.",
     "hl": "tea"
    },
    {
     "emoji": "⚽",
     "en": "I like football.",
     "ar": "أحب كرة القدم.",
     "hl": "football"
    },
    {
     "emoji": "🐱",
     "en": "I like cats.",
     "ar": "أحب القطط.",
     "hl": "cats"
    },
    {
     "emoji": "📖",
     "en": "She likes books.",
     "ar": "تحب الكتب.",
     "hl": "likes"
    },
    {
     "emoji": "🍫",
     "en": "He likes chocolate.",
     "ar": "يحب الشوكولاتة.",
     "hl": "likes"
    }
   ],
   "say": "I like ... I like apples. I like tea. I like football. I like cats. She likes books. He likes chocolate."
  }
 },
 {
  "id": "haya-08",
  "order": 8,
  "levelId": "l1",
  "titleAr": "ما أحب، وهل تحب؟",
  "titleEn": "I do not like, Do you like",
  "content": {
   "explanationAr": "نقول I don't like للشي اللي ما نحبه، ونسأل Do you like ...? يعني هل تحب؟",
   "altExplanationAr": "الجواب القصير: Yes, I do أو No, I don't.",
   "example": [
    {
     "en": "I don't like onions.",
     "ar": "ما أحب البصل."
    },
    {
     "en": "I don't like cold weather.",
     "ar": "ما أحب الجو البارد."
    },
    {
     "en": "Do you like strawberries?",
     "ar": "تحب الفراولة؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ like onions.",
    "options": [
     "doesn't",
     "don't",
     "not"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I don't like ___ weather.",
     "options": [
      "hot",
      "cool",
      "cold"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Do you like strawberries?",
     "options": [
      "تحب الفراولة؟",
      "إيه، أحبها.",
      "لا، ما أحبها."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Yes, I ___.",
     "options": [
      "does",
      "do",
      "am"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "I do not like, Do you like"
   },
   {
    "kind": "highlight",
    "text": "I don't like ... Do you like ...?"
   },
   {
    "kind": "example",
    "en": "I don't like onions.",
    "ar": "ما أحب البصل."
   },
   {
    "kind": "example",
    "en": "I don't like cold weather.",
    "ar": "ما أحب الجو البارد."
   }
  ],
  "kids": {
   "listTitle": "I don't like ... Do you like ...?",
   "cards": [
    {
     "emoji": "🧅",
     "en": "I don't like onions.",
     "ar": "ما أحب البصل.",
     "hl": "don't"
    },
    {
     "emoji": "🥶",
     "en": "I don't like cold weather.",
     "ar": "ما أحب الجو البارد.",
     "hl": "cold"
    },
    {
     "emoji": "🍓",
     "en": "Do you like strawberries?",
     "ar": "تحب الفراولة؟",
     "hl": "Do"
    },
    {
     "emoji": "👍",
     "en": "Yes, I do.",
     "ar": "إيه، أحبها.",
     "hl": "do"
    },
    {
     "emoji": "👎",
     "en": "No, I don't.",
     "ar": "لا، ما أحبها.",
     "hl": "don't"
    },
    {
     "emoji": "🍵",
     "en": "Does she like tea?",
     "ar": "هي تحب الشاي؟",
     "hl": "Does"
    }
   ],
   "say": "I don't like ... Do you like ...? I don't like onions. I don't like cold weather. Do you like strawberries? Yes, I do. No, I don't. Does she like tea?"
  }
 },
 {
  "id": "haya-09",
  "order": 9,
  "levelId": "l1",
  "titleAr": "اسمي وعمري: My ... is",
  "titleEn": "My name is",
  "content": {
   "explanationAr": "نعرّف بنفسنا: My name is Haya يعني اسمي هيا. و My favourite colour is blue يعني لوني المفضل أزرق.",
   "altExplanationAr": "My يعني «حقي» أو «لي» ويجي قبل الشي: my name و my school.",
   "example": [
    {
     "en": "My name is Haya.",
     "ar": "اسمي هيا."
    },
    {
     "en": "My favourite colour is blue.",
     "ar": "لوني المفضل أزرق."
    },
    {
     "en": "My school is big.",
     "ar": "مدرستي كبيرة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "My ___ is Haya.",
    "options": [
     "names",
     "named",
     "name"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "My favourite ___ is blue.",
     "options": [
      "colour",
      "colours",
      "colors"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "My school is big.",
     "options": [
      "قطتي بيضا.",
      "مدرستي كبيرة.",
      "أمي طيبة."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "My cat ___ white.",
     "options": [
      "are",
      "am",
      "is"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "My name is"
   },
   {
    "kind": "highlight",
    "text": "My ... is ..."
   },
   {
    "kind": "example",
    "en": "My name is Haya.",
    "ar": "اسمي هيا."
   },
   {
    "kind": "example",
    "en": "My favourite colour is blue.",
    "ar": "لوني المفضل أزرق."
   }
  ],
  "kids": {
   "listTitle": "My ... is ...",
   "cards": [
    {
     "emoji": "🧕",
     "en": "My name is Haya.",
     "ar": "اسمي هيا.",
     "hl": "name"
    },
    {
     "emoji": "🔵",
     "en": "My favourite colour is blue.",
     "ar": "لوني المفضل أزرق.",
     "hl": "colour"
    },
    {
     "emoji": "🏫",
     "en": "My school is big.",
     "ar": "مدرستي كبيرة.",
     "hl": "My"
    },
    {
     "emoji": "🐱",
     "en": "My cat is white.",
     "ar": "قطتي بيضا.",
     "hl": "is"
    },
    {
     "emoji": "🧕",
     "en": "My mother is kind.",
     "ar": "أمي طيبة.",
     "hl": "kind"
    },
    {
     "emoji": "🏙️",
     "en": "My city is Riyadh.",
     "ar": "مدينتي الرياض.",
     "hl": "city"
    }
   ],
   "say": "My ... is ... My name is Haya. My favourite colour is blue. My school is big. My cat is white. My mother is kind. My city is Riyadh."
  }
 },
 {
  "id": "haya-10",
  "order": 10,
  "levelId": "l1",
  "titleAr": "مراجعة المستوى الأول",
  "titleEn": "Level 1 Review",
  "content": {
   "explanationAr": "نراجع الجمل: I am و He is و This is و I have و I like و My name is.",
   "altExplanationAr": "اقرأ كل جملة وغطّ الترجمة، وشوف إذا تعرف معناها.",
   "example": [
    {
     "en": "I am happy today.",
     "ar": "أنا مبسوط اليوم."
    },
    {
     "en": "She is my teacher.",
     "ar": "هي معلمتي."
    },
    {
     "en": "This is my notebook.",
     "ar": "هذا دفتري."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ happy today.",
    "options": [
     "am",
     "is",
     "are"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ is my teacher.",
     "options": [
      "He",
      "She",
      "It"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "This is my notebook.",
     "options": [
      "عندي كلب صغير.",
      "يحب الموز.",
      "هذا دفتري."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I have a ___ dog.",
     "options": [
      "small",
      "smell",
      "smile"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Level 1 Review"
   },
   {
    "kind": "highlight",
    "text": "Review: 6 Sentences"
   },
   {
    "kind": "example",
    "en": "I am happy today.",
    "ar": "أنا مبسوط اليوم."
   },
   {
    "kind": "example",
    "en": "She is my teacher.",
    "ar": "هي معلمتي."
   }
  ],
  "kids": {
   "listTitle": "Review: 6 Sentences",
   "cards": [
    {
     "emoji": "😊",
     "en": "I am happy today.",
     "ar": "أنا مبسوط اليوم.",
     "hl": "am"
    },
    {
     "emoji": "🧕",
     "en": "She is my teacher.",
     "ar": "هي معلمتي.",
     "hl": "She"
    },
    {
     "emoji": "📖",
     "en": "This is my notebook.",
     "ar": "هذا دفتري.",
     "hl": "This"
    },
    {
     "emoji": "🐶",
     "en": "I have a small dog.",
     "ar": "عندي كلب صغير.",
     "hl": "small"
    },
    {
     "emoji": "🍌",
     "en": "He likes bananas.",
     "ar": "يحب الموز.",
     "hl": "likes"
    },
    {
     "emoji": "🧕",
     "en": "My name is Lama.",
     "ar": "اسمي لمى.",
     "hl": "name"
    }
   ],
   "say": "Review: 6 Sentences I am happy today. She is my teacher. This is my notebook. I have a small dog. He likes bananas. My name is Lama."
  }
 },
 {
  "id": "haya-11",
  "order": 11,
  "levelId": "l1",
  "titleAr": "أقدر: I can",
  "titleEn": "I can",
  "content": {
   "explanationAr": "نقول I can للشي اللي نقدر نسويه: I can swim يعني أقدر أسبح.",
   "altExplanationAr": "بعد can الفعل يجي بدون to وبدون s: She can swim، مو She can swims.",
   "example": [
    {
     "en": "I can swim.",
     "ar": "أقدر أسبح."
    },
    {
     "en": "I can ride a bike.",
     "ar": "أقدر أسوق دراجة."
    },
    {
     "en": "She can read English.",
     "ar": "تقدر تقرا إنجليزي."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ swim.",
    "options": [
     "cans",
     "can",
     "am"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I can ___ a bike.",
     "options": [
      "rides",
      "riding",
      "ride"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "She can read English.",
     "options": [
      "تقدر تقرا إنجليزي.",
      "يقدر يلعب كرة.",
      "أمي تقدر تطبخ."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He can ___ football.",
     "options": [
      "plays",
      "play",
      "playing"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "I can"
   },
   {
    "kind": "highlight",
    "text": "I can ..."
   },
   {
    "kind": "example",
    "en": "I can swim.",
    "ar": "أقدر أسبح."
   },
   {
    "kind": "example",
    "en": "I can ride a bike.",
    "ar": "أقدر أسوق دراجة."
   }
  ],
  "kids": {
   "listTitle": "I can ...",
   "cards": [
    {
     "emoji": "🏊",
     "en": "I can swim.",
     "ar": "أقدر أسبح.",
     "hl": "can"
    },
    {
     "emoji": "🚲",
     "en": "I can ride a bike.",
     "ar": "أقدر أسوق دراجة.",
     "hl": "ride"
    },
    {
     "emoji": "📖",
     "en": "She can read English.",
     "ar": "تقدر تقرا إنجليزي.",
     "hl": "read"
    },
    {
     "emoji": "⚽",
     "en": "He can play football.",
     "ar": "يقدر يلعب كرة.",
     "hl": "play"
    },
    {
     "emoji": "🍳",
     "en": "My mother can cook.",
     "ar": "أمي تقدر تطبخ.",
     "hl": "cook"
    },
    {
     "emoji": "✍️",
     "en": "We can write our names.",
     "ar": "نقدر نكتب أسماءنا.",
     "hl": "write"
    }
   ],
   "say": "I can ... I can swim. I can ride a bike. She can read English. He can play football. My mother can cook. We can write our names."
  }
 },
 {
  "id": "haya-12",
  "order": 12,
  "levelId": "l1",
  "titleAr": "ما أقدر، وهل تقدر؟",
  "titleEn": "I can't, Can you",
  "content": {
   "explanationAr": "نقول I can't للشي اللي ما نقدر عليه، ونسأل Can you ...? يعني تقدر؟",
   "altExplanationAr": "في السؤال can تجي أول: Can you swim? والجواب Yes, I can أو No, I can't.",
   "example": [
    {
     "en": "I can't fly.",
     "ar": "ما أقدر أطير."
    },
    {
     "en": "He can't drive.",
     "ar": "ما يقدر يسوق."
    },
    {
     "en": "Can you swim?",
     "ar": "تقدر تسبح؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ fly.",
    "options": [
     "don't",
     "not",
     "can't"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He can't ___.",
     "options": [
      "drive",
      "drives",
      "driving"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Can you swim?",
     "options": [
      "إيه، أقدر.",
      "تقدر تسبح؟",
      "تقدر تساعدني؟"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Yes, I ___.",
     "options": [
      "do",
      "am",
      "can"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "I can't, Can you"
   },
   {
    "kind": "highlight",
    "text": "I can't ... Can you ...?"
   },
   {
    "kind": "example",
    "en": "I can't fly.",
    "ar": "ما أقدر أطير."
   },
   {
    "kind": "example",
    "en": "He can't drive.",
    "ar": "ما يقدر يسوق."
   }
  ],
  "kids": {
   "listTitle": "I can't ... Can you ...?",
   "cards": [
    {
     "emoji": "✈️",
     "en": "I can't fly.",
     "ar": "ما أقدر أطير.",
     "hl": "can't"
    },
    {
     "emoji": "🚗",
     "en": "He can't drive.",
     "ar": "ما يقدر يسوق.",
     "hl": "drive"
    },
    {
     "emoji": "🏊",
     "en": "Can you swim?",
     "ar": "تقدر تسبح؟",
     "hl": "Can"
    },
    {
     "emoji": "👍",
     "en": "Yes, I can.",
     "ar": "إيه، أقدر.",
     "hl": "can"
    },
    {
     "emoji": "🙋",
     "en": "Can you help me?",
     "ar": "تقدر تساعدني؟",
     "hl": "help"
    },
    {
     "emoji": "👎",
     "en": "No, she can't.",
     "ar": "لا، ما تقدر.",
     "hl": "can't"
    }
   ],
   "say": "I can't ... Can you ...? I can't fly. He can't drive. Can you swim? Yes, I can. Can you help me? No, she can't."
  }
 },
 {
  "id": "haya-13",
  "order": 13,
  "levelId": "l1",
  "titleAr": "فيه: There is",
  "titleEn": "There is",
  "content": {
   "explanationAr": "نقول There is يعني «فيه» لشي واحد: There is a cat in the garden يعني فيه قطة في الحديقة.",
   "altExplanationAr": "There is للمفرد، وبعدها غالبًا a: There is a book.",
   "example": [
    {
     "en": "There is a cat in the garden.",
     "ar": "فيه قطة في الحديقة."
    },
    {
     "en": "There is an apple on the table.",
     "ar": "فيه تفاحة على الطاولة."
    },
    {
     "en": "There is a mosque near my house.",
     "ar": "فيه مسجد قريب من بيتي."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "There ___ a cat in the garden.",
    "options": [
     "is",
     "are",
     "am"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "There is ___ apple on the table.",
     "options": [
      "a",
      "an",
      "two"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "There is a mosque near my house.",
     "options": [
      "فيه سيارة برا.",
      "فيه كتاب في شنطتي.",
      "فيه مسجد قريب من بيتي."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "There is a car ___.",
     "options": [
      "outside",
      "inside",
      "out"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "There is"
   },
   {
    "kind": "highlight",
    "text": "There is ..."
   },
   {
    "kind": "example",
    "en": "There is a cat in the garden.",
    "ar": "فيه قطة في الحديقة."
   },
   {
    "kind": "example",
    "en": "There is an apple on the table.",
    "ar": "فيه تفاحة على الطاولة."
   }
  ],
  "kids": {
   "listTitle": "There is ...",
   "cards": [
    {
     "emoji": "🐱",
     "en": "There is a cat in the garden.",
     "ar": "فيه قطة في الحديقة.",
     "hl": "is"
    },
    {
     "emoji": "🍎",
     "en": "There is an apple on the table.",
     "ar": "فيه تفاحة على الطاولة.",
     "hl": "an"
    },
    {
     "emoji": "🕌",
     "en": "There is a mosque near my house.",
     "ar": "فيه مسجد قريب من بيتي.",
     "hl": "near"
    },
    {
     "emoji": "🚗",
     "en": "There is a car outside.",
     "ar": "فيه سيارة برا.",
     "hl": "outside"
    },
    {
     "emoji": "📖",
     "en": "There is a book in my bag.",
     "ar": "فيه كتاب في شنطتي.",
     "hl": "in"
    },
    {
     "emoji": "🛋️",
     "en": "There is a sofa in the room.",
     "ar": "فيه كنبة في الغرفة.",
     "hl": "sofa"
    }
   ],
   "say": "There is ... There is a cat in the garden. There is an apple on the table. There is a mosque near my house. There is a car outside. There is a book in my bag. There is a sofa in the room."
  }
 },
 {
  "id": "haya-14",
  "order": 14,
  "levelId": "l1",
  "titleAr": "فيه أكثر من واحد: There are",
  "titleEn": "There are",
  "content": {
   "explanationAr": "للجمع نقول There are: There are three books يعني فيه ثلاث كتب.",
   "altExplanationAr": "There is لواحد، و There are لأكثر من واحد. لا تنسَ s في آخر الكلمة.",
   "example": [
    {
     "en": "There are three books.",
     "ar": "فيه ثلاث كتب."
    },
    {
     "en": "There are five apples.",
     "ar": "فيه خمس تفاحات."
    },
    {
     "en": "There are ten students.",
     "ar": "فيه عشر طلاب."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "There ___ three books.",
    "options": [
     "is",
     "are",
     "am"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "There are five ___.",
     "options": [
      "apple",
      "an apple",
      "apples"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "There are ten students.",
     "options": [
      "فيه عشر طلاب.",
      "فيه أشجار كثيرة.",
      "فيه خروفين."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "There are ___ trees.",
     "options": [
      "much",
      "many",
      "a"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "There are"
   },
   {
    "kind": "highlight",
    "text": "There are ..."
   },
   {
    "kind": "example",
    "en": "There are three books.",
    "ar": "فيه ثلاث كتب."
   },
   {
    "kind": "example",
    "en": "There are five apples.",
    "ar": "فيه خمس تفاحات."
   }
  ],
  "kids": {
   "listTitle": "There are ...",
   "cards": [
    {
     "emoji": "📚",
     "en": "There are three books.",
     "ar": "فيه ثلاث كتب.",
     "hl": "are"
    },
    {
     "emoji": "🍎",
     "en": "There are five apples.",
     "ar": "فيه خمس تفاحات.",
     "hl": "apples"
    },
    {
     "emoji": "👦",
     "en": "There are ten students.",
     "ar": "فيه عشر طلاب.",
     "hl": "students"
    },
    {
     "emoji": "🌳",
     "en": "There are many trees.",
     "ar": "فيه أشجار كثيرة.",
     "hl": "many"
    },
    {
     "emoji": "🐑",
     "en": "There are two sheep.",
     "ar": "فيه خروفين.",
     "hl": "sheep"
    },
    {
     "emoji": "🪑",
     "en": "There are four chairs.",
     "ar": "فيه أربع كراسي.",
     "hl": "chairs"
    }
   ],
   "say": "There are ... There are three books. There are five apples. There are ten students. There are many trees. There are two sheep. There are four chairs."
  }
 },
 {
  "id": "haya-15",
  "order": 15,
  "levelId": "l1",
  "titleAr": "هل فيه؟ Is there",
  "titleEn": "Is there",
  "content": {
   "explanationAr": "نسأل Is there ...? يعني هل فيه؟ مثل Is there a bank near here?",
   "altExplanationAr": "الجواب: Yes, there is أو No, there isn't. وللجمع Are there ...?",
   "example": [
    {
     "en": "Is there a bank near here?",
     "ar": "فيه بنك قريب؟"
    },
    {
     "en": "Yes, there is.",
     "ar": "إيه، فيه."
    },
    {
     "en": "Is there any milk?",
     "ar": "فيه حليب؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ there a bank near here?",
    "options": [
     "Are",
     "Do",
     "Is"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Yes, there ___.",
     "options": [
      "is",
      "are",
      "do"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Is there any milk?",
     "options": [
      "لا، ما فيه.",
      "فيه حليب؟",
      "فيه أطفال هنا؟"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "No, there ___.",
     "options": [
      "aren't",
      "don't",
      "isn't"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Is there"
   },
   {
    "kind": "highlight",
    "text": "Is there ...?"
   },
   {
    "kind": "example",
    "en": "Is there a bank near here?",
    "ar": "فيه بنك قريب؟"
   },
   {
    "kind": "example",
    "en": "Yes, there is.",
    "ar": "إيه، فيه."
   }
  ],
  "kids": {
   "listTitle": "Is there ...?",
   "cards": [
    {
     "emoji": "🏦",
     "en": "Is there a bank near here?",
     "ar": "فيه بنك قريب؟",
     "hl": "Is"
    },
    {
     "emoji": "👍",
     "en": "Yes, there is.",
     "ar": "إيه، فيه.",
     "hl": "is"
    },
    {
     "emoji": "🥛",
     "en": "Is there any milk?",
     "ar": "فيه حليب؟",
     "hl": "any"
    },
    {
     "emoji": "👎",
     "en": "No, there isn't.",
     "ar": "لا، ما فيه.",
     "hl": "isn't"
    },
    {
     "emoji": "🧒",
     "en": "Are there any children here?",
     "ar": "فيه أطفال هنا؟",
     "hl": "Are"
    },
    {
     "emoji": "🚻",
     "en": "Is there a bathroom?",
     "ar": "فيه حمام؟",
     "hl": "bathroom"
    }
   ],
   "say": "Is there ...? Is there a bank near here? Yes, there is. Is there any milk? No, there isn't. Are there any children here? Is there a bathroom?"
  }
 },
 {
  "id": "haya-16",
  "order": 16,
  "levelId": "l1",
  "titleAr": "أبي: I want",
  "titleEn": "I want",
  "content": {
   "explanationAr": "نقول I want يعني «أبي»: I want water يعني أبي ماي. ولو بعدها فعل نحط to: I want to sleep.",
   "altExplanationAr": "بأدب أكثر نقول I would like بدل I want، خصوصًا في المطعم.",
   "example": [
    {
     "en": "I want water.",
     "ar": "أبي ماي."
    },
    {
     "en": "I want to sleep.",
     "ar": "أبي أنام."
    },
    {
     "en": "I want pizza.",
     "ar": "أبي بيتزا."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ water.",
    "options": [
     "want",
     "wants",
     "wanting"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I want ___ sleep.",
     "options": [
      "for",
      "to",
      "at"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I want pizza.",
     "options": [
      "نبي نروح البحر.",
      "أبي شوية شاي لو سمحت.",
      "أبي بيتزا."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We want to ___ to the beach.",
     "options": [
      "go",
      "goes",
      "going"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "I want"
   },
   {
    "kind": "highlight",
    "text": "I want ..."
   },
   {
    "kind": "example",
    "en": "I want water.",
    "ar": "أبي ماي."
   },
   {
    "kind": "example",
    "en": "I want to sleep.",
    "ar": "أبي أنام."
   }
  ],
  "kids": {
   "listTitle": "I want ...",
   "cards": [
    {
     "emoji": "💧",
     "en": "I want water.",
     "ar": "أبي ماي.",
     "hl": "want"
    },
    {
     "emoji": "😴",
     "en": "I want to sleep.",
     "ar": "أبي أنام.",
     "hl": "to"
    },
    {
     "emoji": "🍕",
     "en": "I want pizza.",
     "ar": "أبي بيتزا.",
     "hl": "want"
    },
    {
     "emoji": "🏖️",
     "en": "We want to go to the beach.",
     "ar": "نبي نروح البحر.",
     "hl": "go"
    },
    {
     "emoji": "🍵",
     "en": "I would like some tea.",
     "ar": "أبي شوية شاي لو سمحت.",
     "hl": "would"
    },
    {
     "emoji": "🧃",
     "en": "She wants juice.",
     "ar": "تبي عصير.",
     "hl": "wants"
    }
   ],
   "say": "I want ... I want water. I want to sleep. I want pizza. We want to go to the beach. I would like some tea. She wants juice."
  }
 },
 {
  "id": "haya-17",
  "order": 17,
  "levelId": "l1",
  "titleAr": "ممكن؟ وأحتاج",
  "titleEn": "Can I have, I need",
  "content": {
   "explanationAr": "نطلب بأدب: Can I have water, please? يعني ممكن ماي لو سمحت. و I need يعني أحتاج.",
   "altExplanationAr": "لا تنسَ please في الطلب، تخلي الكلام ألطف.",
   "example": [
    {
     "en": "Can I have water, please?",
     "ar": "ممكن ماي لو سمحت؟"
    },
    {
     "en": "Can I have the bill, please?",
     "ar": "ممكن الفاتورة لو سمحت؟"
    },
    {
     "en": "I need a pencil.",
     "ar": "أحتاج قلم رصاص."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Can I ___ water, please?",
    "options": [
     "has",
     "have",
     "am"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Can I have the ___, please?",
     "options": [
      "ball",
      "bell",
      "bill"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I need a pencil.",
     "options": [
      "أحتاج قلم رصاص.",
      "أحتاج طبيب.",
      "أحتاج مساعدة."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I need a ___.",
     "options": [
      "doctors",
      "doctor",
      "a doctor"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Can I have, I need"
   },
   {
    "kind": "highlight",
    "text": "Can I have ...? I need ..."
   },
   {
    "kind": "example",
    "en": "Can I have water, please?",
    "ar": "ممكن ماي لو سمحت؟"
   },
   {
    "kind": "example",
    "en": "Can I have the bill, please?",
    "ar": "ممكن الفاتورة لو سمحت؟"
   }
  ],
  "kids": {
   "listTitle": "Can I have ...? I need ...",
   "cards": [
    {
     "emoji": "💧",
     "en": "Can I have water, please?",
     "ar": "ممكن ماي لو سمحت؟",
     "hl": "have"
    },
    {
     "emoji": "🧾",
     "en": "Can I have the bill, please?",
     "ar": "ممكن الفاتورة لو سمحت؟",
     "hl": "bill"
    },
    {
     "emoji": "✏️",
     "en": "I need a pencil.",
     "ar": "أحتاج قلم رصاص.",
     "hl": "need"
    },
    {
     "emoji": "🩺",
     "en": "I need a doctor.",
     "ar": "أحتاج طبيب.",
     "hl": "doctor"
    },
    {
     "emoji": "🙋",
     "en": "I need help.",
     "ar": "أحتاج مساعدة.",
     "hl": "help"
    },
    {
     "emoji": "🔌",
     "en": "Can I have a charger?",
     "ar": "ممكن شاحن؟",
     "hl": "a"
    }
   ],
   "say": "Can I have ...? I need ... Can I have water, please? Can I have the bill, please? I need a pencil. I need a doctor. I need help. Can I have a charger?"
  }
 },
 {
  "id": "haya-18",
  "order": 18,
  "levelId": "l1",
  "titleAr": "وين؟ في وعلى وتحت",
  "titleEn": "Where is: in, on, under",
  "content": {
   "explanationAr": "نسأل Where is ...? يعني وين؟ والجواب: in داخل، on فوق، under تحت.",
   "altExplanationAr": "The book is on the table يعني الكتاب على الطاولة. The cat is under the bed يعني القطة تحت السرير.",
   "example": [
    {
     "en": "The book is on the table.",
     "ar": "الكتاب على الطاولة."
    },
    {
     "en": "The cat is under the bed.",
     "ar": "القطة تحت السرير."
    },
    {
     "en": "The key is in my bag.",
     "ar": "المفتاح في شنطتي."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "The book is ___ the table.",
    "options": [
     "in",
     "under",
     "on"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The cat is ___ the bed.",
     "options": [
      "under",
      "on",
      "in"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "The key is in my bag.",
     "options": [
      "وين جوالي؟",
      "المفتاح في شنطتي.",
      "التفاحة في الصندوق."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ is my phone?",
     "options": [
      "What",
      "Who",
      "Where"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Where is: in, on, under"
   },
   {
    "kind": "highlight",
    "text": "in, on, under"
   },
   {
    "kind": "example",
    "en": "The book is on the table.",
    "ar": "الكتاب على الطاولة."
   },
   {
    "kind": "example",
    "en": "The cat is under the bed.",
    "ar": "القطة تحت السرير."
   }
  ],
  "kids": {
   "listTitle": "in, on, under",
   "cards": [
    {
     "emoji": "📖",
     "en": "The book is on the table.",
     "ar": "الكتاب على الطاولة.",
     "hl": "on"
    },
    {
     "emoji": "🐱",
     "en": "The cat is under the bed.",
     "ar": "القطة تحت السرير.",
     "hl": "under"
    },
    {
     "emoji": "🔑",
     "en": "The key is in my bag.",
     "ar": "المفتاح في شنطتي.",
     "hl": "in"
    },
    {
     "emoji": "❓",
     "en": "Where is my phone?",
     "ar": "وين جوالي؟",
     "hl": "Where"
    },
    {
     "emoji": "🍎",
     "en": "The apple is in the box.",
     "ar": "التفاحة في الصندوق.",
     "hl": "in"
    },
    {
     "emoji": "👟",
     "en": "My shoes are under the chair.",
     "ar": "حذائي تحت الكرسي.",
     "hl": "are"
    }
   ],
   "say": "in, on, under The book is on the table. The cat is under the bed. The key is in my bag. Where is my phone? The apple is in the box. My shoes are under the chair."
  }
 },
 {
  "id": "haya-19",
  "order": 19,
  "levelId": "l1",
  "titleAr": "يومي: روتين",
  "titleEn": "My Day",
  "content": {
   "explanationAr": "نوصف يومنا بالمضارع البسيط: I wake up at six يعني أصحى الساعة ست.",
   "altExplanationAr": "مع He و She نضيف s للفعل: She wakes up at seven.",
   "example": [
    {
     "en": "I wake up at six.",
     "ar": "أصحى الساعة ست."
    },
    {
     "en": "I brush my teeth.",
     "ar": "أفرش أسناني."
    },
    {
     "en": "I eat breakfast.",
     "ar": "آكل الفطور."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ up at six.",
    "options": [
     "wake",
     "wakes",
     "waking"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I ___ my teeth.",
     "options": [
      "brushes",
      "brush",
      "brushing"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I eat breakfast.",
     "options": [
      "أروح المدرسة.",
      "يروح المسجد.",
      "آكل الفطور."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I go ___ school.",
     "options": [
      "to",
      "at",
      "in"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "My Day"
   },
   {
    "kind": "highlight",
    "text": "My Day"
   },
   {
    "kind": "example",
    "en": "I wake up at six.",
    "ar": "أصحى الساعة ست."
   },
   {
    "kind": "example",
    "en": "I brush my teeth.",
    "ar": "أفرش أسناني."
   }
  ],
  "kids": {
   "listTitle": "My Day",
   "cards": [
    {
     "emoji": "⏰",
     "en": "I wake up at six.",
     "ar": "أصحى الساعة ست.",
     "hl": "wake"
    },
    {
     "emoji": "🪥",
     "en": "I brush my teeth.",
     "ar": "أفرش أسناني.",
     "hl": "brush"
    },
    {
     "emoji": "🍳",
     "en": "I eat breakfast.",
     "ar": "آكل الفطور.",
     "hl": "eat"
    },
    {
     "emoji": "🏫",
     "en": "I go to school.",
     "ar": "أروح المدرسة.",
     "hl": "to"
    },
    {
     "emoji": "🕌",
     "en": "He goes to the mosque.",
     "ar": "يروح المسجد.",
     "hl": "goes"
    },
    {
     "emoji": "😴",
     "en": "She sleeps at nine.",
     "ar": "تنام الساعة تسع.",
     "hl": "sleeps"
    }
   ],
   "say": "My Day I wake up at six. I brush my teeth. I eat breakfast. I go to school. He goes to the mosque. She sleeps at nine."
  }
 },
 {
  "id": "haya-20",
  "order": 20,
  "levelId": "l1",
  "titleAr": "أسئلة: وش ووين",
  "titleEn": "What and Where Questions",
  "content": {
   "explanationAr": "نسأل What is ...? يعني وش؟ و Where do you live? يعني وين تسكن؟",
   "altExplanationAr": "What is your name? وش اسمك. Where are you from? من وين انت.",
   "example": [
    {
     "en": "What is your name?",
     "ar": "وش اسمك؟"
    },
    {
     "en": "Where are you from?",
     "ar": "من وين انت؟"
    },
    {
     "en": "Where do you live?",
     "ar": "وين تسكن؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ is your name?",
    "options": [
     "Where",
     "What",
     "Who"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ are you from?",
     "options": [
      "What",
      "When",
      "Where"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Where do you live?",
     "options": [
      "وين تسكن؟",
      "وش لونك المفضل؟",
      "كم الساعة؟"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "What is ___ favourite colour?",
     "options": [
      "you",
      "your",
      "you are"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "What and Where Questions"
   },
   {
    "kind": "highlight",
    "text": "What ...? Where ...?"
   },
   {
    "kind": "example",
    "en": "What is your name?",
    "ar": "وش اسمك؟"
   },
   {
    "kind": "example",
    "en": "Where are you from?",
    "ar": "من وين انت؟"
   }
  ],
  "kids": {
   "listTitle": "What ...? Where ...?",
   "cards": [
    {
     "emoji": "❓",
     "en": "What is your name?",
     "ar": "وش اسمك؟",
     "hl": "What"
    },
    {
     "emoji": "📍",
     "en": "Where are you from?",
     "ar": "من وين انت؟",
     "hl": "Where"
    },
    {
     "emoji": "🏠",
     "en": "Where do you live?",
     "ar": "وين تسكن؟",
     "hl": "live"
    },
    {
     "emoji": "🎨",
     "en": "What is your favourite colour?",
     "ar": "وش لونك المفضل؟",
     "hl": "your"
    },
    {
     "emoji": "🕐",
     "en": "What time is it?",
     "ar": "كم الساعة؟",
     "hl": "time"
    },
    {
     "emoji": "🧕",
     "en": "Who is she?",
     "ar": "مين هي؟",
     "hl": "Who"
    }
   ],
   "say": "What ...? Where ...? What is your name? Where are you from? Where do you live? What is your favourite colour? What time is it? Who is she?"
  }
 },
 {
  "id": "haya-21",
  "order": 21,
  "levelId": "l1",
  "titleAr": "أسوي الحين",
  "titleEn": "I am doing now",
  "content": {
   "explanationAr": "نوصف اللي نسويه الحين: I am reading يعني أنا أقرا الحين. نستخدم am و is و are مع ing.",
   "altExplanationAr": "لا تنسَ am أو is: She is cooking مو She cooking.",
   "example": [
    {
     "en": "I am reading a book.",
     "ar": "أنا أقرا كتاب."
    },
    {
     "en": "She is cooking dinner.",
     "ar": "هي تطبخ العشا."
    },
    {
     "en": "They are playing football.",
     "ar": "هم يلعبون كرة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I am ___ a book.",
    "options": [
     "read",
     "reads",
     "reading"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She ___ cooking dinner.",
     "options": [
      "is",
      "are",
      "am"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "They are playing football.",
     "options": [
      "الجو يمطر.",
      "هم يلعبون كرة.",
      "الرضيع نايم."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "It is ___.",
     "options": [
      "rain",
      "rains",
      "raining"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "I am doing now"
   },
   {
    "kind": "highlight",
    "text": "Now: I am ...ing"
   },
   {
    "kind": "example",
    "en": "I am reading a book.",
    "ar": "أنا أقرا كتاب."
   },
   {
    "kind": "example",
    "en": "She is cooking dinner.",
    "ar": "هي تطبخ العشا."
   }
  ],
  "kids": {
   "listTitle": "Now: I am ...ing",
   "cards": [
    {
     "emoji": "📖",
     "en": "I am reading a book.",
     "ar": "أنا أقرا كتاب.",
     "hl": "reading"
    },
    {
     "emoji": "🍳",
     "en": "She is cooking dinner.",
     "ar": "هي تطبخ العشا.",
     "hl": "is"
    },
    {
     "emoji": "⚽",
     "en": "They are playing football.",
     "ar": "هم يلعبون كرة.",
     "hl": "playing"
    },
    {
     "emoji": "🌧️",
     "en": "It is raining.",
     "ar": "الجو يمطر.",
     "hl": "raining"
    },
    {
     "emoji": "😴",
     "en": "The baby is sleeping.",
     "ar": "الرضيع نايم.",
     "hl": "sleeping"
    },
    {
     "emoji": "📱",
     "en": "He is talking on the phone.",
     "ar": "هو يتكلم بالجوال.",
     "hl": "talking"
    }
   ],
   "say": "Now: I am ...ing I am reading a book. She is cooking dinner. They are playing football. It is raining. The baby is sleeping. He is talking on the phone."
  }
 },
 {
  "id": "haya-22",
  "order": 22,
  "levelId": "l1",
  "titleAr": "كان وكانوا: was و were",
  "titleEn": "was and were",
  "content": {
   "explanationAr": "للماضي نقول was مع I و He و She، و were مع You و We و They.",
   "altExplanationAr": "I am tired اليوم، و I was tired أمس.",
   "example": [
    {
     "en": "I was tired yesterday.",
     "ar": "كنت تعبان أمس."
    },
    {
     "en": "We were at school.",
     "ar": "كنا في المدرسة."
    },
    {
     "en": "It was hot yesterday.",
     "ar": "كان الجو حار أمس."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ tired yesterday.",
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
     "promptEn": "We ___ at school.",
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
      "كانت في البيت.",
      "كانوا مبسوطين.",
      "كان الجو حار أمس."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She ___ at home.",
     "options": [
      "was",
      "were",
      "is"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "was and were"
   },
   {
    "kind": "highlight",
    "text": "was, were"
   },
   {
    "kind": "example",
    "en": "I was tired yesterday.",
    "ar": "كنت تعبان أمس."
   },
   {
    "kind": "example",
    "en": "We were at school.",
    "ar": "كنا في المدرسة."
   }
  ],
  "kids": {
   "listTitle": "was, were",
   "cards": [
    {
     "emoji": "😴",
     "en": "I was tired yesterday.",
     "ar": "كنت تعبان أمس.",
     "hl": "was"
    },
    {
     "emoji": "🏫",
     "en": "We were at school.",
     "ar": "كنا في المدرسة.",
     "hl": "were"
    },
    {
     "emoji": "🔥",
     "en": "It was hot yesterday.",
     "ar": "كان الجو حار أمس.",
     "hl": "was"
    },
    {
     "emoji": "🧕",
     "en": "She was at home.",
     "ar": "كانت في البيت.",
     "hl": "was"
    },
    {
     "emoji": "👫",
     "en": "They were happy.",
     "ar": "كانوا مبسوطين.",
     "hl": "were"
    },
    {
     "emoji": "🏖️",
     "en": "The beach was beautiful.",
     "ar": "البحر كان حلو.",
     "hl": "was"
    }
   ],
   "say": "was, were I was tired yesterday. We were at school. It was hot yesterday. She was at home. They were happy. The beach was beautiful."
  }
 },
 {
  "id": "haya-23",
  "order": 23,
  "levelId": "l1",
  "titleAr": "الماضي: ed",
  "titleEn": "The past with ed",
  "content": {
   "explanationAr": "أغلب الأفعال في الماضي نضيف لها ed: play تصير played، و watch تصير watched.",
   "altExplanationAr": "نضيف yesterday يعني أمس عشان نوضح إنه ماضي.",
   "example": [
    {
     "en": "I played football yesterday.",
     "ar": "لعبت كرة أمس."
    },
    {
     "en": "We watched a film.",
     "ar": "شفنا فيلم."
    },
    {
     "en": "She cooked rice.",
     "ar": "طبخت رز."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ football yesterday.",
    "options": [
     "play",
     "played",
     "plays"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We ___ a film.",
     "options": [
      "watch",
      "watches",
      "watched"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "She cooked rice.",
     "options": [
      "طبخت رز.",
      "اتصل على أمه.",
      "مشوا للحديقة."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He ___ his mother.",
     "options": [
      "call",
      "called",
      "calls"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The past with ed"
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
    "en": "We watched a film.",
    "ar": "شفنا فيلم."
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
     "en": "We watched a film.",
     "ar": "شفنا فيلم.",
     "hl": "watched"
    },
    {
     "emoji": "🧕",
     "en": "She cooked rice.",
     "ar": "طبخت رز.",
     "hl": "cooked"
    },
    {
     "emoji": "📞",
     "en": "He called his mother.",
     "ar": "اتصل على أمه.",
     "hl": "called"
    },
    {
     "emoji": "🚶",
     "en": "They walked to the park.",
     "ar": "مشوا للحديقة.",
     "hl": "walked"
    },
    {
     "emoji": "🧹",
     "en": "I cleaned my room.",
     "ar": "نظفت غرفتي.",
     "hl": "cleaned"
    }
   ],
   "say": "Yesterday: ...ed I played football yesterday. We watched a film. She cooked rice. He called his mother. They walked to the park. I cleaned my room."
  }
 },
 {
  "id": "haya-24",
  "order": 24,
  "levelId": "l1",
  "titleAr": "بسوي: going to و will",
  "titleEn": "going to and will",
  "content": {
   "explanationAr": "للمستقبل نقول I am going to يعني ناوي أسوي: I am going to visit my grandmother.",
   "altExplanationAr": "و will لقرار الحين أو توقع: I will help you.",
   "example": [
    {
     "en": "I am going to visit my grandmother.",
     "ar": "بزور جدتي."
    },
    {
     "en": "We are going to travel.",
     "ar": "بنسافر."
    },
    {
     "en": "I will help you.",
     "ar": "بساعدك."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I am ___ to visit my grandmother.",
    "options": [
     "go",
     "goes",
     "going"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We are going to ___.",
     "options": [
      "travel",
      "travels",
      "travelled"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I will help you.",
     "options": [
      "بتصل عليك بعدين.",
      "بساعدك.",
      "بتمطر بكرة."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I will ___ you later.",
     "options": [
      "calls",
      "called",
      "call"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "going to and will"
   },
   {
    "kind": "highlight",
    "text": "Tomorrow: going to, will"
   },
   {
    "kind": "example",
    "en": "I am going to visit my grandmother.",
    "ar": "بزور جدتي."
   },
   {
    "kind": "example",
    "en": "We are going to travel.",
    "ar": "بنسافر."
   }
  ],
  "kids": {
   "listTitle": "Tomorrow: going to, will",
   "cards": [
    {
     "emoji": "🧕",
     "en": "I am going to visit my grandmother.",
     "ar": "بزور جدتي.",
     "hl": "going"
    },
    {
     "emoji": "✈️",
     "en": "We are going to travel.",
     "ar": "بنسافر.",
     "hl": "travel"
    },
    {
     "emoji": "🙋",
     "en": "I will help you.",
     "ar": "بساعدك.",
     "hl": "will"
    },
    {
     "emoji": "📞",
     "en": "I will call you later.",
     "ar": "بتصل عليك بعدين.",
     "hl": "call"
    },
    {
     "emoji": "🌧️",
     "en": "It will rain tomorrow.",
     "ar": "بتمطر بكرة.",
     "hl": "will"
    },
    {
     "emoji": "📖",
     "en": "She is going to read.",
     "ar": "هي بتقرا.",
     "hl": "read"
    }
   ],
   "say": "Tomorrow: going to, will I am going to visit my grandmother. We are going to travel. I will help you. I will call you later. It will rain tomorrow. She is going to read."
  }
 },
 {
  "id": "haya-25",
  "order": 25,
  "levelId": "l1",
  "titleAr": "نربط الجمل",
  "titleEn": "and, but, because",
  "content": {
   "explanationAr": "نربط جملتين: and يعني «و»، but يعني «بس»، because يعني «لأن».",
   "altExplanationAr": "I am tired because I worked a lot يعني تعبان لأني اشتغلت وايد.",
   "example": [
    {
     "en": "I like apples and bananas.",
     "ar": "أحب التفاح والموز."
    },
    {
     "en": "I like tea but not coffee.",
     "ar": "أحب الشاي بس مو القهوة."
    },
    {
     "en": "I am tired because I worked a lot.",
     "ar": "تعبان لأني اشتغلت وايد."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I like apples ___ bananas.",
    "options": [
     "and",
     "but",
     "because"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I like tea ___ not coffee.",
     "options": [
      "and",
      "but",
      "because"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I am tired because I worked a lot.",
     "options": [
      "الجو بارد بس مشمس.",
      "قعدت في البيت لأني كنت مريض.",
      "تعبان لأني اشتغلت وايد."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "It is cold ___ sunny.",
     "options": [
      "but",
      "and",
      "because"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "and, but, because"
   },
   {
    "kind": "highlight",
    "text": "and, but, because"
   },
   {
    "kind": "example",
    "en": "I like apples and bananas.",
    "ar": "أحب التفاح والموز."
   },
   {
    "kind": "example",
    "en": "I like tea but not coffee.",
    "ar": "أحب الشاي بس مو القهوة."
   }
  ],
  "kids": {
   "listTitle": "and, but, because",
   "cards": [
    {
     "emoji": "🍎",
     "en": "I like apples and bananas.",
     "ar": "أحب التفاح والموز.",
     "hl": "and"
    },
    {
     "emoji": "☕",
     "en": "I like tea but not coffee.",
     "ar": "أحب الشاي بس مو القهوة.",
     "hl": "but"
    },
    {
     "emoji": "😴",
     "en": "I am tired because I worked a lot.",
     "ar": "تعبان لأني اشتغلت وايد.",
     "hl": "because"
    },
    {
     "emoji": "🌧️",
     "en": "It is cold but sunny.",
     "ar": "الجو بارد بس مشمس.",
     "hl": "but"
    },
    {
     "emoji": "🏠",
     "en": "I stayed home because I was sick.",
     "ar": "قعدت في البيت لأني كنت مريض.",
     "hl": "because"
    },
    {
     "emoji": "📖",
     "en": "She reads and writes.",
     "ar": "تقرا وتكتب.",
     "hl": "and"
    }
   ],
   "say": "and, but, because I like apples and bananas. I like tea but not coffee. I am tired because I worked a lot. It is cold but sunny. I stayed home because I was sick. She reads and writes."
  }
 },
 {
  "id": "haya-26",
  "order": 26,
  "levelId": "l1",
  "titleAr": "أوصف شعوري",
  "titleEn": "Talking about feelings",
  "content": {
   "explanationAr": "نقول I feel يعني أحس: I feel happy. ونسأل How do you feel? يعني كيف تحس؟",
   "altExplanationAr": "نستخدم very يعني وايد: I am very happy.",
   "example": [
    {
     "en": "I feel happy today.",
     "ar": "أحس إني مبسوط اليوم."
    },
    {
     "en": "I feel sick.",
     "ar": "أحس إني مريض."
    },
    {
     "en": "She feels worried.",
     "ar": "تحس إنها قلقانة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ happy today.",
    "options": [
     "feels",
     "feel",
     "feeling"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I feel ___.",
     "options": [
      "sock",
      "six",
      "sick"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "She feels worried.",
     "options": [
      "تحس إنها قلقانة.",
      "كيف تحس؟",
      "أنا مبسوط وايد."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ do you feel?",
     "options": [
      "What",
      "How",
      "Who"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Talking about feelings"
   },
   {
    "kind": "highlight",
    "text": "I feel ..."
   },
   {
    "kind": "example",
    "en": "I feel happy today.",
    "ar": "أحس إني مبسوط اليوم."
   },
   {
    "kind": "example",
    "en": "I feel sick.",
    "ar": "أحس إني مريض."
   }
  ],
  "kids": {
   "listTitle": "I feel ...",
   "cards": [
    {
     "emoji": "😊",
     "en": "I feel happy today.",
     "ar": "أحس إني مبسوط اليوم.",
     "hl": "feel"
    },
    {
     "emoji": "🤒",
     "en": "I feel sick.",
     "ar": "أحس إني مريض.",
     "hl": "sick"
    },
    {
     "emoji": "😟",
     "en": "She feels worried.",
     "ar": "تحس إنها قلقانة.",
     "hl": "feels"
    },
    {
     "emoji": "🙂",
     "en": "How do you feel?",
     "ar": "كيف تحس؟",
     "hl": "How"
    },
    {
     "emoji": "😄",
     "en": "I am very happy.",
     "ar": "أنا مبسوط وايد.",
     "hl": "very"
    },
    {
     "emoji": "😢",
     "en": "He is sad because his cat is sick.",
     "ar": "هو حزين لأن قطته مريضة.",
     "hl": "because"
    }
   ],
   "say": "I feel ... I feel happy today. I feel sick. She feels worried. How do you feel? I am very happy. He is sad because his cat is sick."
  }
 },
 {
  "id": "haya-27",
  "order": 27,
  "levelId": "l1",
  "titleAr": "في المحل",
  "titleEn": "In the shop",
  "content": {
   "explanationAr": "جمل للتسوق: How much is this? يعني بكم هذا؟ و I want this one يعني أبي هذا.",
   "altExplanationAr": "لو الشي غالي قل It is too expensive يعني غالي وايد.",
   "example": [
    {
     "en": "How much is this?",
     "ar": "بكم هذا؟"
    },
    {
     "en": "I want this one.",
     "ar": "أبي هذا."
    },
    {
     "en": "It is too expensive.",
     "ar": "غالي وايد."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "How ___ is this?",
    "options": [
     "many",
     "more",
     "much"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I want this ___.",
     "options": [
      "one",
      "on",
      "own"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "It is too expensive.",
     "options": [
      "أقدر أدفع بالبطاقة؟",
      "غالي وايد.",
      "عندك مقاس أكبر؟"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Can I pay ___ card?",
     "options": [
      "with",
      "on",
      "by"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "In the shop"
   },
   {
    "kind": "highlight",
    "text": "In the Shop"
   },
   {
    "kind": "example",
    "en": "How much is this?",
    "ar": "بكم هذا؟"
   },
   {
    "kind": "example",
    "en": "I want this one.",
    "ar": "أبي هذا."
   }
  ],
  "kids": {
   "listTitle": "In the Shop",
   "cards": [
    {
     "emoji": "🏷️",
     "en": "How much is this?",
     "ar": "بكم هذا؟",
     "hl": "much"
    },
    {
     "emoji": "👕",
     "en": "I want this one.",
     "ar": "أبي هذا.",
     "hl": "one"
    },
    {
     "emoji": "💎",
     "en": "It is too expensive.",
     "ar": "غالي وايد.",
     "hl": "expensive"
    },
    {
     "emoji": "💳",
     "en": "Can I pay by card?",
     "ar": "أقدر أدفع بالبطاقة؟",
     "hl": "by"
    },
    {
     "emoji": "📏",
     "en": "Do you have a bigger size?",
     "ar": "عندك مقاس أكبر؟",
     "hl": "bigger"
    },
    {
     "emoji": "🙏",
     "en": "Thank you, that is all.",
     "ar": "شكرًا، بس كذا.",
     "hl": "all"
    }
   ],
   "say": "In the Shop How much is this? I want this one. It is too expensive. Can I pay by card? Do you have a bigger size? Thank you, that is all."
  }
 },
 {
  "id": "haya-28",
  "order": 28,
  "levelId": "l1",
  "titleAr": "في المطعم",
  "titleEn": "In the restaurant",
  "content": {
   "explanationAr": "جمل للمطعم: A table for two, please يعني طاولة لشخصين لو سمحت. و I would like chicken يعني أبي دجاج.",
   "altExplanationAr": "لما تخلص قل Can I have the bill, please?",
   "example": [
    {
     "en": "A table for two, please.",
     "ar": "طاولة لشخصين لو سمحت."
    },
    {
     "en": "I would like chicken.",
     "ar": "أبي دجاج."
    },
    {
     "en": "Can I have some water?",
     "ar": "ممكن شوية ماي؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "A table ___ two, please.",
    "options": [
     "for",
     "to",
     "at"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I ___ like chicken.",
     "options": [
      "will",
      "would",
      "want"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Can I have some water?",
     "options": [
      "الأكل لذيذ.",
      "ممكن أشوف المنيو لو سمحت؟",
      "ممكن شوية ماي؟"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The food is ___.",
     "options": [
      "delicious",
      "delicate",
      "dish"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "In the restaurant"
   },
   {
    "kind": "highlight",
    "text": "In the Restaurant"
   },
   {
    "kind": "example",
    "en": "A table for two, please.",
    "ar": "طاولة لشخصين لو سمحت."
   },
   {
    "kind": "example",
    "en": "I would like chicken.",
    "ar": "أبي دجاج."
   }
  ],
  "kids": {
   "listTitle": "In the Restaurant",
   "cards": [
    {
     "emoji": "🍽️",
     "en": "A table for two, please.",
     "ar": "طاولة لشخصين لو سمحت.",
     "hl": "for"
    },
    {
     "emoji": "🍗",
     "en": "I would like chicken.",
     "ar": "أبي دجاج.",
     "hl": "would"
    },
    {
     "emoji": "💧",
     "en": "Can I have some water?",
     "ar": "ممكن شوية ماي؟",
     "hl": "some"
    },
    {
     "emoji": "😋",
     "en": "The food is delicious.",
     "ar": "الأكل لذيذ.",
     "hl": "delicious"
    },
    {
     "emoji": "📋",
     "en": "Can I see the menu, please?",
     "ar": "ممكن أشوف المنيو لو سمحت؟",
     "hl": "menu"
    },
    {
     "emoji": "🙏",
     "en": "Thank you very much.",
     "ar": "شكرًا جزيلًا.",
     "hl": "much"
    }
   ],
   "say": "In the Restaurant A table for two, please. I would like chicken. Can I have some water? The food is delicious. Can I see the menu, please? Thank you very much."
  }
 },
 {
  "id": "haya-29",
  "order": 29,
  "levelId": "l1",
  "titleAr": "أسأل عن الطريق",
  "titleEn": "Asking for help and directions",
  "content": {
   "explanationAr": "نسأل عن الطريق: Where is the mosque? والجواب: Go straight يعني امشِ سيدا، Turn left يعني لف يسار.",
   "altExplanationAr": "لو ما فهمت قل Can you say that again, please? يعني ممكن تعيد؟",
   "example": [
    {
     "en": "Where is the mosque?",
     "ar": "وين المسجد؟"
    },
    {
     "en": "Go straight.",
     "ar": "امشِ سيدا."
    },
    {
     "en": "Turn left.",
     "ar": "لف يسار."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ is the mosque?",
    "options": [
     "What",
     "Where",
     "When"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Go ___.",
     "options": [
      "street",
      "strong",
      "straight"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Turn left.",
     "options": [
      "لف يسار.",
      "لف يمين عند البنك.",
      "ممكن تعيد لو سمحت؟"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Turn ___ at the bank.",
     "options": [
      "write",
      "right",
      "light"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Asking for help and directions"
   },
   {
    "kind": "highlight",
    "text": "Directions and Help"
   },
   {
    "kind": "example",
    "en": "Where is the mosque?",
    "ar": "وين المسجد؟"
   },
   {
    "kind": "example",
    "en": "Go straight.",
    "ar": "امشِ سيدا."
   }
  ],
  "kids": {
   "listTitle": "Directions and Help",
   "cards": [
    {
     "emoji": "🕌",
     "en": "Where is the mosque?",
     "ar": "وين المسجد؟",
     "hl": "Where"
    },
    {
     "emoji": "⬆️",
     "en": "Go straight.",
     "ar": "امشِ سيدا.",
     "hl": "straight"
    },
    {
     "emoji": "⬅️",
     "en": "Turn left.",
     "ar": "لف يسار.",
     "hl": "left"
    },
    {
     "emoji": "➡️",
     "en": "Turn right at the bank.",
     "ar": "لف يمين عند البنك.",
     "hl": "right"
    },
    {
     "emoji": "🔁",
     "en": "Can you say that again, please?",
     "ar": "ممكن تعيد لو سمحت؟",
     "hl": "again"
    },
    {
     "emoji": "🙋",
     "en": "Excuse me, can you help me?",
     "ar": "لو سمحت، تقدر تساعدني؟",
     "hl": "Excuse"
    }
   ],
   "say": "Directions and Help Where is the mosque? Go straight. Turn left. Turn right at the bank. Can you say that again, please? Excuse me, can you help me?"
  }
 },
 {
  "id": "haya-30",
  "order": 30,
  "levelId": "l1",
  "titleAr": "المراجعة الكبيرة",
  "titleEn": "Big Review",
  "content": {
   "explanationAr": "نراجع أهم الجمل: I can و There is و I want و الماضي والمستقبل.",
   "altExplanationAr": "اقرأ كل جملة بصوت عالي وحاول تقول وحدة عنك انت.",
   "example": [
    {
     "en": "I can swim very well.",
     "ar": "أقدر أسبح زين."
    },
    {
     "en": "There is a park near my house.",
     "ar": "فيه حديقة قريب من بيتي."
    },
    {
     "en": "I would like a cup of tea.",
     "ar": "أبي كوب شاي."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ swim very well.",
    "options": [
     "cans",
     "am",
     "can"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "There ___ a park near my house.",
     "options": [
      "is",
      "are",
      "am"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I would like a cup of tea.",
     "options": [
      "لعبت كرة مع أصحابي.",
      "أبي كوب شاي.",
      "بسافر الأسبوع الجاي."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I ___ football with my friends.",
     "options": [
      "play",
      "plays",
      "played"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Big Review"
   },
   {
    "kind": "highlight",
    "text": "Review: 6 Sentences"
   },
   {
    "kind": "example",
    "en": "I can swim very well.",
    "ar": "أقدر أسبح زين."
   },
   {
    "kind": "example",
    "en": "There is a park near my house.",
    "ar": "فيه حديقة قريب من بيتي."
   }
  ],
  "kids": {
   "listTitle": "Review: 6 Sentences",
   "cards": [
    {
     "emoji": "🏊",
     "en": "I can swim very well.",
     "ar": "أقدر أسبح زين.",
     "hl": "can"
    },
    {
     "emoji": "🌳",
     "en": "There is a park near my house.",
     "ar": "فيه حديقة قريب من بيتي.",
     "hl": "is"
    },
    {
     "emoji": "🍵",
     "en": "I would like a cup of tea.",
     "ar": "أبي كوب شاي.",
     "hl": "cup"
    },
    {
     "emoji": "⚽",
     "en": "I played football with my friends.",
     "ar": "لعبت كرة مع أصحابي.",
     "hl": "played"
    },
    {
     "emoji": "✈️",
     "en": "I am going to travel next week.",
     "ar": "بسافر الأسبوع الجاي.",
     "hl": "going"
    },
    {
     "emoji": "😊",
     "en": "I am happy because I learned a lot.",
     "ar": "أنا مبسوط لأني تعلمت وايد.",
     "hl": "because"
    }
   ],
   "say": "Review: 6 Sentences I can swim very well. There is a park near my house. I would like a cup of tea. I played football with my friends. I am going to travel next week. I am happy because I learned a lot."
  }
 },
 {
  "id": "haya-31",
  "order": 31,
  "levelId": "l2",
  "titleAr": "أعيش وأشتغل: المضارع البسيط",
  "titleEn": "I live, I work",
  "content": {
   "explanationAr": "المضارع البسيط نستخدمه للأشياء اللي نسويها دايم. مع I و you و we و they الفعل يجي بدون تغيير: I live، we work.",
   "altExplanationAr": "I live in Riyadh: أسكن في الرياض. نحكي عن شي ثابت أو عادة.",
   "example": [
    {
     "en": "I live in Riyadh.",
     "ar": "أسكن في الرياض."
    },
    {
     "en": "We work in an office.",
     "ar": "نشتغل في مكتب."
    },
    {
     "en": "They go to school by bus.",
     "ar": "يروحون المدرسة بالباص."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ in Riyadh.",
    "options": [
     "live",
     "lives",
     "living"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We ___ in an office.",
     "options": [
      "works",
      "work",
      "working"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "They go to school by bus.",
     "options": [
      "تشرب حليب كل صباح.",
      "ندرس إنجليزي يوم الاثنين.",
      "يروحون المدرسة بالباص."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "You ___ milk every morning.",
     "options": [
      "drink",
      "drinks",
      "drinking"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "I live, I work"
   },
   {
    "kind": "highlight",
    "text": "Present Simple"
   },
   {
    "kind": "example",
    "en": "I live in Riyadh.",
    "ar": "أسكن في الرياض."
   },
   {
    "kind": "example",
    "en": "We work in an office.",
    "ar": "نشتغل في مكتب."
   }
  ],
  "kids": {
   "listTitle": "Present Simple",
   "cards": [
    {
     "emoji": "🏙️",
     "en": "I live in Riyadh.",
     "ar": "أسكن في الرياض.",
     "hl": "live"
    },
    {
     "emoji": "🏢",
     "en": "We work in an office.",
     "ar": "نشتغل في مكتب.",
     "hl": "work"
    },
    {
     "emoji": "🚌",
     "en": "They go to school by bus.",
     "ar": "يروحون المدرسة بالباص.",
     "hl": "go"
    },
    {
     "emoji": "🥛",
     "en": "You drink milk every morning.",
     "ar": "تشرب حليب كل صباح.",
     "hl": "drink"
    },
    {
     "emoji": "📚",
     "en": "We study English on Monday.",
     "ar": "ندرس إنجليزي يوم الاثنين.",
     "hl": "study"
    },
    {
     "emoji": "🕌",
     "en": "They pray in the mosque.",
     "ar": "يصلّون في المسجد.",
     "hl": "pray"
    }
   ],
   "say": "Present Simple I live in Riyadh. We work in an office. They go to school by bus. You drink milk every morning. We study English on Monday. They pray in the mosque."
  }
 },
 {
  "id": "haya-32",
  "order": 32,
  "levelId": "l2",
  "titleAr": "هو يشتغل: s مع he و she",
  "titleEn": "He works, She works",
  "content": {
   "explanationAr": "مع he و she و it نضيف s للفعل: he works، she plays، it rains. هذي أهم قاعدة في المضارع البسيط.",
   "altExplanationAr": "I work لكن he works. لا تنسى الـ s!",
   "example": [
    {
     "en": "He works in a hospital.",
     "ar": "يشتغل في مستشفى."
    },
    {
     "en": "She plays the piano.",
     "ar": "تعزف بيانو."
    },
    {
     "en": "It rains a lot in winter.",
     "ar": "تمطر كثير في الشتاء."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "He ___ in a hospital.",
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
     "promptEn": "She ___ the piano.",
     "options": [
      "play",
      "playing",
      "plays"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "It rains a lot in winter.",
     "options": [
      "تمطر كثير في الشتاء.",
      "أبوي يطبخ أيام الجمعة.",
      "سارة تقرأ قبل النوم."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "My dad ___ on Fridays.",
     "options": [
      "cook",
      "cooks",
      "cooking"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "He works, She works"
   },
   {
    "kind": "highlight",
    "text": "he/she + s"
   },
   {
    "kind": "example",
    "en": "He works in a hospital.",
    "ar": "يشتغل في مستشفى."
   },
   {
    "kind": "example",
    "en": "She plays the piano.",
    "ar": "تعزف بيانو."
   }
  ],
  "kids": {
   "listTitle": "he/she + s",
   "cards": [
    {
     "emoji": "👨‍⚕️",
     "en": "He works in a hospital.",
     "ar": "يشتغل في مستشفى.",
     "hl": "works"
    },
    {
     "emoji": "🎹",
     "en": "She plays the piano.",
     "ar": "تعزف بيانو.",
     "hl": "plays"
    },
    {
     "emoji": "🌧️",
     "en": "It rains a lot in winter.",
     "ar": "تمطر كثير في الشتاء.",
     "hl": "rains"
    },
    {
     "emoji": "🧑‍🍳",
     "en": "My dad cooks on Fridays.",
     "ar": "أبوي يطبخ أيام الجمعة.",
     "hl": "cooks"
    },
    {
     "emoji": "📖",
     "en": "Sara reads before bed.",
     "ar": "سارة تقرأ قبل النوم.",
     "hl": "reads"
    },
    {
     "emoji": "🐕",
     "en": "The dog sleeps in the garden.",
     "ar": "الكلب ينام في الحديقة.",
     "hl": "sleeps"
    }
   ],
   "say": "he/she + s He works in a hospital. She plays the piano. It rains a lot in winter. My dad cooks on Fridays. Sara reads before bed. The dog sleeps in the garden."
  }
 },
 {
  "id": "haya-33",
  "order": 33,
  "levelId": "l2",
  "titleAr": "es و ies مع he و she",
  "titleEn": "goes, watches, studies",
  "content": {
   "explanationAr": "بعض الأفعال تاخذ es: go ← goes، watch ← watches، wash ← washes. والفعل اللي ينتهي بـ y بعد حرف ساكن يصير ies: study ← studies.",
   "altExplanationAr": "She watches TV. He studies hard.",
   "example": [
    {
     "en": "She goes to school at seven.",
     "ar": "تروح المدرسة الساعة سبع."
    },
    {
     "en": "He watches cartoons.",
     "ar": "يشوف كرتون."
    },
    {
     "en": "Mom washes the dishes.",
     "ar": "ماما تغسل الصحون."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "She ___ to school at seven.",
    "options": [
     "go",
     "gos",
     "goes"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He ___ cartoons.",
     "options": [
      "watches",
      "watch",
      "watchs"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Mom washes the dishes.",
     "options": [
      "أختي تدرس رياضيات.",
      "ماما تغسل الصحون.",
      "النحلة تطير من وردة لوردة."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "My sister ___ maths.",
     "options": [
      "study",
      "studys",
      "studies"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "goes, watches, studies"
   },
   {
    "kind": "highlight",
    "text": "es · ies"
   },
   {
    "kind": "example",
    "en": "She goes to school at seven.",
    "ar": "تروح المدرسة الساعة سبع."
   },
   {
    "kind": "example",
    "en": "He watches cartoons.",
    "ar": "يشوف كرتون."
   }
  ],
  "kids": {
   "listTitle": "es · ies",
   "cards": [
    {
     "emoji": "🏫",
     "en": "She goes to school at seven.",
     "ar": "تروح المدرسة الساعة سبع.",
     "hl": "goes"
    },
    {
     "emoji": "📺",
     "en": "He watches cartoons.",
     "ar": "يشوف كرتون.",
     "hl": "watches"
    },
    {
     "emoji": "🧼",
     "en": "Mom washes the dishes.",
     "ar": "ماما تغسل الصحون.",
     "hl": "washes"
    },
    {
     "emoji": "✏️",
     "en": "My sister studies maths.",
     "ar": "أختي تدرس رياضيات.",
     "hl": "studies"
    },
    {
     "emoji": "🐝",
     "en": "A bee flies from flower to flower.",
     "ar": "النحلة تطير من وردة لوردة.",
     "hl": "flies"
    },
    {
     "emoji": "🍳",
     "en": "Dad fixes breakfast on Saturday.",
     "ar": "أبوي يجهّز الفطور يوم السبت.",
     "hl": "fixes"
    }
   ],
   "say": "es · ies She goes to school at seven. He watches cartoons. Mom washes the dishes. My sister studies maths. A bee flies from flower to flower. Dad fixes breakfast on Saturday."
  }
 },
 {
  "id": "haya-34",
  "order": 34,
  "levelId": "l2",
  "titleAr": "has و does",
  "titleEn": "He has, She does",
  "content": {
   "explanationAr": "الفعل have مع he و she يصير has، والفعل do يصير does. هذي أفعال شاذة لازم نحفظها.",
   "altExplanationAr": "I have ← he has. I do ← she does.",
   "example": [
    {
     "en": "My brother has a new bike.",
     "ar": "أخوي عنده سيكل جديد."
    },
    {
     "en": "She does her homework after lunch.",
     "ar": "تسوي واجبها بعد الغدا."
    },
    {
     "en": "Ali has short hair.",
     "ar": "علي شعره قصير."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "My brother ___ a new bike.",
    "options": [
     "has",
     "have",
     "haves"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She ___ her homework after lunch.",
     "options": [
      "do",
      "does",
      "dos"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Ali has short hair.",
     "options": [
      "يسوي المقاضي يوم الخميس.",
      "بيتنا فيه ثلاث غرف نوم.",
      "علي شعره قصير."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He ___ the shopping on Thursday.",
     "options": [
      "does",
      "do",
      "make"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "He has, She does"
   },
   {
    "kind": "highlight",
    "text": "has · does"
   },
   {
    "kind": "example",
    "en": "My brother has a new bike.",
    "ar": "أخوي عنده سيكل جديد."
   },
   {
    "kind": "example",
    "en": "She does her homework after lunch.",
    "ar": "تسوي واجبها بعد الغدا."
   }
  ],
  "kids": {
   "listTitle": "has · does",
   "cards": [
    {
     "emoji": "🚲",
     "en": "My brother has a new bike.",
     "ar": "أخوي عنده سيكل جديد.",
     "hl": "has"
    },
    {
     "emoji": "📝",
     "en": "She does her homework after lunch.",
     "ar": "تسوي واجبها بعد الغدا.",
     "hl": "does"
    },
    {
     "emoji": "🧑‍🦱",
     "en": "Ali has short hair.",
     "ar": "علي شعره قصير.",
     "hl": "has"
    },
    {
     "emoji": "🧹",
     "en": "He does the shopping on Thursday.",
     "ar": "يسوي المقاضي يوم الخميس.",
     "hl": "does"
    },
    {
     "emoji": "🏠",
     "en": "Our house has three bedrooms.",
     "ar": "بيتنا فيه ثلاث غرف نوم.",
     "hl": "has"
    },
    {
     "emoji": "🏋️",
     "en": "My uncle does sport every day.",
     "ar": "عمي يمارس رياضة كل يوم.",
     "hl": "does"
    }
   ],
   "say": "has · does My brother has a new bike. She does her homework after lunch. Ali has short hair. He does the shopping on Thursday. Our house has three bedrooms. My uncle does sport every day."
  }
 },
 {
  "id": "haya-35",
  "order": 35,
  "levelId": "l2",
  "titleAr": "ما أسوي: don't",
  "titleEn": "I don't",
  "content": {
   "explanationAr": "للنفي في المضارع مع I و you و we و they نقول don't قبل الفعل: I don't eat meat.",
   "altExplanationAr": "don't: do not. I don't know: ما أدري.",
   "example": [
    {
     "en": "I don't eat fish.",
     "ar": "ما آكل سمك."
    },
    {
     "en": "I don't know the answer.",
     "ar": "ما أعرف الجواب."
    },
    {
     "en": "We don't have a big car.",
     "ar": "ما عندنا سيارة كبيرة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ eat fish.",
    "options": [
     "doesn't",
     "don't",
     "not"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I ___ know the answer.",
     "options": [
      "doesn't",
      "isn't",
      "don't"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "We don't have a big car.",
     "options": [
      "ما عندنا سيارة كبيرة.",
      "ما يشربون قهوة بالليل.",
      "ما تحتاج جوالك في الفصل."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "They ___ drink coffee at night.",
     "options": [
      "doesn't",
      "don't",
      "isn't"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "I don't"
   },
   {
    "kind": "highlight",
    "text": "don't"
   },
   {
    "kind": "example",
    "en": "I don't eat fish.",
    "ar": "ما آكل سمك."
   },
   {
    "kind": "example",
    "en": "I don't know the answer.",
    "ar": "ما أعرف الجواب."
   }
  ],
  "kids": {
   "listTitle": "don't",
   "cards": [
    {
     "emoji": "🙅",
     "en": "I don't eat fish.",
     "ar": "ما آكل سمك.",
     "hl": "don't"
    },
    {
     "emoji": "🤷",
     "en": "I don't know the answer.",
     "ar": "ما أعرف الجواب.",
     "hl": "don't"
    },
    {
     "emoji": "🚗",
     "en": "We don't have a big car.",
     "ar": "ما عندنا سيارة كبيرة.",
     "hl": "don't"
    },
    {
     "emoji": "☕",
     "en": "They don't drink coffee at night.",
     "ar": "ما يشربون قهوة بالليل.",
     "hl": "don't"
    },
    {
     "emoji": "📵",
     "en": "You don't need your phone in class.",
     "ar": "ما تحتاج جوالك في الفصل.",
     "hl": "don't"
    },
    {
     "emoji": "🌙",
     "en": "We don't go out late.",
     "ar": "ما نطلع متأخر.",
     "hl": "don't"
    }
   ],
   "say": "don't I don't eat fish. I don't know the answer. We don't have a big car. They don't drink coffee at night. You don't need your phone in class. We don't go out late."
  }
 },
 {
  "id": "haya-36",
  "order": 36,
  "levelId": "l2",
  "titleAr": "ما يسوي: doesn't",
  "titleEn": "He doesn't",
  "content": {
   "explanationAr": "مع he و she و it نقول doesn't، والفعل يرجع بدون s: She doesn't like milk (مو likes).",
   "altExplanationAr": "doesn't: does not. He doesn't work on Friday.",
   "example": [
    {
     "en": "She doesn't like milk.",
     "ar": "ما تحب الحليب."
    },
    {
     "en": "He doesn't work on Friday.",
     "ar": "ما يشتغل يوم الجمعة."
    },
    {
     "en": "The cat doesn't eat vegetables.",
     "ar": "القطة ما تاكل خضار."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "She ___ like milk.",
    "options": [
     "don't",
     "isn't",
     "doesn't"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He ___ work on Friday.",
     "options": [
      "doesn't",
      "don't",
      "isn't"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "The cat doesn't eat vegetables.",
     "options": [
      "ماما ما تسوق بالليل.",
      "القطة ما تاكل خضار.",
      "ما تمطر كثير في الصيف."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "My mom ___ drive at night.",
     "options": [
      "don't",
      "isn't",
      "doesn't"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "He doesn't"
   },
   {
    "kind": "highlight",
    "text": "doesn't"
   },
   {
    "kind": "example",
    "en": "She doesn't like milk.",
    "ar": "ما تحب الحليب."
   },
   {
    "kind": "example",
    "en": "He doesn't work on Friday.",
    "ar": "ما يشتغل يوم الجمعة."
   }
  ],
  "kids": {
   "listTitle": "doesn't",
   "cards": [
    {
     "emoji": "🥛",
     "en": "She doesn't like milk.",
     "ar": "ما تحب الحليب.",
     "hl": "doesn't"
    },
    {
     "emoji": "🏖️",
     "en": "He doesn't work on Friday.",
     "ar": "ما يشتغل يوم الجمعة.",
     "hl": "doesn't"
    },
    {
     "emoji": "🐈",
     "en": "The cat doesn't eat vegetables.",
     "ar": "القطة ما تاكل خضار.",
     "hl": "doesn't"
    },
    {
     "emoji": "🚙",
     "en": "My mom doesn't drive at night.",
     "ar": "ماما ما تسوق بالليل.",
     "hl": "doesn't"
    },
    {
     "emoji": "🌵",
     "en": "It doesn't rain much in summer.",
     "ar": "ما تمطر كثير في الصيف.",
     "hl": "doesn't"
    },
    {
     "emoji": "📱",
     "en": "Grandpa doesn't use a smartphone.",
     "ar": "جدي ما يستخدم جوال ذكي.",
     "hl": "doesn't"
    }
   ],
   "say": "doesn't She doesn't like milk. He doesn't work on Friday. The cat doesn't eat vegetables. My mom doesn't drive at night. It doesn't rain much in summer. Grandpa doesn't use a smartphone."
  }
 },
 {
  "id": "haya-37",
  "order": 37,
  "levelId": "l2",
  "titleAr": "هل أنت؟ Do you",
  "titleEn": "Do you...?",
  "content": {
   "explanationAr": "نسأل في المضارع بـ Do في البداية مع you و we و they: Do you like football? Do they live here?",
   "altExplanationAr": "Do + الشخص + الفعل + ؟",
   "example": [
    {
     "en": "Do you play football?",
     "ar": "تلعب كورة؟"
    },
    {
     "en": "Do they live near you?",
     "ar": "يسكنون قريب منك؟"
    },
    {
     "en": "Do you eat breakfast every day?",
     "ar": "تفطر كل يوم؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ you play football?",
    "options": [
     "Do",
     "Does",
     "Are"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ they live near you?",
     "options": [
      "Does",
      "Do",
      "Are"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Do you eat breakfast every day?",
     "options": [
      "عندنا إنجليزي اليوم؟",
      "أصحابك يحبون ألعاب الفيديو؟",
      "تفطر كل يوم؟"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ we have English today?",
     "options": [
      "Do",
      "Does",
      "Are"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Do you...?"
   },
   {
    "kind": "highlight",
    "text": "Do you"
   },
   {
    "kind": "example",
    "en": "Do you play football?",
    "ar": "تلعب كورة؟"
   },
   {
    "kind": "example",
    "en": "Do they live near you?",
    "ar": "يسكنون قريب منك؟"
   }
  ],
  "kids": {
   "listTitle": "Do you",
   "cards": [
    {
     "emoji": "⚽",
     "en": "Do you play football?",
     "ar": "تلعب كورة؟",
     "hl": "Do"
    },
    {
     "emoji": "🏡",
     "en": "Do they live near you?",
     "ar": "يسكنون قريب منك؟",
     "hl": "Do"
    },
    {
     "emoji": "🥗",
     "en": "Do you eat breakfast every day?",
     "ar": "تفطر كل يوم؟",
     "hl": "Do"
    },
    {
     "emoji": "🗣️",
     "en": "Do we have English today?",
     "ar": "عندنا إنجليزي اليوم؟",
     "hl": "Do"
    },
    {
     "emoji": "🎮",
     "en": "Do your friends like video games?",
     "ar": "أصحابك يحبون ألعاب الفيديو؟",
     "hl": "Do"
    },
    {
     "emoji": "🧭",
     "en": "Do you know the way?",
     "ar": "تعرف الطريق؟",
     "hl": "Do"
    }
   ],
   "say": "Do you Do you play football? Do they live near you? Do you eat breakfast every day? Do we have English today? Do your friends like video games? Do you know the way?"
  }
 },
 {
  "id": "haya-38",
  "order": 38,
  "levelId": "l2",
  "titleAr": "هل هو؟ Does she",
  "titleEn": "Does she...?",
  "content": {
   "explanationAr": "مع he و she و it نسأل بـ Does، والفعل يرجع بدون s: Does she speak English?",
   "altExplanationAr": "Does he work here? مو Does he works.",
   "example": [
    {
     "en": "Does she speak English?",
     "ar": "تتكلم إنجليزي؟"
    },
    {
     "en": "Does he work here?",
     "ar": "يشتغل هنا؟"
    },
    {
     "en": "Does the bus stop here?",
     "ar": "الباص يوقف هنا؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ she speak English?",
    "options": [
     "Do",
     "Does",
     "Is"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ he work here?",
     "options": [
      "Do",
      "Is",
      "Does"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Does the bus stop here?",
     "options": [
      "الباص يوقف هنا؟",
      "أخوك يحب البيتزا؟",
      "البيبي ينام زين؟"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ your brother like pizza?",
     "options": [
      "Do",
      "Does",
      "Is"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Does she...?"
   },
   {
    "kind": "highlight",
    "text": "Does"
   },
   {
    "kind": "example",
    "en": "Does she speak English?",
    "ar": "تتكلم إنجليزي؟"
   },
   {
    "kind": "example",
    "en": "Does he work here?",
    "ar": "يشتغل هنا؟"
   }
  ],
  "kids": {
   "listTitle": "Does",
   "cards": [
    {
     "emoji": "🗣️",
     "en": "Does she speak English?",
     "ar": "تتكلم إنجليزي؟",
     "hl": "Does"
    },
    {
     "emoji": "🏢",
     "en": "Does he work here?",
     "ar": "يشتغل هنا؟",
     "hl": "Does"
    },
    {
     "emoji": "🚌",
     "en": "Does the bus stop here?",
     "ar": "الباص يوقف هنا؟",
     "hl": "Does"
    },
    {
     "emoji": "🍕",
     "en": "Does your brother like pizza?",
     "ar": "أخوك يحب البيتزا؟",
     "hl": "Does"
    },
    {
     "emoji": "🛏️",
     "en": "Does the baby sleep well?",
     "ar": "البيبي ينام زين؟",
     "hl": "Does"
    },
    {
     "emoji": "🏊",
     "en": "Does Noura swim every week?",
     "ar": "نورة تسبح كل أسبوع؟",
     "hl": "Does"
    }
   ],
   "say": "Does Does she speak English? Does he work here? Does the bus stop here? Does your brother like pizza? Does the baby sleep well? Does Noura swim every week?"
  }
 },
 {
  "id": "haya-39",
  "order": 39,
  "levelId": "l2",
  "titleAr": "الأجوبة القصيرة",
  "titleEn": "Short Answers",
  "content": {
   "explanationAr": "نجاوب بسرعة: Yes, I do. No, I don't. Yes, she does. No, he doesn't. ما نكرر الفعل كله.",
   "altExplanationAr": "Do you like tea? Yes, I do.",
   "example": [
    {
     "en": "Do you like tea? Yes, I do.",
     "ar": "تحب الشاي؟ إيه، أحبه."
    },
    {
     "en": "Do you have a pet? No, I don't.",
     "ar": "عندك حيوان أليف؟ لا، ما عندي."
    },
    {
     "en": "Does she cook? Yes, she does.",
     "ar": "هي تطبخ؟ إيه، تطبخ."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Do you like tea? Yes, I ___.",
    "options": [
     "does",
     "am",
     "do"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Do you have a pet? No, I ___.",
     "options": [
      "don't",
      "doesn't",
      "not"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Does she cook? Yes, she does.",
     "options": [
      "هو يسوق؟ لا، ما يسوق.",
      "هي تطبخ؟ إيه، تطبخ.",
      "يمشون للمدرسة؟ إيه، يمشون."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Does he drive? No, he ___.",
     "options": [
      "don't",
      "isn't",
      "doesn't"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Short Answers"
   },
   {
    "kind": "highlight",
    "text": "Yes, I do"
   },
   {
    "kind": "example",
    "en": "Do you like tea? Yes, I do.",
    "ar": "تحب الشاي؟ إيه، أحبه."
   },
   {
    "kind": "example",
    "en": "Do you have a pet? No, I don't.",
    "ar": "عندك حيوان أليف؟ لا، ما عندي."
   }
  ],
  "kids": {
   "listTitle": "Yes, I do",
   "cards": [
    {
     "emoji": "👍",
     "en": "Do you like tea? Yes, I do.",
     "ar": "تحب الشاي؟ إيه، أحبه.",
     "hl": "do"
    },
    {
     "emoji": "👎",
     "en": "Do you have a pet? No, I don't.",
     "ar": "عندك حيوان أليف؟ لا، ما عندي.",
     "hl": "don't"
    },
    {
     "emoji": "🙂",
     "en": "Does she cook? Yes, she does.",
     "ar": "هي تطبخ؟ إيه، تطبخ.",
     "hl": "does"
    },
    {
     "emoji": "🙃",
     "en": "Does he drive? No, he doesn't.",
     "ar": "هو يسوق؟ لا، ما يسوق.",
     "hl": "doesn't"
    },
    {
     "emoji": "🎒",
     "en": "Do they walk to school? Yes, they do.",
     "ar": "يمشون للمدرسة؟ إيه، يمشون.",
     "hl": "do"
    },
    {
     "emoji": "🥶",
     "en": "Do we need jackets? No, we don't.",
     "ar": "نحتاج جاكيتات؟ لا، ما نحتاج.",
     "hl": "don't"
    }
   ],
   "say": "Yes, I do Do you like tea? Yes, I do. Do you have a pet? No, I don't. Does she cook? Yes, she does. Does he drive? No, he doesn't. Do they walk to school? Yes, they do. Do we need jackets? No, we don't."
  }
 },
 {
  "id": "haya-40",
  "order": 40,
  "levelId": "l2",
  "titleAr": "دايمًا وأحيانًا وأبدًا",
  "titleEn": "Always, Sometimes, Never",
  "content": {
   "explanationAr": "كلمات التكرار: always دايمًا، usually غالبًا، often كثير، sometimes أحيانًا، never أبدًا. تجي قبل الفعل: I always pray.",
   "altExplanationAr": "She never drinks soda: ما تشرب غازيات أبدًا.",
   "example": [
    {
     "en": "We always pray on time.",
     "ar": "دايمًا نصلي في وقتها."
    },
    {
     "en": "I usually walk to work.",
     "ar": "غالبًا أمشي للدوام."
    },
    {
     "en": "We often watch films at home.",
     "ar": "كثير نشوف أفلام في البيت."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "We ___ pray on time.",
    "options": [
     "always",
     "ever",
     "soon"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I ___ walk to work.",
     "options": [
      "ever",
      "usually",
      "soon"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "We often watch films at home.",
     "options": [
      "أحيانًا آكل وجبات سريعة.",
      "ما تشرب غازيات أبدًا.",
      "كثير نشوف أفلام في البيت."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I ___ eat fast food.",
     "options": [
      "sometimes",
      "ever",
      "soon"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Always, Sometimes, Never"
   },
   {
    "kind": "highlight",
    "text": "Frequency words"
   },
   {
    "kind": "example",
    "en": "We always pray on time.",
    "ar": "دايمًا نصلي في وقتها."
   },
   {
    "kind": "example",
    "en": "I usually walk to work.",
    "ar": "غالبًا أمشي للدوام."
   }
  ],
  "kids": {
   "listTitle": "Frequency words",
   "cards": [
    {
     "emoji": "🕋",
     "en": "We always pray on time.",
     "ar": "دايمًا نصلي في وقتها.",
     "hl": "always"
    },
    {
     "emoji": "🚶",
     "en": "I usually walk to work.",
     "ar": "غالبًا أمشي للدوام.",
     "hl": "usually"
    },
    {
     "emoji": "🍿",
     "en": "We often watch films at home.",
     "ar": "كثير نشوف أفلام في البيت.",
     "hl": "often"
    },
    {
     "emoji": "🍔",
     "en": "I sometimes eat fast food.",
     "ar": "أحيانًا آكل وجبات سريعة.",
     "hl": "sometimes"
    },
    {
     "emoji": "🥤",
     "en": "She never drinks soda.",
     "ar": "ما تشرب غازيات أبدًا.",
     "hl": "never"
    },
    {
     "emoji": "⏰",
     "en": "He is always late.",
     "ar": "هو دايمًا متأخر.",
     "hl": "always"
    }
   ],
   "say": "Frequency words We always pray on time. I usually walk to work. We often watch films at home. I sometimes eat fast food. She never drinks soda. He is always late."
  }
 },
 {
  "id": "haya-41",
  "order": 41,
  "levelId": "l2",
  "titleAr": "كم مرة؟ How often",
  "titleEn": "How often...?",
  "content": {
   "explanationAr": "نسأل How often عن عدد المرات، ونجاوب: every day كل يوم، once a week مرة بالأسبوع، twice a month مرتين بالشهر.",
   "altExplanationAr": "How often do you go to the gym? Twice a week.",
   "example": [
    {
     "en": "How often do you go to the gym?",
     "ar": "كم مرة تروح النادي؟"
    },
    {
     "en": "I go twice a week.",
     "ar": "أروح مرتين بالأسبوع."
    },
    {
     "en": "We visit Grandma once a week.",
     "ar": "نزور جدتي مرة بالأسبوع."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "How ___ do you go to the gym?",
    "options": [
     "much",
     "often",
     "many"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I go ___ a week.",
     "options": [
      "two",
      "second",
      "twice"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "We visit Grandma once a week.",
     "options": [
      "نزور جدتي مرة بالأسبوع.",
      "أقص شعري مرة بالشهر.",
      "فرّش أسنانك مرتين باليوم."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I cut my hair once a ___.",
     "options": [
      "monthly",
      "month",
      "months"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "How often...?"
   },
   {
    "kind": "highlight",
    "text": "How often"
   },
   {
    "kind": "example",
    "en": "How often do you go to the gym?",
    "ar": "كم مرة تروح النادي؟"
   },
   {
    "kind": "example",
    "en": "I go twice a week.",
    "ar": "أروح مرتين بالأسبوع."
   }
  ],
  "kids": {
   "listTitle": "How often",
   "cards": [
    {
     "emoji": "🏋️",
     "en": "How often do you go to the gym?",
     "ar": "كم مرة تروح النادي؟",
     "hl": "often"
    },
    {
     "emoji": "2️⃣",
     "en": "I go twice a week.",
     "ar": "أروح مرتين بالأسبوع.",
     "hl": "twice"
    },
    {
     "emoji": "1️⃣",
     "en": "We visit Grandma once a week.",
     "ar": "نزور جدتي مرة بالأسبوع.",
     "hl": "once"
    },
    {
     "emoji": "💇",
     "en": "I cut my hair once a month.",
     "ar": "أقص شعري مرة بالشهر.",
     "hl": "month"
    },
    {
     "emoji": "🦷",
     "en": "Brush your teeth twice a day.",
     "ar": "فرّش أسنانك مرتين باليوم.",
     "hl": "day"
    },
    {
     "emoji": "📆",
     "en": "How often does she call you?",
     "ar": "كم مرة تتصل عليك؟",
     "hl": "often"
    }
   ],
   "say": "How often How often do you go to the gym? I go twice a week. We visit Grandma once a week. I cut my hair once a month. Brush your teeth twice a day. How often does she call you?"
  }
 },
 {
  "id": "haya-42",
  "order": 42,
  "levelId": "l2",
  "titleAr": "متى؟ What time",
  "titleEn": "What time...?",
  "content": {
   "explanationAr": "نسأل عن الساعة بـ What time، ونجاوب بـ at: What time do you wake up? At six.",
   "altExplanationAr": "What time does the shop open? At nine.",
   "example": [
    {
     "en": "What time do you wake up?",
     "ar": "متى تصحى؟"
    },
    {
     "en": "I wake up at half past five.",
     "ar": "أصحى الساعة خمس ونص."
    },
    {
     "en": "What time does the shop open?",
     "ar": "متى يفتح المحل؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "What ___ do you wake up?",
    "options": [
     "hour",
     "clock",
     "time"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I wake up ___ half past five.",
     "options": [
      "at",
      "on",
      "in"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "What time does the shop open?",
     "options": [
      "يفتح الساعة تسع.",
      "متى يفتح المحل؟",
      "نتعشى الساعة ثمان."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "It ___ at nine.",
     "options": [
      "open",
      "opening",
      "opens"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "What time...?"
   },
   {
    "kind": "highlight",
    "text": "What time"
   },
   {
    "kind": "example",
    "en": "What time do you wake up?",
    "ar": "متى تصحى؟"
   },
   {
    "kind": "example",
    "en": "I wake up at half past five.",
    "ar": "أصحى الساعة خمس ونص."
   }
  ],
  "kids": {
   "listTitle": "What time",
   "cards": [
    {
     "emoji": "⏰",
     "en": "What time do you wake up?",
     "ar": "متى تصحى؟",
     "hl": "time"
    },
    {
     "emoji": "🌅",
     "en": "I wake up at half past five.",
     "ar": "أصحى الساعة خمس ونص.",
     "hl": "at"
    },
    {
     "emoji": "🏪",
     "en": "What time does the shop open?",
     "ar": "متى يفتح المحل؟",
     "hl": "does"
    },
    {
     "emoji": "🕘",
     "en": "It opens at nine.",
     "ar": "يفتح الساعة تسع.",
     "hl": "opens"
    },
    {
     "emoji": "🍽️",
     "en": "We have dinner at eight.",
     "ar": "نتعشى الساعة ثمان.",
     "hl": "at"
    },
    {
     "emoji": "🛌",
     "en": "What time do the kids go to bed?",
     "ar": "متى ينام الأطفال؟",
     "hl": "go"
    }
   ],
   "say": "What time What time do you wake up? I wake up at half past five. What time does the shop open? It opens at nine. We have dinner at eight. What time do the kids go to bed?"
  }
 },
 {
  "id": "haya-43",
  "order": 43,
  "levelId": "l2",
  "titleAr": "مين؟ Who",
  "titleEn": "Who...?",
  "content": {
   "explanationAr": "نسأل عن الشخص بـ Who: Who is that man? Who lives here?",
   "altExplanationAr": "Who is your best friend?: مين أعز صديق لك؟",
   "example": [
    {
     "en": "Who is that man?",
     "ar": "مين هذاك الرجّال؟"
    },
    {
     "en": "Who is your best friend?",
     "ar": "مين أعز صديق لك؟"
    },
    {
     "en": "Who lives in this house?",
     "ar": "مين ساكن في هالبيت؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ is that man?",
    "options": [
     "Who",
     "What",
     "Where"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ is your best friend?",
     "options": [
      "Which",
      "Who",
      "When"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Who lives in this house?",
     "options": [
      "مين سوّى هالكيكة؟",
      "مين على التلفون؟",
      "مين ساكن في هالبيت؟"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ made this cake?",
     "options": [
      "Who",
      "Where",
      "When"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Who...?"
   },
   {
    "kind": "highlight",
    "text": "Who"
   },
   {
    "kind": "example",
    "en": "Who is that man?",
    "ar": "مين هذاك الرجّال؟"
   },
   {
    "kind": "example",
    "en": "Who is your best friend?",
    "ar": "مين أعز صديق لك؟"
   }
  ],
  "kids": {
   "listTitle": "Who",
   "cards": [
    {
     "emoji": "🧔",
     "en": "Who is that man?",
     "ar": "مين هذاك الرجّال؟",
     "hl": "Who"
    },
    {
     "emoji": "🤝",
     "en": "Who is your best friend?",
     "ar": "مين أعز صديق لك؟",
     "hl": "Who"
    },
    {
     "emoji": "🏠",
     "en": "Who lives in this house?",
     "ar": "مين ساكن في هالبيت؟",
     "hl": "Who"
    },
    {
     "emoji": "🍰",
     "en": "Who made this cake?",
     "ar": "مين سوّى هالكيكة؟",
     "hl": "Who"
    },
    {
     "emoji": "📞",
     "en": "Who is on the phone?",
     "ar": "مين على التلفون؟",
     "hl": "Who"
    },
    {
     "emoji": "🧑‍🏫",
     "en": "Who teaches you maths?",
     "ar": "مين يدرّسك رياضيات؟",
     "hl": "Who"
    }
   ],
   "say": "Who Who is that man? Who is your best friend? Who lives in this house? Who made this cake? Who is on the phone? Who teaches you maths?"
  }
 },
 {
  "id": "haya-44",
  "order": 44,
  "levelId": "l2",
  "titleAr": "ليش؟ Why و because",
  "titleEn": "Why? Because...",
  "content": {
   "explanationAr": "نسأل عن السبب بـ Why، ونجاوب بـ because: Why are you sad? Because I lost my pen.",
   "altExplanationAr": "Why: ليش. Because: لأن.",
   "example": [
    {
     "en": "Why are you sad?",
     "ar": "ليش أنت زعلان؟"
    },
    {
     "en": "Because I lost my pen.",
     "ar": "لأني ضيعت قلمي."
    },
    {
     "en": "Why is he running?",
     "ar": "ليش يركض؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ are you sad?",
    "options": [
     "Who",
     "Why",
     "Which"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ I lost my pen.",
     "options": [
      "But",
      "So",
      "Because"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Why is he running?",
     "options": [
      "ليش يركض؟",
      "يركض لأنه متأخر.",
      "ليش تحتاج جاكيت؟"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He is running ___ he is late.",
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
    "text": "Why? Because..."
   },
   {
    "kind": "highlight",
    "text": "Why · because"
   },
   {
    "kind": "example",
    "en": "Why are you sad?",
    "ar": "ليش أنت زعلان؟"
   },
   {
    "kind": "example",
    "en": "Because I lost my pen.",
    "ar": "لأني ضيعت قلمي."
   }
  ],
  "kids": {
   "listTitle": "Why · because",
   "cards": [
    {
     "emoji": "😢",
     "en": "Why are you sad?",
     "ar": "ليش أنت زعلان؟",
     "hl": "Why"
    },
    {
     "emoji": "✏️",
     "en": "Because I lost my pen.",
     "ar": "لأني ضيعت قلمي.",
     "hl": "Because"
    },
    {
     "emoji": "🏃",
     "en": "Why is he running?",
     "ar": "ليش يركض؟",
     "hl": "Why"
    },
    {
     "emoji": "🚌",
     "en": "He is running because he is late.",
     "ar": "يركض لأنه متأخر.",
     "hl": "because"
    },
    {
     "emoji": "🧥",
     "en": "Why do you need a jacket?",
     "ar": "ليش تحتاج جاكيت؟",
     "hl": "Why"
    },
    {
     "emoji": "🥶",
     "en": "I need a jacket because it is cold.",
     "ar": "أحتاج جاكيت لأن الجو بارد.",
     "hl": "because"
    }
   ],
   "say": "Why · because Why are you sad? Because I lost my pen. Why is he running? He is running because he is late. Why do you need a jacket? I need a jacket because it is cold."
  }
 },
 {
  "id": "haya-45",
  "order": 45,
  "levelId": "l2",
  "titleAr": "كيف؟ How",
  "titleEn": "How...?",
  "content": {
   "explanationAr": "How معناها كيف: How are you? How do you go to work? ونستخدم How old للعمر.",
   "altExplanationAr": "How old are you? I am twelve.",
   "example": [
    {
     "en": "How are you today?",
     "ar": "كيف حالك اليوم؟"
    },
    {
     "en": "How old is your sister?",
     "ar": "كم عمر أختك؟"
    },
    {
     "en": "How do you go to work?",
     "ar": "كيف تروح الدوام؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ are you today?",
    "options": [
     "Who",
     "What",
     "How"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "How ___ is your sister?",
     "options": [
      "old",
      "age",
      "year"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "How do you go to work?",
     "options": [
      "أروح بالتاكسي.",
      "كيف تروح الدوام؟",
      "كيف تتهجى اسمك؟"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I go ___ taxi.",
     "options": [
      "with",
      "in",
      "by"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "How...?"
   },
   {
    "kind": "highlight",
    "text": "How"
   },
   {
    "kind": "example",
    "en": "How are you today?",
    "ar": "كيف حالك اليوم؟"
   },
   {
    "kind": "example",
    "en": "How old is your sister?",
    "ar": "كم عمر أختك؟"
   }
  ],
  "kids": {
   "listTitle": "How",
   "cards": [
    {
     "emoji": "🙂",
     "en": "How are you today?",
     "ar": "كيف حالك اليوم؟",
     "hl": "How"
    },
    {
     "emoji": "🎂",
     "en": "How old is your sister?",
     "ar": "كم عمر أختك؟",
     "hl": "old"
    },
    {
     "emoji": "🚇",
     "en": "How do you go to work?",
     "ar": "كيف تروح الدوام؟",
     "hl": "How"
    },
    {
     "emoji": "🚖",
     "en": "I go by taxi.",
     "ar": "أروح بالتاكسي.",
     "hl": "by"
    },
    {
     "emoji": "🔤",
     "en": "How do you spell your name?",
     "ar": "كيف تتهجى اسمك؟",
     "hl": "spell"
    },
    {
     "emoji": "📏",
     "en": "How tall is your father?",
     "ar": "كم طول أبوك؟",
     "hl": "tall"
    }
   ],
   "say": "How How are you today? How old is your sister? How do you go to work? I go by taxi. How do you spell your name? How tall is your father?"
  }
 },
 {
  "id": "haya-46",
  "order": 46,
  "levelId": "l2",
  "titleAr": "كم؟ How many و How much",
  "titleEn": "How many, How much",
  "content": {
   "explanationAr": "How many للأشياء اللي نعدّها: How many brothers؟ و How much للأشياء اللي ما نعدها وللسعر: How much water؟ How much is it؟",
   "altExplanationAr": "How many apples? How much sugar?",
   "example": [
    {
     "en": "How many brothers do you have?",
     "ar": "كم أخ عندك؟"
    },
    {
     "en": "How much sugar do you want?",
     "ar": "كم سكر تبي؟"
    },
    {
     "en": "How many books are in your bag?",
     "ar": "كم كتاب في شنطتك؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "How ___ brothers do you have?",
    "options": [
     "many",
     "much",
     "more"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "How ___ sugar do you want?",
     "options": [
      "many",
      "much",
      "more"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "How many books are in your bag?",
     "options": [
      "كم ماي تشرب؟",
      "بكم هالقميص؟",
      "كم كتاب في شنطتك؟"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "How ___ water do you drink?",
     "options": [
      "much",
      "many",
      "lot"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "How many, How much"
   },
   {
    "kind": "highlight",
    "text": "many · much"
   },
   {
    "kind": "example",
    "en": "How many brothers do you have?",
    "ar": "كم أخ عندك؟"
   },
   {
    "kind": "example",
    "en": "How much sugar do you want?",
    "ar": "كم سكر تبي؟"
   }
  ],
  "kids": {
   "listTitle": "many · much",
   "cards": [
    {
     "emoji": "👨‍👩‍👧‍👦",
     "en": "How many brothers do you have?",
     "ar": "كم أخ عندك؟",
     "hl": "many"
    },
    {
     "emoji": "🍬",
     "en": "How much sugar do you want?",
     "ar": "كم سكر تبي؟",
     "hl": "much"
    },
    {
     "emoji": "🎒",
     "en": "How many books are in your bag?",
     "ar": "كم كتاب في شنطتك؟",
     "hl": "many"
    },
    {
     "emoji": "💧",
     "en": "How much water do you drink?",
     "ar": "كم ماي تشرب؟",
     "hl": "much"
    },
    {
     "emoji": "🧾",
     "en": "How much is this shirt?",
     "ar": "بكم هالقميص؟",
     "hl": "much"
    },
    {
     "emoji": "👩‍🎓",
     "en": "How many students are in your class?",
     "ar": "كم طالب في فصلك؟",
     "hl": "many"
    }
   ],
   "say": "many · much How many brothers do you have? How much sugar do you want? How many books are in your bag? How much water do you drink? How much is this shirt? How many students are in your class?"
  }
 },
 {
  "id": "haya-47",
  "order": 47,
  "levelId": "l2",
  "titleAr": "أي واحد؟ Which و Whose",
  "titleEn": "Which, Whose",
  "content": {
   "explanationAr": "Which معناها أي واحد من خيارات: Which colour? و Whose نسأل فيها عن صاحب الشي: Whose bag is this?",
   "altExplanationAr": "Whose pen is this? It's Ali's.",
   "example": [
    {
     "en": "Which colour do you like?",
     "ar": "أي لون تحب؟"
    },
    {
     "en": "Whose bag is this?",
     "ar": "شنطة مين هذي؟"
    },
    {
     "en": "Which room is yours?",
     "ar": "أي غرفة غرفتك؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ colour do you like?",
    "options": [
     "Whose",
     "Which",
     "Who"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ bag is this?",
     "options": [
      "Which",
      "Who's",
      "Whose"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Which room is yours?",
     "options": [
      "أي غرفة غرفتك؟",
      "مفاتيح مين اللي على الطاولة؟",
      "أي عصير تبي، برتقال ولا تفاح؟"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ keys are on the table?",
     "options": [
      "Which",
      "Whose",
      "Who's"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Which, Whose"
   },
   {
    "kind": "highlight",
    "text": "Which · Whose"
   },
   {
    "kind": "example",
    "en": "Which colour do you like?",
    "ar": "أي لون تحب؟"
   },
   {
    "kind": "example",
    "en": "Whose bag is this?",
    "ar": "شنطة مين هذي؟"
   }
  ],
  "kids": {
   "listTitle": "Which · Whose",
   "cards": [
    {
     "emoji": "🎨",
     "en": "Which colour do you like?",
     "ar": "أي لون تحب؟",
     "hl": "Which"
    },
    {
     "emoji": "👜",
     "en": "Whose bag is this?",
     "ar": "شنطة مين هذي؟",
     "hl": "Whose"
    },
    {
     "emoji": "🚪",
     "en": "Which room is yours?",
     "ar": "أي غرفة غرفتك؟",
     "hl": "Which"
    },
    {
     "emoji": "🔑",
     "en": "Whose keys are on the table?",
     "ar": "مفاتيح مين اللي على الطاولة؟",
     "hl": "Whose"
    },
    {
     "emoji": "🧃",
     "en": "Which juice do you want, orange or apple?",
     "ar": "أي عصير تبي، برتقال ولا تفاح؟",
     "hl": "Which"
    },
    {
     "emoji": "📱",
     "en": "Whose phone is ringing?",
     "ar": "جوال مين يرن؟",
     "hl": "Whose"
    }
   ],
   "say": "Which · Whose Which colour do you like? Whose bag is this? Which room is yours? Whose keys are on the table? Which juice do you want, orange or apple? Whose phone is ringing?"
  }
 },
 {
  "id": "haya-48",
  "order": 48,
  "levelId": "l2",
  "titleAr": "me و him و her",
  "titleEn": "me, him, her, us, them",
  "content": {
   "explanationAr": "بعد الفعل نستخدم: me لي، him له، her لها، us لنا، them لهم. نقول Help me مو Help I.",
   "altExplanationAr": "I love her. She loves me.",
   "example": [
    {
     "en": "Please help me.",
     "ar": "ساعدني لو سمحت."
    },
    {
     "en": "Call him tonight.",
     "ar": "اتصل عليه الليلة."
    },
    {
     "en": "I see her every day.",
     "ar": "أشوفها كل يوم."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Please help ___.",
    "options": [
     "I",
     "my",
     "me"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Call ___ tonight.",
     "options": [
      "him",
      "he",
      "his"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I see her every day.",
     "options": [
      "أبوي عطانا هدية.",
      "أشوفها كل يوم.",
      "ما أعرفهم."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Dad gave ___ a present.",
     "options": [
      "we",
      "our",
      "us"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "me, him, her, us, them"
   },
   {
    "kind": "highlight",
    "text": "me · him · her"
   },
   {
    "kind": "example",
    "en": "Please help me.",
    "ar": "ساعدني لو سمحت."
   },
   {
    "kind": "example",
    "en": "Call him tonight.",
    "ar": "اتصل عليه الليلة."
   }
  ],
  "kids": {
   "listTitle": "me · him · her",
   "cards": [
    {
     "emoji": "🆘",
     "en": "Please help me.",
     "ar": "ساعدني لو سمحت.",
     "hl": "me"
    },
    {
     "emoji": "📞",
     "en": "Call him tonight.",
     "ar": "اتصل عليه الليلة.",
     "hl": "him"
    },
    {
     "emoji": "👋",
     "en": "I see her every day.",
     "ar": "أشوفها كل يوم.",
     "hl": "her"
    },
    {
     "emoji": "🎁",
     "en": "Dad gave us a present.",
     "ar": "أبوي عطانا هدية.",
     "hl": "us"
    },
    {
     "emoji": "👥",
     "en": "I don't know them.",
     "ar": "ما أعرفهم.",
     "hl": "them"
    },
    {
     "emoji": "🤗",
     "en": "Grandma loves me very much.",
     "ar": "جدتي تحبني مرة.",
     "hl": "me"
    }
   ],
   "say": "me · him · her Please help me. Call him tonight. I see her every day. Dad gave us a present. I don't know them. Grandma loves me very much."
  }
 },
 {
  "id": "haya-49",
  "order": 49,
  "levelId": "l2",
  "titleAr": "ملكية بـ 's",
  "titleEn": "Ali's car",
  "content": {
   "explanationAr": "نقول إن الشي لأحد بإضافة 's بعد اسمه: Ali's car سيارة علي، my mother's phone جوال أمي.",
   "altExplanationAr": "Sara's book: كتاب سارة.",
   "example": [
    {
     "en": "This is Ali's car.",
     "ar": "هذي سيارة علي."
    },
    {
     "en": "My mother's phone is new.",
     "ar": "جوال أمي جديد."
    },
    {
     "en": "We are at my uncle's house.",
     "ar": "إحنا في بيت عمي."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "This is ___ car.",
    "options": [
     "Ali's",
     "Ali",
     "Alis"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "My ___ phone is new.",
     "options": [
      "mother",
      "mother's",
      "mothers"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "We are at my uncle's house.",
     "options": [
      "اسم القطة لولو.",
      "هذا دفتر ريم؟",
      "إحنا في بيت عمي."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The ___ name is Lulu.",
     "options": [
      "cat's",
      "cat",
      "cats"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Ali's car"
   },
   {
    "kind": "highlight",
    "text": "'s"
   },
   {
    "kind": "example",
    "en": "This is Ali's car.",
    "ar": "هذي سيارة علي."
   },
   {
    "kind": "example",
    "en": "My mother's phone is new.",
    "ar": "جوال أمي جديد."
   }
  ],
  "kids": {
   "listTitle": "'s",
   "cards": [
    {
     "emoji": "🚗",
     "en": "This is Ali's car.",
     "ar": "هذي سيارة علي.",
     "hl": "Ali's"
    },
    {
     "emoji": "📱",
     "en": "My mother's phone is new.",
     "ar": "جوال أمي جديد.",
     "hl": "mother's"
    },
    {
     "emoji": "🏡",
     "en": "We are at my uncle's house.",
     "ar": "إحنا في بيت عمي.",
     "hl": "uncle's"
    },
    {
     "emoji": "🐱",
     "en": "The cat's name is Lulu.",
     "ar": "اسم القطة لولو.",
     "hl": "cat's"
    },
    {
     "emoji": "📓",
     "en": "Is this Reem's notebook?",
     "ar": "هذا دفتر ريم؟",
     "hl": "Reem's"
    },
    {
     "emoji": "👔",
     "en": "My father's office is in the city.",
     "ar": "مكتب أبوي في المدينة.",
     "hl": "father's"
    }
   ],
   "say": "'s This is Ali's car. My mother's phone is new. We are at my uncle's house. The cat's name is Lulu. Is this Reem's notebook? My father's office is in the city."
  }
 },
 {
  "id": "haya-50",
  "order": 50,
  "levelId": "l2",
  "titleAr": "these و those",
  "titleEn": "These, Those",
  "content": {
   "explanationAr": "this و that لشي واحد، و these (هذولا القريبين) و those (هذولاك البعيدين) لأكثر من شي.",
   "altExplanationAr": "These shoes are new. Those birds are big.",
   "example": [
    {
     "en": "These shoes are new.",
     "ar": "هالجزم جديدة."
    },
    {
     "en": "Those birds are very big.",
     "ar": "هذيك الطيور كبيرة مرة."
    },
    {
     "en": "These cookies are for you.",
     "ar": "هالكوكيز لك."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ shoes are new.",
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
     "promptEn": "___ birds are very big.",
     "options": [
      "That",
      "This",
      "Those"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "These cookies are for you.",
     "options": [
      "هالكوكيز لك.",
      "هذيك الجبال بعيدة.",
      "هالورود حقيقية؟"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ mountains are far away.",
     "options": [
      "That",
      "Those",
      "This"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "These, Those"
   },
   {
    "kind": "highlight",
    "text": "these · those"
   },
   {
    "kind": "example",
    "en": "These shoes are new.",
    "ar": "هالجزم جديدة."
   },
   {
    "kind": "example",
    "en": "Those birds are very big.",
    "ar": "هذيك الطيور كبيرة مرة."
   }
  ],
  "kids": {
   "listTitle": "these · those",
   "cards": [
    {
     "emoji": "👟",
     "en": "These shoes are new.",
     "ar": "هالجزم جديدة.",
     "hl": "These"
    },
    {
     "emoji": "🐦",
     "en": "Those birds are very big.",
     "ar": "هذيك الطيور كبيرة مرة.",
     "hl": "Those"
    },
    {
     "emoji": "🍪",
     "en": "These cookies are for you.",
     "ar": "هالكوكيز لك.",
     "hl": "These"
    },
    {
     "emoji": "⛰️",
     "en": "Those mountains are far away.",
     "ar": "هذيك الجبال بعيدة.",
     "hl": "Those"
    },
    {
     "emoji": "🌹",
     "en": "Are these flowers real?",
     "ar": "هالورود حقيقية؟",
     "hl": "these"
    },
    {
     "emoji": "🧒",
     "en": "Who are those children?",
     "ar": "مين هذولاك الأطفال؟",
     "hl": "those"
    }
   ],
   "say": "these · those These shoes are new. Those birds are very big. These cookies are for you. Those mountains are far away. Are these flowers real? Who are those children?"
  }
 },
 {
  "id": "haya-51",
  "order": 51,
  "levelId": "l2",
  "titleAr": "أوامر: سوّ ولا تسوي",
  "titleEn": "Do this, Don't do that",
  "content": {
   "explanationAr": "نعطي أوامر بالفعل نفسه بدون شخص: Sit down. Open the window. وللنهي نقول Don't: Don't run.",
   "altExplanationAr": "Wash your hands. Don't touch the oven.",
   "example": [
    {
     "en": "Wash your hands before you eat.",
     "ar": "اغسل يدينك قبل ما تاكل."
    },
    {
     "en": "Open the window, please.",
     "ar": "افتح الشباك لو سمحت."
    },
    {
     "en": "Don't touch the oven.",
     "ar": "لا تلمس الفرن."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ your hands before you eat.",
    "options": [
     "Washes",
     "Washing",
     "Wash"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ the window, please.",
     "options": [
      "Open",
      "Opens",
      "Opening"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Don't touch the oven.",
     "options": [
      "لا تركض في البيت.",
      "لا تلمس الفرن.",
      "اسمع زين."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ run in the house.",
     "options": [
      "Doesn't",
      "No",
      "Don't"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Do this, Don't do that"
   },
   {
    "kind": "highlight",
    "text": "Imperatives"
   },
   {
    "kind": "example",
    "en": "Wash your hands before you eat.",
    "ar": "اغسل يدينك قبل ما تاكل."
   },
   {
    "kind": "example",
    "en": "Open the window, please.",
    "ar": "افتح الشباك لو سمحت."
   }
  ],
  "kids": {
   "listTitle": "Imperatives",
   "cards": [
    {
     "emoji": "🧺",
     "en": "Wash your hands before you eat.",
     "ar": "اغسل يدينك قبل ما تاكل.",
     "hl": "Wash"
    },
    {
     "emoji": "🪟",
     "en": "Open the window, please.",
     "ar": "افتح الشباك لو سمحت.",
     "hl": "Open"
    },
    {
     "emoji": "🔥",
     "en": "Don't touch the oven.",
     "ar": "لا تلمس الفرن.",
     "hl": "Don't"
    },
    {
     "emoji": "🏃",
     "en": "Don't run in the house.",
     "ar": "لا تركض في البيت.",
     "hl": "Don't"
    },
    {
     "emoji": "👂",
     "en": "Listen carefully.",
     "ar": "اسمع زين.",
     "hl": "Listen"
    },
    {
     "emoji": "🗑️",
     "en": "Put the rubbish in the bin.",
     "ar": "حط الزبالة في السلة.",
     "hl": "Put"
    }
   ],
   "say": "Imperatives Wash your hands before you eat. Open the window, please. Don't touch the oven. Don't run in the house. Listen carefully. Put the rubbish in the bin."
  }
 },
 {
  "id": "haya-52",
  "order": 52,
  "levelId": "l2",
  "titleAr": "يلا نسوي: Let's",
  "titleEn": "Let's",
  "content": {
   "explanationAr": "Let's معناها «يلا نسوي»، وبعدها الفعل مباشرة: Let's go! Let's play a game.",
   "altExplanationAr": "Let's eat: يلا ناكل.",
   "example": [
    {
     "en": "Let's go!",
     "ar": "يلا نمشي!"
    },
    {
     "en": "Let's play a game.",
     "ar": "يلا نلعب لعبة."
    },
    {
     "en": "Let's eat together.",
     "ar": "يلا ناكل مع بعض."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ go!",
    "options": [
     "Let's",
     "Lets",
     "Let"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ play a game.",
     "options": [
      "Lets",
      "Let's",
      "Let"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Let's eat together.",
     "options": [
      "يلا نزور الحديقة بكرة.",
      "يلا نتصور.",
      "يلا ناكل مع بعض."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Let's ___ the park tomorrow.",
     "options": [
      "visit",
      "visits",
      "visiting"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Let's"
   },
   {
    "kind": "highlight",
    "text": "Let's"
   },
   {
    "kind": "example",
    "en": "Let's go!",
    "ar": "يلا نمشي!"
   },
   {
    "kind": "example",
    "en": "Let's play a game.",
    "ar": "يلا نلعب لعبة."
   }
  ],
  "kids": {
   "listTitle": "Let's",
   "cards": [
    {
     "emoji": "🚀",
     "en": "Let's go!",
     "ar": "يلا نمشي!",
     "hl": "Let's"
    },
    {
     "emoji": "🎲",
     "en": "Let's play a game.",
     "ar": "يلا نلعب لعبة.",
     "hl": "Let's"
    },
    {
     "emoji": "🍽️",
     "en": "Let's eat together.",
     "ar": "يلا ناكل مع بعض.",
     "hl": "eat"
    },
    {
     "emoji": "🏞️",
     "en": "Let's visit the park tomorrow.",
     "ar": "يلا نزور الحديقة بكرة.",
     "hl": "visit"
    },
    {
     "emoji": "📸",
     "en": "Let's take a photo.",
     "ar": "يلا نتصور.",
     "hl": "take"
    },
    {
     "emoji": "🛑",
     "en": "Let's not be late.",
     "ar": "خلنا ما نتأخر.",
     "hl": "not"
    }
   ],
   "say": "Let's Let's go! Let's play a game. Let's eat together. Let's visit the park tomorrow. Let's take a photo. Let's not be late."
  }
 },
 {
  "id": "haya-53",
  "order": 53,
  "levelId": "l2",
  "titleAr": "بجنب وبين وقدام",
  "titleEn": "next to, between, behind",
  "content": {
   "explanationAr": "كلمات المكان: next to جنب، between بين، behind ورا، in front of قدام، opposite مقابل.",
   "altExplanationAr": "The bank is next to the mosque.",
   "example": [
    {
     "en": "The bank is next to the mosque.",
     "ar": "البنك جنب المسجد."
    },
    {
     "en": "I sit between Ali and Omar.",
     "ar": "أجلس بين علي وعمر."
    },
    {
     "en": "The cat is behind the sofa.",
     "ar": "القطة ورا الكنب."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "The bank is ___ to the mosque.",
    "options": [
     "behind",
     "next",
     "between"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I sit ___ Ali and Omar.",
     "options": [
      "behind",
      "opposite",
      "between"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "The cat is behind the sofa.",
     "options": [
      "القطة ورا الكنب.",
      "السيارة قدام البيت.",
      "المحل مقابل المدرسة."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The car is in ___ of the house.",
     "options": [
      "back",
      "front",
      "side"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "next to, between, behind"
   },
   {
    "kind": "highlight",
    "text": "Place words"
   },
   {
    "kind": "example",
    "en": "The bank is next to the mosque.",
    "ar": "البنك جنب المسجد."
   },
   {
    "kind": "example",
    "en": "I sit between Ali and Omar.",
    "ar": "أجلس بين علي وعمر."
   }
  ],
  "kids": {
   "listTitle": "Place words",
   "cards": [
    {
     "emoji": "🏦",
     "en": "The bank is next to the mosque.",
     "ar": "البنك جنب المسجد.",
     "hl": "next"
    },
    {
     "emoji": "🧍",
     "en": "I sit between Ali and Omar.",
     "ar": "أجلس بين علي وعمر.",
     "hl": "between"
    },
    {
     "emoji": "🐈",
     "en": "The cat is behind the sofa.",
     "ar": "القطة ورا الكنب.",
     "hl": "behind"
    },
    {
     "emoji": "🚗",
     "en": "The car is in front of the house.",
     "ar": "السيارة قدام البيت.",
     "hl": "front"
    },
    {
     "emoji": "🏪",
     "en": "The shop is opposite the school.",
     "ar": "المحل مقابل المدرسة.",
     "hl": "opposite"
    },
    {
     "emoji": "🌳",
     "en": "There is a tree behind our house.",
     "ar": "فيه شجرة ورا بيتنا.",
     "hl": "behind"
    }
   ],
   "say": "Place words The bank is next to the mosque. I sit between Ali and Omar. The cat is behind the sofa. The car is in front of the house. The shop is opposite the school. There is a tree behind our house."
  }
 },
 {
  "id": "haya-54",
  "order": 54,
  "levelId": "l2",
  "titleAr": "أحب أسوي: love و hate مع ing",
  "titleEn": "I love swimming",
  "content": {
   "explanationAr": "بعد like و love و hate و enjoy نستخدم الفعل مع ing: I love swimming. She hates waiting.",
   "altExplanationAr": "I enjoy reading: أستمتع بالقراءة.",
   "example": [
    {
     "en": "I love swimming in the sea.",
     "ar": "أحب السباحة في البحر."
    },
    {
     "en": "She hates waiting.",
     "ar": "تكره الانتظار."
    },
    {
     "en": "We enjoy reading stories.",
     "ar": "نستمتع بقراءة القصص."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I love ___ in the sea.",
    "options": [
     "swim",
     "swims",
     "swimming"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She hates ___.",
     "options": [
      "waiting",
      "wait",
      "waits"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "We enjoy reading stories.",
     "options": [
      "أبوي يحب الطبخ.",
      "نستمتع بقراءة القصص.",
      "تحب ركوب السيكل؟"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "My dad likes ___.",
     "options": [
      "cook",
      "cooks",
      "cooking"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "I love swimming"
   },
   {
    "kind": "highlight",
    "text": "love + ing"
   },
   {
    "kind": "example",
    "en": "I love swimming in the sea.",
    "ar": "أحب السباحة في البحر."
   },
   {
    "kind": "example",
    "en": "She hates waiting.",
    "ar": "تكره الانتظار."
   }
  ],
  "kids": {
   "listTitle": "love + ing",
   "cards": [
    {
     "emoji": "🏊",
     "en": "I love swimming in the sea.",
     "ar": "أحب السباحة في البحر.",
     "hl": "swimming"
    },
    {
     "emoji": "⏳",
     "en": "She hates waiting.",
     "ar": "تكره الانتظار.",
     "hl": "waiting"
    },
    {
     "emoji": "📚",
     "en": "We enjoy reading stories.",
     "ar": "نستمتع بقراءة القصص.",
     "hl": "reading"
    },
    {
     "emoji": "🧑‍🍳",
     "en": "My dad likes cooking.",
     "ar": "أبوي يحب الطبخ.",
     "hl": "cooking"
    },
    {
     "emoji": "🚴",
     "en": "Do you like cycling?",
     "ar": "تحب ركوب السيكل؟",
     "hl": "cycling"
    },
    {
     "emoji": "🧹",
     "en": "He doesn't mind cleaning.",
     "ar": "ما عنده مانع ينظف.",
     "hl": "cleaning"
    }
   ],
   "say": "love + ing I love swimming in the sea. She hates waiting. We enjoy reading stories. My dad likes cooking. Do you like cycling? He doesn't mind cleaning."
  }
 },
 {
  "id": "haya-55",
  "order": 55,
  "levelId": "l2",
  "titleAr": "الحين ولا دايمًا؟",
  "titleEn": "Now or Every Day?",
  "content": {
   "explanationAr": "للعادة نقول المضارع البسيط: I drink tea every day. وللي يصير الحين نقول am أو is أو are مع ing: I am drinking tea now.",
   "altExplanationAr": "every day ← drink. now ← am drinking.",
   "example": [
    {
     "en": "I drink tea every morning.",
     "ar": "أشرب شاي كل صباح."
    },
    {
     "en": "Look! I am drinking coffee now.",
     "ar": "شوف! أشرب قهوة الحين."
    },
    {
     "en": "She takes the bus every day.",
     "ar": "تاخذ الباص كل يوم."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ tea every morning.",
    "options": [
     "drink",
     "am drinking",
     "drinking"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Look! I am ___ coffee now.",
     "options": [
      "drink",
      "drinking",
      "drinks"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "She takes the bus every day.",
     "options": [
      "اليوم تاخذ تاكسي.",
      "نادرًا تمطر في يوليو.",
      "تاخذ الباص كل يوم."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Today she is ___ a taxi.",
     "options": [
      "taking",
      "takes",
      "take"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Now or Every Day?"
   },
   {
    "kind": "highlight",
    "text": "Simple or -ing"
   },
   {
    "kind": "example",
    "en": "I drink tea every morning.",
    "ar": "أشرب شاي كل صباح."
   },
   {
    "kind": "example",
    "en": "Look! I am drinking coffee now.",
    "ar": "شوف! أشرب قهوة الحين."
   }
  ],
  "kids": {
   "listTitle": "Simple or -ing",
   "cards": [
    {
     "emoji": "🍵",
     "en": "I drink tea every morning.",
     "ar": "أشرب شاي كل صباح.",
     "hl": "drink"
    },
    {
     "emoji": "☕",
     "en": "Look! I am drinking coffee now.",
     "ar": "شوف! أشرب قهوة الحين.",
     "hl": "drinking"
    },
    {
     "emoji": "🚌",
     "en": "She takes the bus every day.",
     "ar": "تاخذ الباص كل يوم.",
     "hl": "takes"
    },
    {
     "emoji": "🚕",
     "en": "Today she is taking a taxi.",
     "ar": "اليوم تاخذ تاكسي.",
     "hl": "taking"
    },
    {
     "emoji": "🌞",
     "en": "It rarely rains in July.",
     "ar": "نادرًا تمطر في يوليو.",
     "hl": "rains"
    },
    {
     "emoji": "☔",
     "en": "Take an umbrella. It is raining.",
     "ar": "خذ مظلة. الدنيا تمطر.",
     "hl": "raining"
    }
   ],
   "say": "Simple or -ing I drink tea every morning. Look! I am drinking coffee now. She takes the bus every day. Today she is taking a taxi. It rarely rains in July. Take an umbrella. It is raining."
  }
 },
 {
  "id": "haya-56",
  "order": 56,
  "levelId": "l2",
  "titleAr": "ممكن؟ Can I و Can you",
  "titleEn": "Can I? Can you?",
  "content": {
   "explanationAr": "نطلب الإذن بـ Can I: Can I go out? ونطلب من أحد بـ Can you: Can you help me? ونرد: Sure! أو Sorry, you can't.",
   "altExplanationAr": "Can I sit here? Sure.",
   "example": [
    {
     "en": "Can I go out, please?",
     "ar": "ممكن أطلع لو سمحت؟"
    },
    {
     "en": "Can I sit here?",
     "ar": "ممكن أجلس هنا؟"
    },
    {
     "en": "Can you carry this bag?",
     "ar": "تقدر تشيل هالشنطة؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ I go out, please?",
    "options": [
     "Do",
     "Can",
     "Am"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ I sit here?",
     "options": [
      "Am",
      "Do",
      "Can"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Can you carry this bag?",
     "options": [
      "تقدر تشيل هالشنطة؟",
      "ممكن تتكلم بصوت أعلى لو سمحت؟",
      "أكيد، تقدر تستخدم قلمي."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Can you speak ___, please?",
     "options": [
      "loud",
      "louder",
      "loudly"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Can I? Can you?"
   },
   {
    "kind": "highlight",
    "text": "Asking with can"
   },
   {
    "kind": "example",
    "en": "Can I go out, please?",
    "ar": "ممكن أطلع لو سمحت؟"
   },
   {
    "kind": "example",
    "en": "Can I sit here?",
    "ar": "ممكن أجلس هنا؟"
   }
  ],
  "kids": {
   "listTitle": "Asking with can",
   "cards": [
    {
     "emoji": "🚪",
     "en": "Can I go out, please?",
     "ar": "ممكن أطلع لو سمحت؟",
     "hl": "Can"
    },
    {
     "emoji": "🪑",
     "en": "Can I sit here?",
     "ar": "ممكن أجلس هنا؟",
     "hl": "Can"
    },
    {
     "emoji": "🧳",
     "en": "Can you carry this bag?",
     "ar": "تقدر تشيل هالشنطة؟",
     "hl": "Can"
    },
    {
     "emoji": "🔊",
     "en": "Can you speak louder, please?",
     "ar": "ممكن تتكلم بصوت أعلى لو سمحت؟",
     "hl": "louder"
    },
    {
     "emoji": "✅",
     "en": "Sure, you can use my pen.",
     "ar": "أكيد، تقدر تستخدم قلمي.",
     "hl": "Sure"
    },
    {
     "emoji": "❌",
     "en": "Sorry, you can't park here.",
     "ar": "آسف، ما تقدر توقف هنا.",
     "hl": "can't"
    }
   ],
   "say": "Asking with can Can I go out, please? Can I sit here? Can you carry this bag? Can you speak louder, please? Sure, you can use my pen. Sorry, you can't park here."
  }
 },
 {
  "id": "haya-57",
  "order": 57,
  "levelId": "l2",
  "titleAr": "لازم: have to",
  "titleEn": "I have to, She has to",
  "content": {
   "explanationAr": "have to معناها «لازم»: I have to study. ومع he و she نقول has to: She has to work today.",
   "altExplanationAr": "I don't have to: مو لازم أسوي.",
   "example": [
    {
     "en": "I have to study tonight.",
     "ar": "لازم أذاكر الليلة."
    },
    {
     "en": "She has to work on Saturday.",
     "ar": "لازم تشتغل يوم السبت."
    },
    {
     "en": "You have to show your ID.",
     "ar": "لازم توري هويتك."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ to study tonight.",
    "options": [
     "has",
     "having",
     "have"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She ___ to work on Saturday.",
     "options": [
      "has",
      "have",
      "had"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "You have to show your ID.",
     "options": [
      "مو لازم نروح المدرسة اليوم.",
      "لازم توري هويتك.",
      "لازم ياخذ دوا؟"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We ___ have to go to school today.",
     "options": [
      "doesn't",
      "aren't",
      "don't"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "I have to, She has to"
   },
   {
    "kind": "highlight",
    "text": "have to"
   },
   {
    "kind": "example",
    "en": "I have to study tonight.",
    "ar": "لازم أذاكر الليلة."
   },
   {
    "kind": "example",
    "en": "She has to work on Saturday.",
    "ar": "لازم تشتغل يوم السبت."
   }
  ],
  "kids": {
   "listTitle": "have to",
   "cards": [
    {
     "emoji": "📖",
     "en": "I have to study tonight.",
     "ar": "لازم أذاكر الليلة.",
     "hl": "have"
    },
    {
     "emoji": "👩‍⚕️",
     "en": "She has to work on Saturday.",
     "ar": "لازم تشتغل يوم السبت.",
     "hl": "has"
    },
    {
     "emoji": "🪪",
     "en": "You have to show your ID.",
     "ar": "لازم توري هويتك.",
     "hl": "have"
    },
    {
     "emoji": "🏖️",
     "en": "We don't have to go to school today.",
     "ar": "مو لازم نروح المدرسة اليوم.",
     "hl": "don't"
    },
    {
     "emoji": "💊",
     "en": "Does he have to take medicine?",
     "ar": "لازم ياخذ دوا؟",
     "hl": "have"
    },
    {
     "emoji": "🚦",
     "en": "Drivers have to stop at red lights.",
     "ar": "السواقين لازم يوقفون عند الإشارة الحمرا.",
     "hl": "have"
    }
   ],
   "say": "have to I have to study tonight. She has to work on Saturday. You have to show your ID. We don't have to go to school today. Does he have to take medicine? Drivers have to stop at red lights."
  }
 },
 {
  "id": "haya-58",
  "order": 58,
  "levelId": "l2",
  "titleAr": "مراجعة: المضارع البسيط",
  "titleEn": "Review: Present Simple",
  "content": {
   "explanationAr": "نراجع المضارع البسيط: الفعل العادي مع I و you و we و they، و s مع he و she و it، و don't و doesn't للنفي.",
   "altExplanationAr": "I play. He plays. I don't play. He doesn't play.",
   "example": [
    {
     "en": "My grandpa grows dates.",
     "ar": "جدي يزرع تمر."
    },
    {
     "en": "Camels drink very little water.",
     "ar": "الجمال تشرب ماي قليل مرة."
    },
    {
     "en": "My aunt works from home.",
     "ar": "خالتي تشتغل من البيت."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "My grandpa ___ dates.",
    "options": [
     "grows",
     "grow",
     "growing"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Camels ___ very little water.",
     "options": [
      "drinks",
      "drink",
      "drinking"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "My aunt works from home.",
     "options": [
      "ما آكل شوكولاتة بالليل.",
      "البومة ما تنام بالليل.",
      "خالتي تشتغل من البيت."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I ___ eat chocolate at night.",
     "options": [
      "don't",
      "doesn't",
      "not"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Review: Present Simple"
   },
   {
    "kind": "highlight",
    "text": "Review"
   },
   {
    "kind": "example",
    "en": "My grandpa grows dates.",
    "ar": "جدي يزرع تمر."
   },
   {
    "kind": "example",
    "en": "Camels drink very little water.",
    "ar": "الجمال تشرب ماي قليل مرة."
   }
  ],
  "kids": {
   "listTitle": "Review",
   "cards": [
    {
     "emoji": "🧑‍🌾",
     "en": "My grandpa grows dates.",
     "ar": "جدي يزرع تمر.",
     "hl": "grows"
    },
    {
     "emoji": "🐪",
     "en": "Camels drink very little water.",
     "ar": "الجمال تشرب ماي قليل مرة.",
     "hl": "drink"
    },
    {
     "emoji": "👩‍💻",
     "en": "My aunt works from home.",
     "ar": "خالتي تشتغل من البيت.",
     "hl": "works"
    },
    {
     "emoji": "🍫",
     "en": "I don't eat chocolate at night.",
     "ar": "ما آكل شوكولاتة بالليل.",
     "hl": "don't"
    },
    {
     "emoji": "🦉",
     "en": "An owl doesn't sleep at night.",
     "ar": "البومة ما تنام بالليل.",
     "hl": "doesn't"
    },
    {
     "emoji": "🌍",
     "en": "The earth goes around the sun.",
     "ar": "الأرض تدور حول الشمس.",
     "hl": "goes"
    }
   ],
   "say": "Review My grandpa grows dates. Camels drink very little water. My aunt works from home. I don't eat chocolate at night. An owl doesn't sleep at night. The earth goes around the sun."
  }
 },
 {
  "id": "haya-59",
  "order": 59,
  "levelId": "l2",
  "titleAr": "مراجعة: الأسئلة",
  "titleEn": "Review: Questions",
  "content": {
   "explanationAr": "نراجع كلمات السؤال: Do و Does، و Who و Why و How و Which و Whose و How many و How much.",
   "altExplanationAr": "ابدأ السؤال بالكلمة الصح، وبعدها الشخص والفعل.",
   "example": [
    {
     "en": "Does your father work on Saturday?",
     "ar": "أبوك يشتغل يوم السبت؟"
    },
    {
     "en": "Do your kids help at home?",
     "ar": "عيالك يساعدون في البيت؟"
    },
    {
     "en": "Who sings this song?",
     "ar": "مين يغني هالأغنية؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ your father work on Saturday?",
    "options": [
     "Do",
     "Does",
     "Is"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ your kids help at home?",
     "options": [
      "Does",
      "Are",
      "Do"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Who sings this song?",
     "options": [
      "مين يغني هالأغنية؟",
      "ليش تنام متأخر كذا؟",
      "كم شراب في الدرج؟"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ do you sleep so late?",
     "options": [
      "Who",
      "Why",
      "Whose"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Review: Questions"
   },
   {
    "kind": "highlight",
    "text": "Review"
   },
   {
    "kind": "example",
    "en": "Does your father work on Saturday?",
    "ar": "أبوك يشتغل يوم السبت؟"
   },
   {
    "kind": "example",
    "en": "Do your kids help at home?",
    "ar": "عيالك يساعدون في البيت؟"
   }
  ],
  "kids": {
   "listTitle": "Review",
   "cards": [
    {
     "emoji": "❓",
     "en": "Does your father work on Saturday?",
     "ar": "أبوك يشتغل يوم السبت؟",
     "hl": "Does"
    },
    {
     "emoji": "🧺",
     "en": "Do your kids help at home?",
     "ar": "عيالك يساعدون في البيت؟",
     "hl": "Do"
    },
    {
     "emoji": "🎤",
     "en": "Who sings this song?",
     "ar": "مين يغني هالأغنية؟",
     "hl": "Who"
    },
    {
     "emoji": "🌙",
     "en": "Why do you sleep so late?",
     "ar": "ليش تنام متأخر كذا؟",
     "hl": "Why"
    },
    {
     "emoji": "🧦",
     "en": "How many socks are in the drawer?",
     "ar": "كم شراب في الدرج؟",
     "hl": "many"
    },
    {
     "emoji": "🥾",
     "en": "Whose boots are these?",
     "ar": "جزمة مين هذي؟",
     "hl": "Whose"
    }
   ],
   "say": "Review Does your father work on Saturday? Do your kids help at home? Who sings this song? Why do you sleep so late? How many socks are in the drawer? Whose boots are these?"
  }
 },
 {
  "id": "haya-60",
  "order": 60,
  "levelId": "l2",
  "titleAr": "مراجعة المستوى الثاني",
  "titleEn": "Level 2 Review",
  "content": {
   "explanationAr": "مراجعة المستوى الثاني كله: المضارع البسيط، كلمات التكرار، الأسئلة، me و him و her، و Let's.",
   "altExplanationAr": "اقرأ كل جملة بصوت عالي وفكر وش الكلمة الناقصة.",
   "example": [
    {
     "en": "I usually get up early.",
     "ar": "غالبًا أصحى بدري."
    },
    {
     "en": "She runs in the park twice a week.",
     "ar": "تركض في الحديقة مرتين بالأسبوع."
    },
    {
     "en": "Tell them the good news.",
     "ar": "قل لهم الخبر الحلو."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ get up early.",
    "options": [
     "ever",
     "soon",
     "usually"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She runs in the park ___ a week.",
     "options": [
      "twice",
      "two",
      "second"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Tell them the good news.",
     "options": [
      "هالدونات لذيذة.",
      "قل لهم الخبر الحلو.",
      "يلا نروح بولينج يوم الجمعة."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ doughnuts are delicious.",
     "options": [
      "This",
      "That",
      "These"
     ],
     "correctIndex": 2
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
    "en": "I usually get up early.",
    "ar": "غالبًا أصحى بدري."
   },
   {
    "kind": "example",
    "en": "She runs in the park twice a week.",
    "ar": "تركض في الحديقة مرتين بالأسبوع."
   }
  ],
  "kids": {
   "listTitle": "Level 2 Review",
   "cards": [
    {
     "emoji": "🕰️",
     "en": "I usually get up early.",
     "ar": "غالبًا أصحى بدري.",
     "hl": "usually"
    },
    {
     "emoji": "🏃‍♀️",
     "en": "She runs in the park twice a week.",
     "ar": "تركض في الحديقة مرتين بالأسبوع.",
     "hl": "twice"
    },
    {
     "emoji": "💬",
     "en": "Tell them the good news.",
     "ar": "قل لهم الخبر الحلو.",
     "hl": "them"
    },
    {
     "emoji": "🍩",
     "en": "These doughnuts are delicious.",
     "ar": "هالدونات لذيذة.",
     "hl": "These"
    },
    {
     "emoji": "🎳",
     "en": "Let's go bowling on Friday.",
     "ar": "يلا نروح بولينج يوم الجمعة.",
     "hl": "go"
    },
    {
     "emoji": "🧑‍🔧",
     "en": "Who fixes cars in your family?",
     "ar": "مين يصلّح السيارات في عائلتكم؟",
     "hl": "Who"
    }
   ],
   "say": "Level 2 Review I usually get up early. She runs in the park twice a week. Tell them the good news. These doughnuts are delicious. Let's go bowling on Friday. Who fixes cars in your family?"
  }
 },
 {
  "id": "haya-61",
  "order": 61,
  "levelId": "l3",
  "titleAr": "هل كان؟ Was و Were",
  "titleEn": "Was it? Were they?",
  "content": {
   "explanationAr": "نسأل عن الماضي بـ Was و Were في أول الجملة: Was it cold? Were they at home?",
   "altExplanationAr": "Was it fun? Yes, it was.",
   "example": [
    {
     "en": "Was the trip fun?",
     "ar": "كانت الرحلة حلوة؟"
    },
    {
     "en": "Were your parents at home?",
     "ar": "كان أهلك في البيت؟"
    },
    {
     "en": "Was it cold last night?",
     "ar": "كان الجو بارد البارحة بالليل؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ the trip fun?",
    "options": [
     "Was",
     "Were",
     "Is"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ your parents at home?",
     "options": [
      "Was",
      "Were",
      "Are"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Was it cold last night?",
     "options": [
      "كانت الأسئلة سهلة؟",
      "كان مريض يوم الاثنين؟",
      "كان الجو بارد البارحة بالليل؟"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ the questions easy?",
     "options": [
      "Were",
      "Was",
      "Are"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Was it? Were they?"
   },
   {
    "kind": "highlight",
    "text": "Was · Were"
   },
   {
    "kind": "example",
    "en": "Was the trip fun?",
    "ar": "كانت الرحلة حلوة؟"
   },
   {
    "kind": "example",
    "en": "Were your parents at home?",
    "ar": "كان أهلك في البيت؟"
   }
  ],
  "kids": {
   "listTitle": "Was · Were",
   "cards": [
    {
     "emoji": "🎡",
     "en": "Was the trip fun?",
     "ar": "كانت الرحلة حلوة؟",
     "hl": "Was"
    },
    {
     "emoji": "🏠",
     "en": "Were your parents at home?",
     "ar": "كان أهلك في البيت؟",
     "hl": "Were"
    },
    {
     "emoji": "🥶",
     "en": "Was it cold last night?",
     "ar": "كان الجو بارد البارحة بالليل؟",
     "hl": "Was"
    },
    {
     "emoji": "🧪",
     "en": "Were the questions easy?",
     "ar": "كانت الأسئلة سهلة؟",
     "hl": "Were"
    },
    {
     "emoji": "🤒",
     "en": "Was he sick on Monday?",
     "ar": "كان مريض يوم الاثنين؟",
     "hl": "Was"
    },
    {
     "emoji": "🍽️",
     "en": "Yes, the food was great.",
     "ar": "إيه، الأكل كان رهيب.",
     "hl": "was"
    }
   ],
   "say": "Was · Were Was the trip fun? Were your parents at home? Was it cold last night? Were the questions easy? Was he sick on Monday? Yes, the food was great."
  }
 },
 {
  "id": "haya-62",
  "order": 62,
  "levelId": "l3",
  "titleAr": "ما كان: wasn't و weren't",
  "titleEn": "It wasn't, They weren't",
  "content": {
   "explanationAr": "النفي في الماضي: wasn't: was not، و weren't: were not. The shop wasn't open.",
   "altExplanationAr": "We weren't late: ما كنا متأخرين.",
   "example": [
    {
     "en": "The shop wasn't open.",
     "ar": "المحل ما كان فاتح."
    },
    {
     "en": "We weren't late.",
     "ar": "ما كنا متأخرين."
    },
    {
     "en": "The film wasn't long.",
     "ar": "الفيلم ما كان طويل."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "The shop ___ open.",
    "options": [
     "weren't",
     "wasn't",
     "isn't"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We ___ late.",
     "options": [
      "wasn't",
      "aren't",
      "weren't"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "The film wasn't long.",
     "options": [
      "الفيلم ما كان طويل.",
      "الألعاب ما كانت في الصندوق.",
      "ما كنت في البيت أمس."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The toys ___ in the box.",
     "options": [
      "wasn't",
      "weren't",
      "didn't"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "It wasn't, They weren't"
   },
   {
    "kind": "highlight",
    "text": "wasn't · weren't"
   },
   {
    "kind": "example",
    "en": "The shop wasn't open.",
    "ar": "المحل ما كان فاتح."
   },
   {
    "kind": "example",
    "en": "We weren't late.",
    "ar": "ما كنا متأخرين."
   }
  ],
  "kids": {
   "listTitle": "wasn't · weren't",
   "cards": [
    {
     "emoji": "🏪",
     "en": "The shop wasn't open.",
     "ar": "المحل ما كان فاتح.",
     "hl": "wasn't"
    },
    {
     "emoji": "⏰",
     "en": "We weren't late.",
     "ar": "ما كنا متأخرين.",
     "hl": "weren't"
    },
    {
     "emoji": "🎬",
     "en": "The film wasn't long.",
     "ar": "الفيلم ما كان طويل.",
     "hl": "wasn't"
    },
    {
     "emoji": "🧸",
     "en": "The toys weren't in the box.",
     "ar": "الألعاب ما كانت في الصندوق.",
     "hl": "weren't"
    },
    {
     "emoji": "📵",
     "en": "I wasn't at home yesterday.",
     "ar": "ما كنت في البيت أمس.",
     "hl": "wasn't"
    },
    {
     "emoji": "🌧️",
     "en": "The streets weren't wet.",
     "ar": "الشوارع ما كانت مبلولة.",
     "hl": "weren't"
    }
   ],
   "say": "wasn't · weren't The shop wasn't open. We weren't late. The film wasn't long. The toys weren't in the box. I wasn't at home yesterday. The streets weren't wet."
  }
 },
 {
  "id": "haya-63",
  "order": 63,
  "levelId": "l3",
  "titleAr": "تهجئة ed",
  "titleEn": "studied, stopped, lived",
  "content": {
   "explanationAr": "في الماضي نضيف ed، لكن انتبه: live ← lived (نضيف d بس)، study ← studied، stop ← stopped (نكرر الحرف).",
   "altExplanationAr": "I tried. She stopped. We lived.",
   "example": [
    {
     "en": "We lived in Jeddah for two years.",
     "ar": "سكنّا في جدة سنتين."
    },
    {
     "en": "She studied all night.",
     "ar": "ذاكرت طول الليل."
    },
    {
     "en": "The car stopped at the light.",
     "ar": "السيارة وقفت عند الإشارة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "We ___ in Jeddah for two years.",
    "options": [
     "liveed",
     "lives",
     "lived"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She ___ all night.",
     "options": [
      "studied",
      "studyed",
      "studies"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "The car stopped at the light.",
     "options": [
      "حاولت قد ما أقدر.",
      "السيارة وقفت عند الإشارة.",
      "ضحكنا كثير."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I ___ my best.",
     "options": [
      "tryed",
      "tries",
      "tried"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "studied, stopped, lived"
   },
   {
    "kind": "highlight",
    "text": "ed spelling"
   },
   {
    "kind": "example",
    "en": "We lived in Jeddah for two years.",
    "ar": "سكنّا في جدة سنتين."
   },
   {
    "kind": "example",
    "en": "She studied all night.",
    "ar": "ذاكرت طول الليل."
   }
  ],
  "kids": {
   "listTitle": "ed spelling",
   "cards": [
    {
     "emoji": "🏘️",
     "en": "We lived in Jeddah for two years.",
     "ar": "سكنّا في جدة سنتين.",
     "hl": "lived"
    },
    {
     "emoji": "📚",
     "en": "She studied all night.",
     "ar": "ذاكرت طول الليل.",
     "hl": "studied"
    },
    {
     "emoji": "🚦",
     "en": "The car stopped at the light.",
     "ar": "السيارة وقفت عند الإشارة.",
     "hl": "stopped"
    },
    {
     "emoji": "🤞",
     "en": "I tried my best.",
     "ar": "حاولت قد ما أقدر.",
     "hl": "tried"
    },
    {
     "emoji": "🤣",
     "en": "We laughed a lot.",
     "ar": "ضحكنا كثير.",
     "hl": "laughed"
    },
    {
     "emoji": "🛍️",
     "en": "Mom shopped for new clothes.",
     "ar": "ماما تسوقت ملابس جديدة.",
     "hl": "shopped"
    }
   ],
   "say": "ed spelling We lived in Jeddah for two years. She studied all night. The car stopped at the light. I tried my best. We laughed a lot. Mom shopped for new clothes."
  }
 },
 {
  "id": "haya-64",
  "order": 64,
  "levelId": "l3",
  "titleAr": "الماضي الشاذ ١",
  "titleEn": "went, ate, saw",
  "content": {
   "explanationAr": "بعض الأفعال ما تاخذ ed في الماضي، لها شكل خاص: go ← went، eat ← ate، see ← saw، drink ← drank.",
   "altExplanationAr": "I went to the zoo and saw a lion.",
   "example": [
    {
     "en": "We went to the zoo on Friday.",
     "ar": "رحنا حديقة الحيوان يوم الجمعة."
    },
    {
     "en": "I saw an elephant there.",
     "ar": "شفت فيل هناك."
    },
    {
     "en": "The kids ate ice cream.",
     "ar": "الأطفال أكلوا آيس كريم."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "We ___ to the zoo on Friday.",
    "options": [
     "went",
     "goed",
     "go"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I ___ an elephant there.",
     "options": [
      "seed",
      "saw",
      "see"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "The kids ate ice cream.",
     "options": [
      "شربت عصير برتقال.",
      "سبح في مسبح الفندق.",
      "الأطفال أكلوا آيس كريم."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She ___ orange juice.",
     "options": [
      "drank",
      "drinked",
      "drink"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "went, ate, saw"
   },
   {
    "kind": "highlight",
    "text": "Irregular past 1"
   },
   {
    "kind": "example",
    "en": "We went to the zoo on Friday.",
    "ar": "رحنا حديقة الحيوان يوم الجمعة."
   },
   {
    "kind": "example",
    "en": "I saw an elephant there.",
    "ar": "شفت فيل هناك."
   }
  ],
  "kids": {
   "listTitle": "Irregular past 1",
   "cards": [
    {
     "emoji": "🦁",
     "en": "We went to the zoo on Friday.",
     "ar": "رحنا حديقة الحيوان يوم الجمعة.",
     "hl": "went"
    },
    {
     "emoji": "🐘",
     "en": "I saw an elephant there.",
     "ar": "شفت فيل هناك.",
     "hl": "saw"
    },
    {
     "emoji": "🍦",
     "en": "The kids ate ice cream.",
     "ar": "الأطفال أكلوا آيس كريم.",
     "hl": "ate"
    },
    {
     "emoji": "🧃",
     "en": "She drank orange juice.",
     "ar": "شربت عصير برتقال.",
     "hl": "drank"
    },
    {
     "emoji": "🏊",
     "en": "He swam in the hotel pool.",
     "ar": "سبح في مسبح الفندق.",
     "hl": "swam"
    },
    {
     "emoji": "🎶",
     "en": "We sang a song together.",
     "ar": "غنينا أغنية مع بعض.",
     "hl": "sang"
    }
   ],
   "say": "Irregular past 1 We went to the zoo on Friday. I saw an elephant there. The kids ate ice cream. She drank orange juice. He swam in the hotel pool. We sang a song together."
  }
 },
 {
  "id": "haya-65",
  "order": 65,
  "levelId": "l3",
  "titleAr": "الماضي الشاذ ٢",
  "titleEn": "bought, made, took",
  "content": {
   "explanationAr": "أفعال شاذة ثانية: buy ← bought، make ← made، take ← took، write ← wrote، find ← found.",
   "altExplanationAr": "I bought a gift and wrote a card.",
   "example": [
    {
     "en": "I bought a gift for my mom.",
     "ar": "اشتريت هدية لأمي."
    },
    {
     "en": "Grandma made cookies.",
     "ar": "جدتي سوت كوكيز."
    },
    {
     "en": "We took many photos.",
     "ar": "أخذنا صور كثيرة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ a gift for my mom.",
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
     "promptEn": "Grandma ___ cookies.",
     "options": [
      "maked",
      "make",
      "made"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "We took many photos.",
     "options": [
      "أخذنا صور كثيرة.",
      "كتب رسالة لصديقه.",
      "لقيت مفاتيحي تحت السرير."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He ___ a letter to his friend.",
     "options": [
      "writed",
      "wrote",
      "write"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "bought, made, took"
   },
   {
    "kind": "highlight",
    "text": "Irregular past 2"
   },
   {
    "kind": "example",
    "en": "I bought a gift for my mom.",
    "ar": "اشتريت هدية لأمي."
   },
   {
    "kind": "example",
    "en": "Grandma made cookies.",
    "ar": "جدتي سوت كوكيز."
   }
  ],
  "kids": {
   "listTitle": "Irregular past 2",
   "cards": [
    {
     "emoji": "🎁",
     "en": "I bought a gift for my mom.",
     "ar": "اشتريت هدية لأمي.",
     "hl": "bought"
    },
    {
     "emoji": "🍪",
     "en": "Grandma made cookies.",
     "ar": "جدتي سوت كوكيز.",
     "hl": "made"
    },
    {
     "emoji": "📸",
     "en": "We took many photos.",
     "ar": "أخذنا صور كثيرة.",
     "hl": "took"
    },
    {
     "emoji": "💌",
     "en": "He wrote a letter to his friend.",
     "ar": "كتب رسالة لصديقه.",
     "hl": "wrote"
    },
    {
     "emoji": "🔑",
     "en": "I found my keys under the bed.",
     "ar": "لقيت مفاتيحي تحت السرير.",
     "hl": "found"
    },
    {
     "emoji": "🧥",
     "en": "She wore her new dress.",
     "ar": "لبست فستانها الجديد.",
     "hl": "wore"
    }
   ],
   "say": "Irregular past 2 I bought a gift for my mom. Grandma made cookies. We took many photos. He wrote a letter to his friend. I found my keys under the bed. She wore her new dress."
  }
 },
 {
  "id": "haya-66",
  "order": 66,
  "levelId": "l3",
  "titleAr": "الماضي الشاذ ٣",
  "titleEn": "came, got, had, gave",
  "content": {
   "explanationAr": "أفعال شاذة مهمة: come ← came، get ← got، have ← had، give ← gave، say ← said، tell ← told.",
   "altExplanationAr": "My uncle came and gave me a book.",
   "example": [
    {
     "en": "My uncle came last night.",
     "ar": "عمي جا البارحة بالليل."
    },
    {
     "en": "I got a big box.",
     "ar": "جاني صندوق كبير."
    },
    {
     "en": "We had a party.",
     "ar": "سوينا حفلة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "My uncle ___ last night.",
    "options": [
     "comed",
     "come",
     "came"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I ___ a big box.",
     "options": [
      "got",
      "getted",
      "get"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "We had a party.",
     "options": [
      "عطاني كتاب.",
      "سوينا حفلة.",
      "قالت هلا للكل."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He ___ me a book.",
     "options": [
      "gived",
      "give",
      "gave"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "came, got, had, gave"
   },
   {
    "kind": "highlight",
    "text": "Irregular past 3"
   },
   {
    "kind": "example",
    "en": "My uncle came last night.",
    "ar": "عمي جا البارحة بالليل."
   },
   {
    "kind": "example",
    "en": "I got a big box.",
    "ar": "جاني صندوق كبير."
   }
  ],
  "kids": {
   "listTitle": "Irregular past 3",
   "cards": [
    {
     "emoji": "🚪",
     "en": "My uncle came last night.",
     "ar": "عمي جا البارحة بالليل.",
     "hl": "came"
    },
    {
     "emoji": "📦",
     "en": "I got a big box.",
     "ar": "جاني صندوق كبير.",
     "hl": "got"
    },
    {
     "emoji": "🎂",
     "en": "We had a party.",
     "ar": "سوينا حفلة.",
     "hl": "had"
    },
    {
     "emoji": "📘",
     "en": "He gave me a book.",
     "ar": "عطاني كتاب.",
     "hl": "gave"
    },
    {
     "emoji": "💬",
     "en": "She said hello to everyone.",
     "ar": "قالت هلا للكل.",
     "hl": "said"
    },
    {
     "emoji": "📖",
     "en": "Dad told us a story.",
     "ar": "أبوي حكى لنا قصة.",
     "hl": "told"
    }
   ],
   "say": "Irregular past 3 My uncle came last night. I got a big box. We had a party. He gave me a book. She said hello to everyone. Dad told us a story."
  }
 },
 {
  "id": "haya-67",
  "order": 67,
  "levelId": "l3",
  "titleAr": "ما سويت: didn't",
  "titleEn": "I didn't",
  "content": {
   "explanationAr": "النفي في الماضي نقول didn't قبل الفعل، والفعل يرجع لأصله: I didn't go (مو didn't went).",
   "altExplanationAr": "She didn't eat breakfast.",
   "example": [
    {
     "en": "I didn't go to school yesterday.",
     "ar": "ما رحت المدرسة أمس."
    },
    {
     "en": "She didn't eat breakfast.",
     "ar": "ما فطرت."
    },
    {
     "en": "We didn't watch TV last night.",
     "ar": "ما شفنا تلفزيون البارحة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I didn't ___ to school yesterday.",
    "options": [
     "go",
     "went",
     "goes"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She ___ eat breakfast.",
     "options": [
      "doesn't",
      "didn't",
      "wasn't"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "We didn't watch TV last night.",
     "options": [
      "ما سمع التلفون.",
      "ما مطرت الأسبوع اللي فات.",
      "ما شفنا تلفزيون البارحة."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He didn't ___ the phone.",
     "options": [
      "hear",
      "heard",
      "hears"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "I didn't"
   },
   {
    "kind": "highlight",
    "text": "didn't"
   },
   {
    "kind": "example",
    "en": "I didn't go to school yesterday.",
    "ar": "ما رحت المدرسة أمس."
   },
   {
    "kind": "example",
    "en": "She didn't eat breakfast.",
    "ar": "ما فطرت."
   }
  ],
  "kids": {
   "listTitle": "didn't",
   "cards": [
    {
     "emoji": "🙅",
     "en": "I didn't go to school yesterday.",
     "ar": "ما رحت المدرسة أمس.",
     "hl": "go"
    },
    {
     "emoji": "🥞",
     "en": "She didn't eat breakfast.",
     "ar": "ما فطرت.",
     "hl": "didn't"
    },
    {
     "emoji": "📺",
     "en": "We didn't watch TV last night.",
     "ar": "ما شفنا تلفزيون البارحة.",
     "hl": "didn't"
    },
    {
     "emoji": "🔇",
     "en": "He didn't hear the phone.",
     "ar": "ما سمع التلفون.",
     "hl": "hear"
    },
    {
     "emoji": "🌧️",
     "en": "It didn't rain last week.",
     "ar": "ما مطرت الأسبوع اللي فات.",
     "hl": "didn't"
    },
    {
     "emoji": "📝",
     "en": "They didn't finish the test.",
     "ar": "ما خلصوا الاختبار.",
     "hl": "finish"
    }
   ],
   "say": "didn't I didn't go to school yesterday. She didn't eat breakfast. We didn't watch TV last night. He didn't hear the phone. It didn't rain last week. They didn't finish the test."
  }
 },
 {
  "id": "haya-68",
  "order": 68,
  "levelId": "l3",
  "titleAr": "هل سويت؟ Did you",
  "titleEn": "Did you...?",
  "content": {
   "explanationAr": "نسأل في الماضي بـ Did، والفعل يرجع لأصله: Did you see the match? Did she call?",
   "altExplanationAr": "Did you sleep well? Yes, I did.",
   "example": [
    {
     "en": "Did you see the match?",
     "ar": "شفت المباراة؟"
    },
    {
     "en": "Did she call you?",
     "ar": "اتصلت عليك؟"
    },
    {
     "en": "Did you sleep well?",
     "ar": "نمت زين؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ you see the match?",
    "options": [
     "Do",
     "Did",
     "Was"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ she call you?",
     "options": [
      "Does",
      "Was",
      "Did"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Did you sleep well?",
     "options": [
      "نمت زين؟",
      "إيه، نمت.",
      "جهزوا شنطهم؟"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Yes, I ___.",
     "options": [
      "do",
      "did",
      "was"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Did you...?"
   },
   {
    "kind": "highlight",
    "text": "Did"
   },
   {
    "kind": "example",
    "en": "Did you see the match?",
    "ar": "شفت المباراة؟"
   },
   {
    "kind": "example",
    "en": "Did she call you?",
    "ar": "اتصلت عليك؟"
   }
  ],
  "kids": {
   "listTitle": "Did",
   "cards": [
    {
     "emoji": "⚽",
     "en": "Did you see the match?",
     "ar": "شفت المباراة؟",
     "hl": "Did"
    },
    {
     "emoji": "📞",
     "en": "Did she call you?",
     "ar": "اتصلت عليك؟",
     "hl": "Did"
    },
    {
     "emoji": "😴",
     "en": "Did you sleep well?",
     "ar": "نمت زين؟",
     "hl": "sleep"
    },
    {
     "emoji": "👍",
     "en": "Yes, I did.",
     "ar": "إيه، نمت.",
     "hl": "did"
    },
    {
     "emoji": "🧳",
     "en": "Did they pack their bags?",
     "ar": "جهزوا شنطهم؟",
     "hl": "pack"
    },
    {
     "emoji": "👎",
     "en": "No, they didn't.",
     "ar": "لا، ما جهزوا.",
     "hl": "didn't"
    }
   ],
   "say": "Did Did you see the match? Did she call you? Did you sleep well? Yes, I did. Did they pack their bags? No, they didn't."
  }
 },
 {
  "id": "haya-69",
  "order": 69,
  "levelId": "l3",
  "titleAr": "وين رحت؟ أسئلة الماضي",
  "titleEn": "Where did you go?",
  "content": {
   "explanationAr": "كلمات السؤال مع did: Where did you go? What did you eat? When did he arrive?",
   "altExplanationAr": "What did you do at the weekend?",
   "example": [
    {
     "en": "Where did you go last summer?",
     "ar": "وين رحت الصيف اللي فات؟"
    },
    {
     "en": "What did you eat for lunch?",
     "ar": "وش أكلت على الغدا؟"
    },
    {
     "en": "When did your father arrive?",
     "ar": "متى وصل أبوك؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Where ___ you go last summer?",
    "options": [
     "do",
     "were",
     "did"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "What did you ___ for lunch?",
     "options": [
      "eat",
      "ate",
      "eats"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "When did your father arrive?",
     "options": [
      "وش سويت في الويكند؟",
      "متى وصل أبوك؟",
      "ليش مشت بدري؟"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "What did you ___ at the weekend?",
     "options": [
      "did",
      "does",
      "do"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Where did you go?"
   },
   {
    "kind": "highlight",
    "text": "Wh- + did"
   },
   {
    "kind": "example",
    "en": "Where did you go last summer?",
    "ar": "وين رحت الصيف اللي فات؟"
   },
   {
    "kind": "example",
    "en": "What did you eat for lunch?",
    "ar": "وش أكلت على الغدا؟"
   }
  ],
  "kids": {
   "listTitle": "Wh- + did",
   "cards": [
    {
     "emoji": "🗺️",
     "en": "Where did you go last summer?",
     "ar": "وين رحت الصيف اللي فات؟",
     "hl": "did"
    },
    {
     "emoji": "🍲",
     "en": "What did you eat for lunch?",
     "ar": "وش أكلت على الغدا؟",
     "hl": "eat"
    },
    {
     "emoji": "🛬",
     "en": "When did your father arrive?",
     "ar": "متى وصل أبوك؟",
     "hl": "arrive"
    },
    {
     "emoji": "🎉",
     "en": "What did you do at the weekend?",
     "ar": "وش سويت في الويكند؟",
     "hl": "do"
    },
    {
     "emoji": "🤔",
     "en": "Why did she leave early?",
     "ar": "ليش مشت بدري؟",
     "hl": "leave"
    },
    {
     "emoji": "🛒",
     "en": "How much did you pay?",
     "ar": "كم دفعت؟",
     "hl": "pay"
    }
   ],
   "say": "Wh- + did Where did you go last summer? What did you eat for lunch? When did your father arrive? What did you do at the weekend? Why did she leave early? How much did you pay?"
  }
 },
 {
  "id": "haya-70",
  "order": 70,
  "levelId": "l3",
  "titleAr": "كلمات وقت الماضي",
  "titleEn": "yesterday, ago, last",
  "content": {
   "explanationAr": "كلمات تدل على الماضي: yesterday أمس، last night البارحة، last week الأسبوع اللي فات، two days ago قبل يومين.",
   "altExplanationAr": "I visited my aunt two days ago.",
   "example": [
    {
     "en": "I visited my aunt two days ago.",
     "ar": "زرت خالتي قبل يومين."
    },
    {
     "en": "We arrived late last night.",
     "ar": "وصلنا متأخر البارحة بالليل."
    },
    {
     "en": "They moved here last month.",
     "ar": "انتقلوا هنا الشهر اللي فات."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I visited my aunt two days ___.",
    "options": [
     "ago",
     "before",
     "last"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We arrived late ___ night.",
     "options": [
      "ago",
      "last",
      "next"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "They moved here last month.",
     "options": [
      "أمس كان حر مرة.",
      "فريقنا فاز بالكاس قبل ثلاث سنين.",
      "انتقلوا هنا الشهر اللي فات."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ was very hot.",
     "options": [
      "Yesterday",
      "Tomorrow",
      "Today"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "yesterday, ago, last"
   },
   {
    "kind": "highlight",
    "text": "Past time words"
   },
   {
    "kind": "example",
    "en": "I visited my aunt two days ago.",
    "ar": "زرت خالتي قبل يومين."
   },
   {
    "kind": "example",
    "en": "We arrived late last night.",
    "ar": "وصلنا متأخر البارحة بالليل."
   }
  ],
  "kids": {
   "listTitle": "Past time words",
   "cards": [
    {
     "emoji": "📅",
     "en": "I visited my aunt two days ago.",
     "ar": "زرت خالتي قبل يومين.",
     "hl": "ago"
    },
    {
     "emoji": "🌙",
     "en": "We arrived late last night.",
     "ar": "وصلنا متأخر البارحة بالليل.",
     "hl": "last"
    },
    {
     "emoji": "🗓️",
     "en": "They moved here last month.",
     "ar": "انتقلوا هنا الشهر اللي فات.",
     "hl": "last"
    },
    {
     "emoji": "☀️",
     "en": "Yesterday was very hot.",
     "ar": "أمس كان حر مرة.",
     "hl": "Yesterday"
    },
    {
     "emoji": "🏆",
     "en": "Our team won the cup three years ago.",
     "ar": "فريقنا فاز بالكاس قبل ثلاث سنين.",
     "hl": "ago"
    },
    {
     "emoji": "🍕",
     "en": "We ordered pizza the day before yesterday.",
     "ar": "طلبنا بيتزا قبل أمس.",
     "hl": "before"
    }
   ],
   "say": "Past time words I visited my aunt two days ago. We arrived late last night. They moved here last month. Yesterday was very hot. Our team won the cup three years ago. We ordered pizza the day before yesterday."
  }
 },
 {
  "id": "haya-71",
  "order": 71,
  "levelId": "l3",
  "titleAr": "كنت أسوي: الماضي المستمر",
  "titleEn": "I was playing",
  "content": {
   "explanationAr": "للي كان يصير في وقت معين بالماضي نقول was أو were مع ing: At eight, I was eating dinner.",
   "altExplanationAr": "They were playing when it started to rain.",
   "example": [
    {
     "en": "At eight, I was eating dinner.",
     "ar": "الساعة ثمان كنت أتعشى."
    },
    {
     "en": "The boys were playing football.",
     "ar": "الأولاد كانوا يلعبون كورة."
    },
    {
     "en": "She was taking a shower.",
     "ar": "كانت تتروش."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "At eight, I ___ eating dinner.",
    "options": [
     "were",
     "was",
     "am"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The boys ___ playing football.",
     "options": [
      "was",
      "are",
      "were"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "She was taking a shower.",
     "options": [
      "كانت تتروش.",
      "كنا رايحين مكة بالسيارة.",
      "البيبي كان نايم طول العصر."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We were ___ to Mecca.",
     "options": [
      "drive",
      "driving",
      "drove"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "I was playing"
   },
   {
    "kind": "highlight",
    "text": "was + ing"
   },
   {
    "kind": "example",
    "en": "At eight, I was eating dinner.",
    "ar": "الساعة ثمان كنت أتعشى."
   },
   {
    "kind": "example",
    "en": "The boys were playing football.",
    "ar": "الأولاد كانوا يلعبون كورة."
   }
  ],
  "kids": {
   "listTitle": "was + ing",
   "cards": [
    {
     "emoji": "🍽️",
     "en": "At eight, I was eating dinner.",
     "ar": "الساعة ثمان كنت أتعشى.",
     "hl": "was"
    },
    {
     "emoji": "⚽",
     "en": "The boys were playing football.",
     "ar": "الأولاد كانوا يلعبون كورة.",
     "hl": "were"
    },
    {
     "emoji": "🛁",
     "en": "She was taking a shower.",
     "ar": "كانت تتروش.",
     "hl": "taking"
    },
    {
     "emoji": "🛣️",
     "en": "We were driving to Mecca.",
     "ar": "كنا رايحين مكة بالسيارة.",
     "hl": "driving"
    },
    {
     "emoji": "💤",
     "en": "The baby was sleeping all afternoon.",
     "ar": "البيبي كان نايم طول العصر.",
     "hl": "sleeping"
    },
    {
     "emoji": "📞",
     "en": "What were you doing at nine?",
     "ar": "وش كنت تسوي الساعة تسع؟",
     "hl": "were"
    }
   ],
   "say": "was + ing At eight, I was eating dinner. The boys were playing football. She was taking a shower. We were driving to Mecca. The baby was sleeping all afternoon. What were you doing at nine?"
  }
 },
 {
  "id": "haya-72",
  "order": 72,
  "levelId": "l3",
  "titleAr": "لما و بينما: when و while",
  "titleEn": "when, while",
  "content": {
   "explanationAr": "نربط حدثين في الماضي: while (بينما) مع الشي الطويل، و when (لما) مع الشي القصير: I was reading when the phone rang.",
   "altExplanationAr": "While I was cooking, the lights went out.",
   "example": [
    {
     "en": "I was reading when the phone rang.",
     "ar": "كنت أقرأ لما رن التلفون."
    },
    {
     "en": "While I was cooking, the lights went out.",
     "ar": "وأنا أطبخ، طفت الكهربا."
    },
    {
     "en": "It started to rain while we were walking.",
     "ar": "بدت تمطر وإحنا نمشي."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I was reading ___ the phone rang.",
    "options": [
     "while",
     "what",
     "when"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ I was cooking, the lights went out.",
     "options": [
      "While",
      "When",
      "What"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "It started to rain while we were walking.",
     "options": [
      "طاحت لما كانت تركض.",
      "بدت تمطر وإحنا نمشي.",
      "الجرس رن وإحنا ناكل."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She ___ when she was running.",
     "options": [
      "falled",
      "falls",
      "fell"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "when, while"
   },
   {
    "kind": "highlight",
    "text": "when · while"
   },
   {
    "kind": "example",
    "en": "I was reading when the phone rang.",
    "ar": "كنت أقرأ لما رن التلفون."
   },
   {
    "kind": "example",
    "en": "While I was cooking, the lights went out.",
    "ar": "وأنا أطبخ، طفت الكهربا."
   }
  ],
  "kids": {
   "listTitle": "when · while",
   "cards": [
    {
     "emoji": "📞",
     "en": "I was reading when the phone rang.",
     "ar": "كنت أقرأ لما رن التلفون.",
     "hl": "when"
    },
    {
     "emoji": "🍳",
     "en": "While I was cooking, the lights went out.",
     "ar": "وأنا أطبخ، طفت الكهربا.",
     "hl": "While"
    },
    {
     "emoji": "🌧️",
     "en": "It started to rain while we were walking.",
     "ar": "بدت تمطر وإحنا نمشي.",
     "hl": "while"
    },
    {
     "emoji": "🧍",
     "en": "She fell when she was running.",
     "ar": "طاحت لما كانت تركض.",
     "hl": "fell"
    },
    {
     "emoji": "🔔",
     "en": "The bell rang while we were eating.",
     "ar": "الجرس رن وإحنا ناكل.",
     "hl": "rang"
    },
    {
     "emoji": "🚪",
     "en": "Dad came home when I was sleeping.",
     "ar": "أبوي رجع البيت لما كنت نايم.",
     "hl": "came"
    }
   ],
   "say": "when · while I was reading when the phone rang. While I was cooking, the lights went out. It started to rain while we were walking. She fell when she was running. The bell rang while we were eating. Dad came home when I was sleeping."
  }
 },
 {
  "id": "haya-73",
  "order": 73,
  "levelId": "l3",
  "titleAr": "بسوي: going to للخطط",
  "titleEn": "I'm going to...",
  "content": {
   "explanationAr": "نحكي عن خطة قررناها قبل بـ am أو is أو are going to + الفعل: I'm going to learn French.",
   "altExplanationAr": "We are going to paint the house next week.",
   "example": [
    {
     "en": "I'm going to learn French.",
     "ar": "بتعلم فرنسي."
    },
    {
     "en": "We are going to paint the house.",
     "ar": "بنصبغ البيت."
    },
    {
     "en": "She is going to visit Abha this summer.",
     "ar": "بتزور أبها هالصيف."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I'm ___ to learn French.",
    "options": [
     "going",
     "go",
     "went"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We are going to ___ the house.",
     "options": [
      "painting",
      "paint",
      "painted"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "She is going to visit Abha this summer.",
     "options": [
      "بيسوون حفلة.",
      "بيدرس طب.",
      "بتزور أبها هالصيف."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "They ___ going to have a party.",
     "options": [
      "are",
      "is",
      "am"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "I'm going to..."
   },
   {
    "kind": "highlight",
    "text": "going to (plans)"
   },
   {
    "kind": "example",
    "en": "I'm going to learn French.",
    "ar": "بتعلم فرنسي."
   },
   {
    "kind": "example",
    "en": "We are going to paint the house.",
    "ar": "بنصبغ البيت."
   }
  ],
  "kids": {
   "listTitle": "going to (plans)",
   "cards": [
    {
     "emoji": "🇫🇷",
     "en": "I'm going to learn French.",
     "ar": "بتعلم فرنسي.",
     "hl": "going"
    },
    {
     "emoji": "🎨",
     "en": "We are going to paint the house.",
     "ar": "بنصبغ البيت.",
     "hl": "paint"
    },
    {
     "emoji": "🏖️",
     "en": "She is going to visit Abha this summer.",
     "ar": "بتزور أبها هالصيف.",
     "hl": "is"
    },
    {
     "emoji": "🎂",
     "en": "They are going to have a party.",
     "ar": "بيسوون حفلة.",
     "hl": "are"
    },
    {
     "emoji": "🧑‍🎓",
     "en": "He is going to study medicine.",
     "ar": "بيدرس طب.",
     "hl": "study"
    },
    {
     "emoji": "🛒",
     "en": "Are you going to buy a new phone?",
     "ar": "بتشتري جوال جديد؟",
     "hl": "going"
    }
   ],
   "say": "going to (plans) I'm going to learn French. We are going to paint the house. She is going to visit Abha this summer. They are going to have a party. He is going to study medicine. Are you going to buy a new phone?"
  }
 },
 {
  "id": "haya-74",
  "order": 74,
  "levelId": "l3",
  "titleAr": "بيصير: going to للتوقع",
  "titleEn": "It's going to rain",
  "content": {
   "explanationAr": "لما نشوف دليل قدامنا نتوقع بـ going to: Look at the clouds! It's going to rain.",
   "altExplanationAr": "Be careful! You are going to fall.",
   "example": [
    {
     "en": "Look at the clouds! It's going to rain.",
     "ar": "شوف الغيوم! بتمطر."
    },
    {
     "en": "Be careful! You are going to fall.",
     "ar": "انتبه! بتطيح."
    },
    {
     "en": "I'm so tired. I'm going to sleep early.",
     "ar": "تعبان مرة. بنام بدري."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Look at the clouds! It's going to ___.",
    "options": [
     "rains",
     "rain",
     "rained"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Be careful! You are going to ___.",
     "options": [
      "falls",
      "fell",
      "fall"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I'm so tired. I'm going to sleep early.",
     "options": [
      "تعبان مرة. بنام بدري.",
      "استعجل! بيفوتنا الباص.",
      "البيبي جوعانة. بتصيح."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Hurry up! We are going to ___ the bus.",
     "options": [
      "missed",
      "miss",
      "misses"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "It's going to rain"
   },
   {
    "kind": "highlight",
    "text": "going to (predictions)"
   },
   {
    "kind": "example",
    "en": "Look at the clouds! It's going to rain.",
    "ar": "شوف الغيوم! بتمطر."
   },
   {
    "kind": "example",
    "en": "Be careful! You are going to fall.",
    "ar": "انتبه! بتطيح."
   }
  ],
  "kids": {
   "listTitle": "going to (predictions)",
   "cards": [
    {
     "emoji": "☁️",
     "en": "Look at the clouds! It's going to rain.",
     "ar": "شوف الغيوم! بتمطر.",
     "hl": "rain"
    },
    {
     "emoji": "⚠️",
     "en": "Be careful! You are going to fall.",
     "ar": "انتبه! بتطيح.",
     "hl": "fall"
    },
    {
     "emoji": "🥵",
     "en": "I'm so tired. I'm going to sleep early.",
     "ar": "تعبان مرة. بنام بدري.",
     "hl": "sleep"
    },
    {
     "emoji": "🚗",
     "en": "Hurry up! We are going to miss the bus.",
     "ar": "استعجل! بيفوتنا الباص.",
     "hl": "miss"
    },
    {
     "emoji": "🍼",
     "en": "The baby is hungry. She is going to cry.",
     "ar": "البيبي جوعانة. بتصيح.",
     "hl": "cry"
    },
    {
     "emoji": "🏀",
     "en": "He's going to score!",
     "ar": "بيسجل!",
     "hl": "score"
    }
   ],
   "say": "going to (predictions) Look at the clouds! It's going to rain. Be careful! You are going to fall. I'm so tired. I'm going to sleep early. Hurry up! We are going to miss the bus. The baby is hungry. She is going to cry. He's going to score!"
  }
 },
 {
  "id": "haya-75",
  "order": 75,
  "levelId": "l3",
  "titleAr": "وعود وعروض: will",
  "titleEn": "I will help",
  "content": {
   "explanationAr": "نستخدم will لما نقرر الحين أو نوعد أو نعرض مساعدة: I'll carry it for you. I will call you.",
   "altExplanationAr": "I'll: I will. I promise I'll be there.",
   "example": [
    {
     "en": "I'll carry your bag.",
     "ar": "بشيل شنطتك."
    },
    {
     "en": "I will call you tonight.",
     "ar": "بتصل عليك الليلة."
    },
    {
     "en": "I promise I'll be there.",
     "ar": "أوعدك بكون هناك."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ carry your bag.",
    "options": [
     "I'm",
     "I",
     "I'll"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I ___ call you tonight.",
     "options": [
      "will",
      "am",
      "was"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I promise I'll be there.",
     "options": [
      "استنى، بفتح الباب.",
      "أوعدك بكون هناك.",
      "بآخذ عصير لو سمحت."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Wait, I'll ___ the door.",
     "options": [
      "opens",
      "opened",
      "open"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "I will help"
   },
   {
    "kind": "highlight",
    "text": "will (offers)"
   },
   {
    "kind": "example",
    "en": "I'll carry your bag.",
    "ar": "بشيل شنطتك."
   },
   {
    "kind": "example",
    "en": "I will call you tonight.",
    "ar": "بتصل عليك الليلة."
   }
  ],
  "kids": {
   "listTitle": "will (offers)",
   "cards": [
    {
     "emoji": "🧳",
     "en": "I'll carry your bag.",
     "ar": "بشيل شنطتك.",
     "hl": "I'll"
    },
    {
     "emoji": "📞",
     "en": "I will call you tonight.",
     "ar": "بتصل عليك الليلة.",
     "hl": "will"
    },
    {
     "emoji": "🤝",
     "en": "I promise I'll be there.",
     "ar": "أوعدك بكون هناك.",
     "hl": "be"
    },
    {
     "emoji": "🚪",
     "en": "Wait, I'll open the door.",
     "ar": "استنى، بفتح الباب.",
     "hl": "open"
    },
    {
     "emoji": "🥤",
     "en": "I'll have a juice, please.",
     "ar": "بآخذ عصير لو سمحت.",
     "hl": "have"
    },
    {
     "emoji": "🧹",
     "en": "We will clean the room later.",
     "ar": "بننظف الغرفة بعدين.",
     "hl": "will"
    }
   ],
   "say": "will (offers) I'll carry your bag. I will call you tonight. I promise I'll be there. Wait, I'll open the door. I'll have a juice, please. We will clean the room later."
  }
 },
 {
  "id": "haya-76",
  "order": 76,
  "levelId": "l3",
  "titleAr": "توقعات: will و won't",
  "titleEn": "It will be, It won't be",
  "content": {
   "explanationAr": "نتوقع المستقبل بـ will، والنفي won't: will not: It will be sunny tomorrow. It won't rain.",
   "altExplanationAr": "I think you will win.",
   "example": [
    {
     "en": "It will be sunny tomorrow.",
     "ar": "بكرة بيكون الجو مشمس."
    },
    {
     "en": "It won't rain this week.",
     "ar": "ما بتمطر هالأسبوع."
    },
    {
     "en": "I think you will win.",
     "ar": "أتوقع إنك بتفوز."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "It ___ be sunny tomorrow.",
    "options": [
     "will",
     "was",
     "is"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "It ___ rain this week.",
     "options": [
      "wasn't",
      "won't",
      "don't"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I think you will win.",
     "options": [
      "الاختبار ما بيكون صعب.",
      "الناس بيعيشون على المريخ يوم من الأيام.",
      "أتوقع إنك بتفوز."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The test ___ be hard.",
     "options": [
      "won't",
      "isn't",
      "didn't"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "It will be, It won't be"
   },
   {
    "kind": "highlight",
    "text": "will · won't"
   },
   {
    "kind": "example",
    "en": "It will be sunny tomorrow.",
    "ar": "بكرة بيكون الجو مشمس."
   },
   {
    "kind": "example",
    "en": "It won't rain this week.",
    "ar": "ما بتمطر هالأسبوع."
   }
  ],
  "kids": {
   "listTitle": "will · won't",
   "cards": [
    {
     "emoji": "🌤️",
     "en": "It will be sunny tomorrow.",
     "ar": "بكرة بيكون الجو مشمس.",
     "hl": "will"
    },
    {
     "emoji": "🌂",
     "en": "It won't rain this week.",
     "ar": "ما بتمطر هالأسبوع.",
     "hl": "won't"
    },
    {
     "emoji": "🏅",
     "en": "I think you will win.",
     "ar": "أتوقع إنك بتفوز.",
     "hl": "win"
    },
    {
     "emoji": "🧪",
     "en": "The test won't be hard.",
     "ar": "الاختبار ما بيكون صعب.",
     "hl": "won't"
    },
    {
     "emoji": "🚀",
     "en": "People will live on Mars one day.",
     "ar": "الناس بيعيشون على المريخ يوم من الأيام.",
     "hl": "will"
    },
    {
     "emoji": "🎁",
     "en": "She will love your gift.",
     "ar": "بتحب هديتك.",
     "hl": "love"
    }
   ],
   "say": "will · won't It will be sunny tomorrow. It won't rain this week. I think you will win. The test won't be hard. People will live on Mars one day. She will love your gift."
  }
 },
 {
  "id": "haya-77",
  "order": 77,
  "levelId": "l3",
  "titleAr": "كلمات وقت المستقبل",
  "titleEn": "tomorrow, next, in",
  "content": {
   "explanationAr": "كلمات المستقبل: tomorrow بكرة، the day after tomorrow بعد بكرة، next week الأسبوع الجاي، in two days بعد يومين، soon قريب.",
   "altExplanationAr": "We will travel in two days.",
   "example": [
    {
     "en": "We will travel in two days.",
     "ar": "بنسافر بعد يومين."
    },
    {
     "en": "I'll see you tomorrow morning.",
     "ar": "أشوفك بكرة الصبح."
    },
    {
     "en": "School starts next Sunday.",
     "ar": "المدرسة تبدأ الأحد الجاي."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "We will travel ___ two days.",
    "options": [
     "ago",
     "in",
     "on"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I'll see you ___ morning.",
     "options": [
      "yesterday",
      "last",
      "tomorrow"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "School starts next Sunday.",
     "options": [
      "المدرسة تبدأ الأحد الجاي.",
      "الأكل بيجهز قريب.",
      "العرس بعد بكرة."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The food will be ready ___.",
     "options": [
      "ago",
      "soon",
      "last"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "tomorrow, next, in"
   },
   {
    "kind": "highlight",
    "text": "Future time words"
   },
   {
    "kind": "example",
    "en": "We will travel in two days.",
    "ar": "بنسافر بعد يومين."
   },
   {
    "kind": "example",
    "en": "I'll see you tomorrow morning.",
    "ar": "أشوفك بكرة الصبح."
   }
  ],
  "kids": {
   "listTitle": "Future time words",
   "cards": [
    {
     "emoji": "🗓️",
     "en": "We will travel in two days.",
     "ar": "بنسافر بعد يومين.",
     "hl": "in"
    },
    {
     "emoji": "🌅",
     "en": "I'll see you tomorrow morning.",
     "ar": "أشوفك بكرة الصبح.",
     "hl": "tomorrow"
    },
    {
     "emoji": "🏫",
     "en": "School starts next Sunday.",
     "ar": "المدرسة تبدأ الأحد الجاي.",
     "hl": "next"
    },
    {
     "emoji": "🔜",
     "en": "The food will be ready soon.",
     "ar": "الأكل بيجهز قريب.",
     "hl": "soon"
    },
    {
     "emoji": "🎊",
     "en": "The wedding is the day after tomorrow.",
     "ar": "العرس بعد بكرة.",
     "hl": "after"
    },
    {
     "emoji": "🏗️",
     "en": "They will finish the building next year.",
     "ar": "بيخلصون المبنى السنة الجاية.",
     "hl": "next"
    }
   ],
   "say": "Future time words We will travel in two days. I'll see you tomorrow morning. School starts next Sunday. The food will be ready soon. The wedding is the day after tomorrow. They will finish the building next year."
  }
 },
 {
  "id": "haya-78",
  "order": 78,
  "levelId": "l3",
  "titleAr": "مواعيد مرتبة: ing للمستقبل",
  "titleEn": "I'm meeting Ali tomorrow",
  "content": {
   "explanationAr": "لما يكون عندنا موعد مرتب نقدر نستخدم am أو is أو are مع ing للمستقبل: I'm meeting Ali tomorrow.",
   "altExplanationAr": "What are you doing on Saturday?",
   "example": [
    {
     "en": "I'm meeting Ali tomorrow.",
     "ar": "بقابل علي بكرة."
    },
    {
     "en": "She is seeing the dentist on Monday.",
     "ar": "عندها موعد مع دكتور الأسنان يوم الاثنين."
    },
    {
     "en": "We are flying to Dubai on Friday.",
     "ar": "بنطير دبي يوم الجمعة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I'm ___ Ali tomorrow.",
    "options": [
     "meet",
     "met",
     "meeting"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She is ___ the dentist on Monday.",
     "options": [
      "seeing",
      "see",
      "saw"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "We are flying to Dubai on Friday.",
     "options": [
      "وش بتسوي يوم السبت؟",
      "بنطير دبي يوم الجمعة.",
      "بيتعشون معنا الليلة."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "What are you ___ on Saturday?",
     "options": [
      "do",
      "did",
      "doing"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "I'm meeting Ali tomorrow"
   },
   {
    "kind": "highlight",
    "text": "Arrangements"
   },
   {
    "kind": "example",
    "en": "I'm meeting Ali tomorrow.",
    "ar": "بقابل علي بكرة."
   },
   {
    "kind": "example",
    "en": "She is seeing the dentist on Monday.",
    "ar": "عندها موعد مع دكتور الأسنان يوم الاثنين."
   }
  ],
  "kids": {
   "listTitle": "Arrangements",
   "cards": [
    {
     "emoji": "🤝",
     "en": "I'm meeting Ali tomorrow.",
     "ar": "بقابل علي بكرة.",
     "hl": "meeting"
    },
    {
     "emoji": "🩺",
     "en": "She is seeing the dentist on Monday.",
     "ar": "عندها موعد مع دكتور الأسنان يوم الاثنين.",
     "hl": "seeing"
    },
    {
     "emoji": "✈️",
     "en": "We are flying to Dubai on Friday.",
     "ar": "بنطير دبي يوم الجمعة.",
     "hl": "flying"
    },
    {
     "emoji": "📅",
     "en": "What are you doing on Saturday?",
     "ar": "وش بتسوي يوم السبت؟",
     "hl": "doing"
    },
    {
     "emoji": "🍽️",
     "en": "They are having dinner with us tonight.",
     "ar": "بيتعشون معنا الليلة.",
     "hl": "having"
    },
    {
     "emoji": "🎾",
     "en": "He is playing tennis after work.",
     "ar": "بيلعب تنس بعد الدوام.",
     "hl": "playing"
    }
   ],
   "say": "Arrangements I'm meeting Ali tomorrow. She is seeing the dentist on Monday. We are flying to Dubai on Friday. What are you doing on Saturday? They are having dinner with us tonight. He is playing tennis after work."
  }
 },
 {
  "id": "haya-79",
  "order": 79,
  "levelId": "l3",
  "titleAr": "كنت أقدر: could و couldn't",
  "titleEn": "I could, I couldn't",
  "content": {
   "explanationAr": "could هي الماضي من can: I could swim when I was five. والنفي couldn't.",
   "altExplanationAr": "I couldn't find my phone.",
   "example": [
    {
     "en": "I could swim when I was five.",
     "ar": "كنت أعرف أسبح وأنا عمري خمس."
    },
    {
     "en": "I couldn't find my phone.",
     "ar": "ما قدرت ألقى جوالي."
    },
    {
     "en": "My grandfather could speak three languages.",
     "ar": "جدي كان يعرف يتكلم ثلاث لغات."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ swim when I was five.",
    "options": [
     "could",
     "can",
     "will"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I ___ find my phone.",
     "options": [
      "can't",
      "couldn't",
      "won't"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "My grandfather could speak three languages.",
     "options": [
      "ما قدرنا ننام من الإزعاج.",
      "ما قدرت تفتح الباب.",
      "جدي كان يعرف يتكلم ثلاث لغات."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We ___ sleep because of the noise.",
     "options": [
      "couldn't",
      "can't",
      "won't"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "I could, I couldn't"
   },
   {
    "kind": "highlight",
    "text": "could"
   },
   {
    "kind": "example",
    "en": "I could swim when I was five.",
    "ar": "كنت أعرف أسبح وأنا عمري خمس."
   },
   {
    "kind": "example",
    "en": "I couldn't find my phone.",
    "ar": "ما قدرت ألقى جوالي."
   }
  ],
  "kids": {
   "listTitle": "could",
   "cards": [
    {
     "emoji": "🏊",
     "en": "I could swim when I was five.",
     "ar": "كنت أعرف أسبح وأنا عمري خمس.",
     "hl": "could"
    },
    {
     "emoji": "📱",
     "en": "I couldn't find my phone.",
     "ar": "ما قدرت ألقى جوالي.",
     "hl": "couldn't"
    },
    {
     "emoji": "🗣️",
     "en": "My grandfather could speak three languages.",
     "ar": "جدي كان يعرف يتكلم ثلاث لغات.",
     "hl": "could"
    },
    {
     "emoji": "😴",
     "en": "We couldn't sleep because of the noise.",
     "ar": "ما قدرنا ننام من الإزعاج.",
     "hl": "couldn't"
    },
    {
     "emoji": "🔐",
     "en": "She couldn't open the door.",
     "ar": "ما قدرت تفتح الباب.",
     "hl": "open"
    },
    {
     "emoji": "🙋",
     "en": "Could you hear me?",
     "ar": "كنت تسمعني؟",
     "hl": "Could"
    }
   ],
   "say": "could I could swim when I was five. I couldn't find my phone. My grandfather could speak three languages. We couldn't sleep because of the noise. She couldn't open the door. Could you hear me?"
  }
 },
 {
  "id": "haya-80",
  "order": 80,
  "levelId": "l3",
  "titleAr": "كان لازم: had to",
  "titleEn": "I had to",
  "content": {
   "explanationAr": "had to هي الماضي من have to يعني «كان لازم»: I had to wait for an hour.",
   "altExplanationAr": "We had to walk home.",
   "example": [
    {
     "en": "I had to wait for an hour.",
     "ar": "كان لازم أنتظر ساعة."
    },
    {
     "en": "We had to walk home.",
     "ar": "اضطرينا نمشي للبيت."
    },
    {
     "en": "She had to go to the doctor.",
     "ar": "كان لازم تروح للدكتور."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ to wait for an hour.",
    "options": [
     "have",
     "had",
     "has"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We had to ___ home.",
     "options": [
      "walked",
      "walking",
      "walk"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "She had to go to the doctor.",
     "options": [
      "كان لازم تروح للدكتور.",
      "كان لازم تذاكر أمس؟",
      "اضطر يشتغل لين وقت متأخر."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Did you ___ to study yesterday?",
     "options": [
      "had",
      "have",
      "has"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "I had to"
   },
   {
    "kind": "highlight",
    "text": "had to"
   },
   {
    "kind": "example",
    "en": "I had to wait for an hour.",
    "ar": "كان لازم أنتظر ساعة."
   },
   {
    "kind": "example",
    "en": "We had to walk home.",
    "ar": "اضطرينا نمشي للبيت."
   }
  ],
  "kids": {
   "listTitle": "had to",
   "cards": [
    {
     "emoji": "⏳",
     "en": "I had to wait for an hour.",
     "ar": "كان لازم أنتظر ساعة.",
     "hl": "had"
    },
    {
     "emoji": "🚶",
     "en": "We had to walk home.",
     "ar": "اضطرينا نمشي للبيت.",
     "hl": "walk"
    },
    {
     "emoji": "🧑‍⚕️",
     "en": "She had to go to the doctor.",
     "ar": "كان لازم تروح للدكتور.",
     "hl": "had"
    },
    {
     "emoji": "📚",
     "en": "Did you have to study yesterday?",
     "ar": "كان لازم تذاكر أمس؟",
     "hl": "have"
    },
    {
     "emoji": "🌙",
     "en": "He had to work late.",
     "ar": "اضطر يشتغل لين وقت متأخر.",
     "hl": "had"
    },
    {
     "emoji": "🎟️",
     "en": "We didn't have to pay.",
     "ar": "ما كان لازم ندفع.",
     "hl": "have"
    }
   ],
   "say": "had to I had to wait for an hour. We had to walk home. She had to go to the doctor. Did you have to study yesterday? He had to work late. We didn't have to pay."
  }
 },
 {
  "id": "haya-81",
  "order": 81,
  "levelId": "l3",
  "titleAr": "كنت متعود: used to",
  "titleEn": "I used to",
  "content": {
   "explanationAr": "used to نقولها لعادة كانت في الماضي وانتهت: I used to live in Taif.",
   "altExplanationAr": "My dad used to play football: أبوي كان يلعب كورة (زمان).",
   "example": [
    {
     "en": "I used to live in Taif.",
     "ar": "كنت ساكن في الطايف."
    },
    {
     "en": "My dad used to play football.",
     "ar": "أبوي كان يلعب كورة زمان."
    },
    {
     "en": "We used to eat a lot of sweets.",
     "ar": "كنا ناكل حلويات كثير."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ to live in Taif.",
    "options": [
     "use",
     "using",
     "used"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "My dad ___ to play football.",
     "options": [
      "used",
      "uses",
      "using"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "We used to eat a lot of sweets.",
     "options": [
      "الناس كانوا يشوفون أشرطة فيديو.",
      "كنا ناكل حلويات كثير.",
      "كانت خجولة مرة زمان."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "People ___ to watch videotapes.",
     "options": [
      "uses",
      "using",
      "used"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "I used to"
   },
   {
    "kind": "highlight",
    "text": "used to"
   },
   {
    "kind": "example",
    "en": "I used to live in Taif.",
    "ar": "كنت ساكن في الطايف."
   },
   {
    "kind": "example",
    "en": "My dad used to play football.",
    "ar": "أبوي كان يلعب كورة زمان."
   }
  ],
  "kids": {
   "listTitle": "used to",
   "cards": [
    {
     "emoji": "🏞️",
     "en": "I used to live in Taif.",
     "ar": "كنت ساكن في الطايف.",
     "hl": "used"
    },
    {
     "emoji": "⚽",
     "en": "My dad used to play football.",
     "ar": "أبوي كان يلعب كورة زمان.",
     "hl": "used"
    },
    {
     "emoji": "🍭",
     "en": "We used to eat a lot of sweets.",
     "ar": "كنا ناكل حلويات كثير.",
     "hl": "used"
    },
    {
     "emoji": "📼",
     "en": "People used to watch videotapes.",
     "ar": "الناس كانوا يشوفون أشرطة فيديو.",
     "hl": "used"
    },
    {
     "emoji": "🧒",
     "en": "She used to be very shy.",
     "ar": "كانت خجولة مرة زمان.",
     "hl": "be"
    },
    {
     "emoji": "🐫",
     "en": "Did you use to ride camels?",
     "ar": "كنت تركب جمال زمان؟",
     "hl": "use"
    }
   ],
   "say": "used to I used to live in Taif. My dad used to play football. We used to eat a lot of sweets. People used to watch videotapes. She used to be very shy. Did you use to ride camels?"
  }
 },
 {
  "id": "haya-82",
  "order": 82,
  "levelId": "l3",
  "titleAr": "هل جربت؟ have been و ever",
  "titleEn": "Have you ever...?",
  "content": {
   "explanationAr": "Have you ever معناها «هل جربت يومًا؟»: Have you ever been to London? ونجاوب: I have never been there.",
   "altExplanationAr": "I have been to Egypt twice.",
   "example": [
    {
     "en": "Have you ever been to London?",
     "ar": "قد رحت لندن؟"
    },
    {
     "en": "I have been to Egypt twice.",
     "ar": "رحت مصر مرتين."
    },
    {
     "en": "Have you ever tried sushi?",
     "ar": "قد جربت سوشي؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Have you ever ___ to London?",
    "options": [
     "been",
     "gone",
     "went"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I ___ been to Egypt twice.",
     "options": [
      "has",
      "have",
      "had"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Have you ever tried sushi?",
     "options": [
      "عمري ما شفت ثلج.",
      "قد طارت في طيارة كبيرة.",
      "قد جربت سوشي؟"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I have ___ seen snow.",
     "options": [
      "never",
      "ever",
      "yet"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Have you ever...?"
   },
   {
    "kind": "highlight",
    "text": "Present perfect: ever"
   },
   {
    "kind": "example",
    "en": "Have you ever been to London?",
    "ar": "قد رحت لندن؟"
   },
   {
    "kind": "example",
    "en": "I have been to Egypt twice.",
    "ar": "رحت مصر مرتين."
   }
  ],
  "kids": {
   "listTitle": "Present perfect: ever",
   "cards": [
    {
     "emoji": "🇬🇧",
     "en": "Have you ever been to London?",
     "ar": "قد رحت لندن؟",
     "hl": "been"
    },
    {
     "emoji": "🇪🇬",
     "en": "I have been to Egypt twice.",
     "ar": "رحت مصر مرتين.",
     "hl": "have"
    },
    {
     "emoji": "🍣",
     "en": "Have you ever tried sushi?",
     "ar": "قد جربت سوشي؟",
     "hl": "tried"
    },
    {
     "emoji": "🙅",
     "en": "I have never seen snow.",
     "ar": "عمري ما شفت ثلج.",
     "hl": "never"
    },
    {
     "emoji": "✈️",
     "en": "She has flown on a big plane.",
     "ar": "قد طارت في طيارة كبيرة.",
     "hl": "has"
    },
    {
     "emoji": "🐬",
     "en": "Has he ever swum with dolphins?",
     "ar": "قد سبح مع الدلافين؟",
     "hl": "swum"
    }
   ],
   "say": "Present perfect: ever Have you ever been to London? I have been to Egypt twice. Have you ever tried sushi? I have never seen snow. She has flown on a big plane. Has he ever swum with dolphins?"
  }
 },
 {
  "id": "haya-83",
  "order": 83,
  "levelId": "l3",
  "titleAr": "just و already و yet",
  "titleEn": "I've just, already, yet",
  "content": {
   "explanationAr": "just يعني «توّ»، already يعني «من قبل أو خلاص»، و yet في الأسئلة والنفي يعني «للحين».",
   "altExplanationAr": "I've just finished. Have you eaten yet?",
   "example": [
    {
     "en": "I've just finished my homework.",
     "ar": "توّني خلصت واجبي."
    },
    {
     "en": "We have already eaten.",
     "ar": "خلاص أكلنا."
    },
    {
     "en": "Have you eaten yet?",
     "ar": "أكلت ولا للحين؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I've ___ finished my homework.",
    "options": [
     "yet",
     "just",
     "ever"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We have ___ eaten.",
     "options": [
      "yet",
      "ever",
      "already"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Have you eaten yet?",
     "options": [
      "أكلت ولا للحين؟",
      "للحين ما ردت.",
      "الباص توه مشى."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She hasn't replied ___.",
     "options": [
      "already",
      "yet",
      "just"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "I've just, already, yet"
   },
   {
    "kind": "highlight",
    "text": "just · already · yet"
   },
   {
    "kind": "example",
    "en": "I've just finished my homework.",
    "ar": "توّني خلصت واجبي."
   },
   {
    "kind": "example",
    "en": "We have already eaten.",
    "ar": "خلاص أكلنا."
   }
  ],
  "kids": {
   "listTitle": "just · already · yet",
   "cards": [
    {
     "emoji": "✅",
     "en": "I've just finished my homework.",
     "ar": "توّني خلصت واجبي.",
     "hl": "just"
    },
    {
     "emoji": "🍽️",
     "en": "We have already eaten.",
     "ar": "خلاص أكلنا.",
     "hl": "already"
    },
    {
     "emoji": "❓",
     "en": "Have you eaten yet?",
     "ar": "أكلت ولا للحين؟",
     "hl": "yet"
    },
    {
     "emoji": "📩",
     "en": "She hasn't replied yet.",
     "ar": "للحين ما ردت.",
     "hl": "yet"
    },
    {
     "emoji": "🚌",
     "en": "The bus has just left.",
     "ar": "الباص توه مشى.",
     "hl": "just"
    },
    {
     "emoji": "🎟️",
     "en": "I have already bought the tickets.",
     "ar": "اشتريت التذاكر من قبل.",
     "hl": "already"
    }
   ],
   "say": "just · already · yet I've just finished my homework. We have already eaten. Have you eaten yet? She hasn't replied yet. The bus has just left. I have already bought the tickets."
  }
 },
 {
  "id": "haya-84",
  "order": 84,
  "levelId": "l3",
  "titleAr": "أكبر من: المقارنة في جمل",
  "titleEn": "Taller than",
  "content": {
   "explanationAr": "نقارن بـ er + than: My brother is taller than me. ومع الكلمات الطويلة more: more beautiful than.",
   "altExplanationAr": "Riyadh is bigger than Abha.",
   "example": [
    {
     "en": "My brother is older than me.",
     "ar": "أخوي أكبر مني."
    },
    {
     "en": "Riyadh is bigger than Abha.",
     "ar": "الرياض أكبر من أبها."
    },
    {
     "en": "A cheetah runs faster than a lion.",
     "ar": "الفهد يركض أسرع من الأسد."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "My brother is ___ than me.",
    "options": [
     "old",
     "oldest",
     "older"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Riyadh is bigger ___ Abha.",
     "options": [
      "than",
      "then",
      "that"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "A cheetah runs faster than a lion.",
     "options": [
      "الذهب أغلى من الفضة.",
      "الفهد يركض أسرع من الأسد.",
      "اليوم أحر من أمس."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Gold is ___ expensive than silver.",
     "options": [
      "most",
      "much",
      "more"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Taller than"
   },
   {
    "kind": "highlight",
    "text": "Comparatives"
   },
   {
    "kind": "example",
    "en": "My brother is older than me.",
    "ar": "أخوي أكبر مني."
   },
   {
    "kind": "example",
    "en": "Riyadh is bigger than Abha.",
    "ar": "الرياض أكبر من أبها."
   }
  ],
  "kids": {
   "listTitle": "Comparatives",
   "cards": [
    {
     "emoji": "🧍",
     "en": "My brother is older than me.",
     "ar": "أخوي أكبر مني.",
     "hl": "older"
    },
    {
     "emoji": "🏙️",
     "en": "Riyadh is bigger than Abha.",
     "ar": "الرياض أكبر من أبها.",
     "hl": "than"
    },
    {
     "emoji": "🐆",
     "en": "A cheetah runs faster than a lion.",
     "ar": "الفهد يركض أسرع من الأسد.",
     "hl": "faster"
    },
    {
     "emoji": "💍",
     "en": "Gold is more expensive than silver.",
     "ar": "الذهب أغلى من الفضة.",
     "hl": "more"
    },
    {
     "emoji": "🌡️",
     "en": "Today is hotter than yesterday.",
     "ar": "اليوم أحر من أمس.",
     "hl": "hotter"
    },
    {
     "emoji": "📗",
     "en": "This book is more interesting than that one.",
     "ar": "هالكتاب أمتع من ذاك.",
     "hl": "more"
    }
   ],
   "say": "Comparatives My brother is older than me. Riyadh is bigger than Abha. A cheetah runs faster than a lion. Gold is more expensive than silver. Today is hotter than yesterday. This book is more interesting than that one."
  }
 },
 {
  "id": "haya-85",
  "order": 85,
  "levelId": "l3",
  "titleAr": "الأحسن: أعلى درجة في جمل",
  "titleEn": "The best, the tallest",
  "content": {
   "explanationAr": "لأعلى درجة نقول the + est: the tallest، أو the most مع الكلمات الطويلة: the most famous.",
   "altExplanationAr": "Burj Khalifa is the tallest building in the world.",
   "example": [
    {
     "en": "Burj Khalifa is the tallest building in the world.",
     "ar": "برج خليفة أطول مبنى في العالم."
    },
    {
     "en": "My mom is the best cook.",
     "ar": "أمي أحسن طباخة."
    },
    {
     "en": "The blue whale is the biggest animal.",
     "ar": "الحوت الأزرق أكبر حيوان."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Burj Khalifa is the ___ building in the world.",
    "options": [
     "tallest",
     "taller",
     "tall"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "My mom is the ___ cook.",
     "options": [
      "better",
      "best",
      "good"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "The blue whale is the biggest animal.",
     "options": [
      "هو أشهر لاعب في الفريق.",
      "مين أسرع عداء في فصلك؟",
      "الحوت الأزرق أكبر حيوان."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He is the ___ famous player in the team.",
     "options": [
      "most",
      "more",
      "much"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The best, the tallest"
   },
   {
    "kind": "highlight",
    "text": "Superlatives"
   },
   {
    "kind": "example",
    "en": "Burj Khalifa is the tallest building in the world.",
    "ar": "برج خليفة أطول مبنى في العالم."
   },
   {
    "kind": "example",
    "en": "My mom is the best cook.",
    "ar": "أمي أحسن طباخة."
   }
  ],
  "kids": {
   "listTitle": "Superlatives",
   "cards": [
    {
     "emoji": "🏙️",
     "en": "Burj Khalifa is the tallest building in the world.",
     "ar": "برج خليفة أطول مبنى في العالم.",
     "hl": "tallest"
    },
    {
     "emoji": "👩‍🍳",
     "en": "My mom is the best cook.",
     "ar": "أمي أحسن طباخة.",
     "hl": "best"
    },
    {
     "emoji": "🐋",
     "en": "The blue whale is the biggest animal.",
     "ar": "الحوت الأزرق أكبر حيوان.",
     "hl": "biggest"
    },
    {
     "emoji": "🌟",
     "en": "He is the most famous player in the team.",
     "ar": "هو أشهر لاعب في الفريق.",
     "hl": "most"
    },
    {
     "emoji": "🥇",
     "en": "Who is the fastest runner in your class?",
     "ar": "مين أسرع عداء في فصلك؟",
     "hl": "fastest"
    },
    {
     "emoji": "🗓️",
     "en": "This was the worst day of the year!",
     "ar": "كان هذا أسوأ يوم في السنة!",
     "hl": "worst"
    }
   ],
   "say": "Superlatives Burj Khalifa is the tallest building in the world. My mom is the best cook. The blue whale is the biggest animal. He is the most famous player in the team. Who is the fastest runner in your class? This was the worst day of the year!"
  }
 },
 {
  "id": "haya-86",
  "order": 86,
  "levelId": "l3",
  "titleAr": "أحكي قصة",
  "titleEn": "Telling a Story",
  "content": {
   "explanationAr": "نرتب القصة بكلمات: First أول شي، Then بعدين، After that بعد كذا، Suddenly فجأة، In the end في النهاية.",
   "altExplanationAr": "First we went to the beach. Suddenly it started to rain.",
   "example": [
    {
     "en": "First, we drove to the beach.",
     "ar": "أول شي، رحنا للبحر بالسيارة."
    },
    {
     "en": "Then we built a sandcastle.",
     "ar": "بعدين بنينا قلعة رمل."
    },
    {
     "en": "Suddenly, it started to rain.",
     "ar": "فجأة بدت تمطر."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___, we drove to the beach.",
    "options": [
     "Last",
     "First",
     "Finally"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ we built a sandcastle.",
     "options": [
      "First",
      "Before",
      "Then"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Suddenly, it started to rain.",
     "options": [
      "فجأة بدت تمطر.",
      "بعد كذا ركضنا للسيارة.",
      "شربنا شاي حار في السيارة."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ that, we ran to the car.",
     "options": [
      "Before",
      "After",
      "First"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Telling a Story"
   },
   {
    "kind": "highlight",
    "text": "Telling a story"
   },
   {
    "kind": "example",
    "en": "First, we drove to the beach.",
    "ar": "أول شي، رحنا للبحر بالسيارة."
   },
   {
    "kind": "example",
    "en": "Then we built a sandcastle.",
    "ar": "بعدين بنينا قلعة رمل."
   }
  ],
  "kids": {
   "listTitle": "Telling a story",
   "cards": [
    {
     "emoji": "1️⃣",
     "en": "First, we drove to the beach.",
     "ar": "أول شي، رحنا للبحر بالسيارة.",
     "hl": "First"
    },
    {
     "emoji": "🏖️",
     "en": "Then we built a sandcastle.",
     "ar": "بعدين بنينا قلعة رمل.",
     "hl": "Then"
    },
    {
     "emoji": "⛈️",
     "en": "Suddenly, it started to rain.",
     "ar": "فجأة بدت تمطر.",
     "hl": "Suddenly"
    },
    {
     "emoji": "🏃",
     "en": "After that, we ran to the car.",
     "ar": "بعد كذا ركضنا للسيارة.",
     "hl": "After"
    },
    {
     "emoji": "☕",
     "en": "We drank hot tea in the car.",
     "ar": "شربنا شاي حار في السيارة.",
     "hl": "drank"
    },
    {
     "emoji": "😄",
     "en": "In the end, it was a fun day.",
     "ar": "في النهاية، كان يوم حلو.",
     "hl": "end"
    }
   ],
   "say": "Telling a story First, we drove to the beach. Then we built a sandcastle. Suddenly, it started to rain. After that, we ran to the car. We drank hot tea in the car. In the end, it was a fun day."
  }
 },
 {
  "id": "haya-87",
  "order": 87,
  "levelId": "l3",
  "titleAr": "ويكندي",
  "titleEn": "My Weekend",
  "content": {
   "explanationAr": "نحكي عن الويكند بالماضي: On Friday I visited my grandparents. On Saturday I played with my cousins.",
   "altExplanationAr": "What did you do at the weekend?",
   "example": [
    {
     "en": "On Friday, I visited my grandparents.",
     "ar": "يوم الجمعة زرت جدي وجدتي."
    },
    {
     "en": "We had kabsa for lunch.",
     "ar": "تغدينا كبسة."
    },
    {
     "en": "I played with my cousins in the yard.",
     "ar": "لعبت مع عيال عمي في الحوش."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "On Friday, I ___ my grandparents.",
    "options": [
     "visit",
     "visits",
     "visited"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We ___ kabsa for lunch.",
     "options": [
      "had",
      "have",
      "has"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I played with my cousins in the yard.",
     "options": [
      "يوم السبت رحنا المول.",
      "لعبت مع عيال عمي في الحوش.",
      "أختي اشترت جاكيت جديد."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "On Saturday, we ___ to the mall.",
     "options": [
      "go",
      "goes",
      "went"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "My Weekend"
   },
   {
    "kind": "highlight",
    "text": "My weekend"
   },
   {
    "kind": "example",
    "en": "On Friday, I visited my grandparents.",
    "ar": "يوم الجمعة زرت جدي وجدتي."
   },
   {
    "kind": "example",
    "en": "We had kabsa for lunch.",
    "ar": "تغدينا كبسة."
   }
  ],
  "kids": {
   "listTitle": "My weekend",
   "cards": [
    {
     "emoji": "👵",
     "en": "On Friday, I visited my grandparents.",
     "ar": "يوم الجمعة زرت جدي وجدتي.",
     "hl": "visited"
    },
    {
     "emoji": "🍚",
     "en": "We had kabsa for lunch.",
     "ar": "تغدينا كبسة.",
     "hl": "had"
    },
    {
     "emoji": "🧒",
     "en": "I played with my cousins in the yard.",
     "ar": "لعبت مع عيال عمي في الحوش.",
     "hl": "played"
    },
    {
     "emoji": "🛍️",
     "en": "On Saturday, we went to the mall.",
     "ar": "يوم السبت رحنا المول.",
     "hl": "went"
    },
    {
     "emoji": "👕",
     "en": "My sister bought a new jacket.",
     "ar": "أختي اشترت جاكيت جديد.",
     "hl": "bought"
    },
    {
     "emoji": "😴",
     "en": "I was tired, so I slept early.",
     "ar": "كنت تعبان، فنمت بدري.",
     "hl": "slept"
    }
   ],
   "say": "My weekend On Friday, I visited my grandparents. We had kabsa for lunch. I played with my cousins in the yard. On Saturday, we went to the mall. My sister bought a new jacket. I was tired, so I slept early."
  }
 },
 {
  "id": "haya-88",
  "order": 88,
  "levelId": "l3",
  "titleAr": "مراجعة الماضي",
  "titleEn": "Review: The Past",
  "content": {
   "explanationAr": "نراجع الماضي: was و were، و ed، والأفعال الشاذة، و didn't و Did.",
   "altExplanationAr": "I went. I didn't go. Did you go?",
   "example": [
    {
     "en": "We were in Al-Ula last spring.",
     "ar": "كنا في العلا الربيع اللي فات."
    },
    {
     "en": "I painted a picture of the desert.",
     "ar": "رسمت لوحة للصحراء."
    },
    {
     "en": "My cousin flew to Canada.",
     "ar": "ولد عمي طار لكندا."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "We ___ in Al-Ula last spring.",
    "options": [
     "were",
     "was",
     "are"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I ___ a picture of the desert.",
     "options": [
      "paint",
      "painted",
      "paints"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "My cousin flew to Canada.",
     "options": [
      "ما جابت شنطتها.",
      "رحت الملعب؟",
      "ولد عمي طار لكندا."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She didn't ___ her bag.",
     "options": [
      "bring",
      "brought",
      "brings"
     ],
     "correctIndex": 0
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
    "en": "We were in Al-Ula last spring.",
    "ar": "كنا في العلا الربيع اللي فات."
   },
   {
    "kind": "example",
    "en": "I painted a picture of the desert.",
    "ar": "رسمت لوحة للصحراء."
   }
  ],
  "kids": {
   "listTitle": "Review",
   "cards": [
    {
     "emoji": "🌴",
     "en": "We were in Al-Ula last spring.",
     "ar": "كنا في العلا الربيع اللي فات.",
     "hl": "were"
    },
    {
     "emoji": "🖼️",
     "en": "I painted a picture of the desert.",
     "ar": "رسمت لوحة للصحراء.",
     "hl": "painted"
    },
    {
     "emoji": "🛫",
     "en": "My cousin flew to Canada.",
     "ar": "ولد عمي طار لكندا.",
     "hl": "flew"
    },
    {
     "emoji": "🎒",
     "en": "She didn't bring her bag.",
     "ar": "ما جابت شنطتها.",
     "hl": "bring"
    },
    {
     "emoji": "🏟️",
     "en": "Did you go to the stadium?",
     "ar": "رحت الملعب؟",
     "hl": "go"
    },
    {
     "emoji": "📨",
     "en": "Who sent you this message?",
     "ar": "مين أرسل لك هالرسالة؟",
     "hl": "sent"
    }
   ],
   "say": "Review We were in Al-Ula last spring. I painted a picture of the desert. My cousin flew to Canada. She didn't bring her bag. Did you go to the stadium? Who sent you this message?"
  }
 },
 {
  "id": "haya-89",
  "order": 89,
  "levelId": "l3",
  "titleAr": "مراجعة المستقبل",
  "titleEn": "Review: The Future",
  "content": {
   "explanationAr": "نراجع المستقبل: going to للخطط والتوقع بدليل، و will للقرار السريع والوعد والتوقع، و ing للمواعيد.",
   "altExplanationAr": "I'm going to travel. I'll help you. I'm meeting Ali.",
   "example": [
    {
     "en": "We are going to do Umrah in Ramadan.",
     "ar": "بنسوي عمرة في رمضان."
    },
    {
     "en": "It's cold. I'll close the window.",
     "ar": "الجو بارد. بسكّر الشباك."
    },
    {
     "en": "I think it will be hot tomorrow.",
     "ar": "أتوقع بكرة بيكون حر."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "We are ___ to do Umrah in Ramadan.",
    "options": [
     "go",
     "going",
     "went"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "It's cold. I'll ___ the window.",
     "options": [
      "closes",
      "closed",
      "close"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I think it will be hot tomorrow.",
     "options": [
      "أتوقع بكرة بيكون حر.",
      "بتبدأ وظيفتها الجديدة يوم الأحد.",
      "ما بنسى يوم ميلادك."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She is ___ her new job on Sunday.",
     "options": [
      "start",
      "starting",
      "started"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Review: The Future"
   },
   {
    "kind": "highlight",
    "text": "Review"
   },
   {
    "kind": "example",
    "en": "We are going to do Umrah in Ramadan.",
    "ar": "بنسوي عمرة في رمضان."
   },
   {
    "kind": "example",
    "en": "It's cold. I'll close the window.",
    "ar": "الجو بارد. بسكّر الشباك."
   }
  ],
  "kids": {
   "listTitle": "Review",
   "cards": [
    {
     "emoji": "🕋",
     "en": "We are going to do Umrah in Ramadan.",
     "ar": "بنسوي عمرة في رمضان.",
     "hl": "going"
    },
    {
     "emoji": "🧊",
     "en": "It's cold. I'll close the window.",
     "ar": "الجو بارد. بسكّر الشباك.",
     "hl": "close"
    },
    {
     "emoji": "🌡️",
     "en": "I think it will be hot tomorrow.",
     "ar": "أتوقع بكرة بيكون حر.",
     "hl": "will"
    },
    {
     "emoji": "🏥",
     "en": "She is starting her new job on Sunday.",
     "ar": "بتبدأ وظيفتها الجديدة يوم الأحد.",
     "hl": "starting"
    },
    {
     "emoji": "🙅",
     "en": "I won't forget your birthday.",
     "ar": "ما بنسى يوم ميلادك.",
     "hl": "won't"
    },
    {
     "emoji": "🚆",
     "en": "Are you taking the train to Medina?",
     "ar": "بتاخذ القطار للمدينة؟",
     "hl": "taking"
    }
   ],
   "say": "Review We are going to do Umrah in Ramadan. It's cold. I'll close the window. I think it will be hot tomorrow. She is starting her new job on Sunday. I won't forget your birthday. Are you taking the train to Medina?"
  }
 },
 {
  "id": "haya-90",
  "order": 90,
  "levelId": "l3",
  "titleAr": "مراجعة المستوى الثالث",
  "titleEn": "Level 3 Review",
  "content": {
   "explanationAr": "مراجعة المستوى الثالث كله: الماضي، الماضي المستمر، المستقبل، could و had to و used to، والمقارنة.",
   "altExplanationAr": "اقرأ الجملة، وفكر: هل هي ماضي ولا حاضر ولا مستقبل؟",
   "example": [
    {
     "en": "I was watching TV when you called.",
     "ar": "كنت أشوف تلفزيون لما اتصلت."
    },
    {
     "en": "I used to walk to school.",
     "ar": "كنت أمشي للمدرسة زمان."
    },
    {
     "en": "We had to use a torch.",
     "ar": "اضطرينا نستخدم كشاف."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I was ___ TV when you called.",
    "options": [
     "watch",
     "watched",
     "watching"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I ___ to walk to school.",
     "options": [
      "used",
      "use",
      "uses"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "We had to use a torch.",
     "options": [
      "قد أكلت لحم جمل؟",
      "اضطرينا نستخدم كشاف.",
      "هالجبل أعلى من ذاك."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Have you ever ___ camel meat?",
     "options": [
      "ate",
      "eat",
      "eaten"
     ],
     "correctIndex": 2
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
    "en": "I was watching TV when you called.",
    "ar": "كنت أشوف تلفزيون لما اتصلت."
   },
   {
    "kind": "example",
    "en": "I used to walk to school.",
    "ar": "كنت أمشي للمدرسة زمان."
   }
  ],
  "kids": {
   "listTitle": "Level 3 Review",
   "cards": [
    {
     "emoji": "📺",
     "en": "I was watching TV when you called.",
     "ar": "كنت أشوف تلفزيون لما اتصلت.",
     "hl": "watching"
    },
    {
     "emoji": "🏫",
     "en": "I used to walk to school.",
     "ar": "كنت أمشي للمدرسة زمان.",
     "hl": "used"
    },
    {
     "emoji": "🔦",
     "en": "We had to use a torch.",
     "ar": "اضطرينا نستخدم كشاف.",
     "hl": "had"
    },
    {
     "emoji": "🧊",
     "en": "Have you ever eaten camel meat?",
     "ar": "قد أكلت لحم جمل؟",
     "hl": "eaten"
    },
    {
     "emoji": "🏔️",
     "en": "This mountain is higher than that one.",
     "ar": "هالجبل أعلى من ذاك.",
     "hl": "higher"
    },
    {
     "emoji": "🌠",
     "en": "Next year will be a great year.",
     "ar": "السنة الجاية بتكون سنة رهيبة.",
     "hl": "will"
    }
   ],
   "say": "Level 3 Review I was watching TV when you called. I used to walk to school. We had to use a torch. Have you ever eaten camel meat? This mountain is higher than that one. Next year will be a great year."
  }
 },
 {
  "id": "haya-91",
  "order": 91,
  "levelId": "l4",
  "titleAr": "التعارف",
  "titleEn": "Meeting People",
  "content": {
   "explanationAr": "لما نتعرف على أحد نقول: Nice to meet you تشرفنا، This is my friend هذا صديقي، Where are you from? من وين أنت؟",
   "altExplanationAr": "Hi, I'm Haya. Nice to meet you.",
   "example": [
    {
     "en": "Nice to meet you.",
     "ar": "تشرفنا."
    },
    {
     "en": "Hi, I'm Haya. What's your name?",
     "ar": "هلا، أنا هيا. وش اسمك؟"
    },
    {
     "en": "This is my friend Reem.",
     "ar": "هذي صديقتي ريم."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Nice to ___ you.",
    "options": [
     "meet",
     "meeting",
     "met"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Hi, I'm Haya. ___ your name?",
     "options": [
      "Who's",
      "What's",
      "Where's"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "This is my friend Reem.",
     "options": [
      "أنا من السعودية.",
      "وش تشتغل؟ أنا ممرضة.",
      "هذي صديقتي ريم."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I'm ___ Saudi Arabia.",
     "options": [
      "from",
      "of",
      "in"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Meeting People"
   },
   {
    "kind": "highlight",
    "text": "Introductions"
   },
   {
    "kind": "example",
    "en": "Nice to meet you.",
    "ar": "تشرفنا."
   },
   {
    "kind": "example",
    "en": "Hi, I'm Haya. What's your name?",
    "ar": "هلا، أنا هيا. وش اسمك؟"
   }
  ],
  "kids": {
   "listTitle": "Introductions",
   "cards": [
    {
     "emoji": "🤝",
     "en": "Nice to meet you.",
     "ar": "تشرفنا.",
     "hl": "meet"
    },
    {
     "emoji": "👋",
     "en": "Hi, I'm Haya. What's your name?",
     "ar": "هلا، أنا هيا. وش اسمك؟",
     "hl": "What's"
    },
    {
     "emoji": "🧑‍🤝‍🧑",
     "en": "This is my friend Reem.",
     "ar": "هذي صديقتي ريم.",
     "hl": "This"
    },
    {
     "emoji": "🌍",
     "en": "I'm from Saudi Arabia.",
     "ar": "أنا من السعودية.",
     "hl": "from"
    },
    {
     "emoji": "💼",
     "en": "What do you do? I'm a nurse.",
     "ar": "وش تشتغل؟ أنا ممرضة.",
     "hl": "nurse"
    },
    {
     "emoji": "😊",
     "en": "Nice to meet you too.",
     "ar": "وأنا تشرفت بك.",
     "hl": "too"
    }
   ],
   "say": "Introductions Nice to meet you. Hi, I'm Haya. What's your name? This is my friend Reem. I'm from Saudi Arabia. What do you do? I'm a nurse. Nice to meet you too."
  }
 },
 {
  "id": "haya-92",
  "order": 92,
  "levelId": "l4",
  "titleAr": "في المطار",
  "titleEn": "At the Airport",
  "content": {
   "explanationAr": "جمل المطار: passport جواز، boarding pass بطاقة صعود، gate بوابة، Where do I check in? وين أخلص إجراءات السفر؟",
   "altExplanationAr": "Can I see your passport, please?",
   "example": [
    {
     "en": "Can I see your passport, please?",
     "ar": "ممكن أشوف جوازك لو سمحت؟"
    },
    {
     "en": "Here is your boarding pass.",
     "ar": "هذي بطاقة صعودك."
    },
    {
     "en": "Your flight leaves from Gate 12.",
     "ar": "رحلتك تطلع من بوابة ١٢."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Can I see your ___, please?",
    "options": [
     "password",
     "passport",
     "passenger"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Here is your ___ pass.",
     "options": [
      "board",
      "boarded",
      "boarding"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Your flight leaves from Gate 12.",
     "options": [
      "رحلتك تطلع من بوابة ١٢.",
      "كم شنطة عندك؟",
      "الرحلة متأخرة."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "How many ___ do you have?",
     "options": [
      "bag",
      "bags",
      "bagging"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "At the Airport"
   },
   {
    "kind": "highlight",
    "text": "At the airport"
   },
   {
    "kind": "example",
    "en": "Can I see your passport, please?",
    "ar": "ممكن أشوف جوازك لو سمحت؟"
   },
   {
    "kind": "example",
    "en": "Here is your boarding pass.",
    "ar": "هذي بطاقة صعودك."
   }
  ],
  "kids": {
   "listTitle": "At the airport",
   "cards": [
    {
     "emoji": "🛂",
     "en": "Can I see your passport, please?",
     "ar": "ممكن أشوف جوازك لو سمحت؟",
     "hl": "passport"
    },
    {
     "emoji": "🎫",
     "en": "Here is your boarding pass.",
     "ar": "هذي بطاقة صعودك.",
     "hl": "boarding"
    },
    {
     "emoji": "🚪",
     "en": "Your flight leaves from Gate 12.",
     "ar": "رحلتك تطلع من بوابة ١٢.",
     "hl": "leaves"
    },
    {
     "emoji": "🧳",
     "en": "How many bags do you have?",
     "ar": "كم شنطة عندك؟",
     "hl": "bags"
    },
    {
     "emoji": "⏰",
     "en": "The flight is delayed.",
     "ar": "الرحلة متأخرة.",
     "hl": "delayed"
    },
    {
     "emoji": "🪟",
     "en": "I'd like a window seat, please.",
     "ar": "أبي كرسي جنب الشباك لو سمحت.",
     "hl": "window"
    }
   ],
   "say": "At the airport Can I see your passport, please? Here is your boarding pass. Your flight leaves from Gate 12. How many bags do you have? The flight is delayed. I'd like a window seat, please."
  }
 },
 {
  "id": "haya-93",
  "order": 93,
  "levelId": "l4",
  "titleAr": "في الفندق",
  "titleEn": "At the Hotel",
  "content": {
   "explanationAr": "جمل الفندق: I have a booking عندي حجز، What time is breakfast? متى الفطور؟، The air conditioner doesn't work المكيف ما يشتغل.",
   "altExplanationAr": "I'd like to check out, please.",
   "example": [
    {
     "en": "I have a booking for two nights.",
     "ar": "عندي حجز لليلتين."
    },
    {
     "en": "Here is your room key.",
     "ar": "هذا مفتاح غرفتك."
    },
    {
     "en": "What time is breakfast?",
     "ar": "متى الفطور؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I have a ___ for two nights.",
    "options": [
     "book",
     "booked",
     "booking"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Here is your room ___.",
     "options": [
      "key",
      "keys",
      "card"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "What time is breakfast?",
     "options": [
      "المكيف ما يشتغل.",
      "متى الفطور؟",
      "ممكن مناشف زيادة لو سمحت؟"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The air conditioner ___ work.",
     "options": [
      "don't",
      "isn't",
      "doesn't"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "At the Hotel"
   },
   {
    "kind": "highlight",
    "text": "At the hotel"
   },
   {
    "kind": "example",
    "en": "I have a booking for two nights.",
    "ar": "عندي حجز لليلتين."
   },
   {
    "kind": "example",
    "en": "Here is your room key.",
    "ar": "هذا مفتاح غرفتك."
   }
  ],
  "kids": {
   "listTitle": "At the hotel",
   "cards": [
    {
     "emoji": "🛎️",
     "en": "I have a booking for two nights.",
     "ar": "عندي حجز لليلتين.",
     "hl": "booking"
    },
    {
     "emoji": "🔑",
     "en": "Here is your room key.",
     "ar": "هذا مفتاح غرفتك.",
     "hl": "key"
    },
    {
     "emoji": "🥐",
     "en": "What time is breakfast?",
     "ar": "متى الفطور؟",
     "hl": "time"
    },
    {
     "emoji": "❄️",
     "en": "The air conditioner doesn't work.",
     "ar": "المكيف ما يشتغل.",
     "hl": "doesn't"
    },
    {
     "emoji": "🧺",
     "en": "Can I have more towels, please?",
     "ar": "ممكن مناشف زيادة لو سمحت؟",
     "hl": "more"
    },
    {
     "emoji": "🚪",
     "en": "I'd like to check out, please.",
     "ar": "أبي أسوي تشيك آوت لو سمحت.",
     "hl": "out"
    }
   ],
   "say": "At the hotel I have a booking for two nights. Here is your room key. What time is breakfast? The air conditioner doesn't work. Can I have more towels, please? I'd like to check out, please."
  }
 },
 {
  "id": "haya-94",
  "order": 94,
  "levelId": "l4",
  "titleAr": "عند الدكتور",
  "titleEn": "At the Doctor",
  "content": {
   "explanationAr": "عند الدكتور نقول وش يوجعنا: I have a headache راسي يوجعني، My stomach hurts بطني يوجعني، I have a fever عندي حرارة.",
   "altExplanationAr": "What's the matter? I have a sore throat.",
   "example": [
    {
     "en": "What's the matter?",
     "ar": "وش فيك؟"
    },
    {
     "en": "I have a headache.",
     "ar": "راسي يوجعني."
    },
    {
     "en": "My stomach hurts.",
     "ar": "بطني يوجعني."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "What's the ___?",
    "options": [
     "matter",
     "problem",
     "wrong"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I have a ___.",
     "options": [
      "head",
      "headache",
      "ache"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "My stomach hurts.",
     "options": [
      "عندي حرارة مرتفعة.",
      "حلقي ملتهب.",
      "بطني يوجعني."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I have a high ___.",
     "options": [
      "fever",
      "cold",
      "hot"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "At the Doctor"
   },
   {
    "kind": "highlight",
    "text": "At the doctor"
   },
   {
    "kind": "example",
    "en": "What's the matter?",
    "ar": "وش فيك؟"
   },
   {
    "kind": "example",
    "en": "I have a headache.",
    "ar": "راسي يوجعني."
   }
  ],
  "kids": {
   "listTitle": "At the doctor",
   "cards": [
    {
     "emoji": "🩺",
     "en": "What's the matter?",
     "ar": "وش فيك؟",
     "hl": "matter"
    },
    {
     "emoji": "🤕",
     "en": "I have a headache.",
     "ar": "راسي يوجعني.",
     "hl": "headache"
    },
    {
     "emoji": "🤢",
     "en": "My stomach hurts.",
     "ar": "بطني يوجعني.",
     "hl": "hurts"
    },
    {
     "emoji": "🌡️",
     "en": "I have a high fever.",
     "ar": "عندي حرارة مرتفعة.",
     "hl": "fever"
    },
    {
     "emoji": "🗣️",
     "en": "I have a sore throat.",
     "ar": "حلقي ملتهب.",
     "hl": "sore"
    },
    {
     "emoji": "🛌",
     "en": "You should rest for two days.",
     "ar": "لازم ترتاح يومين.",
     "hl": "rest"
    }
   ],
   "say": "At the doctor What's the matter? I have a headache. My stomach hurts. I have a high fever. I have a sore throat. You should rest for two days."
  }
 },
 {
  "id": "haya-95",
  "order": 95,
  "levelId": "l4",
  "titleAr": "في الصيدلية",
  "titleEn": "At the Pharmacy",
  "content": {
   "explanationAr": "في الصيدلية: I need something for a cough أبي شي للكحة، Take one tablet twice a day خذ حبة مرتين باليوم.",
   "altExplanationAr": "Do I need a prescription?",
   "example": [
    {
     "en": "I need something for a cough.",
     "ar": "أبي شي للكحة."
    },
    {
     "en": "Do I need a prescription?",
     "ar": "أحتاج وصفة طبية؟"
    },
    {
     "en": "Take one tablet twice a day.",
     "ar": "خذ حبة مرتين باليوم."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I need something for a ___.",
    "options": [
     "cold",
     "cough",
     "cook"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Do I need a ___?",
     "options": [
      "description",
      "subscription",
      "prescription"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Take one tablet twice a day.",
     "options": [
      "خذ حبة مرتين باليوم.",
      "خذه بعد الأكل.",
      "عندك واقي شمس؟"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Take it ___ meals.",
     "options": [
      "before",
      "after",
      "during"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "At the Pharmacy"
   },
   {
    "kind": "highlight",
    "text": "At the pharmacy"
   },
   {
    "kind": "example",
    "en": "I need something for a cough.",
    "ar": "أبي شي للكحة."
   },
   {
    "kind": "example",
    "en": "Do I need a prescription?",
    "ar": "أحتاج وصفة طبية؟"
   }
  ],
  "kids": {
   "listTitle": "At the pharmacy",
   "cards": [
    {
     "emoji": "💊",
     "en": "I need something for a cough.",
     "ar": "أبي شي للكحة.",
     "hl": "cough"
    },
    {
     "emoji": "📋",
     "en": "Do I need a prescription?",
     "ar": "أحتاج وصفة طبية؟",
     "hl": "prescription"
    },
    {
     "emoji": "🔢",
     "en": "Take one tablet twice a day.",
     "ar": "خذ حبة مرتين باليوم.",
     "hl": "tablet"
    },
    {
     "emoji": "🍽️",
     "en": "Take it after meals.",
     "ar": "خذه بعد الأكل.",
     "hl": "after"
    },
    {
     "emoji": "🧴",
     "en": "Do you have any sun cream?",
     "ar": "عندك واقي شمس؟",
     "hl": "any"
    },
    {
     "emoji": "🩹",
     "en": "I'd like some plasters, please.",
     "ar": "أبي لزقات جروح لو سمحت.",
     "hl": "plasters"
    }
   ],
   "say": "At the pharmacy I need something for a cough. Do I need a prescription? Take one tablet twice a day. Take it after meals. Do you have any sun cream? I'd like some plasters, please."
  }
 },
 {
  "id": "haya-96",
  "order": 96,
  "levelId": "l4",
  "titleAr": "التاكسي والمواصلات",
  "titleEn": "Taxis and Transport",
  "content": {
   "explanationAr": "في التاكسي: Take me to... ودّني لـ، Stop here, please وقّف هنا لو سمحت، How long does it take? كم ياخذ وقت؟",
   "altExplanationAr": "How much is it to the airport?",
   "example": [
    {
     "en": "Take me to the airport, please.",
     "ar": "ودّني المطار لو سمحت."
    },
    {
     "en": "How much is it to the city centre?",
     "ar": "بكم المشوار لوسط المدينة؟"
    },
    {
     "en": "How long does it take?",
     "ar": "كم ياخذ وقت؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ me to the airport, please.",
    "options": [
     "Took",
     "Takes",
     "Take"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "How ___ is it to the city centre?",
     "options": [
      "much",
      "many",
      "long"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "How long does it take?",
     "options": [
      "وقّف هنا لو سمحت.",
      "كم ياخذ وقت؟",
      "أي خط يروح للملعب؟"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ here, please.",
     "options": [
      "Stops",
      "Stopped",
      "Stop"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Taxis and Transport"
   },
   {
    "kind": "highlight",
    "text": "Getting around"
   },
   {
    "kind": "example",
    "en": "Take me to the airport, please.",
    "ar": "ودّني المطار لو سمحت."
   },
   {
    "kind": "example",
    "en": "How much is it to the city centre?",
    "ar": "بكم المشوار لوسط المدينة؟"
   }
  ],
  "kids": {
   "listTitle": "Getting around",
   "cards": [
    {
     "emoji": "🚕",
     "en": "Take me to the airport, please.",
     "ar": "ودّني المطار لو سمحت.",
     "hl": "Take"
    },
    {
     "emoji": "💵",
     "en": "How much is it to the city centre?",
     "ar": "بكم المشوار لوسط المدينة؟",
     "hl": "much"
    },
    {
     "emoji": "⏱️",
     "en": "How long does it take?",
     "ar": "كم ياخذ وقت؟",
     "hl": "long"
    },
    {
     "emoji": "🛑",
     "en": "Stop here, please.",
     "ar": "وقّف هنا لو سمحت.",
     "hl": "Stop"
    },
    {
     "emoji": "🚇",
     "en": "Which line goes to the stadium?",
     "ar": "أي خط يروح للملعب؟",
     "hl": "line"
    },
    {
     "emoji": "🎫",
     "en": "Where can I buy a ticket?",
     "ar": "من وين أقدر أشتري تذكرة؟",
     "hl": "ticket"
    }
   ],
   "say": "Getting around Take me to the airport, please. How much is it to the city centre? How long does it take? Stop here, please. Which line goes to the stadium? Where can I buy a ticket?"
  }
 },
 {
  "id": "haya-97",
  "order": 97,
  "levelId": "l4",
  "titleAr": "على التلفون",
  "titleEn": "On the Phone",
  "content": {
   "explanationAr": "جمل التلفون: Hello, this is Haya ألو، معك هيا، Can I speak to...? ممكن أكلم...؟، I'll call you back بتصل عليك بعدين.",
   "altExplanationAr": "Sorry, he's not here. Can I take a message?",
   "example": [
    {
     "en": "Hello, this is Haya.",
     "ar": "ألو، معك هيا."
    },
    {
     "en": "Can I speak to Ali, please?",
     "ar": "ممكن أكلم علي لو سمحت؟"
    },
    {
     "en": "Can I take a message?",
     "ar": "ممكن آخذ رسالة؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Hello, ___ is Haya.",
    "options": [
     "this",
     "that",
     "these"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Can I ___ to Ali, please?",
     "options": [
      "speaks",
      "speak",
      "spoke"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Can I take a message?",
     "options": [
      "لحظة لو سمحت.",
      "بتصل عليك بعدين.",
      "ممكن آخذ رسالة؟"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ on, please.",
     "options": [
      "Hold",
      "Held",
      "Holds"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "On the Phone"
   },
   {
    "kind": "highlight",
    "text": "On the phone"
   },
   {
    "kind": "example",
    "en": "Hello, this is Haya.",
    "ar": "ألو، معك هيا."
   },
   {
    "kind": "example",
    "en": "Can I speak to Ali, please?",
    "ar": "ممكن أكلم علي لو سمحت؟"
   }
  ],
  "kids": {
   "listTitle": "On the phone",
   "cards": [
    {
     "emoji": "☎️",
     "en": "Hello, this is Haya.",
     "ar": "ألو، معك هيا.",
     "hl": "this"
    },
    {
     "emoji": "🗣️",
     "en": "Can I speak to Ali, please?",
     "ar": "ممكن أكلم علي لو سمحت؟",
     "hl": "speak"
    },
    {
     "emoji": "📝",
     "en": "Can I take a message?",
     "ar": "ممكن آخذ رسالة؟",
     "hl": "message"
    },
    {
     "emoji": "⏳",
     "en": "Hold on, please.",
     "ar": "لحظة لو سمحت.",
     "hl": "Hold"
    },
    {
     "emoji": "🔁",
     "en": "I'll call you back later.",
     "ar": "بتصل عليك بعدين.",
     "hl": "back"
    },
    {
     "emoji": "📶",
     "en": "Sorry, I can't hear you well.",
     "ar": "آسف، ما أسمعك زين.",
     "hl": "hear"
    }
   ],
   "say": "On the phone Hello, this is Haya. Can I speak to Ali, please? Can I take a message? Hold on, please. I'll call you back later. Sorry, I can't hear you well."
  }
 },
 {
  "id": "haya-98",
  "order": 98,
  "levelId": "l4",
  "titleAr": "في البنك",
  "titleEn": "At the Bank",
  "content": {
   "explanationAr": "في البنك: I'd like to open an account أبي أفتح حساب، I want to send money أبي أحوّل فلوس، My card is not working بطاقتي ما تشتغل.",
   "altExplanationAr": "Can I change some dollars?",
   "example": [
    {
     "en": "I'd like to open an account.",
     "ar": "أبي أفتح حساب."
    },
    {
     "en": "I want to send money to my brother.",
     "ar": "أبي أحوّل فلوس لأخوي."
    },
    {
     "en": "My card is not working.",
     "ar": "بطاقتي ما تشتغل."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I'd like to ___ an account.",
    "options": [
     "opens",
     "open",
     "opened"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I want to ___ money to my brother.",
     "options": [
      "sends",
      "sent",
      "send"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "My card is not working.",
     "options": [
      "بطاقتي ما تشتغل.",
      "ممكن أصرف شوية دولارات؟",
      "لو سمحت جيب بطاقة الهوية."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Can I ___ some dollars?",
     "options": [
      "changes",
      "change",
      "changed"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "At the Bank"
   },
   {
    "kind": "highlight",
    "text": "At the bank"
   },
   {
    "kind": "example",
    "en": "I'd like to open an account.",
    "ar": "أبي أفتح حساب."
   },
   {
    "kind": "example",
    "en": "I want to send money to my brother.",
    "ar": "أبي أحوّل فلوس لأخوي."
   }
  ],
  "kids": {
   "listTitle": "At the bank",
   "cards": [
    {
     "emoji": "🏦",
     "en": "I'd like to open an account.",
     "ar": "أبي أفتح حساب.",
     "hl": "open"
    },
    {
     "emoji": "💸",
     "en": "I want to send money to my brother.",
     "ar": "أبي أحوّل فلوس لأخوي.",
     "hl": "send"
    },
    {
     "emoji": "💳",
     "en": "My card is not working.",
     "ar": "بطاقتي ما تشتغل.",
     "hl": "working"
    },
    {
     "emoji": "💱",
     "en": "Can I change some dollars?",
     "ar": "ممكن أصرف شوية دولارات؟",
     "hl": "change"
    },
    {
     "emoji": "🪪",
     "en": "Please bring your ID card.",
     "ar": "لو سمحت جيب بطاقة الهوية.",
     "hl": "bring"
    },
    {
     "emoji": "🔢",
     "en": "Enter your PIN, please.",
     "ar": "دخّل الرقم السري لو سمحت.",
     "hl": "Enter"
    }
   ],
   "say": "At the bank I'd like to open an account. I want to send money to my brother. My card is not working. Can I change some dollars? Please bring your ID card. Enter your PIN, please."
  }
 },
 {
  "id": "haya-99",
  "order": 99,
  "levelId": "l4",
  "titleAr": "في السوبرماركت",
  "titleEn": "At the Supermarket",
  "content": {
   "explanationAr": "جمل السوبرماركت: Where can I find...? وين ألقى...؟، Do you have fresh bread? عندكم خبز طازج؟، I need a bag أحتاج كيس.",
   "altExplanationAr": "Where can I find the rice?",
   "example": [
    {
     "en": "Where can I find the rice?",
     "ar": "وين ألقى الرز؟"
    },
    {
     "en": "Do you have fresh bread?",
     "ar": "عندكم خبز طازج؟"
    },
    {
     "en": "A kilo of chicken, please.",
     "ar": "كيلو دجاج لو سمحت."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Where can I ___ the rice?",
    "options": [
     "found",
     "finds",
     "find"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Do you have ___ bread?",
     "options": [
      "fresh",
      "fish",
      "free"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "A kilo of chicken, please.",
     "options": [
      "أحتاج كيس لو سمحت.",
      "كيلو دجاج لو سمحت.",
      "وين الكاشير؟"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I ___ a bag, please.",
     "options": [
      "needs",
      "needed",
      "need"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "At the Supermarket"
   },
   {
    "kind": "highlight",
    "text": "At the supermarket"
   },
   {
    "kind": "example",
    "en": "Where can I find the rice?",
    "ar": "وين ألقى الرز؟"
   },
   {
    "kind": "example",
    "en": "Do you have fresh bread?",
    "ar": "عندكم خبز طازج؟"
   }
  ],
  "kids": {
   "listTitle": "At the supermarket",
   "cards": [
    {
     "emoji": "🍚",
     "en": "Where can I find the rice?",
     "ar": "وين ألقى الرز؟",
     "hl": "find"
    },
    {
     "emoji": "🥖",
     "en": "Do you have fresh bread?",
     "ar": "عندكم خبز طازج؟",
     "hl": "fresh"
    },
    {
     "emoji": "🥩",
     "en": "A kilo of chicken, please.",
     "ar": "كيلو دجاج لو سمحت.",
     "hl": "kilo"
    },
    {
     "emoji": "🛍️",
     "en": "I need a bag, please.",
     "ar": "أحتاج كيس لو سمحت.",
     "hl": "need"
    },
    {
     "emoji": "🧾",
     "en": "Where is the checkout?",
     "ar": "وين الكاشير؟",
     "hl": "checkout"
    },
    {
     "emoji": "🏷️",
     "en": "Is this on offer?",
     "ar": "هذا عليه عرض؟",
     "hl": "offer"
    }
   ],
   "say": "At the supermarket Where can I find the rice? Do you have fresh bread? A kilo of chicken, please. I need a bag, please. Where is the checkout? Is this on offer?"
  }
 },
 {
  "id": "haya-100",
  "order": 100,
  "levelId": "l4",
  "titleAr": "تسوق الملابس",
  "titleEn": "Shopping for Clothes",
  "content": {
   "explanationAr": "في محل الملابس: Can I try it on? ممكن أجربه؟، Do you have a smaller size? عندك مقاس أصغر؟، It fits me well مقاسه مضبوط.",
   "altExplanationAr": "It's too big. Do you have a smaller size?",
   "example": [
    {
     "en": "Can I try it on?",
     "ar": "ممكن أجربه؟"
    },
    {
     "en": "Do you have a smaller size?",
     "ar": "عندك مقاس أصغر؟"
    },
    {
     "en": "These jeans are too long.",
     "ar": "هالجينز طويل مرة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Can I ___ it on?",
    "options": [
     "try",
     "tries",
     "tried"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Do you have a ___ size?",
     "options": [
      "small",
      "smaller",
      "smallest"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "These jeans are too long.",
     "options": [
      "مقاسه مضبوط عليّ.",
      "عندك منه أزرق؟",
      "هالجينز طويل مرة."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "It ___ me well.",
     "options": [
      "fits",
      "fit",
      "fitting"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Shopping for Clothes"
   },
   {
    "kind": "highlight",
    "text": "Clothes shopping"
   },
   {
    "kind": "example",
    "en": "Can I try it on?",
    "ar": "ممكن أجربه؟"
   },
   {
    "kind": "example",
    "en": "Do you have a smaller size?",
    "ar": "عندك مقاس أصغر؟"
   }
  ],
  "kids": {
   "listTitle": "Clothes shopping",
   "cards": [
    {
     "emoji": "👗",
     "en": "Can I try it on?",
     "ar": "ممكن أجربه؟",
     "hl": "try"
    },
    {
     "emoji": "📏",
     "en": "Do you have a smaller size?",
     "ar": "عندك مقاس أصغر؟",
     "hl": "smaller"
    },
    {
     "emoji": "👖",
     "en": "These jeans are too long.",
     "ar": "هالجينز طويل مرة.",
     "hl": "too"
    },
    {
     "emoji": "👌",
     "en": "It fits me well.",
     "ar": "مقاسه مضبوط عليّ.",
     "hl": "fits"
    },
    {
     "emoji": "🎨",
     "en": "Do you have it in blue?",
     "ar": "عندك منه أزرق؟",
     "hl": "in"
    },
    {
     "emoji": "💳",
     "en": "I'll take it.",
     "ar": "بآخذه.",
     "hl": "take"
    }
   ],
   "say": "Clothes shopping Can I try it on? Do you have a smaller size? These jeans are too long. It fits me well. Do you have it in blue? I'll take it."
  }
 },
 {
  "id": "haya-101",
  "order": 101,
  "levelId": "l4",
  "titleAr": "في الكوفي",
  "titleEn": "At the Café",
  "content": {
   "explanationAr": "في الكوفي: Can I get a latte? ممكن لاتيه؟، For here or to go? هنا ولا سفري؟، With sugar or without? بسكر ولا بدون؟",
   "altExplanationAr": "A small cappuccino, please. To go.",
   "example": [
    {
     "en": "Can I get a latte, please?",
     "ar": "ممكن لاتيه لو سمحت؟"
    },
    {
     "en": "For here or to go?",
     "ar": "هنا ولا سفري؟"
    },
    {
     "en": "With sugar or without?",
     "ar": "بسكر ولا بدون؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Can I ___ a latte, please?",
    "options": [
     "got",
     "get",
     "gets"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "For here ___ to go?",
     "options": [
      "and",
      "but",
      "or"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "With sugar or without?",
     "options": [
      "بسكر ولا بدون؟",
      "وأبي كرواسون بعد.",
      "ممكن مع ثلج؟"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I'd like a croissant ___.",
     "options": [
      "to",
      "too",
      "two"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "At the Café"
   },
   {
    "kind": "highlight",
    "text": "At the café"
   },
   {
    "kind": "example",
    "en": "Can I get a latte, please?",
    "ar": "ممكن لاتيه لو سمحت؟"
   },
   {
    "kind": "example",
    "en": "For here or to go?",
    "ar": "هنا ولا سفري؟"
   }
  ],
  "kids": {
   "listTitle": "At the café",
   "cards": [
    {
     "emoji": "☕",
     "en": "Can I get a latte, please?",
     "ar": "ممكن لاتيه لو سمحت؟",
     "hl": "get"
    },
    {
     "emoji": "🥤",
     "en": "For here or to go?",
     "ar": "هنا ولا سفري؟",
     "hl": "or"
    },
    {
     "emoji": "🍬",
     "en": "With sugar or without?",
     "ar": "بسكر ولا بدون؟",
     "hl": "without"
    },
    {
     "emoji": "🥐",
     "en": "I'd like a croissant too.",
     "ar": "وأبي كرواسون بعد.",
     "hl": "too"
    },
    {
     "emoji": "🧊",
     "en": "Can I have it with ice?",
     "ar": "ممكن مع ثلج؟",
     "hl": "ice"
    },
    {
     "emoji": "💳",
     "en": "That's 25 riyals, please.",
     "ar": "المجموع ٢٥ ريال لو سمحت.",
     "hl": "That's"
    }
   ],
   "say": "At the café Can I get a latte, please? For here or to go? With sugar or without? I'd like a croissant too. Can I have it with ice? That's 25 riyals, please."
  }
 },
 {
  "id": "haya-102",
  "order": 102,
  "levelId": "l4",
  "titleAr": "الدعوات",
  "titleEn": "Invitations",
  "content": {
   "explanationAr": "نعزم أحد بـ Would you like to...?: Would you like to come to my party? ونرد: I'd love to! أو Sorry, I can't.",
   "altExplanationAr": "I'd love to, thank you!",
   "example": [
    {
     "en": "Would you like to come to my party?",
     "ar": "تحب تجي حفلتي؟"
    },
    {
     "en": "I'd love to, thank you!",
     "ar": "أكيد ودّي، شكرًا!"
    },
    {
     "en": "Sorry, I can't. I'm busy.",
     "ar": "آسف، ما أقدر. أنا مشغول."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Would you ___ to come to my party?",
    "options": [
     "likes",
     "liked",
     "like"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I'd ___ to, thank you!",
     "options": [
      "love",
      "loves",
      "loved"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Sorry, I can't. I'm busy.",
     "options": [
      "تحب تتعشى معنا؟",
      "آسف، ما أقدر. أنا مشغول.",
      "تبي قهوة؟"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Would you like to ___ dinner with us?",
     "options": [
      "has",
      "had",
      "have"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Invitations"
   },
   {
    "kind": "highlight",
    "text": "Would you like to...?"
   },
   {
    "kind": "example",
    "en": "Would you like to come to my party?",
    "ar": "تحب تجي حفلتي؟"
   },
   {
    "kind": "example",
    "en": "I'd love to, thank you!",
    "ar": "أكيد ودّي، شكرًا!"
   }
  ],
  "kids": {
   "listTitle": "Would you like to...?",
   "cards": [
    {
     "emoji": "🎉",
     "en": "Would you like to come to my party?",
     "ar": "تحب تجي حفلتي؟",
     "hl": "like"
    },
    {
     "emoji": "😍",
     "en": "I'd love to, thank you!",
     "ar": "أكيد ودّي، شكرًا!",
     "hl": "love"
    },
    {
     "emoji": "😔",
     "en": "Sorry, I can't. I'm busy.",
     "ar": "آسف، ما أقدر. أنا مشغول.",
     "hl": "busy"
    },
    {
     "emoji": "🍽️",
     "en": "Would you like to have dinner with us?",
     "ar": "تحب تتعشى معنا؟",
     "hl": "have"
    },
    {
     "emoji": "☕",
     "en": "Would you like some coffee?",
     "ar": "تبي قهوة؟",
     "hl": "some"
    },
    {
     "emoji": "🕖",
     "en": "What time should I come?",
     "ar": "متى أجي؟",
     "hl": "should"
    }
   ],
   "say": "Would you like to...? Would you like to come to my party? I'd love to, thank you! Sorry, I can't. I'm busy. Would you like to have dinner with us? Would you like some coffee? What time should I come?"
  }
 },
 {
  "id": "haya-103",
  "order": 103,
  "levelId": "l4",
  "titleAr": "نخطط مع بعض",
  "titleEn": "Making Plans",
  "content": {
   "explanationAr": "نقترح بـ How about...? إيش رايك بـ، و Shall we...? نسوي؟، و Why don't we...? ليش ما نسوي؟",
   "altExplanationAr": "How about a picnic on Friday?",
   "example": [
    {
     "en": "How about a picnic on Friday?",
     "ar": "وش رايك برحلة يوم الجمعة؟"
    },
    {
     "en": "Shall we watch a film tonight?",
     "ar": "نشوف فيلم الليلة؟"
    },
    {
     "en": "Why don't we ride our bikes?",
     "ar": "ليش ما نركب سياكلنا؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ about a picnic on Friday?",
    "options": [
     "How",
     "What",
     "Why"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ we watch a film tonight?",
     "options": [
      "Should",
      "Shall",
      "Will"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Why don't we ride our bikes?",
     "options": [
      "فكرة حلوة!",
      "خلنا نتقابل الساعة أربع.",
      "ليش ما نركب سياكلنا؟"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "That's a good ___!",
     "options": [
      "idea",
      "ideas",
      "ideal"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Making Plans"
   },
   {
    "kind": "highlight",
    "text": "Making plans"
   },
   {
    "kind": "example",
    "en": "How about a picnic on Friday?",
    "ar": "وش رايك برحلة يوم الجمعة؟"
   },
   {
    "kind": "example",
    "en": "Shall we watch a film tonight?",
    "ar": "نشوف فيلم الليلة؟"
   }
  ],
  "kids": {
   "listTitle": "Making plans",
   "cards": [
    {
     "emoji": "🧺",
     "en": "How about a picnic on Friday?",
     "ar": "وش رايك برحلة يوم الجمعة؟",
     "hl": "How"
    },
    {
     "emoji": "🎬",
     "en": "Shall we watch a film tonight?",
     "ar": "نشوف فيلم الليلة؟",
     "hl": "Shall"
    },
    {
     "emoji": "🚴",
     "en": "Why don't we ride our bikes?",
     "ar": "ليش ما نركب سياكلنا؟",
     "hl": "don't"
    },
    {
     "emoji": "👍",
     "en": "That's a good idea!",
     "ar": "فكرة حلوة!",
     "hl": "idea"
    },
    {
     "emoji": "🕓",
     "en": "Let's meet at four.",
     "ar": "خلنا نتقابل الساعة أربع.",
     "hl": "meet"
    },
    {
     "emoji": "📍",
     "en": "Where shall we meet?",
     "ar": "وين نتقابل؟",
     "hl": "Where"
    }
   ],
   "say": "Making plans How about a picnic on Friday? Shall we watch a film tonight? Why don't we ride our bikes? That's a good idea! Let's meet at four. Where shall we meet?"
  }
 },
 {
  "id": "haya-104",
  "order": 104,
  "levelId": "l4",
  "titleAr": "أوافق وما أوافق",
  "titleEn": "Agreeing and Disagreeing",
  "content": {
   "explanationAr": "نعبر عن رأينا: I think أتوقع أو أظن، I agree أوافق، I don't agree ما أوافق، You're right معك حق.",
   "altExplanationAr": "I think football is fun. — I agree!",
   "example": [
    {
     "en": "I think this is a good plan.",
     "ar": "أظن هذي خطة زينة."
    },
    {
     "en": "I agree with you.",
     "ar": "أوافقك."
    },
    {
     "en": "I don't agree.",
     "ar": "ما أوافق."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ this is a good plan.",
    "options": [
     "thinks",
     "think",
     "thought"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I ___ with you.",
     "options": [
      "agrees",
      "agreed",
      "agree"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I don't agree.",
     "options": [
      "ما أوافق.",
      "معك حق.",
      "مو متأكد مرة."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "You're ___.",
     "options": [
      "write",
      "right",
      "ready"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Agreeing and Disagreeing"
   },
   {
    "kind": "highlight",
    "text": "Agree · disagree"
   },
   {
    "kind": "example",
    "en": "I think this is a good plan.",
    "ar": "أظن هذي خطة زينة."
   },
   {
    "kind": "example",
    "en": "I agree with you.",
    "ar": "أوافقك."
   }
  ],
  "kids": {
   "listTitle": "Agree · disagree",
   "cards": [
    {
     "emoji": "💭",
     "en": "I think this is a good plan.",
     "ar": "أظن هذي خطة زينة.",
     "hl": "think"
    },
    {
     "emoji": "🤝",
     "en": "I agree with you.",
     "ar": "أوافقك.",
     "hl": "agree"
    },
    {
     "emoji": "🙅",
     "en": "I don't agree.",
     "ar": "ما أوافق.",
     "hl": "don't"
    },
    {
     "emoji": "✔️",
     "en": "You're right.",
     "ar": "معك حق.",
     "hl": "right"
    },
    {
     "emoji": "🤔",
     "en": "I'm not so sure.",
     "ar": "مو متأكد مرة.",
     "hl": "sure"
    },
    {
     "emoji": "🗣️",
     "en": "In my opinion, it's too expensive.",
     "ar": "برأيي، غالي مرة.",
     "hl": "opinion"
    }
   ],
   "say": "Agree · disagree I think this is a good plan. I agree with you. I don't agree. You're right. I'm not so sure. In my opinion, it's too expensive."
  }
 },
 {
  "id": "haya-105",
  "order": 105,
  "levelId": "l4",
  "titleAr": "النصيحة: should",
  "titleEn": "You should...",
  "content": {
   "explanationAr": "ننصح بـ should: You should drink more water. والنفي shouldn't: You shouldn't eat late.",
   "altExplanationAr": "You look tired. You should go to bed.",
   "example": [
    {
     "en": "You should drink more water.",
     "ar": "المفروض تشرب ماي أكثر."
    },
    {
     "en": "You shouldn't eat late at night.",
     "ar": "المفروض ما تاكل متأخر بالليل."
    },
    {
     "en": "You look tired. You should go to bed.",
     "ar": "شكلك تعبان. المفروض تنام."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "You ___ drink more water.",
    "options": [
     "shoulds",
     "shoulding",
     "should"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "You ___ eat late at night.",
     "options": [
      "shouldn't",
      "don't",
      "aren't"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "You look tired. You should go to bed.",
     "options": [
      "المفروض يروح لدكتور أسنان.",
      "شكلك تعبان. المفروض تنام.",
      "المفروض ما نستخدم جوالاتنا وإحنا نسوق."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He ___ see a dentist.",
     "options": [
      "shoulds",
      "is",
      "should"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "You should..."
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
    "en": "You shouldn't eat late at night.",
    "ar": "المفروض ما تاكل متأخر بالليل."
   }
  ],
  "kids": {
   "listTitle": "should",
   "cards": [
    {
     "emoji": "💧",
     "en": "You should drink more water.",
     "ar": "المفروض تشرب ماي أكثر.",
     "hl": "should"
    },
    {
     "emoji": "🌙",
     "en": "You shouldn't eat late at night.",
     "ar": "المفروض ما تاكل متأخر بالليل.",
     "hl": "shouldn't"
    },
    {
     "emoji": "😴",
     "en": "You look tired. You should go to bed.",
     "ar": "شكلك تعبان. المفروض تنام.",
     "hl": "go"
    },
    {
     "emoji": "🦷",
     "en": "He should see a dentist.",
     "ar": "المفروض يروح لدكتور أسنان.",
     "hl": "should"
    },
    {
     "emoji": "📱",
     "en": "We shouldn't use our phones while driving.",
     "ar": "المفروض ما نستخدم جوالاتنا وإحنا نسوق.",
     "hl": "shouldn't"
    },
    {
     "emoji": "❓",
     "en": "What should I wear?",
     "ar": "وش ألبس؟",
     "hl": "should"
    }
   ],
   "say": "should You should drink more water. You shouldn't eat late at night. You look tired. You should go to bed. He should see a dentist. We shouldn't use our phones while driving. What should I wear?"
  }
 },
 {
  "id": "haya-106",
  "order": 106,
  "levelId": "l4",
  "titleAr": "القوانين: must و mustn't",
  "titleEn": "Rules: must, mustn't",
  "content": {
   "explanationAr": "must يعني «لازم» للقوانين المهمة، و mustn't يعني «ممنوع»: You must wear a seat belt. You mustn't smoke here.",
   "altExplanationAr": "Students must wear the uniform.",
   "example": [
    {
     "en": "You must wear a helmet.",
     "ar": "لازم تلبس خوذة."
    },
    {
     "en": "You mustn't smoke here.",
     "ar": "ممنوع تدخن هنا."
    },
    {
     "en": "Students must wear the uniform.",
     "ar": "الطلاب لازم يلبسون الزي."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "You ___ wear a helmet.",
    "options": [
     "must",
     "mustn't",
     "musts"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "You ___ smoke here.",
     "options": [
      "must",
      "mustn't",
      "don't"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Students must wear the uniform.",
     "options": [
      "ممنوع تستخدم الجوال في الاختبار.",
      "السواقين لازم يوقفون هنا.",
      "الطلاب لازم يلبسون الزي."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "You ___ use phones in the exam.",
     "options": [
      "mustn't",
      "must",
      "doesn't"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Rules: must, mustn't"
   },
   {
    "kind": "highlight",
    "text": "must"
   },
   {
    "kind": "example",
    "en": "You must wear a helmet.",
    "ar": "لازم تلبس خوذة."
   },
   {
    "kind": "example",
    "en": "You mustn't smoke here.",
    "ar": "ممنوع تدخن هنا."
   }
  ],
  "kids": {
   "listTitle": "must",
   "cards": [
    {
     "emoji": "🪖",
     "en": "You must wear a helmet.",
     "ar": "لازم تلبس خوذة.",
     "hl": "must"
    },
    {
     "emoji": "🚭",
     "en": "You mustn't smoke here.",
     "ar": "ممنوع تدخن هنا.",
     "hl": "mustn't"
    },
    {
     "emoji": "👔",
     "en": "Students must wear the uniform.",
     "ar": "الطلاب لازم يلبسون الزي.",
     "hl": "must"
    },
    {
     "emoji": "📵",
     "en": "You mustn't use phones in the exam.",
     "ar": "ممنوع تستخدم الجوال في الاختبار.",
     "hl": "mustn't"
    },
    {
     "emoji": "🛑",
     "en": "Drivers must stop here.",
     "ar": "السواقين لازم يوقفون هنا.",
     "hl": "must"
    },
    {
     "emoji": "🏊",
     "en": "You mustn't swim alone.",
     "ar": "ممنوع تسبح لحالك.",
     "hl": "mustn't"
    }
   ],
   "say": "must You must wear a helmet. You mustn't smoke here. Students must wear the uniform. You mustn't use phones in the exam. Drivers must stop here. You mustn't swim alone."
  }
 },
 {
  "id": "haya-107",
  "order": 107,
  "levelId": "l4",
  "titleAr": "أطلب الإذن",
  "titleEn": "Asking for Permission",
  "content": {
   "explanationAr": "نطلب الإذن بأدب: May I...? ممكن أنا...؟، Is it OK if...? عادي لو...؟، Do you mind if...? تمانع لو...؟",
   "altExplanationAr": "May I use your phone?",
   "example": [
    {
     "en": "May I ask a question?",
     "ar": "ممكن أسأل سؤال؟"
    },
    {
     "en": "May I use your phone?",
     "ar": "ممكن أستخدم جوالك؟"
    },
    {
     "en": "Is it OK if I open the window?",
     "ar": "عادي لو فتحت الشباك؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ I ask a question?",
    "options": [
     "Must",
     "May",
     "Shall"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "May I ___ your phone?",
     "options": [
      "uses",
      "used",
      "use"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Is it OK if I open the window?",
     "options": [
      "عادي لو فتحت الشباك؟",
      "تمانع لو شغلت شوية موسيقى؟",
      "ممكن آخذ قطعة كيك ثانية؟"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Do you ___ if I play some music?",
     "options": [
      "minds",
      "mind",
      "minded"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Asking for Permission"
   },
   {
    "kind": "highlight",
    "text": "May I...?"
   },
   {
    "kind": "example",
    "en": "May I ask a question?",
    "ar": "ممكن أسأل سؤال؟"
   },
   {
    "kind": "example",
    "en": "May I use your phone?",
    "ar": "ممكن أستخدم جوالك؟"
   }
  ],
  "kids": {
   "listTitle": "May I...?",
   "cards": [
    {
     "emoji": "🙋",
     "en": "May I ask a question?",
     "ar": "ممكن أسأل سؤال؟",
     "hl": "May"
    },
    {
     "emoji": "📱",
     "en": "May I use your phone?",
     "ar": "ممكن أستخدم جوالك؟",
     "hl": "use"
    },
    {
     "emoji": "🪟",
     "en": "Is it OK if I open the window?",
     "ar": "عادي لو فتحت الشباك؟",
     "hl": "if"
    },
    {
     "emoji": "🎵",
     "en": "Do you mind if I play some music?",
     "ar": "تمانع لو شغلت شوية موسيقى؟",
     "hl": "mind"
    },
    {
     "emoji": "🍰",
     "en": "Can I have another piece of cake?",
     "ar": "ممكن آخذ قطعة كيك ثانية؟",
     "hl": "another"
    },
    {
     "emoji": "🙂",
     "en": "Of course, go ahead.",
     "ar": "أكيد، تفضل.",
     "hl": "go"
    }
   ],
   "say": "May I...? May I ask a question? May I use your phone? Is it OK if I open the window? Do you mind if I play some music? Can I have another piece of cake? Of course, go ahead."
  }
 },
 {
  "id": "haya-108",
  "order": 108,
  "levelId": "l4",
  "titleAr": "أعتذر",
  "titleEn": "Saying Sorry",
  "content": {
   "explanationAr": "نعتذر بـ I'm sorry آسف، I'm sorry I'm late آسف تأخرت، It was my fault الغلط مني. ونرد: Don't worry ولا يهمك.",
   "altExplanationAr": "I'm sorry I broke your cup. — That's OK.",
   "example": [
    {
     "en": "I'm sorry I'm late.",
     "ar": "آسف تأخرت."
    },
    {
     "en": "I'm sorry I broke your cup.",
     "ar": "آسف كسرت كوبك."
    },
    {
     "en": "It was my fault.",
     "ar": "الغلط مني."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I'm ___ I'm late.",
    "options": [
     "sore",
     "sorrow",
     "sorry"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I'm sorry I ___ your cup.",
     "options": [
      "broke",
      "break",
      "broken"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "It was my fault.",
     "options": [
      "لا تشيل هم.",
      "الغلط مني.",
      "ما بتتكرر."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Don't ___ about it.",
     "options": [
      "worries",
      "worried",
      "worry"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Saying Sorry"
   },
   {
    "kind": "highlight",
    "text": "Apologizing"
   },
   {
    "kind": "example",
    "en": "I'm sorry I'm late.",
    "ar": "آسف تأخرت."
   },
   {
    "kind": "example",
    "en": "I'm sorry I broke your cup.",
    "ar": "آسف كسرت كوبك."
   }
  ],
  "kids": {
   "listTitle": "Apologizing",
   "cards": [
    {
     "emoji": "😔",
     "en": "I'm sorry I'm late.",
     "ar": "آسف تأخرت.",
     "hl": "sorry"
    },
    {
     "emoji": "☕",
     "en": "I'm sorry I broke your cup.",
     "ar": "آسف كسرت كوبك.",
     "hl": "broke"
    },
    {
     "emoji": "🙇",
     "en": "It was my fault.",
     "ar": "الغلط مني.",
     "hl": "fault"
    },
    {
     "emoji": "🫂",
     "en": "Don't worry about it.",
     "ar": "لا تشيل هم.",
     "hl": "worry"
    },
    {
     "emoji": "🔁",
     "en": "It won't happen again.",
     "ar": "ما بتتكرر.",
     "hl": "happen"
    },
    {
     "emoji": "😊",
     "en": "That's OK. No harm done.",
     "ar": "عادي. ما صار شي.",
     "hl": "harm"
    }
   ],
   "say": "Apologizing I'm sorry I'm late. I'm sorry I broke your cup. It was my fault. Don't worry about it. It won't happen again. That's OK. No harm done."
  }
 },
 {
  "id": "haya-109",
  "order": 109,
  "levelId": "l4",
  "titleAr": "أشتكي بأدب",
  "titleEn": "Complaining Politely",
  "content": {
   "explanationAr": "نشتكي بأدب: Excuse me, there's a problem لو سمحت فيه مشكلة، This is not what I ordered هذا مو اللي طلبته، Can you fix it? تقدر تصلحه؟",
   "altExplanationAr": "Excuse me, my soup is cold.",
   "example": [
    {
     "en": "Excuse me, my soup is cold.",
     "ar": "لو سمحت، الشوربة باردة."
    },
    {
     "en": "This is not what I ordered.",
     "ar": "هذا مو اللي طلبته."
    },
    {
     "en": "There is no hot water in my room.",
     "ar": "ما فيه ماي حار في غرفتي."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Excuse me, my soup is ___.",
    "options": [
     "cold",
     "cool",
     "cord"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "This is not what I ___.",
     "options": [
      "order",
      "ordered",
      "orders"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "There is no hot water in my room.",
     "options": [
      "تقدر تصلحه لو سمحت؟",
      "طلبي ما وصل للحين.",
      "ما فيه ماي حار في غرفتي."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Can you ___ it, please?",
     "options": [
      "fix",
      "fixes",
      "fixed"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Complaining Politely"
   },
   {
    "kind": "highlight",
    "text": "Complaints"
   },
   {
    "kind": "example",
    "en": "Excuse me, my soup is cold.",
    "ar": "لو سمحت، الشوربة باردة."
   },
   {
    "kind": "example",
    "en": "This is not what I ordered.",
    "ar": "هذا مو اللي طلبته."
   }
  ],
  "kids": {
   "listTitle": "Complaints",
   "cards": [
    {
     "emoji": "🍲",
     "en": "Excuse me, my soup is cold.",
     "ar": "لو سمحت، الشوربة باردة.",
     "hl": "cold"
    },
    {
     "emoji": "🍝",
     "en": "This is not what I ordered.",
     "ar": "هذا مو اللي طلبته.",
     "hl": "ordered"
    },
    {
     "emoji": "🚿",
     "en": "There is no hot water in my room.",
     "ar": "ما فيه ماي حار في غرفتي.",
     "hl": "no"
    },
    {
     "emoji": "🔧",
     "en": "Can you fix it, please?",
     "ar": "تقدر تصلحه لو سمحت؟",
     "hl": "fix"
    },
    {
     "emoji": "📦",
     "en": "My order hasn't arrived yet.",
     "ar": "طلبي ما وصل للحين.",
     "hl": "yet"
    },
    {
     "emoji": "💬",
     "en": "Can I speak to the manager?",
     "ar": "ممكن أكلم المدير؟",
     "hl": "manager"
    }
   ],
   "say": "Complaints Excuse me, my soup is cold. This is not what I ordered. There is no hot water in my room. Can you fix it, please? My order hasn't arrived yet. Can I speak to the manager?"
  }
 },
 {
  "id": "haya-110",
  "order": 110,
  "levelId": "l4",
  "titleAr": "نتكلم عن الجو",
  "titleEn": "Talking About the Weather",
  "content": {
   "explanationAr": "نسولف عن الجو: What's the weather like? كيف الجو؟، It's really hot today الجو حر مرة اليوم، I hope it rains إن شاء الله تمطر.",
   "altExplanationAr": "Lovely weather today, isn't it?",
   "example": [
    {
     "en": "What's the weather like in Abha?",
     "ar": "كيف الجو في أبها؟"
    },
    {
     "en": "It's really hot today.",
     "ar": "الجو حر مرة اليوم."
    },
    {
     "en": "I hope it rains this week.",
     "ar": "إن شاء الله تمطر هالأسبوع."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "What's the weather ___ in Abha?",
    "options": [
     "likes",
     "like",
     "liked"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "It's ___ hot today.",
     "options": [
      "real",
      "reality",
      "really"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I hope it rains this week.",
     "options": [
      "إن شاء الله تمطر هالأسبوع.",
      "انتبه، فيه ضباب كثيف.",
      "الجو حلو اليوم، صح؟"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Be careful, it's very ___.",
     "options": [
      "fog",
      "foggy",
      "frog"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Talking About the Weather"
   },
   {
    "kind": "highlight",
    "text": "Weather talk"
   },
   {
    "kind": "example",
    "en": "What's the weather like in Abha?",
    "ar": "كيف الجو في أبها؟"
   },
   {
    "kind": "example",
    "en": "It's really hot today.",
    "ar": "الجو حر مرة اليوم."
   }
  ],
  "kids": {
   "listTitle": "Weather talk",
   "cards": [
    {
     "emoji": "🌦️",
     "en": "What's the weather like in Abha?",
     "ar": "كيف الجو في أبها؟",
     "hl": "like"
    },
    {
     "emoji": "🔥",
     "en": "It's really hot today.",
     "ar": "الجو حر مرة اليوم.",
     "hl": "really"
    },
    {
     "emoji": "🌧️",
     "en": "I hope it rains this week.",
     "ar": "إن شاء الله تمطر هالأسبوع.",
     "hl": "hope"
    },
    {
     "emoji": "🌫️",
     "en": "Be careful, it's very foggy.",
     "ar": "انتبه، فيه ضباب كثيف.",
     "hl": "foggy"
    },
    {
     "emoji": "🍃",
     "en": "Lovely weather today, isn't it?",
     "ar": "الجو حلو اليوم، صح؟",
     "hl": "isn't"
    },
    {
     "emoji": "🌪️",
     "en": "There was a sandstorm yesterday.",
     "ar": "كان فيه عاصفة رملية أمس.",
     "hl": "was"
    }
   ],
   "say": "Weather talk What's the weather like in Abha? It's really hot today. I hope it rains this week. Be careful, it's very foggy. Lovely weather today, isn't it? There was a sandstorm yesterday."
  }
 },
 {
  "id": "haya-111",
  "order": 111,
  "levelId": "l4",
  "titleAr": "أتكلم عن عائلتي",
  "titleEn": "Talking About My Family",
  "content": {
   "explanationAr": "نحكي عن العائلة: I have two brothers عندي أخوين، My mother is a teacher أمي معلمة، I'm the oldest أنا الكبير.",
   "altExplanationAr": "How many people are in your family?",
   "example": [
    {
     "en": "There are six people in my family.",
     "ar": "عائلتنا ستة أشخاص."
    },
    {
     "en": "I have two brothers and a sister.",
     "ar": "عندي أخوين وأخت."
    },
    {
     "en": "My mother is a teacher.",
     "ar": "أمي معلمة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "There are six ___ in my family.",
    "options": [
     "person",
     "peoples",
     "people"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I have two ___ and a sister.",
     "options": [
      "brothers",
      "brother",
      "brother's"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "My mother is a teacher.",
     "options": [
      "جدي وجدتي ساكنين معنا.",
      "أمي معلمة.",
      "أنا أكبر العيال."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "My grandparents ___ with us.",
     "options": [
      "lives",
      "living",
      "live"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Talking About My Family"
   },
   {
    "kind": "highlight",
    "text": "My family"
   },
   {
    "kind": "example",
    "en": "There are six people in my family.",
    "ar": "عائلتنا ستة أشخاص."
   },
   {
    "kind": "example",
    "en": "I have two brothers and a sister.",
    "ar": "عندي أخوين وأخت."
   }
  ],
  "kids": {
   "listTitle": "My family",
   "cards": [
    {
     "emoji": "👨‍👩‍👧‍👦",
     "en": "There are six people in my family.",
     "ar": "عائلتنا ستة أشخاص.",
     "hl": "people"
    },
    {
     "emoji": "👦",
     "en": "I have two brothers and a sister.",
     "ar": "عندي أخوين وأخت.",
     "hl": "brothers"
    },
    {
     "emoji": "👩‍🏫",
     "en": "My mother is a teacher.",
     "ar": "أمي معلمة.",
     "hl": "is"
    },
    {
     "emoji": "🧓",
     "en": "My grandparents live with us.",
     "ar": "جدي وجدتي ساكنين معنا.",
     "hl": "live"
    },
    {
     "emoji": "🥇",
     "en": "I'm the oldest child.",
     "ar": "أنا أكبر العيال.",
     "hl": "oldest"
    },
    {
     "emoji": "👨‍👧",
     "en": "My father works in a bank.",
     "ar": "أبوي يشتغل في بنك.",
     "hl": "works"
    }
   ],
   "say": "My family There are six people in my family. I have two brothers and a sister. My mother is a teacher. My grandparents live with us. I'm the oldest child. My father works in a bank."
  }
 },
 {
  "id": "haya-112",
  "order": 112,
  "levelId": "l4",
  "titleAr": "أتكلم عن شغلي",
  "titleEn": "Talking About Work",
  "content": {
   "explanationAr": "نحكي عن الشغل: I work as an engineer أشتغل مهندس، I start at eight أبدأ الساعة ثمان، I love my job أحب شغلي.",
   "altExplanationAr": "What do you do? I work as a nurse.",
   "example": [
    {
     "en": "I work as an engineer.",
     "ar": "أشتغل مهندس."
    },
    {
     "en": "I start work at eight.",
     "ar": "أبدأ الدوام الساعة ثمان."
    },
    {
     "en": "My office is in the city centre.",
     "ar": "مكتبي في وسط المدينة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I work ___ an engineer.",
    "options": [
     "as",
     "like",
     "for"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I ___ work at eight.",
     "options": [
      "starts",
      "start",
      "started"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "My office is in the city centre.",
     "options": [
      "أستخدم الكمبيوتر طول اليوم.",
      "أشتغل مع فريق رهيب.",
      "مكتبي في وسط المدينة."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I ___ a computer all day.",
     "options": [
      "use",
      "uses",
      "used"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Talking About Work"
   },
   {
    "kind": "highlight",
    "text": "Work talk"
   },
   {
    "kind": "example",
    "en": "I work as an engineer.",
    "ar": "أشتغل مهندس."
   },
   {
    "kind": "example",
    "en": "I start work at eight.",
    "ar": "أبدأ الدوام الساعة ثمان."
   }
  ],
  "kids": {
   "listTitle": "Work talk",
   "cards": [
    {
     "emoji": "👷",
     "en": "I work as an engineer.",
     "ar": "أشتغل مهندس.",
     "hl": "as"
    },
    {
     "emoji": "🕗",
     "en": "I start work at eight.",
     "ar": "أبدأ الدوام الساعة ثمان.",
     "hl": "start"
    },
    {
     "emoji": "🏢",
     "en": "My office is in the city centre.",
     "ar": "مكتبي في وسط المدينة.",
     "hl": "office"
    },
    {
     "emoji": "💻",
     "en": "I use a computer all day.",
     "ar": "أستخدم الكمبيوتر طول اليوم.",
     "hl": "use"
    },
    {
     "emoji": "👥",
     "en": "I work with a great team.",
     "ar": "أشتغل مع فريق رهيب.",
     "hl": "team"
    },
    {
     "emoji": "❤️",
     "en": "I really love my job.",
     "ar": "أحب شغلي مرة.",
     "hl": "love"
    }
   ],
   "say": "Work talk I work as an engineer. I start work at eight. My office is in the city centre. I use a computer all day. I work with a great team. I really love my job."
  }
 },
 {
  "id": "haya-113",
  "order": 113,
  "levelId": "l4",
  "titleAr": "الهوايات ووقت الفراغ",
  "titleEn": "Hobbies and Free Time",
  "content": {
   "explanationAr": "نسأل عن الهوايات: What do you do in your free time? وش تسوي في وقت فراغك؟ ونجاوب: I like drawing أحب الرسم.",
   "altExplanationAr": "What are your hobbies?",
   "example": [
    {
     "en": "What do you do in your free time?",
     "ar": "وش تسوي في وقت فراغك؟"
    },
    {
     "en": "I like drawing and painting.",
     "ar": "أحب الرسم والتلوين."
    },
    {
     "en": "My uncle goes fishing every Friday.",
     "ar": "عمي يروح يصيد سمك كل جمعة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "What do you do in your ___ time?",
    "options": [
     "freedom",
     "free",
     "freely"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I like ___ and painting.",
     "options": [
      "draw",
      "draws",
      "drawing"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "My uncle goes fishing every Friday.",
     "options": [
      "عمي يروح يصيد سمك كل جمعة.",
      "نحل ألغاز مع بعض.",
      "وش هواياتك؟"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We do ___ together.",
     "options": [
      "puzzle",
      "puzzles",
      "puzzled"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Hobbies and Free Time"
   },
   {
    "kind": "highlight",
    "text": "Free time"
   },
   {
    "kind": "example",
    "en": "What do you do in your free time?",
    "ar": "وش تسوي في وقت فراغك؟"
   },
   {
    "kind": "example",
    "en": "I like drawing and painting.",
    "ar": "أحب الرسم والتلوين."
   }
  ],
  "kids": {
   "listTitle": "Free time",
   "cards": [
    {
     "emoji": "🕰️",
     "en": "What do you do in your free time?",
     "ar": "وش تسوي في وقت فراغك؟",
     "hl": "free"
    },
    {
     "emoji": "🎨",
     "en": "I like drawing and painting.",
     "ar": "أحب الرسم والتلوين.",
     "hl": "drawing"
    },
    {
     "emoji": "🎣",
     "en": "My uncle goes fishing every Friday.",
     "ar": "عمي يروح يصيد سمك كل جمعة.",
     "hl": "fishing"
    },
    {
     "emoji": "🧩",
     "en": "We do puzzles together.",
     "ar": "نحل ألغاز مع بعض.",
     "hl": "puzzles"
    },
    {
     "emoji": "🎤",
     "en": "What are your hobbies?",
     "ar": "وش هواياتك؟",
     "hl": "hobbies"
    },
    {
     "emoji": "📷",
     "en": "I'm interested in photography.",
     "ar": "أنا مهتم بالتصوير.",
     "hl": "interested"
    }
   ],
   "say": "Free time What do you do in your free time? I like drawing and painting. My uncle goes fishing every Friday. We do puzzles together. What are your hobbies? I'm interested in photography."
  }
 },
 {
  "id": "haya-114",
  "order": 114,
  "levelId": "l4",
  "titleAr": "أوصف شخص",
  "titleEn": "Describing People",
  "content": {
   "explanationAr": "نوصف الشكل بـ look like: What does he look like? He is tall with short hair. ونوصف الطبع: She is kind and funny.",
   "altExplanationAr": "She has long black hair and brown eyes.",
   "example": [
    {
     "en": "What does your brother look like?",
     "ar": "كيف شكل أخوك؟"
    },
    {
     "en": "He is tall and thin.",
     "ar": "هو طويل ونحيف."
    },
    {
     "en": "She has long black hair.",
     "ar": "شعرها أسود وطويل."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "What does your brother ___ like?",
    "options": [
     "looks",
     "looked",
     "look"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He is tall and ___.",
     "options": [
      "thin",
      "thick",
      "thing"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "She has long black hair.",
     "options": [
      "جدي يلبس نظارة.",
      "شعرها أسود وطويل.",
      "خالتي طيبة ودمها خفيف."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "My grandpa ___ glasses.",
     "options": [
      "wear",
      "wearing",
      "wears"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Describing People"
   },
   {
    "kind": "highlight",
    "text": "What does he look like?"
   },
   {
    "kind": "example",
    "en": "What does your brother look like?",
    "ar": "كيف شكل أخوك؟"
   },
   {
    "kind": "example",
    "en": "He is tall and thin.",
    "ar": "هو طويل ونحيف."
   }
  ],
  "kids": {
   "listTitle": "What does he look like?",
   "cards": [
    {
     "emoji": "🧍",
     "en": "What does your brother look like?",
     "ar": "كيف شكل أخوك؟",
     "hl": "look"
    },
    {
     "emoji": "📏",
     "en": "He is tall and thin.",
     "ar": "هو طويل ونحيف.",
     "hl": "thin"
    },
    {
     "emoji": "👩‍🦱",
     "en": "She has long black hair.",
     "ar": "شعرها أسود وطويل.",
     "hl": "has"
    },
    {
     "emoji": "👓",
     "en": "My grandpa wears glasses.",
     "ar": "جدي يلبس نظارة.",
     "hl": "wears"
    },
    {
     "emoji": "😄",
     "en": "My aunt is kind and funny.",
     "ar": "خالتي طيبة ودمها خفيف.",
     "hl": "kind"
    },
    {
     "emoji": "🧔",
     "en": "He has a beard.",
     "ar": "عنده لحية.",
     "hl": "beard"
    }
   ],
   "say": "What does he look like? What does your brother look like? He is tall and thin. She has long black hair. My grandpa wears glasses. My aunt is kind and funny. He has a beard."
  }
 },
 {
  "id": "haya-115",
  "order": 115,
  "levelId": "l4",
  "titleAr": "أوصف مكان",
  "titleEn": "Describing Places",
  "content": {
   "explanationAr": "نوصف المكان: It's a quiet town بلدة هادية، There are many old houses فيه بيوت قديمة كثير، It's famous for dates مشهورة بالتمر.",
   "altExplanationAr": "What's your city like?",
   "example": [
    {
     "en": "What's your city like?",
     "ar": "كيف مدينتك؟"
    },
    {
     "en": "Al-Ahsa is famous for dates.",
     "ar": "الأحساء مشهورة بالتمر."
    },
    {
     "en": "It's a quiet little town.",
     "ar": "بلدة صغيرة وهادية."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "What's your city ___?",
    "options": [
     "like",
     "likes",
     "liking"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Al-Ahsa is ___ for dates.",
     "options": [
      "family",
      "famous",
      "fame"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "It's a quiet little town.",
     "options": [
      "فيه بيوت قديمة كثير.",
      "الشوارع دايمًا زحمة.",
      "بلدة صغيرة وهادية."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "There are ___ old houses.",
     "options": [
      "many",
      "much",
      "lot"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Describing Places"
   },
   {
    "kind": "highlight",
    "text": "Describing a place"
   },
   {
    "kind": "example",
    "en": "What's your city like?",
    "ar": "كيف مدينتك؟"
   },
   {
    "kind": "example",
    "en": "Al-Ahsa is famous for dates.",
    "ar": "الأحساء مشهورة بالتمر."
   }
  ],
  "kids": {
   "listTitle": "Describing a place",
   "cards": [
    {
     "emoji": "🏘️",
     "en": "What's your city like?",
     "ar": "كيف مدينتك؟",
     "hl": "like"
    },
    {
     "emoji": "🌴",
     "en": "Al-Ahsa is famous for dates.",
     "ar": "الأحساء مشهورة بالتمر.",
     "hl": "famous"
    },
    {
     "emoji": "🤫",
     "en": "It's a quiet little town.",
     "ar": "بلدة صغيرة وهادية.",
     "hl": "quiet"
    },
    {
     "emoji": "🏛️",
     "en": "There are many old houses.",
     "ar": "فيه بيوت قديمة كثير.",
     "hl": "many"
    },
    {
     "emoji": "🚗",
     "en": "The streets are always busy.",
     "ar": "الشوارع دايمًا زحمة.",
     "hl": "busy"
    },
    {
     "emoji": "🏞️",
     "en": "The views are beautiful.",
     "ar": "المناظر جميلة.",
     "hl": "views"
    }
   ],
   "say": "Describing a place What's your city like? Al-Ahsa is famous for dates. It's a quiet little town. There are many old houses. The streets are always busy. The views are beautiful."
  }
 },
 {
  "id": "haya-116",
  "order": 116,
  "levelId": "l4",
  "titleAr": "الطوارئ",
  "titleEn": "Emergencies",
  "content": {
   "explanationAr": "في الطوارئ نقول: Help! الحقوا!، Call an ambulance! اتصلوا بالإسعاف!، There's a fire! فيه حريق!، I'm lost أنا ضايع.",
   "altExplanationAr": "Call 997 for an ambulance in Saudi Arabia.",
   "example": [
    {
     "en": "Help! Somebody help me!",
     "ar": "الحقوا! أحد يساعدني!"
    },
    {
     "en": "Call an ambulance!",
     "ar": "اتصلوا بالإسعاف!"
    },
    {
     "en": "There's a fire in the kitchen!",
     "ar": "فيه حريق في المطبخ!"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___! Somebody help me!",
    "options": [
     "Helps",
     "Help",
     "Helped"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Call an ___!",
     "options": [
      "ambition",
      "amulet",
      "ambulance"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "There's a fire in the kitchen!",
     "options": [
      "فيه حريق في المطبخ!",
      "لو سمحت، أنا ضايع.",
      "وين مركز الشرطة؟"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Excuse me, I'm ___.",
     "options": [
      "lose",
      "lost",
      "loss"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Emergencies"
   },
   {
    "kind": "highlight",
    "text": "Emergencies"
   },
   {
    "kind": "example",
    "en": "Help! Somebody help me!",
    "ar": "الحقوا! أحد يساعدني!"
   },
   {
    "kind": "example",
    "en": "Call an ambulance!",
    "ar": "اتصلوا بالإسعاف!"
   }
  ],
  "kids": {
   "listTitle": "Emergencies",
   "cards": [
    {
     "emoji": "🆘",
     "en": "Help! Somebody help me!",
     "ar": "الحقوا! أحد يساعدني!",
     "hl": "Help"
    },
    {
     "emoji": "🚑",
     "en": "Call an ambulance!",
     "ar": "اتصلوا بالإسعاف!",
     "hl": "ambulance"
    },
    {
     "emoji": "🔥",
     "en": "There's a fire in the kitchen!",
     "ar": "فيه حريق في المطبخ!",
     "hl": "fire"
    },
    {
     "emoji": "🗺️",
     "en": "Excuse me, I'm lost.",
     "ar": "لو سمحت، أنا ضايع.",
     "hl": "lost"
    },
    {
     "emoji": "👮",
     "en": "Where is the police station?",
     "ar": "وين مركز الشرطة؟",
     "hl": "station"
    },
    {
     "emoji": "🩸",
     "en": "He's hurt. He needs a doctor.",
     "ar": "هو متعور. يحتاج دكتور.",
     "hl": "hurt"
    }
   ],
   "say": "Emergencies Help! Somebody help me! Call an ambulance! There's a fire in the kitchen! Excuse me, I'm lost. Where is the police station? He's hurt. He needs a doctor."
  }
 },
 {
  "id": "haya-117",
  "order": 117,
  "levelId": "l4",
  "titleAr": "التهاني والأمنيات",
  "titleEn": "Congratulations and Wishes",
  "content": {
   "explanationAr": "نهنّي ونتمنى: Happy birthday! عيد ميلاد سعيد، Eid Mubarak! عيد مبارك، Get well soon! سلامتك، Have a nice trip! رحلة سعيدة.",
   "altExplanationAr": "Congratulations on your new baby!",
   "example": [
    {
     "en": "Happy birthday, my friend!",
     "ar": "عيد ميلاد سعيد يا صديقي!"
    },
    {
     "en": "Eid Mubarak to you and your family!",
     "ar": "عيد مبارك عليك وعلى عائلتك!"
    },
    {
     "en": "Get well soon!",
     "ar": "سلامتك! الله يشفيك!"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Happy ___, my friend!",
    "options": [
     "birth",
     "birthdays",
     "birthday"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Eid Mubarak to you and your ___!",
     "options": [
      "family",
      "families",
      "familiar"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Get well soon!",
     "options": [
      "رحلة سعيدة!",
      "سلامتك! الله يشفيك!",
      "مبروك المولود الجديد!"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Have a nice ___!",
     "options": [
      "tip",
      "trap",
      "trip"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Congratulations and Wishes"
   },
   {
    "kind": "highlight",
    "text": "Wishes"
   },
   {
    "kind": "example",
    "en": "Happy birthday, my friend!",
    "ar": "عيد ميلاد سعيد يا صديقي!"
   },
   {
    "kind": "example",
    "en": "Eid Mubarak to you and your family!",
    "ar": "عيد مبارك عليك وعلى عائلتك!"
   }
  ],
  "kids": {
   "listTitle": "Wishes",
   "cards": [
    {
     "emoji": "🎂",
     "en": "Happy birthday, my friend!",
     "ar": "عيد ميلاد سعيد يا صديقي!",
     "hl": "birthday"
    },
    {
     "emoji": "🌙",
     "en": "Eid Mubarak to you and your family!",
     "ar": "عيد مبارك عليك وعلى عائلتك!",
     "hl": "family"
    },
    {
     "emoji": "💐",
     "en": "Get well soon!",
     "ar": "سلامتك! الله يشفيك!",
     "hl": "soon"
    },
    {
     "emoji": "✈️",
     "en": "Have a nice trip!",
     "ar": "رحلة سعيدة!",
     "hl": "trip"
    },
    {
     "emoji": "👶",
     "en": "Congratulations on your new baby!",
     "ar": "مبروك المولود الجديد!",
     "hl": "on"
    },
    {
     "emoji": "🍀",
     "en": "Best of luck in your new job!",
     "ar": "كل التوفيق في وظيفتك الجديدة!",
     "hl": "luck"
    }
   ],
   "say": "Wishes Happy birthday, my friend! Eid Mubarak to you and your family! Get well soon! Have a nice trip! Congratulations on your new baby! Best of luck in your new job!"
  }
 },
 {
  "id": "haya-118",
  "order": 118,
  "levelId": "l4",
  "titleAr": "مراجعة: السفر والأماكن",
  "titleEn": "Review: Travel and Places",
  "content": {
   "explanationAr": "نراجع جمل المطار والفندق والتاكسي والتسوق.",
   "altExplanationAr": "تخيل إنك مسافر، وقل كل جملة كأنك هناك.",
   "example": [
    {
     "en": "Where can I get my bags?",
     "ar": "وين أستلم شنطي؟"
    },
    {
     "en": "Is breakfast included?",
     "ar": "الفطور مشمول؟"
    },
    {
     "en": "Please drive slowly.",
     "ar": "سق بشويش لو سمحت."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Where can I ___ my bags?",
    "options": [
     "get",
     "got",
     "gets"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Is breakfast ___?",
     "options": [
      "include",
      "included",
      "includes"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Please drive slowly.",
     "options": [
      "ممكن أرجّع هالقميص؟",
      "هو بعيد من هنا؟",
      "سق بشويش لو سمحت."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Can I ___ this shirt?",
     "options": [
      "return",
      "returns",
      "returned"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Review: Travel and Places"
   },
   {
    "kind": "highlight",
    "text": "Review"
   },
   {
    "kind": "example",
    "en": "Where can I get my bags?",
    "ar": "وين أستلم شنطي؟"
   },
   {
    "kind": "example",
    "en": "Is breakfast included?",
    "ar": "الفطور مشمول؟"
   }
  ],
  "kids": {
   "listTitle": "Review",
   "cards": [
    {
     "emoji": "🛄",
     "en": "Where can I get my bags?",
     "ar": "وين أستلم شنطي؟",
     "hl": "get"
    },
    {
     "emoji": "🏨",
     "en": "Is breakfast included?",
     "ar": "الفطور مشمول؟",
     "hl": "included"
    },
    {
     "emoji": "🚖",
     "en": "Please drive slowly.",
     "ar": "سق بشويش لو سمحت.",
     "hl": "slowly"
    },
    {
     "emoji": "🛍️",
     "en": "Can I return this shirt?",
     "ar": "ممكن أرجّع هالقميص؟",
     "hl": "return"
    },
    {
     "emoji": "🗺️",
     "en": "Is it far from here?",
     "ar": "هو بعيد من هنا؟",
     "hl": "far"
    },
    {
     "emoji": "💵",
     "en": "Do you take credit cards?",
     "ar": "تقبلون بطاقات ائتمان؟",
     "hl": "take"
    }
   ],
   "say": "Review Where can I get my bags? Is breakfast included? Please drive slowly. Can I return this shirt? Is it far from here? Do you take credit cards?"
  }
 },
 {
  "id": "haya-119",
  "order": 119,
  "levelId": "l4",
  "titleAr": "مراجعة: الكلام اليومي",
  "titleEn": "Review: Everyday Talk",
  "content": {
   "explanationAr": "نراجع الدعوات والاقتراحات والنصيحة والإذن والاعتذار.",
   "altExplanationAr": "Would you like...? How about...? You should... May I...? I'm sorry...",
   "example": [
    {
     "en": "Would you like to order pizza?",
     "ar": "تحب نطلب بيتزا؟"
    },
    {
     "en": "How about camping this weekend?",
     "ar": "وش رايك نخيّم هالويكند؟"
    },
    {
     "en": "You should take a jacket.",
     "ar": "المفروض تاخذ جاكيت."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Would you ___ to order pizza?",
    "options": [
     "likes",
     "like",
     "liked"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ about camping this weekend?",
     "options": [
      "Why",
      "Who",
      "How"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "You should take a jacket.",
     "options": [
      "المفروض تاخذ جاكيت.",
      "ممكن أستلف قلمك؟",
      "آسف نسيت أتصل عليك."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "May I ___ your pen?",
     "options": [
      "lend",
      "borrow",
      "borrows"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Review: Everyday Talk"
   },
   {
    "kind": "highlight",
    "text": "Review"
   },
   {
    "kind": "example",
    "en": "Would you like to order pizza?",
    "ar": "تحب نطلب بيتزا؟"
   },
   {
    "kind": "example",
    "en": "How about camping this weekend?",
    "ar": "وش رايك نخيّم هالويكند؟"
   }
  ],
  "kids": {
   "listTitle": "Review",
   "cards": [
    {
     "emoji": "🍕",
     "en": "Would you like to order pizza?",
     "ar": "تحب نطلب بيتزا؟",
     "hl": "like"
    },
    {
     "emoji": "🏕️",
     "en": "How about camping this weekend?",
     "ar": "وش رايك نخيّم هالويكند؟",
     "hl": "How"
    },
    {
     "emoji": "🧥",
     "en": "You should take a jacket.",
     "ar": "المفروض تاخذ جاكيت.",
     "hl": "should"
    },
    {
     "emoji": "🖊️",
     "en": "May I borrow your pen?",
     "ar": "ممكن أستلف قلمك؟",
     "hl": "borrow"
    },
    {
     "emoji": "🙏",
     "en": "I'm sorry I forgot to call you.",
     "ar": "آسف نسيت أتصل عليك.",
     "hl": "forgot"
    },
    {
     "emoji": "🙌",
     "en": "Thanks for your help.",
     "ar": "شكرًا على مساعدتك.",
     "hl": "for"
    }
   ],
   "say": "Review Would you like to order pizza? How about camping this weekend? You should take a jacket. May I borrow your pen? I'm sorry I forgot to call you. Thanks for your help."
  }
 },
 {
  "id": "haya-120",
  "order": 120,
  "levelId": "l4",
  "titleAr": "المراجعة النهائية",
  "titleEn": "Final Review",
  "content": {
   "explanationAr": "المراجعة النهائية لكل مستويات هيا: الحاضر والماضي والمستقبل وجمل الحياة اليومية. أحسنت!",
   "altExplanationAr": "اقرأ كل جملة وقل هل هي حاضر ولا ماضي ولا مستقبل ولا طلب.",
   "example": [
    {
     "en": "She always wakes up before sunrise.",
     "ar": "دايمًا تصحى قبل الشروق."
    },
    {
     "en": "Last year we camped in the desert.",
     "ar": "السنة اللي فاتت خيّمنا في البر."
    },
    {
     "en": "We are going to fly to Turkey.",
     "ar": "بنطير لتركيا."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "She always ___ up before sunrise.",
    "options": [
     "wake",
     "woke",
     "wakes"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Last year we ___ in the desert.",
     "options": [
      "camped",
      "camp",
      "camps"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "We are going to fly to Turkey.",
     "options": [
      "المفروض تشوف دكتور قريب.",
      "بنطير لتركيا.",
      "تعلمت إنجليزي كثير."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "You should ___ a doctor soon.",
     "options": [
      "sees",
      "saw",
      "see"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Final Review"
   },
   {
    "kind": "highlight",
    "text": "Final Review"
   },
   {
    "kind": "example",
    "en": "She always wakes up before sunrise.",
    "ar": "دايمًا تصحى قبل الشروق."
   },
   {
    "kind": "example",
    "en": "Last year we camped in the desert.",
    "ar": "السنة اللي فاتت خيّمنا في البر."
   }
  ],
  "kids": {
   "listTitle": "Final Review",
   "cards": [
    {
     "emoji": "🌅",
     "en": "She always wakes up before sunrise.",
     "ar": "دايمًا تصحى قبل الشروق.",
     "hl": "wakes"
    },
    {
     "emoji": "🏜️",
     "en": "Last year we camped in the desert.",
     "ar": "السنة اللي فاتت خيّمنا في البر.",
     "hl": "camped"
    },
    {
     "emoji": "🛫",
     "en": "We are going to fly to Turkey.",
     "ar": "بنطير لتركيا.",
     "hl": "fly"
    },
    {
     "emoji": "🧑‍⚕️",
     "en": "You should see a doctor soon.",
     "ar": "المفروض تشوف دكتور قريب.",
     "hl": "see"
    },
    {
     "emoji": "🗣️",
     "en": "I have learned a lot of English.",
     "ar": "تعلمت إنجليزي كثير.",
     "hl": "learned"
    },
    {
     "emoji": "🏆",
     "en": "I'm proud of you!",
     "ar": "أنا فخورة فيك!",
     "hl": "proud"
    }
   ],
   "say": "Final Review She always wakes up before sunrise. Last year we camped in the desert. We are going to fly to Turkey. You should see a doctor soon. I have learned a lot of English. I'm proud of you!"
  }
 }
];
