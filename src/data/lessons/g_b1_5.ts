
import { Lesson, proficiencyLevel } from "../../types";

export const modalsObligationB1: Partial<Lesson> = {
  title: "Modals: Obligation & Advice",
  titleAr: "الأفعال المساعدة: الالتزام والنصيحة",
  proficiencyLevel: proficiencyLevel.B1,
  warmup: {
    mission: "Master the difference between what you MUST do, what you SHOULD do, and what you DON'T HAVE to do.",
    missionAr: "إتقان الفرق بين ما 'يجب' عليك فعله، وما 'ينبغي' عليك فعله، وما 'ليس من الضروري' فعله.",
    objectives: [
      "Use 'Must' and 'Have to' for obligation.",
      "Identify the strong prohibition of 'Mustn't'.",
      "Use 'Should' for advice.",
      "Understand 'Don't have to' (Not necessary)."
    ],
    objectivesAr: [
      "استخدام 'Must' و 'Have to' للالتزام.",
      "تحديد المنع القوي في 'Mustn't'.",
      "استخدام 'Should' للنصيحة.",
      "فهم 'Don't have to' (ليس ضرورياً)."
    ]
  },
  content: `
### 1. Strong Obligation (Must & Have to)
Both mean something is mandatory. 
*   **Must:** Often used for rules you tell yourself or formal written rules.
    *   *I **must** study harder.*
*   **Have to:** Often used for external rules (work, law).
    *   *I **have to** wear a uniform at work.*

### 2. Prohibition (Mustn't)
**Mustn't** means "Don't do it! It's against the rules."
*   *You **mustn't** smoke in the hospital.*

### 3. Lack of Necessity (Don't have to)
This is NOT the same as Mustn't. It means you can do it if you want, but it's not required.
*   *Tomorrow is Sunday. I **don't have to** wake up early.*

### 4. Advice (Should)
Use **Should** or **Shouldn't** to give your opinion or advice. 
*   *You **should** drink more water.*
*   *He **shouldn't** eat so much sugar.*

| Modal | Meaning |
| :--- | :--- |
| **Must** | Mandatory |
| **Mustn't** | Forbidden |
| **Should** | Good idea |
| **Don't have to** | Optional |
`,
  contentAr: `
### 1. الالتزام القوي
هناك أدوات تعبيرية تستخدم للإشارة إلى أن الفعل إلزامي وليس اختيارياً.
*   بعضها ينبع من قناعة الشخص الداخلية أو القواعد الأخلاقية التي يضعها لنفسه.
*   وبعضها يفرض من قبل جهة خارجية مثل القوانين العامة أو لوائح العمل.

### 2. المنع والتحريم
تستخدم هذه الصيغة للتعبير عن أن الفعل محظور تماماً ومخالف للقواعد المتبعة.
*   مثال: "يُحظر التدخين داخل المستشفى."

### 3. غياب الضرورة
هذه الصيغة لا تعني المنع، بل تعني أن القيام بالفعل ليس إلزامياً، ولك كامل الحرية في القيام به أو تركه.
*   مثال: "غداً إجازة، لذا لست مضطراً للاستيقاظ باكراً، ولكن يمكنك ذلك إن أردت."

### 4. تقديم النصيحة والآراء
نستخدم هذه الصيغة عندما نريد إخبار شخص ما بأن فعلاً معيناً هو أمر جيد ومستحسن القيام به، أو العكس.
*   مثال: "يجب عليك شرب المزيد من الماء للحفاظ على صحتك."

> **تنبيه:** بعد كل هذه الأدوات التعبيرية، يجب أن يتبعها الفعل في صيغته الأساسية دون أي إضافات.
`,
  exercises: [
    {
      type: 'multiple',
      instruction: 'Choose the correct modal.',
      instructionAr: 'اختر الفعل المساعد الصحيح.',
      items: [
        { 
          text: "It is a secret. You _______ tell anyone.", 
          textAr: "إنه سر. أنت _______ تخبر أحداً.",
          options: ["Mustn't", "Don't have to", "Should"],
          optionsAr: ["يمنع/لا يجوز (Mustn't)", "لست مضطراً", "ينبغي"],
          answer: "Mustn't"
        },
        { 
          text: "The museum is free. You _______ buy a ticket.", 
          textAr: "المتحف مجاني. أنت _______ تشتري تذكرة.",
          options: ["Must", "Don't have to", "Shouldn't"],
          optionsAr: ["يجب", "لست مضطراً (Don't have to)", "لا ينبغي"],
          answer: "Don't have to"
        }
      ]
    }
  ],
  quiz: [
    {
      question: "Which modal is used for giving ADVICE?",
      questionAr: "أي فعل مساعد يستخدم لتقديم النصيحة (Advice)؟",
      options: ["Must", "Should", "Have to", "Can"],
      optionsAr: ["Must", "Should", "Have to", "Can"],
      correctIndex: 1,
      explanation: "'Should' is the standard modal for suggestions and advice.",
      explanationAr: "'Should' هو الفعل المساعد القياسي للاقتراحات والنصائح."
    }
  ]
};
