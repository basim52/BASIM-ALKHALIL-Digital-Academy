
import { Lesson, proficiencyLevel } from "../../types";

export const describingPeopleA2: Partial<Lesson> = {
  title: "Describing People: Appearance & Personality",
  titleAr: "وصف الأشخاص: المظهر والشخصية",
  proficiencyLevel: proficiencyLevel.A2,
  warmup: {
    mission: "Learn how to describe what people look like and what kind of personality they have.",
    missionAr: "تعلم كيفية وصف كيف يبدو الأشخاص وما هي طبيعة شخصيتهم.",
    objectives: [
      "Ask 'What does he/she look like?' and 'What is he/she like?'",
      "Describe physical features (height, hair, eyes).",
      "Use personality adjectives (kind, funny, smart).",
      "Explain relationships (friend, colleague, neighbor)."
    ],
    objectivesAr: [
      "سؤال 'كيف يبدو؟' و 'كيف هي شخصيته؟'",
      "وصف السمات الجسدية (الطول، الشعر، العيون).",
      "استخدام صفات الشخصية (لطيف، مضحك، ذكي).",
      "شرح العلاقات (صديق، زميل، جار)."
    ]
  },
  content: `
### 1. Describing Appearance
To ask about appearance, say: **"What does he/she look like?"**
*   **Height:** Tall, short, medium height.
*   **Hair:** Blonde, dark, curly, straight, long, short.
*   **Eyes:** Blue, brown, green.
*   **Age:** Young, old, in his/her thirties.

### 2. Describing Personality
To ask about personality, say: **"What is he/she like?"**
*   **Funny:** Makes people laugh.
*   **Kind / Friendly:** Nice to others.
*   **Lazy:** Doesn't like working.
*   **Hard-working:** Works a lot.
*   **Shy:** Quiet around new people.
*   **Smart / Intelligent:** Very clever.

### 3. Clothes
"He is **wearing** a blue suit."
"She is **wearing** a red dress."

### 4. Comparison
"He is **taller than** his brother."
"She is **more outgoing than** me."
`,
  contentAr: `
### 1. الفرق بين السؤالين!
*   السؤال الأول يسأل عن "الشكل" (العين، الشعر، الطول).
*   السؤال الثاني يسأل عن "الشخصية" (الكرم، الذكاء، خفة الظل).

### 2. صفات المظهر
*   أصلع.
*   لحية أو شارب.
*   نحيف.
*   ذو وزن زائد.

### 3. صفات الشخصية
*   أناني.
*   كريم.
*   شجاع.
*   كثير الكلام.

### 4. التحدث عن شخص تعرفه
*   "صديقي المفضل شخص يمكن الاعتماد عليه."
*   "هو في أوائل العشرينيات من عمره."

> **نصيحة:** عند وصف لباس شخص ما في الوقت الحالي، نستخدم صيغة الفعل المستمر.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Complete with: appearance, personality, like, look like.',
      instructionAr: 'أكمل بالكلمة المناسبة وفقاً للمعنى.',
      items: [
        { text: "A: What does your sister _______? B: She is tall and has blonde hair.", textAr: "أ: كيف _______ أختك؟ ب: هي طويلة وشعرها أشقر." },
        { text: "A: What is your teacher _______? B: He is very kind and helpful.", textAr: "أ: كيف _______ معلمك؟ ب: هو لطيف جداً ومتعاون." },
        { text: "He has a great _______; everyone loves him.", textAr: "لديه _______ رائعة؛ الجميع يحبه." }
      ]
    }
  ],
  quiz: [
    {
      question: "Which question asks about someone's PERSONALITY?",
      questionAr: "أي سؤال يسأل عن شخصية أحدهم؟",
      options: ["What does he look like?", "What is he wearing?", "What is he like?", "What does he do?"],
      optionsAr: ["كيف يبدو شكله؟", "ماذا يرتدي؟", "كيف هي شخصيته؟", "ماذا يعمل؟"],
      correctIndex: 2,
      explanation: "'What is he like?' is the standard question to inquire about character and traits.",
      explanationAr: "سؤال 'What is he like؟' هو السؤال المعياري للاستفسار عن الطبع والسمات الشخصية."
    }
  ]
};
