
import { Lesson, proficiencyLevel } from "../../types";

export const futureSimpleA2: Partial<Lesson> = {
  title: "Future: Will vs. Going to",
  titleAr: "المستقبل: Will مقابل Going to",
  proficiencyLevel: proficiencyLevel.A2,
  warmup: {
    mission: "Learn how to talk about your future plans, predictions, and promises.",
    missionAr: "تعلم كيفية التحدث عن خططك المستقبلية، توقعاتك، ووعودك.",
    objectives: [
      "Understand when to use 'Going to' for plans.",
      "Understand when to use 'Will' for predictions and quick decisions.",
      "Form negative sentences in the future.",
      "Ask questions about future intent."
    ],
    objectivesAr: [
      "فهم متى نستخدم 'Going to' للخطط المسبقة.",
      "فهم متى نستخدم 'Will' للتوقعات والقرارات السريعة.",
      "تكوين جمل منفية في المستقبل.",
      "طرح أسئلة حول النوايا المستقبلية."
    ]
  },
  content: `
### 1. Going to (Planned Future)
We use **be + going to** for things we have already decided to do.
*   *Example:* "I **am going to** visit my family next week."
*   *Structure:* **Am/Is/Are + going to + Verb**.

### 2. Will (Predictions & Decisions)
We use **will** for:
1.  **Predictions:** What we think will happen. (*I think it will rain.*)
2.  **Quick Decisions:** Decisions made at the moment of speaking. (*The phone is ringing. I will answer it!*)
*   *Structure:* **Will + Verb**.

### 3. Negatives
*   Going to: "I **am not going to** go."
*   Will: "**Will not**" or the short form "**Won't**".
    *   *Example:* "I **won't** tell anyone."

### 4. Comparison Table
| Type | Use Case | Example |
| :--- | :--- | :--- |
| **Going to** | Plan / Intention | I'm going to travel. |
| **Will** | Quick / Promise | I'll help you. |
`,
  contentAr: `
### 1. استخدام المخطط له
نستخدم هذه الصيغة عندما نكون قد قررنا مسبقاً القيام بالحدث.
*   سأذاكر (عندي خطة وجدول).

### 2. استخدام التوقعات والقرارات اللحظية
نستخدم هذه الصيغة في حالتين رئيسيتين:
1.  **قرار مفاجئ:** (الجرس يرن، سأفتح الباب).
2.  **توقع:** (أعتقد أن الجو سيمطر).

### 3. النفي في المستقبل
*   النفي للصيغة الأولى يكون بإضافة أداة النفي للفعل المساعد.
*   النفي للصيغة الثانية اختصاره المشهور هو لن.

> **نصيحة:** إذا كان الأمر فيه نية وترتيب مسبق، استخدم الصيغة الأولى. إذا كان مجرد تخمين أو قرار سريع، استخدم الصيغة الثانية.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Complete the sentence with "will" or "going to".',
      instructionAr: 'أكمل الجملة باستخدام "will" أو "going to".',
      items: [
        { text: "I bought a ticket. I _______ fly to London.", textAr: "اشتريت تذكرة. أنا _______ أسافر للندن (خطة)." },
        { text: "Wait! I _______ help you with those bags.", textAr: "انتظر! أنا _______ أساعدك في هذه الحقائب (قرار سريع)." },
        { text: "I think people _______ live on Mars in 100 years.", textAr: "أعتقد أن الناس _______ يعيشون على المريخ (توقع)." }
      ]
    }
  ],
  quiz: [
    {
      question: "What is the short form of 'Will not'?",
      questionAr: "ما هو الاختصار لـ 'Will not'؟",
      options: ["Willn't", "Won't", "Willed", "Don't"],
      optionsAr: ["Willn't", "Won't", "Willed", "Don't"],
      correctIndex: 1,
      explanation: "'Won't' is the unique contraction for 'will not'.",
      explanationAr: "'Won't' هو الاختصار الوحيد والصحيح لـ 'will not'."
    }
  ]
};
