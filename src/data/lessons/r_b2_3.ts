
import { Lesson, proficiencyLevel } from "../../types";

export const criticalPerspectiveB2: Partial<Lesson> = {
  title: "Critical Perspective Evaluation",
  titleAr: "تقييم المنظور النقدي",
  proficiencyLevel: proficiencyLevel.B2,
  warmup: {
    mission: "Develop the ability to evaluate and compare different viewpoints on the same issue within a text.",
    missionAr: "تطوير القدرة على تقييم ومقارنة وجهات النظر المختلفة حول نفس القضية داخل النص.",
    objectives: [
      "Identify the 'Stakeholders' in a debate.",
      "Recognize balanced vs. biased reporting.",
      "Summarize conflicting arguments effectively."
    ],
    objectivesAr: [
      "تحديد 'أصحاب المصلحة' في المناظرة.",
      "تمييز التقارير المتوازنة مقابل التقارير المتحيزة.",
      "تلخيص الحجج المتعارضة بفعالية."
    ]
  },
  content: `
### 1. Identifying Stakeholders (تحديد أصحاب المصلحة)
In complex texts, different people have different interests (Stakeholders).
*   *Subject:* New Factory Building.
*   **Stakeholder A (Environment):** Worried about pollution.
*   **Stakeholder B (Local Residents):** Want jobs.
*   **Stakeholder C (Company):** Wants profit.

### 2. Balanced vs. Biased (المتوازن مقابل المتحيز)
*   **Balanced:** Presents both sides using neutral language. 
    *   *Word Clue:* "Supporters argue... while critics suggest..."
*   **Biased:** Uses "Loaded Language" to favor one side. 
    *   *Word Clue:* "The ridiculous plan," "The heroic effort."

### 3. Argument Mapping (رسم الحجج)
B2 readers map an argument by finding:
1.  **The Claim:** What do they want?
2.  **The Warrant:** Why is it true?
3.  **The Counter-Argument:** What is the other side?

> **Formula/Rule:**
> **Perspective X + Perspective Y = Synthesis**
> *While [X] is good for economy, [Y] shows it harms health.*
`,
  contentAr: `
### 1. تحديد أصحاب المصلحة (Stakeholders)
في النصوص المعقدة، يكون لأطراف مختلفة مصالح مختلفة.
*   **الجانب أ:** يركز على البيئة.
*   **الجانب ب:** يركز على الاقتصاد.

### 2. التوازن مقابل التحيز (Balanced vs. Biased)
*   **المتوازن:** يقدم الطرفين بلغة محايدة.
*   **المتحيز:** يستخدم "لغة مشحونة" عاطفياً لتفضيل طرف على آخر.

### 3. تقييم الحجة (Critical Mapping)
القارئ الذكي يبحث عن:
1.  **الادعاء:** ماذا يريد الكاتب؟
2.  **الحجة المضادة:** ما هو رأي الطرف الآخر؟ وكيف رد الكاتب عليه؟

> **نصيحة للقراءة:** الكلمات مثل "Argue", "Claim", "Suggest" تخبرك أن الكاتب ينقل رأياً وليس حقيقة مطلقة.
`,
  exercises: [
    {
      type: 'match',
      instruction: 'Match the phrase to its perspective type.',
      instructionAr: 'صل العبارة بنوع المنظور.',
      items: [
        { text: "Both sides have valid points.", answer: "Balanced" },
        { text: "This terrible idea will fail.", answer: "Biased" },
        { text: "Evidence suggests a trend.", answer: "Objective" }
      ]
    }
  ],
  quiz: [
    {
      question: "What is 'Loaded Language'?",
      questionAr: "ما هي 'اللغة المشحونة' (Loaded Language)؟",
      options: ["Words used to carry cargo", "Language that is neutral", "Words that create strong emotions", "Old-fashioned words"],
      optionsAr: ["كلمات لنقل الحمولات", "لغة محايدة", "كلمات تثير مشاعر قوية", "كلمات قديمة"],
      correctIndex: 2,
      explanation: "Loaded language uses emotional appeal to influence the reader (Bias).",
      explanationAr: "تستخدم اللغة المشحونة المشاعر للتأثير على القارئ (التحيز)."
    }
  ]
};
