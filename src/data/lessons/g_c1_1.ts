
import { Lesson, proficiencyLevel } from "../../types";

export const inversionC1: Partial<Lesson> = {
  title: "Inversion: Negative Adverbials",
  titleAr: "القلب القواعدي: الظروف النافية (Inversion)",
  proficiencyLevel: proficiencyLevel.C1,
  warmup: {
    mission: "Learn how to use inversion to add emphasis and a formal tone to your writing and speeches.",
    missionAr: "تعلم كيفية استخدام 'القلب' (Inversion) لإضافة التأكيد والصبغة الرسمية لكتاباتك وخطاباتك.",
    objectives: [
      "Understand the structure of inversion (Verb before Subject).",
      "List negative adverbials like 'Never', 'Rarely', 'No sooner'.",
      "Apply inversion in formal and literary contexts.",
      "Distinguish between standard and inverted word order."
    ],
    objectivesAr: [
      "فهم هيكل القلب (الفعل قبل الفاعل).",
      "سرد الظروف النافية مثل 'أبداً'، 'نادراً'، 'ما إن'.",
      "تطبيق القلب في السياقات الرسمية والأدبية.",
      "التمييز بين ترتيب الكلمات القياسي والمقلوب."
    ]
  },
  content: `
### 1. What is Inversion? (ما هو القلب القواعدي؟)
Inversion happens when we put the **Auxiliary Verb** before the **Subject**, similar to a question structure, but in a statement. We do this for **emphasis** or **formal style**.

*   *Standard:* I have never seen such a beautiful view.
*   *Inverted:* **Never have I seen** such a beautiful view.

### 2. Common Negative Adverbials
When a sentence starts with these, inversion MUST follow:
*   **Never / Rarely / Seldom**
*   **Hardly / Scarcely / No sooner** (Used for sequential events).
*   **Under no circumstances**
*   **Not only ... but also**

### 3. Example Structures
*   **Scarcely** had I walked out **when** it started raining.
*   **Under no circumstances** should you open this door.
*   **Not only** did he win the race, **but** he also broke the record.

### 4. Why use it?
It sounds dramatic, persuasive, and highly educated. You will find it in literature, quality journalism, and high-level speeches.
`,
  contentAr: `
### 1. ما هو الـ Inversion؟
هو "قلب" ترتيب الجملة بحيث يسبق الفعل (المساعد) الفاعل، تماماً مثل صيغة السؤال، لكن الغرض هنا ليس السؤال بل **التأكيد الشديد** أو إعطاء طابع رسمي أدبي.

### 2. الكلمات التي تسبب هذا القلب
عندما تبدأ الجملة بإحدى هذه الكلمات النفي/الندرة:
*   **Never:** (أبداً).
*   **Rarely / Seldom:** (نادراً).
*   **Hardly / No sooner:** (ما إن... حتى).
*   **Under no circumstances:** (تحت أي ظرف من الظروف).

### 3. أمثلة توضيحية
*   جملة عادية: **I have never felt so happy.**
*   جملة مؤكدة (Inverted): **Never have I felt so happy.**

*   **Not only did he leave, but he also forgot his bag.** (لم يكتفِ بالرحيل فحسب، بل نسي حقيبته أيضاً). لاحظ استخدام **did he leave** بدلاً من "he left".

### 4. متى نستخدمه؟
في كتابة المقالات، الخطابات الرسمية، والأدب. هو علامة على التمكن العالي من اللغة (C1+).

> **قاعدة ذهبية:** عامل الجملة بعد الظرف النافي كأنها "سؤال" من حيث الترتيب، لكن في المعنى هي "جملة خبرية مؤكدة".
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Rewrite the sentence using Inversion.',
      instructionAr: 'أعد كتابة الجملة باستخدام القلب (Inversion).',
      items: [
        { text: "I have seldom heard such a talented singer. -> Seldom _______.", textAr: "نادراً ما سمعت مغنياً موهوباً كهذا. -> نادراً _______." },
        { text: "You should not leave the building under any circumstances. -> Under no circumstances _______.", textAr: "لا يجب أن تغادر المبنى تحت أي ظرف. -> تحت أي ظرف _______." },
        { text: "He didn't only pass the test; he got the top score. -> Not only _______.", textAr: "لم يكتفِ بالنجاح؛ بل حصل على أعلى درجة. -> لم يكتفِ _______." }
      ]
    }
  ],
  quiz: [
    {
      question: "Which of these is a correct inverted sentence?",
      questionAr: "أي من هذه الجمل تعتبر جملة مقلوبة (Inverted) صحيحة؟",
      options: ["Never I have seen this.", "Never have I seen this.", "Never I saw this.", "Never did I saw this."],
      optionsAr: ["Never I have seen this.", "Never have I seen this.", "Never I saw this.", "Never did I saw this."],
      correctIndex: 1,
      explanation: "After 'Never', we need the auxiliary 'have' before the subject 'I'.",
      explanationAr: "بعد 'Never'، نحتاج للفعل المساعد 'have' قبل الفاعل 'I'."
    }
  ]
};
