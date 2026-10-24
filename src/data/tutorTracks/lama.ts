/** Letters and Sounds with Lama: 120 «من الصفر» lessons (4 levels × 30; lessons 1-30 = level 1, ids/orders unchanged), card board per lesson. Generated from /workspace/kidsgen (literal spoken lines: trigram allow-list → voice works without a token). */
import type { TutorLesson } from './nouraL1';

export const LAMA_LESSONS: TutorLesson[] = [
 {
  "id": "lama-01",
  "order": 1,
  "levelId": "l1",
  "titleAr": "الحروف من A إلى E",
  "titleEn": "Letters A to E",
  "content": {
   "explanationAr": "نبدأ بأول خمس حروف: A و B و C و D و E. كل حرف له صوت، واسمع الصوت في أول كل كلمة: apple تبدأ بصوت A، و ball تبدأ بصوت B.",
   "altExplanationAr": "ركّز على أول صوت تسمعه في الكلمة. cat أولها صوت C مثل «ك»، و dog أولها صوت D مثل «د».",
   "example": [
    {
     "en": "apple",
     "ar": "تفاحة"
    },
    {
     "en": "ant",
     "ar": "نملة"
    },
    {
     "en": "ball",
     "ar": "كرة"
    }
   ],
   "check": {
    "promptAr": "أي كلمة تبدأ بحرف B؟",
    "options": [
     "ball",
     "cat",
     "egg"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "وش معنى cat؟",
     "options": [
      "بطة",
      "قطة",
      "تفاحة"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي كلمة معناها «سيارة»؟",
     "options": [
      "egg",
      "ant",
      "car"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي صورة تناسب كلمة dog؟",
     "options": [
      "🐶",
      "🐘",
      "⚽"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Letters A to E"
   },
   {
    "kind": "highlight",
    "text": "A apple, B ball, C cat, D dog, E egg"
   },
   {
    "kind": "example",
    "en": "apple",
    "ar": "تفاحة"
   },
   {
    "kind": "example",
    "en": "ant",
    "ar": "نملة"
   }
  ],
  "kids": {
   "listTitle": "Letters A to E",
   "cards": [
    {
     "emoji": "🍎",
     "en": "apple",
     "ar": "تفاحة"
    },
    {
     "emoji": "🐜",
     "en": "ant",
     "ar": "نملة"
    },
    {
     "emoji": "⚽",
     "en": "ball",
     "ar": "كرة"
    },
    {
     "emoji": "🍌",
     "en": "banana",
     "ar": "موز"
    },
    {
     "emoji": "🐱",
     "en": "cat",
     "ar": "قطة"
    },
    {
     "emoji": "🚗",
     "en": "car",
     "ar": "سيارة"
    },
    {
     "emoji": "🐶",
     "en": "dog",
     "ar": "كلب"
    },
    {
     "emoji": "🦆",
     "en": "duck",
     "ar": "بطة"
    },
    {
     "emoji": "🥚",
     "en": "egg",
     "ar": "بيضة"
    },
    {
     "emoji": "🐘",
     "en": "elephant",
     "ar": "فيل"
    }
   ],
   "say": "Letters A to E. apple. ant. ball. banana. cat. car. dog. duck. egg. elephant."
  }
 },
 {
  "id": "lama-02",
  "order": 2,
  "levelId": "l1",
  "titleAr": "الحروف من F إلى J",
  "titleEn": "Letters F to J",
  "content": {
   "explanationAr": "الحروف F و G و H و I و J. صوت F مثل «ف» في fish، وصوت H خفيف مثل «هـ» في house، وصوت J مثل «ج» في juice.",
   "altExplanationAr": "قل الكلمة ببطء واسمع أولها: fish أولها «ف»، و goat أولها صوت G مثل «ق» في كلمة «قال» باللهجة.",
   "example": [
    {
     "en": "fish",
     "ar": "سمكة"
    },
    {
     "en": "fork",
     "ar": "شوكة"
    },
    {
     "en": "goat",
     "ar": "ماعز"
    }
   ],
   "check": {
    "promptAr": "أي كلمة تبدأ بصوت «ج»؟",
    "options": [
     "goat",
     "house",
     "juice"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "وش معنى fish؟",
     "options": [
      "عنب",
      "حشرة",
      "سمكة"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي كلمة معناها «شوكة»؟",
     "options": [
      "fork",
      "hat",
      "ink"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي صورة تناسب كلمة goat؟",
     "options": [
      "🏠",
      "🐐",
      "🧃"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Letters F to J"
   },
   {
    "kind": "highlight",
    "text": "F fish, G goat, H house, I ink, J juice"
   },
   {
    "kind": "example",
    "en": "fish",
    "ar": "سمكة"
   },
   {
    "kind": "example",
    "en": "fork",
    "ar": "شوكة"
   }
  ],
  "kids": {
   "listTitle": "Letters F to J",
   "cards": [
    {
     "emoji": "🐟",
     "en": "fish",
     "ar": "سمكة"
    },
    {
     "emoji": "🍴",
     "en": "fork",
     "ar": "شوكة"
    },
    {
     "emoji": "🐐",
     "en": "goat",
     "ar": "ماعز"
    },
    {
     "emoji": "🍇",
     "en": "grapes",
     "ar": "عنب"
    },
    {
     "emoji": "👒",
     "en": "hat",
     "ar": "قبعة"
    },
    {
     "emoji": "🏠",
     "en": "house",
     "ar": "بيت"
    },
    {
     "emoji": "🐛",
     "en": "insect",
     "ar": "حشرة"
    },
    {
     "emoji": "🖋️",
     "en": "ink",
     "ar": "حبر"
    },
    {
     "emoji": "🧃",
     "en": "juice",
     "ar": "عصير"
    },
    {
     "emoji": "🧥",
     "en": "jacket",
     "ar": "جاكيت"
    }
   ],
   "say": "Letters F to J. fish. fork. goat. grapes. hat. house. insect. ink. juice. jacket."
  }
 },
 {
  "id": "lama-03",
  "order": 3,
  "levelId": "l1",
  "titleAr": "الحروف من K إلى O",
  "titleEn": "Letters K to O",
  "content": {
   "explanationAr": "الحروف K و L و M و N و O. صوت K مثل «ك» في key، وصوت L مثل «ل» في lion، وصوت M مثل «م» في moon.",
   "altExplanationAr": "حط إصبعك على شفايفك وقل moon: تحس إن شفايفك تتسكر مع صوت M. أما N فلسانك يلمس فوق أسنانك.",
   "example": [
    {
     "en": "key",
     "ar": "مفتاح"
    },
    {
     "en": "kite",
     "ar": "طائرة ورقية"
    },
    {
     "en": "lion",
     "ar": "أسد"
    }
   ],
   "check": {
    "promptAr": "أي كلمة تبدأ بحرف M؟",
    "options": [
     "moon",
     "nose",
     "lion"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "وش معنى net؟",
     "options": [
      "شبكة",
      "مفتاح",
      "ليمون"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي كلمة معناها «برتقال»؟",
     "options": [
      "kite",
      "orange",
      "moon"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي صورة تناسب كلمة octopus؟",
     "options": [
      "🦁",
      "🥛",
      "🐙"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Letters K to O"
   },
   {
    "kind": "highlight",
    "text": "K key, L lion, M moon, N nose, O orange"
   },
   {
    "kind": "example",
    "en": "key",
    "ar": "مفتاح"
   },
   {
    "kind": "example",
    "en": "kite",
    "ar": "طائرة ورقية"
   }
  ],
  "kids": {
   "listTitle": "Letters K to O",
   "cards": [
    {
     "emoji": "🔑",
     "en": "key",
     "ar": "مفتاح"
    },
    {
     "emoji": "🪁",
     "en": "kite",
     "ar": "طائرة ورقية"
    },
    {
     "emoji": "🦁",
     "en": "lion",
     "ar": "أسد"
    },
    {
     "emoji": "🍋",
     "en": "lemon",
     "ar": "ليمون"
    },
    {
     "emoji": "🌙",
     "en": "moon",
     "ar": "قمر"
    },
    {
     "emoji": "🥛",
     "en": "milk",
     "ar": "حليب"
    },
    {
     "emoji": "👃",
     "en": "nose",
     "ar": "أنف"
    },
    {
     "emoji": "🥅",
     "en": "net",
     "ar": "شبكة"
    },
    {
     "emoji": "🍊",
     "en": "orange",
     "ar": "برتقال"
    },
    {
     "emoji": "🐙",
     "en": "octopus",
     "ar": "أخطبوط"
    }
   ],
   "say": "Letters K to O. key. kite. lion. lemon. moon. milk. nose. net. orange. octopus."
  }
 },
 {
  "id": "lama-04",
  "order": 4,
  "levelId": "l1",
  "titleAr": "الحروف من P إلى T",
  "titleEn": "Letters P to T",
  "content": {
   "explanationAr": "الحروف P و Q و R و S و T. صوت S مثل «س» في sun، وصوت T مثل «ت» في tree، وصوت R نقوله واللسان ما يرجف.",
   "altExplanationAr": "حرف Q دايمًا يجي بعده U تقريبًا، ونقول صوتهم «كو» مثل queen و question.",
   "example": [
    {
     "en": "pen",
     "ar": "قلم"
    },
    {
     "en": "pizza",
     "ar": "بيتزا"
    },
    {
     "en": "queen",
     "ar": "ملكة"
    }
   ],
   "check": {
    "promptAr": "أي كلمة تبدأ بصوت «س»؟",
    "options": [
     "tree",
     "rain",
     "sun"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "وش معنى sock؟",
     "options": [
      "قلم",
      "جورب",
      "سؤال"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي كلمة معناها «شجرة»؟",
     "options": [
      "pizza",
      "rabbit",
      "tree"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي صورة تناسب كلمة tomato؟",
     "options": [
      "🍅",
      "👑",
      "🌧️"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Letters P to T"
   },
   {
    "kind": "highlight",
    "text": "P pen, Q queen, R rain, S sun, T tree"
   },
   {
    "kind": "example",
    "en": "pen",
    "ar": "قلم"
   },
   {
    "kind": "example",
    "en": "pizza",
    "ar": "بيتزا"
   }
  ],
  "kids": {
   "listTitle": "Letters P to T",
   "cards": [
    {
     "emoji": "🖊️",
     "en": "pen",
     "ar": "قلم"
    },
    {
     "emoji": "🍕",
     "en": "pizza",
     "ar": "بيتزا"
    },
    {
     "emoji": "👑",
     "en": "queen",
     "ar": "ملكة"
    },
    {
     "emoji": "❓",
     "en": "question",
     "ar": "سؤال"
    },
    {
     "emoji": "🐰",
     "en": "rabbit",
     "ar": "أرنب"
    },
    {
     "emoji": "🌧️",
     "en": "rain",
     "ar": "مطر"
    },
    {
     "emoji": "☀️",
     "en": "sun",
     "ar": "شمس"
    },
    {
     "emoji": "🧦",
     "en": "sock",
     "ar": "جورب"
    },
    {
     "emoji": "🌳",
     "en": "tree",
     "ar": "شجرة"
    },
    {
     "emoji": "🍅",
     "en": "tomato",
     "ar": "طماطم"
    }
   ],
   "say": "Letters P to T. pen. pizza. queen. question. rabbit. rain. sun. sock. tree. tomato."
  }
 },
 {
  "id": "lama-05",
  "order": 5,
  "levelId": "l1",
  "titleAr": "الحروف من U إلى Z",
  "titleEn": "Letters U to Z",
  "content": {
   "explanationAr": "آخر الحروف: U و V و W و X و Y و Z. صوت W نقوله والشفايف مدورة مثل water، وصوت Z مثل «ز» في zebra.",
   "altExplanationAr": "حرف X غالبًا يجي في آخر الكلمة ونقوله «كس» مثل box و fox.",
   "example": [
    {
     "en": "umbrella",
     "ar": "مظلة"
    },
    {
     "en": "up",
     "ar": "فوق"
    },
    {
     "en": "vest",
     "ar": "سترة"
    }
   ],
   "check": {
    "promptAr": "في أي كلمة تسمع صوت «كس» في الآخر؟",
    "options": [
     "zebra",
     "box",
     "water"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "وش معنى vest؟",
     "options": [
      "ساعة يد",
      "أصفر",
      "سترة"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي كلمة معناها «كرة طائرة»؟",
     "options": [
      "volleyball",
      "box",
      "zebra"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي صورة تناسب كلمة water؟",
     "options": [
      "🦊",
      "💧",
      "☂️"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Letters U to Z"
   },
   {
    "kind": "highlight",
    "text": "U up, V vest, W water, X box, Y yellow, Z zebra"
   },
   {
    "kind": "example",
    "en": "umbrella",
    "ar": "مظلة"
   },
   {
    "kind": "example",
    "en": "up",
    "ar": "فوق"
   }
  ],
  "kids": {
   "listTitle": "Letters U to Z",
   "cards": [
    {
     "emoji": "☂️",
     "en": "umbrella",
     "ar": "مظلة"
    },
    {
     "emoji": "⬆️",
     "en": "up",
     "ar": "فوق"
    },
    {
     "emoji": "🦺",
     "en": "vest",
     "ar": "سترة"
    },
    {
     "emoji": "🏐",
     "en": "volleyball",
     "ar": "كرة طائرة"
    },
    {
     "emoji": "💧",
     "en": "water",
     "ar": "ماء"
    },
    {
     "emoji": "⌚",
     "en": "watch",
     "ar": "ساعة يد"
    },
    {
     "emoji": "📦",
     "en": "box",
     "ar": "صندوق"
    },
    {
     "emoji": "🦊",
     "en": "fox",
     "ar": "ثعلب"
    },
    {
     "emoji": "💛",
     "en": "yellow",
     "ar": "أصفر"
    },
    {
     "emoji": "🦓",
     "en": "zebra",
     "ar": "حمار وحشي"
    }
   ],
   "say": "Letters U to Z. umbrella. up. vest. volleyball. water. watch. box. fox. yellow. zebra."
  }
 },
 {
  "id": "lama-06",
  "order": 6,
  "levelId": "l1",
  "titleAr": "الفرق بين B و P",
  "titleEn": "B and P",
  "content": {
   "explanationAr": "العربي ما فيه حرف P، فكثير يقولون bark بدل park. حرف B صوته مثل «ب»، أما P فنقوله بنفخة هوا من الشفايف.",
   "altExplanationAr": "حط ورقة قدام فمك: مع P الورقة تتحرك من الهوا، ومع B ما تتحرك.",
   "example": [
    {
     "en": "ball",
     "ar": "كرة"
    },
    {
     "en": "bag",
     "ar": "شنطة"
    },
    {
     "en": "bus",
     "ar": "باص"
    }
   ],
   "check": {
    "promptAr": "أي كلمة تبدأ بصوت P؟",
    "options": [
     "bus",
     "book",
     "park"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "وش معنى bus؟",
     "options": [
      "باص",
      "قلم",
      "مقلاة"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي كلمة معناها «سرير»؟",
     "options": [
      "park",
      "bed",
      "popcorn"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي صورة تناسب كلمة book؟",
     "options": [
      "🍐",
      "⚽",
      "📖"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "B and P"
   },
   {
    "kind": "highlight",
    "text": "B is like the Arabic ba. P has a puff of air."
   },
   {
    "kind": "example",
    "en": "ball",
    "ar": "كرة"
   },
   {
    "kind": "example",
    "en": "bag",
    "ar": "شنطة"
   }
  ],
  "kids": {
   "listTitle": "10 Words with B and P",
   "cards": [
    {
     "emoji": "⚽",
     "en": "ball",
     "ar": "كرة"
    },
    {
     "emoji": "👜",
     "en": "bag",
     "ar": "شنطة"
    },
    {
     "emoji": "🚌",
     "en": "bus",
     "ar": "باص"
    },
    {
     "emoji": "🛏️",
     "en": "bed",
     "ar": "سرير"
    },
    {
     "emoji": "📖",
     "en": "book",
     "ar": "كتاب"
    },
    {
     "emoji": "🖊️",
     "en": "pen",
     "ar": "قلم"
    },
    {
     "emoji": "🏞️",
     "en": "park",
     "ar": "حديقة"
    },
    {
     "emoji": "🍐",
     "en": "pear",
     "ar": "كمثرى"
    },
    {
     "emoji": "🍳",
     "en": "pan",
     "ar": "مقلاة"
    },
    {
     "emoji": "🍿",
     "en": "popcorn",
     "ar": "فشار"
    }
   ],
   "say": "10 Words with B and P. ball. bag. bus. bed. book. pen. park. pear. pan. popcorn."
  }
 },
 {
  "id": "lama-07",
  "order": 7,
  "levelId": "l1",
  "titleAr": "الفرق بين F و V",
  "titleEn": "F and V",
  "content": {
   "explanationAr": "حرف F صوته مثل «ف». حرف V نفس مكان F، بس نخلي الصوت يطلع من الحلق، فيصير مثل «ف» ثقيلة فيها رجفة.",
   "altExplanationAr": "حط يدك على رقبتك: مع V تحس برجفة، ومع F ما فيه رجفة.",
   "example": [
    {
     "en": "five",
     "ar": "خمسة"
    },
    {
     "en": "foot",
     "ar": "قدم"
    },
    {
     "en": "fire",
     "ar": "نار"
    }
   ],
   "check": {
    "promptAr": "أي كلمة تبدأ بصوت V؟",
    "options": [
     "van",
     "fire",
     "foot"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "وش معنى foot؟",
     "options": [
      "ضفدع",
      "قدم",
      "بركان"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي كلمة معناها «نار»؟",
     "options": [
      "van",
      "vegetables",
      "fire"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي صورة تناسب كلمة flower؟",
     "options": [
      "🌸",
      "🏺",
      "📹"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "F and V"
   },
   {
    "kind": "highlight",
    "text": "F has no buzz. V has a buzz."
   },
   {
    "kind": "example",
    "en": "five",
    "ar": "خمسة"
   },
   {
    "kind": "example",
    "en": "foot",
    "ar": "قدم"
   }
  ],
  "kids": {
   "listTitle": "10 Words with F and V",
   "cards": [
    {
     "emoji": "5️⃣",
     "en": "five",
     "ar": "خمسة"
    },
    {
     "emoji": "🦶",
     "en": "foot",
     "ar": "قدم"
    },
    {
     "emoji": "🔥",
     "en": "fire",
     "ar": "نار"
    },
    {
     "emoji": "🌸",
     "en": "flower",
     "ar": "وردة"
    },
    {
     "emoji": "🐸",
     "en": "frog",
     "ar": "ضفدع"
    },
    {
     "emoji": "🚐",
     "en": "van",
     "ar": "فان"
    },
    {
     "emoji": "🏺",
     "en": "vase",
     "ar": "مزهرية"
    },
    {
     "emoji": "🌋",
     "en": "volcano",
     "ar": "بركان"
    },
    {
     "emoji": "🥦",
     "en": "vegetables",
     "ar": "خضار"
    },
    {
     "emoji": "📹",
     "en": "video",
     "ar": "فيديو"
    }
   ],
   "say": "10 Words with F and V. five. foot. fire. flower. frog. van. vase. volcano. vegetables. video."
  }
 },
 {
  "id": "lama-08",
  "order": 8,
  "levelId": "l1",
  "titleAr": "صوت SH",
  "titleEn": "The SH Sound",
  "content": {
   "explanationAr": "لما يجي S وبعده H يصير صوت واحد مثل «ش». نسمعه في أول ship وفي آخر fish.",
   "altExplanationAr": "SH حرفين بس صوت واحد. قل «ش» مثل لما تطلب الهدوء، وهذا هو صوت SH.",
   "example": [
    {
     "en": "ship",
     "ar": "سفينة"
    },
    {
     "en": "shoe",
     "ar": "حذاء"
    },
    {
     "en": "sheep",
     "ar": "خروف"
    }
   ],
   "check": {
    "promptAr": "أي كلمة فيها صوت «ش»؟",
    "options": [
     "sock",
     "sun",
     "shell"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "وش معنى shower؟",
     "options": [
      "فرشاة",
      "حذاء",
      "دش"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي كلمة معناها «محل»؟",
     "options": [
      "shop",
      "wash",
      "sheep"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي صورة تناسب كلمة fish؟",
     "options": [
      "🚢",
      "🐟",
      "🐚"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The SH Sound"
   },
   {
    "kind": "highlight",
    "text": "S and H together sound like sheen"
   },
   {
    "kind": "example",
    "en": "ship",
    "ar": "سفينة"
   },
   {
    "kind": "example",
    "en": "shoe",
    "ar": "حذاء"
   }
  ],
  "kids": {
   "listTitle": "10 Words with SH",
   "cards": [
    {
     "emoji": "🚢",
     "en": "ship",
     "ar": "سفينة"
    },
    {
     "emoji": "👟",
     "en": "shoe",
     "ar": "حذاء"
    },
    {
     "emoji": "🐑",
     "en": "sheep",
     "ar": "خروف"
    },
    {
     "emoji": "🐚",
     "en": "shell",
     "ar": "صدفة"
    },
    {
     "emoji": "👕",
     "en": "shirt",
     "ar": "قميص"
    },
    {
     "emoji": "🚿",
     "en": "shower",
     "ar": "دش"
    },
    {
     "emoji": "🏪",
     "en": "shop",
     "ar": "محل"
    },
    {
     "emoji": "🐟",
     "en": "fish",
     "ar": "سمكة"
    },
    {
     "emoji": "🪥",
     "en": "brush",
     "ar": "فرشاة"
    },
    {
     "emoji": "🧼",
     "en": "wash",
     "ar": "يغسل"
    }
   ],
   "say": "10 Words with SH. ship. shoe. sheep. shell. shirt. shower. shop. fish. brush. wash."
  }
 },
 {
  "id": "lama-09",
  "order": 9,
  "levelId": "l1",
  "titleAr": "صوت CH",
  "titleEn": "The CH Sound",
  "content": {
   "explanationAr": "لما يجي C وبعده H يصير صوت «تش». نسمعه في أول chair وفي آخر watch.",
   "altExplanationAr": "CH مثل «ت» و «ش» مع بعض بسرعة: تش. جرّب تقول cheese.",
   "example": [
    {
     "en": "chair",
     "ar": "كرسي"
    },
    {
     "en": "cheese",
     "ar": "جبن"
    },
    {
     "en": "chicken",
     "ar": "دجاجة"
    }
   ],
   "check": {
    "promptAr": "أي كلمة فيها صوت «تش»؟",
    "options": [
     "shoe",
     "sock",
     "cheese"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "وش معنى sandwich؟",
     "options": [
      "ساندويتش",
      "دجاجة",
      "بطاطس مقلية"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي كلمة معناها «كرسي»؟",
     "options": [
      "cherry",
      "chair",
      "lunch"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي صورة تناسب كلمة cheese؟",
     "options": [
      "🍫",
      "⌚",
      "🧀"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The CH Sound"
   },
   {
    "kind": "highlight",
    "text": "C and H together sound like tsh"
   },
   {
    "kind": "example",
    "en": "chair",
    "ar": "كرسي"
   },
   {
    "kind": "example",
    "en": "cheese",
    "ar": "جبن"
   }
  ],
  "kids": {
   "listTitle": "10 Words with CH",
   "cards": [
    {
     "emoji": "🪑",
     "en": "chair",
     "ar": "كرسي"
    },
    {
     "emoji": "🧀",
     "en": "cheese",
     "ar": "جبن"
    },
    {
     "emoji": "🐔",
     "en": "chicken",
     "ar": "دجاجة"
    },
    {
     "emoji": "🍒",
     "en": "cherry",
     "ar": "كرز"
    },
    {
     "emoji": "🍫",
     "en": "chocolate",
     "ar": "شوكولاتة"
    },
    {
     "emoji": "🍟",
     "en": "chips",
     "ar": "بطاطس مقلية"
    },
    {
     "emoji": "🍱",
     "en": "lunch",
     "ar": "غداء"
    },
    {
     "emoji": "⌚",
     "en": "watch",
     "ar": "ساعة يد"
    },
    {
     "emoji": "🏖️",
     "en": "beach",
     "ar": "شاطئ"
    },
    {
     "emoji": "🥪",
     "en": "sandwich",
     "ar": "ساندويتش"
    }
   ],
   "say": "10 Words with CH. chair. cheese. chicken. cherry. chocolate. chips. lunch. watch. beach. sandwich."
  }
 },
 {
  "id": "lama-10",
  "order": 10,
  "levelId": "l1",
  "titleAr": "صوت TH",
  "titleEn": "The TH Sound",
  "content": {
   "explanationAr": "لما يجي T وبعده H يصير صوت مثل «ث» في three، أو مثل «ذ» في this. نطلع طرف اللسان شوي بين الأسنان.",
   "altExplanationAr": "لا تقول sree ولا tree بدل three. طلّع لسانك شوي وقل «ث».",
   "example": [
    {
     "en": "three",
     "ar": "ثلاثة"
    },
    {
     "en": "thumb",
     "ar": "إبهام"
    },
    {
     "en": "think",
     "ar": "يفكر"
    }
   ],
   "check": {
    "promptAr": "أي كلمة تبدأ بصوت «ث»؟",
    "options": [
     "tree",
     "sock",
     "three"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "وش معنى this؟",
     "options": [
      "إبهام",
      "هذا",
      "أسنان"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي كلمة معناها «ذلك»؟",
     "options": [
      "think",
      "bath",
      "that"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي صورة تناسب كلمة three؟",
     "options": [
      "3️⃣",
      "🙏",
      "📅"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The TH Sound"
   },
   {
    "kind": "highlight",
    "text": "TH: tongue a little between the teeth"
   },
   {
    "kind": "example",
    "en": "three",
    "ar": "ثلاثة"
   },
   {
    "kind": "example",
    "en": "thumb",
    "ar": "إبهام"
   }
  ],
  "kids": {
   "listTitle": "10 Words with TH",
   "cards": [
    {
     "emoji": "3️⃣",
     "en": "three",
     "ar": "ثلاثة"
    },
    {
     "emoji": "👍",
     "en": "thumb",
     "ar": "إبهام"
    },
    {
     "emoji": "🤔",
     "en": "think",
     "ar": "يفكر"
    },
    {
     "emoji": "🙏",
     "en": "thank you",
     "ar": "شكرًا"
    },
    {
     "emoji": "🦷",
     "en": "teeth",
     "ar": "أسنان"
    },
    {
     "emoji": "🛁",
     "en": "bath",
     "ar": "حوض استحمام"
    },
    {
     "emoji": "📅",
     "en": "Thursday",
     "ar": "الخميس"
    },
    {
     "emoji": "🪶",
     "en": "feather",
     "ar": "ريشة"
    },
    {
     "emoji": "👉",
     "en": "this",
     "ar": "هذا"
    },
    {
     "emoji": "👈",
     "en": "that",
     "ar": "ذلك"
    }
   ],
   "say": "10 Words with TH. three. thumb. think. thank you. teeth. bath. Thursday. feather. this. that."
  }
 },
 {
  "id": "lama-11",
  "order": 11,
  "levelId": "l1",
  "titleAr": "صوت A القصير",
  "titleEn": "Short A",
  "content": {
   "explanationAr": "حرف A في كلمات قصيرة مثل cat له صوت قصير مفتوح، بين «آ» و «إ»، والفم مفتوح شوي.",
   "altExplanationAr": "قل cat وكأنك مبتسم والفم مفتوح. نفس الصوت في hat و bag و map.",
   "example": [
    {
     "en": "cat",
     "ar": "قطة"
    },
    {
     "en": "hat",
     "ar": "قبعة"
    },
    {
     "en": "bag",
     "ar": "شنطة"
    }
   ],
   "check": {
    "promptAr": "أي كلمة فيها صوت A القصير؟",
    "options": [
     "pen",
     "map",
     "dog"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "وش معنى cat؟",
     "options": [
      "خريطة",
      "خفاش",
      "قطة"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي كلمة معناها «قبعة»؟",
     "options": [
      "hat",
      "van",
      "apple"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي صورة تناسب كلمة bag؟",
     "options": [
      "🍳",
      "👜",
      "✋"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Short A"
   },
   {
    "kind": "highlight",
    "text": "Short a: cat, hat, bag"
   },
   {
    "kind": "example",
    "en": "cat",
    "ar": "قطة"
   },
   {
    "kind": "example",
    "en": "hat",
    "ar": "قبعة"
   }
  ],
  "kids": {
   "listTitle": "10 Words with Short A",
   "cards": [
    {
     "emoji": "🐱",
     "en": "cat",
     "ar": "قطة"
    },
    {
     "emoji": "👒",
     "en": "hat",
     "ar": "قبعة"
    },
    {
     "emoji": "👜",
     "en": "bag",
     "ar": "شنطة"
    },
    {
     "emoji": "🗺️",
     "en": "map",
     "ar": "خريطة"
    },
    {
     "emoji": "🚐",
     "en": "van",
     "ar": "فان"
    },
    {
     "emoji": "🍳",
     "en": "pan",
     "ar": "مقلاة"
    },
    {
     "emoji": "🦇",
     "en": "bat",
     "ar": "خفاش"
    },
    {
     "emoji": "🍎",
     "en": "apple",
     "ar": "تفاحة"
    },
    {
     "emoji": "✋",
     "en": "hand",
     "ar": "يد"
    },
    {
     "emoji": "⬛",
     "en": "black",
     "ar": "أسود"
    }
   ],
   "say": "10 Words with Short A. cat. hat. bag. map. van. pan. bat. apple. hand. black."
  }
 },
 {
  "id": "lama-12",
  "order": 12,
  "levelId": "l1",
  "titleAr": "صوت E القصير",
  "titleEn": "Short E",
  "content": {
   "explanationAr": "حرف E في كلمات قصيرة مثل bed صوته «إ» قصيرة، مثل الكسرة.",
   "altExplanationAr": "فكّر في كلمة «بِنت»: الكسرة القصيرة هي صوت E في pen و ten و red.",
   "example": [
    {
     "en": "egg",
     "ar": "بيضة"
    },
    {
     "en": "bed",
     "ar": "سرير"
    },
    {
     "en": "pen",
     "ar": "قلم"
    }
   ],
   "check": {
    "promptAr": "أي كلمة فيها صوت E القصير؟",
    "options": [
     "cat",
     "sun",
     "bed"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "وش معنى bed؟",
     "options": [
      "سرير",
      "عشرة",
      "جرس"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي كلمة معناها «قلم»؟",
     "options": [
      "hen",
      "pen",
      "web"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي صورة تناسب كلمة red؟",
     "options": [
      "🦵",
      "⛺",
      "🔴"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Short E"
   },
   {
    "kind": "highlight",
    "text": "Short e: bed, pen, red"
   },
   {
    "kind": "example",
    "en": "egg",
    "ar": "بيضة"
   },
   {
    "kind": "example",
    "en": "bed",
    "ar": "سرير"
   }
  ],
  "kids": {
   "listTitle": "10 Words with Short E",
   "cards": [
    {
     "emoji": "🥚",
     "en": "egg",
     "ar": "بيضة"
    },
    {
     "emoji": "🛏️",
     "en": "bed",
     "ar": "سرير"
    },
    {
     "emoji": "🖊️",
     "en": "pen",
     "ar": "قلم"
    },
    {
     "emoji": "🔴",
     "en": "red",
     "ar": "أحمر"
    },
    {
     "emoji": "🔟",
     "en": "ten",
     "ar": "عشرة"
    },
    {
     "emoji": "🐔",
     "en": "hen",
     "ar": "دجاجة"
    },
    {
     "emoji": "🦵",
     "en": "leg",
     "ar": "رجل"
    },
    {
     "emoji": "🔔",
     "en": "bell",
     "ar": "جرس"
    },
    {
     "emoji": "🕸️",
     "en": "web",
     "ar": "شبكة عنكبوت"
    },
    {
     "emoji": "⛺",
     "en": "tent",
     "ar": "خيمة"
    }
   ],
   "say": "10 Words with Short E. egg. bed. pen. red. ten. hen. leg. bell. web. tent."
  }
 },
 {
  "id": "lama-13",
  "order": 13,
  "levelId": "l1",
  "titleAr": "صوت I القصير",
  "titleEn": "Short I",
  "content": {
   "explanationAr": "حرف I في كلمات قصيرة مثل fish صوته «إ» قصيرة جدًا وخفيفة.",
   "altExplanationAr": "لا تمدّه: نقول fish بسرعة مو «فييش». نفس الشي في six و milk.",
   "example": [
    {
     "en": "fish",
     "ar": "سمكة"
    },
    {
     "en": "six",
     "ar": "ستة"
    },
    {
     "en": "milk",
     "ar": "حليب"
    }
   ],
   "check": {
    "promptAr": "أي كلمة فيها صوت I القصير؟",
    "options": [
     "bed",
     "six",
     "box"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "وش معنى six؟",
     "options": [
      "دبوس",
      "ستة",
      "حبر"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي كلمة معناها «حليب»؟",
     "options": [
      "gift",
      "wind",
      "milk"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي صورة تناسب كلمة ship؟",
     "options": [
      "🚢",
      "🗑️",
      "🐛"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Short I"
   },
   {
    "kind": "highlight",
    "text": "Short i: fish, six, milk"
   },
   {
    "kind": "example",
    "en": "fish",
    "ar": "سمكة"
   },
   {
    "kind": "example",
    "en": "six",
    "ar": "ستة"
   }
  ],
  "kids": {
   "listTitle": "10 Words with Short I",
   "cards": [
    {
     "emoji": "🐟",
     "en": "fish",
     "ar": "سمكة"
    },
    {
     "emoji": "6️⃣",
     "en": "six",
     "ar": "ستة"
    },
    {
     "emoji": "🥛",
     "en": "milk",
     "ar": "حليب"
    },
    {
     "emoji": "🚢",
     "en": "ship",
     "ar": "سفينة"
    },
    {
     "emoji": "📌",
     "en": "pin",
     "ar": "دبوس"
    },
    {
     "emoji": "🎁",
     "en": "gift",
     "ar": "هدية"
    },
    {
     "emoji": "🗑️",
     "en": "bin",
     "ar": "سلة مهملات"
    },
    {
     "emoji": "🖋️",
     "en": "ink",
     "ar": "حبر"
    },
    {
     "emoji": "🌬️",
     "en": "wind",
     "ar": "ريح"
    },
    {
     "emoji": "🐛",
     "en": "insect",
     "ar": "حشرة"
    }
   ],
   "say": "10 Words with Short I. fish. six. milk. ship. pin. gift. bin. ink. wind. insect."
  }
 },
 {
  "id": "lama-14",
  "order": 14,
  "levelId": "l1",
  "titleAr": "صوت O القصير",
  "titleEn": "Short O",
  "content": {
   "explanationAr": "حرف O في كلمات قصيرة مثل dog و box صوته «أو» قصيرة والفم مدوّر.",
   "altExplanationAr": "دوّر فمك وقل box بسرعة. نفس الصوت في pot و hot و sock.",
   "example": [
    {
     "en": "dog",
     "ar": "كلب"
    },
    {
     "en": "pot",
     "ar": "قدر"
    },
    {
     "en": "box",
     "ar": "صندوق"
    }
   ],
   "check": {
    "promptAr": "أي كلمة فيها صوت O القصير؟",
    "options": [
     "clock",
     "cake",
     "tree"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "وش معنى dog؟",
     "options": [
      "ثعلب",
      "قفل",
      "كلب"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي كلمة معناها «قدر»؟",
     "options": [
      "pot",
      "sock",
      "hot"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي صورة تناسب كلمة box؟",
     "options": [
      "🕰️",
      "📦",
      "🐸"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Short O"
   },
   {
    "kind": "highlight",
    "text": "Short o: dog, pot, box"
   },
   {
    "kind": "example",
    "en": "dog",
    "ar": "كلب"
   },
   {
    "kind": "example",
    "en": "pot",
    "ar": "قدر"
   }
  ],
  "kids": {
   "listTitle": "10 Words with Short O",
   "cards": [
    {
     "emoji": "🐶",
     "en": "dog",
     "ar": "كلب"
    },
    {
     "emoji": "🍲",
     "en": "pot",
     "ar": "قدر"
    },
    {
     "emoji": "📦",
     "en": "box",
     "ar": "صندوق"
    },
    {
     "emoji": "🦊",
     "en": "fox",
     "ar": "ثعلب"
    },
    {
     "emoji": "🧦",
     "en": "sock",
     "ar": "جورب"
    },
    {
     "emoji": "🕰️",
     "en": "clock",
     "ar": "ساعة"
    },
    {
     "emoji": "🔒",
     "en": "lock",
     "ar": "قفل"
    },
    {
     "emoji": "🔥",
     "en": "hot",
     "ar": "حار"
    },
    {
     "emoji": "🐸",
     "en": "frog",
     "ar": "ضفدع"
    },
    {
     "emoji": "🪵",
     "en": "log",
     "ar": "جذع شجرة"
    }
   ],
   "say": "10 Words with Short O. dog. pot. box. fox. sock. clock. lock. hot. frog. log."
  }
 },
 {
  "id": "lama-15",
  "order": 15,
  "levelId": "l1",
  "titleAr": "صوت U القصير",
  "titleEn": "Short U",
  "content": {
   "explanationAr": "حرف U في كلمات قصيرة مثل sun و cup صوته «أ» قصيرة، مثل الفتحة.",
   "altExplanationAr": "ننتبه: bus نقولها «بَس» مو «بوس». الصوت قصير مثل الفتحة.",
   "example": [
    {
     "en": "sun",
     "ar": "شمس"
    },
    {
     "en": "bus",
     "ar": "باص"
    },
    {
     "en": "cup",
     "ar": "كوب"
    }
   ],
   "check": {
    "promptAr": "أي كلمة فيها صوت U القصير؟",
    "options": [
     "cake",
     "cup",
     "pen"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "وش معنى up؟",
     "options": [
      "فوق",
      "باص",
      "حشرة صغيرة"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي كلمة معناها «فرشاة»؟",
     "options": [
      "cup",
      "brush",
      "nut"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي صورة تناسب كلمة sun؟",
     "options": [
      "🦆",
      "🚚",
      "☀️"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Short U"
   },
   {
    "kind": "highlight",
    "text": "Short u: sun, bus, cup"
   },
   {
    "kind": "example",
    "en": "sun",
    "ar": "شمس"
   },
   {
    "kind": "example",
    "en": "bus",
    "ar": "باص"
   }
  ],
  "kids": {
   "listTitle": "10 Words with Short U",
   "cards": [
    {
     "emoji": "☀️",
     "en": "sun",
     "ar": "شمس"
    },
    {
     "emoji": "🚌",
     "en": "bus",
     "ar": "باص"
    },
    {
     "emoji": "☕",
     "en": "cup",
     "ar": "كوب"
    },
    {
     "emoji": "🦆",
     "en": "duck",
     "ar": "بطة"
    },
    {
     "emoji": "🐛",
     "en": "bug",
     "ar": "حشرة صغيرة"
    },
    {
     "emoji": "🥜",
     "en": "nut",
     "ar": "مكسرات"
    },
    {
     "emoji": "🚚",
     "en": "truck",
     "ar": "شاحنة"
    },
    {
     "emoji": "☂️",
     "en": "umbrella",
     "ar": "مظلة"
    },
    {
     "emoji": "⬆️",
     "en": "up",
     "ar": "فوق"
    },
    {
     "emoji": "🪥",
     "en": "brush",
     "ar": "فرشاة"
    }
   ],
   "say": "10 Words with Short U. sun. bus. cup. duck. bug. nut. truck. umbrella. up. brush."
  }
 },
 {
  "id": "lama-16",
  "order": 16,
  "levelId": "l1",
  "titleAr": "صوت A الطويل",
  "titleEn": "Long A",
  "content": {
   "explanationAr": "لما يجي حرف A وبعده حرف ثم e في الآخر، مثل cake، يصير A طويل ونقوله «اي». وكذلك ai في rain.",
   "altExplanationAr": "حرف e في آخر cake ما ينقال، بس يخلي A يقول اسمه: «اي».",
   "example": [
    {
     "en": "cake",
     "ar": "كيك"
    },
    {
     "en": "lake",
     "ar": "بحيرة"
    },
    {
     "en": "plate",
     "ar": "صحن"
    }
   ],
   "check": {
    "promptAr": "أي كلمة فيها صوت A الطويل؟",
    "options": [
     "cat",
     "cake",
     "bag"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "وش معنى plate؟",
     "options": [
      "عنب",
      "صحن",
      "مطر"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي كلمة معناها «ثعبان»؟",
     "options": [
      "wave",
      "train",
      "snake"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي صورة تناسب كلمة game؟",
     "options": [
      "🎮",
      "📛",
      "🎂"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Long A"
   },
   {
    "kind": "highlight",
    "text": "Long a: cake, name, rain"
   },
   {
    "kind": "example",
    "en": "cake",
    "ar": "كيك"
   },
   {
    "kind": "example",
    "en": "lake",
    "ar": "بحيرة"
   }
  ],
  "kids": {
   "listTitle": "10 Words with Long A",
   "cards": [
    {
     "emoji": "🎂",
     "en": "cake",
     "ar": "كيك"
    },
    {
     "emoji": "🏞️",
     "en": "lake",
     "ar": "بحيرة"
    },
    {
     "emoji": "🍽️",
     "en": "plate",
     "ar": "صحن"
    },
    {
     "emoji": "🐍",
     "en": "snake",
     "ar": "ثعبان"
    },
    {
     "emoji": "🎮",
     "en": "game",
     "ar": "لعبة"
    },
    {
     "emoji": "🍇",
     "en": "grapes",
     "ar": "عنب"
    },
    {
     "emoji": "🌊",
     "en": "wave",
     "ar": "موجة"
    },
    {
     "emoji": "📛",
     "en": "name",
     "ar": "اسم"
    },
    {
     "emoji": "🌧️",
     "en": "rain",
     "ar": "مطر"
    },
    {
     "emoji": "🚆",
     "en": "train",
     "ar": "قطار"
    }
   ],
   "say": "10 Words with Long A. cake. lake. plate. snake. game. grapes. wave. name. rain. train."
  }
 },
 {
  "id": "lama-17",
  "order": 17,
  "levelId": "l1",
  "titleAr": "صوت I الطويل",
  "titleEn": "Long I",
  "content": {
   "explanationAr": "في كلمات مثل bike و five، حرف I يقول اسمه «آي». و igh في light لها نفس الصوت.",
   "altExplanationAr": "قارن: kit قصيرة، و kite طويلة «كايت» بسبب e في الآخر.",
   "example": [
    {
     "en": "bike",
     "ar": "دراجة"
    },
    {
     "en": "kite",
     "ar": "طائرة ورقية"
    },
    {
     "en": "five",
     "ar": "خمسة"
    }
   ],
   "check": {
    "promptAr": "أي كلمة فيها صوت I الطويل؟",
    "options": [
     "fish",
     "milk",
     "kite"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "وش معنى pie؟",
     "options": [
      "دراجة",
      "تسعة",
      "فطيرة"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي كلمة معناها «ضوء»؟",
     "options": [
      "light",
      "kite",
      "rice"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي صورة تناسب كلمة night؟",
     "options": [
      "5️⃣",
      "🌃",
      "🧊"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Long I"
   },
   {
    "kind": "highlight",
    "text": "Long i: bike, five, light"
   },
   {
    "kind": "example",
    "en": "bike",
    "ar": "دراجة"
   },
   {
    "kind": "example",
    "en": "kite",
    "ar": "طائرة ورقية"
   }
  ],
  "kids": {
   "listTitle": "10 Words with Long I",
   "cards": [
    {
     "emoji": "🚲",
     "en": "bike",
     "ar": "دراجة"
    },
    {
     "emoji": "🪁",
     "en": "kite",
     "ar": "طائرة ورقية"
    },
    {
     "emoji": "5️⃣",
     "en": "five",
     "ar": "خمسة"
    },
    {
     "emoji": "9️⃣",
     "en": "nine",
     "ar": "تسعة"
    },
    {
     "emoji": "🍚",
     "en": "rice",
     "ar": "رز"
    },
    {
     "emoji": "🧊",
     "en": "ice",
     "ar": "ثلج"
    },
    {
     "emoji": "😊",
     "en": "smile",
     "ar": "ابتسامة"
    },
    {
     "emoji": "🥧",
     "en": "pie",
     "ar": "فطيرة"
    },
    {
     "emoji": "💡",
     "en": "light",
     "ar": "ضوء"
    },
    {
     "emoji": "🌃",
     "en": "night",
     "ar": "ليل"
    }
   ],
   "say": "10 Words with Long I. bike. kite. five. nine. rice. ice. smile. pie. light. night."
  }
 },
 {
  "id": "lama-18",
  "order": 18,
  "levelId": "l1",
  "titleAr": "صوت O الطويل",
  "titleEn": "Long O",
  "content": {
   "explanationAr": "في كلمات مثل home و phone، حرف O يقول اسمه «أو» طويلة. و oa في boat و ow في snow لها نفس الصوت.",
   "altExplanationAr": "قارن: hop قصيرة، و hope طويلة بسبب e في الآخر.",
   "example": [
    {
     "en": "home",
     "ar": "بيت"
    },
    {
     "en": "rose",
     "ar": "وردة"
    },
    {
     "en": "nose",
     "ar": "أنف"
    }
   ],
   "check": {
    "promptAr": "أي كلمة فيها صوت O الطويل؟",
    "options": [
     "box",
     "boat",
     "dog"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "وش معنى bone؟",
     "options": [
      "عظمة",
      "ثلج",
      "بيت"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي كلمة معناها «قارب»؟",
     "options": [
      "road",
      "boat",
      "rose"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي صورة تناسب كلمة coat؟",
     "options": [
      "🧼",
      "👃",
      "🧥"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Long O"
   },
   {
    "kind": "highlight",
    "text": "Long o: home, boat, snow"
   },
   {
    "kind": "example",
    "en": "home",
    "ar": "بيت"
   },
   {
    "kind": "example",
    "en": "rose",
    "ar": "وردة"
   }
  ],
  "kids": {
   "listTitle": "10 Words with Long O",
   "cards": [
    {
     "emoji": "🏠",
     "en": "home",
     "ar": "بيت"
    },
    {
     "emoji": "🌹",
     "en": "rose",
     "ar": "وردة"
    },
    {
     "emoji": "👃",
     "en": "nose",
     "ar": "أنف"
    },
    {
     "emoji": "📱",
     "en": "phone",
     "ar": "جوال"
    },
    {
     "emoji": "🦴",
     "en": "bone",
     "ar": "عظمة"
    },
    {
     "emoji": "⛵",
     "en": "boat",
     "ar": "قارب"
    },
    {
     "emoji": "🧥",
     "en": "coat",
     "ar": "معطف"
    },
    {
     "emoji": "❄️",
     "en": "snow",
     "ar": "ثلج"
    },
    {
     "emoji": "🛣️",
     "en": "road",
     "ar": "طريق"
    },
    {
     "emoji": "🧼",
     "en": "soap",
     "ar": "صابون"
    }
   ],
   "say": "10 Words with Long O. home. rose. nose. phone. bone. boat. coat. snow. road. soap."
  }
 },
 {
  "id": "lama-19",
  "order": 19,
  "levelId": "l1",
  "titleAr": "صوت E الطويل",
  "titleEn": "Long E",
  "content": {
   "explanationAr": "لما يجي ee أو ea في الكلمة، نقول «إي» طويلة، مثل tree و tea.",
   "altExplanationAr": "مد الصوت مثل الياء الطويلة: three و green و sea.",
   "example": [
    {
     "en": "tree",
     "ar": "شجرة"
    },
    {
     "en": "bee",
     "ar": "نحلة"
    },
    {
     "en": "sheep",
     "ar": "خروف"
    }
   ],
   "check": {
    "promptAr": "أي كلمة فيها صوت E الطويل؟",
    "options": [
     "bed",
     "green",
     "ten"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "وش معنى tree؟",
     "options": [
      "أقدام",
      "شجرة",
      "شاي"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي كلمة معناها «نحلة»؟",
     "options": [
      "three",
      "sea",
      "bee"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي صورة تناسب كلمة sheep؟",
     "options": [
      "🐑",
      "🟢",
      "🍃"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Long E"
   },
   {
    "kind": "highlight",
    "text": "Long e: tree, sea, green"
   },
   {
    "kind": "example",
    "en": "tree",
    "ar": "شجرة"
   },
   {
    "kind": "example",
    "en": "bee",
    "ar": "نحلة"
   }
  ],
  "kids": {
   "listTitle": "10 Words with Long E",
   "cards": [
    {
     "emoji": "🌳",
     "en": "tree",
     "ar": "شجرة"
    },
    {
     "emoji": "🐝",
     "en": "bee",
     "ar": "نحلة"
    },
    {
     "emoji": "🐑",
     "en": "sheep",
     "ar": "خروف"
    },
    {
     "emoji": "🦶",
     "en": "feet",
     "ar": "أقدام"
    },
    {
     "emoji": "3️⃣",
     "en": "three",
     "ar": "ثلاثة"
    },
    {
     "emoji": "🟢",
     "en": "green",
     "ar": "أخضر"
    },
    {
     "emoji": "🍵",
     "en": "tea",
     "ar": "شاي"
    },
    {
     "emoji": "🌊",
     "en": "sea",
     "ar": "بحر"
    },
    {
     "emoji": "🍃",
     "en": "leaf",
     "ar": "ورقة شجر"
    },
    {
     "emoji": "📖",
     "en": "read",
     "ar": "يقرأ"
    }
   ],
   "say": "10 Words with Long E. tree. bee. sheep. feet. three. green. tea. sea. leaf. read."
  }
 },
 {
  "id": "lama-20",
  "order": 20,
  "levelId": "l1",
  "titleAr": "صوت OO الطويل",
  "titleEn": "The Long OO Sound",
  "content": {
   "explanationAr": "حرفين oo مع بعض في moon و spoon نقولهم «أوو» طويلة مثل الواو.",
   "altExplanationAr": "مد الواو: moon «موون». وأحيانًا نكتب نفس الصوت ue مثل blue، أو ui مثل juice.",
   "example": [
    {
     "en": "moon",
     "ar": "قمر"
    },
    {
     "en": "spoon",
     "ar": "ملعقة"
    },
    {
     "en": "food",
     "ar": "أكل"
    }
   ],
   "check": {
    "promptAr": "أي كلمة فيها صوت OO الطويل؟",
    "options": [
     "cup",
     "bus",
     "spoon"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "وش معنى food؟",
     "options": [
      "جزمة",
      "أزرق",
      "أكل"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي كلمة معناها «مدرسة»؟",
     "options": [
      "school",
      "tooth",
      "juice"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي صورة تناسب كلمة zoo؟",
     "options": [
      "🧹",
      "🦒",
      "🌙"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The Long OO Sound"
   },
   {
    "kind": "highlight",
    "text": "Long oo: moon, food, blue"
   },
   {
    "kind": "example",
    "en": "moon",
    "ar": "قمر"
   },
   {
    "kind": "example",
    "en": "spoon",
    "ar": "ملعقة"
   }
  ],
  "kids": {
   "listTitle": "10 Words with OO",
   "cards": [
    {
     "emoji": "🌙",
     "en": "moon",
     "ar": "قمر"
    },
    {
     "emoji": "🥄",
     "en": "spoon",
     "ar": "ملعقة"
    },
    {
     "emoji": "🍲",
     "en": "food",
     "ar": "أكل"
    },
    {
     "emoji": "🏫",
     "en": "school",
     "ar": "مدرسة"
    },
    {
     "emoji": "🦒",
     "en": "zoo",
     "ar": "حديقة حيوانات"
    },
    {
     "emoji": "👢",
     "en": "boot",
     "ar": "جزمة"
    },
    {
     "emoji": "🦷",
     "en": "tooth",
     "ar": "سن"
    },
    {
     "emoji": "🧹",
     "en": "broom",
     "ar": "مكنسة"
    },
    {
     "emoji": "🔵",
     "en": "blue",
     "ar": "أزرق"
    },
    {
     "emoji": "🧃",
     "en": "juice",
     "ar": "عصير"
    }
   ],
   "say": "10 Words with OO. moon. spoon. food. school. zoo. boot. tooth. broom. blue. juice."
  }
 },
 {
  "id": "lama-21",
  "order": 21,
  "levelId": "l1",
  "titleAr": "حرفين مع L",
  "titleEn": "Blends with L",
  "content": {
   "explanationAr": "أحيانًا يجي حرفين مع بعض في أول الكلمة ونسمع الاثنين: bl و cl و fl و pl و gl و sl، مثل flag و plane.",
   "altExplanationAr": "لا تحط حركة بينهم: نقول flag مو «فِلاج». الحرفين ينقالون مع بعض بسرعة.",
   "example": [
    {
     "en": "block",
     "ar": "مكعب"
    },
    {
     "en": "flag",
     "ar": "علم"
    },
    {
     "en": "flower",
     "ar": "وردة"
    }
   ],
   "check": {
    "promptAr": "أي كلمة تبدأ بحرفين fl؟",
    "options": [
     "plane",
     "cloud",
     "flag"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "وش معنى flag؟",
     "options": [
      "علم",
      "قفاز",
      "تصفيق"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي كلمة معناها «وردة»؟",
     "options": [
      "cloud",
      "flower",
      "black"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي صورة تناسب كلمة plane؟",
     "options": [
      "😴",
      "🪐",
      "✈️"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Blends with L"
   },
   {
    "kind": "highlight",
    "text": "bl, cl, fl, gl, pl, sl"
   },
   {
    "kind": "example",
    "en": "block",
    "ar": "مكعب"
   },
   {
    "kind": "example",
    "en": "flag",
    "ar": "علم"
   }
  ],
  "kids": {
   "listTitle": "10 Words with L Blends",
   "cards": [
    {
     "emoji": "🧱",
     "en": "block",
     "ar": "مكعب"
    },
    {
     "emoji": "🚩",
     "en": "flag",
     "ar": "علم"
    },
    {
     "emoji": "🌸",
     "en": "flower",
     "ar": "وردة"
    },
    {
     "emoji": "✈️",
     "en": "plane",
     "ar": "طيارة"
    },
    {
     "emoji": "🧤",
     "en": "glove",
     "ar": "قفاز"
    },
    {
     "emoji": "☁️",
     "en": "cloud",
     "ar": "غيمة"
    },
    {
     "emoji": "😴",
     "en": "sleep",
     "ar": "نوم"
    },
    {
     "emoji": "👏",
     "en": "clap",
     "ar": "تصفيق"
    },
    {
     "emoji": "⬛",
     "en": "black",
     "ar": "أسود"
    },
    {
     "emoji": "🪐",
     "en": "planet",
     "ar": "كوكب"
    }
   ],
   "say": "10 Words with L Blends. block. flag. flower. plane. glove. cloud. sleep. clap. black. planet."
  }
 },
 {
  "id": "lama-22",
  "order": 22,
  "levelId": "l1",
  "titleAr": "حرفين مع R",
  "titleEn": "Blends with R",
  "content": {
   "explanationAr": "نفس الفكرة مع R: br و cr و dr و fr و gr و pr و tr. مثل bread و dress، وننطق الحرفين مع بعض.",
   "altExplanationAr": "قل bread بدون حركة بين B و R. جرّب: br، bread.",
   "example": [
    {
     "en": "bread",
     "ar": "خبز"
    },
    {
     "en": "crab",
     "ar": "سلطعون"
    },
    {
     "en": "dress",
     "ar": "فستان"
    }
   ],
   "check": {
    "promptAr": "أي كلمة تبدأ بحرفين dr؟",
    "options": [
     "dress",
     "bread",
     "crab"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "وش معنى dress؟",
     "options": [
      "تاج",
      "فستان",
      "جائزة"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي كلمة معناها «يشرب»؟",
     "options": [
      "fruit",
      "frog",
      "drink"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي صورة تناسب كلمة brick؟",
     "options": [
      "🧱",
      "🌱",
      "🍞"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Blends with R"
   },
   {
    "kind": "highlight",
    "text": "br, cr, dr, fr, gr, pr, tr"
   },
   {
    "kind": "example",
    "en": "bread",
    "ar": "خبز"
   },
   {
    "kind": "example",
    "en": "crab",
    "ar": "سلطعون"
   }
  ],
  "kids": {
   "listTitle": "10 Words with R Blends",
   "cards": [
    {
     "emoji": "🍞",
     "en": "bread",
     "ar": "خبز"
    },
    {
     "emoji": "🦀",
     "en": "crab",
     "ar": "سلطعون"
    },
    {
     "emoji": "👗",
     "en": "dress",
     "ar": "فستان"
    },
    {
     "emoji": "🥤",
     "en": "drink",
     "ar": "يشرب"
    },
    {
     "emoji": "🧱",
     "en": "brick",
     "ar": "طوبة"
    },
    {
     "emoji": "👑",
     "en": "crown",
     "ar": "تاج"
    },
    {
     "emoji": "🍎",
     "en": "fruit",
     "ar": "فاكهة"
    },
    {
     "emoji": "🌱",
     "en": "grass",
     "ar": "عشب"
    },
    {
     "emoji": "🏆",
     "en": "prize",
     "ar": "جائزة"
    },
    {
     "emoji": "🐸",
     "en": "frog",
     "ar": "ضفدع"
    }
   ],
   "say": "10 Words with R Blends. bread. crab. dress. drink. brick. crown. fruit. grass. prize. frog."
  }
 },
 {
  "id": "lama-23",
  "order": 23,
  "levelId": "l1",
  "titleAr": "حرفين مع S",
  "titleEn": "Blends with S",
  "content": {
   "explanationAr": "كلمات تبدأ بـ st و sn و sp و sm و sk و sw. العربي أحيانًا يضيف همزة قبلها ويقول «إستوب»، والصح stop مباشرة.",
   "altExplanationAr": "ابدأ بصوت «س» على طول بدون همزة: s، stop. s، star.",
   "example": [
    {
     "en": "star",
     "ar": "نجمة"
    },
    {
     "en": "stop",
     "ar": "توقف"
    },
    {
     "en": "snail",
     "ar": "حلزون"
    }
   ],
   "check": {
    "promptAr": "كيف ننطق كلمة stop صح؟",
    "options": [
     "estop, with a sound before s",
     "stop, starting with s",
     "sitop, with a vowel after s"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "وش معنى snail؟",
     "options": [
      "سماء",
      "ابتسامة",
      "حلزون"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي كلمة معناها «عنكبوت»؟",
     "options": [
      "spider",
      "stone",
      "snow"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي صورة تناسب كلمة sweet؟",
     "options": [
      "🥄",
      "🍬",
      "⭐"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Blends with S"
   },
   {
    "kind": "highlight",
    "text": "Start with s: stop, star, snow"
   },
   {
    "kind": "example",
    "en": "star",
    "ar": "نجمة"
   },
   {
    "kind": "example",
    "en": "stop",
    "ar": "توقف"
   }
  ],
  "kids": {
   "listTitle": "10 Words with S Blends",
   "cards": [
    {
     "emoji": "⭐",
     "en": "star",
     "ar": "نجمة"
    },
    {
     "emoji": "🛑",
     "en": "stop",
     "ar": "توقف"
    },
    {
     "emoji": "🐌",
     "en": "snail",
     "ar": "حلزون"
    },
    {
     "emoji": "🕷️",
     "en": "spider",
     "ar": "عنكبوت"
    },
    {
     "emoji": "🍬",
     "en": "sweet",
     "ar": "حلاوة"
    },
    {
     "emoji": "🌌",
     "en": "sky",
     "ar": "سماء"
    },
    {
     "emoji": "🪨",
     "en": "stone",
     "ar": "حجر"
    },
    {
     "emoji": "🥄",
     "en": "spoon",
     "ar": "ملعقة"
    },
    {
     "emoji": "😊",
     "en": "smile",
     "ar": "ابتسامة"
    },
    {
     "emoji": "❄️",
     "en": "snow",
     "ar": "ثلج"
    }
   ],
   "say": "10 Words with S Blends. star. stop. snail. spider. sweet. sky. stone. spoon. smile. snow."
  }
 },
 {
  "id": "lama-24",
  "order": 24,
  "levelId": "l1",
  "titleAr": "نهايات NG و NK",
  "titleEn": "Endings NG and NK",
  "content": {
   "explanationAr": "في آخر الكلمة، ng صوت من الأنف مثل ring بدون صوت G واضح. و nk نسمع فيها «نك» مثل pink.",
   "altExplanationAr": "قل ring وخلّ الصوت يطلع من أنفك في الآخر. و think نهايتها «نك».",
   "example": [
    {
     "en": "ring",
     "ar": "خاتم"
    },
    {
     "en": "long",
     "ar": "طويل"
    },
    {
     "en": "strong",
     "ar": "قوي"
    }
   ],
   "check": {
    "promptAr": "أي كلمة نهايتها nk؟",
    "options": [
     "ring",
     "bank",
     "long"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "وش معنى trunk؟",
     "options": [
      "خرطوم الفيل",
      "طويل",
      "بنك"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي كلمة معناها «غمزة»؟",
     "options": [
      "strong",
      "wink",
      "sink"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي صورة تناسب كلمة ring؟",
     "options": [
      "🌷",
      "🤔",
      "💍"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Endings NG and NK"
   },
   {
    "kind": "highlight",
    "text": "ng: ring, long. nk: bank, pink"
   },
   {
    "kind": "example",
    "en": "ring",
    "ar": "خاتم"
   },
   {
    "kind": "example",
    "en": "long",
    "ar": "طويل"
   }
  ],
  "kids": {
   "listTitle": "10 Words with NG and NK",
   "cards": [
    {
     "emoji": "💍",
     "en": "ring",
     "ar": "خاتم"
    },
    {
     "emoji": "📏",
     "en": "long",
     "ar": "طويل"
    },
    {
     "emoji": "💪",
     "en": "strong",
     "ar": "قوي"
    },
    {
     "emoji": "🌷",
     "en": "spring",
     "ar": "الربيع"
    },
    {
     "emoji": "🏦",
     "en": "bank",
     "ar": "بنك"
    },
    {
     "emoji": "🚰",
     "en": "sink",
     "ar": "مغسلة"
    },
    {
     "emoji": "🤔",
     "en": "think",
     "ar": "يفكر"
    },
    {
     "emoji": "🎀",
     "en": "pink",
     "ar": "وردي"
    },
    {
     "emoji": "🐘",
     "en": "trunk",
     "ar": "خرطوم الفيل"
    },
    {
     "emoji": "😉",
     "en": "wink",
     "ar": "غمزة"
    }
   ],
   "say": "10 Words with NG and NK. ring. long. strong. spring. bank. sink. think. pink. trunk. wink."
  }
 },
 {
  "id": "lama-25",
  "order": 25,
  "levelId": "l1",
  "titleAr": "صوت OW و OU",
  "titleEn": "OW and OU",
  "content": {
   "explanationAr": "ow في cow و ou في house لهم نفس الصوت «آو»، مثل لما تتألم وتقول آو.",
   "altExplanationAr": "افتح فمك ثم دوّره: «آو». نسمعه في brown و mouse و cloud.",
   "example": [
    {
     "en": "cow",
     "ar": "بقرة"
    },
    {
     "en": "owl",
     "ar": "بومة"
    },
    {
     "en": "town",
     "ar": "مدينة صغيرة"
    }
   ],
   "check": {
    "promptAr": "أي كلمة فيها صوت «آو»؟",
    "options": [
     "mouse",
     "moon",
     "snow"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "وش معنى brown؟",
     "options": [
      "فأر",
      "بني",
      "برا"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي كلمة معناها «تحت»؟",
     "options": [
      "cloud",
      "cow",
      "down"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي صورة تناسب كلمة house؟",
     "options": [
      "🏠",
      "⚪",
      "🦉"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "OW and OU"
   },
   {
    "kind": "highlight",
    "text": "ow and ou: cow, house"
   },
   {
    "kind": "example",
    "en": "cow",
    "ar": "بقرة"
   },
   {
    "kind": "example",
    "en": "owl",
    "ar": "بومة"
   }
  ],
  "kids": {
   "listTitle": "10 Words with OW and OU",
   "cards": [
    {
     "emoji": "🐄",
     "en": "cow",
     "ar": "بقرة"
    },
    {
     "emoji": "🦉",
     "en": "owl",
     "ar": "بومة"
    },
    {
     "emoji": "🏘️",
     "en": "town",
     "ar": "مدينة صغيرة"
    },
    {
     "emoji": "🟤",
     "en": "brown",
     "ar": "بني"
    },
    {
     "emoji": "⬇️",
     "en": "down",
     "ar": "تحت"
    },
    {
     "emoji": "🏠",
     "en": "house",
     "ar": "بيت"
    },
    {
     "emoji": "🐭",
     "en": "mouse",
     "ar": "فأر"
    },
    {
     "emoji": "☁️",
     "en": "cloud",
     "ar": "غيمة"
    },
    {
     "emoji": "⚪",
     "en": "round",
     "ar": "دائري"
    },
    {
     "emoji": "🚪",
     "en": "out",
     "ar": "برا"
    }
   ],
   "say": "10 Words with OW and OU. cow. owl. town. brown. down. house. mouse. cloud. round. out."
  }
 },
 {
  "id": "lama-26",
  "order": 26,
  "levelId": "l1",
  "titleAr": "صوت AR و OR",
  "titleEn": "AR and OR",
  "content": {
   "explanationAr": "ar في car صوتها «آر» طويلة، و or في fork صوتها «أور». R هنا خفيفة جدًا.",
   "altExplanationAr": "قل car مثل «كار» ممدودة، و horse مثل «هورس».",
   "example": [
    {
     "en": "car",
     "ar": "سيارة"
    },
    {
     "en": "park",
     "ar": "حديقة"
    },
    {
     "en": "arm",
     "ar": "ذراع"
    }
   ],
   "check": {
    "promptAr": "أي كلمة فيها صوت or؟",
    "options": [
     "car",
     "park",
     "corn"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "وش معنى farm؟",
     "options": [
      "شوكة",
      "رياضة",
      "مزرعة"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي كلمة معناها «قرش»؟",
     "options": [
      "shark",
      "corn",
      "car"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي صورة تناسب كلمة horse؟",
     "options": [
      "🚪",
      "🐎",
      "🏞️"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "AR and OR"
   },
   {
    "kind": "highlight",
    "text": "ar: car, farm. or: fork, horse"
   },
   {
    "kind": "example",
    "en": "car",
    "ar": "سيارة"
   },
   {
    "kind": "example",
    "en": "park",
    "ar": "حديقة"
   }
  ],
  "kids": {
   "listTitle": "10 Words with AR and OR",
   "cards": [
    {
     "emoji": "🚗",
     "en": "car",
     "ar": "سيارة"
    },
    {
     "emoji": "🏞️",
     "en": "park",
     "ar": "حديقة"
    },
    {
     "emoji": "💪",
     "en": "arm",
     "ar": "ذراع"
    },
    {
     "emoji": "🚜",
     "en": "farm",
     "ar": "مزرعة"
    },
    {
     "emoji": "🦈",
     "en": "shark",
     "ar": "قرش"
    },
    {
     "emoji": "🐎",
     "en": "horse",
     "ar": "حصان"
    },
    {
     "emoji": "🍴",
     "en": "fork",
     "ar": "شوكة"
    },
    {
     "emoji": "🌽",
     "en": "corn",
     "ar": "ذرة"
    },
    {
     "emoji": "🚪",
     "en": "door",
     "ar": "باب"
    },
    {
     "emoji": "🏅",
     "en": "sport",
     "ar": "رياضة"
    }
   ],
   "say": "10 Words with AR and OR. car. park. arm. farm. shark. horse. fork. corn. door. sport."
  }
 },
 {
  "id": "lama-27",
  "order": 27,
  "levelId": "l1",
  "titleAr": "صوت ER و IR و UR",
  "titleEn": "ER, IR and UR",
  "content": {
   "explanationAr": "er و ir و ur لهم نفس الصوت تقريبًا، صوت قصير في وسط الفم مثل bird و turtle و letter.",
   "altExplanationAr": "ثلاث كتابات وصوت واحد. لا تقول «بِيرد» قل bird بصوت واحد في الوسط.",
   "example": [
    {
     "en": "bird",
     "ar": "طائر"
    },
    {
     "en": "turtle",
     "ar": "سلحفاة"
    },
    {
     "en": "purple",
     "ar": "بنفسجي"
    }
   ],
   "check": {
    "promptAr": "أي كلمة فيها نفس صوت ir في bird؟",
    "options": [
     "tree",
     "turtle",
     "cake"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "وش معنى summer؟",
     "options": [
      "الصيف",
      "رقم",
      "بنفسجي"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي كلمة معناها «دائرة»؟",
     "options": [
      "bird",
      "circle",
      "burger"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي صورة تناسب كلمة tiger؟",
     "options": [
      "🐢",
      "✉️",
      "🐯"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "ER, IR and UR"
   },
   {
    "kind": "highlight",
    "text": "er, ir, ur: one sound"
   },
   {
    "kind": "example",
    "en": "bird",
    "ar": "طائر"
   },
   {
    "kind": "example",
    "en": "turtle",
    "ar": "سلحفاة"
   }
  ],
  "kids": {
   "listTitle": "10 Words with ER, IR and UR",
   "cards": [
    {
     "emoji": "🐦",
     "en": "bird",
     "ar": "طائر"
    },
    {
     "emoji": "🐢",
     "en": "turtle",
     "ar": "سلحفاة"
    },
    {
     "emoji": "🟣",
     "en": "purple",
     "ar": "بنفسجي"
    },
    {
     "emoji": "🍔",
     "en": "burger",
     "ar": "برقر"
    },
    {
     "emoji": "✉️",
     "en": "letter",
     "ar": "رسالة"
    },
    {
     "emoji": "❄️",
     "en": "winter",
     "ar": "الشتاء"
    },
    {
     "emoji": "☀️",
     "en": "summer",
     "ar": "الصيف"
    },
    {
     "emoji": "⭕",
     "en": "circle",
     "ar": "دائرة"
    },
    {
     "emoji": "🐯",
     "en": "tiger",
     "ar": "نمر"
    },
    {
     "emoji": "🔢",
     "en": "number",
     "ar": "رقم"
    }
   ],
   "say": "10 Words with ER, IR and UR. bird. turtle. purple. burger. letter. winter. summer. circle. tiger. number."
  }
 },
 {
  "id": "lama-28",
  "order": 28,
  "levelId": "l1",
  "titleAr": "كلمات على نفس القافية",
  "titleEn": "Rhyming Words",
  "content": {
   "explanationAr": "الكلمات اللي على نفس القافية آخرها نفس الصوت، مثل cat و hat. لو عرفت وحدة تقدر تقرا الثانية.",
   "altExplanationAr": "غيّر الحرف الأول بس: cat، hat. pen، ten. والباقي ما يتغير.",
   "example": [
    {
     "en": "cat and hat",
     "ar": "قطة وقبعة"
    },
    {
     "en": "pen and ten",
     "ar": "قلم وعشرة"
    },
    {
     "en": "dog and frog",
     "ar": "كلب وضفدع"
    }
   ],
   "check": {
    "promptAr": "أي كلمة على نفس قافية cake؟",
    "options": [
     "lake",
     "cat",
     "kite"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "وش معنى cake and snake؟",
     "options": [
      "سيارة ونجمة",
      "كيك وثعبان",
      "قطة وقبعة"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي عبارة معناها «نحلة وشجرة»؟",
     "options": [
      "boat and coat",
      "pen and ten",
      "bee and tree"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي صورة تناسب عبارة moon and spoon؟",
     "options": [
      "🌙",
      "💡",
      "🐶"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Rhyming Words"
   },
   {
    "kind": "highlight",
    "text": "Rhymes end with the same sound"
   },
   {
    "kind": "example",
    "en": "cat and hat",
    "ar": "قطة وقبعة"
   },
   {
    "kind": "example",
    "en": "pen and ten",
    "ar": "قلم وعشرة"
   }
  ],
  "kids": {
   "listTitle": "10 Rhyming Pairs",
   "cards": [
    {
     "emoji": "🐱",
     "en": "cat and hat",
     "ar": "قطة وقبعة"
    },
    {
     "emoji": "🖊️",
     "en": "pen and ten",
     "ar": "قلم وعشرة"
    },
    {
     "emoji": "🐶",
     "en": "dog and frog",
     "ar": "كلب وضفدع"
    },
    {
     "emoji": "🐛",
     "en": "bug and rug",
     "ar": "حشرة وسجادة"
    },
    {
     "emoji": "🎂",
     "en": "cake and snake",
     "ar": "كيك وثعبان"
    },
    {
     "emoji": "🐝",
     "en": "bee and tree",
     "ar": "نحلة وشجرة"
    },
    {
     "emoji": "🌙",
     "en": "moon and spoon",
     "ar": "قمر وملعقة"
    },
    {
     "emoji": "🚗",
     "en": "car and star",
     "ar": "سيارة ونجمة"
    },
    {
     "emoji": "⛵",
     "en": "boat and coat",
     "ar": "قارب ومعطف"
    },
    {
     "emoji": "💡",
     "en": "light and night",
     "ar": "ضوء وليل"
    }
   ],
   "say": "10 Rhyming Pairs. cat and hat. pen and ten. dog and frog. bug and rug. cake and snake. bee and tree. moon and spoon. car and star. boat and coat. light and night."
  }
 },
 {
  "id": "lama-29",
  "order": 29,
  "levelId": "l1",
  "titleAr": "الحروف الكبيرة",
  "titleEn": "Capital Letters",
  "content": {
   "explanationAr": "نكتب أول حرف كبير في أول الجملة، وفي أسماء الناس والمدن والدول والأيام والشهور، وحرف I لما يعني «أنا».",
   "altExplanationAr": "العربي ما فيه حروف كبيرة، لكن في الإنجليزي Riyadh تبدأ بحرف كبير دايمًا، و I دايمًا كبير.",
   "example": [
    {
     "en": "Saudi Arabia",
     "ar": "السعودية"
    },
    {
     "en": "Riyadh",
     "ar": "الرياض"
    },
    {
     "en": "Kuwait",
     "ar": "الكويت"
    }
   ],
   "check": {
    "promptAr": "أي كتابة صحيحة؟",
    "options": [
     "riyadh",
     "rIYADH",
     "Riyadh"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "وش معنى My name is Lama؟",
     "options": [
      "العربية",
      "الكويت",
      "اسمي لمى"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي عبارة معناها «الشمس حارة»؟",
     "options": [
      "The sun is hot",
      "Saudi Arabia",
      "Monday"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي صورة تناسب كلمة English؟",
     "options": [
      "🏙️",
      "🇬🇧",
      "❄️"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Capital Letters"
   },
   {
    "kind": "highlight",
    "text": "Capital letters: names, places, days, I"
   },
   {
    "kind": "example",
    "en": "Saudi Arabia",
    "ar": "السعودية"
   },
   {
    "kind": "example",
    "en": "Riyadh",
    "ar": "الرياض"
   }
  ],
  "kids": {
   "listTitle": "When We Use Capital Letters",
   "cards": [
    {
     "emoji": "🇸🇦",
     "en": "Saudi Arabia",
     "ar": "السعودية"
    },
    {
     "emoji": "🏙️",
     "en": "Riyadh",
     "ar": "الرياض"
    },
    {
     "emoji": "🇰🇼",
     "en": "Kuwait",
     "ar": "الكويت"
    },
    {
     "emoji": "📅",
     "en": "Monday",
     "ar": "الاثنين"
    },
    {
     "emoji": "❄️",
     "en": "January",
     "ar": "يناير"
    },
    {
     "emoji": "☕",
     "en": "I like tea",
     "ar": "أحب الشاي"
    },
    {
     "emoji": "🧕",
     "en": "My name is Lama",
     "ar": "اسمي لمى"
    },
    {
     "emoji": "☀️",
     "en": "The sun is hot",
     "ar": "الشمس حارة"
    },
    {
     "emoji": "🇬🇧",
     "en": "English",
     "ar": "الإنجليزية"
    },
    {
     "emoji": "📖",
     "en": "Arabic",
     "ar": "العربية"
    }
   ],
   "say": "When We Use Capital Letters. Saudi Arabia. Riyadh. Kuwait. Monday. January. I like tea. My name is Lama. The sun is hot. English. Arabic."
  }
 },
 {
  "id": "lama-30",
  "order": 30,
  "levelId": "l1",
  "titleAr": "مراجعة الحروف والأصوات",
  "titleEn": "Letters and Sounds Review",
  "content": {
   "explanationAr": "نراجع كل الأصوات اللي تعلمناها: الحروف، و sh و ch و th، والحروف القصيرة والطويلة، و ar و ir و oo.",
   "altExplanationAr": "اقرأ كل كلمة ببطء وحاول تعرف وش الصوت المهم فيها قبل ما تسمعها من لمى.",
   "example": [
    {
     "en": "apple",
     "ar": "تفاحة"
    },
    {
     "en": "ship",
     "ar": "سفينة"
    },
    {
     "en": "chair",
     "ar": "كرسي"
    }
   ],
   "check": {
    "promptAr": "أي كلمة فيها صوت CH؟",
    "options": [
     "ship",
     "three",
     "chair"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "وش معنى star؟",
     "options": [
      "نجمة",
      "قمر",
      "كرسي"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي كلمة معناها «سيارة»؟",
     "options": [
      "apple",
      "car",
      "three"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي صورة تناسب كلمة bird؟",
     "options": [
      "🚢",
      "🐶",
      "🐦"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Letters and Sounds Review"
   },
   {
    "kind": "highlight",
    "text": "Review: sh, ch, th, short and long vowels"
   },
   {
    "kind": "example",
    "en": "apple",
    "ar": "تفاحة"
   },
   {
    "kind": "example",
    "en": "ship",
    "ar": "سفينة"
   }
  ],
  "kids": {
   "listTitle": "Review: 10 Sounds",
   "cards": [
    {
     "emoji": "🍎",
     "en": "apple",
     "ar": "تفاحة"
    },
    {
     "emoji": "🚢",
     "en": "ship",
     "ar": "سفينة"
    },
    {
     "emoji": "🪑",
     "en": "chair",
     "ar": "كرسي"
    },
    {
     "emoji": "3️⃣",
     "en": "three",
     "ar": "ثلاثة"
    },
    {
     "emoji": "🐶",
     "en": "dog",
     "ar": "كلب"
    },
    {
     "emoji": "🎂",
     "en": "cake",
     "ar": "كيك"
    },
    {
     "emoji": "⭐",
     "en": "star",
     "ar": "نجمة"
    },
    {
     "emoji": "🚗",
     "en": "car",
     "ar": "سيارة"
    },
    {
     "emoji": "🐦",
     "en": "bird",
     "ar": "طائر"
    },
    {
     "emoji": "🌙",
     "en": "moon",
     "ar": "قمر"
    }
   ],
   "say": "Review: 10 Sounds. apple. ship. chair. three. dog. cake. star. car. bird. moon."
  }
 },
 {
  "id": "lama-31",
  "order": 31,
  "levelId": "l2",
  "titleAr": "عائلة at و an",
  "titleEn": "The -at and -an Families",
  "content": {
   "explanationAr": "كلمات كثيرة تنتهي بنفس الصوت: rat و mat آخرها at، و fan و man آخرها an. لو قريت وحدة تقدر تقرأ الباقي.",
   "altExplanationAr": "غيّر الحرف الأول بس واقرأ: r-at، m-at، f-an، m-an.",
   "example": [
    {
     "en": "rat",
     "ar": "فأر"
    },
    {
     "en": "mat",
     "ar": "حصيرة"
    },
    {
     "en": "sat",
     "ar": "جلس"
    }
   ],
   "check": {
    "promptAr": "وش معنى rat؟",
    "options": [
     "دردشة",
     "فأر",
     "علبة"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "وش معنى chat؟",
     "options": [
      "علبة",
      "دردشة",
      "فأر"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي كلمة معناها «مروحة»؟",
     "options": [
      "plan",
      "mat",
      "fan"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي صورة تناسب كلمة man؟",
     "options": [
      "👨",
      "🏃",
      "🪑"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The -at and -an Families"
   },
   {
    "kind": "highlight",
    "text": "Words with -at and -an"
   },
   {
    "kind": "example",
    "en": "rat",
    "ar": "فأر"
   },
   {
    "kind": "example",
    "en": "mat",
    "ar": "حصيرة"
   }
  ],
  "kids": {
   "listTitle": "Words with -at and -an",
   "cards": [
    {
     "emoji": "🐀",
     "en": "rat",
     "ar": "فأر"
    },
    {
     "emoji": "🧘",
     "en": "mat",
     "ar": "حصيرة"
    },
    {
     "emoji": "🪑",
     "en": "sat",
     "ar": "جلس"
    },
    {
     "emoji": "🫓",
     "en": "flat",
     "ar": "مسطّح"
    },
    {
     "emoji": "💬",
     "en": "chat",
     "ar": "دردشة"
    },
    {
     "emoji": "🪭",
     "en": "fan",
     "ar": "مروحة"
    },
    {
     "emoji": "👨",
     "en": "man",
     "ar": "رجل"
    },
    {
     "emoji": "🥫",
     "en": "can",
     "ar": "علبة"
    },
    {
     "emoji": "🗺️",
     "en": "plan",
     "ar": "خطة"
    },
    {
     "emoji": "🏃",
     "en": "ran",
     "ar": "ركض"
    }
   ],
   "say": "Words with -at and -an. rat. mat. sat. flat. chat. fan. man. can. plan. ran."
  }
 },
 {
  "id": "lama-32",
  "order": 32,
  "levelId": "l2",
  "titleAr": "عائلة ig و in و it",
  "titleEn": "-ig, -in and -it",
  "content": {
   "explanationAr": "نقرأ كلمات قصيرة فيها صوت i القصير: dig و win و kit. الصوت قصير مثل الكسرة.",
   "altExplanationAr": "قل الصوت الأول ثم in أو it أو ig: w-in، k-it، d-ig.",
   "example": [
    {
     "en": "dig",
     "ar": "يحفر"
    },
    {
     "en": "wig",
     "ar": "باروكة"
    },
    {
     "en": "twig",
     "ar": "غصن صغير"
    }
   ],
   "check": {
    "promptAr": "وش معنى dig؟",
    "options": [
     "يحفر",
     "يفوز",
     "يلف"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "وش معنى kit؟",
     "options": [
      "باروكة",
      "يفوز",
      "عدة"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي كلمة معناها «يضرب»؟",
     "options": [
      "hit",
      "twig",
      "chin"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي صورة تناسب كلمة wig؟",
     "options": [
      "🏆",
      "💇",
      "🌀"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "-ig, -in and -it"
   },
   {
    "kind": "highlight",
    "text": "Words with -ig, -in and -it"
   },
   {
    "kind": "example",
    "en": "dig",
    "ar": "يحفر"
   },
   {
    "kind": "example",
    "en": "wig",
    "ar": "باروكة"
   }
  ],
  "kids": {
   "listTitle": "Words with -ig, -in and -it",
   "cards": [
    {
     "emoji": "⛏️",
     "en": "dig",
     "ar": "يحفر"
    },
    {
     "emoji": "💇",
     "en": "wig",
     "ar": "باروكة"
    },
    {
     "emoji": "🌿",
     "en": "twig",
     "ar": "غصن صغير"
    },
    {
     "emoji": "🐘",
     "en": "big",
     "ar": "كبير"
    },
    {
     "emoji": "🏆",
     "en": "win",
     "ar": "يفوز"
    },
    {
     "emoji": "🧔",
     "en": "chin",
     "ar": "ذقن"
    },
    {
     "emoji": "👯",
     "en": "twin",
     "ar": "توأم"
    },
    {
     "emoji": "🌀",
     "en": "spin",
     "ar": "يلف"
    },
    {
     "emoji": "🧰",
     "en": "kit",
     "ar": "عدة"
    },
    {
     "emoji": "🥊",
     "en": "hit",
     "ar": "يضرب"
    }
   ],
   "say": "Words with -ig, -in and -it. dig. wig. twig. big. win. chin. twin. spin. kit. hit."
  }
 },
 {
  "id": "lama-33",
  "order": 33,
  "levelId": "l2",
  "titleAr": "عائلة op و ot و og",
  "titleEn": "-op, -ot and -og",
  "content": {
   "explanationAr": "صوت o القصير مثل dog و box. اليوم نقرأ كلمات زي top و dot و fog.",
   "altExplanationAr": "افتح فمك مدوّر وقل o قصيرة: t-o-p، d-o-t.",
   "example": [
    {
     "en": "top",
     "ar": "قمة"
    },
    {
     "en": "mop",
     "ar": "ممسحة"
    },
    {
     "en": "hop",
     "ar": "يقفز قفزة صغيرة"
    }
   ],
   "check": {
    "promptAr": "وش معنى top؟",
    "options": [
     "بقعة",
     "ضباب",
     "قمة"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "وش معنى mop؟",
     "options": [
      "ممسحة",
      "بقعة",
      "ضباب"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي كلمة معناها «يقفز قفزة صغيرة»؟",
     "options": [
      "cot",
      "hop",
      "pop"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي صورة تناسب كلمة dot؟",
     "options": [
      "🏃",
      "💧",
      "⚫"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "-op, -ot and -og"
   },
   {
    "kind": "highlight",
    "text": "Words with -op, -ot and -og"
   },
   {
    "kind": "example",
    "en": "top",
    "ar": "قمة"
   },
   {
    "kind": "example",
    "en": "mop",
    "ar": "ممسحة"
   }
  ],
  "kids": {
   "listTitle": "Words with -op, -ot and -og",
   "cards": [
    {
     "emoji": "🔝",
     "en": "top",
     "ar": "قمة"
    },
    {
     "emoji": "🧽",
     "en": "mop",
     "ar": "ممسحة"
    },
    {
     "emoji": "🐇",
     "en": "hop",
     "ar": "يقفز قفزة صغيرة"
    },
    {
     "emoji": "⚫",
     "en": "dot",
     "ar": "نقطة"
    },
    {
     "emoji": "🔵",
     "en": "spot",
     "ar": "بقعة"
    },
    {
     "emoji": "🛏️",
     "en": "cot",
     "ar": "سرير طفل"
    },
    {
     "emoji": "🏃",
     "en": "jog",
     "ar": "يهرول"
    },
    {
     "emoji": "🌫️",
     "en": "fog",
     "ar": "ضباب"
    },
    {
     "emoji": "🎈",
     "en": "pop",
     "ar": "يفرقع"
    },
    {
     "emoji": "💧",
     "en": "drop",
     "ar": "قطرة"
    }
   ],
   "say": "Words with -op, -ot and -og. top. mop. hop. dot. spot. cot. jog. fog. pop. drop."
  }
 },
 {
  "id": "lama-34",
  "order": 34,
  "levelId": "l2",
  "titleAr": "عائلة ug و un و ut",
  "titleEn": "-ug, -un and -ut",
  "content": {
   "explanationAr": "صوت u القصير مثل sun و cup. نقرأ اليوم hug و run و cut.",
   "altExplanationAr": "صوت u القصير يشبه الفتحة الخفيفة: h-u-g، r-u-n.",
   "example": [
    {
     "en": "hug",
     "ar": "حضن"
    },
    {
     "en": "mug",
     "ar": "كوب كبير"
    },
    {
     "en": "jug",
     "ar": "إبريق"
    }
   ],
   "check": {
    "promptAr": "وش معنى hug؟",
    "options": [
     "يركض",
     "يقص",
     "حضن"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "وش معنى mug؟",
     "options": [
      "يركض",
      "كوب كبير",
      "يقص"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي كلمة معناها «إبريق»؟",
     "options": [
      "fun",
      "hut",
      "jug"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي صورة تناسب كلمة plug؟",
     "options": [
      "🔌",
      "🍞",
      "🚪"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "-ug, -un and -ut"
   },
   {
    "kind": "highlight",
    "text": "Words with -ug, -un and -ut"
   },
   {
    "kind": "example",
    "en": "hug",
    "ar": "حضن"
   },
   {
    "kind": "example",
    "en": "mug",
    "ar": "كوب كبير"
   }
  ],
  "kids": {
   "listTitle": "Words with -ug, -un and -ut",
   "cards": [
    {
     "emoji": "🤗",
     "en": "hug",
     "ar": "حضن"
    },
    {
     "emoji": "☕",
     "en": "mug",
     "ar": "كوب كبير"
    },
    {
     "emoji": "🫗",
     "en": "jug",
     "ar": "إبريق"
    },
    {
     "emoji": "🔌",
     "en": "plug",
     "ar": "قابس"
    },
    {
     "emoji": "🏃‍♀️",
     "en": "run",
     "ar": "يركض"
    },
    {
     "emoji": "🎉",
     "en": "fun",
     "ar": "متعة"
    },
    {
     "emoji": "🍞",
     "en": "bun",
     "ar": "خبزة صغيرة"
    },
    {
     "emoji": "✂️",
     "en": "cut",
     "ar": "يقص"
    },
    {
     "emoji": "🛖",
     "en": "hut",
     "ar": "كوخ"
    },
    {
     "emoji": "🚪",
     "en": "shut",
     "ar": "يسكّر"
    }
   ],
   "say": "Words with -ug, -un and -ut. hug. mug. jug. plug. run. fun. bun. cut. hut. shut."
  }
 },
 {
  "id": "lama-35",
  "order": 35,
  "levelId": "l2",
  "titleAr": "عائلة et و est",
  "titleEn": "-et and -est",
  "content": {
   "explanationAr": "صوت e القصير مثل bed و pen. نقرأ wet و jet و nest.",
   "altExplanationAr": "في est نسمع s و t مع بعض في الآخر: n-e-s-t.",
   "example": [
    {
     "en": "wet",
     "ar": "مبلل"
    },
    {
     "en": "jet",
     "ar": "طائرة نفاثة"
    },
    {
     "en": "vet",
     "ar": "طبيب بيطري"
    }
   ],
   "check": {
    "promptAr": "وش معنى wet؟",
    "options": [
     "رجال",
     "عش",
     "مبلل"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "وش معنى best؟",
     "options": [
      "طائرة نفاثة",
      "رجال",
      "الأفضل"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي كلمة معناها «راحة»؟",
     "options": [
      "rest",
      "vet",
      "sled"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي صورة تناسب كلمة jet؟",
     "options": [
      "👬",
      "✈️",
      "🪺"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "-et and -est"
   },
   {
    "kind": "highlight",
    "text": "Words with -et and -est"
   },
   {
    "kind": "example",
    "en": "wet",
    "ar": "مبلل"
   },
   {
    "kind": "example",
    "en": "jet",
    "ar": "طائرة نفاثة"
   }
  ],
  "kids": {
   "listTitle": "Words with -et and -est",
   "cards": [
    {
     "emoji": "💦",
     "en": "wet",
     "ar": "مبلل"
    },
    {
     "emoji": "✈️",
     "en": "jet",
     "ar": "طائرة نفاثة"
    },
    {
     "emoji": "🩺",
     "en": "vet",
     "ar": "طبيب بيطري"
    },
    {
     "emoji": "🐕",
     "en": "pet",
     "ar": "حيوان أليف"
    },
    {
     "emoji": "👬",
     "en": "men",
     "ar": "رجال"
    },
    {
     "emoji": "🛷",
     "en": "sled",
     "ar": "مزلجة"
    },
    {
     "emoji": "🏚️",
     "en": "shed",
     "ar": "مخزن صغير"
    },
    {
     "emoji": "🪺",
     "en": "nest",
     "ar": "عش"
    },
    {
     "emoji": "🥇",
     "en": "best",
     "ar": "الأفضل"
    },
    {
     "emoji": "😴",
     "en": "rest",
     "ar": "راحة"
    }
   ],
   "say": "Words with -et and -est. wet. jet. vet. pet. men. sled. shed. nest. best. rest."
  }
 },
 {
  "id": "lama-36",
  "order": 36,
  "levelId": "l2",
  "titleAr": "نهايات nd و mp و nt",
  "titleEn": "Endings ND, MP and NT",
  "content": {
   "explanationAr": "بعض الكلمات تنتهي بحرفين: sand آخرها nd، و lamp آخرها mp، و plant آخرها nt. نقرأ الحرفين.",
   "altExplanationAr": "قل الكلمة ببطء ولا تنسى آخر حرفين: la-m-p، pla-n-t.",
   "example": [
    {
     "en": "sand",
     "ar": "رمل"
    },
    {
     "en": "pond",
     "ar": "بركة"
    },
    {
     "en": "lamp",
     "ar": "مصباح"
    }
   ],
   "check": {
    "promptAr": "وش معنى sand؟",
    "options": [
     "يقفز",
     "قبضة اليد",
     "رمل"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "وش معنى stamp؟",
     "options": [
      "طابع",
      "قائمة",
      "بركة"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي كلمة معناها «نبتة»؟",
     "options": [
      "mask",
      "plant",
      "lamp"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي صورة تناسب كلمة fist؟",
     "options": [
      "🏖️",
      "🏕️",
      "✊"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Endings ND, MP and NT"
   },
   {
    "kind": "highlight",
    "text": "Words with Two Letters at the End"
   },
   {
    "kind": "example",
    "en": "sand",
    "ar": "رمل"
   },
   {
    "kind": "example",
    "en": "pond",
    "ar": "بركة"
   }
  ],
  "kids": {
   "listTitle": "Words with Two Letters at the End",
   "cards": [
    {
     "emoji": "🏖️",
     "en": "sand",
     "ar": "رمل"
    },
    {
     "emoji": "🦆",
     "en": "pond",
     "ar": "بركة"
    },
    {
     "emoji": "🪔",
     "en": "lamp",
     "ar": "مصباح"
    },
    {
     "emoji": "🏕️",
     "en": "camp",
     "ar": "مخيم"
    },
    {
     "emoji": "🤸",
     "en": "jump",
     "ar": "يقفز"
    },
    {
     "emoji": "📮",
     "en": "stamp",
     "ar": "طابع"
    },
    {
     "emoji": "🪴",
     "en": "plant",
     "ar": "نبتة"
    },
    {
     "emoji": "✊",
     "en": "fist",
     "ar": "قبضة اليد"
    },
    {
     "emoji": "📝",
     "en": "list",
     "ar": "قائمة"
    },
    {
     "emoji": "🎭",
     "en": "mask",
     "ar": "قناع"
    }
   ],
   "say": "Words with Two Letters at the End. sand. pond. lamp. camp. jump. stamp. plant. fist. list. mask."
  }
 },
 {
  "id": "lama-37",
  "order": 37,
  "levelId": "l2",
  "titleAr": "صوت WH",
  "titleEn": "The WH Sound",
  "content": {
   "explanationAr": "الحرفين W و H مع بعض نقولهم مثل صوت w: whale و wheel. وأسئلة كثيرة تبدأ بـ wh: what و where.",
   "altExplanationAr": "لا تنطق الـ h واضح، قل w بشفايف مدورة: wh-ale.",
   "example": [
    {
     "en": "whale",
     "ar": "حوت"
    },
    {
     "en": "wheel",
     "ar": "عجلة"
    },
    {
     "en": "white",
     "ar": "أبيض"
    }
   ],
   "check": {
    "promptAr": "وش معنى whale؟",
    "options": [
     "يهمس",
     "متى",
     "حوت"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "وش معنى wheat؟",
     "options": [
      "ماذا",
      "قمح",
      "ليش"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي كلمة معناها «يهمس»؟",
     "options": [
      "when",
      "whale",
      "whisper"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي صورة تناسب كلمة whistle؟",
     "options": [
      "📯",
      "📍",
      "🛞"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The WH Sound"
   },
   {
    "kind": "highlight",
    "text": "Words with WH"
   },
   {
    "kind": "example",
    "en": "whale",
    "ar": "حوت"
   },
   {
    "kind": "example",
    "en": "wheel",
    "ar": "عجلة"
   }
  ],
  "kids": {
   "listTitle": "Words with WH",
   "cards": [
    {
     "emoji": "🐋",
     "en": "whale",
     "ar": "حوت"
    },
    {
     "emoji": "🛞",
     "en": "wheel",
     "ar": "عجلة"
    },
    {
     "emoji": "⚪",
     "en": "white",
     "ar": "أبيض"
    },
    {
     "emoji": "🌾",
     "en": "wheat",
     "ar": "قمح"
    },
    {
     "emoji": "🤫",
     "en": "whisper",
     "ar": "يهمس"
    },
    {
     "emoji": "📯",
     "en": "whistle",
     "ar": "صافرة"
    },
    {
     "emoji": "❓",
     "en": "what",
     "ar": "ماذا"
    },
    {
     "emoji": "⏰",
     "en": "when",
     "ar": "متى"
    },
    {
     "emoji": "📍",
     "en": "where",
     "ar": "وين"
    },
    {
     "emoji": "🤔",
     "en": "why",
     "ar": "ليش"
    }
   ],
   "say": "Words with WH. whale. wheel. white. wheat. whisper. whistle. what. when. where. why."
  }
 },
 {
  "id": "lama-38",
  "order": 38,
  "levelId": "l2",
  "titleAr": "صوت CK في الآخر",
  "titleEn": "CK at the End",
  "content": {
   "explanationAr": "الحرفين C و K في آخر الكلمة نقولهم صوت واحد مثل «ك»: rock و neck و kick.",
   "altExplanationAr": "CK تجي بعد الحرف المتحرك القصير: ro-ck، ne-ck.",
   "example": [
    {
     "en": "rock",
     "ar": "صخرة"
    },
    {
     "en": "back",
     "ar": "خلف"
    },
    {
     "en": "neck",
     "ar": "رقبة"
    }
   ],
   "check": {
    "promptAr": "وش معنى rock؟",
    "options": [
     "وجبة خفيفة",
     "يرتّب الشنطة",
     "صخرة"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "وش معنى back؟",
     "options": [
      "وجبة خفيفة",
      "يرتّب الشنطة",
      "خلف"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي كلمة معناها «رقبة»؟",
     "options": [
      "neck",
      "stick",
      "quick"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي صورة تناسب كلمة kick؟",
     "options": [
      "🐤",
      "🦵",
      "✔️"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "CK at the End"
   },
   {
    "kind": "highlight",
    "text": "Words Ending in CK"
   },
   {
    "kind": "example",
    "en": "rock",
    "ar": "صخرة"
   },
   {
    "kind": "example",
    "en": "back",
    "ar": "خلف"
   }
  ],
  "kids": {
   "listTitle": "Words Ending in CK",
   "cards": [
    {
     "emoji": "🪨",
     "en": "rock",
     "ar": "صخرة"
    },
    {
     "emoji": "🔙",
     "en": "back",
     "ar": "خلف"
    },
    {
     "emoji": "🧣",
     "en": "neck",
     "ar": "رقبة"
    },
    {
     "emoji": "🦵",
     "en": "kick",
     "ar": "يركل"
    },
    {
     "emoji": "🍿",
     "en": "snack",
     "ar": "وجبة خفيفة"
    },
    {
     "emoji": "🪵",
     "en": "stick",
     "ar": "عصا"
    },
    {
     "emoji": "🐤",
     "en": "chick",
     "ar": "كتكوت"
    },
    {
     "emoji": "🎒",
     "en": "pack",
     "ar": "يرتّب الشنطة"
    },
    {
     "emoji": "⚡",
     "en": "quick",
     "ar": "سريع"
    },
    {
     "emoji": "✔️",
     "en": "tick",
     "ar": "علامة صح"
    }
   ],
   "say": "Words Ending in CK. rock. back. neck. kick. snack. stick. chick. pack. quick. tick."
  }
 },
 {
  "id": "lama-39",
  "order": 39,
  "levelId": "l2",
  "titleAr": "QU و X",
  "titleEn": "QU and X",
  "content": {
   "explanationAr": "QU نقولها «كو» مثل quiz، و X في آخر الكلمة نقولها «كس» مثل taxi و mix.",
   "altExplanationAr": "اسمع الصوت: qu-ack مثل صوت البطة، و fi-x آخرها «كس».",
   "example": [
    {
     "en": "quiz",
     "ar": "اختبار قصير"
    },
    {
     "en": "quilt",
     "ar": "لحاف"
    },
    {
     "en": "quack",
     "ar": "صوت البطة"
    }
   ],
   "check": {
    "promptAr": "وش معنى quiz؟",
    "options": [
     "هادئ",
     "اختبار قصير",
     "شمع"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "وش معنى quiet؟",
     "options": [
      "هادئ",
      "شمع",
      "اختبار قصير"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي كلمة معناها «تاكسي»؟",
     "options": [
      "ox",
      "taxi",
      "quilt"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي صورة تناسب كلمة mix؟",
     "options": [
      "🔧",
      "🦆",
      "🥣"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "QU and X"
   },
   {
    "kind": "highlight",
    "text": "Words with QU and X"
   },
   {
    "kind": "example",
    "en": "quiz",
    "ar": "اختبار قصير"
   },
   {
    "kind": "example",
    "en": "quilt",
    "ar": "لحاف"
   }
  ],
  "kids": {
   "listTitle": "Words with QU and X",
   "cards": [
    {
     "emoji": "📝",
     "en": "quiz",
     "ar": "اختبار قصير"
    },
    {
     "emoji": "🛌",
     "en": "quilt",
     "ar": "لحاف"
    },
    {
     "emoji": "🦆",
     "en": "quack",
     "ar": "صوت البطة"
    },
    {
     "emoji": "🟥",
     "en": "square",
     "ar": "مربع"
    },
    {
     "emoji": "🤫",
     "en": "quiet",
     "ar": "هادئ"
    },
    {
     "emoji": "🚕",
     "en": "taxi",
     "ar": "تاكسي"
    },
    {
     "emoji": "🥣",
     "en": "mix",
     "ar": "يخلط"
    },
    {
     "emoji": "🕯️",
     "en": "wax",
     "ar": "شمع"
    },
    {
     "emoji": "🐂",
     "en": "ox",
     "ar": "ثور"
    },
    {
     "emoji": "🔧",
     "en": "fix",
     "ar": "يصلّح"
    }
   ],
   "say": "Words with QU and X. quiz. quilt. quack. square. quiet. taxi. mix. wax. ox. fix."
  }
 },
 {
  "id": "lama-40",
  "order": 40,
  "levelId": "l2",
  "titleAr": "الحروف المكررة",
  "titleEn": "Double Letters",
  "content": {
   "explanationAr": "بعض الكلمات آخرها حرفين متشابهين: doll و kiss و puff و buzz. نقرأهم صوت واحد.",
   "altExplanationAr": "الحرف المكرر ما نقوله مرتين: do-ll نقولها «دول».",
   "example": [
    {
     "en": "doll",
     "ar": "دمية"
    },
    {
     "en": "hill",
     "ar": "تل"
    },
    {
     "en": "spell",
     "ar": "يتهجّى"
    }
   ],
   "check": {
    "promptAr": "وش معنى doll؟",
    "options": [
     "دمية",
     "كأس",
     "طنين"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "وش معنى glass؟",
     "options": [
      "طنين",
      "كأس",
      "دمية"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي كلمة معناها «جرف»؟",
     "options": [
      "fizz",
      "hill",
      "cliff"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي صورة تناسب كلمة puff؟",
     "options": [
      "💨",
      "❌",
      "🔤"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Double Letters"
   },
   {
    "kind": "highlight",
    "text": "Words with ll, ss, ff and zz"
   },
   {
    "kind": "example",
    "en": "doll",
    "ar": "دمية"
   },
   {
    "kind": "example",
    "en": "hill",
    "ar": "تل"
   }
  ],
  "kids": {
   "listTitle": "Words with ll, ss, ff and zz",
   "cards": [
    {
     "emoji": "🪆",
     "en": "doll",
     "ar": "دمية"
    },
    {
     "emoji": "⛰️",
     "en": "hill",
     "ar": "تل"
    },
    {
     "emoji": "🔤",
     "en": "spell",
     "ar": "يتهجّى"
    },
    {
     "emoji": "😘",
     "en": "kiss",
     "ar": "بوسة"
    },
    {
     "emoji": "🥛",
     "en": "glass",
     "ar": "كأس"
    },
    {
     "emoji": "🏔️",
     "en": "cliff",
     "ar": "جرف"
    },
    {
     "emoji": "💨",
     "en": "puff",
     "ar": "نفخة"
    },
    {
     "emoji": "🐝",
     "en": "buzz",
     "ar": "طنين"
    },
    {
     "emoji": "🫧",
     "en": "fizz",
     "ar": "فقاعات"
    },
    {
     "emoji": "❌",
     "en": "cross",
     "ar": "علامة خطأ"
    }
   ],
   "say": "Words with ll, ss, ff and zz. doll. hill. spell. kiss. glass. cliff. puff. buzz. fizz. cross."
  }
 },
 {
  "id": "lama-41",
  "order": 41,
  "levelId": "l2",
  "titleAr": "e السحرية مع a",
  "titleEn": "Magic E with A",
  "content": {
   "explanationAr": "لما تجي e في آخر الكلمة، الحرف a يقول اسمه: tap تصير tape. الـ e ما تنقرأ.",
   "altExplanationAr": "قارن: tap و tape، cap و cape. الـ e الساكتة تطوّل الصوت.",
   "example": [
    {
     "en": "cave",
     "ar": "كهف"
    },
    {
     "en": "tape",
     "ar": "شريط"
    },
    {
     "en": "face",
     "ar": "وجه"
    }
   ],
   "check": {
    "promptAr": "وش معنى cave؟",
    "options": [
     "كهف",
     "صفحة",
     "يخبز"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "وش معنى cage؟",
     "options": [
      "شكل",
      "شريط",
      "قفص"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي كلمة معناها «يتزلج»؟",
     "options": [
      "skate",
      "gate",
      "face"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي صورة تناسب كلمة bake؟",
     "options": [
      "🕳️",
      "🧁",
      "🏁"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Magic E with A"
   },
   {
    "kind": "highlight",
    "text": "a_e Words"
   },
   {
    "kind": "example",
    "en": "cave",
    "ar": "كهف"
   },
   {
    "kind": "example",
    "en": "tape",
    "ar": "شريط"
   }
  ],
  "kids": {
   "listTitle": "a_e Words",
   "cards": [
    {
     "emoji": "🕳️",
     "en": "cave",
     "ar": "كهف"
    },
    {
     "emoji": "📼",
     "en": "tape",
     "ar": "شريط"
    },
    {
     "emoji": "😀",
     "en": "face",
     "ar": "وجه"
    },
    {
     "emoji": "🏁",
     "en": "race",
     "ar": "سباق"
    },
    {
     "emoji": "📄",
     "en": "page",
     "ar": "صفحة"
    },
    {
     "emoji": "🦜",
     "en": "cage",
     "ar": "قفص"
    },
    {
     "emoji": "⛸️",
     "en": "skate",
     "ar": "يتزلج"
    },
    {
     "emoji": "🧁",
     "en": "bake",
     "ar": "يخبز"
    },
    {
     "emoji": "🔷",
     "en": "shape",
     "ar": "شكل"
    },
    {
     "emoji": "🚪",
     "en": "gate",
     "ar": "بوابة"
    }
   ],
   "say": "a_e Words. cave. tape. face. race. page. cage. skate. bake. shape. gate."
  }
 },
 {
  "id": "lama-42",
  "order": 42,
  "levelId": "l2",
  "titleAr": "e السحرية مع i و o",
  "titleEn": "Magic E with I and O",
  "content": {
   "explanationAr": "e السحرية تخلي i تقول اسمها مثل slide، و o تقول اسمها مثل rope.",
   "altExplanationAr": "قارن: pin و pine، hop و hope. الـ e في الآخر ما تنقرأ.",
   "example": [
    {
     "en": "slide",
     "ar": "زحليقة"
    },
    {
     "en": "bride",
     "ar": "عروس"
    },
    {
     "en": "dice",
     "ar": "زهر النرد"
    }
   ],
   "check": {
    "promptAr": "وش معنى slide؟",
    "options": [
     "عريض",
     "كرة أرضية",
     "زحليقة"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "وش معنى globe؟",
     "options": [
      "كرة أرضية",
      "زحليقة",
      "شجرة صنوبر"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي كلمة معناها «نوتة موسيقية»؟",
     "options": [
      "bride",
      "note",
      "wide"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي صورة تناسب كلمة cone؟",
     "options": [
      "🎲",
      "🪢",
      "🍦"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Magic E with I and O"
   },
   {
    "kind": "highlight",
    "text": "i_e and o_e Words"
   },
   {
    "kind": "example",
    "en": "slide",
    "ar": "زحليقة"
   },
   {
    "kind": "example",
    "en": "bride",
    "ar": "عروس"
   }
  ],
  "kids": {
   "listTitle": "i_e and o_e Words",
   "cards": [
    {
     "emoji": "🛝",
     "en": "slide",
     "ar": "زحليقة"
    },
    {
     "emoji": "👰",
     "en": "bride",
     "ar": "عروس"
    },
    {
     "emoji": "🎲",
     "en": "dice",
     "ar": "زهر النرد"
    },
    {
     "emoji": "🌲",
     "en": "pine",
     "ar": "شجرة صنوبر"
    },
    {
     "emoji": "↔️",
     "en": "wide",
     "ar": "عريض"
    },
    {
     "emoji": "🪢",
     "en": "rope",
     "ar": "حبل"
    },
    {
     "emoji": "🕳️",
     "en": "hole",
     "ar": "حفرة"
    },
    {
     "emoji": "🌍",
     "en": "globe",
     "ar": "كرة أرضية"
    },
    {
     "emoji": "🎵",
     "en": "note",
     "ar": "نوتة موسيقية"
    },
    {
     "emoji": "🍦",
     "en": "cone",
     "ar": "بسكويت الآيسكريم"
    }
   ],
   "say": "i_e and o_e Words. slide. bride. dice. pine. wide. rope. hole. globe. note. cone."
  }
 },
 {
  "id": "lama-43",
  "order": 43,
  "levelId": "l2",
  "titleAr": "e السحرية مع u",
  "titleEn": "Magic E with U",
  "content": {
   "explanationAr": "مع e السحرية الحرف u يقول اسمه «يو» أو «و» طويلة: cube و flute.",
   "altExplanationAr": "قارن: cub و cube، tub و tube.",
   "example": [
    {
     "en": "cube",
     "ar": "مكعب"
    },
    {
     "en": "tube",
     "ar": "أنبوب"
    },
    {
     "en": "flute",
     "ar": "ناي"
    }
   ],
   "check": {
    "promptAr": "وش معنى cube؟",
    "options": [
     "مكعب",
     "يونيو",
     "قاعدة"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "وش معنى mule؟",
     "options": [
      "ضخم",
      "بغل",
      "كثيب رملي"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي كلمة معناها «يونيو»؟",
     "options": [
      "rule",
      "cube",
      "June"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي صورة تناسب كلمة cute؟",
     "options": [
      "🥰",
      "🎶",
      "🧪"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Magic E with U"
   },
   {
    "kind": "highlight",
    "text": "u_e Words"
   },
   {
    "kind": "example",
    "en": "cube",
    "ar": "مكعب"
   },
   {
    "kind": "example",
    "en": "tube",
    "ar": "أنبوب"
   }
  ],
  "kids": {
   "listTitle": "u_e Words",
   "cards": [
    {
     "emoji": "🧊",
     "en": "cube",
     "ar": "مكعب"
    },
    {
     "emoji": "🧪",
     "en": "tube",
     "ar": "أنبوب"
    },
    {
     "emoji": "🪈",
     "en": "flute",
     "ar": "ناي"
    },
    {
     "emoji": "🫏",
     "en": "mule",
     "ar": "بغل"
    },
    {
     "emoji": "📅",
     "en": "June",
     "ar": "يونيو"
    },
    {
     "emoji": "🥰",
     "en": "cute",
     "ar": "لطيف"
    },
    {
     "emoji": "🦣",
     "en": "huge",
     "ar": "ضخم"
    },
    {
     "emoji": "📏",
     "en": "rule",
     "ar": "قاعدة"
    },
    {
     "emoji": "🎶",
     "en": "tune",
     "ar": "لحن"
    },
    {
     "emoji": "🏜️",
     "en": "dune",
     "ar": "كثيب رملي"
    }
   ],
   "say": "u_e Words. cube. tube. flute. mule. June. cute. huge. rule. tune. dune."
  }
 },
 {
  "id": "lama-44",
  "order": 44,
  "levelId": "l2",
  "titleAr": "AI و AY",
  "titleEn": "AI and AY",
  "content": {
   "explanationAr": "AI في وسط الكلمة و AY في آخرها، والاثنين نقولهم «اي» مثل اسم حرف A: nail و play.",
   "altExplanationAr": "نسمع نفس الصوت في mail و day.",
   "example": [
    {
     "en": "nail",
     "ar": "ظفر"
    },
    {
     "en": "tail",
     "ar": "ذيل"
    },
    {
     "en": "paint",
     "ar": "يلوّن"
    }
   ],
   "check": {
    "promptAr": "وش معنى nail؟",
    "options": [
     "يبحر",
     "ظفر",
     "طين صلصال"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "وش معنى clay؟",
     "options": [
      "ظفر",
      "بريد",
      "طين صلصال"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي كلمة معناها «يصلّي»؟",
     "options": [
      "pray",
      "tail",
      "sail"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي صورة تناسب كلمة May؟",
     "options": [
      "🎨",
      "🌼",
      "▶️"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "AI and AY"
   },
   {
    "kind": "highlight",
    "text": "Words with AI and AY"
   },
   {
    "kind": "example",
    "en": "nail",
    "ar": "ظفر"
   },
   {
    "kind": "example",
    "en": "tail",
    "ar": "ذيل"
   }
  ],
  "kids": {
   "listTitle": "Words with AI and AY",
   "cards": [
    {
     "emoji": "💅",
     "en": "nail",
     "ar": "ظفر"
    },
    {
     "emoji": "🐈",
     "en": "tail",
     "ar": "ذيل"
    },
    {
     "emoji": "🎨",
     "en": "paint",
     "ar": "يلوّن"
    },
    {
     "emoji": "📬",
     "en": "mail",
     "ar": "بريد"
    },
    {
     "emoji": "⛵",
     "en": "sail",
     "ar": "يبحر"
    },
    {
     "emoji": "▶️",
     "en": "play",
     "ar": "يلعب"
    },
    {
     "emoji": "☀️",
     "en": "day",
     "ar": "يوم"
    },
    {
     "emoji": "🏺",
     "en": "clay",
     "ar": "طين صلصال"
    },
    {
     "emoji": "🤲",
     "en": "pray",
     "ar": "يصلّي"
    },
    {
     "emoji": "🌼",
     "en": "May",
     "ar": "مايو"
    }
   ],
   "say": "Words with AI and AY. nail. tail. paint. mail. sail. play. day. clay. pray. May."
  }
 },
 {
  "id": "lama-45",
  "order": 45,
  "levelId": "l2",
  "titleAr": "OA و OW الطويلة",
  "titleEn": "OA and OW",
  "content": {
   "explanationAr": "OA و OW تقول اسم حرف O مثل toast و slow.",
   "altExplanationAr": "OA تجي غالبًا في الوسط، و OW في الآخر: fl-oa-t، gr-ow.",
   "example": [
    {
     "en": "toast",
     "ar": "خبز محمّص"
    },
    {
     "en": "float",
     "ar": "يطفو"
    },
    {
     "en": "goal",
     "ar": "هدف"
    }
   ],
   "check": {
    "promptAr": "وش معنى toast؟",
    "options": [
     "بطيء",
     "نافذة",
     "خبز محمّص"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "وش معنى float؟",
     "options": [
      "يطفو",
      "بطيء",
      "نافذة"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي كلمة معناها «هدف»؟",
     "options": [
      "grow",
      "goal",
      "pillow"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي صورة تناسب كلمة blow؟",
     "options": [
      "🏹",
      "🌳",
      "🌬️"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "OA and OW"
   },
   {
    "kind": "highlight",
    "text": "Long O with OA and OW"
   },
   {
    "kind": "example",
    "en": "toast",
    "ar": "خبز محمّص"
   },
   {
    "kind": "example",
    "en": "float",
    "ar": "يطفو"
   }
  ],
  "kids": {
   "listTitle": "Long O with OA and OW",
   "cards": [
    {
     "emoji": "🍞",
     "en": "toast",
     "ar": "خبز محمّص"
    },
    {
     "emoji": "🛟",
     "en": "float",
     "ar": "يطفو"
    },
    {
     "emoji": "🥅",
     "en": "goal",
     "ar": "هدف"
    },
    {
     "emoji": "🌬️",
     "en": "blow",
     "ar": "ينفخ"
    },
    {
     "emoji": "🐢",
     "en": "slow",
     "ar": "بطيء"
    },
    {
     "emoji": "🌱",
     "en": "grow",
     "ar": "ينمو"
    },
    {
     "emoji": "🏹",
     "en": "arrow",
     "ar": "سهم"
    },
    {
     "emoji": "🪟",
     "en": "window",
     "ar": "نافذة"
    },
    {
     "emoji": "🛏️",
     "en": "pillow",
     "ar": "مخدة"
    },
    {
     "emoji": "🌳",
     "en": "oak",
     "ar": "شجرة بلوط"
    }
   ],
   "say": "Long O with OA and OW. toast. float. goal. blow. slow. grow. arrow. window. pillow. oak."
  }
 },
 {
  "id": "lama-46",
  "order": 46,
  "levelId": "l2",
  "titleAr": "EA و EE",
  "titleEn": "EA and EE",
  "content": {
   "explanationAr": "EA و EE الاثنين يقولون «ي» طويلة مثل bean و jeep.",
   "altExplanationAr": "اسمع: s-ea-l، ch-ee-k. نفس الصوت بحروف مختلفة.",
   "example": [
    {
     "en": "bean",
     "ar": "فاصولياء"
    },
    {
     "en": "peach",
     "ar": "خوخ"
    },
    {
     "en": "seal",
     "ar": "فقمة"
    }
   ],
   "check": {
    "promptAr": "وش معنى bean؟",
    "options": [
     "خد",
     "غزال",
     "فاصولياء"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "وش معنى sweep؟",
     "options": [
      "فريق",
      "يكنس",
      "خوخ"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي كلمة معناها «شارع»؟",
     "options": [
      "dream",
      "seal",
      "street"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي صورة تناسب كلمة deer؟",
     "options": [
      "🦌",
      "🫘",
      "🚙"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "EA and EE"
   },
   {
    "kind": "highlight",
    "text": "Long E with EA and EE"
   },
   {
    "kind": "example",
    "en": "bean",
    "ar": "فاصولياء"
   },
   {
    "kind": "example",
    "en": "peach",
    "ar": "خوخ"
   }
  ],
  "kids": {
   "listTitle": "Long E with EA and EE",
   "cards": [
    {
     "emoji": "🫘",
     "en": "bean",
     "ar": "فاصولياء"
    },
    {
     "emoji": "🍑",
     "en": "peach",
     "ar": "خوخ"
    },
    {
     "emoji": "🦭",
     "en": "seal",
     "ar": "فقمة"
    },
    {
     "emoji": "🚙",
     "en": "jeep",
     "ar": "جيب"
    },
    {
     "emoji": "😊",
     "en": "cheek",
     "ar": "خد"
    },
    {
     "emoji": "🧹",
     "en": "sweep",
     "ar": "يكنس"
    },
    {
     "emoji": "🛣️",
     "en": "street",
     "ar": "شارع"
    },
    {
     "emoji": "🦌",
     "en": "deer",
     "ar": "غزال"
    },
    {
     "emoji": "👥",
     "en": "team",
     "ar": "فريق"
    },
    {
     "emoji": "💭",
     "en": "dream",
     "ar": "حلم"
    }
   ],
   "say": "Long E with EA and EE. bean. peach. seal. jeep. cheek. sweep. street. deer. team. dream."
  }
 },
 {
  "id": "lama-47",
  "order": 47,
  "levelId": "l2",
  "titleAr": "IGH و IE و Y",
  "titleEn": "IGH, IE and Y",
  "content": {
   "explanationAr": "صوت i الطويل «اي» نكتبه igh مثل high، أو ie مثل tie، أو y في الآخر مثل cry.",
   "altExplanationAr": "الـ gh في igh ما تنقرأ: h-igh نقولها «هاي».",
   "example": [
    {
     "en": "high",
     "ar": "عالي"
    },
    {
     "en": "right",
     "ar": "صح"
    },
    {
     "en": "bright",
     "ar": "ساطع"
    }
   ],
   "check": {
    "promptAr": "وش معنى high؟",
    "options": [
     "عالي",
     "يبكي",
     "جاسوس"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "وش معنى spy؟",
     "options": [
      "عالي",
      "ربطة عنق",
      "جاسوس"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي كلمة معناها «يقلي»؟",
     "options": [
      "fry",
      "right",
      "cry"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي صورة تناسب كلمة shy؟",
     "options": [
      "🌟",
      "🙈",
      "🪰"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "IGH, IE and Y"
   },
   {
    "kind": "highlight",
    "text": "Long I Words"
   },
   {
    "kind": "example",
    "en": "high",
    "ar": "عالي"
   },
   {
    "kind": "example",
    "en": "right",
    "ar": "صح"
   }
  ],
  "kids": {
   "listTitle": "Long I Words",
   "cards": [
    {
     "emoji": "⬆️",
     "en": "high",
     "ar": "عالي"
    },
    {
     "emoji": "✅",
     "en": "right",
     "ar": "صح"
    },
    {
     "emoji": "🌟",
     "en": "bright",
     "ar": "ساطع"
    },
    {
     "emoji": "👔",
     "en": "tie",
     "ar": "ربطة عنق"
    },
    {
     "emoji": "😢",
     "en": "cry",
     "ar": "يبكي"
    },
    {
     "emoji": "🪰",
     "en": "fly",
     "ar": "ذبابة"
    },
    {
     "emoji": "🌵",
     "en": "dry",
     "ar": "ناشف"
    },
    {
     "emoji": "🕵️",
     "en": "spy",
     "ar": "جاسوس"
    },
    {
     "emoji": "🍟",
     "en": "fry",
     "ar": "يقلي"
    },
    {
     "emoji": "🙈",
     "en": "shy",
     "ar": "خجول"
    }
   ],
   "say": "Long I Words. high. right. bright. tie. cry. fly. dry. spy. fry. shy."
  }
 },
 {
  "id": "lama-48",
  "order": 48,
  "levelId": "l2",
  "titleAr": "OO القصيرة",
  "titleEn": "Short OO",
  "content": {
   "explanationAr": "OO أحيانًا قصيرة مثل look و cook، مو طويلة مثل moon.",
   "altExplanationAr": "قارن: moon طويلة، و book قصيرة. اسمع الفرق.",
   "example": [
    {
     "en": "look",
     "ar": "يشوف"
    },
    {
     "en": "cook",
     "ar": "طبّاخ"
    },
    {
     "en": "wood",
     "ar": "خشب"
    }
   ],
   "check": {
    "promptAr": "وش معنى look؟",
    "options": [
     "يشوف",
     "خطّاف",
     "بسكوتة"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "وش معنى hook؟",
     "options": [
      "خطّاف",
      "بسكوتة",
      "يشوف"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي كلمة معناها «صوف»؟",
     "options": [
      "woof",
      "wool",
      "cook"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي صورة تناسب كلمة hood؟",
     "options": [
      "👋",
      "🪵",
      "🧥"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Short OO"
   },
   {
    "kind": "highlight",
    "text": "OO as in Look"
   },
   {
    "kind": "example",
    "en": "look",
    "ar": "يشوف"
   },
   {
    "kind": "example",
    "en": "cook",
    "ar": "طبّاخ"
   }
  ],
  "kids": {
   "listTitle": "OO as in Look",
   "cards": [
    {
     "emoji": "👀",
     "en": "look",
     "ar": "يشوف"
    },
    {
     "emoji": "👩‍🍳",
     "en": "cook",
     "ar": "طبّاخ"
    },
    {
     "emoji": "🪵",
     "en": "wood",
     "ar": "خشب"
    },
    {
     "emoji": "👍",
     "en": "good",
     "ar": "زين"
    },
    {
     "emoji": "🪝",
     "en": "hook",
     "ar": "خطّاف"
    },
    {
     "emoji": "🧶",
     "en": "wool",
     "ar": "صوف"
    },
    {
     "emoji": "🧥",
     "en": "hood",
     "ar": "غطاء الرأس"
    },
    {
     "emoji": "🍪",
     "en": "cookie",
     "ar": "بسكوتة"
    },
    {
     "emoji": "🐶",
     "en": "woof",
     "ar": "هوهو"
    },
    {
     "emoji": "👋",
     "en": "goodbye",
     "ar": "مع السلامة"
    }
   ],
   "say": "OO as in Look. look. cook. wood. good. hook. wool. hood. cookie. woof. goodbye."
  }
 },
 {
  "id": "lama-49",
  "order": 49,
  "levelId": "l2",
  "titleAr": "AW و AU و ALL",
  "titleEn": "AW, AU and ALL",
  "content": {
   "explanationAr": "AW و AU نقولهم «أو» مثل saw و sauce، و ALL نقولها «أول» مثل tall.",
   "altExplanationAr": "افتح فمك وقل «أو»: p-aw، dr-aw، t-all.",
   "example": [
    {
     "en": "saw",
     "ar": "منشار"
    },
    {
     "en": "paw",
     "ar": "كف الحيوان"
    },
    {
     "en": "draw",
     "ar": "يرسم"
    }
   ],
   "check": {
    "promptAr": "وش معنى saw؟",
    "options": [
     "منشار",
     "مخلب",
     "طويل"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "وش معنى fall؟",
     "options": [
      "كف الحيوان",
      "يطيح",
      "مخلب"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي كلمة معناها «يتصل»؟",
     "options": [
      "draw",
      "yawn",
      "call"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي صورة تناسب كلمة paw؟",
     "options": [
      "🐾",
      "🦀",
      "🦒"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "AW, AU and ALL"
   },
   {
    "kind": "highlight",
    "text": "Words with AW, AU and ALL"
   },
   {
    "kind": "example",
    "en": "saw",
    "ar": "منشار"
   },
   {
    "kind": "example",
    "en": "paw",
    "ar": "كف الحيوان"
   }
  ],
  "kids": {
   "listTitle": "Words with AW, AU and ALL",
   "cards": [
    {
     "emoji": "🪚",
     "en": "saw",
     "ar": "منشار"
    },
    {
     "emoji": "🐾",
     "en": "paw",
     "ar": "كف الحيوان"
    },
    {
     "emoji": "✏️",
     "en": "draw",
     "ar": "يرسم"
    },
    {
     "emoji": "🥤",
     "en": "straw",
     "ar": "شفّاطة"
    },
    {
     "emoji": "🦀",
     "en": "claw",
     "ar": "مخلب"
    },
    {
     "emoji": "🥱",
     "en": "yawn",
     "ar": "يتثاوب"
    },
    {
     "emoji": "🥫",
     "en": "sauce",
     "ar": "صلصة"
    },
    {
     "emoji": "🦒",
     "en": "tall",
     "ar": "طويل"
    },
    {
     "emoji": "🍂",
     "en": "fall",
     "ar": "يطيح"
    },
    {
     "emoji": "📞",
     "en": "call",
     "ar": "يتصل"
    }
   ],
   "say": "Words with AW, AU and ALL. saw. paw. draw. straw. claw. yawn. sauce. tall. fall. call."
  }
 },
 {
  "id": "lama-50",
  "order": 50,
  "levelId": "l2",
  "titleAr": "OI و OY",
  "titleEn": "OI and OY",
  "content": {
   "explanationAr": "OI و OY نقولهم «وي» مثل coin و toy. OI في الوسط و OY في الآخر.",
   "altExplanationAr": "اسمع: c-oi-n، b-oy.",
   "example": [
    {
     "en": "coin",
     "ar": "عملة معدنية"
    },
    {
     "en": "oil",
     "ar": "زيت"
    },
    {
     "en": "boil",
     "ar": "يغلي"
    }
   ],
   "check": {
    "promptAr": "وش معنى coin؟",
    "options": [
     "تربة",
     "فرح",
     "عملة معدنية"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "وش معنى soil؟",
     "options": [
      "فرح",
      "عملة معدنية",
      "تربة"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي كلمة معناها «لعبة»؟",
     "options": [
      "toy",
      "oyster",
      "oil"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي صورة تناسب كلمة boy؟",
     "options": [
      "🔊",
      "👦",
      "♨️"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "OI and OY"
   },
   {
    "kind": "highlight",
    "text": "Words with OI and OY"
   },
   {
    "kind": "example",
    "en": "coin",
    "ar": "عملة معدنية"
   },
   {
    "kind": "example",
    "en": "oil",
    "ar": "زيت"
   }
  ],
  "kids": {
   "listTitle": "Words with OI and OY",
   "cards": [
    {
     "emoji": "🪙",
     "en": "coin",
     "ar": "عملة معدنية"
    },
    {
     "emoji": "🛢️",
     "en": "oil",
     "ar": "زيت"
    },
    {
     "emoji": "♨️",
     "en": "boil",
     "ar": "يغلي"
    },
    {
     "emoji": "👉",
     "en": "point",
     "ar": "يأشّر"
    },
    {
     "emoji": "🪴",
     "en": "soil",
     "ar": "تربة"
    },
    {
     "emoji": "🧸",
     "en": "toy",
     "ar": "لعبة"
    },
    {
     "emoji": "👦",
     "en": "boy",
     "ar": "ولد"
    },
    {
     "emoji": "😄",
     "en": "joy",
     "ar": "فرح"
    },
    {
     "emoji": "🦪",
     "en": "oyster",
     "ar": "محار"
    },
    {
     "emoji": "🔊",
     "en": "noise",
     "ar": "إزعاج"
    }
   ],
   "say": "Words with OI and OY. coin. oil. boil. point. soil. toy. boy. joy. oyster. noise."
  }
 },
 {
  "id": "lama-51",
  "order": 51,
  "levelId": "l2",
  "titleAr": "كلمات من مقطعين",
  "titleEn": "Two-Part Words",
  "content": {
   "explanationAr": "كلمات أطول نقسمها نصين ونقرأ كل نص: sun-set و ro-bot و kit-ten.",
   "altExplanationAr": "صفّق مع كل مقطع: pic-nic تصفيقتين.",
   "example": [
    {
     "en": "sunset",
     "ar": "غروب الشمس"
    },
    {
     "en": "picnic",
     "ar": "نزهة"
    },
    {
     "en": "robot",
     "ar": "روبوت"
    }
   ],
   "check": {
    "promptAr": "وش معنى sunset؟",
    "options": [
     "زر",
     "غروب الشمس",
     "منديل"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "وش معنى button؟",
     "options": [
      "زر",
      "منديل",
      "غروب الشمس"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي كلمة معناها «مغناطيس»؟",
     "options": [
      "rocket",
      "magnet",
      "picnic"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي صورة تناسب كلمة tablet؟",
     "options": [
      "🧑‍🤝‍🧑",
      "🤖",
      "📱"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Two-Part Words"
   },
   {
    "kind": "highlight",
    "text": "Words with Two Parts"
   },
   {
    "kind": "example",
    "en": "sunset",
    "ar": "غروب الشمس"
   },
   {
    "kind": "example",
    "en": "picnic",
    "ar": "نزهة"
   }
  ],
  "kids": {
   "listTitle": "Words with Two Parts",
   "cards": [
    {
     "emoji": "🌅",
     "en": "sunset",
     "ar": "غروب الشمس"
    },
    {
     "emoji": "🧺",
     "en": "picnic",
     "ar": "نزهة"
    },
    {
     "emoji": "🤖",
     "en": "robot",
     "ar": "روبوت"
    },
    {
     "emoji": "🐈",
     "en": "kitten",
     "ar": "قطوة صغيرة"
    },
    {
     "emoji": "🔘",
     "en": "button",
     "ar": "زر"
    },
    {
     "emoji": "🧲",
     "en": "magnet",
     "ar": "مغناطيس"
    },
    {
     "emoji": "📱",
     "en": "tablet",
     "ar": "جهاز لوحي"
    },
    {
     "emoji": "🧻",
     "en": "napkin",
     "ar": "منديل"
    },
    {
     "emoji": "🚀",
     "en": "rocket",
     "ar": "صاروخ"
    },
    {
     "emoji": "🧑‍🤝‍🧑",
     "en": "cousin",
     "ar": "ولد العم"
    }
   ],
   "say": "Words with Two Parts. sunset. picnic. robot. kitten. button. magnet. tablet. napkin. rocket. cousin."
  }
 },
 {
  "id": "lama-52",
  "order": 52,
  "levelId": "l2",
  "titleAr": "كلمات مركّبة",
  "titleEn": "Compound Words",
  "content": {
   "explanationAr": "بعض الكلمات مكونة من كلمتين: sun و flower تصير sunflower، و rain و bow تصير rainbow.",
   "altExplanationAr": "دوّر على الكلمتين داخل الكلمة: tooth + brush: toothbrush.",
   "example": [
    {
     "en": "sunflower",
     "ar": "دوار الشمس"
    },
    {
     "en": "rainbow",
     "ar": "قوس قزح"
    },
    {
     "en": "football",
     "ar": "كرة قدم"
    }
   ],
   "check": {
    "promptAr": "وش معنى sunflower؟",
    "options": [
     "دوار الشمس",
     "كب كيك",
     "رجل الثلج"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "وش معنى seashell؟",
     "options": [
      "قوس قزح",
      "صدفة بحر",
      "كب كيك"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي كلمة معناها «سمكة ذهبية»؟",
     "options": [
      "football",
      "starfish",
      "goldfish"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي صورة تناسب كلمة rainbow؟",
     "options": [
      "🌈",
      "🧁",
      "⛄"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Compound Words"
   },
   {
    "kind": "highlight",
    "text": "Two Words in One"
   },
   {
    "kind": "example",
    "en": "sunflower",
    "ar": "دوار الشمس"
   },
   {
    "kind": "example",
    "en": "rainbow",
    "ar": "قوس قزح"
   }
  ],
  "kids": {
   "listTitle": "Two Words in One",
   "cards": [
    {
     "emoji": "🌻",
     "en": "sunflower",
     "ar": "دوار الشمس"
    },
    {
     "emoji": "🌈",
     "en": "rainbow",
     "ar": "قوس قزح"
    },
    {
     "emoji": "⚽",
     "en": "football",
     "ar": "كرة قدم"
    },
    {
     "emoji": "🪥",
     "en": "toothbrush",
     "ar": "فرشاة أسنان"
    },
    {
     "emoji": "🧁",
     "en": "cupcake",
     "ar": "كب كيك"
    },
    {
     "emoji": "⭐",
     "en": "starfish",
     "ar": "نجم البحر"
    },
    {
     "emoji": "🦋",
     "en": "butterfly",
     "ar": "فراشة"
    },
    {
     "emoji": "⛄",
     "en": "snowman",
     "ar": "رجل الثلج"
    },
    {
     "emoji": "🐚",
     "en": "seashell",
     "ar": "صدفة بحر"
    },
    {
     "emoji": "🐠",
     "en": "goldfish",
     "ar": "سمكة ذهبية"
    }
   ],
   "say": "Two Words in One. sunflower. rainbow. football. toothbrush. cupcake. starfish. butterfly. snowman. seashell. goldfish."
  }
 },
 {
  "id": "lama-53",
  "order": 53,
  "levelId": "l2",
  "titleAr": "أصوات NG و NK أكثر",
  "titleEn": "More NG and NK",
  "content": {
   "explanationAr": "نكمل مع ng مثل sing و king، و nk مثل honk و blink.",
   "altExplanationAr": "في ng ما نقول g واضحة: si-ng. وفي nk نسمع «نك».",
   "example": [
    {
     "en": "sing",
     "ar": "يغني"
    },
    {
     "en": "king",
     "ar": "ملك"
    },
    {
     "en": "wing",
     "ar": "جناح"
    }
   ],
   "check": {
    "promptAr": "وش معنى sing؟",
    "options": [
     "أغنية",
     "يغني",
     "قرد"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "وش معنى monkey؟",
     "options": [
      "يغني",
      "مرجيحة",
      "قرد"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي كلمة معناها «يرمش»؟",
     "options": [
      "blink",
      "king",
      "song"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي صورة تناسب كلمة tank؟",
     "options": [
      "🪽",
      "🛢️",
      "📯"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "More NG and NK"
   },
   {
    "kind": "highlight",
    "text": "More NG and NK Words"
   },
   {
    "kind": "example",
    "en": "sing",
    "ar": "يغني"
   },
   {
    "kind": "example",
    "en": "king",
    "ar": "ملك"
   }
  ],
  "kids": {
   "listTitle": "More NG and NK Words",
   "cards": [
    {
     "emoji": "🎤",
     "en": "sing",
     "ar": "يغني"
    },
    {
     "emoji": "🤴",
     "en": "king",
     "ar": "ملك"
    },
    {
     "emoji": "🪽",
     "en": "wing",
     "ar": "جناح"
    },
    {
     "emoji": "🛝",
     "en": "swing",
     "ar": "مرجيحة"
    },
    {
     "emoji": "🎵",
     "en": "song",
     "ar": "أغنية"
    },
    {
     "emoji": "📯",
     "en": "honk",
     "ar": "يزمّر"
    },
    {
     "emoji": "🦨",
     "en": "skunk",
     "ar": "ظربان"
    },
    {
     "emoji": "🐒",
     "en": "monkey",
     "ar": "قرد"
    },
    {
     "emoji": "😉",
     "en": "blink",
     "ar": "يرمش"
    },
    {
     "emoji": "🛢️",
     "en": "tank",
     "ar": "خزان"
    }
   ],
   "say": "More NG and NK Words. sing. king. wing. swing. song. honk. skunk. monkey. blink. tank."
  }
 },
 {
  "id": "lama-54",
  "order": 54,
  "levelId": "l2",
  "titleAr": "حروف ما تنقرأ",
  "titleEn": "Silent Letters",
  "content": {
   "explanationAr": "بعض الحروف نكتبها وما نقولها: k في knife، و w في write، و b في lamb.",
   "altExplanationAr": "غطِّ الحرف الساكت بإصبعك واقرأ: (k)nife: naif.",
   "example": [
    {
     "en": "knife",
     "ar": "سكين"
    },
    {
     "en": "knock",
     "ar": "يدق الباب"
    },
    {
     "en": "knight",
     "ar": "فارس"
    }
   ],
   "check": {
    "promptAr": "وش معنى knife؟",
    "options": [
     "سكين",
     "معصم",
     "مشط"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "وش معنى wrong؟",
     "options": [
      "خطأ",
      "يتسلق",
      "يدق الباب"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي كلمة معناها «خروف صغير»؟",
     "options": [
      "hour",
      "lamb",
      "knight"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي صورة تناسب كلمة comb؟",
     "options": [
      "🔪",
      "✍️",
      "🪮"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Silent Letters"
   },
   {
    "kind": "highlight",
    "text": "Letters We Do Not Say"
   },
   {
    "kind": "example",
    "en": "knife",
    "ar": "سكين"
   },
   {
    "kind": "example",
    "en": "knock",
    "ar": "يدق الباب"
   }
  ],
  "kids": {
   "listTitle": "Letters We Do Not Say",
   "cards": [
    {
     "emoji": "🔪",
     "en": "knife",
     "ar": "سكين"
    },
    {
     "emoji": "🚪",
     "en": "knock",
     "ar": "يدق الباب"
    },
    {
     "emoji": "🛡️",
     "en": "knight",
     "ar": "فارس"
    },
    {
     "emoji": "✍️",
     "en": "write",
     "ar": "يكتب"
    },
    {
     "emoji": "⌚",
     "en": "wrist",
     "ar": "معصم"
    },
    {
     "emoji": "❌",
     "en": "wrong",
     "ar": "خطأ"
    },
    {
     "emoji": "🐑",
     "en": "lamb",
     "ar": "خروف صغير"
    },
    {
     "emoji": "🪮",
     "en": "comb",
     "ar": "مشط"
    },
    {
     "emoji": "🧗",
     "en": "climb",
     "ar": "يتسلق"
    },
    {
     "emoji": "🕐",
     "en": "hour",
     "ar": "ساعة زمنية"
    }
   ],
   "say": "Letters We Do Not Say. knife. knock. knight. write. wrist. wrong. lamb. comb. climb. hour."
  }
 },
 {
  "id": "lama-55",
  "order": 55,
  "levelId": "l2",
  "titleAr": "C و G الناعمة",
  "titleEn": "Soft C and G",
  "content": {
   "explanationAr": "قبل e و i و y حرف C يصير «س» مثل city، وحرف G أحيانًا يصير «ج» مثل giant.",
   "altExplanationAr": "قارن: cat «ك» و city «س». و goat «ق» و gem «ج».",
   "example": [
    {
     "en": "city",
     "ar": "مدينة"
    },
    {
     "en": "cereal",
     "ar": "حبوب الفطور"
    },
    {
     "en": "mice",
     "ar": "فئران"
    }
   ],
   "check": {
    "promptAr": "وش معنى city؟",
    "options": [
     "يرقص",
     "جوهرة",
     "مدينة"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "وش معنى mice؟",
     "options": [
      "عملاق",
      "فئران",
      "سحر"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي كلمة معناها «قلم رصاص»؟",
     "options": [
      "giraffe",
      "danger",
      "pencil"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي صورة تناسب كلمة dance؟",
     "options": [
      "💃",
      "💎",
      "🏙️"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Soft C and G"
   },
   {
    "kind": "highlight",
    "text": "Soft C and Soft G"
   },
   {
    "kind": "example",
    "en": "city",
    "ar": "مدينة"
   },
   {
    "kind": "example",
    "en": "cereal",
    "ar": "حبوب الفطور"
   }
  ],
  "kids": {
   "listTitle": "Soft C and Soft G",
   "cards": [
    {
     "emoji": "🏙️",
     "en": "city",
     "ar": "مدينة"
    },
    {
     "emoji": "🥣",
     "en": "cereal",
     "ar": "حبوب الفطور"
    },
    {
     "emoji": "🐭",
     "en": "mice",
     "ar": "فئران"
    },
    {
     "emoji": "✏️",
     "en": "pencil",
     "ar": "قلم رصاص"
    },
    {
     "emoji": "💃",
     "en": "dance",
     "ar": "يرقص"
    },
    {
     "emoji": "🧌",
     "en": "giant",
     "ar": "عملاق"
    },
    {
     "emoji": "🦒",
     "en": "giraffe",
     "ar": "زرافة"
    },
    {
     "emoji": "💎",
     "en": "gem",
     "ar": "جوهرة"
    },
    {
     "emoji": "🪄",
     "en": "magic",
     "ar": "سحر"
    },
    {
     "emoji": "⚠️",
     "en": "danger",
     "ar": "خطر"
    }
   ],
   "say": "Soft C and Soft G. city. cereal. mice. pencil. dance. giant. giraffe. gem. magic. danger."
  }
 },
 {
  "id": "lama-56",
  "order": 56,
  "levelId": "l2",
  "titleAr": "حرف Y في آخر الكلمة",
  "titleEn": "Y at the End",
  "content": {
   "explanationAr": "لما تجي y في آخر كلمة طويلة نقولها «ي» مثل happy و candy.",
   "altExplanationAr": "في الكلمات القصيرة مثل cry نقولها «اي»، وفي الطويلة مثل puppy نقولها «ي».",
   "example": [
    {
     "en": "happy",
     "ar": "مبسوط"
    },
    {
     "en": "candy",
     "ar": "حلاوة"
    },
    {
     "en": "puppy",
     "ar": "جرو"
    }
   ],
   "check": {
    "promptAr": "وش معنى happy؟",
    "options": [
     "مبسوط",
     "دبدوب",
     "توتة"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "وش معنى teddy؟",
     "options": [
      "توتة",
      "مبسوط",
      "دبدوب"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي كلمة معناها «مضحك»؟",
     "options": [
      "funny",
      "pony",
      "candy"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي صورة تناسب كلمة lady؟",
     "options": [
      "🎉",
      "👩",
      "🐶"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Y at the End"
   },
   {
    "kind": "highlight",
    "text": "Y Says EE"
   },
   {
    "kind": "example",
    "en": "happy",
    "ar": "مبسوط"
   },
   {
    "kind": "example",
    "en": "candy",
    "ar": "حلاوة"
   }
  ],
  "kids": {
   "listTitle": "Y Says EE",
   "cards": [
    {
     "emoji": "😊",
     "en": "happy",
     "ar": "مبسوط"
    },
    {
     "emoji": "🍬",
     "en": "candy",
     "ar": "حلاوة"
    },
    {
     "emoji": "🐶",
     "en": "puppy",
     "ar": "جرو"
    },
    {
     "emoji": "🐰",
     "en": "bunny",
     "ar": "أرنوب"
    },
    {
     "emoji": "🧸",
     "en": "teddy",
     "ar": "دبدوب"
    },
    {
     "emoji": "🤣",
     "en": "funny",
     "ar": "مضحك"
    },
    {
     "emoji": "👩",
     "en": "lady",
     "ar": "سيدة"
    },
    {
     "emoji": "🍓",
     "en": "berry",
     "ar": "توتة"
    },
    {
     "emoji": "🐴",
     "en": "pony",
     "ar": "حصان صغير"
    },
    {
     "emoji": "🎉",
     "en": "party",
     "ar": "حفلة"
    }
   ],
   "say": "Y Says EE. happy. candy. puppy. bunny. teddy. funny. lady. berry. pony. party."
  }
 },
 {
  "id": "lama-57",
  "order": 57,
  "levelId": "l2",
  "titleAr": "النهاية le",
  "titleEn": "Endings with LE",
  "content": {
   "explanationAr": "كلمات كثيرة تنتهي بـ le ونقولها «ل» خفيفة: table و candle.",
   "altExplanationAr": "قسّم الكلمة: ta-ble، can-dle، bot-tle.",
   "example": [
    {
     "en": "table",
     "ar": "طاولة"
    },
    {
     "en": "candle",
     "ar": "شمعة"
    },
    {
     "en": "bottle",
     "ar": "قنينة"
    }
   ],
   "check": {
    "promptAr": "وش معنى table؟",
    "options": [
     "قلعة",
     "إبرة",
     "طاولة"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "وش معنى jungle؟",
     "options": [
      "غابة",
      "شمعة",
      "قلعة"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي كلمة معناها «عم»؟",
     "options": [
      "bottle",
      "uncle",
      "bubble"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي صورة تناسب كلمة candle؟",
     "options": [
      "🏰",
      "🪡",
      "🕯️"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Endings with LE"
   },
   {
    "kind": "highlight",
    "text": "Words Ending in LE"
   },
   {
    "kind": "example",
    "en": "table",
    "ar": "طاولة"
   },
   {
    "kind": "example",
    "en": "candle",
    "ar": "شمعة"
   }
  ],
  "kids": {
   "listTitle": "Words Ending in LE",
   "cards": [
    {
     "emoji": "🪑",
     "en": "table",
     "ar": "طاولة"
    },
    {
     "emoji": "🕯️",
     "en": "candle",
     "ar": "شمعة"
    },
    {
     "emoji": "🍼",
     "en": "bottle",
     "ar": "قنينة"
    },
    {
     "emoji": "🧩",
     "en": "puzzle",
     "ar": "أحجية"
    },
    {
     "emoji": "🏰",
     "en": "castle",
     "ar": "قلعة"
    },
    {
     "emoji": "🫧",
     "en": "bubble",
     "ar": "فقاعة"
    },
    {
     "emoji": "🦅",
     "en": "eagle",
     "ar": "نسر"
    },
    {
     "emoji": "🪡",
     "en": "needle",
     "ar": "إبرة"
    },
    {
     "emoji": "🌴",
     "en": "jungle",
     "ar": "غابة"
    },
    {
     "emoji": "👨",
     "en": "uncle",
     "ar": "عم"
    }
   ],
   "say": "Words Ending in LE. table. candle. bottle. puzzle. castle. bubble. eagle. needle. jungle. uncle."
  }
 },
 {
  "id": "lama-58",
  "order": 58,
  "levelId": "l2",
  "titleAr": "PH و GH بصوت F",
  "titleEn": "PH and GH Say F",
  "content": {
   "explanationAr": "PH نقولها «ف» مثل photo و dolphin، و GH أحيانًا «ف» مثل laugh.",
   "altExplanationAr": "تذكّر: ph: f. واكتبها ph مو f: photo.",
   "example": [
    {
     "en": "dolphin",
     "ar": "دلفين"
    },
    {
     "en": "alphabet",
     "ar": "الحروف الأبجدية"
    },
    {
     "en": "trophy",
     "ar": "كأس البطولة"
    }
   ],
   "check": {
    "promptAr": "وش معنى dolphin؟",
    "options": [
     "دلفين",
     "يضحك",
     "صورة"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "وش معنى pharmacy؟",
     "options": [
      "الحروف الأبجدية",
      "صيدلية",
      "يضحك"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي كلمة معناها «ميكروفون»؟",
     "options": [
      "trophy",
      "cough",
      "microphone"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي صورة تناسب كلمة alphabet؟",
     "options": [
      "🔤",
      "😂",
      "📸"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "PH and GH Say F"
   },
   {
    "kind": "highlight",
    "text": "When PH and GH Say F"
   },
   {
    "kind": "example",
    "en": "dolphin",
    "ar": "دلفين"
   },
   {
    "kind": "example",
    "en": "alphabet",
    "ar": "الحروف الأبجدية"
   }
  ],
  "kids": {
   "listTitle": "When PH and GH Say F",
   "cards": [
    {
     "emoji": "🐬",
     "en": "dolphin",
     "ar": "دلفين"
    },
    {
     "emoji": "🔤",
     "en": "alphabet",
     "ar": "الحروف الأبجدية"
    },
    {
     "emoji": "🏆",
     "en": "trophy",
     "ar": "كأس البطولة"
    },
    {
     "emoji": "📊",
     "en": "graph",
     "ar": "رسم بياني"
    },
    {
     "emoji": "😂",
     "en": "laugh",
     "ar": "يضحك"
    },
    {
     "emoji": "🤧",
     "en": "cough",
     "ar": "يكح"
    },
    {
     "emoji": "✋",
     "en": "enough",
     "ar": "كافي"
    },
    {
     "emoji": "📸",
     "en": "photo",
     "ar": "صورة"
    },
    {
     "emoji": "💊",
     "en": "pharmacy",
     "ar": "صيدلية"
    },
    {
     "emoji": "🎤",
     "en": "microphone",
     "ar": "ميكروفون"
    }
   ],
   "say": "When PH and GH Say F. dolphin. alphabet. trophy. graph. laugh. cough. enough. photo. pharmacy. microphone."
  }
 },
 {
  "id": "lama-59",
  "order": 59,
  "levelId": "l2",
  "titleAr": "عبارات قصيرة مضحكة",
  "titleEn": "Funny Short Phrases",
  "content": {
   "explanationAr": "الحين نقرأ عبارات قصيرة من كلمات تعلمناها: a fox in a box و a bug on a rug.",
   "altExplanationAr": "اقرأ كل كلمة لحالها بعدين اقرأ العبارة كاملة بسرعة.",
   "example": [
    {
     "en": "a red bus",
     "ar": "باص أحمر"
    },
    {
     "en": "a big ship",
     "ar": "سفينة كبيرة"
    },
    {
     "en": "a hot cup",
     "ar": "كوب حار"
    }
   ],
   "check": {
    "promptAr": "وش معنى a red bus؟",
    "options": [
     "سمكة في صحن",
     "باص أحمر",
     "قطة على حصيرة"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "وش معنى a frog on a log؟",
     "options": [
      "سفينة كبيرة",
      "سمكة في صحن",
      "ضفدع على جذع"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "أي عبارة معناها «رجل في فان»؟",
     "options": [
      "a man in a van",
      "a hot cup",
      "a fox in a box"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي صورة تناسب عبارة a big ship؟",
     "options": [
      "🐟",
      "🚢",
      "🐱"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Funny Short Phrases"
   },
   {
    "kind": "highlight",
    "text": "Read 10 Short Phrases"
   },
   {
    "kind": "example",
    "en": "a red bus",
    "ar": "باص أحمر"
   },
   {
    "kind": "example",
    "en": "a big ship",
    "ar": "سفينة كبيرة"
   }
  ],
  "kids": {
   "listTitle": "Read 10 Short Phrases",
   "cards": [
    {
     "emoji": "🚌",
     "en": "a red bus",
     "ar": "باص أحمر"
    },
    {
     "emoji": "🚢",
     "en": "a big ship",
     "ar": "سفينة كبيرة"
    },
    {
     "emoji": "☕",
     "en": "a hot cup",
     "ar": "كوب حار"
    },
    {
     "emoji": "🖊️",
     "en": "ten pens",
     "ar": "عشرة أقلام"
    },
    {
     "emoji": "🐟",
     "en": "a fish in a dish",
     "ar": "سمكة في صحن"
    },
    {
     "emoji": "🦊",
     "en": "a fox in a box",
     "ar": "ثعلب في صندوق"
    },
    {
     "emoji": "🐛",
     "en": "a bug on a rug",
     "ar": "حشرة على سجادة"
    },
    {
     "emoji": "🐱",
     "en": "a cat on a mat",
     "ar": "قطة على حصيرة"
    },
    {
     "emoji": "🐸",
     "en": "a frog on a log",
     "ar": "ضفدع على جذع"
    },
    {
     "emoji": "🚐",
     "en": "a man in a van",
     "ar": "رجل في فان"
    }
   ],
   "say": "Read 10 Short Phrases. a red bus. a big ship. a hot cup. ten pens. a fish in a dish. a fox in a box. a bug on a rug. a cat on a mat. a frog on a log. a man in a van."
  }
 },
 {
  "id": "lama-60",
  "order": 60,
  "levelId": "l2",
  "titleAr": "مراجعة المستوى الثاني",
  "titleEn": "Level 2 Review",
  "content": {
   "explanationAr": "نراجع كلمات المستوى الثاني: العائلات، و wh و ck و qu، و e السحرية، و ai و oa و ee.",
   "altExplanationAr": "اقرأ الكلمة أول، بعدين اسمعها من لمى وقارن.",
   "example": [
    {
     "en": "rat",
     "ar": "فأر"
    },
    {
     "en": "twin",
     "ar": "توأم"
    },
    {
     "en": "fog",
     "ar": "ضباب"
    }
   ],
   "check": {
    "promptAr": "وش معنى rat؟",
    "options": [
     "فأر",
     "حوت",
     "زهر النرد"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "وش معنى twin؟",
     "options": [
      "توأم",
      "حوت",
      "زهر النرد"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "أي كلمة معناها «ضباب»؟",
     "options": [
      "chick",
      "fog",
      "coin"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "أي صورة تناسب كلمة mug؟",
     "options": [
      "📝",
      "🦒",
      "☕"
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
    "text": "Review: 10 Words"
   },
   {
    "kind": "example",
    "en": "rat",
    "ar": "فأر"
   },
   {
    "kind": "example",
    "en": "twin",
    "ar": "توأم"
   }
  ],
  "kids": {
   "listTitle": "Review: 10 Words",
   "cards": [
    {
     "emoji": "🐀",
     "en": "rat",
     "ar": "فأر"
    },
    {
     "emoji": "👯",
     "en": "twin",
     "ar": "توأم"
    },
    {
     "emoji": "🌫️",
     "en": "fog",
     "ar": "ضباب"
    },
    {
     "emoji": "☕",
     "en": "mug",
     "ar": "كوب كبير"
    },
    {
     "emoji": "🐋",
     "en": "whale",
     "ar": "حوت"
    },
    {
     "emoji": "🐤",
     "en": "chick",
     "ar": "كتكوت"
    },
    {
     "emoji": "📝",
     "en": "quiz",
     "ar": "اختبار قصير"
    },
    {
     "emoji": "🎲",
     "en": "dice",
     "ar": "زهر النرد"
    },
    {
     "emoji": "🪙",
     "en": "coin",
     "ar": "عملة معدنية"
    },
    {
     "emoji": "🦒",
     "en": "giraffe",
     "ar": "زرافة"
    }
   ],
   "say": "Review: 10 Words. rat. twin. fog. mug. whale. chick. quiz. dice. coin. giraffe."
  }
 },
 {
  "id": "lama-61",
  "order": 61,
  "levelId": "l3",
  "titleAr": "كلمة the وكلمة a",
  "titleEn": "The Words the and a",
  "content": {
   "explanationAr": "كلمة a معناها «واحد من أي شي»، وكلمة the نقولها لشي معروف. a cat يعني أي قطة، the cat يعني القطة اللي نعرفها.",
   "altExplanationAr": "قل a لأول مرة تذكر الشي، وبعدين قل the: I have a cat. The cat is white.",
   "example": [
    {
     "en": "I have a cat.",
     "ar": "عندي قطة."
    },
    {
     "en": "The cat is white.",
     "ar": "القطة بيضا."
    },
    {
     "en": "Mom made a cake.",
     "ar": "ماما سوت كيكة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I have ___ cat.",
    "options": [
     "a",
     "is",
     "on"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ cat is white.",
     "options": [
      "Is",
      "The",
      "In"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Mom made a cake.",
     "options": [
      "الكيكة على الطاولة.",
      "سكّر الباب لو سمحت.",
      "ماما سوت كيكة."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ cake is on the table.",
     "options": [
      "The",
      "It",
      "Is"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The Words the and a"
   },
   {
    "kind": "highlight",
    "text": "the · a"
   },
   {
    "kind": "example",
    "en": "I have a cat.",
    "ar": "عندي قطة."
   },
   {
    "kind": "example",
    "en": "The cat is white.",
    "ar": "القطة بيضا."
   }
  ],
  "kids": {
   "listTitle": "the · a",
   "cards": [
    {
     "emoji": "🐱",
     "en": "I have a cat.",
     "ar": "عندي قطة.",
     "hl": "a"
    },
    {
     "emoji": "🐈",
     "en": "The cat is white.",
     "ar": "القطة بيضا.",
     "hl": "The"
    },
    {
     "emoji": "🍰",
     "en": "Mom made a cake.",
     "ar": "ماما سوت كيكة.",
     "hl": "a"
    },
    {
     "emoji": "🍽️",
     "en": "The cake is on the table.",
     "ar": "الكيكة على الطاولة.",
     "hl": "The"
    },
    {
     "emoji": "🚪",
     "en": "Close the door, please.",
     "ar": "سكّر الباب لو سمحت.",
     "hl": "the"
    },
    {
     "emoji": "🍏",
     "en": "She has a green apple.",
     "ar": "عندها تفاحة خضرا.",
     "hl": "a"
    }
   ],
   "say": "the · a I have a cat. The cat is white. Mom made a cake. The cake is on the table. Close the door, please. She has a green apple."
  }
 },
 {
  "id": "lama-62",
  "order": 62,
  "levelId": "l3",
  "titleAr": "كلمة is وكلمة are",
  "titleEn": "The Words is and are",
  "content": {
   "explanationAr": "نستخدم is لشي واحد، و are لأكثر من شي. The bag is big. The bags are big.",
   "altExplanationAr": "واحد ← is، اثنين أو أكثر ← are.",
   "example": [
    {
     "en": "The bag is heavy.",
     "ar": "الشنطة ثقيلة."
    },
    {
     "en": "My shoes are new.",
     "ar": "جزمتي جديدة."
    },
    {
     "en": "It is sunny today.",
     "ar": "الجو مشمس اليوم."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "The bag ___ heavy.",
    "options": [
     "are",
     "is",
     "am"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "My shoes ___ new.",
     "options": [
      "is",
      "am",
      "are"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "It is sunny today.",
     "options": [
      "الجو مشمس اليوم.",
      "العصافير فوق الشجرة.",
      "ماما في البيت."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The birds ___ in the tree.",
     "options": [
      "is",
      "are",
      "am"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The Words is and are"
   },
   {
    "kind": "highlight",
    "text": "is · are"
   },
   {
    "kind": "example",
    "en": "The bag is heavy.",
    "ar": "الشنطة ثقيلة."
   },
   {
    "kind": "example",
    "en": "My shoes are new.",
    "ar": "جزمتي جديدة."
   }
  ],
  "kids": {
   "listTitle": "is · are",
   "cards": [
    {
     "emoji": "🎒",
     "en": "The bag is heavy.",
     "ar": "الشنطة ثقيلة.",
     "hl": "is"
    },
    {
     "emoji": "👟",
     "en": "My shoes are new.",
     "ar": "جزمتي جديدة.",
     "hl": "are"
    },
    {
     "emoji": "🌞",
     "en": "It is sunny today.",
     "ar": "الجو مشمس اليوم.",
     "hl": "is"
    },
    {
     "emoji": "🐦",
     "en": "The birds are in the tree.",
     "ar": "العصافير فوق الشجرة.",
     "hl": "are"
    },
    {
     "emoji": "🧕",
     "en": "Mom is at home.",
     "ar": "ماما في البيت.",
     "hl": "is"
    },
    {
     "emoji": "👦",
     "en": "The boys are happy.",
     "ar": "الأولاد مبسوطين.",
     "hl": "are"
    }
   ],
   "say": "is · are The bag is heavy. My shoes are new. It is sunny today. The birds are in the tree. Mom is at home. The boys are happy."
  }
 },
 {
  "id": "lama-63",
  "order": 63,
  "levelId": "l3",
  "titleAr": "كلمة I وكلمة you",
  "titleEn": "The Words I and you",
  "content": {
   "explanationAr": "I معناها «أنا» وتنكتب دايمًا كبيرة، و you معناها «أنت» أو «أنتي».",
   "altExplanationAr": "I am Lama. You are my friend.",
   "example": [
    {
     "en": "I am a student.",
     "ar": "أنا طالب."
    },
    {
     "en": "You are my friend.",
     "ar": "أنت صديقي."
    },
    {
     "en": "I eat watermelon.",
     "ar": "آكل بطيخ."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ am a student.",
    "options": [
     "You",
     "Me",
     "I"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ are my friend.",
     "options": [
      "You",
      "I",
      "Me"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I eat watermelon.",
     "options": [
      "ترسم زين.",
      "آكل بطيخ.",
      "أنام الساعة تسع."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ can draw well.",
     "options": [
      "Your",
      "Me",
      "You"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The Words I and you"
   },
   {
    "kind": "highlight",
    "text": "I · you"
   },
   {
    "kind": "example",
    "en": "I am a student.",
    "ar": "أنا طالب."
   },
   {
    "kind": "example",
    "en": "You are my friend.",
    "ar": "أنت صديقي."
   }
  ],
  "kids": {
   "listTitle": "I · you",
   "cards": [
    {
     "emoji": "🙋",
     "en": "I am a student.",
     "ar": "أنا طالب.",
     "hl": "I"
    },
    {
     "emoji": "🫵",
     "en": "You are my friend.",
     "ar": "أنت صديقي.",
     "hl": "You"
    },
    {
     "emoji": "🍉",
     "en": "I eat watermelon.",
     "ar": "آكل بطيخ.",
     "hl": "I"
    },
    {
     "emoji": "🎨",
     "en": "You can draw well.",
     "ar": "ترسم زين.",
     "hl": "You"
    },
    {
     "emoji": "💤",
     "en": "I sleep at nine.",
     "ar": "أنام الساعة تسع.",
     "hl": "I"
    },
    {
     "emoji": "🎁",
     "en": "This is for you.",
     "ar": "هذا لك.",
     "hl": "you"
    }
   ],
   "say": "I · you I am a student. You are my friend. I eat watermelon. You can draw well. I sleep at nine. This is for you."
  }
 },
 {
  "id": "lama-64",
  "order": 64,
  "levelId": "l3",
  "titleAr": "كلمة he وكلمة she",
  "titleEn": "The Words he and she",
  "content": {
   "explanationAr": "he معناها «هو» للولد أو الرجّال، و she معناها «هي» للبنت أو المرأة.",
   "altExplanationAr": "Ali: he. Sara: she.",
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
     "en": "He plays football.",
     "ar": "هو يلعب كورة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ is my brother.",
    "options": [
     "He",
     "She",
     "They"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ is my sister.",
     "options": [
      "He",
      "She",
      "We"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "He plays football.",
     "options": [
      "هي تقرأ قصة.",
      "هو كبير بالعمر مرة.",
      "هو يلعب كورة."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ reads a story.",
     "options": [
      "She",
      "He",
      "I"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The Words he and she"
   },
   {
    "kind": "highlight",
    "text": "he · she"
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
   "listTitle": "he · she",
   "cards": [
    {
     "emoji": "👦",
     "en": "He is my brother.",
     "ar": "هو أخوي.",
     "hl": "He"
    },
    {
     "emoji": "👧",
     "en": "She is my sister.",
     "ar": "هي أختي.",
     "hl": "She"
    },
    {
     "emoji": "⚽",
     "en": "He plays football.",
     "ar": "هو يلعب كورة.",
     "hl": "He"
    },
    {
     "emoji": "📖",
     "en": "She reads a story.",
     "ar": "هي تقرأ قصة.",
     "hl": "She"
    },
    {
     "emoji": "👴",
     "en": "He is very old.",
     "ar": "هو كبير بالعمر مرة.",
     "hl": "He"
    },
    {
     "emoji": "👩‍🍳",
     "en": "She cooks rice.",
     "ar": "هي تطبخ رز.",
     "hl": "She"
    }
   ],
   "say": "he · she He is my brother. She is my sister. He plays football. She reads a story. He is very old. She cooks rice."
  }
 },
 {
  "id": "lama-65",
  "order": 65,
  "levelId": "l3",
  "titleAr": "كلمة we وكلمة they",
  "titleEn": "The Words we and they",
  "content": {
   "explanationAr": "we معناها «نحن»، و they معناها «هم» أو «هن».",
   "altExplanationAr": "Me and my friend: we. Ali and Sara: they.",
   "example": [
    {
     "en": "We are a family.",
     "ar": "نحن عائلة."
    },
    {
     "en": "We go to school.",
     "ar": "نروح المدرسة."
    },
    {
     "en": "They are kids.",
     "ar": "هم أطفال."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ are a family.",
    "options": [
     "They",
     "We",
     "He"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ go to school.",
     "options": [
      "They",
      "She",
      "We"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "They are kids.",
     "options": [
      "هم أطفال.",
      "هم يركضون بسرعة.",
      "نشوف فيلم."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ run fast.",
     "options": [
      "We",
      "They",
      "She"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The Words we and they"
   },
   {
    "kind": "highlight",
    "text": "we · they"
   },
   {
    "kind": "example",
    "en": "We are a family.",
    "ar": "نحن عائلة."
   },
   {
    "kind": "example",
    "en": "We go to school.",
    "ar": "نروح المدرسة."
   }
  ],
  "kids": {
   "listTitle": "we · they",
   "cards": [
    {
     "emoji": "👨‍👩‍👧",
     "en": "We are a family.",
     "ar": "نحن عائلة.",
     "hl": "We"
    },
    {
     "emoji": "🏫",
     "en": "We go to school.",
     "ar": "نروح المدرسة.",
     "hl": "We"
    },
    {
     "emoji": "🧒",
     "en": "They are kids.",
     "ar": "هم أطفال.",
     "hl": "They"
    },
    {
     "emoji": "🏃",
     "en": "They run fast.",
     "ar": "هم يركضون بسرعة.",
     "hl": "They"
    },
    {
     "emoji": "🍿",
     "en": "We watch a film.",
     "ar": "نشوف فيلم.",
     "hl": "We"
    },
    {
     "emoji": "🛝",
     "en": "They play in the park.",
     "ar": "يلعبون في الحديقة.",
     "hl": "They"
    }
   ],
   "say": "we · they We are a family. We go to school. They are kids. They run fast. We watch a film. They play in the park."
  }
 },
 {
  "id": "lama-66",
  "order": 66,
  "levelId": "l3",
  "titleAr": "كلمة it وكلمة this",
  "titleEn": "The Words it and this",
  "content": {
   "explanationAr": "it معناها «هو أو هي» للأشياء والحيوانات، و this معناها «هذا» أو «هذي».",
   "altExplanationAr": "This is a ball. It is red.",
   "example": [
    {
     "en": "This is my ball.",
     "ar": "هذي كورتي."
    },
    {
     "en": "It is red.",
     "ar": "لونها أحمر."
    },
    {
     "en": "This dog is small.",
     "ar": "هذا الكلب صغير."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ is my ball.",
    "options": [
     "It",
     "He",
     "This"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ is red.",
     "options": [
      "It",
      "This",
      "She"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "This dog is small.",
     "options": [
      "يحب العظام.",
      "هذا الكلب صغير.",
      "هذا بيتنا."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ likes bones.",
     "options": [
      "This",
      "She",
      "It"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The Words it and this"
   },
   {
    "kind": "highlight",
    "text": "it · this"
   },
   {
    "kind": "example",
    "en": "This is my ball.",
    "ar": "هذي كورتي."
   },
   {
    "kind": "example",
    "en": "It is red.",
    "ar": "لونها أحمر."
   }
  ],
  "kids": {
   "listTitle": "it · this",
   "cards": [
    {
     "emoji": "⚽",
     "en": "This is my ball.",
     "ar": "هذي كورتي.",
     "hl": "This"
    },
    {
     "emoji": "🔴",
     "en": "It is red.",
     "ar": "لونها أحمر.",
     "hl": "It"
    },
    {
     "emoji": "🐕",
     "en": "This dog is small.",
     "ar": "هذا الكلب صغير.",
     "hl": "This"
    },
    {
     "emoji": "🦴",
     "en": "It likes bones.",
     "ar": "يحب العظام.",
     "hl": "It"
    },
    {
     "emoji": "🏠",
     "en": "This is our house.",
     "ar": "هذا بيتنا.",
     "hl": "This"
    },
    {
     "emoji": "🌧️",
     "en": "It is cold today.",
     "ar": "الجو بارد اليوم.",
     "hl": "It"
    }
   ],
   "say": "it · this This is my ball. It is red. This dog is small. It likes bones. This is our house. It is cold today."
  }
 },
 {
  "id": "lama-67",
  "order": 67,
  "levelId": "l3",
  "titleAr": "كلمة and وكلمة but",
  "titleEn": "The Words and and but",
  "content": {
   "explanationAr": "and معناها «و» تجمع شيئين، و but معناها «لكن» تجيب شي مختلف.",
   "altExplanationAr": "I like tea and milk. I like tea, but not coffee.",
   "example": [
    {
     "en": "I want bread and cheese.",
     "ar": "أبي خبز وجبن."
    },
    {
     "en": "I have a cat and a dog.",
     "ar": "عندي قطة وكلب."
    },
    {
     "en": "I like tea, but not coffee.",
     "ar": "أحب الشاي، لكن مو القهوة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I want bread ___ cheese.",
    "options": [
     "and",
     "but",
     "or"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I have a cat ___ a dog.",
     "options": [
      "but",
      "and",
      "so"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I like tea, but not coffee.",
     "options": [
      "الجو بارد، لكن مشمس.",
      "البس جواربك وجزمتك.",
      "أحب الشاي، لكن مو القهوة."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "It is cold, ___ it is sunny.",
     "options": [
      "but",
      "and",
      "or"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The Words and and but"
   },
   {
    "kind": "highlight",
    "text": "and · but"
   },
   {
    "kind": "example",
    "en": "I want bread and cheese.",
    "ar": "أبي خبز وجبن."
   },
   {
    "kind": "example",
    "en": "I have a cat and a dog.",
    "ar": "عندي قطة وكلب."
   }
  ],
  "kids": {
   "listTitle": "and · but",
   "cards": [
    {
     "emoji": "🍞",
     "en": "I want bread and cheese.",
     "ar": "أبي خبز وجبن.",
     "hl": "and"
    },
    {
     "emoji": "🐱",
     "en": "I have a cat and a dog.",
     "ar": "عندي قطة وكلب.",
     "hl": "and"
    },
    {
     "emoji": "☕",
     "en": "I like tea, but not coffee.",
     "ar": "أحب الشاي، لكن مو القهوة.",
     "hl": "but"
    },
    {
     "emoji": "🌧️",
     "en": "It is cold, but it is sunny.",
     "ar": "الجو بارد، لكن مشمس.",
     "hl": "but"
    },
    {
     "emoji": "🧦",
     "en": "Put on your socks and shoes.",
     "ar": "البس جواربك وجزمتك.",
     "hl": "and"
    },
    {
     "emoji": "🥱",
     "en": "He is tired, but happy.",
     "ar": "هو تعبان، لكن مبسوط.",
     "hl": "but"
    }
   ],
   "say": "and · but I want bread and cheese. I have a cat and a dog. I like tea, but not coffee. It is cold, but it is sunny. Put on your socks and shoes. He is tired, but happy."
  }
 },
 {
  "id": "lama-68",
  "order": 68,
  "levelId": "l3",
  "titleAr": "كلمة in وكلمة on",
  "titleEn": "The Words in and on",
  "content": {
   "explanationAr": "in معناها «داخل»، و on معناها «فوق» أو «على».",
   "altExplanationAr": "The pen is in the bag. The bag is on the chair.",
   "example": [
    {
     "en": "The pen is in the bag.",
     "ar": "القلم داخل الشنطة."
    },
    {
     "en": "The bag is on the chair.",
     "ar": "الشنطة على الكرسي."
    },
    {
     "en": "The fish is in the water.",
     "ar": "السمكة في الماي."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "The pen is ___ the bag.",
    "options": [
     "on",
     "in",
     "at"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The bag is ___ the chair.",
     "options": [
      "in",
      "at",
      "on"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "The fish is in the water.",
     "options": [
      "السمكة في الماي.",
      "الكاب على راسه.",
      "الحليب في الثلاجة."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The cap is ___ his head.",
     "options": [
      "in",
      "on",
      "at"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The Words in and on"
   },
   {
    "kind": "highlight",
    "text": "in · on"
   },
   {
    "kind": "example",
    "en": "The pen is in the bag.",
    "ar": "القلم داخل الشنطة."
   },
   {
    "kind": "example",
    "en": "The bag is on the chair.",
    "ar": "الشنطة على الكرسي."
   }
  ],
  "kids": {
   "listTitle": "in · on",
   "cards": [
    {
     "emoji": "🖊️",
     "en": "The pen is in the bag.",
     "ar": "القلم داخل الشنطة.",
     "hl": "in"
    },
    {
     "emoji": "🪑",
     "en": "The bag is on the chair.",
     "ar": "الشنطة على الكرسي.",
     "hl": "on"
    },
    {
     "emoji": "🐟",
     "en": "The fish is in the water.",
     "ar": "السمكة في الماي.",
     "hl": "in"
    },
    {
     "emoji": "🧢",
     "en": "The cap is on his head.",
     "ar": "الكاب على راسه.",
     "hl": "on"
    },
    {
     "emoji": "🥛",
     "en": "The milk is in the fridge.",
     "ar": "الحليب في الثلاجة.",
     "hl": "in"
    },
    {
     "emoji": "📕",
     "en": "The book is on the desk.",
     "ar": "الكتاب على المكتب.",
     "hl": "on"
    }
   ],
   "say": "in · on The pen is in the bag. The bag is on the chair. The fish is in the water. The cap is on his head. The milk is in the fridge. The book is on the desk."
  }
 },
 {
  "id": "lama-69",
  "order": 69,
  "levelId": "l3",
  "titleAr": "كلمة to وكلمة from",
  "titleEn": "The Words to and from",
  "content": {
   "explanationAr": "to معناها «إلى»، و from معناها «من».",
   "altExplanationAr": "I go to school. I come back from school.",
   "example": [
    {
     "en": "I walk to school.",
     "ar": "أمشي للمدرسة."
    },
    {
     "en": "This letter is from Grandma.",
     "ar": "هذي الرسالة من جدتي."
    },
    {
     "en": "We go to the mosque.",
     "ar": "نروح للمسجد."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I walk ___ school.",
    "options": [
     "from",
     "on",
     "to"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "This letter is ___ Grandma.",
     "options": [
      "from",
      "to",
      "on"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "We go to the mosque.",
     "options": [
      "بابا رجع من رحلته.",
      "نروح للمسجد.",
      "هدية من صديقي."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Dad is back ___ his trip.",
     "options": [
      "to",
      "on",
      "from"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The Words to and from"
   },
   {
    "kind": "highlight",
    "text": "to · from"
   },
   {
    "kind": "example",
    "en": "I walk to school.",
    "ar": "أمشي للمدرسة."
   },
   {
    "kind": "example",
    "en": "This letter is from Grandma.",
    "ar": "هذي الرسالة من جدتي."
   }
  ],
  "kids": {
   "listTitle": "to · from",
   "cards": [
    {
     "emoji": "🏫",
     "en": "I walk to school.",
     "ar": "أمشي للمدرسة.",
     "hl": "to"
    },
    {
     "emoji": "✉️",
     "en": "This letter is from Grandma.",
     "ar": "هذي الرسالة من جدتي.",
     "hl": "from"
    },
    {
     "emoji": "🕌",
     "en": "We go to the mosque.",
     "ar": "نروح للمسجد.",
     "hl": "to"
    },
    {
     "emoji": "🛫",
     "en": "Dad is back from his trip.",
     "ar": "بابا رجع من رحلته.",
     "hl": "from"
    },
    {
     "emoji": "🎁",
     "en": "A gift from my friend.",
     "ar": "هدية من صديقي.",
     "hl": "from"
    },
    {
     "emoji": "🏖️",
     "en": "We drive to the beach.",
     "ar": "نروح للبحر بالسيارة.",
     "hl": "to"
    }
   ],
   "say": "to · from I walk to school. This letter is from Grandma. We go to the mosque. Dad is back from his trip. A gift from my friend. We drive to the beach."
  }
 },
 {
  "id": "lama-70",
  "order": 70,
  "levelId": "l3",
  "titleAr": "كلمة can وكلمة can't",
  "titleEn": "The Words can and can't",
  "content": {
   "explanationAr": "can معناها «يقدر»، و can't معناها «ما يقدر».",
   "altExplanationAr": "A bird can fly. A fish can't fly.",
   "example": [
    {
     "en": "A bird can fly.",
     "ar": "الطير يقدر يطير."
    },
    {
     "en": "A fish can't walk.",
     "ar": "السمكة ما تقدر تمشي."
    },
    {
     "en": "I can swim.",
     "ar": "أقدر أسبح."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "A bird ___ fly.",
    "options": [
     "can",
     "can't",
     "is"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "A fish ___ walk.",
     "options": [
      "can",
      "can't",
      "is"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I can swim.",
     "options": [
      "البيبي ما يقدر يقرأ.",
      "القرد يقدر يتسلق.",
      "أقدر أسبح."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The baby ___ read.",
     "options": [
      "can't",
      "can",
      "is"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The Words can and can't"
   },
   {
    "kind": "highlight",
    "text": "can · can't"
   },
   {
    "kind": "example",
    "en": "A bird can fly.",
    "ar": "الطير يقدر يطير."
   },
   {
    "kind": "example",
    "en": "A fish can't walk.",
    "ar": "السمكة ما تقدر تمشي."
   }
  ],
  "kids": {
   "listTitle": "can · can't",
   "cards": [
    {
     "emoji": "🐦",
     "en": "A bird can fly.",
     "ar": "الطير يقدر يطير.",
     "hl": "can"
    },
    {
     "emoji": "🐟",
     "en": "A fish can't walk.",
     "ar": "السمكة ما تقدر تمشي.",
     "hl": "can't"
    },
    {
     "emoji": "🏊",
     "en": "I can swim.",
     "ar": "أقدر أسبح.",
     "hl": "can"
    },
    {
     "emoji": "👶",
     "en": "The baby can't read.",
     "ar": "البيبي ما يقدر يقرأ.",
     "hl": "can't"
    },
    {
     "emoji": "🐒",
     "en": "A monkey can climb.",
     "ar": "القرد يقدر يتسلق.",
     "hl": "can"
    },
    {
     "emoji": "🐢",
     "en": "A turtle can't run fast.",
     "ar": "السلحفاة ما تقدر تركض بسرعة.",
     "hl": "can't"
    }
   ],
   "say": "can · can't A bird can fly. A fish can't walk. I can swim. The baby can't read. A monkey can climb. A turtle can't run fast."
  }
 },
 {
  "id": "lama-71",
  "order": 71,
  "levelId": "l3",
  "titleAr": "كلمة have وكلمة has",
  "titleEn": "The Words have and has",
  "content": {
   "explanationAr": "نقول I have و you have و we have و they have، لكن he has و she has و it has.",
   "altExplanationAr": "I have a pen. She has a pen.",
   "example": [
    {
     "en": "I have a pencil.",
     "ar": "عندي قلم رصاص."
    },
    {
     "en": "She has a notebook.",
     "ar": "عندها دفتر."
    },
    {
     "en": "We have a puppy.",
     "ar": "عندنا جرو."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ a pencil.",
    "options": [
     "has",
     "have",
     "is"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She ___ a notebook.",
     "options": [
      "have",
      "are",
      "has"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "We have a puppy.",
     "options": [
      "عندنا جرو.",
      "له رقبة طويلة.",
      "عندهم دراجات جديدة."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "It ___ a long neck.",
     "options": [
      "have",
      "has",
      "are"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The Words have and has"
   },
   {
    "kind": "highlight",
    "text": "have · has"
   },
   {
    "kind": "example",
    "en": "I have a pencil.",
    "ar": "عندي قلم رصاص."
   },
   {
    "kind": "example",
    "en": "She has a notebook.",
    "ar": "عندها دفتر."
   }
  ],
  "kids": {
   "listTitle": "have · has",
   "cards": [
    {
     "emoji": "✏️",
     "en": "I have a pencil.",
     "ar": "عندي قلم رصاص.",
     "hl": "have"
    },
    {
     "emoji": "📒",
     "en": "She has a notebook.",
     "ar": "عندها دفتر.",
     "hl": "has"
    },
    {
     "emoji": "🐶",
     "en": "We have a puppy.",
     "ar": "عندنا جرو.",
     "hl": "have"
    },
    {
     "emoji": "🦒",
     "en": "It has a long neck.",
     "ar": "له رقبة طويلة.",
     "hl": "has"
    },
    {
     "emoji": "🚲",
     "en": "They have new bikes.",
     "ar": "عندهم دراجات جديدة.",
     "hl": "have"
    },
    {
     "emoji": "👓",
     "en": "He has glasses.",
     "ar": "عنده نظارة.",
     "hl": "has"
    }
   ],
   "say": "have · has I have a pencil. She has a notebook. We have a puppy. It has a long neck. They have new bikes. He has glasses."
  }
 },
 {
  "id": "lama-72",
  "order": 72,
  "levelId": "l3",
  "titleAr": "كلمة like وكلمة want",
  "titleEn": "The Words like and want",
  "content": {
   "explanationAr": "like معناها «أحب»، و want معناها «أبي».",
   "altExplanationAr": "I like apples. I want an apple now.",
   "example": [
    {
     "en": "I like strawberries.",
     "ar": "أحب الفراولة."
    },
    {
     "en": "I want ice cream.",
     "ar": "أبي آيس كريم."
    },
    {
     "en": "She likes pandas.",
     "ar": "هي تحب الباندا."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ strawberries.",
    "options": [
     "want",
     "is",
     "like"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I ___ ice cream.",
     "options": [
      "want",
      "like",
      "am"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "She likes pandas.",
     "options": [
      "يبي شوية ماي.",
      "هي تحب الباندا.",
      "نحب البالونات."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He ___ some water.",
     "options": [
      "likes",
      "is",
      "wants"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The Words like and want"
   },
   {
    "kind": "highlight",
    "text": "like · want"
   },
   {
    "kind": "example",
    "en": "I like strawberries.",
    "ar": "أحب الفراولة."
   },
   {
    "kind": "example",
    "en": "I want ice cream.",
    "ar": "أبي آيس كريم."
   }
  ],
  "kids": {
   "listTitle": "like · want",
   "cards": [
    {
     "emoji": "🍓",
     "en": "I like strawberries.",
     "ar": "أحب الفراولة.",
     "hl": "like"
    },
    {
     "emoji": "🍦",
     "en": "I want ice cream.",
     "ar": "أبي آيس كريم.",
     "hl": "want"
    },
    {
     "emoji": "🐼",
     "en": "She likes pandas.",
     "ar": "هي تحب الباندا.",
     "hl": "likes"
    },
    {
     "emoji": "🥤",
     "en": "He wants some water.",
     "ar": "يبي شوية ماي.",
     "hl": "wants"
    },
    {
     "emoji": "🎈",
     "en": "We like balloons.",
     "ar": "نحب البالونات.",
     "hl": "like"
    },
    {
     "emoji": "🧸",
     "en": "The baby wants her teddy.",
     "ar": "البيبي تبي دبدوبها.",
     "hl": "wants"
    }
   ],
   "say": "like · want I like strawberries. I want ice cream. She likes pandas. He wants some water. We like balloons. The baby wants her teddy."
  }
 },
 {
  "id": "lama-73",
  "order": 73,
  "levelId": "l3",
  "titleAr": "كلمة see وكلمة look",
  "titleEn": "The Words see and look",
  "content": {
   "explanationAr": "see معناها «أشوف»، و look معناها «انظر» أو «طالع». نقول look at.",
   "altExplanationAr": "Look at the sky! I see a plane.",
   "example": [
    {
     "en": "I see a plane.",
     "ar": "أشوف طيارة."
    },
    {
     "en": "Look at the rainbow!",
     "ar": "طالع قوس قزح!"
    },
    {
     "en": "Can you see the butterfly?",
     "ar": "تشوف الفراشة؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ a plane.",
    "options": [
     "see",
     "look",
     "am"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ at the rainbow!",
     "options": [
      "See",
      "Look",
      "Is"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Can you see the butterfly?",
     "options": [
      "طالع هالصورة.",
      "نشوف القمر بالليل.",
      "تشوف الفراشة؟"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ at this photo.",
     "options": [
      "Look",
      "See",
      "Is"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The Words see and look"
   },
   {
    "kind": "highlight",
    "text": "see · look"
   },
   {
    "kind": "example",
    "en": "I see a plane.",
    "ar": "أشوف طيارة."
   },
   {
    "kind": "example",
    "en": "Look at the rainbow!",
    "ar": "طالع قوس قزح!"
   }
  ],
  "kids": {
   "listTitle": "see · look",
   "cards": [
    {
     "emoji": "✈️",
     "en": "I see a plane.",
     "ar": "أشوف طيارة.",
     "hl": "see"
    },
    {
     "emoji": "🌈",
     "en": "Look at the rainbow!",
     "ar": "طالع قوس قزح!",
     "hl": "Look"
    },
    {
     "emoji": "🦋",
     "en": "Can you see the butterfly?",
     "ar": "تشوف الفراشة؟",
     "hl": "see"
    },
    {
     "emoji": "📷",
     "en": "Look at this photo.",
     "ar": "طالع هالصورة.",
     "hl": "Look"
    },
    {
     "emoji": "🌙",
     "en": "We see the moon at night.",
     "ar": "نشوف القمر بالليل.",
     "hl": "see"
    },
    {
     "emoji": "🐒",
     "en": "Look at that monkey!",
     "ar": "طالع هذاك القرد!",
     "hl": "Look"
    }
   ],
   "say": "see · look I see a plane. Look at the rainbow! Can you see the butterfly? Look at this photo. We see the moon at night. Look at that monkey!"
  }
 },
 {
  "id": "lama-74",
  "order": 74,
  "levelId": "l3",
  "titleAr": "كلمة go وكلمة come",
  "titleEn": "The Words go and come",
  "content": {
   "explanationAr": "go معناها «أروح» و come معناها «تعال» أو «أجي».",
   "altExplanationAr": "Come here! Let's go home.",
   "example": [
    {
     "en": "Let's go home.",
     "ar": "يلا نروح البيت."
    },
    {
     "en": "Come here, please.",
     "ar": "تعال هنا لو سمحت."
    },
    {
     "en": "We go to the shop.",
     "ar": "نروح المحل."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Let's ___ home.",
    "options": [
     "come",
     "go",
     "is"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ here, please.",
     "options": [
      "Go",
      "Is",
      "Come"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "We go to the shop.",
     "options": [
      "نروح المحل.",
      "تعال حفلتي!",
      "أروح أنام بدري."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ to my party!",
     "options": [
      "Go",
      "Come",
      "Is"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The Words go and come"
   },
   {
    "kind": "highlight",
    "text": "go · come"
   },
   {
    "kind": "example",
    "en": "Let's go home.",
    "ar": "يلا نروح البيت."
   },
   {
    "kind": "example",
    "en": "Come here, please.",
    "ar": "تعال هنا لو سمحت."
   }
  ],
  "kids": {
   "listTitle": "go · come",
   "cards": [
    {
     "emoji": "🏡",
     "en": "Let's go home.",
     "ar": "يلا نروح البيت.",
     "hl": "go"
    },
    {
     "emoji": "🤗",
     "en": "Come here, please.",
     "ar": "تعال هنا لو سمحت.",
     "hl": "Come"
    },
    {
     "emoji": "🛒",
     "en": "We go to the shop.",
     "ar": "نروح المحل.",
     "hl": "go"
    },
    {
     "emoji": "🎉",
     "en": "Come to my party!",
     "ar": "تعال حفلتي!",
     "hl": "Come"
    },
    {
     "emoji": "🛌",
     "en": "I go to bed early.",
     "ar": "أروح أنام بدري.",
     "hl": "go"
    },
    {
     "emoji": "👵",
     "en": "Grandma comes on Friday.",
     "ar": "جدتي تجي يوم الجمعة.",
     "hl": "comes"
    }
   ],
   "say": "go · come Let's go home. Come here, please. We go to the shop. Come to my party! I go to bed early. Grandma comes on Friday."
  }
 },
 {
  "id": "lama-75",
  "order": 75,
  "levelId": "l3",
  "titleAr": "كلمة my وكلمة your",
  "titleEn": "The Words my and your",
  "content": {
   "explanationAr": "my معناها «حقي» أو «ـي»، و your معناها «حقك» أو «ـك».",
   "altExplanationAr": "my bag: شنطتي. your bag: شنطتك.",
   "example": [
    {
     "en": "This is my bag.",
     "ar": "هذي شنطتي."
    },
    {
     "en": "Is this your coat?",
     "ar": "هذا معطفك؟"
    },
    {
     "en": "Brush your teeth.",
     "ar": "نظّف أسنانك."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "This is ___ bag.",
    "options": [
     "your",
     "I",
     "my"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Is this ___ coat?",
     "options": [
      "your",
      "my",
      "you"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Brush your teeth.",
     "options": [
      "غرفتي نظيفة.",
      "نظّف أسنانك.",
      "اغسل يدينك."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ room is clean.",
     "options": [
      "Your",
      "I",
      "My"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The Words my and your"
   },
   {
    "kind": "highlight",
    "text": "my · your"
   },
   {
    "kind": "example",
    "en": "This is my bag.",
    "ar": "هذي شنطتي."
   },
   {
    "kind": "example",
    "en": "Is this your coat?",
    "ar": "هذا معطفك؟"
   }
  ],
  "kids": {
   "listTitle": "my · your",
   "cards": [
    {
     "emoji": "🎒",
     "en": "This is my bag.",
     "ar": "هذي شنطتي.",
     "hl": "my"
    },
    {
     "emoji": "🧥",
     "en": "Is this your coat?",
     "ar": "هذا معطفك؟",
     "hl": "your"
    },
    {
     "emoji": "🪥",
     "en": "Brush your teeth.",
     "ar": "نظّف أسنانك.",
     "hl": "your"
    },
    {
     "emoji": "🛏️",
     "en": "My room is clean.",
     "ar": "غرفتي نظيفة.",
     "hl": "My"
    },
    {
     "emoji": "✋",
     "en": "Wash your hands.",
     "ar": "اغسل يدينك.",
     "hl": "your"
    },
    {
     "emoji": "🐠",
     "en": "My fish is orange.",
     "ar": "سمكتي برتقالية.",
     "hl": "My"
    }
   ],
   "say": "my · your This is my bag. Is this your coat? Brush your teeth. My room is clean. Wash your hands. My fish is orange."
  }
 },
 {
  "id": "lama-76",
  "order": 76,
  "levelId": "l3",
  "titleAr": "كلمة his وكلمة her",
  "titleEn": "The Words his and her",
  "content": {
   "explanationAr": "his معناها «حقه» للولد، و her معناها «حقها» للبنت.",
   "altExplanationAr": "Ali has a bike. It is his bike. Sara has a doll. It is her doll.",
   "example": [
    {
     "en": "Ali rides his bike.",
     "ar": "علي يركب دراجته."
    },
    {
     "en": "Sara plays with her doll.",
     "ar": "سارة تلعب بدميتها."
    },
    {
     "en": "His cap is blue.",
     "ar": "كابه أزرق."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Ali rides ___ bike.",
    "options": [
     "his",
     "her",
     "he"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Sara plays with ___ doll.",
     "options": [
      "his",
      "her",
      "she"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "His cap is blue.",
     "options": [
      "شنطتها وردية.",
      "ما لقى جزمته.",
      "كابه أزرق."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ bag is pink.",
     "options": [
      "Her",
      "His",
      "She"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The Words his and her"
   },
   {
    "kind": "highlight",
    "text": "his · her"
   },
   {
    "kind": "example",
    "en": "Ali rides his bike.",
    "ar": "علي يركب دراجته."
   },
   {
    "kind": "example",
    "en": "Sara plays with her doll.",
    "ar": "سارة تلعب بدميتها."
   }
  ],
  "kids": {
   "listTitle": "his · her",
   "cards": [
    {
     "emoji": "🚲",
     "en": "Ali rides his bike.",
     "ar": "علي يركب دراجته.",
     "hl": "his"
    },
    {
     "emoji": "🪆",
     "en": "Sara plays with her doll.",
     "ar": "سارة تلعب بدميتها.",
     "hl": "her"
    },
    {
     "emoji": "🧢",
     "en": "His cap is blue.",
     "ar": "كابه أزرق.",
     "hl": "His"
    },
    {
     "emoji": "👜",
     "en": "Her bag is pink.",
     "ar": "شنطتها وردية.",
     "hl": "Her"
    },
    {
     "emoji": "👞",
     "en": "He can't find his shoe.",
     "ar": "ما لقى جزمته.",
     "hl": "his"
    },
    {
     "emoji": "🧣",
     "en": "She likes her new scarf.",
     "ar": "تحب شالها الجديد.",
     "hl": "her"
    }
   ],
   "say": "his · her Ali rides his bike. Sara plays with her doll. His cap is blue. Her bag is pink. He can't find his shoe. She likes her new scarf."
  }
 },
 {
  "id": "lama-77",
  "order": 77,
  "levelId": "l3",
  "titleAr": "كلمة here وكلمة there",
  "titleEn": "The Words here and there",
  "content": {
   "explanationAr": "here معناها «هنا» قريب منك، و there معناها «هناك» بعيد.",
   "altExplanationAr": "Sit here. Look over there.",
   "example": [
    {
     "en": "Sit here, please.",
     "ar": "اجلس هنا لو سمحت."
    },
    {
     "en": "Look at the mountain over there.",
     "ar": "طالع الجبل هناك."
    },
    {
     "en": "I am here.",
     "ar": "أنا هنا."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Sit ___, please.",
    "options": [
     "there",
     "here",
     "her"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Look at the mountain over ___.",
     "options": [
      "here",
      "they",
      "there"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I am here.",
     "options": [
      "أنا هنا.",
      "كورتك هناك.",
      "تعال واجلس هنا."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Your ball is over ___.",
     "options": [
      "here",
      "there",
      "they"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The Words here and there"
   },
   {
    "kind": "highlight",
    "text": "here · there"
   },
   {
    "kind": "example",
    "en": "Sit here, please.",
    "ar": "اجلس هنا لو سمحت."
   },
   {
    "kind": "example",
    "en": "Look at the mountain over there.",
    "ar": "طالع الجبل هناك."
   }
  ],
  "kids": {
   "listTitle": "here · there",
   "cards": [
    {
     "emoji": "🪑",
     "en": "Sit here, please.",
     "ar": "اجلس هنا لو سمحت.",
     "hl": "here"
    },
    {
     "emoji": "🏔️",
     "en": "Look at the mountain over there.",
     "ar": "طالع الجبل هناك.",
     "hl": "there"
    },
    {
     "emoji": "📍",
     "en": "I am here.",
     "ar": "أنا هنا.",
     "hl": "here"
    },
    {
     "emoji": "🌳",
     "en": "Your ball is over there.",
     "ar": "كورتك هناك.",
     "hl": "there"
    },
    {
     "emoji": "🙋‍♀️",
     "en": "Come and sit here.",
     "ar": "تعال واجلس هنا.",
     "hl": "here"
    },
    {
     "emoji": "🚏",
     "en": "The bus stop is there.",
     "ar": "موقف الباص هناك.",
     "hl": "there"
    }
   ],
   "say": "here · there Sit here, please. Look at the mountain over there. I am here. Your ball is over there. Come and sit here. The bus stop is there."
  }
 },
 {
  "id": "lama-78",
  "order": 78,
  "levelId": "l3",
  "titleAr": "كلمة up وكلمة down",
  "titleEn": "The Words up and down",
  "content": {
   "explanationAr": "up معناها «فوق» و down معناها «تحت».",
   "altExplanationAr": "Stand up. Sit down.",
   "example": [
    {
     "en": "Stand up, please.",
     "ar": "قوم لو سمحت."
    },
    {
     "en": "Sit down, please.",
     "ar": "اجلس لو سمحت."
    },
    {
     "en": "The balloon goes up.",
     "ar": "البالون يطلع فوق."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Stand ___, please.",
    "options": [
     "down",
     "on",
     "up"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Sit ___, please.",
     "options": [
      "down",
      "up",
      "in"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "The balloon goes up.",
     "options": [
      "الأوراق تطيح تحت.",
      "البالون يطلع فوق.",
      "يطلع فوق السلم."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The leaves fall ___.",
     "options": [
      "up",
      "on",
      "down"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The Words up and down"
   },
   {
    "kind": "highlight",
    "text": "up · down"
   },
   {
    "kind": "example",
    "en": "Stand up, please.",
    "ar": "قوم لو سمحت."
   },
   {
    "kind": "example",
    "en": "Sit down, please.",
    "ar": "اجلس لو سمحت."
   }
  ],
  "kids": {
   "listTitle": "up · down",
   "cards": [
    {
     "emoji": "🧍",
     "en": "Stand up, please.",
     "ar": "قوم لو سمحت.",
     "hl": "up"
    },
    {
     "emoji": "🪑",
     "en": "Sit down, please.",
     "ar": "اجلس لو سمحت.",
     "hl": "down"
    },
    {
     "emoji": "🎈",
     "en": "The balloon goes up.",
     "ar": "البالون يطلع فوق.",
     "hl": "up"
    },
    {
     "emoji": "🍂",
     "en": "The leaves fall down.",
     "ar": "الأوراق تطيح تحت.",
     "hl": "down"
    },
    {
     "emoji": "🪜",
     "en": "He climbs up the ladder.",
     "ar": "يطلع فوق السلم.",
     "hl": "up"
    },
    {
     "emoji": "🛗",
     "en": "We go down in the lift.",
     "ar": "ننزل تحت بالأصنصير.",
     "hl": "down"
    }
   ],
   "say": "up · down Stand up, please. Sit down, please. The balloon goes up. The leaves fall down. He climbs up the ladder. We go down in the lift."
  }
 },
 {
  "id": "lama-79",
  "order": 79,
  "levelId": "l3",
  "titleAr": "كلمة big وكلمة little",
  "titleEn": "The Words big and little",
  "content": {
   "explanationAr": "big معناها «كبير»، و little معناها «صغير».",
   "altExplanationAr": "A big dog and a little dog.",
   "example": [
    {
     "en": "An elephant is big.",
     "ar": "الفيل كبير."
    },
    {
     "en": "A mouse is little.",
     "ar": "الفار صغير."
    },
    {
     "en": "We live in a big building.",
     "ar": "نعيش في عمارة كبيرة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "An elephant is ___.",
    "options": [
     "big",
     "little",
     "bag"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "A mouse is ___.",
     "options": [
      "big",
      "little",
      "light"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "We live in a big building.",
     "options": [
      "أشوف كتكوت صغير.",
      "هالبطيخة كبيرة.",
      "نعيش في عمارة كبيرة."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I see a ___ chick.",
     "options": [
      "little",
      "big",
      "light"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The Words big and little"
   },
   {
    "kind": "highlight",
    "text": "big · little"
   },
   {
    "kind": "example",
    "en": "An elephant is big.",
    "ar": "الفيل كبير."
   },
   {
    "kind": "example",
    "en": "A mouse is little.",
    "ar": "الفار صغير."
   }
  ],
  "kids": {
   "listTitle": "big · little",
   "cards": [
    {
     "emoji": "🐘",
     "en": "An elephant is big.",
     "ar": "الفيل كبير.",
     "hl": "big"
    },
    {
     "emoji": "🐁",
     "en": "A mouse is little.",
     "ar": "الفار صغير.",
     "hl": "little"
    },
    {
     "emoji": "🏢",
     "en": "We live in a big building.",
     "ar": "نعيش في عمارة كبيرة.",
     "hl": "big"
    },
    {
     "emoji": "🐣",
     "en": "I see a little chick.",
     "ar": "أشوف كتكوت صغير.",
     "hl": "little"
    },
    {
     "emoji": "🍉",
     "en": "This watermelon is big.",
     "ar": "هالبطيخة كبيرة.",
     "hl": "big"
    },
    {
     "emoji": "👶",
     "en": "My little brother is two.",
     "ar": "أخوي الصغير عمره سنتين.",
     "hl": "little"
    }
   ],
   "say": "big · little An elephant is big. A mouse is little. We live in a big building. I see a little chick. This watermelon is big. My little brother is two."
  }
 },
 {
  "id": "lama-80",
  "order": 80,
  "levelId": "l3",
  "titleAr": "كلمة yes وكلمة no",
  "titleEn": "The Words yes and no",
  "content": {
   "explanationAr": "yes معناها «نعم» أو «إي»، و no معناها «لا».",
   "altExplanationAr": "Is it hot? Yes, it is. Is it cold? No, it isn't.",
   "example": [
    {
     "en": "Yes, I am ready.",
     "ar": "إي، أنا جاهز."
    },
    {
     "en": "No, thank you.",
     "ar": "لا، شكرًا."
    },
    {
     "en": "Yes, please!",
     "ar": "إي، لو سمحت!"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___, I am ready.",
    "options": [
     "No",
     "Yes",
     "Is"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___, thank you.",
     "options": [
      "Yes",
      "Not",
      "No"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Yes, please!",
     "options": [
      "إي، لو سمحت!",
      "لا، مو حقي.",
      "إي، تقدر."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___, it is not mine.",
     "options": [
      "Yes",
      "No",
      "Not"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The Words yes and no"
   },
   {
    "kind": "highlight",
    "text": "yes · no"
   },
   {
    "kind": "example",
    "en": "Yes, I am ready.",
    "ar": "إي، أنا جاهز."
   },
   {
    "kind": "example",
    "en": "No, thank you.",
    "ar": "لا، شكرًا."
   }
  ],
  "kids": {
   "listTitle": "yes · no",
   "cards": [
    {
     "emoji": "👍",
     "en": "Yes, I am ready.",
     "ar": "إي، أنا جاهز.",
     "hl": "Yes"
    },
    {
     "emoji": "👎",
     "en": "No, thank you.",
     "ar": "لا، شكرًا.",
     "hl": "No"
    },
    {
     "emoji": "🙂",
     "en": "Yes, please!",
     "ar": "إي، لو سمحت!",
     "hl": "Yes"
    },
    {
     "emoji": "🙅",
     "en": "No, it is not mine.",
     "ar": "لا، مو حقي.",
     "hl": "No"
    },
    {
     "emoji": "✅",
     "en": "Yes, you can.",
     "ar": "إي، تقدر.",
     "hl": "Yes"
    },
    {
     "emoji": "❌",
     "en": "No, we can't go.",
     "ar": "لا، ما نقدر نروح.",
     "hl": "No"
    }
   ],
   "say": "yes · no Yes, I am ready. No, thank you. Yes, please! No, it is not mine. Yes, you can. No, we can't go."
  }
 },
 {
  "id": "lama-81",
  "order": 81,
  "levelId": "l3",
  "titleAr": "كلمة what وكلمة who",
  "titleEn": "The Words what and who",
  "content": {
   "explanationAr": "what معناها «وش» للأشياء، و who معناها «مين» للناس.",
   "altExplanationAr": "What is this? Who is she?",
   "example": [
    {
     "en": "What is this?",
     "ar": "وش هذا؟"
    },
    {
     "en": "Who is she?",
     "ar": "مين هي؟"
    },
    {
     "en": "What is for lunch?",
     "ar": "وش الغدا؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ is this?",
    "options": [
     "Who",
     "Where",
     "What"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ is she?",
     "options": [
      "Who",
      "What",
      "Where"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "What is for lunch?",
     "options": [
      "مين عند الباب؟",
      "وش الغدا؟",
      "وش لونه؟"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ is at the door?",
     "options": [
      "What",
      "Where",
      "Who"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The Words what and who"
   },
   {
    "kind": "highlight",
    "text": "what · who"
   },
   {
    "kind": "example",
    "en": "What is this?",
    "ar": "وش هذا؟"
   },
   {
    "kind": "example",
    "en": "Who is she?",
    "ar": "مين هي؟"
   }
  ],
  "kids": {
   "listTitle": "what · who",
   "cards": [
    {
     "emoji": "❓",
     "en": "What is this?",
     "ar": "وش هذا؟",
     "hl": "What"
    },
    {
     "emoji": "👩‍🏫",
     "en": "Who is she?",
     "ar": "مين هي؟",
     "hl": "Who"
    },
    {
     "emoji": "🍲",
     "en": "What is for lunch?",
     "ar": "وش الغدا؟",
     "hl": "What"
    },
    {
     "emoji": "🚪",
     "en": "Who is at the door?",
     "ar": "مين عند الباب؟",
     "hl": "Who"
    },
    {
     "emoji": "🎨",
     "en": "What color is it?",
     "ar": "وش لونه؟",
     "hl": "What"
    },
    {
     "emoji": "🏆",
     "en": "Who won the game?",
     "ar": "مين فاز باللعبة؟",
     "hl": "Who"
    }
   ],
   "say": "what · who What is this? Who is she? What is for lunch? Who is at the door? What color is it? Who won the game?"
  }
 },
 {
  "id": "lama-82",
  "order": 82,
  "levelId": "l3",
  "titleAr": "كلمة where وكلمة when",
  "titleEn": "The Words where and when",
  "content": {
   "explanationAr": "where معناها «وين» للمكان، و when معناها «متى» للوقت.",
   "altExplanationAr": "Where is Dad? When is lunch?",
   "example": [
    {
     "en": "Where is my phone?",
     "ar": "وين جوالي؟"
    },
    {
     "en": "When is the party?",
     "ar": "متى الحفلة؟"
    },
    {
     "en": "Where is the cat?",
     "ar": "وين القطة؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ is my phone?",
    "options": [
     "Where",
     "When",
     "Who"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ is the party?",
     "options": [
      "Where",
      "When",
      "What"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Where is the cat?",
     "options": [
      "متى يجي الباص؟",
      "وين تسكن؟",
      "وين القطة؟"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ does the bus come?",
     "options": [
      "When",
      "Where",
      "Who"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The Words where and when"
   },
   {
    "kind": "highlight",
    "text": "where · when"
   },
   {
    "kind": "example",
    "en": "Where is my phone?",
    "ar": "وين جوالي؟"
   },
   {
    "kind": "example",
    "en": "When is the party?",
    "ar": "متى الحفلة؟"
   }
  ],
  "kids": {
   "listTitle": "where · when",
   "cards": [
    {
     "emoji": "🔎",
     "en": "Where is my phone?",
     "ar": "وين جوالي؟",
     "hl": "Where"
    },
    {
     "emoji": "🕑",
     "en": "When is the party?",
     "ar": "متى الحفلة؟",
     "hl": "When"
    },
    {
     "emoji": "🐈",
     "en": "Where is the cat?",
     "ar": "وين القطة؟",
     "hl": "Where"
    },
    {
     "emoji": "🚌",
     "en": "When does the bus come?",
     "ar": "متى يجي الباص؟",
     "hl": "When"
    },
    {
     "emoji": "🏠",
     "en": "Where do you live?",
     "ar": "وين تسكن؟",
     "hl": "Where"
    },
    {
     "emoji": "🌙",
     "en": "When do you sleep?",
     "ar": "متى تنام؟",
     "hl": "When"
    }
   ],
   "say": "where · when Where is my phone? When is the party? Where is the cat? When does the bus come? Where do you live? When do you sleep?"
  }
 },
 {
  "id": "lama-83",
  "order": 83,
  "levelId": "l3",
  "titleAr": "كلمة was وكلمة were",
  "titleEn": "The Words was and were",
  "content": {
   "explanationAr": "was و were للماضي: was لواحد، و were لأكثر من واحد أو مع you.",
   "altExplanationAr": "I was at home. We were at school.",
   "example": [
    {
     "en": "I was at home.",
     "ar": "كنت في البيت."
    },
    {
     "en": "We were at school.",
     "ar": "كنا في المدرسة."
    },
    {
     "en": "It was cold yesterday.",
     "ar": "كان الجو بارد أمس."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ at home.",
    "options": [
     "were",
     "was",
     "is"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We ___ at school.",
     "options": [
      "was",
      "are",
      "were"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "It was cold yesterday.",
     "options": [
      "كان الجو بارد أمس.",
      "كانوا مبسوطين.",
      "كانت مريضة."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "They ___ happy.",
     "options": [
      "was",
      "were",
      "are"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The Words was and were"
   },
   {
    "kind": "highlight",
    "text": "was · were"
   },
   {
    "kind": "example",
    "en": "I was at home.",
    "ar": "كنت في البيت."
   },
   {
    "kind": "example",
    "en": "We were at school.",
    "ar": "كنا في المدرسة."
   }
  ],
  "kids": {
   "listTitle": "was · were",
   "cards": [
    {
     "emoji": "🏠",
     "en": "I was at home.",
     "ar": "كنت في البيت.",
     "hl": "was"
    },
    {
     "emoji": "🏫",
     "en": "We were at school.",
     "ar": "كنا في المدرسة.",
     "hl": "were"
    },
    {
     "emoji": "🥶",
     "en": "It was cold yesterday.",
     "ar": "كان الجو بارد أمس.",
     "hl": "was"
    },
    {
     "emoji": "😊",
     "en": "They were happy.",
     "ar": "كانوا مبسوطين.",
     "hl": "were"
    },
    {
     "emoji": "🤒",
     "en": "She was sick.",
     "ar": "كانت مريضة.",
     "hl": "was"
    },
    {
     "emoji": "🐣",
     "en": "You were a baby.",
     "ar": "كنت بيبي.",
     "hl": "were"
    }
   ],
   "say": "was · were I was at home. We were at school. It was cold yesterday. They were happy. She was sick. You were a baby."
  }
 },
 {
  "id": "lama-84",
  "order": 84,
  "levelId": "l3",
  "titleAr": "كلمة do وكلمة does",
  "titleEn": "The Words do and does",
  "content": {
   "explanationAr": "نسأل بـ do مع I و you و we و they، وبـ does مع he و she و it.",
   "altExplanationAr": "Do you like milk? Does she like milk?",
   "example": [
    {
     "en": "Do you like milk?",
     "ar": "تحب الحليب؟"
    },
    {
     "en": "Does she like cake?",
     "ar": "هي تحب الكيك؟"
    },
    {
     "en": "Do they swim?",
     "ar": "هم يسبحون؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ you like milk?",
    "options": [
     "Does",
     "Is",
     "Do"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ she like cake?",
     "options": [
      "Does",
      "Do",
      "Are"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Do they swim?",
     "options": [
      "هو يعض؟",
      "هم يسبحون؟",
      "عندنا وقت؟"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ it bite?",
     "options": [
      "Do",
      "Are",
      "Does"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The Words do and does"
   },
   {
    "kind": "highlight",
    "text": "do · does"
   },
   {
    "kind": "example",
    "en": "Do you like milk?",
    "ar": "تحب الحليب؟"
   },
   {
    "kind": "example",
    "en": "Does she like cake?",
    "ar": "هي تحب الكيك؟"
   }
  ],
  "kids": {
   "listTitle": "do · does",
   "cards": [
    {
     "emoji": "🥛",
     "en": "Do you like milk?",
     "ar": "تحب الحليب؟",
     "hl": "Do"
    },
    {
     "emoji": "🧁",
     "en": "Does she like cake?",
     "ar": "هي تحب الكيك؟",
     "hl": "Does"
    },
    {
     "emoji": "🏊",
     "en": "Do they swim?",
     "ar": "هم يسبحون؟",
     "hl": "Do"
    },
    {
     "emoji": "🐕",
     "en": "Does it bite?",
     "ar": "هو يعض؟",
     "hl": "Does"
    },
    {
     "emoji": "🎮",
     "en": "Do we have time?",
     "ar": "عندنا وقت؟",
     "hl": "Do"
    },
    {
     "emoji": "🚲",
     "en": "Does he ride a bike?",
     "ar": "هو يركب دراجة؟",
     "hl": "Does"
    }
   ],
   "say": "do · does Do you like milk? Does she like cake? Do they swim? Does it bite? Do we have time? Does he ride a bike?"
  }
 },
 {
  "id": "lama-85",
  "order": 85,
  "levelId": "l3",
  "titleAr": "كلمة with وكلمة for",
  "titleEn": "The Words with and for",
  "content": {
   "explanationAr": "with معناها «مع»، و for معناها «لـ» أو «عشان».",
   "altExplanationAr": "I play with my friend. This gift is for you.",
   "example": [
    {
     "en": "I play with my friend.",
     "ar": "ألعب مع صديقي."
    },
    {
     "en": "This cake is for Mom.",
     "ar": "هالكيكة لماما."
    },
    {
     "en": "Eat with a spoon.",
     "ar": "كل بالملعقة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I play ___ my friend.",
    "options": [
     "with",
     "for",
     "to"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "This cake is ___ Mom.",
     "options": [
      "with",
      "for",
      "to"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Eat with a spoon.",
     "options": [
      "شنطة جديدة للمدرسة.",
      "أطلع مع جدتي.",
      "كل بالملعقة."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "A new bag ___ school.",
     "options": [
      "for",
      "with",
      "on"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The Words with and for"
   },
   {
    "kind": "highlight",
    "text": "with · for"
   },
   {
    "kind": "example",
    "en": "I play with my friend.",
    "ar": "ألعب مع صديقي."
   },
   {
    "kind": "example",
    "en": "This cake is for Mom.",
    "ar": "هالكيكة لماما."
   }
  ],
  "kids": {
   "listTitle": "with · for",
   "cards": [
    {
     "emoji": "👫",
     "en": "I play with my friend.",
     "ar": "ألعب مع صديقي.",
     "hl": "with"
    },
    {
     "emoji": "🎂",
     "en": "This cake is for Mom.",
     "ar": "هالكيكة لماما.",
     "hl": "for"
    },
    {
     "emoji": "🥄",
     "en": "Eat with a spoon.",
     "ar": "كل بالملعقة.",
     "hl": "with"
    },
    {
     "emoji": "🎒",
     "en": "A new bag for school.",
     "ar": "شنطة جديدة للمدرسة.",
     "hl": "for"
    },
    {
     "emoji": "🧕",
     "en": "I go out with Grandma.",
     "ar": "أطلع مع جدتي.",
     "hl": "with"
    },
    {
     "emoji": "💐",
     "en": "These flowers are for you.",
     "ar": "هالورد لك.",
     "hl": "for"
    }
   ],
   "say": "with · for I play with my friend. This cake is for Mom. Eat with a spoon. A new bag for school. I go out with Grandma. These flowers are for you."
  }
 },
 {
  "id": "lama-86",
  "order": 86,
  "levelId": "l3",
  "titleAr": "كلمة all وكلمة some",
  "titleEn": "The Words all and some",
  "content": {
   "explanationAr": "all معناها «كل»، و some معناها «شوية» أو «بعض».",
   "altExplanationAr": "All the cups are clean. I want some water.",
   "example": [
    {
     "en": "All the rooms are clean.",
     "ar": "كل الغرف نظيفة."
    },
    {
     "en": "Can I have some cookies?",
     "ar": "ممكن آخذ شوية بسكويت؟"
    },
    {
     "en": "All the kids are here.",
     "ar": "كل الأطفال هنا."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ the rooms are clean.",
    "options": [
     "Some",
     "All",
     "Any"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Can I have ___ cookies?",
     "options": [
      "all",
      "any",
      "some"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "All the kids are here.",
     "options": [
      "كل الأطفال هنا.",
      "أبي شوية عنب.",
      "كل النجوم لامعة."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I want ___ grapes.",
     "options": [
      "all",
      "some",
      "any"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The Words all and some"
   },
   {
    "kind": "highlight",
    "text": "all · some"
   },
   {
    "kind": "example",
    "en": "All the rooms are clean.",
    "ar": "كل الغرف نظيفة."
   },
   {
    "kind": "example",
    "en": "Can I have some cookies?",
    "ar": "ممكن آخذ شوية بسكويت؟"
   }
  ],
  "kids": {
   "listTitle": "all · some",
   "cards": [
    {
     "emoji": "🧹",
     "en": "All the rooms are clean.",
     "ar": "كل الغرف نظيفة.",
     "hl": "All"
    },
    {
     "emoji": "🍪",
     "en": "Can I have some cookies?",
     "ar": "ممكن آخذ شوية بسكويت؟",
     "hl": "some"
    },
    {
     "emoji": "🙋",
     "en": "All the kids are here.",
     "ar": "كل الأطفال هنا.",
     "hl": "All"
    },
    {
     "emoji": "🍇",
     "en": "I want some grapes.",
     "ar": "أبي شوية عنب.",
     "hl": "some"
    },
    {
     "emoji": "🌟",
     "en": "All the stars are bright.",
     "ar": "كل النجوم لامعة.",
     "hl": "All"
    },
    {
     "emoji": "🍞",
     "en": "We need some bread.",
     "ar": "نحتاج شوية خبز.",
     "hl": "some"
    }
   ],
   "say": "all · some All the rooms are clean. Can I have some cookies? All the kids are here. I want some grapes. All the stars are bright. We need some bread."
  }
 },
 {
  "id": "lama-87",
  "order": 87,
  "levelId": "l3",
  "titleAr": "كلمة good وكلمة very",
  "titleEn": "The Words good and very",
  "content": {
   "explanationAr": "good معناها «زين» أو «جيد»، و very معناها «مرة» أو «جدًا».",
   "altExplanationAr": "Good job! It is very hot.",
   "example": [
    {
     "en": "Good job!",
     "ar": "شغل زين!"
    },
    {
     "en": "It is very hot.",
     "ar": "الجو حار مرة."
    },
    {
     "en": "This is a good book.",
     "ar": "هذا كتاب زين."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ job!",
    "options": [
     "Very",
     "Go",
     "Good"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "It is ___ hot.",
     "options": [
      "very",
      "good",
      "go"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "This is a good book.",
     "options": [
      "الفهد سريع مرة.",
      "هذا كتاب زين.",
      "صباح الخير يا جدي!"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The cheetah is ___ fast.",
     "options": [
      "good",
      "go",
      "very"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "The Words good and very"
   },
   {
    "kind": "highlight",
    "text": "good · very"
   },
   {
    "kind": "example",
    "en": "Good job!",
    "ar": "شغل زين!"
   },
   {
    "kind": "example",
    "en": "It is very hot.",
    "ar": "الجو حار مرة."
   }
  ],
  "kids": {
   "listTitle": "good · very",
   "cards": [
    {
     "emoji": "👏",
     "en": "Good job!",
     "ar": "شغل زين!",
     "hl": "Good"
    },
    {
     "emoji": "🌡️",
     "en": "It is very hot.",
     "ar": "الجو حار مرة.",
     "hl": "very"
    },
    {
     "emoji": "📗",
     "en": "This is a good book.",
     "ar": "هذا كتاب زين.",
     "hl": "good"
    },
    {
     "emoji": "🐆",
     "en": "The cheetah is very fast.",
     "ar": "الفهد سريع مرة.",
     "hl": "very"
    },
    {
     "emoji": "🌅",
     "en": "Good morning, Grandpa!",
     "ar": "صباح الخير يا جدي!",
     "hl": "Good"
    },
    {
     "emoji": "😴",
     "en": "I am very tired.",
     "ar": "أنا تعبان مرة.",
     "hl": "very"
    }
   ],
   "say": "good · very Good job! It is very hot. This is a good book. The cheetah is very fast. Good morning, Grandpa! I am very tired."
  }
 },
 {
  "id": "lama-88",
  "order": 88,
  "levelId": "l3",
  "titleAr": "مراجعة كلمات البصر ١",
  "titleEn": "Sight Words Review 1",
  "content": {
   "explanationAr": "نراجع كلمات البصر اللي تعلمناها: is و are و he و she و in و on و can.",
   "altExplanationAr": "اقرأ الجملة كاملة واختر الكلمة الناقصة.",
   "example": [
    {
     "en": "The sheep are on the hill.",
     "ar": "الخرفان فوق التل."
    },
    {
     "en": "She is in the kitchen.",
     "ar": "هي في المطبخ."
    },
    {
     "en": "A horse can run fast.",
     "ar": "الحصان يقدر يركض بسرعة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "The sheep ___ on the hill.",
    "options": [
     "are",
     "is",
     "am"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ is in the kitchen.",
     "options": [
      "He",
      "She",
      "They"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "A horse can run fast.",
     "options": [
      "الدبدوب على السرير.",
      "هو في الحديقة.",
      "الحصان يقدر يركض بسرعة."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The teddy is ___ the bed.",
     "options": [
      "on",
      "in",
      "at"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Sight Words Review 1"
   },
   {
    "kind": "highlight",
    "text": "Review"
   },
   {
    "kind": "example",
    "en": "The sheep are on the hill.",
    "ar": "الخرفان فوق التل."
   },
   {
    "kind": "example",
    "en": "She is in the kitchen.",
    "ar": "هي في المطبخ."
   }
  ],
  "kids": {
   "listTitle": "Review",
   "cards": [
    {
     "emoji": "🐑",
     "en": "The sheep are on the hill.",
     "ar": "الخرفان فوق التل.",
     "hl": "are"
    },
    {
     "emoji": "👩",
     "en": "She is in the kitchen.",
     "ar": "هي في المطبخ.",
     "hl": "She"
    },
    {
     "emoji": "🐎",
     "en": "A horse can run fast.",
     "ar": "الحصان يقدر يركض بسرعة.",
     "hl": "can"
    },
    {
     "emoji": "🧸",
     "en": "The teddy is on the bed.",
     "ar": "الدبدوب على السرير.",
     "hl": "on"
    },
    {
     "emoji": "🧔",
     "en": "He is in the garden.",
     "ar": "هو في الحديقة.",
     "hl": "He"
    },
    {
     "emoji": "🥕",
     "en": "The carrots are in the bag.",
     "ar": "الجزر في الكيس.",
     "hl": "are"
    }
   ],
   "say": "Review The sheep are on the hill. She is in the kitchen. A horse can run fast. The teddy is on the bed. He is in the garden. The carrots are in the bag."
  }
 },
 {
  "id": "lama-89",
  "order": 89,
  "levelId": "l3",
  "titleAr": "مراجعة كلمات البصر ٢",
  "titleEn": "Sight Words Review 2",
  "content": {
   "explanationAr": "نراجع: what و where و my و your و go و come و was.",
   "altExplanationAr": "اقرأ ببطء، وفكر في معنى الجملة قبل ما تختار.",
   "example": [
    {
     "en": "Where is my teddy?",
     "ar": "وين دبدوبي؟"
    },
    {
     "en": "What do you want?",
     "ar": "وش تبي؟"
    },
    {
     "en": "Come with me.",
     "ar": "تعال معي."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "___ is my teddy?",
    "options": [
     "What",
     "Where",
     "Who"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ do you want?",
     "options": [
      "Where",
      "Who",
      "What"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Come with me.",
     "options": [
      "تعال معي.",
      "روح العب.",
      "هذا قفازك؟"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "___ and play.",
     "options": [
      "Come",
      "Go",
      "Is"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Sight Words Review 2"
   },
   {
    "kind": "highlight",
    "text": "Review"
   },
   {
    "kind": "example",
    "en": "Where is my teddy?",
    "ar": "وين دبدوبي؟"
   },
   {
    "kind": "example",
    "en": "What do you want?",
    "ar": "وش تبي؟"
   }
  ],
  "kids": {
   "listTitle": "Review",
   "cards": [
    {
     "emoji": "🧸",
     "en": "Where is my teddy?",
     "ar": "وين دبدوبي؟",
     "hl": "Where"
    },
    {
     "emoji": "🍕",
     "en": "What do you want?",
     "ar": "وش تبي؟",
     "hl": "What"
    },
    {
     "emoji": "🚗",
     "en": "Come with me.",
     "ar": "تعال معي.",
     "hl": "Come"
    },
    {
     "emoji": "🛝",
     "en": "Go and play.",
     "ar": "روح العب.",
     "hl": "Go"
    },
    {
     "emoji": "🧤",
     "en": "Is this your glove?",
     "ar": "هذا قفازك؟",
     "hl": "your"
    },
    {
     "emoji": "🌧️",
     "en": "It was rainy on Monday.",
     "ar": "كان ممطر يوم الاثنين.",
     "hl": "was"
    }
   ],
   "say": "Review Where is my teddy? What do you want? Come with me. Go and play. Is this your glove? It was rainy on Monday."
  }
 },
 {
  "id": "lama-90",
  "order": 90,
  "levelId": "l3",
  "titleAr": "مراجعة المستوى الثالث",
  "titleEn": "Level 3 Review",
  "content": {
   "explanationAr": "مراجعة كبيرة لكل كلمات البصر في المستوى الثالث. خذ وقتك واقرأ كل جملة.",
   "altExplanationAr": "لو ما عرفت، اقرأ الجملة بصوت عالي وجرّب كل خيار.",
   "example": [
    {
     "en": "They were in the park.",
     "ar": "كانوا في الحديقة."
    },
    {
     "en": "He has a basketball.",
     "ar": "عنده كورة سلة."
    },
    {
     "en": "Do you want a sandwich?",
     "ar": "تبي ساندويتش؟"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "They ___ in the park.",
    "options": [
     "was",
     "is",
     "were"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He ___ a basketball.",
     "options": [
      "has",
      "have",
      "is"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Do you want a sandwich?",
     "options": [
      "هالفيونكة لها.",
      "تبي ساندويتش؟",
      "طالع الحشرة الصغيرة."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "This bow is ___ her.",
     "options": [
      "with",
      "on",
      "for"
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
    "text": "Review"
   },
   {
    "kind": "example",
    "en": "They were in the park.",
    "ar": "كانوا في الحديقة."
   },
   {
    "kind": "example",
    "en": "He has a basketball.",
    "ar": "عنده كورة سلة."
   }
  ],
  "kids": {
   "listTitle": "Review",
   "cards": [
    {
     "emoji": "🐝",
     "en": "They were in the park.",
     "ar": "كانوا في الحديقة.",
     "hl": "were"
    },
    {
     "emoji": "🏀",
     "en": "He has a basketball.",
     "ar": "عنده كورة سلة.",
     "hl": "has"
    },
    {
     "emoji": "🥪",
     "en": "Do you want a sandwich?",
     "ar": "تبي ساندويتش؟",
     "hl": "Do"
    },
    {
     "emoji": "🎀",
     "en": "This bow is for her.",
     "ar": "هالفيونكة لها.",
     "hl": "for"
    },
    {
     "emoji": "🐞",
     "en": "Look at the little bug.",
     "ar": "طالع الحشرة الصغيرة.",
     "hl": "little"
    },
    {
     "emoji": "🌻",
     "en": "We like the sunflowers.",
     "ar": "نحب دوار الشمس.",
     "hl": "like"
    }
   ],
   "say": "Review They were in the park. He has a basketball. Do you want a sandwich? This bow is for her. Look at the little bug. We like the sunflowers."
  }
 },
 {
  "id": "lama-91",
  "order": 91,
  "levelId": "l4",
  "titleAr": "قصة: القطة والكورة",
  "titleEn": "Story: The Cat and the Ball",
  "content": {
   "explanationAr": "قصة قصيرة عن قطة تلعب. اقرأ كل جملة وطالع الصورة، والقصة تمشي جملة بعد جملة.",
   "altExplanationAr": "القصة ست جمل. اقرأ وحدة وحدة وبعدين اقرأها كلها مرة ثانية.",
   "example": [
    {
     "en": "Mimi is a little cat.",
     "ar": "ميمي قطة صغيرة."
    },
    {
     "en": "She sees a red ball.",
     "ar": "تشوف كورة حمرا."
    },
    {
     "en": "She runs after the ball.",
     "ar": "تركض ورا الكورة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Mimi is a little ___.",
    "options": [
     "cat",
     "cup",
     "car"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She sees a red ___.",
     "options": [
      "bell",
      "ball",
      "bag"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "She runs after the ball.",
     "options": [
      "الكورة تدخل تحت الكنبة.",
      "ميمي ما تقدر تجيبها.",
      "تركض ورا الكورة."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The ball goes ___ the sofa.",
     "options": [
      "under",
      "over",
      "into"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Story: The Cat and the Ball"
   },
   {
    "kind": "highlight",
    "text": "The Cat and the Ball"
   },
   {
    "kind": "example",
    "en": "Mimi is a little cat.",
    "ar": "ميمي قطة صغيرة."
   },
   {
    "kind": "example",
    "en": "She sees a red ball.",
    "ar": "تشوف كورة حمرا."
   }
  ],
  "kids": {
   "listTitle": "The Cat and the Ball",
   "cards": [
    {
     "emoji": "🐈",
     "en": "Mimi is a little cat.",
     "ar": "ميمي قطة صغيرة.",
     "hl": "cat"
    },
    {
     "emoji": "🔴",
     "en": "She sees a red ball.",
     "ar": "تشوف كورة حمرا.",
     "hl": "ball"
    },
    {
     "emoji": "🏃‍♀️",
     "en": "She runs after the ball.",
     "ar": "تركض ورا الكورة.",
     "hl": "runs"
    },
    {
     "emoji": "🛋️",
     "en": "The ball goes under the sofa.",
     "ar": "الكورة تدخل تحت الكنبة.",
     "hl": "under"
    },
    {
     "emoji": "😿",
     "en": "Mimi can't get it.",
     "ar": "ميمي ما تقدر تجيبها.",
     "hl": "get"
    },
    {
     "emoji": "👧",
     "en": "Lina helps her, and Mimi is happy.",
     "ar": "لينا تساعدها، وميمي تنبسط.",
     "hl": "helps"
    }
   ],
   "say": "The Cat and the Ball Mimi is a little cat. She sees a red ball. She runs after the ball. The ball goes under the sofa. Mimi can't get it. Lina helps her, and Mimi is happy."
  }
 },
 {
  "id": "lama-92",
  "order": 92,
  "levelId": "l4",
  "titleAr": "قصة: يوم في البحر",
  "titleEn": "Story: A Day at the Beach",
  "content": {
   "explanationAr": "قصة عن عائلة تروح البحر. ركّز على الكلمات اللي تحكي وش سووا.",
   "altExplanationAr": "اقرأ القصة وتخيل نفسك معهم على الرمل.",
   "example": [
    {
     "en": "Dad drives us to the beach.",
     "ar": "بابا يودينا البحر بالسيارة."
    },
    {
     "en": "The sun is hot and bright.",
     "ar": "الشمس حارة ولامعة."
    },
    {
     "en": "I make a sand castle.",
     "ar": "أسوي قلعة رمل."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Dad ___ us to the beach.",
    "options": [
     "dives",
     "drives",
     "draws"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The sun is hot and ___.",
     "options": [
      "night",
      "right",
      "bright"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I make a sand castle.",
     "options": [
      "أسوي قلعة رمل.",
      "تجي موجة كبيرة.",
      "قلعتي راحت!"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "A big ___ comes.",
     "options": [
      "cave",
      "wave",
      "save"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Story: A Day at the Beach"
   },
   {
    "kind": "highlight",
    "text": "A Day at the Beach"
   },
   {
    "kind": "example",
    "en": "Dad drives us to the beach.",
    "ar": "بابا يودينا البحر بالسيارة."
   },
   {
    "kind": "example",
    "en": "The sun is hot and bright.",
    "ar": "الشمس حارة ولامعة."
   }
  ],
  "kids": {
   "listTitle": "A Day at the Beach",
   "cards": [
    {
     "emoji": "🚗",
     "en": "Dad drives us to the beach.",
     "ar": "بابا يودينا البحر بالسيارة.",
     "hl": "drives"
    },
    {
     "emoji": "☀️",
     "en": "The sun is hot and bright.",
     "ar": "الشمس حارة ولامعة.",
     "hl": "bright"
    },
    {
     "emoji": "🏖️",
     "en": "I make a sand castle.",
     "ar": "أسوي قلعة رمل.",
     "hl": "castle"
    },
    {
     "emoji": "🌊",
     "en": "A big wave comes.",
     "ar": "تجي موجة كبيرة.",
     "hl": "wave"
    },
    {
     "emoji": "😮",
     "en": "My castle is gone!",
     "ar": "قلعتي راحت!",
     "hl": "gone"
    },
    {
     "emoji": "😄",
     "en": "I laugh and make a new one.",
     "ar": "أضحك وأسوي وحدة جديدة.",
     "hl": "laugh"
    }
   ],
   "say": "A Day at the Beach Dad drives us to the beach. The sun is hot and bright. I make a sand castle. A big wave comes. My castle is gone! I laugh and make a new one."
  }
 },
 {
  "id": "lama-93",
  "order": 93,
  "levelId": "l4",
  "titleAr": "قصة: سمكة صغيرة",
  "titleEn": "Story: A Little Fish",
  "content": {
   "explanationAr": "قصة سمكة صغيرة تدور على أصدقاء في البحر.",
   "altExplanationAr": "لاحظ الكلمات الجديدة: swim و friend و shell.",
   "example": [
    {
     "en": "Finn is a little fish.",
     "ar": "فِن سمكة صغيرة."
    },
    {
     "en": "He lives in the blue sea.",
     "ar": "يعيش في البحر الأزرق."
    },
    {
     "en": "Finn swims all day.",
     "ar": "فِن يسبح طول اليوم."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Finn is a little ___.",
    "options": [
     "dish",
     "wish",
     "fish"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He lives in the blue ___.",
     "options": [
      "sea",
      "see",
      "tea"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Finn swims all day.",
     "options": [
      "يلقى صدفة وردية.",
      "فِن يسبح طول اليوم.",
      "سلحفاة تقول مرحبا."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He finds a pink ___.",
     "options": [
      "shelf",
      "smell",
      "shell"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Story: A Little Fish"
   },
   {
    "kind": "highlight",
    "text": "A Little Fish"
   },
   {
    "kind": "example",
    "en": "Finn is a little fish.",
    "ar": "فِن سمكة صغيرة."
   },
   {
    "kind": "example",
    "en": "He lives in the blue sea.",
    "ar": "يعيش في البحر الأزرق."
   }
  ],
  "kids": {
   "listTitle": "A Little Fish",
   "cards": [
    {
     "emoji": "🐟",
     "en": "Finn is a little fish.",
     "ar": "فِن سمكة صغيرة.",
     "hl": "fish"
    },
    {
     "emoji": "🌊",
     "en": "He lives in the blue sea.",
     "ar": "يعيش في البحر الأزرق.",
     "hl": "sea"
    },
    {
     "emoji": "🏊",
     "en": "Finn swims all day.",
     "ar": "فِن يسبح طول اليوم.",
     "hl": "swims"
    },
    {
     "emoji": "🐚",
     "en": "He finds a pink shell.",
     "ar": "يلقى صدفة وردية.",
     "hl": "shell"
    },
    {
     "emoji": "🐢",
     "en": "A turtle says hello.",
     "ar": "سلحفاة تقول مرحبا.",
     "hl": "hello"
    },
    {
     "emoji": "🤝",
     "en": "Now Finn has a friend.",
     "ar": "الحين فِن عنده صديق.",
     "hl": "friend"
    }
   ],
   "say": "A Little Fish Finn is a little fish. He lives in the blue sea. Finn swims all day. He finds a pink shell. A turtle says hello. Now Finn has a friend."
  }
 },
 {
  "id": "lama-94",
  "order": 94,
  "levelId": "l4",
  "titleAr": "قصة: المطر",
  "titleEn": "Story: The Rain",
  "content": {
   "explanationAr": "قصة عن يوم ممطر. اقرأ وشوف وش يصير للولد.",
   "altExplanationAr": "الكلمات المهمة: rain و wet و umbrella.",
   "example": [
    {
     "en": "The sky is gray.",
     "ar": "السماء رمادية."
    },
    {
     "en": "Rain falls on the town.",
     "ar": "المطر ينزل على البلد."
    },
    {
     "en": "Omar has no umbrella.",
     "ar": "عمر ما عنده مظلة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "The sky is ___.",
    "options": [
     "gray",
     "green",
     "grass"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Rain ___ on the town.",
     "options": [
      "fills",
      "falls",
      "feels"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Omar has no umbrella.",
     "options": [
      "قميصه مبلول.",
      "يركض للبيت بسرعة.",
      "عمر ما عنده مظلة."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "His shirt is ___.",
     "options": [
      "wet",
      "wait",
      "web"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Story: The Rain"
   },
   {
    "kind": "highlight",
    "text": "The Rain"
   },
   {
    "kind": "example",
    "en": "The sky is gray.",
    "ar": "السماء رمادية."
   },
   {
    "kind": "example",
    "en": "Rain falls on the town.",
    "ar": "المطر ينزل على البلد."
   }
  ],
  "kids": {
   "listTitle": "The Rain",
   "cards": [
    {
     "emoji": "🌥️",
     "en": "The sky is gray.",
     "ar": "السماء رمادية.",
     "hl": "gray"
    },
    {
     "emoji": "🌧️",
     "en": "Rain falls on the town.",
     "ar": "المطر ينزل على البلد.",
     "hl": "falls"
    },
    {
     "emoji": "🧒",
     "en": "Omar has no umbrella.",
     "ar": "عمر ما عنده مظلة.",
     "hl": "umbrella"
    },
    {
     "emoji": "💦",
     "en": "His shirt is wet.",
     "ar": "قميصه مبلول.",
     "hl": "wet"
    },
    {
     "emoji": "🏃",
     "en": "He runs home fast.",
     "ar": "يركض للبيت بسرعة.",
     "hl": "fast"
    },
    {
     "emoji": "🍵",
     "en": "Mom gives him warm milk.",
     "ar": "ماما تعطيه حليب دافي.",
     "hl": "warm"
    }
   ],
   "say": "The Rain The sky is gray. Rain falls on the town. Omar has no umbrella. His shirt is wet. He runs home fast. Mom gives him warm milk."
  }
 },
 {
  "id": "lama-95",
  "order": 95,
  "levelId": "l4",
  "titleAr": "قصة: الكلب الجائع",
  "titleEn": "Story: The Hungry Dog",
  "content": {
   "explanationAr": "قصة عن كلب جوعان يدور على أكل.",
   "altExplanationAr": "اقرأ واسأل نفسك: وش لقى الكلب في الأخير؟",
   "example": [
    {
     "en": "Rex is a hungry dog.",
     "ar": "ركس كلب جوعان."
    },
    {
     "en": "He sniffs the air.",
     "ar": "يشم الهوا."
    },
    {
     "en": "He smells some meat.",
     "ar": "يشم ريحة لحم."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Rex is a ___ dog.",
    "options": [
     "happy",
     "hungry",
     "hairy"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He ___ the air.",
     "options": [
      "stops",
      "sings",
      "sniffs"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "He smells some meat.",
     "options": [
      "يشم ريحة لحم.",
      "اللحم في المطبخ.",
      "الطباخ يعطيه حبة."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The meat is in the ___.",
     "options": [
      "chicken",
      "kitchen",
      "kitten"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Story: The Hungry Dog"
   },
   {
    "kind": "highlight",
    "text": "The Hungry Dog"
   },
   {
    "kind": "example",
    "en": "Rex is a hungry dog.",
    "ar": "ركس كلب جوعان."
   },
   {
    "kind": "example",
    "en": "He sniffs the air.",
    "ar": "يشم الهوا."
   }
  ],
  "kids": {
   "listTitle": "The Hungry Dog",
   "cards": [
    {
     "emoji": "🐕",
     "en": "Rex is a hungry dog.",
     "ar": "ركس كلب جوعان.",
     "hl": "hungry"
    },
    {
     "emoji": "👃",
     "en": "He sniffs the air.",
     "ar": "يشم الهوا.",
     "hl": "sniffs"
    },
    {
     "emoji": "🍖",
     "en": "He smells some meat.",
     "ar": "يشم ريحة لحم.",
     "hl": "meat"
    },
    {
     "emoji": "🏠",
     "en": "The meat is in the kitchen.",
     "ar": "اللحم في المطبخ.",
     "hl": "kitchen"
    },
    {
     "emoji": "👨‍🍳",
     "en": "The cook gives him a bit.",
     "ar": "الطباخ يعطيه حبة.",
     "hl": "bit"
    },
    {
     "emoji": "😋",
     "en": "Rex says, \"Woof! Thank you!\"",
     "ar": "ركس يقول: «هو! شكرًا!»",
     "hl": "Woof"
    }
   ],
   "say": "The Hungry Dog Rex is a hungry dog. He sniffs the air. He smells some meat. The meat is in the kitchen. The cook gives him a bit. Rex says, \"Woof! Thank you!\""
  }
 },
 {
  "id": "lama-96",
  "order": 96,
  "levelId": "l4",
  "titleAr": "قصة: عيد ميلاد سلمى",
  "titleEn": "Story: Salma's Birthday",
  "content": {
   "explanationAr": "قصة عن عيد ميلاد بنت اسمها سلمى.",
   "altExplanationAr": "لاحظ كلمات الحفلة: cake و candles و gift.",
   "example": [
    {
     "en": "Today is Salma's birthday.",
     "ar": "اليوم عيد ميلاد سلمى."
    },
    {
     "en": "There are seven candles on the cake.",
     "ar": "فيه سبع شموع على الكيكة."
    },
    {
     "en": "Her friends come to the party.",
     "ar": "صديقاتها يجون الحفلة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Today is Salma's ___.",
    "options": [
     "bathroom",
     "bedroom",
     "birthday"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "There are seven ___ on the cake.",
     "options": [
      "candles",
      "cables",
      "camels"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Her friends come to the party.",
     "options": [
      "يغنون أغنية حلوة.",
      "صديقاتها يجون الحفلة.",
      "سلمى تطفي الشموع."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "They sing a happy ___.",
     "options": [
      "sun",
      "sock",
      "song"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Story: Salma's Birthday"
   },
   {
    "kind": "highlight",
    "text": "Salma's Birthday"
   },
   {
    "kind": "example",
    "en": "Today is Salma's birthday.",
    "ar": "اليوم عيد ميلاد سلمى."
   },
   {
    "kind": "example",
    "en": "There are seven candles on the cake.",
    "ar": "فيه سبع شموع على الكيكة."
   }
  ],
  "kids": {
   "listTitle": "Salma's Birthday",
   "cards": [
    {
     "emoji": "🎂",
     "en": "Today is Salma's birthday.",
     "ar": "اليوم عيد ميلاد سلمى.",
     "hl": "birthday"
    },
    {
     "emoji": "🕯️",
     "en": "There are seven candles on the cake.",
     "ar": "فيه سبع شموع على الكيكة.",
     "hl": "candles"
    },
    {
     "emoji": "🥳",
     "en": "Her friends come to the party.",
     "ar": "صديقاتها يجون الحفلة.",
     "hl": "party"
    },
    {
     "emoji": "🎶",
     "en": "They sing a happy song.",
     "ar": "يغنون أغنية حلوة.",
     "hl": "song"
    },
    {
     "emoji": "💨",
     "en": "Salma blows out the candles.",
     "ar": "سلمى تطفي الشموع.",
     "hl": "blows"
    },
    {
     "emoji": "🎁",
     "en": "She opens a big gift.",
     "ar": "تفتح هدية كبيرة.",
     "hl": "opens"
    }
   ],
   "say": "Salma's Birthday Today is Salma's birthday. There are seven candles on the cake. Her friends come to the party. They sing a happy song. Salma blows out the candles. She opens a big gift."
  }
 },
 {
  "id": "lama-97",
  "order": 97,
  "levelId": "l4",
  "titleAr": "قصة: البذرة",
  "titleEn": "Story: The Seed",
  "content": {
   "explanationAr": "قصة عن بذرة صغيرة تكبر وتصير وردة.",
   "altExplanationAr": "تابع الترتيب: بذرة، ماي، شمس، وردة.",
   "example": [
    {
     "en": "Nora has a little seed.",
     "ar": "نورة عندها بذرة صغيرة."
    },
    {
     "en": "She puts it in a pot.",
     "ar": "تحطها في أصيص."
    },
    {
     "en": "She gives it water every day.",
     "ar": "تسقيها ماي كل يوم."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Nora has a little ___.",
    "options": [
     "seed",
     "seat",
     "sea"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She puts it in a ___.",
     "options": [
      "pet",
      "pot",
      "pit"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "She gives it water every day.",
     "options": [
      "الشمس تطلع عليها.",
      "يوم من الأيام تطلع ورقة خضرا.",
      "تسقيها ماي كل يوم."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The sun ___ on it.",
     "options": [
      "shines",
      "shuts",
      "shops"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Story: The Seed"
   },
   {
    "kind": "highlight",
    "text": "The Seed"
   },
   {
    "kind": "example",
    "en": "Nora has a little seed.",
    "ar": "نورة عندها بذرة صغيرة."
   },
   {
    "kind": "example",
    "en": "She puts it in a pot.",
    "ar": "تحطها في أصيص."
   }
  ],
  "kids": {
   "listTitle": "The Seed",
   "cards": [
    {
     "emoji": "🌱",
     "en": "Nora has a little seed.",
     "ar": "نورة عندها بذرة صغيرة.",
     "hl": "seed"
    },
    {
     "emoji": "🪴",
     "en": "She puts it in a pot.",
     "ar": "تحطها في أصيص.",
     "hl": "pot"
    },
    {
     "emoji": "🚿",
     "en": "She gives it water every day.",
     "ar": "تسقيها ماي كل يوم.",
     "hl": "water"
    },
    {
     "emoji": "🌞",
     "en": "The sun shines on it.",
     "ar": "الشمس تطلع عليها.",
     "hl": "shines"
    },
    {
     "emoji": "🌿",
     "en": "One day, a green leaf comes out.",
     "ar": "يوم من الأيام تطلع ورقة خضرا.",
     "hl": "leaf"
    },
    {
     "emoji": "🌼",
     "en": "Now it is a yellow flower!",
     "ar": "الحين صارت وردة صفرا!",
     "hl": "flower"
    }
   ],
   "say": "The Seed Nora has a little seed. She puts it in a pot. She gives it water every day. The sun shines on it. One day, a green leaf comes out. Now it is a yellow flower!"
  }
 },
 {
  "id": "lama-98",
  "order": 98,
  "levelId": "l4",
  "titleAr": "قصة: الأرنب والسلحفاة",
  "titleEn": "Story: The Rabbit and the Turtle",
  "content": {
   "explanationAr": "قصة مشهورة عن سباق بين أرنب سريع وسلحفاة بطيئة.",
   "altExplanationAr": "الدرس: اللي يكمّل ويصبر يوصل.",
   "example": [
    {
     "en": "The rabbit is very fast.",
     "ar": "الأرنب سريع مرة."
    },
    {
     "en": "The turtle is very slow.",
     "ar": "السلحفاة بطيئة مرة."
    },
    {
     "en": "They have a race.",
     "ar": "يسوون سباق."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "The rabbit is very ___.",
    "options": [
     "fat",
     "fast",
     "fan"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The turtle is very ___.",
     "options": [
      "snow",
      "show",
      "slow"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "They have a race.",
     "options": [
      "يسوون سباق.",
      "الأرنب يوقف وينام.",
      "السلحفاة تكمل مشي."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The rabbit stops and ___.",
     "options": [
      "sweeps",
      "sleeps",
      "slips"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Story: The Rabbit and the Turtle"
   },
   {
    "kind": "highlight",
    "text": "The Rabbit and the Turtle"
   },
   {
    "kind": "example",
    "en": "The rabbit is very fast.",
    "ar": "الأرنب سريع مرة."
   },
   {
    "kind": "example",
    "en": "The turtle is very slow.",
    "ar": "السلحفاة بطيئة مرة."
   }
  ],
  "kids": {
   "listTitle": "The Rabbit and the Turtle",
   "cards": [
    {
     "emoji": "🐇",
     "en": "The rabbit is very fast.",
     "ar": "الأرنب سريع مرة.",
     "hl": "fast"
    },
    {
     "emoji": "🐢",
     "en": "The turtle is very slow.",
     "ar": "السلحفاة بطيئة مرة.",
     "hl": "slow"
    },
    {
     "emoji": "🏁",
     "en": "They have a race.",
     "ar": "يسوون سباق.",
     "hl": "race"
    },
    {
     "emoji": "😴",
     "en": "The rabbit stops and sleeps.",
     "ar": "الأرنب يوقف وينام.",
     "hl": "sleeps"
    },
    {
     "emoji": "🚶",
     "en": "The turtle keeps walking.",
     "ar": "السلحفاة تكمل مشي.",
     "hl": "walking"
    },
    {
     "emoji": "🏆",
     "en": "The turtle wins the race!",
     "ar": "السلحفاة تفوز بالسباق!",
     "hl": "wins"
    }
   ],
   "say": "The Rabbit and the Turtle The rabbit is very fast. The turtle is very slow. They have a race. The rabbit stops and sleeps. The turtle keeps walking. The turtle wins the race!"
  }
 },
 {
  "id": "lama-99",
  "order": 99,
  "levelId": "l4",
  "titleAr": "قصة: في السوق",
  "titleEn": "Story: At the Market",
  "content": {
   "explanationAr": "قصة عن ولد يروح السوق مع أبوه.",
   "altExplanationAr": "الكلمات المهمة: buy و fruit و pay.",
   "example": [
    {
     "en": "Sami goes to the market with Dad.",
     "ar": "سامي يروح السوق مع أبوه."
    },
    {
     "en": "They buy oranges and dates.",
     "ar": "يشترون برتقال وتمر."
    },
    {
     "en": "Sami picks the bananas.",
     "ar": "سامي يختار الموز."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Sami goes to the ___ with Dad.",
    "options": [
     "marker",
     "basket",
     "market"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "They ___ oranges and dates.",
     "options": [
      "buy",
      "by",
      "bye"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Sami picks the bananas.",
     "options": [
      "يحطها في السلة.",
      "سامي يختار الموز.",
      "أبوه يدفع للرجّال."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He puts them in the ___.",
     "options": [
      "biscuit",
      "blanket",
      "basket"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Story: At the Market"
   },
   {
    "kind": "highlight",
    "text": "At the Market"
   },
   {
    "kind": "example",
    "en": "Sami goes to the market with Dad.",
    "ar": "سامي يروح السوق مع أبوه."
   },
   {
    "kind": "example",
    "en": "They buy oranges and dates.",
    "ar": "يشترون برتقال وتمر."
   }
  ],
  "kids": {
   "listTitle": "At the Market",
   "cards": [
    {
     "emoji": "🛍️",
     "en": "Sami goes to the market with Dad.",
     "ar": "سامي يروح السوق مع أبوه.",
     "hl": "market"
    },
    {
     "emoji": "🍊",
     "en": "They buy oranges and dates.",
     "ar": "يشترون برتقال وتمر.",
     "hl": "buy"
    },
    {
     "emoji": "🍌",
     "en": "Sami picks the bananas.",
     "ar": "سامي يختار الموز.",
     "hl": "picks"
    },
    {
     "emoji": "🧺",
     "en": "He puts them in the basket.",
     "ar": "يحطها في السلة.",
     "hl": "basket"
    },
    {
     "emoji": "💵",
     "en": "Dad pays the man.",
     "ar": "أبوه يدفع للرجّال.",
     "hl": "pays"
    },
    {
     "emoji": "😊",
     "en": "The man says, \"Thank you, little helper!\"",
     "ar": "الرجّال يقول: «شكرًا يا المساعد الصغير!»",
     "hl": "helper"
    }
   ],
   "say": "At the Market Sami goes to the market with Dad. They buy oranges and dates. Sami picks the bananas. He puts them in the basket. Dad pays the man. The man says, \"Thank you, little helper!\""
  }
 },
 {
  "id": "lama-100",
  "order": 100,
  "levelId": "l4",
  "titleAr": "قصة: الطيارة الورقية",
  "titleEn": "Story: The Kite",
  "content": {
   "explanationAr": "قصة عن بنت وطيارتها الورقية في يوم فيه هوا.",
   "altExplanationAr": "اقرأ وشوف: ليش طارت الطيارة عالي؟",
   "example": [
    {
     "en": "Huda has a new kite.",
     "ar": "هدى عندها طيارة ورقية جديدة."
    },
    {
     "en": "It is a windy day.",
     "ar": "اليوم فيه هوا."
    },
    {
     "en": "She runs in the field.",
     "ar": "تركض في الساحة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Huda has a new ___.",
    "options": [
     "kite",
     "kit",
     "cat"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "It is a ___ day.",
     "options": [
      "window",
      "windy",
      "winter"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "She runs in the field.",
     "options": [
      "الطيارة تطير عالي.",
      "يا ويلي! علقت في شجرة.",
      "تركض في الساحة."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The kite goes up ___.",
     "options": [
      "high",
      "hay",
      "hi"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Story: The Kite"
   },
   {
    "kind": "highlight",
    "text": "The Kite"
   },
   {
    "kind": "example",
    "en": "Huda has a new kite.",
    "ar": "هدى عندها طيارة ورقية جديدة."
   },
   {
    "kind": "example",
    "en": "It is a windy day.",
    "ar": "اليوم فيه هوا."
   }
  ],
  "kids": {
   "listTitle": "The Kite",
   "cards": [
    {
     "emoji": "🪁",
     "en": "Huda has a new kite.",
     "ar": "هدى عندها طيارة ورقية جديدة.",
     "hl": "kite"
    },
    {
     "emoji": "🌬️",
     "en": "It is a windy day.",
     "ar": "اليوم فيه هوا.",
     "hl": "windy"
    },
    {
     "emoji": "🏞️",
     "en": "She runs in the field.",
     "ar": "تركض في الساحة.",
     "hl": "field"
    },
    {
     "emoji": "⬆️",
     "en": "The kite goes up high.",
     "ar": "الطيارة تطير عالي.",
     "hl": "high"
    },
    {
     "emoji": "🌳",
     "en": "Oh no! It is in a tree.",
     "ar": "يا ويلي! علقت في شجرة.",
     "hl": "tree"
    },
    {
     "emoji": "🧔",
     "en": "Her uncle gets it down.",
     "ar": "عمها ينزلها.",
     "hl": "uncle"
    }
   ],
   "say": "The Kite Huda has a new kite. It is a windy day. She runs in the field. The kite goes up high. Oh no! It is in a tree. Her uncle gets it down."
  }
 },
 {
  "id": "lama-101",
  "order": 101,
  "levelId": "l4",
  "titleAr": "قصة: الثلج",
  "titleEn": "Story: The Snow",
  "content": {
   "explanationAr": "قصة عن طفل يشوف الثلج لأول مرة.",
   "altExplanationAr": "تخيل البرد واللون الأبيض.",
   "example": [
    {
     "en": "Yousef sees snow for the first time.",
     "ar": "يوسف يشوف الثلج لأول مرة."
    },
    {
     "en": "Everything is white.",
     "ar": "كل شي أبيض."
    },
    {
     "en": "He puts on his gloves.",
     "ar": "يلبس قفازاته."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Yousef sees ___ for the first time.",
    "options": [
     "show",
     "snow",
     "slow"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Everything is ___.",
     "options": [
      "while",
      "write",
      "white"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "He puts on his gloves.",
     "options": [
      "يلبس قفازاته.",
      "يسوي رجل ثلج.",
      "رجل الثلج له خشم جزر."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He makes a ___.",
     "options": [
      "postman",
      "snowman",
      "fireman"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Story: The Snow"
   },
   {
    "kind": "highlight",
    "text": "The Snow"
   },
   {
    "kind": "example",
    "en": "Yousef sees snow for the first time.",
    "ar": "يوسف يشوف الثلج لأول مرة."
   },
   {
    "kind": "example",
    "en": "Everything is white.",
    "ar": "كل شي أبيض."
   }
  ],
  "kids": {
   "listTitle": "The Snow",
   "cards": [
    {
     "emoji": "❄️",
     "en": "Yousef sees snow for the first time.",
     "ar": "يوسف يشوف الثلج لأول مرة.",
     "hl": "snow"
    },
    {
     "emoji": "🤍",
     "en": "Everything is white.",
     "ar": "كل شي أبيض.",
     "hl": "white"
    },
    {
     "emoji": "🧤",
     "en": "He puts on his gloves.",
     "ar": "يلبس قفازاته.",
     "hl": "gloves"
    },
    {
     "emoji": "⛄",
     "en": "He makes a snowman.",
     "ar": "يسوي رجل ثلج.",
     "hl": "snowman"
    },
    {
     "emoji": "🥕",
     "en": "The snowman has a carrot nose.",
     "ar": "رجل الثلج له خشم جزر.",
     "hl": "nose"
    },
    {
     "emoji": "🥶",
     "en": "His fingers are cold, but he is happy.",
     "ar": "أصابعه باردة، لكنه مبسوط.",
     "hl": "fingers"
    }
   ],
   "say": "The Snow Yousef sees snow for the first time. Everything is white. He puts on his gloves. He makes a snowman. The snowman has a carrot nose. His fingers are cold, but he is happy."
  }
 },
 {
  "id": "lama-102",
  "order": 102,
  "levelId": "l4",
  "titleAr": "قصة: القرد الذكي",
  "titleEn": "Story: The Clever Monkey",
  "content": {
   "explanationAr": "قصة عن قرد يستخدم عقله عشان ياكل.",
   "altExplanationAr": "لاحظ: كيف حل القرد المشكلة؟",
   "example": [
    {
     "en": "Momo is a clever monkey.",
     "ar": "مومو قرد ذكي."
    },
    {
     "en": "He sees bananas up in a tree.",
     "ar": "يشوف موز فوق في شجرة."
    },
    {
     "en": "He can't reach them.",
     "ar": "ما يقدر يوصلها."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Momo is a ___ monkey.",
    "options": [
     "clean",
     "closed",
     "clever"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He sees ___ up in a tree.",
     "options": [
      "bananas",
      "buttons",
      "balloons"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "He can't reach them.",
     "options": [
      "يلقى عصا طويلة.",
      "ما يقدر يوصلها.",
      "يضرب الموز بالعصا."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He finds a long ___.",
     "options": [
      "stack",
      "sock",
      "stick"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Story: The Clever Monkey"
   },
   {
    "kind": "highlight",
    "text": "The Clever Monkey"
   },
   {
    "kind": "example",
    "en": "Momo is a clever monkey.",
    "ar": "مومو قرد ذكي."
   },
   {
    "kind": "example",
    "en": "He sees bananas up in a tree.",
    "ar": "يشوف موز فوق في شجرة."
   }
  ],
  "kids": {
   "listTitle": "The Clever Monkey",
   "cards": [
    {
     "emoji": "🐒",
     "en": "Momo is a clever monkey.",
     "ar": "مومو قرد ذكي.",
     "hl": "clever"
    },
    {
     "emoji": "🍌",
     "en": "He sees bananas up in a tree.",
     "ar": "يشوف موز فوق في شجرة.",
     "hl": "bananas"
    },
    {
     "emoji": "🙈",
     "en": "He can't reach them.",
     "ar": "ما يقدر يوصلها.",
     "hl": "reach"
    },
    {
     "emoji": "🪵",
     "en": "He finds a long stick.",
     "ar": "يلقى عصا طويلة.",
     "hl": "stick"
    },
    {
     "emoji": "🤸",
     "en": "He hits the bananas with the stick.",
     "ar": "يضرب الموز بالعصا.",
     "hl": "hits"
    },
    {
     "emoji": "😋",
     "en": "The bananas fall, and Momo eats.",
     "ar": "الموز يطيح، ومومو ياكل.",
     "hl": "fall"
    }
   ],
   "say": "The Clever Monkey Momo is a clever monkey. He sees bananas up in a tree. He can't reach them. He finds a long stick. He hits the bananas with the stick. The bananas fall, and Momo eats."
  }
 },
 {
  "id": "lama-103",
  "order": 103,
  "levelId": "l4",
  "titleAr": "قصة: الضيوف",
  "titleEn": "Story: The Guests",
  "content": {
   "explanationAr": "قصة عن بيت يستقبل ضيوف.",
   "altExplanationAr": "الكلمات المهمة: guests و coffee و dates.",
   "example": [
    {
     "en": "The doorbell rings.",
     "ar": "جرس الباب يرن."
    },
    {
     "en": "Our guests are here.",
     "ar": "ضيوفنا وصلوا."
    },
    {
     "en": "We say, \"Welcome!\"",
     "ar": "نقول: «حياكم!»"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "The doorbell ___.",
    "options": [
     "rings",
     "runs",
     "reads"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Our ___ are here.",
     "options": [
      "guess",
      "guests",
      "ghosts"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "We say, \"Welcome!\"",
     "options": [
      "أبوي يصب القهوة.",
      "أجيب التمر.",
      "نقول: «حياكم!»"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Dad ___ the coffee.",
     "options": [
      "pours",
      "pulls",
      "pushes"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Story: The Guests"
   },
   {
    "kind": "highlight",
    "text": "The Guests"
   },
   {
    "kind": "example",
    "en": "The doorbell rings.",
    "ar": "جرس الباب يرن."
   },
   {
    "kind": "example",
    "en": "Our guests are here.",
    "ar": "ضيوفنا وصلوا."
   }
  ],
  "kids": {
   "listTitle": "The Guests",
   "cards": [
    {
     "emoji": "🔔",
     "en": "The doorbell rings.",
     "ar": "جرس الباب يرن.",
     "hl": "rings"
    },
    {
     "emoji": "👨‍👩‍👦",
     "en": "Our guests are here.",
     "ar": "ضيوفنا وصلوا.",
     "hl": "guests"
    },
    {
     "emoji": "🙏",
     "en": "We say, \"Welcome!\"",
     "ar": "نقول: «حياكم!»",
     "hl": "Welcome"
    },
    {
     "emoji": "☕",
     "en": "Dad pours the coffee.",
     "ar": "أبوي يصب القهوة.",
     "hl": "pours"
    },
    {
     "emoji": "🌴",
     "en": "I bring the dates.",
     "ar": "أجيب التمر.",
     "hl": "dates"
    },
    {
     "emoji": "💬",
     "en": "We sit and talk.",
     "ar": "نجلس ونسولف.",
     "hl": "talk"
    }
   ],
   "say": "The Guests The doorbell rings. Our guests are here. We say, \"Welcome!\" Dad pours the coffee. I bring the dates. We sit and talk."
  }
 },
 {
  "id": "lama-104",
  "order": 104,
  "levelId": "l4",
  "titleAr": "قصة: الدب النعسان",
  "titleEn": "Story: The Sleepy Bear",
  "content": {
   "explanationAr": "قصة عن دب يبي ينام في الشتاء.",
   "altExplanationAr": "اقرأ واكتشف: وين نام الدب؟",
   "example": [
    {
     "en": "Bobo is a big brown bear.",
     "ar": "بوبو دب بني كبير."
    },
    {
     "en": "It is the end of autumn.",
     "ar": "هذي نهاية الخريف."
    },
    {
     "en": "Bobo is very sleepy.",
     "ar": "بوبو نعسان مرة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Bobo is a big brown ___.",
    "options": [
     "beer",
     "bear",
     "pear"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "It is the end of ___.",
     "options": [
      "August",
      "auntie",
      "autumn"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "Bobo is very sleepy.",
     "options": [
      "بوبو نعسان مرة.",
      "ياكل عسل كثير.",
      "يدخل كهفه."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He eats lots of ___.",
     "options": [
      "money",
      "honey",
      "hungry"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Story: The Sleepy Bear"
   },
   {
    "kind": "highlight",
    "text": "The Sleepy Bear"
   },
   {
    "kind": "example",
    "en": "Bobo is a big brown bear.",
    "ar": "بوبو دب بني كبير."
   },
   {
    "kind": "example",
    "en": "It is the end of autumn.",
    "ar": "هذي نهاية الخريف."
   }
  ],
  "kids": {
   "listTitle": "The Sleepy Bear",
   "cards": [
    {
     "emoji": "🐻",
     "en": "Bobo is a big brown bear.",
     "ar": "بوبو دب بني كبير.",
     "hl": "bear"
    },
    {
     "emoji": "🍂",
     "en": "It is the end of autumn.",
     "ar": "هذي نهاية الخريف.",
     "hl": "autumn"
    },
    {
     "emoji": "🥱",
     "en": "Bobo is very sleepy.",
     "ar": "بوبو نعسان مرة.",
     "hl": "sleepy"
    },
    {
     "emoji": "🍯",
     "en": "He eats lots of honey.",
     "ar": "ياكل عسل كثير.",
     "hl": "honey"
    },
    {
     "emoji": "🕳️",
     "en": "He goes into his cave.",
     "ar": "يدخل كهفه.",
     "hl": "cave"
    },
    {
     "emoji": "💤",
     "en": "He sleeps all winter.",
     "ar": "ينام طول الشتاء.",
     "hl": "winter"
    }
   ],
   "say": "The Sleepy Bear Bobo is a big brown bear. It is the end of autumn. Bobo is very sleepy. He eats lots of honey. He goes into his cave. He sleeps all winter."
  }
 },
 {
  "id": "lama-105",
  "order": 105,
  "levelId": "l4",
  "titleAr": "قصة: الدراجة الجديدة",
  "titleEn": "Story: The New Bike",
  "content": {
   "explanationAr": "قصة عن ولد يتعلم يركب دراجة.",
   "altExplanationAr": "الكلمات المهمة: ride و fall و try.",
   "example": [
    {
     "en": "Fahad gets a new bike.",
     "ar": "فهد ياخذ دراجة جديدة."
    },
    {
     "en": "He can't ride it yet.",
     "ar": "ما يقدر يركبها للحين."
    },
    {
     "en": "He falls down.",
     "ar": "يطيح."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Fahad gets a new ___.",
    "options": [
     "bake",
     "book",
     "bike"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He can't ___ it yet.",
     "options": [
      "ride",
      "road",
      "red"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "He falls down.",
     "options": [
      "أبوه يقول: «جرب مرة ثانية.»",
      "يطيح.",
      "فهد يحاول كذا مرة."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Dad says, \"Try ___.\"",
     "options": [
      "agree",
      "against",
      "again"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Story: The New Bike"
   },
   {
    "kind": "highlight",
    "text": "The New Bike"
   },
   {
    "kind": "example",
    "en": "Fahad gets a new bike.",
    "ar": "فهد ياخذ دراجة جديدة."
   },
   {
    "kind": "example",
    "en": "He can't ride it yet.",
    "ar": "ما يقدر يركبها للحين."
   }
  ],
  "kids": {
   "listTitle": "The New Bike",
   "cards": [
    {
     "emoji": "🚲",
     "en": "Fahad gets a new bike.",
     "ar": "فهد ياخذ دراجة جديدة.",
     "hl": "bike"
    },
    {
     "emoji": "😟",
     "en": "He can't ride it yet.",
     "ar": "ما يقدر يركبها للحين.",
     "hl": "ride"
    },
    {
     "emoji": "🤕",
     "en": "He falls down.",
     "ar": "يطيح.",
     "hl": "falls"
    },
    {
     "emoji": "👨",
     "en": "Dad says, \"Try again.\"",
     "ar": "أبوه يقول: «جرب مرة ثانية.»",
     "hl": "again"
    },
    {
     "emoji": "💪",
     "en": "Fahad tries many times.",
     "ar": "فهد يحاول كذا مرة.",
     "hl": "tries"
    },
    {
     "emoji": "🎉",
     "en": "Now he can ride very well!",
     "ar": "الحين يقدر يركب زين مرة!",
     "hl": "well"
    }
   ],
   "say": "The New Bike Fahad gets a new bike. He can't ride it yet. He falls down. Dad says, \"Try again.\" Fahad tries many times. Now he can ride very well!"
  }
 },
 {
  "id": "lama-106",
  "order": 106,
  "levelId": "l4",
  "titleAr": "قصة: البطة الضايعة",
  "titleEn": "Story: The Lost Duckling",
  "content": {
   "explanationAr": "قصة عن بطة صغيرة ضاعت عن أمها.",
   "altExplanationAr": "تابع: مين ساعدها ترجع؟",
   "example": [
    {
     "en": "A little duckling is lost.",
     "ar": "بطة صغيرة ضايعة."
    },
    {
     "en": "She can't find her mother.",
     "ar": "ما تلقى أمها."
    },
    {
     "en": "She asks a frog for help.",
     "ar": "تسأل ضفدع يساعدها."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "A little duckling is ___.",
    "options": [
     "lost",
     "last",
     "list"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She can't find her ___.",
     "options": [
      "mirror",
      "mother",
      "matter"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "She asks a frog for help.",
     "options": [
      "الضفدع يقول: «امشي وراي!»",
      "يروحون للبركة.",
      "تسأل ضفدع يساعدها."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The frog says, \"___ me!\"",
     "options": [
      "Follow",
      "Fellow",
      "Yellow"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Story: The Lost Duckling"
   },
   {
    "kind": "highlight",
    "text": "The Lost Duckling"
   },
   {
    "kind": "example",
    "en": "A little duckling is lost.",
    "ar": "بطة صغيرة ضايعة."
   },
   {
    "kind": "example",
    "en": "She can't find her mother.",
    "ar": "ما تلقى أمها."
   }
  ],
  "kids": {
   "listTitle": "The Lost Duckling",
   "cards": [
    {
     "emoji": "🐥",
     "en": "A little duckling is lost.",
     "ar": "بطة صغيرة ضايعة.",
     "hl": "lost"
    },
    {
     "emoji": "😢",
     "en": "She can't find her mother.",
     "ar": "ما تلقى أمها.",
     "hl": "mother"
    },
    {
     "emoji": "🐸",
     "en": "She asks a frog for help.",
     "ar": "تسأل ضفدع يساعدها.",
     "hl": "asks"
    },
    {
     "emoji": "🐸",
     "en": "The frog says, \"Follow me!\"",
     "ar": "الضفدع يقول: «امشي وراي!»",
     "hl": "Follow"
    },
    {
     "emoji": "🏞️",
     "en": "They go to the pond.",
     "ar": "يروحون للبركة.",
     "hl": "pond"
    },
    {
     "emoji": "🦆",
     "en": "Her mother is there. Hooray!",
     "ar": "أمها هناك. هييه!",
     "hl": "Hooray"
    }
   ],
   "say": "The Lost Duckling A little duckling is lost. She can't find her mother. She asks a frog for help. The frog says, \"Follow me!\" They go to the pond. Her mother is there. Hooray!"
  }
 },
 {
  "id": "lama-107",
  "order": 107,
  "levelId": "l4",
  "titleAr": "قصة: الطبخ مع جدتي",
  "titleEn": "Story: Cooking with Grandma",
  "content": {
   "explanationAr": "قصة عن بنت تطبخ مع جدتها.",
   "altExplanationAr": "لاحظ أفعال الطبخ: mix و cut و bake.",
   "example": [
    {
     "en": "I cook with Grandma.",
     "ar": "أطبخ مع جدتي."
    },
    {
     "en": "We crack two eggs.",
     "ar": "نكسر بيضتين."
    },
    {
     "en": "I mix the flour and milk.",
     "ar": "أخلط الطحين والحليب."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I ___ with Grandma.",
    "options": [
     "cool",
     "cook",
     "cake"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We ___ two eggs.",
     "options": [
      "crab",
      "crown",
      "crack"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I mix the flour and milk.",
     "options": [
      "أخلط الطحين والحليب.",
      "جدتي تطبخ الفطائر.",
      "نحط عسل فوق."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Grandma cooks the ___.",
     "options": [
      "cupcakes",
      "pancakes",
      "pans"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Story: Cooking with Grandma"
   },
   {
    "kind": "highlight",
    "text": "Cooking with Grandma"
   },
   {
    "kind": "example",
    "en": "I cook with Grandma.",
    "ar": "أطبخ مع جدتي."
   },
   {
    "kind": "example",
    "en": "We crack two eggs.",
    "ar": "نكسر بيضتين."
   }
  ],
  "kids": {
   "listTitle": "Cooking with Grandma",
   "cards": [
    {
     "emoji": "👵",
     "en": "I cook with Grandma.",
     "ar": "أطبخ مع جدتي.",
     "hl": "cook"
    },
    {
     "emoji": "🥚",
     "en": "We crack two eggs.",
     "ar": "نكسر بيضتين.",
     "hl": "crack"
    },
    {
     "emoji": "🥣",
     "en": "I mix the flour and milk.",
     "ar": "أخلط الطحين والحليب.",
     "hl": "mix"
    },
    {
     "emoji": "🍳",
     "en": "Grandma cooks the pancakes.",
     "ar": "جدتي تطبخ الفطائر.",
     "hl": "pancakes"
    },
    {
     "emoji": "🍯",
     "en": "We put honey on top.",
     "ar": "نحط عسل فوق.",
     "hl": "top"
    },
    {
     "emoji": "😋",
     "en": "They taste very good!",
     "ar": "طعمها لذيذ مرة!",
     "hl": "taste"
    }
   ],
   "say": "Cooking with Grandma I cook with Grandma. We crack two eggs. I mix the flour and milk. Grandma cooks the pancakes. We put honey on top. They taste very good!"
  }
 },
 {
  "id": "lama-108",
  "order": 108,
  "levelId": "l4",
  "titleAr": "قصة: الأسد والفأر",
  "titleEn": "Story: The Lion and the Mouse",
  "content": {
   "explanationAr": "قصة مشهورة عن أسد كبير وفأر صغير ساعده.",
   "altExplanationAr": "الدرس: الصغير يقدر يساعد الكبير.",
   "example": [
    {
     "en": "A big lion is sleeping.",
     "ar": "أسد كبير نايم."
    },
    {
     "en": "A mouse runs on his back.",
     "ar": "فار يركض على ظهره."
    },
    {
     "en": "The lion is angry.",
     "ar": "الأسد معصّب."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "A big lion is ___.",
    "options": [
     "sitting",
     "singing",
     "sleeping"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "A mouse runs on his ___.",
     "options": [
      "back",
      "bag",
      "black"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "The lion is angry.",
     "options": [
      "الفار يقول: «تكفى خلني أروح.»",
      "الأسد معصّب.",
      "بعدين، الأسد علق في شبكة."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The mouse says, \"___ let me go.\"",
     "options": [
      "Place",
      "Plays",
      "Please"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Story: The Lion and the Mouse"
   },
   {
    "kind": "highlight",
    "text": "The Lion and the Mouse"
   },
   {
    "kind": "example",
    "en": "A big lion is sleeping.",
    "ar": "أسد كبير نايم."
   },
   {
    "kind": "example",
    "en": "A mouse runs on his back.",
    "ar": "فار يركض على ظهره."
   }
  ],
  "kids": {
   "listTitle": "The Lion and the Mouse",
   "cards": [
    {
     "emoji": "🦁",
     "en": "A big lion is sleeping.",
     "ar": "أسد كبير نايم.",
     "hl": "sleeping"
    },
    {
     "emoji": "🐭",
     "en": "A mouse runs on his back.",
     "ar": "فار يركض على ظهره.",
     "hl": "back"
    },
    {
     "emoji": "😠",
     "en": "The lion is angry.",
     "ar": "الأسد معصّب.",
     "hl": "angry"
    },
    {
     "emoji": "🙏",
     "en": "The mouse says, \"Please let me go.\"",
     "ar": "الفار يقول: «تكفى خلني أروح.»",
     "hl": "Please"
    },
    {
     "emoji": "🪢",
     "en": "Later, the lion is in a net.",
     "ar": "بعدين، الأسد علق في شبكة.",
     "hl": "net"
    },
    {
     "emoji": "🐭",
     "en": "The mouse cuts the net and helps him.",
     "ar": "الفار يقطع الشبكة ويساعده.",
     "hl": "cuts"
    }
   ],
   "say": "The Lion and the Mouse A big lion is sleeping. A mouse runs on his back. The lion is angry. The mouse says, \"Please let me go.\" Later, the lion is in a net. The mouse cuts the net and helps him."
  }
 },
 {
  "id": "lama-109",
  "order": 109,
  "levelId": "l4",
  "titleAr": "قصة: رحلة بالطيارة",
  "titleEn": "Story: A Plane Trip",
  "content": {
   "explanationAr": "قصة عن عائلة تسافر بالطيارة.",
   "altExplanationAr": "الكلمات المهمة: plane و window و clouds.",
   "example": [
    {
     "en": "We pack our bags.",
     "ar": "نجهز شناطنا."
    },
    {
     "en": "We get on the plane.",
     "ar": "نركب الطيارة."
    },
    {
     "en": "I sit by the window.",
     "ar": "أجلس جنب الشباك."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "We ___ our bags.",
    "options": [
     "pack",
     "park",
     "pick"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "We get on the ___.",
     "options": [
      "plate",
      "plane",
      "planet"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I sit by the window.",
     "options": [
      "أشوف الغيوم تحت.",
      "المضيفة تعطيني عصير.",
      "أجلس جنب الشباك."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I see the ___ below.",
     "options": [
      "clouds",
      "clocks",
      "clowns"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Story: A Plane Trip"
   },
   {
    "kind": "highlight",
    "text": "A Plane Trip"
   },
   {
    "kind": "example",
    "en": "We pack our bags.",
    "ar": "نجهز شناطنا."
   },
   {
    "kind": "example",
    "en": "We get on the plane.",
    "ar": "نركب الطيارة."
   }
  ],
  "kids": {
   "listTitle": "A Plane Trip",
   "cards": [
    {
     "emoji": "🧳",
     "en": "We pack our bags.",
     "ar": "نجهز شناطنا.",
     "hl": "pack"
    },
    {
     "emoji": "🛫",
     "en": "We get on the plane.",
     "ar": "نركب الطيارة.",
     "hl": "plane"
    },
    {
     "emoji": "🪟",
     "en": "I sit by the window.",
     "ar": "أجلس جنب الشباك.",
     "hl": "window"
    },
    {
     "emoji": "☁️",
     "en": "I see the clouds below.",
     "ar": "أشوف الغيوم تحت.",
     "hl": "clouds"
    },
    {
     "emoji": "🧃",
     "en": "The flight attendant gives me juice.",
     "ar": "المضيفة تعطيني عصير.",
     "hl": "juice"
    },
    {
     "emoji": "🛬",
     "en": "We land in Abha.",
     "ar": "ننزل في أبها.",
     "hl": "land"
    }
   ],
   "say": "A Plane Trip We pack our bags. We get on the plane. I sit by the window. I see the clouds below. The flight attendant gives me juice. We land in Abha."
  }
 },
 {
  "id": "lama-110",
  "order": 110,
  "levelId": "l4",
  "titleAr": "قصة: القطار الصغير",
  "titleEn": "Story: The Little Train",
  "content": {
   "explanationAr": "قصة عن قطار صغير يطلع جبل.",
   "altExplanationAr": "ردد مع القطار: I think I can!",
   "example": [
    {
     "en": "A little train has a long trip.",
     "ar": "قطار صغير عنده رحلة طويلة."
    },
    {
     "en": "He must go up a big hill.",
     "ar": "لازم يطلع تل كبير."
    },
    {
     "en": "He carries toys for the children.",
     "ar": "يشيل ألعاب للأطفال."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "A little ___ has a long trip.",
    "options": [
     "tray",
     "train",
     "rain"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He must go up a big ___.",
     "options": [
      "hall",
      "hole",
      "hill"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "He carries toys for the children.",
     "options": [
      "يشيل ألعاب للأطفال.",
      "يقول: «أظن إني أقدر!»",
      "يطلع أعلى وأعلى."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He says, \"I ___ I can!\"",
     "options": [
      "thing",
      "think",
      "thank"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Story: The Little Train"
   },
   {
    "kind": "highlight",
    "text": "The Little Train"
   },
   {
    "kind": "example",
    "en": "A little train has a long trip.",
    "ar": "قطار صغير عنده رحلة طويلة."
   },
   {
    "kind": "example",
    "en": "He must go up a big hill.",
    "ar": "لازم يطلع تل كبير."
   }
  ],
  "kids": {
   "listTitle": "The Little Train",
   "cards": [
    {
     "emoji": "🚂",
     "en": "A little train has a long trip.",
     "ar": "قطار صغير عنده رحلة طويلة.",
     "hl": "train"
    },
    {
     "emoji": "⛰️",
     "en": "He must go up a big hill.",
     "ar": "لازم يطلع تل كبير.",
     "hl": "hill"
    },
    {
     "emoji": "🧸",
     "en": "He carries toys for the children.",
     "ar": "يشيل ألعاب للأطفال.",
     "hl": "carries"
    },
    {
     "emoji": "💭",
     "en": "He says, \"I think I can!\"",
     "ar": "يقول: «أظن إني أقدر!»",
     "hl": "think"
    },
    {
     "emoji": "💪",
     "en": "He goes higher and higher.",
     "ar": "يطلع أعلى وأعلى.",
     "hl": "goes"
    },
    {
     "emoji": "🎊",
     "en": "At the top, he says, \"I did it!\"",
     "ar": "فوق، يقول: «سويتها!»",
     "hl": "did"
    }
   ],
   "say": "The Little Train A little train has a long trip. He must go up a big hill. He carries toys for the children. He says, \"I think I can!\" He goes higher and higher. At the top, he says, \"I did it!\""
  }
 },
 {
  "id": "lama-111",
  "order": 111,
  "levelId": "l4",
  "titleAr": "قصة: يوم في المدرسة",
  "titleEn": "Story: A Day at School",
  "content": {
   "explanationAr": "قصة عن يوم عادي في المدرسة.",
   "altExplanationAr": "رتب اليوم: الصباح، الحصة، الفسحة، البيت.",
   "example": [
    {
     "en": "Mona gets to school at seven.",
     "ar": "منى توصل المدرسة الساعة سبع."
    },
    {
     "en": "She says hello to her teacher.",
     "ar": "تسلم على معلمتها."
    },
    {
     "en": "In class, they learn numbers.",
     "ar": "في الفصل، يتعلمون الأرقام."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Mona gets to ___ at seven.",
    "options": [
     "stool",
     "spool",
     "school"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She says hello to her ___.",
     "options": [
      "teacher",
      "teaches",
      "tickets"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "In class, they learn numbers.",
     "options": [
      "في الفسحة، تاكل ساندويتش.",
      "في الفصل، يتعلمون الأرقام.",
      "بعد الفسحة، يرسمون لوحات."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "At ___, she eats a sandwich.",
     "options": [
      "bread",
      "brake",
      "break"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Story: A Day at School"
   },
   {
    "kind": "highlight",
    "text": "A Day at School"
   },
   {
    "kind": "example",
    "en": "Mona gets to school at seven.",
    "ar": "منى توصل المدرسة الساعة سبع."
   },
   {
    "kind": "example",
    "en": "She says hello to her teacher.",
    "ar": "تسلم على معلمتها."
   }
  ],
  "kids": {
   "listTitle": "A Day at School",
   "cards": [
    {
     "emoji": "🏫",
     "en": "Mona gets to school at seven.",
     "ar": "منى توصل المدرسة الساعة سبع.",
     "hl": "school"
    },
    {
     "emoji": "👩‍🏫",
     "en": "She says hello to her teacher.",
     "ar": "تسلم على معلمتها.",
     "hl": "teacher"
    },
    {
     "emoji": "🔢",
     "en": "In class, they learn numbers.",
     "ar": "في الفصل، يتعلمون الأرقام.",
     "hl": "learn"
    },
    {
     "emoji": "🥪",
     "en": "At break, she eats a sandwich.",
     "ar": "في الفسحة، تاكل ساندويتش.",
     "hl": "break"
    },
    {
     "emoji": "🎨",
     "en": "After break, they paint pictures.",
     "ar": "بعد الفسحة، يرسمون لوحات.",
     "hl": "paint"
    },
    {
     "emoji": "🚌",
     "en": "At one, she goes home by bus.",
     "ar": "الساعة وحدة، ترجع البيت بالباص.",
     "hl": "home"
    }
   ],
   "say": "A Day at School Mona gets to school at seven. She says hello to her teacher. In class, they learn numbers. At break, she eats a sandwich. After break, they paint pictures. At one, she goes home by bus."
  }
 },
 {
  "id": "lama-112",
  "order": 112,
  "levelId": "l4",
  "titleAr": "قصة: الصديق الجديد",
  "titleEn": "Story: The New Friend",
  "content": {
   "explanationAr": "قصة عن ولد جديد في الفصل.",
   "altExplanationAr": "فكر: كيف نرحب بصديق جديد؟",
   "example": [
    {
     "en": "A new boy comes to our class.",
     "ar": "ولد جديد يجي فصلنا."
    },
    {
     "en": "His name is Adam, and he is shy.",
     "ar": "اسمه آدم، وهو خجول."
    },
    {
     "en": "I say, \"Hi, I am Saad.\"",
     "ar": "أقول: «هلا، أنا سعد.»"
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "A ___ boy comes to our class.",
    "options": [
     "new",
     "now",
     "knew"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "His name is Adam, and he is ___.",
     "options": [
      "sky",
      "shy",
      "why"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I say, \"Hi, I am Saad.\"",
     "options": [
      "أشاركه البسكويت حقي.",
      "نلعب كورة في الفسحة.",
      "أقول: «هلا، أنا سعد.»"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I ___ my cookies with him.",
     "options": [
      "share",
      "shore",
      "chair"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Story: The New Friend"
   },
   {
    "kind": "highlight",
    "text": "The New Friend"
   },
   {
    "kind": "example",
    "en": "A new boy comes to our class.",
    "ar": "ولد جديد يجي فصلنا."
   },
   {
    "kind": "example",
    "en": "His name is Adam, and he is shy.",
    "ar": "اسمه آدم، وهو خجول."
   }
  ],
  "kids": {
   "listTitle": "The New Friend",
   "cards": [
    {
     "emoji": "🧑",
     "en": "A new boy comes to our class.",
     "ar": "ولد جديد يجي فصلنا.",
     "hl": "new"
    },
    {
     "emoji": "😶",
     "en": "His name is Adam, and he is shy.",
     "ar": "اسمه آدم، وهو خجول.",
     "hl": "shy"
    },
    {
     "emoji": "🙋‍♂️",
     "en": "I say, \"Hi, I am Saad.\"",
     "ar": "أقول: «هلا، أنا سعد.»",
     "hl": "Hi"
    },
    {
     "emoji": "🍪",
     "en": "I share my cookies with him.",
     "ar": "أشاركه البسكويت حقي.",
     "hl": "share"
    },
    {
     "emoji": "⚽",
     "en": "We play football at break.",
     "ar": "نلعب كورة في الفسحة.",
     "hl": "football"
    },
    {
     "emoji": "😃",
     "en": "Now Adam is my good friend.",
     "ar": "الحين آدم صديقي الزين.",
     "hl": "friend"
    }
   ],
   "say": "The New Friend A new boy comes to our class. His name is Adam, and he is shy. I say, \"Hi, I am Saad.\" I share my cookies with him. We play football at break. Now Adam is my good friend."
  }
 },
 {
  "id": "lama-113",
  "order": 113,
  "levelId": "l4",
  "titleAr": "قصة: النملة والجرادة",
  "titleEn": "Story: The Ant and the Grasshopper",
  "content": {
   "explanationAr": "قصة مشهورة عن نملة تشتغل وجرادة تلعب.",
   "altExplanationAr": "الدرس: جهّز اليوم عشان بكرة.",
   "example": [
    {
     "en": "The ant works all summer.",
     "ar": "النملة تشتغل طول الصيف."
    },
    {
     "en": "She carries food to her home.",
     "ar": "تشيل أكل لبيتها."
    },
    {
     "en": "The grasshopper sings and plays.",
     "ar": "الجرادة تغني وتلعب."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "The ant ___ all summer.",
    "options": [
     "walks",
     "works",
     "wakes"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She carries ___ to her home.",
     "options": [
      "foot",
      "fool",
      "food"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "The grasshopper sings and plays.",
     "options": [
      "الجرادة تغني وتلعب.",
      "بعدين يجي الشتاء.",
      "الجرادة ما عندها أكل."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Then ___ comes.",
     "options": [
      "winner",
      "winter",
      "window"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Story: The Ant and the Grasshopper"
   },
   {
    "kind": "highlight",
    "text": "The Ant and the Grasshopper"
   },
   {
    "kind": "example",
    "en": "The ant works all summer.",
    "ar": "النملة تشتغل طول الصيف."
   },
   {
    "kind": "example",
    "en": "She carries food to her home.",
    "ar": "تشيل أكل لبيتها."
   }
  ],
  "kids": {
   "listTitle": "The Ant and the Grasshopper",
   "cards": [
    {
     "emoji": "🐜",
     "en": "The ant works all summer.",
     "ar": "النملة تشتغل طول الصيف.",
     "hl": "works"
    },
    {
     "emoji": "🌾",
     "en": "She carries food to her home.",
     "ar": "تشيل أكل لبيتها.",
     "hl": "food"
    },
    {
     "emoji": "🦗",
     "en": "The grasshopper sings and plays.",
     "ar": "الجرادة تغني وتلعب.",
     "hl": "sings"
    },
    {
     "emoji": "🥶",
     "en": "Then winter comes.",
     "ar": "بعدين يجي الشتاء.",
     "hl": "winter"
    },
    {
     "emoji": "😟",
     "en": "The grasshopper has no food.",
     "ar": "الجرادة ما عندها أكل.",
     "hl": "food"
    },
    {
     "emoji": "🤲",
     "en": "The ant shares her food.",
     "ar": "النملة تشاركها أكلها.",
     "hl": "shares"
    }
   ],
   "say": "The Ant and the Grasshopper The ant works all summer. She carries food to her home. The grasshopper sings and plays. Then winter comes. The grasshopper has no food. The ant shares her food."
  }
 },
 {
  "id": "lama-114",
  "order": 114,
  "levelId": "l4",
  "titleAr": "قصة: الجمل في الصحراء",
  "titleEn": "Story: The Camel in the Desert",
  "content": {
   "explanationAr": "قصة عن جمل يمشي في الصحراء.",
   "altExplanationAr": "الكلمات المهمة: camel و desert و sand.",
   "example": [
    {
     "en": "Jamal is a strong camel.",
     "ar": "جمال جمل قوي."
    },
    {
     "en": "He walks in the desert.",
     "ar": "يمشي في الصحراء."
    },
    {
     "en": "The sand is very hot.",
     "ar": "الرمل حار مرة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Jamal is a strong ___.",
    "options": [
     "candle",
     "cable",
     "camel"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He walks in the ___.",
     "options": [
      "desert",
      "dessert",
      "dinner"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "The sand is very hot.",
     "options": [
      "يشيل شناط ثقيلة.",
      "الرمل حار مرة.",
      "ما يحتاج ماي كثير."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He carries ___ bags.",
     "options": [
      "happy",
      "hairy",
      "heavy"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Story: The Camel in the Desert"
   },
   {
    "kind": "highlight",
    "text": "The Camel in the Desert"
   },
   {
    "kind": "example",
    "en": "Jamal is a strong camel.",
    "ar": "جمال جمل قوي."
   },
   {
    "kind": "example",
    "en": "He walks in the desert.",
    "ar": "يمشي في الصحراء."
   }
  ],
  "kids": {
   "listTitle": "The Camel in the Desert",
   "cards": [
    {
     "emoji": "🐪",
     "en": "Jamal is a strong camel.",
     "ar": "جمال جمل قوي.",
     "hl": "camel"
    },
    {
     "emoji": "🏜️",
     "en": "He walks in the desert.",
     "ar": "يمشي في الصحراء.",
     "hl": "desert"
    },
    {
     "emoji": "☀️",
     "en": "The sand is very hot.",
     "ar": "الرمل حار مرة.",
     "hl": "sand"
    },
    {
     "emoji": "🎒",
     "en": "He carries heavy bags.",
     "ar": "يشيل شناط ثقيلة.",
     "hl": "heavy"
    },
    {
     "emoji": "💧",
     "en": "He does not need much water.",
     "ar": "ما يحتاج ماي كثير.",
     "hl": "need"
    },
    {
     "emoji": "🌴",
     "en": "At night, he rests under a palm tree.",
     "ar": "بالليل، يرتاح تحت نخلة.",
     "hl": "rests"
    }
   ],
   "say": "The Camel in the Desert Jamal is a strong camel. He walks in the desert. The sand is very hot. He carries heavy bags. He does not need much water. At night, he rests under a palm tree."
  }
 },
 {
  "id": "lama-115",
  "order": 115,
  "levelId": "l4",
  "titleAr": "قصة: الحذاء الضايع",
  "titleEn": "Story: The Lost Shoe",
  "content": {
   "explanationAr": "قصة عن ولد ضيّع جزمته قبل المدرسة.",
   "altExplanationAr": "تابع: وين لقاها في الأخير؟",
   "example": [
    {
     "en": "Khalid can't find his shoe.",
     "ar": "خالد ما يلقى جزمته."
    },
    {
     "en": "He looks under the bed.",
     "ar": "يدور تحت السرير."
    },
    {
     "en": "He looks behind the door.",
     "ar": "يدور ورا الباب."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Khalid can't find his ___.",
    "options": [
     "shoe",
     "show",
     "shop"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "He looks ___ the bed.",
     "options": [
      "uncle",
      "under",
      "over"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "He looks behind the door.",
     "options": [
      "تأخر الوقت!",
      "كلبه ماخذ الجزمة!",
      "يدور ورا الباب."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "It is ___!",
     "options": [
      "late",
      "lake",
      "lane"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Story: The Lost Shoe"
   },
   {
    "kind": "highlight",
    "text": "The Lost Shoe"
   },
   {
    "kind": "example",
    "en": "Khalid can't find his shoe.",
    "ar": "خالد ما يلقى جزمته."
   },
   {
    "kind": "example",
    "en": "He looks under the bed.",
    "ar": "يدور تحت السرير."
   }
  ],
  "kids": {
   "listTitle": "The Lost Shoe",
   "cards": [
    {
     "emoji": "👟",
     "en": "Khalid can't find his shoe.",
     "ar": "خالد ما يلقى جزمته.",
     "hl": "shoe"
    },
    {
     "emoji": "🛏️",
     "en": "He looks under the bed.",
     "ar": "يدور تحت السرير.",
     "hl": "under"
    },
    {
     "emoji": "🚪",
     "en": "He looks behind the door.",
     "ar": "يدور ورا الباب.",
     "hl": "behind"
    },
    {
     "emoji": "⏰",
     "en": "It is late!",
     "ar": "تأخر الوقت!",
     "hl": "late"
    },
    {
     "emoji": "🐶",
     "en": "His dog has the shoe!",
     "ar": "كلبه ماخذ الجزمة!",
     "hl": "dog"
    },
    {
     "emoji": "😂",
     "en": "Khalid laughs and runs to the bus.",
     "ar": "خالد يضحك ويركض للباص.",
     "hl": "laughs"
    }
   ],
   "say": "The Lost Shoe Khalid can't find his shoe. He looks under the bed. He looks behind the door. It is late! His dog has the shoe! Khalid laughs and runs to the bus."
  }
 },
 {
  "id": "lama-116",
  "order": 116,
  "levelId": "l4",
  "titleAr": "قصة: النجمة الصغيرة",
  "titleEn": "Story: The Little Star",
  "content": {
   "explanationAr": "قصة هادية قبل النوم عن نجمة صغيرة.",
   "altExplanationAr": "اقرأها بصوت هادي كأنها قصة نوم.",
   "example": [
    {
     "en": "A little star lives in the sky.",
     "ar": "نجمة صغيرة تعيش في السماء."
    },
    {
     "en": "Every night, she shines.",
     "ar": "كل ليلة، تلمع."
    },
    {
     "en": "She looks down at the world.",
     "ar": "تطالع العالم تحت."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "A little ___ lives in the sky.",
    "options": [
     "stair",
     "star",
     "stone"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "Every night, she ___.",
     "options": [
      "shoes",
      "shells",
      "shines"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "She looks down at the world.",
     "options": [
      "تطالع العالم تحت.",
      "تشوف بنت عند شباك.",
      "البنت تأشّر للنجمة."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She sees a ___ at a window.",
     "options": [
      "goal",
      "girl",
      "gold"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Story: The Little Star"
   },
   {
    "kind": "highlight",
    "text": "The Little Star"
   },
   {
    "kind": "example",
    "en": "A little star lives in the sky.",
    "ar": "نجمة صغيرة تعيش في السماء."
   },
   {
    "kind": "example",
    "en": "Every night, she shines.",
    "ar": "كل ليلة، تلمع."
   }
  ],
  "kids": {
   "listTitle": "The Little Star",
   "cards": [
    {
     "emoji": "⭐",
     "en": "A little star lives in the sky.",
     "ar": "نجمة صغيرة تعيش في السماء.",
     "hl": "star"
    },
    {
     "emoji": "🌃",
     "en": "Every night, she shines.",
     "ar": "كل ليلة، تلمع.",
     "hl": "shines"
    },
    {
     "emoji": "🌍",
     "en": "She looks down at the world.",
     "ar": "تطالع العالم تحت.",
     "hl": "world"
    },
    {
     "emoji": "👧",
     "en": "She sees a girl at a window.",
     "ar": "تشوف بنت عند شباك.",
     "hl": "girl"
    },
    {
     "emoji": "👋",
     "en": "The girl waves at the star.",
     "ar": "البنت تأشّر للنجمة.",
     "hl": "waves"
    },
    {
     "emoji": "🌙",
     "en": "\"Good night, little star,\" she says.",
     "ar": "«تصبحين على خير يا نجمة صغيرة»، تقول.",
     "hl": "night"
    }
   ],
   "say": "The Little Star A little star lives in the sky. Every night, she shines. She looks down at the world. She sees a girl at a window. The girl waves at the star. \"Good night, little star,\" she says."
  }
 },
 {
  "id": "lama-117",
  "order": 117,
  "levelId": "l4",
  "titleAr": "قصة: المزرعة",
  "titleEn": "Story: On the Farm",
  "content": {
   "explanationAr": "قصة عن زيارة مزرعة جدي.",
   "altExplanationAr": "الكلمات المهمة: farm و cow و eggs.",
   "example": [
    {
     "en": "We visit Grandpa's farm.",
     "ar": "نزور مزرعة جدي."
    },
    {
     "en": "A cow gives us milk.",
     "ar": "البقرة تعطينا حليب."
    },
    {
     "en": "The rooster wakes us up.",
     "ar": "الديك يصحينا."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "We visit Grandpa's ___.",
    "options": [
     "form",
     "firm",
     "farm"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "A cow gives us ___.",
     "options": [
      "milk",
      "mill",
      "mask"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "The rooster wakes us up.",
     "options": [
      "أجمع البيض في سلة.",
      "الديك يصحينا.",
      "الخرفان تاكل عشب أخضر."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I ___ eggs in a basket.",
     "options": [
      "correct",
      "connect",
      "collect"
     ],
     "correctIndex": 2
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Story: On the Farm"
   },
   {
    "kind": "highlight",
    "text": "On the Farm"
   },
   {
    "kind": "example",
    "en": "We visit Grandpa's farm.",
    "ar": "نزور مزرعة جدي."
   },
   {
    "kind": "example",
    "en": "A cow gives us milk.",
    "ar": "البقرة تعطينا حليب."
   }
  ],
  "kids": {
   "listTitle": "On the Farm",
   "cards": [
    {
     "emoji": "🚜",
     "en": "We visit Grandpa's farm.",
     "ar": "نزور مزرعة جدي.",
     "hl": "farm"
    },
    {
     "emoji": "🐄",
     "en": "A cow gives us milk.",
     "ar": "البقرة تعطينا حليب.",
     "hl": "milk"
    },
    {
     "emoji": "🐓",
     "en": "The rooster wakes us up.",
     "ar": "الديك يصحينا.",
     "hl": "rooster"
    },
    {
     "emoji": "🧺",
     "en": "I collect eggs in a basket.",
     "ar": "أجمع البيض في سلة.",
     "hl": "collect"
    },
    {
     "emoji": "🐑",
     "en": "The sheep eat green grass.",
     "ar": "الخرفان تاكل عشب أخضر.",
     "hl": "grass"
    },
    {
     "emoji": "🌅",
     "en": "We go home at sunset.",
     "ar": "نرجع البيت وقت الغروب.",
     "hl": "sunset"
    }
   ],
   "say": "On the Farm We visit Grandpa's farm. A cow gives us milk. The rooster wakes us up. I collect eggs in a basket. The sheep eat green grass. We go home at sunset."
  }
 },
 {
  "id": "lama-118",
  "order": 118,
  "levelId": "l4",
  "titleAr": "قصة: الرسمة",
  "titleEn": "Story: The Drawing",
  "content": {
   "explanationAr": "قصة عن بنت ترسم هدية لأمها.",
   "altExplanationAr": "لاحظ الألوان في القصة.",
   "example": [
    {
     "en": "Rana takes her crayons.",
     "ar": "رنا تاخذ ألوانها."
    },
    {
     "en": "She draws a yellow sun.",
     "ar": "ترسم شمس صفرا."
    },
    {
     "en": "She draws a house with a red door.",
     "ar": "ترسم بيت بباب أحمر."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "Rana takes her ___.",
    "options": [
     "crayons",
     "crowns",
     "crabs"
    ],
    "correctIndex": 0
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She ___ a yellow sun.",
     "options": [
      "drives",
      "draws",
      "drinks"
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "She draws a house with a red door.",
     "options": [
      "ترسم أمها ونفسها.",
      "تعطيها أمها.",
      "ترسم بيت بباب أحمر."
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "She draws Mom and ___.",
     "options": [
      "herself",
      "himself",
      "myself"
     ],
     "correctIndex": 0
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Story: The Drawing"
   },
   {
    "kind": "highlight",
    "text": "The Drawing"
   },
   {
    "kind": "example",
    "en": "Rana takes her crayons.",
    "ar": "رنا تاخذ ألوانها."
   },
   {
    "kind": "example",
    "en": "She draws a yellow sun.",
    "ar": "ترسم شمس صفرا."
   }
  ],
  "kids": {
   "listTitle": "The Drawing",
   "cards": [
    {
     "emoji": "🖍️",
     "en": "Rana takes her crayons.",
     "ar": "رنا تاخذ ألوانها.",
     "hl": "crayons"
    },
    {
     "emoji": "☀️",
     "en": "She draws a yellow sun.",
     "ar": "ترسم شمس صفرا.",
     "hl": "draws"
    },
    {
     "emoji": "🏡",
     "en": "She draws a house with a red door.",
     "ar": "ترسم بيت بباب أحمر.",
     "hl": "door"
    },
    {
     "emoji": "👩‍👧",
     "en": "She draws Mom and herself.",
     "ar": "ترسم أمها ونفسها.",
     "hl": "herself"
    },
    {
     "emoji": "💝",
     "en": "She gives it to Mom.",
     "ar": "تعطيها أمها.",
     "hl": "gives"
    },
    {
     "emoji": "🥰",
     "en": "Mom hugs her and smiles.",
     "ar": "ماما تحضنها وتبتسم.",
     "hl": "hugs"
    }
   ],
   "say": "The Drawing Rana takes her crayons. She draws a yellow sun. She draws a house with a red door. She draws Mom and herself. She gives it to Mom. Mom hugs her and smiles."
  }
 },
 {
  "id": "lama-119",
  "order": 119,
  "levelId": "l4",
  "titleAr": "مراجعة القصص ١",
  "titleEn": "Stories Review 1",
  "content": {
   "explanationAr": "نراجع جمل من قصصنا. اقرأ واختر الكلمة الصح.",
   "altExplanationAr": "تذكر القصص: القطة، الأرنب والسلحفاة، البذرة.",
   "example": [
    {
     "en": "The fox runs into the woods.",
     "ar": "الثعلب يركض للغابة."
    },
    {
     "en": "The snail climbs a wall.",
     "ar": "الحلزون يطلع على جدار."
    },
    {
     "en": "A red apple falls from the tree.",
     "ar": "تفاحة حمرا تطيح من الشجرة."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "The fox runs into the ___.",
    "options": [
     "words",
     "woods",
     "wools"
    ],
    "correctIndex": 1
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The snail ___ a wall.",
     "options": [
      "clips",
      "claps",
      "climbs"
     ],
     "correctIndex": 2
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "A red apple falls from the tree.",
     "options": [
      "تفاحة حمرا تطيح من الشجرة.",
      "البومة تصحى بالليل.",
      "بعد المطر، نشوف قوس قزح."
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "The ___ wakes up at night.",
     "options": [
      "oil",
      "owl",
      "own"
     ],
     "correctIndex": 1
    }
   ]
  },
  "board": [
   {
    "kind": "title",
    "text": "Stories Review 1"
   },
   {
    "kind": "highlight",
    "text": "Review"
   },
   {
    "kind": "example",
    "en": "The fox runs into the woods.",
    "ar": "الثعلب يركض للغابة."
   },
   {
    "kind": "example",
    "en": "The snail climbs a wall.",
    "ar": "الحلزون يطلع على جدار."
   }
  ],
  "kids": {
   "listTitle": "Review",
   "cards": [
    {
     "emoji": "🦊",
     "en": "The fox runs into the woods.",
     "ar": "الثعلب يركض للغابة.",
     "hl": "woods"
    },
    {
     "emoji": "🐌",
     "en": "The snail climbs a wall.",
     "ar": "الحلزون يطلع على جدار.",
     "hl": "climbs"
    },
    {
     "emoji": "🍎",
     "en": "A red apple falls from the tree.",
     "ar": "تفاحة حمرا تطيح من الشجرة.",
     "hl": "falls"
    },
    {
     "emoji": "🦉",
     "en": "The owl wakes up at night.",
     "ar": "البومة تصحى بالليل.",
     "hl": "owl"
    },
    {
     "emoji": "🌈",
     "en": "After the rain, we see a rainbow.",
     "ar": "بعد المطر، نشوف قوس قزح.",
     "hl": "rainbow"
    },
    {
     "emoji": "🐿️",
     "en": "The squirrel hides a nut.",
     "ar": "السنجاب يخبي حبة جوز.",
     "hl": "hides"
    }
   ],
   "say": "Review The fox runs into the woods. The snail climbs a wall. A red apple falls from the tree. The owl wakes up at night. After the rain, we see a rainbow. The squirrel hides a nut."
  }
 },
 {
  "id": "lama-120",
  "order": 120,
  "levelId": "l4",
  "titleAr": "مراجعة المستوى الرابع",
  "titleEn": "Level 4 Review",
  "content": {
   "explanationAr": "مراجعة نهائية لمستوى القصص. أنت الحين تقرأ جمل كاملة!",
   "altExplanationAr": "اقرأ كل جملة بصوت عالي، وافتخر بنفسك.",
   "example": [
    {
     "en": "I can read a whole story.",
     "ar": "أقدر أقرأ قصة كاملة."
    },
    {
     "en": "My friends read with me.",
     "ar": "أصدقائي يقرون معي."
    },
    {
     "en": "I get a gold star.",
     "ar": "آخذ نجمة ذهبية."
    }
   ],
   "check": {
    "promptAr": "اختر الكلمة الناقصة",
    "promptEn": "I can read a whole ___.",
    "options": [
     "store",
     "stone",
     "story"
    ],
    "correctIndex": 2
   },
   "exercises": [
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "My friends ___ with me.",
     "options": [
      "read",
      "red",
      "road"
     ],
     "correctIndex": 0
    },
    {
     "promptAr": "وش معنى الجملة؟",
     "promptEn": "I get a gold star.",
     "options": [
      "أقرأ بصوت عالي.",
      "آخذ نجمة ذهبية.",
      "كتابي المفضل فيه صور كثيرة."
     ],
     "correctIndex": 1
    },
    {
     "promptAr": "اختر الكلمة الناقصة",
     "promptEn": "I read out ___.",
     "options": [
      "load",
      "lord",
      "loud"
     ],
     "correctIndex": 2
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
    "text": "Review"
   },
   {
    "kind": "example",
    "en": "I can read a whole story.",
    "ar": "أقدر أقرأ قصة كاملة."
   },
   {
    "kind": "example",
    "en": "My friends read with me.",
    "ar": "أصدقائي يقرون معي."
   }
  ],
  "kids": {
   "listTitle": "Review",
   "cards": [
    {
     "emoji": "📚",
     "en": "I can read a whole story.",
     "ar": "أقدر أقرأ قصة كاملة.",
     "hl": "story"
    },
    {
     "emoji": "🧑‍🤝‍🧑",
     "en": "My friends read with me.",
     "ar": "أصدقائي يقرون معي.",
     "hl": "read"
    },
    {
     "emoji": "🏅",
     "en": "I get a gold star.",
     "ar": "آخذ نجمة ذهبية.",
     "hl": "gold"
    },
    {
     "emoji": "🗣️",
     "en": "I read out loud.",
     "ar": "أقرأ بصوت عالي.",
     "hl": "loud"
    },
    {
     "emoji": "📖",
     "en": "My favorite book has many pictures.",
     "ar": "كتابي المفضل فيه صور كثيرة.",
     "hl": "pictures"
    },
    {
     "emoji": "🌟",
     "en": "Reading is fun!",
     "ar": "القراءة ممتعة!",
     "hl": "fun"
    }
   ],
   "say": "Review I can read a whole story. My friends read with me. I get a gold star. I read out loud. My favorite book has many pictures. Reading is fun!"
  }
 }
];
