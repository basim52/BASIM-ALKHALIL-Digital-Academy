import { SaraCurriculumLesson } from './types';

// Rebuilt Sara curriculum (Conversational Writing & Quick Messaging): 30 lessons, 6 units, CEFR Pre-A1 to B2.
// Generated from structured lesson sources; each lesson has vocabulary, dialogue, listening, pronunciation,
// 3-tier exercises, spiral review and a mastery check.

export const SARA_CONVERSATIONAL_WRITING_LESSONS: SaraCurriculumLesson[] = [
  {
    "id": "scw_401",
    "pillarId": "writing",
    "pillarNameAr": "الكتابة التعبيرية الحوارية",
    "pillarNameEn": "Conversational Writing & Quick Messaging",
    "pillarIcon": "✍️",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "الحرف الكبير والنقطة",
    "titleEn": "Capital Letters and Full Stops",
    "descAr": "أول قاعدة في الكتابة: ابدأ الجملة بحرف كبير واختمها بنقطة. وI دائماً كبيرة.",
    "descEn": "Start every sentence with a capital letter, end it with a full stop. 'I' is always capital.",
    "speakingGoalAr": "اكتب ٥ جمل صحيحة الحروف والنقاط.",
    "speakingGoalEn": "Write five sentences with correct capitals and full stops.",
    "keyPattern": {
      "ruleAr": "الحرف الكبير في: بداية الجملة، الضمير I، أسماء الناس والمدن والدول والأيام والشهور (Ali, Jeddah, Saudi Arabia, Monday, May). النقطة (.) في نهاية الجملة الخبرية.",
      "ruleEn": "Capitals: sentence start, I, names, cities, countries, days, months. Full stop at the end of a statement.",
      "formula": "Capital + words + . → My name is Ali."
    },
    "practicalExamples": [
      {
        "en": "My name is Ali.",
        "ar": "اسمي علي."
      },
      {
        "en": "I live in Jeddah.",
        "ar": "أسكن في جدة."
      },
      {
        "en": "Today is Friday.",
        "ar": "اليوم الجمعة."
      },
      {
        "en": "Sara and I are friends.",
        "ar": "أنا وسارة أصدقاء."
      },
      {
        "en": "We are from Saudi Arabia.",
        "ar": "إحنا من السعودية."
      },
      {
        "en": "My birthday is in May.",
        "ar": "عيد ميلادي في مايو."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "my name is ali",
        "correct": "My name is Ali.",
        "whyAr": "حرف كبير في البداية وفي الاسم، ونقطة في الآخر."
      },
      {
        "incorrect": "i like tea.",
        "correct": "I like tea.",
        "whyAr": "I دائماً كبيرة."
      },
      {
        "incorrect": "I live in riyadh",
        "correct": "I live in Riyadh.",
        "whyAr": "أسماء المدن بحرف كبير + نقطة."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اكتب لسارة ٣ جمل عن نفسك.",
      "promptEn": "Write three sentences about yourself.",
      "saraQuestionAr": "اكتب اسمك ومدينتك ويومك المفضل.",
      "saraQuestionEn": "Write your name, city and favourite day.",
      "recommendedResponseEn": "My name is Ali. I live in Riyadh. My favourite day is Friday."
    },
    "quiz": [
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which is correct?",
        "options": [
          "i live in Jeddah.",
          "I live in jeddah.",
          "I live in Jeddah."
        ],
        "correctIndex": 2,
        "explanationAr": "I كبيرة وJeddah كبيرة ونقطة."
      },
      {
        "questionAr": "أي كلمة لازم تبدأ بحرف كبير؟",
        "questionEn": "Which word needs a capital?",
        "options": [
          "city",
          "monday",
          "friend"
        ],
        "correctIndex": 1,
        "explanationAr": "أيام الأسبوع: Monday."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "my name is ali",
          "My name is Ali."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: My name is Ali. — حرف كبير في البداية وفي الاسم، ونقطة في الآخر."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "i like tea.",
          "I like tea."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I like tea. — I دائماً كبيرة."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I live in Riyadh.",
          "I live in riyadh"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I live in Riyadh. — أسماء المدن بحرف كبير + نقطة."
      }
    ],
    "whiteboardNotes": {
      "title": "Capital Letters and Full Stops",
      "pointsAr": [
        "يبدأ الجملة بحرف كبير.",
        "يكتب I وأسماء العلم بحرف كبير.",
        "يختم الجملة بنقطة.",
        "الحرف الكبير في: بداية الجملة، الضمير I، أسماء الناس والمدن والدول والأيام والشهور (Ali, Jeddah, Saudi Arabia, Monday, May). النقطة (.) في نهاية الجملة الخبرية."
      ],
      "pointsEn": [
        "Begin sentences with a capital.",
        "Capitalise I and proper nouns.",
        "End sentences with a full stop.",
        "Capitals: sentence start, I, names, cities, countries, days, months. Full stop at the end of a statement."
      ],
      "chalkHighlight": "Capital + words + . → My name is Ali."
    },
    "unit": 1,
    "cefr": "Pre-A1",
    "objectivesAr": [
      "يبدأ الجملة بحرف كبير.",
      "يكتب I وأسماء العلم بحرف كبير.",
      "يختم الجملة بنقطة."
    ],
    "objectivesEn": [
      "Begin sentences with a capital.",
      "Capitalise I and proper nouns.",
      "End sentences with a full stop."
    ],
    "vocabulary": [
      {
        "word": "name",
        "ipa": "/neɪm/",
        "ar": "اسم",
        "exampleEn": "my name",
        "exampleAr": "اسمي"
      },
      {
        "word": "live",
        "ipa": "/lɪv/",
        "ar": "يسكن",
        "exampleEn": "I live in Dammam.",
        "exampleAr": "أسكن في الدمام."
      },
      {
        "word": "city",
        "ipa": "/ˈsɪti/",
        "ar": "مدينة",
        "exampleEn": "my city",
        "exampleAr": "مدينتي"
      },
      {
        "word": "country",
        "ipa": "/ˈkʌntri/",
        "ar": "دولة",
        "exampleEn": "my country",
        "exampleAr": "بلدي"
      },
      {
        "word": "Monday",
        "ipa": "/ˈmʌndeɪ/",
        "ar": "الاثنين",
        "exampleEn": "on Monday",
        "exampleAr": "يوم الاثنين"
      },
      {
        "word": "friend",
        "ipa": "/frɛnd/",
        "ar": "صديق",
        "exampleEn": "my friend",
        "exampleAr": "صديقي"
      },
      {
        "word": "sentence",
        "ipa": "/ˈsɛntəns/",
        "ar": "جملة",
        "exampleEn": "a short sentence",
        "exampleAr": "جملة قصيرة"
      },
      {
        "word": "capital letter",
        "ipa": "/ˈkæpɪtəl ˈlɛtər/",
        "ar": "حرف كبير",
        "exampleEn": "Use a capital letter.",
        "exampleAr": "استخدم حرف كبير."
      },
      {
        "word": "full stop",
        "ipa": "/ˌfʊl ˈstɑːp/",
        "ar": "نقطة",
        "exampleEn": "Add a full stop.",
        "exampleAr": "حط نقطة."
      },
      {
        "word": "word",
        "ipa": "/wɜːrd/",
        "ar": "كلمة",
        "exampleEn": "one word",
        "exampleAr": "كلمة وحدة"
      }
    ],
    "grammarFocus": {
      "ruleAr": "الحرف الكبير في: بداية الجملة، الضمير I، أسماء الناس والمدن والدول والأيام والشهور (Ali, Jeddah, Saudi Arabia, Monday, May). النقطة (.) في نهاية الجملة الخبرية.",
      "ruleEn": "Capitals: sentence start, I, names, cities, countries, days, months. Full stop at the end of a statement.",
      "formula": "Capital + words + . → My name is Ali.",
      "examples": [
        {
          "en": "My name is Ali.",
          "ar": "اسمي علي."
        },
        {
          "en": "I live in Jeddah.",
          "ar": "أسكن في جدة."
        },
        {
          "en": "Today is Friday.",
          "ar": "اليوم الجمعة."
        },
        {
          "en": "Sara and I are friends.",
          "ar": "أنا وسارة أصدقاء."
        },
        {
          "en": "We are from Saudi Arabia.",
          "ar": "إحنا من السعودية."
        },
        {
          "en": "My birthday is in May.",
          "ar": "عيد ميلادي في مايو."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Write your name, please.",
        "ar": "اكتب اسمك لو سمحت."
      },
      {
        "speaker": "Student",
        "en": "My name is Fahad.",
        "ar": "اسمي فهد."
      },
      {
        "speaker": "Sara",
        "en": "Good! Capital F. Where do you live?",
        "ar": "ممتاز! F كبيرة. وين تسكن؟"
      },
      {
        "speaker": "Student",
        "en": "I live in Abha.",
        "ar": "أسكن في أبها."
      },
      {
        "speaker": "Sara",
        "en": "Great. Did you add a full stop?",
        "ar": "حلو. حطيت نقطة؟"
      },
      {
        "speaker": "Student",
        "en": "Yes. Abha, full stop.",
        "ar": "إيه. أبها، ونقطة."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Write your name, please.\nStudent: My name is Fahad.\nSara: Good! Capital F. Where do you live?\nStudent: I live in Abha.\nSara: Great. Did you add a full stop?\nStudent: Yes. Abha, full stop.",
      "questions": [
        {
          "questionAr": "اسم الطالب؟",
          "questionEn": "What is the student's name?",
          "options": [
            "Faisal",
            "Fahad",
            "Fawaz"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: Fahad"
        },
        {
          "questionAr": "وين يسكن؟",
          "questionEn": "Where does he live?",
          "options": [
            "Abha",
            "Taif",
            "Tabuk"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: Abha"
        },
        {
          "questionAr": "وش ينحط في الآخر؟",
          "questionEn": "What goes at the end?",
          "options": [
            "a comma",
            "a full stop",
            "nothing"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: a full stop"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Saying capital letters aloud",
      "items": [
        "capital A /ˈkæpɪtəl eɪ/",
        "full stop /ˌfʊl ˈstɑːp/ (UK) = period /ˈpɪriəd/ (US)"
      ],
      "tipAr": "سارة ممكن تمليك: «capital J, full stop» فاعرف الكلمتين."
    },
    "exercises": {
      "easy": [
        {
          "id": "scw_401_e1",
          "type": "meaning",
          "promptEn": "What does \"name\" mean?",
          "promptAr": "ما معنى \"name\"؟",
          "options": [
            "اسم",
            "كلمة",
            "صديق",
            "مدينة"
          ],
          "correctIndex": 0,
          "answer": "اسم",
          "explanationAr": "\"name\" /neɪm/ تعني: اسم. مثال: my name"
        },
        {
          "id": "scw_401_e2",
          "type": "meaning",
          "promptEn": "What does \"live\" mean?",
          "promptAr": "ما معنى \"live\"؟",
          "options": [
            "يسكن",
            "نقطة",
            "اسم",
            "مدينة"
          ],
          "correctIndex": 0,
          "answer": "يسكن",
          "explanationAr": "\"live\" /lɪv/ تعني: يسكن. مثال: I live in Dammam."
        },
        {
          "id": "scw_401_e3",
          "type": "meaning",
          "promptEn": "What does \"city\" mean?",
          "promptAr": "ما معنى \"city\"؟",
          "options": [
            "مدينة",
            "صديق",
            "جملة",
            "حرف كبير"
          ],
          "correctIndex": 0,
          "answer": "مدينة",
          "explanationAr": "\"city\" /ˈsɪti/ تعني: مدينة. مثال: my city"
        },
        {
          "id": "scw_401_e4",
          "type": "meaning",
          "promptEn": "What does \"country\" mean?",
          "promptAr": "ما معنى \"country\"؟",
          "options": [
            "اسم",
            "كلمة",
            "يسكن",
            "دولة"
          ],
          "correctIndex": 3,
          "answer": "دولة",
          "explanationAr": "\"country\" /ˈkʌntri/ تعني: دولة. مثال: my country"
        }
      ],
      "medium": [
        {
          "id": "scw_401_m1",
          "type": "gap",
          "promptEn": "Complete: My name is ____.",
          "promptAr": "أكمل الفراغ: (اسمي علي.)",
          "options": [
            "ali",
            "ALI",
            "Ali"
          ],
          "correctIndex": 2,
          "answer": "My name is Ali.",
          "explanationAr": "الإجابة: Ali. الحرف الكبير في: بداية الجملة، الضمير I، أسماء الناس والمدن والدول والأيام والشهور (Ali, Jeddah, Saudi Arabia, Monday, May). النقطة (.) في نهاية الجملة الخبرية."
        },
        {
          "id": "scw_401_m2",
          "type": "gap",
          "promptEn": "Complete: I live in ____.",
          "promptAr": "أكمل الفراغ: (أسكن في جدة.)",
          "options": [
            "jeddah",
            "JEDDAH",
            "Jeddah"
          ],
          "correctIndex": 2,
          "answer": "I live in Jeddah.",
          "explanationAr": "الإجابة: Jeddah. الحرف الكبير في: بداية الجملة، الضمير I، أسماء الناس والمدن والدول والأيام والشهور (Ali, Jeddah, Saudi Arabia, Monday, May). النقطة (.) في نهاية الجملة الخبرية."
        },
        {
          "id": "scw_401_m3",
          "type": "gap",
          "promptEn": "Complete: Today is ____.",
          "promptAr": "أكمل الفراغ: (اليوم الجمعة.)",
          "options": [
            "fRiday",
            "friday",
            "Friday"
          ],
          "correctIndex": 2,
          "answer": "Today is Friday.",
          "explanationAr": "الإجابة: Friday. الحرف الكبير في: بداية الجملة، الضمير I، أسماء الناس والمدن والدول والأيام والشهور (Ali, Jeddah, Saudi Arabia, Monday, May). النقطة (.) في نهاية الجملة الخبرية."
        },
        {
          "id": "scw_401_m4",
          "type": "gap",
          "promptEn": "Complete: Sara and ____ are friends.",
          "promptAr": "أكمل الفراغ: (أنا وسارة أصدقاء.)",
          "options": [
            "me",
            "I",
            "i"
          ],
          "correctIndex": 1,
          "answer": "Sara and I are friends.",
          "explanationAr": "الإجابة: I. الحرف الكبير في: بداية الجملة، الضمير I، أسماء الناس والمدن والدول والأيام والشهور (Ali, Jeddah, Saudi Arabia, Monday, May). النقطة (.) في نهاية الجملة الخبرية."
        }
      ],
      "hard": [
        {
          "id": "scw_401_h1",
          "type": "order",
          "promptEn": "Put the words in order: We / Saudi / Arabia. / from / are",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (إحنا من السعودية.)",
          "answer": "We are from Saudi Arabia.",
          "explanationAr": "الترتيب الصحيح: We are from Saudi Arabia."
        },
        {
          "id": "scw_401_h2",
          "type": "order",
          "promptEn": "Put the words in order: May. / birthday / My / in / is",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (عيد ميلادي في مايو.)",
          "answer": "My birthday is in May.",
          "explanationAr": "الترتيب الصحيح: My birthday is in May."
        },
        {
          "id": "scw_401_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أسكن في جدة.",
          "answer": "I live in Jeddah.",
          "explanationAr": "ترجمة مقترحة: I live in Jeddah."
        },
        {
          "id": "scw_401_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أنا وسارة أصدقاء.",
          "answer": "Sara and I are friends.",
          "explanationAr": "ترجمة مقترحة: Sara and I are friends."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Writing like Arabic with no capitals",
        "correct": "English has capitals; Arabic doesn't",
        "whyAr": "العربي ما فيه حروف كبيرة، فننساها."
      },
      {
        "incorrect": "Capitalising every noun: My Car is Red.",
        "correct": "My car is red.",
        "whyAr": "فقط أسماء العلم."
      }
    ],
    "reviewOfPrevious": [],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (اسمي علي.)",
          "questionEn": "Complete: My name is ____.",
          "options": [
            "ali",
            "ALI",
            "Ali"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: Ali. الحرف الكبير في: بداية الجملة، الضمير I، أسماء الناس والمدن والدول والأيام والشهور (Ali, Jeddah, Saudi Arabia, Monday, May). النقطة (.) في نهاية الجملة الخبرية."
        },
        {
          "questionAr": "أكمل الفراغ: (أسكن في جدة.)",
          "questionEn": "Complete: I live in ____.",
          "options": [
            "jeddah",
            "JEDDAH",
            "Jeddah"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: Jeddah. الحرف الكبير في: بداية الجملة، الضمير I، أسماء الناس والمدن والدول والأيام والشهور (Ali, Jeddah, Saudi Arabia, Monday, May). النقطة (.) في نهاية الجملة الخبرية."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which is correct?",
          "options": [
            "i live in Jeddah.",
            "I live in jeddah.",
            "I live in Jeddah."
          ],
          "correctIndex": 2,
          "explanationAr": "I كبيرة وJeddah كبيرة ونقطة."
        },
        {
          "questionAr": "أي كلمة لازم تبدأ بحرف كبير؟",
          "questionEn": "Which word needs a capital?",
          "options": [
            "city",
            "monday",
            "friend"
          ],
          "correctIndex": 1,
          "explanationAr": "أيام الأسبوع: Monday."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "my name is ali",
            "My name is Ali."
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: My name is Ali. — حرف كبير في البداية وفي الاسم، ونقطة في الآخر."
        }
      ]
    }
  },
  {
    "id": "scw_404",
    "pillarId": "writing",
    "pillarNameAr": "الكتابة التعبيرية الحوارية",
    "pillarNameEn": "Conversational Writing & Quick Messaging",
    "pillarIcon": "✍️",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "أكتب عن نفسي",
    "titleEn": "Writing About Me",
    "descAr": "اكتب فقرة قصيرة تعرّف فيها بنفسك: الاسم، العمر، المدينة، الهواية.",
    "descEn": "Write a short self-introduction: name, age, city, hobby.",
    "speakingGoalAr": "اكتب ٥ جمل تعريفية بدون أخطاء.",
    "speakingGoalEn": "Write a five-sentence self-introduction.",
    "keyPattern": {
      "ruleAr": "استخدم I am للعمر والصفة (I am ten. I am a student.)، وI live in للمكان، وI like للهواية، وMy ... is للأشياء. كل جملة فكرة وحدة.",
      "ruleEn": "Use I am (age, job), I live in (place), I like (hobby), My ... is (things). One idea per sentence.",
      "formula": "I am + age/job. I live in + city. I like + noun/-ing."
    },
    "practicalExamples": [
      {
        "en": "I am twelve years old.",
        "ar": "عمري ١٢ سنة."
      },
      {
        "en": "I live in Dammam.",
        "ar": "أسكن في الدمام."
      },
      {
        "en": "I like football.",
        "ar": "أحب كرة القدم."
      },
      {
        "en": "My favourite food is kabsa.",
        "ar": "أكلتي المفضلة الكبسة."
      },
      {
        "en": "I am a student.",
        "ar": "أنا طالب."
      },
      {
        "en": "I have two brothers.",
        "ar": "عندي أخوين."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "I have 12 years.",
        "correct": "I am 12 years old.",
        "whyAr": "العمر بـ am مو have."
      },
      {
        "incorrect": "I am live in Taif.",
        "correct": "I live in Taif.",
        "whyAr": "لا تجمع am مع فعل."
      },
      {
        "incorrect": "I like play football.",
        "correct": "I like playing football.",
        "whyAr": "بعد like نستخدم -ing أو to play."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اكتب فقرة من ٥ جمل عن نفسك.",
      "promptEn": "Write five sentences about yourself.",
      "saraQuestionAr": "اسمك، عمرك، مدينتك، هوايتك، أكلتك المفضلة.",
      "saraQuestionEn": "Name, age, city, hobby, favourite food.",
      "recommendedResponseEn": "My name is Noura. I am twelve years old. I live in Riyadh. I like drawing. My favourite food is kabsa."
    },
    "quiz": [
      {
        "questionAr": "أكمل: I ___ ten years old.",
        "questionEn": "Complete: I ___ ten years old.",
        "options": [
          "have",
          "am",
          "is"
        ],
        "correctIndex": 1,
        "explanationAr": "am للعمر."
      },
      {
        "questionAr": "أكمل: I like ___.",
        "questionEn": "Complete: I like ___.",
        "options": [
          "swim",
          "swimming",
          "swims"
        ],
        "correctIndex": 1,
        "explanationAr": "like + -ing."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I am 12 years old.",
          "I have 12 years."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I am 12 years old. — العمر بـ am مو have."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I live in Taif.",
          "I am live in Taif."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I live in Taif. — لا تجمع am مع فعل."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I like play football.",
          "I like playing football."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I like playing football. — بعد like نستخدم -ing أو to play."
      }
    ],
    "whiteboardNotes": {
      "title": "Writing About Me",
      "pointsAr": [
        "يعرّف بنفسه كتابياً.",
        "يستخدم I am / I like / I live in.",
        "يكتب العمر صح.",
        "استخدم I am للعمر والصفة (I am ten. I am a student.)، وI live in للمكان، وI like للهواية، وMy ... is للأشياء. كل جملة فكرة وحدة."
      ],
      "pointsEn": [
        "Introduce himself in writing.",
        "Use I am, I like, I live in.",
        "Write age correctly.",
        "Use I am (age, job), I live in (place), I like (hobby), My ... is (things). One idea per sentence."
      ],
      "chalkHighlight": "I am + age/job. I live in + city. I like + noun/-ing."
    },
    "unit": 1,
    "cefr": "Pre-A1",
    "objectivesAr": [
      "يعرّف بنفسه كتابياً.",
      "يستخدم I am / I like / I live in.",
      "يكتب العمر صح."
    ],
    "objectivesEn": [
      "Introduce himself in writing.",
      "Use I am, I like, I live in.",
      "Write age correctly."
    ],
    "vocabulary": [
      {
        "word": "old",
        "ipa": "/oʊld/",
        "ar": "عمر/كبير",
        "exampleEn": "ten years old",
        "exampleAr": "عمره ١٠"
      },
      {
        "word": "student",
        "ipa": "/ˈstuːdənt/",
        "ar": "طالب",
        "exampleEn": "a good student",
        "exampleAr": "طالب شاطر"
      },
      {
        "word": "favourite",
        "ipa": "/ˈfeɪvərɪt/",
        "ar": "مفضّل",
        "exampleEn": "my favourite colour",
        "exampleAr": "لوني المفضل"
      },
      {
        "word": "hobby",
        "ipa": "/ˈhɑːbi/",
        "ar": "هواية",
        "exampleEn": "my hobby",
        "exampleAr": "هوايتي"
      },
      {
        "word": "football",
        "ipa": "/ˈfʊtbɔːl/",
        "ar": "كرة قدم",
        "exampleEn": "play football",
        "exampleAr": "يلعب كورة"
      },
      {
        "word": "drawing",
        "ipa": "/ˈdrɔːɪŋ/",
        "ar": "رسم",
        "exampleEn": "I like drawing.",
        "exampleAr": "أحب الرسم."
      },
      {
        "word": "brother",
        "ipa": "/ˈbrʌðər/",
        "ar": "أخ",
        "exampleEn": "my brother",
        "exampleAr": "أخوي"
      },
      {
        "word": "sister",
        "ipa": "/ˈsɪstər/",
        "ar": "أخت",
        "exampleEn": "my sister",
        "exampleAr": "أختي"
      },
      {
        "word": "school",
        "ipa": "/skuːl/",
        "ar": "مدرسة",
        "exampleEn": "at school",
        "exampleAr": "في المدرسة"
      },
      {
        "word": "about",
        "ipa": "/əˈbaʊt/",
        "ar": "عن",
        "exampleEn": "about me",
        "exampleAr": "عني"
      }
    ],
    "grammarFocus": {
      "ruleAr": "استخدم I am للعمر والصفة (I am ten. I am a student.)، وI live in للمكان، وI like للهواية، وMy ... is للأشياء. كل جملة فكرة وحدة.",
      "ruleEn": "Use I am (age, job), I live in (place), I like (hobby), My ... is (things). One idea per sentence.",
      "formula": "I am + age/job. I live in + city. I like + noun/-ing.",
      "examples": [
        {
          "en": "I am twelve years old.",
          "ar": "عمري ١٢ سنة."
        },
        {
          "en": "I live in Dammam.",
          "ar": "أسكن في الدمام."
        },
        {
          "en": "I like football.",
          "ar": "أحب كرة القدم."
        },
        {
          "en": "My favourite food is kabsa.",
          "ar": "أكلتي المفضلة الكبسة."
        },
        {
          "en": "I am a student.",
          "ar": "أنا طالب."
        },
        {
          "en": "I have two brothers.",
          "ar": "عندي أخوين."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Tell me about you. How old are you?",
        "ar": "كلمني عنك. كم عمرك؟"
      },
      {
        "speaker": "Student",
        "en": "I am eleven years old.",
        "ar": "عمري ١١ سنة."
      },
      {
        "speaker": "Sara",
        "en": "What do you like?",
        "ar": "وش تحب؟"
      },
      {
        "speaker": "Student",
        "en": "I like drawing and football.",
        "ar": "أحب الرسم والكورة."
      },
      {
        "speaker": "Sara",
        "en": "Nice! Now write it in three sentences.",
        "ar": "حلو! الحين اكتبها في ثلاث جمل."
      },
      {
        "speaker": "Student",
        "en": "I am eleven. I like drawing. I like football.",
        "ar": "عمري ١١. أحب الرسم. أحب الكورة."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Tell me about you. How old are you?\nStudent: I am eleven years old.\nSara: What do you like?\nStudent: I like drawing and football.\nSara: Nice! Now write it in three sentences.\nStudent: I am eleven. I like drawing. I like football.",
      "questions": [
        {
          "questionAr": "كم عمره؟",
          "questionEn": "How old is the student?",
          "options": [
            "ten",
            "eleven",
            "twelve"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: eleven"
        },
        {
          "questionAr": "وش يحب؟",
          "questionEn": "What does he like?",
          "options": [
            "swimming",
            "drawing and football",
            "games"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: drawing and football"
        },
        {
          "questionAr": "كم جملة؟",
          "questionEn": "How many sentences?",
          "options": [
            "two",
            "three",
            "five"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: three"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Numbers for age",
      "items": [
        "eleven /ɪˈlɛvən/",
        "twelve /twɛlv/",
        "thirteen /ˌθɜːrˈtiːn/ – thirty /ˈθɜːrti/"
      ],
      "tipAr": "انتبه: thirTEEN (١٣) النبر آخر، THIRty (٣٠) النبر أول."
    },
    "exercises": {
      "easy": [
        {
          "id": "scw_404_e1",
          "type": "meaning",
          "promptEn": "What does \"old\" mean?",
          "promptAr": "ما معنى \"old\"؟",
          "options": [
            "كرة قدم",
            "عمر/كبير",
            "أخ",
            "أخت"
          ],
          "correctIndex": 1,
          "answer": "عمر/كبير",
          "explanationAr": "\"old\" /oʊld/ تعني: عمر/كبير. مثال: ten years old"
        },
        {
          "id": "scw_404_e2",
          "type": "meaning",
          "promptEn": "What does \"student\" mean?",
          "promptAr": "ما معنى \"student\"؟",
          "options": [
            "أخ",
            "مدرسة",
            "مفضّل",
            "طالب"
          ],
          "correctIndex": 3,
          "answer": "طالب",
          "explanationAr": "\"student\" /ˈstuːdənt/ تعني: طالب. مثال: a good student"
        },
        {
          "id": "scw_404_e3",
          "type": "meaning",
          "promptEn": "What does \"favourite\" mean?",
          "promptAr": "ما معنى \"favourite\"؟",
          "options": [
            "عمر/كبير",
            "طالب",
            "مفضّل",
            "عن"
          ],
          "correctIndex": 2,
          "answer": "مفضّل",
          "explanationAr": "\"favourite\" /ˈfeɪvərɪt/ تعني: مفضّل. مثال: my favourite colour"
        },
        {
          "id": "scw_404_e4",
          "type": "meaning",
          "promptEn": "What does \"hobby\" mean?",
          "promptAr": "ما معنى \"hobby\"؟",
          "options": [
            "كرة قدم",
            "هواية",
            "عن",
            "عمر/كبير"
          ],
          "correctIndex": 1,
          "answer": "هواية",
          "explanationAr": "\"hobby\" /ˈhɑːbi/ تعني: هواية. مثال: my hobby"
        }
      ],
      "medium": [
        {
          "id": "scw_404_m1",
          "type": "gap",
          "promptEn": "Complete: I ____ twelve years old.",
          "promptAr": "أكمل الفراغ: (عمري ١٢ سنة.)",
          "options": [
            "is",
            "am",
            "have"
          ],
          "correctIndex": 1,
          "answer": "I am twelve years old.",
          "explanationAr": "الإجابة: am. استخدم I am للعمر والصفة (I am ten. I am a student.)، وI live in للمكان، وI like للهواية، وMy ... is للأشياء. كل جملة فكرة وحدة."
        },
        {
          "id": "scw_404_m2",
          "type": "gap",
          "promptEn": "Complete: I live ____ Dammam.",
          "promptAr": "أكمل الفراغ: (أسكن في الدمام.)",
          "options": [
            "at",
            "in",
            "on"
          ],
          "correctIndex": 1,
          "answer": "I live in Dammam.",
          "explanationAr": "الإجابة: in. استخدم I am للعمر والصفة (I am ten. I am a student.)، وI live in للمكان، وI like للهواية، وMy ... is للأشياء. كل جملة فكرة وحدة."
        },
        {
          "id": "scw_404_m3",
          "type": "gap",
          "promptEn": "Complete: I ____ football.",
          "promptAr": "أكمل الفراغ: (أحب كرة القدم.)",
          "options": [
            "like",
            "liking",
            "likes"
          ],
          "correctIndex": 0,
          "answer": "I like football.",
          "explanationAr": "الإجابة: like. استخدم I am للعمر والصفة (I am ten. I am a student.)، وI live in للمكان، وI like للهواية، وMy ... is للأشياء. كل جملة فكرة وحدة."
        },
        {
          "id": "scw_404_m4",
          "type": "gap",
          "promptEn": "Complete: My favourite food ____ kabsa.",
          "promptAr": "أكمل الفراغ: (أكلتي المفضلة الكبسة.)",
          "options": [
            "are",
            "is",
            "am"
          ],
          "correctIndex": 1,
          "answer": "My favourite food is kabsa.",
          "explanationAr": "الإجابة: is. استخدم I am للعمر والصفة (I am ten. I am a student.)، وI live in للمكان، وI like للهواية، وMy ... is للأشياء. كل جملة فكرة وحدة."
        }
      ],
      "hard": [
        {
          "id": "scw_404_h1",
          "type": "order",
          "promptEn": "Put the words in order: student. / am / a / I",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (أنا طالب.)",
          "answer": "I am a student.",
          "explanationAr": "الترتيب الصحيح: I am a student."
        },
        {
          "id": "scw_404_h2",
          "type": "order",
          "promptEn": "Put the words in order: brothers. / I / two / have",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (عندي أخوين.)",
          "answer": "I have two brothers.",
          "explanationAr": "الترتيب الصحيح: I have two brothers."
        },
        {
          "id": "scw_404_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أسكن في الدمام.",
          "answer": "I live in Dammam.",
          "explanationAr": "ترجمة مقترحة: I live in Dammam."
        },
        {
          "id": "scw_404_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أكلتي المفضلة الكبسة.",
          "answer": "My favourite food is kabsa.",
          "explanationAr": "ترجمة مقترحة: My favourite food is kabsa."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Translating «عندي ١٢ سنة»",
        "correct": "I am 12 years old.",
        "whyAr": "الترجمة الحرفية تعطي have."
      },
      {
        "incorrect": "Writing all ideas in one long sentence",
        "correct": "Short sentences, one idea each",
        "whyAr": "في البداية الجمل القصيرة أوضح."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (الحرف الكبير والنقطة): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I like tea.",
          "i like tea."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I like tea. — I دائماً كبيرة.",
        "fromLessonId": "scw_401"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (عمري ١٢ سنة.)",
          "questionEn": "Complete: I ____ twelve years old.",
          "options": [
            "is",
            "am",
            "have"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: am. استخدم I am للعمر والصفة (I am ten. I am a student.)، وI live in للمكان، وI like للهواية، وMy ... is للأشياء. كل جملة فكرة وحدة."
        },
        {
          "questionAr": "أكمل الفراغ: (أسكن في الدمام.)",
          "questionEn": "Complete: I live ____ Dammam.",
          "options": [
            "at",
            "in",
            "on"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: in. استخدم I am للعمر والصفة (I am ten. I am a student.)، وI live in للمكان، وI like للهواية، وMy ... is للأشياء. كل جملة فكرة وحدة."
        },
        {
          "questionAr": "أكمل: I ___ ten years old.",
          "questionEn": "Complete: I ___ ten years old.",
          "options": [
            "have",
            "am",
            "is"
          ],
          "correctIndex": 1,
          "explanationAr": "am للعمر."
        },
        {
          "questionAr": "أكمل: I like ___.",
          "questionEn": "Complete: I like ___.",
          "options": [
            "swim",
            "swimming",
            "swims"
          ],
          "correctIndex": 1,
          "explanationAr": "like + -ing."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "I am 12 years old.",
            "I have 12 years."
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: I am 12 years old. — العمر بـ am مو have."
        }
      ]
    }
  },
  {
    "id": "scw_405",
    "pillarId": "writing",
    "pillarNameAr": "الكتابة التعبيرية الحوارية",
    "pillarNameEn": "Conversational Writing & Quick Messaging",
    "pillarIcon": "✍️",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "أكتب عن عائلتي",
    "titleEn": "Writing About My Family",
    "descAr": "صف أفراد عائلتك بجمل بسيطة مع he/she/they وhas/have.",
    "descEn": "Describe your family using he/she/they and has/have.",
    "speakingGoalAr": "اكتب ٦ جمل عن عائلتك.",
    "speakingGoalEn": "Write six sentences about your family.",
    "keyPattern": {
      "ruleAr": "He/She + is/has (My father is a teacher. She has long hair.)، They + are/have. استخدم my للملكية. افصل الأسماء بفواصل وand قبل آخر اسم.",
      "ruleEn": "He/She is/has; They are/have. Use my. Lists: commas + and before the last item.",
      "formula": "My + person + is/has ... | They are/have ..."
    },
    "practicalExamples": [
      {
        "en": "My father is a doctor.",
        "ar": "أبوي دكتور."
      },
      {
        "en": "My mother has a small car.",
        "ar": "أمي عندها سيارة صغيرة."
      },
      {
        "en": "My brothers are tall.",
        "ar": "إخواني طوال."
      },
      {
        "en": "I have a father, a mother and two sisters.",
        "ar": "عندي أب وأم وأختين."
      },
      {
        "en": "My grandfather lives with us.",
        "ar": "جدي ساكن معنا."
      },
      {
        "en": "We are a big family.",
        "ar": "إحنا عائلة كبيرة."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "My sister have a cat.",
        "correct": "My sister has a cat.",
        "whyAr": "مع she/he/المفرد: has."
      },
      {
        "incorrect": "My father he is a teacher.",
        "correct": "My father is a teacher.",
        "whyAr": "لا تكرر الفاعل بضمير."
      },
      {
        "incorrect": "She is my brother.",
        "correct": "He is my brother.",
        "whyAr": "he للذكر، she للأنثى."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اكتب ٦ جمل عن عائلتك.",
      "promptEn": "Write six sentences about your family.",
      "saraQuestionAr": "عرّفني على عائلتك كتابةً!",
      "saraQuestionEn": "Introduce your family in writing!",
      "recommendedResponseEn": "I have a big family. My father is an engineer. My mother is a teacher. I have two brothers and a sister. My grandmother lives with us. She is very kind."
    },
    "quiz": [
      {
        "questionAr": "أكمل: My brother ___ a bike.",
        "questionEn": "Complete: My brother ___ a bike.",
        "options": [
          "have",
          "has",
          "having"
        ],
        "correctIndex": 1,
        "explanationAr": "المفرد ⇐ has."
      },
      {
        "questionAr": "أكمل: They ___ my cousins.",
        "questionEn": "Complete: They ___ my cousins.",
        "options": [
          "is",
          "am",
          "are"
        ],
        "correctIndex": 2,
        "explanationAr": "they ⇐ are."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "My sister have a cat.",
          "My sister has a cat."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: My sister has a cat. — مع she/he/المفرد: has."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "My father is a teacher.",
          "My father he is a teacher."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: My father is a teacher. — لا تكرر الفاعل بضمير."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "She is my brother.",
          "He is my brother."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: He is my brother. — he للذكر، she للأنثى."
      }
    ],
    "whiteboardNotes": {
      "title": "Writing About My Family",
      "pointsAr": [
        "يكتب جمل عن أفراد العائلة.",
        "يستخدم has/have صح.",
        "يكتب قائمة بالفواصل وand.",
        "He/She + is/has (My father is a teacher. She has long hair.)، They + are/have. استخدم my للملكية. افصل الأسماء بفواصل وand قبل آخر اسم."
      ],
      "pointsEn": [
        "Write sentences about family members.",
        "Use has/have correctly.",
        "Write a list with commas and 'and'.",
        "He/She is/has; They are/have. Use my. Lists: commas + and before the last item."
      ],
      "chalkHighlight": "My + person + is/has ... | They are/have ..."
    },
    "unit": 1,
    "cefr": "Pre-A1",
    "objectivesAr": [
      "يكتب جمل عن أفراد العائلة.",
      "يستخدم has/have صح.",
      "يكتب قائمة بالفواصل وand."
    ],
    "objectivesEn": [
      "Write sentences about family members.",
      "Use has/have correctly.",
      "Write a list with commas and 'and'."
    ],
    "vocabulary": [
      {
        "word": "father",
        "ipa": "/ˈfɑːðər/",
        "ar": "أب",
        "exampleEn": "my father",
        "exampleAr": "أبوي"
      },
      {
        "word": "mother",
        "ipa": "/ˈmʌðər/",
        "ar": "أم",
        "exampleEn": "my mother",
        "exampleAr": "أمي"
      },
      {
        "word": "grandfather",
        "ipa": "/ˈɡrænfɑːðər/",
        "ar": "جد",
        "exampleEn": "my grandfather",
        "exampleAr": "جدي"
      },
      {
        "word": "grandmother",
        "ipa": "/ˈɡrænmʌðər/",
        "ar": "جدة",
        "exampleEn": "my grandmother",
        "exampleAr": "جدتي"
      },
      {
        "word": "uncle",
        "ipa": "/ˈʌŋkəl/",
        "ar": "عم/خال",
        "exampleEn": "my uncle",
        "exampleAr": "عمي/خالي"
      },
      {
        "word": "aunt",
        "ipa": "/ænt/",
        "ar": "عمة/خالة",
        "exampleEn": "my aunt",
        "exampleAr": "عمتي/خالتي"
      },
      {
        "word": "cousin",
        "ipa": "/ˈkʌzən/",
        "ar": "ولد/بنت العم أو الخال",
        "exampleEn": "my cousin",
        "exampleAr": "ولد عمي"
      },
      {
        "word": "tall",
        "ipa": "/tɔːl/",
        "ar": "طويل",
        "exampleEn": "very tall",
        "exampleAr": "طويل مرة"
      },
      {
        "word": "kind",
        "ipa": "/kaɪnd/",
        "ar": "طيب",
        "exampleEn": "a kind man",
        "exampleAr": "رجل طيب"
      },
      {
        "word": "family",
        "ipa": "/ˈfæməli/",
        "ar": "عائلة",
        "exampleEn": "my family",
        "exampleAr": "عائلتي"
      }
    ],
    "grammarFocus": {
      "ruleAr": "He/She + is/has (My father is a teacher. She has long hair.)، They + are/have. استخدم my للملكية. افصل الأسماء بفواصل وand قبل آخر اسم.",
      "ruleEn": "He/She is/has; They are/have. Use my. Lists: commas + and before the last item.",
      "formula": "My + person + is/has ... | They are/have ...",
      "examples": [
        {
          "en": "My father is a doctor.",
          "ar": "أبوي دكتور."
        },
        {
          "en": "My mother has a small car.",
          "ar": "أمي عندها سيارة صغيرة."
        },
        {
          "en": "My brothers are tall.",
          "ar": "إخواني طوال."
        },
        {
          "en": "I have a father, a mother and two sisters.",
          "ar": "عندي أب وأم وأختين."
        },
        {
          "en": "My grandfather lives with us.",
          "ar": "جدي ساكن معنا."
        },
        {
          "en": "We are a big family.",
          "ar": "إحنا عائلة كبيرة."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Is your family big?",
        "ar": "عائلتك كبيرة؟"
      },
      {
        "speaker": "Student",
        "en": "Yes. I have three brothers and one sister.",
        "ar": "إيه. عندي ثلاث إخوان وأخت."
      },
      {
        "speaker": "Sara",
        "en": "What does your father do?",
        "ar": "وش يشتغل أبوك؟"
      },
      {
        "speaker": "Student",
        "en": "He is an engineer at Aramco.",
        "ar": "مهندس في أرامكو."
      },
      {
        "speaker": "Sara",
        "en": "And your mother?",
        "ar": "وأمك؟"
      },
      {
        "speaker": "Student",
        "en": "She is a teacher. She is very kind.",
        "ar": "معلمة. طيبة مرة."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Is your family big?\nStudent: Yes. I have three brothers and one sister.\nSara: What does your father do?\nStudent: He is an engineer at Aramco.\nSara: And your mother?\nStudent: She is a teacher. She is very kind.",
      "questions": [
        {
          "questionAr": "كم أخ؟",
          "questionEn": "How many brothers?",
          "options": [
            "two",
            "three",
            "four"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: three"
        },
        {
          "questionAr": "وين يشتغل أبوه؟",
          "questionEn": "Where does his father work?",
          "options": [
            "a bank",
            "Aramco",
            "a school"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: Aramco"
        },
        {
          "questionAr": "وش شغل أمه؟",
          "questionEn": "What is his mother?",
          "options": [
            "a doctor",
            "a teacher",
            "a nurse"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: a teacher"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "The 'th' in family words",
      "items": [
        "father /ˈfɑːðər/",
        "mother /ˈmʌðər/",
        "brother /ˈbrʌðər/"
      ],
      "tipAr": "th هنا /ð/ مثل «ذ»، مو «ز» ولا «د»."
    },
    "exercises": {
      "easy": [
        {
          "id": "scw_405_e1",
          "type": "meaning",
          "promptEn": "What does \"father\" mean?",
          "promptAr": "ما معنى \"father\"؟",
          "options": [
            "عمة/خالة",
            "أم",
            "ولد/بنت العم أو الخال",
            "أب"
          ],
          "correctIndex": 3,
          "answer": "أب",
          "explanationAr": "\"father\" /ˈfɑːðər/ تعني: أب. مثال: my father"
        },
        {
          "id": "scw_405_e2",
          "type": "meaning",
          "promptEn": "What does \"mother\" mean?",
          "promptAr": "ما معنى \"mother\"؟",
          "options": [
            "عمة/خالة",
            "جد",
            "عائلة",
            "أم"
          ],
          "correctIndex": 3,
          "answer": "أم",
          "explanationAr": "\"mother\" /ˈmʌðər/ تعني: أم. مثال: my mother"
        },
        {
          "id": "scw_405_e3",
          "type": "meaning",
          "promptEn": "What does \"grandfather\" mean?",
          "promptAr": "ما معنى \"grandfather\"؟",
          "options": [
            "ولد/بنت العم أو الخال",
            "طيب",
            "جد",
            "عائلة"
          ],
          "correctIndex": 2,
          "answer": "جد",
          "explanationAr": "\"grandfather\" /ˈɡrænfɑːðər/ تعني: جد. مثال: my grandfather"
        },
        {
          "id": "scw_405_e4",
          "type": "meaning",
          "promptEn": "What does \"grandmother\" mean?",
          "promptAr": "ما معنى \"grandmother\"؟",
          "options": [
            "طويل",
            "عمة/خالة",
            "جدة",
            "طيب"
          ],
          "correctIndex": 2,
          "answer": "جدة",
          "explanationAr": "\"grandmother\" /ˈɡrænmʌðər/ تعني: جدة. مثال: my grandmother"
        }
      ],
      "medium": [
        {
          "id": "scw_405_m1",
          "type": "gap",
          "promptEn": "Complete: My father ____ a doctor.",
          "promptAr": "أكمل الفراغ: (أبوي دكتور.)",
          "options": [
            "is",
            "are",
            "am"
          ],
          "correctIndex": 0,
          "answer": "My father is a doctor.",
          "explanationAr": "الإجابة: is. He/She + is/has (My father is a teacher. She has long hair.)، They + are/have. استخدم my للملكية. افصل الأسماء بفواصل وand قبل آخر اسم."
        },
        {
          "id": "scw_405_m2",
          "type": "gap",
          "promptEn": "Complete: My mother ____ a small car.",
          "promptAr": "أكمل الفراغ: (أمي عندها سيارة صغيرة.)",
          "options": [
            "has",
            "have",
            "haves"
          ],
          "correctIndex": 0,
          "answer": "My mother has a small car.",
          "explanationAr": "الإجابة: has. He/She + is/has (My father is a teacher. She has long hair.)، They + are/have. استخدم my للملكية. افصل الأسماء بفواصل وand قبل آخر اسم."
        },
        {
          "id": "scw_405_m3",
          "type": "gap",
          "promptEn": "Complete: My brothers ____ tall.",
          "promptAr": "أكمل الفراغ: (إخواني طوال.)",
          "options": [
            "am",
            "is",
            "are"
          ],
          "correctIndex": 2,
          "answer": "My brothers are tall.",
          "explanationAr": "الإجابة: are. He/She + is/has (My father is a teacher. She has long hair.)، They + are/have. استخدم my للملكية. افصل الأسماء بفواصل وand قبل آخر اسم."
        },
        {
          "id": "scw_405_m4",
          "type": "gap",
          "promptEn": "Complete: I have a father, a mother ____ two sisters.",
          "promptAr": "أكمل الفراغ: (عندي أب وأم وأختين.)",
          "options": [
            "but",
            "or",
            "and"
          ],
          "correctIndex": 2,
          "answer": "I have a father, a mother and two sisters.",
          "explanationAr": "الإجابة: and. He/She + is/has (My father is a teacher. She has long hair.)، They + are/have. استخدم my للملكية. افصل الأسماء بفواصل وand قبل آخر اسم."
        }
      ],
      "hard": [
        {
          "id": "scw_405_h1",
          "type": "order",
          "promptEn": "Put the words in order: grandfather / us. / My / with / lives",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (جدي ساكن معنا.)",
          "answer": "My grandfather lives with us.",
          "explanationAr": "الترتيب الصحيح: My grandfather lives with us."
        },
        {
          "id": "scw_405_h2",
          "type": "order",
          "promptEn": "Put the words in order: big / a / family. / We / are",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (إحنا عائلة كبيرة.)",
          "answer": "We are a big family.",
          "explanationAr": "الترتيب الصحيح: We are a big family."
        },
        {
          "id": "scw_405_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أمي عندها سيارة صغيرة.",
          "answer": "My mother has a small car.",
          "explanationAr": "ترجمة مقترحة: My mother has a small car."
        },
        {
          "id": "scw_405_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: عندي أب وأم وأختين.",
          "answer": "I have a father, a mother and two sisters.",
          "explanationAr": "ترجمة مقترحة: I have a father, a mother and two sisters."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "«my uncle» for both عم and خال without detail",
        "correct": "my uncle (father's side) if needed",
        "whyAr": "الإنجليزي ما يفرق؛ وضّح إذا تحتاج."
      },
      {
        "incorrect": "Saying 'my cousin brother'",
        "correct": "my cousin",
        "whyAr": "cousin تكفي."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (أكتب عن نفسي): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I live in Taif.",
          "I am live in Taif."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I live in Taif. — لا تجمع am مع فعل.",
        "fromLessonId": "scw_404"
      },
      {
        "questionAr": "ما معنى \"word\"؟",
        "questionEn": "What does \"word\" mean?",
        "options": [
          "جملة",
          "مدينة",
          "الاثنين",
          "كلمة"
        ],
        "correctIndex": 3,
        "explanationAr": "\"word\" /wɜːrd/ تعني: كلمة. مثال: one word",
        "fromLessonId": "scw_401"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (أبوي دكتور.)",
          "questionEn": "Complete: My father ____ a doctor.",
          "options": [
            "is",
            "are",
            "am"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: is. He/She + is/has (My father is a teacher. She has long hair.)، They + are/have. استخدم my للملكية. افصل الأسماء بفواصل وand قبل آخر اسم."
        },
        {
          "questionAr": "أكمل الفراغ: (أمي عندها سيارة صغيرة.)",
          "questionEn": "Complete: My mother ____ a small car.",
          "options": [
            "has",
            "have",
            "haves"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: has. He/She + is/has (My father is a teacher. She has long hair.)، They + are/have. استخدم my للملكية. افصل الأسماء بفواصل وand قبل آخر اسم."
        },
        {
          "questionAr": "أكمل: My brother ___ a bike.",
          "questionEn": "Complete: My brother ___ a bike.",
          "options": [
            "have",
            "has",
            "having"
          ],
          "correctIndex": 1,
          "explanationAr": "المفرد ⇐ has."
        },
        {
          "questionAr": "أكمل: They ___ my cousins.",
          "questionEn": "Complete: They ___ my cousins.",
          "options": [
            "is",
            "am",
            "are"
          ],
          "correctIndex": 2,
          "explanationAr": "they ⇐ are."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "My sister have a cat.",
            "My sister has a cat."
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: My sister has a cat. — مع she/he/المفرد: has."
        }
      ]
    }
  },
  {
    "id": "scw_406",
    "pillarId": "writing",
    "pillarNameAr": "الكتابة التعبيرية الحوارية",
    "pillarNameEn": "Conversational Writing & Quick Messaging",
    "pillarIcon": "✍️",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "علامة الاستفهام وكتابة الأسئلة",
    "titleEn": "Question Marks and Simple Questions",
    "descAr": "اكتب أسئلة بسيطة بعلامة ؟ الإنجليزية (?) وبترتيب صحيح.",
    "descEn": "Write simple questions with correct word order and '?'.",
    "speakingGoalAr": "اكتب ٥ أسئلة لصديق جديد.",
    "speakingGoalEn": "Write five questions for a new friend.",
    "keyPattern": {
      "ruleAr": "السؤال يبدأ بكلمة سؤال (What, Where, How old) أو بفعل (Are, Do, Can) ويختم بـ ? وليس ؟. الترتيب: Question word + are/is + you...? أو Do + you + verb...?",
      "ruleEn": "Questions start with a wh-word or a verb and end with '?'. Wh + be + subject? / Do + subject + verb?",
      "formula": "What is your name? | Do you like tea? | Are you OK?"
    },
    "practicalExamples": [
      {
        "en": "What is your name?",
        "ar": "وش اسمك؟"
      },
      {
        "en": "Where do you live?",
        "ar": "وين تسكن؟"
      },
      {
        "en": "Do you like pizza?",
        "ar": "تحب البيتزا؟"
      },
      {
        "en": "Are you a student?",
        "ar": "أنت طالب؟"
      },
      {
        "en": "How old are you?",
        "ar": "كم عمرك؟"
      },
      {
        "en": "Can you swim?",
        "ar": "تعرف تسبح؟"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "What your name?",
        "correct": "What is your name?",
        "whyAr": "لا تنسى is."
      },
      {
        "incorrect": "You like tea?",
        "correct": "Do you like tea?",
        "whyAr": "في الكتابة استخدم Do."
      },
      {
        "incorrect": "Where you live؟",
        "correct": "Where do you live?",
        "whyAr": "do + علامة ? الإنجليزية."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اكتب ٥ أسئلة لصديق جديد.",
      "promptEn": "Write five questions for a new friend.",
      "saraQuestionAr": "تخيل جاك زميل جديد، وش تسأله؟",
      "saraQuestionEn": "Imagine a new classmate. What do you ask?",
      "recommendedResponseEn": "What is your name? How old are you? Where do you live? Do you like football? Can you swim?"
    },
    "quiz": [
      {
        "questionAr": "رتب: you / where / live / do",
        "questionEn": "Order: you / where / live / do",
        "options": [
          "Where you do live?",
          "Where do you live?",
          "Do where you live?"
        ],
        "correctIndex": 1,
        "explanationAr": "Wh + do + you + verb."
      },
      {
        "questionAr": "أي سؤال صحيح؟",
        "questionEn": "Which is correct?",
        "options": [
          "Are you hungry?",
          "You hungry?",
          "Do you hungry?"
        ],
        "correctIndex": 0,
        "explanationAr": "be + subject + adjective."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "What your name?",
          "What is your name?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: What is your name? — لا تنسى is."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Do you like tea?",
          "You like tea?"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Do you like tea? — في الكتابة استخدم Do."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Where do you live?",
          "Where you live؟"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Where do you live? — do + علامة ? الإنجليزية."
      }
    ],
    "whiteboardNotes": {
      "title": "Question Marks and Simple Questions",
      "pointsAr": [
        "يكتب علامة الاستفهام الإنجليزية.",
        "يرتب السؤال صح.",
        "يسأل بـ Wh وبـ Do/Are.",
        "السؤال يبدأ بكلمة سؤال (What, Where, How old) أو بفعل (Are, Do, Can) ويختم بـ ? وليس ؟. الترتيب: Question word + are/is + you...? أو Do + you + verb...?"
      ],
      "pointsEn": [
        "Use the English '?'.",
        "Order question words correctly.",
        "Ask wh- and yes/no questions.",
        "Questions start with a wh-word or a verb and end with '?'. Wh + be + subject? / Do + subject + verb?"
      ],
      "chalkHighlight": "What is your name? | Do you like tea? | Are you OK?"
    },
    "unit": 1,
    "cefr": "Pre-A1",
    "objectivesAr": [
      "يكتب علامة الاستفهام الإنجليزية.",
      "يرتب السؤال صح.",
      "يسأل بـ Wh وبـ Do/Are."
    ],
    "objectivesEn": [
      "Use the English '?'.",
      "Order question words correctly.",
      "Ask wh- and yes/no questions."
    ],
    "vocabulary": [
      {
        "word": "what",
        "ipa": "/wʌt/",
        "ar": "ماذا/وش",
        "exampleEn": "What is it?",
        "exampleAr": "وش هذا؟"
      },
      {
        "word": "where",
        "ipa": "/wɛr/",
        "ar": "وين",
        "exampleEn": "Where is it?",
        "exampleAr": "وينه؟"
      },
      {
        "word": "who",
        "ipa": "/huː/",
        "ar": "مين",
        "exampleEn": "Who is he?",
        "exampleAr": "مين هو؟"
      },
      {
        "word": "when",
        "ipa": "/wɛn/",
        "ar": "متى",
        "exampleEn": "When is it?",
        "exampleAr": "متى؟"
      },
      {
        "word": "how old",
        "ipa": "/haʊ oʊld/",
        "ar": "كم العمر",
        "exampleEn": "How old is she?",
        "exampleAr": "كم عمرها؟"
      },
      {
        "word": "question",
        "ipa": "/ˈkwɛstʃən/",
        "ar": "سؤال",
        "exampleEn": "a good question",
        "exampleAr": "سؤال حلو"
      },
      {
        "word": "answer",
        "ipa": "/ˈænsər/",
        "ar": "جواب",
        "exampleEn": "the answer",
        "exampleAr": "الجواب"
      },
      {
        "word": "question mark",
        "ipa": "/ˈkwɛstʃən mɑːrk/",
        "ar": "علامة استفهام",
        "exampleEn": "Add a question mark.",
        "exampleAr": "حط علامة استفهام."
      },
      {
        "word": "favourite",
        "ipa": "/ˈfeɪvərɪt/",
        "ar": "مفضّل",
        "exampleEn": "your favourite game",
        "exampleAr": "لعبتك المفضلة"
      },
      {
        "word": "can",
        "ipa": "/kæn/",
        "ar": "يقدر/يعرف",
        "exampleEn": "Can you cook?",
        "exampleAr": "تعرف تطبخ؟"
      }
    ],
    "grammarFocus": {
      "ruleAr": "السؤال يبدأ بكلمة سؤال (What, Where, How old) أو بفعل (Are, Do, Can) ويختم بـ ? وليس ؟. الترتيب: Question word + are/is + you...? أو Do + you + verb...?",
      "ruleEn": "Questions start with a wh-word or a verb and end with '?'. Wh + be + subject? / Do + subject + verb?",
      "formula": "What is your name? | Do you like tea? | Are you OK?",
      "examples": [
        {
          "en": "What is your name?",
          "ar": "وش اسمك؟"
        },
        {
          "en": "Where do you live?",
          "ar": "وين تسكن؟"
        },
        {
          "en": "Do you like pizza?",
          "ar": "تحب البيتزا؟"
        },
        {
          "en": "Are you a student?",
          "ar": "أنت طالب؟"
        },
        {
          "en": "How old are you?",
          "ar": "كم عمرك؟"
        },
        {
          "en": "Can you swim?",
          "ar": "تعرف تسبح؟"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "You have a new classmate, Omar. Write questions for him.",
        "ar": "عندك زميل جديد، عمر. اكتب له أسئلة."
      },
      {
        "speaker": "Student",
        "en": "What is your name? Where are you from?",
        "ar": "وش اسمك؟ من وين أنت؟"
      },
      {
        "speaker": "Sara",
        "en": "Good. One more?",
        "ar": "حلو. واحد زيادة؟"
      },
      {
        "speaker": "Student",
        "en": "Do you like football?",
        "ar": "تحب الكورة؟"
      },
      {
        "speaker": "Omar",
        "en": "Yes, I do! Do you play?",
        "ar": "إيه! أنت تلعب؟"
      },
      {
        "speaker": "Student",
        "en": "Yes. Let's play after school.",
        "ar": "إيه. خلنا نلعب بعد المدرسة."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: You have a new classmate, Omar. Write questions for him.\nStudent: What is your name? Where are you from?\nSara: Good. One more?\nStudent: Do you like football?\nOmar: Yes, I do! Do you play?\nStudent: Yes. Let's play after school.",
      "questions": [
        {
          "questionAr": "مين الجديد؟",
          "questionEn": "Who is new?",
          "options": [
            "Sara",
            "Omar",
            "Ali"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: Omar"
        },
        {
          "questionAr": "عمر يحب الكورة؟",
          "questionEn": "Does Omar like football?",
          "options": [
            "yes",
            "no",
            "not sure"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: yes"
        },
        {
          "questionAr": "متى بيلعبون؟",
          "questionEn": "When will they play?",
          "options": [
            "at break",
            "after school",
            "Friday"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: after school"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Question intonation",
      "items": [
        "Do you like pizza? ↗",
        "What is your name? ↘"
      ],
      "tipAr": "أسئلة نعم/لا ترتفع ↗، وأسئلة wh تنزل ↘."
    },
    "exercises": {
      "easy": [
        {
          "id": "scw_406_e1",
          "type": "meaning",
          "promptEn": "What does \"what\" mean?",
          "promptAr": "ما معنى \"what\"؟",
          "options": [
            "يقدر/يعرف",
            "ماذا/وش",
            "مفضّل",
            "كم العمر"
          ],
          "correctIndex": 1,
          "answer": "ماذا/وش",
          "explanationAr": "\"what\" /wʌt/ تعني: ماذا/وش. مثال: What is it?"
        },
        {
          "id": "scw_406_e2",
          "type": "meaning",
          "promptEn": "What does \"where\" mean?",
          "promptAr": "ما معنى \"where\"؟",
          "options": [
            "جواب",
            "وين",
            "متى",
            "مين"
          ],
          "correctIndex": 1,
          "answer": "وين",
          "explanationAr": "\"where\" /wɛr/ تعني: وين. مثال: Where is it?"
        },
        {
          "id": "scw_406_e3",
          "type": "meaning",
          "promptEn": "What does \"who\" mean?",
          "promptAr": "ما معنى \"who\"؟",
          "options": [
            "سؤال",
            "مين",
            "جواب",
            "كم العمر"
          ],
          "correctIndex": 1,
          "answer": "مين",
          "explanationAr": "\"who\" /huː/ تعني: مين. مثال: Who is he?"
        },
        {
          "id": "scw_406_e4",
          "type": "meaning",
          "promptEn": "What does \"when\" mean?",
          "promptAr": "ما معنى \"when\"؟",
          "options": [
            "مفضّل",
            "ماذا/وش",
            "متى",
            "علامة استفهام"
          ],
          "correctIndex": 2,
          "answer": "متى",
          "explanationAr": "\"when\" /wɛn/ تعني: متى. مثال: When is it?"
        }
      ],
      "medium": [
        {
          "id": "scw_406_m1",
          "type": "gap",
          "promptEn": "Complete: ____ is your name?",
          "promptAr": "أكمل الفراغ: (وش اسمك؟)",
          "options": [
            "What",
            "Where",
            "Who"
          ],
          "correctIndex": 0,
          "answer": "What is your name?",
          "explanationAr": "الإجابة: What. السؤال يبدأ بكلمة سؤال (What, Where, How old) أو بفعل (Are, Do, Can) ويختم بـ ? وليس ؟. الترتيب: Question word + are/is + you...? أو Do + you + verb...?"
        },
        {
          "id": "scw_406_m2",
          "type": "gap",
          "promptEn": "Complete: ____ do you live?",
          "promptAr": "أكمل الفراغ: (وين تسكن؟)",
          "options": [
            "What",
            "When",
            "Where"
          ],
          "correctIndex": 2,
          "answer": "Where do you live?",
          "explanationAr": "الإجابة: Where. السؤال يبدأ بكلمة سؤال (What, Where, How old) أو بفعل (Are, Do, Can) ويختم بـ ? وليس ؟. الترتيب: Question word + are/is + you...? أو Do + you + verb...?"
        },
        {
          "id": "scw_406_m3",
          "type": "gap",
          "promptEn": "Complete: ____ you like pizza?",
          "promptAr": "أكمل الفراغ: (تحب البيتزا؟)",
          "options": [
            "Do",
            "Does",
            "Are"
          ],
          "correctIndex": 0,
          "answer": "Do you like pizza?",
          "explanationAr": "الإجابة: Do. السؤال يبدأ بكلمة سؤال (What, Where, How old) أو بفعل (Are, Do, Can) ويختم بـ ? وليس ؟. الترتيب: Question word + are/is + you...? أو Do + you + verb...?"
        },
        {
          "id": "scw_406_m4",
          "type": "gap",
          "promptEn": "Complete: ____ you a student?",
          "promptAr": "أكمل الفراغ: (أنت طالب؟)",
          "options": [
            "Do",
            "Is",
            "Are"
          ],
          "correctIndex": 2,
          "answer": "Are you a student?",
          "explanationAr": "الإجابة: Are. السؤال يبدأ بكلمة سؤال (What, Where, How old) أو بفعل (Are, Do, Can) ويختم بـ ? وليس ؟. الترتيب: Question word + are/is + you...? أو Do + you + verb...?"
        }
      ],
      "hard": [
        {
          "id": "scw_406_h1",
          "type": "order",
          "promptEn": "Put the words in order: are / you? / How / old",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (كم عمرك؟)",
          "answer": "How old are you?",
          "explanationAr": "الترتيب الصحيح: How old are you?"
        },
        {
          "id": "scw_406_h2",
          "type": "order",
          "promptEn": "Put the words in order: you / swim? / Can",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (تعرف تسبح؟)",
          "answer": "Can you swim?",
          "explanationAr": "الترتيب الصحيح: Can you swim?"
        },
        {
          "id": "scw_406_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: وين تسكن؟",
          "answer": "Where do you live?",
          "explanationAr": "ترجمة مقترحة: Where do you live?"
        },
        {
          "id": "scw_406_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أنت طالب؟",
          "answer": "Are you a student?",
          "explanationAr": "ترجمة مقترحة: Are you a student?"
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Using Arabic ؟ in English",
        "correct": "Use ?",
        "whyAr": "الشكل مختلف: ? مقلوب عن العربي."
      },
      {
        "incorrect": "Statement order with ?: You are tired?",
        "correct": "Are you tired?",
        "whyAr": "قدّم الفعل في السؤال المكتوب."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (أكتب عن عائلتي): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "My father he is a teacher.",
          "My father is a teacher."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: My father is a teacher. — لا تكرر الفاعل بضمير.",
        "fromLessonId": "scw_405"
      },
      {
        "questionAr": "مراجعة (الحرف الكبير والنقطة): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "my name is ali",
          "My name is Ali."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: My name is Ali. — حرف كبير في البداية وفي الاسم، ونقطة في الآخر.",
        "fromLessonId": "scw_401"
      },
      {
        "questionAr": "ما معنى \"about\"؟",
        "questionEn": "What does \"about\" mean?",
        "options": [
          "عمر/كبير",
          "مدرسة",
          "عن",
          "أخت"
        ],
        "correctIndex": 2,
        "explanationAr": "\"about\" /əˈbaʊt/ تعني: عن. مثال: about me",
        "fromLessonId": "scw_404"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (وش اسمك؟)",
          "questionEn": "Complete: ____ is your name?",
          "options": [
            "What",
            "Where",
            "Who"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: What. السؤال يبدأ بكلمة سؤال (What, Where, How old) أو بفعل (Are, Do, Can) ويختم بـ ? وليس ؟. الترتيب: Question word + are/is + you...? أو Do + you + verb...?"
        },
        {
          "questionAr": "أكمل الفراغ: (وين تسكن؟)",
          "questionEn": "Complete: ____ do you live?",
          "options": [
            "What",
            "When",
            "Where"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: Where. السؤال يبدأ بكلمة سؤال (What, Where, How old) أو بفعل (Are, Do, Can) ويختم بـ ? وليس ؟. الترتيب: Question word + are/is + you...? أو Do + you + verb...?"
        },
        {
          "questionAr": "رتب: you / where / live / do",
          "questionEn": "Order: you / where / live / do",
          "options": [
            "Where you do live?",
            "Where do you live?",
            "Do where you live?"
          ],
          "correctIndex": 1,
          "explanationAr": "Wh + do + you + verb."
        },
        {
          "questionAr": "أي سؤال صحيح؟",
          "questionEn": "Which is correct?",
          "options": [
            "Are you hungry?",
            "You hungry?",
            "Do you hungry?"
          ],
          "correctIndex": 0,
          "explanationAr": "be + subject + adjective."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "What your name?",
            "What is your name?"
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: What is your name? — لا تنسى is."
        }
      ]
    }
  },
  {
    "id": "scw_407",
    "pillarId": "writing",
    "pillarNameAr": "الكتابة التعبيرية الحوارية",
    "pillarNameEn": "Conversational Writing & Quick Messaging",
    "pillarIcon": "✍️",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "رسائل الواتساب القصيرة: التحية والرد",
    "titleEn": "Short Chat Messages: Greetings and Replies",
    "descAr": "اكتب رسالة قصيرة لصديق: سلام، سؤال عن الحال، وخبر صغير.",
    "descEn": "Write short chat messages: greet, ask how they are, share news.",
    "speakingGoalAr": "اكتب محادثة واتساب من ٦ رسائل.",
    "speakingGoalEn": "Write a six-message chat.",
    "keyPattern": {
      "ruleAr": "الرسالة الودية: تحية (Hi / Hey) + سؤال (How are you?) + خبر أو طلب + ختام (See you! / Take care!). جمل قصيرة، واختصارات الكلام مقبولة (I'm, it's) مع الأصدقاء فقط.",
      "ruleEn": "Friendly message = greeting + question + news/request + closing. Short sentences; contractions are fine with friends.",
      "formula": "Hi + name! How are you? + news. See you!"
    },
    "practicalExamples": [
      {
        "en": "Hi Khalid! How are you?",
        "ar": "هلا خالد! كيفك؟"
      },
      {
        "en": "I'm fine, thanks. And you?",
        "ar": "بخير، شكراً. وأنت؟"
      },
      {
        "en": "I'm at the mall now.",
        "ar": "أنا في المول الحين."
      },
      {
        "en": "See you tomorrow!",
        "ar": "أشوفك بكرة!"
      },
      {
        "en": "Thanks for the photo!",
        "ar": "شكراً على الصورة!"
      },
      {
        "en": "Take care. Bye!",
        "ar": "انتبه لنفسك. باي!"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Im fine.",
        "correct": "I'm fine.",
        "whyAr": "الفاصلة العليا (') لازمة."
      },
      {
        "incorrect": "How are you? I fine.",
        "correct": "I'm fine.",
        "whyAr": "لا تحذف am."
      },
      {
        "incorrect": "See you tomorrow inshallah?",
        "correct": "See you tomorrow, inshallah!",
        "whyAr": "بدون ? إذا مو سؤال."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اكتب لسارة رسالة واتساب: سلام + خبر + سؤال.",
      "promptEn": "Write Sara a chat message: greeting + news + question.",
      "saraQuestionAr": "أرسل لي رسالة وكأني صديقتك!",
      "saraQuestionEn": "Message me like a friend!",
      "recommendedResponseEn": "Hi Sara! How are you? I'm at the beach with my family. It's very hot! Are you free tomorrow?"
    },
    "quiz": [
      {
        "questionAr": "الاختصار الصحيح لـ I am:",
        "questionEn": "Short form of 'I am':",
        "options": [
          "Im",
          "I'm",
          "Ia'm"
        ],
        "correctIndex": 1,
        "explanationAr": "I'm."
      },
      {
        "questionAr": "أنسب ختام لرسالة صديق:",
        "questionEn": "Best closing for a friend:",
        "options": [
          "Yours faithfully",
          "See you!",
          "Dear sir"
        ],
        "correctIndex": 1,
        "explanationAr": "See you!"
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'm fine.",
          "Im fine."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I'm fine. — الفاصلة العليا (') لازمة."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "How are you? I fine.",
          "I'm fine."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I'm fine. — لا تحذف am."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "See you tomorrow, inshallah!",
          "See you tomorrow inshallah?"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: See you tomorrow, inshallah! — بدون ? إذا مو سؤال."
      }
    ],
    "whiteboardNotes": {
      "title": "Short Chat Messages: Greetings and Replies",
      "pointsAr": [
        "يكتب رسالة ودية قصيرة.",
        "يستخدم الاختصارات I'm/it's صح.",
        "يرد على رسالة بشكل مناسب.",
        "الرسالة الودية: تحية (Hi / Hey) + سؤال (How are you?) + خبر أو طلب + ختام (See you! / Take care!). جمل قصيرة، واختصارات الكلام مقبولة (I'm, it's) مع الأصدقاء فقط."
      ],
      "pointsEn": [
        "Write a short friendly message.",
        "Use contractions correctly.",
        "Reply appropriately.",
        "Friendly message = greeting + question + news/request + closing. Short sentences; contractions are fine with friends."
      ],
      "chalkHighlight": "Hi + name! How are you? + news. See you!"
    },
    "unit": 1,
    "cefr": "A1",
    "objectivesAr": [
      "يكتب رسالة ودية قصيرة.",
      "يستخدم الاختصارات I'm/it's صح.",
      "يرد على رسالة بشكل مناسب."
    ],
    "objectivesEn": [
      "Write a short friendly message.",
      "Use contractions correctly.",
      "Reply appropriately."
    ],
    "vocabulary": [
      {
        "word": "message",
        "ipa": "/ˈmɛsɪdʒ/",
        "ar": "رسالة",
        "exampleEn": "send a message",
        "exampleAr": "أرسل رسالة"
      },
      {
        "word": "reply",
        "ipa": "/rɪˈplaɪ/",
        "ar": "يرد",
        "exampleEn": "Please reply.",
        "exampleAr": "رد لو سمحت."
      },
      {
        "word": "fine",
        "ipa": "/faɪn/",
        "ar": "بخير",
        "exampleEn": "I'm fine.",
        "exampleAr": "أنا بخير."
      },
      {
        "word": "tomorrow",
        "ipa": "/təˈmɑːroʊ/",
        "ar": "بكرة",
        "exampleEn": "see you tomorrow",
        "exampleAr": "أشوفك بكرة"
      },
      {
        "word": "now",
        "ipa": "/naʊ/",
        "ar": "الحين",
        "exampleEn": "I'm busy now.",
        "exampleAr": "مشغول الحين."
      },
      {
        "word": "busy",
        "ipa": "/ˈbɪzi/",
        "ar": "مشغول",
        "exampleEn": "very busy",
        "exampleAr": "مشغول مرة"
      },
      {
        "word": "free",
        "ipa": "/friː/",
        "ar": "فاضي",
        "exampleEn": "Are you free?",
        "exampleAr": "فاضي؟"
      },
      {
        "word": "photo",
        "ipa": "/ˈfoʊtoʊ/",
        "ar": "صورة",
        "exampleEn": "a nice photo",
        "exampleAr": "صورة حلوة"
      },
      {
        "word": "take care",
        "ipa": "/teɪk kɛr/",
        "ar": "انتبه لنفسك",
        "exampleEn": "Take care!",
        "exampleAr": "انتبه لنفسك!"
      },
      {
        "word": "later",
        "ipa": "/ˈleɪtər/",
        "ar": "بعدين",
        "exampleEn": "talk later",
        "exampleAr": "نتكلم بعدين"
      }
    ],
    "grammarFocus": {
      "ruleAr": "الرسالة الودية: تحية (Hi / Hey) + سؤال (How are you?) + خبر أو طلب + ختام (See you! / Take care!). جمل قصيرة، واختصارات الكلام مقبولة (I'm, it's) مع الأصدقاء فقط.",
      "ruleEn": "Friendly message = greeting + question + news/request + closing. Short sentences; contractions are fine with friends.",
      "formula": "Hi + name! How are you? + news. See you!",
      "examples": [
        {
          "en": "Hi Khalid! How are you?",
          "ar": "هلا خالد! كيفك؟"
        },
        {
          "en": "I'm fine, thanks. And you?",
          "ar": "بخير، شكراً. وأنت؟"
        },
        {
          "en": "I'm at the mall now.",
          "ar": "أنا في المول الحين."
        },
        {
          "en": "See you tomorrow!",
          "ar": "أشوفك بكرة!"
        },
        {
          "en": "Thanks for the photo!",
          "ar": "شكراً على الصورة!"
        },
        {
          "en": "Take care. Bye!",
          "ar": "انتبه لنفسك. باي!"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Khalid",
        "en": "Hey! How are you?",
        "ar": "هلا! كيفك؟"
      },
      {
        "speaker": "Student",
        "en": "Hi Khalid! I'm good, thanks. You?",
        "ar": "هلا خالد! تمام، شكراً. وأنت؟"
      },
      {
        "speaker": "Khalid",
        "en": "Fine. Are you free tonight?",
        "ar": "تمام. فاضي الليلة؟"
      },
      {
        "speaker": "Student",
        "en": "Sorry, I'm busy. Tomorrow?",
        "ar": "آسف، مشغول. بكرة؟"
      },
      {
        "speaker": "Khalid",
        "en": "OK, tomorrow at 8.",
        "ar": "تمام، بكرة الساعة ٨."
      },
      {
        "speaker": "Student",
        "en": "Great! See you then.",
        "ar": "ممتاز! أشوفك."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Khalid: Hey! How are you?\nStudent: Hi Khalid! I'm good, thanks. You?\nKhalid: Fine. Are you free tonight?\nStudent: Sorry, I'm busy. Tomorrow?\nKhalid: OK, tomorrow at 8.\nStudent: Great! See you then.",
      "questions": [
        {
          "questionAr": "فاضي الليلة؟",
          "questionEn": "Is the student free tonight?",
          "options": [
            "yes",
            "no",
            "maybe"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: no"
        },
        {
          "questionAr": "متى بيتقابلون؟",
          "questionEn": "When will they meet?",
          "options": [
            "tonight",
            "tomorrow at 8",
            "Friday"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: tomorrow at 8"
        },
        {
          "questionAr": "كيف خالد؟",
          "questionEn": "How is Khalid?",
          "options": [
            "sick",
            "fine",
            "tired"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: fine"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Contractions",
      "items": [
        "I am → I'm /aɪm/",
        "it is → it's /ɪts/",
        "you are → you're /jʊr/"
      ],
      "tipAr": "الاختصار ينكتب بفاصلة عليا وينطق مقطع واحد."
    },
    "exercises": {
      "easy": [
        {
          "id": "scw_407_e1",
          "type": "meaning",
          "promptEn": "What does \"message\" mean?",
          "promptAr": "ما معنى \"message\"؟",
          "options": [
            "صورة",
            "مشغول",
            "بعدين",
            "رسالة"
          ],
          "correctIndex": 3,
          "answer": "رسالة",
          "explanationAr": "\"message\" /ˈmɛsɪdʒ/ تعني: رسالة. مثال: send a message"
        },
        {
          "id": "scw_407_e2",
          "type": "meaning",
          "promptEn": "What does \"reply\" mean?",
          "promptAr": "ما معنى \"reply\"؟",
          "options": [
            "مشغول",
            "انتبه لنفسك",
            "بكرة",
            "يرد"
          ],
          "correctIndex": 3,
          "answer": "يرد",
          "explanationAr": "\"reply\" /rɪˈplaɪ/ تعني: يرد. مثال: Please reply."
        },
        {
          "id": "scw_407_e3",
          "type": "meaning",
          "promptEn": "What does \"fine\" mean?",
          "promptAr": "ما معنى \"fine\"؟",
          "options": [
            "صورة",
            "بخير",
            "فاضي",
            "انتبه لنفسك"
          ],
          "correctIndex": 1,
          "answer": "بخير",
          "explanationAr": "\"fine\" /faɪn/ تعني: بخير. مثال: I'm fine."
        },
        {
          "id": "scw_407_e4",
          "type": "meaning",
          "promptEn": "What does \"tomorrow\" mean?",
          "promptAr": "ما معنى \"tomorrow\"؟",
          "options": [
            "فاضي",
            "بكرة",
            "الحين",
            "مشغول"
          ],
          "correctIndex": 1,
          "answer": "بكرة",
          "explanationAr": "\"tomorrow\" /təˈmɑːroʊ/ تعني: بكرة. مثال: see you tomorrow"
        }
      ],
      "medium": [
        {
          "id": "scw_407_m1",
          "type": "gap",
          "promptEn": "Complete: Hi Khalid! ____ are you?",
          "promptAr": "أكمل الفراغ: (هلا خالد! كيفك؟)",
          "options": [
            "What",
            "How",
            "Who"
          ],
          "correctIndex": 1,
          "answer": "Hi Khalid! How are you?",
          "explanationAr": "الإجابة: How. الرسالة الودية: تحية (Hi / Hey) + سؤال (How are you?) + خبر أو طلب + ختام (See you! / Take care!). جمل قصيرة، واختصارات الكلام مقبولة (I'm, it's) مع الأصدقاء فقط."
        },
        {
          "id": "scw_407_m2",
          "type": "gap",
          "promptEn": "Complete: ____ fine, thanks. And you?",
          "promptAr": "أكمل الفراغ: (بخير، شكراً. وأنت؟)",
          "options": [
            "I'm",
            "Im",
            "I am'"
          ],
          "correctIndex": 0,
          "answer": "I'm fine, thanks. And you?",
          "explanationAr": "الإجابة: I'm. الرسالة الودية: تحية (Hi / Hey) + سؤال (How are you?) + خبر أو طلب + ختام (See you! / Take care!). جمل قصيرة، واختصارات الكلام مقبولة (I'm, it's) مع الأصدقاء فقط."
        },
        {
          "id": "scw_407_m3",
          "type": "gap",
          "promptEn": "Complete: I'm ____ the mall now.",
          "promptAr": "أكمل الفراغ: (أنا في المول الحين.)",
          "options": [
            "on",
            "to",
            "at"
          ],
          "correctIndex": 2,
          "answer": "I'm at the mall now.",
          "explanationAr": "الإجابة: at. الرسالة الودية: تحية (Hi / Hey) + سؤال (How are you?) + خبر أو طلب + ختام (See you! / Take care!). جمل قصيرة، واختصارات الكلام مقبولة (I'm, it's) مع الأصدقاء فقط."
        },
        {
          "id": "scw_407_m4",
          "type": "gap",
          "promptEn": "Complete: ____ you tomorrow!",
          "promptAr": "أكمل الفراغ: (أشوفك بكرة!)",
          "options": [
            "See",
            "Look",
            "Watch"
          ],
          "correctIndex": 0,
          "answer": "See you tomorrow!",
          "explanationAr": "الإجابة: See. الرسالة الودية: تحية (Hi / Hey) + سؤال (How are you?) + خبر أو طلب + ختام (See you! / Take care!). جمل قصيرة، واختصارات الكلام مقبولة (I'm, it's) مع الأصدقاء فقط."
        }
      ],
      "hard": [
        {
          "id": "scw_407_h1",
          "type": "order",
          "promptEn": "Put the words in order: the / for / photo! / Thanks",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (شكراً على الصورة!)",
          "answer": "Thanks for the photo!",
          "explanationAr": "الترتيب الصحيح: Thanks for the photo!"
        },
        {
          "id": "scw_407_h2",
          "type": "order",
          "promptEn": "Put the words in order: Bye! / care. / Take",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (انتبه لنفسك. باي!)",
          "answer": "Take care. Bye!",
          "explanationAr": "الترتيب الصحيح: Take care. Bye!"
        },
        {
          "id": "scw_407_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: بخير، شكراً. وأنت؟",
          "answer": "I'm fine, thanks. And you?",
          "explanationAr": "ترجمة مقترحة: I'm fine, thanks. And you?"
        },
        {
          "id": "scw_407_h4",
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
        "incorrect": "Writing 'Hi' then a long paragraph",
        "correct": "Short lines in chats",
        "whyAr": "الواتساب رسائل قصيرة."
      },
      {
        "incorrect": "Replying 'Fine' only, no question back",
        "correct": "I'm fine, thanks. And you?",
        "whyAr": "من الأدب ترجع السؤال."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (علامة الاستفهام وكتابة الأسئلة): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "You like tea?",
          "Do you like tea?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Do you like tea? — في الكتابة استخدم Do.",
        "fromLessonId": "scw_406"
      },
      {
        "questionAr": "مراجعة (أكتب عن نفسي): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I am 12 years old.",
          "I have 12 years."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I am 12 years old. — العمر بـ am مو have.",
        "fromLessonId": "scw_404"
      },
      {
        "questionAr": "ما معنى \"family\"؟",
        "questionEn": "What does \"family\" mean?",
        "options": [
          "عائلة",
          "طيب",
          "عم/خال",
          "أب"
        ],
        "correctIndex": 0,
        "explanationAr": "\"family\" /ˈfæməli/ تعني: عائلة. مثال: my family",
        "fromLessonId": "scw_405"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (هلا خالد! كيفك؟)",
          "questionEn": "Complete: Hi Khalid! ____ are you?",
          "options": [
            "What",
            "How",
            "Who"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: How. الرسالة الودية: تحية (Hi / Hey) + سؤال (How are you?) + خبر أو طلب + ختام (See you! / Take care!). جمل قصيرة، واختصارات الكلام مقبولة (I'm, it's) مع الأصدقاء فقط."
        },
        {
          "questionAr": "أكمل الفراغ: (بخير، شكراً. وأنت؟)",
          "questionEn": "Complete: ____ fine, thanks. And you?",
          "options": [
            "I'm",
            "Im",
            "I am'"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: I'm. الرسالة الودية: تحية (Hi / Hey) + سؤال (How are you?) + خبر أو طلب + ختام (See you! / Take care!). جمل قصيرة، واختصارات الكلام مقبولة (I'm, it's) مع الأصدقاء فقط."
        },
        {
          "questionAr": "الاختصار الصحيح لـ I am:",
          "questionEn": "Short form of 'I am':",
          "options": [
            "Im",
            "I'm",
            "Ia'm"
          ],
          "correctIndex": 1,
          "explanationAr": "I'm."
        },
        {
          "questionAr": "أنسب ختام لرسالة صديق:",
          "questionEn": "Best closing for a friend:",
          "options": [
            "Yours faithfully",
            "See you!",
            "Dear sir"
          ],
          "correctIndex": 1,
          "explanationAr": "See you!"
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "I'm fine.",
            "Im fine."
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: I'm fine. — الفاصلة العليا (') لازمة."
        }
      ]
    }
  },
  {
    "id": "scw_408",
    "pillarId": "writing",
    "pillarNameAr": "الكتابة التعبيرية الحوارية",
    "pillarNameEn": "Conversational Writing & Quick Messaging",
    "pillarIcon": "✍️",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "ربط الجمل بـ and و but",
    "titleEn": "Joining Sentences with and and but",
    "descAr": "بدل جمل قصيرة متقطعة، اربطها بـ and (إضافة) وbut (عكس).",
    "descEn": "Link short sentences with and (addition) and but (contrast).",
    "speakingGoalAr": "حوّل ٨ جمل قصيرة إلى ٤ جمل مربوطة.",
    "speakingGoalEn": "Combine eight short sentences into four.",
    "keyPattern": {
      "ruleAr": "and = و (إضافة فكرة متشابهة): I like tea and coffee. but = بس/لكن (فكرة معاكسة): I like tea, but I don't like coffee. حط فاصلة قبل but غالباً. لا تبدأ كل جملة بـ and.",
      "ruleEn": "and adds similar ideas; but shows contrast (usually with a comma before it).",
      "formula": "Sentence 1 + and + Sentence 2 | Sentence 1, but + Sentence 2"
    },
    "practicalExamples": [
      {
        "en": "I like tea and dates.",
        "ar": "أحب الشاي والتمر."
      },
      {
        "en": "It's hot, but I'm happy.",
        "ar": "الجو حار، بس أنا مبسوط."
      },
      {
        "en": "My room is small, but it's nice.",
        "ar": "غرفتي صغيرة بس حلوة."
      },
      {
        "en": "I play football and my brother plays tennis.",
        "ar": "أنا ألعب كورة وأخوي يلعب تنس."
      },
      {
        "en": "She is tired, but she is still studying.",
        "ar": "هي تعبانة بس لسى تذاكر."
      },
      {
        "en": "We went to the park and had ice cream.",
        "ar": "رحنا الحديقة وأكلنا آيسكريم."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "I like tea, and I don't like coffee.",
        "correct": "I like tea, but I don't like coffee.",
        "whyAr": "الفكرتين متعاكسة ⇐ but."
      },
      {
        "incorrect": "And I go to school. And I study.",
        "correct": "I go to school and study.",
        "whyAr": "لا تبدأ كل جملة بـ and."
      },
      {
        "incorrect": "It's cheap but good but small.",
        "correct": "It's cheap and good, but small.",
        "whyAr": "لا تكرر but."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اكتب ٣ جمل عن مدينتك فيها and و but.",
      "promptEn": "Write three sentences about your city with and/but.",
      "saraQuestionAr": "صف مدينتك: الحلو والمو حلو.",
      "saraQuestionEn": "Describe your city: good and bad.",
      "recommendedResponseEn": "Riyadh is big and modern. It's hot in summer, but the winter is lovely. There are many malls and parks."
    },
    "quiz": [
      {
        "questionAr": "أكمل: I'm hungry, ___ there's no food.",
        "questionEn": "Complete: I'm hungry, ___ there's no food.",
        "options": [
          "and",
          "but",
          "or"
        ],
        "correctIndex": 1,
        "explanationAr": "عكس ⇐ but."
      },
      {
        "questionAr": "أكمل: I have a cat ___ a dog.",
        "questionEn": "Complete: I have a cat ___ a dog.",
        "options": [
          "but",
          "and",
          "because"
        ],
        "correctIndex": 1,
        "explanationAr": "إضافة ⇐ and."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I like tea, but I don't like coffee.",
          "I like tea, and I don't like coffee."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I like tea, but I don't like coffee. — الفكرتين متعاكسة ⇐ but."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "And I go to school. And I study.",
          "I go to school and study."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I go to school and study. — لا تبدأ كل جملة بـ and."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "It's cheap but good but small.",
          "It's cheap and good, but small."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: It's cheap and good, but small. — لا تكرر but."
      }
    ],
    "whiteboardNotes": {
      "title": "Joining Sentences with and and but",
      "pointsAr": [
        "يربط بـ and.",
        "يعبر عن التضاد بـ but.",
        "يضع الفاصلة قبل but.",
        "and = و (إضافة فكرة متشابهة): I like tea and coffee. but = بس/لكن (فكرة معاكسة): I like tea, but I don't like coffee. حط فاصلة قبل but غالباً. لا تبدأ كل جملة بـ and."
      ],
      "pointsEn": [
        "Link with and.",
        "Show contrast with but.",
        "Use a comma before but.",
        "and adds similar ideas; but shows contrast (usually with a comma before it)."
      ],
      "chalkHighlight": "Sentence 1 + and + Sentence 2 | Sentence 1, but + Sentence 2"
    },
    "unit": 2,
    "cefr": "A1",
    "objectivesAr": [
      "يربط بـ and.",
      "يعبر عن التضاد بـ but.",
      "يضع الفاصلة قبل but."
    ],
    "objectivesEn": [
      "Link with and.",
      "Show contrast with but.",
      "Use a comma before but."
    ],
    "vocabulary": [
      {
        "word": "and",
        "ipa": "/ænd/",
        "ar": "و",
        "exampleEn": "you and me",
        "exampleAr": "أنا وأنت"
      },
      {
        "word": "but",
        "ipa": "/bʌt/",
        "ar": "لكن/بس",
        "exampleEn": "small but nice",
        "exampleAr": "صغير بس حلو"
      },
      {
        "word": "also",
        "ipa": "/ˈɔːlsoʊ/",
        "ar": "أيضاً",
        "exampleEn": "I also like it.",
        "exampleAr": "أنا بعد أحبه."
      },
      {
        "word": "expensive",
        "ipa": "/ɪkˈspɛnsɪv/",
        "ar": "غالي",
        "exampleEn": "too expensive",
        "exampleAr": "غالي مرة"
      },
      {
        "word": "cheap",
        "ipa": "/tʃiːp/",
        "ar": "رخيص",
        "exampleEn": "a cheap phone",
        "exampleAr": "جوال رخيص"
      },
      {
        "word": "tired",
        "ipa": "/taɪərd/",
        "ar": "تعبان",
        "exampleEn": "I'm tired.",
        "exampleAr": "تعبان."
      },
      {
        "word": "happy",
        "ipa": "/ˈhæpi/",
        "ar": "مبسوط",
        "exampleEn": "very happy",
        "exampleAr": "مبسوط مرة"
      },
      {
        "word": "still",
        "ipa": "/stɪl/",
        "ar": "لسى/مازال",
        "exampleEn": "still here",
        "exampleAr": "لسى هنا"
      },
      {
        "word": "small",
        "ipa": "/smɔːl/",
        "ar": "صغير",
        "exampleEn": "a small room",
        "exampleAr": "غرفة صغيرة"
      },
      {
        "word": "nice",
        "ipa": "/naɪs/",
        "ar": "حلو",
        "exampleEn": "a nice day",
        "exampleAr": "يوم حلو"
      }
    ],
    "grammarFocus": {
      "ruleAr": "and = و (إضافة فكرة متشابهة): I like tea and coffee. but = بس/لكن (فكرة معاكسة): I like tea, but I don't like coffee. حط فاصلة قبل but غالباً. لا تبدأ كل جملة بـ and.",
      "ruleEn": "and adds similar ideas; but shows contrast (usually with a comma before it).",
      "formula": "Sentence 1 + and + Sentence 2 | Sentence 1, but + Sentence 2",
      "examples": [
        {
          "en": "I like tea and dates.",
          "ar": "أحب الشاي والتمر."
        },
        {
          "en": "It's hot, but I'm happy.",
          "ar": "الجو حار، بس أنا مبسوط."
        },
        {
          "en": "My room is small, but it's nice.",
          "ar": "غرفتي صغيرة بس حلوة."
        },
        {
          "en": "I play football and my brother plays tennis.",
          "ar": "أنا ألعب كورة وأخوي يلعب تنس."
        },
        {
          "en": "She is tired, but she is still studying.",
          "ar": "هي تعبانة بس لسى تذاكر."
        },
        {
          "en": "We went to the park and had ice cream.",
          "ar": "رحنا الحديقة وأكلنا آيسكريم."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Join these: 'The phone is new. It is expensive.'",
        "ar": "اربط: الجوال جديد. وهو غالي."
      },
      {
        "speaker": "Student",
        "en": "The phone is new and expensive.",
        "ar": "الجوال جديد وغالي."
      },
      {
        "speaker": "Sara",
        "en": "Now: 'The car is old. It is fast.'",
        "ar": "الحين: السيارة قديمة. وهي سريعة."
      },
      {
        "speaker": "Student",
        "en": "The car is old, but it is fast.",
        "ar": "السيارة قديمة بس سريعة."
      },
      {
        "speaker": "Sara",
        "en": "Why but?",
        "ar": "ليش but؟"
      },
      {
        "speaker": "Student",
        "en": "Because old and fast are opposite ideas.",
        "ar": "لأن قديمة وسريعة أفكار متعاكسة."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Join these: 'The phone is new. It is expensive.'\nStudent: The phone is new and expensive.\nSara: Now: 'The car is old. It is fast.'\nStudent: The car is old, but it is fast.\nSara: Why but?\nStudent: Because old and fast are opposite ideas.",
      "questions": [
        {
          "questionAr": "تستخدم:",
          "questionEn": "'new and expensive' uses:",
          "options": [
            "and",
            "but",
            "so"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: and"
        },
        {
          "questionAr": "السيارة قديمة بس...",
          "questionEn": "The car is old but...",
          "options": [
            "slow",
            "fast",
            "red"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: fast"
        },
        {
          "questionAr": "ليش but؟",
          "questionEn": "Why 'but'?",
          "options": [
            "same ideas",
            "opposite ideas",
            "a list"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: opposite ideas"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Weak 'and', strong 'but'",
      "items": [
        "tea and coffee /ˈtiː ən ˈkɑːfi/",
        "small, but nice /bʌt/"
      ],
      "tipAr": "and تنطق خفيفة /ən/ داخل الجملة."
    },
    "exercises": {
      "easy": [
        {
          "id": "scw_408_e1",
          "type": "meaning",
          "promptEn": "What does \"and\" mean?",
          "promptAr": "ما معنى \"and\"؟",
          "options": [
            "صغير",
            "مبسوط",
            "و",
            "لكن/بس"
          ],
          "correctIndex": 2,
          "answer": "و",
          "explanationAr": "\"and\" /ænd/ تعني: و. مثال: you and me"
        },
        {
          "id": "scw_408_e2",
          "type": "meaning",
          "promptEn": "What does \"but\" mean?",
          "promptAr": "ما معنى \"but\"؟",
          "options": [
            "صغير",
            "غالي",
            "لكن/بس",
            "حلو"
          ],
          "correctIndex": 2,
          "answer": "لكن/بس",
          "explanationAr": "\"but\" /bʌt/ تعني: لكن/بس. مثال: small but nice"
        },
        {
          "id": "scw_408_e3",
          "type": "meaning",
          "promptEn": "What does \"also\" mean?",
          "promptAr": "ما معنى \"also\"؟",
          "options": [
            "أيضاً",
            "لكن/بس",
            "صغير",
            "رخيص"
          ],
          "correctIndex": 0,
          "answer": "أيضاً",
          "explanationAr": "\"also\" /ˈɔːlsoʊ/ تعني: أيضاً. مثال: I also like it."
        },
        {
          "id": "scw_408_e4",
          "type": "meaning",
          "promptEn": "What does \"expensive\" mean?",
          "promptAr": "ما معنى \"expensive\"؟",
          "options": [
            "تعبان",
            "غالي",
            "لكن/بس",
            "لسى/مازال"
          ],
          "correctIndex": 1,
          "answer": "غالي",
          "explanationAr": "\"expensive\" /ɪkˈspɛnsɪv/ تعني: غالي. مثال: too expensive"
        }
      ],
      "medium": [
        {
          "id": "scw_408_m1",
          "type": "gap",
          "promptEn": "Complete: I like tea ____ dates.",
          "promptAr": "أكمل الفراغ: (أحب الشاي والتمر.)",
          "options": [
            "and",
            "but",
            "or"
          ],
          "correctIndex": 0,
          "answer": "I like tea and dates.",
          "explanationAr": "الإجابة: and. and = و (إضافة فكرة متشابهة): I like tea and coffee. but = بس/لكن (فكرة معاكسة): I like tea, but I don't like coffee. حط فاصلة قبل but غالباً. لا تبدأ كل جملة بـ and."
        },
        {
          "id": "scw_408_m2",
          "type": "gap",
          "promptEn": "Complete: It's hot, ____ I'm happy.",
          "promptAr": "أكمل الفراغ: (الجو حار، بس أنا مبسوط.)",
          "options": [
            "so",
            "but",
            "and"
          ],
          "correctIndex": 1,
          "answer": "It's hot, but I'm happy.",
          "explanationAr": "الإجابة: but. and = و (إضافة فكرة متشابهة): I like tea and coffee. but = بس/لكن (فكرة معاكسة): I like tea, but I don't like coffee. حط فاصلة قبل but غالباً. لا تبدأ كل جملة بـ and."
        },
        {
          "id": "scw_408_m3",
          "type": "gap",
          "promptEn": "Complete: My room is small, ____ it's nice.",
          "promptAr": "أكمل الفراغ: (غرفتي صغيرة بس حلوة.)",
          "options": [
            "and",
            "but",
            "or"
          ],
          "correctIndex": 1,
          "answer": "My room is small, but it's nice.",
          "explanationAr": "الإجابة: but. and = و (إضافة فكرة متشابهة): I like tea and coffee. but = بس/لكن (فكرة معاكسة): I like tea, but I don't like coffee. حط فاصلة قبل but غالباً. لا تبدأ كل جملة بـ and."
        },
        {
          "id": "scw_408_m4",
          "type": "gap",
          "promptEn": "Complete: I play football ____ my brother plays tennis.",
          "promptAr": "أكمل الفراغ: (أنا ألعب كورة وأخوي يلعب تنس.)",
          "options": [
            "and",
            "because",
            "but"
          ],
          "correctIndex": 0,
          "answer": "I play football and my brother plays tennis.",
          "explanationAr": "الإجابة: and. and = و (إضافة فكرة متشابهة): I like tea and coffee. but = بس/لكن (فكرة معاكسة): I like tea, but I don't like coffee. حط فاصلة قبل but غالباً. لا تبدأ كل جملة بـ and."
        }
      ],
      "hard": [
        {
          "id": "scw_408_h1",
          "type": "order",
          "promptEn": "Put the words in order: she / She / is / tired, / but / is / studying. / still",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (هي تعبانة بس لسى تذاكر.)",
          "answer": "She is tired, but she is still studying.",
          "explanationAr": "الترتيب الصحيح: She is tired, but she is still studying."
        },
        {
          "id": "scw_408_h2",
          "type": "order",
          "promptEn": "Put the words in order: went / We / cream. / and / the / park / had / ice / to",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (رحنا الحديقة وأكلنا آيسكريم.)",
          "answer": "We went to the park and had ice cream.",
          "explanationAr": "الترتيب الصحيح: We went to the park and had ice cream."
        },
        {
          "id": "scw_408_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: الجو حار، بس أنا مبسوط.",
          "answer": "It's hot, but I'm happy.",
          "explanationAr": "ترجمة مقترحة: It's hot, but I'm happy."
        },
        {
          "id": "scw_408_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أنا ألعب كورة وأخوي يلعب تنس.",
          "answer": "I play football and my brother plays tennis.",
          "explanationAr": "ترجمة مقترحة: I play football and my brother plays tennis."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Starting sentences with 'And' like Arabic «و»",
        "correct": "Join inside one sentence",
        "whyAr": "العربي يبدأ بـ «و» كثير؛ الإنجليزي لا."
      },
      {
        "incorrect": "Using 'but' for addition",
        "correct": "and for addition",
        "whyAr": "but للعكس فقط."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (رسائل الواتساب القصيرة: التحية والرد): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "How are you? I fine.",
          "I'm fine."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I'm fine. — لا تحذف am.",
        "fromLessonId": "scw_407"
      },
      {
        "questionAr": "مراجعة (أكتب عن عائلتي): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "My sister have a cat.",
          "My sister has a cat."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: My sister has a cat. — مع she/he/المفرد: has.",
        "fromLessonId": "scw_405"
      },
      {
        "questionAr": "ما معنى \"can\"؟",
        "questionEn": "What does \"can\" mean?",
        "options": [
          "ماذا/وش",
          "جواب",
          "سؤال",
          "يقدر/يعرف"
        ],
        "correctIndex": 3,
        "explanationAr": "\"can\" /kæn/ تعني: يقدر/يعرف. مثال: Can you cook?",
        "fromLessonId": "scw_406"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (أحب الشاي والتمر.)",
          "questionEn": "Complete: I like tea ____ dates.",
          "options": [
            "and",
            "but",
            "or"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: and. and = و (إضافة فكرة متشابهة): I like tea and coffee. but = بس/لكن (فكرة معاكسة): I like tea, but I don't like coffee. حط فاصلة قبل but غالباً. لا تبدأ كل جملة بـ and."
        },
        {
          "questionAr": "أكمل الفراغ: (الجو حار، بس أنا مبسوط.)",
          "questionEn": "Complete: It's hot, ____ I'm happy.",
          "options": [
            "so",
            "but",
            "and"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: but. and = و (إضافة فكرة متشابهة): I like tea and coffee. but = بس/لكن (فكرة معاكسة): I like tea, but I don't like coffee. حط فاصلة قبل but غالباً. لا تبدأ كل جملة بـ and."
        },
        {
          "questionAr": "أكمل: I'm hungry, ___ there's no food.",
          "questionEn": "Complete: I'm hungry, ___ there's no food.",
          "options": [
            "and",
            "but",
            "or"
          ],
          "correctIndex": 1,
          "explanationAr": "عكس ⇐ but."
        },
        {
          "questionAr": "أكمل: I have a cat ___ a dog.",
          "questionEn": "Complete: I have a cat ___ a dog.",
          "options": [
            "but",
            "and",
            "because"
          ],
          "correctIndex": 1,
          "explanationAr": "إضافة ⇐ and."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "I like tea, but I don't like coffee.",
            "I like tea, and I don't like coffee."
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: I like tea, but I don't like coffee. — الفكرتين متعاكسة ⇐ but."
        }
      ]
    }
  },
  {
    "id": "scw_409",
    "pillarId": "writing",
    "pillarNameAr": "الكتابة التعبيرية الحوارية",
    "pillarNameEn": "Conversational Writing & Quick Messaging",
    "pillarIcon": "✍️",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "فقرة عن يومي",
    "titleEn": "A Paragraph About My Day",
    "descAr": "اكتب فقرة عن روتينك اليومي بالمضارع البسيط وكلمات الوقت.",
    "descEn": "Write about your daily routine using present simple and time words.",
    "speakingGoalAr": "اكتب فقرة من ٦–٨ جمل عن يومك.",
    "speakingGoalEn": "Write a 6–8 sentence routine paragraph.",
    "keyPattern": {
      "ruleAr": "المضارع البسيط للعادات: I wake up, he wakes up (s مع he/she). كلمات الوقت: at 6 o'clock, in the morning, after school, then. ابدأ الفقرة بجملة عامة (My day is busy.) ورتب الأحداث.",
      "ruleEn": "Present simple for habits (add -s with he/she). Time words: at 6, in the morning, then, after that. Start with a general sentence.",
      "formula": "Topic sentence + at/in time + routine verbs in order"
    },
    "practicalExamples": [
      {
        "en": "I wake up at six o'clock.",
        "ar": "أصحى الساعة ست."
      },
      {
        "en": "I pray Fajr and have breakfast.",
        "ar": "أصلي الفجر وأفطر."
      },
      {
        "en": "I go to school by bus.",
        "ar": "أروح المدرسة بالباص."
      },
      {
        "en": "In the evening, I do my homework.",
        "ar": "في المساء أحل واجبي."
      },
      {
        "en": "My sister goes to bed at nine.",
        "ar": "أختي تنام الساعة تسع."
      },
      {
        "en": "After that, I watch TV with my family.",
        "ar": "بعدها أتفرج تلفزيون مع أهلي."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "I go to school with bus.",
        "correct": "I go to school by bus.",
        "whyAr": "وسيلة المواصلات بـ by."
      },
      {
        "incorrect": "My brother wake up at 7.",
        "correct": "My brother wakes up at 7.",
        "whyAr": "he ⇐ wakes."
      },
      {
        "incorrect": "I make my homework.",
        "correct": "I do my homework.",
        "whyAr": "homework مع do."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اكتب فقرة عن يومك من ٦ جمل.",
      "promptEn": "Write a six-sentence paragraph about your day.",
      "saraQuestionAr": "من تصحى إلى تنام!",
      "saraQuestionEn": "From waking up to bedtime!",
      "recommendedResponseEn": "My day is busy. I wake up at 5:30 and pray Fajr. Then I have breakfast and go to school by bus. I come home at 2 and have lunch. In the evening, I do my homework. I go to bed at 10."
    },
    "quiz": [
      {
        "questionAr": "أكمل: I go to bed ___ 10 p.m.",
        "questionEn": "Complete: I go to bed ___ 10 p.m.",
        "options": [
          "in",
          "at",
          "on"
        ],
        "correctIndex": 1,
        "explanationAr": "الساعة ⇐ at."
      },
      {
        "questionAr": "أكمل: She ___ lunch at school.",
        "questionEn": "Complete: She ___ lunch at school.",
        "options": [
          "have",
          "has",
          "having"
        ],
        "correctIndex": 1,
        "explanationAr": "she ⇐ has."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I go to school by bus.",
          "I go to school with bus."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I go to school by bus. — وسيلة المواصلات بـ by."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "My brother wake up at 7.",
          "My brother wakes up at 7."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: My brother wakes up at 7. — he ⇐ wakes."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I make my homework.",
          "I do my homework."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I do my homework. — homework مع do."
      }
    ],
    "whiteboardNotes": {
      "title": "A Paragraph About My Day",
      "pointsAr": [
        "يستخدم المضارع البسيط للروتين.",
        "يستخدم at/in مع الوقت.",
        "يرتب الأحداث في فقرة.",
        "المضارع البسيط للعادات: I wake up, he wakes up (s مع he/she). كلمات الوقت: at 6 o'clock, in the morning, after school, then. ابدأ الفقرة بجملة عامة (My day is busy.) ورتب الأحداث."
      ],
      "pointsEn": [
        "Use present simple for routines.",
        "Use at/in with times.",
        "Order events in a paragraph.",
        "Present simple for habits (add -s with he/she). Time words: at 6, in the morning, then, after that. Start with a general sentence."
      ],
      "chalkHighlight": "Topic sentence + at/in time + routine verbs in order"
    },
    "unit": 2,
    "cefr": "A1",
    "objectivesAr": [
      "يستخدم المضارع البسيط للروتين.",
      "يستخدم at/in مع الوقت.",
      "يرتب الأحداث في فقرة."
    ],
    "objectivesEn": [
      "Use present simple for routines.",
      "Use at/in with times.",
      "Order events in a paragraph."
    ],
    "vocabulary": [
      {
        "word": "wake up",
        "ipa": "/weɪk ʌp/",
        "ar": "يصحى",
        "exampleEn": "wake up early",
        "exampleAr": "يصحى بدري"
      },
      {
        "word": "breakfast",
        "ipa": "/ˈbrɛkfəst/",
        "ar": "فطور",
        "exampleEn": "have breakfast",
        "exampleAr": "يفطر"
      },
      {
        "word": "homework",
        "ipa": "/ˈhoʊmwɜːrk/",
        "ar": "واجب",
        "exampleEn": "do homework",
        "exampleAr": "يحل الواجب"
      },
      {
        "word": "then",
        "ipa": "/ðɛn/",
        "ar": "بعدين",
        "exampleEn": "and then",
        "exampleAr": "وبعدين"
      },
      {
        "word": "after that",
        "ipa": "/ˈæftər ðæt/",
        "ar": "بعد كذا",
        "exampleEn": "After that, I sleep.",
        "exampleAr": "بعدها أنام."
      },
      {
        "word": "usually",
        "ipa": "/ˈjuːʒuəli/",
        "ar": "عادةً",
        "exampleEn": "I usually walk.",
        "exampleAr": "عادة أمشي."
      },
      {
        "word": "lunch",
        "ipa": "/lʌntʃ/",
        "ar": "غداء",
        "exampleEn": "have lunch",
        "exampleAr": "يتغدى"
      },
      {
        "word": "dinner",
        "ipa": "/ˈdɪnər/",
        "ar": "عشاء",
        "exampleEn": "have dinner",
        "exampleAr": "يتعشى"
      },
      {
        "word": "go to bed",
        "ipa": "/ɡoʊ tə bɛd/",
        "ar": "ينام",
        "exampleEn": "go to bed late",
        "exampleAr": "ينام متأخر"
      },
      {
        "word": "busy",
        "ipa": "/ˈbɪzi/",
        "ar": "مشغول/مزدحم",
        "exampleEn": "a busy day",
        "exampleAr": "يوم مزدحم"
      }
    ],
    "grammarFocus": {
      "ruleAr": "المضارع البسيط للعادات: I wake up, he wakes up (s مع he/she). كلمات الوقت: at 6 o'clock, in the morning, after school, then. ابدأ الفقرة بجملة عامة (My day is busy.) ورتب الأحداث.",
      "ruleEn": "Present simple for habits (add -s with he/she). Time words: at 6, in the morning, then, after that. Start with a general sentence.",
      "formula": "Topic sentence + at/in time + routine verbs in order",
      "examples": [
        {
          "en": "I wake up at six o'clock.",
          "ar": "أصحى الساعة ست."
        },
        {
          "en": "I pray Fajr and have breakfast.",
          "ar": "أصلي الفجر وأفطر."
        },
        {
          "en": "I go to school by bus.",
          "ar": "أروح المدرسة بالباص."
        },
        {
          "en": "In the evening, I do my homework.",
          "ar": "في المساء أحل واجبي."
        },
        {
          "en": "My sister goes to bed at nine.",
          "ar": "أختي تنام الساعة تسع."
        },
        {
          "en": "After that, I watch TV with my family.",
          "ar": "بعدها أتفرج تلفزيون مع أهلي."
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
        "en": "I wake up at five thirty for Fajr.",
        "ar": "أصحى خمس ونص للفجر."
      },
      {
        "speaker": "Sara",
        "en": "Then?",
        "ar": "وبعدين؟"
      },
      {
        "speaker": "Student",
        "en": "Then I have breakfast and go to school by bus.",
        "ar": "بعدين أفطر وأروح المدرسة بالباص."
      },
      {
        "speaker": "Sara",
        "en": "What do you do in the evening?",
        "ar": "وش تسوي في المساء؟"
      },
      {
        "speaker": "Student",
        "en": "I do my homework, and after that I play games.",
        "ar": "أحل واجبي، وبعدها ألعب ألعاب."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: What time do you wake up?\nStudent: I wake up at five thirty for Fajr.\nSara: Then?\nStudent: Then I have breakfast and go to school by bus.\nSara: What do you do in the evening?\nStudent: I do my homework, and after that I play games.",
      "questions": [
        {
          "questionAr": "متى يصحى؟",
          "questionEn": "When does he wake up?",
          "options": [
            "5:00",
            "5:30",
            "6:30"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: 5:30"
        },
        {
          "questionAr": "كيف يروح المدرسة؟",
          "questionEn": "How does he go to school?",
          "options": [
            "by car",
            "by bus",
            "on foot"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: by bus"
        },
        {
          "questionAr": "بعد الواجب؟",
          "questionEn": "What does he do after homework?",
          "options": [
            "sleeps",
            "plays games",
            "reads"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: plays games"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Final -s",
      "items": [
        "wakes /weɪks/",
        "goes /ɡoʊz/",
        "watches /ˈwɑːtʃɪz/"
      ],
      "tipAr": "مع he/she: الـ s تنطق /s/ أو /z/ أو /ɪz/."
    },
    "exercises": {
      "easy": [
        {
          "id": "scw_409_e1",
          "type": "meaning",
          "promptEn": "What does \"wake up\" mean?",
          "promptAr": "ما معنى \"wake up\"؟",
          "options": [
            "بعدين",
            "يصحى",
            "مشغول/مزدحم",
            "عشاء"
          ],
          "correctIndex": 1,
          "answer": "يصحى",
          "explanationAr": "\"wake up\" /weɪk ʌp/ تعني: يصحى. مثال: wake up early"
        },
        {
          "id": "scw_409_e2",
          "type": "meaning",
          "promptEn": "What does \"breakfast\" mean?",
          "promptAr": "ما معنى \"breakfast\"؟",
          "options": [
            "بعدين",
            "بعد كذا",
            "واجب",
            "فطور"
          ],
          "correctIndex": 3,
          "answer": "فطور",
          "explanationAr": "\"breakfast\" /ˈbrɛkfəst/ تعني: فطور. مثال: have breakfast"
        },
        {
          "id": "scw_409_e3",
          "type": "meaning",
          "promptEn": "What does \"homework\" mean?",
          "promptAr": "ما معنى \"homework\"؟",
          "options": [
            "عادةً",
            "بعد كذا",
            "واجب",
            "بعدين"
          ],
          "correctIndex": 2,
          "answer": "واجب",
          "explanationAr": "\"homework\" /ˈhoʊmwɜːrk/ تعني: واجب. مثال: do homework"
        },
        {
          "id": "scw_409_e4",
          "type": "meaning",
          "promptEn": "What does \"then\" mean?",
          "promptAr": "ما معنى \"then\"؟",
          "options": [
            "يصحى",
            "بعد كذا",
            "بعدين",
            "عادةً"
          ],
          "correctIndex": 2,
          "answer": "بعدين",
          "explanationAr": "\"then\" /ðɛn/ تعني: بعدين. مثال: and then"
        }
      ],
      "medium": [
        {
          "id": "scw_409_m1",
          "type": "gap",
          "promptEn": "Complete: I wake up ____ six o'clock.",
          "promptAr": "أكمل الفراغ: (أصحى الساعة ست.)",
          "options": [
            "on",
            "at",
            "in"
          ],
          "correctIndex": 1,
          "answer": "I wake up at six o'clock.",
          "explanationAr": "الإجابة: at. المضارع البسيط للعادات: I wake up, he wakes up (s مع he/she). كلمات الوقت: at 6 o'clock, in the morning, after school, then. ابدأ الفقرة بجملة عامة (My day is busy.) ورتب الأحداث."
        },
        {
          "id": "scw_409_m2",
          "type": "gap",
          "promptEn": "Complete: I pray Fajr and ____ breakfast.",
          "promptAr": "أكمل الفراغ: (أصلي الفجر وأفطر.)",
          "options": [
            "take",
            "have",
            "eat a"
          ],
          "correctIndex": 1,
          "answer": "I pray Fajr and have breakfast.",
          "explanationAr": "الإجابة: have. المضارع البسيط للعادات: I wake up, he wakes up (s مع he/she). كلمات الوقت: at 6 o'clock, in the morning, after school, then. ابدأ الفقرة بجملة عامة (My day is busy.) ورتب الأحداث."
        },
        {
          "id": "scw_409_m3",
          "type": "gap",
          "promptEn": "Complete: I go to school ____ bus.",
          "promptAr": "أكمل الفراغ: (أروح المدرسة بالباص.)",
          "options": [
            "on the",
            "with",
            "by"
          ],
          "correctIndex": 2,
          "answer": "I go to school by bus.",
          "explanationAr": "الإجابة: by. المضارع البسيط للعادات: I wake up, he wakes up (s مع he/she). كلمات الوقت: at 6 o'clock, in the morning, after school, then. ابدأ الفقرة بجملة عامة (My day is busy.) ورتب الأحداث."
        },
        {
          "id": "scw_409_m4",
          "type": "gap",
          "promptEn": "Complete: In the evening, I ____ my homework.",
          "promptAr": "أكمل الفراغ: (في المساء أحل واجبي.)",
          "options": [
            "doing",
            "make",
            "do"
          ],
          "correctIndex": 2,
          "answer": "In the evening, I do my homework.",
          "explanationAr": "الإجابة: do. المضارع البسيط للعادات: I wake up, he wakes up (s مع he/she). كلمات الوقت: at 6 o'clock, in the morning, after school, then. ابدأ الفقرة بجملة عامة (My day is busy.) ورتب الأحداث."
        }
      ],
      "hard": [
        {
          "id": "scw_409_h1",
          "type": "order",
          "promptEn": "Put the words in order: to / bed / sister / goes / nine. / at / My",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (أختي تنام الساعة تسع.)",
          "answer": "My sister goes to bed at nine.",
          "explanationAr": "الترتيب الصحيح: My sister goes to bed at nine."
        },
        {
          "id": "scw_409_h2",
          "type": "order",
          "promptEn": "Put the words in order: family. / my / I / watch / After / with / TV / that,",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (بعدها أتفرج تلفزيون مع أهلي.)",
          "answer": "After that, I watch TV with my family.",
          "explanationAr": "الترتيب الصحيح: After that, I watch TV with my family."
        },
        {
          "id": "scw_409_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أصلي الفجر وأفطر.",
          "answer": "I pray Fajr and have breakfast.",
          "explanationAr": "ترجمة مقترحة: I pray Fajr and have breakfast."
        },
        {
          "id": "scw_409_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: في المساء أحل واجبي.",
          "answer": "In the evening, I do my homework.",
          "explanationAr": "ترجمة مقترحة: In the evening, I do my homework."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Using -ing for habits: I am waking at 6 every day.",
        "correct": "I wake up at 6 every day.",
        "whyAr": "العادات بالمضارع البسيط."
      },
      {
        "incorrect": "No time words: list of verbs",
        "correct": "Use then, after that, in the evening",
        "whyAr": "كلمات الوقت تخلي الفقرة مرتبة."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (ربط الجمل بـ and و but): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I go to school and study.",
          "And I go to school. And I study."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I go to school and study. — لا تبدأ كل جملة بـ and.",
        "fromLessonId": "scw_408"
      },
      {
        "questionAr": "مراجعة (علامة الاستفهام وكتابة الأسئلة): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "What your name?",
          "What is your name?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: What is your name? — لا تنسى is.",
        "fromLessonId": "scw_406"
      },
      {
        "questionAr": "مراجعة (الحرف الكبير والنقطة): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "My name is Ali.",
          "my name is ali"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: My name is Ali. — حرف كبير في البداية وفي الاسم، ونقطة في الآخر.",
        "fromLessonId": "scw_401"
      },
      {
        "questionAr": "ما معنى \"later\"؟",
        "questionEn": "What does \"later\" mean?",
        "options": [
          "مشغول",
          "يرد",
          "بخير",
          "بعدين"
        ],
        "correctIndex": 3,
        "explanationAr": "\"later\" /ˈleɪtər/ تعني: بعدين. مثال: talk later",
        "fromLessonId": "scw_407"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (أصحى الساعة ست.)",
          "questionEn": "Complete: I wake up ____ six o'clock.",
          "options": [
            "on",
            "at",
            "in"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: at. المضارع البسيط للعادات: I wake up, he wakes up (s مع he/she). كلمات الوقت: at 6 o'clock, in the morning, after school, then. ابدأ الفقرة بجملة عامة (My day is busy.) ورتب الأحداث."
        },
        {
          "questionAr": "أكمل الفراغ: (أصلي الفجر وأفطر.)",
          "questionEn": "Complete: I pray Fajr and ____ breakfast.",
          "options": [
            "take",
            "have",
            "eat a"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: have. المضارع البسيط للعادات: I wake up, he wakes up (s مع he/she). كلمات الوقت: at 6 o'clock, in the morning, after school, then. ابدأ الفقرة بجملة عامة (My day is busy.) ورتب الأحداث."
        },
        {
          "questionAr": "أكمل: I go to bed ___ 10 p.m.",
          "questionEn": "Complete: I go to bed ___ 10 p.m.",
          "options": [
            "in",
            "at",
            "on"
          ],
          "correctIndex": 1,
          "explanationAr": "الساعة ⇐ at."
        },
        {
          "questionAr": "أكمل: She ___ lunch at school.",
          "questionEn": "Complete: She ___ lunch at school.",
          "options": [
            "have",
            "has",
            "having"
          ],
          "correctIndex": 1,
          "explanationAr": "she ⇐ has."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "I go to school by bus.",
            "I go to school with bus."
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: I go to school by bus. — وسيلة المواصلات بـ by."
        }
      ]
    }
  },
  {
    "id": "scw_410",
    "pillarId": "writing",
    "pillarNameAr": "الكتابة التعبيرية الحوارية",
    "pillarNameEn": "Conversational Writing & Quick Messaging",
    "pillarIcon": "✍️",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "وصف بيتي وغرفتي",
    "titleEn": "Describing My Home",
    "descAr": "صف بيتك بـ there is/there are وحروف المكان.",
    "descEn": "Describe your home with there is/are and prepositions of place.",
    "speakingGoalAr": "اكتب فقرة من ٦ جمل تصف غرفتك.",
    "speakingGoalEn": "Write six sentences describing your room.",
    "keyPattern": {
      "ruleAr": "There is + مفرد (There is a bed.)، There are + جمع (There are two windows.). حروف المكان: in, on, under, next to, between, in front of.",
      "ruleEn": "There is + singular, There are + plural. Prepositions: in, on, under, next to, between, in front of.",
      "formula": "There is a/an + noun + place. | There are + number + nouns."
    },
    "practicalExamples": [
      {
        "en": "There is a big bed in my room.",
        "ar": "فيه سرير كبير في غرفتي."
      },
      {
        "en": "There are two windows.",
        "ar": "فيه شباكين."
      },
      {
        "en": "My laptop is on the desk.",
        "ar": "اللابتوب على المكتب."
      },
      {
        "en": "The lamp is next to the bed.",
        "ar": "الأباجورة جنب السرير."
      },
      {
        "en": "Our majlis is near the door.",
        "ar": "مجلسنا قريب من الباب."
      },
      {
        "en": "My shoes are under the bed.",
        "ar": "جزمتي تحت السرير."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "There is two chairs.",
        "correct": "There are two chairs.",
        "whyAr": "الجمع ⇐ are."
      },
      {
        "incorrect": "In my room have a TV.",
        "correct": "There is a TV in my room.",
        "whyAr": "«فيه» = there is، مو have."
      },
      {
        "incorrect": "The book is in the table.",
        "correct": "The book is on the table.",
        "whyAr": "على السطح ⇐ on."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اكتب ٦ جمل تصف غرفتك.",
      "promptEn": "Write six sentences about your room.",
      "saraQuestionAr": "خلني أتخيل غرفتك!",
      "saraQuestionEn": "Let me picture your room!",
      "recommendedResponseEn": "My bedroom is small but nice. There is a bed next to the window. There is a desk and a chair. My laptop is on the desk. There are two pictures on the wall. My clothes are in the cupboard."
    },
    "quiz": [
      {
        "questionAr": "أكمل: There ___ a TV in the majlis.",
        "questionEn": "Complete: There ___ a TV in the majlis.",
        "options": [
          "are",
          "is",
          "have"
        ],
        "correctIndex": 1,
        "explanationAr": "مفرد."
      },
      {
        "questionAr": "القطة ___ السرير (تحت):",
        "questionEn": "The cat is ___ the bed (تحت).",
        "options": [
          "on",
          "under",
          "between"
        ],
        "correctIndex": 1,
        "explanationAr": "under."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "There are two chairs.",
          "There is two chairs."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: There are two chairs. — الجمع ⇐ are."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "There is a TV in my room.",
          "In my room have a TV."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: There is a TV in my room. — «فيه» = there is، مو have."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "The book is in the table.",
          "The book is on the table."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: The book is on the table. — على السطح ⇐ on."
      }
    ],
    "whiteboardNotes": {
      "title": "Describing My Home",
      "pointsAr": [
        "يستخدم there is/are.",
        "يحدد المكان بحروف الجر.",
        "يكتب فقرة وصفية.",
        "There is + مفرد (There is a bed.)، There are + جمع (There are two windows.). حروف المكان: in, on, under, next to, between, in front of."
      ],
      "pointsEn": [
        "Use there is/are.",
        "Use prepositions of place.",
        "Write a descriptive paragraph.",
        "There is + singular, There are + plural. Prepositions: in, on, under, next to, between, in front of."
      ],
      "chalkHighlight": "There is a/an + noun + place. | There are + number + nouns."
    },
    "unit": 2,
    "cefr": "A1",
    "objectivesAr": [
      "يستخدم there is/are.",
      "يحدد المكان بحروف الجر.",
      "يكتب فقرة وصفية."
    ],
    "objectivesEn": [
      "Use there is/are.",
      "Use prepositions of place.",
      "Write a descriptive paragraph."
    ],
    "vocabulary": [
      {
        "word": "bedroom",
        "ipa": "/ˈbɛdruːm/",
        "ar": "غرفة نوم",
        "exampleEn": "my bedroom",
        "exampleAr": "غرفتي"
      },
      {
        "word": "kitchen",
        "ipa": "/ˈkɪtʃɪn/",
        "ar": "مطبخ",
        "exampleEn": "in the kitchen",
        "exampleAr": "في المطبخ"
      },
      {
        "word": "majlis",
        "ipa": "/ˈmædʒlɪs/",
        "ar": "مجلس",
        "exampleEn": "a big majlis",
        "exampleAr": "مجلس كبير"
      },
      {
        "word": "window",
        "ipa": "/ˈwɪndoʊ/",
        "ar": "شباك",
        "exampleEn": "open the window",
        "exampleAr": "افتح الشباك"
      },
      {
        "word": "desk",
        "ipa": "/dɛsk/",
        "ar": "مكتب",
        "exampleEn": "on my desk",
        "exampleAr": "على مكتبي"
      },
      {
        "word": "cupboard",
        "ipa": "/ˈkʌbərd/",
        "ar": "دولاب",
        "exampleEn": "in the cupboard",
        "exampleAr": "في الدولاب"
      },
      {
        "word": "next to",
        "ipa": "/ˈnɛkst tuː/",
        "ar": "جنب",
        "exampleEn": "next to me",
        "exampleAr": "جنبي"
      },
      {
        "word": "between",
        "ipa": "/bɪˈtwiːn/",
        "ar": "بين",
        "exampleEn": "between the beds",
        "exampleAr": "بين السريرين"
      },
      {
        "word": "under",
        "ipa": "/ˈʌndər/",
        "ar": "تحت",
        "exampleEn": "under the table",
        "exampleAr": "تحت الطاولة"
      },
      {
        "word": "carpet",
        "ipa": "/ˈkɑːrpɪt/",
        "ar": "زولية/سجاد",
        "exampleEn": "a red carpet",
        "exampleAr": "زولية حمراء"
      }
    ],
    "grammarFocus": {
      "ruleAr": "There is + مفرد (There is a bed.)، There are + جمع (There are two windows.). حروف المكان: in, on, under, next to, between, in front of.",
      "ruleEn": "There is + singular, There are + plural. Prepositions: in, on, under, next to, between, in front of.",
      "formula": "There is a/an + noun + place. | There are + number + nouns.",
      "examples": [
        {
          "en": "There is a big bed in my room.",
          "ar": "فيه سرير كبير في غرفتي."
        },
        {
          "en": "There are two windows.",
          "ar": "فيه شباكين."
        },
        {
          "en": "My laptop is on the desk.",
          "ar": "اللابتوب على المكتب."
        },
        {
          "en": "The lamp is next to the bed.",
          "ar": "الأباجورة جنب السرير."
        },
        {
          "en": "Our majlis is near the door.",
          "ar": "مجلسنا قريب من الباب."
        },
        {
          "en": "My shoes are under the bed.",
          "ar": "جزمتي تحت السرير."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Describe your room.",
        "ar": "صف غرفتك."
      },
      {
        "speaker": "Student",
        "en": "There is a bed and a desk.",
        "ar": "فيه سرير ومكتب."
      },
      {
        "speaker": "Sara",
        "en": "Where is the desk?",
        "ar": "وين المكتب؟"
      },
      {
        "speaker": "Student",
        "en": "It's next to the window.",
        "ar": "جنب الشباك."
      },
      {
        "speaker": "Sara",
        "en": "Are there any pictures?",
        "ar": "فيه صور؟"
      },
      {
        "speaker": "Student",
        "en": "Yes, there are three pictures on the wall.",
        "ar": "إيه، فيه ثلاث صور على الجدار."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Describe your room.\nStudent: There is a bed and a desk.\nSara: Where is the desk?\nStudent: It's next to the window.\nSara: Are there any pictures?\nStudent: Yes, there are three pictures on the wall.",
      "questions": [
        {
          "questionAr": "وين المكتب؟",
          "questionEn": "Where is the desk?",
          "options": [
            "next to the bed",
            "next to the window",
            "under the bed"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: next to the window"
        },
        {
          "questionAr": "كم صورة؟",
          "questionEn": "How many pictures?",
          "options": [
            "two",
            "three",
            "four"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: three"
        },
        {
          "questionAr": "وين الصور؟",
          "questionEn": "Where are the pictures?",
          "options": [
            "on the desk",
            "on the wall",
            "on the floor"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: on the wall"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "there is / there are",
      "items": [
        "there's /ðɛrz/",
        "there are /ðɛr ɑːr/ → /ðɛrə/"
      ],
      "tipAr": "في الكلام: there's بدل there is."
    },
    "exercises": {
      "easy": [
        {
          "id": "scw_410_e1",
          "type": "meaning",
          "promptEn": "What does \"bedroom\" mean?",
          "promptAr": "ما معنى \"bedroom\"؟",
          "options": [
            "شباك",
            "مطبخ",
            "غرفة نوم",
            "جنب"
          ],
          "correctIndex": 2,
          "answer": "غرفة نوم",
          "explanationAr": "\"bedroom\" /ˈbɛdruːm/ تعني: غرفة نوم. مثال: my bedroom"
        },
        {
          "id": "scw_410_e2",
          "type": "meaning",
          "promptEn": "What does \"kitchen\" mean?",
          "promptAr": "ما معنى \"kitchen\"؟",
          "options": [
            "مطبخ",
            "زولية/سجاد",
            "مكتب",
            "غرفة نوم"
          ],
          "correctIndex": 0,
          "answer": "مطبخ",
          "explanationAr": "\"kitchen\" /ˈkɪtʃɪn/ تعني: مطبخ. مثال: in the kitchen"
        },
        {
          "id": "scw_410_e3",
          "type": "meaning",
          "promptEn": "What does \"majlis\" mean?",
          "promptAr": "ما معنى \"majlis\"؟",
          "options": [
            "بين",
            "مجلس",
            "غرفة نوم",
            "مطبخ"
          ],
          "correctIndex": 1,
          "answer": "مجلس",
          "explanationAr": "\"majlis\" /ˈmædʒlɪs/ تعني: مجلس. مثال: a big majlis"
        },
        {
          "id": "scw_410_e4",
          "type": "meaning",
          "promptEn": "What does \"window\" mean?",
          "promptAr": "ما معنى \"window\"؟",
          "options": [
            "جنب",
            "تحت",
            "بين",
            "شباك"
          ],
          "correctIndex": 3,
          "answer": "شباك",
          "explanationAr": "\"window\" /ˈwɪndoʊ/ تعني: شباك. مثال: open the window"
        }
      ],
      "medium": [
        {
          "id": "scw_410_m1",
          "type": "gap",
          "promptEn": "Complete: There ____ a big bed in my room.",
          "promptAr": "أكمل الفراغ: (فيه سرير كبير في غرفتي.)",
          "options": [
            "is",
            "have",
            "are"
          ],
          "correctIndex": 0,
          "answer": "There is a big bed in my room.",
          "explanationAr": "الإجابة: is. There is + مفرد (There is a bed.)، There are + جمع (There are two windows.). حروف المكان: in, on, under, next to, between, in front of."
        },
        {
          "id": "scw_410_m2",
          "type": "gap",
          "promptEn": "Complete: There ____ two windows.",
          "promptAr": "أكمل الفراغ: (فيه شباكين.)",
          "options": [
            "is",
            "has",
            "are"
          ],
          "correctIndex": 2,
          "answer": "There are two windows.",
          "explanationAr": "الإجابة: are. There is + مفرد (There is a bed.)، There are + جمع (There are two windows.). حروف المكان: in, on, under, next to, between, in front of."
        },
        {
          "id": "scw_410_m3",
          "type": "gap",
          "promptEn": "Complete: My laptop is ____ the desk.",
          "promptAr": "أكمل الفراغ: (اللابتوب على المكتب.)",
          "options": [
            "under",
            "on",
            "in"
          ],
          "correctIndex": 1,
          "answer": "My laptop is on the desk.",
          "explanationAr": "الإجابة: on. There is + مفرد (There is a bed.)، There are + جمع (There are two windows.). حروف المكان: in, on, under, next to, between, in front of."
        },
        {
          "id": "scw_410_m4",
          "type": "gap",
          "promptEn": "Complete: The lamp is ____ the bed.",
          "promptAr": "أكمل الفراغ: (الأباجورة جنب السرير.)",
          "options": [
            "between",
            "next to",
            "under"
          ],
          "correctIndex": 1,
          "answer": "The lamp is next to the bed.",
          "explanationAr": "الإجابة: next to. There is + مفرد (There is a bed.)، There are + جمع (There are two windows.). حروف المكان: in, on, under, next to, between, in front of."
        }
      ],
      "hard": [
        {
          "id": "scw_410_h1",
          "type": "order",
          "promptEn": "Put the words in order: near / majlis / is / Our / the / door.",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (مجلسنا قريب من الباب.)",
          "answer": "Our majlis is near the door.",
          "explanationAr": "الترتيب الصحيح: Our majlis is near the door."
        },
        {
          "id": "scw_410_h2",
          "type": "order",
          "promptEn": "Put the words in order: bed. / My / the / are / shoes / under",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (جزمتي تحت السرير.)",
          "answer": "My shoes are under the bed.",
          "explanationAr": "الترتيب الصحيح: My shoes are under the bed."
        },
        {
          "id": "scw_410_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: فيه شباكين.",
          "answer": "There are two windows.",
          "explanationAr": "ترجمة مقترحة: There are two windows."
        },
        {
          "id": "scw_410_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: الأباجورة جنب السرير.",
          "answer": "The lamp is next to the bed.",
          "explanationAr": "ترجمة مقترحة: The lamp is next to the bed."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "«في غرفتي يوجد» → In my room there is",
        "correct": "There is ... in my room (both OK)",
        "whyAr": "الأشيع تحط المكان آخر الجملة."
      },
      {
        "incorrect": "Using 'have' for existence",
        "correct": "There is",
        "whyAr": "have للملكية فقط."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (فقرة عن يومي): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "My brother wake up at 7.",
          "My brother wakes up at 7."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: My brother wakes up at 7. — he ⇐ wakes.",
        "fromLessonId": "scw_409"
      },
      {
        "questionAr": "مراجعة (رسائل الواتساب القصيرة: التحية والرد): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Im fine.",
          "I'm fine."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I'm fine. — الفاصلة العليا (') لازمة.",
        "fromLessonId": "scw_407"
      },
      {
        "questionAr": "مراجعة (أكتب عن نفسي): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I am 12 years old.",
          "I have 12 years."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I am 12 years old. — العمر بـ am مو have.",
        "fromLessonId": "scw_404"
      },
      {
        "questionAr": "ما معنى \"nice\"؟",
        "questionEn": "What does \"nice\" mean?",
        "options": [
          "حلو",
          "تعبان",
          "رخيص",
          "صغير"
        ],
        "correctIndex": 0,
        "explanationAr": "\"nice\" /naɪs/ تعني: حلو. مثال: a nice day",
        "fromLessonId": "scw_408"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (فيه سرير كبير في غرفتي.)",
          "questionEn": "Complete: There ____ a big bed in my room.",
          "options": [
            "is",
            "have",
            "are"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: is. There is + مفرد (There is a bed.)، There are + جمع (There are two windows.). حروف المكان: in, on, under, next to, between, in front of."
        },
        {
          "questionAr": "أكمل الفراغ: (فيه شباكين.)",
          "questionEn": "Complete: There ____ two windows.",
          "options": [
            "is",
            "has",
            "are"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: are. There is + مفرد (There is a bed.)، There are + جمع (There are two windows.). حروف المكان: in, on, under, next to, between, in front of."
        },
        {
          "questionAr": "أكمل: There ___ a TV in the majlis.",
          "questionEn": "Complete: There ___ a TV in the majlis.",
          "options": [
            "are",
            "is",
            "have"
          ],
          "correctIndex": 1,
          "explanationAr": "مفرد."
        },
        {
          "questionAr": "القطة ___ السرير (تحت):",
          "questionEn": "The cat is ___ the bed (تحت).",
          "options": [
            "on",
            "under",
            "between"
          ],
          "correctIndex": 1,
          "explanationAr": "under."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "There are two chairs.",
            "There is two chairs."
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: There are two chairs. — الجمع ⇐ are."
        }
      ]
    }
  },
  {
    "id": "scw_411_s",
    "pillarId": "writing",
    "pillarNameAr": "الكتابة التعبيرية الحوارية",
    "pillarNameEn": "Conversational Writing & Quick Messaging",
    "pillarIcon": "✍️",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "رسالة دعوة",
    "titleEn": "Writing an Invitation",
    "descAr": "اكتب دعوة لحفلة أو عزيمة: المناسبة، اليوم، الوقت، المكان.",
    "descEn": "Write an invitation: occasion, day, time, place.",
    "speakingGoalAr": "اكتب دعوة كاملة ورد قبول ورد اعتذار.",
    "speakingGoalEn": "Write an invitation, an acceptance and a refusal.",
    "keyPattern": {
      "ruleAr": "الدعوة: Would you like to come to...? أو Please come to... ثم: on + اليوم، at + الوقت، at/in + المكان. الرد: I'd love to! / Sorry, I can't because...",
      "ruleEn": "Invite: Would you like to come to...? / Please come to... + on day, at time, at place. Reply: I'd love to! / Sorry, I can't because...",
      "formula": "Would you like to come to + event + on day + at time?"
    },
    "practicalExamples": [
      {
        "en": "Would you like to come to my birthday party?",
        "ar": "تحب تجي حفلة ميلادي؟"
      },
      {
        "en": "It's on Thursday at 8 p.m.",
        "ar": "يوم الخميس الساعة ٨ مساءً."
      },
      {
        "en": "I'd love to come!",
        "ar": "أكيد بجي!"
      },
      {
        "en": "Sorry, I can't because I have an exam.",
        "ar": "آسف، ما أقدر لأن عندي اختبار."
      },
      {
        "en": "Please come to our house for dinner.",
        "ar": "تفضل عندنا على العشاء."
      },
      {
        "en": "See you on Thursday!",
        "ar": "أشوفك الخميس!"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Would you like come?",
        "correct": "Would you like to come?",
        "whyAr": "would like + to."
      },
      {
        "incorrect": "It's in Thursday.",
        "correct": "It's on Thursday.",
        "whyAr": "الأيام مع on."
      },
      {
        "incorrect": "No, I can't.",
        "correct": "Sorry, I can't make it. Thanks for inviting me!",
        "whyAr": "الرفض بأدب مع شكر."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اكتب دعوة لصديقك على عشاء.",
      "promptEn": "Write an invitation to dinner.",
      "saraQuestionAr": "اعزمني على عشاء!",
      "saraQuestionEn": "Invite me to dinner!",
      "recommendedResponseEn": "Hi Sara! Would you like to come to our house for dinner? It's on Friday at 8 p.m. My mother is cooking kabsa. I hope you can come!"
    },
    "quiz": [
      {
        "questionAr": "أكمل: Would you like ___ to my party?",
        "questionEn": "Complete: Would you like ___ to my party?",
        "options": [
          "come",
          "to come",
          "coming"
        ],
        "correctIndex": 1,
        "explanationAr": "to come."
      },
      {
        "questionAr": "أنسب رد للقبول:",
        "questionEn": "Best acceptance:",
        "options": [
          "I'd love to!",
          "No way.",
          "Maybe not."
        ],
        "correctIndex": 0,
        "explanationAr": "I'd love to!"
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Would you like to come?",
          "Would you like come?"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Would you like to come? — would like + to."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "It's on Thursday.",
          "It's in Thursday."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: It's on Thursday. — الأيام مع on."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "No, I can't.",
          "Sorry, I can't make it. Thanks for inviting me!"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Sorry, I can't make it. Thanks for inviting me! — الرفض بأدب مع شكر."
      }
    ],
    "whiteboardNotes": {
      "title": "Writing an Invitation",
      "pointsAr": [
        "يكتب دعوة بمعلوماتها الأساسية.",
        "يقبل بأدب.",
        "يعتذر بأدب مع سبب.",
        "الدعوة: Would you like to come to...? أو Please come to... ثم: on + اليوم، at + الوقت، at/in + المكان. الرد: I'd love to! / Sorry, I can't because..."
      ],
      "pointsEn": [
        "Write an invitation with key details.",
        "Accept politely.",
        "Decline politely with a reason.",
        "Invite: Would you like to come to...? / Please come to... + on day, at time, at place. Reply: I'd love to! / Sorry, I can't because..."
      ],
      "chalkHighlight": "Would you like to come to + event + on day + at time?"
    },
    "unit": 2,
    "cefr": "A1",
    "objectivesAr": [
      "يكتب دعوة بمعلوماتها الأساسية.",
      "يقبل بأدب.",
      "يعتذر بأدب مع سبب."
    ],
    "objectivesEn": [
      "Write an invitation with key details.",
      "Accept politely.",
      "Decline politely with a reason."
    ],
    "vocabulary": [
      {
        "word": "invite",
        "ipa": "/ɪnˈvaɪt/",
        "ar": "يعزم/يدعو",
        "exampleEn": "invite friends",
        "exampleAr": "يعزم أصحاب"
      },
      {
        "word": "party",
        "ipa": "/ˈpɑːrti/",
        "ar": "حفلة",
        "exampleEn": "a birthday party",
        "exampleAr": "حفلة ميلاد"
      },
      {
        "word": "come",
        "ipa": "/kʌm/",
        "ar": "يجي",
        "exampleEn": "Can you come?",
        "exampleAr": "تقدر تجي؟"
      },
      {
        "word": "address",
        "ipa": "/ˈædrɛs/",
        "ar": "عنوان",
        "exampleEn": "my address",
        "exampleAr": "عنواني"
      },
      {
        "word": "Thursday",
        "ipa": "/ˈθɜːrzdeɪ/",
        "ar": "الخميس",
        "exampleEn": "on Thursday",
        "exampleAr": "يوم الخميس"
      },
      {
        "word": "dinner",
        "ipa": "/ˈdɪnər/",
        "ar": "عشاء",
        "exampleEn": "for dinner",
        "exampleAr": "على العشاء"
      },
      {
        "word": "I'd love to",
        "ipa": "/aɪd lʌv tuː/",
        "ar": "يسعدني",
        "exampleEn": "I'd love to!",
        "exampleAr": "يا ليت!"
      },
      {
        "word": "make it",
        "ipa": "/meɪk ɪt/",
        "ar": "يقدر يحضر",
        "exampleEn": "I can't make it.",
        "exampleAr": "ما أقدر أحضر."
      },
      {
        "word": "celebrate",
        "ipa": "/ˈsɛləbreɪt/",
        "ar": "يحتفل",
        "exampleEn": "celebrate Eid",
        "exampleAr": "يحتفل بالعيد"
      },
      {
        "word": "graduation",
        "ipa": "/ˌɡrædʒuˈeɪʃən/",
        "ar": "تخرج",
        "exampleEn": "my graduation",
        "exampleAr": "تخرجي"
      }
    ],
    "grammarFocus": {
      "ruleAr": "الدعوة: Would you like to come to...? أو Please come to... ثم: on + اليوم، at + الوقت، at/in + المكان. الرد: I'd love to! / Sorry, I can't because...",
      "ruleEn": "Invite: Would you like to come to...? / Please come to... + on day, at time, at place. Reply: I'd love to! / Sorry, I can't because...",
      "formula": "Would you like to come to + event + on day + at time?",
      "examples": [
        {
          "en": "Would you like to come to my birthday party?",
          "ar": "تحب تجي حفلة ميلادي؟"
        },
        {
          "en": "It's on Thursday at 8 p.m.",
          "ar": "يوم الخميس الساعة ٨ مساءً."
        },
        {
          "en": "I'd love to come!",
          "ar": "أكيد بجي!"
        },
        {
          "en": "Sorry, I can't because I have an exam.",
          "ar": "آسف، ما أقدر لأن عندي اختبار."
        },
        {
          "en": "Please come to our house for dinner.",
          "ar": "تفضل عندنا على العشاء."
        },
        {
          "en": "See you on Thursday!",
          "ar": "أشوفك الخميس!"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Student",
        "en": "Hi Reem! Would you like to come to my graduation party?",
        "ar": "هلا ريم! تحبين تجين حفلة تخرجي؟"
      },
      {
        "speaker": "Reem",
        "en": "Congratulations! When is it?",
        "ar": "مبروك! متى؟"
      },
      {
        "speaker": "Student",
        "en": "It's on Thursday at 7 p.m., at my house.",
        "ar": "يوم الخميس الساعة ٧ مساءً في بيتنا."
      },
      {
        "speaker": "Reem",
        "en": "I'd love to come! Can I bring my sister?",
        "ar": "يسعدني! أقدر أجيب أختي؟"
      },
      {
        "speaker": "Student",
        "en": "Of course!",
        "ar": "أكيد!"
      },
      {
        "speaker": "Reem",
        "en": "Great. See you on Thursday!",
        "ar": "ممتاز. أشوفك الخميس!"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Student: Hi Reem! Would you like to come to my graduation party?\nReem: Congratulations! When is it?\nStudent: It's on Thursday at 7 p.m., at my house.\nReem: I'd love to come! Can I bring my sister?\nStudent: Of course!\nReem: Great. See you on Thursday!",
      "questions": [
        {
          "questionAr": "الحفلة لأي مناسبة؟",
          "questionEn": "What is the party for?",
          "options": [
            "birthday",
            "graduation",
            "Eid"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: graduation"
        },
        {
          "questionAr": "وين؟",
          "questionEn": "Where is it?",
          "options": [
            "a restaurant",
            "at the student's house",
            "a hall"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: at the student's house"
        },
        {
          "questionAr": "مين بتجيب ريم؟",
          "questionEn": "Who will Reem bring?",
          "options": [
            "her mother",
            "her sister",
            "her friend"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: her sister"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Would you / I'd",
      "items": [
        "Would you /ˈwʊdʒə/",
        "I'd love to /aɪd ˈlʌv tə/"
      ],
      "tipAr": "would you تنطق مدموجة «وُدجا»."
    },
    "exercises": {
      "easy": [
        {
          "id": "scw_411_s_e1",
          "type": "meaning",
          "promptEn": "What does \"invite\" mean?",
          "promptAr": "ما معنى \"invite\"؟",
          "options": [
            "عشاء",
            "يسعدني",
            "يعزم/يدعو",
            "يحتفل"
          ],
          "correctIndex": 2,
          "answer": "يعزم/يدعو",
          "explanationAr": "\"invite\" /ɪnˈvaɪt/ تعني: يعزم/يدعو. مثال: invite friends"
        },
        {
          "id": "scw_411_s_e2",
          "type": "meaning",
          "promptEn": "What does \"party\" mean?",
          "promptAr": "ما معنى \"party\"؟",
          "options": [
            "عنوان",
            "يحتفل",
            "حفلة",
            "تخرج"
          ],
          "correctIndex": 2,
          "answer": "حفلة",
          "explanationAr": "\"party\" /ˈpɑːrti/ تعني: حفلة. مثال: a birthday party"
        },
        {
          "id": "scw_411_s_e3",
          "type": "meaning",
          "promptEn": "What does \"come\" mean?",
          "promptAr": "ما معنى \"come\"؟",
          "options": [
            "يعزم/يدعو",
            "عنوان",
            "يسعدني",
            "يجي"
          ],
          "correctIndex": 3,
          "answer": "يجي",
          "explanationAr": "\"come\" /kʌm/ تعني: يجي. مثال: Can you come?"
        },
        {
          "id": "scw_411_s_e4",
          "type": "meaning",
          "promptEn": "What does \"address\" mean?",
          "promptAr": "ما معنى \"address\"؟",
          "options": [
            "يعزم/يدعو",
            "تخرج",
            "يسعدني",
            "عنوان"
          ],
          "correctIndex": 3,
          "answer": "عنوان",
          "explanationAr": "\"address\" /ˈædrɛs/ تعني: عنوان. مثال: my address"
        }
      ],
      "medium": [
        {
          "id": "scw_411_s_m1",
          "type": "gap",
          "promptEn": "Complete: ____ you like to come to my birthday party?",
          "promptAr": "أكمل الفراغ: (تحب تجي حفلة ميلادي؟)",
          "options": [
            "Do",
            "Will",
            "Would"
          ],
          "correctIndex": 2,
          "answer": "Would you like to come to my birthday party?",
          "explanationAr": "الإجابة: Would. الدعوة: Would you like to come to...? أو Please come to... ثم: on + اليوم، at + الوقت، at/in + المكان. الرد: I'd love to! / Sorry, I can't because..."
        },
        {
          "id": "scw_411_s_m2",
          "type": "gap",
          "promptEn": "Complete: It's ____ Thursday at 8 p.m.",
          "promptAr": "أكمل الفراغ: (يوم الخميس الساعة ٨ مساءً.)",
          "options": [
            "in",
            "on",
            "at"
          ],
          "correctIndex": 1,
          "answer": "It's on Thursday at 8 p.m.",
          "explanationAr": "الإجابة: on. الدعوة: Would you like to come to...? أو Please come to... ثم: on + اليوم، at + الوقت، at/in + المكان. الرد: I'd love to! / Sorry, I can't because..."
        },
        {
          "id": "scw_411_s_m3",
          "type": "gap",
          "promptEn": "Complete: I'd ____ to come!",
          "promptAr": "أكمل الفراغ: (أكيد بجي!)",
          "options": [
            "love",
            "loves",
            "loving"
          ],
          "correctIndex": 0,
          "answer": "I'd love to come!",
          "explanationAr": "الإجابة: love. الدعوة: Would you like to come to...? أو Please come to... ثم: on + اليوم، at + الوقت، at/in + المكان. الرد: I'd love to! / Sorry, I can't because..."
        },
        {
          "id": "scw_411_s_m4",
          "type": "gap",
          "promptEn": "Complete: Sorry, I can't ____ I have an exam.",
          "promptAr": "أكمل الفراغ: (آسف، ما أقدر لأن عندي اختبار.)",
          "options": [
            "so",
            "but",
            "because"
          ],
          "correctIndex": 2,
          "answer": "Sorry, I can't because I have an exam.",
          "explanationAr": "الإجابة: because. الدعوة: Would you like to come to...? أو Please come to... ثم: on + اليوم، at + الوقت، at/in + المكان. الرد: I'd love to! / Sorry, I can't because..."
        }
      ],
      "hard": [
        {
          "id": "scw_411_s_h1",
          "type": "order",
          "promptEn": "Put the words in order: dinner. / for / house / come / to / our / Please",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (تفضل عندنا على العشاء.)",
          "answer": "Please come to our house for dinner.",
          "explanationAr": "الترتيب الصحيح: Please come to our house for dinner."
        },
        {
          "id": "scw_411_s_h2",
          "type": "order",
          "promptEn": "Put the words in order: you / See / Thursday! / on",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (أشوفك الخميس!)",
          "answer": "See you on Thursday!",
          "explanationAr": "الترتيب الصحيح: See you on Thursday!"
        },
        {
          "id": "scw_411_s_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: يوم الخميس الساعة ٨ مساءً.",
          "answer": "It's on Thursday at 8 p.m.",
          "explanationAr": "ترجمة مقترحة: It's on Thursday at 8 p.m."
        },
        {
          "id": "scw_411_s_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: آسف، ما أقدر لأن عندي اختبار.",
          "answer": "Sorry, I can't because I have an exam.",
          "explanationAr": "ترجمة مقترحة: Sorry, I can't because I have an exam."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Missing the time or place",
        "correct": "Always include day, time, place",
        "whyAr": "الدعوة بدون مكان أو وقت ناقصة."
      },
      {
        "incorrect": "Blunt 'No.'",
        "correct": "Sorry, I can't make it.",
        "whyAr": "الرفض المباشر يبين قلة أدب."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (وصف بيتي وغرفتي): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "In my room have a TV.",
          "There is a TV in my room."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: There is a TV in my room. — «فيه» = there is، مو have.",
        "fromLessonId": "scw_410"
      },
      {
        "questionAr": "مراجعة (ربط الجمل بـ and و but): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I like tea, but I don't like coffee.",
          "I like tea, and I don't like coffee."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I like tea, but I don't like coffee. — الفكرتين متعاكسة ⇐ but.",
        "fromLessonId": "scw_408"
      },
      {
        "questionAr": "مراجعة (أكتب عن عائلتي): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "My sister has a cat.",
          "My sister have a cat."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: My sister has a cat. — مع she/he/المفرد: has.",
        "fromLessonId": "scw_405"
      },
      {
        "questionAr": "ما معنى \"busy\"؟",
        "questionEn": "What does \"busy\" mean?",
        "options": [
          "بعد كذا",
          "مشغول/مزدحم",
          "فطور",
          "غداء"
        ],
        "correctIndex": 1,
        "explanationAr": "\"busy\" /ˈbɪzi/ تعني: مشغول/مزدحم. مثال: a busy day",
        "fromLessonId": "scw_409"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (تحب تجي حفلة ميلادي؟)",
          "questionEn": "Complete: ____ you like to come to my birthday party?",
          "options": [
            "Do",
            "Will",
            "Would"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: Would. الدعوة: Would you like to come to...? أو Please come to... ثم: on + اليوم، at + الوقت، at/in + المكان. الرد: I'd love to! / Sorry, I can't because..."
        },
        {
          "questionAr": "أكمل الفراغ: (يوم الخميس الساعة ٨ مساءً.)",
          "questionEn": "Complete: It's ____ Thursday at 8 p.m.",
          "options": [
            "in",
            "on",
            "at"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: on. الدعوة: Would you like to come to...? أو Please come to... ثم: on + اليوم، at + الوقت، at/in + المكان. الرد: I'd love to! / Sorry, I can't because..."
        },
        {
          "questionAr": "أكمل: Would you like ___ to my party?",
          "questionEn": "Complete: Would you like ___ to my party?",
          "options": [
            "come",
            "to come",
            "coming"
          ],
          "correctIndex": 1,
          "explanationAr": "to come."
        },
        {
          "questionAr": "أنسب رد للقبول:",
          "questionEn": "Best acceptance:",
          "options": [
            "I'd love to!",
            "No way.",
            "Maybe not."
          ],
          "correctIndex": 0,
          "explanationAr": "I'd love to!"
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Would you like to come?",
            "Would you like come?"
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: Would you like to come? — would like + to."
        }
      ]
    }
  },
  {
    "id": "scw_412_s",
    "pillarId": "writing",
    "pillarNameAr": "الكتابة التعبيرية الحوارية",
    "pillarNameEn": "Conversational Writing & Quick Messaging",
    "pillarIcon": "✍️",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "رسالة من الإجازة (الماضي البسيط)",
    "titleEn": "A Holiday Message (Past Simple)",
    "descAr": "اكتب رسالة أو بوست عن إجازة: وين رحت ووش سويت، بالماضي البسيط.",
    "descEn": "Write a holiday message using past simple.",
    "speakingGoalAr": "اكتب رسالة من ٦ جمل عن رحلة.",
    "speakingGoalEn": "Write a six-sentence trip message.",
    "keyPattern": {
      "ruleAr": "الماضي المنتظم بـ -ed (visited, played). أشهر الشاذة: go→went, eat→ate, see→saw, have→had, swim→swam, buy→bought. was/were للوصف: It was amazing.",
      "ruleEn": "Regular past: -ed. Key irregulars: went, ate, saw, had, swam, bought. Description: was/were.",
      "formula": "Last week/yesterday + I + past verb ... It was + adjective."
    },
    "practicalExamples": [
      {
        "en": "Last summer we went to AlUla.",
        "ar": "الصيف اللي فات رحنا العُلا."
      },
      {
        "en": "We visited Hegra.",
        "ar": "زرنا الحِجر."
      },
      {
        "en": "We ate at a nice restaurant.",
        "ar": "أكلنا في مطعم حلو."
      },
      {
        "en": "The weather was lovely.",
        "ar": "الجو كان حلو."
      },
      {
        "en": "I took a lot of photos.",
        "ar": "صورت صور كثيرة."
      },
      {
        "en": "We had a great time!",
        "ar": "استانسنا مرة!"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "We goed to Abha.",
        "correct": "We went to Abha.",
        "whyAr": "go شاذ ⇐ went."
      },
      {
        "incorrect": "The rocks was huge.",
        "correct": "The rocks were huge.",
        "whyAr": "الجمع ⇐ were."
      },
      {
        "incorrect": "Yesterday I visit my aunt.",
        "correct": "Yesterday I visited my aunt.",
        "whyAr": "مع yesterday ⇐ ماضي."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اكتب رسالة لسارة عن آخر رحلة.",
      "promptEn": "Write Sara a message about your last trip.",
      "saraQuestionAr": "وين رحت آخر إجازة؟",
      "saraQuestionEn": "Where did you go last holiday?",
      "recommendedResponseEn": "Hi Sara! Last week we went to Jeddah. We stayed at a hotel near the sea. We swam and ate fresh fish. The weather was hot but nice. I bought gifts for my friends. It was amazing!"
    },
    "quiz": [
      {
        "questionAr": "ماضي see:",
        "questionEn": "Past of 'see':",
        "options": [
          "seed",
          "saw",
          "seen"
        ],
        "correctIndex": 1,
        "explanationAr": "saw."
      },
      {
        "questionAr": "أكمل: The hotel ___ very clean.",
        "questionEn": "Complete: The hotel ___ very clean.",
        "options": [
          "were",
          "was",
          "is been"
        ],
        "correctIndex": 1,
        "explanationAr": "مفرد ⇐ was."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "We went to Abha.",
          "We goed to Abha."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: We went to Abha. — go شاذ ⇐ went."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "The rocks were huge.",
          "The rocks was huge."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: The rocks were huge. — الجمع ⇐ were."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Yesterday I visited my aunt.",
          "Yesterday I visit my aunt."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Yesterday I visited my aunt. — مع yesterday ⇐ ماضي."
      }
    ],
    "whiteboardNotes": {
      "title": "A Holiday Message (Past Simple)",
      "pointsAr": [
        "يكتب أحداث ماضية.",
        "يستخدم الأفعال الشاذة الشائعة.",
        "يصف التجربة بـ was/were.",
        "الماضي المنتظم بـ -ed (visited, played). أشهر الشاذة: go→went, eat→ate, see→saw, have→had, swim→swam, buy→bought. was/were للوصف: It was amazing."
      ],
      "pointsEn": [
        "Write about past events.",
        "Use common irregular verbs.",
        "Describe with was/were.",
        "Regular past: -ed. Key irregulars: went, ate, saw, had, swam, bought. Description: was/were."
      ],
      "chalkHighlight": "Last week/yesterday + I + past verb ... It was + adjective."
    },
    "unit": 2,
    "cefr": "A1",
    "objectivesAr": [
      "يكتب أحداث ماضية.",
      "يستخدم الأفعال الشاذة الشائعة.",
      "يصف التجربة بـ was/were."
    ],
    "objectivesEn": [
      "Write about past events.",
      "Use common irregular verbs.",
      "Describe with was/were."
    ],
    "vocabulary": [
      {
        "word": "trip",
        "ipa": "/trɪp/",
        "ar": "رحلة",
        "exampleEn": "a short trip",
        "exampleAr": "رحلة قصيرة"
      },
      {
        "word": "visit",
        "ipa": "/ˈvɪzɪt/",
        "ar": "يزور",
        "exampleEn": "visit a museum",
        "exampleAr": "يزور متحف"
      },
      {
        "word": "amazing",
        "ipa": "/əˈmeɪzɪŋ/",
        "ar": "رهيب/مذهل",
        "exampleEn": "an amazing view",
        "exampleAr": "منظر رهيب"
      },
      {
        "word": "view",
        "ipa": "/vjuː/",
        "ar": "منظر",
        "exampleEn": "a great view",
        "exampleAr": "منظر حلو"
      },
      {
        "word": "hotel",
        "ipa": "/hoʊˈtɛl/",
        "ar": "فندق",
        "exampleEn": "stay at a hotel",
        "exampleAr": "يسكن فندق"
      },
      {
        "word": "weather",
        "ipa": "/ˈwɛðər/",
        "ar": "جو/طقس",
        "exampleEn": "nice weather",
        "exampleAr": "جو حلو"
      },
      {
        "word": "took photos",
        "ipa": "/tʊk ˈfoʊtoʊz/",
        "ar": "صور",
        "exampleEn": "We took photos.",
        "exampleAr": "صورنا."
      },
      {
        "word": "bought",
        "ipa": "/bɔːt/",
        "ar": "اشترى",
        "exampleEn": "I bought gifts.",
        "exampleAr": "اشتريت هدايا."
      },
      {
        "word": "beach",
        "ipa": "/biːtʃ/",
        "ar": "شاطئ",
        "exampleEn": "on the beach",
        "exampleAr": "على البحر"
      },
      {
        "word": "last week",
        "ipa": "/læst wiːk/",
        "ar": "الأسبوع اللي فات",
        "exampleEn": "last week",
        "exampleAr": "الأسبوع الماضي"
      }
    ],
    "grammarFocus": {
      "ruleAr": "الماضي المنتظم بـ -ed (visited, played). أشهر الشاذة: go→went, eat→ate, see→saw, have→had, swim→swam, buy→bought. was/were للوصف: It was amazing.",
      "ruleEn": "Regular past: -ed. Key irregulars: went, ate, saw, had, swam, bought. Description: was/were.",
      "formula": "Last week/yesterday + I + past verb ... It was + adjective.",
      "examples": [
        {
          "en": "Last summer we went to AlUla.",
          "ar": "الصيف اللي فات رحنا العُلا."
        },
        {
          "en": "We visited Hegra.",
          "ar": "زرنا الحِجر."
        },
        {
          "en": "We ate at a nice restaurant.",
          "ar": "أكلنا في مطعم حلو."
        },
        {
          "en": "The weather was lovely.",
          "ar": "الجو كان حلو."
        },
        {
          "en": "I took a lot of photos.",
          "ar": "صورت صور كثيرة."
        },
        {
          "en": "We had a great time!",
          "ar": "استانسنا مرة!"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Student",
        "en": "Hi Sara! I'm back from Abha.",
        "ar": "هلا سارة! رجعت من أبها."
      },
      {
        "speaker": "Sara",
        "en": "Welcome back! What did you do?",
        "ar": "الحمدلله على السلامة! وش سويت؟"
      },
      {
        "speaker": "Student",
        "en": "We went up the mountain and saw the clouds.",
        "ar": "طلعنا الجبل وشفنا الغيوم."
      },
      {
        "speaker": "Sara",
        "en": "Wow! Was it cold?",
        "ar": "واو! كان بارد؟"
      },
      {
        "speaker": "Student",
        "en": "Yes, it was 18 degrees! We ate honey and bought gifts.",
        "ar": "إيه، ١٨ درجة! أكلنا عسل واشترينا هدايا."
      },
      {
        "speaker": "Sara",
        "en": "Sounds amazing!",
        "ar": "شكلها رهيبة!"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Student: Hi Sara! I'm back from Abha.\nSara: Welcome back! What did you do?\nStudent: We went up the mountain and saw the clouds.\nSara: Wow! Was it cold?\nStudent: Yes, it was 18 degrees! We ate honey and bought gifts.\nSara: Sounds amazing!",
      "questions": [
        {
          "questionAr": "وين راح؟",
          "questionEn": "Where did he go?",
          "options": [
            "AlUla",
            "Abha",
            "Jeddah"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: Abha"
        },
        {
          "questionAr": "وش شافوا؟",
          "questionEn": "What did they see?",
          "options": [
            "the sea",
            "the clouds",
            "camels"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: the clouds"
        },
        {
          "questionAr": "كم الحرارة؟",
          "questionEn": "What was the temperature?",
          "options": [
            "8",
            "18",
            "28"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: 18"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "-ed endings",
      "items": [
        "visited /ˈvɪzɪtɪd/",
        "played /pleɪd/",
        "walked /wɔːkt/"
      ],
      "tipAr": "-ed تنطق /ɪd/ بعد t/d فقط."
    },
    "exercises": {
      "easy": [
        {
          "id": "scw_412_s_e1",
          "type": "meaning",
          "promptEn": "What does \"trip\" mean?",
          "promptAr": "ما معنى \"trip\"؟",
          "options": [
            "رحلة",
            "رهيب/مذهل",
            "جو/طقس",
            "منظر"
          ],
          "correctIndex": 0,
          "answer": "رحلة",
          "explanationAr": "\"trip\" /trɪp/ تعني: رحلة. مثال: a short trip"
        },
        {
          "id": "scw_412_s_e2",
          "type": "meaning",
          "promptEn": "What does \"visit\" mean?",
          "promptAr": "ما معنى \"visit\"؟",
          "options": [
            "صور",
            "يزور",
            "رحلة",
            "جو/طقس"
          ],
          "correctIndex": 1,
          "answer": "يزور",
          "explanationAr": "\"visit\" /ˈvɪzɪt/ تعني: يزور. مثال: visit a museum"
        },
        {
          "id": "scw_412_s_e3",
          "type": "meaning",
          "promptEn": "What does \"amazing\" mean?",
          "promptAr": "ما معنى \"amazing\"؟",
          "options": [
            "الأسبوع اللي فات",
            "رهيب/مذهل",
            "فندق",
            "صور"
          ],
          "correctIndex": 1,
          "answer": "رهيب/مذهل",
          "explanationAr": "\"amazing\" /əˈmeɪzɪŋ/ تعني: رهيب/مذهل. مثال: an amazing view"
        },
        {
          "id": "scw_412_s_e4",
          "type": "meaning",
          "promptEn": "What does \"view\" mean?",
          "promptAr": "ما معنى \"view\"؟",
          "options": [
            "شاطئ",
            "منظر",
            "رحلة",
            "اشترى"
          ],
          "correctIndex": 1,
          "answer": "منظر",
          "explanationAr": "\"view\" /vjuː/ تعني: منظر. مثال: a great view"
        }
      ],
      "medium": [
        {
          "id": "scw_412_s_m1",
          "type": "gap",
          "promptEn": "Complete: Last summer we ____ to AlUla.",
          "promptAr": "أكمل الفراغ: (الصيف اللي فات رحنا العُلا.)",
          "options": [
            "goed",
            "went",
            "go"
          ],
          "correctIndex": 1,
          "answer": "Last summer we went to AlUla.",
          "explanationAr": "الإجابة: went. الماضي المنتظم بـ -ed (visited, played). أشهر الشاذة: go→went, eat→ate, see→saw, have→had, swim→swam, buy→bought. was/were للوصف: It was amazing."
        },
        {
          "id": "scw_412_s_m2",
          "type": "gap",
          "promptEn": "Complete: We ____ Hegra.",
          "promptAr": "أكمل الفراغ: (زرنا الحِجر.)",
          "options": [
            "visited",
            "visit",
            "visitted"
          ],
          "correctIndex": 0,
          "answer": "We visited Hegra.",
          "explanationAr": "الإجابة: visited. الماضي المنتظم بـ -ed (visited, played). أشهر الشاذة: go→went, eat→ate, see→saw, have→had, swim→swam, buy→bought. was/were للوصف: It was amazing."
        },
        {
          "id": "scw_412_s_m3",
          "type": "gap",
          "promptEn": "Complete: We ____ at a nice restaurant.",
          "promptAr": "أكمل الفراغ: (أكلنا في مطعم حلو.)",
          "options": [
            "ate",
            "eated",
            "eat"
          ],
          "correctIndex": 0,
          "answer": "We ate at a nice restaurant.",
          "explanationAr": "الإجابة: ate. الماضي المنتظم بـ -ed (visited, played). أشهر الشاذة: go→went, eat→ate, see→saw, have→had, swim→swam, buy→bought. was/were للوصف: It was amazing."
        },
        {
          "id": "scw_412_s_m4",
          "type": "gap",
          "promptEn": "Complete: The weather ____ lovely.",
          "promptAr": "أكمل الفراغ: (الجو كان حلو.)",
          "options": [
            "is",
            "was",
            "were"
          ],
          "correctIndex": 1,
          "answer": "The weather was lovely.",
          "explanationAr": "الإجابة: was. الماضي المنتظم بـ -ed (visited, played). أشهر الشاذة: go→went, eat→ate, see→saw, have→had, swim→swam, buy→bought. was/were للوصف: It was amazing."
        }
      ],
      "hard": [
        {
          "id": "scw_412_s_h1",
          "type": "order",
          "promptEn": "Put the words in order: took / I / lot / photos. / a / of",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (صورت صور كثيرة.)",
          "answer": "I took a lot of photos.",
          "explanationAr": "الترتيب الصحيح: I took a lot of photos."
        },
        {
          "id": "scw_412_s_h2",
          "type": "order",
          "promptEn": "Put the words in order: We / had / great / time! / a",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (استانسنا مرة!)",
          "answer": "We had a great time!",
          "explanationAr": "الترتيب الصحيح: We had a great time!"
        },
        {
          "id": "scw_412_s_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: زرنا الحِجر.",
          "answer": "We visited Hegra.",
          "explanationAr": "ترجمة مقترحة: We visited Hegra."
        },
        {
          "id": "scw_412_s_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: الجو كان حلو.",
          "answer": "The weather was lovely.",
          "explanationAr": "ترجمة مقترحة: The weather was lovely."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Forgetting past after 'last summer'",
        "correct": "Last summer we went...",
        "whyAr": "الكلمة الزمنية تحدد الماضي."
      },
      {
        "incorrect": "Pronouncing every -ed as /ɪd/",
        "correct": "walked = /wɔːkt/",
        "whyAr": "مو «ووكِد»."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (رسالة دعوة): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "It's in Thursday.",
          "It's on Thursday."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: It's on Thursday. — الأيام مع on.",
        "fromLessonId": "scw_411_s"
      },
      {
        "questionAr": "مراجعة (فقرة عن يومي): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I go to school by bus.",
          "I go to school with bus."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I go to school by bus. — وسيلة المواصلات بـ by.",
        "fromLessonId": "scw_409"
      },
      {
        "questionAr": "مراجعة (علامة الاستفهام وكتابة الأسئلة): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "What is your name?",
          "What your name?"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: What is your name? — لا تنسى is.",
        "fromLessonId": "scw_406"
      },
      {
        "questionAr": "ما معنى \"carpet\"؟",
        "questionEn": "What does \"carpet\" mean?",
        "options": [
          "مجلس",
          "مطبخ",
          "زولية/سجاد",
          "بين"
        ],
        "correctIndex": 2,
        "explanationAr": "\"carpet\" /ˈkɑːrpɪt/ تعني: زولية/سجاد. مثال: a red carpet",
        "fromLessonId": "scw_410"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (الصيف اللي فات رحنا العُلا.)",
          "questionEn": "Complete: Last summer we ____ to AlUla.",
          "options": [
            "goed",
            "went",
            "go"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: went. الماضي المنتظم بـ -ed (visited, played). أشهر الشاذة: go→went, eat→ate, see→saw, have→had, swim→swam, buy→bought. was/were للوصف: It was amazing."
        },
        {
          "questionAr": "أكمل الفراغ: (زرنا الحِجر.)",
          "questionEn": "Complete: We ____ Hegra.",
          "options": [
            "visited",
            "visit",
            "visitted"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: visited. الماضي المنتظم بـ -ed (visited, played). أشهر الشاذة: go→went, eat→ate, see→saw, have→had, swim→swam, buy→bought. was/were للوصف: It was amazing."
        },
        {
          "questionAr": "ماضي see:",
          "questionEn": "Past of 'see':",
          "options": [
            "seed",
            "saw",
            "seen"
          ],
          "correctIndex": 1,
          "explanationAr": "saw."
        },
        {
          "questionAr": "أكمل: The hotel ___ very clean.",
          "questionEn": "Complete: The hotel ___ very clean.",
          "options": [
            "were",
            "was",
            "is been"
          ],
          "correctIndex": 1,
          "explanationAr": "مفرد ⇐ was."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "We went to Abha.",
            "We goed to Abha."
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: We went to Abha. — go شاذ ⇐ went."
        }
      ]
    }
  },
  {
    "id": "scw_402",
    "pillarId": "writing",
    "pillarNameAr": "الكتابة التعبيرية الحوارية",
    "pillarNameEn": "Conversational Writing & Quick Messaging",
    "pillarIcon": "✍️",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "تعبئة النماذج",
    "titleEn": "Filling in Forms",
    "descAr": "عبّي نموذج تسجيل (نادي، فندق، أونلاين) بالمعلومات الصحيحة وبالحروف الكبيرة.",
    "descEn": "Complete a registration form correctly.",
    "speakingGoalAr": "عبّي نموذجين بدون أخطاء.",
    "speakingGoalEn": "Complete two forms without errors.",
    "keyPattern": {
      "ruleAr": "اعرف كلمات النماذج: First name (الاسم الأول)، Surname/Last name (اسم العائلة)، Date of birth (تاريخ الميلاد)، Nationality، Address، Signature. التاريخ البريطاني يوم/شهر/سنة والأمريكي شهر/يوم/سنة. BLOCK CAPITALS = حروف كبيرة كلها.",
      "ruleEn": "Know form words: first name, surname, date of birth, nationality, address, signature. UK date DD/MM/YYYY; US MM/DD/YYYY.",
      "formula": "Field: answer (no full sentence) → Surname: ALHARBI"
    },
    "practicalExamples": [
      {
        "en": "First name: Faisal",
        "ar": "الاسم الأول: فيصل"
      },
      {
        "en": "Surname: Alqahtani",
        "ar": "اسم العائلة: القحطاني"
      },
      {
        "en": "Nationality: Saudi",
        "ar": "الجنسية: سعودي"
      },
      {
        "en": "Date of birth: 14/03/2010",
        "ar": "تاريخ الميلاد: ١٤/٠٣/٢٠١٠"
      },
      {
        "en": "Mobile number: +966 5X XXX XXXX",
        "ar": "رقم الجوال"
      },
      {
        "en": "Signature: (sign here)",
        "ar": "التوقيع: (وقّع هنا)"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Nationality: Saudi Arabia",
        "correct": "Nationality: Saudi",
        "whyAr": "الجنسية صفة: Saudi، والبلد Saudi Arabia."
      },
      {
        "incorrect": "Surname: Faisal",
        "correct": "Surname: Alqahtani",
        "whyAr": "surname = اسم العائلة."
      },
      {
        "incorrect": "Date of birth: 2010",
        "correct": "Date of birth: 14/03/2010",
        "whyAr": "التاريخ كامل."
      }
    ],
    "speakingChallenge": {
      "promptAr": "عبّ نموذج نادي لسارة.",
      "promptEn": "Complete a club form for Sara.",
      "saraQuestionAr": "اكتب: الاسم، العائلة، الميلاد، الجنسية، المهنة.",
      "saraQuestionEn": "Write: first name, surname, date of birth, nationality, occupation.",
      "recommendedResponseEn": "First name: Noura | Surname: Alharbi | Date of birth: 05/09/2011 | Nationality: Saudi | Occupation: Student"
    },
    "quiz": [
      {
        "questionAr": "الجنسية الصحيحة:",
        "questionEn": "Correct nationality:",
        "options": [
          "Saudi",
          "Saudi Arabia",
          "Riyadh"
        ],
        "correctIndex": 0,
        "explanationAr": "Saudi."
      },
      {
        "questionAr": "surname يعني:",
        "questionEn": "'surname' means:",
        "options": [
          "الاسم الأول",
          "اسم العائلة",
          "اللقب"
        ],
        "correctIndex": 1,
        "explanationAr": "اسم العائلة."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Nationality: Saudi",
          "Nationality: Saudi Arabia"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Nationality: Saudi — الجنسية صفة: Saudi، والبلد Saudi Arabia."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Surname: Faisal",
          "Surname: Alqahtani"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Surname: Alqahtani — surname = اسم العائلة."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Date of birth: 2010",
          "Date of birth: 14/03/2010"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Date of birth: 14/03/2010 — التاريخ كامل."
      }
    ],
    "whiteboardNotes": {
      "title": "Filling in Forms",
      "pointsAr": [
        "يفهم حقول النموذج.",
        "يكتب التاريخ بالصيغة الصحيحة.",
        "يكتب العنوان والجنسية صح.",
        "اعرف كلمات النماذج: First name (الاسم الأول)، Surname/Last name (اسم العائلة)، Date of birth (تاريخ الميلاد)، Nationality، Address، Signature. التاريخ البريطاني يوم/شهر/سنة والأمريكي شهر/يوم/سنة. BLOCK CAPITALS = حروف كبيرة كلها."
      ],
      "pointsEn": [
        "Understand form fields.",
        "Write dates in the right format.",
        "Write address and nationality correctly.",
        "Know form words: first name, surname, date of birth, nationality, address, signature. UK date DD/MM/YYYY; US MM/DD/YYYY."
      ],
      "chalkHighlight": "Field: answer (no full sentence) → Surname: ALHARBI"
    },
    "unit": 3,
    "cefr": "A1",
    "objectivesAr": [
      "يفهم حقول النموذج.",
      "يكتب التاريخ بالصيغة الصحيحة.",
      "يكتب العنوان والجنسية صح."
    ],
    "objectivesEn": [
      "Understand form fields.",
      "Write dates in the right format.",
      "Write address and nationality correctly."
    ],
    "vocabulary": [
      {
        "word": "first name",
        "ipa": "/ˈfɜːrst neɪm/",
        "ar": "الاسم الأول",
        "exampleEn": "your first name",
        "exampleAr": "اسمك الأول"
      },
      {
        "word": "surname",
        "ipa": "/ˈsɜːrneɪm/",
        "ar": "اسم العائلة",
        "exampleEn": "write your surname",
        "exampleAr": "اكتب اسم العائلة"
      },
      {
        "word": "date of birth",
        "ipa": "/ˌdeɪt əv ˈbɜːrθ/",
        "ar": "تاريخ الميلاد",
        "exampleEn": "your date of birth",
        "exampleAr": "تاريخ ميلادك"
      },
      {
        "word": "nationality",
        "ipa": "/ˌnæʃəˈnæləti/",
        "ar": "الجنسية",
        "exampleEn": "What's your nationality?",
        "exampleAr": "وش جنسيتك؟"
      },
      {
        "word": "address",
        "ipa": "/ˈædrɛs/",
        "ar": "العنوان",
        "exampleEn": "home address",
        "exampleAr": "عنوان البيت"
      },
      {
        "word": "signature",
        "ipa": "/ˈsɪɡnətʃər/",
        "ar": "التوقيع",
        "exampleEn": "your signature",
        "exampleAr": "توقيعك"
      },
      {
        "word": "male",
        "ipa": "/meɪl/",
        "ar": "ذكر",
        "exampleEn": "male / female",
        "exampleAr": "ذكر / أنثى"
      },
      {
        "word": "female",
        "ipa": "/ˈfiːmeɪl/",
        "ar": "أنثى",
        "exampleEn": "tick female",
        "exampleAr": "اختار أنثى"
      },
      {
        "word": "occupation",
        "ipa": "/ˌɑːkjuˈpeɪʃən/",
        "ar": "المهنة",
        "exampleEn": "occupation: student",
        "exampleAr": "المهنة: طالب"
      },
      {
        "word": "tick",
        "ipa": "/tɪk/",
        "ar": "يأشّر ✓",
        "exampleEn": "tick the box",
        "exampleAr": "أشّر على المربع"
      }
    ],
    "grammarFocus": {
      "ruleAr": "اعرف كلمات النماذج: First name (الاسم الأول)، Surname/Last name (اسم العائلة)، Date of birth (تاريخ الميلاد)، Nationality، Address، Signature. التاريخ البريطاني يوم/شهر/سنة والأمريكي شهر/يوم/سنة. BLOCK CAPITALS = حروف كبيرة كلها.",
      "ruleEn": "Know form words: first name, surname, date of birth, nationality, address, signature. UK date DD/MM/YYYY; US MM/DD/YYYY.",
      "formula": "Field: answer (no full sentence) → Surname: ALHARBI",
      "examples": [
        {
          "en": "First name: Faisal",
          "ar": "الاسم الأول: فيصل"
        },
        {
          "en": "Surname: Alqahtani",
          "ar": "اسم العائلة: القحطاني"
        },
        {
          "en": "Nationality: Saudi",
          "ar": "الجنسية: سعودي"
        },
        {
          "en": "Date of birth: 14/03/2010",
          "ar": "تاريخ الميلاد: ١٤/٠٣/٢٠١٠"
        },
        {
          "en": "Mobile number: +966 5X XXX XXXX",
          "ar": "رقم الجوال"
        },
        {
          "en": "Signature: (sign here)",
          "ar": "التوقيع: (وقّع هنا)"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Receptionist",
        "en": "Please fill in this form.",
        "ar": "عبّ هذا النموذج لو سمحت."
      },
      {
        "speaker": "Student",
        "en": "Sure. What's 'surname'?",
        "ar": "أكيد. وش يعني surname؟"
      },
      {
        "speaker": "Receptionist",
        "en": "Your family name.",
        "ar": "اسم عائلتك."
      },
      {
        "speaker": "Student",
        "en": "OK. And date of birth: day first?",
        "ar": "تمام. وتاريخ الميلاد: اليوم أول؟"
      },
      {
        "speaker": "Receptionist",
        "en": "Yes, day, month, year.",
        "ar": "إيه، يوم، شهر، سنة."
      },
      {
        "speaker": "Student",
        "en": "Done. Where do I sign?",
        "ar": "خلصت. وين أوقع؟"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Receptionist: Please fill in this form.\nStudent: Sure. What's 'surname'?\nReceptionist: Your family name.\nStudent: OK. And date of birth: day first?\nReceptionist: Yes, day, month, year.\nStudent: Done. Where do I sign?",
      "questions": [
        {
          "questionAr": "وش surname؟",
          "questionEn": "What is 'surname'?",
          "options": [
            "first name",
            "family name",
            "nickname"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: family name"
        },
        {
          "questionAr": "ترتيب التاريخ:",
          "questionEn": "Date order here:",
          "options": [
            "month-day-year",
            "day-month-year",
            "year-day-month"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: day-month-year"
        },
        {
          "questionAr": "آخر سؤال؟",
          "questionEn": "What does he ask at the end?",
          "options": [
            "where to pay",
            "where to sign",
            "the price"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: where to sign"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Spelling your name",
      "items": [
        "A /eɪ/, E /iː/, I /aɪ/",
        "double L = /ˈdʌbəl ɛl/"
      ],
      "tipAr": "تعلّم تتهجّى اسمك بالحروف: F-A-I-S-A-L."
    },
    "exercises": {
      "easy": [
        {
          "id": "scw_402_e1",
          "type": "meaning",
          "promptEn": "What does \"first name\" mean?",
          "promptAr": "ما معنى \"first name\"؟",
          "options": [
            "يأشّر ✓",
            "الاسم الأول",
            "اسم العائلة",
            "ذكر"
          ],
          "correctIndex": 1,
          "answer": "الاسم الأول",
          "explanationAr": "\"first name\" /ˈfɜːrst neɪm/ تعني: الاسم الأول. مثال: your first name"
        },
        {
          "id": "scw_402_e2",
          "type": "meaning",
          "promptEn": "What does \"surname\" mean?",
          "promptAr": "ما معنى \"surname\"؟",
          "options": [
            "أنثى",
            "ذكر",
            "اسم العائلة",
            "تاريخ الميلاد"
          ],
          "correctIndex": 2,
          "answer": "اسم العائلة",
          "explanationAr": "\"surname\" /ˈsɜːrneɪm/ تعني: اسم العائلة. مثال: write your surname"
        },
        {
          "id": "scw_402_e3",
          "type": "meaning",
          "promptEn": "What does \"date of birth\" mean?",
          "promptAr": "ما معنى \"date of birth\"؟",
          "options": [
            "يأشّر ✓",
            "الاسم الأول",
            "الجنسية",
            "تاريخ الميلاد"
          ],
          "correctIndex": 3,
          "answer": "تاريخ الميلاد",
          "explanationAr": "\"date of birth\" /ˌdeɪt əv ˈbɜːrθ/ تعني: تاريخ الميلاد. مثال: your date of birth"
        },
        {
          "id": "scw_402_e4",
          "type": "meaning",
          "promptEn": "What does \"nationality\" mean?",
          "promptAr": "ما معنى \"nationality\"؟",
          "options": [
            "يأشّر ✓",
            "اسم العائلة",
            "الجنسية",
            "تاريخ الميلاد"
          ],
          "correctIndex": 2,
          "answer": "الجنسية",
          "explanationAr": "\"nationality\" /ˌnæʃəˈnæləti/ تعني: الجنسية. مثال: What's your nationality?"
        }
      ],
      "medium": [
        {
          "id": "scw_402_m1",
          "type": "gap",
          "promptEn": "Complete: ____: Faisal",
          "promptAr": "أكمل الفراغ: (الاسم الأول: فيصل)",
          "options": [
            "Surname",
            "Nickname",
            "First name"
          ],
          "correctIndex": 2,
          "answer": "First name: Faisal",
          "explanationAr": "الإجابة: First name. اعرف كلمات النماذج: First name (الاسم الأول)، Surname/Last name (اسم العائلة)، Date of birth (تاريخ الميلاد)، Nationality، Address، Signature. التاريخ البريطاني يوم/شهر/سنة والأمريكي شهر/يوم/سنة. BLOCK CAPITALS = حروف كبيرة كلها."
        },
        {
          "id": "scw_402_m2",
          "type": "gap",
          "promptEn": "Complete: ____: Alqahtani",
          "promptAr": "أكمل الفراغ: (اسم العائلة: القحطاني)",
          "options": [
            "Surname",
            "Middle",
            "First name"
          ],
          "correctIndex": 0,
          "answer": "Surname: Alqahtani",
          "explanationAr": "الإجابة: Surname. اعرف كلمات النماذج: First name (الاسم الأول)، Surname/Last name (اسم العائلة)، Date of birth (تاريخ الميلاد)، Nationality، Address، Signature. التاريخ البريطاني يوم/شهر/سنة والأمريكي شهر/يوم/سنة. BLOCK CAPITALS = حروف كبيرة كلها."
        },
        {
          "id": "scw_402_m3",
          "type": "gap",
          "promptEn": "Complete: Nationality: ____",
          "promptAr": "أكمل الفراغ: (الجنسية: سعودي)",
          "options": [
            "Saudi",
            "Saudi Arabia",
            "Saudian"
          ],
          "correctIndex": 0,
          "answer": "Nationality: Saudi",
          "explanationAr": "الإجابة: Saudi. اعرف كلمات النماذج: First name (الاسم الأول)، Surname/Last name (اسم العائلة)، Date of birth (تاريخ الميلاد)، Nationality، Address، Signature. التاريخ البريطاني يوم/شهر/سنة والأمريكي شهر/يوم/سنة. BLOCK CAPITALS = حروف كبيرة كلها."
        },
        {
          "id": "scw_402_m4",
          "type": "gap",
          "promptEn": "Complete: ____: 14/03/2010",
          "promptAr": "أكمل الفراغ: (تاريخ الميلاد: ١٤/٠٣/٢٠١٠)",
          "options": [
            "Date of birth",
            "Birthday party",
            "Age"
          ],
          "correctIndex": 0,
          "answer": "Date of birth: 14/03/2010",
          "explanationAr": "الإجابة: Date of birth. اعرف كلمات النماذج: First name (الاسم الأول)، Surname/Last name (اسم العائلة)، Date of birth (تاريخ الميلاد)، Nationality، Address، Signature. التاريخ البريطاني يوم/شهر/سنة والأمريكي شهر/يوم/سنة. BLOCK CAPITALS = حروف كبيرة كلها."
        }
      ],
      "hard": [
        {
          "id": "scw_402_h1",
          "type": "order",
          "promptEn": "Put the words in order: XXXX / +966 / Mobile / number: / XXX / 5X",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (رقم الجوال)",
          "answer": "Mobile number: +966 5X XXX XXXX",
          "explanationAr": "الترتيب الصحيح: Mobile number: +966 5X XXX XXXX"
        },
        {
          "id": "scw_402_h2",
          "type": "order",
          "promptEn": "Put the words in order: Signature: / here) / (sign",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (التوقيع: (وقّع هنا))",
          "answer": "Signature: (sign here)",
          "explanationAr": "الترتيب الصحيح: Signature: (sign here)"
        },
        {
          "id": "scw_402_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: اسم العائلة: القحطاني",
          "answer": "Surname: Alqahtani",
          "explanationAr": "ترجمة مقترحة: Surname: Alqahtani"
        },
        {
          "id": "scw_402_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: تاريخ الميلاد: ١٤/٠٣/٢٠١٠",
          "answer": "Date of birth: 14/03/2010",
          "explanationAr": "ترجمة مقترحة: Date of birth: 14/03/2010"
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Mixing UK and US dates (03/04)",
        "correct": "Write the month as a word if unsure: 3 April",
        "whyAr": "٠٣/٠٤ ممكن تعني مارس أو أبريل."
      },
      {
        "incorrect": "Writing full sentences in fields",
        "correct": "Short answers only",
        "whyAr": "النموذج يبي الجواب فقط."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (رسالة من الإجازة (الماضي البسيط)): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "The rocks was huge.",
          "The rocks were huge."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: The rocks were huge. — الجمع ⇐ were.",
        "fromLessonId": "scw_412_s"
      },
      {
        "questionAr": "مراجعة (وصف بيتي وغرفتي): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "There is two chairs.",
          "There are two chairs."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: There are two chairs. — الجمع ⇐ are.",
        "fromLessonId": "scw_410"
      },
      {
        "questionAr": "مراجعة (رسائل الواتساب القصيرة: التحية والرد): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'm fine.",
          "Im fine."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I'm fine. — الفاصلة العليا (') لازمة.",
        "fromLessonId": "scw_407"
      },
      {
        "questionAr": "ما معنى \"graduation\"؟",
        "questionEn": "What does \"graduation\" mean?",
        "options": [
          "تخرج",
          "يسعدني",
          "يجي",
          "عشاء"
        ],
        "correctIndex": 0,
        "explanationAr": "\"graduation\" /ˌɡrædʒuˈeɪʃən/ تعني: تخرج. مثال: my graduation",
        "fromLessonId": "scw_411_s"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (الاسم الأول: فيصل)",
          "questionEn": "Complete: ____: Faisal",
          "options": [
            "Surname",
            "Nickname",
            "First name"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: First name. اعرف كلمات النماذج: First name (الاسم الأول)، Surname/Last name (اسم العائلة)، Date of birth (تاريخ الميلاد)، Nationality، Address، Signature. التاريخ البريطاني يوم/شهر/سنة والأمريكي شهر/يوم/سنة. BLOCK CAPITALS = حروف كبيرة كلها."
        },
        {
          "questionAr": "أكمل الفراغ: (اسم العائلة: القحطاني)",
          "questionEn": "Complete: ____: Alqahtani",
          "options": [
            "Surname",
            "Middle",
            "First name"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: Surname. اعرف كلمات النماذج: First name (الاسم الأول)، Surname/Last name (اسم العائلة)، Date of birth (تاريخ الميلاد)، Nationality، Address، Signature. التاريخ البريطاني يوم/شهر/سنة والأمريكي شهر/يوم/سنة. BLOCK CAPITALS = حروف كبيرة كلها."
        },
        {
          "questionAr": "الجنسية الصحيحة:",
          "questionEn": "Correct nationality:",
          "options": [
            "Saudi",
            "Saudi Arabia",
            "Riyadh"
          ],
          "correctIndex": 0,
          "explanationAr": "Saudi."
        },
        {
          "questionAr": "surname يعني:",
          "questionEn": "'surname' means:",
          "options": [
            "الاسم الأول",
            "اسم العائلة",
            "اللقب"
          ],
          "correctIndex": 1,
          "explanationAr": "اسم العائلة."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Nationality: Saudi",
            "Nationality: Saudi Arabia"
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: Nationality: Saudi — الجنسية صفة: Saudi، والبلد Saudi Arabia."
        }
      ]
    }
  },
  {
    "id": "scw_413",
    "pillarId": "writing",
    "pillarNameAr": "الكتابة التعبيرية الحوارية",
    "pillarNameEn": "Conversational Writing & Quick Messaging",
    "pillarIcon": "✍️",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "رسالة اعتذار",
    "titleEn": "Writing an Apology Message",
    "descAr": "اعتذر برسالة: اعترف، وضّح السبب، واقترح حل.",
    "descEn": "Apologise in a message: admit, explain, offer a solution.",
    "speakingGoalAr": "اكتب ٣ رسائل اعتذار بمواقف مختلفة.",
    "speakingGoalEn": "Write three apology messages.",
    "keyPattern": {
      "ruleAr": "الاعتذار: I'm sorry (that/for) + المشكلة، ثم السبب I was.../I had to...، ثم الحل I'll.../Can we...? لا تكثر الأعذار.",
      "ruleEn": "Apology = I'm sorry for/that + problem + reason + solution (I'll... / Can we...?).",
      "formula": "I'm sorry I + past. + I had to... + I'll / Can we...?"
    },
    "practicalExamples": [
      {
        "en": "I'm sorry I was late.",
        "ar": "آسف تأخرت."
      },
      {
        "en": "I'm sorry for missing your call.",
        "ar": "آسف ما رديت على اتصالك."
      },
      {
        "en": "I had to help my dad.",
        "ar": "اضطريت أساعد أبوي."
      },
      {
        "en": "I'll call you tonight.",
        "ar": "بتصل عليك الليلة."
      },
      {
        "en": "Can we meet tomorrow instead?",
        "ar": "نقدر نتقابل بكرة بدالها؟"
      },
      {
        "en": "It won't happen again.",
        "ar": "ما راح تتكرر."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Sorry for I was late.",
        "correct": "Sorry I was late. / Sorry for being late.",
        "whyAr": "for + -ing، أو بدون for مع جملة."
      },
      {
        "incorrect": "I'm sorry, the traffic, my phone, my brother...",
        "correct": "I'm sorry. The traffic was terrible.",
        "whyAr": "سبب واحد يكفي."
      },
      {
        "incorrect": "I must helped my dad.",
        "correct": "I had to help my dad.",
        "whyAr": "الماضي من must ⇐ had to."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اكتب اعتذار لأنك نسيت عيد ميلاد صديقك.",
      "promptEn": "Apologise for forgetting a friend's birthday.",
      "saraQuestionAr": "اكتب اعتذار + سبب + حل.",
      "saraQuestionEn": "Write apology + reason + solution.",
      "recommendedResponseEn": "Hi Lama, I'm so sorry I forgot your birthday! I had exams all week. Can I take you for coffee on Saturday? Happy birthday!"
    },
    "quiz": [
      {
        "questionAr": "أكمل: I'm sorry ___ being late.",
        "questionEn": "Complete: I'm sorry ___ being late.",
        "options": [
          "of",
          "for",
          "to"
        ],
        "correctIndex": 1,
        "explanationAr": "sorry for + -ing."
      },
      {
        "questionAr": "أي جملة تقترح حل؟",
        "questionEn": "Which offers a solution?",
        "options": [
          "I was busy.",
          "Can we meet tomorrow?",
          "I'm sorry."
        ],
        "correctIndex": 1,
        "explanationAr": "اقتراح موعد."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Sorry for I was late.",
          "Sorry I was late. / Sorry for being late."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Sorry I was late. / Sorry for being late. — for + -ing، أو بدون for مع جملة."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'm sorry, the traffic, my phone, my brother...",
          "I'm sorry. The traffic was terrible."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I'm sorry. The traffic was terrible. — سبب واحد يكفي."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I must helped my dad.",
          "I had to help my dad."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I had to help my dad. — الماضي من must ⇐ had to."
      }
    ],
    "whiteboardNotes": {
      "title": "Writing an Apology Message",
      "pointsAr": [
        "يعتذر كتابياً.",
        "يذكر سبب مختصر.",
        "يقترح حل.",
        "الاعتذار: I'm sorry (that/for) + المشكلة، ثم السبب I was.../I had to...، ثم الحل I'll.../Can we...? لا تكثر الأعذار."
      ],
      "pointsEn": [
        "Apologise in writing.",
        "Give a short reason.",
        "Offer a solution.",
        "Apology = I'm sorry for/that + problem + reason + solution (I'll... / Can we...?)."
      ],
      "chalkHighlight": "I'm sorry I + past. + I had to... + I'll / Can we...?"
    },
    "unit": 3,
    "cefr": "A1",
    "objectivesAr": [
      "يعتذر كتابياً.",
      "يذكر سبب مختصر.",
      "يقترح حل."
    ],
    "objectivesEn": [
      "Apologise in writing.",
      "Give a short reason.",
      "Offer a solution."
    ],
    "vocabulary": [
      {
        "word": "sorry",
        "ipa": "/ˈsɑːri/",
        "ar": "آسف",
        "exampleEn": "I'm so sorry.",
        "exampleAr": "آسف مرة."
      },
      {
        "word": "late",
        "ipa": "/leɪt/",
        "ar": "متأخر",
        "exampleEn": "late for class",
        "exampleAr": "متأخر عن الحصة"
      },
      {
        "word": "miss",
        "ipa": "/mɪs/",
        "ar": "يفوّت",
        "exampleEn": "miss a call",
        "exampleAr": "تفوته مكالمة"
      },
      {
        "word": "forget",
        "ipa": "/fərˈɡɛt/",
        "ar": "ينسى",
        "exampleEn": "I forgot.",
        "exampleAr": "نسيت."
      },
      {
        "word": "traffic",
        "ipa": "/ˈtræfɪk/",
        "ar": "زحمة",
        "exampleEn": "heavy traffic",
        "exampleAr": "زحمة قوية"
      },
      {
        "word": "instead",
        "ipa": "/ɪnˈstɛd/",
        "ar": "بدال",
        "exampleEn": "tomorrow instead",
        "exampleAr": "بكرة بدالها"
      },
      {
        "word": "again",
        "ipa": "/əˈɡɛn/",
        "ar": "مرة ثانية",
        "exampleEn": "never again",
        "exampleAr": "ما تتكرر"
      },
      {
        "word": "excuse",
        "ipa": "/ɪkˈskjuːs/",
        "ar": "عذر",
        "exampleEn": "a good excuse",
        "exampleAr": "عذر مقبول"
      },
      {
        "word": "promise",
        "ipa": "/ˈprɑːmɪs/",
        "ar": "يوعد",
        "exampleEn": "I promise.",
        "exampleAr": "أوعدك."
      },
      {
        "word": "understand",
        "ipa": "/ˌʌndərˈstænd/",
        "ar": "يفهم/يعذر",
        "exampleEn": "I hope you understand.",
        "exampleAr": "إن شاء الله تعذرني."
      }
    ],
    "grammarFocus": {
      "ruleAr": "الاعتذار: I'm sorry (that/for) + المشكلة، ثم السبب I was.../I had to...، ثم الحل I'll.../Can we...? لا تكثر الأعذار.",
      "ruleEn": "Apology = I'm sorry for/that + problem + reason + solution (I'll... / Can we...?).",
      "formula": "I'm sorry I + past. + I had to... + I'll / Can we...?",
      "examples": [
        {
          "en": "I'm sorry I was late.",
          "ar": "آسف تأخرت."
        },
        {
          "en": "I'm sorry for missing your call.",
          "ar": "آسف ما رديت على اتصالك."
        },
        {
          "en": "I had to help my dad.",
          "ar": "اضطريت أساعد أبوي."
        },
        {
          "en": "I'll call you tonight.",
          "ar": "بتصل عليك الليلة."
        },
        {
          "en": "Can we meet tomorrow instead?",
          "ar": "نقدر نتقابل بكرة بدالها؟"
        },
        {
          "en": "It won't happen again.",
          "ar": "ما راح تتكرر."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Student",
        "en": "Hi Ahmed, I'm really sorry I missed the match.",
        "ar": "هلا أحمد، آسف مرة فوّت المباراة."
      },
      {
        "speaker": "Ahmed",
        "en": "What happened?",
        "ar": "وش صار؟"
      },
      {
        "speaker": "Student",
        "en": "I had to take my grandma to the hospital.",
        "ar": "اضطريت أودي جدتي المستشفى."
      },
      {
        "speaker": "Ahmed",
        "en": "Oh no! Is she OK?",
        "ar": "لا! هي بخير؟"
      },
      {
        "speaker": "Student",
        "en": "Yes, thank God. Can we play next week?",
        "ar": "إيه الحمدلله. نقدر نلعب الأسبوع الجاي؟"
      },
      {
        "speaker": "Ahmed",
        "en": "Of course. No problem!",
        "ar": "أكيد. ولا يهمك!"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Student: Hi Ahmed, I'm really sorry I missed the match.\nAhmed: What happened?\nStudent: I had to take my grandma to the hospital.\nAhmed: Oh no! Is she OK?\nStudent: Yes, thank God. Can we play next week?\nAhmed: Of course. No problem!",
      "questions": [
        {
          "questionAr": "وش فوّت؟",
          "questionEn": "What did the student miss?",
          "options": [
            "a class",
            "the match",
            "a party"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: the match"
        },
        {
          "questionAr": "ليش؟",
          "questionEn": "Why?",
          "options": [
            "traffic",
            "his grandma was in hospital",
            "he forgot"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: his grandma was in hospital"
        },
        {
          "questionAr": "وش اقترح؟",
          "questionEn": "What does he suggest?",
          "options": [
            "play next week",
            "play tonight",
            "cancel"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: play next week"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "sorry vs sorrow",
      "items": [
        "sorry /ˈsɑːri/",
        "So sorry! (stress SO)"
      ],
      "tipAr": "التأكيد على SO يبين صدق الاعتذار."
    },
    "exercises": {
      "easy": [
        {
          "id": "scw_413_e1",
          "type": "meaning",
          "promptEn": "What does \"sorry\" mean?",
          "promptAr": "ما معنى \"sorry\"؟",
          "options": [
            "يفهم/يعذر",
            "يوعد",
            "آسف",
            "متأخر"
          ],
          "correctIndex": 2,
          "answer": "آسف",
          "explanationAr": "\"sorry\" /ˈsɑːri/ تعني: آسف. مثال: I'm so sorry."
        },
        {
          "id": "scw_413_e2",
          "type": "meaning",
          "promptEn": "What does \"late\" mean?",
          "promptAr": "ما معنى \"late\"؟",
          "options": [
            "آسف",
            "يفوّت",
            "زحمة",
            "متأخر"
          ],
          "correctIndex": 3,
          "answer": "متأخر",
          "explanationAr": "\"late\" /leɪt/ تعني: متأخر. مثال: late for class"
        },
        {
          "id": "scw_413_e3",
          "type": "meaning",
          "promptEn": "What does \"miss\" mean?",
          "promptAr": "ما معنى \"miss\"؟",
          "options": [
            "متأخر",
            "آسف",
            "يوعد",
            "يفوّت"
          ],
          "correctIndex": 3,
          "answer": "يفوّت",
          "explanationAr": "\"miss\" /mɪs/ تعني: يفوّت. مثال: miss a call"
        },
        {
          "id": "scw_413_e4",
          "type": "meaning",
          "promptEn": "What does \"forget\" mean?",
          "promptAr": "ما معنى \"forget\"؟",
          "options": [
            "آسف",
            "ينسى",
            "زحمة",
            "يوعد"
          ],
          "correctIndex": 1,
          "answer": "ينسى",
          "explanationAr": "\"forget\" /fərˈɡɛt/ تعني: ينسى. مثال: I forgot."
        }
      ],
      "medium": [
        {
          "id": "scw_413_m1",
          "type": "gap",
          "promptEn": "Complete: I'm ____ I was late.",
          "promptAr": "أكمل الفراغ: (آسف تأخرت.)",
          "options": [
            "sad",
            "sorrow",
            "sorry"
          ],
          "correctIndex": 2,
          "answer": "I'm sorry I was late.",
          "explanationAr": "الإجابة: sorry. الاعتذار: I'm sorry (that/for) + المشكلة، ثم السبب I was.../I had to...، ثم الحل I'll.../Can we...? لا تكثر الأعذار."
        },
        {
          "id": "scw_413_m2",
          "type": "gap",
          "promptEn": "Complete: I'm sorry ____ missing your call.",
          "promptAr": "أكمل الفراغ: (آسف ما رديت على اتصالك.)",
          "options": [
            "for",
            "to",
            "of"
          ],
          "correctIndex": 0,
          "answer": "I'm sorry for missing your call.",
          "explanationAr": "الإجابة: for. الاعتذار: I'm sorry (that/for) + المشكلة، ثم السبب I was.../I had to...، ثم الحل I'll.../Can we...? لا تكثر الأعذار."
        },
        {
          "id": "scw_413_m3",
          "type": "gap",
          "promptEn": "Complete: I ____ help my dad.",
          "promptAr": "أكمل الفراغ: (اضطريت أساعد أبوي.)",
          "options": [
            "must",
            "had to",
            "have"
          ],
          "correctIndex": 1,
          "answer": "I had to help my dad.",
          "explanationAr": "الإجابة: had to. الاعتذار: I'm sorry (that/for) + المشكلة، ثم السبب I was.../I had to...، ثم الحل I'll.../Can we...? لا تكثر الأعذار."
        },
        {
          "id": "scw_413_m4",
          "type": "gap",
          "promptEn": "Complete: ____ call you tonight.",
          "promptAr": "أكمل الفراغ: (بتصل عليك الليلة.)",
          "options": [
            "I'm",
            "I",
            "I'll"
          ],
          "correctIndex": 2,
          "answer": "I'll call you tonight.",
          "explanationAr": "الإجابة: I'll. الاعتذار: I'm sorry (that/for) + المشكلة، ثم السبب I was.../I had to...، ثم الحل I'll.../Can we...? لا تكثر الأعذار."
        }
      ],
      "hard": [
        {
          "id": "scw_413_h1",
          "type": "order",
          "promptEn": "Put the words in order: instead? / we / tomorrow / meet / Can",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (نقدر نتقابل بكرة بدالها؟)",
          "answer": "Can we meet tomorrow instead?",
          "explanationAr": "الترتيب الصحيح: Can we meet tomorrow instead?"
        },
        {
          "id": "scw_413_h2",
          "type": "order",
          "promptEn": "Put the words in order: again. / won't / happen / It",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (ما راح تتكرر.)",
          "answer": "It won't happen again.",
          "explanationAr": "الترتيب الصحيح: It won't happen again."
        },
        {
          "id": "scw_413_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: آسف ما رديت على اتصالك.",
          "answer": "I'm sorry for missing your call.",
          "explanationAr": "ترجمة مقترحة: I'm sorry for missing your call."
        },
        {
          "id": "scw_413_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: بتصل عليك الليلة.",
          "answer": "I'll call you tonight.",
          "explanationAr": "ترجمة مقترحة: I'll call you tonight."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Over-long excuses",
        "correct": "Short reason + solution",
        "whyAr": "الإنجليز يفضلون الاعتذار المختصر."
      },
      {
        "incorrect": "No solution offered",
        "correct": "Add: Can we...? / I'll...",
        "whyAr": "الحل يخلي الاعتذار أقوى."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (تعبئة النماذج): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Surname: Faisal",
          "Surname: Alqahtani"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Surname: Alqahtani — surname = اسم العائلة.",
        "fromLessonId": "scw_402"
      },
      {
        "questionAr": "مراجعة (رسالة دعوة): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Would you like to come?",
          "Would you like come?"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Would you like to come? — would like + to.",
        "fromLessonId": "scw_411_s"
      },
      {
        "questionAr": "مراجعة (ربط الجمل بـ and و but): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I like tea, and I don't like coffee.",
          "I like tea, but I don't like coffee."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I like tea, but I don't like coffee. — الفكرتين متعاكسة ⇐ but.",
        "fromLessonId": "scw_408"
      },
      {
        "questionAr": "ما معنى \"last week\"؟",
        "questionEn": "What does \"last week\" mean?",
        "options": [
          "جو/طقس",
          "الأسبوع اللي فات",
          "رحلة",
          "شاطئ"
        ],
        "correctIndex": 1,
        "explanationAr": "\"last week\" /læst wiːk/ تعني: الأسبوع اللي فات. مثال: last week",
        "fromLessonId": "scw_412_s"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (آسف تأخرت.)",
          "questionEn": "Complete: I'm ____ I was late.",
          "options": [
            "sad",
            "sorrow",
            "sorry"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: sorry. الاعتذار: I'm sorry (that/for) + المشكلة، ثم السبب I was.../I had to...، ثم الحل I'll.../Can we...? لا تكثر الأعذار."
        },
        {
          "questionAr": "أكمل الفراغ: (آسف ما رديت على اتصالك.)",
          "questionEn": "Complete: I'm sorry ____ missing your call.",
          "options": [
            "for",
            "to",
            "of"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: for. الاعتذار: I'm sorry (that/for) + المشكلة، ثم السبب I was.../I had to...، ثم الحل I'll.../Can we...? لا تكثر الأعذار."
        },
        {
          "questionAr": "أكمل: I'm sorry ___ being late.",
          "questionEn": "Complete: I'm sorry ___ being late.",
          "options": [
            "of",
            "for",
            "to"
          ],
          "correctIndex": 1,
          "explanationAr": "sorry for + -ing."
        },
        {
          "questionAr": "أي جملة تقترح حل؟",
          "questionEn": "Which offers a solution?",
          "options": [
            "I was busy.",
            "Can we meet tomorrow?",
            "I'm sorry."
          ],
          "correctIndex": 1,
          "explanationAr": "اقتراح موعد."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Sorry for I was late.",
            "Sorry I was late. / Sorry for being late."
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: Sorry I was late. / Sorry for being late. — for + -ing، أو بدون for مع جملة."
        }
      ]
    }
  },
  {
    "id": "scw_414",
    "pillarId": "writing",
    "pillarNameAr": "الكتابة التعبيرية الحوارية",
    "pillarNameEn": "Conversational Writing & Quick Messaging",
    "pillarIcon": "✍️",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "محادثة خدمة العملاء في التطبيقات",
    "titleEn": "Customer Service Chat in Apps",
    "descAr": "اكتب لخدمة عملاء تطبيق توصيل أو متجر: المشكلة، رقم الطلب، والطلب بأدب.",
    "descEn": "Write to an app's customer service: problem, order number, polite request.",
    "speakingGoalAr": "اكتب محادثة كاملة لحل مشكلة طلب.",
    "speakingGoalEn": "Write a full chat resolving an order problem.",
    "keyPattern": {
      "ruleAr": "ابدأ بالمشكلة مباشرة مع رقم الطلب، ثم اطلب بأدب: Could you please...? / I would like a refund/replacement. ختام: Thank you for your help.",
      "ruleEn": "State the problem + order number, then request politely: Could you please...? I'd like a refund/replacement.",
      "formula": "Problem + order # → Could you please + verb? → Thank you."
    },
    "practicalExamples": [
      {
        "en": "My order hasn't arrived yet.",
        "ar": "طلبي لسى ما وصل."
      },
      {
        "en": "The order number is 45821.",
        "ar": "رقم الطلب ٤٥٨٢١."
      },
      {
        "en": "Could you please check?",
        "ar": "ممكن تتأكد لو سمحت؟"
      },
      {
        "en": "I would like a refund.",
        "ar": "أبي استرجاع المبلغ."
      },
      {
        "en": "One item is missing.",
        "ar": "فيه غرض ناقص."
      },
      {
        "en": "Thank you for your help.",
        "ar": "شكراً على مساعدتك."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "I want my money now!",
        "correct": "I would like a refund, please.",
        "whyAr": "الأسلوب المهذب يحل المشكلة أسرع."
      },
      {
        "incorrect": "My order not arrived.",
        "correct": "My order hasn't arrived.",
        "whyAr": "has not + arrived."
      },
      {
        "incorrect": "The burger is cold, the fries are cold...",
        "correct": "My food arrived cold. Order #45821.",
        "whyAr": "اختصر ووضح."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اكتب لخدمة العملاء: الطلب ناقص مشروب.",
      "promptEn": "Write to support: a drink is missing.",
      "saraQuestionAr": "أنا خدمة العملاء، تفضل!",
      "saraQuestionEn": "I'm customer service. Go ahead!",
      "recommendedResponseEn": "Hi, my order #73019 arrived, but one item is missing: a large orange juice. Could you please refund it or send it? Thank you."
    },
    "quiz": [
      {
        "questionAr": "أكثر طلب مهذب:",
        "questionEn": "Most polite:",
        "options": [
          "Give me a refund.",
          "I would like a refund, please.",
          "Refund now."
        ],
        "correctIndex": 1,
        "explanationAr": "I would like..."
      },
      {
        "questionAr": "refund يعني:",
        "questionEn": "'refund' means:",
        "options": [
          "استبدال",
          "استرجاع المبلغ",
          "خصم"
        ],
        "correctIndex": 1,
        "explanationAr": "استرجاع المبلغ."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I want my money now!",
          "I would like a refund, please."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I would like a refund, please. — الأسلوب المهذب يحل المشكلة أسرع."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "My order not arrived.",
          "My order hasn't arrived."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: My order hasn't arrived. — has not + arrived."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "My food arrived cold. Order #45821.",
          "The burger is cold, the fries are cold..."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: My food arrived cold. Order #45821. — اختصر ووضح."
      }
    ],
    "whiteboardNotes": {
      "title": "Customer Service Chat in Apps",
      "pointsAr": [
        "يوضح المشكلة بإيجاز.",
        "يطلب بأدب.",
        "يستخدم مفردات الطلبات.",
        "ابدأ بالمشكلة مباشرة مع رقم الطلب، ثم اطلب بأدب: Could you please...? / I would like a refund/replacement. ختام: Thank you for your help."
      ],
      "pointsEn": [
        "State a problem concisely.",
        "Make polite requests.",
        "Use order-related vocabulary.",
        "State the problem + order number, then request politely: Could you please...? I'd like a refund/replacement."
      ],
      "chalkHighlight": "Problem + order # → Could you please + verb? → Thank you."
    },
    "unit": 3,
    "cefr": "A2",
    "objectivesAr": [
      "يوضح المشكلة بإيجاز.",
      "يطلب بأدب.",
      "يستخدم مفردات الطلبات."
    ],
    "objectivesEn": [
      "State a problem concisely.",
      "Make polite requests.",
      "Use order-related vocabulary."
    ],
    "vocabulary": [
      {
        "word": "order",
        "ipa": "/ˈɔːrdər/",
        "ar": "طلب",
        "exampleEn": "my order",
        "exampleAr": "طلبي"
      },
      {
        "word": "delivery",
        "ipa": "/dɪˈlɪvəri/",
        "ar": "توصيل",
        "exampleEn": "late delivery",
        "exampleAr": "توصيل متأخر"
      },
      {
        "word": "refund",
        "ipa": "/ˈriːfʌnd/",
        "ar": "استرجاع مبلغ",
        "exampleEn": "get a refund",
        "exampleAr": "يسترجع فلوسه"
      },
      {
        "word": "missing",
        "ipa": "/ˈmɪsɪŋ/",
        "ar": "ناقص",
        "exampleEn": "an item is missing",
        "exampleAr": "غرض ناقص"
      },
      {
        "word": "wrong",
        "ipa": "/rɔːŋ/",
        "ar": "غلط",
        "exampleEn": "the wrong order",
        "exampleAr": "طلب غلط"
      },
      {
        "word": "replacement",
        "ipa": "/rɪˈpleɪsmənt/",
        "ar": "استبدال",
        "exampleEn": "send a replacement",
        "exampleAr": "يرسل بديل"
      },
      {
        "word": "receipt",
        "ipa": "/rɪˈsiːt/",
        "ar": "فاتورة",
        "exampleEn": "Keep the receipt.",
        "exampleAr": "احتفظ بالفاتورة."
      },
      {
        "word": "driver",
        "ipa": "/ˈdraɪvər/",
        "ar": "مندوب/سائق",
        "exampleEn": "the delivery driver",
        "exampleAr": "مندوب التوصيل"
      },
      {
        "word": "cancel",
        "ipa": "/ˈkænsəl/",
        "ar": "يلغي",
        "exampleEn": "cancel the order",
        "exampleAr": "يلغي الطلب"
      },
      {
        "word": "apologise",
        "ipa": "/əˈpɑːlədʒaɪz/",
        "ar": "يعتذر",
        "exampleEn": "We apologise.",
        "exampleAr": "نعتذر."
      }
    ],
    "grammarFocus": {
      "ruleAr": "ابدأ بالمشكلة مباشرة مع رقم الطلب، ثم اطلب بأدب: Could you please...? / I would like a refund/replacement. ختام: Thank you for your help.",
      "ruleEn": "State the problem + order number, then request politely: Could you please...? I'd like a refund/replacement.",
      "formula": "Problem + order # → Could you please + verb? → Thank you.",
      "examples": [
        {
          "en": "My order hasn't arrived yet.",
          "ar": "طلبي لسى ما وصل."
        },
        {
          "en": "The order number is 45821.",
          "ar": "رقم الطلب ٤٥٨٢١."
        },
        {
          "en": "Could you please check?",
          "ar": "ممكن تتأكد لو سمحت؟"
        },
        {
          "en": "I would like a refund.",
          "ar": "أبي استرجاع المبلغ."
        },
        {
          "en": "One item is missing.",
          "ar": "فيه غرض ناقص."
        },
        {
          "en": "Thank you for your help.",
          "ar": "شكراً على مساعدتك."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Agent",
        "en": "Hello! How can I help you today?",
        "ar": "مرحبا! كيف أقدر أساعدك؟"
      },
      {
        "speaker": "Student",
        "en": "Hi. I received the wrong order. Order number 45821.",
        "ar": "هلا. وصلني طلب غلط. رقم ٤٥٨٢١."
      },
      {
        "speaker": "Agent",
        "en": "I'm sorry about that. What did you receive?",
        "ar": "نعتذر. وش اللي وصلك؟"
      },
      {
        "speaker": "Student",
        "en": "Chicken shawarma, but I ordered falafel.",
        "ar": "شاورما دجاج، وأنا طالب فلافل."
      },
      {
        "speaker": "Agent",
        "en": "We'll send the correct order now, free of charge.",
        "ar": "بنرسل الطلب الصحيح الحين مجاناً."
      },
      {
        "speaker": "Student",
        "en": "Thank you for your help.",
        "ar": "شكراً على مساعدتك."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Agent: Hello! How can I help you today?\nStudent: Hi. I received the wrong order. Order number 45821.\nAgent: I'm sorry about that. What did you receive?\nStudent: Chicken shawarma, but I ordered falafel.\nAgent: We'll send the correct order now, free of charge.\nStudent: Thank you for your help.",
      "questions": [
        {
          "questionAr": "المشكلة؟",
          "questionEn": "What was the problem?",
          "options": [
            "late order",
            "wrong order",
            "missing drink"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: wrong order"
        },
        {
          "questionAr": "وش طلب؟",
          "questionEn": "What did he order?",
          "options": [
            "shawarma",
            "falafel",
            "burger"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: falafel"
        },
        {
          "questionAr": "الحل؟",
          "questionEn": "What is the solution?",
          "options": [
            "refund",
            "a new order free",
            "a coupon"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: a new order free"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Polite tone words",
      "items": [
        "Could you please /kʊdʒu pliːz/",
        "I would like /aɪ wʊd laɪk/"
      ],
      "tipAr": "حتى في الكتابة، please وcould تغير النبرة."
    },
    "exercises": {
      "easy": [
        {
          "id": "scw_414_e1",
          "type": "meaning",
          "promptEn": "What does \"order\" mean?",
          "promptAr": "ما معنى \"order\"؟",
          "options": [
            "غلط",
            "استبدال",
            "يعتذر",
            "طلب"
          ],
          "correctIndex": 3,
          "answer": "طلب",
          "explanationAr": "\"order\" /ˈɔːrdər/ تعني: طلب. مثال: my order"
        },
        {
          "id": "scw_414_e2",
          "type": "meaning",
          "promptEn": "What does \"delivery\" mean?",
          "promptAr": "ما معنى \"delivery\"؟",
          "options": [
            "توصيل",
            "ناقص",
            "طلب",
            "يلغي"
          ],
          "correctIndex": 0,
          "answer": "توصيل",
          "explanationAr": "\"delivery\" /dɪˈlɪvəri/ تعني: توصيل. مثال: late delivery"
        },
        {
          "id": "scw_414_e3",
          "type": "meaning",
          "promptEn": "What does \"refund\" mean?",
          "promptAr": "ما معنى \"refund\"؟",
          "options": [
            "استبدال",
            "يعتذر",
            "استرجاع مبلغ",
            "فاتورة"
          ],
          "correctIndex": 2,
          "answer": "استرجاع مبلغ",
          "explanationAr": "\"refund\" /ˈriːfʌnd/ تعني: استرجاع مبلغ. مثال: get a refund"
        },
        {
          "id": "scw_414_e4",
          "type": "meaning",
          "promptEn": "What does \"missing\" mean?",
          "promptAr": "ما معنى \"missing\"؟",
          "options": [
            "مندوب/سائق",
            "توصيل",
            "يعتذر",
            "ناقص"
          ],
          "correctIndex": 3,
          "answer": "ناقص",
          "explanationAr": "\"missing\" /ˈmɪsɪŋ/ تعني: ناقص. مثال: an item is missing"
        }
      ],
      "medium": [
        {
          "id": "scw_414_m1",
          "type": "gap",
          "promptEn": "Complete: My order hasn't ____ yet.",
          "promptAr": "أكمل الفراغ: (طلبي لسى ما وصل.)",
          "options": [
            "arrive",
            "arrived",
            "arriving"
          ],
          "correctIndex": 1,
          "answer": "My order hasn't arrived yet.",
          "explanationAr": "الإجابة: arrived. ابدأ بالمشكلة مباشرة مع رقم الطلب، ثم اطلب بأدب: Could you please...? / I would like a refund/replacement. ختام: Thank you for your help."
        },
        {
          "id": "scw_414_m2",
          "type": "gap",
          "promptEn": "Complete: The order ____ is 45821.",
          "promptAr": "أكمل الفراغ: (رقم الطلب ٤٥٨٢١.)",
          "options": [
            "numeral",
            "count",
            "number"
          ],
          "correctIndex": 2,
          "answer": "The order number is 45821.",
          "explanationAr": "الإجابة: number. ابدأ بالمشكلة مباشرة مع رقم الطلب، ثم اطلب بأدب: Could you please...? / I would like a refund/replacement. ختام: Thank you for your help."
        },
        {
          "id": "scw_414_m3",
          "type": "gap",
          "promptEn": "Complete: ____ you please check?",
          "promptAr": "أكمل الفراغ: (ممكن تتأكد لو سمحت؟)",
          "options": [
            "Should",
            "Can't",
            "Could"
          ],
          "correctIndex": 2,
          "answer": "Could you please check?",
          "explanationAr": "الإجابة: Could. ابدأ بالمشكلة مباشرة مع رقم الطلب، ثم اطلب بأدب: Could you please...? / I would like a refund/replacement. ختام: Thank you for your help."
        },
        {
          "id": "scw_414_m4",
          "type": "gap",
          "promptEn": "Complete: I would like a ____.",
          "promptAr": "أكمل الفراغ: (أبي استرجاع المبلغ.)",
          "options": [
            "money back again",
            "refund",
            "return back"
          ],
          "correctIndex": 1,
          "answer": "I would like a refund.",
          "explanationAr": "الإجابة: refund. ابدأ بالمشكلة مباشرة مع رقم الطلب، ثم اطلب بأدب: Could you please...? / I would like a refund/replacement. ختام: Thank you for your help."
        }
      ],
      "hard": [
        {
          "id": "scw_414_h1",
          "type": "order",
          "promptEn": "Put the words in order: missing. / item / One / is",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (فيه غرض ناقص.)",
          "answer": "One item is missing.",
          "explanationAr": "الترتيب الصحيح: One item is missing."
        },
        {
          "id": "scw_414_h2",
          "type": "order",
          "promptEn": "Put the words in order: you / your / Thank / for / help.",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (شكراً على مساعدتك.)",
          "answer": "Thank you for your help.",
          "explanationAr": "الترتيب الصحيح: Thank you for your help."
        },
        {
          "id": "scw_414_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: رقم الطلب ٤٥٨٢١.",
          "answer": "The order number is 45821.",
          "explanationAr": "ترجمة مقترحة: The order number is 45821."
        },
        {
          "id": "scw_414_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أبي استرجاع المبلغ.",
          "answer": "I would like a refund.",
          "explanationAr": "ترجمة مقترحة: I would like a refund."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "ALL CAPS when angry",
        "correct": "Normal case",
        "whyAr": "الحروف الكبيرة كلها تعني صراخ."
      },
      {
        "incorrect": "No order number",
        "correct": "Always include it",
        "whyAr": "يوفر وقت."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (رسالة اعتذار): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I'm sorry. The traffic was terrible.",
          "I'm sorry, the traffic, my phone, my brother..."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I'm sorry. The traffic was terrible. — سبب واحد يكفي.",
        "fromLessonId": "scw_413"
      },
      {
        "questionAr": "مراجعة (رسالة من الإجازة (الماضي البسيط)): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "We goed to Abha.",
          "We went to Abha."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: We went to Abha. — go شاذ ⇐ went.",
        "fromLessonId": "scw_412_s"
      },
      {
        "questionAr": "مراجعة (فقرة عن يومي): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I go to school by bus.",
          "I go to school with bus."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I go to school by bus. — وسيلة المواصلات بـ by.",
        "fromLessonId": "scw_409"
      },
      {
        "questionAr": "ما معنى \"tick\"؟",
        "questionEn": "What does \"tick\" mean?",
        "options": [
          "الاسم الأول",
          "المهنة",
          "العنوان",
          "يأشّر ✓"
        ],
        "correctIndex": 3,
        "explanationAr": "\"tick\" /tɪk/ تعني: يأشّر ✓. مثال: tick the box",
        "fromLessonId": "scw_402"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (طلبي لسى ما وصل.)",
          "questionEn": "Complete: My order hasn't ____ yet.",
          "options": [
            "arrive",
            "arrived",
            "arriving"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: arrived. ابدأ بالمشكلة مباشرة مع رقم الطلب، ثم اطلب بأدب: Could you please...? / I would like a refund/replacement. ختام: Thank you for your help."
        },
        {
          "questionAr": "أكمل الفراغ: (رقم الطلب ٤٥٨٢١.)",
          "questionEn": "Complete: The order ____ is 45821.",
          "options": [
            "numeral",
            "count",
            "number"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: number. ابدأ بالمشكلة مباشرة مع رقم الطلب، ثم اطلب بأدب: Could you please...? / I would like a refund/replacement. ختام: Thank you for your help."
        },
        {
          "questionAr": "أكثر طلب مهذب:",
          "questionEn": "Most polite:",
          "options": [
            "Give me a refund.",
            "I would like a refund, please.",
            "Refund now."
          ],
          "correctIndex": 1,
          "explanationAr": "I would like..."
        },
        {
          "questionAr": "refund يعني:",
          "questionEn": "'refund' means:",
          "options": [
            "استبدال",
            "استرجاع المبلغ",
            "خصم"
          ],
          "correctIndex": 1,
          "explanationAr": "استرجاع المبلغ."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "I want my money now!",
            "I would like a refund, please."
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: I would like a refund, please. — الأسلوب المهذب يحل المشكلة أسرع."
        }
      ]
    }
  },
  {
    "id": "scw_415",
    "pillarId": "writing",
    "pillarNameAr": "الكتابة التعبيرية الحوارية",
    "pillarNameEn": "Conversational Writing & Quick Messaging",
    "pillarIcon": "✍️",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "بناء الفقرة: الجملة الرئيسية والتفاصيل",
    "titleEn": "Paragraph Structure: Topic Sentence and Support",
    "descAr": "الفقرة الجيدة: جملة رئيسية + ٣ تفاصيل + جملة ختامية.",
    "descEn": "A good paragraph: topic sentence + three supporting details + concluding sentence.",
    "speakingGoalAr": "اكتب فقرة منظمة من ٦–٨ جمل.",
    "speakingGoalEn": "Write an organised 6–8 sentence paragraph.",
    "keyPattern": {
      "ruleAr": "الجملة الرئيسية تقول الفكرة العامة (My favourite place is the beach.). التفاصيل تشرح بأمثلة وأسباب. الختام يكرر الفكرة بكلمات ثانية. كل الجمل عن نفس الفكرة.",
      "ruleEn": "Topic sentence = main idea. Supporting sentences = reasons/examples. Concluding sentence restates the idea. Stay on topic.",
      "formula": "Topic sentence → Detail 1, 2, 3 → Conclusion"
    },
    "practicalExamples": [
      {
        "en": "My favourite season is winter.",
        "ar": "فصلي المفضل الشتاء."
      },
      {
        "en": "First, the weather is cool and pleasant.",
        "ar": "أولاً، الجو بارد ولطيف."
      },
      {
        "en": "Also, we go camping in the desert.",
        "ar": "وبعد، نطلع كشتة في البر."
      },
      {
        "en": "Finally, I love drinking hot tea by the fire.",
        "ar": "وأخيراً، أحب أشرب شاي حار جنب النار."
      },
      {
        "en": "For these reasons, winter is the best season for me.",
        "ar": "لهالأسباب، الشتاء أحلى فصل عندي."
      },
      {
        "en": "Every sentence supports the main idea.",
        "ar": "كل جملة تدعم الفكرة الرئيسية."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Starting with a detail: 'We camp in the desert.'",
        "correct": "Start with the main idea: 'Winter is my favourite season.'",
        "whyAr": "ابدأ بالفكرة العامة."
      },
      {
        "incorrect": "Adding an off-topic sentence about school",
        "correct": "Keep every sentence on topic",
        "whyAr": "لا تطلع عن الموضوع."
      },
      {
        "incorrect": "No conclusion",
        "correct": "For these reasons, ...",
        "whyAr": "الختام يقفل الفكرة."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اكتب فقرة عن مكانك المفضل بالهيكل.",
      "promptEn": "Write a structured paragraph about your favourite place.",
      "saraQuestionAr": "جملة رئيسية + ٣ تفاصيل + ختام.",
      "saraQuestionEn": "Topic + 3 details + conclusion.",
      "recommendedResponseEn": "My favourite place is the Corniche in Jeddah. First, the sea view is beautiful. Also, there are many cafés and restaurants. Finally, it's great for walking in the evening. For these reasons, I love going there with my family."
    },
    "quiz": [
      {
        "questionAr": "وظيفة topic sentence:",
        "questionEn": "The topic sentence:",
        "options": [
          "gives an example",
          "states the main idea",
          "ends the paragraph"
        ],
        "correctIndex": 1,
        "explanationAr": "الفكرة الرئيسية."
      },
      {
        "questionAr": "أي جملة ما تناسب فقرة عن الشتاء؟",
        "questionEn": "Which doesn't fit a winter paragraph?",
        "options": [
          "It's cool.",
          "We camp.",
          "My brother likes maths."
        ],
        "correctIndex": 2,
        "explanationAr": "خارج الموضوع."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Starting with a detail: 'We camp in the desert.'",
          "Start with the main idea: 'Winter is my favourite season.'"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Start with the main idea: 'Winter is my favourite season.' — ابدأ بالفكرة العامة."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Adding an off-topic sentence about school",
          "Keep every sentence on topic"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Keep every sentence on topic — لا تطلع عن الموضوع."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "For these reasons, ...",
          "No conclusion"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: For these reasons, ... — الختام يقفل الفكرة."
      }
    ],
    "whiteboardNotes": {
      "title": "Paragraph Structure: Topic Sentence and Support",
      "pointsAr": [
        "يكتب جملة رئيسية واضحة.",
        "يدعمها بتفاصيل.",
        "يختم الفقرة.",
        "الجملة الرئيسية تقول الفكرة العامة (My favourite place is the beach.). التفاصيل تشرح بأمثلة وأسباب. الختام يكرر الفكرة بكلمات ثانية. كل الجمل عن نفس الفكرة."
      ],
      "pointsEn": [
        "Write a clear topic sentence.",
        "Support it with details.",
        "Conclude the paragraph.",
        "Topic sentence = main idea. Supporting sentences = reasons/examples. Concluding sentence restates the idea. Stay on topic."
      ],
      "chalkHighlight": "Topic sentence → Detail 1, 2, 3 → Conclusion"
    },
    "unit": 3,
    "cefr": "A2",
    "objectivesAr": [
      "يكتب جملة رئيسية واضحة.",
      "يدعمها بتفاصيل.",
      "يختم الفقرة."
    ],
    "objectivesEn": [
      "Write a clear topic sentence.",
      "Support it with details.",
      "Conclude the paragraph."
    ],
    "vocabulary": [
      {
        "word": "paragraph",
        "ipa": "/ˈpærəɡræf/",
        "ar": "فقرة",
        "exampleEn": "a short paragraph",
        "exampleAr": "فقرة قصيرة"
      },
      {
        "word": "topic",
        "ipa": "/ˈtɑːpɪk/",
        "ar": "موضوع",
        "exampleEn": "the main topic",
        "exampleAr": "الموضوع الرئيسي"
      },
      {
        "word": "main idea",
        "ipa": "/meɪn aɪˈdiːə/",
        "ar": "فكرة رئيسية",
        "exampleEn": "find the main idea",
        "exampleAr": "دوّر الفكرة الرئيسية"
      },
      {
        "word": "reason",
        "ipa": "/ˈriːzən/",
        "ar": "سبب",
        "exampleEn": "for many reasons",
        "exampleAr": "لأسباب كثيرة"
      },
      {
        "word": "example",
        "ipa": "/ɪɡˈzæmpəl/",
        "ar": "مثال",
        "exampleEn": "for example",
        "exampleAr": "مثلاً"
      },
      {
        "word": "first",
        "ipa": "/fɜːrst/",
        "ar": "أولاً",
        "exampleEn": "First, ...",
        "exampleAr": "أولاً، ..."
      },
      {
        "word": "also",
        "ipa": "/ˈɔːlsoʊ/",
        "ar": "أيضاً",
        "exampleEn": "Also, ...",
        "exampleAr": "وبعد، ..."
      },
      {
        "word": "finally",
        "ipa": "/ˈfaɪnəli/",
        "ar": "أخيراً",
        "exampleEn": "Finally, ...",
        "exampleAr": "أخيراً، ..."
      },
      {
        "word": "pleasant",
        "ipa": "/ˈplɛzənt/",
        "ar": "لطيف",
        "exampleEn": "pleasant weather",
        "exampleAr": "جو لطيف"
      },
      {
        "word": "camping",
        "ipa": "/ˈkæmpɪŋ/",
        "ar": "تخييم/كشتة",
        "exampleEn": "go camping",
        "exampleAr": "يطلع كشتة"
      }
    ],
    "grammarFocus": {
      "ruleAr": "الجملة الرئيسية تقول الفكرة العامة (My favourite place is the beach.). التفاصيل تشرح بأمثلة وأسباب. الختام يكرر الفكرة بكلمات ثانية. كل الجمل عن نفس الفكرة.",
      "ruleEn": "Topic sentence = main idea. Supporting sentences = reasons/examples. Concluding sentence restates the idea. Stay on topic.",
      "formula": "Topic sentence → Detail 1, 2, 3 → Conclusion",
      "examples": [
        {
          "en": "My favourite season is winter.",
          "ar": "فصلي المفضل الشتاء."
        },
        {
          "en": "First, the weather is cool and pleasant.",
          "ar": "أولاً، الجو بارد ولطيف."
        },
        {
          "en": "Also, we go camping in the desert.",
          "ar": "وبعد، نطلع كشتة في البر."
        },
        {
          "en": "Finally, I love drinking hot tea by the fire.",
          "ar": "وأخيراً، أحب أشرب شاي حار جنب النار."
        },
        {
          "en": "For these reasons, winter is the best season for me.",
          "ar": "لهالأسباب، الشتاء أحلى فصل عندي."
        },
        {
          "en": "Every sentence supports the main idea.",
          "ar": "كل جملة تدعم الفكرة الرئيسية."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "What's the topic sentence?",
        "ar": "وين الجملة الرئيسية؟"
      },
      {
        "speaker": "Student",
        "en": "'My favourite season is winter.'",
        "ar": "«فصلي المفضل الشتاء.»"
      },
      {
        "speaker": "Sara",
        "en": "Good. Give me one detail.",
        "ar": "حلو. عطني تفصيل."
      },
      {
        "speaker": "Student",
        "en": "We go camping in the desert.",
        "ar": "نطلع كشتة في البر."
      },
      {
        "speaker": "Sara",
        "en": "And how do you end it?",
        "ar": "وكيف تختم؟"
      },
      {
        "speaker": "Student",
        "en": "For these reasons, winter is the best season for me.",
        "ar": "لهالأسباب، الشتاء أفضل فصل عندي."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: What's the topic sentence?\nStudent: 'My favourite season is winter.'\nSara: Good. Give me one detail.\nStudent: We go camping in the desert.\nSara: And how do you end it?\nStudent: For these reasons, winter is the best season for me.",
      "questions": [
        {
          "questionAr": "الموضوع:",
          "questionEn": "The topic is:",
          "options": [
            "summer",
            "winter",
            "school"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: winter"
        },
        {
          "questionAr": "تفصيل:",
          "questionEn": "One detail:",
          "options": [
            "camping in the desert",
            "swimming",
            "shopping"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: camping in the desert"
        },
        {
          "questionAr": "الختام يبدأ بـ:",
          "questionEn": "The conclusion starts with:",
          "options": [
            "First",
            "For these reasons",
            "Also"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: For these reasons"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Reading a paragraph aloud",
      "items": [
        "pause after the topic sentence",
        "stress First / Also / Finally"
      ],
      "tipAr": "قراءة فقرتك بصوت يكشف الجمل الطويلة."
    },
    "exercises": {
      "easy": [
        {
          "id": "scw_415_e1",
          "type": "meaning",
          "promptEn": "What does \"paragraph\" mean?",
          "promptAr": "ما معنى \"paragraph\"؟",
          "options": [
            "فقرة",
            "تخييم/كشتة",
            "لطيف",
            "أولاً"
          ],
          "correctIndex": 0,
          "answer": "فقرة",
          "explanationAr": "\"paragraph\" /ˈpærəɡræf/ تعني: فقرة. مثال: a short paragraph"
        },
        {
          "id": "scw_415_e2",
          "type": "meaning",
          "promptEn": "What does \"topic\" mean?",
          "promptAr": "ما معنى \"topic\"؟",
          "options": [
            "تخييم/كشتة",
            "موضوع",
            "أخيراً",
            "سبب"
          ],
          "correctIndex": 1,
          "answer": "موضوع",
          "explanationAr": "\"topic\" /ˈtɑːpɪk/ تعني: موضوع. مثال: the main topic"
        },
        {
          "id": "scw_415_e3",
          "type": "meaning",
          "promptEn": "What does \"main idea\" mean?",
          "promptAr": "ما معنى \"main idea\"؟",
          "options": [
            "فقرة",
            "فكرة رئيسية",
            "مثال",
            "سبب"
          ],
          "correctIndex": 1,
          "answer": "فكرة رئيسية",
          "explanationAr": "\"main idea\" /meɪn aɪˈdiːə/ تعني: فكرة رئيسية. مثال: find the main idea"
        },
        {
          "id": "scw_415_e4",
          "type": "meaning",
          "promptEn": "What does \"reason\" mean?",
          "promptAr": "ما معنى \"reason\"؟",
          "options": [
            "فكرة رئيسية",
            "سبب",
            "تخييم/كشتة",
            "موضوع"
          ],
          "correctIndex": 1,
          "answer": "سبب",
          "explanationAr": "\"reason\" /ˈriːzən/ تعني: سبب. مثال: for many reasons"
        }
      ],
      "medium": [
        {
          "id": "scw_415_m1",
          "type": "gap",
          "promptEn": "Complete: My ____ season is winter.",
          "promptAr": "أكمل الفراغ: (فصلي المفضل الشتاء.)",
          "options": [
            "favourite",
            "favour",
            "best of"
          ],
          "correctIndex": 0,
          "answer": "My favourite season is winter.",
          "explanationAr": "الإجابة: favourite. الجملة الرئيسية تقول الفكرة العامة (My favourite place is the beach.). التفاصيل تشرح بأمثلة وأسباب. الختام يكرر الفكرة بكلمات ثانية. كل الجمل عن نفس الفكرة."
        },
        {
          "id": "scw_415_m2",
          "type": "gap",
          "promptEn": "Complete: ____, the weather is cool and pleasant.",
          "promptAr": "أكمل الفراغ: (أولاً، الجو بارد ولطيف.)",
          "options": [
            "Firstly of",
            "First",
            "One"
          ],
          "correctIndex": 1,
          "answer": "First, the weather is cool and pleasant.",
          "explanationAr": "الإجابة: First. الجملة الرئيسية تقول الفكرة العامة (My favourite place is the beach.). التفاصيل تشرح بأمثلة وأسباب. الختام يكرر الفكرة بكلمات ثانية. كل الجمل عن نفس الفكرة."
        },
        {
          "id": "scw_415_m3",
          "type": "gap",
          "promptEn": "Complete: ____, we go camping in the desert.",
          "promptAr": "أكمل الفراغ: (وبعد، نطلع كشتة في البر.)",
          "options": [
            "Also",
            "Too",
            "Either"
          ],
          "correctIndex": 0,
          "answer": "Also, we go camping in the desert.",
          "explanationAr": "الإجابة: Also. الجملة الرئيسية تقول الفكرة العامة (My favourite place is the beach.). التفاصيل تشرح بأمثلة وأسباب. الختام يكرر الفكرة بكلمات ثانية. كل الجمل عن نفس الفكرة."
        },
        {
          "id": "scw_415_m4",
          "type": "gap",
          "promptEn": "Complete: ____, I love drinking hot tea by the fire.",
          "promptAr": "أكمل الفراغ: (وأخيراً، أحب أشرب شاي حار جنب النار.)",
          "options": [
            "Lastly of",
            "End",
            "Finally"
          ],
          "correctIndex": 2,
          "answer": "Finally, I love drinking hot tea by the fire.",
          "explanationAr": "الإجابة: Finally. الجملة الرئيسية تقول الفكرة العامة (My favourite place is the beach.). التفاصيل تشرح بأمثلة وأسباب. الختام يكرر الفكرة بكلمات ثانية. كل الجمل عن نفس الفكرة."
        }
      ],
      "hard": [
        {
          "id": "scw_415_h1",
          "type": "order",
          "promptEn": "Put the words in order: best / me. / season / the / is / reasons, / for / these / winter / For",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (لهالأسباب، الشتاء أحلى فصل عندي.)",
          "answer": "For these reasons, winter is the best season for me.",
          "explanationAr": "الترتيب الصحيح: For these reasons, winter is the best season for me."
        },
        {
          "id": "scw_415_h2",
          "type": "order",
          "promptEn": "Put the words in order: idea. / supports / main / sentence / Every / the",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (كل جملة تدعم الفكرة الرئيسية.)",
          "answer": "Every sentence supports the main idea.",
          "explanationAr": "الترتيب الصحيح: Every sentence supports the main idea."
        },
        {
          "id": "scw_415_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أولاً، الجو بارد ولطيف.",
          "answer": "First, the weather is cool and pleasant.",
          "explanationAr": "ترجمة مقترحة: First, the weather is cool and pleasant."
        },
        {
          "id": "scw_415_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: وأخيراً، أحب أشرب شاي حار جنب النار.",
          "answer": "Finally, I love drinking hot tea by the fire.",
          "explanationAr": "ترجمة مقترحة: Finally, I love drinking hot tea by the fire."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Arabic-style long sentence with many و",
        "correct": "Several short sentences with linkers",
        "whyAr": "الإنجليزي يفضل جمل أوضح."
      },
      {
        "incorrect": "Repeating the topic sentence word for word",
        "correct": "Paraphrase in the conclusion",
        "whyAr": "غيّر الكلمات."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (محادثة خدمة العملاء في التطبيقات): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "My order not arrived.",
          "My order hasn't arrived."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: My order hasn't arrived. — has not + arrived.",
        "fromLessonId": "scw_414"
      },
      {
        "questionAr": "مراجعة (تعبئة النماذج): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Nationality: Saudi Arabia",
          "Nationality: Saudi"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Nationality: Saudi — الجنسية صفة: Saudi، والبلد Saudi Arabia.",
        "fromLessonId": "scw_402"
      },
      {
        "questionAr": "مراجعة (وصف بيتي وغرفتي): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "There is two chairs.",
          "There are two chairs."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: There are two chairs. — الجمع ⇐ are.",
        "fromLessonId": "scw_410"
      },
      {
        "questionAr": "ما معنى \"understand\"؟",
        "questionEn": "What does \"understand\" mean?",
        "options": [
          "يفهم/يعذر",
          "يفوّت",
          "ينسى",
          "عذر"
        ],
        "correctIndex": 0,
        "explanationAr": "\"understand\" /ˌʌndərˈstænd/ تعني: يفهم/يعذر. مثال: I hope you understand.",
        "fromLessonId": "scw_413"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (فصلي المفضل الشتاء.)",
          "questionEn": "Complete: My ____ season is winter.",
          "options": [
            "favourite",
            "favour",
            "best of"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: favourite. الجملة الرئيسية تقول الفكرة العامة (My favourite place is the beach.). التفاصيل تشرح بأمثلة وأسباب. الختام يكرر الفكرة بكلمات ثانية. كل الجمل عن نفس الفكرة."
        },
        {
          "questionAr": "أكمل الفراغ: (أولاً، الجو بارد ولطيف.)",
          "questionEn": "Complete: ____, the weather is cool and pleasant.",
          "options": [
            "Firstly of",
            "First",
            "One"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: First. الجملة الرئيسية تقول الفكرة العامة (My favourite place is the beach.). التفاصيل تشرح بأمثلة وأسباب. الختام يكرر الفكرة بكلمات ثانية. كل الجمل عن نفس الفكرة."
        },
        {
          "questionAr": "وظيفة topic sentence:",
          "questionEn": "The topic sentence:",
          "options": [
            "gives an example",
            "states the main idea",
            "ends the paragraph"
          ],
          "correctIndex": 1,
          "explanationAr": "الفكرة الرئيسية."
        },
        {
          "questionAr": "أي جملة ما تناسب فقرة عن الشتاء؟",
          "questionEn": "Which doesn't fit a winter paragraph?",
          "options": [
            "It's cool.",
            "We camp.",
            "My brother likes maths."
          ],
          "correctIndex": 2,
          "explanationAr": "خارج الموضوع."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Starting with a detail: 'We camp in the desert.'",
            "Start with the main idea: 'Winter is my favourite season.'"
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: Start with the main idea: 'Winter is my favourite season.' — ابدأ بالفكرة العامة."
        }
      ]
    }
  },
  {
    "id": "scw_416",
    "pillarId": "writing",
    "pillarNameAr": "الكتابة التعبيرية الحوارية",
    "pillarNameEn": "Conversational Writing & Quick Messaging",
    "pillarIcon": "✍️",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "أدوات الترتيب: first, then, after that, finally",
    "titleEn": "Sequencing Words: Writing Instructions",
    "descAr": "اكتب خطوات عمل شي (وصفة، طريقة) بأدوات الترتيب وصيغة الأمر.",
    "descEn": "Write instructions with sequencing words and imperatives.",
    "speakingGoalAr": "اكتب وصفة أو تعليمات من ٦ خطوات.",
    "speakingGoalEn": "Write six-step instructions.",
    "keyPattern": {
      "ruleAr": "صيغة الأمر = الفعل بدون فاعل (Boil the water.). أدوات الترتيب: First, Next, Then, After that, Finally. استخدم فاصلة بعد الأداة في بداية الجملة.",
      "ruleEn": "Imperative = base verb (Boil the water.). Sequencers: First, Next, Then, After that, Finally + comma.",
      "formula": "First, + verb... Then, + verb... Finally, + verb..."
    },
    "practicalExamples": [
      {
        "en": "First, boil the water.",
        "ar": "أول شي، اغلي الماي."
      },
      {
        "en": "Then, add two spoons of cardamom.",
        "ar": "بعدين حط ملعقتين هيل."
      },
      {
        "en": "After that, add the coffee.",
        "ar": "بعد كذا حط القهوة."
      },
      {
        "en": "Finally, pour it into small cups.",
        "ar": "وأخيراً، صبها في فناجيل."
      },
      {
        "en": "Don't let it boil over.",
        "ar": "لا تخليها تفور."
      },
      {
        "en": "Serve it with dates.",
        "ar": "قدمها مع التمر."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "First, you must to boil the water.",
        "correct": "First, boil the water.",
        "whyAr": "صيغة الأمر أبسط وأوضح."
      },
      {
        "incorrect": "Then adds the coffee.",
        "correct": "Then, add the coffee.",
        "whyAr": "الأمر بدون s."
      },
      {
        "incorrect": "Finally first serve it.",
        "correct": "Finally, serve it.",
        "whyAr": "أداة ترتيب وحدة."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اكتب خطوات تسوية شاي بالنعناع.",
      "promptEn": "Write steps to make mint tea.",
      "saraQuestionAr": "علمني كيف أسوي شاي بالنعناع!",
      "saraQuestionEn": "Teach me to make mint tea!",
      "recommendedResponseEn": "First, boil the water. Then, put the tea in the teapot. Next, add fresh mint and sugar. After that, pour the hot water and wait three minutes. Finally, serve it in small glasses."
    },
    "quiz": [
      {
        "questionAr": "صيغة الأمر الصحيحة:",
        "questionEn": "Correct imperative:",
        "options": [
          "Adds salt.",
          "Add salt.",
          "Adding salt."
        ],
        "correctIndex": 1,
        "explanationAr": "الفعل المجرد."
      },
      {
        "questionAr": "آخر خطوة تبدأ بـ:",
        "questionEn": "The last step starts with:",
        "options": [
          "First",
          "Next",
          "Finally"
        ],
        "correctIndex": 2,
        "explanationAr": "Finally."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "First, boil the water.",
          "First, you must to boil the water."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: First, boil the water. — صيغة الأمر أبسط وأوضح."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Then adds the coffee.",
          "Then, add the coffee."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Then, add the coffee. — الأمر بدون s."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Finally first serve it.",
          "Finally, serve it."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Finally, serve it. — أداة ترتيب وحدة."
      }
    ],
    "whiteboardNotes": {
      "title": "Sequencing Words: Writing Instructions",
      "pointsAr": [
        "يستخدم صيغة الأمر.",
        "يرتب الخطوات.",
        "يكتب تعليمات واضحة.",
        "صيغة الأمر = الفعل بدون فاعل (Boil the water.). أدوات الترتيب: First, Next, Then, After that, Finally. استخدم فاصلة بعد الأداة في بداية الجملة."
      ],
      "pointsEn": [
        "Use imperatives.",
        "Sequence steps.",
        "Write clear instructions.",
        "Imperative = base verb (Boil the water.). Sequencers: First, Next, Then, After that, Finally + comma."
      ],
      "chalkHighlight": "First, + verb... Then, + verb... Finally, + verb..."
    },
    "unit": 3,
    "cefr": "A2",
    "objectivesAr": [
      "يستخدم صيغة الأمر.",
      "يرتب الخطوات.",
      "يكتب تعليمات واضحة."
    ],
    "objectivesEn": [
      "Use imperatives.",
      "Sequence steps.",
      "Write clear instructions."
    ],
    "vocabulary": [
      {
        "word": "boil",
        "ipa": "/bɔɪl/",
        "ar": "يغلي",
        "exampleEn": "boil water",
        "exampleAr": "يغلي ماي"
      },
      {
        "word": "add",
        "ipa": "/æd/",
        "ar": "يضيف",
        "exampleEn": "add sugar",
        "exampleAr": "حط سكر"
      },
      {
        "word": "pour",
        "ipa": "/pɔːr/",
        "ar": "يصب",
        "exampleEn": "pour the coffee",
        "exampleAr": "يصب القهوة"
      },
      {
        "word": "mix",
        "ipa": "/mɪks/",
        "ar": "يخلط",
        "exampleEn": "mix well",
        "exampleAr": "اخلط زين"
      },
      {
        "word": "cardamom",
        "ipa": "/ˈkɑːrdəməm/",
        "ar": "هيل",
        "exampleEn": "fresh cardamom",
        "exampleAr": "هيل طازج"
      },
      {
        "word": "spoon",
        "ipa": "/spuːn/",
        "ar": "ملعقة",
        "exampleEn": "two spoons",
        "exampleAr": "ملعقتين"
      },
      {
        "word": "serve",
        "ipa": "/sɜːrv/",
        "ar": "يقدّم",
        "exampleEn": "serve hot",
        "exampleAr": "قدّمه حار"
      },
      {
        "word": "next",
        "ipa": "/nɛkst/",
        "ar": "التالي",
        "exampleEn": "Next, ...",
        "exampleAr": "بعدها، ..."
      },
      {
        "word": "step",
        "ipa": "/stɛp/",
        "ar": "خطوة",
        "exampleEn": "step by step",
        "exampleAr": "خطوة بخطوة"
      },
      {
        "word": "minute",
        "ipa": "/ˈmɪnɪt/",
        "ar": "دقيقة",
        "exampleEn": "for five minutes",
        "exampleAr": "لمدة خمس دقايق"
      }
    ],
    "grammarFocus": {
      "ruleAr": "صيغة الأمر = الفعل بدون فاعل (Boil the water.). أدوات الترتيب: First, Next, Then, After that, Finally. استخدم فاصلة بعد الأداة في بداية الجملة.",
      "ruleEn": "Imperative = base verb (Boil the water.). Sequencers: First, Next, Then, After that, Finally + comma.",
      "formula": "First, + verb... Then, + verb... Finally, + verb...",
      "examples": [
        {
          "en": "First, boil the water.",
          "ar": "أول شي، اغلي الماي."
        },
        {
          "en": "Then, add two spoons of cardamom.",
          "ar": "بعدين حط ملعقتين هيل."
        },
        {
          "en": "After that, add the coffee.",
          "ar": "بعد كذا حط القهوة."
        },
        {
          "en": "Finally, pour it into small cups.",
          "ar": "وأخيراً، صبها في فناجيل."
        },
        {
          "en": "Don't let it boil over.",
          "ar": "لا تخليها تفور."
        },
        {
          "en": "Serve it with dates.",
          "ar": "قدمها مع التمر."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "How do you make Saudi coffee?",
        "ar": "كيف تسوي قهوة سعودية؟"
      },
      {
        "speaker": "Student",
        "en": "First, boil the water.",
        "ar": "أول شي، اغلي الماي."
      },
      {
        "speaker": "Sara",
        "en": "Then?",
        "ar": "بعدين؟"
      },
      {
        "speaker": "Student",
        "en": "Then, add the coffee and wait ten minutes.",
        "ar": "بعدين حط القهوة وانتظر عشر دقايق."
      },
      {
        "speaker": "Sara",
        "en": "And the cardamom?",
        "ar": "والهيل؟"
      },
      {
        "speaker": "Student",
        "en": "After that, add the cardamom. Finally, serve it with dates.",
        "ar": "بعدها حط الهيل. وأخيراً قدمها مع التمر."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: How do you make Saudi coffee?\nStudent: First, boil the water.\nSara: Then?\nStudent: Then, add the coffee and wait ten minutes.\nSara: And the cardamom?\nStudent: After that, add the cardamom. Finally, serve it with dates.",
      "questions": [
        {
          "questionAr": "الخطوة الأولى؟",
          "questionEn": "What is step one?",
          "options": [
            "add coffee",
            "boil water",
            "add cardamom"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: boil water"
        },
        {
          "questionAr": "كم ينتظر؟",
          "questionEn": "How long to wait?",
          "options": [
            "five minutes",
            "ten minutes",
            "an hour"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: ten minutes"
        },
        {
          "questionAr": "تقدم مع؟",
          "questionEn": "What comes with it?",
          "options": [
            "cake",
            "dates",
            "milk"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: dates"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Sequencer stress",
      "items": [
        "FIRST, ...",
        "AFter that, ...",
        "FInally, ..."
      ],
      "tipAr": "وقفة قصيرة بعد كل أداة."
    },
    "exercises": {
      "easy": [
        {
          "id": "scw_416_e1",
          "type": "meaning",
          "promptEn": "What does \"boil\" mean?",
          "promptAr": "ما معنى \"boil\"؟",
          "options": [
            "دقيقة",
            "يصب",
            "خطوة",
            "يغلي"
          ],
          "correctIndex": 3,
          "answer": "يغلي",
          "explanationAr": "\"boil\" /bɔɪl/ تعني: يغلي. مثال: boil water"
        },
        {
          "id": "scw_416_e2",
          "type": "meaning",
          "promptEn": "What does \"add\" mean?",
          "promptAr": "ما معنى \"add\"؟",
          "options": [
            "دقيقة",
            "التالي",
            "يصب",
            "يضيف"
          ],
          "correctIndex": 3,
          "answer": "يضيف",
          "explanationAr": "\"add\" /æd/ تعني: يضيف. مثال: add sugar"
        },
        {
          "id": "scw_416_e3",
          "type": "meaning",
          "promptEn": "What does \"pour\" mean?",
          "promptAr": "ما معنى \"pour\"؟",
          "options": [
            "خطوة",
            "هيل",
            "يصب",
            "يغلي"
          ],
          "correctIndex": 2,
          "answer": "يصب",
          "explanationAr": "\"pour\" /pɔːr/ تعني: يصب. مثال: pour the coffee"
        },
        {
          "id": "scw_416_e4",
          "type": "meaning",
          "promptEn": "What does \"mix\" mean?",
          "promptAr": "ما معنى \"mix\"؟",
          "options": [
            "يقدّم",
            "يغلي",
            "يضيف",
            "يخلط"
          ],
          "correctIndex": 3,
          "answer": "يخلط",
          "explanationAr": "\"mix\" /mɪks/ تعني: يخلط. مثال: mix well"
        }
      ],
      "medium": [
        {
          "id": "scw_416_m1",
          "type": "gap",
          "promptEn": "Complete: ____, boil the water.",
          "promptAr": "أكمل الفراغ: (أول شي، اغلي الماي.)",
          "options": [
            "Last",
            "Finally",
            "First"
          ],
          "correctIndex": 2,
          "answer": "First, boil the water.",
          "explanationAr": "الإجابة: First. صيغة الأمر = الفعل بدون فاعل (Boil the water.). أدوات الترتيب: First, Next, Then, After that, Finally. استخدم فاصلة بعد الأداة في بداية الجملة."
        },
        {
          "id": "scw_416_m2",
          "type": "gap",
          "promptEn": "Complete: Then, ____ two spoons of cardamom.",
          "promptAr": "أكمل الفراغ: (بعدين حط ملعقتين هيل.)",
          "options": [
            "adding",
            "add",
            "adds"
          ],
          "correctIndex": 1,
          "answer": "Then, add two spoons of cardamom.",
          "explanationAr": "الإجابة: add. صيغة الأمر = الفعل بدون فاعل (Boil the water.). أدوات الترتيب: First, Next, Then, After that, Finally. استخدم فاصلة بعد الأداة في بداية الجملة."
        },
        {
          "id": "scw_416_m3",
          "type": "gap",
          "promptEn": "Complete: ____, add the coffee.",
          "promptAr": "أكمل الفراغ: (بعد كذا حط القهوة.)",
          "options": [
            "Before",
            "First",
            "After that"
          ],
          "correctIndex": 2,
          "answer": "After that, add the coffee.",
          "explanationAr": "الإجابة: After that. صيغة الأمر = الفعل بدون فاعل (Boil the water.). أدوات الترتيب: First, Next, Then, After that, Finally. استخدم فاصلة بعد الأداة في بداية الجملة."
        },
        {
          "id": "scw_416_m4",
          "type": "gap",
          "promptEn": "Complete: ____, pour it into small cups.",
          "promptAr": "أكمل الفراغ: (وأخيراً، صبها في فناجيل.)",
          "options": [
            "Then first",
            "Finally",
            "First"
          ],
          "correctIndex": 1,
          "answer": "Finally, pour it into small cups.",
          "explanationAr": "الإجابة: Finally. صيغة الأمر = الفعل بدون فاعل (Boil the water.). أدوات الترتيب: First, Next, Then, After that, Finally. استخدم فاصلة بعد الأداة في بداية الجملة."
        }
      ],
      "hard": [
        {
          "id": "scw_416_h1",
          "type": "order",
          "promptEn": "Put the words in order: let / boil / over. / Don't / it",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (لا تخليها تفور.)",
          "answer": "Don't let it boil over.",
          "explanationAr": "الترتيب الصحيح: Don't let it boil over."
        },
        {
          "id": "scw_416_h2",
          "type": "order",
          "promptEn": "Put the words in order: it / dates. / Serve / with",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (قدمها مع التمر.)",
          "answer": "Serve it with dates.",
          "explanationAr": "الترتيب الصحيح: Serve it with dates."
        },
        {
          "id": "scw_416_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: بعدين حط ملعقتين هيل.",
          "answer": "Then, add two spoons of cardamom.",
          "explanationAr": "ترجمة مقترحة: Then, add two spoons of cardamom."
        },
        {
          "id": "scw_416_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: وأخيراً، صبها في فناجيل.",
          "answer": "Finally, pour it into small cups.",
          "explanationAr": "ترجمة مقترحة: Finally, pour it into small cups."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Using 'you should' in every step",
        "correct": "Imperatives are normal in instructions",
        "whyAr": "مو قلة أدب، هذا الأسلوب الطبيعي."
      },
      {
        "incorrect": "Forgetting commas after sequencers",
        "correct": "First, ...",
        "whyAr": "الفاصلة توضح."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (بناء الفقرة: الجملة الرئيسية والتفاصيل): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Keep every sentence on topic",
          "Adding an off-topic sentence about school"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Keep every sentence on topic — لا تطلع عن الموضوع.",
        "fromLessonId": "scw_415"
      },
      {
        "questionAr": "مراجعة (رسالة اعتذار): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Sorry for I was late.",
          "Sorry I was late. / Sorry for being late."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Sorry I was late. / Sorry for being late. — for + -ing، أو بدون for مع جملة.",
        "fromLessonId": "scw_413"
      },
      {
        "questionAr": "مراجعة (رسالة دعوة): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Would you like come?",
          "Would you like to come?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Would you like to come? — would like + to.",
        "fromLessonId": "scw_411_s"
      },
      {
        "questionAr": "ما معنى \"apologise\"؟",
        "questionEn": "What does \"apologise\" mean?",
        "options": [
          "يعتذر",
          "ناقص",
          "فاتورة",
          "استرجاع مبلغ"
        ],
        "correctIndex": 0,
        "explanationAr": "\"apologise\" /əˈpɑːlədʒaɪz/ تعني: يعتذر. مثال: We apologise.",
        "fromLessonId": "scw_414"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (أول شي، اغلي الماي.)",
          "questionEn": "Complete: ____, boil the water.",
          "options": [
            "Last",
            "Finally",
            "First"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: First. صيغة الأمر = الفعل بدون فاعل (Boil the water.). أدوات الترتيب: First, Next, Then, After that, Finally. استخدم فاصلة بعد الأداة في بداية الجملة."
        },
        {
          "questionAr": "أكمل الفراغ: (بعدين حط ملعقتين هيل.)",
          "questionEn": "Complete: Then, ____ two spoons of cardamom.",
          "options": [
            "adding",
            "add",
            "adds"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: add. صيغة الأمر = الفعل بدون فاعل (Boil the water.). أدوات الترتيب: First, Next, Then, After that, Finally. استخدم فاصلة بعد الأداة في بداية الجملة."
        },
        {
          "questionAr": "صيغة الأمر الصحيحة:",
          "questionEn": "Correct imperative:",
          "options": [
            "Adds salt.",
            "Add salt.",
            "Adding salt."
          ],
          "correctIndex": 1,
          "explanationAr": "الفعل المجرد."
        },
        {
          "questionAr": "آخر خطوة تبدأ بـ:",
          "questionEn": "The last step starts with:",
          "options": [
            "First",
            "Next",
            "Finally"
          ],
          "correctIndex": 2,
          "explanationAr": "Finally."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "First, boil the water.",
            "First, you must to boil the water."
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: First, boil the water. — صيغة الأمر أبسط وأوضح."
        }
      ]
    }
  },
  {
    "id": "scw_417",
    "pillarId": "writing",
    "pillarNameAr": "الكتابة التعبيرية الحوارية",
    "pillarNameEn": "Conversational Writing & Quick Messaging",
    "pillarIcon": "✍️",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "كتابة قصة قصيرة بالماضي",
    "titleEn": "Writing a Short Story in the Past",
    "descAr": "اكتب قصة من ٨ جمل: البداية، المشكلة، الحل، بالماضي البسيط والمستمر.",
    "descEn": "Write an 8-sentence story with past simple and past continuous.",
    "speakingGoalAr": "اكتب قصة قصيرة كاملة بعنوان.",
    "speakingGoalEn": "Write a complete short story with a title.",
    "keyPattern": {
      "ruleAr": "الماضي المستمر للخلفية (I was walking...)، والماضي البسيط للحدث (when I saw...). أدوات القصة: One day, Suddenly, Luckily, In the end.",
      "ruleEn": "Past continuous for background, past simple for the action. Story words: One day, Suddenly, Luckily, In the end.",
      "formula": "I was + -ing ... when + past simple | One day → Suddenly → In the end"
    },
    "practicalExamples": [
      {
        "en": "One day, I was walking in the souq.",
        "ar": "في يوم، كنت أمشي في السوق."
      },
      {
        "en": "Suddenly, I saw a lost little boy.",
        "ar": "فجأة شفت ولد صغير ضايع."
      },
      {
        "en": "He was crying for his mother.",
        "ar": "كان يبكي يبي أمه."
      },
      {
        "en": "Luckily, a police officer was nearby.",
        "ar": "لحسن الحظ، كان فيه شرطي قريب."
      },
      {
        "en": "We found his mother ten minutes later.",
        "ar": "لقينا أمه بعد عشر دقايق."
      },
      {
        "en": "In the end, she thanked us with a big smile.",
        "ar": "في الأخير شكرتنا بابتسامة كبيرة."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "I walked when I was seeing him.",
        "correct": "I was walking when I saw him.",
        "whyAr": "الخلفية مستمرة، الحدث بسيط."
      },
      {
        "incorrect": "Suddenly I was see a boy.",
        "correct": "Suddenly I saw a boy.",
        "whyAr": "saw ماضي see."
      },
      {
        "incorrect": "In the end she thank us.",
        "correct": "In the end she thanked us.",
        "whyAr": "ماضي ⇐ -ed."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اكتب قصة من ٦ جمل تبدأ بـ One day.",
      "promptEn": "Write a six-sentence story starting with 'One day'.",
      "saraQuestionAr": "اكتب قصة فيها مفاجأة!",
      "saraQuestionEn": "Write a story with a surprise!",
      "recommendedResponseEn": "One day, I was driving to the desert with my brother. Suddenly, the car stopped. We didn't have any signal. Luckily, a kind man was passing by. He helped us fix the car. In the end, we had a great camping trip."
    },
    "quiz": [
      {
        "questionAr": "أكمل: I ___ TV when the phone rang.",
        "questionEn": "Complete: I ___ TV when the phone rang.",
        "options": [
          "watched",
          "was watching",
          "am watching"
        ],
        "correctIndex": 1,
        "explanationAr": "خلفية ⇐ مستمر."
      },
      {
        "questionAr": "أنسب بداية قصة:",
        "questionEn": "Best story opener:",
        "options": [
          "In the end,",
          "One day,",
          "Finally,"
        ],
        "correctIndex": 1,
        "explanationAr": "One day."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I was walking when I saw him.",
          "I walked when I was seeing him."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I was walking when I saw him. — الخلفية مستمرة، الحدث بسيط."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Suddenly I saw a boy.",
          "Suddenly I was see a boy."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Suddenly I saw a boy. — saw ماضي see."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "In the end she thank us.",
          "In the end she thanked us."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: In the end she thanked us. — ماضي ⇐ -ed."
      }
    ],
    "whiteboardNotes": {
      "title": "Writing a Short Story in the Past",
      "pointsAr": [
        "يستخدم الماضي المستمر للخلفية.",
        "يستخدم الماضي البسيط للأحداث.",
        "ينظم القصة.",
        "الماضي المستمر للخلفية (I was walking...)، والماضي البسيط للحدث (when I saw...). أدوات القصة: One day, Suddenly, Luckily, In the end."
      ],
      "pointsEn": [
        "Use past continuous for background.",
        "Use past simple for events.",
        "Structure a story.",
        "Past continuous for background, past simple for the action. Story words: One day, Suddenly, Luckily, In the end."
      ],
      "chalkHighlight": "I was + -ing ... when + past simple | One day → Suddenly → In the end"
    },
    "unit": 4,
    "cefr": "A2",
    "objectivesAr": [
      "يستخدم الماضي المستمر للخلفية.",
      "يستخدم الماضي البسيط للأحداث.",
      "ينظم القصة."
    ],
    "objectivesEn": [
      "Use past continuous for background.",
      "Use past simple for events.",
      "Structure a story."
    ],
    "vocabulary": [
      {
        "word": "one day",
        "ipa": "/wʌn deɪ/",
        "ar": "في يوم",
        "exampleEn": "One day, ...",
        "exampleAr": "في يوم من الأيام"
      },
      {
        "word": "suddenly",
        "ipa": "/ˈsʌdənli/",
        "ar": "فجأة",
        "exampleEn": "Suddenly, it rained.",
        "exampleAr": "فجأة نزل مطر."
      },
      {
        "word": "luckily",
        "ipa": "/ˈlʌkɪli/",
        "ar": "لحسن الحظ",
        "exampleEn": "Luckily, he was OK.",
        "exampleAr": "لحسن الحظ كان بخير."
      },
      {
        "word": "in the end",
        "ipa": "/ɪn ði ɛnd/",
        "ar": "في النهاية",
        "exampleEn": "In the end, we won.",
        "exampleAr": "بالأخير فزنا."
      },
      {
        "word": "lost",
        "ipa": "/lɔːst/",
        "ar": "ضايع",
        "exampleEn": "a lost child",
        "exampleAr": "طفل ضايع"
      },
      {
        "word": "cry",
        "ipa": "/kraɪ/",
        "ar": "يبكي",
        "exampleEn": "He was crying.",
        "exampleAr": "كان يبكي."
      },
      {
        "word": "souq",
        "ipa": "/suːk/",
        "ar": "سوق",
        "exampleEn": "the old souq",
        "exampleAr": "السوق القديم"
      },
      {
        "word": "police officer",
        "ipa": "/pəˈliːs ˌɔːfɪsər/",
        "ar": "شرطي",
        "exampleEn": "ask a police officer",
        "exampleAr": "اسأل شرطي"
      },
      {
        "word": "thank",
        "ipa": "/θæŋk/",
        "ar": "يشكر",
        "exampleEn": "She thanked us.",
        "exampleAr": "شكرتنا."
      },
      {
        "word": "frightened",
        "ipa": "/ˈfraɪtənd/",
        "ar": "خايف",
        "exampleEn": "He was frightened.",
        "exampleAr": "كان خايف."
      }
    ],
    "grammarFocus": {
      "ruleAr": "الماضي المستمر للخلفية (I was walking...)، والماضي البسيط للحدث (when I saw...). أدوات القصة: One day, Suddenly, Luckily, In the end.",
      "ruleEn": "Past continuous for background, past simple for the action. Story words: One day, Suddenly, Luckily, In the end.",
      "formula": "I was + -ing ... when + past simple | One day → Suddenly → In the end",
      "examples": [
        {
          "en": "One day, I was walking in the souq.",
          "ar": "في يوم، كنت أمشي في السوق."
        },
        {
          "en": "Suddenly, I saw a lost little boy.",
          "ar": "فجأة شفت ولد صغير ضايع."
        },
        {
          "en": "He was crying for his mother.",
          "ar": "كان يبكي يبي أمه."
        },
        {
          "en": "Luckily, a police officer was nearby.",
          "ar": "لحسن الحظ، كان فيه شرطي قريب."
        },
        {
          "en": "We found his mother ten minutes later.",
          "ar": "لقينا أمه بعد عشر دقايق."
        },
        {
          "en": "In the end, she thanked us with a big smile.",
          "ar": "في الأخير شكرتنا بابتسامة كبيرة."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Start your story.",
        "ar": "ابدأ قصتك."
      },
      {
        "speaker": "Student",
        "en": "One day, I was walking in the souq.",
        "ar": "في يوم، كنت أمشي في السوق."
      },
      {
        "speaker": "Sara",
        "en": "What happened?",
        "ar": "وش صار؟"
      },
      {
        "speaker": "Student",
        "en": "Suddenly, I saw a lost boy. He was crying.",
        "ar": "فجأة شفت ولد ضايع. كان يبكي."
      },
      {
        "speaker": "Sara",
        "en": "Oh! And in the end?",
        "ar": "أوه! وبالأخير؟"
      },
      {
        "speaker": "Student",
        "en": "We found his mother. She was so happy.",
        "ar": "لقينا أمه. كانت مبسوطة مرة."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Start your story.\nStudent: One day, I was walking in the souq.\nSara: What happened?\nStudent: Suddenly, I saw a lost boy. He was crying.\nSara: Oh! And in the end?\nStudent: We found his mother. She was so happy.",
      "questions": [
        {
          "questionAr": "وين كان؟",
          "questionEn": "Where was he?",
          "options": [
            "mall",
            "souq",
            "school"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: souq"
        },
        {
          "questionAr": "مين شاف؟",
          "questionEn": "Who did he see?",
          "options": [
            "a lost boy",
            "a cat",
            "his friend"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: a lost boy"
        },
        {
          "questionAr": "النهاية؟",
          "questionEn": "How did the story end?",
          "options": [
            "they found the mother",
            "the boy ran",
            "police took him"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: they found the mother"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Telling a story with pauses",
      "items": [
        "One day, / I was walking...",
        "SUDdenly, // I saw..."
      ],
      "tipAr": "الوقفة قبل Suddenly تشد القارئ."
    },
    "exercises": {
      "easy": [
        {
          "id": "scw_417_e1",
          "type": "meaning",
          "promptEn": "What does \"one day\" mean?",
          "promptAr": "ما معنى \"one day\"؟",
          "options": [
            "لحسن الحظ",
            "في يوم",
            "سوق",
            "ضايع"
          ],
          "correctIndex": 1,
          "answer": "في يوم",
          "explanationAr": "\"one day\" /wʌn deɪ/ تعني: في يوم. مثال: One day, ..."
        },
        {
          "id": "scw_417_e2",
          "type": "meaning",
          "promptEn": "What does \"suddenly\" mean?",
          "promptAr": "ما معنى \"suddenly\"؟",
          "options": [
            "فجأة",
            "شرطي",
            "يبكي",
            "في يوم"
          ],
          "correctIndex": 0,
          "answer": "فجأة",
          "explanationAr": "\"suddenly\" /ˈsʌdənli/ تعني: فجأة. مثال: Suddenly, it rained."
        },
        {
          "id": "scw_417_e3",
          "type": "meaning",
          "promptEn": "What does \"luckily\" mean?",
          "promptAr": "ما معنى \"luckily\"؟",
          "options": [
            "في النهاية",
            "يبكي",
            "في يوم",
            "لحسن الحظ"
          ],
          "correctIndex": 3,
          "answer": "لحسن الحظ",
          "explanationAr": "\"luckily\" /ˈlʌkɪli/ تعني: لحسن الحظ. مثال: Luckily, he was OK."
        },
        {
          "id": "scw_417_e4",
          "type": "meaning",
          "promptEn": "What does \"in the end\" mean?",
          "promptAr": "ما معنى \"in the end\"؟",
          "options": [
            "شرطي",
            "في النهاية",
            "لحسن الحظ",
            "خايف"
          ],
          "correctIndex": 1,
          "answer": "في النهاية",
          "explanationAr": "\"in the end\" /ɪn ði ɛnd/ تعني: في النهاية. مثال: In the end, we won."
        }
      ],
      "medium": [
        {
          "id": "scw_417_m1",
          "type": "gap",
          "promptEn": "Complete: One day, I ____ in the souq.",
          "promptAr": "أكمل الفراغ: (في يوم، كنت أمشي في السوق.)",
          "options": [
            "walked was",
            "am walking",
            "was walking"
          ],
          "correctIndex": 2,
          "answer": "One day, I was walking in the souq.",
          "explanationAr": "الإجابة: was walking. الماضي المستمر للخلفية (I was walking...)، والماضي البسيط للحدث (when I saw...). أدوات القصة: One day, Suddenly, Luckily, In the end."
        },
        {
          "id": "scw_417_m2",
          "type": "gap",
          "promptEn": "Complete: ____, I saw a lost little boy.",
          "promptAr": "أكمل الفراغ: (فجأة شفت ولد صغير ضايع.)",
          "options": [
            "Suddenness",
            "Sudden",
            "Suddenly"
          ],
          "correctIndex": 2,
          "answer": "Suddenly, I saw a lost little boy.",
          "explanationAr": "الإجابة: Suddenly. الماضي المستمر للخلفية (I was walking...)، والماضي البسيط للحدث (when I saw...). أدوات القصة: One day, Suddenly, Luckily, In the end."
        },
        {
          "id": "scw_417_m3",
          "type": "gap",
          "promptEn": "Complete: He ____ for his mother.",
          "promptAr": "أكمل الفراغ: (كان يبكي يبي أمه.)",
          "options": [
            "is crying",
            "cried was",
            "was crying"
          ],
          "correctIndex": 2,
          "answer": "He was crying for his mother.",
          "explanationAr": "الإجابة: was crying. الماضي المستمر للخلفية (I was walking...)، والماضي البسيط للحدث (when I saw...). أدوات القصة: One day, Suddenly, Luckily, In the end."
        },
        {
          "id": "scw_417_m4",
          "type": "gap",
          "promptEn": "Complete: ____, a police officer was nearby.",
          "promptAr": "أكمل الفراغ: (لحسن الحظ، كان فيه شرطي قريب.)",
          "options": [
            "Luckily",
            "Lucky",
            "Luck"
          ],
          "correctIndex": 0,
          "answer": "Luckily, a police officer was nearby.",
          "explanationAr": "الإجابة: Luckily. الماضي المستمر للخلفية (I was walking...)، والماضي البسيط للحدث (when I saw...). أدوات القصة: One day, Suddenly, Luckily, In the end."
        }
      ],
      "hard": [
        {
          "id": "scw_417_h1",
          "type": "order",
          "promptEn": "Put the words in order: later. / found / minutes / mother / his / ten / We",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (لقينا أمه بعد عشر دقايق.)",
          "answer": "We found his mother ten minutes later.",
          "explanationAr": "الترتيب الصحيح: We found his mother ten minutes later."
        },
        {
          "id": "scw_417_h2",
          "type": "order",
          "promptEn": "Put the words in order: she / end, / smile. / the / a / big / thanked / In / with / us",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (في الأخير شكرتنا بابتسامة كبيرة.)",
          "answer": "In the end, she thanked us with a big smile.",
          "explanationAr": "الترتيب الصحيح: In the end, she thanked us with a big smile."
        },
        {
          "id": "scw_417_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: فجأة شفت ولد صغير ضايع.",
          "answer": "Suddenly, I saw a lost little boy.",
          "explanationAr": "ترجمة مقترحة: Suddenly, I saw a lost little boy."
        },
        {
          "id": "scw_417_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: لحسن الحظ، كان فيه شرطي قريب.",
          "answer": "Luckily, a police officer was nearby.",
          "explanationAr": "ترجمة مقترحة: Luckily, a police officer was nearby."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Mixing present and past: 'I see a boy and he cried'",
        "correct": "Keep the past throughout",
        "whyAr": "ثبّت الزمن."
      },
      {
        "incorrect": "No ending",
        "correct": "Use In the end, ...",
        "whyAr": "القصة تحتاج خاتمة."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (أدوات الترتيب: first, then, after that, finally): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Then adds the coffee.",
          "Then, add the coffee."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Then, add the coffee. — الأمر بدون s.",
        "fromLessonId": "scw_416"
      },
      {
        "questionAr": "مراجعة (محادثة خدمة العملاء في التطبيقات): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I would like a refund, please.",
          "I want my money now!"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I would like a refund, please. — الأسلوب المهذب يحل المشكلة أسرع.",
        "fromLessonId": "scw_414"
      },
      {
        "questionAr": "مراجعة (رسالة من الإجازة (الماضي البسيط)): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "We goed to Abha.",
          "We went to Abha."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: We went to Abha. — go شاذ ⇐ went.",
        "fromLessonId": "scw_412_s"
      },
      {
        "questionAr": "ما معنى \"camping\"؟",
        "questionEn": "What does \"camping\" mean?",
        "options": [
          "سبب",
          "مثال",
          "فقرة",
          "تخييم/كشتة"
        ],
        "correctIndex": 3,
        "explanationAr": "\"camping\" /ˈkæmpɪŋ/ تعني: تخييم/كشتة. مثال: go camping",
        "fromLessonId": "scw_415"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (في يوم، كنت أمشي في السوق.)",
          "questionEn": "Complete: One day, I ____ in the souq.",
          "options": [
            "walked was",
            "am walking",
            "was walking"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: was walking. الماضي المستمر للخلفية (I was walking...)، والماضي البسيط للحدث (when I saw...). أدوات القصة: One day, Suddenly, Luckily, In the end."
        },
        {
          "questionAr": "أكمل الفراغ: (فجأة شفت ولد صغير ضايع.)",
          "questionEn": "Complete: ____, I saw a lost little boy.",
          "options": [
            "Suddenness",
            "Sudden",
            "Suddenly"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: Suddenly. الماضي المستمر للخلفية (I was walking...)، والماضي البسيط للحدث (when I saw...). أدوات القصة: One day, Suddenly, Luckily, In the end."
        },
        {
          "questionAr": "أكمل: I ___ TV when the phone rang.",
          "questionEn": "Complete: I ___ TV when the phone rang.",
          "options": [
            "watched",
            "was watching",
            "am watching"
          ],
          "correctIndex": 1,
          "explanationAr": "خلفية ⇐ مستمر."
        },
        {
          "questionAr": "أنسب بداية قصة:",
          "questionEn": "Best story opener:",
          "options": [
            "In the end,",
            "One day,",
            "Finally,"
          ],
          "correctIndex": 1,
          "explanationAr": "One day."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "I was walking when I saw him.",
            "I walked when I was seeing him."
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: I was walking when I saw him. — الخلفية مستمرة، الحدث بسيط."
        }
      ]
    }
  },
  {
    "id": "scw_418",
    "pillarId": "writing",
    "pillarNameAr": "الكتابة التعبيرية الحوارية",
    "pillarNameEn": "Conversational Writing & Quick Messaging",
    "pillarIcon": "✍️",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "وصف الطريق كتابياً",
    "titleEn": "Giving Directions in Writing",
    "descAr": "اكتب لضيف كيف يوصل لبيتك أو لمكان: لف، امش، علامات مميزة.",
    "descEn": "Write directions to your home using landmarks.",
    "speakingGoalAr": "اكتب رسالة اتجاهات واضحة من ٥ خطوات.",
    "speakingGoalEn": "Write clear five-step directions.",
    "keyPattern": {
      "ruleAr": "استخدم: go straight, turn left/right, take the second exit, at the traffic lights, opposite, next to, it's on your left. اذكر معالم (landmarks): a mosque, a petrol station, a pharmacy.",
      "ruleEn": "Use go straight, turn left/right, take the second exit, at the traffic lights + landmarks (mosque, petrol station).",
      "formula": "Go straight → turn left at + landmark → It's on your right, opposite + place."
    },
    "practicalExamples": [
      {
        "en": "Go straight for two kilometres.",
        "ar": "امش سيدا كيلين."
      },
      {
        "en": "Turn right at the traffic lights.",
        "ar": "لف يمين عند الإشارة."
      },
      {
        "en": "Take the second exit at the roundabout.",
        "ar": "خذ المخرج الثاني في الدوار."
      },
      {
        "en": "Our house is opposite the mosque.",
        "ar": "بيتنا مقابل المسجد."
      },
      {
        "en": "It's next to a pharmacy.",
        "ar": "جنب صيدلية."
      },
      {
        "en": "Call me if you get lost.",
        "ar": "اتصل علي إذا ضعت."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Go straightly.",
        "correct": "Go straight.",
        "whyAr": "straight بدون ly."
      },
      {
        "incorrect": "Turn to right.",
        "correct": "Turn right.",
        "whyAr": "بدون to."
      },
      {
        "incorrect": "It's in front the mosque.",
        "correct": "It's in front of the mosque.",
        "whyAr": "in front of."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اكتب لضيف كيف يوصل بيتك من أقرب شارع رئيسي.",
      "promptEn": "Write directions to your house from the main road.",
      "saraQuestionAr": "أنا ضيفتك، دلني!",
      "saraQuestionEn": "I'm your guest, guide me!",
      "recommendedResponseEn": "From King Abdullah Road, take exit 12. Go straight and turn right at the second traffic lights. Our house is the third villa on the left, next to a small park."
    },
    "quiz": [
      {
        "questionAr": "أكمل: Turn ___ at the mosque.",
        "questionEn": "Complete: Turn ___ at the mosque.",
        "options": [
          "to left",
          "left",
          "lefts"
        ],
        "correctIndex": 1,
        "explanationAr": "turn left."
      },
      {
        "questionAr": "opposite يعني:",
        "questionEn": "'opposite' means:",
        "options": [
          "جنب",
          "مقابل",
          "خلف"
        ],
        "correctIndex": 1,
        "explanationAr": "مقابل."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Go straight.",
          "Go straightly."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Go straight. — straight بدون ly."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Turn to right.",
          "Turn right."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Turn right. — بدون to."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "It's in front the mosque.",
          "It's in front of the mosque."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: It's in front of the mosque. — in front of."
      }
    ],
    "whiteboardNotes": {
      "title": "Giving Directions in Writing",
      "pointsAr": [
        "يكتب اتجاهات بخطوات.",
        "يستخدم معالم.",
        "يحدد الموقع النهائي.",
        "استخدم: go straight, turn left/right, take the second exit, at the traffic lights, opposite, next to, it's on your left. اذكر معالم (landmarks): a mosque, a petrol station, a pharmacy."
      ],
      "pointsEn": [
        "Write step-by-step directions.",
        "Use landmarks.",
        "State the final location.",
        "Use go straight, turn left/right, take the second exit, at the traffic lights + landmarks (mosque, petrol station)."
      ],
      "chalkHighlight": "Go straight → turn left at + landmark → It's on your right, opposite + place."
    },
    "unit": 4,
    "cefr": "A2",
    "objectivesAr": [
      "يكتب اتجاهات بخطوات.",
      "يستخدم معالم.",
      "يحدد الموقع النهائي."
    ],
    "objectivesEn": [
      "Write step-by-step directions.",
      "Use landmarks.",
      "State the final location."
    ],
    "vocabulary": [
      {
        "word": "straight",
        "ipa": "/streɪt/",
        "ar": "سيدا/مستقيم",
        "exampleEn": "go straight",
        "exampleAr": "امش سيدا"
      },
      {
        "word": "turn",
        "ipa": "/tɜːrn/",
        "ar": "يلف",
        "exampleEn": "turn left",
        "exampleAr": "لف يسار"
      },
      {
        "word": "traffic lights",
        "ipa": "/ˈtræfɪk laɪts/",
        "ar": "إشارة مرور",
        "exampleEn": "at the traffic lights",
        "exampleAr": "عند الإشارة"
      },
      {
        "word": "roundabout",
        "ipa": "/ˈraʊndəbaʊt/",
        "ar": "دوار",
        "exampleEn": "the big roundabout",
        "exampleAr": "الدوار الكبير"
      },
      {
        "word": "exit",
        "ipa": "/ˈɛɡzɪt/",
        "ar": "مخرج",
        "exampleEn": "exit 9",
        "exampleAr": "مخرج ٩"
      },
      {
        "word": "opposite",
        "ipa": "/ˈɑːpəzɪt/",
        "ar": "مقابل",
        "exampleEn": "opposite the park",
        "exampleAr": "مقابل الحديقة"
      },
      {
        "word": "petrol station",
        "ipa": "/ˈpɛtrəl ˌsteɪʃən/",
        "ar": "محطة بنزين",
        "exampleEn": "near the petrol station",
        "exampleAr": "قريب المحطة"
      },
      {
        "word": "landmark",
        "ipa": "/ˈlændmɑːrk/",
        "ar": "معلم",
        "exampleEn": "a famous landmark",
        "exampleAr": "معلم مشهور"
      },
      {
        "word": "corner",
        "ipa": "/ˈkɔːrnər/",
        "ar": "زاوية/ناصية",
        "exampleEn": "on the corner",
        "exampleAr": "على الزاوية"
      },
      {
        "word": "location",
        "ipa": "/loʊˈkeɪʃən/",
        "ar": "موقع/لوكيشن",
        "exampleEn": "send the location",
        "exampleAr": "أرسل اللوكيشن"
      }
    ],
    "grammarFocus": {
      "ruleAr": "استخدم: go straight, turn left/right, take the second exit, at the traffic lights, opposite, next to, it's on your left. اذكر معالم (landmarks): a mosque, a petrol station, a pharmacy.",
      "ruleEn": "Use go straight, turn left/right, take the second exit, at the traffic lights + landmarks (mosque, petrol station).",
      "formula": "Go straight → turn left at + landmark → It's on your right, opposite + place.",
      "examples": [
        {
          "en": "Go straight for two kilometres.",
          "ar": "امش سيدا كيلين."
        },
        {
          "en": "Turn right at the traffic lights.",
          "ar": "لف يمين عند الإشارة."
        },
        {
          "en": "Take the second exit at the roundabout.",
          "ar": "خذ المخرج الثاني في الدوار."
        },
        {
          "en": "Our house is opposite the mosque.",
          "ar": "بيتنا مقابل المسجد."
        },
        {
          "en": "It's next to a pharmacy.",
          "ar": "جنب صيدلية."
        },
        {
          "en": "Call me if you get lost.",
          "ar": "اتصل علي إذا ضعت."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Guest",
        "en": "Hi! How do I get to your house from the airport?",
        "ar": "هلا! كيف أوصل بيتكم من المطار؟"
      },
      {
        "speaker": "Student",
        "en": "Take the King Fahd Road and go straight.",
        "ar": "خذ طريق الملك فهد وامش سيدا."
      },
      {
        "speaker": "Student",
        "en": "Take exit 9, then turn left at the traffic lights.",
        "ar": "خذ مخرج ٩، بعدين لف يسار عند الإشارة."
      },
      {
        "speaker": "Guest",
        "en": "OK. Then?",
        "ar": "تمام. بعدين؟"
      },
      {
        "speaker": "Student",
        "en": "Our house is the white villa opposite the mosque.",
        "ar": "بيتنا الفيلا البيضاء مقابل المسجد."
      },
      {
        "speaker": "Guest",
        "en": "Perfect, thanks! I'll call you if I get lost.",
        "ar": "ممتاز، شكراً! بتصل إذا ضعت."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Guest: Hi! How do I get to your house from the airport?\nStudent: Take the King Fahd Road and go straight.\nStudent: Take exit 9, then turn left at the traffic lights.\nGuest: OK. Then?\nStudent: Our house is the white villa opposite the mosque.\nGuest: Perfect, thanks! I'll call you if I get lost.",
      "questions": [
        {
          "questionAr": "أي مخرج؟",
          "questionEn": "Which exit?",
          "options": [
            "7",
            "9",
            "11"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: 9"
        },
        {
          "questionAr": "يلف وين؟",
          "questionEn": "Turn where?",
          "options": [
            "at the roundabout",
            "at the traffic lights",
            "at the mosque"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: at the traffic lights"
        },
        {
          "questionAr": "لون البيت؟",
          "questionEn": "What colour is the house?",
          "options": [
            "white",
            "beige",
            "grey"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: white"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Tricky words",
      "items": [
        "straight /streɪt/ (silent gh)",
        "opposite /ˈɑːpəzɪt/",
        "roundabout /ˈraʊndəbaʊt/"
      ],
      "tipAr": "gh في straight ما تنطق."
    },
    "exercises": {
      "easy": [
        {
          "id": "scw_418_e1",
          "type": "meaning",
          "promptEn": "What does \"straight\" mean?",
          "promptAr": "ما معنى \"straight\"؟",
          "options": [
            "محطة بنزين",
            "مخرج",
            "معلم",
            "سيدا/مستقيم"
          ],
          "correctIndex": 3,
          "answer": "سيدا/مستقيم",
          "explanationAr": "\"straight\" /streɪt/ تعني: سيدا/مستقيم. مثال: go straight"
        },
        {
          "id": "scw_418_e2",
          "type": "meaning",
          "promptEn": "What does \"turn\" mean?",
          "promptAr": "ما معنى \"turn\"؟",
          "options": [
            "دوار",
            "يلف",
            "معلم",
            "مقابل"
          ],
          "correctIndex": 1,
          "answer": "يلف",
          "explanationAr": "\"turn\" /tɜːrn/ تعني: يلف. مثال: turn left"
        },
        {
          "id": "scw_418_e3",
          "type": "meaning",
          "promptEn": "What does \"traffic lights\" mean?",
          "promptAr": "ما معنى \"traffic lights\"؟",
          "options": [
            "يلف",
            "مقابل",
            "سيدا/مستقيم",
            "إشارة مرور"
          ],
          "correctIndex": 3,
          "answer": "إشارة مرور",
          "explanationAr": "\"traffic lights\" /ˈtræfɪk laɪts/ تعني: إشارة مرور. مثال: at the traffic lights"
        },
        {
          "id": "scw_418_e4",
          "type": "meaning",
          "promptEn": "What does \"roundabout\" mean?",
          "promptAr": "ما معنى \"roundabout\"؟",
          "options": [
            "يلف",
            "مخرج",
            "دوار",
            "إشارة مرور"
          ],
          "correctIndex": 2,
          "answer": "دوار",
          "explanationAr": "\"roundabout\" /ˈraʊndəbaʊt/ تعني: دوار. مثال: the big roundabout"
        }
      ],
      "medium": [
        {
          "id": "scw_418_m1",
          "type": "gap",
          "promptEn": "Complete: Go ____ for two kilometres.",
          "promptAr": "أكمل الفراغ: (امش سيدا كيلين.)",
          "options": [
            "direct",
            "strait",
            "straight"
          ],
          "correctIndex": 2,
          "answer": "Go straight for two kilometres.",
          "explanationAr": "الإجابة: straight. استخدم: go straight, turn left/right, take the second exit, at the traffic lights, opposite, next to, it's on your left. اذكر معالم (landmarks): a mosque, a petrol station, a pharmacy."
        },
        {
          "id": "scw_418_m2",
          "type": "gap",
          "promptEn": "Complete: ____ right at the traffic lights.",
          "promptAr": "أكمل الفراغ: (لف يمين عند الإشارة.)",
          "options": [
            "Go back",
            "Return",
            "Turn"
          ],
          "correctIndex": 2,
          "answer": "Turn right at the traffic lights.",
          "explanationAr": "الإجابة: Turn. استخدم: go straight, turn left/right, take the second exit, at the traffic lights, opposite, next to, it's on your left. اذكر معالم (landmarks): a mosque, a petrol station, a pharmacy."
        },
        {
          "id": "scw_418_m3",
          "type": "gap",
          "promptEn": "Complete: Take the second ____ at the roundabout.",
          "promptAr": "أكمل الفراغ: (خذ المخرج الثاني في الدوار.)",
          "options": [
            "out",
            "exit",
            "door"
          ],
          "correctIndex": 1,
          "answer": "Take the second exit at the roundabout.",
          "explanationAr": "الإجابة: exit. استخدم: go straight, turn left/right, take the second exit, at the traffic lights, opposite, next to, it's on your left. اذكر معالم (landmarks): a mosque, a petrol station, a pharmacy."
        },
        {
          "id": "scw_418_m4",
          "type": "gap",
          "promptEn": "Complete: Our house is ____ the mosque.",
          "promptAr": "أكمل الفراغ: (بيتنا مقابل المسجد.)",
          "options": [
            "opposite",
            "opposed",
            "front"
          ],
          "correctIndex": 0,
          "answer": "Our house is opposite the mosque.",
          "explanationAr": "الإجابة: opposite. استخدم: go straight, turn left/right, take the second exit, at the traffic lights, opposite, next to, it's on your left. اذكر معالم (landmarks): a mosque, a petrol station, a pharmacy."
        }
      ],
      "hard": [
        {
          "id": "scw_418_h1",
          "type": "order",
          "promptEn": "Put the words in order: pharmacy. / to / It's / next / a",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (جنب صيدلية.)",
          "answer": "It's next to a pharmacy.",
          "explanationAr": "الترتيب الصحيح: It's next to a pharmacy."
        },
        {
          "id": "scw_418_h2",
          "type": "order",
          "promptEn": "Put the words in order: get / you / lost. / if / me / Call",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (اتصل علي إذا ضعت.)",
          "answer": "Call me if you get lost.",
          "explanationAr": "الترتيب الصحيح: Call me if you get lost."
        },
        {
          "id": "scw_418_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: لف يمين عند الإشارة.",
          "answer": "Turn right at the traffic lights.",
          "explanationAr": "ترجمة مقترحة: Turn right at the traffic lights."
        },
        {
          "id": "scw_418_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: بيتنا مقابل المسجد.",
          "answer": "Our house is opposite the mosque.",
          "explanationAr": "ترجمة مقترحة: Our house is opposite the mosque."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Only sending a location pin",
        "correct": "Add one landmark sentence",
        "whyAr": "المعلم يساعد إذا الخريطة غلطت."
      },
      {
        "incorrect": "Confusing left/right in a rush",
        "correct": "Double-check before sending",
        "whyAr": "غلطة شائعة."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (كتابة قصة قصيرة بالماضي): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Suddenly I was see a boy.",
          "Suddenly I saw a boy."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Suddenly I saw a boy. — saw ماضي see.",
        "fromLessonId": "scw_417"
      },
      {
        "questionAr": "مراجعة (بناء الفقرة: الجملة الرئيسية والتفاصيل): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Start with the main idea: 'Winter is my favourite season.'",
          "Starting with a detail: 'We camp in the desert.'"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Start with the main idea: 'Winter is my favourite season.' — ابدأ بالفكرة العامة.",
        "fromLessonId": "scw_415"
      },
      {
        "questionAr": "مراجعة (تعبئة النماذج): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Nationality: Saudi Arabia",
          "Nationality: Saudi"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Nationality: Saudi — الجنسية صفة: Saudi، والبلد Saudi Arabia.",
        "fromLessonId": "scw_402"
      },
      {
        "questionAr": "ما معنى \"minute\"؟",
        "questionEn": "What does \"minute\" mean?",
        "options": [
          "دقيقة",
          "يضيف",
          "ملعقة",
          "التالي"
        ],
        "correctIndex": 0,
        "explanationAr": "\"minute\" /ˈmɪnɪt/ تعني: دقيقة. مثال: for five minutes",
        "fromLessonId": "scw_416"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (امش سيدا كيلين.)",
          "questionEn": "Complete: Go ____ for two kilometres.",
          "options": [
            "direct",
            "strait",
            "straight"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: straight. استخدم: go straight, turn left/right, take the second exit, at the traffic lights, opposite, next to, it's on your left. اذكر معالم (landmarks): a mosque, a petrol station, a pharmacy."
        },
        {
          "questionAr": "أكمل الفراغ: (لف يمين عند الإشارة.)",
          "questionEn": "Complete: ____ right at the traffic lights.",
          "options": [
            "Go back",
            "Return",
            "Turn"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: Turn. استخدم: go straight, turn left/right, take the second exit, at the traffic lights, opposite, next to, it's on your left. اذكر معالم (landmarks): a mosque, a petrol station, a pharmacy."
        },
        {
          "questionAr": "أكمل: Turn ___ at the mosque.",
          "questionEn": "Complete: Turn ___ at the mosque.",
          "options": [
            "to left",
            "left",
            "lefts"
          ],
          "correctIndex": 1,
          "explanationAr": "turn left."
        },
        {
          "questionAr": "opposite يعني:",
          "questionEn": "'opposite' means:",
          "options": [
            "جنب",
            "مقابل",
            "خلف"
          ],
          "correctIndex": 1,
          "explanationAr": "مقابل."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Go straight.",
            "Go straightly."
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: Go straight. — straight بدون ly."
        }
      ]
    }
  },
  {
    "id": "scw_419",
    "pillarId": "writing",
    "pillarNameAr": "الكتابة التعبيرية الحوارية",
    "pillarNameEn": "Conversational Writing & Quick Messaging",
    "pillarIcon": "✍️",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "كتابة تقييم مطعم أو تطبيق",
    "titleEn": "Writing a Review",
    "descAr": "اكتب تقييم لمطعم أو مقهى: الأكل، الخدمة، السعر، والتوصية.",
    "descEn": "Write a review: food, service, price, recommendation.",
    "speakingGoalAr": "اكتب تقييماً متوازناً من ٦ جمل.",
    "speakingGoalEn": "Write a balanced six-sentence review.",
    "keyPattern": {
      "ruleAr": "استخدم صفات قوية (delicious, friendly, overpriced) ومقارنات (better than, the best). وازن: إيجابية وسلبية. اختم بتوصية: I'd recommend it / I wouldn't go back.",
      "ruleEn": "Use strong adjectives, comparatives, balance positives and negatives, end with a recommendation.",
      "formula": "Overall + rating → Food → Service → Price → I'd recommend..."
    },
    "practicalExamples": [
      {
        "en": "The food was delicious.",
        "ar": "الأكل كان لذيذ."
      },
      {
        "en": "The staff were very friendly.",
        "ar": "الموظفين كانوا ودودين."
      },
      {
        "en": "However, it was a bit overpriced.",
        "ar": "لكن كان غالي شوي."
      },
      {
        "en": "It's better than the café next door.",
        "ar": "أحسن من الكافيه اللي جنبه."
      },
      {
        "en": "I'd give it four stars out of five.",
        "ar": "أعطيه ٤ نجوم من ٥."
      },
      {
        "en": "I'd definitely recommend it.",
        "ar": "أنصح فيه أكيد."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "The food was very delicious.",
        "correct": "The food was absolutely delicious.",
        "whyAr": "delicious قوية؛ نستخدم absolutely."
      },
      {
        "incorrect": "It's more better.",
        "correct": "It's better.",
        "whyAr": "لا تجمع more مع -er."
      },
      {
        "incorrect": "The service was bored.",
        "correct": "The service was boring/slow.",
        "whyAr": "bored للشخص، boring للشي."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اكتب تقييم لمقهاك المفضل.",
      "promptEn": "Write a review of your favourite café.",
      "saraQuestionAr": "قيّم لي مقهى!",
      "saraQuestionEn": "Review a café for me!",
      "recommendedResponseEn": "Overall, Brew House is my favourite café in Khobar. The coffee is excellent and the desserts are delicious. The staff are friendly and the atmosphere is cosy. However, it's a bit overpriced. I'd give it four stars and definitely recommend it."
    },
    "quiz": [
      {
        "questionAr": "أكمل: The portions were big. ___, the price was high.",
        "questionEn": "Complete: The portions were big. ___, the price was high.",
        "options": [
          "Because",
          "However",
          "So"
        ],
        "correctIndex": 1,
        "explanationAr": "تضاد ⇐ However."
      },
      {
        "questionAr": "مقارنة صحيحة:",
        "questionEn": "Correct comparative:",
        "options": [
          "more cheap",
          "cheaper",
          "cheapest than"
        ],
        "correctIndex": 1,
        "explanationAr": "cheaper."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "The food was absolutely delicious.",
          "The food was very delicious."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: The food was absolutely delicious. — delicious قوية؛ نستخدم absolutely."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "It's more better.",
          "It's better."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: It's better. — لا تجمع more مع -er."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "The service was boring/slow.",
          "The service was bored."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: The service was boring/slow. — bored للشخص، boring للشي."
      }
    ],
    "whiteboardNotes": {
      "title": "Writing a Review",
      "pointsAr": [
        "يستخدم صفات تقييم.",
        "يوازن بين الإيجابي والسلبي.",
        "يكتب توصية.",
        "استخدم صفات قوية (delicious, friendly, overpriced) ومقارنات (better than, the best). وازن: إيجابية وسلبية. اختم بتوصية: I'd recommend it / I wouldn't go back."
      ],
      "pointsEn": [
        "Use evaluative adjectives.",
        "Balance pros and cons.",
        "Give a recommendation.",
        "Use strong adjectives, comparatives, balance positives and negatives, end with a recommendation."
      ],
      "chalkHighlight": "Overall + rating → Food → Service → Price → I'd recommend..."
    },
    "unit": 4,
    "cefr": "A2",
    "objectivesAr": [
      "يستخدم صفات تقييم.",
      "يوازن بين الإيجابي والسلبي.",
      "يكتب توصية."
    ],
    "objectivesEn": [
      "Use evaluative adjectives.",
      "Balance pros and cons.",
      "Give a recommendation."
    ],
    "vocabulary": [
      {
        "word": "delicious",
        "ipa": "/dɪˈlɪʃəs/",
        "ar": "لذيذ",
        "exampleEn": "a delicious meal",
        "exampleAr": "وجبة لذيذة"
      },
      {
        "word": "friendly",
        "ipa": "/ˈfrɛndli/",
        "ar": "ودود",
        "exampleEn": "friendly staff",
        "exampleAr": "موظفين ودودين"
      },
      {
        "word": "overpriced",
        "ipa": "/ˌoʊvərˈpraɪst/",
        "ar": "سعره مبالغ",
        "exampleEn": "a bit overpriced",
        "exampleAr": "سعره مبالغ شوي"
      },
      {
        "word": "service",
        "ipa": "/ˈsɜːrvɪs/",
        "ar": "خدمة",
        "exampleEn": "fast service",
        "exampleAr": "خدمة سريعة"
      },
      {
        "word": "atmosphere",
        "ipa": "/ˈætməsfɪr/",
        "ar": "أجواء",
        "exampleEn": "a cosy atmosphere",
        "exampleAr": "أجواء مريحة"
      },
      {
        "word": "portion",
        "ipa": "/ˈpɔːrʃən/",
        "ar": "كمية/حصة",
        "exampleEn": "big portions",
        "exampleAr": "كميات كبيرة"
      },
      {
        "word": "recommend",
        "ipa": "/ˌrɛkəˈmɛnd/",
        "ar": "ينصح بـ",
        "exampleEn": "I recommend it.",
        "exampleAr": "أنصح فيه."
      },
      {
        "word": "however",
        "ipa": "/haʊˈɛvər/",
        "ar": "لكن",
        "exampleEn": "However, ...",
        "exampleAr": "لكن، ..."
      },
      {
        "word": "value for money",
        "ipa": "/ˈvæljuː fər ˈmʌni/",
        "ar": "يستاهل سعره",
        "exampleEn": "good value for money",
        "exampleAr": "يستاهل سعره"
      },
      {
        "word": "overall",
        "ipa": "/ˌoʊvərˈɔːl/",
        "ar": "بشكل عام",
        "exampleEn": "Overall, ...",
        "exampleAr": "بشكل عام، ..."
      }
    ],
    "grammarFocus": {
      "ruleAr": "استخدم صفات قوية (delicious, friendly, overpriced) ومقارنات (better than, the best). وازن: إيجابية وسلبية. اختم بتوصية: I'd recommend it / I wouldn't go back.",
      "ruleEn": "Use strong adjectives, comparatives, balance positives and negatives, end with a recommendation.",
      "formula": "Overall + rating → Food → Service → Price → I'd recommend...",
      "examples": [
        {
          "en": "The food was delicious.",
          "ar": "الأكل كان لذيذ."
        },
        {
          "en": "The staff were very friendly.",
          "ar": "الموظفين كانوا ودودين."
        },
        {
          "en": "However, it was a bit overpriced.",
          "ar": "لكن كان غالي شوي."
        },
        {
          "en": "It's better than the café next door.",
          "ar": "أحسن من الكافيه اللي جنبه."
        },
        {
          "en": "I'd give it four stars out of five.",
          "ar": "أعطيه ٤ نجوم من ٥."
        },
        {
          "en": "I'd definitely recommend it.",
          "ar": "أنصح فيه أكيد."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "How was the new burger place?",
        "ar": "كيف مطعم البرجر الجديد؟"
      },
      {
        "speaker": "Student",
        "en": "Overall, it was great. The burgers were delicious.",
        "ar": "بشكل عام حلو. البرجر لذيذ."
      },
      {
        "speaker": "Sara",
        "en": "And the service?",
        "ar": "والخدمة؟"
      },
      {
        "speaker": "Student",
        "en": "Friendly, but a bit slow.",
        "ar": "ودودين بس بطيئين شوي."
      },
      {
        "speaker": "Sara",
        "en": "Price?",
        "ar": "السعر؟"
      },
      {
        "speaker": "Student",
        "en": "A bit overpriced, but I'd still recommend it.",
        "ar": "غالي شوي، بس أنصح فيه."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: How was the new burger place?\nStudent: Overall, it was great. The burgers were delicious.\nSara: And the service?\nStudent: Friendly, but a bit slow.\nSara: Price?\nStudent: A bit overpriced, but I'd still recommend it.",
      "questions": [
        {
          "questionAr": "البرجر؟",
          "questionEn": "How were the burgers?",
          "options": [
            "dry",
            "delicious",
            "cold"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: delicious"
        },
        {
          "questionAr": "الخدمة:",
          "questionEn": "The service was:",
          "options": [
            "fast and rude",
            "friendly but slow",
            "perfect"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: friendly but slow"
        },
        {
          "questionAr": "ينصح فيه؟",
          "questionEn": "Does he recommend it?",
          "options": [
            "yes",
            "no",
            "not sure"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: yes"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Adjective stress",
      "items": [
        "deLIcious",
        "OVerpriced → overPRICED",
        "atmosphere /ˈætməsfɪr/"
      ],
      "tipAr": "delicious النبر على LI."
    },
    "exercises": {
      "easy": [
        {
          "id": "scw_419_e1",
          "type": "meaning",
          "promptEn": "What does \"delicious\" mean?",
          "promptAr": "ما معنى \"delicious\"؟",
          "options": [
            "ينصح بـ",
            "لذيذ",
            "كمية/حصة",
            "سعره مبالغ"
          ],
          "correctIndex": 1,
          "answer": "لذيذ",
          "explanationAr": "\"delicious\" /dɪˈlɪʃəs/ تعني: لذيذ. مثال: a delicious meal"
        },
        {
          "id": "scw_419_e2",
          "type": "meaning",
          "promptEn": "What does \"friendly\" mean?",
          "promptAr": "ما معنى \"friendly\"؟",
          "options": [
            "لكن",
            "لذيذ",
            "ودود",
            "سعره مبالغ"
          ],
          "correctIndex": 2,
          "answer": "ودود",
          "explanationAr": "\"friendly\" /ˈfrɛndli/ تعني: ودود. مثال: friendly staff"
        },
        {
          "id": "scw_419_e3",
          "type": "meaning",
          "promptEn": "What does \"overpriced\" mean?",
          "promptAr": "ما معنى \"overpriced\"؟",
          "options": [
            "كمية/حصة",
            "لذيذ",
            "سعره مبالغ",
            "أجواء"
          ],
          "correctIndex": 2,
          "answer": "سعره مبالغ",
          "explanationAr": "\"overpriced\" /ˌoʊvərˈpraɪst/ تعني: سعره مبالغ. مثال: a bit overpriced"
        },
        {
          "id": "scw_419_e4",
          "type": "meaning",
          "promptEn": "What does \"service\" mean?",
          "promptAr": "ما معنى \"service\"؟",
          "options": [
            "لذيذ",
            "لكن",
            "خدمة",
            "سعره مبالغ"
          ],
          "correctIndex": 2,
          "answer": "خدمة",
          "explanationAr": "\"service\" /ˈsɜːrvɪs/ تعني: خدمة. مثال: fast service"
        }
      ],
      "medium": [
        {
          "id": "scw_419_m1",
          "type": "gap",
          "promptEn": "Complete: The food was ____.",
          "promptAr": "أكمل الفراغ: (الأكل كان لذيذ.)",
          "options": [
            "delicate",
            "delicious",
            "deliciously"
          ],
          "correctIndex": 1,
          "answer": "The food was delicious.",
          "explanationAr": "الإجابة: delicious. استخدم صفات قوية (delicious, friendly, overpriced) ومقارنات (better than, the best). وازن: إيجابية وسلبية. اختم بتوصية: I'd recommend it / I wouldn't go back."
        },
        {
          "id": "scw_419_m2",
          "type": "gap",
          "promptEn": "Complete: The staff were very ____.",
          "promptAr": "أكمل الفراغ: (الموظفين كانوا ودودين.)",
          "options": [
            "friend",
            "friendly",
            "friendship"
          ],
          "correctIndex": 1,
          "answer": "The staff were very friendly.",
          "explanationAr": "الإجابة: friendly. استخدم صفات قوية (delicious, friendly, overpriced) ومقارنات (better than, the best). وازن: إيجابية وسلبية. اختم بتوصية: I'd recommend it / I wouldn't go back."
        },
        {
          "id": "scw_419_m3",
          "type": "gap",
          "promptEn": "Complete: ____, it was a bit overpriced.",
          "promptAr": "أكمل الفراغ: (لكن كان غالي شوي.)",
          "options": [
            "And",
            "Because",
            "However"
          ],
          "correctIndex": 2,
          "answer": "However, it was a bit overpriced.",
          "explanationAr": "الإجابة: However. استخدم صفات قوية (delicious, friendly, overpriced) ومقارنات (better than, the best). وازن: إيجابية وسلبية. اختم بتوصية: I'd recommend it / I wouldn't go back."
        },
        {
          "id": "scw_419_m4",
          "type": "gap",
          "promptEn": "Complete: It's ____ than the café next door.",
          "promptAr": "أكمل الفراغ: (أحسن من الكافيه اللي جنبه.)",
          "options": [
            "more good",
            "better",
            "best"
          ],
          "correctIndex": 1,
          "answer": "It's better than the café next door.",
          "explanationAr": "الإجابة: better. استخدم صفات قوية (delicious, friendly, overpriced) ومقارنات (better than, the best). وازن: إيجابية وسلبية. اختم بتوصية: I'd recommend it / I wouldn't go back."
        }
      ],
      "hard": [
        {
          "id": "scw_419_h1",
          "type": "order",
          "promptEn": "Put the words in order: I'd / it / give / stars / out / four / of / five.",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (أعطيه ٤ نجوم من ٥.)",
          "answer": "I'd give it four stars out of five.",
          "explanationAr": "الترتيب الصحيح: I'd give it four stars out of five."
        },
        {
          "id": "scw_419_h2",
          "type": "order",
          "promptEn": "Put the words in order: definitely / I'd / it. / recommend",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (أنصح فيه أكيد.)",
          "answer": "I'd definitely recommend it.",
          "explanationAr": "الترتيب الصحيح: I'd definitely recommend it."
        },
        {
          "id": "scw_419_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: الموظفين كانوا ودودين.",
          "answer": "The staff were very friendly.",
          "explanationAr": "ترجمة مقترحة: The staff were very friendly."
        },
        {
          "id": "scw_419_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أحسن من الكافيه اللي جنبه.",
          "answer": "It's better than the café next door.",
          "explanationAr": "ترجمة مقترحة: It's better than the café next door."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Only 'good' and 'bad'",
        "correct": "Use delicious, friendly, overpriced",
        "whyAr": "الصفات القوية تخلي التقييم مفيد."
      },
      {
        "incorrect": "Very + strong adjective",
        "correct": "absolutely + strong adjective",
        "whyAr": "very delicious غلط شائع."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (وصف الطريق كتابياً): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Turn to right.",
          "Turn right."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Turn right. — بدون to.",
        "fromLessonId": "scw_418"
      },
      {
        "questionAr": "مراجعة (أدوات الترتيب: first, then, after that, finally): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "First, you must to boil the water.",
          "First, boil the water."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: First, boil the water. — صيغة الأمر أبسط وأوضح.",
        "fromLessonId": "scw_416"
      },
      {
        "questionAr": "مراجعة (رسالة اعتذار): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Sorry I was late. / Sorry for being late.",
          "Sorry for I was late."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Sorry I was late. / Sorry for being late. — for + -ing، أو بدون for مع جملة.",
        "fromLessonId": "scw_413"
      },
      {
        "questionAr": "ما معنى \"frightened\"؟",
        "questionEn": "What does \"frightened\" mean?",
        "options": [
          "خايف",
          "ضايع",
          "لحسن الحظ",
          "في النهاية"
        ],
        "correctIndex": 0,
        "explanationAr": "\"frightened\" /ˈfraɪtənd/ تعني: خايف. مثال: He was frightened.",
        "fromLessonId": "scw_417"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (الأكل كان لذيذ.)",
          "questionEn": "Complete: The food was ____.",
          "options": [
            "delicate",
            "delicious",
            "deliciously"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: delicious. استخدم صفات قوية (delicious, friendly, overpriced) ومقارنات (better than, the best). وازن: إيجابية وسلبية. اختم بتوصية: I'd recommend it / I wouldn't go back."
        },
        {
          "questionAr": "أكمل الفراغ: (الموظفين كانوا ودودين.)",
          "questionEn": "Complete: The staff were very ____.",
          "options": [
            "friend",
            "friendly",
            "friendship"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: friendly. استخدم صفات قوية (delicious, friendly, overpriced) ومقارنات (better than, the best). وازن: إيجابية وسلبية. اختم بتوصية: I'd recommend it / I wouldn't go back."
        },
        {
          "questionAr": "أكمل: The portions were big. ___, the price was high.",
          "questionEn": "Complete: The portions were big. ___, the price was high.",
          "options": [
            "Because",
            "However",
            "So"
          ],
          "correctIndex": 1,
          "explanationAr": "تضاد ⇐ However."
        },
        {
          "questionAr": "مقارنة صحيحة:",
          "questionEn": "Correct comparative:",
          "options": [
            "more cheap",
            "cheaper",
            "cheapest than"
          ],
          "correctIndex": 1,
          "explanationAr": "cheaper."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "The food was absolutely delicious.",
            "The food was very delicious."
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: The food was absolutely delicious. — delicious قوية؛ نستخدم absolutely."
        }
      ]
    }
  },
  {
    "id": "scw_420",
    "pillarId": "writing",
    "pillarNameAr": "الكتابة التعبيرية الحوارية",
    "pillarNameEn": "Conversational Writing & Quick Messaging",
    "pillarIcon": "✍️",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "رسالة شكر",
    "titleEn": "Writing a Thank-You Note",
    "descAr": "اكتب رسالة شكر لمعلم أو صديق: على وش تشكره، وأثره عليك.",
    "descEn": "Write a thank-you note: what for, and how it helped.",
    "speakingGoalAr": "اكتب رسالتين شكر (رسمية وودية).",
    "speakingGoalEn": "Write a formal and an informal thank-you note.",
    "keyPattern": {
      "ruleAr": "Thank you for + اسم/‎-ing (Thank you for the gift / for helping me). وضّح الأثر: It really helped me... / It meant a lot. اختم: Thanks again! (ودي) أو Kind regards (رسمي).",
      "ruleEn": "Thank you for + noun/-ing + effect (It really helped...) + closing.",
      "formula": "Dear X, Thank you for + -ing. It + effect. Thanks again, Name"
    },
    "practicalExamples": [
      {
        "en": "Thank you for helping me with my project.",
        "ar": "شكراً على مساعدتي في مشروعي."
      },
      {
        "en": "Thank you for the lovely gift.",
        "ar": "شكراً على الهدية الحلوة."
      },
      {
        "en": "It meant a lot to me.",
        "ar": "كانت تعني لي الكثير."
      },
      {
        "en": "Thanks to you, I passed the exam.",
        "ar": "بفضلك نجحت في الاختبار."
      },
      {
        "en": "I really appreciate your support.",
        "ar": "أقدر دعمك فعلاً."
      },
      {
        "en": "Thanks again!",
        "ar": "شكراً مرة ثانية!"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Thank you for help me.",
        "correct": "Thank you for helping me.",
        "whyAr": "for + -ing."
      },
      {
        "incorrect": "Thanks to you for the gift.",
        "correct": "Thank you for the gift.",
        "whyAr": "Thanks to = بفضل."
      },
      {
        "incorrect": "Dear teacher, thx 4 everything",
        "correct": "Dear Ms Huda, thank you for everything.",
        "whyAr": "مع المعلم لا تستخدم اختصارات."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اكتب رسالة شكر لمعلم أثّر فيك.",
      "promptEn": "Write a thank-you note to a teacher.",
      "saraQuestionAr": "مين المعلم اللي تبي تشكره؟",
      "saraQuestionEn": "Which teacher would you thank?",
      "recommendedResponseEn": "Dear Ms Huda, Thank you for being so patient with me this year. Thanks to you, my English is much better and I love reading now. I really appreciate your support. Kind regards, Noura"
    },
    "quiz": [
      {
        "questionAr": "أكمل: Thank you for ___ me.",
        "questionEn": "Complete: Thank you for ___ me.",
        "options": [
          "invite",
          "inviting",
          "invited"
        ],
        "correctIndex": 1,
        "explanationAr": "for + -ing."
      },
      {
        "questionAr": "ختام رسمي:",
        "questionEn": "Formal closing:",
        "options": [
          "Cheers!",
          "Kind regards,",
          "Bye!"
        ],
        "correctIndex": 1,
        "explanationAr": "Kind regards."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Thank you for helping me.",
          "Thank you for help me."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Thank you for helping me. — for + -ing."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Thank you for the gift.",
          "Thanks to you for the gift."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Thank you for the gift. — Thanks to = بفضل."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Dear teacher, thx 4 everything",
          "Dear Ms Huda, thank you for everything."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Dear Ms Huda, thank you for everything. — مع المعلم لا تستخدم اختصارات."
      }
    ],
    "whiteboardNotes": {
      "title": "Writing a Thank-You Note",
      "pointsAr": [
        "يستخدم thank you for صح.",
        "يوضح الأثر.",
        "يفرق بين الرسمي والودي.",
        "Thank you for + اسم/‎-ing (Thank you for the gift / for helping me). وضّح الأثر: It really helped me... / It meant a lot. اختم: Thanks again! (ودي) أو Kind regards (رسمي)."
      ],
      "pointsEn": [
        "Use 'thank you for' correctly.",
        "Explain the impact.",
        "Distinguish formal/informal tone.",
        "Thank you for + noun/-ing + effect (It really helped...) + closing."
      ],
      "chalkHighlight": "Dear X, Thank you for + -ing. It + effect. Thanks again, Name"
    },
    "unit": 4,
    "cefr": "A2",
    "objectivesAr": [
      "يستخدم thank you for صح.",
      "يوضح الأثر.",
      "يفرق بين الرسمي والودي."
    ],
    "objectivesEn": [
      "Use 'thank you for' correctly.",
      "Explain the impact.",
      "Distinguish formal/informal tone."
    ],
    "vocabulary": [
      {
        "word": "appreciate",
        "ipa": "/əˈpriːʃieɪt/",
        "ar": "يقدّر",
        "exampleEn": "I appreciate it.",
        "exampleAr": "أقدرها."
      },
      {
        "word": "support",
        "ipa": "/səˈpɔːrt/",
        "ar": "دعم",
        "exampleEn": "your support",
        "exampleAr": "دعمك"
      },
      {
        "word": "grateful",
        "ipa": "/ˈɡreɪtfəl/",
        "ar": "ممتن",
        "exampleEn": "I'm grateful.",
        "exampleAr": "ممتن."
      },
      {
        "word": "gift",
        "ipa": "/ɡɪft/",
        "ar": "هدية",
        "exampleEn": "a lovely gift",
        "exampleAr": "هدية حلوة"
      },
      {
        "word": "kind",
        "ipa": "/kaɪnd/",
        "ar": "لطيف",
        "exampleEn": "very kind of you",
        "exampleAr": "لطف منك"
      },
      {
        "word": "mean a lot",
        "ipa": "/miːn ə lɑːt/",
        "ar": "يعني الكثير",
        "exampleEn": "It means a lot.",
        "exampleAr": "تعني لي الكثير."
      },
      {
        "word": "thanks to",
        "ipa": "/θæŋks tuː/",
        "ar": "بفضل",
        "exampleEn": "thanks to you",
        "exampleAr": "بفضلك"
      },
      {
        "word": "patient",
        "ipa": "/ˈpeɪʃənt/",
        "ar": "صبور",
        "exampleEn": "a patient teacher",
        "exampleAr": "معلمة صبورة"
      },
      {
        "word": "advice",
        "ipa": "/ədˈvaɪs/",
        "ar": "نصيحة",
        "exampleEn": "your advice",
        "exampleAr": "نصيحتك"
      },
      {
        "word": "Kind regards",
        "ipa": "/kaɪnd rɪˈɡɑːrdz/",
        "ar": "مع التحية",
        "exampleEn": "Kind regards, Ali",
        "exampleAr": "مع التحية، علي"
      }
    ],
    "grammarFocus": {
      "ruleAr": "Thank you for + اسم/‎-ing (Thank you for the gift / for helping me). وضّح الأثر: It really helped me... / It meant a lot. اختم: Thanks again! (ودي) أو Kind regards (رسمي).",
      "ruleEn": "Thank you for + noun/-ing + effect (It really helped...) + closing.",
      "formula": "Dear X, Thank you for + -ing. It + effect. Thanks again, Name",
      "examples": [
        {
          "en": "Thank you for helping me with my project.",
          "ar": "شكراً على مساعدتي في مشروعي."
        },
        {
          "en": "Thank you for the lovely gift.",
          "ar": "شكراً على الهدية الحلوة."
        },
        {
          "en": "It meant a lot to me.",
          "ar": "كانت تعني لي الكثير."
        },
        {
          "en": "Thanks to you, I passed the exam.",
          "ar": "بفضلك نجحت في الاختبار."
        },
        {
          "en": "I really appreciate your support.",
          "ar": "أقدر دعمك فعلاً."
        },
        {
          "en": "Thanks again!",
          "ar": "شكراً مرة ثانية!"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Who do you want to thank?",
        "ar": "مين تبي تشكر؟"
      },
      {
        "speaker": "Student",
        "en": "My maths teacher, Mr Saleh.",
        "ar": "معلم الرياضيات، أستاذ صالح."
      },
      {
        "speaker": "Sara",
        "en": "What for?",
        "ar": "على وش؟"
      },
      {
        "speaker": "Student",
        "en": "For explaining things patiently. I got an A!",
        "ar": "لأنه يشرح بصبر. جبت A!"
      },
      {
        "speaker": "Sara",
        "en": "So write: Thank you for explaining...",
        "ar": "اكتب: Thank you for explaining..."
      },
      {
        "speaker": "Student",
        "en": "Thanks to you, I got an A. I really appreciate it.",
        "ar": "بفضلك جبت A. أقدّر هذا فعلاً."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Who do you want to thank?\nStudent: My maths teacher, Mr Saleh.\nSara: What for?\nStudent: For explaining things patiently. I got an A!\nSara: So write: Thank you for explaining...\nStudent: Thanks to you, I got an A. I really appreciate it.",
      "questions": [
        {
          "questionAr": "مين يشكر؟",
          "questionEn": "Who is he thanking?",
          "options": [
            "his father",
            "his maths teacher",
            "Sara"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: his maths teacher"
        },
        {
          "questionAr": "وش جاب؟",
          "questionEn": "What grade did he get?",
          "options": [
            "A",
            "B",
            "C"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: A"
        },
        {
          "questionAr": "ليش؟",
          "questionEn": "Why is he thanking him?",
          "options": [
            "a gift",
            "patient explanations",
            "a trip"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: patient explanations"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "appreciate",
      "items": [
        "appreciate /əˈpriːʃieɪt/",
        "grateful /ˈɡreɪtfəl/"
      ],
      "tipAr": "appreciate: ٤ مقاطع، النبر على PRE."
    },
    "exercises": {
      "easy": [
        {
          "id": "scw_420_e1",
          "type": "meaning",
          "promptEn": "What does \"appreciate\" mean?",
          "promptAr": "ما معنى \"appreciate\"؟",
          "options": [
            "بفضل",
            "يقدّر",
            "صبور",
            "ممتن"
          ],
          "correctIndex": 1,
          "answer": "يقدّر",
          "explanationAr": "\"appreciate\" /əˈpriːʃieɪt/ تعني: يقدّر. مثال: I appreciate it."
        },
        {
          "id": "scw_420_e2",
          "type": "meaning",
          "promptEn": "What does \"support\" mean?",
          "promptAr": "ما معنى \"support\"؟",
          "options": [
            "دعم",
            "هدية",
            "لطيف",
            "مع التحية"
          ],
          "correctIndex": 0,
          "answer": "دعم",
          "explanationAr": "\"support\" /səˈpɔːrt/ تعني: دعم. مثال: your support"
        },
        {
          "id": "scw_420_e3",
          "type": "meaning",
          "promptEn": "What does \"grateful\" mean?",
          "promptAr": "ما معنى \"grateful\"؟",
          "options": [
            "نصيحة",
            "ممتن",
            "لطيف",
            "بفضل"
          ],
          "correctIndex": 1,
          "answer": "ممتن",
          "explanationAr": "\"grateful\" /ˈɡreɪtfəl/ تعني: ممتن. مثال: I'm grateful."
        },
        {
          "id": "scw_420_e4",
          "type": "meaning",
          "promptEn": "What does \"gift\" mean?",
          "promptAr": "ما معنى \"gift\"؟",
          "options": [
            "هدية",
            "مع التحية",
            "يقدّر",
            "بفضل"
          ],
          "correctIndex": 0,
          "answer": "هدية",
          "explanationAr": "\"gift\" /ɡɪft/ تعني: هدية. مثال: a lovely gift"
        }
      ],
      "medium": [
        {
          "id": "scw_420_m1",
          "type": "gap",
          "promptEn": "Complete: Thank you for ____ me with my project.",
          "promptAr": "أكمل الفراغ: (شكراً على مساعدتي في مشروعي.)",
          "options": [
            "help",
            "helping",
            "helped"
          ],
          "correctIndex": 1,
          "answer": "Thank you for helping me with my project.",
          "explanationAr": "الإجابة: helping. Thank you for + اسم/‎-ing (Thank you for the gift / for helping me). وضّح الأثر: It really helped me... / It meant a lot. اختم: Thanks again! (ودي) أو Kind regards (رسمي)."
        },
        {
          "id": "scw_420_m2",
          "type": "gap",
          "promptEn": "Complete: Thank you ____ the lovely gift.",
          "promptAr": "أكمل الفراغ: (شكراً على الهدية الحلوة.)",
          "options": [
            "of",
            "to",
            "for"
          ],
          "correctIndex": 2,
          "answer": "Thank you for the lovely gift.",
          "explanationAr": "الإجابة: for. Thank you for + اسم/‎-ing (Thank you for the gift / for helping me). وضّح الأثر: It really helped me... / It meant a lot. اختم: Thanks again! (ودي) أو Kind regards (رسمي)."
        },
        {
          "id": "scw_420_m3",
          "type": "gap",
          "promptEn": "Complete: It ____ a lot to me.",
          "promptAr": "أكمل الفراغ: (كانت تعني لي الكثير.)",
          "options": [
            "meant",
            "meaned",
            "mean"
          ],
          "correctIndex": 0,
          "answer": "It meant a lot to me.",
          "explanationAr": "الإجابة: meant. Thank you for + اسم/‎-ing (Thank you for the gift / for helping me). وضّح الأثر: It really helped me... / It meant a lot. اختم: Thanks again! (ودي) أو Kind regards (رسمي)."
        },
        {
          "id": "scw_420_m4",
          "type": "gap",
          "promptEn": "Complete: ____ you, I passed the exam.",
          "promptAr": "أكمل الفراغ: (بفضلك نجحت في الاختبار.)",
          "options": [
            "Thanks to",
            "Thanks for",
            "Thank to"
          ],
          "correctIndex": 0,
          "answer": "Thanks to you, I passed the exam.",
          "explanationAr": "الإجابة: Thanks to. Thank you for + اسم/‎-ing (Thank you for the gift / for helping me). وضّح الأثر: It really helped me... / It meant a lot. اختم: Thanks again! (ودي) أو Kind regards (رسمي)."
        }
      ],
      "hard": [
        {
          "id": "scw_420_h1",
          "type": "order",
          "promptEn": "Put the words in order: really / support. / appreciate / I / your",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (أقدر دعمك فعلاً.)",
          "answer": "I really appreciate your support.",
          "explanationAr": "الترتيب الصحيح: I really appreciate your support."
        },
        {
          "id": "scw_420_h2",
          "type": "order",
          "promptEn": "Put the words in order: again! / Thanks",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (شكراً مرة ثانية!)",
          "answer": "Thanks again!",
          "explanationAr": "الترتيب الصحيح: Thanks again!"
        },
        {
          "id": "scw_420_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: شكراً على الهدية الحلوة.",
          "answer": "Thank you for the lovely gift.",
          "explanationAr": "ترجمة مقترحة: Thank you for the lovely gift."
        },
        {
          "id": "scw_420_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: بفضلك نجحت في الاختبار.",
          "answer": "Thanks to you, I passed the exam.",
          "explanationAr": "ترجمة مقترحة: Thanks to you, I passed the exam."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "'Thank you' only, no detail",
        "correct": "Say what for and why it mattered",
        "whyAr": "التفاصيل تخلي الشكر صادق."
      },
      {
        "incorrect": "Using 'Thanks to' to mean 'thank you'",
        "correct": "Thank you for...",
        "whyAr": "Thanks to = بسبب/بفضل."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (كتابة تقييم مطعم أو تطبيق): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "It's better.",
          "It's more better."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: It's better. — لا تجمع more مع -er.",
        "fromLessonId": "scw_419"
      },
      {
        "questionAr": "مراجعة (كتابة قصة قصيرة بالماضي): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I was walking when I saw him.",
          "I walked when I was seeing him."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I was walking when I saw him. — الخلفية مستمرة، الحدث بسيط.",
        "fromLessonId": "scw_417"
      },
      {
        "questionAr": "مراجعة (محادثة خدمة العملاء في التطبيقات): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I would like a refund, please.",
          "I want my money now!"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I would like a refund, please. — الأسلوب المهذب يحل المشكلة أسرع.",
        "fromLessonId": "scw_414"
      },
      {
        "questionAr": "ما معنى \"location\"؟",
        "questionEn": "What does \"location\" mean?",
        "options": [
          "إشارة مرور",
          "سيدا/مستقيم",
          "محطة بنزين",
          "موقع/لوكيشن"
        ],
        "correctIndex": 3,
        "explanationAr": "\"location\" /loʊˈkeɪʃən/ تعني: موقع/لوكيشن. مثال: send the location",
        "fromLessonId": "scw_418"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (شكراً على مساعدتي في مشروعي.)",
          "questionEn": "Complete: Thank you for ____ me with my project.",
          "options": [
            "help",
            "helping",
            "helped"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: helping. Thank you for + اسم/‎-ing (Thank you for the gift / for helping me). وضّح الأثر: It really helped me... / It meant a lot. اختم: Thanks again! (ودي) أو Kind regards (رسمي)."
        },
        {
          "questionAr": "أكمل الفراغ: (شكراً على الهدية الحلوة.)",
          "questionEn": "Complete: Thank you ____ the lovely gift.",
          "options": [
            "of",
            "to",
            "for"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: for. Thank you for + اسم/‎-ing (Thank you for the gift / for helping me). وضّح الأثر: It really helped me... / It meant a lot. اختم: Thanks again! (ودي) أو Kind regards (رسمي)."
        },
        {
          "questionAr": "أكمل: Thank you for ___ me.",
          "questionEn": "Complete: Thank you for ___ me.",
          "options": [
            "invite",
            "inviting",
            "invited"
          ],
          "correctIndex": 1,
          "explanationAr": "for + -ing."
        },
        {
          "questionAr": "ختام رسمي:",
          "questionEn": "Formal closing:",
          "options": [
            "Cheers!",
            "Kind regards,",
            "Bye!"
          ],
          "correctIndex": 1,
          "explanationAr": "Kind regards."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Thank you for helping me.",
            "Thank you for help me."
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: Thank you for helping me. — for + -ing."
        }
      ]
    }
  },
  {
    "id": "scw_421_m",
    "pillarId": "writing",
    "pillarNameAr": "الكتابة التعبيرية الحوارية",
    "pillarNameEn": "Conversational Writing & Quick Messaging",
    "pillarIcon": "✍️",
    "level": "مبتدئ (Starter)",
    "levelCode": "A1-A2",
    "titleAr": "الرسمي وغير الرسمي: النبرة واختصارات الرسائل",
    "titleEn": "Formal vs Informal: Tone and Text Abbreviations",
    "descAr": "اعرف متى تكتب «Hey, wanna meet?» ومتى «Dear Mr..., Would it be possible to meet?».",
    "descEn": "Know when to write casually and when formally; understand common abbreviations.",
    "speakingGoalAr": "حوّل ٥ رسائل من غير رسمي إلى رسمي.",
    "speakingGoalEn": "Rewrite five informal messages formally.",
    "keyPattern": {
      "ruleAr": "غير رسمي (أصدقاء): Hey, thanks, BTW, LOL, ASAP, contractions. رسمي (معلم، شركة): Dear..., I would like..., Could you..., no slang, full words, Kind regards. لا تستخدم u/r/pls في الرسمي.",
      "ruleEn": "Informal: Hey, BTW, contractions. Formal: Dear..., I would like..., Could you..., no abbreviations, Kind regards.",
      "formula": "Informal: Hey + slang → Formal: Dear + full polite sentences"
    },
    "practicalExamples": [
      {
        "en": "BTW, the meeting is at 5.",
        "ar": "على فكرة، الاجتماع الساعة ٥."
      },
      {
        "en": "Please reply ASAP.",
        "ar": "رد بأسرع وقت."
      },
      {
        "en": "Dear Mr Khalid, I would like to ask about the course.",
        "ar": "الأستاذ خالد المحترم، أود السؤال عن الدورة."
      },
      {
        "en": "Could you please send me the details?",
        "ar": "ممكن ترسل لي التفاصيل لو سمحت؟"
      },
      {
        "en": "Thx! C u later.",
        "ar": "شكراً! أشوفك بعدين (غير رسمي)."
      },
      {
        "en": "Kind regards, Sultan",
        "ar": "مع التحية، سلطان"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Hey Dr Ahmed, can u send the slides?",
        "correct": "Dear Dr Ahmed, could you please send the slides?",
        "whyAr": "مع الدكتور: رسمي بدون u."
      },
      {
        "incorrect": "Dear Saad, I would be grateful if you joined me for coffee.",
        "correct": "Hey Saad, fancy a coffee?",
        "whyAr": "مع صديق: الرسمي زيادة يبين برود."
      },
      {
        "incorrect": "pls",
        "correct": "please",
        "whyAr": "لا اختصارات في الرسمي."
      }
    ],
    "speakingChallenge": {
      "promptAr": "حوّل الرسالة لرسمية.",
      "promptEn": "Make this message formal.",
      "saraQuestionAr": "حوّلها رسمية: hey, u free tmrw? need help w/ my CV pls",
      "saraQuestionEn": "Make it formal: hey, u free tmrw? need help w/ my CV pls",
      "recommendedResponseEn": "Dear Mr Omar, Would you be available tomorrow? I would appreciate your help with my CV. Kind regards, Sultan"
    },
    "quiz": [
      {
        "questionAr": "أنسب بداية لإيميل لمدير:",
        "questionEn": "Best opening to a manager:",
        "options": [
          "Hey bro,",
          "Dear Mr Fahad,",
          "Yo!"
        ],
        "correctIndex": 1,
        "explanationAr": "Dear + title."
      },
      {
        "questionAr": "ASAP =",
        "questionEn": "ASAP =",
        "options": [
          "as soon as possible",
          "always say a phrase",
          "as simple as possible"
        ],
        "correctIndex": 0,
        "explanationAr": "بأسرع وقت."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Hey Dr Ahmed, can u send the slides?",
          "Dear Dr Ahmed, could you please send the slides?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Dear Dr Ahmed, could you please send the slides? — مع الدكتور: رسمي بدون u."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Hey Saad, fancy a coffee?",
          "Dear Saad, I would be grateful if you joined me for coffee."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Hey Saad, fancy a coffee? — مع صديق: الرسمي زيادة يبين برود."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "pls",
          "please"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: please — لا اختصارات في الرسمي."
      }
    ],
    "whiteboardNotes": {
      "title": "Formal vs Informal: Tone and Text Abbreviations",
      "pointsAr": [
        "يميز النبرة المناسبة.",
        "يفهم اختصارات الرسائل.",
        "يحول الرسالة من نبرة لأخرى.",
        "غير رسمي (أصدقاء): Hey, thanks, BTW, LOL, ASAP, contractions. رسمي (معلم، شركة): Dear..., I would like..., Could you..., no slang, full words, Kind regards. لا تستخدم u/r/pls في الرسمي."
      ],
      "pointsEn": [
        "Choose the right tone.",
        "Understand common abbreviations.",
        "Rewrite between registers.",
        "Informal: Hey, BTW, contractions. Formal: Dear..., I would like..., Could you..., no abbreviations, Kind regards."
      ],
      "chalkHighlight": "Informal: Hey + slang → Formal: Dear + full polite sentences"
    },
    "unit": 4,
    "cefr": "A2",
    "objectivesAr": [
      "يميز النبرة المناسبة.",
      "يفهم اختصارات الرسائل.",
      "يحول الرسالة من نبرة لأخرى."
    ],
    "objectivesEn": [
      "Choose the right tone.",
      "Understand common abbreviations.",
      "Rewrite between registers."
    ],
    "vocabulary": [
      {
        "word": "BTW",
        "ipa": "/ˌbiː tiː ˈdʌbəljuː/",
        "ar": "على فكرة (by the way)",
        "exampleEn": "BTW, I'm late.",
        "exampleAr": "على فكرة متأخر."
      },
      {
        "word": "ASAP",
        "ipa": "/ˌeɪ ɛs eɪ ˈpiː/",
        "ar": "بأسرع وقت",
        "exampleEn": "Reply ASAP.",
        "exampleAr": "رد بسرعة."
      },
      {
        "word": "FYI",
        "ipa": "/ˌɛf waɪ ˈaɪ/",
        "ar": "للعلم",
        "exampleEn": "FYI, it's closed.",
        "exampleAr": "للعلم، مسكر."
      },
      {
        "word": "formal",
        "ipa": "/ˈfɔːrməl/",
        "ar": "رسمي",
        "exampleEn": "a formal email",
        "exampleAr": "إيميل رسمي"
      },
      {
        "word": "informal",
        "ipa": "/ɪnˈfɔːrməl/",
        "ar": "غير رسمي",
        "exampleEn": "an informal chat",
        "exampleAr": "سوالف غير رسمية"
      },
      {
        "word": "tone",
        "ipa": "/toʊn/",
        "ar": "نبرة",
        "exampleEn": "a polite tone",
        "exampleAr": "نبرة مؤدبة"
      },
      {
        "word": "slang",
        "ipa": "/slæŋ/",
        "ar": "عامية",
        "exampleEn": "avoid slang",
        "exampleAr": "تجنب العامية"
      },
      {
        "word": "regards",
        "ipa": "/rɪˈɡɑːrdz/",
        "ar": "تحيات",
        "exampleEn": "Best regards",
        "exampleAr": "أطيب التحيات"
      },
      {
        "word": "Dear",
        "ipa": "/dɪr/",
        "ar": "عزيزي/المحترم",
        "exampleEn": "Dear Sir",
        "exampleAr": "سيدي المحترم"
      },
      {
        "word": "polite",
        "ipa": "/pəˈlaɪt/",
        "ar": "مؤدب",
        "exampleEn": "be polite",
        "exampleAr": "كن مؤدب"
      }
    ],
    "grammarFocus": {
      "ruleAr": "غير رسمي (أصدقاء): Hey, thanks, BTW, LOL, ASAP, contractions. رسمي (معلم، شركة): Dear..., I would like..., Could you..., no slang, full words, Kind regards. لا تستخدم u/r/pls في الرسمي.",
      "ruleEn": "Informal: Hey, BTW, contractions. Formal: Dear..., I would like..., Could you..., no abbreviations, Kind regards.",
      "formula": "Informal: Hey + slang → Formal: Dear + full polite sentences",
      "examples": [
        {
          "en": "BTW, the meeting is at 5.",
          "ar": "على فكرة، الاجتماع الساعة ٥."
        },
        {
          "en": "Please reply ASAP.",
          "ar": "رد بأسرع وقت."
        },
        {
          "en": "Dear Mr Khalid, I would like to ask about the course.",
          "ar": "الأستاذ خالد المحترم، أود السؤال عن الدورة."
        },
        {
          "en": "Could you please send me the details?",
          "ar": "ممكن ترسل لي التفاصيل لو سمحت؟"
        },
        {
          "en": "Thx! C u later.",
          "ar": "شكراً! أشوفك بعدين (غير رسمي)."
        },
        {
          "en": "Kind regards, Sultan",
          "ar": "مع التحية، سلطان"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Rewrite formally: 'Hey, can u send the homework?'",
        "ar": "حوّلها رسمي."
      },
      {
        "speaker": "Student",
        "en": "Dear Ms Sara, could you please send the homework?",
        "ar": "الأستاذة سارة، ممكن ترسلين الواجب لو سمحتي؟"
      },
      {
        "speaker": "Sara",
        "en": "Great! Now informal: 'I would like to invite you to lunch.'",
        "ar": "ممتاز! الحين غير رسمي."
      },
      {
        "speaker": "Student",
        "en": "Hey! Wanna grab lunch?",
        "ar": "هلا! نتغدى؟"
      },
      {
        "speaker": "Sara",
        "en": "What does FYI mean?",
        "ar": "وش يعني FYI؟"
      },
      {
        "speaker": "Student",
        "en": "For your information.",
        "ar": "للعلم."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Rewrite formally: 'Hey, can u send the homework?'\nStudent: Dear Ms Sara, could you please send the homework?\nSara: Great! Now informal: 'I would like to invite you to lunch.'\nStudent: Hey! Wanna grab lunch?\nSara: What does FYI mean?\nStudent: For your information.",
      "questions": [
        {
          "questionAr": "u تصير:",
          "questionEn": "'u' should become:",
          "options": [
            "you",
            "your",
            "yo"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: you"
        },
        {
          "questionAr": "غير الرسمي يستخدم:",
          "questionEn": "Informal version uses:",
          "options": [
            "Dear",
            "Wanna",
            "regards"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: Wanna"
        },
        {
          "questionAr": "FYI =",
          "questionEn": "FYI =",
          "options": [
            "for your idea",
            "for your information",
            "find your item"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: for your information"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Saying abbreviations",
      "items": [
        "ASAP /ˌeɪ ɛs eɪ ˈpiː/ or /ˈeɪsæp/",
        "FYI letter by letter"
      ],
      "tipAr": "ASAP ممكن تنقال حروف أو كلمة."
    },
    "exercises": {
      "easy": [
        {
          "id": "scw_421_m_e1",
          "type": "meaning",
          "promptEn": "What does \"BTW\" mean?",
          "promptAr": "ما معنى \"BTW\"؟",
          "options": [
            "للعلم",
            "على فكرة (by the way)",
            "عامية",
            "مؤدب"
          ],
          "correctIndex": 1,
          "answer": "على فكرة (by the way)",
          "explanationAr": "\"BTW\" /ˌbiː tiː ˈdʌbəljuː/ تعني: على فكرة (by the way). مثال: BTW, I'm late."
        },
        {
          "id": "scw_421_m_e2",
          "type": "meaning",
          "promptEn": "What does \"ASAP\" mean?",
          "promptAr": "ما معنى \"ASAP\"؟",
          "options": [
            "على فكرة (by the way)",
            "للعلم",
            "رسمي",
            "بأسرع وقت"
          ],
          "correctIndex": 3,
          "answer": "بأسرع وقت",
          "explanationAr": "\"ASAP\" /ˌeɪ ɛs eɪ ˈpiː/ تعني: بأسرع وقت. مثال: Reply ASAP."
        },
        {
          "id": "scw_421_m_e3",
          "type": "meaning",
          "promptEn": "What does \"FYI\" mean?",
          "promptAr": "ما معنى \"FYI\"؟",
          "options": [
            "للعلم",
            "مؤدب",
            "بأسرع وقت",
            "تحيات"
          ],
          "correctIndex": 0,
          "answer": "للعلم",
          "explanationAr": "\"FYI\" /ˌɛf waɪ ˈaɪ/ تعني: للعلم. مثال: FYI, it's closed."
        },
        {
          "id": "scw_421_m_e4",
          "type": "meaning",
          "promptEn": "What does \"formal\" mean?",
          "promptAr": "ما معنى \"formal\"؟",
          "options": [
            "مؤدب",
            "رسمي",
            "عامية",
            "غير رسمي"
          ],
          "correctIndex": 1,
          "answer": "رسمي",
          "explanationAr": "\"formal\" /ˈfɔːrməl/ تعني: رسمي. مثال: a formal email"
        }
      ],
      "medium": [
        {
          "id": "scw_421_m_m1",
          "type": "gap",
          "promptEn": "Complete: ____, the meeting is at 5.",
          "promptAr": "أكمل الفراغ: (على فكرة، الاجتماع الساعة ٥.)",
          "options": [
            "TBW",
            "BWT",
            "BTW"
          ],
          "correctIndex": 2,
          "answer": "BTW, the meeting is at 5.",
          "explanationAr": "الإجابة: BTW. غير رسمي (أصدقاء): Hey, thanks, BTW, LOL, ASAP, contractions. رسمي (معلم، شركة): Dear..., I would like..., Could you..., no slang, full words, Kind regards. لا تستخدم u/r/pls في الرسمي."
        },
        {
          "id": "scw_421_m_m2",
          "type": "gap",
          "promptEn": "Complete: Please reply ____.",
          "promptAr": "أكمل الفراغ: (رد بأسرع وقت.)",
          "options": [
            "ASAP",
            "SAPA",
            "AASP"
          ],
          "correctIndex": 0,
          "answer": "Please reply ASAP.",
          "explanationAr": "الإجابة: ASAP. غير رسمي (أصدقاء): Hey, thanks, BTW, LOL, ASAP, contractions. رسمي (معلم، شركة): Dear..., I would like..., Could you..., no slang, full words, Kind regards. لا تستخدم u/r/pls في الرسمي."
        },
        {
          "id": "scw_421_m_m3",
          "type": "gap",
          "promptEn": "Complete: Dear Mr Khalid, I ____ like to ask about the course.",
          "promptAr": "أكمل الفراغ: (الأستاذ خالد المحترم، أود السؤال عن الدورة.)",
          "options": [
            "would",
            "will to",
            "wanna"
          ],
          "correctIndex": 0,
          "answer": "Dear Mr Khalid, I would like to ask about the course.",
          "explanationAr": "الإجابة: would. غير رسمي (أصدقاء): Hey, thanks, BTW, LOL, ASAP, contractions. رسمي (معلم، شركة): Dear..., I would like..., Could you..., no slang, full words, Kind regards. لا تستخدم u/r/pls في الرسمي."
        },
        {
          "id": "scw_421_m_m4",
          "type": "gap",
          "promptEn": "Complete: ____ you please send me the details?",
          "promptAr": "أكمل الفراغ: (ممكن ترسل لي التفاصيل لو سمحت؟)",
          "options": [
            "Could",
            "Send",
            "Can u"
          ],
          "correctIndex": 0,
          "answer": "Could you please send me the details?",
          "explanationAr": "الإجابة: Could. غير رسمي (أصدقاء): Hey, thanks, BTW, LOL, ASAP, contractions. رسمي (معلم، شركة): Dear..., I would like..., Could you..., no slang, full words, Kind regards. لا تستخدم u/r/pls في الرسمي."
        }
      ],
      "hard": [
        {
          "id": "scw_421_m_h1",
          "type": "order",
          "promptEn": "Put the words in order: Thx! / C / later. / u",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (شكراً! أشوفك بعدين (غير رسمي).)",
          "answer": "Thx! C u later.",
          "explanationAr": "الترتيب الصحيح: Thx! C u later."
        },
        {
          "id": "scw_421_m_h2",
          "type": "order",
          "promptEn": "Put the words in order: regards, / Sultan / Kind",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (مع التحية، سلطان)",
          "answer": "Kind regards, Sultan",
          "explanationAr": "الترتيب الصحيح: Kind regards, Sultan"
        },
        {
          "id": "scw_421_m_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: رد بأسرع وقت.",
          "answer": "Please reply ASAP.",
          "explanationAr": "ترجمة مقترحة: Please reply ASAP."
        },
        {
          "id": "scw_421_m_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: ممكن ترسل لي التفاصيل لو سمحت؟",
          "answer": "Could you please send me the details?",
          "explanationAr": "ترجمة مقترحة: Could you please send me the details?"
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Writing to a teacher like a friend",
        "correct": "Dear + title + name",
        "whyAr": "الأسلوب يعكس احترامك."
      },
      {
        "incorrect": "Title + first name: Mr Ahmed (OK in Gulf), Mr Alharbi (UK)",
        "correct": "Both are understood",
        "whyAr": "في بريطانيا Mr + اسم العائلة."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (رسالة شكر): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Thanks to you for the gift.",
          "Thank you for the gift."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Thank you for the gift. — Thanks to = بفضل.",
        "fromLessonId": "scw_420"
      },
      {
        "questionAr": "مراجعة (وصف الطريق كتابياً): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Go straightly.",
          "Go straight."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Go straight. — straight بدون ly.",
        "fromLessonId": "scw_418"
      },
      {
        "questionAr": "مراجعة (بناء الفقرة: الجملة الرئيسية والتفاصيل): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Start with the main idea: 'Winter is my favourite season.'",
          "Starting with a detail: 'We camp in the desert.'"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Start with the main idea: 'Winter is my favourite season.' — ابدأ بالفكرة العامة.",
        "fromLessonId": "scw_415"
      },
      {
        "questionAr": "ما معنى \"overall\"؟",
        "questionEn": "What does \"overall\" mean?",
        "options": [
          "ينصح بـ",
          "كمية/حصة",
          "بشكل عام",
          "لذيذ"
        ],
        "correctIndex": 2,
        "explanationAr": "\"overall\" /ˌoʊvərˈɔːl/ تعني: بشكل عام. مثال: Overall, ...",
        "fromLessonId": "scw_419"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (على فكرة، الاجتماع الساعة ٥.)",
          "questionEn": "Complete: ____, the meeting is at 5.",
          "options": [
            "TBW",
            "BWT",
            "BTW"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: BTW. غير رسمي (أصدقاء): Hey, thanks, BTW, LOL, ASAP, contractions. رسمي (معلم، شركة): Dear..., I would like..., Could you..., no slang, full words, Kind regards. لا تستخدم u/r/pls في الرسمي."
        },
        {
          "questionAr": "أكمل الفراغ: (رد بأسرع وقت.)",
          "questionEn": "Complete: Please reply ____.",
          "options": [
            "ASAP",
            "SAPA",
            "AASP"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: ASAP. غير رسمي (أصدقاء): Hey, thanks, BTW, LOL, ASAP, contractions. رسمي (معلم، شركة): Dear..., I would like..., Could you..., no slang, full words, Kind regards. لا تستخدم u/r/pls في الرسمي."
        },
        {
          "questionAr": "أنسب بداية لإيميل لمدير:",
          "questionEn": "Best opening to a manager:",
          "options": [
            "Hey bro,",
            "Dear Mr Fahad,",
            "Yo!"
          ],
          "correctIndex": 1,
          "explanationAr": "Dear + title."
        },
        {
          "questionAr": "ASAP =",
          "questionEn": "ASAP =",
          "options": [
            "as soon as possible",
            "always say a phrase",
            "as simple as possible"
          ],
          "correctIndex": 0,
          "explanationAr": "بأسرع وقت."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Hey Dr Ahmed, can u send the slides?",
            "Dear Dr Ahmed, could you please send the slides?"
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: Dear Dr Ahmed, could you please send the slides? — مع الدكتور: رسمي بدون u."
        }
      ]
    }
  },
  {
    "id": "scw_403",
    "pillarId": "writing",
    "pillarNameAr": "الكتابة التعبيرية الحوارية",
    "pillarNameEn": "Conversational Writing & Quick Messaging",
    "pillarIcon": "✍️",
    "level": "متوسط (Intermediate)",
    "levelCode": "B1-B2",
    "titleAr": "الإيميل الرسمي: الهيكل الكامل",
    "titleEn": "The Formal Email: Full Structure",
    "descAr": "اكتب إيميل رسمي صحيح: الموضوع، التحية، الغرض، التفاصيل، الطلب، الختام.",
    "descEn": "Write a correct formal email: subject, greeting, purpose, details, request, closing.",
    "speakingGoalAr": "اكتب إيميل رسمي من ١٠٠ كلمة لجهة عمل أو جامعة.",
    "speakingGoalEn": "Write a 100-word formal email to a university or employer.",
    "keyPattern": {
      "ruleAr": "Subject: واضح ومختصر. Dear Mr/Ms + اسم العائلة (أو Dear Sir/Madam). الفقرة ١: I am writing to + الغرض. الفقرة ٢: التفاصيل. الفقرة ٣: الطلب (I would be grateful if you could...). الختام: I look forward to hearing from you. Kind regards / Yours sincerely + الاسم الكامل.",
      "ruleEn": "Subject → Dear... → I am writing to... → details → I would be grateful if you could... → I look forward to hearing from you. → Kind regards, Full name.",
      "formula": "Subject | Dear X, | I am writing to... | Details | Request | I look forward to hearing from you. | Kind regards, Name"
    },
    "practicalExamples": [
      {
        "en": "I am writing to apply for the summer internship.",
        "ar": "أكتب لك للتقديم على التدريب الصيفي."
      },
      {
        "en": "I would be grateful if you could send me more information.",
        "ar": "أكون ممتناً لو أرسلت لي معلومات أكثر."
      },
      {
        "en": "Please find my CV attached.",
        "ar": "تجد سيرتي الذاتية مرفقة."
      },
      {
        "en": "I look forward to hearing from you.",
        "ar": "أتطلع لردكم."
      },
      {
        "en": "Subject: Application for Summer Internship",
        "ar": "الموضوع: طلب تدريب صيفي"
      },
      {
        "en": "Yours sincerely, Abdullah Alotaibi",
        "ar": "وتفضلوا بقبول فائق الاحترام، عبدالله العتيبي"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "I look forward to hear from you.",
        "correct": "I look forward to hearing from you.",
        "whyAr": "to هنا حرف جر ⇐ -ing."
      },
      {
        "incorrect": "Dear Mr Abdullah Alotaibi,",
        "correct": "Dear Mr Alotaibi,",
        "whyAr": "Mr + اسم العائلة فقط."
      },
      {
        "incorrect": "Subject: (empty) / Subject: Hello",
        "correct": "Subject: Internship Application – Abdullah Alotaibi",
        "whyAr": "الموضوع يوضح الغرض."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اكتب إيميل رسمي تطلب فيه معلومات عن دورة لغة.",
      "promptEn": "Write a formal email asking about an English course.",
      "saraQuestionAr": "اكتب الإيميل كامل بالموضوع والختام.",
      "saraQuestionEn": "Write the full email with subject and closing.",
      "recommendedResponseEn": "Subject: Enquiry about IELTS Preparation Course\nDear Sir/Madam,\nI am writing to enquire about your IELTS preparation course. Could you please tell me the start date, the fees and the class times? I would be grateful if you could also send me the course timetable.\nI look forward to hearing from you.\nYours faithfully,\nSara Alzahrani"
    },
    "quiz": [
      {
        "questionAr": "أكمل: I look forward to ___ from you.",
        "questionEn": "Complete: I look forward to ___ from you.",
        "options": [
          "hear",
          "hearing",
          "heard"
        ],
        "correctIndex": 1,
        "explanationAr": "to + -ing."
      },
      {
        "questionAr": "أول جملة في الإيميل الرسمي غالباً:",
        "questionEn": "Typical first sentence:",
        "options": [
          "What's up?",
          "I am writing to...",
          "Hello friend"
        ],
        "correctIndex": 1,
        "explanationAr": "I am writing to..."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I look forward to hearing from you.",
          "I look forward to hear from you."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I look forward to hearing from you. — to هنا حرف جر ⇐ -ing."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Dear Mr Alotaibi,",
          "Dear Mr Abdullah Alotaibi,"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Dear Mr Alotaibi, — Mr + اسم العائلة فقط."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Subject: (empty) / Subject: Hello",
          "Subject: Internship Application – Abdullah Alotaibi"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Subject: Internship Application – Abdullah Alotaibi — الموضوع يوضح الغرض."
      }
    ],
    "whiteboardNotes": {
      "title": "The Formal Email: Full Structure",
      "pointsAr": [
        "يكتب موضوعاً واضحاً.",
        "يرتب الإيميل في فقرات.",
        "يستخدم عبارات رسمية ثابتة.",
        "Subject: واضح ومختصر. Dear Mr/Ms + اسم العائلة (أو Dear Sir/Madam). الفقرة ١: I am writing to + الغرض. الفقرة ٢: التفاصيل. الفقرة ٣: الطلب (I would be grateful if you could...). الختام: I look forward to hearing from you. Kind regards / Yours sincerely + الاسم الكامل."
      ],
      "pointsEn": [
        "Write a clear subject line.",
        "Organise the email in paragraphs.",
        "Use fixed formal phrases.",
        "Subject → Dear... → I am writing to... → details → I would be grateful if you could... → I look forward to hearing from you. → Kind regards, Full name."
      ],
      "chalkHighlight": "Subject | Dear X, | I am writing to... | Details | Request | I look forward to hearing from you. | Kind regards, Name"
    },
    "unit": 5,
    "cefr": "B1",
    "objectivesAr": [
      "يكتب موضوعاً واضحاً.",
      "يرتب الإيميل في فقرات.",
      "يستخدم عبارات رسمية ثابتة."
    ],
    "objectivesEn": [
      "Write a clear subject line.",
      "Organise the email in paragraphs.",
      "Use fixed formal phrases."
    ],
    "vocabulary": [
      {
        "word": "subject line",
        "ipa": "/ˈsʌbdʒɪkt laɪn/",
        "ar": "سطر الموضوع",
        "exampleEn": "a clear subject line",
        "exampleAr": "موضوع واضح"
      },
      {
        "word": "apply for",
        "ipa": "/əˈplaɪ fɔːr/",
        "ar": "يقدّم على",
        "exampleEn": "apply for a job",
        "exampleAr": "يقدم على وظيفة"
      },
      {
        "word": "internship",
        "ipa": "/ˈɪntɜːrnʃɪp/",
        "ar": "تدريب",
        "exampleEn": "a summer internship",
        "exampleAr": "تدريب صيفي"
      },
      {
        "word": "attached",
        "ipa": "/əˈtætʃt/",
        "ar": "مرفق",
        "exampleEn": "the attached file",
        "exampleAr": "الملف المرفق"
      },
      {
        "word": "grateful",
        "ipa": "/ˈɡreɪtfəl/",
        "ar": "ممتن",
        "exampleEn": "I would be grateful...",
        "exampleAr": "أكون ممتناً..."
      },
      {
        "word": "regarding",
        "ipa": "/rɪˈɡɑːrdɪŋ/",
        "ar": "بخصوص",
        "exampleEn": "regarding your email",
        "exampleAr": "بخصوص إيميلك"
      },
      {
        "word": "look forward to",
        "ipa": "/lʊk ˈfɔːrwərd tuː/",
        "ar": "يتطلع لـ",
        "exampleEn": "I look forward to it.",
        "exampleAr": "أتطلع لها."
      },
      {
        "word": "sincerely",
        "ipa": "/sɪnˈsɪrli/",
        "ar": "بإخلاص",
        "exampleEn": "Yours sincerely",
        "exampleAr": "تقبلوا تحياتي"
      },
      {
        "word": "enquiry",
        "ipa": "/ɪnˈkwaɪəri/",
        "ar": "استفسار",
        "exampleEn": "a quick enquiry",
        "exampleAr": "استفسار سريع"
      },
      {
        "word": "CV",
        "ipa": "/ˌsiː ˈviː/",
        "ar": "سيرة ذاتية",
        "exampleEn": "update your CV",
        "exampleAr": "حدّث سيرتك"
      }
    ],
    "grammarFocus": {
      "ruleAr": "Subject: واضح ومختصر. Dear Mr/Ms + اسم العائلة (أو Dear Sir/Madam). الفقرة ١: I am writing to + الغرض. الفقرة ٢: التفاصيل. الفقرة ٣: الطلب (I would be grateful if you could...). الختام: I look forward to hearing from you. Kind regards / Yours sincerely + الاسم الكامل.",
      "ruleEn": "Subject → Dear... → I am writing to... → details → I would be grateful if you could... → I look forward to hearing from you. → Kind regards, Full name.",
      "formula": "Subject | Dear X, | I am writing to... | Details | Request | I look forward to hearing from you. | Kind regards, Name",
      "examples": [
        {
          "en": "I am writing to apply for the summer internship.",
          "ar": "أكتب لك للتقديم على التدريب الصيفي."
        },
        {
          "en": "I would be grateful if you could send me more information.",
          "ar": "أكون ممتناً لو أرسلت لي معلومات أكثر."
        },
        {
          "en": "Please find my CV attached.",
          "ar": "تجد سيرتي الذاتية مرفقة."
        },
        {
          "en": "I look forward to hearing from you.",
          "ar": "أتطلع لردكم."
        },
        {
          "en": "Subject: Application for Summer Internship",
          "ar": "الموضوع: طلب تدريب صيفي"
        },
        {
          "en": "Yours sincerely, Abdullah Alotaibi",
          "ar": "وتفضلوا بقبول فائق الاحترام، عبدالله العتيبي"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Email",
        "en": "Subject: Application for Summer Internship – IT Department",
        "ar": "الموضوع: طلب تدريب صيفي – قسم التقنية"
      },
      {
        "speaker": "Email",
        "en": "Dear Ms Alshehri,",
        "ar": "الأستاذة الشهري المحترمة،"
      },
      {
        "speaker": "Email",
        "en": "I am writing to apply for the summer internship advertised on your website.",
        "ar": "أكتب للتقديم على التدريب الصيفي المعلن في موقعكم."
      },
      {
        "speaker": "Email",
        "en": "I am a second-year computer science student at King Saud University.",
        "ar": "أنا طالب سنة ثانية علوم حاسب في جامعة الملك سعود."
      },
      {
        "speaker": "Email",
        "en": "Please find my CV attached. I would be grateful if you could consider my application.",
        "ar": "تجدون سيرتي مرفقة. أكون ممتناً لو نظرتم في طلبي."
      },
      {
        "speaker": "Email",
        "en": "I look forward to hearing from you. Kind regards, Abdullah Alotaibi",
        "ar": "أتطلع لردكم. مع التحية، عبدالله العتيبي"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Email: Subject: Application for Summer Internship – IT Department\nEmail: Dear Ms Alshehri,\nEmail: I am writing to apply for the summer internship advertised on your website.\nEmail: I am a second-year computer science student at King Saud University.\nEmail: Please find my CV attached. I would be grateful if you could consider my application.\nEmail: I look forward to hearing from you. Kind regards, Abdullah Alotaibi",
      "questions": [
        {
          "questionAr": "يقدم على؟",
          "questionEn": "What is he applying for?",
          "options": [
            "a job",
            "a summer internship",
            "a scholarship"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: a summer internship"
        },
        {
          "questionAr": "وين شافه؟",
          "questionEn": "Where did he see it?",
          "options": [
            "LinkedIn",
            "the website",
            "a friend"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: the website"
        },
        {
          "questionAr": "وش المرفق؟",
          "questionEn": "What is attached?",
          "options": [
            "a photo",
            "his CV",
            "a certificate"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: his CV"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Formal phrases rhythm",
      "items": [
        "I am WRIting to...",
        "I look FORward to HEARing from you."
      ],
      "tipAr": "اقرأ إيميلك بصوت قبل الإرسال؛ إذا تنفست بنص الجملة فهي طويلة."
    },
    "exercises": {
      "easy": [
        {
          "id": "scw_403_e1",
          "type": "meaning",
          "promptEn": "What does \"subject line\" mean?",
          "promptAr": "ما معنى \"subject line\"؟",
          "options": [
            "بإخلاص",
            "سطر الموضوع",
            "بخصوص",
            "استفسار"
          ],
          "correctIndex": 1,
          "answer": "سطر الموضوع",
          "explanationAr": "\"subject line\" /ˈsʌbdʒɪkt laɪn/ تعني: سطر الموضوع. مثال: a clear subject line"
        },
        {
          "id": "scw_403_e2",
          "type": "meaning",
          "promptEn": "What does \"apply for\" mean?",
          "promptAr": "ما معنى \"apply for\"؟",
          "options": [
            "يقدّم على",
            "ممتن",
            "مرفق",
            "استفسار"
          ],
          "correctIndex": 0,
          "answer": "يقدّم على",
          "explanationAr": "\"apply for\" /əˈplaɪ fɔːr/ تعني: يقدّم على. مثال: apply for a job"
        },
        {
          "id": "scw_403_e3",
          "type": "meaning",
          "promptEn": "What does \"internship\" mean?",
          "promptAr": "ما معنى \"internship\"؟",
          "options": [
            "سيرة ذاتية",
            "مرفق",
            "بإخلاص",
            "تدريب"
          ],
          "correctIndex": 3,
          "answer": "تدريب",
          "explanationAr": "\"internship\" /ˈɪntɜːrnʃɪp/ تعني: تدريب. مثال: a summer internship"
        },
        {
          "id": "scw_403_e4",
          "type": "meaning",
          "promptEn": "What does \"attached\" mean?",
          "promptAr": "ما معنى \"attached\"؟",
          "options": [
            "مرفق",
            "يتطلع لـ",
            "ممتن",
            "بخصوص"
          ],
          "correctIndex": 0,
          "answer": "مرفق",
          "explanationAr": "\"attached\" /əˈtætʃt/ تعني: مرفق. مثال: the attached file"
        }
      ],
      "medium": [
        {
          "id": "scw_403_m1",
          "type": "gap",
          "promptEn": "Complete: I am ____ to apply for the summer internship.",
          "promptAr": "أكمل الفراغ: (أكتب لك للتقديم على التدريب الصيفي.)",
          "options": [
            "writing",
            "wrote",
            "write"
          ],
          "correctIndex": 0,
          "answer": "I am writing to apply for the summer internship.",
          "explanationAr": "الإجابة: writing. Subject: واضح ومختصر. Dear Mr/Ms + اسم العائلة (أو Dear Sir/Madam). الفقرة ١: I am writing to + الغرض. الفقرة ٢: التفاصيل. الفقرة ٣: الطلب (I would be grateful if you could...). الختام: I look forward to hearing from you. Kind regards / Yours sincerely + الاسم الكامل."
        },
        {
          "id": "scw_403_m2",
          "type": "gap",
          "promptEn": "Complete: I would be ____ if you could send me more information.",
          "promptAr": "أكمل الفراغ: (أكون ممتناً لو أرسلت لي معلومات أكثر.)",
          "options": [
            "great",
            "thankful to",
            "grateful"
          ],
          "correctIndex": 2,
          "answer": "I would be grateful if you could send me more information.",
          "explanationAr": "الإجابة: grateful. Subject: واضح ومختصر. Dear Mr/Ms + اسم العائلة (أو Dear Sir/Madam). الفقرة ١: I am writing to + الغرض. الفقرة ٢: التفاصيل. الفقرة ٣: الطلب (I would be grateful if you could...). الختام: I look forward to hearing from you. Kind regards / Yours sincerely + الاسم الكامل."
        },
        {
          "id": "scw_403_m3",
          "type": "gap",
          "promptEn": "Complete: Please find my CV ____.",
          "promptAr": "أكمل الفراغ: (تجد سيرتي الذاتية مرفقة.)",
          "options": [
            "attach",
            "attaching",
            "attached"
          ],
          "correctIndex": 2,
          "answer": "Please find my CV attached.",
          "explanationAr": "الإجابة: attached. Subject: واضح ومختصر. Dear Mr/Ms + اسم العائلة (أو Dear Sir/Madam). الفقرة ١: I am writing to + الغرض. الفقرة ٢: التفاصيل. الفقرة ٣: الطلب (I would be grateful if you could...). الختام: I look forward to hearing from you. Kind regards / Yours sincerely + الاسم الكامل."
        },
        {
          "id": "scw_403_m4",
          "type": "gap",
          "promptEn": "Complete: I look forward to ____ from you.",
          "promptAr": "أكمل الفراغ: (أتطلع لردكم.)",
          "options": [
            "heard",
            "hearing",
            "hear"
          ],
          "correctIndex": 1,
          "answer": "I look forward to hearing from you.",
          "explanationAr": "الإجابة: hearing. Subject: واضح ومختصر. Dear Mr/Ms + اسم العائلة (أو Dear Sir/Madam). الفقرة ١: I am writing to + الغرض. الفقرة ٢: التفاصيل. الفقرة ٣: الطلب (I would be grateful if you could...). الختام: I look forward to hearing from you. Kind regards / Yours sincerely + الاسم الكامل."
        }
      ],
      "hard": [
        {
          "id": "scw_403_h1",
          "type": "order",
          "promptEn": "Put the words in order: Application / for / Subject: / Summer / Internship",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (الموضوع: طلب تدريب صيفي)",
          "answer": "Subject: Application for Summer Internship",
          "explanationAr": "الترتيب الصحيح: Subject: Application for Summer Internship"
        },
        {
          "id": "scw_403_h2",
          "type": "order",
          "promptEn": "Put the words in order: Abdullah / sincerely, / Yours / Alotaibi",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (وتفضلوا بقبول فائق الاحترام، عبدالله العتيبي)",
          "answer": "Yours sincerely, Abdullah Alotaibi",
          "explanationAr": "الترتيب الصحيح: Yours sincerely, Abdullah Alotaibi"
        },
        {
          "id": "scw_403_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أكون ممتناً لو أرسلت لي معلومات أكثر.",
          "answer": "I would be grateful if you could send me more information.",
          "explanationAr": "ترجمة مقترحة: I would be grateful if you could send me more information."
        },
        {
          "id": "scw_403_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أتطلع لردكم.",
          "answer": "I look forward to hearing from you.",
          "explanationAr": "ترجمة مقترحة: I look forward to hearing from you."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Flowery Arabic-style openings: 'I hope this email finds you in the best health and happiness...'",
        "correct": "One short line or go straight to the purpose",
        "whyAr": "الرسمي الإنجليزي مباشر."
      },
      {
        "incorrect": "Using Yours faithfully with a name",
        "correct": "Yours sincerely (name known) / Yours faithfully (Dear Sir/Madam)",
        "whyAr": "قاعدة بريطانية مشهورة."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (الرسمي وغير الرسمي: النبرة واختصارات الرسائل): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Dear Saad, I would be grateful if you joined me for coffee.",
          "Hey Saad, fancy a coffee?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Hey Saad, fancy a coffee? — مع صديق: الرسمي زيادة يبين برود.",
        "fromLessonId": "scw_421_m"
      },
      {
        "questionAr": "مراجعة (كتابة تقييم مطعم أو تطبيق): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "The food was absolutely delicious.",
          "The food was very delicious."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: The food was absolutely delicious. — delicious قوية؛ نستخدم absolutely.",
        "fromLessonId": "scw_419"
      },
      {
        "questionAr": "مراجعة (أدوات الترتيب: first, then, after that, finally): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "First, boil the water.",
          "First, you must to boil the water."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: First, boil the water. — صيغة الأمر أبسط وأوضح.",
        "fromLessonId": "scw_416"
      },
      {
        "questionAr": "ما معنى \"Kind regards\"؟",
        "questionEn": "What does \"Kind regards\" mean?",
        "options": [
          "دعم",
          "يعني الكثير",
          "مع التحية",
          "هدية"
        ],
        "correctIndex": 2,
        "explanationAr": "\"Kind regards\" /kaɪnd rɪˈɡɑːrdz/ تعني: مع التحية. مثال: Kind regards, Ali",
        "fromLessonId": "scw_420"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (أكتب لك للتقديم على التدريب الصيفي.)",
          "questionEn": "Complete: I am ____ to apply for the summer internship.",
          "options": [
            "writing",
            "wrote",
            "write"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: writing. Subject: واضح ومختصر. Dear Mr/Ms + اسم العائلة (أو Dear Sir/Madam). الفقرة ١: I am writing to + الغرض. الفقرة ٢: التفاصيل. الفقرة ٣: الطلب (I would be grateful if you could...). الختام: I look forward to hearing from you. Kind regards / Yours sincerely + الاسم الكامل."
        },
        {
          "questionAr": "أكمل الفراغ: (أكون ممتناً لو أرسلت لي معلومات أكثر.)",
          "questionEn": "Complete: I would be ____ if you could send me more information.",
          "options": [
            "great",
            "thankful to",
            "grateful"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: grateful. Subject: واضح ومختصر. Dear Mr/Ms + اسم العائلة (أو Dear Sir/Madam). الفقرة ١: I am writing to + الغرض. الفقرة ٢: التفاصيل. الفقرة ٣: الطلب (I would be grateful if you could...). الختام: I look forward to hearing from you. Kind regards / Yours sincerely + الاسم الكامل."
        },
        {
          "questionAr": "أكمل: I look forward to ___ from you.",
          "questionEn": "Complete: I look forward to ___ from you.",
          "options": [
            "hear",
            "hearing",
            "heard"
          ],
          "correctIndex": 1,
          "explanationAr": "to + -ing."
        },
        {
          "questionAr": "أول جملة في الإيميل الرسمي غالباً:",
          "questionEn": "Typical first sentence:",
          "options": [
            "What's up?",
            "I am writing to...",
            "Hello friend"
          ],
          "correctIndex": 1,
          "explanationAr": "I am writing to..."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "I look forward to hearing from you.",
            "I look forward to hear from you."
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: I look forward to hearing from you. — to هنا حرف جر ⇐ -ing."
        }
      ]
    }
  },
  {
    "id": "scw_422",
    "pillarId": "writing",
    "pillarNameAr": "الكتابة التعبيرية الحوارية",
    "pillarNameEn": "Conversational Writing & Quick Messaging",
    "pillarIcon": "✍️",
    "level": "متوسط (Intermediate)",
    "levelCode": "B1-B2",
    "titleAr": "الأسئلة غير المباشرة في الاستفسار",
    "titleEn": "Polite Enquiries with Indirect Questions",
    "descAr": "اسأل بأدب رسمي: Could you tell me when... بدل When...?",
    "descEn": "Make polite enquiries using indirect questions.",
    "speakingGoalAr": "حوّل ٨ أسئلة مباشرة إلى غير مباشرة في إيميل.",
    "speakingGoalEn": "Turn eight direct questions into indirect ones in an email.",
    "keyPattern": {
      "ruleAr": "السؤال غير المباشر: Could you tell me / I was wondering / Do you know + كلمة السؤال + الفاعل + الفعل (ترتيب خبري، بدون do/does/did). نعم/لا ⇐ if/whether. مثال: When does it start? ⇐ Could you tell me when it starts?",
      "ruleEn": "Indirect: Could you tell me / I was wondering + wh-word/if + subject + verb (statement order, no do-support).",
      "formula": "Could you tell me + when/where/if + subject + verb?"
    },
    "practicalExamples": [
      {
        "en": "Could you tell me when the course starts?",
        "ar": "ممكن تقول لي متى تبدأ الدورة؟"
      },
      {
        "en": "I was wondering if there are any discounts.",
        "ar": "كنت أتساءل إذا فيه خصومات."
      },
      {
        "en": "Do you know where the office is?",
        "ar": "تعرف وين المكتب؟"
      },
      {
        "en": "Could you let me know how much it costs?",
        "ar": "ممكن تعلمني كم السعر؟"
      },
      {
        "en": "I would like to know whether parking is available.",
        "ar": "أبي أعرف إذا فيه مواقف."
      },
      {
        "en": "Could you tell me what documents I need?",
        "ar": "ممكن تقول لي وش الأوراق المطلوبة؟"
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Could you tell me when does it start?",
        "correct": "Could you tell me when it starts?",
        "whyAr": "لا تستخدم does في السؤال غير المباشر."
      },
      {
        "incorrect": "I wonder is it free?",
        "correct": "I wonder if it is free.",
        "whyAr": "نعم/لا ⇐ if + ترتيب خبري."
      },
      {
        "incorrect": "Do you know where is the bank?",
        "correct": "Do you know where the bank is?",
        "whyAr": "الفاعل قبل الفعل."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اكتب ٣ أسئلة غير مباشرة لفندق.",
      "promptEn": "Write three indirect questions to a hotel.",
      "saraQuestionAr": "اسأل عن السعر والإفطار والمواقف.",
      "saraQuestionEn": "Ask about price, breakfast and parking.",
      "recommendedResponseEn": "Could you tell me how much a double room costs per night? I was wondering if breakfast is included. Could you also let me know whether parking is available?"
    },
    "quiz": [
      {
        "questionAr": "الصحيح:",
        "questionEn": "Correct:",
        "options": [
          "Do you know what time it is?",
          "Do you know what time is it?",
          "Do you know what time does it?"
        ],
        "correctIndex": 0,
        "explanationAr": "ترتيب خبري."
      },
      {
        "questionAr": "أكمل: I was wondering ___ you could help.",
        "questionEn": "Complete: I was wondering ___ you could help.",
        "options": [
          "that",
          "if",
          "what"
        ],
        "correctIndex": 1,
        "explanationAr": "if."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Could you tell me when does it start?",
          "Could you tell me when it starts?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Could you tell me when it starts? — لا تستخدم does في السؤال غير المباشر."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I wonder is it free?",
          "I wonder if it is free."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I wonder if it is free. — نعم/لا ⇐ if + ترتيب خبري."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Do you know where the bank is?",
          "Do you know where is the bank?"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Do you know where the bank is? — الفاعل قبل الفعل."
      }
    ],
    "whiteboardNotes": {
      "title": "Polite Enquiries with Indirect Questions",
      "pointsAr": [
        "يكوّن أسئلة غير مباشرة.",
        "يستخدم if/whether.",
        "يكتب استفسار مهذب.",
        "السؤال غير المباشر: Could you tell me / I was wondering / Do you know + كلمة السؤال + الفاعل + الفعل (ترتيب خبري، بدون do/does/did). نعم/لا ⇐ if/whether. مثال: When does it start? ⇐ Could you tell me when it starts?"
      ],
      "pointsEn": [
        "Form indirect questions.",
        "Use if/whether.",
        "Write a polite enquiry.",
        "Indirect: Could you tell me / I was wondering + wh-word/if + subject + verb (statement order, no do-support)."
      ],
      "chalkHighlight": "Could you tell me + when/where/if + subject + verb?"
    },
    "unit": 5,
    "cefr": "B1",
    "objectivesAr": [
      "يكوّن أسئلة غير مباشرة.",
      "يستخدم if/whether.",
      "يكتب استفسار مهذب."
    ],
    "objectivesEn": [
      "Form indirect questions.",
      "Use if/whether.",
      "Write a polite enquiry."
    ],
    "vocabulary": [
      {
        "word": "wonder",
        "ipa": "/ˈwʌndər/",
        "ar": "يتساءل",
        "exampleEn": "I was wondering...",
        "exampleAr": "كنت أتساءل..."
      },
      {
        "word": "whether",
        "ipa": "/ˈwɛðər/",
        "ar": "إذا/ما إذا",
        "exampleEn": "whether it's open",
        "exampleAr": "إذا مفتوح"
      },
      {
        "word": "available",
        "ipa": "/əˈveɪləbəl/",
        "ar": "متاح",
        "exampleEn": "Is it available?",
        "exampleAr": "متوفر؟"
      },
      {
        "word": "fee",
        "ipa": "/fiː/",
        "ar": "رسوم",
        "exampleEn": "course fees",
        "exampleAr": "رسوم الدورة"
      },
      {
        "word": "discount",
        "ipa": "/ˈdɪskaʊnt/",
        "ar": "خصم",
        "exampleEn": "a student discount",
        "exampleAr": "خصم طلاب"
      },
      {
        "word": "requirement",
        "ipa": "/rɪˈkwaɪərmənt/",
        "ar": "متطلب",
        "exampleEn": "entry requirements",
        "exampleAr": "شروط القبول"
      },
      {
        "word": "deadline",
        "ipa": "/ˈdɛdlaɪn/",
        "ar": "آخر موعد",
        "exampleEn": "the deadline",
        "exampleAr": "آخر موعد"
      },
      {
        "word": "let me know",
        "ipa": "/lɛt mi noʊ/",
        "ar": "علمني",
        "exampleEn": "Let me know.",
        "exampleAr": "علمني."
      },
      {
        "word": "document",
        "ipa": "/ˈdɑːkjəmənt/",
        "ar": "مستند/ورقة",
        "exampleEn": "required documents",
        "exampleAr": "الأوراق المطلوبة"
      },
      {
        "word": "schedule",
        "ipa": "/ˈskɛdʒuːl/",
        "ar": "جدول",
        "exampleEn": "the class schedule",
        "exampleAr": "جدول الحصص"
      }
    ],
    "grammarFocus": {
      "ruleAr": "السؤال غير المباشر: Could you tell me / I was wondering / Do you know + كلمة السؤال + الفاعل + الفعل (ترتيب خبري، بدون do/does/did). نعم/لا ⇐ if/whether. مثال: When does it start? ⇐ Could you tell me when it starts?",
      "ruleEn": "Indirect: Could you tell me / I was wondering + wh-word/if + subject + verb (statement order, no do-support).",
      "formula": "Could you tell me + when/where/if + subject + verb?",
      "examples": [
        {
          "en": "Could you tell me when the course starts?",
          "ar": "ممكن تقول لي متى تبدأ الدورة؟"
        },
        {
          "en": "I was wondering if there are any discounts.",
          "ar": "كنت أتساءل إذا فيه خصومات."
        },
        {
          "en": "Do you know where the office is?",
          "ar": "تعرف وين المكتب؟"
        },
        {
          "en": "Could you let me know how much it costs?",
          "ar": "ممكن تعلمني كم السعر؟"
        },
        {
          "en": "I would like to know whether parking is available.",
          "ar": "أبي أعرف إذا فيه مواقف."
        },
        {
          "en": "Could you tell me what documents I need?",
          "ar": "ممكن تقول لي وش الأوراق المطلوبة؟"
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Make it indirect: 'Where is the exam?'",
        "ar": "حوّلها غير مباشرة."
      },
      {
        "speaker": "Student",
        "en": "Could you tell me where the exam is?",
        "ar": "ممكن تقول لي وين الاختبار؟"
      },
      {
        "speaker": "Sara",
        "en": "Good. 'Is there a discount?'",
        "ar": "حلو. فيه خصم؟"
      },
      {
        "speaker": "Student",
        "en": "I was wondering if there is a discount.",
        "ar": "كنت أتساءل إذا فيه خصم."
      },
      {
        "speaker": "Sara",
        "en": "'How much does it cost?'",
        "ar": "كم يكلف؟"
      },
      {
        "speaker": "Student",
        "en": "Could you let me know how much it costs?",
        "ar": "ممكن تعلمني كم يكلف؟"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Make it indirect: 'Where is the exam?'\nStudent: Could you tell me where the exam is?\nSara: Good. 'Is there a discount?'\nStudent: I was wondering if there is a discount.\nSara: 'How much does it cost?'\nStudent: Could you let me know how much it costs?",
      "questions": [
        {
          "questionAr": "تصير:",
          "questionEn": "'Where is the exam?' becomes:",
          "options": [
            "where is the exam",
            "where the exam is",
            "where does the exam"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: where the exam is"
        },
        {
          "questionAr": "نعم/لا تستخدم:",
          "questionEn": "Yes/no questions use:",
          "options": [
            "if",
            "what",
            "do"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: if"
        },
        {
          "questionAr": "does:",
          "questionEn": "'does' in indirect questions:",
          "options": [
            "stays",
            "disappears",
            "moves"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: disappears"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Polite falling tone",
      "items": [
        "Could you tell me when it starts? ↘"
      ],
      "tipAr": "السؤال غير المباشر غالباً نبرته نازلة ومهذبة."
    },
    "exercises": {
      "easy": [
        {
          "id": "scw_422_e1",
          "type": "meaning",
          "promptEn": "What does \"wonder\" mean?",
          "promptAr": "ما معنى \"wonder\"؟",
          "options": [
            "مستند/ورقة",
            "إذا/ما إذا",
            "يتساءل",
            "رسوم"
          ],
          "correctIndex": 2,
          "answer": "يتساءل",
          "explanationAr": "\"wonder\" /ˈwʌndər/ تعني: يتساءل. مثال: I was wondering..."
        },
        {
          "id": "scw_422_e2",
          "type": "meaning",
          "promptEn": "What does \"whether\" mean?",
          "promptAr": "ما معنى \"whether\"؟",
          "options": [
            "متطلب",
            "جدول",
            "إذا/ما إذا",
            "آخر موعد"
          ],
          "correctIndex": 2,
          "answer": "إذا/ما إذا",
          "explanationAr": "\"whether\" /ˈwɛðər/ تعني: إذا/ما إذا. مثال: whether it's open"
        },
        {
          "id": "scw_422_e3",
          "type": "meaning",
          "promptEn": "What does \"available\" mean?",
          "promptAr": "ما معنى \"available\"؟",
          "options": [
            "متاح",
            "إذا/ما إذا",
            "خصم",
            "آخر موعد"
          ],
          "correctIndex": 0,
          "answer": "متاح",
          "explanationAr": "\"available\" /əˈveɪləbəl/ تعني: متاح. مثال: Is it available?"
        },
        {
          "id": "scw_422_e4",
          "type": "meaning",
          "promptEn": "What does \"fee\" mean?",
          "promptAr": "ما معنى \"fee\"؟",
          "options": [
            "رسوم",
            "يتساءل",
            "علمني",
            "آخر موعد"
          ],
          "correctIndex": 0,
          "answer": "رسوم",
          "explanationAr": "\"fee\" /fiː/ تعني: رسوم. مثال: course fees"
        }
      ],
      "medium": [
        {
          "id": "scw_422_m1",
          "type": "gap",
          "promptEn": "Complete: Could you tell me when the course ____?",
          "promptAr": "أكمل الفراغ: (ممكن تقول لي متى تبدأ الدورة؟)",
          "options": [
            "starts",
            "does start",
            "start does"
          ],
          "correctIndex": 0,
          "answer": "Could you tell me when the course starts?",
          "explanationAr": "الإجابة: starts. السؤال غير المباشر: Could you tell me / I was wondering / Do you know + كلمة السؤال + الفاعل + الفعل (ترتيب خبري، بدون do/does/did). نعم/لا ⇐ if/whether. مثال: When does it start? ⇐ Could you tell me when it starts?"
        },
        {
          "id": "scw_422_m2",
          "type": "gap",
          "promptEn": "Complete: I was wondering ____ there are any discounts.",
          "promptAr": "أكمل الفراغ: (كنت أتساءل إذا فيه خصومات.)",
          "options": [
            "if",
            "do",
            "that"
          ],
          "correctIndex": 0,
          "answer": "I was wondering if there are any discounts.",
          "explanationAr": "الإجابة: if. السؤال غير المباشر: Could you tell me / I was wondering / Do you know + كلمة السؤال + الفاعل + الفعل (ترتيب خبري، بدون do/does/did). نعم/لا ⇐ if/whether. مثال: When does it start? ⇐ Could you tell me when it starts?"
        },
        {
          "id": "scw_422_m3",
          "type": "gap",
          "promptEn": "Complete: Do you know where the office ____?",
          "promptAr": "أكمل الفراغ: (تعرف وين المكتب؟)",
          "options": [
            "it is is",
            "is",
            "does"
          ],
          "correctIndex": 1,
          "answer": "Do you know where the office is?",
          "explanationAr": "الإجابة: is. السؤال غير المباشر: Could you tell me / I was wondering / Do you know + كلمة السؤال + الفاعل + الفعل (ترتيب خبري، بدون do/does/did). نعم/لا ⇐ if/whether. مثال: When does it start? ⇐ Could you tell me when it starts?"
        },
        {
          "id": "scw_422_m4",
          "type": "gap",
          "promptEn": "Complete: Could you let me know how much it ____?",
          "promptAr": "أكمل الفراغ: (ممكن تعلمني كم السعر؟)",
          "options": [
            "cost does",
            "does it cost",
            "costs"
          ],
          "correctIndex": 2,
          "answer": "Could you let me know how much it costs?",
          "explanationAr": "الإجابة: costs. السؤال غير المباشر: Could you tell me / I was wondering / Do you know + كلمة السؤال + الفاعل + الفعل (ترتيب خبري، بدون do/does/did). نعم/لا ⇐ if/whether. مثال: When does it start? ⇐ Could you tell me when it starts?"
        }
      ],
      "hard": [
        {
          "id": "scw_422_h1",
          "type": "order",
          "promptEn": "Put the words in order: parking / available. / like / is / know / would / whether / to / I",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (أبي أعرف إذا فيه مواقف.)",
          "answer": "I would like to know whether parking is available.",
          "explanationAr": "الترتيب الصحيح: I would like to know whether parking is available."
        },
        {
          "id": "scw_422_h2",
          "type": "order",
          "promptEn": "Put the words in order: documents / me / tell / I / Could / you / need? / what",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (ممكن تقول لي وش الأوراق المطلوبة؟)",
          "answer": "Could you tell me what documents I need?",
          "explanationAr": "الترتيب الصحيح: Could you tell me what documents I need?"
        },
        {
          "id": "scw_422_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: كنت أتساءل إذا فيه خصومات.",
          "answer": "I was wondering if there are any discounts.",
          "explanationAr": "ترجمة مقترحة: I was wondering if there are any discounts."
        },
        {
          "id": "scw_422_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: ممكن تعلمني كم السعر؟",
          "answer": "Could you let me know how much it costs?",
          "explanationAr": "ترجمة مقترحة: Could you let me know how much it costs?"
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Keeping question order after 'Could you tell me'",
        "correct": "Statement order: ...when it starts",
        "whyAr": "أكثر غلط عند العرب."
      },
      {
        "incorrect": "Too direct: 'Send me the price.'",
        "correct": "Could you let me know the price?",
        "whyAr": "المباشر يبان أمر."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (الإيميل الرسمي: الهيكل الكامل): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Dear Mr Alotaibi,",
          "Dear Mr Abdullah Alotaibi,"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Dear Mr Alotaibi, — Mr + اسم العائلة فقط.",
        "fromLessonId": "scw_403"
      },
      {
        "questionAr": "مراجعة (رسالة شكر): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Thank you for helping me.",
          "Thank you for help me."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Thank you for helping me. — for + -ing.",
        "fromLessonId": "scw_420"
      },
      {
        "questionAr": "مراجعة (كتابة قصة قصيرة بالماضي): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I walked when I was seeing him.",
          "I was walking when I saw him."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I was walking when I saw him. — الخلفية مستمرة، الحدث بسيط.",
        "fromLessonId": "scw_417"
      },
      {
        "questionAr": "ما معنى \"polite\"؟",
        "questionEn": "What does \"polite\" mean?",
        "options": [
          "على فكرة (by the way)",
          "بأسرع وقت",
          "نبرة",
          "مؤدب"
        ],
        "correctIndex": 3,
        "explanationAr": "\"polite\" /pəˈlaɪt/ تعني: مؤدب. مثال: be polite",
        "fromLessonId": "scw_421_m"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (ممكن تقول لي متى تبدأ الدورة؟)",
          "questionEn": "Complete: Could you tell me when the course ____?",
          "options": [
            "starts",
            "does start",
            "start does"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: starts. السؤال غير المباشر: Could you tell me / I was wondering / Do you know + كلمة السؤال + الفاعل + الفعل (ترتيب خبري، بدون do/does/did). نعم/لا ⇐ if/whether. مثال: When does it start? ⇐ Could you tell me when it starts?"
        },
        {
          "questionAr": "أكمل الفراغ: (كنت أتساءل إذا فيه خصومات.)",
          "questionEn": "Complete: I was wondering ____ there are any discounts.",
          "options": [
            "if",
            "do",
            "that"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: if. السؤال غير المباشر: Could you tell me / I was wondering / Do you know + كلمة السؤال + الفاعل + الفعل (ترتيب خبري، بدون do/does/did). نعم/لا ⇐ if/whether. مثال: When does it start? ⇐ Could you tell me when it starts?"
        },
        {
          "questionAr": "الصحيح:",
          "questionEn": "Correct:",
          "options": [
            "Do you know what time it is?",
            "Do you know what time is it?",
            "Do you know what time does it?"
          ],
          "correctIndex": 0,
          "explanationAr": "ترتيب خبري."
        },
        {
          "questionAr": "أكمل: I was wondering ___ you could help.",
          "questionEn": "Complete: I was wondering ___ you could help.",
          "options": [
            "that",
            "if",
            "what"
          ],
          "correctIndex": 1,
          "explanationAr": "if."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Could you tell me when does it start?",
            "Could you tell me when it starts?"
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: Could you tell me when it starts? — لا تستخدم does في السؤال غير المباشر."
        }
      ]
    }
  },
  {
    "id": "scw_423",
    "pillarId": "writing",
    "pillarNameAr": "الكتابة التعبيرية الحوارية",
    "pillarNameEn": "Conversational Writing & Quick Messaging",
    "pillarIcon": "✍️",
    "level": "متوسط (Intermediate)",
    "levelCode": "B1-B2",
    "titleAr": "فقرة رأي مدعومة بالأسباب",
    "titleEn": "Writing an Opinion Paragraph",
    "descAr": "عبّر عن رأيك بوضوح وادعمه بسببين ومثال.",
    "descEn": "State your opinion clearly with two reasons and an example.",
    "speakingGoalAr": "اكتب فقرة رأي من ١٢٠ كلمة.",
    "speakingGoalEn": "Write a 120-word opinion paragraph.",
    "keyPattern": {
      "ruleAr": "ابدأ بالرأي: In my opinion / I strongly believe that. الأسباب: Firstly, ... Secondly, ... For example, ... اختم: Therefore / For these reasons, I think... ممكن تعترف برأي مخالف: Some people think..., but...",
      "ruleEn": "Opinion → Firstly/Secondly + reasons → For example → Some people think..., but... → Therefore.",
      "formula": "In my opinion... Firstly... Secondly... For example... Therefore..."
    },
    "practicalExamples": [
      {
        "en": "In my opinion, students should learn coding at school.",
        "ar": "برأيي، لازم الطلاب يتعلمون البرمجة في المدرسة."
      },
      {
        "en": "Firstly, technology jobs are growing fast.",
        "ar": "أولاً، وظائف التقنية تنمو بسرعة."
      },
      {
        "en": "For example, many Saudi companies need programmers.",
        "ar": "مثلاً، شركات سعودية كثيرة تحتاج مبرمجين."
      },
      {
        "en": "Some people think it is too difficult, but it can be fun.",
        "ar": "بعض الناس يشوفونها صعبة، بس ممكن تكون ممتعة."
      },
      {
        "en": "Therefore, coding should be part of every school.",
        "ar": "لذلك، البرمجة لازم تكون في كل مدرسة."
      },
      {
        "en": "I strongly believe this will help our future.",
        "ar": "أؤمن بقوة إن هذا بيساعد مستقبلنا."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "In my opinion, I think...",
        "correct": "In my opinion, ... / I think...",
        "whyAr": "لا تجمعهم، نفس المعنى."
      },
      {
        "incorrect": "For example: like many companies",
        "correct": "For example, many companies...",
        "whyAr": "لا تجمع for example مع like."
      },
      {
        "incorrect": "According to me",
        "correct": "In my view / In my opinion",
        "whyAr": "According to me غير طبيعية."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اكتب رأيك: هل الجوالات لازم تمنع في المدارس؟",
      "promptEn": "Should phones be banned at school? Give your opinion.",
      "saraQuestionAr": "اكتب فقرة رأي كاملة.",
      "saraQuestionEn": "Write a full opinion paragraph.",
      "recommendedResponseEn": "In my opinion, phones should not be completely banned at school. Firstly, students can use them to research and check dictionaries. Secondly, parents need to contact their children in emergencies. Some people think phones are distracting, but schools can set clear rules. Therefore, I believe phones should be allowed only for learning."
    },
    "quiz": [
      {
        "questionAr": "بداية فقرة رأي:",
        "questionEn": "Opinion opener:",
        "options": [
          "According to me",
          "In my opinion,",
          "Me, I think"
        ],
        "correctIndex": 1,
        "explanationAr": "In my opinion."
      },
      {
        "questionAr": "أداة النتيجة:",
        "questionEn": "Result linker:",
        "options": [
          "However",
          "Therefore",
          "For example"
        ],
        "correctIndex": 1,
        "explanationAr": "Therefore."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "In my opinion, I think...",
          "In my opinion, ... / I think..."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: In my opinion, ... / I think... — لا تجمعهم، نفس المعنى."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "For example: like many companies",
          "For example, many companies..."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: For example, many companies... — لا تجمع for example مع like."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "In my view / In my opinion",
          "According to me"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: In my view / In my opinion — According to me غير طبيعية."
      }
    ],
    "whiteboardNotes": {
      "title": "Writing an Opinion Paragraph",
      "pointsAr": [
        "يعبر عن رأيه بوضوح.",
        "يدعم بأسباب وأمثلة.",
        "يرد على الرأي المخالف.",
        "ابدأ بالرأي: In my opinion / I strongly believe that. الأسباب: Firstly, ... Secondly, ... For example, ... اختم: Therefore / For these reasons, I think... ممكن تعترف برأي مخالف: Some people think..., but..."
      ],
      "pointsEn": [
        "State an opinion clearly.",
        "Support with reasons and examples.",
        "Address the opposing view.",
        "Opinion → Firstly/Secondly + reasons → For example → Some people think..., but... → Therefore."
      ],
      "chalkHighlight": "In my opinion... Firstly... Secondly... For example... Therefore..."
    },
    "unit": 5,
    "cefr": "B1",
    "objectivesAr": [
      "يعبر عن رأيه بوضوح.",
      "يدعم بأسباب وأمثلة.",
      "يرد على الرأي المخالف."
    ],
    "objectivesEn": [
      "State an opinion clearly.",
      "Support with reasons and examples.",
      "Address the opposing view."
    ],
    "vocabulary": [
      {
        "word": "opinion",
        "ipa": "/əˈpɪnjən/",
        "ar": "رأي",
        "exampleEn": "in my opinion",
        "exampleAr": "برأيي"
      },
      {
        "word": "believe",
        "ipa": "/bɪˈliːv/",
        "ar": "يعتقد/يؤمن",
        "exampleEn": "I believe that...",
        "exampleAr": "أعتقد إن..."
      },
      {
        "word": "firstly",
        "ipa": "/ˈfɜːrstli/",
        "ar": "أولاً",
        "exampleEn": "Firstly, ...",
        "exampleAr": "أولاً، ..."
      },
      {
        "word": "secondly",
        "ipa": "/ˈsɛkəndli/",
        "ar": "ثانياً",
        "exampleEn": "Secondly, ...",
        "exampleAr": "ثانياً، ..."
      },
      {
        "word": "therefore",
        "ipa": "/ˈðɛrfɔːr/",
        "ar": "لذلك",
        "exampleEn": "Therefore, ...",
        "exampleAr": "لذلك، ..."
      },
      {
        "word": "benefit",
        "ipa": "/ˈbɛnɪfɪt/",
        "ar": "فائدة",
        "exampleEn": "many benefits",
        "exampleAr": "فوائد كثيرة"
      },
      {
        "word": "disadvantage",
        "ipa": "/ˌdɪsədˈvæntɪdʒ/",
        "ar": "عيب",
        "exampleEn": "one disadvantage",
        "exampleAr": "عيب واحد"
      },
      {
        "word": "argue",
        "ipa": "/ˈɑːrɡjuː/",
        "ar": "يجادل/يرى",
        "exampleEn": "Some argue that...",
        "exampleAr": "البعض يرى إن..."
      },
      {
        "word": "essential",
        "ipa": "/ɪˈsɛnʃəl/",
        "ar": "ضروري",
        "exampleEn": "an essential skill",
        "exampleAr": "مهارة ضرورية"
      },
      {
        "word": "skill",
        "ipa": "/skɪl/",
        "ar": "مهارة",
        "exampleEn": "a useful skill",
        "exampleAr": "مهارة مفيدة"
      }
    ],
    "grammarFocus": {
      "ruleAr": "ابدأ بالرأي: In my opinion / I strongly believe that. الأسباب: Firstly, ... Secondly, ... For example, ... اختم: Therefore / For these reasons, I think... ممكن تعترف برأي مخالف: Some people think..., but...",
      "ruleEn": "Opinion → Firstly/Secondly + reasons → For example → Some people think..., but... → Therefore.",
      "formula": "In my opinion... Firstly... Secondly... For example... Therefore...",
      "examples": [
        {
          "en": "In my opinion, students should learn coding at school.",
          "ar": "برأيي، لازم الطلاب يتعلمون البرمجة في المدرسة."
        },
        {
          "en": "Firstly, technology jobs are growing fast.",
          "ar": "أولاً، وظائف التقنية تنمو بسرعة."
        },
        {
          "en": "For example, many Saudi companies need programmers.",
          "ar": "مثلاً، شركات سعودية كثيرة تحتاج مبرمجين."
        },
        {
          "en": "Some people think it is too difficult, but it can be fun.",
          "ar": "بعض الناس يشوفونها صعبة، بس ممكن تكون ممتعة."
        },
        {
          "en": "Therefore, coding should be part of every school.",
          "ar": "لذلك، البرمجة لازم تكون في كل مدرسة."
        },
        {
          "en": "I strongly believe this will help our future.",
          "ar": "أؤمن بقوة إن هذا بيساعد مستقبلنا."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Do you think homework should be banned?",
        "ar": "تعتقد الواجبات لازم تنلغي؟"
      },
      {
        "speaker": "Student",
        "en": "In my opinion, homework is useful, but there's too much.",
        "ar": "برأيي الواجب مفيد بس كثير."
      },
      {
        "speaker": "Sara",
        "en": "Give me a reason.",
        "ar": "عطني سبب."
      },
      {
        "speaker": "Student",
        "en": "Firstly, it helps us practise. Secondly, we need time for family.",
        "ar": "أولاً يساعدنا نتدرب. ثانياً نحتاج وقت للعائلة."
      },
      {
        "speaker": "Sara",
        "en": "Example?",
        "ar": "مثال؟"
      },
      {
        "speaker": "Student",
        "en": "For example, I study three hours every night. Therefore, I think one hour is enough.",
        "ar": "مثلاً أذاكر ثلاث ساعات كل ليلة. لذلك ساعة تكفي."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Do you think homework should be banned?\nStudent: In my opinion, homework is useful, but there's too much.\nSara: Give me a reason.\nStudent: Firstly, it helps us practise. Secondly, we need time for family.\nSara: Example?\nStudent: For example, I study three hours every night. Therefore, I think one hour is enough.",
      "questions": [
        {
          "questionAr": "رأيه:",
          "questionEn": "His view on homework:",
          "options": [
            "ban it",
            "useful but too much",
            "more homework"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: useful but too much"
        },
        {
          "questionAr": "السبب الثاني:",
          "questionEn": "Second reason:",
          "options": [
            "practice",
            "family time",
            "sleep"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: family time"
        },
        {
          "questionAr": "يقترح:",
          "questionEn": "What does he suggest?",
          "options": [
            "no homework",
            "one hour",
            "three hours"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: one hour"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Stressing opinion words",
      "items": [
        "I STRONGly believe...",
        "In MY opinion..."
      ],
      "tipAr": "التأكيد على الكلمة يبين قوة الرأي."
    },
    "exercises": {
      "easy": [
        {
          "id": "scw_423_e1",
          "type": "meaning",
          "promptEn": "What does \"opinion\" mean?",
          "promptAr": "ما معنى \"opinion\"؟",
          "options": [
            "لذلك",
            "ثانياً",
            "أولاً",
            "رأي"
          ],
          "correctIndex": 3,
          "answer": "رأي",
          "explanationAr": "\"opinion\" /əˈpɪnjən/ تعني: رأي. مثال: in my opinion"
        },
        {
          "id": "scw_423_e2",
          "type": "meaning",
          "promptEn": "What does \"believe\" mean?",
          "promptAr": "ما معنى \"believe\"؟",
          "options": [
            "يعتقد/يؤمن",
            "لذلك",
            "رأي",
            "أولاً"
          ],
          "correctIndex": 0,
          "answer": "يعتقد/يؤمن",
          "explanationAr": "\"believe\" /bɪˈliːv/ تعني: يعتقد/يؤمن. مثال: I believe that..."
        },
        {
          "id": "scw_423_e3",
          "type": "meaning",
          "promptEn": "What does \"firstly\" mean?",
          "promptAr": "ما معنى \"firstly\"؟",
          "options": [
            "لذلك",
            "أولاً",
            "يعتقد/يؤمن",
            "عيب"
          ],
          "correctIndex": 1,
          "answer": "أولاً",
          "explanationAr": "\"firstly\" /ˈfɜːrstli/ تعني: أولاً. مثال: Firstly, ..."
        },
        {
          "id": "scw_423_e4",
          "type": "meaning",
          "promptEn": "What does \"secondly\" mean?",
          "promptAr": "ما معنى \"secondly\"؟",
          "options": [
            "ضروري",
            "ثانياً",
            "يجادل/يرى",
            "يعتقد/يؤمن"
          ],
          "correctIndex": 1,
          "answer": "ثانياً",
          "explanationAr": "\"secondly\" /ˈsɛkəndli/ تعني: ثانياً. مثال: Secondly, ..."
        }
      ],
      "medium": [
        {
          "id": "scw_423_m1",
          "type": "gap",
          "promptEn": "Complete: In my ____, students should learn coding at school.",
          "promptAr": "أكمل الفراغ: (برأيي، لازم الطلاب يتعلمون البرمجة في المدرسة.)",
          "options": [
            "opinon",
            "opinion",
            "opinions"
          ],
          "correctIndex": 1,
          "answer": "In my opinion, students should learn coding at school.",
          "explanationAr": "الإجابة: opinion. ابدأ بالرأي: In my opinion / I strongly believe that. الأسباب: Firstly, ... Secondly, ... For example, ... اختم: Therefore / For these reasons, I think... ممكن تعترف برأي مخالف: Some people think..., but..."
        },
        {
          "id": "scw_423_m2",
          "type": "gap",
          "promptEn": "Complete: ____, technology jobs are growing fast.",
          "promptAr": "أكمل الفراغ: (أولاً، وظائف التقنية تنمو بسرعة.)",
          "options": [
            "First of",
            "Lastly",
            "Firstly"
          ],
          "correctIndex": 2,
          "answer": "Firstly, technology jobs are growing fast.",
          "explanationAr": "الإجابة: Firstly. ابدأ بالرأي: In my opinion / I strongly believe that. الأسباب: Firstly, ... Secondly, ... For example, ... اختم: Therefore / For these reasons, I think... ممكن تعترف برأي مخالف: Some people think..., but..."
        },
        {
          "id": "scw_423_m3",
          "type": "gap",
          "promptEn": "Complete: ____, many Saudi companies need programmers.",
          "promptAr": "أكمل الفراغ: (مثلاً، شركات سعودية كثيرة تحتاج مبرمجين.)",
          "options": [
            "Example",
            "For example",
            "As example"
          ],
          "correctIndex": 1,
          "answer": "For example, many Saudi companies need programmers.",
          "explanationAr": "الإجابة: For example. ابدأ بالرأي: In my opinion / I strongly believe that. الأسباب: Firstly, ... Secondly, ... For example, ... اختم: Therefore / For these reasons, I think... ممكن تعترف برأي مخالف: Some people think..., but..."
        },
        {
          "id": "scw_423_m4",
          "type": "gap",
          "promptEn": "Complete: Some people think it is too difficult, ____ it can be fun.",
          "promptAr": "أكمل الفراغ: (بعض الناس يشوفونها صعبة، بس ممكن تكون ممتعة.)",
          "options": [
            "and",
            "but",
            "so"
          ],
          "correctIndex": 1,
          "answer": "Some people think it is too difficult, but it can be fun.",
          "explanationAr": "الإجابة: but. ابدأ بالرأي: In my opinion / I strongly believe that. الأسباب: Firstly, ... Secondly, ... For example, ... اختم: Therefore / For these reasons, I think... ممكن تعترف برأي مخالف: Some people think..., but..."
        }
      ],
      "hard": [
        {
          "id": "scw_423_h1",
          "type": "order",
          "promptEn": "Put the words in order: Therefore, / of / every / be / coding / part / school. / should",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (لذلك، البرمجة لازم تكون في كل مدرسة.)",
          "answer": "Therefore, coding should be part of every school.",
          "explanationAr": "الترتيب الصحيح: Therefore, coding should be part of every school."
        },
        {
          "id": "scw_423_h2",
          "type": "order",
          "promptEn": "Put the words in order: will / I / this / strongly / help / future. / believe / our",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (أؤمن بقوة إن هذا بيساعد مستقبلنا.)",
          "answer": "I strongly believe this will help our future.",
          "explanationAr": "الترتيب الصحيح: I strongly believe this will help our future."
        },
        {
          "id": "scw_423_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أولاً، وظائف التقنية تنمو بسرعة.",
          "answer": "Firstly, technology jobs are growing fast.",
          "explanationAr": "ترجمة مقترحة: Firstly, technology jobs are growing fast."
        },
        {
          "id": "scw_423_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: بعض الناس يشوفونها صعبة، بس ممكن تكون ممتعة.",
          "answer": "Some people think it is too difficult, but it can be fun.",
          "explanationAr": "ترجمة مقترحة: Some people think it is too difficult, but it can be fun."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Long introduction before the opinion",
        "correct": "State your opinion in sentence one",
        "whyAr": "القارئ الإنجليزي يبي الرأي أول."
      },
      {
        "incorrect": "Reasons with no examples",
        "correct": "Add 'For example, ...'",
        "whyAr": "المثال يقنع."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (الأسئلة غير المباشرة في الاستفسار): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I wonder if it is free.",
          "I wonder is it free?"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I wonder if it is free. — نعم/لا ⇐ if + ترتيب خبري.",
        "fromLessonId": "scw_422"
      },
      {
        "questionAr": "مراجعة (الرسمي وغير الرسمي: النبرة واختصارات الرسائل): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Hey Dr Ahmed, can u send the slides?",
          "Dear Dr Ahmed, could you please send the slides?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Dear Dr Ahmed, could you please send the slides? — مع الدكتور: رسمي بدون u.",
        "fromLessonId": "scw_421_m"
      },
      {
        "questionAr": "مراجعة (وصف الطريق كتابياً): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Go straightly.",
          "Go straight."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Go straight. — straight بدون ly.",
        "fromLessonId": "scw_418"
      },
      {
        "questionAr": "ما معنى \"CV\"؟",
        "questionEn": "What does \"CV\" mean?",
        "options": [
          "ممتن",
          "تدريب",
          "سيرة ذاتية",
          "بإخلاص"
        ],
        "correctIndex": 2,
        "explanationAr": "\"CV\" /ˌsiː ˈviː/ تعني: سيرة ذاتية. مثال: update your CV",
        "fromLessonId": "scw_403"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (برأيي، لازم الطلاب يتعلمون البرمجة في المدرسة.)",
          "questionEn": "Complete: In my ____, students should learn coding at school.",
          "options": [
            "opinon",
            "opinion",
            "opinions"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: opinion. ابدأ بالرأي: In my opinion / I strongly believe that. الأسباب: Firstly, ... Secondly, ... For example, ... اختم: Therefore / For these reasons, I think... ممكن تعترف برأي مخالف: Some people think..., but..."
        },
        {
          "questionAr": "أكمل الفراغ: (أولاً، وظائف التقنية تنمو بسرعة.)",
          "questionEn": "Complete: ____, technology jobs are growing fast.",
          "options": [
            "First of",
            "Lastly",
            "Firstly"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: Firstly. ابدأ بالرأي: In my opinion / I strongly believe that. الأسباب: Firstly, ... Secondly, ... For example, ... اختم: Therefore / For these reasons, I think... ممكن تعترف برأي مخالف: Some people think..., but..."
        },
        {
          "questionAr": "بداية فقرة رأي:",
          "questionEn": "Opinion opener:",
          "options": [
            "According to me",
            "In my opinion,",
            "Me, I think"
          ],
          "correctIndex": 1,
          "explanationAr": "In my opinion."
        },
        {
          "questionAr": "أداة النتيجة:",
          "questionEn": "Result linker:",
          "options": [
            "However",
            "Therefore",
            "For example"
          ],
          "correctIndex": 1,
          "explanationAr": "Therefore."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "In my opinion, I think...",
            "In my opinion, ... / I think..."
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: In my opinion, ... / I think... — لا تجمعهم، نفس المعنى."
        }
      ]
    }
  },
  {
    "id": "scw_424",
    "pillarId": "writing",
    "pillarNameAr": "الكتابة التعبيرية الحوارية",
    "pillarNameEn": "Conversational Writing & Quick Messaging",
    "pillarIcon": "✍️",
    "level": "متوسط (Intermediate)",
    "levelCode": "B1-B2",
    "titleAr": "إيميل شكوى رسمي",
    "titleEn": "Writing a Formal Complaint Email",
    "descAr": "اشتكِ بأسلوب رسمي هادئ: المشكلة، التفاصيل، الأثر، والحل المطلوب.",
    "descEn": "Complain formally: problem, details, impact, desired solution.",
    "speakingGoalAr": "اكتب إيميل شكوى من ١٢٠ كلمة.",
    "speakingGoalEn": "Write a 120-word complaint email.",
    "keyPattern": {
      "ruleAr": "I am writing to complain about... ثم التفاصيل (التاريخ، رقم الطلب) بالماضي، ثم الأثر (As a result, ...)، ثم الطلب (I would like a full refund / I expect...). نبرة حازمة بدون إهانة.",
      "ruleEn": "I am writing to complain about... + dated details + As a result... + I would like / I expect...",
      "formula": "Complaint → Details (date, ref) → As a result → I would like... → I look forward to your prompt reply."
    },
    "practicalExamples": [
      {
        "en": "I am writing to complain about the service I received.",
        "ar": "أكتب لأشتكي من الخدمة اللي حصلت عليها."
      },
      {
        "en": "On 3 October, I ordered a laptop from your website.",
        "ar": "في ٣ أكتوبر طلبت لابتوب من موقعكم."
      },
      {
        "en": "Unfortunately, the screen was damaged.",
        "ar": "للأسف، الشاشة كانت مكسورة."
      },
      {
        "en": "As a result, I could not use it for my exams.",
        "ar": "ونتيجة لذلك ما قدرت أستخدمه لاختباراتي."
      },
      {
        "en": "I would like a full refund or a replacement.",
        "ar": "أطلب استرجاع كامل أو استبدال."
      },
      {
        "en": "I look forward to your prompt reply.",
        "ar": "أتطلع لردكم السريع."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "I am writing to complaint.",
        "correct": "I am writing to complain.",
        "whyAr": "complain فعل، complaint اسم."
      },
      {
        "incorrect": "Your company is terrible and dishonest!",
        "correct": "I am very disappointed with the service.",
        "whyAr": "الإهانة تضعف الشكوى."
      },
      {
        "incorrect": "I want my money back now.",
        "correct": "I would like a full refund.",
        "whyAr": "رسمي ومحدد."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اكتب شكوى عن رحلة طيران تأخرت ٥ ساعات.",
      "promptEn": "Complain about a five-hour flight delay.",
      "saraQuestionAr": "اكتب الإيميل كامل.",
      "saraQuestionEn": "Write the full email.",
      "recommendedResponseEn": "Subject: Complaint – Flight SV1234, 5-Hour Delay\nDear Sir/Madam,\nI am writing to complain about flight SV1234 from Riyadh to Dubai on 2 October. The flight was delayed by five hours, and passengers received no information or refreshments. As a result, I missed an important business meeting. I would like appropriate compensation for this delay.\nI look forward to your prompt reply.\nYours faithfully,\nMajed Alshammari"
    },
    "quiz": [
      {
        "questionAr": "الصحيح:",
        "questionEn": "Correct:",
        "options": [
          "I want to complaint.",
          "I am writing to complain.",
          "I complaint about."
        ],
        "correctIndex": 1,
        "explanationAr": "complain فعل."
      },
      {
        "questionAr": "أداة النتيجة:",
        "questionEn": "Result phrase:",
        "options": [
          "As a result,",
          "For example,",
          "Although,"
        ],
        "correctIndex": 0,
        "explanationAr": "As a result."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I am writing to complaint.",
          "I am writing to complain."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I am writing to complain. — complain فعل، complaint اسم."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Your company is terrible and dishonest!",
          "I am very disappointed with the service."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I am very disappointed with the service. — الإهانة تضعف الشكوى."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I want my money back now.",
          "I would like a full refund."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I would like a full refund. — رسمي ومحدد."
      }
    ],
    "whiteboardNotes": {
      "title": "Writing a Formal Complaint Email",
      "pointsAr": [
        "يكتب شكوى رسمية.",
        "يذكر تفاصيل دقيقة.",
        "يطلب حلاً محدداً.",
        "I am writing to complain about... ثم التفاصيل (التاريخ، رقم الطلب) بالماضي، ثم الأثر (As a result, ...)، ثم الطلب (I would like a full refund / I expect...). نبرة حازمة بدون إهانة."
      ],
      "pointsEn": [
        "Write a formal complaint.",
        "Give precise details.",
        "Request a specific solution.",
        "I am writing to complain about... + dated details + As a result... + I would like / I expect..."
      ],
      "chalkHighlight": "Complaint → Details (date, ref) → As a result → I would like... → I look forward to your prompt reply."
    },
    "unit": 5,
    "cefr": "B1",
    "objectivesAr": [
      "يكتب شكوى رسمية.",
      "يذكر تفاصيل دقيقة.",
      "يطلب حلاً محدداً."
    ],
    "objectivesEn": [
      "Write a formal complaint.",
      "Give precise details.",
      "Request a specific solution."
    ],
    "vocabulary": [
      {
        "word": "complain",
        "ipa": "/kəmˈpleɪn/",
        "ar": "يشتكي",
        "exampleEn": "complain about",
        "exampleAr": "يشتكي من"
      },
      {
        "word": "complaint",
        "ipa": "/kəmˈpleɪnt/",
        "ar": "شكوى",
        "exampleEn": "make a complaint",
        "exampleAr": "يقدم شكوى"
      },
      {
        "word": "damaged",
        "ipa": "/ˈdæmɪdʒd/",
        "ar": "تالف/مكسور",
        "exampleEn": "a damaged box",
        "exampleAr": "كرتون تالف"
      },
      {
        "word": "disappointed",
        "ipa": "/ˌdɪsəˈpɔɪntɪd/",
        "ar": "خايب ظنه",
        "exampleEn": "very disappointed",
        "exampleAr": "خاب ظني"
      },
      {
        "word": "unacceptable",
        "ipa": "/ˌʌnəkˈsɛptəbəl/",
        "ar": "غير مقبول",
        "exampleEn": "This is unacceptable.",
        "exampleAr": "هذا غير مقبول."
      },
      {
        "word": "refund",
        "ipa": "/ˈriːfʌnd/",
        "ar": "استرجاع",
        "exampleEn": "a full refund",
        "exampleAr": "استرجاع كامل"
      },
      {
        "word": "reference number",
        "ipa": "/ˈrɛfrəns ˌnʌmbər/",
        "ar": "رقم مرجعي",
        "exampleEn": "my reference number",
        "exampleAr": "رقمي المرجعي"
      },
      {
        "word": "prompt",
        "ipa": "/prɑːmpt/",
        "ar": "سريع",
        "exampleEn": "a prompt reply",
        "exampleAr": "رد سريع"
      },
      {
        "word": "unfortunately",
        "ipa": "/ʌnˈfɔːrtʃənətli/",
        "ar": "للأسف",
        "exampleEn": "Unfortunately, ...",
        "exampleAr": "للأسف، ..."
      },
      {
        "word": "compensation",
        "ipa": "/ˌkɑːmpɛnˈseɪʃən/",
        "ar": "تعويض",
        "exampleEn": "ask for compensation",
        "exampleAr": "يطلب تعويض"
      }
    ],
    "grammarFocus": {
      "ruleAr": "I am writing to complain about... ثم التفاصيل (التاريخ، رقم الطلب) بالماضي، ثم الأثر (As a result, ...)، ثم الطلب (I would like a full refund / I expect...). نبرة حازمة بدون إهانة.",
      "ruleEn": "I am writing to complain about... + dated details + As a result... + I would like / I expect...",
      "formula": "Complaint → Details (date, ref) → As a result → I would like... → I look forward to your prompt reply.",
      "examples": [
        {
          "en": "I am writing to complain about the service I received.",
          "ar": "أكتب لأشتكي من الخدمة اللي حصلت عليها."
        },
        {
          "en": "On 3 October, I ordered a laptop from your website.",
          "ar": "في ٣ أكتوبر طلبت لابتوب من موقعكم."
        },
        {
          "en": "Unfortunately, the screen was damaged.",
          "ar": "للأسف، الشاشة كانت مكسورة."
        },
        {
          "en": "As a result, I could not use it for my exams.",
          "ar": "ونتيجة لذلك ما قدرت أستخدمه لاختباراتي."
        },
        {
          "en": "I would like a full refund or a replacement.",
          "ar": "أطلب استرجاع كامل أو استبدال."
        },
        {
          "en": "I look forward to your prompt reply.",
          "ar": "أتطلع لردكم السريع."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Email",
        "en": "Subject: Complaint – Order #88214, Damaged Laptop",
        "ar": "الموضوع: شكوى – طلب ٨٨٢١٤، لابتوب تالف"
      },
      {
        "speaker": "Email",
        "en": "Dear Customer Service Manager,",
        "ar": "مدير خدمة العملاء المحترم،"
      },
      {
        "speaker": "Email",
        "en": "I am writing to complain about a laptop I ordered on 3 October.",
        "ar": "أكتب لأشتكي من لابتوب طلبته في ٣ أكتوبر."
      },
      {
        "speaker": "Email",
        "en": "When it arrived, the screen was cracked and it would not turn on.",
        "ar": "لما وصل، الشاشة مشروخة وما يشتغل."
      },
      {
        "speaker": "Email",
        "en": "I have contacted your call centre twice, but nobody has replied.",
        "ar": "تواصلت مع مركز الاتصال مرتين وما أحد رد."
      },
      {
        "speaker": "Email",
        "en": "I would like a replacement within seven days. Yours faithfully, Majed Alshammari",
        "ar": "أطلب استبدال خلال سبعة أيام. مع الاحترام، ماجد الشمري"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Email: Subject: Complaint – Order #88214, Damaged Laptop\nEmail: Dear Customer Service Manager,\nEmail: I am writing to complain about a laptop I ordered on 3 October.\nEmail: When it arrived, the screen was cracked and it would not turn on.\nEmail: I have contacted your call centre twice, but nobody has replied.\nEmail: I would like a replacement within seven days. Yours faithfully, Majed Alshammari",
      "questions": [
        {
          "questionAr": "وش المشكلة؟",
          "questionEn": "What was wrong?",
          "options": [
            "late",
            "cracked screen",
            "wrong colour"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: cracked screen"
        },
        {
          "questionAr": "كم مرة اتصل؟",
          "questionEn": "How many times did he call?",
          "options": [
            "once",
            "twice",
            "three times"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: twice"
        },
        {
          "questionAr": "يطلب:",
          "questionEn": "What does he want?",
          "options": [
            "refund",
            "replacement within 7 days",
            "discount"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: replacement within 7 days"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Firm but calm",
      "items": [
        "I am VERy disappointed.",
        "This is unacCEPTable."
      ],
      "tipAr": "اقرأها بصوت هادي؛ إذا بانت عصبية عدّل الكلمات."
    },
    "exercises": {
      "easy": [
        {
          "id": "scw_424_e1",
          "type": "meaning",
          "promptEn": "What does \"complain\" mean?",
          "promptAr": "ما معنى \"complain\"؟",
          "options": [
            "تالف/مكسور",
            "رقم مرجعي",
            "غير مقبول",
            "يشتكي"
          ],
          "correctIndex": 3,
          "answer": "يشتكي",
          "explanationAr": "\"complain\" /kəmˈpleɪn/ تعني: يشتكي. مثال: complain about"
        },
        {
          "id": "scw_424_e2",
          "type": "meaning",
          "promptEn": "What does \"complaint\" mean?",
          "promptAr": "ما معنى \"complaint\"؟",
          "options": [
            "رقم مرجعي",
            "سريع",
            "شكوى",
            "استرجاع"
          ],
          "correctIndex": 2,
          "answer": "شكوى",
          "explanationAr": "\"complaint\" /kəmˈpleɪnt/ تعني: شكوى. مثال: make a complaint"
        },
        {
          "id": "scw_424_e3",
          "type": "meaning",
          "promptEn": "What does \"damaged\" mean?",
          "promptAr": "ما معنى \"damaged\"؟",
          "options": [
            "تالف/مكسور",
            "يشتكي",
            "سريع",
            "استرجاع"
          ],
          "correctIndex": 0,
          "answer": "تالف/مكسور",
          "explanationAr": "\"damaged\" /ˈdæmɪdʒd/ تعني: تالف/مكسور. مثال: a damaged box"
        },
        {
          "id": "scw_424_e4",
          "type": "meaning",
          "promptEn": "What does \"disappointed\" mean?",
          "promptAr": "ما معنى \"disappointed\"؟",
          "options": [
            "سريع",
            "تالف/مكسور",
            "خايب ظنه",
            "تعويض"
          ],
          "correctIndex": 2,
          "answer": "خايب ظنه",
          "explanationAr": "\"disappointed\" /ˌdɪsəˈpɔɪntɪd/ تعني: خايب ظنه. مثال: very disappointed"
        }
      ],
      "medium": [
        {
          "id": "scw_424_m1",
          "type": "gap",
          "promptEn": "Complete: I am writing to ____ about the service I received.",
          "promptAr": "أكمل الفراغ: (أكتب لأشتكي من الخدمة اللي حصلت عليها.)",
          "options": [
            "complaining",
            "complaint",
            "complain"
          ],
          "correctIndex": 2,
          "answer": "I am writing to complain about the service I received.",
          "explanationAr": "الإجابة: complain. I am writing to complain about... ثم التفاصيل (التاريخ، رقم الطلب) بالماضي، ثم الأثر (As a result, ...)، ثم الطلب (I would like a full refund / I expect...). نبرة حازمة بدون إهانة."
        },
        {
          "id": "scw_424_m2",
          "type": "gap",
          "promptEn": "Complete: ____ 3 October, I ordered a laptop from your website.",
          "promptAr": "أكمل الفراغ: (في ٣ أكتوبر طلبت لابتوب من موقعكم.)",
          "options": [
            "In",
            "At",
            "On"
          ],
          "correctIndex": 2,
          "answer": "On 3 October, I ordered a laptop from your website.",
          "explanationAr": "الإجابة: On. I am writing to complain about... ثم التفاصيل (التاريخ، رقم الطلب) بالماضي، ثم الأثر (As a result, ...)، ثم الطلب (I would like a full refund / I expect...). نبرة حازمة بدون إهانة."
        },
        {
          "id": "scw_424_m3",
          "type": "gap",
          "promptEn": "Complete: ____, the screen was damaged.",
          "promptAr": "أكمل الفراغ: (للأسف، الشاشة كانت مكسورة.)",
          "options": [
            "Fortunately",
            "Unfortunately",
            "Unfortunate"
          ],
          "correctIndex": 1,
          "answer": "Unfortunately, the screen was damaged.",
          "explanationAr": "الإجابة: Unfortunately. I am writing to complain about... ثم التفاصيل (التاريخ، رقم الطلب) بالماضي، ثم الأثر (As a result, ...)، ثم الطلب (I would like a full refund / I expect...). نبرة حازمة بدون إهانة."
        },
        {
          "id": "scw_424_m4",
          "type": "gap",
          "promptEn": "Complete: ____, I could not use it for my exams.",
          "promptAr": "أكمل الفراغ: (ونتيجة لذلك ما قدرت أستخدمه لاختباراتي.)",
          "options": [
            "Although",
            "Because",
            "As a result"
          ],
          "correctIndex": 2,
          "answer": "As a result, I could not use it for my exams.",
          "explanationAr": "الإجابة: As a result. I am writing to complain about... ثم التفاصيل (التاريخ، رقم الطلب) بالماضي، ثم الأثر (As a result, ...)، ثم الطلب (I would like a full refund / I expect...). نبرة حازمة بدون إهانة."
        }
      ],
      "hard": [
        {
          "id": "scw_424_h1",
          "type": "order",
          "promptEn": "Put the words in order: I / would / full / like / or / a / refund / a / replacement.",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (أطلب استرجاع كامل أو استبدال.)",
          "answer": "I would like a full refund or a replacement.",
          "explanationAr": "الترتيب الصحيح: I would like a full refund or a replacement."
        },
        {
          "id": "scw_424_h2",
          "type": "order",
          "promptEn": "Put the words in order: to / look / your / forward / I / reply. / prompt",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (أتطلع لردكم السريع.)",
          "answer": "I look forward to your prompt reply.",
          "explanationAr": "الترتيب الصحيح: I look forward to your prompt reply."
        },
        {
          "id": "scw_424_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: في ٣ أكتوبر طلبت لابتوب من موقعكم.",
          "answer": "On 3 October, I ordered a laptop from your website.",
          "explanationAr": "ترجمة مقترحة: On 3 October, I ordered a laptop from your website."
        },
        {
          "id": "scw_424_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: ونتيجة لذلك ما قدرت أستخدمه لاختباراتي.",
          "answer": "As a result, I could not use it for my exams.",
          "explanationAr": "ترجمة مقترحة: As a result, I could not use it for my exams."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Emotional, accusing language",
        "correct": "Facts + calm firm tone",
        "whyAr": "الحقائق أقوى من الغضب."
      },
      {
        "incorrect": "No dates or order numbers",
        "correct": "Include all references",
        "whyAr": "تسرّع الحل."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (فقرة رأي مدعومة بالأسباب): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "For example, many companies...",
          "For example: like many companies"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: For example, many companies... — لا تجمع for example مع like.",
        "fromLessonId": "scw_423"
      },
      {
        "questionAr": "مراجعة (الإيميل الرسمي: الهيكل الكامل): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I look forward to hear from you.",
          "I look forward to hearing from you."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I look forward to hearing from you. — to هنا حرف جر ⇐ -ing.",
        "fromLessonId": "scw_403"
      },
      {
        "questionAr": "مراجعة (كتابة تقييم مطعم أو تطبيق): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "The food was very delicious.",
          "The food was absolutely delicious."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: The food was absolutely delicious. — delicious قوية؛ نستخدم absolutely.",
        "fromLessonId": "scw_419"
      },
      {
        "questionAr": "ما معنى \"schedule\"؟",
        "questionEn": "What does \"schedule\" mean?",
        "options": [
          "علمني",
          "متطلب",
          "يتساءل",
          "جدول"
        ],
        "correctIndex": 3,
        "explanationAr": "\"schedule\" /ˈskɛdʒuːl/ تعني: جدول. مثال: the class schedule",
        "fromLessonId": "scw_422"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (أكتب لأشتكي من الخدمة اللي حصلت عليها.)",
          "questionEn": "Complete: I am writing to ____ about the service I received.",
          "options": [
            "complaining",
            "complaint",
            "complain"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: complain. I am writing to complain about... ثم التفاصيل (التاريخ، رقم الطلب) بالماضي، ثم الأثر (As a result, ...)، ثم الطلب (I would like a full refund / I expect...). نبرة حازمة بدون إهانة."
        },
        {
          "questionAr": "أكمل الفراغ: (في ٣ أكتوبر طلبت لابتوب من موقعكم.)",
          "questionEn": "Complete: ____ 3 October, I ordered a laptop from your website.",
          "options": [
            "In",
            "At",
            "On"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: On. I am writing to complain about... ثم التفاصيل (التاريخ، رقم الطلب) بالماضي، ثم الأثر (As a result, ...)، ثم الطلب (I would like a full refund / I expect...). نبرة حازمة بدون إهانة."
        },
        {
          "questionAr": "الصحيح:",
          "questionEn": "Correct:",
          "options": [
            "I want to complaint.",
            "I am writing to complain.",
            "I complaint about."
          ],
          "correctIndex": 1,
          "explanationAr": "complain فعل."
        },
        {
          "questionAr": "أداة النتيجة:",
          "questionEn": "Result phrase:",
          "options": [
            "As a result,",
            "For example,",
            "Although,"
          ],
          "correctIndex": 0,
          "explanationAr": "As a result."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "I am writing to complaint.",
            "I am writing to complain."
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: I am writing to complain. — complain فعل، complaint اسم."
        }
      ]
    }
  },
  {
    "id": "scw_425",
    "pillarId": "writing",
    "pillarNameAr": "الكتابة التعبيرية الحوارية",
    "pillarNameEn": "Conversational Writing & Quick Messaging",
    "pillarIcon": "✍️",
    "level": "متوسط (Intermediate)",
    "levelCode": "B1-B2",
    "titleAr": "ترتيب المواعيد وتغييرها",
    "titleEn": "Arranging and Rescheduling Meetings",
    "descAr": "اقترح موعد، اعتذر وغيّره، وأكّد بأسلوب مهني.",
    "descEn": "Propose, reschedule and confirm meetings professionally.",
    "speakingGoalAr": "اكتب ٣ إيميلات قصيرة: اقتراح، تأجيل، تأكيد.",
    "speakingGoalEn": "Write three short emails: propose, reschedule, confirm.",
    "keyPattern": {
      "ruleAr": "اقتراح: Would Tuesday at 10 a.m. suit you? / Are you available on...? تأجيل: Unfortunately, something has come up. Could we move the meeting to...? تأكيد: I'm writing to confirm our meeting on...",
      "ruleEn": "Propose: Would X suit you? Reschedule: Something has come up. Could we move it to...? Confirm: I'm writing to confirm...",
      "formula": "Would + day/time + suit you? | Could we move it to...? | I'm writing to confirm..."
    },
    "practicalExamples": [
      {
        "en": "Would Tuesday at 10 a.m. suit you?",
        "ar": "يناسبك الثلاثاء الساعة ١٠ صباحاً؟"
      },
      {
        "en": "Unfortunately, something has come up.",
        "ar": "للأسف، طرأ شي."
      },
      {
        "en": "Could we move the meeting to Thursday?",
        "ar": "ممكن نأجل الاجتماع للخميس؟"
      },
      {
        "en": "I'm writing to confirm our meeting on Sunday.",
        "ar": "أكتب لتأكيد اجتماعنا يوم الأحد."
      },
      {
        "en": "I apologise for any inconvenience.",
        "ar": "أعتذر عن أي إزعاج."
      },
      {
        "en": "Please let me know what works best for you.",
        "ar": "علمني وش الأنسب لك."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Can we postpone the meeting to before?",
        "correct": "Can we bring the meeting forward?",
        "whyAr": "أقدم = bring forward، أأخر = postpone."
      },
      {
        "incorrect": "Is Tuesday suitable for you at 10?",
        "correct": "Would Tuesday at 10 suit you?",
        "whyAr": "الأسلوب الأشيع."
      },
      {
        "incorrect": "I want to cancel.",
        "correct": "Unfortunately, I need to cancel. I apologise for any inconvenience.",
        "whyAr": "اعتذر وبرر."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اكتب إيميل تأجيل لاجتماع مع معلمك.",
      "promptEn": "Write an email rescheduling a meeting with your teacher.",
      "saraQuestionAr": "اعتذر واقترح وقت جديد.",
      "saraQuestionEn": "Apologise and suggest a new time.",
      "recommendedResponseEn": "Dear Mr Hassan, Unfortunately, something has come up and I can't attend our meeting on Monday. Could we move it to Wednesday at 12? I apologise for any inconvenience. Kind regards, Reem"
    },
    "quiz": [
      {
        "questionAr": "نقدم الاجتماع لوقت أبكر:",
        "questionEn": "Make a meeting earlier:",
        "options": [
          "postpone",
          "bring forward",
          "cancel"
        ],
        "correctIndex": 1,
        "explanationAr": "bring forward."
      },
      {
        "questionAr": "أكمل: Would 3 p.m. ___ you?",
        "questionEn": "Complete: Would 3 p.m. ___ you?",
        "options": [
          "suit",
          "suits",
          "suiting"
        ],
        "correctIndex": 0,
        "explanationAr": "would + suit."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Can we postpone the meeting to before?",
          "Can we bring the meeting forward?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Can we bring the meeting forward? — أقدم = bring forward، أأخر = postpone."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Would Tuesday at 10 suit you?",
          "Is Tuesday suitable for you at 10?"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Would Tuesday at 10 suit you? — الأسلوب الأشيع."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I want to cancel.",
          "Unfortunately, I need to cancel. I apologise for any inconvenience."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Unfortunately, I need to cancel. I apologise for any inconvenience. — اعتذر وبرر."
      }
    ],
    "whiteboardNotes": {
      "title": "Arranging and Rescheduling Meetings",
      "pointsAr": [
        "يقترح موعد بأدب.",
        "يؤجل باحترافية.",
        "يؤكد الموعد.",
        "اقتراح: Would Tuesday at 10 a.m. suit you? / Are you available on...? تأجيل: Unfortunately, something has come up. Could we move the meeting to...? تأكيد: I'm writing to confirm our meeting on..."
      ],
      "pointsEn": [
        "Propose a time politely.",
        "Reschedule professionally.",
        "Confirm a meeting.",
        "Propose: Would X suit you? Reschedule: Something has come up. Could we move it to...? Confirm: I'm writing to confirm..."
      ],
      "chalkHighlight": "Would + day/time + suit you? | Could we move it to...? | I'm writing to confirm..."
    },
    "unit": 5,
    "cefr": "B1",
    "objectivesAr": [
      "يقترح موعد بأدب.",
      "يؤجل باحترافية.",
      "يؤكد الموعد."
    ],
    "objectivesEn": [
      "Propose a time politely.",
      "Reschedule professionally.",
      "Confirm a meeting."
    ],
    "vocabulary": [
      {
        "word": "suit",
        "ipa": "/suːt/",
        "ar": "يناسب",
        "exampleEn": "Does 3 p.m. suit you?",
        "exampleAr": "يناسبك ٣؟"
      },
      {
        "word": "available",
        "ipa": "/əˈveɪləbəl/",
        "ar": "متاح/فاضي",
        "exampleEn": "Are you available?",
        "exampleAr": "فاضي؟"
      },
      {
        "word": "reschedule",
        "ipa": "/ˌriːˈskɛdʒuːl/",
        "ar": "يغير الموعد",
        "exampleEn": "reschedule the call",
        "exampleAr": "يغير موعد المكالمة"
      },
      {
        "word": "postpone",
        "ipa": "/poʊstˈpoʊn/",
        "ar": "يؤجل",
        "exampleEn": "postpone the meeting",
        "exampleAr": "يأجل الاجتماع"
      },
      {
        "word": "bring forward",
        "ipa": "/brɪŋ ˈfɔːrwərd/",
        "ar": "يقدّم موعد",
        "exampleEn": "bring it forward",
        "exampleAr": "قدّمه"
      },
      {
        "word": "confirm",
        "ipa": "/kənˈfɜːrm/",
        "ar": "يؤكد",
        "exampleEn": "confirm the time",
        "exampleAr": "يأكد الوقت"
      },
      {
        "word": "inconvenience",
        "ipa": "/ˌɪnkənˈviːniəns/",
        "ar": "إزعاج",
        "exampleEn": "sorry for the inconvenience",
        "exampleAr": "آسف على الإزعاج"
      },
      {
        "word": "come up",
        "ipa": "/kʌm ʌp/",
        "ar": "يطرأ",
        "exampleEn": "Something came up.",
        "exampleAr": "طرأ شي."
      },
      {
        "word": "agenda",
        "ipa": "/əˈdʒɛndə/",
        "ar": "جدول أعمال",
        "exampleEn": "the meeting agenda",
        "exampleAr": "جدول الاجتماع"
      },
      {
        "word": "slot",
        "ipa": "/slɑːt/",
        "ar": "فترة/موعد متاح",
        "exampleEn": "a free slot",
        "exampleAr": "موعد فاضي"
      }
    ],
    "grammarFocus": {
      "ruleAr": "اقتراح: Would Tuesday at 10 a.m. suit you? / Are you available on...? تأجيل: Unfortunately, something has come up. Could we move the meeting to...? تأكيد: I'm writing to confirm our meeting on...",
      "ruleEn": "Propose: Would X suit you? Reschedule: Something has come up. Could we move it to...? Confirm: I'm writing to confirm...",
      "formula": "Would + day/time + suit you? | Could we move it to...? | I'm writing to confirm...",
      "examples": [
        {
          "en": "Would Tuesday at 10 a.m. suit you?",
          "ar": "يناسبك الثلاثاء الساعة ١٠ صباحاً؟"
        },
        {
          "en": "Unfortunately, something has come up.",
          "ar": "للأسف، طرأ شي."
        },
        {
          "en": "Could we move the meeting to Thursday?",
          "ar": "ممكن نأجل الاجتماع للخميس؟"
        },
        {
          "en": "I'm writing to confirm our meeting on Sunday.",
          "ar": "أكتب لتأكيد اجتماعنا يوم الأحد."
        },
        {
          "en": "I apologise for any inconvenience.",
          "ar": "أعتذر عن أي إزعاج."
        },
        {
          "en": "Please let me know what works best for you.",
          "ar": "علمني وش الأنسب لك."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Email 1",
        "en": "Dear Mr Nasser, Would Tuesday at 10 a.m. suit you for a short meeting?",
        "ar": "يناسبك الثلاثاء ١٠ صباحاً لاجتماع قصير؟"
      },
      {
        "speaker": "Email 2",
        "en": "Dear Faris, Unfortunately, something has come up on Tuesday.",
        "ar": "للأسف طرأ شي يوم الثلاثاء."
      },
      {
        "speaker": "Email 2",
        "en": "Could we move it to Wednesday at 11?",
        "ar": "نقدر نخليه الأربعاء ١١؟"
      },
      {
        "speaker": "Email 3",
        "en": "Wednesday at 11 is perfect.",
        "ar": "الأربعاء ١١ ممتاز."
      },
      {
        "speaker": "Email 3",
        "en": "I'm writing to confirm our meeting at your office.",
        "ar": "أكتب لتأكيد اجتماعنا في مكتبك."
      },
      {
        "speaker": "Email 3",
        "en": "I'll send the agenda tomorrow. Best regards, Faris",
        "ar": "برسل جدول الأعمال بكرة. تحياتي، فارس"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Email 1: Dear Mr Nasser, Would Tuesday at 10 a.m. suit you for a short meeting?\nEmail 2: Dear Faris, Unfortunately, something has come up on Tuesday.\nEmail 2: Could we move it to Wednesday at 11?\nEmail 3: Wednesday at 11 is perfect.\nEmail 3: I'm writing to confirm our meeting at your office.\nEmail 3: I'll send the agenda tomorrow. Best regards, Faris",
      "questions": [
        {
          "questionAr": "الموعد الأول:",
          "questionEn": "First proposed time:",
          "options": [
            "Tuesday 10",
            "Wednesday 11",
            "Thursday 9"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: Tuesday 10"
        },
        {
          "questionAr": "الموعد النهائي:",
          "questionEn": "Final time:",
          "options": [
            "Tuesday 10",
            "Wednesday 11",
            "Sunday 10"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: Wednesday 11"
        },
        {
          "questionAr": "وش بيرسل فارس؟",
          "questionEn": "What will Faris send?",
          "options": [
            "the agenda",
            "a contract",
            "a map"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: the agenda"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Professional rhythm",
      "items": [
        "Would TUESday SUIT you?",
        "reSCHEDule: /ˌriːˈskɛdʒuːl/ (US) /ˌriːˈʃɛdjuːl/ (UK)"
      ],
      "tipAr": "schedule لها نطقين صحيحين."
    },
    "exercises": {
      "easy": [
        {
          "id": "scw_425_e1",
          "type": "meaning",
          "promptEn": "What does \"suit\" mean?",
          "promptAr": "ما معنى \"suit\"؟",
          "options": [
            "جدول أعمال",
            "إزعاج",
            "يناسب",
            "يطرأ"
          ],
          "correctIndex": 2,
          "answer": "يناسب",
          "explanationAr": "\"suit\" /suːt/ تعني: يناسب. مثال: Does 3 p.m. suit you?"
        },
        {
          "id": "scw_425_e2",
          "type": "meaning",
          "promptEn": "What does \"available\" mean?",
          "promptAr": "ما معنى \"available\"؟",
          "options": [
            "فترة/موعد متاح",
            "يغير الموعد",
            "يؤجل",
            "متاح/فاضي"
          ],
          "correctIndex": 3,
          "answer": "متاح/فاضي",
          "explanationAr": "\"available\" /əˈveɪləbəl/ تعني: متاح/فاضي. مثال: Are you available?"
        },
        {
          "id": "scw_425_e3",
          "type": "meaning",
          "promptEn": "What does \"reschedule\" mean?",
          "promptAr": "ما معنى \"reschedule\"؟",
          "options": [
            "يؤجل",
            "متاح/فاضي",
            "إزعاج",
            "يغير الموعد"
          ],
          "correctIndex": 3,
          "answer": "يغير الموعد",
          "explanationAr": "\"reschedule\" /ˌriːˈskɛdʒuːl/ تعني: يغير الموعد. مثال: reschedule the call"
        },
        {
          "id": "scw_425_e4",
          "type": "meaning",
          "promptEn": "What does \"postpone\" mean?",
          "promptAr": "ما معنى \"postpone\"؟",
          "options": [
            "يؤجل",
            "يؤكد",
            "يقدّم موعد",
            "فترة/موعد متاح"
          ],
          "correctIndex": 0,
          "answer": "يؤجل",
          "explanationAr": "\"postpone\" /poʊstˈpoʊn/ تعني: يؤجل. مثال: postpone the meeting"
        }
      ],
      "medium": [
        {
          "id": "scw_425_m1",
          "type": "gap",
          "promptEn": "Complete: Would Tuesday at 10 a.m. ____ you?",
          "promptAr": "أكمل الفراغ: (يناسبك الثلاثاء الساعة ١٠ صباحاً؟)",
          "options": [
            "suit",
            "match",
            "fit you to"
          ],
          "correctIndex": 0,
          "answer": "Would Tuesday at 10 a.m. suit you?",
          "explanationAr": "الإجابة: suit. اقتراح: Would Tuesday at 10 a.m. suit you? / Are you available on...? تأجيل: Unfortunately, something has come up. Could we move the meeting to...? تأكيد: I'm writing to confirm our meeting on..."
        },
        {
          "id": "scw_425_m2",
          "type": "gap",
          "promptEn": "Complete: Unfortunately, something has ____.",
          "promptAr": "أكمل الفراغ: (للأسف، طرأ شي.)",
          "options": [
            "come up",
            "came out",
            "go up"
          ],
          "correctIndex": 0,
          "answer": "Unfortunately, something has come up.",
          "explanationAr": "الإجابة: come up. اقتراح: Would Tuesday at 10 a.m. suit you? / Are you available on...? تأجيل: Unfortunately, something has come up. Could we move the meeting to...? تأكيد: I'm writing to confirm our meeting on..."
        },
        {
          "id": "scw_425_m3",
          "type": "gap",
          "promptEn": "Complete: Could we ____ the meeting to Thursday?",
          "promptAr": "أكمل الفراغ: (ممكن نأجل الاجتماع للخميس؟)",
          "options": [
            "change of",
            "remove",
            "move"
          ],
          "correctIndex": 2,
          "answer": "Could we move the meeting to Thursday?",
          "explanationAr": "الإجابة: move. اقتراح: Would Tuesday at 10 a.m. suit you? / Are you available on...? تأجيل: Unfortunately, something has come up. Could we move the meeting to...? تأكيد: I'm writing to confirm our meeting on..."
        },
        {
          "id": "scw_425_m4",
          "type": "gap",
          "promptEn": "Complete: I'm writing to ____ our meeting on Sunday.",
          "promptAr": "أكمل الفراغ: (أكتب لتأكيد اجتماعنا يوم الأحد.)",
          "options": [
            "confirmation",
            "confirm",
            "conform"
          ],
          "correctIndex": 1,
          "answer": "I'm writing to confirm our meeting on Sunday.",
          "explanationAr": "الإجابة: confirm. اقتراح: Would Tuesday at 10 a.m. suit you? / Are you available on...? تأجيل: Unfortunately, something has come up. Could we move the meeting to...? تأكيد: I'm writing to confirm our meeting on..."
        }
      ],
      "hard": [
        {
          "id": "scw_425_h1",
          "type": "order",
          "promptEn": "Put the words in order: inconvenience. / any / I / for / apologise",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (أعتذر عن أي إزعاج.)",
          "answer": "I apologise for any inconvenience.",
          "explanationAr": "الترتيب الصحيح: I apologise for any inconvenience."
        },
        {
          "id": "scw_425_h2",
          "type": "order",
          "promptEn": "Put the words in order: what / best / works / know / let / for / Please / me / you.",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (علمني وش الأنسب لك.)",
          "answer": "Please let me know what works best for you.",
          "explanationAr": "الترتيب الصحيح: Please let me know what works best for you."
        },
        {
          "id": "scw_425_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: للأسف، طرأ شي.",
          "answer": "Unfortunately, something has come up.",
          "explanationAr": "ترجمة مقترحة: Unfortunately, something has come up."
        },
        {
          "id": "scw_425_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أكتب لتأكيد اجتماعنا يوم الأحد.",
          "answer": "I'm writing to confirm our meeting on Sunday.",
          "explanationAr": "ترجمة مقترحة: I'm writing to confirm our meeting on Sunday."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "'Postpone before'",
        "correct": "bring forward = earlier; postpone = later",
        "whyAr": "خلط شائع."
      },
      {
        "incorrect": "No alternative time offered",
        "correct": "Always propose a new slot",
        "whyAr": "يسهل على الطرف الثاني."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (إيميل شكوى رسمي): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Your company is terrible and dishonest!",
          "I am very disappointed with the service."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I am very disappointed with the service. — الإهانة تضعف الشكوى.",
        "fromLessonId": "scw_424"
      },
      {
        "questionAr": "مراجعة (الأسئلة غير المباشرة في الاستفسار): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Could you tell me when does it start?",
          "Could you tell me when it starts?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Could you tell me when it starts? — لا تستخدم does في السؤال غير المباشر.",
        "fromLessonId": "scw_422"
      },
      {
        "questionAr": "مراجعة (رسالة شكر): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Thank you for help me.",
          "Thank you for helping me."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Thank you for helping me. — for + -ing.",
        "fromLessonId": "scw_420"
      },
      {
        "questionAr": "ما معنى \"skill\"؟",
        "questionEn": "What does \"skill\" mean?",
        "options": [
          "فائدة",
          "أولاً",
          "يجادل/يرى",
          "مهارة"
        ],
        "correctIndex": 3,
        "explanationAr": "\"skill\" /skɪl/ تعني: مهارة. مثال: a useful skill",
        "fromLessonId": "scw_423"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (يناسبك الثلاثاء الساعة ١٠ صباحاً؟)",
          "questionEn": "Complete: Would Tuesday at 10 a.m. ____ you?",
          "options": [
            "suit",
            "match",
            "fit you to"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: suit. اقتراح: Would Tuesday at 10 a.m. suit you? / Are you available on...? تأجيل: Unfortunately, something has come up. Could we move the meeting to...? تأكيد: I'm writing to confirm our meeting on..."
        },
        {
          "questionAr": "أكمل الفراغ: (للأسف، طرأ شي.)",
          "questionEn": "Complete: Unfortunately, something has ____.",
          "options": [
            "come up",
            "came out",
            "go up"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: come up. اقتراح: Would Tuesday at 10 a.m. suit you? / Are you available on...? تأجيل: Unfortunately, something has come up. Could we move the meeting to...? تأكيد: I'm writing to confirm our meeting on..."
        },
        {
          "questionAr": "نقدم الاجتماع لوقت أبكر:",
          "questionEn": "Make a meeting earlier:",
          "options": [
            "postpone",
            "bring forward",
            "cancel"
          ],
          "correctIndex": 1,
          "explanationAr": "bring forward."
        },
        {
          "questionAr": "أكمل: Would 3 p.m. ___ you?",
          "questionEn": "Complete: Would 3 p.m. ___ you?",
          "options": [
            "suit",
            "suits",
            "suiting"
          ],
          "correctIndex": 0,
          "explanationAr": "would + suit."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Can we postpone the meeting to before?",
            "Can we bring the meeting forward?"
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: Can we bring the meeting forward? — أقدم = bring forward، أأخر = postpone."
        }
      ]
    }
  },
  {
    "id": "scw_426",
    "pillarId": "writing",
    "pillarNameAr": "الكتابة التعبيرية الحوارية",
    "pillarNameEn": "Conversational Writing & Quick Messaging",
    "pillarIcon": "✍️",
    "level": "متوسط (Intermediate)",
    "levelCode": "B1-B2",
    "titleAr": "كتابة الملخص",
    "titleEn": "Writing a Summary",
    "descAr": "لخّص نص أو مقال بكلماتك في ثلث طوله، بدون رأيك.",
    "descEn": "Summarise a text in your own words in about a third of its length, without opinion.",
    "speakingGoalAr": "لخّص مقالاً من ٣٠٠ كلمة في ٨٠–١٠٠ كلمة.",
    "speakingGoalEn": "Summarise a 300-word article in 80–100 words.",
    "keyPattern": {
      "ruleAr": "١) اقرأ وحدد الفكرة الرئيسية والنقاط المهمة. ٢) احذف الأمثلة والتكرار. ٣) أعد الصياغة (paraphrase) بكلماتك. ٤) ابدأ بـ The article explains/argues that... ٥) لا تضيف رأيك.",
      "ruleEn": "Find main idea + key points, cut examples, paraphrase, start with 'The article explains that...', no personal opinion.",
      "formula": "The article/author + reporting verb + that... It also... Finally..."
    },
    "practicalExamples": [
      {
        "en": "The article explains that sleep improves memory.",
        "ar": "المقال يوضح إن النوم يحسن الذاكرة."
      },
      {
        "en": "According to the author, teenagers need nine hours.",
        "ar": "حسب الكاتب، المراهقين يحتاجون تسع ساعات."
      },
      {
        "en": "It also points out that screens delay sleep.",
        "ar": "ويشير بعد إن الشاشات تأخر النوم."
      },
      {
        "en": "In short, good sleep leads to better results.",
        "ar": "باختصار، النوم الجيد يؤدي لنتائج أفضل."
      },
      {
        "en": "The writer argues that schools should start later.",
        "ar": "الكاتب يرى إن المدارس لازم تبدأ متأخر."
      },
      {
        "en": "Overall, the text highlights the importance of rest.",
        "ar": "بشكل عام، النص يبرز أهمية الراحة."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "Copying whole sentences from the text",
        "correct": "Paraphrase in your own words",
        "whyAr": "النسخ مو تلخيص."
      },
      {
        "incorrect": "I think the article is great.",
        "correct": "(no opinion in a summary)",
        "whyAr": "الملخص بدون رأي."
      },
      {
        "incorrect": "Including every example",
        "correct": "Keep only main points",
        "whyAr": "الأمثلة تنحذف."
      }
    ],
    "speakingChallenge": {
      "promptAr": "لخّص نص النوم في ٣ جمل.",
      "promptEn": "Summarise the sleep text in three sentences.",
      "saraQuestionAr": "لخّص بكلماتك بدون رأيك.",
      "saraQuestionEn": "Use your own words, no opinion.",
      "recommendedResponseEn": "The article explains that teenagers who sleep less than seven hours have poorer memory. It points out that using phones before bed makes the problem worse. It also highlights that starting school later has improved students' grades in some US schools."
    },
    "quiz": [
      {
        "questionAr": "أي جملة ما تنحط في ملخص؟",
        "questionEn": "Which doesn't belong in a summary?",
        "options": [
          "The article explains...",
          "I totally agree with the writer.",
          "It also points out..."
        ],
        "correctIndex": 1,
        "explanationAr": "رأي شخصي."
      },
      {
        "questionAr": "paraphrase يعني:",
        "questionEn": "'paraphrase' means:",
        "options": [
          "ينسخ",
          "يعيد الصياغة",
          "يترجم"
        ],
        "correctIndex": 1,
        "explanationAr": "يعيد الصياغة."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Paraphrase in your own words",
          "Copying whole sentences from the text"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Paraphrase in your own words — النسخ مو تلخيص."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I think the article is great.",
          "(no opinion in a summary)"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: (no opinion in a summary) — الملخص بدون رأي."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Including every example",
          "Keep only main points"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Keep only main points — الأمثلة تنحذف."
      }
    ],
    "whiteboardNotes": {
      "title": "Writing a Summary",
      "pointsAr": [
        "يحدد النقاط الرئيسية.",
        "يعيد الصياغة بكلماته.",
        "يكتب ملخص موضوعي.",
        "١) اقرأ وحدد الفكرة الرئيسية والنقاط المهمة. ٢) احذف الأمثلة والتكرار. ٣) أعد الصياغة (paraphrase) بكلماتك. ٤) ابدأ بـ The article explains/argues that... ٥) لا تضيف رأيك."
      ],
      "pointsEn": [
        "Identify key points.",
        "Paraphrase.",
        "Write an objective summary.",
        "Find main idea + key points, cut examples, paraphrase, start with 'The article explains that...', no personal opinion."
      ],
      "chalkHighlight": "The article/author + reporting verb + that... It also... Finally..."
    },
    "unit": 6,
    "cefr": "B1",
    "objectivesAr": [
      "يحدد النقاط الرئيسية.",
      "يعيد الصياغة بكلماته.",
      "يكتب ملخص موضوعي."
    ],
    "objectivesEn": [
      "Identify key points.",
      "Paraphrase.",
      "Write an objective summary."
    ],
    "vocabulary": [
      {
        "word": "summary",
        "ipa": "/ˈsʌməri/",
        "ar": "ملخص",
        "exampleEn": "a short summary",
        "exampleAr": "ملخص قصير"
      },
      {
        "word": "summarise",
        "ipa": "/ˈsʌməraɪz/",
        "ar": "يلخص",
        "exampleEn": "summarise the text",
        "exampleAr": "لخص النص"
      },
      {
        "word": "paraphrase",
        "ipa": "/ˈpærəfreɪz/",
        "ar": "يعيد الصياغة",
        "exampleEn": "paraphrase a sentence",
        "exampleAr": "أعد صياغة جملة"
      },
      {
        "word": "main point",
        "ipa": "/meɪn pɔɪnt/",
        "ar": "نقطة رئيسية",
        "exampleEn": "three main points",
        "exampleAr": "ثلاث نقاط رئيسية"
      },
      {
        "word": "argue",
        "ipa": "/ˈɑːrɡjuː/",
        "ar": "يرى/يحتج",
        "exampleEn": "The writer argues...",
        "exampleAr": "الكاتب يرى..."
      },
      {
        "word": "point out",
        "ipa": "/pɔɪnt aʊt/",
        "ar": "يشير إلى",
        "exampleEn": "He points out that...",
        "exampleAr": "يشير إن..."
      },
      {
        "word": "highlight",
        "ipa": "/ˈhaɪlaɪt/",
        "ar": "يبرز",
        "exampleEn": "highlight a problem",
        "exampleAr": "يبرز مشكلة"
      },
      {
        "word": "according to",
        "ipa": "/əˈkɔːrdɪŋ tuː/",
        "ar": "حسب",
        "exampleEn": "according to the study",
        "exampleAr": "حسب الدراسة"
      },
      {
        "word": "in short",
        "ipa": "/ɪn ʃɔːrt/",
        "ar": "باختصار",
        "exampleEn": "In short, ...",
        "exampleAr": "باختصار، ..."
      },
      {
        "word": "objective",
        "ipa": "/əbˈdʒɛktɪv/",
        "ar": "موضوعي",
        "exampleEn": "an objective summary",
        "exampleAr": "ملخص موضوعي"
      }
    ],
    "grammarFocus": {
      "ruleAr": "١) اقرأ وحدد الفكرة الرئيسية والنقاط المهمة. ٢) احذف الأمثلة والتكرار. ٣) أعد الصياغة (paraphrase) بكلماتك. ٤) ابدأ بـ The article explains/argues that... ٥) لا تضيف رأيك.",
      "ruleEn": "Find main idea + key points, cut examples, paraphrase, start with 'The article explains that...', no personal opinion.",
      "formula": "The article/author + reporting verb + that... It also... Finally...",
      "examples": [
        {
          "en": "The article explains that sleep improves memory.",
          "ar": "المقال يوضح إن النوم يحسن الذاكرة."
        },
        {
          "en": "According to the author, teenagers need nine hours.",
          "ar": "حسب الكاتب، المراهقين يحتاجون تسع ساعات."
        },
        {
          "en": "It also points out that screens delay sleep.",
          "ar": "ويشير بعد إن الشاشات تأخر النوم."
        },
        {
          "en": "In short, good sleep leads to better results.",
          "ar": "باختصار، النوم الجيد يؤدي لنتائج أفضل."
        },
        {
          "en": "The writer argues that schools should start later.",
          "ar": "الكاتب يرى إن المدارس لازم تبدأ متأخر."
        },
        {
          "en": "Overall, the text highlights the importance of rest.",
          "ar": "بشكل عام، النص يبرز أهمية الراحة."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Text",
        "en": "Studies show that teenagers who sleep less than seven hours have weaker memory.",
        "ar": "الدراسات تبين إن المراهقين اللي ينامون أقل من سبع ساعات ذاكرتهم أضعف."
      },
      {
        "speaker": "Text",
        "en": "Phones and tablets before bed delay sleep by up to an hour.",
        "ar": "الجوالات قبل النوم تأخر النوم لين ساعة."
      },
      {
        "speaker": "Text",
        "en": "Some schools in the US now start at 8:30 instead of 7:30, and grades have improved.",
        "ar": "بعض مدارس أمريكا صارت تبدأ ٨:٣٠ بدل ٧:٣٠ والدرجات تحسنت."
      },
      {
        "speaker": "Sara",
        "en": "Now summarise it in two sentences.",
        "ar": "لخصه في جملتين."
      },
      {
        "speaker": "Student",
        "en": "The article explains that lack of sleep weakens teenagers' memory and that screens make it worse.",
        "ar": "المقال يوضح إن قلة النوم تضعف ذاكرة المراهقين والشاشات تزيدها."
      },
      {
        "speaker": "Student",
        "en": "It also points out that later school start times can improve grades.",
        "ar": "ويشير إن بداية الدوام المتأخرة ممكن تحسن الدرجات."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Text: Studies show that teenagers who sleep less than seven hours have weaker memory.\nText: Phones and tablets before bed delay sleep by up to an hour.\nText: Some schools in the US now start at 8:30 instead of 7:30, and grades have improved.\nSara: Now summarise it in two sentences.\nStudent: The article explains that lack of sleep weakens teenagers' memory and that screens make it worse.\nStudent: It also points out that later school start times can improve grades.",
      "questions": [
        {
          "questionAr": "أقل نوم صحي:",
          "questionEn": "Minimum healthy sleep mentioned:",
          "options": [
            "six hours",
            "seven hours",
            "nine hours"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: seven hours"
        },
        {
          "questionAr": "الشاشات تأخر:",
          "questionEn": "Screens delay sleep by up to:",
          "options": [
            "30 minutes",
            "an hour",
            "two hours"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: an hour"
        },
        {
          "questionAr": "البداية الجديدة:",
          "questionEn": "New US start time:",
          "options": [
            "7:30",
            "8:00",
            "8:30"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: 8:30"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Reporting verbs stress",
      "items": [
        "exPLAINS",
        "ARgues",
        "HIGHlights",
        "points OUT"
      ],
      "tipAr": "phrasal verbs النبر على الجزء الثاني: point OUT."
    },
    "exercises": {
      "easy": [
        {
          "id": "scw_426_e1",
          "type": "meaning",
          "promptEn": "What does \"summary\" mean?",
          "promptAr": "ما معنى \"summary\"؟",
          "options": [
            "ملخص",
            "يشير إلى",
            "يعيد الصياغة",
            "يلخص"
          ],
          "correctIndex": 0,
          "answer": "ملخص",
          "explanationAr": "\"summary\" /ˈsʌməri/ تعني: ملخص. مثال: a short summary"
        },
        {
          "id": "scw_426_e2",
          "type": "meaning",
          "promptEn": "What does \"summarise\" mean?",
          "promptAr": "ما معنى \"summarise\"؟",
          "options": [
            "يلخص",
            "ملخص",
            "يعيد الصياغة",
            "يبرز"
          ],
          "correctIndex": 0,
          "answer": "يلخص",
          "explanationAr": "\"summarise\" /ˈsʌməraɪz/ تعني: يلخص. مثال: summarise the text"
        },
        {
          "id": "scw_426_e3",
          "type": "meaning",
          "promptEn": "What does \"paraphrase\" mean?",
          "promptAr": "ما معنى \"paraphrase\"؟",
          "options": [
            "حسب",
            "يعيد الصياغة",
            "يبرز",
            "يلخص"
          ],
          "correctIndex": 1,
          "answer": "يعيد الصياغة",
          "explanationAr": "\"paraphrase\" /ˈpærəfreɪz/ تعني: يعيد الصياغة. مثال: paraphrase a sentence"
        },
        {
          "id": "scw_426_e4",
          "type": "meaning",
          "promptEn": "What does \"main point\" mean?",
          "promptAr": "ما معنى \"main point\"؟",
          "options": [
            "نقطة رئيسية",
            "يعيد الصياغة",
            "يشير إلى",
            "ملخص"
          ],
          "correctIndex": 0,
          "answer": "نقطة رئيسية",
          "explanationAr": "\"main point\" /meɪn pɔɪnt/ تعني: نقطة رئيسية. مثال: three main points"
        }
      ],
      "medium": [
        {
          "id": "scw_426_m1",
          "type": "gap",
          "promptEn": "Complete: The article ____ that sleep improves memory.",
          "promptAr": "أكمل الفراغ: (المقال يوضح إن النوم يحسن الذاكرة.)",
          "options": [
            "explains",
            "explain",
            "explanation"
          ],
          "correctIndex": 0,
          "answer": "The article explains that sleep improves memory.",
          "explanationAr": "الإجابة: explains. ١) اقرأ وحدد الفكرة الرئيسية والنقاط المهمة. ٢) احذف الأمثلة والتكرار. ٣) أعد الصياغة (paraphrase) بكلماتك. ٤) ابدأ بـ The article explains/argues that... ٥) لا تضيف رأيك."
        },
        {
          "id": "scw_426_m2",
          "type": "gap",
          "promptEn": "Complete: ____ the author, teenagers need nine hours.",
          "promptAr": "أكمل الفراغ: (حسب الكاتب، المراهقين يحتاجون تسع ساعات.)",
          "options": [
            "According",
            "According to",
            "Accorded to"
          ],
          "correctIndex": 1,
          "answer": "According to the author, teenagers need nine hours.",
          "explanationAr": "الإجابة: According to. ١) اقرأ وحدد الفكرة الرئيسية والنقاط المهمة. ٢) احذف الأمثلة والتكرار. ٣) أعد الصياغة (paraphrase) بكلماتك. ٤) ابدأ بـ The article explains/argues that... ٥) لا تضيف رأيك."
        },
        {
          "id": "scw_426_m3",
          "type": "gap",
          "promptEn": "Complete: It also ____ that screens delay sleep.",
          "promptAr": "أكمل الفراغ: (ويشير بعد إن الشاشات تأخر النوم.)",
          "options": [
            "point out",
            "points out",
            "points"
          ],
          "correctIndex": 1,
          "answer": "It also points out that screens delay sleep.",
          "explanationAr": "الإجابة: points out. ١) اقرأ وحدد الفكرة الرئيسية والنقاط المهمة. ٢) احذف الأمثلة والتكرار. ٣) أعد الصياغة (paraphrase) بكلماتك. ٤) ابدأ بـ The article explains/argues that... ٥) لا تضيف رأيك."
        },
        {
          "id": "scw_426_m4",
          "type": "gap",
          "promptEn": "Complete: ____, good sleep leads to better results.",
          "promptAr": "أكمل الفراغ: (باختصار، النوم الجيد يؤدي لنتائج أفضل.)",
          "options": [
            "In short",
            "In shortly",
            "Shortly"
          ],
          "correctIndex": 0,
          "answer": "In short, good sleep leads to better results.",
          "explanationAr": "الإجابة: In short. ١) اقرأ وحدد الفكرة الرئيسية والنقاط المهمة. ٢) احذف الأمثلة والتكرار. ٣) أعد الصياغة (paraphrase) بكلماتك. ٤) ابدأ بـ The article explains/argues that... ٥) لا تضيف رأيك."
        }
      ],
      "hard": [
        {
          "id": "scw_426_h1",
          "type": "order",
          "promptEn": "Put the words in order: schools / that / argues / The / start / should / writer / later.",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (الكاتب يرى إن المدارس لازم تبدأ متأخر.)",
          "answer": "The writer argues that schools should start later.",
          "explanationAr": "الترتيب الصحيح: The writer argues that schools should start later."
        },
        {
          "id": "scw_426_h2",
          "type": "order",
          "promptEn": "Put the words in order: highlights / text / Overall, / rest. / the / the / importance / of",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (بشكل عام، النص يبرز أهمية الراحة.)",
          "answer": "Overall, the text highlights the importance of rest.",
          "explanationAr": "الترتيب الصحيح: Overall, the text highlights the importance of rest."
        },
        {
          "id": "scw_426_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: حسب الكاتب، المراهقين يحتاجون تسع ساعات.",
          "answer": "According to the author, teenagers need nine hours.",
          "explanationAr": "ترجمة مقترحة: According to the author, teenagers need nine hours."
        },
        {
          "id": "scw_426_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: باختصار، النوم الجيد يؤدي لنتائج أفضل.",
          "answer": "In short, good sleep leads to better results.",
          "explanationAr": "ترجمة مقترحة: In short, good sleep leads to better results."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Translating word by word = copying",
        "correct": "Change structure and vocabulary",
        "whyAr": "غيّر الكلمات والترتيب."
      },
      {
        "incorrect": "Summary longer than needed",
        "correct": "Aim for about a third",
        "whyAr": "الاختصار مهارة."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (ترتيب المواعيد وتغييرها): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Would Tuesday at 10 suit you?",
          "Is Tuesday suitable for you at 10?"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Would Tuesday at 10 suit you? — الأسلوب الأشيع.",
        "fromLessonId": "scw_425"
      },
      {
        "questionAr": "مراجعة (فقرة رأي مدعومة بالأسباب): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "In my opinion, ... / I think...",
          "In my opinion, I think..."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: In my opinion, ... / I think... — لا تجمعهم، نفس المعنى.",
        "fromLessonId": "scw_423"
      },
      {
        "questionAr": "مراجعة (الرسمي وغير الرسمي: النبرة واختصارات الرسائل): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Hey Dr Ahmed, can u send the slides?",
          "Dear Dr Ahmed, could you please send the slides?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Dear Dr Ahmed, could you please send the slides? — مع الدكتور: رسمي بدون u.",
        "fromLessonId": "scw_421_m"
      },
      {
        "questionAr": "ما معنى \"compensation\"؟",
        "questionEn": "What does \"compensation\" mean?",
        "options": [
          "استرجاع",
          "تعويض",
          "خايب ظنه",
          "رقم مرجعي"
        ],
        "correctIndex": 1,
        "explanationAr": "\"compensation\" /ˌkɑːmpɛnˈseɪʃən/ تعني: تعويض. مثال: ask for compensation",
        "fromLessonId": "scw_424"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (المقال يوضح إن النوم يحسن الذاكرة.)",
          "questionEn": "Complete: The article ____ that sleep improves memory.",
          "options": [
            "explains",
            "explain",
            "explanation"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: explains. ١) اقرأ وحدد الفكرة الرئيسية والنقاط المهمة. ٢) احذف الأمثلة والتكرار. ٣) أعد الصياغة (paraphrase) بكلماتك. ٤) ابدأ بـ The article explains/argues that... ٥) لا تضيف رأيك."
        },
        {
          "questionAr": "أكمل الفراغ: (حسب الكاتب، المراهقين يحتاجون تسع ساعات.)",
          "questionEn": "Complete: ____ the author, teenagers need nine hours.",
          "options": [
            "According",
            "According to",
            "Accorded to"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: According to. ١) اقرأ وحدد الفكرة الرئيسية والنقاط المهمة. ٢) احذف الأمثلة والتكرار. ٣) أعد الصياغة (paraphrase) بكلماتك. ٤) ابدأ بـ The article explains/argues that... ٥) لا تضيف رأيك."
        },
        {
          "questionAr": "أي جملة ما تنحط في ملخص؟",
          "questionEn": "Which doesn't belong in a summary?",
          "options": [
            "The article explains...",
            "I totally agree with the writer.",
            "It also points out..."
          ],
          "correctIndex": 1,
          "explanationAr": "رأي شخصي."
        },
        {
          "questionAr": "paraphrase يعني:",
          "questionEn": "'paraphrase' means:",
          "options": [
            "ينسخ",
            "يعيد الصياغة",
            "يترجم"
          ],
          "correctIndex": 1,
          "explanationAr": "يعيد الصياغة."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "Paraphrase in your own words",
            "Copying whole sentences from the text"
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: Paraphrase in your own words — النسخ مو تلخيص."
        }
      ]
    }
  },
  {
    "id": "scw_427",
    "pillarId": "writing",
    "pillarNameAr": "الكتابة التعبيرية الحوارية",
    "pillarNameEn": "Conversational Writing & Quick Messaging",
    "pillarIcon": "✍️",
    "level": "متقدم (Advanced)",
    "levelCode": "B1-B2",
    "titleAr": "خطاب التقديم ورسالة LinkedIn المهنية",
    "titleEn": "Cover Letters and Professional LinkedIn Messages",
    "descAr": "اكتب خطاب تقديم مقنع: لماذا هذه الوظيفة، ماذا تقدم، ومع أمثلة إنجازات.",
    "descEn": "Write a persuasive cover letter: why this role, what you offer, with evidence.",
    "speakingGoalAr": "اكتب خطاب تقديم من ٢٠٠ كلمة ورسالة LinkedIn من ٦٠ كلمة.",
    "speakingGoalEn": "Write a 200-word cover letter and a 60-word LinkedIn message.",
    "keyPattern": {
      "ruleAr": "الهيكل: (١) الوظيفة ومن وين عرفتها. (٢) خبراتك مع أرقام وأفعال قوية (led, developed, increased by 30%). (٣) ليش هذي الشركة بالذات. (٤) دعوة للمقابلة. تجنب تكرار السيرة؛ اربطها بمتطلبات الوظيفة.",
      "ruleEn": "Role + source → evidence with action verbs and numbers → why this company → call to action.",
      "formula": "Position → Evidence (verb + result + number) → Why you → I would welcome the opportunity to..."
    },
    "practicalExamples": [
      {
        "en": "I am excited to apply for the Data Analyst position at NEOM.",
        "ar": "يسعدني التقدم لوظيفة محلل بيانات في نيوم."
      },
      {
        "en": "During my internship, I developed a dashboard that cut reporting time by 40%.",
        "ar": "أثناء تدريبي طورت لوحة بيانات قللت وقت التقارير ٤٠٪."
      },
      {
        "en": "I led a team of five students to win a national hackathon.",
        "ar": "قدت فريق من خمسة طلاب وفزنا بهاكاثون وطني."
      },
      {
        "en": "I would welcome the opportunity to discuss how I can contribute.",
        "ar": "يسعدني مناقشة كيف أقدر أساهم."
      },
      {
        "en": "Your commitment to innovation strongly appeals to me.",
        "ar": "التزامكم بالابتكار يجذبني بقوة."
      },
      {
        "en": "I noticed we share an interest in AI. I'd love to connect.",
        "ar": "لاحظت إن عندنا اهتمام مشترك بالذكاء الاصطناعي. يسعدني التواصل."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "I am a hard-working, passionate team player.",
        "correct": "I led a five-person team to win a national hackathon.",
        "whyAr": "أثبت الصفة بإنجاز بدل كلام عام."
      },
      {
        "incorrect": "Dear Sir, I need a job, please.",
        "correct": "Dear Ms Alfaisal, I am writing to apply for...",
        "whyAr": "الأسلوب يركز على قيمتك مو حاجتك."
      },
      {
        "incorrect": "I leaded the project.",
        "correct": "I led the project.",
        "whyAr": "lead → led شاذ."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اكتب رسالة LinkedIn قصيرة لموظف في شركة تحلم فيها.",
      "promptEn": "Write a short LinkedIn message to someone at your dream company.",
      "saraQuestionAr": "اكتب رسالة مهنية من ٤ جمل.",
      "saraQuestionEn": "Write a four-sentence professional message.",
      "recommendedResponseEn": "Hi Mr Alghamdi, I'm a final-year software engineering student and I really admire Aramco's work in digital innovation. I noticed you lead the AI team, which is my main area of interest. Would you be open to a brief chat about your experience? Thank you for your time."
    },
    "quiz": [
      {
        "questionAr": "أقوى جملة:",
        "questionEn": "Strongest sentence:",
        "options": [
          "I am very hard-working.",
          "I increased sales by 25% in six months.",
          "I like working."
        ],
        "correctIndex": 1,
        "explanationAr": "إنجاز برقم."
      },
      {
        "questionAr": "ماضي lead:",
        "questionEn": "Past of 'lead':",
        "options": [
          "leaded",
          "led",
          "lead"
        ],
        "correctIndex": 1,
        "explanationAr": "led."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I led a five-person team to win a national hackathon.",
          "I am a hard-working, passionate team player."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I led a five-person team to win a national hackathon. — أثبت الصفة بإنجاز بدل كلام عام."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Dear Ms Alfaisal, I am writing to apply for...",
          "Dear Sir, I need a job, please."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Dear Ms Alfaisal, I am writing to apply for... — الأسلوب يركز على قيمتك مو حاجتك."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I led the project.",
          "I leaded the project."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I led the project. — lead → led شاذ."
      }
    ],
    "whiteboardNotes": {
      "title": "Cover Letters and Professional LinkedIn Messages",
      "pointsAr": [
        "يكتب خطاب تقديم منظم.",
        "يستخدم أفعال إنجاز وأرقام.",
        "يكتب رسالة تواصل مهنية مختصرة.",
        "الهيكل: (١) الوظيفة ومن وين عرفتها. (٢) خبراتك مع أرقام وأفعال قوية (led, developed, increased by 30%). (٣) ليش هذي الشركة بالذات. (٤) دعوة للمقابلة. تجنب تكرار السيرة؛ اربطها بمتطلبات الوظيفة."
      ],
      "pointsEn": [
        "Write a structured cover letter.",
        "Use achievement verbs and figures.",
        "Write a concise networking message.",
        "Role + source → evidence with action verbs and numbers → why this company → call to action."
      ],
      "chalkHighlight": "Position → Evidence (verb + result + number) → Why you → I would welcome the opportunity to..."
    },
    "unit": 6,
    "cefr": "B2",
    "objectivesAr": [
      "يكتب خطاب تقديم منظم.",
      "يستخدم أفعال إنجاز وأرقام.",
      "يكتب رسالة تواصل مهنية مختصرة."
    ],
    "objectivesEn": [
      "Write a structured cover letter.",
      "Use achievement verbs and figures.",
      "Write a concise networking message."
    ],
    "vocabulary": [
      {
        "word": "position",
        "ipa": "/pəˈzɪʃən/",
        "ar": "وظيفة/منصب",
        "exampleEn": "apply for a position",
        "exampleAr": "يقدم على وظيفة"
      },
      {
        "word": "achievement",
        "ipa": "/əˈtʃiːvmənt/",
        "ar": "إنجاز",
        "exampleEn": "key achievements",
        "exampleAr": "إنجازات رئيسية"
      },
      {
        "word": "contribute",
        "ipa": "/kənˈtrɪbjuːt/",
        "ar": "يساهم",
        "exampleEn": "contribute to the team",
        "exampleAr": "يساهم في الفريق"
      },
      {
        "word": "led",
        "ipa": "/lɛd/",
        "ar": "قاد (ماضي)",
        "exampleEn": "I led a team.",
        "exampleAr": "قدت فريق."
      },
      {
        "word": "develop",
        "ipa": "/dɪˈvɛləp/",
        "ar": "يطور",
        "exampleEn": "develop a system",
        "exampleAr": "يطور نظام"
      },
      {
        "word": "increase by",
        "ipa": "/ɪnˈkriːs baɪ/",
        "ar": "يزيد بنسبة",
        "exampleEn": "increased by 20%",
        "exampleAr": "زاد ٢٠٪"
      },
      {
        "word": "relevant",
        "ipa": "/ˈrɛləvənt/",
        "ar": "ذو صلة",
        "exampleEn": "relevant experience",
        "exampleAr": "خبرة ذات صلة"
      },
      {
        "word": "opportunity",
        "ipa": "/ˌɑːpərˈtuːnəti/",
        "ar": "فرصة",
        "exampleEn": "a great opportunity",
        "exampleAr": "فرصة رائعة"
      },
      {
        "word": "appeal to",
        "ipa": "/əˈpiːl tuː/",
        "ar": "يجذب",
        "exampleEn": "It appeals to me.",
        "exampleAr": "يجذبني."
      },
      {
        "word": "connect",
        "ipa": "/kəˈnɛkt/",
        "ar": "يتواصل",
        "exampleEn": "I'd love to connect.",
        "exampleAr": "يسعدني التواصل."
      }
    ],
    "grammarFocus": {
      "ruleAr": "الهيكل: (١) الوظيفة ومن وين عرفتها. (٢) خبراتك مع أرقام وأفعال قوية (led, developed, increased by 30%). (٣) ليش هذي الشركة بالذات. (٤) دعوة للمقابلة. تجنب تكرار السيرة؛ اربطها بمتطلبات الوظيفة.",
      "ruleEn": "Role + source → evidence with action verbs and numbers → why this company → call to action.",
      "formula": "Position → Evidence (verb + result + number) → Why you → I would welcome the opportunity to...",
      "examples": [
        {
          "en": "I am excited to apply for the Data Analyst position at NEOM.",
          "ar": "يسعدني التقدم لوظيفة محلل بيانات في نيوم."
        },
        {
          "en": "During my internship, I developed a dashboard that cut reporting time by 40%.",
          "ar": "أثناء تدريبي طورت لوحة بيانات قللت وقت التقارير ٤٠٪."
        },
        {
          "en": "I led a team of five students to win a national hackathon.",
          "ar": "قدت فريق من خمسة طلاب وفزنا بهاكاثون وطني."
        },
        {
          "en": "I would welcome the opportunity to discuss how I can contribute.",
          "ar": "يسعدني مناقشة كيف أقدر أساهم."
        },
        {
          "en": "Your commitment to innovation strongly appeals to me.",
          "ar": "التزامكم بالابتكار يجذبني بقوة."
        },
        {
          "en": "I noticed we share an interest in AI. I'd love to connect.",
          "ar": "لاحظت إن عندنا اهتمام مشترك بالذكاء الاصطناعي. يسعدني التواصل."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Letter",
        "en": "Dear Ms Alfaisal,",
        "ar": "الأستاذة الفيصل المحترمة،"
      },
      {
        "speaker": "Letter",
        "en": "I am writing to apply for the Junior Data Analyst role advertised on LinkedIn.",
        "ar": "أتقدم لوظيفة محلل بيانات مبتدئ المعلنة على لينكدإن."
      },
      {
        "speaker": "Letter",
        "en": "During my internship at STC, I built a dashboard that reduced weekly reporting time by 40%.",
        "ar": "في تدريبي في STC بنيت لوحة قللت وقت التقارير الأسبوعية ٤٠٪."
      },
      {
        "speaker": "Letter",
        "en": "Your focus on smart cities aligns closely with my graduation project on traffic data.",
        "ar": "تركيزكم على المدن الذكية يتوافق مع مشروع تخرجي عن بيانات المرور."
      },
      {
        "speaker": "Letter",
        "en": "I would welcome the opportunity to discuss how I could contribute to your team.",
        "ar": "يسعدني مناقشة كيف أساهم في فريقكم."
      },
      {
        "speaker": "Letter",
        "en": "Yours sincerely, Lama Alqahtani",
        "ar": "مع خالص التحية، لمى القحطاني"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Letter: Dear Ms Alfaisal,\nLetter: I am writing to apply for the Junior Data Analyst role advertised on LinkedIn.\nLetter: During my internship at STC, I built a dashboard that reduced weekly reporting time by 40%.\nLetter: Your focus on smart cities aligns closely with my graduation project on traffic data.\nLetter: I would welcome the opportunity to discuss how I could contribute to your team.\nLetter: Yours sincerely, Lama Alqahtani",
      "questions": [
        {
          "questionAr": "وين انعلنت الوظيفة؟",
          "questionEn": "Where was the job advertised?",
          "options": [
            "the website",
            "LinkedIn",
            "a newspaper"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: LinkedIn"
        },
        {
          "questionAr": "إنجازها:",
          "questionEn": "Her achievement:",
          "options": [
            "won a prize",
            "cut reporting time by 40%",
            "led 10 people"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: cut reporting time by 40%"
        },
        {
          "questionAr": "مشروع تخرجها:",
          "questionEn": "Her graduation project was about:",
          "options": [
            "health",
            "traffic data",
            "banking"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: traffic data"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Achievement verbs",
      "items": [
        "led /lɛd/",
        "developed /dɪˈvɛləpt/",
        "increased /ɪnˈkriːst/",
        "managed /ˈmænɪdʒd/"
      ],
      "tipAr": "في المقابلة قلها بثقة ونبر على الرقم: by FORty percent."
    },
    "exercises": {
      "easy": [
        {
          "id": "scw_427_e1",
          "type": "meaning",
          "promptEn": "What does \"position\" mean?",
          "promptAr": "ما معنى \"position\"؟",
          "options": [
            "إنجاز",
            "يزيد بنسبة",
            "وظيفة/منصب",
            "يجذب"
          ],
          "correctIndex": 2,
          "answer": "وظيفة/منصب",
          "explanationAr": "\"position\" /pəˈzɪʃən/ تعني: وظيفة/منصب. مثال: apply for a position"
        },
        {
          "id": "scw_427_e2",
          "type": "meaning",
          "promptEn": "What does \"achievement\" mean?",
          "promptAr": "ما معنى \"achievement\"؟",
          "options": [
            "إنجاز",
            "فرصة",
            "وظيفة/منصب",
            "يجذب"
          ],
          "correctIndex": 0,
          "answer": "إنجاز",
          "explanationAr": "\"achievement\" /əˈtʃiːvmənt/ تعني: إنجاز. مثال: key achievements"
        },
        {
          "id": "scw_427_e3",
          "type": "meaning",
          "promptEn": "What does \"contribute\" mean?",
          "promptAr": "ما معنى \"contribute\"؟",
          "options": [
            "يساهم",
            "إنجاز",
            "يزيد بنسبة",
            "ذو صلة"
          ],
          "correctIndex": 0,
          "answer": "يساهم",
          "explanationAr": "\"contribute\" /kənˈtrɪbjuːt/ تعني: يساهم. مثال: contribute to the team"
        },
        {
          "id": "scw_427_e4",
          "type": "meaning",
          "promptEn": "What does \"led\" mean?",
          "promptAr": "ما معنى \"led\"؟",
          "options": [
            "إنجاز",
            "قاد (ماضي)",
            "يتواصل",
            "يزيد بنسبة"
          ],
          "correctIndex": 1,
          "answer": "قاد (ماضي)",
          "explanationAr": "\"led\" /lɛd/ تعني: قاد (ماضي). مثال: I led a team."
        }
      ],
      "medium": [
        {
          "id": "scw_427_m1",
          "type": "gap",
          "promptEn": "Complete: I am excited to apply for the Data Analyst ____ at NEOM.",
          "promptAr": "أكمل الفراغ: (يسعدني التقدم لوظيفة محلل بيانات في نيوم.)",
          "options": [
            "posture",
            "position",
            "post office"
          ],
          "correctIndex": 1,
          "answer": "I am excited to apply for the Data Analyst position at NEOM.",
          "explanationAr": "الإجابة: position. الهيكل: (١) الوظيفة ومن وين عرفتها. (٢) خبراتك مع أرقام وأفعال قوية (led, developed, increased by 30%). (٣) ليش هذي الشركة بالذات. (٤) دعوة للمقابلة. تجنب تكرار السيرة؛ اربطها بمتطلبات الوظيفة."
        },
        {
          "id": "scw_427_m2",
          "type": "gap",
          "promptEn": "Complete: During my internship, I ____ a dashboard that cut reporting time by 40%.",
          "promptAr": "أكمل الفراغ: (أثناء تدريبي طورت لوحة بيانات قللت وقت التقارير ٤٠٪.)",
          "options": [
            "develop",
            "developing",
            "developed"
          ],
          "correctIndex": 2,
          "answer": "During my internship, I developed a dashboard that cut reporting time by 40%.",
          "explanationAr": "الإجابة: developed. الهيكل: (١) الوظيفة ومن وين عرفتها. (٢) خبراتك مع أرقام وأفعال قوية (led, developed, increased by 30%). (٣) ليش هذي الشركة بالذات. (٤) دعوة للمقابلة. تجنب تكرار السيرة؛ اربطها بمتطلبات الوظيفة."
        },
        {
          "id": "scw_427_m3",
          "type": "gap",
          "promptEn": "Complete: I ____ a team of five students to win a national hackathon.",
          "promptAr": "أكمل الفراغ: (قدت فريق من خمسة طلاب وفزنا بهاكاثون وطني.)",
          "options": [
            "leaded",
            "led",
            "lead"
          ],
          "correctIndex": 1,
          "answer": "I led a team of five students to win a national hackathon.",
          "explanationAr": "الإجابة: led. الهيكل: (١) الوظيفة ومن وين عرفتها. (٢) خبراتك مع أرقام وأفعال قوية (led, developed, increased by 30%). (٣) ليش هذي الشركة بالذات. (٤) دعوة للمقابلة. تجنب تكرار السيرة؛ اربطها بمتطلبات الوظيفة."
        },
        {
          "id": "scw_427_m4",
          "type": "gap",
          "promptEn": "Complete: I would ____ the opportunity to discuss how I can contribute.",
          "promptAr": "أكمل الفراغ: (يسعدني مناقشة كيف أقدر أساهم.)",
          "options": [
            "welcomed",
            "welcome",
            "welcoming"
          ],
          "correctIndex": 1,
          "answer": "I would welcome the opportunity to discuss how I can contribute.",
          "explanationAr": "الإجابة: welcome. الهيكل: (١) الوظيفة ومن وين عرفتها. (٢) خبراتك مع أرقام وأفعال قوية (led, developed, increased by 30%). (٣) ليش هذي الشركة بالذات. (٤) دعوة للمقابلة. تجنب تكرار السيرة؛ اربطها بمتطلبات الوظيفة."
        }
      ],
      "hard": [
        {
          "id": "scw_427_h1",
          "type": "order",
          "promptEn": "Put the words in order: to / Your / strongly / to / innovation / appeals / me. / commitment",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (التزامكم بالابتكار يجذبني بقوة.)",
          "answer": "Your commitment to innovation strongly appeals to me.",
          "explanationAr": "الترتيب الصحيح: Your commitment to innovation strongly appeals to me."
        },
        {
          "id": "scw_427_h2",
          "type": "order",
          "promptEn": "Put the words in order: I / AI. / connect. / noticed / to / an / I'd / interest / we / share / in / love",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (لاحظت إن عندنا اهتمام مشترك بالذكاء الاصطناعي. يسعدني التواصل.)",
          "answer": "I noticed we share an interest in AI. I'd love to connect.",
          "explanationAr": "الترتيب الصحيح: I noticed we share an interest in AI. I'd love to connect."
        },
        {
          "id": "scw_427_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أثناء تدريبي طورت لوحة بيانات قللت وقت التقارير ٤٠٪.",
          "answer": "During my internship, I developed a dashboard that cut reporting time by 40%.",
          "explanationAr": "ترجمة مقترحة: During my internship, I developed a dashboard that cut reporting time by 40%."
        },
        {
          "id": "scw_427_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: يسعدني مناقشة كيف أقدر أساهم.",
          "answer": "I would welcome the opportunity to discuss how I can contribute.",
          "explanationAr": "ترجمة مقترحة: I would welcome the opportunity to discuss how I can contribute."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Generic adjectives with no proof",
        "correct": "Action verb + result + number",
        "whyAr": "الأرقام تقنع."
      },
      {
        "incorrect": "Same letter for every company",
        "correct": "Mention why THIS company",
        "whyAr": "التخصيص يفرق."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (كتابة الملخص): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I think the article is great.",
          "(no opinion in a summary)"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: (no opinion in a summary) — الملخص بدون رأي.",
        "fromLessonId": "scw_426"
      },
      {
        "questionAr": "مراجعة (إيميل شكوى رسمي): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I am writing to complaint.",
          "I am writing to complain."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I am writing to complain. — complain فعل، complaint اسم.",
        "fromLessonId": "scw_424"
      },
      {
        "questionAr": "مراجعة (الإيميل الرسمي: الهيكل الكامل): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I look forward to hearing from you.",
          "I look forward to hear from you."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I look forward to hearing from you. — to هنا حرف جر ⇐ -ing.",
        "fromLessonId": "scw_403"
      },
      {
        "questionAr": "ما معنى \"slot\"؟",
        "questionEn": "What does \"slot\" mean?",
        "options": [
          "يقدّم موعد",
          "جدول أعمال",
          "يؤكد",
          "فترة/موعد متاح"
        ],
        "correctIndex": 3,
        "explanationAr": "\"slot\" /slɑːt/ تعني: فترة/موعد متاح. مثال: a free slot",
        "fromLessonId": "scw_425"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (يسعدني التقدم لوظيفة محلل بيانات في نيوم.)",
          "questionEn": "Complete: I am excited to apply for the Data Analyst ____ at NEOM.",
          "options": [
            "posture",
            "position",
            "post office"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: position. الهيكل: (١) الوظيفة ومن وين عرفتها. (٢) خبراتك مع أرقام وأفعال قوية (led, developed, increased by 30%). (٣) ليش هذي الشركة بالذات. (٤) دعوة للمقابلة. تجنب تكرار السيرة؛ اربطها بمتطلبات الوظيفة."
        },
        {
          "questionAr": "أكمل الفراغ: (أثناء تدريبي طورت لوحة بيانات قللت وقت التقارير ٤٠٪.)",
          "questionEn": "Complete: During my internship, I ____ a dashboard that cut reporting time by 40%.",
          "options": [
            "develop",
            "developing",
            "developed"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: developed. الهيكل: (١) الوظيفة ومن وين عرفتها. (٢) خبراتك مع أرقام وأفعال قوية (led, developed, increased by 30%). (٣) ليش هذي الشركة بالذات. (٤) دعوة للمقابلة. تجنب تكرار السيرة؛ اربطها بمتطلبات الوظيفة."
        },
        {
          "questionAr": "أقوى جملة:",
          "questionEn": "Strongest sentence:",
          "options": [
            "I am very hard-working.",
            "I increased sales by 25% in six months.",
            "I like working."
          ],
          "correctIndex": 1,
          "explanationAr": "إنجاز برقم."
        },
        {
          "questionAr": "ماضي lead:",
          "questionEn": "Past of 'lead':",
          "options": [
            "leaded",
            "led",
            "lead"
          ],
          "correctIndex": 1,
          "explanationAr": "led."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "I led a five-person team to win a national hackathon.",
            "I am a hard-working, passionate team player."
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: I led a five-person team to win a national hackathon. — أثبت الصفة بإنجاز بدل كلام عام."
        }
      ]
    }
  },
  {
    "id": "scw_428",
    "pillarId": "writing",
    "pillarNameAr": "الكتابة التعبيرية الحوارية",
    "pillarNameEn": "Conversational Writing & Quick Messaging",
    "pillarIcon": "✍️",
    "level": "متقدم (Advanced)",
    "levelCode": "B1-B2",
    "titleAr": "مقال الإيجابيات والسلبيات",
    "titleEn": "Writing a For-and-Against Essay",
    "descAr": "اكتب مقالاً متوازناً: مقدمة، فقرة مع، فقرة ضد، خاتمة برأيك.",
    "descEn": "Write a balanced essay: introduction, for, against, conclusion with opinion.",
    "speakingGoalAr": "اكتب مقال من ٢٥٠ كلمة بأربع فقرات.",
    "speakingGoalEn": "Write a 250-word four-paragraph essay.",
    "keyPattern": {
      "ruleAr": "المقدمة: عرّف الموضوع وأشر للجدل (There is much debate about...). فقرة مع: On the one hand, ... Furthermore, ... فقرة ضد: On the other hand, ... Moreover, ... الخاتمة: To conclude, while..., I believe... استخدم لغة غير شخصية (It is often argued that...).",
      "ruleEn": "Intro (debate) → On the one hand / Furthermore → On the other hand / Moreover → To conclude, while..., I believe...",
      "formula": "Intro → For (On the one hand) → Against (On the other hand) → Conclusion (While X, I believe Y)"
    },
    "practicalExamples": [
      {
        "en": "There is much debate about whether university should be free.",
        "ar": "فيه جدل كبير عن مجانية الجامعة."
      },
      {
        "en": "On the one hand, free education gives everyone a chance.",
        "ar": "من جهة، التعليم المجاني يعطي الكل فرصة."
      },
      {
        "en": "On the other hand, it places a heavy burden on the state.",
        "ar": "من جهة أخرى، يحمّل الدولة عبء كبير."
      },
      {
        "en": "Furthermore, it reduces student debt.",
        "ar": "علاوة على ذلك، يقلل ديون الطلاب."
      },
      {
        "en": "It is often argued that free services are less valued.",
        "ar": "كثيراً ما يقال إن الخدمات المجانية أقل تقديراً."
      },
      {
        "en": "To conclude, while there are drawbacks, I believe the benefits are greater.",
        "ar": "ختاماً، رغم العيوب، أعتقد إن الفوائد أكبر."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "In the other hand",
        "correct": "On the other hand",
        "whyAr": "حرف الجر on."
      },
      {
        "incorrect": "Giving your opinion in every paragraph",
        "correct": "Opinion in the conclusion (and maybe intro)",
        "whyAr": "المقال المتوازن يأجل الرأي."
      },
      {
        "incorrect": "I think, I think, I think",
        "correct": "It is argued that... / Many believe...",
        "whyAr": "نوّع ولا تكرر."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اكتب خاتمة لمقال العمل عن بعد.",
      "promptEn": "Write a conclusion for the remote-work essay.",
      "saraQuestionAr": "استخدم To conclude, while..., I believe...",
      "saraQuestionEn": "Use: To conclude, while..., I believe...",
      "recommendedResponseEn": "To conclude, while remote work can weaken teamwork, I believe its benefits outweigh its drawbacks. A hybrid model, with two office days a week, may offer the best of both worlds."
    },
    "quiz": [
      {
        "questionAr": "أكمل: ___ the other hand, ...",
        "questionEn": "Complete: ___ the other hand, ...",
        "options": [
          "In",
          "On",
          "At"
        ],
        "correctIndex": 1,
        "explanationAr": "On."
      },
      {
        "questionAr": "وين الرأي الشخصي في المقال المتوازن؟",
        "questionEn": "Where does your opinion go?",
        "options": [
          "every paragraph",
          "the conclusion",
          "nowhere ever"
        ],
        "correctIndex": 1,
        "explanationAr": "الخاتمة."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "On the other hand",
          "In the other hand"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: On the other hand — حرف الجر on."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Giving your opinion in every paragraph",
          "Opinion in the conclusion (and maybe intro)"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Opinion in the conclusion (and maybe intro) — المقال المتوازن يأجل الرأي."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "It is argued that... / Many believe...",
          "I think, I think, I think"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: It is argued that... / Many believe... — نوّع ولا تكرر."
      }
    ],
    "whiteboardNotes": {
      "title": "Writing a For-and-Against Essay",
      "pointsAr": [
        "ينظم مقال متوازن.",
        "يستخدم أدوات الربط الأكاديمية.",
        "يكتب بلغة غير شخصية.",
        "المقدمة: عرّف الموضوع وأشر للجدل (There is much debate about...). فقرة مع: On the one hand, ... Furthermore, ... فقرة ضد: On the other hand, ... Moreover, ... الخاتمة: To conclude, while..., I believe... استخدم لغة غير شخصية (It is often argued that...)."
      ],
      "pointsEn": [
        "Organise a balanced essay.",
        "Use academic linkers.",
        "Use impersonal language.",
        "Intro (debate) → On the one hand / Furthermore → On the other hand / Moreover → To conclude, while..., I believe..."
      ],
      "chalkHighlight": "Intro → For (On the one hand) → Against (On the other hand) → Conclusion (While X, I believe Y)"
    },
    "unit": 6,
    "cefr": "B2",
    "objectivesAr": [
      "ينظم مقال متوازن.",
      "يستخدم أدوات الربط الأكاديمية.",
      "يكتب بلغة غير شخصية."
    ],
    "objectivesEn": [
      "Organise a balanced essay.",
      "Use academic linkers.",
      "Use impersonal language."
    ],
    "vocabulary": [
      {
        "word": "debate",
        "ipa": "/dɪˈbeɪt/",
        "ar": "جدل/نقاش",
        "exampleEn": "a heated debate",
        "exampleAr": "نقاش حاد"
      },
      {
        "word": "on the one hand",
        "ipa": "/ɑːn ðə wʌn hænd/",
        "ar": "من جهة",
        "exampleEn": "On the one hand, ...",
        "exampleAr": "من جهة، ..."
      },
      {
        "word": "on the other hand",
        "ipa": "/ɑːn ði ˈʌðər hænd/",
        "ar": "من جهة أخرى",
        "exampleEn": "On the other hand, ...",
        "exampleAr": "من جهة أخرى، ..."
      },
      {
        "word": "furthermore",
        "ipa": "/ˈfɜːrðərmɔːr/",
        "ar": "علاوة على ذلك",
        "exampleEn": "Furthermore, ...",
        "exampleAr": "علاوة على ذلك، ..."
      },
      {
        "word": "moreover",
        "ipa": "/mɔːrˈoʊvər/",
        "ar": "بالإضافة",
        "exampleEn": "Moreover, ...",
        "exampleAr": "إضافة لذلك، ..."
      },
      {
        "word": "drawback",
        "ipa": "/ˈdrɔːbæk/",
        "ar": "عيب",
        "exampleEn": "one major drawback",
        "exampleAr": "عيب رئيسي"
      },
      {
        "word": "burden",
        "ipa": "/ˈbɜːrdən/",
        "ar": "عبء",
        "exampleEn": "a financial burden",
        "exampleAr": "عبء مالي"
      },
      {
        "word": "while",
        "ipa": "/waɪl/",
        "ar": "بينما/رغم",
        "exampleEn": "While it's useful, ...",
        "exampleAr": "رغم إنه مفيد، ..."
      },
      {
        "word": "to conclude",
        "ipa": "/tə kənˈkluːd/",
        "ar": "ختاماً",
        "exampleEn": "To conclude, ...",
        "exampleAr": "ختاماً، ..."
      },
      {
        "word": "outweigh",
        "ipa": "/ˌaʊtˈweɪ/",
        "ar": "يفوق",
        "exampleEn": "The benefits outweigh the costs.",
        "exampleAr": "الفوائد تفوق التكاليف."
      }
    ],
    "grammarFocus": {
      "ruleAr": "المقدمة: عرّف الموضوع وأشر للجدل (There is much debate about...). فقرة مع: On the one hand, ... Furthermore, ... فقرة ضد: On the other hand, ... Moreover, ... الخاتمة: To conclude, while..., I believe... استخدم لغة غير شخصية (It is often argued that...).",
      "ruleEn": "Intro (debate) → On the one hand / Furthermore → On the other hand / Moreover → To conclude, while..., I believe...",
      "formula": "Intro → For (On the one hand) → Against (On the other hand) → Conclusion (While X, I believe Y)",
      "examples": [
        {
          "en": "There is much debate about whether university should be free.",
          "ar": "فيه جدل كبير عن مجانية الجامعة."
        },
        {
          "en": "On the one hand, free education gives everyone a chance.",
          "ar": "من جهة، التعليم المجاني يعطي الكل فرصة."
        },
        {
          "en": "On the other hand, it places a heavy burden on the state.",
          "ar": "من جهة أخرى، يحمّل الدولة عبء كبير."
        },
        {
          "en": "Furthermore, it reduces student debt.",
          "ar": "علاوة على ذلك، يقلل ديون الطلاب."
        },
        {
          "en": "It is often argued that free services are less valued.",
          "ar": "كثيراً ما يقال إن الخدمات المجانية أقل تقديراً."
        },
        {
          "en": "To conclude, while there are drawbacks, I believe the benefits are greater.",
          "ar": "ختاماً، رغم العيوب، أعتقد إن الفوائد أكبر."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Sara",
        "en": "Topic: 'Remote work is better than office work.' Introduction?",
        "ar": "الموضوع: العمل عن بعد أفضل. المقدمة؟"
      },
      {
        "speaker": "Student",
        "en": "Since the pandemic, there has been much debate about remote work.",
        "ar": "من الجائحة صار فيه جدل كبير عن العمل عن بعد."
      },
      {
        "speaker": "Sara",
        "en": "One argument for?",
        "ar": "حجة مع؟"
      },
      {
        "speaker": "Student",
        "en": "On the one hand, employees save time on commuting, especially in Riyadh traffic.",
        "ar": "من جهة، الموظفين يوفرون وقت المشوار، خصوصاً مع زحمة الرياض."
      },
      {
        "speaker": "Sara",
        "en": "And against?",
        "ar": "وضد؟"
      },
      {
        "speaker": "Student",
        "en": "On the other hand, teamwork and communication can suffer.",
        "ar": "من جهة أخرى، العمل الجماعي والتواصل ممكن يتأثرون."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Sara: Topic: 'Remote work is better than office work.' Introduction?\nStudent: Since the pandemic, there has been much debate about remote work.\nSara: One argument for?\nStudent: On the one hand, employees save time on commuting, especially in Riyadh traffic.\nSara: And against?\nStudent: On the other hand, teamwork and communication can suffer.",
      "questions": [
        {
          "questionAr": "الموضوع:",
          "questionEn": "The essay topic:",
          "options": [
            "free university",
            "remote work",
            "phones"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: remote work"
        },
        {
          "questionAr": "حجة مع:",
          "questionEn": "Argument for:",
          "options": [
            "saves commuting time",
            "better salary",
            "more meetings"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: saves commuting time"
        },
        {
          "questionAr": "حجة ضد:",
          "questionEn": "Argument against:",
          "options": [
            "traffic",
            "teamwork suffers",
            "cost"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: teamwork suffers"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Signposting aloud",
      "items": [
        "On the ONE hand, ...",
        "On the OTHer hand, ...",
        "To conCLUDE, ..."
      ],
      "tipAr": "في العروض الشفهية هذي العبارات توجه المستمع."
    },
    "exercises": {
      "easy": [
        {
          "id": "scw_428_e1",
          "type": "meaning",
          "promptEn": "What does \"debate\" mean?",
          "promptAr": "ما معنى \"debate\"؟",
          "options": [
            "بينما/رغم",
            "جدل/نقاش",
            "علاوة على ذلك",
            "من جهة"
          ],
          "correctIndex": 1,
          "answer": "جدل/نقاش",
          "explanationAr": "\"debate\" /dɪˈbeɪt/ تعني: جدل/نقاش. مثال: a heated debate"
        },
        {
          "id": "scw_428_e2",
          "type": "meaning",
          "promptEn": "What does \"on the one hand\" mean?",
          "promptAr": "ما معنى \"on the one hand\"؟",
          "options": [
            "من جهة أخرى",
            "جدل/نقاش",
            "من جهة",
            "علاوة على ذلك"
          ],
          "correctIndex": 2,
          "answer": "من جهة",
          "explanationAr": "\"on the one hand\" /ɑːn ðə wʌn hænd/ تعني: من جهة. مثال: On the one hand, ..."
        },
        {
          "id": "scw_428_e3",
          "type": "meaning",
          "promptEn": "What does \"on the other hand\" mean?",
          "promptAr": "ما معنى \"on the other hand\"؟",
          "options": [
            "من جهة أخرى",
            "يفوق",
            "ختاماً",
            "بينما/رغم"
          ],
          "correctIndex": 0,
          "answer": "من جهة أخرى",
          "explanationAr": "\"on the other hand\" /ɑːn ði ˈʌðər hænd/ تعني: من جهة أخرى. مثال: On the other hand, ..."
        },
        {
          "id": "scw_428_e4",
          "type": "meaning",
          "promptEn": "What does \"furthermore\" mean?",
          "promptAr": "ما معنى \"furthermore\"؟",
          "options": [
            "من جهة أخرى",
            "يفوق",
            "علاوة على ذلك",
            "عيب"
          ],
          "correctIndex": 2,
          "answer": "علاوة على ذلك",
          "explanationAr": "\"furthermore\" /ˈfɜːrðərmɔːr/ تعني: علاوة على ذلك. مثال: Furthermore, ..."
        }
      ],
      "medium": [
        {
          "id": "scw_428_m1",
          "type": "gap",
          "promptEn": "Complete: There is much ____ about whether university should be free.",
          "promptAr": "أكمل الفراغ: (فيه جدل كبير عن مجانية الجامعة.)",
          "options": [
            "debate",
            "debater",
            "debating"
          ],
          "correctIndex": 0,
          "answer": "There is much debate about whether university should be free.",
          "explanationAr": "الإجابة: debate. المقدمة: عرّف الموضوع وأشر للجدل (There is much debate about...). فقرة مع: On the one hand, ... Furthermore, ... فقرة ضد: On the other hand, ... Moreover, ... الخاتمة: To conclude, while..., I believe... استخدم لغة غير شخصية (It is often argued that...)."
        },
        {
          "id": "scw_428_m2",
          "type": "gap",
          "promptEn": "Complete: ____, free education gives everyone a chance.",
          "promptAr": "أكمل الفراغ: (من جهة، التعليم المجاني يعطي الكل فرصة.)",
          "options": [
            "On the one hand",
            "On one side hand",
            "In one hand"
          ],
          "correctIndex": 0,
          "answer": "On the one hand, free education gives everyone a chance.",
          "explanationAr": "الإجابة: On the one hand. المقدمة: عرّف الموضوع وأشر للجدل (There is much debate about...). فقرة مع: On the one hand, ... Furthermore, ... فقرة ضد: On the other hand, ... Moreover, ... الخاتمة: To conclude, while..., I believe... استخدم لغة غير شخصية (It is often argued that...)."
        },
        {
          "id": "scw_428_m3",
          "type": "gap",
          "promptEn": "Complete: ____, it places a heavy burden on the state.",
          "promptAr": "أكمل الفراغ: (من جهة أخرى، يحمّل الدولة عبء كبير.)",
          "options": [
            "By other hand",
            "On the other hand",
            "In the other hand"
          ],
          "correctIndex": 1,
          "answer": "On the other hand, it places a heavy burden on the state.",
          "explanationAr": "الإجابة: On the other hand. المقدمة: عرّف الموضوع وأشر للجدل (There is much debate about...). فقرة مع: On the one hand, ... Furthermore, ... فقرة ضد: On the other hand, ... Moreover, ... الخاتمة: To conclude, while..., I believe... استخدم لغة غير شخصية (It is often argued that...)."
        },
        {
          "id": "scw_428_m4",
          "type": "gap",
          "promptEn": "Complete: ____, it reduces student debt.",
          "promptAr": "أكمل الفراغ: (علاوة على ذلك، يقلل ديون الطلاب.)",
          "options": [
            "Further",
            "Furthermore",
            "Furthermost"
          ],
          "correctIndex": 1,
          "answer": "Furthermore, it reduces student debt.",
          "explanationAr": "الإجابة: Furthermore. المقدمة: عرّف الموضوع وأشر للجدل (There is much debate about...). فقرة مع: On the one hand, ... Furthermore, ... فقرة ضد: On the other hand, ... Moreover, ... الخاتمة: To conclude, while..., I believe... استخدم لغة غير شخصية (It is often argued that...)."
        }
      ],
      "hard": [
        {
          "id": "scw_428_h1",
          "type": "order",
          "promptEn": "Put the words in order: valued. / argued / services / less / is / It / are / often / that / free",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (كثيراً ما يقال إن الخدمات المجانية أقل تقديراً.)",
          "answer": "It is often argued that free services are less valued.",
          "explanationAr": "الترتيب الصحيح: It is often argued that free services are less valued."
        },
        {
          "id": "scw_428_h2",
          "type": "order",
          "promptEn": "Put the words in order: are / while / I / are / benefits / To / the / there / believe / conclude, / greater. / drawbacks,",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (ختاماً، رغم العيوب، أعتقد إن الفوائد أكبر.)",
          "answer": "To conclude, while there are drawbacks, I believe the benefits are greater.",
          "explanationAr": "الترتيب الصحيح: To conclude, while there are drawbacks, I believe the benefits are greater."
        },
        {
          "id": "scw_428_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: من جهة، التعليم المجاني يعطي الكل فرصة.",
          "answer": "On the one hand, free education gives everyone a chance.",
          "explanationAr": "ترجمة مقترحة: On the one hand, free education gives everyone a chance."
        },
        {
          "id": "scw_428_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: علاوة على ذلك، يقلل ديون الطلاب.",
          "answer": "Furthermore, it reduces student debt.",
          "explanationAr": "ترجمة مقترحة: Furthermore, it reduces student debt."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Very long sentences joined with 'and'",
        "correct": "Split; use Furthermore / Moreover",
        "whyAr": "الأكاديمي يحب الوضوح."
      },
      {
        "incorrect": "Using 'In the other hand'",
        "correct": "On the other hand",
        "whyAr": "من أشهر أخطاء العرب."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (خطاب التقديم ورسالة LinkedIn المهنية): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Dear Sir, I need a job, please.",
          "Dear Ms Alfaisal, I am writing to apply for..."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Dear Ms Alfaisal, I am writing to apply for... — الأسلوب يركز على قيمتك مو حاجتك.",
        "fromLessonId": "scw_427"
      },
      {
        "questionAr": "مراجعة (ترتيب المواعيد وتغييرها): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Can we bring the meeting forward?",
          "Can we postpone the meeting to before?"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Can we bring the meeting forward? — أقدم = bring forward، أأخر = postpone.",
        "fromLessonId": "scw_425"
      },
      {
        "questionAr": "مراجعة (الأسئلة غير المباشرة في الاستفسار): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Could you tell me when does it start?",
          "Could you tell me when it starts?"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Could you tell me when it starts? — لا تستخدم does في السؤال غير المباشر.",
        "fromLessonId": "scw_422"
      },
      {
        "questionAr": "ما معنى \"objective\"؟",
        "questionEn": "What does \"objective\" mean?",
        "options": [
          "يلخص",
          "يعيد الصياغة",
          "نقطة رئيسية",
          "موضوعي"
        ],
        "correctIndex": 3,
        "explanationAr": "\"objective\" /əbˈdʒɛktɪv/ تعني: موضوعي. مثال: an objective summary",
        "fromLessonId": "scw_426"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (فيه جدل كبير عن مجانية الجامعة.)",
          "questionEn": "Complete: There is much ____ about whether university should be free.",
          "options": [
            "debate",
            "debater",
            "debating"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: debate. المقدمة: عرّف الموضوع وأشر للجدل (There is much debate about...). فقرة مع: On the one hand, ... Furthermore, ... فقرة ضد: On the other hand, ... Moreover, ... الخاتمة: To conclude, while..., I believe... استخدم لغة غير شخصية (It is often argued that...)."
        },
        {
          "questionAr": "أكمل الفراغ: (من جهة، التعليم المجاني يعطي الكل فرصة.)",
          "questionEn": "Complete: ____, free education gives everyone a chance.",
          "options": [
            "On the one hand",
            "On one side hand",
            "In one hand"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: On the one hand. المقدمة: عرّف الموضوع وأشر للجدل (There is much debate about...). فقرة مع: On the one hand, ... Furthermore, ... فقرة ضد: On the other hand, ... Moreover, ... الخاتمة: To conclude, while..., I believe... استخدم لغة غير شخصية (It is often argued that...)."
        },
        {
          "questionAr": "أكمل: ___ the other hand, ...",
          "questionEn": "Complete: ___ the other hand, ...",
          "options": [
            "In",
            "On",
            "At"
          ],
          "correctIndex": 1,
          "explanationAr": "On."
        },
        {
          "questionAr": "وين الرأي الشخصي في المقال المتوازن؟",
          "questionEn": "Where does your opinion go?",
          "options": [
            "every paragraph",
            "the conclusion",
            "nowhere ever"
          ],
          "correctIndex": 1,
          "explanationAr": "الخاتمة."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "On the other hand",
            "In the other hand"
          ],
          "correctIndex": 0,
          "explanationAr": "الصحيح: On the other hand — حرف الجر on."
        }
      ]
    }
  },
  {
    "id": "scw_429",
    "pillarId": "writing",
    "pillarNameAr": "الكتابة التعبيرية الحوارية",
    "pillarNameEn": "Conversational Writing & Quick Messaging",
    "pillarIcon": "✍️",
    "level": "متقدم (Advanced)",
    "levelCode": "B1-B2",
    "titleAr": "كتابة تقرير مختصر",
    "titleEn": "Writing a Short Report",
    "descAr": "اكتب تقرير بعناوين: الهدف، النتائج، التوصيات، بلغة موضوعية.",
    "descEn": "Write a report with headings: aim, findings, recommendations, in objective language.",
    "speakingGoalAr": "اكتب تقرير من ٢٠٠ كلمة عن استبيان.",
    "speakingGoalEn": "Write a 200-word survey report.",
    "keyPattern": {
      "ruleAr": "العناوين: Introduction / Findings / Recommendations. لغة موضوعية: The survey shows that..., 65% of students..., It is recommended that... استخدم المبني للمجهول (A survey was carried out) والنسب (the majority, a minority, nearly half).",
      "ruleEn": "Headings; objective language; passive (A survey was carried out); quantity words (the majority, nearly half); It is recommended that...",
      "formula": "Introduction (aim + method) → Findings (figures) → Recommendations (It is recommended that...)"
    },
    "practicalExamples": [
      {
        "en": "A survey was carried out among 200 students.",
        "ar": "أُجري استبيان على ٢٠٠ طالب."
      },
      {
        "en": "The majority of students prefer online lessons.",
        "ar": "أغلب الطلاب يفضلون الدروس أونلاين."
      },
      {
        "en": "Nearly half said the library closes too early.",
        "ar": "قرابة النصف قالوا المكتبة تقفل بدري."
      },
      {
        "en": "It is recommended that the café open longer.",
        "ar": "يُوصى بأن يفتح الكافيه لوقت أطول."
      },
      {
        "en": "Only a small minority were dissatisfied.",
        "ar": "فقط أقلية صغيرة غير راضين."
      },
      {
        "en": "The aim of this report is to evaluate campus facilities.",
        "ar": "هدف هذا التقرير تقييم مرافق الحرم."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "I asked 200 students and they told me...",
        "correct": "A survey was carried out among 200 students.",
        "whyAr": "التقرير غير شخصي."
      },
      {
        "incorrect": "Most of students",
        "correct": "Most students / The majority of students",
        "whyAr": "most بدون of مع الجمع العام."
      },
      {
        "incorrect": "Very many people liked it.",
        "correct": "72% of respondents were satisfied.",
        "whyAr": "استخدم أرقام دقيقة."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اكتب قسم التوصيات لتقرير عن مكتبة المدرسة.",
      "promptEn": "Write the Recommendations section for a school library report.",
      "saraQuestionAr": "اكتب توصيتين بلغة التقارير.",
      "saraQuestionEn": "Write two recommendations in report style.",
      "recommendedResponseEn": "Recommendations: Based on these findings, it is recommended that the library extend its opening hours until 6 p.m. In addition, more quiet study rooms should be provided, as 45% of respondents found the main hall too noisy."
    },
    "quiz": [
      {
        "questionAr": "أنسب صياغة للتقرير:",
        "questionEn": "Most report-like:",
        "options": [
          "I saw that many people...",
          "The survey shows that 70% of respondents...",
          "Lots of guys said..."
        ],
        "correctIndex": 1,
        "explanationAr": "موضوعي بالأرقام."
      },
      {
        "questionAr": "أكمل: It is ___ that the gym open earlier.",
        "questionEn": "Complete: It is ___ that the gym open earlier.",
        "options": [
          "recommend",
          "recommended",
          "recommending"
        ],
        "correctIndex": 1,
        "explanationAr": "مبني للمجهول."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I asked 200 students and they told me...",
          "A survey was carried out among 200 students."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: A survey was carried out among 200 students. — التقرير غير شخصي."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Most of students",
          "Most students / The majority of students"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Most students / The majority of students — most بدون of مع الجمع العام."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "72% of respondents were satisfied.",
          "Very many people liked it."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: 72% of respondents were satisfied. — استخدم أرقام دقيقة."
      }
    ],
    "whiteboardNotes": {
      "title": "Writing a Short Report",
      "pointsAr": [
        "يكتب تقرير بعناوين.",
        "يعرض الأرقام بدقة.",
        "يقدم توصيات.",
        "العناوين: Introduction / Findings / Recommendations. لغة موضوعية: The survey shows that..., 65% of students..., It is recommended that... استخدم المبني للمجهول (A survey was carried out) والنسب (the majority, a minority, nearly half)."
      ],
      "pointsEn": [
        "Write a report with headings.",
        "Present figures accurately.",
        "Make recommendations.",
        "Headings; objective language; passive (A survey was carried out); quantity words (the majority, nearly half); It is recommended that..."
      ],
      "chalkHighlight": "Introduction (aim + method) → Findings (figures) → Recommendations (It is recommended that...)"
    },
    "unit": 6,
    "cefr": "B2",
    "objectivesAr": [
      "يكتب تقرير بعناوين.",
      "يعرض الأرقام بدقة.",
      "يقدم توصيات."
    ],
    "objectivesEn": [
      "Write a report with headings.",
      "Present figures accurately.",
      "Make recommendations."
    ],
    "vocabulary": [
      {
        "word": "report",
        "ipa": "/rɪˈpɔːrt/",
        "ar": "تقرير",
        "exampleEn": "write a report",
        "exampleAr": "يكتب تقرير"
      },
      {
        "word": "survey",
        "ipa": "/ˈsɜːrveɪ/",
        "ar": "استبيان",
        "exampleEn": "conduct a survey",
        "exampleAr": "يجري استبيان"
      },
      {
        "word": "findings",
        "ipa": "/ˈfaɪndɪŋz/",
        "ar": "نتائج",
        "exampleEn": "key findings",
        "exampleAr": "النتائج الرئيسية"
      },
      {
        "word": "majority",
        "ipa": "/məˈdʒɔːrəti/",
        "ar": "أغلبية",
        "exampleEn": "the vast majority",
        "exampleAr": "الأغلبية العظمى"
      },
      {
        "word": "minority",
        "ipa": "/maɪˈnɔːrəti/",
        "ar": "أقلية",
        "exampleEn": "a small minority",
        "exampleAr": "أقلية صغيرة"
      },
      {
        "word": "respondent",
        "ipa": "/rɪˈspɑːndənt/",
        "ar": "مشارك في الاستبيان",
        "exampleEn": "60% of respondents",
        "exampleAr": "٦٠٪ من المشاركين"
      },
      {
        "word": "recommendation",
        "ipa": "/ˌrɛkəmɛnˈdeɪʃən/",
        "ar": "توصية",
        "exampleEn": "make recommendations",
        "exampleAr": "يقدم توصيات"
      },
      {
        "word": "facility",
        "ipa": "/fəˈsɪləti/",
        "ar": "مرفق",
        "exampleEn": "sports facilities",
        "exampleAr": "مرافق رياضية"
      },
      {
        "word": "evaluate",
        "ipa": "/ɪˈvæljueɪt/",
        "ar": "يقيّم",
        "exampleEn": "evaluate the service",
        "exampleAr": "يقيّم الخدمة"
      },
      {
        "word": "carry out",
        "ipa": "/ˈkæri aʊt/",
        "ar": "يُجري/ينفذ",
        "exampleEn": "carry out research",
        "exampleAr": "يجري بحث"
      }
    ],
    "grammarFocus": {
      "ruleAr": "العناوين: Introduction / Findings / Recommendations. لغة موضوعية: The survey shows that..., 65% of students..., It is recommended that... استخدم المبني للمجهول (A survey was carried out) والنسب (the majority, a minority, nearly half).",
      "ruleEn": "Headings; objective language; passive (A survey was carried out); quantity words (the majority, nearly half); It is recommended that...",
      "formula": "Introduction (aim + method) → Findings (figures) → Recommendations (It is recommended that...)",
      "examples": [
        {
          "en": "A survey was carried out among 200 students.",
          "ar": "أُجري استبيان على ٢٠٠ طالب."
        },
        {
          "en": "The majority of students prefer online lessons.",
          "ar": "أغلب الطلاب يفضلون الدروس أونلاين."
        },
        {
          "en": "Nearly half said the library closes too early.",
          "ar": "قرابة النصف قالوا المكتبة تقفل بدري."
        },
        {
          "en": "It is recommended that the café open longer.",
          "ar": "يُوصى بأن يفتح الكافيه لوقت أطول."
        },
        {
          "en": "Only a small minority were dissatisfied.",
          "ar": "فقط أقلية صغيرة غير راضين."
        },
        {
          "en": "The aim of this report is to evaluate campus facilities.",
          "ar": "هدف هذا التقرير تقييم مرافق الحرم."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Report",
        "en": "Introduction: The aim of this report is to evaluate student satisfaction with the college café.",
        "ar": "المقدمة: هدف التقرير تقييم رضا الطلاب عن كافيه الكلية."
      },
      {
        "speaker": "Report",
        "en": "A survey was carried out among 150 students.",
        "ar": "أُجري استبيان على ١٥٠ طالب."
      },
      {
        "speaker": "Report",
        "en": "Findings: The majority (68%) were happy with the prices.",
        "ar": "النتائج: الأغلبية (٦٨٪) راضين عن الأسعار."
      },
      {
        "speaker": "Report",
        "en": "However, nearly half complained about long queues at lunchtime.",
        "ar": "لكن قرابة النصف اشتكوا من الطوابير وقت الغداء."
      },
      {
        "speaker": "Report",
        "en": "Recommendations: It is recommended that a second counter be opened.",
        "ar": "التوصيات: يُوصى بفتح كاونتر ثاني."
      },
      {
        "speaker": "Report",
        "en": "A mobile pre-order system should also be considered.",
        "ar": "ويُنظر في نظام طلب مسبق بالجوال."
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Report: Introduction: The aim of this report is to evaluate student satisfaction with the college café.\nReport: A survey was carried out among 150 students.\nReport: Findings: The majority (68%) were happy with the prices.\nReport: However, nearly half complained about long queues at lunchtime.\nReport: Recommendations: It is recommended that a second counter be opened.\nReport: A mobile pre-order system should also be considered.",
      "questions": [
        {
          "questionAr": "كم طالب؟",
          "questionEn": "How many students?",
          "options": [
            "100",
            "150",
            "200"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: 150"
        },
        {
          "questionAr": "نسبة الرضا عن الأسعار:",
          "questionEn": "% happy with prices:",
          "options": [
            "48%",
            "58%",
            "68%"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: 68%"
        },
        {
          "questionAr": "الشكوى الرئيسية:",
          "questionEn": "Main complaint:",
          "options": [
            "prices",
            "long queues",
            "food quality"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: long queues"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Saying percentages and numbers",
      "items": [
        "68% = sixty-eight percent /pərˈsɛnt/",
        "the majority /məˈdʒɔːrəti/"
      ],
      "tipAr": "percent النبر على CENT."
    },
    "exercises": {
      "easy": [
        {
          "id": "scw_429_e1",
          "type": "meaning",
          "promptEn": "What does \"report\" mean?",
          "promptAr": "ما معنى \"report\"؟",
          "options": [
            "تقرير",
            "أقلية",
            "يُجري/ينفذ",
            "استبيان"
          ],
          "correctIndex": 0,
          "answer": "تقرير",
          "explanationAr": "\"report\" /rɪˈpɔːrt/ تعني: تقرير. مثال: write a report"
        },
        {
          "id": "scw_429_e2",
          "type": "meaning",
          "promptEn": "What does \"survey\" mean?",
          "promptAr": "ما معنى \"survey\"؟",
          "options": [
            "تقرير",
            "استبيان",
            "يقيّم",
            "نتائج"
          ],
          "correctIndex": 1,
          "answer": "استبيان",
          "explanationAr": "\"survey\" /ˈsɜːrveɪ/ تعني: استبيان. مثال: conduct a survey"
        },
        {
          "id": "scw_429_e3",
          "type": "meaning",
          "promptEn": "What does \"findings\" mean?",
          "promptAr": "ما معنى \"findings\"؟",
          "options": [
            "استبيان",
            "توصية",
            "أغلبية",
            "نتائج"
          ],
          "correctIndex": 3,
          "answer": "نتائج",
          "explanationAr": "\"findings\" /ˈfaɪndɪŋz/ تعني: نتائج. مثال: key findings"
        },
        {
          "id": "scw_429_e4",
          "type": "meaning",
          "promptEn": "What does \"majority\" mean?",
          "promptAr": "ما معنى \"majority\"؟",
          "options": [
            "مرفق",
            "توصية",
            "أغلبية",
            "استبيان"
          ],
          "correctIndex": 2,
          "answer": "أغلبية",
          "explanationAr": "\"majority\" /məˈdʒɔːrəti/ تعني: أغلبية. مثال: the vast majority"
        }
      ],
      "medium": [
        {
          "id": "scw_429_m1",
          "type": "gap",
          "promptEn": "Complete: A survey was ____ among 200 students.",
          "promptAr": "أكمل الفراغ: (أُجري استبيان على ٢٠٠ طالب.)",
          "options": [
            "carried off",
            "carry out",
            "carried out"
          ],
          "correctIndex": 2,
          "answer": "A survey was carried out among 200 students.",
          "explanationAr": "الإجابة: carried out. العناوين: Introduction / Findings / Recommendations. لغة موضوعية: The survey shows that..., 65% of students..., It is recommended that... استخدم المبني للمجهول (A survey was carried out) والنسب (the majority, a minority, nearly half)."
        },
        {
          "id": "scw_429_m2",
          "type": "gap",
          "promptEn": "Complete: The ____ of students prefer online lessons.",
          "promptAr": "أكمل الفراغ: (أغلب الطلاب يفضلون الدروس أونلاين.)",
          "options": [
            "major",
            "majority",
            "most of the"
          ],
          "correctIndex": 1,
          "answer": "The majority of students prefer online lessons.",
          "explanationAr": "الإجابة: majority. العناوين: Introduction / Findings / Recommendations. لغة موضوعية: The survey shows that..., 65% of students..., It is recommended that... استخدم المبني للمجهول (A survey was carried out) والنسب (the majority, a minority, nearly half)."
        },
        {
          "id": "scw_429_m3",
          "type": "gap",
          "promptEn": "Complete: ____ half said the library closes too early.",
          "promptAr": "أكمل الفراغ: (قرابة النصف قالوا المكتبة تقفل بدري.)",
          "options": [
            "Nearly",
            "Nearby",
            "Near"
          ],
          "correctIndex": 0,
          "answer": "Nearly half said the library closes too early.",
          "explanationAr": "الإجابة: Nearly. العناوين: Introduction / Findings / Recommendations. لغة موضوعية: The survey shows that..., 65% of students..., It is recommended that... استخدم المبني للمجهول (A survey was carried out) والنسب (the majority, a minority, nearly half)."
        },
        {
          "id": "scw_429_m4",
          "type": "gap",
          "promptEn": "Complete: It is ____ that the café open longer.",
          "promptAr": "أكمل الفراغ: (يُوصى بأن يفتح الكافيه لوقت أطول.)",
          "options": [
            "recommended",
            "recommend",
            "recommending"
          ],
          "correctIndex": 0,
          "answer": "It is recommended that the café open longer.",
          "explanationAr": "الإجابة: recommended. العناوين: Introduction / Findings / Recommendations. لغة موضوعية: The survey shows that..., 65% of students..., It is recommended that... استخدم المبني للمجهول (A survey was carried out) والنسب (the majority, a minority, nearly half)."
        }
      ],
      "hard": [
        {
          "id": "scw_429_h1",
          "type": "order",
          "promptEn": "Put the words in order: Only / dissatisfied. / were / minority / a / small",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (فقط أقلية صغيرة غير راضين.)",
          "answer": "Only a small minority were dissatisfied.",
          "explanationAr": "الترتيب الصحيح: Only a small minority were dissatisfied."
        },
        {
          "id": "scw_429_h2",
          "type": "order",
          "promptEn": "Put the words in order: campus / The / to / report / is / evaluate / of / this / facilities. / aim",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (هدف هذا التقرير تقييم مرافق الحرم.)",
          "answer": "The aim of this report is to evaluate campus facilities.",
          "explanationAr": "الترتيب الصحيح: The aim of this report is to evaluate campus facilities."
        },
        {
          "id": "scw_429_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أغلب الطلاب يفضلون الدروس أونلاين.",
          "answer": "The majority of students prefer online lessons.",
          "explanationAr": "ترجمة مقترحة: The majority of students prefer online lessons."
        },
        {
          "id": "scw_429_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: يُوصى بأن يفتح الكافيه لوقت أطول.",
          "answer": "It is recommended that the café open longer.",
          "explanationAr": "ترجمة مقترحة: It is recommended that the café open longer."
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Writing a report like a story",
        "correct": "Headings + bullet-like clarity",
        "whyAr": "التقرير للقراءة السريعة."
      },
      {
        "incorrect": "Personal 'I think' in findings",
        "correct": "The data shows...",
        "whyAr": "النتائج حقائق."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (مقال الإيجابيات والسلبيات): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Opinion in the conclusion (and maybe intro)",
          "Giving your opinion in every paragraph"
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: Opinion in the conclusion (and maybe intro) — المقال المتوازن يأجل الرأي.",
        "fromLessonId": "scw_428"
      },
      {
        "questionAr": "مراجعة (كتابة الملخص): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Copying whole sentences from the text",
          "Paraphrase in your own words"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Paraphrase in your own words — النسخ مو تلخيص.",
        "fromLessonId": "scw_426"
      },
      {
        "questionAr": "مراجعة (فقرة رأي مدعومة بالأسباب): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "In my opinion, I think...",
          "In my opinion, ... / I think..."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: In my opinion, ... / I think... — لا تجمعهم، نفس المعنى.",
        "fromLessonId": "scw_423"
      },
      {
        "questionAr": "ما معنى \"connect\"؟",
        "questionEn": "What does \"connect\" mean?",
        "options": [
          "قاد (ماضي)",
          "فرصة",
          "يتواصل",
          "ذو صلة"
        ],
        "correctIndex": 2,
        "explanationAr": "\"connect\" /kəˈnɛkt/ تعني: يتواصل. مثال: I'd love to connect.",
        "fromLessonId": "scw_427"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (أُجري استبيان على ٢٠٠ طالب.)",
          "questionEn": "Complete: A survey was ____ among 200 students.",
          "options": [
            "carried off",
            "carry out",
            "carried out"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: carried out. العناوين: Introduction / Findings / Recommendations. لغة موضوعية: The survey shows that..., 65% of students..., It is recommended that... استخدم المبني للمجهول (A survey was carried out) والنسب (the majority, a minority, nearly half)."
        },
        {
          "questionAr": "أكمل الفراغ: (أغلب الطلاب يفضلون الدروس أونلاين.)",
          "questionEn": "Complete: The ____ of students prefer online lessons.",
          "options": [
            "major",
            "majority",
            "most of the"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: majority. العناوين: Introduction / Findings / Recommendations. لغة موضوعية: The survey shows that..., 65% of students..., It is recommended that... استخدم المبني للمجهول (A survey was carried out) والنسب (the majority, a minority, nearly half)."
        },
        {
          "questionAr": "أنسب صياغة للتقرير:",
          "questionEn": "Most report-like:",
          "options": [
            "I saw that many people...",
            "The survey shows that 70% of respondents...",
            "Lots of guys said..."
          ],
          "correctIndex": 1,
          "explanationAr": "موضوعي بالأرقام."
        },
        {
          "questionAr": "أكمل: It is ___ that the gym open earlier.",
          "questionEn": "Complete: It is ___ that the gym open earlier.",
          "options": [
            "recommend",
            "recommended",
            "recommending"
          ],
          "correctIndex": 1,
          "explanationAr": "مبني للمجهول."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "I asked 200 students and they told me...",
            "A survey was carried out among 200 students."
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: A survey was carried out among 200 students. — التقرير غير شخصي."
        }
      ]
    }
  },
  {
    "id": "scw_430",
    "pillarId": "writing",
    "pillarNameAr": "الكتابة التعبيرية الحوارية",
    "pillarNameEn": "Conversational Writing & Quick Messaging",
    "pillarIcon": "✍️",
    "level": "متقدم (Advanced)",
    "levelCode": "B1-B2",
    "titleAr": "المراجعة والتدقيق: الكتابة المقنعة النهائية",
    "titleEn": "Editing, Proofreading and Persuasive Posts",
    "descAr": "راجع نصك مثل المحترفين: الوضوح، الإيجاز، القواعد، ثم اكتب بوست مقنع.",
    "descEn": "Edit like a professional: clarity, concision, grammar; then write a persuasive post.",
    "speakingGoalAr": "حرّر نصاً من ١٥٠ كلمة إلى ١٠٠ كلمة أوضح، واكتب بوست مقنع.",
    "speakingGoalEn": "Cut a 150-word draft to a clearer 100 words and write a persuasive post.",
    "keyPattern": {
      "ruleAr": "قائمة المراجعة: (١) الفكرة واضحة من أول سطر؟ (٢) احذف الكلمات الزائدة (in order to → to، due to the fact that → because). (٣) فعل قوي بدل اسم (make a decision → decide). (٤) فاعل-فعل-مفعول. (٥) راجع: s الفعل، المفرد/الجمع، الأزمنة، homophones. الإقناع: سؤال جذاب + فائدة + دليل + دعوة للعمل.",
      "ruleEn": "Checklist: clear first line, cut wordiness, strong verbs, active voice, grammar checks. Persuasion: hook + benefit + evidence + call to action.",
      "formula": "Draft → Cut (wordy → concise) → Check (grammar/spelling) → Hook + Benefit + Proof + CTA"
    },
    "practicalExamples": [
      {
        "en": "We decided to launch the app.",
        "ar": "قررنا نطلق التطبيق."
      },
      {
        "en": "I'm writing to invite you.",
        "ar": "أكتب لأدعوك."
      },
      {
        "en": "We cancelled the event because it rained.",
        "ar": "ألغينا الفعالية لأنها مطرت."
      },
      {
        "en": "Join us this Thursday and learn something new!",
        "ar": "انضم لنا هالخميس وتعلم شي جديد!"
      },
      {
        "en": "Over 500 students have already signed up.",
        "ar": "أكثر من ٥٠٠ طالب سجلوا."
      },
      {
        "en": "Don't miss out — register today.",
        "ar": "لا تفوتها — سجّل اليوم."
      }
    ],
    "commonMistakes": [
      {
        "incorrect": "At this point in time",
        "correct": "Now",
        "whyAr": "اختصر."
      },
      {
        "incorrect": "The decision was made by the team to...",
        "correct": "The team decided to...",
        "whyAr": "المبني للمعلوم أوضح وأقوى."
      },
      {
        "incorrect": "Each of the students have...",
        "correct": "Each of the students has...",
        "whyAr": "each مفرد."
      }
    ],
    "speakingChallenge": {
      "promptAr": "اكتب بوست مقنع لدورة إنجليزي في الأكاديمية.",
      "promptEn": "Write a persuasive post for the academy's English course.",
      "saraQuestionAr": "استخدم: جذب + فائدة + دليل + دعوة.",
      "saraQuestionEn": "Use: hook + benefit + evidence + call to action.",
      "recommendedResponseEn": "Want to speak English with confidence in just 12 weeks? Our course gives you live practice with Sara, real-life lessons and instant feedback. Last term, 9 out of 10 students moved up a full level. Places are limited — join today!"
    },
    "quiz": [
      {
        "questionAr": "الأوجز:",
        "questionEn": "Most concise:",
        "options": [
          "in order to",
          "to",
          "so as in order to"
        ],
        "correctIndex": 1,
        "explanationAr": "to."
      },
      {
        "questionAr": "بداية جذابة لبوست:",
        "questionEn": "Best hook:",
        "options": [
          "This is a post.",
          "Tired of wasting time on your phone?",
          "Hello everyone, I am writing..."
        ],
        "correctIndex": 1,
        "explanationAr": "سؤال يمس القارئ."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "At this point in time",
          "Now"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Now — اختصر."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "The decision was made by the team to...",
          "The team decided to..."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: The team decided to... — المبني للمعلوم أوضح وأقوى."
      },
      {
        "questionAr": "أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Each of the students have...",
          "Each of the students has..."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Each of the students has... — each مفرد."
      }
    ],
    "whiteboardNotes": {
      "title": "Editing, Proofreading and Persuasive Posts",
      "pointsAr": [
        "يختصر الكلام الزائد.",
        "يكتشف أخطاءه الشائعة.",
        "يكتب نصاً مقنعاً.",
        "قائمة المراجعة: (١) الفكرة واضحة من أول سطر؟ (٢) احذف الكلمات الزائدة (in order to → to، due to the fact that → because). (٣) فعل قوي بدل اسم (make a decision → decide). (٤) فاعل-فعل-مفعول. (٥) راجع: s الفعل، المفرد/الجمع، الأزمنة، homophones. الإقناع: سؤال جذاب + فائدة + دليل + دعوة للعمل."
      ],
      "pointsEn": [
        "Cut wordiness.",
        "Spot his own common errors.",
        "Write persuasively.",
        "Checklist: clear first line, cut wordiness, strong verbs, active voice, grammar checks. Persuasion: hook + benefit + evidence + call to action."
      ],
      "chalkHighlight": "Draft → Cut (wordy → concise) → Check (grammar/spelling) → Hook + Benefit + Proof + CTA"
    },
    "unit": 6,
    "cefr": "B2",
    "objectivesAr": [
      "يختصر الكلام الزائد.",
      "يكتشف أخطاءه الشائعة.",
      "يكتب نصاً مقنعاً."
    ],
    "objectivesEn": [
      "Cut wordiness.",
      "Spot his own common errors.",
      "Write persuasively."
    ],
    "vocabulary": [
      {
        "word": "proofread",
        "ipa": "/ˈpruːfriːd/",
        "ar": "يدقق لغوياً",
        "exampleEn": "proofread your email",
        "exampleAr": "دقق إيميلك"
      },
      {
        "word": "edit",
        "ipa": "/ˈɛdɪt/",
        "ar": "يحرر",
        "exampleEn": "edit the draft",
        "exampleAr": "حرر المسودة"
      },
      {
        "word": "draft",
        "ipa": "/dræft/",
        "ar": "مسودة",
        "exampleEn": "a first draft",
        "exampleAr": "المسودة الأولى"
      },
      {
        "word": "concise",
        "ipa": "/kənˈsaɪs/",
        "ar": "موجز",
        "exampleEn": "clear and concise",
        "exampleAr": "واضح وموجز"
      },
      {
        "word": "wordy",
        "ipa": "/ˈwɜːrdi/",
        "ar": "حشو/مطوّل",
        "exampleEn": "too wordy",
        "exampleAr": "فيه حشو"
      },
      {
        "word": "persuasive",
        "ipa": "/pərˈsweɪsɪv/",
        "ar": "مقنع",
        "exampleEn": "a persuasive post",
        "exampleAr": "بوست مقنع"
      },
      {
        "word": "hook",
        "ipa": "/hʊk/",
        "ar": "جملة جذب",
        "exampleEn": "start with a hook",
        "exampleAr": "ابدأ بجملة جذابة"
      },
      {
        "word": "call to action",
        "ipa": "/ˌkɔːl tu ˈækʃən/",
        "ar": "دعوة لاتخاذ إجراء",
        "exampleEn": "a clear call to action",
        "exampleAr": "دعوة واضحة"
      },
      {
        "word": "evidence",
        "ipa": "/ˈɛvɪdəns/",
        "ar": "دليل",
        "exampleEn": "strong evidence",
        "exampleAr": "دليل قوي"
      },
      {
        "word": "sign up",
        "ipa": "/saɪn ʌp/",
        "ar": "يسجل",
        "exampleEn": "sign up now",
        "exampleAr": "سجّل الحين"
      }
    ],
    "grammarFocus": {
      "ruleAr": "قائمة المراجعة: (١) الفكرة واضحة من أول سطر؟ (٢) احذف الكلمات الزائدة (in order to → to، due to the fact that → because). (٣) فعل قوي بدل اسم (make a decision → decide). (٤) فاعل-فعل-مفعول. (٥) راجع: s الفعل، المفرد/الجمع، الأزمنة، homophones. الإقناع: سؤال جذاب + فائدة + دليل + دعوة للعمل.",
      "ruleEn": "Checklist: clear first line, cut wordiness, strong verbs, active voice, grammar checks. Persuasion: hook + benefit + evidence + call to action.",
      "formula": "Draft → Cut (wordy → concise) → Check (grammar/spelling) → Hook + Benefit + Proof + CTA",
      "examples": [
        {
          "en": "We decided to launch the app.",
          "ar": "قررنا نطلق التطبيق."
        },
        {
          "en": "I'm writing to invite you.",
          "ar": "أكتب لأدعوك."
        },
        {
          "en": "We cancelled the event because it rained.",
          "ar": "ألغينا الفعالية لأنها مطرت."
        },
        {
          "en": "Join us this Thursday and learn something new!",
          "ar": "انضم لنا هالخميس وتعلم شي جديد!"
        },
        {
          "en": "Over 500 students have already signed up.",
          "ar": "أكثر من ٥٠٠ طالب سجلوا."
        },
        {
          "en": "Don't miss out — register today.",
          "ar": "لا تفوتها — سجّل اليوم."
        }
      ]
    },
    "modelDialogue": [
      {
        "speaker": "Draft",
        "en": "Due to the fact that we are of the opinion that reading is important, we have made a decision to start a club.",
        "ar": "(مسودة فيها حشو)"
      },
      {
        "speaker": "Edit",
        "en": "Because we believe reading matters, we decided to start a club.",
        "ar": "التحرير"
      },
      {
        "speaker": "Sara",
        "en": "Much better! Now make it a persuasive post.",
        "ar": "أحسن بكثير! الحين خلها بوست مقنع."
      },
      {
        "speaker": "Post",
        "en": "Want to read more but never find the time?",
        "ar": "تبي تقرأ أكثر بس ما تلقى وقت؟"
      },
      {
        "speaker": "Post",
        "en": "Our new book club meets every Thursday for just 45 minutes. Last month, members finished an average of three books.",
        "ar": "نادينا الجديد يجتمع كل خميس ٤٥ دقيقة بس. الشهر اللي فات الأعضاء خلصوا ٣ كتب بالمتوسط."
      },
      {
        "speaker": "Post",
        "en": "Spaces are limited — sign up today!",
        "ar": "الأماكن محدودة — سجّل اليوم!"
      }
    ],
    "listeningTask": {
      "instructionsAr": "استمع للحوار من سارة (أو اقرأه بصوت عالٍ) ثم أجب عن الأسئلة.",
      "script": "Draft: Due to the fact that we are of the opinion that reading is important, we have made a decision to start a club.\nEdit: Because we believe reading matters, we decided to start a club.\nSara: Much better! Now make it a persuasive post.\nPost: Want to read more but never find the time?\nPost: Our new book club meets every Thursday for just 45 minutes. Last month, members finished an average of three books.\nPost: Spaces are limited — sign up today!",
      "questions": [
        {
          "questionAr": "صارت:",
          "questionEn": "'Due to the fact that' became:",
          "options": [
            "Since then",
            "Because",
            "Although"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: Because"
        },
        {
          "questionAr": "مدة الاجتماع:",
          "questionEn": "How long are meetings?",
          "options": [
            "30 min",
            "45 min",
            "1 hour"
          ],
          "correctIndex": 1,
          "explanationAr": "الإجابة: 45 min"
        },
        {
          "questionAr": "الدليل:",
          "questionEn": "The proof used:",
          "options": [
            "3 books average",
            "500 members",
            "free coffee"
          ],
          "correctIndex": 0,
          "explanationAr": "الإجابة: 3 books average"
        }
      ]
    },
    "pronunciationFocus": {
      "focus": "Read your draft aloud",
      "items": [
        "Where you stumble = rewrite",
        "Where you run out of breath = split the sentence"
      ],
      "tipAr": "القراءة بصوت أسرع طريقة للتدقيق."
    },
    "exercises": {
      "easy": [
        {
          "id": "scw_430_e1",
          "type": "meaning",
          "promptEn": "What does \"proofread\" mean?",
          "promptAr": "ما معنى \"proofread\"؟",
          "options": [
            "حشو/مطوّل",
            "يدقق لغوياً",
            "يسجل",
            "موجز"
          ],
          "correctIndex": 1,
          "answer": "يدقق لغوياً",
          "explanationAr": "\"proofread\" /ˈpruːfriːd/ تعني: يدقق لغوياً. مثال: proofread your email"
        },
        {
          "id": "scw_430_e2",
          "type": "meaning",
          "promptEn": "What does \"edit\" mean?",
          "promptAr": "ما معنى \"edit\"؟",
          "options": [
            "مقنع",
            "مسودة",
            "يسجل",
            "يحرر"
          ],
          "correctIndex": 3,
          "answer": "يحرر",
          "explanationAr": "\"edit\" /ˈɛdɪt/ تعني: يحرر. مثال: edit the draft"
        },
        {
          "id": "scw_430_e3",
          "type": "meaning",
          "promptEn": "What does \"draft\" mean?",
          "promptAr": "ما معنى \"draft\"؟",
          "options": [
            "دعوة لاتخاذ إجراء",
            "يحرر",
            "دليل",
            "مسودة"
          ],
          "correctIndex": 3,
          "answer": "مسودة",
          "explanationAr": "\"draft\" /dræft/ تعني: مسودة. مثال: a first draft"
        },
        {
          "id": "scw_430_e4",
          "type": "meaning",
          "promptEn": "What does \"concise\" mean?",
          "promptAr": "ما معنى \"concise\"؟",
          "options": [
            "موجز",
            "دليل",
            "مقنع",
            "دعوة لاتخاذ إجراء"
          ],
          "correctIndex": 0,
          "answer": "موجز",
          "explanationAr": "\"concise\" /kənˈsaɪs/ تعني: موجز. مثال: clear and concise"
        }
      ],
      "medium": [
        {
          "id": "scw_430_m1",
          "type": "gap",
          "promptEn": "Complete: We ____ to launch the app.",
          "promptAr": "أكمل الفراغ: (قررنا نطلق التطبيق.)",
          "options": [
            "made a decision",
            "decision",
            "decided"
          ],
          "correctIndex": 2,
          "answer": "We decided to launch the app.",
          "explanationAr": "الإجابة: decided. قائمة المراجعة: (١) الفكرة واضحة من أول سطر؟ (٢) احذف الكلمات الزائدة (in order to → to، due to the fact that → because). (٣) فعل قوي بدل اسم (make a decision → decide). (٤) فاعل-فعل-مفعول. (٥) راجع: s الفعل، المفرد/الجمع، الأزمنة، homophones. الإقناع: سؤال جذاب + فائدة + دليل + دعوة للعمل."
        },
        {
          "id": "scw_430_m2",
          "type": "gap",
          "promptEn": "Complete: I'm writing ____ invite you.",
          "promptAr": "أكمل الفراغ: (أكتب لأدعوك.)",
          "options": [
            "in order to",
            "for to",
            "to"
          ],
          "correctIndex": 2,
          "answer": "I'm writing to invite you.",
          "explanationAr": "الإجابة: to. قائمة المراجعة: (١) الفكرة واضحة من أول سطر؟ (٢) احذف الكلمات الزائدة (in order to → to، due to the fact that → because). (٣) فعل قوي بدل اسم (make a decision → decide). (٤) فاعل-فعل-مفعول. (٥) راجع: s الفعل، المفرد/الجمع، الأزمنة، homophones. الإقناع: سؤال جذاب + فائدة + دليل + دعوة للعمل."
        },
        {
          "id": "scw_430_m3",
          "type": "gap",
          "promptEn": "Complete: We cancelled the event ____ it rained.",
          "promptAr": "أكمل الفراغ: (ألغينا الفعالية لأنها مطرت.)",
          "options": [
            "because",
            "because of that",
            "due to the fact that"
          ],
          "correctIndex": 0,
          "answer": "We cancelled the event because it rained.",
          "explanationAr": "الإجابة: because. قائمة المراجعة: (١) الفكرة واضحة من أول سطر؟ (٢) احذف الكلمات الزائدة (in order to → to، due to the fact that → because). (٣) فعل قوي بدل اسم (make a decision → decide). (٤) فاعل-فعل-مفعول. (٥) راجع: s الفعل، المفرد/الجمع، الأزمنة، homophones. الإقناع: سؤال جذاب + فائدة + دليل + دعوة للعمل."
        },
        {
          "id": "scw_430_m4",
          "type": "gap",
          "promptEn": "Complete: ____ us this Thursday and learn something new!",
          "promptAr": "أكمل الفراغ: (انضم لنا هالخميس وتعلم شي جديد!)",
          "options": [
            "Joined",
            "Joining",
            "Join"
          ],
          "correctIndex": 2,
          "answer": "Join us this Thursday and learn something new!",
          "explanationAr": "الإجابة: Join. قائمة المراجعة: (١) الفكرة واضحة من أول سطر؟ (٢) احذف الكلمات الزائدة (in order to → to، due to the fact that → because). (٣) فعل قوي بدل اسم (make a decision → decide). (٤) فاعل-فعل-مفعول. (٥) راجع: s الفعل، المفرد/الجمع، الأزمنة، homophones. الإقناع: سؤال جذاب + فائدة + دليل + دعوة للعمل."
        }
      ],
      "hard": [
        {
          "id": "scw_430_h1",
          "type": "order",
          "promptEn": "Put the words in order: signed / already / students / up. / have / Over / 500",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (أكثر من ٥٠٠ طالب سجلوا.)",
          "answer": "Over 500 students have already signed up.",
          "explanationAr": "الترتيب الصحيح: Over 500 students have already signed up."
        },
        {
          "id": "scw_430_h2",
          "type": "order",
          "promptEn": "Put the words in order: register / today. / out / Don't / — / miss",
          "promptAr": "رتّب الكلمات لتكوين جملة صحيحة (لا تفوتها — سجّل اليوم.)",
          "answer": "Don't miss out — register today.",
          "explanationAr": "الترتيب الصحيح: Don't miss out — register today."
        },
        {
          "id": "scw_430_h3",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: أكتب لأدعوك.",
          "answer": "I'm writing to invite you.",
          "explanationAr": "ترجمة مقترحة: I'm writing to invite you."
        },
        {
          "id": "scw_430_h4",
          "type": "translate",
          "promptEn": "Translate into English.",
          "promptAr": "ترجم إلى الإنجليزية: انضم لنا هالخميس وتعلم شي جديد!",
          "answer": "Join us this Thursday and learn something new!",
          "explanationAr": "ترجمة مقترحة: Join us this Thursday and learn something new!"
        }
      ]
    },
    "arabicLearnerPitfalls": [
      {
        "incorrect": "Translating Arabic formal padding",
        "correct": "Cut to the essential meaning",
        "whyAr": "الحشو مقبول في العربي الرسمي، ويضعف الإنجليزي."
      },
      {
        "incorrect": "Trusting spell-check fully",
        "correct": "Check homophones and agreement yourself",
        "whyAr": "المدقق ما يلقط كل شي."
      }
    ],
    "reviewOfPrevious": [
      {
        "questionAr": "مراجعة (كتابة تقرير مختصر): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "Most of students",
          "Most students / The majority of students"
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: Most students / The majority of students — most بدون of مع الجمع العام.",
        "fromLessonId": "scw_429"
      },
      {
        "questionAr": "مراجعة (خطاب التقديم ورسالة LinkedIn المهنية): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I led a five-person team to win a national hackathon.",
          "I am a hard-working, passionate team player."
        ],
        "correctIndex": 0,
        "explanationAr": "الصحيح: I led a five-person team to win a national hackathon. — أثبت الصفة بإنجاز بدل كلام عام.",
        "fromLessonId": "scw_427"
      },
      {
        "questionAr": "مراجعة (إيميل شكوى رسمي): أي جملة صحيحة؟",
        "questionEn": "Which sentence is correct?",
        "options": [
          "I am writing to complaint.",
          "I am writing to complain."
        ],
        "correctIndex": 1,
        "explanationAr": "الصحيح: I am writing to complain. — complain فعل، complaint اسم.",
        "fromLessonId": "scw_424"
      },
      {
        "questionAr": "ما معنى \"outweigh\"؟",
        "questionEn": "What does \"outweigh\" mean?",
        "options": [
          "يفوق",
          "عيب",
          "من جهة",
          "علاوة على ذلك"
        ],
        "correctIndex": 0,
        "explanationAr": "\"outweigh\" /ˌaʊtˈweɪ/ تعني: يفوق. مثال: The benefits outweigh the costs.",
        "fromLessonId": "scw_428"
      }
    ],
    "masteryCheck": {
      "passScore": 80,
      "questions": [
        {
          "questionAr": "أكمل الفراغ: (قررنا نطلق التطبيق.)",
          "questionEn": "Complete: We ____ to launch the app.",
          "options": [
            "made a decision",
            "decision",
            "decided"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: decided. قائمة المراجعة: (١) الفكرة واضحة من أول سطر؟ (٢) احذف الكلمات الزائدة (in order to → to، due to the fact that → because). (٣) فعل قوي بدل اسم (make a decision → decide). (٤) فاعل-فعل-مفعول. (٥) راجع: s الفعل، المفرد/الجمع، الأزمنة، homophones. الإقناع: سؤال جذاب + فائدة + دليل + دعوة للعمل."
        },
        {
          "questionAr": "أكمل الفراغ: (أكتب لأدعوك.)",
          "questionEn": "Complete: I'm writing ____ invite you.",
          "options": [
            "in order to",
            "for to",
            "to"
          ],
          "correctIndex": 2,
          "explanationAr": "الإجابة: to. قائمة المراجعة: (١) الفكرة واضحة من أول سطر؟ (٢) احذف الكلمات الزائدة (in order to → to، due to the fact that → because). (٣) فعل قوي بدل اسم (make a decision → decide). (٤) فاعل-فعل-مفعول. (٥) راجع: s الفعل، المفرد/الجمع، الأزمنة، homophones. الإقناع: سؤال جذاب + فائدة + دليل + دعوة للعمل."
        },
        {
          "questionAr": "الأوجز:",
          "questionEn": "Most concise:",
          "options": [
            "in order to",
            "to",
            "so as in order to"
          ],
          "correctIndex": 1,
          "explanationAr": "to."
        },
        {
          "questionAr": "بداية جذابة لبوست:",
          "questionEn": "Best hook:",
          "options": [
            "This is a post.",
            "Tired of wasting time on your phone?",
            "Hello everyone, I am writing..."
          ],
          "correctIndex": 1,
          "explanationAr": "سؤال يمس القارئ."
        },
        {
          "questionAr": "أي جملة صحيحة؟",
          "questionEn": "Which sentence is correct?",
          "options": [
            "At this point in time",
            "Now"
          ],
          "correctIndex": 1,
          "explanationAr": "الصحيح: Now — اختصر."
        }
      ]
    }
  }
];
