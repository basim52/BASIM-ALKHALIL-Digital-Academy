import { SaraCurriculumLesson } from './types';

// Rebuilt Sara curriculum (Spoken Grammar & Fast Patterns): 30 lessons, 6 units, CEFR Pre-A1 to B2.
// Generated from structured lesson sources; each lesson has vocabulary, dialogue, listening, pronunciation,
// 3-tier exercises, spiral review and a mastery check.

export const SARA_SPOKEN_GRAMMAR_LESSONS: SaraCurriculumLesson[] = [
  {
    "id": "sg_101",
    "pillarId": "grammar",
    "pillarNameAr": "القواعد التحدثية السريعة",
    "pillarNameEn": "Spoken Grammar & Fast Patterns",
    "pillarIcon": "🧠",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "التعريف بنفسك: I am و You are",
    "titleEn": "Introducing Yourself: I am & You are",
    "descAr": "أول خطوة في الإنجليزية: تقول اسمك وعمرك ومن وين أنت باستخدام فعل الكينونة am/are.",
    "descEn": "Your first step: say your name, age and where you are from with the verb be (am/are).",
    "speakingGoalAr": "تعرّف بنفسك في ثلاث جمل: اسمك وعمرك ومدينتك.",
    "speakingGoalEn": "Introduce yourself in three sentences: name, age and city.",
    "keyPattern": {
      "ruleAr": "مع I نستخدم am، ومع you نستخدم are. وفي الكلام نختصرها: I'm و you're.",
      "ruleEn": "Use am with I and are with you. In speech we contract: I'm, you're.",
      "formula": "I + am (I'm) | You + are (you're) + name / age / place"
    },
    "practicalExamples": [
      {
        "en": "I am Faisal.",
        "ar": "أنا فيصل."
      },
      {
        "en": "I'm ten years old.",
        "ar": "عمري عشر سنوات."
      },
      {
        "en": "You are my friend.",
        "ar": "أنت صديقي."
      },
      {
        "en": "I am from Riyadh.",
        "ar": "أنا من الرياض."
      },
      {
        "en": "Nice to meet you.",
        "ar": "تشرفت بمعرفتك."
      },
      {
        "en": "You're a good student.",
        "ar": "أنت طالب ممتاز."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "I Faisal.",
        "correct": "I am Faisal.",
        "whyAr": "في العربي نقول «أنا فيصل» بدون فعل، لكن في الإنجليزي لازم am."
      },
      {
        "incorrect": "I is ten.",
        "correct": "I am ten. / I'm ten years old.",
        "whyAr": "مع I نستخدم am دائماً، وليس is."
      },
      {
        "incorrect": "You is my friend.",
        "correct": "You are my friend.",
        "whyAr": "مع you نستخدم are حتى لو كان شخصاً واحداً."
      }
    ],
    "speakingChallenge": {
      "promptAr": "عرّف سارة بنفسك: اسمك، عمرك، ومن وين أنت.",
      "promptEn": "Introduce yourself: name, age, city.",
      "saraQuestionAr": "مرحبا! وش اسمك، وكم عمرك، ومن وين أنت؟",
      "saraQuestionEn": "Hi! What's your name, how old are you, and where are you from?",
      "recommendedResponseEn": "Hi! I'm Faisal. I'm ten years old. I'm from Riyadh."
    },
    "quiz": [
      {
        "questionAr": "أكمل: ___ a student.",
        "questionEn": "Complete: ___ a student.",
        "options": [
          "I'm",
          "I",
          "I is"
        ],
        "correctIndex": 0,
        "explanationAr": "مع I نستخدم am، واختصارها I'm."
      },
      {
        "questionAr": "ما الرد المناسب على Nice to meet you؟",
        "questionEn": "Best reply to 'Nice to meet you'?",
        "options": [
          "Nice to meet you too.",
          "I'm fine.",
          "Goodbye."
        ],
        "correctIndex": 0,
        "explanationAr": "نرد على التعارف بـ Nice to meet you too."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I am Faisal.",
          "I Faisal."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I am Faisal. — في العربي نقول «أنا فيصل» بدون فعل، لكن في الإنجليزي لازم am."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I am ten. / I'm ten years old.",
          "I is ten."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I am ten. / I'm ten years old. — مع I نستخدم am دائماً، وليس is."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "You is my friend.",
          "You are my friend."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: You are my friend. — مع you نستخدم are حتى لو كان شخصاً واحداً."
      }
    ],
    "whiteboardNotes": {
      "title": "Introducing Yourself: I am & You are",
      "pointsAr": [
        "يقول اسمه وعمره بجملة صحيحة.",
        "يسأل شخصاً عن اسمه ويرد عليه.",
        "يستخدم I'm و you're في الكلام.",
        "مع I نستخدم am، ومع you نستخدم are. وفي الكلام نختصرها: I'm و you're."
      ],
      "pointsEn": [
        "Say your name and age in a correct sentence.",
        "Ask someone's name and answer.",
        "Use I'm and you're when speaking.",
        "Use am with I and are with you. In speech we contract: I'm, you're."
      ],
      "chalkHighlight": "I + am (I'm) | You + are (you're) + name / age / place"
    },
    "unit": 1,
    "cefr": "Pre-A1",
    "objectivesAr": [
      "يقول اسمه وعمره بجملة صحيحة.",
      "يسأل شخصاً عن اسمه ويرد عليه.",
      "يستخدم I'm و you're في الكلام."
    ],
    "objectivesEn": [
      "Say your name and age in a correct sentence.",
      "Ask someone's name and answer.",
      "Use I'm and you're when speaking."
    ],
    "vocabulary": [
      {
        "word": "hello",
        "ipa": "/həˈloʊ/",
        "ar": "مرحبا",
        "exampleEn": "Hello, I'm Sara.",
        "exampleAr": "مرحبا، أنا سارة."
      },
      {
        "word": "name",
        "ipa": "/neɪm/",
        "ar": "اسم",
        "exampleEn": "My name is Ali.",
        "exampleAr": "اسمي علي."
      },
      {
        "word": "years old",
        "ipa": "/jɪrz oʊld/",
        "ar": "عمر (سنة)",
        "exampleEn": "I'm eight years old.",
        "exampleAr": "عمري ثماني سنوات."
      },
      {
        "word": "from",
        "ipa": "/frʌm/",
        "ar": "من (مكان)",
        "exampleEn": "I'm from Jeddah.",
        "exampleAr": "أنا من جدة."
      },
      {
        "word": "friend",
        "ipa": "/frɛnd/",
        "ar": "صديق",
        "exampleEn": "You're my friend.",
        "exampleAr": "أنت صديقي."
      },
      {
        "word": "student",
        "ipa": "/ˈstuːdənt/",
        "ar": "طالب",
        "exampleEn": "I'm a student.",
        "exampleAr": "أنا طالب."
      },
      {
        "word": "teacher",
        "ipa": "/ˈtiːtʃər/",
        "ar": "معلم/معلمة",
        "exampleEn": "You're a teacher.",
        "exampleAr": "أنت معلم."
      },
      {
        "word": "nice",
        "ipa": "/naɪs/",
        "ar": "لطيف/جميل",
        "exampleEn": "Nice to meet you.",
        "exampleAr": "تشرفت بمعرفتك."
      },
      {
        "word": "meet",
        "ipa": "/miːt/",
        "ar": "يقابل/يتعرف",
        "exampleEn": "Nice to meet you too.",
        "exampleAr": "وأنا كذلك تشرفت."
      },
      {
        "word": "goodbye",
        "ipa": "/ˌɡʊdˈbaɪ/",
        "ar": "مع السلامة",
        "exampleEn": "Goodbye, see you tomorrow.",
        "exampleAr": "مع السلامة، أشوفك بكرة."
      }
    ],
    "grammarFocus": {
      "ruleAr": "مع I نستخدم am، ومع you نستخدم are. وفي الكلام نختصرها: I'm و you're.",
      "ruleEn": "Use am with I and are with you. In speech we contract: I'm, you're.",
      "formula": "I + am (I'm) | You + are (you're) + name / age / place",
      "examples": [
        {
          "en": "I am Faisal.",
          "ar": "أنا فيصل."
        },
        {
          "en": "I'm ten years old.",
          "ar": "عمري عشر سنوات."
        },
        {
          "en": "You are my friend.",
          "ar": "أنت صديقي."
        },
        {
          "en": "I am from Riyadh.",
          "ar": "أنا من الرياض."
        },
        {
          "en": "Nice to meet you.",
          "ar": "تشرفت بمعرفتك."
        },
        {
          "en": "You're a good student.",
          "ar": "أنت طالب ممتاز."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Hello! I'm Sara. What's your name?",
        "ar": "مرحبا! أنا سارة. وش اسمك؟"
      },
      {
        "speaker": "Student",
        "en": "Hi! I'm Faisal.",
        "ar": "هلا! أنا فيصل."
      },
      {
        "speaker": "Sara",
        "en": "Nice to meet you, Faisal. How old are you?",
        "ar": "تشرفت يا فيصل. كم عمرك؟"
      },
      {
        "speaker": "Student",
        "en": "I'm ten years old.",
        "ar": "عمري عشر سنوات."
      },
      {
        "speaker": "Sara",
        "en": "Where are you from?",
        "ar": "من وين أنت؟"
      },
      {
        "speaker": "Student",
        "en": "I'm from Riyadh. Nice to meet you too!",
        "ar": "أنا من الرياض. وأنا كذلك تشرفت!"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Hello! I'm Sara. What's your name?\nStudent: Hi! I'm Faisal.\nSara: Nice to meet you, Faisal. How old are you?\nStudent: I'm ten years old.\nSara: Where are you from?\nStudent: I'm from Riyadh. Nice to meet you too!",
      "questions": [
        {
          "questionAr": "كم عمر فيصل؟",
          "questionEn": "How old is Faisal?",
          "options": [
            "eight",
            "ten",
            "twelve"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: ten"
        },
        {
          "questionAr": "من وين فيصل؟",
          "questionEn": "Where is Faisal from?",
          "options": [
            "Jeddah",
            "Dammam",
            "Riyadh"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: Riyadh"
        },
        {
          "questionAr": "من المعلمة؟",
          "questionEn": "Who is the teacher?",
          "options": [
            "Sara",
            "Faisal",
            "Ali"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: Sara"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Contractions: I'm /aɪm/, you're /jʊr/",
      "items": [
        "I am → I'm",
        "you are → you're",
        "nice to meet you /naɪs tə miːt juː/"
      ],
      "tipAr": "انطق I'm مقطعاً واحداً قصيراً «آيم»، ولا تفصل I عن am."
    },
    "exercises": {
      "easy": [
        {
          "id": "sg_101_e1",
          "type": "meaning",
          "promptEn": "What does \"hello\" mean?",
          "promptAr": "ما معنى \"hello\"؟",
          "options": [
            "عمر (سنة)",
            "صديق",
            "لطيف/جميل",
            "مرحبا"
          ],
          "correctIndex": 3,
          "answer": "مرحبا",
          "explanationAr": "\"hello\" /həˈloʊ/ تعني: مرحبا. مثال: Hello, I'm Sara."
        },
        {
          "id": "sg_101_e2",
          "type": "meaning",
          "promptEn": "What does \"name\" mean?",
          "promptAr": "ما معنى \"name\"؟",
          "options": [
            "اسم",
            "من (مكان)",
            "طالب",
            "يقابل/يتعرف"
          ],
          "correctIndex": 0,
          "answer": "اسم",
          "explanationAr": "\"name\" /neɪm/ تعني: اسم. مثال: My name is Ali."
        },
        {
          "id": "sg_101_e3",
          "type": "meaning",
          "promptEn": "What does \"years old\" mean?",
          "promptAr": "ما معنى \"years old\"؟",
          "options": [
            "عمر (سنة)",
            "يقابل/يتعرف",
            "معلم/معلمة",
            "طالب"
          ],
          "correctIndex": 0,
          "answer": "عمر (سنة)",
          "explanationAr": "\"years old\" /jɪrz oʊld/ تعني: عمر (سنة). مثال: I'm eight years old."
        },
        {
          "id": "sg_101_e4",
          "type": "meaning",
          "promptEn": "What does \"from\" mean?",
          "promptAr": "ما معنى \"from\"؟",
          "options": [
            "طالب",
            "من (مكان)",
            "اسم",
            "عمر (سنة)"
          ],
          "correctIndex": 1,
          "answer": "من (مكان)",
          "explanationAr": "\"from\" /frʌm/ تعني: من (مكان). مثال: I'm from Jeddah."
        }
      ],
      "medium": [
        {
          "id": "sg_101_m1",
          "type": "gap",
          "promptEn": "Complete: I ____ Faisal.",
          "promptAr": "أكمل الفراغ: (أنا فيصل.)",
          "options": [
            "am",
            "are",
            "is"
          ],
          "correctIndex": 0,
          "answer": "I am Faisal.",
          "explanationAr": "الإجابة: am. مع I نستخدم am، ومع you نستخدم are. وفي الكلام نختصرها: I'm و you're."
        },
        {
          "id": "sg_101_m2",
          "type": "gap",
          "promptEn": "Complete: ____ ten years old.",
          "promptAr": "أكمل الفراغ: (عمري عشر سنوات.)",
          "options": [
            "I has",
            "I",
            "I'm"
          ],
          "correctIndex": 2,
          "answer": "I'm ten years old.",
          "explanationAr": "الإجابة: I'm. مع I نستخدم am، ومع you نستخدم are. وفي الكلام نختصرها: I'm و you're."
        },
        {
          "id": "sg_101_m3",
          "type": "gap",
          "promptEn": "Complete: You ____ my friend.",
          "promptAr": "أكمل الفراغ: (أنت صديقي.)",
          "options": [
            "is",
            "am",
            "are"
          ],
          "correctIndex": 2,
          "answer": "You are my friend.",
          "explanationAr": "الإجابة: are. مع I نستخدم am، ومع you نستخدم are. وفي الكلام نختصرها: I'm و you're."
        },
        {
          "id": "sg_101_m4",
          "type": "gap",
          "promptEn": "Complete: I am ____ Riyadh.",
          "promptAr": "أكمل الفراغ: (أنا من الرياض.)",
          "options": [
            "at",
            "in",
            "from"
          ],
          "correctIndex": 2,
          "answer": "I am from Riyadh.",
          "explanationAr": "الإجابة: from. مع I نستخدم am، ومع you نستخدم are. وفي الكلام نختصرها: I'm و you're."
        }
      ],
      "hard": [
        {
          "id": "sg_101_h1",
          "type": "order",
          "promptEn": "Put the words in order: you. / meet / Nice / to",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (تشرفت بمعرفتك.)",
          "answer": "Nice to meet you.",
          "explanationAr": "الترتيب الصحيح: Nice to meet you."
        },
        {
          "id": "sg_101_h2",
          "type": "order",
          "promptEn": "Put the words in order: good / student. / a / You're",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (أنت طالب ممتاز.)",
          "answer": "You're a good student.",
          "explanationAr": "الترتيب الصحيح: You're a good student."
        },
        {
          "id": "sg_101_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: عمري عشر سنوات.",
          "answer": "I'm ten years old.",
          "explanationAr": "ترجمة مقترحة: I'm ten years old."
        },
        {
          "id": "sg_101_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أنا من الرياض.",
          "answer": "I am from Riyadh.",
          "explanationAr": "ترجمة مقترحة: I am from Riyadh."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "My name Faisal.",
        "correct": "My name is Faisal.",
        "whyAr": "لا تحذف is/am/are؛ الإنجليزي ما يقبل جملة اسمية بدون فعل."
      },
      {
        "incorrect": "I from Riyadh.",
        "correct": "I'm from Riyadh.",
        "whyAr": "نفس الخطأ: الجملة تحتاج am."
      }
    ],
    "reviewOfPrevious": [],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (أنت صديقي.)",
          "questionEn": "Complete: You ____ my friend.",
          "options": [
            "is",
            "am",
            "are"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: are. مع I نستخدم am، ومع you نستخدم are. وفي الكلام نختصرها: I'm و you're."
        },
        {
          "questionAr": "أكمل الفراغ: (أنا من الرياض.)",
          "questionEn": "Complete: I am ____ Riyadh.",
          "options": [
            "at",
            "in",
            "from"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: from. مع I نستخدم am، ومع you نستخدم are. وفي الكلام نختصرها: I'm و you're."
        },
        {
          "questionAr": "ما معنى \"friend\"؟",
          "questionEn": "What does \"friend\" mean?",
          "options": [
            "يقابل/يتعرف",
            "لطيف/جميل",
            "صديق",
            "مع السلامة"
          ],
          "correctIndex": 2,
          "explanationAr": "\"friend\" /frɛnd/ تعني: صديق. مثال: You're my friend."
        },
        {
          "questionAr": "ما معنى \"student\"؟",
          "questionEn": "What does \"student\" mean?",
          "options": [
            "يقابل/يتعرف",
            "معلم/معلمة",
            "طالب",
            "عمر (سنة)"
          ],
          "correctIndex": 2,
          "explanationAr": "\"student\" /ˈstuːdənt/ تعني: طالب. مثال: I'm a student."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "My name Faisal.",
            "My name is Faisal."
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: My name is Faisal. — لا تحذف is/am/are؛ الإنجليزي ما يقبل جملة اسمية بدون فعل."
        }
      ]
    }
  },
  {
    "id": "sg_104",
    "pillarId": "grammar",
    "pillarNameAr": "القواعد التحدثية السريعة",
    "pillarNameEn": "Spoken Grammar & Fast Patterns",
    "pillarIcon": "🧠",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "He is و She is: التحدث عن العائلة",
    "titleEn": "He is, She is, It is: Talking About Family",
    "descAr": "تعلم تعرّف أفراد عائلتك وأصدقاءك باستخدام he/she/it + is.",
    "descEn": "Describe family members and friends with he/she/it + is.",
    "speakingGoalAr": "قدّم ثلاثة من أفراد عائلتك بجمل كاملة.",
    "speakingGoalEn": "Introduce three family members in full sentences.",
    "keyPattern": {
      "ruleAr": "مع he و she و it نستخدم is، واختصارها he's و she's و it's.",
      "ruleEn": "Use is with he, she and it; contract to he's, she's, it's.",
      "formula": "He / She / It + is ('s) + noun / adjective"
    },
    "practicalExamples": [
      {
        "en": "This is my father. He is a doctor.",
        "ar": "هذا أبوي. هو دكتور."
      },
      {
        "en": "She is my sister Noura.",
        "ar": "هي أختي نورة."
      },
      {
        "en": "My mother is very kind.",
        "ar": "أمي طيبة جداً."
      },
      {
        "en": "It's a big house.",
        "ar": "إنه بيت كبير."
      },
      {
        "en": "My brother is twelve years old.",
        "ar": "أخوي عمره اثنا عشر سنة."
      },
      {
        "en": "She's a teacher at my school.",
        "ar": "هي معلمة في مدرستي."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "My sister he is tall.",
        "correct": "My sister is tall.",
        "whyAr": "لا نكرر الضمير بعد الاسم مثل «أختي هي طويلة»."
      },
      {
        "incorrect": "He is my mother.",
        "correct": "She is my mother.",
        "whyAr": "she للأنثى و he للذكر؛ لا تخلط بينهما."
      },
      {
        "incorrect": "My father doctor.",
        "correct": "My father is a doctor.",
        "whyAr": "نحتاج is، ونحتاج a قبل المهنة."
      }
    ],
    "speakingChallenge": {
      "promptAr": "أرِ سارة صورة عائلتك (تخيلية) وعرّف ثلاثة أشخاص.",
      "promptEn": "Describe three people in your family photo.",
      "saraQuestionAr": "مين في صورة عائلتك؟ عرفني عليهم!",
      "saraQuestionEn": "Who is in your family photo? Tell me about them!",
      "recommendedResponseEn": "This is my mother. She's kind. This is my brother. He's tall. This is my cat. It's small."
    },
    "quiz": [
      {
        "questionAr": "اختر: ___ is my grandmother.",
        "questionEn": "Choose: ___ is my grandmother.",
        "options": [
          "He",
          "She",
          "It"
        ],
        "correctIndex": 1,
        "explanationAr": "الجدة أنثى ⇐ she."
      },
      {
        "questionAr": "ما اختصار it is؟",
        "questionEn": "Short form of 'it is'?",
        "options": [
          "its",
          "it's",
          "it'is"
        ],
        "correctIndex": 1,
        "explanationAr": "it's = it is، أما its فتعني «حقه/ها»."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "My sister is tall.",
          "My sister he is tall."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: My sister is tall. — لا نكرر الضمير بعد الاسم مثل «أختي هي طويلة»."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "She is my mother.",
          "He is my mother."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: She is my mother. — she للأنثى و he للذكر؛ لا تخلط بينهما."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "My father doctor.",
          "My father is a doctor."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: My father is a doctor. — نحتاج is، ونحتاج a قبل المهنة."
      }
    ],
    "whiteboardNotes": {
      "title": "He is, She is, It is: Talking About Family",
      "pointsAr": [
        "يعرّف أفراد العائلة باستخدام he/she.",
        "يصف شخصاً بصفة بسيطة.",
        "يفرق بين he و she و it.",
        "مع he و she و it نستخدم is، واختصارها he's و she's و it's."
      ],
      "pointsEn": [
        "Introduce family members with he/she.",
        "Describe a person with a simple adjective.",
        "Tell he, she and it apart.",
        "Use is with he, she and it; contract to he's, she's, it's."
      ],
      "chalkHighlight": "He / She / It + is ('s) + noun / adjective"
    },
    "unit": 1,
    "cefr": "Pre-A1",
    "objectivesAr": [
      "يعرّف أفراد العائلة باستخدام he/she.",
      "يصف شخصاً بصفة بسيطة.",
      "يفرق بين he و she و it."
    ],
    "objectivesEn": [
      "Introduce family members with he/she.",
      "Describe a person with a simple adjective.",
      "Tell he, she and it apart."
    ],
    "vocabulary": [
      {
        "word": "father",
        "ipa": "/ˈfɑːðər/",
        "ar": "أب",
        "exampleEn": "My father is at work.",
        "exampleAr": "أبوي في الدوام."
      },
      {
        "word": "mother",
        "ipa": "/ˈmʌðər/",
        "ar": "أم",
        "exampleEn": "My mother is kind.",
        "exampleAr": "أمي طيبة."
      },
      {
        "word": "brother",
        "ipa": "/ˈbrʌðər/",
        "ar": "أخ",
        "exampleEn": "My brother is tall.",
        "exampleAr": "أخوي طويل."
      },
      {
        "word": "sister",
        "ipa": "/ˈsɪstər/",
        "ar": "أخت",
        "exampleEn": "My sister is funny.",
        "exampleAr": "أختي مضحكة."
      },
      {
        "word": "grandfather",
        "ipa": "/ˈɡrænfɑːðər/",
        "ar": "جد",
        "exampleEn": "My grandfather is old.",
        "exampleAr": "جدي كبير في العمر."
      },
      {
        "word": "grandmother",
        "ipa": "/ˈɡrænmʌðər/",
        "ar": "جدة",
        "exampleEn": "My grandmother is sweet.",
        "exampleAr": "جدتي حنونة."
      },
      {
        "word": "kind",
        "ipa": "/kaɪnd/",
        "ar": "طيب",
        "exampleEn": "She is very kind.",
        "exampleAr": "هي طيبة جداً."
      },
      {
        "word": "tall",
        "ipa": "/tɔːl/",
        "ar": "طويل",
        "exampleEn": "He is tall.",
        "exampleAr": "هو طويل."
      },
      {
        "word": "doctor",
        "ipa": "/ˈdɑːktər/",
        "ar": "طبيب",
        "exampleEn": "He is a doctor.",
        "exampleAr": "هو طبيب."
      },
      {
        "word": "cat",
        "ipa": "/kæt/",
        "ar": "قطة",
        "exampleEn": "It's a white cat.",
        "exampleAr": "إنها قطة بيضاء."
      }
    ],
    "grammarFocus": {
      "ruleAr": "مع he و she و it نستخدم is، واختصارها he's و she's و it's.",
      "ruleEn": "Use is with he, she and it; contract to he's, she's, it's.",
      "formula": "He / She / It + is ('s) + noun / adjective",
      "examples": [
        {
          "en": "This is my father. He is a doctor.",
          "ar": "هذا أبوي. هو دكتور."
        },
        {
          "en": "She is my sister Noura.",
          "ar": "هي أختي نورة."
        },
        {
          "en": "My mother is very kind.",
          "ar": "أمي طيبة جداً."
        },
        {
          "en": "It's a big house.",
          "ar": "إنه بيت كبير."
        },
        {
          "en": "My brother is twelve years old.",
          "ar": "أخوي عمره اثنا عشر سنة."
        },
        {
          "en": "She's a teacher at my school.",
          "ar": "هي معلمة في مدرستي."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Who is this in the photo?",
        "ar": "مين هذا في الصورة؟"
      },
      {
        "speaker": "Student",
        "en": "This is my father. He's a doctor.",
        "ar": "هذا أبوي. هو دكتور."
      },
      {
        "speaker": "Sara",
        "en": "And who is she?",
        "ar": "وهذي مين؟"
      },
      {
        "speaker": "Student",
        "en": "She's my sister Noura. She is very funny.",
        "ar": "هذي أختي نورة. هي مرة مضحكة."
      },
      {
        "speaker": "Sara",
        "en": "Oh, and what's that?",
        "ar": "وهذا وش هو؟"
      },
      {
        "speaker": "Student",
        "en": "It's our cat. It's white and small.",
        "ar": "هذي قطتنا. بيضاء وصغيرة."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Who is this in the photo?\nStudent: This is my father. He's a doctor.\nSara: And who is she?\nStudent: She's my sister Noura. She is very funny.\nSara: Oh, and what's that?\nStudent: It's our cat. It's white and small.",
      "questions": [
        {
          "questionAr": "وش شغلة الأب؟",
          "questionEn": "What is the father's job?",
          "options": [
            "teacher",
            "doctor",
            "pilot"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: doctor"
        },
        {
          "questionAr": "مين نورة؟",
          "questionEn": "Who is Noura?",
          "options": [
            "his mother",
            "his sister",
            "his friend"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: his sister"
        },
        {
          "questionAr": "وش لون القطة؟",
          "questionEn": "What color is the cat?",
          "options": [
            "black",
            "brown",
            "white"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: white"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "The TH in father, mother, brother /ð/",
      "items": [
        "father /ˈfɑːðər/",
        "mother /ˈmʌðər/",
        "brother /ˈbrʌðər/",
        "this /ðɪs/"
      ],
      "tipAr": "صوت ð مثل «ذ» العربية تماماً: طرف اللسان بين الأسنان. لا تقلبه «د» أو «ز»."
    },
    "exercises": {
      "easy": [
        {
          "id": "sg_104_e1",
          "type": "meaning",
          "promptEn": "What does \"father\" mean?",
          "promptAr": "ما معنى \"father\"؟",
          "options": [
            "طويل",
            "أخت",
            "أب",
            "أخ"
          ],
          "correctIndex": 2,
          "answer": "أب",
          "explanationAr": "\"father\" /ˈfɑːðər/ تعني: أب. مثال: My father is at work."
        },
        {
          "id": "sg_104_e2",
          "type": "meaning",
          "promptEn": "What does \"mother\" mean?",
          "promptAr": "ما معنى \"mother\"؟",
          "options": [
            "أخ",
            "طويل",
            "طيب",
            "أم"
          ],
          "correctIndex": 3,
          "answer": "أم",
          "explanationAr": "\"mother\" /ˈmʌðər/ تعني: أم. مثال: My mother is kind."
        },
        {
          "id": "sg_104_e3",
          "type": "meaning",
          "promptEn": "What does \"brother\" mean?",
          "promptAr": "ما معنى \"brother\"؟",
          "options": [
            "جدة",
            "أخ",
            "أخت",
            "طيب"
          ],
          "correctIndex": 1,
          "answer": "أخ",
          "explanationAr": "\"brother\" /ˈbrʌðər/ تعني: أخ. مثال: My brother is tall."
        },
        {
          "id": "sg_104_e4",
          "type": "meaning",
          "promptEn": "What does \"sister\" mean?",
          "promptAr": "ما معنى \"sister\"؟",
          "options": [
            "قطة",
            "أخت",
            "طيب",
            "طويل"
          ],
          "correctIndex": 1,
          "answer": "أخت",
          "explanationAr": "\"sister\" /ˈsɪstər/ تعني: أخت. مثال: My sister is funny."
        }
      ],
      "medium": [
        {
          "id": "sg_104_m1",
          "type": "gap",
          "promptEn": "Complete: This is my father. ____ a doctor.",
          "promptAr": "أكمل الفراغ: (هذا أبوي. هو دكتور.)",
          "options": [
            "He are",
            "She is",
            "He is"
          ],
          "correctIndex": 2,
          "answer": "This is my father. He is a doctor.",
          "explanationAr": "الإجابة: He is. مع he و she و it نستخدم is، واختصارها he's و she's و it's."
        },
        {
          "id": "sg_104_m2",
          "type": "gap",
          "promptEn": "Complete: ____ my sister Noura.",
          "promptAr": "أكمل الفراغ: (هي أختي نورة.)",
          "options": [
            "He is",
            "She are",
            "She is"
          ],
          "correctIndex": 2,
          "answer": "She is my sister Noura.",
          "explanationAr": "الإجابة: She is. مع he و she و it نستخدم is، واختصارها he's و she's و it's."
        },
        {
          "id": "sg_104_m3",
          "type": "gap",
          "promptEn": "Complete: My mother ____ very kind.",
          "promptAr": "أكمل الفراغ: (أمي طيبة جداً.)",
          "options": [
            "are",
            "is",
            "am"
          ],
          "correctIndex": 1,
          "answer": "My mother is very kind.",
          "explanationAr": "الإجابة: is. مع he و she و it نستخدم is، واختصارها he's و she's و it's."
        },
        {
          "id": "sg_104_m4",
          "type": "gap",
          "promptEn": "Complete: ____ a big house.",
          "promptAr": "أكمل الفراغ: (إنه بيت كبير.)",
          "options": [
            "She's",
            "He's",
            "It's"
          ],
          "correctIndex": 2,
          "answer": "It's a big house.",
          "explanationAr": "الإجابة: It's. مع he و she و it نستخدم is، واختصارها he's و she's و it's."
        }
      ],
      "hard": [
        {
          "id": "sg_104_h1",
          "type": "order",
          "promptEn": "Put the words in order: old. / years / twelve / is / brother / My",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (أخوي عمره اثنا عشر سنة.)",
          "answer": "My brother is twelve years old.",
          "explanationAr": "الترتيب الصحيح: My brother is twelve years old."
        },
        {
          "id": "sg_104_h2",
          "type": "order",
          "promptEn": "Put the words in order: a / teacher / my / She's / school. / at",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (هي معلمة في مدرستي.)",
          "answer": "She's a teacher at my school.",
          "explanationAr": "الترتيب الصحيح: She's a teacher at my school."
        },
        {
          "id": "sg_104_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: هي أختي نورة.",
          "answer": "She is my sister Noura.",
          "explanationAr": "ترجمة مقترحة: She is my sister Noura."
        },
        {
          "id": "sg_104_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: إنه بيت كبير.",
          "answer": "It's a big house.",
          "explanationAr": "ترجمة مقترحة: It's a big house."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "She is my brother.",
        "correct": "He is my brother.",
        "whyAr": "بعض المتعلمين يخلطون he و she في الكلام السريع؛ ركّز: he = هو، she = هي."
      },
      {
        "incorrect": "He is a kind.",
        "correct": "He is kind.",
        "whyAr": "الصفة وحدها لا تأخذ a؛ a تأتي مع اسم: a kind man."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (التعريف بنفسك: I am و You are): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I am ten. / I'm ten years old.",
          "I is ten."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I am ten. / I'm ten years old. — مع I نستخدم am دائماً، وليس is.",
        "fromLessonId": "sg_101"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (أمي طيبة جداً.)",
          "questionEn": "Complete: My mother ____ very kind.",
          "options": [
            "are",
            "is",
            "am"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: is. مع he و she و it نستخدم is، واختصارها he's و she's و it's."
        },
        {
          "questionAr": "أكمل الفراغ: (إنه بيت كبير.)",
          "questionEn": "Complete: ____ a big house.",
          "options": [
            "She's",
            "He's",
            "It's"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: It's. مع he و she و it نستخدم is، واختصارها he's و she's و it's."
        },
        {
          "questionAr": "ما معنى \"grandfather\"؟",
          "questionEn": "What does \"grandfather\" mean?",
          "options": [
            "جدة",
            "أخ",
            "جد",
            "أخت"
          ],
          "correctIndex": 2,
          "explanationAr": "\"grandfather\" /ˈɡrænfɑːðər/ تعني: جد. مثال: My grandfather is old."
        },
        {
          "questionAr": "ما معنى \"grandmother\"؟",
          "questionEn": "What does \"grandmother\" mean?",
          "options": [
            "جدة",
            "قطة",
            "طيب",
            "طويل"
          ],
          "correctIndex": 0,
          "explanationAr": "\"grandmother\" /ˈɡrænmʌðər/ تعني: جدة. مثال: My grandmother is sweet."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "She is my brother.",
            "He is my brother."
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: He is my brother. — بعض المتعلمين يخلطون he و she في الكلام السريع؛ ركّز: he = هو، she = هي."
        }
      ]
    }
  },
  {
    "id": "sg_105",
    "pillarId": "grammar",
    "pillarNameAr": "القواعد التحدثية السريعة",
    "pillarNameEn": "Spoken Grammar & Fast Patterns",
    "pillarIcon": "🧠",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "النفي والسؤال مع be: Is he...? / I'm not",
    "titleEn": "Questions & Negatives with Be",
    "descAr": "كيف تسأل بـ Are you...? وIs she...? وكيف تنفي بـ not، مع أجوبة قصيرة.",
    "descEn": "Ask yes/no questions with be, make negatives with not, and give short answers.",
    "speakingGoalAr": "اسأل وأجب عن خمسة أسئلة نعم/لا عن الأشخاص والأشياء.",
    "speakingGoalEn": "Ask and answer five yes/no questions.",
    "keyPattern": {
      "ruleAr": "للسؤال نقدم الفعل: Are you...? Is he...? وللنفي نضيف not: I'm not, he isn't, they aren't.",
      "ruleEn": "Questions: move be to the front. Negatives: add not (isn't, aren't).",
      "formula": "Am/Is/Are + subject + ...? | subject + be + not"
    },
    "practicalExamples": [
      {
        "en": "Are you hungry?",
        "ar": "أنت جوعان؟"
      },
      {
        "en": "Is she your teacher?",
        "ar": "هي معلمتك؟"
      },
      {
        "en": "I'm not tired.",
        "ar": "أنا مو تعبان."
      },
      {
        "en": "He isn't at home.",
        "ar": "هو مو في البيت."
      },
      {
        "en": "Yes, I am. No, I'm not.",
        "ar": "إيه، أنا كذا. لا، مو كذا."
      },
      {
        "en": "They aren't late.",
        "ar": "هم مو متأخرين."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "You are hungry?",
        "correct": "Are you hungry?",
        "whyAr": "في السؤال المكتوب نقدم are قبل you."
      },
      {
        "incorrect": "I no tired.",
        "correct": "I'm not tired.",
        "whyAr": "النفي مع be يكون بـ not بعد الفعل، وليس no."
      },
      {
        "incorrect": "Yes, I'm.",
        "correct": "Yes, I am.",
        "whyAr": "في الجواب القصير الإيجابي ما نختصر: Yes, I am."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اسأل سارة ثلاثة أسئلة بـ Are you...؟",
      "promptEn": "Ask Sara three 'Are you...?' questions.",
      "saraQuestionAr": "اسألني: هل أنا جوعانة؟ مشغولة؟ جاهزة؟",
      "saraQuestionEn": "Ask me if I'm hungry, busy or ready!",
      "recommendedResponseEn": "Are you hungry? Are you busy? Are you ready?"
    },
    "quiz": [
      {
        "questionAr": "أكمل: ___ they at school? — Yes, they are.",
        "questionEn": "Complete: ___ they at school?",
        "options": [
          "Is",
          "Are",
          "Am"
        ],
        "correctIndex": 1,
        "explanationAr": "they تأخذ are."
      },
      {
        "questionAr": "اختر النفي الصحيح:",
        "questionEn": "Choose the correct negative:",
        "options": [
          "She aren't busy.",
          "She isn't busy.",
          "She no busy."
        ],
        "correctIndex": 1,
        "explanationAr": "she ⇐ is ⇐ isn't."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Are you hungry?",
          "You are hungry?"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Are you hungry? — في السؤال المكتوب نقدم are قبل you."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I no tired.",
          "I'm not tired."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I'm not tired. — النفي مع be يكون بـ not بعد الفعل، وليس no."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Yes, I'm.",
          "Yes, I am."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Yes, I am. — في الجواب القصير الإيجابي ما نختصر: Yes, I am."
      }
    ],
    "whiteboardNotes": {
      "title": "Questions & Negatives with Be",
      "pointsAr": [
        "يكوّن سؤال نعم/لا بفعل be.",
        "يرد بأجوبة قصيرة Yes, I am / No, he isn't.",
        "ينفي باستخدام isn't و aren't.",
        "للسؤال نقدم الفعل: Are you...? Is he...? وللنفي نضيف not: I'm not, he isn't, they aren't."
      ],
      "pointsEn": [
        "Form yes/no questions with be.",
        "Use short answers.",
        "Make negatives with isn't/aren't.",
        "Questions: move be to the front. Negatives: add not (isn't, aren't)."
      ],
      "chalkHighlight": "Am/Is/Are + subject + ...? | subject + be + not"
    },
    "unit": 1,
    "cefr": "Pre-A1",
    "objectivesAr": [
      "يكوّن سؤال نعم/لا بفعل be.",
      "يرد بأجوبة قصيرة Yes, I am / No, he isn't.",
      "ينفي باستخدام isn't و aren't."
    ],
    "objectivesEn": [
      "Form yes/no questions with be.",
      "Use short answers.",
      "Make negatives with isn't/aren't."
    ],
    "vocabulary": [
      {
        "word": "hungry",
        "ipa": "/ˈhʌŋɡri/",
        "ar": "جوعان",
        "exampleEn": "Are you hungry?",
        "exampleAr": "أنت جوعان؟"
      },
      {
        "word": "thirsty",
        "ipa": "/ˈθɜːrsti/",
        "ar": "عطشان",
        "exampleEn": "I'm thirsty.",
        "exampleAr": "أنا عطشان."
      },
      {
        "word": "tired",
        "ipa": "/ˈtaɪərd/",
        "ar": "تعبان",
        "exampleEn": "She isn't tired.",
        "exampleAr": "هي مو تعبانة."
      },
      {
        "word": "happy",
        "ipa": "/ˈhæpi/",
        "ar": "مبسوط/سعيد",
        "exampleEn": "Is he happy?",
        "exampleAr": "هو مبسوط؟"
      },
      {
        "word": "sad",
        "ipa": "/sæd/",
        "ar": "حزين",
        "exampleEn": "I'm not sad.",
        "exampleAr": "أنا مو حزين."
      },
      {
        "word": "late",
        "ipa": "/leɪt/",
        "ar": "متأخر",
        "exampleEn": "Are we late?",
        "exampleAr": "تأخرنا؟"
      },
      {
        "word": "ready",
        "ipa": "/ˈrɛdi/",
        "ar": "جاهز",
        "exampleEn": "Are you ready?",
        "exampleAr": "أنت جاهز؟"
      },
      {
        "word": "busy",
        "ipa": "/ˈbɪzi/",
        "ar": "مشغول",
        "exampleEn": "Dad is busy.",
        "exampleAr": "أبوي مشغول."
      },
      {
        "word": "home",
        "ipa": "/hoʊm/",
        "ar": "البيت",
        "exampleEn": "She's at home.",
        "exampleAr": "هي في البيت."
      },
      {
        "word": "school",
        "ipa": "/skuːl/",
        "ar": "مدرسة",
        "exampleEn": "Is he at school?",
        "exampleAr": "هو في المدرسة؟"
      }
    ],
    "grammarFocus": {
      "ruleAr": "للسؤال نقدم الفعل: Are you...? Is he...? وللنفي نضيف not: I'm not, he isn't, they aren't.",
      "ruleEn": "Questions: move be to the front. Negatives: add not (isn't, aren't).",
      "formula": "Am/Is/Are + subject + ...? | subject + be + not",
      "examples": [
        {
          "en": "Are you hungry?",
          "ar": "أنت جوعان؟"
        },
        {
          "en": "Is she your teacher?",
          "ar": "هي معلمتك؟"
        },
        {
          "en": "I'm not tired.",
          "ar": "أنا مو تعبان."
        },
        {
          "en": "He isn't at home.",
          "ar": "هو مو في البيت."
        },
        {
          "en": "Yes, I am. No, I'm not.",
          "ar": "إيه، أنا كذا. لا، مو كذا."
        },
        {
          "en": "They aren't late.",
          "ar": "هم مو متأخرين."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Are you ready for the lesson?",
        "ar": "أنت جاهز للدرس؟"
      },
      {
        "speaker": "Student",
        "en": "Yes, I am. But I'm a little tired.",
        "ar": "إيه، جاهز. بس شوي تعبان."
      },
      {
        "speaker": "Sara",
        "en": "Are you hungry?",
        "ar": "أنت جوعان؟"
      },
      {
        "speaker": "Student",
        "en": "No, I'm not. I'm thirsty.",
        "ar": "لا، مو جوعان. عطشان."
      },
      {
        "speaker": "Sara",
        "en": "Is your brother at home?",
        "ar": "أخوك في البيت؟"
      },
      {
        "speaker": "Student",
        "en": "No, he isn't. He's at school.",
        "ar": "لا، مو في البيت. هو في المدرسة."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Are you ready for the lesson?\nStudent: Yes, I am. But I'm a little tired.\nSara: Are you hungry?\nStudent: No, I'm not. I'm thirsty.\nSara: Is your brother at home?\nStudent: No, he isn't. He's at school.",
      "questions": [
        {
          "questionAr": "الطالب جاهز؟",
          "questionEn": "Is the student ready?",
          "options": [
            "Yes, he is.",
            "No, he isn't."
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: Yes, he is."
        },
        {
          "questionAr": "الطالب جوعان؟",
          "questionEn": "Is the student hungry?",
          "options": [
            "Yes",
            "No, he's thirsty"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: No, he's thirsty"
        },
        {
          "questionAr": "وين الأخ؟",
          "questionEn": "Where is the brother?",
          "options": [
            "at home",
            "at school",
            "at the mall"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: at school"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Rising intonation in yes/no questions ↗",
      "items": [
        "Are you ready? ↗",
        "Is she happy? ↗",
        "isn't /ˈɪzənt/"
      ],
      "tipAr": "في سؤال نعم/لا يرتفع الصوت في آخر الجملة. جرب: Are you READY↗"
    },
    "exercises": {
      "easy": [
        {
          "id": "sg_105_e1",
          "type": "meaning",
          "promptEn": "What does \"hungry\" mean?",
          "promptAr": "ما معنى \"hungry\"؟",
          "options": [
            "جوعان",
            "مشغول",
            "حزين",
            "مبسوط/سعيد"
          ],
          "correctIndex": 0,
          "answer": "جوعان",
          "explanationAr": "\"hungry\" /ˈhʌŋɡri/ تعني: جوعان. مثال: Are you hungry?"
        },
        {
          "id": "sg_105_e2",
          "type": "meaning",
          "promptEn": "What does \"thirsty\" mean?",
          "promptAr": "ما معنى \"thirsty\"؟",
          "options": [
            "مشغول",
            "عطشان",
            "جاهز",
            "البيت"
          ],
          "correctIndex": 1,
          "answer": "عطشان",
          "explanationAr": "\"thirsty\" /ˈθɜːrsti/ تعني: عطشان. مثال: I'm thirsty."
        },
        {
          "id": "sg_105_e3",
          "type": "meaning",
          "promptEn": "What does \"tired\" mean?",
          "promptAr": "ما معنى \"tired\"؟",
          "options": [
            "جوعان",
            "متأخر",
            "تعبان",
            "عطشان"
          ],
          "correctIndex": 2,
          "answer": "تعبان",
          "explanationAr": "\"tired\" /ˈtaɪərd/ تعني: تعبان. مثال: She isn't tired."
        },
        {
          "id": "sg_105_e4",
          "type": "meaning",
          "promptEn": "What does \"happy\" mean?",
          "promptAr": "ما معنى \"happy\"؟",
          "options": [
            "مشغول",
            "مبسوط/سعيد",
            "جوعان",
            "حزين"
          ],
          "correctIndex": 1,
          "answer": "مبسوط/سعيد",
          "explanationAr": "\"happy\" /ˈhæpi/ تعني: مبسوط/سعيد. مثال: Is he happy?"
        }
      ],
      "medium": [
        {
          "id": "sg_105_m1",
          "type": "gap",
          "promptEn": "Complete: ____ you hungry?",
          "promptAr": "أكمل الفراغ: (أنت جوعان؟)",
          "options": [
            "Are",
            "Is",
            "Do"
          ],
          "correctIndex": 0,
          "answer": "Are you hungry?",
          "explanationAr": "الإجابة: Are. للسؤال نقدم الفعل: Are you...? Is he...? وللنفي نضيف not: I'm not, he isn't, they aren't."
        },
        {
          "id": "sg_105_m2",
          "type": "gap",
          "promptEn": "Complete: ____ she your teacher?",
          "promptAr": "أكمل الفراغ: (هي معلمتك؟)",
          "options": [
            "Does",
            "Is",
            "Are"
          ],
          "correctIndex": 1,
          "answer": "Is she your teacher?",
          "explanationAr": "الإجابة: Is. للسؤال نقدم الفعل: Are you...? Is he...? وللنفي نضيف not: I'm not, he isn't, they aren't."
        },
        {
          "id": "sg_105_m3",
          "type": "gap",
          "promptEn": "Complete: I'm ____ tired.",
          "promptAr": "أكمل الفراغ: (أنا مو تعبان.)",
          "options": [
            "not",
            "no",
            "don't"
          ],
          "correctIndex": 0,
          "answer": "I'm not tired.",
          "explanationAr": "الإجابة: not. للسؤال نقدم الفعل: Are you...? Is he...? وللنفي نضيف not: I'm not, he isn't, they aren't."
        },
        {
          "id": "sg_105_m4",
          "type": "gap",
          "promptEn": "Complete: He ____ at home.",
          "promptAr": "أكمل الفراغ: (هو مو في البيت.)",
          "options": [
            "don't",
            "aren't",
            "isn't"
          ],
          "correctIndex": 2,
          "answer": "He isn't at home.",
          "explanationAr": "الإجابة: isn't. للسؤال نقدم الفعل: Are you...? Is he...? وللنفي نضيف not: I'm not, he isn't, they aren't."
        }
      ],
      "hard": [
        {
          "id": "sg_105_h1",
          "type": "order",
          "promptEn": "Put the words in order: I'm / No, / not. / Yes, / I / am.",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (إيه، أنا كذا. لا، مو كذا.)",
          "answer": "Yes, I am. No, I'm not.",
          "explanationAr": "الترتيب الصحيح: Yes, I am. No, I'm not."
        },
        {
          "id": "sg_105_h2",
          "type": "order",
          "promptEn": "Put the words in order: aren't / They / late.",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (هم مو متأخرين.)",
          "answer": "They aren't late.",
          "explanationAr": "الترتيب الصحيح: They aren't late."
        },
        {
          "id": "sg_105_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: هي معلمتك؟",
          "answer": "Is she your teacher?",
          "explanationAr": "ترجمة مقترحة: Is she your teacher?"
        },
        {
          "id": "sg_105_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: هو مو في البيت.",
          "answer": "He isn't at home.",
          "explanationAr": "ترجمة مقترحة: He isn't at home."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "He not at home.",
        "correct": "He isn't at home.",
        "whyAr": "العربي يقول «هو مو في البيت» بدون فعل؛ الإنجليزي يحتاج is + not."
      },
      {
        "incorrect": "Is she teacher?",
        "correct": "Is she a teacher?",
        "whyAr": "لا تنسَ a قبل المهنة المفردة."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (He is و She is: التحدث عن العائلة): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "He is my mother.",
          "She is my mother."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: She is my mother. — she للأنثى و he للذكر؛ لا تخلط بينهما.",
        "fromLessonId": "sg_104"
      },
      {
        "questionAr": "ما معنى \"goodbye\"؟",
        "questionEn": "What does \"goodbye\" mean?",
        "options": [
          "اسم",
          "طالب",
          "صديق",
          "مع السلامة"
        ],
        "correctIndex": 3,
        "explanationAr": "\"goodbye\" /ˌɡʊdˈbaɪ/ تعني: مع السلامة. مثال: Goodbye, see you tomorrow.",
        "fromLessonId": "sg_101"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (أنا مو تعبان.)",
          "questionEn": "Complete: I'm ____ tired.",
          "options": [
            "not",
            "no",
            "don't"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: not. للسؤال نقدم الفعل: Are you...? Is he...? وللنفي نضيف not: I'm not, he isn't, they aren't."
        },
        {
          "questionAr": "أكمل الفراغ: (هو مو في البيت.)",
          "questionEn": "Complete: He ____ at home.",
          "options": [
            "don't",
            "aren't",
            "isn't"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: isn't. للسؤال نقدم الفعل: Are you...? Is he...? وللنفي نضيف not: I'm not, he isn't, they aren't."
        },
        {
          "questionAr": "ما معنى \"sad\"؟",
          "questionEn": "What does \"sad\" mean?",
          "options": [
            "جوعان",
            "جاهز",
            "حزين",
            "البيت"
          ],
          "correctIndex": 2,
          "explanationAr": "\"sad\" /sæd/ تعني: حزين. مثال: I'm not sad."
        },
        {
          "questionAr": "ما معنى \"late\"؟",
          "questionEn": "What does \"late\" mean?",
          "options": [
            "مبسوط/سعيد",
            "جاهز",
            "متأخر",
            "حزين"
          ],
          "correctIndex": 2,
          "explanationAr": "\"late\" /leɪt/ تعني: متأخر. مثال: Are we late?"
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "He isn't at home.",
            "He not at home."
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: He isn't at home. — العربي يقول «هو مو في البيت» بدون فعل؛ الإنجليزي يحتاج is + not."
        }
      ]
    }
  },
  {
    "id": "sg_106",
    "pillarId": "grammar",
    "pillarNameAr": "القواعد التحدثية السريعة",
    "pillarNameEn": "Spoken Grammar & Fast Patterns",
    "pillarIcon": "🧠",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "This / That / These / Those في الفصل والبيت",
    "titleEn": "This, That, These, Those: Things Around You",
    "descAr": "تشير للأشياء القريبة والبعيدة، المفرد والجمع، مع أدوات المدرسة والبيت.",
    "descEn": "Point to near/far, singular/plural things at school and home.",
    "speakingGoalAr": "سمِّ خمسة أشياء حولك باستخدام this/that/these/those.",
    "speakingGoalEn": "Name five things around you using this/that/these/those.",
    "keyPattern": {
      "ruleAr": "this للقريب المفرد و these للقريب الجمع، that للبعيد المفرد و those للبعيد الجمع.",
      "ruleEn": "this/these = near (singular/plural); that/those = far (singular/plural).",
      "formula": "This/That + is + a [noun] | These/Those + are + [nouns]"
    },
    "practicalExamples": [
      {
        "en": "This is my pencil.",
        "ar": "هذا قلمي الرصاص."
      },
      {
        "en": "That is the teacher's desk.",
        "ar": "ذاك مكتب المعلم."
      },
      {
        "en": "These are my books.",
        "ar": "هذي كتبي."
      },
      {
        "en": "Those are new chairs.",
        "ar": "هذيك كراسي جديدة."
      },
      {
        "en": "What's this? It's an eraser.",
        "ar": "وش هذا؟ هذي مساحة."
      },
      {
        "en": "Are those your shoes?",
        "ar": "هذيك جزمك؟"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "This are my books.",
        "correct": "These are my books.",
        "whyAr": "الجمع يحتاج these و are."
      },
      {
        "incorrect": "Those is my bag.",
        "correct": "That is my bag.",
        "whyAr": "شيء واحد بعيد ⇐ that is."
      },
      {
        "incorrect": "What's this? It's eraser.",
        "correct": "It's an eraser.",
        "whyAr": "نستخدم an قبل الكلمة التي تبدأ بصوت متحرك."
      }
    ],
    "speakingChallenge": {
      "promptAr": "صف لسارة خمسة أشياء حولك الآن.",
      "promptEn": "Describe five things around you now.",
      "saraQuestionAr": "وش حولك الحين؟ وريني!",
      "saraQuestionEn": "What's around you right now?",
      "recommendedResponseEn": "This is my phone. That is a window. These are my books. Those are chairs."
    },
    "quiz": [
      {
        "questionAr": "اختر: ___ are my brothers over there.",
        "questionEn": "Choose: ___ are my brothers over there.",
        "options": [
          "This",
          "Those",
          "That"
        ],
        "correctIndex": 1,
        "explanationAr": "جمع وبعيد ⇐ those."
      },
      {
        "questionAr": "أكمل: It's ___ eraser.",
        "questionEn": "Complete: It's ___ eraser.",
        "options": [
          "a",
          "an",
          "the"
        ],
        "correctIndex": 1,
        "explanationAr": "eraser تبدأ بصوت متحرك ⇐ an."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "These are my books.",
          "This are my books."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: These are my books. — الجمع يحتاج these و are."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "That is my bag.",
          "Those is my bag."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: That is my bag. — شيء واحد بعيد ⇐ that is."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "What's this? It's eraser.",
          "It's an eraser."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: It's an eraser. — نستخدم an قبل الكلمة التي تبدأ بصوت متحرك."
      }
    ],
    "whiteboardNotes": {
      "title": "This, That, These, Those: Things Around You",
      "pointsAr": [
        "يميز القريب من البعيد.",
        "يستخدم these/those مع الجمع و are.",
        "يسأل What's this? ويجيب.",
        "this للقريب المفرد و these للقريب الجمع، that للبعيد المفرد و those للبعيد الجمع."
      ],
      "pointsEn": [
        "Distinguish near and far.",
        "Use these/those with plurals and are.",
        "Ask and answer 'What's this?'.",
        "this/these = near (singular/plural); that/those = far (singular/plural)."
      ],
      "chalkHighlight": "This/That + is + a [noun] | These/Those + are + [nouns]"
    },
    "unit": 1,
    "cefr": "Pre-A1",
    "objectivesAr": [
      "يميز القريب من البعيد.",
      "يستخدم these/those مع الجمع و are.",
      "يسأل What's this? ويجيب."
    ],
    "objectivesEn": [
      "Distinguish near and far.",
      "Use these/those with plurals and are.",
      "Ask and answer 'What's this?'."
    ],
    "vocabulary": [
      {
        "word": "pencil",
        "ipa": "/ˈpɛnsəl/",
        "ar": "قلم رصاص",
        "exampleEn": "This is my pencil.",
        "exampleAr": "هذا قلمي."
      },
      {
        "word": "pen",
        "ipa": "/pɛn/",
        "ar": "قلم حبر",
        "exampleEn": "Is that your pen?",
        "exampleAr": "ذاك قلمك؟"
      },
      {
        "word": "book",
        "ipa": "/bʊk/",
        "ar": "كتاب",
        "exampleEn": "These are my books.",
        "exampleAr": "هذي كتبي."
      },
      {
        "word": "bag",
        "ipa": "/bæɡ/",
        "ar": "شنطة",
        "exampleEn": "That's my school bag.",
        "exampleAr": "ذيك شنطة مدرستي."
      },
      {
        "word": "desk",
        "ipa": "/dɛsk/",
        "ar": "مكتب/طاولة",
        "exampleEn": "This is my desk.",
        "exampleAr": "هذا مكتبي."
      },
      {
        "word": "chair",
        "ipa": "/tʃɛr/",
        "ar": "كرسي",
        "exampleEn": "Those chairs are new.",
        "exampleAr": "هذيك الكراسي جديدة."
      },
      {
        "word": "eraser",
        "ipa": "/ɪˈreɪsər/",
        "ar": "مساحة",
        "exampleEn": "It's an eraser.",
        "exampleAr": "هذي مساحة."
      },
      {
        "word": "door",
        "ipa": "/dɔːr/",
        "ar": "باب",
        "exampleEn": "That door is open.",
        "exampleAr": "ذاك الباب مفتوح."
      },
      {
        "word": "window",
        "ipa": "/ˈwɪndoʊ/",
        "ar": "نافذة",
        "exampleEn": "This window is big.",
        "exampleAr": "هذي النافذة كبيرة."
      },
      {
        "word": "shoes",
        "ipa": "/ʃuːz/",
        "ar": "حذاء/جزمة",
        "exampleEn": "These are my shoes.",
        "exampleAr": "هذي جزمتي."
      }
    ],
    "grammarFocus": {
      "ruleAr": "this للقريب المفرد و these للقريب الجمع، that للبعيد المفرد و those للبعيد الجمع.",
      "ruleEn": "this/these = near (singular/plural); that/those = far (singular/plural).",
      "formula": "This/That + is + a [noun] | These/Those + are + [nouns]",
      "examples": [
        {
          "en": "This is my pencil.",
          "ar": "هذا قلمي الرصاص."
        },
        {
          "en": "That is the teacher's desk.",
          "ar": "ذاك مكتب المعلم."
        },
        {
          "en": "These are my books.",
          "ar": "هذي كتبي."
        },
        {
          "en": "Those are new chairs.",
          "ar": "هذيك كراسي جديدة."
        },
        {
          "en": "What's this? It's an eraser.",
          "ar": "وش هذا؟ هذي مساحة."
        },
        {
          "en": "Are those your shoes?",
          "ar": "هذيك جزمك؟"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "What's this?",
        "ar": "وش هذا؟"
      },
      {
        "speaker": "Student",
        "en": "It's a pencil. And this is an eraser.",
        "ar": "هذا قلم رصاص. وهذي مساحة."
      },
      {
        "speaker": "Sara",
        "en": "Great! What are those, near the door?",
        "ar": "ممتاز! وش هذيك جنب الباب؟"
      },
      {
        "speaker": "Student",
        "en": "Those are chairs.",
        "ar": "هذيك كراسي."
      },
      {
        "speaker": "Sara",
        "en": "And is that your bag?",
        "ar": "وذيك شنطتك؟"
      },
      {
        "speaker": "Student",
        "en": "Yes, it is. These are my books too.",
        "ar": "إيه. وهذي كتبي بعد."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: What's this?\nStudent: It's a pencil. And this is an eraser.\nSara: Great! What are those, near the door?\nStudent: Those are chairs.\nSara: And is that your bag?\nStudent: Yes, it is. These are my books too.",
      "questions": [
        {
          "questionAr": "وش اللي جنب الباب؟",
          "questionEn": "What is near the door?",
          "options": [
            "bags",
            "chairs",
            "books"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: chairs"
        },
        {
          "questionAr": "وش معه مع القلم؟",
          "questionEn": "What does the student have with the pencil?",
          "options": [
            "an eraser",
            "a pen",
            "a desk"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: an eraser"
        },
        {
          "questionAr": "الشنطة للطالب؟",
          "questionEn": "Is the bag the student's?",
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
      "focus": "/ɪ/ in this vs /iː/ in these",
      "items": [
        "this /ðɪs/",
        "these /ðiːz/",
        "those /ðoʊz/"
      ],
      "tipAr": "this قصيرة وآخرها s، و these طويلة وآخرها z. لا تنطقها «زيس»."
    },
    "exercises": {
      "easy": [
        {
          "id": "sg_106_e1",
          "type": "meaning",
          "promptEn": "What does \"pencil\" mean?",
          "promptAr": "ما معنى \"pencil\"؟",
          "options": [
            "مساحة",
            "باب",
            "حذاء/جزمة",
            "قلم رصاص"
          ],
          "correctIndex": 3,
          "answer": "قلم رصاص",
          "explanationAr": "\"pencil\" /ˈpɛnsəl/ تعني: قلم رصاص. مثال: This is my pencil."
        },
        {
          "id": "sg_106_e2",
          "type": "meaning",
          "promptEn": "What does \"pen\" mean?",
          "promptAr": "ما معنى \"pen\"؟",
          "options": [
            "مساحة",
            "كرسي",
            "قلم حبر",
            "شنطة"
          ],
          "correctIndex": 2,
          "answer": "قلم حبر",
          "explanationAr": "\"pen\" /pɛn/ تعني: قلم حبر. مثال: Is that your pen?"
        },
        {
          "id": "sg_106_e3",
          "type": "meaning",
          "promptEn": "What does \"book\" mean?",
          "promptAr": "ما معنى \"book\"؟",
          "options": [
            "قلم حبر",
            "قلم رصاص",
            "كتاب",
            "مساحة"
          ],
          "correctIndex": 2,
          "answer": "كتاب",
          "explanationAr": "\"book\" /bʊk/ تعني: كتاب. مثال: These are my books."
        },
        {
          "id": "sg_106_e4",
          "type": "meaning",
          "promptEn": "What does \"bag\" mean?",
          "promptAr": "ما معنى \"bag\"؟",
          "options": [
            "قلم رصاص",
            "حذاء/جزمة",
            "شنطة",
            "كتاب"
          ],
          "correctIndex": 2,
          "answer": "شنطة",
          "explanationAr": "\"bag\" /bæɡ/ تعني: شنطة. مثال: That's my school bag."
        }
      ],
      "medium": [
        {
          "id": "sg_106_m1",
          "type": "gap",
          "promptEn": "Complete: ____ is my pencil.",
          "promptAr": "أكمل الفراغ: (هذا قلمي الرصاص.)",
          "options": [
            "Those",
            "These",
            "This"
          ],
          "correctIndex": 2,
          "answer": "This is my pencil.",
          "explanationAr": "الإجابة: This. this للقريب المفرد و these للقريب الجمع، that للبعيد المفرد و those للبعيد الجمع."
        },
        {
          "id": "sg_106_m2",
          "type": "gap",
          "promptEn": "Complete: ____ is the teacher's desk.",
          "promptAr": "أكمل الفراغ: (ذاك مكتب المعلم.)",
          "options": [
            "These",
            "Those",
            "That"
          ],
          "correctIndex": 2,
          "answer": "That is the teacher's desk.",
          "explanationAr": "الإجابة: That. this للقريب المفرد و these للقريب الجمع، that للبعيد المفرد و those للبعيد الجمع."
        },
        {
          "id": "sg_106_m3",
          "type": "gap",
          "promptEn": "Complete: ____ are my books.",
          "promptAr": "أكمل الفراغ: (هذي كتبي.)",
          "options": [
            "This",
            "These",
            "That"
          ],
          "correctIndex": 1,
          "answer": "These are my books.",
          "explanationAr": "الإجابة: These. this للقريب المفرد و these للقريب الجمع، that للبعيد المفرد و those للبعيد الجمع."
        },
        {
          "id": "sg_106_m4",
          "type": "gap",
          "promptEn": "Complete: ____ are new chairs.",
          "promptAr": "أكمل الفراغ: (هذيك كراسي جديدة.)",
          "options": [
            "Those",
            "This",
            "That"
          ],
          "correctIndex": 0,
          "answer": "Those are new chairs.",
          "explanationAr": "الإجابة: Those. this للقريب المفرد و these للقريب الجمع، that للبعيد المفرد و those للبعيد الجمع."
        }
      ],
      "hard": [
        {
          "id": "sg_106_h1",
          "type": "order",
          "promptEn": "Put the words in order: this? / eraser. / It's / an / What's",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (وش هذا؟ هذي مساحة.)",
          "answer": "What's this? It's an eraser.",
          "explanationAr": "الترتيب الصحيح: What's this? It's an eraser."
        },
        {
          "id": "sg_106_h2",
          "type": "order",
          "promptEn": "Put the words in order: your / Are / those / shoes?",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (هذيك جزمك؟)",
          "answer": "Are those your shoes?",
          "explanationAr": "الترتيب الصحيح: Are those your shoes?"
        },
        {
          "id": "sg_106_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: ذاك مكتب المعلم.",
          "answer": "That is the teacher's desk.",
          "explanationAr": "ترجمة مقترحة: That is the teacher's desk."
        },
        {
          "id": "sg_106_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: هذيك كراسي جديدة.",
          "answer": "Those are new chairs.",
          "explanationAr": "ترجمة مقترحة: Those are new chairs."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "This is pencil.",
        "correct": "This is a pencil.",
        "whyAr": "العربي ما فيه أداة نكرة؛ في الإنجليزي لازم a/an مع المفرد."
      },
      {
        "incorrect": "These is my shoes.",
        "correct": "These are my shoes.",
        "whyAr": "shoes جمع ⇐ are."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (النفي والسؤال مع be: Is he...? / I'm not): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'm not tired.",
          "I no tired."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I'm not tired. — النفي مع be يكون بـ not بعد الفعل، وليس no.",
        "fromLessonId": "sg_105"
      },
      {
        "questionAr": "مراجعة (التعريف بنفسك: I am و You are): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I am Faisal.",
          "I Faisal."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I am Faisal. — في العربي نقول «أنا فيصل» بدون فعل، لكن في الإنجليزي لازم am.",
        "fromLessonId": "sg_101"
      },
      {
        "questionAr": "ما معنى \"cat\"؟",
        "questionEn": "What does \"cat\" mean?",
        "options": [
          "قطة",
          "أب",
          "أخت",
          "طيب"
        ],
        "correctIndex": 0,
        "explanationAr": "\"cat\" /kæt/ تعني: قطة. مثال: It's a white cat.",
        "fromLessonId": "sg_104"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (هذي كتبي.)",
          "questionEn": "Complete: ____ are my books.",
          "options": [
            "This",
            "These",
            "That"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: These. this للقريب المفرد و these للقريب الجمع، that للبعيد المفرد و those للبعيد الجمع."
        },
        {
          "questionAr": "أكمل الفراغ: (هذيك كراسي جديدة.)",
          "questionEn": "Complete: ____ are new chairs.",
          "options": [
            "Those",
            "This",
            "That"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: Those. this للقريب المفرد و these للقريب الجمع، that للبعيد المفرد و those للبعيد الجمع."
        },
        {
          "questionAr": "ما معنى \"desk\"؟",
          "questionEn": "What does \"desk\" mean?",
          "options": [
            "مكتب/طاولة",
            "كرسي",
            "حذاء/جزمة",
            "قلم رصاص"
          ],
          "correctIndex": 0,
          "explanationAr": "\"desk\" /dɛsk/ تعني: مكتب/طاولة. مثال: This is my desk."
        },
        {
          "questionAr": "ما معنى \"chair\"؟",
          "questionEn": "What does \"chair\" mean?",
          "options": [
            "قلم رصاص",
            "قلم حبر",
            "كرسي",
            "شنطة"
          ],
          "correctIndex": 2,
          "explanationAr": "\"chair\" /tʃɛr/ تعني: كرسي. مثال: Those chairs are new."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "This is a pencil.",
            "This is pencil."
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: This is a pencil. — العربي ما فيه أداة نكرة؛ في الإنجليزي لازم a/an مع المفرد."
        }
      ]
    }
  },
  {
    "id": "sg_107",
    "pillarId": "grammar",
    "pillarNameAr": "القواعد التحدثية السريعة",
    "pillarNameEn": "Spoken Grammar & Fast Patterns",
    "pillarIcon": "🧠",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "There is / There are: وصف البيت",
    "titleEn": "There is / There are: Describing Your Home",
    "descAr": "صف غرف بيتك وحيّك: كم غرفة؟ وش فيه؟",
    "descEn": "Describe your home and neighborhood: what's there and how many.",
    "speakingGoalAr": "صف بيتك في خمس جمل.",
    "speakingGoalEn": "Describe your home in five sentences.",
    "keyPattern": {
      "ruleAr": "There is + مفرد، There are + جمع. للسؤال: Is there...? Are there...?",
      "ruleEn": "There is + singular; there are + plural. Questions: Is there / Are there...?",
      "formula": "There is a [noun] | There are [number] [nouns] + place"
    },
    "practicalExamples": [
      {
        "en": "There is a big majlis in my house.",
        "ar": "في بيتنا مجلس كبير."
      },
      {
        "en": "There are four bedrooms.",
        "ar": "فيه أربع غرف نوم."
      },
      {
        "en": "Is there a mosque near your house?",
        "ar": "فيه مسجد قريب من بيتكم؟"
      },
      {
        "en": "There isn't a garden.",
        "ar": "ما فيه حديقة."
      },
      {
        "en": "Are there any shops in your street?",
        "ar": "فيه محلات في شارعكم؟"
      },
      {
        "en": "There are two cars outside.",
        "ar": "فيه سيارتين برا."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "In my house there is four rooms.",
        "correct": "In my house there are four rooms.",
        "whyAr": "أكثر من واحد ⇐ there are."
      },
      {
        "incorrect": "My house has a garden near.",
        "correct": "There is a garden near my house.",
        "whyAr": "للتعبير عن وجود شيء في مكان نستخدم there is."
      },
      {
        "incorrect": "There is not garden.",
        "correct": "There isn't a garden. / There's no garden.",
        "whyAr": "مع isn't نحتاج a، أو نقول There's no."
      }
    ],
    "speakingChallenge": {
      "promptAr": "صف بيتك لسارة.",
      "promptEn": "Describe your home to Sara.",
      "saraQuestionAr": "وش في بيتكم؟ كم غرفة؟ فيه حديقة؟",
      "saraQuestionEn": "What's in your home? How many rooms? Is there a garden?",
      "recommendedResponseEn": "There are four bedrooms and a big majlis. There's a small kitchen. There isn't a garden, but there's a roof."
    },
    "quiz": [
      {
        "questionAr": "أكمل: ___ a kitchen downstairs.",
        "questionEn": "Complete: ___ a kitchen downstairs.",
        "options": [
          "There is",
          "There are",
          "It is"
        ],
        "correctIndex": 0,
        "explanationAr": "مطبخ واحد ⇐ there is."
      },
      {
        "questionAr": "اختر السؤال الصحيح:",
        "questionEn": "Choose the correct question:",
        "options": [
          "Are there a park?",
          "Is there a park?",
          "There is a park?"
        ],
        "correctIndex": 1,
        "explanationAr": "مفرد ⇐ Is there...?"
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "In my house there is four rooms.",
          "In my house there are four rooms."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: In my house there are four rooms. — أكثر من واحد ⇐ there are."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "My house has a garden near.",
          "There is a garden near my house."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: There is a garden near my house. — للتعبير عن وجود شيء في مكان نستخدم there is."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "There is not garden.",
          "There isn't a garden. / There's no garden."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: There isn't a garden. / There's no garden. — مع isn't نحتاج a، أو نقول There's no."
      }
    ],
    "whiteboardNotes": {
      "title": "There is / There are: Describing Your Home",
      "pointsAr": [
        "يصف ما يوجد في مكان.",
        "يستخدم أرقاماً مع there are.",
        "يسأل Is there...?/Are there...?",
        "There is + مفرد، There are + جمع. للسؤال: Is there...? Are there...?"
      ],
      "pointsEn": [
        "Say what exists in a place.",
        "Use numbers with there are.",
        "Ask Is there/Are there questions.",
        "There is + singular; there are + plural. Questions: Is there / Are there...?"
      ],
      "chalkHighlight": "There is a [noun] | There are [number] [nouns] + place"
    },
    "unit": 1,
    "cefr": "A1",
    "objectivesAr": [
      "يصف ما يوجد في مكان.",
      "يستخدم أرقاماً مع there are.",
      "يسأل Is there...?/Are there...?"
    ],
    "objectivesEn": [
      "Say what exists in a place.",
      "Use numbers with there are.",
      "Ask Is there/Are there questions."
    ],
    "vocabulary": [
      {
        "word": "bedroom",
        "ipa": "/ˈbɛdruːm/",
        "ar": "غرفة نوم",
        "exampleEn": "There are three bedrooms.",
        "exampleAr": "فيه ثلاث غرف نوم."
      },
      {
        "word": "kitchen",
        "ipa": "/ˈkɪtʃən/",
        "ar": "مطبخ",
        "exampleEn": "The kitchen is big.",
        "exampleAr": "المطبخ كبير."
      },
      {
        "word": "bathroom",
        "ipa": "/ˈbæθruːm/",
        "ar": "حمام/دورة مياه",
        "exampleEn": "There are two bathrooms.",
        "exampleAr": "فيه حمامين."
      },
      {
        "word": "living room",
        "ipa": "/ˈlɪvɪŋ ruːm/",
        "ar": "صالة",
        "exampleEn": "The TV is in the living room.",
        "exampleAr": "التلفزيون في الصالة."
      },
      {
        "word": "majlis",
        "ipa": "/ˈmædʒlɪs/",
        "ar": "مجلس",
        "exampleEn": "Guests sit in the majlis.",
        "exampleAr": "الضيوف يجلسون في المجلس."
      },
      {
        "word": "garden",
        "ipa": "/ˈɡɑːrdən/",
        "ar": "حديقة",
        "exampleEn": "There's a small garden.",
        "exampleAr": "فيه حديقة صغيرة."
      },
      {
        "word": "stairs",
        "ipa": "/stɛrz/",
        "ar": "درج",
        "exampleEn": "The stairs are near the door.",
        "exampleAr": "الدرج جنب الباب."
      },
      {
        "word": "roof",
        "ipa": "/ruːf/",
        "ar": "سطح",
        "exampleEn": "We sit on the roof in winter.",
        "exampleAr": "نجلس في السطح في الشتاء."
      },
      {
        "word": "mosque",
        "ipa": "/mɑːsk/",
        "ar": "مسجد",
        "exampleEn": "There's a mosque in our street.",
        "exampleAr": "فيه مسجد في شارعنا."
      },
      {
        "word": "near",
        "ipa": "/nɪr/",
        "ar": "قريب من",
        "exampleEn": "The school is near my house.",
        "exampleAr": "المدرسة قريبة من بيتي."
      }
    ],
    "grammarFocus": {
      "ruleAr": "There is + مفرد، There are + جمع. للسؤال: Is there...? Are there...?",
      "ruleEn": "There is + singular; there are + plural. Questions: Is there / Are there...?",
      "formula": "There is a [noun] | There are [number] [nouns] + place",
      "examples": [
        {
          "en": "There is a big majlis in my house.",
          "ar": "في بيتنا مجلس كبير."
        },
        {
          "en": "There are four bedrooms.",
          "ar": "فيه أربع غرف نوم."
        },
        {
          "en": "Is there a mosque near your house?",
          "ar": "فيه مسجد قريب من بيتكم؟"
        },
        {
          "en": "There isn't a garden.",
          "ar": "ما فيه حديقة."
        },
        {
          "en": "Are there any shops in your street?",
          "ar": "فيه محلات في شارعكم؟"
        },
        {
          "en": "There are two cars outside.",
          "ar": "فيه سيارتين برا."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Tell me about your house. Is it big?",
        "ar": "حدثني عن بيتكم. كبير؟"
      },
      {
        "speaker": "Student",
        "en": "Yes. There are five bedrooms and a big majlis.",
        "ar": "إيه. فيه خمس غرف نوم ومجلس كبير."
      },
      {
        "speaker": "Sara",
        "en": "Is there a garden?",
        "ar": "فيه حديقة؟"
      },
      {
        "speaker": "Student",
        "en": "There's a small garden with a palm tree.",
        "ar": "فيه حديقة صغيرة فيها نخلة."
      },
      {
        "speaker": "Sara",
        "en": "Are there any shops near your house?",
        "ar": "فيه محلات قريبة منكم؟"
      },
      {
        "speaker": "Student",
        "en": "Yes, there's a supermarket and a mosque near us.",
        "ar": "إيه، فيه سوبرماركت ومسجد قريب منا."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Tell me about your house. Is it big?\nStudent: Yes. There are five bedrooms and a big majlis.\nSara: Is there a garden?\nStudent: There's a small garden with a palm tree.\nSara: Are there any shops near your house?\nStudent: Yes, there's a supermarket and a mosque near us.",
      "questions": [
        {
          "questionAr": "كم غرفة نوم؟",
          "questionEn": "How many bedrooms are there?",
          "options": [
            "three",
            "four",
            "five"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: five"
        },
        {
          "questionAr": "وش في الحديقة؟",
          "questionEn": "What is in the garden?",
          "options": [
            "a palm tree",
            "a car",
            "a pool"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: a palm tree"
        },
        {
          "questionAr": "وش القريب من البيت؟",
          "questionEn": "What is near the house?",
          "options": [
            "a hospital",
            "a supermarket and a mosque",
            "a school"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: a supermarket and a mosque"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Linking: there's /ðɛrz/, there are /ðɛr ɑːr/",
      "items": [
        "there's a /ðɛrzə/",
        "there are /ðɛrər/",
        "bathroom /ˈbæθruːm/"
      ],
      "tipAr": "اربط الكلمات: There's a → «ذيرزا» نطقة وحدة. وفي bathroom صوت θ مثل «ث»."
    },
    "exercises": {
      "easy": [
        {
          "id": "sg_107_e1",
          "type": "meaning",
          "promptEn": "What does \"bedroom\" mean?",
          "promptAr": "ما معنى \"bedroom\"؟",
          "options": [
            "مطبخ",
            "سطح",
            "مسجد",
            "غرفة نوم"
          ],
          "correctIndex": 3,
          "answer": "غرفة نوم",
          "explanationAr": "\"bedroom\" /ˈbɛdruːm/ تعني: غرفة نوم. مثال: There are three bedrooms."
        },
        {
          "id": "sg_107_e2",
          "type": "meaning",
          "promptEn": "What does \"kitchen\" mean?",
          "promptAr": "ما معنى \"kitchen\"؟",
          "options": [
            "مطبخ",
            "غرفة نوم",
            "حمام/دورة مياه",
            "درج"
          ],
          "correctIndex": 0,
          "answer": "مطبخ",
          "explanationAr": "\"kitchen\" /ˈkɪtʃən/ تعني: مطبخ. مثال: The kitchen is big."
        },
        {
          "id": "sg_107_e3",
          "type": "meaning",
          "promptEn": "What does \"bathroom\" mean?",
          "promptAr": "ما معنى \"bathroom\"؟",
          "options": [
            "درج",
            "حمام/دورة مياه",
            "سطح",
            "مسجد"
          ],
          "correctIndex": 1,
          "answer": "حمام/دورة مياه",
          "explanationAr": "\"bathroom\" /ˈbæθruːm/ تعني: حمام/دورة مياه. مثال: There are two bathrooms."
        },
        {
          "id": "sg_107_e4",
          "type": "meaning",
          "promptEn": "What does \"living room\" mean?",
          "promptAr": "ما معنى \"living room\"؟",
          "options": [
            "مسجد",
            "مطبخ",
            "صالة",
            "غرفة نوم"
          ],
          "correctIndex": 2,
          "answer": "صالة",
          "explanationAr": "\"living room\" /ˈlɪvɪŋ ruːm/ تعني: صالة. مثال: The TV is in the living room."
        }
      ],
      "medium": [
        {
          "id": "sg_107_m1",
          "type": "gap",
          "promptEn": "Complete: ____ a big majlis in my house.",
          "promptAr": "أكمل الفراغ: (في بيتنا مجلس كبير.)",
          "options": [
            "It has",
            "There is",
            "There are"
          ],
          "correctIndex": 1,
          "answer": "There is a big majlis in my house.",
          "explanationAr": "الإجابة: There is. There is + مفرد، There are + جمع. للسؤال: Is there...? Are there...?"
        },
        {
          "id": "sg_107_m2",
          "type": "gap",
          "promptEn": "Complete: ____ four bedrooms.",
          "promptAr": "أكمل الفراغ: (فيه أربع غرف نوم.)",
          "options": [
            "They are",
            "There is",
            "There are"
          ],
          "correctIndex": 2,
          "answer": "There are four bedrooms.",
          "explanationAr": "الإجابة: There are. There is + مفرد، There are + جمع. للسؤال: Is there...? Are there...?"
        },
        {
          "id": "sg_107_m3",
          "type": "gap",
          "promptEn": "Complete: ____ a mosque near your house?",
          "promptAr": "أكمل الفراغ: (فيه مسجد قريب من بيتكم؟)",
          "options": [
            "Has",
            "Are there",
            "Is there"
          ],
          "correctIndex": 2,
          "answer": "Is there a mosque near your house?",
          "explanationAr": "الإجابة: Is there. There is + مفرد، There are + جمع. للسؤال: Is there...? Are there...?"
        },
        {
          "id": "sg_107_m4",
          "type": "gap",
          "promptEn": "Complete: There ____ a garden.",
          "promptAr": "أكمل الفراغ: (ما فيه حديقة.)",
          "options": [
            "aren't",
            "isn't",
            "no"
          ],
          "correctIndex": 1,
          "answer": "There isn't a garden.",
          "explanationAr": "الإجابة: isn't. There is + مفرد، There are + جمع. للسؤال: Is there...? Are there...?"
        }
      ],
      "hard": [
        {
          "id": "sg_107_h1",
          "type": "order",
          "promptEn": "Put the words in order: any / there / your / street? / Are / shops / in",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (فيه محلات في شارعكم؟)",
          "answer": "Are there any shops in your street?",
          "explanationAr": "الترتيب الصحيح: Are there any shops in your street?"
        },
        {
          "id": "sg_107_h2",
          "type": "order",
          "promptEn": "Put the words in order: two / cars / outside. / are / There",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (فيه سيارتين برا.)",
          "answer": "There are two cars outside.",
          "explanationAr": "الترتيب الصحيح: There are two cars outside."
        },
        {
          "id": "sg_107_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: فيه أربع غرف نوم.",
          "answer": "There are four bedrooms.",
          "explanationAr": "ترجمة مقترحة: There are four bedrooms."
        },
        {
          "id": "sg_107_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: ما فيه حديقة.",
          "answer": "There isn't a garden.",
          "explanationAr": "ترجمة مقترحة: There isn't a garden."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "My house it has five rooms.",
        "correct": "My house has five rooms. / There are five rooms in my house.",
        "whyAr": "لا تكرر الضمير it بعد الاسم."
      },
      {
        "incorrect": "There is many cars.",
        "correct": "There are many cars.",
        "whyAr": "many مع الجمع ⇐ are."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (This / That / These / Those في الفصل والبيت): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Those is my bag.",
          "That is my bag."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: That is my bag. — شيء واحد بعيد ⇐ that is.",
        "fromLessonId": "sg_106"
      },
      {
        "questionAr": "مراجعة (He is و She is: التحدث عن العائلة): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "My sister he is tall.",
          "My sister is tall."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: My sister is tall. — لا نكرر الضمير بعد الاسم مثل «أختي هي طويلة».",
        "fromLessonId": "sg_104"
      },
      {
        "questionAr": "ما معنى \"school\"؟",
        "questionEn": "What does \"school\" mean?",
        "options": [
          "مدرسة",
          "مبسوط/سعيد",
          "حزين",
          "البيت"
        ],
        "correctIndex": 0,
        "explanationAr": "\"school\" /skuːl/ تعني: مدرسة. مثال: Is he at school?",
        "fromLessonId": "sg_105"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (فيه مسجد قريب من بيتكم؟)",
          "questionEn": "Complete: ____ a mosque near your house?",
          "options": [
            "Has",
            "Are there",
            "Is there"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: Is there. There is + مفرد، There are + جمع. للسؤال: Is there...? Are there...?"
        },
        {
          "questionAr": "أكمل الفراغ: (ما فيه حديقة.)",
          "questionEn": "Complete: There ____ a garden.",
          "options": [
            "aren't",
            "isn't",
            "no"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: isn't. There is + مفرد، There are + جمع. للسؤال: Is there...? Are there...?"
        },
        {
          "questionAr": "ما معنى \"majlis\"؟",
          "questionEn": "What does \"majlis\" mean?",
          "options": [
            "مسجد",
            "حديقة",
            "مجلس",
            "غرفة نوم"
          ],
          "correctIndex": 2,
          "explanationAr": "\"majlis\" /ˈmædʒlɪs/ تعني: مجلس. مثال: Guests sit in the majlis."
        },
        {
          "questionAr": "ما معنى \"garden\"؟",
          "questionEn": "What does \"garden\" mean?",
          "options": [
            "حمام/دورة مياه",
            "صالة",
            "حديقة",
            "سطح"
          ],
          "correctIndex": 2,
          "explanationAr": "\"garden\" /ˈɡɑːrdən/ تعني: حديقة. مثال: There's a small garden."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "My house it has five rooms.",
            "My house has five rooms. / There are five rooms in my house."
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: My house has five rooms. / There are five rooms in my house. — لا تكرر الضمير it بعد الاسم."
        }
      ]
    }
  },
  {
    "id": "sg_108",
    "pillarId": "grammar",
    "pillarNameAr": "القواعد التحدثية السريعة",
    "pillarNameEn": "Spoken Grammar & Fast Patterns",
    "pillarIcon": "🧠",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "Have و Has: أشياؤك وعائلتك",
    "titleEn": "Have & Has: Your Things and Family",
    "descAr": "تكلم عن الأشياء اللي تملكها وأفراد عائلتك باستخدام have/has.",
    "descEn": "Talk about possessions and family with have/has.",
    "speakingGoalAr": "قل خمسة أشياء تملكها أنت وأفراد عائلتك.",
    "speakingGoalEn": "Say five things you and your family have.",
    "keyPattern": {
      "ruleAr": "I/you/we/they + have، و he/she/it + has. النفي: don't have / doesn't have.",
      "ruleEn": "I/you/we/they have; he/she/it has. Negative: don't/doesn't have.",
      "formula": "I/You/We/They + have | He/She/It + has + [noun]"
    },
    "practicalExamples": [
      {
        "en": "I have two brothers.",
        "ar": "عندي أخوين."
      },
      {
        "en": "She has a new phone.",
        "ar": "عندها جوال جديد."
      },
      {
        "en": "We don't have a cat.",
        "ar": "ما عندنا قطة."
      },
      {
        "en": "My father has a white car.",
        "ar": "أبوي عنده سيارة بيضاء."
      },
      {
        "en": "Do you have a bike?",
        "ar": "عندك سيكل؟"
      },
      {
        "en": "He doesn't have homework today.",
        "ar": "ما عنده واجب اليوم."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "She have a phone.",
        "correct": "She has a phone.",
        "whyAr": "مع she/he/it نستخدم has."
      },
      {
        "incorrect": "I have not a car.",
        "correct": "I don't have a car.",
        "whyAr": "النفي في الإنجليزي الحديث يكون بـ don't have."
      },
      {
        "incorrect": "He doesn't has a bike.",
        "correct": "He doesn't have a bike.",
        "whyAr": "بعد doesn't يرجع الفعل لأصله have."
      }
    ],
    "speakingChallenge": {
      "promptAr": "أخبر سارة عن ثلاثة أشياء عندك وشيئين عند أفراد عائلتك.",
      "promptEn": "Tell Sara what you and your family have.",
      "saraQuestionAr": "وش عندك؟ ووش عند أخوك أو أختك؟",
      "saraQuestionEn": "What do you have? What does your brother or sister have?",
      "recommendedResponseEn": "I have a bike and a tablet. My sister has a cat. My father has a big car. We don't have a garden."
    },
    "quiz": [
      {
        "questionAr": "أكمل: My grandmother ___ ten grandchildren.",
        "questionEn": "Complete: My grandmother ___ ten grandchildren.",
        "options": [
          "have",
          "has",
          "is"
        ],
        "correctIndex": 1,
        "explanationAr": "grandmother = she ⇐ has."
      },
      {
        "questionAr": "السؤال الصحيح:",
        "questionEn": "Correct question:",
        "options": [
          "Have you a pet?",
          "Do you have a pet?",
          "You have pet?"
        ],
        "correctIndex": 1,
        "explanationAr": "نسأل بـ Do you have...?"
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "She have a phone.",
          "She has a phone."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: She has a phone. — مع she/he/it نستخدم has."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I have not a car.",
          "I don't have a car."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I don't have a car. — النفي في الإنجليزي الحديث يكون بـ don't have."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "He doesn't have a bike.",
          "He doesn't has a bike."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: He doesn't have a bike. — بعد doesn't يرجع الفعل لأصله have."
      }
    ],
    "whiteboardNotes": {
      "title": "Have & Has: Your Things and Family",
      "pointsAr": [
        "يستخدم have و has بشكل صحيح.",
        "ينفي بـ don't have / doesn't have.",
        "يسأل Do you have...?",
        "I/you/we/they + have، و he/she/it + has. النفي: don't have / doesn't have."
      ],
      "pointsEn": [
        "Use have and has correctly.",
        "Make negatives with don't/doesn't have.",
        "Ask 'Do you have...?'.",
        "I/you/we/they have; he/she/it has. Negative: don't/doesn't have."
      ],
      "chalkHighlight": "I/You/We/They + have | He/She/It + has + [noun]"
    },
    "unit": 2,
    "cefr": "A1",
    "objectivesAr": [
      "يستخدم have و has بشكل صحيح.",
      "ينفي بـ don't have / doesn't have.",
      "يسأل Do you have...?"
    ],
    "objectivesEn": [
      "Use have and has correctly.",
      "Make negatives with don't/doesn't have.",
      "Ask 'Do you have...?'."
    ],
    "vocabulary": [
      {
        "word": "phone",
        "ipa": "/foʊn/",
        "ar": "جوال",
        "exampleEn": "I have a new phone.",
        "exampleAr": "عندي جوال جديد."
      },
      {
        "word": "car",
        "ipa": "/kɑːr/",
        "ar": "سيارة",
        "exampleEn": "My mother has a car.",
        "exampleAr": "أمي عندها سيارة."
      },
      {
        "word": "bike",
        "ipa": "/baɪk/",
        "ar": "دراجة/سيكل",
        "exampleEn": "Do you have a bike?",
        "exampleAr": "عندك سيكل؟"
      },
      {
        "word": "homework",
        "ipa": "/ˈhoʊmwɜːrk/",
        "ar": "واجب",
        "exampleEn": "I have homework.",
        "exampleAr": "عندي واجب."
      },
      {
        "word": "uncle",
        "ipa": "/ˈʌŋkəl/",
        "ar": "عم/خال",
        "exampleEn": "I have three uncles.",
        "exampleAr": "عندي ثلاثة أعمام."
      },
      {
        "word": "aunt",
        "ipa": "/ænt/",
        "ar": "عمة/خالة",
        "exampleEn": "My aunt has a big house.",
        "exampleAr": "خالتي عندها بيت كبير."
      },
      {
        "word": "cousin",
        "ipa": "/ˈkʌzən/",
        "ar": "ابن/بنت العم أو الخال",
        "exampleEn": "I have many cousins.",
        "exampleAr": "عندي عيال عم كثير."
      },
      {
        "word": "tablet",
        "ipa": "/ˈtæblət/",
        "ar": "جهاز لوحي/آيباد",
        "exampleEn": "She has a tablet.",
        "exampleAr": "عندها آيباد."
      },
      {
        "word": "pet",
        "ipa": "/pɛt/",
        "ar": "حيوان أليف",
        "exampleEn": "Do you have a pet?",
        "exampleAr": "عندك حيوان أليف؟"
      },
      {
        "word": "new",
        "ipa": "/nuː/",
        "ar": "جديد",
        "exampleEn": "He has new shoes.",
        "exampleAr": "عنده جزمة جديدة."
      }
    ],
    "grammarFocus": {
      "ruleAr": "I/you/we/they + have، و he/she/it + has. النفي: don't have / doesn't have.",
      "ruleEn": "I/you/we/they have; he/she/it has. Negative: don't/doesn't have.",
      "formula": "I/You/We/They + have | He/She/It + has + [noun]",
      "examples": [
        {
          "en": "I have two brothers.",
          "ar": "عندي أخوين."
        },
        {
          "en": "She has a new phone.",
          "ar": "عندها جوال جديد."
        },
        {
          "en": "We don't have a cat.",
          "ar": "ما عندنا قطة."
        },
        {
          "en": "My father has a white car.",
          "ar": "أبوي عنده سيارة بيضاء."
        },
        {
          "en": "Do you have a bike?",
          "ar": "عندك سيكل؟"
        },
        {
          "en": "He doesn't have homework today.",
          "ar": "ما عنده واجب اليوم."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Do you have any brothers or sisters?",
        "ar": "عندك إخوان أو خوات؟"
      },
      {
        "speaker": "Student",
        "en": "Yes, I have two brothers and one sister.",
        "ar": "إيه، عندي أخوين وأخت وحدة."
      },
      {
        "speaker": "Sara",
        "en": "Does your sister have a phone?",
        "ar": "أختك عندها جوال؟"
      },
      {
        "speaker": "Student",
        "en": "No, she doesn't. She has a tablet.",
        "ar": "لا، بس عندها آيباد."
      },
      {
        "speaker": "Sara",
        "en": "Do you have a pet?",
        "ar": "عندكم حيوان أليف؟"
      },
      {
        "speaker": "Student",
        "en": "We don't have a pet, but my cousin has a falcon!",
        "ar": "ما عندنا، بس ولد عمي عنده صقر!"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Do you have any brothers or sisters?\nStudent: Yes, I have two brothers and one sister.\nSara: Does your sister have a phone?\nStudent: No, she doesn't. She has a tablet.\nSara: Do you have a pet?\nStudent: We don't have a pet, but my cousin has a falcon!",
      "questions": [
        {
          "questionAr": "كم أخ عند الطالب؟",
          "questionEn": "How many brothers does the student have?",
          "options": [
            "one",
            "two",
            "three"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: two"
        },
        {
          "questionAr": "وش عند الأخت؟",
          "questionEn": "What does the sister have?",
          "options": [
            "a phone",
            "a tablet",
            "a bike"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: a tablet"
        },
        {
          "questionAr": "مين عنده صقر؟",
          "questionEn": "Who has a falcon?",
          "options": [
            "his cousin",
            "his uncle",
            "his father"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: his cousin"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Final /z/ in has /hæz/ and /v/ in have /hæv/",
      "items": [
        "have /hæv/",
        "has /hæz/",
        "doesn't /ˈdʌzənt/"
      ],
      "tipAr": "آخر have صوت v (شفة سفلية على الأسنان)، لا تقلبه f. و has آخرها z مو s."
    },
    "exercises": {
      "easy": [
        {
          "id": "sg_108_e1",
          "type": "meaning",
          "promptEn": "What does \"phone\" mean?",
          "promptAr": "ما معنى \"phone\"؟",
          "options": [
            "واجب",
            "ابن/بنت العم أو الخال",
            "جوال",
            "جهاز لوحي/آيباد"
          ],
          "correctIndex": 2,
          "answer": "جوال",
          "explanationAr": "\"phone\" /foʊn/ تعني: جوال. مثال: I have a new phone."
        },
        {
          "id": "sg_108_e2",
          "type": "meaning",
          "promptEn": "What does \"car\" mean?",
          "promptAr": "ما معنى \"car\"؟",
          "options": [
            "ابن/بنت العم أو الخال",
            "سيارة",
            "جهاز لوحي/آيباد",
            "عم/خال"
          ],
          "correctIndex": 1,
          "answer": "سيارة",
          "explanationAr": "\"car\" /kɑːr/ تعني: سيارة. مثال: My mother has a car."
        },
        {
          "id": "sg_108_e3",
          "type": "meaning",
          "promptEn": "What does \"bike\" mean?",
          "promptAr": "ما معنى \"bike\"؟",
          "options": [
            "دراجة/سيكل",
            "ابن/بنت العم أو الخال",
            "جوال",
            "واجب"
          ],
          "correctIndex": 0,
          "answer": "دراجة/سيكل",
          "explanationAr": "\"bike\" /baɪk/ تعني: دراجة/سيكل. مثال: Do you have a bike?"
        },
        {
          "id": "sg_108_e4",
          "type": "meaning",
          "promptEn": "What does \"homework\" mean?",
          "promptAr": "ما معنى \"homework\"؟",
          "options": [
            "عمة/خالة",
            "سيارة",
            "واجب",
            "جهاز لوحي/آيباد"
          ],
          "correctIndex": 2,
          "answer": "واجب",
          "explanationAr": "\"homework\" /ˈhoʊmwɜːrk/ تعني: واجب. مثال: I have homework."
        }
      ],
      "medium": [
        {
          "id": "sg_108_m1",
          "type": "gap",
          "promptEn": "Complete: I ____ two brothers.",
          "promptAr": "أكمل الفراغ: (عندي أخوين.)",
          "options": [
            "has",
            "have",
            "am"
          ],
          "correctIndex": 1,
          "answer": "I have two brothers.",
          "explanationAr": "الإجابة: have. I/you/we/they + have، و he/she/it + has. النفي: don't have / doesn't have."
        },
        {
          "id": "sg_108_m2",
          "type": "gap",
          "promptEn": "Complete: She ____ a new phone.",
          "promptAr": "أكمل الفراغ: (عندها جوال جديد.)",
          "options": [
            "is",
            "has",
            "have"
          ],
          "correctIndex": 1,
          "answer": "She has a new phone.",
          "explanationAr": "الإجابة: has. I/you/we/they + have، و he/she/it + has. النفي: don't have / doesn't have."
        },
        {
          "id": "sg_108_m3",
          "type": "gap",
          "promptEn": "Complete: We ____ have a cat.",
          "promptAr": "أكمل الفراغ: (ما عندنا قطة.)",
          "options": [
            "not",
            "doesn't",
            "don't"
          ],
          "correctIndex": 2,
          "answer": "We don't have a cat.",
          "explanationAr": "الإجابة: don't. I/you/we/they + have، و he/she/it + has. النفي: don't have / doesn't have."
        },
        {
          "id": "sg_108_m4",
          "type": "gap",
          "promptEn": "Complete: My father ____ a white car.",
          "promptAr": "أكمل الفراغ: (أبوي عنده سيارة بيضاء.)",
          "options": [
            "has",
            "have",
            "is have"
          ],
          "correctIndex": 0,
          "answer": "My father has a white car.",
          "explanationAr": "الإجابة: has. I/you/we/they + have، و he/she/it + has. النفي: don't have / doesn't have."
        }
      ],
      "hard": [
        {
          "id": "sg_108_h1",
          "type": "order",
          "promptEn": "Put the words in order: you / Do / have / bike? / a",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (عندك سيكل؟)",
          "answer": "Do you have a bike?",
          "explanationAr": "الترتيب الصحيح: Do you have a bike?"
        },
        {
          "id": "sg_108_h2",
          "type": "order",
          "promptEn": "Put the words in order: today. / have / He / homework / doesn't",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (ما عنده واجب اليوم.)",
          "answer": "He doesn't have homework today.",
          "explanationAr": "الترتيب الصحيح: He doesn't have homework today."
        },
        {
          "id": "sg_108_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: عندها جوال جديد.",
          "answer": "She has a new phone.",
          "explanationAr": "ترجمة مقترحة: She has a new phone."
        },
        {
          "id": "sg_108_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أبوي عنده سيارة بيضاء.",
          "answer": "My father has a white car.",
          "explanationAr": "ترجمة مقترحة: My father has a white car."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "I have 20 years.",
        "correct": "I'm 20 years old.",
        "whyAr": "العمر بالإنجليزي يكون بـ be وليس have (ترجمة حرفية من «لي ٢٠ سنة»)."
      },
      {
        "incorrect": "My brother he has a car.",
        "correct": "My brother has a car.",
        "whyAr": "لا نكرر الضمير بعد الاسم."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (There is / There are: وصف البيت): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "My house has a garden near.",
          "There is a garden near my house."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: There is a garden near my house. — للتعبير عن وجود شيء في مكان نستخدم there is.",
        "fromLessonId": "sg_107"
      },
      {
        "questionAr": "مراجعة (النفي والسؤال مع be: Is he...? / I'm not): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "You are hungry?",
          "Are you hungry?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Are you hungry? — في السؤال المكتوب نقدم are قبل you.",
        "fromLessonId": "sg_105"
      },
      {
        "questionAr": "ما معنى \"shoes\"؟",
        "questionEn": "What does \"shoes\" mean?",
        "options": [
          "باب",
          "مكتب/طاولة",
          "قلم رصاص",
          "حذاء/جزمة"
        ],
        "correctIndex": 3,
        "explanationAr": "\"shoes\" /ʃuːz/ تعني: حذاء/جزمة. مثال: These are my shoes.",
        "fromLessonId": "sg_106"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (ما عندنا قطة.)",
          "questionEn": "Complete: We ____ have a cat.",
          "options": [
            "not",
            "doesn't",
            "don't"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: don't. I/you/we/they + have، و he/she/it + has. النفي: don't have / doesn't have."
        },
        {
          "questionAr": "أكمل الفراغ: (أبوي عنده سيارة بيضاء.)",
          "questionEn": "Complete: My father ____ a white car.",
          "options": [
            "has",
            "have",
            "is have"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: has. I/you/we/they + have، و he/she/it + has. النفي: don't have / doesn't have."
        },
        {
          "questionAr": "ما معنى \"uncle\"؟",
          "questionEn": "What does \"uncle\" mean?",
          "options": [
            "عمة/خالة",
            "ابن/بنت العم أو الخال",
            "جوال",
            "عم/خال"
          ],
          "correctIndex": 3,
          "explanationAr": "\"uncle\" /ˈʌŋkəl/ تعني: عم/خال. مثال: I have three uncles."
        },
        {
          "questionAr": "ما معنى \"aunt\"؟",
          "questionEn": "What does \"aunt\" mean?",
          "options": [
            "عمة/خالة",
            "عم/خال",
            "جديد",
            "واجب"
          ],
          "correctIndex": 0,
          "explanationAr": "\"aunt\" /ænt/ تعني: عمة/خالة. مثال: My aunt has a big house."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "I'm 20 years old.",
            "I have 20 years."
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: I'm 20 years old. — العمر بالإنجليزي يكون بـ be وليس have (ترجمة حرفية من «لي ٢٠ سنة»)."
        }
      ]
    }
  },
  {
    "id": "sg_109",
    "pillarId": "grammar",
    "pillarNameAr": "القواعد التحدثية السريعة",
    "pillarNameEn": "Spoken Grammar & Fast Patterns",
    "pillarIcon": "🧠",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "المضارع البسيط: روتينك اليومي",
    "titleEn": "Present Simple: Your Daily Routine",
    "descAr": "صف يومك من الصبح لليل باستخدام المضارع البسيط مع I/you/we/they.",
    "descEn": "Describe your day from morning to night with the present simple.",
    "speakingGoalAr": "صف روتينك اليومي في ست جمل مرتبة بالوقت.",
    "speakingGoalEn": "Describe your routine in six time-ordered sentences.",
    "keyPattern": {
      "ruleAr": "المضارع البسيط للعادات والروتين: الفاعل + الفعل الأصلي. نستخدم at مع الساعة و in مع الصباح/المساء.",
      "ruleEn": "Present simple for habits: subject + base verb. 'at' with clock times, 'in the morning/evening'.",
      "formula": "I/You/We/They + [verb] + at [time] / in the [part of day]"
    },
    "practicalExamples": [
      {
        "en": "I wake up at six o'clock.",
        "ar": "أصحى الساعة ست."
      },
      {
        "en": "We have breakfast at seven.",
        "ar": "نفطر الساعة سبع."
      },
      {
        "en": "They go to school by bus.",
        "ar": "يروحون المدرسة بالباص."
      },
      {
        "en": "I do my homework in the evening.",
        "ar": "أسوي واجبي في المساء."
      },
      {
        "en": "After that, I play football with my friends.",
        "ar": "بعد كذا ألعب كورة مع ربعي."
      },
      {
        "en": "I go to bed at ten.",
        "ar": "أنام الساعة عشر."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "I am wake up at six.",
        "correct": "I wake up at six.",
        "whyAr": "لا نضع am قبل الفعل في المضارع البسيط."
      },
      {
        "incorrect": "I go to school in 7 o'clock.",
        "correct": "I go to school at 7 o'clock.",
        "whyAr": "مع الساعة نستخدم at."
      },
      {
        "incorrect": "I going to bed at ten.",
        "correct": "I go to bed at ten.",
        "whyAr": "للروتين نستخدم الفعل الأصلي بدون ing."
      }
    ],
    "speakingChallenge": {
      "promptAr": "صف لسارة يومك الدراسي من الصبح لليل.",
      "promptEn": "Describe your school day to Sara.",
      "saraQuestionAr": "احكِ لي يومك من أول ما تصحى!",
      "saraQuestionEn": "Tell me your day from the moment you wake up!",
      "recommendedResponseEn": "I wake up at five and pray Fajr. Then I have breakfast. I go to school at seven. After school I have lunch and do my homework. I go to bed at ten."
    },
    "quiz": [
      {
        "questionAr": "أكمل: We ___ lunch at two.",
        "questionEn": "Complete: We ___ lunch at two.",
        "options": [
          "has",
          "have",
          "having"
        ],
        "correctIndex": 1,
        "explanationAr": "we ⇐ have."
      },
      {
        "questionAr": "الحرف المناسب: ___ the evening",
        "questionEn": "Preposition: ___ the evening",
        "options": [
          "at",
          "in",
          "on"
        ],
        "correctIndex": 1,
        "explanationAr": "in the morning/afternoon/evening."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I am wake up at six.",
          "I wake up at six."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I wake up at six. — لا نضع am قبل الفعل في المضارع البسيط."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I go to school at 7 o'clock.",
          "I go to school in 7 o'clock."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I go to school at 7 o'clock. — مع الساعة نستخدم at."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I go to bed at ten.",
          "I going to bed at ten."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I go to bed at ten. — للروتين نستخدم الفعل الأصلي بدون ing."
      }
    ],
    "whiteboardNotes": {
      "title": "Present Simple: Your Daily Routine",
      "pointsAr": [
        "يصف روتينه بالمضارع البسيط.",
        "يقول الوقت بـ at و in.",
        "يرتب الأحداث بـ then/after that.",
        "المضارع البسيط للعادات والروتين: الفاعل + الفعل الأصلي. نستخدم at مع الساعة و in مع الصباح/المساء."
      ],
      "pointsEn": [
        "Describe a routine in the present simple.",
        "Use at/in with times.",
        "Sequence with then/after that.",
        "Present simple for habits: subject + base verb. 'at' with clock times, 'in the morning/evening'."
      ],
      "chalkHighlight": "I/You/We/They + [verb] + at [time] / in the [part of day]"
    },
    "unit": 2,
    "cefr": "A1",
    "objectivesAr": [
      "يصف روتينه بالمضارع البسيط.",
      "يقول الوقت بـ at و in.",
      "يرتب الأحداث بـ then/after that."
    ],
    "objectivesEn": [
      "Describe a routine in the present simple.",
      "Use at/in with times.",
      "Sequence with then/after that."
    ],
    "vocabulary": [
      {
        "word": "wake up",
        "ipa": "/weɪk ʌp/",
        "ar": "يصحى من النوم",
        "exampleEn": "I wake up early.",
        "exampleAr": "أصحى بدري."
      },
      {
        "word": "get dressed",
        "ipa": "/ɡɛt drɛst/",
        "ar": "يلبس",
        "exampleEn": "I get dressed at 6:30.",
        "exampleAr": "ألبس الساعة ست ونص."
      },
      {
        "word": "breakfast",
        "ipa": "/ˈbrɛkfəst/",
        "ar": "فطور",
        "exampleEn": "We have breakfast together.",
        "exampleAr": "نفطر مع بعض."
      },
      {
        "word": "pray",
        "ipa": "/preɪ/",
        "ar": "يصلي",
        "exampleEn": "We pray Fajr at five.",
        "exampleAr": "نصلي الفجر الساعة خمس."
      },
      {
        "word": "lunch",
        "ipa": "/lʌntʃ/",
        "ar": "غداء",
        "exampleEn": "We have lunch at two.",
        "exampleAr": "نتغدى الساعة ثنتين."
      },
      {
        "word": "dinner",
        "ipa": "/ˈdɪnər/",
        "ar": "عشاء",
        "exampleEn": "Dinner is at eight.",
        "exampleAr": "العشاء الساعة ثمان."
      },
      {
        "word": "homework",
        "ipa": "/ˈhoʊmwɜːrk/",
        "ar": "واجب",
        "exampleEn": "I do my homework after Asr.",
        "exampleAr": "أسوي واجبي بعد العصر."
      },
      {
        "word": "go to bed",
        "ipa": "/ɡoʊ tə bɛd/",
        "ar": "ينام (يروح للفراش)",
        "exampleEn": "I go to bed at ten.",
        "exampleAr": "أنام الساعة عشر."
      },
      {
        "word": "early",
        "ipa": "/ˈɜːrli/",
        "ar": "بدري",
        "exampleEn": "I wake up early.",
        "exampleAr": "أصحى بدري."
      },
      {
        "word": "then",
        "ipa": "/ðɛn/",
        "ar": "بعدين",
        "exampleEn": "I eat, then I go to school.",
        "exampleAr": "آكل وبعدين أروح المدرسة."
      }
    ],
    "grammarFocus": {
      "ruleAr": "المضارع البسيط للعادات والروتين: الفاعل + الفعل الأصلي. نستخدم at مع الساعة و in مع الصباح/المساء.",
      "ruleEn": "Present simple for habits: subject + base verb. 'at' with clock times, 'in the morning/evening'.",
      "formula": "I/You/We/They + [verb] + at [time] / in the [part of day]",
      "examples": [
        {
          "en": "I wake up at six o'clock.",
          "ar": "أصحى الساعة ست."
        },
        {
          "en": "We have breakfast at seven.",
          "ar": "نفطر الساعة سبع."
        },
        {
          "en": "They go to school by bus.",
          "ar": "يروحون المدرسة بالباص."
        },
        {
          "en": "I do my homework in the evening.",
          "ar": "أسوي واجبي في المساء."
        },
        {
          "en": "After that, I play football with my friends.",
          "ar": "بعد كذا ألعب كورة مع ربعي."
        },
        {
          "en": "I go to bed at ten.",
          "ar": "أنام الساعة عشر."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "What time do you wake up?",
        "ar": "متى تصحى؟"
      },
      {
        "speaker": "Student",
        "en": "I wake up at five for Fajr.",
        "ar": "أصحى الساعة خمس للفجر."
      },
      {
        "speaker": "Sara",
        "en": "Wow, early! What do you do then?",
        "ar": "واو بدري! ووش تسوي بعدها؟"
      },
      {
        "speaker": "Student",
        "en": "I get dressed and have breakfast with my family.",
        "ar": "ألبس وأفطر مع أهلي."
      },
      {
        "speaker": "Sara",
        "en": "How do you go to school?",
        "ar": "كيف تروح المدرسة؟"
      },
      {
        "speaker": "Student",
        "en": "My father drives me. School starts at seven.",
        "ar": "أبوي يوديني. المدرسة تبدأ الساعة سبع."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: What time do you wake up?\nStudent: I wake up at five for Fajr.\nSara: Wow, early! What do you do then?\nStudent: I get dressed and have breakfast with my family.\nSara: How do you go to school?\nStudent: My father drives me. School starts at seven.",
      "questions": [
        {
          "questionAr": "متى يصحى الطالب؟",
          "questionEn": "What time does the student wake up?",
          "options": [
            "at five",
            "at six",
            "at seven"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: at five"
        },
        {
          "questionAr": "مين يوديه المدرسة؟",
          "questionEn": "Who drives him to school?",
          "options": [
            "his mother",
            "his father",
            "the bus"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: his father"
        },
        {
          "questionAr": "متى تبدأ المدرسة؟",
          "questionEn": "When does school start?",
          "options": [
            "at six",
            "at seven",
            "at eight"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: at seven"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Telling the time: o'clock /əˈklɑːk/, half past",
      "items": [
        "six o'clock",
        "half past seven",
        "breakfast /ˈbrɛkfəst/ (not break-fast)"
      ],
      "tipAr": "breakfast تنطق «بريكفست» بسرعة، والمقطع الثاني ضعيف."
    },
    "exercises": {
      "easy": [
        {
          "id": "sg_109_e1",
          "type": "meaning",
          "promptEn": "What does \"wake up\" mean?",
          "promptAr": "ما معنى \"wake up\"؟",
          "options": [
            "غداء",
            "يصحى من النوم",
            "بدري",
            "فطور"
          ],
          "correctIndex": 1,
          "answer": "يصحى من النوم",
          "explanationAr": "\"wake up\" /weɪk ʌp/ تعني: يصحى من النوم. مثال: I wake up early."
        },
        {
          "id": "sg_109_e2",
          "type": "meaning",
          "promptEn": "What does \"get dressed\" mean?",
          "promptAr": "ما معنى \"get dressed\"؟",
          "options": [
            "يصلي",
            "بعدين",
            "فطور",
            "يلبس"
          ],
          "correctIndex": 3,
          "answer": "يلبس",
          "explanationAr": "\"get dressed\" /ɡɛt drɛst/ تعني: يلبس. مثال: I get dressed at 6:30."
        },
        {
          "id": "sg_109_e3",
          "type": "meaning",
          "promptEn": "What does \"breakfast\" mean?",
          "promptAr": "ما معنى \"breakfast\"؟",
          "options": [
            "يصحى من النوم",
            "بعدين",
            "فطور",
            "بدري"
          ],
          "correctIndex": 2,
          "answer": "فطور",
          "explanationAr": "\"breakfast\" /ˈbrɛkfəst/ تعني: فطور. مثال: We have breakfast together."
        },
        {
          "id": "sg_109_e4",
          "type": "meaning",
          "promptEn": "What does \"pray\" mean?",
          "promptAr": "ما معنى \"pray\"؟",
          "options": [
            "بدري",
            "يصلي",
            "غداء",
            "عشاء"
          ],
          "correctIndex": 1,
          "answer": "يصلي",
          "explanationAr": "\"pray\" /preɪ/ تعني: يصلي. مثال: We pray Fajr at five."
        }
      ],
      "medium": [
        {
          "id": "sg_109_m1",
          "type": "gap",
          "promptEn": "Complete: I ____ at six o'clock.",
          "promptAr": "أكمل الفراغ: (أصحى الساعة ست.)",
          "options": [
            "wakes up",
            "waking up",
            "wake up"
          ],
          "correctIndex": 2,
          "answer": "I wake up at six o'clock.",
          "explanationAr": "الإجابة: wake up. المضارع البسيط للعادات والروتين: الفاعل + الفعل الأصلي. نستخدم at مع الساعة و in مع الصباح/المساء."
        },
        {
          "id": "sg_109_m2",
          "type": "gap",
          "promptEn": "Complete: We have breakfast ____ seven.",
          "promptAr": "أكمل الفراغ: (نفطر الساعة سبع.)",
          "options": [
            "at",
            "on",
            "in"
          ],
          "correctIndex": 0,
          "answer": "We have breakfast at seven.",
          "explanationAr": "الإجابة: at. المضارع البسيط للعادات والروتين: الفاعل + الفعل الأصلي. نستخدم at مع الساعة و in مع الصباح/المساء."
        },
        {
          "id": "sg_109_m3",
          "type": "gap",
          "promptEn": "Complete: They ____ to school by bus.",
          "promptAr": "أكمل الفراغ: (يروحون المدرسة بالباص.)",
          "options": [
            "goes",
            "go",
            "going"
          ],
          "correctIndex": 1,
          "answer": "They go to school by bus.",
          "explanationAr": "الإجابة: go. المضارع البسيط للعادات والروتين: الفاعل + الفعل الأصلي. نستخدم at مع الساعة و in مع الصباح/المساء."
        },
        {
          "id": "sg_109_m4",
          "type": "gap",
          "promptEn": "Complete: I do my homework ____ the evening.",
          "promptAr": "أكمل الفراغ: (أسوي واجبي في المساء.)",
          "options": [
            "at",
            "in",
            "on"
          ],
          "correctIndex": 1,
          "answer": "I do my homework in the evening.",
          "explanationAr": "الإجابة: in. المضارع البسيط للعادات والروتين: الفاعل + الفعل الأصلي. نستخدم at مع الساعة و in مع الصباح/المساء."
        }
      ],
      "hard": [
        {
          "id": "sg_109_h1",
          "type": "order",
          "promptEn": "Put the words in order: with / that, / friends. / football / After / play / I / my",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (بعد كذا ألعب كورة مع ربعي.)",
          "answer": "After that, I play football with my friends.",
          "explanationAr": "الترتيب الصحيح: After that, I play football with my friends."
        },
        {
          "id": "sg_109_h2",
          "type": "order",
          "promptEn": "Put the words in order: I / to / at / ten. / bed / go",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (أنام الساعة عشر.)",
          "answer": "I go to bed at ten.",
          "explanationAr": "الترتيب الصحيح: I go to bed at ten."
        },
        {
          "id": "sg_109_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: نفطر الساعة سبع.",
          "answer": "We have breakfast at seven.",
          "explanationAr": "ترجمة مقترحة: We have breakfast at seven."
        },
        {
          "id": "sg_109_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أسوي واجبي في المساء.",
          "answer": "I do my homework in the evening.",
          "explanationAr": "ترجمة مقترحة: I do my homework in the evening."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "I go to the school every day.",
        "correct": "I go to school every day.",
        "whyAr": "go to school/bed/work بدون the عند الكلام العام."
      },
      {
        "incorrect": "I eat breakfast at 7 in the morning time.",
        "correct": "I have breakfast at 7 in the morning.",
        "whyAr": "نقول have breakfast، وما نضيف time."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (Have و Has: أشياؤك وعائلتك): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I have not a car.",
          "I don't have a car."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I don't have a car. — النفي في الإنجليزي الحديث يكون بـ don't have.",
        "fromLessonId": "sg_108"
      },
      {
        "questionAr": "مراجعة (This / That / These / Those في الفصل والبيت): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "This are my books.",
          "These are my books."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: These are my books. — الجمع يحتاج these و are.",
        "fromLessonId": "sg_106"
      },
      {
        "questionAr": "مراجعة (التعريف بنفسك: I am و You are): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I Faisal.",
          "I am Faisal."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I am Faisal. — في العربي نقول «أنا فيصل» بدون فعل، لكن في الإنجليزي لازم am.",
        "fromLessonId": "sg_101"
      },
      {
        "questionAr": "ما معنى \"near\"؟",
        "questionEn": "What does \"near\" mean?",
        "options": [
          "قريب من",
          "صالة",
          "حمام/دورة مياه",
          "مطبخ"
        ],
        "correctIndex": 0,
        "explanationAr": "\"near\" /nɪr/ تعني: قريب من. مثال: The school is near my house.",
        "fromLessonId": "sg_107"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (يروحون المدرسة بالباص.)",
          "questionEn": "Complete: They ____ to school by bus.",
          "options": [
            "goes",
            "go",
            "going"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: go. المضارع البسيط للعادات والروتين: الفاعل + الفعل الأصلي. نستخدم at مع الساعة و in مع الصباح/المساء."
        },
        {
          "questionAr": "أكمل الفراغ: (أسوي واجبي في المساء.)",
          "questionEn": "Complete: I do my homework ____ the evening.",
          "options": [
            "at",
            "in",
            "on"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: in. المضارع البسيط للعادات والروتين: الفاعل + الفعل الأصلي. نستخدم at مع الساعة و in مع الصباح/المساء."
        },
        {
          "questionAr": "ما معنى \"lunch\"؟",
          "questionEn": "What does \"lunch\" mean?",
          "options": [
            "يصلي",
            "عشاء",
            "غداء",
            "بدري"
          ],
          "correctIndex": 2,
          "explanationAr": "\"lunch\" /lʌntʃ/ تعني: غداء. مثال: We have lunch at two."
        },
        {
          "questionAr": "ما معنى \"dinner\"؟",
          "questionEn": "What does \"dinner\" mean?",
          "options": [
            "يصحى من النوم",
            "يلبس",
            "عشاء",
            "ينام (يروح للفراش)"
          ],
          "correctIndex": 2,
          "explanationAr": "\"dinner\" /ˈdɪnər/ تعني: عشاء. مثال: Dinner is at eight."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "I go to the school every day.",
            "I go to school every day."
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: I go to school every day. — go to school/bed/work بدون the عند الكلام العام."
        }
      ]
    }
  },
  {
    "id": "sg_110",
    "pillarId": "grammar",
    "pillarNameAr": "القواعد التحدثية السريعة",
    "pillarNameEn": "Spoken Grammar & Fast Patterns",
    "pillarIcon": "🧠",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "He works / She studies: حرف s مع الغائب",
    "titleEn": "Present Simple with He/She: The -s Ending",
    "descAr": "أشهر خطأ عند العرب: نسيان s مع he/she/it. تدرب عليه بوصف روتين أفراد العائلة.",
    "descEn": "The #1 Arab learner mistake: forgetting -s with he/she/it. Practise with family routines.",
    "speakingGoalAr": "صف روتين شخص من عائلتك في خمس جمل بدون نسيان s.",
    "speakingGoalEn": "Describe a family member's routine in five sentences, all with -s.",
    "keyPattern": {
      "ruleAr": "مع he/she/it نضيف s للفعل: works, plays. ونضيف es بعد ch/sh/o/x: watches, goes. والفعل المنتهي بحرف ساكن + y يصير ies: studies.",
      "ruleEn": "Add -s with he/she/it; -es after ch/sh/o/x; consonant + y → -ies.",
      "formula": "He/She/It + verb+s/es/ies"
    },
    "practicalExamples": [
      {
        "en": "My father works in a bank.",
        "ar": "أبوي يشتغل في بنك."
      },
      {
        "en": "She studies English every day.",
        "ar": "هي تذاكر إنجليزي كل يوم."
      },
      {
        "en": "My brother watches football at night.",
        "ar": "أخوي يتابع كورة بالليل."
      },
      {
        "en": "He goes to the gym after work.",
        "ar": "يروح النادي بعد الدوام."
      },
      {
        "en": "My mother cooks kabsa on Fridays.",
        "ar": "أمي تطبخ كبسة يوم الجمعة."
      },
      {
        "en": "Our cat sleeps all day.",
        "ar": "قطتنا تنام طول اليوم."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "He work in a bank.",
        "correct": "He works in a bank.",
        "whyAr": "مع he لازم s؛ هذا أكثر خطأ عند المتعلمين العرب."
      },
      {
        "incorrect": "She studys at night.",
        "correct": "She studies at night.",
        "whyAr": "حرف ساكن + y ⇐ ies."
      },
      {
        "incorrect": "He go to the gym.",
        "correct": "He goes to the gym.",
        "whyAr": "go ⇐ goes مع he/she."
      }
    ],
    "speakingChallenge": {
      "promptAr": "صف لسارة روتين أبوك أو أمك.",
      "promptEn": "Describe your father's or mother's routine.",
      "saraQuestionAr": "وش يسوي أبوك أو أمك في يوم عادي؟",
      "saraQuestionEn": "What does your father or mother do on a normal day?",
      "recommendedResponseEn": "My mother wakes up at five. She makes breakfast. She works in a school. She comes home at two and cooks lunch."
    },
    "quiz": [
      {
        "questionAr": "أكمل: My sister ___ to school by bus.",
        "questionEn": "Complete: My sister ___ to school by bus.",
        "options": [
          "go",
          "goes",
          "gos"
        ],
        "correctIndex": 1,
        "explanationAr": "she ⇐ goes."
      },
      {
        "questionAr": "أي فعل مكتوب صح؟",
        "questionEn": "Which is spelled correctly?",
        "options": [
          "flys",
          "flies",
          "flyes"
        ],
        "correctIndex": 1,
        "explanationAr": "ساكن + y ⇐ ies."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "He works in a bank.",
          "He work in a bank."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: He works in a bank. — مع he لازم s؛ هذا أكثر خطأ عند المتعلمين العرب."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "She studys at night.",
          "She studies at night."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: She studies at night. — حرف ساكن + y ⇐ ies."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "He goes to the gym.",
          "He go to the gym."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: He goes to the gym. — go ⇐ goes مع he/she."
      }
    ],
    "whiteboardNotes": {
      "title": "Present Simple with He/She: The -s Ending",
      "pointsAr": [
        "يضيف s مع he/she/it دائماً.",
        "يطبق قواعد es و ies.",
        "يصف روتين شخص آخر.",
        "مع he/she/it نضيف s للفعل: works, plays. ونضيف es بعد ch/sh/o/x: watches, goes. والفعل المنتهي بحرف ساكن + y يصير ies: studies."
      ],
      "pointsEn": [
        "Always add -s with he/she/it.",
        "Apply -es and -ies spelling.",
        "Describe another person's routine.",
        "Add -s with he/she/it; -es after ch/sh/o/x; consonant + y → -ies."
      ],
      "chalkHighlight": "He/She/It + verb+s/es/ies"
    },
    "unit": 2,
    "cefr": "A1",
    "objectivesAr": [
      "يضيف s مع he/she/it دائماً.",
      "يطبق قواعد es و ies.",
      "يصف روتين شخص آخر."
    ],
    "objectivesEn": [
      "Always add -s with he/she/it.",
      "Apply -es and -ies spelling.",
      "Describe another person's routine."
    ],
    "vocabulary": [
      {
        "word": "work",
        "ipa": "/wɜːrk/",
        "ar": "يشتغل",
        "exampleEn": "He works in Dammam.",
        "exampleAr": "يشتغل في الدمام."
      },
      {
        "word": "study",
        "ipa": "/ˈstʌdi/",
        "ar": "يذاكر/يدرس",
        "exampleEn": "She studies at night.",
        "exampleAr": "تذاكر بالليل."
      },
      {
        "word": "watch",
        "ipa": "/wɑːtʃ/",
        "ar": "يشاهد",
        "exampleEn": "He watches TV.",
        "exampleAr": "يشوف تلفزيون."
      },
      {
        "word": "cook",
        "ipa": "/kʊk/",
        "ar": "يطبخ",
        "exampleEn": "My mother cooks well.",
        "exampleAr": "أمي تطبخ زين."
      },
      {
        "word": "drive",
        "ipa": "/draɪv/",
        "ar": "يسوق",
        "exampleEn": "My uncle drives a truck.",
        "exampleAr": "عمي يسوق شاحنة."
      },
      {
        "word": "bank",
        "ipa": "/bæŋk/",
        "ar": "بنك",
        "exampleEn": "She works at a bank.",
        "exampleAr": "تشتغل في بنك."
      },
      {
        "word": "gym",
        "ipa": "/dʒɪm/",
        "ar": "نادي رياضي",
        "exampleEn": "He goes to the gym.",
        "exampleAr": "يروح النادي."
      },
      {
        "word": "every day",
        "ipa": "/ˈɛvri deɪ/",
        "ar": "كل يوم",
        "exampleEn": "She reads every day.",
        "exampleAr": "تقرأ كل يوم."
      },
      {
        "word": "visit",
        "ipa": "/ˈvɪzɪt/",
        "ar": "يزور",
        "exampleEn": "Grandpa visits us on Fridays.",
        "exampleAr": "جدي يزورنا يوم الجمعة."
      },
      {
        "word": "hospital",
        "ipa": "/ˈhɑːspɪtəl/",
        "ar": "مستشفى",
        "exampleEn": "My aunt works in a hospital.",
        "exampleAr": "خالتي تشتغل في مستشفى."
      }
    ],
    "grammarFocus": {
      "ruleAr": "مع he/she/it نضيف s للفعل: works, plays. ونضيف es بعد ch/sh/o/x: watches, goes. والفعل المنتهي بحرف ساكن + y يصير ies: studies.",
      "ruleEn": "Add -s with he/she/it; -es after ch/sh/o/x; consonant + y → -ies.",
      "formula": "He/She/It + verb+s/es/ies",
      "examples": [
        {
          "en": "My father works in a bank.",
          "ar": "أبوي يشتغل في بنك."
        },
        {
          "en": "She studies English every day.",
          "ar": "هي تذاكر إنجليزي كل يوم."
        },
        {
          "en": "My brother watches football at night.",
          "ar": "أخوي يتابع كورة بالليل."
        },
        {
          "en": "He goes to the gym after work.",
          "ar": "يروح النادي بعد الدوام."
        },
        {
          "en": "My mother cooks kabsa on Fridays.",
          "ar": "أمي تطبخ كبسة يوم الجمعة."
        },
        {
          "en": "Our cat sleeps all day.",
          "ar": "قطتنا تنام طول اليوم."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "What does your father do?",
        "ar": "وش يشتغل أبوك؟"
      },
      {
        "speaker": "Student",
        "en": "He works in a hospital. He's a nurse.",
        "ar": "يشتغل في مستشفى. هو ممرض."
      },
      {
        "speaker": "Sara",
        "en": "What time does he start work?",
        "ar": "متى يبدأ دوامه؟"
      },
      {
        "speaker": "Student",
        "en": "He starts at seven and finishes at three.",
        "ar": "يبدأ الساعة سبع ويخلص الساعة ثلاث."
      },
      {
        "speaker": "Sara",
        "en": "And your mother?",
        "ar": "وأمك؟"
      },
      {
        "speaker": "Student",
        "en": "She teaches math. She also cooks amazing kabsa!",
        "ar": "تدرّس رياضيات. وتطبخ كبسة خطيرة!"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: What does your father do?\nStudent: He works in a hospital. He's a nurse.\nSara: What time does he start work?\nStudent: He starts at seven and finishes at three.\nSara: And your mother?\nStudent: She teaches math. She also cooks amazing kabsa!",
      "questions": [
        {
          "questionAr": "وين يشتغل الأب؟",
          "questionEn": "Where does the father work?",
          "options": [
            "in a bank",
            "in a hospital",
            "in a school"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: in a hospital"
        },
        {
          "questionAr": "متى يخلص؟",
          "questionEn": "When does he finish work?",
          "options": [
            "at two",
            "at three",
            "at four"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: at three"
        },
        {
          "questionAr": "وش تدرّس الأم؟",
          "questionEn": "What does the mother teach?",
          "options": [
            "English",
            "science",
            "math"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: math"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Three sounds of -s: /s/ works, /z/ plays, /ɪz/ watches",
      "items": [
        "works /wɜːrks/",
        "plays /pleɪz/",
        "watches /ˈwɑːtʃɪz/"
      ],
      "tipAr": "بعد ch/sh/s/x نضيف مقطعاً «إز»: watches = «واتشِز»."
    },
    "exercises": {
      "easy": [
        {
          "id": "sg_110_e1",
          "type": "meaning",
          "promptEn": "What does \"work\" mean?",
          "promptAr": "ما معنى \"work\"؟",
          "options": [
            "نادي رياضي",
            "يزور",
            "يشتغل",
            "كل يوم"
          ],
          "correctIndex": 2,
          "answer": "يشتغل",
          "explanationAr": "\"work\" /wɜːrk/ تعني: يشتغل. مثال: He works in Dammam."
        },
        {
          "id": "sg_110_e2",
          "type": "meaning",
          "promptEn": "What does \"study\" mean?",
          "promptAr": "ما معنى \"study\"؟",
          "options": [
            "يطبخ",
            "يسوق",
            "مستشفى",
            "يذاكر/يدرس"
          ],
          "correctIndex": 3,
          "answer": "يذاكر/يدرس",
          "explanationAr": "\"study\" /ˈstʌdi/ تعني: يذاكر/يدرس. مثال: She studies at night."
        },
        {
          "id": "sg_110_e3",
          "type": "meaning",
          "promptEn": "What does \"watch\" mean?",
          "promptAr": "ما معنى \"watch\"؟",
          "options": [
            "يشاهد",
            "كل يوم",
            "مستشفى",
            "يسوق"
          ],
          "correctIndex": 0,
          "answer": "يشاهد",
          "explanationAr": "\"watch\" /wɑːtʃ/ تعني: يشاهد. مثال: He watches TV."
        },
        {
          "id": "sg_110_e4",
          "type": "meaning",
          "promptEn": "What does \"cook\" mean?",
          "promptAr": "ما معنى \"cook\"؟",
          "options": [
            "يذاكر/يدرس",
            "يسوق",
            "مستشفى",
            "يطبخ"
          ],
          "correctIndex": 3,
          "answer": "يطبخ",
          "explanationAr": "\"cook\" /kʊk/ تعني: يطبخ. مثال: My mother cooks well."
        }
      ],
      "medium": [
        {
          "id": "sg_110_m1",
          "type": "gap",
          "promptEn": "Complete: My father ____ in a bank.",
          "promptAr": "أكمل الفراغ: (أبوي يشتغل في بنك.)",
          "options": [
            "work",
            "works",
            "working"
          ],
          "correctIndex": 1,
          "answer": "My father works in a bank.",
          "explanationAr": "الإجابة: works. مع he/she/it نضيف s للفعل: works, plays. ونضيف es بعد ch/sh/o/x: watches, goes. والفعل المنتهي بحرف ساكن + y يصير ies: studies."
        },
        {
          "id": "sg_110_m2",
          "type": "gap",
          "promptEn": "Complete: She ____ English every day.",
          "promptAr": "أكمل الفراغ: (هي تذاكر إنجليزي كل يوم.)",
          "options": [
            "studies",
            "studys",
            "study"
          ],
          "correctIndex": 0,
          "answer": "She studies English every day.",
          "explanationAr": "الإجابة: studies. مع he/she/it نضيف s للفعل: works, plays. ونضيف es بعد ch/sh/o/x: watches, goes. والفعل المنتهي بحرف ساكن + y يصير ies: studies."
        },
        {
          "id": "sg_110_m3",
          "type": "gap",
          "promptEn": "Complete: My brother ____ football at night.",
          "promptAr": "أكمل الفراغ: (أخوي يتابع كورة بالليل.)",
          "options": [
            "watch",
            "watches",
            "watchs"
          ],
          "correctIndex": 1,
          "answer": "My brother watches football at night.",
          "explanationAr": "الإجابة: watches. مع he/she/it نضيف s للفعل: works, plays. ونضيف es بعد ch/sh/o/x: watches, goes. والفعل المنتهي بحرف ساكن + y يصير ies: studies."
        },
        {
          "id": "sg_110_m4",
          "type": "gap",
          "promptEn": "Complete: He ____ to the gym after work.",
          "promptAr": "أكمل الفراغ: (يروح النادي بعد الدوام.)",
          "options": [
            "go",
            "goes",
            "gos"
          ],
          "correctIndex": 1,
          "answer": "He goes to the gym after work.",
          "explanationAr": "الإجابة: goes. مع he/she/it نضيف s للفعل: works, plays. ونضيف es بعد ch/sh/o/x: watches, goes. والفعل المنتهي بحرف ساكن + y يصير ies: studies."
        }
      ],
      "hard": [
        {
          "id": "sg_110_h1",
          "type": "order",
          "promptEn": "Put the words in order: kabsa / My / on / mother / cooks / Fridays.",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (أمي تطبخ كبسة يوم الجمعة.)",
          "answer": "My mother cooks kabsa on Fridays.",
          "explanationAr": "الترتيب الصحيح: My mother cooks kabsa on Fridays."
        },
        {
          "id": "sg_110_h2",
          "type": "order",
          "promptEn": "Put the words in order: all / sleeps / Our / day. / cat",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (قطتنا تنام طول اليوم.)",
          "answer": "Our cat sleeps all day.",
          "explanationAr": "الترتيب الصحيح: Our cat sleeps all day."
        },
        {
          "id": "sg_110_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: هي تذاكر إنجليزي كل يوم.",
          "answer": "She studies English every day.",
          "explanationAr": "ترجمة مقترحة: She studies English every day."
        },
        {
          "id": "sg_110_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: يروح النادي بعد الدوام.",
          "answer": "He goes to the gym after work.",
          "explanationAr": "ترجمة مقترحة: He goes to the gym after work."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "My mother she cook.",
        "correct": "My mother cooks.",
        "whyAr": "خطآن شائعان: تكرار الضمير ونسيان s."
      },
      {
        "incorrect": "He don't like coffee.",
        "correct": "He doesn't like coffee.",
        "whyAr": "مع he نستخدم doesn't وليس don't."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (المضارع البسيط: روتينك اليومي): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I go to school in 7 o'clock.",
          "I go to school at 7 o'clock."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I go to school at 7 o'clock. — مع الساعة نستخدم at.",
        "fromLessonId": "sg_109"
      },
      {
        "questionAr": "مراجعة (There is / There are: وصف البيت): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "In my house there is four rooms.",
          "In my house there are four rooms."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: In my house there are four rooms. — أكثر من واحد ⇐ there are.",
        "fromLessonId": "sg_107"
      },
      {
        "questionAr": "مراجعة (He is و She is: التحدث عن العائلة): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "My sister is tall.",
          "My sister he is tall."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: My sister is tall. — لا نكرر الضمير بعد الاسم مثل «أختي هي طويلة».",
        "fromLessonId": "sg_104"
      },
      {
        "questionAr": "ما معنى \"new\"؟",
        "questionEn": "What does \"new\" mean?",
        "options": [
          "عم/خال",
          "جديد",
          "ابن/بنت العم أو الخال",
          "واجب"
        ],
        "correctIndex": 1,
        "explanationAr": "\"new\" /nuː/ تعني: جديد. مثال: He has new shoes.",
        "fromLessonId": "sg_108"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (أخوي يتابع كورة بالليل.)",
          "questionEn": "Complete: My brother ____ football at night.",
          "options": [
            "watch",
            "watches",
            "watchs"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: watches. مع he/she/it نضيف s للفعل: works, plays. ونضيف es بعد ch/sh/o/x: watches, goes. والفعل المنتهي بحرف ساكن + y يصير ies: studies."
        },
        {
          "questionAr": "أكمل الفراغ: (يروح النادي بعد الدوام.)",
          "questionEn": "Complete: He ____ to the gym after work.",
          "options": [
            "go",
            "goes",
            "gos"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: goes. مع he/she/it نضيف s للفعل: works, plays. ونضيف es بعد ch/sh/o/x: watches, goes. والفعل المنتهي بحرف ساكن + y يصير ies: studies."
        },
        {
          "questionAr": "ما معنى \"drive\"؟",
          "questionEn": "What does \"drive\" mean?",
          "options": [
            "نادي رياضي",
            "يسوق",
            "بنك",
            "يذاكر/يدرس"
          ],
          "correctIndex": 1,
          "explanationAr": "\"drive\" /draɪv/ تعني: يسوق. مثال: My uncle drives a truck."
        },
        {
          "questionAr": "ما معنى \"bank\"؟",
          "questionEn": "What does \"bank\" mean?",
          "options": [
            "بنك",
            "يشاهد",
            "يسوق",
            "يطبخ"
          ],
          "correctIndex": 0,
          "explanationAr": "\"bank\" /bæŋk/ تعني: بنك. مثال: She works at a bank."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "My mother cooks.",
            "My mother she cook."
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: My mother cooks. — خطآن شائعان: تكرار الضمير ونسيان s."
        }
      ]
    }
  },
  {
    "id": "sg_120_s",
    "pillarId": "grammar",
    "pillarNameAr": "القواعد التحدثية السريعة",
    "pillarNameEn": "Spoken Grammar & Fast Patterns",
    "pillarIcon": "🧠",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "Do و Does: السؤال والنفي في المضارع",
    "titleEn": "Do & Does: Present Simple Questions and Negatives",
    "descAr": "كيف تسأل Do you like...? وDoes he play...? وكيف تنفي بـ don't/doesn't.",
    "descEn": "Ask 'Do you...?/Does he...?' and use don't/doesn't.",
    "speakingGoalAr": "اسأل زميلك خمسة أسئلة عن ما يحب وما يسوي.",
    "speakingGoalEn": "Ask a partner five questions about likes and habits.",
    "keyPattern": {
      "ruleAr": "السؤال: Do + I/you/we/they + فعل؟ و Does + he/she/it + فعل أصلي؟ النفي: don't/doesn't + فعل أصلي (بدون s).",
      "ruleEn": "Questions: Do/Does + subject + base verb? Negatives: don't/doesn't + base verb (no -s).",
      "formula": "Do/Does + subject + base verb ...? | subject + don't/doesn't + base verb"
    },
    "practicalExamples": [
      {
        "en": "Do you like dates?",
        "ar": "تحب التمر؟"
      },
      {
        "en": "Does she speak English?",
        "ar": "هي تتكلم إنجليزي؟"
      },
      {
        "en": "I don't drink coffee.",
        "ar": "ما أشرب قهوة."
      },
      {
        "en": "He doesn't play video games.",
        "ar": "ما يلعب ألعاب فيديو."
      },
      {
        "en": "Where do you live?",
        "ar": "وين تسكن؟"
      },
      {
        "en": "What does your brother do on weekends?",
        "ar": "وش يسوي أخوك في الويكند؟"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Does he plays football?",
        "correct": "Does he play football?",
        "whyAr": "بعد does الفعل يرجع لأصله."
      },
      {
        "incorrect": "You like dates?",
        "correct": "Do you like dates?",
        "whyAr": "في السؤال المكتوب نبدأ بـ do."
      },
      {
        "incorrect": "She don't like milk.",
        "correct": "She doesn't like milk.",
        "whyAr": "she ⇐ doesn't."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اسأل سارة أربعة أسئلة بـ Do you...؟",
      "promptEn": "Ask Sara four 'Do you...?' questions.",
      "saraQuestionAr": "اسألني عن اللي أحبه وأسويه!",
      "saraQuestionEn": "Ask me about my likes and habits!",
      "recommendedResponseEn": "Do you like coffee? Do you play sports? Where do you live? Does your family visit you?"
    },
    "quiz": [
      {
        "questionAr": "أكمل: ___ your mother work?",
        "questionEn": "Complete: ___ your mother work?",
        "options": [
          "Do",
          "Does",
          "Is"
        ],
        "correctIndex": 1,
        "explanationAr": "mother = she ⇐ does."
      },
      {
        "questionAr": "رد قصير: Do you like cats? — No, I ___.",
        "questionEn": "Short answer: No, I ___.",
        "options": [
          "don't",
          "doesn't",
          "not"
        ],
        "correctIndex": 0,
        "explanationAr": "I ⇐ don't."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Does he play football?",
          "Does he plays football?"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Does he play football? — بعد does الفعل يرجع لأصله."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "You like dates?",
          "Do you like dates?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Do you like dates? — في السؤال المكتوب نبدأ بـ do."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "She doesn't like milk.",
          "She don't like milk."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: She doesn't like milk. — she ⇐ doesn't."
      }
    ],
    "whiteboardNotes": {
      "title": "Do & Does: Present Simple Questions and Negatives",
      "pointsAr": [
        "يسأل بـ do/does.",
        "ينفي بـ don't/doesn't.",
        "لا يضيف s بعد does/doesn't.",
        "السؤال: Do + I/you/we/they + فعل؟ و Does + he/she/it + فعل أصلي؟ النفي: don't/doesn't + فعل أصلي (بدون s)."
      ],
      "pointsEn": [
        "Ask questions with do/does.",
        "Make negatives with don't/doesn't.",
        "No -s after does/doesn't.",
        "Questions: Do/Does + subject + base verb? Negatives: don't/doesn't + base verb (no -s)."
      ],
      "chalkHighlight": "Do/Does + subject + base verb ...? | subject + don't/doesn't + base verb"
    },
    "unit": 2,
    "cefr": "A1",
    "objectivesAr": [
      "يسأل بـ do/does.",
      "ينفي بـ don't/doesn't.",
      "لا يضيف s بعد does/doesn't."
    ],
    "objectivesEn": [
      "Ask questions with do/does.",
      "Make negatives with don't/doesn't.",
      "No -s after does/doesn't."
    ],
    "vocabulary": [
      {
        "word": "like",
        "ipa": "/laɪk/",
        "ar": "يحب",
        "exampleEn": "Do you like football?",
        "exampleAr": "تحب الكورة؟"
      },
      {
        "word": "dates",
        "ipa": "/deɪts/",
        "ar": "تمر",
        "exampleEn": "We eat dates with coffee.",
        "exampleAr": "ناكل التمر مع القهوة."
      },
      {
        "word": "speak",
        "ipa": "/spiːk/",
        "ar": "يتكلم",
        "exampleEn": "Do you speak English?",
        "exampleAr": "تتكلم إنجليزي؟"
      },
      {
        "word": "live",
        "ipa": "/lɪv/",
        "ar": "يسكن",
        "exampleEn": "Where do you live?",
        "exampleAr": "وين تسكن؟"
      },
      {
        "word": "play",
        "ipa": "/pleɪ/",
        "ar": "يلعب",
        "exampleEn": "Does he play padel?",
        "exampleAr": "يلعب بادل؟"
      },
      {
        "word": "drink",
        "ipa": "/drɪŋk/",
        "ar": "يشرب",
        "exampleEn": "I don't drink tea.",
        "exampleAr": "ما أشرب شاي."
      },
      {
        "word": "weekend",
        "ipa": "/ˈwiːkɛnd/",
        "ar": "عطلة نهاية الأسبوع",
        "exampleEn": "What do you do on weekends?",
        "exampleAr": "وش تسوي في الويكند؟"
      },
      {
        "word": "swim",
        "ipa": "/swɪm/",
        "ar": "يسبح",
        "exampleEn": "Does she swim?",
        "exampleAr": "تسبح؟"
      },
      {
        "word": "read",
        "ipa": "/riːd/",
        "ar": "يقرأ",
        "exampleEn": "I don't read comics.",
        "exampleAr": "ما أقرأ قصص مصورة."
      },
      {
        "word": "often",
        "ipa": "/ˈɔːfən/",
        "ar": "غالباً/كثيراً",
        "exampleEn": "Do you often travel?",
        "exampleAr": "تسافر كثير؟"
      }
    ],
    "grammarFocus": {
      "ruleAr": "السؤال: Do + I/you/we/they + فعل؟ و Does + he/she/it + فعل أصلي؟ النفي: don't/doesn't + فعل أصلي (بدون s).",
      "ruleEn": "Questions: Do/Does + subject + base verb? Negatives: don't/doesn't + base verb (no -s).",
      "formula": "Do/Does + subject + base verb ...? | subject + don't/doesn't + base verb",
      "examples": [
        {
          "en": "Do you like dates?",
          "ar": "تحب التمر؟"
        },
        {
          "en": "Does she speak English?",
          "ar": "هي تتكلم إنجليزي؟"
        },
        {
          "en": "I don't drink coffee.",
          "ar": "ما أشرب قهوة."
        },
        {
          "en": "He doesn't play video games.",
          "ar": "ما يلعب ألعاب فيديو."
        },
        {
          "en": "Where do you live?",
          "ar": "وين تسكن؟"
        },
        {
          "en": "What does your brother do on weekends?",
          "ar": "وش يسوي أخوك في الويكند؟"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Do you like sports?",
        "ar": "تحب الرياضة؟"
      },
      {
        "speaker": "Student",
        "en": "Yes, I do. I play padel with my cousins.",
        "ar": "إيه. ألعب بادل مع عيال عمي."
      },
      {
        "speaker": "Sara",
        "en": "Does your sister play too?",
        "ar": "وأختك تلعب؟"
      },
      {
        "speaker": "Student",
        "en": "No, she doesn't. She likes drawing.",
        "ar": "لا، هي تحب الرسم."
      },
      {
        "speaker": "Sara",
        "en": "Do you drink coffee?",
        "ar": "تشرب قهوة؟"
      },
      {
        "speaker": "Student",
        "en": "I don't drink coffee, but I love Saudi tea with mint.",
        "ar": "ما أشرب قهوة، بس أحب الشاي بالنعناع."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Do you like sports?\nStudent: Yes, I do. I play padel with my cousins.\nSara: Does your sister play too?\nStudent: No, she doesn't. She likes drawing.\nSara: Do you drink coffee?\nStudent: I don't drink coffee, but I love Saudi tea with mint.",
      "questions": [
        {
          "questionAr": "وش رياضة الطالب؟",
          "questionEn": "What sport does the student play?",
          "options": [
            "football",
            "padel",
            "tennis"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: padel"
        },
        {
          "questionAr": "وش تحب الأخت؟",
          "questionEn": "What does the sister like?",
          "options": [
            "drawing",
            "sports",
            "cooking"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: drawing"
        },
        {
          "questionAr": "يشرب قهوة؟",
          "questionEn": "Does the student drink coffee?",
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
      "focus": "Weak 'do you' /dəjə/ in fast speech",
      "items": [
        "Do you like...? /dəjə laɪk/",
        "Does she...? /dəz ʃi/",
        "doesn't /ˈdʌzənt/"
      ],
      "tipAr": "في الكلام السريع Do you تصير «دَيا»: Do you like it? = «دَيا لايكِت»."
    },
    "exercises": {
      "easy": [
        {
          "id": "sg_120_s_e1",
          "type": "meaning",
          "promptEn": "What does \"like\" mean?",
          "promptAr": "ما معنى \"like\"؟",
          "options": [
            "عطلة نهاية الأسبوع",
            "تمر",
            "يحب",
            "يتكلم"
          ],
          "correctIndex": 2,
          "answer": "يحب",
          "explanationAr": "\"like\" /laɪk/ تعني: يحب. مثال: Do you like football?"
        },
        {
          "id": "sg_120_s_e2",
          "type": "meaning",
          "promptEn": "What does \"dates\" mean?",
          "promptAr": "ما معنى \"dates\"؟",
          "options": [
            "تمر",
            "يقرأ",
            "يلعب",
            "يسبح"
          ],
          "correctIndex": 0,
          "answer": "تمر",
          "explanationAr": "\"dates\" /deɪts/ تعني: تمر. مثال: We eat dates with coffee."
        },
        {
          "id": "sg_120_s_e3",
          "type": "meaning",
          "promptEn": "What does \"speak\" mean?",
          "promptAr": "ما معنى \"speak\"؟",
          "options": [
            "يسبح",
            "يسكن",
            "عطلة نهاية الأسبوع",
            "يتكلم"
          ],
          "correctIndex": 3,
          "answer": "يتكلم",
          "explanationAr": "\"speak\" /spiːk/ تعني: يتكلم. مثال: Do you speak English?"
        },
        {
          "id": "sg_120_s_e4",
          "type": "meaning",
          "promptEn": "What does \"live\" mean?",
          "promptAr": "ما معنى \"live\"؟",
          "options": [
            "يحب",
            "يسكن",
            "غالباً/كثيراً",
            "تمر"
          ],
          "correctIndex": 1,
          "answer": "يسكن",
          "explanationAr": "\"live\" /lɪv/ تعني: يسكن. مثال: Where do you live?"
        }
      ],
      "medium": [
        {
          "id": "sg_120_s_m1",
          "type": "gap",
          "promptEn": "Complete: ____ you like dates?",
          "promptAr": "أكمل الفراغ: (تحب التمر؟)",
          "options": [
            "Do",
            "Are",
            "Does"
          ],
          "correctIndex": 0,
          "answer": "Do you like dates?",
          "explanationAr": "الإجابة: Do. السؤال: Do + I/you/we/they + فعل؟ و Does + he/she/it + فعل أصلي؟ النفي: don't/doesn't + فعل أصلي (بدون s)."
        },
        {
          "id": "sg_120_s_m2",
          "type": "gap",
          "promptEn": "Complete: ____ she speak English?",
          "promptAr": "أكمل الفراغ: (هي تتكلم إنجليزي؟)",
          "options": [
            "Does",
            "Is",
            "Do"
          ],
          "correctIndex": 0,
          "answer": "Does she speak English?",
          "explanationAr": "الإجابة: Does. السؤال: Do + I/you/we/they + فعل؟ و Does + he/she/it + فعل أصلي؟ النفي: don't/doesn't + فعل أصلي (بدون s)."
        },
        {
          "id": "sg_120_s_m3",
          "type": "gap",
          "promptEn": "Complete: I ____ drink coffee.",
          "promptAr": "أكمل الفراغ: (ما أشرب قهوة.)",
          "options": [
            "don't",
            "doesn't",
            "not"
          ],
          "correctIndex": 0,
          "answer": "I don't drink coffee.",
          "explanationAr": "الإجابة: don't. السؤال: Do + I/you/we/they + فعل؟ و Does + he/she/it + فعل أصلي؟ النفي: don't/doesn't + فعل أصلي (بدون s)."
        },
        {
          "id": "sg_120_s_m4",
          "type": "gap",
          "promptEn": "Complete: He doesn't ____ video games.",
          "promptAr": "أكمل الفراغ: (ما يلعب ألعاب فيديو.)",
          "options": [
            "play",
            "playing",
            "plays"
          ],
          "correctIndex": 0,
          "answer": "He doesn't play video games.",
          "explanationAr": "الإجابة: play. السؤال: Do + I/you/we/they + فعل؟ و Does + he/she/it + فعل أصلي؟ النفي: don't/doesn't + فعل أصلي (بدون s)."
        }
      ],
      "hard": [
        {
          "id": "sg_120_s_h1",
          "type": "order",
          "promptEn": "Put the words in order: do / Where / you / live?",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (وين تسكن؟)",
          "answer": "Where do you live?",
          "explanationAr": "الترتيب الصحيح: Where do you live?"
        },
        {
          "id": "sg_120_s_h2",
          "type": "order",
          "promptEn": "Put the words in order: do / on / your / weekends? / does / What / brother",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (وش يسوي أخوك في الويكند؟)",
          "answer": "What does your brother do on weekends?",
          "explanationAr": "الترتيب الصحيح: What does your brother do on weekends?"
        },
        {
          "id": "sg_120_s_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: هي تتكلم إنجليزي؟",
          "answer": "Does she speak English?",
          "explanationAr": "ترجمة مقترحة: Does she speak English?"
        },
        {
          "id": "sg_120_s_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: ما يلعب ألعاب فيديو.",
          "answer": "He doesn't play video games.",
          "explanationAr": "ترجمة مقترحة: He doesn't play video games."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Why you don't come?",
        "correct": "Why don't you come?",
        "whyAr": "في سؤال wh الترتيب: Why + don't + you."
      },
      {
        "incorrect": "Do you can swim?",
        "correct": "Can you swim?",
        "whyAr": "لا نجمع do مع can."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (He works / She studies: حرف s مع الغائب): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "She studys at night.",
          "She studies at night."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: She studies at night. — حرف ساكن + y ⇐ ies.",
        "fromLessonId": "sg_110"
      },
      {
        "questionAr": "مراجعة (Have و Has: أشياؤك وعائلتك): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "She has a phone.",
          "She have a phone."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: She has a phone. — مع she/he/it نستخدم has.",
        "fromLessonId": "sg_108"
      },
      {
        "questionAr": "مراجعة (النفي والسؤال مع be: Is he...? / I'm not): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "You are hungry?",
          "Are you hungry?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Are you hungry? — في السؤال المكتوب نقدم are قبل you.",
        "fromLessonId": "sg_105"
      },
      {
        "questionAr": "ما معنى \"then\"؟",
        "questionEn": "What does \"then\" mean?",
        "options": [
          "بدري",
          "عشاء",
          "يصلي",
          "بعدين"
        ],
        "correctIndex": 3,
        "explanationAr": "\"then\" /ðɛn/ تعني: بعدين. مثال: I eat, then I go to school.",
        "fromLessonId": "sg_109"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (ما أشرب قهوة.)",
          "questionEn": "Complete: I ____ drink coffee.",
          "options": [
            "don't",
            "doesn't",
            "not"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: don't. السؤال: Do + I/you/we/they + فعل؟ و Does + he/she/it + فعل أصلي؟ النفي: don't/doesn't + فعل أصلي (بدون s)."
        },
        {
          "questionAr": "أكمل الفراغ: (ما يلعب ألعاب فيديو.)",
          "questionEn": "Complete: He doesn't ____ video games.",
          "options": [
            "play",
            "playing",
            "plays"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: play. السؤال: Do + I/you/we/they + فعل؟ و Does + he/she/it + فعل أصلي؟ النفي: don't/doesn't + فعل أصلي (بدون s)."
        },
        {
          "questionAr": "ما معنى \"play\"؟",
          "questionEn": "What does \"play\" mean?",
          "options": [
            "يتكلم",
            "يشرب",
            "يلعب",
            "غالباً/كثيراً"
          ],
          "correctIndex": 2,
          "explanationAr": "\"play\" /pleɪ/ تعني: يلعب. مثال: Does he play padel?"
        },
        {
          "questionAr": "ما معنى \"drink\"؟",
          "questionEn": "What does \"drink\" mean?",
          "options": [
            "يقرأ",
            "عطلة نهاية الأسبوع",
            "تمر",
            "يشرب"
          ],
          "correctIndex": 3,
          "explanationAr": "\"drink\" /drɪŋk/ تعني: يشرب. مثال: I don't drink tea."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Why you don't come?",
            "Why don't you come?"
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: Why don't you come? — في سؤال wh الترتيب: Why + don't + you."
        }
      ]
    }
  },
  {
    "id": "sg_102",
    "pillarId": "grammar",
    "pillarNameAr": "القواعد التحدثية السريعة",
    "pillarNameEn": "Spoken Grammar & Fast Patterns",
    "pillarIcon": "🧠",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "Always / usually / never: كم مرة تسويها؟",
    "titleEn": "Adverbs of Frequency: How Often?",
    "descAr": "عبّر عن كم مرة تسوي الشيء: دايماً، عادة، أحياناً، أبداً — ومكانها في الجملة.",
    "descEn": "Say how often with always/usually/sometimes/never — and where they go.",
    "speakingGoalAr": "صف خمس عادات عندك مع كلمة تكرار لكل وحدة.",
    "speakingGoalEn": "Describe five habits each with a frequency word.",
    "keyPattern": {
      "ruleAr": "كلمة التكرار تأتي قبل الفعل العادي، وبعد فعل be: I always walk / I'm never late.",
      "ruleEn": "Frequency adverbs go before the main verb but after be.",
      "formula": "subject + always/usually/sometimes/never + verb | subject + be + adverb"
    },
    "practicalExamples": [
      {
        "en": "I always pray on time.",
        "ar": "دايماً أصلي في الوقت."
      },
      {
        "en": "We usually eat out on Thursday.",
        "ar": "عادةً نتعشى برا يوم الخميس."
      },
      {
        "en": "She is never late for school.",
        "ar": "هي أبداً ما تتأخر عن المدرسة."
      },
      {
        "en": "He sometimes plays PlayStation.",
        "ar": "أحياناً يلعب بلايستيشن."
      },
      {
        "en": "How often do you go to the beach?",
        "ar": "كم مرة تروح البحر؟"
      },
      {
        "en": "I hardly ever drink soda.",
        "ar": "نادراً أشرب مشروبات غازية."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "I go always to school by bus.",
        "correct": "I always go to school by bus.",
        "whyAr": "كلمة التكرار قبل الفعل الأساسي."
      },
      {
        "incorrect": "She always is happy.",
        "correct": "She is always happy.",
        "whyAr": "مع be تأتي بعده."
      },
      {
        "incorrect": "I don't never eat fish.",
        "correct": "I never eat fish.",
        "whyAr": "never نفي بحد ذاتها؛ لا نجمعها مع don't."
      }
    ],
    "speakingChallenge": {
      "promptAr": "أخبر سارة عن عاداتك باستخدام always/usually/never.",
      "promptEn": "Tell Sara your habits with always/usually/never.",
      "saraQuestionAr": "وش تسوي دايماً؟ ووش ما تسويه أبداً؟",
      "saraQuestionEn": "What do you always do? What do you never do?",
      "recommendedResponseEn": "I always pray Fajr. I usually walk in the evening. I sometimes play football. I never drink coffee at night."
    },
    "quiz": [
      {
        "questionAr": "رتب: late / is / never / he",
        "questionEn": "Order: late / is / never / he",
        "options": [
          "He never is late.",
          "He is never late.",
          "Never he is late."
        ],
        "correctIndex": 1,
        "explanationAr": "بعد be ⇐ He is never late."
      },
      {
        "questionAr": "أي كلمة تعني 0%؟",
        "questionEn": "Which word means 0%?",
        "options": [
          "rarely",
          "sometimes",
          "never"
        ],
        "correctIndex": 2,
        "explanationAr": "never = أبداً."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I always go to school by bus.",
          "I go always to school by bus."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I always go to school by bus. — كلمة التكرار قبل الفعل الأساسي."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "She is always happy.",
          "She always is happy."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: She is always happy. — مع be تأتي بعده."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I don't never eat fish.",
          "I never eat fish."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I never eat fish. — never نفي بحد ذاتها؛ لا نجمعها مع don't."
      }
    ],
    "whiteboardNotes": {
      "title": "Adverbs of Frequency: How Often?",
      "pointsAr": [
        "يرتب كلمات التكرار من 100% إلى 0%.",
        "يضع الكلمة في مكانها الصحيح.",
        "يسأل How often...?",
        "كلمة التكرار تأتي قبل الفعل العادي، وبعد فعل be: I always walk / I'm never late."
      ],
      "pointsEn": [
        "Order adverbs from 100% to 0%.",
        "Place adverbs correctly.",
        "Ask 'How often...?'.",
        "Frequency adverbs go before the main verb but after be."
      ],
      "chalkHighlight": "subject + always/usually/sometimes/never + verb | subject + be + adverb"
    },
    "unit": 2,
    "cefr": "A1",
    "objectivesAr": [
      "يرتب كلمات التكرار من 100% إلى 0%.",
      "يضع الكلمة في مكانها الصحيح.",
      "يسأل How often...?"
    ],
    "objectivesEn": [
      "Order adverbs from 100% to 0%.",
      "Place adverbs correctly.",
      "Ask 'How often...?'."
    ],
    "vocabulary": [
      {
        "word": "always",
        "ipa": "/ˈɔːlweɪz/",
        "ar": "دائماً (100%)",
        "exampleEn": "I always brush my teeth.",
        "exampleAr": "دايماً أنظف أسناني."
      },
      {
        "word": "usually",
        "ipa": "/ˈjuːʒuəli/",
        "ar": "عادةً (80%)",
        "exampleEn": "We usually visit Grandma.",
        "exampleAr": "عادة نزور جدتي."
      },
      {
        "word": "often",
        "ipa": "/ˈɔːfən/",
        "ar": "غالباً (60%)",
        "exampleEn": "I often read before bed.",
        "exampleAr": "غالباً أقرأ قبل النوم."
      },
      {
        "word": "sometimes",
        "ipa": "/ˈsʌmtaɪmz/",
        "ar": "أحياناً (40%)",
        "exampleEn": "He sometimes cooks.",
        "exampleAr": "أحياناً يطبخ."
      },
      {
        "word": "rarely",
        "ipa": "/ˈrɛrli/",
        "ar": "نادراً (10%)",
        "exampleEn": "I rarely watch TV.",
        "exampleAr": "نادراً أشوف تلفزيون."
      },
      {
        "word": "never",
        "ipa": "/ˈnɛvər/",
        "ar": "أبداً (0%)",
        "exampleEn": "She never eats meat.",
        "exampleAr": "ما تاكل لحم أبداً."
      },
      {
        "word": "on time",
        "ipa": "/ɑːn taɪm/",
        "ar": "في الوقت",
        "exampleEn": "I'm always on time.",
        "exampleAr": "دايماً أجي في الوقت."
      },
      {
        "word": "eat out",
        "ipa": "/iːt aʊt/",
        "ar": "ياكل برا (مطعم)",
        "exampleEn": "We eat out on weekends.",
        "exampleAr": "ناكل برا في الويكند."
      },
      {
        "word": "beach",
        "ipa": "/biːtʃ/",
        "ar": "شاطئ/بحر",
        "exampleEn": "We go to the beach in winter.",
        "exampleAr": "نروح البحر في الشتاء."
      },
      {
        "word": "brush",
        "ipa": "/brʌʃ/",
        "ar": "ينظف بالفرشاة",
        "exampleEn": "Brush your teeth!",
        "exampleAr": "نظف أسنانك!"
      }
    ],
    "grammarFocus": {
      "ruleAr": "كلمة التكرار تأتي قبل الفعل العادي، وبعد فعل be: I always walk / I'm never late.",
      "ruleEn": "Frequency adverbs go before the main verb but after be.",
      "formula": "subject + always/usually/sometimes/never + verb | subject + be + adverb",
      "examples": [
        {
          "en": "I always pray on time.",
          "ar": "دايماً أصلي في الوقت."
        },
        {
          "en": "We usually eat out on Thursday.",
          "ar": "عادةً نتعشى برا يوم الخميس."
        },
        {
          "en": "She is never late for school.",
          "ar": "هي أبداً ما تتأخر عن المدرسة."
        },
        {
          "en": "He sometimes plays PlayStation.",
          "ar": "أحياناً يلعب بلايستيشن."
        },
        {
          "en": "How often do you go to the beach?",
          "ar": "كم مرة تروح البحر؟"
        },
        {
          "en": "I hardly ever drink soda.",
          "ar": "نادراً أشرب مشروبات غازية."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "How often do you eat out?",
        "ar": "كم مرة تاكلون برا؟"
      },
      {
        "speaker": "Student",
        "en": "We usually eat out on Thursday night.",
        "ar": "عادةً ليلة الجمعة (الخميس بالليل)."
      },
      {
        "speaker": "Sara",
        "en": "Do you ever cook?",
        "ar": "تطبخ أنت أحياناً؟"
      },
      {
        "speaker": "Student",
        "en": "I sometimes make eggs, but I never cook rice!",
        "ar": "أحياناً أسوي بيض، بس عمري ما طبخت رز!"
      },
      {
        "speaker": "Sara",
        "en": "Are you always on time for school?",
        "ar": "دايماً توصل المدرسة في الوقت؟"
      },
      {
        "speaker": "Student",
        "en": "Yes, I'm always on time. My dad hates being late.",
        "ar": "إيه دايماً. أبوي يكره التأخير."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: How often do you eat out?\nStudent: We usually eat out on Thursday night.\nSara: Do you ever cook?\nStudent: I sometimes make eggs, but I never cook rice!\nSara: Are you always on time for school?\nStudent: Yes, I'm always on time. My dad hates being late.",
      "questions": [
        {
          "questionAr": "متى عادة ياكلون برا؟",
          "questionEn": "When does the family usually eat out?",
          "options": [
            "Friday morning",
            "Thursday night",
            "Saturday"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: Thursday night"
        },
        {
          "questionAr": "وش ما يطبخ أبداً؟",
          "questionEn": "What does the student never cook?",
          "options": [
            "eggs",
            "rice",
            "pasta"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: rice"
        },
        {
          "questionAr": "مين يكره التأخير؟",
          "questionEn": "Who hates being late?",
          "options": [
            "his mother",
            "his teacher",
            "his dad"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: his dad"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Word stress: ALways, USually, SOMEtimes",
      "items": [
        "ALways /ˈɔːlweɪz/",
        "USually /ˈjuːʒuəli/",
        "SOMEtimes /ˈsʌmtaɪmz/"
      ],
      "tipAr": "usually فيها صوت ʒ مثل «ج» الشامية الخفيفة: «يوجوالي»، مو «يوزوالي»."
    },
    "exercises": {
      "easy": [
        {
          "id": "sg_102_e1",
          "type": "meaning",
          "promptEn": "What does \"always\" mean?",
          "promptAr": "ما معنى \"always\"؟",
          "options": [
            "ينظف بالفرشاة",
            "دائماً (100%)",
            "أبداً (0%)",
            "شاطئ/بحر"
          ],
          "correctIndex": 1,
          "answer": "دائماً (100%)",
          "explanationAr": "\"always\" /ˈɔːlweɪz/ تعني: دائماً (100%). مثال: I always brush my teeth."
        },
        {
          "id": "sg_102_e2",
          "type": "meaning",
          "promptEn": "What does \"usually\" mean?",
          "promptAr": "ما معنى \"usually\"؟",
          "options": [
            "غالباً (60%)",
            "عادةً (80%)",
            "أحياناً (40%)",
            "دائماً (100%)"
          ],
          "correctIndex": 1,
          "answer": "عادةً (80%)",
          "explanationAr": "\"usually\" /ˈjuːʒuəli/ تعني: عادةً (80%). مثال: We usually visit Grandma."
        },
        {
          "id": "sg_102_e3",
          "type": "meaning",
          "promptEn": "What does \"often\" mean?",
          "promptAr": "ما معنى \"often\"؟",
          "options": [
            "غالباً (60%)",
            "في الوقت",
            "نادراً (10%)",
            "دائماً (100%)"
          ],
          "correctIndex": 0,
          "answer": "غالباً (60%)",
          "explanationAr": "\"often\" /ˈɔːfən/ تعني: غالباً (60%). مثال: I often read before bed."
        },
        {
          "id": "sg_102_e4",
          "type": "meaning",
          "promptEn": "What does \"sometimes\" mean?",
          "promptAr": "ما معنى \"sometimes\"؟",
          "options": [
            "عادةً (80%)",
            "في الوقت",
            "نادراً (10%)",
            "أحياناً (40%)"
          ],
          "correctIndex": 3,
          "answer": "أحياناً (40%)",
          "explanationAr": "\"sometimes\" /ˈsʌmtaɪmz/ تعني: أحياناً (40%). مثال: He sometimes cooks."
        }
      ],
      "medium": [
        {
          "id": "sg_102_m1",
          "type": "gap",
          "promptEn": "Complete: I ____ pray on time.",
          "promptAr": "أكمل الفراغ: (دايماً أصلي في الوقت.)",
          "options": [
            "sometimes",
            "always",
            "never"
          ],
          "correctIndex": 1,
          "answer": "I always pray on time.",
          "explanationAr": "الإجابة: always. كلمة التكرار تأتي قبل الفعل العادي، وبعد فعل be: I always walk / I'm never late."
        },
        {
          "id": "sg_102_m2",
          "type": "gap",
          "promptEn": "Complete: We ____ eat out on Thursday.",
          "promptAr": "أكمل الفراغ: (عادةً نتعشى برا يوم الخميس.)",
          "options": [
            "use",
            "always usually",
            "usually"
          ],
          "correctIndex": 2,
          "answer": "We usually eat out on Thursday.",
          "explanationAr": "الإجابة: usually. كلمة التكرار تأتي قبل الفعل العادي، وبعد فعل be: I always walk / I'm never late."
        },
        {
          "id": "sg_102_m3",
          "type": "gap",
          "promptEn": "Complete: She is ____ late for school.",
          "promptAr": "أكمل الفراغ: (هي أبداً ما تتأخر عن المدرسة.)",
          "options": [
            "not",
            "never",
            "ever"
          ],
          "correctIndex": 1,
          "answer": "She is never late for school.",
          "explanationAr": "الإجابة: never. كلمة التكرار تأتي قبل الفعل العادي، وبعد فعل be: I always walk / I'm never late."
        },
        {
          "id": "sg_102_m4",
          "type": "gap",
          "promptEn": "Complete: He ____ plays PlayStation.",
          "promptAr": "أكمل الفراغ: (أحياناً يلعب بلايستيشن.)",
          "options": [
            "sometime",
            "sometimes",
            "some"
          ],
          "correctIndex": 1,
          "answer": "He sometimes plays PlayStation.",
          "explanationAr": "الإجابة: sometimes. كلمة التكرار تأتي قبل الفعل العادي، وبعد فعل be: I always walk / I'm never late."
        }
      ],
      "hard": [
        {
          "id": "sg_102_h1",
          "type": "order",
          "promptEn": "Put the words in order: to / do / beach? / you / often / go / the / How",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (كم مرة تروح البحر؟)",
          "answer": "How often do you go to the beach?",
          "explanationAr": "الترتيب الصحيح: How often do you go to the beach?"
        },
        {
          "id": "sg_102_h2",
          "type": "order",
          "promptEn": "Put the words in order: ever / drink / soda. / I / hardly",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (نادراً أشرب مشروبات غازية.)",
          "answer": "I hardly ever drink soda.",
          "explanationAr": "الترتيب الصحيح: I hardly ever drink soda."
        },
        {
          "id": "sg_102_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: عادةً نتعشى برا يوم الخميس.",
          "answer": "We usually eat out on Thursday.",
          "explanationAr": "ترجمة مقترحة: We usually eat out on Thursday."
        },
        {
          "id": "sg_102_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أحياناً يلعب بلايستيشن.",
          "answer": "He sometimes plays PlayStation.",
          "explanationAr": "ترجمة مقترحة: He sometimes plays PlayStation."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Always I go to the mosque.",
        "correct": "I always go to the mosque.",
        "whyAr": "العربي يقدّم «دائماً»، والإنجليزي يضعها قبل الفعل."
      },
      {
        "incorrect": "I never not eat fish.",
        "correct": "I never eat fish.",
        "whyAr": "نفي مزدوج غير صحيح."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (Do و Does: السؤال والنفي في المضارع): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Do you like dates?",
          "You like dates?"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Do you like dates? — في السؤال المكتوب نبدأ بـ do.",
        "fromLessonId": "sg_120_s"
      },
      {
        "questionAr": "مراجعة (المضارع البسيط: روتينك اليومي): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I wake up at six.",
          "I am wake up at six."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I wake up at six. — لا نضع am قبل الفعل في المضارع البسيط.",
        "fromLessonId": "sg_109"
      },
      {
        "questionAr": "مراجعة (This / That / These / Those في الفصل والبيت): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "This are my books.",
          "These are my books."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: These are my books. — الجمع يحتاج these و are.",
        "fromLessonId": "sg_106"
      },
      {
        "questionAr": "ما معنى \"hospital\"؟",
        "questionEn": "What does \"hospital\" mean?",
        "options": [
          "يذاكر/يدرس",
          "بنك",
          "يشتغل",
          "مستشفى"
        ],
        "correctIndex": 3,
        "explanationAr": "\"hospital\" /ˈhɑːspɪtəl/ تعني: مستشفى. مثال: My aunt works in a hospital.",
        "fromLessonId": "sg_110"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (هي أبداً ما تتأخر عن المدرسة.)",
          "questionEn": "Complete: She is ____ late for school.",
          "options": [
            "not",
            "never",
            "ever"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: never. كلمة التكرار تأتي قبل الفعل العادي، وبعد فعل be: I always walk / I'm never late."
        },
        {
          "questionAr": "أكمل الفراغ: (أحياناً يلعب بلايستيشن.)",
          "questionEn": "Complete: He ____ plays PlayStation.",
          "options": [
            "sometime",
            "sometimes",
            "some"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: sometimes. كلمة التكرار تأتي قبل الفعل العادي، وبعد فعل be: I always walk / I'm never late."
        },
        {
          "questionAr": "ما معنى \"rarely\"؟",
          "questionEn": "What does \"rarely\" mean?",
          "options": [
            "ينظف بالفرشاة",
            "دائماً (100%)",
            "نادراً (10%)",
            "شاطئ/بحر"
          ],
          "correctIndex": 2,
          "explanationAr": "\"rarely\" /ˈrɛrli/ تعني: نادراً (10%). مثال: I rarely watch TV."
        },
        {
          "questionAr": "ما معنى \"never\"؟",
          "questionEn": "What does \"never\" mean?",
          "options": [
            "أبداً (0%)",
            "عادةً (80%)",
            "شاطئ/بحر",
            "ينظف بالفرشاة"
          ],
          "correctIndex": 0,
          "explanationAr": "\"never\" /ˈnɛvər/ تعني: أبداً (0%). مثال: She never eats meat."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Always I go to the mosque.",
            "I always go to the mosque."
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: I always go to the mosque. — العربي يقدّم «دائماً»، والإنجليزي يضعها قبل الفعل."
        }
      ]
    }
  },
  {
    "id": "sg_111",
    "pillarId": "grammar",
    "pillarNameAr": "القواعد التحدثية السريعة",
    "pillarNameEn": "Spoken Grammar & Fast Patterns",
    "pillarIcon": "🧠",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "Can و Can't: قدراتك",
    "titleEn": "Can & Can't: Abilities",
    "descAr": "قل وش تقدر تسوي ووش ما تقدر، واسأل الآخرين عن مهاراتهم.",
    "descEn": "Say what you can and can't do and ask about skills.",
    "speakingGoalAr": "اذكر ثلاث مهارات تقدر عليها وثنتين ما تقدر عليها.",
    "speakingGoalEn": "Name three things you can do and two you can't.",
    "keyPattern": {
      "ruleAr": "can + فعل أصلي لكل الضمائر، بدون to وبدون s. النفي can't، والسؤال Can you...?",
      "ruleEn": "can + base verb for all subjects (no to, no -s). Negative can't; question Can you...?",
      "formula": "subject + can/can't + base verb | Can + subject + verb?"
    },
    "practicalExamples": [
      {
        "en": "I can swim.",
        "ar": "أقدر أسبح."
      },
      {
        "en": "My sister can't ride a bike.",
        "ar": "أختي ما تقدر تسوق سيكل."
      },
      {
        "en": "Can you speak French?",
        "ar": "تقدر تتكلم فرنسي؟"
      },
      {
        "en": "He can draw very well.",
        "ar": "يقدر يرسم زين مرة."
      },
      {
        "en": "Yes, I can. No, I can't.",
        "ar": "إيه أقدر. لا ما أقدر."
      },
      {
        "en": "Can you help me, please?",
        "ar": "ممكن تساعدني لو سمحت؟"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "I can to swim.",
        "correct": "I can swim.",
        "whyAr": "لا نضع to بعد can."
      },
      {
        "incorrect": "She cans cook.",
        "correct": "She can cook.",
        "whyAr": "can لا تأخذ s أبداً."
      },
      {
        "incorrect": "He can plays football.",
        "correct": "He can play football.",
        "whyAr": "بعد can الفعل أصلي بدون s."
      }
    ],
    "speakingChallenge": {
      "promptAr": "أخبر سارة عن مهاراتك.",
      "promptEn": "Tell Sara about your skills.",
      "saraQuestionAr": "وش تقدر تسوي؟ ووش ما تقدر؟",
      "saraQuestionEn": "What can you do? What can't you do?",
      "recommendedResponseEn": "I can swim and I can draw. I can type fast. I can't cook and I can't ride a horse."
    },
    "quiz": [
      {
        "questionAr": "أكمل: ___ your brother play chess?",
        "questionEn": "Complete: ___ your brother play chess?",
        "options": [
          "Does",
          "Can",
          "Is"
        ],
        "correctIndex": 1,
        "explanationAr": "سؤال القدرة: Can + فاعل + فعل."
      },
      {
        "questionAr": "الجملة الصحيحة:",
        "questionEn": "Correct sentence:",
        "options": [
          "She can speaks English.",
          "She can speak English.",
          "She cans speak English."
        ],
        "correctIndex": 1,
        "explanationAr": "can + فعل أصلي."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I can swim.",
          "I can to swim."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I can swim. — لا نضع to بعد can."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "She cans cook.",
          "She can cook."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: She can cook. — can لا تأخذ s أبداً."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "He can play football.",
          "He can plays football."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: He can play football. — بعد can الفعل أصلي بدون s."
      }
    ],
    "whiteboardNotes": {
      "title": "Can & Can't: Abilities",
      "pointsAr": [
        "يعبر عن القدرة بـ can.",
        "يسأل Can you...? ويرد بإجابة قصيرة.",
        "يميز نطق can و can't.",
        "can + فعل أصلي لكل الضمائر، بدون to وبدون s. النفي can't، والسؤال Can you...?"
      ],
      "pointsEn": [
        "Express ability with can.",
        "Ask 'Can you...?' with short answers.",
        "Hear the difference between can and can't.",
        "can + base verb for all subjects (no to, no -s). Negative can't; question Can you...?"
      ],
      "chalkHighlight": "subject + can/can't + base verb | Can + subject + verb?"
    },
    "unit": 3,
    "cefr": "A1",
    "objectivesAr": [
      "يعبر عن القدرة بـ can.",
      "يسأل Can you...? ويرد بإجابة قصيرة.",
      "يميز نطق can و can't."
    ],
    "objectivesEn": [
      "Express ability with can.",
      "Ask 'Can you...?' with short answers.",
      "Hear the difference between can and can't."
    ],
    "vocabulary": [
      {
        "word": "swim",
        "ipa": "/swɪm/",
        "ar": "يسبح",
        "exampleEn": "I can swim.",
        "exampleAr": "أقدر أسبح."
      },
      {
        "word": "ride",
        "ipa": "/raɪd/",
        "ar": "يركب/يسوق (دراجة/خيل)",
        "exampleEn": "Can you ride a horse?",
        "exampleAr": "تقدر تركب خيل؟"
      },
      {
        "word": "draw",
        "ipa": "/drɔː/",
        "ar": "يرسم",
        "exampleEn": "She can draw.",
        "exampleAr": "تقدر ترسم."
      },
      {
        "word": "cook",
        "ipa": "/kʊk/",
        "ar": "يطبخ",
        "exampleEn": "I can't cook.",
        "exampleAr": "ما أقدر أطبخ."
      },
      {
        "word": "sing",
        "ipa": "/sɪŋ/",
        "ar": "يغني/ينشد",
        "exampleEn": "He can sing nasheeds.",
        "exampleAr": "يقدر ينشد."
      },
      {
        "word": "type",
        "ipa": "/taɪp/",
        "ar": "يكتب بالكيبورد",
        "exampleEn": "I can type fast.",
        "exampleAr": "أكتب بسرعة على الكيبورد."
      },
      {
        "word": "help",
        "ipa": "/hɛlp/",
        "ar": "يساعد",
        "exampleEn": "Can you help me?",
        "exampleAr": "تساعدني؟"
      },
      {
        "word": "horse",
        "ipa": "/hɔːrs/",
        "ar": "حصان",
        "exampleEn": "My uncle can ride a horse.",
        "exampleAr": "عمي يقدر يركب خيل."
      },
      {
        "word": "well",
        "ipa": "/wɛl/",
        "ar": "بشكل جيد",
        "exampleEn": "She speaks English well.",
        "exampleAr": "تتكلم إنجليزي زين."
      },
      {
        "word": "fast",
        "ipa": "/fæst/",
        "ar": "بسرعة",
        "exampleEn": "He can run fast.",
        "exampleAr": "يركض بسرعة."
      }
    ],
    "grammarFocus": {
      "ruleAr": "can + فعل أصلي لكل الضمائر، بدون to وبدون s. النفي can't، والسؤال Can you...?",
      "ruleEn": "can + base verb for all subjects (no to, no -s). Negative can't; question Can you...?",
      "formula": "subject + can/can't + base verb | Can + subject + verb?",
      "examples": [
        {
          "en": "I can swim.",
          "ar": "أقدر أسبح."
        },
        {
          "en": "My sister can't ride a bike.",
          "ar": "أختي ما تقدر تسوق سيكل."
        },
        {
          "en": "Can you speak French?",
          "ar": "تقدر تتكلم فرنسي؟"
        },
        {
          "en": "He can draw very well.",
          "ar": "يقدر يرسم زين مرة."
        },
        {
          "en": "Yes, I can. No, I can't.",
          "ar": "إيه أقدر. لا ما أقدر."
        },
        {
          "en": "Can you help me, please?",
          "ar": "ممكن تساعدني لو سمحت؟"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Can you swim?",
        "ar": "تعرف تسبح؟"
      },
      {
        "speaker": "Student",
        "en": "Yes, I can. I swim at the club.",
        "ar": "إيه. أسبح في النادي."
      },
      {
        "speaker": "Sara",
        "en": "Can you ride a horse?",
        "ar": "تعرف تركب خيل؟"
      },
      {
        "speaker": "Student",
        "en": "No, I can't, but my uncle can.",
        "ar": "لا، بس عمي يعرف."
      },
      {
        "speaker": "Sara",
        "en": "What else can you do?",
        "ar": "وش تعرف تسوي بعد؟"
      },
      {
        "speaker": "Student",
        "en": "I can draw cartoons and I can type very fast.",
        "ar": "أرسم كرتون وأكتب على الكيبورد بسرعة."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Can you swim?\nStudent: Yes, I can. I swim at the club.\nSara: Can you ride a horse?\nStudent: No, I can't, but my uncle can.\nSara: What else can you do?\nStudent: I can draw cartoons and I can type very fast.",
      "questions": [
        {
          "questionAr": "وين يسبح؟",
          "questionEn": "Where does the student swim?",
          "options": [
            "at the beach",
            "at the club",
            "at home"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: at the club"
        },
        {
          "questionAr": "مين يركب خيل؟",
          "questionEn": "Who can ride a horse?",
          "options": [
            "the student",
            "his uncle",
            "his sister"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: his uncle"
        },
        {
          "questionAr": "وش يرسم؟",
          "questionEn": "What can the student draw?",
          "options": [
            "cartoons",
            "horses",
            "cars"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: cartoons"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "can /kən/ (weak) vs can't /kænt/ (strong)",
      "items": [
        "I can swim /aɪ kən swɪm/",
        "I can't swim /aɪ kænt swɪm/",
        "Yes, I can /kæn/"
      ],
      "tipAr": "في الإيجاب can ضعيفة «كِن»، وفي النفي can't قوية وطويلة «كانت». الفرق يُسمع من الطول."
    },
    "exercises": {
      "easy": [
        {
          "id": "sg_111_e1",
          "type": "meaning",
          "promptEn": "What does \"swim\" mean?",
          "promptAr": "ما معنى \"swim\"؟",
          "options": [
            "بشكل جيد",
            "يسبح",
            "يطبخ",
            "يساعد"
          ],
          "correctIndex": 1,
          "answer": "يسبح",
          "explanationAr": "\"swim\" /swɪm/ تعني: يسبح. مثال: I can swim."
        },
        {
          "id": "sg_111_e2",
          "type": "meaning",
          "promptEn": "What does \"ride\" mean?",
          "promptAr": "ما معنى \"ride\"؟",
          "options": [
            "يركب/يسوق (دراجة/خيل)",
            "بشكل جيد",
            "بسرعة",
            "يكتب بالكيبورد"
          ],
          "correctIndex": 0,
          "answer": "يركب/يسوق (دراجة/خيل)",
          "explanationAr": "\"ride\" /raɪd/ تعني: يركب/يسوق (دراجة/خيل). مثال: Can you ride a horse?"
        },
        {
          "id": "sg_111_e3",
          "type": "meaning",
          "promptEn": "What does \"draw\" mean?",
          "promptAr": "ما معنى \"draw\"؟",
          "options": [
            "يطبخ",
            "يرسم",
            "بشكل جيد",
            "يركب/يسوق (دراجة/خيل)"
          ],
          "correctIndex": 1,
          "answer": "يرسم",
          "explanationAr": "\"draw\" /drɔː/ تعني: يرسم. مثال: She can draw."
        },
        {
          "id": "sg_111_e4",
          "type": "meaning",
          "promptEn": "What does \"cook\" mean?",
          "promptAr": "ما معنى \"cook\"؟",
          "options": [
            "يساعد",
            "يطبخ",
            "يركب/يسوق (دراجة/خيل)",
            "يسبح"
          ],
          "correctIndex": 1,
          "answer": "يطبخ",
          "explanationAr": "\"cook\" /kʊk/ تعني: يطبخ. مثال: I can't cook."
        }
      ],
      "medium": [
        {
          "id": "sg_111_m1",
          "type": "gap",
          "promptEn": "Complete: I ____ swim.",
          "promptAr": "أكمل الفراغ: (أقدر أسبح.)",
          "options": [
            "cans",
            "can to",
            "can"
          ],
          "correctIndex": 2,
          "answer": "I can swim.",
          "explanationAr": "الإجابة: can. can + فعل أصلي لكل الضمائر، بدون to وبدون s. النفي can't، والسؤال Can you...?"
        },
        {
          "id": "sg_111_m2",
          "type": "gap",
          "promptEn": "Complete: My sister ____ ride a bike.",
          "promptAr": "أكمل الفراغ: (أختي ما تقدر تسوق سيكل.)",
          "options": [
            "not can",
            "don't can",
            "can't"
          ],
          "correctIndex": 2,
          "answer": "My sister can't ride a bike.",
          "explanationAr": "الإجابة: can't. can + فعل أصلي لكل الضمائر، بدون to وبدون s. النفي can't، والسؤال Can you...?"
        },
        {
          "id": "sg_111_m3",
          "type": "gap",
          "promptEn": "Complete: ____ you speak French?",
          "promptAr": "أكمل الفراغ: (تقدر تتكلم فرنسي؟)",
          "options": [
            "Can",
            "Do",
            "Are"
          ],
          "correctIndex": 0,
          "answer": "Can you speak French?",
          "explanationAr": "الإجابة: Can. can + فعل أصلي لكل الضمائر، بدون to وبدون s. النفي can't، والسؤال Can you...?"
        },
        {
          "id": "sg_111_m4",
          "type": "gap",
          "promptEn": "Complete: He can ____ very well.",
          "promptAr": "أكمل الفراغ: (يقدر يرسم زين مرة.)",
          "options": [
            "to draw",
            "draw",
            "draws"
          ],
          "correctIndex": 1,
          "answer": "He can draw very well.",
          "explanationAr": "الإجابة: draw. can + فعل أصلي لكل الضمائر، بدون to وبدون s. النفي can't، والسؤال Can you...?"
        }
      ],
      "hard": [
        {
          "id": "sg_111_h1",
          "type": "order",
          "promptEn": "Put the words in order: No, / I / Yes, / can't. / can. / I",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (إيه أقدر. لا ما أقدر.)",
          "answer": "Yes, I can. No, I can't.",
          "explanationAr": "الترتيب الصحيح: Yes, I can. No, I can't."
        },
        {
          "id": "sg_111_h2",
          "type": "order",
          "promptEn": "Put the words in order: me, / help / Can / you / please?",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (ممكن تساعدني لو سمحت؟)",
          "answer": "Can you help me, please?",
          "explanationAr": "الترتيب الصحيح: Can you help me, please?"
        },
        {
          "id": "sg_111_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أختي ما تقدر تسوق سيكل.",
          "answer": "My sister can't ride a bike.",
          "explanationAr": "ترجمة مقترحة: My sister can't ride a bike."
        },
        {
          "id": "sg_111_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: يقدر يرسم زين مرة.",
          "answer": "He can draw very well.",
          "explanationAr": "ترجمة مقترحة: He can draw very well."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "I can't to come.",
        "correct": "I can't come.",
        "whyAr": "لا to بعد can't."
      },
      {
        "incorrect": "Do you can help me?",
        "correct": "Can you help me?",
        "whyAr": "can تكوّن السؤال وحدها."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (Always / usually / never: كم مرة تسويها؟): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "She is always happy.",
          "She always is happy."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: She is always happy. — مع be تأتي بعده.",
        "fromLessonId": "sg_102"
      },
      {
        "questionAr": "مراجعة (He works / She studies: حرف s مع الغائب): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "He works in a bank.",
          "He work in a bank."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: He works in a bank. — مع he لازم s؛ هذا أكثر خطأ عند المتعلمين العرب.",
        "fromLessonId": "sg_110"
      },
      {
        "questionAr": "مراجعة (There is / There are: وصف البيت): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "In my house there is four rooms.",
          "In my house there are four rooms."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: In my house there are four rooms. — أكثر من واحد ⇐ there are.",
        "fromLessonId": "sg_107"
      },
      {
        "questionAr": "ما معنى \"often\"؟",
        "questionEn": "What does \"often\" mean?",
        "options": [
          "غالباً/كثيراً",
          "يتكلم",
          "يحب",
          "يشرب"
        ],
        "correctIndex": 0,
        "explanationAr": "\"often\" /ˈɔːfən/ تعني: غالباً/كثيراً. مثال: Do you often travel?",
        "fromLessonId": "sg_120_s"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (تقدر تتكلم فرنسي؟)",
          "questionEn": "Complete: ____ you speak French?",
          "options": [
            "Can",
            "Do",
            "Are"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: Can. can + فعل أصلي لكل الضمائر، بدون to وبدون s. النفي can't، والسؤال Can you...?"
        },
        {
          "questionAr": "أكمل الفراغ: (يقدر يرسم زين مرة.)",
          "questionEn": "Complete: He can ____ very well.",
          "options": [
            "to draw",
            "draw",
            "draws"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: draw. can + فعل أصلي لكل الضمائر، بدون to وبدون s. النفي can't، والسؤال Can you...?"
        },
        {
          "questionAr": "ما معنى \"sing\"؟",
          "questionEn": "What does \"sing\" mean?",
          "options": [
            "حصان",
            "بسرعة",
            "يرسم",
            "يغني/ينشد"
          ],
          "correctIndex": 3,
          "explanationAr": "\"sing\" /sɪŋ/ تعني: يغني/ينشد. مثال: He can sing nasheeds."
        },
        {
          "questionAr": "ما معنى \"type\"؟",
          "questionEn": "What does \"type\" mean?",
          "options": [
            "يساعد",
            "بسرعة",
            "يركب/يسوق (دراجة/خيل)",
            "يكتب بالكيبورد"
          ],
          "correctIndex": 3,
          "explanationAr": "\"type\" /taɪp/ تعني: يكتب بالكيبورد. مثال: I can type fast."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "I can't come.",
            "I can't to come."
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: I can't come. — لا to بعد can't."
        }
      ]
    }
  },
  {
    "id": "sg_112",
    "pillarId": "grammar",
    "pillarNameAr": "القواعد التحدثية السريعة",
    "pillarNameEn": "Spoken Grammar & Fast Patterns",
    "pillarIcon": "🧠",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "المضارع المستمر: وش تسوي الحين؟",
    "titleEn": "Present Continuous: What Are You Doing Now?",
    "descAr": "صف اللي يصير الحين باستخدام am/is/are + ing.",
    "descEn": "Describe what's happening now with am/is/are + -ing.",
    "speakingGoalAr": "صف لسارة وش يسوي كل واحد في البيت الحين.",
    "speakingGoalEn": "Describe what everyone at home is doing now.",
    "keyPattern": {
      "ruleAr": "للحدث الجاري الآن: am/is/are + فعل+ing. ونستخدم now و right now و at the moment.",
      "ruleEn": "For actions happening now: am/is/are + verb-ing, with now/at the moment.",
      "formula": "subject + am/is/are + verb-ing (now)"
    },
    "practicalExamples": [
      {
        "en": "I'm studying English now.",
        "ar": "أذاكر إنجليزي الحين."
      },
      {
        "en": "My mother is making coffee.",
        "ar": "أمي تسوي قهوة."
      },
      {
        "en": "The kids are playing outside.",
        "ar": "العيال يلعبون برا."
      },
      {
        "en": "It's raining in Abha today.",
        "ar": "تمطر في أبها اليوم."
      },
      {
        "en": "What are you doing right now?",
        "ar": "وش تسوي الحين؟"
      },
      {
        "en": "He isn't sleeping, he's watching TV.",
        "ar": "هو مو نايم، يشوف تلفزيون."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "I studying now.",
        "correct": "I'm studying now.",
        "whyAr": "لا تنسَ am/is/are قبل ing."
      },
      {
        "incorrect": "She is make tea.",
        "correct": "She is making tea.",
        "whyAr": "بعد is الفعل يأخذ ing."
      },
      {
        "incorrect": "I am go to school every day.",
        "correct": "I go to school every day.",
        "whyAr": "للعادات نستخدم المضارع البسيط، ليس المستمر."
      }
    ],
    "speakingChallenge": {
      "promptAr": "صف لسارة اللي يصير حولك الحين.",
      "promptEn": "Describe what's happening around you now.",
      "saraQuestionAr": "وش يصير حولك الحين؟",
      "saraQuestionEn": "What's happening around you right now?",
      "recommendedResponseEn": "I'm sitting in the living room. My sister is watching cartoons. My father is talking on the phone. It isn't raining."
    },
    "quiz": [
      {
        "questionAr": "أكمل: Look! The baby ___.",
        "questionEn": "Complete: Look! The baby ___.",
        "options": [
          "sleeps",
          "is sleeping",
          "sleep"
        ],
        "correctIndex": 1,
        "explanationAr": "Look! تعني الآن ⇐ مستمر."
      },
      {
        "questionAr": "أي جملة لعادة؟",
        "questionEn": "Which sentence is a habit?",
        "options": [
          "I'm drinking milk now.",
          "I drink milk every morning.",
          "I am drink milk."
        ],
        "correctIndex": 1,
        "explanationAr": "every morning = عادة ⇐ مضارع بسيط."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'm studying now.",
          "I studying now."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I'm studying now. — لا تنسَ am/is/are قبل ing."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "She is make tea.",
          "She is making tea."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: She is making tea. — بعد is الفعل يأخذ ing."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I am go to school every day.",
          "I go to school every day."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I go to school every day. — للعادات نستخدم المضارع البسيط، ليس المستمر."
      }
    ],
    "whiteboardNotes": {
      "title": "Present Continuous: What Are You Doing Now?",
      "pointsAr": [
        "يصف أحداثاً تحدث الآن.",
        "يفرق بينه وبين المضارع البسيط.",
        "يكتب ing بشكل صحيح (making, running).",
        "للحدث الجاري الآن: am/is/are + فعل+ing. ونستخدم now و right now و at the moment."
      ],
      "pointsEn": [
        "Describe actions happening now.",
        "Contrast with the present simple.",
        "Spell -ing forms correctly.",
        "For actions happening now: am/is/are + verb-ing, with now/at the moment."
      ],
      "chalkHighlight": "subject + am/is/are + verb-ing (now)"
    },
    "unit": 3,
    "cefr": "A1",
    "objectivesAr": [
      "يصف أحداثاً تحدث الآن.",
      "يفرق بينه وبين المضارع البسيط.",
      "يكتب ing بشكل صحيح (making, running)."
    ],
    "objectivesEn": [
      "Describe actions happening now.",
      "Contrast with the present simple.",
      "Spell -ing forms correctly."
    ],
    "vocabulary": [
      {
        "word": "now",
        "ipa": "/naʊ/",
        "ar": "الآن",
        "exampleEn": "I'm busy now.",
        "exampleAr": "مشغول الحين."
      },
      {
        "word": "right now",
        "ipa": "/raɪt naʊ/",
        "ar": "الحين بالضبط",
        "exampleEn": "She's driving right now.",
        "exampleAr": "هي تسوق الحين."
      },
      {
        "word": "at the moment",
        "ipa": "/æt ðə ˈmoʊmənt/",
        "ar": "في هذه اللحظة",
        "exampleEn": "He's sleeping at the moment.",
        "exampleAr": "نايم الحين."
      },
      {
        "word": "rain",
        "ipa": "/reɪn/",
        "ar": "يمطر/مطر",
        "exampleEn": "It's raining!",
        "exampleAr": "تمطر!"
      },
      {
        "word": "wait",
        "ipa": "/weɪt/",
        "ar": "ينتظر",
        "exampleEn": "I'm waiting for the bus.",
        "exampleAr": "أنتظر الباص."
      },
      {
        "word": "talk",
        "ipa": "/tɔːk/",
        "ar": "يتكلم",
        "exampleEn": "They're talking on the phone.",
        "exampleAr": "يتكلمون في الجوال."
      },
      {
        "word": "make",
        "ipa": "/meɪk/",
        "ar": "يصنع/يسوي",
        "exampleEn": "Mom is making lunch.",
        "exampleAr": "أمي تسوي الغداء."
      },
      {
        "word": "run",
        "ipa": "/rʌn/",
        "ar": "يركض",
        "exampleEn": "The boys are running.",
        "exampleAr": "الأولاد يركضون."
      },
      {
        "word": "listen",
        "ipa": "/ˈlɪsən/",
        "ar": "يستمع",
        "exampleEn": "I'm listening to Quran.",
        "exampleAr": "أسمع قرآن."
      },
      {
        "word": "outside",
        "ipa": "/ˌaʊtˈsaɪd/",
        "ar": "برا/خارج",
        "exampleEn": "They're playing outside.",
        "exampleAr": "يلعبون برا."
      }
    ],
    "grammarFocus": {
      "ruleAr": "للحدث الجاري الآن: am/is/are + فعل+ing. ونستخدم now و right now و at the moment.",
      "ruleEn": "For actions happening now: am/is/are + verb-ing, with now/at the moment.",
      "formula": "subject + am/is/are + verb-ing (now)",
      "examples": [
        {
          "en": "I'm studying English now.",
          "ar": "أذاكر إنجليزي الحين."
        },
        {
          "en": "My mother is making coffee.",
          "ar": "أمي تسوي قهوة."
        },
        {
          "en": "The kids are playing outside.",
          "ar": "العيال يلعبون برا."
        },
        {
          "en": "It's raining in Abha today.",
          "ar": "تمطر في أبها اليوم."
        },
        {
          "en": "What are you doing right now?",
          "ar": "وش تسوي الحين؟"
        },
        {
          "en": "He isn't sleeping, he's watching TV.",
          "ar": "هو مو نايم، يشوف تلفزيون."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Hi! What are you doing right now?",
        "ar": "هلا! وش تسوي الحين؟"
      },
      {
        "speaker": "Student",
        "en": "I'm doing my homework in my room.",
        "ar": "أسوي واجبي في غرفتي."
      },
      {
        "speaker": "Sara",
        "en": "What is your family doing?",
        "ar": "وأهلك وش يسوون؟"
      },
      {
        "speaker": "Student",
        "en": "My mom is making tea and my dad is reading the news.",
        "ar": "أمي تسوي شاي وأبوي يقرأ الأخبار."
      },
      {
        "speaker": "Sara",
        "en": "And your little brothers?",
        "ar": "وإخوانك الصغار؟"
      },
      {
        "speaker": "Student",
        "en": "They're running and shouting in the garden!",
        "ar": "يركضون ويصارخون في الحوش!"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Hi! What are you doing right now?\nStudent: I'm doing my homework in my room.\nSara: What is your family doing?\nStudent: My mom is making tea and my dad is reading the news.\nSara: And your little brothers?\nStudent: They're running and shouting in the garden!",
      "questions": [
        {
          "questionAr": "وين الطالب؟",
          "questionEn": "Where is the student?",
          "options": [
            "in the kitchen",
            "in his room",
            "in the garden"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: in his room"
        },
        {
          "questionAr": "وش يسوي الأب؟",
          "questionEn": "What is the dad doing?",
          "options": [
            "making tea",
            "reading the news",
            "sleeping"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: reading the news"
        },
        {
          "questionAr": "وين الإخوان الصغار؟",
          "questionEn": "Where are the little brothers?",
          "options": [
            "in the garden",
            "at school",
            "in the car"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: in the garden"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "The -ing ending /ɪŋ/ (no hard /g/)",
      "items": [
        "making /ˈmeɪkɪŋ/",
        "running /ˈrʌnɪŋ/",
        "sing /sɪŋ/ ≠ sin /sɪn/"
      ],
      "tipAr": "ng صوت أنفي واحد من آخر الحلق؛ لا تنطق «جـ» أو «غ» في آخره: «مايكِنْ» وليس «مايكِنج»."
    },
    "exercises": {
      "easy": [
        {
          "id": "sg_112_e1",
          "type": "meaning",
          "promptEn": "What does \"now\" mean?",
          "promptAr": "ما معنى \"now\"؟",
          "options": [
            "في هذه اللحظة",
            "يتكلم",
            "يركض",
            "الآن"
          ],
          "correctIndex": 3,
          "answer": "الآن",
          "explanationAr": "\"now\" /naʊ/ تعني: الآن. مثال: I'm busy now."
        },
        {
          "id": "sg_112_e2",
          "type": "meaning",
          "promptEn": "What does \"right now\" mean?",
          "promptAr": "ما معنى \"right now\"؟",
          "options": [
            "يمطر/مطر",
            "الآن",
            "الحين بالضبط",
            "يصنع/يسوي"
          ],
          "correctIndex": 2,
          "answer": "الحين بالضبط",
          "explanationAr": "\"right now\" /raɪt naʊ/ تعني: الحين بالضبط. مثال: She's driving right now."
        },
        {
          "id": "sg_112_e3",
          "type": "meaning",
          "promptEn": "What does \"at the moment\" mean?",
          "promptAr": "ما معنى \"at the moment\"؟",
          "options": [
            "برا/خارج",
            "الحين بالضبط",
            "ينتظر",
            "في هذه اللحظة"
          ],
          "correctIndex": 3,
          "answer": "في هذه اللحظة",
          "explanationAr": "\"at the moment\" /æt ðə ˈmoʊmənt/ تعني: في هذه اللحظة. مثال: He's sleeping at the moment."
        },
        {
          "id": "sg_112_e4",
          "type": "meaning",
          "promptEn": "What does \"rain\" mean?",
          "promptAr": "ما معنى \"rain\"؟",
          "options": [
            "يركض",
            "يمطر/مطر",
            "برا/خارج",
            "الحين بالضبط"
          ],
          "correctIndex": 1,
          "answer": "يمطر/مطر",
          "explanationAr": "\"rain\" /reɪn/ تعني: يمطر/مطر. مثال: It's raining!"
        }
      ],
      "medium": [
        {
          "id": "sg_112_m1",
          "type": "gap",
          "promptEn": "Complete: I'm ____ English now.",
          "promptAr": "أكمل الفراغ: (أذاكر إنجليزي الحين.)",
          "options": [
            "studies",
            "study",
            "studying"
          ],
          "correctIndex": 2,
          "answer": "I'm studying English now.",
          "explanationAr": "الإجابة: studying. للحدث الجاري الآن: am/is/are + فعل+ing. ونستخدم now و right now و at the moment."
        },
        {
          "id": "sg_112_m2",
          "type": "gap",
          "promptEn": "Complete: My mother ____ coffee.",
          "promptAr": "أكمل الفراغ: (أمي تسوي قهوة.)",
          "options": [
            "is making",
            "makes",
            "is make"
          ],
          "correctIndex": 0,
          "answer": "My mother is making coffee.",
          "explanationAr": "الإجابة: is making. للحدث الجاري الآن: am/is/are + فعل+ing. ونستخدم now و right now و at the moment."
        },
        {
          "id": "sg_112_m3",
          "type": "gap",
          "promptEn": "Complete: The kids ____ playing outside.",
          "promptAr": "أكمل الفراغ: (العيال يلعبون برا.)",
          "options": [
            "are",
            "is",
            "am"
          ],
          "correctIndex": 0,
          "answer": "The kids are playing outside.",
          "explanationAr": "الإجابة: are. للحدث الجاري الآن: am/is/are + فعل+ing. ونستخدم now و right now و at the moment."
        },
        {
          "id": "sg_112_m4",
          "type": "gap",
          "promptEn": "Complete: It's ____ in Abha today.",
          "promptAr": "أكمل الفراغ: (تمطر في أبها اليوم.)",
          "options": [
            "rains",
            "raining",
            "rain"
          ],
          "correctIndex": 1,
          "answer": "It's raining in Abha today.",
          "explanationAr": "الإجابة: raining. للحدث الجاري الآن: am/is/are + فعل+ing. ونستخدم now و right now و at the moment."
        }
      ],
      "hard": [
        {
          "id": "sg_112_h1",
          "type": "order",
          "promptEn": "Put the words in order: now? / What / right / you / are / doing",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (وش تسوي الحين؟)",
          "answer": "What are you doing right now?",
          "explanationAr": "الترتيب الصحيح: What are you doing right now?"
        },
        {
          "id": "sg_112_h2",
          "type": "order",
          "promptEn": "Put the words in order: He / TV. / isn't / he's / watching / sleeping,",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (هو مو نايم، يشوف تلفزيون.)",
          "answer": "He isn't sleeping, he's watching TV.",
          "explanationAr": "الترتيب الصحيح: He isn't sleeping, he's watching TV."
        },
        {
          "id": "sg_112_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أمي تسوي قهوة.",
          "answer": "My mother is making coffee.",
          "explanationAr": "ترجمة مقترحة: My mother is making coffee."
        },
        {
          "id": "sg_112_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: تمطر في أبها اليوم.",
          "answer": "It's raining in Abha today.",
          "explanationAr": "ترجمة مقترحة: It's raining in Abha today."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "I am wanting water.",
        "correct": "I want water.",
        "whyAr": "أفعال الحالة مثل want/like/know ما تأخذ ing عادة."
      },
      {
        "incorrect": "Now I am study.",
        "correct": "I'm studying now.",
        "whyAr": "اكتمال التركيب: am + studying."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (Can و Can't: قدراتك): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "She can cook.",
          "She cans cook."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: She can cook. — can لا تأخذ s أبداً.",
        "fromLessonId": "sg_111"
      },
      {
        "questionAr": "مراجعة (Do و Does: السؤال والنفي في المضارع): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Does he play football?",
          "Does he plays football?"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Does he play football? — بعد does الفعل يرجع لأصله.",
        "fromLessonId": "sg_120_s"
      },
      {
        "questionAr": "مراجعة (Have و Has: أشياؤك وعائلتك): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "She has a phone.",
          "She have a phone."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: She has a phone. — مع she/he/it نستخدم has.",
        "fromLessonId": "sg_108"
      },
      {
        "questionAr": "ما معنى \"brush\"؟",
        "questionEn": "What does \"brush\" mean?",
        "options": [
          "عادةً (80%)",
          "غالباً (60%)",
          "ينظف بالفرشاة",
          "شاطئ/بحر"
        ],
        "correctIndex": 2,
        "explanationAr": "\"brush\" /brʌʃ/ تعني: ينظف بالفرشاة. مثال: Brush your teeth!",
        "fromLessonId": "sg_102"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (العيال يلعبون برا.)",
          "questionEn": "Complete: The kids ____ playing outside.",
          "options": [
            "are",
            "is",
            "am"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: are. للحدث الجاري الآن: am/is/are + فعل+ing. ونستخدم now و right now و at the moment."
        },
        {
          "questionAr": "أكمل الفراغ: (تمطر في أبها اليوم.)",
          "questionEn": "Complete: It's ____ in Abha today.",
          "options": [
            "rains",
            "raining",
            "rain"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: raining. للحدث الجاري الآن: am/is/are + فعل+ing. ونستخدم now و right now و at the moment."
        },
        {
          "questionAr": "ما معنى \"wait\"؟",
          "questionEn": "What does \"wait\" mean?",
          "options": [
            "ينتظر",
            "الحين بالضبط",
            "يمطر/مطر",
            "يركض"
          ],
          "correctIndex": 0,
          "explanationAr": "\"wait\" /weɪt/ تعني: ينتظر. مثال: I'm waiting for the bus."
        },
        {
          "questionAr": "ما معنى \"talk\"؟",
          "questionEn": "What does \"talk\" mean?",
          "options": [
            "يستمع",
            "يركض",
            "يصنع/يسوي",
            "يتكلم"
          ],
          "correctIndex": 3,
          "explanationAr": "\"talk\" /tɔːk/ تعني: يتكلم. مثال: They're talking on the phone."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "I am wanting water.",
            "I want water."
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: I want water. — أفعال الحالة مثل want/like/know ما تأخذ ing عادة."
        }
      ]
    }
  },
  {
    "id": "sg_113",
    "pillarId": "grammar",
    "pillarNameAr": "القواعد التحدثية السريعة",
    "pillarNameEn": "Spoken Grammar & Fast Patterns",
    "pillarIcon": "🧠",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "Was و Were: الماضي مع be",
    "titleEn": "Was & Were: The Past of Be",
    "descAr": "تكلم عن أمس والإجازة الماضية: وين كنت؟ كيف كان الجو؟",
    "descEn": "Talk about yesterday and last holiday: where you were and how it was.",
    "speakingGoalAr": "صف آخر إجازة لك في أربع جمل بـ was/were.",
    "speakingGoalEn": "Describe your last holiday in four sentences with was/were.",
    "keyPattern": {
      "ruleAr": "was مع I/he/she/it، و were مع you/we/they. النفي wasn't/weren't، والسؤال Were you...?",
      "ruleEn": "was with I/he/she/it; were with you/we/they. Negatives wasn't/weren't.",
      "formula": "I/He/She/It + was | You/We/They + were + place/adjective + past time"
    },
    "practicalExamples": [
      {
        "en": "I was at my grandmother's house yesterday.",
        "ar": "كنت في بيت جدتي أمس."
      },
      {
        "en": "We were in Abha last summer.",
        "ar": "كنا في أبها الصيف الماضي."
      },
      {
        "en": "The weather wasn't hot.",
        "ar": "الجو ما كان حار."
      },
      {
        "en": "Were you at school on Sunday?",
        "ar": "كنت في المدرسة يوم الأحد؟"
      },
      {
        "en": "The food was delicious.",
        "ar": "الأكل كان لذيذ."
      },
      {
        "en": "They were tired after the trip.",
        "ar": "كانوا تعبانين بعد الرحلة."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "We was in Jeddah.",
        "correct": "We were in Jeddah.",
        "whyAr": "we ⇐ were."
      },
      {
        "incorrect": "I were tired.",
        "correct": "I was tired.",
        "whyAr": "I ⇐ was."
      },
      {
        "incorrect": "Yesterday I at home.",
        "correct": "Yesterday I was at home.",
        "whyAr": "لا تحذف فعل be في الماضي أيضاً."
      }
    ],
    "speakingChallenge": {
      "promptAr": "حدث سارة عن آخر إجازة.",
      "promptEn": "Tell Sara about your last holiday.",
      "saraQuestionAr": "وين كنت في آخر إجازة؟ وكيف كانت؟",
      "saraQuestionEn": "Where were you on your last holiday? How was it?",
      "recommendedResponseEn": "I was in Abha with my family. The weather was cool and rainy. The food was delicious. It was really fun."
    },
    "quiz": [
      {
        "questionAr": "أكمل: My friends ___ at the match.",
        "questionEn": "Complete: My friends ___ at the match.",
        "options": [
          "was",
          "were",
          "are"
        ],
        "correctIndex": 1,
        "explanationAr": "friends = they ⇐ were."
      },
      {
        "questionAr": "ترجمة «قبل أسبوع»:",
        "questionEn": "Translate «قبل أسبوع»:",
        "options": [
          "before a week",
          "a week ago",
          "a week before now"
        ],
        "correctIndex": 1,
        "explanationAr": "a week ago."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "We was in Jeddah.",
          "We were in Jeddah."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: We were in Jeddah. — we ⇐ were."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I were tired.",
          "I was tired."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I was tired. — I ⇐ was."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Yesterday I was at home.",
          "Yesterday I at home."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Yesterday I was at home. — لا تحذف فعل be في الماضي أيضاً."
      }
    ],
    "whiteboardNotes": {
      "title": "Was & Were: The Past of Be",
      "pointsAr": [
        "يستخدم was/were للماضي.",
        "يستعمل كلمات الزمن الماضي yesterday/last/ago.",
        "يسأل Where were you?",
        "was مع I/he/she/it، و were مع you/we/they. النفي wasn't/weren't، والسؤال Were you...?"
      ],
      "pointsEn": [
        "Use was/were for the past.",
        "Use past time words: yesterday, last, ago.",
        "Ask 'Where were you?'.",
        "was with I/he/she/it; were with you/we/they. Negatives wasn't/weren't."
      ],
      "chalkHighlight": "I/He/She/It + was | You/We/They + were + place/adjective + past time"
    },
    "unit": 3,
    "cefr": "A2",
    "objectivesAr": [
      "يستخدم was/were للماضي.",
      "يستعمل كلمات الزمن الماضي yesterday/last/ago.",
      "يسأل Where were you?"
    ],
    "objectivesEn": [
      "Use was/were for the past.",
      "Use past time words: yesterday, last, ago.",
      "Ask 'Where were you?'."
    ],
    "vocabulary": [
      {
        "word": "yesterday",
        "ipa": "/ˈjɛstərdeɪ/",
        "ar": "أمس",
        "exampleEn": "I was busy yesterday.",
        "exampleAr": "كنت مشغول أمس."
      },
      {
        "word": "last week",
        "ipa": "/læst wiːk/",
        "ar": "الأسبوع الماضي",
        "exampleEn": "We were in Dubai last week.",
        "exampleAr": "كنا في دبي الأسبوع الماضي."
      },
      {
        "word": "ago",
        "ipa": "/əˈɡoʊ/",
        "ar": "قبل (مدة)",
        "exampleEn": "Two days ago I was sick.",
        "exampleAr": "قبل يومين كنت مريض."
      },
      {
        "word": "weather",
        "ipa": "/ˈwɛðər/",
        "ar": "الطقس/الجو",
        "exampleEn": "The weather was nice.",
        "exampleAr": "الجو كان حلو."
      },
      {
        "word": "delicious",
        "ipa": "/dɪˈlɪʃəs/",
        "ar": "لذيذ",
        "exampleEn": "The food was delicious.",
        "exampleAr": "الأكل لذيذ."
      },
      {
        "word": "trip",
        "ipa": "/trɪp/",
        "ar": "رحلة",
        "exampleEn": "The trip was long.",
        "exampleAr": "الرحلة كانت طويلة."
      },
      {
        "word": "crowded",
        "ipa": "/ˈkraʊdɪd/",
        "ar": "زحمة",
        "exampleEn": "The mall was crowded.",
        "exampleAr": "المول كان زحمة."
      },
      {
        "word": "cold",
        "ipa": "/koʊld/",
        "ar": "بارد",
        "exampleEn": "It was cold in the desert.",
        "exampleAr": "كان بارد في البر."
      },
      {
        "word": "sick",
        "ipa": "/sɪk/",
        "ar": "مريض",
        "exampleEn": "Was he sick?",
        "exampleAr": "كان مريض؟"
      },
      {
        "word": "fun",
        "ipa": "/fʌn/",
        "ar": "ممتع/وناسة",
        "exampleEn": "It was fun!",
        "exampleAr": "كانت وناسة!"
      }
    ],
    "grammarFocus": {
      "ruleAr": "was مع I/he/she/it، و were مع you/we/they. النفي wasn't/weren't، والسؤال Were you...?",
      "ruleEn": "was with I/he/she/it; were with you/we/they. Negatives wasn't/weren't.",
      "formula": "I/He/She/It + was | You/We/They + were + place/adjective + past time",
      "examples": [
        {
          "en": "I was at my grandmother's house yesterday.",
          "ar": "كنت في بيت جدتي أمس."
        },
        {
          "en": "We were in Abha last summer.",
          "ar": "كنا في أبها الصيف الماضي."
        },
        {
          "en": "The weather wasn't hot.",
          "ar": "الجو ما كان حار."
        },
        {
          "en": "Were you at school on Sunday?",
          "ar": "كنت في المدرسة يوم الأحد؟"
        },
        {
          "en": "The food was delicious.",
          "ar": "الأكل كان لذيذ."
        },
        {
          "en": "They were tired after the trip.",
          "ar": "كانوا تعبانين بعد الرحلة."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Where were you last weekend?",
        "ar": "وين كنت الويكند الماضي؟"
      },
      {
        "speaker": "Student",
        "en": "We were in the desert. We were camping.",
        "ar": "كنا في البر. كنا مخيمين."
      },
      {
        "speaker": "Sara",
        "en": "Was it cold?",
        "ar": "كان بارد؟"
      },
      {
        "speaker": "Student",
        "en": "Yes, it was very cold at night.",
        "ar": "إيه، بالليل كان بارد مرة."
      },
      {
        "speaker": "Sara",
        "en": "Were your cousins there?",
        "ar": "كانوا عيال عمك موجودين؟"
      },
      {
        "speaker": "Student",
        "en": "Yes, they were. It was really fun!",
        "ar": "إيه كانوا. كانت وناسة!"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Where were you last weekend?\nStudent: We were in the desert. We were camping.\nSara: Was it cold?\nStudent: Yes, it was very cold at night.\nSara: Were your cousins there?\nStudent: Yes, they were. It was really fun!",
      "questions": [
        {
          "questionAr": "وين كان الطالب؟",
          "questionEn": "Where was the student last weekend?",
          "options": [
            "at the beach",
            "in the desert",
            "in Dubai"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: in the desert"
        },
        {
          "questionAr": "كيف كان الجو بالليل؟",
          "questionEn": "How was the weather at night?",
          "options": [
            "hot",
            "very cold",
            "rainy"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: very cold"
        },
        {
          "questionAr": "مين كان معهم؟",
          "questionEn": "Who was there too?",
          "options": [
            "his teacher",
            "his cousins",
            "his friends from school"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: his cousins"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Weak forms: was /wəz/, were /wər/",
      "items": [
        "I was there /aɪ wəz ðɛr/",
        "We were tired /wi wər ˈtaɪərd/",
        "wasn't /ˈwʌzənt/"
      ],
      "tipAr": "في وسط الجملة was تنطق خفيفة «وِز». وفي النفي wasn't تكون قوية."
    },
    "exercises": {
      "easy": [
        {
          "id": "sg_113_e1",
          "type": "meaning",
          "promptEn": "What does \"yesterday\" mean?",
          "promptAr": "ما معنى \"yesterday\"؟",
          "options": [
            "بارد",
            "قبل (مدة)",
            "ممتع/وناسة",
            "أمس"
          ],
          "correctIndex": 3,
          "answer": "أمس",
          "explanationAr": "\"yesterday\" /ˈjɛstərdeɪ/ تعني: أمس. مثال: I was busy yesterday."
        },
        {
          "id": "sg_113_e2",
          "type": "meaning",
          "promptEn": "What does \"last week\" mean?",
          "promptAr": "ما معنى \"last week\"؟",
          "options": [
            "الأسبوع الماضي",
            "الطقس/الجو",
            "بارد",
            "قبل (مدة)"
          ],
          "correctIndex": 0,
          "answer": "الأسبوع الماضي",
          "explanationAr": "\"last week\" /læst wiːk/ تعني: الأسبوع الماضي. مثال: We were in Dubai last week."
        },
        {
          "id": "sg_113_e3",
          "type": "meaning",
          "promptEn": "What does \"ago\" mean?",
          "promptAr": "ما معنى \"ago\"؟",
          "options": [
            "رحلة",
            "لذيذ",
            "قبل (مدة)",
            "زحمة"
          ],
          "correctIndex": 2,
          "answer": "قبل (مدة)",
          "explanationAr": "\"ago\" /əˈɡoʊ/ تعني: قبل (مدة). مثال: Two days ago I was sick."
        },
        {
          "id": "sg_113_e4",
          "type": "meaning",
          "promptEn": "What does \"weather\" mean?",
          "promptAr": "ما معنى \"weather\"؟",
          "options": [
            "مريض",
            "أمس",
            "الأسبوع الماضي",
            "الطقس/الجو"
          ],
          "correctIndex": 3,
          "answer": "الطقس/الجو",
          "explanationAr": "\"weather\" /ˈwɛðər/ تعني: الطقس/الجو. مثال: The weather was nice."
        }
      ],
      "medium": [
        {
          "id": "sg_113_m1",
          "type": "gap",
          "promptEn": "Complete: I ____ at my grandmother's house yesterday.",
          "promptAr": "أكمل الفراغ: (كنت في بيت جدتي أمس.)",
          "options": [
            "were",
            "am",
            "was"
          ],
          "correctIndex": 2,
          "answer": "I was at my grandmother's house yesterday.",
          "explanationAr": "الإجابة: was. was مع I/he/she/it، و were مع you/we/they. النفي wasn't/weren't، والسؤال Were you...?"
        },
        {
          "id": "sg_113_m2",
          "type": "gap",
          "promptEn": "Complete: We ____ in Abha last summer.",
          "promptAr": "أكمل الفراغ: (كنا في أبها الصيف الماضي.)",
          "options": [
            "was",
            "were",
            "are"
          ],
          "correctIndex": 1,
          "answer": "We were in Abha last summer.",
          "explanationAr": "الإجابة: were. was مع I/he/she/it، و were مع you/we/they. النفي wasn't/weren't، والسؤال Were you...?"
        },
        {
          "id": "sg_113_m3",
          "type": "gap",
          "promptEn": "Complete: The weather ____ hot.",
          "promptAr": "أكمل الفراغ: (الجو ما كان حار.)",
          "options": [
            "weren't",
            "didn't",
            "wasn't"
          ],
          "correctIndex": 2,
          "answer": "The weather wasn't hot.",
          "explanationAr": "الإجابة: wasn't. was مع I/he/she/it، و were مع you/we/they. النفي wasn't/weren't، والسؤال Were you...?"
        },
        {
          "id": "sg_113_m4",
          "type": "gap",
          "promptEn": "Complete: ____ you at school on Sunday?",
          "promptAr": "أكمل الفراغ: (كنت في المدرسة يوم الأحد؟)",
          "options": [
            "Were",
            "Was",
            "Did"
          ],
          "correctIndex": 0,
          "answer": "Were you at school on Sunday?",
          "explanationAr": "الإجابة: Were. was مع I/he/she/it، و were مع you/we/they. النفي wasn't/weren't، والسؤال Were you...?"
        }
      ],
      "hard": [
        {
          "id": "sg_113_h1",
          "type": "order",
          "promptEn": "Put the words in order: delicious. / was / The / food",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (الأكل كان لذيذ.)",
          "answer": "The food was delicious.",
          "explanationAr": "الترتيب الصحيح: The food was delicious."
        },
        {
          "id": "sg_113_h2",
          "type": "order",
          "promptEn": "Put the words in order: They / trip. / tired / the / after / were",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (كانوا تعبانين بعد الرحلة.)",
          "answer": "They were tired after the trip.",
          "explanationAr": "الترتيب الصحيح: They were tired after the trip."
        },
        {
          "id": "sg_113_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: كنا في أبها الصيف الماضي.",
          "answer": "We were in Abha last summer.",
          "explanationAr": "ترجمة مقترحة: We were in Abha last summer."
        },
        {
          "id": "sg_113_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: كنت في المدرسة يوم الأحد؟",
          "answer": "Were you at school on Sunday?",
          "explanationAr": "ترجمة مقترحة: Were you at school on Sunday?"
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "I was in the desert before two days.",
        "correct": "I was in the desert two days ago.",
        "whyAr": "«قبل يومين» = two days ago، وليس before two days."
      },
      {
        "incorrect": "The trip was very fun for me.",
        "correct": "The trip was really fun.",
        "whyAr": "تعبير طبيعي أبسط."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (المضارع المستمر: وش تسوي الحين؟): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "She is make tea.",
          "She is making tea."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: She is making tea. — بعد is الفعل يأخذ ing.",
        "fromLessonId": "sg_112"
      },
      {
        "questionAr": "مراجعة (Always / usually / never: كم مرة تسويها؟): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I go always to school by bus.",
          "I always go to school by bus."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I always go to school by bus. — كلمة التكرار قبل الفعل الأساسي.",
        "fromLessonId": "sg_102"
      },
      {
        "questionAr": "مراجعة (المضارع البسيط: روتينك اليومي): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I am wake up at six.",
          "I wake up at six."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I wake up at six. — لا نضع am قبل الفعل في المضارع البسيط.",
        "fromLessonId": "sg_109"
      },
      {
        "questionAr": "ما معنى \"fast\"؟",
        "questionEn": "What does \"fast\" mean?",
        "options": [
          "يسبح",
          "بشكل جيد",
          "يرسم",
          "بسرعة"
        ],
        "correctIndex": 3,
        "explanationAr": "\"fast\" /fæst/ تعني: بسرعة. مثال: He can run fast.",
        "fromLessonId": "sg_111"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (الجو ما كان حار.)",
          "questionEn": "Complete: The weather ____ hot.",
          "options": [
            "weren't",
            "didn't",
            "wasn't"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: wasn't. was مع I/he/she/it، و were مع you/we/they. النفي wasn't/weren't، والسؤال Were you...?"
        },
        {
          "questionAr": "أكمل الفراغ: (كنت في المدرسة يوم الأحد؟)",
          "questionEn": "Complete: ____ you at school on Sunday?",
          "options": [
            "Were",
            "Was",
            "Did"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: Were. was مع I/he/she/it، و were مع you/we/they. النفي wasn't/weren't، والسؤال Were you...?"
        },
        {
          "questionAr": "ما معنى \"delicious\"؟",
          "questionEn": "What does \"delicious\" mean?",
          "options": [
            "لذيذ",
            "قبل (مدة)",
            "أمس",
            "الطقس/الجو"
          ],
          "correctIndex": 0,
          "explanationAr": "\"delicious\" /dɪˈlɪʃəs/ تعني: لذيذ. مثال: The food was delicious."
        },
        {
          "questionAr": "ما معنى \"trip\"؟",
          "questionEn": "What does \"trip\" mean?",
          "options": [
            "أمس",
            "مريض",
            "قبل (مدة)",
            "رحلة"
          ],
          "correctIndex": 3,
          "explanationAr": "\"trip\" /trɪp/ تعني: رحلة. مثال: The trip was long."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "I was in the desert two days ago.",
            "I was in the desert before two days."
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: I was in the desert two days ago. — «قبل يومين» = two days ago، وليس before two days."
        }
      ]
    }
  },
  {
    "id": "sg_114",
    "pillarId": "grammar",
    "pillarNameAr": "القواعد التحدثية السريعة",
    "pillarNameEn": "Spoken Grammar & Fast Patterns",
    "pillarIcon": "🧠",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "الماضي البسيط: أفعال منتظمة وشاذة",
    "titleEn": "Past Simple: Regular and Irregular Verbs",
    "descAr": "احكِ وش سويت أمس: played, visited, went, ate...",
    "descEn": "Tell what you did yesterday with regular and irregular verbs.",
    "speakingGoalAr": "احكِ قصة يومك أمس في ست جمل.",
    "speakingGoalEn": "Tell the story of your yesterday in six sentences.",
    "keyPattern": {
      "ruleAr": "الأفعال المنتظمة نضيف لها ed: played, visited. والشاذة لها شكل خاص لازم يُحفظ: go→went, eat→ate, see→saw.",
      "ruleEn": "Regular verbs add -ed; irregular verbs have special forms to memorise.",
      "formula": "subject + verb-ed / irregular past + past time"
    },
    "practicalExamples": [
      {
        "en": "I visited my uncle yesterday.",
        "ar": "زرت عمي أمس."
      },
      {
        "en": "We went to the mall after Isha.",
        "ar": "رحنا المول بعد العشاء."
      },
      {
        "en": "She ate shawarma for dinner.",
        "ar": "أكلت شاورما على العشاء."
      },
      {
        "en": "They saw a great match.",
        "ar": "شافوا مباراة قوية."
      },
      {
        "en": "Then I bought a new game.",
        "ar": "وبعدين اشتريت لعبة جديدة."
      },
      {
        "en": "My father came home late.",
        "ar": "أبوي رجع البيت متأخر."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "I goed to the mall.",
        "correct": "I went to the mall.",
        "whyAr": "go فعل شاذ ⇐ went."
      },
      {
        "incorrect": "Yesterday I play football.",
        "correct": "Yesterday I played football.",
        "whyAr": "مع yesterday لازم الماضي."
      },
      {
        "incorrect": "She buyed a dress.",
        "correct": "She bought a dress.",
        "whyAr": "buy ⇐ bought."
      }
    ],
    "speakingChallenge": {
      "promptAr": "احكِ لسارة يومك أمس بالترتيب.",
      "promptEn": "Tell Sara about your yesterday, in order.",
      "saraQuestionAr": "وش سويت أمس من الصبح لليل؟",
      "saraQuestionEn": "What did you do yesterday, from morning to night?",
      "recommendedResponseEn": "I woke up at six. I went to school. After school I had lunch and played football. In the evening we visited my uncle. I went to bed at eleven."
    },
    "quiz": [
      {
        "questionAr": "الماضي من take:",
        "questionEn": "Past of 'take':",
        "options": [
          "taked",
          "took",
          "taken"
        ],
        "correctIndex": 1,
        "explanationAr": "take ⇐ took."
      },
      {
        "questionAr": "أكمل: Last night we ___ pizza.",
        "questionEn": "Complete: Last night we ___ pizza.",
        "options": [
          "eat",
          "ate",
          "eated"
        ],
        "correctIndex": 1,
        "explanationAr": "eat ⇐ ate."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I went to the mall.",
          "I goed to the mall."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I went to the mall. — go فعل شاذ ⇐ went."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Yesterday I play football.",
          "Yesterday I played football."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Yesterday I played football. — مع yesterday لازم الماضي."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "She buyed a dress.",
          "She bought a dress."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: She bought a dress. — buy ⇐ bought."
      }
    ],
    "whiteboardNotes": {
      "title": "Past Simple: Regular and Irregular Verbs",
      "pointsAr": [
        "يكوّن الماضي بـ ed.",
        "يحفظ ١٥ فعلاً شاذاً شائعاً.",
        "يحكي أحداثاً متسلسلة.",
        "الأفعال المنتظمة نضيف لها ed: played, visited. والشاذة لها شكل خاص لازم يُحفظ: go→went, eat→ate, see→saw."
      ],
      "pointsEn": [
        "Form the past with -ed.",
        "Use 15 common irregular verbs.",
        "Narrate events in sequence.",
        "Regular verbs add -ed; irregular verbs have special forms to memorise."
      ],
      "chalkHighlight": "subject + verb-ed / irregular past + past time"
    },
    "unit": 3,
    "cefr": "A2",
    "objectivesAr": [
      "يكوّن الماضي بـ ed.",
      "يحفظ ١٥ فعلاً شاذاً شائعاً.",
      "يحكي أحداثاً متسلسلة."
    ],
    "objectivesEn": [
      "Form the past with -ed.",
      "Use 15 common irregular verbs.",
      "Narrate events in sequence."
    ],
    "vocabulary": [
      {
        "word": "went (go)",
        "ipa": "/wɛnt/",
        "ar": "ذهب",
        "exampleEn": "We went to Jeddah.",
        "exampleAr": "رحنا جدة."
      },
      {
        "word": "ate (eat)",
        "ipa": "/eɪt/",
        "ar": "أكل",
        "exampleEn": "I ate kabsa.",
        "exampleAr": "أكلت كبسة."
      },
      {
        "word": "saw (see)",
        "ipa": "/sɔː/",
        "ar": "رأى/شاف",
        "exampleEn": "I saw my friend.",
        "exampleAr": "شفت صديقي."
      },
      {
        "word": "bought (buy)",
        "ipa": "/bɔːt/",
        "ar": "اشترى",
        "exampleEn": "He bought a phone.",
        "exampleAr": "اشترى جوال."
      },
      {
        "word": "came (come)",
        "ipa": "/keɪm/",
        "ar": "جاء/رجع",
        "exampleEn": "She came early.",
        "exampleAr": "جت بدري."
      },
      {
        "word": "had (have)",
        "ipa": "/hæd/",
        "ar": "كان عنده/تناول",
        "exampleEn": "We had lunch at two.",
        "exampleAr": "تغدينا الساعة ثنتين."
      },
      {
        "word": "made (make)",
        "ipa": "/meɪd/",
        "ar": "صنع/سوّى",
        "exampleEn": "Mom made a cake.",
        "exampleAr": "أمي سوت كيكة."
      },
      {
        "word": "took (take)",
        "ipa": "/tʊk/",
        "ar": "أخذ",
        "exampleEn": "I took a taxi.",
        "exampleAr": "أخذت تاكسي."
      },
      {
        "word": "played (play)",
        "ipa": "/pleɪd/",
        "ar": "لعب",
        "exampleEn": "They played padel.",
        "exampleAr": "لعبوا بادل."
      },
      {
        "word": "visited (visit)",
        "ipa": "/ˈvɪzɪtɪd/",
        "ar": "زار",
        "exampleEn": "We visited Grandpa.",
        "exampleAr": "زرنا جدي."
      }
    ],
    "grammarFocus": {
      "ruleAr": "الأفعال المنتظمة نضيف لها ed: played, visited. والشاذة لها شكل خاص لازم يُحفظ: go→went, eat→ate, see→saw.",
      "ruleEn": "Regular verbs add -ed; irregular verbs have special forms to memorise.",
      "formula": "subject + verb-ed / irregular past + past time",
      "examples": [
        {
          "en": "I visited my uncle yesterday.",
          "ar": "زرت عمي أمس."
        },
        {
          "en": "We went to the mall after Isha.",
          "ar": "رحنا المول بعد العشاء."
        },
        {
          "en": "She ate shawarma for dinner.",
          "ar": "أكلت شاورما على العشاء."
        },
        {
          "en": "They saw a great match.",
          "ar": "شافوا مباراة قوية."
        },
        {
          "en": "Then I bought a new game.",
          "ar": "وبعدين اشتريت لعبة جديدة."
        },
        {
          "en": "My father came home late.",
          "ar": "أبوي رجع البيت متأخر."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "What did you do yesterday?",
        "ar": "وش سويت أمس؟"
      },
      {
        "speaker": "Student",
        "en": "In the afternoon I played football with my friends.",
        "ar": "العصر لعبت كورة مع ربعي."
      },
      {
        "speaker": "Sara",
        "en": "Nice! And in the evening?",
        "ar": "حلو! وبالليل؟"
      },
      {
        "speaker": "Student",
        "en": "We went to my grandmother's house. She made jareesh.",
        "ar": "رحنا بيت جدتي. سوت جريش."
      },
      {
        "speaker": "Sara",
        "en": "Yum! Did you stay late?",
        "ar": "يمّي! سهرتوا؟"
      },
      {
        "speaker": "Student",
        "en": "Yes, we came home at midnight.",
        "ar": "إيه، رجعنا البيت نص الليل."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: What did you do yesterday?\nStudent: In the afternoon I played football with my friends.\nSara: Nice! And in the evening?\nStudent: We went to my grandmother's house. She made jareesh.\nSara: Yum! Did you stay late?\nStudent: Yes, we came home at midnight.",
      "questions": [
        {
          "questionAr": "وش لعب؟",
          "questionEn": "What did the student play?",
          "options": [
            "padel",
            "football",
            "PlayStation"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: football"
        },
        {
          "questionAr": "وش سوت الجدة؟",
          "questionEn": "What did the grandmother make?",
          "options": [
            "kabsa",
            "jareesh",
            "cake"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: jareesh"
        },
        {
          "questionAr": "متى رجعوا؟",
          "questionEn": "When did they come home?",
          "options": [
            "at ten",
            "at midnight",
            "in the morning"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: at midnight"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "-ed endings: /t/ walked, /d/ played, /ɪd/ visited",
      "items": [
        "walked /wɔːkt/",
        "played /pleɪd/",
        "visited /ˈvɪzɪtɪd/"
      ],
      "tipAr": "لا تضيف مقطع «إد» لكل فعل: walked = «ووكت» مقطع واحد. «إد» فقط بعد t/d: visited, needed."
    },
    "exercises": {
      "easy": [
        {
          "id": "sg_114_e1",
          "type": "meaning",
          "promptEn": "What does \"went (go)\" mean?",
          "promptAr": "ما معنى \"went (go)\"؟",
          "options": [
            "رأى/شاف",
            "أخذ",
            "ذهب",
            "زار"
          ],
          "correctIndex": 2,
          "answer": "ذهب",
          "explanationAr": "\"went (go)\" /wɛnt/ تعني: ذهب. مثال: We went to Jeddah."
        },
        {
          "id": "sg_114_e2",
          "type": "meaning",
          "promptEn": "What does \"ate (eat)\" mean?",
          "promptAr": "ما معنى \"ate (eat)\"؟",
          "options": [
            "ذهب",
            "أكل",
            "صنع/سوّى",
            "زار"
          ],
          "correctIndex": 1,
          "answer": "أكل",
          "explanationAr": "\"ate (eat)\" /eɪt/ تعني: أكل. مثال: I ate kabsa."
        },
        {
          "id": "sg_114_e3",
          "type": "meaning",
          "promptEn": "What does \"saw (see)\" mean?",
          "promptAr": "ما معنى \"saw (see)\"؟",
          "options": [
            "اشترى",
            "زار",
            "رأى/شاف",
            "جاء/رجع"
          ],
          "correctIndex": 2,
          "answer": "رأى/شاف",
          "explanationAr": "\"saw (see)\" /sɔː/ تعني: رأى/شاف. مثال: I saw my friend."
        },
        {
          "id": "sg_114_e4",
          "type": "meaning",
          "promptEn": "What does \"bought (buy)\" mean?",
          "promptAr": "ما معنى \"bought (buy)\"؟",
          "options": [
            "اشترى",
            "لعب",
            "أخذ",
            "زار"
          ],
          "correctIndex": 0,
          "answer": "اشترى",
          "explanationAr": "\"bought (buy)\" /bɔːt/ تعني: اشترى. مثال: He bought a phone."
        }
      ],
      "medium": [
        {
          "id": "sg_114_m1",
          "type": "gap",
          "promptEn": "Complete: I ____ my uncle yesterday.",
          "promptAr": "أكمل الفراغ: (زرت عمي أمس.)",
          "options": [
            "visit",
            "visited",
            "visits"
          ],
          "correctIndex": 1,
          "answer": "I visited my uncle yesterday.",
          "explanationAr": "الإجابة: visited. الأفعال المنتظمة نضيف لها ed: played, visited. والشاذة لها شكل خاص لازم يُحفظ: go→went, eat→ate, see→saw."
        },
        {
          "id": "sg_114_m2",
          "type": "gap",
          "promptEn": "Complete: We ____ to the mall after Isha.",
          "promptAr": "أكمل الفراغ: (رحنا المول بعد العشاء.)",
          "options": [
            "went",
            "go",
            "goed"
          ],
          "correctIndex": 0,
          "answer": "We went to the mall after Isha.",
          "explanationAr": "الإجابة: went. الأفعال المنتظمة نضيف لها ed: played, visited. والشاذة لها شكل خاص لازم يُحفظ: go→went, eat→ate, see→saw."
        },
        {
          "id": "sg_114_m3",
          "type": "gap",
          "promptEn": "Complete: She ____ shawarma for dinner.",
          "promptAr": "أكمل الفراغ: (أكلت شاورما على العشاء.)",
          "options": [
            "ate",
            "eated",
            "eat"
          ],
          "correctIndex": 0,
          "answer": "She ate shawarma for dinner.",
          "explanationAr": "الإجابة: ate. الأفعال المنتظمة نضيف لها ed: played, visited. والشاذة لها شكل خاص لازم يُحفظ: go→went, eat→ate, see→saw."
        },
        {
          "id": "sg_114_m4",
          "type": "gap",
          "promptEn": "Complete: They ____ a great match.",
          "promptAr": "أكمل الفراغ: (شافوا مباراة قوية.)",
          "options": [
            "saw",
            "seed",
            "seen"
          ],
          "correctIndex": 0,
          "answer": "They saw a great match.",
          "explanationAr": "الإجابة: saw. الأفعال المنتظمة نضيف لها ed: played, visited. والشاذة لها شكل خاص لازم يُحفظ: go→went, eat→ate, see→saw."
        }
      ],
      "hard": [
        {
          "id": "sg_114_h1",
          "type": "order",
          "promptEn": "Put the words in order: Then / new / I / bought / a / game.",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (وبعدين اشتريت لعبة جديدة.)",
          "answer": "Then I bought a new game.",
          "explanationAr": "الترتيب الصحيح: Then I bought a new game."
        },
        {
          "id": "sg_114_h2",
          "type": "order",
          "promptEn": "Put the words in order: came / My / home / father / late.",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (أبوي رجع البيت متأخر.)",
          "answer": "My father came home late.",
          "explanationAr": "الترتيب الصحيح: My father came home late."
        },
        {
          "id": "sg_114_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: رحنا المول بعد العشاء.",
          "answer": "We went to the mall after Isha.",
          "explanationAr": "ترجمة مقترحة: We went to the mall after Isha."
        },
        {
          "id": "sg_114_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: شافوا مباراة قوية.",
          "answer": "They saw a great match.",
          "explanationAr": "ترجمة مقترحة: They saw a great match."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "I was go to the mall.",
        "correct": "I went to the mall.",
        "whyAr": "لا نجمع was مع فعل الماضي."
      },
      {
        "incorrect": "Yesterday I am play.",
        "correct": "Yesterday I played.",
        "whyAr": "الزمن يتحدد بالفعل نفسه."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (Was و Were: الماضي مع be): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I were tired.",
          "I was tired."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I was tired. — I ⇐ was.",
        "fromLessonId": "sg_113"
      },
      {
        "questionAr": "مراجعة (Can و Can't: قدراتك): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I can to swim.",
          "I can swim."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I can swim. — لا نضع to بعد can.",
        "fromLessonId": "sg_111"
      },
      {
        "questionAr": "مراجعة (He works / She studies: حرف s مع الغائب): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "He works in a bank.",
          "He work in a bank."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: He works in a bank. — مع he لازم s؛ هذا أكثر خطأ عند المتعلمين العرب.",
        "fromLessonId": "sg_110"
      },
      {
        "questionAr": "ما معنى \"outside\"؟",
        "questionEn": "What does \"outside\" mean?",
        "options": [
          "يركض",
          "ينتظر",
          "برا/خارج",
          "يستمع"
        ],
        "correctIndex": 2,
        "explanationAr": "\"outside\" /ˌaʊtˈsaɪd/ تعني: برا/خارج. مثال: They're playing outside.",
        "fromLessonId": "sg_112"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (أكلت شاورما على العشاء.)",
          "questionEn": "Complete: She ____ shawarma for dinner.",
          "options": [
            "ate",
            "eated",
            "eat"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: ate. الأفعال المنتظمة نضيف لها ed: played, visited. والشاذة لها شكل خاص لازم يُحفظ: go→went, eat→ate, see→saw."
        },
        {
          "questionAr": "أكمل الفراغ: (شافوا مباراة قوية.)",
          "questionEn": "Complete: They ____ a great match.",
          "options": [
            "saw",
            "seed",
            "seen"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: saw. الأفعال المنتظمة نضيف لها ed: played, visited. والشاذة لها شكل خاص لازم يُحفظ: go→went, eat→ate, see→saw."
        },
        {
          "questionAr": "ما معنى \"came (come)\"؟",
          "questionEn": "What does \"came (come)\" mean?",
          "options": [
            "أكل",
            "اشترى",
            "جاء/رجع",
            "رأى/شاف"
          ],
          "correctIndex": 2,
          "explanationAr": "\"came (come)\" /keɪm/ تعني: جاء/رجع. مثال: She came early."
        },
        {
          "questionAr": "ما معنى \"had (have)\"؟",
          "questionEn": "What does \"had (have)\" mean?",
          "options": [
            "زار",
            "ذهب",
            "أخذ",
            "كان عنده/تناول"
          ],
          "correctIndex": 3,
          "explanationAr": "\"had (have)\" /hæd/ تعني: كان عنده/تناول. مثال: We had lunch at two."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "I was go to the mall.",
            "I went to the mall."
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: I went to the mall. — لا نجمع was مع فعل الماضي."
        }
      ]
    }
  },
  {
    "id": "sg_115",
    "pillarId": "grammar",
    "pillarNameAr": "القواعد التحدثية السريعة",
    "pillarNameEn": "Spoken Grammar & Fast Patterns",
    "pillarIcon": "🧠",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "Did: السؤال والنفي في الماضي",
    "titleEn": "Did: Past Questions and Negatives",
    "descAr": "اسأل Did you...? و Where did you go? وانفِ بـ didn't + فعل أصلي.",
    "descEn": "Ask 'Did you...?/Where did you...?' and negate with didn't + base verb.",
    "speakingGoalAr": "اسأل سارة خمسة أسئلة عن عطلتها وجاوب عن أسئلتها.",
    "speakingGoalEn": "Interview Sara about her weekend with five past questions.",
    "keyPattern": {
      "ruleAr": "السؤال والنفي في الماضي يكون بـ did/didn't، والفعل بعدها يرجع لأصله: Did you go? I didn't eat.",
      "ruleEn": "Past questions and negatives use did/didn't + base verb.",
      "formula": "Did + subject + base verb? | (Wh) + did + subject + base verb? | didn't + base verb"
    },
    "practicalExamples": [
      {
        "en": "Did you watch the match?",
        "ar": "شفت المباراة؟"
      },
      {
        "en": "Where did you go last night?",
        "ar": "وين رحت البارحة؟"
      },
      {
        "en": "I didn't see him.",
        "ar": "ما شفته."
      },
      {
        "en": "What did she buy?",
        "ar": "وش اشترت؟"
      },
      {
        "en": "We didn't travel this summer.",
        "ar": "ما سافرنا هالصيف."
      },
      {
        "en": "Did they enjoy the trip?",
        "ar": "استمتعوا بالرحلة؟"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Did you went?",
        "correct": "Did you go?",
        "whyAr": "بعد did الفعل أصلي."
      },
      {
        "incorrect": "I didn't saw it.",
        "correct": "I didn't see it.",
        "whyAr": "didn't + فعل أصلي."
      },
      {
        "incorrect": "Where you went?",
        "correct": "Where did you go?",
        "whyAr": "سؤال wh في الماضي يحتاج did."
      }
    ],
    "speakingChallenge": {
      "promptAr": "أجرِ مقابلة مع سارة عن عطلتها.",
      "promptEn": "Interview Sara about her weekend.",
      "saraQuestionAr": "اسألني عن الويكند حقي!",
      "saraQuestionEn": "Ask me about my weekend!",
      "recommendedResponseEn": "Where did you go? What did you eat? Did you meet your friends? Did you enjoy it?"
    },
    "quiz": [
      {
        "questionAr": "أكمل: What time ___ you wake up?",
        "questionEn": "Complete: What time ___ you wake up?",
        "options": [
          "did",
          "was",
          "do"
        ],
        "correctIndex": 0,
        "explanationAr": "سؤال ماضي ⇐ did (إذا كان عن أمس)."
      },
      {
        "questionAr": "النفي الصحيح:",
        "questionEn": "Correct negative:",
        "options": [
          "She didn't came.",
          "She didn't come.",
          "She not came."
        ],
        "correctIndex": 1,
        "explanationAr": "didn't + come."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Did you go?",
          "Did you went?"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Did you go? — بعد did الفعل أصلي."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I didn't saw it.",
          "I didn't see it."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I didn't see it. — didn't + فعل أصلي."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Where you went?",
          "Where did you go?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Where did you go? — سؤال wh في الماضي يحتاج did."
      }
    ],
    "whiteboardNotes": {
      "title": "Did: Past Questions and Negatives",
      "pointsAr": [
        "يكوّن أسئلة الماضي بـ did.",
        "يرجع الفعل لأصله بعد did/didn't.",
        "يجري مقابلة قصيرة عن الماضي.",
        "السؤال والنفي في الماضي يكون بـ did/didn't، والفعل بعدها يرجع لأصله: Did you go? I didn't eat."
      ],
      "pointsEn": [
        "Form past questions with did.",
        "Use the base verb after did/didn't.",
        "Run a short past-tense interview.",
        "Past questions and negatives use did/didn't + base verb."
      ],
      "chalkHighlight": "Did + subject + base verb? | (Wh) + did + subject + base verb? | didn't + base verb"
    },
    "unit": 3,
    "cefr": "A2",
    "objectivesAr": [
      "يكوّن أسئلة الماضي بـ did.",
      "يرجع الفعل لأصله بعد did/didn't.",
      "يجري مقابلة قصيرة عن الماضي."
    ],
    "objectivesEn": [
      "Form past questions with did.",
      "Use the base verb after did/didn't.",
      "Run a short past-tense interview."
    ],
    "vocabulary": [
      {
        "word": "enjoy",
        "ipa": "/ɪnˈdʒɔɪ/",
        "ar": "يستمتع",
        "exampleEn": "Did you enjoy it?",
        "exampleAr": "استمتعت؟"
      },
      {
        "word": "travel",
        "ipa": "/ˈtrævəl/",
        "ar": "يسافر",
        "exampleEn": "We didn't travel.",
        "exampleAr": "ما سافرنا."
      },
      {
        "word": "match",
        "ipa": "/mætʃ/",
        "ar": "مباراة",
        "exampleEn": "Did you watch the match?",
        "exampleAr": "شفت المباراة؟"
      },
      {
        "word": "last night",
        "ipa": "/læst naɪt/",
        "ar": "البارحة بالليل",
        "exampleEn": "Where were you last night?",
        "exampleAr": "وين كنت البارحة؟"
      },
      {
        "word": "stay",
        "ipa": "/steɪ/",
        "ar": "يبقى/يجلس",
        "exampleEn": "We stayed at home.",
        "exampleAr": "جلسنا في البيت."
      },
      {
        "word": "forget",
        "ipa": "/fərˈɡɛt/",
        "ar": "ينسى",
        "exampleEn": "I didn't forget.",
        "exampleAr": "ما نسيت."
      },
      {
        "word": "call",
        "ipa": "/kɔːl/",
        "ar": "يتصل",
        "exampleEn": "Did he call you?",
        "exampleAr": "اتصل عليك؟"
      },
      {
        "word": "win",
        "ipa": "/wɪn/",
        "ar": "يفوز",
        "exampleEn": "Did your team win?",
        "exampleAr": "فاز فريقك؟"
      },
      {
        "word": "lose",
        "ipa": "/luːz/",
        "ar": "يخسر",
        "exampleEn": "We didn't lose.",
        "exampleAr": "ما خسرنا."
      },
      {
        "word": "score",
        "ipa": "/skɔːr/",
        "ar": "يسجل هدف",
        "exampleEn": "Who scored?",
        "exampleAr": "مين سجل؟"
      }
    ],
    "grammarFocus": {
      "ruleAr": "السؤال والنفي في الماضي يكون بـ did/didn't، والفعل بعدها يرجع لأصله: Did you go? I didn't eat.",
      "ruleEn": "Past questions and negatives use did/didn't + base verb.",
      "formula": "Did + subject + base verb? | (Wh) + did + subject + base verb? | didn't + base verb",
      "examples": [
        {
          "en": "Did you watch the match?",
          "ar": "شفت المباراة؟"
        },
        {
          "en": "Where did you go last night?",
          "ar": "وين رحت البارحة؟"
        },
        {
          "en": "I didn't see him.",
          "ar": "ما شفته."
        },
        {
          "en": "What did she buy?",
          "ar": "وش اشترت؟"
        },
        {
          "en": "We didn't travel this summer.",
          "ar": "ما سافرنا هالصيف."
        },
        {
          "en": "Did they enjoy the trip?",
          "ar": "استمتعوا بالرحلة؟"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Did you watch the Hilal match last night?",
        "ar": "شفت مباراة الهلال البارحة؟"
      },
      {
        "speaker": "Student",
        "en": "Yes, I did! Did you?",
        "ar": "إيه! وأنتي؟"
      },
      {
        "speaker": "Sara",
        "en": "No, I didn't. Did they win?",
        "ar": "لا ما شفتها. فازوا؟"
      },
      {
        "speaker": "Student",
        "en": "Yes, they won two-one.",
        "ar": "إيه، فازوا ٢-١."
      },
      {
        "speaker": "Sara",
        "en": "Who scored?",
        "ar": "مين سجل؟"
      },
      {
        "speaker": "Student",
        "en": "Salem scored the second goal. It was amazing!",
        "ar": "سالم سجل الهدف الثاني. كان رهيب!"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Did you watch the Hilal match last night?\nStudent: Yes, I did! Did you?\nSara: No, I didn't. Did they win?\nStudent: Yes, they won two-one.\nSara: Who scored?\nStudent: Salem scored the second goal. It was amazing!",
      "questions": [
        {
          "questionAr": "شافت سارة المباراة؟",
          "questionEn": "Did Sara watch the match?",
          "options": [
            "Yes",
            "No"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: No"
        },
        {
          "questionAr": "كم النتيجة؟",
          "questionEn": "What was the score?",
          "options": [
            "1-1",
            "2-1",
            "3-0"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: 2-1"
        },
        {
          "questionAr": "مين سجل الثاني؟",
          "questionEn": "Who scored the second goal?",
          "options": [
            "Salem",
            "Faisal",
            "Ali"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: Salem"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Linking 'did you' → /dɪdʒuː/",
      "items": [
        "Did you /ˈdɪdʒə/",
        "What did you /ˈwʌdɪdʒə/",
        "didn't /ˈdɪdənt/"
      ],
      "tipAr": "في الكلام السريع Did you تصير «دِجو» وWhat did you تصير «وَدِجا»."
    },
    "exercises": {
      "easy": [
        {
          "id": "sg_115_e1",
          "type": "meaning",
          "promptEn": "What does \"enjoy\" mean?",
          "promptAr": "ما معنى \"enjoy\"؟",
          "options": [
            "مباراة",
            "يبقى/يجلس",
            "البارحة بالليل",
            "يستمتع"
          ],
          "correctIndex": 3,
          "answer": "يستمتع",
          "explanationAr": "\"enjoy\" /ɪnˈdʒɔɪ/ تعني: يستمتع. مثال: Did you enjoy it?"
        },
        {
          "id": "sg_115_e2",
          "type": "meaning",
          "promptEn": "What does \"travel\" mean?",
          "promptAr": "ما معنى \"travel\"؟",
          "options": [
            "يسجل هدف",
            "يبقى/يجلس",
            "يسافر",
            "يفوز"
          ],
          "correctIndex": 2,
          "answer": "يسافر",
          "explanationAr": "\"travel\" /ˈtrævəl/ تعني: يسافر. مثال: We didn't travel."
        },
        {
          "id": "sg_115_e3",
          "type": "meaning",
          "promptEn": "What does \"match\" mean?",
          "promptAr": "ما معنى \"match\"؟",
          "options": [
            "مباراة",
            "البارحة بالليل",
            "يسافر",
            "يستمتع"
          ],
          "correctIndex": 0,
          "answer": "مباراة",
          "explanationAr": "\"match\" /mætʃ/ تعني: مباراة. مثال: Did you watch the match?"
        },
        {
          "id": "sg_115_e4",
          "type": "meaning",
          "promptEn": "What does \"last night\" mean?",
          "promptAr": "ما معنى \"last night\"؟",
          "options": [
            "البارحة بالليل",
            "يستمتع",
            "يسافر",
            "يخسر"
          ],
          "correctIndex": 0,
          "answer": "البارحة بالليل",
          "explanationAr": "\"last night\" /læst naɪt/ تعني: البارحة بالليل. مثال: Where were you last night?"
        }
      ],
      "medium": [
        {
          "id": "sg_115_m1",
          "type": "gap",
          "promptEn": "Complete: ____ you watch the match?",
          "promptAr": "أكمل الفراغ: (شفت المباراة؟)",
          "options": [
            "Do",
            "Were",
            "Did"
          ],
          "correctIndex": 2,
          "answer": "Did you watch the match?",
          "explanationAr": "الإجابة: Did. السؤال والنفي في الماضي يكون بـ did/didn't، والفعل بعدها يرجع لأصله: Did you go? I didn't eat."
        },
        {
          "id": "sg_115_m2",
          "type": "gap",
          "promptEn": "Complete: Where did you ____ last night?",
          "promptAr": "أكمل الفراغ: (وين رحت البارحة؟)",
          "options": [
            "went",
            "go",
            "goes"
          ],
          "correctIndex": 1,
          "answer": "Where did you go last night?",
          "explanationAr": "الإجابة: go. السؤال والنفي في الماضي يكون بـ did/didn't، والفعل بعدها يرجع لأصله: Did you go? I didn't eat."
        },
        {
          "id": "sg_115_m3",
          "type": "gap",
          "promptEn": "Complete: I ____ see him.",
          "promptAr": "أكمل الفراغ: (ما شفته.)",
          "options": [
            "didn't",
            "don't",
            "wasn't"
          ],
          "correctIndex": 0,
          "answer": "I didn't see him.",
          "explanationAr": "الإجابة: didn't. السؤال والنفي في الماضي يكون بـ did/didn't، والفعل بعدها يرجع لأصله: Did you go? I didn't eat."
        },
        {
          "id": "sg_115_m4",
          "type": "gap",
          "promptEn": "Complete: What did she ____?",
          "promptAr": "أكمل الفراغ: (وش اشترت؟)",
          "options": [
            "buy",
            "buys",
            "bought"
          ],
          "correctIndex": 0,
          "answer": "What did she buy?",
          "explanationAr": "الإجابة: buy. السؤال والنفي في الماضي يكون بـ did/didn't، والفعل بعدها يرجع لأصله: Did you go? I didn't eat."
        }
      ],
      "hard": [
        {
          "id": "sg_115_h1",
          "type": "order",
          "promptEn": "Put the words in order: this / summer. / We / didn't / travel",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (ما سافرنا هالصيف.)",
          "answer": "We didn't travel this summer.",
          "explanationAr": "الترتيب الصحيح: We didn't travel this summer."
        },
        {
          "id": "sg_115_h2",
          "type": "order",
          "promptEn": "Put the words in order: trip? / they / the / enjoy / Did",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (استمتعوا بالرحلة؟)",
          "answer": "Did they enjoy the trip?",
          "explanationAr": "الترتيب الصحيح: Did they enjoy the trip?"
        },
        {
          "id": "sg_115_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: وين رحت البارحة؟",
          "answer": "Where did you go last night?",
          "explanationAr": "ترجمة مقترحة: Where did you go last night?"
        },
        {
          "id": "sg_115_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: وش اشترت؟",
          "answer": "What did she buy?",
          "explanationAr": "ترجمة مقترحة: What did she buy?"
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "You went to the mall yesterday?",
        "correct": "Did you go to the mall yesterday?",
        "whyAr": "في الكتابة لا نكتفي بنبرة السؤال كما في العربي."
      },
      {
        "incorrect": "I not went.",
        "correct": "I didn't go.",
        "whyAr": "النفي بـ didn't + فعل أصلي."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (الماضي البسيط: أفعال منتظمة وشاذة): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Yesterday I play football.",
          "Yesterday I played football."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Yesterday I played football. — مع yesterday لازم الماضي.",
        "fromLessonId": "sg_114"
      },
      {
        "questionAr": "مراجعة (المضارع المستمر: وش تسوي الحين؟): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'm studying now.",
          "I studying now."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I'm studying now. — لا تنسَ am/is/are قبل ing.",
        "fromLessonId": "sg_112"
      },
      {
        "questionAr": "مراجعة (Do و Does: السؤال والنفي في المضارع): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Does he play football?",
          "Does he plays football?"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Does he play football? — بعد does الفعل يرجع لأصله.",
        "fromLessonId": "sg_120_s"
      },
      {
        "questionAr": "ما معنى \"fun\"؟",
        "questionEn": "What does \"fun\" mean?",
        "options": [
          "زحمة",
          "أمس",
          "ممتع/وناسة",
          "قبل (مدة)"
        ],
        "correctIndex": 2,
        "explanationAr": "\"fun\" /fʌn/ تعني: ممتع/وناسة. مثال: It was fun!",
        "fromLessonId": "sg_113"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (ما شفته.)",
          "questionEn": "Complete: I ____ see him.",
          "options": [
            "didn't",
            "don't",
            "wasn't"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: didn't. السؤال والنفي في الماضي يكون بـ did/didn't، والفعل بعدها يرجع لأصله: Did you go? I didn't eat."
        },
        {
          "questionAr": "أكمل الفراغ: (وش اشترت؟)",
          "questionEn": "Complete: What did she ____?",
          "options": [
            "buy",
            "buys",
            "bought"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: buy. السؤال والنفي في الماضي يكون بـ did/didn't، والفعل بعدها يرجع لأصله: Did you go? I didn't eat."
        },
        {
          "questionAr": "ما معنى \"stay\"؟",
          "questionEn": "What does \"stay\" mean?",
          "options": [
            "يبقى/يجلس",
            "يستمتع",
            "يسجل هدف",
            "يسافر"
          ],
          "correctIndex": 0,
          "explanationAr": "\"stay\" /steɪ/ تعني: يبقى/يجلس. مثال: We stayed at home."
        },
        {
          "questionAr": "ما معنى \"forget\"؟",
          "questionEn": "What does \"forget\" mean?",
          "options": [
            "ينسى",
            "يفوز",
            "يتصل",
            "يخسر"
          ],
          "correctIndex": 0,
          "explanationAr": "\"forget\" /fərˈɡɛt/ تعني: ينسى. مثال: I didn't forget."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Did you go to the mall yesterday?",
            "You went to the mall yesterday?"
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: Did you go to the mall yesterday? — في الكتابة لا نكتفي بنبرة السؤال كما في العربي."
        }
      ]
    }
  },
  {
    "id": "sg_116",
    "pillarId": "grammar",
    "pillarNameAr": "القواعد التحدثية السريعة",
    "pillarNameEn": "Spoken Grammar & Fast Patterns",
    "pillarIcon": "🧠",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "Some / Any / How much / How many: في السوبرماركت",
    "titleEn": "Some, Any, How Much, How Many: At the Supermarket",
    "descAr": "الفرق بين المعدود وغير المعدود، واستخدام some/any/much/many أثناء التسوق.",
    "descEn": "Countable vs uncountable nouns with some/any/much/many while shopping.",
    "speakingGoalAr": "اكتب قائمة مقاضي واسأل عن الكميات.",
    "speakingGoalEn": "Make a shopping list and ask about quantities.",
    "keyPattern": {
      "ruleAr": "المعدود له جمع (apples) ونسأل بـ How many، وغير المعدود ما له جمع (rice, milk) ونسأل بـ How much. some في الإيجاب، و any في النفي والسؤال.",
      "ruleEn": "Countable nouns have plurals (How many); uncountable don't (How much). some in positives, any in negatives/questions.",
      "formula": "some + noun (+) | any + noun (- / ?) | How many + plural / How much + uncountable"
    },
    "practicalExamples": [
      {
        "en": "We need some rice and some eggs.",
        "ar": "نحتاج رز وبيض."
      },
      {
        "en": "Is there any milk in the fridge?",
        "ar": "فيه حليب في الثلاجة؟"
      },
      {
        "en": "How many apples do you want?",
        "ar": "كم تفاحة تبي؟"
      },
      {
        "en": "How much sugar do we have?",
        "ar": "كم عندنا سكر؟"
      },
      {
        "en": "We don't have any bread.",
        "ar": "ما عندنا خبز."
      },
      {
        "en": "Can I have a bottle of water?",
        "ar": "ممكن قارورة ماء؟"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "I want a rice.",
        "correct": "I want some rice.",
        "whyAr": "rice غير معدود؛ ما نقول a rice."
      },
      {
        "incorrect": "How many milk?",
        "correct": "How much milk?",
        "whyAr": "milk غير معدود ⇐ How much."
      },
      {
        "incorrect": "We don't have some bread.",
        "correct": "We don't have any bread.",
        "whyAr": "في النفي نستخدم any."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اكتب مع سارة قائمة مقاضي لعزيمة.",
      "promptEn": "Plan a shopping list for a family dinner.",
      "saraQuestionAr": "عندنا عزيمة! وش نحتاج من السوبرماركت؟",
      "saraQuestionEn": "We have guests! What do we need from the supermarket?",
      "recommendedResponseEn": "We need some rice, two chickens and some vegetables. We don't have any dates. How much juice do we need?"
    },
    "quiz": [
      {
        "questionAr": "أي كلمة غير معدودة؟",
        "questionEn": "Which noun is uncountable?",
        "options": [
          "apple",
          "egg",
          "sugar"
        ],
        "correctIndex": 2,
        "explanationAr": "sugar غير معدود."
      },
      {
        "questionAr": "أكمل: Are there ___ oranges?",
        "questionEn": "Complete: Are there ___ oranges?",
        "options": [
          "some",
          "any",
          "much"
        ],
        "correctIndex": 1,
        "explanationAr": "سؤال ⇐ any."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I want some rice.",
          "I want a rice."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I want some rice. — rice غير معدود؛ ما نقول a rice."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "How many milk?",
          "How much milk?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: How much milk? — milk غير معدود ⇐ How much."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "We don't have some bread.",
          "We don't have any bread."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: We don't have any bread. — في النفي نستخدم any."
      }
    ],
    "whiteboardNotes": {
      "title": "Some, Any, How Much, How Many: At the Supermarket",
      "pointsAr": [
        "يميز المعدود من غير المعدود.",
        "يستخدم some و any.",
        "يسأل عن الكمية بـ How much/How many.",
        "المعدود له جمع (apples) ونسأل بـ How many، وغير المعدود ما له جمع (rice, milk) ونسأل بـ How much. some في الإيجاب، و any في النفي والسؤال."
      ],
      "pointsEn": [
        "Tell countable from uncountable.",
        "Use some and any.",
        "Ask about quantity.",
        "Countable nouns have plurals (How many); uncountable don't (How much). some in positives, any in negatives/questions."
      ],
      "chalkHighlight": "some + noun (+) | any + noun (- / ?) | How many + plural / How much + uncountable"
    },
    "unit": 4,
    "cefr": "A2",
    "objectivesAr": [
      "يميز المعدود من غير المعدود.",
      "يستخدم some و any.",
      "يسأل عن الكمية بـ How much/How many."
    ],
    "objectivesEn": [
      "Tell countable from uncountable.",
      "Use some and any.",
      "Ask about quantity."
    ],
    "vocabulary": [
      {
        "word": "rice",
        "ipa": "/raɪs/",
        "ar": "رز",
        "exampleEn": "We need rice.",
        "exampleAr": "نحتاج رز."
      },
      {
        "word": "milk",
        "ipa": "/mɪlk/",
        "ar": "حليب",
        "exampleEn": "Is there any milk?",
        "exampleAr": "فيه حليب؟"
      },
      {
        "word": "bread",
        "ipa": "/brɛd/",
        "ar": "خبز",
        "exampleEn": "Buy some bread.",
        "exampleAr": "اشترِ خبز."
      },
      {
        "word": "eggs",
        "ipa": "/ɛɡz/",
        "ar": "بيض",
        "exampleEn": "Six eggs, please.",
        "exampleAr": "ست بيضات لو سمحت."
      },
      {
        "word": "sugar",
        "ipa": "/ˈʃʊɡər/",
        "ar": "سكر",
        "exampleEn": "No sugar, please.",
        "exampleAr": "بدون سكر."
      },
      {
        "word": "chicken",
        "ipa": "/ˈtʃɪkɪn/",
        "ar": "دجاج",
        "exampleEn": "We need chicken for kabsa.",
        "exampleAr": "نحتاج دجاج للكبسة."
      },
      {
        "word": "bottle",
        "ipa": "/ˈbɑːtəl/",
        "ar": "قارورة",
        "exampleEn": "a bottle of water",
        "exampleAr": "قارورة ماء"
      },
      {
        "word": "kilo",
        "ipa": "/ˈkiːloʊ/",
        "ar": "كيلو",
        "exampleEn": "a kilo of tomatoes",
        "exampleAr": "كيلو طماط"
      },
      {
        "word": "fridge",
        "ipa": "/frɪdʒ/",
        "ar": "ثلاجة",
        "exampleEn": "The milk is in the fridge.",
        "exampleAr": "الحليب في الثلاجة."
      },
      {
        "word": "cashier",
        "ipa": "/kæˈʃɪr/",
        "ar": "كاشير/محاسب",
        "exampleEn": "Pay at the cashier.",
        "exampleAr": "ادفع عند الكاشير."
      }
    ],
    "grammarFocus": {
      "ruleAr": "المعدود له جمع (apples) ونسأل بـ How many، وغير المعدود ما له جمع (rice, milk) ونسأل بـ How much. some في الإيجاب، و any في النفي والسؤال.",
      "ruleEn": "Countable nouns have plurals (How many); uncountable don't (How much). some in positives, any in negatives/questions.",
      "formula": "some + noun (+) | any + noun (- / ?) | How many + plural / How much + uncountable",
      "examples": [
        {
          "en": "We need some rice and some eggs.",
          "ar": "نحتاج رز وبيض."
        },
        {
          "en": "Is there any milk in the fridge?",
          "ar": "فيه حليب في الثلاجة؟"
        },
        {
          "en": "How many apples do you want?",
          "ar": "كم تفاحة تبي؟"
        },
        {
          "en": "How much sugar do we have?",
          "ar": "كم عندنا سكر؟"
        },
        {
          "en": "We don't have any bread.",
          "ar": "ما عندنا خبز."
        },
        {
          "en": "Can I have a bottle of water?",
          "ar": "ممكن قارورة ماء؟"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Let's make a shopping list. Do we need any rice?",
        "ar": "خلنا نكتب المقاضي. نحتاج رز؟"
      },
      {
        "speaker": "Student",
        "en": "Yes, we need a big bag of rice and some chicken.",
        "ar": "إيه، كيس رز كبير ودجاج."
      },
      {
        "speaker": "Sara",
        "en": "How many eggs do we need?",
        "ar": "كم بيضة نحتاج؟"
      },
      {
        "speaker": "Student",
        "en": "Twelve eggs. And we don't have any milk.",
        "ar": "١٢ بيضة. وما عندنا حليب."
      },
      {
        "speaker": "Sara",
        "en": "How much milk should I buy?",
        "ar": "كم حليب أشتري؟"
      },
      {
        "speaker": "Student",
        "en": "Two bottles, please. And some bread.",
        "ar": "قارورتين لو سمحتي. وشوية خبز."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Let's make a shopping list. Do we need any rice?\nStudent: Yes, we need a big bag of rice and some chicken.\nSara: How many eggs do we need?\nStudent: Twelve eggs. And we don't have any milk.\nSara: How much milk should I buy?\nStudent: Two bottles, please. And some bread.",
      "questions": [
        {
          "questionAr": "كم بيضة؟",
          "questionEn": "How many eggs do they need?",
          "options": [
            "six",
            "ten",
            "twelve"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: twelve"
        },
        {
          "questionAr": "كم حليب؟",
          "questionEn": "How much milk?",
          "options": [
            "one bottle",
            "two bottles",
            "three bottles"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: two bottles"
        },
        {
          "questionAr": "وش معه؟",
          "questionEn": "What do they need for the rice?",
          "options": [
            "chicken",
            "fish",
            "meat"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: chicken"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Linking 'some' and 'any' + vowel",
      "items": [
        "some eggs /səmɛɡz/",
        "any apples /ɛniˈæpəlz/",
        "a bottle of /ə ˈbɑːtələv/"
      ],
      "tipAr": "اربط آخر الكلمة بأول اللي بعدها إذا بدأت بحرف متحرك: «سَمِگز»."
    },
    "exercises": {
      "easy": [
        {
          "id": "sg_116_e1",
          "type": "meaning",
          "promptEn": "What does \"rice\" mean?",
          "promptAr": "ما معنى \"rice\"؟",
          "options": [
            "رز",
            "خبز",
            "سكر",
            "قارورة"
          ],
          "correctIndex": 0,
          "answer": "رز",
          "explanationAr": "\"rice\" /raɪs/ تعني: رز. مثال: We need rice."
        },
        {
          "id": "sg_116_e2",
          "type": "meaning",
          "promptEn": "What does \"milk\" mean?",
          "promptAr": "ما معنى \"milk\"؟",
          "options": [
            "خبز",
            "سكر",
            "ثلاجة",
            "حليب"
          ],
          "correctIndex": 3,
          "answer": "حليب",
          "explanationAr": "\"milk\" /mɪlk/ تعني: حليب. مثال: Is there any milk?"
        },
        {
          "id": "sg_116_e3",
          "type": "meaning",
          "promptEn": "What does \"bread\" mean?",
          "promptAr": "ما معنى \"bread\"؟",
          "options": [
            "ثلاجة",
            "رز",
            "خبز",
            "دجاج"
          ],
          "correctIndex": 2,
          "answer": "خبز",
          "explanationAr": "\"bread\" /brɛd/ تعني: خبز. مثال: Buy some bread."
        },
        {
          "id": "sg_116_e4",
          "type": "meaning",
          "promptEn": "What does \"eggs\" mean?",
          "promptAr": "ما معنى \"eggs\"؟",
          "options": [
            "قارورة",
            "حليب",
            "رز",
            "بيض"
          ],
          "correctIndex": 3,
          "answer": "بيض",
          "explanationAr": "\"eggs\" /ɛɡz/ تعني: بيض. مثال: Six eggs, please."
        }
      ],
      "medium": [
        {
          "id": "sg_116_m1",
          "type": "gap",
          "promptEn": "Complete: We need ____ rice and some eggs.",
          "promptAr": "أكمل الفراغ: (نحتاج رز وبيض.)",
          "options": [
            "any",
            "a",
            "some"
          ],
          "correctIndex": 2,
          "answer": "We need some rice and some eggs.",
          "explanationAr": "الإجابة: some. المعدود له جمع (apples) ونسأل بـ How many، وغير المعدود ما له جمع (rice, milk) ونسأل بـ How much. some في الإيجاب، و any في النفي والسؤال."
        },
        {
          "id": "sg_116_m2",
          "type": "gap",
          "promptEn": "Complete: Is there ____ milk in the fridge?",
          "promptAr": "أكمل الفراغ: (فيه حليب في الثلاجة؟)",
          "options": [
            "any",
            "some",
            "a"
          ],
          "correctIndex": 0,
          "answer": "Is there any milk in the fridge?",
          "explanationAr": "الإجابة: any. المعدود له جمع (apples) ونسأل بـ How many، وغير المعدود ما له جمع (rice, milk) ونسأل بـ How much. some في الإيجاب، و any في النفي والسؤال."
        },
        {
          "id": "sg_116_m3",
          "type": "gap",
          "promptEn": "Complete: ____ apples do you want?",
          "promptAr": "أكمل الفراغ: (كم تفاحة تبي؟)",
          "options": [
            "How many",
            "How",
            "How much"
          ],
          "correctIndex": 0,
          "answer": "How many apples do you want?",
          "explanationAr": "الإجابة: How many. المعدود له جمع (apples) ونسأل بـ How many، وغير المعدود ما له جمع (rice, milk) ونسأل بـ How much. some في الإيجاب، و any في النفي والسؤال."
        },
        {
          "id": "sg_116_m4",
          "type": "gap",
          "promptEn": "Complete: ____ sugar do we have?",
          "promptAr": "أكمل الفراغ: (كم عندنا سكر؟)",
          "options": [
            "How much",
            "How many",
            "How"
          ],
          "correctIndex": 0,
          "answer": "How much sugar do we have?",
          "explanationAr": "الإجابة: How much. المعدود له جمع (apples) ونسأل بـ How many، وغير المعدود ما له جمع (rice, milk) ونسأل بـ How much. some في الإيجاب، و any في النفي والسؤال."
        }
      ],
      "hard": [
        {
          "id": "sg_116_h1",
          "type": "order",
          "promptEn": "Put the words in order: We / don't / bread. / any / have",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (ما عندنا خبز.)",
          "answer": "We don't have any bread.",
          "explanationAr": "الترتيب الصحيح: We don't have any bread."
        },
        {
          "id": "sg_116_h2",
          "type": "order",
          "promptEn": "Put the words in order: of / I / bottle / Can / have / water? / a",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (ممكن قارورة ماء؟)",
          "answer": "Can I have a bottle of water?",
          "explanationAr": "الترتيب الصحيح: Can I have a bottle of water?"
        },
        {
          "id": "sg_116_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: فيه حليب في الثلاجة؟",
          "answer": "Is there any milk in the fridge?",
          "explanationAr": "ترجمة مقترحة: Is there any milk in the fridge?"
        },
        {
          "id": "sg_116_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: كم عندنا سكر؟",
          "answer": "How much sugar do we have?",
          "explanationAr": "ترجمة مقترحة: How much sugar do we have?"
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "I want two breads.",
        "correct": "I want two loaves of bread. / I want some bread.",
        "whyAr": "bread غير معدود بالإنجليزي حتى لو نعده بالعربي."
      },
      {
        "incorrect": "Give me a water.",
        "correct": "Can I have a bottle of water?",
        "whyAr": "water غير معدود، ونطلب بأدب."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (Did: السؤال والنفي في الماضي): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I didn't saw it.",
          "I didn't see it."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I didn't see it. — didn't + فعل أصلي.",
        "fromLessonId": "sg_115"
      },
      {
        "questionAr": "مراجعة (Was و Were: الماضي مع be): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "We was in Jeddah.",
          "We were in Jeddah."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: We were in Jeddah. — we ⇐ were.",
        "fromLessonId": "sg_113"
      },
      {
        "questionAr": "مراجعة (Always / usually / never: كم مرة تسويها؟): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I go always to school by bus.",
          "I always go to school by bus."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I always go to school by bus. — كلمة التكرار قبل الفعل الأساسي.",
        "fromLessonId": "sg_102"
      },
      {
        "questionAr": "ما معنى \"visited (visit)\"؟",
        "questionEn": "What does \"visited (visit)\" mean?",
        "options": [
          "جاء/رجع",
          "زار",
          "أكل",
          "أخذ"
        ],
        "correctIndex": 1,
        "explanationAr": "\"visited (visit)\" /ˈvɪzɪtɪd/ تعني: زار. مثال: We visited Grandpa.",
        "fromLessonId": "sg_114"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (كم تفاحة تبي؟)",
          "questionEn": "Complete: ____ apples do you want?",
          "options": [
            "How many",
            "How",
            "How much"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: How many. المعدود له جمع (apples) ونسأل بـ How many، وغير المعدود ما له جمع (rice, milk) ونسأل بـ How much. some في الإيجاب، و any في النفي والسؤال."
        },
        {
          "questionAr": "أكمل الفراغ: (كم عندنا سكر؟)",
          "questionEn": "Complete: ____ sugar do we have?",
          "options": [
            "How much",
            "How many",
            "How"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: How much. المعدود له جمع (apples) ونسأل بـ How many، وغير المعدود ما له جمع (rice, milk) ونسأل بـ How much. some في الإيجاب، و any في النفي والسؤال."
        },
        {
          "questionAr": "ما معنى \"sugar\"؟",
          "questionEn": "What does \"sugar\" mean?",
          "options": [
            "خبز",
            "قارورة",
            "سكر",
            "ثلاجة"
          ],
          "correctIndex": 2,
          "explanationAr": "\"sugar\" /ˈʃʊɡər/ تعني: سكر. مثال: No sugar, please."
        },
        {
          "questionAr": "ما معنى \"chicken\"؟",
          "questionEn": "What does \"chicken\" mean?",
          "options": [
            "دجاج",
            "سكر",
            "بيض",
            "ثلاجة"
          ],
          "correctIndex": 0,
          "explanationAr": "\"chicken\" /ˈtʃɪkɪn/ تعني: دجاج. مثال: We need chicken for kabsa."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "I want two loaves of bread. / I want some bread.",
            "I want two breads."
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: I want two loaves of bread. / I want some bread. — bread غير معدود بالإنجليزي حتى لو نعده بالعربي."
        }
      ]
    }
  },
  {
    "id": "sg_117",
    "pillarId": "grammar",
    "pillarNameAr": "القواعد التحدثية السريعة",
    "pillarNameEn": "Spoken Grammar & Fast Patterns",
    "pillarIcon": "🧠",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "المقارنة: bigger than / more expensive than",
    "titleEn": "Comparatives: Bigger Than, More Expensive Than",
    "descAr": "قارن بين مدينتين وجوالين وفريقين باستخدام صيغة المقارنة.",
    "descEn": "Compare two cities, phones or teams.",
    "speakingGoalAr": "قارن بين مدينتك ومدينة ثانية في خمس جمل.",
    "speakingGoalEn": "Compare your city with another in five sentences.",
    "keyPattern": {
      "ruleAr": "الصفة القصيرة نضيف لها er + than: taller than. الطويلة more + الصفة + than: more expensive than. شواذ: good→better, bad→worse.",
      "ruleEn": "Short adjectives add -er + than; long ones use more + adjective + than. good→better, bad→worse.",
      "formula": "adj-er + than | more + adj + than | better/worse + than"
    },
    "practicalExamples": [
      {
        "en": "Riyadh is bigger than Abha.",
        "ar": "الرياض أكبر من أبها."
      },
      {
        "en": "Abha is cooler than Riyadh in summer.",
        "ar": "أبها أبرد من الرياض في الصيف."
      },
      {
        "en": "This phone is more expensive than that one.",
        "ar": "هالجوال أغلى من ذاك."
      },
      {
        "en": "My English is better than last year.",
        "ar": "إنجليزيي أحسن من السنة الماضية."
      },
      {
        "en": "The traffic today is worse than yesterday.",
        "ar": "الزحمة اليوم أسوأ من أمس."
      },
      {
        "en": "Is Jeddah hotter than Dammam?",
        "ar": "جدة أحر من الدمام؟"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Riyadh is bigger from Abha.",
        "correct": "Riyadh is bigger than Abha.",
        "whyAr": "«من» في المقارنة = than وليس from."
      },
      {
        "incorrect": "This is more cheaper.",
        "correct": "This is cheaper.",
        "whyAr": "لا نجمع more مع er."
      },
      {
        "incorrect": "He is gooder than me.",
        "correct": "He is better than me.",
        "whyAr": "good شاذة ⇐ better."
      }
    ],
    "speakingChallenge": {
      "promptAr": "قارن لسارة بين مدينتين تعرفهم.",
      "promptEn": "Compare two cities you know.",
      "saraQuestionAr": "قارن لي بين مدينتك ومدينة ثانية!",
      "saraQuestionEn": "Compare your city with another city!",
      "recommendedResponseEn": "Riyadh is bigger than Abha, but Abha is cooler and greener. Riyadh is more exciting. The traffic in Riyadh is worse."
    },
    "quiz": [
      {
        "questionAr": "مقارنة beautiful:",
        "questionEn": "Comparative of 'beautiful':",
        "options": [
          "beautifuler",
          "more beautiful",
          "most beautiful"
        ],
        "correctIndex": 1,
        "explanationAr": "صفة طويلة ⇐ more."
      },
      {
        "questionAr": "مقارنة bad:",
        "questionEn": "Comparative of 'bad':",
        "options": [
          "badder",
          "worse",
          "more bad"
        ],
        "correctIndex": 1,
        "explanationAr": "bad ⇐ worse."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Riyadh is bigger than Abha.",
          "Riyadh is bigger from Abha."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Riyadh is bigger than Abha. — «من» في المقارنة = than وليس from."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "This is more cheaper.",
          "This is cheaper."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: This is cheaper. — لا نجمع more مع er."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "He is better than me.",
          "He is gooder than me."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: He is better than me. — good شاذة ⇐ better."
      }
    ],
    "whiteboardNotes": {
      "title": "Comparatives: Bigger Than, More Expensive Than",
      "pointsAr": [
        "يكوّن صيغة المقارنة للصفات القصيرة والطويلة.",
        "يستخدم better و worse.",
        "يقارن بين شيئين بجملة كاملة.",
        "الصفة القصيرة نضيف لها er + than: taller than. الطويلة more + الصفة + than: more expensive than. شواذ: good→better, bad→worse."
      ],
      "pointsEn": [
        "Form comparatives for short and long adjectives.",
        "Use better and worse.",
        "Compare two things in a full sentence.",
        "Short adjectives add -er + than; long ones use more + adjective + than. good→better, bad→worse."
      ],
      "chalkHighlight": "adj-er + than | more + adj + than | better/worse + than"
    },
    "unit": 4,
    "cefr": "A2",
    "objectivesAr": [
      "يكوّن صيغة المقارنة للصفات القصيرة والطويلة.",
      "يستخدم better و worse.",
      "يقارن بين شيئين بجملة كاملة."
    ],
    "objectivesEn": [
      "Form comparatives for short and long adjectives.",
      "Use better and worse.",
      "Compare two things in a full sentence."
    ],
    "vocabulary": [
      {
        "word": "bigger",
        "ipa": "/ˈbɪɡər/",
        "ar": "أكبر",
        "exampleEn": "Our new house is bigger.",
        "exampleAr": "بيتنا الجديد أكبر."
      },
      {
        "word": "smaller",
        "ipa": "/ˈsmɔːlər/",
        "ar": "أصغر",
        "exampleEn": "My room is smaller.",
        "exampleAr": "غرفتي أصغر."
      },
      {
        "word": "hotter",
        "ipa": "/ˈhɑːtər/",
        "ar": "أحر",
        "exampleEn": "July is hotter than May.",
        "exampleAr": "يوليو أحر من مايو."
      },
      {
        "word": "cheaper",
        "ipa": "/ˈtʃiːpər/",
        "ar": "أرخص",
        "exampleEn": "This shop is cheaper.",
        "exampleAr": "هالمحل أرخص."
      },
      {
        "word": "more expensive",
        "ipa": "/mɔːr ɪkˈspɛnsɪv/",
        "ar": "أغلى",
        "exampleEn": "Gold is more expensive.",
        "exampleAr": "الذهب أغلى."
      },
      {
        "word": "better",
        "ipa": "/ˈbɛtər/",
        "ar": "أفضل",
        "exampleEn": "This is better.",
        "exampleAr": "هذا أفضل."
      },
      {
        "word": "worse",
        "ipa": "/wɜːrs/",
        "ar": "أسوأ",
        "exampleEn": "The traffic is worse today.",
        "exampleAr": "الزحمة أسوأ اليوم."
      },
      {
        "word": "faster",
        "ipa": "/ˈfæstər/",
        "ar": "أسرع",
        "exampleEn": "The metro is faster than the bus.",
        "exampleAr": "المترو أسرع من الباص."
      },
      {
        "word": "more crowded",
        "ipa": "/mɔːr ˈkraʊdɪd/",
        "ar": "أزحم",
        "exampleEn": "Malls are more crowded at night.",
        "exampleAr": "المولات أزحم بالليل."
      },
      {
        "word": "traffic",
        "ipa": "/ˈtræfɪk/",
        "ar": "زحمة السير",
        "exampleEn": "The traffic is heavy.",
        "exampleAr": "الزحمة شديدة."
      }
    ],
    "grammarFocus": {
      "ruleAr": "الصفة القصيرة نضيف لها er + than: taller than. الطويلة more + الصفة + than: more expensive than. شواذ: good→better, bad→worse.",
      "ruleEn": "Short adjectives add -er + than; long ones use more + adjective + than. good→better, bad→worse.",
      "formula": "adj-er + than | more + adj + than | better/worse + than",
      "examples": [
        {
          "en": "Riyadh is bigger than Abha.",
          "ar": "الرياض أكبر من أبها."
        },
        {
          "en": "Abha is cooler than Riyadh in summer.",
          "ar": "أبها أبرد من الرياض في الصيف."
        },
        {
          "en": "This phone is more expensive than that one.",
          "ar": "هالجوال أغلى من ذاك."
        },
        {
          "en": "My English is better than last year.",
          "ar": "إنجليزيي أحسن من السنة الماضية."
        },
        {
          "en": "The traffic today is worse than yesterday.",
          "ar": "الزحمة اليوم أسوأ من أمس."
        },
        {
          "en": "Is Jeddah hotter than Dammam?",
          "ar": "جدة أحر من الدمام؟"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Which city do you prefer, Riyadh or Jeddah?",
        "ar": "أي مدينة تفضل، الرياض ولا جدة؟"
      },
      {
        "speaker": "Student",
        "en": "I prefer Jeddah. It's more relaxing than Riyadh.",
        "ar": "أفضّل جدة. أريح من الرياض."
      },
      {
        "speaker": "Sara",
        "en": "But isn't Jeddah hotter and more humid?",
        "ar": "بس جدة مو أحر وفيها رطوبة أكثر؟"
      },
      {
        "speaker": "Student",
        "en": "Yes, it's more humid, but the sea is better!",
        "ar": "إيه رطبة أكثر، بس البحر أحلى!"
      },
      {
        "speaker": "Sara",
        "en": "Is the traffic worse in Riyadh?",
        "ar": "الزحمة أسوأ في الرياض؟"
      },
      {
        "speaker": "Student",
        "en": "Yes, but now the metro is faster than driving.",
        "ar": "إيه، بس الحين المترو أسرع من السواقة."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Which city do you prefer, Riyadh or Jeddah?\nStudent: I prefer Jeddah. It's more relaxing than Riyadh.\nSara: But isn't Jeddah hotter and more humid?\nStudent: Yes, it's more humid, but the sea is better!\nSara: Is the traffic worse in Riyadh?\nStudent: Yes, but now the metro is faster than driving.",
      "questions": [
        {
          "questionAr": "أي مدينة يفضل؟",
          "questionEn": "Which city does the student prefer?",
          "options": [
            "Riyadh",
            "Jeddah",
            "Dammam"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: Jeddah"
        },
        {
          "questionAr": "وش الأحلى في جدة؟",
          "questionEn": "What is better in Jeddah?",
          "options": [
            "the weather",
            "the sea",
            "the traffic"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: the sea"
        },
        {
          "questionAr": "وش أسرع من السواقة؟",
          "questionEn": "What is faster than driving in Riyadh?",
          "options": [
            "the bus",
            "the metro",
            "a taxi"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: the metro"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Weak 'than' /ðən/ and -er /ər/",
      "items": [
        "bigger than /ˈbɪɡər ðən/",
        "better /ˈbɛtər/",
        "worse /wɜːrs/ vs walls /wɔːlz/"
      ],
      "tipAr": "than ضعيفة «ذَن» ما تنضغط. وآخر er صوت «ر» خفيف."
    },
    "exercises": {
      "easy": [
        {
          "id": "sg_117_e1",
          "type": "meaning",
          "promptEn": "What does \"bigger\" mean?",
          "promptAr": "ما معنى \"bigger\"؟",
          "options": [
            "أحر",
            "أكبر",
            "أفضل",
            "أسرع"
          ],
          "correctIndex": 1,
          "answer": "أكبر",
          "explanationAr": "\"bigger\" /ˈbɪɡər/ تعني: أكبر. مثال: Our new house is bigger."
        },
        {
          "id": "sg_117_e2",
          "type": "meaning",
          "promptEn": "What does \"smaller\" mean?",
          "promptAr": "ما معنى \"smaller\"؟",
          "options": [
            "أصغر",
            "أسرع",
            "أسوأ",
            "أغلى"
          ],
          "correctIndex": 0,
          "answer": "أصغر",
          "explanationAr": "\"smaller\" /ˈsmɔːlər/ تعني: أصغر. مثال: My room is smaller."
        },
        {
          "id": "sg_117_e3",
          "type": "meaning",
          "promptEn": "What does \"hotter\" mean?",
          "promptAr": "ما معنى \"hotter\"؟",
          "options": [
            "أرخص",
            "أسرع",
            "أحر",
            "أسوأ"
          ],
          "correctIndex": 2,
          "answer": "أحر",
          "explanationAr": "\"hotter\" /ˈhɑːtər/ تعني: أحر. مثال: July is hotter than May."
        },
        {
          "id": "sg_117_e4",
          "type": "meaning",
          "promptEn": "What does \"cheaper\" mean?",
          "promptAr": "ما معنى \"cheaper\"؟",
          "options": [
            "أزحم",
            "أصغر",
            "أرخص",
            "زحمة السير"
          ],
          "correctIndex": 2,
          "answer": "أرخص",
          "explanationAr": "\"cheaper\" /ˈtʃiːpər/ تعني: أرخص. مثال: This shop is cheaper."
        }
      ],
      "medium": [
        {
          "id": "sg_117_m1",
          "type": "gap",
          "promptEn": "Complete: Riyadh is ____ than Abha.",
          "promptAr": "أكمل الفراغ: (الرياض أكبر من أبها.)",
          "options": [
            "biger",
            "more big",
            "bigger"
          ],
          "correctIndex": 2,
          "answer": "Riyadh is bigger than Abha.",
          "explanationAr": "الإجابة: bigger. الصفة القصيرة نضيف لها er + than: taller than. الطويلة more + الصفة + than: more expensive than. شواذ: good→better, bad→worse."
        },
        {
          "id": "sg_117_m2",
          "type": "gap",
          "promptEn": "Complete: Abha is cooler ____ Riyadh in summer.",
          "promptAr": "أكمل الفراغ: (أبها أبرد من الرياض في الصيف.)",
          "options": [
            "then",
            "than",
            "from"
          ],
          "correctIndex": 1,
          "answer": "Abha is cooler than Riyadh in summer.",
          "explanationAr": "الإجابة: than. الصفة القصيرة نضيف لها er + than: taller than. الطويلة more + الصفة + than: more expensive than. شواذ: good→better, bad→worse."
        },
        {
          "id": "sg_117_m3",
          "type": "gap",
          "promptEn": "Complete: This phone is ____ than that one.",
          "promptAr": "أكمل الفراغ: (هالجوال أغلى من ذاك.)",
          "options": [
            "most expensive",
            "expensiver",
            "more expensive"
          ],
          "correctIndex": 2,
          "answer": "This phone is more expensive than that one.",
          "explanationAr": "الإجابة: more expensive. الصفة القصيرة نضيف لها er + than: taller than. الطويلة more + الصفة + than: more expensive than. شواذ: good→better, bad→worse."
        },
        {
          "id": "sg_117_m4",
          "type": "gap",
          "promptEn": "Complete: My English is ____ than last year.",
          "promptAr": "أكمل الفراغ: (إنجليزيي أحسن من السنة الماضية.)",
          "options": [
            "better",
            "gooder",
            "more good"
          ],
          "correctIndex": 0,
          "answer": "My English is better than last year.",
          "explanationAr": "الإجابة: better. الصفة القصيرة نضيف لها er + than: taller than. الطويلة more + الصفة + than: more expensive than. شواذ: good→better, bad→worse."
        }
      ],
      "hard": [
        {
          "id": "sg_117_h1",
          "type": "order",
          "promptEn": "Put the words in order: traffic / is / today / than / yesterday. / The / worse",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (الزحمة اليوم أسوأ من أمس.)",
          "answer": "The traffic today is worse than yesterday.",
          "explanationAr": "الترتيب الصحيح: The traffic today is worse than yesterday."
        },
        {
          "id": "sg_117_h2",
          "type": "order",
          "promptEn": "Put the words in order: than / hotter / Is / Dammam? / Jeddah",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (جدة أحر من الدمام؟)",
          "answer": "Is Jeddah hotter than Dammam?",
          "explanationAr": "الترتيب الصحيح: Is Jeddah hotter than Dammam?"
        },
        {
          "id": "sg_117_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أبها أبرد من الرياض في الصيف.",
          "answer": "Abha is cooler than Riyadh in summer.",
          "explanationAr": "ترجمة مقترحة: Abha is cooler than Riyadh in summer."
        },
        {
          "id": "sg_117_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: إنجليزيي أحسن من السنة الماضية.",
          "answer": "My English is better than last year.",
          "explanationAr": "ترجمة مقترحة: My English is better than last year."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "My brother is more tall than me.",
        "correct": "My brother is taller than me.",
        "whyAr": "الصفات القصيرة بـ er."
      },
      {
        "incorrect": "Jeddah more humid than Riyadh.",
        "correct": "Jeddah is more humid than Riyadh.",
        "whyAr": "لا تحذف is."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (Some / Any / How much / How many: في السوبرماركت): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "How much milk?",
          "How many milk?"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: How much milk? — milk غير معدود ⇐ How much.",
        "fromLessonId": "sg_116"
      },
      {
        "questionAr": "مراجعة (الماضي البسيط: أفعال منتظمة وشاذة): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I goed to the mall.",
          "I went to the mall."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I went to the mall. — go فعل شاذ ⇐ went.",
        "fromLessonId": "sg_114"
      },
      {
        "questionAr": "مراجعة (Can و Can't: قدراتك): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I can to swim.",
          "I can swim."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I can swim. — لا نضع to بعد can.",
        "fromLessonId": "sg_111"
      },
      {
        "questionAr": "ما معنى \"score\"؟",
        "questionEn": "What does \"score\" mean?",
        "options": [
          "ينسى",
          "يفوز",
          "يسجل هدف",
          "يسافر"
        ],
        "correctIndex": 2,
        "explanationAr": "\"score\" /skɔːr/ تعني: يسجل هدف. مثال: Who scored?",
        "fromLessonId": "sg_115"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (هالجوال أغلى من ذاك.)",
          "questionEn": "Complete: This phone is ____ than that one.",
          "options": [
            "most expensive",
            "expensiver",
            "more expensive"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: more expensive. الصفة القصيرة نضيف لها er + than: taller than. الطويلة more + الصفة + than: more expensive than. شواذ: good→better, bad→worse."
        },
        {
          "questionAr": "أكمل الفراغ: (إنجليزيي أحسن من السنة الماضية.)",
          "questionEn": "Complete: My English is ____ than last year.",
          "options": [
            "better",
            "gooder",
            "more good"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: better. الصفة القصيرة نضيف لها er + than: taller than. الطويلة more + الصفة + than: more expensive than. شواذ: good→better, bad→worse."
        },
        {
          "questionAr": "ما معنى \"more expensive\"؟",
          "questionEn": "What does \"more expensive\" mean?",
          "options": [
            "أرخص",
            "زحمة السير",
            "أغلى",
            "أفضل"
          ],
          "correctIndex": 2,
          "explanationAr": "\"more expensive\" /mɔːr ɪkˈspɛnsɪv/ تعني: أغلى. مثال: Gold is more expensive."
        },
        {
          "questionAr": "ما معنى \"better\"؟",
          "questionEn": "What does \"better\" mean?",
          "options": [
            "أصغر",
            "زحمة السير",
            "أفضل",
            "أسرع"
          ],
          "correctIndex": 2,
          "explanationAr": "\"better\" /ˈbɛtər/ تعني: أفضل. مثال: This is better."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "My brother is more tall than me.",
            "My brother is taller than me."
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: My brother is taller than me. — الصفات القصيرة بـ er."
        }
      ]
    }
  },
  {
    "id": "sg_118",
    "pillarId": "grammar",
    "pillarNameAr": "القواعد التحدثية السريعة",
    "pillarNameEn": "Spoken Grammar & Fast Patterns",
    "pillarIcon": "🧠",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "التفضيل: the biggest / the most beautiful",
    "titleEn": "Superlatives: The Biggest, The Most Beautiful",
    "descAr": "تكلم عن الأفضل والأكبر والأجمل: أطول برج، أفضل مطعم، أصعب مادة.",
    "descEn": "Talk about the best, biggest, most beautiful: tallest tower, best restaurant, hardest subject.",
    "speakingGoalAr": "سمِّ «الأفضل» في خمسة أشياء بحياتك.",
    "speakingGoalEn": "Name 'the best' of five things in your life.",
    "keyPattern": {
      "ruleAr": "القصيرة: the + est (the tallest). الطويلة: the most + الصفة. شواذ: the best, the worst. وبعدها in للمكان أو of للمجموعة.",
      "ruleEn": "Short: the + -est; long: the most + adj; irregular: the best/the worst. Use in for places, of for groups.",
      "formula": "the + adj-est / the most + adj (+ in/of ...)"
    },
    "practicalExamples": [
      {
        "en": "Burj Khalifa is the tallest building in the world.",
        "ar": "برج خليفة أطول مبنى في العالم."
      },
      {
        "en": "Math is the hardest subject for me.",
        "ar": "الرياضيات أصعب مادة عندي."
      },
      {
        "en": "This is the most beautiful beach in Umluj.",
        "ar": "هذا أجمل شاطئ في أملج."
      },
      {
        "en": "Who is the best player in your team?",
        "ar": "مين أفضل لاعب في فريقك؟"
      },
      {
        "en": "August is the hottest month of the year.",
        "ar": "أغسطس أحر شهر في السنة."
      },
      {
        "en": "That was the worst traffic of the week.",
        "ar": "كانت أسوأ زحمة في الأسبوع."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "He is the most tall boy.",
        "correct": "He is the tallest boy.",
        "whyAr": "الصفة القصيرة ⇐ est."
      },
      {
        "incorrect": "She is best student.",
        "correct": "She is the best student.",
        "whyAr": "لا تنسَ the مع التفضيل."
      },
      {
        "incorrect": "The biggest city of Saudi Arabia.",
        "correct": "The biggest city in Saudi Arabia.",
        "whyAr": "مع الأماكن نستخدم in."
      }
    ],
    "speakingChallenge": {
      "promptAr": "أخبر سارة عن «الأفضل» في حياتك.",
      "promptEn": "Tell Sara about the 'bests' in your life.",
      "saraQuestionAr": "وش أفضل أكلة؟ وأجمل مكان؟ وأصعب مادة؟",
      "saraQuestionEn": "Best food? Most beautiful place? Hardest subject?",
      "recommendedResponseEn": "The best food is my mother's kabsa. The most beautiful place is Abha. The hardest subject is chemistry."
    },
    "quiz": [
      {
        "questionAr": "أكمل: Everest is ___ mountain in the world.",
        "questionEn": "Complete: Everest is ___ mountain in the world.",
        "options": [
          "the highest",
          "higher",
          "the most high"
        ],
        "correctIndex": 0,
        "explanationAr": "صفة قصيرة ⇐ the highest."
      },
      {
        "questionAr": "أكمل: She's the smartest girl ___ the class.",
        "questionEn": "Complete: the smartest girl ___ the class.",
        "options": [
          "of",
          "in",
          "at"
        ],
        "correctIndex": 1,
        "explanationAr": "in the class."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "He is the tallest boy.",
          "He is the most tall boy."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: He is the tallest boy. — الصفة القصيرة ⇐ est."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "She is the best student.",
          "She is best student."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: She is the best student. — لا تنسَ the مع التفضيل."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "The biggest city of Saudi Arabia.",
          "The biggest city in Saudi Arabia."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: The biggest city in Saudi Arabia. — مع الأماكن نستخدم in."
      }
    ],
    "whiteboardNotes": {
      "title": "Superlatives: The Biggest, The Most Beautiful",
      "pointsAr": [
        "يكوّن صيغة التفضيل.",
        "يفرق بين المقارنة والتفضيل.",
        "يستخدم in/of بعد التفضيل.",
        "القصيرة: the + est (the tallest). الطويلة: the most + الصفة. شواذ: the best, the worst. وبعدها in للمكان أو of للمجموعة."
      ],
      "pointsEn": [
        "Form superlatives.",
        "Contrast comparatives and superlatives.",
        "Use in/of after superlatives.",
        "Short: the + -est; long: the most + adj; irregular: the best/the worst. Use in for places, of for groups."
      ],
      "chalkHighlight": "the + adj-est / the most + adj (+ in/of ...)"
    },
    "unit": 4,
    "cefr": "A2",
    "objectivesAr": [
      "يكوّن صيغة التفضيل.",
      "يفرق بين المقارنة والتفضيل.",
      "يستخدم in/of بعد التفضيل."
    ],
    "objectivesEn": [
      "Form superlatives.",
      "Contrast comparatives and superlatives.",
      "Use in/of after superlatives."
    ],
    "vocabulary": [
      {
        "word": "tallest",
        "ipa": "/ˈtɔːlɪst/",
        "ar": "الأطول",
        "exampleEn": "the tallest tower",
        "exampleAr": "أطول برج"
      },
      {
        "word": "hardest",
        "ipa": "/ˈhɑːrdɪst/",
        "ar": "الأصعب",
        "exampleEn": "the hardest exam",
        "exampleAr": "أصعب اختبار"
      },
      {
        "word": "easiest",
        "ipa": "/ˈiːziɪst/",
        "ar": "الأسهل",
        "exampleEn": "the easiest question",
        "exampleAr": "أسهل سؤال"
      },
      {
        "word": "best",
        "ipa": "/bɛst/",
        "ar": "الأفضل",
        "exampleEn": "the best restaurant",
        "exampleAr": "أفضل مطعم"
      },
      {
        "word": "worst",
        "ipa": "/wɜːrst/",
        "ar": "الأسوأ",
        "exampleEn": "the worst day",
        "exampleAr": "أسوأ يوم"
      },
      {
        "word": "most beautiful",
        "ipa": "/moʊst ˈbjuːtɪfəl/",
        "ar": "الأجمل",
        "exampleEn": "the most beautiful view",
        "exampleAr": "أجمل منظر"
      },
      {
        "word": "most famous",
        "ipa": "/moʊst ˈfeɪməs/",
        "ar": "الأشهر",
        "exampleEn": "the most famous dish",
        "exampleAr": "أشهر طبق"
      },
      {
        "word": "subject",
        "ipa": "/ˈsʌbdʒɪkt/",
        "ar": "مادة دراسية",
        "exampleEn": "My favorite subject is art.",
        "exampleAr": "مادتي المفضلة الفنية."
      },
      {
        "word": "building",
        "ipa": "/ˈbɪldɪŋ/",
        "ar": "مبنى",
        "exampleEn": "a tall building",
        "exampleAr": "مبنى طويل"
      },
      {
        "word": "world",
        "ipa": "/wɜːrld/",
        "ar": "العالم",
        "exampleEn": "in the world",
        "exampleAr": "في العالم"
      }
    ],
    "grammarFocus": {
      "ruleAr": "القصيرة: the + est (the tallest). الطويلة: the most + الصفة. شواذ: the best, the worst. وبعدها in للمكان أو of للمجموعة.",
      "ruleEn": "Short: the + -est; long: the most + adj; irregular: the best/the worst. Use in for places, of for groups.",
      "formula": "the + adj-est / the most + adj (+ in/of ...)",
      "examples": [
        {
          "en": "Burj Khalifa is the tallest building in the world.",
          "ar": "برج خليفة أطول مبنى في العالم."
        },
        {
          "en": "Math is the hardest subject for me.",
          "ar": "الرياضيات أصعب مادة عندي."
        },
        {
          "en": "This is the most beautiful beach in Umluj.",
          "ar": "هذا أجمل شاطئ في أملج."
        },
        {
          "en": "Who is the best player in your team?",
          "ar": "مين أفضل لاعب في فريقك؟"
        },
        {
          "en": "August is the hottest month of the year.",
          "ar": "أغسطس أحر شهر في السنة."
        },
        {
          "en": "That was the worst traffic of the week.",
          "ar": "كانت أسوأ زحمة في الأسبوع."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "What's the best restaurant in your city?",
        "ar": "وش أفضل مطعم في مدينتك؟"
      },
      {
        "speaker": "Student",
        "en": "I think the best is a mandi place near our house.",
        "ar": "أشوف أفضل واحد مطعم مندي قريب منا."
      },
      {
        "speaker": "Sara",
        "en": "And what's the hardest subject at school?",
        "ar": "وأصعب مادة في المدرسة؟"
      },
      {
        "speaker": "Student",
        "en": "Physics is the hardest. Art is the easiest!",
        "ar": "الفيزياء أصعب. والفنية أسهل!"
      },
      {
        "speaker": "Sara",
        "en": "What's the most beautiful place in Saudi Arabia?",
        "ar": "وش أجمل مكان في السعودية؟"
      },
      {
        "speaker": "Student",
        "en": "AlUla. It's the most amazing place I know.",
        "ar": "العلا. أروع مكان أعرفه."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: What's the best restaurant in your city?\nStudent: I think the best is a mandi place near our house.\nSara: And what's the hardest subject at school?\nStudent: Physics is the hardest. Art is the easiest!\nSara: What's the most beautiful place in Saudi Arabia?\nStudent: AlUla. It's the most amazing place I know.",
      "questions": [
        {
          "questionAr": "أفضل مطعم؟",
          "questionEn": "What is the best restaurant?",
          "options": [
            "a pizza place",
            "a mandi place",
            "a burger place"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: a mandi place"
        },
        {
          "questionAr": "أسهل مادة؟",
          "questionEn": "What is the easiest subject?",
          "options": [
            "physics",
            "art",
            "math"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: art"
        },
        {
          "questionAr": "أجمل مكان؟",
          "questionEn": "What is the most beautiful place?",
          "options": [
            "AlUla",
            "Abha",
            "Jeddah"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: AlUla"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "-est /ɪst/ and consonant clusters",
      "items": [
        "tallest /ˈtɔːlɪst/",
        "best /bɛst/ (no extra vowel)",
        "worst /wɜːrst/"
      ],
      "tipAr": "لا تضيف حرفاً متحركاً في آخر best: «بيست» وليس «بيستي»."
    },
    "exercises": {
      "easy": [
        {
          "id": "sg_118_e1",
          "type": "meaning",
          "promptEn": "What does \"tallest\" mean?",
          "promptAr": "ما معنى \"tallest\"؟",
          "options": [
            "الأصعب",
            "مبنى",
            "الأطول",
            "مادة دراسية"
          ],
          "correctIndex": 2,
          "answer": "الأطول",
          "explanationAr": "\"tallest\" /ˈtɔːlɪst/ تعني: الأطول. مثال: the tallest tower"
        },
        {
          "id": "sg_118_e2",
          "type": "meaning",
          "promptEn": "What does \"hardest\" mean?",
          "promptAr": "ما معنى \"hardest\"؟",
          "options": [
            "الأصعب",
            "الأطول",
            "الأجمل",
            "الأشهر"
          ],
          "correctIndex": 0,
          "answer": "الأصعب",
          "explanationAr": "\"hardest\" /ˈhɑːrdɪst/ تعني: الأصعب. مثال: the hardest exam"
        },
        {
          "id": "sg_118_e3",
          "type": "meaning",
          "promptEn": "What does \"easiest\" mean?",
          "promptAr": "ما معنى \"easiest\"؟",
          "options": [
            "الأجمل",
            "الأصعب",
            "الأسهل",
            "مادة دراسية"
          ],
          "correctIndex": 2,
          "answer": "الأسهل",
          "explanationAr": "\"easiest\" /ˈiːziɪst/ تعني: الأسهل. مثال: the easiest question"
        },
        {
          "id": "sg_118_e4",
          "type": "meaning",
          "promptEn": "What does \"best\" mean?",
          "promptAr": "ما معنى \"best\"؟",
          "options": [
            "الأصعب",
            "الأفضل",
            "الأطول",
            "الأسهل"
          ],
          "correctIndex": 1,
          "answer": "الأفضل",
          "explanationAr": "\"best\" /bɛst/ تعني: الأفضل. مثال: the best restaurant"
        }
      ],
      "medium": [
        {
          "id": "sg_118_m1",
          "type": "gap",
          "promptEn": "Complete: Burj Khalifa is ____ building in the world.",
          "promptAr": "أكمل الفراغ: (برج خليفة أطول مبنى في العالم.)",
          "options": [
            "taller",
            "the tallest",
            "the most tall"
          ],
          "correctIndex": 1,
          "answer": "Burj Khalifa is the tallest building in the world.",
          "explanationAr": "الإجابة: the tallest. القصيرة: the + est (the tallest). الطويلة: the most + الصفة. شواذ: the best, the worst. وبعدها in للمكان أو of للمجموعة."
        },
        {
          "id": "sg_118_m2",
          "type": "gap",
          "promptEn": "Complete: Math is the ____ subject for me.",
          "promptAr": "أكمل الفراغ: (الرياضيات أصعب مادة عندي.)",
          "options": [
            "harder",
            "most hard",
            "hardest"
          ],
          "correctIndex": 2,
          "answer": "Math is the hardest subject for me.",
          "explanationAr": "الإجابة: hardest. القصيرة: the + est (the tallest). الطويلة: the most + الصفة. شواذ: the best, the worst. وبعدها in للمكان أو of للمجموعة."
        },
        {
          "id": "sg_118_m3",
          "type": "gap",
          "promptEn": "Complete: This is ____ beach in Umluj.",
          "promptAr": "أكمل الفراغ: (هذا أجمل شاطئ في أملج.)",
          "options": [
            "the most beautiful",
            "the beautifulest",
            "more beautiful"
          ],
          "correctIndex": 0,
          "answer": "This is the most beautiful beach in Umluj.",
          "explanationAr": "الإجابة: the most beautiful. القصيرة: the + est (the tallest). الطويلة: the most + الصفة. شواذ: the best, the worst. وبعدها in للمكان أو of للمجموعة."
        },
        {
          "id": "sg_118_m4",
          "type": "gap",
          "promptEn": "Complete: Who is ____ player in your team?",
          "promptAr": "أكمل الفراغ: (مين أفضل لاعب في فريقك؟)",
          "options": [
            "the goodest",
            "better",
            "the best"
          ],
          "correctIndex": 2,
          "answer": "Who is the best player in your team?",
          "explanationAr": "الإجابة: the best. القصيرة: the + est (the tallest). الطويلة: the most + الصفة. شواذ: the best, the worst. وبعدها in للمكان أو of للمجموعة."
        }
      ],
      "hard": [
        {
          "id": "sg_118_h1",
          "type": "order",
          "promptEn": "Put the words in order: year. / hottest / the / August / the / is / month / of",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (أغسطس أحر شهر في السنة.)",
          "answer": "August is the hottest month of the year.",
          "explanationAr": "الترتيب الصحيح: August is the hottest month of the year."
        },
        {
          "id": "sg_118_h2",
          "type": "order",
          "promptEn": "Put the words in order: of / traffic / the / week. / worst / That / was / the",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (كانت أسوأ زحمة في الأسبوع.)",
          "answer": "That was the worst traffic of the week.",
          "explanationAr": "الترتيب الصحيح: That was the worst traffic of the week."
        },
        {
          "id": "sg_118_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: الرياضيات أصعب مادة عندي.",
          "answer": "Math is the hardest subject for me.",
          "explanationAr": "ترجمة مقترحة: Math is the hardest subject for me."
        },
        {
          "id": "sg_118_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: مين أفضل لاعب في فريقك؟",
          "answer": "Who is the best player in your team?",
          "explanationAr": "ترجمة مقترحة: Who is the best player in your team?"
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "He is the more strong.",
        "correct": "He is the strongest.",
        "whyAr": "خلط المقارنة بالتفضيل."
      },
      {
        "incorrect": "The most best day.",
        "correct": "The best day.",
        "whyAr": "best تفضيل بذاتها، لا نضيف most."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (المقارنة: bigger than / more expensive than): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "This is cheaper.",
          "This is more cheaper."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: This is cheaper. — لا نجمع more مع er.",
        "fromLessonId": "sg_117"
      },
      {
        "questionAr": "مراجعة (Did: السؤال والنفي في الماضي): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Did you went?",
          "Did you go?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Did you go? — بعد did الفعل أصلي.",
        "fromLessonId": "sg_115"
      },
      {
        "questionAr": "مراجعة (المضارع المستمر: وش تسوي الحين؟): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'm studying now.",
          "I studying now."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I'm studying now. — لا تنسَ am/is/are قبل ing.",
        "fromLessonId": "sg_112"
      },
      {
        "questionAr": "ما معنى \"cashier\"؟",
        "questionEn": "What does \"cashier\" mean?",
        "options": [
          "رز",
          "كاشير/محاسب",
          "ثلاجة",
          "كيلو"
        ],
        "correctIndex": 1,
        "explanationAr": "\"cashier\" /kæˈʃɪr/ تعني: كاشير/محاسب. مثال: Pay at the cashier.",
        "fromLessonId": "sg_116"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (هذا أجمل شاطئ في أملج.)",
          "questionEn": "Complete: This is ____ beach in Umluj.",
          "options": [
            "the most beautiful",
            "the beautifulest",
            "more beautiful"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: the most beautiful. القصيرة: the + est (the tallest). الطويلة: the most + الصفة. شواذ: the best, the worst. وبعدها in للمكان أو of للمجموعة."
        },
        {
          "questionAr": "أكمل الفراغ: (مين أفضل لاعب في فريقك؟)",
          "questionEn": "Complete: Who is ____ player in your team?",
          "options": [
            "the goodest",
            "better",
            "the best"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: the best. القصيرة: the + est (the tallest). الطويلة: the most + الصفة. شواذ: the best, the worst. وبعدها in للمكان أو of للمجموعة."
        },
        {
          "questionAr": "ما معنى \"worst\"؟",
          "questionEn": "What does \"worst\" mean?",
          "options": [
            "الأطول",
            "الأفضل",
            "الأسوأ",
            "مادة دراسية"
          ],
          "correctIndex": 2,
          "explanationAr": "\"worst\" /wɜːrst/ تعني: الأسوأ. مثال: the worst day"
        },
        {
          "questionAr": "ما معنى \"most beautiful\"؟",
          "questionEn": "What does \"most beautiful\" mean?",
          "options": [
            "الأجمل",
            "مبنى",
            "الأسهل",
            "مادة دراسية"
          ],
          "correctIndex": 0,
          "explanationAr": "\"most beautiful\" /moʊst ˈbjuːtɪfəl/ تعني: الأجمل. مثال: the most beautiful view"
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "He is the strongest.",
            "He is the more strong."
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: He is the strongest. — خلط المقارنة بالتفضيل."
        }
      ]
    }
  },
  {
    "id": "sg_119",
    "pillarId": "grammar",
    "pillarNameAr": "القواعد التحدثية السريعة",
    "pillarNameEn": "Spoken Grammar & Fast Patterns",
    "pillarIcon": "🧠",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "Going to: خططك ونواياك",
    "titleEn": "Going To: Plans and Intentions",
    "descAr": "تكلم عن خططك للويكند والإجازة باستخدام be going to (وفي الكلام gonna).",
    "descEn": "Talk about weekend and holiday plans with be going to (gonna in speech).",
    "speakingGoalAr": "قل لسارة خمس خطط عندك للإجازة.",
    "speakingGoalEn": "Tell Sara five holiday plans.",
    "keyPattern": {
      "ruleAr": "للخطط المقررة مسبقاً: am/is/are + going to + فعل أصلي. وفي الكلام العامي نسمع gonna (لا تكتبها في الرسمي).",
      "ruleEn": "For plans: am/is/are + going to + base verb. In casual speech: gonna (not in formal writing).",
      "formula": "subject + am/is/are + going to + base verb"
    },
    "practicalExamples": [
      {
        "en": "I'm going to visit my grandparents this weekend.",
        "ar": "بزور جدي وجدتي هالويكند."
      },
      {
        "en": "We're going to travel to Turkey in the summer.",
        "ar": "بنسافر تركيا في الصيف."
      },
      {
        "en": "She isn't going to come tonight.",
        "ar": "ما راح تجي الليلة."
      },
      {
        "en": "What are you going to study at university?",
        "ar": "وش بتدرس في الجامعة؟"
      },
      {
        "en": "I'm gonna grab some coffee.",
        "ar": "بروح أجيب قهوة."
      },
      {
        "en": "They're going to buy a new car.",
        "ar": "بيشترون سيارة جديدة."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "I going to travel.",
        "correct": "I'm going to travel.",
        "whyAr": "لا تحذف am."
      },
      {
        "incorrect": "She is going to visits us.",
        "correct": "She is going to visit us.",
        "whyAr": "بعد to فعل أصلي."
      },
      {
        "incorrect": "I'm going to the travel.",
        "correct": "I'm going to travel.",
        "whyAr": "travel هنا فعل وليس اسم."
      }
    ],
    "speakingChallenge": {
      "promptAr": "أخبر سارة بخططك للإجازة.",
      "promptEn": "Tell Sara your holiday plans.",
      "saraQuestionAr": "وش خططك للإجازة الجاية؟",
      "saraQuestionEn": "What are your plans for the next holiday?",
      "recommendedResponseEn": "I'm going to visit my grandparents. We're going to go camping. I'm going to read two books and I'm going to learn to swim."
    },
    "quiz": [
      {
        "questionAr": "أكمل: Look at those clouds! It's ___ rain.",
        "questionEn": "Complete: It's ___ rain.",
        "options": [
          "going to",
          "go to",
          "will to"
        ],
        "correctIndex": 0,
        "explanationAr": "توقع مبني على دليل ⇐ going to."
      },
      {
        "questionAr": "أكمل: We ___ going to watch a movie.",
        "questionEn": "Complete: We ___ going to watch a movie.",
        "options": [
          "is",
          "are",
          "am"
        ],
        "correctIndex": 1,
        "explanationAr": "we ⇐ are."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'm going to travel.",
          "I going to travel."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I'm going to travel. — لا تحذف am."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "She is going to visit us.",
          "She is going to visits us."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: She is going to visit us. — بعد to فعل أصلي."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'm going to the travel.",
          "I'm going to travel."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I'm going to travel. — travel هنا فعل وليس اسم."
      }
    ],
    "whiteboardNotes": {
      "title": "Going To: Plans and Intentions",
      "pointsAr": [
        "يعبر عن الخطط بـ going to.",
        "يسأل What are you going to do?",
        "يفهم gonna عند سماعها.",
        "للخطط المقررة مسبقاً: am/is/are + going to + فعل أصلي. وفي الكلام العامي نسمع gonna (لا تكتبها في الرسمي)."
      ],
      "pointsEn": [
        "Express plans with going to.",
        "Ask 'What are you going to do?'.",
        "Recognise 'gonna' in speech.",
        "For plans: am/is/are + going to + base verb. In casual speech: gonna (not in formal writing)."
      ],
      "chalkHighlight": "subject + am/is/are + going to + base verb"
    },
    "unit": 4,
    "cefr": "A2",
    "objectivesAr": [
      "يعبر عن الخطط بـ going to.",
      "يسأل What are you going to do?",
      "يفهم gonna عند سماعها."
    ],
    "objectivesEn": [
      "Express plans with going to.",
      "Ask 'What are you going to do?'.",
      "Recognise 'gonna' in speech."
    ],
    "vocabulary": [
      {
        "word": "plan",
        "ipa": "/plæn/",
        "ar": "خطة/يخطط",
        "exampleEn": "What's your plan?",
        "exampleAr": "وش خطتك؟"
      },
      {
        "word": "this weekend",
        "ipa": "/ðɪs ˈwiːkɛnd/",
        "ar": "هالويكند",
        "exampleEn": "I'm going to rest this weekend.",
        "exampleAr": "برتاح هالويكند."
      },
      {
        "word": "next year",
        "ipa": "/nɛkst jɪr/",
        "ar": "السنة الجاية",
        "exampleEn": "Next year I'm going to start university.",
        "exampleAr": "السنة الجاية ببدأ الجامعة."
      },
      {
        "word": "tonight",
        "ipa": "/təˈnaɪt/",
        "ar": "الليلة",
        "exampleEn": "We're going to eat out tonight.",
        "exampleAr": "بنتعشى برا الليلة."
      },
      {
        "word": "abroad",
        "ipa": "/əˈbrɔːd/",
        "ar": "خارج البلد",
        "exampleEn": "They're going to study abroad.",
        "exampleAr": "بيدرسون برا."
      },
      {
        "word": "rest",
        "ipa": "/rɛst/",
        "ar": "يرتاح",
        "exampleEn": "I'm going to rest.",
        "exampleAr": "برتاح."
      },
      {
        "word": "university",
        "ipa": "/ˌjuːnɪˈvɜːrsəti/",
        "ar": "جامعة",
        "exampleEn": "She's going to apply to university.",
        "exampleAr": "بتقدم على الجامعة."
      },
      {
        "word": "camping",
        "ipa": "/ˈkæmpɪŋ/",
        "ar": "تخييم/كشتة",
        "exampleEn": "We're going to go camping.",
        "exampleAr": "بنروح كشتة."
      },
      {
        "word": "save money",
        "ipa": "/seɪv ˈmʌni/",
        "ar": "يدخر فلوس",
        "exampleEn": "I'm going to save money.",
        "exampleAr": "بجمع فلوس."
      },
      {
        "word": "Umrah",
        "ipa": "/ˈʊmrə/",
        "ar": "عمرة",
        "exampleEn": "We're going to do Umrah.",
        "exampleAr": "بنروح عمرة."
      }
    ],
    "grammarFocus": {
      "ruleAr": "للخطط المقررة مسبقاً: am/is/are + going to + فعل أصلي. وفي الكلام العامي نسمع gonna (لا تكتبها في الرسمي).",
      "ruleEn": "For plans: am/is/are + going to + base verb. In casual speech: gonna (not in formal writing).",
      "formula": "subject + am/is/are + going to + base verb",
      "examples": [
        {
          "en": "I'm going to visit my grandparents this weekend.",
          "ar": "بزور جدي وجدتي هالويكند."
        },
        {
          "en": "We're going to travel to Turkey in the summer.",
          "ar": "بنسافر تركيا في الصيف."
        },
        {
          "en": "She isn't going to come tonight.",
          "ar": "ما راح تجي الليلة."
        },
        {
          "en": "What are you going to study at university?",
          "ar": "وش بتدرس في الجامعة؟"
        },
        {
          "en": "I'm gonna grab some coffee.",
          "ar": "بروح أجيب قهوة."
        },
        {
          "en": "They're going to buy a new car.",
          "ar": "بيشترون سيارة جديدة."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "What are you going to do this weekend?",
        "ar": "وش بتسوي هالويكند؟"
      },
      {
        "speaker": "Student",
        "en": "We're going to go camping in the desert.",
        "ar": "بنطلع كشتة في البر."
      },
      {
        "speaker": "Sara",
        "en": "Sounds fun! Are your friends going to come?",
        "ar": "حلو! ربعك بيجون؟"
      },
      {
        "speaker": "Student",
        "en": "Yes, and my cousin is going to bring his telescope.",
        "ar": "إيه، وولد عمي بيجيب التلسكوب."
      },
      {
        "speaker": "Sara",
        "en": "And what about next summer?",
        "ar": "والصيف الجاي؟"
      },
      {
        "speaker": "Student",
        "en": "I'm going to do Umrah and then visit Madinah.",
        "ar": "بروح عمرة وبعدين أزور المدينة."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: What are you going to do this weekend?\nStudent: We're going to go camping in the desert.\nSara: Sounds fun! Are your friends going to come?\nStudent: Yes, and my cousin is going to bring his telescope.\nSara: And what about next summer?\nStudent: I'm going to do Umrah and then visit Madinah.",
      "questions": [
        {
          "questionAr": "وين الكشتة؟",
          "questionEn": "Where are they going camping?",
          "options": [
            "the beach",
            "the desert",
            "the mountains"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: the desert"
        },
        {
          "questionAr": "وش بيجيب ولد العم؟",
          "questionEn": "What is the cousin going to bring?",
          "options": [
            "a tent",
            "a telescope",
            "food"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: a telescope"
        },
        {
          "questionAr": "خطة الصيف؟",
          "questionEn": "What is the student going to do next summer?",
          "options": [
            "travel to Turkey",
            "do Umrah",
            "study"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: do Umrah"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "gonna /ˈɡʌnə/ in fast speech",
      "items": [
        "going to → gonna",
        "I'm gonna /aɪm ˈɡʌnə/",
        "want to → wanna"
      ],
      "tipAr": "gonna نسمعها كثير في الكلام فقط. لا تكتبها في إيميل رسمي أو اختبار."
    },
    "exercises": {
      "easy": [
        {
          "id": "sg_119_e1",
          "type": "meaning",
          "promptEn": "What does \"plan\" mean?",
          "promptAr": "ما معنى \"plan\"؟",
          "options": [
            "عمرة",
            "خطة/يخطط",
            "هالويكند",
            "يدخر فلوس"
          ],
          "correctIndex": 1,
          "answer": "خطة/يخطط",
          "explanationAr": "\"plan\" /plæn/ تعني: خطة/يخطط. مثال: What's your plan?"
        },
        {
          "id": "sg_119_e2",
          "type": "meaning",
          "promptEn": "What does \"this weekend\" mean?",
          "promptAr": "ما معنى \"this weekend\"؟",
          "options": [
            "تخييم/كشتة",
            "هالويكند",
            "الليلة",
            "السنة الجاية"
          ],
          "correctIndex": 1,
          "answer": "هالويكند",
          "explanationAr": "\"this weekend\" /ðɪs ˈwiːkɛnd/ تعني: هالويكند. مثال: I'm going to rest this weekend."
        },
        {
          "id": "sg_119_e3",
          "type": "meaning",
          "promptEn": "What does \"next year\" mean?",
          "promptAr": "ما معنى \"next year\"؟",
          "options": [
            "تخييم/كشتة",
            "خطة/يخطط",
            "السنة الجاية",
            "هالويكند"
          ],
          "correctIndex": 2,
          "answer": "السنة الجاية",
          "explanationAr": "\"next year\" /nɛkst jɪr/ تعني: السنة الجاية. مثال: Next year I'm going to start university."
        },
        {
          "id": "sg_119_e4",
          "type": "meaning",
          "promptEn": "What does \"tonight\" mean?",
          "promptAr": "ما معنى \"tonight\"؟",
          "options": [
            "عمرة",
            "هالويكند",
            "الليلة",
            "خطة/يخطط"
          ],
          "correctIndex": 2,
          "answer": "الليلة",
          "explanationAr": "\"tonight\" /təˈnaɪt/ تعني: الليلة. مثال: We're going to eat out tonight."
        }
      ],
      "medium": [
        {
          "id": "sg_119_m1",
          "type": "gap",
          "promptEn": "Complete: I'm ____ visit my grandparents this weekend.",
          "promptAr": "أكمل الفراغ: (بزور جدي وجدتي هالويكند.)",
          "options": [
            "go to",
            "going",
            "going to"
          ],
          "correctIndex": 2,
          "answer": "I'm going to visit my grandparents this weekend.",
          "explanationAr": "الإجابة: going to. للخطط المقررة مسبقاً: am/is/are + going to + فعل أصلي. وفي الكلام العامي نسمع gonna (لا تكتبها في الرسمي)."
        },
        {
          "id": "sg_119_m2",
          "type": "gap",
          "promptEn": "Complete: ____ going to travel to Turkey in the summer.",
          "promptAr": "أكمل الفراغ: (بنسافر تركيا في الصيف.)",
          "options": [
            "We",
            "We is",
            "We're"
          ],
          "correctIndex": 2,
          "answer": "We're going to travel to Turkey in the summer.",
          "explanationAr": "الإجابة: We're. للخطط المقررة مسبقاً: am/is/are + going to + فعل أصلي. وفي الكلام العامي نسمع gonna (لا تكتبها في الرسمي)."
        },
        {
          "id": "sg_119_m3",
          "type": "gap",
          "promptEn": "Complete: She ____ going to come tonight.",
          "promptAr": "أكمل الفراغ: (ما راح تجي الليلة.)",
          "options": [
            "doesn't",
            "not",
            "isn't"
          ],
          "correctIndex": 2,
          "answer": "She isn't going to come tonight.",
          "explanationAr": "الإجابة: isn't. للخطط المقررة مسبقاً: am/is/are + going to + فعل أصلي. وفي الكلام العامي نسمع gonna (لا تكتبها في الرسمي)."
        },
        {
          "id": "sg_119_m4",
          "type": "gap",
          "promptEn": "Complete: What ____ you going to study at university?",
          "promptAr": "أكمل الفراغ: (وش بتدرس في الجامعة؟)",
          "options": [
            "do",
            "are",
            "is"
          ],
          "correctIndex": 1,
          "answer": "What are you going to study at university?",
          "explanationAr": "الإجابة: are. للخطط المقررة مسبقاً: am/is/are + going to + فعل أصلي. وفي الكلام العامي نسمع gonna (لا تكتبها في الرسمي)."
        }
      ],
      "hard": [
        {
          "id": "sg_119_h1",
          "type": "order",
          "promptEn": "Put the words in order: I'm / some / coffee. / grab / gonna",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (بروح أجيب قهوة.)",
          "answer": "I'm gonna grab some coffee.",
          "explanationAr": "الترتيب الصحيح: I'm gonna grab some coffee."
        },
        {
          "id": "sg_119_h2",
          "type": "order",
          "promptEn": "Put the words in order: buy / new / a / They're / going / to / car.",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (بيشترون سيارة جديدة.)",
          "answer": "They're going to buy a new car.",
          "explanationAr": "الترتيب الصحيح: They're going to buy a new car."
        },
        {
          "id": "sg_119_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: بنسافر تركيا في الصيف.",
          "answer": "We're going to travel to Turkey in the summer.",
          "explanationAr": "ترجمة مقترحة: We're going to travel to Turkey in the summer."
        },
        {
          "id": "sg_119_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: وش بتدرس في الجامعة؟",
          "answer": "What are you going to study at university?",
          "explanationAr": "ترجمة مقترحة: What are you going to study at university?"
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "I will to travel next week.",
        "correct": "I'm going to travel next week.",
        "whyAr": "will لا تأخذ to، والخطة المقررة أفضل بـ going to."
      },
      {
        "incorrect": "Tomorrow I go to Jeddah (as a plan).",
        "correct": "Tomorrow I'm going to Jeddah.",
        "whyAr": "للخطط القريبة نستخدم going to أو المضارع المستمر."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (التفضيل: the biggest / the most beautiful): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "She is the best student.",
          "She is best student."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: She is the best student. — لا تنسَ the مع التفضيل.",
        "fromLessonId": "sg_118"
      },
      {
        "questionAr": "مراجعة (Some / Any / How much / How many: في السوبرماركت): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I want some rice.",
          "I want a rice."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I want some rice. — rice غير معدود؛ ما نقول a rice.",
        "fromLessonId": "sg_116"
      },
      {
        "questionAr": "مراجعة (Was و Were: الماضي مع be): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "We was in Jeddah.",
          "We were in Jeddah."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: We were in Jeddah. — we ⇐ were.",
        "fromLessonId": "sg_113"
      },
      {
        "questionAr": "ما معنى \"traffic\"؟",
        "questionEn": "What does \"traffic\" mean?",
        "options": [
          "زحمة السير",
          "أكبر",
          "أصغر",
          "أحر"
        ],
        "correctIndex": 0,
        "explanationAr": "\"traffic\" /ˈtræfɪk/ تعني: زحمة السير. مثال: The traffic is heavy.",
        "fromLessonId": "sg_117"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (ما راح تجي الليلة.)",
          "questionEn": "Complete: She ____ going to come tonight.",
          "options": [
            "doesn't",
            "not",
            "isn't"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: isn't. للخطط المقررة مسبقاً: am/is/are + going to + فعل أصلي. وفي الكلام العامي نسمع gonna (لا تكتبها في الرسمي)."
        },
        {
          "questionAr": "أكمل الفراغ: (وش بتدرس في الجامعة؟)",
          "questionEn": "Complete: What ____ you going to study at university?",
          "options": [
            "do",
            "are",
            "is"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: are. للخطط المقررة مسبقاً: am/is/are + going to + فعل أصلي. وفي الكلام العامي نسمع gonna (لا تكتبها في الرسمي)."
        },
        {
          "questionAr": "ما معنى \"abroad\"؟",
          "questionEn": "What does \"abroad\" mean?",
          "options": [
            "جامعة",
            "يرتاح",
            "خارج البلد",
            "تخييم/كشتة"
          ],
          "correctIndex": 2,
          "explanationAr": "\"abroad\" /əˈbrɔːd/ تعني: خارج البلد. مثال: They're going to study abroad."
        },
        {
          "questionAr": "ما معنى \"rest\"؟",
          "questionEn": "What does \"rest\" mean?",
          "options": [
            "يرتاح",
            "هالويكند",
            "يدخر فلوس",
            "خارج البلد"
          ],
          "correctIndex": 0,
          "explanationAr": "\"rest\" /rɛst/ تعني: يرتاح. مثال: I'm going to rest."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "I'm going to travel next week.",
            "I will to travel next week."
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: I'm going to travel next week. — will لا تأخذ to، والخطة المقررة أفضل بـ going to."
        }
      ]
    }
  },
  {
    "id": "sg_103",
    "pillarId": "grammar",
    "pillarNameAr": "القواعد التحدثية السريعة",
    "pillarNameEn": "Spoken Grammar & Fast Patterns",
    "pillarIcon": "🧠",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "Will: قرارات فورية ووعود وتوقعات",
    "titleEn": "Will: Instant Decisions, Promises and Predictions",
    "descAr": "استخدم will للقرار اللحظي (I'll get it!) والوعد والتوقع، وقارنه بـ going to.",
    "descEn": "Use will for snap decisions, promises and predictions; compare with going to.",
    "speakingGoalAr": "اعرض مساعدتك على سارة في ثلاث مواقف بـ I'll.",
    "speakingGoalEn": "Offer help in three situations with I'll.",
    "keyPattern": {
      "ruleAr": "will + فعل أصلي للقرار وقت الكلام والوعد والتوقع الشخصي. الاختصار I'll والنفي won't. أما going to فللخطة المسبقة.",
      "ruleEn": "will + base verb for decisions at the moment of speaking, promises and opinions about the future; won't = will not. going to = prior plans.",
      "formula": "subject + will ('ll) / won't + base verb"
    },
    "practicalExamples": [
      {
        "en": "The phone is ringing. I'll get it!",
        "ar": "الجوال يرن. أنا برد!"
      },
      {
        "en": "I promise I won't be late.",
        "ar": "أوعدك ما راح أتأخر."
      },
      {
        "en": "I think Al-Nassr will win.",
        "ar": "أتوقع النصر بيفوز."
      },
      {
        "en": "Don't worry, I'll help you with your homework.",
        "ar": "لا تشيل هم، بساعدك في الواجب."
      },
      {
        "en": "Will you marry me? Just kidding!",
        "ar": "تتزوجيني؟ أمزح!"
      },
      {
        "en": "It will probably be hot tomorrow.",
        "ar": "غالباً بكرة بيكون حار."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "I will to call you.",
        "correct": "I'll call you.",
        "whyAr": "لا to بعد will."
      },
      {
        "incorrect": "I'm going to answer it! (phone rings now)",
        "correct": "I'll answer it!",
        "whyAr": "القرار اللحظي ⇐ will."
      },
      {
        "incorrect": "He wills come.",
        "correct": "He will come.",
        "whyAr": "will ما تتغير مع he."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اعرض مساعدتك على سارة وأعطها وعداً.",
      "promptEn": "Offer help and make a promise to Sara.",
      "saraQuestionAr": "عندي مشكلة: نسيت جوالي في البيت والاختبار بعد ساعة!",
      "saraQuestionEn": "Problem: I forgot my phone and my exam is in an hour!",
      "recommendedResponseEn": "Don't worry, I'll lend you my phone. I'll help you revise. I promise you'll be fine."
    },
    "quiz": [
      {
        "questionAr": "الموقف: الباب يدق. ماذا تقول؟",
        "questionEn": "Doorbell rings. You say:",
        "options": [
          "I'm going to open it.",
          "I'll open it.",
          "I open it."
        ],
        "correctIndex": 1,
        "explanationAr": "قرار لحظي ⇐ I'll."
      },
      {
        "questionAr": "نفي will:",
        "questionEn": "Negative of will:",
        "options": [
          "willn't",
          "won't",
          "don't will"
        ],
        "correctIndex": 1,
        "explanationAr": "will not = won't."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'll call you.",
          "I will to call you."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I'll call you. — لا to بعد will."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'm going to answer it! (phone rings now)",
          "I'll answer it!"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I'll answer it! — القرار اللحظي ⇐ will."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "He will come.",
          "He wills come."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: He will come. — will ما تتغير مع he."
      }
    ],
    "whiteboardNotes": {
      "title": "Will: Instant Decisions, Promises and Predictions",
      "pointsAr": [
        "يعرض المساعدة بـ I'll.",
        "يعد ويتوقع بـ will/won't.",
        "يفرق بين will و going to.",
        "will + فعل أصلي للقرار وقت الكلام والوعد والتوقع الشخصي. الاختصار I'll والنفي won't. أما going to فللخطة المسبقة."
      ],
      "pointsEn": [
        "Offer help with I'll.",
        "Promise and predict with will/won't.",
        "Choose between will and going to.",
        "will + base verb for decisions at the moment of speaking, promises and opinions about the future; won't = will not. going to = prior plans."
      ],
      "chalkHighlight": "subject + will ('ll) / won't + base verb"
    },
    "unit": 4,
    "cefr": "A2",
    "objectivesAr": [
      "يعرض المساعدة بـ I'll.",
      "يعد ويتوقع بـ will/won't.",
      "يفرق بين will و going to."
    ],
    "objectivesEn": [
      "Offer help with I'll.",
      "Promise and predict with will/won't.",
      "Choose between will and going to."
    ],
    "vocabulary": [
      {
        "word": "promise",
        "ipa": "/ˈprɑːmɪs/",
        "ar": "يوعد/وعد",
        "exampleEn": "I promise I'll call.",
        "exampleAr": "أوعدك بتصل."
      },
      {
        "word": "probably",
        "ipa": "/ˈprɑːbəbli/",
        "ar": "غالباً",
        "exampleEn": "It'll probably rain.",
        "exampleAr": "غالباً بتمطر."
      },
      {
        "word": "I think",
        "ipa": "/aɪ θɪŋk/",
        "ar": "أتوقع/أظن",
        "exampleEn": "I think you'll pass.",
        "exampleAr": "أتوقع بتنجح."
      },
      {
        "word": "pass",
        "ipa": "/pæs/",
        "ar": "ينجح (اختبار)",
        "exampleEn": "You'll pass the exam.",
        "exampleAr": "بتنجح في الاختبار."
      },
      {
        "word": "carry",
        "ipa": "/ˈkæri/",
        "ar": "يشيل/يحمل",
        "exampleEn": "I'll carry your bag.",
        "exampleAr": "بشيل شنطتك."
      },
      {
        "word": "answer",
        "ipa": "/ˈænsər/",
        "ar": "يرد/يجاوب",
        "exampleEn": "I'll answer the door.",
        "exampleAr": "بفتح الباب."
      },
      {
        "word": "forget",
        "ipa": "/fərˈɡɛt/",
        "ar": "ينسى",
        "exampleEn": "I won't forget.",
        "exampleAr": "ما راح أنسى."
      },
      {
        "word": "future",
        "ipa": "/ˈfjuːtʃər/",
        "ar": "المستقبل",
        "exampleEn": "In the future, cars will fly.",
        "exampleAr": "في المستقبل السيارات بتطير."
      },
      {
        "word": "maybe",
        "ipa": "/ˈmeɪbi/",
        "ar": "يمكن",
        "exampleEn": "Maybe I'll come.",
        "exampleAr": "يمكن أجي."
      },
      {
        "word": "order",
        "ipa": "/ˈɔːrdər/",
        "ar": "يطلب",
        "exampleEn": "I'll order a burger.",
        "exampleAr": "بطلب برجر."
      }
    ],
    "grammarFocus": {
      "ruleAr": "will + فعل أصلي للقرار وقت الكلام والوعد والتوقع الشخصي. الاختصار I'll والنفي won't. أما going to فللخطة المسبقة.",
      "ruleEn": "will + base verb for decisions at the moment of speaking, promises and opinions about the future; won't = will not. going to = prior plans.",
      "formula": "subject + will ('ll) / won't + base verb",
      "examples": [
        {
          "en": "The phone is ringing. I'll get it!",
          "ar": "الجوال يرن. أنا برد!"
        },
        {
          "en": "I promise I won't be late.",
          "ar": "أوعدك ما راح أتأخر."
        },
        {
          "en": "I think Al-Nassr will win.",
          "ar": "أتوقع النصر بيفوز."
        },
        {
          "en": "Don't worry, I'll help you with your homework.",
          "ar": "لا تشيل هم، بساعدك في الواجب."
        },
        {
          "en": "Will you marry me? Just kidding!",
          "ar": "تتزوجيني؟ أمزح!"
        },
        {
          "en": "It will probably be hot tomorrow.",
          "ar": "غالباً بكرة بيكون حار."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "This bag is so heavy!",
        "ar": "هالشنطة ثقيلة مرة!"
      },
      {
        "speaker": "Student",
        "en": "I'll carry it for you.",
        "ar": "أنا بشيلها عنك."
      },
      {
        "speaker": "Sara",
        "en": "Thanks! Are you ready for the exam tomorrow?",
        "ar": "مشكور! جاهز لاختبار بكرة؟"
      },
      {
        "speaker": "Student",
        "en": "I think I'll pass. I studied all week.",
        "ar": "أتوقع بنجح. ذاكرت طول الأسبوع."
      },
      {
        "speaker": "Sara",
        "en": "Great. Don't stay up late!",
        "ar": "ممتاز. لا تسهر!"
      },
      {
        "speaker": "Student",
        "en": "I promise I won't. I'll sleep at ten.",
        "ar": "أوعدك ما بسهر. بنام عشر."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: This bag is so heavy!\nStudent: I'll carry it for you.\nSara: Thanks! Are you ready for the exam tomorrow?\nStudent: I think I'll pass. I studied all week.\nSara: Great. Don't stay up late!\nStudent: I promise I won't. I'll sleep at ten.",
      "questions": [
        {
          "questionAr": "وش عرض الطالب؟",
          "questionEn": "What does the student offer?",
          "options": [
            "to carry the bag",
            "to buy coffee",
            "to open the door"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: to carry the bag"
        },
        {
          "questionAr": "ليش يتوقع ينجح؟",
          "questionEn": "Why does he think he'll pass?",
          "options": [
            "the exam is easy",
            "he studied all week",
            "Sara helped"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: he studied all week"
        },
        {
          "questionAr": "متى بينام؟",
          "questionEn": "When will he sleep?",
          "options": [
            "at nine",
            "at ten",
            "at midnight"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: at ten"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "I'll /aɪl/ vs I /aɪ/ — the dark L",
      "items": [
        "I'll call /aɪl kɔːl/",
        "won't /woʊnt/ vs want /wɑːnt/",
        "we'll /wiːl/"
      ],
      "tipAr": "won't تنطق «ونت» بصوت «أو» طويل، وwant «وانت». الفرق مهم وإلا ينقلب المعنى!"
    },
    "exercises": {
      "easy": [
        {
          "id": "sg_103_e1",
          "type": "meaning",
          "promptEn": "What does \"promise\" mean?",
          "promptAr": "ما معنى \"promise\"؟",
          "options": [
            "المستقبل",
            "يوعد/وعد",
            "ينسى",
            "يطلب"
          ],
          "correctIndex": 1,
          "answer": "يوعد/وعد",
          "explanationAr": "\"promise\" /ˈprɑːmɪs/ تعني: يوعد/وعد. مثال: I promise I'll call."
        },
        {
          "id": "sg_103_e2",
          "type": "meaning",
          "promptEn": "What does \"probably\" mean?",
          "promptAr": "ما معنى \"probably\"؟",
          "options": [
            "غالباً",
            "ينجح (اختبار)",
            "المستقبل",
            "أتوقع/أظن"
          ],
          "correctIndex": 0,
          "answer": "غالباً",
          "explanationAr": "\"probably\" /ˈprɑːbəbli/ تعني: غالباً. مثال: It'll probably rain."
        },
        {
          "id": "sg_103_e3",
          "type": "meaning",
          "promptEn": "What does \"I think\" mean?",
          "promptAr": "ما معنى \"I think\"؟",
          "options": [
            "أتوقع/أظن",
            "يشيل/يحمل",
            "ينسى",
            "يوعد/وعد"
          ],
          "correctIndex": 0,
          "answer": "أتوقع/أظن",
          "explanationAr": "\"I think\" /aɪ θɪŋk/ تعني: أتوقع/أظن. مثال: I think you'll pass."
        },
        {
          "id": "sg_103_e4",
          "type": "meaning",
          "promptEn": "What does \"pass\" mean?",
          "promptAr": "ما معنى \"pass\"؟",
          "options": [
            "يمكن",
            "ينجح (اختبار)",
            "يشيل/يحمل",
            "ينسى"
          ],
          "correctIndex": 1,
          "answer": "ينجح (اختبار)",
          "explanationAr": "\"pass\" /pæs/ تعني: ينجح (اختبار). مثال: You'll pass the exam."
        }
      ],
      "medium": [
        {
          "id": "sg_103_m1",
          "type": "gap",
          "promptEn": "Complete: The phone is ringing. ____ get it!",
          "promptAr": "أكمل الفراغ: (الجوال يرن. أنا برد!)",
          "options": [
            "I",
            "I'm going to",
            "I'll"
          ],
          "correctIndex": 2,
          "answer": "The phone is ringing. I'll get it!",
          "explanationAr": "الإجابة: I'll. will + فعل أصلي للقرار وقت الكلام والوعد والتوقع الشخصي. الاختصار I'll والنفي won't. أما going to فللخطة المسبقة."
        },
        {
          "id": "sg_103_m2",
          "type": "gap",
          "promptEn": "Complete: I promise I ____ be late.",
          "promptAr": "أكمل الفراغ: (أوعدك ما راح أتأخر.)",
          "options": [
            "won't",
            "willn't",
            "don't"
          ],
          "correctIndex": 0,
          "answer": "I promise I won't be late.",
          "explanationAr": "الإجابة: won't. will + فعل أصلي للقرار وقت الكلام والوعد والتوقع الشخصي. الاختصار I'll والنفي won't. أما going to فللخطة المسبقة."
        },
        {
          "id": "sg_103_m3",
          "type": "gap",
          "promptEn": "Complete: I think Al-Nassr ____.",
          "promptAr": "أكمل الفراغ: (أتوقع النصر بيفوز.)",
          "options": [
            "will win",
            "will wins",
            "wins"
          ],
          "correctIndex": 0,
          "answer": "I think Al-Nassr will win.",
          "explanationAr": "الإجابة: will win. will + فعل أصلي للقرار وقت الكلام والوعد والتوقع الشخصي. الاختصار I'll والنفي won't. أما going to فللخطة المسبقة."
        },
        {
          "id": "sg_103_m4",
          "type": "gap",
          "promptEn": "Complete: Don't worry, ____ you with your homework.",
          "promptAr": "أكمل الفراغ: (لا تشيل هم، بساعدك في الواجب.)",
          "options": [
            "I'll help",
            "I help",
            "I'm helping"
          ],
          "correctIndex": 0,
          "answer": "Don't worry, I'll help you with your homework.",
          "explanationAr": "الإجابة: I'll help. will + فعل أصلي للقرار وقت الكلام والوعد والتوقع الشخصي. الاختصار I'll والنفي won't. أما going to فللخطة المسبقة."
        }
      ],
      "hard": [
        {
          "id": "sg_103_h1",
          "type": "order",
          "promptEn": "Put the words in order: Will / kidding! / marry / Just / me? / you",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (تتزوجيني؟ أمزح!)",
          "answer": "Will you marry me? Just kidding!",
          "explanationAr": "الترتيب الصحيح: Will you marry me? Just kidding!"
        },
        {
          "id": "sg_103_h2",
          "type": "order",
          "promptEn": "Put the words in order: It / tomorrow. / will / hot / be / probably",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (غالباً بكرة بيكون حار.)",
          "answer": "It will probably be hot tomorrow.",
          "explanationAr": "الترتيب الصحيح: It will probably be hot tomorrow."
        },
        {
          "id": "sg_103_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أوعدك ما راح أتأخر.",
          "answer": "I promise I won't be late.",
          "explanationAr": "ترجمة مقترحة: I promise I won't be late."
        },
        {
          "id": "sg_103_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: لا تشيل هم، بساعدك في الواجب.",
          "answer": "Don't worry, I'll help you with your homework.",
          "explanationAr": "ترجمة مقترحة: Don't worry, I'll help you with your homework."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "I will going to travel.",
        "correct": "I'm going to travel. / I'll travel.",
        "whyAr": "لا نجمع will مع going to."
      },
      {
        "incorrect": "Inshallah I go tomorrow.",
        "correct": "Inshallah, I'll go tomorrow.",
        "whyAr": "حتى مع إن شاء الله، المستقبل يحتاج will أو going to."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (Going to: خططك ونواياك): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "She is going to visits us.",
          "She is going to visit us."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: She is going to visit us. — بعد to فعل أصلي.",
        "fromLessonId": "sg_119"
      },
      {
        "questionAr": "مراجعة (المقارنة: bigger than / more expensive than): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Riyadh is bigger than Abha.",
          "Riyadh is bigger from Abha."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Riyadh is bigger than Abha. — «من» في المقارنة = than وليس from.",
        "fromLessonId": "sg_117"
      },
      {
        "questionAr": "مراجعة (الماضي البسيط: أفعال منتظمة وشاذة): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I goed to the mall.",
          "I went to the mall."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I went to the mall. — go فعل شاذ ⇐ went.",
        "fromLessonId": "sg_114"
      },
      {
        "questionAr": "ما معنى \"world\"؟",
        "questionEn": "What does \"world\" mean?",
        "options": [
          "مبنى",
          "الأشهر",
          "الأجمل",
          "العالم"
        ],
        "correctIndex": 3,
        "explanationAr": "\"world\" /wɜːrld/ تعني: العالم. مثال: in the world",
        "fromLessonId": "sg_118"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (أتوقع النصر بيفوز.)",
          "questionEn": "Complete: I think Al-Nassr ____.",
          "options": [
            "will win",
            "will wins",
            "wins"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: will win. will + فعل أصلي للقرار وقت الكلام والوعد والتوقع الشخصي. الاختصار I'll والنفي won't. أما going to فللخطة المسبقة."
        },
        {
          "questionAr": "أكمل الفراغ: (لا تشيل هم، بساعدك في الواجب.)",
          "questionEn": "Complete: Don't worry, ____ you with your homework.",
          "options": [
            "I'll help",
            "I help",
            "I'm helping"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: I'll help. will + فعل أصلي للقرار وقت الكلام والوعد والتوقع الشخصي. الاختصار I'll والنفي won't. أما going to فللخطة المسبقة."
        },
        {
          "questionAr": "ما معنى \"carry\"؟",
          "questionEn": "What does \"carry\" mean?",
          "options": [
            "ينجح (اختبار)",
            "يشيل/يحمل",
            "يوعد/وعد",
            "ينسى"
          ],
          "correctIndex": 1,
          "explanationAr": "\"carry\" /ˈkæri/ تعني: يشيل/يحمل. مثال: I'll carry your bag."
        },
        {
          "questionAr": "ما معنى \"answer\"؟",
          "questionEn": "What does \"answer\" mean?",
          "options": [
            "غالباً",
            "يرد/يجاوب",
            "يطلب",
            "ينجح (اختبار)"
          ],
          "correctIndex": 1,
          "explanationAr": "\"answer\" /ˈænsər/ تعني: يرد/يجاوب. مثال: I'll answer the door."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "I will going to travel.",
            "I'm going to travel. / I'll travel."
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: I'm going to travel. / I'll travel. — لا نجمع will مع going to."
        }
      ]
    }
  },
  {
    "id": "sg_121",
    "pillarId": "grammar",
    "pillarNameAr": "القواعد التحدثية السريعة",
    "pillarNameEn": "Spoken Grammar & Fast Patterns",
    "pillarIcon": "🧠",
    "level": "متوسط (Intermediate)",
    "levelCode": "B1-B2",
    "titleAr": "المضارع التام للتجارب: Have you ever...?",
    "titleEn": "Present Perfect for Experiences: Have You Ever...?",
    "descAr": "تكلم عن تجاربك في الحياة بدون تحديد وقت: Have you ever been to...?",
    "descEn": "Talk about life experiences without a specific time.",
    "speakingGoalAr": "اسأل سارة عن خمس تجارب وجاوب عن تجاربك.",
    "speakingGoalEn": "Ask Sara about five experiences and share yours.",
    "keyPattern": {
      "ruleAr": "have/has + التصريف الثالث (been, eaten, seen) للتجربة في أي وقت من الحياة. ever في السؤال، و never للنفي. إذا ذكرنا وقتاً محدداً نرجع للماضي البسيط.",
      "ruleEn": "have/has + past participle for life experiences; ever in questions, never in negatives. With a finished time, switch to past simple.",
      "formula": "Have you ever + V3? | I've / I've never + V3"
    },
    "practicalExamples": [
      {
        "en": "Have you ever been to London?",
        "ar": "قد رحت لندن؟"
      },
      {
        "en": "I've never eaten sushi.",
        "ar": "عمري ما أكلت سوشي."
      },
      {
        "en": "She has seen the Northern Lights.",
        "ar": "هي قد شافت الشفق القطبي."
      },
      {
        "en": "We've visited AlUla twice.",
        "ar": "زرنا العلا مرتين."
      },
      {
        "en": "Yes, I have. I went there in 2023.",
        "ar": "إيه، رحت هناك في ٢٠٢٣."
      },
      {
        "en": "Have you ever ridden a camel?",
        "ar": "قد ركبت جمل؟"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Have you ever went to Paris?",
        "correct": "Have you ever been to Paris?",
        "whyAr": "بعد have نستخدم التصريف الثالث."
      },
      {
        "incorrect": "I have visited London in 2022.",
        "correct": "I visited London in 2022.",
        "whyAr": "مع وقت محدد نستخدم الماضي البسيط."
      },
      {
        "incorrect": "She have never seen snow.",
        "correct": "She has never seen snow.",
        "whyAr": "she ⇐ has."
      }
    ],
    "speakingChallenge": {
      "promptAr": "أجرِ مقابلة «Have you ever» مع سارة.",
      "promptEn": "Do a 'Have you ever' interview with Sara.",
      "saraQuestionAr": "اسألني عن أغرب تجاربي!",
      "saraQuestionEn": "Ask me about my most unusual experiences!",
      "recommendedResponseEn": "Have you ever been to Japan? Have you ever ridden a camel? I've never seen snow, but I've been to the desert many times."
    },
    "quiz": [
      {
        "questionAr": "التصريف الثالث من go:",
        "questionEn": "Past participle of 'go':",
        "options": [
          "went",
          "gone/been",
          "goed"
        ],
        "correctIndex": 1,
        "explanationAr": "go ⇐ gone (ذهب ولم يرجع)/been (ذهب ورجع)."
      },
      {
        "questionAr": "أكمل: I've ___ flown in a helicopter.",
        "questionEn": "Complete: I've ___ flown in a helicopter.",
        "options": [
          "ever",
          "never",
          "yet"
        ],
        "correctIndex": 1,
        "explanationAr": "نفي التجربة ⇐ never."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Have you ever been to Paris?",
          "Have you ever went to Paris?"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Have you ever been to Paris? — بعد have نستخدم التصريف الثالث."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I have visited London in 2022.",
          "I visited London in 2022."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I visited London in 2022. — مع وقت محدد نستخدم الماضي البسيط."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "She has never seen snow.",
          "She have never seen snow."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: She has never seen snow. — she ⇐ has."
      }
    ],
    "whiteboardNotes": {
      "title": "Present Perfect for Experiences: Have You Ever...?",
      "pointsAr": [
        "يسأل عن التجارب بـ Have you ever.",
        "يستخدم التصريف الثالث الشائع.",
        "ينتقل للماضي البسيط عند ذكر التفاصيل.",
        "have/has + التصريف الثالث (been, eaten, seen) للتجربة في أي وقت من الحياة. ever في السؤال، و never للنفي. إذا ذكرنا وقتاً محدداً نرجع للماضي البسيط."
      ],
      "pointsEn": [
        "Ask about experiences with 'Have you ever'.",
        "Use common past participles.",
        "Switch to past simple for details.",
        "have/has + past participle for life experiences; ever in questions, never in negatives. With a finished time, switch to past simple."
      ],
      "chalkHighlight": "Have you ever + V3? | I've / I've never + V3"
    },
    "unit": 5,
    "cefr": "B1",
    "objectivesAr": [
      "يسأل عن التجارب بـ Have you ever.",
      "يستخدم التصريف الثالث الشائع.",
      "ينتقل للماضي البسيط عند ذكر التفاصيل."
    ],
    "objectivesEn": [
      "Ask about experiences with 'Have you ever'.",
      "Use common past participles.",
      "Switch to past simple for details."
    ],
    "vocabulary": [
      {
        "word": "been",
        "ipa": "/bɪn/",
        "ar": "ذهب (تجربة)",
        "exampleEn": "I've been to Egypt.",
        "exampleAr": "قد رحت مصر."
      },
      {
        "word": "ever",
        "ipa": "/ˈɛvər/",
        "ar": "في حياتك/أبداً (سؤال)",
        "exampleEn": "Have you ever tried it?",
        "exampleAr": "قد جربتها؟"
      },
      {
        "word": "never",
        "ipa": "/ˈnɛvər/",
        "ar": "أبداً/عمري ما",
        "exampleEn": "I've never flown.",
        "exampleAr": "عمري ما طرت."
      },
      {
        "word": "tried",
        "ipa": "/traɪd/",
        "ar": "جرّب",
        "exampleEn": "I've tried camel milk.",
        "exampleAr": "جربت حليب ناقة."
      },
      {
        "word": "eaten",
        "ipa": "/ˈiːtən/",
        "ar": "مأكول",
        "exampleEn": "Have you eaten sushi?",
        "exampleAr": "قد أكلت سوشي؟",
        "note": "past participle of eat: eat → ate → eaten"
      },
      {
        "word": "seen",
        "ipa": "/siːn/",
        "ar": "مَرئي / شاف",
        "exampleEn": "I've seen snow once.",
        "exampleAr": "شفت ثلج مرة.",
        "note": "past participle of see: see → saw → seen"
      },
      {
        "word": "ridden",
        "ipa": "/ˈrɪdən/",
        "ar": "مركوب / ركب",
        "exampleEn": "He's ridden a horse.",
        "exampleAr": "قد ركب خيل.",
        "note": "past participle of ride: ride → rode → ridden"
      },
      {
        "word": "once",
        "ipa": "/wʌns/",
        "ar": "مرة وحدة",
        "exampleEn": "I've been there once.",
        "exampleAr": "رحت مرة وحدة."
      },
      {
        "word": "twice",
        "ipa": "/twaɪs/",
        "ar": "مرتين",
        "exampleEn": "She's read it twice.",
        "exampleAr": "قرأتها مرتين."
      },
      {
        "word": "experience",
        "ipa": "/ɪkˈspɪriəns/",
        "ar": "تجربة",
        "exampleEn": "It was a great experience.",
        "exampleAr": "كانت تجربة حلوة."
      }
    ],
    "grammarFocus": {
      "ruleAr": "have/has + التصريف الثالث (been, eaten, seen) للتجربة في أي وقت من الحياة. ever في السؤال، و never للنفي. إذا ذكرنا وقتاً محدداً نرجع للماضي البسيط.",
      "ruleEn": "have/has + past participle for life experiences; ever in questions, never in negatives. With a finished time, switch to past simple.",
      "formula": "Have you ever + V3? | I've / I've never + V3",
      "examples": [
        {
          "en": "Have you ever been to London?",
          "ar": "قد رحت لندن؟"
        },
        {
          "en": "I've never eaten sushi.",
          "ar": "عمري ما أكلت سوشي."
        },
        {
          "en": "She has seen the Northern Lights.",
          "ar": "هي قد شافت الشفق القطبي."
        },
        {
          "en": "We've visited AlUla twice.",
          "ar": "زرنا العلا مرتين."
        },
        {
          "en": "Yes, I have. I went there in 2023.",
          "ar": "إيه، رحت هناك في ٢٠٢٣."
        },
        {
          "en": "Have you ever ridden a camel?",
          "ar": "قد ركبت جمل؟"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Have you ever been abroad?",
        "ar": "قد سافرت برا؟"
      },
      {
        "speaker": "Student",
        "en": "Yes, I have. I've been to Malaysia and Egypt.",
        "ar": "إيه، رحت ماليزيا ومصر."
      },
      {
        "speaker": "Sara",
        "en": "Have you ever seen snow?",
        "ar": "قد شفت ثلج؟"
      },
      {
        "speaker": "Student",
        "en": "Only once. I saw it in Tabuk two years ago.",
        "ar": "مرة وحدة. شفته في تبوك قبل سنتين."
      },
      {
        "speaker": "Sara",
        "en": "Have you ever eaten anything strange?",
        "ar": "قد أكلت شي غريب؟"
      },
      {
        "speaker": "Student",
        "en": "I've never eaten anything strange, but I've tried camel milk!",
        "ar": "عمري ما أكلت شي غريب، بس جربت حليب ناقة!"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Have you ever been abroad?\nStudent: Yes, I have. I've been to Malaysia and Egypt.\nSara: Have you ever seen snow?\nStudent: Only once. I saw it in Tabuk two years ago.\nSara: Have you ever eaten anything strange?\nStudent: I've never eaten anything strange, but I've tried camel milk!",
      "questions": [
        {
          "questionAr": "أي دول زار؟",
          "questionEn": "Which countries has the student visited?",
          "options": [
            "Malaysia and Egypt",
            "Turkey and Egypt",
            "UK"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: Malaysia and Egypt"
        },
        {
          "questionAr": "وين شاف الثلج؟",
          "questionEn": "Where did he see snow?",
          "options": [
            "Abha",
            "Tabuk",
            "Turkey"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: Tabuk"
        },
        {
          "questionAr": "وش جرب؟",
          "questionEn": "What has he tried?",
          "options": [
            "sushi",
            "camel milk",
            "snails"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: camel milk"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Contractions I've /aɪv/, she's /ʃiːz/, been /bɪn/",
      "items": [
        "I've been /aɪv bɪn/",
        "She's seen /ʃiːz siːn/",
        "never /ˈnɛvər/ (v not f)"
      ],
      "tipAr": "been تنطق قصيرة «بِن» في الإنجليزية الأمريكية، مو «بين» طويلة."
    },
    "exercises": {
      "easy": [
        {
          "id": "sg_121_e1",
          "type": "meaning",
          "promptEn": "What does \"been\" mean?",
          "promptAr": "ما معنى \"been\"؟",
          "options": [
            "مرتين",
            "مرة وحدة",
            "تجربة",
            "ذهب (تجربة)"
          ],
          "correctIndex": 3,
          "answer": "ذهب (تجربة)",
          "explanationAr": "\"been\" /bɪn/ تعني: ذهب (تجربة). مثال: I've been to Egypt."
        },
        {
          "id": "sg_121_e2",
          "type": "meaning",
          "promptEn": "What does \"ever\" mean?",
          "promptAr": "ما معنى \"ever\"؟",
          "options": [
            "مركوب / ركب",
            "ذهب (تجربة)",
            "في حياتك/أبداً (سؤال)",
            "أبداً/عمري ما"
          ],
          "correctIndex": 2,
          "answer": "في حياتك/أبداً (سؤال)",
          "explanationAr": "\"ever\" /ˈɛvər/ تعني: في حياتك/أبداً (سؤال). مثال: Have you ever tried it?"
        },
        {
          "id": "sg_121_e3",
          "type": "meaning",
          "promptEn": "What does \"never\" mean?",
          "promptAr": "ما معنى \"never\"؟",
          "options": [
            "مركوب / ركب",
            "في حياتك/أبداً (سؤال)",
            "تجربة",
            "أبداً/عمري ما"
          ],
          "correctIndex": 3,
          "answer": "أبداً/عمري ما",
          "explanationAr": "\"never\" /ˈnɛvər/ تعني: أبداً/عمري ما. مثال: I've never flown."
        },
        {
          "id": "sg_121_e4",
          "type": "meaning",
          "promptEn": "What does \"tried\" mean?",
          "promptAr": "ما معنى \"tried\"؟",
          "options": [
            "ذهب (تجربة)",
            "جرّب",
            "مرتين",
            "أبداً/عمري ما"
          ],
          "correctIndex": 1,
          "answer": "جرّب",
          "explanationAr": "\"tried\" /traɪd/ تعني: جرّب. مثال: I've tried camel milk."
        }
      ],
      "medium": [
        {
          "id": "sg_121_m1",
          "type": "gap",
          "promptEn": "Complete: Have you ever ____ to London?",
          "promptAr": "أكمل الفراغ: (قد رحت لندن؟)",
          "options": [
            "go",
            "been",
            "went"
          ],
          "correctIndex": 1,
          "answer": "Have you ever been to London?",
          "explanationAr": "الإجابة: been. have/has + التصريف الثالث (been, eaten, seen) للتجربة في أي وقت من الحياة. ever في السؤال، و never للنفي. إذا ذكرنا وقتاً محدداً نرجع للماضي البسيط."
        },
        {
          "id": "sg_121_m2",
          "type": "gap",
          "promptEn": "Complete: I've ____ eaten sushi.",
          "promptAr": "أكمل الفراغ: (عمري ما أكلت سوشي.)",
          "options": [
            "not",
            "never",
            "ever"
          ],
          "correctIndex": 1,
          "answer": "I've never eaten sushi.",
          "explanationAr": "الإجابة: never. have/has + التصريف الثالث (been, eaten, seen) للتجربة في أي وقت من الحياة. ever في السؤال، و never للنفي. إذا ذكرنا وقتاً محدداً نرجع للماضي البسيط."
        },
        {
          "id": "sg_121_m3",
          "type": "gap",
          "promptEn": "Complete: She ____ the Northern Lights.",
          "promptAr": "أكمل الفراغ: (هي قد شافت الشفق القطبي.)",
          "options": [
            "have seen",
            "has seen",
            "has saw"
          ],
          "correctIndex": 1,
          "answer": "She has seen the Northern Lights.",
          "explanationAr": "الإجابة: has seen. have/has + التصريف الثالث (been, eaten, seen) للتجربة في أي وقت من الحياة. ever في السؤال، و never للنفي. إذا ذكرنا وقتاً محدداً نرجع للماضي البسيط."
        },
        {
          "id": "sg_121_m4",
          "type": "gap",
          "promptEn": "Complete: ____ visited AlUla twice.",
          "promptAr": "أكمل الفراغ: (زرنا العلا مرتين.)",
          "options": [
            "We has",
            "We've",
            "We"
          ],
          "correctIndex": 1,
          "answer": "We've visited AlUla twice.",
          "explanationAr": "الإجابة: We've. have/has + التصريف الثالث (been, eaten, seen) للتجربة في أي وقت من الحياة. ever في السؤال، و never للنفي. إذا ذكرنا وقتاً محدداً نرجع للماضي البسيط."
        }
      ],
      "hard": [
        {
          "id": "sg_121_h1",
          "type": "order",
          "promptEn": "Put the words in order: I / I / there / 2023. / have. / went / in / Yes,",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (إيه، رحت هناك في ٢٠٢٣.)",
          "answer": "Yes, I have. I went there in 2023.",
          "explanationAr": "الترتيب الصحيح: Yes, I have. I went there in 2023."
        },
        {
          "id": "sg_121_h2",
          "type": "order",
          "promptEn": "Put the words in order: ridden / camel? / you / ever / a / Have",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (قد ركبت جمل؟)",
          "answer": "Have you ever ridden a camel?",
          "explanationAr": "الترتيب الصحيح: Have you ever ridden a camel?"
        },
        {
          "id": "sg_121_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: عمري ما أكلت سوشي.",
          "answer": "I've never eaten sushi.",
          "explanationAr": "ترجمة مقترحة: I've never eaten sushi."
        },
        {
          "id": "sg_121_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: زرنا العلا مرتين.",
          "answer": "We've visited AlUla twice.",
          "explanationAr": "ترجمة مقترحة: We've visited AlUla twice."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Did you ever go to Paris? (as experience)",
        "correct": "Have you ever been to Paris?",
        "whyAr": "لسؤال التجربة نستخدم المضارع التام."
      },
      {
        "incorrect": "I have been in London last year.",
        "correct": "I was in London last year.",
        "whyAr": "last year وقت منتهي ⇐ ماضي بسيط."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (Will: قرارات فورية ووعود وتوقعات): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'll answer it!",
          "I'm going to answer it! (phone rings now)"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I'll answer it! — القرار اللحظي ⇐ will.",
        "fromLessonId": "sg_103"
      },
      {
        "questionAr": "مراجعة (التفضيل: the biggest / the most beautiful): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "He is the most tall boy.",
          "He is the tallest boy."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: He is the tallest boy. — الصفة القصيرة ⇐ est.",
        "fromLessonId": "sg_118"
      },
      {
        "questionAr": "مراجعة (Did: السؤال والنفي في الماضي): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Did you go?",
          "Did you went?"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Did you go? — بعد did الفعل أصلي.",
        "fromLessonId": "sg_115"
      },
      {
        "questionAr": "ما معنى \"Umrah\"؟",
        "questionEn": "What does \"Umrah\" mean?",
        "options": [
          "هالويكند",
          "السنة الجاية",
          "عمرة",
          "جامعة"
        ],
        "correctIndex": 2,
        "explanationAr": "\"Umrah\" /ˈʊmrə/ تعني: عمرة. مثال: We're going to do Umrah.",
        "fromLessonId": "sg_119"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (هي قد شافت الشفق القطبي.)",
          "questionEn": "Complete: She ____ the Northern Lights.",
          "options": [
            "have seen",
            "has seen",
            "has saw"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: has seen. have/has + التصريف الثالث (been, eaten, seen) للتجربة في أي وقت من الحياة. ever في السؤال، و never للنفي. إذا ذكرنا وقتاً محدداً نرجع للماضي البسيط."
        },
        {
          "questionAr": "أكمل الفراغ: (زرنا العلا مرتين.)",
          "questionEn": "Complete: ____ visited AlUla twice.",
          "options": [
            "We has",
            "We've",
            "We"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: We've. have/has + التصريف الثالث (been, eaten, seen) للتجربة في أي وقت من الحياة. ever في السؤال، و never للنفي. إذا ذكرنا وقتاً محدداً نرجع للماضي البسيط."
        },
        {
          "questionAr": "ما معنى \"eaten\"؟",
          "questionEn": "What does \"eaten\" mean?",
          "options": [
            "مرتين",
            "مَرئي / شاف",
            "ذهب (تجربة)",
            "مأكول"
          ],
          "correctIndex": 3,
          "explanationAr": "\"eaten\" /ˈiːtən/ تعني: مأكول. مثال: Have you eaten sushi?"
        },
        {
          "questionAr": "ما معنى \"seen\"؟",
          "questionEn": "What does \"seen\" mean?",
          "options": [
            "مرة وحدة",
            "في حياتك/أبداً (سؤال)",
            "ذهب (تجربة)",
            "مَرئي / شاف"
          ],
          "correctIndex": 3,
          "explanationAr": "\"seen\" /siːn/ تعني: مَرئي / شاف. مثال: I've seen snow once."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Have you ever been to Paris?",
            "Did you ever go to Paris? (as experience)"
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: Have you ever been to Paris? — لسؤال التجربة نستخدم المضارع التام."
        }
      ]
    }
  },
  {
    "id": "sg_122",
    "pillarId": "grammar",
    "pillarNameAr": "القواعد التحدثية السريعة",
    "pillarNameEn": "Spoken Grammar & Fast Patterns",
    "pillarIcon": "🧠",
    "level": "متوسط (Intermediate)",
    "levelCode": "B1-B2",
    "titleAr": "المضارع التام والماضي البسيط: just / already / yet",
    "titleEn": "Present Perfect vs Past Simple: Just, Already, Yet",
    "descAr": "متى تقول I've finished ومتى I finished؟ ومع just و already و yet.",
    "descEn": "When to say 'I've finished' vs 'I finished', with just, already and yet.",
    "speakingGoalAr": "أخبر سارة وش أنجزت اليوم ووش باقي ما سويته.",
    "speakingGoalEn": "Tell Sara what you've done today and what you haven't done yet.",
    "keyPattern": {
      "ruleAr": "المضارع التام لشيء له علاقة بالآن (I've lost my key = ما زال ضائعاً) ومع just/already/yet. الماضي البسيط لحدث في وقت منتهٍ (yesterday, at 5).",
      "ruleEn": "Present perfect links past to now (with just/already/yet); past simple for finished times.",
      "formula": "have/has + just/already + V3 | haven't + V3 + yet | past simple + finished time"
    },
    "practicalExamples": [
      {
        "en": "I've just finished my homework.",
        "ar": "توني خلصت واجبي."
      },
      {
        "en": "She has already eaten.",
        "ar": "هي قد أكلت خلاص."
      },
      {
        "en": "Have you sent the email yet?",
        "ar": "أرسلت الإيميل ولا للحين؟"
      },
      {
        "en": "I finished it two hours ago.",
        "ar": "خلصته قبل ساعتين."
      },
      {
        "en": "I haven't called him yet.",
        "ar": "للحين ما اتصلت عليه."
      },
      {
        "en": "I've lost my car key!",
        "ar": "ضيعت مفتاح سيارتي!"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "I have finished it yesterday.",
        "correct": "I finished it yesterday.",
        "whyAr": "yesterday ⇐ ماضي بسيط."
      },
      {
        "incorrect": "I didn't eat yet.",
        "correct": "I haven't eaten yet.",
        "whyAr": "yet مع المضارع التام (في الإنجليزية البريطانية والفصحى)."
      },
      {
        "incorrect": "I've finished just.",
        "correct": "I've just finished.",
        "whyAr": "just بين have والفعل."
      }
    ],
    "speakingChallenge": {
      "promptAr": "أخبر سارة وش سويت اليوم ووش باقي.",
      "promptEn": "Tell Sara what you've done and haven't done today.",
      "saraQuestionAr": "وش أنجزت اليوم؟ ووش باقي؟",
      "saraQuestionEn": "What have you done today? What haven't you done yet?",
      "recommendedResponseEn": "I've already prayed and had breakfast. I've just finished a lesson. I haven't done my homework yet. I called my mother at noon."
    },
    "quiz": [
      {
        "questionAr": "أكمل: I ___ my keys. I can't open the door.",
        "questionEn": "Complete: I ___ my keys.",
        "options": [
          "lost",
          "have lost",
          "lose"
        ],
        "correctIndex": 1,
        "explanationAr": "النتيجة الآن ⇐ have lost."
      },
      {
        "questionAr": "أكمل: We ___ to Dubai last year.",
        "questionEn": "Complete: We ___ to Dubai last year.",
        "options": [
          "have gone",
          "went",
          "have been"
        ],
        "correctIndex": 1,
        "explanationAr": "last year ⇐ went."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I have finished it yesterday.",
          "I finished it yesterday."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I finished it yesterday. — yesterday ⇐ ماضي بسيط."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I haven't eaten yet.",
          "I didn't eat yet."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I haven't eaten yet. — yet مع المضارع التام (في الإنجليزية البريطانية والفصحى)."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I've finished just.",
          "I've just finished."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I've just finished. — just بين have والفعل."
      }
    ],
    "whiteboardNotes": {
      "title": "Present Perfect vs Past Simple: Just, Already, Yet",
      "pointsAr": [
        "يستخدم just/already/yet.",
        "يختار بين الزمنين حسب الوقت.",
        "يحكي إنجازات اليوم.",
        "المضارع التام لشيء له علاقة بالآن (I've lost my key = ما زال ضائعاً) ومع just/already/yet. الماضي البسيط لحدث في وقت منتهٍ (yesterday, at 5)."
      ],
      "pointsEn": [
        "Use just, already and yet.",
        "Choose the tense based on time reference.",
        "Report today's achievements.",
        "Present perfect links past to now (with just/already/yet); past simple for finished times."
      ],
      "chalkHighlight": "have/has + just/already + V3 | haven't + V3 + yet | past simple + finished time"
    },
    "unit": 5,
    "cefr": "B1",
    "objectivesAr": [
      "يستخدم just/already/yet.",
      "يختار بين الزمنين حسب الوقت.",
      "يحكي إنجازات اليوم."
    ],
    "objectivesEn": [
      "Use just, already and yet.",
      "Choose the tense based on time reference.",
      "Report today's achievements."
    ],
    "vocabulary": [
      {
        "word": "just",
        "ipa": "/dʒʌst/",
        "ar": "توّ/للتو",
        "exampleEn": "I've just arrived.",
        "exampleAr": "توني وصلت."
      },
      {
        "word": "already",
        "ipa": "/ɔːlˈrɛdi/",
        "ar": "خلاص/من قبل",
        "exampleEn": "I've already paid.",
        "exampleAr": "دفعت خلاص."
      },
      {
        "word": "yet",
        "ipa": "/jɛt/",
        "ar": "للحين/بعد (نفي وسؤال)",
        "exampleEn": "Not yet.",
        "exampleAr": "لسى."
      },
      {
        "word": "finish",
        "ipa": "/ˈfɪnɪʃ/",
        "ar": "يخلّص/ينهي",
        "exampleEn": "Have you finished?",
        "exampleAr": "خلصت؟"
      },
      {
        "word": "send",
        "ipa": "/sɛnd/",
        "ar": "يرسل",
        "exampleEn": "I've sent it.",
        "exampleAr": "أرسلته."
      },
      {
        "word": "lose",
        "ipa": "/luːz/",
        "ar": "يضيّع",
        "exampleEn": "I've lost my wallet.",
        "exampleAr": "ضيعت محفظتي."
      },
      {
        "word": "arrive",
        "ipa": "/əˈraɪv/",
        "ar": "يوصل",
        "exampleEn": "Has he arrived?",
        "exampleAr": "وصل؟"
      },
      {
        "word": "pay",
        "ipa": "/peɪ/",
        "ar": "يدفع",
        "exampleEn": "Have you paid the bill?",
        "exampleAr": "دفعت الفاتورة؟"
      },
      {
        "word": "book",
        "ipa": "/bʊk/",
        "ar": "يحجز",
        "exampleEn": "I've booked the tickets.",
        "exampleAr": "حجزت التذاكر."
      },
      {
        "word": "pack",
        "ipa": "/pæk/",
        "ar": "يرتب الشنطة",
        "exampleEn": "Have you packed yet?",
        "exampleAr": "رتبت شنطتك؟"
      }
    ],
    "grammarFocus": {
      "ruleAr": "المضارع التام لشيء له علاقة بالآن (I've lost my key = ما زال ضائعاً) ومع just/already/yet. الماضي البسيط لحدث في وقت منتهٍ (yesterday, at 5).",
      "ruleEn": "Present perfect links past to now (with just/already/yet); past simple for finished times.",
      "formula": "have/has + just/already + V3 | haven't + V3 + yet | past simple + finished time",
      "examples": [
        {
          "en": "I've just finished my homework.",
          "ar": "توني خلصت واجبي."
        },
        {
          "en": "She has already eaten.",
          "ar": "هي قد أكلت خلاص."
        },
        {
          "en": "Have you sent the email yet?",
          "ar": "أرسلت الإيميل ولا للحين؟"
        },
        {
          "en": "I finished it two hours ago.",
          "ar": "خلصته قبل ساعتين."
        },
        {
          "en": "I haven't called him yet.",
          "ar": "للحين ما اتصلت عليه."
        },
        {
          "en": "I've lost my car key!",
          "ar": "ضيعت مفتاح سيارتي!"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Are you ready for the trip? Have you packed yet?",
        "ar": "جاهز للرحلة؟ رتبت شنطتك؟"
      },
      {
        "speaker": "Student",
        "en": "Yes, I've already packed. I did it last night.",
        "ar": "إيه رتبتها خلاص. سويتها البارحة."
      },
      {
        "speaker": "Sara",
        "en": "Have you booked the hotel?",
        "ar": "حجزت الفندق؟"
      },
      {
        "speaker": "Student",
        "en": "I've just booked it! Five minutes ago.",
        "ar": "توني حجزته! قبل خمس دقايق."
      },
      {
        "speaker": "Sara",
        "en": "And have you printed the tickets?",
        "ar": "وطبعت التذاكر؟"
      },
      {
        "speaker": "Student",
        "en": "Not yet. I'll do it after lunch.",
        "ar": "لسى. بسويها بعد الغداء."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Are you ready for the trip? Have you packed yet?\nStudent: Yes, I've already packed. I did it last night.\nSara: Have you booked the hotel?\nStudent: I've just booked it! Five minutes ago.\nSara: And have you printed the tickets?\nStudent: Not yet. I'll do it after lunch.",
      "questions": [
        {
          "questionAr": "متى رتب الشنطة؟",
          "questionEn": "When did the student pack?",
          "options": [
            "this morning",
            "last night",
            "not yet"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: last night"
        },
        {
          "questionAr": "متى حجز الفندق؟",
          "questionEn": "When did he book the hotel?",
          "options": [
            "yesterday",
            "five minutes ago",
            "last week"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: five minutes ago"
        },
        {
          "questionAr": "وش باقي؟",
          "questionEn": "What hasn't he done yet?",
          "options": [
            "pack",
            "book the hotel",
            "print the tickets"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: print the tickets"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "/dʒ/ in just vs /j/ in yet",
      "items": [
        "just /dʒʌst/",
        "yet /jɛt/",
        "already /ɔːlˈrɛdi/"
      ],
      "tipAr": "just تبدأ بصوت «ج» و yet بصوت «ي». لا تخلط: «جست» و«يت»."
    },
    "exercises": {
      "easy": [
        {
          "id": "sg_122_e1",
          "type": "meaning",
          "promptEn": "What does \"just\" mean?",
          "promptAr": "ما معنى \"just\"؟",
          "options": [
            "يوصل",
            "توّ/للتو",
            "يحجز",
            "يضيّع"
          ],
          "correctIndex": 1,
          "answer": "توّ/للتو",
          "explanationAr": "\"just\" /dʒʌst/ تعني: توّ/للتو. مثال: I've just arrived."
        },
        {
          "id": "sg_122_e2",
          "type": "meaning",
          "promptEn": "What does \"already\" mean?",
          "promptAr": "ما معنى \"already\"؟",
          "options": [
            "خلاص/من قبل",
            "يرسل",
            "يخلّص/ينهي",
            "يحجز"
          ],
          "correctIndex": 0,
          "answer": "خلاص/من قبل",
          "explanationAr": "\"already\" /ɔːlˈrɛdi/ تعني: خلاص/من قبل. مثال: I've already paid."
        },
        {
          "id": "sg_122_e3",
          "type": "meaning",
          "promptEn": "What does \"yet\" mean?",
          "promptAr": "ما معنى \"yet\"؟",
          "options": [
            "يحجز",
            "للحين/بعد (نفي وسؤال)",
            "توّ/للتو",
            "يرتب الشنطة"
          ],
          "correctIndex": 1,
          "answer": "للحين/بعد (نفي وسؤال)",
          "explanationAr": "\"yet\" /jɛt/ تعني: للحين/بعد (نفي وسؤال). مثال: Not yet."
        },
        {
          "id": "sg_122_e4",
          "type": "meaning",
          "promptEn": "What does \"finish\" mean?",
          "promptAr": "ما معنى \"finish\"؟",
          "options": [
            "يضيّع",
            "يخلّص/ينهي",
            "خلاص/من قبل",
            "يدفع"
          ],
          "correctIndex": 1,
          "answer": "يخلّص/ينهي",
          "explanationAr": "\"finish\" /ˈfɪnɪʃ/ تعني: يخلّص/ينهي. مثال: Have you finished?"
        }
      ],
      "medium": [
        {
          "id": "sg_122_m1",
          "type": "gap",
          "promptEn": "Complete: I've ____ finished my homework.",
          "promptAr": "أكمل الفراغ: (توني خلصت واجبي.)",
          "options": [
            "yet",
            "just",
            "ever"
          ],
          "correctIndex": 1,
          "answer": "I've just finished my homework.",
          "explanationAr": "الإجابة: just. المضارع التام لشيء له علاقة بالآن (I've lost my key = ما زال ضائعاً) ومع just/already/yet. الماضي البسيط لحدث في وقت منتهٍ (yesterday, at 5)."
        },
        {
          "id": "sg_122_m2",
          "type": "gap",
          "promptEn": "Complete: She has ____ eaten.",
          "promptAr": "أكمل الفراغ: (هي قد أكلت خلاص.)",
          "options": [
            "still",
            "already",
            "yet"
          ],
          "correctIndex": 1,
          "answer": "She has already eaten.",
          "explanationAr": "الإجابة: already. المضارع التام لشيء له علاقة بالآن (I've lost my key = ما زال ضائعاً) ومع just/already/yet. الماضي البسيط لحدث في وقت منتهٍ (yesterday, at 5)."
        },
        {
          "id": "sg_122_m3",
          "type": "gap",
          "promptEn": "Complete: Have you sent the email ____?",
          "promptAr": "أكمل الفراغ: (أرسلت الإيميل ولا للحين؟)",
          "options": [
            "yet",
            "already",
            "just"
          ],
          "correctIndex": 0,
          "answer": "Have you sent the email yet?",
          "explanationAr": "الإجابة: yet. المضارع التام لشيء له علاقة بالآن (I've lost my key = ما زال ضائعاً) ومع just/already/yet. الماضي البسيط لحدث في وقت منتهٍ (yesterday, at 5)."
        },
        {
          "id": "sg_122_m4",
          "type": "gap",
          "promptEn": "Complete: I ____ it two hours ago.",
          "promptAr": "أكمل الفراغ: (خلصته قبل ساعتين.)",
          "options": [
            "have finished",
            "finish",
            "finished"
          ],
          "correctIndex": 2,
          "answer": "I finished it two hours ago.",
          "explanationAr": "الإجابة: finished. المضارع التام لشيء له علاقة بالآن (I've lost my key = ما زال ضائعاً) ومع just/already/yet. الماضي البسيط لحدث في وقت منتهٍ (yesterday, at 5)."
        }
      ],
      "hard": [
        {
          "id": "sg_122_h1",
          "type": "order",
          "promptEn": "Put the words in order: I / yet. / him / haven't / called",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (للحين ما اتصلت عليه.)",
          "answer": "I haven't called him yet.",
          "explanationAr": "الترتيب الصحيح: I haven't called him yet."
        },
        {
          "id": "sg_122_h2",
          "type": "order",
          "promptEn": "Put the words in order: my / I've / car / key! / lost",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (ضيعت مفتاح سيارتي!)",
          "answer": "I've lost my car key!",
          "explanationAr": "الترتيب الصحيح: I've lost my car key!"
        },
        {
          "id": "sg_122_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: هي قد أكلت خلاص.",
          "answer": "She has already eaten.",
          "explanationAr": "ترجمة مقترحة: She has already eaten."
        },
        {
          "id": "sg_122_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: خلصته قبل ساعتين.",
          "answer": "I finished it two hours ago.",
          "explanationAr": "ترجمة مقترحة: I finished it two hours ago."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Did you finish yet?",
        "correct": "Have you finished yet?",
        "whyAr": "الإنجليزية الرسمية تفضّل المضارع التام مع yet."
      },
      {
        "incorrect": "Already I booked.",
        "correct": "I've already booked.",
        "whyAr": "مكان already بعد have."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (المضارع التام للتجارب: Have you ever...?): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I have visited London in 2022.",
          "I visited London in 2022."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I visited London in 2022. — مع وقت محدد نستخدم الماضي البسيط.",
        "fromLessonId": "sg_121"
      },
      {
        "questionAr": "مراجعة (Going to: خططك ونواياك): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'm going to travel.",
          "I going to travel."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I'm going to travel. — لا تحذف am.",
        "fromLessonId": "sg_119"
      },
      {
        "questionAr": "مراجعة (Some / Any / How much / How many: في السوبرماركت): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I want some rice.",
          "I want a rice."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I want some rice. — rice غير معدود؛ ما نقول a rice.",
        "fromLessonId": "sg_116"
      },
      {
        "questionAr": "ما معنى \"order\"؟",
        "questionEn": "What does \"order\" mean?",
        "options": [
          "المستقبل",
          "ينجح (اختبار)",
          "يطلب",
          "يمكن"
        ],
        "correctIndex": 2,
        "explanationAr": "\"order\" /ˈɔːrdər/ تعني: يطلب. مثال: I'll order a burger.",
        "fromLessonId": "sg_103"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (أرسلت الإيميل ولا للحين؟)",
          "questionEn": "Complete: Have you sent the email ____?",
          "options": [
            "yet",
            "already",
            "just"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: yet. المضارع التام لشيء له علاقة بالآن (I've lost my key = ما زال ضائعاً) ومع just/already/yet. الماضي البسيط لحدث في وقت منتهٍ (yesterday, at 5)."
        },
        {
          "questionAr": "أكمل الفراغ: (خلصته قبل ساعتين.)",
          "questionEn": "Complete: I ____ it two hours ago.",
          "options": [
            "have finished",
            "finish",
            "finished"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: finished. المضارع التام لشيء له علاقة بالآن (I've lost my key = ما زال ضائعاً) ومع just/already/yet. الماضي البسيط لحدث في وقت منتهٍ (yesterday, at 5)."
        },
        {
          "questionAr": "ما معنى \"send\"؟",
          "questionEn": "What does \"send\" mean?",
          "options": [
            "للحين/بعد (نفي وسؤال)",
            "يخلّص/ينهي",
            "يضيّع",
            "يرسل"
          ],
          "correctIndex": 3,
          "explanationAr": "\"send\" /sɛnd/ تعني: يرسل. مثال: I've sent it."
        },
        {
          "questionAr": "ما معنى \"lose\"؟",
          "questionEn": "What does \"lose\" mean?",
          "options": [
            "يضيّع",
            "يرتب الشنطة",
            "توّ/للتو",
            "يوصل"
          ],
          "correctIndex": 0,
          "explanationAr": "\"lose\" /luːz/ تعني: يضيّع. مثال: I've lost my wallet."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Did you finish yet?",
            "Have you finished yet?"
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: Have you finished yet? — الإنجليزية الرسمية تفضّل المضارع التام مع yet."
        }
      ]
    }
  },
  {
    "id": "sg_123",
    "pillarId": "grammar",
    "pillarNameAr": "القواعد التحدثية السريعة",
    "pillarNameEn": "Spoken Grammar & Fast Patterns",
    "pillarIcon": "🧠",
    "level": "متوسط (Intermediate)",
    "levelCode": "B1-B2",
    "titleAr": "Should / Must / Have to: النصيحة والإلزام",
    "titleEn": "Should, Must, Have To: Advice and Obligation",
    "descAr": "انصح غيرك واذكر القوانين والواجبات: لازم، ينبغي، مو لازم.",
    "descEn": "Give advice and talk about rules: must, should, have to, don't have to.",
    "speakingGoalAr": "أعط صديقاً أربع نصائح ووضح قاعدتين في مدرستك أو عملك.",
    "speakingGoalEn": "Give a friend four tips and explain two rules at school or work.",
    "keyPattern": {
      "ruleAr": "should للنصيحة، must للإلزام القوي أو القانون، have to لإلزام خارجي، و don't have to = مو لازم (اختياري)، بينما mustn't = ممنوع.",
      "ruleEn": "should = advice; must = strong obligation; have to = external obligation; don't have to = not necessary; mustn't = prohibited.",
      "formula": "should / must / have to + base verb | mustn't ≠ don't have to"
    },
    "practicalExamples": [
      {
        "en": "You should drink more water in summer.",
        "ar": "المفروض تشرب ماء أكثر في الصيف."
      },
      {
        "en": "You must wear a seatbelt.",
        "ar": "لازم تلبس حزام الأمان."
      },
      {
        "en": "I have to wake up early on Sunday.",
        "ar": "لازم أصحى بدري يوم الأحد."
      },
      {
        "en": "You don't have to bring anything.",
        "ar": "مو لازم تجيب شي."
      },
      {
        "en": "You mustn't use your phone while driving.",
        "ar": "ممنوع تستخدم الجوال وأنت تسوق."
      },
      {
        "en": "She has to finish the report today.",
        "ar": "لازم تخلص التقرير اليوم."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "You should to sleep early.",
        "correct": "You should sleep early.",
        "whyAr": "لا to بعد should."
      },
      {
        "incorrect": "He have to work.",
        "correct": "He has to work.",
        "whyAr": "he ⇐ has to."
      },
      {
        "incorrect": "You mustn't come (meaning: optional).",
        "correct": "You don't have to come.",
        "whyAr": "mustn't = ممنوع، و don't have to = مو لازم."
      }
    ],
    "speakingChallenge": {
      "promptAr": "انصح سارة: تبي تتعلم السباحة بسرعة.",
      "promptEn": "Advise Sara: she wants to learn to swim fast.",
      "saraQuestionAr": "أبي أتعلم سباحة في شهر. وش تنصحني؟",
      "saraQuestionEn": "I want to learn to swim in a month. Any advice?",
      "recommendedResponseEn": "You should take lessons with a coach. You have to practise three times a week. You mustn't swim alone. You don't have to buy expensive gear."
    },
    "quiz": [
      {
        "questionAr": "مو لازم = ",
        "questionEn": "'Not necessary' =",
        "options": [
          "mustn't",
          "don't have to",
          "shouldn't"
        ],
        "correctIndex": 1,
        "explanationAr": "don't have to = غير ضروري."
      },
      {
        "questionAr": "أكمل: You ___ smoke in the hospital.",
        "questionEn": "Complete: You ___ smoke in the hospital.",
        "options": [
          "don't have to",
          "mustn't",
          "should"
        ],
        "correctIndex": 1,
        "explanationAr": "ممنوع ⇐ mustn't."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "You should sleep early.",
          "You should to sleep early."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: You should sleep early. — لا to بعد should."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "He have to work.",
          "He has to work."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: He has to work. — he ⇐ has to."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "You mustn't come (meaning: optional).",
          "You don't have to come."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: You don't have to come. — mustn't = ممنوع، و don't have to = مو لازم."
      }
    ],
    "whiteboardNotes": {
      "title": "Should, Must, Have To: Advice and Obligation",
      "pointsAr": [
        "ينصح بـ should.",
        "يعبر عن الإلزام بـ must/have to.",
        "يفرق بين mustn't و don't have to.",
        "should للنصيحة، must للإلزام القوي أو القانون، have to لإلزام خارجي، و don't have to = مو لازم (اختياري)، بينما mustn't = ممنوع."
      ],
      "pointsEn": [
        "Advise with should.",
        "Express obligation with must/have to.",
        "Distinguish mustn't from don't have to.",
        "should = advice; must = strong obligation; have to = external obligation; don't have to = not necessary; mustn't = prohibited."
      ],
      "chalkHighlight": "should / must / have to + base verb | mustn't ≠ don't have to"
    },
    "unit": 5,
    "cefr": "B1",
    "objectivesAr": [
      "ينصح بـ should.",
      "يعبر عن الإلزام بـ must/have to.",
      "يفرق بين mustn't و don't have to."
    ],
    "objectivesEn": [
      "Advise with should.",
      "Express obligation with must/have to.",
      "Distinguish mustn't from don't have to."
    ],
    "vocabulary": [
      {
        "word": "should",
        "ipa": "/ʃʊd/",
        "ar": "ينبغي/المفروض",
        "exampleEn": "You should rest.",
        "exampleAr": "المفروض ترتاح."
      },
      {
        "word": "must",
        "ipa": "/mʌst/",
        "ar": "يجب",
        "exampleEn": "You must stop.",
        "exampleAr": "لازم توقف."
      },
      {
        "word": "have to",
        "ipa": "/ˈhæf tə/",
        "ar": "مضطر/لازم",
        "exampleEn": "I have to go.",
        "exampleAr": "لازم أمشي."
      },
      {
        "word": "seatbelt",
        "ipa": "/ˈsiːtbɛlt/",
        "ar": "حزام الأمان",
        "exampleEn": "Wear your seatbelt.",
        "exampleAr": "البس الحزام."
      },
      {
        "word": "rule",
        "ipa": "/ruːl/",
        "ar": "قانون/قاعدة",
        "exampleEn": "School rules are strict.",
        "exampleAr": "قوانين المدرسة صارمة."
      },
      {
        "word": "uniform",
        "ipa": "/ˈjuːnɪfɔːrm/",
        "ar": "زي رسمي",
        "exampleEn": "We have to wear a uniform.",
        "exampleAr": "لازم نلبس زي."
      },
      {
        "word": "allowed",
        "ipa": "/əˈlaʊd/",
        "ar": "مسموح",
        "exampleEn": "Phones aren't allowed.",
        "exampleAr": "الجوالات ممنوعة."
      },
      {
        "word": "advice",
        "ipa": "/ədˈvaɪs/",
        "ar": "نصيحة",
        "exampleEn": "Can I give you some advice?",
        "exampleAr": "أعطيك نصيحة؟"
      },
      {
        "word": "healthy",
        "ipa": "/ˈhɛlθi/",
        "ar": "صحي",
        "exampleEn": "You should eat healthy food.",
        "exampleAr": "المفروض تاكل صحي."
      },
      {
        "word": "on time",
        "ipa": "/ɑːn taɪm/",
        "ar": "في الموعد",
        "exampleEn": "You must be on time.",
        "exampleAr": "لازم تكون في الموعد."
      }
    ],
    "grammarFocus": {
      "ruleAr": "should للنصيحة، must للإلزام القوي أو القانون، have to لإلزام خارجي، و don't have to = مو لازم (اختياري)، بينما mustn't = ممنوع.",
      "ruleEn": "should = advice; must = strong obligation; have to = external obligation; don't have to = not necessary; mustn't = prohibited.",
      "formula": "should / must / have to + base verb | mustn't ≠ don't have to",
      "examples": [
        {
          "en": "You should drink more water in summer.",
          "ar": "المفروض تشرب ماء أكثر في الصيف."
        },
        {
          "en": "You must wear a seatbelt.",
          "ar": "لازم تلبس حزام الأمان."
        },
        {
          "en": "I have to wake up early on Sunday.",
          "ar": "لازم أصحى بدري يوم الأحد."
        },
        {
          "en": "You don't have to bring anything.",
          "ar": "مو لازم تجيب شي."
        },
        {
          "en": "You mustn't use your phone while driving.",
          "ar": "ممنوع تستخدم الجوال وأنت تسوق."
        },
        {
          "en": "She has to finish the report today.",
          "ar": "لازم تخلص التقرير اليوم."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "I feel tired all the time. What should I do?",
        "ar": "أحس بتعب دايماً. وش أسوي؟"
      },
      {
        "speaker": "Student",
        "en": "You should sleep earlier and drink more water.",
        "ar": "المفروض تنامين بدري وتشربين ماء أكثر."
      },
      {
        "speaker": "Sara",
        "en": "But I have to work late every night.",
        "ar": "بس لازم أشتغل لين وقت متأخر كل ليلة."
      },
      {
        "speaker": "Student",
        "en": "Then you should take short breaks.",
        "ar": "إذن المفروض تاخذين استراحات قصيرة."
      },
      {
        "speaker": "Sara",
        "en": "Do I have to stop coffee?",
        "ar": "لازم أوقف القهوة؟"
      },
      {
        "speaker": "Student",
        "en": "You don't have to stop, but you mustn't drink it after Asr.",
        "ar": "مو لازم توقفينها، بس ممنوع تشربينها بعد العصر."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: I feel tired all the time. What should I do?\nStudent: You should sleep earlier and drink more water.\nSara: But I have to work late every night.\nStudent: Then you should take short breaks.\nSara: Do I have to stop coffee?\nStudent: You don't have to stop, but you mustn't drink it after Asr.",
      "questions": [
        {
          "questionAr": "وش مشكلة سارة؟",
          "questionEn": "What's Sara's problem?",
          "options": [
            "she's hungry",
            "she's tired",
            "she's late"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: she's tired"
        },
        {
          "questionAr": "ليش ما تنام بدري؟",
          "questionEn": "Why can't she sleep early?",
          "options": [
            "she has to work late",
            "she watches TV",
            "she drinks coffee"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: she has to work late"
        },
        {
          "questionAr": "وش قاعدة القهوة؟",
          "questionEn": "What is the rule about coffee?",
          "options": [
            "stop it completely",
            "not after Asr",
            "only at night"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: not after Asr"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Silent L in should /ʃʊd/; have to /ˈhæftə/",
      "items": [
        "should /ʃʊd/ (no L)",
        "have to /ˈhæftə/",
        "must /mʌst/ → mus' in fast speech"
      ],
      "tipAr": "حرف L في should و would و could صامت. و have to تنطق «هافتا» بصوت f."
    },
    "exercises": {
      "easy": [
        {
          "id": "sg_123_e1",
          "type": "meaning",
          "promptEn": "What does \"should\" mean?",
          "promptAr": "ما معنى \"should\"؟",
          "options": [
            "يجب",
            "نصيحة",
            "صحي",
            "ينبغي/المفروض"
          ],
          "correctIndex": 3,
          "answer": "ينبغي/المفروض",
          "explanationAr": "\"should\" /ʃʊd/ تعني: ينبغي/المفروض. مثال: You should rest."
        },
        {
          "id": "sg_123_e2",
          "type": "meaning",
          "promptEn": "What does \"must\" mean?",
          "promptAr": "ما معنى \"must\"؟",
          "options": [
            "يجب",
            "مسموح",
            "في الموعد",
            "ينبغي/المفروض"
          ],
          "correctIndex": 0,
          "answer": "يجب",
          "explanationAr": "\"must\" /mʌst/ تعني: يجب. مثال: You must stop."
        },
        {
          "id": "sg_123_e3",
          "type": "meaning",
          "promptEn": "What does \"have to\" mean?",
          "promptAr": "ما معنى \"have to\"؟",
          "options": [
            "قانون/قاعدة",
            "مضطر/لازم",
            "صحي",
            "في الموعد"
          ],
          "correctIndex": 1,
          "answer": "مضطر/لازم",
          "explanationAr": "\"have to\" /ˈhæf tə/ تعني: مضطر/لازم. مثال: I have to go."
        },
        {
          "id": "sg_123_e4",
          "type": "meaning",
          "promptEn": "What does \"seatbelt\" mean?",
          "promptAr": "ما معنى \"seatbelt\"؟",
          "options": [
            "ينبغي/المفروض",
            "مسموح",
            "قانون/قاعدة",
            "حزام الأمان"
          ],
          "correctIndex": 3,
          "answer": "حزام الأمان",
          "explanationAr": "\"seatbelt\" /ˈsiːtbɛlt/ تعني: حزام الأمان. مثال: Wear your seatbelt."
        }
      ],
      "medium": [
        {
          "id": "sg_123_m1",
          "type": "gap",
          "promptEn": "Complete: You ____ drink more water in summer.",
          "promptAr": "أكمل الفراغ: (المفروض تشرب ماء أكثر في الصيف.)",
          "options": [
            "should to",
            "should",
            "must to"
          ],
          "correctIndex": 1,
          "answer": "You should drink more water in summer.",
          "explanationAr": "الإجابة: should. should للنصيحة، must للإلزام القوي أو القانون، have to لإلزام خارجي، و don't have to = مو لازم (اختياري)، بينما mustn't = ممنوع."
        },
        {
          "id": "sg_123_m2",
          "type": "gap",
          "promptEn": "Complete: You ____ wear a seatbelt.",
          "promptAr": "أكمل الفراغ: (لازم تلبس حزام الأمان.)",
          "options": [
            "must",
            "should to",
            "have"
          ],
          "correctIndex": 0,
          "answer": "You must wear a seatbelt.",
          "explanationAr": "الإجابة: must. should للنصيحة، must للإلزام القوي أو القانون، have to لإلزام خارجي، و don't have to = مو لازم (اختياري)، بينما mustn't = ممنوع."
        },
        {
          "id": "sg_123_m3",
          "type": "gap",
          "promptEn": "Complete: I ____ wake up early on Sunday.",
          "promptAr": "أكمل الفراغ: (لازم أصحى بدري يوم الأحد.)",
          "options": [
            "must to",
            "should to",
            "have to"
          ],
          "correctIndex": 2,
          "answer": "I have to wake up early on Sunday.",
          "explanationAr": "الإجابة: have to. should للنصيحة، must للإلزام القوي أو القانون، have to لإلزام خارجي، و don't have to = مو لازم (اختياري)، بينما mustn't = ممنوع."
        },
        {
          "id": "sg_123_m4",
          "type": "gap",
          "promptEn": "Complete: You ____ bring anything.",
          "promptAr": "أكمل الفراغ: (مو لازم تجيب شي.)",
          "options": [
            "shouldn't to",
            "mustn't",
            "don't have to"
          ],
          "correctIndex": 2,
          "answer": "You don't have to bring anything.",
          "explanationAr": "الإجابة: don't have to. should للنصيحة، must للإلزام القوي أو القانون، have to لإلزام خارجي، و don't have to = مو لازم (اختياري)، بينما mustn't = ممنوع."
        }
      ],
      "hard": [
        {
          "id": "sg_123_h1",
          "type": "order",
          "promptEn": "Put the words in order: while / your / use / driving. / phone / mustn't / You",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (ممنوع تستخدم الجوال وأنت تسوق.)",
          "answer": "You mustn't use your phone while driving.",
          "explanationAr": "الترتيب الصحيح: You mustn't use your phone while driving."
        },
        {
          "id": "sg_123_h2",
          "type": "order",
          "promptEn": "Put the words in order: report / has / finish / today. / to / the / She",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (لازم تخلص التقرير اليوم.)",
          "answer": "She has to finish the report today.",
          "explanationAr": "الترتيب الصحيح: She has to finish the report today."
        },
        {
          "id": "sg_123_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: لازم تلبس حزام الأمان.",
          "answer": "You must wear a seatbelt.",
          "explanationAr": "ترجمة مقترحة: You must wear a seatbelt."
        },
        {
          "id": "sg_123_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: مو لازم تجيب شي.",
          "answer": "You don't have to bring anything.",
          "explanationAr": "ترجمة مقترحة: You don't have to bring anything."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "You must to go.",
        "correct": "You must go.",
        "whyAr": "لا to بعد must."
      },
      {
        "incorrect": "It's not must.",
        "correct": "You don't have to.",
        "whyAr": "ترجمة حرفية لـ «مو لازم»."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (المضارع التام والماضي البسيط: just / already / yet): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I didn't eat yet.",
          "I haven't eaten yet."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I haven't eaten yet. — yet مع المضارع التام (في الإنجليزية البريطانية والفصحى).",
        "fromLessonId": "sg_122"
      },
      {
        "questionAr": "مراجعة (Will: قرارات فورية ووعود وتوقعات): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'll call you.",
          "I will to call you."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I'll call you. — لا to بعد will.",
        "fromLessonId": "sg_103"
      },
      {
        "questionAr": "مراجعة (المقارنة: bigger than / more expensive than): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Riyadh is bigger from Abha.",
          "Riyadh is bigger than Abha."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Riyadh is bigger than Abha. — «من» في المقارنة = than وليس from.",
        "fromLessonId": "sg_117"
      },
      {
        "questionAr": "ما معنى \"experience\"؟",
        "questionEn": "What does \"experience\" mean?",
        "options": [
          "تجربة",
          "في حياتك/أبداً (سؤال)",
          "مرتين",
          "مأكول"
        ],
        "correctIndex": 0,
        "explanationAr": "\"experience\" /ɪkˈspɪriəns/ تعني: تجربة. مثال: It was a great experience.",
        "fromLessonId": "sg_121"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (لازم أصحى بدري يوم الأحد.)",
          "questionEn": "Complete: I ____ wake up early on Sunday.",
          "options": [
            "must to",
            "should to",
            "have to"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: have to. should للنصيحة، must للإلزام القوي أو القانون، have to لإلزام خارجي، و don't have to = مو لازم (اختياري)، بينما mustn't = ممنوع."
        },
        {
          "questionAr": "أكمل الفراغ: (مو لازم تجيب شي.)",
          "questionEn": "Complete: You ____ bring anything.",
          "options": [
            "shouldn't to",
            "mustn't",
            "don't have to"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: don't have to. should للنصيحة، must للإلزام القوي أو القانون، have to لإلزام خارجي، و don't have to = مو لازم (اختياري)، بينما mustn't = ممنوع."
        },
        {
          "questionAr": "ما معنى \"rule\"؟",
          "questionEn": "What does \"rule\" mean?",
          "options": [
            "يجب",
            "زي رسمي",
            "قانون/قاعدة",
            "مضطر/لازم"
          ],
          "correctIndex": 2,
          "explanationAr": "\"rule\" /ruːl/ تعني: قانون/قاعدة. مثال: School rules are strict."
        },
        {
          "questionAr": "ما معنى \"uniform\"؟",
          "questionEn": "What does \"uniform\" mean?",
          "options": [
            "حزام الأمان",
            "في الموعد",
            "زي رسمي",
            "مضطر/لازم"
          ],
          "correctIndex": 2,
          "explanationAr": "\"uniform\" /ˈjuːnɪfɔːrm/ تعني: زي رسمي. مثال: We have to wear a uniform."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "You must go.",
            "You must to go."
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: You must go. — لا to بعد must."
        }
      ]
    }
  },
  {
    "id": "sg_124",
    "pillarId": "grammar",
    "pillarNameAr": "القواعد التحدثية السريعة",
    "pillarNameEn": "Spoken Grammar & Fast Patterns",
    "pillarIcon": "🧠",
    "level": "متوسط (Intermediate)",
    "levelCode": "B1-B2",
    "titleAr": "الشرط الأول: If it rains, we'll stay home",
    "titleEn": "First Conditional: Real Future Possibilities",
    "descAr": "تكلم عن نتائج محتملة في المستقبل: إذا صار كذا، بيصير كذا.",
    "descEn": "Talk about likely future results: if X happens, Y will happen.",
    "speakingGoalAr": "كوّن خمس جمل شرطية عن خططك ومخاوفك.",
    "speakingGoalEn": "Make five conditional sentences about your plans and worries.",
    "keyPattern": {
      "ruleAr": "If + مضارع بسيط، will + فعل أصلي. لا نضع will بعد if. ويمكن عكس الترتيب بدون فاصلة.",
      "ruleEn": "If + present simple, will + base verb. Never 'will' after if. Reverse order needs no comma.",
      "formula": "If + present simple, subject + will + verb | subject + will + verb + if + present"
    },
    "practicalExamples": [
      {
        "en": "If it rains, we'll stay at home.",
        "ar": "إذا مطرت، بنجلس في البيت."
      },
      {
        "en": "If you study hard, you'll pass.",
        "ar": "إذا ذاكرت زين، بتنجح."
      },
      {
        "en": "I'll call you if I'm late.",
        "ar": "بتصل عليك إذا تأخرت."
      },
      {
        "en": "We won't go unless Dad agrees.",
        "ar": "ما بنروح إلا إذا وافق أبوي."
      },
      {
        "en": "If the traffic is bad, I'll take the metro.",
        "ar": "إذا الزحمة شديدة، باخذ المترو."
      },
      {
        "en": "What will you do if you win?",
        "ar": "وش بتسوي إذا فزت؟"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "If it will rain, we'll stay home.",
        "correct": "If it rains, we'll stay home.",
        "whyAr": "بعد if مضارع بسيط وليس will."
      },
      {
        "incorrect": "If you study, you pass.",
        "correct": "If you study, you'll pass.",
        "whyAr": "النتيجة المستقبلية تحتاج will."
      },
      {
        "incorrect": "Unless you don't hurry, you'll be late.",
        "correct": "Unless you hurry, you'll be late.",
        "whyAr": "unless = if not، فلا نضيف نفياً ثانياً."
      }
    ],
    "speakingChallenge": {
      "promptAr": "أخبر سارة بخمس احتمالات في حياتك.",
      "promptEn": "Share five 'if' possibilities from your life.",
      "saraQuestionAr": "وش بتسوي إذا فزت بمليون؟ وإذا تعطلت سيارتك؟",
      "saraQuestionEn": "What will you do if... ?",
      "recommendedResponseEn": "If I get a scholarship, I'll study in Canada. If my car breaks down, I'll call my brother. If it's nice tomorrow, we'll go to the beach."
    },
    "quiz": [
      {
        "questionAr": "أكمل: If she ___ early, she'll catch the bus.",
        "questionEn": "Complete: If she ___ early, she'll catch the bus.",
        "options": [
          "will leave",
          "leaves",
          "left"
        ],
        "correctIndex": 1,
        "explanationAr": "بعد if مضارع بسيط."
      },
      {
        "questionAr": "unless = ",
        "questionEn": "unless =",
        "options": [
          "if",
          "if not",
          "when"
        ],
        "correctIndex": 1,
        "explanationAr": "unless = if not."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "If it will rain, we'll stay home.",
          "If it rains, we'll stay home."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: If it rains, we'll stay home. — بعد if مضارع بسيط وليس will."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "If you study, you pass.",
          "If you study, you'll pass."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: If you study, you'll pass. — النتيجة المستقبلية تحتاج will."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Unless you don't hurry, you'll be late.",
          "Unless you hurry, you'll be late."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Unless you hurry, you'll be late. — unless = if not، فلا نضيف نفياً ثانياً."
      }
    ],
    "whiteboardNotes": {
      "title": "First Conditional: Real Future Possibilities",
      "pointsAr": [
        "يكوّن جملة الشرط الأول.",
        "لا يستخدم will بعد if.",
        "يستخدم unless بمعنى إلا إذا.",
        "If + مضارع بسيط، will + فعل أصلي. لا نضع will بعد if. ويمكن عكس الترتيب بدون فاصلة."
      ],
      "pointsEn": [
        "Form first conditional sentences.",
        "Avoid 'will' after if.",
        "Use 'unless'.",
        "If + present simple, will + base verb. Never 'will' after if. Reverse order needs no comma."
      ],
      "chalkHighlight": "If + present simple, subject + will + verb | subject + will + verb + if + present"
    },
    "unit": 5,
    "cefr": "B1",
    "objectivesAr": [
      "يكوّن جملة الشرط الأول.",
      "لا يستخدم will بعد if.",
      "يستخدم unless بمعنى إلا إذا."
    ],
    "objectivesEn": [
      "Form first conditional sentences.",
      "Avoid 'will' after if.",
      "Use 'unless'."
    ],
    "vocabulary": [
      {
        "word": "if",
        "ipa": "/ɪf/",
        "ar": "إذا",
        "exampleEn": "If you need help, call me.",
        "exampleAr": "إذا احتجت شي اتصل."
      },
      {
        "word": "unless",
        "ipa": "/ənˈlɛs/",
        "ar": "إلا إذا",
        "exampleEn": "I won't go unless you come.",
        "exampleAr": "ما بروح إلا إذا جيت."
      },
      {
        "word": "pass",
        "ipa": "/pæs/",
        "ar": "ينجح",
        "exampleEn": "You'll pass if you try.",
        "exampleAr": "بتنجح إذا حاولت."
      },
      {
        "word": "fail",
        "ipa": "/feɪl/",
        "ar": "يرسب",
        "exampleEn": "If you don't study, you'll fail.",
        "exampleAr": "إذا ما ذاكرت بترسب."
      },
      {
        "word": "miss",
        "ipa": "/mɪs/",
        "ar": "يفوّت",
        "exampleEn": "We'll miss the flight.",
        "exampleAr": "بتفوتنا الرحلة."
      },
      {
        "word": "hurry",
        "ipa": "/ˈhɜːri/",
        "ar": "يستعجل",
        "exampleEn": "If we don't hurry, we'll be late.",
        "exampleAr": "إذا ما استعجلنا بنتأخر."
      },
      {
        "word": "agree",
        "ipa": "/əˈɡriː/",
        "ar": "يوافق",
        "exampleEn": "If Dad agrees, we'll go.",
        "exampleAr": "إذا وافق أبوي بنروح."
      },
      {
        "word": "weather",
        "ipa": "/ˈwɛðər/",
        "ar": "الجو",
        "exampleEn": "If the weather is nice, we'll go out.",
        "exampleAr": "إذا الجو حلو بنطلع."
      },
      {
        "word": "prize",
        "ipa": "/praɪz/",
        "ar": "جائزة",
        "exampleEn": "If you win, you'll get a prize.",
        "exampleAr": "إذا فزت بتاخذ جائزة."
      },
      {
        "word": "worry",
        "ipa": "/ˈwɜːri/",
        "ar": "يقلق",
        "exampleEn": "Don't worry if you're late.",
        "exampleAr": "لا تقلق إذا تأخرت."
      }
    ],
    "grammarFocus": {
      "ruleAr": "If + مضارع بسيط، will + فعل أصلي. لا نضع will بعد if. ويمكن عكس الترتيب بدون فاصلة.",
      "ruleEn": "If + present simple, will + base verb. Never 'will' after if. Reverse order needs no comma.",
      "formula": "If + present simple, subject + will + verb | subject + will + verb + if + present",
      "examples": [
        {
          "en": "If it rains, we'll stay at home.",
          "ar": "إذا مطرت، بنجلس في البيت."
        },
        {
          "en": "If you study hard, you'll pass.",
          "ar": "إذا ذاكرت زين، بتنجح."
        },
        {
          "en": "I'll call you if I'm late.",
          "ar": "بتصل عليك إذا تأخرت."
        },
        {
          "en": "We won't go unless Dad agrees.",
          "ar": "ما بنروح إلا إذا وافق أبوي."
        },
        {
          "en": "If the traffic is bad, I'll take the metro.",
          "ar": "إذا الزحمة شديدة، باخذ المترو."
        },
        {
          "en": "What will you do if you win?",
          "ar": "وش بتسوي إذا فزت؟"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "What will you do if you get high marks this year?",
        "ar": "وش بتسوي إذا جبت درجات عالية السنة؟"
      },
      {
        "speaker": "Student",
        "en": "If I get high marks, my dad will buy me a laptop.",
        "ar": "إذا جبت درجات عالية، أبوي بيشتري لي لابتوب."
      },
      {
        "speaker": "Sara",
        "en": "And if you don't?",
        "ar": "وإذا ما جبت؟"
      },
      {
        "speaker": "Student",
        "en": "If I don't, I'll study in the summer.",
        "ar": "إذا ما جبت، بذاكر في الصيف."
      },
      {
        "speaker": "Sara",
        "en": "Will you travel in the summer?",
        "ar": "بتسافر في الصيف؟"
      },
      {
        "speaker": "Student",
        "en": "Not unless I finish my courses first.",
        "ar": "لا، إلا إذا خلصت دوراتي أول."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: What will you do if you get high marks this year?\nStudent: If I get high marks, my dad will buy me a laptop.\nSara: And if you don't?\nStudent: If I don't, I'll study in the summer.\nSara: Will you travel in the summer?\nStudent: Not unless I finish my courses first.",
      "questions": [
        {
          "questionAr": "وش بيشتري الأب؟",
          "questionEn": "What will the dad buy?",
          "options": [
            "a phone",
            "a laptop",
            "a bike"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: a laptop"
        },
        {
          "questionAr": "إذا الدرجات نازلة؟",
          "questionEn": "What will the student do if his marks are low?",
          "options": [
            "travel",
            "study in the summer",
            "nothing"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: study in the summer"
        },
        {
          "questionAr": "متى بيسافر؟",
          "questionEn": "When will he travel?",
          "options": [
            "after finishing his courses",
            "in the spring",
            "never"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: after finishing his courses"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Contraction you'll /jʊl/, it'll /ˈɪtəl/",
      "items": [
        "you'll /jʊl/",
        "it'll /ˈɪtəl/",
        "won't /woʊnt/"
      ],
      "tipAr": "it'll تنطق «إتِل» بنطقة خفيفة. تدرّب: If it rains, it'll be cold."
    },
    "exercises": {
      "easy": [
        {
          "id": "sg_124_e1",
          "type": "meaning",
          "promptEn": "What does \"if\" mean?",
          "promptAr": "ما معنى \"if\"؟",
          "options": [
            "يرسب",
            "الجو",
            "إذا",
            "يقلق"
          ],
          "correctIndex": 2,
          "answer": "إذا",
          "explanationAr": "\"if\" /ɪf/ تعني: إذا. مثال: If you need help, call me."
        },
        {
          "id": "sg_124_e2",
          "type": "meaning",
          "promptEn": "What does \"unless\" mean?",
          "promptAr": "ما معنى \"unless\"؟",
          "options": [
            "إلا إذا",
            "إذا",
            "الجو",
            "يستعجل"
          ],
          "correctIndex": 0,
          "answer": "إلا إذا",
          "explanationAr": "\"unless\" /ənˈlɛs/ تعني: إلا إذا. مثال: I won't go unless you come."
        },
        {
          "id": "sg_124_e3",
          "type": "meaning",
          "promptEn": "What does \"pass\" mean?",
          "promptAr": "ما معنى \"pass\"؟",
          "options": [
            "يستعجل",
            "ينجح",
            "جائزة",
            "الجو"
          ],
          "correctIndex": 1,
          "answer": "ينجح",
          "explanationAr": "\"pass\" /pæs/ تعني: ينجح. مثال: You'll pass if you try."
        },
        {
          "id": "sg_124_e4",
          "type": "meaning",
          "promptEn": "What does \"fail\" mean?",
          "promptAr": "ما معنى \"fail\"؟",
          "options": [
            "إذا",
            "يستعجل",
            "يوافق",
            "يرسب"
          ],
          "correctIndex": 3,
          "answer": "يرسب",
          "explanationAr": "\"fail\" /feɪl/ تعني: يرسب. مثال: If you don't study, you'll fail."
        }
      ],
      "medium": [
        {
          "id": "sg_124_m1",
          "type": "gap",
          "promptEn": "Complete: If it ____, we'll stay at home.",
          "promptAr": "أكمل الفراغ: (إذا مطرت، بنجلس في البيت.)",
          "options": [
            "rains",
            "rain",
            "will rain"
          ],
          "correctIndex": 0,
          "answer": "If it rains, we'll stay at home.",
          "explanationAr": "الإجابة: rains. If + مضارع بسيط، will + فعل أصلي. لا نضع will بعد if. ويمكن عكس الترتيب بدون فاصلة."
        },
        {
          "id": "sg_124_m2",
          "type": "gap",
          "promptEn": "Complete: If you study hard, ____.",
          "promptAr": "أكمل الفراغ: (إذا ذاكرت زين، بتنجح.)",
          "options": [
            "you'll pass",
            "you passed",
            "you pass"
          ],
          "correctIndex": 0,
          "answer": "If you study hard, you'll pass.",
          "explanationAr": "الإجابة: you'll pass. If + مضارع بسيط، will + فعل أصلي. لا نضع will بعد if. ويمكن عكس الترتيب بدون فاصلة."
        },
        {
          "id": "sg_124_m3",
          "type": "gap",
          "promptEn": "Complete: I'll call you ____ I'm late.",
          "promptAr": "أكمل الفراغ: (بتصل عليك إذا تأخرت.)",
          "options": [
            "if",
            "when will",
            "unless"
          ],
          "correctIndex": 0,
          "answer": "I'll call you if I'm late.",
          "explanationAr": "الإجابة: if. If + مضارع بسيط، will + فعل أصلي. لا نضع will بعد if. ويمكن عكس الترتيب بدون فاصلة."
        },
        {
          "id": "sg_124_m4",
          "type": "gap",
          "promptEn": "Complete: We won't go ____ Dad agrees.",
          "promptAr": "أكمل الفراغ: (ما بنروح إلا إذا وافق أبوي.)",
          "options": [
            "when",
            "if",
            "unless"
          ],
          "correctIndex": 2,
          "answer": "We won't go unless Dad agrees.",
          "explanationAr": "الإجابة: unless. If + مضارع بسيط، will + فعل أصلي. لا نضع will بعد if. ويمكن عكس الترتيب بدون فاصلة."
        }
      ],
      "hard": [
        {
          "id": "sg_124_h1",
          "type": "order",
          "promptEn": "Put the words in order: If / bad, / metro. / the / take / is / I'll / traffic / the",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (إذا الزحمة شديدة، باخذ المترو.)",
          "answer": "If the traffic is bad, I'll take the metro.",
          "explanationAr": "الترتيب الصحيح: If the traffic is bad, I'll take the metro."
        },
        {
          "id": "sg_124_h2",
          "type": "order",
          "promptEn": "Put the words in order: you / if / What / do / you / will / win?",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (وش بتسوي إذا فزت؟)",
          "answer": "What will you do if you win?",
          "explanationAr": "الترتيب الصحيح: What will you do if you win?"
        },
        {
          "id": "sg_124_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: إذا ذاكرت زين، بتنجح.",
          "answer": "If you study hard, you'll pass.",
          "explanationAr": "ترجمة مقترحة: If you study hard, you'll pass."
        },
        {
          "id": "sg_124_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: ما بنروح إلا إذا وافق أبوي.",
          "answer": "We won't go unless Dad agrees.",
          "explanationAr": "ترجمة مقترحة: We won't go unless Dad agrees."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "If I will travel, I will tell you.",
        "correct": "If I travel, I'll tell you.",
        "whyAr": "لا تترجم «إذا بسافر» حرفياً."
      },
      {
        "incorrect": "If you study you will be pass.",
        "correct": "If you study, you'll pass.",
        "whyAr": "لا be قبل الفعل."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (Should / Must / Have to: النصيحة والإلزام): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "He have to work.",
          "He has to work."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: He has to work. — he ⇐ has to.",
        "fromLessonId": "sg_123"
      },
      {
        "questionAr": "مراجعة (المضارع التام للتجارب: Have you ever...?): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Have you ever been to Paris?",
          "Have you ever went to Paris?"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Have you ever been to Paris? — بعد have نستخدم التصريف الثالث.",
        "fromLessonId": "sg_121"
      },
      {
        "questionAr": "مراجعة (التفضيل: the biggest / the most beautiful): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "He is the most tall boy.",
          "He is the tallest boy."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: He is the tallest boy. — الصفة القصيرة ⇐ est.",
        "fromLessonId": "sg_118"
      },
      {
        "questionAr": "ما معنى \"pack\"؟",
        "questionEn": "What does \"pack\" mean?",
        "options": [
          "يدفع",
          "يخلّص/ينهي",
          "يرتب الشنطة",
          "للحين/بعد (نفي وسؤال)"
        ],
        "correctIndex": 2,
        "explanationAr": "\"pack\" /pæk/ تعني: يرتب الشنطة. مثال: Have you packed yet?",
        "fromLessonId": "sg_122"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (بتصل عليك إذا تأخرت.)",
          "questionEn": "Complete: I'll call you ____ I'm late.",
          "options": [
            "if",
            "when will",
            "unless"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: if. If + مضارع بسيط، will + فعل أصلي. لا نضع will بعد if. ويمكن عكس الترتيب بدون فاصلة."
        },
        {
          "questionAr": "أكمل الفراغ: (ما بنروح إلا إذا وافق أبوي.)",
          "questionEn": "Complete: We won't go ____ Dad agrees.",
          "options": [
            "when",
            "if",
            "unless"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: unless. If + مضارع بسيط، will + فعل أصلي. لا نضع will بعد if. ويمكن عكس الترتيب بدون فاصلة."
        },
        {
          "questionAr": "ما معنى \"miss\"؟",
          "questionEn": "What does \"miss\" mean?",
          "options": [
            "يفوّت",
            "إلا إذا",
            "ينجح",
            "جائزة"
          ],
          "correctIndex": 0,
          "explanationAr": "\"miss\" /mɪs/ تعني: يفوّت. مثال: We'll miss the flight."
        },
        {
          "questionAr": "ما معنى \"hurry\"؟",
          "questionEn": "What does \"hurry\" mean?",
          "options": [
            "جائزة",
            "يستعجل",
            "يرسب",
            "ينجح"
          ],
          "correctIndex": 1,
          "explanationAr": "\"hurry\" /ˈhɜːri/ تعني: يستعجل. مثال: If we don't hurry, we'll be late."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "If I travel, I'll tell you.",
            "If I will travel, I will tell you."
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: If I travel, I'll tell you. — لا تترجم «إذا بسافر» حرفياً."
        }
      ]
    }
  },
  {
    "id": "sg_125",
    "pillarId": "grammar",
    "pillarNameAr": "القواعد التحدثية السريعة",
    "pillarNameEn": "Spoken Grammar & Fast Patterns",
    "pillarIcon": "🧠",
    "level": "متوسط (Intermediate)",
    "levelCode": "B1-B2",
    "titleAr": "Used to: عادات الماضي",
    "titleEn": "Used To: Past Habits",
    "descAr": "تكلم عن عادات كانت عندك وانتهت: كنت أسكن، كنت ألعب...",
    "descEn": "Talk about past habits and states that are no longer true.",
    "speakingGoalAr": "قارن حياتك وأنت صغير بحياتك الحين في خمس جمل.",
    "speakingGoalEn": "Compare your childhood and now in five sentences.",
    "keyPattern": {
      "ruleAr": "used to + فعل أصلي لعادة أو حالة في الماضي انتهت. النفي didn't use to، والسؤال Did you use to...؟ لا تخلطها مع be used to (متعود على).",
      "ruleEn": "used to + base verb for finished past habits/states. Negative didn't use to; question Did you use to...? Don't confuse with 'be used to + -ing' (accustomed).",
      "formula": "subject + used to + base verb | didn't use to + verb"
    },
    "practicalExamples": [
      {
        "en": "I used to live in Hail.",
        "ar": "كنت ساكن في حائل."
      },
      {
        "en": "We used to play in the street after Asr.",
        "ar": "كنا نلعب في الشارع بعد العصر."
      },
      {
        "en": "I didn't use to like vegetables.",
        "ar": "ما كنت أحب الخضار."
      },
      {
        "en": "Did you use to watch Captain Majid?",
        "ar": "كنت تشوف كابتن ماجد؟"
      },
      {
        "en": "My grandfather used to sell dates in the souq.",
        "ar": "جدي كان يبيع تمر في السوق."
      },
      {
        "en": "I'm used to waking up early now.",
        "ar": "الحين متعود أصحى بدري."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "I use to play football.",
        "correct": "I used to play football.",
        "whyAr": "في الإيجاب used بـ d."
      },
      {
        "incorrect": "I used to playing football.",
        "correct": "I used to play football.",
        "whyAr": "used to + فعل أصلي."
      },
      {
        "incorrect": "I didn't used to like it.",
        "correct": "I didn't use to like it.",
        "whyAr": "بعد didn't نكتب use."
      }
    ],
    "speakingChallenge": {
      "promptAr": "قارن لسارة طفولتك بحياتك الحين.",
      "promptEn": "Compare your childhood with now.",
      "saraQuestionAr": "كيف كانت حياتك وأنت صغير؟",
      "saraQuestionEn": "What was your life like as a child?",
      "recommendedResponseEn": "I used to live in Hail. I used to play football every day. I didn't use to like reading, but now I read a lot. I'm used to city life now."
    },
    "quiz": [
      {
        "questionAr": "الجملة الصحيحة:",
        "questionEn": "Correct sentence:",
        "options": [
          "She used to wear glasses.",
          "She use to wear glasses.",
          "She used to wearing glasses."
        ],
        "correctIndex": 0,
        "explanationAr": "used to + فعل أصلي."
      },
      {
        "questionAr": "«متعود على الحر» =",
        "questionEn": "'accustomed to the heat' =",
        "options": [
          "I used to the heat.",
          "I'm used to the heat.",
          "I use to the heat."
        ],
        "correctIndex": 1,
        "explanationAr": "be used to + اسم/ing."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I use to play football.",
          "I used to play football."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I used to play football. — في الإيجاب used بـ d."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I used to playing football.",
          "I used to play football."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I used to play football. — used to + فعل أصلي."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I didn't use to like it.",
          "I didn't used to like it."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I didn't use to like it. — بعد didn't نكتب use."
      }
    ],
    "whiteboardNotes": {
      "title": "Used To: Past Habits",
      "pointsAr": [
        "يصف عادات الطفولة بـ used to.",
        "يكوّن النفي والسؤال.",
        "يميز used to عن be used to.",
        "used to + فعل أصلي لعادة أو حالة في الماضي انتهت. النفي didn't use to، والسؤال Did you use to...؟ لا تخلطها مع be used to (متعود على)."
      ],
      "pointsEn": [
        "Describe childhood habits with used to.",
        "Form negatives and questions.",
        "Distinguish used to from be used to.",
        "used to + base verb for finished past habits/states. Negative didn't use to; question Did you use to...? Don't confuse with 'be used to + -ing' (accustomed)."
      ],
      "chalkHighlight": "subject + used to + base verb | didn't use to + verb"
    },
    "unit": 5,
    "cefr": "B1",
    "objectivesAr": [
      "يصف عادات الطفولة بـ used to.",
      "يكوّن النفي والسؤال.",
      "يميز used to عن be used to."
    ],
    "objectivesEn": [
      "Describe childhood habits with used to.",
      "Form negatives and questions.",
      "Distinguish used to from be used to."
    ],
    "vocabulary": [
      {
        "word": "childhood",
        "ipa": "/ˈtʃaɪldhʊd/",
        "ar": "الطفولة",
        "exampleEn": "In my childhood I lived in Hail.",
        "exampleAr": "في طفولتي سكنت حائل."
      },
      {
        "word": "neighborhood",
        "ipa": "/ˈneɪbərhʊd/",
        "ar": "حي",
        "exampleEn": "Our old neighborhood was quiet.",
        "exampleAr": "حينا القديم كان هادي."
      },
      {
        "word": "souq",
        "ipa": "/suːk/",
        "ar": "سوق شعبي",
        "exampleEn": "We used to go to the souq.",
        "exampleAr": "كنا نروح السوق."
      },
      {
        "word": "cartoon",
        "ipa": "/kɑːrˈtuːn/",
        "ar": "رسوم متحركة",
        "exampleEn": "I used to watch cartoons.",
        "exampleAr": "كنت أشوف كرتون."
      },
      {
        "word": "shy",
        "ipa": "/ʃaɪ/",
        "ar": "خجول",
        "exampleEn": "I used to be shy.",
        "exampleAr": "كنت خجول."
      },
      {
        "word": "anymore",
        "ipa": "/ˌɛniˈmɔːr/",
        "ar": "بعد الآن",
        "exampleEn": "I don't play anymore.",
        "exampleAr": "ما ألعب الحين."
      },
      {
        "word": "grow up",
        "ipa": "/ɡroʊ ʌp/",
        "ar": "يكبر",
        "exampleEn": "I grew up in Qassim.",
        "exampleAr": "تربيت في القصيم."
      },
      {
        "word": "sell",
        "ipa": "/sɛl/",
        "ar": "يبيع",
        "exampleEn": "He used to sell perfume.",
        "exampleAr": "كان يبيع عطور."
      },
      {
        "word": "these days",
        "ipa": "/ðiːz deɪz/",
        "ar": "هالأيام",
        "exampleEn": "These days I work a lot.",
        "exampleAr": "هالأيام أشتغل كثير."
      },
      {
        "word": "be used to",
        "ipa": "/biː juːst tuː/",
        "ar": "متعود على",
        "exampleEn": "I'm used to the heat.",
        "exampleAr": "متعود على الحر."
      }
    ],
    "grammarFocus": {
      "ruleAr": "used to + فعل أصلي لعادة أو حالة في الماضي انتهت. النفي didn't use to، والسؤال Did you use to...؟ لا تخلطها مع be used to (متعود على).",
      "ruleEn": "used to + base verb for finished past habits/states. Negative didn't use to; question Did you use to...? Don't confuse with 'be used to + -ing' (accustomed).",
      "formula": "subject + used to + base verb | didn't use to + verb",
      "examples": [
        {
          "en": "I used to live in Hail.",
          "ar": "كنت ساكن في حائل."
        },
        {
          "en": "We used to play in the street after Asr.",
          "ar": "كنا نلعب في الشارع بعد العصر."
        },
        {
          "en": "I didn't use to like vegetables.",
          "ar": "ما كنت أحب الخضار."
        },
        {
          "en": "Did you use to watch Captain Majid?",
          "ar": "كنت تشوف كابتن ماجد؟"
        },
        {
          "en": "My grandfather used to sell dates in the souq.",
          "ar": "جدي كان يبيع تمر في السوق."
        },
        {
          "en": "I'm used to waking up early now.",
          "ar": "الحين متعود أصحى بدري."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Where did you use to live when you were a child?",
        "ar": "وين كنت ساكن وأنت صغير؟"
      },
      {
        "speaker": "Student",
        "en": "I used to live in a small village near Al-Ahsa.",
        "ar": "كنت ساكن في قرية صغيرة قريبة من الأحساء."
      },
      {
        "speaker": "Sara",
        "en": "What did you use to do after school?",
        "ar": "وش كنت تسوي بعد المدرسة؟"
      },
      {
        "speaker": "Student",
        "en": "We used to play in the palm farms until Maghrib.",
        "ar": "كنا نلعب في المزارع لين المغرب."
      },
      {
        "speaker": "Sara",
        "en": "Do you still play there?",
        "ar": "للحين تلعب هناك؟"
      },
      {
        "speaker": "Student",
        "en": "Not anymore. These days I'm used to city life.",
        "ar": "لا، الحين تعودت على حياة المدينة."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Where did you use to live when you were a child?\nStudent: I used to live in a small village near Al-Ahsa.\nSara: What did you use to do after school?\nStudent: We used to play in the palm farms until Maghrib.\nSara: Do you still play there?\nStudent: Not anymore. These days I'm used to city life.",
      "questions": [
        {
          "questionAr": "وين كان ساكن؟",
          "questionEn": "Where did the student use to live?",
          "options": [
            "Riyadh",
            "a village near Al-Ahsa",
            "Hail"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: a village near Al-Ahsa"
        },
        {
          "questionAr": "وين كانوا يلعبون؟",
          "questionEn": "Where did they use to play?",
          "options": [
            "in the palm farms",
            "in the street",
            "at the mall"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: in the palm farms"
        },
        {
          "questionAr": "وش تعود عليه الحين؟",
          "questionEn": "What is he used to now?",
          "options": [
            "village life",
            "city life",
            "the cold"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: city life"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "used to /ˈjuːstə/ — the d is silent",
      "items": [
        "used to /ˈjuːstə/",
        "use to /ˈjuːstə/ (same sound)",
        "be used to /biː ˈjuːstə/"
      ],
      "tipAr": "used to تنطق «يوستا» ما نسمع الـ d. لا تقول «يوزد تو»."
    },
    "exercises": {
      "easy": [
        {
          "id": "sg_125_e1",
          "type": "meaning",
          "promptEn": "What does \"childhood\" mean?",
          "promptAr": "ما معنى \"childhood\"؟",
          "options": [
            "متعود على",
            "الطفولة",
            "يبيع",
            "سوق شعبي"
          ],
          "correctIndex": 1,
          "answer": "الطفولة",
          "explanationAr": "\"childhood\" /ˈtʃaɪldhʊd/ تعني: الطفولة. مثال: In my childhood I lived in Hail."
        },
        {
          "id": "sg_125_e2",
          "type": "meaning",
          "promptEn": "What does \"neighborhood\" mean?",
          "promptAr": "ما معنى \"neighborhood\"؟",
          "options": [
            "بعد الآن",
            "رسوم متحركة",
            "يكبر",
            "حي"
          ],
          "correctIndex": 3,
          "answer": "حي",
          "explanationAr": "\"neighborhood\" /ˈneɪbərhʊd/ تعني: حي. مثال: Our old neighborhood was quiet."
        },
        {
          "id": "sg_125_e3",
          "type": "meaning",
          "promptEn": "What does \"souq\" mean?",
          "promptAr": "ما معنى \"souq\"؟",
          "options": [
            "متعود على",
            "الطفولة",
            "هالأيام",
            "سوق شعبي"
          ],
          "correctIndex": 3,
          "answer": "سوق شعبي",
          "explanationAr": "\"souq\" /suːk/ تعني: سوق شعبي. مثال: We used to go to the souq."
        },
        {
          "id": "sg_125_e4",
          "type": "meaning",
          "promptEn": "What does \"cartoon\" mean?",
          "promptAr": "ما معنى \"cartoon\"؟",
          "options": [
            "الطفولة",
            "رسوم متحركة",
            "بعد الآن",
            "خجول"
          ],
          "correctIndex": 1,
          "answer": "رسوم متحركة",
          "explanationAr": "\"cartoon\" /kɑːrˈtuːn/ تعني: رسوم متحركة. مثال: I used to watch cartoons."
        }
      ],
      "medium": [
        {
          "id": "sg_125_m1",
          "type": "gap",
          "promptEn": "Complete: I ____ live in Hail.",
          "promptAr": "أكمل الفراغ: (كنت ساكن في حائل.)",
          "options": [
            "was used to",
            "use to",
            "used to"
          ],
          "correctIndex": 2,
          "answer": "I used to live in Hail.",
          "explanationAr": "الإجابة: used to. used to + فعل أصلي لعادة أو حالة في الماضي انتهت. النفي didn't use to، والسؤال Did you use to...؟ لا تخلطها مع be used to (متعود على)."
        },
        {
          "id": "sg_125_m2",
          "type": "gap",
          "promptEn": "Complete: We used to ____ in the street after Asr.",
          "promptAr": "أكمل الفراغ: (كنا نلعب في الشارع بعد العصر.)",
          "options": [
            "played",
            "play",
            "playing"
          ],
          "correctIndex": 1,
          "answer": "We used to play in the street after Asr.",
          "explanationAr": "الإجابة: play. used to + فعل أصلي لعادة أو حالة في الماضي انتهت. النفي didn't use to، والسؤال Did you use to...؟ لا تخلطها مع be used to (متعود على)."
        },
        {
          "id": "sg_125_m3",
          "type": "gap",
          "promptEn": "Complete: I didn't ____ to like vegetables.",
          "promptAr": "أكمل الفراغ: (ما كنت أحب الخضار.)",
          "options": [
            "using",
            "use",
            "used"
          ],
          "correctIndex": 1,
          "answer": "I didn't use to like vegetables.",
          "explanationAr": "الإجابة: use. used to + فعل أصلي لعادة أو حالة في الماضي انتهت. النفي didn't use to، والسؤال Did you use to...؟ لا تخلطها مع be used to (متعود على)."
        },
        {
          "id": "sg_125_m4",
          "type": "gap",
          "promptEn": "Complete: ____ you use to watch Captain Majid?",
          "promptAr": "أكمل الفراغ: (كنت تشوف كابتن ماجد؟)",
          "options": [
            "Did",
            "Were",
            "Do"
          ],
          "correctIndex": 0,
          "answer": "Did you use to watch Captain Majid?",
          "explanationAr": "الإجابة: Did. used to + فعل أصلي لعادة أو حالة في الماضي انتهت. النفي didn't use to، والسؤال Did you use to...؟ لا تخلطها مع be used to (متعود على)."
        }
      ],
      "hard": [
        {
          "id": "sg_125_h1",
          "type": "order",
          "promptEn": "Put the words in order: in / grandfather / souq. / dates / used / the / to / My / sell",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (جدي كان يبيع تمر في السوق.)",
          "answer": "My grandfather used to sell dates in the souq.",
          "explanationAr": "الترتيب الصحيح: My grandfather used to sell dates in the souq."
        },
        {
          "id": "sg_125_h2",
          "type": "order",
          "promptEn": "Put the words in order: I'm / now. / to / waking / up / early / used",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (الحين متعود أصحى بدري.)",
          "answer": "I'm used to waking up early now.",
          "explanationAr": "الترتيب الصحيح: I'm used to waking up early now."
        },
        {
          "id": "sg_125_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: كنا نلعب في الشارع بعد العصر.",
          "answer": "We used to play in the street after Asr.",
          "explanationAr": "ترجمة مقترحة: We used to play in the street after Asr."
        },
        {
          "id": "sg_125_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: كنت تشوف كابتن ماجد؟",
          "answer": "Did you use to watch Captain Majid?",
          "explanationAr": "ترجمة مقترحة: Did you use to watch Captain Majid?"
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "I was used to play football when I was young.",
        "correct": "I used to play football when I was young.",
        "whyAr": "was used to معناها متعود، مو كنت أسوي."
      },
      {
        "incorrect": "Before I play football.",
        "correct": "I used to play football.",
        "whyAr": "«قبل كنت ألعب» ⇐ used to."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (الشرط الأول: If it rains, we'll stay home): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "If you study, you'll pass.",
          "If you study, you pass."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: If you study, you'll pass. — النتيجة المستقبلية تحتاج will.",
        "fromLessonId": "sg_124"
      },
      {
        "questionAr": "مراجعة (المضارع التام والماضي البسيط: just / already / yet): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I have finished it yesterday.",
          "I finished it yesterday."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I finished it yesterday. — yesterday ⇐ ماضي بسيط.",
        "fromLessonId": "sg_122"
      },
      {
        "questionAr": "مراجعة (Going to: خططك ونواياك): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'm going to travel.",
          "I going to travel."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I'm going to travel. — لا تحذف am.",
        "fromLessonId": "sg_119"
      },
      {
        "questionAr": "ما معنى \"on time\"؟",
        "questionEn": "What does \"on time\" mean?",
        "options": [
          "صحي",
          "زي رسمي",
          "في الموعد",
          "مضطر/لازم"
        ],
        "correctIndex": 2,
        "explanationAr": "\"on time\" /ɑːn taɪm/ تعني: في الموعد. مثال: You must be on time.",
        "fromLessonId": "sg_123"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (ما كنت أحب الخضار.)",
          "questionEn": "Complete: I didn't ____ to like vegetables.",
          "options": [
            "using",
            "use",
            "used"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: use. used to + فعل أصلي لعادة أو حالة في الماضي انتهت. النفي didn't use to، والسؤال Did you use to...؟ لا تخلطها مع be used to (متعود على)."
        },
        {
          "questionAr": "أكمل الفراغ: (كنت تشوف كابتن ماجد؟)",
          "questionEn": "Complete: ____ you use to watch Captain Majid?",
          "options": [
            "Did",
            "Were",
            "Do"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: Did. used to + فعل أصلي لعادة أو حالة في الماضي انتهت. النفي didn't use to، والسؤال Did you use to...؟ لا تخلطها مع be used to (متعود على)."
        },
        {
          "questionAr": "ما معنى \"shy\"؟",
          "questionEn": "What does \"shy\" mean?",
          "options": [
            "رسوم متحركة",
            "خجول",
            "سوق شعبي",
            "هالأيام"
          ],
          "correctIndex": 1,
          "explanationAr": "\"shy\" /ʃaɪ/ تعني: خجول. مثال: I used to be shy."
        },
        {
          "questionAr": "ما معنى \"anymore\"؟",
          "questionEn": "What does \"anymore\" mean?",
          "options": [
            "حي",
            "الطفولة",
            "يكبر",
            "بعد الآن"
          ],
          "correctIndex": 3,
          "explanationAr": "\"anymore\" /ˌɛniˈmɔːr/ تعني: بعد الآن. مثال: I don't play anymore."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "I was used to play football when I was young.",
            "I used to play football when I was young."
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: I used to play football when I was young. — was used to معناها متعود، مو كنت أسوي."
        }
      ]
    }
  },
  {
    "id": "sg_126",
    "pillarId": "grammar",
    "pillarNameAr": "القواعد التحدثية السريعة",
    "pillarNameEn": "Spoken Grammar & Fast Patterns",
    "pillarIcon": "🧠",
    "level": "متوسط (Intermediate)",
    "levelCode": "B1-B2",
    "titleAr": "الماضي المستمر: كنت أسوق لما...",
    "titleEn": "Past Continuous vs Past Simple: I Was Driving When...",
    "descAr": "احكِ قصة: حدث طويل في الخلفية (was driving) قطعه حدث قصير (my phone rang).",
    "descEn": "Tell stories: a background action (was driving) interrupted by a short one (phone rang).",
    "speakingGoalAr": "احكِ موقفاً حصل لك باستخدام when و while.",
    "speakingGoalEn": "Tell an anecdote using when and while.",
    "keyPattern": {
      "ruleAr": "was/were + ing للحدث المستمر في لحظة من الماضي، والماضي البسيط للحدث القصير الذي قطعه. while + مستمر، when + بسيط غالباً.",
      "ruleEn": "was/were + -ing for background actions; past simple for the interrupting event. while + continuous, when + simple.",
      "formula": "was/were + V-ing ... when + past simple | While + past continuous, past simple"
    },
    "practicalExamples": [
      {
        "en": "I was driving to work when my phone rang.",
        "ar": "كنت أسوق للدوام لما رن جوالي."
      },
      {
        "en": "While we were having dinner, the lights went out.",
        "ar": "وإحنا نتعشى طفت الكهرباء."
      },
      {
        "en": "She was sleeping when I called.",
        "ar": "كانت نايمة لما اتصلت."
      },
      {
        "en": "What were you doing at 9 last night?",
        "ar": "وش كنت تسوي الساعة تسع البارحة؟"
      },
      {
        "en": "It was raining, so we stayed inside.",
        "ar": "كانت تمطر فجلسنا داخل."
      },
      {
        "en": "I saw an accident while I was walking home.",
        "ar": "شفت حادث وأنا راجع البيت مشي."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "I drove when my phone was ringing.",
        "correct": "I was driving when my phone rang.",
        "whyAr": "الحدث الطويل مستمر، والقصير بسيط."
      },
      {
        "incorrect": "While I walked, I was seeing a cat.",
        "correct": "While I was walking, I saw a cat.",
        "whyAr": "عكس الأدوار خطأ."
      },
      {
        "incorrect": "They was playing.",
        "correct": "They were playing.",
        "whyAr": "they ⇐ were."
      }
    ],
    "speakingChallenge": {
      "promptAr": "احكِ لسارة موقفاً غريباً أو مضحكاً صار لك.",
      "promptEn": "Tell Sara a funny or strange thing that happened to you.",
      "saraQuestionAr": "احكِ لي موقف ما تنساه!",
      "saraQuestionEn": "Tell me a story you'll never forget!",
      "recommendedResponseEn": "Last summer I was swimming at the beach when a big wave hit me. While I was trying to stand up, I lost my glasses. Luckily, a boy found them."
    },
    "quiz": [
      {
        "questionAr": "أكمل: I ___ TV when you called.",
        "questionEn": "Complete: I ___ TV when you called.",
        "options": [
          "watched",
          "was watching",
          "am watching"
        ],
        "correctIndex": 1,
        "explanationAr": "حدث مستمر قطعه الاتصال."
      },
      {
        "questionAr": "أكمل: ___ she was cooking, the baby woke up.",
        "questionEn": "Complete: ___ she was cooking, the baby woke up.",
        "options": [
          "When",
          "While",
          "During"
        ],
        "correctIndex": 1,
        "explanationAr": "while + مستمر."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I was driving when my phone rang.",
          "I drove when my phone was ringing."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I was driving when my phone rang. — الحدث الطويل مستمر، والقصير بسيط."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "While I was walking, I saw a cat.",
          "While I walked, I was seeing a cat."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: While I was walking, I saw a cat. — عكس الأدوار خطأ."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "They was playing.",
          "They were playing."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: They were playing. — they ⇐ were."
      }
    ],
    "whiteboardNotes": {
      "title": "Past Continuous vs Past Simple: I Was Driving When...",
      "pointsAr": [
        "يحكي خلفية القصة بالماضي المستمر.",
        "يربط بـ when و while.",
        "يحكي موقفاً كاملاً بالترتيب.",
        "was/were + ing للحدث المستمر في لحظة من الماضي، والماضي البسيط للحدث القصير الذي قطعه. while + مستمر، when + بسيط غالباً."
      ],
      "pointsEn": [
        "Set a scene with the past continuous.",
        "Link with when/while.",
        "Tell a complete anecdote.",
        "was/were + -ing for background actions; past simple for the interrupting event. while + continuous, when + simple."
      ],
      "chalkHighlight": "was/were + V-ing ... when + past simple | While + past continuous, past simple"
    },
    "unit": 6,
    "cefr": "B1",
    "objectivesAr": [
      "يحكي خلفية القصة بالماضي المستمر.",
      "يربط بـ when و while.",
      "يحكي موقفاً كاملاً بالترتيب."
    ],
    "objectivesEn": [
      "Set a scene with the past continuous.",
      "Link with when/while.",
      "Tell a complete anecdote."
    ],
    "vocabulary": [
      {
        "word": "suddenly",
        "ipa": "/ˈsʌdənli/",
        "ar": "فجأة",
        "exampleEn": "Suddenly, the lights went out.",
        "exampleAr": "فجأة طفت الأنوار."
      },
      {
        "word": "while",
        "ipa": "/waɪl/",
        "ar": "بينما/وأنا",
        "exampleEn": "While I was cooking...",
        "exampleAr": "وأنا أطبخ..."
      },
      {
        "word": "ring",
        "ipa": "/rɪŋ/",
        "ar": "يرن",
        "exampleEn": "The phone rang.",
        "exampleAr": "رن الجوال.",
        "note": "irregular: ring → rang → rung"
      },
      {
        "word": "accident",
        "ipa": "/ˈæksɪdənt/",
        "ar": "حادث",
        "exampleEn": "I saw an accident.",
        "exampleAr": "شفت حادث."
      },
      {
        "word": "power cut",
        "ipa": "/ˈpaʊər kʌt/",
        "ar": "انقطاع كهرباء",
        "exampleEn": "There was a power cut.",
        "exampleAr": "انقطعت الكهرباء."
      },
      {
        "word": "fall",
        "ipa": "/fɔːl/",
        "ar": "يطيح",
        "exampleEn": "He fell off his bike.",
        "exampleAr": "طاح من السيكل.",
        "note": "irregular: fall → fell → fallen"
      },
      {
        "word": "break down",
        "ipa": "/breɪk daʊn/",
        "ar": "يتعطل",
        "exampleEn": "The car broke down.",
        "exampleAr": "السيارة تعطلت."
      },
      {
        "word": "happen",
        "ipa": "/ˈhæpən/",
        "ar": "يحدث",
        "exampleEn": "What happened?",
        "exampleAr": "وش صار؟"
      },
      {
        "word": "noise",
        "ipa": "/nɔɪz/",
        "ar": "صوت/إزعاج",
        "exampleEn": "I heard a noise.",
        "exampleAr": "سمعت صوت."
      },
      {
        "word": "luckily",
        "ipa": "/ˈlʌkɪli/",
        "ar": "لحسن الحظ",
        "exampleEn": "Luckily, nobody was hurt.",
        "exampleAr": "الحمد لله ما أحد تأذى."
      }
    ],
    "grammarFocus": {
      "ruleAr": "was/were + ing للحدث المستمر في لحظة من الماضي، والماضي البسيط للحدث القصير الذي قطعه. while + مستمر، when + بسيط غالباً.",
      "ruleEn": "was/were + -ing for background actions; past simple for the interrupting event. while + continuous, when + simple.",
      "formula": "was/were + V-ing ... when + past simple | While + past continuous, past simple",
      "examples": [
        {
          "en": "I was driving to work when my phone rang.",
          "ar": "كنت أسوق للدوام لما رن جوالي."
        },
        {
          "en": "While we were having dinner, the lights went out.",
          "ar": "وإحنا نتعشى طفت الكهرباء."
        },
        {
          "en": "She was sleeping when I called.",
          "ar": "كانت نايمة لما اتصلت."
        },
        {
          "en": "What were you doing at 9 last night?",
          "ar": "وش كنت تسوي الساعة تسع البارحة؟"
        },
        {
          "en": "It was raining, so we stayed inside.",
          "ar": "كانت تمطر فجلسنا داخل."
        },
        {
          "en": "I saw an accident while I was walking home.",
          "ar": "شفت حادث وأنا راجع البيت مشي."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "You look tired. What happened?",
        "ar": "شكلك تعبان. وش صار؟"
      },
      {
        "speaker": "Student",
        "en": "Last night I was driving home when my car broke down.",
        "ar": "البارحة كنت راجع البيت لما تعطلت سيارتي."
      },
      {
        "speaker": "Sara",
        "en": "Oh no! Where were you?",
        "ar": "يا ساتر! وين كنت؟"
      },
      {
        "speaker": "Student",
        "en": "I was on the highway. It was getting dark.",
        "ar": "كنت على الخط السريع. وكان الجو يظلم."
      },
      {
        "speaker": "Sara",
        "en": "What did you do?",
        "ar": "وش سويت؟"
      },
      {
        "speaker": "Student",
        "en": "While I was waiting, a kind man stopped and helped me. Luckily!",
        "ar": "وأنا أنتظر، وقف رجال طيب وساعدني. الحمد لله!"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: You look tired. What happened?\nStudent: Last night I was driving home when my car broke down.\nSara: Oh no! Where were you?\nStudent: I was on the highway. It was getting dark.\nSara: What did you do?\nStudent: While I was waiting, a kind man stopped and helped me. Luckily!",
      "questions": [
        {
          "questionAr": "وش صار للسيارة؟",
          "questionEn": "What happened to the car?",
          "options": [
            "it broke down",
            "it crashed",
            "it was stolen"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: it broke down"
        },
        {
          "questionAr": "وين كان؟",
          "questionEn": "Where was he?",
          "options": [
            "in the city",
            "on the highway",
            "at home"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: on the highway"
        },
        {
          "questionAr": "مين ساعده؟",
          "questionEn": "Who helped him?",
          "options": [
            "the police",
            "his brother",
            "a kind man"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: a kind man"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Weak was/were in continuous: /wəz ˈdraɪvɪŋ/",
      "items": [
        "I was driving /aɪ wəz ˈdraɪvɪŋ/",
        "they were playing /ðeɪ wər ˈpleɪɪŋ/",
        "suddenly /ˈsʌdənli/"
      ],
      "tipAr": "ركز الضغط على الفعل (DRIVing) وليس على was."
    },
    "exercises": {
      "easy": [
        {
          "id": "sg_126_e1",
          "type": "meaning",
          "promptEn": "What does \"suddenly\" mean?",
          "promptAr": "ما معنى \"suddenly\"؟",
          "options": [
            "يرن",
            "يحدث",
            "حادث",
            "فجأة"
          ],
          "correctIndex": 3,
          "answer": "فجأة",
          "explanationAr": "\"suddenly\" /ˈsʌdənli/ تعني: فجأة. مثال: Suddenly, the lights went out."
        },
        {
          "id": "sg_126_e2",
          "type": "meaning",
          "promptEn": "What does \"while\" mean?",
          "promptAr": "ما معنى \"while\"؟",
          "options": [
            "بينما/وأنا",
            "انقطاع كهرباء",
            "يطيح",
            "يرن"
          ],
          "correctIndex": 0,
          "answer": "بينما/وأنا",
          "explanationAr": "\"while\" /waɪl/ تعني: بينما/وأنا. مثال: While I was cooking..."
        },
        {
          "id": "sg_126_e3",
          "type": "meaning",
          "promptEn": "What does \"ring\" mean?",
          "promptAr": "ما معنى \"ring\"؟",
          "options": [
            "يطيح",
            "يرن",
            "انقطاع كهرباء",
            "بينما/وأنا"
          ],
          "correctIndex": 1,
          "answer": "يرن",
          "explanationAr": "\"ring\" /rɪŋ/ تعني: يرن. مثال: The phone rang."
        },
        {
          "id": "sg_126_e4",
          "type": "meaning",
          "promptEn": "What does \"accident\" mean?",
          "promptAr": "ما معنى \"accident\"؟",
          "options": [
            "لحسن الحظ",
            "حادث",
            "يتعطل",
            "يحدث"
          ],
          "correctIndex": 1,
          "answer": "حادث",
          "explanationAr": "\"accident\" /ˈæksɪdənt/ تعني: حادث. مثال: I saw an accident."
        }
      ],
      "medium": [
        {
          "id": "sg_126_m1",
          "type": "gap",
          "promptEn": "Complete: I ____ to work when my phone rang.",
          "promptAr": "أكمل الفراغ: (كنت أسوق للدوام لما رن جوالي.)",
          "options": [
            "drove",
            "was driving",
            "am driving"
          ],
          "correctIndex": 1,
          "answer": "I was driving to work when my phone rang.",
          "explanationAr": "الإجابة: was driving. was/were + ing للحدث المستمر في لحظة من الماضي، والماضي البسيط للحدث القصير الذي قطعه. while + مستمر، when + بسيط غالباً."
        },
        {
          "id": "sg_126_m2",
          "type": "gap",
          "promptEn": "Complete: While we ____ dinner, the lights went out.",
          "promptAr": "أكمل الفراغ: (وإحنا نتعشى طفت الكهرباء.)",
          "options": [
            "were having",
            "was having",
            "had"
          ],
          "correctIndex": 0,
          "answer": "While we were having dinner, the lights went out.",
          "explanationAr": "الإجابة: were having. was/were + ing للحدث المستمر في لحظة من الماضي، والماضي البسيط للحدث القصير الذي قطعه. while + مستمر، when + بسيط غالباً."
        },
        {
          "id": "sg_126_m3",
          "type": "gap",
          "promptEn": "Complete: She was sleeping ____ I called.",
          "promptAr": "أكمل الفراغ: (كانت نايمة لما اتصلت.)",
          "options": [
            "when",
            "while",
            "during"
          ],
          "correctIndex": 0,
          "answer": "She was sleeping when I called.",
          "explanationAr": "الإجابة: when. was/were + ing للحدث المستمر في لحظة من الماضي، والماضي البسيط للحدث القصير الذي قطعه. while + مستمر، when + بسيط غالباً."
        },
        {
          "id": "sg_126_m4",
          "type": "gap",
          "promptEn": "Complete: What ____ you doing at 9 last night?",
          "promptAr": "أكمل الفراغ: (وش كنت تسوي الساعة تسع البارحة؟)",
          "options": [
            "was",
            "were",
            "did"
          ],
          "correctIndex": 1,
          "answer": "What were you doing at 9 last night?",
          "explanationAr": "الإجابة: were. was/were + ing للحدث المستمر في لحظة من الماضي، والماضي البسيط للحدث القصير الذي قطعه. while + مستمر، when + بسيط غالباً."
        }
      ],
      "hard": [
        {
          "id": "sg_126_h1",
          "type": "order",
          "promptEn": "Put the words in order: inside. / stayed / so / we / It / was / raining,",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (كانت تمطر فجلسنا داخل.)",
          "answer": "It was raining, so we stayed inside.",
          "explanationAr": "الترتيب الصحيح: It was raining, so we stayed inside."
        },
        {
          "id": "sg_126_h2",
          "type": "order",
          "promptEn": "Put the words in order: saw / walking / accident / an / was / home. / I / I / while",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (شفت حادث وأنا راجع البيت مشي.)",
          "answer": "I saw an accident while I was walking home.",
          "explanationAr": "الترتيب الصحيح: I saw an accident while I was walking home."
        },
        {
          "id": "sg_126_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: وإحنا نتعشى طفت الكهرباء.",
          "answer": "While we were having dinner, the lights went out.",
          "explanationAr": "ترجمة مقترحة: While we were having dinner, the lights went out."
        },
        {
          "id": "sg_126_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: وش كنت تسوي الساعة تسع البارحة؟",
          "answer": "What were you doing at 9 last night?",
          "explanationAr": "ترجمة مقترحة: What were you doing at 9 last night?"
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "When I was drive, I saw...",
        "correct": "When I was driving, I saw...",
        "whyAr": "لا تنسَ ing."
      },
      {
        "incorrect": "I was saw him.",
        "correct": "I saw him.",
        "whyAr": "لا نجمع was مع الماضي البسيط."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (Used to: عادات الماضي): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I used to play football.",
          "I used to playing football."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I used to play football. — used to + فعل أصلي.",
        "fromLessonId": "sg_125"
      },
      {
        "questionAr": "مراجعة (Should / Must / Have to: النصيحة والإلزام): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "You should to sleep early.",
          "You should sleep early."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: You should sleep early. — لا to بعد should.",
        "fromLessonId": "sg_123"
      },
      {
        "questionAr": "مراجعة (Will: قرارات فورية ووعود وتوقعات): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'll call you.",
          "I will to call you."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I'll call you. — لا to بعد will.",
        "fromLessonId": "sg_103"
      },
      {
        "questionAr": "ما معنى \"worry\"؟",
        "questionEn": "What does \"worry\" mean?",
        "options": [
          "يستعجل",
          "يقلق",
          "يفوّت",
          "يوافق"
        ],
        "correctIndex": 1,
        "explanationAr": "\"worry\" /ˈwɜːri/ تعني: يقلق. مثال: Don't worry if you're late.",
        "fromLessonId": "sg_124"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (كانت نايمة لما اتصلت.)",
          "questionEn": "Complete: She was sleeping ____ I called.",
          "options": [
            "when",
            "while",
            "during"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: when. was/were + ing للحدث المستمر في لحظة من الماضي، والماضي البسيط للحدث القصير الذي قطعه. while + مستمر، when + بسيط غالباً."
        },
        {
          "questionAr": "أكمل الفراغ: (وش كنت تسوي الساعة تسع البارحة؟)",
          "questionEn": "Complete: What ____ you doing at 9 last night?",
          "options": [
            "was",
            "were",
            "did"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: were. was/were + ing للحدث المستمر في لحظة من الماضي، والماضي البسيط للحدث القصير الذي قطعه. while + مستمر، when + بسيط غالباً."
        },
        {
          "questionAr": "ما معنى \"power cut\"؟",
          "questionEn": "What does \"power cut\" mean?",
          "options": [
            "يحدث",
            "انقطاع كهرباء",
            "صوت/إزعاج",
            "يطيح"
          ],
          "correctIndex": 1,
          "explanationAr": "\"power cut\" /ˈpaʊər kʌt/ تعني: انقطاع كهرباء. مثال: There was a power cut."
        },
        {
          "questionAr": "ما معنى \"fall\"؟",
          "questionEn": "What does \"fall\" mean?",
          "options": [
            "لحسن الحظ",
            "بينما/وأنا",
            "يطيح",
            "صوت/إزعاج"
          ],
          "correctIndex": 2,
          "explanationAr": "\"fall\" /fɔːl/ تعني: يطيح. مثال: He fell off his bike."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "When I was drive, I saw...",
            "When I was driving, I saw..."
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: When I was driving, I saw... — لا تنسَ ing."
        }
      ]
    }
  },
  {
    "id": "sg_127",
    "pillarId": "grammar",
    "pillarNameAr": "القواعد التحدثية السريعة",
    "pillarNameEn": "Spoken Grammar & Fast Patterns",
    "pillarIcon": "🧠",
    "level": "متوسط (Intermediate)",
    "levelCode": "B1-B2",
    "titleAr": "أسماء الوصل: who / which / that / where",
    "titleEn": "Relative Clauses: Who, Which, That, Where",
    "descAr": "اربط جملتين بجملة وحدة وعرّف الأشخاص والأشياء والأماكن بدقة.",
    "descEn": "Join ideas and define people, things and places precisely.",
    "speakingGoalAr": "صف ثلاثة أشخاص وثلاثة أماكن بجمل وصل.",
    "speakingGoalEn": "Define three people and three places using relative clauses.",
    "keyPattern": {
      "ruleAr": "who للأشخاص، which للأشياء، that للاثنين في الجمل المحددة، where للأماكن. لا نكرر الضمير بعد اسم الوصل.",
      "ruleEn": "who = people, which = things, that = both (defining), where = places. Don't repeat the pronoun.",
      "formula": "noun + who/which/that/where + clause"
    },
    "practicalExamples": [
      {
        "en": "A pilot is a person who flies planes.",
        "ar": "الطيار شخص يقود الطائرات."
      },
      {
        "en": "This is the phone which I bought yesterday.",
        "ar": "هذا الجوال اللي اشتريته أمس."
      },
      {
        "en": "That's the restaurant where we had dinner.",
        "ar": "هذا المطعم اللي تعشينا فيه."
      },
      {
        "en": "The man that lives next door is a doctor.",
        "ar": "الرجال اللي ساكن جنبنا دكتور."
      },
      {
        "en": "I have a friend who speaks five languages.",
        "ar": "عندي صديق يتكلم خمس لغات."
      },
      {
        "en": "The book that you gave me was amazing.",
        "ar": "الكتاب اللي عطيتني إياه كان رهيب."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "The man who he lives next door...",
        "correct": "The man who lives next door...",
        "whyAr": "لا نكرر he بعد who."
      },
      {
        "incorrect": "The car who I bought...",
        "correct": "The car which/that I bought...",
        "whyAr": "who للأشخاص فقط."
      },
      {
        "incorrect": "The city which I was born.",
        "correct": "The city where I was born.",
        "whyAr": "للمكان مع فعل لازم ⇐ where."
      }
    ],
    "speakingChallenge": {
      "promptAr": "العب مع سارة لعبة التعريفات.",
      "promptEn": "Play a definition guessing game with Sara.",
      "saraQuestionAr": "عرّف لي ثلاث كلمات وأنا أخمن!",
      "saraQuestionEn": "Define three things and I'll guess!",
      "recommendedResponseEn": "It's a person who teaches students. It's a place where you watch films. It's a thing which keeps food cold."
    },
    "quiz": [
      {
        "questionAr": "أكمل: That's the school ___ I studied.",
        "questionEn": "Complete: That's the school ___ I studied.",
        "options": [
          "which",
          "where",
          "who"
        ],
        "correctIndex": 1,
        "explanationAr": "مكان ⇐ where."
      },
      {
        "questionAr": "أكمل: I met a girl ___ plays the oud.",
        "questionEn": "Complete: I met a girl ___ plays the oud.",
        "options": [
          "which",
          "who",
          "where"
        ],
        "correctIndex": 1,
        "explanationAr": "شخص ⇐ who."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "The man who he lives next door...",
          "The man who lives next door..."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: The man who lives next door... — لا نكرر he بعد who."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "The car who I bought...",
          "The car which/that I bought..."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: The car which/that I bought... — who للأشخاص فقط."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "The city where I was born.",
          "The city which I was born."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: The city where I was born. — للمكان مع فعل لازم ⇐ where."
      }
    ],
    "whiteboardNotes": {
      "title": "Relative Clauses: Who, Which, That, Where",
      "pointsAr": [
        "يختار اسم الوصل المناسب.",
        "لا يكرر الضمير بعد الوصل.",
        "يعرّف كلمات بجمل وصل.",
        "who للأشخاص، which للأشياء، that للاثنين في الجمل المحددة، where للأماكن. لا نكرر الضمير بعد اسم الوصل."
      ],
      "pointsEn": [
        "Choose the right relative pronoun.",
        "Avoid repeating the pronoun.",
        "Define words using relative clauses.",
        "who = people, which = things, that = both (defining), where = places. Don't repeat the pronoun."
      ],
      "chalkHighlight": "noun + who/which/that/where + clause"
    },
    "unit": 6,
    "cefr": "B1",
    "objectivesAr": [
      "يختار اسم الوصل المناسب.",
      "لا يكرر الضمير بعد الوصل.",
      "يعرّف كلمات بجمل وصل."
    ],
    "objectivesEn": [
      "Choose the right relative pronoun.",
      "Avoid repeating the pronoun.",
      "Define words using relative clauses."
    ],
    "vocabulary": [
      {
        "word": "pilot",
        "ipa": "/ˈpaɪlət/",
        "ar": "طيار",
        "exampleEn": "He's a pilot who flies to Asia.",
        "exampleAr": "طيار يطير لآسيا."
      },
      {
        "word": "next door",
        "ipa": "/nɛkst dɔːr/",
        "ar": "الجيران/جنبنا",
        "exampleEn": "The family next door is kind.",
        "exampleAr": "جيراننا طيبين."
      },
      {
        "word": "born",
        "ipa": "/bɔːrn/",
        "ar": "مولود",
        "exampleEn": "the city where I was born",
        "exampleAr": "المدينة اللي انولدت فيها"
      },
      {
        "word": "language",
        "ipa": "/ˈlæŋɡwɪdʒ/",
        "ar": "لغة",
        "exampleEn": "a friend who speaks languages",
        "exampleAr": "صديق يتكلم لغات"
      },
      {
        "word": "tool",
        "ipa": "/tuːl/",
        "ar": "أداة",
        "exampleEn": "a tool which cuts wood",
        "exampleAr": "أداة تقطع الخشب"
      },
      {
        "word": "mechanic",
        "ipa": "/məˈkænɪk/",
        "ar": "ميكانيكي",
        "exampleEn": "a person who fixes cars",
        "exampleAr": "شخص يصلح السيارات"
      },
      {
        "word": "pharmacy",
        "ipa": "/ˈfɑːrməsi/",
        "ar": "صيدلية",
        "exampleEn": "a place where you buy medicine",
        "exampleAr": "مكان تشتري منه الدواء"
      },
      {
        "word": "fix",
        "ipa": "/fɪks/",
        "ar": "يصلح",
        "exampleEn": "Who fixed your car?",
        "exampleAr": "مين صلّح سيارتك؟"
      },
      {
        "word": "define",
        "ipa": "/dɪˈfaɪn/",
        "ar": "يعرّف",
        "exampleEn": "Can you define it?",
        "exampleAr": "تقدر تعرّفه؟"
      },
      {
        "word": "app",
        "ipa": "/æp/",
        "ar": "تطبيق",
        "exampleEn": "an app which helps you learn",
        "exampleAr": "تطبيق يساعدك تتعلم"
      }
    ],
    "grammarFocus": {
      "ruleAr": "who للأشخاص، which للأشياء، that للاثنين في الجمل المحددة، where للأماكن. لا نكرر الضمير بعد اسم الوصل.",
      "ruleEn": "who = people, which = things, that = both (defining), where = places. Don't repeat the pronoun.",
      "formula": "noun + who/which/that/where + clause",
      "examples": [
        {
          "en": "A pilot is a person who flies planes.",
          "ar": "الطيار شخص يقود الطائرات."
        },
        {
          "en": "This is the phone which I bought yesterday.",
          "ar": "هذا الجوال اللي اشتريته أمس."
        },
        {
          "en": "That's the restaurant where we had dinner.",
          "ar": "هذا المطعم اللي تعشينا فيه."
        },
        {
          "en": "The man that lives next door is a doctor.",
          "ar": "الرجال اللي ساكن جنبنا دكتور."
        },
        {
          "en": "I have a friend who speaks five languages.",
          "ar": "عندي صديق يتكلم خمس لغات."
        },
        {
          "en": "The book that you gave me was amazing.",
          "ar": "الكتاب اللي عطيتني إياه كان رهيب."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Let's play a game. I describe, you guess! It's a person who fixes cars.",
        "ar": "خلنا نلعب: أوصف وأنت تخمن! شخص يصلح السيارات."
      },
      {
        "speaker": "Student",
        "en": "A mechanic!",
        "ar": "ميكانيكي!"
      },
      {
        "speaker": "Sara",
        "en": "Right! It's a place where you buy medicine.",
        "ar": "صح! مكان تشتري منه الدواء."
      },
      {
        "speaker": "Student",
        "en": "A pharmacy! My turn: it's an animal which lives in the desert and carries people.",
        "ar": "صيدلية! دوري: حيوان يعيش في الصحراء ويشيل الناس."
      },
      {
        "speaker": "Sara",
        "en": "A camel! Easy.",
        "ar": "جمل! سهلة."
      },
      {
        "speaker": "Student",
        "en": "OK, harder: it's the city where the Prophet's Mosque is.",
        "ar": "طيب أصعب: المدينة اللي فيها المسجد النبوي."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Let's play a game. I describe, you guess! It's a person who fixes cars.\nStudent: A mechanic!\nSara: Right! It's a place where you buy medicine.\nStudent: A pharmacy! My turn: it's an animal which lives in the desert and carries people.\nSara: A camel! Easy.\nStudent: OK, harder: it's the city where the Prophet's Mosque is.",
      "questions": [
        {
          "questionAr": "وش يسوي الميكانيكي؟",
          "questionEn": "What does a mechanic do?",
          "options": [
            "sells medicine",
            "fixes cars",
            "flies planes"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: fixes cars"
        },
        {
          "questionAr": "أي حيوان وصف؟",
          "questionEn": "Which animal did the student describe?",
          "options": [
            "a horse",
            "a falcon",
            "a camel"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: a camel"
        },
        {
          "questionAr": "وش المدينة الأخيرة؟",
          "questionEn": "Which city is the last answer?",
          "options": [
            "Makkah",
            "Madinah",
            "Riyadh"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: Madinah"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Linking in relative clauses: 'a man who' /əmæn huː/",
      "items": [
        "who /huː/",
        "which /wɪtʃ/ = witch",
        "where /wɛr/ vs were /wɜːr/"
      ],
      "tipAr": "where «وير» و were «وَر» تختلفان. و which تنطق مثل witch تماماً."
    },
    "exercises": {
      "easy": [
        {
          "id": "sg_127_e1",
          "type": "meaning",
          "promptEn": "What does \"pilot\" mean?",
          "promptAr": "ما معنى \"pilot\"؟",
          "options": [
            "تطبيق",
            "ميكانيكي",
            "لغة",
            "طيار"
          ],
          "correctIndex": 3,
          "answer": "طيار",
          "explanationAr": "\"pilot\" /ˈpaɪlət/ تعني: طيار. مثال: He's a pilot who flies to Asia."
        },
        {
          "id": "sg_127_e2",
          "type": "meaning",
          "promptEn": "What does \"next door\" mean?",
          "promptAr": "ما معنى \"next door\"؟",
          "options": [
            "يصلح",
            "الجيران/جنبنا",
            "لغة",
            "أداة"
          ],
          "correctIndex": 1,
          "answer": "الجيران/جنبنا",
          "explanationAr": "\"next door\" /nɛkst dɔːr/ تعني: الجيران/جنبنا. مثال: The family next door is kind."
        },
        {
          "id": "sg_127_e3",
          "type": "meaning",
          "promptEn": "What does \"born\" mean?",
          "promptAr": "ما معنى \"born\"؟",
          "options": [
            "ميكانيكي",
            "لغة",
            "يعرّف",
            "مولود"
          ],
          "correctIndex": 3,
          "answer": "مولود",
          "explanationAr": "\"born\" /bɔːrn/ تعني: مولود. مثال: the city where I was born"
        },
        {
          "id": "sg_127_e4",
          "type": "meaning",
          "promptEn": "What does \"language\" mean?",
          "promptAr": "ما معنى \"language\"؟",
          "options": [
            "الجيران/جنبنا",
            "صيدلية",
            "لغة",
            "طيار"
          ],
          "correctIndex": 2,
          "answer": "لغة",
          "explanationAr": "\"language\" /ˈlæŋɡwɪdʒ/ تعني: لغة. مثال: a friend who speaks languages"
        }
      ],
      "medium": [
        {
          "id": "sg_127_m1",
          "type": "gap",
          "promptEn": "Complete: A pilot is a person ____ flies planes.",
          "promptAr": "أكمل الفراغ: (الطيار شخص يقود الطائرات.)",
          "options": [
            "where",
            "which",
            "who"
          ],
          "correctIndex": 2,
          "answer": "A pilot is a person who flies planes.",
          "explanationAr": "الإجابة: who. who للأشخاص، which للأشياء، that للاثنين في الجمل المحددة، where للأماكن. لا نكرر الضمير بعد اسم الوصل."
        },
        {
          "id": "sg_127_m2",
          "type": "gap",
          "promptEn": "Complete: This is the phone ____ I bought yesterday.",
          "promptAr": "أكمل الفراغ: (هذا الجوال اللي اشتريته أمس.)",
          "options": [
            "which",
            "who",
            "where"
          ],
          "correctIndex": 0,
          "answer": "This is the phone which I bought yesterday.",
          "explanationAr": "الإجابة: which. who للأشخاص، which للأشياء، that للاثنين في الجمل المحددة، where للأماكن. لا نكرر الضمير بعد اسم الوصل."
        },
        {
          "id": "sg_127_m3",
          "type": "gap",
          "promptEn": "Complete: That's the restaurant ____ we had dinner.",
          "promptAr": "أكمل الفراغ: (هذا المطعم اللي تعشينا فيه.)",
          "options": [
            "who",
            "where",
            "which"
          ],
          "correctIndex": 1,
          "answer": "That's the restaurant where we had dinner.",
          "explanationAr": "الإجابة: where. who للأشخاص، which للأشياء، that للاثنين في الجمل المحددة، where للأماكن. لا نكرر الضمير بعد اسم الوصل."
        },
        {
          "id": "sg_127_m4",
          "type": "gap",
          "promptEn": "Complete: The man ____ lives next door is a doctor.",
          "promptAr": "أكمل الفراغ: (الرجال اللي ساكن جنبنا دكتور.)",
          "options": [
            "where",
            "what",
            "that"
          ],
          "correctIndex": 2,
          "answer": "The man that lives next door is a doctor.",
          "explanationAr": "الإجابة: that. who للأشخاص، which للأشياء، that للاثنين في الجمل المحددة، where للأماكن. لا نكرر الضمير بعد اسم الوصل."
        }
      ],
      "hard": [
        {
          "id": "sg_127_h1",
          "type": "order",
          "promptEn": "Put the words in order: who / I / five / speaks / have / languages. / a / friend",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (عندي صديق يتكلم خمس لغات.)",
          "answer": "I have a friend who speaks five languages.",
          "explanationAr": "الترتيب الصحيح: I have a friend who speaks five languages."
        },
        {
          "id": "sg_127_h2",
          "type": "order",
          "promptEn": "Put the words in order: book / was / amazing. / me / The / you / gave / that",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (الكتاب اللي عطيتني إياه كان رهيب.)",
          "answer": "The book that you gave me was amazing.",
          "explanationAr": "الترتيب الصحيح: The book that you gave me was amazing."
        },
        {
          "id": "sg_127_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: هذا الجوال اللي اشتريته أمس.",
          "answer": "This is the phone which I bought yesterday.",
          "explanationAr": "ترجمة مقترحة: This is the phone which I bought yesterday."
        },
        {
          "id": "sg_127_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: الرجال اللي ساكن جنبنا دكتور.",
          "answer": "The man that lives next door is a doctor.",
          "explanationAr": "ترجمة مقترحة: The man that lives next door is a doctor."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "The book that I read it was great.",
        "correct": "The book that I read was great.",
        "whyAr": "بالعربي نقول «اللي قرأته»، بالإنجليزي ما نكرر it."
      },
      {
        "incorrect": "The people which work here...",
        "correct": "The people who work here...",
        "whyAr": "الأشخاص ⇐ who."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (الماضي المستمر: كنت أسوق لما...): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "While I was walking, I saw a cat.",
          "While I walked, I was seeing a cat."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: While I was walking, I saw a cat. — عكس الأدوار خطأ.",
        "fromLessonId": "sg_126"
      },
      {
        "questionAr": "مراجعة (الشرط الأول: If it rains, we'll stay home): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "If it rains, we'll stay home.",
          "If it will rain, we'll stay home."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: If it rains, we'll stay home. — بعد if مضارع بسيط وليس will.",
        "fromLessonId": "sg_124"
      },
      {
        "questionAr": "مراجعة (المضارع التام للتجارب: Have you ever...?): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Have you ever went to Paris?",
          "Have you ever been to Paris?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Have you ever been to Paris? — بعد have نستخدم التصريف الثالث.",
        "fromLessonId": "sg_121"
      },
      {
        "questionAr": "ما معنى \"be used to\"؟",
        "questionEn": "What does \"be used to\" mean?",
        "options": [
          "هالأيام",
          "الطفولة",
          "متعود على",
          "يبيع"
        ],
        "correctIndex": 2,
        "explanationAr": "\"be used to\" /biː juːst tuː/ تعني: متعود على. مثال: I'm used to the heat.",
        "fromLessonId": "sg_125"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (هذا المطعم اللي تعشينا فيه.)",
          "questionEn": "Complete: That's the restaurant ____ we had dinner.",
          "options": [
            "who",
            "where",
            "which"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: where. who للأشخاص، which للأشياء، that للاثنين في الجمل المحددة، where للأماكن. لا نكرر الضمير بعد اسم الوصل."
        },
        {
          "questionAr": "أكمل الفراغ: (الرجال اللي ساكن جنبنا دكتور.)",
          "questionEn": "Complete: The man ____ lives next door is a doctor.",
          "options": [
            "where",
            "what",
            "that"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: that. who للأشخاص، which للأشياء، that للاثنين في الجمل المحددة، where للأماكن. لا نكرر الضمير بعد اسم الوصل."
        },
        {
          "questionAr": "ما معنى \"tool\"؟",
          "questionEn": "What does \"tool\" mean?",
          "options": [
            "الجيران/جنبنا",
            "أداة",
            "لغة",
            "طيار"
          ],
          "correctIndex": 1,
          "explanationAr": "\"tool\" /tuːl/ تعني: أداة. مثال: a tool which cuts wood"
        },
        {
          "questionAr": "ما معنى \"mechanic\"؟",
          "questionEn": "What does \"mechanic\" mean?",
          "options": [
            "مولود",
            "تطبيق",
            "ميكانيكي",
            "يصلح"
          ],
          "correctIndex": 2,
          "explanationAr": "\"mechanic\" /məˈkænɪk/ تعني: ميكانيكي. مثال: a person who fixes cars"
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "The book that I read was great.",
            "The book that I read it was great."
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: The book that I read was great. — بالعربي نقول «اللي قرأته»، بالإنجليزي ما نكرر it."
        }
      ]
    }
  },
  {
    "id": "sg_128",
    "pillarId": "grammar",
    "pillarNameAr": "القواعد التحدثية السريعة",
    "pillarNameEn": "Spoken Grammar & Fast Patterns",
    "pillarIcon": "🧠",
    "level": "متقدم (Advanced)",
    "levelCode": "B1-B2",
    "titleAr": "المبني للمجهول: is made / was built",
    "titleEn": "The Passive: Is Made, Was Built",
    "descAr": "ركز على الحدث نفسه وليس الفاعل: The mosque was built in 1950.",
    "descEn": "Focus on the action, not the doer: The mosque was built in 1950.",
    "speakingGoalAr": "صف كيف يُصنع شيء محلي (القهوة السعودية، التمر) بالمبني للمجهول.",
    "speakingGoalEn": "Describe how a local product is made using the passive.",
    "keyPattern": {
      "ruleAr": "be + التصريف الثالث. المضارع: is/are made. الماضي: was/were built. نضيف by + الفاعل فقط إذا كان مهماً.",
      "ruleEn": "be + past participle: is/are made (present), was/were built (past). Add 'by + agent' only when it matters.",
      "formula": "object + is/are/was/were + V3 (+ by ...)"
    },
    "practicalExamples": [
      {
        "en": "Arabic coffee is made with cardamom.",
        "ar": "القهوة العربية تُسوّى بالهيل."
      },
      {
        "en": "The Masmak Fort was built in 1865.",
        "ar": "قصر المصمك بُني عام ١٨٦٥."
      },
      {
        "en": "Dates are grown in Al-Ahsa and Qassim.",
        "ar": "التمور تُزرع في الأحساء والقصيم."
      },
      {
        "en": "The thief was caught by the police.",
        "ar": "الحرامي انمسك من الشرطة."
      },
      {
        "en": "English is spoken all over the world.",
        "ar": "الإنجليزية يتكلمونها في كل العالم."
      },
      {
        "en": "My phone was stolen at the airport.",
        "ar": "جوالي انسرق في المطار."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "The fort was build in 1865.",
        "correct": "The fort was built in 1865.",
        "whyAr": "المجهول يحتاج التصريف الثالث built."
      },
      {
        "incorrect": "Coffee is make with cardamom.",
        "correct": "Coffee is made with cardamom.",
        "whyAr": "made وليس make."
      },
      {
        "incorrect": "The thief was caught from the police.",
        "correct": "The thief was caught by the police.",
        "whyAr": "الفاعل في المجهول بعد by."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اشرح لسارة كيف يُصنع شيء تعرفه.",
      "promptEn": "Explain to Sara how something is made.",
      "saraQuestionAr": "كيف يُصنع الخبز أو الكبسة؟ استخدم المجهول!",
      "saraQuestionEn": "How is bread or kabsa made? Use the passive!",
      "recommendedResponseEn": "First, the rice is washed. The chicken is cooked with spices. Then the rice is added and cooked. Finally, it's served on a big plate."
    },
    "quiz": [
      {
        "questionAr": "حوّل: They clean the room every day.",
        "questionEn": "Passive of: They clean the room every day.",
        "options": [
          "The room cleaned every day.",
          "The room is cleaned every day.",
          "The room is clean every day."
        ],
        "correctIndex": 1,
        "explanationAr": "is + cleaned."
      },
      {
        "questionAr": "أكمل: The pyramids ___ thousands of years ago.",
        "questionEn": "Complete: The pyramids ___ thousands of years ago.",
        "options": [
          "were built",
          "built",
          "are built"
        ],
        "correctIndex": 0,
        "explanationAr": "ماضي مجهول جمع ⇐ were built."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "The fort was built in 1865.",
          "The fort was build in 1865."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: The fort was built in 1865. — المجهول يحتاج التصريف الثالث built."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Coffee is made with cardamom.",
          "Coffee is make with cardamom."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Coffee is made with cardamom. — made وليس make."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "The thief was caught from the police.",
          "The thief was caught by the police."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: The thief was caught by the police. — الفاعل في المجهول بعد by."
      }
    ],
    "whiteboardNotes": {
      "title": "The Passive: Is Made, Was Built",
      "pointsAr": [
        "يحول جملة من المعلوم للمجهول.",
        "يستخدم المجهول في المضارع والماضي.",
        "يصف عملية صنع خطوة بخطوة.",
        "be + التصريف الثالث. المضارع: is/are made. الماضي: was/were built. نضيف by + الفاعل فقط إذا كان مهماً."
      ],
      "pointsEn": [
        "Transform active sentences to passive.",
        "Use present and past passive.",
        "Describe a process step by step.",
        "be + past participle: is/are made (present), was/were built (past). Add 'by + agent' only when it matters."
      ],
      "chalkHighlight": "object + is/are/was/were + V3 (+ by ...)"
    },
    "unit": 6,
    "cefr": "B2",
    "objectivesAr": [
      "يحول جملة من المعلوم للمجهول.",
      "يستخدم المجهول في المضارع والماضي.",
      "يصف عملية صنع خطوة بخطوة."
    ],
    "objectivesEn": [
      "Transform active sentences to passive.",
      "Use present and past passive.",
      "Describe a process step by step."
    ],
    "vocabulary": [
      {
        "word": "built",
        "ipa": "/bɪlt/",
        "ar": "بنى / مبني",
        "exampleEn": "It was built in 1950.",
        "exampleAr": "بُني عام ١٩٥٠.",
        "note": "past of build: build → built → built"
      },
      {
        "word": "made",
        "ipa": "/meɪd/",
        "ar": "مصنوع",
        "exampleEn": "It's made of gold.",
        "exampleAr": "مصنوع من ذهب."
      },
      {
        "word": "grown",
        "ipa": "/ɡroʊn/",
        "ar": "مزروع",
        "exampleEn": "Coffee is grown in Jazan.",
        "exampleAr": "البن يُزرع في جازان."
      },
      {
        "word": "roasted",
        "ipa": "/ˈroʊstɪd/",
        "ar": "محمص",
        "exampleEn": "The beans are roasted.",
        "exampleAr": "البن يُحمّص."
      },
      {
        "word": "ground",
        "ipa": "/ɡraʊnd/",
        "ar": "طحن / مطحون",
        "exampleEn": "Then they are ground.",
        "exampleAr": "بعدين يُطحن.",
        "note": "past of grind: grind → ground → ground"
      },
      {
        "word": "added",
        "ipa": "/ˈædɪd/",
        "ar": "مضاف",
        "exampleEn": "Cardamom is added.",
        "exampleAr": "يُضاف الهيل."
      },
      {
        "word": "served",
        "ipa": "/sɜːrvd/",
        "ar": "يُقدَّم",
        "exampleEn": "It's served with dates.",
        "exampleAr": "يُقدّم مع التمر."
      },
      {
        "word": "stolen",
        "ipa": "/ˈstoʊlən/",
        "ar": "مسروق",
        "exampleEn": "My bag was stolen.",
        "exampleAr": "شنطتي انسرقت."
      },
      {
        "word": "invented",
        "ipa": "/ɪnˈvɛntɪd/",
        "ar": "مخترع",
        "exampleEn": "The phone was invented in 1876.",
        "exampleAr": "الهاتف اختُرع عام ١٨٧٦."
      },
      {
        "word": "cardamom",
        "ipa": "/ˈkɑːrdəməm/",
        "ar": "هيل",
        "exampleEn": "Coffee with cardamom",
        "exampleAr": "قهوة بالهيل"
      }
    ],
    "grammarFocus": {
      "ruleAr": "be + التصريف الثالث. المضارع: is/are made. الماضي: was/were built. نضيف by + الفاعل فقط إذا كان مهماً.",
      "ruleEn": "be + past participle: is/are made (present), was/were built (past). Add 'by + agent' only when it matters.",
      "formula": "object + is/are/was/were + V3 (+ by ...)",
      "examples": [
        {
          "en": "Arabic coffee is made with cardamom.",
          "ar": "القهوة العربية تُسوّى بالهيل."
        },
        {
          "en": "The Masmak Fort was built in 1865.",
          "ar": "قصر المصمك بُني عام ١٨٦٥."
        },
        {
          "en": "Dates are grown in Al-Ahsa and Qassim.",
          "ar": "التمور تُزرع في الأحساء والقصيم."
        },
        {
          "en": "The thief was caught by the police.",
          "ar": "الحرامي انمسك من الشرطة."
        },
        {
          "en": "English is spoken all over the world.",
          "ar": "الإنجليزية يتكلمونها في كل العالم."
        },
        {
          "en": "My phone was stolen at the airport.",
          "ar": "جوالي انسرق في المطار."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "How is Saudi coffee made?",
        "ar": "كيف تُسوّى القهوة السعودية؟"
      },
      {
        "speaker": "Student",
        "en": "First, the beans are roasted lightly.",
        "ar": "أول شي، البن يُحمّص تحميص خفيف."
      },
      {
        "speaker": "Sara",
        "en": "And then?",
        "ar": "وبعدين؟"
      },
      {
        "speaker": "Student",
        "en": "They're ground and boiled in water. Then cardamom is added.",
        "ar": "يُطحن ويُغلى في الماي. وبعدين يُضاف الهيل."
      },
      {
        "speaker": "Sara",
        "en": "Is anything else added?",
        "ar": "يُضاف شي ثاني؟"
      },
      {
        "speaker": "Student",
        "en": "Sometimes saffron is added. It's usually served with dates.",
        "ar": "أحياناً زعفران. وعادة تُقدّم مع التمر."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: How is Saudi coffee made?\nStudent: First, the beans are roasted lightly.\nSara: And then?\nStudent: They're ground and boiled in water. Then cardamom is added.\nSara: Is anything else added?\nStudent: Sometimes saffron is added. It's usually served with dates.",
      "questions": [
        {
          "questionAr": "وش يصير للبن أول؟",
          "questionEn": "What happens to the beans first?",
          "options": [
            "they're ground",
            "they're roasted",
            "they're boiled"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: they're roasted"
        },
        {
          "questionAr": "وش يُضاف بعد الغلي؟",
          "questionEn": "What is added after boiling?",
          "options": [
            "sugar",
            "milk",
            "cardamom"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: cardamom"
        },
        {
          "questionAr": "تُقدّم مع؟",
          "questionEn": "What is coffee usually served with?",
          "options": [
            "dates",
            "cake",
            "bread"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: dates"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "-ed endings in passives: roasted /ɪd/, served /d/, added /ɪd/",
      "items": [
        "roasted /ˈroʊstɪd/",
        "served /sɜːrvd/",
        "built /bɪlt/"
      ],
      "tipAr": "تذكر: ed تنطق «إد» فقط بعد t و d (roasted, added)، وغيرها بدون مقطع زائد."
    },
    "exercises": {
      "easy": [
        {
          "id": "sg_128_e1",
          "type": "meaning",
          "promptEn": "What does \"built\" mean?",
          "promptAr": "ما معنى \"built\"؟",
          "options": [
            "مسروق",
            "مخترع",
            "هيل",
            "بنى / مبني"
          ],
          "correctIndex": 3,
          "answer": "بنى / مبني",
          "explanationAr": "\"built\" /bɪlt/ تعني: بنى / مبني. مثال: It was built in 1950."
        },
        {
          "id": "sg_128_e2",
          "type": "meaning",
          "promptEn": "What does \"made\" mean?",
          "promptAr": "ما معنى \"made\"؟",
          "options": [
            "يُقدَّم",
            "بنى / مبني",
            "مصنوع",
            "هيل"
          ],
          "correctIndex": 2,
          "answer": "مصنوع",
          "explanationAr": "\"made\" /meɪd/ تعني: مصنوع. مثال: It's made of gold."
        },
        {
          "id": "sg_128_e3",
          "type": "meaning",
          "promptEn": "What does \"grown\" mean?",
          "promptAr": "ما معنى \"grown\"؟",
          "options": [
            "مصنوع",
            "مزروع",
            "يُقدَّم",
            "مخترع"
          ],
          "correctIndex": 1,
          "answer": "مزروع",
          "explanationAr": "\"grown\" /ɡroʊn/ تعني: مزروع. مثال: Coffee is grown in Jazan."
        },
        {
          "id": "sg_128_e4",
          "type": "meaning",
          "promptEn": "What does \"roasted\" mean?",
          "promptAr": "ما معنى \"roasted\"؟",
          "options": [
            "محمص",
            "مزروع",
            "يُقدَّم",
            "مسروق"
          ],
          "correctIndex": 0,
          "answer": "محمص",
          "explanationAr": "\"roasted\" /ˈroʊstɪd/ تعني: محمص. مثال: The beans are roasted."
        }
      ],
      "medium": [
        {
          "id": "sg_128_m1",
          "type": "gap",
          "promptEn": "Complete: Arabic coffee ____ with cardamom.",
          "promptAr": "أكمل الفراغ: (القهوة العربية تُسوّى بالهيل.)",
          "options": [
            "is made",
            "is make",
            "makes"
          ],
          "correctIndex": 0,
          "answer": "Arabic coffee is made with cardamom.",
          "explanationAr": "الإجابة: is made. be + التصريف الثالث. المضارع: is/are made. الماضي: was/were built. نضيف by + الفاعل فقط إذا كان مهماً."
        },
        {
          "id": "sg_128_m2",
          "type": "gap",
          "promptEn": "Complete: The Masmak Fort ____ in 1865.",
          "promptAr": "أكمل الفراغ: (قصر المصمك بُني عام ١٨٦٥.)",
          "options": [
            "was built",
            "was build",
            "built"
          ],
          "correctIndex": 0,
          "answer": "The Masmak Fort was built in 1865.",
          "explanationAr": "الإجابة: was built. be + التصريف الثالث. المضارع: is/are made. الماضي: was/were built. نضيف by + الفاعل فقط إذا كان مهماً."
        },
        {
          "id": "sg_128_m3",
          "type": "gap",
          "promptEn": "Complete: Dates ____ in Al-Ahsa and Qassim.",
          "promptAr": "أكمل الفراغ: (التمور تُزرع في الأحساء والقصيم.)",
          "options": [
            "are grown",
            "grow",
            "is grown"
          ],
          "correctIndex": 0,
          "answer": "Dates are grown in Al-Ahsa and Qassim.",
          "explanationAr": "الإجابة: are grown. be + التصريف الثالث. المضارع: is/are made. الماضي: was/were built. نضيف by + الفاعل فقط إذا كان مهماً."
        },
        {
          "id": "sg_128_m4",
          "type": "gap",
          "promptEn": "Complete: The thief was caught ____ the police.",
          "promptAr": "أكمل الفراغ: (الحرامي انمسك من الشرطة.)",
          "options": [
            "from",
            "by",
            "with"
          ],
          "correctIndex": 1,
          "answer": "The thief was caught by the police.",
          "explanationAr": "الإجابة: by. be + التصريف الثالث. المضارع: is/are made. الماضي: was/were built. نضيف by + الفاعل فقط إذا كان مهماً."
        }
      ],
      "hard": [
        {
          "id": "sg_128_h1",
          "type": "order",
          "promptEn": "Put the words in order: all / world. / the / English / is / over / spoken",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (الإنجليزية يتكلمونها في كل العالم.)",
          "answer": "English is spoken all over the world.",
          "explanationAr": "الترتيب الصحيح: English is spoken all over the world."
        },
        {
          "id": "sg_128_h2",
          "type": "order",
          "promptEn": "Put the words in order: the / stolen / My / airport. / at / was / phone",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (جوالي انسرق في المطار.)",
          "answer": "My phone was stolen at the airport.",
          "explanationAr": "الترتيب الصحيح: My phone was stolen at the airport."
        },
        {
          "id": "sg_128_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: قصر المصمك بُني عام ١٨٦٥.",
          "answer": "The Masmak Fort was built in 1865.",
          "explanationAr": "ترجمة مقترحة: The Masmak Fort was built in 1865."
        },
        {
          "id": "sg_128_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: الحرامي انمسك من الشرطة.",
          "answer": "The thief was caught by the police.",
          "explanationAr": "ترجمة مقترحة: The thief was caught by the police."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "This mosque built in 1950.",
        "correct": "This mosque was built in 1950.",
        "whyAr": "بدون was تصير الجملة كأن المسجد هو اللي بنى."
      },
      {
        "incorrect": "The window broke by the ball.",
        "correct": "The window was broken by the ball.",
        "whyAr": "المجهول يحتاج be + V3."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (أسماء الوصل: who / which / that / where): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "The car which/that I bought...",
          "The car who I bought..."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: The car which/that I bought... — who للأشخاص فقط.",
        "fromLessonId": "sg_127"
      },
      {
        "questionAr": "مراجعة (Used to: عادات الماضي): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I used to play football.",
          "I use to play football."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I used to play football. — في الإيجاب used بـ d.",
        "fromLessonId": "sg_125"
      },
      {
        "questionAr": "مراجعة (المضارع التام والماضي البسيط: just / already / yet): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I finished it yesterday.",
          "I have finished it yesterday."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I finished it yesterday. — yesterday ⇐ ماضي بسيط.",
        "fromLessonId": "sg_122"
      },
      {
        "questionAr": "ما معنى \"luckily\"؟",
        "questionEn": "What does \"luckily\" mean?",
        "options": [
          "لحسن الحظ",
          "يحدث",
          "يرن",
          "حادث"
        ],
        "correctIndex": 0,
        "explanationAr": "\"luckily\" /ˈlʌkɪli/ تعني: لحسن الحظ. مثال: Luckily, nobody was hurt.",
        "fromLessonId": "sg_126"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (التمور تُزرع في الأحساء والقصيم.)",
          "questionEn": "Complete: Dates ____ in Al-Ahsa and Qassim.",
          "options": [
            "are grown",
            "grow",
            "is grown"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: are grown. be + التصريف الثالث. المضارع: is/are made. الماضي: was/were built. نضيف by + الفاعل فقط إذا كان مهماً."
        },
        {
          "questionAr": "أكمل الفراغ: (الحرامي انمسك من الشرطة.)",
          "questionEn": "Complete: The thief was caught ____ the police.",
          "options": [
            "from",
            "by",
            "with"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: by. be + التصريف الثالث. المضارع: is/are made. الماضي: was/were built. نضيف by + الفاعل فقط إذا كان مهماً."
        },
        {
          "questionAr": "ما معنى \"ground\"؟",
          "questionEn": "What does \"ground\" mean?",
          "options": [
            "طحن / مطحون",
            "بنى / مبني",
            "مزروع",
            "مسروق"
          ],
          "correctIndex": 0,
          "explanationAr": "\"ground\" /ɡraʊnd/ تعني: طحن / مطحون. مثال: Then they are ground."
        },
        {
          "questionAr": "ما معنى \"added\"؟",
          "questionEn": "What does \"added\" mean?",
          "options": [
            "مضاف",
            "طحن / مطحون",
            "مسروق",
            "محمص"
          ],
          "correctIndex": 0,
          "explanationAr": "\"added\" /ˈædɪd/ تعني: مضاف. مثال: Cardamom is added."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "This mosque was built in 1950.",
            "This mosque built in 1950."
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: This mosque was built in 1950. — بدون was تصير الجملة كأن المسجد هو اللي بنى."
        }
      ]
    }
  },
  {
    "id": "sg_129",
    "pillarId": "grammar",
    "pillarNameAr": "القواعد التحدثية السريعة",
    "pillarNameEn": "Spoken Grammar & Fast Patterns",
    "pillarIcon": "🧠",
    "level": "متقدم (Advanced)",
    "levelCode": "B1-B2",
    "titleAr": "الكلام المنقول: He said that...",
    "titleEn": "Reported Speech: He Said That...",
    "descAr": "انقل كلام غيرك بدقة: قال إنه...، سألني إذا...",
    "descEn": "Report what others said and asked.",
    "speakingGoalAr": "انقل لسارة محادثة صارت بينك وبين شخص.",
    "speakingGoalEn": "Report a conversation you had with someone.",
    "keyPattern": {
      "ruleAr": "بعد said/told يرجع الزمن خطوة للوراء غالباً: am→was، will→would، can→could، الماضي→past perfect. told يحتاج مفعولاً (told me). الأسئلة: asked if/where + ترتيب جملة خبرية.",
      "ruleEn": "After said/told, tenses usually shift back: am→was, will→would, can→could. 'told' needs an object. Reported questions use if/wh- + statement word order.",
      "formula": "He said (that) + backshifted clause | She told me + clause | He asked if/where + subject + verb"
    },
    "practicalExamples": [
      {
        "en": "He said that he was tired.",
        "ar": "قال إنه تعبان."
      },
      {
        "en": "She told me she would call later.",
        "ar": "قالت لي إنها بتتصل بعدين."
      },
      {
        "en": "My boss asked if I could work on Saturday.",
        "ar": "مديري سألني إذا أقدر أداوم السبت."
      },
      {
        "en": "They asked where I lived.",
        "ar": "سألوني وين أسكن."
      },
      {
        "en": "The doctor said I should rest.",
        "ar": "الدكتور قال لازم أرتاح."
      },
      {
        "en": "He told us not to be late.",
        "ar": "قال لنا لا تتأخرون."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "She said me that she was busy.",
        "correct": "She told me that she was busy.",
        "whyAr": "said لا تأخذ مفعولاً مباشرة؛ told me."
      },
      {
        "incorrect": "He asked me where did I work.",
        "correct": "He asked me where I worked.",
        "whyAr": "في السؤال المنقول ترتيب جملة عادية."
      },
      {
        "incorrect": "He said he will come.",
        "correct": "He said he would come.",
        "whyAr": "will ⇐ would بعد said (في الغالب)."
      }
    ],
    "speakingChallenge": {
      "promptAr": "انقل لسارة محادثة مهمة صارت معك هالأسبوع.",
      "promptEn": "Report an important conversation from this week.",
      "saraQuestionAr": "مين كلمك هالأسبوع؟ وش قال؟",
      "saraQuestionEn": "Who spoke to you this week? What did they say?",
      "recommendedResponseEn": "My teacher told me that my essay was excellent. She asked if I wanted to join the debate club. I said I would think about it."
    },
    "quiz": [
      {
        "questionAr": "انقل: \"I'm hungry,\" she said.",
        "questionEn": "Report: 'I'm hungry,' she said.",
        "options": [
          "She said she is hungry.",
          "She said she was hungry.",
          "She said I was hungry."
        ],
        "correctIndex": 1,
        "explanationAr": "am ⇐ was، و I ⇐ she."
      },
      {
        "questionAr": "انقل: \"Where do you live?\" he asked.",
        "questionEn": "Report: 'Where do you live?'",
        "options": [
          "He asked where did I live.",
          "He asked where I lived.",
          "He asked where do I live."
        ],
        "correctIndex": 1,
        "explanationAr": "ترتيب خبري + إرجاع الزمن."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "She told me that she was busy.",
          "She said me that she was busy."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: She told me that she was busy. — said لا تأخذ مفعولاً مباشرة؛ told me."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "He asked me where did I work.",
          "He asked me where I worked."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: He asked me where I worked. — في السؤال المنقول ترتيب جملة عادية."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "He said he will come.",
          "He said he would come."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: He said he would come. — will ⇐ would بعد said (في الغالب)."
      }
    ],
    "whiteboardNotes": {
      "title": "Reported Speech: He Said That...",
      "pointsAr": [
        "ينقل جملاً خبرية مع إرجاع الزمن.",
        "يفرق بين say و tell.",
        "ينقل الأسئلة بترتيب صحيح.",
        "بعد said/told يرجع الزمن خطوة للوراء غالباً: am→was، will→would، can→could، الماضي→past perfect. told يحتاج مفعولاً (told me). الأسئلة: asked if/where + ترتيب جملة خبرية."
      ],
      "pointsEn": [
        "Report statements with backshift.",
        "Use say vs tell correctly.",
        "Report questions with correct word order.",
        "After said/told, tenses usually shift back: am→was, will→would, can→could. 'told' needs an object. Reported questions use if/wh- + statement word order."
      ],
      "chalkHighlight": "He said (that) + backshifted clause | She told me + clause | He asked if/where + subject + verb"
    },
    "unit": 6,
    "cefr": "B2",
    "objectivesAr": [
      "ينقل جملاً خبرية مع إرجاع الزمن.",
      "يفرق بين say و tell.",
      "ينقل الأسئلة بترتيب صحيح."
    ],
    "objectivesEn": [
      "Report statements with backshift.",
      "Use say vs tell correctly.",
      "Report questions with correct word order."
    ],
    "vocabulary": [
      {
        "word": "said",
        "ipa": "/sɛd/",
        "ar": "قال",
        "exampleEn": "He said it was late.",
        "exampleAr": "قال إن الوقت متأخر."
      },
      {
        "word": "told",
        "ipa": "/toʊld/",
        "ar": "قال لـ/أخبر",
        "exampleEn": "She told me the news.",
        "exampleAr": "قالت لي الخبر."
      },
      {
        "word": "asked",
        "ipa": "/æskt/",
        "ar": "سأل",
        "exampleEn": "He asked if I was OK.",
        "exampleAr": "سألني إذا أنا بخير."
      },
      {
        "word": "explained",
        "ipa": "/ɪkˈspleɪnd/",
        "ar": "شرح",
        "exampleEn": "She explained that...",
        "exampleAr": "شرحت إن..."
      },
      {
        "word": "promised",
        "ipa": "/ˈprɑːmɪst/",
        "ar": "وعد",
        "exampleEn": "He promised to help.",
        "exampleAr": "وعد يساعد."
      },
      {
        "word": "warned",
        "ipa": "/wɔːrnd/",
        "ar": "حذّر",
        "exampleEn": "They warned us about the storm.",
        "exampleAr": "حذرونا من العاصفة."
      },
      {
        "word": "boss",
        "ipa": "/bɔːs/",
        "ar": "مدير",
        "exampleEn": "My boss said yes.",
        "exampleAr": "مديري وافق."
      },
      {
        "word": "message",
        "ipa": "/ˈmɛsɪdʒ/",
        "ar": "رسالة",
        "exampleEn": "He left a message.",
        "exampleAr": "ترك رسالة."
      },
      {
        "word": "later",
        "ipa": "/ˈleɪtər/",
        "ar": "بعدين",
        "exampleEn": "I'll call later.",
        "exampleAr": "بتصل بعدين."
      },
      {
        "word": "whether",
        "ipa": "/ˈwɛðər/",
        "ar": "إذا/ما إذا",
        "exampleEn": "She asked whether I was ready.",
        "exampleAr": "سألت إذا كنت جاهز."
      }
    ],
    "grammarFocus": {
      "ruleAr": "بعد said/told يرجع الزمن خطوة للوراء غالباً: am→was، will→would، can→could، الماضي→past perfect. told يحتاج مفعولاً (told me). الأسئلة: asked if/where + ترتيب جملة خبرية.",
      "ruleEn": "After said/told, tenses usually shift back: am→was, will→would, can→could. 'told' needs an object. Reported questions use if/wh- + statement word order.",
      "formula": "He said (that) + backshifted clause | She told me + clause | He asked if/where + subject + verb",
      "examples": [
        {
          "en": "He said that he was tired.",
          "ar": "قال إنه تعبان."
        },
        {
          "en": "She told me she would call later.",
          "ar": "قالت لي إنها بتتصل بعدين."
        },
        {
          "en": "My boss asked if I could work on Saturday.",
          "ar": "مديري سألني إذا أقدر أداوم السبت."
        },
        {
          "en": "They asked where I lived.",
          "ar": "سألوني وين أسكن."
        },
        {
          "en": "The doctor said I should rest.",
          "ar": "الدكتور قال لازم أرتاح."
        },
        {
          "en": "He told us not to be late.",
          "ar": "قال لنا لا تتأخرون."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Did you talk to the manager about your holiday?",
        "ar": "كلمت المدير عن إجازتك؟"
      },
      {
        "speaker": "Student",
        "en": "Yes. He said that I could take a week in March.",
        "ar": "إيه. قال إني أقدر آخذ أسبوع في مارس."
      },
      {
        "speaker": "Sara",
        "en": "Great! Did he ask anything?",
        "ar": "حلو! سألك شي؟"
      },
      {
        "speaker": "Student",
        "en": "He asked who would do my work while I was away.",
        "ar": "سألني مين بيسوي شغلي وأنا غايب."
      },
      {
        "speaker": "Sara",
        "en": "What did you tell him?",
        "ar": "وش قلت له؟"
      },
      {
        "speaker": "Student",
        "en": "I told him that my colleague Majed had agreed to help.",
        "ar": "قلت له إن زميلي ماجد وافق يساعد."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Did you talk to the manager about your holiday?\nStudent: Yes. He said that I could take a week in March.\nSara: Great! Did he ask anything?\nStudent: He asked who would do my work while I was away.\nSara: What did you tell him?\nStudent: I told him that my colleague Majed had agreed to help.",
      "questions": [
        {
          "questionAr": "متى الإجازة؟",
          "questionEn": "When can the student take his holiday?",
          "options": [
            "in March",
            "in May",
            "in summer"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: in March"
        },
        {
          "questionAr": "وش سأل المدير؟",
          "questionEn": "What did the manager ask?",
          "options": [
            "where he would go",
            "who would do his work",
            "why he needs a holiday"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: who would do his work"
        },
        {
          "questionAr": "مين وافق يساعد؟",
          "questionEn": "Who agreed to help?",
          "options": [
            "Sara",
            "Majed",
            "the manager"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: Majed"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "said /sɛd/ — not 'saied'",
      "items": [
        "said /sɛd/",
        "says /sɛz/",
        "asked /æskt/ (one syllable)"
      ],
      "tipAr": "said تنطق «سِد» قصيرة. و asked مقطع واحد «آسكت»، ما نقول «آسكِد»."
    },
    "exercises": {
      "easy": [
        {
          "id": "sg_129_e1",
          "type": "meaning",
          "promptEn": "What does \"said\" mean?",
          "promptAr": "ما معنى \"said\"؟",
          "options": [
            "قال لـ/أخبر",
            "بعدين",
            "مدير",
            "قال"
          ],
          "correctIndex": 3,
          "answer": "قال",
          "explanationAr": "\"said\" /sɛd/ تعني: قال. مثال: He said it was late."
        },
        {
          "id": "sg_129_e2",
          "type": "meaning",
          "promptEn": "What does \"told\" mean?",
          "promptAr": "ما معنى \"told\"؟",
          "options": [
            "قال",
            "مدير",
            "قال لـ/أخبر",
            "حذّر"
          ],
          "correctIndex": 2,
          "answer": "قال لـ/أخبر",
          "explanationAr": "\"told\" /toʊld/ تعني: قال لـ/أخبر. مثال: She told me the news."
        },
        {
          "id": "sg_129_e3",
          "type": "meaning",
          "promptEn": "What does \"asked\" mean?",
          "promptAr": "ما معنى \"asked\"؟",
          "options": [
            "مدير",
            "سأل",
            "قال لـ/أخبر",
            "شرح"
          ],
          "correctIndex": 1,
          "answer": "سأل",
          "explanationAr": "\"asked\" /æskt/ تعني: سأل. مثال: He asked if I was OK."
        },
        {
          "id": "sg_129_e4",
          "type": "meaning",
          "promptEn": "What does \"explained\" mean?",
          "promptAr": "ما معنى \"explained\"؟",
          "options": [
            "بعدين",
            "شرح",
            "إذا/ما إذا",
            "سأل"
          ],
          "correctIndex": 1,
          "answer": "شرح",
          "explanationAr": "\"explained\" /ɪkˈspleɪnd/ تعني: شرح. مثال: She explained that..."
        }
      ],
      "medium": [
        {
          "id": "sg_129_m1",
          "type": "gap",
          "promptEn": "Complete: He said that he ____ tired.",
          "promptAr": "أكمل الفراغ: (قال إنه تعبان.)",
          "options": [
            "were",
            "was",
            "is"
          ],
          "correctIndex": 1,
          "answer": "He said that he was tired.",
          "explanationAr": "الإجابة: was. بعد said/told يرجع الزمن خطوة للوراء غالباً: am→was، will→would، can→could، الماضي→past perfect. told يحتاج مفعولاً (told me). الأسئلة: asked if/where + ترتيب جملة خبرية."
        },
        {
          "id": "sg_129_m2",
          "type": "gap",
          "promptEn": "Complete: She ____ she would call later.",
          "promptAr": "أكمل الفراغ: (قالت لي إنها بتتصل بعدين.)",
          "options": [
            "told me",
            "told to me",
            "said me"
          ],
          "correctIndex": 0,
          "answer": "She told me she would call later.",
          "explanationAr": "الإجابة: told me. بعد said/told يرجع الزمن خطوة للوراء غالباً: am→was، will→would، can→could، الماضي→past perfect. told يحتاج مفعولاً (told me). الأسئلة: asked if/where + ترتيب جملة خبرية."
        },
        {
          "id": "sg_129_m3",
          "type": "gap",
          "promptEn": "Complete: My boss asked ____ work on Saturday.",
          "promptAr": "أكمل الفراغ: (مديري سألني إذا أقدر أداوم السبت.)",
          "options": [
            "if I could",
            "could I",
            "if can I"
          ],
          "correctIndex": 0,
          "answer": "My boss asked if I could work on Saturday.",
          "explanationAr": "الإجابة: if I could. بعد said/told يرجع الزمن خطوة للوراء غالباً: am→was، will→would، can→could، الماضي→past perfect. told يحتاج مفعولاً (told me). الأسئلة: asked if/where + ترتيب جملة خبرية."
        },
        {
          "id": "sg_129_m4",
          "type": "gap",
          "promptEn": "Complete: They asked ____.",
          "promptAr": "أكمل الفراغ: (سألوني وين أسكن.)",
          "options": [
            "where do I live",
            "where did I live",
            "where I lived"
          ],
          "correctIndex": 2,
          "answer": "They asked where I lived.",
          "explanationAr": "الإجابة: where I lived. بعد said/told يرجع الزمن خطوة للوراء غالباً: am→was، will→would، can→could، الماضي→past perfect. told يحتاج مفعولاً (told me). الأسئلة: asked if/where + ترتيب جملة خبرية."
        }
      ],
      "hard": [
        {
          "id": "sg_129_h1",
          "type": "order",
          "promptEn": "Put the words in order: rest. / I / The / said / doctor / should",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (الدكتور قال لازم أرتاح.)",
          "answer": "The doctor said I should rest.",
          "explanationAr": "الترتيب الصحيح: The doctor said I should rest."
        },
        {
          "id": "sg_129_h2",
          "type": "order",
          "promptEn": "Put the words in order: us / not / late. / told / He / be / to",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (قال لنا لا تتأخرون.)",
          "answer": "He told us not to be late.",
          "explanationAr": "الترتيب الصحيح: He told us not to be late."
        },
        {
          "id": "sg_129_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: قالت لي إنها بتتصل بعدين.",
          "answer": "She told me she would call later.",
          "explanationAr": "ترجمة مقترحة: She told me she would call later."
        },
        {
          "id": "sg_129_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: سألوني وين أسكن.",
          "answer": "They asked where I lived.",
          "explanationAr": "ترجمة مقترحة: They asked where I lived."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "He told that he is coming.",
        "correct": "He said that he was coming.",
        "whyAr": "told يحتاج شخصاً بعده؛ واستخدم said بدون مفعول."
      },
      {
        "incorrect": "She asked me do you like it.",
        "correct": "She asked me if I liked it.",
        "whyAr": "الترجمة الحرفية تنقل السؤال كما هو."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (المبني للمجهول: is made / was built): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Coffee is made with cardamom.",
          "Coffee is make with cardamom."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Coffee is made with cardamom. — made وليس make.",
        "fromLessonId": "sg_128"
      },
      {
        "questionAr": "مراجعة (الماضي المستمر: كنت أسوق لما...): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I drove when my phone was ringing.",
          "I was driving when my phone rang."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I was driving when my phone rang. — الحدث الطويل مستمر، والقصير بسيط.",
        "fromLessonId": "sg_126"
      },
      {
        "questionAr": "مراجعة (Should / Must / Have to: النصيحة والإلزام): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "You should to sleep early.",
          "You should sleep early."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: You should sleep early. — لا to بعد should.",
        "fromLessonId": "sg_123"
      },
      {
        "questionAr": "ما معنى \"app\"؟",
        "questionEn": "What does \"app\" mean?",
        "options": [
          "الجيران/جنبنا",
          "ميكانيكي",
          "يصلح",
          "تطبيق"
        ],
        "correctIndex": 3,
        "explanationAr": "\"app\" /æp/ تعني: تطبيق. مثال: an app which helps you learn",
        "fromLessonId": "sg_127"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (مديري سألني إذا أقدر أداوم السبت.)",
          "questionEn": "Complete: My boss asked ____ work on Saturday.",
          "options": [
            "if I could",
            "could I",
            "if can I"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: if I could. بعد said/told يرجع الزمن خطوة للوراء غالباً: am→was، will→would، can→could، الماضي→past perfect. told يحتاج مفعولاً (told me). الأسئلة: asked if/where + ترتيب جملة خبرية."
        },
        {
          "questionAr": "أكمل الفراغ: (سألوني وين أسكن.)",
          "questionEn": "Complete: They asked ____.",
          "options": [
            "where do I live",
            "where did I live",
            "where I lived"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: where I lived. بعد said/told يرجع الزمن خطوة للوراء غالباً: am→was، will→would، can→could، الماضي→past perfect. told يحتاج مفعولاً (told me). الأسئلة: asked if/where + ترتيب جملة خبرية."
        },
        {
          "questionAr": "ما معنى \"promised\"؟",
          "questionEn": "What does \"promised\" mean?",
          "options": [
            "وعد",
            "مدير",
            "شرح",
            "إذا/ما إذا"
          ],
          "correctIndex": 0,
          "explanationAr": "\"promised\" /ˈprɑːmɪst/ تعني: وعد. مثال: He promised to help."
        },
        {
          "questionAr": "ما معنى \"warned\"؟",
          "questionEn": "What does \"warned\" mean?",
          "options": [
            "قال لـ/أخبر",
            "رسالة",
            "مدير",
            "حذّر"
          ],
          "correctIndex": 3,
          "explanationAr": "\"warned\" /wɔːrnd/ تعني: حذّر. مثال: They warned us about the storm."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "He told that he is coming.",
            "He said that he was coming."
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: He said that he was coming. — told يحتاج شخصاً بعده؛ واستخدم said بدون مفعول."
        }
      ]
    }
  },
  {
    "id": "sg_130",
    "pillarId": "grammar",
    "pillarNameAr": "القواعد التحدثية السريعة",
    "pillarNameEn": "Spoken Grammar & Fast Patterns",
    "pillarIcon": "🧠",
    "level": "متقدم (Advanced)",
    "levelCode": "B1-B2",
    "titleAr": "الشرط الثاني و wish: الخيال والأمنيات",
    "titleEn": "Second Conditional & Wish: Imagination and Regret",
    "descAr": "تخيّل مواقف غير واقعية (If I were you...) وعبّر عن أمنياتك (I wish I had...).",
    "descEn": "Imagine unreal situations (If I were you...) and express wishes (I wish I had...).",
    "speakingGoalAr": "أعط نصيحتين بـ If I were you وعبّر عن ثلاث أمنيات.",
    "speakingGoalEn": "Give two 'If I were you' tips and express three wishes.",
    "keyPattern": {
      "ruleAr": "الشرط الثاني: If + ماضي بسيط، would + فعل أصلي لموقف غير واقعي الآن. نقول If I were (ليس was) في الأسلوب الصحيح. wish + ماضي = أتمنى لو الوضع الحالي مختلف.",
      "ruleEn": "Second conditional: If + past simple, would + base verb (unreal present/future). Prefer 'If I were'. wish + past simple = regret about the present.",
      "formula": "If + past, would + verb | If I were you, I'd... | I wish + past simple"
    },
    "practicalExamples": [
      {
        "en": "If I had a million riyals, I would build a school.",
        "ar": "لو عندي مليون ريال، كان بنيت مدرسة."
      },
      {
        "en": "If I were you, I'd apologize.",
        "ar": "لو كنت مكانك كان اعتذرت."
      },
      {
        "en": "I wish I spoke English fluently.",
        "ar": "أتمنى لو أتكلم إنجليزي بطلاقة."
      },
      {
        "en": "What would you do if you lost your passport?",
        "ar": "وش بتسوي لو ضاع جوازك؟"
      },
      {
        "en": "I wish I lived closer to my parents.",
        "ar": "أتمنى لو ساكن أقرب لأهلي."
      },
      {
        "en": "If it weren't so hot, we'd walk.",
        "ar": "لو ما كان الجو حار مرة، كان مشينا."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "If I would have money, I would travel.",
        "correct": "If I had money, I would travel.",
        "whyAr": "لا would بعد if."
      },
      {
        "incorrect": "If I am you, I'll study.",
        "correct": "If I were you, I'd study.",
        "whyAr": "النصيحة الخيالية ⇐ were + would."
      },
      {
        "incorrect": "I wish I can fly.",
        "correct": "I wish I could fly.",
        "whyAr": "بعد wish نرجع للماضي: could."
      }
    ],
    "speakingChallenge": {
      "promptAr": "أجب سارة: لو كنت وزير التعليم يوم واحد؟",
      "promptEn": "Answer Sara: if you were Minister of Education for a day?",
      "saraQuestionAr": "لو كنت وزير التعليم يوم واحد، وش بتغير؟",
      "saraQuestionEn": "If you were Minister of Education for one day, what would you change?",
      "recommendedResponseEn": "If I were the minister, I'd make English classes more practical. I'd give students more sports time. I wish schools started later in the morning."
    },
    "quiz": [
      {
        "questionAr": "أكمل: If I ___ rich, I'd travel the world.",
        "questionEn": "Complete: If I ___ rich, I'd travel the world.",
        "options": [
          "am",
          "were",
          "will be"
        ],
        "correctIndex": 1,
        "explanationAr": "شرط ثاني ⇐ were."
      },
      {
        "questionAr": "أكمل: I wish I ___ swim.",
        "questionEn": "Complete: I wish I ___ swim.",
        "options": [
          "can",
          "could",
          "will"
        ],
        "correctIndex": 1,
        "explanationAr": "wish + could."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "If I would have money, I would travel.",
          "If I had money, I would travel."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: If I had money, I would travel. — لا would بعد if."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "If I am you, I'll study.",
          "If I were you, I'd study."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: If I were you, I'd study. — النصيحة الخيالية ⇐ were + would."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I wish I could fly.",
          "I wish I can fly."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I wish I could fly. — بعد wish نرجع للماضي: could."
      }
    ],
    "whiteboardNotes": {
      "title": "Second Conditional & Wish: Imagination and Regret",
      "pointsAr": [
        "يكوّن الشرط الثاني للخيال.",
        "ينصح بـ If I were you.",
        "يعبر عن أمنية بـ wish + ماضي.",
        "الشرط الثاني: If + ماضي بسيط، would + فعل أصلي لموقف غير واقعي الآن. نقول If I were (ليس was) في الأسلوب الصحيح. wish + ماضي = أتمنى لو الوضع الحالي مختلف."
      ],
      "pointsEn": [
        "Form the second conditional.",
        "Advise with 'If I were you'.",
        "Express wishes with wish + past.",
        "Second conditional: If + past simple, would + base verb (unreal present/future). Prefer 'If I were'. wish + past simple = regret about the present."
      ],
      "chalkHighlight": "If + past, would + verb | If I were you, I'd... | I wish + past simple"
    },
    "unit": 6,
    "cefr": "B2",
    "objectivesAr": [
      "يكوّن الشرط الثاني للخيال.",
      "ينصح بـ If I were you.",
      "يعبر عن أمنية بـ wish + ماضي."
    ],
    "objectivesEn": [
      "Form the second conditional.",
      "Advise with 'If I were you'.",
      "Express wishes with wish + past."
    ],
    "vocabulary": [
      {
        "word": "would",
        "ipa": "/wʊd/",
        "ar": "كان سـ (افتراض)",
        "exampleEn": "I would help you.",
        "exampleAr": "كان ساعدتك."
      },
      {
        "word": "wish",
        "ipa": "/wɪʃ/",
        "ar": "يتمنى",
        "exampleEn": "I wish I knew.",
        "exampleAr": "ليتني أعرف."
      },
      {
        "word": "fluently",
        "ipa": "/ˈfluːəntli/",
        "ar": "بطلاقة",
        "exampleEn": "She speaks fluently.",
        "exampleAr": "تتكلم بطلاقة."
      },
      {
        "word": "apologize",
        "ipa": "/əˈpɑːlədʒaɪz/",
        "ar": "يعتذر",
        "exampleEn": "You should apologize.",
        "exampleAr": "المفروض تعتذر."
      },
      {
        "word": "passport",
        "ipa": "/ˈpæspɔːrt/",
        "ar": "جواز سفر",
        "exampleEn": "I lost my passport.",
        "exampleAr": "ضيعت جوازي."
      },
      {
        "word": "million",
        "ipa": "/ˈmɪljən/",
        "ar": "مليون",
        "exampleEn": "a million riyals",
        "exampleAr": "مليون ريال"
      },
      {
        "word": "charity",
        "ipa": "/ˈtʃærəti/",
        "ar": "جمعية خيرية/صدقة",
        "exampleEn": "I'd give money to charity.",
        "exampleAr": "كان تبرعت."
      },
      {
        "word": "imagine",
        "ipa": "/ɪˈmædʒɪn/",
        "ar": "يتخيل",
        "exampleEn": "Imagine you were rich.",
        "exampleAr": "تخيل إنك غني."
      },
      {
        "word": "regret",
        "ipa": "/rɪˈɡrɛt/",
        "ar": "يندم",
        "exampleEn": "I regret it.",
        "exampleAr": "ندمان عليه."
      },
      {
        "word": "closer",
        "ipa": "/ˈkloʊsər/",
        "ar": "أقرب",
        "exampleEn": "I wish I lived closer.",
        "exampleAr": "ليتني ساكن أقرب."
      }
    ],
    "grammarFocus": {
      "ruleAr": "الشرط الثاني: If + ماضي بسيط، would + فعل أصلي لموقف غير واقعي الآن. نقول If I were (ليس was) في الأسلوب الصحيح. wish + ماضي = أتمنى لو الوضع الحالي مختلف.",
      "ruleEn": "Second conditional: If + past simple, would + base verb (unreal present/future). Prefer 'If I were'. wish + past simple = regret about the present.",
      "formula": "If + past, would + verb | If I were you, I'd... | I wish + past simple",
      "examples": [
        {
          "en": "If I had a million riyals, I would build a school.",
          "ar": "لو عندي مليون ريال، كان بنيت مدرسة."
        },
        {
          "en": "If I were you, I'd apologize.",
          "ar": "لو كنت مكانك كان اعتذرت."
        },
        {
          "en": "I wish I spoke English fluently.",
          "ar": "أتمنى لو أتكلم إنجليزي بطلاقة."
        },
        {
          "en": "What would you do if you lost your passport?",
          "ar": "وش بتسوي لو ضاع جوازك؟"
        },
        {
          "en": "I wish I lived closer to my parents.",
          "ar": "أتمنى لو ساكن أقرب لأهلي."
        },
        {
          "en": "If it weren't so hot, we'd walk.",
          "ar": "لو ما كان الجو حار مرة، كان مشينا."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "What would you do if you won the lottery? Just imagine!",
        "ar": "وش بتسوي لو فزت بجائزة كبيرة؟ تخيل بس!"
      },
      {
        "speaker": "Student",
        "en": "If I won a lot of money, I'd build a mosque in my village.",
        "ar": "لو فزت بفلوس كثير، كان بنيت مسجد في قريتي."
      },
      {
        "speaker": "Sara",
        "en": "That's lovely. Anything for yourself?",
        "ar": "حلو. وشي لنفسك؟"
      },
      {
        "speaker": "Student",
        "en": "I'd take my parents to Umrah. I wish I had more time with them.",
        "ar": "كان وديت أهلي عمرة. أتمنى لو عندي وقت أكثر معهم."
      },
      {
        "speaker": "Sara",
        "en": "If I were you, I'd visit them every weekend.",
        "ar": "لو كنت مكانك كان زرتهم كل ويكند."
      },
      {
        "speaker": "Student",
        "en": "You're right. I wish I didn't work on Saturdays.",
        "ar": "صدقتي. ليتني ما أداوم السبت."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: What would you do if you won the lottery? Just imagine!\nStudent: If I won a lot of money, I'd build a mosque in my village.\nSara: That's lovely. Anything for yourself?\nStudent: I'd take my parents to Umrah. I wish I had more time with them.\nSara: If I were you, I'd visit them every weekend.\nStudent: You're right. I wish I didn't work on Saturdays.",
      "questions": [
        {
          "questionAr": "وش بيبني؟",
          "questionEn": "What would the student build?",
          "options": [
            "a school",
            "a mosque",
            "a hospital"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: a mosque"
        },
        {
          "questionAr": "مين بياخذ للعمرة؟",
          "questionEn": "Who would he take to Umrah?",
          "options": [
            "his friends",
            "his parents",
            "his children"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: his parents"
        },
        {
          "questionAr": "وش يتمنى؟",
          "questionEn": "What does he wish?",
          "options": [
            "that he didn't work on Saturdays",
            "that he was rich",
            "that he lived abroad"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: that he didn't work on Saturdays"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Contraction I'd /aɪd/ and weak would /wəd/",
      "items": [
        "I'd go /aɪd ɡoʊ/",
        "would you /ˈwʊdʒə/",
        "If I were /ɪf aɪ wɜːr/"
      ],
      "tipAr": "I'd قصيرة «آيد». و would you تصير «وُدجا» في الكلام السريع."
    },
    "exercises": {
      "easy": [
        {
          "id": "sg_130_e1",
          "type": "meaning",
          "promptEn": "What does \"would\" mean?",
          "promptAr": "ما معنى \"would\"؟",
          "options": [
            "كان سـ (افتراض)",
            "جمعية خيرية/صدقة",
            "جواز سفر",
            "يندم"
          ],
          "correctIndex": 0,
          "answer": "كان سـ (افتراض)",
          "explanationAr": "\"would\" /wʊd/ تعني: كان سـ (افتراض). مثال: I would help you."
        },
        {
          "id": "sg_130_e2",
          "type": "meaning",
          "promptEn": "What does \"wish\" mean?",
          "promptAr": "ما معنى \"wish\"؟",
          "options": [
            "كان سـ (افتراض)",
            "جواز سفر",
            "يعتذر",
            "يتمنى"
          ],
          "correctIndex": 3,
          "answer": "يتمنى",
          "explanationAr": "\"wish\" /wɪʃ/ تعني: يتمنى. مثال: I wish I knew."
        },
        {
          "id": "sg_130_e3",
          "type": "meaning",
          "promptEn": "What does \"fluently\" mean?",
          "promptAr": "ما معنى \"fluently\"؟",
          "options": [
            "مليون",
            "بطلاقة",
            "جواز سفر",
            "يتخيل"
          ],
          "correctIndex": 1,
          "answer": "بطلاقة",
          "explanationAr": "\"fluently\" /ˈfluːəntli/ تعني: بطلاقة. مثال: She speaks fluently."
        },
        {
          "id": "sg_130_e4",
          "type": "meaning",
          "promptEn": "What does \"apologize\" mean?",
          "promptAr": "ما معنى \"apologize\"؟",
          "options": [
            "كان سـ (افتراض)",
            "بطلاقة",
            "جمعية خيرية/صدقة",
            "يعتذر"
          ],
          "correctIndex": 3,
          "answer": "يعتذر",
          "explanationAr": "\"apologize\" /əˈpɑːlədʒaɪz/ تعني: يعتذر. مثال: You should apologize."
        }
      ],
      "medium": [
        {
          "id": "sg_130_m1",
          "type": "gap",
          "promptEn": "Complete: If I ____ a million riyals, I would build a school.",
          "promptAr": "أكمل الفراغ: (لو عندي مليون ريال، كان بنيت مدرسة.)",
          "options": [
            "have",
            "had",
            "will have"
          ],
          "correctIndex": 1,
          "answer": "If I had a million riyals, I would build a school.",
          "explanationAr": "الإجابة: had. الشرط الثاني: If + ماضي بسيط، would + فعل أصلي لموقف غير واقعي الآن. نقول If I were (ليس was) في الأسلوب الصحيح. wish + ماضي = أتمنى لو الوضع الحالي مختلف."
        },
        {
          "id": "sg_130_m2",
          "type": "gap",
          "promptEn": "Complete: If I ____ you, I'd apologize.",
          "promptAr": "أكمل الفراغ: (لو كنت مكانك كان اعتذرت.)",
          "options": [
            "will be",
            "am",
            "were"
          ],
          "correctIndex": 2,
          "answer": "If I were you, I'd apologize.",
          "explanationAr": "الإجابة: were. الشرط الثاني: If + ماضي بسيط، would + فعل أصلي لموقف غير واقعي الآن. نقول If I were (ليس was) في الأسلوب الصحيح. wish + ماضي = أتمنى لو الوضع الحالي مختلف."
        },
        {
          "id": "sg_130_m3",
          "type": "gap",
          "promptEn": "Complete: I wish I ____ English fluently.",
          "promptAr": "أكمل الفراغ: (أتمنى لو أتكلم إنجليزي بطلاقة.)",
          "options": [
            "will speak",
            "speak",
            "spoke"
          ],
          "correctIndex": 2,
          "answer": "I wish I spoke English fluently.",
          "explanationAr": "الإجابة: spoke. الشرط الثاني: If + ماضي بسيط، would + فعل أصلي لموقف غير واقعي الآن. نقول If I were (ليس was) في الأسلوب الصحيح. wish + ماضي = أتمنى لو الوضع الحالي مختلف."
        },
        {
          "id": "sg_130_m4",
          "type": "gap",
          "promptEn": "Complete: What ____ you do if you lost your passport?",
          "promptAr": "أكمل الفراغ: (وش بتسوي لو ضاع جوازك؟)",
          "options": [
            "did",
            "will",
            "would"
          ],
          "correctIndex": 2,
          "answer": "What would you do if you lost your passport?",
          "explanationAr": "الإجابة: would. الشرط الثاني: If + ماضي بسيط، would + فعل أصلي لموقف غير واقعي الآن. نقول If I were (ليس was) في الأسلوب الصحيح. wish + ماضي = أتمنى لو الوضع الحالي مختلف."
        }
      ],
      "hard": [
        {
          "id": "sg_130_h1",
          "type": "order",
          "promptEn": "Put the words in order: wish / I / closer / lived / to / my / parents. / I",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (أتمنى لو ساكن أقرب لأهلي.)",
          "answer": "I wish I lived closer to my parents.",
          "explanationAr": "الترتيب الصحيح: I wish I lived closer to my parents."
        },
        {
          "id": "sg_130_h2",
          "type": "order",
          "promptEn": "Put the words in order: we'd / walk. / If / weren't / it / hot, / so",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (لو ما كان الجو حار مرة، كان مشينا.)",
          "answer": "If it weren't so hot, we'd walk.",
          "explanationAr": "الترتيب الصحيح: If it weren't so hot, we'd walk."
        },
        {
          "id": "sg_130_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: لو كنت مكانك كان اعتذرت.",
          "answer": "If I were you, I'd apologize.",
          "explanationAr": "ترجمة مقترحة: If I were you, I'd apologize."
        },
        {
          "id": "sg_130_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: وش بتسوي لو ضاع جوازك؟",
          "answer": "What would you do if you lost your passport?",
          "explanationAr": "ترجمة مقترحة: What would you do if you lost your passport?"
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "If I have time, I would come.",
        "correct": "If I had time, I would come.",
        "whyAr": "لا تخلط الشرط الأول بالثاني."
      },
      {
        "incorrect": "I hope I was taller.",
        "correct": "I wish I were taller.",
        "whyAr": "hope للممكن، wish للمستحيل/غير الواقعي."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (الكلام المنقول: He said that...): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "He asked me where I worked.",
          "He asked me where did I work."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: He asked me where I worked. — في السؤال المنقول ترتيب جملة عادية.",
        "fromLessonId": "sg_129"
      },
      {
        "questionAr": "مراجعة (أسماء الوصل: who / which / that / where): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "The man who he lives next door...",
          "The man who lives next door..."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: The man who lives next door... — لا نكرر he بعد who.",
        "fromLessonId": "sg_127"
      },
      {
        "questionAr": "مراجعة (الشرط الأول: If it rains, we'll stay home): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "If it will rain, we'll stay home.",
          "If it rains, we'll stay home."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: If it rains, we'll stay home. — بعد if مضارع بسيط وليس will.",
        "fromLessonId": "sg_124"
      },
      {
        "questionAr": "ما معنى \"cardamom\"؟",
        "questionEn": "What does \"cardamom\" mean?",
        "options": [
          "مسروق",
          "هيل",
          "مصنوع",
          "طحن / مطحون"
        ],
        "correctIndex": 1,
        "explanationAr": "\"cardamom\" /ˈkɑːrdəməm/ تعني: هيل. مثال: Coffee with cardamom",
        "fromLessonId": "sg_128"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (أتمنى لو أتكلم إنجليزي بطلاقة.)",
          "questionEn": "Complete: I wish I ____ English fluently.",
          "options": [
            "will speak",
            "speak",
            "spoke"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: spoke. الشرط الثاني: If + ماضي بسيط، would + فعل أصلي لموقف غير واقعي الآن. نقول If I were (ليس was) في الأسلوب الصحيح. wish + ماضي = أتمنى لو الوضع الحالي مختلف."
        },
        {
          "questionAr": "أكمل الفراغ: (وش بتسوي لو ضاع جوازك؟)",
          "questionEn": "Complete: What ____ you do if you lost your passport?",
          "options": [
            "did",
            "will",
            "would"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: would. الشرط الثاني: If + ماضي بسيط، would + فعل أصلي لموقف غير واقعي الآن. نقول If I were (ليس was) في الأسلوب الصحيح. wish + ماضي = أتمنى لو الوضع الحالي مختلف."
        },
        {
          "questionAr": "ما معنى \"passport\"؟",
          "questionEn": "What does \"passport\" mean?",
          "options": [
            "كان سـ (افتراض)",
            "يندم",
            "جواز سفر",
            "جمعية خيرية/صدقة"
          ],
          "correctIndex": 2,
          "explanationAr": "\"passport\" /ˈpæspɔːrt/ تعني: جواز سفر. مثال: I lost my passport."
        },
        {
          "questionAr": "ما معنى \"million\"؟",
          "questionEn": "What does \"million\" mean?",
          "options": [
            "مليون",
            "بطلاقة",
            "يندم",
            "كان سـ (افتراض)"
          ],
          "correctIndex": 0,
          "explanationAr": "\"million\" /ˈmɪljən/ تعني: مليون. مثال: a million riyals"
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "If I had time, I would come.",
            "If I have time, I would come."
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: If I had time, I would come. — لا تخلط الشرط الأول بالثاني."
        }
      ]
    }
  }
];
