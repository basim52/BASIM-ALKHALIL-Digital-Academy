/** Basic Sentences with Haya: 30 «من الصفر» lessons (3 levels × 10), card board per lesson. Generated from /workspace/kidsgen (literal spoken lines: trigram allow-list → voice works without a token). */
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
  "levelId": "l2",
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
  "levelId": "l2",
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
  "levelId": "l2",
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
  "levelId": "l2",
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
  "levelId": "l2",
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
  "levelId": "l2",
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
  "levelId": "l2",
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
  "levelId": "l2",
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
  "levelId": "l2",
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
  "levelId": "l2",
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
  "levelId": "l3",
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
  "levelId": "l3",
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
  "levelId": "l3",
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
  "levelId": "l3",
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
  "levelId": "l3",
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
  "levelId": "l3",
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
  "levelId": "l3",
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
  "levelId": "l3",
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
      "ممكن الفاتورة لو سمحت؟",
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
     "emoji": "🧾",
     "en": "Can I have the bill, please?",
     "ar": "ممكن الفاتورة لو سمحت؟",
     "hl": "bill"
    },
    {
     "emoji": "🙏",
     "en": "Thank you very much.",
     "ar": "شكرًا جزيلًا.",
     "hl": "much"
    }
   ],
   "say": "In the Restaurant A table for two, please. I would like chicken. Can I have some water? The food is delicious. Can I have the bill, please? Thank you very much."
  }
 },
 {
  "id": "haya-29",
  "order": 29,
  "levelId": "l3",
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
  "levelId": "l3",
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
 }
];
