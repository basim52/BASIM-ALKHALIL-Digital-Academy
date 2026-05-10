
import { Lesson, proficiencyLevel } from "../../types";

export const advancedGerundsC1: Partial<Lesson> = {
  title: "Advanced Gerunds & Infinitives",
  titleAr: "صيغ الـ Gerund والمصدر المتقدمة",
  proficiencyLevel: proficiencyLevel.C1,
  warmup: {
    mission: "Learn how to use passive, perfect, and continuous forms of gerunds and infinitives in complex sentences.",
    missionAr: "تعلم كيفية استخدام صيغ المجهول، التام، والمستمر للـ gerund والمصدر في الجمل المعقدة.",
    objectives: [
      "Master the Perfect Gerund (Having + V3).",
      "Master the Passive Infinitive (To be + V3).",
      "Use 'Verbs + Gerund/Infinitive' with different meanings (Remember/Forget).",
      "Apply these forms in formal reports and arguments."
    ],
    objectivesAr: [
      "إتقان الـ Gerund التام (Having + V3).",
      "إتقان المصدر المبني للمجهول (To be + V3).",
      "استخدام أفعال تأخذ كلا الصيغتين مع تغير المعنى (Remember/Forget).",
      "تطبيق هذه الصيغ في التقارير والحجج الرسمية."
    ]
  },
  content: `
### 1. Complex Gerund Forms
At C1, we move beyond simple "-ing".
*   **Perfect Gerund (Having + V3):** Shows an action finished before the main verb.
    *   *He denied **having stolen** the money.*
*   **Passive Gerund (Being + V3):** 
    *   *I enjoy **being invited** to such events.*

### 2. Complex Infinitive Forms
*   **Perfect Infinitive (To have + V3):** 
    *   *I'm glad **to have met** you.* (Met you in the past).
*   **Continuous Infinitive (To be + ing):** 
    *   *He seems **to be working** hard.* (Happening now).
*   **Passive Infinitive (To be + V3):** 
    *   *The report needs **to be finished**.*

### 3. Change in Meaning
Some verbs change meaning depending on what follows:
| Verb | + Gerund (-ing) | + Infinitive (to) |
| :--- | :--- | :--- |
| **Stop** | Finish an activity. (*Stopping smoking*) | Move to another. (*Stop to smoke*) |
| **Remember** | Past memory. (*I remember seeing him*) | Future duty. (*Remember to see him*) |
| **Try** | Experiment/Method. (*Try mixing them*) | Effort/Difficult. (*Try to open it*) |

### 4. Advanced Usage
Using these forms allows you to condense complex thoughts into sophisticated, tight sentences.
`,
  contentAr: `
### 1. صيغ الـ Gerund المعقدة
تجاوز مجرد إضافة ing:
*   **Gerund تام (Having + V3):** للحديث عن فعل تم قبل الفعل الرئيسي.
    *   **He admitted having lied.** (اعترف بأنه كذب -الكذب حدث أولاً-).
*   **Gerund مجهول (Being + V3):**
    *   **He hates being ignored.** (يكره أن يتم تجاهله).

### 2. صيغ المصدر المعقدة
*   **مصدر تام (To have + V3):**
    *   **I'm sorry to have kept you waiting.** (آسف لأني جعلتك تنتظر -في الماضي-).
*   **مصدر مستمر (To be + ing):**
    *   **You appear to be dreaming.** (يبدو أنك تحلم -الآن-).
*   **مصدر مجهول (To be + V3):**
    *   **This must be done.** (يجب أن يُفعل هذا).

### 3. تغيير المعنى
أفعال يتغير معناها تماماً حسب ما سيتبعها:
*   **Forget/Remember:** مع ing (تتذكر ذكرى)، مع to (تتذكر مهمة/واجب).
*   **Stop:** مع ing (تتوقف عن فعل الشيء نهائياً)، مع to (تتوقف لكي تفعل شيئاً آخر).

### 4. مهارة C1
إتقان هذه الصيغ يجعلك تعبر عن "أفعال داخل أفعال" في جملة واحدة رشيقة.

> **قاعدة ذهبية:** الـ "Perfect" دائماً ما يشير إلى أن الفعل المذكور حدث في وقت سابق للزمن المذكور في الجملة.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Use the correct form of the verb in brackets.',
      instructionAr: 'ضع الصيغة الصحيحة للفعل الذي بين القوسين.',
      items: [
        { text: "She claims _______ (finish) her project last week.", textAr: "هي تدعي أنها _______ (أنهت) مشروعها الأسبوع الماضي." },
        { text: "I clearly remember _______ (tell) you about the meeting.", textAr: "أتذكر بوضوح أني _______ (أخبرتك) عن الاجتماع." },
        { text: "He regrets not _______ (study) harder at school.", textAr: "هو يندم على عدم _______ (الدراسة) بجد في المدرسة." }
      ]
    }
  ],
  quiz: [
    {
      question: "Which sentence implies a COMPLETED action in the past?",
      questionAr: "أي جملة تعني أن الفعل قد اكتمل بالفعل في الماضي؟",
      options: ["I want to see her.", "I am happy to be seeing her.", "I am happy to have seen her.", "I am seeing her."],
      optionsAr: ["أريد رؤيتها.", "أنا سعيد برؤيتها (الآن).", "أنا سعيد لأني رأيتها (اكتمل).", "أنا أراها."],
      correctIndex: 2,
      explanation: "'To have seen' is the perfect infinitive, indicating completion prior to the current moment.",
      explanationAr: "'To have seen' هو المصدر التام، ويشير إلى اكتمال الفعل قبل اللحظة الحالية."
    }
  ]
};
