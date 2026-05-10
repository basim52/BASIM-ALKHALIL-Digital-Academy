
import { Lesson, proficiencyLevel } from "../../types";

export const presentSimpleA1: Partial<Lesson> = {
  title: "Present Simple Tense",
  titleAr: "الزمن المضارع البسيط",
  proficiencyLevel: proficiencyLevel.A1,
  warmup: {
    mission: "Learn how to talk about your daily routines, hobbies, and general facts.",
    missionAr: "تعلم كيفية التحدث عن روتينك اليومي، هواياتك، والحقائق العامة.",
    objectives: [
      "Use verbs in the Present Simple.",
      "Apply the 's' rule for He/She/It.",
      "Learn common time expressions (Every day, usually).",
      "Understand when to use it (Facts vs. Actions happening now)."
    ],
    objectivesAr: [
      "استخدام الأفعال في زمن المضارع البسيط.",
      "تطبيق قاعدة حرف الـ 's' مع He/She/It.",
      "تعلم تعبيرات الوقت الشائعة (كل يوم، عادةً).",
      "فهم متى نستخدمه (الحقائق مقابل الأحداث التي تقع الآن)."
    ]
  },
  content: `
### 1. When to use it?
We use the **Present Simple** for:
1.  **Habits:** Things you do again and again. (*I drink coffee every morning.*)
2.  **Facts:** Things that are always true. (*The sun rises in the east.*)

### 2. The Golden Rule of 'S'
For the verbs, we usually use the base form, EXCEPT for **He, She, and It**.

| Pronoun | Verb Form | Example |
| :--- | :--- | :--- |
| **I / You / We / They** | Base Form | I **play** tennis. |
| **He / She / It** | Base + **s** | He **playS** tennis. |

*   *Note:* If the verb ends in -o, -sh, -ch, or -x, we add **-es** (Go -> Goes, Watch -> Watches).

### 3. Helping Words
These words help show how often you do something:
*   **Always**
*   **Usually**
*   **Sometimes**
*   **Never**
*   **Every day**
`,
  contentAr: `
### 1. متى نستخدم المضارع البسيط؟
نستخدمه للتحدث عن:
1.  **الروتين:** أشياء تفعلها بانتظام (أنا أذهب للعمل يومياً).
2.  **الحقائق:** (الماء يغلي عند 100 درجة).

### 2. قاعدة الـ S مع الهي والشي واليت
هذه هي أهم قاعدة للمبتدئين:
*   مع الضمائر (أنا، أنت، نحن، هم): يبقى الفعل كما هو.
    *   أنا آكل.
*   مع الضمائر (هو، هي، هو/هي للمكان): نضيف حرف **S** لنهاية الفعل.
    *   هو يأكل.
    *   هي تنام.

### 3. كلمات التكرار
*   دائماً.
*   عادةً.
*   أبداً.

> **تذكر:** نستخدم هذا الزمن للأشياء المعتادة، وليس للأشياء التي تفعلها الآن في هذه اللحظة.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Fill in the correct form of the verb "work".',
      instructionAr: 'ضع الشكل الصحيح للفعل.',
      items: [
        { text: "My father _______ in a bank.", textAr: "والدي _______ في بنك." },
        { text: "I _______ in school.", textAr: "أنا _______ في مدرسة." },
        { text: "They _______ every day.", textAr: "هم _______ كل يوم." }
      ]
    }
  ],
  quiz: [
    {
      question: "Which sentence is correct?",
      questionAr: "أي جملة هي الصحيحة؟",
      options: ["She like chocolate.", "She likes chocolate.", "She liking chocolate.", "She is like chocolate."],
      optionsAr: ["She like chocolate.", "She likes chocolate.", "She liking chocolate.", "She is like chocolate."],
      correctIndex: 1,
      explanation: "For 'She', we must add 's' to the verb 'like'.",
      explanationAr: "مع الضمير 'She'، يجب إضافة حرف 's' للفعل."
    }
  ]
};
