
import { Lesson, proficiencyLevel } from "../../types";

export const reportedSpeechB2: Partial<Lesson> = {
  title: "Reported Speech: Indirect Language",
  titleAr: "الكلام المنقول: اللغة غير المباشرة",
  proficiencyLevel: proficiencyLevel.B1,
  warmup: {
    mission: "Learn how to report what someone else said without using their exact words.",
    missionAr: "تعلم كيفية نقل ما قاله شخص آخر دون استخدام كلماته الدقيقة.",
    objectives: [
      "Understand the 'Backshift' rule for tenses.",
      "Change pronouns and time markers correctly.",
      "Report questions using 'if' or 'whether'.",
      "Master reporting verbs like 'promised', 'denied', 'reminded'."
    ],
    objectivesAr: [
      "فهم قاعدة 'تراجع الأزمنة' (Backshift).",
      "تغيير الضمائر ودلالات الوقت بشكل صحيح.",
      "نقل الأسئلة باستخدام 'if' أو 'whether'.",
      "إتقان أفعال النقل مثل 'وعد'، 'أنكر'، 'ذكر'."
    ]
  },
  content: `
### 1. What is Reported Speech? (ما هو الكلام المنقول؟)
When we tell someone what another person said. Usually, we move the tense **one step back** into the past.

*   *Direct:* "I **am** happy."
*   *Reported:* He said he **was** happy.

### 2. The Tense Backshift (تراجع الأزمنة)
| Direct Tense | Reported Tense |
| :--- | :--- |
| **Present Simple** (work) | **Past Simple** (worked) |
| **Present Continuous** (am working) | **Past Continuous** (was working) |
| **Will** (will go) | **Would** (would go) |
| **Can** (can do) | **Could** (could do) |
| **Past Simple** (saw) | **Past Perfect** (had seen) |

### 3. Changes in Time & Place
*   **Today** -> **That day**
*   **Yesterday** -> **The day before**
*   **Tomorrow** -> **The next day**
*   **Here** -> **There**

### 4. Reporting Questions
We use the word **if** for Yes/No questions and we don't use "do/did".
*   *Direct:* "Do you like tea?"
*   *Reported:* She asked **if** I liked tea. (No 'do').
`,
  contentAr: `
### 1. ما هو الكلام المنقول؟
عندما تنقل خبراً قاله شخص آخر، لا تستخدم "علامات تنصيص"، بل تحول الكلام ليناسب الغائب.

### 2. قاعدة "تراجع الزمن" (Backshift)
بما أن الكلام قيل في الماضي، فإننا نرجع بالزمن خطوة للوراء:
*   إذا قال الشخص "أنا **أحب**" (مضارع)، تقول "هو قال أنه **أحبّ**" (ماضي).
*   المضارع البسيط -> يصبح ماضي بسيط.
*   المستقبل (Will) -> يصبح (Would).
*   الماضي البسيط -> يصبح ماضي تام (Had V3).

### 3. تغيير الضمائر والظروف
يجب أن تغير الضمير ليعود على الشخص:
*   إذا قالت سارة: "هذا كتابي (**My** book)".
*   نقول: "سارة قالت أنه كتابها (**Her** book)".
*   **Yesterday** تصبح **The day before**.

### 4. نقل الأسئلة
نستخدم كلمة **if** لسؤال نعم/لا، ونعيد ترتيب الجملة لتصبح جملة عادية (الفاعل قبل الفعل).
*   "هل أنت جائع؟" -> هو سألني **إذا** كنت جائعاً.
*   **Are you hungry?** -> **He asked if I was hungry.**

> **نصيحة:** أفعال النقل مثل **Suggest, Deny, Promise** تجعل لغتك تبدو أكثر تقدماً واحترافية.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Report the sentence. Start with: "He said that..."',
      instructionAr: 'انقل الجملة. ابدأ بـ: "هو قال أن..."',
      items: [
        { text: "\"I will call you tomorrow.\"", textAr: "\"سأتصل بك غداً.\"" },
        { text: "\"I have finished my homework.\"", textAr: "\"لقد أنهيت واجبي.\"" },
        { text: "\"We are watching a movie.\"", textAr: "\"نحن نشاهد فيلماً.\"" }
      ]
    }
  ],
  quiz: [
    {
      question: "In reported speech, 'Tomorrow' becomes:",
      questionAr: "في الكلام المنقول، كلمة 'Tomorrow' (غداً) تصبح:",
      options: ["The day after", "The text day", "The following day", "All of the above"],
      optionsAr: ["اليوم التالي", "اليوم الذي يليه", "اليوم التابع", "كل ما سبق"],
      correctIndex: 3,
      explanation: "Several time phrases can replace 'tomorrow', emphasizing it's the day after the original speaking time.",
      explanationAr: "عديد من العبارات يمكن أن تحل محل 'tomorrow'، مع التأكيد على أنه اليوم الذي يلي وقت الكلام الأصلي."
    }
  ]
};
