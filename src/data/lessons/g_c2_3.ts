
import { Lesson, proficiencyLevel } from "../../types";

export const perfectModalsC2: Partial<Lesson> = {
  title: "Advanced Modal Nuances",
  titleAr: "دلالات الأفعال المساعدة المتقدمة (C2)",
  proficiencyLevel: proficiencyLevel.C2,
  warmup: {
    mission: "Explore the subtle differences between perfect modals to express various degrees of certainty, criticism, and past speculation.",
    missionAr: "استكشف الفروق الدقيقة بين الأفعال المساعدة التامة للتعبير عن درجات مختلفة من اليقين، النقد، والتخمين في الماضي.",
    objectives: [
      "Distinguish between 'Must have', 'Could have', and 'Might have'.",
      "Use 'Should have' and 'Ought to have' for high-level criticism.",
      "Understand 'Needn't have' vs. 'Didn't need to'.",
      "Master epistemic modals for deduction."
    ],
    objectivesAr: [
      "التمييز بين 'Must have' و 'Could have' و 'Might have'.",
      "استخدام 'Should have' و 'Ought to have' للنقد رفيع المستوى.",
      "فهم الفرق بين 'Needn't have' و 'Didn't need to'.",
      "إتقان الأفعال المساعدة المعرفية (Epistemic) للاستنتاج."
    ]
  },
  content: `
### 1. Speculation about the Past (التخمين في الماضي)
*   **Must have + V3:** 99% Certain (Positive).
    *   *The streets are wet. It **must have rained**.*
*   **Can't have + V3:** 99% Certain (Negative).
    *   *She **can't have stolen** it. She was with me.*
*   **Might/Could have + V3:** Possible but not certain.
    *   *I **might have left** my phone at the office.*

### 2. Regret and Criticism (الندم والنقد)
*   **Should have / Ought to have:** A better action was possible.
    *   *You **ought to have told** me sooner.* (Strong recommendation).

### 3. The 'Need' Trap (الفخ في Need)
*   **Didn't need to do:** I didn't do it because it wasn't necessary.
    *   *I **didn't need to take** an umbrella (and I didn't).*
*   **Needn't have done:** I did it, but it was a waste of time.
    *   *I **needn't have taken** an umbrella (it didn't rain, but I carried it anyway).*

### 4. Advanced: Modals of Persistence/Habit
*   **Will / Would:** Not for time, but for behavior.
    *   *He **will** sit there for hours just staring.* (Typical behavior).
    *   *She **would** always leave her socks on the floor.* (Annoying past habit).

### 5. Conditional Modals (C2 nuance)
*   **Could have** (Ability/Possibility was there but not used).
*   **Might have** (Chance event that didn't happen).
`,
  contentAr: `
### 1. التخمين الاستنتاجي (Speculation)
في C2، يجب أن تكون دقيقاً في اختيار الفعل المساعد:
*   **Must have + V3:** متأكد جداً (إيجاب).
*   **Can't have + V3:** متأكد جداً (نفي/استحالة).
*   **Might / Could have:** مجرد احتمال.

### 2. الفرق بين "لم يكن ضرورياً"
*   **Didn't need to:** الفاعل **لم يقم** بالفعل لأنه عرف أنه غير ضروري. (لم أضطر لغسل الصحون لأن الغسالة فعلت ذلك).
*   **Needn't have:** الفاعل **قام** بالفعل ثم اكتشف لاحقاً أنه لم يكن ضرورياً. (لا داعي لأن أكون قد فعلت ذلك... لقد ضيعت وقتي).

### 3. أفعال السلوك (Will / Would)
نستخدمهما لوصف سلوك "نمطي" للشخص:
*   **She will keep talking even if nobody listens.** (ستستمر في الكلام... - طبع نمطي).

### 4. نقد الماضي الراقي
*   **You ought to have known better.** (كان ينبغي أن تكون أكثر حكمة من ذلك).

### 5. دقة التعبير
في C2، اختيارك للفعل المساعد يغير المعنى القانوني أو الجنائي للجملة.

> **قاعدة ذهبية:** مع الأفعال المساعدة التامة (Modal + Have + V3)، نحن دائماً ننظر إلى "الماضي" بعين "الحاضر".
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Choose the correct Perfect Modal (must have, can\'t have, needn\'t have).',
      instructionAr: 'اختر الفعل المساعد التام الصحيح.',
      items: [
        { text: "He _______ (steal) the car; he was in another country at the time.", textAr: "هو _______ (يسرق) السيارة؛ لقد كان في بلد آخر وقتها." },
        { text: "I bought bread, but we already had plenty. I _______ (buy) any.", textAr: "اشتريت خبزاً ولكن لدينا الكثير. _______ (أشترِ) أي خبز (ندم على تضييع الجهد)." },
        { text: "The ground is soaked. It _______ (rain) very hard.", textAr: "الأرض غارقة. لا بد أنه _______ (هطل المطر) بغزارة." }
      ]
    }
  ],
  quiz: [
    {
      question: "Which form implies the action WAS DONE but was unnecessary?",
      questionAr: "أي صيغة تعني أن الفعل تـمّ القـيام بـه بالفعل ولكنه لم يكن ضرورياً؟",
      options: ["Didn't need to do", "Needn't have done", "Mustn't have done", "Shouldn't do"],
      optionsAr: ["Didn't need to do", "Needn't have done", "Mustn't have done", "Shouldn't do"],
      correctIndex: 1,
      explanation: "'Needn't have + V3' reflects an action undertaken in vain.",
      explanationAr: "'Needn't have + V3' تعكس فعلاً تـم القيـام به هباءً."
    }
  ]
};
