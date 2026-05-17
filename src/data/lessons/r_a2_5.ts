
import { Lesson, proficiencyLevel } from "../../types";

export const narrativeSequencesA2: Partial<Lesson> = {
  title: "Narrative Sequences",
  titleAr: "التسلسلات السردية",
  proficiencyLevel: proficiencyLevel.A2,
  warmup: {
    mission: "Learn how to read and order events in stories and manuals using time sequence words.",
    missionAr: "تعلم كيفية قراءة وترتيب الأحداث في القصص والكتيبات باستخدام كلمات التسلسل الزمني.",
    objectives: [
      "Identify sequence words (First, Next, Then, Finally).",
      "Determine the logical order of a daily routine text.",
      "Understand instructions for a step-by-step process."
    ],
    objectivesAr: [
      "تحديد كلمات التسلسل (أولاً، تالياً، ثم، أخيراً).",
      "تحديد الترتيب المنطقي لنص يتحدث عن روتين يومي.",
      "فهم تعليمات عملية مكونة من خطوات متتالية."
    ]
  },
  content: `
### 1. The Timeline of Reading
In A2 reading, stories are rarely a single sentence. We use **Sequence Markers** to show order.

*   **First**: Start here.
*   **Next / Then**: The next steps.
*   **After that**: Continuing the action.
*   **Finally**: The end.

### 2. Following Instructions
Procedures (like cooking or assembling a chair) depend on sequence.

*Example:*
1.  **First**, open the box.
2.  **Next**, check the parts.
3.  **Finally**, read the manual.

> **Formula/Rule:**
> **Marker + Imperative Verb**
> *Finally + click the button.*

### 3. Past Tense in Sequences
Narratives often use the **Simple Past** (-ed verbs).
*   "In the morning, he **walked** to the park. **Then**, he **sat** on the bench."
`,
  contentAr: `
### 1. الروابط الزمنية
لفهم القصص أو التعليمات، يجب أن تعرف ترتيب الأحداث بشكل دقيق:

*   **أولاً:** يحدد نقطة البداية.
*   **تالياً أو ثم:** يربط بين الخطوات المتتابعة.
*   **أخيراً:** يحدد الخاتمة أو النتيجة النهائية للعملية.

### 2. فهم الروتين اليومي
عند قراءة الروتين اليومي، الترتيب المنطقي هو الأهم للحفاظ على السياق.
*مثال:*
"أولاً استيقظت، ثم تناولت وجبة الفطور، وأخيراً ذهبت إلى العمل."

> **نصيحة للقراءة:** إذا فقدت تركيزك في نص طويل، ابحث عن الكلمات التي تظهر التدرج الزمني فهي تساعدك على إعادة بناء القصة في ذهنك.
`,
  exercises: [
    {
      type: 'drag',
      instruction: 'Order the steps: Finally, First, Then.',
      instructionAr: 'رتب الخطوات: أخيراً، أولاً، ثم.',
      items: [
        { text: "_______ wash the fruit.", answer: "First" },
        { text: "_______ cut the fruit pieces.", answer: "Then" },
        { text: "_______ eat the salad.", answer: "Finally" }
      ]
    }
  ],
  readingText: {
    paragraphs: [
      {
        en: 'To understand a story or a manual, you must follow the **sequence** of events. **First**, identify the starting point. **Next**, look for connectors like "then" or "after that" to follow the logical flow.',
        ar: 'لفهم قصة أو كتيب تعليمات، يجب عليك اتباع **تسلسل** الأحداث. **أولاً**، حدد نقطة البداية. **تالياً**، ابحث عن الروابط مثل "then" أو "after that" لاتباع التدفق المنطقي.'
      },
      {
        en: 'In a daily **routine**, the order is vital. If you miss a step, the whole process might fail. **Finally**, always check the conclusion to ensure you have reached the desired result successfully.',
        ar: 'في **الروتين** اليومي، الترتيب حيوي. إذا فاتتك خطوة، قد تفشل العملية بأكملها. **أخيراً**، تحقق دائماً من الخاتمة للتأكد من وصولك إلى النتيجة المرجوة بنجاح.'
      }
    ]
  },
  vocabulary: [
    {
      word: 'Sequence',
      phonetic: 'ˈsiːkwəns',
      meaningAr: 'تسلسل / تعاقب',
      example: 'The sequence of events was very easy to follow.'
    },
    {
      word: 'Routine',
      phonetic: 'ruːˈtiːn',
      meaningAr: 'روتين / عمل رتيب',
      example: 'My morning routine includes reading the news.'
    },
    {
      word: 'Finally',
      phonetic: 'ˈfaɪnəli',
      meaningAr: 'أخيراً / في النهاية',
      example: 'Finally, the traveler reached the mountain peak.'
    }
  ],
  quiz: [
    {
      question: "Which word indicates the start of a story?",
      questionAr: "أي كلمة تشير إلى بداية القصة؟",
      options: ["Finally", "Then", "Next", "First"],
      optionsAr: ["أخيراً", "ثم", "تالياً", "أولاً"],
      correctIndex: 3,
      explanation: "'First' is always used for the opening action.",
      explanationAr: "تستخدم 'First' دائماً للفعل الافتتاحي."
    },
    {
      question: "What is the logical next step after 'First'?",
      questionAr: "ما هي الخطوة المنطقية التالية بعد 'First'؟",
      options: ["Finally", "Next", "The End", "Yesterday"],
      optionsAr: ["أخيراً", "تالياً (Next)", "النهاية", "أمس"],
      correctIndex: 1,
      explanation: "After the first step, we usually say 'Next' or 'Then'.",
      explanationAr: "بعد الخطوة الأولى ننتقل عادة لـ Next أو Then."
    }
  ]
};
