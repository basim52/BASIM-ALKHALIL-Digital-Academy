
import { Lesson, proficiencyLevel } from "../../types";

export const pastSimpleA2: Partial<Lesson> = {
  title: "Past Simple: Regular & Irregular",
  titleAr: "الماضي البسيط: المنتظم والشاذ",
  proficiencyLevel: proficiencyLevel.A2,
  warmup: {
    mission: "Learn how to talk about finished actions and events in the past.",
    missionAr: "تعلم كيفية التحدث عن الأحداث والأفعال التي انتهت في الماضي.",
    objectives: [
      "Identify Regular past verbs (+ed).",
      "Memorize common Irregular past verbs.",
      "Use 'Did' for questions and 'Didn't' for negatives.",
      "Talk about your last weekend."
    ],
    objectivesAr: [
      "تحديد الأفعال المنتظمة في الماضي (إضافة ed).",
      "حفظ الأفعال الشاذة الشائعة في الماضي.",
      "استخدام 'Did' للسؤال و 'Didn't' للنفي.",
      "التحدث عن عطلة نهاية الأسبوع الماضية."
    ]
  },
  content: `
### 1. Regular Verbs
To talk about the past with most verbs, just add **-ed** or **-d**.
*   Walk -> Walk**ed**
*   Play -> Play**ed**
*   Like -> Like**d**

### 2. Irregular Verbs
These verbs change their spelling.
| Present | Past | Note |
| :--- | :--- | :--- |
| **Go** | **Went** | Complete change |
| **Eat** | **Ate** | Spelling change |
| **Do** | **Did** | Spelling change |
| **Have** | **Had** | Spelling change |
| **See** | **Saw** | Spelling change |

### 3. Negatives and Questions
In the past, we use the helper verb **DID**.

*   **Negative:** Use **didn't** + **Base Verb** (No -ed!).
    *   *I didn't play.*
*   **Question:** Use **Did** + Subject + **Base Verb**?
    *   *Did you see the movie?*

### 4. Time Markers
*   **Yesterday**: The day before today.
*   **Last**: Previous (week/month/year).
*   **Ago**: In the past (e.g., Two days ago).
`,
  contentAr: `
### 1. الأفعال المنتظمة
ببساطة أضف النهاية المناسبة للفعل للتحدث عن الماضي.
*   أنا عملت.

### 2. الأفعال الشاذة
هذه الأفعال تتغير تماماً ولا تتبع القاعدة العامة.
*   ذهب.
*   اشترى.

### 3. النفي والسؤال
هنا تقع أهم الأخطاء! عند استخدام أداة السؤال أو النفي، يعود الفعل لحالته الأصلية بدون أي إضافات.
*   **النفي:** نقول "أنا لم أذهب" بصيغة الفعل المجرد.
*   **السؤال:** نقول "هل ذهبت؟" بصيغة الفعل المجرد.

### 4. كلمات دالة على الماضي
*   أمس.
*   الليلة الماضية.
*   قبل ساعتين.

> **قاعدة ذهبية:** بمجرد دخول أداة الماضي في الجملة (للنفي أو السؤال)، يعود الفعل الرئيسي لأصله.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Change the verb to the Past Simple form.',
      instructionAr: 'حول الفعل إلى صيغة الماضي البسيط.',
      items: [
        { text: "Yesterday, I _______ (watch) a movie.", textAr: "أمس، _______ (شاهدت) فيلماً." },
        { text: "She _______ (go) to the market last night.", textAr: "هي _______ (ذهبت) إلى السوق الليلة الماضية." },
        { text: "I didn't _______ (eat) breakfast this morning.", textAr: "أنا لم _______ (آكل) الإفطار هذا الصباح." }
      ]
    }
  ],
  quiz: [
    {
      question: "What is the past of 'Buy'?",
      questionAr: "ما هو ماضي فعل 'Buy'؟",
      options: ["Buyed", "Bought", "Boughten", "Buying"],
      optionsAr: ["Buyed", "Bought", "Boughten", "Buying"],
      correctIndex: 1,
      explanation: "'Bought' is the irregular past form of 'buy'.",
      explanationAr: "'Bought' هو التصريف الشاذ للفعل 'buy' في الماضي."
    }
  ]
};
