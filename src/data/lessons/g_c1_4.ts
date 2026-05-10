
import { Lesson, proficiencyLevel } from "../../types";

export const participleClausesC1: Partial<Lesson> = {
  title: "Participle Clauses",
  titleAr: "عبارات اسم الفاعل والمفعول (Participle Clauses)",
  proficiencyLevel: proficiencyLevel.C1,
  warmup: {
    mission: "Learn how to replace long relative clauses with concise participle phrases to make your writing more professional and fluid.",
    missionAr: "تعلم كيفية استبدال جمل الوصل الطويلة بعبارات مختصرة لجعل كتابتك أكثر احترافية وسلاسة.",
    objectives: [
      "Use Present Participles (-ing) for active meanings.",
      "Use Past Participles (V3) for passive meanings.",
      "Use Perfect Participles (Having + V3) to show time sequence.",
      "Rewrite full sentences as shortened participle clauses."
    ],
    objectivesAr: [
      "استخدام اسم الفاعل (-ing) للمعانى المبنية للمعلوم.",
      "استخدام اسم المفعول (V3) للمعانى المبنية للمجهول.",
      "استخدام الـ Participle التام (Having + V3) لتوضيح التسلسل الزمني.",
      "إعادة كتابة الجمل الكاملة كعبارات participle مختصرة."
    ]
  },
  content: `
### 1. What are Participle Clauses? (ما هي عبارات الـ Participle؟)
They allow us to give information in a more economical way. We use them mostly in writing.
*   *Full:* Because he was hungry, he ate a large pizza.
*   *Participle Clause:* **Being hungry**, he ate a large pizza.

### 2. Present Participles (-ing)
Used for **Active** meanings or actions happening at the same time.
*   *Clause:* **Waiting** for the bus, I read the newspaper. (= While I was waiting).
*   *Clause:* The girl **standing** over there is my cousin. (= Who is standing).

### 3. Past Participles (V3)
Used for **Passive** meanings.
*   *Clause:* **Shocked** by the news, he couldn't speak. (= Because he was shocked).
*   *Clause:* Books **written** by him are very popular. (= Which were written).

### 4. Perfect Participles (Having + V3)
Used to show one action finished **before** another.
*   *Clause:* **Having finished** my work, I went to bed. (First finished, then went).

### 5. Essential Constraint (شرط أساسي)
The **Subject** must be the same for both parts of the sentence.
*   *Wrong:* "Working hard, the exam was easy." (The exam wasn't working hard!).
*   *Correct:* "**Working hard**, he found the exam easy."
`,
  contentAr: `
### 1. ما هي عبارات الـ Participle؟
هي أداة لاختصار الجمل الطويلة وجعلها أكثر أدبية ورسمية. تُستخدم بكثرة في الكتابة الأكاديمية والروايات.
*   جملة كاملة: "لأنه كان متعباً، ذهب للنوم."
*   جملة مختصرة: "**Being tired**, he went to bed." (كونه متعباً...).

### 2. اسم الفاعل (-ing)
تستخدم عندما يكون المعنى مبنياً للمعلوم أو متزامناً مع الفعل الآخر.
*   **Walking down the street, I saw Ali.** (أثناء مشيي في الشارع...).

### 3. اسم المفعول (V3)
تستخدم عندما يكون المعنى مبنياً للمجهول.
*   **Built in 1900, the church is very old.** (بما أنها بُنيت في 1900، فإن الكنيسة...).

### 4. الـ Participle التام (Having + V3)
لتأكيد أن فعلاً قد انتهى تماماً قبل بدء الفعل الآخر.
*   **Having eaten, I felt much better.** (بعد أن أكلت، شعرت بتحسن).

### 5. تنبيه هام (وحدة الفاعل)
يجب أن يكون فاعل العبارة المختصرة هو نفسه فاعل الجملة الرئيسية.
*   خطأ: "بعد طبخه، أكلت الطعام." (العبارة توحي بأنك أنت من تم طبخك!).
*   صح: "**Having cooked the food**, I ate it."

> **نصيحة:** استخدم هذه العبارات في مقدمة الجملة لإضفاء طابع "رواية القصص" أو الاحترافية الأكاديمية.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Shorten the sentence using a participle clause.',
      instructionAr: 'اختصر الجملة باستخدام عبارة participle.',
      items: [
        { text: "Because I didn't know his phone number, I couldn't call him. -> Not _______.", textAr: "لأني لم أعرف رقمه، لم أتصل به. -> لعدم _______." },
        { text: "After I had finished the report, I sent it to my boss. -> Having _______.", textAr: "بعد أن أنهيت التقرير، أرسلته لمديري. -> بعد _______." },
        { text: "The man who is sitting in the corner is a famous writer. -> The man _______.", textAr: "الرجل الجالس في الزاوية كاتب مشهور. -> الرجل _______." }
      ]
    }
  ],
  quiz: [
    {
      question: "Which form is used to show one action happened BEFORE another?",
      questionAr: "أي صيغة تُستخدم لتوضيح أن فعلاً حدث قبل الآخر؟",
      options: ["Present Participle (-ing)", "Past Participle (V3)", "Perfect Participle (Having + V3)", "To be + ing"],
      optionsAr: ["اسم فاعل", "اسم مفعول", "Participle تام", "To be + ing"],
      correctIndex: 2,
      explanation: "The Perfect Participle explicitly marks a sequential relationship between two actions.",
      explanationAr: "الـ Participle التام يحدد بوضوح العلاقة المتتابعة بين فعلين."
    }
  ]
};
