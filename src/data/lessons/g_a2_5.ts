
import { Lesson, proficiencyLevel } from "../../types";

export const modalsA2: Partial<Lesson> = {
  title: "Modals: Can, Could & May",
  titleAr: "الأفعال المساعدة: الاستطاعة والاستئذان",
  proficiencyLevel: proficiencyLevel.A2,
  warmup: {
    mission: "Learn how to talk about your abilities and how to ask for things politely.",
    missionAr: "تعلم كيفية التحدث عن قدراتك وكيفية طلب الأشياء بأدب.",
    objectives: [
      "Use 'Can' for present ability.",
      "Use 'Could' for past ability.",
      "Use 'Can/May/Could' for requests.",
      "Learn how to be formal vs. informal."
    ],
    objectivesAr: [
      "استخدام 'Can' للقدرة في الحاضر.",
      "استخدام 'Could' للقدرة في الماضي.",
      "استخدام 'Can/May/Could' للطلبات.",
      "تعلم متى تكون رسمياً ومتى تكون غير رسمي."
    ]
  },
  content: `
### 1. Ability
*   **Present:** Use **Can**. 
    *   *I **can** speak English.*
*   **Past:** Use **Could**.
    *   *When I was ten, I **could** swim very well.*

### 2. Request & Permission
We use these to ask favor or ask to do something.
*   **Informal (General):** **Can** I have some water?
*   **Formal / Polite (Better):** **Could** I speak to the manager?
*   **Very Formal / Official:** **May** I enter?

### 3. Structure
**Modal + Base Verb (No to! No -s! No -ing!)**
*   *Correct:* "He can **run**." (Not: He can runs / He can to run).

### 4. Negatives
*   Can -> **Cannot / Can't**
*   Could -> **Could not / Couldn't**
*   May -> **May not**
`,
  contentAr: `
### 1. القدرة
*   **في الحاضر:** نستخدم أداة تدل على الاستطاعة الآن.
    *   أستطيع القيادة.
*   **في الماضي:** نستخدم أداة تدل على الاستطاعة سابقاً.
    *   كنت أستطيع الركض سريعاً عندما كنت صغيراً.

### 2. الطلب والاستئذان
هناك درجات مختلفة من الأدب في الطلب:
*   الأداة الأولى: تستخدم في المواقف العادية ومع الأصدقاء.
*   الأداة الثانية: أكثر أدباً ورسمية، تستخدم في المطعم أو العمل مثلاً.
*   الأداة الثالثة: رسمية جداً، تستخدم في الاستئذان الرسمي.

### 3. القاعدة الأساسية
بعد هذه الكلمات المساعدة، يأتي الفعل في صورته الأصلية والمجردة تماماً من أي إضافات.
*   نقول: هم يستطيعون السباحة.

### 4. النفي
*   تستخدم أدوات النفي للدلالة على المنع أو عدم القدرة في الحاضر أو الماضي.

> **نصيحة:** إذا أردت أن تبدو مهذباً جداً عند طلب شيء ما، استخدم الصيغة الأكثر أدباً متبوعة بكلمة "من فضلك".
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Complete with: can, could, can\'t.',
      instructionAr: 'أكمل باستخدام: can, could, can\'t.',
      items: [
        { text: "When I was 5, I _______ ride a bike.", textAr: "عندما كان عمري 5 سنوات، _______ أركب الدراجة." },
        { text: "I _______ swim now, but I want to learn.", textAr: "أنا _______ أسبح الآن، لكني أريد أن أتعلم." },
        { text: "_______ you open the window, please?", textAr: "_______ تفتح النافذة، من فضلك؟" }
      ]
    }
  ],
  quiz: [
    {
      question: "Which of these is the most polite request?",
      questionAr: "أي من هذه يعتبر الطلب الأكثر أدباً؟",
      options: ["Give me water.", "Can I have water?", "Could I have some water, please?", "I want water."],
      optionsAr: ["Give me water.", "Can I have water?", "Could I have some water, please?", "I want water."],
      correctIndex: 2,
      explanation: "'Could' combined with 'please' is considered a polite formal request.",
      explanationAr: "استخدام 'Could' مع كلمة 'please' يعتبر طلباً رسمياً مهذباً."
    }
  ]
};
