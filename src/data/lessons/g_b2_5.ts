
import { Lesson, proficiencyLevel } from "../../types";

export const futureAdvancedB2: Partial<Lesson> = {
  title: "Future Continuous & Perfect",
  titleAr: "المستقبل المستمر والتام",
  proficiencyLevel: proficiencyLevel.B2,
  warmup: {
    mission: "Learn how to talk about actions that will be in progress or already completed by a specific time in the future.",
    missionAr: "تعلم كيفية التحدث عن الأفعال التي ستكون مستمرة أو مكتملة بالفعل بحلول وقت معين في المستقبل.",
    objectives: [
      "Use Future Continuous (Will be + -ing) for actions in progress.",
      "Use Future Perfect (Will have + V3) for completed actions.",
      "Understand the keyword 'By' vs. 'At'.",
      "Predict your life 10 years from now."
    ],
    objectivesAr: [
      "استخدام المستقبل المستمر للأفعال الجارية.",
      "استخدام المستقبل التام للأفعال المكتملة.",
      "فهم الكلمات الدالة 'By' مقابل 'At'.",
      "توقع حياتك بعد 10 سنوات من الآن."
    ]
  },
  content: `
### 1. Future Continuous (الاستمرارية في المستقبل)
We use this for actions that will be **in the middle** of happening at a specific future time.
*   **Structure:** **Will be + Verb + ing**
*   *Example:* "At 8 PM tomorrow, I **will be watching** the match."

### 2. Future Perfect (الاكتمال في المستقبل)
We use this to talk about something that will be **finished before** a specific time.
*   **Structure:** **Will have + Past Participle (V3)**
*   *Example:* "**By** 2030, I **will have graduated** from university."

### 3. Key Word: BY (بحلول)
"By" is the most important word for the Future Perfect. It means "not later than".
*   *By next Monday...*
*   *By the end of the year...*

### 4. At vs. By
| Sentence | Meaning | Time focus |
| :--- | :--- | :--- |
| At 9:00, I will be working. | Progress | During 9:00 |
| By 9:00, I will have finished. | Completion | Before 9:00 |
`,
  contentAr: `
### 1. المستقبل المستمر (Future Continuous)
نستخدمه لتخيل حدث سيكون **مستمراً** في وقت محدد غداً أو لاحقاً.
*   **هيكل الجملة: Will be + ing**
    *   **Tomorrow at 5:00, I will be flying to Paris.** (في تمام الخامسة غداً، سأكون في الطائرة "مستمر في الطيران").

### 2. المستقبل التام (Future Perfect)
نستخدمه للتنبؤ بأن شيئاً ما سيكون قد **انتهى تماماً** بحلول وقت معين.
*   **هيكل الجملة: Will have + V3**
    *   **By next year, I will have bought a car.** (بحلول العام القادم، سأكون قد اشتريت السيارة بالفعل).

### 3. الكلمة السحرية: BY
كلمة **By** (بحلول) هي مفتاح المستقبل التام.
*   **By next Friday** (بحلول الجمعة القادمة).

### 4. متى تستخدم أياً منهما؟
*   إذا كنت تركز على أنك ستكون "مشغولاً" بالفعل: استخدم المستمر.
*   إذا كنت تركز على أنك ستكون قد "أنجزت" المهمة: استخدم التام.

> **نصيحة:** هذا الزمن مثالي لمقابلات العمل أو عند التحدث عن الخطط المهنية طويلة المدى.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Choose Future Continuous or Future Perfect.',
      instructionAr: 'اختر المستقبل المستمر أو المستقبل التام.',
      items: [
        { text: "Don't call me at 10 PM. I _______ (sleep).", textAr: "لا تتصل بي في العاشرة مساءً. سأكون _______ (نائماً)." },
        { text: "By the time you arrive, I _______ (cook) dinner.", textAr: "بحلول وقت وصولك، سأكون قد _______ (طبخت) العشاء." },
        { text: "Next month, she _______ (work) here for ten years.", textAr: "الشهر القادم، ستكون قد _______ (عملت) هنا لمدة عشر سنوات." }
      ]
    }
  ],
  quiz: [
    {
      question: "Which tense uses the structure 'Will have + V3'?",
      questionAr: "أي زمن يستخدم الهيكل 'Will have + التصريف الثالث'؟",
      options: ["Future Simple", "Future Continuous", "Future Perfect", "Present Perfect"],
      optionsAr: ["المستقبل البسيط", "المستقبل المستمر", "المستقبل التام", "المضارع التام"],
      correctIndex: 2,
      explanation: "Future Perfect combines 'will' for the future and 'have + V3' for completion/perfection.",
      explanationAr: "المستقبل التام يجمع بين 'will' للمستقبل و 'have + V3' للإتمام أو الكمال."
    }
  ]
};
