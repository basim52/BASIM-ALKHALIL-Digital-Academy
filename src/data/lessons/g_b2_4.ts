
import { Lesson, proficiencyLevel } from "../../types";

export const advancedPassiveB2: Partial<Lesson> = {
  title: "Advanced Passive: It is said that...",
  titleAr: "المبني للمجهول المتقدم: يُقال أن...",
  proficiencyLevel: proficiencyLevel.B2,
  warmup: {
    mission: "Learn formal and academic ways to use the passive voice, including the 'get-passive' and reporting structures.",
    missionAr: "تعلم طرقاً رسمية وأكاديمية لاستخدام المبني للمجهول، بما في ذلك صيغة 'get-passive' وهياكل التقارير.",
    objectives: [
      "Use 'Get' as a passive helper for informal/accidental events.",
      "Form the 'Reporting Passive' (e.g., It is believed that...).",
      "Use passive infinitive and gerund forms.",
      "Understand the 'Have something done' causative structure."
    ],
    objectivesAr: [
      "استخدام 'Get' كمساعد للمجهول في الأحداث غير الرسمية/العرضية.",
      "صياغة 'مجهول التقارير' (مثال: يُعتقد أن...).",
      "استخدام صيغ المصدر والـ gerund في المجهول.",
      "فهم هيكل 'Have something done' (السببية)."
    ]
  },
  content: `
### 1. The Get-Passive (المجهول مع Get)
In informal speaking, we often use **get** instead of **be**. We use it mostly for negative or accidental events.
*   *Example:* "He **got fired** yesterday."
*   *Example:* "The glass **got broken** during the party."

### 2. Reporting Passive (Formal / Academic)
To report public opinions or general knowledge, we use two structures:
*   **Structure A:** *It + is/was + V3 + that clause.*
    *   *It is thought that the Earth is warming.*
*   **Structure B:** *Subject + is/was + V3 + to + infinitive.*
    *   *English is said to be the global language.*

### 3. Causative: Have something done (التوكيل)
We use this when someone else does a service for us.
**Subject + Have + Object + Past Participle (V3)**
*   *Example:* "I **had my car repaired**." (The mechanic did it).
*   *Example:* "She **is having her house painted**."

### 4. Passive Gerunds and Infinitives
*   **Infinitives:** To be + V3 (*I want to be loved*).
*   **Gerunds:** Being + V3 (*He hates being told what to do*).
`,
  contentAr: `
### 1. المجهول باستخدام Get
في اللغة غير الرسمية، نستخدم **Get** بدلاً من be، خاصة في الحوادث أو الأشياء المزعجة.
*   **I got stuck in traffic.** (علقت في الزحام).

### 2. مجهول التقارير (رسمي)
يُستخدم في الأخبار والمقالات العلمية.
*   **It is said that...** (يُقال أن...).
*   **Exercise is believed to be good for the brain.** (يُعتقد أن الرياضة مفيدة للمخ).

### 3. السببية (Causative)
نستخدمها عندما نطلب "خدمة" من شخص آخر، أي لم نفعل الشيء بأنفسنا.
**القاعدة: Have + الشيء + التصريف الثالث**
*   **I had my hair cut.** (قصصت شعري - يعني الحلاق هو من قصه لي).
*   **I am having my car washed.** (أقوم بغسل سيارتي - يعني في المحطة).

### 4. المجهول مع الـ ing والمصدر
*   **I like being invited to parties.** (أحب أن أُدعى للحفلات).
*   **The documents need to be signed.** (المستندات تحتاج أن تُوقع).

> **قاعدة ذهبية:** في السببية، ترتيب الكلمات مهم جداً. نضع "الشيء" قبل "التصريف الثالث".
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Complete using the Causative (Have something done).',
      instructionAr: 'أكمل باستخدام صيغة السببية (Have something done).',
      items: [
        { text: "My laptop was broken, so I _______ (it / repair) yesterday.", textAr: "كان حاسوبي معطلاً، لذا _______ (أصلحته) أمس." },
        { text: "We don't paint the house ourselves; we _______ (it / paint) every year.", textAr: "نحن لا ندهن المنزل بأنفسنا؛ بل _______ (ندهنه) كل عام." },
        { text: "He needs to _______ (his eyes / check).", textAr: "هو يحتاج لـ _______ (فحص عينيه)." }
      ]
    }
  ],
  quiz: [
    {
      question: "Which sentence means 'Someone else did the work for me'?",
      questionAr: "أي جملة تعني 'شخص آخر قام بالعمل من أجلي'؟",
      options: ["I cleaned my room.", "I have cleaned my room.", "I had my room cleaned.", "My room is cleaning."],
      optionsAr: ["نظفت غرفتي.", "لقد نظفت غرفتي.", "جعلت غرفتي تُنظف (بواسطة شخص ما).", "غرفتي تنظف."],
      correctIndex: 2,
      explanation: "'I had my room cleaned' is the causative structure showing delegated action.",
      explanationAr: "'I had my room cleaned' هو هيكل السببية الذي يوضح تفويض العمل لشخص آخر."
    }
  ]
};
