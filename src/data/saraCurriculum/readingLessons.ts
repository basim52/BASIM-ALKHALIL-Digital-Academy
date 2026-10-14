import { SaraCurriculumLesson } from './types';

// Rebuilt Sara curriculum (Expressive Reading & Pronunciation Lab): 30 lessons, 6 units, CEFR Pre-A1 to B2.
// Generated from structured lesson sources; each lesson has vocabulary, dialogue, listening, pronunciation,
// 3-tier exercises, spiral review and a mastery check.

export const SARA_READING_PHONETICS_LESSONS: SaraCurriculumLesson[] = [
  {
    "id": "srp_301",
    "pillarId": "reading",
    "pillarNameAr": "القراءة التعبيرية والنطق الصوتي",
    "pillarNameEn": "Expressive Reading & Pronunciation Lab",
    "pillarIcon": "📖",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "أصوات الحروف A إلى M",
    "titleEn": "Letter Sounds A–M (Phonics 1)",
    "descAr": "اعرف صوت كل حرف (مو اسمه) عشان تقرأ أي كلمة: a في apple، b في ball...",
    "descEn": "Learn each letter's sound (not its name) to start reading: a as in apple, b as in ball...",
    "speakingGoalAr": "اقرأ عشر كلمات بصوت الحرف الأول صح.",
    "speakingGoalEn": "Read ten words with the correct first sound.",
    "keyPattern": {
      "ruleAr": "لكل حرف اسم (bee) وصوت (/b/). في القراءة نستخدم الصوت. الحروف المتحركة القصيرة: a /æ/، e /ɛ/، i /ɪ/.",
      "ruleEn": "Each letter has a name and a sound; reading uses the sound. Short vowels: a /æ/, e /ɛ/, i /ɪ/.",
      "formula": "letter → sound → word: b /b/ + a /æ/ + g /ɡ/ = bag"
    },
    "practicalExamples": [
      {
        "en": "A is for apple.",
        "ar": "A لـ apple (تفاحة)."
      },
      {
        "en": "B is for ball.",
        "ar": "B لـ ball (كورة)."
      },
      {
        "en": "C is for cat.",
        "ar": "C لـ cat (قطة)."
      },
      {
        "en": "D is for dog.",
        "ar": "D لـ dog (كلب)."
      },
      {
        "en": "I can see a big jam jar.",
        "ar": "أشوف مرطبان مربى كبير."
      },
      {
        "en": "Kim has a red hat.",
        "ar": "كيم عندها قبعة حمراء."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "ball read as /bi:/-all",
        "correct": "ball /bɔːl/",
        "whyAr": "نقرأ بصوت الحرف /b/ وليس اسمه «بي»."
      },
      {
        "incorrect": "cat read as /siː/-at",
        "correct": "cat /kæt/",
        "whyAr": "c قبل a تنطق /k/."
      },
      {
        "incorrect": "jam read as /ɡæm/",
        "correct": "jam /dʒæm/",
        "whyAr": "j دائماً «ج»."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اقرأ لسارة: Sam has a cat. The cat is fat.",
      "promptEn": "Read aloud: Sam has a cat. The cat is fat.",
      "saraQuestionAr": "اقرأ الجملتين وأنا أسمعك!",
      "saraQuestionEn": "Read the two sentences, I'm listening!",
      "recommendedResponseEn": "Sam has a cat. The cat is fat."
    },
    "quiz": [
      {
        "questionAr": "أي كلمة تبدأ بصوت /k/؟",
        "questionEn": "Which word starts with /k/?",
        "options": [
          "cat",
          "milk",
          "goat"
        ],
        "correctIndex": 0,
        "explanationAr": "c في cat = /k/."
      },
      {
        "questionAr": "صوت الحرف j:",
        "questionEn": "Sound of j:",
        "options": [
          "/dʒ/ ج",
          "/j/ ي",
          "/ɡ/ ق"
        ],
        "correctIndex": 0,
        "explanationAr": "j = ج."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "ball read as /bi:/-all",
          "ball /bɔːl/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: ball /bɔːl/ — نقرأ بصوت الحرف /b/ وليس اسمه «بي»."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "cat read as /siː/-at",
          "cat /kæt/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: cat /kæt/ — c قبل a تنطق /k/."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "jam read as /ɡæm/",
          "jam /dʒæm/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: jam /dʒæm/ — j دائماً «ج»."
      }
    ],
    "whiteboardNotes": {
      "title": "Letter Sounds A–M (Phonics 1)",
      "pointsAr": [
        "يربط الحروف A–M بأصواتها.",
        "يميز اسم الحرف من صوته.",
        "يقرأ كلمات من ثلاثة أصوات.",
        "لكل حرف اسم (bee) وصوت (/b/). في القراءة نستخدم الصوت. الحروف المتحركة القصيرة: a /æ/، e /ɛ/، i /ɪ/."
      ],
      "pointsEn": [
        "Match letters A–M to sounds.",
        "Separate letter names from sounds.",
        "Blend three-sound words.",
        "Each letter has a name and a sound; reading uses the sound. Short vowels: a /æ/, e /ɛ/, i /ɪ/."
      ],
      "chalkHighlight": "letter → sound → word: b /b/ + a /æ/ + g /ɡ/ = bag"
    },
    "unit": 1,
    "cefr": "Pre-A1",
    "objectivesAr": [
      "يربط الحروف A–M بأصواتها.",
      "يميز اسم الحرف من صوته.",
      "يقرأ كلمات من ثلاثة أصوات."
    ],
    "objectivesEn": [
      "Match letters A–M to sounds.",
      "Separate letter names from sounds.",
      "Blend three-sound words."
    ],
    "vocabulary": [
      {
        "word": "apple",
        "ipa": "/ˈæpəl/",
        "ar": "تفاحة",
        "exampleEn": "a red apple",
        "exampleAr": "تفاحة حمراء"
      },
      {
        "word": "ball",
        "ipa": "/bɔːl/",
        "ar": "كورة",
        "exampleEn": "kick the ball",
        "exampleAr": "اشلت الكورة"
      },
      {
        "word": "cat",
        "ipa": "/kæt/",
        "ar": "قطة",
        "exampleEn": "a small cat",
        "exampleAr": "قطة صغيرة"
      },
      {
        "word": "dog",
        "ipa": "/dɔːɡ/",
        "ar": "كلب",
        "exampleEn": "a big dog",
        "exampleAr": "كلب كبير"
      },
      {
        "word": "egg",
        "ipa": "/ɛɡ/",
        "ar": "بيضة",
        "exampleEn": "an egg",
        "exampleAr": "بيضة"
      },
      {
        "word": "fish",
        "ipa": "/fɪʃ/",
        "ar": "سمكة",
        "exampleEn": "a fish",
        "exampleAr": "سمكة"
      },
      {
        "word": "goat",
        "ipa": "/ɡoʊt/",
        "ar": "عنز",
        "exampleEn": "a goat on the farm",
        "exampleAr": "عنز في المزرعة"
      },
      {
        "word": "hat",
        "ipa": "/hæt/",
        "ar": "قبعة",
        "exampleEn": "a red hat",
        "exampleAr": "قبعة حمراء"
      },
      {
        "word": "jam",
        "ipa": "/dʒæm/",
        "ar": "مربى",
        "exampleEn": "jam on bread",
        "exampleAr": "مربى على خبز"
      },
      {
        "word": "milk",
        "ipa": "/mɪlk/",
        "ar": "حليب",
        "exampleEn": "a glass of milk",
        "exampleAr": "كاس حليب"
      }
    ],
    "grammarFocus": {
      "ruleAr": "لكل حرف اسم (bee) وصوت (/b/). في القراءة نستخدم الصوت. الحروف المتحركة القصيرة: a /æ/، e /ɛ/، i /ɪ/.",
      "ruleEn": "Each letter has a name and a sound; reading uses the sound. Short vowels: a /æ/, e /ɛ/, i /ɪ/.",
      "formula": "letter → sound → word: b /b/ + a /æ/ + g /ɡ/ = bag",
      "examples": [
        {
          "en": "A is for apple.",
          "ar": "A لـ apple (تفاحة)."
        },
        {
          "en": "B is for ball.",
          "ar": "B لـ ball (كورة)."
        },
        {
          "en": "C is for cat.",
          "ar": "C لـ cat (قطة)."
        },
        {
          "en": "D is for dog.",
          "ar": "D لـ dog (كلب)."
        },
        {
          "en": "I can see a big jam jar.",
          "ar": "أشوف مرطبان مربى كبير."
        },
        {
          "en": "Kim has a red hat.",
          "ar": "كيم عندها قبعة حمراء."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Text",
        "en": "Sam has a cat.",
        "ar": "سام عنده قطة."
      },
      {
        "speaker": "Text",
        "en": "The cat is fat.",
        "ar": "القطة سمينة."
      },
      {
        "speaker": "Text",
        "en": "The cat can see a ball.",
        "ar": "القطة تشوف كورة."
      },
      {
        "speaker": "Text",
        "en": "Sam has a dog.",
        "ar": "سام عنده كلب."
      },
      {
        "speaker": "Text",
        "en": "The dog can get the ball.",
        "ar": "الكلب يقدر يجيب الكورة."
      },
      {
        "speaker": "Text",
        "en": "Bad dog! Mad cat!",
        "ar": "كلب شقي! قطة زعلانة!"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Text: Sam has a cat.\nText: The cat is fat.\nText: The cat can see a ball.\nText: Sam has a dog.\nText: The dog can get the ball.\nText: Bad dog! Mad cat!",
      "questions": [
        {
          "questionAr": "وش عند سام؟",
          "questionEn": "What does Sam have?",
          "options": [
            "a cat and a dog",
            "a fish",
            "a goat"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: a cat and a dog"
        },
        {
          "questionAr": "كيف القطة؟",
          "questionEn": "What is the cat like?",
          "options": [
            "fat",
            "small",
            "red"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: fat"
        },
        {
          "questionAr": "مين ياخذ الكورة؟",
          "questionEn": "Who gets the ball?",
          "options": [
            "the cat",
            "the dog",
            "Sam"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: the dog"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Short vowels /æ/ cat, /ɛ/ egg, /ɪ/ fish",
      "items": [
        "cat /kæt/",
        "egg /ɛɡ/",
        "fish /fɪʃ/",
        "hat /hæt/ vs hot /hɑːt/"
      ],
      "tipAr": "صوت /æ/ بين الفتحة والكسرة، افتح فمك أكثر من «إ» وأقل من «آ»."
    },
    "exercises": {
      "easy": [
        {
          "id": "srp_301_e1",
          "type": "meaning",
          "promptEn": "What does \"apple\" mean?",
          "promptAr": "ما معنى \"apple\"؟",
          "options": [
            "بيضة",
            "تفاحة",
            "كورة",
            "سمكة"
          ],
          "correctIndex": 1,
          "answer": "تفاحة",
          "explanationAr": "\"apple\" /ˈæpəl/ تعني: تفاحة. مثال: a red apple"
        },
        {
          "id": "srp_301_e2",
          "type": "meaning",
          "promptEn": "What does \"ball\" mean?",
          "promptAr": "ما معنى \"ball\"؟",
          "options": [
            "حليب",
            "مربى",
            "بيضة",
            "كورة"
          ],
          "correctIndex": 3,
          "answer": "كورة",
          "explanationAr": "\"ball\" /bɔːl/ تعني: كورة. مثال: kick the ball"
        },
        {
          "id": "srp_301_e3",
          "type": "meaning",
          "promptEn": "What does \"cat\" mean?",
          "promptAr": "ما معنى \"cat\"؟",
          "options": [
            "قبعة",
            "كلب",
            "تفاحة",
            "قطة"
          ],
          "correctIndex": 3,
          "answer": "قطة",
          "explanationAr": "\"cat\" /kæt/ تعني: قطة. مثال: a small cat"
        },
        {
          "id": "srp_301_e4",
          "type": "meaning",
          "promptEn": "What does \"dog\" mean?",
          "promptAr": "ما معنى \"dog\"؟",
          "options": [
            "مربى",
            "بيضة",
            "كلب",
            "قبعة"
          ],
          "correctIndex": 2,
          "answer": "كلب",
          "explanationAr": "\"dog\" /dɔːɡ/ تعني: كلب. مثال: a big dog"
        }
      ],
      "medium": [
        {
          "id": "srp_301_m1",
          "type": "gap",
          "promptEn": "Complete: A is for ____.",
          "promptAr": "أكمل الفراغ: (A لـ apple (تفاحة).)",
          "options": [
            "egg",
            "ice",
            "apple"
          ],
          "correctIndex": 2,
          "answer": "A is for apple.",
          "explanationAr": "الإجابة: apple. لكل حرف اسم (bee) وصوت (/b/). في القراءة نستخدم الصوت. الحروف المتحركة القصيرة: a /æ/، e /ɛ/، i /ɪ/."
        },
        {
          "id": "srp_301_m2",
          "type": "gap",
          "promptEn": "Complete: B is for ____.",
          "promptAr": "أكمل الفراغ: (B لـ ball (كورة).)",
          "options": [
            "doll",
            "ball",
            "fall"
          ],
          "correctIndex": 1,
          "answer": "B is for ball.",
          "explanationAr": "الإجابة: ball. لكل حرف اسم (bee) وصوت (/b/). في القراءة نستخدم الصوت. الحروف المتحركة القصيرة: a /æ/، e /ɛ/، i /ɪ/."
        },
        {
          "id": "srp_301_m3",
          "type": "gap",
          "promptEn": "Complete: C is for ____.",
          "promptAr": "أكمل الفراغ: (C لـ cat (قطة).)",
          "options": [
            "hat",
            "cat",
            "sat"
          ],
          "correctIndex": 1,
          "answer": "C is for cat.",
          "explanationAr": "الإجابة: cat. لكل حرف اسم (bee) وصوت (/b/). في القراءة نستخدم الصوت. الحروف المتحركة القصيرة: a /æ/، e /ɛ/، i /ɪ/."
        },
        {
          "id": "srp_301_m4",
          "type": "gap",
          "promptEn": "Complete: D is for ____.",
          "promptAr": "أكمل الفراغ: (D لـ dog (كلب).)",
          "options": [
            "fog",
            "log",
            "dog"
          ],
          "correctIndex": 2,
          "answer": "D is for dog.",
          "explanationAr": "الإجابة: dog. لكل حرف اسم (bee) وصوت (/b/). في القراءة نستخدم الصوت. الحروف المتحركة القصيرة: a /æ/، e /ɛ/، i /ɪ/."
        }
      ],
      "hard": [
        {
          "id": "srp_301_h1",
          "type": "order",
          "promptEn": "Put the words in order: jar. / see / jam / can / I / big / a",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (أشوف مرطبان مربى كبير.)",
          "answer": "I can see a big jam jar.",
          "explanationAr": "الترتيب الصحيح: I can see a big jam jar."
        },
        {
          "id": "srp_301_h2",
          "type": "order",
          "promptEn": "Put the words in order: a / hat. / red / has / Kim",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (كيم عندها قبعة حمراء.)",
          "answer": "Kim has a red hat.",
          "explanationAr": "الترتيب الصحيح: Kim has a red hat."
        },
        {
          "id": "srp_301_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: B لـ ball (كورة).",
          "answer": "B is for ball.",
          "explanationAr": "ترجمة مقترحة: B is for ball."
        },
        {
          "id": "srp_301_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: D لـ dog (كلب).",
          "answer": "D is for dog.",
          "explanationAr": "ترجمة مقترحة: D is for dog."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Reading 'cat' as «سي-إيه-تي»",
        "correct": "Blend the sounds: /k/ /æ/ /t/ → cat",
        "whyAr": "التهجئة بأسماء الحروف ما تساعد على القراءة؛ ادمج الأصوات."
      },
      {
        "incorrect": "bed and bad sound the same",
        "correct": "bed /bɛd/ vs bad /bæd/",
        "whyAr": "العربي ما يفرق بينهم؛ تمرّن على فتح الفم."
      }
    ],
    "reviewOfPrevious": [],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (C لـ cat (قطة).)",
          "questionEn": "Complete: C is for ____.",
          "options": [
            "hat",
            "cat",
            "sat"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: cat. لكل حرف اسم (bee) وصوت (/b/). في القراءة نستخدم الصوت. الحروف المتحركة القصيرة: a /æ/، e /ɛ/، i /ɪ/."
        },
        {
          "questionAr": "أكمل الفراغ: (D لـ dog (كلب).)",
          "questionEn": "Complete: D is for ____.",
          "options": [
            "fog",
            "log",
            "dog"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: dog. لكل حرف اسم (bee) وصوت (/b/). في القراءة نستخدم الصوت. الحروف المتحركة القصيرة: a /æ/، e /ɛ/، i /ɪ/."
        },
        {
          "questionAr": "ما معنى \"egg\"؟",
          "questionEn": "What does \"egg\" mean?",
          "options": [
            "بيضة",
            "كلب",
            "عنز",
            "مربى"
          ],
          "correctIndex": 0,
          "explanationAr": "\"egg\" /ɛɡ/ تعني: بيضة. مثال: an egg"
        },
        {
          "questionAr": "ما معنى \"fish\"؟",
          "questionEn": "What does \"fish\" mean?",
          "options": [
            "سمكة",
            "كورة",
            "قطة",
            "تفاحة"
          ],
          "correctIndex": 0,
          "explanationAr": "\"fish\" /fɪʃ/ تعني: سمكة. مثال: a fish"
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Blend the sounds: /k/ /æ/ /t/ → cat",
            "Reading 'cat' as «سي-إيه-تي»"
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: Blend the sounds: /k/ /æ/ /t/ → cat — التهجئة بأسماء الحروف ما تساعد على القراءة؛ ادمج الأصوات."
        }
      ]
    }
  },
  {
    "id": "srp_304",
    "pillarId": "reading",
    "pillarNameAr": "القراءة التعبيرية والنطق الصوتي",
    "pillarNameEn": "Expressive Reading & Pronunciation Lab",
    "pillarIcon": "📖",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "أصوات الحروف N إلى Z",
    "titleEn": "Letter Sounds N–Z (Phonics 2)",
    "descAr": "كمل أصوات الحروف: n, o, p, q, r, s, t, u, v, w, x, y, z مع كلمات سهلة.",
    "descEn": "Complete the alphabet sounds N–Z with easy words.",
    "speakingGoalAr": "اقرأ جملاً قصيرة فيها كل الحروف.",
    "speakingGoalEn": "Read short sentences using all the letters.",
    "keyPattern": {
      "ruleAr": "o القصيرة /ɑ/ (hot)، u القصيرة /ʌ/ (sun). q تأتي مع u دائماً /kw/. x في آخر الكلمة /ks/. y في البداية «ي».",
      "ruleEn": "Short o /ɑ/ (hot), short u /ʌ/ (sun); qu = /kw/; x = /ks/; initial y = /j/.",
      "formula": "n /n/ o /ɑ/ p /p/ qu /kw/ r /r/ s /s/ t /t/ u /ʌ/ v /v/ w /w/ x /ks/ y /j/ z /z/"
    },
    "practicalExamples": [
      {
        "en": "The sun is hot.",
        "ar": "الشمس حارة."
      },
      {
        "en": "A pen in a box.",
        "ar": "قلم في صندوق."
      },
      {
        "en": "The queen has a red vest.",
        "ar": "الملكة عندها صدرية حمراء."
      },
      {
        "en": "Six yellow zebras.",
        "ar": "ست حمير وحشية صفراء."
      },
      {
        "en": "We run up the hill.",
        "ar": "نركض فوق التلة."
      },
      {
        "en": "A van and a web.",
        "ar": "فان وشبكة عنكبوت."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "van read as «فان» /fæn/",
        "correct": "van /væn/",
        "whyAr": "v تنطق بالشفة السفلى مع اهتزاز، وليست f."
      },
      {
        "incorrect": "pen read as «بن»",
        "correct": "pen /pɛn/",
        "whyAr": "p هواء بدون اهتزاز، وليست b."
      },
      {
        "incorrect": "sun read as /suːn/",
        "correct": "sun /sʌn/",
        "whyAr": "u القصيرة /ʌ/ «أَ»."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اقرأ لسارة: We have fun in the sun!",
      "promptEn": "Read: We have fun in the sun!",
      "saraQuestionAr": "اقرأ الجملة بصوت عالي!",
      "saraQuestionEn": "Read it out loud!",
      "recommendedResponseEn": "We have fun in the sun!"
    },
    "quiz": [
      {
        "questionAr": "أي كلمة فيها /ʌ/؟",
        "questionEn": "Which word has /ʌ/?",
        "options": [
          "sun",
          "pen",
          "box"
        ],
        "correctIndex": 0,
        "explanationAr": "sun /sʌn/."
      },
      {
        "questionAr": "qu تنطق:",
        "questionEn": "'qu' sounds:",
        "options": [
          "/k/",
          "/kw/",
          "/q/"
        ],
        "correctIndex": 1,
        "explanationAr": "queen = /kwiːn/."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "van /væn/",
          "van read as «فان» /fæn/"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: van /væn/ — v تنطق بالشفة السفلى مع اهتزاز، وليست f."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "pen read as «بن»",
          "pen /pɛn/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: pen /pɛn/ — p هواء بدون اهتزاز، وليست b."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "sun /sʌn/",
          "sun read as /suːn/"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: sun /sʌn/ — u القصيرة /ʌ/ «أَ»."
      }
    ],
    "whiteboardNotes": {
      "title": "Letter Sounds N–Z (Phonics 2)",
      "pointsAr": [
        "يربط N–Z بأصواتها.",
        "يقرأ u و o القصيرتين.",
        "يميز v من w.",
        "o القصيرة /ɑ/ (hot)، u القصيرة /ʌ/ (sun). q تأتي مع u دائماً /kw/. x في آخر الكلمة /ks/. y في البداية «ي»."
      ],
      "pointsEn": [
        "Match N–Z to sounds.",
        "Read short u and o.",
        "Tell v from w.",
        "Short o /ɑ/ (hot), short u /ʌ/ (sun); qu = /kw/; x = /ks/; initial y = /j/."
      ],
      "chalkHighlight": "n /n/ o /ɑ/ p /p/ qu /kw/ r /r/ s /s/ t /t/ u /ʌ/ v /v/ w /w/ x /ks/ y /j/ z /z/"
    },
    "unit": 1,
    "cefr": "Pre-A1",
    "objectivesAr": [
      "يربط N–Z بأصواتها.",
      "يقرأ u و o القصيرتين.",
      "يميز v من w."
    ],
    "objectivesEn": [
      "Match N–Z to sounds.",
      "Read short u and o.",
      "Tell v from w."
    ],
    "vocabulary": [
      {
        "word": "nest",
        "ipa": "/nɛst/",
        "ar": "عش",
        "exampleEn": "a bird in a nest",
        "exampleAr": "طير في عش"
      },
      {
        "word": "pen",
        "ipa": "/pɛn/",
        "ar": "قلم",
        "exampleEn": "a blue pen",
        "exampleAr": "قلم أزرق"
      },
      {
        "word": "queen",
        "ipa": "/kwiːn/",
        "ar": "ملكة",
        "exampleEn": "the queen",
        "exampleAr": "الملكة"
      },
      {
        "word": "rug",
        "ipa": "/rʌɡ/",
        "ar": "سجادة صغيرة",
        "exampleEn": "a red rug",
        "exampleAr": "سجادة حمراء"
      },
      {
        "word": "sun",
        "ipa": "/sʌn/",
        "ar": "شمس",
        "exampleEn": "the hot sun",
        "exampleAr": "الشمس الحارة"
      },
      {
        "word": "tent",
        "ipa": "/tɛnt/",
        "ar": "خيمة",
        "exampleEn": "a tent in the desert",
        "exampleAr": "خيمة في البر"
      },
      {
        "word": "van",
        "ipa": "/væn/",
        "ar": "فان",
        "exampleEn": "a white van",
        "exampleAr": "فان أبيض"
      },
      {
        "word": "web",
        "ipa": "/wɛb/",
        "ar": "شبكة عنكبوت",
        "exampleEn": "a spider web",
        "exampleAr": "شبكة عنكبوت"
      },
      {
        "word": "box",
        "ipa": "/bɑːks/",
        "ar": "صندوق",
        "exampleEn": "a big box",
        "exampleAr": "صندوق كبير"
      },
      {
        "word": "zip",
        "ipa": "/zɪp/",
        "ar": "سحاب",
        "exampleEn": "zip your bag",
        "exampleAr": "سكّر سحاب الشنطة"
      }
    ],
    "grammarFocus": {
      "ruleAr": "o القصيرة /ɑ/ (hot)، u القصيرة /ʌ/ (sun). q تأتي مع u دائماً /kw/. x في آخر الكلمة /ks/. y في البداية «ي».",
      "ruleEn": "Short o /ɑ/ (hot), short u /ʌ/ (sun); qu = /kw/; x = /ks/; initial y = /j/.",
      "formula": "n /n/ o /ɑ/ p /p/ qu /kw/ r /r/ s /s/ t /t/ u /ʌ/ v /v/ w /w/ x /ks/ y /j/ z /z/",
      "examples": [
        {
          "en": "The sun is hot.",
          "ar": "الشمس حارة."
        },
        {
          "en": "A pen in a box.",
          "ar": "قلم في صندوق."
        },
        {
          "en": "The queen has a red vest.",
          "ar": "الملكة عندها صدرية حمراء."
        },
        {
          "en": "Six yellow zebras.",
          "ar": "ست حمير وحشية صفراء."
        },
        {
          "en": "We run up the hill.",
          "ar": "نركض فوق التلة."
        },
        {
          "en": "A van and a web.",
          "ar": "فان وشبكة عنكبوت."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Text",
        "en": "It is hot. The sun is up.",
        "ar": "الجو حار. الشمس طالعة."
      },
      {
        "speaker": "Text",
        "en": "Dad has a van.",
        "ar": "أبوي عنده فان."
      },
      {
        "speaker": "Text",
        "en": "We put a tent in the van.",
        "ar": "حطينا خيمة في الفان."
      },
      {
        "speaker": "Text",
        "en": "We go to the desert.",
        "ar": "رحنا البر."
      },
      {
        "speaker": "Text",
        "en": "Six of us sit on a rug.",
        "ar": "ستة منا جلسوا على سجادة."
      },
      {
        "speaker": "Text",
        "en": "We have fun in the sun!",
        "ar": "استانسنا في الشمس!"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Text: It is hot. The sun is up.\nText: Dad has a van.\nText: We put a tent in the van.\nText: We go to the desert.\nText: Six of us sit on a rug.\nText: We have fun in the sun!",
      "questions": [
        {
          "questionAr": "وش عند الأب؟",
          "questionEn": "What does Dad have?",
          "options": [
            "a van",
            "a bus",
            "a box"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: a van"
        },
        {
          "questionAr": "وين راحوا؟",
          "questionEn": "Where do they go?",
          "options": [
            "the beach",
            "the desert",
            "the park"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: the desert"
        },
        {
          "questionAr": "كم جلسوا؟",
          "questionEn": "How many sit on the rug?",
          "options": [
            "four",
            "five",
            "six"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: six"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "/v/ vs /w/ vs /f/",
      "items": [
        "van /væn/",
        "wet /wɛt/",
        "fan /fæn/",
        "vest /vɛst/ vs west /wɛst/"
      ],
      "tipAr": "v: أسنان فوق على الشفة تحت مع اهتزاز. w: دوّر شفايفك مثل «و». f: مثل v بدون اهتزاز."
    },
    "exercises": {
      "easy": [
        {
          "id": "srp_304_e1",
          "type": "meaning",
          "promptEn": "What does \"nest\" mean?",
          "promptAr": "ما معنى \"nest\"؟",
          "options": [
            "صندوق",
            "خيمة",
            "شمس",
            "عش"
          ],
          "correctIndex": 3,
          "answer": "عش",
          "explanationAr": "\"nest\" /nɛst/ تعني: عش. مثال: a bird in a nest"
        },
        {
          "id": "srp_304_e2",
          "type": "meaning",
          "promptEn": "What does \"pen\" mean?",
          "promptAr": "ما معنى \"pen\"؟",
          "options": [
            "قلم",
            "عش",
            "ملكة",
            "شبكة عنكبوت"
          ],
          "correctIndex": 0,
          "answer": "قلم",
          "explanationAr": "\"pen\" /pɛn/ تعني: قلم. مثال: a blue pen"
        },
        {
          "id": "srp_304_e3",
          "type": "meaning",
          "promptEn": "What does \"queen\" mean?",
          "promptAr": "ما معنى \"queen\"؟",
          "options": [
            "شمس",
            "سجادة صغيرة",
            "خيمة",
            "ملكة"
          ],
          "correctIndex": 3,
          "answer": "ملكة",
          "explanationAr": "\"queen\" /kwiːn/ تعني: ملكة. مثال: the queen"
        },
        {
          "id": "srp_304_e4",
          "type": "meaning",
          "promptEn": "What does \"rug\" mean?",
          "promptAr": "ما معنى \"rug\"؟",
          "options": [
            "خيمة",
            "شمس",
            "سجادة صغيرة",
            "سحاب"
          ],
          "correctIndex": 2,
          "answer": "سجادة صغيرة",
          "explanationAr": "\"rug\" /rʌɡ/ تعني: سجادة صغيرة. مثال: a red rug"
        }
      ],
      "medium": [
        {
          "id": "srp_304_m1",
          "type": "gap",
          "promptEn": "Complete: The ____ is hot.",
          "promptAr": "أكمل الفراغ: (الشمس حارة.)",
          "options": [
            "sin",
            "sun",
            "son"
          ],
          "correctIndex": 1,
          "answer": "The sun is hot.",
          "explanationAr": "الإجابة: sun. o القصيرة /ɑ/ (hot)، u القصيرة /ʌ/ (sun). q تأتي مع u دائماً /kw/. x في آخر الكلمة /ks/. y في البداية «ي»."
        },
        {
          "id": "srp_304_m2",
          "type": "gap",
          "promptEn": "Complete: A pen in a ____.",
          "promptAr": "أكمل الفراغ: (قلم في صندوق.)",
          "options": [
            "bag",
            "box",
            "bus"
          ],
          "correctIndex": 1,
          "answer": "A pen in a box.",
          "explanationAr": "الإجابة: box. o القصيرة /ɑ/ (hot)، u القصيرة /ʌ/ (sun). q تأتي مع u دائماً /kw/. x في آخر الكلمة /ks/. y في البداية «ي»."
        },
        {
          "id": "srp_304_m3",
          "type": "gap",
          "promptEn": "Complete: The ____ has a red vest.",
          "promptAr": "أكمل الفراغ: (الملكة عندها صدرية حمراء.)",
          "options": [
            "queen",
            "quilt",
            "green"
          ],
          "correctIndex": 0,
          "answer": "The queen has a red vest.",
          "explanationAr": "الإجابة: queen. o القصيرة /ɑ/ (hot)، u القصيرة /ʌ/ (sun). q تأتي مع u دائماً /kw/. x في آخر الكلمة /ks/. y في البداية «ي»."
        },
        {
          "id": "srp_304_m4",
          "type": "gap",
          "promptEn": "Complete: ____ yellow zebras.",
          "promptAr": "أكمل الفراغ: (ست حمير وحشية صفراء.)",
          "options": [
            "Six",
            "Sick",
            "Sit"
          ],
          "correctIndex": 0,
          "answer": "Six yellow zebras.",
          "explanationAr": "الإجابة: Six. o القصيرة /ɑ/ (hot)، u القصيرة /ʌ/ (sun). q تأتي مع u دائماً /kw/. x في آخر الكلمة /ks/. y في البداية «ي»."
        }
      ],
      "hard": [
        {
          "id": "srp_304_h1",
          "type": "order",
          "promptEn": "Put the words in order: We / run / hill. / the / up",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (نركض فوق التلة.)",
          "answer": "We run up the hill.",
          "explanationAr": "الترتيب الصحيح: We run up the hill."
        },
        {
          "id": "srp_304_h2",
          "type": "order",
          "promptEn": "Put the words in order: van / and / web. / a / A",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (فان وشبكة عنكبوت.)",
          "answer": "A van and a web.",
          "explanationAr": "الترتيب الصحيح: A van and a web."
        },
        {
          "id": "srp_304_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: قلم في صندوق.",
          "answer": "A pen in a box.",
          "explanationAr": "ترجمة مقترحة: A pen in a box."
        },
        {
          "id": "srp_304_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: ست حمير وحشية صفراء.",
          "answer": "Six yellow zebras.",
          "explanationAr": "ترجمة مقترحة: Six yellow zebras."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Inserting a vowel: «إسيكس» for six",
        "correct": "six /sɪks/",
        "whyAr": "لا تضيف «إ» قبل s أو بعد x."
      },
      {
        "incorrect": "pen = ben",
        "correct": "pen /pɛn/ vs Ben /bɛn/",
        "whyAr": "حط يدك قدام فمك: مع p تحس بهواء."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (أصوات الحروف A إلى M): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "cat /kæt/",
          "cat read as /siː/-at"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: cat /kæt/ — c قبل a تنطق /k/.",
        "fromLessonId": "srp_301"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (الملكة عندها صدرية حمراء.)",
          "questionEn": "Complete: The ____ has a red vest.",
          "options": [
            "queen",
            "quilt",
            "green"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: queen. o القصيرة /ɑ/ (hot)، u القصيرة /ʌ/ (sun). q تأتي مع u دائماً /kw/. x في آخر الكلمة /ks/. y في البداية «ي»."
        },
        {
          "questionAr": "أكمل الفراغ: (ست حمير وحشية صفراء.)",
          "questionEn": "Complete: ____ yellow zebras.",
          "options": [
            "Six",
            "Sick",
            "Sit"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: Six. o القصيرة /ɑ/ (hot)، u القصيرة /ʌ/ (sun). q تأتي مع u دائماً /kw/. x في آخر الكلمة /ks/. y في البداية «ي»."
        },
        {
          "questionAr": "ما معنى \"sun\"؟",
          "questionEn": "What does \"sun\" mean?",
          "options": [
            "ملكة",
            "عش",
            "خيمة",
            "شمس"
          ],
          "correctIndex": 3,
          "explanationAr": "\"sun\" /sʌn/ تعني: شمس. مثال: the hot sun"
        },
        {
          "questionAr": "ما معنى \"tent\"؟",
          "questionEn": "What does \"tent\" mean?",
          "options": [
            "ملكة",
            "عش",
            "فان",
            "خيمة"
          ],
          "correctIndex": 3,
          "explanationAr": "\"tent\" /tɛnt/ تعني: خيمة. مثال: a tent in the desert"
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Inserting a vowel: «إسيكس» for six",
            "six /sɪks/"
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: six /sɪks/ — لا تضيف «إ» قبل s أو بعد x."
        }
      ]
    }
  },
  {
    "id": "srp_305",
    "pillarId": "reading",
    "pillarNameAr": "القراءة التعبيرية والنطق الصوتي",
    "pillarNameEn": "Expressive Reading & Pronunciation Lab",
    "pillarIcon": "📖",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "قراءة كلمات CVC: دمج الأصوات",
    "titleEn": "Blending CVC Words: cat, bed, sit, hot, bus",
    "descAr": "ادمج ثلاثة أصوات (ساكن-متحرك-ساكن) وتقرأ مئات الكلمات.",
    "descEn": "Blend consonant-vowel-consonant to read hundreds of words.",
    "speakingGoalAr": "اقرأ عشرين كلمة CVC بدون تهجئة.",
    "speakingGoalEn": "Read twenty CVC words without spelling them out.",
    "keyPattern": {
      "ruleAr": "اقرأ الصوت الأول، ثم الحرف المتحرك القصير، ثم الأخير، وادمجهم بسرعة: /b/-/ɛ/-/d/ → bed. غيّر حرفاً واحداً لتصنع كلمة جديدة: bed → bad → bag.",
      "ruleEn": "Say each sound then blend quickly; change one letter to make a new word.",
      "formula": "C + short V + C → blend: /s/ /ɪ/ /t/ = sit"
    },
    "practicalExamples": [
      {
        "en": "The cat sat on a mat.",
        "ar": "القطة جلست على حصيرة."
      },
      {
        "en": "Ben is in bed.",
        "ar": "بن في السرير."
      },
      {
        "en": "Sit on the big rug.",
        "ar": "اجلس على السجادة الكبيرة."
      },
      {
        "en": "The pot is hot.",
        "ar": "القدر حار."
      },
      {
        "en": "We get on the bus.",
        "ar": "نركب الباص."
      },
      {
        "en": "A bug is on the cup.",
        "ar": "حشرة على الكوب."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "bed read as bad",
        "correct": "bed /bɛd/",
        "whyAr": "e القصيرة «إ» مفتوحة شوي."
      },
      {
        "incorrect": "bus read as boss",
        "correct": "bus /bʌs/",
        "whyAr": "u القصيرة /ʌ/."
      },
      {
        "incorrect": "hot read as hut",
        "correct": "hot /hɑːt/",
        "whyAr": "o القصيرة مثل «آ» قصيرة."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اقرأ القصة القصيرة عن بام بصوت عالي.",
      "promptEn": "Read Pam's story aloud.",
      "saraQuestionAr": "اقرأ لي قصة بام!",
      "saraQuestionEn": "Read me Pam's story!",
      "recommendedResponseEn": "Pam has a big red bag. In the bag is a cup and a pen. Pam gets on the bus."
    },
    "quiz": [
      {
        "questionAr": "غيّر حرفاً: hat → ___ (قبعة→حار)",
        "questionEn": "Change one letter: hat → ___ (hot)",
        "options": [
          "hot",
          "hit",
          "hut"
        ],
        "correctIndex": 0,
        "explanationAr": "a ⇐ o: hot."
      },
      {
        "questionAr": "أي كلمة صوتها /ɪ/؟",
        "questionEn": "Which has /ɪ/?",
        "options": [
          "sat",
          "sit",
          "set"
        ],
        "correctIndex": 1,
        "explanationAr": "sit."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "bed read as bad",
          "bed /bɛd/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: bed /bɛd/ — e القصيرة «إ» مفتوحة شوي."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "bus read as boss",
          "bus /bʌs/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: bus /bʌs/ — u القصيرة /ʌ/."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "hot read as hut",
          "hot /hɑːt/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: hot /hɑːt/ — o القصيرة مثل «آ» قصيرة."
      }
    ],
    "whiteboardNotes": {
      "title": "Blending CVC Words: cat, bed, sit, hot, bus",
      "pointsAr": [
        "يدمج ثلاثة أصوات.",
        "يميز المتحركات الخمسة القصيرة.",
        "يقرأ جملاً من كلمات CVC.",
        "اقرأ الصوت الأول، ثم الحرف المتحرك القصير، ثم الأخير، وادمجهم بسرعة: /b/-/ɛ/-/d/ → bed. غيّر حرفاً واحداً لتصنع كلمة جديدة: bed → bad → bag."
      ],
      "pointsEn": [
        "Blend three sounds.",
        "Distinguish five short vowels.",
        "Read CVC sentences.",
        "Say each sound then blend quickly; change one letter to make a new word."
      ],
      "chalkHighlight": "C + short V + C → blend: /s/ /ɪ/ /t/ = sit"
    },
    "unit": 1,
    "cefr": "Pre-A1",
    "objectivesAr": [
      "يدمج ثلاثة أصوات.",
      "يميز المتحركات الخمسة القصيرة.",
      "يقرأ جملاً من كلمات CVC."
    ],
    "objectivesEn": [
      "Blend three sounds.",
      "Distinguish five short vowels.",
      "Read CVC sentences."
    ],
    "vocabulary": [
      {
        "word": "mat",
        "ipa": "/mæt/",
        "ar": "حصيرة",
        "exampleEn": "on the mat",
        "exampleAr": "على الحصيرة"
      },
      {
        "word": "bed",
        "ipa": "/bɛd/",
        "ar": "سرير",
        "exampleEn": "go to bed",
        "exampleAr": "روح السرير"
      },
      {
        "word": "sit",
        "ipa": "/sɪt/",
        "ar": "يجلس",
        "exampleEn": "sit down",
        "exampleAr": "اجلس"
      },
      {
        "word": "hot",
        "ipa": "/hɑːt/",
        "ar": "حار",
        "exampleEn": "hot tea",
        "exampleAr": "شاي حار"
      },
      {
        "word": "bus",
        "ipa": "/bʌs/",
        "ar": "باص",
        "exampleEn": "the school bus",
        "exampleAr": "باص المدرسة"
      },
      {
        "word": "cup",
        "ipa": "/kʌp/",
        "ar": "كوب",
        "exampleEn": "a cup of tea",
        "exampleAr": "كوب شاي"
      },
      {
        "word": "bug",
        "ipa": "/bʌɡ/",
        "ar": "حشرة",
        "exampleEn": "a small bug",
        "exampleAr": "حشرة صغيرة"
      },
      {
        "word": "pot",
        "ipa": "/pɑːt/",
        "ar": "قدر",
        "exampleEn": "a big pot",
        "exampleAr": "قدر كبير"
      },
      {
        "word": "bag",
        "ipa": "/bæɡ/",
        "ar": "شنطة",
        "exampleEn": "my bag",
        "exampleAr": "شنطتي"
      },
      {
        "word": "pin",
        "ipa": "/pɪn/",
        "ar": "دبوس",
        "exampleEn": "a red pin",
        "exampleAr": "دبوس أحمر"
      }
    ],
    "grammarFocus": {
      "ruleAr": "اقرأ الصوت الأول، ثم الحرف المتحرك القصير، ثم الأخير، وادمجهم بسرعة: /b/-/ɛ/-/d/ → bed. غيّر حرفاً واحداً لتصنع كلمة جديدة: bed → bad → bag.",
      "ruleEn": "Say each sound then blend quickly; change one letter to make a new word.",
      "formula": "C + short V + C → blend: /s/ /ɪ/ /t/ = sit",
      "examples": [
        {
          "en": "The cat sat on a mat.",
          "ar": "القطة جلست على حصيرة."
        },
        {
          "en": "Ben is in bed.",
          "ar": "بن في السرير."
        },
        {
          "en": "Sit on the big rug.",
          "ar": "اجلس على السجادة الكبيرة."
        },
        {
          "en": "The pot is hot.",
          "ar": "القدر حار."
        },
        {
          "en": "We get on the bus.",
          "ar": "نركب الباص."
        },
        {
          "en": "A bug is on the cup.",
          "ar": "حشرة على الكوب."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Text",
        "en": "Pam has a big red bag.",
        "ar": "بام عندها شنطة حمراء كبيرة."
      },
      {
        "speaker": "Text",
        "en": "In the bag is a cup and a pen.",
        "ar": "في الشنطة كوب وقلم."
      },
      {
        "speaker": "Text",
        "en": "Pam gets on the bus.",
        "ar": "بام تركب الباص."
      },
      {
        "speaker": "Text",
        "en": "A bug sits on the cup.",
        "ar": "حشرة جلست على الكوب."
      },
      {
        "speaker": "Text",
        "en": "Pam is not sad.",
        "ar": "بام مو زعلانة."
      },
      {
        "speaker": "Text",
        "en": "She lets the bug go.",
        "ar": "خلت الحشرة تروح."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Text: Pam has a big red bag.\nText: In the bag is a cup and a pen.\nText: Pam gets on the bus.\nText: A bug sits on the cup.\nText: Pam is not sad.\nText: She lets the bug go.",
      "questions": [
        {
          "questionAr": "لون الشنطة؟",
          "questionEn": "What colour is Pam's bag?",
          "options": [
            "red",
            "blue",
            "black"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: red"
        },
        {
          "questionAr": "وين جلست الحشرة؟",
          "questionEn": "Where does the bug sit?",
          "options": [
            "on the pen",
            "on the cup",
            "on the bus"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: on the cup"
        },
        {
          "questionAr": "بام زعلانة؟",
          "questionEn": "Is Pam sad?",
          "options": [
            "Yes",
            "No"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: No"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Five short vowels: bag, bed, big, bog, bug",
      "items": [
        "bag /æ/",
        "bed /ɛ/",
        "big /ɪ/",
        "bog /ɑ/",
        "bug /ʌ/"
      ],
      "tipAr": "قلها بالترتيب كأنها أغنية: bag-bed-big-bog-bug. هذا أهم تمرين للقراءة."
    },
    "exercises": {
      "easy": [
        {
          "id": "srp_305_e1",
          "type": "meaning",
          "promptEn": "What does \"mat\" mean?",
          "promptAr": "ما معنى \"mat\"؟",
          "options": [
            "شنطة",
            "حار",
            "سرير",
            "حصيرة"
          ],
          "correctIndex": 3,
          "answer": "حصيرة",
          "explanationAr": "\"mat\" /mæt/ تعني: حصيرة. مثال: on the mat"
        },
        {
          "id": "srp_305_e2",
          "type": "meaning",
          "promptEn": "What does \"bed\" mean?",
          "promptAr": "ما معنى \"bed\"؟",
          "options": [
            "باص",
            "يجلس",
            "قدر",
            "سرير"
          ],
          "correctIndex": 3,
          "answer": "سرير",
          "explanationAr": "\"bed\" /bɛd/ تعني: سرير. مثال: go to bed"
        },
        {
          "id": "srp_305_e3",
          "type": "meaning",
          "promptEn": "What does \"sit\" mean?",
          "promptAr": "ما معنى \"sit\"؟",
          "options": [
            "حشرة",
            "سرير",
            "يجلس",
            "شنطة"
          ],
          "correctIndex": 2,
          "answer": "يجلس",
          "explanationAr": "\"sit\" /sɪt/ تعني: يجلس. مثال: sit down"
        },
        {
          "id": "srp_305_e4",
          "type": "meaning",
          "promptEn": "What does \"hot\" mean?",
          "promptAr": "ما معنى \"hot\"؟",
          "options": [
            "حار",
            "كوب",
            "باص",
            "شنطة"
          ],
          "correctIndex": 0,
          "answer": "حار",
          "explanationAr": "\"hot\" /hɑːt/ تعني: حار. مثال: hot tea"
        }
      ],
      "medium": [
        {
          "id": "srp_305_m1",
          "type": "gap",
          "promptEn": "Complete: The cat ____ on a mat.",
          "promptAr": "أكمل الفراغ: (القطة جلست على حصيرة.)",
          "options": [
            "set",
            "sit",
            "sat"
          ],
          "correctIndex": 2,
          "answer": "The cat sat on a mat.",
          "explanationAr": "الإجابة: sat. اقرأ الصوت الأول، ثم الحرف المتحرك القصير، ثم الأخير، وادمجهم بسرعة: /b/-/ɛ/-/d/ → bed. غيّر حرفاً واحداً لتصنع كلمة جديدة: bed → bad → bag."
        },
        {
          "id": "srp_305_m2",
          "type": "gap",
          "promptEn": "Complete: Ben is in ____.",
          "promptAr": "أكمل الفراغ: (بن في السرير.)",
          "options": [
            "bid",
            "bed",
            "bad"
          ],
          "correctIndex": 1,
          "answer": "Ben is in bed.",
          "explanationAr": "الإجابة: bed. اقرأ الصوت الأول، ثم الحرف المتحرك القصير، ثم الأخير، وادمجهم بسرعة: /b/-/ɛ/-/d/ → bed. غيّر حرفاً واحداً لتصنع كلمة جديدة: bed → bad → bag."
        },
        {
          "id": "srp_305_m3",
          "type": "gap",
          "promptEn": "Complete: Sit on the ____ rug.",
          "promptAr": "أكمل الفراغ: (اجلس على السجادة الكبيرة.)",
          "options": [
            "big",
            "bag",
            "bug"
          ],
          "correctIndex": 0,
          "answer": "Sit on the big rug.",
          "explanationAr": "الإجابة: big. اقرأ الصوت الأول، ثم الحرف المتحرك القصير، ثم الأخير، وادمجهم بسرعة: /b/-/ɛ/-/d/ → bed. غيّر حرفاً واحداً لتصنع كلمة جديدة: bed → bad → bag."
        },
        {
          "id": "srp_305_m4",
          "type": "gap",
          "promptEn": "Complete: The pot is ____.",
          "promptAr": "أكمل الفراغ: (القدر حار.)",
          "options": [
            "hat",
            "hut",
            "hot"
          ],
          "correctIndex": 2,
          "answer": "The pot is hot.",
          "explanationAr": "الإجابة: hot. اقرأ الصوت الأول، ثم الحرف المتحرك القصير، ثم الأخير، وادمجهم بسرعة: /b/-/ɛ/-/d/ → bed. غيّر حرفاً واحداً لتصنع كلمة جديدة: bed → bad → bag."
        }
      ],
      "hard": [
        {
          "id": "srp_305_h1",
          "type": "order",
          "promptEn": "Put the words in order: the / get / We / on / bus.",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (نركب الباص.)",
          "answer": "We get on the bus.",
          "explanationAr": "الترتيب الصحيح: We get on the bus."
        },
        {
          "id": "srp_305_h2",
          "type": "order",
          "promptEn": "Put the words in order: on / is / cup. / A / the / bug",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (حشرة على الكوب.)",
          "answer": "A bug is on the cup.",
          "explanationAr": "الترتيب الصحيح: A bug is on the cup."
        },
        {
          "id": "srp_305_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: بن في السرير.",
          "answer": "Ben is in bed.",
          "explanationAr": "ترجمة مقترحة: Ben is in bed."
        },
        {
          "id": "srp_305_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: القدر حار.",
          "answer": "The pot is hot.",
          "explanationAr": "ترجمة مقترحة: The pot is hot."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Adding a vowel at the end: «باصّي»",
        "correct": "bus /bʌs/",
        "whyAr": "لا تضيف «ي» أو «ـه» بعد الحرف الأخير."
      },
      {
        "incorrect": "pin = bin",
        "correct": "pin /pɪn/ vs bin /bɪn/",
        "whyAr": "p بنفخة هواء."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (أصوات الحروف N إلى Z): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "pen /pɛn/",
          "pen read as «بن»"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: pen /pɛn/ — p هواء بدون اهتزاز، وليست b.",
        "fromLessonId": "srp_304"
      },
      {
        "questionAr": "ما معنى \"milk\"؟",
        "questionEn": "What does \"milk\" mean?",
        "options": [
          "مربى",
          "حليب",
          "قطة",
          "تفاحة"
        ],
        "correctIndex": 1,
        "explanationAr": "\"milk\" /mɪlk/ تعني: حليب. مثال: a glass of milk",
        "fromLessonId": "srp_301"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (اجلس على السجادة الكبيرة.)",
          "questionEn": "Complete: Sit on the ____ rug.",
          "options": [
            "big",
            "bag",
            "bug"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: big. اقرأ الصوت الأول، ثم الحرف المتحرك القصير، ثم الأخير، وادمجهم بسرعة: /b/-/ɛ/-/d/ → bed. غيّر حرفاً واحداً لتصنع كلمة جديدة: bed → bad → bag."
        },
        {
          "questionAr": "أكمل الفراغ: (القدر حار.)",
          "questionEn": "Complete: The pot is ____.",
          "options": [
            "hat",
            "hut",
            "hot"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: hot. اقرأ الصوت الأول، ثم الحرف المتحرك القصير، ثم الأخير، وادمجهم بسرعة: /b/-/ɛ/-/d/ → bed. غيّر حرفاً واحداً لتصنع كلمة جديدة: bed → bad → bag."
        },
        {
          "questionAr": "ما معنى \"bus\"؟",
          "questionEn": "What does \"bus\" mean?",
          "options": [
            "شنطة",
            "باص",
            "قدر",
            "يجلس"
          ],
          "correctIndex": 1,
          "explanationAr": "\"bus\" /bʌs/ تعني: باص. مثال: the school bus"
        },
        {
          "questionAr": "ما معنى \"cup\"؟",
          "questionEn": "What does \"cup\" mean?",
          "options": [
            "سرير",
            "باص",
            "حار",
            "كوب"
          ],
          "correctIndex": 3,
          "explanationAr": "\"cup\" /kʌp/ تعني: كوب. مثال: a cup of tea"
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Adding a vowel at the end: «باصّي»",
            "bus /bʌs/"
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: bus /bʌs/ — لا تضيف «ي» أو «ـه» بعد الحرف الأخير."
        }
      ]
    }
  },
  {
    "id": "srp_306",
    "pillarId": "reading",
    "pillarNameAr": "القراءة التعبيرية والنطق الصوتي",
    "pillarNameEn": "Expressive Reading & Pronunciation Lab",
    "pillarIcon": "📖",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "الحروف المزدوجة: sh / ch / th / ck",
    "titleEn": "Digraphs: sh, ch, th, ck",
    "descAr": "حرفين يطلعون صوت واحد: sh «ش»، ch «تش»، th «ث/ذ»، ck «ك».",
    "descEn": "Two letters, one sound: sh, ch, th, ck.",
    "speakingGoalAr": "اقرأ عشر كلمات فيها حروف مزدوجة.",
    "speakingGoalEn": "Read ten digraph words.",
    "keyPattern": {
      "ruleAr": "sh = /ʃ/ (ship)، ch = /tʃ/ (chip)، th = /θ/ (thin) أو /ð/ (this)، ck = /k/ في آخر الكلمة بعد متحرك قصير (duck).",
      "ruleEn": "sh = /ʃ/, ch = /tʃ/, th = /θ/ or /ð/, ck = /k/ after a short vowel.",
      "formula": "sh /ʃ/ | ch /tʃ/ | th /θ/,/ð/ | ck /k/"
    },
    "practicalExamples": [
      {
        "en": "The ship is on the sea.",
        "ar": "السفينة في البحر."
      },
      {
        "en": "I want chips and chicken.",
        "ar": "أبي بطاطس ودجاج."
      },
      {
        "en": "Thank you for the gift.",
        "ar": "شكراً على الهدية."
      },
      {
        "en": "This duck is black.",
        "ar": "هالبطة سوداء."
      },
      {
        "en": "Brush your teeth with me.",
        "ar": "نظف أسنانك معي."
      },
      {
        "en": "She has a lunch box.",
        "ar": "عندها علبة غداء."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "chip read as «شيب»",
        "correct": "chip /tʃɪp/",
        "whyAr": "ch فيها «ت» قبل «ش»."
      },
      {
        "incorrect": "think read as «سنك» or «تنك»",
        "correct": "think /θɪŋk/",
        "whyAr": "th = «ث»: اللسان بين الأسنان."
      },
      {
        "incorrect": "duck written duk",
        "correct": "duck",
        "whyAr": "بعد متحرك قصير في آخر الكلمة نكتب ck."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اقرأ: Fish and chips for lunch. Thank you, Mom!",
      "promptEn": "Read: Fish and chips for lunch. Thank you, Mom!",
      "saraQuestionAr": "اقرأ الجملة وركّز على sh و ch و th!",
      "saraQuestionEn": "Read it and focus on sh, ch and th!",
      "recommendedResponseEn": "Fish and chips for lunch. Thank you, Mom!"
    },
    "quiz": [
      {
        "questionAr": "ch في chicken تنطق:",
        "questionEn": "'ch' in chicken:",
        "options": [
          "ش",
          "تش/چ",
          "ك"
        ],
        "correctIndex": 1,
        "explanationAr": "/tʃ/."
      },
      {
        "questionAr": "أي كلمة فيها /ð/؟",
        "questionEn": "Which has /ð/?",
        "options": [
          "think",
          "this",
          "thank"
        ],
        "correctIndex": 1,
        "explanationAr": "this = ذ."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "chip read as «شيب»",
          "chip /tʃɪp/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: chip /tʃɪp/ — ch فيها «ت» قبل «ش»."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "think /θɪŋk/",
          "think read as «سنك» or «تنك»"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: think /θɪŋk/ — th = «ث»: اللسان بين الأسنان."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "duck written duk",
          "duck"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: duck — بعد متحرك قصير في آخر الكلمة نكتب ck."
      }
    ],
    "whiteboardNotes": {
      "title": "Digraphs: sh, ch, th, ck",
      "pointsAr": [
        "يقرأ sh و ch.",
        "يميز th المهموسة والمجهورة.",
        "يعرف متى نكتب ck.",
        "sh = /ʃ/ (ship)، ch = /tʃ/ (chip)، th = /θ/ (thin) أو /ð/ (this)، ck = /k/ في آخر الكلمة بعد متحرك قصير (duck)."
      ],
      "pointsEn": [
        "Read sh and ch.",
        "Distinguish voiceless and voiced th.",
        "Know when to write ck.",
        "sh = /ʃ/, ch = /tʃ/, th = /θ/ or /ð/, ck = /k/ after a short vowel."
      ],
      "chalkHighlight": "sh /ʃ/ | ch /tʃ/ | th /θ/,/ð/ | ck /k/"
    },
    "unit": 1,
    "cefr": "Pre-A1",
    "objectivesAr": [
      "يقرأ sh و ch.",
      "يميز th المهموسة والمجهورة.",
      "يعرف متى نكتب ck."
    ],
    "objectivesEn": [
      "Read sh and ch.",
      "Distinguish voiceless and voiced th.",
      "Know when to write ck."
    ],
    "vocabulary": [
      {
        "word": "ship",
        "ipa": "/ʃɪp/",
        "ar": "سفينة",
        "exampleEn": "a big ship",
        "exampleAr": "سفينة كبيرة"
      },
      {
        "word": "shop",
        "ipa": "/ʃɑːp/",
        "ar": "محل",
        "exampleEn": "a toy shop",
        "exampleAr": "محل ألعاب"
      },
      {
        "word": "chip",
        "ipa": "/tʃɪp/",
        "ar": "شريحة بطاطس",
        "exampleEn": "potato chips",
        "exampleAr": "شيبس"
      },
      {
        "word": "chicken",
        "ipa": "/ˈtʃɪkɪn/",
        "ar": "دجاج",
        "exampleEn": "grilled chicken",
        "exampleAr": "دجاج مشوي"
      },
      {
        "word": "thank",
        "ipa": "/θæŋk/",
        "ar": "يشكر",
        "exampleEn": "Thank you!",
        "exampleAr": "شكراً!"
      },
      {
        "word": "this",
        "ipa": "/ðɪs/",
        "ar": "هذا",
        "exampleEn": "this book",
        "exampleAr": "هالكتاب"
      },
      {
        "word": "teeth",
        "ipa": "/tiːθ/",
        "ar": "أسنان",
        "exampleEn": "brush your teeth",
        "exampleAr": "نظف أسنانك"
      },
      {
        "word": "duck",
        "ipa": "/dʌk/",
        "ar": "بطة",
        "exampleEn": "a yellow duck",
        "exampleAr": "بطة صفراء"
      },
      {
        "word": "lunch",
        "ipa": "/lʌntʃ/",
        "ar": "غداء",
        "exampleEn": "lunch time",
        "exampleAr": "وقت الغداء"
      },
      {
        "word": "fish",
        "ipa": "/fɪʃ/",
        "ar": "سمك",
        "exampleEn": "fish and chips",
        "exampleAr": "سمك وبطاطس"
      }
    ],
    "grammarFocus": {
      "ruleAr": "sh = /ʃ/ (ship)، ch = /tʃ/ (chip)، th = /θ/ (thin) أو /ð/ (this)، ck = /k/ في آخر الكلمة بعد متحرك قصير (duck).",
      "ruleEn": "sh = /ʃ/, ch = /tʃ/, th = /θ/ or /ð/, ck = /k/ after a short vowel.",
      "formula": "sh /ʃ/ | ch /tʃ/ | th /θ/,/ð/ | ck /k/",
      "examples": [
        {
          "en": "The ship is on the sea.",
          "ar": "السفينة في البحر."
        },
        {
          "en": "I want chips and chicken.",
          "ar": "أبي بطاطس ودجاج."
        },
        {
          "en": "Thank you for the gift.",
          "ar": "شكراً على الهدية."
        },
        {
          "en": "This duck is black.",
          "ar": "هالبطة سوداء."
        },
        {
          "en": "Brush your teeth with me.",
          "ar": "نظف أسنانك معي."
        },
        {
          "en": "She has a lunch box.",
          "ar": "عندها علبة غداء."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Text",
        "en": "Seth and his mom go to the fish shop.",
        "ar": "سيث وأمه يروحون محل السمك."
      },
      {
        "speaker": "Text",
        "en": "They get fish and chips for lunch.",
        "ar": "ياخذون سمك وبطاطس للغداء."
      },
      {
        "speaker": "Text",
        "en": "Then they sit by the sea.",
        "ar": "بعدين يجلسون جنب البحر."
      },
      {
        "speaker": "Text",
        "en": "Seth can see a big ship.",
        "ar": "سيث يشوف سفينة كبيرة."
      },
      {
        "speaker": "Text",
        "en": "A black duck swims to them.",
        "ar": "بطة سوداء تسبح لهم."
      },
      {
        "speaker": "Text",
        "en": "Seth says, \"Thank you, Mom! This is fun!\"",
        "ar": "سيث يقول: «شكراً ماما! وناسة!»"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Text: Seth and his mom go to the fish shop.\nText: They get fish and chips for lunch.\nText: Then they sit by the sea.\nText: Seth can see a big ship.\nText: A black duck swims to them.\nText: Seth says, \"Thank you, Mom! This is fun!\"",
      "questions": [
        {
          "questionAr": "غداهم؟",
          "questionEn": "What do they get for lunch?",
          "options": [
            "chicken",
            "fish and chips",
            "pizza"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: fish and chips"
        },
        {
          "questionAr": "وش يشوف سيث؟",
          "questionEn": "What can Seth see?",
          "options": [
            "a ship",
            "a shop",
            "a shark"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: a ship"
        },
        {
          "questionAr": "لون البطة؟",
          "questionEn": "What colour is the duck?",
          "options": [
            "white",
            "yellow",
            "black"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: black"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "/θ/ think vs /ð/ this vs /s/ sink",
      "items": [
        "think /θɪŋk/ (ث)",
        "this /ðɪs/ (ذ)",
        "sink /sɪŋk/ (س)"
      ],
      "tipAr": "العربي عنده ث وذ! استخدمهم: think = «ثِنك»، this = «ذِس»."
    },
    "exercises": {
      "easy": [
        {
          "id": "srp_306_e1",
          "type": "meaning",
          "promptEn": "What does \"ship\" mean?",
          "promptAr": "ما معنى \"ship\"؟",
          "options": [
            "هذا",
            "محل",
            "سمك",
            "سفينة"
          ],
          "correctIndex": 3,
          "answer": "سفينة",
          "explanationAr": "\"ship\" /ʃɪp/ تعني: سفينة. مثال: a big ship"
        },
        {
          "id": "srp_306_e2",
          "type": "meaning",
          "promptEn": "What does \"shop\" mean?",
          "promptAr": "ما معنى \"shop\"؟",
          "options": [
            "محل",
            "بطة",
            "هذا",
            "سمك"
          ],
          "correctIndex": 0,
          "answer": "محل",
          "explanationAr": "\"shop\" /ʃɑːp/ تعني: محل. مثال: a toy shop"
        },
        {
          "id": "srp_306_e3",
          "type": "meaning",
          "promptEn": "What does \"chip\" mean?",
          "promptAr": "ما معنى \"chip\"؟",
          "options": [
            "بطة",
            "غداء",
            "سفينة",
            "شريحة بطاطس"
          ],
          "correctIndex": 3,
          "answer": "شريحة بطاطس",
          "explanationAr": "\"chip\" /tʃɪp/ تعني: شريحة بطاطس. مثال: potato chips"
        },
        {
          "id": "srp_306_e4",
          "type": "meaning",
          "promptEn": "What does \"chicken\" mean?",
          "promptAr": "ما معنى \"chicken\"؟",
          "options": [
            "سفينة",
            "غداء",
            "سمك",
            "دجاج"
          ],
          "correctIndex": 3,
          "answer": "دجاج",
          "explanationAr": "\"chicken\" /ˈtʃɪkɪn/ تعني: دجاج. مثال: grilled chicken"
        }
      ],
      "medium": [
        {
          "id": "srp_306_m1",
          "type": "gap",
          "promptEn": "Complete: The ____ is on the sea.",
          "promptAr": "أكمل الفراغ: (السفينة في البحر.)",
          "options": [
            "chip",
            "sip",
            "ship"
          ],
          "correctIndex": 2,
          "answer": "The ship is on the sea.",
          "explanationAr": "الإجابة: ship. sh = /ʃ/ (ship)، ch = /tʃ/ (chip)، th = /θ/ (thin) أو /ð/ (this)، ck = /k/ في آخر الكلمة بعد متحرك قصير (duck)."
        },
        {
          "id": "srp_306_m2",
          "type": "gap",
          "promptEn": "Complete: I want ____ and chicken.",
          "promptAr": "أكمل الفراغ: (أبي بطاطس ودجاج.)",
          "options": [
            "ships",
            "sips",
            "chips"
          ],
          "correctIndex": 2,
          "answer": "I want chips and chicken.",
          "explanationAr": "الإجابة: chips. sh = /ʃ/ (ship)، ch = /tʃ/ (chip)، th = /θ/ (thin) أو /ð/ (this)، ck = /k/ في آخر الكلمة بعد متحرك قصير (duck)."
        },
        {
          "id": "srp_306_m3",
          "type": "gap",
          "promptEn": "Complete: ____ you for the gift.",
          "promptAr": "أكمل الفراغ: (شكراً على الهدية.)",
          "options": [
            "Thank",
            "Sank",
            "Tank"
          ],
          "correctIndex": 0,
          "answer": "Thank you for the gift.",
          "explanationAr": "الإجابة: Thank. sh = /ʃ/ (ship)، ch = /tʃ/ (chip)، th = /θ/ (thin) أو /ð/ (this)، ck = /k/ في آخر الكلمة بعد متحرك قصير (duck)."
        },
        {
          "id": "srp_306_m4",
          "type": "gap",
          "promptEn": "Complete: This ____ is black.",
          "promptAr": "أكمل الفراغ: (هالبطة سوداء.)",
          "options": [
            "duk",
            "duck",
            "duc"
          ],
          "correctIndex": 1,
          "answer": "This duck is black.",
          "explanationAr": "الإجابة: duck. sh = /ʃ/ (ship)، ch = /tʃ/ (chip)، th = /θ/ (thin) أو /ð/ (this)، ck = /k/ في آخر الكلمة بعد متحرك قصير (duck)."
        }
      ],
      "hard": [
        {
          "id": "srp_306_h1",
          "type": "order",
          "promptEn": "Put the words in order: me. / your / Brush / teeth / with",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (نظف أسنانك معي.)",
          "answer": "Brush your teeth with me.",
          "explanationAr": "الترتيب الصحيح: Brush your teeth with me."
        },
        {
          "id": "srp_306_h2",
          "type": "order",
          "promptEn": "Put the words in order: lunch / She / has / box. / a",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (عندها علبة غداء.)",
          "answer": "She has a lunch box.",
          "explanationAr": "الترتيب الصحيح: She has a lunch box."
        },
        {
          "id": "srp_306_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أبي بطاطس ودجاج.",
          "answer": "I want chips and chicken.",
          "explanationAr": "ترجمة مقترحة: I want chips and chicken."
        },
        {
          "id": "srp_306_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: هالبطة سوداء.",
          "answer": "This duck is black.",
          "explanationAr": "ترجمة مقترحة: This duck is black."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Ship and chip sound the same",
        "correct": "ship /ʃɪp/ vs chip /tʃɪp/",
        "whyAr": "في بعض لهجات الخليج «تش» موجودة (چ) — استخدمها في ch."
      },
      {
        "incorrect": "teeth read as «تيت»",
        "correct": "teeth /tiːθ/",
        "whyAr": "آخرها «ث»."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (قراءة كلمات CVC: دمج الأصوات): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "bus read as boss",
          "bus /bʌs/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: bus /bʌs/ — u القصيرة /ʌ/.",
        "fromLessonId": "srp_305"
      },
      {
        "questionAr": "مراجعة (أصوات الحروف A إلى M): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "ball read as /bi:/-all",
          "ball /bɔːl/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: ball /bɔːl/ — نقرأ بصوت الحرف /b/ وليس اسمه «بي».",
        "fromLessonId": "srp_301"
      },
      {
        "questionAr": "ما معنى \"zip\"؟",
        "questionEn": "What does \"zip\" mean?",
        "options": [
          "سحاب",
          "شمس",
          "ملكة",
          "قلم"
        ],
        "correctIndex": 0,
        "explanationAr": "\"zip\" /zɪp/ تعني: سحاب. مثال: zip your bag",
        "fromLessonId": "srp_304"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (شكراً على الهدية.)",
          "questionEn": "Complete: ____ you for the gift.",
          "options": [
            "Thank",
            "Sank",
            "Tank"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: Thank. sh = /ʃ/ (ship)، ch = /tʃ/ (chip)، th = /θ/ (thin) أو /ð/ (this)، ck = /k/ في آخر الكلمة بعد متحرك قصير (duck)."
        },
        {
          "questionAr": "أكمل الفراغ: (هالبطة سوداء.)",
          "questionEn": "Complete: This ____ is black.",
          "options": [
            "duk",
            "duck",
            "duc"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: duck. sh = /ʃ/ (ship)، ch = /tʃ/ (chip)، th = /θ/ (thin) أو /ð/ (this)، ck = /k/ في آخر الكلمة بعد متحرك قصير (duck)."
        },
        {
          "questionAr": "ما معنى \"thank\"؟",
          "questionEn": "What does \"thank\" mean?",
          "options": [
            "هذا",
            "يشكر",
            "محل",
            "غداء"
          ],
          "correctIndex": 1,
          "explanationAr": "\"thank\" /θæŋk/ تعني: يشكر. مثال: Thank you!"
        },
        {
          "questionAr": "ما معنى \"this\"؟",
          "questionEn": "What does \"this\" mean?",
          "options": [
            "سمك",
            "دجاج",
            "هذا",
            "غداء"
          ],
          "correctIndex": 2,
          "explanationAr": "\"this\" /ðɪs/ تعني: هذا. مثال: this book"
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Ship and chip sound the same",
            "ship /ʃɪp/ vs chip /tʃɪp/"
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: ship /ʃɪp/ vs chip /tʃɪp/ — في بعض لهجات الخليج «تش» موجودة (چ) — استخدمها في ch."
        }
      ]
    }
  },
  {
    "id": "srp_307",
    "pillarId": "reading",
    "pillarNameAr": "القراءة التعبيرية والنطق الصوتي",
    "pillarNameEn": "Expressive Reading & Pronunciation Lab",
    "pillarIcon": "📖",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "الحرف e السحري: الحروف الطويلة",
    "titleEn": "Magic E: Long Vowels (cap → cape)",
    "descAr": "لما تجي e في آخر الكلمة ما تنطق، بس تخلي الحرف المتحرك يقول اسمه: kit → kite.",
    "descEn": "A final silent e makes the vowel say its name: kit → kite.",
    "speakingGoalAr": "اقرأ عشرة أزواج كلمات قصيرة/طويلة.",
    "speakingGoalEn": "Read ten short/long word pairs.",
    "keyPattern": {
      "ruleAr": "نمط a_e, i_e, o_e, u_e: الحرف المتحرك ينطق باسمه (/eɪ/, /aɪ/, /oʊ/, /juː/) و e الأخيرة صامتة.",
      "ruleEn": "In a_e, i_e, o_e, u_e the vowel says its name and the final e is silent.",
      "formula": "C + V + C + e → long vowel: cap → cape, kit → kite, hop → hope, cub → cube"
    },
    "practicalExamples": [
      {
        "en": "I can fly a kite.",
        "ar": "أقدر أطيّر طيارة ورق."
      },
      {
        "en": "We hope to win.",
        "ar": "نتمنى نفوز."
      },
      {
        "en": "Make a cake with me.",
        "ar": "سوّ معي كيكة."
      },
      {
        "en": "Ride your bike home.",
        "ar": "سوق سيكلك للبيت."
      },
      {
        "en": "Use a cube of ice.",
        "ar": "استخدم مكعب ثلج."
      },
      {
        "en": "The game is at nine.",
        "ar": "المباراة الساعة تسع."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "cake read as «كاكي»",
        "correct": "cake /keɪk/",
        "whyAr": "e الأخيرة صامتة."
      },
      {
        "incorrect": "hope read as hop",
        "correct": "hope /hoʊp/",
        "whyAr": "e تخلي o تقول اسمها «أو»."
      },
      {
        "incorrect": "bike read as «بيكي»",
        "correct": "bike /baɪk/",
        "whyAr": "i_e = «آي»."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اقرأ قصة مايك بصوت عالي.",
      "promptEn": "Read Mike's story aloud.",
      "saraQuestionAr": "اقرأ لي: Mike likes to ride his bike.",
      "saraQuestionEn": "Read: Mike likes to ride his bike.",
      "recommendedResponseEn": "Mike likes to ride his bike. Today he rides to the lake."
    },
    "quiz": [
      {
        "questionAr": "أي كلمة فيها حرف طويل؟",
        "questionEn": "Which word has a long vowel?",
        "options": [
          "not",
          "note",
          "net"
        ],
        "correctIndex": 1,
        "explanationAr": "note: o_e."
      },
      {
        "questionAr": "e في آخر home:",
        "questionEn": "The e in 'home' is:",
        "options": [
          "/i/",
          "silent",
          "/ə/"
        ],
        "correctIndex": 1,
        "explanationAr": "صامتة."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "cake /keɪk/",
          "cake read as «كاكي»"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: cake /keɪk/ — e الأخيرة صامتة."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "hope /hoʊp/",
          "hope read as hop"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: hope /hoʊp/ — e تخلي o تقول اسمها «أو»."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "bike /baɪk/",
          "bike read as «بيكي»"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: bike /baɪk/ — i_e = «آي»."
      }
    ],
    "whiteboardNotes": {
      "title": "Magic E: Long Vowels (cap → cape)",
      "pointsAr": [
        "يميز الحرف القصير من الطويل.",
        "يقرأ كلمات magic e.",
        "يعرف إن e الأخيرة صامتة.",
        "نمط a_e, i_e, o_e, u_e: الحرف المتحرك ينطق باسمه (/eɪ/, /aɪ/, /oʊ/, /juː/) و e الأخيرة صامتة."
      ],
      "pointsEn": [
        "Contrast short and long vowels.",
        "Read magic-e words.",
        "Know the final e is silent.",
        "In a_e, i_e, o_e, u_e the vowel says its name and the final e is silent."
      ],
      "chalkHighlight": "C + V + C + e → long vowel: cap → cape, kit → kite, hop → hope, cub → cube"
    },
    "unit": 1,
    "cefr": "A1",
    "objectivesAr": [
      "يميز الحرف القصير من الطويل.",
      "يقرأ كلمات magic e.",
      "يعرف إن e الأخيرة صامتة."
    ],
    "objectivesEn": [
      "Contrast short and long vowels.",
      "Read magic-e words.",
      "Know the final e is silent."
    ],
    "vocabulary": [
      {
        "word": "cake",
        "ipa": "/keɪk/",
        "ar": "كيكة",
        "exampleEn": "a chocolate cake",
        "exampleAr": "كيكة شوكولاتة"
      },
      {
        "word": "kite",
        "ipa": "/kaɪt/",
        "ar": "طيارة ورق",
        "exampleEn": "fly a kite",
        "exampleAr": "طيّر طيارة"
      },
      {
        "word": "bike",
        "ipa": "/baɪk/",
        "ar": "دراجة",
        "exampleEn": "ride a bike",
        "exampleAr": "سوق سيكل"
      },
      {
        "word": "home",
        "ipa": "/hoʊm/",
        "ar": "بيت",
        "exampleEn": "go home",
        "exampleAr": "روح البيت"
      },
      {
        "word": "hope",
        "ipa": "/hoʊp/",
        "ar": "يتمنى/أمل",
        "exampleEn": "I hope so.",
        "exampleAr": "إن شاء الله."
      },
      {
        "word": "cube",
        "ipa": "/kjuːb/",
        "ar": "مكعب",
        "exampleEn": "an ice cube",
        "exampleAr": "مكعب ثلج"
      },
      {
        "word": "game",
        "ipa": "/ɡeɪm/",
        "ar": "لعبة/مباراة",
        "exampleEn": "a fun game",
        "exampleAr": "لعبة حلوة"
      },
      {
        "word": "nine",
        "ipa": "/naɪn/",
        "ar": "تسعة",
        "exampleEn": "nine o'clock",
        "exampleAr": "الساعة تسع"
      },
      {
        "word": "rope",
        "ipa": "/roʊp/",
        "ar": "حبل",
        "exampleEn": "jump rope",
        "exampleAr": "نط الحبل"
      },
      {
        "word": "tube",
        "ipa": "/tuːb/",
        "ar": "أنبوب",
        "exampleEn": "a tube of paste",
        "exampleAr": "أنبوب معجون"
      }
    ],
    "grammarFocus": {
      "ruleAr": "نمط a_e, i_e, o_e, u_e: الحرف المتحرك ينطق باسمه (/eɪ/, /aɪ/, /oʊ/, /juː/) و e الأخيرة صامتة.",
      "ruleEn": "In a_e, i_e, o_e, u_e the vowel says its name and the final e is silent.",
      "formula": "C + V + C + e → long vowel: cap → cape, kit → kite, hop → hope, cub → cube",
      "examples": [
        {
          "en": "I can fly a kite.",
          "ar": "أقدر أطيّر طيارة ورق."
        },
        {
          "en": "We hope to win.",
          "ar": "نتمنى نفوز."
        },
        {
          "en": "Make a cake with me.",
          "ar": "سوّ معي كيكة."
        },
        {
          "en": "Ride your bike home.",
          "ar": "سوق سيكلك للبيت."
        },
        {
          "en": "Use a cube of ice.",
          "ar": "استخدم مكعب ثلج."
        },
        {
          "en": "The game is at nine.",
          "ar": "المباراة الساعة تسع."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Text",
        "en": "Mike likes to ride his bike.",
        "ar": "مايك يحب يسوق سيكله."
      },
      {
        "speaker": "Text",
        "en": "Today he rides to the lake.",
        "ar": "اليوم ساق للبحيرة."
      },
      {
        "speaker": "Text",
        "en": "His friend Jane has a kite.",
        "ar": "صديقته جين عندها طيارة ورق."
      },
      {
        "speaker": "Text",
        "en": "The kite goes up, up, up!",
        "ar": "الطيارة طارت فوق فوق!"
      },
      {
        "speaker": "Text",
        "en": "Then they eat cake.",
        "ar": "بعدين أكلوا كيك."
      },
      {
        "speaker": "Text",
        "en": "At nine, Mike rides home.",
        "ar": "الساعة تسع رجع مايك البيت."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Text: Mike likes to ride his bike.\nText: Today he rides to the lake.\nText: His friend Jane has a kite.\nText: The kite goes up, up, up!\nText: Then they eat cake.\nText: At nine, Mike rides home.",
      "questions": [
        {
          "questionAr": "وين ساق مايك؟",
          "questionEn": "Where does Mike ride?",
          "options": [
            "to the lake",
            "to school",
            "to the shop"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: to the lake"
        },
        {
          "questionAr": "وش عند جين؟",
          "questionEn": "What does Jane have?",
          "options": [
            "a bike",
            "a kite",
            "a cake"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: a kite"
        },
        {
          "questionAr": "متى رجع؟",
          "questionEn": "When does Mike go home?",
          "options": [
            "at five",
            "at nine",
            "at ten"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: at nine"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Short vs long: hat /æ/ – hate /eɪ/, kit /ɪ/ – kite /aɪ/",
      "items": [
        "hat → hate",
        "kit → kite",
        "hop → hope",
        "cub → cube"
      ],
      "tipAr": "قل الزوج بسرعة وحس بالفرق: الطويل ينزلق (diphthong)."
    },
    "exercises": {
      "easy": [
        {
          "id": "srp_307_e1",
          "type": "meaning",
          "promptEn": "What does \"cake\" mean?",
          "promptAr": "ما معنى \"cake\"؟",
          "options": [
            "دراجة",
            "كيكة",
            "مكعب",
            "بيت"
          ],
          "correctIndex": 1,
          "answer": "كيكة",
          "explanationAr": "\"cake\" /keɪk/ تعني: كيكة. مثال: a chocolate cake"
        },
        {
          "id": "srp_307_e2",
          "type": "meaning",
          "promptEn": "What does \"kite\" mean?",
          "promptAr": "ما معنى \"kite\"؟",
          "options": [
            "طيارة ورق",
            "دراجة",
            "تسعة",
            "لعبة/مباراة"
          ],
          "correctIndex": 0,
          "answer": "طيارة ورق",
          "explanationAr": "\"kite\" /kaɪt/ تعني: طيارة ورق. مثال: fly a kite"
        },
        {
          "id": "srp_307_e3",
          "type": "meaning",
          "promptEn": "What does \"bike\" mean?",
          "promptAr": "ما معنى \"bike\"؟",
          "options": [
            "طيارة ورق",
            "أنبوب",
            "كيكة",
            "دراجة"
          ],
          "correctIndex": 3,
          "answer": "دراجة",
          "explanationAr": "\"bike\" /baɪk/ تعني: دراجة. مثال: ride a bike"
        },
        {
          "id": "srp_307_e4",
          "type": "meaning",
          "promptEn": "What does \"home\" mean?",
          "promptAr": "ما معنى \"home\"؟",
          "options": [
            "تسعة",
            "لعبة/مباراة",
            "مكعب",
            "بيت"
          ],
          "correctIndex": 3,
          "answer": "بيت",
          "explanationAr": "\"home\" /hoʊm/ تعني: بيت. مثال: go home"
        }
      ],
      "medium": [
        {
          "id": "srp_307_m1",
          "type": "gap",
          "promptEn": "Complete: I can fly a ____.",
          "promptAr": "أكمل الفراغ: (أقدر أطيّر طيارة ورق.)",
          "options": [
            "kitten",
            "kit",
            "kite"
          ],
          "correctIndex": 2,
          "answer": "I can fly a kite.",
          "explanationAr": "الإجابة: kite. نمط a_e, i_e, o_e, u_e: الحرف المتحرك ينطق باسمه (/eɪ/, /aɪ/, /oʊ/, /juː/) و e الأخيرة صامتة."
        },
        {
          "id": "srp_307_m2",
          "type": "gap",
          "promptEn": "Complete: We ____ to win.",
          "promptAr": "أكمل الفراغ: (نتمنى نفوز.)",
          "options": [
            "hoop",
            "hop",
            "hope"
          ],
          "correctIndex": 2,
          "answer": "We hope to win.",
          "explanationAr": "الإجابة: hope. نمط a_e, i_e, o_e, u_e: الحرف المتحرك ينطق باسمه (/eɪ/, /aɪ/, /oʊ/, /juː/) و e الأخيرة صامتة."
        },
        {
          "id": "srp_307_m3",
          "type": "gap",
          "promptEn": "Complete: Make a ____ with me.",
          "promptAr": "أكمل الفراغ: (سوّ معي كيكة.)",
          "options": [
            "cack",
            "cake",
            "cak"
          ],
          "correctIndex": 1,
          "answer": "Make a cake with me.",
          "explanationAr": "الإجابة: cake. نمط a_e, i_e, o_e, u_e: الحرف المتحرك ينطق باسمه (/eɪ/, /aɪ/, /oʊ/, /juː/) و e الأخيرة صامتة."
        },
        {
          "id": "srp_307_m4",
          "type": "gap",
          "promptEn": "Complete: Ride your ____ home.",
          "promptAr": "أكمل الفراغ: (سوق سيكلك للبيت.)",
          "options": [
            "bike",
            "back",
            "bik"
          ],
          "correctIndex": 0,
          "answer": "Ride your bike home.",
          "explanationAr": "الإجابة: bike. نمط a_e, i_e, o_e, u_e: الحرف المتحرك ينطق باسمه (/eɪ/, /aɪ/, /oʊ/, /juː/) و e الأخيرة صامتة."
        }
      ],
      "hard": [
        {
          "id": "srp_307_h1",
          "type": "order",
          "promptEn": "Put the words in order: ice. / cube / a / of / Use",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (استخدم مكعب ثلج.)",
          "answer": "Use a cube of ice.",
          "explanationAr": "الترتيب الصحيح: Use a cube of ice."
        },
        {
          "id": "srp_307_h2",
          "type": "order",
          "promptEn": "Put the words in order: The / nine. / game / at / is",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (المباراة الساعة تسع.)",
          "answer": "The game is at nine.",
          "explanationAr": "الترتيب الصحيح: The game is at nine."
        },
        {
          "id": "srp_307_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: نتمنى نفوز.",
          "answer": "We hope to win.",
          "explanationAr": "ترجمة مقترحة: We hope to win."
        },
        {
          "id": "srp_307_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: سوق سيكلك للبيت.",
          "answer": "Ride your bike home.",
          "explanationAr": "ترجمة مقترحة: Ride your bike home."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Pronouncing the final e",
        "correct": "cake /keɪk/ (silent e)",
        "whyAr": "العربي يقرأ كل حرف مكتوب؛ في الإنجليزي كثير حروف صامتة."
      },
      {
        "incorrect": "fine read as fin",
        "correct": "fine /faɪn/",
        "whyAr": "انتبه للـ e الأخيرة."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (الحروف المزدوجة: sh / ch / th / ck): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "think read as «سنك» or «تنك»",
          "think /θɪŋk/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: think /θɪŋk/ — th = «ث»: اللسان بين الأسنان.",
        "fromLessonId": "srp_306"
      },
      {
        "questionAr": "مراجعة (أصوات الحروف N إلى Z): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "van read as «فان» /fæn/",
          "van /væn/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: van /væn/ — v تنطق بالشفة السفلى مع اهتزاز، وليست f.",
        "fromLessonId": "srp_304"
      },
      {
        "questionAr": "ما معنى \"pin\"؟",
        "questionEn": "What does \"pin\" mean?",
        "options": [
          "كوب",
          "سرير",
          "دبوس",
          "يجلس"
        ],
        "correctIndex": 2,
        "explanationAr": "\"pin\" /pɪn/ تعني: دبوس. مثال: a red pin",
        "fromLessonId": "srp_305"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (سوّ معي كيكة.)",
          "questionEn": "Complete: Make a ____ with me.",
          "options": [
            "cack",
            "cake",
            "cak"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: cake. نمط a_e, i_e, o_e, u_e: الحرف المتحرك ينطق باسمه (/eɪ/, /aɪ/, /oʊ/, /juː/) و e الأخيرة صامتة."
        },
        {
          "questionAr": "أكمل الفراغ: (سوق سيكلك للبيت.)",
          "questionEn": "Complete: Ride your ____ home.",
          "options": [
            "bike",
            "back",
            "bik"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: bike. نمط a_e, i_e, o_e, u_e: الحرف المتحرك ينطق باسمه (/eɪ/, /aɪ/, /oʊ/, /juː/) و e الأخيرة صامتة."
        },
        {
          "questionAr": "ما معنى \"hope\"؟",
          "questionEn": "What does \"hope\" mean?",
          "options": [
            "لعبة/مباراة",
            "بيت",
            "يتمنى/أمل",
            "طيارة ورق"
          ],
          "correctIndex": 2,
          "explanationAr": "\"hope\" /hoʊp/ تعني: يتمنى/أمل. مثال: I hope so."
        },
        {
          "questionAr": "ما معنى \"cube\"؟",
          "questionEn": "What does \"cube\" mean?",
          "options": [
            "دراجة",
            "مكعب",
            "طيارة ورق",
            "تسعة"
          ],
          "correctIndex": 1,
          "explanationAr": "\"cube\" /kjuːb/ تعني: مكعب. مثال: an ice cube"
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Pronouncing the final e",
            "cake /keɪk/ (silent e)"
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: cake /keɪk/ (silent e) — العربي يقرأ كل حرف مكتوب؛ في الإنجليزي كثير حروف صامتة."
        }
      ]
    }
  },
  {
    "id": "srp_308",
    "pillarId": "reading",
    "pillarNameAr": "القراءة التعبيرية والنطق الصوتي",
    "pillarNameEn": "Expressive Reading & Pronunciation Lab",
    "pillarIcon": "📖",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "فرق المتحركات: ee / ea / ai / oa",
    "titleEn": "Vowel Teams: ee, ea, ai, oa",
    "descAr": "«لما يمشي حرفين متحركين، الأول يتكلم»: rain, boat, tree, read.",
    "descEn": "When two vowels go walking, the first does the talking: rain, boat, tree, read.",
    "speakingGoalAr": "اقرأ نصاً قصيراً فيه عشر كلمات vowel teams.",
    "speakingGoalEn": "Read a short text with ten vowel-team words.",
    "keyPattern": {
      "ruleAr": "ai و ay = /eɪ/ (rain, day)، ee و ea = /iː/ (tree, sea)، oa و ow = /oʊ/ (boat, snow).",
      "ruleEn": "ai/ay = /eɪ/, ee/ea = /iː/, oa/ow = /oʊ/.",
      "formula": "ai, ay → /eɪ/ | ee, ea → /iː/ | oa, ow → /oʊ/"
    },
    "practicalExamples": [
      {
        "en": "It's a rainy day.",
        "ar": "يوم ماطر."
      },
      {
        "en": "We sail a boat on the sea.",
        "ar": "نبحر بقارب في البحر."
      },
      {
        "en": "Three green trees.",
        "ar": "ثلاث أشجار خضراء."
      },
      {
        "en": "I read and eat at the beach.",
        "ar": "أقرأ وآكل على الشاطئ."
      },
      {
        "en": "Snow is white and cold.",
        "ar": "الثلج أبيض وبارد."
      },
      {
        "en": "Wait for the train.",
        "ar": "انتظر القطار."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "boat read as «بوت» short",
        "correct": "boat /boʊt/",
        "whyAr": "oa = «أو» منزلقة."
      },
      {
        "incorrect": "beach read with short /ɪ/",
        "correct": "beach /biːtʃ/",
        "whyAr": "ea هنا طويلة /iː/ — انتبه للفرق!"
      },
      {
        "incorrect": "rain read as «رَين» with /aɪ/",
        "correct": "rain /reɪn/",
        "whyAr": "ai = «إي»."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اقرأ نص الرحلة بصوت عالي مع الانتباه لطول الحروف.",
      "promptEn": "Read the trip text aloud, watching vowel length.",
      "saraQuestionAr": "اقرأ لي: We go to the beach and see the sea.",
      "saraQuestionEn": "Read: We go to the beach and see the sea.",
      "recommendedResponseEn": "We go to the beach and see the sea. Dad rents a small boat."
    },
    "quiz": [
      {
        "questionAr": "ai في rain:",
        "questionEn": "'ai' in rain:",
        "options": [
          "/aɪ/",
          "/eɪ/",
          "/æ/"
        ],
        "correctIndex": 1,
        "explanationAr": "/eɪ/."
      },
      {
        "questionAr": "أي كلمة فيها /oʊ/؟",
        "questionEn": "Which has /oʊ/?",
        "options": [
          "boat",
          "boot",
          "but"
        ],
        "correctIndex": 0,
        "explanationAr": "oa = /oʊ/."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "boat read as «بوت» short",
          "boat /boʊt/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: boat /boʊt/ — oa = «أو» منزلقة."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "beach read with short /ɪ/",
          "beach /biːtʃ/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: beach /biːtʃ/ — ea هنا طويلة /iː/ — انتبه للفرق!"
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "rain /reɪn/",
          "rain read as «رَين» with /aɪ/"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: rain /reɪn/ — ai = «إي»."
      }
    ],
    "whiteboardNotes": {
      "title": "Vowel Teams: ee, ea, ai, oa",
      "pointsAr": [
        "يقرأ ai/ay.",
        "يقرأ ee/ea.",
        "يقرأ oa/ow.",
        "ai و ay = /eɪ/ (rain, day)، ee و ea = /iː/ (tree, sea)، oa و ow = /oʊ/ (boat, snow)."
      ],
      "pointsEn": [
        "Read ai/ay.",
        "Read ee/ea.",
        "Read oa/ow.",
        "ai/ay = /eɪ/, ee/ea = /iː/, oa/ow = /oʊ/."
      ],
      "chalkHighlight": "ai, ay → /eɪ/ | ee, ea → /iː/ | oa, ow → /oʊ/"
    },
    "unit": 2,
    "cefr": "A1",
    "objectivesAr": [
      "يقرأ ai/ay.",
      "يقرأ ee/ea.",
      "يقرأ oa/ow."
    ],
    "objectivesEn": [
      "Read ai/ay.",
      "Read ee/ea.",
      "Read oa/ow."
    ],
    "vocabulary": [
      {
        "word": "rain",
        "ipa": "/reɪn/",
        "ar": "مطر",
        "exampleEn": "heavy rain",
        "exampleAr": "مطر غزير"
      },
      {
        "word": "day",
        "ipa": "/deɪ/",
        "ar": "يوم",
        "exampleEn": "a nice day",
        "exampleAr": "يوم حلو"
      },
      {
        "word": "train",
        "ipa": "/treɪn/",
        "ar": "قطار",
        "exampleEn": "the Haramain train",
        "exampleAr": "قطار الحرمين"
      },
      {
        "word": "tree",
        "ipa": "/triː/",
        "ar": "شجرة",
        "exampleEn": "a palm tree",
        "exampleAr": "نخلة"
      },
      {
        "word": "sea",
        "ipa": "/siː/",
        "ar": "بحر",
        "exampleEn": "the Red Sea",
        "exampleAr": "البحر الأحمر"
      },
      {
        "word": "beach",
        "ipa": "/biːtʃ/",
        "ar": "شاطئ",
        "exampleEn": "on the beach",
        "exampleAr": "على الشاطئ"
      },
      {
        "word": "boat",
        "ipa": "/boʊt/",
        "ar": "قارب",
        "exampleEn": "a fishing boat",
        "exampleAr": "قارب صيد"
      },
      {
        "word": "snow",
        "ipa": "/snoʊ/",
        "ar": "ثلج",
        "exampleEn": "snow in Tabuk",
        "exampleAr": "ثلج في تبوك"
      },
      {
        "word": "road",
        "ipa": "/roʊd/",
        "ar": "طريق",
        "exampleEn": "a long road",
        "exampleAr": "طريق طويل"
      },
      {
        "word": "green",
        "ipa": "/ɡriːn/",
        "ar": "أخضر",
        "exampleEn": "green grass",
        "exampleAr": "عشب أخضر"
      }
    ],
    "grammarFocus": {
      "ruleAr": "ai و ay = /eɪ/ (rain, day)، ee و ea = /iː/ (tree, sea)، oa و ow = /oʊ/ (boat, snow).",
      "ruleEn": "ai/ay = /eɪ/, ee/ea = /iː/, oa/ow = /oʊ/.",
      "formula": "ai, ay → /eɪ/ | ee, ea → /iː/ | oa, ow → /oʊ/",
      "examples": [
        {
          "en": "It's a rainy day.",
          "ar": "يوم ماطر."
        },
        {
          "en": "We sail a boat on the sea.",
          "ar": "نبحر بقارب في البحر."
        },
        {
          "en": "Three green trees.",
          "ar": "ثلاث أشجار خضراء."
        },
        {
          "en": "I read and eat at the beach.",
          "ar": "أقرأ وآكل على الشاطئ."
        },
        {
          "en": "Snow is white and cold.",
          "ar": "الثلج أبيض وبارد."
        },
        {
          "en": "Wait for the train.",
          "ar": "انتظر القطار."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Text",
        "en": "On a hot day, we take the train to Jeddah.",
        "ar": "في يوم حار ناخذ القطار لجدة."
      },
      {
        "speaker": "Text",
        "en": "We go to the beach and see the sea.",
        "ar": "نروح الشاطئ ونشوف البحر."
      },
      {
        "speaker": "Text",
        "en": "Dad rents a small boat.",
        "ar": "أبوي يستأجر قارب صغير."
      },
      {
        "speaker": "Text",
        "en": "We eat and read under a tree.",
        "ar": "ناكل ونقرأ تحت شجرة."
      },
      {
        "speaker": "Text",
        "en": "Then the rain comes!",
        "ar": "بعدين جا المطر!"
      },
      {
        "speaker": "Text",
        "en": "We wait in the car and play a game.",
        "ar": "ننتظر في السيارة ونلعب لعبة."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Text: On a hot day, we take the train to Jeddah.\nText: We go to the beach and see the sea.\nText: Dad rents a small boat.\nText: We eat and read under a tree.\nText: Then the rain comes!\nText: We wait in the car and play a game.",
      "questions": [
        {
          "questionAr": "كيف راحوا جدة؟",
          "questionEn": "How do they go to Jeddah?",
          "options": [
            "by car",
            "by train",
            "by plane"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: by train"
        },
        {
          "questionAr": "وش استأجر الأب؟",
          "questionEn": "What does Dad rent?",
          "options": [
            "a car",
            "a boat",
            "a tent"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: a boat"
        },
        {
          "questionAr": "وش صار بالآخر؟",
          "questionEn": "What happens at the end?",
          "options": [
            "it snows",
            "it rains",
            "they swim"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: it rains"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "/eɪ/ rain, /iː/ sea, /oʊ/ boat",
      "items": [
        "rain /reɪn/",
        "sea /siː/",
        "boat /boʊt/",
        "road /roʊd/"
      ],
      "tipAr": "/oʊ/ ابدأ «أ» وانتهِ بـ «و» مع تدوير الشفاه."
    },
    "exercises": {
      "easy": [
        {
          "id": "srp_308_e1",
          "type": "meaning",
          "promptEn": "What does \"rain\" mean?",
          "promptAr": "ما معنى \"rain\"؟",
          "options": [
            "شاطئ",
            "قطار",
            "أخضر",
            "مطر"
          ],
          "correctIndex": 3,
          "answer": "مطر",
          "explanationAr": "\"rain\" /reɪn/ تعني: مطر. مثال: heavy rain"
        },
        {
          "id": "srp_308_e2",
          "type": "meaning",
          "promptEn": "What does \"day\" mean?",
          "promptAr": "ما معنى \"day\"؟",
          "options": [
            "قطار",
            "طريق",
            "يوم",
            "شاطئ"
          ],
          "correctIndex": 2,
          "answer": "يوم",
          "explanationAr": "\"day\" /deɪ/ تعني: يوم. مثال: a nice day"
        },
        {
          "id": "srp_308_e3",
          "type": "meaning",
          "promptEn": "What does \"train\" mean?",
          "promptAr": "ما معنى \"train\"؟",
          "options": [
            "ثلج",
            "قطار",
            "مطر",
            "طريق"
          ],
          "correctIndex": 1,
          "answer": "قطار",
          "explanationAr": "\"train\" /treɪn/ تعني: قطار. مثال: the Haramain train"
        },
        {
          "id": "srp_308_e4",
          "type": "meaning",
          "promptEn": "What does \"tree\" mean?",
          "promptAr": "ما معنى \"tree\"؟",
          "options": [
            "يوم",
            "شجرة",
            "بحر",
            "مطر"
          ],
          "correctIndex": 1,
          "answer": "شجرة",
          "explanationAr": "\"tree\" /triː/ تعني: شجرة. مثال: a palm tree"
        }
      ],
      "medium": [
        {
          "id": "srp_308_m1",
          "type": "gap",
          "promptEn": "Complete: It's a ____ day.",
          "promptAr": "أكمل الفراغ: (يوم ماطر.)",
          "options": [
            "reeny",
            "ranny",
            "rainy"
          ],
          "correctIndex": 2,
          "answer": "It's a rainy day.",
          "explanationAr": "الإجابة: rainy. ai و ay = /eɪ/ (rain, day)، ee و ea = /iː/ (tree, sea)، oa و ow = /oʊ/ (boat, snow)."
        },
        {
          "id": "srp_308_m2",
          "type": "gap",
          "promptEn": "Complete: We sail a ____ on the sea.",
          "promptAr": "أكمل الفراغ: (نبحر بقارب في البحر.)",
          "options": [
            "boot",
            "boat",
            "bot"
          ],
          "correctIndex": 1,
          "answer": "We sail a boat on the sea.",
          "explanationAr": "الإجابة: boat. ai و ay = /eɪ/ (rain, day)، ee و ea = /iː/ (tree, sea)، oa و ow = /oʊ/ (boat, snow)."
        },
        {
          "id": "srp_308_m3",
          "type": "gap",
          "promptEn": "Complete: Three green ____.",
          "promptAr": "أكمل الفراغ: (ثلاث أشجار خضراء.)",
          "options": [
            "trays",
            "trees",
            "tries"
          ],
          "correctIndex": 1,
          "answer": "Three green trees.",
          "explanationAr": "الإجابة: trees. ai و ay = /eɪ/ (rain, day)، ee و ea = /iː/ (tree, sea)، oa و ow = /oʊ/ (boat, snow)."
        },
        {
          "id": "srp_308_m4",
          "type": "gap",
          "promptEn": "Complete: I read and eat at the ____.",
          "promptAr": "أكمل الفراغ: (أقرأ وآكل على الشاطئ.)",
          "options": [
            "beach",
            "batch",
            "bench"
          ],
          "correctIndex": 0,
          "answer": "I read and eat at the beach.",
          "explanationAr": "الإجابة: beach. ai و ay = /eɪ/ (rain, day)، ee و ea = /iː/ (tree, sea)، oa و ow = /oʊ/ (boat, snow)."
        }
      ],
      "hard": [
        {
          "id": "srp_308_h1",
          "type": "order",
          "promptEn": "Put the words in order: white / is / Snow / and / cold.",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (الثلج أبيض وبارد.)",
          "answer": "Snow is white and cold.",
          "explanationAr": "الترتيب الصحيح: Snow is white and cold."
        },
        {
          "id": "srp_308_h2",
          "type": "order",
          "promptEn": "Put the words in order: the / Wait / for / train.",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (انتظر القطار.)",
          "answer": "Wait for the train.",
          "explanationAr": "الترتيب الصحيح: Wait for the train."
        },
        {
          "id": "srp_308_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: نبحر بقارب في البحر.",
          "answer": "We sail a boat on the sea.",
          "explanationAr": "ترجمة مقترحة: We sail a boat on the sea."
        },
        {
          "id": "srp_308_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أقرأ وآكل على الشاطئ.",
          "answer": "I read and eat at the beach.",
          "explanationAr": "ترجمة مقترحة: I read and eat at the beach."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Reading every vowel separately: «بو-آت»",
        "correct": "boat = one sound /oʊ/",
        "whyAr": "الحرفان صوت واحد."
      },
      {
        "incorrect": "Short /ɪ/ in beach, read, sea",
        "correct": "Make /iː/ long and smiley: beach, read, sea",
        "whyAr": "الطول هنا يغير المعنى، فمد الصوت."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (الحرف e السحري: الحروف الطويلة): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "hope read as hop",
          "hope /hoʊp/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: hope /hoʊp/ — e تخلي o تقول اسمها «أو».",
        "fromLessonId": "srp_307"
      },
      {
        "questionAr": "مراجعة (قراءة كلمات CVC: دمج الأصوات): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "bed /bɛd/",
          "bed read as bad"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: bed /bɛd/ — e القصيرة «إ» مفتوحة شوي.",
        "fromLessonId": "srp_305"
      },
      {
        "questionAr": "ما معنى \"fish\"؟",
        "questionEn": "What does \"fish\" mean?",
        "options": [
          "شريحة بطاطس",
          "يشكر",
          "بطة",
          "سمك"
        ],
        "correctIndex": 3,
        "explanationAr": "\"fish\" /fɪʃ/ تعني: سمك. مثال: fish and chips",
        "fromLessonId": "srp_306"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (ثلاث أشجار خضراء.)",
          "questionEn": "Complete: Three green ____.",
          "options": [
            "trays",
            "trees",
            "tries"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: trees. ai و ay = /eɪ/ (rain, day)، ee و ea = /iː/ (tree, sea)، oa و ow = /oʊ/ (boat, snow)."
        },
        {
          "questionAr": "أكمل الفراغ: (أقرأ وآكل على الشاطئ.)",
          "questionEn": "Complete: I read and eat at the ____.",
          "options": [
            "beach",
            "batch",
            "bench"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: beach. ai و ay = /eɪ/ (rain, day)، ee و ea = /iː/ (tree, sea)، oa و ow = /oʊ/ (boat, snow)."
        },
        {
          "questionAr": "ما معنى \"sea\"؟",
          "questionEn": "What does \"sea\" mean?",
          "options": [
            "أخضر",
            "بحر",
            "قارب",
            "شجرة"
          ],
          "correctIndex": 1,
          "explanationAr": "\"sea\" /siː/ تعني: بحر. مثال: the Red Sea"
        },
        {
          "questionAr": "ما معنى \"beach\"؟",
          "questionEn": "What does \"beach\" mean?",
          "options": [
            "شاطئ",
            "يوم",
            "قطار",
            "بحر"
          ],
          "correctIndex": 0,
          "explanationAr": "\"beach\" /biːtʃ/ تعني: شاطئ. مثال: on the beach"
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Reading every vowel separately: «بو-آت»",
            "boat = one sound /oʊ/"
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: boat = one sound /oʊ/ — الحرفان صوت واحد."
        }
      ]
    }
  },
  {
    "id": "srp_309",
    "pillarId": "reading",
    "pillarNameAr": "القراءة التعبيرية والنطق الصوتي",
    "pillarNameEn": "Expressive Reading & Pronunciation Lab",
    "pillarIcon": "📖",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "P و B: أشهر مشكلة نطق عند العرب",
    "titleEn": "P vs B: The #1 Arabic Speaker Sound",
    "descAr": "العربي ما فيه P، فيطلع «بارك» بدل park. تعلم تنفخ الهواء.",
    "descEn": "Arabic has no /p/, so 'park' becomes 'bark'. Learn to release air.",
    "speakingGoalAr": "انطق عشرة أزواج p/b بشكل صحيح.",
    "speakingGoalEn": "Pronounce ten p/b pairs correctly.",
    "keyPattern": {
      "ruleAr": "p و b نفس مكان الشفتين، لكن p مهموسة مع نفخة هواء (aspiration) بدون اهتزاز الحنجرة، و b مجهورة.",
      "ruleEn": "/p/ and /b/ use both lips; /p/ is voiceless with a puff of air, /b/ is voiced.",
      "formula": "/p/ = lips + puff, no voice | /b/ = lips + voice"
    },
    "practicalExamples": [
      {
        "en": "Park the car, please.",
        "ar": "اصفّ السيارة لو سمحت."
      },
      {
        "en": "I need a pen, not a bin.",
        "ar": "أحتاج قلم مو سلة."
      },
      {
        "en": "Put the peas on the plate.",
        "ar": "حط البازلاء في الصحن."
      },
      {
        "en": "Pay at the pump.",
        "ar": "ادفع عند المضخة."
      },
      {
        "en": "Pizza and pepsi, please.",
        "ar": "بيتزا وبيبسي لو سمحت."
      },
      {
        "en": "My pet is a parrot.",
        "ar": "حيواني الأليف ببغاء."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "I want to bark here.",
        "correct": "I want to park here.",
        "whyAr": "bark = ينبح! خطأ p يغير المعنى."
      },
      {
        "incorrect": "Bebsi",
        "correct": "Pepsi /ˈpɛpsi/",
        "whyAr": "حتى الأسماء التجارية لها p."
      },
      {
        "incorrect": "Bray for me.",
        "correct": "Pray for me.",
        "whyAr": "pray = يصلي، bray = نهيق!"
      }
    ],
    "speakingChallenge": {
      "promptAr": "اقرأ: Paul pays to park near the pool.",
      "promptEn": "Read: Paul pays to park near the pool.",
      "saraQuestionAr": "قلها ثلاث مرات وكل مرة أسرع!",
      "saraQuestionEn": "Say it three times, faster each time!",
      "recommendedResponseEn": "Paul pays to park near the pool."
    },
    "quiz": [
      {
        "questionAr": "«يصلي» =",
        "questionEn": "'يصلي' =",
        "options": [
          "bray",
          "pray",
          "play"
        ],
        "correctIndex": 1,
        "explanationAr": "pray /preɪ/."
      },
      {
        "questionAr": "cap و cab:",
        "questionEn": "cap vs cab:",
        "options": [
          "same",
          "different",
          "both mean taxi"
        ],
        "correctIndex": 1,
        "explanationAr": "cap = طاقية، cab = تاكسي."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I want to park here.",
          "I want to bark here."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I want to park here. — bark = ينبح! خطأ p يغير المعنى."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Pepsi /ˈpɛpsi/",
          "Bebsi"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Pepsi /ˈpɛpsi/ — حتى الأسماء التجارية لها p."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Pray for me.",
          "Bray for me."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Pray for me. — pray = يصلي، bray = نهيق!"
      }
    ],
    "whiteboardNotes": {
      "title": "P vs B: The #1 Arabic Speaker Sound",
      "pointsAr": [
        "ينطق p بنفخة هواء.",
        "يميز p من b سماعاً.",
        "يقرأ جملاً فيها p كثيرة.",
        "p و b نفس مكان الشفتين، لكن p مهموسة مع نفخة هواء (aspiration) بدون اهتزاز الحنجرة، و b مجهورة."
      ],
      "pointsEn": [
        "Produce /p/ with aspiration.",
        "Hear p vs b.",
        "Read p-heavy sentences.",
        "/p/ and /b/ use both lips; /p/ is voiceless with a puff of air, /b/ is voiced."
      ],
      "chalkHighlight": "/p/ = lips + puff, no voice | /b/ = lips + voice"
    },
    "unit": 2,
    "cefr": "A1",
    "objectivesAr": [
      "ينطق p بنفخة هواء.",
      "يميز p من b سماعاً.",
      "يقرأ جملاً فيها p كثيرة."
    ],
    "objectivesEn": [
      "Produce /p/ with aspiration.",
      "Hear p vs b.",
      "Read p-heavy sentences."
    ],
    "vocabulary": [
      {
        "word": "park",
        "ipa": "/pɑːrk/",
        "ar": "يصف/حديقة",
        "exampleEn": "park the car",
        "exampleAr": "صف السيارة"
      },
      {
        "word": "pen",
        "ipa": "/pɛn/",
        "ar": "قلم",
        "exampleEn": "a black pen",
        "exampleAr": "قلم أسود"
      },
      {
        "word": "pray",
        "ipa": "/preɪ/",
        "ar": "يصلي",
        "exampleEn": "We pray five times.",
        "exampleAr": "نصلي خمس مرات."
      },
      {
        "word": "pay",
        "ipa": "/peɪ/",
        "ar": "يدفع",
        "exampleEn": "Pay here.",
        "exampleAr": "ادفع هنا."
      },
      {
        "word": "plate",
        "ipa": "/pleɪt/",
        "ar": "صحن",
        "exampleEn": "a big plate",
        "exampleAr": "صحن كبير"
      },
      {
        "word": "peas",
        "ipa": "/piːz/",
        "ar": "بازلاء",
        "exampleEn": "rice with peas",
        "exampleAr": "رز بالبازلاء"
      },
      {
        "word": "pet",
        "ipa": "/pɛt/",
        "ar": "حيوان أليف",
        "exampleEn": "Do you have a pet?",
        "exampleAr": "عندك حيوان؟"
      },
      {
        "word": "bin",
        "ipa": "/bɪn/",
        "ar": "سلة مهملات",
        "exampleEn": "Put it in the bin.",
        "exampleAr": "ارميه في الزبالة."
      },
      {
        "word": "bark",
        "ipa": "/bɑːrk/",
        "ar": "ينبح",
        "exampleEn": "Dogs bark.",
        "exampleAr": "الكلاب تنبح."
      },
      {
        "word": "pool",
        "ipa": "/puːl/",
        "ar": "مسبح",
        "exampleEn": "a swimming pool",
        "exampleAr": "مسبح"
      }
    ],
    "grammarFocus": {
      "ruleAr": "p و b نفس مكان الشفتين، لكن p مهموسة مع نفخة هواء (aspiration) بدون اهتزاز الحنجرة، و b مجهورة.",
      "ruleEn": "/p/ and /b/ use both lips; /p/ is voiceless with a puff of air, /b/ is voiced.",
      "formula": "/p/ = lips + puff, no voice | /b/ = lips + voice",
      "examples": [
        {
          "en": "Park the car, please.",
          "ar": "اصفّ السيارة لو سمحت."
        },
        {
          "en": "I need a pen, not a bin.",
          "ar": "أحتاج قلم مو سلة."
        },
        {
          "en": "Put the peas on the plate.",
          "ar": "حط البازلاء في الصحن."
        },
        {
          "en": "Pay at the pump.",
          "ar": "ادفع عند المضخة."
        },
        {
          "en": "Pizza and pepsi, please.",
          "ar": "بيتزا وبيبسي لو سمحت."
        },
        {
          "en": "My pet is a parrot.",
          "ar": "حيواني الأليف ببغاء."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Text",
        "en": "Paul wants to park near the pool.",
        "ar": "بول يبي يصف قريب من المسبح."
      },
      {
        "speaker": "Text",
        "en": "He pays at the gate.",
        "ar": "يدفع عند البوابة."
      },
      {
        "speaker": "Text",
        "en": "Then he buys pizza and a cup of tea.",
        "ar": "بعدين يشتري بيتزا وكوب شاي."
      },
      {
        "speaker": "Text",
        "en": "His pet parrot is in a big box.",
        "ar": "ببغاؤه في صندوق كبير."
      },
      {
        "speaker": "Text",
        "en": "The parrot says, \"Pretty Paul!\"",
        "ar": "الببغاء يقول: «بول الحلو!»"
      },
      {
        "speaker": "Text",
        "en": "People laugh and clap.",
        "ar": "الناس يضحكون ويصفقون."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Text: Paul wants to park near the pool.\nText: He pays at the gate.\nText: Then he buys pizza and a cup of tea.\nText: His pet parrot is in a big box.\nText: The parrot says, \"Pretty Paul!\"\nText: People laugh and clap.",
      "questions": [
        {
          "questionAr": "وين يصف بول؟",
          "questionEn": "Where does Paul want to park?",
          "options": [
            "near the park",
            "near the pool",
            "near the shop"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: near the pool"
        },
        {
          "questionAr": "حيوانه؟",
          "questionEn": "What is his pet?",
          "options": [
            "a dog",
            "a cat",
            "a parrot"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: a parrot"
        },
        {
          "questionAr": "وش يقول الببغاء؟",
          "questionEn": "What does the parrot say?",
          "options": [
            "Pretty Paul!",
            "Hello!",
            "Pay please!"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: Pretty Paul!"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Paper test: /p/ moves the paper, /b/ doesn't",
      "items": [
        "pen – Ben",
        "pear – bear",
        "pie – buy",
        "cap – cab"
      ],
      "tipAr": "حط ورقة قدام فمك: مع p لازم تتحرك الورقة. مع b ما تتحرك."
    },
    "exercises": {
      "easy": [
        {
          "id": "srp_309_e1",
          "type": "meaning",
          "promptEn": "What does \"park\" mean?",
          "promptAr": "ما معنى \"park\"؟",
          "options": [
            "صحن",
            "يصف/حديقة",
            "يصلي",
            "سلة مهملات"
          ],
          "correctIndex": 1,
          "answer": "يصف/حديقة",
          "explanationAr": "\"park\" /pɑːrk/ تعني: يصف/حديقة. مثال: park the car"
        },
        {
          "id": "srp_309_e2",
          "type": "meaning",
          "promptEn": "What does \"pen\" mean?",
          "promptAr": "ما معنى \"pen\"؟",
          "options": [
            "قلم",
            "مسبح",
            "يصف/حديقة",
            "سلة مهملات"
          ],
          "correctIndex": 0,
          "answer": "قلم",
          "explanationAr": "\"pen\" /pɛn/ تعني: قلم. مثال: a black pen"
        },
        {
          "id": "srp_309_e3",
          "type": "meaning",
          "promptEn": "What does \"pray\" mean?",
          "promptAr": "ما معنى \"pray\"؟",
          "options": [
            "صحن",
            "يصلي",
            "حيوان أليف",
            "بازلاء"
          ],
          "correctIndex": 1,
          "answer": "يصلي",
          "explanationAr": "\"pray\" /preɪ/ تعني: يصلي. مثال: We pray five times."
        },
        {
          "id": "srp_309_e4",
          "type": "meaning",
          "promptEn": "What does \"pay\" mean?",
          "promptAr": "ما معنى \"pay\"؟",
          "options": [
            "صحن",
            "يصف/حديقة",
            "يدفع",
            "قلم"
          ],
          "correctIndex": 2,
          "answer": "يدفع",
          "explanationAr": "\"pay\" /peɪ/ تعني: يدفع. مثال: Pay here."
        }
      ],
      "medium": [
        {
          "id": "srp_309_m1",
          "type": "gap",
          "promptEn": "Complete: ____ the car, please.",
          "promptAr": "أكمل الفراغ: (اصفّ السيارة لو سمحت.)",
          "options": [
            "Park",
            "Bark",
            "Pork"
          ],
          "correctIndex": 0,
          "answer": "Park the car, please.",
          "explanationAr": "الإجابة: Park. p و b نفس مكان الشفتين، لكن p مهموسة مع نفخة هواء (aspiration) بدون اهتزاز الحنجرة، و b مجهورة."
        },
        {
          "id": "srp_309_m2",
          "type": "gap",
          "promptEn": "Complete: I need a ____, not a bin.",
          "promptAr": "أكمل الفراغ: (أحتاج قلم مو سلة.)",
          "options": [
            "bin",
            "pen",
            "ben"
          ],
          "correctIndex": 1,
          "answer": "I need a pen, not a bin.",
          "explanationAr": "الإجابة: pen. p و b نفس مكان الشفتين، لكن p مهموسة مع نفخة هواء (aspiration) بدون اهتزاز الحنجرة، و b مجهورة."
        },
        {
          "id": "srp_309_m3",
          "type": "gap",
          "promptEn": "Complete: Put the ____ on the plate.",
          "promptAr": "أكمل الفراغ: (حط البازلاء في الصحن.)",
          "options": [
            "bees",
            "peas",
            "pies"
          ],
          "correctIndex": 1,
          "answer": "Put the peas on the plate.",
          "explanationAr": "الإجابة: peas. p و b نفس مكان الشفتين، لكن p مهموسة مع نفخة هواء (aspiration) بدون اهتزاز الحنجرة، و b مجهورة."
        },
        {
          "id": "srp_309_m4",
          "type": "gap",
          "promptEn": "Complete: ____ at the pump.",
          "promptAr": "أكمل الفراغ: (ادفع عند المضخة.)",
          "options": [
            "Pay",
            "Bay",
            "Buy"
          ],
          "correctIndex": 0,
          "answer": "Pay at the pump.",
          "explanationAr": "الإجابة: Pay. p و b نفس مكان الشفتين، لكن p مهموسة مع نفخة هواء (aspiration) بدون اهتزاز الحنجرة، و b مجهورة."
        }
      ],
      "hard": [
        {
          "id": "srp_309_h1",
          "type": "order",
          "promptEn": "Put the words in order: pepsi, / please. / and / Pizza",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (بيتزا وبيبسي لو سمحت.)",
          "answer": "Pizza and pepsi, please.",
          "explanationAr": "الترتيب الصحيح: Pizza and pepsi, please."
        },
        {
          "id": "srp_309_h2",
          "type": "order",
          "promptEn": "Put the words in order: is / My / parrot. / pet / a",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (حيواني الأليف ببغاء.)",
          "answer": "My pet is a parrot.",
          "explanationAr": "الترتيب الصحيح: My pet is a parrot."
        },
        {
          "id": "srp_309_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أحتاج قلم مو سلة.",
          "answer": "I need a pen, not a bin.",
          "explanationAr": "ترجمة مقترحة: I need a pen, not a bin."
        },
        {
          "id": "srp_309_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: ادفع عند المضخة.",
          "answer": "Pay at the pump.",
          "explanationAr": "ترجمة مقترحة: Pay at the pump."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Bebsi / Bizza",
        "correct": "Pepsi / pizza",
        "whyAr": "لاحظ الأسماء اللي تستخدمها يومياً."
      },
      {
        "incorrect": "Hard /b/ for every p in fast speech",
        "correct": "Practise slowly first: p-p-park",
        "whyAr": "ابدأ ببطء ثم سرّع."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (فرق المتحركات: ee / ea / ai / oa): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "beach read with short /ɪ/",
          "beach /biːtʃ/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: beach /biːtʃ/ — ea هنا طويلة /iː/ — انتبه للفرق!",
        "fromLessonId": "srp_308"
      },
      {
        "questionAr": "مراجعة (الحروف المزدوجة: sh / ch / th / ck): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "chip read as «شيب»",
          "chip /tʃɪp/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: chip /tʃɪp/ — ch فيها «ت» قبل «ش».",
        "fromLessonId": "srp_306"
      },
      {
        "questionAr": "مراجعة (أصوات الحروف A إلى M): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "ball /bɔːl/",
          "ball read as /bi:/-all"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: ball /bɔːl/ — نقرأ بصوت الحرف /b/ وليس اسمه «بي».",
        "fromLessonId": "srp_301"
      },
      {
        "questionAr": "ما معنى \"tube\"؟",
        "questionEn": "What does \"tube\" mean?",
        "options": [
          "تسعة",
          "طيارة ورق",
          "أنبوب",
          "لعبة/مباراة"
        ],
        "correctIndex": 2,
        "explanationAr": "\"tube\" /tuːb/ تعني: أنبوب. مثال: a tube of paste",
        "fromLessonId": "srp_307"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (حط البازلاء في الصحن.)",
          "questionEn": "Complete: Put the ____ on the plate.",
          "options": [
            "bees",
            "peas",
            "pies"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: peas. p و b نفس مكان الشفتين، لكن p مهموسة مع نفخة هواء (aspiration) بدون اهتزاز الحنجرة، و b مجهورة."
        },
        {
          "questionAr": "أكمل الفراغ: (ادفع عند المضخة.)",
          "questionEn": "Complete: ____ at the pump.",
          "options": [
            "Pay",
            "Bay",
            "Buy"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: Pay. p و b نفس مكان الشفتين، لكن p مهموسة مع نفخة هواء (aspiration) بدون اهتزاز الحنجرة، و b مجهورة."
        },
        {
          "questionAr": "ما معنى \"plate\"؟",
          "questionEn": "What does \"plate\" mean?",
          "options": [
            "قلم",
            "حيوان أليف",
            "مسبح",
            "صحن"
          ],
          "correctIndex": 3,
          "explanationAr": "\"plate\" /pleɪt/ تعني: صحن. مثال: a big plate"
        },
        {
          "questionAr": "ما معنى \"peas\"؟",
          "questionEn": "What does \"peas\" mean?",
          "options": [
            "يصف/حديقة",
            "قلم",
            "يدفع",
            "بازلاء"
          ],
          "correctIndex": 3,
          "explanationAr": "\"peas\" /piːz/ تعني: بازلاء. مثال: rice with peas"
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Bebsi / Bizza",
            "Pepsi / pizza"
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: Pepsi / pizza — لاحظ الأسماء اللي تستخدمها يومياً."
        }
      ]
    }
  },
  {
    "id": "srp_310",
    "pillarId": "reading",
    "pillarNameAr": "القراءة التعبيرية والنطق الصوتي",
    "pillarNameEn": "Expressive Reading & Pronunciation Lab",
    "pillarIcon": "📖",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "ship أو sheep؟ الفرق بين /ɪ/ و /iː/",
    "titleEn": "Ship or Sheep? /ɪ/ vs /iː/",
    "descAr": "الطول يغير المعنى: live/leave, sit/seat, fill/feel.",
    "descEn": "Length changes meaning: live/leave, sit/seat, fill/feel.",
    "speakingGoalAr": "انطق عشرة أزواج /ɪ/ و /iː/ صح.",
    "speakingGoalEn": "Pronounce ten /ɪ/–/iː/ pairs correctly.",
    "keyPattern": {
      "ruleAr": "/ɪ/ قصير ومسترخي (sit)، و /iː/ طويل والشفاه مبتسمة (seat). الكتابة غالباً: i = قصير، ee/ea = طويل.",
      "ruleEn": "/ɪ/ short and relaxed; /iː/ long with a smile. i often short; ee/ea long.",
      "formula": "/ɪ/: sit, ship, live | /iː/: seat, sheep, leave"
    },
    "practicalExamples": [
      {
        "en": "Please sit in your seat.",
        "ar": "اجلس في مقعدك لو سمحت."
      },
      {
        "en": "I live in Riyadh, but I leave tomorrow.",
        "ar": "أسكن الرياض بس بمشي بكرة."
      },
      {
        "en": "Fill the cup. I feel thirsty.",
        "ar": "عبّ الكوب. حاس بعطش."
      },
      {
        "en": "The sheep is on the ship.",
        "ar": "الخروف على السفينة."
      },
      {
        "en": "Is this his cheap pen?",
        "ar": "هذا قلمه الرخيص؟"
      },
      {
        "en": "Eat it, don't hit it!",
        "ar": "كله، لا تضربه!"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "I leave in Jeddah.",
        "correct": "I live in Jeddah.",
        "whyAr": "live قصيرة = يسكن؛ leave طويلة = يغادر."
      },
      {
        "incorrect": "Please sheet down.",
        "correct": "Please sit down.",
        "whyAr": "sit قصيرة."
      },
      {
        "incorrect": "This is very sheep.",
        "correct": "This is very cheap.",
        "whyAr": "cheap = رخيص بـ ch."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اقرأ قصة خروف العيد.",
      "promptEn": "Read the Eid sheep story.",
      "saraQuestionAr": "اقرأ وركّز على sheep و cheap و live و leave!",
      "saraQuestionEn": "Read and focus on sheep/cheap/live/leave!",
      "recommendedResponseEn": "Before Eid, my father buys a sheep. It's not cheap this year. We live in a small house."
    },
    "quiz": [
      {
        "questionAr": "«يسكن» =",
        "questionEn": "'يسكن' =",
        "options": [
          "leave",
          "live",
          "life"
        ],
        "correctIndex": 1,
        "explanationAr": "live /lɪv/."
      },
      {
        "questionAr": "أي كلمة صوتها طويل؟",
        "questionEn": "Which has a long sound?",
        "options": [
          "fit",
          "feet",
          "fist"
        ],
        "correctIndex": 1,
        "explanationAr": "feet /fiːt/."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I leave in Jeddah.",
          "I live in Jeddah."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I live in Jeddah. — live قصيرة = يسكن؛ leave طويلة = يغادر."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Please sit down.",
          "Please sheet down."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Please sit down. — sit قصيرة."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "This is very sheep.",
          "This is very cheap."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: This is very cheap. — cheap = رخيص بـ ch."
      }
    ],
    "whiteboardNotes": {
      "title": "Ship or Sheep? /ɪ/ vs /iː/",
      "pointsAr": [
        "يميز سماعاً بين الصوتين.",
        "ينطق /iː/ طويلة مبتسمة.",
        "يفهم تغير المعنى.",
        "/ɪ/ قصير ومسترخي (sit)، و /iː/ طويل والشفاه مبتسمة (seat). الكتابة غالباً: i = قصير، ee/ea = طويل."
      ],
      "pointsEn": [
        "Hear the difference.",
        "Produce a long smiling /iː/.",
        "Understand meaning changes.",
        "/ɪ/ short and relaxed; /iː/ long with a smile. i often short; ee/ea long."
      ],
      "chalkHighlight": "/ɪ/: sit, ship, live | /iː/: seat, sheep, leave"
    },
    "unit": 2,
    "cefr": "A1",
    "objectivesAr": [
      "يميز سماعاً بين الصوتين.",
      "ينطق /iː/ طويلة مبتسمة.",
      "يفهم تغير المعنى."
    ],
    "objectivesEn": [
      "Hear the difference.",
      "Produce a long smiling /iː/.",
      "Understand meaning changes."
    ],
    "vocabulary": [
      {
        "word": "sit",
        "ipa": "/sɪt/",
        "ar": "يجلس",
        "exampleEn": "sit down",
        "exampleAr": "اجلس"
      },
      {
        "word": "seat",
        "ipa": "/siːt/",
        "ar": "مقعد",
        "exampleEn": "a window seat",
        "exampleAr": "مقعد شباك"
      },
      {
        "word": "live",
        "ipa": "/lɪv/",
        "ar": "يسكن",
        "exampleEn": "I live here.",
        "exampleAr": "أسكن هنا."
      },
      {
        "word": "leave",
        "ipa": "/liːv/",
        "ar": "يغادر",
        "exampleEn": "We leave at six.",
        "exampleAr": "نطلع ست."
      },
      {
        "word": "ship",
        "ipa": "/ʃɪp/",
        "ar": "سفينة",
        "exampleEn": "a cargo ship",
        "exampleAr": "سفينة شحن"
      },
      {
        "word": "sheep",
        "ipa": "/ʃiːp/",
        "ar": "خروف",
        "exampleEn": "sheep for Eid",
        "exampleAr": "خروف العيد"
      },
      {
        "word": "fill",
        "ipa": "/fɪl/",
        "ar": "يعبّي",
        "exampleEn": "fill the tank",
        "exampleAr": "عبّ الخزان"
      },
      {
        "word": "feel",
        "ipa": "/fiːl/",
        "ar": "يحس",
        "exampleEn": "I feel good.",
        "exampleAr": "أحس بخير."
      },
      {
        "word": "cheap",
        "ipa": "/tʃiːp/",
        "ar": "رخيص",
        "exampleEn": "It's cheap.",
        "exampleAr": "رخيص."
      },
      {
        "word": "chip",
        "ipa": "/tʃɪp/",
        "ar": "شريحة/رقاقة",
        "exampleEn": "a computer chip",
        "exampleAr": "شريحة كمبيوتر"
      }
    ],
    "grammarFocus": {
      "ruleAr": "/ɪ/ قصير ومسترخي (sit)، و /iː/ طويل والشفاه مبتسمة (seat). الكتابة غالباً: i = قصير، ee/ea = طويل.",
      "ruleEn": "/ɪ/ short and relaxed; /iː/ long with a smile. i often short; ee/ea long.",
      "formula": "/ɪ/: sit, ship, live | /iː/: seat, sheep, leave",
      "examples": [
        {
          "en": "Please sit in your seat.",
          "ar": "اجلس في مقعدك لو سمحت."
        },
        {
          "en": "I live in Riyadh, but I leave tomorrow.",
          "ar": "أسكن الرياض بس بمشي بكرة."
        },
        {
          "en": "Fill the cup. I feel thirsty.",
          "ar": "عبّ الكوب. حاس بعطش."
        },
        {
          "en": "The sheep is on the ship.",
          "ar": "الخروف على السفينة."
        },
        {
          "en": "Is this his cheap pen?",
          "ar": "هذا قلمه الرخيص؟"
        },
        {
          "en": "Eat it, don't hit it!",
          "ar": "كله، لا تضربه!"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Text",
        "en": "Before Eid, my father buys a sheep.",
        "ar": "قبل العيد أبوي يشتري خروف."
      },
      {
        "speaker": "Text",
        "en": "It's not cheap this year.",
        "ar": "مو رخيص هالسنة."
      },
      {
        "speaker": "Text",
        "en": "We live in a small house, so the sheep stays on the roof!",
        "ar": "ساكنين في بيت صغير، فالخروف يجلس في السطح!"
      },
      {
        "speaker": "Text",
        "en": "My little brother sits with it and feeds it.",
        "ar": "أخوي الصغير يجلس معه ويأكله."
      },
      {
        "speaker": "Text",
        "en": "He feels sad when it leaves.",
        "ar": "يزعل لما يروح."
      },
      {
        "speaker": "Text",
        "en": "Eid Mubarak!",
        "ar": "عيدكم مبارك!"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Text: Before Eid, my father buys a sheep.\nText: It's not cheap this year.\nText: We live in a small house, so the sheep stays on the roof!\nText: My little brother sits with it and feeds it.\nText: He feels sad when it leaves.\nText: Eid Mubarak!",
      "questions": [
        {
          "questionAr": "وش اشترى الأب؟",
          "questionEn": "What does the father buy?",
          "options": [
            "a ship",
            "a sheep",
            "a chip"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: a sheep"
        },
        {
          "questionAr": "وين يجلس؟",
          "questionEn": "Where does it stay?",
          "options": [
            "the garden",
            "the roof",
            "the garage"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: the roof"
        },
        {
          "questionAr": "شعور الأخ؟",
          "questionEn": "How does the brother feel?",
          "options": [
            "happy",
            "sad",
            "angry"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: sad"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Minimal pairs /ɪ/–/iː/",
      "items": [
        "sit – seat",
        "live – leave",
        "fill – feel",
        "ship – sheep",
        "hit – heat"
      ],
      "tipAr": "/iː/: ابتسم ومدّ الصوت «إيييي». /ɪ/: قصير مرتخي بين «إ» و«ي»."
    },
    "exercises": {
      "easy": [
        {
          "id": "srp_310_e1",
          "type": "meaning",
          "promptEn": "What does \"sit\" mean?",
          "promptAr": "ما معنى \"sit\"؟",
          "options": [
            "يعبّي",
            "يحس",
            "يجلس",
            "مقعد"
          ],
          "correctIndex": 2,
          "answer": "يجلس",
          "explanationAr": "\"sit\" /sɪt/ تعني: يجلس. مثال: sit down"
        },
        {
          "id": "srp_310_e2",
          "type": "meaning",
          "promptEn": "What does \"seat\" mean?",
          "promptAr": "ما معنى \"seat\"؟",
          "options": [
            "يغادر",
            "مقعد",
            "سفينة",
            "خروف"
          ],
          "correctIndex": 1,
          "answer": "مقعد",
          "explanationAr": "\"seat\" /siːt/ تعني: مقعد. مثال: a window seat"
        },
        {
          "id": "srp_310_e3",
          "type": "meaning",
          "promptEn": "What does \"live\" mean?",
          "promptAr": "ما معنى \"live\"؟",
          "options": [
            "خروف",
            "يسكن",
            "يحس",
            "سفينة"
          ],
          "correctIndex": 1,
          "answer": "يسكن",
          "explanationAr": "\"live\" /lɪv/ تعني: يسكن. مثال: I live here."
        },
        {
          "id": "srp_310_e4",
          "type": "meaning",
          "promptEn": "What does \"leave\" mean?",
          "promptAr": "ما معنى \"leave\"؟",
          "options": [
            "يغادر",
            "سفينة",
            "يسكن",
            "شريحة/رقاقة"
          ],
          "correctIndex": 0,
          "answer": "يغادر",
          "explanationAr": "\"leave\" /liːv/ تعني: يغادر. مثال: We leave at six."
        }
      ],
      "medium": [
        {
          "id": "srp_310_m1",
          "type": "gap",
          "promptEn": "Complete: Please sit in your ____.",
          "promptAr": "أكمل الفراغ: (اجلس في مقعدك لو سمحت.)",
          "options": [
            "set",
            "sit",
            "seat"
          ],
          "correctIndex": 2,
          "answer": "Please sit in your seat.",
          "explanationAr": "الإجابة: seat. /ɪ/ قصير ومسترخي (sit)، و /iː/ طويل والشفاه مبتسمة (seat). الكتابة غالباً: i = قصير، ee/ea = طويل."
        },
        {
          "id": "srp_310_m2",
          "type": "gap",
          "promptEn": "Complete: I live in Riyadh, but I ____ tomorrow.",
          "promptAr": "أكمل الفراغ: (أسكن الرياض بس بمشي بكرة.)",
          "options": [
            "lift",
            "live",
            "leave"
          ],
          "correctIndex": 2,
          "answer": "I live in Riyadh, but I leave tomorrow.",
          "explanationAr": "الإجابة: leave. /ɪ/ قصير ومسترخي (sit)، و /iː/ طويل والشفاه مبتسمة (seat). الكتابة غالباً: i = قصير، ee/ea = طويل."
        },
        {
          "id": "srp_310_m3",
          "type": "gap",
          "promptEn": "Complete: Fill the cup. I ____ thirsty.",
          "promptAr": "أكمل الفراغ: (عبّ الكوب. حاس بعطش.)",
          "options": [
            "fall",
            "fill",
            "feel"
          ],
          "correctIndex": 2,
          "answer": "Fill the cup. I feel thirsty.",
          "explanationAr": "الإجابة: feel. /ɪ/ قصير ومسترخي (sit)، و /iː/ طويل والشفاه مبتسمة (seat). الكتابة غالباً: i = قصير، ee/ea = طويل."
        },
        {
          "id": "srp_310_m4",
          "type": "gap",
          "promptEn": "Complete: The ____ is on the ship.",
          "promptAr": "أكمل الفراغ: (الخروف على السفينة.)",
          "options": [
            "sheep",
            "ship",
            "shop"
          ],
          "correctIndex": 0,
          "answer": "The sheep is on the ship.",
          "explanationAr": "الإجابة: sheep. /ɪ/ قصير ومسترخي (sit)، و /iː/ طويل والشفاه مبتسمة (seat). الكتابة غالباً: i = قصير، ee/ea = طويل."
        }
      ],
      "hard": [
        {
          "id": "srp_310_h1",
          "type": "order",
          "promptEn": "Put the words in order: pen? / cheap / his / this / Is",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (هذا قلمه الرخيص؟)",
          "answer": "Is this his cheap pen?",
          "explanationAr": "الترتيب الصحيح: Is this his cheap pen?"
        },
        {
          "id": "srp_310_h2",
          "type": "order",
          "promptEn": "Put the words in order: hit / it, / don't / Eat / it!",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (كله، لا تضربه!)",
          "answer": "Eat it, don't hit it!",
          "explanationAr": "الترتيب الصحيح: Eat it, don't hit it!"
        },
        {
          "id": "srp_310_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أسكن الرياض بس بمشي بكرة.",
          "answer": "I live in Riyadh, but I leave tomorrow.",
          "explanationAr": "ترجمة مقترحة: I live in Riyadh, but I leave tomorrow."
        },
        {
          "id": "srp_310_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: الخروف على السفينة.",
          "answer": "The sheep is on the ship.",
          "explanationAr": "ترجمة مقترحة: The sheep is on the ship."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Everything long: «سييت داون»",
        "correct": "sit down /sɪt daʊn/",
        "whyAr": "العربي يميل لتطويل الياء."
      },
      {
        "incorrect": "Everything short: «شِب» for sheep",
        "correct": "sheep /ʃiːp/",
        "whyAr": "ومرات العكس."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (P و B: أشهر مشكلة نطق عند العرب): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Bebsi",
          "Pepsi /ˈpɛpsi/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Pepsi /ˈpɛpsi/ — حتى الأسماء التجارية لها p.",
        "fromLessonId": "srp_309"
      },
      {
        "questionAr": "مراجعة (الحرف e السحري: الحروف الطويلة): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "cake read as «كاكي»",
          "cake /keɪk/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: cake /keɪk/ — e الأخيرة صامتة.",
        "fromLessonId": "srp_307"
      },
      {
        "questionAr": "مراجعة (أصوات الحروف N إلى Z): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "van /væn/",
          "van read as «فان» /fæn/"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: van /væn/ — v تنطق بالشفة السفلى مع اهتزاز، وليست f.",
        "fromLessonId": "srp_304"
      },
      {
        "questionAr": "ما معنى \"green\"؟",
        "questionEn": "What does \"green\" mean?",
        "options": [
          "أخضر",
          "قارب",
          "شجرة",
          "ثلج"
        ],
        "correctIndex": 0,
        "explanationAr": "\"green\" /ɡriːn/ تعني: أخضر. مثال: green grass",
        "fromLessonId": "srp_308"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (عبّ الكوب. حاس بعطش.)",
          "questionEn": "Complete: Fill the cup. I ____ thirsty.",
          "options": [
            "fall",
            "fill",
            "feel"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: feel. /ɪ/ قصير ومسترخي (sit)، و /iː/ طويل والشفاه مبتسمة (seat). الكتابة غالباً: i = قصير، ee/ea = طويل."
        },
        {
          "questionAr": "أكمل الفراغ: (الخروف على السفينة.)",
          "questionEn": "Complete: The ____ is on the ship.",
          "options": [
            "sheep",
            "ship",
            "shop"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: sheep. /ɪ/ قصير ومسترخي (sit)، و /iː/ طويل والشفاه مبتسمة (seat). الكتابة غالباً: i = قصير، ee/ea = طويل."
        },
        {
          "questionAr": "ما معنى \"ship\"؟",
          "questionEn": "What does \"ship\" mean?",
          "options": [
            "يجلس",
            "خروف",
            "رخيص",
            "سفينة"
          ],
          "correctIndex": 3,
          "explanationAr": "\"ship\" /ʃɪp/ تعني: سفينة. مثال: a cargo ship"
        },
        {
          "questionAr": "ما معنى \"sheep\"؟",
          "questionEn": "What does \"sheep\" mean?",
          "options": [
            "سفينة",
            "يحس",
            "خروف",
            "مقعد"
          ],
          "correctIndex": 2,
          "explanationAr": "\"sheep\" /ʃiːp/ تعني: خروف. مثال: sheep for Eid"
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Everything long: «سييت داون»",
            "sit down /sɪt daʊn/"
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: sit down /sɪt daʊn/ — العربي يميل لتطويل الياء."
        }
      ]
    }
  },
  {
    "id": "srp_311_s",
    "pillarId": "reading",
    "pillarNameAr": "القراءة التعبيرية والنطق الصوتي",
    "pillarNameEn": "Expressive Reading & Pronunciation Lab",
    "pillarIcon": "📖",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "نهاية s: ثلاثة أصوات /s/ /z/ /ɪz/",
    "titleEn": "The -s Ending: /s/, /z/, /ɪz/",
    "descAr": "cats و dogs و buses: نفس الـ s بس ثلاث نطقات. ونفس القاعدة مع he works.",
    "descEn": "cats, dogs, buses: one letter, three sounds — same for he works/plays/watches.",
    "speakingGoalAr": "اقرأ جمل فيها جمع وأفعال بـ s بثلاث نطقات صحيحة.",
    "speakingGoalEn": "Read sentences with plural and verb -s correctly.",
    "keyPattern": {
      "ruleAr": "بعد صوت مهموس (p, t, k, f) = /s/. بعد صوت مجهور أو متحرك = /z/. بعد s, z, sh, ch, j = /ɪz/ ويضيف مقطعاً.",
      "ruleEn": "After voiceless sounds = /s/; after voiced sounds/vowels = /z/; after s, z, sh, ch, j = /ɪz/ (extra syllable).",
      "formula": "cats /s/ | dogs /z/ | buses /ɪz/"
    },
    "practicalExamples": [
      {
        "en": "Two cats and three dogs.",
        "ar": "قطتين وثلاث كلاب."
      },
      {
        "en": "She watches the news.",
        "ar": "تتابع الأخبار."
      },
      {
        "en": "He works and plays a lot.",
        "ar": "يشتغل ويلعب كثير."
      },
      {
        "en": "The buses are late.",
        "ar": "الباصات متأخرة."
      },
      {
        "en": "My mum makes cakes.",
        "ar": "أمي تسوي كيك."
      },
      {
        "en": "The boxes have toys inside.",
        "ar": "الصناديق فيها ألعاب."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "dogs read as /dɒɡs/ with hard s",
        "correct": "dogs /dɔːɡz/",
        "whyAr": "بعد g المجهورة: /z/."
      },
      {
        "incorrect": "cats read as «كاتِز»",
        "correct": "cats /kæts/",
        "whyAr": "لا مقطع زائد بعد t."
      },
      {
        "incorrect": "watches read as «واتشس» one syllable",
        "correct": "watches /ˈwɑːtʃɪz/",
        "whyAr": "بعد ch مقطع «إز»."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اقرأ قصة لولو وركز على نهايات s.",
      "promptEn": "Read Lulu's story focusing on -s endings.",
      "saraQuestionAr": "اقرأ: She has two cats and three birds.",
      "saraQuestionEn": "Read: She has two cats and three birds.",
      "recommendedResponseEn": "She has two cats and three birds. Every day she washes their dishes."
    },
    "quiz": [
      {
        "questionAr": "نطق s في toys:",
        "questionEn": "-s in 'toys':",
        "options": [
          "/s/",
          "/z/",
          "/ɪz/"
        ],
        "correctIndex": 1,
        "explanationAr": "بعد صوت متحرك ⇐ /z/."
      },
      {
        "questionAr": "كلمة فيها مقطع إضافي:",
        "questionEn": "Which adds a syllable?",
        "options": [
          "maps",
          "bags",
          "glasses"
        ],
        "correctIndex": 2,
        "explanationAr": "glasses /ɪz/."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "dogs read as /dɒɡs/ with hard s",
          "dogs /dɔːɡz/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: dogs /dɔːɡz/ — بعد g المجهورة: /z/."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "cats read as «كاتِز»",
          "cats /kæts/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: cats /kæts/ — لا مقطع زائد بعد t."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "watches read as «واتشس» one syllable",
          "watches /ˈwɑːtʃɪz/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: watches /ˈwɑːtʃɪz/ — بعد ch مقطع «إز»."
      }
    ],
    "whiteboardNotes": {
      "title": "The -s Ending: /s/, /z/, /ɪz/",
      "pointsAr": [
        "يميز الأصوات الثلاثة.",
        "ينطقها في الجمع.",
        "ينطقها مع he/she.",
        "بعد صوت مهموس (p, t, k, f) = /s/. بعد صوت مجهور أو متحرك = /z/. بعد s, z, sh, ch, j = /ɪz/ ويضيف مقطعاً."
      ],
      "pointsEn": [
        "Identify the three sounds.",
        "Pronounce plural -s.",
        "Pronounce third-person -s.",
        "After voiceless sounds = /s/; after voiced sounds/vowels = /z/; after s, z, sh, ch, j = /ɪz/ (extra syllable)."
      ],
      "chalkHighlight": "cats /s/ | dogs /z/ | buses /ɪz/"
    },
    "unit": 2,
    "cefr": "A1",
    "objectivesAr": [
      "يميز الأصوات الثلاثة.",
      "ينطقها في الجمع.",
      "ينطقها مع he/she."
    ],
    "objectivesEn": [
      "Identify the three sounds.",
      "Pronounce plural -s.",
      "Pronounce third-person -s."
    ],
    "vocabulary": [
      {
        "word": "cats",
        "ipa": "/kæts/",
        "ar": "قطط",
        "exampleEn": "two cats",
        "exampleAr": "قطتين"
      },
      {
        "word": "dogs",
        "ipa": "/dɔːɡz/",
        "ar": "كلاب",
        "exampleEn": "big dogs",
        "exampleAr": "كلاب كبيرة"
      },
      {
        "word": "buses",
        "ipa": "/ˈbʌsɪz/",
        "ar": "باصات",
        "exampleEn": "school buses",
        "exampleAr": "باصات المدرسة"
      },
      {
        "word": "boxes",
        "ipa": "/ˈbɑːksɪz/",
        "ar": "صناديق",
        "exampleEn": "heavy boxes",
        "exampleAr": "صناديق ثقيلة"
      },
      {
        "word": "books",
        "ipa": "/bʊks/",
        "ar": "كتب",
        "exampleEn": "new books",
        "exampleAr": "كتب جديدة"
      },
      {
        "word": "toys",
        "ipa": "/tɔɪz/",
        "ar": "ألعاب",
        "exampleEn": "kids' toys",
        "exampleAr": "ألعاب أطفال"
      },
      {
        "word": "watches",
        "ipa": "/ˈwɑːtʃɪz/",
        "ar": "يشاهد/ساعات",
        "exampleEn": "He watches TV.",
        "exampleAr": "يشوف تلفزيون."
      },
      {
        "word": "plays",
        "ipa": "/pleɪz/",
        "ar": "يلعب",
        "exampleEn": "She plays tennis.",
        "exampleAr": "تلعب تنس."
      },
      {
        "word": "works",
        "ipa": "/wɜːrks/",
        "ar": "يشتغل",
        "exampleEn": "He works hard.",
        "exampleAr": "يشتغل بجد."
      },
      {
        "word": "dishes",
        "ipa": "/ˈdɪʃɪz/",
        "ar": "صحون",
        "exampleEn": "wash the dishes",
        "exampleAr": "اغسل الصحون"
      }
    ],
    "grammarFocus": {
      "ruleAr": "بعد صوت مهموس (p, t, k, f) = /s/. بعد صوت مجهور أو متحرك = /z/. بعد s, z, sh, ch, j = /ɪz/ ويضيف مقطعاً.",
      "ruleEn": "After voiceless sounds = /s/; after voiced sounds/vowels = /z/; after s, z, sh, ch, j = /ɪz/ (extra syllable).",
      "formula": "cats /s/ | dogs /z/ | buses /ɪz/",
      "examples": [
        {
          "en": "Two cats and three dogs.",
          "ar": "قطتين وثلاث كلاب."
        },
        {
          "en": "She watches the news.",
          "ar": "تتابع الأخبار."
        },
        {
          "en": "He works and plays a lot.",
          "ar": "يشتغل ويلعب كثير."
        },
        {
          "en": "The buses are late.",
          "ar": "الباصات متأخرة."
        },
        {
          "en": "My mum makes cakes.",
          "ar": "أمي تسوي كيك."
        },
        {
          "en": "The boxes have toys inside.",
          "ar": "الصناديق فيها ألعاب."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Text",
        "en": "My sister Lulu loves animals.",
        "ar": "أختي لولو تحب الحيوانات."
      },
      {
        "speaker": "Text",
        "en": "She has two cats and three birds.",
        "ar": "عندها قطتين وثلاث طيور."
      },
      {
        "speaker": "Text",
        "en": "Every day she washes their dishes.",
        "ar": "كل يوم تغسل صحونهم."
      },
      {
        "speaker": "Text",
        "en": "She buys toys for them.",
        "ar": "تشتري لهم ألعاب."
      },
      {
        "speaker": "Text",
        "en": "Dad says the house is a zoo!",
        "ar": "أبوي يقول البيت صار حديقة حيوان!"
      },
      {
        "speaker": "Text",
        "en": "But he smiles and watches the cats play.",
        "ar": "بس يبتسم ويطالع القطط تلعب."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Text: My sister Lulu loves animals.\nText: She has two cats and three birds.\nText: Every day she washes their dishes.\nText: She buys toys for them.\nText: Dad says the house is a zoo!\nText: But he smiles and watches the cats play.",
      "questions": [
        {
          "questionAr": "كم قطة؟",
          "questionEn": "How many cats?",
          "options": [
            "one",
            "two",
            "three"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: two"
        },
        {
          "questionAr": "وش تغسل؟",
          "questionEn": "What does Lulu wash?",
          "options": [
            "the car",
            "their dishes",
            "the birds"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: their dishes"
        },
        {
          "questionAr": "وش يقول الأب؟",
          "questionEn": "What does Dad say?",
          "options": [
            "the house is a zoo",
            "no more pets",
            "buy a dog"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: the house is a zoo"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "/s/ /z/ /ɪz/ sorting",
      "items": [
        "/s/: books, cats, works",
        "/z/: dogs, toys, plays",
        "/ɪz/: buses, boxes, watches"
      ],
      "tipAr": "حط يدك على حلقك: إذا الصوت الأخير يهز الحنجرة، الـ s تصير /z/."
    },
    "exercises": {
      "easy": [
        {
          "id": "srp_311_s_e1",
          "type": "meaning",
          "promptEn": "What does \"cats\" mean?",
          "promptAr": "ما معنى \"cats\"؟",
          "options": [
            "يشتغل",
            "يلعب",
            "صحون",
            "قطط"
          ],
          "correctIndex": 3,
          "answer": "قطط",
          "explanationAr": "\"cats\" /kæts/ تعني: قطط. مثال: two cats"
        },
        {
          "id": "srp_311_s_e2",
          "type": "meaning",
          "promptEn": "What does \"dogs\" mean?",
          "promptAr": "ما معنى \"dogs\"؟",
          "options": [
            "كتب",
            "يشاهد/ساعات",
            "صحون",
            "كلاب"
          ],
          "correctIndex": 3,
          "answer": "كلاب",
          "explanationAr": "\"dogs\" /dɔːɡz/ تعني: كلاب. مثال: big dogs"
        },
        {
          "id": "srp_311_s_e3",
          "type": "meaning",
          "promptEn": "What does \"buses\" mean?",
          "promptAr": "ما معنى \"buses\"؟",
          "options": [
            "باصات",
            "يشتغل",
            "كلاب",
            "يشاهد/ساعات"
          ],
          "correctIndex": 0,
          "answer": "باصات",
          "explanationAr": "\"buses\" /ˈbʌsɪz/ تعني: باصات. مثال: school buses"
        },
        {
          "id": "srp_311_s_e4",
          "type": "meaning",
          "promptEn": "What does \"boxes\" mean?",
          "promptAr": "ما معنى \"boxes\"؟",
          "options": [
            "كلاب",
            "ألعاب",
            "صناديق",
            "يشتغل"
          ],
          "correctIndex": 2,
          "answer": "صناديق",
          "explanationAr": "\"boxes\" /ˈbɑːksɪz/ تعني: صناديق. مثال: heavy boxes"
        }
      ],
      "medium": [
        {
          "id": "srp_311_s_m1",
          "type": "gap",
          "promptEn": "Complete: Two cats and three ____.",
          "promptAr": "أكمل الفراغ: (قطتين وثلاث كلاب.)",
          "options": [
            "doges",
            "dog",
            "dogs"
          ],
          "correctIndex": 2,
          "answer": "Two cats and three dogs.",
          "explanationAr": "الإجابة: dogs. بعد صوت مهموس (p, t, k, f) = /s/. بعد صوت مجهور أو متحرك = /z/. بعد s, z, sh, ch, j = /ɪz/ ويضيف مقطعاً."
        },
        {
          "id": "srp_311_s_m2",
          "type": "gap",
          "promptEn": "Complete: She ____ the news.",
          "promptAr": "أكمل الفراغ: (تتابع الأخبار.)",
          "options": [
            "watches",
            "watchs",
            "watch"
          ],
          "correctIndex": 0,
          "answer": "She watches the news.",
          "explanationAr": "الإجابة: watches. بعد صوت مهموس (p, t, k, f) = /s/. بعد صوت مجهور أو متحرك = /z/. بعد s, z, sh, ch, j = /ɪz/ ويضيف مقطعاً."
        },
        {
          "id": "srp_311_s_m3",
          "type": "gap",
          "promptEn": "Complete: He works and ____ a lot.",
          "promptAr": "أكمل الفراغ: (يشتغل ويلعب كثير.)",
          "options": [
            "plaies",
            "play",
            "plays"
          ],
          "correctIndex": 2,
          "answer": "He works and plays a lot.",
          "explanationAr": "الإجابة: plays. بعد صوت مهموس (p, t, k, f) = /s/. بعد صوت مجهور أو متحرك = /z/. بعد s, z, sh, ch, j = /ɪz/ ويضيف مقطعاً."
        },
        {
          "id": "srp_311_s_m4",
          "type": "gap",
          "promptEn": "Complete: The ____ are late.",
          "promptAr": "أكمل الفراغ: (الباصات متأخرة.)",
          "options": [
            "buses",
            "buss",
            "bus"
          ],
          "correctIndex": 0,
          "answer": "The buses are late.",
          "explanationAr": "الإجابة: buses. بعد صوت مهموس (p, t, k, f) = /s/. بعد صوت مجهور أو متحرك = /z/. بعد s, z, sh, ch, j = /ɪz/ ويضيف مقطعاً."
        }
      ],
      "hard": [
        {
          "id": "srp_311_s_h1",
          "type": "order",
          "promptEn": "Put the words in order: mum / makes / cakes. / My",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (أمي تسوي كيك.)",
          "answer": "My mum makes cakes.",
          "explanationAr": "الترتيب الصحيح: My mum makes cakes."
        },
        {
          "id": "srp_311_s_h2",
          "type": "order",
          "promptEn": "Put the words in order: toys / have / The / boxes / inside.",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (الصناديق فيها ألعاب.)",
          "answer": "The boxes have toys inside.",
          "explanationAr": "الترتيب الصحيح: The boxes have toys inside."
        },
        {
          "id": "srp_311_s_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: تتابع الأخبار.",
          "answer": "She watches the news.",
          "explanationAr": "ترجمة مقترحة: She watches the news."
        },
        {
          "id": "srp_311_s_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: الباصات متأخرة.",
          "answer": "The buses are late.",
          "explanationAr": "ترجمة مقترحة: The buses are late."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Adding /ɪz/ everywhere: «بوكِز»",
        "correct": "books /bʊks/",
        "whyAr": "المقطع الزائد فقط بعد الأصوات الصفيرية."
      },
      {
        "incorrect": "Dropping -s completely: two book",
        "correct": "two books",
        "whyAr": "العربي المثنى مختلف؛ الإنجليزي يحتاج s."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (ship أو sheep؟ الفرق بين /ɪ/ و /iː/): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Please sheet down.",
          "Please sit down."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Please sit down. — sit قصيرة.",
        "fromLessonId": "srp_310"
      },
      {
        "questionAr": "مراجعة (فرق المتحركات: ee / ea / ai / oa): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "boat /boʊt/",
          "boat read as «بوت» short"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: boat /boʊt/ — oa = «أو» منزلقة.",
        "fromLessonId": "srp_308"
      },
      {
        "questionAr": "مراجعة (قراءة كلمات CVC: دمج الأصوات): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "bed read as bad",
          "bed /bɛd/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: bed /bɛd/ — e القصيرة «إ» مفتوحة شوي.",
        "fromLessonId": "srp_305"
      },
      {
        "questionAr": "ما معنى \"pool\"؟",
        "questionEn": "What does \"pool\" mean?",
        "options": [
          "حيوان أليف",
          "صحن",
          "مسبح",
          "سلة مهملات"
        ],
        "correctIndex": 2,
        "explanationAr": "\"pool\" /puːl/ تعني: مسبح. مثال: a swimming pool",
        "fromLessonId": "srp_309"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (يشتغل ويلعب كثير.)",
          "questionEn": "Complete: He works and ____ a lot.",
          "options": [
            "plaies",
            "play",
            "plays"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: plays. بعد صوت مهموس (p, t, k, f) = /s/. بعد صوت مجهور أو متحرك = /z/. بعد s, z, sh, ch, j = /ɪz/ ويضيف مقطعاً."
        },
        {
          "questionAr": "أكمل الفراغ: (الباصات متأخرة.)",
          "questionEn": "Complete: The ____ are late.",
          "options": [
            "buses",
            "buss",
            "bus"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: buses. بعد صوت مهموس (p, t, k, f) = /s/. بعد صوت مجهور أو متحرك = /z/. بعد s, z, sh, ch, j = /ɪz/ ويضيف مقطعاً."
        },
        {
          "questionAr": "ما معنى \"books\"؟",
          "questionEn": "What does \"books\" mean?",
          "options": [
            "يشتغل",
            "صناديق",
            "باصات",
            "كتب"
          ],
          "correctIndex": 3,
          "explanationAr": "\"books\" /bʊks/ تعني: كتب. مثال: new books"
        },
        {
          "questionAr": "ما معنى \"toys\"؟",
          "questionEn": "What does \"toys\" mean?",
          "options": [
            "باصات",
            "ألعاب",
            "يشاهد/ساعات",
            "صحون"
          ],
          "correctIndex": 1,
          "explanationAr": "\"toys\" /tɔɪz/ تعني: ألعاب. مثال: kids' toys"
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "books /bʊks/",
            "Adding /ɪz/ everywhere: «بوكِز»"
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: books /bʊks/ — المقطع الزائد فقط بعد الأصوات الصفيرية."
        }
      ]
    }
  },
  {
    "id": "srp_312_s",
    "pillarId": "reading",
    "pillarNameAr": "القراءة التعبيرية والنطق الصوتي",
    "pillarNameEn": "Expressive Reading & Pronunciation Lab",
    "pillarIcon": "📖",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "كلمات البصر وقراءة رسالة قصيرة",
    "titleEn": "Sight Words and Reading a Short Note",
    "descAr": "كلمات شائعة ما تنقرأ بالقواعد (the, said, was, one, come) لازم تعرفها من النظرة الأولى.",
    "descEn": "Common irregular words (the, said, was, one, come) you must recognise instantly.",
    "speakingGoalAr": "اقرأ رسالة قصيرة من أم لولدها بطلاقة.",
    "speakingGoalEn": "Fluently read a short note from a mother to her son.",
    "keyPattern": {
      "ruleAr": "بعض الكلمات الشائعة نطقها شاذ: said /sɛd/، was /wʌz/، one /wʌn/، come /kʌm/، do /duː/، you /juː/. احفظها كصورة.",
      "ruleEn": "Some high-frequency words are irregular: said, was, one, come, do, you. Learn them as whole shapes.",
      "formula": "the /ðə/ said /sɛd/ was /wʌz/ one /wʌn/ come /kʌm/ two /tuː/ where /wɛr/ there /ðɛr/"
    },
    "practicalExamples": [
      {
        "en": "Your lunch is in the fridge.",
        "ar": "غداك في الثلاجة."
      },
      {
        "en": "Come home before Maghrib.",
        "ar": "تعال البيت قبل المغرب."
      },
      {
        "en": "Dad said you can use the iPad for one hour.",
        "ar": "أبوك قال تقدر تستخدم الآيباد ساعة."
      },
      {
        "en": "There are two eggs on the table.",
        "ar": "فيه بيضتين على الطاولة."
      },
      {
        "en": "Where is my phone? It was here.",
        "ar": "وين جوالي؟ كان هنا."
      },
      {
        "en": "Do your homework first.",
        "ar": "سوّ واجبك أول."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "said read as «سيد» /seɪd/",
        "correct": "said /sɛd/",
        "whyAr": "said شاذة: «سِد»."
      },
      {
        "incorrect": "one read as «أون»",
        "correct": "one /wʌn/",
        "whyAr": "one تبدأ بصوت «و»."
      },
      {
        "incorrect": "was read as «واز» /wæz/",
        "correct": "was /wʌz/",
        "whyAr": "«وَز»."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اقرأ رسالة الأم بطلاقة وبدون توقف.",
      "promptEn": "Read Mom's note fluently.",
      "saraQuestionAr": "اقرأ لي الرسالة كاملة!",
      "saraQuestionEn": "Read me the whole note!",
      "recommendedResponseEn": "Dear Faisal, I'm at Grandma's house. Your lunch is in the fridge. Do your homework first. Love, Mom"
    },
    "quiz": [
      {
        "questionAr": "نطق said:",
        "questionEn": "Pronunciation of 'said':",
        "options": [
          "/seɪd/",
          "/sɛd/",
          "/siːd/"
        ],
        "correctIndex": 1,
        "explanationAr": "/sɛd/."
      },
      {
        "questionAr": "متى يمر الأب؟ (من الرسالة)",
        "questionEn": "When does Dad come? (note)",
        "options": [
          "at five",
          "at Maghrib",
          "after one hour"
        ],
        "correctIndex": 0,
        "explanationAr": "at five."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "said /sɛd/",
          "said read as «سيد» /seɪd/"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: said /sɛd/ — said شاذة: «سِد»."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "one read as «أون»",
          "one /wʌn/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: one /wʌn/ — one تبدأ بصوت «و»."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "was /wʌz/",
          "was read as «واز» /wæz/"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: was /wʌz/ — «وَز»."
      }
    ],
    "whiteboardNotes": {
      "title": "Sight Words and Reading a Short Note",
      "pointsAr": [
        "يتعرف على ٢٠ كلمة بصر.",
        "يقرأ رسالة قصيرة بطلاقة.",
        "يفهم التعليمات في الرسالة.",
        "بعض الكلمات الشائعة نطقها شاذ: said /sɛd/، was /wʌz/، one /wʌn/، come /kʌm/، do /duː/، you /juː/. احفظها كصورة."
      ],
      "pointsEn": [
        "Recognise 20 sight words.",
        "Read a short note fluently.",
        "Understand instructions in a note.",
        "Some high-frequency words are irregular: said, was, one, come, do, you. Learn them as whole shapes."
      ],
      "chalkHighlight": "the /ðə/ said /sɛd/ was /wʌz/ one /wʌn/ come /kʌm/ two /tuː/ where /wɛr/ there /ðɛr/"
    },
    "unit": 2,
    "cefr": "A1",
    "objectivesAr": [
      "يتعرف على ٢٠ كلمة بصر.",
      "يقرأ رسالة قصيرة بطلاقة.",
      "يفهم التعليمات في الرسالة."
    ],
    "objectivesEn": [
      "Recognise 20 sight words.",
      "Read a short note fluently.",
      "Understand instructions in a note."
    ],
    "vocabulary": [
      {
        "word": "the",
        "ipa": "/ðə/",
        "ar": "الـ",
        "exampleEn": "the door",
        "exampleAr": "الباب"
      },
      {
        "word": "said",
        "ipa": "/sɛd/",
        "ar": "قال",
        "exampleEn": "Mom said yes.",
        "exampleAr": "أمي قالت أوكي."
      },
      {
        "word": "was",
        "ipa": "/wʌz/",
        "ar": "كان",
        "exampleEn": "It was fun.",
        "exampleAr": "كانت وناسة."
      },
      {
        "word": "one",
        "ipa": "/wʌn/",
        "ar": "واحد",
        "exampleEn": "one hour",
        "exampleAr": "ساعة وحدة"
      },
      {
        "word": "come",
        "ipa": "/kʌm/",
        "ar": "يجي",
        "exampleEn": "Come here.",
        "exampleAr": "تعال هنا."
      },
      {
        "word": "there",
        "ipa": "/ðɛr/",
        "ar": "هناك",
        "exampleEn": "over there",
        "exampleAr": "هناك"
      },
      {
        "word": "where",
        "ipa": "/wɛr/",
        "ar": "وين",
        "exampleEn": "Where is it?",
        "exampleAr": "وينه؟"
      },
      {
        "word": "your",
        "ipa": "/jɔːr/",
        "ar": "حقك/ـك",
        "exampleEn": "your bag",
        "exampleAr": "شنطتك"
      },
      {
        "word": "before",
        "ipa": "/bɪˈfɔːr/",
        "ar": "قبل",
        "exampleEn": "before Maghrib",
        "exampleAr": "قبل المغرب"
      },
      {
        "word": "fridge",
        "ipa": "/frɪdʒ/",
        "ar": "ثلاجة",
        "exampleEn": "in the fridge",
        "exampleAr": "في الثلاجة"
      }
    ],
    "grammarFocus": {
      "ruleAr": "بعض الكلمات الشائعة نطقها شاذ: said /sɛd/، was /wʌz/، one /wʌn/، come /kʌm/، do /duː/، you /juː/. احفظها كصورة.",
      "ruleEn": "Some high-frequency words are irregular: said, was, one, come, do, you. Learn them as whole shapes.",
      "formula": "the /ðə/ said /sɛd/ was /wʌz/ one /wʌn/ come /kʌm/ two /tuː/ where /wɛr/ there /ðɛr/",
      "examples": [
        {
          "en": "Your lunch is in the fridge.",
          "ar": "غداك في الثلاجة."
        },
        {
          "en": "Come home before Maghrib.",
          "ar": "تعال البيت قبل المغرب."
        },
        {
          "en": "Dad said you can use the iPad for one hour.",
          "ar": "أبوك قال تقدر تستخدم الآيباد ساعة."
        },
        {
          "en": "There are two eggs on the table.",
          "ar": "فيه بيضتين على الطاولة."
        },
        {
          "en": "Where is my phone? It was here.",
          "ar": "وين جوالي؟ كان هنا."
        },
        {
          "en": "Do your homework first.",
          "ar": "سوّ واجبك أول."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Note",
        "en": "Dear Faisal,",
        "ar": "عزيزي فيصل،"
      },
      {
        "speaker": "Note",
        "en": "I'm at Grandma's house. Your lunch is in the fridge.",
        "ar": "أنا في بيت جدتك. غداك في الثلاجة."
      },
      {
        "speaker": "Note",
        "en": "Do your homework first.",
        "ar": "سوّ واجبك أول."
      },
      {
        "speaker": "Note",
        "en": "Dad said you can play for one hour after that.",
        "ar": "أبوك قال تقدر تلعب ساعة بعدها."
      },
      {
        "speaker": "Note",
        "en": "Come to Grandma's before Maghrib. Dad will pick you up at five.",
        "ar": "تعال بيت جدتك قبل المغرب. أبوك بيمرك الساعة خمس."
      },
      {
        "speaker": "Note",
        "en": "Love, Mom",
        "ar": "مع حبي، ماما"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Note: Dear Faisal,\nNote: I'm at Grandma's house. Your lunch is in the fridge.\nNote: Do your homework first.\nNote: Dad said you can play for one hour after that.\nNote: Come to Grandma's before Maghrib. Dad will pick you up at five.\nNote: Love, Mom",
      "questions": [
        {
          "questionAr": "وين الأم؟",
          "questionEn": "Where is Mom?",
          "options": [
            "at work",
            "at Grandma's house",
            "at the mall"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: at Grandma's house"
        },
        {
          "questionAr": "وش يسوي أول؟",
          "questionEn": "What should Faisal do first?",
          "options": [
            "play",
            "his homework",
            "eat"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: his homework"
        },
        {
          "questionAr": "متى يمره الأب؟",
          "questionEn": "When will Dad pick him up?",
          "options": [
            "at four",
            "at five",
            "at Maghrib"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: at five"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Sight words with surprising sounds",
      "items": [
        "said /sɛd/",
        "one /wʌn/",
        "two /tuː/",
        "was /wʌz/",
        "come /kʌm/"
      ],
      "tipAr": "اكتب كل كلمة على كرت وتدرب عليها يومياً حتى تقرأها بثانية."
    },
    "exercises": {
      "easy": [
        {
          "id": "srp_312_s_e1",
          "type": "meaning",
          "promptEn": "What does \"the\" mean?",
          "promptAr": "ما معنى \"the\"؟",
          "options": [
            "حقك/ـك",
            "الـ",
            "يجي",
            "قال"
          ],
          "correctIndex": 1,
          "answer": "الـ",
          "explanationAr": "\"the\" /ðə/ تعني: الـ. مثال: the door"
        },
        {
          "id": "srp_312_s_e2",
          "type": "meaning",
          "promptEn": "What does \"said\" mean?",
          "promptAr": "ما معنى \"said\"؟",
          "options": [
            "حقك/ـك",
            "قال",
            "هناك",
            "وين"
          ],
          "correctIndex": 1,
          "answer": "قال",
          "explanationAr": "\"said\" /sɛd/ تعني: قال. مثال: Mom said yes."
        },
        {
          "id": "srp_312_s_e3",
          "type": "meaning",
          "promptEn": "What does \"was\" mean?",
          "promptAr": "ما معنى \"was\"؟",
          "options": [
            "ثلاجة",
            "كان",
            "واحد",
            "يجي"
          ],
          "correctIndex": 1,
          "answer": "كان",
          "explanationAr": "\"was\" /wʌz/ تعني: كان. مثال: It was fun."
        },
        {
          "id": "srp_312_s_e4",
          "type": "meaning",
          "promptEn": "What does \"one\" mean?",
          "promptAr": "ما معنى \"one\"؟",
          "options": [
            "هناك",
            "قبل",
            "الـ",
            "واحد"
          ],
          "correctIndex": 3,
          "answer": "واحد",
          "explanationAr": "\"one\" /wʌn/ تعني: واحد. مثال: one hour"
        }
      ],
      "medium": [
        {
          "id": "srp_312_s_m1",
          "type": "gap",
          "promptEn": "Complete: ____ lunch is in the fridge.",
          "promptAr": "أكمل الفراغ: (غداك في الثلاجة.)",
          "options": [
            "You",
            "You're",
            "Your"
          ],
          "correctIndex": 2,
          "answer": "Your lunch is in the fridge.",
          "explanationAr": "الإجابة: Your. بعض الكلمات الشائعة نطقها شاذ: said /sɛd/، was /wʌz/، one /wʌn/، come /kʌm/، do /duː/، you /juː/. احفظها كصورة."
        },
        {
          "id": "srp_312_s_m2",
          "type": "gap",
          "promptEn": "Complete: ____ home before Maghrib.",
          "promptAr": "أكمل الفراغ: (تعال البيت قبل المغرب.)",
          "options": [
            "Came",
            "Come",
            "Comb"
          ],
          "correctIndex": 1,
          "answer": "Come home before Maghrib.",
          "explanationAr": "الإجابة: Come. بعض الكلمات الشائعة نطقها شاذ: said /sɛd/، was /wʌz/، one /wʌn/، come /kʌm/، do /duː/، you /juː/. احفظها كصورة."
        },
        {
          "id": "srp_312_s_m3",
          "type": "gap",
          "promptEn": "Complete: Dad ____ you can use the iPad for one hour.",
          "promptAr": "أكمل الفراغ: (أبوك قال تقدر تستخدم الآيباد ساعة.)",
          "options": [
            "sayed",
            "say",
            "said"
          ],
          "correctIndex": 2,
          "answer": "Dad said you can use the iPad for one hour.",
          "explanationAr": "الإجابة: said. بعض الكلمات الشائعة نطقها شاذ: said /sɛd/، was /wʌz/، one /wʌn/، come /kʌm/، do /duː/، you /juː/. احفظها كصورة."
        },
        {
          "id": "srp_312_s_m4",
          "type": "gap",
          "promptEn": "Complete: ____ are two eggs on the table.",
          "promptAr": "أكمل الفراغ: (فيه بيضتين على الطاولة.)",
          "options": [
            "They",
            "There",
            "Their"
          ],
          "correctIndex": 1,
          "answer": "There are two eggs on the table.",
          "explanationAr": "الإجابة: There. بعض الكلمات الشائعة نطقها شاذ: said /sɛd/، was /wʌz/، one /wʌn/، come /kʌm/، do /duː/، you /juː/. احفظها كصورة."
        }
      ],
      "hard": [
        {
          "id": "srp_312_s_h1",
          "type": "order",
          "promptEn": "Put the words in order: It / my / Where / is / here. / was / phone?",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (وين جوالي؟ كان هنا.)",
          "answer": "Where is my phone? It was here.",
          "explanationAr": "الترتيب الصحيح: Where is my phone? It was here."
        },
        {
          "id": "srp_312_s_h2",
          "type": "order",
          "promptEn": "Put the words in order: first. / Do / your / homework",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (سوّ واجبك أول.)",
          "answer": "Do your homework first.",
          "explanationAr": "الترتيب الصحيح: Do your homework first."
        },
        {
          "id": "srp_312_s_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: تعال البيت قبل المغرب.",
          "answer": "Come home before Maghrib.",
          "explanationAr": "ترجمة مقترحة: Come home before Maghrib."
        },
        {
          "id": "srp_312_s_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: فيه بيضتين على الطاولة.",
          "answer": "There are two eggs on the table.",
          "explanationAr": "ترجمة مقترحة: There are two eggs on the table."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Reading 'the' as «ذي» always",
        "correct": "the /ðə/ + consonant, /ði/ + vowel",
        "whyAr": "the book «ذَ بوك»، the apple «ذي آبل»."
      },
      {
        "incorrect": "their/there/they're mixed",
        "correct": "there = هناك, their = حقهم, they're = هم",
        "whyAr": "نفس النطق، كتابة مختلفة."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (نهاية s: ثلاثة أصوات /s/ /z/ /ɪz/): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "cats read as «كاتِز»",
          "cats /kæts/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: cats /kæts/ — لا مقطع زائد بعد t.",
        "fromLessonId": "srp_311_s"
      },
      {
        "questionAr": "مراجعة (P و B: أشهر مشكلة نطق عند العرب): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I want to bark here.",
          "I want to park here."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I want to park here. — bark = ينبح! خطأ p يغير المعنى.",
        "fromLessonId": "srp_309"
      },
      {
        "questionAr": "مراجعة (الحروف المزدوجة: sh / ch / th / ck): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "chip /tʃɪp/",
          "chip read as «شيب»"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: chip /tʃɪp/ — ch فيها «ت» قبل «ش».",
        "fromLessonId": "srp_306"
      },
      {
        "questionAr": "ما معنى \"chip\"؟",
        "questionEn": "What does \"chip\" mean?",
        "options": [
          "شريحة/رقاقة",
          "يعبّي",
          "خروف",
          "يغادر"
        ],
        "correctIndex": 0,
        "explanationAr": "\"chip\" /tʃɪp/ تعني: شريحة/رقاقة. مثال: a computer chip",
        "fromLessonId": "srp_310"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (أبوك قال تقدر تستخدم الآيباد ساعة.)",
          "questionEn": "Complete: Dad ____ you can use the iPad for one hour.",
          "options": [
            "sayed",
            "say",
            "said"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: said. بعض الكلمات الشائعة نطقها شاذ: said /sɛd/، was /wʌz/، one /wʌn/، come /kʌm/، do /duː/، you /juː/. احفظها كصورة."
        },
        {
          "questionAr": "أكمل الفراغ: (فيه بيضتين على الطاولة.)",
          "questionEn": "Complete: ____ are two eggs on the table.",
          "options": [
            "They",
            "There",
            "Their"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: There. بعض الكلمات الشائعة نطقها شاذ: said /sɛd/، was /wʌz/، one /wʌn/، come /kʌm/، do /duː/، you /juː/. احفظها كصورة."
        },
        {
          "questionAr": "ما معنى \"come\"؟",
          "questionEn": "What does \"come\" mean?",
          "options": [
            "قال",
            "يجي",
            "ثلاجة",
            "كان"
          ],
          "correctIndex": 1,
          "explanationAr": "\"come\" /kʌm/ تعني: يجي. مثال: Come here."
        },
        {
          "questionAr": "ما معنى \"there\"؟",
          "questionEn": "What does \"there\" mean?",
          "options": [
            "قال",
            "يجي",
            "الـ",
            "هناك"
          ],
          "correctIndex": 3,
          "explanationAr": "\"there\" /ðɛr/ تعني: هناك. مثال: over there"
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Reading 'the' as «ذي» always",
            "the /ðə/ + consonant, /ði/ + vowel"
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: the /ðə/ + consonant, /ði/ + vowel — the book «ذَ بوك»، the apple «ذي آبل»."
        }
      ]
    }
  },
  {
    "id": "srp_302",
    "pillarId": "reading",
    "pillarNameAr": "القراءة التعبيرية والنطق الصوتي",
    "pillarNameEn": "Expressive Reading & Pronunciation Lab",
    "pillarIcon": "📖",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "الحروف الصامتة: knife, write, lamb",
    "titleEn": "Silent Letters: knife, write, lamb",
    "descAr": "حروف تنكتب وما تنقرأ: k في know، w في write، b في climb، h في hour.",
    "descEn": "Letters you write but don't say: know, write, climb, hour.",
    "speakingGoalAr": "اقرأ عشرين كلمة فيها حروف صامتة بدون أخطاء.",
    "speakingGoalEn": "Read twenty silent-letter words correctly.",
    "keyPattern": {
      "ruleAr": "أنماط شائعة: kn = /n/ (know)، wr = /r/ (write)، mb = /m/ (climb)، gh غالباً صامتة (night)، h صامتة في hour, honest، l صامتة في walk, talk, should.",
      "ruleEn": "Common patterns: kn, wr, mb, gh, silent h (hour), silent l (walk).",
      "formula": "kn→n | wr→r | mb→m | igh→/aɪ/ | (h)our | wa(l)k"
    },
    "practicalExamples": [
      {
        "en": "I know the answer.",
        "ar": "أعرف الجواب."
      },
      {
        "en": "Please write your name.",
        "ar": "اكتب اسمك لو سمحت."
      },
      {
        "en": "We walk for an hour every night.",
        "ar": "نمشي ساعة كل ليلة."
      },
      {
        "en": "Use a knife to cut the bread.",
        "ar": "استخدم سكين لقطع الخبز."
      },
      {
        "en": "He climbs the mountain in Abha.",
        "ar": "يتسلق الجبل في أبها."
      },
      {
        "en": "You should talk to him.",
        "ar": "المفروض تكلمه."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "k-nife with a /k/",
        "correct": "knife /naɪf/",
        "whyAr": "k قبل n صامتة."
      },
      {
        "incorrect": "a hour",
        "correct": "an hour",
        "whyAr": "h صامتة فالكلمة تبدأ بصوت متحرك."
      },
      {
        "incorrect": "walk with an /l/ sound",
        "correct": "walk /wɔːk/",
        "whyAr": "l صامتة في walk/talk/chalk."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اقرأ قصة الجد وانتبه للحروف الصامتة.",
      "promptEn": "Read Grandpa's story; mind the silent letters.",
      "saraQuestionAr": "اقرأ: He knows every street. He is an honest man.",
      "saraQuestionEn": "Read: He knows every street. He is an honest man.",
      "recommendedResponseEn": "Every night, my grandfather walks for an hour. He knows every street in our town."
    },
    "quiz": [
      {
        "questionAr": "أي حرف صامت في lamb؟",
        "questionEn": "Silent letter in 'lamb'?",
        "options": [
          "l",
          "a",
          "b"
        ],
        "correctIndex": 2,
        "explanationAr": "b صامتة."
      },
      {
        "questionAr": "أكمل: It takes ___ hour.",
        "questionEn": "Complete: It takes ___ hour.",
        "options": [
          "a",
          "an",
          "the one"
        ],
        "correctIndex": 1,
        "explanationAr": "an hour."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "k-nife with a /k/",
          "knife /naɪf/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: knife /naɪf/ — k قبل n صامتة."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "a hour",
          "an hour"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: an hour — h صامتة فالكلمة تبدأ بصوت متحرك."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "walk with an /l/ sound",
          "walk /wɔːk/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: walk /wɔːk/ — l صامتة في walk/talk/chalk."
      }
    ],
    "whiteboardNotes": {
      "title": "Silent Letters: knife, write, lamb",
      "pointsAr": [
        "يعرف أنماط الحروف الصامتة.",
        "يقرأ الكلمات الشائعة صح.",
        "يستخدم an مع hour.",
        "أنماط شائعة: kn = /n/ (know)، wr = /r/ (write)، mb = /m/ (climb)، gh غالباً صامتة (night)، h صامتة في hour, honest، l صامتة في walk, talk, should."
      ],
      "pointsEn": [
        "Know silent-letter patterns.",
        "Read common words correctly.",
        "Use 'an' with hour.",
        "Common patterns: kn, wr, mb, gh, silent h (hour), silent l (walk)."
      ],
      "chalkHighlight": "kn→n | wr→r | mb→m | igh→/aɪ/ | (h)our | wa(l)k"
    },
    "unit": 3,
    "cefr": "A1",
    "objectivesAr": [
      "يعرف أنماط الحروف الصامتة.",
      "يقرأ الكلمات الشائعة صح.",
      "يستخدم an مع hour."
    ],
    "objectivesEn": [
      "Know silent-letter patterns.",
      "Read common words correctly.",
      "Use 'an' with hour."
    ],
    "vocabulary": [
      {
        "word": "know",
        "ipa": "/noʊ/",
        "ar": "يعرف",
        "exampleEn": "I know.",
        "exampleAr": "أعرف."
      },
      {
        "word": "knife",
        "ipa": "/naɪf/",
        "ar": "سكين",
        "exampleEn": "a sharp knife",
        "exampleAr": "سكين حادة"
      },
      {
        "word": "write",
        "ipa": "/raɪt/",
        "ar": "يكتب",
        "exampleEn": "write a letter",
        "exampleAr": "اكتب رسالة"
      },
      {
        "word": "wrong",
        "ipa": "/rɔːŋ/",
        "ar": "خطأ",
        "exampleEn": "That's wrong.",
        "exampleAr": "غلط."
      },
      {
        "word": "climb",
        "ipa": "/klaɪm/",
        "ar": "يتسلق",
        "exampleEn": "climb a tree",
        "exampleAr": "تسلق شجرة"
      },
      {
        "word": "lamb",
        "ipa": "/læm/",
        "ar": "لحم خروف صغير",
        "exampleEn": "lamb kabsa",
        "exampleAr": "كبسة لحم"
      },
      {
        "word": "hour",
        "ipa": "/aʊər/",
        "ar": "ساعة (مدة)",
        "exampleEn": "an hour",
        "exampleAr": "ساعة"
      },
      {
        "word": "honest",
        "ipa": "/ˈɑːnɪst/",
        "ar": "صادق/أمين",
        "exampleEn": "an honest man",
        "exampleAr": "رجل أمين"
      },
      {
        "word": "night",
        "ipa": "/naɪt/",
        "ar": "ليل",
        "exampleEn": "at night",
        "exampleAr": "بالليل"
      },
      {
        "word": "talk",
        "ipa": "/tɔːk/",
        "ar": "يتكلم",
        "exampleEn": "Let's talk.",
        "exampleAr": "خلنا نتكلم."
      }
    ],
    "grammarFocus": {
      "ruleAr": "أنماط شائعة: kn = /n/ (know)، wr = /r/ (write)، mb = /m/ (climb)، gh غالباً صامتة (night)، h صامتة في hour, honest، l صامتة في walk, talk, should.",
      "ruleEn": "Common patterns: kn, wr, mb, gh, silent h (hour), silent l (walk).",
      "formula": "kn→n | wr→r | mb→m | igh→/aɪ/ | (h)our | wa(l)k",
      "examples": [
        {
          "en": "I know the answer.",
          "ar": "أعرف الجواب."
        },
        {
          "en": "Please write your name.",
          "ar": "اكتب اسمك لو سمحت."
        },
        {
          "en": "We walk for an hour every night.",
          "ar": "نمشي ساعة كل ليلة."
        },
        {
          "en": "Use a knife to cut the bread.",
          "ar": "استخدم سكين لقطع الخبز."
        },
        {
          "en": "He climbs the mountain in Abha.",
          "ar": "يتسلق الجبل في أبها."
        },
        {
          "en": "You should talk to him.",
          "ar": "المفروض تكلمه."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Text",
        "en": "Every night, my grandfather walks for an hour.",
        "ar": "كل ليلة جدي يمشي ساعة."
      },
      {
        "speaker": "Text",
        "en": "He knows every street in our town.",
        "ar": "يعرف كل شارع في بلدتنا."
      },
      {
        "speaker": "Text",
        "en": "He is an honest and kind man.",
        "ar": "رجل أمين وطيب."
      },
      {
        "speaker": "Text",
        "en": "When he was young, he used to climb mountains.",
        "ar": "لما كان شاب كان يتسلق الجبال."
      },
      {
        "speaker": "Text",
        "en": "Now he writes stories about those days.",
        "ar": "الحين يكتب قصص عن هذيك الأيام."
      },
      {
        "speaker": "Text",
        "en": "I listen and I never talk when he reads.",
        "ar": "أسمع وما أتكلم أبداً لما يقرأ."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Text: Every night, my grandfather walks for an hour.\nText: He knows every street in our town.\nText: He is an honest and kind man.\nText: When he was young, he used to climb mountains.\nText: Now he writes stories about those days.\nText: I listen and I never talk when he reads.",
      "questions": [
        {
          "questionAr": "كم يمشي الجد؟",
          "questionEn": "How long does Grandpa walk?",
          "options": [
            "thirty minutes",
            "an hour",
            "two hours"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: an hour"
        },
        {
          "questionAr": "وش كان يسوي وهو شاب؟",
          "questionEn": "What did he do when young?",
          "options": [
            "climbed mountains",
            "swam",
            "played football"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: climbed mountains"
        },
        {
          "questionAr": "وش يكتب؟",
          "questionEn": "What does he write?",
          "options": [
            "letters",
            "stories",
            "poems"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: stories"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Silent letter list",
      "items": [
        "know /noʊ/",
        "write /raɪt/",
        "climb /klaɪm/",
        "hour /aʊər/",
        "walk /wɔːk/",
        "listen /ˈlɪsən/ (silent t)"
      ],
      "tipAr": "كمان t صامتة في listen و castle و often (غالباً)."
    },
    "exercises": {
      "easy": [
        {
          "id": "srp_302_e1",
          "type": "meaning",
          "promptEn": "What does \"know\" mean?",
          "promptAr": "ما معنى \"know\"؟",
          "options": [
            "ساعة (مدة)",
            "يعرف",
            "يكتب",
            "سكين"
          ],
          "correctIndex": 1,
          "answer": "يعرف",
          "explanationAr": "\"know\" /noʊ/ تعني: يعرف. مثال: I know."
        },
        {
          "id": "srp_302_e2",
          "type": "meaning",
          "promptEn": "What does \"knife\" mean?",
          "promptAr": "ما معنى \"knife\"؟",
          "options": [
            "يكتب",
            "يتكلم",
            "سكين",
            "يعرف"
          ],
          "correctIndex": 2,
          "answer": "سكين",
          "explanationAr": "\"knife\" /naɪf/ تعني: سكين. مثال: a sharp knife"
        },
        {
          "id": "srp_302_e3",
          "type": "meaning",
          "promptEn": "What does \"write\" mean?",
          "promptAr": "ما معنى \"write\"؟",
          "options": [
            "يعرف",
            "يكتب",
            "يتكلم",
            "ساعة (مدة)"
          ],
          "correctIndex": 1,
          "answer": "يكتب",
          "explanationAr": "\"write\" /raɪt/ تعني: يكتب. مثال: write a letter"
        },
        {
          "id": "srp_302_e4",
          "type": "meaning",
          "promptEn": "What does \"wrong\" mean?",
          "promptAr": "ما معنى \"wrong\"؟",
          "options": [
            "ساعة (مدة)",
            "يتسلق",
            "يكتب",
            "خطأ"
          ],
          "correctIndex": 3,
          "answer": "خطأ",
          "explanationAr": "\"wrong\" /rɔːŋ/ تعني: خطأ. مثال: That's wrong."
        }
      ],
      "medium": [
        {
          "id": "srp_302_m1",
          "type": "gap",
          "promptEn": "Complete: I ____ the answer.",
          "promptAr": "أكمل الفراغ: (أعرف الجواب.)",
          "options": [
            "now",
            "no",
            "know"
          ],
          "correctIndex": 2,
          "answer": "I know the answer.",
          "explanationAr": "الإجابة: know. أنماط شائعة: kn = /n/ (know)، wr = /r/ (write)، mb = /m/ (climb)، gh غالباً صامتة (night)، h صامتة في hour, honest، l صامتة في walk, talk, should."
        },
        {
          "id": "srp_302_m2",
          "type": "gap",
          "promptEn": "Complete: Please ____ your name.",
          "promptAr": "أكمل الفراغ: (اكتب اسمك لو سمحت.)",
          "options": [
            "write",
            "right",
            "rite"
          ],
          "correctIndex": 0,
          "answer": "Please write your name.",
          "explanationAr": "الإجابة: write. أنماط شائعة: kn = /n/ (know)، wr = /r/ (write)، mb = /m/ (climb)، gh غالباً صامتة (night)، h صامتة في hour, honest، l صامتة في walk, talk, should."
        },
        {
          "id": "srp_302_m3",
          "type": "gap",
          "promptEn": "Complete: We walk for ____ every night.",
          "promptAr": "أكمل الفراغ: (نمشي ساعة كل ليلة.)",
          "options": [
            "one hour of",
            "an hour",
            "a hour"
          ],
          "correctIndex": 1,
          "answer": "We walk for an hour every night.",
          "explanationAr": "الإجابة: an hour. أنماط شائعة: kn = /n/ (know)، wr = /r/ (write)، mb = /m/ (climb)، gh غالباً صامتة (night)، h صامتة في hour, honest، l صامتة في walk, talk, should."
        },
        {
          "id": "srp_302_m4",
          "type": "gap",
          "promptEn": "Complete: Use a ____ to cut the bread.",
          "promptAr": "أكمل الفراغ: (استخدم سكين لقطع الخبز.)",
          "options": [
            "knife",
            "nife",
            "life"
          ],
          "correctIndex": 0,
          "answer": "Use a knife to cut the bread.",
          "explanationAr": "الإجابة: knife. أنماط شائعة: kn = /n/ (know)، wr = /r/ (write)، mb = /m/ (climb)، gh غالباً صامتة (night)، h صامتة في hour, honest، l صامتة في walk, talk, should."
        }
      ],
      "hard": [
        {
          "id": "srp_302_h1",
          "type": "order",
          "promptEn": "Put the words in order: He / mountain / in / Abha. / climbs / the",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (يتسلق الجبل في أبها.)",
          "answer": "He climbs the mountain in Abha.",
          "explanationAr": "الترتيب الصحيح: He climbs the mountain in Abha."
        },
        {
          "id": "srp_302_h2",
          "type": "order",
          "promptEn": "Put the words in order: talk / him. / should / to / You",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (المفروض تكلمه.)",
          "answer": "You should talk to him.",
          "explanationAr": "الترتيب الصحيح: You should talk to him."
        },
        {
          "id": "srp_302_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: اكتب اسمك لو سمحت.",
          "answer": "Please write your name.",
          "explanationAr": "ترجمة مقترحة: Please write your name."
        },
        {
          "id": "srp_302_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: استخدم سكين لقطع الخبز.",
          "answer": "Use a knife to cut the bread.",
          "explanationAr": "ترجمة مقترحة: Use a knife to cut the bread."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Reading every letter: «كْنايف»",
        "correct": "knife /naɪf/",
        "whyAr": "عادة العربي إنه ينطق كل حرف مكتوب."
      },
      {
        "incorrect": "a honest man",
        "correct": "an honest man",
        "whyAr": "الحكم بالصوت مو بالحرف."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (كلمات البصر وقراءة رسالة قصيرة): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "one /wʌn/",
          "one read as «أون»"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: one /wʌn/ — one تبدأ بصوت «و».",
        "fromLessonId": "srp_312_s"
      },
      {
        "questionAr": "مراجعة (ship أو sheep؟ الفرق بين /ɪ/ و /iː/): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I live in Jeddah.",
          "I leave in Jeddah."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I live in Jeddah. — live قصيرة = يسكن؛ leave طويلة = يغادر.",
        "fromLessonId": "srp_310"
      },
      {
        "questionAr": "مراجعة (الحرف e السحري: الحروف الطويلة): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "cake read as «كاكي»",
          "cake /keɪk/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: cake /keɪk/ — e الأخيرة صامتة.",
        "fromLessonId": "srp_307"
      },
      {
        "questionAr": "ما معنى \"dishes\"؟",
        "questionEn": "What does \"dishes\" mean?",
        "options": [
          "يشاهد/ساعات",
          "كلاب",
          "صحون",
          "كتب"
        ],
        "correctIndex": 2,
        "explanationAr": "\"dishes\" /ˈdɪʃɪz/ تعني: صحون. مثال: wash the dishes",
        "fromLessonId": "srp_311_s"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (نمشي ساعة كل ليلة.)",
          "questionEn": "Complete: We walk for ____ every night.",
          "options": [
            "one hour of",
            "an hour",
            "a hour"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: an hour. أنماط شائعة: kn = /n/ (know)، wr = /r/ (write)، mb = /m/ (climb)، gh غالباً صامتة (night)، h صامتة في hour, honest، l صامتة في walk, talk, should."
        },
        {
          "questionAr": "أكمل الفراغ: (استخدم سكين لقطع الخبز.)",
          "questionEn": "Complete: Use a ____ to cut the bread.",
          "options": [
            "knife",
            "nife",
            "life"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: knife. أنماط شائعة: kn = /n/ (know)، wr = /r/ (write)، mb = /m/ (climb)، gh غالباً صامتة (night)، h صامتة في hour, honest، l صامتة في walk, talk, should."
        },
        {
          "questionAr": "ما معنى \"climb\"؟",
          "questionEn": "What does \"climb\" mean?",
          "options": [
            "صادق/أمين",
            "يكتب",
            "يتسلق",
            "لحم خروف صغير"
          ],
          "correctIndex": 2,
          "explanationAr": "\"climb\" /klaɪm/ تعني: يتسلق. مثال: climb a tree"
        },
        {
          "questionAr": "ما معنى \"lamb\"؟",
          "questionEn": "What does \"lamb\" mean?",
          "options": [
            "صادق/أمين",
            "لحم خروف صغير",
            "سكين",
            "ليل"
          ],
          "correctIndex": 1,
          "explanationAr": "\"lamb\" /læm/ تعني: لحم خروف صغير. مثال: lamb kabsa"
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Reading every letter: «كْنايف»",
            "knife /naɪf/"
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: knife /naɪf/ — عادة العربي إنه ينطق كل حرف مكتوب."
        }
      ]
    }
  },
  {
    "id": "srp_313",
    "pillarId": "reading",
    "pillarNameAr": "القراءة التعبيرية والنطق الصوتي",
    "pillarNameEn": "Expressive Reading & Pronunciation Lab",
    "pillarIcon": "📖",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "pen أو pin؟ الفرق بين /ɛ/ و /ɪ/",
    "titleEn": "Pen or Pin? /ɛ/ vs /ɪ/",
    "descAr": "كثير من المتعلمين يخلطون pen و pin، bed و bid، well و will.",
    "descEn": "Many learners mix pen/pin, bed/bid, well/will.",
    "speakingGoalAr": "انطق عشرة أزواج /ɛ/ و /ɪ/ بوضوح.",
    "speakingGoalEn": "Pronounce ten /ɛ/–/ɪ/ pairs clearly.",
    "keyPattern": {
      "ruleAr": "/ɛ/ الفم مفتوح أكثر والفك نازل (pen, bed, set)، /ɪ/ الفم شبه مغلق واللسان أعلى (pin, bid, sit).",
      "ruleEn": "/ɛ/ = jaw lower, mouth more open; /ɪ/ = tongue higher, mouth almost closed.",
      "formula": "/ɛ/: pen, bed, men, sell | /ɪ/: pin, bid, min, sill"
    },
    "practicalExamples": [
      {
        "en": "Can I borrow your pen?",
        "ar": "أقدر أستلف قلمك؟"
      },
      {
        "en": "Put a pin on the map.",
        "ar": "حط دبوس على الخريطة."
      },
      {
        "en": "I will do it well.",
        "ar": "بسويها زين."
      },
      {
        "en": "Ten men in the gym.",
        "ar": "عشرة رجال في النادي."
      },
      {
        "en": "Let's sit and rest.",
        "ar": "خلنا نجلس ونرتاح."
      },
      {
        "en": "Did you get the big gift?",
        "ar": "جاتك الهدية الكبيرة؟"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Give me the pin to write.",
        "correct": "Give me the pen to write.",
        "whyAr": "pen للكتابة، pin دبوس."
      },
      {
        "incorrect": "I sit my car.",
        "correct": "I sell my car.",
        "whyAr": "sell /sɛl/ = يبيع."
      },
      {
        "incorrect": "Ten min (men)",
        "correct": "ten men /tɛn mɛn/",
        "whyAr": "افتح الفم أكثر مع /ɛ/."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اقرأ نص المجلس وانتبه لـ men, sell, pen, bid.",
      "promptEn": "Read the majlis text; watch men, sell, pen, bid.",
      "saraQuestionAr": "اقرأ: Ten men sell camels. One man has a red pen.",
      "saraQuestionEn": "Read: Ten men sell camels. One man has a red pen.",
      "recommendedResponseEn": "Ten men sit in the majlis. They sell and buy camels. One man has a big red pen."
    },
    "quiz": [
      {
        "questionAr": "أداة الكتابة:",
        "questionEn": "Writing tool:",
        "options": [
          "pin",
          "pen",
          "pan"
        ],
        "correctIndex": 1,
        "explanationAr": "pen."
      },
      {
        "questionAr": "أي كلمة فيها /ɛ/؟",
        "questionEn": "Which has /ɛ/?",
        "options": [
          "sit",
          "set",
          "seat"
        ],
        "correctIndex": 1,
        "explanationAr": "set."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Give me the pin to write.",
          "Give me the pen to write."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Give me the pen to write. — pen للكتابة، pin دبوس."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I sell my car.",
          "I sit my car."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I sell my car. — sell /sɛl/ = يبيع."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Ten min (men)",
          "ten men /tɛn mɛn/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: ten men /tɛn mɛn/ — افتح الفم أكثر مع /ɛ/."
      }
    ],
    "whiteboardNotes": {
      "title": "Pen or Pin? /ɛ/ vs /ɪ/",
      "pointsAr": [
        "يميز الصوتين سماعاً.",
        "ينطقهما بوضوح.",
        "يقرأ جملاً تحتوي الاثنين.",
        "/ɛ/ الفم مفتوح أكثر والفك نازل (pen, bed, set)، /ɪ/ الفم شبه مغلق واللسان أعلى (pin, bid, sit)."
      ],
      "pointsEn": [
        "Hear /ɛ/ vs /ɪ/.",
        "Pronounce both clearly.",
        "Read mixed sentences.",
        "/ɛ/ = jaw lower, mouth more open; /ɪ/ = tongue higher, mouth almost closed."
      ],
      "chalkHighlight": "/ɛ/: pen, bed, men, sell | /ɪ/: pin, bid, min, sill"
    },
    "unit": 3,
    "cefr": "A1",
    "objectivesAr": [
      "يميز الصوتين سماعاً.",
      "ينطقهما بوضوح.",
      "يقرأ جملاً تحتوي الاثنين."
    ],
    "objectivesEn": [
      "Hear /ɛ/ vs /ɪ/.",
      "Pronounce both clearly.",
      "Read mixed sentences."
    ],
    "vocabulary": [
      {
        "word": "pen",
        "ipa": "/pɛn/",
        "ar": "قلم",
        "exampleEn": "a red pen",
        "exampleAr": "قلم أحمر"
      },
      {
        "word": "pin",
        "ipa": "/pɪn/",
        "ar": "دبوس/رمز سري",
        "exampleEn": "PIN code",
        "exampleAr": "رقم سري"
      },
      {
        "word": "bed",
        "ipa": "/bɛd/",
        "ar": "سرير",
        "exampleEn": "go to bed",
        "exampleAr": "روح نام"
      },
      {
        "word": "bid",
        "ipa": "/bɪd/",
        "ar": "مزايدة",
        "exampleEn": "a high bid",
        "exampleAr": "مزايدة عالية"
      },
      {
        "word": "well",
        "ipa": "/wɛl/",
        "ar": "جيداً",
        "exampleEn": "very well",
        "exampleAr": "زين مرة"
      },
      {
        "word": "will",
        "ipa": "/wɪl/",
        "ar": "سوف",
        "exampleEn": "I will go.",
        "exampleAr": "بروح."
      },
      {
        "word": "men",
        "ipa": "/mɛn/",
        "ar": "رجال",
        "exampleEn": "two men",
        "exampleAr": "رجلين"
      },
      {
        "word": "sell",
        "ipa": "/sɛl/",
        "ar": "يبيع",
        "exampleEn": "sell a car",
        "exampleAr": "يبيع سيارة"
      },
      {
        "word": "rest",
        "ipa": "/rɛst/",
        "ar": "يرتاح",
        "exampleEn": "take a rest",
        "exampleAr": "خذ راحة"
      },
      {
        "word": "gift",
        "ipa": "/ɡɪft/",
        "ar": "هدية",
        "exampleEn": "a nice gift",
        "exampleAr": "هدية حلوة"
      }
    ],
    "grammarFocus": {
      "ruleAr": "/ɛ/ الفم مفتوح أكثر والفك نازل (pen, bed, set)، /ɪ/ الفم شبه مغلق واللسان أعلى (pin, bid, sit).",
      "ruleEn": "/ɛ/ = jaw lower, mouth more open; /ɪ/ = tongue higher, mouth almost closed.",
      "formula": "/ɛ/: pen, bed, men, sell | /ɪ/: pin, bid, min, sill",
      "examples": [
        {
          "en": "Can I borrow your pen?",
          "ar": "أقدر أستلف قلمك؟"
        },
        {
          "en": "Put a pin on the map.",
          "ar": "حط دبوس على الخريطة."
        },
        {
          "en": "I will do it well.",
          "ar": "بسويها زين."
        },
        {
          "en": "Ten men in the gym.",
          "ar": "عشرة رجال في النادي."
        },
        {
          "en": "Let's sit and rest.",
          "ar": "خلنا نجلس ونرتاح."
        },
        {
          "en": "Did you get the big gift?",
          "ar": "جاتك الهدية الكبيرة؟"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Text",
        "en": "Ten men sit in the majlis.",
        "ar": "عشرة رجال جالسين في المجلس."
      },
      {
        "speaker": "Text",
        "en": "They sell and buy camels.",
        "ar": "يبيعون ويشترون إبل."
      },
      {
        "speaker": "Text",
        "en": "One man has a big red pen.",
        "ar": "رجل معه قلم أحمر كبير."
      },
      {
        "speaker": "Text",
        "en": "He writes every bid on a list.",
        "ar": "يكتب كل مزايدة في قائمة."
      },
      {
        "speaker": "Text",
        "en": "The best camel gets the highest bid.",
        "ar": "أحسن ناقة تاخذ أعلى سعر."
      },
      {
        "speaker": "Text",
        "en": "Then all the men rest and drink tea.",
        "ar": "بعدين الكل يرتاح ويشرب شاي."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Text: Ten men sit in the majlis.\nText: They sell and buy camels.\nText: One man has a big red pen.\nText: He writes every bid on a list.\nText: The best camel gets the highest bid.\nText: Then all the men rest and drink tea.",
      "questions": [
        {
          "questionAr": "كم رجل؟",
          "questionEn": "How many men?",
          "options": [
            "seven",
            "ten",
            "twelve"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: ten"
        },
        {
          "questionAr": "وش يبيعون؟",
          "questionEn": "What do they sell?",
          "options": [
            "cars",
            "camels",
            "dates"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: camels"
        },
        {
          "questionAr": "وش يكتب؟",
          "questionEn": "What does one man write?",
          "options": [
            "names",
            "every bid",
            "a poem"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: every bid"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Jaw drop: /ɪ/ → /ɛ/ → /æ/",
      "items": [
        "pin – pen – pan",
        "bid – bed – bad",
        "sit – set – sat"
      ],
      "tipAr": "حط إصبعك تحت ذقنك: مع كل صوت الفك ينزل أكثر."
    },
    "exercises": {
      "easy": [
        {
          "id": "srp_313_e1",
          "type": "meaning",
          "promptEn": "What does \"pen\" mean?",
          "promptAr": "ما معنى \"pen\"؟",
          "options": [
            "هدية",
            "سرير",
            "جيداً",
            "قلم"
          ],
          "correctIndex": 3,
          "answer": "قلم",
          "explanationAr": "\"pen\" /pɛn/ تعني: قلم. مثال: a red pen"
        },
        {
          "id": "srp_313_e2",
          "type": "meaning",
          "promptEn": "What does \"pin\" mean?",
          "promptAr": "ما معنى \"pin\"؟",
          "options": [
            "رجال",
            "دبوس/رمز سري",
            "سوف",
            "يبيع"
          ],
          "correctIndex": 1,
          "answer": "دبوس/رمز سري",
          "explanationAr": "\"pin\" /pɪn/ تعني: دبوس/رمز سري. مثال: PIN code"
        },
        {
          "id": "srp_313_e3",
          "type": "meaning",
          "promptEn": "What does \"bed\" mean?",
          "promptAr": "ما معنى \"bed\"؟",
          "options": [
            "يرتاح",
            "سرير",
            "قلم",
            "رجال"
          ],
          "correctIndex": 1,
          "answer": "سرير",
          "explanationAr": "\"bed\" /bɛd/ تعني: سرير. مثال: go to bed"
        },
        {
          "id": "srp_313_e4",
          "type": "meaning",
          "promptEn": "What does \"bid\" mean?",
          "promptAr": "ما معنى \"bid\"؟",
          "options": [
            "مزايدة",
            "دبوس/رمز سري",
            "سوف",
            "يرتاح"
          ],
          "correctIndex": 0,
          "answer": "مزايدة",
          "explanationAr": "\"bid\" /bɪd/ تعني: مزايدة. مثال: a high bid"
        }
      ],
      "medium": [
        {
          "id": "srp_313_m1",
          "type": "gap",
          "promptEn": "Complete: Can I borrow your ____?",
          "promptAr": "أكمل الفراغ: (أقدر أستلف قلمك؟)",
          "options": [
            "pin",
            "pen",
            "pan"
          ],
          "correctIndex": 1,
          "answer": "Can I borrow your pen?",
          "explanationAr": "الإجابة: pen. /ɛ/ الفم مفتوح أكثر والفك نازل (pen, bed, set)، /ɪ/ الفم شبه مغلق واللسان أعلى (pin, bid, sit)."
        },
        {
          "id": "srp_313_m2",
          "type": "gap",
          "promptEn": "Complete: Put a ____ on the map.",
          "promptAr": "أكمل الفراغ: (حط دبوس على الخريطة.)",
          "options": [
            "pin",
            "pan",
            "pen"
          ],
          "correctIndex": 0,
          "answer": "Put a pin on the map.",
          "explanationAr": "الإجابة: pin. /ɛ/ الفم مفتوح أكثر والفك نازل (pen, bed, set)، /ɪ/ الفم شبه مغلق واللسان أعلى (pin, bid, sit)."
        },
        {
          "id": "srp_313_m3",
          "type": "gap",
          "promptEn": "Complete: I will do it ____.",
          "promptAr": "أكمل الفراغ: (بسويها زين.)",
          "options": [
            "will",
            "well",
            "wall"
          ],
          "correctIndex": 1,
          "answer": "I will do it well.",
          "explanationAr": "الإجابة: well. /ɛ/ الفم مفتوح أكثر والفك نازل (pen, bed, set)، /ɪ/ الفم شبه مغلق واللسان أعلى (pin, bid, sit)."
        },
        {
          "id": "srp_313_m4",
          "type": "gap",
          "promptEn": "Complete: Ten ____ in the gym.",
          "promptAr": "أكمل الفراغ: (عشرة رجال في النادي.)",
          "options": [
            "man",
            "min",
            "men"
          ],
          "correctIndex": 2,
          "answer": "Ten men in the gym.",
          "explanationAr": "الإجابة: men. /ɛ/ الفم مفتوح أكثر والفك نازل (pen, bed, set)، /ɪ/ الفم شبه مغلق واللسان أعلى (pin, bid, sit)."
        }
      ],
      "hard": [
        {
          "id": "srp_313_h1",
          "type": "order",
          "promptEn": "Put the words in order: and / sit / Let's / rest.",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (خلنا نجلس ونرتاح.)",
          "answer": "Let's sit and rest.",
          "explanationAr": "الترتيب الصحيح: Let's sit and rest."
        },
        {
          "id": "srp_313_h2",
          "type": "order",
          "promptEn": "Put the words in order: get / the / Did / big / gift? / you",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (جاتك الهدية الكبيرة؟)",
          "answer": "Did you get the big gift?",
          "explanationAr": "الترتيب الصحيح: Did you get the big gift?"
        },
        {
          "id": "srp_313_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: حط دبوس على الخريطة.",
          "answer": "Put a pin on the map.",
          "explanationAr": "ترجمة مقترحة: Put a pin on the map."
        },
        {
          "id": "srp_313_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: عشرة رجال في النادي.",
          "answer": "Ten men in the gym.",
          "explanationAr": "ترجمة مقترحة: Ten men in the gym."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Saying pin for pen",
        "correct": "pen /pɛn/",
        "whyAr": "مشكلة شائعة في اللهجات؛ ركز على فتح الفم."
      },
      {
        "incorrect": "Saying /iː/ for /ɪ/: «بيين»",
        "correct": "pin /pɪn/",
        "whyAr": "قصير وخفيف."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (الحروف الصامتة: knife, write, lamb): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "a hour",
          "an hour"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: an hour — h صامتة فالكلمة تبدأ بصوت متحرك.",
        "fromLessonId": "srp_302"
      },
      {
        "questionAr": "مراجعة (نهاية s: ثلاثة أصوات /s/ /z/ /ɪz/): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "dogs read as /dɒɡs/ with hard s",
          "dogs /dɔːɡz/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: dogs /dɔːɡz/ — بعد g المجهورة: /z/.",
        "fromLessonId": "srp_311_s"
      },
      {
        "questionAr": "مراجعة (فرق المتحركات: ee / ea / ai / oa): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "boat /boʊt/",
          "boat read as «بوت» short"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: boat /boʊt/ — oa = «أو» منزلقة.",
        "fromLessonId": "srp_308"
      },
      {
        "questionAr": "ما معنى \"fridge\"؟",
        "questionEn": "What does \"fridge\" mean?",
        "options": [
          "واحد",
          "يجي",
          "هناك",
          "ثلاجة"
        ],
        "correctIndex": 3,
        "explanationAr": "\"fridge\" /frɪdʒ/ تعني: ثلاجة. مثال: in the fridge",
        "fromLessonId": "srp_312_s"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (بسويها زين.)",
          "questionEn": "Complete: I will do it ____.",
          "options": [
            "will",
            "well",
            "wall"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: well. /ɛ/ الفم مفتوح أكثر والفك نازل (pen, bed, set)، /ɪ/ الفم شبه مغلق واللسان أعلى (pin, bid, sit)."
        },
        {
          "questionAr": "أكمل الفراغ: (عشرة رجال في النادي.)",
          "questionEn": "Complete: Ten ____ in the gym.",
          "options": [
            "man",
            "min",
            "men"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: men. /ɛ/ الفم مفتوح أكثر والفك نازل (pen, bed, set)، /ɪ/ الفم شبه مغلق واللسان أعلى (pin, bid, sit)."
        },
        {
          "questionAr": "ما معنى \"well\"؟",
          "questionEn": "What does \"well\" mean?",
          "options": [
            "يرتاح",
            "سوف",
            "رجال",
            "جيداً"
          ],
          "correctIndex": 3,
          "explanationAr": "\"well\" /wɛl/ تعني: جيداً. مثال: very well"
        },
        {
          "questionAr": "ما معنى \"will\"؟",
          "questionEn": "What does \"will\" mean?",
          "options": [
            "دبوس/رمز سري",
            "سوف",
            "سرير",
            "رجال"
          ],
          "correctIndex": 1,
          "explanationAr": "\"will\" /wɪl/ تعني: سوف. مثال: I will go."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "pen /pɛn/",
            "Saying pin for pen"
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: pen /pɛn/ — مشكلة شائعة في اللهجات؛ ركز على فتح الفم."
        }
      ]
    }
  },
  {
    "id": "srp_314",
    "pillarId": "reading",
    "pillarNameAr": "القراءة التعبيرية والنطق الصوتي",
    "pillarNameEn": "Expressive Reading & Pronunciation Lab",
    "pillarIcon": "📖",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "نطق ed في الماضي: /t/ /d/ /ɪd/",
    "titleEn": "Past -ed Endings: /t/, /d/, /ɪd/",
    "descAr": "لا تضيف «إد» لكل فعل: walked «ووكت»، played «بليد»، wanted «وانتِد».",
    "descEn": "Don't add 'ed' as a syllable to every verb: walked, played, wanted.",
    "speakingGoalAr": "اقرأ قصة بالماضي بنطق ed صحيح.",
    "speakingGoalEn": "Read a past-tense story with correct -ed.",
    "keyPattern": {
      "ruleAr": "بعد صوت مهموس (p, k, s, sh, ch, f) = /t/. بعد صوت مجهور أو متحرك = /d/. بعد t أو d فقط = /ɪd/ (مقطع إضافي).",
      "ruleEn": "/t/ after voiceless sounds, /d/ after voiced sounds, /ɪd/ only after t or d.",
      "formula": "walked /t/ | played /d/ | wanted /ɪd/"
    },
    "practicalExamples": [
      {
        "en": "I walked to the mosque.",
        "ar": "مشيت للمسجد."
      },
      {
        "en": "We played football after school.",
        "ar": "لعبنا كورة بعد المدرسة."
      },
      {
        "en": "She wanted a new phone.",
        "ar": "كانت تبي جوال جديد."
      },
      {
        "en": "He needed help, so I helped him.",
        "ar": "احتاج مساعدة فساعدته."
      },
      {
        "en": "They watched the match and laughed.",
        "ar": "شافوا المباراة وضحكوا."
      },
      {
        "en": "I cleaned my room and washed the car.",
        "ar": "نظفت غرفتي وغسلت السيارة."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "walked as «ووكِد» (2 syllables)",
        "correct": "walked /wɔːkt/ (1 syllable)",
        "whyAr": "ed بعد k = /t/ بدون مقطع."
      },
      {
        "incorrect": "played as «بلييت»",
        "correct": "played /pleɪd/",
        "whyAr": "بعد متحرك = /d/."
      },
      {
        "incorrect": "wanted as «وانتد» one syllable",
        "correct": "wanted /ˈwɑːntɪd/",
        "whyAr": "بعد t نضيف «إد»."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اقرأ قصة الطائف بنطق ed صحيح.",
      "promptEn": "Read the Taif story with correct -ed.",
      "saraQuestionAr": "اقرأ لي: We walked in the rose farms and picked flowers.",
      "saraQuestionEn": "Read: We walked in the rose farms and picked flowers.",
      "recommendedResponseEn": "Last Friday, we visited my uncle in Taif. We walked in the rose farms and picked flowers."
    },
    "quiz": [
      {
        "questionAr": "نطق ed في stopped:",
        "questionEn": "-ed in 'stopped':",
        "options": [
          "/t/",
          "/d/",
          "/ɪd/"
        ],
        "correctIndex": 0,
        "explanationAr": "بعد p ⇐ /t/."
      },
      {
        "questionAr": "أي فعل يضيف مقطعاً؟",
        "questionEn": "Which adds a syllable?",
        "options": [
          "opened",
          "started",
          "cooked"
        ],
        "correctIndex": 1,
        "explanationAr": "started (بعد t)."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "walked as «ووكِد» (2 syllables)",
          "walked /wɔːkt/ (1 syllable)"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: walked /wɔːkt/ (1 syllable) — ed بعد k = /t/ بدون مقطع."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "played as «بلييت»",
          "played /pleɪd/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: played /pleɪd/ — بعد متحرك = /d/."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "wanted /ˈwɑːntɪd/",
          "wanted as «وانتد» one syllable"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: wanted /ˈwɑːntɪd/ — بعد t نضيف «إد»."
      }
    ],
    "whiteboardNotes": {
      "title": "Past -ed Endings: /t/, /d/, /ɪd/",
      "pointsAr": [
        "يصنف الأفعال حسب صوت ed.",
        "لا يضيف مقطعاً زائداً.",
        "يقرأ قصة بالماضي بطلاقة.",
        "بعد صوت مهموس (p, k, s, sh, ch, f) = /t/. بعد صوت مجهور أو متحرك = /d/. بعد t أو d فقط = /ɪd/ (مقطع إضافي)."
      ],
      "pointsEn": [
        "Sort verbs by -ed sound.",
        "Avoid extra syllables.",
        "Read a past story fluently.",
        "/t/ after voiceless sounds, /d/ after voiced sounds, /ɪd/ only after t or d."
      ],
      "chalkHighlight": "walked /t/ | played /d/ | wanted /ɪd/"
    },
    "unit": 3,
    "cefr": "A2",
    "objectivesAr": [
      "يصنف الأفعال حسب صوت ed.",
      "لا يضيف مقطعاً زائداً.",
      "يقرأ قصة بالماضي بطلاقة."
    ],
    "objectivesEn": [
      "Sort verbs by -ed sound.",
      "Avoid extra syllables.",
      "Read a past story fluently."
    ],
    "vocabulary": [
      {
        "word": "walked",
        "ipa": "/wɔːkt/",
        "ar": "مشى",
        "exampleEn": "I walked home.",
        "exampleAr": "مشيت للبيت."
      },
      {
        "word": "watched",
        "ipa": "/wɑːtʃt/",
        "ar": "شاهد",
        "exampleEn": "We watched a film.",
        "exampleAr": "شفنا فيلم."
      },
      {
        "word": "laughed",
        "ipa": "/læft/",
        "ar": "ضحك",
        "exampleEn": "Everyone laughed.",
        "exampleAr": "الكل ضحك."
      },
      {
        "word": "played",
        "ipa": "/pleɪd/",
        "ar": "لعب",
        "exampleEn": "They played.",
        "exampleAr": "لعبوا."
      },
      {
        "word": "cleaned",
        "ipa": "/kliːnd/",
        "ar": "نظف",
        "exampleEn": "I cleaned it.",
        "exampleAr": "نظفته."
      },
      {
        "word": "called",
        "ipa": "/kɔːld/",
        "ar": "اتصل",
        "exampleEn": "She called me.",
        "exampleAr": "اتصلت علي."
      },
      {
        "word": "wanted",
        "ipa": "/ˈwɑːntɪd/",
        "ar": "أراد",
        "exampleEn": "He wanted tea.",
        "exampleAr": "كان يبي شاي."
      },
      {
        "word": "needed",
        "ipa": "/ˈniːdɪd/",
        "ar": "احتاج",
        "exampleEn": "We needed time.",
        "exampleAr": "احتجنا وقت."
      },
      {
        "word": "visited",
        "ipa": "/ˈvɪzɪtɪd/",
        "ar": "زار",
        "exampleEn": "We visited Taif.",
        "exampleAr": "زرنا الطائف."
      },
      {
        "word": "decided",
        "ipa": "/dɪˈsaɪdɪd/",
        "ar": "قرر",
        "exampleEn": "I decided to go.",
        "exampleAr": "قررت أروح."
      }
    ],
    "grammarFocus": {
      "ruleAr": "بعد صوت مهموس (p, k, s, sh, ch, f) = /t/. بعد صوت مجهور أو متحرك = /d/. بعد t أو d فقط = /ɪd/ (مقطع إضافي).",
      "ruleEn": "/t/ after voiceless sounds, /d/ after voiced sounds, /ɪd/ only after t or d.",
      "formula": "walked /t/ | played /d/ | wanted /ɪd/",
      "examples": [
        {
          "en": "I walked to the mosque.",
          "ar": "مشيت للمسجد."
        },
        {
          "en": "We played football after school.",
          "ar": "لعبنا كورة بعد المدرسة."
        },
        {
          "en": "She wanted a new phone.",
          "ar": "كانت تبي جوال جديد."
        },
        {
          "en": "He needed help, so I helped him.",
          "ar": "احتاج مساعدة فساعدته."
        },
        {
          "en": "They watched the match and laughed.",
          "ar": "شافوا المباراة وضحكوا."
        },
        {
          "en": "I cleaned my room and washed the car.",
          "ar": "نظفت غرفتي وغسلت السيارة."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Text",
        "en": "Last Friday, we visited my uncle in Taif.",
        "ar": "الجمعة الماضية زرنا عمي في الطائف."
      },
      {
        "speaker": "Text",
        "en": "We walked in the rose farms and picked flowers.",
        "ar": "مشينا في مزارع الورد وقطفنا ورد."
      },
      {
        "speaker": "Text",
        "en": "My cousins played and laughed all day.",
        "ar": "عيال عمي لعبوا وضحكوا طول اليوم."
      },
      {
        "speaker": "Text",
        "en": "In the evening, we watched the sunset from Al Hada.",
        "ar": "بالمساء شفنا الغروب من الهدا."
      },
      {
        "speaker": "Text",
        "en": "My mother wanted to stay longer.",
        "ar": "أمي كانت تبي نجلس أكثر."
      },
      {
        "speaker": "Text",
        "en": "But Dad decided we needed to go home.",
        "ar": "بس أبوي قرر إننا لازم نرجع."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Text: Last Friday, we visited my uncle in Taif.\nText: We walked in the rose farms and picked flowers.\nText: My cousins played and laughed all day.\nText: In the evening, we watched the sunset from Al Hada.\nText: My mother wanted to stay longer.\nText: But Dad decided we needed to go home.",
      "questions": [
        {
          "questionAr": "وين راحوا؟",
          "questionEn": "Where did they go?",
          "options": [
            "Abha",
            "Taif",
            "Jeddah"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: Taif"
        },
        {
          "questionAr": "وش قطفوا؟",
          "questionEn": "What did they pick?",
          "options": [
            "dates",
            "roses",
            "grapes"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: roses"
        },
        {
          "questionAr": "مين كانت تبي تجلس؟",
          "questionEn": "Who wanted to stay longer?",
          "options": [
            "the mother",
            "the cousins",
            "the uncle"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: the mother"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Sort the -ed sounds",
      "items": [
        "/t/: walked, picked, watched, laughed",
        "/d/: played, cleaned, called",
        "/ɪd/: visited, wanted, needed, decided"
      ],
      "tipAr": "الاختبار: هل آخر حرف قبل ed هو t أو d؟ إذا نعم ⇐ «إد». وإلا ⇐ بدون مقطع."
    },
    "exercises": {
      "easy": [
        {
          "id": "srp_314_e1",
          "type": "meaning",
          "promptEn": "What does \"walked\" mean?",
          "promptAr": "ما معنى \"walked\"؟",
          "options": [
            "مشى",
            "احتاج",
            "أراد",
            "لعب"
          ],
          "correctIndex": 0,
          "answer": "مشى",
          "explanationAr": "\"walked\" /wɔːkt/ تعني: مشى. مثال: I walked home."
        },
        {
          "id": "srp_314_e2",
          "type": "meaning",
          "promptEn": "What does \"watched\" mean?",
          "promptAr": "ما معنى \"watched\"؟",
          "options": [
            "اتصل",
            "شاهد",
            "أراد",
            "لعب"
          ],
          "correctIndex": 1,
          "answer": "شاهد",
          "explanationAr": "\"watched\" /wɑːtʃt/ تعني: شاهد. مثال: We watched a film."
        },
        {
          "id": "srp_314_e3",
          "type": "meaning",
          "promptEn": "What does \"laughed\" mean?",
          "promptAr": "ما معنى \"laughed\"؟",
          "options": [
            "ضحك",
            "نظف",
            "احتاج",
            "شاهد"
          ],
          "correctIndex": 0,
          "answer": "ضحك",
          "explanationAr": "\"laughed\" /læft/ تعني: ضحك. مثال: Everyone laughed."
        },
        {
          "id": "srp_314_e4",
          "type": "meaning",
          "promptEn": "What does \"played\" mean?",
          "promptAr": "ما معنى \"played\"؟",
          "options": [
            "أراد",
            "لعب",
            "زار",
            "ضحك"
          ],
          "correctIndex": 1,
          "answer": "لعب",
          "explanationAr": "\"played\" /pleɪd/ تعني: لعب. مثال: They played."
        }
      ],
      "medium": [
        {
          "id": "srp_314_m1",
          "type": "gap",
          "promptEn": "Complete: I ____ to the mosque.",
          "promptAr": "أكمل الفراغ: (مشيت للمسجد.)",
          "options": [
            "walkt",
            "walk",
            "walked"
          ],
          "correctIndex": 2,
          "answer": "I walked to the mosque.",
          "explanationAr": "الإجابة: walked. بعد صوت مهموس (p, k, s, sh, ch, f) = /t/. بعد صوت مجهور أو متحرك = /d/. بعد t أو d فقط = /ɪd/ (مقطع إضافي)."
        },
        {
          "id": "srp_314_m2",
          "type": "gap",
          "promptEn": "Complete: We ____ football after school.",
          "promptAr": "أكمل الفراغ: (لعبنا كورة بعد المدرسة.)",
          "options": [
            "play",
            "plaied",
            "played"
          ],
          "correctIndex": 2,
          "answer": "We played football after school.",
          "explanationAr": "الإجابة: played. بعد صوت مهموس (p, k, s, sh, ch, f) = /t/. بعد صوت مجهور أو متحرك = /d/. بعد t أو d فقط = /ɪd/ (مقطع إضافي)."
        },
        {
          "id": "srp_314_m3",
          "type": "gap",
          "promptEn": "Complete: She ____ a new phone.",
          "promptAr": "أكمل الفراغ: (كانت تبي جوال جديد.)",
          "options": [
            "want",
            "wantd",
            "wanted"
          ],
          "correctIndex": 2,
          "answer": "She wanted a new phone.",
          "explanationAr": "الإجابة: wanted. بعد صوت مهموس (p, k, s, sh, ch, f) = /t/. بعد صوت مجهور أو متحرك = /d/. بعد t أو d فقط = /ɪd/ (مقطع إضافي)."
        },
        {
          "id": "srp_314_m4",
          "type": "gap",
          "promptEn": "Complete: He ____ help, so I helped him.",
          "promptAr": "أكمل الفراغ: (احتاج مساعدة فساعدته.)",
          "options": [
            "needed",
            "need",
            "neded"
          ],
          "correctIndex": 0,
          "answer": "He needed help, so I helped him.",
          "explanationAr": "الإجابة: needed. بعد صوت مهموس (p, k, s, sh, ch, f) = /t/. بعد صوت مجهور أو متحرك = /d/. بعد t أو d فقط = /ɪd/ (مقطع إضافي)."
        }
      ],
      "hard": [
        {
          "id": "srp_314_h1",
          "type": "order",
          "promptEn": "Put the words in order: match / laughed. / watched / the / and / They",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (شافوا المباراة وضحكوا.)",
          "answer": "They watched the match and laughed.",
          "explanationAr": "الترتيب الصحيح: They watched the match and laughed."
        },
        {
          "id": "srp_314_h2",
          "type": "order",
          "promptEn": "Put the words in order: and / I / room / car. / washed / my / the / cleaned",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (نظفت غرفتي وغسلت السيارة.)",
          "answer": "I cleaned my room and washed the car.",
          "explanationAr": "الترتيب الصحيح: I cleaned my room and washed the car."
        },
        {
          "id": "srp_314_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: لعبنا كورة بعد المدرسة.",
          "answer": "We played football after school.",
          "explanationAr": "ترجمة مقترحة: We played football after school."
        },
        {
          "id": "srp_314_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: احتاج مساعدة فساعدته.",
          "answer": "He needed help, so I helped him.",
          "explanationAr": "ترجمة مقترحة: He needed help, so I helped him."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "«بلايِد» / «ووكِد»",
        "correct": "played /pleɪd/, walked /wɔːkt/",
        "whyAr": "أكثر خطأ نطق عند المتعلمين العرب."
      },
      {
        "incorrect": "Dropping -ed: Yesterday I walk.",
        "correct": "Yesterday I walked.",
        "whyAr": "انطق الـ t أو d الأخيرة بوضوح."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (pen أو pin؟ الفرق بين /ɛ/ و /ɪ/): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I sit my car.",
          "I sell my car."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I sell my car. — sell /sɛl/ = يبيع.",
        "fromLessonId": "srp_313"
      },
      {
        "questionAr": "مراجعة (كلمات البصر وقراءة رسالة قصيرة): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "said read as «سيد» /seɪd/",
          "said /sɛd/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: said /sɛd/ — said شاذة: «سِد».",
        "fromLessonId": "srp_312_s"
      },
      {
        "questionAr": "مراجعة (P و B: أشهر مشكلة نطق عند العرب): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I want to park here.",
          "I want to bark here."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I want to park here. — bark = ينبح! خطأ p يغير المعنى.",
        "fromLessonId": "srp_309"
      },
      {
        "questionAr": "ما معنى \"talk\"؟",
        "questionEn": "What does \"talk\" mean?",
        "options": [
          "يتسلق",
          "لحم خروف صغير",
          "يعرف",
          "يتكلم"
        ],
        "correctIndex": 3,
        "explanationAr": "\"talk\" /tɔːk/ تعني: يتكلم. مثال: Let's talk.",
        "fromLessonId": "srp_302"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (كانت تبي جوال جديد.)",
          "questionEn": "Complete: She ____ a new phone.",
          "options": [
            "want",
            "wantd",
            "wanted"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: wanted. بعد صوت مهموس (p, k, s, sh, ch, f) = /t/. بعد صوت مجهور أو متحرك = /d/. بعد t أو d فقط = /ɪd/ (مقطع إضافي)."
        },
        {
          "questionAr": "أكمل الفراغ: (احتاج مساعدة فساعدته.)",
          "questionEn": "Complete: He ____ help, so I helped him.",
          "options": [
            "needed",
            "need",
            "neded"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: needed. بعد صوت مهموس (p, k, s, sh, ch, f) = /t/. بعد صوت مجهور أو متحرك = /d/. بعد t أو d فقط = /ɪd/ (مقطع إضافي)."
        },
        {
          "questionAr": "ما معنى \"cleaned\"؟",
          "questionEn": "What does \"cleaned\" mean?",
          "options": [
            "ضحك",
            "لعب",
            "احتاج",
            "نظف"
          ],
          "correctIndex": 3,
          "explanationAr": "\"cleaned\" /kliːnd/ تعني: نظف. مثال: I cleaned it."
        },
        {
          "questionAr": "ما معنى \"called\"؟",
          "questionEn": "What does \"called\" mean?",
          "options": [
            "شاهد",
            "قرر",
            "نظف",
            "اتصل"
          ],
          "correctIndex": 3,
          "explanationAr": "\"called\" /kɔːld/ تعني: اتصل. مثال: She called me."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "played /pleɪd/, walked /wɔːkt/",
            "«بلايِد» / «ووكِد»"
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: played /pleɪd/, walked /wɔːkt/ — أكثر خطأ نطق عند المتعلمين العرب."
        }
      ]
    }
  },
  {
    "id": "srp_315",
    "pillarId": "reading",
    "pillarNameAr": "القراءة التعبيرية والنطق الصوتي",
    "pillarNameEn": "Expressive Reading & Pronunciation Lab",
    "pillarIcon": "📖",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "نبر الكلمة: أين الضغط؟",
    "titleEn": "Word Stress: Which Syllable?",
    "descAr": "الضغط الخطأ يخلي كلمتك غير مفهومة: hoTEL، comPUter، phoTOgraphy.",
    "descEn": "Wrong stress makes words hard to understand: hoTEL, comPUter, phoTOgraphy.",
    "speakingGoalAr": "انطق عشرين كلمة بالنبر الصحيح.",
    "speakingGoalEn": "Say twenty words with correct stress.",
    "keyPattern": {
      "ruleAr": "في كل كلمة مقطع واحد أقوى وأطول وأعلى. أغلب الأسماء من مقطعين ضغطها على الأول (TAble)، وأغلب الأفعال على الثاني (reLAX). الكلمات المنتهية بـ tion/sion الضغط قبلها (inforMAtion).",
      "ruleEn": "One syllable is louder, longer, higher. Two-syllable nouns: first syllable; verbs: second; -tion words: before -tion.",
      "formula": "NOUN: TAble, PROject | VERB: reLAX, proJECT | -tion: inforMAtion"
    },
    "practicalExamples": [
      {
        "en": "I work on a comPUter.",
        "ar": "أشتغل على كمبيوتر."
      },
      {
        "en": "We stayed at a nice hoTEL.",
        "ar": "سكنا في فندق حلو."
      },
      {
        "en": "I need more inforMAtion.",
        "ar": "أحتاج معلومات أكثر."
      },
      {
        "en": "Let's reLAX this weekend.",
        "ar": "خلنا نرتاح هالويكند."
      },
      {
        "en": "My favourite subject is geOGraphy.",
        "ar": "مادتي المفضلة الجغرافيا."
      },
      {
        "en": "She is a TEAcher at a primary SCHOOL.",
        "ar": "معلمة في ابتدائي."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "COMputer",
        "correct": "comPUter /kəmˈpjuːtər/",
        "whyAr": "computer ضغطها على المقطع الثاني PU."
      },
      {
        "incorrect": "HOtel",
        "correct": "hoTEL /hoʊˈtɛl/",
        "whyAr": "hotel ضغطها في الآخر."
      },
      {
        "incorrect": "INformation",
        "correct": "inforMAtion /ˌɪnfərˈmeɪʃən/",
        "whyAr": "قبل tion."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اقرأ نص المصور بنبر صحيح.",
      "promptEn": "Read the photographer text with correct stress.",
      "saraQuestionAr": "اقرأ: My brother is a photographer. He took a photograph.",
      "saraQuestionEn": "Read: My brother is a photographer. He took a photograph.",
      "recommendedResponseEn": "My brother is a phoTOgrapher. He took a PHOtograph of the old rocks."
    },
    "quiz": [
      {
        "questionAr": "أين الضغط في hotel؟",
        "questionEn": "Stress in 'hotel'?",
        "options": [
          "HO-tel",
          "ho-TEL"
        ],
        "correctIndex": 1,
        "explanationAr": "hoTEL."
      },
      {
        "questionAr": "أين الضغط في education؟",
        "questionEn": "Stress in 'education'?",
        "options": [
          "EDucation",
          "eduCAtion",
          "educaTION"
        ],
        "correctIndex": 1,
        "explanationAr": "قبل tion."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "comPUter /kəmˈpjuːtər/",
          "COMputer"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: comPUter /kəmˈpjuːtər/ — computer ضغطها على المقطع الثاني PU."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "hoTEL /hoʊˈtɛl/",
          "HOtel"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: hoTEL /hoʊˈtɛl/ — hotel ضغطها في الآخر."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "INformation",
          "inforMAtion /ˌɪnfərˈmeɪʃən/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: inforMAtion /ˌɪnfərˈmeɪʃən/ — قبل tion."
      }
    ],
    "whiteboardNotes": {
      "title": "Word Stress: Which Syllable?",
      "pointsAr": [
        "يحدد المقطع المنبور.",
        "يطبق قاعدة الأسماء والأفعال.",
        "يطبق قاعدة tion.",
        "في كل كلمة مقطع واحد أقوى وأطول وأعلى. أغلب الأسماء من مقطعين ضغطها على الأول (TAble)، وأغلب الأفعال على الثاني (reLAX). الكلمات المنتهية بـ tion/sion الضغط قبلها (inforMAtion)."
      ],
      "pointsEn": [
        "Identify the stressed syllable.",
        "Apply noun/verb patterns.",
        "Apply the -tion rule.",
        "One syllable is louder, longer, higher. Two-syllable nouns: first syllable; verbs: second; -tion words: before -tion."
      ],
      "chalkHighlight": "NOUN: TAble, PROject | VERB: reLAX, proJECT | -tion: inforMAtion"
    },
    "unit": 3,
    "cefr": "A2",
    "objectivesAr": [
      "يحدد المقطع المنبور.",
      "يطبق قاعدة الأسماء والأفعال.",
      "يطبق قاعدة tion."
    ],
    "objectivesEn": [
      "Identify the stressed syllable.",
      "Apply noun/verb patterns.",
      "Apply the -tion rule."
    ],
    "vocabulary": [
      {
        "word": "hotel",
        "ipa": "/hoʊˈtɛl/",
        "ar": "فندق",
        "exampleEn": "a five-star hotel",
        "exampleAr": "فندق خمس نجوم"
      },
      {
        "word": "computer",
        "ipa": "/kəmˈpjuːtər/",
        "ar": "كمبيوتر",
        "exampleEn": "a new computer",
        "exampleAr": "كمبيوتر جديد"
      },
      {
        "word": "information",
        "ipa": "/ˌɪnfərˈmeɪʃən/",
        "ar": "معلومات",
        "exampleEn": "more information",
        "exampleAr": "معلومات أكثر"
      },
      {
        "word": "relax",
        "ipa": "/rɪˈlæks/",
        "ar": "يرتاح",
        "exampleEn": "Relax!",
        "exampleAr": "ارتاح!"
      },
      {
        "word": "geography",
        "ipa": "/dʒiˈɑːɡrəfi/",
        "ar": "جغرافيا",
        "exampleEn": "a geography test",
        "exampleAr": "اختبار جغرافيا"
      },
      {
        "word": "banana",
        "ipa": "/bəˈnænə/",
        "ar": "موز",
        "exampleEn": "a ripe banana",
        "exampleAr": "موزة ناضجة"
      },
      {
        "word": "present (n.)",
        "ipa": "/ˈprɛzənt/",
        "ar": "هدية",
        "exampleEn": "a birthday present",
        "exampleAr": "هدية عيد ميلاد"
      },
      {
        "word": "present (v.)",
        "ipa": "/prɪˈzɛnt/",
        "ar": "يقدّم",
        "exampleEn": "present a project",
        "exampleAr": "يقدم مشروع"
      },
      {
        "word": "photograph",
        "ipa": "/ˈfoʊtəɡræf/",
        "ar": "صورة",
        "exampleEn": "an old photograph",
        "exampleAr": "صورة قديمة"
      },
      {
        "word": "photographer",
        "ipa": "/fəˈtɑːɡrəfər/",
        "ar": "مصور",
        "exampleEn": "a wedding photographer",
        "exampleAr": "مصور أعراس"
      }
    ],
    "grammarFocus": {
      "ruleAr": "في كل كلمة مقطع واحد أقوى وأطول وأعلى. أغلب الأسماء من مقطعين ضغطها على الأول (TAble)، وأغلب الأفعال على الثاني (reLAX). الكلمات المنتهية بـ tion/sion الضغط قبلها (inforMAtion).",
      "ruleEn": "One syllable is louder, longer, higher. Two-syllable nouns: first syllable; verbs: second; -tion words: before -tion.",
      "formula": "NOUN: TAble, PROject | VERB: reLAX, proJECT | -tion: inforMAtion",
      "examples": [
        {
          "en": "I work on a comPUter.",
          "ar": "أشتغل على كمبيوتر."
        },
        {
          "en": "We stayed at a nice hoTEL.",
          "ar": "سكنا في فندق حلو."
        },
        {
          "en": "I need more inforMAtion.",
          "ar": "أحتاج معلومات أكثر."
        },
        {
          "en": "Let's reLAX this weekend.",
          "ar": "خلنا نرتاح هالويكند."
        },
        {
          "en": "My favourite subject is geOGraphy.",
          "ar": "مادتي المفضلة الجغرافيا."
        },
        {
          "en": "She is a TEAcher at a primary SCHOOL.",
          "ar": "معلمة في ابتدائي."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Text",
        "en": "My brother is a photographer.",
        "ar": "أخوي مصور."
      },
      {
        "speaker": "Text",
        "en": "Last month he went to a hotel in AlUla.",
        "ar": "الشهر الماضي راح فندق في العلا."
      },
      {
        "speaker": "Text",
        "en": "He took a photograph of the old rocks.",
        "ar": "صوّر الصخور القديمة."
      },
      {
        "speaker": "Text",
        "en": "Now he wants to present it at an exhibition.",
        "ar": "الحين يبي يقدمها في معرض."
      },
      {
        "speaker": "Text",
        "en": "He is preparing the information on his computer.",
        "ar": "يجهز المعلومات على كمبيوتره."
      },
      {
        "speaker": "Text",
        "en": "I hope he can relax after it!",
        "ar": "أتمنى يرتاح بعدها!"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Text: My brother is a photographer.\nText: Last month he went to a hotel in AlUla.\nText: He took a photograph of the old rocks.\nText: Now he wants to present it at an exhibition.\nText: He is preparing the information on his computer.\nText: I hope he can relax after it!",
      "questions": [
        {
          "questionAr": "شغلة الأخ؟",
          "questionEn": "What is the brother's job?",
          "options": [
            "teacher",
            "photographer",
            "engineer"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: photographer"
        },
        {
          "questionAr": "وين الفندق؟",
          "questionEn": "Where was the hotel?",
          "options": [
            "Abha",
            "AlUla",
            "Riyadh"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: AlUla"
        },
        {
          "questionAr": "وين بيقدمها؟",
          "questionEn": "Where will he present it?",
          "options": [
            "at school",
            "at an exhibition",
            "online"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: at an exhibition"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Stress shift in word families",
      "items": [
        "PHOtograph /ˈfoʊtəɡræf/",
        "phoTOgrapher /fəˈtɑːɡrəfər/",
        "photoGRAphic /ˌfoʊtəˈɡræfɪk/"
      ],
      "tipAr": "المقطع المنبور طويل وعالي، والباقي يضعف لـ «أ» خفيفة (schwa)."
    },
    "exercises": {
      "easy": [
        {
          "id": "srp_315_e1",
          "type": "meaning",
          "promptEn": "What does \"hotel\" mean?",
          "promptAr": "ما معنى \"hotel\"؟",
          "options": [
            "فندق",
            "كمبيوتر",
            "هدية",
            "موز"
          ],
          "correctIndex": 0,
          "answer": "فندق",
          "explanationAr": "\"hotel\" /hoʊˈtɛl/ تعني: فندق. مثال: a five-star hotel"
        },
        {
          "id": "srp_315_e2",
          "type": "meaning",
          "promptEn": "What does \"computer\" mean?",
          "promptAr": "ما معنى \"computer\"؟",
          "options": [
            "هدية",
            "يقدّم",
            "كمبيوتر",
            "صورة"
          ],
          "correctIndex": 2,
          "answer": "كمبيوتر",
          "explanationAr": "\"computer\" /kəmˈpjuːtər/ تعني: كمبيوتر. مثال: a new computer"
        },
        {
          "id": "srp_315_e3",
          "type": "meaning",
          "promptEn": "What does \"information\" mean?",
          "promptAr": "ما معنى \"information\"؟",
          "options": [
            "مصور",
            "صورة",
            "يقدّم",
            "معلومات"
          ],
          "correctIndex": 3,
          "answer": "معلومات",
          "explanationAr": "\"information\" /ˌɪnfərˈmeɪʃən/ تعني: معلومات. مثال: more information"
        },
        {
          "id": "srp_315_e4",
          "type": "meaning",
          "promptEn": "What does \"relax\" mean?",
          "promptAr": "ما معنى \"relax\"؟",
          "options": [
            "جغرافيا",
            "كمبيوتر",
            "يرتاح",
            "صورة"
          ],
          "correctIndex": 2,
          "answer": "يرتاح",
          "explanationAr": "\"relax\" /rɪˈlæks/ تعني: يرتاح. مثال: Relax!"
        }
      ],
      "medium": [
        {
          "id": "srp_315_m1",
          "type": "gap",
          "promptEn": "Complete: I work on a ____.",
          "promptAr": "أكمل الفراغ: (أشتغل على كمبيوتر.)",
          "options": [
            "COMputer",
            "compuTER",
            "comPUter"
          ],
          "correctIndex": 2,
          "answer": "I work on a comPUter.",
          "explanationAr": "الإجابة: comPUter. في كل كلمة مقطع واحد أقوى وأطول وأعلى. أغلب الأسماء من مقطعين ضغطها على الأول (TAble)، وأغلب الأفعال على الثاني (reLAX). الكلمات المنتهية بـ tion/sion الضغط قبلها (inforMAtion)."
        },
        {
          "id": "srp_315_m2",
          "type": "gap",
          "promptEn": "Complete: We stayed at a nice ____.",
          "promptAr": "أكمل الفراغ: (سكنا في فندق حلو.)",
          "options": [
            "HOtel",
            "HOTel",
            "hoTEL"
          ],
          "correctIndex": 2,
          "answer": "We stayed at a nice hoTEL.",
          "explanationAr": "الإجابة: hoTEL. في كل كلمة مقطع واحد أقوى وأطول وأعلى. أغلب الأسماء من مقطعين ضغطها على الأول (TAble)، وأغلب الأفعال على الثاني (reLAX). الكلمات المنتهية بـ tion/sion الضغط قبلها (inforMAtion)."
        },
        {
          "id": "srp_315_m3",
          "type": "gap",
          "promptEn": "Complete: I need more ____.",
          "promptAr": "أكمل الفراغ: (أحتاج معلومات أكثر.)",
          "options": [
            "inforMAtion",
            "INformation",
            "informaTION"
          ],
          "correctIndex": 0,
          "answer": "I need more inforMAtion.",
          "explanationAr": "الإجابة: inforMAtion. في كل كلمة مقطع واحد أقوى وأطول وأعلى. أغلب الأسماء من مقطعين ضغطها على الأول (TAble)، وأغلب الأفعال على الثاني (reLAX). الكلمات المنتهية بـ tion/sion الضغط قبلها (inforMAtion)."
        },
        {
          "id": "srp_315_m4",
          "type": "gap",
          "promptEn": "Complete: Let's ____ this weekend.",
          "promptAr": "أكمل الفراغ: (خلنا نرتاح هالويكند.)",
          "options": [
            "reLAX",
            "REllax",
            "RElax"
          ],
          "correctIndex": 0,
          "answer": "Let's reLAX this weekend.",
          "explanationAr": "الإجابة: reLAX. في كل كلمة مقطع واحد أقوى وأطول وأعلى. أغلب الأسماء من مقطعين ضغطها على الأول (TAble)، وأغلب الأفعال على الثاني (reLAX). الكلمات المنتهية بـ tion/sion الضغط قبلها (inforMAtion)."
        }
      ],
      "hard": [
        {
          "id": "srp_315_h1",
          "type": "order",
          "promptEn": "Put the words in order: is / My / favourite / subject / geOGraphy.",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (مادتي المفضلة الجغرافيا.)",
          "answer": "My favourite subject is geOGraphy.",
          "explanationAr": "الترتيب الصحيح: My favourite subject is geOGraphy."
        },
        {
          "id": "srp_315_h2",
          "type": "order",
          "promptEn": "Put the words in order: at / SCHOOL. / TEAcher / She / a / a / is / primary",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (معلمة في ابتدائي.)",
          "answer": "She is a TEAcher at a primary SCHOOL.",
          "explanationAr": "الترتيب الصحيح: She is a TEAcher at a primary SCHOOL."
        },
        {
          "id": "srp_315_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: سكنا في فندق حلو.",
          "answer": "We stayed at a nice hoTEL.",
          "explanationAr": "ترجمة مقترحة: We stayed at a nice hoTEL."
        },
        {
          "id": "srp_315_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: خلنا نرتاح هالويكند.",
          "answer": "Let's reLAX this weekend.",
          "explanationAr": "ترجمة مقترحة: Let's reLAX this weekend."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Equal stress on all syllables (robotic)",
        "correct": "One strong syllable per word",
        "whyAr": "العربي يعطي كل مقطع وزن؛ الإنجليزي يضغط واحد."
      },
      {
        "incorrect": "deVElop → DEvelop",
        "correct": "deVELop /dɪˈvɛləp/",
        "whyAr": "تعلم نبر كل كلمة جديدة مع معناها."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (نطق ed في الماضي: /t/ /d/ /ɪd/): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "played as «بلييت»",
          "played /pleɪd/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: played /pleɪd/ — بعد متحرك = /d/.",
        "fromLessonId": "srp_314"
      },
      {
        "questionAr": "مراجعة (الحروف الصامتة: knife, write, lamb): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "k-nife with a /k/",
          "knife /naɪf/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: knife /naɪf/ — k قبل n صامتة.",
        "fromLessonId": "srp_302"
      },
      {
        "questionAr": "مراجعة (ship أو sheep؟ الفرق بين /ɪ/ و /iː/): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I leave in Jeddah.",
          "I live in Jeddah."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I live in Jeddah. — live قصيرة = يسكن؛ leave طويلة = يغادر.",
        "fromLessonId": "srp_310"
      },
      {
        "questionAr": "ما معنى \"gift\"؟",
        "questionEn": "What does \"gift\" mean?",
        "options": [
          "يرتاح",
          "يبيع",
          "هدية",
          "قلم"
        ],
        "correctIndex": 2,
        "explanationAr": "\"gift\" /ɡɪft/ تعني: هدية. مثال: a nice gift",
        "fromLessonId": "srp_313"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (أحتاج معلومات أكثر.)",
          "questionEn": "Complete: I need more ____.",
          "options": [
            "inforMAtion",
            "INformation",
            "informaTION"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: inforMAtion. في كل كلمة مقطع واحد أقوى وأطول وأعلى. أغلب الأسماء من مقطعين ضغطها على الأول (TAble)، وأغلب الأفعال على الثاني (reLAX). الكلمات المنتهية بـ tion/sion الضغط قبلها (inforMAtion)."
        },
        {
          "questionAr": "أكمل الفراغ: (خلنا نرتاح هالويكند.)",
          "questionEn": "Complete: Let's ____ this weekend.",
          "options": [
            "reLAX",
            "REllax",
            "RElax"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: reLAX. في كل كلمة مقطع واحد أقوى وأطول وأعلى. أغلب الأسماء من مقطعين ضغطها على الأول (TAble)، وأغلب الأفعال على الثاني (reLAX). الكلمات المنتهية بـ tion/sion الضغط قبلها (inforMAtion)."
        },
        {
          "questionAr": "ما معنى \"geography\"؟",
          "questionEn": "What does \"geography\" mean?",
          "options": [
            "مصور",
            "جغرافيا",
            "هدية",
            "كمبيوتر"
          ],
          "correctIndex": 1,
          "explanationAr": "\"geography\" /dʒiˈɑːɡrəfi/ تعني: جغرافيا. مثال: a geography test"
        },
        {
          "questionAr": "ما معنى \"banana\"؟",
          "questionEn": "What does \"banana\" mean?",
          "options": [
            "مصور",
            "معلومات",
            "موز",
            "صورة"
          ],
          "correctIndex": 2,
          "explanationAr": "\"banana\" /bəˈnænə/ تعني: موز. مثال: a ripe banana"
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "One strong syllable per word",
            "Equal stress on all syllables (robotic)"
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: One strong syllable per word — العربي يعطي كل مقطع وزن؛ الإنجليزي يضغط واحد."
        }
      ]
    }
  },
  {
    "id": "srp_316",
    "pillarId": "reading",
    "pillarNameAr": "القراءة التعبيرية والنطق الصوتي",
    "pillarNameEn": "Expressive Reading & Pronunciation Lab",
    "pillarIcon": "📖",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "تجمعات الحروف الساكنة: street و spring",
    "titleEn": "Consonant Clusters: street, spring, desks",
    "descAr": "لا تضيف «إ» قبل الكلمة (إسبرنق) أو بين الحروف (سِتريت).",
    "descEn": "Don't add vowels before or inside clusters: not 'espring' or 'sitreet'.",
    "speakingGoalAr": "انطق عشرين كلمة فيها تجمعات بدون إضافة حروف.",
    "speakingGoalEn": "Say twenty cluster words without extra vowels.",
    "keyPattern": {
      "ruleAr": "الإنجليزي يسمح بثلاثة سواكن متتالية في البداية (str, spl, spr) وأربعة في النهاية (texts). العربي لا يبدأ بساكنين، فننطقها ببطء: s...treet ثم نسرّع.",
      "ruleEn": "English allows CCC at the start (str, spr) and up to CCCC at the end (texts). Start slowly then speed up.",
      "formula": "s + tr + eet → street (no 'e' before, no vowel inside)"
    },
    "practicalExamples": [
      {
        "en": "The street is very busy.",
        "ar": "الشارع مزحوم مرة."
      },
      {
        "en": "Spring is short in Riyadh.",
        "ar": "الربيع قصير في الرياض."
      },
      {
        "en": "I study in a school library.",
        "ar": "أذاكر في مكتبة المدرسة."
      },
      {
        "en": "Please print three texts.",
        "ar": "اطبع ثلاث نصوص لو سمحت."
      },
      {
        "en": "She splashed water on the floor.",
        "ar": "رشت ماي على الأرض."
      },
      {
        "en": "The desks are next to the window.",
        "ar": "الطاولات جنب النافذة."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "estudent",
        "correct": "student /ˈstuːdənt/",
        "whyAr": "لا همزة قبل s."
      },
      {
        "incorrect": "sipring",
        "correct": "spring /sprɪŋ/",
        "whyAr": "لا متحرك بين s و p."
      },
      {
        "incorrect": "deskis",
        "correct": "desks /dɛsks/",
        "whyAr": "النهاية sks بدون إضافة."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اقرأ: Students splash in the street every spring.",
      "promptEn": "Read: Students splash in the street every spring.",
      "saraQuestionAr": "قلها بسرعة ثلاث مرات بدون «إ»!",
      "saraQuestionEn": "Say it fast three times, no extra vowels!",
      "recommendedResponseEn": "Students splash in the street every spring."
    },
    "quiz": [
      {
        "questionAr": "النطق الصحيح لـ school:",
        "questionEn": "Correct 'school':",
        "options": [
          "/ɪˈskuːl/",
          "/skuːl/",
          "/sɪˈkuːl/"
        ],
        "correctIndex": 1,
        "explanationAr": "بدون حرف زائد."
      },
      {
        "questionAr": "كم مقطع في street؟",
        "questionEn": "Syllables in 'street'?",
        "options": [
          "one",
          "two",
          "three"
        ],
        "correctIndex": 0,
        "explanationAr": "مقطع واحد."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "student /ˈstuːdənt/",
          "estudent"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: student /ˈstuːdənt/ — لا همزة قبل s."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "sipring",
          "spring /sprɪŋ/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: spring /sprɪŋ/ — لا متحرك بين s و p."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "desks /dɛsks/",
          "deskis"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: desks /dɛsks/ — النهاية sks بدون إضافة."
      }
    ],
    "whiteboardNotes": {
      "title": "Consonant Clusters: street, spring, desks",
      "pointsAr": [
        "ينطق التجمعات الأولية بدون همزة.",
        "ينطق التجمعات النهائية.",
        "يقرأ جملاً كثيفة السواكن.",
        "الإنجليزي يسمح بثلاثة سواكن متتالية في البداية (str, spl, spr) وأربعة في النهاية (texts). العربي لا يبدأ بساكنين، فننطقها ببطء: s...treet ثم نسرّع."
      ],
      "pointsEn": [
        "Say initial clusters without a vowel.",
        "Say final clusters.",
        "Read cluster-heavy sentences.",
        "English allows CCC at the start (str, spr) and up to CCCC at the end (texts). Start slowly then speed up."
      ],
      "chalkHighlight": "s + tr + eet → street (no 'e' before, no vowel inside)"
    },
    "unit": 3,
    "cefr": "A2",
    "objectivesAr": [
      "ينطق التجمعات الأولية بدون همزة.",
      "ينطق التجمعات النهائية.",
      "يقرأ جملاً كثيفة السواكن."
    ],
    "objectivesEn": [
      "Say initial clusters without a vowel.",
      "Say final clusters.",
      "Read cluster-heavy sentences."
    ],
    "vocabulary": [
      {
        "word": "street",
        "ipa": "/striːt/",
        "ar": "شارع",
        "exampleEn": "a long street",
        "exampleAr": "شارع طويل"
      },
      {
        "word": "spring",
        "ipa": "/sprɪŋ/",
        "ar": "ربيع",
        "exampleEn": "in spring",
        "exampleAr": "في الربيع"
      },
      {
        "word": "student",
        "ipa": "/ˈstuːdənt/",
        "ar": "طالب",
        "exampleEn": "a good student",
        "exampleAr": "طالب ممتاز"
      },
      {
        "word": "school",
        "ipa": "/skuːl/",
        "ar": "مدرسة",
        "exampleEn": "my school",
        "exampleAr": "مدرستي"
      },
      {
        "word": "strong",
        "ipa": "/strɔːŋ/",
        "ar": "قوي",
        "exampleEn": "strong coffee",
        "exampleAr": "قهوة ثقيلة"
      },
      {
        "word": "splash",
        "ipa": "/splæʃ/",
        "ar": "يرش/رشة",
        "exampleEn": "a big splash",
        "exampleAr": "رشة كبيرة"
      },
      {
        "word": "desks",
        "ipa": "/dɛsks/",
        "ar": "مكاتب/طاولات",
        "exampleEn": "new desks",
        "exampleAr": "طاولات جديدة"
      },
      {
        "word": "texts",
        "ipa": "/tɛksts/",
        "ar": "رسائل/نصوص",
        "exampleEn": "send texts",
        "exampleAr": "يرسل رسائل"
      },
      {
        "word": "screen",
        "ipa": "/skriːn/",
        "ar": "شاشة",
        "exampleEn": "a big screen",
        "exampleAr": "شاشة كبيرة"
      },
      {
        "word": "square",
        "ipa": "/skwɛr/",
        "ar": "ميدان/مربع",
        "exampleEn": "the main square",
        "exampleAr": "الساحة الرئيسية"
      }
    ],
    "grammarFocus": {
      "ruleAr": "الإنجليزي يسمح بثلاثة سواكن متتالية في البداية (str, spl, spr) وأربعة في النهاية (texts). العربي لا يبدأ بساكنين، فننطقها ببطء: s...treet ثم نسرّع.",
      "ruleEn": "English allows CCC at the start (str, spr) and up to CCCC at the end (texts). Start slowly then speed up.",
      "formula": "s + tr + eet → street (no 'e' before, no vowel inside)",
      "examples": [
        {
          "en": "The street is very busy.",
          "ar": "الشارع مزحوم مرة."
        },
        {
          "en": "Spring is short in Riyadh.",
          "ar": "الربيع قصير في الرياض."
        },
        {
          "en": "I study in a school library.",
          "ar": "أذاكر في مكتبة المدرسة."
        },
        {
          "en": "Please print three texts.",
          "ar": "اطبع ثلاث نصوص لو سمحت."
        },
        {
          "en": "She splashed water on the floor.",
          "ar": "رشت ماي على الأرض."
        },
        {
          "en": "The desks are next to the window.",
          "ar": "الطاولات جنب النافذة."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Text",
        "en": "Our school is on a strong, straight street.",
        "ar": "مدرستنا في شارع مستقيم."
      },
      {
        "speaker": "Text",
        "en": "Every spring, students play in the square.",
        "ar": "كل ربيع الطلاب يلعبون في الساحة."
      },
      {
        "speaker": "Text",
        "en": "There's a big screen next to the desks.",
        "ar": "فيه شاشة كبيرة جنب الطاولات."
      },
      {
        "speaker": "Text",
        "en": "Our teacher sends us texts about our tests.",
        "ar": "معلمنا يرسل لنا رسائل عن الاختبارات."
      },
      {
        "speaker": "Text",
        "en": "Last week it rained and we splashed in the street.",
        "ar": "الأسبوع الماضي مطرت ورشينا في الشارع."
      },
      {
        "speaker": "Text",
        "en": "It was the best spring ever!",
        "ar": "كان أحلى ربيع!"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Text: Our school is on a strong, straight street.\nText: Every spring, students play in the square.\nText: There's a big screen next to the desks.\nText: Our teacher sends us texts about our tests.\nText: Last week it rained and we splashed in the street.\nText: It was the best spring ever!",
      "questions": [
        {
          "questionAr": "وين يلعبون؟",
          "questionEn": "Where do students play in spring?",
          "options": [
            "in the square",
            "in the hall",
            "at home"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: in the square"
        },
        {
          "questionAr": "وش يرسل المعلم؟",
          "questionEn": "What does the teacher send?",
          "options": [
            "emails",
            "texts",
            "letters"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: texts"
        },
        {
          "questionAr": "وش صار الأسبوع الماضي؟",
          "questionEn": "What happened last week?",
          "options": [
            "it rained",
            "it snowed",
            "a sandstorm"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: it rained"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Build-up drill: treet → street, ring → pring → spring",
      "items": [
        "s-treet",
        "s-pring",
        "s-kreen",
        "des-ks"
      ],
      "tipAr": "ابدأ بنطق الحرف s ممدود «سسس» وبعده الكلمة مباشرة: sss-treet."
    },
    "exercises": {
      "easy": [
        {
          "id": "srp_316_e1",
          "type": "meaning",
          "promptEn": "What does \"street\" mean?",
          "promptAr": "ما معنى \"street\"؟",
          "options": [
            "مكاتب/طاولات",
            "ميدان/مربع",
            "شارع",
            "طالب"
          ],
          "correctIndex": 2,
          "answer": "شارع",
          "explanationAr": "\"street\" /striːt/ تعني: شارع. مثال: a long street"
        },
        {
          "id": "srp_316_e2",
          "type": "meaning",
          "promptEn": "What does \"spring\" mean?",
          "promptAr": "ما معنى \"spring\"؟",
          "options": [
            "ربيع",
            "طالب",
            "شارع",
            "شاشة"
          ],
          "correctIndex": 0,
          "answer": "ربيع",
          "explanationAr": "\"spring\" /sprɪŋ/ تعني: ربيع. مثال: in spring"
        },
        {
          "id": "srp_316_e3",
          "type": "meaning",
          "promptEn": "What does \"student\" mean?",
          "promptAr": "ما معنى \"student\"؟",
          "options": [
            "طالب",
            "قوي",
            "ميدان/مربع",
            "شاشة"
          ],
          "correctIndex": 0,
          "answer": "طالب",
          "explanationAr": "\"student\" /ˈstuːdənt/ تعني: طالب. مثال: a good student"
        },
        {
          "id": "srp_316_e4",
          "type": "meaning",
          "promptEn": "What does \"school\" mean?",
          "promptAr": "ما معنى \"school\"؟",
          "options": [
            "شاشة",
            "مدرسة",
            "رسائل/نصوص",
            "طالب"
          ],
          "correctIndex": 1,
          "answer": "مدرسة",
          "explanationAr": "\"school\" /skuːl/ تعني: مدرسة. مثال: my school"
        }
      ],
      "medium": [
        {
          "id": "srp_316_m1",
          "type": "gap",
          "promptEn": "Complete: The ____ is very busy.",
          "promptAr": "أكمل الفراغ: (الشارع مزحوم مرة.)",
          "options": [
            "estreet",
            "sitreet",
            "street"
          ],
          "correctIndex": 2,
          "answer": "The street is very busy.",
          "explanationAr": "الإجابة: street. الإنجليزي يسمح بثلاثة سواكن متتالية في البداية (str, spl, spr) وأربعة في النهاية (texts). العربي لا يبدأ بساكنين، فننطقها ببطء: s...treet ثم نسرّع."
        },
        {
          "id": "srp_316_m2",
          "type": "gap",
          "promptEn": "Complete: ____ is short in Riyadh.",
          "promptAr": "أكمل الفراغ: (الربيع قصير في الرياض.)",
          "options": [
            "Spring",
            "Sipring",
            "Espring"
          ],
          "correctIndex": 0,
          "answer": "Spring is short in Riyadh.",
          "explanationAr": "الإجابة: Spring. الإنجليزي يسمح بثلاثة سواكن متتالية في البداية (str, spl, spr) وأربعة في النهاية (texts). العربي لا يبدأ بساكنين، فننطقها ببطء: s...treet ثم نسرّع."
        },
        {
          "id": "srp_316_m3",
          "type": "gap",
          "promptEn": "Complete: I ____ in a school library.",
          "promptAr": "أكمل الفراغ: (أذاكر في مكتبة المدرسة.)",
          "options": [
            "estudy",
            "sitady",
            "study"
          ],
          "correctIndex": 2,
          "answer": "I study in a school library.",
          "explanationAr": "الإجابة: study. الإنجليزي يسمح بثلاثة سواكن متتالية في البداية (str, spl, spr) وأربعة في النهاية (texts). العربي لا يبدأ بساكنين، فننطقها ببطء: s...treet ثم نسرّع."
        },
        {
          "id": "srp_316_m4",
          "type": "gap",
          "promptEn": "Complete: Please print ____ texts.",
          "promptAr": "أكمل الفراغ: (اطبع ثلاث نصوص لو سمحت.)",
          "options": [
            "tree",
            "thiree",
            "three"
          ],
          "correctIndex": 2,
          "answer": "Please print three texts.",
          "explanationAr": "الإجابة: three. الإنجليزي يسمح بثلاثة سواكن متتالية في البداية (str, spl, spr) وأربعة في النهاية (texts). العربي لا يبدأ بساكنين، فننطقها ببطء: s...treet ثم نسرّع."
        }
      ],
      "hard": [
        {
          "id": "srp_316_h1",
          "type": "order",
          "promptEn": "Put the words in order: water / She / on / the / floor. / splashed",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (رشت ماي على الأرض.)",
          "answer": "She splashed water on the floor.",
          "explanationAr": "الترتيب الصحيح: She splashed water on the floor."
        },
        {
          "id": "srp_316_h2",
          "type": "order",
          "promptEn": "Put the words in order: desks / next / The / the / are / window. / to",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (الطاولات جنب النافذة.)",
          "answer": "The desks are next to the window.",
          "explanationAr": "الترتيب الصحيح: The desks are next to the window."
        },
        {
          "id": "srp_316_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: الربيع قصير في الرياض.",
          "answer": "Spring is short in Riyadh.",
          "explanationAr": "ترجمة مقترحة: Spring is short in Riyadh."
        },
        {
          "id": "srp_316_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: اطبع ثلاث نصوص لو سمحت.",
          "answer": "Please print three texts.",
          "explanationAr": "ترجمة مقترحة: Please print three texts."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "«إسبيشال» for special",
        "correct": "special /ˈspɛʃəl/",
        "whyAr": "نفس المشكلة في كلمات كثيرة."
      },
      {
        "incorrect": "«تيكستِس» for texts",
        "correct": "texts /tɛksts/",
        "whyAr": "تعبة بس ممكنة؛ تدرب ببطء."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (نبر الكلمة: أين الضغط؟): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "hoTEL /hoʊˈtɛl/",
          "HOtel"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: hoTEL /hoʊˈtɛl/ — hotel ضغطها في الآخر.",
        "fromLessonId": "srp_315"
      },
      {
        "questionAr": "مراجعة (pen أو pin؟ الفرق بين /ɛ/ و /ɪ/): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Give me the pin to write.",
          "Give me the pen to write."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Give me the pen to write. — pen للكتابة، pin دبوس.",
        "fromLessonId": "srp_313"
      },
      {
        "questionAr": "مراجعة (نهاية s: ثلاثة أصوات /s/ /z/ /ɪz/): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "dogs read as /dɒɡs/ with hard s",
          "dogs /dɔːɡz/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: dogs /dɔːɡz/ — بعد g المجهورة: /z/.",
        "fromLessonId": "srp_311_s"
      },
      {
        "questionAr": "ما معنى \"decided\"؟",
        "questionEn": "What does \"decided\" mean?",
        "options": [
          "قرر",
          "اتصل",
          "زار",
          "شاهد"
        ],
        "correctIndex": 0,
        "explanationAr": "\"decided\" /dɪˈsaɪdɪd/ تعني: قرر. مثال: I decided to go.",
        "fromLessonId": "srp_314"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (أذاكر في مكتبة المدرسة.)",
          "questionEn": "Complete: I ____ in a school library.",
          "options": [
            "estudy",
            "sitady",
            "study"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: study. الإنجليزي يسمح بثلاثة سواكن متتالية في البداية (str, spl, spr) وأربعة في النهاية (texts). العربي لا يبدأ بساكنين، فننطقها ببطء: s...treet ثم نسرّع."
        },
        {
          "questionAr": "أكمل الفراغ: (اطبع ثلاث نصوص لو سمحت.)",
          "questionEn": "Complete: Please print ____ texts.",
          "options": [
            "tree",
            "thiree",
            "three"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: three. الإنجليزي يسمح بثلاثة سواكن متتالية في البداية (str, spl, spr) وأربعة في النهاية (texts). العربي لا يبدأ بساكنين، فننطقها ببطء: s...treet ثم نسرّع."
        },
        {
          "questionAr": "ما معنى \"strong\"؟",
          "questionEn": "What does \"strong\" mean?",
          "options": [
            "رسائل/نصوص",
            "قوي",
            "يرش/رشة",
            "ربيع"
          ],
          "correctIndex": 1,
          "explanationAr": "\"strong\" /strɔːŋ/ تعني: قوي. مثال: strong coffee"
        },
        {
          "questionAr": "ما معنى \"splash\"؟",
          "questionEn": "What does \"splash\" mean?",
          "options": [
            "ربيع",
            "ميدان/مربع",
            "يرش/رشة",
            "رسائل/نصوص"
          ],
          "correctIndex": 2,
          "explanationAr": "\"splash\" /splæʃ/ تعني: يرش/رشة. مثال: a big splash"
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "special /ˈspɛʃəl/",
            "«إسبيشال» for special"
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: special /ˈspɛʃəl/ — نفس المشكلة في كلمات كثيرة."
        }
      ]
    }
  },
  {
    "id": "srp_317",
    "pillarId": "reading",
    "pillarNameAr": "القراءة التعبيرية والنطق الصوتي",
    "pillarNameEn": "Expressive Reading & Pronunciation Lab",
    "pillarIcon": "📖",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "الصوت الضعيف schwa /ə/",
    "titleEn": "The Schwa /ə/: English's Most Common Sound",
    "descAr": "أكثر صوت في الإنجليزي هو «أ» الخفيفة في المقاطع غير المنبورة: banana = bə-NA-nə.",
    "descEn": "The most common English sound is the weak 'uh' in unstressed syllables: bə-NA-nə.",
    "speakingGoalAr": "اقرأ كلمات وجملاً مع إضعاف المقاطع غير المنبورة.",
    "speakingGoalEn": "Read words and sentences reducing unstressed syllables to schwa.",
    "keyPattern": {
      "ruleAr": "أي حرف متحرك (a, e, i, o, u) ممكن يصير /ə/ إذا ما كان منبوراً: about /əˈbaʊt/، doctor /ˈdɑːktər/، today /təˈdeɪ/. هذا يعطي الإيقاع الإنجليزي.",
      "ruleEn": "Any unstressed vowel can become /ə/: about, doctor, today. This creates English rhythm.",
      "formula": "stressed syllable = full vowel | unstressed = /ə/"
    },
    "practicalExamples": [
      {
        "en": "I'll be back in a minute.",
        "ar": "برجع بعد دقيقة."
      },
      {
        "en": "The doctor is at the hospital.",
        "ar": "الدكتور في المستشفى."
      },
      {
        "en": "Today is Saturday.",
        "ar": "اليوم السبت."
      },
      {
        "en": "Let's talk about the problem.",
        "ar": "خلنا نتكلم عن المشكلة."
      },
      {
        "en": "A banana and a lemon, please.",
        "ar": "موزة وليمونة لو سمحت."
      },
      {
        "en": "My mother made a famous dessert.",
        "ar": "أمي سوت حلى مشهور."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "ba-NA-NA (all full vowels)",
        "correct": "bə-NA-nə /bəˈnænə/",
        "whyAr": "أضعف المقطعين الأول والأخير."
      },
      {
        "incorrect": "doc-TOOR",
        "correct": "DOC-tər /ˈdɑːktər/",
        "whyAr": "or في آخر doctor ضعيفة."
      },
      {
        "incorrect": "too-DAY",
        "correct": "tə-DAY /təˈdeɪ/",
        "whyAr": "to تضعف."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اقرأ نص الدكتور بإيقاع طبيعي.",
      "promptEn": "Read the doctor text with natural rhythm.",
      "saraQuestionAr": "اقرأ: Today I went to the doctor.",
      "saraQuestionEn": "Read: Today I went to the doctor.",
      "recommendedResponseEn": "Today I went to the doctor. I had a problem with my stomach."
    },
    "quiz": [
      {
        "questionAr": "أين schwa في about؟",
        "questionEn": "Where is the schwa in 'about'?",
        "options": [
          "a",
          "ou",
          "t"
        ],
        "correctIndex": 0,
        "explanationAr": "a الأولى /ə/."
      },
      {
        "questionAr": "كم مقطع منبور في banana؟",
        "questionEn": "Stressed syllables in 'banana'?",
        "options": [
          "one",
          "two",
          "three"
        ],
        "correctIndex": 0,
        "explanationAr": "واحد: NA."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "ba-NA-NA (all full vowels)",
          "bə-NA-nə /bəˈnænə/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: bə-NA-nə /bəˈnænə/ — أضعف المقطعين الأول والأخير."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "doc-TOOR",
          "DOC-tər /ˈdɑːktər/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: DOC-tər /ˈdɑːktər/ — or في آخر doctor ضعيفة."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "too-DAY",
          "tə-DAY /təˈdeɪ/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: tə-DAY /təˈdeɪ/ — to تضعف."
      }
    ],
    "whiteboardNotes": {
      "title": "The Schwa /ə/: English's Most Common Sound",
      "pointsAr": [
        "يتعرف على schwa في الكلمات.",
        "يضعف المقاطع غير المنبورة.",
        "يقرأ بإيقاع أطبع.",
        "أي حرف متحرك (a, e, i, o, u) ممكن يصير /ə/ إذا ما كان منبوراً: about /əˈbaʊt/، doctor /ˈdɑːktər/، today /təˈdeɪ/. هذا يعطي الإيقاع الإنجليزي."
      ],
      "pointsEn": [
        "Recognise schwa in words.",
        "Reduce unstressed syllables.",
        "Read with more natural rhythm.",
        "Any unstressed vowel can become /ə/: about, doctor, today. This creates English rhythm."
      ],
      "chalkHighlight": "stressed syllable = full vowel | unstressed = /ə/"
    },
    "unit": 4,
    "cefr": "A2",
    "objectivesAr": [
      "يتعرف على schwa في الكلمات.",
      "يضعف المقاطع غير المنبورة.",
      "يقرأ بإيقاع أطبع."
    ],
    "objectivesEn": [
      "Recognise schwa in words.",
      "Reduce unstressed syllables.",
      "Read with more natural rhythm."
    ],
    "vocabulary": [
      {
        "word": "about",
        "ipa": "/əˈbaʊt/",
        "ar": "عن/حوالي",
        "exampleEn": "about ten",
        "exampleAr": "حوالي عشرة"
      },
      {
        "word": "banana",
        "ipa": "/bəˈnænə/",
        "ar": "موز",
        "exampleEn": "a banana",
        "exampleAr": "موزة"
      },
      {
        "word": "doctor",
        "ipa": "/ˈdɑːktər/",
        "ar": "دكتور",
        "exampleEn": "see a doctor",
        "exampleAr": "روح للدكتور"
      },
      {
        "word": "today",
        "ipa": "/təˈdeɪ/",
        "ar": "اليوم",
        "exampleEn": "today's lesson",
        "exampleAr": "درس اليوم"
      },
      {
        "word": "lemon",
        "ipa": "/ˈlɛmən/",
        "ar": "ليمون",
        "exampleEn": "lemon juice",
        "exampleAr": "عصير ليمون"
      },
      {
        "word": "famous",
        "ipa": "/ˈfeɪməs/",
        "ar": "مشهور",
        "exampleEn": "a famous place",
        "exampleAr": "مكان مشهور"
      },
      {
        "word": "problem",
        "ipa": "/ˈprɑːbləm/",
        "ar": "مشكلة",
        "exampleEn": "no problem",
        "exampleAr": "ولا يهمك"
      },
      {
        "word": "Saturday",
        "ipa": "/ˈsætərdeɪ/",
        "ar": "السبت",
        "exampleEn": "on Saturday",
        "exampleAr": "يوم السبت"
      },
      {
        "word": "support",
        "ipa": "/səˈpɔːrt/",
        "ar": "يدعم",
        "exampleEn": "I support you.",
        "exampleAr": "أدعمك."
      },
      {
        "word": "camera",
        "ipa": "/ˈkæmrə/",
        "ar": "كاميرا",
        "exampleEn": "a camera",
        "exampleAr": "كاميرا"
      }
    ],
    "grammarFocus": {
      "ruleAr": "أي حرف متحرك (a, e, i, o, u) ممكن يصير /ə/ إذا ما كان منبوراً: about /əˈbaʊt/، doctor /ˈdɑːktər/، today /təˈdeɪ/. هذا يعطي الإيقاع الإنجليزي.",
      "ruleEn": "Any unstressed vowel can become /ə/: about, doctor, today. This creates English rhythm.",
      "formula": "stressed syllable = full vowel | unstressed = /ə/",
      "examples": [
        {
          "en": "I'll be back in a minute.",
          "ar": "برجع بعد دقيقة."
        },
        {
          "en": "The doctor is at the hospital.",
          "ar": "الدكتور في المستشفى."
        },
        {
          "en": "Today is Saturday.",
          "ar": "اليوم السبت."
        },
        {
          "en": "Let's talk about the problem.",
          "ar": "خلنا نتكلم عن المشكلة."
        },
        {
          "en": "A banana and a lemon, please.",
          "ar": "موزة وليمونة لو سمحت."
        },
        {
          "en": "My mother made a famous dessert.",
          "ar": "أمي سوت حلى مشهور."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Text",
        "en": "Today I went to the doctor.",
        "ar": "اليوم رحت للدكتور."
      },
      {
        "speaker": "Text",
        "en": "I had a problem with my stomach.",
        "ar": "كان عندي مشكلة في بطني."
      },
      {
        "speaker": "Text",
        "en": "The doctor said, \"Eat a banana and drink some lemon water.\"",
        "ar": "الدكتور قال: «كل موز واشرب ماي بليمون.»"
      },
      {
        "speaker": "Text",
        "en": "He's a famous doctor in our city.",
        "ar": "دكتور مشهور في مدينتنا."
      },
      {
        "speaker": "Text",
        "en": "I waited about an hour.",
        "ar": "انتظرت حوالي ساعة."
      },
      {
        "speaker": "Text",
        "en": "But now I feel better.",
        "ar": "بس الحين أحسن."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Text: Today I went to the doctor.\nText: I had a problem with my stomach.\nText: The doctor said, \"Eat a banana and drink some lemon water.\"\nText: He's a famous doctor in our city.\nText: I waited about an hour.\nText: But now I feel better.",
      "questions": [
        {
          "questionAr": "وين راح؟",
          "questionEn": "Where did the writer go?",
          "options": [
            "the doctor",
            "the market",
            "school"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: the doctor"
        },
        {
          "questionAr": "وش اقترح الدكتور؟",
          "questionEn": "What did the doctor suggest?",
          "options": [
            "banana and lemon water",
            "rice",
            "coffee"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: banana and lemon water"
        },
        {
          "questionAr": "كم انتظر؟",
          "questionEn": "How long did he wait?",
          "options": [
            "ten minutes",
            "about an hour",
            "two hours"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: about an hour"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Find the schwa: ə",
      "items": [
        "a-BOUT /əˈbaʊt/",
        "DOC-tor /ˈdɑːktər/",
        "ba-NA-na /bəˈnænə/",
        "Sat-ur-day /ˈsætərdeɪ/"
      ],
      "tipAr": "schwa صوت كسول قصير «أ»، فمك مرتخي تماماً."
    },
    "exercises": {
      "easy": [
        {
          "id": "srp_317_e1",
          "type": "meaning",
          "promptEn": "What does \"about\" mean?",
          "promptAr": "ما معنى \"about\"؟",
          "options": [
            "يدعم",
            "دكتور",
            "السبت",
            "عن/حوالي"
          ],
          "correctIndex": 3,
          "answer": "عن/حوالي",
          "explanationAr": "\"about\" /əˈbaʊt/ تعني: عن/حوالي. مثال: about ten"
        },
        {
          "id": "srp_317_e2",
          "type": "meaning",
          "promptEn": "What does \"banana\" mean?",
          "promptAr": "ما معنى \"banana\"؟",
          "options": [
            "يدعم",
            "عن/حوالي",
            "اليوم",
            "موز"
          ],
          "correctIndex": 3,
          "answer": "موز",
          "explanationAr": "\"banana\" /bəˈnænə/ تعني: موز. مثال: a banana"
        },
        {
          "id": "srp_317_e3",
          "type": "meaning",
          "promptEn": "What does \"doctor\" mean?",
          "promptAr": "ما معنى \"doctor\"؟",
          "options": [
            "دكتور",
            "اليوم",
            "عن/حوالي",
            "ليمون"
          ],
          "correctIndex": 0,
          "answer": "دكتور",
          "explanationAr": "\"doctor\" /ˈdɑːktər/ تعني: دكتور. مثال: see a doctor"
        },
        {
          "id": "srp_317_e4",
          "type": "meaning",
          "promptEn": "What does \"today\" mean?",
          "promptAr": "ما معنى \"today\"؟",
          "options": [
            "موز",
            "مشهور",
            "اليوم",
            "كاميرا"
          ],
          "correctIndex": 2,
          "answer": "اليوم",
          "explanationAr": "\"today\" /təˈdeɪ/ تعني: اليوم. مثال: today's lesson"
        }
      ],
      "medium": [
        {
          "id": "srp_317_m1",
          "type": "gap",
          "promptEn": "Complete: I'll be back in a ____.",
          "promptAr": "أكمل الفراغ: (برجع بعد دقيقة.)",
          "options": [
            "minnit",
            "minute",
            "minoot"
          ],
          "correctIndex": 1,
          "answer": "I'll be back in a minute.",
          "explanationAr": "الإجابة: minute. أي حرف متحرك (a, e, i, o, u) ممكن يصير /ə/ إذا ما كان منبوراً: about /əˈbaʊt/، doctor /ˈdɑːktər/، today /təˈdeɪ/. هذا يعطي الإيقاع الإنجليزي."
        },
        {
          "id": "srp_317_m2",
          "type": "gap",
          "promptEn": "Complete: The ____ is at the hospital.",
          "promptAr": "أكمل الفراغ: (الدكتور في المستشفى.)",
          "options": [
            "dokter",
            "doctor",
            "doktoor"
          ],
          "correctIndex": 1,
          "answer": "The doctor is at the hospital.",
          "explanationAr": "الإجابة: doctor. أي حرف متحرك (a, e, i, o, u) ممكن يصير /ə/ إذا ما كان منبوراً: about /əˈbaʊt/، doctor /ˈdɑːktər/، today /təˈdeɪ/. هذا يعطي الإيقاع الإنجليزي."
        },
        {
          "id": "srp_317_m3",
          "type": "gap",
          "promptEn": "Complete: ____ is Saturday.",
          "promptAr": "أكمل الفراغ: (اليوم السبت.)",
          "options": [
            "Today",
            "Tooday",
            "Toeday"
          ],
          "correctIndex": 0,
          "answer": "Today is Saturday.",
          "explanationAr": "الإجابة: Today. أي حرف متحرك (a, e, i, o, u) ممكن يصير /ə/ إذا ما كان منبوراً: about /əˈbaʊt/، doctor /ˈdɑːktər/، today /təˈdeɪ/. هذا يعطي الإيقاع الإنجليزي."
        },
        {
          "id": "srp_317_m4",
          "type": "gap",
          "promptEn": "Complete: Let's talk ____ the problem.",
          "promptAr": "أكمل الفراغ: (خلنا نتكلم عن المشكلة.)",
          "options": [
            "abowt",
            "ebout",
            "about"
          ],
          "correctIndex": 2,
          "answer": "Let's talk about the problem.",
          "explanationAr": "الإجابة: about. أي حرف متحرك (a, e, i, o, u) ممكن يصير /ə/ إذا ما كان منبوراً: about /əˈbaʊt/، doctor /ˈdɑːktər/، today /təˈdeɪ/. هذا يعطي الإيقاع الإنجليزي."
        }
      ],
      "hard": [
        {
          "id": "srp_317_h1",
          "type": "order",
          "promptEn": "Put the words in order: a / and / A / please. / banana / lemon,",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (موزة وليمونة لو سمحت.)",
          "answer": "A banana and a lemon, please.",
          "explanationAr": "الترتيب الصحيح: A banana and a lemon, please."
        },
        {
          "id": "srp_317_h2",
          "type": "order",
          "promptEn": "Put the words in order: famous / a / made / My / mother / dessert.",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (أمي سوت حلى مشهور.)",
          "answer": "My mother made a famous dessert.",
          "explanationAr": "الترتيب الصحيح: My mother made a famous dessert."
        },
        {
          "id": "srp_317_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: الدكتور في المستشفى.",
          "answer": "The doctor is at the hospital.",
          "explanationAr": "ترجمة مقترحة: The doctor is at the hospital."
        },
        {
          "id": "srp_317_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: خلنا نتكلم عن المشكلة.",
          "answer": "Let's talk about the problem.",
          "explanationAr": "ترجمة مقترحة: Let's talk about the problem."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Reading every vowel fully like Arabic",
        "correct": "Weaken unstressed vowels to /ə/",
        "whyAr": "العربي واضح المقاطع؛ الإنجليزي يخفيها."
      },
      {
        "incorrect": "«فيموس» for famous",
        "correct": "famous /ˈfeɪməs/",
        "whyAr": "ous = «أس» خفيفة."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (تجمعات الحروف الساكنة: street و spring): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "sipring",
          "spring /sprɪŋ/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: spring /sprɪŋ/ — لا متحرك بين s و p.",
        "fromLessonId": "srp_316"
      },
      {
        "questionAr": "مراجعة (نطق ed في الماضي: /t/ /d/ /ɪd/): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "walked /wɔːkt/ (1 syllable)",
          "walked as «ووكِد» (2 syllables)"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: walked /wɔːkt/ (1 syllable) — ed بعد k = /t/ بدون مقطع.",
        "fromLessonId": "srp_314"
      },
      {
        "questionAr": "مراجعة (كلمات البصر وقراءة رسالة قصيرة): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "said read as «سيد» /seɪd/",
          "said /sɛd/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: said /sɛd/ — said شاذة: «سِد».",
        "fromLessonId": "srp_312_s"
      },
      {
        "questionAr": "ما معنى \"photographer\"؟",
        "questionEn": "What does \"photographer\" mean?",
        "options": [
          "موز",
          "مصور",
          "صورة",
          "هدية"
        ],
        "correctIndex": 1,
        "explanationAr": "\"photographer\" /fəˈtɑːɡrəfər/ تعني: مصور. مثال: a wedding photographer",
        "fromLessonId": "srp_315"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (اليوم السبت.)",
          "questionEn": "Complete: ____ is Saturday.",
          "options": [
            "Today",
            "Tooday",
            "Toeday"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: Today. أي حرف متحرك (a, e, i, o, u) ممكن يصير /ə/ إذا ما كان منبوراً: about /əˈbaʊt/، doctor /ˈdɑːktər/، today /təˈdeɪ/. هذا يعطي الإيقاع الإنجليزي."
        },
        {
          "questionAr": "أكمل الفراغ: (خلنا نتكلم عن المشكلة.)",
          "questionEn": "Complete: Let's talk ____ the problem.",
          "options": [
            "abowt",
            "ebout",
            "about"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: about. أي حرف متحرك (a, e, i, o, u) ممكن يصير /ə/ إذا ما كان منبوراً: about /əˈbaʊt/، doctor /ˈdɑːktər/، today /təˈdeɪ/. هذا يعطي الإيقاع الإنجليزي."
        },
        {
          "questionAr": "ما معنى \"lemon\"؟",
          "questionEn": "What does \"lemon\" mean?",
          "options": [
            "مشكلة",
            "يدعم",
            "كاميرا",
            "ليمون"
          ],
          "correctIndex": 3,
          "explanationAr": "\"lemon\" /ˈlɛmən/ تعني: ليمون. مثال: lemon juice"
        },
        {
          "questionAr": "ما معنى \"famous\"؟",
          "questionEn": "What does \"famous\" mean?",
          "options": [
            "ليمون",
            "دكتور",
            "السبت",
            "مشهور"
          ],
          "correctIndex": 3,
          "explanationAr": "\"famous\" /ˈfeɪməs/ تعني: مشهور. مثال: a famous place"
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Reading every vowel fully like Arabic",
            "Weaken unstressed vowels to /ə/"
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: Weaken unstressed vowels to /ə/ — العربي واضح المقاطع؛ الإنجليزي يخفيها."
        }
      ]
    }
  },
  {
    "id": "srp_318",
    "pillarId": "reading",
    "pillarNameAr": "القراءة التعبيرية والنطق الصوتي",
    "pillarNameEn": "Expressive Reading & Pronunciation Lab",
    "pillarIcon": "📖",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "القراءة المعبرة: علامات الترقيم والوقفات",
    "titleEn": "Reading with Expression: Punctuation and Pauses",
    "descAr": "علامات الترقيم تقول لك متى توقف وكيف تغير صوتك: . , ? ! \" \"",
    "descEn": "Punctuation tells you when to pause and how to change your voice.",
    "speakingGoalAr": "اقرأ قصة قصيرة بحوار مع تغيير الصوت.",
    "speakingGoalEn": "Read a short story with dialogue, changing your voice.",
    "keyPattern": {
      "ruleAr": "الفاصلة (,) وقفة قصيرة. النقطة (.) وقفة كاملة وصوت نازل. علامة الاستفهام: صوت صاعد لنعم/لا. التعجب (!): حماس. علامات التنصيص: غيّر صوتك للشخصية.",
      "ruleEn": "Comma = short pause; full stop = full pause, falling tone; ? = rising for yes/no; ! = excitement; quotes = character voice.",
      "formula": ", = short pause | . = stop ↘ | ? = ↗ | ! = energy | \" \" = character voice"
    },
    "practicalExamples": [
      {
        "en": "Wait, where are you going?",
        "ar": "انتظر، وين رايح؟"
      },
      {
        "en": "\"Help!\" shouted the boy.",
        "ar": "«الحقوا!» صرخ الولد."
      },
      {
        "en": "Are you ready? Let's go!",
        "ar": "جاهز؟ يلا!"
      },
      {
        "en": "First, open the box. Then, read the card.",
        "ar": "أول، افتح الصندوق. بعدين، اقرأ الكرت."
      },
      {
        "en": "\"I'm so happy!\" she said with a smile.",
        "ar": "«أنا مبسوطة مرة!» قالت بابتسامة."
      },
      {
        "en": "Slowly, carefully, he opened the door.",
        "ar": "ببطء، وبحذر، فتح الباب."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Reading without pauses",
        "correct": "Pause at every comma and full stop",
        "whyAr": "القراءة المتواصلة تضيع المعنى."
      },
      {
        "incorrect": "Flat voice for 'Help!'",
        "correct": "Strong, loud voice for 'Help!'",
        "whyAr": "التعجب يحتاج طاقة."
      },
      {
        "incorrect": "Falling tone for 'Are you ready?'",
        "correct": "Rising tone: Are you ready? ↗",
        "whyAr": "سؤال نعم/لا صاعد."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اقرأ قصة الثعلب لسارة بتعبير كامل.",
      "promptEn": "Read the fox story to Sara with full expression.",
      "saraQuestionAr": "اقرأ القصة كأنك تحكيها لأطفال!",
      "saraQuestionEn": "Read it as if telling it to children!",
      "recommendedResponseEn": "It was a dark night in the desert. Suddenly, Omar heard a noise. \"Who's there?\" he whispered."
    },
    "quiz": [
      {
        "questionAr": "الفاصلة تعني:",
        "questionEn": "A comma means:",
        "options": [
          "full stop",
          "short pause",
          "question"
        ],
        "correctIndex": 1,
        "explanationAr": "وقفة قصيرة."
      },
      {
        "questionAr": "\"Who's there?\" he whispered. نقرأها:",
        "questionEn": "Read it:",
        "options": [
          "loudly",
          "softly",
          "angrily"
        ],
        "correctIndex": 1,
        "explanationAr": "whispered = بهمس."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Reading without pauses",
          "Pause at every comma and full stop"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Pause at every comma and full stop — القراءة المتواصلة تضيع المعنى."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Flat voice for 'Help!'",
          "Strong, loud voice for 'Help!'"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Strong, loud voice for 'Help!' — التعجب يحتاج طاقة."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Rising tone: Are you ready? ↗",
          "Falling tone for 'Are you ready?'"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Rising tone: Are you ready? ↗ — سؤال نعم/لا صاعد."
      }
    ],
    "whiteboardNotes": {
      "title": "Reading with Expression: Punctuation and Pauses",
      "pointsAr": [
        "يتوقف عند علامات الترقيم.",
        "يغير نبرته للأسئلة والتعجب.",
        "يقرأ الحوار بأصوات مختلفة.",
        "الفاصلة (,) وقفة قصيرة. النقطة (.) وقفة كاملة وصوت نازل. علامة الاستفهام: صوت صاعد لنعم/لا. التعجب (!): حماس. علامات التنصيص: غيّر صوتك للشخصية."
      ],
      "pointsEn": [
        "Pause at punctuation.",
        "Change tone for questions and exclamations.",
        "Voice different characters.",
        "Comma = short pause; full stop = full pause, falling tone; ? = rising for yes/no; ! = excitement; quotes = character voice."
      ],
      "chalkHighlight": ", = short pause | . = stop ↘ | ? = ↗ | ! = energy | \" \" = character voice"
    },
    "unit": 4,
    "cefr": "A2",
    "objectivesAr": [
      "يتوقف عند علامات الترقيم.",
      "يغير نبرته للأسئلة والتعجب.",
      "يقرأ الحوار بأصوات مختلفة."
    ],
    "objectivesEn": [
      "Pause at punctuation.",
      "Change tone for questions and exclamations.",
      "Voice different characters."
    ],
    "vocabulary": [
      {
        "word": "shout",
        "ipa": "/ʃaʊt/",
        "ar": "يصرخ",
        "exampleEn": "Don't shout!",
        "exampleAr": "لا تصارخ!"
      },
      {
        "word": "whisper",
        "ipa": "/ˈwɪspər/",
        "ar": "يهمس",
        "exampleEn": "She whispered.",
        "exampleAr": "همست."
      },
      {
        "word": "smile",
        "ipa": "/smaɪl/",
        "ar": "ابتسامة/يبتسم",
        "exampleEn": "with a smile",
        "exampleAr": "بابتسامة"
      },
      {
        "word": "carefully",
        "ipa": "/ˈkɛrfəli/",
        "ar": "بحذر",
        "exampleEn": "Drive carefully.",
        "exampleAr": "سق بحذر."
      },
      {
        "word": "slowly",
        "ipa": "/ˈsloʊli/",
        "ar": "ببطء",
        "exampleEn": "Walk slowly.",
        "exampleAr": "امشِ بشويش."
      },
      {
        "word": "suddenly",
        "ipa": "/ˈsʌdənli/",
        "ar": "فجأة",
        "exampleEn": "Suddenly, it rained.",
        "exampleAr": "فجأة مطرت."
      },
      {
        "word": "surprise",
        "ipa": "/sərˈpraɪz/",
        "ar": "مفاجأة",
        "exampleEn": "What a surprise!",
        "exampleAr": "يا لها من مفاجأة!"
      },
      {
        "word": "pause",
        "ipa": "/pɔːz/",
        "ar": "يتوقف/وقفة",
        "exampleEn": "Pause here.",
        "exampleAr": "وقّف هنا."
      },
      {
        "word": "voice",
        "ipa": "/vɔɪs/",
        "ar": "صوت",
        "exampleEn": "a soft voice",
        "exampleAr": "صوت ناعم"
      },
      {
        "word": "scared",
        "ipa": "/skɛrd/",
        "ar": "خايف",
        "exampleEn": "He was scared.",
        "exampleAr": "كان خايف."
      }
    ],
    "grammarFocus": {
      "ruleAr": "الفاصلة (,) وقفة قصيرة. النقطة (.) وقفة كاملة وصوت نازل. علامة الاستفهام: صوت صاعد لنعم/لا. التعجب (!): حماس. علامات التنصيص: غيّر صوتك للشخصية.",
      "ruleEn": "Comma = short pause; full stop = full pause, falling tone; ? = rising for yes/no; ! = excitement; quotes = character voice.",
      "formula": ", = short pause | . = stop ↘ | ? = ↗ | ! = energy | \" \" = character voice",
      "examples": [
        {
          "en": "Wait, where are you going?",
          "ar": "انتظر، وين رايح؟"
        },
        {
          "en": "\"Help!\" shouted the boy.",
          "ar": "«الحقوا!» صرخ الولد."
        },
        {
          "en": "Are you ready? Let's go!",
          "ar": "جاهز؟ يلا!"
        },
        {
          "en": "First, open the box. Then, read the card.",
          "ar": "أول، افتح الصندوق. بعدين، اقرأ الكرت."
        },
        {
          "en": "\"I'm so happy!\" she said with a smile.",
          "ar": "«أنا مبسوطة مرة!» قالت بابتسامة."
        },
        {
          "en": "Slowly, carefully, he opened the door.",
          "ar": "ببطء، وبحذر، فتح الباب."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Text",
        "en": "It was a dark night in the desert.",
        "ar": "كانت ليلة مظلمة في البر."
      },
      {
        "speaker": "Text",
        "en": "Suddenly, Omar heard a noise.",
        "ar": "فجأة، عمر سمع صوت."
      },
      {
        "speaker": "Text",
        "en": "\"Who's there?\" he whispered.",
        "ar": "«مين هناك؟» همس."
      },
      {
        "speaker": "Text",
        "en": "Nobody answered. He was scared.",
        "ar": "ما أحد رد. كان خايف."
      },
      {
        "speaker": "Text",
        "en": "Then, a small fox jumped out of the bushes!",
        "ar": "بعدين، طلع ثعلب صغير من الشجيرات!"
      },
      {
        "speaker": "Text",
        "en": "\"Oh, it's just you!\" Omar laughed.",
        "ar": "«آه، طلعت أنت!» ضحك عمر."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Text: It was a dark night in the desert.\nText: Suddenly, Omar heard a noise.\nText: \"Who's there?\" he whispered.\nText: Nobody answered. He was scared.\nText: Then, a small fox jumped out of the bushes!\nText: \"Oh, it's just you!\" Omar laughed.",
      "questions": [
        {
          "questionAr": "وين كان عمر؟",
          "questionEn": "Where was Omar?",
          "options": [
            "at home",
            "in the desert",
            "at school"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: in the desert"
        },
        {
          "questionAr": "كيف سأل؟",
          "questionEn": "How did he ask 'Who's there?'",
          "options": [
            "he shouted",
            "he whispered",
            "he sang"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: he whispered"
        },
        {
          "questionAr": "وش سوى الصوت؟",
          "questionEn": "What made the noise?",
          "options": [
            "a cat",
            "a fox",
            "a camel"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: a fox"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Voice changes: whisper, normal, excited",
      "items": [
        "\"Who's there?\" (whisper)",
        "Nobody answered. (calm ↘)",
        "\"Oh, it's just you!\" (relief, laugh)"
      ],
      "tipAr": "سجّل نفسك وأنت تقرأ القصة وقارن بقراءة سارة."
    },
    "exercises": {
      "easy": [
        {
          "id": "srp_318_e1",
          "type": "meaning",
          "promptEn": "What does \"shout\" mean?",
          "promptAr": "ما معنى \"shout\"؟",
          "options": [
            "يتوقف/وقفة",
            "يهمس",
            "يصرخ",
            "ببطء"
          ],
          "correctIndex": 2,
          "answer": "يصرخ",
          "explanationAr": "\"shout\" /ʃaʊt/ تعني: يصرخ. مثال: Don't shout!"
        },
        {
          "id": "srp_318_e2",
          "type": "meaning",
          "promptEn": "What does \"whisper\" mean?",
          "promptAr": "ما معنى \"whisper\"؟",
          "options": [
            "يهمس",
            "صوت",
            "مفاجأة",
            "بحذر"
          ],
          "correctIndex": 0,
          "answer": "يهمس",
          "explanationAr": "\"whisper\" /ˈwɪspər/ تعني: يهمس. مثال: She whispered."
        },
        {
          "id": "srp_318_e3",
          "type": "meaning",
          "promptEn": "What does \"smile\" mean?",
          "promptAr": "ما معنى \"smile\"؟",
          "options": [
            "يهمس",
            "ابتسامة/يبتسم",
            "صوت",
            "مفاجأة"
          ],
          "correctIndex": 1,
          "answer": "ابتسامة/يبتسم",
          "explanationAr": "\"smile\" /smaɪl/ تعني: ابتسامة/يبتسم. مثال: with a smile"
        },
        {
          "id": "srp_318_e4",
          "type": "meaning",
          "promptEn": "What does \"carefully\" mean?",
          "promptAr": "ما معنى \"carefully\"؟",
          "options": [
            "خايف",
            "بحذر",
            "فجأة",
            "يهمس"
          ],
          "correctIndex": 1,
          "answer": "بحذر",
          "explanationAr": "\"carefully\" /ˈkɛrfəli/ تعني: بحذر. مثال: Drive carefully."
        }
      ],
      "medium": [
        {
          "id": "srp_318_m1",
          "type": "gap",
          "promptEn": "Complete: ____ where are you going?",
          "promptAr": "أكمل الفراغ: (انتظر، وين رايح؟)",
          "options": [
            "Wait,",
            "Wait!",
            "Wait."
          ],
          "correctIndex": 0,
          "answer": "Wait, where are you going?",
          "explanationAr": "الإجابة: Wait,. الفاصلة (,) وقفة قصيرة. النقطة (.) وقفة كاملة وصوت نازل. علامة الاستفهام: صوت صاعد لنعم/لا. التعجب (!): حماس. علامات التنصيص: غيّر صوتك للشخصية."
        },
        {
          "id": "srp_318_m2",
          "type": "gap",
          "promptEn": "Complete: \"Help!\" ____ the boy.",
          "promptAr": "أكمل الفراغ: («الحقوا!» صرخ الولد.)",
          "options": [
            "said quietly",
            "whispered",
            "shouted"
          ],
          "correctIndex": 2,
          "answer": "\"Help!\" shouted the boy.",
          "explanationAr": "الإجابة: shouted. الفاصلة (,) وقفة قصيرة. النقطة (.) وقفة كاملة وصوت نازل. علامة الاستفهام: صوت صاعد لنعم/لا. التعجب (!): حماس. علامات التنصيص: غيّر صوتك للشخصية."
        },
        {
          "id": "srp_318_m3",
          "type": "gap",
          "promptEn": "Complete: Are you ____ Let's go!",
          "promptAr": "أكمل الفراغ: (جاهز؟ يلا!)",
          "options": [
            "ready?",
            "ready,",
            "ready."
          ],
          "correctIndex": 0,
          "answer": "Are you ready? Let's go!",
          "explanationAr": "الإجابة: ready?. الفاصلة (,) وقفة قصيرة. النقطة (.) وقفة كاملة وصوت نازل. علامة الاستفهام: صوت صاعد لنعم/لا. التعجب (!): حماس. علامات التنصيص: غيّر صوتك للشخصية."
        },
        {
          "id": "srp_318_m4",
          "type": "gap",
          "promptEn": "Complete: ____ open the box. Then, read the card.",
          "promptAr": "أكمل الفراغ: (أول، افتح الصندوق. بعدين، اقرأ الكرت.)",
          "options": [
            "First.",
            "First,",
            "First!"
          ],
          "correctIndex": 1,
          "answer": "First, open the box. Then, read the card.",
          "explanationAr": "الإجابة: First,. الفاصلة (,) وقفة قصيرة. النقطة (.) وقفة كاملة وصوت نازل. علامة الاستفهام: صوت صاعد لنعم/لا. التعجب (!): حماس. علامات التنصيص: غيّر صوتك للشخصية."
        }
      ],
      "hard": [
        {
          "id": "srp_318_h1",
          "type": "order",
          "promptEn": "Put the words in order: so / a / smile. / \"I'm / she / with / happy!\" / said",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة («أنا مبسوطة مرة!» قالت بابتسامة.)",
          "answer": "\"I'm so happy!\" she said with a smile.",
          "explanationAr": "الترتيب الصحيح: \"I'm so happy!\" she said with a smile."
        },
        {
          "id": "srp_318_h2",
          "type": "order",
          "promptEn": "Put the words in order: he / carefully, / door. / opened / Slowly, / the",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (ببطء، وبحذر، فتح الباب.)",
          "answer": "Slowly, carefully, he opened the door.",
          "explanationAr": "الترتيب الصحيح: Slowly, carefully, he opened the door."
        },
        {
          "id": "srp_318_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: «الحقوا!» صرخ الولد.",
          "answer": "\"Help!\" shouted the boy.",
          "explanationAr": "ترجمة مقترحة: \"Help!\" shouted the boy."
        },
        {
          "id": "srp_318_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أول، افتح الصندوق. بعدين، اقرأ الكرت.",
          "answer": "First, open the box. Then, read the card.",
          "explanationAr": "ترجمة مقترحة: First, open the box. Then, read the card."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Reading quotes in the narrator's voice",
        "correct": "Change voice for each character",
        "whyAr": "القصص تحيا بتغيير الصوت."
      },
      {
        "incorrect": "Ignoring commas in lists",
        "correct": "Pause briefly after each item",
        "whyAr": "a pen, a book, and a bag."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (الصوت الضعيف schwa /ə/): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "doc-TOOR",
          "DOC-tər /ˈdɑːktər/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: DOC-tər /ˈdɑːktər/ — or في آخر doctor ضعيفة.",
        "fromLessonId": "srp_317"
      },
      {
        "questionAr": "مراجعة (نبر الكلمة: أين الضغط؟): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "comPUter /kəmˈpjuːtər/",
          "COMputer"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: comPUter /kəmˈpjuːtər/ — computer ضغطها على المقطع الثاني PU.",
        "fromLessonId": "srp_315"
      },
      {
        "questionAr": "مراجعة (الحروف الصامتة: knife, write, lamb): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "knife /naɪf/",
          "k-nife with a /k/"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: knife /naɪf/ — k قبل n صامتة.",
        "fromLessonId": "srp_302"
      },
      {
        "questionAr": "ما معنى \"square\"؟",
        "questionEn": "What does \"square\" mean?",
        "options": [
          "ميدان/مربع",
          "مدرسة",
          "ربيع",
          "يرش/رشة"
        ],
        "correctIndex": 0,
        "explanationAr": "\"square\" /skwɛr/ تعني: ميدان/مربع. مثال: the main square",
        "fromLessonId": "srp_316"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (جاهز؟ يلا!)",
          "questionEn": "Complete: Are you ____ Let's go!",
          "options": [
            "ready?",
            "ready,",
            "ready."
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: ready?. الفاصلة (,) وقفة قصيرة. النقطة (.) وقفة كاملة وصوت نازل. علامة الاستفهام: صوت صاعد لنعم/لا. التعجب (!): حماس. علامات التنصيص: غيّر صوتك للشخصية."
        },
        {
          "questionAr": "أكمل الفراغ: (أول، افتح الصندوق. بعدين، اقرأ الكرت.)",
          "questionEn": "Complete: ____ open the box. Then, read the card.",
          "options": [
            "First.",
            "First,",
            "First!"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: First,. الفاصلة (,) وقفة قصيرة. النقطة (.) وقفة كاملة وصوت نازل. علامة الاستفهام: صوت صاعد لنعم/لا. التعجب (!): حماس. علامات التنصيص: غيّر صوتك للشخصية."
        },
        {
          "questionAr": "ما معنى \"slowly\"؟",
          "questionEn": "What does \"slowly\" mean?",
          "options": [
            "خايف",
            "ابتسامة/يبتسم",
            "مفاجأة",
            "ببطء"
          ],
          "correctIndex": 3,
          "explanationAr": "\"slowly\" /ˈsloʊli/ تعني: ببطء. مثال: Walk slowly."
        },
        {
          "questionAr": "ما معنى \"suddenly\"؟",
          "questionEn": "What does \"suddenly\" mean?",
          "options": [
            "خايف",
            "صوت",
            "فجأة",
            "ببطء"
          ],
          "correctIndex": 2,
          "explanationAr": "\"suddenly\" /ˈsʌdənli/ تعني: فجأة. مثال: Suddenly, it rained."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Reading quotes in the narrator's voice",
            "Change voice for each character"
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: Change voice for each character — القصص تحيا بتغيير الصوت."
        }
      ]
    }
  },
  {
    "id": "srp_319",
    "pillarId": "reading",
    "pillarNameAr": "القراءة التعبيرية والنطق الصوتي",
    "pillarNameEn": "Expressive Reading & Pronunciation Lab",
    "pillarIcon": "📖",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "نبر الجملة: الكلمات المهمة أقوى",
    "titleEn": "Sentence Stress: Strong Content Words",
    "descAr": "في الجملة نضغط الكلمات اللي تحمل المعنى (أسماء، أفعال، صفات) ونخفف الصغيرة.",
    "descEn": "Stress meaning words (nouns, verbs, adjectives); reduce small function words.",
    "speakingGoalAr": "اقرأ عشر جمل بإيقاع إنجليزي صحيح.",
    "speakingGoalEn": "Read ten sentences with English rhythm.",
    "keyPattern": {
      "ruleAr": "كلمات المحتوى (I WANT a CUP of TEA) قوية. كلمات الوظيفة (a, of, to, the, and, is) ضعيفة وسريعة. وغيّر الضغط لتغيير المعنى: I didn't say HE took it.",
      "ruleEn": "Content words strong; function words weak and fast. Moving stress changes meaning.",
      "formula": "CONTENT words = strong | function words = weak: I WANT a CUP of TEA"
    },
    "practicalExamples": [
      {
        "en": "I WANT a CUP of TEA.",
        "ar": "أبي كوب شاي."
      },
      {
        "en": "She WORKS in a BANK in RIYADH.",
        "ar": "تشتغل في بنك في الرياض."
      },
      {
        "en": "We're GOING to the BEACH on FRIDAY.",
        "ar": "بنروح البحر يوم الجمعة."
      },
      {
        "en": "I DIDN'T take your PEN.",
        "ar": "ما أخذت قلمك."
      },
      {
        "en": "What do you WANT for DINNER?",
        "ar": "وش تبي على العشاء؟"
      },
      {
        "en": "It's a BEAUTIFUL DAY.",
        "ar": "يوم جميل."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "I-WANT-A-CUP-OF-TEA (all equal)",
        "correct": "I WANT a CUP of TEA",
        "whyAr": "التساوي يخلي الكلام آلي."
      },
      {
        "incorrect": "Stressing 'the': to THE beach",
        "correct": "to the BEACH",
        "whyAr": "the ضعيفة /ðə/."
      },
      {
        "incorrect": "Stressing 'of': a cup OF tea",
        "correct": "a CUP of TEA /ə kʌp əv tiː/",
        "whyAr": "of تصير /əv/."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اقرأ جملة I didn't say he took your money بأربعة معانٍ.",
      "promptEn": "Read the sentence four ways with different stress.",
      "saraQuestionAr": "خلني أسمع كل معنى!",
      "saraQuestionEn": "Let me hear each meaning!",
      "recommendedResponseEn": "I DIDN'T say he took your money. I didn't SAY he took your money. I didn't say HE took your money. I didn't say he took YOUR money."
    },
    "quiz": [
      {
        "questionAr": "أي كلمة تكون ضعيفة؟",
        "questionEn": "Which word is usually weak?",
        "options": [
          "CUP",
          "of",
          "TEA"
        ],
        "correctIndex": 1,
        "explanationAr": "of كلمة وظيفة."
      },
      {
        "questionAr": "لتقول إن شخصاً آخر أخذها، اضغط:",
        "questionEn": "To say someone else took it, stress:",
        "options": [
          "I",
          "HE",
          "MONEY"
        ],
        "correctIndex": 1,
        "explanationAr": "HE."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I-WANT-A-CUP-OF-TEA (all equal)",
          "I WANT a CUP of TEA"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I WANT a CUP of TEA — التساوي يخلي الكلام آلي."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "to the BEACH",
          "Stressing 'the': to THE beach"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: to the BEACH — the ضعيفة /ðə/."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Stressing 'of': a cup OF tea",
          "a CUP of TEA /ə kʌp əv tiː/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: a CUP of TEA /ə kʌp əv tiː/ — of تصير /əv/."
      }
    ],
    "whiteboardNotes": {
      "title": "Sentence Stress: Strong Content Words",
      "pointsAr": [
        "يحدد كلمات المحتوى.",
        "يخفف كلمات الوظيفة.",
        "يغير المعنى بنقل الضغط.",
        "كلمات المحتوى (I WANT a CUP of TEA) قوية. كلمات الوظيفة (a, of, to, the, and, is) ضعيفة وسريعة. وغيّر الضغط لتغيير المعنى: I didn't say HE took it."
      ],
      "pointsEn": [
        "Identify content words.",
        "Reduce function words.",
        "Shift stress to change meaning.",
        "Content words strong; function words weak and fast. Moving stress changes meaning."
      ],
      "chalkHighlight": "CONTENT words = strong | function words = weak: I WANT a CUP of TEA"
    },
    "unit": 4,
    "cefr": "A2",
    "objectivesAr": [
      "يحدد كلمات المحتوى.",
      "يخفف كلمات الوظيفة.",
      "يغير المعنى بنقل الضغط."
    ],
    "objectivesEn": [
      "Identify content words.",
      "Reduce function words.",
      "Shift stress to change meaning."
    ],
    "vocabulary": [
      {
        "word": "content word",
        "ipa": "/ˈkɑːntɛnt wɜːrd/",
        "ar": "كلمة محتوى",
        "exampleEn": "Nouns are content words.",
        "exampleAr": "الأسماء كلمات محتوى."
      },
      {
        "word": "rhythm",
        "ipa": "/ˈrɪðəm/",
        "ar": "إيقاع",
        "exampleEn": "English rhythm",
        "exampleAr": "إيقاع الإنجليزي"
      },
      {
        "word": "stress",
        "ipa": "/strɛs/",
        "ar": "ضغط/نبر",
        "exampleEn": "word stress",
        "exampleAr": "نبر الكلمة"
      },
      {
        "word": "weak",
        "ipa": "/wiːk/",
        "ar": "ضعيف",
        "exampleEn": "weak forms",
        "exampleAr": "صيغ ضعيفة"
      },
      {
        "word": "strong",
        "ipa": "/strɔːŋ/",
        "ar": "قوي",
        "exampleEn": "strong syllables",
        "exampleAr": "مقاطع قوية"
      },
      {
        "word": "beautiful",
        "ipa": "/ˈbjuːtɪfəl/",
        "ar": "جميل",
        "exampleEn": "a beautiful day",
        "exampleAr": "يوم جميل"
      },
      {
        "word": "dinner",
        "ipa": "/ˈdɪnər/",
        "ar": "عشاء",
        "exampleEn": "dinner time",
        "exampleAr": "وقت العشاء"
      },
      {
        "word": "meaning",
        "ipa": "/ˈmiːnɪŋ/",
        "ar": "معنى",
        "exampleEn": "the meaning changes",
        "exampleAr": "المعنى يتغير"
      },
      {
        "word": "emphasis",
        "ipa": "/ˈɛmfəsɪs/",
        "ar": "تأكيد",
        "exampleEn": "add emphasis",
        "exampleAr": "أكّد"
      },
      {
        "word": "beat",
        "ipa": "/biːt/",
        "ar": "نبضة/إيقاع",
        "exampleEn": "keep the beat",
        "exampleAr": "حافظ على الإيقاع"
      }
    ],
    "grammarFocus": {
      "ruleAr": "كلمات المحتوى (I WANT a CUP of TEA) قوية. كلمات الوظيفة (a, of, to, the, and, is) ضعيفة وسريعة. وغيّر الضغط لتغيير المعنى: I didn't say HE took it.",
      "ruleEn": "Content words strong; function words weak and fast. Moving stress changes meaning.",
      "formula": "CONTENT words = strong | function words = weak: I WANT a CUP of TEA",
      "examples": [
        {
          "en": "I WANT a CUP of TEA.",
          "ar": "أبي كوب شاي."
        },
        {
          "en": "She WORKS in a BANK in RIYADH.",
          "ar": "تشتغل في بنك في الرياض."
        },
        {
          "en": "We're GOING to the BEACH on FRIDAY.",
          "ar": "بنروح البحر يوم الجمعة."
        },
        {
          "en": "I DIDN'T take your PEN.",
          "ar": "ما أخذت قلمك."
        },
        {
          "en": "What do you WANT for DINNER?",
          "ar": "وش تبي على العشاء؟"
        },
        {
          "en": "It's a BEAUTIFUL DAY.",
          "ar": "يوم جميل."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Text",
        "en": "I DIDN'T say he TOOK your MONEY.",
        "ar": "ما قلت إنه أخذ فلوسك."
      },
      {
        "speaker": "Text",
        "en": "I didn't SAY he took your money. (I wrote it.)",
        "ar": "ما «قلت»... (كتبتها)."
      },
      {
        "speaker": "Text",
        "en": "I didn't say HE took your money. (Someone else did.)",
        "ar": "ما قلت «هو»... (واحد ثاني)."
      },
      {
        "speaker": "Text",
        "en": "I didn't say he took YOUR money. (He took mine.)",
        "ar": "ما قلت فلوسك «أنت»... (أخذ فلوسي)."
      },
      {
        "speaker": "Text",
        "en": "One sentence, many meanings!",
        "ar": "جملة وحدة، معاني كثيرة!"
      },
      {
        "speaker": "Text",
        "en": "Stress is the key.",
        "ar": "الضغط هو المفتاح."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Text: I DIDN'T say he TOOK your MONEY.\nText: I didn't SAY he took your money. (I wrote it.)\nText: I didn't say HE took your money. (Someone else did.)\nText: I didn't say he took YOUR money. (He took mine.)\nText: One sentence, many meanings!\nText: Stress is the key.",
      "questions": [
        {
          "questionAr": "إذا ضغطت HE؟",
          "questionEn": "If you stress HE, what do you mean?",
          "options": [
            "someone else took it",
            "I wrote it",
            "he took mine"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: someone else took it"
        },
        {
          "questionAr": "إذا ضغطت SAY؟",
          "questionEn": "If you stress SAY?",
          "options": [
            "I wrote it, didn't say it",
            "he took mine",
            "nobody took it"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: I wrote it, didn't say it"
        },
        {
          "questionAr": "الفكرة الأساسية؟",
          "questionEn": "What is the key idea?",
          "options": [
            "grammar",
            "stress changes meaning",
            "spelling"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: stress changes meaning"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Tap the rhythm: ● • ● • ●",
      "items": [
        "I WANT a CUP of TEA ● ● • ● • ●",
        "She WORKS in a BANK ● ● • • ●",
        "a /ə/, of /əv/, to /tə/, the /ðə/"
      ],
      "tipAr": "اضرب على الطاولة مع كل كلمة قوية، والكلمات الضعيفة تنحشر بين الضربات."
    },
    "exercises": {
      "easy": [
        {
          "id": "srp_319_e1",
          "type": "meaning",
          "promptEn": "What does \"content word\" mean?",
          "promptAr": "ما معنى \"content word\"؟",
          "options": [
            "كلمة محتوى",
            "نبضة/إيقاع",
            "إيقاع",
            "تأكيد"
          ],
          "correctIndex": 0,
          "answer": "كلمة محتوى",
          "explanationAr": "\"content word\" /ˈkɑːntɛnt wɜːrd/ تعني: كلمة محتوى. مثال: Nouns are content words."
        },
        {
          "id": "srp_319_e2",
          "type": "meaning",
          "promptEn": "What does \"rhythm\" mean?",
          "promptAr": "ما معنى \"rhythm\"؟",
          "options": [
            "كلمة محتوى",
            "ضعيف",
            "إيقاع",
            "معنى"
          ],
          "correctIndex": 2,
          "answer": "إيقاع",
          "explanationAr": "\"rhythm\" /ˈrɪðəm/ تعني: إيقاع. مثال: English rhythm"
        },
        {
          "id": "srp_319_e3",
          "type": "meaning",
          "promptEn": "What does \"stress\" mean?",
          "promptAr": "ما معنى \"stress\"؟",
          "options": [
            "معنى",
            "إيقاع",
            "ضغط/نبر",
            "عشاء"
          ],
          "correctIndex": 2,
          "answer": "ضغط/نبر",
          "explanationAr": "\"stress\" /strɛs/ تعني: ضغط/نبر. مثال: word stress"
        },
        {
          "id": "srp_319_e4",
          "type": "meaning",
          "promptEn": "What does \"weak\" mean?",
          "promptAr": "ما معنى \"weak\"؟",
          "options": [
            "معنى",
            "كلمة محتوى",
            "تأكيد",
            "ضعيف"
          ],
          "correctIndex": 3,
          "answer": "ضعيف",
          "explanationAr": "\"weak\" /wiːk/ تعني: ضعيف. مثال: weak forms"
        }
      ],
      "medium": [
        {
          "id": "srp_319_m1",
          "type": "gap",
          "promptEn": "Complete: I WANT a ____ of TEA.",
          "promptAr": "أكمل الفراغ: (أبي كوب شاي.)",
          "options": [
            "cup of",
            "CUP",
            "A"
          ],
          "correctIndex": 1,
          "answer": "I WANT a CUP of TEA.",
          "explanationAr": "الإجابة: CUP. كلمات المحتوى (I WANT a CUP of TEA) قوية. كلمات الوظيفة (a, of, to, the, and, is) ضعيفة وسريعة. وغيّر الضغط لتغيير المعنى: I didn't say HE took it."
        },
        {
          "id": "srp_319_m2",
          "type": "gap",
          "promptEn": "Complete: She ____ in a BANK in RIYADH.",
          "promptAr": "أكمل الفراغ: (تشتغل في بنك في الرياض.)",
          "options": [
            "SHE",
            "works in",
            "WORKS"
          ],
          "correctIndex": 2,
          "answer": "She WORKS in a BANK in RIYADH.",
          "explanationAr": "الإجابة: WORKS. كلمات المحتوى (I WANT a CUP of TEA) قوية. كلمات الوظيفة (a, of, to, the, and, is) ضعيفة وسريعة. وغيّر الضغط لتغيير المعنى: I didn't say HE took it."
        },
        {
          "id": "srp_319_m3",
          "type": "gap",
          "promptEn": "Complete: We're GOING to the ____ on FRIDAY.",
          "promptAr": "أكمل الفراغ: (بنروح البحر يوم الجمعة.)",
          "options": [
            "BEACH",
            "the",
            "to the"
          ],
          "correctIndex": 0,
          "answer": "We're GOING to the BEACH on FRIDAY.",
          "explanationAr": "الإجابة: BEACH. كلمات المحتوى (I WANT a CUP of TEA) قوية. كلمات الوظيفة (a, of, to, the, and, is) ضعيفة وسريعة. وغيّر الضغط لتغيير المعنى: I didn't say HE took it."
        },
        {
          "id": "srp_319_m4",
          "type": "gap",
          "promptEn": "Complete: I ____ take your PEN.",
          "promptAr": "أكمل الفراغ: (ما أخذت قلمك.)",
          "options": [
            "DIDN'T",
            "your",
            "I"
          ],
          "correctIndex": 0,
          "answer": "I DIDN'T take your PEN.",
          "explanationAr": "الإجابة: DIDN'T. كلمات المحتوى (I WANT a CUP of TEA) قوية. كلمات الوظيفة (a, of, to, the, and, is) ضعيفة وسريعة. وغيّر الضغط لتغيير المعنى: I didn't say HE took it."
        }
      ],
      "hard": [
        {
          "id": "srp_319_h1",
          "type": "order",
          "promptEn": "Put the words in order: WANT / DINNER? / for / What / you / do",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (وش تبي على العشاء؟)",
          "answer": "What do you WANT for DINNER?",
          "explanationAr": "الترتيب الصحيح: What do you WANT for DINNER?"
        },
        {
          "id": "srp_319_h2",
          "type": "order",
          "promptEn": "Put the words in order: DAY. / a / BEAUTIFUL / It's",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (يوم جميل.)",
          "answer": "It's a BEAUTIFUL DAY.",
          "explanationAr": "الترتيب الصحيح: It's a BEAUTIFUL DAY."
        },
        {
          "id": "srp_319_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: تشتغل في بنك في الرياض.",
          "answer": "She WORKS in a BANK in RIYADH.",
          "explanationAr": "ترجمة مقترحة: She WORKS in a BANK in RIYADH."
        },
        {
          "id": "srp_319_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: ما أخذت قلمك.",
          "answer": "I DIDN'T take your PEN.",
          "explanationAr": "ترجمة مقترحة: I DIDN'T take your PEN."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Every word at the same volume",
        "correct": "Strong content words, weak function words",
        "whyAr": "هذا سر الطلاقة الحقيقي."
      },
      {
        "incorrect": "Full 'to': /tuː/ always",
        "correct": "to /tə/ in fast speech",
        "whyAr": "go to bed /ɡoʊ tə bɛd/."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (القراءة المعبرة: علامات الترقيم والوقفات): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Flat voice for 'Help!'",
          "Strong, loud voice for 'Help!'"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Strong, loud voice for 'Help!' — التعجب يحتاج طاقة.",
        "fromLessonId": "srp_318"
      },
      {
        "questionAr": "مراجعة (تجمعات الحروف الساكنة: street و spring): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "student /ˈstuːdənt/",
          "estudent"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: student /ˈstuːdənt/ — لا همزة قبل s.",
        "fromLessonId": "srp_316"
      },
      {
        "questionAr": "مراجعة (pen أو pin؟ الفرق بين /ɛ/ و /ɪ/): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Give me the pen to write.",
          "Give me the pin to write."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Give me the pen to write. — pen للكتابة، pin دبوس.",
        "fromLessonId": "srp_313"
      },
      {
        "questionAr": "ما معنى \"camera\"؟",
        "questionEn": "What does \"camera\" mean?",
        "options": [
          "موز",
          "مشكلة",
          "دكتور",
          "كاميرا"
        ],
        "correctIndex": 3,
        "explanationAr": "\"camera\" /ˈkæmrə/ تعني: كاميرا. مثال: a camera",
        "fromLessonId": "srp_317"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (بنروح البحر يوم الجمعة.)",
          "questionEn": "Complete: We're GOING to the ____ on FRIDAY.",
          "options": [
            "BEACH",
            "the",
            "to the"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: BEACH. كلمات المحتوى (I WANT a CUP of TEA) قوية. كلمات الوظيفة (a, of, to, the, and, is) ضعيفة وسريعة. وغيّر الضغط لتغيير المعنى: I didn't say HE took it."
        },
        {
          "questionAr": "أكمل الفراغ: (ما أخذت قلمك.)",
          "questionEn": "Complete: I ____ take your PEN.",
          "options": [
            "DIDN'T",
            "your",
            "I"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: DIDN'T. كلمات المحتوى (I WANT a CUP of TEA) قوية. كلمات الوظيفة (a, of, to, the, and, is) ضعيفة وسريعة. وغيّر الضغط لتغيير المعنى: I didn't say HE took it."
        },
        {
          "questionAr": "ما معنى \"strong\"؟",
          "questionEn": "What does \"strong\" mean?",
          "options": [
            "ضعيف",
            "تأكيد",
            "قوي",
            "جميل"
          ],
          "correctIndex": 2,
          "explanationAr": "\"strong\" /strɔːŋ/ تعني: قوي. مثال: strong syllables"
        },
        {
          "questionAr": "ما معنى \"beautiful\"؟",
          "questionEn": "What does \"beautiful\" mean?",
          "options": [
            "جميل",
            "نبضة/إيقاع",
            "معنى",
            "قوي"
          ],
          "correctIndex": 0,
          "explanationAr": "\"beautiful\" /ˈbjuːtɪfəl/ تعني: جميل. مثال: a beautiful day"
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Every word at the same volume",
            "Strong content words, weak function words"
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: Strong content words, weak function words — هذا سر الطلاقة الحقيقي."
        }
      ]
    }
  },
  {
    "id": "srp_320",
    "pillarId": "reading",
    "pillarNameAr": "القراءة التعبيرية والنطق الصوتي",
    "pillarNameEn": "Expressive Reading & Pronunciation Lab",
    "pillarIcon": "📖",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "قراءة قصة قصيرة وفهمها",
    "titleEn": "Reading a Short Story for Meaning",
    "descAr": "اقرأ قصة من ١٢٠ كلمة، افهم الشخصيات والأحداث، وخمّن معنى الكلمات من السياق.",
    "descEn": "Read a 120-word story, follow characters and events, and guess words from context.",
    "speakingGoalAr": "اقرأ القصة وأجب عن خمسة أسئلة فهم.",
    "speakingGoalEn": "Read the story and answer five comprehension questions.",
    "keyPattern": {
      "ruleAr": "استراتيجية القراءة: ١) اقرأ العنوان وتوقع. ٢) اقرأ مرة للفكرة العامة. ٣) اقرأ مرة ثانية للتفاصيل. ٤) خمّن الكلمات الجديدة من الجملة قبل القاموس.",
      "ruleEn": "Strategy: predict from the title; read once for gist; again for detail; guess new words from context.",
      "formula": "Predict → Gist → Detail → Guess from context"
    },
    "practicalExamples": [
      {
        "en": "The old fisherman lived alone by the sea.",
        "ar": "الصياد العجوز عاش وحيد جنب البحر."
      },
      {
        "en": "Every morning, he sailed out before sunrise.",
        "ar": "كل صباح يبحر قبل الشروق."
      },
      {
        "en": "One day, his net was too heavy to lift.",
        "ar": "يوم من الأيام، شبكته كانت ثقيلة مرة ما يقدر يرفعها."
      },
      {
        "en": "Inside, he found a huge, shiny pearl.",
        "ar": "لقى داخلها لؤلؤة ضخمة لامعة."
      },
      {
        "en": "He gave half of the money to the poor.",
        "ar": "عطى نص الفلوس للفقراء."
      },
      {
        "en": "The village never forgot his kindness.",
        "ar": "القرية ما نست طيبته أبداً."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Stopping at every new word",
        "correct": "Guess from context and keep reading",
        "whyAr": "التوقف يضيع الفكرة."
      },
      {
        "incorrect": "Translating word by word",
        "correct": "Read in chunks: 'every morning / he sailed out / before sunrise'",
        "whyAr": "القراءة بمجموعات أسرع وأفهم."
      },
      {
        "incorrect": "Answering from memory, not the text",
        "correct": "Find the line in the text that proves it",
        "whyAr": "ارجع للنص كدليل."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اقرأ القصة ثم لخصها لسارة في جملتين.",
      "promptEn": "Read the story, then summarise it in two sentences.",
      "saraQuestionAr": "اقرأ القصة ولخصها لي!",
      "saraQuestionEn": "Read and summarise!",
      "recommendedResponseEn": "An old fisherman in Bahrain found a huge pearl in his net. He sold it and gave half the money to the poor, so the village remembered his kindness."
    },
    "quiz": [
      {
        "questionAr": "الفكرة الرئيسية:",
        "questionEn": "Main idea:",
        "options": [
          "Fishing is hard.",
          "A kind fisherman shared his luck.",
          "Pearls are expensive."
        ],
        "correctIndex": 1,
        "explanationAr": "الكرم والمشاركة."
      },
      {
        "questionAr": "«too heavy to lift» تعني:",
        "questionEn": "'too heavy to lift' means:",
        "options": [
          "خفيف",
          "ثقيل لدرجة ما ينرفع",
          "مكسور"
        ],
        "correctIndex": 1,
        "explanationAr": "too + صفة + to."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Guess from context and keep reading",
          "Stopping at every new word"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Guess from context and keep reading — التوقف يضيع الفكرة."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Translating word by word",
          "Read in chunks: 'every morning / he sailed out / before sunrise'"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Read in chunks: 'every morning / he sailed out / before sunrise' — القراءة بمجموعات أسرع وأفهم."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Answering from memory, not the text",
          "Find the line in the text that proves it"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Find the line in the text that proves it — ارجع للنص كدليل."
      }
    ],
    "whiteboardNotes": {
      "title": "Reading a Short Story for Meaning",
      "pointsAr": [
        "يتوقع محتوى القصة.",
        "يميز الفكرة الرئيسية من التفاصيل.",
        "يخمن معنى كلمة من السياق.",
        "استراتيجية القراءة: ١) اقرأ العنوان وتوقع. ٢) اقرأ مرة للفكرة العامة. ٣) اقرأ مرة ثانية للتفاصيل. ٤) خمّن الكلمات الجديدة من الجملة قبل القاموس."
      ],
      "pointsEn": [
        "Predict content.",
        "Separate main idea from details.",
        "Guess meaning from context.",
        "Strategy: predict from the title; read once for gist; again for detail; guess new words from context."
      ],
      "chalkHighlight": "Predict → Gist → Detail → Guess from context"
    },
    "unit": 4,
    "cefr": "A2",
    "objectivesAr": [
      "يتوقع محتوى القصة.",
      "يميز الفكرة الرئيسية من التفاصيل.",
      "يخمن معنى كلمة من السياق."
    ],
    "objectivesEn": [
      "Predict content.",
      "Separate main idea from details.",
      "Guess meaning from context."
    ],
    "vocabulary": [
      {
        "word": "fisherman",
        "ipa": "/ˈfɪʃərmən/",
        "ar": "صياد سمك",
        "exampleEn": "an old fisherman",
        "exampleAr": "صياد عجوز"
      },
      {
        "word": "alone",
        "ipa": "/əˈloʊn/",
        "ar": "وحيد",
        "exampleEn": "He lived alone.",
        "exampleAr": "عاش وحيد."
      },
      {
        "word": "sail",
        "ipa": "/seɪl/",
        "ar": "يبحر",
        "exampleEn": "sail out",
        "exampleAr": "يبحر"
      },
      {
        "word": "sunrise",
        "ipa": "/ˈsʌnraɪz/",
        "ar": "شروق",
        "exampleEn": "before sunrise",
        "exampleAr": "قبل الشروق"
      },
      {
        "word": "net",
        "ipa": "/nɛt/",
        "ar": "شبكة",
        "exampleEn": "a fishing net",
        "exampleAr": "شبكة صيد"
      },
      {
        "word": "heavy",
        "ipa": "/ˈhɛvi/",
        "ar": "ثقيل",
        "exampleEn": "too heavy",
        "exampleAr": "ثقيل مرة"
      },
      {
        "word": "pearl",
        "ipa": "/pɜːrl/",
        "ar": "لؤلؤة",
        "exampleEn": "a white pearl",
        "exampleAr": "لؤلؤة بيضاء"
      },
      {
        "word": "shiny",
        "ipa": "/ˈʃaɪni/",
        "ar": "لامع",
        "exampleEn": "shiny gold",
        "exampleAr": "ذهب لامع"
      },
      {
        "word": "the poor",
        "ipa": "/ðə pʊr/",
        "ar": "الفقراء",
        "exampleEn": "help the poor",
        "exampleAr": "ساعد الفقراء"
      },
      {
        "word": "kindness",
        "ipa": "/ˈkaɪndnəs/",
        "ar": "طيبة/لطف",
        "exampleEn": "his kindness",
        "exampleAr": "طيبته"
      }
    ],
    "grammarFocus": {
      "ruleAr": "استراتيجية القراءة: ١) اقرأ العنوان وتوقع. ٢) اقرأ مرة للفكرة العامة. ٣) اقرأ مرة ثانية للتفاصيل. ٤) خمّن الكلمات الجديدة من الجملة قبل القاموس.",
      "ruleEn": "Strategy: predict from the title; read once for gist; again for detail; guess new words from context.",
      "formula": "Predict → Gist → Detail → Guess from context",
      "examples": [
        {
          "en": "The old fisherman lived alone by the sea.",
          "ar": "الصياد العجوز عاش وحيد جنب البحر."
        },
        {
          "en": "Every morning, he sailed out before sunrise.",
          "ar": "كل صباح يبحر قبل الشروق."
        },
        {
          "en": "One day, his net was too heavy to lift.",
          "ar": "يوم من الأيام، شبكته كانت ثقيلة مرة ما يقدر يرفعها."
        },
        {
          "en": "Inside, he found a huge, shiny pearl.",
          "ar": "لقى داخلها لؤلؤة ضخمة لامعة."
        },
        {
          "en": "He gave half of the money to the poor.",
          "ar": "عطى نص الفلوس للفقراء."
        },
        {
          "en": "The village never forgot his kindness.",
          "ar": "القرية ما نست طيبته أبداً."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Text",
        "en": "Long ago, an old fisherman named Saeed lived alone by the sea in Bahrain.",
        "ar": "زمان، صياد عجوز اسمه سعيد عاش وحيد جنب البحر في البحرين."
      },
      {
        "speaker": "Text",
        "en": "Every morning, he sailed out before sunrise, but he caught very little.",
        "ar": "كل صباح يبحر قبل الشروق، بس يصيد شوي."
      },
      {
        "speaker": "Text",
        "en": "One day, his net was too heavy to lift. He pulled and pulled.",
        "ar": "يوم، شبكته كانت ثقيلة مرة. سحب وسحب."
      },
      {
        "speaker": "Text",
        "en": "Inside, among the shells, he found a huge, shiny pearl.",
        "ar": "داخلها، بين الصدف، لقى لؤلؤة ضخمة لامعة."
      },
      {
        "speaker": "Text",
        "en": "He sold it in the market and gave half of the money to the poor.",
        "ar": "باعها في السوق وعطى نص الفلوس للفقراء."
      },
      {
        "speaker": "Text",
        "en": "The village never forgot his kindness.",
        "ar": "القرية ما نست طيبته أبداً."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Text: Long ago, an old fisherman named Saeed lived alone by the sea in Bahrain.\nText: Every morning, he sailed out before sunrise, but he caught very little.\nText: One day, his net was too heavy to lift. He pulled and pulled.\nText: Inside, among the shells, he found a huge, shiny pearl.\nText: He sold it in the market and gave half of the money to the poor.\nText: The village never forgot his kindness.",
      "questions": [
        {
          "questionAr": "وين عاش سعيد؟",
          "questionEn": "Where did Saeed live?",
          "options": [
            "Kuwait",
            "Bahrain",
            "Oman"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: Bahrain"
        },
        {
          "questionAr": "وش لقى؟",
          "questionEn": "What did he find?",
          "options": [
            "gold",
            "a pearl",
            "a box"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: a pearl"
        },
        {
          "questionAr": "وش سوى بالفلوس؟",
          "questionEn": "What did he do with the money?",
          "options": [
            "bought a boat",
            "gave half to the poor",
            "kept it all"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: gave half to the poor"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Reading in chunks (thought groups)",
      "items": [
        "Every morning, / he sailed out / before sunrise.",
        "Inside, / among the shells, / he found / a huge, shiny pearl."
      ],
      "tipAr": "اقرأ كل مجموعة كوحدة واحدة ووقف بين المجموعات."
    },
    "exercises": {
      "easy": [
        {
          "id": "srp_320_e1",
          "type": "meaning",
          "promptEn": "What does \"fisherman\" mean?",
          "promptAr": "ما معنى \"fisherman\"؟",
          "options": [
            "صياد سمك",
            "شروق",
            "شبكة",
            "ثقيل"
          ],
          "correctIndex": 0,
          "answer": "صياد سمك",
          "explanationAr": "\"fisherman\" /ˈfɪʃərmən/ تعني: صياد سمك. مثال: an old fisherman"
        },
        {
          "id": "srp_320_e2",
          "type": "meaning",
          "promptEn": "What does \"alone\" mean?",
          "promptAr": "ما معنى \"alone\"؟",
          "options": [
            "وحيد",
            "الفقراء",
            "شبكة",
            "طيبة/لطف"
          ],
          "correctIndex": 0,
          "answer": "وحيد",
          "explanationAr": "\"alone\" /əˈloʊn/ تعني: وحيد. مثال: He lived alone."
        },
        {
          "id": "srp_320_e3",
          "type": "meaning",
          "promptEn": "What does \"sail\" mean?",
          "promptAr": "ما معنى \"sail\"؟",
          "options": [
            "شبكة",
            "يبحر",
            "ثقيل",
            "طيبة/لطف"
          ],
          "correctIndex": 1,
          "answer": "يبحر",
          "explanationAr": "\"sail\" /seɪl/ تعني: يبحر. مثال: sail out"
        },
        {
          "id": "srp_320_e4",
          "type": "meaning",
          "promptEn": "What does \"sunrise\" mean?",
          "promptAr": "ما معنى \"sunrise\"؟",
          "options": [
            "وحيد",
            "شروق",
            "الفقراء",
            "لؤلؤة"
          ],
          "correctIndex": 1,
          "answer": "شروق",
          "explanationAr": "\"sunrise\" /ˈsʌnraɪz/ تعني: شروق. مثال: before sunrise"
        }
      ],
      "medium": [
        {
          "id": "srp_320_m1",
          "type": "gap",
          "promptEn": "Complete: The old fisherman lived ____ by the sea.",
          "promptAr": "أكمل الفراغ: (الصياد العجوز عاش وحيد جنب البحر.)",
          "options": [
            "along",
            "lonely",
            "alone"
          ],
          "correctIndex": 2,
          "answer": "The old fisherman lived alone by the sea.",
          "explanationAr": "الإجابة: alone. استراتيجية القراءة: ١) اقرأ العنوان وتوقع. ٢) اقرأ مرة للفكرة العامة. ٣) اقرأ مرة ثانية للتفاصيل. ٤) خمّن الكلمات الجديدة من الجملة قبل القاموس."
        },
        {
          "id": "srp_320_m2",
          "type": "gap",
          "promptEn": "Complete: Every morning, he sailed out before ____.",
          "promptAr": "أكمل الفراغ: (كل صباح يبحر قبل الشروق.)",
          "options": [
            "sunrise",
            "sunset",
            "sunshine"
          ],
          "correctIndex": 0,
          "answer": "Every morning, he sailed out before sunrise.",
          "explanationAr": "الإجابة: sunrise. استراتيجية القراءة: ١) اقرأ العنوان وتوقع. ٢) اقرأ مرة للفكرة العامة. ٣) اقرأ مرة ثانية للتفاصيل. ٤) خمّن الكلمات الجديدة من الجملة قبل القاموس."
        },
        {
          "id": "srp_320_m3",
          "type": "gap",
          "promptEn": "Complete: One day, his net was too ____ to lift.",
          "promptAr": "أكمل الفراغ: (يوم من الأيام، شبكته كانت ثقيلة مرة ما يقدر يرفعها.)",
          "options": [
            "empty",
            "happy",
            "heavy"
          ],
          "correctIndex": 2,
          "answer": "One day, his net was too heavy to lift.",
          "explanationAr": "الإجابة: heavy. استراتيجية القراءة: ١) اقرأ العنوان وتوقع. ٢) اقرأ مرة للفكرة العامة. ٣) اقرأ مرة ثانية للتفاصيل. ٤) خمّن الكلمات الجديدة من الجملة قبل القاموس."
        },
        {
          "id": "srp_320_m4",
          "type": "gap",
          "promptEn": "Complete: Inside, he found a huge, shiny ____.",
          "promptAr": "أكمل الفراغ: (لقى داخلها لؤلؤة ضخمة لامعة.)",
          "options": [
            "pear",
            "peel",
            "pearl"
          ],
          "correctIndex": 2,
          "answer": "Inside, he found a huge, shiny pearl.",
          "explanationAr": "الإجابة: pearl. استراتيجية القراءة: ١) اقرأ العنوان وتوقع. ٢) اقرأ مرة للفكرة العامة. ٣) اقرأ مرة ثانية للتفاصيل. ٤) خمّن الكلمات الجديدة من الجملة قبل القاموس."
        }
      ],
      "hard": [
        {
          "id": "srp_320_h1",
          "type": "order",
          "promptEn": "Put the words in order: half / the / gave / poor. / the / He / money / of / to",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (عطى نص الفلوس للفقراء.)",
          "answer": "He gave half of the money to the poor.",
          "explanationAr": "الترتيب الصحيح: He gave half of the money to the poor."
        },
        {
          "id": "srp_320_h2",
          "type": "order",
          "promptEn": "Put the words in order: village / kindness. / The / never / forgot / his",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (القرية ما نست طيبته أبداً.)",
          "answer": "The village never forgot his kindness.",
          "explanationAr": "الترتيب الصحيح: The village never forgot his kindness."
        },
        {
          "id": "srp_320_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: كل صباح يبحر قبل الشروق.",
          "answer": "Every morning, he sailed out before sunrise.",
          "explanationAr": "ترجمة مقترحة: Every morning, he sailed out before sunrise."
        },
        {
          "id": "srp_320_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: لقى داخلها لؤلؤة ضخمة لامعة.",
          "answer": "Inside, he found a huge, shiny pearl.",
          "explanationAr": "ترجمة مقترحة: Inside, he found a huge, shiny pearl."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "pearl read as «بيرل»",
        "correct": "pearl /pɜːrl/",
        "whyAr": "صوت /ɜːr/ مثل bird."
      },
      {
        "incorrect": "Reading the story with no emotion",
        "correct": "Slow down at the climax: 'he found... a huge, shiny pearl!'",
        "whyAr": "التشويق جزء من الفهم."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (نبر الجملة: الكلمات المهمة أقوى): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Stressing 'the': to THE beach",
          "to the BEACH"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: to the BEACH — the ضعيفة /ðə/.",
        "fromLessonId": "srp_319"
      },
      {
        "questionAr": "مراجعة (الصوت الضعيف schwa /ə/): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "bə-NA-nə /bəˈnænə/",
          "ba-NA-NA (all full vowels)"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: bə-NA-nə /bəˈnænə/ — أضعف المقطعين الأول والأخير.",
        "fromLessonId": "srp_317"
      },
      {
        "questionAr": "مراجعة (نطق ed في الماضي: /t/ /d/ /ɪd/): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "walked as «ووكِد» (2 syllables)",
          "walked /wɔːkt/ (1 syllable)"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: walked /wɔːkt/ (1 syllable) — ed بعد k = /t/ بدون مقطع.",
        "fromLessonId": "srp_314"
      },
      {
        "questionAr": "ما معنى \"scared\"؟",
        "questionEn": "What does \"scared\" mean?",
        "options": [
          "يهمس",
          "ابتسامة/يبتسم",
          "خايف",
          "بحذر"
        ],
        "correctIndex": 2,
        "explanationAr": "\"scared\" /skɛrd/ تعني: خايف. مثال: He was scared.",
        "fromLessonId": "srp_318"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (يوم من الأيام، شبكته كانت ثقيلة مرة ما يقدر يرفعها.)",
          "questionEn": "Complete: One day, his net was too ____ to lift.",
          "options": [
            "empty",
            "happy",
            "heavy"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: heavy. استراتيجية القراءة: ١) اقرأ العنوان وتوقع. ٢) اقرأ مرة للفكرة العامة. ٣) اقرأ مرة ثانية للتفاصيل. ٤) خمّن الكلمات الجديدة من الجملة قبل القاموس."
        },
        {
          "questionAr": "أكمل الفراغ: (لقى داخلها لؤلؤة ضخمة لامعة.)",
          "questionEn": "Complete: Inside, he found a huge, shiny ____.",
          "options": [
            "pear",
            "peel",
            "pearl"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: pearl. استراتيجية القراءة: ١) اقرأ العنوان وتوقع. ٢) اقرأ مرة للفكرة العامة. ٣) اقرأ مرة ثانية للتفاصيل. ٤) خمّن الكلمات الجديدة من الجملة قبل القاموس."
        },
        {
          "questionAr": "ما معنى \"net\"؟",
          "questionEn": "What does \"net\" mean?",
          "options": [
            "شبكة",
            "ثقيل",
            "الفقراء",
            "لامع"
          ],
          "correctIndex": 0,
          "explanationAr": "\"net\" /nɛt/ تعني: شبكة. مثال: a fishing net"
        },
        {
          "questionAr": "ما معنى \"heavy\"؟",
          "questionEn": "What does \"heavy\" mean?",
          "options": [
            "لؤلؤة",
            "طيبة/لطف",
            "ثقيل",
            "الفقراء"
          ],
          "correctIndex": 2,
          "explanationAr": "\"heavy\" /ˈhɛvi/ تعني: ثقيل. مثال: too heavy"
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "pearl read as «بيرل»",
            "pearl /pɜːrl/"
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: pearl /pɜːrl/ — صوت /ɜːr/ مثل bird."
        }
      ]
    }
  },
  {
    "id": "srp_321_m",
    "pillarId": "reading",
    "pillarNameAr": "القراءة التعبيرية والنطق الصوتي",
    "pillarNameEn": "Expressive Reading & Pronunciation Lab",
    "pillarIcon": "📖",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "قراءة اللافتات والتعليمات",
    "titleEn": "Reading Signs, Notices and Labels",
    "descAr": "افهم لافتات المطار والمول والطريق وملصقات الدواء والأكل بسرعة.",
    "descEn": "Quickly understand airport, mall and road signs, and medicine/food labels.",
    "speakingGoalAr": "افهم عشر لافتات وملصقات حقيقية.",
    "speakingGoalEn": "Understand ten real signs and labels.",
    "keyPattern": {
      "ruleAr": "اللافتات قصيرة بلا أفعال مساعدة: No parking = ممنوع الوقوف. Keep out = ممنوع الدخول. Staff only = للموظفين فقط. Best before = يفضل استهلاكه قبل.",
      "ruleEn": "Signs are short and drop small words: No parking, Keep out, Staff only, Best before.",
      "formula": "No + V-ing / noun | Do not + verb | ... only | Please + verb"
    },
    "practicalExamples": [
      {
        "en": "No parking in front of the gate.",
        "ar": "ممنوع الوقوف قدام البوابة."
      },
      {
        "en": "Staff only.",
        "ar": "للموظفين فقط."
      },
      {
        "en": "Best before: 12/2026.",
        "ar": "يفضل استهلاكه قبل: ١٢/٢٠٢٦."
      },
      {
        "en": "Take two tablets daily after meals.",
        "ar": "خذ حبتين يومياً بعد الأكل."
      },
      {
        "en": "Keep out of reach of children.",
        "ar": "يحفظ بعيداً عن متناول الأطفال."
      },
      {
        "en": "Mind the gap.",
        "ar": "انتبه للفراغ (بين القطار والرصيف)."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Exit = entrance",
        "correct": "Exit = مخرج, Entrance = مدخل",
        "whyAr": "لا تخلط."
      },
      {
        "incorrect": "Push the door when it says Pull",
        "correct": "Pull = اسحب, Push = ادفع",
        "whyAr": "أشهر غلطة!"
      },
      {
        "incorrect": "Best before = expiry date exactly",
        "correct": "Best before = best quality before; Expiry/Use by = do not use after",
        "whyAr": "فرق مهم في الأكل والدواء."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اشرح لسارة معنى ثلاث لافتات تشوفها كل يوم.",
      "promptEn": "Explain three signs you see every day.",
      "saraQuestionAr": "وش مكتوب على اللافتات حولك؟",
      "saraQuestionEn": "What do the signs around you say?",
      "recommendedResponseEn": "'No parking' means you can't park here. 'Staff only' means only employees can enter. 'Closed for prayer' means the shop is closed during prayer time."
    },
    "quiz": [
      {
        "questionAr": "PULL تعني:",
        "questionEn": "PULL means:",
        "options": [
          "ادفع",
          "اسحب",
          "اقفل"
        ],
        "correctIndex": 1,
        "explanationAr": "اسحب."
      },
      {
        "questionAr": "Keep out of reach of children:",
        "questionEn": "Meaning:",
        "options": [
          "أعطه للأطفال",
          "بعيداً عن متناول الأطفال",
          "للأطفال فقط"
        ],
        "correctIndex": 1,
        "explanationAr": "بعيداً عن الأطفال."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Exit = entrance",
          "Exit = مخرج, Entrance = مدخل"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Exit = مخرج, Entrance = مدخل — لا تخلط."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Push the door when it says Pull",
          "Pull = اسحب, Push = ادفع"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Pull = اسحب, Push = ادفع — أشهر غلطة!"
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Best before = best quality before; Expiry/Use by = do not use after",
          "Best before = expiry date exactly"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Best before = best quality before; Expiry/Use by = do not use after — فرق مهم في الأكل والدواء."
      }
    ],
    "whiteboardNotes": {
      "title": "Reading Signs, Notices and Labels",
      "pointsAr": [
        "يفهم اللافتات الشائعة.",
        "يقرأ ملصقات الدواء والأكل.",
        "يفرق بين الممنوع والمسموح.",
        "اللافتات قصيرة بلا أفعال مساعدة: No parking = ممنوع الوقوف. Keep out = ممنوع الدخول. Staff only = للموظفين فقط. Best before = يفضل استهلاكه قبل."
      ],
      "pointsEn": [
        "Understand common signs.",
        "Read medicine and food labels.",
        "Distinguish prohibitions from permissions.",
        "Signs are short and drop small words: No parking, Keep out, Staff only, Best before."
      ],
      "chalkHighlight": "No + V-ing / noun | Do not + verb | ... only | Please + verb"
    },
    "unit": 4,
    "cefr": "A2",
    "objectivesAr": [
      "يفهم اللافتات الشائعة.",
      "يقرأ ملصقات الدواء والأكل.",
      "يفرق بين الممنوع والمسموح."
    ],
    "objectivesEn": [
      "Understand common signs.",
      "Read medicine and food labels.",
      "Distinguish prohibitions from permissions."
    ],
    "vocabulary": [
      {
        "word": "exit",
        "ipa": "/ˈɛɡzɪt/",
        "ar": "مخرج",
        "exampleEn": "Emergency exit",
        "exampleAr": "مخرج طوارئ"
      },
      {
        "word": "entrance",
        "ipa": "/ˈɛntrəns/",
        "ar": "مدخل",
        "exampleEn": "Main entrance",
        "exampleAr": "المدخل الرئيسي"
      },
      {
        "word": "push",
        "ipa": "/pʊʃ/",
        "ar": "ادفع",
        "exampleEn": "Push the door.",
        "exampleAr": "ادفع الباب."
      },
      {
        "word": "pull",
        "ipa": "/pʊl/",
        "ar": "اسحب",
        "exampleEn": "Pull to open.",
        "exampleAr": "اسحب للفتح."
      },
      {
        "word": "staff",
        "ipa": "/stæf/",
        "ar": "موظفين",
        "exampleEn": "Staff only",
        "exampleAr": "للموظفين فقط"
      },
      {
        "word": "expiry date",
        "ipa": "/ɪkˈspaɪəri deɪt/",
        "ar": "تاريخ الانتهاء",
        "exampleEn": "Check the expiry date.",
        "exampleAr": "شيك تاريخ الانتهاء."
      },
      {
        "word": "daily",
        "ipa": "/ˈdeɪli/",
        "ar": "يومياً",
        "exampleEn": "once daily",
        "exampleAr": "مرة يومياً"
      },
      {
        "word": "reach",
        "ipa": "/riːtʃ/",
        "ar": "متناول",
        "exampleEn": "out of reach",
        "exampleAr": "بعيد عن المتناول"
      },
      {
        "word": "wet floor",
        "ipa": "/wɛt flɔːr/",
        "ar": "أرضية مبللة",
        "exampleEn": "Caution: wet floor",
        "exampleAr": "انتبه: أرضية مبللة"
      },
      {
        "word": "closed",
        "ipa": "/kloʊzd/",
        "ar": "مغلق",
        "exampleEn": "Closed for prayer",
        "exampleAr": "مغلق للصلاة"
      }
    ],
    "grammarFocus": {
      "ruleAr": "اللافتات قصيرة بلا أفعال مساعدة: No parking = ممنوع الوقوف. Keep out = ممنوع الدخول. Staff only = للموظفين فقط. Best before = يفضل استهلاكه قبل.",
      "ruleEn": "Signs are short and drop small words: No parking, Keep out, Staff only, Best before.",
      "formula": "No + V-ing / noun | Do not + verb | ... only | Please + verb",
      "examples": [
        {
          "en": "No parking in front of the gate.",
          "ar": "ممنوع الوقوف قدام البوابة."
        },
        {
          "en": "Staff only.",
          "ar": "للموظفين فقط."
        },
        {
          "en": "Best before: 12/2026.",
          "ar": "يفضل استهلاكه قبل: ١٢/٢٠٢٦."
        },
        {
          "en": "Take two tablets daily after meals.",
          "ar": "خذ حبتين يومياً بعد الأكل."
        },
        {
          "en": "Keep out of reach of children.",
          "ar": "يحفظ بعيداً عن متناول الأطفال."
        },
        {
          "en": "Mind the gap.",
          "ar": "انتبه للفراغ (بين القطار والرصيف)."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sign",
        "en": "CLOSED FOR PRAYER – BACK IN 20 MINUTES",
        "ar": "مغلق للصلاة – نعود بعد ٢٠ دقيقة"
      },
      {
        "speaker": "Sign",
        "en": "CAUTION: WET FLOOR",
        "ar": "انتبه: أرضية مبللة"
      },
      {
        "speaker": "Sign",
        "en": "NO SMOKING",
        "ar": "ممنوع التدخين"
      },
      {
        "speaker": "Label",
        "en": "Take one tablet twice daily. Do not exceed 4 tablets in 24 hours.",
        "ar": "حبة مرتين يومياً. لا تتجاوز ٤ حبات في ٢٤ ساعة."
      },
      {
        "speaker": "Label",
        "en": "Store below 25°C. Keep out of reach of children.",
        "ar": "يحفظ تحت ٢٥ درجة. بعيداً عن الأطفال."
      },
      {
        "speaker": "Sign",
        "en": "PULL TO OPEN",
        "ar": "اسحب للفتح"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sign: CLOSED FOR PRAYER – BACK IN 20 MINUTES\nSign: CAUTION: WET FLOOR\nSign: NO SMOKING\nLabel: Take one tablet twice daily. Do not exceed 4 tablets in 24 hours.\nLabel: Store below 25°C. Keep out of reach of children.\nSign: PULL TO OPEN",
      "questions": [
        {
          "questionAr": "متى يفتح المحل؟",
          "questionEn": "When will the shop open again?",
          "options": [
            "in 10 minutes",
            "in 20 minutes",
            "tomorrow"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: in 20 minutes"
        },
        {
          "questionAr": "أقصى عدد حبات؟",
          "questionEn": "Maximum tablets in 24 hours?",
          "options": [
            "2",
            "4",
            "6"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: 4"
        },
        {
          "questionAr": "كيف تفتح الباب؟",
          "questionEn": "How do you open the door?",
          "options": [
            "push",
            "pull",
            "slide"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: pull"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Reading signs aloud: clear and slow",
      "items": [
        "exit /ˈɛɡzɪt/",
        "entrance /ˈɛntrəns/",
        "caution /ˈkɔːʃən/"
      ],
      "tipAr": "exit تنطق «إقزِت» أو «إكسِت»، الاثنين مقبولين."
    },
    "exercises": {
      "easy": [
        {
          "id": "srp_321_m_e1",
          "type": "meaning",
          "promptEn": "What does \"exit\" mean?",
          "promptAr": "ما معنى \"exit\"؟",
          "options": [
            "ادفع",
            "أرضية مبللة",
            "مخرج",
            "اسحب"
          ],
          "correctIndex": 2,
          "answer": "مخرج",
          "explanationAr": "\"exit\" /ˈɛɡzɪt/ تعني: مخرج. مثال: Emergency exit"
        },
        {
          "id": "srp_321_m_e2",
          "type": "meaning",
          "promptEn": "What does \"entrance\" mean?",
          "promptAr": "ما معنى \"entrance\"؟",
          "options": [
            "تاريخ الانتهاء",
            "مدخل",
            "أرضية مبللة",
            "اسحب"
          ],
          "correctIndex": 1,
          "answer": "مدخل",
          "explanationAr": "\"entrance\" /ˈɛntrəns/ تعني: مدخل. مثال: Main entrance"
        },
        {
          "id": "srp_321_m_e3",
          "type": "meaning",
          "promptEn": "What does \"push\" mean?",
          "promptAr": "ما معنى \"push\"؟",
          "options": [
            "مخرج",
            "يومياً",
            "ادفع",
            "مغلق"
          ],
          "correctIndex": 2,
          "answer": "ادفع",
          "explanationAr": "\"push\" /pʊʃ/ تعني: ادفع. مثال: Push the door."
        },
        {
          "id": "srp_321_m_e4",
          "type": "meaning",
          "promptEn": "What does \"pull\" mean?",
          "promptAr": "ما معنى \"pull\"؟",
          "options": [
            "اسحب",
            "مخرج",
            "ادفع",
            "موظفين"
          ],
          "correctIndex": 0,
          "answer": "اسحب",
          "explanationAr": "\"pull\" /pʊl/ تعني: اسحب. مثال: Pull to open."
        }
      ],
      "medium": [
        {
          "id": "srp_321_m_m1",
          "type": "gap",
          "promptEn": "Complete: ____ in front of the gate.",
          "promptAr": "أكمل الفراغ: (ممنوع الوقوف قدام البوابة.)",
          "options": [
            "No parking",
            "Not park",
            "Don't parking"
          ],
          "correctIndex": 0,
          "answer": "No parking in front of the gate.",
          "explanationAr": "الإجابة: No parking. اللافتات قصيرة بلا أفعال مساعدة: No parking = ممنوع الوقوف. Keep out = ممنوع الدخول. Staff only = للموظفين فقط. Best before = يفضل استهلاكه قبل."
        },
        {
          "id": "srp_321_m_m2",
          "type": "gap",
          "promptEn": "Complete: Staff ____.",
          "promptAr": "أكمل الفراغ: (للموظفين فقط.)",
          "options": [
            "just",
            "alone",
            "only"
          ],
          "correctIndex": 2,
          "answer": "Staff only.",
          "explanationAr": "الإجابة: only. اللافتات قصيرة بلا أفعال مساعدة: No parking = ممنوع الوقوف. Keep out = ممنوع الدخول. Staff only = للموظفين فقط. Best before = يفضل استهلاكه قبل."
        },
        {
          "id": "srp_321_m_m3",
          "type": "gap",
          "promptEn": "Complete: ____: 12/2026.",
          "promptAr": "أكمل الفراغ: (يفضل استهلاكه قبل: ١٢/٢٠٢٦.)",
          "options": [
            "Better before",
            "Good until after",
            "Best before"
          ],
          "correctIndex": 2,
          "answer": "Best before: 12/2026.",
          "explanationAr": "الإجابة: Best before. اللافتات قصيرة بلا أفعال مساعدة: No parking = ممنوع الوقوف. Keep out = ممنوع الدخول. Staff only = للموظفين فقط. Best before = يفضل استهلاكه قبل."
        },
        {
          "id": "srp_321_m_m4",
          "type": "gap",
          "promptEn": "Complete: Take two tablets ____ after meals.",
          "promptAr": "أكمل الفراغ: (خذ حبتين يومياً بعد الأكل.)",
          "options": [
            "day",
            "dairy",
            "daily"
          ],
          "correctIndex": 2,
          "answer": "Take two tablets daily after meals.",
          "explanationAr": "الإجابة: daily. اللافتات قصيرة بلا أفعال مساعدة: No parking = ممنوع الوقوف. Keep out = ممنوع الدخول. Staff only = للموظفين فقط. Best before = يفضل استهلاكه قبل."
        }
      ],
      "hard": [
        {
          "id": "srp_321_m_h1",
          "type": "order",
          "promptEn": "Put the words in order: of / of / reach / Keep / children. / out",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (يحفظ بعيداً عن متناول الأطفال.)",
          "answer": "Keep out of reach of children.",
          "explanationAr": "الترتيب الصحيح: Keep out of reach of children."
        },
        {
          "id": "srp_321_m_h2",
          "type": "order",
          "promptEn": "Put the words in order: gap. / the / Mind",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (انتبه للفراغ (بين القطار والرصيف).)",
          "answer": "Mind the gap.",
          "explanationAr": "الترتيب الصحيح: Mind the gap."
        },
        {
          "id": "srp_321_m_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: للموظفين فقط.",
          "answer": "Staff only.",
          "explanationAr": "ترجمة مقترحة: Staff only."
        },
        {
          "id": "srp_321_m_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: خذ حبتين يومياً بعد الأكل.",
          "answer": "Take two tablets daily after meals.",
          "explanationAr": "ترجمة مقترحة: Take two tablets daily after meals."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Do not exceed = لا تزيد/لا تتجاوز",
        "correct": "exceed /ɪkˈsiːd/",
        "whyAr": "كلمة مهمة في الأدوية."
      },
      {
        "incorrect": "Ignoring 'only'",
        "correct": "Staff only = ممنوع لغير الموظفين",
        "whyAr": "كلمة صغيرة، معنى كبير."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (قراءة قصة قصيرة وفهمها): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Translating word by word",
          "Read in chunks: 'every morning / he sailed out / before sunrise'"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Read in chunks: 'every morning / he sailed out / before sunrise' — القراءة بمجموعات أسرع وأفهم.",
        "fromLessonId": "srp_320"
      },
      {
        "questionAr": "مراجعة (القراءة المعبرة: علامات الترقيم والوقفات): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Reading without pauses",
          "Pause at every comma and full stop"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Pause at every comma and full stop — القراءة المتواصلة تضيع المعنى.",
        "fromLessonId": "srp_318"
      },
      {
        "questionAr": "مراجعة (نبر الكلمة: أين الضغط؟): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "comPUter /kəmˈpjuːtər/",
          "COMputer"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: comPUter /kəmˈpjuːtər/ — computer ضغطها على المقطع الثاني PU.",
        "fromLessonId": "srp_315"
      },
      {
        "questionAr": "ما معنى \"beat\"؟",
        "questionEn": "What does \"beat\" mean?",
        "options": [
          "نبضة/إيقاع",
          "كلمة محتوى",
          "إيقاع",
          "عشاء"
        ],
        "correctIndex": 0,
        "explanationAr": "\"beat\" /biːt/ تعني: نبضة/إيقاع. مثال: keep the beat",
        "fromLessonId": "srp_319"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (يفضل استهلاكه قبل: ١٢/٢٠٢٦.)",
          "questionEn": "Complete: ____: 12/2026.",
          "options": [
            "Better before",
            "Good until after",
            "Best before"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: Best before. اللافتات قصيرة بلا أفعال مساعدة: No parking = ممنوع الوقوف. Keep out = ممنوع الدخول. Staff only = للموظفين فقط. Best before = يفضل استهلاكه قبل."
        },
        {
          "questionAr": "أكمل الفراغ: (خذ حبتين يومياً بعد الأكل.)",
          "questionEn": "Complete: Take two tablets ____ after meals.",
          "options": [
            "day",
            "dairy",
            "daily"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: daily. اللافتات قصيرة بلا أفعال مساعدة: No parking = ممنوع الوقوف. Keep out = ممنوع الدخول. Staff only = للموظفين فقط. Best before = يفضل استهلاكه قبل."
        },
        {
          "questionAr": "ما معنى \"staff\"؟",
          "questionEn": "What does \"staff\" mean?",
          "options": [
            "موظفين",
            "أرضية مبللة",
            "مخرج",
            "متناول"
          ],
          "correctIndex": 0,
          "explanationAr": "\"staff\" /stæf/ تعني: موظفين. مثال: Staff only"
        },
        {
          "questionAr": "ما معنى \"expiry date\"؟",
          "questionEn": "What does \"expiry date\" mean?",
          "options": [
            "تاريخ الانتهاء",
            "مغلق",
            "يومياً",
            "مخرج"
          ],
          "correctIndex": 0,
          "explanationAr": "\"expiry date\" /ɪkˈspaɪəri deɪt/ تعني: تاريخ الانتهاء. مثال: Check the expiry date."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Do not exceed = لا تزيد/لا تتجاوز",
            "exceed /ɪkˈsiːd/"
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: exceed /ɪkˈsiːd/ — كلمة مهمة في الأدوية."
        }
      ]
    }
  },
  {
    "id": "srp_303",
    "pillarId": "reading",
    "pillarNameAr": "القراءة التعبيرية والنطق الصوتي",
    "pillarNameEn": "Expressive Reading & Pronunciation Lab",
    "pillarIcon": "📖",
    "level": "متوسط (Intermediate)",
    "levelCode": "B1-B2",
    "titleAr": "الكلام المتصل: ربط الكلمات",
    "titleEn": "Connected Speech: Linking Words",
    "descAr": "المتحدث الأصلي ما يفصل الكلمات: turn it off = «تيرنِتاف». تعلم الربط عشان تفهم وتنطق بطلاقة.",
    "descEn": "Natives link words: 'turn it off' → /tɜːrnɪˈtɔːf/. Learn linking to understand and sound fluent.",
    "speakingGoalAr": "اقرأ عشر عبارات بربط طبيعي.",
    "speakingGoalEn": "Read ten phrases with natural linking.",
    "keyPattern": {
      "ruleAr": "ساكن + متحرك = ربط مباشر (an apple → anapple). متحرك + متحرك = نضيف /j/ أو /w/ خفيفة (I am → I-y-am, go out → go-w-out). نفس الساكن مرتين = ننطقه مرة طويلة (big girl).",
      "ruleEn": "Consonant + vowel links; vowel + vowel adds /j/ or /w/; same consonant twice merges.",
      "formula": "C+V: turn_it_off | V+V: go(w)out, I(j)am | C=C: bi(g)girl"
    },
    "practicalExamples": [
      {
        "en": "Turn it off, please.",
        "ar": "طفّه لو سمحت."
      },
      {
        "en": "Can I have an apple?",
        "ar": "أقدر آخذ تفاحة؟"
      },
      {
        "en": "Let's go out tonight.",
        "ar": "خلنا نطلع الليلة."
      },
      {
        "en": "Pick it up and put it on.",
        "ar": "شيله والبسه."
      },
      {
        "en": "I am at home all evening.",
        "ar": "أنا في البيت طول المساء."
      },
      {
        "en": "Is it an old one?",
        "ar": "هو قديم؟"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Turn / it / off (separated)",
        "correct": "Turn_it_off /tɜːrnɪˈtɔːf/",
        "whyAr": "الفصل يخلي الكلام متقطع."
      },
      {
        "incorrect": "Inserting a glottal stop: an ʔapple",
        "correct": "an_apple /əˈnæpəl/",
        "whyAr": "العربي يضع همزة قبل الحرف المتحرك؛ الإنجليزي يربط."
      },
      {
        "incorrect": "Pick up it",
        "correct": "Pick it up",
        "whyAr": "الضمير بين الفعل وحرف الجر."
      }
    ],
    "speakingChallenge": {
      "promptAr": "قل لسارة: Turn it off, pick it up, and put it on — بربط كامل.",
      "promptEn": "Say: Turn it off, pick it up, and put it on — fully linked.",
      "saraQuestionAr": "قلها بسرعة كأنها كلمة وحدة!",
      "saraQuestionEn": "Say it fast like one word!",
      "recommendedResponseEn": "Turn_it_off, pick_it_up, and put_it_on."
    },
    "quiz": [
      {
        "questionAr": "الربط الصحيح لـ an orange:",
        "questionEn": "Linking 'an orange':",
        "options": [
          "a-norange",
          "an ʔorange",
          "a orange"
        ],
        "correctIndex": 0,
        "explanationAr": "النون تنتقل للكلمة التالية."
      },
      {
        "questionAr": "أكمل: Pick ___",
        "questionEn": "Complete: Pick ___",
        "options": [
          "up it",
          "it up",
          "it"
        ],
        "correctIndex": 1,
        "explanationAr": "Pick it up."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Turn / it / off (separated)",
          "Turn_it_off /tɜːrnɪˈtɔːf/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Turn_it_off /tɜːrnɪˈtɔːf/ — الفصل يخلي الكلام متقطع."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "an_apple /əˈnæpəl/",
          "Inserting a glottal stop: an ʔapple"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: an_apple /əˈnæpəl/ — العربي يضع همزة قبل الحرف المتحرك؛ الإنجليزي يربط."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Pick up it",
          "Pick it up"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Pick it up — الضمير بين الفعل وحرف الجر."
      }
    ],
    "whiteboardNotes": {
      "title": "Connected Speech: Linking Words",
      "pointsAr": [
        "يربط الساكن بالمتحرك.",
        "يستخدم /j/ و /w/ الرابطة.",
        "يفهم الكلام السريع.",
        "ساكن + متحرك = ربط مباشر (an apple → anapple). متحرك + متحرك = نضيف /j/ أو /w/ خفيفة (I am → I-y-am, go out → go-w-out). نفس الساكن مرتين = ننطقه مرة طويلة (big girl)."
      ],
      "pointsEn": [
        "Link consonant to vowel.",
        "Use linking /j/ and /w/.",
        "Understand fast speech.",
        "Consonant + vowel links; vowel + vowel adds /j/ or /w/; same consonant twice merges."
      ],
      "chalkHighlight": "C+V: turn_it_off | V+V: go(w)out, I(j)am | C=C: bi(g)girl"
    },
    "unit": 5,
    "cefr": "B1",
    "objectivesAr": [
      "يربط الساكن بالمتحرك.",
      "يستخدم /j/ و /w/ الرابطة.",
      "يفهم الكلام السريع."
    ],
    "objectivesEn": [
      "Link consonant to vowel.",
      "Use linking /j/ and /w/.",
      "Understand fast speech."
    ],
    "vocabulary": [
      {
        "word": "turn off",
        "ipa": "/tɜːrn ɔːf/",
        "ar": "يطفي",
        "exampleEn": "Turn off the light.",
        "exampleAr": "طفّ النور."
      },
      {
        "word": "pick up",
        "ipa": "/pɪk ʌp/",
        "ar": "يشيل/يرفع",
        "exampleEn": "Pick it up.",
        "exampleAr": "شيله."
      },
      {
        "word": "go out",
        "ipa": "/ɡoʊ aʊt/",
        "ar": "يطلع",
        "exampleEn": "Let's go out.",
        "exampleAr": "خلنا نطلع."
      },
      {
        "word": "put on",
        "ipa": "/pʊt ɑːn/",
        "ar": "يلبس",
        "exampleEn": "Put on your jacket.",
        "exampleAr": "البس جاكيتك."
      },
      {
        "word": "look at",
        "ipa": "/lʊk æt/",
        "ar": "يطالع",
        "exampleEn": "Look at it!",
        "exampleAr": "طالعه!"
      },
      {
        "word": "check in",
        "ipa": "/tʃɛk ɪn/",
        "ar": "يسجل دخول",
        "exampleEn": "Check in online.",
        "exampleAr": "سجل أونلاين."
      },
      {
        "word": "all over",
        "ipa": "/ɔːl ˈoʊvər/",
        "ar": "في كل مكان",
        "exampleEn": "all over the world",
        "exampleAr": "في كل العالم"
      },
      {
        "word": "as soon as",
        "ipa": "/æz suːn æz/",
        "ar": "أول ما",
        "exampleEn": "as soon as possible",
        "exampleAr": "بأسرع وقت"
      },
      {
        "word": "not at all",
        "ipa": "/nɑːt æt ɔːl/",
        "ar": "أبداً/العفو",
        "exampleEn": "Not at all!",
        "exampleAr": "العفو!"
      },
      {
        "word": "an hour",
        "ipa": "/ən aʊər/",
        "ar": "ساعة",
        "exampleEn": "in an hour",
        "exampleAr": "بعد ساعة"
      }
    ],
    "grammarFocus": {
      "ruleAr": "ساكن + متحرك = ربط مباشر (an apple → anapple). متحرك + متحرك = نضيف /j/ أو /w/ خفيفة (I am → I-y-am, go out → go-w-out). نفس الساكن مرتين = ننطقه مرة طويلة (big girl).",
      "ruleEn": "Consonant + vowel links; vowel + vowel adds /j/ or /w/; same consonant twice merges.",
      "formula": "C+V: turn_it_off | V+V: go(w)out, I(j)am | C=C: bi(g)girl",
      "examples": [
        {
          "en": "Turn it off, please.",
          "ar": "طفّه لو سمحت."
        },
        {
          "en": "Can I have an apple?",
          "ar": "أقدر آخذ تفاحة؟"
        },
        {
          "en": "Let's go out tonight.",
          "ar": "خلنا نطلع الليلة."
        },
        {
          "en": "Pick it up and put it on.",
          "ar": "شيله والبسه."
        },
        {
          "en": "I am at home all evening.",
          "ar": "أنا في البيت طول المساء."
        },
        {
          "en": "Is it an old one?",
          "ar": "هو قديم؟"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Text",
        "en": "Not_at_all → /nɑːdəˈdɔːl/",
        "ar": "العفو"
      },
      {
        "speaker": "Text",
        "en": "Check_it_out → /tʃɛkɪˈdaʊt/",
        "ar": "شوفه"
      },
      {
        "speaker": "Text",
        "en": "As_soon_as_I_arrive → /əˈsuːnəzaɪəˈraɪv/",
        "ar": "أول ما أوصل"
      },
      {
        "speaker": "Text",
        "en": "Put_it_on → /pʊˈdɪdɑːn/",
        "ar": "البسه"
      },
      {
        "speaker": "Text",
        "en": "I'll be there in_an_hour → /ɪnəˈnaʊər/",
        "ar": "بكون هناك بعد ساعة"
      },
      {
        "speaker": "Text",
        "en": "Go(w)out and(d)enjoy it → /ɡoʊwaʊt ənɪnˈdʒɔɪɪt/",
        "ar": "اطلع واستمتع"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Text: Not_at_all → /nɑːdəˈdɔːl/\nText: Check_it_out → /tʃɛkɪˈdaʊt/\nText: As_soon_as_I_arrive → /əˈsuːnəzaɪəˈraɪv/\nText: Put_it_on → /pʊˈdɪdɑːn/\nText: I'll be there in_an_hour → /ɪnəˈnaʊər/\nText: Go(w)out and(d)enjoy it → /ɡoʊwaʊt ənɪnˈdʒɔɪɪt/",
      "questions": [
        {
          "questionAr": "check it out تنسمع:",
          "questionEn": "'Check it out' sounds like:",
          "options": [
            "check / it / out",
            "che-ki-dout",
            "check-out-it"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: che-ki-dout"
        },
        {
          "questionAr": "أي صوت يربط go out؟",
          "questionEn": "Which sound links 'go' + 'out'?",
          "options": [
            "/j/",
            "/w/",
            "/h/"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: /w/"
        },
        {
          "questionAr": "Not at all تعني:",
          "questionEn": "'Not at all' means:",
          "options": [
            "العفو/أبداً",
            "مو كل شي",
            "ما في"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: العفو/أبداً"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Linking chains",
      "items": [
        "turn_it_off",
        "pick_it_up",
        "an_egg",
        "go(w)away",
        "I(j)agree"
      ],
      "tipAr": "اقرأ كأن العبارة كلمة وحدة طويلة."
    },
    "exercises": {
      "easy": [
        {
          "id": "srp_303_e1",
          "type": "meaning",
          "promptEn": "What does \"turn off\" mean?",
          "promptAr": "ما معنى \"turn off\"؟",
          "options": [
            "في كل مكان",
            "يطالع",
            "يطلع",
            "يطفي"
          ],
          "correctIndex": 3,
          "answer": "يطفي",
          "explanationAr": "\"turn off\" /tɜːrn ɔːf/ تعني: يطفي. مثال: Turn off the light."
        },
        {
          "id": "srp_303_e2",
          "type": "meaning",
          "promptEn": "What does \"pick up\" mean?",
          "promptAr": "ما معنى \"pick up\"؟",
          "options": [
            "ساعة",
            "أول ما",
            "يشيل/يرفع",
            "يطفي"
          ],
          "correctIndex": 2,
          "answer": "يشيل/يرفع",
          "explanationAr": "\"pick up\" /pɪk ʌp/ تعني: يشيل/يرفع. مثال: Pick it up."
        },
        {
          "id": "srp_303_e3",
          "type": "meaning",
          "promptEn": "What does \"go out\" mean?",
          "promptAr": "ما معنى \"go out\"؟",
          "options": [
            "في كل مكان",
            "أبداً/العفو",
            "يطلع",
            "يلبس"
          ],
          "correctIndex": 2,
          "answer": "يطلع",
          "explanationAr": "\"go out\" /ɡoʊ aʊt/ تعني: يطلع. مثال: Let's go out."
        },
        {
          "id": "srp_303_e4",
          "type": "meaning",
          "promptEn": "What does \"put on\" mean?",
          "promptAr": "ما معنى \"put on\"؟",
          "options": [
            "يطفي",
            "أبداً/العفو",
            "يلبس",
            "ساعة"
          ],
          "correctIndex": 2,
          "answer": "يلبس",
          "explanationAr": "\"put on\" /pʊt ɑːn/ تعني: يلبس. مثال: Put on your jacket."
        }
      ],
      "medium": [
        {
          "id": "srp_303_m1",
          "type": "gap",
          "promptEn": "Complete: ____, please.",
          "promptAr": "أكمل الفراغ: (طفّه لو سمحت.)",
          "options": [
            "Turn it off",
            "Turn off it",
            "Turn it of"
          ],
          "correctIndex": 0,
          "answer": "Turn it off, please.",
          "explanationAr": "الإجابة: Turn it off. ساكن + متحرك = ربط مباشر (an apple → anapple). متحرك + متحرك = نضيف /j/ أو /w/ خفيفة (I am → I-y-am, go out → go-w-out). نفس الساكن مرتين = ننطقه مرة طويلة (big girl)."
        },
        {
          "id": "srp_303_m2",
          "type": "gap",
          "promptEn": "Complete: Can I have ____?",
          "promptAr": "أكمل الفراغ: (أقدر آخذ تفاحة؟)",
          "options": [
            "the apple an",
            "an apple",
            "a apple"
          ],
          "correctIndex": 1,
          "answer": "Can I have an apple?",
          "explanationAr": "الإجابة: an apple. ساكن + متحرك = ربط مباشر (an apple → anapple). متحرك + متحرك = نضيف /j/ أو /w/ خفيفة (I am → I-y-am, go out → go-w-out). نفس الساكن مرتين = ننطقه مرة طويلة (big girl)."
        },
        {
          "id": "srp_303_m3",
          "type": "gap",
          "promptEn": "Complete: Let's ____ tonight.",
          "promptAr": "أكمل الفراغ: (خلنا نطلع الليلة.)",
          "options": [
            "go outside to",
            "go out",
            "out go"
          ],
          "correctIndex": 1,
          "answer": "Let's go out tonight.",
          "explanationAr": "الإجابة: go out. ساكن + متحرك = ربط مباشر (an apple → anapple). متحرك + متحرك = نضيف /j/ أو /w/ خفيفة (I am → I-y-am, go out → go-w-out). نفس الساكن مرتين = ننطقه مرة طويلة (big girl)."
        },
        {
          "id": "srp_303_m4",
          "type": "gap",
          "promptEn": "Complete: ____ and put it on.",
          "promptAr": "أكمل الفراغ: (شيله والبسه.)",
          "options": [
            "Pick it up",
            "Pick it",
            "Pick up it"
          ],
          "correctIndex": 0,
          "answer": "Pick it up and put it on.",
          "explanationAr": "الإجابة: Pick it up. ساكن + متحرك = ربط مباشر (an apple → anapple). متحرك + متحرك = نضيف /j/ أو /w/ خفيفة (I am → I-y-am, go out → go-w-out). نفس الساكن مرتين = ننطقه مرة طويلة (big girl)."
        }
      ],
      "hard": [
        {
          "id": "srp_303_h1",
          "type": "order",
          "promptEn": "Put the words in order: home / at / all / am / evening. / I",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (أنا في البيت طول المساء.)",
          "answer": "I am at home all evening.",
          "explanationAr": "الترتيب الصحيح: I am at home all evening."
        },
        {
          "id": "srp_303_h2",
          "type": "order",
          "promptEn": "Put the words in order: Is / it / an / one? / old",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (هو قديم؟)",
          "answer": "Is it an old one?",
          "explanationAr": "الترتيب الصحيح: Is it an old one?"
        },
        {
          "id": "srp_303_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أقدر آخذ تفاحة؟",
          "answer": "Can I have an apple?",
          "explanationAr": "ترجمة مقترحة: Can I have an apple?"
        },
        {
          "id": "srp_303_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: شيله والبسه.",
          "answer": "Pick it up and put it on.",
          "explanationAr": "ترجمة مقترحة: Pick it up and put it on."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Glottal stop before vowels: «إن ءِبِل»",
        "correct": "an apple /əˈnæpəl/",
        "whyAr": "تخلص من الهمزة بين الكلمات."
      },
      {
        "incorrect": "Not understanding natives because of linking",
        "correct": "Practise listening to linked chunks",
        "whyAr": "الربط سبب صعوبة فهم المتحدث الأصلي."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (قراءة اللافتات والتعليمات): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Pull = اسحب, Push = ادفع",
          "Push the door when it says Pull"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Pull = اسحب, Push = ادفع — أشهر غلطة!",
        "fromLessonId": "srp_321_m"
      },
      {
        "questionAr": "مراجعة (نبر الجملة: الكلمات المهمة أقوى): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I-WANT-A-CUP-OF-TEA (all equal)",
          "I WANT a CUP of TEA"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I WANT a CUP of TEA — التساوي يخلي الكلام آلي.",
        "fromLessonId": "srp_319"
      },
      {
        "questionAr": "مراجعة (تجمعات الحروف الساكنة: street و spring): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "student /ˈstuːdənt/",
          "estudent"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: student /ˈstuːdənt/ — لا همزة قبل s.",
        "fromLessonId": "srp_316"
      },
      {
        "questionAr": "ما معنى \"kindness\"؟",
        "questionEn": "What does \"kindness\" mean?",
        "options": [
          "الفقراء",
          "صياد سمك",
          "طيبة/لطف",
          "ثقيل"
        ],
        "correctIndex": 2,
        "explanationAr": "\"kindness\" /ˈkaɪndnəs/ تعني: طيبة/لطف. مثال: his kindness",
        "fromLessonId": "srp_320"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (خلنا نطلع الليلة.)",
          "questionEn": "Complete: Let's ____ tonight.",
          "options": [
            "go outside to",
            "go out",
            "out go"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: go out. ساكن + متحرك = ربط مباشر (an apple → anapple). متحرك + متحرك = نضيف /j/ أو /w/ خفيفة (I am → I-y-am, go out → go-w-out). نفس الساكن مرتين = ننطقه مرة طويلة (big girl)."
        },
        {
          "questionAr": "أكمل الفراغ: (شيله والبسه.)",
          "questionEn": "Complete: ____ and put it on.",
          "options": [
            "Pick it up",
            "Pick it",
            "Pick up it"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: Pick it up. ساكن + متحرك = ربط مباشر (an apple → anapple). متحرك + متحرك = نضيف /j/ أو /w/ خفيفة (I am → I-y-am, go out → go-w-out). نفس الساكن مرتين = ننطقه مرة طويلة (big girl)."
        },
        {
          "questionAr": "ما معنى \"look at\"؟",
          "questionEn": "What does \"look at\" mean?",
          "options": [
            "يطالع",
            "ساعة",
            "يطفي",
            "يشيل/يرفع"
          ],
          "correctIndex": 0,
          "explanationAr": "\"look at\" /lʊk æt/ تعني: يطالع. مثال: Look at it!"
        },
        {
          "questionAr": "ما معنى \"check in\"؟",
          "questionEn": "What does \"check in\" mean?",
          "options": [
            "يطفي",
            "يطالع",
            "يسجل دخول",
            "أول ما"
          ],
          "correctIndex": 2,
          "explanationAr": "\"check in\" /tʃɛk ɪn/ تعني: يسجل دخول. مثال: Check in online."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Glottal stop before vowels: «إن ءِبِل»",
            "an apple /əˈnæpəl/"
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: an apple /əˈnæpəl/ — تخلص من الهمزة بين الكلمات."
        }
      ]
    }
  },
  {
    "id": "srp_322",
    "pillarId": "reading",
    "pillarNameAr": "القراءة التعبيرية والنطق الصوتي",
    "pillarNameEn": "Expressive Reading & Pronunciation Lab",
    "pillarIcon": "📖",
    "level": "متوسط (Intermediate)",
    "levelCode": "B1-B2",
    "titleAr": "الصيغ الضعيفة: can, to, of, and, for",
    "titleEn": "Weak Forms: can, to, of, and, for",
    "descAr": "الكلمات الصغيرة لها نطق ضعيف في الجملة: fish and chips = «فيشن تشيبس».",
    "descEn": "Small words have weak forms in sentences: fish 'n' chips.",
    "speakingGoalAr": "اقرأ وافهم جملاً فيها صيغ ضعيفة.",
    "speakingGoalEn": "Read and understand sentences with weak forms.",
    "keyPattern": {
      "ruleAr": "في الجملة: and → /ən/ أو /n/، to → /tə/، of → /əv/، for → /fər/، can → /kən/، are → /ər/، was → /wəz/. القوية فقط عند التأكيد أو في آخر الجملة.",
      "ruleEn": "and /ən/, to /tə/, of /əv/, for /fər/, can /kən/, are /ər/, was /wəz/; strong only for emphasis or at the end.",
      "formula": "fish /ən/ chips | a cup /əv/ tea | go /tə/ school | I /kən/ swim"
    },
    "practicalExamples": [
      {
        "en": "Fish and chips, please.",
        "ar": "سمك وبطاطس لو سمحت."
      },
      {
        "en": "I want to go to school.",
        "ar": "أبي أروح المدرسة."
      },
      {
        "en": "A cup of coffee for me.",
        "ar": "كوب قهوة لي."
      },
      {
        "en": "I can swim. — Can you? Yes, I CAN.",
        "ar": "أقدر أسبح. — صدق؟ إيه أقدر."
      },
      {
        "en": "Where are you from?",
        "ar": "من وين أنت؟"
      },
      {
        "en": "This is for you.",
        "ar": "هذا لك."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Fish AND chips (strong)",
        "correct": "fish 'n' chips /fɪʃən tʃɪps/",
        "whyAr": "and ضعيفة."
      },
      {
        "incorrect": "I want TOO go",
        "correct": "I want to go /tə ɡoʊ/",
        "whyAr": "to ضعيفة /tə/."
      },
      {
        "incorrect": "Yes, I /kən/.",
        "correct": "Yes, I can /kæn/.",
        "whyAr": "في آخر الجملة قوية."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اقرأ الحوار مع سارة بصيغ ضعيفة طبيعية.",
      "promptEn": "Read the dialogue with Sara using natural weak forms.",
      "saraQuestionAr": "What are you looking for?",
      "saraQuestionEn": "What are you looking for?",
      "recommendedResponseEn": "A gift for my mum. Can I pay by card? I want to get it wrapped, too."
    },
    "quiz": [
      {
        "questionAr": "نطق and في salt and pepper:",
        "questionEn": "'and' in salt and pepper:",
        "options": [
          "/ænd/",
          "/ən/",
          "/ɛnd/"
        ],
        "correctIndex": 1,
        "explanationAr": "ضعيفة."
      },
      {
        "questionAr": "متى can قوية؟",
        "questionEn": "When is 'can' strong?",
        "options": [
          "always",
          "at the end / for emphasis",
          "never"
        ],
        "correctIndex": 1,
        "explanationAr": "Yes, I CAN."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Fish AND chips (strong)",
          "fish 'n' chips /fɪʃən tʃɪps/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: fish 'n' chips /fɪʃən tʃɪps/ — and ضعيفة."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I want to go /tə ɡoʊ/",
          "I want TOO go"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I want to go /tə ɡoʊ/ — to ضعيفة /tə/."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Yes, I /kən/.",
          "Yes, I can /kæn/."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Yes, I can /kæn/. — في آخر الجملة قوية."
      }
    ],
    "whiteboardNotes": {
      "title": "Weak Forms: can, to, of, and, for",
      "pointsAr": [
        "ينطق الصيغ الضعيفة.",
        "يفهمها عند الاستماع.",
        "يعرف متى تكون قوية.",
        "في الجملة: and → /ən/ أو /n/، to → /tə/، of → /əv/، for → /fər/، can → /kən/، are → /ər/، was → /wəz/. القوية فقط عند التأكيد أو في آخر الجملة."
      ],
      "pointsEn": [
        "Use weak forms.",
        "Recognise them when listening.",
        "Know when they're strong.",
        "and /ən/, to /tə/, of /əv/, for /fər/, can /kən/, are /ər/, was /wəz/; strong only for emphasis or at the end."
      ],
      "chalkHighlight": "fish /ən/ chips | a cup /əv/ tea | go /tə/ school | I /kən/ swim"
    },
    "unit": 5,
    "cefr": "B1",
    "objectivesAr": [
      "ينطق الصيغ الضعيفة.",
      "يفهمها عند الاستماع.",
      "يعرف متى تكون قوية."
    ],
    "objectivesEn": [
      "Use weak forms.",
      "Recognise them when listening.",
      "Know when they're strong."
    ],
    "vocabulary": [
      {
        "word": "weak form",
        "ipa": "/wiːk fɔːrm/",
        "ar": "صيغة ضعيفة",
        "exampleEn": "Use weak forms.",
        "exampleAr": "استخدم الصيغ الضعيفة."
      },
      {
        "word": "and",
        "ipa": "/ən/",
        "ar": "و",
        "exampleEn": "salt and pepper",
        "exampleAr": "ملح وفلفل"
      },
      {
        "word": "to",
        "ipa": "/tə/",
        "ar": "إلى/لـ",
        "exampleEn": "to the mall",
        "exampleAr": "للمول"
      },
      {
        "word": "of",
        "ipa": "/əv/",
        "ar": "من (جزء)",
        "exampleEn": "a lot of",
        "exampleAr": "كثير من"
      },
      {
        "word": "for",
        "ipa": "/fər/",
        "ar": "لـ",
        "exampleEn": "for you",
        "exampleAr": "لك"
      },
      {
        "word": "can",
        "ipa": "/kən/",
        "ar": "يقدر",
        "exampleEn": "I can help.",
        "exampleAr": "أقدر أساعد."
      },
      {
        "word": "are",
        "ipa": "/ər/",
        "ar": "يكون (جمع)",
        "exampleEn": "They are here.",
        "exampleAr": "هم هنا."
      },
      {
        "word": "from",
        "ipa": "/frəm/",
        "ar": "من",
        "exampleEn": "from Riyadh",
        "exampleAr": "من الرياض"
      },
      {
        "word": "a lot of",
        "ipa": "/ə ˈlɑːtəv/",
        "ar": "كثير",
        "exampleEn": "a lot of people",
        "exampleAr": "ناس كثير"
      },
      {
        "word": "salt and pepper",
        "ipa": "/sɔːlt ən ˈpɛpər/",
        "ar": "ملح وفلفل",
        "exampleEn": "Pass the salt and pepper.",
        "exampleAr": "ناولني الملح والفلفل."
      }
    ],
    "grammarFocus": {
      "ruleAr": "في الجملة: and → /ən/ أو /n/، to → /tə/، of → /əv/، for → /fər/، can → /kən/، are → /ər/، was → /wəz/. القوية فقط عند التأكيد أو في آخر الجملة.",
      "ruleEn": "and /ən/, to /tə/, of /əv/, for /fər/, can /kən/, are /ər/, was /wəz/; strong only for emphasis or at the end.",
      "formula": "fish /ən/ chips | a cup /əv/ tea | go /tə/ school | I /kən/ swim",
      "examples": [
        {
          "en": "Fish and chips, please.",
          "ar": "سمك وبطاطس لو سمحت."
        },
        {
          "en": "I want to go to school.",
          "ar": "أبي أروح المدرسة."
        },
        {
          "en": "A cup of coffee for me.",
          "ar": "كوب قهوة لي."
        },
        {
          "en": "I can swim. — Can you? Yes, I CAN.",
          "ar": "أقدر أسبح. — صدق؟ إيه أقدر."
        },
        {
          "en": "Where are you from?",
          "ar": "من وين أنت؟"
        },
        {
          "en": "This is for you.",
          "ar": "هذا لك."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "What are you looking for?",
        "ar": "وش تدور؟"
      },
      {
        "speaker": "Student",
        "en": "A gift for my mum.",
        "ar": "هدية لأمي."
      },
      {
        "speaker": "Sara",
        "en": "How about a box of chocolates and some flowers?",
        "ar": "وش رايك علبة شوكولاتة وورد؟"
      },
      {
        "speaker": "Student",
        "en": "Good idea. Can I pay by card?",
        "ar": "فكرة حلوة. أقدر أدفع بالبطاقة؟"
      },
      {
        "speaker": "Sara",
        "en": "Yes, you can.",
        "ar": "إيه تقدر."
      },
      {
        "speaker": "Student",
        "en": "Great. I want to get it wrapped, too.",
        "ar": "ممتاز. أبيها مغلفة بعد."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: What are you looking for?\nStudent: A gift for my mum.\nSara: How about a box of chocolates and some flowers?\nStudent: Good idea. Can I pay by card?\nSara: Yes, you can.\nStudent: Great. I want to get it wrapped, too.",
      "questions": [
        {
          "questionAr": "لمين الهدية؟",
          "questionEn": "Who is the gift for?",
          "options": [
            "his sister",
            "his mum",
            "his teacher"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: his mum"
        },
        {
          "questionAr": "اقتراح سارة؟",
          "questionEn": "What does Sara suggest?",
          "options": [
            "perfume",
            "chocolates and flowers",
            "a watch"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: chocolates and flowers"
        },
        {
          "questionAr": "يقدر يدفع بالبطاقة؟",
          "questionEn": "Can he pay by card?",
          "options": [
            "Yes",
            "No"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: Yes"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Strong vs weak",
      "items": [
        "Can you? → Yes, I CAN /kæn/",
        "I can swim /aɪ kən swɪm/",
        "What are you /ˈwʌdərjə/ looking for /fɔːr/?"
      ],
      "tipAr": "في آخر الجملة الكلمة ترجع قوية: What are you looking FOR?"
    },
    "exercises": {
      "easy": [
        {
          "id": "srp_322_e1",
          "type": "meaning",
          "promptEn": "What does \"weak form\" mean?",
          "promptAr": "ما معنى \"weak form\"؟",
          "options": [
            "و",
            "ملح وفلفل",
            "يقدر",
            "صيغة ضعيفة"
          ],
          "correctIndex": 3,
          "answer": "صيغة ضعيفة",
          "explanationAr": "\"weak form\" /wiːk fɔːrm/ تعني: صيغة ضعيفة. مثال: Use weak forms."
        },
        {
          "id": "srp_322_e2",
          "type": "meaning",
          "promptEn": "What does \"and\" mean?",
          "promptAr": "ما معنى \"and\"؟",
          "options": [
            "إلى/لـ",
            "و",
            "لـ",
            "من"
          ],
          "correctIndex": 1,
          "answer": "و",
          "explanationAr": "\"and\" /ən/ تعني: و. مثال: salt and pepper"
        },
        {
          "id": "srp_322_e3",
          "type": "meaning",
          "promptEn": "What does \"to\" mean?",
          "promptAr": "ما معنى \"to\"؟",
          "options": [
            "يكون (جمع)",
            "ملح وفلفل",
            "إلى/لـ",
            "صيغة ضعيفة"
          ],
          "correctIndex": 2,
          "answer": "إلى/لـ",
          "explanationAr": "\"to\" /tə/ تعني: إلى/لـ. مثال: to the mall"
        },
        {
          "id": "srp_322_e4",
          "type": "meaning",
          "promptEn": "What does \"of\" mean?",
          "promptAr": "ما معنى \"of\"؟",
          "options": [
            "لـ",
            "يكون (جمع)",
            "إلى/لـ",
            "من (جزء)"
          ],
          "correctIndex": 3,
          "answer": "من (جزء)",
          "explanationAr": "\"of\" /əv/ تعني: من (جزء). مثال: a lot of"
        }
      ],
      "medium": [
        {
          "id": "srp_322_m1",
          "type": "gap",
          "promptEn": "Complete: Fish ____ chips, please.",
          "promptAr": "أكمل الفراغ: (سمك وبطاطس لو سمحت.)",
          "options": [
            "end",
            "and",
            "an"
          ],
          "correctIndex": 1,
          "answer": "Fish and chips, please.",
          "explanationAr": "الإجابة: and. في الجملة: and → /ən/ أو /n/، to → /tə/، of → /əv/، for → /fər/، can → /kən/، are → /ər/، was → /wəz/. القوية فقط عند التأكيد أو في آخر الجملة."
        },
        {
          "id": "srp_322_m2",
          "type": "gap",
          "promptEn": "Complete: I want ____ go to school.",
          "promptAr": "أكمل الفراغ: (أبي أروح المدرسة.)",
          "options": [
            "two",
            "to",
            "too"
          ],
          "correctIndex": 1,
          "answer": "I want to go to school.",
          "explanationAr": "الإجابة: to. في الجملة: and → /ən/ أو /n/، to → /tə/، of → /əv/، for → /fər/، can → /kən/، are → /ər/، was → /wəz/. القوية فقط عند التأكيد أو في آخر الجملة."
        },
        {
          "id": "srp_322_m3",
          "type": "gap",
          "promptEn": "Complete: A cup ____ coffee for me.",
          "promptAr": "أكمل الفراغ: (كوب قهوة لي.)",
          "options": [
            "of",
            "for",
            "off"
          ],
          "correctIndex": 0,
          "answer": "A cup of coffee for me.",
          "explanationAr": "الإجابة: of. في الجملة: and → /ən/ أو /n/، to → /tə/، of → /əv/، for → /fər/، can → /kən/، are → /ər/، was → /wəz/. القوية فقط عند التأكيد أو في آخر الجملة."
        },
        {
          "id": "srp_322_m4",
          "type": "gap",
          "promptEn": "Complete: I ____ swim. — Can you? Yes, I CAN.",
          "promptAr": "أكمل الفراغ: (أقدر أسبح. — صدق؟ إيه أقدر.)",
          "options": [
            "can",
            "can't",
            "could"
          ],
          "correctIndex": 0,
          "answer": "I can swim. — Can you? Yes, I CAN.",
          "explanationAr": "الإجابة: can. في الجملة: and → /ən/ أو /n/، to → /tə/، of → /əv/، for → /fər/، can → /kən/، are → /ər/، was → /wəz/. القوية فقط عند التأكيد أو في آخر الجملة."
        }
      ],
      "hard": [
        {
          "id": "srp_322_h1",
          "type": "order",
          "promptEn": "Put the words in order: are / from? / you / Where",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (من وين أنت؟)",
          "answer": "Where are you from?",
          "explanationAr": "الترتيب الصحيح: Where are you from?"
        },
        {
          "id": "srp_322_h2",
          "type": "order",
          "promptEn": "Put the words in order: is / for / you. / This",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (هذا لك.)",
          "answer": "This is for you.",
          "explanationAr": "الترتيب الصحيح: This is for you."
        },
        {
          "id": "srp_322_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أبي أروح المدرسة.",
          "answer": "I want to go to school.",
          "explanationAr": "ترجمة مقترحة: I want to go to school."
        },
        {
          "id": "srp_322_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أقدر أسبح. — صدق؟ إيه أقدر.",
          "answer": "I can swim. — Can you? Yes, I CAN.",
          "explanationAr": "ترجمة مقترحة: I can swim. — Can you? Yes, I CAN."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Every 'to' as «تو» long",
        "correct": "to /tə/",
        "whyAr": "صيغة قوية دايماً = نطق غير طبيعي."
      },
      {
        "incorrect": "Not hearing 'can' vs 'can't'",
        "correct": "can /kən/ short, can't /kænt/ long+stressed",
        "whyAr": "الفرق في الطول والضغط."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (الكلام المتصل: ربط الكلمات): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Inserting a glottal stop: an ʔapple",
          "an_apple /əˈnæpəl/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: an_apple /əˈnæpəl/ — العربي يضع همزة قبل الحرف المتحرك؛ الإنجليزي يربط.",
        "fromLessonId": "srp_303"
      },
      {
        "questionAr": "مراجعة (قراءة قصة قصيرة وفهمها): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Stopping at every new word",
          "Guess from context and keep reading"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Guess from context and keep reading — التوقف يضيع الفكرة.",
        "fromLessonId": "srp_320"
      },
      {
        "questionAr": "مراجعة (الصوت الضعيف schwa /ə/): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "bə-NA-nə /bəˈnænə/",
          "ba-NA-NA (all full vowels)"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: bə-NA-nə /bəˈnænə/ — أضعف المقطعين الأول والأخير.",
        "fromLessonId": "srp_317"
      },
      {
        "questionAr": "ما معنى \"closed\"؟",
        "questionEn": "What does \"closed\" mean?",
        "options": [
          "مخرج",
          "ادفع",
          "مغلق",
          "مدخل"
        ],
        "correctIndex": 2,
        "explanationAr": "\"closed\" /kloʊzd/ تعني: مغلق. مثال: Closed for prayer",
        "fromLessonId": "srp_321_m"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (كوب قهوة لي.)",
          "questionEn": "Complete: A cup ____ coffee for me.",
          "options": [
            "of",
            "for",
            "off"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: of. في الجملة: and → /ən/ أو /n/، to → /tə/، of → /əv/، for → /fər/، can → /kən/، are → /ər/، was → /wəz/. القوية فقط عند التأكيد أو في آخر الجملة."
        },
        {
          "questionAr": "أكمل الفراغ: (أقدر أسبح. — صدق؟ إيه أقدر.)",
          "questionEn": "Complete: I ____ swim. — Can you? Yes, I CAN.",
          "options": [
            "can",
            "can't",
            "could"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: can. في الجملة: and → /ən/ أو /n/، to → /tə/، of → /əv/، for → /fər/، can → /kən/، are → /ər/، was → /wəz/. القوية فقط عند التأكيد أو في آخر الجملة."
        },
        {
          "questionAr": "ما معنى \"for\"؟",
          "questionEn": "What does \"for\" mean?",
          "options": [
            "إلى/لـ",
            "ملح وفلفل",
            "من",
            "لـ"
          ],
          "correctIndex": 3,
          "explanationAr": "\"for\" /fər/ تعني: لـ. مثال: for you"
        },
        {
          "questionAr": "ما معنى \"can\"؟",
          "questionEn": "What does \"can\" mean?",
          "options": [
            "يقدر",
            "و",
            "صيغة ضعيفة",
            "إلى/لـ"
          ],
          "correctIndex": 0,
          "explanationAr": "\"can\" /kən/ تعني: يقدر. مثال: I can help."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "to /tə/",
            "Every 'to' as «تو» long"
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: to /tə/ — صيغة قوية دايماً = نطق غير طبيعي."
        }
      ]
    }
  },
  {
    "id": "srp_323",
    "pillarId": "reading",
    "pillarNameAr": "القراءة التعبيرية والنطق الصوتي",
    "pillarNameEn": "Expressive Reading & Pronunciation Lab",
    "pillarIcon": "📖",
    "level": "متوسط (Intermediate)",
    "levelCode": "B1-B2",
    "titleAr": "التنغيم: صعود ونزول الصوت",
    "titleEn": "Intonation: Rising and Falling Tones",
    "descAr": "التنغيم يغير المعنى والمشاعر: سؤال، تأكيد، اهتمام، ملل.",
    "descEn": "Intonation changes meaning and feeling: question, certainty, interest, boredom.",
    "speakingGoalAr": "اقرأ عشر جمل بالتنغيم المناسب.",
    "speakingGoalEn": "Read ten sentences with the right intonation.",
    "keyPattern": {
      "ruleAr": "↘ نازل: جمل خبرية وأسئلة wh. ↗ صاعد: أسئلة نعم/لا وعدم اكتمال الكلام. ↘↗ نازل-صاعد: تحفظ أو أدب. في القوائم: صاعد ↗ لكل عنصر ونازل ↘ للأخير.",
      "ruleEn": "Fall for statements/wh-questions; rise for yes/no and unfinished ideas; fall-rise for reservation; lists rise then fall at the end.",
      "formula": "Statement ↘ | wh-question ↘ | yes/no ↗ | list ↗ ↗ ↘"
    },
    "practicalExamples": [
      {
        "en": "Where do you live? ↘",
        "ar": "وين تسكن؟"
      },
      {
        "en": "Do you live in Riyadh? ↗",
        "ar": "تسكن الرياض؟"
      },
      {
        "en": "I need eggs ↗, milk ↗, and bread ↘.",
        "ar": "أحتاج بيض وحليب وخبز."
      },
      {
        "en": "It's nice ↘↗... but expensive.",
        "ar": "حلو... بس غالي."
      },
      {
        "en": "Really? ↗ That's amazing! ↘",
        "ar": "صدق؟ رهيب!"
      },
      {
        "en": "Thank you ↘ very much.",
        "ar": "شكراً جزيلاً."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Where do you live? ↗ (rising)",
        "correct": "Where do you live? ↘",
        "whyAr": "أسئلة wh نازلة."
      },
      {
        "incorrect": "Flat 'Thank you' →",
        "correct": "Thank you ↘ (warm fall)",
        "whyAr": "الصوت المسطح يبين ملل."
      },
      {
        "incorrect": "Rising on every item including last",
        "correct": "eggs ↗, milk ↗, and bread ↘",
        "whyAr": "النزول يقول: خلصت القائمة."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اقرأ حوار العرس بالتنغيم المكتوب.",
      "promptEn": "Read the wedding dialogue following the arrows.",
      "saraQuestionAr": "Are you coming to the wedding? ↗",
      "saraQuestionEn": "Are you coming to the wedding? ↗",
      "recommendedResponseEn": "Yes ↘. When is it? ↘ Should I bring flowers ↗, chocolates ↗, or perfume ↘?"
    },
    "quiz": [
      {
        "questionAr": "Where are you going? تنغيمها:",
        "questionEn": "Intonation of 'Where are you going?':",
        "options": [
          "↗",
          "↘"
        ],
        "correctIndex": 1,
        "explanationAr": "wh ⇐ ↘."
      },
      {
        "questionAr": "آخر عنصر في القائمة:",
        "questionEn": "Last item in a list:",
        "options": [
          "↗",
          "↘"
        ],
        "correctIndex": 1,
        "explanationAr": "↘ يقفل القائمة."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Where do you live? ↘",
          "Where do you live? ↗ (rising)"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Where do you live? ↘ — أسئلة wh نازلة."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Thank you ↘ (warm fall)",
          "Flat 'Thank you' →"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Thank you ↘ (warm fall) — الصوت المسطح يبين ملل."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "eggs ↗, milk ↗, and bread ↘",
          "Rising on every item including last"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: eggs ↗, milk ↗, and bread ↘ — النزول يقول: خلصت القائمة."
      }
    ],
    "whiteboardNotes": {
      "title": "Intonation: Rising and Falling Tones",
      "pointsAr": [
        "يستخدم النزول للجمل الخبرية.",
        "يستخدم الصعود لأسئلة نعم/لا.",
        "ينغّم القوائم.",
        "↘ نازل: جمل خبرية وأسئلة wh. ↗ صاعد: أسئلة نعم/لا وعدم اكتمال الكلام. ↘↗ نازل-صاعد: تحفظ أو أدب. في القوائم: صاعد ↗ لكل عنصر ونازل ↘ للأخير."
      ],
      "pointsEn": [
        "Fall on statements.",
        "Rise on yes/no questions.",
        "Use list intonation.",
        "Fall for statements/wh-questions; rise for yes/no and unfinished ideas; fall-rise for reservation; lists rise then fall at the end."
      ],
      "chalkHighlight": "Statement ↘ | wh-question ↘ | yes/no ↗ | list ↗ ↗ ↘"
    },
    "unit": 5,
    "cefr": "B1",
    "objectivesAr": [
      "يستخدم النزول للجمل الخبرية.",
      "يستخدم الصعود لأسئلة نعم/لا.",
      "ينغّم القوائم."
    ],
    "objectivesEn": [
      "Fall on statements.",
      "Rise on yes/no questions.",
      "Use list intonation."
    ],
    "vocabulary": [
      {
        "word": "intonation",
        "ipa": "/ˌɪntəˈneɪʃən/",
        "ar": "تنغيم",
        "exampleEn": "rising intonation",
        "exampleAr": "تنغيم صاعد"
      },
      {
        "word": "rise",
        "ipa": "/raɪz/",
        "ar": "صعود",
        "exampleEn": "a rise at the end",
        "exampleAr": "صعود في الآخر"
      },
      {
        "word": "fall",
        "ipa": "/fɔːl/",
        "ar": "نزول",
        "exampleEn": "a falling tone",
        "exampleAr": "نغمة نازلة"
      },
      {
        "word": "tone",
        "ipa": "/toʊn/",
        "ar": "نبرة",
        "exampleEn": "a friendly tone",
        "exampleAr": "نبرة ودودة"
      },
      {
        "word": "polite",
        "ipa": "/pəˈlaɪt/",
        "ar": "مهذب",
        "exampleEn": "a polite request",
        "exampleAr": "طلب مهذب"
      },
      {
        "word": "bored",
        "ipa": "/bɔːrd/",
        "ar": "ملول",
        "exampleEn": "You sound bored.",
        "exampleAr": "صوتك ملول."
      },
      {
        "word": "interested",
        "ipa": "/ˈɪntrəstɪd/",
        "ar": "مهتم",
        "exampleEn": "Sound interested!",
        "exampleAr": "بيّن اهتمامك!"
      },
      {
        "word": "list",
        "ipa": "/lɪst/",
        "ar": "قائمة",
        "exampleEn": "a shopping list",
        "exampleAr": "قائمة مقاضي"
      },
      {
        "word": "certain",
        "ipa": "/ˈsɜːrtən/",
        "ar": "متأكد",
        "exampleEn": "I'm certain.",
        "exampleAr": "متأكد."
      },
      {
        "word": "doubt",
        "ipa": "/daʊt/",
        "ar": "شك",
        "exampleEn": "I have my doubts.",
        "exampleAr": "عندي شكوك."
      }
    ],
    "grammarFocus": {
      "ruleAr": "↘ نازل: جمل خبرية وأسئلة wh. ↗ صاعد: أسئلة نعم/لا وعدم اكتمال الكلام. ↘↗ نازل-صاعد: تحفظ أو أدب. في القوائم: صاعد ↗ لكل عنصر ونازل ↘ للأخير.",
      "ruleEn": "Fall for statements/wh-questions; rise for yes/no and unfinished ideas; fall-rise for reservation; lists rise then fall at the end.",
      "formula": "Statement ↘ | wh-question ↘ | yes/no ↗ | list ↗ ↗ ↘",
      "examples": [
        {
          "en": "Where do you live? ↘",
          "ar": "وين تسكن؟"
        },
        {
          "en": "Do you live in Riyadh? ↗",
          "ar": "تسكن الرياض؟"
        },
        {
          "en": "I need eggs ↗, milk ↗, and bread ↘.",
          "ar": "أحتاج بيض وحليب وخبز."
        },
        {
          "en": "It's nice ↘↗... but expensive.",
          "ar": "حلو... بس غالي."
        },
        {
          "en": "Really? ↗ That's amazing! ↘",
          "ar": "صدق؟ رهيب!"
        },
        {
          "en": "Thank you ↘ very much.",
          "ar": "شكراً جزيلاً."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Are you coming to the wedding? ↗",
        "ar": "بتجي العرس؟"
      },
      {
        "speaker": "Student",
        "en": "Yes ↘. When is it? ↘",
        "ar": "إيه. متى؟"
      },
      {
        "speaker": "Sara",
        "en": "On Thursday ↘. Can you bring the gift? ↗",
        "ar": "الخميس. تقدر تجيب الهدية؟"
      },
      {
        "speaker": "Student",
        "en": "Sure ↘. Should I bring flowers ↗, chocolates ↗, or perfume ↘?",
        "ar": "أكيد. أجيب ورد ولا شوكولاتة ولا عطر؟"
      },
      {
        "speaker": "Sara",
        "en": "Perfume ↘. She loves oud.",
        "ar": "عطر. تحب العود."
      },
      {
        "speaker": "Student",
        "en": "Great ↘. See you there! ↘",
        "ar": "تمام. أشوفك هناك!"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Are you coming to the wedding? ↗\nStudent: Yes ↘. When is it? ↘\nSara: On Thursday ↘. Can you bring the gift? ↗\nStudent: Sure ↘. Should I bring flowers ↗, chocolates ↗, or perfume ↘?\nSara: Perfume ↘. She loves oud.\nStudent: Great ↘. See you there! ↘",
      "questions": [
        {
          "questionAr": "متى العرس؟",
          "questionEn": "When is the wedding?",
          "options": [
            "Wednesday",
            "Thursday",
            "Friday"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: Thursday"
        },
        {
          "questionAr": "وش الهدية؟",
          "questionEn": "What gift will he bring?",
          "options": [
            "flowers",
            "chocolates",
            "perfume"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: perfume"
        },
        {
          "questionAr": "وش تحب العروس؟",
          "questionEn": "What does the bride love?",
          "options": [
            "roses",
            "oud",
            "gold"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: oud"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Mark the arrows",
      "items": [
        "Are you OK? ↗",
        "What's wrong? ↘",
        "Red ↗, green ↗, or blue ↘?"
      ],
      "tipAr": "حرك يدك مع صوتك: فوق للصعود، تحت للنزول."
    },
    "exercises": {
      "easy": [
        {
          "id": "srp_323_e1",
          "type": "meaning",
          "promptEn": "What does \"intonation\" mean?",
          "promptAr": "ما معنى \"intonation\"؟",
          "options": [
            "شك",
            "ملول",
            "تنغيم",
            "نزول"
          ],
          "correctIndex": 2,
          "answer": "تنغيم",
          "explanationAr": "\"intonation\" /ˌɪntəˈneɪʃən/ تعني: تنغيم. مثال: rising intonation"
        },
        {
          "id": "srp_323_e2",
          "type": "meaning",
          "promptEn": "What does \"rise\" mean?",
          "promptAr": "ما معنى \"rise\"؟",
          "options": [
            "ملول",
            "مهتم",
            "صعود",
            "قائمة"
          ],
          "correctIndex": 2,
          "answer": "صعود",
          "explanationAr": "\"rise\" /raɪz/ تعني: صعود. مثال: a rise at the end"
        },
        {
          "id": "srp_323_e3",
          "type": "meaning",
          "promptEn": "What does \"fall\" mean?",
          "promptAr": "ما معنى \"fall\"؟",
          "options": [
            "قائمة",
            "نزول",
            "مهتم",
            "شك"
          ],
          "correctIndex": 1,
          "answer": "نزول",
          "explanationAr": "\"fall\" /fɔːl/ تعني: نزول. مثال: a falling tone"
        },
        {
          "id": "srp_323_e4",
          "type": "meaning",
          "promptEn": "What does \"tone\" mean?",
          "promptAr": "ما معنى \"tone\"؟",
          "options": [
            "نبرة",
            "مهذب",
            "قائمة",
            "متأكد"
          ],
          "correctIndex": 0,
          "answer": "نبرة",
          "explanationAr": "\"tone\" /toʊn/ تعني: نبرة. مثال: a friendly tone"
        }
      ],
      "medium": [
        {
          "id": "srp_323_m1",
          "type": "gap",
          "promptEn": "Complete: Where do you live? ____",
          "promptAr": "أكمل الفراغ: (وين تسكن؟)",
          "options": [
            "↗",
            "→",
            "↘"
          ],
          "correctIndex": 2,
          "answer": "Where do you live? ↘",
          "explanationAr": "الإجابة: ↘. ↘ نازل: جمل خبرية وأسئلة wh. ↗ صاعد: أسئلة نعم/لا وعدم اكتمال الكلام. ↘↗ نازل-صاعد: تحفظ أو أدب. في القوائم: صاعد ↗ لكل عنصر ونازل ↘ للأخير."
        },
        {
          "id": "srp_323_m2",
          "type": "gap",
          "promptEn": "Complete: Do you live in Riyadh? ____",
          "promptAr": "أكمل الفراغ: (تسكن الرياض؟)",
          "options": [
            "↘",
            "→",
            "↗"
          ],
          "correctIndex": 2,
          "answer": "Do you live in Riyadh? ↗",
          "explanationAr": "الإجابة: ↗. ↘ نازل: جمل خبرية وأسئلة wh. ↗ صاعد: أسئلة نعم/لا وعدم اكتمال الكلام. ↘↗ نازل-صاعد: تحفظ أو أدب. في القوائم: صاعد ↗ لكل عنصر ونازل ↘ للأخير."
        },
        {
          "id": "srp_323_m3",
          "type": "gap",
          "promptEn": "Complete: I need eggs ↗, milk ↗, and ____.",
          "promptAr": "أكمل الفراغ: (أحتاج بيض وحليب وخبز.)",
          "options": [
            "bread ↘",
            "bread ↗",
            "bread →"
          ],
          "correctIndex": 0,
          "answer": "I need eggs ↗, milk ↗, and bread ↘.",
          "explanationAr": "الإجابة: bread ↘. ↘ نازل: جمل خبرية وأسئلة wh. ↗ صاعد: أسئلة نعم/لا وعدم اكتمال الكلام. ↘↗ نازل-صاعد: تحفظ أو أدب. في القوائم: صاعد ↗ لكل عنصر ونازل ↘ للأخير."
        },
        {
          "id": "srp_323_m4",
          "type": "gap",
          "promptEn": "Complete: It's nice ____... but expensive.",
          "promptAr": "أكمل الفراغ: (حلو... بس غالي.)",
          "options": [
            "↘↗",
            "↘↘",
            "↗↗"
          ],
          "correctIndex": 0,
          "answer": "It's nice ↘↗... but expensive.",
          "explanationAr": "الإجابة: ↘↗. ↘ نازل: جمل خبرية وأسئلة wh. ↗ صاعد: أسئلة نعم/لا وعدم اكتمال الكلام. ↘↗ نازل-صاعد: تحفظ أو أدب. في القوائم: صاعد ↗ لكل عنصر ونازل ↘ للأخير."
        }
      ],
      "hard": [
        {
          "id": "srp_323_h1",
          "type": "order",
          "promptEn": "Put the words in order: ↗ / amazing! / ↘ / Really? / That's",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (صدق؟ رهيب!)",
          "answer": "Really? ↗ That's amazing! ↘",
          "explanationAr": "الترتيب الصحيح: Really? ↗ That's amazing! ↘"
        },
        {
          "id": "srp_323_h2",
          "type": "order",
          "promptEn": "Put the words in order: you / Thank / ↘ / very / much.",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (شكراً جزيلاً.)",
          "answer": "Thank you ↘ very much.",
          "explanationAr": "الترتيب الصحيح: Thank you ↘ very much."
        },
        {
          "id": "srp_323_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: تسكن الرياض؟",
          "answer": "Do you live in Riyadh? ↗",
          "explanationAr": "ترجمة مقترحة: Do you live in Riyadh? ↗"
        },
        {
          "id": "srp_323_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: حلو... بس غالي.",
          "answer": "It's nice ↘↗... but expensive.",
          "explanationAr": "ترجمة مقترحة: It's nice ↘↗... but expensive."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Flat Arabic-style intonation for English questions",
        "correct": "Clear ↗ on yes/no questions",
        "whyAr": "بدون صعود ممكن ينفهم سؤالك كجملة."
      },
      {
        "incorrect": "Sounding rude with a sharp fall on requests",
        "correct": "Soft rise: Could you help me? ↗",
        "whyAr": "النبرة الحادة تبدو أمراً."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (الصيغ الضعيفة: can, to, of, and, for): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I want TOO go",
          "I want to go /tə ɡoʊ/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I want to go /tə ɡoʊ/ — to ضعيفة /tə/.",
        "fromLessonId": "srp_322"
      },
      {
        "questionAr": "مراجعة (قراءة اللافتات والتعليمات): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Exit = entrance",
          "Exit = مخرج, Entrance = مدخل"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Exit = مخرج, Entrance = مدخل — لا تخلط.",
        "fromLessonId": "srp_321_m"
      },
      {
        "questionAr": "مراجعة (القراءة المعبرة: علامات الترقيم والوقفات): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Reading without pauses",
          "Pause at every comma and full stop"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Pause at every comma and full stop — القراءة المتواصلة تضيع المعنى.",
        "fromLessonId": "srp_318"
      },
      {
        "questionAr": "ما معنى \"an hour\"؟",
        "questionEn": "What does \"an hour\" mean?",
        "options": [
          "ساعة",
          "في كل مكان",
          "يطلع",
          "أول ما"
        ],
        "correctIndex": 0,
        "explanationAr": "\"an hour\" /ən aʊər/ تعني: ساعة. مثال: in an hour",
        "fromLessonId": "srp_303"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (أحتاج بيض وحليب وخبز.)",
          "questionEn": "Complete: I need eggs ↗, milk ↗, and ____.",
          "options": [
            "bread ↘",
            "bread ↗",
            "bread →"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: bread ↘. ↘ نازل: جمل خبرية وأسئلة wh. ↗ صاعد: أسئلة نعم/لا وعدم اكتمال الكلام. ↘↗ نازل-صاعد: تحفظ أو أدب. في القوائم: صاعد ↗ لكل عنصر ونازل ↘ للأخير."
        },
        {
          "questionAr": "أكمل الفراغ: (حلو... بس غالي.)",
          "questionEn": "Complete: It's nice ____... but expensive.",
          "options": [
            "↘↗",
            "↘↘",
            "↗↗"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: ↘↗. ↘ نازل: جمل خبرية وأسئلة wh. ↗ صاعد: أسئلة نعم/لا وعدم اكتمال الكلام. ↘↗ نازل-صاعد: تحفظ أو أدب. في القوائم: صاعد ↗ لكل عنصر ونازل ↘ للأخير."
        },
        {
          "questionAr": "ما معنى \"polite\"؟",
          "questionEn": "What does \"polite\" mean?",
          "options": [
            "مهذب",
            "شك",
            "صعود",
            "متأكد"
          ],
          "correctIndex": 0,
          "explanationAr": "\"polite\" /pəˈlaɪt/ تعني: مهذب. مثال: a polite request"
        },
        {
          "questionAr": "ما معنى \"bored\"؟",
          "questionEn": "What does \"bored\" mean?",
          "options": [
            "ملول",
            "شك",
            "نبرة",
            "مهتم"
          ],
          "correctIndex": 0,
          "explanationAr": "\"bored\" /bɔːrd/ تعني: ملول. مثال: You sound bored."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Flat Arabic-style intonation for English questions",
            "Clear ↗ on yes/no questions"
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: Clear ↗ on yes/no questions — بدون صعود ممكن ينفهم سؤالك كجملة."
        }
      ]
    }
  },
  {
    "id": "srp_324",
    "pillarId": "reading",
    "pillarNameAr": "القراءة التعبيرية والنطق الصوتي",
    "pillarNameEn": "Expressive Reading & Pronunciation Lab",
    "pillarIcon": "📖",
    "level": "متوسط (Intermediate)",
    "levelCode": "B1-B2",
    "titleAr": "القراءة السريعة للفكرة العامة (Skimming)",
    "titleEn": "Skimming a News Article for Gist",
    "descAr": "اقرأ خبراً في دقيقة وطلّع الفكرة الرئيسية بدون ما تقرأ كل كلمة.",
    "descEn": "Get the main idea of a news article in one minute without reading every word.",
    "speakingGoalAr": "لخص خبراً من ١٥٠ كلمة في جملة واحدة.",
    "speakingGoalEn": "Summarise a 150-word news item in one sentence.",
    "keyPattern": {
      "ruleAr": "Skimming: اقرأ العنوان، الجملة الأولى من كل فقرة، والأرقام والأسماء. تجاهل التفاصيل. اسأل: من؟ ماذا؟ أين؟ متى؟",
      "ruleEn": "Skim: headline, first sentence of each paragraph, names and numbers. Ask who/what/where/when.",
      "formula": "Headline → first sentences → key names/numbers → one-sentence gist"
    },
    "practicalExamples": [
      {
        "en": "Riyadh Metro carries one million passengers in first month.",
        "ar": "مترو الرياض ينقل مليون راكب في أول شهر."
      },
      {
        "en": "The new line opened on Sunday.",
        "ar": "الخط الجديد افتتح يوم الأحد."
      },
      {
        "en": "Officials say traffic has dropped by 10%.",
        "ar": "المسؤولون يقولون الزحمة نزلت ١٠٪."
      },
      {
        "en": "Experts expect the number to double next year.",
        "ar": "الخبراء يتوقعون العدد يتضاعف السنة الجاية."
      },
      {
        "en": "Many residents now leave their cars at home.",
        "ar": "سكان كثير الحين يتركون سياراتهم في البيت."
      },
      {
        "en": "The project cost billions of riyals.",
        "ar": "المشروع كلف مليارات الريالات."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Reading every word slowly",
        "correct": "Read headline + first sentences first",
        "whyAr": "الهدف الفكرة العامة مو التفاصيل."
      },
      {
        "incorrect": "Looking up every new word",
        "correct": "Ignore words that don't block the main idea",
        "whyAr": "مو كل كلمة مهمة."
      },
      {
        "incorrect": "Summary = copy a sentence",
        "correct": "Summary in your own words",
        "whyAr": "اكتب الفكرة بأسلوبك."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اقرأ خبر المترو في دقيقة ولخصه لسارة.",
      "promptEn": "Skim the metro article in one minute and summarise it.",
      "saraQuestionAr": "وش الخبر باختصار؟",
      "saraQuestionEn": "What's the news in short?",
      "recommendedResponseEn": "The Riyadh Metro carried over one million passengers in its first month, traffic fell by about 10%, and numbers may double next year."
    },
    "quiz": [
      {
        "questionAr": "أول خطوة في skimming:",
        "questionEn": "First step in skimming:",
        "options": [
          "read every word",
          "read the headline",
          "use a dictionary"
        ],
        "correctIndex": 1,
        "explanationAr": "العنوان."
      },
      {
        "questionAr": "ملخص جيد للخبر:",
        "questionEn": "Good one-sentence summary:",
        "options": [
          "The metro is new.",
          "In its first month, the Riyadh Metro carried over a million people and reduced traffic.",
          "Officials say."
        ],
        "correctIndex": 1,
        "explanationAr": "من، ماذا، النتيجة."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Read headline + first sentences first",
          "Reading every word slowly"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Read headline + first sentences first — الهدف الفكرة العامة مو التفاصيل."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Looking up every new word",
          "Ignore words that don't block the main idea"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Ignore words that don't block the main idea — مو كل كلمة مهمة."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Summary in your own words",
          "Summary = copy a sentence"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Summary in your own words — اكتب الفكرة بأسلوبك."
      }
    ],
    "whiteboardNotes": {
      "title": "Skimming a News Article for Gist",
      "pointsAr": [
        "يحدد الفكرة الرئيسية بسرعة.",
        "يستخدم العنوان والجمل الأولى.",
        "يلخص في جملة.",
        "Skimming: اقرأ العنوان، الجملة الأولى من كل فقرة، والأرقام والأسماء. تجاهل التفاصيل. اسأل: من؟ ماذا؟ أين؟ متى؟"
      ],
      "pointsEn": [
        "Find the gist quickly.",
        "Use headlines and topic sentences.",
        "Summarise in one sentence.",
        "Skim: headline, first sentence of each paragraph, names and numbers. Ask who/what/where/when."
      ],
      "chalkHighlight": "Headline → first sentences → key names/numbers → one-sentence gist"
    },
    "unit": 5,
    "cefr": "B1",
    "objectivesAr": [
      "يحدد الفكرة الرئيسية بسرعة.",
      "يستخدم العنوان والجمل الأولى.",
      "يلخص في جملة."
    ],
    "objectivesEn": [
      "Find the gist quickly.",
      "Use headlines and topic sentences.",
      "Summarise in one sentence."
    ],
    "vocabulary": [
      {
        "word": "headline",
        "ipa": "/ˈhɛdlaɪn/",
        "ar": "عنوان الخبر",
        "exampleEn": "Read the headline.",
        "exampleAr": "اقرأ العنوان."
      },
      {
        "word": "passenger",
        "ipa": "/ˈpæsɪndʒər/",
        "ar": "راكب",
        "exampleEn": "one million passengers",
        "exampleAr": "مليون راكب"
      },
      {
        "word": "official",
        "ipa": "/əˈfɪʃəl/",
        "ar": "مسؤول",
        "exampleEn": "officials say",
        "exampleAr": "المسؤولون يقولون"
      },
      {
        "word": "resident",
        "ipa": "/ˈrɛzɪdənt/",
        "ar": "ساكن/مقيم",
        "exampleEn": "local residents",
        "exampleAr": "السكان المحليين"
      },
      {
        "word": "drop",
        "ipa": "/drɑːp/",
        "ar": "ينخفض",
        "exampleEn": "Prices dropped.",
        "exampleAr": "الأسعار نزلت."
      },
      {
        "word": "expect",
        "ipa": "/ɪkˈspɛkt/",
        "ar": "يتوقع",
        "exampleEn": "We expect rain.",
        "exampleAr": "نتوقع مطر."
      },
      {
        "word": "gist",
        "ipa": "/dʒɪst/",
        "ar": "الفكرة العامة",
        "exampleEn": "Get the gist.",
        "exampleAr": "افهم الفكرة العامة."
      },
      {
        "word": "billion",
        "ipa": "/ˈbɪljən/",
        "ar": "مليار",
        "exampleEn": "two billion",
        "exampleAr": "ملياران"
      },
      {
        "word": "launch",
        "ipa": "/lɔːntʃ/",
        "ar": "يطلق/إطلاق",
        "exampleEn": "the launch event",
        "exampleAr": "حفل الإطلاق"
      },
      {
        "word": "according to",
        "ipa": "/əˈkɔːrdɪŋ tuː/",
        "ar": "وفقاً لـ",
        "exampleEn": "according to reports",
        "exampleAr": "وفقاً للتقارير"
      }
    ],
    "grammarFocus": {
      "ruleAr": "Skimming: اقرأ العنوان، الجملة الأولى من كل فقرة، والأرقام والأسماء. تجاهل التفاصيل. اسأل: من؟ ماذا؟ أين؟ متى؟",
      "ruleEn": "Skim: headline, first sentence of each paragraph, names and numbers. Ask who/what/where/when.",
      "formula": "Headline → first sentences → key names/numbers → one-sentence gist",
      "examples": [
        {
          "en": "Riyadh Metro carries one million passengers in first month.",
          "ar": "مترو الرياض ينقل مليون راكب في أول شهر."
        },
        {
          "en": "The new line opened on Sunday.",
          "ar": "الخط الجديد افتتح يوم الأحد."
        },
        {
          "en": "Officials say traffic has dropped by 10%.",
          "ar": "المسؤولون يقولون الزحمة نزلت ١٠٪."
        },
        {
          "en": "Experts expect the number to double next year.",
          "ar": "الخبراء يتوقعون العدد يتضاعف السنة الجاية."
        },
        {
          "en": "Many residents now leave their cars at home.",
          "ar": "سكان كثير الحين يتركون سياراتهم في البيت."
        },
        {
          "en": "The project cost billions of riyals.",
          "ar": "المشروع كلف مليارات الريالات."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Headline",
        "en": "Riyadh Metro carries one million passengers in first month",
        "ar": "مترو الرياض ينقل مليون راكب في أول شهر"
      },
      {
        "speaker": "P1",
        "en": "The Riyadh Metro carried more than one million passengers in its first month, according to officials.",
        "ar": "نقل المترو أكثر من مليون راكب في شهره الأول وفقاً للمسؤولين."
      },
      {
        "speaker": "P2",
        "en": "The busiest station was King Abdullah Financial District, especially in the morning.",
        "ar": "أزحم محطة كانت المركز المالي، خصوصاً الصبح."
      },
      {
        "speaker": "P3",
        "en": "Officials say traffic on main roads has dropped by about 10%.",
        "ar": "المسؤولون يقولون الزحمة نزلت حوالي ١٠٪."
      },
      {
        "speaker": "P4",
        "en": "Many residents now leave their cars at home and use the metro to get to work.",
        "ar": "سكان كثير يتركون سياراتهم ويستخدمون المترو للدوام."
      },
      {
        "speaker": "P5",
        "en": "Experts expect passenger numbers to double next year as more lines open.",
        "ar": "الخبراء يتوقعون يتضاعف العدد السنة الجاية مع افتتاح خطوط أكثر."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Headline: Riyadh Metro carries one million passengers in first month\nP1: The Riyadh Metro carried more than one million passengers in its first month, according to officials.\nP2: The busiest station was King Abdullah Financial District, especially in the morning.\nP3: Officials say traffic on main roads has dropped by about 10%.\nP4: Many residents now leave their cars at home and use the metro to get to work.\nP5: Experts expect passenger numbers to double next year as more lines open.",
      "questions": [
        {
          "questionAr": "الفكرة العامة؟",
          "questionEn": "What is the gist?",
          "options": [
            "Riyadh Metro is popular and reducing traffic",
            "Metro tickets are expensive",
            "A station closed"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: Riyadh Metro is popular and reducing traffic"
        },
        {
          "questionAr": "أزحم محطة؟",
          "questionEn": "Busiest station?",
          "options": [
            "Olaya",
            "KAFD",
            "Airport"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: KAFD"
        },
        {
          "questionAr": "كم نزلت الزحمة؟",
          "questionEn": "By how much did traffic drop?",
          "options": [
            "5%",
            "10%",
            "20%"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: 10%"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Reading headlines aloud: stress key nouns",
      "items": [
        "RIYADH METRO CARRIES one MILLION PASSENGERS",
        "official /əˈfɪʃəl/",
        "billion /ˈbɪljən/"
      ],
      "tipAr": "العناوين تقرأ بضغط على الأسماء والأرقام."
    },
    "exercises": {
      "easy": [
        {
          "id": "srp_324_e1",
          "type": "meaning",
          "promptEn": "What does \"headline\" mean?",
          "promptAr": "ما معنى \"headline\"؟",
          "options": [
            "ساكن/مقيم",
            "عنوان الخبر",
            "مليار",
            "الفكرة العامة"
          ],
          "correctIndex": 1,
          "answer": "عنوان الخبر",
          "explanationAr": "\"headline\" /ˈhɛdlaɪn/ تعني: عنوان الخبر. مثال: Read the headline."
        },
        {
          "id": "srp_324_e2",
          "type": "meaning",
          "promptEn": "What does \"passenger\" mean?",
          "promptAr": "ما معنى \"passenger\"؟",
          "options": [
            "ينخفض",
            "مسؤول",
            "يتوقع",
            "راكب"
          ],
          "correctIndex": 3,
          "answer": "راكب",
          "explanationAr": "\"passenger\" /ˈpæsɪndʒər/ تعني: راكب. مثال: one million passengers"
        },
        {
          "id": "srp_324_e3",
          "type": "meaning",
          "promptEn": "What does \"official\" mean?",
          "promptAr": "ما معنى \"official\"؟",
          "options": [
            "عنوان الخبر",
            "مليار",
            "وفقاً لـ",
            "مسؤول"
          ],
          "correctIndex": 3,
          "answer": "مسؤول",
          "explanationAr": "\"official\" /əˈfɪʃəl/ تعني: مسؤول. مثال: officials say"
        },
        {
          "id": "srp_324_e4",
          "type": "meaning",
          "promptEn": "What does \"resident\" mean?",
          "promptAr": "ما معنى \"resident\"؟",
          "options": [
            "الفكرة العامة",
            "يطلق/إطلاق",
            "ساكن/مقيم",
            "عنوان الخبر"
          ],
          "correctIndex": 2,
          "answer": "ساكن/مقيم",
          "explanationAr": "\"resident\" /ˈrɛzɪdənt/ تعني: ساكن/مقيم. مثال: local residents"
        }
      ],
      "medium": [
        {
          "id": "srp_324_m1",
          "type": "gap",
          "promptEn": "Complete: Riyadh Metro carries one million ____ in first month.",
          "promptAr": "أكمل الفراغ: (مترو الرياض ينقل مليون راكب في أول شهر.)",
          "options": [
            "passages",
            "passports",
            "passengers"
          ],
          "correctIndex": 2,
          "answer": "Riyadh Metro carries one million passengers in first month.",
          "explanationAr": "الإجابة: passengers. Skimming: اقرأ العنوان، الجملة الأولى من كل فقرة، والأرقام والأسماء. تجاهل التفاصيل. اسأل: من؟ ماذا؟ أين؟ متى؟"
        },
        {
          "id": "srp_324_m2",
          "type": "gap",
          "promptEn": "Complete: The new line ____ on Sunday.",
          "promptAr": "أكمل الفراغ: (الخط الجديد افتتح يوم الأحد.)",
          "options": [
            "opens",
            "open",
            "opened"
          ],
          "correctIndex": 2,
          "answer": "The new line opened on Sunday.",
          "explanationAr": "الإجابة: opened. Skimming: اقرأ العنوان، الجملة الأولى من كل فقرة، والأرقام والأسماء. تجاهل التفاصيل. اسأل: من؟ ماذا؟ أين؟ متى؟"
        },
        {
          "id": "srp_324_m3",
          "type": "gap",
          "promptEn": "Complete: Officials say traffic has ____ by 10%.",
          "promptAr": "أكمل الفراغ: (المسؤولون يقولون الزحمة نزلت ١٠٪.)",
          "options": [
            "droped",
            "dropped",
            "dropping"
          ],
          "correctIndex": 1,
          "answer": "Officials say traffic has dropped by 10%.",
          "explanationAr": "الإجابة: dropped. Skimming: اقرأ العنوان، الجملة الأولى من كل فقرة، والأرقام والأسماء. تجاهل التفاصيل. اسأل: من؟ ماذا؟ أين؟ متى؟"
        },
        {
          "id": "srp_324_m4",
          "type": "gap",
          "promptEn": "Complete: Experts expect the number to ____ next year.",
          "promptAr": "أكمل الفراغ: (الخبراء يتوقعون العدد يتضاعف السنة الجاية.)",
          "options": [
            "doubled",
            "doubt",
            "double"
          ],
          "correctIndex": 2,
          "answer": "Experts expect the number to double next year.",
          "explanationAr": "الإجابة: double. Skimming: اقرأ العنوان، الجملة الأولى من كل فقرة، والأرقام والأسماء. تجاهل التفاصيل. اسأل: من؟ ماذا؟ أين؟ متى؟"
        }
      ],
      "hard": [
        {
          "id": "srp_324_h1",
          "type": "order",
          "promptEn": "Put the words in order: now / their / Many / cars / residents / at / leave / home.",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (سكان كثير الحين يتركون سياراتهم في البيت.)",
          "answer": "Many residents now leave their cars at home.",
          "explanationAr": "الترتيب الصحيح: Many residents now leave their cars at home."
        },
        {
          "id": "srp_324_h2",
          "type": "order",
          "promptEn": "Put the words in order: of / The / project / riyals. / cost / billions",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (المشروع كلف مليارات الريالات.)",
          "answer": "The project cost billions of riyals.",
          "explanationAr": "الترتيب الصحيح: The project cost billions of riyals."
        },
        {
          "id": "srp_324_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: الخط الجديد افتتح يوم الأحد.",
          "answer": "The new line opened on Sunday.",
          "explanationAr": "ترجمة مقترحة: The new line opened on Sunday."
        },
        {
          "id": "srp_324_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: الخبراء يتوقعون العدد يتضاعف السنة الجاية.",
          "answer": "Experts expect the number to double next year.",
          "explanationAr": "ترجمة مقترحة: Experts expect the number to double next year."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Translating the whole article first",
        "correct": "Skim in English first, then check details",
        "whyAr": "الترجمة الكاملة بطيئة."
      },
      {
        "incorrect": "billion = مليون",
        "correct": "billion = مليار (1,000,000,000)",
        "whyAr": "انتبه للأرقام الكبيرة."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (التنغيم: صعود ونزول الصوت): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Flat 'Thank you' →",
          "Thank you ↘ (warm fall)"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Thank you ↘ (warm fall) — الصوت المسطح يبين ملل.",
        "fromLessonId": "srp_323"
      },
      {
        "questionAr": "مراجعة (الكلام المتصل: ربط الكلمات): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Turn / it / off (separated)",
          "Turn_it_off /tɜːrnɪˈtɔːf/"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Turn_it_off /tɜːrnɪˈtɔːf/ — الفصل يخلي الكلام متقطع.",
        "fromLessonId": "srp_303"
      },
      {
        "questionAr": "مراجعة (نبر الجملة: الكلمات المهمة أقوى): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I WANT a CUP of TEA",
          "I-WANT-A-CUP-OF-TEA (all equal)"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I WANT a CUP of TEA — التساوي يخلي الكلام آلي.",
        "fromLessonId": "srp_319"
      },
      {
        "questionAr": "ما معنى \"salt and pepper\"؟",
        "questionEn": "What does \"salt and pepper\" mean?",
        "options": [
          "و",
          "إلى/لـ",
          "ملح وفلفل",
          "يكون (جمع)"
        ],
        "correctIndex": 2,
        "explanationAr": "\"salt and pepper\" /sɔːlt ən ˈpɛpər/ تعني: ملح وفلفل. مثال: Pass the salt and pepper.",
        "fromLessonId": "srp_322"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (المسؤولون يقولون الزحمة نزلت ١٠٪.)",
          "questionEn": "Complete: Officials say traffic has ____ by 10%.",
          "options": [
            "droped",
            "dropped",
            "dropping"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: dropped. Skimming: اقرأ العنوان، الجملة الأولى من كل فقرة، والأرقام والأسماء. تجاهل التفاصيل. اسأل: من؟ ماذا؟ أين؟ متى؟"
        },
        {
          "questionAr": "أكمل الفراغ: (الخبراء يتوقعون العدد يتضاعف السنة الجاية.)",
          "questionEn": "Complete: Experts expect the number to ____ next year.",
          "options": [
            "doubled",
            "doubt",
            "double"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: double. Skimming: اقرأ العنوان، الجملة الأولى من كل فقرة، والأرقام والأسماء. تجاهل التفاصيل. اسأل: من؟ ماذا؟ أين؟ متى؟"
        },
        {
          "questionAr": "ما معنى \"drop\"؟",
          "questionEn": "What does \"drop\" mean?",
          "options": [
            "راكب",
            "ساكن/مقيم",
            "ينخفض",
            "يتوقع"
          ],
          "correctIndex": 2,
          "explanationAr": "\"drop\" /drɑːp/ تعني: ينخفض. مثال: Prices dropped."
        },
        {
          "questionAr": "ما معنى \"expect\"؟",
          "questionEn": "What does \"expect\" mean?",
          "options": [
            "ينخفض",
            "الفكرة العامة",
            "يتوقع",
            "مليار"
          ],
          "correctIndex": 2,
          "explanationAr": "\"expect\" /ɪkˈspɛkt/ تعني: يتوقع. مثال: We expect rain."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Translating the whole article first",
            "Skim in English first, then check details"
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: Skim in English first, then check details — الترجمة الكاملة بطيئة."
        }
      ]
    }
  },
  {
    "id": "srp_325",
    "pillarId": "reading",
    "pillarNameAr": "القراءة التعبيرية والنطق الصوتي",
    "pillarNameEn": "Expressive Reading & Pronunciation Lab",
    "pillarIcon": "📖",
    "level": "متوسط (Intermediate)",
    "levelCode": "B1-B2",
    "titleAr": "البحث عن معلومة محددة (Scanning)",
    "titleEn": "Scanning for Specific Information",
    "descAr": "دوّر على رقم أو وقت أو اسم في جدول أو إعلان بسرعة بدون ما تقرأ كل شي.",
    "descEn": "Find a number, time or name in a timetable or ad fast.",
    "speakingGoalAr": "جاوب خمسة أسئلة من جدول رحلات في دقيقتين.",
    "speakingGoalEn": "Answer five questions from a timetable in two minutes.",
    "keyPattern": {
      "ruleAr": "Scanning: حدد وش تدور (رقم؟ وقت؟ اسم؟)، وخل عينك تمشي بسرعة لين تلقى الشكل المناسب (أرقام، حروف كبيرة). لا تقرأ الباقي.",
      "ruleEn": "Scanning: know what you're looking for, move your eyes fast to matching shapes (numbers, capitals), ignore the rest.",
      "formula": "Question → keyword/type → scan → stop → answer"
    },
    "practicalExamples": [
      {
        "en": "Flight SV1023 departs at 14:35 from Gate B7.",
        "ar": "الرحلة SV1023 تقلع ١٤:٣٥ من بوابة B7."
      },
      {
        "en": "Doors open at 7 pm; the show starts at 8.",
        "ar": "الأبواب تفتح ٧ مساءً والعرض يبدأ ٨."
      },
      {
        "en": "Tickets: adults 50 SAR, children under 12 free.",
        "ar": "التذاكر: الكبار ٥٠ ريال والأطفال تحت ١٢ مجاناً."
      },
      {
        "en": "Offer valid until 30 November.",
        "ar": "العرض ساري لين ٣٠ نوفمبر."
      },
      {
        "en": "Call 920000000 for bookings.",
        "ar": "اتصل ٩٢٠٠٠٠٠٠٠ للحجز."
      },
      {
        "en": "Closed on Fridays until 4 pm.",
        "ar": "مغلق الجمعة لين ٤ العصر."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Reading the whole timetable top to bottom",
        "correct": "Jump to the line with your flight number",
        "whyAr": "ابحث عن المفتاح مباشرة."
      },
      {
        "incorrect": "Confusing departs and arrives",
        "correct": "departs = تقلع, arrives = توصل",
        "whyAr": "أهم كلمتين في الجداول."
      },
      {
        "incorrect": "14:35 = 4:35 pm",
        "correct": "14:35 = 2:35 pm",
        "whyAr": "نظام ٢٤ ساعة."
      }
    ],
    "speakingChallenge": {
      "promptAr": "استخدم لوحة القطار وأجب سارة.",
      "promptEn": "Use the train board to answer Sara.",
      "saraQuestionAr": "أبي أروح المدينة العصر. وش الخيارات؟",
      "saraQuestionEn": "I want to go to Madinah in the afternoon. Options?",
      "recommendedResponseEn": "The 14:00 train to Madinah is cancelled, so you should take HHR 52 at 09:10 from Platform 2, or check later trains."
    },
    "quiz": [
      {
        "questionAr": "متى قطار المدينة الأول؟",
        "questionEn": "First Madinah train?",
        "options": [
          "09:10",
          "12:30",
          "14:00"
        ],
        "correctIndex": 0,
        "explanationAr": "HHR 52 الساعة ٠٩:١٠."
      },
      {
        "questionAr": "departs تعني:",
        "questionEn": "'departs' means:",
        "options": [
          "توصل",
          "تقلع/تغادر",
          "تتأخر"
        ],
        "correctIndex": 1,
        "explanationAr": "تغادر."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Reading the whole timetable top to bottom",
          "Jump to the line with your flight number"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Jump to the line with your flight number — ابحث عن المفتاح مباشرة."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Confusing departs and arrives",
          "departs = تقلع, arrives = توصل"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: departs = تقلع, arrives = توصل — أهم كلمتين في الجداول."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "14:35 = 4:35 pm",
          "14:35 = 2:35 pm"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: 14:35 = 2:35 pm — نظام ٢٤ ساعة."
      }
    ],
    "whiteboardNotes": {
      "title": "Scanning for Specific Information",
      "pointsAr": [
        "يحدد نوع المعلومة المطلوبة.",
        "يمسح النص بسرعة.",
        "يجيب بدقة.",
        "Scanning: حدد وش تدور (رقم؟ وقت؟ اسم؟)، وخل عينك تمشي بسرعة لين تلقى الشكل المناسب (أرقام، حروف كبيرة). لا تقرأ الباقي."
      ],
      "pointsEn": [
        "Identify the target information type.",
        "Scan quickly.",
        "Answer precisely.",
        "Scanning: know what you're looking for, move your eyes fast to matching shapes (numbers, capitals), ignore the rest."
      ],
      "chalkHighlight": "Question → keyword/type → scan → stop → answer"
    },
    "unit": 5,
    "cefr": "B1",
    "objectivesAr": [
      "يحدد نوع المعلومة المطلوبة.",
      "يمسح النص بسرعة.",
      "يجيب بدقة."
    ],
    "objectivesEn": [
      "Identify the target information type.",
      "Scan quickly.",
      "Answer precisely."
    ],
    "vocabulary": [
      {
        "word": "departure",
        "ipa": "/dɪˈpɑːrtʃər/",
        "ar": "مغادرة/إقلاع",
        "exampleEn": "departure time",
        "exampleAr": "وقت الإقلاع"
      },
      {
        "word": "arrival",
        "ipa": "/əˈraɪvəl/",
        "ar": "وصول",
        "exampleEn": "arrival hall",
        "exampleAr": "صالة الوصول"
      },
      {
        "word": "timetable",
        "ipa": "/ˈtaɪmteɪbəl/",
        "ar": "جدول مواعيد",
        "exampleEn": "the bus timetable",
        "exampleAr": "جدول الباص"
      },
      {
        "word": "valid",
        "ipa": "/ˈvælɪd/",
        "ar": "ساري",
        "exampleEn": "valid until May",
        "exampleAr": "ساري لين مايو"
      },
      {
        "word": "adult",
        "ipa": "/ˈædʌlt/",
        "ar": "بالغ",
        "exampleEn": "adult ticket",
        "exampleAr": "تذكرة كبار"
      },
      {
        "word": "free",
        "ipa": "/friː/",
        "ar": "مجاني",
        "exampleEn": "Entry is free.",
        "exampleAr": "الدخول مجاني."
      },
      {
        "word": "booking",
        "ipa": "/ˈbʊkɪŋ/",
        "ar": "حجز",
        "exampleEn": "online booking",
        "exampleAr": "حجز أونلاين"
      },
      {
        "word": "scan",
        "ipa": "/skæn/",
        "ar": "يمسح/يبحث بسرعة",
        "exampleEn": "scan the page",
        "exampleAr": "امسح الصفحة"
      },
      {
        "word": "platform",
        "ipa": "/ˈplætfɔːrm/",
        "ar": "رصيف (قطار)",
        "exampleEn": "platform 3",
        "exampleAr": "رصيف ٣"
      },
      {
        "word": "on time",
        "ipa": "/ɑːn taɪm/",
        "ar": "في الموعد",
        "exampleEn": "The train is on time.",
        "exampleAr": "القطار في موعده."
      }
    ],
    "grammarFocus": {
      "ruleAr": "Scanning: حدد وش تدور (رقم؟ وقت؟ اسم؟)، وخل عينك تمشي بسرعة لين تلقى الشكل المناسب (أرقام، حروف كبيرة). لا تقرأ الباقي.",
      "ruleEn": "Scanning: know what you're looking for, move your eyes fast to matching shapes (numbers, capitals), ignore the rest.",
      "formula": "Question → keyword/type → scan → stop → answer",
      "examples": [
        {
          "en": "Flight SV1023 departs at 14:35 from Gate B7.",
          "ar": "الرحلة SV1023 تقلع ١٤:٣٥ من بوابة B7."
        },
        {
          "en": "Doors open at 7 pm; the show starts at 8.",
          "ar": "الأبواب تفتح ٧ مساءً والعرض يبدأ ٨."
        },
        {
          "en": "Tickets: adults 50 SAR, children under 12 free.",
          "ar": "التذاكر: الكبار ٥٠ ريال والأطفال تحت ١٢ مجاناً."
        },
        {
          "en": "Offer valid until 30 November.",
          "ar": "العرض ساري لين ٣٠ نوفمبر."
        },
        {
          "en": "Call 920000000 for bookings.",
          "ar": "اتصل ٩٢٠٠٠٠٠٠٠ للحجز."
        },
        {
          "en": "Closed on Fridays until 4 pm.",
          "ar": "مغلق الجمعة لين ٤ العصر."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Board",
        "en": "HARAMAIN HIGH SPEED RAILWAY – DEPARTURES",
        "ar": "قطار الحرمين – المغادرة"
      },
      {
        "speaker": "Board",
        "en": "HHR 52  Makkah → Madinah  09:10  Platform 2  ON TIME",
        "ar": "مكة ← المدينة ٠٩:١٠ رصيف ٢ في الموعد"
      },
      {
        "speaker": "Board",
        "en": "HHR 58  Makkah → Jeddah Airport  10:45  Platform 4  DELAYED 15 MIN",
        "ar": "مكة ← مطار جدة ١٠:٤٥ رصيف ٤ متأخر ١٥ دقيقة"
      },
      {
        "speaker": "Board",
        "en": "HHR 61  Makkah → KAEC  12:30  Platform 1  ON TIME",
        "ar": "مكة ← مدينة الملك عبدالله الاقتصادية ١٢:٣٠ رصيف ١"
      },
      {
        "speaker": "Board",
        "en": "HHR 66  Makkah → Madinah  14:00  Platform 2  CANCELLED",
        "ar": "مكة ← المدينة ١٤:٠٠ ملغي"
      },
      {
        "speaker": "Board",
        "en": "Business class: Coach 1. Please arrive 30 minutes before departure.",
        "ar": "درجة الأعمال: عربة ١. احضر قبل الإقلاع بـ٣٠ دقيقة."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Board: HARAMAIN HIGH SPEED RAILWAY – DEPARTURES\nBoard: HHR 52  Makkah → Madinah  09:10  Platform 2  ON TIME\nBoard: HHR 58  Makkah → Jeddah Airport  10:45  Platform 4  DELAYED 15 MIN\nBoard: HHR 61  Makkah → KAEC  12:30  Platform 1  ON TIME\nBoard: HHR 66  Makkah → Madinah  14:00  Platform 2  CANCELLED\nBoard: Business class: Coach 1. Please arrive 30 minutes before departure.",
      "questions": [
        {
          "questionAr": "أي قطار متأخر؟",
          "questionEn": "Which train to Jeddah Airport is delayed?",
          "options": [
            "HHR 52",
            "HHR 58",
            "HHR 61"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: HHR 58"
        },
        {
          "questionAr": "أي قطار ملغي؟",
          "questionEn": "Which train is cancelled?",
          "options": [
            "HHR 52",
            "HHR 61",
            "HHR 66"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: HHR 66"
        },
        {
          "questionAr": "متى تحضر؟",
          "questionEn": "When should you arrive?",
          "options": [
            "15 minutes before",
            "30 minutes before",
            "1 hour before"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: 30 minutes before"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Reading times and codes aloud",
      "items": [
        "09:10 = nine ten",
        "14:00 = two p.m. / fourteen hundred",
        "HHR 52 = H-H-R fifty-two"
      ],
      "tipAr": "الأرقام في الجداول تقرأ مجموعات: 920 000 000."
    },
    "exercises": {
      "easy": [
        {
          "id": "srp_325_e1",
          "type": "meaning",
          "promptEn": "What does \"departure\" mean?",
          "promptAr": "ما معنى \"departure\"؟",
          "options": [
            "وصول",
            "مغادرة/إقلاع",
            "رصيف (قطار)",
            "في الموعد"
          ],
          "correctIndex": 1,
          "answer": "مغادرة/إقلاع",
          "explanationAr": "\"departure\" /dɪˈpɑːrtʃər/ تعني: مغادرة/إقلاع. مثال: departure time"
        },
        {
          "id": "srp_325_e2",
          "type": "meaning",
          "promptEn": "What does \"arrival\" mean?",
          "promptAr": "ما معنى \"arrival\"؟",
          "options": [
            "في الموعد",
            "مغادرة/إقلاع",
            "وصول",
            "مجاني"
          ],
          "correctIndex": 2,
          "answer": "وصول",
          "explanationAr": "\"arrival\" /əˈraɪvəl/ تعني: وصول. مثال: arrival hall"
        },
        {
          "id": "srp_325_e3",
          "type": "meaning",
          "promptEn": "What does \"timetable\" mean?",
          "promptAr": "ما معنى \"timetable\"؟",
          "options": [
            "يمسح/يبحث بسرعة",
            "مجاني",
            "جدول مواعيد",
            "حجز"
          ],
          "correctIndex": 2,
          "answer": "جدول مواعيد",
          "explanationAr": "\"timetable\" /ˈtaɪmteɪbəl/ تعني: جدول مواعيد. مثال: the bus timetable"
        },
        {
          "id": "srp_325_e4",
          "type": "meaning",
          "promptEn": "What does \"valid\" mean?",
          "promptAr": "ما معنى \"valid\"؟",
          "options": [
            "ساري",
            "رصيف (قطار)",
            "مغادرة/إقلاع",
            "جدول مواعيد"
          ],
          "correctIndex": 0,
          "answer": "ساري",
          "explanationAr": "\"valid\" /ˈvælɪd/ تعني: ساري. مثال: valid until May"
        }
      ],
      "medium": [
        {
          "id": "srp_325_m1",
          "type": "gap",
          "promptEn": "Complete: Flight SV1023 ____ at 14:35 from Gate B7.",
          "promptAr": "أكمل الفراغ: (الرحلة SV1023 تقلع ١٤:٣٥ من بوابة B7.)",
          "options": [
            "delays",
            "departs",
            "arrives"
          ],
          "correctIndex": 1,
          "answer": "Flight SV1023 departs at 14:35 from Gate B7.",
          "explanationAr": "الإجابة: departs. Scanning: حدد وش تدور (رقم؟ وقت؟ اسم؟)، وخل عينك تمشي بسرعة لين تلقى الشكل المناسب (أرقام، حروف كبيرة). لا تقرأ الباقي."
        },
        {
          "id": "srp_325_m2",
          "type": "gap",
          "promptEn": "Complete: Doors open at 7 pm; the show ____ at 8.",
          "promptAr": "أكمل الفراغ: (الأبواب تفتح ٧ مساءً والعرض يبدأ ٨.)",
          "options": [
            "stars",
            "starts",
            "stops"
          ],
          "correctIndex": 1,
          "answer": "Doors open at 7 pm; the show starts at 8.",
          "explanationAr": "الإجابة: starts. Scanning: حدد وش تدور (رقم؟ وقت؟ اسم؟)، وخل عينك تمشي بسرعة لين تلقى الشكل المناسب (أرقام، حروف كبيرة). لا تقرأ الباقي."
        },
        {
          "id": "srp_325_m3",
          "type": "gap",
          "promptEn": "Complete: Tickets: adults 50 SAR, children under 12 ____.",
          "promptAr": "أكمل الفراغ: (التذاكر: الكبار ٥٠ ريال والأطفال تحت ١٢ مجاناً.)",
          "options": [
            "three",
            "free",
            "fee"
          ],
          "correctIndex": 1,
          "answer": "Tickets: adults 50 SAR, children under 12 free.",
          "explanationAr": "الإجابة: free. Scanning: حدد وش تدور (رقم؟ وقت؟ اسم؟)، وخل عينك تمشي بسرعة لين تلقى الشكل المناسب (أرقام، حروف كبيرة). لا تقرأ الباقي."
        },
        {
          "id": "srp_325_m4",
          "type": "gap",
          "promptEn": "Complete: Offer ____ until 30 November.",
          "promptAr": "أكمل الفراغ: (العرض ساري لين ٣٠ نوفمبر.)",
          "options": [
            "invalid",
            "value",
            "valid"
          ],
          "correctIndex": 2,
          "answer": "Offer valid until 30 November.",
          "explanationAr": "الإجابة: valid. Scanning: حدد وش تدور (رقم؟ وقت؟ اسم؟)، وخل عينك تمشي بسرعة لين تلقى الشكل المناسب (أرقام، حروف كبيرة). لا تقرأ الباقي."
        }
      ],
      "hard": [
        {
          "id": "srp_325_h1",
          "type": "order",
          "promptEn": "Put the words in order: 920000000 / bookings. / Call / for",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (اتصل ٩٢٠٠٠٠٠٠٠ للحجز.)",
          "answer": "Call 920000000 for bookings.",
          "explanationAr": "الترتيب الصحيح: Call 920000000 for bookings."
        },
        {
          "id": "srp_325_h2",
          "type": "order",
          "promptEn": "Put the words in order: on / until / Fridays / pm. / Closed / 4",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (مغلق الجمعة لين ٤ العصر.)",
          "answer": "Closed on Fridays until 4 pm.",
          "explanationAr": "الترتيب الصحيح: Closed on Fridays until 4 pm."
        },
        {
          "id": "srp_325_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: الأبواب تفتح ٧ مساءً والعرض يبدأ ٨.",
          "answer": "Doors open at 7 pm; the show starts at 8.",
          "explanationAr": "ترجمة مقترحة: Doors open at 7 pm; the show starts at 8."
        },
        {
          "id": "srp_325_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: العرض ساري لين ٣٠ نوفمبر.",
          "answer": "Offer valid until 30 November.",
          "explanationAr": "ترجمة مقترحة: Offer valid until 30 November."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Reading 24-hour time as 12-hour",
        "correct": "14:00 = 2 pm",
        "whyAr": "خطأ ممكن يفوتك القطار!"
      },
      {
        "incorrect": "Missing small words like CANCELLED",
        "correct": "Scan the status column carefully",
        "whyAr": "كلمة وحدة تغير كل شي."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (القراءة السريعة للفكرة العامة (Skimming)): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Looking up every new word",
          "Ignore words that don't block the main idea"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Ignore words that don't block the main idea — مو كل كلمة مهمة.",
        "fromLessonId": "srp_324"
      },
      {
        "questionAr": "مراجعة (الصيغ الضعيفة: can, to, of, and, for): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "fish 'n' chips /fɪʃən tʃɪps/",
          "Fish AND chips (strong)"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: fish 'n' chips /fɪʃən tʃɪps/ — and ضعيفة.",
        "fromLessonId": "srp_322"
      },
      {
        "questionAr": "مراجعة (قراءة قصة قصيرة وفهمها): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Stopping at every new word",
          "Guess from context and keep reading"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Guess from context and keep reading — التوقف يضيع الفكرة.",
        "fromLessonId": "srp_320"
      },
      {
        "questionAr": "ما معنى \"doubt\"؟",
        "questionEn": "What does \"doubt\" mean?",
        "options": [
          "متأكد",
          "صعود",
          "شك",
          "تنغيم"
        ],
        "correctIndex": 2,
        "explanationAr": "\"doubt\" /daʊt/ تعني: شك. مثال: I have my doubts.",
        "fromLessonId": "srp_323"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (التذاكر: الكبار ٥٠ ريال والأطفال تحت ١٢ مجاناً.)",
          "questionEn": "Complete: Tickets: adults 50 SAR, children under 12 ____.",
          "options": [
            "three",
            "free",
            "fee"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: free. Scanning: حدد وش تدور (رقم؟ وقت؟ اسم؟)، وخل عينك تمشي بسرعة لين تلقى الشكل المناسب (أرقام، حروف كبيرة). لا تقرأ الباقي."
        },
        {
          "questionAr": "أكمل الفراغ: (العرض ساري لين ٣٠ نوفمبر.)",
          "questionEn": "Complete: Offer ____ until 30 November.",
          "options": [
            "invalid",
            "value",
            "valid"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: valid. Scanning: حدد وش تدور (رقم؟ وقت؟ اسم؟)، وخل عينك تمشي بسرعة لين تلقى الشكل المناسب (أرقام، حروف كبيرة). لا تقرأ الباقي."
        },
        {
          "questionAr": "ما معنى \"adult\"؟",
          "questionEn": "What does \"adult\" mean?",
          "options": [
            "بالغ",
            "حجز",
            "مجاني",
            "مغادرة/إقلاع"
          ],
          "correctIndex": 0,
          "explanationAr": "\"adult\" /ˈædʌlt/ تعني: بالغ. مثال: adult ticket"
        },
        {
          "questionAr": "ما معنى \"free\"؟",
          "questionEn": "What does \"free\" mean?",
          "options": [
            "مجاني",
            "في الموعد",
            "يمسح/يبحث بسرعة",
            "حجز"
          ],
          "correctIndex": 0,
          "explanationAr": "\"free\" /friː/ تعني: مجاني. مثال: Entry is free."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Reading 24-hour time as 12-hour",
            "14:00 = 2 pm"
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: 14:00 = 2 pm — خطأ ممكن يفوتك القطار!"
        }
      ]
    }
  },
  {
    "id": "srp_326",
    "pillarId": "reading",
    "pillarNameAr": "القراءة التعبيرية والنطق الصوتي",
    "pillarNameEn": "Expressive Reading & Pronunciation Lab",
    "pillarIcon": "📖",
    "level": "متوسط (Intermediate)",
    "levelCode": "B1-B2",
    "titleAr": "الـ T الأمريكية: water و better",
    "titleEn": "The American Flap T: water, better, city",
    "descAr": "في الأمريكي، t بين حرفين متحركين تصير صوت سريع مثل «د» خفيفة: water = «وادر».",
    "descEn": "In American English, t between vowels becomes a quick d-like flap: water → 'wader'.",
    "speakingGoalAr": "افهم وانطق عشرين كلمة فيها flap T.",
    "speakingGoalEn": "Understand and say twenty flap-T words.",
    "keyPattern": {
      "ruleAr": "إذا جاء t أو tt بين صوتين متحركين والمقطع بعده غير منبور، ينطق /ɾ/ (لمسة سريعة): water, better, city, get it. لا تحصل إذا كان المقطع منبوراً: hoTEL.",
      "ruleEn": "t/tt between vowels before an unstressed syllable becomes a flap /ɾ/: water, better, city, get it. Not before stress: hoTEL.",
      "formula": "vowel + t + unstressed vowel → /ɾ/ : wa·ter → /ˈwɑːɾər/"
    },
    "practicalExamples": [
      {
        "en": "Can I have some water?",
        "ar": "ممكن ماي؟"
      },
      {
        "en": "This one is better.",
        "ar": "هذا أحسن."
      },
      {
        "en": "Riyadh is a big city.",
        "ar": "الرياض مدينة كبيرة."
      },
      {
        "en": "Get it! Put it on!",
        "ar": "خذه! البسه!"
      },
      {
        "en": "I ate a little bit of butter.",
        "ar": "أكلت شوية زبدة."
      },
      {
        "en": "What a beautiful daughter!",
        "ar": "ما شاء الله بنت حلوة!"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Hard British T in an American accent mix",
        "correct": "Choose one accent and be consistent",
        "whyAr": "الاثنين صح، بس لا تخلط بشكل غريب."
      },
      {
        "incorrect": "Flap in 'hotel': «هودِل»",
        "correct": "hotel /hoʊˈtɛl/",
        "whyAr": "المقطع بعد t منبور، فلا flap."
      },
      {
        "incorrect": "Not understanding 'wader'",
        "correct": "water /ˈwɑːɾər/ (US)",
        "whyAr": "تعرف عليها في الأفلام والمسلسلات."
      }
    ],
    "speakingChallenge": {
      "promptAr": "قل لسارة: A little bit of water is better, get it?",
      "promptEn": "Say: A little bit of water is better, get it?",
      "saraQuestionAr": "قلها بالنطق الأمريكي!",
      "saraQuestionEn": "Say it the American way!",
      "recommendedResponseEn": "A little bit of water is better, get it?"
    },
    "quiz": [
      {
        "questionAr": "أي كلمة فيها flap T (أمريكي)؟",
        "questionEn": "Which has a flap T (US)?",
        "options": [
          "hotel",
          "better",
          "attack"
        ],
        "correctIndex": 1,
        "explanationAr": "better."
      },
      {
        "questionAr": "Get it? (US) تنسمع:",
        "questionEn": "'Get it?' (US) sounds like:",
        "options": [
          "/ɡɛt ɪt/ separated",
          "/ɡɛɾɪt/",
          "/ɡɪt/"
        ],
        "correctIndex": 1,
        "explanationAr": "flap + ربط."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Choose one accent and be consistent",
          "Hard British T in an American accent mix"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Choose one accent and be consistent — الاثنين صح، بس لا تخلط بشكل غريب."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "hotel /hoʊˈtɛl/",
          "Flap in 'hotel': «هودِل»"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: hotel /hoʊˈtɛl/ — المقطع بعد t منبور، فلا flap."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Not understanding 'wader'",
          "water /ˈwɑːɾər/ (US)"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: water /ˈwɑːɾər/ (US) — تعرف عليها في الأفلام والمسلسلات."
      }
    ],
    "whiteboardNotes": {
      "title": "The American Flap T: water, better, city",
      "pointsAr": [
        "يتعرف على flap T سماعاً.",
        "ينطقها في الكلمات الشائعة.",
        "يعرف متى لا تحدث.",
        "إذا جاء t أو tt بين صوتين متحركين والمقطع بعده غير منبور، ينطق /ɾ/ (لمسة سريعة): water, better, city, get it. لا تحصل إذا كان المقطع منبوراً: hoTEL."
      ],
      "pointsEn": [
        "Recognise the flap T.",
        "Produce it in common words.",
        "Know when it doesn't happen.",
        "t/tt between vowels before an unstressed syllable becomes a flap /ɾ/: water, better, city, get it. Not before stress: hoTEL."
      ],
      "chalkHighlight": "vowel + t + unstressed vowel → /ɾ/ : wa·ter → /ˈwɑːɾər/"
    },
    "unit": 6,
    "cefr": "B1",
    "objectivesAr": [
      "يتعرف على flap T سماعاً.",
      "ينطقها في الكلمات الشائعة.",
      "يعرف متى لا تحدث."
    ],
    "objectivesEn": [
      "Recognise the flap T.",
      "Produce it in common words.",
      "Know when it doesn't happen."
    ],
    "vocabulary": [
      {
        "word": "water",
        "ipa": "/ˈwɑːɾər/",
        "ar": "ماء",
        "exampleEn": "cold water",
        "exampleAr": "ماي بارد"
      },
      {
        "word": "better",
        "ipa": "/ˈbɛɾər/",
        "ar": "أفضل",
        "exampleEn": "much better",
        "exampleAr": "أحسن بكثير"
      },
      {
        "word": "city",
        "ipa": "/ˈsɪɾi/",
        "ar": "مدينة",
        "exampleEn": "a big city",
        "exampleAr": "مدينة كبيرة"
      },
      {
        "word": "butter",
        "ipa": "/ˈbʌɾər/",
        "ar": "زبدة",
        "exampleEn": "bread and butter",
        "exampleAr": "خبز وزبدة"
      },
      {
        "word": "little",
        "ipa": "/ˈlɪɾəl/",
        "ar": "صغير/قليل",
        "exampleEn": "a little bit",
        "exampleAr": "شوية"
      },
      {
        "word": "party",
        "ipa": "/ˈpɑːrɾi/",
        "ar": "حفلة",
        "exampleEn": "a birthday party",
        "exampleAr": "حفلة ميلاد"
      },
      {
        "word": "computer",
        "ipa": "/kəmˈpjuːɾər/",
        "ar": "كمبيوتر",
        "exampleEn": "my computer",
        "exampleAr": "كمبيوتري"
      },
      {
        "word": "beautiful",
        "ipa": "/ˈbjuːɾɪfəl/",
        "ar": "جميل",
        "exampleEn": "a beautiful view",
        "exampleAr": "منظر جميل"
      },
      {
        "word": "letter",
        "ipa": "/ˈlɛɾər/",
        "ar": "رسالة/حرف",
        "exampleEn": "a long letter",
        "exampleAr": "رسالة طويلة"
      },
      {
        "word": "matter",
        "ipa": "/ˈmæɾər/",
        "ar": "يهم",
        "exampleEn": "It doesn't matter.",
        "exampleAr": "ما يهم."
      }
    ],
    "grammarFocus": {
      "ruleAr": "إذا جاء t أو tt بين صوتين متحركين والمقطع بعده غير منبور، ينطق /ɾ/ (لمسة سريعة): water, better, city, get it. لا تحصل إذا كان المقطع منبوراً: hoTEL.",
      "ruleEn": "t/tt between vowels before an unstressed syllable becomes a flap /ɾ/: water, better, city, get it. Not before stress: hoTEL.",
      "formula": "vowel + t + unstressed vowel → /ɾ/ : wa·ter → /ˈwɑːɾər/",
      "examples": [
        {
          "en": "Can I have some water?",
          "ar": "ممكن ماي؟"
        },
        {
          "en": "This one is better.",
          "ar": "هذا أحسن."
        },
        {
          "en": "Riyadh is a big city.",
          "ar": "الرياض مدينة كبيرة."
        },
        {
          "en": "Get it! Put it on!",
          "ar": "خذه! البسه!"
        },
        {
          "en": "I ate a little bit of butter.",
          "ar": "أكلت شوية زبدة."
        },
        {
          "en": "What a beautiful daughter!",
          "ar": "ما شاء الله بنت حلوة!"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "What's the matter? You look tired.",
        "ar": "وش فيك؟ شكلك تعبان."
      },
      {
        "speaker": "Student",
        "en": "I went to a party in the city. I got home at two!",
        "ar": "رحت حفلة في المدينة. رجعت البيت الساعة ثنتين!"
      },
      {
        "speaker": "Sara",
        "en": "Drink a lot of water. You'll feel better.",
        "ar": "اشرب ماي كثير. بتصير أحسن."
      },
      {
        "speaker": "Student",
        "en": "I will. And a little coffee.",
        "ar": "إن شاء الله. وشوية قهوة."
      },
      {
        "speaker": "Sara",
        "en": "Not too much! Get it?",
        "ar": "لا تكثر! فاهم؟"
      },
      {
        "speaker": "Student",
        "en": "Got it! It doesn't matter, it's Saturday.",
        "ar": "فاهم! عادي، اليوم سبت."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: What's the matter? You look tired.\nStudent: I went to a party in the city. I got home at two!\nSara: Drink a lot of water. You'll feel better.\nStudent: I will. And a little coffee.\nSara: Not too much! Get it?\nStudent: Got it! It doesn't matter, it's Saturday.",
      "questions": [
        {
          "questionAr": "ليش تعبان؟",
          "questionEn": "Why is the student tired?",
          "options": [
            "he studied",
            "he went to a party",
            "he was sick"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: he went to a party"
        },
        {
          "questionAr": "نصيحة سارة؟",
          "questionEn": "What does Sara advise?",
          "options": [
            "sleep",
            "drink a lot of water",
            "eat"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: drink a lot of water"
        },
        {
          "questionAr": "أي يوم؟",
          "questionEn": "What day is it?",
          "options": [
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: Saturday"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Flap T vs true T",
      "items": [
        "water /ˈwɑːɾər/ – hotel /hoʊˈtɛl/",
        "city /ˈsɪɾi/ – attack /əˈtæk/",
        "get it /ɡɛɾɪt/"
      ],
      "tipAr": "flap = طرف اللسان يلمس سقف الفم لمسة سريعة وحدة، مثل «ر» عربية خفيفة جداً."
    },
    "exercises": {
      "easy": [
        {
          "id": "srp_326_e1",
          "type": "meaning",
          "promptEn": "What does \"water\" mean?",
          "promptAr": "ما معنى \"water\"؟",
          "options": [
            "جميل",
            "يهم",
            "حفلة",
            "ماء"
          ],
          "correctIndex": 3,
          "answer": "ماء",
          "explanationAr": "\"water\" /ˈwɑːɾər/ تعني: ماء. مثال: cold water"
        },
        {
          "id": "srp_326_e2",
          "type": "meaning",
          "promptEn": "What does \"better\" mean?",
          "promptAr": "ما معنى \"better\"؟",
          "options": [
            "زبدة",
            "رسالة/حرف",
            "أفضل",
            "ماء"
          ],
          "correctIndex": 2,
          "answer": "أفضل",
          "explanationAr": "\"better\" /ˈbɛɾər/ تعني: أفضل. مثال: much better"
        },
        {
          "id": "srp_326_e3",
          "type": "meaning",
          "promptEn": "What does \"city\" mean?",
          "promptAr": "ما معنى \"city\"؟",
          "options": [
            "مدينة",
            "رسالة/حرف",
            "حفلة",
            "جميل"
          ],
          "correctIndex": 0,
          "answer": "مدينة",
          "explanationAr": "\"city\" /ˈsɪɾi/ تعني: مدينة. مثال: a big city"
        },
        {
          "id": "srp_326_e4",
          "type": "meaning",
          "promptEn": "What does \"butter\" mean?",
          "promptAr": "ما معنى \"butter\"؟",
          "options": [
            "زبدة",
            "ماء",
            "يهم",
            "مدينة"
          ],
          "correctIndex": 0,
          "answer": "زبدة",
          "explanationAr": "\"butter\" /ˈbʌɾər/ تعني: زبدة. مثال: bread and butter"
        }
      ],
      "medium": [
        {
          "id": "srp_326_m1",
          "type": "gap",
          "promptEn": "Complete: Can I have some ____?",
          "promptAr": "أكمل الفراغ: (ممكن ماي؟)",
          "options": [
            "waiter",
            "wetter",
            "water"
          ],
          "correctIndex": 2,
          "answer": "Can I have some water?",
          "explanationAr": "الإجابة: water. إذا جاء t أو tt بين صوتين متحركين والمقطع بعده غير منبور، ينطق /ɾ/ (لمسة سريعة): water, better, city, get it. لا تحصل إذا كان المقطع منبوراً: hoTEL."
        },
        {
          "id": "srp_326_m2",
          "type": "gap",
          "promptEn": "Complete: This one is ____.",
          "promptAr": "أكمل الفراغ: (هذا أحسن.)",
          "options": [
            "better",
            "bitter",
            "butter"
          ],
          "correctIndex": 0,
          "answer": "This one is better.",
          "explanationAr": "الإجابة: better. إذا جاء t أو tt بين صوتين متحركين والمقطع بعده غير منبور، ينطق /ɾ/ (لمسة سريعة): water, better, city, get it. لا تحصل إذا كان المقطع منبوراً: hoTEL."
        },
        {
          "id": "srp_326_m3",
          "type": "gap",
          "promptEn": "Complete: Riyadh is a big ____.",
          "promptAr": "أكمل الفراغ: (الرياض مدينة كبيرة.)",
          "options": [
            "kitty",
            "sitty",
            "city"
          ],
          "correctIndex": 2,
          "answer": "Riyadh is a big city.",
          "explanationAr": "الإجابة: city. إذا جاء t أو tt بين صوتين متحركين والمقطع بعده غير منبور، ينطق /ɾ/ (لمسة سريعة): water, better, city, get it. لا تحصل إذا كان المقطع منبوراً: hoTEL."
        },
        {
          "id": "srp_326_m4",
          "type": "gap",
          "promptEn": "Complete: ____! Put it on!",
          "promptAr": "أكمل الفراغ: (خذه! البسه!)",
          "options": [
            "Get it",
            "Get",
            "Got"
          ],
          "correctIndex": 0,
          "answer": "Get it! Put it on!",
          "explanationAr": "الإجابة: Get it. إذا جاء t أو tt بين صوتين متحركين والمقطع بعده غير منبور، ينطق /ɾ/ (لمسة سريعة): water, better, city, get it. لا تحصل إذا كان المقطع منبوراً: hoTEL."
        }
      ],
      "hard": [
        {
          "id": "srp_326_h1",
          "type": "order",
          "promptEn": "Put the words in order: ate / I / of / little / a / butter. / bit",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (أكلت شوية زبدة.)",
          "answer": "I ate a little bit of butter.",
          "explanationAr": "الترتيب الصحيح: I ate a little bit of butter."
        },
        {
          "id": "srp_326_h2",
          "type": "order",
          "promptEn": "Put the words in order: beautiful / a / daughter! / What",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (ما شاء الله بنت حلوة!)",
          "answer": "What a beautiful daughter!",
          "explanationAr": "الترتيب الصحيح: What a beautiful daughter!"
        },
        {
          "id": "srp_326_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: هذا أحسن.",
          "answer": "This one is better.",
          "explanationAr": "ترجمة مقترحة: This one is better."
        },
        {
          "id": "srp_326_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: خذه! البسه!",
          "answer": "Get it! Put it on!",
          "explanationAr": "ترجمة مقترحة: Get it! Put it on!"
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "«واتِر» with strong t in US conversation",
        "correct": "Either is fine; but recognise /ˈwɑːɾər/",
        "whyAr": "مهم للفهم أكثر من النطق."
      },
      {
        "incorrect": "Applying flap everywhere: «هودِل»",
        "correct": "Only before unstressed syllables",
        "whyAr": "اعرف القاعدة."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (البحث عن معلومة محددة (Scanning)): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Confusing departs and arrives",
          "departs = تقلع, arrives = توصل"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: departs = تقلع, arrives = توصل — أهم كلمتين في الجداول.",
        "fromLessonId": "srp_325"
      },
      {
        "questionAr": "مراجعة (التنغيم: صعود ونزول الصوت): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Where do you live? ↘",
          "Where do you live? ↗ (rising)"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Where do you live? ↘ — أسئلة wh نازلة.",
        "fromLessonId": "srp_323"
      },
      {
        "questionAr": "مراجعة (قراءة اللافتات والتعليمات): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Exit = مخرج, Entrance = مدخل",
          "Exit = entrance"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Exit = مخرج, Entrance = مدخل — لا تخلط.",
        "fromLessonId": "srp_321_m"
      },
      {
        "questionAr": "ما معنى \"according to\"؟",
        "questionEn": "What does \"according to\" mean?",
        "options": [
          "يطلق/إطلاق",
          "مليار",
          "وفقاً لـ",
          "ساكن/مقيم"
        ],
        "correctIndex": 2,
        "explanationAr": "\"according to\" /əˈkɔːrdɪŋ tuː/ تعني: وفقاً لـ. مثال: according to reports",
        "fromLessonId": "srp_324"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (الرياض مدينة كبيرة.)",
          "questionEn": "Complete: Riyadh is a big ____.",
          "options": [
            "kitty",
            "sitty",
            "city"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: city. إذا جاء t أو tt بين صوتين متحركين والمقطع بعده غير منبور، ينطق /ɾ/ (لمسة سريعة): water, better, city, get it. لا تحصل إذا كان المقطع منبوراً: hoTEL."
        },
        {
          "questionAr": "أكمل الفراغ: (خذه! البسه!)",
          "questionEn": "Complete: ____! Put it on!",
          "options": [
            "Get it",
            "Get",
            "Got"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: Get it. إذا جاء t أو tt بين صوتين متحركين والمقطع بعده غير منبور، ينطق /ɾ/ (لمسة سريعة): water, better, city, get it. لا تحصل إذا كان المقطع منبوراً: hoTEL."
        },
        {
          "questionAr": "ما معنى \"little\"؟",
          "questionEn": "What does \"little\" mean?",
          "options": [
            "أفضل",
            "ماء",
            "صغير/قليل",
            "رسالة/حرف"
          ],
          "correctIndex": 2,
          "explanationAr": "\"little\" /ˈlɪɾəl/ تعني: صغير/قليل. مثال: a little bit"
        },
        {
          "questionAr": "ما معنى \"party\"؟",
          "questionEn": "What does \"party\" mean?",
          "options": [
            "ماء",
            "صغير/قليل",
            "جميل",
            "حفلة"
          ],
          "correctIndex": 3,
          "explanationAr": "\"party\" /ˈpɑːrɾi/ تعني: حفلة. مثال: a birthday party"
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "«واتِر» with strong t in US conversation",
            "Either is fine; but recognise /ˈwɑːɾər/"
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: Either is fine; but recognise /ˈwɑːɾər/ — مهم للفهم أكثر من النطق."
        }
      ]
    }
  },
  {
    "id": "srp_327",
    "pillarId": "reading",
    "pillarNameAr": "القراءة التعبيرية والنطق الصوتي",
    "pillarNameEn": "Expressive Reading & Pronunciation Lab",
    "pillarIcon": "📖",
    "level": "متقدم (Advanced)",
    "levelCode": "B1-B2",
    "titleAr": "الاختصارات والحذف في الكلام السريع",
    "titleEn": "Contractions and Elision in Fast Speech",
    "descAr": "افهم gonna, wanna, gotta, dunno, lemme, and 'I'd've' وحذف الأصوات: next day → «نِكس دي».",
    "descEn": "Understand gonna, wanna, gotta, dunno, lemme and dropped sounds: next day → /nɛks deɪ/.",
    "speakingGoalAr": "افهم مقطعاً سريعاً فيه ١٠ اختصارات وحوّله لإنجليزي كامل.",
    "speakingGoalEn": "Decode a fast clip with ten reductions into full English.",
    "keyPattern": {
      "ruleAr": "في الكلام العامي السريع: going to → gonna، want to → wanna، got to → gotta، I don't know → dunno، let me → lemme، give me → gimme. والحذف: t و d تختفي بين سواكن (las(t) night، han(d)bag). هذي للسماع والكلام العفوي فقط، مو للكتابة الرسمية.",
      "ruleEn": "Casual speech reduces going to→gonna, want to→wanna, got to→gotta, don't know→dunno; t/d drop between consonants. For listening and casual speech, not formal writing.",
      "formula": "going to→gonna | want to→wanna | got to→gotta | let me→lemme | las(t) night"
    },
    "practicalExamples": [
      {
        "en": "I'm gonna call you later.",
        "ar": "بتصل عليك بعدين."
      },
      {
        "en": "Do you wanna come?",
        "ar": "تبي تجي؟"
      },
      {
        "en": "I gotta go, my mom's waiting.",
        "ar": "لازم أمشي، أمي تنتظر."
      },
      {
        "en": "Lemme see your phone.",
        "ar": "خلني أشوف جوالك."
      },
      {
        "en": "I dunno where he is.",
        "ar": "ما أدري وينه."
      },
      {
        "en": "We left las' night at ten.",
        "ar": "طلعنا البارحة الساعة عشر."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Writing 'gonna' in an email to your boss",
        "correct": "I'm going to send the report.",
        "whyAr": "الاختصارات العامية للكلام فقط."
      },
      {
        "incorrect": "I'm gonna to go.",
        "correct": "I'm gonna go.",
        "whyAr": "gonna فيها to أصلاً."
      },
      {
        "incorrect": "He wanna come.",
        "correct": "He wants to come.",
        "whyAr": "مع he ما نستخدم wanna عادة."
      }
    ],
    "speakingChallenge": {
      "promptAr": "حوّل حوار الصديق لإنجليزي رسمي كامل.",
      "promptEn": "Convert the friends' chat into full standard English.",
      "saraQuestionAr": "وش معنى: Whatcha doing? Wanna grab food? I gotta go؟",
      "saraQuestionEn": "Whatcha doing? Wanna grab food? I gotta go.",
      "recommendedResponseEn": "What are you doing? Do you want to get some food? I have got to go."
    },
    "quiz": [
      {
        "questionAr": "gotta =",
        "questionEn": "'gotta' =",
        "options": [
          "got a",
          "have got to (لازم)",
          "go to"
        ],
        "correctIndex": 1,
        "explanationAr": "لازم."
      },
      {
        "questionAr": "الصيغة الكاملة لـ dunno:",
        "questionEn": "Full form of 'dunno':",
        "options": [
          "don't know",
          "do not now",
          "done now"
        ],
        "correctIndex": 0,
        "explanationAr": "I don't know."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'm going to send the report.",
          "Writing 'gonna' in an email to your boss"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I'm going to send the report. — الاختصارات العامية للكلام فقط."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'm gonna go.",
          "I'm gonna to go."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I'm gonna go. — gonna فيها to أصلاً."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "He wanna come.",
          "He wants to come."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: He wants to come. — مع he ما نستخدم wanna عادة."
      }
    ],
    "whiteboardNotes": {
      "title": "Contractions and Elision in Fast Speech",
      "pointsAr": [
        "يفهم الاختصارات العامية.",
        "يحولها لصيغتها الكاملة.",
        "يعرف متى لا يستخدمها.",
        "في الكلام العامي السريع: going to → gonna، want to → wanna، got to → gotta، I don't know → dunno، let me → lemme، give me → gimme. والحذف: t و d تختفي بين سواكن (las(t) night، han(d)bag). هذي للسماع والكلام العفوي فقط، مو للكتابة الرسمية."
      ],
      "pointsEn": [
        "Understand casual reductions.",
        "Convert them to full forms.",
        "Know when not to use them.",
        "Casual speech reduces going to→gonna, want to→wanna, got to→gotta, don't know→dunno; t/d drop between consonants. For listening and casual speech, not formal writing."
      ],
      "chalkHighlight": "going to→gonna | want to→wanna | got to→gotta | let me→lemme | las(t) night"
    },
    "unit": 6,
    "cefr": "B2",
    "objectivesAr": [
      "يفهم الاختصارات العامية.",
      "يحولها لصيغتها الكاملة.",
      "يعرف متى لا يستخدمها."
    ],
    "objectivesEn": [
      "Understand casual reductions.",
      "Convert them to full forms.",
      "Know when not to use them."
    ],
    "vocabulary": [
      {
        "word": "gonna",
        "ipa": "/ˈɡʌnə/",
        "ar": "راح / بـ (للمستقبل)",
        "exampleEn": "I'm gonna eat.",
        "exampleAr": "باكل.",
        "note": "= going to"
      },
      {
        "word": "wanna",
        "ipa": "/ˈwɑːnə/",
        "ar": "يبي",
        "exampleEn": "Wanna play?",
        "exampleAr": "تبي تلعب؟",
        "note": "= want to"
      },
      {
        "word": "gotta",
        "ipa": "/ˈɡɑːɾə/",
        "ar": "لازم",
        "exampleEn": "I gotta run.",
        "exampleAr": "لازم أمشي.",
        "note": "= (have) got to"
      },
      {
        "word": "dunno",
        "ipa": "/dəˈnoʊ/",
        "ar": "ما أدري",
        "exampleEn": "I dunno.",
        "exampleAr": "ما أدري.",
        "note": "= I don't know"
      },
      {
        "word": "lemme",
        "ipa": "/ˈlɛmi/",
        "ar": "خلني",
        "exampleEn": "Lemme help.",
        "exampleAr": "خلني أساعد.",
        "note": "= let me"
      },
      {
        "word": "gimme",
        "ipa": "/ˈɡɪmi/",
        "ar": "عطني",
        "exampleEn": "Gimme a sec.",
        "exampleAr": "عطني ثانية.",
        "note": "= give me"
      },
      {
        "word": "kinda",
        "ipa": "/ˈkaɪndə/",
        "ar": "نوعاً ما / شوي",
        "exampleEn": "It's kinda cold.",
        "exampleAr": "بارد شوي.",
        "note": "= kind of"
      },
      {
        "word": "'cause",
        "ipa": "/kəz/",
        "ar": "لأن",
        "exampleEn": "I'm tired 'cause I slept late.",
        "exampleAr": "تعبان لأني نمت متأخر.",
        "note": "= because (casual)"
      },
      {
        "word": "whatcha",
        "ipa": "/ˈwʌtʃə/",
        "ar": "وش (تسوي/تبي)",
        "exampleEn": "Whatcha doing?",
        "exampleAr": "وش تسوي؟",
        "note": "= what are you / what do you"
      },
      {
        "word": "gotcha",
        "ipa": "/ˈɡɑːtʃə/",
        "ar": "فهمت عليك",
        "exampleEn": "Gotcha, see you at five.",
        "exampleAr": "فهمت، أشوفك الخمسة.",
        "note": "= (I) got you = I understand"
      }
    ],
    "grammarFocus": {
      "ruleAr": "في الكلام العامي السريع: going to → gonna، want to → wanna، got to → gotta، I don't know → dunno، let me → lemme، give me → gimme. والحذف: t و d تختفي بين سواكن (las(t) night، han(d)bag). هذي للسماع والكلام العفوي فقط، مو للكتابة الرسمية.",
      "ruleEn": "Casual speech reduces going to→gonna, want to→wanna, got to→gotta, don't know→dunno; t/d drop between consonants. For listening and casual speech, not formal writing.",
      "formula": "going to→gonna | want to→wanna | got to→gotta | let me→lemme | las(t) night",
      "examples": [
        {
          "en": "I'm gonna call you later.",
          "ar": "بتصل عليك بعدين."
        },
        {
          "en": "Do you wanna come?",
          "ar": "تبي تجي؟"
        },
        {
          "en": "I gotta go, my mom's waiting.",
          "ar": "لازم أمشي، أمي تنتظر."
        },
        {
          "en": "Lemme see your phone.",
          "ar": "خلني أشوف جوالك."
        },
        {
          "en": "I dunno where he is.",
          "ar": "ما أدري وينه."
        },
        {
          "en": "We left las' night at ten.",
          "ar": "طلعنا البارحة الساعة عشر."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Friend",
        "en": "Hey, whatcha doing tonight?",
        "ar": "هاي، وش بتسوي الليلة؟"
      },
      {
        "speaker": "Student",
        "en": "Dunno. Wanna grab some food?",
        "ar": "ما أدري. تبي ناكل شي؟"
      },
      {
        "speaker": "Friend",
        "en": "Sure, but I gotta finish my homework first.",
        "ar": "أكيد، بس لازم أخلص واجبي أول."
      },
      {
        "speaker": "Student",
        "en": "OK, lemme know when you're done.",
        "ar": "تمام، علمني إذا خلصت."
      },
      {
        "speaker": "Friend",
        "en": "I'm gonna be like an hour. Kinda long assignment.",
        "ar": "بطول حوالي ساعة. الواجب طويل شوي."
      },
      {
        "speaker": "Student",
        "en": "No problem. Gimme a call.",
        "ar": "ولا يهمك. اتصل علي."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Friend: Hey, whatcha doing tonight?\nStudent: Dunno. Wanna grab some food?\nFriend: Sure, but I gotta finish my homework first.\nStudent: OK, lemme know when you're done.\nFriend: I'm gonna be like an hour. Kinda long assignment.\nStudent: No problem. Gimme a call.",
      "questions": [
        {
          "questionAr": "اقتراح الطالب؟",
          "questionEn": "What does the student suggest?",
          "options": [
            "studying",
            "getting food",
            "watching a film"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: getting food"
        },
        {
          "questionAr": "ليش يتأخر الصديق؟",
          "questionEn": "Why must the friend wait?",
          "options": [
            "homework",
            "work",
            "his mom"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: homework"
        },
        {
          "questionAr": "كم بيطول؟",
          "questionEn": "How long will he be?",
          "options": [
            "10 minutes",
            "about an hour",
            "two hours"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: about an hour"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Full vs reduced",
      "items": [
        "going to → /ˈɡʌnə/",
        "want to → /ˈwɑːnə/",
        "let me → /ˈlɛmi/",
        "last night → /læs naɪt/",
        "next day → /nɛks deɪ/"
      ],
      "tipAr": "تدرّب على السماع أولاً؛ بعدين استخدمها مع الأصدقاء فقط."
    },
    "exercises": {
      "easy": [
        {
          "id": "srp_327_e1",
          "type": "meaning",
          "promptEn": "What does \"gonna\" mean?",
          "promptAr": "ما معنى \"gonna\"؟",
          "options": [
            "لازم",
            "لأن",
            "وش (تسوي/تبي)",
            "راح / بـ (للمستقبل)"
          ],
          "correctIndex": 3,
          "answer": "راح / بـ (للمستقبل)",
          "explanationAr": "\"gonna\" /ˈɡʌnə/ تعني: راح / بـ (للمستقبل). مثال: I'm gonna eat."
        },
        {
          "id": "srp_327_e2",
          "type": "meaning",
          "promptEn": "What does \"wanna\" mean?",
          "promptAr": "ما معنى \"wanna\"؟",
          "options": [
            "وش (تسوي/تبي)",
            "خلني",
            "نوعاً ما / شوي",
            "يبي"
          ],
          "correctIndex": 3,
          "answer": "يبي",
          "explanationAr": "\"wanna\" /ˈwɑːnə/ تعني: يبي. مثال: Wanna play?"
        },
        {
          "id": "srp_327_e3",
          "type": "meaning",
          "promptEn": "What does \"gotta\" mean?",
          "promptAr": "ما معنى \"gotta\"؟",
          "options": [
            "عطني",
            "لأن",
            "لازم",
            "راح / بـ (للمستقبل)"
          ],
          "correctIndex": 2,
          "answer": "لازم",
          "explanationAr": "\"gotta\" /ˈɡɑːɾə/ تعني: لازم. مثال: I gotta run."
        },
        {
          "id": "srp_327_e4",
          "type": "meaning",
          "promptEn": "What does \"dunno\" mean?",
          "promptAr": "ما معنى \"dunno\"؟",
          "options": [
            "وش (تسوي/تبي)",
            "فهمت عليك",
            "لأن",
            "ما أدري"
          ],
          "correctIndex": 3,
          "answer": "ما أدري",
          "explanationAr": "\"dunno\" /dəˈnoʊ/ تعني: ما أدري. مثال: I dunno."
        }
      ],
      "medium": [
        {
          "id": "srp_327_m1",
          "type": "gap",
          "promptEn": "Complete: I'm ____ call you later.",
          "promptAr": "أكمل الفراغ: (بتصل عليك بعدين.)",
          "options": [
            "going",
            "gonna",
            "gona"
          ],
          "correctIndex": 1,
          "answer": "I'm gonna call you later.",
          "explanationAr": "الإجابة: gonna. في الكلام العامي السريع: going to → gonna، want to → wanna، got to → gotta، I don't know → dunno، let me → lemme، give me → gimme. والحذف: t و d تختفي بين سواكن (las(t) night، han(d)bag). هذي للسماع والكلام العفوي فقط، مو للكتابة الرسمية."
        },
        {
          "id": "srp_327_m2",
          "type": "gap",
          "promptEn": "Complete: Do you ____ come?",
          "promptAr": "أكمل الفراغ: (تبي تجي؟)",
          "options": [
            "wanna",
            "want",
            "wants"
          ],
          "correctIndex": 0,
          "answer": "Do you wanna come?",
          "explanationAr": "الإجابة: wanna. في الكلام العامي السريع: going to → gonna، want to → wanna، got to → gotta، I don't know → dunno، let me → lemme، give me → gimme. والحذف: t و d تختفي بين سواكن (las(t) night، han(d)bag). هذي للسماع والكلام العفوي فقط، مو للكتابة الرسمية."
        },
        {
          "id": "srp_327_m3",
          "type": "gap",
          "promptEn": "Complete: I ____ go, my mom's waiting.",
          "promptAr": "أكمل الفراغ: (لازم أمشي، أمي تنتظر.)",
          "options": [
            "goto",
            "gotta",
            "got"
          ],
          "correctIndex": 1,
          "answer": "I gotta go, my mom's waiting.",
          "explanationAr": "الإجابة: gotta. في الكلام العامي السريع: going to → gonna، want to → wanna، got to → gotta، I don't know → dunno، let me → lemme، give me → gimme. والحذف: t و d تختفي بين سواكن (las(t) night، han(d)bag). هذي للسماع والكلام العفوي فقط، مو للكتابة الرسمية."
        },
        {
          "id": "srp_327_m4",
          "type": "gap",
          "promptEn": "Complete: ____ see your phone.",
          "promptAr": "أكمل الفراغ: (خلني أشوف جوالك.)",
          "options": [
            "Let",
            "Leme",
            "Lemme"
          ],
          "correctIndex": 2,
          "answer": "Lemme see your phone.",
          "explanationAr": "الإجابة: Lemme. في الكلام العامي السريع: going to → gonna، want to → wanna، got to → gotta، I don't know → dunno، let me → lemme، give me → gimme. والحذف: t و d تختفي بين سواكن (las(t) night، han(d)bag). هذي للسماع والكلام العفوي فقط، مو للكتابة الرسمية."
        }
      ],
      "hard": [
        {
          "id": "srp_327_h1",
          "type": "order",
          "promptEn": "Put the words in order: I / is. / where / he / dunno",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (ما أدري وينه.)",
          "answer": "I dunno where he is.",
          "explanationAr": "الترتيب الصحيح: I dunno where he is."
        },
        {
          "id": "srp_327_h2",
          "type": "order",
          "promptEn": "Put the words in order: night / left / las' / at / ten. / We",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (طلعنا البارحة الساعة عشر.)",
          "answer": "We left las' night at ten.",
          "explanationAr": "الترتيب الصحيح: We left las' night at ten."
        },
        {
          "id": "srp_327_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: تبي تجي؟",
          "answer": "Do you wanna come?",
          "explanationAr": "ترجمة مقترحة: Do you wanna come?"
        },
        {
          "id": "srp_327_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: خلني أشوف جوالك.",
          "answer": "Lemme see your phone.",
          "explanationAr": "ترجمة مقترحة: Lemme see your phone."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Using slang in IELTS/formal speaking",
        "correct": "Use full forms in exams",
        "whyAr": "الممتحن ممكن يعتبرها غير رسمية."
      },
      {
        "incorrect": "Missing meaning in films",
        "correct": "Listen for gonna/wanna/gotta",
        "whyAr": "أكثر شي يصعّب فهم الأفلام."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (الـ T الأمريكية: water و better): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "hotel /hoʊˈtɛl/",
          "Flap in 'hotel': «هودِل»"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: hotel /hoʊˈtɛl/ — المقطع بعد t منبور، فلا flap.",
        "fromLessonId": "srp_326"
      },
      {
        "questionAr": "مراجعة (القراءة السريعة للفكرة العامة (Skimming)): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Read headline + first sentences first",
          "Reading every word slowly"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Read headline + first sentences first — الهدف الفكرة العامة مو التفاصيل.",
        "fromLessonId": "srp_324"
      },
      {
        "questionAr": "مراجعة (الكلام المتصل: ربط الكلمات): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Turn_it_off /tɜːrnɪˈtɔːf/",
          "Turn / it / off (separated)"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Turn_it_off /tɜːrnɪˈtɔːf/ — الفصل يخلي الكلام متقطع.",
        "fromLessonId": "srp_303"
      },
      {
        "questionAr": "ما معنى \"on time\"؟",
        "questionEn": "What does \"on time\" mean?",
        "options": [
          "مجاني",
          "وصول",
          "في الموعد",
          "ساري"
        ],
        "correctIndex": 2,
        "explanationAr": "\"on time\" /ɑːn taɪm/ تعني: في الموعد. مثال: The train is on time.",
        "fromLessonId": "srp_325"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (لازم أمشي، أمي تنتظر.)",
          "questionEn": "Complete: I ____ go, my mom's waiting.",
          "options": [
            "goto",
            "gotta",
            "got"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: gotta. في الكلام العامي السريع: going to → gonna، want to → wanna، got to → gotta، I don't know → dunno، let me → lemme، give me → gimme. والحذف: t و d تختفي بين سواكن (las(t) night، han(d)bag). هذي للسماع والكلام العفوي فقط، مو للكتابة الرسمية."
        },
        {
          "questionAr": "أكمل الفراغ: (خلني أشوف جوالك.)",
          "questionEn": "Complete: ____ see your phone.",
          "options": [
            "Let",
            "Leme",
            "Lemme"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: Lemme. في الكلام العامي السريع: going to → gonna، want to → wanna، got to → gotta، I don't know → dunno، let me → lemme، give me → gimme. والحذف: t و d تختفي بين سواكن (las(t) night، han(d)bag). هذي للسماع والكلام العفوي فقط، مو للكتابة الرسمية."
        },
        {
          "questionAr": "ما معنى \"lemme\"؟",
          "questionEn": "What does \"lemme\" mean?",
          "options": [
            "راح / بـ (للمستقبل)",
            "لأن",
            "عطني",
            "خلني"
          ],
          "correctIndex": 3,
          "explanationAr": "\"lemme\" /ˈlɛmi/ تعني: خلني. مثال: Lemme help."
        },
        {
          "questionAr": "ما معنى \"gimme\"؟",
          "questionEn": "What does \"gimme\" mean?",
          "options": [
            "لازم",
            "عطني",
            "لأن",
            "يبي"
          ],
          "correctIndex": 1,
          "explanationAr": "\"gimme\" /ˈɡɪmi/ تعني: عطني. مثال: Gimme a sec."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Use full forms in exams",
            "Using slang in IELTS/formal speaking"
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: Use full forms in exams — الممتحن ممكن يعتبرها غير رسمية."
        }
      ]
    }
  },
  {
    "id": "srp_328",
    "pillarId": "reading",
    "pillarNameAr": "القراءة التعبيرية والنطق الصوتي",
    "pillarNameEn": "Expressive Reading & Pronunciation Lab",
    "pillarIcon": "📖",
    "level": "متقدم (Advanced)",
    "levelCode": "B1-B2",
    "titleAr": "القراءة الاستنتاجية: ما بين السطور",
    "titleEn": "Reading Between the Lines: Inference",
    "descAr": "افهم رأي الكاتب ونبرته واللي ما قاله صراحة من مقال رأي.",
    "descEn": "Infer the writer's opinion, tone and unstated meaning in an opinion piece.",
    "speakingGoalAr": "حدد رأي الكاتب ونبرته مع دليلين من النص.",
    "speakingGoalEn": "Identify the writer's view and tone with two pieces of evidence.",
    "keyPattern": {
      "ruleAr": "الاستنتاج = دليل من النص + معرفتك. ابحث عن: الصفات (shocking, impressive)، الأفعال الرأيية (claim, admit)، الكلمات المخففة (perhaps, seems)، والمقارنات. اسأل: ليش اختار الكاتب هالكلمة؟",
      "ruleEn": "Inference = text evidence + your knowledge. Look for evaluative adjectives, reporting verbs (claim vs state), hedges (perhaps), contrasts.",
      "formula": "Evidence (word/phrase) → What it suggests → Writer's attitude"
    },
    "practicalExamples": [
      {
        "en": "The company claims the product is safe.",
        "ar": "الشركة تدّعي إن المنتج آمن."
      },
      {
        "en": "Surprisingly, few people noticed the change.",
        "ar": "المفاجئ إن ناس قليلين لاحظوا التغيير."
      },
      {
        "en": "Perhaps the plan was a little too ambitious.",
        "ar": "يمكن الخطة كانت طموحة زيادة شوي."
      },
      {
        "en": "Yet another meeting was cancelled.",
        "ar": "اجتماع ثاني انلغى بعد."
      },
      {
        "en": "The so-called experts disagreed.",
        "ar": "اللي يسمونهم خبراء اختلفوا."
      },
      {
        "en": "Despite the hype, the results were modest.",
        "ar": "رغم الضجة، النتائج كانت متواضعة."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "claims = proves",
        "correct": "claims = يدّعي (الكاتب يشك)",
        "whyAr": "اختيار الفعل يبين رأي الكاتب."
      },
      {
        "incorrect": "so-called = famous",
        "correct": "so-called = ما يسمى (سخرية/شك)",
        "whyAr": "كلمة فيها انتقاد."
      },
      {
        "incorrect": "Answering from personal opinion",
        "correct": "Answer from the writer's words",
        "whyAr": "الاستنتاج من النص مو من رأيك."
      }
    ],
    "speakingChallenge": {
      "promptAr": "حلل مع سارة نبرة كاتب مقال المهرجان.",
      "promptEn": "Analyse the festival writer's tone with Sara.",
      "saraQuestionAr": "هل الكاتب راضي عن المهرجان؟ وكيف عرفت؟",
      "saraQuestionEn": "Is the writer happy with the festival? How do you know?",
      "recommendedResponseEn": "Not really. The writer is mildly critical. He uses 'claimed' and 'so-called', which show doubt, but he's fair because he praises the food area. He implies the festival should move to winter."
    },
    "quiz": [
      {
        "questionAr": "«claimed» توحي بأن الكاتب:",
        "questionEn": "'claimed' suggests the writer:",
        "options": [
          "agrees",
          "has doubts",
          "is neutral"
        ],
        "correctIndex": 1,
        "explanationAr": "يشك."
      },
      {
        "questionAr": "دليل على الإنصاف في النص:",
        "questionEn": "Evidence of balance:",
        "options": [
          "half empty",
          "To be fair, the food area was impressive",
          "45-degree heat"
        ],
        "correctIndex": 1,
        "explanationAr": "To be fair."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "claims = proves",
          "claims = يدّعي (الكاتب يشك)"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: claims = يدّعي (الكاتب يشك) — اختيار الفعل يبين رأي الكاتب."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "so-called = ما يسمى (سخرية/شك)",
          "so-called = famous"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: so-called = ما يسمى (سخرية/شك) — كلمة فيها انتقاد."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Answering from personal opinion",
          "Answer from the writer's words"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Answer from the writer's words — الاستنتاج من النص مو من رأيك."
      }
    ],
    "whiteboardNotes": {
      "title": "Reading Between the Lines: Inference",
      "pointsAr": [
        "يستنتج رأي الكاتب.",
        "يحدد النبرة.",
        "يدعم الاستنتاج بدليل.",
        "الاستنتاج = دليل من النص + معرفتك. ابحث عن: الصفات (shocking, impressive)، الأفعال الرأيية (claim, admit)، الكلمات المخففة (perhaps, seems)، والمقارنات. اسأل: ليش اختار الكاتب هالكلمة؟"
      ],
      "pointsEn": [
        "Infer the writer's opinion.",
        "Identify tone.",
        "Support inferences with evidence.",
        "Inference = text evidence + your knowledge. Look for evaluative adjectives, reporting verbs (claim vs state), hedges (perhaps), contrasts."
      ],
      "chalkHighlight": "Evidence (word/phrase) → What it suggests → Writer's attitude"
    },
    "unit": 6,
    "cefr": "B2",
    "objectivesAr": [
      "يستنتج رأي الكاتب.",
      "يحدد النبرة.",
      "يدعم الاستنتاج بدليل."
    ],
    "objectivesEn": [
      "Infer the writer's opinion.",
      "Identify tone.",
      "Support inferences with evidence."
    ],
    "vocabulary": [
      {
        "word": "claim",
        "ipa": "/kleɪm/",
        "ar": "يدّعي",
        "exampleEn": "He claims it's true.",
        "exampleAr": "يدّعي إنه صحيح."
      },
      {
        "word": "admit",
        "ipa": "/ədˈmɪt/",
        "ar": "يعترف",
        "exampleEn": "She admitted the mistake.",
        "exampleAr": "اعترفت بالخطأ."
      },
      {
        "word": "so-called",
        "ipa": "/ˌsoʊˈkɔːld/",
        "ar": "ما يسمى",
        "exampleEn": "the so-called solution",
        "exampleAr": "ما يسمى الحل"
      },
      {
        "word": "hype",
        "ipa": "/haɪp/",
        "ar": "ضجة إعلامية",
        "exampleEn": "all the hype",
        "exampleAr": "كل هالضجة"
      },
      {
        "word": "modest",
        "ipa": "/ˈmɑːdɪst/",
        "ar": "متواضع",
        "exampleEn": "modest results",
        "exampleAr": "نتائج متواضعة"
      },
      {
        "word": "tone",
        "ipa": "/toʊn/",
        "ar": "نبرة",
        "exampleEn": "a critical tone",
        "exampleAr": "نبرة ناقدة"
      },
      {
        "word": "imply",
        "ipa": "/ɪmˈplaɪ/",
        "ar": "يلمّح",
        "exampleEn": "What does he imply?",
        "exampleAr": "وش يلمّح له؟"
      },
      {
        "word": "infer",
        "ipa": "/ɪnˈfɜːr/",
        "ar": "يستنتج",
        "exampleEn": "We can infer that...",
        "exampleAr": "نقدر نستنتج إن..."
      },
      {
        "word": "skeptical",
        "ipa": "/ˈskɛptɪkəl/",
        "ar": "متشكك",
        "exampleEn": "a skeptical writer",
        "exampleAr": "كاتب متشكك"
      },
      {
        "word": "ambitious",
        "ipa": "/æmˈbɪʃəs/",
        "ar": "طموح",
        "exampleEn": "an ambitious plan",
        "exampleAr": "خطة طموحة"
      }
    ],
    "grammarFocus": {
      "ruleAr": "الاستنتاج = دليل من النص + معرفتك. ابحث عن: الصفات (shocking, impressive)، الأفعال الرأيية (claim, admit)، الكلمات المخففة (perhaps, seems)، والمقارنات. اسأل: ليش اختار الكاتب هالكلمة؟",
      "ruleEn": "Inference = text evidence + your knowledge. Look for evaluative adjectives, reporting verbs (claim vs state), hedges (perhaps), contrasts.",
      "formula": "Evidence (word/phrase) → What it suggests → Writer's attitude",
      "examples": [
        {
          "en": "The company claims the product is safe.",
          "ar": "الشركة تدّعي إن المنتج آمن."
        },
        {
          "en": "Surprisingly, few people noticed the change.",
          "ar": "المفاجئ إن ناس قليلين لاحظوا التغيير."
        },
        {
          "en": "Perhaps the plan was a little too ambitious.",
          "ar": "يمكن الخطة كانت طموحة زيادة شوي."
        },
        {
          "en": "Yet another meeting was cancelled.",
          "ar": "اجتماع ثاني انلغى بعد."
        },
        {
          "en": "The so-called experts disagreed.",
          "ar": "اللي يسمونهم خبراء اختلفوا."
        },
        {
          "en": "Despite the hype, the results were modest.",
          "ar": "رغم الضجة، النتائج كانت متواضعة."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "P1",
        "en": "Every summer, the city promises a 'world-class' festival.",
        "ar": "كل صيف المدينة توعد بمهرجان «عالمي»."
      },
      {
        "speaker": "P2",
        "en": "This year, organisers claimed over a million visitors would attend.",
        "ar": "هالسنة المنظمون ادّعوا إن أكثر من مليون زائر بيحضرون."
      },
      {
        "speaker": "P3",
        "en": "Yet, on the opening night, the so-called main stage was half empty.",
        "ar": "ومع ذلك، ليلة الافتتاح، ما يسمى المسرح الرئيسي كان نصه فاضي."
      },
      {
        "speaker": "P4",
        "en": "Perhaps the 45-degree heat had something to do with it.",
        "ar": "يمكن حرارة ٤٥ درجة لها علاقة."
      },
      {
        "speaker": "P5",
        "en": "To be fair, the food area was impressive.",
        "ar": "للإنصاف، منطقة الأكل كانت مبهرة."
      },
      {
        "speaker": "P6",
        "en": "Still, one wonders whether a winter date might be wiser.",
        "ar": "مع هذا، الواحد يتساءل إذا موعد شتوي يكون أحكم."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "P1: Every summer, the city promises a 'world-class' festival.\nP2: This year, organisers claimed over a million visitors would attend.\nP3: Yet, on the opening night, the so-called main stage was half empty.\nP4: Perhaps the 45-degree heat had something to do with it.\nP5: To be fair, the food area was impressive.\nP6: Still, one wonders whether a winter date might be wiser.",
      "questions": [
        {
          "questionAr": "نبرة الكاتب؟",
          "questionEn": "What is the writer's tone?",
          "options": [
            "enthusiastic",
            "mildly critical",
            "angry"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: mildly critical"
        },
        {
          "questionAr": "أي كلمة تبين الشك؟",
          "questionEn": "Which word shows doubt about the organisers?",
          "options": [
            "claimed",
            "attend",
            "promises"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: claimed"
        },
        {
          "questionAr": "اقتراح الكاتب؟",
          "questionEn": "What does the writer suggest?",
          "options": [
            "cancel the festival",
            "move it to winter",
            "bigger stage"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: move it to winter"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Reading irony: stress and pause",
      "items": [
        "the so-CALLED main stage",
        "'world-CLASS' (quotation = doubt)",
        "To be FAIR, ..."
      ],
      "tipAr": "علامات التنصيص حول كلمة غالباً تعني سخرية؛ اقرأها بنبرة متشككة."
    },
    "exercises": {
      "easy": [
        {
          "id": "srp_328_e1",
          "type": "meaning",
          "promptEn": "What does \"claim\" mean?",
          "promptAr": "ما معنى \"claim\"؟",
          "options": [
            "يدّعي",
            "ما يسمى",
            "يستنتج",
            "طموح"
          ],
          "correctIndex": 0,
          "answer": "يدّعي",
          "explanationAr": "\"claim\" /kleɪm/ تعني: يدّعي. مثال: He claims it's true."
        },
        {
          "id": "srp_328_e2",
          "type": "meaning",
          "promptEn": "What does \"admit\" mean?",
          "promptAr": "ما معنى \"admit\"؟",
          "options": [
            "متواضع",
            "يعترف",
            "ما يسمى",
            "يلمّح"
          ],
          "correctIndex": 1,
          "answer": "يعترف",
          "explanationAr": "\"admit\" /ədˈmɪt/ تعني: يعترف. مثال: She admitted the mistake."
        },
        {
          "id": "srp_328_e3",
          "type": "meaning",
          "promptEn": "What does \"so-called\" mean?",
          "promptAr": "ما معنى \"so-called\"؟",
          "options": [
            "ما يسمى",
            "يلمّح",
            "ضجة إعلامية",
            "يعترف"
          ],
          "correctIndex": 0,
          "answer": "ما يسمى",
          "explanationAr": "\"so-called\" /ˌsoʊˈkɔːld/ تعني: ما يسمى. مثال: the so-called solution"
        },
        {
          "id": "srp_328_e4",
          "type": "meaning",
          "promptEn": "What does \"hype\" mean?",
          "promptAr": "ما معنى \"hype\"؟",
          "options": [
            "متواضع",
            "متشكك",
            "يستنتج",
            "ضجة إعلامية"
          ],
          "correctIndex": 3,
          "answer": "ضجة إعلامية",
          "explanationAr": "\"hype\" /haɪp/ تعني: ضجة إعلامية. مثال: all the hype"
        }
      ],
      "medium": [
        {
          "id": "srp_328_m1",
          "type": "gap",
          "promptEn": "Complete: The company ____ the product is safe.",
          "promptAr": "أكمل الفراغ: (الشركة تدّعي إن المنتج آمن.)",
          "options": [
            "claims",
            "proves",
            "shows"
          ],
          "correctIndex": 0,
          "answer": "The company claims the product is safe.",
          "explanationAr": "الإجابة: claims. الاستنتاج = دليل من النص + معرفتك. ابحث عن: الصفات (shocking, impressive)، الأفعال الرأيية (claim, admit)، الكلمات المخففة (perhaps, seems)، والمقارنات. اسأل: ليش اختار الكاتب هالكلمة؟"
        },
        {
          "id": "srp_328_m2",
          "type": "gap",
          "promptEn": "Complete: ____, few people noticed the change.",
          "promptAr": "أكمل الفراغ: (المفاجئ إن ناس قليلين لاحظوا التغيير.)",
          "options": [
            "Naturally",
            "Surprisingly",
            "Obviously"
          ],
          "correctIndex": 1,
          "answer": "Surprisingly, few people noticed the change.",
          "explanationAr": "الإجابة: Surprisingly. الاستنتاج = دليل من النص + معرفتك. ابحث عن: الصفات (shocking, impressive)، الأفعال الرأيية (claim, admit)، الكلمات المخففة (perhaps, seems)، والمقارنات. اسأل: ليش اختار الكاتب هالكلمة؟"
        },
        {
          "id": "srp_328_m3",
          "type": "gap",
          "promptEn": "Complete: ____ the plan was a little too ambitious.",
          "promptAr": "أكمل الفراغ: (يمكن الخطة كانت طموحة زيادة شوي.)",
          "options": [
            "Perhaps",
            "Clearly",
            "Certainly"
          ],
          "correctIndex": 0,
          "answer": "Perhaps the plan was a little too ambitious.",
          "explanationAr": "الإجابة: Perhaps. الاستنتاج = دليل من النص + معرفتك. ابحث عن: الصفات (shocking, impressive)، الأفعال الرأيية (claim, admit)، الكلمات المخففة (perhaps, seems)، والمقارنات. اسأل: ليش اختار الكاتب هالكلمة؟"
        },
        {
          "id": "srp_328_m4",
          "type": "gap",
          "promptEn": "Complete: ____ meeting was cancelled.",
          "promptAr": "أكمل الفراغ: (اجتماع ثاني انلغى بعد.)",
          "options": [
            "A new",
            "One",
            "Yet another"
          ],
          "correctIndex": 2,
          "answer": "Yet another meeting was cancelled.",
          "explanationAr": "الإجابة: Yet another. الاستنتاج = دليل من النص + معرفتك. ابحث عن: الصفات (shocking, impressive)، الأفعال الرأيية (claim, admit)، الكلمات المخففة (perhaps, seems)، والمقارنات. اسأل: ليش اختار الكاتب هالكلمة؟"
        }
      ],
      "hard": [
        {
          "id": "srp_328_h1",
          "type": "order",
          "promptEn": "Put the words in order: disagreed. / The / experts / so-called",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (اللي يسمونهم خبراء اختلفوا.)",
          "answer": "The so-called experts disagreed.",
          "explanationAr": "الترتيب الصحيح: The so-called experts disagreed."
        },
        {
          "id": "srp_328_h2",
          "type": "order",
          "promptEn": "Put the words in order: the / the / hype, / Despite / results / modest. / were",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (رغم الضجة، النتائج كانت متواضعة.)",
          "answer": "Despite the hype, the results were modest.",
          "explanationAr": "الترتيب الصحيح: Despite the hype, the results were modest."
        },
        {
          "id": "srp_328_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: المفاجئ إن ناس قليلين لاحظوا التغيير.",
          "answer": "Surprisingly, few people noticed the change.",
          "explanationAr": "ترجمة مقترحة: Surprisingly, few people noticed the change."
        },
        {
          "id": "srp_328_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: اجتماع ثاني انلغى بعد.",
          "answer": "Yet another meeting was cancelled.",
          "explanationAr": "ترجمة مقترحة: Yet another meeting was cancelled."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Taking 'world-class' in quotes literally",
        "correct": "Quotes can signal irony",
        "whyAr": "الكاتب ينقل الكلمة ويشكك فيها."
      },
      {
        "incorrect": "Missing hedges (perhaps, might)",
        "correct": "Hedges = polite criticism",
        "whyAr": "الإنجليز ينتقدون بلطف."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (الاختصارات والحذف في الكلام السريع): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'm gonna to go.",
          "I'm gonna go."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I'm gonna go. — gonna فيها to أصلاً.",
        "fromLessonId": "srp_327"
      },
      {
        "questionAr": "مراجعة (البحث عن معلومة محددة (Scanning)): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Jump to the line with your flight number",
          "Reading the whole timetable top to bottom"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Jump to the line with your flight number — ابحث عن المفتاح مباشرة.",
        "fromLessonId": "srp_325"
      },
      {
        "questionAr": "مراجعة (الصيغ الضعيفة: can, to, of, and, for): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "fish 'n' chips /fɪʃən tʃɪps/",
          "Fish AND chips (strong)"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: fish 'n' chips /fɪʃən tʃɪps/ — and ضعيفة.",
        "fromLessonId": "srp_322"
      },
      {
        "questionAr": "ما معنى \"matter\"؟",
        "questionEn": "What does \"matter\" mean?",
        "options": [
          "زبدة",
          "مدينة",
          "يهم",
          "أفضل"
        ],
        "correctIndex": 2,
        "explanationAr": "\"matter\" /ˈmæɾər/ تعني: يهم. مثال: It doesn't matter.",
        "fromLessonId": "srp_326"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (يمكن الخطة كانت طموحة زيادة شوي.)",
          "questionEn": "Complete: ____ the plan was a little too ambitious.",
          "options": [
            "Perhaps",
            "Clearly",
            "Certainly"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: Perhaps. الاستنتاج = دليل من النص + معرفتك. ابحث عن: الصفات (shocking, impressive)، الأفعال الرأيية (claim, admit)، الكلمات المخففة (perhaps, seems)، والمقارنات. اسأل: ليش اختار الكاتب هالكلمة؟"
        },
        {
          "questionAr": "أكمل الفراغ: (اجتماع ثاني انلغى بعد.)",
          "questionEn": "Complete: ____ meeting was cancelled.",
          "options": [
            "A new",
            "One",
            "Yet another"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: Yet another. الاستنتاج = دليل من النص + معرفتك. ابحث عن: الصفات (shocking, impressive)، الأفعال الرأيية (claim, admit)، الكلمات المخففة (perhaps, seems)، والمقارنات. اسأل: ليش اختار الكاتب هالكلمة؟"
        },
        {
          "questionAr": "ما معنى \"modest\"؟",
          "questionEn": "What does \"modest\" mean?",
          "options": [
            "طموح",
            "ما يسمى",
            "متشكك",
            "متواضع"
          ],
          "correctIndex": 3,
          "explanationAr": "\"modest\" /ˈmɑːdɪst/ تعني: متواضع. مثال: modest results"
        },
        {
          "questionAr": "ما معنى \"tone\"؟",
          "questionEn": "What does \"tone\" mean?",
          "options": [
            "نبرة",
            "ما يسمى",
            "يدّعي",
            "يعترف"
          ],
          "correctIndex": 0,
          "explanationAr": "\"tone\" /toʊn/ تعني: نبرة. مثال: a critical tone"
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Taking 'world-class' in quotes literally",
            "Quotes can signal irony"
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: Quotes can signal irony — الكاتب ينقل الكلمة ويشكك فيها."
        }
      ]
    }
  },
  {
    "id": "srp_329",
    "pillarId": "reading",
    "pillarNameAr": "القراءة التعبيرية والنطق الصوتي",
    "pillarNameEn": "Expressive Reading & Pronunciation Lab",
    "pillarIcon": "📖",
    "level": "متقدم (Advanced)",
    "levelCode": "B1-B2",
    "titleAr": "الكلمات المتشابهة نطقاً: there/their/they're",
    "titleEn": "Homophones and Spelling Traps",
    "descAr": "كلمات نفس النطق وكتابة مختلفة: there/their/they're، your/you're، its/it's، to/too/two.",
    "descEn": "Same sound, different spelling: there/their/they're, your/you're, its/it's, to/too/two.",
    "speakingGoalAr": "صحح عشرة أخطاء homophones في رسائل حقيقية.",
    "speakingGoalEn": "Fix ten homophone errors in real messages.",
    "keyPattern": {
      "ruleAr": "there = هناك/يوجد، their = حقهم، they're = they are. your = حقك، you're = you are. its = حقه (لغير العاقل)، it's = it is. to = إلى، too = أيضاً/زيادة، two = ٢. اختبار سريع: هل تقدر تقول الصيغة الكاملة (they are / you are / it is)؟",
      "ruleEn": "Test: can you expand it (they are, you are, it is)? If yes, use the contraction.",
      "formula": "they're = they are | you're = you are | it's = it is | otherwise: their / your / its"
    },
    "practicalExamples": [
      {
        "en": "They're at their house over there.",
        "ar": "هم في بيتهم هناك."
      },
      {
        "en": "You're going to love your gift.",
        "ar": "بتحب هديتك."
      },
      {
        "en": "It's raining and the cat hurt its leg.",
        "ar": "تمطر والقطة جرحت رجلها."
      },
      {
        "en": "I have two tickets, too.",
        "ar": "عندي تذكرتين بعد."
      },
      {
        "en": "I'd like to buy a pair of pears.",
        "ar": "أبي أشتري زوج كمثرى."
      },
      {
        "en": "Whose phone is this? Who's calling?",
        "ar": "جوال مين هذا؟ مين يتصل؟"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Your welcome.",
        "correct": "You're welcome.",
        "whyAr": "you are welcome."
      },
      {
        "incorrect": "Their going to the mall.",
        "correct": "They're going to the mall.",
        "whyAr": "they are going."
      },
      {
        "incorrect": "The company changed it's logo.",
        "correct": "The company changed its logo.",
        "whyAr": "its ملكية بدون فاصلة."
      }
    ],
    "speakingChallenge": {
      "promptAr": "صحح رسالة سارة.",
      "promptEn": "Correct Sara's message.",
      "saraQuestionAr": "صحح: Your invited! Their will be food, and its free to.",
      "saraQuestionEn": "Your invited! Their will be food, and its free to.",
      "recommendedResponseEn": "You're invited! There will be food, and it's free too."
    },
    "quiz": [
      {
        "questionAr": "أكمل: ___ going to be late.",
        "questionEn": "Complete: ___ going to be late.",
        "options": [
          "Their",
          "There",
          "They're"
        ],
        "correctIndex": 2,
        "explanationAr": "They are going."
      },
      {
        "questionAr": "أكمل: The dog wagged ___ tail.",
        "questionEn": "Complete: The dog wagged ___ tail.",
        "options": [
          "it's",
          "its",
          "its'"
        ],
        "correctIndex": 1,
        "explanationAr": "ملكية ⇐ its."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "You're welcome.",
          "Your welcome."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: You're welcome. — you are welcome."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Their going to the mall.",
          "They're going to the mall."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: They're going to the mall. — they are going."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "The company changed its logo.",
          "The company changed it's logo."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: The company changed its logo. — its ملكية بدون فاصلة."
      }
    ],
    "whiteboardNotes": {
      "title": "Homophones and Spelling Traps",
      "pointsAr": [
        "يميز الأزواج والثلاثيات الشائعة.",
        "يطبق اختبار التوسيع.",
        "يصحح رسائل.",
        "there = هناك/يوجد، their = حقهم، they're = they are. your = حقك، you're = you are. its = حقه (لغير العاقل)، it's = it is. to = إلى، too = أيضاً/زيادة، two = ٢. اختبار سريع: هل تقدر تقول الصيغة الكاملة (they are / you are / it is)؟"
      ],
      "pointsEn": [
        "Distinguish common homophones.",
        "Apply the expansion test.",
        "Correct messages.",
        "Test: can you expand it (they are, you are, it is)? If yes, use the contraction."
      ],
      "chalkHighlight": "they're = they are | you're = you are | it's = it is | otherwise: their / your / its"
    },
    "unit": 6,
    "cefr": "B2",
    "objectivesAr": [
      "يميز الأزواج والثلاثيات الشائعة.",
      "يطبق اختبار التوسيع.",
      "يصحح رسائل."
    ],
    "objectivesEn": [
      "Distinguish common homophones.",
      "Apply the expansion test.",
      "Correct messages."
    ],
    "vocabulary": [
      {
        "word": "there",
        "ipa": "/ðɛr/",
        "ar": "هناك/يوجد",
        "exampleEn": "over there",
        "exampleAr": "هناك"
      },
      {
        "word": "their",
        "ipa": "/ðɛr/",
        "ar": "حقهم",
        "exampleEn": "their car",
        "exampleAr": "سيارتهم"
      },
      {
        "word": "they're",
        "ipa": "/ðɛr/",
        "ar": "هم (صيغة مختصرة)",
        "exampleEn": "They're late.",
        "exampleAr": "هم متأخرين.",
        "note": "= they are"
      },
      {
        "word": "your",
        "ipa": "/jɔːr/",
        "ar": "حقك",
        "exampleEn": "your bag",
        "exampleAr": "شنطتك"
      },
      {
        "word": "you're",
        "ipa": "/jʊr/",
        "ar": "أنت (صيغة مختصرة)",
        "exampleEn": "You're right.",
        "exampleAr": "معك حق.",
        "note": "= you are"
      },
      {
        "word": "its",
        "ipa": "/ɪts/",
        "ar": "حقه (لغير العاقل)",
        "exampleEn": "its colour",
        "exampleAr": "لونه"
      },
      {
        "word": "it's",
        "ipa": "/ɪts/",
        "ar": "هو / هي (صيغة مختصرة)",
        "exampleEn": "It's late.",
        "exampleAr": "متأخر.",
        "note": "= it is / it has"
      },
      {
        "word": "whose",
        "ipa": "/huːz/",
        "ar": "لمن",
        "exampleEn": "Whose bag?",
        "exampleAr": "شنطة مين؟"
      },
      {
        "word": "weather",
        "ipa": "/ˈwɛðər/",
        "ar": "طقس",
        "exampleEn": "nice weather",
        "exampleAr": "جو حلو"
      },
      {
        "word": "whether",
        "ipa": "/ˈwɛðər/",
        "ar": "إذا/ما إذا",
        "exampleEn": "I don't know whether...",
        "exampleAr": "ما أدري إذا..."
      }
    ],
    "grammarFocus": {
      "ruleAr": "there = هناك/يوجد، their = حقهم، they're = they are. your = حقك، you're = you are. its = حقه (لغير العاقل)، it's = it is. to = إلى، too = أيضاً/زيادة، two = ٢. اختبار سريع: هل تقدر تقول الصيغة الكاملة (they are / you are / it is)؟",
      "ruleEn": "Test: can you expand it (they are, you are, it is)? If yes, use the contraction.",
      "formula": "they're = they are | you're = you are | it's = it is | otherwise: their / your / its",
      "examples": [
        {
          "en": "They're at their house over there.",
          "ar": "هم في بيتهم هناك."
        },
        {
          "en": "You're going to love your gift.",
          "ar": "بتحب هديتك."
        },
        {
          "en": "It's raining and the cat hurt its leg.",
          "ar": "تمطر والقطة جرحت رجلها."
        },
        {
          "en": "I have two tickets, too.",
          "ar": "عندي تذكرتين بعد."
        },
        {
          "en": "I'd like to buy a pair of pears.",
          "ar": "أبي أشتري زوج كمثرى."
        },
        {
          "en": "Whose phone is this? Who's calling?",
          "ar": "جوال مين هذا؟ مين يتصل؟"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Message",
        "en": "Hi team, there meeting is at 3. Your all invited!",
        "ar": "(رسالة فيها أخطاء)"
      },
      {
        "speaker": "Correction",
        "en": "Hi team, their meeting is at 3. You're all invited!",
        "ar": "التصحيح"
      },
      {
        "speaker": "Message",
        "en": "Its a big day for the company and it's new app.",
        "ar": "(رسالة فيها أخطاء)"
      },
      {
        "speaker": "Correction",
        "en": "It's a big day for the company and its new app.",
        "ar": "التصحيح"
      },
      {
        "speaker": "Message",
        "en": "Please bring to copies of the report to.",
        "ar": "(رسالة فيها أخطاء)"
      },
      {
        "speaker": "Correction",
        "en": "Please bring two copies of the report too.",
        "ar": "التصحيح"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Message: Hi team, there meeting is at 3. Your all invited!\nCorrection: Hi team, their meeting is at 3. You're all invited!\nMessage: Its a big day for the company and it's new app.\nCorrection: It's a big day for the company and its new app.\nMessage: Please bring to copies of the report to.\nCorrection: Please bring two copies of the report too.",
      "questions": [
        {
          "questionAr": "التصحيح:",
          "questionEn": "'Your all invited' should be:",
          "options": [
            "You're all invited",
            "Your all invite",
            "Yours all invited"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: You're all invited"
        },
        {
          "questionAr": "التصحيح:",
          "questionEn": "'it's new app' should be:",
          "options": [
            "its new app",
            "it is new app",
            "its' new app"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: its new app"
        },
        {
          "questionAr": "كم نسخة؟",
          "questionEn": "How many copies?",
          "options": [
            "one",
            "two",
            "three"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: two"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Same sound check",
      "items": [
        "there = their = they're /ðɛr/",
        "to = too = two /tuː/ (strong)",
        "whose = who's /huːz/",
        "weather = whether /ˈwɛðər/"
      ],
      "tipAr": "النطق واحد؛ الفرق كتابي بس، فركّز وقت الكتابة."
    },
    "exercises": {
      "easy": [
        {
          "id": "srp_329_e1",
          "type": "meaning",
          "promptEn": "What does \"there\" mean?",
          "promptAr": "ما معنى \"there\"؟",
          "options": [
            "حقه (لغير العاقل)",
            "إذا/ما إذا",
            "هناك/يوجد",
            "طقس"
          ],
          "correctIndex": 2,
          "answer": "هناك/يوجد",
          "explanationAr": "\"there\" /ðɛr/ تعني: هناك/يوجد. مثال: over there"
        },
        {
          "id": "srp_329_e2",
          "type": "meaning",
          "promptEn": "What does \"their\" mean?",
          "promptAr": "ما معنى \"their\"؟",
          "options": [
            "هم (صيغة مختصرة)",
            "لمن",
            "حقهم",
            "حقك"
          ],
          "correctIndex": 2,
          "answer": "حقهم",
          "explanationAr": "\"their\" /ðɛr/ تعني: حقهم. مثال: their car"
        },
        {
          "id": "srp_329_e3",
          "type": "meaning",
          "promptEn": "What does \"they're\" mean?",
          "promptAr": "ما معنى \"they're\"؟",
          "options": [
            "طقس",
            "هناك/يوجد",
            "هم (صيغة مختصرة)",
            "لمن"
          ],
          "correctIndex": 2,
          "answer": "هم (صيغة مختصرة)",
          "explanationAr": "\"they're\" /ðɛr/ تعني: هم (صيغة مختصرة). مثال: They're late."
        },
        {
          "id": "srp_329_e4",
          "type": "meaning",
          "promptEn": "What does \"your\" mean?",
          "promptAr": "ما معنى \"your\"؟",
          "options": [
            "حقك",
            "أنت (صيغة مختصرة)",
            "طقس",
            "حقهم"
          ],
          "correctIndex": 0,
          "answer": "حقك",
          "explanationAr": "\"your\" /jɔːr/ تعني: حقك. مثال: your bag"
        }
      ],
      "medium": [
        {
          "id": "srp_329_m1",
          "type": "gap",
          "promptEn": "Complete: They're at ____ house over there.",
          "promptAr": "أكمل الفراغ: (هم في بيتهم هناك.)",
          "options": [
            "there",
            "their",
            "they're"
          ],
          "correctIndex": 1,
          "answer": "They're at their house over there.",
          "explanationAr": "الإجابة: their. there = هناك/يوجد، their = حقهم، they're = they are. your = حقك، you're = you are. its = حقه (لغير العاقل)، it's = it is. to = إلى، too = أيضاً/زيادة، two = ٢. اختبار سريع: هل تقدر تقول الصيغة الكاملة (they are / you are / it is)؟"
        },
        {
          "id": "srp_329_m2",
          "type": "gap",
          "promptEn": "Complete: You're going to love ____ gift.",
          "promptAr": "أكمل الفراغ: (بتحب هديتك.)",
          "options": [
            "yore",
            "your",
            "you're"
          ],
          "correctIndex": 1,
          "answer": "You're going to love your gift.",
          "explanationAr": "الإجابة: your. there = هناك/يوجد، their = حقهم، they're = they are. your = حقك، you're = you are. its = حقه (لغير العاقل)، it's = it is. to = إلى، too = أيضاً/زيادة، two = ٢. اختبار سريع: هل تقدر تقول الصيغة الكاملة (they are / you are / it is)؟"
        },
        {
          "id": "srp_329_m3",
          "type": "gap",
          "promptEn": "Complete: It's raining and the cat hurt ____ leg.",
          "promptAr": "أكمل الفراغ: (تمطر والقطة جرحت رجلها.)",
          "options": [
            "it's",
            "its'",
            "its"
          ],
          "correctIndex": 2,
          "answer": "It's raining and the cat hurt its leg.",
          "explanationAr": "الإجابة: its. there = هناك/يوجد، their = حقهم، they're = they are. your = حقك، you're = you are. its = حقه (لغير العاقل)، it's = it is. to = إلى، too = أيضاً/زيادة، two = ٢. اختبار سريع: هل تقدر تقول الصيغة الكاملة (they are / you are / it is)؟"
        },
        {
          "id": "srp_329_m4",
          "type": "gap",
          "promptEn": "Complete: I have ____ tickets, too.",
          "promptAr": "أكمل الفراغ: (عندي تذكرتين بعد.)",
          "options": [
            "two",
            "too",
            "to"
          ],
          "correctIndex": 0,
          "answer": "I have two tickets, too.",
          "explanationAr": "الإجابة: two. there = هناك/يوجد، their = حقهم، they're = they are. your = حقك، you're = you are. its = حقه (لغير العاقل)، it's = it is. to = إلى، too = أيضاً/زيادة، two = ٢. اختبار سريع: هل تقدر تقول الصيغة الكاملة (they are / you are / it is)؟"
        }
      ],
      "hard": [
        {
          "id": "srp_329_h1",
          "type": "order",
          "promptEn": "Put the words in order: pears. / I'd / to / like / buy / of / pair / a",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (أبي أشتري زوج كمثرى.)",
          "answer": "I'd like to buy a pair of pears.",
          "explanationAr": "الترتيب الصحيح: I'd like to buy a pair of pears."
        },
        {
          "id": "srp_329_h2",
          "type": "order",
          "promptEn": "Put the words in order: Whose / is / this? / calling? / phone / Who's",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (جوال مين هذا؟ مين يتصل؟)",
          "answer": "Whose phone is this? Who's calling?",
          "explanationAr": "الترتيب الصحيح: Whose phone is this? Who's calling?"
        },
        {
          "id": "srp_329_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: بتحب هديتك.",
          "answer": "You're going to love your gift.",
          "explanationAr": "ترجمة مقترحة: You're going to love your gift."
        },
        {
          "id": "srp_329_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: عندي تذكرتين بعد.",
          "answer": "I have two tickets, too.",
          "explanationAr": "ترجمة مقترحة: I have two tickets, too."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Using spell-check as a safety net",
        "correct": "Spell-check misses homophones!",
        "whyAr": "المدقق ما يكتشف their بدل there."
      },
      {
        "incorrect": "Confusing lose /luːz/ and loose /luːs/",
        "correct": "lose = يخسر, loose = واسع",
        "whyAr": "مشهورة جداً في الرسائل."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (القراءة الاستنتاجية: ما بين السطور): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "so-called = ما يسمى (سخرية/شك)",
          "so-called = famous"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: so-called = ما يسمى (سخرية/شك) — كلمة فيها انتقاد.",
        "fromLessonId": "srp_328"
      },
      {
        "questionAr": "مراجعة (الـ T الأمريكية: water و better): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Choose one accent and be consistent",
          "Hard British T in an American accent mix"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Choose one accent and be consistent — الاثنين صح، بس لا تخلط بشكل غريب.",
        "fromLessonId": "srp_326"
      },
      {
        "questionAr": "مراجعة (التنغيم: صعود ونزول الصوت): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Where do you live? ↗ (rising)",
          "Where do you live? ↘"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Where do you live? ↘ — أسئلة wh نازلة.",
        "fromLessonId": "srp_323"
      },
      {
        "questionAr": "ما معنى \"gotcha\"؟",
        "questionEn": "What does \"gotcha\" mean?",
        "options": [
          "نوعاً ما / شوي",
          "راح / بـ (للمستقبل)",
          "فهمت عليك",
          "خلني"
        ],
        "correctIndex": 2,
        "explanationAr": "\"gotcha\" /ˈɡɑːtʃə/ تعني: فهمت عليك. مثال: Gotcha, see you at five.",
        "fromLessonId": "srp_327"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (تمطر والقطة جرحت رجلها.)",
          "questionEn": "Complete: It's raining and the cat hurt ____ leg.",
          "options": [
            "it's",
            "its'",
            "its"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: its. there = هناك/يوجد، their = حقهم، they're = they are. your = حقك، you're = you are. its = حقه (لغير العاقل)، it's = it is. to = إلى، too = أيضاً/زيادة، two = ٢. اختبار سريع: هل تقدر تقول الصيغة الكاملة (they are / you are / it is)؟"
        },
        {
          "questionAr": "أكمل الفراغ: (عندي تذكرتين بعد.)",
          "questionEn": "Complete: I have ____ tickets, too.",
          "options": [
            "two",
            "too",
            "to"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: two. there = هناك/يوجد، their = حقهم، they're = they are. your = حقك، you're = you are. its = حقه (لغير العاقل)، it's = it is. to = إلى، too = أيضاً/زيادة، two = ٢. اختبار سريع: هل تقدر تقول الصيغة الكاملة (they are / you are / it is)؟"
        },
        {
          "questionAr": "ما معنى \"you're\"؟",
          "questionEn": "What does \"you're\" mean?",
          "options": [
            "حقه (لغير العاقل)",
            "حقك",
            "أنت (صيغة مختصرة)",
            "إذا/ما إذا"
          ],
          "correctIndex": 2,
          "explanationAr": "\"you're\" /jʊr/ تعني: أنت (صيغة مختصرة). مثال: You're right."
        },
        {
          "questionAr": "ما معنى \"its\"؟",
          "questionEn": "What does \"its\" mean?",
          "options": [
            "إذا/ما إذا",
            "لمن",
            "حقه (لغير العاقل)",
            "هم (صيغة مختصرة)"
          ],
          "correctIndex": 2,
          "explanationAr": "\"its\" /ɪts/ تعني: حقه (لغير العاقل). مثال: its colour"
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Using spell-check as a safety net",
            "Spell-check misses homophones!"
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: Spell-check misses homophones! — المدقق ما يكتشف their بدل there."
        }
      ]
    }
  },
  {
    "id": "srp_330",
    "pillarId": "reading",
    "pillarNameAr": "القراءة التعبيرية والنطق الصوتي",
    "pillarNameEn": "Expressive Reading & Pronunciation Lab",
    "pillarIcon": "📖",
    "level": "متقدم (Advanced)",
    "levelCode": "B1-B2",
    "titleAr": "قراءة خطاب بصوت عالٍ بثقة",
    "titleEn": "Reading a Speech Aloud with Impact",
    "descAr": "اقرأ كلمة أو خطاب قصير كأنك المتحدث: تقسيم، وقفات، تأكيد، وسرعة مناسبة.",
    "descEn": "Deliver a short speech: chunking, pauses, emphasis and pace.",
    "speakingGoalAr": "اقرأ خطاب تخرج من ١٠٠ كلمة بتأثير.",
    "speakingGoalEn": "Deliver a 100-word graduation speech with impact.",
    "keyPattern": {
      "ruleAr": "١) قسّم النص لمجموعات فكرية (/) ووقف بينها. ٢) أكّد الكلمة الأهم في كل مجموعة. ٣) وقفة أطول (//) قبل وبعد الجملة المهمة. ٤) أبطئ في الأفكار الرئيسية، وأسرع شوي في التفاصيل. ٥) انزل بالصوت في آخر كل فكرة.",
      "ruleEn": "Chunk (/), stress one key word per chunk, pause longer (//) around key lines, slow down for key ideas, fall at the end of each idea.",
      "formula": "chunk / KEY word / chunk // key idea (slow) // ↘"
    },
    "practicalExamples": [
      {
        "en": "Today / is not the END // it is the BEGINNING.",
        "ar": "اليوم مو النهاية، بل البداية."
      },
      {
        "en": "We came here / as STUDENTS. // We leave / as LEADERS.",
        "ar": "جينا طلاب، ونطلع قادة."
      },
      {
        "en": "Thank you / to our PARENTS // who BELIEVED in us.",
        "ar": "شكراً لأهالينا اللي آمنوا فينا."
      },
      {
        "en": "The future / belongs to those / who WORK for it.",
        "ar": "المستقبل لمن يعمل له."
      },
      {
        "en": "Let us / make our country / PROUD.",
        "ar": "خلونا نخلي بلدنا فخور."
      },
      {
        "en": "Congratulations, // class of 2026!",
        "ar": "مبروك يا دفعة ٢٠٢٦!"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Reading too fast to finish quickly",
        "correct": "Slow down: about 120–140 words per minute",
        "whyAr": "السرعة تضيع التأثير."
      },
      {
        "incorrect": "Pausing in the middle of a phrase",
        "correct": "Pause between thought groups",
        "whyAr": "الوقفة في المكان الغلط تكسر المعنى."
      },
      {
        "incorrect": "Rising tone at the end of every sentence",
        "correct": "Fall ↘ to sound confident",
        "whyAr": "الصعود يبين تردد."
      }
    ],
    "speakingChallenge": {
      "promptAr": "ألقِ خطاب التخرج على سارة بالعلامات.",
      "promptEn": "Deliver the graduation speech to Sara using the marks.",
      "saraQuestionAr": "جاهز؟ المسرح لك!",
      "saraQuestionEn": "Ready? The stage is yours!",
      "recommendedResponseEn": "Four years ago, / we walked into this school / as CHILDREN. // Today, / we walk out / ready for the WORLD. // Congratulations, / class of 2026!"
    },
    "quiz": [
      {
        "questionAr": "وين نحط الوقفة الطويلة؟",
        "questionEn": "Where is a long pause best?",
        "options": [
          "in the middle of a word",
          "before a key idea",
          "after every word"
        ],
        "correctIndex": 1,
        "explanationAr": "قبل وبعد الفكرة المهمة."
      },
      {
        "questionAr": "نهاية الجمل في الخطاب:",
        "questionEn": "Ending sentences in a speech:",
        "options": [
          "↗ rise",
          "↘ fall"
        ],
        "correctIndex": 1,
        "explanationAr": "النزول يعطي ثقة."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Slow down: about 120–140 words per minute",
          "Reading too fast to finish quickly"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Slow down: about 120–140 words per minute — السرعة تضيع التأثير."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Pausing in the middle of a phrase",
          "Pause between thought groups"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Pause between thought groups — الوقفة في المكان الغلط تكسر المعنى."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Rising tone at the end of every sentence",
          "Fall ↘ to sound confident"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Fall ↘ to sound confident — الصعود يبين تردد."
      }
    ],
    "whiteboardNotes": {
      "title": "Reading a Speech Aloud with Impact",
      "pointsAr": [
        "يقسم النص لمجموعات فكرية.",
        "يستخدم الوقفات للتأثير.",
        "يتحكم في السرعة والتأكيد.",
        "١) قسّم النص لمجموعات فكرية (/) ووقف بينها. ٢) أكّد الكلمة الأهم في كل مجموعة. ٣) وقفة أطول (//) قبل وبعد الجملة المهمة. ٤) أبطئ في الأفكار الرئيسية، وأسرع شوي في التفاصيل. ٥) انزل بالصوت في آخر كل فكرة."
      ],
      "pointsEn": [
        "Chunk a text into thought groups.",
        "Use pauses for effect.",
        "Control pace and emphasis.",
        "Chunk (/), stress one key word per chunk, pause longer (//) around key lines, slow down for key ideas, fall at the end of each idea."
      ],
      "chalkHighlight": "chunk / KEY word / chunk // key idea (slow) // ↘"
    },
    "unit": 6,
    "cefr": "B2",
    "objectivesAr": [
      "يقسم النص لمجموعات فكرية.",
      "يستخدم الوقفات للتأثير.",
      "يتحكم في السرعة والتأكيد."
    ],
    "objectivesEn": [
      "Chunk a text into thought groups.",
      "Use pauses for effect.",
      "Control pace and emphasis."
    ],
    "vocabulary": [
      {
        "word": "graduation",
        "ipa": "/ˌɡrædʒuˈeɪʃən/",
        "ar": "تخرج",
        "exampleEn": "graduation day",
        "exampleAr": "يوم التخرج"
      },
      {
        "word": "achievement",
        "ipa": "/əˈtʃiːvmənt/",
        "ar": "إنجاز",
        "exampleEn": "a great achievement",
        "exampleAr": "إنجاز عظيم"
      },
      {
        "word": "grateful",
        "ipa": "/ˈɡreɪtfəl/",
        "ar": "ممتن",
        "exampleEn": "I'm grateful.",
        "exampleAr": "ممتن."
      },
      {
        "word": "believe in",
        "ipa": "/bɪˈliːv ɪn/",
        "ar": "يؤمن بـ",
        "exampleEn": "They believed in us.",
        "exampleAr": "آمنوا فينا."
      },
      {
        "word": "challenge",
        "ipa": "/ˈtʃælɪndʒ/",
        "ar": "تحدٍ",
        "exampleEn": "face the challenge",
        "exampleAr": "واجه التحدي"
      },
      {
        "word": "future",
        "ipa": "/ˈfjuːtʃər/",
        "ar": "مستقبل",
        "exampleEn": "a bright future",
        "exampleAr": "مستقبل مشرق"
      },
      {
        "word": "proud",
        "ipa": "/praʊd/",
        "ar": "فخور",
        "exampleEn": "make them proud",
        "exampleAr": "خلهم فخورين"
      },
      {
        "word": "journey",
        "ipa": "/ˈdʒɜːrni/",
        "ar": "رحلة/مسيرة",
        "exampleEn": "our journey",
        "exampleAr": "مسيرتنا"
      },
      {
        "word": "vision",
        "ipa": "/ˈvɪʒən/",
        "ar": "رؤية",
        "exampleEn": "Vision 2030",
        "exampleAr": "رؤية ٢٠٣٠"
      },
      {
        "word": "pause",
        "ipa": "/pɔːz/",
        "ar": "وقفة",
        "exampleEn": "a dramatic pause",
        "exampleAr": "وقفة مؤثرة"
      }
    ],
    "grammarFocus": {
      "ruleAr": "١) قسّم النص لمجموعات فكرية (/) ووقف بينها. ٢) أكّد الكلمة الأهم في كل مجموعة. ٣) وقفة أطول (//) قبل وبعد الجملة المهمة. ٤) أبطئ في الأفكار الرئيسية، وأسرع شوي في التفاصيل. ٥) انزل بالصوت في آخر كل فكرة.",
      "ruleEn": "Chunk (/), stress one key word per chunk, pause longer (//) around key lines, slow down for key ideas, fall at the end of each idea.",
      "formula": "chunk / KEY word / chunk // key idea (slow) // ↘",
      "examples": [
        {
          "en": "Today / is not the END // it is the BEGINNING.",
          "ar": "اليوم مو النهاية، بل البداية."
        },
        {
          "en": "We came here / as STUDENTS. // We leave / as LEADERS.",
          "ar": "جينا طلاب، ونطلع قادة."
        },
        {
          "en": "Thank you / to our PARENTS // who BELIEVED in us.",
          "ar": "شكراً لأهالينا اللي آمنوا فينا."
        },
        {
          "en": "The future / belongs to those / who WORK for it.",
          "ar": "المستقبل لمن يعمل له."
        },
        {
          "en": "Let us / make our country / PROUD.",
          "ar": "خلونا نخلي بلدنا فخور."
        },
        {
          "en": "Congratulations, // class of 2026!",
          "ar": "مبروك يا دفعة ٢٠٢٦!"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Speech",
        "en": "Good evening, / respected guests, / teachers, / and families.",
        "ar": "مساء الخير ضيوفنا الكرام والمعلمين والأهالي."
      },
      {
        "speaker": "Speech",
        "en": "Four years ago, / we walked into this school / as CHILDREN.",
        "ar": "قبل أربع سنين دخلنا المدرسة أطفال."
      },
      {
        "speaker": "Speech",
        "en": "Today, // we walk out / as young MEN and WOMEN / ready for the WORLD.",
        "ar": "اليوم نطلع شباب وشابات جاهزين للعالم."
      },
      {
        "speaker": "Speech",
        "en": "To our PARENTS: / thank you / for every early morning / and every late night.",
        "ar": "لأهالينا: شكراً على كل صباح بدري وكل سهر."
      },
      {
        "speaker": "Speech",
        "en": "Our country / has a VISION. // Let us / be part of it.",
        "ar": "بلدنا عنده رؤية. خلونا نكون جزء منها."
      },
      {
        "speaker": "Speech",
        "en": "Congratulations, // class of 2026!",
        "ar": "مبروك دفعة ٢٠٢٦!"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Speech: Good evening, / respected guests, / teachers, / and families.\nSpeech: Four years ago, / we walked into this school / as CHILDREN.\nSpeech: Today, // we walk out / as young MEN and WOMEN / ready for the WORLD.\nSpeech: To our PARENTS: / thank you / for every early morning / and every late night.\nSpeech: Our country / has a VISION. // Let us / be part of it.\nSpeech: Congratulations, // class of 2026!",
      "questions": [
        {
          "questionAr": "لمن الكلمة؟",
          "questionEn": "Who is the speech for?",
          "options": [
            "only students",
            "guests, teachers and families",
            "the principal"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: guests, teachers and families"
        },
        {
          "questionAr": "كم سنة؟",
          "questionEn": "How long were they at the school?",
          "options": [
            "three",
            "four",
            "six"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: four"
        },
        {
          "questionAr": "يدعوهم يكونون جزء من؟",
          "questionEn": "What does the speaker invite them to be part of?",
          "options": [
            "a club",
            "the country's vision",
            "a company"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: the country's vision"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Marking a speech script",
      "items": [
        "/ = short pause",
        "// = long pause",
        "CAPITALS = stress",
        "↘ at the end of ideas"
      ],
      "tipAr": "اطبع الخطاب وعلّم عليه بالقلم قبل ما تقرأ. المحترفين يسوون كذا."
    },
    "exercises": {
      "easy": [
        {
          "id": "srp_330_e1",
          "type": "meaning",
          "promptEn": "What does \"graduation\" mean?",
          "promptAr": "ما معنى \"graduation\"؟",
          "options": [
            "تخرج",
            "وقفة",
            "فخور",
            "رؤية"
          ],
          "correctIndex": 0,
          "answer": "تخرج",
          "explanationAr": "\"graduation\" /ˌɡrædʒuˈeɪʃən/ تعني: تخرج. مثال: graduation day"
        },
        {
          "id": "srp_330_e2",
          "type": "meaning",
          "promptEn": "What does \"achievement\" mean?",
          "promptAr": "ما معنى \"achievement\"؟",
          "options": [
            "رؤية",
            "ممتن",
            "وقفة",
            "إنجاز"
          ],
          "correctIndex": 3,
          "answer": "إنجاز",
          "explanationAr": "\"achievement\" /əˈtʃiːvmənt/ تعني: إنجاز. مثال: a great achievement"
        },
        {
          "id": "srp_330_e3",
          "type": "meaning",
          "promptEn": "What does \"grateful\" mean?",
          "promptAr": "ما معنى \"grateful\"؟",
          "options": [
            "ممتن",
            "رؤية",
            "يؤمن بـ",
            "وقفة"
          ],
          "correctIndex": 0,
          "answer": "ممتن",
          "explanationAr": "\"grateful\" /ˈɡreɪtfəl/ تعني: ممتن. مثال: I'm grateful."
        },
        {
          "id": "srp_330_e4",
          "type": "meaning",
          "promptEn": "What does \"believe in\" mean?",
          "promptAr": "ما معنى \"believe in\"؟",
          "options": [
            "رؤية",
            "يؤمن بـ",
            "تحدٍ",
            "فخور"
          ],
          "correctIndex": 1,
          "answer": "يؤمن بـ",
          "explanationAr": "\"believe in\" /bɪˈliːv ɪn/ تعني: يؤمن بـ. مثال: They believed in us."
        }
      ],
      "medium": [
        {
          "id": "srp_330_m1",
          "type": "gap",
          "promptEn": "Complete: Today / is not the END // it is the ____.",
          "promptAr": "أكمل الفراغ: (اليوم مو النهاية، بل البداية.)",
          "options": [
            "BEGINNING",
            "START of end",
            "beginning end"
          ],
          "correctIndex": 0,
          "answer": "Today / is not the END // it is the BEGINNING.",
          "explanationAr": "الإجابة: BEGINNING. ١) قسّم النص لمجموعات فكرية (/) ووقف بينها. ٢) أكّد الكلمة الأهم في كل مجموعة. ٣) وقفة أطول (//) قبل وبعد الجملة المهمة. ٤) أبطئ في الأفكار الرئيسية، وأسرع شوي في التفاصيل. ٥) انزل بالصوت في آخر كل فكرة."
        },
        {
          "id": "srp_330_m2",
          "type": "gap",
          "promptEn": "Complete: We came here / as STUDENTS. // We leave / as ____.",
          "promptAr": "أكمل الفراغ: (جينا طلاب، ونطلع قادة.)",
          "options": [
            "LEADERS",
            "STUDENT",
            "leaders students"
          ],
          "correctIndex": 0,
          "answer": "We came here / as STUDENTS. // We leave / as LEADERS.",
          "explanationAr": "الإجابة: LEADERS. ١) قسّم النص لمجموعات فكرية (/) ووقف بينها. ٢) أكّد الكلمة الأهم في كل مجموعة. ٣) وقفة أطول (//) قبل وبعد الجملة المهمة. ٤) أبطئ في الأفكار الرئيسية، وأسرع شوي في التفاصيل. ٥) انزل بالصوت في آخر كل فكرة."
        },
        {
          "id": "srp_330_m3",
          "type": "gap",
          "promptEn": "Complete: Thank you / to our PARENTS // who ____ in us.",
          "promptAr": "أكمل الفراغ: (شكراً لأهالينا اللي آمنوا فينا.)",
          "options": [
            "BELIEVES",
            "BELIEVED",
            "believe"
          ],
          "correctIndex": 1,
          "answer": "Thank you / to our PARENTS // who BELIEVED in us.",
          "explanationAr": "الإجابة: BELIEVED. ١) قسّم النص لمجموعات فكرية (/) ووقف بينها. ٢) أكّد الكلمة الأهم في كل مجموعة. ٣) وقفة أطول (//) قبل وبعد الجملة المهمة. ٤) أبطئ في الأفكار الرئيسية، وأسرع شوي في التفاصيل. ٥) انزل بالصوت في آخر كل فكرة."
        },
        {
          "id": "srp_330_m4",
          "type": "gap",
          "promptEn": "Complete: The future / belongs to those / who ____ for it.",
          "promptAr": "أكمل الفراغ: (المستقبل لمن يعمل له.)",
          "options": [
            "works",
            "WORKED",
            "WORK"
          ],
          "correctIndex": 2,
          "answer": "The future / belongs to those / who WORK for it.",
          "explanationAr": "الإجابة: WORK. ١) قسّم النص لمجموعات فكرية (/) ووقف بينها. ٢) أكّد الكلمة الأهم في كل مجموعة. ٣) وقفة أطول (//) قبل وبعد الجملة المهمة. ٤) أبطئ في الأفكار الرئيسية، وأسرع شوي في التفاصيل. ٥) انزل بالصوت في آخر كل فكرة."
        }
      ],
      "hard": [
        {
          "id": "srp_330_h1",
          "type": "order",
          "promptEn": "Put the words in order: make / country / / / us / our / / / PROUD. / Let",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (خلونا نخلي بلدنا فخور.)",
          "answer": "Let us / make our country / PROUD.",
          "explanationAr": "الترتيب الصحيح: Let us / make our country / PROUD."
        },
        {
          "id": "srp_330_h2",
          "type": "order",
          "promptEn": "Put the words in order: 2026! / of / class / // / Congratulations,",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (مبروك يا دفعة ٢٠٢٦!)",
          "answer": "Congratulations, // class of 2026!",
          "explanationAr": "الترتيب الصحيح: Congratulations, // class of 2026!"
        },
        {
          "id": "srp_330_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: جينا طلاب، ونطلع قادة.",
          "answer": "We came here / as STUDENTS. // We leave / as LEADERS.",
          "explanationAr": "ترجمة مقترحة: We came here / as STUDENTS. // We leave / as LEADERS."
        },
        {
          "id": "srp_330_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: المستقبل لمن يعمل له.",
          "answer": "The future / belongs to those / who WORK for it.",
          "explanationAr": "ترجمة مقترحة: The future / belongs to those / who WORK for it."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Reading with eyes down all the time",
        "correct": "Look up at the end of each chunk",
        "whyAr": "التواصل البصري يزيد التأثير."
      },
      {
        "incorrect": "Monotone Arabic-formal recitation style",
        "correct": "Vary pitch and pace",
        "whyAr": "التنويع يشد الانتباه."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (الكلمات المتشابهة نطقاً: there/their/they're): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Their going to the mall.",
          "They're going to the mall."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: They're going to the mall. — they are going.",
        "fromLessonId": "srp_329"
      },
      {
        "questionAr": "مراجعة (الاختصارات والحذف في الكلام السريع): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Writing 'gonna' in an email to your boss",
          "I'm going to send the report."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I'm going to send the report. — الاختصارات العامية للكلام فقط.",
        "fromLessonId": "srp_327"
      },
      {
        "questionAr": "مراجعة (القراءة السريعة للفكرة العامة (Skimming)): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Read headline + first sentences first",
          "Reading every word slowly"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Read headline + first sentences first — الهدف الفكرة العامة مو التفاصيل.",
        "fromLessonId": "srp_324"
      },
      {
        "questionAr": "ما معنى \"ambitious\"؟",
        "questionEn": "What does \"ambitious\" mean?",
        "options": [
          "يدّعي",
          "طموح",
          "يستنتج",
          "ضجة إعلامية"
        ],
        "correctIndex": 1,
        "explanationAr": "\"ambitious\" /æmˈbɪʃəs/ تعني: طموح. مثال: an ambitious plan",
        "fromLessonId": "srp_328"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (شكراً لأهالينا اللي آمنوا فينا.)",
          "questionEn": "Complete: Thank you / to our PARENTS // who ____ in us.",
          "options": [
            "BELIEVES",
            "BELIEVED",
            "believe"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: BELIEVED. ١) قسّم النص لمجموعات فكرية (/) ووقف بينها. ٢) أكّد الكلمة الأهم في كل مجموعة. ٣) وقفة أطول (//) قبل وبعد الجملة المهمة. ٤) أبطئ في الأفكار الرئيسية، وأسرع شوي في التفاصيل. ٥) انزل بالصوت في آخر كل فكرة."
        },
        {
          "questionAr": "أكمل الفراغ: (المستقبل لمن يعمل له.)",
          "questionEn": "Complete: The future / belongs to those / who ____ for it.",
          "options": [
            "works",
            "WORKED",
            "WORK"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: WORK. ١) قسّم النص لمجموعات فكرية (/) ووقف بينها. ٢) أكّد الكلمة الأهم في كل مجموعة. ٣) وقفة أطول (//) قبل وبعد الجملة المهمة. ٤) أبطئ في الأفكار الرئيسية، وأسرع شوي في التفاصيل. ٥) انزل بالصوت في آخر كل فكرة."
        },
        {
          "questionAr": "ما معنى \"challenge\"؟",
          "questionEn": "What does \"challenge\" mean?",
          "options": [
            "تحدٍ",
            "ممتن",
            "رحلة/مسيرة",
            "تخرج"
          ],
          "correctIndex": 0,
          "explanationAr": "\"challenge\" /ˈtʃælɪndʒ/ تعني: تحدٍ. مثال: face the challenge"
        },
        {
          "questionAr": "ما معنى \"future\"؟",
          "questionEn": "What does \"future\" mean?",
          "options": [
            "تخرج",
            "يؤمن بـ",
            "مستقبل",
            "إنجاز"
          ],
          "correctIndex": 2,
          "explanationAr": "\"future\" /ˈfjuːtʃər/ تعني: مستقبل. مثال: a bright future"
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Look up at the end of each chunk",
            "Reading with eyes down all the time"
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: Look up at the end of each chunk — التواصل البصري يزيد التأثير."
        }
      ]
    }
  }
];
