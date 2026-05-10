
import { Lesson, proficiencyLevel } from "../../types";

export const complexConditionalsC2: Partial<Lesson> = {
  title: "Complex Conditional Structures",
  titleAr: "هياكل الشرط المعقدة (C2)",
  proficiencyLevel: proficiencyLevel.C2,
  warmup: {
    mission: "Explore the most sophisticated ways to express hypothetical conditions, including the omission of 'if' and the use of 'but for'.",
    missionAr: "استكشف أكثر الطرق تطوراً للتعبير عن الشروط الافتراضية، بما في ذلك حذف 'if' واستخدام 'but for'.",
    objectives: [
      "Master 'If' omission with 'Should', 'Were', and 'Had'.",
      "Use 'But for' and 'Were it not for'.",
      "Understand the semantics of 'If + will/would' as a polite request or persistence.",
      "Differentiate between 'Provided' vs. 'As long as' in formal contexts."
    ],
    objectivesAr: [
      "إتقان حذف 'If' مع 'Should' و 'Were' و 'Had'.",
      "استخدام 'But for' و 'Were it not for'.",
      "فهم دلالات 'If + will/would' كطلب مهذب أو إصرار.",
      "التفريق بين 'Provided' و 'As long as' في السياقات الرسمية."
    ]
  },
  content: `
### 1. Inverted Conditionals (The Omission of IF)
In high-level academic or formal writing, we drop **If** and invert the subject and auxiliary.

*   *Type 1 (Should):* If you need help -> **Should you need** any assistance...
*   *Type 2 (Were):* If I were him -> **Were I** in his position...
*   *Type 3 (Had):* If we had known -> **Had we known** about the changes...

### 2. Alternatives to IF (Formal)
*   **But for / Were it not for / Had it not been for:** Means "if it weren't for". 
    *   *Example:* **But for** your help, I would have failed.
    *   *Example:* **Had it not been for** the rain, we would have finished.
*   **Provided that / Providing / On condition that**
*   **Suppose / Supposing**

### 3. If + Will / Would (Politeness & Persistence)
Usually, we don't use 'will' in the If-clause. **However**, we do it at C2 to show:
1.  **Polite Request:** "If you **will** wait a moment, I'll see if he's in."
2.  **Persistence (Stubbornness):** "If you **will** keep smoking, you will get sick."

### 4. Otherwise & Or else
Used to show the consequence of not meeting a condition.
*   *Sentence:* You must study; **otherwise**, you'll fail.
`,
  contentAr: `
### 1. الشرط المقلوب (حذف If)
في المستويات الجامعية والسياسية، يتم حذف If وعمل "قلب" للفاعل والفعل المساعد.
*   **Should you require further information, please contact us.** (إذا احتجت... - صيغة رسمية جداً).
*   **Had I known about the party, I would have come.** (لو كنت أعلم...).

### 2. بدائل كلمة If الرسمية
*   **But for:** (لولا).
    *   **But for your support, I wouldn't be here.** (لولا دعمك، لما كنت هنا).
*   **Were it not for... / Had it not been for...** (بصيغة القلب الأطول والأكثر رسمية).
*   **Provided that:** بشرط أن.

### 3. استخدام Will و Would في جملة If!
خلافاً للقاعدة الأساسية، نستخدمهما في C2 للتعبير عن:
1.  **الطلب المهذب:** **If you will follow me...** (إذا تكرمت بتباعي...).
2.  **الإصرار على الخطأ:** **If you will drink so much, don't complain about the bill.** (إذا كنت مصراً على الشرب كثيراً...).

### 4. دقة C2
في هذا المستوى، الفرق بين "If" و "Providing that" يكمن في **درجة الرسمية واليقين**.

> **قاعدة ذهبية:** عندما ترى جملة تبدأ بـ **Had** أو **Should** وتنتهي بعلامة نقطة (ليست سؤالاً)، فأنت أمام جملة شرطية مقلوبة رفيعة المستوى.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Rewrite the sentence by omitting "If" (Inversion).',
      instructionAr: 'أعد كتابة الجملة بحذف "If" (استخدم القلب).',
      items: [
        { text: "If we had known about the costs, we wouldn't have started. -> _______ we known...", textAr: "لو كنا نعلم بالتكاليف... -> _______ علمنا..." },
        { text: "If you should find my keys, please call me. -> _______ you find...", textAr: "إذا وجدت مفاتيحي... -> _______ تجد..." },
        { text: "If I were the president, I would change many laws. -> _______ I the president...", textAr: "لو كنت الرئيس... -> _______ أنا الرئيس..." }
      ]
    }
  ],
  quiz: [
    {
      question: "Which structure means 'If it wasn't for...'?",
      questionAr: "أي هيكل يعني 'لولا...'؟",
      options: ["But for", "If for", "Without to", "Instead of"],
      optionsAr: ["لولا (But for)", "If for", "Without to", "Instead of"],
      correctIndex: 0,
      explanation: "'But for' is a highly concise and formal conditional prepositional phrase.",
      explanationAr: "'But for' هي عبارة شرطية رسمية ومختصرة للغاية تعني 'لولا وجود'."
    }
  ]
};
