
import { Lesson, proficiencyLevel } from "../../types";

export const conditionalsB2: Partial<Lesson> = {
  title: "Advanced Conditionals: 3rd & Mixed",
  titleAr: "الجمل الشرطية المتقدمة: الحالة الثالثة والمختلطة",
  proficiencyLevel: proficiencyLevel.B2,
  warmup: {
    mission: "Learn how to talk about regrets in the past and how past events affect the present.",
    missionAr: "تعلم كيفية التحدث عن الندم في الماضي وكيف تؤثر أحداث الماضي على الحاضر.",
    objectives: [
      "Form the Third Conditional for past regrets.",
      "Understand Mixed Conditionals (Past -> Present).",
      "Use 'Wish' and 'If only' for regrets.",
      "Analyze historical 'What if' scenarios."
    ],
    objectivesAr: [
      "صياغة الشرط الثالث للندم على الماضي.",
      "فهم الشرط المختلط (تأثير الماضي على الحاضر).",
      "استخدام 'Wish' و 'If only' للتعبير عن الندم.",
      "تحليل سيناريوهات 'ماذا لو' التاريخية."
    ]
  },
  content: `
### 1. The Third Conditional (Regrets)
We use this to imagine a different past. It is for things that **did not happen**.
*   **Structure:** **If + Past Perfect, ... Would have + Past Participle**
*   *Example:* "If I **had studied** harder, I **would have passed** the exam." (But I didn't study and I didn't pass).

### 2. Mixed Conditionals (Past Result in Present)
Sometimes a past action affects how we are **now**.
*   **Structure:** **If + Past Perfect, ... Would + Verb**
*   *Example:* "If I **had taken** that job (Past), I **would be** rich now (Present)."

### 3. Wish and If Only (ندم وتمني)
*   **Wish + Past Simple:** To change a present situation. (*I wish I had more money.*)
*   **Wish + Past Perfect:** To express regret about a past action. (*I wish I hadn't eaten so much.*)

### 4. Summary of Forms
| Type | Usage | Structure |
| :--- | :--- | :--- |
| **3rd Conditional** | Past Regret | If + Had V3, Would Have V3 |
| **Mixed** | Past effect on Now | If + Had V3, Would + Verb |
| **Wish (Past)**| Past Regret | Wish + Had V3 |
`,
  contentAr: `
### 1. الحالة الشرطية الثالثة (الندم على الماضي)
نستخدمها لنتخيل ماضياً مختلفاً عما حدث فعلاً. هي تعبر عن "مستحيل" لأن الماضي انتهى.
*   **القاعدة:** **If + ماضي تام (Had V3), ... Would have + تصريف ثالث**
    *   **If I had known, I would have helped you.** (لو كنت أعلم، لكنت ساعدتك - ولكن في الحقيقة لم أكن أعلم).

### 2. الحالة المختلطة (الشرط المختلط)
نربط فيها حدثاً في الماضي بحالة حالية في الحاضر.
*   **If you had slept early (Past), you wouldn't be tired now (Present).**

### 3. التمني والندم (Wish)
*   **Wish + ماضي بسيط:** لتغيير الحاضر. (**I wish I spoke English better.**)
*   **Wish + ماضي تام:** للندم على شيء في الماضي. (**I wish I had chosen the blue car.**)

### 4. ملاحظة
كلمة **If only** هي نسخة أقوى وأكثر عاطفية من **I wish**.

> **قاعدة ذهبية:** في الشرط الثالث، تذكر دائماً "الماضي التام" في جملة If، وكلمة "Have" دائماً قبل التصريف الثالث في الجزء الثاني.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Complete the sentence using the Third Conditional.',
      instructionAr: 'أكمل الجملة باستخدام الحالة الشرطية الثالثة.',
      items: [
        { text: "If we _______ (start) earlier, we _______ (finish) on time.", textAr: "لو _______ (بدأنا) أبكر، لـ _______ (أنهينا) في الوقت المحدد." },
        { text: "I _______ (not / go) to the party if I _______ (know) he was there.", textAr: "ما كنت _______ (أذهب) للحفلة لو _______ (علمت) أنه هناك." },
        { text: "If she _______ (win), she _______ (be) famous now.", textAr: "لو كانت _______ (فازت) -في الماضي-، لـ _______ (كانت) مشهورة الآن." }
      ]
    }
  ],
  quiz: [
    {
      question: "Which structure is used for a PAST regret?",
      questionAr: "أي هيكل يُستخدم للندم على شيء في الماضي؟",
      options: ["If I win...", "If I won...", "If I had won...", "If I will win..."],
      optionsAr: ["If I win...", "If I won...", "If I had won...", "If I will win..."],
      correctIndex: 2,
      explanation: "The Third Conditional (If + Past Perfect) is dedicated to imagining a different past.",
      explanationAr: "الحالة الشرطية الثالثة (If + ماضي تام) مخصصة لتخيل ماضٍ مختلف."
    }
  ]
};
