
import { Lesson, proficiencyLevel } from "../../types";

export const debatingTopicsB2: Partial<Lesson> = {
  title: "Debating Hot Topics",
  titleAr: "مناقشة القضايا الساخنة",
  proficiencyLevel: proficiencyLevel.B2,
  warmup: {
    mission: "Learn how to present complex arguments, challenge other people's ideas politely, and summarize your points in a formal debate.",
    missionAr: "تعلم كيفية تقديم حجج معقدة، وتحدي أفكار الآخرين بأدب، وتلخيص نقاطك في مناقشة رسمية.",
    objectives: [
      "Use connectors like 'Moreover', 'In contrast', 'Consequently'.",
      "Challenge arguments with 'That may be the case, however...'",
      "Manage interruptions in a conversation.",
      "Summarize a debate with 'All in all' or 'Taking everything into account'."
    ],
    objectivesAr: [
      "استخدام الروابط مثل 'علاوة على ذلك'، 'في المقابل'، 'بالتالي'.",
      "تحدي الحجج بـ 'قد يكون الأمر كذلك، ومع ذلك...'",
      "إدارة المقاطعات في المحادثة.",
      "تلخيص النقاش بـ 'في المجمل' أو 'بأخذ كل شيء في الاعتبار'."
    ]
  },
  content: `
### 1. Building an Argument (بناء الحجة)
Don't just state facts. Build a logical flow:
*   **First and foremost,** ... (أولاً وقبل كل شيء).
*   **It is often argued that...** (غالباً ما يُقال أن...).
*   **Consequently,** ... / **For this reason,** ...
*   **Furthermore,** ... (علاوة على ذلك).

### 2. Challenging Others (التحدي المهذب)
*   **"I see where you're coming from, but..."** (أفهم منطلقك، ولكن...).
*   **"That's a valid point, yet..."** (نقطة وجيهة، ولكن...).
*   **"With all due respect, I disagree."** (مع كامل الاحترام، أختلف معك).
*   **"If I could just finish my point..."** (لو سمحت لي بإنهاء نقطتي - لرد المقاطعة).

### 3. Modulating Certainty (التحوط - Hedging)
At B2, avoid saying "I am 100% right". Use:
*   **"It would seem that..."**
*   **"In all likelihood, ..."** (على الأرجح).
*   **"There is a strong possibility that..."**

### 4. Concluding the Debate
*   **"To sum up, ..."**
*   **"Having considered both sides, I think..."**
*   **"The bottom line is..."** (الخلاصة هي...).
`,
  contentAr: `
### 1. إدارة الحوار المتقدم
في B2، لا نستخدم "But" و "And" بكثرة، بل نستخدم بدائل أرقى:
*   **Moreover / Furthermore:** للإضافة.
*   **Nevertheless / Nonetheless:** ومع ذلك (بديل قوي لـ But).

### 2. التعامل مع المقاطعة (Interruptions)
إذا قاطعك أحدهم:
*   **"Can I just finish what I was saying?"** (هل يمكنني إنهاء ما كنت أقوله؟).
*   **"I'll be done in a second."**

### 3. كلمات الجدل القوية
*   **Controversial:** مثير للجدل.
*   **A double-edged sword:** سلاح ذو حدين.
*   **Pros and Cons:** الإيجابيات والسلبيات.

### 4. تقييم الطرف الآخر
*   **"That's food for thought."** (هذا موضوع يستحق التأمل).
*   **"You've raised a good point."** (لقد أثرت نقطة جيدة).

> **نصيحة:** الاستماع الجيد هو نصف المحادثة. أظهر اهتمامك بقول: **"Interesting point, tell me more."**
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Complete with: Nevertheless, Moreover, Overall, Consequently.',
      instructionAr: 'أكمل بالرابط المناسب.',
      items: [
        { text: "The technology is expensive. _______, it is very difficult to use.", textAr: "التكنولوجيا غالية. _______، هي صعبة الاستخدام جداً." },
        { text: "We failed the first test. _______, we decided to try again.", textAr: "فشلنا في الاختبار الأول. _______، قررنا المحاولة ثانية." },
        { text: "_______, the conference was a great success.", textAr: "_______، كان المؤتمر نجاحاً كبيراً (تلخيص)." }
      ]
    }
  ],
  quiz: [
    {
      question: "Which phrase is used to DISAGREE while remaining VERY respectful?",
      questionAr: "أي عبارة تُستخدم للاختلاف مع البقاء محترماً جداً؟",
      options: ["You are wrong.", "That is stupid.", "With all due respect, I disagree.", "I don't care."],
      optionsAr: ["أنت مخطئ.", "هذا غباء.", "مع كامل الاحترام، أختلف معك.", "لا أهتم."],
      correctIndex: 2,
      explanation: "'With all due respect' is a formal marker used before questioning or disagreeing with someone.",
      explanationAr: "عبارة 'With all due respect' هي علامة رسمية تُستخدم قبل التشكيك في رأي شخص أو الاختلاف معه."
    }
  ]
};
