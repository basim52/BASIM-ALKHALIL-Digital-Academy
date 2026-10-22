import { SaraCurriculumLesson } from './types';

// Rebuilt Sara curriculum (Active Conversation & Fluency Drills): 30 lessons, 6 units, CEFR Pre-A1 to B2.
// Generated from structured lesson sources; each lesson has vocabulary, dialogue, listening, pronunciation,
// 3-tier exercises, spiral review and a mastery check.

export const SARA_ACTIVE_CONVERSATION_LESSONS: SaraCurriculumLesson[] = [
  {
    "id": "sc_201",
    "pillarId": "conversation",
    "pillarNameAr": "المحادثة والطلاقة التفاعلية",
    "pillarNameEn": "Active Conversation & Fluency Drills",
    "pillarIcon": "💬",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "التحية والسلام",
    "titleEn": "Greetings: Hello, How Are You?",
    "descAr": "أول محادثة: تسلم وترد السلام وتسأل عن الحال وتودّع بأدب.",
    "descEn": "Your first conversation: greet, ask how someone is and say goodbye.",
    "speakingGoalAr": "سلّم على سارة واسألها عن حالها وودّعها.",
    "speakingGoalEn": "Greet Sara, ask how she is and say goodbye.",
    "keyPattern": {
      "ruleAr": "التحية حسب الوقت: Good morning/afternoon/evening. السؤال How are you? والرد I'm fine, thanks. And you?",
      "ruleEn": "Greet by time of day; ask 'How are you?' and reply 'I'm fine, thanks. And you?'.",
      "formula": "Hello / Good morning → How are you? → I'm fine, thanks. And you? → Bye!"
    },
    "practicalExamples": [
      {
        "en": "Good morning, teacher!",
        "ar": "صباح الخير يا أستاذة!"
      },
      {
        "en": "How are you today?",
        "ar": "كيف حالك اليوم؟"
      },
      {
        "en": "I'm fine, thanks. And you?",
        "ar": "بخير، شكراً. وأنت؟"
      },
      {
        "en": "See you tomorrow!",
        "ar": "أشوفك بكرة!"
      },
      {
        "en": "Good night, Mom.",
        "ar": "تصبحين على خير يا أمي."
      },
      {
        "en": "Have a nice day!",
        "ar": "يومك سعيد!"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Good night! (when arriving in the evening)",
        "correct": "Good evening!",
        "whyAr": "Good night للوداع أو قبل النوم فقط."
      },
      {
        "incorrect": "I'm fine, and you are?",
        "correct": "I'm fine, thanks. And you?",
        "whyAr": "الصيغة الطبيعية: And you?"
      },
      {
        "incorrect": "How are you? — Yes.",
        "correct": "How are you? — I'm good, thanks.",
        "whyAr": "السؤال عن الحال يحتاج رداً عن الحال."
      }
    ],
    "speakingChallenge": {
      "promptAr": "سلم على سارة كأنك تقابلها الصبح.",
      "promptEn": "Greet Sara as if it's morning.",
      "saraQuestionAr": "صباح الخير! كيف حالك اليوم؟",
      "saraQuestionEn": "Good morning! How are you today?",
      "recommendedResponseEn": "Good morning, Sara! I'm fine, thanks. And you? Have a nice day!"
    },
    "quiz": [
      {
        "questionAr": "الساعة ٨ مساءً ووصلت عزيمة. تقول:",
        "questionEn": "It's 8 pm and you arrive. You say:",
        "options": [
          "Good night",
          "Good evening",
          "Good morning"
        ],
        "correctIndex": 1,
        "explanationAr": "عند الوصول مساءً ⇐ Good evening."
      },
      {
        "questionAr": "رد على How are you?",
        "questionEn": "Reply to 'How are you?'",
        "options": [
          "I'm Ali.",
          "I'm fine, thanks.",
          "I'm ten."
        ],
        "correctIndex": 1,
        "explanationAr": "نرد عن الحال."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Good night! (when arriving in the evening)",
          "Good evening!",
          "I'm fine, and you are?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Good evening! — Good night للوداع أو قبل النوم فقط."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'm fine, thanks. And you?",
          "I'm fine, thanks. you And?",
          "I'm fine, and you are?"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I'm fine, thanks. And you? — الصيغة الطبيعية: And you?"
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "How are you? — Yes.",
          "How is you? — I'm good, thanks.",
          "How are you? — I'm good, thanks."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: How are you? — I'm good, thanks. — السؤال عن الحال يحتاج رداً عن الحال."
      }
    ],
    "whiteboardNotes": {
      "title": "Greetings: Hello, How Are You?",
      "pointsAr": [
        "يحيي حسب وقت اليوم.",
        "يسأل عن الحال ويرد.",
        "يودّع بعبارات مناسبة.",
        "التحية حسب الوقت: Good morning/afternoon/evening. السؤال How are you? والرد I'm fine, thanks. And you?"
      ],
      "pointsEn": [
        "Greet according to the time of day.",
        "Ask and answer 'How are you?'.",
        "Say goodbye appropriately.",
        "Greet by time of day; ask 'How are you?' and reply 'I'm fine, thanks. And you?'."
      ],
      "chalkHighlight": "Hello / Good morning → How are you? → I'm fine, thanks. And you? → Bye!"
    },
    "unit": 1,
    "cefr": "Pre-A1",
    "objectivesAr": [
      "يحيي حسب وقت اليوم.",
      "يسأل عن الحال ويرد.",
      "يودّع بعبارات مناسبة."
    ],
    "objectivesEn": [
      "Greet according to the time of day.",
      "Ask and answer 'How are you?'.",
      "Say goodbye appropriately."
    ],
    "vocabulary": [
      {
        "word": "hello",
        "ipa": "/həˈloʊ/",
        "ar": "مرحبا",
        "exampleEn": "Hello, Sara!",
        "exampleAr": "هلا سارة!"
      },
      {
        "word": "hi",
        "ipa": "/haɪ/",
        "ar": "هلا (غير رسمي)",
        "exampleEn": "Hi, Ali!",
        "exampleAr": "هلا علي!"
      },
      {
        "word": "good morning",
        "ipa": "/ɡʊd ˈmɔːrnɪŋ/",
        "ar": "صباح الخير",
        "exampleEn": "Good morning, everyone.",
        "exampleAr": "صباح الخير للجميع."
      },
      {
        "word": "good afternoon",
        "ipa": "/ɡʊd ˌæftərˈnuːn/",
        "ar": "مساء الخير (بعد الظهر)",
        "exampleEn": "Good afternoon, sir.",
        "exampleAr": "مساء الخير يا أستاذ."
      },
      {
        "word": "good evening",
        "ipa": "/ɡʊd ˈiːvnɪŋ/",
        "ar": "مساء الخير",
        "exampleEn": "Good evening!",
        "exampleAr": "مساء الخير!"
      },
      {
        "word": "good night",
        "ipa": "/ɡʊd naɪt/",
        "ar": "تصبح على خير",
        "exampleEn": "Good night, sleep well.",
        "exampleAr": "تصبح على خير."
      },
      {
        "word": "fine",
        "ipa": "/faɪn/",
        "ar": "بخير",
        "exampleEn": "I'm fine.",
        "exampleAr": "أنا بخير."
      },
      {
        "word": "thanks",
        "ipa": "/θæŋks/",
        "ar": "شكراً",
        "exampleEn": "Thanks a lot!",
        "exampleAr": "شكراً جزيلاً!"
      },
      {
        "word": "bye",
        "ipa": "/baɪ/",
        "ar": "باي/مع السلامة",
        "exampleEn": "Bye! See you.",
        "exampleAr": "باي! أشوفك."
      },
      {
        "word": "tomorrow",
        "ipa": "/təˈmɑːroʊ/",
        "ar": "بكرة",
        "exampleEn": "See you tomorrow.",
        "exampleAr": "أشوفك بكرة."
      }
    ],
    "grammarFocus": {
      "ruleAr": "التحية حسب الوقت: Good morning/afternoon/evening. السؤال How are you? والرد I'm fine, thanks. And you?",
      "ruleEn": "Greet by time of day; ask 'How are you?' and reply 'I'm fine, thanks. And you?'.",
      "formula": "Hello / Good morning → How are you? → I'm fine, thanks. And you? → Bye!",
      "examples": [
        {
          "en": "Good morning, teacher!",
          "ar": "صباح الخير يا أستاذة!"
        },
        {
          "en": "How are you today?",
          "ar": "كيف حالك اليوم؟"
        },
        {
          "en": "I'm fine, thanks. And you?",
          "ar": "بخير، شكراً. وأنت؟"
        },
        {
          "en": "See you tomorrow!",
          "ar": "أشوفك بكرة!"
        },
        {
          "en": "Good night, Mom.",
          "ar": "تصبحين على خير يا أمي."
        },
        {
          "en": "Have a nice day!",
          "ar": "يومك سعيد!"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Good morning! How are you?",
        "ar": "صباح الخير! كيف حالك؟"
      },
      {
        "speaker": "Student",
        "en": "Good morning, Sara. I'm fine, thanks. And you?",
        "ar": "صباح النور يا سارة. بخير الحمد لله. وأنتي؟"
      },
      {
        "speaker": "Sara",
        "en": "I'm great, thank you!",
        "ar": "أنا ممتازة، شكراً!"
      },
      {
        "speaker": "Student",
        "en": "Are you busy today?",
        "ar": "مشغولة اليوم؟"
      },
      {
        "speaker": "Sara",
        "en": "A little. See you tomorrow!",
        "ar": "شوي. أشوفك بكرة!"
      },
      {
        "speaker": "Student",
        "en": "OK. Bye! Have a nice day.",
        "ar": "تمام. مع السلامة! يومك سعيد."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Good morning! How are you?\nStudent: Good morning, Sara. I'm fine, thanks. And you?\nSara: I'm great, thank you!\nStudent: Are you busy today?\nSara: A little. See you tomorrow!\nStudent: OK. Bye! Have a nice day.",
      "questions": [
        {
          "questionAr": "أي وقت؟",
          "questionEn": "What time of day is it?",
          "options": [
            "morning",
            "evening",
            "night"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: morning"
        },
        {
          "questionAr": "كيف سارة؟",
          "questionEn": "How is Sara?",
          "options": [
            "tired",
            "great",
            "sad"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: great"
        },
        {
          "questionAr": "متى يتقابلون؟",
          "questionEn": "When will they meet again?",
          "options": [
            "today",
            "tomorrow",
            "next week"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: tomorrow"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "TH in thanks /θ/ and the /h/ in hello",
      "items": [
        "thanks /θæŋks/",
        "hello /həˈloʊ/",
        "how /haʊ/"
      ],
      "tipAr": "thanks تبدأ بصوت «ث» وليس «ت» أو «س»."
    },
    "exercises": {
      "easy": [
        {
          "id": "sc_201_e1",
          "type": "meaning",
          "promptEn": "What does \"hello\" mean?",
          "promptAr": "ما معنى \"hello\"؟",
          "options": [
            "بكرة",
            "مساء الخير (بعد الظهر)",
            "مساء الخير",
            "مرحبا"
          ],
          "correctIndex": 3,
          "answer": "مرحبا",
          "explanationAr": "\"hello\" /həˈloʊ/ تعني: مرحبا. مثال: Hello, Sara!"
        },
        {
          "id": "sc_201_e2",
          "type": "meaning",
          "promptEn": "What does \"hi\" mean?",
          "promptAr": "ما معنى \"hi\"؟",
          "options": [
            "مساء الخير (بعد الظهر)",
            "باي/مع السلامة",
            "بكرة",
            "هلا (غير رسمي)"
          ],
          "correctIndex": 3,
          "answer": "هلا (غير رسمي)",
          "explanationAr": "\"hi\" /haɪ/ تعني: هلا (غير رسمي). مثال: Hi, Ali!"
        },
        {
          "id": "sc_201_e3",
          "type": "meaning",
          "promptEn": "What does \"good morning\" mean?",
          "promptAr": "ما معنى \"good morning\"؟",
          "options": [
            "بخير",
            "صباح الخير",
            "مساء الخير (بعد الظهر)",
            "مرحبا"
          ],
          "correctIndex": 1,
          "answer": "صباح الخير",
          "explanationAr": "\"good morning\" /ɡʊd ˈmɔːrnɪŋ/ تعني: صباح الخير. مثال: Good morning, everyone."
        },
        {
          "id": "sc_201_e4",
          "type": "meaning",
          "promptEn": "What does \"good afternoon\" mean?",
          "promptAr": "ما معنى \"good afternoon\"؟",
          "options": [
            "مساء الخير",
            "باي/مع السلامة",
            "صباح الخير",
            "مساء الخير (بعد الظهر)"
          ],
          "correctIndex": 3,
          "answer": "مساء الخير (بعد الظهر)",
          "explanationAr": "\"good afternoon\" /ɡʊd ˌæftərˈnuːn/ تعني: مساء الخير (بعد الظهر). مثال: Good afternoon, sir."
        }
      ],
      "medium": [
        {
          "id": "sc_201_m1",
          "type": "gap",
          "promptEn": "Complete: Good ____, teacher!",
          "promptAr": "أكمل الفراغ: (صباح الخير يا أستاذة!)",
          "options": [
            "evening",
            "morning",
            "night"
          ],
          "correctIndex": 1,
          "answer": "Good morning, teacher!",
          "explanationAr": "الإجابة: morning. التحية حسب الوقت: Good morning/afternoon/evening. السؤال How are you? والرد I'm fine, thanks. And you?"
        },
        {
          "id": "sc_201_m2",
          "type": "gap",
          "promptEn": "Complete: ____ are you today?",
          "promptAr": "أكمل الفراغ: (كيف حالك اليوم؟)",
          "options": [
            "Who",
            "What",
            "How"
          ],
          "correctIndex": 2,
          "answer": "How are you today?",
          "explanationAr": "الإجابة: How. التحية حسب الوقت: Good morning/afternoon/evening. السؤال How are you? والرد I'm fine, thanks. And you?"
        },
        {
          "id": "sc_201_m3",
          "type": "gap",
          "promptEn": "Complete: I'm fine, ____. And you?",
          "promptAr": "أكمل الفراغ: (بخير، شكراً. وأنت؟)",
          "options": [
            "thanks",
            "sorry",
            "please"
          ],
          "correctIndex": 0,
          "answer": "I'm fine, thanks. And you?",
          "explanationAr": "الإجابة: thanks. التحية حسب الوقت: Good morning/afternoon/evening. السؤال How are you? والرد I'm fine, thanks. And you?"
        },
        {
          "id": "sc_201_m4",
          "type": "gap",
          "promptEn": "Complete: ____ you tomorrow!",
          "promptAr": "أكمل الفراغ: (أشوفك بكرة!)",
          "options": [
            "Look",
            "Watch",
            "See"
          ],
          "correctIndex": 2,
          "answer": "See you tomorrow!",
          "explanationAr": "الإجابة: See. التحية حسب الوقت: Good morning/afternoon/evening. السؤال How are you? والرد I'm fine, thanks. And you?"
        }
      ],
      "hard": [
        {
          "id": "sc_201_h1",
          "type": "order",
          "promptEn": "Put the words in order: Mom. / night, / Good",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (تصبحين على خير يا أمي.)",
          "answer": "Good night, Mom.",
          "explanationAr": "الترتيب الصحيح: Good night, Mom."
        },
        {
          "id": "sc_201_h2",
          "type": "order",
          "promptEn": "Put the words in order: nice / day! / Have / a",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (يومك سعيد!)",
          "answer": "Have a nice day!",
          "explanationAr": "الترتيب الصحيح: Have a nice day!"
        },
        {
          "id": "sc_201_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: كيف حالك اليوم؟",
          "answer": "How are you today?",
          "explanationAr": "ترجمة مقترحة: How are you today?"
        },
        {
          "id": "sc_201_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أشوفك بكرة!",
          "answer": "See you tomorrow!",
          "explanationAr": "ترجمة مقترحة: See you tomorrow!"
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Good morning! — Good light!",
        "correct": "Good morning! — Good morning!",
        "whyAr": "«صباح النور» ما تترجم حرفياً؛ نرد بنفس التحية."
      },
      {
        "incorrect": "I'm fine, thank God, and you?",
        "correct": "I'm fine, thanks. And you?",
        "whyAr": "«الحمد لله» تقال بالقلب أو بالعربي؛ الرد الإنجليزي الطبيعي fine, thanks."
      }
    ],
    "reviewOfPrevious": [],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (بخير، شكراً. وأنت؟)",
          "questionEn": "Complete: I'm fine, ____. And you?",
          "options": [
            "thanks",
            "sorry",
            "please"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: thanks. التحية حسب الوقت: Good morning/afternoon/evening. السؤال How are you? والرد I'm fine, thanks. And you?"
        },
        {
          "questionAr": "أكمل الفراغ: (أشوفك بكرة!)",
          "questionEn": "Complete: ____ you tomorrow!",
          "options": [
            "Look",
            "Watch",
            "See"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: See. التحية حسب الوقت: Good morning/afternoon/evening. السؤال How are you? والرد I'm fine, thanks. And you?"
        },
        {
          "questionAr": "ما معنى \"good evening\"؟",
          "questionEn": "What does \"good evening\" mean?",
          "options": [
            "بخير",
            "مرحبا",
            "مساء الخير",
            "مساء الخير (بعد الظهر)"
          ],
          "correctIndex": 2,
          "explanationAr": "\"good evening\" /ɡʊd ˈiːvnɪŋ/ تعني: مساء الخير. مثال: Good evening!"
        },
        {
          "questionAr": "ما معنى \"good night\"؟",
          "questionEn": "What does \"good night\" mean?",
          "options": [
            "باي/مع السلامة",
            "شكراً",
            "هلا (غير رسمي)",
            "تصبح على خير"
          ],
          "correctIndex": 3,
          "explanationAr": "\"good night\" /ɡʊd naɪt/ تعني: تصبح على خير. مثال: Good night, sleep well."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Good morning! — Good light!",
            "Good morning! — morning Good!",
            "Good morning! — Good morning!"
          ],
          "correctIndex": 2,
          "explanationAr": "الصحيح: Good morning! — Good morning! — «صباح النور» ما تترجم حرفياً؛ نرد بنفس التحية."
        }
      ]
    }
  },
  {
    "id": "sc_204",
    "pillarId": "conversation",
    "pillarNameAr": "المحادثة والطلاقة التفاعلية",
    "pillarNameEn": "Active Conversation & Fluency Drills",
    "pillarIcon": "💬",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "التعارف: اسمك ومن وين أنت",
    "titleEn": "Meeting People: Names, Countries and Jobs",
    "descAr": "تعرّف على شخص جديد: الاسم، البلد، الشغل أو الدراسة.",
    "descEn": "Meet someone new: name, country, job or studies.",
    "speakingGoalAr": "أجرِ محادثة تعارف من ست جمل.",
    "speakingGoalEn": "Hold a six-line getting-to-know-you conversation.",
    "keyPattern": {
      "ruleAr": "What's your name? / Where are you from? / What do you do? والرد I'm... / I'm from... / I'm a student.",
      "ruleEn": "Use What's your name? / Where are you from? / What do you do?",
      "formula": "What's your...? / Where are you from? / What do you do? → I'm (a) ..."
    },
    "practicalExamples": [
      {
        "en": "What's your name?",
        "ar": "وش اسمك؟"
      },
      {
        "en": "Where are you from?",
        "ar": "من وين أنت؟"
      },
      {
        "en": "I'm Saudi. I'm from Taif.",
        "ar": "أنا سعودي، من الطائف."
      },
      {
        "en": "What do you do? I'm an engineer.",
        "ar": "وش تشتغل؟ مهندس."
      },
      {
        "en": "This is my friend Khalid.",
        "ar": "هذا صديقي خالد."
      },
      {
        "en": "Nice to meet you, Khalid.",
        "ar": "تشرفنا يا خالد."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "I'm from Saudi.",
        "correct": "I'm from Saudi Arabia. / I'm Saudi.",
        "whyAr": "Saudi جنسية، و Saudi Arabia البلد."
      },
      {
        "incorrect": "What is your work?",
        "correct": "What do you do?",
        "whyAr": "السؤال الطبيعي عن المهنة: What do you do?"
      },
      {
        "incorrect": "I'm engineer.",
        "correct": "I'm an engineer.",
        "whyAr": "المهنة تحتاج a/an."
      }
    ],
    "speakingChallenge": {
      "promptAr": "عرّف نفسك لشخص جديد في مؤتمر.",
      "promptEn": "Introduce yourself to someone new at an event.",
      "saraQuestionAr": "هلا! ما أظن تقابلنا قبل. عرفني بنفسك!",
      "saraQuestionEn": "Hi! I don't think we've met. Tell me about yourself!",
      "recommendedResponseEn": "Hi, I'm Majed. I'm from Saudi Arabia. I live in Dammam. I'm an engineer. Nice to meet you!"
    },
    "quiz": [
      {
        "questionAr": "السؤال الطبيعي عن الشغل:",
        "questionEn": "Natural question about job:",
        "options": [
          "What do you do?",
          "What is you work?",
          "What job you?"
        ],
        "correctIndex": 0,
        "explanationAr": "What do you do?"
      },
      {
        "questionAr": "أكمل: She's ___ Emirati.",
        "questionEn": "Complete: She's ___.",
        "options": [
          "Emirati",
          "from Emirati",
          "a Emirates"
        ],
        "correctIndex": 0,
        "explanationAr": "الجنسية بدون from."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'm from Saudi Arabia. / I'm Saudi.",
          "I'm from Arabia Saudi.",
          "I'm from Saudi."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I'm from Saudi Arabia. / I'm Saudi. — Saudi جنسية، و Saudi Arabia البلد."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "What do you do?",
          "What is your work?",
          "What does you do?"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: What do you do? — السؤال الطبيعي عن المهنة: What do you do?"
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'm engineer.",
          "I'm an engineer.",
          "I'm a engineer."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I'm an engineer. — المهنة تحتاج a/an."
      }
    ],
    "whiteboardNotes": {
      "title": "Meeting People: Names, Countries and Jobs",
      "pointsAr": [
        "يسأل عن الاسم والبلد والعمل.",
        "يرد بجمل كاملة.",
        "يستخدم أسماء الدول والجنسيات.",
        "What's your name? / Where are you from? / What do you do? والرد I'm... / I'm from... / I'm a student."
      ],
      "pointsEn": [
        "Ask about name, country and job.",
        "Answer in full sentences.",
        "Use countries and nationalities.",
        "Use What's your name? / Where are you from? / What do you do?"
      ],
      "chalkHighlight": "What's your...? / Where are you from? / What do you do? → I'm (a) ..."
    },
    "unit": 1,
    "cefr": "Pre-A1",
    "objectivesAr": [
      "يسأل عن الاسم والبلد والعمل.",
      "يرد بجمل كاملة.",
      "يستخدم أسماء الدول والجنسيات."
    ],
    "objectivesEn": [
      "Ask about name, country and job.",
      "Answer in full sentences.",
      "Use countries and nationalities."
    ],
    "vocabulary": [
      {
        "word": "country",
        "ipa": "/ˈkʌntri/",
        "ar": "بلد",
        "exampleEn": "What country are you from?",
        "exampleAr": "من أي بلد؟"
      },
      {
        "word": "Saudi Arabia",
        "ipa": "/ˌsaʊdi əˈreɪbiə/",
        "ar": "السعودية",
        "exampleEn": "I live in Saudi Arabia.",
        "exampleAr": "أسكن السعودية."
      },
      {
        "word": "Saudi",
        "ipa": "/ˈsaʊdi/",
        "ar": "سعودي",
        "exampleEn": "I'm Saudi.",
        "exampleAr": "أنا سعودي."
      },
      {
        "word": "Emirati",
        "ipa": "/ˌɛməˈrɑːti/",
        "ar": "إماراتي",
        "exampleEn": "She's Emirati.",
        "exampleAr": "هي إماراتية."
      },
      {
        "word": "Kuwaiti",
        "ipa": "/kuːˈweɪti/",
        "ar": "كويتي",
        "exampleEn": "He's Kuwaiti.",
        "exampleAr": "هو كويتي."
      },
      {
        "word": "engineer",
        "ipa": "/ˌɛndʒɪˈnɪr/",
        "ar": "مهندس",
        "exampleEn": "I'm an engineer.",
        "exampleAr": "أنا مهندس."
      },
      {
        "word": "nurse",
        "ipa": "/nɜːrs/",
        "ar": "ممرض/ممرضة",
        "exampleEn": "She's a nurse.",
        "exampleAr": "هي ممرضة."
      },
      {
        "word": "job",
        "ipa": "/dʒɑːb/",
        "ar": "وظيفة",
        "exampleEn": "I like my job.",
        "exampleAr": "أحب وظيفتي."
      },
      {
        "word": "university",
        "ipa": "/ˌjuːnɪˈvɜːrsəti/",
        "ar": "جامعة",
        "exampleEn": "I study at university.",
        "exampleAr": "أدرس في الجامعة."
      },
      {
        "word": "live",
        "ipa": "/lɪv/",
        "ar": "يسكن",
        "exampleEn": "I live in Khobar.",
        "exampleAr": "أسكن الخبر."
      }
    ],
    "grammarFocus": {
      "ruleAr": "What's your name? / Where are you from? / What do you do? والرد I'm... / I'm from... / I'm a student.",
      "ruleEn": "Use What's your name? / Where are you from? / What do you do?",
      "formula": "What's your...? / Where are you from? / What do you do? → I'm (a) ...",
      "examples": [
        {
          "en": "What's your name?",
          "ar": "وش اسمك؟"
        },
        {
          "en": "Where are you from?",
          "ar": "من وين أنت؟"
        },
        {
          "en": "I'm Saudi. I'm from Taif.",
          "ar": "أنا سعودي، من الطائف."
        },
        {
          "en": "What do you do? I'm an engineer.",
          "ar": "وش تشتغل؟ مهندس."
        },
        {
          "en": "This is my friend Khalid.",
          "ar": "هذا صديقي خالد."
        },
        {
          "en": "Nice to meet you, Khalid.",
          "ar": "تشرفنا يا خالد."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Hi! I'm Sara. What's your name?",
        "ar": "هلا! أنا سارة. وش اسمك؟"
      },
      {
        "speaker": "Student",
        "en": "I'm Reem. Nice to meet you.",
        "ar": "أنا ريم. تشرفنا."
      },
      {
        "speaker": "Sara",
        "en": "Nice to meet you too. Where are you from, Reem?",
        "ar": "وأنا كذلك. من وين يا ريم؟"
      },
      {
        "speaker": "Student",
        "en": "I'm from Kuwait, but I live in Riyadh.",
        "ar": "أنا من الكويت، بس أسكن الرياض."
      },
      {
        "speaker": "Sara",
        "en": "What do you do?",
        "ar": "وش تشتغلين؟"
      },
      {
        "speaker": "Student",
        "en": "I'm a nurse. I work at King Fahad Hospital.",
        "ar": "ممرضة. أشتغل في مستشفى الملك فهد."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Hi! I'm Sara. What's your name?\nStudent: I'm Reem. Nice to meet you.\nSara: Nice to meet you too. Where are you from, Reem?\nStudent: I'm from Kuwait, but I live in Riyadh.\nSara: What do you do?\nStudent: I'm a nurse. I work at King Fahad Hospital.",
      "questions": [
        {
          "questionAr": "من وين ريم؟",
          "questionEn": "Where is Reem from?",
          "options": [
            "Saudi Arabia",
            "Kuwait",
            "UAE"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: Kuwait"
        },
        {
          "questionAr": "وين تسكن؟",
          "questionEn": "Where does she live?",
          "options": [
            "Riyadh",
            "Kuwait",
            "Jeddah"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: Riyadh"
        },
        {
          "questionAr": "وش شغلها؟",
          "questionEn": "What is her job?",
          "options": [
            "teacher",
            "doctor",
            "nurse"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: nurse"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Question intonation in wh-questions ↘",
      "items": [
        "What's your NAME? ↘",
        "Where are you FROM? ↘",
        "engineer /ˌɛndʒɪˈNɪr/"
      ],
      "tipAr": "أسئلة wh ينزل فيها الصوت في الآخر ↘، عكس أسئلة نعم/لا."
    },
    "exercises": {
      "easy": [
        {
          "id": "sc_204_e1",
          "type": "meaning",
          "promptEn": "What does \"country\" mean?",
          "promptAr": "ما معنى \"country\"؟",
          "options": [
            "مهندس",
            "بلد",
            "سعودي",
            "إماراتي"
          ],
          "correctIndex": 1,
          "answer": "بلد",
          "explanationAr": "\"country\" /ˈkʌntri/ تعني: بلد. مثال: What country are you from?"
        },
        {
          "id": "sc_204_e2",
          "type": "meaning",
          "promptEn": "What does \"Saudi Arabia\" mean?",
          "promptAr": "ما معنى \"Saudi Arabia\"؟",
          "options": [
            "السعودية",
            "إماراتي",
            "سعودي",
            "كويتي"
          ],
          "correctIndex": 0,
          "answer": "السعودية",
          "explanationAr": "\"Saudi Arabia\" /ˌsaʊdi əˈreɪbiə/ تعني: السعودية. مثال: I live in Saudi Arabia."
        },
        {
          "id": "sc_204_e3",
          "type": "meaning",
          "promptEn": "What does \"Saudi\" mean?",
          "promptAr": "ما معنى \"Saudi\"؟",
          "options": [
            "بلد",
            "السعودية",
            "سعودي",
            "ممرض/ممرضة"
          ],
          "correctIndex": 2,
          "answer": "سعودي",
          "explanationAr": "\"Saudi\" /ˈsaʊdi/ تعني: سعودي. مثال: I'm Saudi."
        },
        {
          "id": "sc_204_e4",
          "type": "meaning",
          "promptEn": "What does \"Emirati\" mean?",
          "promptAr": "ما معنى \"Emirati\"؟",
          "options": [
            "السعودية",
            "سعودي",
            "إماراتي",
            "كويتي"
          ],
          "correctIndex": 2,
          "answer": "إماراتي",
          "explanationAr": "\"Emirati\" /ˌɛməˈrɑːti/ تعني: إماراتي. مثال: She's Emirati."
        }
      ],
      "medium": [
        {
          "id": "sc_204_m1",
          "type": "gap",
          "promptEn": "Complete: ____ your name?",
          "promptAr": "أكمل الفراغ: (وش اسمك؟)",
          "options": [
            "How's",
            "What's",
            "Who's"
          ],
          "correctIndex": 1,
          "answer": "What's your name?",
          "explanationAr": "الإجابة: What's. What's your name? / Where are you from? / What do you do? والرد I'm... / I'm from... / I'm a student."
        },
        {
          "id": "sc_204_m2",
          "type": "gap",
          "promptEn": "Complete: Where are you ____?",
          "promptAr": "أكمل الفراغ: (من وين أنت؟)",
          "options": [
            "from",
            "at",
            "in"
          ],
          "correctIndex": 0,
          "answer": "Where are you from?",
          "explanationAr": "الإجابة: from. What's your name? / Where are you from? / What do you do? والرد I'm... / I'm from... / I'm a student."
        },
        {
          "id": "sc_204_m3",
          "type": "gap",
          "promptEn": "Complete: I'm ____. I'm from Taif.",
          "promptAr": "أكمل الفراغ: (أنا سعودي، من الطائف.)",
          "options": [
            "Saudi",
            "Saudi Arabia",
            "Saudia"
          ],
          "correctIndex": 0,
          "answer": "I'm Saudi. I'm from Taif.",
          "explanationAr": "الإجابة: Saudi. What's your name? / Where are you from? / What do you do? والرد I'm... / I'm from... / I'm a student."
        },
        {
          "id": "sc_204_m4",
          "type": "gap",
          "promptEn": "Complete: What do you do? I'm ____ engineer.",
          "promptAr": "أكمل الفراغ: (وش تشتغل؟ مهندس.)",
          "options": [
            "the",
            "a",
            "an"
          ],
          "correctIndex": 2,
          "answer": "What do you do? I'm an engineer.",
          "explanationAr": "الإجابة: an. What's your name? / Where are you from? / What do you do? والرد I'm... / I'm from... / I'm a student."
        }
      ],
      "hard": [
        {
          "id": "sc_204_h1",
          "type": "order",
          "promptEn": "Put the words in order: friend / Khalid. / is / This / my",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (هذا صديقي خالد.)",
          "answer": "This is my friend Khalid.",
          "explanationAr": "الترتيب الصحيح: This is my friend Khalid."
        },
        {
          "id": "sc_204_h2",
          "type": "order",
          "promptEn": "Put the words in order: meet / Khalid. / to / you, / Nice",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (تشرفنا يا خالد.)",
          "answer": "Nice to meet you, Khalid.",
          "explanationAr": "الترتيب الصحيح: Nice to meet you, Khalid."
        },
        {
          "id": "sc_204_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: من وين أنت؟",
          "answer": "Where are you from?",
          "explanationAr": "ترجمة مقترحة: Where are you from?"
        },
        {
          "id": "sc_204_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: وش تشتغل؟ مهندس.",
          "answer": "What do you do? I'm an engineer.",
          "explanationAr": "ترجمة مقترحة: What do you do? I'm an engineer."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "I am working nurse.",
        "correct": "I work as a nurse. / I'm a nurse.",
        "whyAr": "ترجمة «أشتغل ممرضة» تحتاج as a."
      },
      {
        "incorrect": "Where you from?",
        "correct": "Where are you from?",
        "whyAr": "لا تحذف are."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (التحية والسلام): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'm fine, thanks. And you?",
          "I'm fine, thanks. you And?",
          "I'm fine, and you are?"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I'm fine, thanks. And you? — الصيغة الطبيعية: And you?",
        "fromLessonId": "sc_201"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (أنا سعودي، من الطائف.)",
          "questionEn": "Complete: I'm ____. I'm from Taif.",
          "options": [
            "Saudi",
            "Saudi Arabia",
            "Saudia"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: Saudi. What's your name? / Where are you from? / What do you do? والرد I'm... / I'm from... / I'm a student."
        },
        {
          "questionAr": "أكمل الفراغ: (وش تشتغل؟ مهندس.)",
          "questionEn": "Complete: What do you do? I'm ____ engineer.",
          "options": [
            "the",
            "a",
            "an"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: an. What's your name? / Where are you from? / What do you do? والرد I'm... / I'm from... / I'm a student."
        },
        {
          "questionAr": "ما معنى \"Kuwaiti\"؟",
          "questionEn": "What does \"Kuwaiti\" mean?",
          "options": [
            "مهندس",
            "كويتي",
            "السعودية",
            "جامعة"
          ],
          "correctIndex": 1,
          "explanationAr": "\"Kuwaiti\" /kuːˈweɪti/ تعني: كويتي. مثال: He's Kuwaiti."
        },
        {
          "questionAr": "ما معنى \"engineer\"؟",
          "questionEn": "What does \"engineer\" mean?",
          "options": [
            "ممرض/ممرضة",
            "وظيفة",
            "إماراتي",
            "مهندس"
          ],
          "correctIndex": 3,
          "explanationAr": "\"engineer\" /ˌɛndʒɪˈnɪr/ تعني: مهندس. مثال: I'm an engineer."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "I work as an nurse.",
            "I am working nurse.",
            "I work as a nurse. / I'm a nurse."
          ],
          "correctIndex": 2,
          "explanationAr": "الصحيح: I work as a nurse. / I'm a nurse. — ترجمة «أشتغل ممرضة» تحتاج as a."
        }
      ]
    }
  },
  {
    "id": "sc_205",
    "pillarId": "conversation",
    "pillarNameAr": "المحادثة والطلاقة التفاعلية",
    "pillarNameEn": "Active Conversation & Fluency Drills",
    "pillarIcon": "💬",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "في الفصل: عبارات الطالب المهمة",
    "titleEn": "Classroom Language: Asking for Help",
    "descAr": "عبارات تحتاجها في كل حصة: كرر لو سمحت، وش معنى...؟، كيف أكتب...؟",
    "descEn": "Phrases you need in every lesson: repeat please, what does ... mean, how do you spell ...?",
    "speakingGoalAr": "استخدم خمس عبارات فصل مع سارة.",
    "speakingGoalEn": "Use five classroom phrases with Sara.",
    "keyPattern": {
      "ruleAr": "Can you repeat that, please? / What does ... mean? / How do you say ... in English? / How do you spell ...?",
      "ruleEn": "Use polite classroom questions with please.",
      "formula": "Can you + verb + please? | What does X mean? | How do you say/spell X?"
    },
    "practicalExamples": [
      {
        "en": "Can you repeat that, please?",
        "ar": "ممكن تعيدين لو سمحتي؟"
      },
      {
        "en": "What does 'busy' mean?",
        "ar": "وش معنى busy؟"
      },
      {
        "en": "How do you say 'قلم' in English?",
        "ar": "كيف تقول «قلم» بالإنجليزي؟"
      },
      {
        "en": "How do you spell your name?",
        "ar": "كيف تتهجى اسمك؟"
      },
      {
        "en": "Sorry, I don't understand.",
        "ar": "آسف، ما فهمت."
      },
      {
        "en": "Can you speak more slowly, please?",
        "ar": "ممكن تتكلمين أبطأ لو سمحتي؟"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "What the meaning busy?",
        "correct": "What does 'busy' mean?",
        "whyAr": "السؤال عن المعنى بـ What does ... mean?"
      },
      {
        "incorrect": "Again please.",
        "correct": "Can you repeat that, please?",
        "whyAr": "صيغة كاملة أكثر أدباً."
      },
      {
        "incorrect": "I not understand.",
        "correct": "I don't understand.",
        "whyAr": "النفي بـ don't."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اطلب من سارة تكرار وتهجئة ومعنى كلمة.",
      "promptEn": "Ask Sara to repeat, spell and explain a word.",
      "saraQuestionAr": "كلمتي اليوم: environment.",
      "saraQuestionEn": "Today's word is 'environment'.",
      "recommendedResponseEn": "Can you repeat that, please? What does 'environment' mean? How do you spell it?"
    },
    "quiz": [
      {
        "questionAr": "ما فهمت. تقول:",
        "questionEn": "You didn't understand. You say:",
        "options": [
          "I don't understand.",
          "I not understand.",
          "No understand."
        ],
        "correctIndex": 0,
        "explanationAr": "I don't understand."
      },
      {
        "questionAr": "تبي تعرف كتابة كلمة:",
        "questionEn": "You want the spelling:",
        "options": [
          "How do you spell it?",
          "How you write?",
          "What spell?"
        ],
        "correctIndex": 0,
        "explanationAr": "How do you spell it?"
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "What do 'busy' mean?",
          "What the meaning busy?",
          "What does 'busy' mean?"
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: What does 'busy' mean? — السؤال عن المعنى بـ What does ... mean?"
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "What the meaning busy?",
          "Again please.",
          "Can you repeat that, please?"
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: Can you repeat that, please? — صيغة كاملة أكثر أدباً."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I don't understand.",
          "I doesn't understand.",
          "I not understand."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I don't understand. — النفي بـ don't."
      }
    ],
    "whiteboardNotes": {
      "title": "Classroom Language: Asking for Help",
      "pointsAr": [
        "يطلب التكرار بأدب.",
        "يسأل عن معنى وتهجئة الكلمات.",
        "يقول I don't understand بثقة.",
        "Can you repeat that, please? / What does ... mean? / How do you say ... in English? / How do you spell ...?"
      ],
      "pointsEn": [
        "Ask for repetition politely.",
        "Ask about meaning and spelling.",
        "Say 'I don't understand' confidently.",
        "Use polite classroom questions with please."
      ],
      "chalkHighlight": "Can you + verb + please? | What does X mean? | How do you say/spell X?"
    },
    "unit": 1,
    "cefr": "Pre-A1",
    "objectivesAr": [
      "يطلب التكرار بأدب.",
      "يسأل عن معنى وتهجئة الكلمات.",
      "يقول I don't understand بثقة."
    ],
    "objectivesEn": [
      "Ask for repetition politely.",
      "Ask about meaning and spelling.",
      "Say 'I don't understand' confidently."
    ],
    "vocabulary": [
      {
        "word": "repeat",
        "ipa": "/rɪˈpiːt/",
        "ar": "يكرر/يعيد",
        "exampleEn": "Repeat after me.",
        "exampleAr": "كرر بعدي."
      },
      {
        "word": "spell",
        "ipa": "/spɛl/",
        "ar": "يتهجى",
        "exampleEn": "Spell it, please.",
        "exampleAr": "تهجاها لو سمحت."
      },
      {
        "word": "mean",
        "ipa": "/miːn/",
        "ar": "يعني",
        "exampleEn": "What does it mean?",
        "exampleAr": "وش يعني؟"
      },
      {
        "word": "understand",
        "ipa": "/ˌʌndərˈstænd/",
        "ar": "يفهم",
        "exampleEn": "I understand.",
        "exampleAr": "فهمت."
      },
      {
        "word": "slowly",
        "ipa": "/ˈsloʊli/",
        "ar": "ببطء",
        "exampleEn": "Speak slowly, please.",
        "exampleAr": "تكلم بشويش."
      },
      {
        "word": "question",
        "ipa": "/ˈkwɛstʃən/",
        "ar": "سؤال",
        "exampleEn": "I have a question.",
        "exampleAr": "عندي سؤال."
      },
      {
        "word": "answer",
        "ipa": "/ˈænsər/",
        "ar": "جواب",
        "exampleEn": "What's the answer?",
        "exampleAr": "وش الجواب؟"
      },
      {
        "word": "page",
        "ipa": "/peɪdʒ/",
        "ar": "صفحة",
        "exampleEn": "Open page ten.",
        "exampleAr": "افتح صفحة ١٠."
      },
      {
        "word": "word",
        "ipa": "/wɜːrd/",
        "ar": "كلمة",
        "exampleEn": "a new word",
        "exampleAr": "كلمة جديدة"
      },
      {
        "word": "example",
        "ipa": "/ɪɡˈzæmpəl/",
        "ar": "مثال",
        "exampleEn": "Give me an example.",
        "exampleAr": "عطني مثال."
      }
    ],
    "grammarFocus": {
      "ruleAr": "Can you repeat that, please? / What does ... mean? / How do you say ... in English? / How do you spell ...?",
      "ruleEn": "Use polite classroom questions with please.",
      "formula": "Can you + verb + please? | What does X mean? | How do you say/spell X?",
      "examples": [
        {
          "en": "Can you repeat that, please?",
          "ar": "ممكن تعيدين لو سمحتي؟"
        },
        {
          "en": "What does 'busy' mean?",
          "ar": "وش معنى busy؟"
        },
        {
          "en": "How do you say 'قلم' in English?",
          "ar": "كيف تقول «قلم» بالإنجليزي؟"
        },
        {
          "en": "How do you spell your name?",
          "ar": "كيف تتهجى اسمك؟"
        },
        {
          "en": "Sorry, I don't understand.",
          "ar": "آسف، ما فهمت."
        },
        {
          "en": "Can you speak more slowly, please?",
          "ar": "ممكن تتكلمين أبطأ لو سمحتي؟"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Today's word is 'delicious'.",
        "ar": "كلمة اليوم delicious."
      },
      {
        "speaker": "Student",
        "en": "Sorry, can you repeat that, please?",
        "ar": "آسف، ممكن تعيدينها؟"
      },
      {
        "speaker": "Sara",
        "en": "Sure. De-li-cious.",
        "ar": "أكيد. دِ-لي-شَس."
      },
      {
        "speaker": "Student",
        "en": "What does it mean?",
        "ar": "وش معناها؟"
      },
      {
        "speaker": "Sara",
        "en": "It means 'very tasty'. Kabsa is delicious!",
        "ar": "تعني «لذيذ مرة». الكبسة لذيذة!"
      },
      {
        "speaker": "Student",
        "en": "How do you spell it?",
        "ar": "كيف تنكتب؟"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Today's word is 'delicious'.\nStudent: Sorry, can you repeat that, please?\nSara: Sure. De-li-cious.\nStudent: What does it mean?\nSara: It means 'very tasty'. Kabsa is delicious!\nStudent: How do you spell it?",
      "questions": [
        {
          "questionAr": "وش الكلمة الجديدة؟",
          "questionEn": "What is the new word?",
          "options": [
            "delicious",
            "busy",
            "beautiful"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: delicious"
        },
        {
          "questionAr": "وش معناها؟",
          "questionEn": "What does it mean?",
          "options": [
            "very tasty",
            "very big",
            "very hot"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: very tasty"
        },
        {
          "questionAr": "وش الأكلة في المثال؟",
          "questionEn": "What food is the example?",
          "options": [
            "pizza",
            "kabsa",
            "dates"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: kabsa"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Spelling the alphabet: A /eɪ/, E /iː/, I /aɪ/",
      "items": [
        "A /eɪ/",
        "E /iː/",
        "I /aɪ/",
        "G /dʒiː/ vs J /dʒeɪ/"
      ],
      "tipAr": "أكثر حروف تتلخبط عند العرب: E «إي» و I «آي»، و G «جي» و J «جيه»."
    },
    "exercises": {
      "easy": [
        {
          "id": "sc_205_e1",
          "type": "meaning",
          "promptEn": "What does \"repeat\" mean?",
          "promptAr": "ما معنى \"repeat\"؟",
          "options": [
            "جواب",
            "يكرر/يعيد",
            "سؤال",
            "كلمة"
          ],
          "correctIndex": 1,
          "answer": "يكرر/يعيد",
          "explanationAr": "\"repeat\" /rɪˈpiːt/ تعني: يكرر/يعيد. مثال: Repeat after me."
        },
        {
          "id": "sc_205_e2",
          "type": "meaning",
          "promptEn": "What does \"spell\" mean?",
          "promptAr": "ما معنى \"spell\"؟",
          "options": [
            "يعني",
            "يتهجى",
            "جواب",
            "يكرر/يعيد"
          ],
          "correctIndex": 1,
          "answer": "يتهجى",
          "explanationAr": "\"spell\" /spɛl/ تعني: يتهجى. مثال: Spell it, please."
        },
        {
          "id": "sc_205_e3",
          "type": "meaning",
          "promptEn": "What does \"mean\" mean?",
          "promptAr": "ما معنى \"mean\"؟",
          "options": [
            "يعني",
            "صفحة",
            "يتهجى",
            "يكرر/يعيد"
          ],
          "correctIndex": 0,
          "answer": "يعني",
          "explanationAr": "\"mean\" /miːn/ تعني: يعني. مثال: What does it mean?"
        },
        {
          "id": "sc_205_e4",
          "type": "meaning",
          "promptEn": "What does \"understand\" mean?",
          "promptAr": "ما معنى \"understand\"؟",
          "options": [
            "مثال",
            "يفهم",
            "صفحة",
            "يتهجى"
          ],
          "correctIndex": 1,
          "answer": "يفهم",
          "explanationAr": "\"understand\" /ˌʌndərˈstænd/ تعني: يفهم. مثال: I understand."
        }
      ],
      "medium": [
        {
          "id": "sc_205_m1",
          "type": "gap",
          "promptEn": "Complete: Can you ____ that, please?",
          "promptAr": "أكمل الفراغ: (ممكن تعيدين لو سمحتي؟)",
          "options": [
            "again",
            "repeat",
            "return"
          ],
          "correctIndex": 1,
          "answer": "Can you repeat that, please?",
          "explanationAr": "الإجابة: repeat. Can you repeat that, please? / What does ... mean? / How do you say ... in English? / How do you spell ...?"
        },
        {
          "id": "sc_205_m2",
          "type": "gap",
          "promptEn": "Complete: What ____ 'busy' mean?",
          "promptAr": "أكمل الفراغ: (وش معنى busy؟)",
          "options": [
            "does",
            "is",
            "do"
          ],
          "correctIndex": 0,
          "answer": "What does 'busy' mean?",
          "explanationAr": "الإجابة: does. Can you repeat that, please? / What does ... mean? / How do you say ... in English? / How do you spell ...?"
        },
        {
          "id": "sc_205_m3",
          "type": "gap",
          "promptEn": "Complete: How do you ____ 'قلم' in English?",
          "promptAr": "أكمل الفراغ: (كيف تقول «قلم» بالإنجليزي؟)",
          "options": [
            "say",
            "speak",
            "tell"
          ],
          "correctIndex": 0,
          "answer": "How do you say 'قلم' in English?",
          "explanationAr": "الإجابة: say. Can you repeat that, please? / What does ... mean? / How do you say ... in English? / How do you spell ...?"
        },
        {
          "id": "sc_205_m4",
          "type": "gap",
          "promptEn": "Complete: How do you ____ your name?",
          "promptAr": "أكمل الفراغ: (كيف تتهجى اسمك؟)",
          "options": [
            "write letter",
            "spell",
            "say"
          ],
          "correctIndex": 1,
          "answer": "How do you spell your name?",
          "explanationAr": "الإجابة: spell. Can you repeat that, please? / What does ... mean? / How do you say ... in English? / How do you spell ...?"
        }
      ],
      "hard": [
        {
          "id": "sc_205_h1",
          "type": "order",
          "promptEn": "Put the words in order: I / Sorry, / understand. / don't",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (آسف، ما فهمت.)",
          "answer": "Sorry, I don't understand.",
          "explanationAr": "الترتيب الصحيح: Sorry, I don't understand."
        },
        {
          "id": "sc_205_h2",
          "type": "order",
          "promptEn": "Put the words in order: Can / speak / please? / more / you / slowly,",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (ممكن تتكلمين أبطأ لو سمحتي؟)",
          "answer": "Can you speak more slowly, please?",
          "explanationAr": "الترتيب الصحيح: Can you speak more slowly, please?"
        },
        {
          "id": "sc_205_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: وش معنى busy؟",
          "answer": "What does 'busy' mean?",
          "explanationAr": "ترجمة مقترحة: What does 'busy' mean?"
        },
        {
          "id": "sc_205_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: كيف تتهجى اسمك؟",
          "answer": "How do you spell your name?",
          "explanationAr": "ترجمة مقترحة: How do you spell your name?"
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "How I say قلم in English?",
        "correct": "How do you say 'قلم' in English?",
        "whyAr": "السؤال يحتاج do you."
      },
      {
        "incorrect": "Teacher, I have question.",
        "correct": "Excuse me, I have a question.",
        "whyAr": "a قبل question، وExcuse me أكثر لباقة."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (التعارف: اسمك ومن وين أنت): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "What does you do?",
          "What do you do?",
          "What is your work?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: What do you do? — السؤال الطبيعي عن المهنة: What do you do?",
        "fromLessonId": "sc_204"
      },
      {
        "questionAr": "ما معنى \"tomorrow\"؟",
        "questionEn": "What does \"tomorrow\" mean?",
        "options": [
          "مساء الخير (بعد الظهر)",
          "مرحبا",
          "بكرة",
          "مساء الخير"
        ],
        "correctIndex": 2,
        "explanationAr": "\"tomorrow\" /təˈmɑːroʊ/ تعني: بكرة. مثال: See you tomorrow.",
        "fromLessonId": "sc_201"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (كيف تقول «قلم» بالإنجليزي؟)",
          "questionEn": "Complete: How do you ____ 'قلم' in English?",
          "options": [
            "say",
            "speak",
            "tell"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: say. Can you repeat that, please? / What does ... mean? / How do you say ... in English? / How do you spell ...?"
        },
        {
          "questionAr": "أكمل الفراغ: (كيف تتهجى اسمك؟)",
          "questionEn": "Complete: How do you ____ your name?",
          "options": [
            "write letter",
            "spell",
            "say"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: spell. Can you repeat that, please? / What does ... mean? / How do you say ... in English? / How do you spell ...?"
        },
        {
          "questionAr": "ما معنى \"slowly\"؟",
          "questionEn": "What does \"slowly\" mean?",
          "options": [
            "مثال",
            "ببطء",
            "يعني",
            "يفهم"
          ],
          "correctIndex": 1,
          "explanationAr": "\"slowly\" /ˈsloʊli/ تعني: ببطء. مثال: Speak slowly, please."
        },
        {
          "questionAr": "ما معنى \"question\"؟",
          "questionEn": "What does \"question\" mean?",
          "options": [
            "سؤال",
            "جواب",
            "مثال",
            "يكرر/يعيد"
          ],
          "correctIndex": 0,
          "explanationAr": "\"question\" /ˈkwɛstʃən/ تعني: سؤال. مثال: I have a question."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "How I say قلم in English?",
            "How do you say 'قلم' in English?",
            "How does you say 'قلم' in English?"
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: How do you say 'قلم' in English? — السؤال يحتاج do you."
        }
      ]
    }
  },
  {
    "id": "sc_206",
    "pillarId": "conversation",
    "pillarNameAr": "المحادثة والطلاقة التفاعلية",
    "pillarNameEn": "Active Conversation & Fluency Drills",
    "pillarIcon": "💬",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "الأرقام والأسعار والوقت",
    "titleEn": "Numbers, Prices and Time",
    "descAr": "اسأل عن السعر والساعة ورقم الجوال، وافهم الأرقام لما تسمعها.",
    "descEn": "Ask about prices, time and phone numbers, and catch numbers when you hear them.",
    "speakingGoalAr": "اسأل عن سعر ثلاث أشياء والوقت.",
    "speakingGoalEn": "Ask the price of three items and the time.",
    "keyPattern": {
      "ruleAr": "How much is it? It's 25 riyals. / What time is it? It's half past four. لاحظ: thirteen ≠ thirty.",
      "ruleEn": "How much is it? / What time is it? Watch thirteen vs thirty.",
      "formula": "How much is/are ...? → It's/They're + price | What time is it? → It's + time"
    },
    "practicalExamples": [
      {
        "en": "How much is this abaya?",
        "ar": "بكم هالعباية؟"
      },
      {
        "en": "It's three hundred riyals.",
        "ar": "بثلاث مية ريال."
      },
      {
        "en": "What time is it? It's half past four.",
        "ar": "كم الساعة؟ أربع ونص."
      },
      {
        "en": "My number is 055 123 4567.",
        "ar": "رقمي ٠٥٥١٢٣٤٥٦٧."
      },
      {
        "en": "It's a quarter to nine.",
        "ar": "الساعة تسعة إلا ربع."
      },
      {
        "en": "These shoes are 199 riyals.",
        "ar": "هالجزمة بـ١٩٩ ريال."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "How much this?",
        "correct": "How much is this?",
        "whyAr": "لا تحذف is."
      },
      {
        "incorrect": "It's three hundreds riyals.",
        "correct": "It's three hundred riyals.",
        "whyAr": "hundred بدون s بعد رقم."
      },
      {
        "incorrect": "The time is four and half.",
        "correct": "It's half past four.",
        "whyAr": "الصيغة الإنجليزية: half past four."
      }
    ],
    "speakingChallenge": {
      "promptAr": "تسوق مع سارة: اسأل عن سعرين والوقت.",
      "promptEn": "Shop with Sara: ask two prices and the closing time.",
      "saraQuestionAr": "أهلاً في محلي! وش تبي؟",
      "saraQuestionEn": "Welcome to my shop! What would you like?",
      "recommendedResponseEn": "How much is this bag? And how much are these shoes? What time do you close?"
    },
    "quiz": [
      {
        "questionAr": "٤:١٥ =",
        "questionEn": "4:15 =",
        "options": [
          "a quarter past four",
          "a quarter to four",
          "four and quarter"
        ],
        "correctIndex": 0,
        "explanationAr": "quarter past = وربع."
      },
      {
        "questionAr": "بكم الجزم؟ (جمع)",
        "questionEn": "Price of the shoes?",
        "options": [
          "How much is the shoes?",
          "How much are the shoes?",
          "How many the shoes?"
        ],
        "correctIndex": 1,
        "explanationAr": "shoes جمع ⇐ are."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "How much this?",
          "How much are this?",
          "How much is this?"
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: How much is this? — لا تحذف is."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "It's three riyals hundred.",
          "It's three hundreds riyals.",
          "It's three hundred riyals."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: It's three hundred riyals. — hundred بدون s بعد رقم."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "It's half four past.",
          "It's half past four.",
          "The time is four and half."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: It's half past four. — الصيغة الإنجليزية: half past four."
      }
    ],
    "whiteboardNotes": {
      "title": "Numbers, Prices and Time",
      "pointsAr": [
        "يقول الأرقام ١–١٠٠.",
        "يسأل عن السعر.",
        "يقول الوقت.",
        "How much is it? It's 25 riyals. / What time is it? It's half past four. لاحظ: thirteen ≠ thirty."
      ],
      "pointsEn": [
        "Say numbers 1–100.",
        "Ask about prices.",
        "Tell the time.",
        "How much is it? / What time is it? Watch thirteen vs thirty."
      ],
      "chalkHighlight": "How much is/are ...? → It's/They're + price | What time is it? → It's + time"
    },
    "unit": 1,
    "cefr": "Pre-A1",
    "objectivesAr": [
      "يقول الأرقام ١–١٠٠.",
      "يسأل عن السعر.",
      "يقول الوقت."
    ],
    "objectivesEn": [
      "Say numbers 1–100.",
      "Ask about prices.",
      "Tell the time."
    ],
    "vocabulary": [
      {
        "word": "riyal",
        "ipa": "/riˈɑːl/",
        "ar": "ريال",
        "exampleEn": "Ten riyals, please.",
        "exampleAr": "عشرة ريالات لو سمحت."
      },
      {
        "word": "price",
        "ipa": "/praɪs/",
        "ar": "سعر",
        "exampleEn": "What's the price?",
        "exampleAr": "كم السعر؟"
      },
      {
        "word": "hundred",
        "ipa": "/ˈhʌndrəd/",
        "ar": "مية",
        "exampleEn": "two hundred",
        "exampleAr": "ميتين"
      },
      {
        "word": "thousand",
        "ipa": "/ˈθaʊzənd/",
        "ar": "ألف",
        "exampleEn": "a thousand riyals",
        "exampleAr": "ألف ريال"
      },
      {
        "word": "thirteen",
        "ipa": "/θɜːrˈtiːn/",
        "ar": "ثلاثة عشر",
        "exampleEn": "thirTEEN",
        "exampleAr": "١٣"
      },
      {
        "word": "thirty",
        "ipa": "/ˈθɜːrti/",
        "ar": "ثلاثين",
        "exampleEn": "THIRty",
        "exampleAr": "٣٠"
      },
      {
        "word": "half past",
        "ipa": "/hæf pæst/",
        "ar": "ونص",
        "exampleEn": "half past six",
        "exampleAr": "ست ونص"
      },
      {
        "word": "quarter",
        "ipa": "/ˈkwɔːrtər/",
        "ar": "ربع",
        "exampleEn": "a quarter past two",
        "exampleAr": "ثنتين وربع"
      },
      {
        "word": "expensive",
        "ipa": "/ɪkˈspɛnsɪv/",
        "ar": "غالي",
        "exampleEn": "It's expensive!",
        "exampleAr": "غالي!"
      },
      {
        "word": "cheap",
        "ipa": "/tʃiːp/",
        "ar": "رخيص",
        "exampleEn": "It's cheap.",
        "exampleAr": "رخيص."
      }
    ],
    "grammarFocus": {
      "ruleAr": "How much is it? It's 25 riyals. / What time is it? It's half past four. لاحظ: thirteen ≠ thirty.",
      "ruleEn": "How much is it? / What time is it? Watch thirteen vs thirty.",
      "formula": "How much is/are ...? → It's/They're + price | What time is it? → It's + time",
      "examples": [
        {
          "en": "How much is this abaya?",
          "ar": "بكم هالعباية؟"
        },
        {
          "en": "It's three hundred riyals.",
          "ar": "بثلاث مية ريال."
        },
        {
          "en": "What time is it? It's half past four.",
          "ar": "كم الساعة؟ أربع ونص."
        },
        {
          "en": "My number is 055 123 4567.",
          "ar": "رقمي ٠٥٥١٢٣٤٥٦٧."
        },
        {
          "en": "It's a quarter to nine.",
          "ar": "الساعة تسعة إلا ربع."
        },
        {
          "en": "These shoes are 199 riyals.",
          "ar": "هالجزمة بـ١٩٩ ريال."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Student",
        "en": "Excuse me, how much is this perfume?",
        "ar": "لو سمحت، بكم هالعطر؟"
      },
      {
        "speaker": "Sara",
        "en": "It's two hundred and fifty riyals.",
        "ar": "بمئتين وخمسين."
      },
      {
        "speaker": "Student",
        "en": "That's expensive! And this one?",
        "ar": "غالي! وهذا؟"
      },
      {
        "speaker": "Sara",
        "en": "That one is ninety riyals.",
        "ar": "هذاك بتسعين."
      },
      {
        "speaker": "Student",
        "en": "OK, I'll take it. What time do you close?",
        "ar": "تمام، باخذه. متى تسكرون؟"
      },
      {
        "speaker": "Sara",
        "en": "We close at eleven thirty.",
        "ar": "نسكر الساعة إحدى عشر ونص."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Student: Excuse me, how much is this perfume?\nSara: It's two hundred and fifty riyals.\nStudent: That's expensive! And this one?\nSara: That one is ninety riyals.\nStudent: OK, I'll take it. What time do you close?\nSara: We close at eleven thirty.",
      "questions": [
        {
          "questionAr": "بكم العطر الأول؟",
          "questionEn": "How much is the first perfume?",
          "options": [
            "150",
            "250",
            "90"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: 250"
        },
        {
          "questionAr": "وش اشترى؟",
          "questionEn": "What does the student buy?",
          "options": [
            "the 250 one",
            "the 90 one",
            "nothing"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: the 90 one"
        },
        {
          "questionAr": "متى يسكر المحل؟",
          "questionEn": "When does the shop close?",
          "options": [
            "11:00",
            "11:30",
            "12:00"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: 11:30"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "-teen vs -ty stress: thirTEEN vs THIRty",
      "items": [
        "fourTEEN /fɔːrˈtiːn/",
        "FORty /ˈfɔːrti/",
        "fifTEEN vs FIFty"
      ],
      "tipAr": "الضغط هو الفرق: teen في الآخر ويطول، و ty في الأول. هذا يفرق بين ١٥ و٥٠ ريال!"
    },
    "exercises": {
      "easy": [
        {
          "id": "sc_206_e1",
          "type": "meaning",
          "promptEn": "What does \"riyal\" mean?",
          "promptAr": "ما معنى \"riyal\"؟",
          "options": [
            "ريال",
            "ربع",
            "سعر",
            "ونص"
          ],
          "correctIndex": 0,
          "answer": "ريال",
          "explanationAr": "\"riyal\" /riˈɑːl/ تعني: ريال. مثال: Ten riyals, please."
        },
        {
          "id": "sc_206_e2",
          "type": "meaning",
          "promptEn": "What does \"price\" mean?",
          "promptAr": "ما معنى \"price\"؟",
          "options": [
            "مية",
            "ألف",
            "غالي",
            "سعر"
          ],
          "correctIndex": 3,
          "answer": "سعر",
          "explanationAr": "\"price\" /praɪs/ تعني: سعر. مثال: What's the price?"
        },
        {
          "id": "sc_206_e3",
          "type": "meaning",
          "promptEn": "What does \"hundred\" mean?",
          "promptAr": "ما معنى \"hundred\"؟",
          "options": [
            "غالي",
            "ثلاثة عشر",
            "سعر",
            "مية"
          ],
          "correctIndex": 3,
          "answer": "مية",
          "explanationAr": "\"hundred\" /ˈhʌndrəd/ تعني: مية. مثال: two hundred"
        },
        {
          "id": "sc_206_e4",
          "type": "meaning",
          "promptEn": "What does \"thousand\" mean?",
          "promptAr": "ما معنى \"thousand\"؟",
          "options": [
            "رخيص",
            "ثلاثة عشر",
            "مية",
            "ألف"
          ],
          "correctIndex": 3,
          "answer": "ألف",
          "explanationAr": "\"thousand\" /ˈθaʊzənd/ تعني: ألف. مثال: a thousand riyals"
        }
      ],
      "medium": [
        {
          "id": "sc_206_m1",
          "type": "gap",
          "promptEn": "Complete: ____ is this abaya?",
          "promptAr": "أكمل الفراغ: (بكم هالعباية؟)",
          "options": [
            "How much",
            "How many",
            "What much"
          ],
          "correctIndex": 0,
          "answer": "How much is this abaya?",
          "explanationAr": "الإجابة: How much. How much is it? It's 25 riyals. / What time is it? It's half past four. لاحظ: thirteen ≠ thirty."
        },
        {
          "id": "sc_206_m2",
          "type": "gap",
          "promptEn": "Complete: It's three ____ riyals.",
          "promptAr": "أكمل الفراغ: (بثلاث مية ريال.)",
          "options": [
            "hundred",
            "hundreds",
            "thousand"
          ],
          "correctIndex": 0,
          "answer": "It's three hundred riyals.",
          "explanationAr": "الإجابة: hundred. How much is it? It's 25 riyals. / What time is it? It's half past four. لاحظ: thirteen ≠ thirty."
        },
        {
          "id": "sc_206_m3",
          "type": "gap",
          "promptEn": "Complete: What time is it? It's ____ four.",
          "promptAr": "أكمل الفراغ: (كم الساعة؟ أربع ونص.)",
          "options": [
            "past half",
            "half past",
            "half to"
          ],
          "correctIndex": 1,
          "answer": "What time is it? It's half past four.",
          "explanationAr": "الإجابة: half past. How much is it? It's 25 riyals. / What time is it? It's half past four. لاحظ: thirteen ≠ thirty."
        },
        {
          "id": "sc_206_m4",
          "type": "gap",
          "promptEn": "Complete: My ____ is 055 123 4567.",
          "promptAr": "أكمل الفراغ: (رقمي ٠٥٥١٢٣٤٥٦٧.)",
          "options": [
            "phone is",
            "count",
            "number"
          ],
          "correctIndex": 2,
          "answer": "My number is 055 123 4567.",
          "explanationAr": "الإجابة: number. How much is it? It's 25 riyals. / What time is it? It's half past four. لاحظ: thirteen ≠ thirty."
        }
      ],
      "hard": [
        {
          "id": "sc_206_h1",
          "type": "order",
          "promptEn": "Put the words in order: a / quarter / nine. / to / It's",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (الساعة تسعة إلا ربع.)",
          "answer": "It's a quarter to nine.",
          "explanationAr": "الترتيب الصحيح: It's a quarter to nine."
        },
        {
          "id": "sc_206_h2",
          "type": "order",
          "promptEn": "Put the words in order: shoes / are / 199 / These / riyals.",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (هالجزمة بـ١٩٩ ريال.)",
          "answer": "These shoes are 199 riyals.",
          "explanationAr": "الترتيب الصحيح: These shoes are 199 riyals."
        },
        {
          "id": "sc_206_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: بثلاث مية ريال.",
          "answer": "It's three hundred riyals.",
          "explanationAr": "ترجمة مقترحة: It's three hundred riyals."
        },
        {
          "id": "sc_206_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: رقمي ٠٥٥١٢٣٤٥٦٧.",
          "answer": "My number is 055 123 4567.",
          "explanationAr": "ترجمة مقترحة: My number is 055 123 4567."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "How much the price?",
        "correct": "What's the price? / How much is it?",
        "whyAr": "دمج سؤالين."
      },
      {
        "incorrect": "It's 50 riyal.",
        "correct": "It's 50 riyals.",
        "whyAr": "الجمع بـ s."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (في الفصل: عبارات الطالب المهمة): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Can you repeat that, please?",
          "How much this?",
          "Again please."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Can you repeat that, please? — صيغة كاملة أكثر أدباً.",
        "fromLessonId": "sc_205"
      },
      {
        "questionAr": "مراجعة (التحية والسلام): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "How much this?",
          "Good evening!",
          "Good night! (when arriving in the evening)"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Good evening! — Good night للوداع أو قبل النوم فقط.",
        "fromLessonId": "sc_201"
      },
      {
        "questionAr": "ما معنى \"live\"؟",
        "questionEn": "What does \"live\" mean?",
        "options": [
          "ممرض/ممرضة",
          "سعودي",
          "يسكن",
          "وظيفة"
        ],
        "correctIndex": 2,
        "explanationAr": "\"live\" /lɪv/ تعني: يسكن. مثال: I live in Khobar.",
        "fromLessonId": "sc_204"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (كم الساعة؟ أربع ونص.)",
          "questionEn": "Complete: What time is it? It's ____ four.",
          "options": [
            "past half",
            "half past",
            "half to"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: half past. How much is it? It's 25 riyals. / What time is it? It's half past four. لاحظ: thirteen ≠ thirty."
        },
        {
          "questionAr": "أكمل الفراغ: (رقمي ٠٥٥١٢٣٤٥٦٧.)",
          "questionEn": "Complete: My ____ is 055 123 4567.",
          "options": [
            "phone is",
            "count",
            "number"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: number. How much is it? It's 25 riyals. / What time is it? It's half past four. لاحظ: thirteen ≠ thirty."
        },
        {
          "questionAr": "ما معنى \"thirteen\"؟",
          "questionEn": "What does \"thirteen\" mean?",
          "options": [
            "ونص",
            "مية",
            "ثلاثة عشر",
            "رخيص"
          ],
          "correctIndex": 2,
          "explanationAr": "\"thirteen\" /θɜːrˈtiːn/ تعني: ثلاثة عشر. مثال: thirTEEN"
        },
        {
          "questionAr": "ما معنى \"thirty\"؟",
          "questionEn": "What does \"thirty\" mean?",
          "options": [
            "ثلاثة عشر",
            "ونص",
            "رخيص",
            "ثلاثين"
          ],
          "correctIndex": 3,
          "explanationAr": "\"thirty\" /ˈθɜːrti/ تعني: ثلاثين. مثال: THIRty"
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "What's price the?",
            "How much the price?",
            "What's the price? / How much is it?"
          ],
          "correctIndex": 2,
          "explanationAr": "الصحيح: What's the price? / How much is it? — دمج سؤالين."
        }
      ]
    }
  },
  {
    "id": "sc_207",
    "pillarId": "conversation",
    "pillarNameAr": "المحادثة والطلاقة التفاعلية",
    "pillarNameEn": "Active Conversation & Fluency Drills",
    "pillarIcon": "💬",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "طلب الطعام في الكافيه والمطعم",
    "titleEn": "Ordering Food and Drinks",
    "descAr": "اطلب بأدب: I'd like... / Can I have...? واسأل عن الحجم والدفع.",
    "descEn": "Order politely with I'd like / Can I have, and handle size and payment.",
    "speakingGoalAr": "اطلب وجبة كاملة ومشروب وادفع.",
    "speakingGoalEn": "Order a meal and a drink and pay.",
    "keyPattern": {
      "ruleAr": "I'd like + اسم / Can I have + اسم + please? والنادل يسأل: Anything else? For here or to go?",
      "ruleEn": "Order with I'd like / Can I have ... please? Understand 'Anything else?' and 'For here or to go?'.",
      "formula": "I'd like a/an + item | Can I have + item, please? | ..., please."
    },
    "practicalExamples": [
      {
        "en": "I'd like a large latte, please.",
        "ar": "أبي لاتيه كبير لو سمحت."
      },
      {
        "en": "Can I have a chicken burger?",
        "ar": "ممكن برجر دجاج؟"
      },
      {
        "en": "For here or to go? — To go, please.",
        "ar": "هنا ولا سفري؟ سفري لو سمحت."
      },
      {
        "en": "Can I pay by card?",
        "ar": "أقدر أدفع بالبطاقة؟"
      },
      {
        "en": "No sugar, please.",
        "ar": "بدون سكر لو سمحت."
      },
      {
        "en": "Could we have the bill, please?",
        "ar": "ممكن الفاتورة لو سمحت؟"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Give me coffee.",
        "correct": "Can I have a coffee, please?",
        "whyAr": "Give me تبدو فظة بالإنجليزي."
      },
      {
        "incorrect": "I want one Spanish latte big.",
        "correct": "I'd like a large Spanish latte.",
        "whyAr": "الحجم قبل الاسم."
      },
      {
        "incorrect": "Take away please.",
        "correct": "To go, please.",
        "whyAr": "في أمريكا to go، وفي بريطانيا take away."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اطلب من سارة (الكاشير) فطورك.",
      "promptEn": "Order breakfast from Sara the cashier.",
      "saraQuestionAr": "صباح الخير! وش طلبك؟",
      "saraQuestionEn": "Good morning! What would you like?",
      "recommendedResponseEn": "Good morning! I'd like a cheese croissant and a large flat white, please. To go. Can I pay by card?"
    },
    "quiz": [
      {
        "questionAr": "الطلب الأكثر أدباً:",
        "questionEn": "Most polite order:",
        "options": [
          "Give me a tea.",
          "I'd like a tea, please.",
          "Tea now."
        ],
        "correctIndex": 1,
        "explanationAr": "I'd like ... please."
      },
      {
        "questionAr": "For here or to go? تعني:",
        "questionEn": "'For here or to go?' means:",
        "options": [
          "هنا ولا سفري؟",
          "حار ولا بارد؟",
          "كاش ولا بطاقة؟"
        ],
        "correctIndex": 0,
        "explanationAr": "هنا أو سفري."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Give me coffee.",
          "Can I have a coffee, please?",
          "Can I has a coffee, please?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Can I have a coffee, please? — Give me تبدو فظة بالإنجليزي."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I want one Spanish latte big.",
          "I'd like a large Spanish latte.",
          "I'd like an large Spanish latte."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I'd like a large Spanish latte. — الحجم قبل الاسم."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Give me coffee.",
          "To go, please.",
          "Take away please."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: To go, please. — في أمريكا to go، وفي بريطانيا take away."
      }
    ],
    "whiteboardNotes": {
      "title": "Ordering Food and Drinks",
      "pointsAr": [
        "يطلب بأدب.",
        "يفهم أسئلة الكاشير.",
        "يدفع ويطلب الفاتورة.",
        "I'd like + اسم / Can I have + اسم + please? والنادل يسأل: Anything else? For here or to go?"
      ],
      "pointsEn": [
        "Order politely.",
        "Understand cashier questions.",
        "Pay and ask for the bill.",
        "Order with I'd like / Can I have ... please? Understand 'Anything else?' and 'For here or to go?'."
      ],
      "chalkHighlight": "I'd like a/an + item | Can I have + item, please? | ..., please."
    },
    "unit": 1,
    "cefr": "A1",
    "objectivesAr": [
      "يطلب بأدب.",
      "يفهم أسئلة الكاشير.",
      "يدفع ويطلب الفاتورة."
    ],
    "objectivesEn": [
      "Order politely.",
      "Understand cashier questions.",
      "Pay and ask for the bill."
    ],
    "vocabulary": [
      {
        "word": "menu",
        "ipa": "/ˈmɛnjuː/",
        "ar": "قائمة الطعام",
        "exampleEn": "Can I see the menu?",
        "exampleAr": "أقدر أشوف المنيو؟"
      },
      {
        "word": "order",
        "ipa": "/ˈɔːrdər/",
        "ar": "يطلب/طلب",
        "exampleEn": "Are you ready to order?",
        "exampleAr": "جاهز تطلب؟"
      },
      {
        "word": "large",
        "ipa": "/lɑːrdʒ/",
        "ar": "كبير",
        "exampleEn": "a large juice",
        "exampleAr": "عصير كبير"
      },
      {
        "word": "medium",
        "ipa": "/ˈmiːdiəm/",
        "ar": "وسط",
        "exampleEn": "a medium pizza",
        "exampleAr": "بيتزا وسط"
      },
      {
        "word": "to go",
        "ipa": "/tə ɡoʊ/",
        "ar": "سفري",
        "exampleEn": "Two coffees to go.",
        "exampleAr": "قهوتين سفري."
      },
      {
        "word": "bill",
        "ipa": "/bɪl/",
        "ar": "فاتورة",
        "exampleEn": "The bill, please.",
        "exampleAr": "الفاتورة لو سمحت."
      },
      {
        "word": "card",
        "ipa": "/kɑːrd/",
        "ar": "بطاقة",
        "exampleEn": "I'll pay by card.",
        "exampleAr": "بدفع بالبطاقة."
      },
      {
        "word": "cash",
        "ipa": "/kæʃ/",
        "ar": "كاش",
        "exampleEn": "Cash or card?",
        "exampleAr": "كاش ولا بطاقة؟"
      },
      {
        "word": "spicy",
        "ipa": "/ˈspaɪsi/",
        "ar": "حار (طعم)",
        "exampleEn": "Is it spicy?",
        "exampleAr": "حار؟"
      },
      {
        "word": "receipt",
        "ipa": "/rɪˈsiːt/",
        "ar": "إيصال",
        "exampleEn": "Can I have the receipt?",
        "exampleAr": "ممكن الإيصال؟"
      }
    ],
    "grammarFocus": {
      "ruleAr": "I'd like + اسم / Can I have + اسم + please? والنادل يسأل: Anything else? For here or to go?",
      "ruleEn": "Order with I'd like / Can I have ... please? Understand 'Anything else?' and 'For here or to go?'.",
      "formula": "I'd like a/an + item | Can I have + item, please? | ..., please.",
      "examples": [
        {
          "en": "I'd like a large latte, please.",
          "ar": "أبي لاتيه كبير لو سمحت."
        },
        {
          "en": "Can I have a chicken burger?",
          "ar": "ممكن برجر دجاج؟"
        },
        {
          "en": "For here or to go? — To go, please.",
          "ar": "هنا ولا سفري؟ سفري لو سمحت."
        },
        {
          "en": "Can I pay by card?",
          "ar": "أقدر أدفع بالبطاقة؟"
        },
        {
          "en": "No sugar, please.",
          "ar": "بدون سكر لو سمحت."
        },
        {
          "en": "Could we have the bill, please?",
          "ar": "ممكن الفاتورة لو سمحت؟"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Hi! What can I get you?",
        "ar": "هلا! وش أجيب لك؟"
      },
      {
        "speaker": "Student",
        "en": "I'd like a medium Spanish latte, please.",
        "ar": "أبي سبانش لاتيه وسط لو سمحتي."
      },
      {
        "speaker": "Sara",
        "en": "Hot or iced?",
        "ar": "حار ولا بارد؟"
      },
      {
        "speaker": "Student",
        "en": "Iced, please. And can I have a cookie?",
        "ar": "بارد. وممكن كوكيز؟"
      },
      {
        "speaker": "Sara",
        "en": "Sure. For here or to go?",
        "ar": "أكيد. هنا ولا سفري؟"
      },
      {
        "speaker": "Student",
        "en": "To go. Can I pay by card?",
        "ar": "سفري. أقدر أدفع بالبطاقة؟"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Hi! What can I get you?\nStudent: I'd like a medium Spanish latte, please.\nSara: Hot or iced?\nStudent: Iced, please. And can I have a cookie?\nSara: Sure. For here or to go?\nStudent: To go. Can I pay by card?",
      "questions": [
        {
          "questionAr": "وش حجم اللاتيه؟",
          "questionEn": "What size is the latte?",
          "options": [
            "small",
            "medium",
            "large"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: medium"
        },
        {
          "questionAr": "حار ولا بارد؟",
          "questionEn": "Hot or iced?",
          "options": [
            "Give me coffee.",
            "hot",
            "iced"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: iced"
        },
        {
          "questionAr": "كيف بيدفع؟",
          "questionEn": "How will the student pay?",
          "options": [
            "cash",
            "card",
            "Apple Pay"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: card"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "I'd like /aɪd laɪk/ — linking",
      "items": [
        "I'd like a /aɪd laɪkə/",
        "Can I have /kənaɪ hæv/",
        "receipt /rɪˈsiːt/ (silent p)"
      ],
      "tipAr": "في receipt حرف p صامت: «رِسيت»."
    },
    "exercises": {
      "easy": [
        {
          "id": "sc_207_e1",
          "type": "meaning",
          "promptEn": "What does \"menu\" mean?",
          "promptAr": "ما معنى \"menu\"؟",
          "options": [
            "كاش",
            "قائمة الطعام",
            "يطلب/طلب",
            "كبير"
          ],
          "correctIndex": 1,
          "answer": "قائمة الطعام",
          "explanationAr": "\"menu\" /ˈmɛnjuː/ تعني: قائمة الطعام. مثال: Can I see the menu?"
        },
        {
          "id": "sc_207_e2",
          "type": "meaning",
          "promptEn": "What does \"order\" mean?",
          "promptAr": "ما معنى \"order\"؟",
          "options": [
            "بطاقة",
            "يطلب/طلب",
            "سفري",
            "وسط"
          ],
          "correctIndex": 1,
          "answer": "يطلب/طلب",
          "explanationAr": "\"order\" /ˈɔːrdər/ تعني: يطلب/طلب. مثال: Are you ready to order?"
        },
        {
          "id": "sc_207_e3",
          "type": "meaning",
          "promptEn": "What does \"large\" mean?",
          "promptAr": "ما معنى \"large\"؟",
          "options": [
            "فاتورة",
            "سفري",
            "قائمة الطعام",
            "كبير"
          ],
          "correctIndex": 3,
          "answer": "كبير",
          "explanationAr": "\"large\" /lɑːrdʒ/ تعني: كبير. مثال: a large juice"
        },
        {
          "id": "sc_207_e4",
          "type": "meaning",
          "promptEn": "What does \"medium\" mean?",
          "promptAr": "ما معنى \"medium\"؟",
          "options": [
            "سفري",
            "إيصال",
            "وسط",
            "بطاقة"
          ],
          "correctIndex": 2,
          "answer": "وسط",
          "explanationAr": "\"medium\" /ˈmiːdiəm/ تعني: وسط. مثال: a medium pizza"
        }
      ],
      "medium": [
        {
          "id": "sc_207_m1",
          "type": "gap",
          "promptEn": "Complete: ____ a large latte, please.",
          "promptAr": "أكمل الفراغ: (أبي لاتيه كبير لو سمحت.)",
          "options": [
            "I want",
            "Give me",
            "I'd like"
          ],
          "correctIndex": 2,
          "answer": "I'd like a large latte, please.",
          "explanationAr": "الإجابة: I'd like. I'd like + اسم / Can I have + اسم + please? والنادل يسأل: Anything else? For here or to go?"
        },
        {
          "id": "sc_207_m2",
          "type": "gap",
          "promptEn": "Complete: ____ a chicken burger?",
          "promptAr": "أكمل الفراغ: (ممكن برجر دجاج؟)",
          "options": [
            "Can I have",
            "Can I take me",
            "I can have"
          ],
          "correctIndex": 0,
          "answer": "Can I have a chicken burger?",
          "explanationAr": "الإجابة: Can I have. I'd like + اسم / Can I have + اسم + please? والنادل يسأل: Anything else? For here or to go?"
        },
        {
          "id": "sc_207_m3",
          "type": "gap",
          "promptEn": "Complete: For here or ____? — To go, please.",
          "promptAr": "أكمل الفراغ: (هنا ولا سفري؟ سفري لو سمحت.)",
          "options": [
            "outside",
            "for go",
            "to go"
          ],
          "correctIndex": 2,
          "answer": "For here or to go? — To go, please.",
          "explanationAr": "الإجابة: to go. I'd like + اسم / Can I have + اسم + please? والنادل يسأل: Anything else? For here or to go?"
        },
        {
          "id": "sc_207_m4",
          "type": "gap",
          "promptEn": "Complete: Can I pay ____?",
          "promptAr": "أكمل الفراغ: (أقدر أدفع بالبطاقة؟)",
          "options": [
            "by card",
            "with cash card",
            "in card"
          ],
          "correctIndex": 0,
          "answer": "Can I pay by card?",
          "explanationAr": "الإجابة: by card. I'd like + اسم / Can I have + اسم + please? والنادل يسأل: Anything else? For here or to go?"
        }
      ],
      "hard": [
        {
          "id": "sc_207_h1",
          "type": "order",
          "promptEn": "Put the words in order: sugar, / No / please.",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (بدون سكر لو سمحت.)",
          "answer": "No sugar, please.",
          "explanationAr": "الترتيب الصحيح: No sugar, please."
        },
        {
          "id": "sc_207_h2",
          "type": "order",
          "promptEn": "Put the words in order: we / Could / the / bill, / please? / have",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (ممكن الفاتورة لو سمحت؟)",
          "answer": "Could we have the bill, please?",
          "explanationAr": "الترتيب الصحيح: Could we have the bill, please?"
        },
        {
          "id": "sc_207_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: ممكن برجر دجاج؟",
          "answer": "Can I have a chicken burger?",
          "explanationAr": "ترجمة مقترحة: Can I have a chicken burger?"
        },
        {
          "id": "sc_207_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أقدر أدفع بالبطاقة؟",
          "answer": "Can I pay by card?",
          "explanationAr": "ترجمة مقترحة: Can I pay by card?"
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "I want water.",
        "correct": "Could I have some water, please?",
        "whyAr": "الإنجليز يعتبرون I want مباشرة زيادة في المطاعم."
      },
      {
        "incorrect": "One coffee without sugar for me.",
        "correct": "A coffee with no sugar, please.",
        "whyAr": "ترتيب أبسط وأطبع."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (الأرقام والأسعار والوقت): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "It's three hundred riyals.",
          "It's three riyals hundred.",
          "It's three hundreds riyals."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: It's three hundred riyals. — hundred بدون s بعد رقم.",
        "fromLessonId": "sc_206"
      },
      {
        "questionAr": "مراجعة (التعارف: اسمك ومن وين أنت): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'm from Saudi Arabia. / I'm Saudi.",
          "I'm from Arabia Saudi.",
          "I'm from Saudi."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I'm from Saudi Arabia. / I'm Saudi. — Saudi جنسية، و Saudi Arabia البلد.",
        "fromLessonId": "sc_204"
      },
      {
        "questionAr": "ما معنى \"example\"؟",
        "questionEn": "What does \"example\" mean?",
        "options": [
          "ببطء",
          "سؤال",
          "يفهم",
          "مثال"
        ],
        "correctIndex": 3,
        "explanationAr": "\"example\" /ɪɡˈzæmpəl/ تعني: مثال. مثال: Give me an example.",
        "fromLessonId": "sc_205"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (هنا ولا سفري؟ سفري لو سمحت.)",
          "questionEn": "Complete: For here or ____? — To go, please.",
          "options": [
            "outside",
            "for go",
            "to go"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: to go. I'd like + اسم / Can I have + اسم + please? والنادل يسأل: Anything else? For here or to go?"
        },
        {
          "questionAr": "أكمل الفراغ: (أقدر أدفع بالبطاقة؟)",
          "questionEn": "Complete: Can I pay ____?",
          "options": [
            "by card",
            "with cash card",
            "in card"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: by card. I'd like + اسم / Can I have + اسم + please? والنادل يسأل: Anything else? For here or to go?"
        },
        {
          "questionAr": "ما معنى \"to go\"؟",
          "questionEn": "What does \"to go\" mean?",
          "options": [
            "سفري",
            "إيصال",
            "كاش",
            "حار (طعم)"
          ],
          "correctIndex": 0,
          "explanationAr": "\"to go\" /tə ɡoʊ/ تعني: سفري. مثال: Two coffees to go."
        },
        {
          "questionAr": "ما معنى \"bill\"؟",
          "questionEn": "What does \"bill\" mean?",
          "options": [
            "حار (طعم)",
            "فاتورة",
            "إيصال",
            "سفري"
          ],
          "correctIndex": 1,
          "explanationAr": "\"bill\" /bɪl/ تعني: فاتورة. مثال: The bill, please."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Could I has some water, please?",
            "Could I have some water, please?",
            "I want water."
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: Could I have some water, please? — الإنجليز يعتبرون I want مباشرة زيادة في المطاعم."
        }
      ]
    }
  },
  {
    "id": "sc_208",
    "pillarId": "conversation",
    "pillarNameAr": "المحادثة والطلاقة التفاعلية",
    "pillarNameEn": "Active Conversation & Fluency Drills",
    "pillarIcon": "💬",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "السؤال عن الطريق",
    "titleEn": "Asking for and Giving Directions",
    "descAr": "اسأل عن مكان وافهم الاتجاهات: يمين، يسار، سيدا، عند الإشارة.",
    "descEn": "Ask where places are and follow directions: left, right, straight, at the traffic light.",
    "speakingGoalAr": "وصّف لسارة الطريق من بيتك لأقرب مسجد أو بقالة.",
    "speakingGoalEn": "Give directions from your home to the nearest mosque or shop.",
    "keyPattern": {
      "ruleAr": "Excuse me, where is...? / How do I get to...? والاتجاهات أوامر: Go straight, turn left, it's on your right.",
      "ruleEn": "Ask 'Excuse me, where is...?' and give directions with imperatives.",
      "formula": "Excuse me, how do I get to ...? → Go straight / Turn left at ... / It's on your right"
    },
    "practicalExamples": [
      {
        "en": "Excuse me, where is the pharmacy?",
        "ar": "لو سمحت، وين الصيدلية؟"
      },
      {
        "en": "Go straight and turn left at the traffic light.",
        "ar": "سيدا وبعدين يسار عند الإشارة."
      },
      {
        "en": "It's on your right, next to the bank.",
        "ar": "على يمينك، جنب البنك."
      },
      {
        "en": "The mosque is opposite the school.",
        "ar": "المسجد مقابل المدرسة."
      },
      {
        "en": "How do I get to the metro station?",
        "ar": "كيف أوصل لمحطة المترو؟"
      },
      {
        "en": "It's about five minutes on foot.",
        "ar": "تقريباً خمس دقايق مشي."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Where is the pharmacy, please me?",
        "correct": "Excuse me, where is the pharmacy?",
        "whyAr": "نبدأ بـ Excuse me."
      },
      {
        "incorrect": "Turn to left.",
        "correct": "Turn left.",
        "whyAr": "لا نضع to."
      },
      {
        "incorrect": "It's in front the bank.",
        "correct": "It's in front of the bank.",
        "whyAr": "in front of تحتاج of."
      }
    ],
    "speakingChallenge": {
      "promptAr": "وصّف لسارة الطريق لمكان قريب من بيتك.",
      "promptEn": "Give Sara directions to a place near your home.",
      "saraQuestionAr": "أنا عند باب بيتك. كيف أوصل لأقرب بقالة؟",
      "saraQuestionEn": "I'm at your door. How do I get to the nearest shop?",
      "recommendedResponseEn": "Go straight to the end of the street. Turn right at the mosque. The shop is on your left, next to the pharmacy. It's three minutes on foot."
    },
    "quiz": [
      {
        "questionAr": "مقابل =",
        "questionEn": "'مقابل' =",
        "options": [
          "next to",
          "opposite",
          "behind"
        ],
        "correctIndex": 1,
        "explanationAr": "opposite."
      },
      {
        "questionAr": "أكمل: ___ left at the corner.",
        "questionEn": "Complete: ___ left at the corner.",
        "options": [
          "Turn",
          "Go to",
          "Make"
        ],
        "correctIndex": 0,
        "explanationAr": "Turn left."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Where is the pharmacy, please me?",
          "Excuse me, where are the pharmacy?",
          "Excuse me, where is the pharmacy?"
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: Excuse me, where is the pharmacy? — نبدأ بـ Excuse me."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Turn left.",
          "Where is the pharmacy, please me?",
          "Turn to left."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Turn left. — لا نضع to."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "It's in front the bank.",
          "It's in front of the bank.",
          "It's in front of bank the."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: It's in front of the bank. — in front of تحتاج of."
      }
    ],
    "whiteboardNotes": {
      "title": "Asking for and Giving Directions",
      "pointsAr": [
        "يسأل عن مكان بأدب.",
        "يعطي اتجاهات بأفعال الأمر.",
        "يستخدم حروف المكان next to/opposite.",
        "Excuse me, where is...? / How do I get to...? والاتجاهات أوامر: Go straight, turn left, it's on your right."
      ],
      "pointsEn": [
        "Ask for a place politely.",
        "Give directions with imperatives.",
        "Use next to / opposite / between.",
        "Ask 'Excuse me, where is...?' and give directions with imperatives."
      ],
      "chalkHighlight": "Excuse me, how do I get to ...? → Go straight / Turn left at ... / It's on your right"
    },
    "unit": 2,
    "cefr": "A1",
    "objectivesAr": [
      "يسأل عن مكان بأدب.",
      "يعطي اتجاهات بأفعال الأمر.",
      "يستخدم حروف المكان next to/opposite."
    ],
    "objectivesEn": [
      "Ask for a place politely.",
      "Give directions with imperatives.",
      "Use next to / opposite / between."
    ],
    "vocabulary": [
      {
        "word": "straight",
        "ipa": "/streɪt/",
        "ar": "سيدا/مستقيم",
        "exampleEn": "Go straight.",
        "exampleAr": "روح سيدا."
      },
      {
        "word": "turn",
        "ipa": "/tɜːrn/",
        "ar": "يلف",
        "exampleEn": "Turn right.",
        "exampleAr": "لف يمين."
      },
      {
        "word": "left",
        "ipa": "/lɛft/",
        "ar": "يسار",
        "exampleEn": "on the left",
        "exampleAr": "على اليسار"
      },
      {
        "word": "right",
        "ipa": "/raɪt/",
        "ar": "يمين",
        "exampleEn": "on your right",
        "exampleAr": "على يمينك"
      },
      {
        "word": "traffic light",
        "ipa": "/ˈtræfɪk laɪt/",
        "ar": "إشارة مرور",
        "exampleEn": "at the traffic light",
        "exampleAr": "عند الإشارة"
      },
      {
        "word": "roundabout",
        "ipa": "/ˈraʊndəbaʊt/",
        "ar": "دوار",
        "exampleEn": "Take the second exit at the roundabout.",
        "exampleAr": "خذ المخرج الثاني من الدوار."
      },
      {
        "word": "next to",
        "ipa": "/nɛkst tuː/",
        "ar": "جنب",
        "exampleEn": "next to the mall",
        "exampleAr": "جنب المول"
      },
      {
        "word": "opposite",
        "ipa": "/ˈɑːpəzɪt/",
        "ar": "مقابل",
        "exampleEn": "opposite the park",
        "exampleAr": "مقابل الحديقة"
      },
      {
        "word": "corner",
        "ipa": "/ˈkɔːrnər/",
        "ar": "زاوية/ناصية",
        "exampleEn": "on the corner",
        "exampleAr": "على الزاوية"
      },
      {
        "word": "on foot",
        "ipa": "/ɑːn fʊt/",
        "ar": "مشياً",
        "exampleEn": "Ten minutes on foot.",
        "exampleAr": "عشر دقايق مشي."
      }
    ],
    "grammarFocus": {
      "ruleAr": "Excuse me, where is...? / How do I get to...? والاتجاهات أوامر: Go straight, turn left, it's on your right.",
      "ruleEn": "Ask 'Excuse me, where is...?' and give directions with imperatives.",
      "formula": "Excuse me, how do I get to ...? → Go straight / Turn left at ... / It's on your right",
      "examples": [
        {
          "en": "Excuse me, where is the pharmacy?",
          "ar": "لو سمحت، وين الصيدلية؟"
        },
        {
          "en": "Go straight and turn left at the traffic light.",
          "ar": "سيدا وبعدين يسار عند الإشارة."
        },
        {
          "en": "It's on your right, next to the bank.",
          "ar": "على يمينك، جنب البنك."
        },
        {
          "en": "The mosque is opposite the school.",
          "ar": "المسجد مقابل المدرسة."
        },
        {
          "en": "How do I get to the metro station?",
          "ar": "كيف أوصل لمحطة المترو؟"
        },
        {
          "en": "It's about five minutes on foot.",
          "ar": "تقريباً خمس دقايق مشي."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Student",
        "en": "Excuse me, how do I get to the metro station?",
        "ar": "لو سمحتي، كيف أوصل محطة المترو؟"
      },
      {
        "speaker": "Sara",
        "en": "Go straight to the roundabout.",
        "ar": "روح سيدا لين الدوار."
      },
      {
        "speaker": "Student",
        "en": "OK, and then?",
        "ar": "تمام، وبعدين؟"
      },
      {
        "speaker": "Sara",
        "en": "Take the second exit and turn left at the traffic light.",
        "ar": "خذ المخرج الثاني ولف يسار عند الإشارة."
      },
      {
        "speaker": "Student",
        "en": "Is it far?",
        "ar": "بعيدة؟"
      },
      {
        "speaker": "Sara",
        "en": "No, it's about ten minutes on foot. It's opposite the hospital.",
        "ar": "لا، تقريباً عشر دقايق مشي. مقابل المستشفى."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Student: Excuse me, how do I get to the metro station?\nSara: Go straight to the roundabout.\nStudent: OK, and then?\nSara: Take the second exit and turn left at the traffic light.\nStudent: Is it far?\nSara: No, it's about ten minutes on foot. It's opposite the hospital.",
      "questions": [
        {
          "questionAr": "وين يبي يروح؟",
          "questionEn": "Where does the student want to go?",
          "options": [
            "the mall",
            "the metro station",
            "the hospital"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: the metro station"
        },
        {
          "questionAr": "أي مخرج؟",
          "questionEn": "Which exit at the roundabout?",
          "options": [
            "first",
            "second",
            "third"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: second"
        },
        {
          "questionAr": "وش مقابل المحطة؟",
          "questionEn": "What is opposite the station?",
          "options": [
            "a school",
            "a hospital",
            "a bank"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: a hospital"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "/ɪ/ in left vs /aɪ/ in right; the R sound",
      "items": [
        "left /lɛft/",
        "right /raɪt/",
        "straight /streɪt/ (silent gh)"
      ],
      "tipAr": "في straight حروف gh صامتة: «ستريت». و R الإنجليزية ما تترعش مثل الراء العربية."
    },
    "exercises": {
      "easy": [
        {
          "id": "sc_208_e1",
          "type": "meaning",
          "promptEn": "What does \"straight\" mean?",
          "promptAr": "ما معنى \"straight\"؟",
          "options": [
            "يمين",
            "يلف",
            "إشارة مرور",
            "سيدا/مستقيم"
          ],
          "correctIndex": 3,
          "answer": "سيدا/مستقيم",
          "explanationAr": "\"straight\" /streɪt/ تعني: سيدا/مستقيم. مثال: Go straight."
        },
        {
          "id": "sc_208_e2",
          "type": "meaning",
          "promptEn": "What does \"turn\" mean?",
          "promptAr": "ما معنى \"turn\"؟",
          "options": [
            "يسار",
            "مشياً",
            "جنب",
            "يلف"
          ],
          "correctIndex": 3,
          "answer": "يلف",
          "explanationAr": "\"turn\" /tɜːrn/ تعني: يلف. مثال: Turn right."
        },
        {
          "id": "sc_208_e3",
          "type": "meaning",
          "promptEn": "What does \"left\" mean?",
          "promptAr": "ما معنى \"left\"؟",
          "options": [
            "زاوية/ناصية",
            "يلف",
            "جنب",
            "يسار"
          ],
          "correctIndex": 3,
          "answer": "يسار",
          "explanationAr": "\"left\" /lɛft/ تعني: يسار. مثال: on the left"
        },
        {
          "id": "sc_208_e4",
          "type": "meaning",
          "promptEn": "What does \"right\" mean?",
          "promptAr": "ما معنى \"right\"؟",
          "options": [
            "زاوية/ناصية",
            "يلف",
            "يمين",
            "مشياً"
          ],
          "correctIndex": 2,
          "answer": "يمين",
          "explanationAr": "\"right\" /raɪt/ تعني: يمين. مثال: on your right"
        }
      ],
      "medium": [
        {
          "id": "sc_208_m1",
          "type": "gap",
          "promptEn": "Complete: ____, where is the pharmacy?",
          "promptAr": "أكمل الفراغ: (لو سمحت، وين الصيدلية؟)",
          "options": [
            "Hey you",
            "Sorry me",
            "Excuse me"
          ],
          "correctIndex": 2,
          "answer": "Excuse me, where is the pharmacy?",
          "explanationAr": "الإجابة: Excuse me. Excuse me, where is...? / How do I get to...? والاتجاهات أوامر: Go straight, turn left, it's on your right."
        },
        {
          "id": "sc_208_m2",
          "type": "gap",
          "promptEn": "Complete: Go straight and ____ at the traffic light.",
          "promptAr": "أكمل الفراغ: (سيدا وبعدين يسار عند الإشارة.)",
          "options": [
            "turn on left",
            "turn left",
            "left turn"
          ],
          "correctIndex": 1,
          "answer": "Go straight and turn left at the traffic light.",
          "explanationAr": "الإجابة: turn left. Excuse me, where is...? / How do I get to...? والاتجاهات أوامر: Go straight, turn left, it's on your right."
        },
        {
          "id": "sc_208_m3",
          "type": "gap",
          "promptEn": "Complete: It's on your right, ____ the bank.",
          "promptAr": "أكمل الفراغ: (على يمينك، جنب البنك.)",
          "options": [
            "beside of",
            "near to",
            "next to"
          ],
          "correctIndex": 2,
          "answer": "It's on your right, next to the bank.",
          "explanationAr": "الإجابة: next to. Excuse me, where is...? / How do I get to...? والاتجاهات أوامر: Go straight, turn left, it's on your right."
        },
        {
          "id": "sc_208_m4",
          "type": "gap",
          "promptEn": "Complete: The mosque is ____ the school.",
          "promptAr": "أكمل الفراغ: (المسجد مقابل المدرسة.)",
          "options": [
            "opposite to",
            "front",
            "opposite"
          ],
          "correctIndex": 2,
          "answer": "The mosque is opposite the school.",
          "explanationAr": "الإجابة: opposite. Excuse me, where is...? / How do I get to...? والاتجاهات أوامر: Go straight, turn left, it's on your right."
        }
      ],
      "hard": [
        {
          "id": "sc_208_h1",
          "type": "order",
          "promptEn": "Put the words in order: station? / I / get / How / metro / to / the / do",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (كيف أوصل لمحطة المترو؟)",
          "answer": "How do I get to the metro station?",
          "explanationAr": "الترتيب الصحيح: How do I get to the metro station?"
        },
        {
          "id": "sc_208_h2",
          "type": "order",
          "promptEn": "Put the words in order: about / foot. / It's / five / on / minutes",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (تقريباً خمس دقايق مشي.)",
          "answer": "It's about five minutes on foot.",
          "explanationAr": "الترتيب الصحيح: It's about five minutes on foot."
        },
        {
          "id": "sc_208_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: سيدا وبعدين يسار عند الإشارة.",
          "answer": "Go straight and turn left at the traffic light.",
          "explanationAr": "ترجمة مقترحة: Go straight and turn left at the traffic light."
        },
        {
          "id": "sc_208_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: المسجد مقابل المدرسة.",
          "answer": "The mosque is opposite the school.",
          "explanationAr": "ترجمة مقترحة: The mosque is opposite the school."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Go straight until you will see the bank.",
        "correct": "Go straight until you see the bank.",
        "whyAr": "لا will بعد until."
      },
      {
        "incorrect": "Beside of the school.",
        "correct": "Next to the school.",
        "whyAr": "beside ما تأخذ of."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (طلب الطعام في الكافيه والمطعم): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'd like an large Spanish latte.",
          "I'd like a large Spanish latte.",
          "I want one Spanish latte big."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I'd like a large Spanish latte. — الحجم قبل الاسم.",
        "fromLessonId": "sc_207"
      },
      {
        "questionAr": "مراجعة (في الفصل: عبارات الطالب المهمة): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "What do 'busy' mean?",
          "What the meaning busy?",
          "What does 'busy' mean?"
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: What does 'busy' mean? — السؤال عن المعنى بـ What does ... mean?",
        "fromLessonId": "sc_205"
      },
      {
        "questionAr": "ما معنى \"cheap\"؟",
        "questionEn": "What does \"cheap\" mean?",
        "options": [
          "ألف",
          "رخيص",
          "ثلاثين",
          "سعر"
        ],
        "correctIndex": 1,
        "explanationAr": "\"cheap\" /tʃiːp/ تعني: رخيص. مثال: It's cheap.",
        "fromLessonId": "sc_206"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (على يمينك، جنب البنك.)",
          "questionEn": "Complete: It's on your right, ____ the bank.",
          "options": [
            "beside of",
            "near to",
            "next to"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: next to. Excuse me, where is...? / How do I get to...? والاتجاهات أوامر: Go straight, turn left, it's on your right."
        },
        {
          "questionAr": "أكمل الفراغ: (المسجد مقابل المدرسة.)",
          "questionEn": "Complete: The mosque is ____ the school.",
          "options": [
            "opposite to",
            "front",
            "opposite"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: opposite. Excuse me, where is...? / How do I get to...? والاتجاهات أوامر: Go straight, turn left, it's on your right."
        },
        {
          "questionAr": "ما معنى \"traffic light\"؟",
          "questionEn": "What does \"traffic light\" mean?",
          "options": [
            "جنب",
            "مشياً",
            "إشارة مرور",
            "سيدا/مستقيم"
          ],
          "correctIndex": 2,
          "explanationAr": "\"traffic light\" /ˈtræfɪk laɪt/ تعني: إشارة مرور. مثال: at the traffic light"
        },
        {
          "questionAr": "ما معنى \"roundabout\"؟",
          "questionEn": "What does \"roundabout\" mean?",
          "options": [
            "مقابل",
            "سيدا/مستقيم",
            "إشارة مرور",
            "دوار"
          ],
          "correctIndex": 3,
          "explanationAr": "\"roundabout\" /ˈraʊndəbaʊt/ تعني: دوار. مثال: Take the second exit at the roundabout."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Go straight until you will see the bank.",
            "Go straight until you see bank the.",
            "Go straight until you see the bank."
          ],
          "correctIndex": 2,
          "explanationAr": "الصحيح: Go straight until you see the bank. — لا will بعد until."
        }
      ]
    }
  },
  {
    "id": "sc_209",
    "pillarId": "conversation",
    "pillarNameAr": "المحادثة والطلاقة التفاعلية",
    "pillarNameEn": "Active Conversation & Fluency Drills",
    "pillarIcon": "💬",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "شراء الملابس: المقاسات والتجربة",
    "titleEn": "Shopping for Clothes: Sizes and Fitting Rooms",
    "descAr": "اسأل عن المقاس واللون وغرفة القياس، وقل إذا كان صغيراً أو كبيراً.",
    "descEn": "Ask for sizes and colours, use the fitting room, and say if it's too small or big.",
    "speakingGoalAr": "اشترِ قطعة ملابس من سارة البائعة.",
    "speakingGoalEn": "Buy a piece of clothing from Sara the shop assistant.",
    "keyPattern": {
      "ruleAr": "Do you have this in medium? / Can I try it on? / It's too small / It fits well. و too = أكثر من اللازم.",
      "ruleEn": "Ask 'Do you have this in...?', 'Can I try it on?'; use too + adjective.",
      "formula": "Do you have this in + size/colour? | Can I try it on? | It's too + adj"
    },
    "practicalExamples": [
      {
        "en": "Do you have this shirt in blue?",
        "ar": "عندك هالقميص بالأزرق؟"
      },
      {
        "en": "Can I try it on?",
        "ar": "أقدر أجربه؟"
      },
      {
        "en": "It's too small. Do you have a large?",
        "ar": "صغير مرة. عندك لارج؟"
      },
      {
        "en": "Where is the fitting room?",
        "ar": "وين غرفة القياس؟"
      },
      {
        "en": "These jeans fit perfectly.",
        "ar": "هالجينز مضبوط عليّ."
      },
      {
        "en": "Can I return it if it doesn't fit?",
        "ar": "أقدر أرجعه إذا ما ضبط؟"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Can I try on it?",
        "correct": "Can I try it on?",
        "whyAr": "الضمير بين try و on."
      },
      {
        "incorrect": "It's very small, I can't wear it.",
        "correct": "It's too small.",
        "whyAr": "too = زيادة عن اللازم (مشكلة)."
      },
      {
        "incorrect": "Do you have it with red?",
        "correct": "Do you have it in red?",
        "whyAr": "الألوان والمقاسات مع in."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اشترِ هدية ملابس لأخوك من محل سارة.",
      "promptEn": "Buy a clothing gift for your brother.",
      "saraQuestionAr": "أهلاً! تدور شي معين؟",
      "saraQuestionEn": "Hi! Looking for something?",
      "recommendedResponseEn": "Yes, I'm looking for a sports jacket for my brother. Do you have this in navy, size large? Can I return it if it doesn't fit?"
    },
    "quiz": [
      {
        "questionAr": "الجزمة ضيقة. تقول:",
        "questionEn": "Shoes are tight. You say:",
        "options": [
          "They're too tight.",
          "They're very fit.",
          "They're loose."
        ],
        "correctIndex": 0,
        "explanationAr": "too tight."
      },
      {
        "questionAr": "ترتيب صحيح:",
        "questionEn": "Correct order:",
        "options": [
          "Can I try on it?",
          "Can I try it on?",
          "Can I on try it?"
        ],
        "correctIndex": 1,
        "explanationAr": "try it on."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "It's very small, I can't wear it.",
          "Can I try it on?",
          "Can I try on it?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Can I try it on? — الضمير بين try و on."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "It's too small.",
          "It's very small, I can't wear it.",
          "It's small too."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: It's too small. — too = زيادة عن اللازم (مشكلة)."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Do you have it in red?",
          "Do you has it in red?",
          "Do you have it with red?"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Do you have it in red? — الألوان والمقاسات مع in."
      }
    ],
    "whiteboardNotes": {
      "title": "Shopping for Clothes: Sizes and Fitting Rooms",
      "pointsAr": [
        "يسأل عن المقاس واللون.",
        "يطلب التجربة.",
        "يستخدم too و fit.",
        "Do you have this in medium? / Can I try it on? / It's too small / It fits well. و too = أكثر من اللازم."
      ],
      "pointsEn": [
        "Ask about size and colour.",
        "Ask to try something on.",
        "Use too and fit.",
        "Ask 'Do you have this in...?', 'Can I try it on?'; use too + adjective."
      ],
      "chalkHighlight": "Do you have this in + size/colour? | Can I try it on? | It's too + adj"
    },
    "unit": 2,
    "cefr": "A1",
    "objectivesAr": [
      "يسأل عن المقاس واللون.",
      "يطلب التجربة.",
      "يستخدم too و fit."
    ],
    "objectivesEn": [
      "Ask about size and colour.",
      "Ask to try something on.",
      "Use too and fit."
    ],
    "vocabulary": [
      {
        "word": "size",
        "ipa": "/saɪz/",
        "ar": "مقاس",
        "exampleEn": "What size are you?",
        "exampleAr": "وش مقاسك؟"
      },
      {
        "word": "small",
        "ipa": "/smɔːl/",
        "ar": "صغير",
        "exampleEn": "a small T-shirt",
        "exampleAr": "تيشيرت صغير"
      },
      {
        "word": "try on",
        "ipa": "/traɪ ɑːn/",
        "ar": "يجرّب (لبس)",
        "exampleEn": "Try it on!",
        "exampleAr": "جربه!"
      },
      {
        "word": "fit",
        "ipa": "/fɪt/",
        "ar": "يضبط (مقاس)",
        "exampleEn": "It fits well.",
        "exampleAr": "ضابط."
      },
      {
        "word": "fitting room",
        "ipa": "/ˈfɪtɪŋ ruːm/",
        "ar": "غرفة القياس",
        "exampleEn": "The fitting room is there.",
        "exampleAr": "غرفة القياس هناك."
      },
      {
        "word": "return",
        "ipa": "/rɪˈtɜːrn/",
        "ar": "يرجّع",
        "exampleEn": "I want to return this.",
        "exampleAr": "أبي أرجع هذا."
      },
      {
        "word": "discount",
        "ipa": "/ˈdɪskaʊnt/",
        "ar": "خصم",
        "exampleEn": "Is there a discount?",
        "exampleAr": "فيه خصم؟"
      },
      {
        "word": "loose",
        "ipa": "/luːs/",
        "ar": "واسع",
        "exampleEn": "It's too loose.",
        "exampleAr": "واسع مرة."
      },
      {
        "word": "tight",
        "ipa": "/taɪt/",
        "ar": "ضيق",
        "exampleEn": "These shoes are tight.",
        "exampleAr": "الجزمة ضيقة."
      },
      {
        "word": "thobe",
        "ipa": "/θoʊb/",
        "ar": "ثوب",
        "exampleEn": "a white thobe",
        "exampleAr": "ثوب أبيض"
      }
    ],
    "grammarFocus": {
      "ruleAr": "Do you have this in medium? / Can I try it on? / It's too small / It fits well. و too = أكثر من اللازم.",
      "ruleEn": "Ask 'Do you have this in...?', 'Can I try it on?'; use too + adjective.",
      "formula": "Do you have this in + size/colour? | Can I try it on? | It's too + adj",
      "examples": [
        {
          "en": "Do you have this shirt in blue?",
          "ar": "عندك هالقميص بالأزرق؟"
        },
        {
          "en": "Can I try it on?",
          "ar": "أقدر أجربه؟"
        },
        {
          "en": "It's too small. Do you have a large?",
          "ar": "صغير مرة. عندك لارج؟"
        },
        {
          "en": "Where is the fitting room?",
          "ar": "وين غرفة القياس؟"
        },
        {
          "en": "These jeans fit perfectly.",
          "ar": "هالجينز مضبوط عليّ."
        },
        {
          "en": "Can I return it if it doesn't fit?",
          "ar": "أقدر أرجعه إذا ما ضبط؟"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Can I help you?",
        "ar": "أقدر أساعدك؟"
      },
      {
        "speaker": "Student",
        "en": "Yes, do you have this jacket in black?",
        "ar": "إيه، عندك هالجاكيت بالأسود؟"
      },
      {
        "speaker": "Sara",
        "en": "Yes. What size?",
        "ar": "إيه. أي مقاس؟"
      },
      {
        "speaker": "Student",
        "en": "Medium. Can I try it on?",
        "ar": "ميديم. أقدر أجربه؟"
      },
      {
        "speaker": "Sara",
        "en": "Of course. The fitting room is on the left.",
        "ar": "أكيد. غرفة القياس على اليسار."
      },
      {
        "speaker": "Student",
        "en": "It's a bit tight. Do you have a large?",
        "ar": "ضيق شوي. عندك لارج؟"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Can I help you?\nStudent: Yes, do you have this jacket in black?\nSara: Yes. What size?\nStudent: Medium. Can I try it on?\nSara: Of course. The fitting room is on the left.\nStudent: It's a bit tight. Do you have a large?",
      "questions": [
        {
          "questionAr": "وش يبي؟",
          "questionEn": "What does the student want?",
          "options": [
            "a shirt",
            "a jacket",
            "shoes"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: a jacket"
        },
        {
          "questionAr": "أي لون؟",
          "questionEn": "What colour?",
          "options": [
            "blue",
            "black",
            "white"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: black"
        },
        {
          "questionAr": "وش مشكلة الميديم؟",
          "questionEn": "What's the problem with the medium?",
          "options": [
            "too loose",
            "a bit tight",
            "wrong colour"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: a bit tight"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Linking 'try it on' /traɪɪˈtɑːn/",
      "items": [
        "try it on /traɪ ɪt ɑːn/",
        "fit /fɪt/ vs feet /fiːt/",
        "size /saɪz/"
      ],
      "tipAr": "اربط الكلمات: try it on = «ترايِتَان»."
    },
    "exercises": {
      "easy": [
        {
          "id": "sc_209_e1",
          "type": "meaning",
          "promptEn": "What does \"size\" mean?",
          "promptAr": "ما معنى \"size\"؟",
          "options": [
            "يجرّب (لبس)",
            "مقاس",
            "صغير",
            "غرفة القياس"
          ],
          "correctIndex": 1,
          "answer": "مقاس",
          "explanationAr": "\"size\" /saɪz/ تعني: مقاس. مثال: What size are you?"
        },
        {
          "id": "sc_209_e2",
          "type": "meaning",
          "promptEn": "What does \"small\" mean?",
          "promptAr": "ما معنى \"small\"؟",
          "options": [
            "غرفة القياس",
            "صغير",
            "يضبط (مقاس)",
            "يجرّب (لبس)"
          ],
          "correctIndex": 1,
          "answer": "صغير",
          "explanationAr": "\"small\" /smɔːl/ تعني: صغير. مثال: a small T-shirt"
        },
        {
          "id": "sc_209_e3",
          "type": "meaning",
          "promptEn": "What does \"try on\" mean?",
          "promptAr": "ما معنى \"try on\"؟",
          "options": [
            "يرجّع",
            "يجرّب (لبس)",
            "خصم",
            "واسع"
          ],
          "correctIndex": 1,
          "answer": "يجرّب (لبس)",
          "explanationAr": "\"try on\" /traɪ ɑːn/ تعني: يجرّب (لبس). مثال: Try it on!"
        },
        {
          "id": "sc_209_e4",
          "type": "meaning",
          "promptEn": "What does \"fit\" mean?",
          "promptAr": "ما معنى \"fit\"؟",
          "options": [
            "خصم",
            "يضبط (مقاس)",
            "ثوب",
            "غرفة القياس"
          ],
          "correctIndex": 1,
          "answer": "يضبط (مقاس)",
          "explanationAr": "\"fit\" /fɪt/ تعني: يضبط (مقاس). مثال: It fits well."
        }
      ],
      "medium": [
        {
          "id": "sc_209_m1",
          "type": "gap",
          "promptEn": "Complete: Do you have this shirt ____?",
          "promptAr": "أكمل الفراغ: (عندك هالقميص بالأزرق؟)",
          "options": [
            "on blue",
            "in blue",
            "with blue"
          ],
          "correctIndex": 1,
          "answer": "Do you have this shirt in blue?",
          "explanationAr": "الإجابة: in blue. Do you have this in medium? / Can I try it on? / It's too small / It fits well. و too = أكثر من اللازم."
        },
        {
          "id": "sc_209_m2",
          "type": "gap",
          "promptEn": "Complete: Can I ____?",
          "promptAr": "أكمل الفراغ: (أقدر أجربه؟)",
          "options": [
            "try it on",
            "try on it",
            "test it"
          ],
          "correctIndex": 0,
          "answer": "Can I try it on?",
          "explanationAr": "الإجابة: try it on. Do you have this in medium? / Can I try it on? / It's too small / It fits well. و too = أكثر من اللازم."
        },
        {
          "id": "sc_209_m3",
          "type": "gap",
          "promptEn": "Complete: It's ____ small. Do you have a large?",
          "promptAr": "أكمل الفراغ: (صغير مرة. عندك لارج؟)",
          "options": [
            "so much",
            "very",
            "too"
          ],
          "correctIndex": 2,
          "answer": "It's too small. Do you have a large?",
          "explanationAr": "الإجابة: too. Do you have this in medium? / Can I try it on? / It's too small / It fits well. و too = أكثر من اللازم."
        },
        {
          "id": "sc_209_m4",
          "type": "gap",
          "promptEn": "Complete: Where is the ____?",
          "promptAr": "أكمل الفراغ: (وين غرفة القياس؟)",
          "options": [
            "test room",
            "change room for",
            "fitting room"
          ],
          "correctIndex": 2,
          "answer": "Where is the fitting room?",
          "explanationAr": "الإجابة: fitting room. Do you have this in medium? / Can I try it on? / It's too small / It fits well. و too = أكثر من اللازم."
        }
      ],
      "hard": [
        {
          "id": "sc_209_h1",
          "type": "order",
          "promptEn": "Put the words in order: perfectly. / jeans / These / fit",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (هالجينز مضبوط عليّ.)",
          "answer": "These jeans fit perfectly.",
          "explanationAr": "الترتيب الصحيح: These jeans fit perfectly."
        },
        {
          "id": "sc_209_h2",
          "type": "order",
          "promptEn": "Put the words in order: doesn't / if / fit? / I / it / it / return / Can",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (أقدر أرجعه إذا ما ضبط؟)",
          "answer": "Can I return it if it doesn't fit?",
          "explanationAr": "الترتيب الصحيح: Can I return it if it doesn't fit?"
        },
        {
          "id": "sc_209_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أقدر أجربه؟",
          "answer": "Can I try it on?",
          "explanationAr": "ترجمة مقترحة: Can I try it on?"
        },
        {
          "id": "sc_209_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: وين غرفة القياس؟",
          "answer": "Where is the fitting room?",
          "explanationAr": "ترجمة مقترحة: Where is the fitting room?"
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "This is very expensive, I don't buy.",
        "correct": "It's too expensive for me.",
        "whyAr": "too تعبر عن المشكلة، و I don't buy ترجمة حرفية."
      },
      {
        "incorrect": "Give me size large.",
        "correct": "Can I have it in large, please?",
        "whyAr": "أسلوب أطيب."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (السؤال عن الطريق): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Turn to left.",
          "Turn left.",
          "Can I try on it?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Turn left. — لا نضع to.",
        "fromLessonId": "sc_208"
      },
      {
        "questionAr": "مراجعة (الأرقام والأسعار والوقت): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "How much is this?",
          "How much this?",
          "How much are this?"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: How much is this? — لا تحذف is.",
        "fromLessonId": "sc_206"
      },
      {
        "questionAr": "مراجعة (التحية والسلام): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Can I try on it?",
          "Good night! (when arriving in the evening)",
          "Good evening!"
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: Good evening! — Good night للوداع أو قبل النوم فقط.",
        "fromLessonId": "sc_201"
      },
      {
        "questionAr": "ما معنى \"receipt\"؟",
        "questionEn": "What does \"receipt\" mean?",
        "options": [
          "يطلب/طلب",
          "سفري",
          "فاتورة",
          "إيصال"
        ],
        "correctIndex": 3,
        "explanationAr": "\"receipt\" /rɪˈsiːt/ تعني: إيصال. مثال: Can I have the receipt?",
        "fromLessonId": "sc_207"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (صغير مرة. عندك لارج؟)",
          "questionEn": "Complete: It's ____ small. Do you have a large?",
          "options": [
            "so much",
            "very",
            "too"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: too. Do you have this in medium? / Can I try it on? / It's too small / It fits well. و too = أكثر من اللازم."
        },
        {
          "questionAr": "أكمل الفراغ: (وين غرفة القياس؟)",
          "questionEn": "Complete: Where is the ____?",
          "options": [
            "test room",
            "change room for",
            "fitting room"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: fitting room. Do you have this in medium? / Can I try it on? / It's too small / It fits well. و too = أكثر من اللازم."
        },
        {
          "questionAr": "ما معنى \"fitting room\"؟",
          "questionEn": "What does \"fitting room\" mean?",
          "options": [
            "صغير",
            "خصم",
            "غرفة القياس",
            "ضيق"
          ],
          "correctIndex": 2,
          "explanationAr": "\"fitting room\" /ˈfɪtɪŋ ruːm/ تعني: غرفة القياس. مثال: The fitting room is there."
        },
        {
          "questionAr": "ما معنى \"return\"؟",
          "questionEn": "What does \"return\" mean?",
          "options": [
            "صغير",
            "مقاس",
            "يرجّع",
            "واسع"
          ],
          "correctIndex": 2,
          "explanationAr": "\"return\" /rɪˈtɜːrn/ تعني: يرجّع. مثال: I want to return this."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "It's too expensive me for.",
            "It's too expensive for me.",
            "This is very expensive, I don't buy."
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: It's too expensive for me. — too تعبر عن المشكلة، و I don't buy ترجمة حرفية."
        }
      ]
    }
  },
  {
    "id": "sc_210",
    "pillarId": "conversation",
    "pillarNameAr": "المحادثة والطلاقة التفاعلية",
    "pillarNameEn": "Active Conversation & Fluency Drills",
    "pillarIcon": "💬",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "الهوايات ووقت الفراغ",
    "titleEn": "Hobbies and Free Time",
    "descAr": "تكلم عن هواياتك واسأل غيرك: What do you do in your free time?",
    "descEn": "Talk about hobbies and ask others about theirs.",
    "speakingGoalAr": "تبادل مع سارة ثلاث هوايات مع التفاصيل.",
    "speakingGoalEn": "Exchange three hobbies with details.",
    "keyPattern": {
      "ruleAr": "like/love/enjoy + فعل ing: I love swimming. وأسئلة: What do you do in your free time? Do you like...?",
      "ruleEn": "like/love/enjoy + -ing; ask 'What do you do in your free time?'.",
      "formula": "I like/love/enjoy + V-ing | I'm into + noun | What do you do in your free time?"
    },
    "practicalExamples": [
      {
        "en": "I love playing padel with my friends.",
        "ar": "أحب ألعب بادل مع ربعي."
      },
      {
        "en": "What do you do in your free time?",
        "ar": "وش تسوي في وقت فراغك؟"
      },
      {
        "en": "She enjoys reading novels.",
        "ar": "تستمتع بقراءة الروايات."
      },
      {
        "en": "I'm really into photography.",
        "ar": "أنا مهتم مرة بالتصوير."
      },
      {
        "en": "I'm not a big fan of video games.",
        "ar": "ما أحب ألعاب الفيديو كثير."
      },
      {
        "en": "How often do you go fishing?",
        "ar": "كم مرة تطلع تصيد؟"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "I enjoy to swim.",
        "correct": "I enjoy swimming.",
        "whyAr": "enjoy + ing دائماً."
      },
      {
        "incorrect": "My hobby is play football.",
        "correct": "My hobby is playing football.",
        "whyAr": "بعد is نحتاج ing."
      },
      {
        "incorrect": "I like very much reading.",
        "correct": "I really like reading.",
        "whyAr": "very much في الآخر أو really قبل الفعل."
      }
    ],
    "speakingChallenge": {
      "promptAr": "أخبر سارة عن هواياتك واسألها عن هواياتها.",
      "promptEn": "Tell Sara about your hobbies and ask about hers.",
      "saraQuestionAr": "وش تحب تسوي في وقت فراغك؟",
      "saraQuestionEn": "What do you like doing in your free time?",
      "recommendedResponseEn": "I love playing football and I'm into cooking. I'm not a big fan of shopping. What about you? What do you do in your free time?"
    },
    "quiz": [
      {
        "questionAr": "أكمل: I enjoy ___ to music.",
        "questionEn": "Complete: I enjoy ___ to music.",
        "options": [
          "listen",
          "listening",
          "to listen"
        ],
        "correctIndex": 1,
        "explanationAr": "enjoy + ing."
      },
      {
        "questionAr": "«مهتم بـ» بالعامية الإنجليزية:",
        "questionEn": "Informal 'interested in':",
        "options": [
          "into",
          "onto",
          "in to"
        ],
        "correctIndex": 0,
        "explanationAr": "I'm into..."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I enjoy to swim.",
          "I enjoy swimming.",
          "I swimming enjoy."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I enjoy swimming. — enjoy + ing دائماً."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "My hobby are playing football.",
          "My hobby is playing football.",
          "My hobby is play football."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: My hobby is playing football. — بعد is نحتاج ing."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I like very much reading.",
          "I really like reading.",
          "I really reading like."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I really like reading. — very much في الآخر أو really قبل الفعل."
      }
    ],
    "whiteboardNotes": {
      "title": "Hobbies and Free Time",
      "pointsAr": [
        "يعبر عن الهوايات بـ like + ing.",
        "يسأل سؤال متابعة.",
        "يعبر عن عدم الإعجاب بأدب.",
        "like/love/enjoy + فعل ing: I love swimming. وأسئلة: What do you do in your free time? Do you like...?"
      ],
      "pointsEn": [
        "Talk about hobbies with like + -ing.",
        "Ask follow-up questions.",
        "Express dislikes politely.",
        "like/love/enjoy + -ing; ask 'What do you do in your free time?'."
      ],
      "chalkHighlight": "I like/love/enjoy + V-ing | I'm into + noun | What do you do in your free time?"
    },
    "unit": 2,
    "cefr": "A1",
    "objectivesAr": [
      "يعبر عن الهوايات بـ like + ing.",
      "يسأل سؤال متابعة.",
      "يعبر عن عدم الإعجاب بأدب."
    ],
    "objectivesEn": [
      "Talk about hobbies with like + -ing.",
      "Ask follow-up questions.",
      "Express dislikes politely."
    ],
    "vocabulary": [
      {
        "word": "hobby",
        "ipa": "/ˈhɑːbi/",
        "ar": "هواية",
        "exampleEn": "What's your hobby?",
        "exampleAr": "وش هوايتك؟"
      },
      {
        "word": "free time",
        "ipa": "/friː taɪm/",
        "ar": "وقت الفراغ",
        "exampleEn": "in my free time",
        "exampleAr": "في وقت فراغي"
      },
      {
        "word": "enjoy",
        "ipa": "/ɪnˈdʒɔɪ/",
        "ar": "يستمتع",
        "exampleEn": "I enjoy cooking.",
        "exampleAr": "أستمتع بالطبخ."
      },
      {
        "word": "photography",
        "ipa": "/fəˈtɑːɡrəfi/",
        "ar": "التصوير",
        "exampleEn": "I'm into photography.",
        "exampleAr": "مهتم بالتصوير."
      },
      {
        "word": "fishing",
        "ipa": "/ˈfɪʃɪŋ/",
        "ar": "صيد السمك",
        "exampleEn": "We go fishing in Yanbu.",
        "exampleAr": "نصيد في ينبع."
      },
      {
        "word": "camping",
        "ipa": "/ˈkæmpɪŋ/",
        "ar": "التخييم/الكشتة",
        "exampleEn": "I love camping.",
        "exampleAr": "أحب الكشتات."
      },
      {
        "word": "novel",
        "ipa": "/ˈnɑːvəl/",
        "ar": "رواية",
        "exampleEn": "a great novel",
        "exampleAr": "رواية رهيبة"
      },
      {
        "word": "gaming",
        "ipa": "/ˈɡeɪmɪŋ/",
        "ar": "الألعاب الإلكترونية",
        "exampleEn": "He's into gaming.",
        "exampleAr": "يحب القيمز."
      },
      {
        "word": "falconry",
        "ipa": "/ˈfælkənri/",
        "ar": "الصقارة",
        "exampleEn": "My uncle loves falconry.",
        "exampleAr": "عمي يحب المقناص."
      },
      {
        "word": "gym",
        "ipa": "/dʒɪm/",
        "ar": "النادي",
        "exampleEn": "I go to the gym.",
        "exampleAr": "أروح النادي."
      }
    ],
    "grammarFocus": {
      "ruleAr": "like/love/enjoy + فعل ing: I love swimming. وأسئلة: What do you do in your free time? Do you like...?",
      "ruleEn": "like/love/enjoy + -ing; ask 'What do you do in your free time?'.",
      "formula": "I like/love/enjoy + V-ing | I'm into + noun | What do you do in your free time?",
      "examples": [
        {
          "en": "I love playing padel with my friends.",
          "ar": "أحب ألعب بادل مع ربعي."
        },
        {
          "en": "What do you do in your free time?",
          "ar": "وش تسوي في وقت فراغك؟"
        },
        {
          "en": "She enjoys reading novels.",
          "ar": "تستمتع بقراءة الروايات."
        },
        {
          "en": "I'm really into photography.",
          "ar": "أنا مهتم مرة بالتصوير."
        },
        {
          "en": "I'm not a big fan of video games.",
          "ar": "ما أحب ألعاب الفيديو كثير."
        },
        {
          "en": "How often do you go fishing?",
          "ar": "كم مرة تطلع تصيد؟"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "What do you do in your free time?",
        "ar": "وش تسوي في وقت فراغك؟"
      },
      {
        "speaker": "Student",
        "en": "I love camping in winter and I'm into photography.",
        "ar": "أحب الكشتات في الشتاء ومهتم بالتصوير."
      },
      {
        "speaker": "Sara",
        "en": "Cool! What do you photograph?",
        "ar": "حلو! وش تصور؟"
      },
      {
        "speaker": "Student",
        "en": "Mostly the desert and the stars at night.",
        "ar": "غالباً البر والنجوم بالليل."
      },
      {
        "speaker": "Sara",
        "en": "Do you like gaming too?",
        "ar": "تحب القيمز بعد؟"
      },
      {
        "speaker": "Student",
        "en": "Not really. I'm not a big fan of video games.",
        "ar": "مو مرة. ما أحب ألعاب الفيديو كثير."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: What do you do in your free time?\nStudent: I love camping in winter and I'm into photography.\nSara: Cool! What do you photograph?\nStudent: Mostly the desert and the stars at night.\nSara: Do you like gaming too?\nStudent: Not really. I'm not a big fan of video games.",
      "questions": [
        {
          "questionAr": "متى يكشت؟",
          "questionEn": "When does the student go camping?",
          "options": [
            "summer",
            "winter",
            "spring"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: winter"
        },
        {
          "questionAr": "وش يصور؟",
          "questionEn": "What does he photograph?",
          "options": [
            "people",
            "the desert and stars",
            "food"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: the desert and stars"
        },
        {
          "questionAr": "يحب القيمز؟",
          "questionEn": "Does he like gaming?",
          "options": [
            "I enjoy to swim.",
            "Yes, a lot",
            "Not really"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: Not really"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Word stress: phoTOGraphy vs PHOtograph",
      "items": [
        "PHOtograph /ˈfoʊtəɡræf/",
        "phoTOGraphy /fəˈtɑːɡrəfi/",
        "photoGRAPHic"
      ],
      "tipAr": "الضغط يتحرك حسب الكلمة. photography ضغطها على TOG."
    },
    "exercises": {
      "easy": [
        {
          "id": "sc_210_e1",
          "type": "meaning",
          "promptEn": "What does \"hobby\" mean?",
          "promptAr": "ما معنى \"hobby\"؟",
          "options": [
            "يستمتع",
            "الصقارة",
            "هواية",
            "صيد السمك"
          ],
          "correctIndex": 2,
          "answer": "هواية",
          "explanationAr": "\"hobby\" /ˈhɑːbi/ تعني: هواية. مثال: What's your hobby?"
        },
        {
          "id": "sc_210_e2",
          "type": "meaning",
          "promptEn": "What does \"free time\" mean?",
          "promptAr": "ما معنى \"free time\"؟",
          "options": [
            "التصوير",
            "رواية",
            "يستمتع",
            "وقت الفراغ"
          ],
          "correctIndex": 3,
          "answer": "وقت الفراغ",
          "explanationAr": "\"free time\" /friː taɪm/ تعني: وقت الفراغ. مثال: in my free time"
        },
        {
          "id": "sc_210_e3",
          "type": "meaning",
          "promptEn": "What does \"enjoy\" mean?",
          "promptAr": "ما معنى \"enjoy\"؟",
          "options": [
            "الألعاب الإلكترونية",
            "يستمتع",
            "صيد السمك",
            "التصوير"
          ],
          "correctIndex": 1,
          "answer": "يستمتع",
          "explanationAr": "\"enjoy\" /ɪnˈdʒɔɪ/ تعني: يستمتع. مثال: I enjoy cooking."
        },
        {
          "id": "sc_210_e4",
          "type": "meaning",
          "promptEn": "What does \"photography\" mean?",
          "promptAr": "ما معنى \"photography\"؟",
          "options": [
            "يستمتع",
            "التصوير",
            "رواية",
            "وقت الفراغ"
          ],
          "correctIndex": 1,
          "answer": "التصوير",
          "explanationAr": "\"photography\" /fəˈtɑːɡrəfi/ تعني: التصوير. مثال: I'm into photography."
        }
      ],
      "medium": [
        {
          "id": "sc_210_m1",
          "type": "gap",
          "promptEn": "Complete: I love ____ padel with my friends.",
          "promptAr": "أكمل الفراغ: (أحب ألعب بادل مع ربعي.)",
          "options": [
            "playing",
            "play",
            "to playing"
          ],
          "correctIndex": 0,
          "answer": "I love playing padel with my friends.",
          "explanationAr": "الإجابة: playing. like/love/enjoy + فعل ing: I love swimming. وأسئلة: What do you do in your free time? Do you like...?"
        },
        {
          "id": "sc_210_m2",
          "type": "gap",
          "promptEn": "Complete: What do you do in your ____?",
          "promptAr": "أكمل الفراغ: (وش تسوي في وقت فراغك؟)",
          "options": [
            "free time",
            "free times",
            "empty time"
          ],
          "correctIndex": 0,
          "answer": "What do you do in your free time?",
          "explanationAr": "الإجابة: free time. like/love/enjoy + فعل ing: I love swimming. وأسئلة: What do you do in your free time? Do you like...?"
        },
        {
          "id": "sc_210_m3",
          "type": "gap",
          "promptEn": "Complete: She ____ novels.",
          "promptAr": "أكمل الفراغ: (تستمتع بقراءة الروايات.)",
          "options": [
            "enjoy read",
            "enjoys reading",
            "enjoys to read"
          ],
          "correctIndex": 1,
          "answer": "She enjoys reading novels.",
          "explanationAr": "الإجابة: enjoys reading. like/love/enjoy + فعل ing: I love swimming. وأسئلة: What do you do in your free time? Do you like...?"
        },
        {
          "id": "sc_210_m4",
          "type": "gap",
          "promptEn": "Complete: I'm really ____ photography.",
          "promptAr": "أكمل الفراغ: (أنا مهتم مرة بالتصوير.)",
          "options": [
            "on",
            "into",
            "in"
          ],
          "correctIndex": 1,
          "answer": "I'm really into photography.",
          "explanationAr": "الإجابة: into. like/love/enjoy + فعل ing: I love swimming. وأسئلة: What do you do in your free time? Do you like...?"
        }
      ],
      "hard": [
        {
          "id": "sc_210_h1",
          "type": "order",
          "promptEn": "Put the words in order: a / big / games. / of / I'm / fan / video / not",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (ما أحب ألعاب الفيديو كثير.)",
          "answer": "I'm not a big fan of video games.",
          "explanationAr": "الترتيب الصحيح: I'm not a big fan of video games."
        },
        {
          "id": "sc_210_h2",
          "type": "order",
          "promptEn": "Put the words in order: do / go / How / fishing? / often / you",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (كم مرة تطلع تصيد؟)",
          "answer": "How often do you go fishing?",
          "explanationAr": "الترتيب الصحيح: How often do you go fishing?"
        },
        {
          "id": "sc_210_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: وش تسوي في وقت فراغك؟",
          "answer": "What do you do in your free time?",
          "explanationAr": "ترجمة مقترحة: What do you do in your free time?"
        },
        {
          "id": "sc_210_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أنا مهتم مرة بالتصوير.",
          "answer": "I'm really into photography.",
          "explanationAr": "ترجمة مقترحة: I'm really into photography."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "I like the football.",
        "correct": "I like football.",
        "whyAr": "الهوايات العامة بدون the."
      },
      {
        "incorrect": "I am hobby reading.",
        "correct": "My hobby is reading. / I like reading.",
        "whyAr": "ترجمة حرفية."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (شراء الملابس: المقاسات والتجربة): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "It's very small, I can't wear it.",
          "It's small too.",
          "It's too small."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: It's too small. — too = زيادة عن اللازم (مشكلة).",
        "fromLessonId": "sc_209"
      },
      {
        "questionAr": "مراجعة (طلب الطعام في الكافيه والمطعم): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Can I have a coffee, please?",
          "Can I has a coffee, please?",
          "Give me coffee."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Can I have a coffee, please? — Give me تبدو فظة بالإنجليزي.",
        "fromLessonId": "sc_207"
      },
      {
        "questionAr": "مراجعة (التعارف: اسمك ومن وين أنت): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'm from Saudi.",
          "I'm from Arabia Saudi.",
          "I'm from Saudi Arabia. / I'm Saudi."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: I'm from Saudi Arabia. / I'm Saudi. — Saudi جنسية، و Saudi Arabia البلد.",
        "fromLessonId": "sc_204"
      },
      {
        "questionAr": "ما معنى \"on foot\"؟",
        "questionEn": "What does \"on foot\" mean?",
        "options": [
          "يمين",
          "مشياً",
          "سيدا/مستقيم",
          "يسار"
        ],
        "correctIndex": 1,
        "explanationAr": "\"on foot\" /ɑːn fʊt/ تعني: مشياً. مثال: Ten minutes on foot.",
        "fromLessonId": "sc_208"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (تستمتع بقراءة الروايات.)",
          "questionEn": "Complete: She ____ novels.",
          "options": [
            "enjoy read",
            "enjoys reading",
            "enjoys to read"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: enjoys reading. like/love/enjoy + فعل ing: I love swimming. وأسئلة: What do you do in your free time? Do you like...?"
        },
        {
          "questionAr": "أكمل الفراغ: (أنا مهتم مرة بالتصوير.)",
          "questionEn": "Complete: I'm really ____ photography.",
          "options": [
            "on",
            "into",
            "in"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: into. like/love/enjoy + فعل ing: I love swimming. وأسئلة: What do you do in your free time? Do you like...?"
        },
        {
          "questionAr": "ما معنى \"fishing\"؟",
          "questionEn": "What does \"fishing\" mean?",
          "options": [
            "صيد السمك",
            "التصوير",
            "يستمتع",
            "الألعاب الإلكترونية"
          ],
          "correctIndex": 0,
          "explanationAr": "\"fishing\" /ˈfɪʃɪŋ/ تعني: صيد السمك. مثال: We go fishing in Yanbu."
        },
        {
          "questionAr": "ما معنى \"camping\"؟",
          "questionEn": "What does \"camping\" mean?",
          "options": [
            "صيد السمك",
            "رواية",
            "التصوير",
            "التخييم/الكشتة"
          ],
          "correctIndex": 3,
          "explanationAr": "\"camping\" /ˈkæmpɪŋ/ تعني: التخييم/الكشتة. مثال: I love camping."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "I like football.",
            "I football like.",
            "I like the football."
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: I like football. — الهوايات العامة بدون the."
        }
      ]
    }
  },
  {
    "id": "sc_211_s",
    "pillarId": "conversation",
    "pillarNameAr": "المحادثة والطلاقة التفاعلية",
    "pillarNameEn": "Active Conversation & Fluency Drills",
    "pillarIcon": "💬",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "الدعوات والمواعيد",
    "titleEn": "Invitations and Making Plans",
    "descAr": "اعزم صديقك، اقبل أو اعتذر بأدب، واتفق على الوقت والمكان.",
    "descEn": "Invite a friend, accept or decline politely, and agree on time and place.",
    "speakingGoalAr": "رتّب طلعة مع سارة: المكان والوقت.",
    "speakingGoalEn": "Arrange an outing with Sara: place and time.",
    "keyPattern": {
      "ruleAr": "Would you like to + فعل؟ / Do you want to...? / How about...? والقبول: I'd love to! والاعتذار: Sorry, I can't. I have to...",
      "ruleEn": "Invite with Would you like to...? Accept: I'd love to. Decline: Sorry, I can't + reason.",
      "formula": "Would you like to + verb? → I'd love to! / Sorry, I can't. I have to ..."
    },
    "practicalExamples": [
      {
        "en": "Would you like to come to my house on Friday?",
        "ar": "تحب تجي بيتنا يوم الجمعة؟"
      },
      {
        "en": "I'd love to! What time?",
        "ar": "أكيد! متى؟"
      },
      {
        "en": "Sorry, I can't. I have to study.",
        "ar": "آسف ما أقدر. لازم أذاكر."
      },
      {
        "en": "How about Saturday instead?",
        "ar": "وش رايك السبت بدالها؟"
      },
      {
        "en": "Let's meet at the café at eight.",
        "ar": "نتقابل في الكافيه الساعة ثمان."
      },
      {
        "en": "See you there!",
        "ar": "أشوفك هناك!"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Do you like to come with me?",
        "correct": "Would you like to come with me?",
        "whyAr": "Do you like = هل تحب عادة؛ للدعوة Would you like."
      },
      {
        "incorrect": "No, I don't want.",
        "correct": "Sorry, I can't. Maybe next time!",
        "whyAr": "الرفض المباشر يبدو قاسياً."
      },
      {
        "incorrect": "I'd love.",
        "correct": "I'd love to.",
        "whyAr": "لا تحذف to."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اعزم سارة على طلعة واتفقوا على التفاصيل.",
      "promptEn": "Invite Sara out and agree on details.",
      "saraQuestionAr": "أنا فاضية هالويكند!",
      "saraQuestionEn": "I'm free this weekend!",
      "recommendedResponseEn": "Would you like to go to Boulevard on Friday? How about meeting at eight? I can pick you up. See you then!"
    },
    "quiz": [
      {
        "questionAr": "دعوة مهذبة:",
        "questionEn": "Polite invitation:",
        "options": [
          "You come?",
          "Would you like to join us?",
          "Do you like join?"
        ],
        "correctIndex": 1,
        "explanationAr": "Would you like to..."
      },
      {
        "questionAr": "اعتذار مهذب:",
        "questionEn": "Polite refusal:",
        "options": [
          "No.",
          "I don't want.",
          "Sorry, I can't. Maybe next time."
        ],
        "correctIndex": 2,
        "explanationAr": "اعتذار + سبب/اقتراح."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Would you like to come me with?",
          "Would you like to come with me?",
          "Do you like to come with me?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Would you like to come with me? — Do you like = هل تحب عادة؛ للدعوة Would you like."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Sorry, I can't. Maybe time next!",
          "Sorry, I can't. Maybe next time!",
          "No, I don't want."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Sorry, I can't. Maybe next time! — الرفض المباشر يبدو قاسياً."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'd love.",
          "I'd to love.",
          "I'd love to."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: I'd love to. — لا تحذف to."
      }
    ],
    "whiteboardNotes": {
      "title": "Invitations and Making Plans",
      "pointsAr": [
        "يوجه دعوة بأدب.",
        "يقبل ويعتذر مع سبب.",
        "يتفق على وقت ومكان.",
        "Would you like to + فعل؟ / Do you want to...? / How about...? والقبول: I'd love to! والاعتذار: Sorry, I can't. I have to..."
      ],
      "pointsEn": [
        "Make polite invitations.",
        "Accept and decline with a reason.",
        "Fix a time and place.",
        "Invite with Would you like to...? Accept: I'd love to. Decline: Sorry, I can't + reason."
      ],
      "chalkHighlight": "Would you like to + verb? → I'd love to! / Sorry, I can't. I have to ..."
    },
    "unit": 2,
    "cefr": "A1",
    "objectivesAr": [
      "يوجه دعوة بأدب.",
      "يقبل ويعتذر مع سبب.",
      "يتفق على وقت ومكان."
    ],
    "objectivesEn": [
      "Make polite invitations.",
      "Accept and decline with a reason.",
      "Fix a time and place."
    ],
    "vocabulary": [
      {
        "word": "invite",
        "ipa": "/ɪnˈvaɪt/",
        "ar": "يعزم/يدعو",
        "exampleEn": "I'd like to invite you.",
        "exampleAr": "ودي أعزمك."
      },
      {
        "word": "invitation",
        "ipa": "/ˌɪnvɪˈteɪʃən/",
        "ar": "دعوة/عزيمة",
        "exampleEn": "Thanks for the invitation.",
        "exampleAr": "شكراً على العزيمة."
      },
      {
        "word": "free",
        "ipa": "/friː/",
        "ar": "فاضي",
        "exampleEn": "Are you free on Friday?",
        "exampleAr": "فاضي الجمعة؟"
      },
      {
        "word": "busy",
        "ipa": "/ˈbɪzi/",
        "ar": "مشغول",
        "exampleEn": "Sorry, I'm busy.",
        "exampleAr": "آسف مشغول."
      },
      {
        "word": "instead",
        "ipa": "/ɪnˈstɛd/",
        "ar": "بدلاً",
        "exampleEn": "Let's go Saturday instead.",
        "exampleAr": "خلنا نروح السبت بدالها."
      },
      {
        "word": "meet",
        "ipa": "/miːt/",
        "ar": "يتقابل",
        "exampleEn": "Let's meet at eight.",
        "exampleAr": "نتقابل ثمان."
      },
      {
        "word": "pick up",
        "ipa": "/pɪk ʌp/",
        "ar": "يمر ياخذ",
        "exampleEn": "I'll pick you up.",
        "exampleAr": "بمرك آخذك."
      },
      {
        "word": "maybe",
        "ipa": "/ˈmeɪbi/",
        "ar": "يمكن",
        "exampleEn": "Maybe next time.",
        "exampleAr": "يمكن المرة الجاية."
      },
      {
        "word": "gathering",
        "ipa": "/ˈɡæðərɪŋ/",
        "ar": "جمعة/تجمع",
        "exampleEn": "a family gathering",
        "exampleAr": "جمعة عائلية"
      },
      {
        "word": "sounds good",
        "ipa": "/saʊndz ɡʊd/",
        "ar": "تمام/حلو",
        "exampleEn": "Eight? Sounds good!",
        "exampleAr": "ثمان؟ تمام!"
      }
    ],
    "grammarFocus": {
      "ruleAr": "Would you like to + فعل؟ / Do you want to...? / How about...? والقبول: I'd love to! والاعتذار: Sorry, I can't. I have to...",
      "ruleEn": "Invite with Would you like to...? Accept: I'd love to. Decline: Sorry, I can't + reason.",
      "formula": "Would you like to + verb? → I'd love to! / Sorry, I can't. I have to ...",
      "examples": [
        {
          "en": "Would you like to come to my house on Friday?",
          "ar": "تحب تجي بيتنا يوم الجمعة؟"
        },
        {
          "en": "I'd love to! What time?",
          "ar": "أكيد! متى؟"
        },
        {
          "en": "Sorry, I can't. I have to study.",
          "ar": "آسف ما أقدر. لازم أذاكر."
        },
        {
          "en": "How about Saturday instead?",
          "ar": "وش رايك السبت بدالها؟"
        },
        {
          "en": "Let's meet at the café at eight.",
          "ar": "نتقابل في الكافيه الساعة ثمان."
        },
        {
          "en": "See you there!",
          "ar": "أشوفك هناك!"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Student",
        "en": "Are you free on Thursday night?",
        "ar": "فاضية ليلة الجمعة (الخميس)؟"
      },
      {
        "speaker": "Sara",
        "en": "I think so. Why?",
        "ar": "أظن. ليش؟"
      },
      {
        "speaker": "Student",
        "en": "Would you like to come to our family gathering?",
        "ar": "تحبين تجين جمعتنا العائلية؟"
      },
      {
        "speaker": "Sara",
        "en": "I'd love to! What time?",
        "ar": "أكيد! متى؟"
      },
      {
        "speaker": "Student",
        "en": "Around nine. I can pick you up.",
        "ar": "حوالي تسع. أقدر أمرك."
      },
      {
        "speaker": "Sara",
        "en": "Sounds good. See you then!",
        "ar": "تمام. أشوفك!"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Student: Are you free on Thursday night?\nSara: I think so. Why?\nStudent: Would you like to come to our family gathering?\nSara: I'd love to! What time?\nStudent: Around nine. I can pick you up.\nSara: Sounds good. See you then!",
      "questions": [
        {
          "questionAr": "متى الجمعة؟",
          "questionEn": "When is the gathering?",
          "options": [
            "Wednesday",
            "Thursday night",
            "Friday morning"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: Thursday night"
        },
        {
          "questionAr": "متى بالضبط؟",
          "questionEn": "What time?",
          "options": [
            "around eight",
            "around nine",
            "around ten"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: around nine"
        },
        {
          "questionAr": "مين بيوصل؟",
          "questionEn": "Who will drive?",
          "options": [
            "Sara",
            "the student",
            "a taxi"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: the student"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Would you /ˈwʊdʒə/ and I'd love to /aɪd ˈlʌv tə/",
      "items": [
        "Would you like /ˈwʊdʒə laɪk/",
        "I'd love to /aɪd ˈlʌv tə/",
        "instead /ɪnˈstɛd/"
      ],
      "tipAr": "would you تنطق «وُدجا» مندمجة."
    },
    "exercises": {
      "easy": [
        {
          "id": "sc_211_s_e1",
          "type": "meaning",
          "promptEn": "What does \"invite\" mean?",
          "promptAr": "ما معنى \"invite\"؟",
          "options": [
            "تمام/حلو",
            "يتقابل",
            "دعوة/عزيمة",
            "يعزم/يدعو"
          ],
          "correctIndex": 3,
          "answer": "يعزم/يدعو",
          "explanationAr": "\"invite\" /ɪnˈvaɪt/ تعني: يعزم/يدعو. مثال: I'd like to invite you."
        },
        {
          "id": "sc_211_s_e2",
          "type": "meaning",
          "promptEn": "What does \"invitation\" mean?",
          "promptAr": "ما معنى \"invitation\"؟",
          "options": [
            "فاضي",
            "يمكن",
            "مشغول",
            "دعوة/عزيمة"
          ],
          "correctIndex": 3,
          "answer": "دعوة/عزيمة",
          "explanationAr": "\"invitation\" /ˌɪnvɪˈteɪʃən/ تعني: دعوة/عزيمة. مثال: Thanks for the invitation."
        },
        {
          "id": "sc_211_s_e3",
          "type": "meaning",
          "promptEn": "What does \"free\" mean?",
          "promptAr": "ما معنى \"free\"؟",
          "options": [
            "جمعة/تجمع",
            "فاضي",
            "تمام/حلو",
            "مشغول"
          ],
          "correctIndex": 1,
          "answer": "فاضي",
          "explanationAr": "\"free\" /friː/ تعني: فاضي. مثال: Are you free on Friday?"
        },
        {
          "id": "sc_211_s_e4",
          "type": "meaning",
          "promptEn": "What does \"busy\" mean?",
          "promptAr": "ما معنى \"busy\"؟",
          "options": [
            "دعوة/عزيمة",
            "يمر ياخذ",
            "جمعة/تجمع",
            "مشغول"
          ],
          "correctIndex": 3,
          "answer": "مشغول",
          "explanationAr": "\"busy\" /ˈbɪzi/ تعني: مشغول. مثال: Sorry, I'm busy."
        }
      ],
      "medium": [
        {
          "id": "sc_211_s_m1",
          "type": "gap",
          "promptEn": "Complete: ____ come to my house on Friday?",
          "promptAr": "أكمل الفراغ: (تحب تجي بيتنا يوم الجمعة؟)",
          "options": [
            "Would you like to",
            "Would you like",
            "Do you like to"
          ],
          "correctIndex": 0,
          "answer": "Would you like to come to my house on Friday?",
          "explanationAr": "الإجابة: Would you like to. Would you like to + فعل؟ / Do you want to...? / How about...? والقبول: I'd love to! والاعتذار: Sorry, I can't. I have to..."
        },
        {
          "id": "sc_211_s_m2",
          "type": "gap",
          "promptEn": "Complete: ____! What time?",
          "promptAr": "أكمل الفراغ: (أكيد! متى؟)",
          "options": [
            "I love to",
            "I'd love to",
            "I'd like"
          ],
          "correctIndex": 1,
          "answer": "I'd love to! What time?",
          "explanationAr": "الإجابة: I'd love to. Would you like to + فعل؟ / Do you want to...? / How about...? والقبول: I'd love to! والاعتذار: Sorry, I can't. I have to..."
        },
        {
          "id": "sc_211_s_m3",
          "type": "gap",
          "promptEn": "Complete: Sorry, I can't. I ____ study.",
          "promptAr": "أكمل الفراغ: (آسف ما أقدر. لازم أذاكر.)",
          "options": [
            "have to",
            "should to",
            "must to"
          ],
          "correctIndex": 0,
          "answer": "Sorry, I can't. I have to study.",
          "explanationAr": "الإجابة: have to. Would you like to + فعل؟ / Do you want to...? / How about...? والقبول: I'd love to! والاعتذار: Sorry, I can't. I have to..."
        },
        {
          "id": "sc_211_s_m4",
          "type": "gap",
          "promptEn": "Complete: ____ Saturday instead?",
          "promptAr": "أكمل الفراغ: (وش رايك السبت بدالها؟)",
          "options": [
            "How about",
            "How is",
            "What do you"
          ],
          "correctIndex": 0,
          "answer": "How about Saturday instead?",
          "explanationAr": "الإجابة: How about. Would you like to + فعل؟ / Do you want to...? / How about...? والقبول: I'd love to! والاعتذار: Sorry, I can't. I have to..."
        }
      ],
      "hard": [
        {
          "id": "sc_211_s_h1",
          "type": "order",
          "promptEn": "Put the words in order: at / meet / at / the / Let's / eight. / café",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (نتقابل في الكافيه الساعة ثمان.)",
          "answer": "Let's meet at the café at eight.",
          "explanationAr": "الترتيب الصحيح: Let's meet at the café at eight."
        },
        {
          "id": "sc_211_s_h2",
          "type": "order",
          "promptEn": "Put the words in order: you / See / there!",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (أشوفك هناك!)",
          "answer": "See you there!",
          "explanationAr": "الترتيب الصحيح: See you there!"
        },
        {
          "id": "sc_211_s_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أكيد! متى؟",
          "answer": "I'd love to! What time?",
          "explanationAr": "ترجمة مقترحة: I'd love to! What time?"
        },
        {
          "id": "sc_211_s_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: وش رايك السبت بدالها؟",
          "answer": "How about Saturday instead?",
          "explanationAr": "ترجمة مقترحة: How about Saturday instead?"
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Welcome to come to my house.",
        "correct": "You're welcome to come. / Would you like to come over?",
        "whyAr": "ترجمة «حياك» تحتاج صيغة طبيعية."
      },
      {
        "incorrect": "I can't, I have work.",
        "correct": "I can't, I have to work.",
        "whyAr": "have to + فعل."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (الهوايات ووقت الفراغ): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "My hobby are playing football.",
          "My hobby is play football.",
          "My hobby is playing football."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: My hobby is playing football. — بعد is نحتاج ing.",
        "fromLessonId": "sc_210"
      },
      {
        "questionAr": "مراجعة (السؤال عن الطريق): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Excuse me, where are the pharmacy?",
          "Excuse me, where is the pharmacy?",
          "Where is the pharmacy, please me?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Excuse me, where is the pharmacy? — نبدأ بـ Excuse me.",
        "fromLessonId": "sc_208"
      },
      {
        "questionAr": "مراجعة (في الفصل: عبارات الطالب المهمة): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "What do 'busy' mean?",
          "What the meaning busy?",
          "What does 'busy' mean?"
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: What does 'busy' mean? — السؤال عن المعنى بـ What does ... mean?",
        "fromLessonId": "sc_205"
      },
      {
        "questionAr": "ما معنى \"thobe\"؟",
        "questionEn": "What does \"thobe\" mean?",
        "options": [
          "ثوب",
          "غرفة القياس",
          "ضيق",
          "خصم"
        ],
        "correctIndex": 0,
        "explanationAr": "\"thobe\" /θoʊb/ تعني: ثوب. مثال: a white thobe",
        "fromLessonId": "sc_209"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (آسف ما أقدر. لازم أذاكر.)",
          "questionEn": "Complete: Sorry, I can't. I ____ study.",
          "options": [
            "have to",
            "should to",
            "must to"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: have to. Would you like to + فعل؟ / Do you want to...? / How about...? والقبول: I'd love to! والاعتذار: Sorry, I can't. I have to..."
        },
        {
          "questionAr": "أكمل الفراغ: (وش رايك السبت بدالها؟)",
          "questionEn": "Complete: ____ Saturday instead?",
          "options": [
            "How about",
            "How is",
            "What do you"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: How about. Would you like to + فعل؟ / Do you want to...? / How about...? والقبول: I'd love to! والاعتذار: Sorry, I can't. I have to..."
        },
        {
          "questionAr": "ما معنى \"instead\"؟",
          "questionEn": "What does \"instead\" mean?",
          "options": [
            "يمكن",
            "يعزم/يدعو",
            "بدلاً",
            "جمعة/تجمع"
          ],
          "correctIndex": 2,
          "explanationAr": "\"instead\" /ɪnˈstɛd/ تعني: بدلاً. مثال: Let's go Saturday instead."
        },
        {
          "questionAr": "ما معنى \"meet\"؟",
          "questionEn": "What does \"meet\" mean?",
          "options": [
            "دعوة/عزيمة",
            "يتقابل",
            "يمكن",
            "بدلاً"
          ],
          "correctIndex": 1,
          "explanationAr": "\"meet\" /miːt/ تعني: يتقابل. مثال: Let's meet at eight."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Welcome to come to my house.",
            "You're welcome come to.",
            "You're welcome to come. / Would you like to come over?"
          ],
          "correctIndex": 2,
          "explanationAr": "الصحيح: You're welcome to come. / Would you like to come over? — ترجمة «حياك» تحتاج صيغة طبيعية."
        }
      ]
    }
  },
  {
    "id": "sc_212_s",
    "pillarId": "conversation",
    "pillarNameAr": "المحادثة والطلاقة التفاعلية",
    "pillarNameEn": "Active Conversation & Fluency Drills",
    "pillarIcon": "💬",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "المكالمات الهاتفية الأساسية",
    "titleEn": "Basic Phone Calls",
    "descAr": "رد على الجوال وسلم وعرف بنفسك واطلب شخص وخذ رسالة.",
    "descEn": "Answer the phone, introduce yourself, ask for someone and take a message.",
    "speakingGoalAr": "سوِّ مكالمة قصيرة لحجز موعد مع سارة.",
    "speakingGoalEn": "Make a short call to book an appointment.",
    "keyPattern": {
      "ruleAr": "Hello, this is... speaking. / Can I speak to...? / Can I leave a message? / I'll call back later. على الجوال نقول This is وليس I am.",
      "ruleEn": "On the phone say 'This is...' not 'I am...'. Ask 'Can I speak to...?'.",
      "formula": "Hello, this is X. | Can I speak to Y, please? | Can I leave a message? | I'll call back."
    },
    "practicalExamples": [
      {
        "en": "Hello, this is Ahmed from Al-Noor School.",
        "ar": "ألو، معك أحمد من مدرسة النور."
      },
      {
        "en": "Can I speak to Mr. Saleh, please?",
        "ar": "ممكن أكلم الأستاذ صالح؟"
      },
      {
        "en": "He's not here right now. Can I take a message?",
        "ar": "مو موجود الحين. تبي تترك رسالة؟"
      },
      {
        "en": "I'll call back later.",
        "ar": "بتصل بعدين."
      },
      {
        "en": "Sorry, the line is bad. Can you say that again?",
        "ar": "آسف الخط مو واضح. تعيد؟"
      },
      {
        "en": "Could you spell your name, please?",
        "ar": "ممكن تتهجى اسمك؟"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Hello, I am Ahmed.",
        "correct": "Hello, this is Ahmed.",
        "whyAr": "على الهاتف: this is."
      },
      {
        "incorrect": "Who are you?",
        "correct": "Who's calling, please?",
        "whyAr": "Who are you تبدو وقحة."
      },
      {
        "incorrect": "I will call you back after.",
        "correct": "I'll call you back later.",
        "whyAr": "later وليس after وحدها."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اتصل على سارة (موظفة استقبال) واحجز موعداً.",
      "promptEn": "Call Sara at reception and book an appointment.",
      "saraQuestionAr": "مساء الخير، مركز الرشاقة. كيف أخدمك؟",
      "saraQuestionEn": "Good evening, Fitness Center. How can I help?",
      "recommendedResponseEn": "Hello, this is Nasser. I'd like to book a session, please. Is Sunday at seven available? My name is N-A-S-S-E-R."
    },
    "quiz": [
      {
        "questionAr": "تعرف بنفسك على الهاتف:",
        "questionEn": "Introduce yourself on the phone:",
        "options": [
          "I am Sara.",
          "This is Sara.",
          "Me Sara."
        ],
        "correctIndex": 1,
        "explanationAr": "This is..."
      },
      {
        "questionAr": "«لحظة لو سمحت» =",
        "questionEn": "'One moment' =",
        "options": [
          "Hold on, please.",
          "Close please.",
          "Wait me."
        ],
        "correctIndex": 0,
        "explanationAr": "Hold on."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Hello, this is Ahmed.",
          "Hello, I am Ahmed.",
          "Hello, this are Ahmed."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Hello, this is Ahmed. — على الهاتف: this is."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Who are you?",
          "Hello, I am Ahmed.",
          "Who's calling, please?"
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: Who's calling, please? — Who are you تبدو وقحة."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I will call you back after.",
          "I'll call you later back.",
          "I'll call you back later."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: I'll call you back later. — later وليس after وحدها."
      }
    ],
    "whiteboardNotes": {
      "title": "Basic Phone Calls",
      "pointsAr": [
        "يعرف بنفسه بـ This is.",
        "يطلب شخصاً ويترك رسالة.",
        "يتهجى الاسم والرقم.",
        "Hello, this is... speaking. / Can I speak to...? / Can I leave a message? / I'll call back later. على الجوال نقول This is وليس I am."
      ],
      "pointsEn": [
        "Introduce yourself with 'This is'.",
        "Ask for someone and leave a message.",
        "Spell names and give numbers.",
        "On the phone say 'This is...' not 'I am...'. Ask 'Can I speak to...?'."
      ],
      "chalkHighlight": "Hello, this is X. | Can I speak to Y, please? | Can I leave a message? | I'll call back."
    },
    "unit": 2,
    "cefr": "A1",
    "objectivesAr": [
      "يعرف بنفسه بـ This is.",
      "يطلب شخصاً ويترك رسالة.",
      "يتهجى الاسم والرقم."
    ],
    "objectivesEn": [
      "Introduce yourself with 'This is'.",
      "Ask for someone and leave a message.",
      "Spell names and give numbers."
    ],
    "vocabulary": [
      {
        "word": "call",
        "ipa": "/kɔːl/",
        "ar": "مكالمة/يتصل",
        "exampleEn": "I got a call.",
        "exampleAr": "جاني اتصال."
      },
      {
        "word": "call back",
        "ipa": "/kɔːl bæk/",
        "ar": "يعاود الاتصال",
        "exampleEn": "Please call me back.",
        "exampleAr": "اتصل علي بعدين."
      },
      {
        "word": "message",
        "ipa": "/ˈmɛsɪdʒ/",
        "ar": "رسالة",
        "exampleEn": "Can I leave a message?",
        "exampleAr": "أترك رسالة؟"
      },
      {
        "word": "line",
        "ipa": "/laɪn/",
        "ar": "الخط",
        "exampleEn": "The line is busy.",
        "exampleAr": "الخط مشغول."
      },
      {
        "word": "hold on",
        "ipa": "/hoʊld ɑːn/",
        "ar": "انتظر لحظة",
        "exampleEn": "Hold on, please.",
        "exampleAr": "لحظة لو سمحت."
      },
      {
        "word": "appointment",
        "ipa": "/əˈpɔɪntmənt/",
        "ar": "موعد",
        "exampleEn": "I'd like an appointment.",
        "exampleAr": "أبي موعد."
      },
      {
        "word": "available",
        "ipa": "/əˈveɪləbəl/",
        "ar": "متاح/موجود",
        "exampleEn": "Is he available?",
        "exampleAr": "هو موجود؟"
      },
      {
        "word": "missed call",
        "ipa": "/mɪst kɔːl/",
        "ar": "مكالمة فائتة",
        "exampleEn": "I have a missed call.",
        "exampleAr": "عندي مكالمة فائتة."
      },
      {
        "word": "voicemail",
        "ipa": "/ˈvɔɪsmeɪl/",
        "ar": "بريد صوتي",
        "exampleEn": "Leave a voicemail.",
        "exampleAr": "اترك رسالة صوتية."
      },
      {
        "word": "extension",
        "ipa": "/ɪkˈstɛnʃən/",
        "ar": "تحويلة",
        "exampleEn": "Extension 204, please.",
        "exampleAr": "تحويلة ٢٠٤."
      }
    ],
    "grammarFocus": {
      "ruleAr": "Hello, this is... speaking. / Can I speak to...? / Can I leave a message? / I'll call back later. على الجوال نقول This is وليس I am.",
      "ruleEn": "On the phone say 'This is...' not 'I am...'. Ask 'Can I speak to...?'.",
      "formula": "Hello, this is X. | Can I speak to Y, please? | Can I leave a message? | I'll call back.",
      "examples": [
        {
          "en": "Hello, this is Ahmed from Al-Noor School.",
          "ar": "ألو، معك أحمد من مدرسة النور."
        },
        {
          "en": "Can I speak to Mr. Saleh, please?",
          "ar": "ممكن أكلم الأستاذ صالح؟"
        },
        {
          "en": "He's not here right now. Can I take a message?",
          "ar": "مو موجود الحين. تبي تترك رسالة؟"
        },
        {
          "en": "I'll call back later.",
          "ar": "بتصل بعدين."
        },
        {
          "en": "Sorry, the line is bad. Can you say that again?",
          "ar": "آسف الخط مو واضح. تعيد؟"
        },
        {
          "en": "Could you spell your name, please?",
          "ar": "ممكن تتهجى اسمك؟"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Good morning, Smile Dental Clinic.",
        "ar": "صباح الخير، عيادة سمايل للأسنان."
      },
      {
        "speaker": "Student",
        "en": "Hello, this is Faisal. I'd like an appointment, please.",
        "ar": "ألو، معك فيصل. أبي موعد لو سمحتي."
      },
      {
        "speaker": "Sara",
        "en": "Sure. Can you hold on, please?... Is Tuesday at four OK?",
        "ar": "أكيد. لحظة لو سمحت... الثلاثاء الساعة أربع مناسب؟"
      },
      {
        "speaker": "Student",
        "en": "Yes, that's fine.",
        "ar": "إيه، مناسب."
      },
      {
        "speaker": "Sara",
        "en": "Can you spell your family name?",
        "ar": "تتهجى اسم العائلة؟"
      },
      {
        "speaker": "Student",
        "en": "Sure. It's A-L-Q-A-H-T-A-N-I.",
        "ar": "أكيد. A-L-Q-A-H-T-A-N-I."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Good morning, Smile Dental Clinic.\nStudent: Hello, this is Faisal. I'd like an appointment, please.\nSara: Sure. Can you hold on, please?... Is Tuesday at four OK?\nStudent: Yes, that's fine.\nSara: Can you spell your family name?\nStudent: Sure. It's A-L-Q-A-H-T-A-N-I.",
      "questions": [
        {
          "questionAr": "لوين يتصل؟",
          "questionEn": "Where is the student calling?",
          "options": [
            "a hospital",
            "a dental clinic",
            "a school"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: a dental clinic"
        },
        {
          "questionAr": "متى الموعد؟",
          "questionEn": "When is the appointment?",
          "options": [
            "Monday at 4",
            "Tuesday at 4",
            "Tuesday at 2"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: Tuesday at 4"
        },
        {
          "questionAr": "اسم العائلة؟",
          "questionEn": "What is his family name?",
          "options": [
            "Alqahtani",
            "Alotaibi",
            "Alharbi"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: Alqahtani"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Spelling letters on the phone: Q /kjuː/, H /eɪtʃ/, Y /waɪ/",
      "items": [
        "H /eɪtʃ/ (not 'hatch')",
        "Q /kjuː/",
        "R /ɑːr/"
      ],
      "tipAr": "H تنطق «إيتش»، و R «آر». تدرب على تهجئة اسمك كامل."
    },
    "exercises": {
      "easy": [
        {
          "id": "sc_212_s_e1",
          "type": "meaning",
          "promptEn": "What does \"call\" mean?",
          "promptAr": "ما معنى \"call\"؟",
          "options": [
            "تحويلة",
            "مكالمة/يتصل",
            "رسالة",
            "انتظر لحظة"
          ],
          "correctIndex": 1,
          "answer": "مكالمة/يتصل",
          "explanationAr": "\"call\" /kɔːl/ تعني: مكالمة/يتصل. مثال: I got a call."
        },
        {
          "id": "sc_212_s_e2",
          "type": "meaning",
          "promptEn": "What does \"call back\" mean?",
          "promptAr": "ما معنى \"call back\"؟",
          "options": [
            "يعاود الاتصال",
            "رسالة",
            "تحويلة",
            "مكالمة فائتة"
          ],
          "correctIndex": 0,
          "answer": "يعاود الاتصال",
          "explanationAr": "\"call back\" /kɔːl bæk/ تعني: يعاود الاتصال. مثال: Please call me back."
        },
        {
          "id": "sc_212_s_e3",
          "type": "meaning",
          "promptEn": "What does \"message\" mean?",
          "promptAr": "ما معنى \"message\"؟",
          "options": [
            "يعاود الاتصال",
            "بريد صوتي",
            "رسالة",
            "انتظر لحظة"
          ],
          "correctIndex": 2,
          "answer": "رسالة",
          "explanationAr": "\"message\" /ˈmɛsɪdʒ/ تعني: رسالة. مثال: Can I leave a message?"
        },
        {
          "id": "sc_212_s_e4",
          "type": "meaning",
          "promptEn": "What does \"line\" mean?",
          "promptAr": "ما معنى \"line\"؟",
          "options": [
            "الخط",
            "رسالة",
            "متاح/موجود",
            "تحويلة"
          ],
          "correctIndex": 0,
          "answer": "الخط",
          "explanationAr": "\"line\" /laɪn/ تعني: الخط. مثال: The line is busy."
        }
      ],
      "medium": [
        {
          "id": "sc_212_s_m1",
          "type": "gap",
          "promptEn": "Complete: Hello, ____ Ahmed from Al-Noor School.",
          "promptAr": "أكمل الفراغ: (ألو، معك أحمد من مدرسة النور.)",
          "options": [
            "this is",
            "here is",
            "I am"
          ],
          "correctIndex": 0,
          "answer": "Hello, this is Ahmed from Al-Noor School.",
          "explanationAr": "الإجابة: this is. Hello, this is... speaking. / Can I speak to...? / Can I leave a message? / I'll call back later. على الجوال نقول This is وليس I am."
        },
        {
          "id": "sc_212_s_m2",
          "type": "gap",
          "promptEn": "Complete: Can I ____ Mr. Saleh, please?",
          "promptAr": "أكمل الفراغ: (ممكن أكلم الأستاذ صالح؟)",
          "options": [
            "speak to",
            "talk him",
            "speak with me"
          ],
          "correctIndex": 0,
          "answer": "Can I speak to Mr. Saleh, please?",
          "explanationAr": "الإجابة: speak to. Hello, this is... speaking. / Can I speak to...? / Can I leave a message? / I'll call back later. على الجوال نقول This is وليس I am."
        },
        {
          "id": "sc_212_s_m3",
          "type": "gap",
          "promptEn": "Complete: He's not here right now. Can I ____?",
          "promptAr": "أكمل الفراغ: (مو موجود الحين. تبي تترك رسالة؟)",
          "options": [
            "do a message",
            "take message",
            "take a message"
          ],
          "correctIndex": 2,
          "answer": "He's not here right now. Can I take a message?",
          "explanationAr": "الإجابة: take a message. Hello, this is... speaking. / Can I speak to...? / Can I leave a message? / I'll call back later. على الجوال نقول This is وليس I am."
        },
        {
          "id": "sc_212_s_m4",
          "type": "gap",
          "promptEn": "Complete: I'll ____ later.",
          "promptAr": "أكمل الفراغ: (بتصل بعدين.)",
          "options": [
            "return call",
            "call again back",
            "call back"
          ],
          "correctIndex": 2,
          "answer": "I'll call back later.",
          "explanationAr": "الإجابة: call back. Hello, this is... speaking. / Can I speak to...? / Can I leave a message? / I'll call back later. على الجوال نقول This is وليس I am."
        }
      ],
      "hard": [
        {
          "id": "sc_212_s_h1",
          "type": "order",
          "promptEn": "Put the words in order: Can / the / that / again? / Sorry, / bad. / say / is / you / line",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (آسف الخط مو واضح. تعيد؟)",
          "answer": "Sorry, the line is bad. Can you say that again?",
          "explanationAr": "الترتيب الصحيح: Sorry, the line is bad. Can you say that again?"
        },
        {
          "id": "sc_212_s_h2",
          "type": "order",
          "promptEn": "Put the words in order: your / Could / please? / you / name, / spell",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (ممكن تتهجى اسمك؟)",
          "answer": "Could you spell your name, please?",
          "explanationAr": "الترتيب الصحيح: Could you spell your name, please?"
        },
        {
          "id": "sc_212_s_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: ممكن أكلم الأستاذ صالح؟",
          "answer": "Can I speak to Mr. Saleh, please?",
          "explanationAr": "ترجمة مقترحة: Can I speak to Mr. Saleh, please?"
        },
        {
          "id": "sc_212_s_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: بتصل بعدين.",
          "answer": "I'll call back later.",
          "explanationAr": "ترجمة مقترحة: I'll call back later."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Who with me?",
        "correct": "Who's speaking? / Who's this?",
        "whyAr": "ترجمة «مين معي؟»."
      },
      {
        "incorrect": "Close the phone.",
        "correct": "Hang up.",
        "whyAr": "«سكّر الخط» = hang up."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (الدعوات والمواعيد): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Sorry, I can't. Maybe next time!",
          "Sorry, I can't. Maybe time next!",
          "No, I don't want."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Sorry, I can't. Maybe next time! — الرفض المباشر يبدو قاسياً.",
        "fromLessonId": "sc_211_s"
      },
      {
        "questionAr": "مراجعة (شراء الملابس: المقاسات والتجربة): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Can I try on it?",
          "Can I try it on?",
          "Hello, I am Ahmed."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Can I try it on? — الضمير بين try و on.",
        "fromLessonId": "sc_209"
      },
      {
        "questionAr": "مراجعة (الأرقام والأسعار والوقت): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "How much this?",
          "How much is this?",
          "How much are this?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: How much is this? — لا تحذف is.",
        "fromLessonId": "sc_206"
      },
      {
        "questionAr": "ما معنى \"gym\"؟",
        "questionEn": "What does \"gym\" mean?",
        "options": [
          "التصوير",
          "النادي",
          "الألعاب الإلكترونية",
          "الصقارة"
        ],
        "correctIndex": 1,
        "explanationAr": "\"gym\" /dʒɪm/ تعني: النادي. مثال: I go to the gym.",
        "fromLessonId": "sc_210"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (مو موجود الحين. تبي تترك رسالة؟)",
          "questionEn": "Complete: He's not here right now. Can I ____?",
          "options": [
            "do a message",
            "take message",
            "take a message"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: take a message. Hello, this is... speaking. / Can I speak to...? / Can I leave a message? / I'll call back later. على الجوال نقول This is وليس I am."
        },
        {
          "questionAr": "أكمل الفراغ: (بتصل بعدين.)",
          "questionEn": "Complete: I'll ____ later.",
          "options": [
            "return call",
            "call again back",
            "call back"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: call back. Hello, this is... speaking. / Can I speak to...? / Can I leave a message? / I'll call back later. على الجوال نقول This is وليس I am."
        },
        {
          "questionAr": "ما معنى \"hold on\"؟",
          "questionEn": "What does \"hold on\" mean?",
          "options": [
            "الخط",
            "موعد",
            "متاح/موجود",
            "انتظر لحظة"
          ],
          "correctIndex": 3,
          "explanationAr": "\"hold on\" /hoʊld ɑːn/ تعني: انتظر لحظة. مثال: Hold on, please."
        },
        {
          "questionAr": "ما معنى \"appointment\"؟",
          "questionEn": "What does \"appointment\" mean?",
          "options": [
            "موعد",
            "بريد صوتي",
            "يعاود الاتصال",
            "مكالمة فائتة"
          ],
          "correctIndex": 0,
          "explanationAr": "\"appointment\" /əˈpɔɪntmənt/ تعني: موعد. مثال: I'd like an appointment."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Hello, I am Ahmed.",
            "Who's speaking? / Who's this?",
            "Who with me?"
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: Who's speaking? / Who's this? — ترجمة «مين معي؟»."
        }
      ]
    }
  },
  {
    "id": "sc_202",
    "pillarId": "conversation",
    "pillarNameAr": "المحادثة والطلاقة التفاعلية",
    "pillarNameEn": "Active Conversation & Fluency Drills",
    "pillarIcon": "💬",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "عند الطبيب والصيدلية",
    "titleEn": "At the Doctor and the Pharmacy",
    "descAr": "صف الأعراض واطلب دواء وافهم تعليمات الجرعة.",
    "descEn": "Describe symptoms, ask for medicine and understand dosage instructions.",
    "speakingGoalAr": "صف لسارة (الطبيبة) ثلاثة أعراض وافهم نصيحتها.",
    "speakingGoalEn": "Describe three symptoms to Dr Sara and understand her advice.",
    "keyPattern": {
      "ruleAr": "I have a + اسم المرض (headache, fever). My ... hurts. و I've had it for + مدة. التعليمات: Take one tablet twice a day.",
      "ruleEn": "I have a headache/fever; my back hurts; I've had it for two days. Understand 'twice a day after meals'.",
      "formula": "I have a/an + symptom | My + body part + hurts | for + duration"
    },
    "practicalExamples": [
      {
        "en": "I have a terrible headache.",
        "ar": "عندي صداع شديد."
      },
      {
        "en": "My stomach hurts.",
        "ar": "بطني يعورني."
      },
      {
        "en": "I've had a fever for two days.",
        "ar": "عندي حرارة من يومين."
      },
      {
        "en": "Take one tablet twice a day after meals.",
        "ar": "خذ حبة مرتين في اليوم بعد الأكل."
      },
      {
        "en": "Do you have anything for a sore throat?",
        "ar": "عندك شي لالتهاب الحلق؟"
      },
      {
        "en": "Are you allergic to any medicine?",
        "ar": "عندك حساسية من أي دواء؟"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "I have pain in my head.",
        "correct": "I have a headache.",
        "whyAr": "تعبير طبيعي أقصر."
      },
      {
        "incorrect": "I am fever.",
        "correct": "I have a fever.",
        "whyAr": "المرض مع have."
      },
      {
        "incorrect": "I'm sick since two days.",
        "correct": "I've been sick for two days.",
        "whyAr": "for + مدة، والمضارع التام."
      }
    ],
    "speakingChallenge": {
      "promptAr": "أنت مريض. صف حالتك للدكتورة سارة.",
      "promptEn": "You're ill. Describe it to Dr Sara.",
      "saraQuestionAr": "تفضل، وش تشتكي منه؟",
      "saraQuestionEn": "Come in. What's wrong?",
      "recommendedResponseEn": "I have a headache and a fever. My back hurts too. I've had it since Sunday. I'm not allergic to anything."
    },
    "quiz": [
      {
        "questionAr": "«عندي كحة» =",
        "questionEn": "'عندي كحة' =",
        "options": [
          "I am cough.",
          "I have a cough.",
          "I cough have."
        ],
        "correctIndex": 1,
        "explanationAr": "have a cough."
      },
      {
        "questionAr": "«من ثلاث أيام» =",
        "questionEn": "'for three days' or 'since three days'?",
        "options": [
          "since three days",
          "for three days",
          "from three days"
        ],
        "correctIndex": 1,
        "explanationAr": "for + مدة."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I has a headache.",
          "I have pain in my head.",
          "I have a headache."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: I have a headache. — تعبير طبيعي أقصر."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I am fever.",
          "I has a fever.",
          "I have a fever."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: I have a fever. — المرض مع have."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I've been sick for two days.",
          "I've been sick for days two.",
          "I'm sick since two days."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I've been sick for two days. — for + مدة، والمضارع التام."
      }
    ],
    "whiteboardNotes": {
      "title": "At the Doctor and the Pharmacy",
      "pointsAr": [
        "يصف الأعراض.",
        "يقول مدة المرض بـ for/since.",
        "يفهم تعليمات الدواء.",
        "I have a + اسم المرض (headache, fever). My ... hurts. و I've had it for + مدة. التعليمات: Take one tablet twice a day."
      ],
      "pointsEn": [
        "Describe symptoms.",
        "Say how long with for/since.",
        "Understand medicine instructions.",
        "I have a headache/fever; my back hurts; I've had it for two days. Understand 'twice a day after meals'."
      ],
      "chalkHighlight": "I have a/an + symptom | My + body part + hurts | for + duration"
    },
    "unit": 3,
    "cefr": "A2",
    "objectivesAr": [
      "يصف الأعراض.",
      "يقول مدة المرض بـ for/since.",
      "يفهم تعليمات الدواء."
    ],
    "objectivesEn": [
      "Describe symptoms.",
      "Say how long with for/since.",
      "Understand medicine instructions."
    ],
    "vocabulary": [
      {
        "word": "headache",
        "ipa": "/ˈhɛdeɪk/",
        "ar": "صداع",
        "exampleEn": "I have a headache.",
        "exampleAr": "عندي صداع."
      },
      {
        "word": "fever",
        "ipa": "/ˈfiːvər/",
        "ar": "حرارة/حمى",
        "exampleEn": "He has a fever.",
        "exampleAr": "عنده حرارة."
      },
      {
        "word": "cough",
        "ipa": "/kɔːf/",
        "ar": "كحة",
        "exampleEn": "a bad cough",
        "exampleAr": "كحة قوية"
      },
      {
        "word": "sore throat",
        "ipa": "/sɔːr θroʊt/",
        "ar": "التهاب حلق",
        "exampleEn": "I have a sore throat.",
        "exampleAr": "حلقي ملتهب."
      },
      {
        "word": "hurt",
        "ipa": "/hɜːrt/",
        "ar": "يعوّر/يؤلم",
        "exampleEn": "My back hurts.",
        "exampleAr": "ظهري يعورني."
      },
      {
        "word": "tablet",
        "ipa": "/ˈtæblət/",
        "ar": "حبة دواء",
        "exampleEn": "Take two tablets.",
        "exampleAr": "خذ حبتين."
      },
      {
        "word": "prescription",
        "ipa": "/prɪˈskrɪpʃən/",
        "ar": "وصفة طبية",
        "exampleEn": "You need a prescription.",
        "exampleAr": "تحتاج وصفة."
      },
      {
        "word": "allergic",
        "ipa": "/əˈlɜːrdʒɪk/",
        "ar": "عنده حساسية",
        "exampleEn": "I'm allergic to penicillin.",
        "exampleAr": "عندي حساسية من البنسلين."
      },
      {
        "word": "twice a day",
        "ipa": "/twaɪs ə deɪ/",
        "ar": "مرتين يومياً",
        "exampleEn": "twice a day after meals",
        "exampleAr": "مرتين يومياً بعد الأكل"
      },
      {
        "word": "rest",
        "ipa": "/rɛst/",
        "ar": "راحة",
        "exampleEn": "Get some rest.",
        "exampleAr": "ارتاح."
      }
    ],
    "grammarFocus": {
      "ruleAr": "I have a + اسم المرض (headache, fever). My ... hurts. و I've had it for + مدة. التعليمات: Take one tablet twice a day.",
      "ruleEn": "I have a headache/fever; my back hurts; I've had it for two days. Understand 'twice a day after meals'.",
      "formula": "I have a/an + symptom | My + body part + hurts | for + duration",
      "examples": [
        {
          "en": "I have a terrible headache.",
          "ar": "عندي صداع شديد."
        },
        {
          "en": "My stomach hurts.",
          "ar": "بطني يعورني."
        },
        {
          "en": "I've had a fever for two days.",
          "ar": "عندي حرارة من يومين."
        },
        {
          "en": "Take one tablet twice a day after meals.",
          "ar": "خذ حبة مرتين في اليوم بعد الأكل."
        },
        {
          "en": "Do you have anything for a sore throat?",
          "ar": "عندك شي لالتهاب الحلق؟"
        },
        {
          "en": "Are you allergic to any medicine?",
          "ar": "عندك حساسية من أي دواء؟"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "What seems to be the problem?",
        "ar": "وش المشكلة؟"
      },
      {
        "speaker": "Student",
        "en": "I have a sore throat and a bad cough.",
        "ar": "حلقي ملتهب وعندي كحة قوية."
      },
      {
        "speaker": "Sara",
        "en": "How long have you had it?",
        "ar": "من متى؟"
      },
      {
        "speaker": "Student",
        "en": "For three days. And I had a fever last night.",
        "ar": "من ثلاث أيام. وجتني حرارة البارحة."
      },
      {
        "speaker": "Sara",
        "en": "Are you allergic to any medicine?",
        "ar": "عندك حساسية من دواء؟"
      },
      {
        "speaker": "Student",
        "en": "No. What should I take?",
        "ar": "لا. وش آخذ؟"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: What seems to be the problem?\nStudent: I have a sore throat and a bad cough.\nSara: How long have you had it?\nStudent: For three days. And I had a fever last night.\nSara: Are you allergic to any medicine?\nStudent: No. What should I take?",
      "questions": [
        {
          "questionAr": "وش الأعراض؟",
          "questionEn": "What are the symptoms?",
          "options": [
            "headache and fever",
            "sore throat and cough",
            "stomach ache"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: sore throat and cough"
        },
        {
          "questionAr": "من متى؟",
          "questionEn": "How long has he been ill?",
          "options": [
            "two days",
            "three days",
            "a week"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: three days"
        },
        {
          "questionAr": "عنده حساسية؟",
          "questionEn": "Is he allergic?",
          "options": [
            "Not mentioned",
            "Yes",
            "No"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: No"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Tricky spellings: cough /kɔːf/, stomach /ˈstʌmək/, ache /eɪk/",
      "items": [
        "cough /kɔːf/",
        "stomach /ˈstʌmək/",
        "headache /ˈhɛdeɪk/"
      ],
      "tipAr": "gh في cough تنطق f، و ch في stomach و ache تنطق k."
    },
    "exercises": {
      "easy": [
        {
          "id": "sc_202_e1",
          "type": "meaning",
          "promptEn": "What does \"headache\" mean?",
          "promptAr": "ما معنى \"headache\"؟",
          "options": [
            "مرتين يومياً",
            "وصفة طبية",
            "عنده حساسية",
            "صداع"
          ],
          "correctIndex": 3,
          "answer": "صداع",
          "explanationAr": "\"headache\" /ˈhɛdeɪk/ تعني: صداع. مثال: I have a headache."
        },
        {
          "id": "sc_202_e2",
          "type": "meaning",
          "promptEn": "What does \"fever\" mean?",
          "promptAr": "ما معنى \"fever\"؟",
          "options": [
            "كحة",
            "حرارة/حمى",
            "عنده حساسية",
            "وصفة طبية"
          ],
          "correctIndex": 1,
          "answer": "حرارة/حمى",
          "explanationAr": "\"fever\" /ˈfiːvər/ تعني: حرارة/حمى. مثال: He has a fever."
        },
        {
          "id": "sc_202_e3",
          "type": "meaning",
          "promptEn": "What does \"cough\" mean?",
          "promptAr": "ما معنى \"cough\"؟",
          "options": [
            "كحة",
            "حبة دواء",
            "حرارة/حمى",
            "عنده حساسية"
          ],
          "correctIndex": 0,
          "answer": "كحة",
          "explanationAr": "\"cough\" /kɔːf/ تعني: كحة. مثال: a bad cough"
        },
        {
          "id": "sc_202_e4",
          "type": "meaning",
          "promptEn": "What does \"sore throat\" mean?",
          "promptAr": "ما معنى \"sore throat\"؟",
          "options": [
            "التهاب حلق",
            "مرتين يومياً",
            "وصفة طبية",
            "راحة"
          ],
          "correctIndex": 0,
          "answer": "التهاب حلق",
          "explanationAr": "\"sore throat\" /sɔːr θroʊt/ تعني: التهاب حلق. مثال: I have a sore throat."
        }
      ],
      "medium": [
        {
          "id": "sc_202_m1",
          "type": "gap",
          "promptEn": "Complete: I ____ a terrible headache.",
          "promptAr": "أكمل الفراغ: (عندي صداع شديد.)",
          "options": [
            "feel have",
            "am",
            "have"
          ],
          "correctIndex": 2,
          "answer": "I have a terrible headache.",
          "explanationAr": "الإجابة: have. I have a + اسم المرض (headache, fever). My ... hurts. و I've had it for + مدة. التعليمات: Take one tablet twice a day."
        },
        {
          "id": "sc_202_m2",
          "type": "gap",
          "promptEn": "Complete: My stomach ____.",
          "promptAr": "أكمل الفراغ: (بطني يعورني.)",
          "options": [
            "hurt",
            "hurts",
            "pains"
          ],
          "correctIndex": 1,
          "answer": "My stomach hurts.",
          "explanationAr": "الإجابة: hurts. I have a + اسم المرض (headache, fever). My ... hurts. و I've had it for + مدة. التعليمات: Take one tablet twice a day."
        },
        {
          "id": "sc_202_m3",
          "type": "gap",
          "promptEn": "Complete: I've had a fever ____ two days.",
          "promptAr": "أكمل الفراغ: (عندي حرارة من يومين.)",
          "options": [
            "from",
            "since",
            "for"
          ],
          "correctIndex": 2,
          "answer": "I've had a fever for two days.",
          "explanationAr": "الإجابة: for. I have a + اسم المرض (headache, fever). My ... hurts. و I've had it for + مدة. التعليمات: Take one tablet twice a day."
        },
        {
          "id": "sc_202_m4",
          "type": "gap",
          "promptEn": "Complete: Take one tablet ____ a day after meals.",
          "promptAr": "أكمل الفراغ: (خذ حبة مرتين في اليوم بعد الأكل.)",
          "options": [
            "double",
            "twice",
            "two times in"
          ],
          "correctIndex": 1,
          "answer": "Take one tablet twice a day after meals.",
          "explanationAr": "الإجابة: twice. I have a + اسم المرض (headache, fever). My ... hurts. و I've had it for + مدة. التعليمات: Take one tablet twice a day."
        }
      ],
      "hard": [
        {
          "id": "sc_202_h1",
          "type": "order",
          "promptEn": "Put the words in order: throat? / a / Do / for / anything / have / you / sore",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (عندك شي لالتهاب الحلق؟)",
          "answer": "Do you have anything for a sore throat?",
          "explanationAr": "الترتيب الصحيح: Do you have anything for a sore throat?"
        },
        {
          "id": "sc_202_h2",
          "type": "order",
          "promptEn": "Put the words in order: medicine? / to / Are / allergic / you / any",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (عندك حساسية من أي دواء؟)",
          "answer": "Are you allergic to any medicine?",
          "explanationAr": "الترتيب الصحيح: Are you allergic to any medicine?"
        },
        {
          "id": "sc_202_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: بطني يعورني.",
          "answer": "My stomach hurts.",
          "explanationAr": "ترجمة مقترحة: My stomach hurts."
        },
        {
          "id": "sc_202_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: خذ حبة مرتين في اليوم بعد الأكل.",
          "answer": "Take one tablet twice a day after meals.",
          "explanationAr": "ترجمة مقترحة: Take one tablet twice a day after meals."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "My head is paining me.",
        "correct": "My head hurts. / I have a headache.",
        "whyAr": "pain ما تستخدم كفعل بهالشكل."
      },
      {
        "incorrect": "I take medicine 3 times in the day.",
        "correct": "I take it three times a day.",
        "whyAr": "a day وليس in the day."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (المكالمات الهاتفية الأساسية): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Who's calling, please?",
          "Who are you?",
          "I have pain in my head."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Who's calling, please? — Who are you تبدو وقحة.",
        "fromLessonId": "sc_212_s"
      },
      {
        "questionAr": "مراجعة (الهوايات ووقت الفراغ): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I enjoy swimming.",
          "I swimming enjoy.",
          "I enjoy to swim."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I enjoy swimming. — enjoy + ing دائماً.",
        "fromLessonId": "sc_210"
      },
      {
        "questionAr": "مراجعة (طلب الطعام في الكافيه والمطعم): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Give me coffee.",
          "Can I has a coffee, please?",
          "Can I have a coffee, please?"
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: Can I have a coffee, please? — Give me تبدو فظة بالإنجليزي.",
        "fromLessonId": "sc_207"
      },
      {
        "questionAr": "ما معنى \"sounds good\"؟",
        "questionEn": "What does \"sounds good\" mean?",
        "options": [
          "جمعة/تجمع",
          "دعوة/عزيمة",
          "تمام/حلو",
          "يعزم/يدعو"
        ],
        "correctIndex": 2,
        "explanationAr": "\"sounds good\" /saʊndz ɡʊd/ تعني: تمام/حلو. مثال: Eight? Sounds good!",
        "fromLessonId": "sc_211_s"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (عندي حرارة من يومين.)",
          "questionEn": "Complete: I've had a fever ____ two days.",
          "options": [
            "from",
            "since",
            "for"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: for. I have a + اسم المرض (headache, fever). My ... hurts. و I've had it for + مدة. التعليمات: Take one tablet twice a day."
        },
        {
          "questionAr": "أكمل الفراغ: (خذ حبة مرتين في اليوم بعد الأكل.)",
          "questionEn": "Complete: Take one tablet ____ a day after meals.",
          "options": [
            "double",
            "twice",
            "two times in"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: twice. I have a + اسم المرض (headache, fever). My ... hurts. و I've had it for + مدة. التعليمات: Take one tablet twice a day."
        },
        {
          "questionAr": "ما معنى \"hurt\"؟",
          "questionEn": "What does \"hurt\" mean?",
          "options": [
            "يعوّر/يؤلم",
            "التهاب حلق",
            "حرارة/حمى",
            "حبة دواء"
          ],
          "correctIndex": 0,
          "explanationAr": "\"hurt\" /hɜːrt/ تعني: يعوّر/يؤلم. مثال: My back hurts."
        },
        {
          "questionAr": "ما معنى \"tablet\"؟",
          "questionEn": "What does \"tablet\" mean?",
          "options": [
            "حبة دواء",
            "يعوّر/يؤلم",
            "التهاب حلق",
            "كحة"
          ],
          "correctIndex": 0,
          "explanationAr": "\"tablet\" /ˈtæblət/ تعني: حبة دواء. مثال: Take two tablets."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "My head hurts. / I have a headache.",
            "My hurts head.",
            "My head is paining me."
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: My head hurts. / I have a headache. — pain ما تستخدم كفعل بهالشكل."
        }
      ]
    }
  },
  {
    "id": "sc_213",
    "pillarId": "conversation",
    "pillarNameAr": "المحادثة والطلاقة التفاعلية",
    "pillarNameEn": "Active Conversation & Fluency Drills",
    "pillarIcon": "💬",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "في الفندق: الحجز وتسجيل الدخول",
    "titleEn": "At the Hotel: Booking and Check-in",
    "descAr": "سجل دخول، اسأل عن الفطور والواي فاي، واطلب خدمة أو بلّغ عن مشكلة.",
    "descEn": "Check in, ask about breakfast and Wi-Fi, and report problems.",
    "speakingGoalAr": "سجل دخولك في فندق سارة واطلب طلبين.",
    "speakingGoalEn": "Check in at Sara's hotel and make two requests.",
    "keyPattern": {
      "ruleAr": "I have a reservation under... / Is breakfast included? / Could I have...? / There's a problem with...",
      "ruleEn": "Use 'I have a reservation under...', 'Is ... included?', 'Could I...?'.",
      "formula": "I have a reservation under + name | Is ... included? | Could you/I ...? | The ... isn't working."
    },
    "practicalExamples": [
      {
        "en": "I have a reservation under Al-Harbi.",
        "ar": "عندي حجز باسم الحربي."
      },
      {
        "en": "Is breakfast included?",
        "ar": "الفطور داخل في السعر؟"
      },
      {
        "en": "Could I have a late checkout?",
        "ar": "ممكن أطلع متأخر؟"
      },
      {
        "en": "The air conditioner isn't working.",
        "ar": "المكيف ما يشتغل."
      },
      {
        "en": "What's the Wi-Fi password?",
        "ar": "وش باسوورد الواي فاي؟"
      },
      {
        "en": "Could you send someone up, please?",
        "ar": "ممكن ترسلون أحد للغرفة؟"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "I have booking with name Al-Harbi.",
        "correct": "I have a reservation under Al-Harbi.",
        "whyAr": "التعبير الثابت: under + name."
      },
      {
        "incorrect": "The AC not working.",
        "correct": "The AC isn't working.",
        "whyAr": "لا تحذف is."
      },
      {
        "incorrect": "Is the breakfast include?",
        "correct": "Is breakfast included?",
        "whyAr": "included اسم مفعول."
      }
    ],
    "speakingChallenge": {
      "promptAr": "سجل دخولك وبلّغ عن مشكلة في الغرفة.",
      "promptEn": "Check in and report a room problem.",
      "saraQuestionAr": "أهلاً بك في الفندق! كيف أخدمك؟",
      "saraQuestionEn": "Welcome! How can I help?",
      "recommendedResponseEn": "Hi, I have a reservation under Saeed. Is breakfast included? Also, the Wi-Fi in my room isn't working. Could you send someone up, please?"
    },
    "quiz": [
      {
        "questionAr": "مكيف لا يعمل:",
        "questionEn": "The AC is broken:",
        "options": [
          "The AC isn't working.",
          "The AC not work.",
          "The AC is close."
        ],
        "correctIndex": 0,
        "explanationAr": "isn't working."
      },
      {
        "questionAr": "«مشمول» =",
        "questionEn": "'مشمول' =",
        "options": [
          "included",
          "including",
          "include"
        ],
        "correctIndex": 0,
        "explanationAr": "included."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I have booking with name Al-Harbi.",
          "I have a reservation under Al-Harbi.",
          "I has a reservation under Al-Harbi."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I have a reservation under Al-Harbi. — التعبير الثابت: under + name."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "The AC not working.",
          "I have booking with name Al-Harbi.",
          "The AC isn't working."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: The AC isn't working. — لا تحذف is."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Is included breakfast?",
          "Is breakfast included?",
          "Is the breakfast include?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Is breakfast included? — included اسم مفعول."
      }
    ],
    "whiteboardNotes": {
      "title": "At the Hotel: Booking and Check-in",
      "pointsAr": [
        "يسجل دخول بحجز.",
        "يسأل عن الخدمات.",
        "يبلغ عن مشكلة بأدب.",
        "I have a reservation under... / Is breakfast included? / Could I have...? / There's a problem with..."
      ],
      "pointsEn": [
        "Check in with a reservation.",
        "Ask about services.",
        "Report a problem politely.",
        "Use 'I have a reservation under...', 'Is ... included?', 'Could I...?'."
      ],
      "chalkHighlight": "I have a reservation under + name | Is ... included? | Could you/I ...? | The ... isn't working."
    },
    "unit": 3,
    "cefr": "A2",
    "objectivesAr": [
      "يسجل دخول بحجز.",
      "يسأل عن الخدمات.",
      "يبلغ عن مشكلة بأدب."
    ],
    "objectivesEn": [
      "Check in with a reservation.",
      "Ask about services.",
      "Report a problem politely."
    ],
    "vocabulary": [
      {
        "word": "reservation",
        "ipa": "/ˌrɛzərˈveɪʃən/",
        "ar": "حجز",
        "exampleEn": "I have a reservation.",
        "exampleAr": "عندي حجز."
      },
      {
        "word": "check in",
        "ipa": "/tʃɛk ɪn/",
        "ar": "تسجيل الدخول",
        "exampleEn": "Check-in is at 3 pm.",
        "exampleAr": "الدخول الساعة ٣."
      },
      {
        "word": "checkout",
        "ipa": "/ˈtʃɛkaʊt/",
        "ar": "تسجيل الخروج",
        "exampleEn": "Checkout is at noon.",
        "exampleAr": "الخروج الظهر."
      },
      {
        "word": "included",
        "ipa": "/ɪnˈkluːdɪd/",
        "ar": "مشمول",
        "exampleEn": "Breakfast is included.",
        "exampleAr": "الفطور مشمول."
      },
      {
        "word": "key card",
        "ipa": "/kiː kɑːrd/",
        "ar": "كرت الغرفة",
        "exampleEn": "Here's your key card.",
        "exampleAr": "هذا كرت غرفتك."
      },
      {
        "word": "floor",
        "ipa": "/flɔːr/",
        "ar": "دور/طابق",
        "exampleEn": "You're on the fifth floor.",
        "exampleAr": "أنت في الدور الخامس."
      },
      {
        "word": "towel",
        "ipa": "/ˈtaʊəl/",
        "ar": "منشفة",
        "exampleEn": "Could I have extra towels?",
        "exampleAr": "ممكن مناشف زيادة؟"
      },
      {
        "word": "air conditioner",
        "ipa": "/ɛr kənˈdɪʃənər/",
        "ar": "مكيف",
        "exampleEn": "The AC is too cold.",
        "exampleAr": "المكيف بارد مرة."
      },
      {
        "word": "reception",
        "ipa": "/rɪˈsɛpʃən/",
        "ar": "الاستقبال",
        "exampleEn": "Call reception.",
        "exampleAr": "كلم الاستقبال."
      },
      {
        "word": "view",
        "ipa": "/vjuː/",
        "ar": "إطلالة",
        "exampleEn": "a sea view",
        "exampleAr": "إطلالة بحرية"
      }
    ],
    "grammarFocus": {
      "ruleAr": "I have a reservation under... / Is breakfast included? / Could I have...? / There's a problem with...",
      "ruleEn": "Use 'I have a reservation under...', 'Is ... included?', 'Could I...?'.",
      "formula": "I have a reservation under + name | Is ... included? | Could you/I ...? | The ... isn't working.",
      "examples": [
        {
          "en": "I have a reservation under Al-Harbi.",
          "ar": "عندي حجز باسم الحربي."
        },
        {
          "en": "Is breakfast included?",
          "ar": "الفطور داخل في السعر؟"
        },
        {
          "en": "Could I have a late checkout?",
          "ar": "ممكن أطلع متأخر؟"
        },
        {
          "en": "The air conditioner isn't working.",
          "ar": "المكيف ما يشتغل."
        },
        {
          "en": "What's the Wi-Fi password?",
          "ar": "وش باسوورد الواي فاي؟"
        },
        {
          "en": "Could you send someone up, please?",
          "ar": "ممكن ترسلون أحد للغرفة؟"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Good evening. Welcome to the Red Sea Hotel.",
        "ar": "مساء الخير. أهلاً في فندق البحر الأحمر."
      },
      {
        "speaker": "Student",
        "en": "Hi, I have a reservation under Al-Harbi.",
        "ar": "هلا، عندي حجز باسم الحربي."
      },
      {
        "speaker": "Sara",
        "en": "Yes, two nights, a room with a sea view.",
        "ar": "إيه، ليلتين، غرفة بإطلالة بحرية."
      },
      {
        "speaker": "Student",
        "en": "Great. Is breakfast included?",
        "ar": "ممتاز. الفطور مشمول؟"
      },
      {
        "speaker": "Sara",
        "en": "Yes, from six to ten on the ground floor.",
        "ar": "إيه، من ست لعشر في الدور الأرضي."
      },
      {
        "speaker": "Student",
        "en": "And could I have a late checkout on Saturday?",
        "ar": "وممكن أطلع متأخر يوم السبت؟"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Good evening. Welcome to the Red Sea Hotel.\nStudent: Hi, I have a reservation under Al-Harbi.\nSara: Yes, two nights, a room with a sea view.\nStudent: Great. Is breakfast included?\nSara: Yes, from six to ten on the ground floor.\nStudent: And could I have a late checkout on Saturday?",
      "questions": [
        {
          "questionAr": "كم ليلة؟",
          "questionEn": "How many nights?",
          "options": [
            "one",
            "two",
            "three"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: two"
        },
        {
          "questionAr": "وش نوع الغرفة؟",
          "questionEn": "What kind of room?",
          "options": [
            "city view",
            "sea view",
            "garden view"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: sea view"
        },
        {
          "questionAr": "متى الفطور؟",
          "questionEn": "When is breakfast?",
          "options": [
            "6–10",
            "7–11",
            "5–9"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: 6–10"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Word stress: reserVAtion, reCEPtion",
      "items": [
        "reservation /ˌrɛzərˈveɪʃən/",
        "reception /rɪˈsɛpʃən/",
        "towel /ˈtaʊəl/"
      ],
      "tipAr": "كلمات tion الضغط فيها على المقطع اللي قبلها: reserVAtion."
    },
    "exercises": {
      "easy": [
        {
          "id": "sc_213_e1",
          "type": "meaning",
          "promptEn": "What does \"reservation\" mean?",
          "promptAr": "ما معنى \"reservation\"؟",
          "options": [
            "الاستقبال",
            "حجز",
            "تسجيل الدخول",
            "مشمول"
          ],
          "correctIndex": 1,
          "answer": "حجز",
          "explanationAr": "\"reservation\" /ˌrɛzərˈveɪʃən/ تعني: حجز. مثال: I have a reservation."
        },
        {
          "id": "sc_213_e2",
          "type": "meaning",
          "promptEn": "What does \"check in\" mean?",
          "promptAr": "ما معنى \"check in\"؟",
          "options": [
            "مكيف",
            "تسجيل الدخول",
            "منشفة",
            "كرت الغرفة"
          ],
          "correctIndex": 1,
          "answer": "تسجيل الدخول",
          "explanationAr": "\"check in\" /tʃɛk ɪn/ تعني: تسجيل الدخول. مثال: Check-in is at 3 pm."
        },
        {
          "id": "sc_213_e3",
          "type": "meaning",
          "promptEn": "What does \"checkout\" mean?",
          "promptAr": "ما معنى \"checkout\"؟",
          "options": [
            "مكيف",
            "تسجيل الدخول",
            "تسجيل الخروج",
            "دور/طابق"
          ],
          "correctIndex": 2,
          "answer": "تسجيل الخروج",
          "explanationAr": "\"checkout\" /ˈtʃɛkaʊt/ تعني: تسجيل الخروج. مثال: Checkout is at noon."
        },
        {
          "id": "sc_213_e4",
          "type": "meaning",
          "promptEn": "What does \"included\" mean?",
          "promptAr": "ما معنى \"included\"؟",
          "options": [
            "منشفة",
            "مشمول",
            "إطلالة",
            "دور/طابق"
          ],
          "correctIndex": 1,
          "answer": "مشمول",
          "explanationAr": "\"included\" /ɪnˈkluːdɪd/ تعني: مشمول. مثال: Breakfast is included."
        }
      ],
      "medium": [
        {
          "id": "sc_213_m1",
          "type": "gap",
          "promptEn": "Complete: I have a reservation ____ Al-Harbi.",
          "promptAr": "أكمل الفراغ: (عندي حجز باسم الحربي.)",
          "options": [
            "with",
            "under",
            "on"
          ],
          "correctIndex": 1,
          "answer": "I have a reservation under Al-Harbi.",
          "explanationAr": "الإجابة: under. I have a reservation under... / Is breakfast included? / Could I have...? / There's a problem with..."
        },
        {
          "id": "sc_213_m2",
          "type": "gap",
          "promptEn": "Complete: Is breakfast ____?",
          "promptAr": "أكمل الفراغ: (الفطور داخل في السعر؟)",
          "options": [
            "inside",
            "included",
            "include"
          ],
          "correctIndex": 1,
          "answer": "Is breakfast included?",
          "explanationAr": "الإجابة: included. I have a reservation under... / Is breakfast included? / Could I have...? / There's a problem with..."
        },
        {
          "id": "sc_213_m3",
          "type": "gap",
          "promptEn": "Complete: ____ a late checkout?",
          "promptAr": "أكمل الفراغ: (ممكن أطلع متأخر؟)",
          "options": [
            "I could have",
            "Could I have",
            "Could I has"
          ],
          "correctIndex": 1,
          "answer": "Could I have a late checkout?",
          "explanationAr": "الإجابة: Could I have. I have a reservation under... / Is breakfast included? / Could I have...? / There's a problem with..."
        },
        {
          "id": "sc_213_m4",
          "type": "gap",
          "promptEn": "Complete: The air conditioner ____.",
          "promptAr": "أكمل الفراغ: (المكيف ما يشتغل.)",
          "options": [
            "isn't working",
            "doesn't working",
            "not work"
          ],
          "correctIndex": 0,
          "answer": "The air conditioner isn't working.",
          "explanationAr": "الإجابة: isn't working. I have a reservation under... / Is breakfast included? / Could I have...? / There's a problem with..."
        }
      ],
      "hard": [
        {
          "id": "sc_213_h1",
          "type": "order",
          "promptEn": "Put the words in order: Wi-Fi / password? / the / What's",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (وش باسوورد الواي فاي؟)",
          "answer": "What's the Wi-Fi password?",
          "explanationAr": "الترتيب الصحيح: What's the Wi-Fi password?"
        },
        {
          "id": "sc_213_h2",
          "type": "order",
          "promptEn": "Put the words in order: you / please? / up, / Could / someone / send",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (ممكن ترسلون أحد للغرفة؟)",
          "answer": "Could you send someone up, please?",
          "explanationAr": "الترتيب الصحيح: Could you send someone up, please?"
        },
        {
          "id": "sc_213_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: الفطور داخل في السعر؟",
          "answer": "Is breakfast included?",
          "explanationAr": "ترجمة مقترحة: Is breakfast included?"
        },
        {
          "id": "sc_213_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: المكيف ما يشتغل.",
          "answer": "The air conditioner isn't working.",
          "explanationAr": "ترجمة مقترحة: The air conditioner isn't working."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "I want to make check out.",
        "correct": "I'd like to check out.",
        "whyAr": "check out فعل."
      },
      {
        "incorrect": "Open the AC please.",
        "correct": "Could you turn on the AC, please?",
        "whyAr": "«افتح المكيف» = turn on."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (عند الطبيب والصيدلية): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I have a fever.",
          "I has a fever.",
          "I am fever."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I have a fever. — المرض مع have.",
        "fromLessonId": "sc_202"
      },
      {
        "questionAr": "مراجعة (الدعوات والمواعيد): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Would you like to come me with?",
          "Do you like to come with me?",
          "Would you like to come with me?"
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: Would you like to come with me? — Do you like = هل تحب عادة؛ للدعوة Would you like.",
        "fromLessonId": "sc_211_s"
      },
      {
        "questionAr": "مراجعة (السؤال عن الطريق): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Excuse me, where are the pharmacy?",
          "Excuse me, where is the pharmacy?",
          "Where is the pharmacy, please me?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Excuse me, where is the pharmacy? — نبدأ بـ Excuse me.",
        "fromLessonId": "sc_208"
      },
      {
        "questionAr": "ما معنى \"extension\"؟",
        "questionEn": "What does \"extension\" mean?",
        "options": [
          "رسالة",
          "يعاود الاتصال",
          "تحويلة",
          "مكالمة/يتصل"
        ],
        "correctIndex": 2,
        "explanationAr": "\"extension\" /ɪkˈstɛnʃən/ تعني: تحويلة. مثال: Extension 204, please.",
        "fromLessonId": "sc_212_s"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (ممكن أطلع متأخر؟)",
          "questionEn": "Complete: ____ a late checkout?",
          "options": [
            "I could have",
            "Could I have",
            "Could I has"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: Could I have. I have a reservation under... / Is breakfast included? / Could I have...? / There's a problem with..."
        },
        {
          "questionAr": "أكمل الفراغ: (المكيف ما يشتغل.)",
          "questionEn": "Complete: The air conditioner ____.",
          "options": [
            "isn't working",
            "doesn't working",
            "not work"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: isn't working. I have a reservation under... / Is breakfast included? / Could I have...? / There's a problem with..."
        },
        {
          "questionAr": "ما معنى \"key card\"؟",
          "questionEn": "What does \"key card\" mean?",
          "options": [
            "حجز",
            "مشمول",
            "تسجيل الدخول",
            "كرت الغرفة"
          ],
          "correctIndex": 3,
          "explanationAr": "\"key card\" /kiː kɑːrd/ تعني: كرت الغرفة. مثال: Here's your key card."
        },
        {
          "questionAr": "ما معنى \"floor\"؟",
          "questionEn": "What does \"floor\" mean?",
          "options": [
            "تسجيل الخروج",
            "إطلالة",
            "كرت الغرفة",
            "دور/طابق"
          ],
          "correctIndex": 3,
          "explanationAr": "\"floor\" /flɔːr/ تعني: دور/طابق. مثال: You're on the fifth floor."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "I'd like to out check.",
            "I'd like to check out.",
            "I want to make check out."
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: I'd like to check out. — check out فعل."
        }
      ]
    }
  },
  {
    "id": "sc_214",
    "pillarId": "conversation",
    "pillarNameAr": "المحادثة والطلاقة التفاعلية",
    "pillarNameEn": "Active Conversation & Fluency Drills",
    "pillarIcon": "💬",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "في المطار: الكاونتر والجوازات",
    "titleEn": "At the Airport: Check-in and Passport Control",
    "descAr": "اجتز كاونتر الطيران والتفتيش والجوازات بعبارات واضحة.",
    "descEn": "Get through check-in, security and passport control.",
    "speakingGoalAr": "أجب عن أسئلة موظف الجوازات بثقة.",
    "speakingGoalEn": "Answer passport officer questions confidently.",
    "keyPattern": {
      "ruleAr": "أسئلة شائعة: Where are you flying to? / What's the purpose of your visit? / How long are you staying? والردود قصيرة وواضحة.",
      "ruleEn": "Answer common airport questions briefly and clearly.",
      "formula": "I'm flying to ... | I'm here for + purpose | I'm staying for + duration"
    },
    "practicalExamples": [
      {
        "en": "I'd like a window seat, please.",
        "ar": "أبي مقعد جنب الشباك لو سمحت."
      },
      {
        "en": "I'm here on holiday for two weeks.",
        "ar": "جاي سياحة لمدة أسبوعين."
      },
      {
        "en": "I have one suitcase to check in.",
        "ar": "عندي شنطة وحدة أشحنها."
      },
      {
        "en": "Which gate is it?",
        "ar": "أي بوابة؟"
      },
      {
        "en": "Do I need to take my laptop out?",
        "ar": "لازم أطلع اللابتوب؟"
      },
      {
        "en": "My flight is delayed.",
        "ar": "رحلتي متأخرة."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "I came for tourism.",
        "correct": "I'm here on holiday. / I'm here for tourism.",
        "whyAr": "الصيغة الشائعة: on holiday."
      },
      {
        "incorrect": "I want to charge my bag.",
        "correct": "I'd like to check in my bag.",
        "whyAr": "«أشحن الشنطة» = check in."
      },
      {
        "incorrect": "The flight is late two hours.",
        "correct": "The flight is two hours late. / delayed by two hours.",
        "whyAr": "ترتيب المدة قبل late."
      }
    ],
    "speakingChallenge": {
      "promptAr": "أنت عند الجوازات في بلد أجنبي. أجب سارة.",
      "promptEn": "You're at passport control. Answer Sara.",
      "saraQuestionAr": "What's the purpose of your visit? How long are you staying?",
      "saraQuestionEn": "What's the purpose of your visit? How long are you staying?",
      "recommendedResponseEn": "I'm here on holiday with my family. We're staying for ten days at the Hilton in the city centre."
    },
    "quiz": [
      {
        "questionAr": "«مقعد على الممر» =",
        "questionEn": "aisle or window?",
        "options": [
          "window seat",
          "aisle seat",
          "door seat"
        ],
        "correctIndex": 1,
        "explanationAr": "aisle."
      },
      {
        "questionAr": "غرض الزيارة سياحة:",
        "questionEn": "Purpose: tourism:",
        "options": [
          "I'm here on holiday.",
          "I'm on tourist.",
          "I came for to visit."
        ],
        "correctIndex": 0,
        "explanationAr": "on holiday."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'm here on holiday. / I'm here for tourism.",
          "I came for tourism.",
          "I'm here holiday on."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I'm here on holiday. / I'm here for tourism. — الصيغة الشائعة: on holiday."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'd like to check in bag my.",
          "I'd like to check in my bag.",
          "I want to charge my bag."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I'd like to check in my bag. — «أشحن الشنطة» = check in."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "The flight are two hours late.",
          "The flight is two hours late. / delayed by two hours.",
          "The flight is late two hours."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: The flight is two hours late. / delayed by two hours. — ترتيب المدة قبل late."
      }
    ],
    "whiteboardNotes": {
      "title": "At the Airport: Check-in and Passport Control",
      "pointsAr": [
        "يفهم أسئلة الكاونتر والجوازات.",
        "يرد بإيجاز.",
        "يقرأ بطاقة الصعود.",
        "أسئلة شائعة: Where are you flying to? / What's the purpose of your visit? / How long are you staying? والردود قصيرة وواضحة."
      ],
      "pointsEn": [
        "Understand check-in and passport questions.",
        "Answer briefly.",
        "Read a boarding pass.",
        "Answer common airport questions briefly and clearly."
      ],
      "chalkHighlight": "I'm flying to ... | I'm here for + purpose | I'm staying for + duration"
    },
    "unit": 3,
    "cefr": "A2",
    "objectivesAr": [
      "يفهم أسئلة الكاونتر والجوازات.",
      "يرد بإيجاز.",
      "يقرأ بطاقة الصعود."
    ],
    "objectivesEn": [
      "Understand check-in and passport questions.",
      "Answer briefly.",
      "Read a boarding pass."
    ],
    "vocabulary": [
      {
        "word": "passport",
        "ipa": "/ˈpæspɔːrt/",
        "ar": "جواز",
        "exampleEn": "Passport, please.",
        "exampleAr": "الجواز لو سمحت."
      },
      {
        "word": "boarding pass",
        "ipa": "/ˈbɔːrdɪŋ pæs/",
        "ar": "بطاقة صعود",
        "exampleEn": "Here's your boarding pass.",
        "exampleAr": "هذي بطاقة الصعود."
      },
      {
        "word": "gate",
        "ipa": "/ɡeɪt/",
        "ar": "بوابة",
        "exampleEn": "Gate B12",
        "exampleAr": "بوابة B12"
      },
      {
        "word": "suitcase",
        "ipa": "/ˈsuːtkeɪs/",
        "ar": "شنطة سفر",
        "exampleEn": "one suitcase",
        "exampleAr": "شنطة وحدة"
      },
      {
        "word": "carry-on",
        "ipa": "/ˈkæri ɑːn/",
        "ar": "شنطة يد",
        "exampleEn": "Is this your carry-on?",
        "exampleAr": "هذي شنطة يدك؟"
      },
      {
        "word": "aisle",
        "ipa": "/aɪl/",
        "ar": "ممر",
        "exampleEn": "an aisle seat",
        "exampleAr": "مقعد على الممر"
      },
      {
        "word": "delayed",
        "ipa": "/dɪˈleɪd/",
        "ar": "متأخر",
        "exampleEn": "The flight is delayed.",
        "exampleAr": "الرحلة متأخرة."
      },
      {
        "word": "purpose",
        "ipa": "/ˈpɜːrpəs/",
        "ar": "غرض",
        "exampleEn": "the purpose of your visit",
        "exampleAr": "غرض زيارتك"
      },
      {
        "word": "customs",
        "ipa": "/ˈkʌstəmz/",
        "ar": "الجمارك",
        "exampleEn": "Go through customs.",
        "exampleAr": "مر على الجمارك."
      },
      {
        "word": "boarding",
        "ipa": "/ˈbɔːrdɪŋ/",
        "ar": "الصعود للطائرة",
        "exampleEn": "Boarding starts at 9.",
        "exampleAr": "الصعود الساعة ٩."
      }
    ],
    "grammarFocus": {
      "ruleAr": "أسئلة شائعة: Where are you flying to? / What's the purpose of your visit? / How long are you staying? والردود قصيرة وواضحة.",
      "ruleEn": "Answer common airport questions briefly and clearly.",
      "formula": "I'm flying to ... | I'm here for + purpose | I'm staying for + duration",
      "examples": [
        {
          "en": "I'd like a window seat, please.",
          "ar": "أبي مقعد جنب الشباك لو سمحت."
        },
        {
          "en": "I'm here on holiday for two weeks.",
          "ar": "جاي سياحة لمدة أسبوعين."
        },
        {
          "en": "I have one suitcase to check in.",
          "ar": "عندي شنطة وحدة أشحنها."
        },
        {
          "en": "Which gate is it?",
          "ar": "أي بوابة؟"
        },
        {
          "en": "Do I need to take my laptop out?",
          "ar": "لازم أطلع اللابتوب؟"
        },
        {
          "en": "My flight is delayed.",
          "ar": "رحلتي متأخرة."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Good morning. Passport, please. Where are you flying to?",
        "ar": "صباح الخير. الجواز. لوين مسافر؟"
      },
      {
        "speaker": "Student",
        "en": "To London.",
        "ar": "لندن."
      },
      {
        "speaker": "Sara",
        "en": "Any bags to check in?",
        "ar": "عندك شنط تشحنها؟"
      },
      {
        "speaker": "Student",
        "en": "One suitcase. Could I have an aisle seat?",
        "ar": "شنطة وحدة. ممكن مقعد على الممر؟"
      },
      {
        "speaker": "Sara",
        "en": "Sure. Your gate is C7. Boarding starts at nine forty.",
        "ar": "أكيد. بوابتك C7. الصعود الساعة تسع وأربعين."
      },
      {
        "speaker": "Student",
        "en": "Thank you. Is the flight on time?",
        "ar": "شكراً. الرحلة في وقتها؟"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Good morning. Passport, please. Where are you flying to?\nStudent: To London.\nSara: Any bags to check in?\nStudent: One suitcase. Could I have an aisle seat?\nSara: Sure. Your gate is C7. Boarding starts at nine forty.\nStudent: Thank you. Is the flight on time?",
      "questions": [
        {
          "questionAr": "لوين؟",
          "questionEn": "Where is the student flying?",
          "options": [
            "Paris",
            "London",
            "Dubai"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: London"
        },
        {
          "questionAr": "أي مقعد؟",
          "questionEn": "What seat does he want?",
          "options": [
            "window",
            "aisle",
            "middle"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: aisle"
        },
        {
          "questionAr": "أي بوابة؟",
          "questionEn": "Which gate?",
          "options": [
            "C7",
            "B12",
            "A3"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: C7"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Silent letters: aisle /aɪl/, island",
      "items": [
        "aisle /aɪl/ (silent s)",
        "suitcase /ˈsuːtkeɪs/",
        "customs /ˈkʌstəmz/"
      ],
      "tipAr": "aisle تنطق «آيل» فقط، مثل I'll."
    },
    "exercises": {
      "easy": [
        {
          "id": "sc_214_e1",
          "type": "meaning",
          "promptEn": "What does \"passport\" mean?",
          "promptAr": "ما معنى \"passport\"؟",
          "options": [
            "بوابة",
            "بطاقة صعود",
            "جواز",
            "شنطة سفر"
          ],
          "correctIndex": 2,
          "answer": "جواز",
          "explanationAr": "\"passport\" /ˈpæspɔːrt/ تعني: جواز. مثال: Passport, please."
        },
        {
          "id": "sc_214_e2",
          "type": "meaning",
          "promptEn": "What does \"boarding pass\" mean?",
          "promptAr": "ما معنى \"boarding pass\"؟",
          "options": [
            "شنطة يد",
            "متأخر",
            "غرض",
            "بطاقة صعود"
          ],
          "correctIndex": 3,
          "answer": "بطاقة صعود",
          "explanationAr": "\"boarding pass\" /ˈbɔːrdɪŋ pæs/ تعني: بطاقة صعود. مثال: Here's your boarding pass."
        },
        {
          "id": "sc_214_e3",
          "type": "meaning",
          "promptEn": "What does \"gate\" mean?",
          "promptAr": "ما معنى \"gate\"؟",
          "options": [
            "شنطة سفر",
            "ممر",
            "بوابة",
            "غرض"
          ],
          "correctIndex": 2,
          "answer": "بوابة",
          "explanationAr": "\"gate\" /ɡeɪt/ تعني: بوابة. مثال: Gate B12"
        },
        {
          "id": "sc_214_e4",
          "type": "meaning",
          "promptEn": "What does \"suitcase\" mean?",
          "promptAr": "ما معنى \"suitcase\"؟",
          "options": [
            "شنطة سفر",
            "متأخر",
            "جواز",
            "الجمارك"
          ],
          "correctIndex": 0,
          "answer": "شنطة سفر",
          "explanationAr": "\"suitcase\" /ˈsuːtkeɪs/ تعني: شنطة سفر. مثال: one suitcase"
        }
      ],
      "medium": [
        {
          "id": "sc_214_m1",
          "type": "gap",
          "promptEn": "Complete: I'd like a ____, please.",
          "promptAr": "أكمل الفراغ: (أبي مقعد جنب الشباك لو سمحت.)",
          "options": [
            "seat window",
            "window chair",
            "window seat"
          ],
          "correctIndex": 2,
          "answer": "I'd like a window seat, please.",
          "explanationAr": "الإجابة: window seat. أسئلة شائعة: Where are you flying to? / What's the purpose of your visit? / How long are you staying? والردود قصيرة وواضحة."
        },
        {
          "id": "sc_214_m2",
          "type": "gap",
          "promptEn": "Complete: I'm here ____ for two weeks.",
          "promptAr": "أكمل الفراغ: (جاي سياحة لمدة أسبوعين.)",
          "options": [
            "in holiday",
            "on holiday",
            "for holiday"
          ],
          "correctIndex": 1,
          "answer": "I'm here on holiday for two weeks.",
          "explanationAr": "الإجابة: on holiday. أسئلة شائعة: Where are you flying to? / What's the purpose of your visit? / How long are you staying? والردود قصيرة وواضحة."
        },
        {
          "id": "sc_214_m3",
          "type": "gap",
          "promptEn": "Complete: I have one suitcase to ____.",
          "promptAr": "أكمل الفراغ: (عندي شنطة وحدة أشحنها.)",
          "options": [
            "check in",
            "charge",
            "ship"
          ],
          "correctIndex": 0,
          "answer": "I have one suitcase to check in.",
          "explanationAr": "الإجابة: check in. أسئلة شائعة: Where are you flying to? / What's the purpose of your visit? / How long are you staying? والردود قصيرة وواضحة."
        },
        {
          "id": "sc_214_m4",
          "type": "gap",
          "promptEn": "Complete: Which ____ is it?",
          "promptAr": "أكمل الفراغ: (أي بوابة؟)",
          "options": [
            "port",
            "door",
            "gate"
          ],
          "correctIndex": 2,
          "answer": "Which gate is it?",
          "explanationAr": "الإجابة: gate. أسئلة شائعة: Where are you flying to? / What's the purpose of your visit? / How long are you staying? والردود قصيرة وواضحة."
        }
      ],
      "hard": [
        {
          "id": "sc_214_h1",
          "type": "order",
          "promptEn": "Put the words in order: take / out? / Do / I / my / need / laptop / to",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (لازم أطلع اللابتوب؟)",
          "answer": "Do I need to take my laptop out?",
          "explanationAr": "الترتيب الصحيح: Do I need to take my laptop out?"
        },
        {
          "id": "sc_214_h2",
          "type": "order",
          "promptEn": "Put the words in order: flight / My / delayed. / is",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (رحلتي متأخرة.)",
          "answer": "My flight is delayed.",
          "explanationAr": "الترتيب الصحيح: My flight is delayed."
        },
        {
          "id": "sc_214_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: جاي سياحة لمدة أسبوعين.",
          "answer": "I'm here on holiday for two weeks.",
          "explanationAr": "ترجمة مقترحة: I'm here on holiday for two weeks."
        },
        {
          "id": "sc_214_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أي بوابة؟",
          "answer": "Which gate is it?",
          "explanationAr": "ترجمة مقترحة: Which gate is it?"
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "I'm going for tourism for two weeks.",
        "correct": "I'm here on holiday for two weeks.",
        "whyAr": "عند الوصول نستخدم I'm here."
      },
      {
        "incorrect": "Where is the door number 5?",
        "correct": "Where is gate 5?",
        "whyAr": "بوابة الطيارة = gate."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (في الفندق: الحجز وتسجيل الدخول): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "The AC not working.",
          "The AC isn't working.",
          "I came for tourism."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: The AC isn't working. — لا تحذف is.",
        "fromLessonId": "sc_213"
      },
      {
        "questionAr": "مراجعة (المكالمات الهاتفية الأساسية): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Hello, this are Ahmed.",
          "Hello, this is Ahmed.",
          "Hello, I am Ahmed."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Hello, this is Ahmed. — على الهاتف: this is.",
        "fromLessonId": "sc_212_s"
      },
      {
        "questionAr": "مراجعة (شراء الملابس: المقاسات والتجربة): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Can I try on it?",
          "Can I try it on?",
          "I came for tourism."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Can I try it on? — الضمير بين try و on.",
        "fromLessonId": "sc_209"
      },
      {
        "questionAr": "ما معنى \"rest\"؟",
        "questionEn": "What does \"rest\" mean?",
        "options": [
          "راحة",
          "عنده حساسية",
          "صداع",
          "مرتين يومياً"
        ],
        "correctIndex": 0,
        "explanationAr": "\"rest\" /rɛst/ تعني: راحة. مثال: Get some rest.",
        "fromLessonId": "sc_202"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (عندي شنطة وحدة أشحنها.)",
          "questionEn": "Complete: I have one suitcase to ____.",
          "options": [
            "check in",
            "charge",
            "ship"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: check in. أسئلة شائعة: Where are you flying to? / What's the purpose of your visit? / How long are you staying? والردود قصيرة وواضحة."
        },
        {
          "questionAr": "أكمل الفراغ: (أي بوابة؟)",
          "questionEn": "Complete: Which ____ is it?",
          "options": [
            "port",
            "door",
            "gate"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: gate. أسئلة شائعة: Where are you flying to? / What's the purpose of your visit? / How long are you staying? والردود قصيرة وواضحة."
        },
        {
          "questionAr": "ما معنى \"carry-on\"؟",
          "questionEn": "What does \"carry-on\" mean?",
          "options": [
            "جواز",
            "ممر",
            "شنطة يد",
            "بطاقة صعود"
          ],
          "correctIndex": 2,
          "explanationAr": "\"carry-on\" /ˈkæri ɑːn/ تعني: شنطة يد. مثال: Is this your carry-on?"
        },
        {
          "questionAr": "ما معنى \"aisle\"؟",
          "questionEn": "What does \"aisle\" mean?",
          "options": [
            "شنطة سفر",
            "شنطة يد",
            "ممر",
            "الجمارك"
          ],
          "correctIndex": 2,
          "explanationAr": "\"aisle\" /aɪl/ تعني: ممر. مثال: an aisle seat"
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "I'm going for tourism for two weeks.",
            "I'm here on holiday for weeks two.",
            "I'm here on holiday for two weeks."
          ],
          "correctIndex": 2,
          "explanationAr": "الصحيح: I'm here on holiday for two weeks. — عند الوصول نستخدم I'm here."
        }
      ]
    }
  },
  {
    "id": "sc_215",
    "pillarId": "conversation",
    "pillarNameAr": "المحادثة والطلاقة التفاعلية",
    "pillarNameEn": "Active Conversation & Fluency Drills",
    "pillarIcon": "💬",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "المواصلات: التاكسي والأوبر والمترو",
    "titleEn": "Getting Around: Taxi, Uber and Metro",
    "descAr": "اطلب توصيلة، قل وين تبي تنزل، واسأل عن الأجرة والتذاكر.",
    "descEn": "Get a ride, say where to stop and ask about fares and tickets.",
    "speakingGoalAr": "وجه سائق التاكسي لعنوانك واسأل عن السعر.",
    "speakingGoalEn": "Direct a driver to your address and ask the fare.",
    "keyPattern": {
      "ruleAr": "Could you take me to...? / Please stop here. / How long does it take? / A single/return ticket to...",
      "ruleEn": "Ask 'Could you take me to...?', 'How long does it take?', 'Can you stop here?'.",
      "formula": "Could you take me to + place? | How long does it take to get to ...? | Can you stop here, please?"
    },
    "practicalExamples": [
      {
        "en": "Could you take me to King Khalid Airport?",
        "ar": "ممكن توديني مطار الملك خالد؟"
      },
      {
        "en": "How long does it take to get there?",
        "ar": "كم ياخذ وقت لين نوصل؟"
      },
      {
        "en": "Can you stop here, please?",
        "ar": "ممكن توقف هنا؟"
      },
      {
        "en": "A return ticket to Al Olaya station, please.",
        "ar": "تذكرة ذهاب وعودة لمحطة العليا."
      },
      {
        "en": "Is the metro running on Friday morning?",
        "ar": "المترو شغال الجمعة الصبح؟"
      },
      {
        "en": "Keep the change.",
        "ar": "خل الباقي لك."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Down me here.",
        "correct": "Can you stop here, please? / You can drop me here.",
        "whyAr": "«نزلني» = drop me off."
      },
      {
        "incorrect": "How much time it takes?",
        "correct": "How long does it take?",
        "whyAr": "السؤال عن المدة: How long."
      },
      {
        "incorrect": "I want to go to airport.",
        "correct": "Could you take me to the airport?",
        "whyAr": "the مع airport + أسلوب أطيب."
      }
    ],
    "speakingChallenge": {
      "promptAr": "أنت في أوبر. وجّه السائقة سارة.",
      "promptEn": "You're in an Uber. Direct Sara the driver.",
      "saraQuestionAr": "مساء الخير! نفس العنوان في التطبيق؟",
      "saraQuestionEn": "Hi! Same address as in the app?",
      "recommendedResponseEn": "Hi! Yes, but could you take me to the back entrance? How long does it take? Please stop next to the pharmacy. Thank you!"
    },
    "quiz": [
      {
        "questionAr": "«نزلني هنا» =",
        "questionEn": "'نزلني هنا' =",
        "options": [
          "Down me here.",
          "Drop me off here.",
          "Put me here."
        ],
        "correctIndex": 1,
        "explanationAr": "drop off."
      },
      {
        "questionAr": "سؤال المدة:",
        "questionEn": "Ask duration:",
        "options": [
          "How much it take?",
          "How long does it take?",
          "How time?"
        ],
        "correctIndex": 1,
        "explanationAr": "How long."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Can you stop here, please? / You can drop me here.",
          "How much time it takes?",
          "Down me here."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Can you stop here, please? / You can drop me here. — «نزلني» = drop me off."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "How much time it takes?",
          "How long does it take?",
          "How long do it take?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: How long does it take? — السؤال عن المدة: How long."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Could you take me to the airport?",
          "Could you take me to airport the?",
          "I want to go to airport."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Could you take me to the airport? — the مع airport + أسلوب أطيب."
      }
    ],
    "whiteboardNotes": {
      "title": "Getting Around: Taxi, Uber and Metro",
      "pointsAr": [
        "يطلب الوجهة بأدب.",
        "يسأل عن المدة والأجرة.",
        "يشتري تذكرة.",
        "Could you take me to...? / Please stop here. / How long does it take? / A single/return ticket to..."
      ],
      "pointsEn": [
        "State a destination politely.",
        "Ask about time and fare.",
        "Buy a ticket.",
        "Ask 'Could you take me to...?', 'How long does it take?', 'Can you stop here?'."
      ],
      "chalkHighlight": "Could you take me to + place? | How long does it take to get to ...? | Can you stop here, please?"
    },
    "unit": 3,
    "cefr": "A2",
    "objectivesAr": [
      "يطلب الوجهة بأدب.",
      "يسأل عن المدة والأجرة.",
      "يشتري تذكرة."
    ],
    "objectivesEn": [
      "State a destination politely.",
      "Ask about time and fare.",
      "Buy a ticket."
    ],
    "vocabulary": [
      {
        "word": "fare",
        "ipa": "/fɛr/",
        "ar": "أجرة",
        "exampleEn": "How much is the fare?",
        "exampleAr": "كم الأجرة؟"
      },
      {
        "word": "drop off",
        "ipa": "/drɑːp ɔːf/",
        "ar": "ينزّل",
        "exampleEn": "Drop me off here.",
        "exampleAr": "نزلني هنا."
      },
      {
        "word": "pick up",
        "ipa": "/pɪk ʌp/",
        "ar": "يوصّل/يمر ياخذ",
        "exampleEn": "Pick me up at 8.",
        "exampleAr": "مرني الساعة ٨."
      },
      {
        "word": "station",
        "ipa": "/ˈsteɪʃən/",
        "ar": "محطة",
        "exampleEn": "metro station",
        "exampleAr": "محطة مترو"
      },
      {
        "word": "single",
        "ipa": "/ˈsɪŋɡəl/",
        "ar": "ذهاب فقط",
        "exampleEn": "a single ticket",
        "exampleAr": "تذكرة ذهاب"
      },
      {
        "word": "return",
        "ipa": "/rɪˈtɜːrn/",
        "ar": "ذهاب وعودة",
        "exampleEn": "a return ticket",
        "exampleAr": "ذهاب وعودة"
      },
      {
        "word": "line",
        "ipa": "/laɪn/",
        "ar": "خط (مترو)",
        "exampleEn": "Take the blue line.",
        "exampleAr": "خذ الخط الأزرق."
      },
      {
        "word": "change",
        "ipa": "/tʃeɪndʒ/",
        "ar": "باقي الفلوس/يغيّر",
        "exampleEn": "Keep the change.",
        "exampleAr": "خل الباقي."
      },
      {
        "word": "traffic jam",
        "ipa": "/ˈtræfɪk dʒæm/",
        "ar": "زحمة خانقة",
        "exampleEn": "We're in a traffic jam.",
        "exampleAr": "إحنا في زحمة."
      },
      {
        "word": "destination",
        "ipa": "/ˌdɛstɪˈneɪʃən/",
        "ar": "الوجهة",
        "exampleEn": "your destination",
        "exampleAr": "وجهتك"
      }
    ],
    "grammarFocus": {
      "ruleAr": "Could you take me to...? / Please stop here. / How long does it take? / A single/return ticket to...",
      "ruleEn": "Ask 'Could you take me to...?', 'How long does it take?', 'Can you stop here?'.",
      "formula": "Could you take me to + place? | How long does it take to get to ...? | Can you stop here, please?",
      "examples": [
        {
          "en": "Could you take me to King Khalid Airport?",
          "ar": "ممكن توديني مطار الملك خالد؟"
        },
        {
          "en": "How long does it take to get there?",
          "ar": "كم ياخذ وقت لين نوصل؟"
        },
        {
          "en": "Can you stop here, please?",
          "ar": "ممكن توقف هنا؟"
        },
        {
          "en": "A return ticket to Al Olaya station, please.",
          "ar": "تذكرة ذهاب وعودة لمحطة العليا."
        },
        {
          "en": "Is the metro running on Friday morning?",
          "ar": "المترو شغال الجمعة الصبح؟"
        },
        {
          "en": "Keep the change.",
          "ar": "خل الباقي لك."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Hi! Where to?",
        "ar": "هلا! لوين؟"
      },
      {
        "speaker": "Student",
        "en": "Could you take me to Riyadh Park Mall, please?",
        "ar": "ممكن توديني رياض بارك؟"
      },
      {
        "speaker": "Sara",
        "en": "Sure. There's a traffic jam on King Fahd Road.",
        "ar": "أكيد. فيه زحمة في طريق الملك فهد."
      },
      {
        "speaker": "Student",
        "en": "How long does it take?",
        "ar": "كم ياخذ؟"
      },
      {
        "speaker": "Sara",
        "en": "About twenty-five minutes.",
        "ar": "حوالي خمس وعشرين دقيقة."
      },
      {
        "speaker": "Student",
        "en": "OK. Can you drop me off at gate three?",
        "ar": "تمام. ممكن تنزلني عند بوابة ٣؟"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Hi! Where to?\nStudent: Could you take me to Riyadh Park Mall, please?\nSara: Sure. There's a traffic jam on King Fahd Road.\nStudent: How long does it take?\nSara: About twenty-five minutes.\nStudent: OK. Can you drop me off at gate three?",
      "questions": [
        {
          "questionAr": "لوين؟",
          "questionEn": "Where is the student going?",
          "options": [
            "the airport",
            "Riyadh Park Mall",
            "Olaya station"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: Riyadh Park Mall"
        },
        {
          "questionAr": "وين الزحمة؟",
          "questionEn": "Where is the traffic jam?",
          "options": [
            "King Fahd Road",
            "Olaya Street",
            "the ring road"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: King Fahd Road"
        },
        {
          "questionAr": "وين ينزل؟",
          "questionEn": "Where does he want to stop?",
          "options": [
            "gate one",
            "gate three",
            "the parking"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: gate three"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "How long /haʊ lɔːŋ/ vs How much",
      "items": [
        "How long /haʊ lɔːŋ/",
        "station /ˈsteɪʃən/",
        "fare /fɛr/ = fair"
      ],
      "tipAr": "fare وfair نفس النطق تماماً."
    },
    "exercises": {
      "easy": [
        {
          "id": "sc_215_e1",
          "type": "meaning",
          "promptEn": "What does \"fare\" mean?",
          "promptAr": "ما معنى \"fare\"؟",
          "options": [
            "ينزّل",
            "أجرة",
            "زحمة خانقة",
            "باقي الفلوس/يغيّر"
          ],
          "correctIndex": 1,
          "answer": "أجرة",
          "explanationAr": "\"fare\" /fɛr/ تعني: أجرة. مثال: How much is the fare?"
        },
        {
          "id": "sc_215_e2",
          "type": "meaning",
          "promptEn": "What does \"drop off\" mean?",
          "promptAr": "ما معنى \"drop off\"؟",
          "options": [
            "ذهاب وعودة",
            "الوجهة",
            "ينزّل",
            "خط (مترو)"
          ],
          "correctIndex": 2,
          "answer": "ينزّل",
          "explanationAr": "\"drop off\" /drɑːp ɔːf/ تعني: ينزّل. مثال: Drop me off here."
        },
        {
          "id": "sc_215_e3",
          "type": "meaning",
          "promptEn": "What does \"pick up\" mean?",
          "promptAr": "ما معنى \"pick up\"؟",
          "options": [
            "يوصّل/يمر ياخذ",
            "ذهاب فقط",
            "ينزّل",
            "خط (مترو)"
          ],
          "correctIndex": 0,
          "answer": "يوصّل/يمر ياخذ",
          "explanationAr": "\"pick up\" /pɪk ʌp/ تعني: يوصّل/يمر ياخذ. مثال: Pick me up at 8."
        },
        {
          "id": "sc_215_e4",
          "type": "meaning",
          "promptEn": "What does \"station\" mean?",
          "promptAr": "ما معنى \"station\"؟",
          "options": [
            "زحمة خانقة",
            "محطة",
            "ينزّل",
            "ذهاب وعودة"
          ],
          "correctIndex": 1,
          "answer": "محطة",
          "explanationAr": "\"station\" /ˈsteɪʃən/ تعني: محطة. مثال: metro station"
        }
      ],
      "medium": [
        {
          "id": "sc_215_m1",
          "type": "gap",
          "promptEn": "Complete: Could you ____ King Khalid Airport?",
          "promptAr": "أكمل الفراغ: (ممكن توديني مطار الملك خالد؟)",
          "options": [
            "bring me",
            "take me to",
            "go me to"
          ],
          "correctIndex": 1,
          "answer": "Could you take me to King Khalid Airport?",
          "explanationAr": "الإجابة: take me to. Could you take me to...? / Please stop here. / How long does it take? / A single/return ticket to..."
        },
        {
          "id": "sc_215_m2",
          "type": "gap",
          "promptEn": "Complete: ____ does it take to get there?",
          "promptAr": "أكمل الفراغ: (كم ياخذ وقت لين نوصل؟)",
          "options": [
            "How much",
            "How long",
            "How far time"
          ],
          "correctIndex": 1,
          "answer": "How long does it take to get there?",
          "explanationAr": "الإجابة: How long. Could you take me to...? / Please stop here. / How long does it take? / A single/return ticket to..."
        },
        {
          "id": "sc_215_m3",
          "type": "gap",
          "promptEn": "Complete: Can you ____ here, please?",
          "promptAr": "أكمل الفراغ: (ممكن توقف هنا؟)",
          "options": [
            "put",
            "stop",
            "down"
          ],
          "correctIndex": 1,
          "answer": "Can you stop here, please?",
          "explanationAr": "الإجابة: stop. Could you take me to...? / Please stop here. / How long does it take? / A single/return ticket to..."
        },
        {
          "id": "sc_215_m4",
          "type": "gap",
          "promptEn": "Complete: A ____ ticket to Al Olaya station, please.",
          "promptAr": "أكمل الفراغ: (تذكرة ذهاب وعودة لمحطة العليا.)",
          "options": [
            "return",
            "back",
            "two way"
          ],
          "correctIndex": 0,
          "answer": "A return ticket to Al Olaya station, please.",
          "explanationAr": "الإجابة: return. Could you take me to...? / Please stop here. / How long does it take? / A single/return ticket to..."
        }
      ],
      "hard": [
        {
          "id": "sc_215_h1",
          "type": "order",
          "promptEn": "Put the words in order: running / Is / Friday / the / morning? / metro / on",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (المترو شغال الجمعة الصبح؟)",
          "answer": "Is the metro running on Friday morning?",
          "explanationAr": "الترتيب الصحيح: Is the metro running on Friday morning?"
        },
        {
          "id": "sc_215_h2",
          "type": "order",
          "promptEn": "Put the words in order: change. / Keep / the",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (خل الباقي لك.)",
          "answer": "Keep the change.",
          "explanationAr": "الترتيب الصحيح: Keep the change."
        },
        {
          "id": "sc_215_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: كم ياخذ وقت لين نوصل؟",
          "answer": "How long does it take to get there?",
          "explanationAr": "ترجمة مقترحة: How long does it take to get there?"
        },
        {
          "id": "sc_215_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: تذكرة ذهاب وعودة لمحطة العليا.",
          "answer": "A return ticket to Al Olaya station, please.",
          "explanationAr": "ترجمة مقترحة: A return ticket to Al Olaya station, please."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Bring me to the mall.",
        "correct": "Take me to the mall.",
        "whyAr": "take = يودّي، bring = يجيب لمكان المتكلم."
      },
      {
        "incorrect": "Here is good, stop.",
        "correct": "Here is fine, thanks.",
        "whyAr": "أسلوب ألطف."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (في المطار: الكاونتر والجوازات): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'd like to check in my bag.",
          "I want to charge my bag.",
          "I'd like to check in bag my."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I'd like to check in my bag. — «أشحن الشنطة» = check in.",
        "fromLessonId": "sc_214"
      },
      {
        "questionAr": "مراجعة (عند الطبيب والصيدلية): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I has a headache.",
          "I have a headache.",
          "I have pain in my head."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I have a headache. — تعبير طبيعي أقصر.",
        "fromLessonId": "sc_202"
      },
      {
        "questionAr": "مراجعة (الهوايات ووقت الفراغ): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I enjoy swimming.",
          "I swimming enjoy.",
          "I enjoy to swim."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I enjoy swimming. — enjoy + ing دائماً.",
        "fromLessonId": "sc_210"
      },
      {
        "questionAr": "ما معنى \"view\"؟",
        "questionEn": "What does \"view\" mean?",
        "options": [
          "منشفة",
          "الاستقبال",
          "حجز",
          "إطلالة"
        ],
        "correctIndex": 3,
        "explanationAr": "\"view\" /vjuː/ تعني: إطلالة. مثال: a sea view",
        "fromLessonId": "sc_213"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (ممكن توقف هنا؟)",
          "questionEn": "Complete: Can you ____ here, please?",
          "options": [
            "put",
            "stop",
            "down"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: stop. Could you take me to...? / Please stop here. / How long does it take? / A single/return ticket to..."
        },
        {
          "questionAr": "أكمل الفراغ: (تذكرة ذهاب وعودة لمحطة العليا.)",
          "questionEn": "Complete: A ____ ticket to Al Olaya station, please.",
          "options": [
            "return",
            "back",
            "two way"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: return. Could you take me to...? / Please stop here. / How long does it take? / A single/return ticket to..."
        },
        {
          "questionAr": "ما معنى \"single\"؟",
          "questionEn": "What does \"single\" mean?",
          "options": [
            "خط (مترو)",
            "زحمة خانقة",
            "ينزّل",
            "ذهاب فقط"
          ],
          "correctIndex": 3,
          "explanationAr": "\"single\" /ˈsɪŋɡəl/ تعني: ذهاب فقط. مثال: a single ticket"
        },
        {
          "questionAr": "ما معنى \"return\"؟",
          "questionEn": "What does \"return\" mean?",
          "options": [
            "باقي الفلوس/يغيّر",
            "محطة",
            "ذهاب وعودة",
            "ذهاب فقط"
          ],
          "correctIndex": 2,
          "explanationAr": "\"return\" /rɪˈtɜːrn/ تعني: ذهاب وعودة. مثال: a return ticket"
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Take me to mall the.",
            "Bring me to the mall.",
            "Take me to the mall."
          ],
          "correctIndex": 2,
          "explanationAr": "الصحيح: Take me to the mall. — take = يودّي، bring = يجيب لمكان المتكلم."
        }
      ]
    }
  },
  {
    "id": "sc_216",
    "pillarId": "conversation",
    "pillarNameAr": "المحادثة والطلاقة التفاعلية",
    "pillarNameEn": "Active Conversation & Fluency Drills",
    "pillarIcon": "💬",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "الحديث الخفيف: الطقس والعطلة",
    "titleEn": "Small Talk: Weather and Weekends",
    "descAr": "افتح كلام خفيف مع زميل أو جار: الجو، الويكند، الأخبار العامة.",
    "descEn": "Start easy small talk: weather, weekends, general news.",
    "speakingGoalAr": "حافظ على حديث خفيف مع سارة لست جمل.",
    "speakingGoalEn": "Keep a light chat going for six exchanges.",
    "keyPattern": {
      "ruleAr": "ابدأ بتعليق أو سؤال سهل: It's so hot today, isn't it? / How was your weekend? وتابع بسؤال: What about you?",
      "ruleEn": "Open with an easy comment or question and keep it going with 'What about you?'.",
      "formula": "Comment + tag question (isn't it?) | How was your ...? | What about you?"
    },
    "practicalExamples": [
      {
        "en": "It's really hot today, isn't it?",
        "ar": "الجو حار مرة اليوم، صح؟"
      },
      {
        "en": "How was your weekend?",
        "ar": "كيف كان الويكند؟"
      },
      {
        "en": "Not bad, thanks. What about you?",
        "ar": "مو بطال. وأنت؟"
      },
      {
        "en": "I heard it might rain tomorrow.",
        "ar": "سمعت يمكن تمطر بكرة."
      },
      {
        "en": "The weather is perfect for camping.",
        "ar": "الجو مثالي للكشتة."
      },
      {
        "en": "Did you do anything fun?",
        "ar": "سويت شي حلو؟"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "It's hot, yes?",
        "correct": "It's hot, isn't it?",
        "whyAr": "سؤال الذيل الطبيعي."
      },
      {
        "incorrect": "How was your weekend? — Good.",
        "correct": "Pretty good, thanks! We went to the beach. How about you?",
        "whyAr": "الرد بكلمة يقتل الحوار."
      },
      {
        "incorrect": "Today is very weather.",
        "correct": "The weather is lovely today.",
        "whyAr": "weather اسم يحتاج صفة."
      }
    ],
    "speakingChallenge": {
      "promptAr": "سولف مع سارة في المصعد عن الجو والويكند.",
      "promptEn": "Small-talk with Sara in the lift.",
      "saraQuestionAr": "صباح الخير! الجو اليوم غريب، صح؟",
      "saraQuestionEn": "Morning! Strange weather today, isn't it?",
      "recommendedResponseEn": "Morning! Yes, it's really windy. How was your weekend? Mine was pretty good. We went camping near Thumamah. What about you?"
    },
    "quiz": [
      {
        "questionAr": "أكمل: It's cold, ___?",
        "questionEn": "Complete: It's cold, ___?",
        "options": [
          "isn't it",
          "is it",
          "doesn't it"
        ],
        "correctIndex": 0,
        "explanationAr": "إيجاب + isn't it."
      },
      {
        "questionAr": "رد يكمل الحوار:",
        "questionEn": "Reply that continues chat:",
        "options": [
          "Fine.",
          "Good, thanks! We had a barbecue. And you?",
          "Yes."
        ],
        "correctIndex": 1,
        "explanationAr": "اذكر تفصيل واسأل."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "How was your weekend? — Good.",
          "It's hot, isn't it?",
          "It's hot, yes?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: It's hot, isn't it? — سؤال الذيل الطبيعي."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Pretty good, thanks! We went to the beach. How you about?",
          "How was your weekend? — Good.",
          "Pretty good, thanks! We went to the beach. How about you?"
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: Pretty good, thanks! We went to the beach. How about you? — الرد بكلمة يقتل الحوار."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Today is very weather.",
          "The weather are lovely today.",
          "The weather is lovely today."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: The weather is lovely today. — weather اسم يحتاج صفة."
      }
    ],
    "whiteboardNotes": {
      "title": "Small Talk: Weather and Weekends",
      "pointsAr": [
        "يبدأ حديثاً خفيفاً.",
        "يستخدم سؤال الذيل isn't it.",
        "يتابع الحديث بسؤال مقابل.",
        "ابدأ بتعليق أو سؤال سهل: It's so hot today, isn't it? / How was your weekend? وتابع بسؤال: What about you?"
      ],
      "pointsEn": [
        "Start small talk.",
        "Use tag questions.",
        "Keep a conversation going.",
        "Open with an easy comment or question and keep it going with 'What about you?'."
      ],
      "chalkHighlight": "Comment + tag question (isn't it?) | How was your ...? | What about you?"
    },
    "unit": 3,
    "cefr": "A2",
    "objectivesAr": [
      "يبدأ حديثاً خفيفاً.",
      "يستخدم سؤال الذيل isn't it.",
      "يتابع الحديث بسؤال مقابل."
    ],
    "objectivesEn": [
      "Start small talk.",
      "Use tag questions.",
      "Keep a conversation going."
    ],
    "vocabulary": [
      {
        "word": "weather",
        "ipa": "/ˈwɛðər/",
        "ar": "الطقس",
        "exampleEn": "What's the weather like?",
        "exampleAr": "كيف الجو؟"
      },
      {
        "word": "humid",
        "ipa": "/ˈhjuːmɪd/",
        "ar": "رطب",
        "exampleEn": "Jeddah is humid.",
        "exampleAr": "جدة رطبة."
      },
      {
        "word": "sandstorm",
        "ipa": "/ˈsændstɔːrm/",
        "ar": "عاصفة رملية/غبار",
        "exampleEn": "There's a sandstorm today.",
        "exampleAr": "فيه غبار اليوم."
      },
      {
        "word": "cool",
        "ipa": "/kuːl/",
        "ar": "معتدل البرودة",
        "exampleEn": "It's cool in the evening.",
        "exampleAr": "الجو حلو بالليل."
      },
      {
        "word": "forecast",
        "ipa": "/ˈfɔːrkæst/",
        "ar": "توقعات الطقس",
        "exampleEn": "The forecast says rain.",
        "exampleAr": "التوقعات مطر."
      },
      {
        "word": "not bad",
        "ipa": "/nɑːt bæd/",
        "ar": "مو بطال",
        "exampleEn": "Not bad, thanks.",
        "exampleAr": "مو بطال."
      },
      {
        "word": "pretty good",
        "ipa": "/ˈprɪti ɡʊd/",
        "ar": "زين/كويس",
        "exampleEn": "Pretty good!",
        "exampleAr": "زين!"
      },
      {
        "word": "anyway",
        "ipa": "/ˈɛniweɪ/",
        "ar": "المهم/على كل",
        "exampleEn": "Anyway, see you!",
        "exampleAr": "المهم، أشوفك!"
      },
      {
        "word": "lovely",
        "ipa": "/ˈlʌvli/",
        "ar": "جميل/لطيف",
        "exampleEn": "Lovely weather!",
        "exampleAr": "جو جميل!"
      },
      {
        "word": "chat",
        "ipa": "/tʃæt/",
        "ar": "دردشة",
        "exampleEn": "Nice chatting with you.",
        "exampleAr": "سعدت بالسوالف معك."
      }
    ],
    "grammarFocus": {
      "ruleAr": "ابدأ بتعليق أو سؤال سهل: It's so hot today, isn't it? / How was your weekend? وتابع بسؤال: What about you?",
      "ruleEn": "Open with an easy comment or question and keep it going with 'What about you?'.",
      "formula": "Comment + tag question (isn't it?) | How was your ...? | What about you?",
      "examples": [
        {
          "en": "It's really hot today, isn't it?",
          "ar": "الجو حار مرة اليوم، صح؟"
        },
        {
          "en": "How was your weekend?",
          "ar": "كيف كان الويكند؟"
        },
        {
          "en": "Not bad, thanks. What about you?",
          "ar": "مو بطال. وأنت؟"
        },
        {
          "en": "I heard it might rain tomorrow.",
          "ar": "سمعت يمكن تمطر بكرة."
        },
        {
          "en": "The weather is perfect for camping.",
          "ar": "الجو مثالي للكشتة."
        },
        {
          "en": "Did you do anything fun?",
          "ar": "سويت شي حلو؟"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Morning! It's so humid today, isn't it?",
        "ar": "صباح الخير! الجو رطب مرة اليوم، صح؟"
      },
      {
        "speaker": "Student",
        "en": "Yes, terrible! How was your weekend?",
        "ar": "إيه، فظيع! كيف كان الويكند؟"
      },
      {
        "speaker": "Sara",
        "en": "Pretty good. I went to the beach. What about you?",
        "ar": "زين. رحت البحر. وأنت؟"
      },
      {
        "speaker": "Student",
        "en": "Not bad. I just relaxed at home.",
        "ar": "مو بطال. ارتحت في البيت."
      },
      {
        "speaker": "Sara",
        "en": "I heard there's a sandstorm tomorrow.",
        "ar": "سمعت فيه غبار بكرة."
      },
      {
        "speaker": "Student",
        "en": "Really? Anyway, nice chatting with you!",
        "ar": "صدق؟ المهم، سعدت بالسوالف معك!"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Morning! It's so humid today, isn't it?\nStudent: Yes, terrible! How was your weekend?\nSara: Pretty good. I went to the beach. What about you?\nStudent: Not bad. I just relaxed at home.\nSara: I heard there's a sandstorm tomorrow.\nStudent: Really? Anyway, nice chatting with you!",
      "questions": [
        {
          "questionAr": "كيف الجو؟",
          "questionEn": "How's the weather?",
          "options": [
            "humid",
            "cold",
            "rainy"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: humid"
        },
        {
          "questionAr": "وين راحت سارة؟",
          "questionEn": "Where did Sara go?",
          "options": [
            "the mall",
            "the beach",
            "the desert"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: the beach"
        },
        {
          "questionAr": "وش بكرة؟",
          "questionEn": "What's coming tomorrow?",
          "options": [
            "rain",
            "a sandstorm",
            "snow"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: a sandstorm"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Falling tag: isn't it ↘ (agreeing)",
      "items": [
        "It's hot, ISn't it? ↘",
        "weather /ˈwɛðər/ = whether",
        "humid /ˈhjuːmɪd/"
      ],
      "tipAr": "في سؤال الذيل للمجاملة ينزل الصوت لأنك تتوقع الموافقة."
    },
    "exercises": {
      "easy": [
        {
          "id": "sc_216_e1",
          "type": "meaning",
          "promptEn": "What does \"weather\" mean?",
          "promptAr": "ما معنى \"weather\"؟",
          "options": [
            "توقعات الطقس",
            "زين/كويس",
            "الطقس",
            "معتدل البرودة"
          ],
          "correctIndex": 2,
          "answer": "الطقس",
          "explanationAr": "\"weather\" /ˈwɛðər/ تعني: الطقس. مثال: What's the weather like?"
        },
        {
          "id": "sc_216_e2",
          "type": "meaning",
          "promptEn": "What does \"humid\" mean?",
          "promptAr": "ما معنى \"humid\"؟",
          "options": [
            "الطقس",
            "مو بطال",
            "رطب",
            "زين/كويس"
          ],
          "correctIndex": 2,
          "answer": "رطب",
          "explanationAr": "\"humid\" /ˈhjuːmɪd/ تعني: رطب. مثال: Jeddah is humid."
        },
        {
          "id": "sc_216_e3",
          "type": "meaning",
          "promptEn": "What does \"sandstorm\" mean?",
          "promptAr": "ما معنى \"sandstorm\"؟",
          "options": [
            "معتدل البرودة",
            "عاصفة رملية/غبار",
            "رطب",
            "زين/كويس"
          ],
          "correctIndex": 1,
          "answer": "عاصفة رملية/غبار",
          "explanationAr": "\"sandstorm\" /ˈsændstɔːrm/ تعني: عاصفة رملية/غبار. مثال: There's a sandstorm today."
        },
        {
          "id": "sc_216_e4",
          "type": "meaning",
          "promptEn": "What does \"cool\" mean?",
          "promptAr": "ما معنى \"cool\"؟",
          "options": [
            "معتدل البرودة",
            "عاصفة رملية/غبار",
            "جميل/لطيف",
            "مو بطال"
          ],
          "correctIndex": 0,
          "answer": "معتدل البرودة",
          "explanationAr": "\"cool\" /kuːl/ تعني: معتدل البرودة. مثال: It's cool in the evening."
        }
      ],
      "medium": [
        {
          "id": "sc_216_m1",
          "type": "gap",
          "promptEn": "Complete: It's really hot today, ____?",
          "promptAr": "أكمل الفراغ: (الجو حار مرة اليوم، صح؟)",
          "options": [
            "no?",
            "isn't it",
            "is it"
          ],
          "correctIndex": 1,
          "answer": "It's really hot today, isn't it?",
          "explanationAr": "الإجابة: isn't it. ابدأ بتعليق أو سؤال سهل: It's so hot today, isn't it? / How was your weekend? وتابع بسؤال: What about you?"
        },
        {
          "id": "sc_216_m2",
          "type": "gap",
          "promptEn": "Complete: How ____ your weekend?",
          "promptAr": "أكمل الفراغ: (كيف كان الويكند؟)",
          "options": [
            "is",
            "were",
            "was"
          ],
          "correctIndex": 2,
          "answer": "How was your weekend?",
          "explanationAr": "الإجابة: was. ابدأ بتعليق أو سؤال سهل: It's so hot today, isn't it? / How was your weekend? وتابع بسؤال: What about you?"
        },
        {
          "id": "sc_216_m3",
          "type": "gap",
          "promptEn": "Complete: Not bad, thanks. ____ you?",
          "promptAr": "أكمل الفراغ: (مو بطال. وأنت؟)",
          "options": [
            "What about",
            "And for",
            "How about to"
          ],
          "correctIndex": 0,
          "answer": "Not bad, thanks. What about you?",
          "explanationAr": "الإجابة: What about. ابدأ بتعليق أو سؤال سهل: It's so hot today, isn't it? / How was your weekend? وتابع بسؤال: What about you?"
        },
        {
          "id": "sc_216_m4",
          "type": "gap",
          "promptEn": "Complete: I heard it ____ rain tomorrow.",
          "promptAr": "أكمل الفراغ: (سمعت يمكن تمطر بكرة.)",
          "options": [
            "must",
            "maybe",
            "might"
          ],
          "correctIndex": 2,
          "answer": "I heard it might rain tomorrow.",
          "explanationAr": "الإجابة: might. ابدأ بتعليق أو سؤال سهل: It's so hot today, isn't it? / How was your weekend? وتابع بسؤال: What about you?"
        }
      ],
      "hard": [
        {
          "id": "sc_216_h1",
          "type": "order",
          "promptEn": "Put the words in order: perfect / is / The / weather / for / camping.",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (الجو مثالي للكشتة.)",
          "answer": "The weather is perfect for camping.",
          "explanationAr": "الترتيب الصحيح: The weather is perfect for camping."
        },
        {
          "id": "sc_216_h2",
          "type": "order",
          "promptEn": "Put the words in order: do / anything / fun? / Did / you",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (سويت شي حلو؟)",
          "answer": "Did you do anything fun?",
          "explanationAr": "الترتيب الصحيح: Did you do anything fun?"
        },
        {
          "id": "sc_216_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: كيف كان الويكند؟",
          "answer": "How was your weekend?",
          "explanationAr": "ترجمة مقترحة: How was your weekend?"
        },
        {
          "id": "sc_216_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: سمعت يمكن تمطر بكرة.",
          "answer": "I heard it might rain tomorrow.",
          "explanationAr": "ترجمة مقترحة: I heard it might rain tomorrow."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "The weather today is very hot, no?",
        "correct": "It's really hot today, isn't it?",
        "whyAr": "ترجمة «صح؟» = isn't it."
      },
      {
        "incorrect": "I was relaxing in house.",
        "correct": "I relaxed at home.",
        "whyAr": "at home بدون the."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (المواصلات: التاكسي والأوبر والمترو): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "How much time it takes?",
          "How long do it take?",
          "How long does it take?"
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: How long does it take? — السؤال عن المدة: How long.",
        "fromLessonId": "sc_215"
      },
      {
        "questionAr": "مراجعة (في الفندق: الحجز وتسجيل الدخول): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I have booking with name Al-Harbi.",
          "I have a reservation under Al-Harbi.",
          "I has a reservation under Al-Harbi."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I have a reservation under Al-Harbi. — التعبير الثابت: under + name.",
        "fromLessonId": "sc_213"
      },
      {
        "questionAr": "مراجعة (الدعوات والمواعيد): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Would you like to come me with?",
          "Would you like to come with me?",
          "Do you like to come with me?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Would you like to come with me? — Do you like = هل تحب عادة؛ للدعوة Would you like.",
        "fromLessonId": "sc_211_s"
      },
      {
        "questionAr": "ما معنى \"boarding\"؟",
        "questionEn": "What does \"boarding\" mean?",
        "options": [
          "الصعود للطائرة",
          "ممر",
          "شنطة يد",
          "بطاقة صعود"
        ],
        "correctIndex": 0,
        "explanationAr": "\"boarding\" /ˈbɔːrdɪŋ/ تعني: الصعود للطائرة. مثال: Boarding starts at 9.",
        "fromLessonId": "sc_214"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (مو بطال. وأنت؟)",
          "questionEn": "Complete: Not bad, thanks. ____ you?",
          "options": [
            "What about",
            "And for",
            "How about to"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: What about. ابدأ بتعليق أو سؤال سهل: It's so hot today, isn't it? / How was your weekend? وتابع بسؤال: What about you?"
        },
        {
          "questionAr": "أكمل الفراغ: (سمعت يمكن تمطر بكرة.)",
          "questionEn": "Complete: I heard it ____ rain tomorrow.",
          "options": [
            "must",
            "maybe",
            "might"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: might. ابدأ بتعليق أو سؤال سهل: It's so hot today, isn't it? / How was your weekend? وتابع بسؤال: What about you?"
        },
        {
          "questionAr": "ما معنى \"forecast\"؟",
          "questionEn": "What does \"forecast\" mean?",
          "options": [
            "الطقس",
            "توقعات الطقس",
            "مو بطال",
            "زين/كويس"
          ],
          "correctIndex": 1,
          "explanationAr": "\"forecast\" /ˈfɔːrkæst/ تعني: توقعات الطقس. مثال: The forecast says rain."
        },
        {
          "questionAr": "ما معنى \"not bad\"؟",
          "questionEn": "What does \"not bad\" mean?",
          "options": [
            "رطب",
            "عاصفة رملية/غبار",
            "مو بطال",
            "جميل/لطيف"
          ],
          "correctIndex": 2,
          "explanationAr": "\"not bad\" /nɑːt bæd/ تعني: مو بطال. مثال: Not bad, thanks."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "It's really hot today, isn't it?",
            "It's hot, yes?",
            "The weather today is very hot, no?"
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: It's really hot today, isn't it? — ترجمة «صح؟» = isn't it."
        }
      ]
    }
  },
  {
    "id": "sc_217",
    "pillarId": "conversation",
    "pillarNameAr": "المحادثة والطلاقة التفاعلية",
    "pillarNameEn": "Active Conversation & Fluency Drills",
    "pillarIcon": "💬",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "وصف الأشخاص: الشكل والشخصية",
    "titleEn": "Describing People: Looks and Personality",
    "descAr": "صف شكل شخص وشخصيته: طويل، شعره، لابس، طيب، خجول.",
    "descEn": "Describe someone's appearance and personality.",
    "speakingGoalAr": "صف لسارة شخصاً تعرفه حتى تقدر ترسمه.",
    "speakingGoalEn": "Describe someone so well Sara could draw them.",
    "keyPattern": {
      "ruleAr": "What does he look like? للشكل، و What is he like? للشخصية. وترتيب الصفات: long black hair.",
      "ruleEn": "'What does she look like?' = appearance; 'What is she like?' = personality. Adjective order: long black hair.",
      "formula": "He/She is + adj | has + (adj) hair/eyes | is wearing + clothes"
    },
    "practicalExamples": [
      {
        "en": "What does your brother look like?",
        "ar": "كيف شكل أخوك؟"
      },
      {
        "en": "He's tall and he has short curly hair.",
        "ar": "طويل وشعره قصير ومجعد."
      },
      {
        "en": "She's wearing a black abaya and glasses.",
        "ar": "لابسة عباية سوداء ونظارة."
      },
      {
        "en": "What's your teacher like? — She's patient and funny.",
        "ar": "كيف معلمتك؟ صبورة ومرحة."
      },
      {
        "en": "My grandfather has a white beard.",
        "ar": "جدي عنده لحية بيضاء."
      },
      {
        "en": "He's a bit shy, but very generous.",
        "ar": "خجول شوي بس كريم مرة."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "He has tall.",
        "correct": "He is tall.",
        "whyAr": "الطول صفة مع is."
      },
      {
        "incorrect": "She has hair black long.",
        "correct": "She has long black hair.",
        "whyAr": "الصفات قبل الاسم بترتيب الحجم ثم اللون."
      },
      {
        "incorrect": "How is he look?",
        "correct": "What does he look like?",
        "whyAr": "سؤال الشكل الصحيح."
      }
    ],
    "speakingChallenge": {
      "promptAr": "صف لسارة صديقك المفضل.",
      "promptEn": "Describe your best friend to Sara.",
      "saraQuestionAr": "صف لي أعز أصدقائك: شكله وشخصيته!",
      "saraQuestionEn": "Describe your best friend: looks and personality!",
      "recommendedResponseEn": "My best friend Omar is medium height. He has short black hair and a beard. He usually wears a thobe. He's funny, generous and very patient."
    },
    "quiz": [
      {
        "questionAr": "سؤال عن الشخصية:",
        "questionEn": "Personality question:",
        "options": [
          "What does she look like?",
          "What is she like?",
          "How she looks?"
        ],
        "correctIndex": 1,
        "explanationAr": "What is she like?"
      },
      {
        "questionAr": "ترتيب صحيح:",
        "questionEn": "Correct order:",
        "options": [
          "black long hair",
          "long black hair",
          "hair long black"
        ],
        "correctIndex": 1,
        "explanationAr": "الحجم قبل اللون."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "He are tall.",
          "He has tall.",
          "He is tall."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: He is tall. — الطول صفة مع is."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "She has long black hair.",
          "She have long black hair.",
          "She has hair black long."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: She has long black hair. — الصفات قبل الاسم بترتيب الحجم ثم اللون."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "How is he look?",
          "What does he look like?",
          "What do he look like?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: What does he look like? — سؤال الشكل الصحيح."
      }
    ],
    "whiteboardNotes": {
      "title": "Describing People: Looks and Personality",
      "pointsAr": [
        "يفرق بين look like و be like.",
        "يصف الشعر والطول والملابس.",
        "يصف الشخصية بصفات دقيقة.",
        "What does he look like? للشكل، و What is he like? للشخصية. وترتيب الصفات: long black hair."
      ],
      "pointsEn": [
        "Distinguish 'look like' and 'be like'.",
        "Describe hair, height and clothes.",
        "Use personality adjectives.",
        "'What does she look like?' = appearance; 'What is she like?' = personality. Adjective order: long black hair."
      ],
      "chalkHighlight": "He/She is + adj | has + (adj) hair/eyes | is wearing + clothes"
    },
    "unit": 4,
    "cefr": "A2",
    "objectivesAr": [
      "يفرق بين look like و be like.",
      "يصف الشعر والطول والملابس.",
      "يصف الشخصية بصفات دقيقة."
    ],
    "objectivesEn": [
      "Distinguish 'look like' and 'be like'.",
      "Describe hair, height and clothes.",
      "Use personality adjectives."
    ],
    "vocabulary": [
      {
        "word": "tall",
        "ipa": "/tɔːl/",
        "ar": "طويل",
        "exampleEn": "He's very tall.",
        "exampleAr": "طويل مرة."
      },
      {
        "word": "short",
        "ipa": "/ʃɔːrt/",
        "ar": "قصير",
        "exampleEn": "She's short.",
        "exampleAr": "قصيرة."
      },
      {
        "word": "curly",
        "ipa": "/ˈkɜːrli/",
        "ar": "مجعد",
        "exampleEn": "curly hair",
        "exampleAr": "شعر مجعد"
      },
      {
        "word": "straight",
        "ipa": "/streɪt/",
        "ar": "ناعم/سايح",
        "exampleEn": "straight hair",
        "exampleAr": "شعر ناعم"
      },
      {
        "word": "beard",
        "ipa": "/bɪrd/",
        "ar": "لحية",
        "exampleEn": "a long beard",
        "exampleAr": "لحية طويلة"
      },
      {
        "word": "glasses",
        "ipa": "/ˈɡlæsɪz/",
        "ar": "نظارة",
        "exampleEn": "She wears glasses.",
        "exampleAr": "تلبس نظارة."
      },
      {
        "word": "patient",
        "ipa": "/ˈpeɪʃənt/",
        "ar": "صبور",
        "exampleEn": "a patient teacher",
        "exampleAr": "معلمة صبورة"
      },
      {
        "word": "generous",
        "ipa": "/ˈdʒɛnərəs/",
        "ar": "كريم",
        "exampleEn": "Saudi people are generous.",
        "exampleAr": "السعوديين كرماء."
      },
      {
        "word": "shy",
        "ipa": "/ʃaɪ/",
        "ar": "خجول",
        "exampleEn": "He's shy.",
        "exampleAr": "خجول."
      },
      {
        "word": "friendly",
        "ipa": "/ˈfrɛndli/",
        "ar": "ودود",
        "exampleEn": "She's friendly.",
        "exampleAr": "ودودة."
      }
    ],
    "grammarFocus": {
      "ruleAr": "What does he look like? للشكل، و What is he like? للشخصية. وترتيب الصفات: long black hair.",
      "ruleEn": "'What does she look like?' = appearance; 'What is she like?' = personality. Adjective order: long black hair.",
      "formula": "He/She is + adj | has + (adj) hair/eyes | is wearing + clothes",
      "examples": [
        {
          "en": "What does your brother look like?",
          "ar": "كيف شكل أخوك؟"
        },
        {
          "en": "He's tall and he has short curly hair.",
          "ar": "طويل وشعره قصير ومجعد."
        },
        {
          "en": "She's wearing a black abaya and glasses.",
          "ar": "لابسة عباية سوداء ونظارة."
        },
        {
          "en": "What's your teacher like? — She's patient and funny.",
          "ar": "كيف معلمتك؟ صبورة ومرحة."
        },
        {
          "en": "My grandfather has a white beard.",
          "ar": "جدي عنده لحية بيضاء."
        },
        {
          "en": "He's a bit shy, but very generous.",
          "ar": "خجول شوي بس كريم مرة."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "I'm meeting your cousin at the airport. What does he look like?",
        "ar": "بقابل ولد عمك في المطار. كيف شكله؟"
      },
      {
        "speaker": "Student",
        "en": "He's tall and slim. He has a short beard.",
        "ar": "طويل ونحيف. عنده لحية قصيرة."
      },
      {
        "speaker": "Sara",
        "en": "What's he wearing today?",
        "ar": "وش لابس اليوم؟"
      },
      {
        "speaker": "Student",
        "en": "A white thobe and a red shemagh.",
        "ar": "ثوب أبيض وشماغ أحمر."
      },
      {
        "speaker": "Sara",
        "en": "And what's he like?",
        "ar": "وكيف شخصيته؟"
      },
      {
        "speaker": "Student",
        "en": "He's friendly but a bit shy at first.",
        "ar": "ودود بس خجول شوي في البداية."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: I'm meeting your cousin at the airport. What does he look like?\nStudent: He's tall and slim. He has a short beard.\nSara: What's he wearing today?\nStudent: A white thobe and a red shemagh.\nSara: And what's he like?\nStudent: He's friendly but a bit shy at first.",
      "questions": [
        {
          "questionAr": "شكل ولد العم؟",
          "questionEn": "What does the cousin look like?",
          "options": [
            "short and slim",
            "tall and slim",
            "tall and big"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: tall and slim"
        },
        {
          "questionAr": "وش لابس؟",
          "questionEn": "What is he wearing?",
          "options": [
            "jeans",
            "a white thobe and red shemagh",
            "a suit"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: a white thobe and red shemagh"
        },
        {
          "questionAr": "شخصيته؟",
          "questionEn": "What's his personality?",
          "options": [
            "loud",
            "friendly but shy",
            "rude"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: friendly but shy"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "/ɪr/ in beard /bɪrd/ vs bird /bɜːrd/",
      "items": [
        "beard /bɪrd/",
        "bird /bɜːrd/",
        "curly /ˈkɜːrli/"
      ],
      "tipAr": "beard «بيرد» بصوت «ي»، و bird «بِرد» بصوت مختلف. الخلط بينهم يضحك!"
    },
    "exercises": {
      "easy": [
        {
          "id": "sc_217_e1",
          "type": "meaning",
          "promptEn": "What does \"tall\" mean?",
          "promptAr": "ما معنى \"tall\"؟",
          "options": [
            "طويل",
            "ناعم/سايح",
            "ودود",
            "لحية"
          ],
          "correctIndex": 0,
          "answer": "طويل",
          "explanationAr": "\"tall\" /tɔːl/ تعني: طويل. مثال: He's very tall."
        },
        {
          "id": "sc_217_e2",
          "type": "meaning",
          "promptEn": "What does \"short\" mean?",
          "promptAr": "ما معنى \"short\"؟",
          "options": [
            "خجول",
            "قصير",
            "صبور",
            "نظارة"
          ],
          "correctIndex": 1,
          "answer": "قصير",
          "explanationAr": "\"short\" /ʃɔːrt/ تعني: قصير. مثال: She's short."
        },
        {
          "id": "sc_217_e3",
          "type": "meaning",
          "promptEn": "What does \"curly\" mean?",
          "promptAr": "ما معنى \"curly\"؟",
          "options": [
            "صبور",
            "نظارة",
            "مجعد",
            "ودود"
          ],
          "correctIndex": 2,
          "answer": "مجعد",
          "explanationAr": "\"curly\" /ˈkɜːrli/ تعني: مجعد. مثال: curly hair"
        },
        {
          "id": "sc_217_e4",
          "type": "meaning",
          "promptEn": "What does \"straight\" mean?",
          "promptAr": "ما معنى \"straight\"؟",
          "options": [
            "طويل",
            "نظارة",
            "صبور",
            "ناعم/سايح"
          ],
          "correctIndex": 3,
          "answer": "ناعم/سايح",
          "explanationAr": "\"straight\" /streɪt/ تعني: ناعم/سايح. مثال: straight hair"
        }
      ],
      "medium": [
        {
          "id": "sc_217_m1",
          "type": "gap",
          "promptEn": "Complete: What does your brother ____?",
          "promptAr": "أكمل الفراغ: (كيف شكل أخوك؟)",
          "options": [
            "looks",
            "like",
            "look like"
          ],
          "correctIndex": 2,
          "answer": "What does your brother look like?",
          "explanationAr": "الإجابة: look like. What does he look like? للشكل، و What is he like? للشخصية. وترتيب الصفات: long black hair."
        },
        {
          "id": "sc_217_m2",
          "type": "gap",
          "promptEn": "Complete: He's tall and he ____ short curly hair.",
          "promptAr": "أكمل الفراغ: (طويل وشعره قصير ومجعد.)",
          "options": [
            "have",
            "is",
            "has"
          ],
          "correctIndex": 2,
          "answer": "He's tall and he has short curly hair.",
          "explanationAr": "الإجابة: has. What does he look like? للشكل، و What is he like? للشخصية. وترتيب الصفات: long black hair."
        },
        {
          "id": "sc_217_m3",
          "type": "gap",
          "promptEn": "Complete: She's ____ a black abaya and glasses.",
          "promptAr": "أكمل الفراغ: (لابسة عباية سوداء ونظارة.)",
          "options": [
            "dressing",
            "wearing",
            "carrying"
          ],
          "correctIndex": 1,
          "answer": "She's wearing a black abaya and glasses.",
          "explanationAr": "الإجابة: wearing. What does he look like? للشكل، و What is he like? للشخصية. وترتيب الصفات: long black hair."
        },
        {
          "id": "sc_217_m4",
          "type": "gap",
          "promptEn": "Complete: What's your teacher ____? — She's patient and funny.",
          "promptAr": "أكمل الفراغ: (كيف معلمتك؟ صبورة ومرحة.)",
          "options": [
            "as",
            "look",
            "like"
          ],
          "correctIndex": 2,
          "answer": "What's your teacher like? — She's patient and funny.",
          "explanationAr": "الإجابة: like. What does he look like? للشكل، و What is he like? للشخصية. وترتيب الصفات: long black hair."
        }
      ],
      "hard": [
        {
          "id": "sc_217_h1",
          "type": "order",
          "promptEn": "Put the words in order: white / has / My / beard. / a / grandfather",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (جدي عنده لحية بيضاء.)",
          "answer": "My grandfather has a white beard.",
          "explanationAr": "الترتيب الصحيح: My grandfather has a white beard."
        },
        {
          "id": "sc_217_h2",
          "type": "order",
          "promptEn": "Put the words in order: a / He's / shy, / bit / very / but / generous.",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (خجول شوي بس كريم مرة.)",
          "answer": "He's a bit shy, but very generous.",
          "explanationAr": "الترتيب الصحيح: He's a bit shy, but very generous."
        },
        {
          "id": "sc_217_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: طويل وشعره قصير ومجعد.",
          "answer": "He's tall and he has short curly hair.",
          "explanationAr": "ترجمة مقترحة: He's tall and he has short curly hair."
        },
        {
          "id": "sc_217_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: كيف معلمتك؟ صبورة ومرحة.",
          "answer": "What's your teacher like? — She's patient and funny.",
          "explanationAr": "ترجمة مقترحة: What's your teacher like? — She's patient and funny."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "He is having a beard.",
        "correct": "He has a beard.",
        "whyAr": "have للامتلاك ما تأخذ ing."
      },
      {
        "incorrect": "She is wearing glass.",
        "correct": "She is wearing glasses.",
        "whyAr": "glasses (نظارة) دائماً جمع."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (الحديث الخفيف: الطقس والعطلة): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Pretty good, thanks! We went to the beach. How you about?",
          "How was your weekend? — Good.",
          "Pretty good, thanks! We went to the beach. How about you?"
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: Pretty good, thanks! We went to the beach. How about you? — الرد بكلمة يقتل الحوار.",
        "fromLessonId": "sc_216"
      },
      {
        "questionAr": "مراجعة (في المطار: الكاونتر والجوازات): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I came for tourism.",
          "I'm here holiday on.",
          "I'm here on holiday. / I'm here for tourism."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: I'm here on holiday. / I'm here for tourism. — الصيغة الشائعة: on holiday.",
        "fromLessonId": "sc_214"
      },
      {
        "questionAr": "مراجعة (المكالمات الهاتفية الأساسية): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Hello, this are Ahmed.",
          "Hello, I am Ahmed.",
          "Hello, this is Ahmed."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: Hello, this is Ahmed. — على الهاتف: this is.",
        "fromLessonId": "sc_212_s"
      },
      {
        "questionAr": "ما معنى \"destination\"؟",
        "questionEn": "What does \"destination\" mean?",
        "options": [
          "باقي الفلوس/يغيّر",
          "ذهاب وعودة",
          "زحمة خانقة",
          "الوجهة"
        ],
        "correctIndex": 3,
        "explanationAr": "\"destination\" /ˌdɛstɪˈneɪʃən/ تعني: الوجهة. مثال: your destination",
        "fromLessonId": "sc_215"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (لابسة عباية سوداء ونظارة.)",
          "questionEn": "Complete: She's ____ a black abaya and glasses.",
          "options": [
            "dressing",
            "wearing",
            "carrying"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: wearing. What does he look like? للشكل، و What is he like? للشخصية. وترتيب الصفات: long black hair."
        },
        {
          "questionAr": "أكمل الفراغ: (كيف معلمتك؟ صبورة ومرحة.)",
          "questionEn": "Complete: What's your teacher ____? — She's patient and funny.",
          "options": [
            "as",
            "look",
            "like"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: like. What does he look like? للشكل، و What is he like? للشخصية. وترتيب الصفات: long black hair."
        },
        {
          "questionAr": "ما معنى \"beard\"؟",
          "questionEn": "What does \"beard\" mean?",
          "options": [
            "خجول",
            "ودود",
            "لحية",
            "مجعد"
          ],
          "correctIndex": 2,
          "explanationAr": "\"beard\" /bɪrd/ تعني: لحية. مثال: a long beard"
        },
        {
          "questionAr": "ما معنى \"glasses\"؟",
          "questionEn": "What does \"glasses\" mean?",
          "options": [
            "خجول",
            "طويل",
            "نظارة",
            "كريم"
          ],
          "correctIndex": 2,
          "explanationAr": "\"glasses\" /ˈɡlæsɪz/ تعني: نظارة. مثال: She wears glasses."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "He have a beard.",
            "He has a beard.",
            "He is having a beard."
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: He has a beard. — have للامتلاك ما تأخذ ing."
        }
      ]
    }
  },
  {
    "id": "sc_218",
    "pillarId": "conversation",
    "pillarNameAr": "المحادثة والطلاقة التفاعلية",
    "pillarNameEn": "Active Conversation & Fluency Drills",
    "pillarIcon": "💬",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "طلبات وشكاوى في المطعم",
    "titleEn": "Restaurant Requests and Polite Complaints",
    "descAr": "اطلب تعديلاً، بلّغ عن مشكلة في الطلب، واطلب الحساب بلباقة.",
    "descEn": "Make special requests, complain about an order politely and split the bill.",
    "speakingGoalAr": "حل مشكلتين في طلبك بلباقة.",
    "speakingGoalEn": "Politely solve two problems with your order.",
    "keyPattern": {
      "ruleAr": "Excuse me, I'm afraid... / I ordered X, but this is Y. / Could I have... instead? تبدأ بتلطيف ثم المشكلة ثم الطلب.",
      "ruleEn": "Soften, state the problem, then make a request.",
      "formula": "Excuse me, I'm afraid + problem. | I ordered X, but ... | Could you ...?"
    },
    "practicalExamples": [
      {
        "en": "Excuse me, I'm afraid this isn't what I ordered.",
        "ar": "لو سمحت، أخاف هذا مو اللي طلبته."
      },
      {
        "en": "I ordered the grilled chicken, not the fried one.",
        "ar": "طلبت الدجاج المشوي مو المقلي."
      },
      {
        "en": "Could I have it without onions, please?",
        "ar": "ممكن بدون بصل لو سمحت؟"
      },
      {
        "en": "My soup is a bit cold.",
        "ar": "الشوربة باردة شوي."
      },
      {
        "en": "Could we have the bill, please?",
        "ar": "ممكن الحساب لو سمحت؟"
      },
      {
        "en": "Can we split the bill?",
        "ar": "ممكن نقسم الحساب؟"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "This food is bad! Change it!",
        "correct": "Excuse me, I'm afraid my food is cold. Could you warm it up, please?",
        "whyAr": "الشكوى الفظة تخرب الخدمة."
      },
      {
        "incorrect": "Bring the check.",
        "correct": "Could we have the bill/check, please?",
        "whyAr": "صيغة الأمر قاسية."
      },
      {
        "incorrect": "I want it no onion.",
        "correct": "Could I have it without onions?",
        "whyAr": "without + اسم."
      }
    ],
    "speakingChallenge": {
      "promptAr": "طلبك وصل غلط. حل المشكلة مع سارة.",
      "promptEn": "Your order arrived wrong. Fix it with Sara.",
      "saraQuestionAr": "تفضل، هذا طلبك!",
      "saraQuestionEn": "Here's your order!",
      "recommendedResponseEn": "Excuse me, I'm afraid this isn't what I ordered. I ordered the grilled chicken without sauce. Could you change it, please? Thank you."
    },
    "quiz": [
      {
        "questionAr": "بداية مهذبة للشكوى:",
        "questionEn": "Polite complaint opener:",
        "options": [
          "Hey! Problem!",
          "Excuse me, I'm afraid...",
          "Listen to me."
        ],
        "correctIndex": 1,
        "explanationAr": "Excuse me, I'm afraid..."
      },
      {
        "questionAr": "«الحساب» في المطعم:",
        "questionEn": "'الحساب' in a restaurant:",
        "options": [
          "the account",
          "the bill",
          "the calculation"
        ],
        "correctIndex": 1,
        "explanationAr": "the bill."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Excuse me, I'm afraid my food is cold. Could you warm it up, please?",
          "This food is bad! Change it!",
          "Excuse me, I'm afraid my food are cold. Could you warm it up, please?"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Excuse me, I'm afraid my food is cold. Could you warm it up, please? — الشكوى الفظة تخرب الخدمة."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Could we has the bill/check, please?",
          "Could we have the bill/check, please?",
          "Bring the check."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Could we have the bill/check, please? — صيغة الأمر قاسية."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Could I have it without onions?",
          "I want it no onion.",
          "Could I has it without onions?"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Could I have it without onions? — without + اسم."
      }
    ],
    "whiteboardNotes": {
      "title": "Restaurant Requests and Polite Complaints",
      "pointsAr": [
        "يطلب تعديلاً على الطبق.",
        "يشتكي بأدب.",
        "يطلب الحساب ويقسمه.",
        "Excuse me, I'm afraid... / I ordered X, but this is Y. / Could I have... instead? تبدأ بتلطيف ثم المشكلة ثم الطلب."
      ],
      "pointsEn": [
        "Ask for changes to a dish.",
        "Complain politely.",
        "Ask for and split the bill.",
        "Soften, state the problem, then make a request."
      ],
      "chalkHighlight": "Excuse me, I'm afraid + problem. | I ordered X, but ... | Could you ...?"
    },
    "unit": 4,
    "cefr": "A2",
    "objectivesAr": [
      "يطلب تعديلاً على الطبق.",
      "يشتكي بأدب.",
      "يطلب الحساب ويقسمه."
    ],
    "objectivesEn": [
      "Ask for changes to a dish.",
      "Complain politely.",
      "Ask for and split the bill."
    ],
    "vocabulary": [
      {
        "word": "I'm afraid",
        "ipa": "/aɪm əˈfreɪd/",
        "ar": "للأسف/أخشى (تلطيف)",
        "exampleEn": "I'm afraid there's a problem.",
        "exampleAr": "للأسف فيه مشكلة."
      },
      {
        "word": "grilled",
        "ipa": "/ɡrɪld/",
        "ar": "مشوي",
        "exampleEn": "grilled fish",
        "exampleAr": "سمك مشوي"
      },
      {
        "word": "fried",
        "ipa": "/fraɪd/",
        "ar": "مقلي",
        "exampleEn": "fried chicken",
        "exampleAr": "دجاج مقلي"
      },
      {
        "word": "without",
        "ipa": "/wɪˈðaʊt/",
        "ar": "بدون",
        "exampleEn": "without sugar",
        "exampleAr": "بدون سكر"
      },
      {
        "word": "well done",
        "ipa": "/wɛl dʌn/",
        "ar": "مستوي زين",
        "exampleEn": "Well done, please.",
        "exampleAr": "مستوية زين."
      },
      {
        "word": "undercooked",
        "ipa": "/ˌʌndərˈkʊkt/",
        "ar": "مو مستوي",
        "exampleEn": "The meat is undercooked.",
        "exampleAr": "اللحم مو مستوي."
      },
      {
        "word": "split",
        "ipa": "/splɪt/",
        "ar": "يقسم",
        "exampleEn": "Let's split the bill.",
        "exampleAr": "نقسم الحساب."
      },
      {
        "word": "waiter",
        "ipa": "/ˈweɪtər/",
        "ar": "نادل/ويتر",
        "exampleEn": "Excuse me, waiter!",
        "exampleAr": "لو سمحت!"
      },
      {
        "word": "tip",
        "ipa": "/tɪp/",
        "ar": "بقشيش/إكرامية",
        "exampleEn": "Leave a tip.",
        "exampleAr": "اترك بقشيش."
      },
      {
        "word": "replace",
        "ipa": "/rɪˈpleɪs/",
        "ar": "يستبدل",
        "exampleEn": "Could you replace it?",
        "exampleAr": "ممكن تبدله؟"
      }
    ],
    "grammarFocus": {
      "ruleAr": "Excuse me, I'm afraid... / I ordered X, but this is Y. / Could I have... instead? تبدأ بتلطيف ثم المشكلة ثم الطلب.",
      "ruleEn": "Soften, state the problem, then make a request.",
      "formula": "Excuse me, I'm afraid + problem. | I ordered X, but ... | Could you ...?",
      "examples": [
        {
          "en": "Excuse me, I'm afraid this isn't what I ordered.",
          "ar": "لو سمحت، أخاف هذا مو اللي طلبته."
        },
        {
          "en": "I ordered the grilled chicken, not the fried one.",
          "ar": "طلبت الدجاج المشوي مو المقلي."
        },
        {
          "en": "Could I have it without onions, please?",
          "ar": "ممكن بدون بصل لو سمحت؟"
        },
        {
          "en": "My soup is a bit cold.",
          "ar": "الشوربة باردة شوي."
        },
        {
          "en": "Could we have the bill, please?",
          "ar": "ممكن الحساب لو سمحت؟"
        },
        {
          "en": "Can we split the bill?",
          "ar": "ممكن نقسم الحساب؟"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Is everything OK with your meal?",
        "ar": "كل شي تمام مع الأكل؟"
      },
      {
        "speaker": "Student",
        "en": "Actually, I'm afraid the steak is undercooked. I asked for well done.",
        "ar": "بصراحة، أخاف الستيك مو مستوي. طلبته مستوي زين."
      },
      {
        "speaker": "Sara",
        "en": "I'm so sorry. I'll replace it right away.",
        "ar": "آسفة مرة. ببدله على طول."
      },
      {
        "speaker": "Student",
        "en": "Thank you. And could I have some water without ice?",
        "ar": "مشكورة. وممكن ماي بدون ثلج؟"
      },
      {
        "speaker": "Sara",
        "en": "Of course. Anything else?",
        "ar": "أكيد. شي ثاني؟"
      },
      {
        "speaker": "Student",
        "en": "Later, could we have the bill? We'd like to split it.",
        "ar": "بعدين نبي الحساب، ونبي نقسمه."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Is everything OK with your meal?\nStudent: Actually, I'm afraid the steak is undercooked. I asked for well done.\nSara: I'm so sorry. I'll replace it right away.\nStudent: Thank you. And could I have some water without ice?\nSara: Of course. Anything else?\nStudent: Later, could we have the bill? We'd like to split it.",
      "questions": [
        {
          "questionAr": "وش مشكلة الستيك؟",
          "questionEn": "What's wrong with the steak?",
          "options": [
            "too salty",
            "undercooked",
            "cold"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: undercooked"
        },
        {
          "questionAr": "وش سوت سارة؟",
          "questionEn": "What does Sara do?",
          "options": [
            "argue",
            "replace it",
            "give a discount"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: replace it"
        },
        {
          "questionAr": "كيف الماي؟",
          "questionEn": "How does the student want water?",
          "options": [
            "with ice",
            "without ice",
            "sparkling"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: without ice"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Polite intonation: soft rise on requests",
      "items": [
        "Could I have the BILL, please? ↗",
        "I'm afraid /aɪm əˈfreɪd/",
        "well done /wɛl ˈdʌn/"
      ],
      "tipAr": "الطلب المهذب يكون بنبرة ناعمة صاعدة شوي، مو حادة."
    },
    "exercises": {
      "easy": [
        {
          "id": "sc_218_e1",
          "type": "meaning",
          "promptEn": "What does \"I'm afraid\" mean?",
          "promptAr": "ما معنى \"I'm afraid\"؟",
          "options": [
            "يقسم",
            "بدون",
            "مستوي زين",
            "للأسف/أخشى (تلطيف)"
          ],
          "correctIndex": 3,
          "answer": "للأسف/أخشى (تلطيف)",
          "explanationAr": "\"I'm afraid\" /aɪm əˈfreɪd/ تعني: للأسف/أخشى (تلطيف). مثال: I'm afraid there's a problem."
        },
        {
          "id": "sc_218_e2",
          "type": "meaning",
          "promptEn": "What does \"grilled\" mean?",
          "promptAr": "ما معنى \"grilled\"؟",
          "options": [
            "مشوي",
            "بقشيش/إكرامية",
            "مقلي",
            "مستوي زين"
          ],
          "correctIndex": 0,
          "answer": "مشوي",
          "explanationAr": "\"grilled\" /ɡrɪld/ تعني: مشوي. مثال: grilled fish"
        },
        {
          "id": "sc_218_e3",
          "type": "meaning",
          "promptEn": "What does \"fried\" mean?",
          "promptAr": "ما معنى \"fried\"؟",
          "options": [
            "مقلي",
            "للأسف/أخشى (تلطيف)",
            "يستبدل",
            "مشوي"
          ],
          "correctIndex": 0,
          "answer": "مقلي",
          "explanationAr": "\"fried\" /fraɪd/ تعني: مقلي. مثال: fried chicken"
        },
        {
          "id": "sc_218_e4",
          "type": "meaning",
          "promptEn": "What does \"without\" mean?",
          "promptAr": "ما معنى \"without\"؟",
          "options": [
            "مشوي",
            "يستبدل",
            "مقلي",
            "بدون"
          ],
          "correctIndex": 3,
          "answer": "بدون",
          "explanationAr": "\"without\" /wɪˈðaʊt/ تعني: بدون. مثال: without sugar"
        }
      ],
      "medium": [
        {
          "id": "sc_218_m1",
          "type": "gap",
          "promptEn": "Complete: Excuse me, ____ this isn't what I ordered.",
          "promptAr": "أكمل الفراغ: (لو سمحت، أخاف هذا مو اللي طلبته.)",
          "options": [
            "I'm afraid",
            "I scare",
            "I fear"
          ],
          "correctIndex": 0,
          "answer": "Excuse me, I'm afraid this isn't what I ordered.",
          "explanationAr": "الإجابة: I'm afraid. Excuse me, I'm afraid... / I ordered X, but this is Y. / Could I have... instead? تبدأ بتلطيف ثم المشكلة ثم الطلب."
        },
        {
          "id": "sc_218_m2",
          "type": "gap",
          "promptEn": "Complete: I ____ the grilled chicken, not the fried one.",
          "promptAr": "أكمل الفراغ: (طلبت الدجاج المشوي مو المقلي.)",
          "options": [
            "order",
            "ordered",
            "requested to"
          ],
          "correctIndex": 1,
          "answer": "I ordered the grilled chicken, not the fried one.",
          "explanationAr": "الإجابة: ordered. Excuse me, I'm afraid... / I ordered X, but this is Y. / Could I have... instead? تبدأ بتلطيف ثم المشكلة ثم الطلب."
        },
        {
          "id": "sc_218_m3",
          "type": "gap",
          "promptEn": "Complete: Could I have it ____ onions, please?",
          "promptAr": "أكمل الفراغ: (ممكن بدون بصل لو سمحت؟)",
          "options": [
            "without",
            "no with",
            "minus"
          ],
          "correctIndex": 0,
          "answer": "Could I have it without onions, please?",
          "explanationAr": "الإجابة: without. Excuse me, I'm afraid... / I ordered X, but this is Y. / Could I have... instead? تبدأ بتلطيف ثم المشكلة ثم الطلب."
        },
        {
          "id": "sc_218_m4",
          "type": "gap",
          "promptEn": "Complete: My soup is ____ cold.",
          "promptAr": "أكمل الفراغ: (الشوربة باردة شوي.)",
          "options": [
            "little",
            "a few",
            "a bit"
          ],
          "correctIndex": 2,
          "answer": "My soup is a bit cold.",
          "explanationAr": "الإجابة: a bit. Excuse me, I'm afraid... / I ordered X, but this is Y. / Could I have... instead? تبدأ بتلطيف ثم المشكلة ثم الطلب."
        }
      ],
      "hard": [
        {
          "id": "sc_218_h1",
          "type": "order",
          "promptEn": "Put the words in order: the / Could / we / have / bill, / please?",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (ممكن الحساب لو سمحت؟)",
          "answer": "Could we have the bill, please?",
          "explanationAr": "الترتيب الصحيح: Could we have the bill, please?"
        },
        {
          "id": "sc_218_h2",
          "type": "order",
          "promptEn": "Put the words in order: we / Can / bill? / split / the",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (ممكن نقسم الحساب؟)",
          "answer": "Can we split the bill?",
          "explanationAr": "الترتيب الصحيح: Can we split the bill?"
        },
        {
          "id": "sc_218_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: طلبت الدجاج المشوي مو المقلي.",
          "answer": "I ordered the grilled chicken, not the fried one.",
          "explanationAr": "ترجمة مقترحة: I ordered the grilled chicken, not the fried one."
        },
        {
          "id": "sc_218_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: الشوربة باردة شوي.",
          "answer": "My soup is a bit cold.",
          "explanationAr": "ترجمة مقترحة: My soup is a bit cold."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "The food is cold, I want another.",
        "correct": "I'm afraid my food is cold. Could I have a fresh one?",
        "whyAr": "ابدأ بتلطيف."
      },
      {
        "incorrect": "Give me the account.",
        "correct": "Could I have the bill, please?",
        "whyAr": "«الحساب» = bill وليس account."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (وصف الأشخاص: الشكل والشخصية): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "She have long black hair.",
          "She has hair black long.",
          "She has long black hair."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: She has long black hair. — الصفات قبل الاسم بترتيب الحجم ثم اللون.",
        "fromLessonId": "sc_217"
      },
      {
        "questionAr": "مراجعة (المواصلات: التاكسي والأوبر والمترو): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "This food is bad! Change it!",
          "Can you stop here, please? / You can drop me here.",
          "Down me here."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Can you stop here, please? / You can drop me here. — «نزلني» = drop me off.",
        "fromLessonId": "sc_215"
      },
      {
        "questionAr": "مراجعة (عند الطبيب والصيدلية): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I has a headache.",
          "I have a headache.",
          "I have pain in my head."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I have a headache. — تعبير طبيعي أقصر.",
        "fromLessonId": "sc_202"
      },
      {
        "questionAr": "ما معنى \"chat\"؟",
        "questionEn": "What does \"chat\" mean?",
        "options": [
          "عاصفة رملية/غبار",
          "زين/كويس",
          "دردشة",
          "رطب"
        ],
        "correctIndex": 2,
        "explanationAr": "\"chat\" /tʃæt/ تعني: دردشة. مثال: Nice chatting with you.",
        "fromLessonId": "sc_216"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (ممكن بدون بصل لو سمحت؟)",
          "questionEn": "Complete: Could I have it ____ onions, please?",
          "options": [
            "without",
            "no with",
            "minus"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: without. Excuse me, I'm afraid... / I ordered X, but this is Y. / Could I have... instead? تبدأ بتلطيف ثم المشكلة ثم الطلب."
        },
        {
          "questionAr": "أكمل الفراغ: (الشوربة باردة شوي.)",
          "questionEn": "Complete: My soup is ____ cold.",
          "options": [
            "little",
            "a few",
            "a bit"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: a bit. Excuse me, I'm afraid... / I ordered X, but this is Y. / Could I have... instead? تبدأ بتلطيف ثم المشكلة ثم الطلب."
        },
        {
          "questionAr": "ما معنى \"well done\"؟",
          "questionEn": "What does \"well done\" mean?",
          "options": [
            "للأسف/أخشى (تلطيف)",
            "نادل/ويتر",
            "مستوي زين",
            "بدون"
          ],
          "correctIndex": 2,
          "explanationAr": "\"well done\" /wɛl dʌn/ تعني: مستوي زين. مثال: Well done, please."
        },
        {
          "questionAr": "ما معنى \"undercooked\"؟",
          "questionEn": "What does \"undercooked\" mean?",
          "options": [
            "للأسف/أخشى (تلطيف)",
            "يقسم",
            "مو مستوي",
            "يستبدل"
          ],
          "correctIndex": 2,
          "explanationAr": "\"undercooked\" /ˌʌndərˈkʊkt/ تعني: مو مستوي. مثال: The meat is undercooked."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "I'm afraid my food is cold. Could I have a fresh one?",
            "I'm afraid my food are cold. Could I have a fresh one?",
            "The food is cold, I want another."
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: I'm afraid my food is cold. Could I have a fresh one? — ابدأ بتلطيف."
        }
      ]
    }
  },
  {
    "id": "sc_219",
    "pillarId": "conversation",
    "pillarNameAr": "المحادثة والطلاقة التفاعلية",
    "pillarNameEn": "Active Conversation & Fluency Drills",
    "pillarIcon": "💬",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "حكاية الويكند: كيف تحكي قصة",
    "titleEn": "Telling Stories About Your Weekend",
    "descAr": "احكِ أحداثاً بالترتيب مع First, Then, After that, Finally وأضف مشاعرك.",
    "descEn": "Narrate events in order with sequencers and add feelings.",
    "speakingGoalAr": "احكِ ويكندك في قصة من ست جمل مترابطة.",
    "speakingGoalEn": "Tell your weekend as a six-sentence connected story.",
    "keyPattern": {
      "ruleAr": "استخدم الماضي البسيط وكلمات الترتيب: First, Then, After that, Later, Finally. وتفاعل المستمع: Really? That sounds fun!",
      "ruleEn": "Use past simple + sequencers; listeners react with 'Really? That sounds fun!'.",
      "formula": "First, ... Then, ... After that, ... Finally, ... + feeling"
    },
    "practicalExamples": [
      {
        "en": "First, we had breakfast at a café.",
        "ar": "أول شي فطرنا في كافيه."
      },
      {
        "en": "Then we drove to the farm.",
        "ar": "بعدين سقنا للمزرعة."
      },
      {
        "en": "After that, my cousins arrived.",
        "ar": "بعد كذا وصلوا عيال عمي."
      },
      {
        "en": "Finally, we got home at midnight. I was exhausted!",
        "ar": "وآخر شي وصلنا البيت نص الليل. كنت هلكان!"
      },
      {
        "en": "Really? That sounds amazing!",
        "ar": "صدق؟ شكله رهيب!"
      },
      {
        "en": "What happened next?",
        "ar": "وش صار بعدين؟"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "After we drove to the farm.",
        "correct": "After that, we drove to the farm.",
        "whyAr": "After وحدها تحتاج جملة بعدها؛ استخدم After that."
      },
      {
        "incorrect": "Then we go to the farm.",
        "correct": "Then we went to the farm.",
        "whyAr": "القصة بالماضي."
      },
      {
        "incorrect": "I was very exhausting.",
        "correct": "I was exhausted.",
        "whyAr": "ed للشعور، ing للشيء المسبب."
      }
    ],
    "speakingChallenge": {
      "promptAr": "احكِ لسارة أحلى ويكند قضيته.",
      "promptEn": "Tell Sara about your best weekend.",
      "saraQuestionAr": "احكِ لي أحلى ويكند عندك بالتفصيل!",
      "saraQuestionEn": "Tell me about your best weekend ever!",
      "recommendedResponseEn": "First, we drove to AlUla. Then we visited Hegra. After that, we had dinner in the old town. Finally, we watched the stars in the desert. It was amazing!"
    },
    "quiz": [
      {
        "questionAr": "طفشان =",
        "questionEn": "'طفشان' =",
        "options": [
          "boring",
          "bored",
          "bore"
        ],
        "correctIndex": 1,
        "explanationAr": "bored."
      },
      {
        "questionAr": "رد مستمع متفاعل:",
        "questionEn": "Engaged listener reply:",
        "options": [
          "OK.",
          "Really? That sounds amazing!",
          "And?"
        ],
        "correctIndex": 1,
        "explanationAr": "تفاعل + تشجيع."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "After that, we drove to farm the.",
          "After that, we drove to the farm.",
          "After we drove to the farm."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: After that, we drove to the farm. — After وحدها تحتاج جملة بعدها؛ استخدم After that."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Then we went to farm the.",
          "Then we go to the farm.",
          "Then we went to the farm."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: Then we went to the farm. — القصة بالماضي."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I were exhausted.",
          "I was very exhausting.",
          "I was exhausted."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: I was exhausted. — ed للشعور، ing للشيء المسبب."
      }
    ],
    "whiteboardNotes": {
      "title": "Telling Stories About Your Weekend",
      "pointsAr": [
        "يرتب الأحداث بكلمات الربط.",
        "يضيف مشاعر وتفاصيل.",
        "يتفاعل كمستمع.",
        "استخدم الماضي البسيط وكلمات الترتيب: First, Then, After that, Later, Finally. وتفاعل المستمع: Really? That sounds fun!"
      ],
      "pointsEn": [
        "Sequence events.",
        "Add feelings and details.",
        "React as a listener.",
        "Use past simple + sequencers; listeners react with 'Really? That sounds fun!'."
      ],
      "chalkHighlight": "First, ... Then, ... After that, ... Finally, ... + feeling"
    },
    "unit": 4,
    "cefr": "A2",
    "objectivesAr": [
      "يرتب الأحداث بكلمات الربط.",
      "يضيف مشاعر وتفاصيل.",
      "يتفاعل كمستمع."
    ],
    "objectivesEn": [
      "Sequence events.",
      "Add feelings and details.",
      "React as a listener."
    ],
    "vocabulary": [
      {
        "word": "first",
        "ipa": "/fɜːrst/",
        "ar": "أولاً",
        "exampleEn": "First, we prayed.",
        "exampleAr": "أول شي صلينا."
      },
      {
        "word": "then",
        "ipa": "/ðɛn/",
        "ar": "بعدين",
        "exampleEn": "Then we ate.",
        "exampleAr": "بعدين أكلنا."
      },
      {
        "word": "after that",
        "ipa": "/ˈæftər ðæt/",
        "ar": "بعد كذا",
        "exampleEn": "After that, we slept.",
        "exampleAr": "بعد كذا نمنا."
      },
      {
        "word": "finally",
        "ipa": "/ˈfaɪnəli/",
        "ar": "أخيراً",
        "exampleEn": "Finally, we left.",
        "exampleAr": "أخيراً طلعنا."
      },
      {
        "word": "exhausted",
        "ipa": "/ɪɡˈzɔːstɪd/",
        "ar": "هلكان",
        "exampleEn": "I was exhausted.",
        "exampleAr": "كنت هلكان."
      },
      {
        "word": "excited",
        "ipa": "/ɪkˈsaɪtɪd/",
        "ar": "متحمس",
        "exampleEn": "We were excited.",
        "exampleAr": "كنا متحمسين."
      },
      {
        "word": "farm",
        "ipa": "/fɑːrm/",
        "ar": "مزرعة/استراحة",
        "exampleEn": "my uncle's farm",
        "exampleAr": "مزرعة عمي"
      },
      {
        "word": "barbecue",
        "ipa": "/ˈbɑːrbɪkjuː/",
        "ar": "شواء",
        "exampleEn": "We had a barbecue.",
        "exampleAr": "سوينا شوي."
      },
      {
        "word": "sounds",
        "ipa": "/saʊndz/",
        "ar": "يبدو (عن كلام)",
        "exampleEn": "That sounds fun!",
        "exampleAr": "شكلها وناسة!"
      },
      {
        "word": "happen",
        "ipa": "/ˈhæpən/",
        "ar": "يحدث",
        "exampleEn": "What happened?",
        "exampleAr": "وش صار؟"
      }
    ],
    "grammarFocus": {
      "ruleAr": "استخدم الماضي البسيط وكلمات الترتيب: First, Then, After that, Later, Finally. وتفاعل المستمع: Really? That sounds fun!",
      "ruleEn": "Use past simple + sequencers; listeners react with 'Really? That sounds fun!'.",
      "formula": "First, ... Then, ... After that, ... Finally, ... + feeling",
      "examples": [
        {
          "en": "First, we had breakfast at a café.",
          "ar": "أول شي فطرنا في كافيه."
        },
        {
          "en": "Then we drove to the farm.",
          "ar": "بعدين سقنا للمزرعة."
        },
        {
          "en": "After that, my cousins arrived.",
          "ar": "بعد كذا وصلوا عيال عمي."
        },
        {
          "en": "Finally, we got home at midnight. I was exhausted!",
          "ar": "وآخر شي وصلنا البيت نص الليل. كنت هلكان!"
        },
        {
          "en": "Really? That sounds amazing!",
          "ar": "صدق؟ شكله رهيب!"
        },
        {
          "en": "What happened next?",
          "ar": "وش صار بعدين؟"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "How was your weekend?",
        "ar": "كيف الويكند؟"
      },
      {
        "speaker": "Student",
        "en": "Amazing! First, we drove to my uncle's farm.",
        "ar": "رهيب! أول شي رحنا مزرعة عمي."
      },
      {
        "speaker": "Sara",
        "en": "Really? What did you do there?",
        "ar": "صدق؟ وش سويتوا؟"
      },
      {
        "speaker": "Student",
        "en": "We had a barbecue. After that, we rode horses.",
        "ar": "سوينا شوي. بعد كذا ركبنا خيل."
      },
      {
        "speaker": "Sara",
        "en": "That sounds fun! What happened next?",
        "ar": "وناسة! وش صار بعدين؟"
      },
      {
        "speaker": "Student",
        "en": "Finally, we watched the stars. I was exhausted but happy.",
        "ar": "وآخر شي طالعنا النجوم. كنت هلكان بس مبسوط."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: How was your weekend?\nStudent: Amazing! First, we drove to my uncle's farm.\nSara: Really? What did you do there?\nStudent: We had a barbecue. After that, we rode horses.\nSara: That sounds fun! What happened next?\nStudent: Finally, we watched the stars. I was exhausted but happy.",
      "questions": [
        {
          "questionAr": "وين راحوا؟",
          "questionEn": "Where did they go?",
          "options": [
            "the beach",
            "his uncle's farm",
            "the mall"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: his uncle's farm"
        },
        {
          "questionAr": "بعد الشوي؟",
          "questionEn": "What did they do after the barbecue?",
          "options": [
            "swam",
            "rode horses",
            "slept"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: rode horses"
        },
        {
          "questionAr": "شعوره؟",
          "questionEn": "How did he feel?",
          "options": [
            "bored",
            "exhausted but happy",
            "angry"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: exhausted but happy"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "-ed adjectives: exhausted /ɪd/, excited /ɪd/, bored /d/",
      "items": [
        "exhausted /ɪɡˈzɔːstɪd/",
        "excited /ɪkˈsaɪtɪd/",
        "bored /bɔːrd/"
      ],
      "tipAr": "exhausted فيها h صامتة: «إقزوستِد»."
    },
    "exercises": {
      "easy": [
        {
          "id": "sc_219_e1",
          "type": "meaning",
          "promptEn": "What does \"first\" mean?",
          "promptAr": "ما معنى \"first\"؟",
          "options": [
            "يبدو (عن كلام)",
            "أولاً",
            "هلكان",
            "متحمس"
          ],
          "correctIndex": 1,
          "answer": "أولاً",
          "explanationAr": "\"first\" /fɜːrst/ تعني: أولاً. مثال: First, we prayed."
        },
        {
          "id": "sc_219_e2",
          "type": "meaning",
          "promptEn": "What does \"then\" mean?",
          "promptAr": "ما معنى \"then\"؟",
          "options": [
            "هلكان",
            "يحدث",
            "بعدين",
            "يبدو (عن كلام)"
          ],
          "correctIndex": 2,
          "answer": "بعدين",
          "explanationAr": "\"then\" /ðɛn/ تعني: بعدين. مثال: Then we ate."
        },
        {
          "id": "sc_219_e3",
          "type": "meaning",
          "promptEn": "What does \"after that\" mean?",
          "promptAr": "ما معنى \"after that\"؟",
          "options": [
            "بعد كذا",
            "أخيراً",
            "يبدو (عن كلام)",
            "متحمس"
          ],
          "correctIndex": 0,
          "answer": "بعد كذا",
          "explanationAr": "\"after that\" /ˈæftər ðæt/ تعني: بعد كذا. مثال: After that, we slept."
        },
        {
          "id": "sc_219_e4",
          "type": "meaning",
          "promptEn": "What does \"finally\" mean?",
          "promptAr": "ما معنى \"finally\"؟",
          "options": [
            "بعدين",
            "أخيراً",
            "بعد كذا",
            "مزرعة/استراحة"
          ],
          "correctIndex": 1,
          "answer": "أخيراً",
          "explanationAr": "\"finally\" /ˈfaɪnəli/ تعني: أخيراً. مثال: Finally, we left."
        }
      ],
      "medium": [
        {
          "id": "sc_219_m1",
          "type": "gap",
          "promptEn": "Complete: ____, we had breakfast at a café.",
          "promptAr": "أكمل الفراغ: (أول شي فطرنا في كافيه.)",
          "options": [
            "First",
            "At first of",
            "Firstly of"
          ],
          "correctIndex": 0,
          "answer": "First, we had breakfast at a café.",
          "explanationAr": "الإجابة: First. استخدم الماضي البسيط وكلمات الترتيب: First, Then, After that, Later, Finally. وتفاعل المستمع: Really? That sounds fun!"
        },
        {
          "id": "sc_219_m2",
          "type": "gap",
          "promptEn": "Complete: ____ we drove to the farm.",
          "promptAr": "أكمل الفراغ: (بعدين سقنا للمزرعة.)",
          "options": [
            "Than",
            "After",
            "Then"
          ],
          "correctIndex": 2,
          "answer": "Then we drove to the farm.",
          "explanationAr": "الإجابة: Then. استخدم الماضي البسيط وكلمات الترتيب: First, Then, After that, Later, Finally. وتفاعل المستمع: Really? That sounds fun!"
        },
        {
          "id": "sc_219_m3",
          "type": "gap",
          "promptEn": "Complete: ____, my cousins arrived.",
          "promptAr": "أكمل الفراغ: (بعد كذا وصلوا عيال عمي.)",
          "options": [
            "After",
            "After that",
            "Next of"
          ],
          "correctIndex": 1,
          "answer": "After that, my cousins arrived.",
          "explanationAr": "الإجابة: After that. استخدم الماضي البسيط وكلمات الترتيب: First, Then, After that, Later, Finally. وتفاعل المستمع: Really? That sounds fun!"
        },
        {
          "id": "sc_219_m4",
          "type": "gap",
          "promptEn": "Complete: ____, we got home at midnight. I was exhausted!",
          "promptAr": "أكمل الفراغ: (وآخر شي وصلنا البيت نص الليل. كنت هلكان!)",
          "options": [
            "Finally",
            "End",
            "At last of"
          ],
          "correctIndex": 0,
          "answer": "Finally, we got home at midnight. I was exhausted!",
          "explanationAr": "الإجابة: Finally. استخدم الماضي البسيط وكلمات الترتيب: First, Then, After that, Later, Finally. وتفاعل المستمع: Really? That sounds fun!"
        }
      ],
      "hard": [
        {
          "id": "sc_219_h1",
          "type": "order",
          "promptEn": "Put the words in order: Really? / sounds / amazing! / That",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (صدق؟ شكله رهيب!)",
          "answer": "Really? That sounds amazing!",
          "explanationAr": "الترتيب الصحيح: Really? That sounds amazing!"
        },
        {
          "id": "sc_219_h2",
          "type": "order",
          "promptEn": "Put the words in order: next? / What / happened",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (وش صار بعدين؟)",
          "answer": "What happened next?",
          "explanationAr": "الترتيب الصحيح: What happened next?"
        },
        {
          "id": "sc_219_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: بعدين سقنا للمزرعة.",
          "answer": "Then we drove to the farm.",
          "explanationAr": "ترجمة مقترحة: Then we drove to the farm."
        },
        {
          "id": "sc_219_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: وآخر شي وصلنا البيت نص الليل. كنت هلكان!",
          "answer": "Finally, we got home at midnight. I was exhausted!",
          "explanationAr": "ترجمة مقترحة: Finally, we got home at midnight. I was exhausted!"
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "I was very boring at home.",
        "correct": "I was very bored at home.",
        "whyAr": "boring = ممل (أنت ممل!)، bored = طفشان."
      },
      {
        "incorrect": "We enjoyed very much.",
        "correct": "We enjoyed it a lot. / We had a great time.",
        "whyAr": "enjoy تحتاج مفعولاً."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (طلبات وشكاوى في المطعم): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Bring the check.",
          "Could we has the bill/check, please?",
          "Could we have the bill/check, please?"
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: Could we have the bill/check, please? — صيغة الأمر قاسية.",
        "fromLessonId": "sc_218"
      },
      {
        "questionAr": "مراجعة (الحديث الخفيف: الطقس والعطلة): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "After we drove to the farm.",
          "It's hot, yes?",
          "It's hot, isn't it?"
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: It's hot, isn't it? — سؤال الذيل الطبيعي.",
        "fromLessonId": "sc_216"
      },
      {
        "questionAr": "مراجعة (في الفندق: الحجز وتسجيل الدخول): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I have booking with name Al-Harbi.",
          "I have a reservation under Al-Harbi.",
          "I has a reservation under Al-Harbi."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I have a reservation under Al-Harbi. — التعبير الثابت: under + name.",
        "fromLessonId": "sc_213"
      },
      {
        "questionAr": "ما معنى \"friendly\"؟",
        "questionEn": "What does \"friendly\" mean?",
        "options": [
          "صبور",
          "طويل",
          "ودود",
          "قصير"
        ],
        "correctIndex": 2,
        "explanationAr": "\"friendly\" /ˈfrɛndli/ تعني: ودود. مثال: She's friendly.",
        "fromLessonId": "sc_217"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (بعد كذا وصلوا عيال عمي.)",
          "questionEn": "Complete: ____, my cousins arrived.",
          "options": [
            "After",
            "After that",
            "Next of"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: After that. استخدم الماضي البسيط وكلمات الترتيب: First, Then, After that, Later, Finally. وتفاعل المستمع: Really? That sounds fun!"
        },
        {
          "questionAr": "أكمل الفراغ: (وآخر شي وصلنا البيت نص الليل. كنت هلكان!)",
          "questionEn": "Complete: ____, we got home at midnight. I was exhausted!",
          "options": [
            "Finally",
            "End",
            "At last of"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: Finally. استخدم الماضي البسيط وكلمات الترتيب: First, Then, After that, Later, Finally. وتفاعل المستمع: Really? That sounds fun!"
        },
        {
          "questionAr": "ما معنى \"exhausted\"؟",
          "questionEn": "What does \"exhausted\" mean?",
          "options": [
            "هلكان",
            "يحدث",
            "شواء",
            "أخيراً"
          ],
          "correctIndex": 0,
          "explanationAr": "\"exhausted\" /ɪɡˈzɔːstɪd/ تعني: هلكان. مثال: I was exhausted."
        },
        {
          "questionAr": "ما معنى \"excited\"؟",
          "questionEn": "What does \"excited\" mean?",
          "options": [
            "بعد كذا",
            "أخيراً",
            "هلكان",
            "متحمس"
          ],
          "correctIndex": 3,
          "explanationAr": "\"excited\" /ɪkˈsaɪtɪd/ تعني: متحمس. مثال: We were excited."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "I was very bored at home.",
            "I was very boring at home.",
            "I were very bored at home."
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: I was very bored at home. — boring = ممل (أنت ممل!)، bored = طفشان."
        }
      ]
    }
  },
  {
    "id": "sc_220",
    "pillarId": "conversation",
    "pillarNameAr": "المحادثة والطلاقة التفاعلية",
    "pillarNameEn": "Active Conversation & Fluency Drills",
    "pillarIcon": "💬",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "الاقتراحات: Let's / How about / Why don't we",
    "titleEn": "Making Suggestions",
    "descAr": "اقترح فكرة، رد على اقتراح، واتفقوا على خطة مشتركة.",
    "descEn": "Suggest ideas, respond to suggestions and agree on a plan.",
    "speakingGoalAr": "خطط مع سارة لعشاء عائلي باقتراحات وردود.",
    "speakingGoalEn": "Plan a family dinner with Sara using suggestions.",
    "keyPattern": {
      "ruleAr": "Let's + فعل / How about + ing؟ / Why don't we + فعل؟ والرد: Good idea! / I'm not sure... How about...?",
      "ruleEn": "Let's + verb; How about + -ing?; Why don't we + verb? Respond with 'Good idea!' or a counter-suggestion.",
      "formula": "Let's + V | How about + V-ing? | Why don't we + V?"
    },
    "practicalExamples": [
      {
        "en": "Let's order pizza tonight.",
        "ar": "خلنا نطلب بيتزا الليلة."
      },
      {
        "en": "How about going to the beach?",
        "ar": "وش رايك نروح البحر؟"
      },
      {
        "en": "Why don't we invite Grandma?",
        "ar": "ليش ما نعزم جدتي؟"
      },
      {
        "en": "That's a great idea!",
        "ar": "فكرة حلوة!"
      },
      {
        "en": "I'm not sure. It might be crowded.",
        "ar": "مو متأكد. يمكن تكون زحمة."
      },
      {
        "en": "OK, so we'll meet at seven.",
        "ar": "تمام، إذن نتقابل سبع."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "How about go to the mall?",
        "correct": "How about going to the mall?",
        "whyAr": "How about + ing."
      },
      {
        "incorrect": "Let's to eat.",
        "correct": "Let's eat.",
        "whyAr": "Let's + فعل بدون to."
      },
      {
        "incorrect": "Why we don't go?",
        "correct": "Why don't we go?",
        "whyAr": "الترتيب: Why don't we."
      }
    ],
    "speakingChallenge": {
      "promptAr": "خطط مع سارة لرحلة نهاية الأسبوع.",
      "promptEn": "Plan a weekend trip with Sara.",
      "saraQuestionAr": "عندنا يومين إجازة. وش نسوي؟",
      "saraQuestionEn": "We have two days off. What shall we do?",
      "recommendedResponseEn": "Let's go to Al Ula! How about leaving on Thursday night? Why don't we book a desert camp? Great, deal!"
    },
    "quiz": [
      {
        "questionAr": "أكمل: How about ___ a movie?",
        "questionEn": "Complete: How about ___ a movie?",
        "options": [
          "watch",
          "watching",
          "to watch"
        ],
        "correctIndex": 1,
        "explanationAr": "How about + ing."
      },
      {
        "questionAr": "رفض مهذب واقتراح:",
        "questionEn": "Polite counter-suggestion:",
        "options": [
          "No.",
          "I'm not sure. How about tomorrow instead?",
          "Bad idea."
        ],
        "correctIndex": 1,
        "explanationAr": "تلطيف + بديل."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "How about go to the mall?",
          "How about going to the mall?",
          "How about going to mall the?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: How about going to the mall? — How about + ing."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Let's to eat.",
          "How about go to the mall?",
          "Let's eat."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: Let's eat. — Let's + فعل بدون to."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Why doesn't we go?",
          "Why don't we go?",
          "Why we don't go?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Why don't we go? — الترتيب: Why don't we."
      }
    ],
    "whiteboardNotes": {
      "title": "Making Suggestions",
      "pointsAr": [
        "يقترح بثلاث صيغ.",
        "يوافق أو يقترح بديلاً.",
        "يتوصل لقرار.",
        "Let's + فعل / How about + ing؟ / Why don't we + فعل؟ والرد: Good idea! / I'm not sure... How about...?"
      ],
      "pointsEn": [
        "Suggest with three structures.",
        "Agree or counter-suggest.",
        "Reach a decision.",
        "Let's + verb; How about + -ing?; Why don't we + verb? Respond with 'Good idea!' or a counter-suggestion."
      ],
      "chalkHighlight": "Let's + V | How about + V-ing? | Why don't we + V?"
    },
    "unit": 4,
    "cefr": "A2",
    "objectivesAr": [
      "يقترح بثلاث صيغ.",
      "يوافق أو يقترح بديلاً.",
      "يتوصل لقرار."
    ],
    "objectivesEn": [
      "Suggest with three structures.",
      "Agree or counter-suggest.",
      "Reach a decision."
    ],
    "vocabulary": [
      {
        "word": "suggest",
        "ipa": "/səɡˈdʒɛst/",
        "ar": "يقترح",
        "exampleEn": "I suggest pizza.",
        "exampleAr": "أقترح بيتزا."
      },
      {
        "word": "idea",
        "ipa": "/aɪˈdiːə/",
        "ar": "فكرة",
        "exampleEn": "Good idea!",
        "exampleAr": "فكرة حلوة!"
      },
      {
        "word": "instead",
        "ipa": "/ɪnˈstɛd/",
        "ar": "بدلاً",
        "exampleEn": "Let's go tomorrow instead.",
        "exampleAr": "خلنا نروح بكرة بدالها."
      },
      {
        "word": "decide",
        "ipa": "/dɪˈsaɪd/",
        "ar": "يقرر",
        "exampleEn": "Let's decide now.",
        "exampleAr": "خلنا نقرر الحين."
      },
      {
        "word": "deal",
        "ipa": "/diːl/",
        "ar": "اتفقنا",
        "exampleEn": "Seven o'clock? Deal!",
        "exampleAr": "سبع؟ اتفقنا!"
      },
      {
        "word": "crowded",
        "ipa": "/ˈkraʊdɪd/",
        "ar": "زحمة",
        "exampleEn": "It's crowded on Thursdays.",
        "exampleAr": "زحمة الخميس."
      },
      {
        "word": "book",
        "ipa": "/bʊk/",
        "ar": "يحجز",
        "exampleEn": "Let's book a table.",
        "exampleAr": "نحجز طاولة."
      },
      {
        "word": "prefer",
        "ipa": "/prɪˈfɜːr/",
        "ar": "يفضّل",
        "exampleEn": "I prefer Turkish food.",
        "exampleAr": "أفضّل الأكل التركي."
      },
      {
        "word": "either",
        "ipa": "/ˈiːðər/",
        "ar": "أي منهما",
        "exampleEn": "Either is fine.",
        "exampleAr": "أي واحد تمام."
      },
      {
        "word": "rather",
        "ipa": "/ˈræðər/",
        "ar": "يفضّل",
        "exampleEn": "I'd rather stay home.",
        "exampleAr": "أفضّل أجلس في البيت.",
        "note": "I'd rather = I would rather"
      }
    ],
    "grammarFocus": {
      "ruleAr": "Let's + فعل / How about + ing؟ / Why don't we + فعل؟ والرد: Good idea! / I'm not sure... How about...?",
      "ruleEn": "Let's + verb; How about + -ing?; Why don't we + verb? Respond with 'Good idea!' or a counter-suggestion.",
      "formula": "Let's + V | How about + V-ing? | Why don't we + V?",
      "examples": [
        {
          "en": "Let's order pizza tonight.",
          "ar": "خلنا نطلب بيتزا الليلة."
        },
        {
          "en": "How about going to the beach?",
          "ar": "وش رايك نروح البحر؟"
        },
        {
          "en": "Why don't we invite Grandma?",
          "ar": "ليش ما نعزم جدتي؟"
        },
        {
          "en": "That's a great idea!",
          "ar": "فكرة حلوة!"
        },
        {
          "en": "I'm not sure. It might be crowded.",
          "ar": "مو متأكد. يمكن تكون زحمة."
        },
        {
          "en": "OK, so we'll meet at seven.",
          "ar": "تمام، إذن نتقابل سبع."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "It's Mom's birthday on Friday. Let's do something special.",
        "ar": "عيد ميلاد أمي الجمعة. خلنا نسوي شي مميز."
      },
      {
        "speaker": "Student",
        "en": "How about booking a table at a nice restaurant?",
        "ar": "وش رايك نحجز طاولة في مطعم حلو؟"
      },
      {
        "speaker": "Sara",
        "en": "Hmm, restaurants are crowded on Fridays. Why don't we cook at home?",
        "ar": "همم، المطاعم زحمة الجمعة. ليش ما نطبخ في البيت؟"
      },
      {
        "speaker": "Student",
        "en": "Good idea! Let's make her favourite, mandi.",
        "ar": "فكرة حلوة! خلنا نسوي المندي اللي تحبه."
      },
      {
        "speaker": "Sara",
        "en": "And a cake from that bakery?",
        "ar": "وكيكة من ذاك المخبز؟"
      },
      {
        "speaker": "Student",
        "en": "Deal! I'll order it tomorrow.",
        "ar": "اتفقنا! بطلبها بكرة."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: It's Mom's birthday on Friday. Let's do something special.\nStudent: How about booking a table at a nice restaurant?\nSara: Hmm, restaurants are crowded on Fridays. Why don't we cook at home?\nStudent: Good idea! Let's make her favourite, mandi.\nSara: And a cake from that bakery?\nStudent: Deal! I'll order it tomorrow.",
      "questions": [
        {
          "questionAr": "وش المناسبة؟",
          "questionEn": "What's the occasion?",
          "options": [
            "Eid",
            "Mom's birthday",
            "graduation"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: Mom's birthday"
        },
        {
          "questionAr": "ليش لا مطعم؟",
          "questionEn": "Why not a restaurant?",
          "options": [
            "too expensive",
            "crowded on Fridays",
            "closed"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: crowded on Fridays"
        },
        {
          "questionAr": "وش بيطبخون؟",
          "questionEn": "What will they cook?",
          "options": [
            "kabsa",
            "mandi",
            "pizza"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: mandi"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Let's /lɛts/ and Why don't we /waɪ doʊnt wi/ → /waɪdəwi/",
      "items": [
        "Let's go /lɛts ɡoʊ/",
        "Why don't we /ˈwaɪdoʊnwi/",
        "How about /haʊəˈbaʊt/"
      ],
      "tipAr": "Why don't we تنطق متصلة «وايدونوي» بدون t واضحة."
    },
    "exercises": {
      "easy": [
        {
          "id": "sc_220_e1",
          "type": "meaning",
          "promptEn": "What does \"suggest\" mean?",
          "promptAr": "ما معنى \"suggest\"؟",
          "options": [
            "اتفقنا",
            "يقترح",
            "يفضّل"
          ],
          "correctIndex": 1,
          "answer": "يقترح",
          "explanationAr": "\"suggest\" /səɡˈdʒɛst/ تعني: يقترح. مثال: I suggest pizza."
        },
        {
          "id": "sc_220_e2",
          "type": "meaning",
          "promptEn": "What does \"idea\" mean?",
          "promptAr": "ما معنى \"idea\"؟",
          "options": [
            "فكرة",
            "اتفقنا",
            "يفضّل",
            "يقترح"
          ],
          "correctIndex": 0,
          "answer": "فكرة",
          "explanationAr": "\"idea\" /aɪˈdiːə/ تعني: فكرة. مثال: Good idea!"
        },
        {
          "id": "sc_220_e3",
          "type": "meaning",
          "promptEn": "What does \"instead\" mean?",
          "promptAr": "ما معنى \"instead\"؟",
          "options": [
            "يفضّل",
            "يحجز",
            "بدلاً",
            "اتفقنا"
          ],
          "correctIndex": 2,
          "answer": "بدلاً",
          "explanationAr": "\"instead\" /ɪnˈstɛd/ تعني: بدلاً. مثال: Let's go tomorrow instead."
        },
        {
          "id": "sc_220_e4",
          "type": "meaning",
          "promptEn": "What does \"decide\" mean?",
          "promptAr": "ما معنى \"decide\"؟",
          "options": [
            "يقترح",
            "زحمة",
            "فكرة",
            "يقرر"
          ],
          "correctIndex": 3,
          "answer": "يقرر",
          "explanationAr": "\"decide\" /dɪˈsaɪd/ تعني: يقرر. مثال: Let's decide now."
        }
      ],
      "medium": [
        {
          "id": "sc_220_m1",
          "type": "gap",
          "promptEn": "Complete: ____ order pizza tonight.",
          "promptAr": "أكمل الفراغ: (خلنا نطلب بيتزا الليلة.)",
          "options": [
            "Let's",
            "Let",
            "Lets to"
          ],
          "correctIndex": 0,
          "answer": "Let's order pizza tonight.",
          "explanationAr": "الإجابة: Let's. Let's + فعل / How about + ing؟ / Why don't we + فعل؟ والرد: Good idea! / I'm not sure... How about...?"
        },
        {
          "id": "sc_220_m2",
          "type": "gap",
          "promptEn": "Complete: How about ____ to the beach?",
          "promptAr": "أكمل الفراغ: (وش رايك نروح البحر؟)",
          "options": [
            "going",
            "to go",
            "go"
          ],
          "correctIndex": 0,
          "answer": "How about going to the beach?",
          "explanationAr": "الإجابة: going. Let's + فعل / How about + ing؟ / Why don't we + فعل؟ والرد: Good idea! / I'm not sure... How about...?"
        },
        {
          "id": "sc_220_m3",
          "type": "gap",
          "promptEn": "Complete: ____ invite Grandma?",
          "promptAr": "أكمل الفراغ: (ليش ما نعزم جدتي؟)",
          "options": [
            "Why we don't",
            "Why don't we",
            "Why not we"
          ],
          "correctIndex": 1,
          "answer": "Why don't we invite Grandma?",
          "explanationAr": "الإجابة: Why don't we. Let's + فعل / How about + ing؟ / Why don't we + فعل؟ والرد: Good idea! / I'm not sure... How about...?"
        },
        {
          "id": "sc_220_m4",
          "type": "gap",
          "promptEn": "Complete: That's a great ____!",
          "promptAr": "أكمل الفراغ: (فكرة حلوة!)",
          "options": [
            "think",
            "idea",
            "opinion"
          ],
          "correctIndex": 1,
          "answer": "That's a great idea!",
          "explanationAr": "الإجابة: idea. Let's + فعل / How about + ing؟ / Why don't we + فعل؟ والرد: Good idea! / I'm not sure... How about...?"
        }
      ],
      "hard": [
        {
          "id": "sc_220_h1",
          "type": "order",
          "promptEn": "Put the words in order: not / sure. / I'm / be / crowded. / might / It",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (مو متأكد. يمكن تكون زحمة.)",
          "answer": "I'm not sure. It might be crowded.",
          "explanationAr": "الترتيب الصحيح: I'm not sure. It might be crowded."
        },
        {
          "id": "sc_220_h2",
          "type": "order",
          "promptEn": "Put the words in order: seven. / at / we'll / so / OK, / meet",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (تمام، إذن نتقابل سبع.)",
          "answer": "OK, so we'll meet at seven.",
          "explanationAr": "الترتيب الصحيح: OK, so we'll meet at seven."
        },
        {
          "id": "sc_220_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: وش رايك نروح البحر؟",
          "answer": "How about going to the beach?",
          "explanationAr": "ترجمة مقترحة: How about going to the beach?"
        },
        {
          "id": "sc_220_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: فكرة حلوة!",
          "answer": "That's a great idea!",
          "explanationAr": "ترجمة مقترحة: That's a great idea!"
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "I suggest to go.",
        "correct": "I suggest going. / Let's go.",
        "whyAr": "suggest + ing."
      },
      {
        "incorrect": "What do you think we go?",
        "correct": "What do you think about going...?",
        "whyAr": "ترجمة «وش رايك نروح»."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (حكاية الويكند: كيف تحكي قصة): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Then we went to the farm.",
          "Then we go to the farm.",
          "Then we went to farm the."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Then we went to the farm. — القصة بالماضي.",
        "fromLessonId": "sc_219"
      },
      {
        "questionAr": "مراجعة (وصف الأشخاص: الشكل والشخصية): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "He is tall.",
          "He has tall.",
          "He are tall."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: He is tall. — الطول صفة مع is.",
        "fromLessonId": "sc_217"
      },
      {
        "questionAr": "مراجعة (في المطار: الكاونتر والجوازات): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I came for tourism.",
          "I'm here holiday on.",
          "I'm here on holiday. / I'm here for tourism."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: I'm here on holiday. / I'm here for tourism. — الصيغة الشائعة: on holiday.",
        "fromLessonId": "sc_214"
      },
      {
        "questionAr": "ما معنى \"replace\"؟",
        "questionEn": "What does \"replace\" mean?",
        "options": [
          "للأسف/أخشى (تلطيف)",
          "مستوي زين",
          "يقسم",
          "يستبدل"
        ],
        "correctIndex": 3,
        "explanationAr": "\"replace\" /rɪˈpleɪs/ تعني: يستبدل. مثال: Could you replace it?",
        "fromLessonId": "sc_218"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (ليش ما نعزم جدتي؟)",
          "questionEn": "Complete: ____ invite Grandma?",
          "options": [
            "Why we don't",
            "Why don't we",
            "Why not we"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: Why don't we. Let's + فعل / How about + ing؟ / Why don't we + فعل؟ والرد: Good idea! / I'm not sure... How about...?"
        },
        {
          "questionAr": "أكمل الفراغ: (فكرة حلوة!)",
          "questionEn": "Complete: That's a great ____!",
          "options": [
            "think",
            "idea",
            "opinion"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: idea. Let's + فعل / How about + ing؟ / Why don't we + فعل؟ والرد: Good idea! / I'm not sure... How about...?"
        },
        {
          "questionAr": "ما معنى \"deal\"؟",
          "questionEn": "What does \"deal\" mean?",
          "options": [
            "يقرر",
            "بدلاً",
            "يفضّل",
            "اتفقنا"
          ],
          "correctIndex": 3,
          "explanationAr": "\"deal\" /diːl/ تعني: اتفقنا. مثال: Seven o'clock? Deal!"
        },
        {
          "questionAr": "ما معنى \"crowded\"؟",
          "questionEn": "What does \"crowded\" mean?",
          "options": [
            "اتفقنا",
            "يفضّل",
            "زحمة",
            "يقرر"
          ],
          "correctIndex": 2,
          "explanationAr": "\"crowded\" /ˈkraʊdɪd/ تعني: زحمة. مثال: It's crowded on Thursdays."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "I going suggest.",
            "I suggest to go.",
            "I suggest going. / Let's go."
          ],
          "correctIndex": 2,
          "explanationAr": "الصحيح: I suggest going. / Let's go. — suggest + ing."
        }
      ]
    }
  },
  {
    "id": "sc_221_m",
    "pillarId": "conversation",
    "pillarNameAr": "المحادثة والطلاقة التفاعلية",
    "pillarNameEn": "Active Conversation & Fluency Drills",
    "pillarIcon": "💬",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "الاعتذار وتقديم الأعذار",
    "titleEn": "Apologising and Making Excuses",
    "descAr": "اعتذر بصدق، قدم سبباً، واعرض حلاً — وتقبّل اعتذار غيرك.",
    "descEn": "Apologise sincerely, give a reason, offer a fix, and accept apologies.",
    "speakingGoalAr": "اعتذر لسارة عن تأخيرك وقدم حلاً.",
    "speakingGoalEn": "Apologise to Sara for being late and offer a solution.",
    "keyPattern": {
      "ruleAr": "I'm (so) sorry for + ing / I'm sorry I + ماضي. ثم السبب ثم الحل: I'll... والقبول: No worries / That's OK.",
      "ruleEn": "Sorry for + -ing / Sorry I + past; reason; fix with I'll. Accept with 'No worries'.",
      "formula": "I'm sorry for + V-ing / I'm sorry (that) I + past → reason → I'll + fix"
    },
    "practicalExamples": [
      {
        "en": "I'm so sorry for being late.",
        "ar": "آسف جداً على التأخير."
      },
      {
        "en": "Sorry I forgot to call you.",
        "ar": "آسف نسيت أتصل عليك."
      },
      {
        "en": "There was a lot of traffic.",
        "ar": "كانت فيه زحمة مرة."
      },
      {
        "en": "It won't happen again.",
        "ar": "ما راح تتكرر."
      },
      {
        "en": "No worries, it's fine.",
        "ar": "ولا يهمك، عادي."
      },
      {
        "en": "Let me make it up to you. Dinner's on me!",
        "ar": "خلني أعوضك. العشاء علي!"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Sorry for I am late.",
        "correct": "Sorry I'm late. / Sorry for being late.",
        "whyAr": "for + ing، أو جملة كاملة بدون for."
      },
      {
        "incorrect": "I'm sorry, I was late because traffic.",
        "correct": "Sorry I was late. There was heavy traffic.",
        "whyAr": "because of traffic أو There was traffic."
      },
      {
        "incorrect": "It's OK, no problem, mafi mushkila.",
        "correct": "No worries. / That's OK.",
        "whyAr": "ردود قصيرة طبيعية."
      }
    ],
    "speakingChallenge": {
      "promptAr": "نسيت موعد مع سارة. اعتذر وعوّضها.",
      "promptEn": "You missed a meeting with Sara. Apologise and make up for it.",
      "saraQuestionAr": "انتظرتك ساعة أمس وما جيت!",
      "saraQuestionEn": "I waited an hour for you yesterday!",
      "recommendedResponseEn": "I'm really sorry I missed our meeting. I had a family emergency and I forgot to message you. It won't happen again. Can I invite you to lunch tomorrow?"
    },
    "quiz": [
      {
        "questionAr": "بعد ما دعست رجل أحد:",
        "questionEn": "After stepping on someone's foot:",
        "options": [
          "Excuse me.",
          "Sorry!",
          "Pardon?"
        ],
        "correctIndex": 1,
        "explanationAr": "بعد الخطأ ⇐ Sorry."
      },
      {
        "questionAr": "أكمل: Sorry for ___ your birthday.",
        "questionEn": "Complete: Sorry for ___ your birthday.",
        "options": [
          "forget",
          "forgetting",
          "forgot"
        ],
        "correctIndex": 1,
        "explanationAr": "for + ing."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'm sorry, I was late because traffic.",
          "Sorry I'm late. / Sorry for being late.",
          "Sorry for I am late."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Sorry I'm late. / Sorry for being late. — for + ing، أو جملة كاملة بدون for."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'm sorry, I was late because traffic.",
          "Sorry I were late. There was heavy traffic.",
          "Sorry I was late. There was heavy traffic."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: Sorry I was late. There was heavy traffic. — because of traffic أو There was traffic."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "No worries. / That's OK.",
          "Sorry for I am late.",
          "It's OK, no problem, mafi mushkila."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: No worries. / That's OK. — ردود قصيرة طبيعية."
      }
    ],
    "whiteboardNotes": {
      "title": "Apologising and Making Excuses",
      "pointsAr": [
        "يعتذر بصيغتين.",
        "يقدم سبباً وحلاً.",
        "يتقبل الاعتذار.",
        "I'm (so) sorry for + ing / I'm sorry I + ماضي. ثم السبب ثم الحل: I'll... والقبول: No worries / That's OK."
      ],
      "pointsEn": [
        "Apologise with two structures.",
        "Give a reason and a fix.",
        "Accept apologies.",
        "Sorry for + -ing / Sorry I + past; reason; fix with I'll. Accept with 'No worries'."
      ],
      "chalkHighlight": "I'm sorry for + V-ing / I'm sorry (that) I + past → reason → I'll + fix"
    },
    "unit": 4,
    "cefr": "A2",
    "objectivesAr": [
      "يعتذر بصيغتين.",
      "يقدم سبباً وحلاً.",
      "يتقبل الاعتذار."
    ],
    "objectivesEn": [
      "Apologise with two structures.",
      "Give a reason and a fix.",
      "Accept apologies."
    ],
    "vocabulary": [
      {
        "word": "apologise",
        "ipa": "/əˈpɑːlədʒaɪz/",
        "ar": "يعتذر",
        "exampleEn": "I apologise.",
        "exampleAr": "أعتذر."
      },
      {
        "word": "sorry",
        "ipa": "/ˈsɑːri/",
        "ar": "آسف",
        "exampleEn": "I'm really sorry.",
        "exampleAr": "آسف مرة."
      },
      {
        "word": "forgive",
        "ipa": "/fərˈɡɪv/",
        "ar": "يسامح",
        "exampleEn": "Please forgive me.",
        "exampleAr": "سامحني."
      },
      {
        "word": "excuse",
        "ipa": "/ɪkˈskjuːs/",
        "ar": "عذر",
        "exampleEn": "That's no excuse!",
        "exampleAr": "هذا مو عذر!"
      },
      {
        "word": "on purpose",
        "ipa": "/ɑːn ˈpɜːrpəs/",
        "ar": "قصداً",
        "exampleEn": "I didn't do it on purpose.",
        "exampleAr": "ما كان قصدي."
      },
      {
        "word": "make up for",
        "ipa": "/meɪk ʌp fɔːr/",
        "ar": "يعوّض",
        "exampleEn": "I'll make up for it.",
        "exampleAr": "بعوضك."
      },
      {
        "word": "no worries",
        "ipa": "/noʊ ˈwɜːriz/",
        "ar": "ولا يهمك",
        "exampleEn": "No worries!",
        "exampleAr": "ولا يهمك!"
      },
      {
        "word": "misunderstanding",
        "ipa": "/ˌmɪsʌndərˈstændɪŋ/",
        "ar": "سوء فهم",
        "exampleEn": "It was a misunderstanding.",
        "exampleAr": "كان سوء فهم."
      },
      {
        "word": "fault",
        "ipa": "/fɔːlt/",
        "ar": "غلطة/ذنب",
        "exampleEn": "It's my fault.",
        "exampleAr": "غلطتي."
      },
      {
        "word": "happen",
        "ipa": "/ˈhæpən/",
        "ar": "يحدث",
        "exampleEn": "It won't happen again.",
        "exampleAr": "ما بتتكرر."
      }
    ],
    "grammarFocus": {
      "ruleAr": "I'm (so) sorry for + ing / I'm sorry I + ماضي. ثم السبب ثم الحل: I'll... والقبول: No worries / That's OK.",
      "ruleEn": "Sorry for + -ing / Sorry I + past; reason; fix with I'll. Accept with 'No worries'.",
      "formula": "I'm sorry for + V-ing / I'm sorry (that) I + past → reason → I'll + fix",
      "examples": [
        {
          "en": "I'm so sorry for being late.",
          "ar": "آسف جداً على التأخير."
        },
        {
          "en": "Sorry I forgot to call you.",
          "ar": "آسف نسيت أتصل عليك."
        },
        {
          "en": "There was a lot of traffic.",
          "ar": "كانت فيه زحمة مرة."
        },
        {
          "en": "It won't happen again.",
          "ar": "ما راح تتكرر."
        },
        {
          "en": "No worries, it's fine.",
          "ar": "ولا يهمك، عادي."
        },
        {
          "en": "Let me make it up to you. Dinner's on me!",
          "ar": "خلني أعوضك. العشاء علي!"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Student",
        "en": "Sara, I'm so sorry for being late!",
        "ar": "سارة، آسف مرة على التأخير!"
      },
      {
        "speaker": "Sara",
        "en": "It's been forty minutes. What happened?",
        "ar": "صار لي أربعين دقيقة. وش صار؟"
      },
      {
        "speaker": "Student",
        "en": "There was an accident on the highway. And my phone died, so I couldn't call.",
        "ar": "كان فيه حادث على الخط السريع. وجوالي طفى فما قدرت أتصل."
      },
      {
        "speaker": "Sara",
        "en": "Oh, I see. That's OK.",
        "ar": "آها، فهمت. عادي."
      },
      {
        "speaker": "Student",
        "en": "It won't happen again. Let me make it up to you. Coffee's on me!",
        "ar": "ما بتتكرر. خليني أعوضك. القهوة علي!"
      },
      {
        "speaker": "Sara",
        "en": "No worries. Deal!",
        "ar": "ولا يهمك. اتفقنا!"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Student: Sara, I'm so sorry for being late!\nSara: It's been forty minutes. What happened?\nStudent: There was an accident on the highway. And my phone died, so I couldn't call.\nSara: Oh, I see. That's OK.\nStudent: It won't happen again. Let me make it up to you. Coffee's on me!\nSara: No worries. Deal!",
      "questions": [
        {
          "questionAr": "كم تأخر؟",
          "questionEn": "How late was the student?",
          "options": [
            "20 minutes",
            "40 minutes",
            "an hour"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: 40 minutes"
        },
        {
          "questionAr": "ليش ما اتصل؟",
          "questionEn": "Why couldn't he call?",
          "options": [
            "no credit",
            "his phone died",
            "he forgot"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: his phone died"
        },
        {
          "questionAr": "كيف يعوّض؟",
          "questionEn": "How does he make up for it?",
          "options": [
            "pays for coffee",
            "buys a gift",
            "drives her home"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: pays for coffee"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Sincere stress: I'm SO sorry",
      "items": [
        "I'm SO sorry /aɪm soʊ ˈsɑːri/",
        "apologise /əˈpɑːlədʒaɪz/",
        "fault /fɔːlt/"
      ],
      "tipAr": "اضغط so لتبين الصدق. sorry تنطق «صاري» بالأمريكي."
    },
    "exercises": {
      "easy": [
        {
          "id": "sc_221_m_e1",
          "type": "meaning",
          "promptEn": "What does \"apologise\" mean?",
          "promptAr": "ما معنى \"apologise\"؟",
          "options": [
            "يعتذر",
            "ولا يهمك",
            "يسامح",
            "غلطة/ذنب"
          ],
          "correctIndex": 0,
          "answer": "يعتذر",
          "explanationAr": "\"apologise\" /əˈpɑːlədʒaɪz/ تعني: يعتذر. مثال: I apologise."
        },
        {
          "id": "sc_221_m_e2",
          "type": "meaning",
          "promptEn": "What does \"sorry\" mean?",
          "promptAr": "ما معنى \"sorry\"؟",
          "options": [
            "سوء فهم",
            "يعوّض",
            "ولا يهمك",
            "آسف"
          ],
          "correctIndex": 3,
          "answer": "آسف",
          "explanationAr": "\"sorry\" /ˈsɑːri/ تعني: آسف. مثال: I'm really sorry."
        },
        {
          "id": "sc_221_m_e3",
          "type": "meaning",
          "promptEn": "What does \"forgive\" mean?",
          "promptAr": "ما معنى \"forgive\"؟",
          "options": [
            "قصداً",
            "يسامح",
            "عذر",
            "يعتذر"
          ],
          "correctIndex": 1,
          "answer": "يسامح",
          "explanationAr": "\"forgive\" /fərˈɡɪv/ تعني: يسامح. مثال: Please forgive me."
        },
        {
          "id": "sc_221_m_e4",
          "type": "meaning",
          "promptEn": "What does \"excuse\" mean?",
          "promptAr": "ما معنى \"excuse\"؟",
          "options": [
            "آسف",
            "يعتذر",
            "قصداً",
            "عذر"
          ],
          "correctIndex": 3,
          "answer": "عذر",
          "explanationAr": "\"excuse\" /ɪkˈskjuːs/ تعني: عذر. مثال: That's no excuse!"
        }
      ],
      "medium": [
        {
          "id": "sc_221_m_m1",
          "type": "gap",
          "promptEn": "Complete: I'm so sorry for ____ late.",
          "promptAr": "أكمل الفراغ: (آسف جداً على التأخير.)",
          "options": [
            "been",
            "be",
            "being"
          ],
          "correctIndex": 2,
          "answer": "I'm so sorry for being late.",
          "explanationAr": "الإجابة: being. I'm (so) sorry for + ing / I'm sorry I + ماضي. ثم السبب ثم الحل: I'll... والقبول: No worries / That's OK."
        },
        {
          "id": "sc_221_m_m2",
          "type": "gap",
          "promptEn": "Complete: Sorry I ____ to call you.",
          "promptAr": "أكمل الفراغ: (آسف نسيت أتصل عليك.)",
          "options": [
            "forgotten",
            "forget",
            "forgot"
          ],
          "correctIndex": 2,
          "answer": "Sorry I forgot to call you.",
          "explanationAr": "الإجابة: forgot. I'm (so) sorry for + ing / I'm sorry I + ماضي. ثم السبب ثم الحل: I'll... والقبول: No worries / That's OK."
        },
        {
          "id": "sc_221_m_m3",
          "type": "gap",
          "promptEn": "Complete: There was a lot of ____.",
          "promptAr": "أكمل الفراغ: (كانت فيه زحمة مرة.)",
          "options": [
            "traffic",
            "a traffic",
            "traffics"
          ],
          "correctIndex": 0,
          "answer": "There was a lot of traffic.",
          "explanationAr": "الإجابة: traffic. I'm (so) sorry for + ing / I'm sorry I + ماضي. ثم السبب ثم الحل: I'll... والقبول: No worries / That's OK."
        },
        {
          "id": "sc_221_m_m4",
          "type": "gap",
          "promptEn": "Complete: It ____ happen again.",
          "promptAr": "أكمل الفراغ: (ما راح تتكرر.)",
          "options": [
            "not will",
            "don't",
            "won't"
          ],
          "correctIndex": 2,
          "answer": "It won't happen again.",
          "explanationAr": "الإجابة: won't. I'm (so) sorry for + ing / I'm sorry I + ماضي. ثم السبب ثم الحل: I'll... والقبول: No worries / That's OK."
        }
      ],
      "hard": [
        {
          "id": "sc_221_m_h1",
          "type": "order",
          "promptEn": "Put the words in order: worries, / fine. / it's / No",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (ولا يهمك، عادي.)",
          "answer": "No worries, it's fine.",
          "explanationAr": "الترتيب الصحيح: No worries, it's fine."
        },
        {
          "id": "sc_221_m_h2",
          "type": "order",
          "promptEn": "Put the words in order: to / me! / Let / Dinner's / it / on / you. / make / up / me",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (خلني أعوضك. العشاء علي!)",
          "answer": "Let me make it up to you. Dinner's on me!",
          "explanationAr": "الترتيب الصحيح: Let me make it up to you. Dinner's on me!"
        },
        {
          "id": "sc_221_m_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: آسف نسيت أتصل عليك.",
          "answer": "Sorry I forgot to call you.",
          "explanationAr": "ترجمة مقترحة: Sorry I forgot to call you."
        },
        {
          "id": "sc_221_m_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: ما راح تتكرر.",
          "answer": "It won't happen again.",
          "explanationAr": "ترجمة مقترحة: It won't happen again."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Sorry, I late.",
        "correct": "Sorry I'm late.",
        "whyAr": "لا تحذف am."
      },
      {
        "incorrect": "Excuse me (as apology after mistake).",
        "correct": "Sorry!",
        "whyAr": "Excuse me قبل المقاطعة، و Sorry بعد الخطأ."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (الاقتراحات: Let's / How about / Why don't we): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Let's to eat.",
          "Let's eat.",
          "Sorry for I am late."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Let's eat. — Let's + فعل بدون to.",
        "fromLessonId": "sc_220"
      },
      {
        "questionAr": "مراجعة (طلبات وشكاوى في المطعم): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Excuse me, I'm afraid my food is cold. Could you warm it up, please?",
          "This food is bad! Change it!",
          "Excuse me, I'm afraid my food are cold. Could you warm it up, please?"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Excuse me, I'm afraid my food is cold. Could you warm it up, please? — الشكوى الفظة تخرب الخدمة.",
        "fromLessonId": "sc_218"
      },
      {
        "questionAr": "مراجعة (المواصلات: التاكسي والأوبر والمترو): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Sorry for I am late.",
          "Down me here.",
          "Can you stop here, please? / You can drop me here."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: Can you stop here, please? / You can drop me here. — «نزلني» = drop me off.",
        "fromLessonId": "sc_215"
      },
      {
        "questionAr": "ما معنى \"happen\"؟",
        "questionEn": "What does \"happen\" mean?",
        "options": [
          "يحدث",
          "يبدو (عن كلام)",
          "مزرعة/استراحة",
          "بعدين"
        ],
        "correctIndex": 0,
        "explanationAr": "\"happen\" /ˈhæpən/ تعني: يحدث. مثال: What happened?",
        "fromLessonId": "sc_219"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (كانت فيه زحمة مرة.)",
          "questionEn": "Complete: There was a lot of ____.",
          "options": [
            "traffic",
            "a traffic",
            "traffics"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: traffic. I'm (so) sorry for + ing / I'm sorry I + ماضي. ثم السبب ثم الحل: I'll... والقبول: No worries / That's OK."
        },
        {
          "questionAr": "أكمل الفراغ: (ما راح تتكرر.)",
          "questionEn": "Complete: It ____ happen again.",
          "options": [
            "not will",
            "don't",
            "won't"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: won't. I'm (so) sorry for + ing / I'm sorry I + ماضي. ثم السبب ثم الحل: I'll... والقبول: No worries / That's OK."
        },
        {
          "questionAr": "ما معنى \"on purpose\"؟",
          "questionEn": "What does \"on purpose\" mean?",
          "options": [
            "يعتذر",
            "غلطة/ذنب",
            "آسف",
            "قصداً"
          ],
          "correctIndex": 3,
          "explanationAr": "\"on purpose\" /ɑːn ˈpɜːrpəs/ تعني: قصداً. مثال: I didn't do it on purpose."
        },
        {
          "questionAr": "ما معنى \"make up for\"؟",
          "questionEn": "What does \"make up for\" mean?",
          "options": [
            "يعوّض",
            "قصداً",
            "آسف",
            "يعتذر"
          ],
          "correctIndex": 0,
          "explanationAr": "\"make up for\" /meɪk ʌp fɔːr/ تعني: يعوّض. مثال: I'll make up for it."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Sorry I'm late.",
            "Sorry, I late.",
            "Sorry for I am late."
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: Sorry I'm late. — لا تحذف am."
        }
      ]
    }
  },
  {
    "id": "sc_203",
    "pillarId": "conversation",
    "pillarNameAr": "المحادثة والطلاقة التفاعلية",
    "pillarNameEn": "Active Conversation & Fluency Drills",
    "pillarIcon": "💬",
    "level": "متوسط (Intermediate)",
    "levelCode": "B1-B2",
    "titleAr": "إبداء الرأي والموافقة والاعتراض",
    "titleEn": "Giving Opinions, Agreeing and Disagreeing",
    "descAr": "عبّر عن رأيك بعبارات متنوعة ووافق أو اعترض بلطف مع سبب.",
    "descEn": "Express opinions in varied ways and agree/disagree politely with reasons.",
    "speakingGoalAr": "ناقش مع سارة موضوعاً واحداً بثلاثة آراء مع أسباب.",
    "speakingGoalEn": "Discuss one topic with Sara giving three reasoned opinions.",
    "keyPattern": {
      "ruleAr": "الرأي: In my opinion / I think / Personally, I feel. الموافقة: I totally agree. الاعتراض بلطف: I see your point, but... ودايماً أضف because.",
      "ruleEn": "Opinion: In my opinion / Personally. Agree: Absolutely. Disagree softly: I see your point, but... Always add a reason.",
      "formula": "In my opinion, ... because ... | I see your point, but ... | I totally agree."
    },
    "practicalExamples": [
      {
        "en": "In my opinion, online classes are useful.",
        "ar": "برأيي الدراسة عن بعد مفيدة."
      },
      {
        "en": "I see your point, but I think students need teachers.",
        "ar": "فاهم وجهة نظرك، بس أشوف الطلاب يحتاجون معلمين."
      },
      {
        "en": "I totally agree with you.",
        "ar": "أتفق معك تماماً."
      },
      {
        "en": "Personally, I prefer working from the office.",
        "ar": "شخصياً أفضّل الدوام من المكتب."
      },
      {
        "en": "That's true, but what about the cost?",
        "ar": "صحيح، بس وش عن التكلفة؟"
      },
      {
        "en": "I'm not so sure about that.",
        "ar": "مو متأكد من هالشي."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "I am agree with you.",
        "correct": "I agree with you.",
        "whyAr": "agree فعل؛ ما نحط am."
      },
      {
        "incorrect": "You are wrong.",
        "correct": "I see your point, but I see it differently.",
        "whyAr": "الاعتراض المباشر يبدو هجومياً."
      },
      {
        "incorrect": "On my opinion...",
        "correct": "In my opinion...",
        "whyAr": "حرف الجر in."
      }
    ],
    "speakingChallenge": {
      "promptAr": "ناقش مع سارة: هل الدوام عن بعد أفضل؟",
      "promptEn": "Debate with Sara: is remote work better?",
      "saraQuestionAr": "أشوف الدوام عن بعد أفضل للكل. وش رأيك؟",
      "saraQuestionEn": "I think remote work is better for everyone. What's your opinion?",
      "recommendedResponseEn": "I see your point, but personally I prefer the office because I focus better. However, I agree that remote work saves time. In my opinion, a mix is best."
    },
    "quiz": [
      {
        "questionAr": "اعتراض مهذب:",
        "questionEn": "Polite disagreement:",
        "options": [
          "No, you're wrong.",
          "I see your point, but...",
          "That's stupid."
        ],
        "correctIndex": 1,
        "explanationAr": "تلطيف قبل الاعتراض."
      },
      {
        "questionAr": "الصحيح:",
        "questionEn": "Correct:",
        "options": [
          "I am agree.",
          "I agree.",
          "I agreeing."
        ],
        "correctIndex": 1,
        "explanationAr": "I agree."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I agree you with.",
          "I am agree with you.",
          "I agree with you."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: I agree with you. — agree فعل؛ ما نحط am."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "You are wrong.",
          "I see your point, but I see differently it.",
          "I see your point, but I see it differently."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: I see your point, but I see it differently. — الاعتراض المباشر يبدو هجومياً."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "In opinion my...",
          "On my opinion...",
          "In my opinion..."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: In my opinion... — حرف الجر in."
      }
    ],
    "whiteboardNotes": {
      "title": "Giving Opinions, Agreeing and Disagreeing",
      "pointsAr": [
        "ينوع عبارات الرأي.",
        "يعترض بلطف.",
        "يدعم رأيه بسبب ومثال.",
        "الرأي: In my opinion / I think / Personally, I feel. الموافقة: I totally agree. الاعتراض بلطف: I see your point, but... ودايماً أضف because."
      ],
      "pointsEn": [
        "Vary opinion phrases.",
        "Disagree politely.",
        "Support opinions with reasons and examples.",
        "Opinion: In my opinion / Personally. Agree: Absolutely. Disagree softly: I see your point, but... Always add a reason."
      ],
      "chalkHighlight": "In my opinion, ... because ... | I see your point, but ... | I totally agree."
    },
    "unit": 5,
    "cefr": "B1",
    "objectivesAr": [
      "ينوع عبارات الرأي.",
      "يعترض بلطف.",
      "يدعم رأيه بسبب ومثال."
    ],
    "objectivesEn": [
      "Vary opinion phrases.",
      "Disagree politely.",
      "Support opinions with reasons and examples."
    ],
    "vocabulary": [
      {
        "word": "opinion",
        "ipa": "/əˈpɪnjən/",
        "ar": "رأي",
        "exampleEn": "What's your opinion?",
        "exampleAr": "وش رأيك؟"
      },
      {
        "word": "agree",
        "ipa": "/əˈɡriː/",
        "ar": "يوافق",
        "exampleEn": "I agree.",
        "exampleAr": "أوافق."
      },
      {
        "word": "disagree",
        "ipa": "/ˌdɪsəˈɡriː/",
        "ar": "يعترض",
        "exampleEn": "I disagree.",
        "exampleAr": "ما أوافق."
      },
      {
        "word": "point",
        "ipa": "/pɔɪnt/",
        "ar": "نقطة/وجهة نظر",
        "exampleEn": "Good point!",
        "exampleAr": "نقطة حلوة!"
      },
      {
        "word": "personally",
        "ipa": "/ˈpɜːrsənəli/",
        "ar": "شخصياً",
        "exampleEn": "Personally, I like it.",
        "exampleAr": "شخصياً أحبه."
      },
      {
        "word": "benefit",
        "ipa": "/ˈbɛnɪfɪt/",
        "ar": "فائدة",
        "exampleEn": "the main benefit",
        "exampleAr": "الفائدة الأساسية"
      },
      {
        "word": "drawback",
        "ipa": "/ˈdrɔːbæk/",
        "ar": "عيب",
        "exampleEn": "One drawback is cost.",
        "exampleAr": "عيب واحد التكلفة."
      },
      {
        "word": "depend",
        "ipa": "/dɪˈpɛnd/",
        "ar": "يعتمد",
        "exampleEn": "It depends.",
        "exampleAr": "يعتمد."
      },
      {
        "word": "exactly",
        "ipa": "/ɪɡˈzæktli/",
        "ar": "بالضبط",
        "exampleEn": "Exactly!",
        "exampleAr": "بالضبط!"
      },
      {
        "word": "convince",
        "ipa": "/kənˈvɪns/",
        "ar": "يقنع",
        "exampleEn": "You convinced me.",
        "exampleAr": "أقنعتني."
      }
    ],
    "grammarFocus": {
      "ruleAr": "الرأي: In my opinion / I think / Personally, I feel. الموافقة: I totally agree. الاعتراض بلطف: I see your point, but... ودايماً أضف because.",
      "ruleEn": "Opinion: In my opinion / Personally. Agree: Absolutely. Disagree softly: I see your point, but... Always add a reason.",
      "formula": "In my opinion, ... because ... | I see your point, but ... | I totally agree.",
      "examples": [
        {
          "en": "In my opinion, online classes are useful.",
          "ar": "برأيي الدراسة عن بعد مفيدة."
        },
        {
          "en": "I see your point, but I think students need teachers.",
          "ar": "فاهم وجهة نظرك، بس أشوف الطلاب يحتاجون معلمين."
        },
        {
          "en": "I totally agree with you.",
          "ar": "أتفق معك تماماً."
        },
        {
          "en": "Personally, I prefer working from the office.",
          "ar": "شخصياً أفضّل الدوام من المكتب."
        },
        {
          "en": "That's true, but what about the cost?",
          "ar": "صحيح، بس وش عن التكلفة؟"
        },
        {
          "en": "I'm not so sure about that.",
          "ar": "مو متأكد من هالشي."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Do you think kids should have smartphones?",
        "ar": "تشوف الأطفال لازم يكون عندهم جوالات؟"
      },
      {
        "speaker": "Student",
        "en": "In my opinion, not before twelve, because they need to play outside.",
        "ar": "برأيي لا قبل ١٢، لأنهم يحتاجون يلعبون برا."
      },
      {
        "speaker": "Sara",
        "en": "I see your point, but phones help them stay safe.",
        "ar": "فاهمة وجهة نظرك، بس الجوال يساعدهم يكونون بأمان."
      },
      {
        "speaker": "Student",
        "en": "That's true. Maybe a simple phone is enough.",
        "ar": "صحيح. يمكن جوال بسيط يكفي."
      },
      {
        "speaker": "Sara",
        "en": "I totally agree! No social media.",
        "ar": "أتفق تماماً! بدون سوشال ميديا."
      },
      {
        "speaker": "Student",
        "en": "Exactly. It depends on the child too.",
        "ar": "بالضبط. ويعتمد على الطفل بعد."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Do you think kids should have smartphones?\nStudent: In my opinion, not before twelve, because they need to play outside.\nSara: I see your point, but phones help them stay safe.\nStudent: That's true. Maybe a simple phone is enough.\nSara: I totally agree! No social media.\nStudent: Exactly. It depends on the child too.",
      "questions": [
        {
          "questionAr": "أي عمر يقترح؟",
          "questionEn": "What age does the student suggest?",
          "options": [
            "ten",
            "twelve",
            "fifteen"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: twelve"
        },
        {
          "questionAr": "حجة سارة؟",
          "questionEn": "What's Sara's argument?",
          "options": [
            "phones are fun",
            "phones keep kids safe",
            "phones are cheap"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: phones keep kids safe"
        },
        {
          "questionAr": "اتفقوا على؟",
          "questionEn": "What do they agree on?",
          "options": [
            "a simple phone, no social media",
            "no phones at all",
            "iPads"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: a simple phone, no social media"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Contrastive stress: I SEE your point, BUT...",
      "items": [
        "opinion /əˈpɪnjən/",
        "disagree /ˌdɪsəˈɡriː/",
        "personally /ˈpɜːrsənəli/"
      ],
      "tipAr": "اضغط الكلمة اللي فيها الفكرة الجديدة: I think it's USEFUL, but EXPENSIVE."
    },
    "exercises": {
      "easy": [
        {
          "id": "sc_203_e1",
          "type": "meaning",
          "promptEn": "What does \"opinion\" mean?",
          "promptAr": "ما معنى \"opinion\"؟",
          "options": [
            "فائدة",
            "يقنع",
            "نقطة/وجهة نظر",
            "رأي"
          ],
          "correctIndex": 3,
          "answer": "رأي",
          "explanationAr": "\"opinion\" /əˈpɪnjən/ تعني: رأي. مثال: What's your opinion?"
        },
        {
          "id": "sc_203_e2",
          "type": "meaning",
          "promptEn": "What does \"agree\" mean?",
          "promptAr": "ما معنى \"agree\"؟",
          "options": [
            "يوافق",
            "فائدة",
            "يعترض",
            "بالضبط"
          ],
          "correctIndex": 0,
          "answer": "يوافق",
          "explanationAr": "\"agree\" /əˈɡriː/ تعني: يوافق. مثال: I agree."
        },
        {
          "id": "sc_203_e3",
          "type": "meaning",
          "promptEn": "What does \"disagree\" mean?",
          "promptAr": "ما معنى \"disagree\"؟",
          "options": [
            "عيب",
            "بالضبط",
            "يقنع",
            "يعترض"
          ],
          "correctIndex": 3,
          "answer": "يعترض",
          "explanationAr": "\"disagree\" /ˌdɪsəˈɡriː/ تعني: يعترض. مثال: I disagree."
        },
        {
          "id": "sc_203_e4",
          "type": "meaning",
          "promptEn": "What does \"point\" mean?",
          "promptAr": "ما معنى \"point\"؟",
          "options": [
            "بالضبط",
            "يعتمد",
            "نقطة/وجهة نظر",
            "شخصياً"
          ],
          "correctIndex": 2,
          "answer": "نقطة/وجهة نظر",
          "explanationAr": "\"point\" /pɔɪnt/ تعني: نقطة/وجهة نظر. مثال: Good point!"
        }
      ],
      "medium": [
        {
          "id": "sc_203_m1",
          "type": "gap",
          "promptEn": "Complete: ____, online classes are useful.",
          "promptAr": "أكمل الفراغ: (برأيي الدراسة عن بعد مفيدة.)",
          "options": [
            "For my opinion",
            "On my opinion",
            "In my opinion"
          ],
          "correctIndex": 2,
          "answer": "In my opinion, online classes are useful.",
          "explanationAr": "الإجابة: In my opinion. الرأي: In my opinion / I think / Personally, I feel. الموافقة: I totally agree. الاعتراض بلطف: I see your point, but... ودايماً أضف because."
        },
        {
          "id": "sc_203_m2",
          "type": "gap",
          "promptEn": "Complete: I see your point, ____ I think students need teachers.",
          "promptAr": "أكمل الفراغ: (فاهم وجهة نظرك، بس أشوف الطلاب يحتاجون معلمين.)",
          "options": [
            "but",
            "so",
            "and"
          ],
          "correctIndex": 0,
          "answer": "I see your point, but I think students need teachers.",
          "explanationAr": "الإجابة: but. الرأي: In my opinion / I think / Personally, I feel. الموافقة: I totally agree. الاعتراض بلطف: I see your point, but... ودايماً أضف because."
        },
        {
          "id": "sc_203_m3",
          "type": "gap",
          "promptEn": "Complete: I totally ____ you.",
          "promptAr": "أكمل الفراغ: (أتفق معك تماماً.)",
          "options": [
            "am agree",
            "agree to you",
            "agree with"
          ],
          "correctIndex": 2,
          "answer": "I totally agree with you.",
          "explanationAr": "الإجابة: agree with. الرأي: In my opinion / I think / Personally, I feel. الموافقة: I totally agree. الاعتراض بلطف: I see your point, but... ودايماً أضف because."
        },
        {
          "id": "sc_203_m4",
          "type": "gap",
          "promptEn": "Complete: ____, I prefer working from the office.",
          "promptAr": "أكمل الفراغ: (شخصياً أفضّل الدوام من المكتب.)",
          "options": [
            "Personally",
            "Personal",
            "In person"
          ],
          "correctIndex": 0,
          "answer": "Personally, I prefer working from the office.",
          "explanationAr": "الإجابة: Personally. الرأي: In my opinion / I think / Personally, I feel. الموافقة: I totally agree. الاعتراض بلطف: I see your point, but... ودايماً أضف because."
        }
      ],
      "hard": [
        {
          "id": "sc_203_h1",
          "type": "order",
          "promptEn": "Put the words in order: about / what / the / cost? / but / That's / true,",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (صحيح، بس وش عن التكلفة؟)",
          "answer": "That's true, but what about the cost?",
          "explanationAr": "الترتيب الصحيح: That's true, but what about the cost?"
        },
        {
          "id": "sc_203_h2",
          "type": "order",
          "promptEn": "Put the words in order: so / sure / not / about / that. / I'm",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (مو متأكد من هالشي.)",
          "answer": "I'm not so sure about that.",
          "explanationAr": "الترتيب الصحيح: I'm not so sure about that."
        },
        {
          "id": "sc_203_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: فاهم وجهة نظرك، بس أشوف الطلاب يحتاجون معلمين.",
          "answer": "I see your point, but I think students need teachers.",
          "explanationAr": "ترجمة مقترحة: I see your point, but I think students need teachers."
        },
        {
          "id": "sc_203_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: شخصياً أفضّل الدوام من المكتب.",
          "answer": "Personally, I prefer working from the office.",
          "explanationAr": "ترجمة مقترحة: Personally, I prefer working from the office."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "According to me...",
        "correct": "In my opinion... / As I see it...",
        "whyAr": "According to للمصادر، مو لنفسك."
      },
      {
        "incorrect": "I am with you 100%.",
        "correct": "I totally agree.",
        "whyAr": "طبيعية أكثر."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (الاعتذار وتقديم الأعذار): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Sorry I were late. There was heavy traffic.",
          "I'm sorry, I was late because traffic.",
          "Sorry I was late. There was heavy traffic."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: Sorry I was late. There was heavy traffic. — because of traffic أو There was traffic.",
        "fromLessonId": "sc_221_m"
      },
      {
        "questionAr": "مراجعة (حكاية الويكند: كيف تحكي قصة): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "After we drove to the farm.",
          "After that, we drove to farm the.",
          "After that, we drove to the farm."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: After that, we drove to the farm. — After وحدها تحتاج جملة بعدها؛ استخدم After that.",
        "fromLessonId": "sc_219"
      },
      {
        "questionAr": "مراجعة (الحديث الخفيف: الطقس والعطلة): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I am agree with you.",
          "It's hot, isn't it?",
          "It's hot, yes?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: It's hot, isn't it? — سؤال الذيل الطبيعي.",
        "fromLessonId": "sc_216"
      },
      {
        "questionAr": "ما معنى \"rather\"؟",
        "questionEn": "What does \"rather\" mean?",
        "options": [
          "يفضّل",
          "أي منهما",
          "يحجز",
          "بدلاً"
        ],
        "correctIndex": 0,
        "explanationAr": "\"rather\" /ˈræðər/ تعني: يفضّل. مثال: I'd rather stay home.",
        "fromLessonId": "sc_220"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (أتفق معك تماماً.)",
          "questionEn": "Complete: I totally ____ you.",
          "options": [
            "am agree",
            "agree to you",
            "agree with"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: agree with. الرأي: In my opinion / I think / Personally, I feel. الموافقة: I totally agree. الاعتراض بلطف: I see your point, but... ودايماً أضف because."
        },
        {
          "questionAr": "أكمل الفراغ: (شخصياً أفضّل الدوام من المكتب.)",
          "questionEn": "Complete: ____, I prefer working from the office.",
          "options": [
            "Personally",
            "Personal",
            "In person"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: Personally. الرأي: In my opinion / I think / Personally, I feel. الموافقة: I totally agree. الاعتراض بلطف: I see your point, but... ودايماً أضف because."
        },
        {
          "questionAr": "ما معنى \"personally\"؟",
          "questionEn": "What does \"personally\" mean?",
          "options": [
            "عيب",
            "يعتمد",
            "يوافق",
            "شخصياً"
          ],
          "correctIndex": 3,
          "explanationAr": "\"personally\" /ˈpɜːrsənəli/ تعني: شخصياً. مثال: Personally, I like it."
        },
        {
          "questionAr": "ما معنى \"benefit\"؟",
          "questionEn": "What does \"benefit\" mean?",
          "options": [
            "فائدة",
            "يوافق",
            "يعتمد",
            "يقنع"
          ],
          "correctIndex": 0,
          "explanationAr": "\"benefit\" /ˈbɛnɪfɪt/ تعني: فائدة. مثال: the main benefit"
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "According to me...",
            "In opinion my...",
            "In my opinion... / As I see it..."
          ],
          "correctIndex": 2,
          "explanationAr": "الصحيح: In my opinion... / As I see it... — According to للمصادر، مو لنفسك."
        }
      ]
    }
  },
  {
    "id": "sc_222",
    "pillarId": "conversation",
    "pillarNameAr": "المحادثة والطلاقة التفاعلية",
    "pillarNameEn": "Active Conversation & Fluency Drills",
    "pillarIcon": "💬",
    "level": "متوسط (Intermediate)",
    "levelCode": "B1-B2",
    "titleAr": "مقابلة العمل: عرّف بنفسك",
    "titleEn": "Job Interviews: Tell Me About Yourself",
    "descAr": "جاوب أشهر أسئلة المقابلة: عرّف بنفسك، نقاط قوتك، ليش تبي الوظيفة.",
    "descEn": "Answer top interview questions: about yourself, strengths, why this job.",
    "speakingGoalAr": "جاوب ثلاثة أسئلة مقابلة بإجابات منظمة.",
    "speakingGoalEn": "Answer three interview questions in a structured way.",
    "keyPattern": {
      "ruleAr": "هيكل «حاضر–ماضي–مستقبل»: Currently I... / Before that, I... / Now I'm looking for... وللإنجازات: I managed to + فعل.",
      "ruleEn": "Present–past–future structure for 'Tell me about yourself'; use 'I managed to' for achievements.",
      "formula": "Currently, I ... | Before that, I ... | I'm looking for ... | One of my strengths is ..."
    },
    "practicalExamples": [
      {
        "en": "Currently, I work as an accountant at a logistics company.",
        "ar": "حالياً أشتغل محاسب في شركة لوجستية."
      },
      {
        "en": "Before that, I graduated from King Saud University.",
        "ar": "قبلها تخرجت من جامعة الملك سعود."
      },
      {
        "en": "One of my strengths is problem-solving.",
        "ar": "من نقاط قوتي حل المشكلات."
      },
      {
        "en": "I managed to reduce costs by 15%.",
        "ar": "قدرت أخفض التكاليف ١٥٪."
      },
      {
        "en": "I'm looking for a role where I can grow.",
        "ar": "أدور على دور أقدر أتطور فيه."
      },
      {
        "en": "Could you tell me more about the team?",
        "ar": "ممكن تحدثني أكثر عن الفريق؟"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "I graduated King Saud University.",
        "correct": "I graduated from King Saud University.",
        "whyAr": "graduate from."
      },
      {
        "incorrect": "I work like accountant.",
        "correct": "I work as an accountant.",
        "whyAr": "as + مهنة."
      },
      {
        "incorrect": "I have experience 5 years.",
        "correct": "I have five years of experience.",
        "whyAr": "الرقم قبل الاسم."
      }
    ],
    "speakingChallenge": {
      "promptAr": "مقابلة تجريبية مع سارة لوظيفة تحبها.",
      "promptEn": "Mock interview with Sara for a job you like.",
      "saraQuestionAr": "Thank you for coming. Tell me about yourself.",
      "saraQuestionEn": "Thank you for coming. Tell me about yourself.",
      "recommendedResponseEn": "Currently, I'm a final-year IT student. Last summer I did an internship at STC, where I managed to automate a weekly report. I'm looking for a junior developer role where I can grow."
    },
    "quiz": [
      {
        "questionAr": "بداية جيدة لـ Tell me about yourself:",
        "questionEn": "Good start for 'Tell me about yourself':",
        "options": [
          "I was born in 1999...",
          "Currently, I work as...",
          "I like football."
        ],
        "correctIndex": 1,
        "explanationAr": "ابدأ بالحاضر المهني."
      },
      {
        "questionAr": "«قدرت أن» =",
        "questionEn": "'قدرت أن' =",
        "options": [
          "I could to",
          "I managed to",
          "I succeeded to"
        ],
        "correctIndex": 1,
        "explanationAr": "managed to + فعل."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I graduated from King University Saud.",
          "I graduated from King Saud University.",
          "I graduated King Saud University."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I graduated from King Saud University. — graduate from."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I work like accountant.",
          "I work as an accountant.",
          "I work as a accountant."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I work as an accountant. — as + مهنة."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I has five years of experience.",
          "I have five years of experience.",
          "I have experience 5 years."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I have five years of experience. — الرقم قبل الاسم."
      }
    ],
    "whiteboardNotes": {
      "title": "Job Interviews: Tell Me About Yourself",
      "pointsAr": [
        "يعرّف بنفسه بهيكل واضح.",
        "يصف نقاط القوة بمثال.",
        "يسأل سؤالاً في نهاية المقابلة.",
        "هيكل «حاضر–ماضي–مستقبل»: Currently I... / Before that, I... / Now I'm looking for... وللإنجازات: I managed to + فعل."
      ],
      "pointsEn": [
        "Introduce yourself with a clear structure.",
        "Describe strengths with an example.",
        "Ask a question at the end.",
        "Present–past–future structure for 'Tell me about yourself'; use 'I managed to' for achievements."
      ],
      "chalkHighlight": "Currently, I ... | Before that, I ... | I'm looking for ... | One of my strengths is ..."
    },
    "unit": 5,
    "cefr": "B1",
    "objectivesAr": [
      "يعرّف بنفسه بهيكل واضح.",
      "يصف نقاط القوة بمثال.",
      "يسأل سؤالاً في نهاية المقابلة."
    ],
    "objectivesEn": [
      "Introduce yourself with a clear structure.",
      "Describe strengths with an example.",
      "Ask a question at the end."
    ],
    "vocabulary": [
      {
        "word": "experience",
        "ipa": "/ɪkˈspɪriəns/",
        "ar": "خبرة",
        "exampleEn": "five years of experience",
        "exampleAr": "خبرة خمس سنوات"
      },
      {
        "word": "strength",
        "ipa": "/strɛŋθ/",
        "ar": "نقطة قوة",
        "exampleEn": "my main strength",
        "exampleAr": "أهم نقطة قوة"
      },
      {
        "word": "weakness",
        "ipa": "/ˈwiːknəs/",
        "ar": "نقطة ضعف",
        "exampleEn": "One weakness is...",
        "exampleAr": "نقطة ضعف..."
      },
      {
        "word": "graduate",
        "ipa": "/ˈɡrædʒueɪt/",
        "ar": "يتخرج",
        "exampleEn": "I graduated in 2022.",
        "exampleAr": "تخرجت ٢٠٢٢."
      },
      {
        "word": "responsible for",
        "ipa": "/rɪˈspɑːnsəbəl fɔːr/",
        "ar": "مسؤول عن",
        "exampleEn": "I'm responsible for sales.",
        "exampleAr": "مسؤول عن المبيعات."
      },
      {
        "word": "achieve",
        "ipa": "/əˈtʃiːv/",
        "ar": "يحقق",
        "exampleEn": "I achieved my target.",
        "exampleAr": "حققت هدفي."
      },
      {
        "word": "team player",
        "ipa": "/tiːm ˈpleɪər/",
        "ar": "يعمل بروح الفريق",
        "exampleEn": "I'm a team player.",
        "exampleAr": "أشتغل بروح الفريق."
      },
      {
        "word": "deadline",
        "ipa": "/ˈdɛdlaɪn/",
        "ar": "موعد التسليم",
        "exampleEn": "I always meet deadlines.",
        "exampleAr": "دايماً ألتزم بالمواعيد."
      },
      {
        "word": "position",
        "ipa": "/pəˈzɪʃən/",
        "ar": "وظيفة/منصب",
        "exampleEn": "the sales position",
        "exampleAr": "وظيفة المبيعات"
      },
      {
        "word": "salary",
        "ipa": "/ˈsæləri/",
        "ar": "راتب",
        "exampleEn": "expected salary",
        "exampleAr": "الراتب المتوقع"
      }
    ],
    "grammarFocus": {
      "ruleAr": "هيكل «حاضر–ماضي–مستقبل»: Currently I... / Before that, I... / Now I'm looking for... وللإنجازات: I managed to + فعل.",
      "ruleEn": "Present–past–future structure for 'Tell me about yourself'; use 'I managed to' for achievements.",
      "formula": "Currently, I ... | Before that, I ... | I'm looking for ... | One of my strengths is ...",
      "examples": [
        {
          "en": "Currently, I work as an accountant at a logistics company.",
          "ar": "حالياً أشتغل محاسب في شركة لوجستية."
        },
        {
          "en": "Before that, I graduated from King Saud University.",
          "ar": "قبلها تخرجت من جامعة الملك سعود."
        },
        {
          "en": "One of my strengths is problem-solving.",
          "ar": "من نقاط قوتي حل المشكلات."
        },
        {
          "en": "I managed to reduce costs by 15%.",
          "ar": "قدرت أخفض التكاليف ١٥٪."
        },
        {
          "en": "I'm looking for a role where I can grow.",
          "ar": "أدور على دور أقدر أتطور فيه."
        },
        {
          "en": "Could you tell me more about the team?",
          "ar": "ممكن تحدثني أكثر عن الفريق؟"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "So, tell me about yourself.",
        "ar": "حدثني عن نفسك."
      },
      {
        "speaker": "Student",
        "en": "Currently, I'm a marketing coordinator at a retail company in Jeddah.",
        "ar": "حالياً منسق تسويق في شركة تجزئة في جدة."
      },
      {
        "speaker": "Sara",
        "en": "What are your main strengths?",
        "ar": "وش أهم نقاط قوتك؟"
      },
      {
        "speaker": "Student",
        "en": "I'm creative and I work well under pressure. Last year I managed to double our Instagram followers.",
        "ar": "مبدع وأشتغل زين تحت الضغط. السنة الماضية ضاعفت متابعين انستقرام."
      },
      {
        "speaker": "Sara",
        "en": "Why do you want this position?",
        "ar": "ليش تبي هالوظيفة؟"
      },
      {
        "speaker": "Student",
        "en": "Because I'm looking for a bigger challenge, and your brand is growing fast.",
        "ar": "لأني أدور تحدي أكبر، وعلامتكم تنمو بسرعة."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: So, tell me about yourself.\nStudent: Currently, I'm a marketing coordinator at a retail company in Jeddah.\nSara: What are your main strengths?\nStudent: I'm creative and I work well under pressure. Last year I managed to double our Instagram followers.\nSara: Why do you want this position?\nStudent: Because I'm looking for a bigger challenge, and your brand is growing fast.",
      "questions": [
        {
          "questionAr": "وظيفته الحالية؟",
          "questionEn": "What's his current job?",
          "options": [
            "accountant",
            "marketing coordinator",
            "engineer"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: marketing coordinator"
        },
        {
          "questionAr": "وش حقق؟",
          "questionEn": "What did he achieve?",
          "options": [
            "doubled Instagram followers",
            "won a prize",
            "cut costs"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: doubled Instagram followers"
        },
        {
          "questionAr": "ليش يبيها؟",
          "questionEn": "Why does he want the job?",
          "options": [
            "more money",
            "a bigger challenge",
            "closer to home"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: a bigger challenge"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Word stress: exPERience, reSPONsible, poSItion",
      "items": [
        "experience /ɪkˈspɪriəns/",
        "responsible /rɪˈspɑːnsəbəl/",
        "strength /strɛŋθ/"
      ],
      "tipAr": "strength تنتهي بـ «ث»، لا تقول «سترينق»."
    },
    "exercises": {
      "easy": [
        {
          "id": "sc_222_e1",
          "type": "meaning",
          "promptEn": "What does \"experience\" mean?",
          "promptAr": "ما معنى \"experience\"؟",
          "options": [
            "يحقق",
            "خبرة",
            "راتب",
            "نقطة ضعف"
          ],
          "correctIndex": 1,
          "answer": "خبرة",
          "explanationAr": "\"experience\" /ɪkˈspɪriəns/ تعني: خبرة. مثال: five years of experience"
        },
        {
          "id": "sc_222_e2",
          "type": "meaning",
          "promptEn": "What does \"strength\" mean?",
          "promptAr": "ما معنى \"strength\"؟",
          "options": [
            "راتب",
            "نقطة ضعف",
            "نقطة قوة",
            "يعمل بروح الفريق"
          ],
          "correctIndex": 2,
          "answer": "نقطة قوة",
          "explanationAr": "\"strength\" /strɛŋθ/ تعني: نقطة قوة. مثال: my main strength"
        },
        {
          "id": "sc_222_e3",
          "type": "meaning",
          "promptEn": "What does \"weakness\" mean?",
          "promptAr": "ما معنى \"weakness\"؟",
          "options": [
            "راتب",
            "مسؤول عن",
            "نقطة ضعف",
            "وظيفة/منصب"
          ],
          "correctIndex": 2,
          "answer": "نقطة ضعف",
          "explanationAr": "\"weakness\" /ˈwiːknəs/ تعني: نقطة ضعف. مثال: One weakness is..."
        },
        {
          "id": "sc_222_e4",
          "type": "meaning",
          "promptEn": "What does \"graduate\" mean?",
          "promptAr": "ما معنى \"graduate\"؟",
          "options": [
            "يحقق",
            "نقطة ضعف",
            "راتب",
            "يتخرج"
          ],
          "correctIndex": 3,
          "answer": "يتخرج",
          "explanationAr": "\"graduate\" /ˈɡrædʒueɪt/ تعني: يتخرج. مثال: I graduated in 2022."
        }
      ],
      "medium": [
        {
          "id": "sc_222_m1",
          "type": "gap",
          "promptEn": "Complete: Currently, I work ____ an accountant at a logistics company.",
          "promptAr": "أكمل الفراغ: (حالياً أشتغل محاسب في شركة لوجستية.)",
          "options": [
            "like",
            "for",
            "as"
          ],
          "correctIndex": 2,
          "answer": "Currently, I work as an accountant at a logistics company.",
          "explanationAr": "الإجابة: as. هيكل «حاضر–ماضي–مستقبل»: Currently I... / Before that, I... / Now I'm looking for... وللإنجازات: I managed to + فعل."
        },
        {
          "id": "sc_222_m2",
          "type": "gap",
          "promptEn": "Complete: Before that, I ____ King Saud University.",
          "promptAr": "أكمل الفراغ: (قبلها تخرجت من جامعة الملك سعود.)",
          "options": [
            "graduated",
            "finished from",
            "graduated from"
          ],
          "correctIndex": 2,
          "answer": "Before that, I graduated from King Saud University.",
          "explanationAr": "الإجابة: graduated from. هيكل «حاضر–ماضي–مستقبل»: Currently I... / Before that, I... / Now I'm looking for... وللإنجازات: I managed to + فعل."
        },
        {
          "id": "sc_222_m3",
          "type": "gap",
          "promptEn": "Complete: One of my ____ is problem-solving.",
          "promptAr": "أكمل الفراغ: (من نقاط قوتي حل المشكلات.)",
          "options": [
            "strengths",
            "power",
            "strong"
          ],
          "correctIndex": 0,
          "answer": "One of my strengths is problem-solving.",
          "explanationAr": "الإجابة: strengths. هيكل «حاضر–ماضي–مستقبل»: Currently I... / Before that, I... / Now I'm looking for... وللإنجازات: I managed to + فعل."
        },
        {
          "id": "sc_222_m4",
          "type": "gap",
          "promptEn": "Complete: I ____ reduce costs by 15%.",
          "promptAr": "أكمل الفراغ: (قدرت أخفض التكاليف ١٥٪.)",
          "options": [
            "could to",
            "succeeded to",
            "managed to"
          ],
          "correctIndex": 2,
          "answer": "I managed to reduce costs by 15%.",
          "explanationAr": "الإجابة: managed to. هيكل «حاضر–ماضي–مستقبل»: Currently I... / Before that, I... / Now I'm looking for... وللإنجازات: I managed to + فعل."
        }
      ],
      "hard": [
        {
          "id": "sc_222_h1",
          "type": "order",
          "promptEn": "Put the words in order: I / can / looking / where / grow. / for / a / I'm / role",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (أدور على دور أقدر أتطور فيه.)",
          "answer": "I'm looking for a role where I can grow.",
          "explanationAr": "الترتيب الصحيح: I'm looking for a role where I can grow."
        },
        {
          "id": "sc_222_h2",
          "type": "order",
          "promptEn": "Put the words in order: more / Could / the / me / about / tell / team? / you",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (ممكن تحدثني أكثر عن الفريق؟)",
          "answer": "Could you tell me more about the team?",
          "explanationAr": "الترتيب الصحيح: Could you tell me more about the team?"
        },
        {
          "id": "sc_222_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: قبلها تخرجت من جامعة الملك سعود.",
          "answer": "Before that, I graduated from King Saud University.",
          "explanationAr": "ترجمة مقترحة: Before that, I graduated from King Saud University."
        },
        {
          "id": "sc_222_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: قدرت أخفض التكاليف ١٥٪.",
          "answer": "I managed to reduce costs by 15%.",
          "explanationAr": "ترجمة مقترحة: I managed to reduce costs by 15%."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "My name is Ahmed, I am 25 years, I am from Riyadh...",
        "correct": "Currently, I'm a ... Before that, ... I'm looking for ...",
        "whyAr": "لا تبدأ بالعمر والمدينة؛ ابدأ بالجانب المهني."
      },
      {
        "incorrect": "I am very perfectionist.",
        "correct": "I'm a perfectionist.",
        "whyAr": "اسم وليس صفة."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (إبداء الرأي والموافقة والاعتراض): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I see your point, but I see differently it.",
          "You are wrong.",
          "I see your point, but I see it differently."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: I see your point, but I see it differently. — الاعتراض المباشر يبدو هجومياً.",
        "fromLessonId": "sc_203"
      },
      {
        "questionAr": "مراجعة (الاقتراحات: Let's / How about / Why don't we): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "How about going to the mall?",
          "How about go to the mall?",
          "How about going to mall the?"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: How about going to the mall? — How about + ing.",
        "fromLessonId": "sc_220"
      },
      {
        "questionAr": "مراجعة (وصف الأشخاص: الشكل والشخصية): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "He is tall.",
          "He has tall.",
          "He are tall."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: He is tall. — الطول صفة مع is.",
        "fromLessonId": "sc_217"
      },
      {
        "questionAr": "ما معنى \"happen\"؟",
        "questionEn": "What does \"happen\" mean?",
        "options": [
          "قصداً",
          "سوء فهم",
          "يحدث",
          "آسف"
        ],
        "correctIndex": 2,
        "explanationAr": "\"happen\" /ˈhæpən/ تعني: يحدث. مثال: It won't happen again.",
        "fromLessonId": "sc_221_m"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (من نقاط قوتي حل المشكلات.)",
          "questionEn": "Complete: One of my ____ is problem-solving.",
          "options": [
            "strengths",
            "power",
            "strong"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: strengths. هيكل «حاضر–ماضي–مستقبل»: Currently I... / Before that, I... / Now I'm looking for... وللإنجازات: I managed to + فعل."
        },
        {
          "questionAr": "أكمل الفراغ: (قدرت أخفض التكاليف ١٥٪.)",
          "questionEn": "Complete: I ____ reduce costs by 15%.",
          "options": [
            "could to",
            "succeeded to",
            "managed to"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: managed to. هيكل «حاضر–ماضي–مستقبل»: Currently I... / Before that, I... / Now I'm looking for... وللإنجازات: I managed to + فعل."
        },
        {
          "questionAr": "ما معنى \"responsible for\"؟",
          "questionEn": "What does \"responsible for\" mean?",
          "options": [
            "موعد التسليم",
            "يحقق",
            "يعمل بروح الفريق",
            "مسؤول عن"
          ],
          "correctIndex": 3,
          "explanationAr": "\"responsible for\" /rɪˈspɑːnsəbəl fɔːr/ تعني: مسؤول عن. مثال: I'm responsible for sales."
        },
        {
          "questionAr": "ما معنى \"achieve\"؟",
          "questionEn": "What does \"achieve\" mean?",
          "options": [
            "يتخرج",
            "راتب",
            "يحقق",
            "موعد التسليم"
          ],
          "correctIndex": 2,
          "explanationAr": "\"achieve\" /əˈtʃiːv/ تعني: يحقق. مثال: I achieved my target."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "My name is Ahmed, I am 25 years, I am from Riyadh...",
            "Currently, I'm an ... Before that, ... I'm looking for ...",
            "Currently, I'm a ... Before that, ... I'm looking for ..."
          ],
          "correctIndex": 2,
          "explanationAr": "الصحيح: Currently, I'm a ... Before that, ... I'm looking for ... — لا تبدأ بالعمر والمدينة؛ ابدأ بالجانب المهني."
        }
      ]
    }
  },
  {
    "id": "sc_223",
    "pillarId": "conversation",
    "pillarNameAr": "المحادثة والطلاقة التفاعلية",
    "pillarNameEn": "Active Conversation & Fluency Drills",
    "pillarIcon": "💬",
    "level": "متوسط (Intermediate)",
    "levelCode": "B1-B2",
    "titleAr": "خدمة العملاء: الشكوى والاسترجاع",
    "titleEn": "Customer Service: Complaints and Refunds",
    "descAr": "قدّم شكوى واضحة على منتج أو خدمة واطلب استرجاع أو استبدال بحزم ولطف.",
    "descEn": "Make a clear complaint and request a refund or replacement firmly but politely.",
    "speakingGoalAr": "حل مشكلة طلب أونلاين مع سارة (خدمة العملاء).",
    "speakingGoalEn": "Resolve an online order problem with Sara from customer service.",
    "keyPattern": {
      "ruleAr": "هيكل: المشكلة + الدليل + الطلب: I'm calling about order number... It arrived damaged. I'd like a refund, please. وإذا رُفضت: I understand, but...",
      "ruleEn": "Structure: problem + evidence + request; if refused: 'I understand, but...'.",
      "formula": "I'm calling about ... | The problem is ... | I'd like a refund / replacement | I understand, but ..."
    },
    "practicalExamples": [
      {
        "en": "I'm calling about order number 4521.",
        "ar": "أتصل بخصوص الطلب رقم ٤٥٢١."
      },
      {
        "en": "It arrived damaged.",
        "ar": "وصل خربان."
      },
      {
        "en": "I'd like a full refund, please.",
        "ar": "أبي استرجاع كامل المبلغ."
      },
      {
        "en": "I understand, but this is the second time.",
        "ar": "فاهم، بس هذي ثاني مرة."
      },
      {
        "en": "Could I speak to a manager, please?",
        "ar": "ممكن أكلم المدير؟"
      },
      {
        "en": "How long will the refund take?",
        "ar": "كم ياخذ الاسترجاع؟"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "I want my money back now!",
        "correct": "I'd like a refund, please.",
        "whyAr": "الحزم بأدب أنجح."
      },
      {
        "incorrect": "The product came broke.",
        "correct": "The product arrived damaged/broken.",
        "whyAr": "broken اسم مفعول."
      },
      {
        "incorrect": "I want to return back it.",
        "correct": "I'd like to return it.",
        "whyAr": "return وحدها تعني رجّع."
      }
    ],
    "speakingChallenge": {
      "promptAr": "جوال طلبته أونلاين وصل بشاشة مكسورة. كلم سارة.",
      "promptEn": "Your online phone arrived with a cracked screen. Call Sara.",
      "saraQuestionAr": "Customer service, Sara speaking. How can I help?",
      "saraQuestionEn": "Customer service, Sara speaking. How can I help?",
      "recommendedResponseEn": "Hi, I'm calling about order 7710. The phone arrived with a cracked screen. I have photos of the box. I'd like a replacement as soon as possible, please."
    },
    "quiz": [
      {
        "questionAr": "أبي فلوسي ترجع =",
        "questionEn": "'I want my money back' politely:",
        "options": [
          "Return money!",
          "I'd like a refund, please.",
          "Give money."
        ],
        "correctIndex": 1,
        "explanationAr": "I'd like a refund."
      },
      {
        "questionAr": "الرد على رفض أول:",
        "questionEn": "Respond to a first refusal:",
        "options": [
          "You're useless.",
          "I understand, but...",
          "OK bye."
        ],
        "correctIndex": 1,
        "explanationAr": "I understand, but..."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'd like a refund, please.",
          "I want my money back now!",
          "I'd like an refund, please."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I'd like a refund, please. — الحزم بأدب أنجح."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "The product came broke.",
          "The product arrived damaged/broken.",
          "I want my money back now!"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: The product arrived damaged/broken. — broken اسم مفعول."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I want to return back it.",
          "I'd like to it return.",
          "I'd like to return it."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: I'd like to return it. — return وحدها تعني رجّع."
      }
    ],
    "whiteboardNotes": {
      "title": "Customer Service: Complaints and Refunds",
      "pointsAr": [
        "يشرح المشكلة بوضوح.",
        "يطلب حلاً محدداً.",
        "يصر بلباقة.",
        "هيكل: المشكلة + الدليل + الطلب: I'm calling about order number... It arrived damaged. I'd like a refund, please. وإذا رُفضت: I understand, but..."
      ],
      "pointsEn": [
        "Explain the problem clearly.",
        "Request a specific solution.",
        "Insist politely.",
        "Structure: problem + evidence + request; if refused: 'I understand, but...'."
      ],
      "chalkHighlight": "I'm calling about ... | The problem is ... | I'd like a refund / replacement | I understand, but ..."
    },
    "unit": 5,
    "cefr": "B1",
    "objectivesAr": [
      "يشرح المشكلة بوضوح.",
      "يطلب حلاً محدداً.",
      "يصر بلباقة."
    ],
    "objectivesEn": [
      "Explain the problem clearly.",
      "Request a specific solution.",
      "Insist politely."
    ],
    "vocabulary": [
      {
        "word": "refund",
        "ipa": "/ˈriːfʌnd/",
        "ar": "استرجاع المبلغ",
        "exampleEn": "a full refund",
        "exampleAr": "استرجاع كامل"
      },
      {
        "word": "replacement",
        "ipa": "/rɪˈpleɪsmənt/",
        "ar": "استبدال",
        "exampleEn": "I'd like a replacement.",
        "exampleAr": "أبي بديل."
      },
      {
        "word": "damaged",
        "ipa": "/ˈdæmɪdʒd/",
        "ar": "تالف",
        "exampleEn": "The box was damaged.",
        "exampleAr": "الكرتون تالف."
      },
      {
        "word": "faulty",
        "ipa": "/ˈfɔːlti/",
        "ar": "معيب",
        "exampleEn": "a faulty charger",
        "exampleAr": "شاحن معيب"
      },
      {
        "word": "order number",
        "ipa": "/ˈɔːrdər ˈnʌmbər/",
        "ar": "رقم الطلب",
        "exampleEn": "my order number",
        "exampleAr": "رقم طلبي"
      },
      {
        "word": "receipt",
        "ipa": "/rɪˈsiːt/",
        "ar": "إيصال",
        "exampleEn": "I have the receipt.",
        "exampleAr": "عندي الإيصال."
      },
      {
        "word": "warranty",
        "ipa": "/ˈwɔːrənti/",
        "ar": "ضمان",
        "exampleEn": "It's under warranty.",
        "exampleAr": "عليه ضمان."
      },
      {
        "word": "compensation",
        "ipa": "/ˌkɑːmpɛnˈseɪʃən/",
        "ar": "تعويض",
        "exampleEn": "I'd like some compensation.",
        "exampleAr": "أبي تعويض."
      },
      {
        "word": "policy",
        "ipa": "/ˈpɑːləsi/",
        "ar": "سياسة",
        "exampleEn": "the return policy",
        "exampleAr": "سياسة الإرجاع"
      },
      {
        "word": "escalate",
        "ipa": "/ˈɛskəleɪt/",
        "ar": "يصعّد",
        "exampleEn": "Please escalate this.",
        "exampleAr": "صعّد الموضوع."
      }
    ],
    "grammarFocus": {
      "ruleAr": "هيكل: المشكلة + الدليل + الطلب: I'm calling about order number... It arrived damaged. I'd like a refund, please. وإذا رُفضت: I understand, but...",
      "ruleEn": "Structure: problem + evidence + request; if refused: 'I understand, but...'.",
      "formula": "I'm calling about ... | The problem is ... | I'd like a refund / replacement | I understand, but ...",
      "examples": [
        {
          "en": "I'm calling about order number 4521.",
          "ar": "أتصل بخصوص الطلب رقم ٤٥٢١."
        },
        {
          "en": "It arrived damaged.",
          "ar": "وصل خربان."
        },
        {
          "en": "I'd like a full refund, please.",
          "ar": "أبي استرجاع كامل المبلغ."
        },
        {
          "en": "I understand, but this is the second time.",
          "ar": "فاهم، بس هذي ثاني مرة."
        },
        {
          "en": "Could I speak to a manager, please?",
          "ar": "ممكن أكلم المدير؟"
        },
        {
          "en": "How long will the refund take?",
          "ar": "كم ياخذ الاسترجاع؟"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Thank you for calling. How can I help?",
        "ar": "شكراً لاتصالك. كيف أخدمك؟"
      },
      {
        "speaker": "Student",
        "en": "Hi, I'm calling about order 4521. The headphones are faulty. The left side doesn't work.",
        "ar": "هلا، بخصوص الطلب ٤٥٢١. السماعة معيبة، الجهة اليسار ما تشتغل."
      },
      {
        "speaker": "Sara",
        "en": "I'm sorry to hear that. We can send a replacement in ten days.",
        "ar": "آسفين. نقدر نرسل بديل خلال عشرة أيام."
      },
      {
        "speaker": "Student",
        "en": "I understand, but I need them for a trip next week. I'd prefer a full refund.",
        "ar": "فاهم، بس أحتاجها لسفرة الأسبوع الجاي. أفضّل استرجاع كامل."
      },
      {
        "speaker": "Sara",
        "en": "No problem. The refund will take three to five working days.",
        "ar": "ولا يهمك. الاسترجاع ياخذ ٣–٥ أيام عمل."
      },
      {
        "speaker": "Student",
        "en": "Great. Could you email me a confirmation?",
        "ar": "ممتاز. ممكن ترسلين تأكيد بالإيميل؟"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Thank you for calling. How can I help?\nStudent: Hi, I'm calling about order 4521. The headphones are faulty. The left side doesn't work.\nSara: I'm sorry to hear that. We can send a replacement in ten days.\nStudent: I understand, but I need them for a trip next week. I'd prefer a full refund.\nSara: No problem. The refund will take three to five working days.\nStudent: Great. Could you email me a confirmation?",
      "questions": [
        {
          "questionAr": "مشكلة السماعة؟",
          "questionEn": "What's wrong with the headphones?",
          "options": [
            "the right side",
            "the left side doesn't work",
            "no sound at all"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: the left side doesn't work"
        },
        {
          "questionAr": "ليش ما يبي بديل؟",
          "questionEn": "Why doesn't he want a replacement?",
          "options": [
            "he needs them next week",
            "he hates the brand",
            "too expensive"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: he needs them next week"
        },
        {
          "questionAr": "مدة الاسترجاع؟",
          "questionEn": "How long is the refund?",
          "options": [
            "1–2 days",
            "3–5 working days",
            "two weeks"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: 3–5 working days"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "REfund (noun) vs reFUND (verb)",
      "items": [
        "a REfund /ˈriːfʌnd/",
        "to reFUND /rɪˈfʌnd/",
        "receipt /rɪˈsiːt/"
      ],
      "tipAr": "الاسم الضغط في أوله والفعل في آخره، مثل REcord/reCORD."
    },
    "exercises": {
      "easy": [
        {
          "id": "sc_223_e1",
          "type": "meaning",
          "promptEn": "What does \"refund\" mean?",
          "promptAr": "ما معنى \"refund\"؟",
          "options": [
            "رقم الطلب",
            "يصعّد",
            "استبدال",
            "استرجاع المبلغ"
          ],
          "correctIndex": 3,
          "answer": "استرجاع المبلغ",
          "explanationAr": "\"refund\" /ˈriːfʌnd/ تعني: استرجاع المبلغ. مثال: a full refund"
        },
        {
          "id": "sc_223_e2",
          "type": "meaning",
          "promptEn": "What does \"replacement\" mean?",
          "promptAr": "ما معنى \"replacement\"؟",
          "options": [
            "تعويض",
            "استبدال",
            "يصعّد",
            "استرجاع المبلغ"
          ],
          "correctIndex": 1,
          "answer": "استبدال",
          "explanationAr": "\"replacement\" /rɪˈpleɪsmənt/ تعني: استبدال. مثال: I'd like a replacement."
        },
        {
          "id": "sc_223_e3",
          "type": "meaning",
          "promptEn": "What does \"damaged\" mean?",
          "promptAr": "ما معنى \"damaged\"؟",
          "options": [
            "سياسة",
            "إيصال",
            "تالف",
            "استبدال"
          ],
          "correctIndex": 2,
          "answer": "تالف",
          "explanationAr": "\"damaged\" /ˈdæmɪdʒd/ تعني: تالف. مثال: The box was damaged."
        },
        {
          "id": "sc_223_e4",
          "type": "meaning",
          "promptEn": "What does \"faulty\" mean?",
          "promptAr": "ما معنى \"faulty\"؟",
          "options": [
            "ضمان",
            "تعويض",
            "يصعّد",
            "معيب"
          ],
          "correctIndex": 3,
          "answer": "معيب",
          "explanationAr": "\"faulty\" /ˈfɔːlti/ تعني: معيب. مثال: a faulty charger"
        }
      ],
      "medium": [
        {
          "id": "sc_223_m1",
          "type": "gap",
          "promptEn": "Complete: I'm calling ____ order number 4521.",
          "promptAr": "أكمل الفراغ: (أتصل بخصوص الطلب رقم ٤٥٢١.)",
          "options": [
            "on",
            "for about",
            "about"
          ],
          "correctIndex": 2,
          "answer": "I'm calling about order number 4521.",
          "explanationAr": "الإجابة: about. هيكل: المشكلة + الدليل + الطلب: I'm calling about order number... It arrived damaged. I'd like a refund, please. وإذا رُفضت: I understand, but..."
        },
        {
          "id": "sc_223_m2",
          "type": "gap",
          "promptEn": "Complete: It arrived ____.",
          "promptAr": "أكمل الفراغ: (وصل خربان.)",
          "options": [
            "damaged",
            "damage",
            "broken down"
          ],
          "correctIndex": 0,
          "answer": "It arrived damaged.",
          "explanationAr": "الإجابة: damaged. هيكل: المشكلة + الدليل + الطلب: I'm calling about order number... It arrived damaged. I'd like a refund, please. وإذا رُفضت: I understand, but..."
        },
        {
          "id": "sc_223_m3",
          "type": "gap",
          "promptEn": "Complete: I'd like a full ____, please.",
          "promptAr": "أكمل الفراغ: (أبي استرجاع كامل المبلغ.)",
          "options": [
            "refund",
            "refound",
            "return money"
          ],
          "correctIndex": 0,
          "answer": "I'd like a full refund, please.",
          "explanationAr": "الإجابة: refund. هيكل: المشكلة + الدليل + الطلب: I'm calling about order number... It arrived damaged. I'd like a refund, please. وإذا رُفضت: I understand, but..."
        },
        {
          "id": "sc_223_m4",
          "type": "gap",
          "promptEn": "Complete: ____, but this is the second time.",
          "promptAr": "أكمل الفراغ: (فاهم، بس هذي ثاني مرة.)",
          "options": [
            "I know but",
            "OK but",
            "I understand"
          ],
          "correctIndex": 2,
          "answer": "I understand, but this is the second time.",
          "explanationAr": "الإجابة: I understand. هيكل: المشكلة + الدليل + الطلب: I'm calling about order number... It arrived damaged. I'd like a refund, please. وإذا رُفضت: I understand, but..."
        }
      ],
      "hard": [
        {
          "id": "sc_223_h1",
          "type": "order",
          "promptEn": "Put the words in order: manager, / speak / please? / a / I / Could / to",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (ممكن أكلم المدير؟)",
          "answer": "Could I speak to a manager, please?",
          "explanationAr": "الترتيب الصحيح: Could I speak to a manager, please?"
        },
        {
          "id": "sc_223_h2",
          "type": "order",
          "promptEn": "Put the words in order: How / the / refund / take? / will / long",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (كم ياخذ الاسترجاع؟)",
          "answer": "How long will the refund take?",
          "explanationAr": "الترتيب الصحيح: How long will the refund take?"
        },
        {
          "id": "sc_223_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: وصل خربان.",
          "answer": "It arrived damaged.",
          "explanationAr": "ترجمة مقترحة: It arrived damaged."
        },
        {
          "id": "sc_223_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: فاهم، بس هذي ثاني مرة.",
          "answer": "I understand, but this is the second time.",
          "explanationAr": "ترجمة مقترحة: I understand, but this is the second time."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "I want to make complaint.",
        "correct": "I'd like to make a complaint.",
        "whyAr": "a + complaint، و I'd like أطيب."
      },
      {
        "incorrect": "Give me the manager.",
        "correct": "Could I speak to a manager, please?",
        "whyAr": "صيغة طلب لائقة."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (مقابلة العمل: عرّف بنفسك): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I work like accountant.",
          "I work as an accountant.",
          "I work as a accountant."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I work as an accountant. — as + مهنة.",
        "fromLessonId": "sc_222"
      },
      {
        "questionAr": "مراجعة (الاعتذار وتقديم الأعذار): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I want my money back now!",
          "Sorry I'm late. / Sorry for being late.",
          "Sorry for I am late."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Sorry I'm late. / Sorry for being late. — for + ing، أو جملة كاملة بدون for.",
        "fromLessonId": "sc_221_m"
      },
      {
        "questionAr": "مراجعة (طلبات وشكاوى في المطعم): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "This food is bad! Change it!",
          "Excuse me, I'm afraid my food is cold. Could you warm it up, please?",
          "Excuse me, I'm afraid my food are cold. Could you warm it up, please?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Excuse me, I'm afraid my food is cold. Could you warm it up, please? — الشكوى الفظة تخرب الخدمة.",
        "fromLessonId": "sc_218"
      },
      {
        "questionAr": "ما معنى \"convince\"؟",
        "questionEn": "What does \"convince\" mean?",
        "options": [
          "شخصياً",
          "يقنع",
          "بالضبط",
          "يعترض"
        ],
        "correctIndex": 1,
        "explanationAr": "\"convince\" /kənˈvɪns/ تعني: يقنع. مثال: You convinced me.",
        "fromLessonId": "sc_203"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (أبي استرجاع كامل المبلغ.)",
          "questionEn": "Complete: I'd like a full ____, please.",
          "options": [
            "refund",
            "refound",
            "return money"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: refund. هيكل: المشكلة + الدليل + الطلب: I'm calling about order number... It arrived damaged. I'd like a refund, please. وإذا رُفضت: I understand, but..."
        },
        {
          "questionAr": "أكمل الفراغ: (فاهم، بس هذي ثاني مرة.)",
          "questionEn": "Complete: ____, but this is the second time.",
          "options": [
            "I know but",
            "OK but",
            "I understand"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: I understand. هيكل: المشكلة + الدليل + الطلب: I'm calling about order number... It arrived damaged. I'd like a refund, please. وإذا رُفضت: I understand, but..."
        },
        {
          "questionAr": "ما معنى \"order number\"؟",
          "questionEn": "What does \"order number\" mean?",
          "options": [
            "رقم الطلب",
            "يصعّد",
            "سياسة",
            "تالف"
          ],
          "correctIndex": 0,
          "explanationAr": "\"order number\" /ˈɔːrdər ˈnʌmbər/ تعني: رقم الطلب. مثال: my order number"
        },
        {
          "questionAr": "ما معنى \"receipt\"؟",
          "questionEn": "What does \"receipt\" mean?",
          "options": [
            "رقم الطلب",
            "ضمان",
            "استرجاع المبلغ",
            "إيصال"
          ],
          "correctIndex": 3,
          "explanationAr": "\"receipt\" /rɪˈsiːt/ تعني: إيصال. مثال: I have the receipt."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "I'd like to make an complaint.",
            "I'd like to make a complaint.",
            "I want to make complaint."
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: I'd like to make a complaint. — a + complaint، و I'd like أطيب."
        }
      ]
    }
  },
  {
    "id": "sc_224",
    "pillarId": "conversation",
    "pillarNameAr": "المحادثة والطلاقة التفاعلية",
    "pillarNameEn": "Active Conversation & Fluency Drills",
    "pillarIcon": "💬",
    "level": "متوسط (Intermediate)",
    "levelCode": "B1-B2",
    "titleAr": "ترتيب المواعيد والاجتماعات في العمل",
    "titleEn": "Arranging Meetings at Work",
    "descAr": "اقترح موعد اجتماع، غيّر موعداً، وأكد التفاصيل بإنجليزي مهني.",
    "descEn": "Propose, reschedule and confirm meetings in professional English.",
    "speakingGoalAr": "رتب اجتماعاً مع سارة وغير موعده مرة.",
    "speakingGoalEn": "Arrange a meeting with Sara and reschedule once.",
    "keyPattern": {
      "ruleAr": "المضارع المستمر للمواعيد المقررة: I'm meeting the client on Monday. والاقتراح: Would Tuesday at 10 work for you? والتغيير: Could we push it back to...?",
      "ruleEn": "Present continuous for fixed arrangements; 'Would ... work for you?'; 'Could we move/push it to...?'.",
      "formula": "Would + time + work for you? | Could we move it to ...? | I'm + V-ing + on + day"
    },
    "practicalExamples": [
      {
        "en": "Would Tuesday at ten work for you?",
        "ar": "يناسبك الثلاثاء الساعة عشر؟"
      },
      {
        "en": "I'm meeting a client on Monday morning.",
        "ar": "عندي اجتماع مع عميل الاثنين الصبح."
      },
      {
        "en": "Could we push it back to the afternoon?",
        "ar": "ممكن نأخره للعصر؟"
      },
      {
        "en": "Let's move the meeting to Wednesday.",
        "ar": "خلنا ننقل الاجتماع للأربعاء."
      },
      {
        "en": "I'll send you a calendar invite.",
        "ar": "برسل لك دعوة في التقويم."
      },
      {
        "en": "Just to confirm, it's Thursday at two, online.",
        "ar": "للتأكيد: الخميس الساعة ثنتين أونلاين."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Is it suitable for you Tuesday?",
        "correct": "Does Tuesday work for you?",
        "whyAr": "صيغة طبيعية مهنية."
      },
      {
        "incorrect": "I will meet the client Monday (arranged).",
        "correct": "I'm meeting the client on Monday.",
        "whyAr": "للموعد المرتب نستخدم المستمر، و on مع الأيام."
      },
      {
        "incorrect": "Let's postpone it to before.",
        "correct": "Let's bring it forward.",
        "whyAr": "التقديم = bring forward، والتأخير = push back."
      }
    ],
    "speakingChallenge": {
      "promptAr": "رتب مع سارة اجتماع مشروع لهالأسبوع.",
      "promptEn": "Set up a project meeting with Sara this week.",
      "saraQuestionAr": "I need 30 minutes with you this week. When are you free?",
      "saraQuestionEn": "I need 30 minutes with you this week. When are you free?",
      "recommendedResponseEn": "I'm meeting clients on Sunday and Monday. Would Tuesday at two work for you? I'll send a calendar invite with the agenda. Just to confirm, it's online, right?"
    },
    "quiz": [
      {
        "questionAr": "«نأجل» =",
        "questionEn": "'postpone a bit' =",
        "options": [
          "bring forward",
          "push back",
          "push front"
        ],
        "correctIndex": 1,
        "explanationAr": "push back."
      },
      {
        "questionAr": "سؤال مهني عن الموعد:",
        "questionEn": "Professional time check:",
        "options": [
          "You can Tuesday?",
          "Would Tuesday work for you?",
          "Tuesday good or not?"
        ],
        "correctIndex": 1,
        "explanationAr": "Would ... work for you?"
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Does Tuesday work you for?",
          "Does Tuesday work for you?",
          "Is it suitable for you Tuesday?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Does Tuesday work for you? — صيغة طبيعية مهنية."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I will meet the client Monday (arranged).",
          "I'm meeting the client Monday on.",
          "I'm meeting the client on Monday."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: I'm meeting the client on Monday. — للموعد المرتب نستخدم المستمر، و on مع الأيام."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Let's bring forward it.",
          "Let's bring it forward.",
          "Let's postpone it to before."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Let's bring it forward. — التقديم = bring forward، والتأخير = push back."
      }
    ],
    "whiteboardNotes": {
      "title": "Arranging Meetings at Work",
      "pointsAr": [
        "يقترح موعداً مهنياً.",
        "يعيد جدولة بلباقة.",
        "يستخدم المضارع المستمر للمواعيد.",
        "المضارع المستمر للمواعيد المقررة: I'm meeting the client on Monday. والاقتراح: Would Tuesday at 10 work for you? والتغيير: Could we push it back to...?"
      ],
      "pointsEn": [
        "Propose a time professionally.",
        "Reschedule politely.",
        "Use present continuous for arrangements.",
        "Present continuous for fixed arrangements; 'Would ... work for you?'; 'Could we move/push it to...?'."
      ],
      "chalkHighlight": "Would + time + work for you? | Could we move it to ...? | I'm + V-ing + on + day"
    },
    "unit": 5,
    "cefr": "B1",
    "objectivesAr": [
      "يقترح موعداً مهنياً.",
      "يعيد جدولة بلباقة.",
      "يستخدم المضارع المستمر للمواعيد."
    ],
    "objectivesEn": [
      "Propose a time professionally.",
      "Reschedule politely.",
      "Use present continuous for arrangements."
    ],
    "vocabulary": [
      {
        "word": "schedule",
        "ipa": "/ˈskɛdʒuːl/",
        "ar": "جدول/يجدول",
        "exampleEn": "Let's schedule a call.",
        "exampleAr": "نجدول مكالمة."
      },
      {
        "word": "reschedule",
        "ipa": "/riːˈskɛdʒuːl/",
        "ar": "يعيد الجدولة",
        "exampleEn": "Can we reschedule?",
        "exampleAr": "نغير الموعد؟"
      },
      {
        "word": "available",
        "ipa": "/əˈveɪləbəl/",
        "ar": "متاح",
        "exampleEn": "Are you available on Sunday?",
        "exampleAr": "متاح الأحد؟"
      },
      {
        "word": "push back",
        "ipa": "/pʊʃ bæk/",
        "ar": "يؤجل",
        "exampleEn": "Let's push it back an hour.",
        "exampleAr": "نأجله ساعة."
      },
      {
        "word": "bring forward",
        "ipa": "/brɪŋ ˈfɔːrwərd/",
        "ar": "يقدّم",
        "exampleEn": "Can we bring it forward?",
        "exampleAr": "نقدمه؟"
      },
      {
        "word": "agenda",
        "ipa": "/əˈdʒɛndə/",
        "ar": "جدول الأعمال",
        "exampleEn": "Here's the agenda.",
        "exampleAr": "هذا جدول الأعمال."
      },
      {
        "word": "invite",
        "ipa": "/ˈɪnvaɪt/",
        "ar": "دعوة (تقويم)",
        "exampleEn": "a calendar invite",
        "exampleAr": "دعوة تقويم"
      },
      {
        "word": "confirm",
        "ipa": "/kənˈfɜːrm/",
        "ar": "يؤكد",
        "exampleEn": "Please confirm.",
        "exampleAr": "أكد لو سمحت."
      },
      {
        "word": "clash",
        "ipa": "/klæʃ/",
        "ar": "تعارض مواعيد",
        "exampleEn": "There's a clash.",
        "exampleAr": "فيه تعارض."
      },
      {
        "word": "slot",
        "ipa": "/slɑːt/",
        "ar": "فترة متاحة",
        "exampleEn": "a free slot at 3",
        "exampleAr": "وقت فاضي الساعة ٣"
      }
    ],
    "grammarFocus": {
      "ruleAr": "المضارع المستمر للمواعيد المقررة: I'm meeting the client on Monday. والاقتراح: Would Tuesday at 10 work for you? والتغيير: Could we push it back to...?",
      "ruleEn": "Present continuous for fixed arrangements; 'Would ... work for you?'; 'Could we move/push it to...?'.",
      "formula": "Would + time + work for you? | Could we move it to ...? | I'm + V-ing + on + day",
      "examples": [
        {
          "en": "Would Tuesday at ten work for you?",
          "ar": "يناسبك الثلاثاء الساعة عشر؟"
        },
        {
          "en": "I'm meeting a client on Monday morning.",
          "ar": "عندي اجتماع مع عميل الاثنين الصبح."
        },
        {
          "en": "Could we push it back to the afternoon?",
          "ar": "ممكن نأخره للعصر؟"
        },
        {
          "en": "Let's move the meeting to Wednesday.",
          "ar": "خلنا ننقل الاجتماع للأربعاء."
        },
        {
          "en": "I'll send you a calendar invite.",
          "ar": "برسل لك دعوة في التقويم."
        },
        {
          "en": "Just to confirm, it's Thursday at two, online.",
          "ar": "للتأكيد: الخميس الساعة ثنتين أونلاين."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "We need to discuss the new project. Would Sunday at eleven work for you?",
        "ar": "نحتاج نناقش المشروع الجديد. يناسبك الأحد الساعة ١١؟"
      },
      {
        "speaker": "Student",
        "en": "I'm afraid I'm meeting a supplier then. How about Monday morning?",
        "ar": "للأسف عندي اجتماع مع مورّد وقتها. وش رايك الاثنين الصبح؟"
      },
      {
        "speaker": "Sara",
        "en": "Monday works. Ten o'clock?",
        "ar": "الاثنين مناسب. عشر؟"
      },
      {
        "speaker": "Student",
        "en": "Perfect. I'll send you a calendar invite with the agenda.",
        "ar": "ممتاز. برسل لك دعوة مع جدول الأعمال."
      },
      {
        "speaker": "Sara",
        "en": "Actually, could we push it back to eleven? I have a clash.",
        "ar": "بالمناسبة، ممكن نأخره لـ١١؟ عندي تعارض."
      },
      {
        "speaker": "Student",
        "en": "Sure. Just to confirm: Monday at eleven, meeting room B.",
        "ar": "أكيد. للتأكيد: الاثنين ١١، قاعة B."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: We need to discuss the new project. Would Sunday at eleven work for you?\nStudent: I'm afraid I'm meeting a supplier then. How about Monday morning?\nSara: Monday works. Ten o'clock?\nStudent: Perfect. I'll send you a calendar invite with the agenda.\nSara: Actually, could we push it back to eleven? I have a clash.\nStudent: Sure. Just to confirm: Monday at eleven, meeting room B.",
      "questions": [
        {
          "questionAr": "ليش ما يقدر الأحد؟",
          "questionEn": "Why can't the student meet on Sunday?",
          "options": [
            "he's sick",
            "he's meeting a supplier",
            "holiday"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: he's meeting a supplier"
        },
        {
          "questionAr": "الموعد النهائي؟",
          "questionEn": "What's the final time?",
          "options": [
            "Monday 10",
            "Monday 11",
            "Sunday 11"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: Monday 11"
        },
        {
          "questionAr": "وين؟",
          "questionEn": "Where?",
          "options": [
            "online",
            "meeting room B",
            "a café"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: meeting room B"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "schedule: /ˈskɛdʒuːl/ (US) vs /ˈʃɛdjuːl/ (UK)",
      "items": [
        "schedule /ˈskɛdʒuːl/",
        "agenda /əˈdʒɛndə/",
        "available /əˈveɪləbəl/"
      ],
      "tipAr": "النطقين صحيحين؛ اختر واحد والتزم فيه."
    },
    "exercises": {
      "easy": [
        {
          "id": "sc_224_e1",
          "type": "meaning",
          "promptEn": "What does \"schedule\" mean?",
          "promptAr": "ما معنى \"schedule\"؟",
          "options": [
            "يقدّم",
            "فترة متاحة",
            "جدول/يجدول",
            "يعيد الجدولة"
          ],
          "correctIndex": 2,
          "answer": "جدول/يجدول",
          "explanationAr": "\"schedule\" /ˈskɛdʒuːl/ تعني: جدول/يجدول. مثال: Let's schedule a call."
        },
        {
          "id": "sc_224_e2",
          "type": "meaning",
          "promptEn": "What does \"reschedule\" mean?",
          "promptAr": "ما معنى \"reschedule\"؟",
          "options": [
            "متاح",
            "تعارض مواعيد",
            "يؤجل",
            "يعيد الجدولة"
          ],
          "correctIndex": 3,
          "answer": "يعيد الجدولة",
          "explanationAr": "\"reschedule\" /riːˈskɛdʒuːl/ تعني: يعيد الجدولة. مثال: Can we reschedule?"
        },
        {
          "id": "sc_224_e3",
          "type": "meaning",
          "promptEn": "What does \"available\" mean?",
          "promptAr": "ما معنى \"available\"؟",
          "options": [
            "متاح",
            "جدول الأعمال",
            "تعارض مواعيد",
            "يقدّم"
          ],
          "correctIndex": 0,
          "answer": "متاح",
          "explanationAr": "\"available\" /əˈveɪləbəl/ تعني: متاح. مثال: Are you available on Sunday?"
        },
        {
          "id": "sc_224_e4",
          "type": "meaning",
          "promptEn": "What does \"push back\" mean?",
          "promptAr": "ما معنى \"push back\"؟",
          "options": [
            "دعوة (تقويم)",
            "يعيد الجدولة",
            "يؤجل",
            "جدول/يجدول"
          ],
          "correctIndex": 2,
          "answer": "يؤجل",
          "explanationAr": "\"push back\" /pʊʃ bæk/ تعني: يؤجل. مثال: Let's push it back an hour."
        }
      ],
      "medium": [
        {
          "id": "sc_224_m1",
          "type": "gap",
          "promptEn": "Complete: Would Tuesday at ten ____?",
          "promptAr": "أكمل الفراغ: (يناسبك الثلاثاء الساعة عشر؟)",
          "options": [
            "okay to you",
            "work for you",
            "suit for you"
          ],
          "correctIndex": 1,
          "answer": "Would Tuesday at ten work for you?",
          "explanationAr": "الإجابة: work for you. المضارع المستمر للمواعيد المقررة: I'm meeting the client on Monday. والاقتراح: Would Tuesday at 10 work for you? والتغيير: Could we push it back to...?"
        },
        {
          "id": "sc_224_m2",
          "type": "gap",
          "promptEn": "Complete: ____ a client on Monday morning.",
          "promptAr": "أكمل الفراغ: (عندي اجتماع مع عميل الاثنين الصبح.)",
          "options": [
            "I will meeting",
            "I'm meeting",
            "I meet"
          ],
          "correctIndex": 1,
          "answer": "I'm meeting a client on Monday morning.",
          "explanationAr": "الإجابة: I'm meeting. المضارع المستمر للمواعيد المقررة: I'm meeting the client on Monday. والاقتراح: Would Tuesday at 10 work for you? والتغيير: Could we push it back to...?"
        },
        {
          "id": "sc_224_m3",
          "type": "gap",
          "promptEn": "Complete: Could we ____ to the afternoon?",
          "promptAr": "أكمل الفراغ: (ممكن نأخره للعصر؟)",
          "options": [
            "back push it",
            "push it back",
            "delay to"
          ],
          "correctIndex": 1,
          "answer": "Could we push it back to the afternoon?",
          "explanationAr": "الإجابة: push it back. المضارع المستمر للمواعيد المقررة: I'm meeting the client on Monday. والاقتراح: Would Tuesday at 10 work for you? والتغيير: Could we push it back to...?"
        },
        {
          "id": "sc_224_m4",
          "type": "gap",
          "promptEn": "Complete: Let's ____ the meeting to Wednesday.",
          "promptAr": "أكمل الفراغ: (خلنا ننقل الاجتماع للأربعاء.)",
          "options": [
            "transfer",
            "change to",
            "move"
          ],
          "correctIndex": 2,
          "answer": "Let's move the meeting to Wednesday.",
          "explanationAr": "الإجابة: move. المضارع المستمر للمواعيد المقررة: I'm meeting the client on Monday. والاقتراح: Would Tuesday at 10 work for you? والتغيير: Could we push it back to...?"
        }
      ],
      "hard": [
        {
          "id": "sc_224_h1",
          "type": "order",
          "promptEn": "Put the words in order: send / calendar / you / a / I'll / invite.",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (برسل لك دعوة في التقويم.)",
          "answer": "I'll send you a calendar invite.",
          "explanationAr": "الترتيب الصحيح: I'll send you a calendar invite."
        },
        {
          "id": "sc_224_h2",
          "type": "order",
          "promptEn": "Put the words in order: to / it's / two, / at / confirm, / online. / Just / Thursday",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (للتأكيد: الخميس الساعة ثنتين أونلاين.)",
          "answer": "Just to confirm, it's Thursday at two, online.",
          "explanationAr": "الترتيب الصحيح: Just to confirm, it's Thursday at two, online."
        },
        {
          "id": "sc_224_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: عندي اجتماع مع عميل الاثنين الصبح.",
          "answer": "I'm meeting a client on Monday morning.",
          "explanationAr": "ترجمة مقترحة: I'm meeting a client on Monday morning."
        },
        {
          "id": "sc_224_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: خلنا ننقل الاجتماع للأربعاء.",
          "answer": "Let's move the meeting to Wednesday.",
          "explanationAr": "ترجمة مقترحة: Let's move the meeting to Wednesday."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Let's make a meeting.",
        "correct": "Let's have/set up a meeting.",
        "whyAr": "make a meeting ترجمة حرفية."
      },
      {
        "incorrect": "I'm busy in Monday.",
        "correct": "I'm busy on Monday.",
        "whyAr": "on مع الأيام."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (خدمة العملاء: الشكوى والاسترجاع): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "The product came broke.",
          "Is it suitable for you Tuesday?",
          "The product arrived damaged/broken."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: The product arrived damaged/broken. — broken اسم مفعول.",
        "fromLessonId": "sc_223"
      },
      {
        "questionAr": "مراجعة (إبداء الرأي والموافقة والاعتراض): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I agree with you.",
          "I agree you with.",
          "I am agree with you."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I agree with you. — agree فعل؛ ما نحط am.",
        "fromLessonId": "sc_203"
      },
      {
        "questionAr": "مراجعة (حكاية الويكند: كيف تحكي قصة): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "After we drove to the farm.",
          "After that, we drove to farm the.",
          "After that, we drove to the farm."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: After that, we drove to the farm. — After وحدها تحتاج جملة بعدها؛ استخدم After that.",
        "fromLessonId": "sc_219"
      },
      {
        "questionAr": "ما معنى \"salary\"؟",
        "questionEn": "What does \"salary\" mean?",
        "options": [
          "مسؤول عن",
          "نقطة قوة",
          "راتب",
          "يتخرج"
        ],
        "correctIndex": 2,
        "explanationAr": "\"salary\" /ˈsæləri/ تعني: راتب. مثال: expected salary",
        "fromLessonId": "sc_222"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (ممكن نأخره للعصر؟)",
          "questionEn": "Complete: Could we ____ to the afternoon?",
          "options": [
            "back push it",
            "push it back",
            "delay to"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: push it back. المضارع المستمر للمواعيد المقررة: I'm meeting the client on Monday. والاقتراح: Would Tuesday at 10 work for you? والتغيير: Could we push it back to...?"
        },
        {
          "questionAr": "أكمل الفراغ: (خلنا ننقل الاجتماع للأربعاء.)",
          "questionEn": "Complete: Let's ____ the meeting to Wednesday.",
          "options": [
            "transfer",
            "change to",
            "move"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: move. المضارع المستمر للمواعيد المقررة: I'm meeting the client on Monday. والاقتراح: Would Tuesday at 10 work for you? والتغيير: Could we push it back to...?"
        },
        {
          "questionAr": "ما معنى \"bring forward\"؟",
          "questionEn": "What does \"bring forward\" mean?",
          "options": [
            "يقدّم",
            "يؤجل",
            "فترة متاحة",
            "جدول/يجدول"
          ],
          "correctIndex": 0,
          "explanationAr": "\"bring forward\" /brɪŋ ˈfɔːrwərd/ تعني: يقدّم. مثال: Can we bring it forward?"
        },
        {
          "questionAr": "ما معنى \"agenda\"؟",
          "questionEn": "What does \"agenda\" mean?",
          "options": [
            "جدول الأعمال",
            "يؤكد",
            "تعارض مواعيد",
            "فترة متاحة"
          ],
          "correctIndex": 0,
          "explanationAr": "\"agenda\" /əˈdʒɛndə/ تعني: جدول الأعمال. مثال: Here's the agenda."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Let's make a meeting.",
            "Let's have/set up a meeting.",
            "Let's has/set up a meeting."
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: Let's have/set up a meeting. — make a meeting ترجمة حرفية."
        }
      ]
    }
  },
  {
    "id": "sc_225",
    "pillarId": "conversation",
    "pillarNameAr": "المحادثة والطلاقة التفاعلية",
    "pillarNameEn": "Active Conversation & Fluency Drills",
    "pillarIcon": "💬",
    "level": "متوسط (Intermediate)",
    "levelCode": "B1-B2",
    "titleAr": "التفاعل مع الكلام: ردود فعل طبيعية",
    "titleEn": "Reacting Naturally: Showing Interest and Empathy",
    "descAr": "لا تكون مستمعاً صامتاً: ردود قصيرة تبين الاهتمام والتعاطف والدهشة.",
    "descEn": "Be an active listener: short responses for interest, empathy and surprise.",
    "speakingGoalAr": "تفاعل مع ثلاث قصص من سارة بردود مناسبة.",
    "speakingGoalEn": "React appropriately to three stories from Sara.",
    "keyPattern": {
      "ruleAr": "الاهتمام: Really? / Oh, really? الدهشة: No way! / Seriously? التعاطف: Oh no, I'm sorry to hear that. الفرح: That's great news! وأسئلة الصدى: You did? / Did you?",
      "ruleEn": "Interest: Really?; surprise: No way!; empathy: Sorry to hear that; joy: Great news!; echo questions: Did you?",
      "formula": "Reaction + echo question + follow-up question"
    },
    "practicalExamples": [
      {
        "en": "I got the scholarship! — That's great news! Congratulations!",
        "ar": "جاتني البعثة! — خبر حلو! مبروك!"
      },
      {
        "en": "My car broke down again. — Oh no, I'm sorry to hear that.",
        "ar": "سيارتي خربت مرة ثانية. — يا ساتر، آسف أسمع كذا."
      },
      {
        "en": "I met Cristiano Ronaldo! — No way! Seriously?",
        "ar": "قابلت كريستيانو! — مستحيل! جد؟"
      },
      {
        "en": "I've just come back from Japan. — Have you? How was it?",
        "ar": "توني راجع من اليابان. — صدق؟ كيف كانت؟"
      },
      {
        "en": "That must have been scary!",
        "ar": "أكيد كان مخيف!"
      },
      {
        "en": "Tell me more!",
        "ar": "علمني أكثر!"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "I passed! — Good.",
        "correct": "That's fantastic! Well done!",
        "whyAr": "الرد الجاف يحبط المتكلم."
      },
      {
        "incorrect": "My grandma is sick. — No way!",
        "correct": "Oh, I'm sorry to hear that. I hope she gets better soon.",
        "whyAr": "No way للدهشة، مو للأخبار المحزنة."
      },
      {
        "incorrect": "I went to Paris. — Did you went?",
        "correct": "Did you? How was it?",
        "whyAr": "سؤال الصدى: Did you?"
      }
    ],
    "speakingChallenge": {
      "promptAr": "تفاعل مع أخبار سارة.",
      "promptEn": "React to Sara's news.",
      "saraQuestionAr": "عندي خبرين: خطبت! بس جوالي انسرق أمس.",
      "saraQuestionEn": "Two pieces of news: I got engaged! But my phone was stolen yesterday.",
      "recommendedResponseEn": "No way! Congratulations! That's wonderful news! But oh no, I'm sorry to hear about your phone. That must have been stressful. Did you call the police?"
    },
    "quiz": [
      {
        "questionAr": "صديقك قال: My dad is in hospital.",
        "questionEn": "Friend: 'My dad is in hospital.'",
        "options": [
          "No way!",
          "I'm sorry to hear that. I hope he gets better soon.",
          "Cool."
        ],
        "correctIndex": 1,
        "explanationAr": "تعاطف."
      },
      {
        "questionAr": "سؤال صدى لـ I've been to Korea:",
        "questionEn": "Echo question for 'I've been to Korea':",
        "options": [
          "Have you?",
          "Did you?",
          "Are you?"
        ],
        "correctIndex": 0,
        "explanationAr": "نفس الفعل المساعد: have."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "That's fantastic! done Well!",
          "I passed! — Good.",
          "That's fantastic! Well done!"
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: That's fantastic! Well done! — الرد الجاف يحبط المتكلم."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Oh, I'm sorry to hear that. I hope she gets better soon.",
          "Oh, I'm sorry to hear that. I hope she gets soon better.",
          "My grandma is sick. — No way!"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Oh, I'm sorry to hear that. I hope she gets better soon. — No way للدهشة، مو للأخبار المحزنة."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Did you? How were it?",
          "I went to Paris. — Did you went?",
          "Did you? How was it?"
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: Did you? How was it? — سؤال الصدى: Did you?"
      }
    ],
    "whiteboardNotes": {
      "title": "Reacting Naturally: Showing Interest and Empathy",
      "pointsAr": [
        "يستخدم ردود فعل متنوعة.",
        "يستخدم أسئلة الصدى.",
        "يتابع بسؤال مفتوح.",
        "الاهتمام: Really? / Oh, really? الدهشة: No way! / Seriously? التعاطف: Oh no, I'm sorry to hear that. الفرح: That's great news! وأسئلة الصدى: You did? / Did you?"
      ],
      "pointsEn": [
        "Use varied reactions.",
        "Use echo questions.",
        "Follow up with an open question.",
        "Interest: Really?; surprise: No way!; empathy: Sorry to hear that; joy: Great news!; echo questions: Did you?"
      ],
      "chalkHighlight": "Reaction + echo question + follow-up question"
    },
    "unit": 5,
    "cefr": "B1",
    "objectivesAr": [
      "يستخدم ردود فعل متنوعة.",
      "يستخدم أسئلة الصدى.",
      "يتابع بسؤال مفتوح."
    ],
    "objectivesEn": [
      "Use varied reactions.",
      "Use echo questions.",
      "Follow up with an open question."
    ],
    "vocabulary": [
      {
        "word": "really",
        "ipa": "/ˈrɪəli/",
        "ar": "صدق؟",
        "exampleEn": "Really? Wow!",
        "exampleAr": "صدق؟ واو!"
      },
      {
        "word": "seriously",
        "ipa": "/ˈsɪriəsli/",
        "ar": "جد؟",
        "exampleEn": "Seriously?",
        "exampleAr": "جد؟"
      },
      {
        "word": "no way",
        "ipa": "/noʊ weɪ/",
        "ar": "مستحيل!",
        "exampleEn": "No way!",
        "exampleAr": "مستحيل!"
      },
      {
        "word": "congratulations",
        "ipa": "/kənˌɡrætʃəˈleɪʃənz/",
        "ar": "مبروك",
        "exampleEn": "Congratulations!",
        "exampleAr": "مبروك!"
      },
      {
        "word": "sorry to hear",
        "ipa": "/ˈsɑːri tə hɪr/",
        "ar": "آسف أسمع",
        "exampleEn": "Sorry to hear that.",
        "exampleAr": "آسف أسمع كذا."
      },
      {
        "word": "must have been",
        "ipa": "/mʌst əv bɪn/",
        "ar": "أكيد كان",
        "exampleEn": "That must have been fun.",
        "exampleAr": "أكيد كانت وناسة."
      },
      {
        "word": "lucky",
        "ipa": "/ˈlʌki/",
        "ar": "محظوظ",
        "exampleEn": "You're so lucky!",
        "exampleAr": "محظوظ!"
      },
      {
        "word": "Get well soon",
        "ipa": "/ɡɛt wɛl suːn/",
        "ar": "الله يشفيه/ك",
        "exampleEn": "Get well soon!",
        "exampleAr": "ما تشوف شر!"
      },
      {
        "word": "awesome",
        "ipa": "/ˈɔːsəm/",
        "ar": "رهيب",
        "exampleEn": "That's awesome!",
        "exampleAr": "رهيب!"
      },
      {
        "word": "what a shame",
        "ipa": "/wʌt ə ʃeɪm/",
        "ar": "يا خسارة",
        "exampleEn": "What a shame!",
        "exampleAr": "يا خسارة!"
      }
    ],
    "grammarFocus": {
      "ruleAr": "الاهتمام: Really? / Oh, really? الدهشة: No way! / Seriously? التعاطف: Oh no, I'm sorry to hear that. الفرح: That's great news! وأسئلة الصدى: You did? / Did you?",
      "ruleEn": "Interest: Really?; surprise: No way!; empathy: Sorry to hear that; joy: Great news!; echo questions: Did you?",
      "formula": "Reaction + echo question + follow-up question",
      "examples": [
        {
          "en": "I got the scholarship! — That's great news! Congratulations!",
          "ar": "جاتني البعثة! — خبر حلو! مبروك!"
        },
        {
          "en": "My car broke down again. — Oh no, I'm sorry to hear that.",
          "ar": "سيارتي خربت مرة ثانية. — يا ساتر، آسف أسمع كذا."
        },
        {
          "en": "I met Cristiano Ronaldo! — No way! Seriously?",
          "ar": "قابلت كريستيانو! — مستحيل! جد؟"
        },
        {
          "en": "I've just come back from Japan. — Have you? How was it?",
          "ar": "توني راجع من اليابان. — صدق؟ كيف كانت؟"
        },
        {
          "en": "That must have been scary!",
          "ar": "أكيد كان مخيف!"
        },
        {
          "en": "Tell me more!",
          "ar": "علمني أكثر!"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Guess what? I passed my driving test!",
        "ar": "تخيل! نجحت في اختبار السواقة!"
      },
      {
        "speaker": "Student",
        "en": "No way! Congratulations! Was it difficult?",
        "ar": "مستحيل! مبروك! كان صعب؟"
      },
      {
        "speaker": "Sara",
        "en": "A bit. But on the way home, someone hit my car.",
        "ar": "شوي. بس وأنا راجعة أحد صدم سيارتي."
      },
      {
        "speaker": "Student",
        "en": "Oh no! I'm sorry to hear that. Are you OK?",
        "ar": "يا ساتر! آسف. أنتي بخير؟"
      },
      {
        "speaker": "Sara",
        "en": "I'm fine, just a small scratch.",
        "ar": "بخير، بس خدش بسيط."
      },
      {
        "speaker": "Student",
        "en": "Thank God. That must have been scary!",
        "ar": "الحمد لله. أكيد كان مخيف!"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Guess what? I passed my driving test!\nStudent: No way! Congratulations! Was it difficult?\nSara: A bit. But on the way home, someone hit my car.\nStudent: Oh no! I'm sorry to hear that. Are you OK?\nSara: I'm fine, just a small scratch.\nStudent: Thank God. That must have been scary!",
      "questions": [
        {
          "questionAr": "وش نجحت فيه؟",
          "questionEn": "What did Sara pass?",
          "options": [
            "an English exam",
            "her driving test",
            "a job interview"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: her driving test"
        },
        {
          "questionAr": "وش صار بالطريق؟",
          "questionEn": "What happened on the way home?",
          "options": [
            "she got lost",
            "someone hit her car",
            "a flat tyre"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: someone hit her car"
        },
        {
          "questionAr": "قد إيش؟",
          "questionEn": "How bad was it?",
          "options": [
            "a small scratch",
            "the car was destroyed",
            "she was injured"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: a small scratch"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Intonation of surprise: Really?? ↗↗ / Oh no ↘",
      "items": [
        "Really? ↗ (high rise)",
        "Oh no... ↘ (low fall)",
        "Congratulations /kənˌɡrætʃəˈleɪʃənz/"
      ],
      "tipAr": "النبرة تحمل المعنى: الدهشة صوت عالي صاعد، التعاطف صوت منخفض هادئ."
    },
    "exercises": {
      "easy": [
        {
          "id": "sc_225_e1",
          "type": "meaning",
          "promptEn": "What does \"really\" mean?",
          "promptAr": "ما معنى \"really\"؟",
          "options": [
            "الله يشفيه/ك",
            "محظوظ",
            "صدق؟",
            "مبروك"
          ],
          "correctIndex": 2,
          "answer": "صدق؟",
          "explanationAr": "\"really\" /ˈrɪəli/ تعني: صدق؟. مثال: Really? Wow!"
        },
        {
          "id": "sc_225_e2",
          "type": "meaning",
          "promptEn": "What does \"seriously\" mean?",
          "promptAr": "ما معنى \"seriously\"؟",
          "options": [
            "جد؟",
            "رهيب",
            "الله يشفيه/ك",
            "آسف أسمع"
          ],
          "correctIndex": 0,
          "answer": "جد؟",
          "explanationAr": "\"seriously\" /ˈsɪriəsli/ تعني: جد؟. مثال: Seriously?"
        },
        {
          "id": "sc_225_e3",
          "type": "meaning",
          "promptEn": "What does \"no way\" mean?",
          "promptAr": "ما معنى \"no way\"؟",
          "options": [
            "محظوظ",
            "مستحيل!",
            "رهيب",
            "مبروك"
          ],
          "correctIndex": 1,
          "answer": "مستحيل!",
          "explanationAr": "\"no way\" /noʊ weɪ/ تعني: مستحيل!. مثال: No way!"
        },
        {
          "id": "sc_225_e4",
          "type": "meaning",
          "promptEn": "What does \"congratulations\" mean?",
          "promptAr": "ما معنى \"congratulations\"؟",
          "options": [
            "مبروك",
            "محظوظ",
            "جد؟",
            "رهيب"
          ],
          "correctIndex": 0,
          "answer": "مبروك",
          "explanationAr": "\"congratulations\" /kənˌɡrætʃəˈleɪʃənz/ تعني: مبروك. مثال: Congratulations!"
        }
      ],
      "medium": [
        {
          "id": "sc_225_m1",
          "type": "gap",
          "promptEn": "Complete: I got the scholarship! — That's ____! Congratulations!",
          "promptAr": "أكمل الفراغ: (جاتني البعثة! — خبر حلو! مبروك!)",
          "options": [
            "great news",
            "good new",
            "great new"
          ],
          "correctIndex": 0,
          "answer": "I got the scholarship! — That's great news! Congratulations!",
          "explanationAr": "الإجابة: great news. الاهتمام: Really? / Oh, really? الدهشة: No way! / Seriously? التعاطف: Oh no, I'm sorry to hear that. الفرح: That's great news! وأسئلة الصدى: You did? / Did you?"
        },
        {
          "id": "sc_225_m2",
          "type": "gap",
          "promptEn": "Complete: My car broke down again. — Oh no, I'm ____ that.",
          "promptAr": "أكمل الفراغ: (سيارتي خربت مرة ثانية. — يا ساتر، آسف أسمع كذا.)",
          "options": [
            "sorry to hear",
            "sad to hear",
            "sorry for hear"
          ],
          "correctIndex": 0,
          "answer": "My car broke down again. — Oh no, I'm sorry to hear that.",
          "explanationAr": "الإجابة: sorry to hear. الاهتمام: Really? / Oh, really? الدهشة: No way! / Seriously? التعاطف: Oh no, I'm sorry to hear that. الفرح: That's great news! وأسئلة الصدى: You did? / Did you?"
        },
        {
          "id": "sc_225_m3",
          "type": "gap",
          "promptEn": "Complete: I met Cristiano Ronaldo! — ____! Seriously?",
          "promptAr": "أكمل الفراغ: (قابلت كريستيانو! — مستحيل! جد؟)",
          "options": [
            "No how",
            "No way",
            "Not way"
          ],
          "correctIndex": 1,
          "answer": "I met Cristiano Ronaldo! — No way! Seriously?",
          "explanationAr": "الإجابة: No way. الاهتمام: Really? / Oh, really? الدهشة: No way! / Seriously? التعاطف: Oh no, I'm sorry to hear that. الفرح: That's great news! وأسئلة الصدى: You did? / Did you?"
        },
        {
          "id": "sc_225_m4",
          "type": "gap",
          "promptEn": "Complete: I've just come back from Japan. — ____? How was it?",
          "promptAr": "أكمل الفراغ: (توني راجع من اليابان. — صدق؟ كيف كانت؟)",
          "options": [
            "You have",
            "Did you",
            "Have you"
          ],
          "correctIndex": 2,
          "answer": "I've just come back from Japan. — Have you? How was it?",
          "explanationAr": "الإجابة: Have you. الاهتمام: Really? / Oh, really? الدهشة: No way! / Seriously? التعاطف: Oh no, I'm sorry to hear that. الفرح: That's great news! وأسئلة الصدى: You did? / Did you?"
        }
      ],
      "hard": [
        {
          "id": "sc_225_h1",
          "type": "order",
          "promptEn": "Put the words in order: That / must / been / have / scary!",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (أكيد كان مخيف!)",
          "answer": "That must have been scary!",
          "explanationAr": "الترتيب الصحيح: That must have been scary!"
        },
        {
          "id": "sc_225_h2",
          "type": "order",
          "promptEn": "Put the words in order: more! / me / Tell",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (علمني أكثر!)",
          "answer": "Tell me more!",
          "explanationAr": "الترتيب الصحيح: Tell me more!"
        },
        {
          "id": "sc_225_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: سيارتي خربت مرة ثانية. — يا ساتر، آسف أسمع كذا.",
          "answer": "My car broke down again. — Oh no, I'm sorry to hear that.",
          "explanationAr": "ترجمة مقترحة: My car broke down again. — Oh no, I'm sorry to hear that."
        },
        {
          "id": "sc_225_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: توني راجع من اليابان. — صدق؟ كيف كانت؟",
          "answer": "I've just come back from Japan. — Have you? How was it?",
          "explanationAr": "ترجمة مقترحة: I've just come back from Japan. — Have you? How was it?"
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Mabrook! (in English conversation)",
        "correct": "Congratulations!",
        "whyAr": "استخدم الكلمة الإنجليزية مع غير العرب."
      },
      {
        "incorrect": "I'm sad for you.",
        "correct": "I'm so sorry to hear that.",
        "whyAr": "التعبير الطبيعي للتعاطف."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (ترتيب المواعيد والاجتماعات في العمل): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I will meet the client Monday (arranged).",
          "I'm meeting the client on Monday.",
          "I'm meeting the client Monday on."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I'm meeting the client on Monday. — للموعد المرتب نستخدم المستمر، و on مع الأيام.",
        "fromLessonId": "sc_224"
      },
      {
        "questionAr": "مراجعة (مقابلة العمل: عرّف بنفسك): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I graduated King Saud University.",
          "I graduated from King University Saud.",
          "I graduated from King Saud University."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: I graduated from King Saud University. — graduate from.",
        "fromLessonId": "sc_222"
      },
      {
        "questionAr": "مراجعة (الاقتراحات: Let's / How about / Why don't we): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "How about going to the mall?",
          "How about go to the mall?",
          "How about going to mall the?"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: How about going to the mall? — How about + ing.",
        "fromLessonId": "sc_220"
      },
      {
        "questionAr": "ما معنى \"escalate\"؟",
        "questionEn": "What does \"escalate\" mean?",
        "options": [
          "يصعّد",
          "ضمان",
          "رقم الطلب",
          "استبدال"
        ],
        "correctIndex": 0,
        "explanationAr": "\"escalate\" /ˈɛskəleɪt/ تعني: يصعّد. مثال: Please escalate this.",
        "fromLessonId": "sc_223"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (قابلت كريستيانو! — مستحيل! جد؟)",
          "questionEn": "Complete: I met Cristiano Ronaldo! — ____! Seriously?",
          "options": [
            "No how",
            "No way",
            "Not way"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: No way. الاهتمام: Really? / Oh, really? الدهشة: No way! / Seriously? التعاطف: Oh no, I'm sorry to hear that. الفرح: That's great news! وأسئلة الصدى: You did? / Did you?"
        },
        {
          "questionAr": "أكمل الفراغ: (توني راجع من اليابان. — صدق؟ كيف كانت؟)",
          "questionEn": "Complete: I've just come back from Japan. — ____? How was it?",
          "options": [
            "You have",
            "Did you",
            "Have you"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: Have you. الاهتمام: Really? / Oh, really? الدهشة: No way! / Seriously? التعاطف: Oh no, I'm sorry to hear that. الفرح: That's great news! وأسئلة الصدى: You did? / Did you?"
        },
        {
          "questionAr": "ما معنى \"sorry to hear\"؟",
          "questionEn": "What does \"sorry to hear\" mean?",
          "options": [
            "محظوظ",
            "رهيب",
            "آسف أسمع",
            "مستحيل!"
          ],
          "correctIndex": 2,
          "explanationAr": "\"sorry to hear\" /ˈsɑːri tə hɪr/ تعني: آسف أسمع. مثال: Sorry to hear that."
        },
        {
          "questionAr": "ما معنى \"must have been\"؟",
          "questionEn": "What does \"must have been\" mean?",
          "options": [
            "أكيد كان",
            "محظوظ",
            "يا خسارة",
            "مستحيل!"
          ],
          "correctIndex": 0,
          "explanationAr": "\"must have been\" /mʌst əv bɪn/ تعني: أكيد كان. مثال: That must have been fun."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Mabrook! (in English conversation)",
            "I passed! — Good.",
            "Congratulations!"
          ],
          "correctIndex": 2,
          "explanationAr": "الصحيح: Congratulations! — استخدم الكلمة الإنجليزية مع غير العرب."
        }
      ]
    }
  },
  {
    "id": "sc_226",
    "pillarId": "conversation",
    "pillarNameAr": "المحادثة والطلاقة التفاعلية",
    "pillarNameEn": "Active Conversation & Fluency Drills",
    "pillarIcon": "💬",
    "level": "متوسط (Intermediate)",
    "levelCode": "B1-B2",
    "titleAr": "التفاوض على السعر والإقناع",
    "titleEn": "Negotiating Prices and Persuading",
    "descAr": "فاصل في السعر باحترام، قدم عرضاً مضاداً، واقنع بالمنطق.",
    "descEn": "Bargain respectfully, make counter-offers and persuade with reasons.",
    "speakingGoalAr": "فاوض سارة على سعر سيارة مستعملة.",
    "speakingGoalEn": "Negotiate a used car price with Sara.",
    "keyPattern": {
      "ruleAr": "Is there any flexibility on the price? / Would you accept...? / If you..., I'll... / That's my final offer. استخدم الشرط الأول للمساومة.",
      "ruleEn": "Ask about flexibility, counter-offer with 'Would you accept...?', and trade with 'If you..., I'll...'.",
      "formula": "Would you accept + price? | If you + present, I'll + verb | That's my best offer."
    },
    "practicalExamples": [
      {
        "en": "Is there any flexibility on the price?",
        "ar": "فيه مجال في السعر؟"
      },
      {
        "en": "Would you accept forty thousand?",
        "ar": "تقبل بأربعين ألف؟"
      },
      {
        "en": "If you include the service, I'll pay cash today.",
        "ar": "إذا شملت الصيانة، أدفع كاش اليوم."
      },
      {
        "en": "That's a bit more than I expected.",
        "ar": "هذا أكثر شوي من اللي توقعته."
      },
      {
        "en": "Let's meet halfway.",
        "ar": "خلنا نتقابل في النص."
      },
      {
        "en": "That's my final offer.",
        "ar": "هذا آخر عرض عندي."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Give me discount.",
        "correct": "Is there any discount available?",
        "whyAr": "الأمر المباشر يقفل التفاوض."
      },
      {
        "incorrect": "Would you except 40,000?",
        "correct": "Would you accept 40,000?",
        "whyAr": "accept = يقبل، except = باستثناء."
      },
      {
        "incorrect": "If you will lower it, I buy.",
        "correct": "If you lower it, I'll buy it.",
        "whyAr": "شرط أول."
      }
    ],
    "speakingChallenge": {
      "promptAr": "فاوض سارة على سعر إيجار شقة.",
      "promptEn": "Negotiate an apartment rent with Sara.",
      "saraQuestionAr": "The rent is 45,000 riyals a year.",
      "saraQuestionEn": "The rent is 45,000 riyals a year.",
      "recommendedResponseEn": "That's a bit over my budget. Is there any flexibility? Would you accept 40,000 if I pay for the whole year upfront? Let's meet halfway at 42,000."
    },
    "quiz": [
      {
        "questionAr": "طلب مرونة:",
        "questionEn": "Ask for flexibility:",
        "options": [
          "Cheaper!",
          "Is there any flexibility on the price?",
          "Too expensive, no."
        ],
        "correctIndex": 1,
        "explanationAr": "صيغة مهذبة."
      },
      {
        "questionAr": "«نتقابل في النص» =",
        "questionEn": "'compromise' phrase:",
        "options": [
          "meet halfway",
          "meet middle",
          "half meet"
        ],
        "correctIndex": 0,
        "explanationAr": "meet halfway."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Give me discount.",
          "Is there any discount available?",
          "Is there any available discount?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Is there any discount available? — الأمر المباشر يقفل التفاوض."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Would you accept 40,000?",
          "Give me discount.",
          "Would you except 40,000?"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Would you accept 40,000? — accept = يقبل، except = باستثناء."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "If you lower it, I'll buy it.",
          "If you lower it, I'll it buy.",
          "If you will lower it, I buy."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: If you lower it, I'll buy it. — شرط أول."
      }
    ],
    "whiteboardNotes": {
      "title": "Negotiating Prices and Persuading",
      "pointsAr": [
        "يطلب تخفيض بأدب.",
        "يقدم عرضاً مضاداً.",
        "يقايض بشرط.",
        "Is there any flexibility on the price? / Would you accept...? / If you..., I'll... / That's my final offer. استخدم الشرط الأول للمساومة."
      ],
      "pointsEn": [
        "Ask for a discount politely.",
        "Make a counter-offer.",
        "Trade conditions with if.",
        "Ask about flexibility, counter-offer with 'Would you accept...?', and trade with 'If you..., I'll...'."
      ],
      "chalkHighlight": "Would you accept + price? | If you + present, I'll + verb | That's my best offer."
    },
    "unit": 6,
    "cefr": "B1",
    "objectivesAr": [
      "يطلب تخفيض بأدب.",
      "يقدم عرضاً مضاداً.",
      "يقايض بشرط."
    ],
    "objectivesEn": [
      "Ask for a discount politely.",
      "Make a counter-offer.",
      "Trade conditions with if."
    ],
    "vocabulary": [
      {
        "word": "negotiate",
        "ipa": "/nɪˈɡoʊʃieɪt/",
        "ar": "يفاوض",
        "exampleEn": "Let's negotiate.",
        "exampleAr": "نتفاوض."
      },
      {
        "word": "offer",
        "ipa": "/ˈɔːfər/",
        "ar": "عرض",
        "exampleEn": "a good offer",
        "exampleAr": "عرض زين"
      },
      {
        "word": "discount",
        "ipa": "/ˈdɪskaʊnt/",
        "ar": "خصم",
        "exampleEn": "a 10% discount",
        "exampleAr": "خصم ١٠٪"
      },
      {
        "word": "flexibility",
        "ipa": "/ˌflɛksəˈbɪləti/",
        "ar": "مرونة",
        "exampleEn": "any flexibility?",
        "exampleAr": "فيه مرونة؟"
      },
      {
        "word": "accept",
        "ipa": "/əkˈsɛpt/",
        "ar": "يقبل",
        "exampleEn": "I accept.",
        "exampleAr": "أقبل."
      },
      {
        "word": "halfway",
        "ipa": "/ˌhæfˈweɪ/",
        "ar": "في النص",
        "exampleEn": "meet halfway",
        "exampleAr": "نتقابل في النص"
      },
      {
        "word": "mileage",
        "ipa": "/ˈmaɪlɪdʒ/",
        "ar": "الممشى",
        "exampleEn": "low mileage",
        "exampleAr": "ممشى قليل"
      },
      {
        "word": "condition",
        "ipa": "/kənˈdɪʃən/",
        "ar": "حالة",
        "exampleEn": "in good condition",
        "exampleAr": "بحالة زينة"
      },
      {
        "word": "budget",
        "ipa": "/ˈbʌdʒɪt/",
        "ar": "ميزانية",
        "exampleEn": "It's over my budget.",
        "exampleAr": "فوق ميزانيتي."
      },
      {
        "word": "deal",
        "ipa": "/diːl/",
        "ar": "صفقة/اتفاق",
        "exampleEn": "It's a deal!",
        "exampleAr": "اتفقنا!"
      }
    ],
    "grammarFocus": {
      "ruleAr": "Is there any flexibility on the price? / Would you accept...? / If you..., I'll... / That's my final offer. استخدم الشرط الأول للمساومة.",
      "ruleEn": "Ask about flexibility, counter-offer with 'Would you accept...?', and trade with 'If you..., I'll...'.",
      "formula": "Would you accept + price? | If you + present, I'll + verb | That's my best offer.",
      "examples": [
        {
          "en": "Is there any flexibility on the price?",
          "ar": "فيه مجال في السعر؟"
        },
        {
          "en": "Would you accept forty thousand?",
          "ar": "تقبل بأربعين ألف؟"
        },
        {
          "en": "If you include the service, I'll pay cash today.",
          "ar": "إذا شملت الصيانة، أدفع كاش اليوم."
        },
        {
          "en": "That's a bit more than I expected.",
          "ar": "هذا أكثر شوي من اللي توقعته."
        },
        {
          "en": "Let's meet halfway.",
          "ar": "خلنا نتقابل في النص."
        },
        {
          "en": "That's my final offer.",
          "ar": "هذا آخر عرض عندي."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "The car is forty-eight thousand. Low mileage, perfect condition.",
        "ar": "السيارة بثمانية وأربعين ألف. ممشى قليل وحالتها ممتازة."
      },
      {
        "speaker": "Student",
        "en": "It's nice, but it's over my budget. Is there any flexibility?",
        "ar": "حلوة، بس فوق ميزانيتي. فيه مجال؟"
      },
      {
        "speaker": "Sara",
        "en": "I could do forty-six.",
        "ar": "أقدر أنزل لست وأربعين."
      },
      {
        "speaker": "Student",
        "en": "Would you accept forty-two if I pay cash today?",
        "ar": "تقبل بثنين وأربعين إذا دفعت كاش اليوم؟"
      },
      {
        "speaker": "Sara",
        "en": "Let's meet halfway: forty-four.",
        "ar": "خلنا نتقابل في النص: أربعة وأربعين."
      },
      {
        "speaker": "Student",
        "en": "If you include new tyres, it's a deal.",
        "ar": "إذا ركبت كفرات جديدة، اتفقنا."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: The car is forty-eight thousand. Low mileage, perfect condition.\nStudent: It's nice, but it's over my budget. Is there any flexibility?\nSara: I could do forty-six.\nStudent: Would you accept forty-two if I pay cash today?\nSara: Let's meet halfway: forty-four.\nStudent: If you include new tyres, it's a deal.",
      "questions": [
        {
          "questionAr": "السعر الأول؟",
          "questionEn": "What was the first price?",
          "options": [
            "42,000",
            "46,000",
            "48,000"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: 48,000"
        },
        {
          "questionAr": "سعر النص؟",
          "questionEn": "What is the halfway price?",
          "options": [
            "44,000",
            "45,000",
            "43,000"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: 44,000"
        },
        {
          "questionAr": "شرط الطالب؟",
          "questionEn": "What's the student's condition?",
          "options": [
            "free service",
            "new tyres",
            "free insurance"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: new tyres"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "accept /əkˈsɛpt/ vs except /ɪkˈsɛpt/",
      "items": [
        "accept /əkˈsɛpt/",
        "except /ɪkˈsɛpt/",
        "negotiate /nɪˈɡoʊʃieɪt/"
      ],
      "tipAr": "الفرق في الصوت الأول فقط؛ ركّز عشان ما ينقلب المعنى."
    },
    "exercises": {
      "easy": [
        {
          "id": "sc_226_e1",
          "type": "meaning",
          "promptEn": "What does \"negotiate\" mean?",
          "promptAr": "ما معنى \"negotiate\"؟",
          "options": [
            "حالة",
            "يفاوض",
            "عرض",
            "مرونة"
          ],
          "correctIndex": 1,
          "answer": "يفاوض",
          "explanationAr": "\"negotiate\" /nɪˈɡoʊʃieɪt/ تعني: يفاوض. مثال: Let's negotiate."
        },
        {
          "id": "sc_226_e2",
          "type": "meaning",
          "promptEn": "What does \"offer\" mean?",
          "promptAr": "ما معنى \"offer\"؟",
          "options": [
            "ميزانية",
            "عرض",
            "خصم",
            "يفاوض"
          ],
          "correctIndex": 1,
          "answer": "عرض",
          "explanationAr": "\"offer\" /ˈɔːfər/ تعني: عرض. مثال: a good offer"
        },
        {
          "id": "sc_226_e3",
          "type": "meaning",
          "promptEn": "What does \"discount\" mean?",
          "promptAr": "ما معنى \"discount\"؟",
          "options": [
            "خصم",
            "يقبل",
            "ميزانية",
            "الممشى"
          ],
          "correctIndex": 0,
          "answer": "خصم",
          "explanationAr": "\"discount\" /ˈdɪskaʊnt/ تعني: خصم. مثال: a 10% discount"
        },
        {
          "id": "sc_226_e4",
          "type": "meaning",
          "promptEn": "What does \"flexibility\" mean?",
          "promptAr": "ما معنى \"flexibility\"؟",
          "options": [
            "مرونة",
            "يفاوض",
            "يقبل",
            "ميزانية"
          ],
          "correctIndex": 0,
          "answer": "مرونة",
          "explanationAr": "\"flexibility\" /ˌflɛksəˈbɪləti/ تعني: مرونة. مثال: any flexibility?"
        }
      ],
      "medium": [
        {
          "id": "sc_226_m1",
          "type": "gap",
          "promptEn": "Complete: Is there any ____ on the price?",
          "promptAr": "أكمل الفراغ: (فيه مجال في السعر؟)",
          "options": [
            "discount on",
            "flexible",
            "flexibility"
          ],
          "correctIndex": 2,
          "answer": "Is there any flexibility on the price?",
          "explanationAr": "الإجابة: flexibility. Is there any flexibility on the price? / Would you accept...? / If you..., I'll... / That's my final offer. استخدم الشرط الأول للمساومة."
        },
        {
          "id": "sc_226_m2",
          "type": "gap",
          "promptEn": "Complete: Would you ____ forty thousand?",
          "promptAr": "أكمل الفراغ: (تقبل بأربعين ألف؟)",
          "options": [
            "accept",
            "except",
            "agree"
          ],
          "correctIndex": 0,
          "answer": "Would you accept forty thousand?",
          "explanationAr": "الإجابة: accept. Is there any flexibility on the price? / Would you accept...? / If you..., I'll... / That's my final offer. استخدم الشرط الأول للمساومة."
        },
        {
          "id": "sc_226_m3",
          "type": "gap",
          "promptEn": "Complete: If you include the service, ____ cash today.",
          "promptAr": "أكمل الفراغ: (إذا شملت الصيانة، أدفع كاش اليوم.)",
          "options": [
            "I'll pay",
            "I will paying",
            "I pay"
          ],
          "correctIndex": 0,
          "answer": "If you include the service, I'll pay cash today.",
          "explanationAr": "الإجابة: I'll pay. Is there any flexibility on the price? / Would you accept...? / If you..., I'll... / That's my final offer. استخدم الشرط الأول للمساومة."
        },
        {
          "id": "sc_226_m4",
          "type": "gap",
          "promptEn": "Complete: That's a bit more than I ____.",
          "promptAr": "أكمل الفراغ: (هذا أكثر شوي من اللي توقعته.)",
          "options": [
            "expect",
            "expected",
            "waited"
          ],
          "correctIndex": 1,
          "answer": "That's a bit more than I expected.",
          "explanationAr": "الإجابة: expected. Is there any flexibility on the price? / Would you accept...? / If you..., I'll... / That's my final offer. استخدم الشرط الأول للمساومة."
        }
      ],
      "hard": [
        {
          "id": "sc_226_h1",
          "type": "order",
          "promptEn": "Put the words in order: halfway. / Let's / meet",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (خلنا نتقابل في النص.)",
          "answer": "Let's meet halfway.",
          "explanationAr": "الترتيب الصحيح: Let's meet halfway."
        },
        {
          "id": "sc_226_h2",
          "type": "order",
          "promptEn": "Put the words in order: offer. / final / my / That's",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (هذا آخر عرض عندي.)",
          "answer": "That's my final offer.",
          "explanationAr": "الترتيب الصحيح: That's my final offer."
        },
        {
          "id": "sc_226_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: تقبل بأربعين ألف؟",
          "answer": "Would you accept forty thousand?",
          "explanationAr": "ترجمة مقترحة: Would you accept forty thousand?"
        },
        {
          "id": "sc_226_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: هذا أكثر شوي من اللي توقعته.",
          "answer": "That's a bit more than I expected.",
          "explanationAr": "ترجمة مقترحة: That's a bit more than I expected."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Last price?",
        "correct": "What's your best price?",
        "whyAr": "«آخر سعر؟» بالإنجليزي: best price."
      },
      {
        "incorrect": "Make it cheaper for me, brother.",
        "correct": "Could you do a better price?",
        "whyAr": "أسلوب مهني."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (التفاعل مع الكلام: ردود فعل طبيعية): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Oh, I'm sorry to hear that. I hope she gets soon better.",
          "Oh, I'm sorry to hear that. I hope she gets better soon.",
          "My grandma is sick. — No way!"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Oh, I'm sorry to hear that. I hope she gets better soon. — No way للدهشة، مو للأخبار المحزنة.",
        "fromLessonId": "sc_225"
      },
      {
        "questionAr": "مراجعة (خدمة العملاء: الشكوى والاسترجاع): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'd like a refund, please.",
          "I'd like an refund, please.",
          "I want my money back now!"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I'd like a refund, please. — الحزم بأدب أنجح.",
        "fromLessonId": "sc_223"
      },
      {
        "questionAr": "مراجعة (الاعتذار وتقديم الأعذار): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Give me discount.",
          "Sorry I'm late. / Sorry for being late.",
          "Sorry for I am late."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Sorry I'm late. / Sorry for being late. — for + ing، أو جملة كاملة بدون for.",
        "fromLessonId": "sc_221_m"
      },
      {
        "questionAr": "ما معنى \"slot\"؟",
        "questionEn": "What does \"slot\" mean?",
        "options": [
          "فترة متاحة",
          "يعيد الجدولة",
          "يؤجل",
          "جدول الأعمال"
        ],
        "correctIndex": 0,
        "explanationAr": "\"slot\" /slɑːt/ تعني: فترة متاحة. مثال: a free slot at 3",
        "fromLessonId": "sc_224"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (إذا شملت الصيانة، أدفع كاش اليوم.)",
          "questionEn": "Complete: If you include the service, ____ cash today.",
          "options": [
            "I'll pay",
            "I will paying",
            "I pay"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: I'll pay. Is there any flexibility on the price? / Would you accept...? / If you..., I'll... / That's my final offer. استخدم الشرط الأول للمساومة."
        },
        {
          "questionAr": "أكمل الفراغ: (هذا أكثر شوي من اللي توقعته.)",
          "questionEn": "Complete: That's a bit more than I ____.",
          "options": [
            "expect",
            "expected",
            "waited"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: expected. Is there any flexibility on the price? / Would you accept...? / If you..., I'll... / That's my final offer. استخدم الشرط الأول للمساومة."
        },
        {
          "questionAr": "ما معنى \"accept\"؟",
          "questionEn": "What does \"accept\" mean?",
          "options": [
            "عرض",
            "الممشى",
            "يفاوض",
            "يقبل"
          ],
          "correctIndex": 3,
          "explanationAr": "\"accept\" /əkˈsɛpt/ تعني: يقبل. مثال: I accept."
        },
        {
          "questionAr": "ما معنى \"halfway\"؟",
          "questionEn": "What does \"halfway\" mean?",
          "options": [
            "حالة",
            "في النص",
            "يفاوض",
            "صفقة/اتفاق"
          ],
          "correctIndex": 1,
          "explanationAr": "\"halfway\" /ˌhæfˈweɪ/ تعني: في النص. مثال: meet halfway"
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "What's your best price?",
            "Last price?",
            "What's your price best?"
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: What's your best price? — «آخر سعر؟» بالإنجليزي: best price."
        }
      ]
    }
  },
  {
    "id": "sc_227",
    "pillarId": "conversation",
    "pillarNameAr": "المحادثة والطلاقة التفاعلية",
    "pillarNameEn": "Active Conversation & Fluency Drills",
    "pillarIcon": "💬",
    "level": "متقدم (Advanced)",
    "levelCode": "B1-B2",
    "titleAr": "الاعتراض الدبلوماسي في الاجتماعات",
    "titleEn": "Diplomatic Disagreement in Meetings",
    "descAr": "اعترض على فكرة في اجتماع بدون ما تجرح أحد، باستخدام التلطيف والأسئلة.",
    "descEn": "Disagree in meetings without offending, using softeners and questions.",
    "speakingGoalAr": "اعترض على مقترح سارة مرتين بلغة دبلوماسية.",
    "speakingGoalEn": "Challenge Sara's proposal twice using diplomatic language.",
    "keyPattern": {
      "ruleAr": "لطّف بـ: I'm not sure that... / I wonder if... / Have we considered...? / That's a fair point, however... واستخدم would و might لتخفيف الحدة.",
      "ruleEn": "Soften with I'm not sure, I wonder if, Have we considered, would/might.",
      "formula": "That's a fair point; however, ... | I wonder if we might ... | Have we considered ...?"
    },
    "practicalExamples": [
      {
        "en": "That's a fair point; however, the budget is limited.",
        "ar": "نقطة منطقية، لكن الميزانية محدودة."
      },
      {
        "en": "I wonder if we might delay the launch.",
        "ar": "أتساءل إذا ممكن نأجل الإطلاق."
      },
      {
        "en": "Have we considered the risks?",
        "ar": "هل فكرنا في المخاطر؟"
      },
      {
        "en": "I'm not sure that's the best approach.",
        "ar": "مو متأكد إن هذا أفضل أسلوب."
      },
      {
        "en": "Could we look at it from the customer's side?",
        "ar": "ممكن نشوفها من جهة العميل؟"
      },
      {
        "en": "I'd suggest a smaller pilot first.",
        "ar": "أقترح تجربة مصغرة أول."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "This idea is wrong.",
        "correct": "I'm not sure this is the best option.",
        "whyAr": "التخفيف مهم في بيئة العمل."
      },
      {
        "incorrect": "I disagree with you completely.",
        "correct": "I see it slightly differently.",
        "whyAr": "تخفيف حدة."
      },
      {
        "incorrect": "But however, ...",
        "correct": "However, ...",
        "whyAr": "لا نجمع but و however."
      }
    ],
    "speakingChallenge": {
      "promptAr": "مديرتك سارة تبي تلغي الدوام عن بعد. اعترض بدبلوماسية.",
      "promptEn": "Your manager Sara wants to cancel remote work. Disagree diplomatically.",
      "saraQuestionAr": "I think everyone should be in the office five days a week.",
      "saraQuestionEn": "I think everyone should be in the office five days a week.",
      "recommendedResponseEn": "That's a fair point about teamwork; however, I wonder if we might lose some productivity. Have we considered a hybrid model? I'd suggest three office days as a pilot."
    },
    "quiz": [
      {
        "questionAr": "أكثر عبارة دبلوماسية:",
        "questionEn": "Most diplomatic:",
        "options": [
          "That won't work.",
          "I wonder if we might try another way.",
          "No."
        ],
        "correctIndex": 1,
        "explanationAr": "I wonder if..."
      },
      {
        "questionAr": "أكمل: That's a fair point; ___, it's expensive.",
        "questionEn": "Complete: That's a fair point; ___, it's expensive.",
        "options": [
          "but however",
          "however",
          "so"
        ],
        "correctIndex": 1,
        "explanationAr": "however."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'm not sure this is the best option.",
          "This idea is wrong.",
          "I'm not sure this are the best option."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I'm not sure this is the best option. — التخفيف مهم في بيئة العمل."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I disagree with you completely.",
          "I see it slightly differently.",
          "I see it differently slightly."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I see it slightly differently. — تخفيف حدة."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "But however, ...",
          "However, ...",
          "This idea is wrong."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: However, ... — لا نجمع but و however."
      }
    ],
    "whiteboardNotes": {
      "title": "Diplomatic Disagreement in Meetings",
      "pointsAr": [
        "يستخدم المخففات اللغوية.",
        "يحول الاعتراض لسؤال.",
        "يقترح بديلاً بنّاءً.",
        "لطّف بـ: I'm not sure that... / I wonder if... / Have we considered...? / That's a fair point, however... واستخدم would و might لتخفيف الحدة."
      ],
      "pointsEn": [
        "Use softening language.",
        "Turn objections into questions.",
        "Offer a constructive alternative.",
        "Soften with I'm not sure, I wonder if, Have we considered, would/might."
      ],
      "chalkHighlight": "That's a fair point; however, ... | I wonder if we might ... | Have we considered ...?"
    },
    "unit": 6,
    "cefr": "B2",
    "objectivesAr": [
      "يستخدم المخففات اللغوية.",
      "يحول الاعتراض لسؤال.",
      "يقترح بديلاً بنّاءً."
    ],
    "objectivesEn": [
      "Use softening language.",
      "Turn objections into questions.",
      "Offer a constructive alternative."
    ],
    "vocabulary": [
      {
        "word": "however",
        "ipa": "/haʊˈɛvər/",
        "ar": "ومع ذلك",
        "exampleEn": "However, there's a risk.",
        "exampleAr": "ومع ذلك فيه خطر."
      },
      {
        "word": "consider",
        "ipa": "/kənˈsɪdər/",
        "ar": "يأخذ بعين الاعتبار",
        "exampleEn": "Have we considered cost?",
        "exampleAr": "فكرنا في التكلفة؟"
      },
      {
        "word": "approach",
        "ipa": "/əˈproʊtʃ/",
        "ar": "أسلوب/نهج",
        "exampleEn": "a different approach",
        "exampleAr": "أسلوب مختلف"
      },
      {
        "word": "concern",
        "ipa": "/kənˈsɜːrn/",
        "ar": "قلق/ملاحظة",
        "exampleEn": "My main concern is time.",
        "exampleAr": "ملاحظتي الأساسية الوقت."
      },
      {
        "word": "pilot",
        "ipa": "/ˈpaɪlət/",
        "ar": "تجربة أولية",
        "exampleEn": "a pilot project",
        "exampleAr": "مشروع تجريبي"
      },
      {
        "word": "risk",
        "ipa": "/rɪsk/",
        "ar": "مخاطرة",
        "exampleEn": "a big risk",
        "exampleAr": "مخاطرة كبيرة"
      },
      {
        "word": "fair point",
        "ipa": "/fɛr pɔɪnt/",
        "ar": "نقطة منطقية",
        "exampleEn": "That's a fair point.",
        "exampleAr": "نقطة منطقية."
      },
      {
        "word": "alternative",
        "ipa": "/ɔːlˈtɜːrnətɪv/",
        "ar": "بديل",
        "exampleEn": "Is there an alternative?",
        "exampleAr": "فيه بديل؟"
      },
      {
        "word": "stakeholder",
        "ipa": "/ˈsteɪkhoʊldər/",
        "ar": "صاحب مصلحة",
        "exampleEn": "all stakeholders",
        "exampleAr": "كل الأطراف"
      },
      {
        "word": "feasible",
        "ipa": "/ˈfiːzəbəl/",
        "ar": "قابل للتنفيذ",
        "exampleEn": "Is it feasible?",
        "exampleAr": "قابل للتنفيذ؟"
      }
    ],
    "grammarFocus": {
      "ruleAr": "لطّف بـ: I'm not sure that... / I wonder if... / Have we considered...? / That's a fair point, however... واستخدم would و might لتخفيف الحدة.",
      "ruleEn": "Soften with I'm not sure, I wonder if, Have we considered, would/might.",
      "formula": "That's a fair point; however, ... | I wonder if we might ... | Have we considered ...?",
      "examples": [
        {
          "en": "That's a fair point; however, the budget is limited.",
          "ar": "نقطة منطقية، لكن الميزانية محدودة."
        },
        {
          "en": "I wonder if we might delay the launch.",
          "ar": "أتساءل إذا ممكن نأجل الإطلاق."
        },
        {
          "en": "Have we considered the risks?",
          "ar": "هل فكرنا في المخاطر؟"
        },
        {
          "en": "I'm not sure that's the best approach.",
          "ar": "مو متأكد إن هذا أفضل أسلوب."
        },
        {
          "en": "Could we look at it from the customer's side?",
          "ar": "ممكن نشوفها من جهة العميل؟"
        },
        {
          "en": "I'd suggest a smaller pilot first.",
          "ar": "أقترح تجربة مصغرة أول."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "I propose we launch the app in all GCC countries next month.",
        "ar": "أقترح نطلق التطبيق في كل دول الخليج الشهر الجاي."
      },
      {
        "speaker": "Student",
        "en": "That's ambitious. I wonder if one month is enough for testing?",
        "ar": "طموح. أتساءل إذا شهر يكفي للاختبار؟"
      },
      {
        "speaker": "Sara",
        "en": "The team is ready.",
        "ar": "الفريق جاهز."
      },
      {
        "speaker": "Student",
        "en": "That's a fair point; however, have we considered the Arabic localization?",
        "ar": "نقطة منطقية، لكن هل فكرنا في التعريب؟"
      },
      {
        "speaker": "Sara",
        "en": "Hmm, not fully.",
        "ar": "همم، مو بالكامل."
      },
      {
        "speaker": "Student",
        "en": "I'd suggest a pilot in Saudi first, then the rest of the GCC.",
        "ar": "أقترح تجربة في السعودية أول، بعدين باقي الخليج."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: I propose we launch the app in all GCC countries next month.\nStudent: That's ambitious. I wonder if one month is enough for testing?\nSara: The team is ready.\nStudent: That's a fair point; however, have we considered the Arabic localization?\nSara: Hmm, not fully.\nStudent: I'd suggest a pilot in Saudi first, then the rest of the GCC.",
      "questions": [
        {
          "questionAr": "اقتراح سارة؟",
          "questionEn": "What does Sara propose?",
          "options": [
            "launch in Saudi only",
            "launch in all GCC next month",
            "delay one year"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: launch in all GCC next month"
        },
        {
          "questionAr": "وش ما انحسب حسابه؟",
          "questionEn": "What hasn't been fully considered?",
          "options": [
            "pricing",
            "Arabic localization",
            "marketing"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: Arabic localization"
        },
        {
          "questionAr": "اقتراح الطالب؟",
          "questionEn": "What does the student suggest?",
          "options": [
            "cancel",
            "a pilot in Saudi first",
            "hire more staff"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: a pilot in Saudi first"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Softening intonation: fall-rise ↘↗ on 'however'",
      "items": [
        "That's a FAIR point ↘↗",
        "however /haʊˈɛvər/",
        "feasible /ˈfiːzəbəl/"
      ],
      "tipAr": "النبرة الهابطة-الصاعدة تبين إنك تحترم الفكرة مع تحفظ."
    },
    "exercises": {
      "easy": [
        {
          "id": "sc_227_e1",
          "type": "meaning",
          "promptEn": "What does \"however\" mean?",
          "promptAr": "ما معنى \"however\"؟",
          "options": [
            "يأخذ بعين الاعتبار",
            "صاحب مصلحة",
            "قلق/ملاحظة",
            "ومع ذلك"
          ],
          "correctIndex": 3,
          "answer": "ومع ذلك",
          "explanationAr": "\"however\" /haʊˈɛvər/ تعني: ومع ذلك. مثال: However, there's a risk."
        },
        {
          "id": "sc_227_e2",
          "type": "meaning",
          "promptEn": "What does \"consider\" mean?",
          "promptAr": "ما معنى \"consider\"؟",
          "options": [
            "يأخذ بعين الاعتبار",
            "بديل",
            "قابل للتنفيذ",
            "صاحب مصلحة"
          ],
          "correctIndex": 0,
          "answer": "يأخذ بعين الاعتبار",
          "explanationAr": "\"consider\" /kənˈsɪdər/ تعني: يأخذ بعين الاعتبار. مثال: Have we considered cost?"
        },
        {
          "id": "sc_227_e3",
          "type": "meaning",
          "promptEn": "What does \"approach\" mean?",
          "promptAr": "ما معنى \"approach\"؟",
          "options": [
            "نقطة منطقية",
            "تجربة أولية",
            "أسلوب/نهج",
            "مخاطرة"
          ],
          "correctIndex": 2,
          "answer": "أسلوب/نهج",
          "explanationAr": "\"approach\" /əˈproʊtʃ/ تعني: أسلوب/نهج. مثال: a different approach"
        },
        {
          "id": "sc_227_e4",
          "type": "meaning",
          "promptEn": "What does \"concern\" mean?",
          "promptAr": "ما معنى \"concern\"؟",
          "options": [
            "يأخذ بعين الاعتبار",
            "بديل",
            "قلق/ملاحظة",
            "صاحب مصلحة"
          ],
          "correctIndex": 2,
          "answer": "قلق/ملاحظة",
          "explanationAr": "\"concern\" /kənˈsɜːrn/ تعني: قلق/ملاحظة. مثال: My main concern is time."
        }
      ],
      "medium": [
        {
          "id": "sc_227_m1",
          "type": "gap",
          "promptEn": "Complete: That's a fair point; ____, the budget is limited.",
          "promptAr": "أكمل الفراغ: (نقطة منطقية، لكن الميزانية محدودة.)",
          "options": [
            "however",
            "although",
            "but however"
          ],
          "correctIndex": 0,
          "answer": "That's a fair point; however, the budget is limited.",
          "explanationAr": "الإجابة: however. لطّف بـ: I'm not sure that... / I wonder if... / Have we considered...? / That's a fair point, however... واستخدم would و might لتخفيف الحدة."
        },
        {
          "id": "sc_227_m2",
          "type": "gap",
          "promptEn": "Complete: ____ we might delay the launch.",
          "promptAr": "أكمل الفراغ: (أتساءل إذا ممكن نأجل الإطلاق.)",
          "options": [
            "I wonder if",
            "I ask if",
            "I wonder that"
          ],
          "correctIndex": 0,
          "answer": "I wonder if we might delay the launch.",
          "explanationAr": "الإجابة: I wonder if. لطّف بـ: I'm not sure that... / I wonder if... / Have we considered...? / That's a fair point, however... واستخدم would و might لتخفيف الحدة."
        },
        {
          "id": "sc_227_m3",
          "type": "gap",
          "promptEn": "Complete: Have we ____ the risks?",
          "promptAr": "أكمل الفراغ: (هل فكرنا في المخاطر؟)",
          "options": [
            "considered",
            "thought in",
            "consider"
          ],
          "correctIndex": 0,
          "answer": "Have we considered the risks?",
          "explanationAr": "الإجابة: considered. لطّف بـ: I'm not sure that... / I wonder if... / Have we considered...? / That's a fair point, however... واستخدم would و might لتخفيف الحدة."
        },
        {
          "id": "sc_227_m4",
          "type": "gap",
          "promptEn": "Complete: ____ that's the best approach.",
          "promptAr": "أكمل الفراغ: (مو متأكد إن هذا أفضل أسلوب.)",
          "options": [
            "I'm sure not",
            "No sure",
            "I'm not sure"
          ],
          "correctIndex": 2,
          "answer": "I'm not sure that's the best approach.",
          "explanationAr": "الإجابة: I'm not sure. لطّف بـ: I'm not sure that... / I wonder if... / Have we considered...? / That's a fair point, however... واستخدم would و might لتخفيف الحدة."
        }
      ],
      "hard": [
        {
          "id": "sc_227_h1",
          "type": "order",
          "promptEn": "Put the words in order: Could / customer's / it / at / from / the / side? / we / look",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (ممكن نشوفها من جهة العميل؟)",
          "answer": "Could we look at it from the customer's side?",
          "explanationAr": "الترتيب الصحيح: Could we look at it from the customer's side?"
        },
        {
          "id": "sc_227_h2",
          "type": "order",
          "promptEn": "Put the words in order: smaller / I'd / first. / pilot / suggest / a",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (أقترح تجربة مصغرة أول.)",
          "answer": "I'd suggest a smaller pilot first.",
          "explanationAr": "الترتيب الصحيح: I'd suggest a smaller pilot first."
        },
        {
          "id": "sc_227_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أتساءل إذا ممكن نأجل الإطلاق.",
          "answer": "I wonder if we might delay the launch.",
          "explanationAr": "ترجمة مقترحة: I wonder if we might delay the launch."
        },
        {
          "id": "sc_227_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: مو متأكد إن هذا أفضل أسلوب.",
          "answer": "I'm not sure that's the best approach.",
          "explanationAr": "ترجمة مقترحة: I'm not sure that's the best approach."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "With all respect, you are wrong.",
        "correct": "With respect, I see it a little differently.",
        "whyAr": "With all respect + you're wrong تبدو هجومية."
      },
      {
        "incorrect": "I have a small comment, the plan is bad.",
        "correct": "I have a small concern about the timeline.",
        "whyAr": "حدد الملاحظة بدل الحكم."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (التفاوض على السعر والإقناع): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Would you accept 40,000?",
          "This idea is wrong.",
          "Would you except 40,000?"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Would you accept 40,000? — accept = يقبل، except = باستثناء.",
        "fromLessonId": "sc_226"
      },
      {
        "questionAr": "مراجعة (ترتيب المواعيد والاجتماعات في العمل): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Does Tuesday work for you?",
          "Does Tuesday work you for?",
          "Is it suitable for you Tuesday?"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Does Tuesday work for you? — صيغة طبيعية مهنية.",
        "fromLessonId": "sc_224"
      },
      {
        "questionAr": "مراجعة (إبداء الرأي والموافقة والاعتراض): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I agree with you.",
          "I agree you with.",
          "I am agree with you."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I agree with you. — agree فعل؛ ما نحط am.",
        "fromLessonId": "sc_203"
      },
      {
        "questionAr": "ما معنى \"what a shame\"؟",
        "questionEn": "What does \"what a shame\" mean?",
        "options": [
          "جد؟",
          "يا خسارة",
          "آسف أسمع",
          "مبروك"
        ],
        "correctIndex": 1,
        "explanationAr": "\"what a shame\" /wʌt ə ʃeɪm/ تعني: يا خسارة. مثال: What a shame!",
        "fromLessonId": "sc_225"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (هل فكرنا في المخاطر؟)",
          "questionEn": "Complete: Have we ____ the risks?",
          "options": [
            "considered",
            "thought in",
            "consider"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: considered. لطّف بـ: I'm not sure that... / I wonder if... / Have we considered...? / That's a fair point, however... واستخدم would و might لتخفيف الحدة."
        },
        {
          "questionAr": "أكمل الفراغ: (مو متأكد إن هذا أفضل أسلوب.)",
          "questionEn": "Complete: ____ that's the best approach.",
          "options": [
            "I'm sure not",
            "No sure",
            "I'm not sure"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: I'm not sure. لطّف بـ: I'm not sure that... / I wonder if... / Have we considered...? / That's a fair point, however... واستخدم would و might لتخفيف الحدة."
        },
        {
          "questionAr": "ما معنى \"pilot\"؟",
          "questionEn": "What does \"pilot\" mean?",
          "options": [
            "تجربة أولية",
            "أسلوب/نهج",
            "ومع ذلك",
            "نقطة منطقية"
          ],
          "correctIndex": 0,
          "explanationAr": "\"pilot\" /ˈpaɪlət/ تعني: تجربة أولية. مثال: a pilot project"
        },
        {
          "questionAr": "ما معنى \"risk\"؟",
          "questionEn": "What does \"risk\" mean?",
          "options": [
            "تجربة أولية",
            "مخاطرة",
            "يأخذ بعين الاعتبار",
            "أسلوب/نهج"
          ],
          "correctIndex": 1,
          "explanationAr": "\"risk\" /rɪsk/ تعني: مخاطرة. مثال: a big risk"
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "With all respect, you are wrong.",
            "With respect, I see it an little differently.",
            "With respect, I see it a little differently."
          ],
          "correctIndex": 2,
          "explanationAr": "الصحيح: With respect, I see it a little differently. — With all respect + you're wrong تبدو هجومية."
        }
      ]
    }
  },
  {
    "id": "sc_228",
    "pillarId": "conversation",
    "pillarNameAr": "المحادثة والطلاقة التفاعلية",
    "pillarNameEn": "Active Conversation & Fluency Drills",
    "pillarIcon": "💬",
    "level": "متقدم (Advanced)",
    "levelCode": "B1-B2",
    "titleAr": "عرض فكرة أو مشروع",
    "titleEn": "Presenting an Idea",
    "descAr": "قدم فكرة بهيكل واضح: افتتاح، مشكلة، حل، فوائد، دعوة للعمل.",
    "descEn": "Pitch an idea with a clear structure: hook, problem, solution, benefits, call to action.",
    "speakingGoalAr": "قدّم لسارة فكرة مشروع في دقيقتين.",
    "speakingGoalEn": "Pitch a project idea to Sara in two minutes.",
    "keyPattern": {
      "ruleAr": "عبارات الانتقال: Today I'd like to talk about... / The problem is... / What we propose is... / This means that... / To sum up...",
      "ruleEn": "Use signposting: Today I'd like to..., The problem is..., What we propose is..., To sum up...",
      "formula": "Hook → The problem is ... → What we propose is ... → This means ... → To sum up ..."
    },
    "practicalExamples": [
      {
        "en": "Today I'd like to talk about our new delivery app.",
        "ar": "اليوم ودي أتكلم عن تطبيق التوصيل الجديد."
      },
      {
        "en": "The problem is that delivery fees are too high.",
        "ar": "المشكلة إن رسوم التوصيل عالية مرة."
      },
      {
        "en": "What we propose is a monthly subscription.",
        "ar": "اللي نقترحه اشتراك شهري."
      },
      {
        "en": "This means customers save up to 30%.",
        "ar": "هذا يعني إن العملاء يوفرون لين ٣٠٪."
      },
      {
        "en": "To sum up, it's cheaper, faster and greener.",
        "ar": "باختصار: أرخص وأسرع وأصدق للبيئة."
      },
      {
        "en": "Are there any questions?",
        "ar": "فيه أسئلة؟"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "I will talk you about...",
        "correct": "I'd like to talk to you about...",
        "whyAr": "talk to someone about something."
      },
      {
        "incorrect": "In conclusion, finally, to sum up...",
        "correct": "To sum up, ...",
        "whyAr": "عبارة ختام واحدة تكفي."
      },
      {
        "incorrect": "Our app is the best in the world.",
        "correct": "Our app cuts delivery costs by 30%.",
        "whyAr": "الأرقام تقنع أكثر من المبالغة."
      }
    ],
    "speakingChallenge": {
      "promptAr": "قدم لسارة فكرة تحسن مدرستك أو شركتك.",
      "promptEn": "Pitch Sara an idea to improve your school or company.",
      "saraQuestionAr": "You have two minutes. Convince me!",
      "saraQuestionEn": "You have two minutes. Convince me!",
      "recommendedResponseEn": "Today I'd like to talk about a peer tutoring program. The problem is that many students struggle with math. What we propose is weekly sessions with top students. This means better grades at zero cost. To sum up, let's start a pilot next term."
    },
    "quiz": [
      {
        "questionAr": "افتتاح عرض جيد:",
        "questionEn": "Good presentation opener:",
        "options": [
          "Hello. Idea.",
          "Today I'd like to talk about...",
          "I will speak now."
        ],
        "correctIndex": 1,
        "explanationAr": "signposting."
      },
      {
        "questionAr": "عبارة الختام:",
        "questionEn": "Closing phrase:",
        "options": [
          "To sum up, ...",
          "Firstly, ...",
          "By the way, ..."
        ],
        "correctIndex": 0,
        "explanationAr": "To sum up."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'd like to talk to you about...",
          "I will talk you about...",
          "I'd like to talk to about you..."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I'd like to talk to you about... — talk to someone about something."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "In conclusion, finally, to sum up...",
          "To sum up, ...",
          "I will talk you about..."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: To sum up, ... — عبارة ختام واحدة تكفي."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Our app cuts delivery costs by 30%.",
          "I will talk you about...",
          "Our app is the best in the world."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Our app cuts delivery costs by 30%. — الأرقام تقنع أكثر من المبالغة."
      }
    ],
    "whiteboardNotes": {
      "title": "Presenting an Idea",
      "pointsAr": [
        "يرتب العرض بهيكل.",
        "يستخدم عبارات الانتقال.",
        "يختم بدعوة للعمل.",
        "عبارات الانتقال: Today I'd like to talk about... / The problem is... / What we propose is... / This means that... / To sum up..."
      ],
      "pointsEn": [
        "Structure a presentation.",
        "Use signposting language.",
        "End with a call to action.",
        "Use signposting: Today I'd like to..., The problem is..., What we propose is..., To sum up..."
      ],
      "chalkHighlight": "Hook → The problem is ... → What we propose is ... → This means ... → To sum up ..."
    },
    "unit": 6,
    "cefr": "B2",
    "objectivesAr": [
      "يرتب العرض بهيكل.",
      "يستخدم عبارات الانتقال.",
      "يختم بدعوة للعمل."
    ],
    "objectivesEn": [
      "Structure a presentation.",
      "Use signposting language.",
      "End with a call to action."
    ],
    "vocabulary": [
      {
        "word": "propose",
        "ipa": "/prəˈpoʊz/",
        "ar": "يقترح",
        "exampleEn": "We propose a solution.",
        "exampleAr": "نقترح حل."
      },
      {
        "word": "solution",
        "ipa": "/səˈluːʃən/",
        "ar": "حل",
        "exampleEn": "a simple solution",
        "exampleAr": "حل بسيط"
      },
      {
        "word": "benefit",
        "ipa": "/ˈbɛnɪfɪt/",
        "ar": "فائدة",
        "exampleEn": "The main benefit is speed.",
        "exampleAr": "الفائدة الأساسية السرعة."
      },
      {
        "word": "subscription",
        "ipa": "/səbˈskrɪpʃən/",
        "ar": "اشتراك",
        "exampleEn": "a monthly subscription",
        "exampleAr": "اشتراك شهري"
      },
      {
        "word": "target audience",
        "ipa": "/ˈtɑːrɡɪt ˈɔːdiəns/",
        "ar": "الجمهور المستهدف",
        "exampleEn": "Our target audience is students.",
        "exampleAr": "جمهورنا الطلاب."
      },
      {
        "word": "to sum up",
        "ipa": "/tə sʌm ʌp/",
        "ar": "باختصار",
        "exampleEn": "To sum up...",
        "exampleAr": "باختصار..."
      },
      {
        "word": "investment",
        "ipa": "/ɪnˈvɛstmənt/",
        "ar": "استثمار",
        "exampleEn": "We need a small investment.",
        "exampleAr": "نحتاج استثمار بسيط."
      },
      {
        "word": "growth",
        "ipa": "/ɡroʊθ/",
        "ar": "نمو",
        "exampleEn": "fast growth",
        "exampleAr": "نمو سريع"
      },
      {
        "word": "slide",
        "ipa": "/slaɪd/",
        "ar": "شريحة عرض",
        "exampleEn": "On this slide...",
        "exampleAr": "في هالشريحة..."
      },
      {
        "word": "call to action",
        "ipa": "/kɔːl tə ˈækʃən/",
        "ar": "دعوة للعمل",
        "exampleEn": "End with a call to action.",
        "exampleAr": "اختم بدعوة للعمل."
      }
    ],
    "grammarFocus": {
      "ruleAr": "عبارات الانتقال: Today I'd like to talk about... / The problem is... / What we propose is... / This means that... / To sum up...",
      "ruleEn": "Use signposting: Today I'd like to..., The problem is..., What we propose is..., To sum up...",
      "formula": "Hook → The problem is ... → What we propose is ... → This means ... → To sum up ...",
      "examples": [
        {
          "en": "Today I'd like to talk about our new delivery app.",
          "ar": "اليوم ودي أتكلم عن تطبيق التوصيل الجديد."
        },
        {
          "en": "The problem is that delivery fees are too high.",
          "ar": "المشكلة إن رسوم التوصيل عالية مرة."
        },
        {
          "en": "What we propose is a monthly subscription.",
          "ar": "اللي نقترحه اشتراك شهري."
        },
        {
          "en": "This means customers save up to 30%.",
          "ar": "هذا يعني إن العملاء يوفرون لين ٣٠٪."
        },
        {
          "en": "To sum up, it's cheaper, faster and greener.",
          "ar": "باختصار: أرخص وأسرع وأصدق للبيئة."
        },
        {
          "en": "Are there any questions?",
          "ar": "فيه أسئلة؟"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Student",
        "en": "Good morning. Today I'd like to talk about a smart parking app for Riyadh.",
        "ar": "صباح الخير. اليوم ودي أتكلم عن تطبيق مواقف ذكية للرياض."
      },
      {
        "speaker": "Sara",
        "en": "Go ahead.",
        "ar": "تفضل."
      },
      {
        "speaker": "Student",
        "en": "The problem is that drivers waste twenty minutes a day looking for parking.",
        "ar": "المشكلة إن السواقين يضيعون ٢٠ دقيقة يومياً يدورون موقف."
      },
      {
        "speaker": "Sara",
        "en": "That's a lot. What's your solution?",
        "ar": "كثير. وش الحل؟"
      },
      {
        "speaker": "Student",
        "en": "What we propose is an app that shows free spaces in real time. This means less traffic and less stress.",
        "ar": "نقترح تطبيق يوري المواقف الفاضية لحظياً. يعني زحمة وتوتر أقل."
      },
      {
        "speaker": "Student",
        "en": "To sum up, we're looking for partners to start a pilot in Olaya.",
        "ar": "باختصار، ندور شركاء نبدأ تجربة في العليا."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Student: Good morning. Today I'd like to talk about a smart parking app for Riyadh.\nSara: Go ahead.\nStudent: The problem is that drivers waste twenty minutes a day looking for parking.\nSara: That's a lot. What's your solution?\nStudent: What we propose is an app that shows free spaces in real time. This means less traffic and less stress.\nStudent: To sum up, we're looking for partners to start a pilot in Olaya.",
      "questions": [
        {
          "questionAr": "التطبيق لأي شي؟",
          "questionEn": "What is the app for?",
          "options": [
            "food delivery",
            "smart parking",
            "taxis"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: smart parking"
        },
        {
          "questionAr": "كم يضيعون؟",
          "questionEn": "How much time do drivers waste?",
          "options": [
            "10 minutes",
            "20 minutes",
            "an hour"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: 20 minutes"
        },
        {
          "questionAr": "وين التجربة؟",
          "questionEn": "Where is the pilot?",
          "options": [
            "Olaya",
            "Jeddah",
            "Dammam"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: Olaya"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Chunking and pausing: speak in thought groups /",
      "items": [
        "The problem is / that drivers waste time.",
        "What we propose is / a simple app.",
        "solution /səˈluːʃən/"
      ],
      "tipAr": "قسم كلامك لمجموعات قصيرة مع وقفة؛ يخلي العرض واضح وواثق."
    },
    "exercises": {
      "easy": [
        {
          "id": "sc_228_e1",
          "type": "meaning",
          "promptEn": "What does \"propose\" mean?",
          "promptAr": "ما معنى \"propose\"؟",
          "options": [
            "اشتراك",
            "باختصار",
            "يقترح",
            "حل"
          ],
          "correctIndex": 2,
          "answer": "يقترح",
          "explanationAr": "\"propose\" /prəˈpoʊz/ تعني: يقترح. مثال: We propose a solution."
        },
        {
          "id": "sc_228_e2",
          "type": "meaning",
          "promptEn": "What does \"solution\" mean?",
          "promptAr": "ما معنى \"solution\"؟",
          "options": [
            "نمو",
            "الجمهور المستهدف",
            "حل",
            "فائدة"
          ],
          "correctIndex": 2,
          "answer": "حل",
          "explanationAr": "\"solution\" /səˈluːʃən/ تعني: حل. مثال: a simple solution"
        },
        {
          "id": "sc_228_e3",
          "type": "meaning",
          "promptEn": "What does \"benefit\" mean?",
          "promptAr": "ما معنى \"benefit\"؟",
          "options": [
            "الجمهور المستهدف",
            "اشتراك",
            "فائدة",
            "يقترح"
          ],
          "correctIndex": 2,
          "answer": "فائدة",
          "explanationAr": "\"benefit\" /ˈbɛnɪfɪt/ تعني: فائدة. مثال: The main benefit is speed."
        },
        {
          "id": "sc_228_e4",
          "type": "meaning",
          "promptEn": "What does \"subscription\" mean?",
          "promptAr": "ما معنى \"subscription\"؟",
          "options": [
            "فائدة",
            "اشتراك",
            "حل",
            "دعوة للعمل"
          ],
          "correctIndex": 1,
          "answer": "اشتراك",
          "explanationAr": "\"subscription\" /səbˈskrɪpʃən/ تعني: اشتراك. مثال: a monthly subscription"
        }
      ],
      "medium": [
        {
          "id": "sc_228_m1",
          "type": "gap",
          "promptEn": "Complete: Today ____ our new delivery app.",
          "promptAr": "أكمل الفراغ: (اليوم ودي أتكلم عن تطبيق التوصيل الجديد.)",
          "options": [
            "I'd like to talk about",
            "I'd like talking",
            "I want talk about"
          ],
          "correctIndex": 0,
          "answer": "Today I'd like to talk about our new delivery app.",
          "explanationAr": "الإجابة: I'd like to talk about. عبارات الانتقال: Today I'd like to talk about... / The problem is... / What we propose is... / This means that... / To sum up..."
        },
        {
          "id": "sc_228_m2",
          "type": "gap",
          "promptEn": "Complete: ____ that delivery fees are too high.",
          "promptAr": "أكمل الفراغ: (المشكلة إن رسوم التوصيل عالية مرة.)",
          "options": [
            "The problem it is",
            "Problem is that is",
            "The problem is"
          ],
          "correctIndex": 2,
          "answer": "The problem is that delivery fees are too high.",
          "explanationAr": "الإجابة: The problem is. عبارات الانتقال: Today I'd like to talk about... / The problem is... / What we propose is... / This means that... / To sum up..."
        },
        {
          "id": "sc_228_m3",
          "type": "gap",
          "promptEn": "Complete: ____ is a monthly subscription.",
          "promptAr": "أكمل الفراغ: (اللي نقترحه اشتراك شهري.)",
          "options": [
            "That we propose",
            "What we propose it",
            "What we propose"
          ],
          "correctIndex": 2,
          "answer": "What we propose is a monthly subscription.",
          "explanationAr": "الإجابة: What we propose. عبارات الانتقال: Today I'd like to talk about... / The problem is... / What we propose is... / This means that... / To sum up..."
        },
        {
          "id": "sc_228_m4",
          "type": "gap",
          "promptEn": "Complete: ____ customers save up to 30%.",
          "promptAr": "أكمل الفراغ: (هذا يعني إن العملاء يوفرون لين ٣٠٪.)",
          "options": [
            "This means",
            "This mean",
            "It meaning"
          ],
          "correctIndex": 0,
          "answer": "This means customers save up to 30%.",
          "explanationAr": "الإجابة: This means. عبارات الانتقال: Today I'd like to talk about... / The problem is... / What we propose is... / This means that... / To sum up..."
        }
      ],
      "hard": [
        {
          "id": "sc_228_h1",
          "type": "order",
          "promptEn": "Put the words in order: up, / greener. / faster / To / and / it's / sum / cheaper,",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (باختصار: أرخص وأسرع وأصدق للبيئة.)",
          "answer": "To sum up, it's cheaper, faster and greener.",
          "explanationAr": "الترتيب الصحيح: To sum up, it's cheaper, faster and greener."
        },
        {
          "id": "sc_228_h2",
          "type": "order",
          "promptEn": "Put the words in order: Are / any / questions? / there",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (فيه أسئلة؟)",
          "answer": "Are there any questions?",
          "explanationAr": "الترتيب الصحيح: Are there any questions?"
        },
        {
          "id": "sc_228_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: المشكلة إن رسوم التوصيل عالية مرة.",
          "answer": "The problem is that delivery fees are too high.",
          "explanationAr": "ترجمة مقترحة: The problem is that delivery fees are too high."
        },
        {
          "id": "sc_228_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: هذا يعني إن العملاء يوفرون لين ٣٠٪.",
          "answer": "This means customers save up to 30%.",
          "explanationAr": "ترجمة مقترحة: This means customers save up to 30%."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "I will explain you the idea.",
        "correct": "Let me explain the idea to you.",
        "whyAr": "explain something to someone."
      },
      {
        "incorrect": "Our idea is very very good.",
        "correct": "Our idea saves time and money.",
        "whyAr": "دليل بدل التكرار."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (الاعتراض الدبلوماسي في الاجتماعات): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I see it differently slightly.",
          "I see it slightly differently.",
          "I disagree with you completely."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I see it slightly differently. — تخفيف حدة.",
        "fromLessonId": "sc_227"
      },
      {
        "questionAr": "مراجعة (التفاعل مع الكلام: ردود فعل طبيعية): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I passed! — Good.",
          "That's fantastic! done Well!",
          "That's fantastic! Well done!"
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: That's fantastic! Well done! — الرد الجاف يحبط المتكلم.",
        "fromLessonId": "sc_225"
      },
      {
        "questionAr": "مراجعة (مقابلة العمل: عرّف بنفسك): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I graduated King Saud University.",
          "I graduated from King University Saud.",
          "I graduated from King Saud University."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: I graduated from King Saud University. — graduate from.",
        "fromLessonId": "sc_222"
      },
      {
        "questionAr": "ما معنى \"deal\"؟",
        "questionEn": "What does \"deal\" mean?",
        "options": [
          "حالة",
          "عرض",
          "ميزانية",
          "صفقة/اتفاق"
        ],
        "correctIndex": 3,
        "explanationAr": "\"deal\" /diːl/ تعني: صفقة/اتفاق. مثال: It's a deal!",
        "fromLessonId": "sc_226"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (اللي نقترحه اشتراك شهري.)",
          "questionEn": "Complete: ____ is a monthly subscription.",
          "options": [
            "That we propose",
            "What we propose it",
            "What we propose"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: What we propose. عبارات الانتقال: Today I'd like to talk about... / The problem is... / What we propose is... / This means that... / To sum up..."
        },
        {
          "questionAr": "أكمل الفراغ: (هذا يعني إن العملاء يوفرون لين ٣٠٪.)",
          "questionEn": "Complete: ____ customers save up to 30%.",
          "options": [
            "This means",
            "This mean",
            "It meaning"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: This means. عبارات الانتقال: Today I'd like to talk about... / The problem is... / What we propose is... / This means that... / To sum up..."
        },
        {
          "questionAr": "ما معنى \"target audience\"؟",
          "questionEn": "What does \"target audience\" mean?",
          "options": [
            "اشتراك",
            "نمو",
            "الجمهور المستهدف",
            "فائدة"
          ],
          "correctIndex": 2,
          "explanationAr": "\"target audience\" /ˈtɑːrɡɪt ˈɔːdiəns/ تعني: الجمهور المستهدف. مثال: Our target audience is students."
        },
        {
          "questionAr": "ما معنى \"to sum up\"؟",
          "questionEn": "What does \"to sum up\" mean?",
          "options": [
            "باختصار",
            "فائدة",
            "حل",
            "يقترح"
          ],
          "correctIndex": 0,
          "explanationAr": "\"to sum up\" /tə sʌm ʌp/ تعني: باختصار. مثال: To sum up..."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "I will explain you the idea.",
            "Let me explain the idea to you.",
            "Let me explain the idea you to."
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: Let me explain the idea to you. — explain something to someone."
        }
      ]
    }
  },
  {
    "id": "sc_229",
    "pillarId": "conversation",
    "pillarNameAr": "المحادثة والطلاقة التفاعلية",
    "pillarNameEn": "Active Conversation & Fluency Drills",
    "pillarIcon": "💬",
    "level": "متقدم (Advanced)",
    "levelCode": "B1-B2",
    "titleAr": "مناقشة الإيجابيات والسلبيات",
    "titleEn": "Discussing Pros and Cons",
    "descAr": "وازن بين الإيجابيات والسلبيات بأدوات ربط متقدمة ووصل لاستنتاج.",
    "descEn": "Weigh pros and cons with advanced linkers and reach a conclusion.",
    "speakingGoalAr": "ناقش مع سارة إيجابيات وسلبيات قرار كبير.",
    "speakingGoalEn": "Discuss the pros and cons of a big decision with Sara.",
    "keyPattern": {
      "ruleAr": "أدوات: On the one hand... on the other hand / Although... / Whereas... / Not only... but also... / Overall, ...",
      "ruleEn": "Use On the one hand/on the other hand, although, whereas, not only...but also, overall.",
      "formula": "On the one hand, ... On the other hand, ... | Although + clause, ... | Overall, ..."
    },
    "practicalExamples": [
      {
        "en": "On the one hand, studying abroad builds independence.",
        "ar": "من جهة، الدراسة برا تبني الاستقلالية."
      },
      {
        "en": "On the other hand, it can be lonely.",
        "ar": "ومن جهة ثانية، ممكن تكون وحدة."
      },
      {
        "en": "Although it's expensive, it's worth it.",
        "ar": "مع إنها غالية، تستاهل."
      },
      {
        "en": "Not only is it cheaper, but it's also faster.",
        "ar": "مو بس أرخص، بل أسرع بعد."
      },
      {
        "en": "Overall, I think the benefits outweigh the drawbacks.",
        "ar": "بشكل عام، أشوف الفوائد أكثر من العيوب."
      },
      {
        "en": "Whereas Riyadh is busy, Abha is calm.",
        "ar": "بينما الرياض مزحومة، أبها هادئة."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Although it's expensive, but it's worth it.",
        "correct": "Although it's expensive, it's worth it.",
        "whyAr": "لا نجمع although مع but."
      },
      {
        "incorrect": "In the other hand...",
        "correct": "On the other hand...",
        "whyAr": "حرف الجر on."
      },
      {
        "incorrect": "Despite it is expensive...",
        "correct": "Despite being expensive... / Although it is expensive...",
        "whyAr": "despite + اسم/ing."
      }
    ],
    "speakingChallenge": {
      "promptAr": "ناقش مع سارة: هل الجامعة ضرورية للنجاح؟",
      "promptEn": "Discuss with Sara: is university necessary for success?",
      "saraQuestionAr": "Is university really necessary these days?",
      "saraQuestionEn": "Is university really necessary these days?",
      "recommendedResponseEn": "On the one hand, university gives you knowledge and a network. On the other hand, it's expensive and some skills can be learnt online. Although degrees still matter in many jobs, overall I think it depends on the career."
    },
    "quiz": [
      {
        "questionAr": "الصحيح:",
        "questionEn": "Correct:",
        "options": [
          "Although it rained, but we went.",
          "Although it rained, we went.",
          "Despite it rained, we went."
        ],
        "correctIndex": 1,
        "explanationAr": "although بدون but."
      },
      {
        "questionAr": "«الفوائد تفوق العيوب» =",
        "questionEn": "'benefits exceed drawbacks' =",
        "options": [
          "benefits outweigh drawbacks",
          "benefits overweight drawbacks",
          "benefits more drawbacks"
        ],
        "correctIndex": 0,
        "explanationAr": "outweigh."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Although it's expensive, it's it worth.",
          "Although it's expensive, it's worth it.",
          "Although it's expensive, but it's worth it."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Although it's expensive, it's worth it. — لا نجمع although مع but."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "In the other hand...",
          "On the hand other...",
          "On the other hand..."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: On the other hand... — حرف الجر on."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Despite being expensive... / Although it is expensive...",
          "Despite it is expensive...",
          "Despite expensive being..."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Despite being expensive... / Although it is expensive... — despite + اسم/ing."
      }
    ],
    "whiteboardNotes": {
      "title": "Discussing Pros and Cons",
      "pointsAr": [
        "يوازن بين جهتين.",
        "يستخدم أدوات ربط متقدمة.",
        "يصل لاستنتاج مبرر.",
        "أدوات: On the one hand... on the other hand / Although... / Whereas... / Not only... but also... / Overall, ..."
      ],
      "pointsEn": [
        "Present both sides.",
        "Use advanced linkers.",
        "Reach a justified conclusion.",
        "Use On the one hand/on the other hand, although, whereas, not only...but also, overall."
      ],
      "chalkHighlight": "On the one hand, ... On the other hand, ... | Although + clause, ... | Overall, ..."
    },
    "unit": 6,
    "cefr": "B2",
    "objectivesAr": [
      "يوازن بين جهتين.",
      "يستخدم أدوات ربط متقدمة.",
      "يصل لاستنتاج مبرر."
    ],
    "objectivesEn": [
      "Present both sides.",
      "Use advanced linkers.",
      "Reach a justified conclusion."
    ],
    "vocabulary": [
      {
        "word": "advantage",
        "ipa": "/ədˈvæntɪdʒ/",
        "ar": "ميزة",
        "exampleEn": "a big advantage",
        "exampleAr": "ميزة كبيرة"
      },
      {
        "word": "disadvantage",
        "ipa": "/ˌdɪsədˈvæntɪdʒ/",
        "ar": "عيب",
        "exampleEn": "one disadvantage",
        "exampleAr": "عيب واحد"
      },
      {
        "word": "outweigh",
        "ipa": "/ˌaʊtˈweɪ/",
        "ar": "يفوق",
        "exampleEn": "The pros outweigh the cons.",
        "exampleAr": "الإيجابيات أكثر."
      },
      {
        "word": "worth it",
        "ipa": "/wɜːrθ ɪt/",
        "ar": "يستاهل",
        "exampleEn": "It's worth it.",
        "exampleAr": "يستاهل."
      },
      {
        "word": "independence",
        "ipa": "/ˌɪndɪˈpɛndəns/",
        "ar": "استقلالية",
        "exampleEn": "It builds independence.",
        "exampleAr": "يبني الاستقلالية."
      },
      {
        "word": "whereas",
        "ipa": "/wɛrˈæz/",
        "ar": "بينما",
        "exampleEn": "whereas the city is noisy",
        "exampleAr": "بينما المدينة مزعجة"
      },
      {
        "word": "overall",
        "ipa": "/ˌoʊvərˈɔːl/",
        "ar": "بشكل عام",
        "exampleEn": "Overall, it's good.",
        "exampleAr": "عموماً زين."
      },
      {
        "word": "trade-off",
        "ipa": "/ˈtreɪdɔːf/",
        "ar": "مقايضة/تنازل",
        "exampleEn": "It's a trade-off.",
        "exampleAr": "لازم تتنازل عن شي."
      },
      {
        "word": "long-term",
        "ipa": "/ˌlɔːŋˈtɜːrm/",
        "ar": "طويل المدى",
        "exampleEn": "long-term benefits",
        "exampleAr": "فوائد طويلة المدى"
      },
      {
        "word": "despite",
        "ipa": "/dɪˈspaɪt/",
        "ar": "رغم",
        "exampleEn": "despite the cost",
        "exampleAr": "رغم التكلفة"
      }
    ],
    "grammarFocus": {
      "ruleAr": "أدوات: On the one hand... on the other hand / Although... / Whereas... / Not only... but also... / Overall, ...",
      "ruleEn": "Use On the one hand/on the other hand, although, whereas, not only...but also, overall.",
      "formula": "On the one hand, ... On the other hand, ... | Although + clause, ... | Overall, ...",
      "examples": [
        {
          "en": "On the one hand, studying abroad builds independence.",
          "ar": "من جهة، الدراسة برا تبني الاستقلالية."
        },
        {
          "en": "On the other hand, it can be lonely.",
          "ar": "ومن جهة ثانية، ممكن تكون وحدة."
        },
        {
          "en": "Although it's expensive, it's worth it.",
          "ar": "مع إنها غالية، تستاهل."
        },
        {
          "en": "Not only is it cheaper, but it's also faster.",
          "ar": "مو بس أرخص، بل أسرع بعد."
        },
        {
          "en": "Overall, I think the benefits outweigh the drawbacks.",
          "ar": "بشكل عام، أشوف الفوائد أكثر من العيوب."
        },
        {
          "en": "Whereas Riyadh is busy, Abha is calm.",
          "ar": "بينما الرياض مزحومة، أبها هادئة."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Should I buy an electric car?",
        "ar": "أشتري سيارة كهربائية؟"
      },
      {
        "speaker": "Student",
        "en": "On the one hand, you'll save a lot on fuel and maintenance.",
        "ar": "من جهة، بتوفرين كثير في البنزين والصيانة."
      },
      {
        "speaker": "Sara",
        "en": "True. But charging stations?",
        "ar": "صح. بس محطات الشحن؟"
      },
      {
        "speaker": "Student",
        "en": "On the other hand, there aren't many stations outside the big cities yet.",
        "ar": "من جهة ثانية، ما فيه محطات كثيرة برا المدن الكبيرة للحين."
      },
      {
        "speaker": "Sara",
        "en": "And the price is higher.",
        "ar": "والسعر أعلى."
      },
      {
        "speaker": "Student",
        "en": "Although it costs more now, overall I think it's worth it in the long term.",
        "ar": "مع إنها أغلى الحين، عموماً أشوفها تستاهل على المدى الطويل."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Should I buy an electric car?\nStudent: On the one hand, you'll save a lot on fuel and maintenance.\nSara: True. But charging stations?\nStudent: On the other hand, there aren't many stations outside the big cities yet.\nSara: And the price is higher.\nStudent: Although it costs more now, overall I think it's worth it in the long term.",
      "questions": [
        {
          "questionAr": "أول ميزة؟",
          "questionEn": "What's the first advantage?",
          "options": [
            "speed",
            "saving on fuel and maintenance",
            "design"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: saving on fuel and maintenance"
        },
        {
          "questionAr": "مشكلة برا المدن؟",
          "questionEn": "What's the problem outside big cities?",
          "options": [
            "no roads",
            "few charging stations",
            "no dealers"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: few charging stations"
        },
        {
          "questionAr": "استنتاج الطالب؟",
          "questionEn": "The student's conclusion?",
          "options": [
            "not worth it",
            "worth it long term",
            "wait ten years"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: worth it long term"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Linking in 'on the other hand' /ɑːnðiˈʌðər hænd/",
      "items": [
        "on the other hand /ɑːn ði ˈʌðər hænd/",
        "although /ɔːlˈðoʊ/",
        "outweigh /ˌaʊtˈweɪ/"
      ],
      "tipAr": "the قبل حرف متحرك تنطق «ذي»: the other = «ذي أَذَر»."
    },
    "exercises": {
      "easy": [
        {
          "id": "sc_229_e1",
          "type": "meaning",
          "promptEn": "What does \"advantage\" mean?",
          "promptAr": "ما معنى \"advantage\"؟",
          "options": [
            "رغم",
            "ميزة",
            "يفوق",
            "يستاهل"
          ],
          "correctIndex": 1,
          "answer": "ميزة",
          "explanationAr": "\"advantage\" /ədˈvæntɪdʒ/ تعني: ميزة. مثال: a big advantage"
        },
        {
          "id": "sc_229_e2",
          "type": "meaning",
          "promptEn": "What does \"disadvantage\" mean?",
          "promptAr": "ما معنى \"disadvantage\"؟",
          "options": [
            "بشكل عام",
            "عيب",
            "طويل المدى",
            "مقايضة/تنازل"
          ],
          "correctIndex": 1,
          "answer": "عيب",
          "explanationAr": "\"disadvantage\" /ˌdɪsədˈvæntɪdʒ/ تعني: عيب. مثال: one disadvantage"
        },
        {
          "id": "sc_229_e3",
          "type": "meaning",
          "promptEn": "What does \"outweigh\" mean?",
          "promptAr": "ما معنى \"outweigh\"؟",
          "options": [
            "ميزة",
            "يفوق",
            "مقايضة/تنازل",
            "استقلالية"
          ],
          "correctIndex": 1,
          "answer": "يفوق",
          "explanationAr": "\"outweigh\" /ˌaʊtˈweɪ/ تعني: يفوق. مثال: The pros outweigh the cons."
        },
        {
          "id": "sc_229_e4",
          "type": "meaning",
          "promptEn": "What does \"worth it\" mean?",
          "promptAr": "ما معنى \"worth it\"؟",
          "options": [
            "رغم",
            "استقلالية",
            "يستاهل",
            "بشكل عام"
          ],
          "correctIndex": 2,
          "answer": "يستاهل",
          "explanationAr": "\"worth it\" /wɜːrθ ɪt/ تعني: يستاهل. مثال: It's worth it."
        }
      ],
      "medium": [
        {
          "id": "sc_229_m1",
          "type": "gap",
          "promptEn": "Complete: ____, studying abroad builds independence.",
          "promptAr": "أكمل الفراغ: (من جهة، الدراسة برا تبني الاستقلالية.)",
          "options": [
            "On the one hand",
            "In one hand",
            "From one side"
          ],
          "correctIndex": 0,
          "answer": "On the one hand, studying abroad builds independence.",
          "explanationAr": "الإجابة: On the one hand. أدوات: On the one hand... on the other hand / Although... / Whereas... / Not only... but also... / Overall, ..."
        },
        {
          "id": "sc_229_m2",
          "type": "gap",
          "promptEn": "Complete: ____, it can be lonely.",
          "promptAr": "أكمل الفراغ: (ومن جهة ثانية، ممكن تكون وحدة.)",
          "options": [
            "In the other hand",
            "Other side",
            "On the other hand"
          ],
          "correctIndex": 2,
          "answer": "On the other hand, it can be lonely.",
          "explanationAr": "الإجابة: On the other hand. أدوات: On the one hand... on the other hand / Although... / Whereas... / Not only... but also... / Overall, ..."
        },
        {
          "id": "sc_229_m3",
          "type": "gap",
          "promptEn": "Complete: ____ it's expensive, it's worth it.",
          "promptAr": "أكمل الفراغ: (مع إنها غالية، تستاهل.)",
          "options": [
            "Despite",
            "Although",
            "However"
          ],
          "correctIndex": 1,
          "answer": "Although it's expensive, it's worth it.",
          "explanationAr": "الإجابة: Although. أدوات: On the one hand... on the other hand / Although... / Whereas... / Not only... but also... / Overall, ..."
        },
        {
          "id": "sc_229_m4",
          "type": "gap",
          "promptEn": "Complete: ____ cheaper, but it's also faster.",
          "promptAr": "أكمل الفراغ: (مو بس أرخص، بل أسرع بعد.)",
          "options": [
            "Only not",
            "Not only it is",
            "Not only is it"
          ],
          "correctIndex": 2,
          "answer": "Not only is it cheaper, but it's also faster.",
          "explanationAr": "الإجابة: Not only is it. أدوات: On the one hand... on the other hand / Although... / Whereas... / Not only... but also... / Overall, ..."
        }
      ],
      "hard": [
        {
          "id": "sc_229_h1",
          "type": "order",
          "promptEn": "Put the words in order: think / outweigh / I / benefits / the / the / drawbacks. / Overall,",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (بشكل عام، أشوف الفوائد أكثر من العيوب.)",
          "answer": "Overall, I think the benefits outweigh the drawbacks.",
          "explanationAr": "الترتيب الصحيح: Overall, I think the benefits outweigh the drawbacks."
        },
        {
          "id": "sc_229_h2",
          "type": "order",
          "promptEn": "Put the words in order: Abha / busy, / Whereas / is / Riyadh / is / calm.",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (بينما الرياض مزحومة، أبها هادئة.)",
          "answer": "Whereas Riyadh is busy, Abha is calm.",
          "explanationAr": "الترتيب الصحيح: Whereas Riyadh is busy, Abha is calm."
        },
        {
          "id": "sc_229_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: ومن جهة ثانية، ممكن تكون وحدة.",
          "answer": "On the other hand, it can be lonely.",
          "explanationAr": "ترجمة مقترحة: On the other hand, it can be lonely."
        },
        {
          "id": "sc_229_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: مو بس أرخص، بل أسرع بعد.",
          "answer": "Not only is it cheaper, but it's also faster.",
          "explanationAr": "ترجمة مقترحة: Not only is it cheaper, but it's also faster."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Positives: many. Negatives: also many.",
        "correct": "There are several pros and cons. On the one hand...",
        "whyAr": "جمل كاملة مترابطة."
      },
      {
        "incorrect": "I think the advantages more than disadvantages.",
        "correct": "I think the advantages outweigh the disadvantages.",
        "whyAr": "outweigh فعل دقيق."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (عرض فكرة أو مشروع): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "In conclusion, finally, to sum up...",
          "To sum up, ...",
          "Although it's expensive, but it's worth it."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: To sum up, ... — عبارة ختام واحدة تكفي.",
        "fromLessonId": "sc_228"
      },
      {
        "questionAr": "مراجعة (التفاوض على السعر والإقناع): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Is there any available discount?",
          "Give me discount.",
          "Is there any discount available?"
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: Is there any discount available? — الأمر المباشر يقفل التفاوض.",
        "fromLessonId": "sc_226"
      },
      {
        "questionAr": "مراجعة (خدمة العملاء: الشكوى والاسترجاع): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'd like a refund, please.",
          "I'd like an refund, please.",
          "I want my money back now!"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I'd like a refund, please. — الحزم بأدب أنجح.",
        "fromLessonId": "sc_223"
      },
      {
        "questionAr": "ما معنى \"feasible\"؟",
        "questionEn": "What does \"feasible\" mean?",
        "options": [
          "مخاطرة",
          "يأخذ بعين الاعتبار",
          "قابل للتنفيذ",
          "صاحب مصلحة"
        ],
        "correctIndex": 2,
        "explanationAr": "\"feasible\" /ˈfiːzəbəl/ تعني: قابل للتنفيذ. مثال: Is it feasible?",
        "fromLessonId": "sc_227"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (مع إنها غالية، تستاهل.)",
          "questionEn": "Complete: ____ it's expensive, it's worth it.",
          "options": [
            "Despite",
            "Although",
            "However"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: Although. أدوات: On the one hand... on the other hand / Although... / Whereas... / Not only... but also... / Overall, ..."
        },
        {
          "questionAr": "أكمل الفراغ: (مو بس أرخص، بل أسرع بعد.)",
          "questionEn": "Complete: ____ cheaper, but it's also faster.",
          "options": [
            "Only not",
            "Not only it is",
            "Not only is it"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: Not only is it. أدوات: On the one hand... on the other hand / Although... / Whereas... / Not only... but also... / Overall, ..."
        },
        {
          "questionAr": "ما معنى \"independence\"؟",
          "questionEn": "What does \"independence\" mean?",
          "options": [
            "ميزة",
            "عيب",
            "طويل المدى",
            "استقلالية"
          ],
          "correctIndex": 3,
          "explanationAr": "\"independence\" /ˌɪndɪˈpɛndəns/ تعني: استقلالية. مثال: It builds independence."
        },
        {
          "questionAr": "ما معنى \"whereas\"؟",
          "questionEn": "What does \"whereas\" mean?",
          "options": [
            "يفوق",
            "مقايضة/تنازل",
            "بينما",
            "عيب"
          ],
          "correctIndex": 2,
          "explanationAr": "\"whereas\" /wɛrˈæz/ تعني: بينما. مثال: whereas the city is noisy"
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Positives: many. Negatives: also many.",
            "There are several pros and cons. On the one hand...",
            "There is several pros and cons. On the one hand..."
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: There are several pros and cons. On the one hand... — جمل كاملة مترابطة."
        }
      ]
    }
  },
  {
    "id": "sc_230",
    "pillarId": "conversation",
    "pillarNameAr": "المحادثة والطلاقة التفاعلية",
    "pillarNameEn": "Active Conversation & Fluency Drills",
    "pillarIcon": "💬",
    "level": "متقدم (Advanced)",
    "levelCode": "B1-B2",
    "titleAr": "التعارف المهني والنتووركنج",
    "titleEn": "Professional Networking and Small Talk",
    "descAr": "ابدأ محادثة مع غريب في مؤتمر، ابنِ علاقة، واختم بتبادل التواصل.",
    "descEn": "Start conversations at events, build rapport and close by exchanging contacts.",
    "speakingGoalAr": "أدر محادثة نتووركنج كاملة مع سارة في مؤتمر.",
    "speakingGoalEn": "Run a full networking conversation with Sara at a conference.",
    "keyPattern": {
      "ruleAr": "الافتتاح: Is this your first time at...? / What brings you here? البناء: That sounds interesting—how did you get into that? الختام: It was great talking to you. Shall we connect on LinkedIn?",
      "ruleEn": "Open with context questions, build with follow-ups, close with 'Shall we connect?'.",
      "formula": "Opener (What brings you here?) → follow-up (How did you get into...?) → close (Great talking to you. Let's keep in touch.)"
    },
    "practicalExamples": [
      {
        "en": "What brings you to this conference?",
        "ar": "وش جابك لهالمؤتمر؟"
      },
      {
        "en": "How did you get into cybersecurity?",
        "ar": "كيف دخلت مجال الأمن السيبراني؟"
      },
      {
        "en": "That sounds fascinating.",
        "ar": "هذا يبدو مثير جداً."
      },
      {
        "en": "It was great talking to you.",
        "ar": "سعدت بالحديث معك."
      },
      {
        "en": "Shall we connect on LinkedIn?",
        "ar": "نتواصل على لينكدإن؟"
      },
      {
        "en": "Let me give you my card.",
        "ar": "خلني أعطيك كرتي."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "What is your work and salary?",
        "correct": "What do you do?",
        "whyAr": "لا تسأل عن الراتب في أول لقاء."
      },
      {
        "incorrect": "OK bye.",
        "correct": "It was great talking to you. Let's keep in touch.",
        "whyAr": "ختام مهني."
      },
      {
        "incorrect": "I want to take your number.",
        "correct": "Would you mind if I took your number? / Shall we connect?",
        "whyAr": "طلب مهذب."
      }
    ],
    "speakingChallenge": {
      "promptAr": "قابلت سارة في مؤتمر تقني. أدر المحادثة واختم بتواصل.",
      "promptEn": "You meet Sara at a tech conference. Network and close.",
      "saraQuestionAr": "Hi there! Enjoying the event?",
      "saraQuestionEn": "Hi there! Enjoying the event?",
      "recommendedResponseEn": "Hi! Yes, very much. I'm Lama, I work in UX design. What brings you here? ... That sounds fascinating. How did you get into it? ... It was great talking to you. Shall we connect on LinkedIn?"
    },
    "quiz": [
      {
        "questionAr": "افتتاح نتووركنج طبيعي:",
        "questionEn": "Natural networking opener:",
        "options": [
          "What's your salary?",
          "What brings you here?",
          "Give me your number."
        ],
        "correctIndex": 1,
        "explanationAr": "What brings you here?"
      },
      {
        "questionAr": "ختام لبق:",
        "questionEn": "Graceful close:",
        "options": [
          "Bye.",
          "It was great talking to you. Let's keep in touch.",
          "I go now."
        ],
        "correctIndex": 1,
        "explanationAr": "ختام + تواصل."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "What is your work and salary?",
          "What do you do?",
          "What does you do?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: What do you do? — لا تسأل عن الراتب في أول لقاء."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "It were great talking to you. Let's keep in touch.",
          "It was great talking to you. Let's keep in touch.",
          "OK bye."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: It was great talking to you. Let's keep in touch. — ختام مهني."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I want to take your number.",
          "Would you mind if I took number your?",
          "Would you mind if I took your number? / Shall we connect?"
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: Would you mind if I took your number? / Shall we connect? — طلب مهذب."
      }
    ],
    "whiteboardNotes": {
      "title": "Professional Networking and Small Talk",
      "pointsAr": [
        "يفتح حديثاً مع غريب.",
        "يطرح أسئلة متابعة ذكية.",
        "يختم المحادثة بلباقة.",
        "الافتتاح: Is this your first time at...? / What brings you here? البناء: That sounds interesting—how did you get into that? الختام: It was great talking to you. Shall we connect on LinkedIn?"
      ],
      "pointsEn": [
        "Open a conversation with a stranger.",
        "Ask smart follow-up questions.",
        "Close the conversation gracefully.",
        "Open with context questions, build with follow-ups, close with 'Shall we connect?'."
      ],
      "chalkHighlight": "Opener (What brings you here?) → follow-up (How did you get into...?) → close (Great talking to you. Let's keep in touch.)"
    },
    "unit": 6,
    "cefr": "B2",
    "objectivesAr": [
      "يفتح حديثاً مع غريب.",
      "يطرح أسئلة متابعة ذكية.",
      "يختم المحادثة بلباقة."
    ],
    "objectivesEn": [
      "Open a conversation with a stranger.",
      "Ask smart follow-up questions.",
      "Close the conversation gracefully."
    ],
    "vocabulary": [
      {
        "word": "network",
        "ipa": "/ˈnɛtwɜːrk/",
        "ar": "يكوّن علاقات/شبكة",
        "exampleEn": "I came here to network.",
        "exampleAr": "جيت أكوّن علاقات."
      },
      {
        "word": "field",
        "ipa": "/fiːld/",
        "ar": "مجال",
        "exampleEn": "What field are you in?",
        "exampleAr": "وش مجالك؟"
      },
      {
        "word": "get into",
        "ipa": "/ɡɛt ˈɪntuː/",
        "ar": "يدخل مجال",
        "exampleEn": "How did you get into AI?",
        "exampleAr": "كيف دخلت الذكاء الاصطناعي؟"
      },
      {
        "word": "fascinating",
        "ipa": "/ˈfæsɪneɪtɪŋ/",
        "ar": "مذهل/مثير",
        "exampleEn": "That's fascinating!",
        "exampleAr": "مذهل!"
      },
      {
        "word": "keep in touch",
        "ipa": "/kiːp ɪn tʌtʃ/",
        "ar": "نبقى على تواصل",
        "exampleEn": "Let's keep in touch.",
        "exampleAr": "خلنا على تواصل."
      },
      {
        "word": "business card",
        "ipa": "/ˈbɪznəs kɑːrd/",
        "ar": "كرت عمل",
        "exampleEn": "Here's my business card.",
        "exampleAr": "هذا كرتي."
      },
      {
        "word": "colleague",
        "ipa": "/ˈkɑːliːɡ/",
        "ar": "زميل",
        "exampleEn": "my colleague Noura",
        "exampleAr": "زميلتي نورة"
      },
      {
        "word": "startup",
        "ipa": "/ˈstɑːrtʌp/",
        "ar": "شركة ناشئة",
        "exampleEn": "I work at a startup.",
        "exampleAr": "أشتغل في شركة ناشئة."
      },
      {
        "word": "panel",
        "ipa": "/ˈpænəl/",
        "ar": "جلسة نقاش",
        "exampleEn": "the panel on fintech",
        "exampleAr": "جلسة التقنية المالية"
      },
      {
        "word": "follow up",
        "ipa": "/ˈfɑːloʊ ʌp/",
        "ar": "يتابع",
        "exampleEn": "I'll follow up by email.",
        "exampleAr": "بتابع بالإيميل."
      }
    ],
    "grammarFocus": {
      "ruleAr": "الافتتاح: Is this your first time at...? / What brings you here? البناء: That sounds interesting—how did you get into that? الختام: It was great talking to you. Shall we connect on LinkedIn?",
      "ruleEn": "Open with context questions, build with follow-ups, close with 'Shall we connect?'.",
      "formula": "Opener (What brings you here?) → follow-up (How did you get into...?) → close (Great talking to you. Let's keep in touch.)",
      "examples": [
        {
          "en": "What brings you to this conference?",
          "ar": "وش جابك لهالمؤتمر؟"
        },
        {
          "en": "How did you get into cybersecurity?",
          "ar": "كيف دخلت مجال الأمن السيبراني؟"
        },
        {
          "en": "That sounds fascinating.",
          "ar": "هذا يبدو مثير جداً."
        },
        {
          "en": "It was great talking to you.",
          "ar": "سعدت بالحديث معك."
        },
        {
          "en": "Shall we connect on LinkedIn?",
          "ar": "نتواصل على لينكدإن؟"
        },
        {
          "en": "Let me give you my card.",
          "ar": "خلني أعطيك كرتي."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Student",
        "en": "Hi, is this your first time at LEAP?",
        "ar": "هلا، أول مرة تحضرين LEAP؟"
      },
      {
        "speaker": "Sara",
        "en": "No, my third! I'm Sara, I work in fintech. What brings you here?",
        "ar": "لا، الثالثة! أنا سارة، أشتغل في التقنية المالية. وش جابك؟"
      },
      {
        "speaker": "Student",
        "en": "I'm Fahad. I'm a data analyst, and I'm looking for AI partners for our startup.",
        "ar": "أنا فهد، محلل بيانات، وأدور شركاء ذكاء اصطناعي لشركتنا الناشئة."
      },
      {
        "speaker": "Sara",
        "en": "Interesting! How did you get into data?",
        "ar": "مثير! كيف دخلت مجال البيانات؟"
      },
      {
        "speaker": "Student",
        "en": "By accident, actually. Did you enjoy the fintech panel?",
        "ar": "بالصدفة صراحة. عجبتك جلسة التقنية المالية؟"
      },
      {
        "speaker": "Sara",
        "en": "Loved it. It was great talking to you. Shall we connect on LinkedIn?",
        "ar": "مرة. سعدت بالحديث معك. نتواصل على لينكدإن؟"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Student: Hi, is this your first time at LEAP?\nSara: No, my third! I'm Sara, I work in fintech. What brings you here?\nStudent: I'm Fahad. I'm a data analyst, and I'm looking for AI partners for our startup.\nSara: Interesting! How did you get into data?\nStudent: By accident, actually. Did you enjoy the fintech panel?\nSara: Loved it. It was great talking to you. Shall we connect on LinkedIn?",
      "questions": [
        {
          "questionAr": "كم مرة حضرت سارة؟",
          "questionEn": "How many times has Sara been to LEAP?",
          "options": [
            "once",
            "twice",
            "three times"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: three times"
        },
        {
          "questionAr": "وش يدور فهد؟",
          "questionEn": "What is Fahad looking for?",
          "options": [
            "a job",
            "AI partners",
            "investors"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: AI partners"
        },
        {
          "questionAr": "كيف دخل البيانات؟",
          "questionEn": "How did he get into data?",
          "options": [
            "by accident",
            "at university",
            "through his father"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: by accident"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Rhythm: stress content words in questions",
      "items": [
        "What BRINGS you HERE?",
        "colleague /ˈkɑːliːɡ/",
        "fascinating /ˈfæsɪneɪtɪŋ/"
      ],
      "tipAr": "اضغط الكلمات المهمة وخفّف الباقي؛ هذا يعطي إيقاع إنجليزي طبيعي."
    },
    "exercises": {
      "easy": [
        {
          "id": "sc_230_e1",
          "type": "meaning",
          "promptEn": "What does \"network\" mean?",
          "promptAr": "ما معنى \"network\"؟",
          "options": [
            "مجال",
            "يكوّن علاقات/شبكة",
            "زميل",
            "شركة ناشئة"
          ],
          "correctIndex": 1,
          "answer": "يكوّن علاقات/شبكة",
          "explanationAr": "\"network\" /ˈnɛtwɜːrk/ تعني: يكوّن علاقات/شبكة. مثال: I came here to network."
        },
        {
          "id": "sc_230_e2",
          "type": "meaning",
          "promptEn": "What does \"field\" mean?",
          "promptAr": "ما معنى \"field\"؟",
          "options": [
            "نبقى على تواصل",
            "يكوّن علاقات/شبكة",
            "مجال",
            "يدخل مجال"
          ],
          "correctIndex": 2,
          "answer": "مجال",
          "explanationAr": "\"field\" /fiːld/ تعني: مجال. مثال: What field are you in?"
        },
        {
          "id": "sc_230_e3",
          "type": "meaning",
          "promptEn": "What does \"get into\" mean?",
          "promptAr": "ما معنى \"get into\"؟",
          "options": [
            "يدخل مجال",
            "يتابع",
            "نبقى على تواصل",
            "يكوّن علاقات/شبكة"
          ],
          "correctIndex": 0,
          "answer": "يدخل مجال",
          "explanationAr": "\"get into\" /ɡɛt ˈɪntuː/ تعني: يدخل مجال. مثال: How did you get into AI?"
        },
        {
          "id": "sc_230_e4",
          "type": "meaning",
          "promptEn": "What does \"fascinating\" mean?",
          "promptAr": "ما معنى \"fascinating\"؟",
          "options": [
            "يدخل مجال",
            "زميل",
            "شركة ناشئة",
            "مذهل/مثير"
          ],
          "correctIndex": 3,
          "answer": "مذهل/مثير",
          "explanationAr": "\"fascinating\" /ˈfæsɪneɪtɪŋ/ تعني: مذهل/مثير. مثال: That's fascinating!"
        }
      ],
      "medium": [
        {
          "id": "sc_230_m1",
          "type": "gap",
          "promptEn": "Complete: What ____ you to this conference?",
          "promptAr": "أكمل الفراغ: (وش جابك لهالمؤتمر؟)",
          "options": [
            "bring",
            "brought you",
            "brings"
          ],
          "correctIndex": 2,
          "answer": "What brings you to this conference?",
          "explanationAr": "الإجابة: brings. الافتتاح: Is this your first time at...? / What brings you here? البناء: That sounds interesting—how did you get into that? الختام: It was great talking to you. Shall we connect on LinkedIn?"
        },
        {
          "id": "sc_230_m2",
          "type": "gap",
          "promptEn": "Complete: How did you ____ cybersecurity?",
          "promptAr": "أكمل الفراغ: (كيف دخلت مجال الأمن السيبراني؟)",
          "options": [
            "go in",
            "get into",
            "enter in"
          ],
          "correctIndex": 1,
          "answer": "How did you get into cybersecurity?",
          "explanationAr": "الإجابة: get into. الافتتاح: Is this your first time at...? / What brings you here? البناء: That sounds interesting—how did you get into that? الختام: It was great talking to you. Shall we connect on LinkedIn?"
        },
        {
          "id": "sc_230_m3",
          "type": "gap",
          "promptEn": "Complete: That ____ fascinating.",
          "promptAr": "أكمل الفراغ: (هذا يبدو مثير جداً.)",
          "options": [
            "sounds",
            "looks like",
            "seem"
          ],
          "correctIndex": 0,
          "answer": "That sounds fascinating.",
          "explanationAr": "الإجابة: sounds. الافتتاح: Is this your first time at...? / What brings you here? البناء: That sounds interesting—how did you get into that? الختام: It was great talking to you. Shall we connect on LinkedIn?"
        },
        {
          "id": "sc_230_m4",
          "type": "gap",
          "promptEn": "Complete: It was great ____ to you.",
          "promptAr": "أكمل الفراغ: (سعدت بالحديث معك.)",
          "options": [
            "talking",
            "to talk with",
            "talk"
          ],
          "correctIndex": 0,
          "answer": "It was great talking to you.",
          "explanationAr": "الإجابة: talking. الافتتاح: Is this your first time at...? / What brings you here? البناء: That sounds interesting—how did you get into that? الختام: It was great talking to you. Shall we connect on LinkedIn?"
        }
      ],
      "hard": [
        {
          "id": "sc_230_h1",
          "type": "order",
          "promptEn": "Put the words in order: on / Shall / we / connect / LinkedIn?",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (نتواصل على لينكدإن؟)",
          "answer": "Shall we connect on LinkedIn?",
          "explanationAr": "الترتيب الصحيح: Shall we connect on LinkedIn?"
        },
        {
          "id": "sc_230_h2",
          "type": "order",
          "promptEn": "Put the words in order: you / Let / give / me / my / card.",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (خلني أعطيك كرتي.)",
          "answer": "Let me give you my card.",
          "explanationAr": "الترتيب الصحيح: Let me give you my card."
        },
        {
          "id": "sc_230_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: كيف دخلت مجال الأمن السيبراني؟",
          "answer": "How did you get into cybersecurity?",
          "explanationAr": "ترجمة مقترحة: How did you get into cybersecurity?"
        },
        {
          "id": "sc_230_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: سعدت بالحديث معك.",
          "answer": "It was great talking to you.",
          "explanationAr": "ترجمة مقترحة: It was great talking to you."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Where you work and how much you take?",
        "correct": "What do you do? Which company are you with?",
        "whyAr": "سؤال الراتب محرج."
      },
      {
        "incorrect": "Nice to meet you. Bye.",
        "correct": "It was great meeting you. Let's keep in touch!",
        "whyAr": "ختام أدفأ."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (مناقشة الإيجابيات والسلبيات): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "On the other hand...",
          "In the other hand...",
          "On the hand other..."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: On the other hand... — حرف الجر on.",
        "fromLessonId": "sc_229"
      },
      {
        "questionAr": "مراجعة (الاعتراض الدبلوماسي في الاجتماعات): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'm not sure this are the best option.",
          "This idea is wrong.",
          "I'm not sure this is the best option."
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: I'm not sure this is the best option. — التخفيف مهم في بيئة العمل.",
        "fromLessonId": "sc_227"
      },
      {
        "questionAr": "مراجعة (ترتيب المواعيد والاجتماعات في العمل): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Is it suitable for you Tuesday?",
          "Does Tuesday work you for?",
          "Does Tuesday work for you?"
        ],
        "correctIndex": 2,
        "explanationAr": "الصحيح: Does Tuesday work for you? — صيغة طبيعية مهنية.",
        "fromLessonId": "sc_224"
      },
      {
        "questionAr": "ما معنى \"call to action\"؟",
        "questionEn": "What does \"call to action\" mean?",
        "options": [
          "حل",
          "دعوة للعمل",
          "فائدة",
          "اشتراك"
        ],
        "correctIndex": 1,
        "explanationAr": "\"call to action\" /kɔːl tə ˈækʃən/ تعني: دعوة للعمل. مثال: End with a call to action.",
        "fromLessonId": "sc_228"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (هذا يبدو مثير جداً.)",
          "questionEn": "Complete: That ____ fascinating.",
          "options": [
            "sounds",
            "looks like",
            "seem"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: sounds. الافتتاح: Is this your first time at...? / What brings you here? البناء: That sounds interesting—how did you get into that? الختام: It was great talking to you. Shall we connect on LinkedIn?"
        },
        {
          "questionAr": "أكمل الفراغ: (سعدت بالحديث معك.)",
          "questionEn": "Complete: It was great ____ to you.",
          "options": [
            "talking",
            "to talk with",
            "talk"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: talking. الافتتاح: Is this your first time at...? / What brings you here? البناء: That sounds interesting—how did you get into that? الختام: It was great talking to you. Shall we connect on LinkedIn?"
        },
        {
          "questionAr": "ما معنى \"keep in touch\"؟",
          "questionEn": "What does \"keep in touch\" mean?",
          "options": [
            "جلسة نقاش",
            "نبقى على تواصل",
            "مذهل/مثير",
            "يدخل مجال"
          ],
          "correctIndex": 1,
          "explanationAr": "\"keep in touch\" /kiːp ɪn tʌtʃ/ تعني: نبقى على تواصل. مثال: Let's keep in touch."
        },
        {
          "questionAr": "ما معنى \"business card\"؟",
          "questionEn": "What does \"business card\" mean?",
          "options": [
            "كرت عمل",
            "يكوّن علاقات/شبكة",
            "مجال",
            "جلسة نقاش"
          ],
          "correctIndex": 0,
          "explanationAr": "\"business card\" /ˈbɪznəs kɑːrd/ تعني: كرت عمل. مثال: Here's my business card."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "What do you do? Which company is you with?",
            "What do you do? Which company are you with?",
            "Where you work and how much you take?"
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: What do you do? Which company are you with? — سؤال الراتب محرج."
        }
      ]
    }
  }
];
