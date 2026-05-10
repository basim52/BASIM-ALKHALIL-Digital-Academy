
import { Lesson, proficiencyLevel } from "../../types";

export const travelingExperiencesB1: Partial<Lesson> = {
  title: "Traveling Experiences & Storytelling",
  titleAr: "تجارب السفر ورواية القصص",
  proficiencyLevel: proficiencyLevel.B1,
  warmup: {
    mission: "Learn how to narrate your past travel adventures, describe problems you faced, and give recommendations.",
    missionAr: "تعلم كيفية سرد مغامرات سفرك السابقة، وصف المشاكل التي واجهتها، وتقديم التوصيات.",
    objectives: [
      "Use narrative tenses (Past Simple & Continuous).",
      "Describe travel mishaps (lost luggage, missed flights).",
      "Give recommendations (You must visit, It's worth seeing).",
      "Explain cultural shocks and surprises."
    ],
    objectivesAr: [
      "استخدام أزمنة السرد (الماضي البسيط والمستمر).",
      "وصف حوادث السفر (حقائب مفقودة، رحلات فائتة).",
      "إعطاء توصيات (يجب أن تزور، يستحق المشاهدة).",
      "شرح الصدمات الثقافية والمفاجآت."
    ]
  },
  content: `
### 1. Narrating your Trip (سرد الرحلة)
To make your story interesting, use **Past Continuous** for the background and **Past Simple** for the action.
*   "While we **were driving** through the mountains (background), our car **broke down** (action)."

### 2. Travel Mishaps (مشاكل السفر)
*   **Missed my flight / train.** (فاتتني الرحلة).
*   **Lost my passport / luggage.**
*   **Got food poisoning.** (تسمم غذائي).
*   **Got lost.** (تهت).

### 3. Giving Recommendations
*   "It's **worth visiting** the Old Town." (يستحق الزيارة).
*   "You **must try** the local seafood."
*   "I **highly recommend** taking a guided tour."

### 4. Cultural Observations
*   "I was **surprised** by the food."
*   "The people were very **hospitable**." (مضيافون).
*   "The prices were quite **reasonable**." (معقولة).
`,
  contentAr: `
### 1. كيف تجعل قصتك مشوقة؟
استخدم روابط الوقت لربط الأحداث:
*   **Suddenly:** فجأة.
*   **Eventually:** في النهاية.
*   **By the time:** بحلول ذلك الوقت.

### 2. مصطلحات سياحية متقدمة B1
*   **Off the beaten track:** مكان بعيد عن الزحام السياحي.
*   **Sightseeing:** مشاهدة المعالم السياحية.
*   **Breathtaking views:** مناظر تخرق الأنفاس.
*   **Tourist trap:** فخ سياحي (مكان غالي ومزدحم).

### 3. وصف المشاعر
*   **I felt homesick.** (شعرت بالحنين للوطن).
*   **I was amazed by...** (ذهلت بـ...).

### 4. نصيحة للمسافرين
*   **Pack light.** (لا تحمل حقائب ثقيلة).
*   **Book in advance.** (احجز مسبقاً).

> **نصيحة للمحادثة:** بدلاً من قول "It was good"، قل **"It was an unforgettable experience."** (كانت تجربة لا تنسى).
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Complete with: missed, worth, recommend, broken.',
      instructionAr: 'أكمل بالكلمة المناسبة.',
      items: [
        { text: "My phone was _______, so I couldn't use GPS.", textAr: "هاتفي كان _______، لذا لم أستطع استخدام خرائط جوجل." },
        { text: "I highly _______ going to the museum early.", textAr: "أنا _______ بشدة بالذهاب للمتحف مبكراً." },
        { text: "The castle is _______ seeing at sunset.", textAr: "القلعة _______ المشاهدة وقت الغروب." }
      ]
    }
  ],
  quiz: [
    {
      question: "What does 'unforgettable' mean?",
      questionAr: "ماذا تعني كلمة 'unforgettable'؟",
      options: ["Boring", "Very bad", "Something you can't forget", "Expensive"],
      optionsAr: ["ممل", "سيء جداً", "شيء لا يمكنك نسيانه", "غالٍ"],
      correctIndex: 2,
      explanation: "'Unforgettable' describes a memory that is so strong it stays with you forever.",
      explanationAr: "كلمة 'Unforgettable' تصف ذكرى قوية جداً لدرجة أنها تبقى معك للأبد."
    }
  ]
};
