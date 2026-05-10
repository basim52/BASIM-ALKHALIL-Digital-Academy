
import { Lesson, proficiencyLevel } from "../../types";

export const registerShiftC2: Partial<Lesson> = {
  title: "Linguistic Precision & Register Shift",
  titleAr: "الدقة اللغوية وتحول سجل اللغة (Register Shift)",
  proficiencyLevel: proficiencyLevel.C2,
  warmup: {
    mission: "Learn how to choose the precise level of language for any situation, from casual slang to high-court legal ease.",
    missionAr: "تعلم كيفية اختيار المستوى اللغوي الدقيق لأي موقف، من العامية الدارجة إلى اللغة القانونية رفيعة المستوى.",
    objectives: [
      "Distinguish between Frozen, Formal, Consultative, Casual, and Intimate registers.",
      "Use 'Hedging' and 'Boosting' to modulate certainty.",
      "Master academic connectors and transition signals.",
      "Identify 'Colloquialisms' vs. 'Euphemisms'."
    ],
    objectivesAr: [
      "التمييز بين مستويات اللغة الـ 5 (المتجمِّدة، الرسمية، الاستشارية، العامية، الحميمة).",
      "استخدام 'التحوط' (Hedging) والتعزيز للتلاعب بدرجة اليقين.",
      "إتقان الروابط الأكاديمية وإشارات الانتقال.",
      "تحديد 'اللغة العامية' مقابل 'اللغة المخففة' (Euphemisms)."
    ]
  },
  content: `
### 1. The 5 Registers of Language
As a C2 learner, you must know NOT just the word, but where to use it.
1.  **Frozen:** Static, ritualistic (Legal, Bible).
2.  **Formal:** One-way communication (Speeches, reports).
3.  **Consultative:** Standard professional conversation (Doctor-Patient).
4.  **Casual:** Friends and family.
5.  **Intimate:** Private code between very close people.

### 2. Hedging (التحوط ولغة الاحتمال)
In academic English, we rarely say "This is true." We protect our claims using hedging:
*   *Verbs:* **Suggest, appear to, seem to, tend to.**
*   *Adverbs:* **Arguably, potentially, conceivably.**
*   *Example:* "The data **suggests** a **potential** correlation." (Instead of: The data shows a link).

### 3. Boosting (التعزيز)
When you want to show strong confidence:
*   **Clearly, undoubtedly, without a doubt, crucially.**

### 4. Euphemisms (تلطيف الكلام)
Using polite words for unpleasant topics:
*   **Economically disadvantaged** (instead of Poor).
*   **Between jobs** (instead of Unemployed).
*   **Passed away** (instead of Died).

### 5. Synonyms across Registers
| Casual | Formal / Academic |
| :--- | :--- |
| **Get** | **Obtain / Acquire** |
| **Give** | **Provide / Contribute** |
| **Think** | **Conceive / Opine** |
| **Enough** | **Sufficient / Ample** |
`,
  contentAr: `
### 1. مستويات اللغة الخمسة (Registers)
في C2، الكلمة ليست مجرد "معنى"، بل هي "أين تـقال".
1.  **المتجمِّدة:** القوانين والدساتير (اللغة التي لا تتغير).
2.  **الرسمية:** المحاضرات والتقارير.
3.  **الاستشارية:** المحادثات المهنية (مع مديرك أو طبيبك).
4.  **العامية:** بين الأصدقاء.

### 2. لغة التحوّط (Hedging)
في البحث العلمي، الصراحة الزائدة تعتبر ضعفاً. نستخدم كلمات تترك مجالاً للشك لتبدو موضوعياً:
*   **It would appear that...** (يبدو للناظر أن...).
*   **Possibly... / Tentatively...**

### 3. لغة التعزيز (Boosting)
عندما تريد إثبات قوتك في حجة ما:
*   **Undoubtedly...** (بلا أدنى شك).
*   **Categorically...** (بشكل قاطع).

### 4. التلطيف (Euphemisms)
البراعة في اختيار كلمات لا تؤذي المشاعر أو تبدو فجة:
*   بدلاً من "Poor" (فقير)، نستخدم **Underprivileged**.

### 5. المترادفات وسجل اللغة
المحترف في C2 لا يستخدم فعل "Get" في كل جملة، بل يختار **Acquire, Reach, Receive, Procure** حسب الموقف.

> **قاعدة ذهبية:** لغة C2 هي القدرة على الحرب بقلم "دبلوماسي" أو السمر بلسان "شعبي" بطلاقة تامة في كليهما.
`,
  exercises: [
    {
      type: 'multiple',
      instruction: 'Select the most appropriate formal synonym.',
      instructionAr: 'اختر المرادف الرسمي الأكثر ملاءمة.',
      items: [
        { 
          text: "The company wants to *get* new clients.", 
          textAr: "الشركة تريد أن *تجلب* عملاء جدد.",
          options: ["Buy", "Acquire", "Pick up", "Fetch"],
          optionsAr: ["شراء", "الاستحواذ على/جلب (Acquire)", "التقاط", "إحضار"],
          answer: "Acquire"
        },
        { 
          text: "There is *enough* evidence to support this.", 
          textAr: "هناك أدلة *كافية* لدعم هذا.",
          options: ["Sufficient", "Plenty of", "A lot of", "Okay"],
          optionsAr: ["كافية (Sufficient)", "الكثير من", "أطنان من", "جيد"],
          answer: "Sufficient"
        }
      ]
    }
  ],
  quiz: [
    {
      question: "Which of these is an example of 'Hedging'?",
      questionAr: "أي مما يلي يعتبر مثالاً على 'التحوط' (Hedging)؟",
      options: ["This is certainly true.", "It is definitely wrong.", "The results might indicate a trend.", "Everybody knows this."],
      optionsAr: ["هذا مؤكد ومحقق.", "من الخطأ تماماً.", "قد تشير النتائج إلى وجود اتجاه معين.", "الجميع يعرف هذا."],
      correctIndex: 2,
      explanation: "Using 'might' and 'indicate' instead of certainties allows for academic caution.",
      explanationAr: "استخدام 'might' و 'indicate' بدلاً من اليقين يسمح بالحذر الأكاديمي المطلوب."
    }
  ]
};
