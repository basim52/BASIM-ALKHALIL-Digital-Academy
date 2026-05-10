
import { Lesson, proficiencyLevel } from "../../types";

export const narrativeTensesB2: Partial<Lesson> = {
  title: "Narrative Tenses: Storytelling",
  titleAr: "أزمنة السرد: رواية القصص",
  proficiencyLevel: proficiencyLevel.B2,
  warmup: {
    mission: "Learn how to combine different past tenses to tell immersive stories and describe background events.",
    missionAr: "تعلم كيفية دمج أزمنة الماضي المختلفة لرواية قصص غامرة ووصف أحداث الخلفية.",
    objectives: [
      "Use Past Simple for main events.",
      "Use Past Continuous for background scenes.",
      "Use Past Perfect for earlier events.",
      "Manage chronology in complex narratives."
    ],
    objectivesAr: [
      "استخدام الماضي البسيط للأحداث الرئيسية.",
      "استخدام الماضي المستمر لمشاهد الخلفية.",
      "استخدام الماضي التام للأحداث الأقدم.",
      "إدارة التسلسل الزمني في الروايات المعقدة."
    ]
  },
  content: `
### 1. The Narrative Toolkit (أدوات السرد)
To tell a good story in English, we use four main tenses. At B2, we focus on the first three:

#### A. Past Simple (The Main Action)
Used for finished actions in a sequence.
*   *Example:* "I **walked** into the cafe and **ordered** a coffee."

#### B. Past Continuous (The Background)
Used for actions that were in progress at a specific time in the past.
*   *Example:* "It **was raining** and the wind **was blowing**."

#### C. Past Perfect (The Head-start)
Used for an action that happened **before** another action in the past.
*   *Example:* "When I arrived, the train **had already left**."

### 2. Putting it together (دمج الأزمنة)
*   *Sentence:* "While I **was walking** home (background), I **realized** (main action) that I **had forgotten** (earlier action) my keys at work."

### 3. Chronology and Linkers
*   **Initially / At first** (في البداية)
*   **Meanwhile** (في هذه الأثناء)
*   **Eventually** (في نهاية المطاف)
*   **By the time** (بحلول الوقت الذي...)

### 4. Advanced Tip: Used to vs. Would
*   **Used to:** For past states or habits. (*I used to live in Paris.*)
*   **Would:** ONLY for past habits/repeated actions. (*Every summer, we would go to the beach.*)
`,
  contentAr: `
### 1. أدوات السرد الأربعة
لرواية قصة مشوقة، نحتاج لدمج هذه الأزمنة:

#### أ. الماضي البسيط: (الحدث الرئيسي)
للأفعال المتتابعة التي حدثت وانتهت.
*   **He opened the door and entered.**

#### ب. الماضي المستمر: (خلفية القصة)
لوصف الأجواء أو فعل كان مستمراً عندما قطعه فعل آخر.
*   **The sun was shining.** (كانت الشمس تشرق).

#### ج. الماضي التام: (الماضي الأبعد)
نستخدمه لتوضيح أن فعلاً حدث **قبل** فعل آخر في الماضي.
*   عندما وصلت للمحطة، كان القطار **قد غادر بالفعل**. (**had left**).

### 2. كيف تدمجهم؟
تخيل المشهد: "بينما كنت **أذاكر** (مستمر)، **تذكرت** (بسيط) أنني **لم آكل** (تام) منذ الصباح."

### 3. روابط السرد
تساعد هذه الروابط في توضيح الترتيب:
*   **By the time:** بحلول ذلك الوقت.
*   **Suddenly:** فجأة.
*   **Previously:** سابقاً.

> **قاعدة ذهبية:** الماضي التام (Had + V3) هو "ماضي الماضي". نستخدمه فقط لنوضح أن هناك فعلاً أقدم من فعل آخر.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Put the verbs in the correct past form (Simple, Continuous, or Perfect).',
      instructionAr: 'ضع الأفعال في صيغة الماضي الصحيحة (بسيط، مستمر، أو تام).',
      items: [
        { text: "When I got home, I found that someone _______ (break) the window.", textAr: "عندما وصلت للمنزل، وجدت أن شخصاً ما _______ (كسر) النافذة." },
        { text: "We _______ (drive) to work when we saw the accident.", textAr: "كنا _______ (نقود) للعمل عندما رأينا الحادث." },
        { text: "He _______ (finish) his report and then he went to sleep.", textAr: "هو _______ (أنهى) تقريره ثم ذهب للنوم." }
      ]
    }
  ],
  quiz: [
    {
      question: "Which tense shows an action that happened BEFORE another past action?",
      questionAr: "أي زمن يوضح فعلاً حدث قبل فعل ماضٍ آخر؟",
      options: ["Past Simple", "Past Continuous", "Past Perfect", "Present Perfect"],
      optionsAr: ["الماضي البسيط", "الماضي المستمر", "الماضي التام", "المضارع التام"],
      correctIndex: 2,
      explanation: "Past Perfect (had + V3) is used specifically for the 'earlier' of two past events.",
      explanationAr: "الماضي التام (had + V3) يستخدم تحديداً للحديث عن الفعل 'الأقدم' بين حدثين في الماضي."
    }
  ]
};
