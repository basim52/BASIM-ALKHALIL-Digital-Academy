
import { Lesson, proficiencyLevel } from "../../types";

export const nominalizationC2: Partial<Lesson> = {
  title: "Nominalization & Academic Syntax",
  titleAr: "التحويل للأسماء والهياكل الأكاديمية (Nominalization)",
  proficiencyLevel: proficiencyLevel.C2,
  warmup: {
    mission: "Learn how to transform verbs and adjectives into nouns to create dense, objective, and highly professional academic prose.",
    missionAr: "تعلم كيفية تحويل الأفعال والصفات إلى أسماء لإنشاء نثر أكاديمي كثيف، موضوعي، واحترافي للغاية.",
    objectives: [
      "Understand the shift from 'Verbal' to 'Nominal' style.",
      "Identify abstract noun suffixes (-tion, -ance, -ity).",
      "Replace 'People' subjects with abstract concepts.",
      "Analyze the effect of nominalization on tone and objectivity."
    ],
    objectivesAr: [
      "فهم التحول من الأسلوب 'الفعلي' إلى الأسلوب 'الاسمي'.",
      "تحديد لواحق الأسماء المجردة.",
      "استبدال الفواعل البشرية بمفاهيم مجردة.",
      "تحليل أثر الـ nominalization على نغمة النص وموضوعيته."
    ]
  },
  content: `
### 1. What is Nominalization? (التحويل لاسم)
Instead of using a verb to describe an action, we use a noun. This makes the sentence more objective and formal.
*   *Verbal (B1):* We **analyzed** the data and it helped us **understand** the problem.
*   *Nominal (C2):* **Analysis** of the data provided a clearer **understanding** of the problem.

### 2. Removing the "Human" Subject
Academic writing avoids "We" or "I". Nominalization helps achieve this.
*   *Verbal:* We **investigated** the cause of the fire.
*   *Nominal:* The **investigation** into the cause of the fire was exhaustive.

### 3. Benefits of Nominalization
1.  **Conciseness:** You can pack more information into a shorter space.
2.  **Objectivity:** Focuses on facts/processes rather than people.
3.  **Flow:** Allows for easier linking between abstract ideas.

### 4. Advanced Transformation Examples
| Verb/Adjective | Nominalized Form | C2 Sentence |
| :--- | :--- | :--- |
| **Implement** | **Implementation** | The **implementation** of the policy was swift. |
| **Difficult** | **Difficulty** | The **difficulty** lies in the lack of resources. |
| **Expose** | **Exposure** | Chronic **exposure** to chemicals leads to illness. |

### 5. Warning: Over-nominalization
Don't make sentences too "heavy" or "wooden". At C2, you must find a balance between professional density and clarity.
`,
  contentAr: `
### 1. ما هو الـ Nominalization؟
هو عملية تحويل الأفعال أو الصفات إلى أسماء. هذا يحول "الحدث" إلى "مفهوم".
*   أسلوب بسيط: "لقد **تم تحليل** البيانات وساعدنا على **فهم** المشكلة."
*   أسلوب C2: "**تحليل** البيانات وفّر **فهماً** أوضح للمشكلة."

### 2. إزالة "الفاعل البشري"
في الكتابة الأكاديمية، نبحث عن الموضوعية. بدلاً من قول "نحن حققنا"، نقول "التحقيق وفّر...".
*   **Construction of the dam resulted in...** (بناء السد أدى إلى... - لاحظ أننا لم نظهر من بنى السد).

### 3. فوائد هذا الأسلوب
1.  **الكثافة المعلوماتية:** يمكنك قول الكثير بكلمات قليلة.
2.  **الموضوعية:** التركيز على الحقيقة لا على الشخص.

### 4. أمثلة للتحويل المتقدم
*   **Produce -> Production** (The production of electricity).
*   **Fail -> Failure** (The failure of the system).
*   **Stable -> Stability** (Economic stability).

### 5. التوازن المطلوب
الكاتب المبدع في مستوى C2 يعرف متى يستخدم الأسماء للأكاديمية ومتى يستخدم الأفعال للحركة والوضوح.

> **نصيحة:** إذا أردت أن تبدو "عالماً" أو "باحثاً"، حول أفعالك الرئيسية إلى أسماء تجريدية.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Transform the verb/adjective into a noun and rewrite the sentence.',
      instructionAr: 'حول الفعل/الصفة إلى اسم وأعد صياغة الجملة.',
      items: [
        { text: "They *discovered* new planets. -> The _______ of new planets...", textAr: "اكتشفوا كواكب جديدة. -> _______ كواكب جديدة..." },
        { text: "The city has *expanded* rapidly. -> The rapid _______ of the city...", textAr: "توسعت المدينة بسرعة. -> _______ السريع للمدينة..." },
        { text: "It is *diverse* in culture. -> Cultural _______ is its main feature.", textAr: "هي متنوعة ثقافياً. -> _______ الثقافي هو ميزتها الرئيسية." }
      ]
    }
  ],
  quiz: [
    {
      question: "Which sentence is highly nominalized?",
      questionAr: "أي جملة تعتبر غارقة في الأسلوب 'الاسمي' (Nominalized)؟",
      options: ["We analyzed the results carefully.", "The analysis of the results was conducted with care.", "She is careful about her analysis.", "Analysing leads to success."],
      optionsAr: ["حللنا النتائج بعناية.", "تحليل النتائج تـمّ إجراؤه بعناية.", "هي حذرة في تحليلها.", "التحليل يؤدي للنجاح."],
      correctIndex: 1,
      explanation: "This structure focuses on the abstract 'analysis' and uses a passive verb, stripping away the human subjects.",
      explanationAr: "هذا الهيكل يركز على المفهوم المجرد 'التحليل' ويستخدم فعلاً مبنياً للمجهول، مما يزيل الفواعل البشرية."
    }
  ]
};
