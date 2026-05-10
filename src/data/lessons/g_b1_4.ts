
import { Lesson, proficiencyLevel } from "../../types";

export const conditionalsB1: Partial<Lesson> = {
  title: "Conditionals: Types 1 and 2",
  titleAr: "الجمل الشرطية: النوع الأول والثاني",
  proficiencyLevel: proficiencyLevel.B1,
  warmup: {
    mission: "Learn how to talk about real possibilities and imaginary scenarios.",
    missionAr: "تعلم كيفية التحدث عن الاحتمالات الواقعية والسيناريوهات الخيالية.",
    objectives: [
      "Form the First Conditional for real future outcomes.",
      "Form the Second Conditional for imaginary/hypothetical situations.",
      "Understand the 'If-clause' and the 'Main clause'.",
      "Give advice using 'If I were you...'."
    ],
    objectivesAr: [
      "صياغة الشرط الأول للنتائج الواقعية في المستقبل.",
      "صياغة الشرط الثاني للمواقف الخيالية أو الافتراضية.",
      "فهم 'جملة الشرط' و 'جملة جواب الشرط'.",
      "تقديم النصيحة باستخدام 'لو كنت مكانك...'."
    ]
  },
  content: `
### 1. First Conditional (Real Possibility)
We use this for things that will likely happen in the future if a condition is met.
*   **Structure:** **If + Present Simple, ... Will + Verb**
*   *Example:* "If it **rains**, I **will stay** at home."

### 2. Second Conditional (Imaginary / Unlikely)
We use this to talk about imaginary situations now or in the future.
*   **Structure:** **If + Past Simple, ... Would + Verb**
*   *Example:* "If I **won** the lottery, I **would travel** the world." (I don't expect to win).

### 3. "If I were you..." (Advice)
In the second conditional, we often use **were** for all subjects (I/He/She) when giving advice.
*   *Example:* "If I **were** you, I **would study** more."

### 4. Summary Table
| Condition Type | Usage | Structure |
| :--- | :--- | :--- |
| **Type 1** | Real / Likely | If + Present, Will |
| **Type 2** | Hypothetical / Dream | If + Past, Would |
`,
  contentAr: `
### 1. الحالة الشرطية الأولى (الواقعية)
نستخدمها للتعبير عن أمور من المحتمل جداً حدوثها في المستقبل في حال تحقق شرط معين.
*   تتكون من جملة شرط في الحاضر وجملة نتيجة في المستقبل.
    *   مثال: "إذا ذاكرت بجد، ستنجح في الاختبار." (احتمال واقعي وممكن حدوثه).

### 2. الحالة الشرطية الثانية (الخيال أو التمني)
نستخدمها للتحدث عن مواقف خيالية أو افتراضية أو مستحيلة الحدوث في الوقت الحالي.
*   تتكون من جملة شرط في الماضي البسيط وجملة نتيجة تستخدم صيغة الاحتمال المستقبلي.
    *   مثال: "لو كان لدي أجنحة، لكنت طرت عالياً." (موقف خيالي غير حقيقي).

### 3. تقديم النصيحة
هناك صيغة مشهورة تستخدم لتقديم النصيحة للآخرين بتخيل نفسك مكانهم.
    *   مثال: "لو كنت مكانك، لذهبت لزيارة الطبيب فوراً."

### 4. ملاحظة هامة حول التركيب
الجملة الشرطية تتكون دائماً من جزأين: جملة تبدأ بأداة الشرط (إذا) وجملة النتيجة المترتبة عليها. احذر من وضع أدوات المستقبل والنتائج داخل الجملة التي تحتوي على أداة الشرط مباشرة.

> **نصيحة:** استخدم النوع الأول للوعود والتحذيرات القائمة على الواقع، والنوع الثاني للأحلام والأمنيات والنصائح.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Choose the correct verb form.',
      instructionAr: 'اختر تصريف الفعل الصحيح.',
      items: [
        { text: "If I _______ (be) rich, I would buy a private jet.", textAr: "لو _______ (كنت) غنياً، لاشتريت طائرة خاصة." },
        { text: "If you _______ (not hurry), you will miss the bus.", textAr: "إذا لم _______ (تسرع)، ستفقد الحافلة." },
        { text: "What _______ you do if you saw a lion?", textAr: "ماذا _______ تفعل لو رأيت أسداً؟" }
      ]
    }
  ],
  quiz: [
    {
      question: "Which condition is for IMAGINARY situations?",
      questionAr: "أي حالة شرطية تستخدم للمواقف الخيالية؟",
      options: ["Type 0", "First Conditional", "Second Conditional", "Third Conditional"],
      optionsAr: ["النوع 0", "الحالة الأولى", "الحالة الثانية", "الحالة الثالثة"],
      correctIndex: 2,
      explanation: "Second Conditional uses 'If + Past' for hypothetical or imaginary scenarios.",
      explanationAr: "الحالة الثانية تستخدم 'If + ماضي' للمواقف الافتراضية أو الخيالية."
    }
  ]
};
