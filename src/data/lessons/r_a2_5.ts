
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
### 1. The Timeline of Reading (الخط الزمني للقراءة)
In A2 reading, stories are rarely a single sentence. We use **Sequence Markers** to show order.

*   **First**: Start here (أولاً).
*   **Next / Then**: The next steps (تالياً / ثم).
*   **After that**: Continuing the action (بعد ذلك).
*   **Finally**: The end (أخيراً).

### 2. Following Instructions (اتباع التعليمات)
Procedures (like cooking or assembling a chair) depend on sequence.

*Example:*
1.  **First**, open the box.
2.  **Next**, check the parts.
3.  **Finally**, read the manual.

> **Formula/Rule:**
> **Marker + Imperative Verb**
> *Finally [Marker] + click [Verb] the button.*

### 3. Past Tense in Sequences (الماضي في التسلسلات)
Narratives often use the **Simple Past** (-ed verbs).
*   "In the morning, he **walked** to the park. **Then**, he **sat** on the bench."
`,
  contentAr: `
### 1. الروابط الزمنية (Sequence Markers)
لفهم القصص أو التعليمات، يجب أن تعرف ترتيب الأحداث:

*   **First (أولاً):** يحدد نقطة البداية.
*   **Next / Then (تالياً/ثم):** يربط بين الخطوات الوسطى.
*   **Finally (أخيراً):** يحدد الخاتمة أو النتيجة النهائية.

### 2. فهم الروتين اليومي (Daily Routine)
عند قراءة الروتين، الترتيب هو الأهم.
*مثال:*
"أولاً (First) استيقظت، ثم (Then) تناولت الفطور، وأخيراً (Finally) ذهبت للعمل."

> **نصيحة للقراءة:** إذا فقدت تركيزك في نص طويل، ابحث عن الكلمات التي تنتهي بـ (ly) مثل Finally فهي غالباً تشير إلى أن النص يقترب من نهايته.
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
