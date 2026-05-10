
import { Lesson, proficiencyLevel } from "../../types";

export const strategicDiscursiveC2: Partial<Lesson> = {
  title: "Strategic Discursive Manipulation",
  titleAr: "التلاعب الاستراتيجي بالخطاب",
  proficiencyLevel: proficiencyLevel.C2,
  warmup: {
    mission: "Analyze the most sophisticated methods of psychological manipulation in legal, corporate, and political rhetoric.",
    missionAr: "تحليل أكثر الأساليب تطوراً للتلاعب النفسي في الخطاب القانوني والمؤسسي والسياسي.",
    objectives: [
      "Detect 'Gaslighting' techniques within professional documentation.",
      "Identify 'Dog-Whistle' politics (coded language for specific groups).",
      "Deconstruct 'Euphemistic Obfuscation' meant to hide unpleasant truths."
    ],
    objectivesAr: [
      "اكتشاف تقنيات 'التلاعب بالعقول' (Gaslighting) داخل الوثائق المهنية.",
      "تحديد 'سياسة صفارة الكلب' (اللغة المشفرة لمجموعات محددة).",
      "تفكيك 'الغموض التلطيفي' (Euphemistic Obfuscation) الذي يهدف لإخفاء الحقائق غير السارة."
    ]
  },
  content: `
### 1. Gaslighting in Texts (التلاعب بالحقائق)
In high-level discourse, manipulation is not a lie—it's a "re-framing" of reality.
*   *The Technique:* Making the reader doubt their own memory or intelligence by presenting biased facts as "self-evident".

### 2. Dog-Whistle Politics (صفارات الكلب السياسية)
Using words that sound neutral to a general audience but carry a specific, often controversial, message to a target subgroup.
*   *Example:* Terms like "Family Values" or "Urban Areas" often act as code words for specific racial or religious policies in some political contexts.

### 3. Euphemistic Obfuscation (التمويه التلطيفي)
Replacing a direct, harsh word with a long, confusing, and neutral-sounding phrase.
*   **Layoffs** → "Right-sizing" or "Career transition services".
*   **War / Invasion** → "Special military operation" or "Stabilization efforts".

| Term | Manipulative Purpose | Arabic Equivalent |
| :--- | :--- | :--- |
| **Spin** | Presenting information in a heavily biased way. | تدوير / تلميع |
| **Obfuscation** | Making something unclear or unintelligible. | تعمية / تمويه |
| **Double-Speak** | Language that deliberately obscures or reverses the meaning. | لغة مزدوجة |
| **Subliminal** | Meaning that acts below the level of conscious awareness. | لا شعوري |
`,
  contentAr: `
### 1. التلاعب بالعقول (Gaslighting)
في الخطاب الرفيع، لا يكون التلاعب كذباً صريحاً، بل "إعادة صياغة" للواقع لجعل القارئ يشك في استنتاجاته المنطقية.

### 2. سياسة "صفارة الكلب" (Dog-Whistle)
استخدام كلمات تبدو محايدة للجمهور العام، لكنها تحمل رسالة مشفرة ومحددة لمجموعة معينة. (مثل استخدام مصطلحات تقنية معينة لإخفاء نية سياسية).

### 3. التمويه التلطيفي (Obfuscation)
استبدال الكلمات القاسية بعبارات طويلة ومعقدة ومحايدة.
*   **تسريح الموظفين** → "إعادة ضبط الحجم التنظيمي".
*   **الغزو/الحرب** → "جهود الاستقرار".

> **نصيحة للخبير:** كن "قارئاً عدائياً" للكلمات الطويلة والمثالية. اسأل دائماً: "ما هي الحقيقة القبيحة التي يحاول هذا التركيب تجميلها؟"
`,
  exercises: [
    {
      type: 'multiple',
      instruction: 'Identify the euphemistic term.',
      instructionAr: 'حدد المصطلح التلطيفي الخفي.',
      items: [
        { 
          text: "The company announced 'Negative growth' for this year.", 
          textAr: "أعلنت الشركة عن 'نمو سلبي' لهذا العام.",
          options: ["Profit", "Stable market", "Loss"],
          optionsAr: ["ربح", "سوق مستقر", "خسارة"],
          answer: "Loss"
        }
      ]
    }
  ],
  quiz: [
    {
      question: "What is 'Double-Speak'?",
      questionAr: "ما هي الـ 'Double-Speak' (اللغة المزدوجة)؟",
      options: ["Speaking in two languages", "Language that distorts meaning to make it sound better", "Speaking with two people at once", "Scientific terminology"],
      optionsAr: ["التحدث بلغتين", "لغة تشوه المعنى لتبدو أفضل", "التحدث مع شخصين معاً", "المصطلحات العلمية"],
      correctIndex: 1,
      explanation: "Double-speak reverses or obscures the actual meaning of things to avoid responsibility or hide reality.",
      explanationAr: "اللغة المزدوجة هي تمويه المعنى الحقيقي أو عكسه لتجنب المسؤولية أو إخفاء الواقع."
    }
  ]
};
