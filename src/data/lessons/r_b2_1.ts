
import { Lesson, proficiencyLevel } from "../../types";

export const rhetoricalStructuresB2: Partial<Lesson> = {
  title: "Rhetorical Text Structures",
  titleAr: "بنى النصوص البلاغية",
  proficiencyLevel: proficiencyLevel.B2,
  warmup: {
    mission: "Learn to identify how complex texts are organized to convey specific logical relationships like cause-effect and comparison.",
    missionAr: "تعلم تحديد كيفية تنظيم النصوص المعقدة لإيصال علاقات منطقية محددة مثل السبب والنتيجة والمقارنة.",
    objectives: [
      "Identify cause and effect markers in academic paragraphs.",
      "Recognize the structure of a compare-and-contrast essay.",
      "Understand how problem-solution patterns are used in technical writing."
    ],
    objectivesAr: [
      "تحديد مؤشرات السبب والنتيجة في الفقرات الأكاديمية.",
      "تمييز هيكل مقال المقارنة والتباين.",
      "فهم كيفية استخدام أنماط 'المشكلة والحل' في الكتابة التقنية."
    ]
  },
  content: `
### 1. Cause and Effect (السبب والنتيجة)
In B2 Reading, you must look for words that link actions to their consequences.

*   **Cause Markers:** Due to, as a result of, because of, since.
*   **Effect Markers:** Consequently, therefore, thus, leading to.

*Example:* "Due to the rise in global temperatures [Cause], polar ice caps are melting; **consequently** [Effect], sea levels are rising."

### 2. Compare and Contrast (المقارنة والتباين)
Authors use this structure to evaluate two ideas.
*   **Comparison:** Similarly, likewise, both, also.
*   **Contrast:** On the other hand, conversely, whereas, while.

### 3. Problem and Solution (المشكلة والحل)
Common in business and science. 
1.  **The Problem:** Identifies a challenge (e.g., "The city faces high traffic congestion").
2.  **The Proposal:** Suggests a fix (e.g., "Implementing a new metro system").
3.  **The Evaluation:** Discusses if the fix works.

> **Formula/Rule:**
> **[Context] + [Marker] + [Logical Consequence]**
> *The company lost money [Context] **hence** [Marker] staff were reduced [Consequence].*
`,
  contentAr: `
### 1. السبب والنتيجة (Cause and Effect)
في قراءة المستوى B2، يجب أن تبحث عن الكلمات التي تربط الأفعال بعواقبها.

*   **كلمات السبب:** Due to, Since.
*   **كلمات النتيجة:** Consequently, Therefore.

### 2. المقارنة والتباين (Compare and Contrast)
يستخدم المؤلفون هذا الهيكل لتقييم فكرتين.
*   **المقارنة:** Similarly, Likewise.
*   **التباين:** Conversely, On the other hand.

### 3. المشكلة والحل (Problem and Solution)
شائع في نصوص الأعمال والعلوم.
1.  **المشكلة:** تحديد التحدي.
2.  **المقترح:** اقتراح حل.
3.  **التقييم:** مناقشة فعالية الحل.

> **نصيحة للقراءة:** ابحث دائماً عن كلمات الربط (Transitions) فهي الخريطة التي تخبرك كيف يفكر الكاتب.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Select the correct marker: Consequently, Similarly, Whereas.',
      instructionAr: 'اختر الرابط الصحيح.',
      items: [
        { text: "Sales decreased; _______, the budget was cut.", textAr: "انخفضت المبيعات؛ _______، تم خفض الميزانية." },
        { text: "Apples are sweet, _______ lemons are sour.", textAr: "التفاح حلو، _______ الليمون حامض." },
        { text: "Team A worked hard. _______, Team B spent many hours in the lab.", textAr: "الفريق أ عمل بجد. _______ (بشكل مشابه)، قضى الفريق ب ساعات طويلة في المختبر." }
      ]
    }
  ],
  quiz: [
    {
      question: "Which word signals a 'consequence'?",
      questionAr: "أي كلمة تشير إلى 'عاقبة' أو 'نتجية'؟",
      options: ["Since", "Because", "Therefore", "While"],
      optionsAr: ["بما أن (Since)", "لأن (Because)", "بناءً عليه (Therefore)", "بينما (While)"],
      correctIndex: 2,
      explanation: "'Therefore' is a formal transition word used to introduce a result.",
      explanationAr: "تستخدم 'Therefore' ككلمة انتقالية رسمية لتقديم النتيجة."
    }
  ]
};
