
import { Lesson, proficiencyLevel } from "../../types";

export const presentContinuousA2: Partial<Lesson> = {
  title: "Present Continuous: Right Now",
  titleAr: "المضارع المستمر: الآن في هذه اللحظة",
  proficiencyLevel: proficiencyLevel.A2,
  warmup: {
    mission: "Learn how to describe activities that are happening exactly at the moment of speaking.",
    missionAr: "تعلم كيفية وصف الأنشطة التي تحدث بالضبط في لحظة التحدث.",
    objectives: [
      "Understand the structure (am/is/are + -ing).",
      "Distinguish between Present Simple (Habit) and Present Continuous (Now).",
      "Describe pictures and ongoing actions.",
      "Form questions and negatives."
    ],
    objectivesAr: [
      "فهم الهيكل (am/is/are + -ing).",
      "التمييز بين المضارع البسيط (عادة) والمضارع المستمر (الآن).",
      "وصف الصور والأفعال الجارية.",
      "تكوين الأسئلة والنفي."
    ]
  },
  content: `
### 1. The Structure
To talk about right now, you need two things: **Verb 'to be'** and **-ing**.
**Subject + am/is/are + Verb + ing**

*   **I am** eat**ing**.
*   **He is** study**ing**.
*   **They are** work**ing**.

### 2. When to use it?
1.  **Actions happening now:** *I am talking to you.*
2.  **Temporary situations:** *He is living in London this month.*

### 3. Negatives and Questions
*   **Negative:** Just add **not**.
    *   *I am **not** sleeping.*
*   **Question:** Swap the subject and the 'be' verb.
    *   ***Is he** watching TV?*

### 4. Now vs. Habit
| Present Simple (Habit) | Present Continuous (Now) |
| :--- | :--- |
| I drink milk every day. | I am drinking milk now. |
| He works in a bank. | He is working at home today. |

> **Spelling Rule:** 
> If a word ends in **e**, remove it: *Write -> Writ**ing***.
> If it's 1 syllable (C-V-C), double the last letter: *Run -> Run**ning***.
`,
  contentAr: `
### 1. هيكل الجملة
للتحدث عن شيء يحدث "الآن"، نحتاج لثلاثة عناصر أساسية:
**الفاعل + فعل الكينونة المساعد + الفعل + الإضافة المستمرة**
*   أنا أقرأ الآن.

### 2. الاستخدام
نستخدمه لتوضيح أن الفعل مستمر في هذه اللحظة من الزمن.
*   "لا تتكلم! الطفل نائم الآن."

### 3. الأسئلة والنفي
*   في النفي: نضع أداة النفي بعد فعل الكينونة.
*   في السؤال: نبدأ بالفعل المساعد قبل الفاعل.

### 4. كلمات دالة
*   الآن.
*   في هذه اللحظة.
*   انظر! أو اسمع! (لأننا دائماً ننبه لشيء يحدث في التو واللحظة).

> **ملاحظة:** بعض الأفعال لا تقبل الإضافة المستمرة مثل أفعال المشاعر والمعرفة.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Complete the sentence with (am/is/are + verb-ing).',
      instructionAr: 'أكمل الجملة بصيغة المضارع المستمر.',
      items: [
        { text: "Listen! Sara _______ (sing) a song.", textAr: "اسمع! سارة _______ (تغني) أغنية." },
        { text: "They _______ (not / play) football because it's raining.", textAr: "هم _______ (لا يلعبون) كرة القدم لأنها تمطر." },
        { text: "What _______ you _______ (cook) for dinner?", textAr: "ماذا _______ أنت _______ (تطبخ) للعشاء؟" }
      ]
    }
  ],
  quiz: [
    {
      question: "Which of these is correct for something happening now?",
      questionAr: "أي من هذه الخيارات صحيح لشيء يحدث الآن؟",
      options: ["I eat an apple.", "I am eating an apple.", "I eating an apple.", "I eats an apple."],
      optionsAr: ["I eat an apple.", "I am eating an apple.", "I eating an apple.", "I eats an apple."],
      correctIndex: 1,
      explanation: "'Am eating' is the correct Present Continuous form.",
      explanationAr: "'Am eating' هي الصيغة الصحيحة للمضارع المستمر."
    }
  ]
};
