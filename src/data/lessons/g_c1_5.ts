
import { Lesson, proficiencyLevel } from "../../types";

export const subjunctiveC1: Partial<Lesson> = {
  title: "The Subjunctive & Formal Usage",
  titleAr: "صيغة الاحتمال والتمني (Subjunctive) والاستخدام الرسمي",
  proficiencyLevel: proficiencyLevel.C1,
  warmup: {
    mission: "Learn special formal structures used to express necessity, desire, or hypothetical situations in high-level English.",
    missionAr: "تعلم هياكل رسمية خاصة تُستخدم للتعبير عن الضرورة، الرغبة، أو المواقف الافتراضية في المستويات العالية من الإنجليزية.",
    objectives: [
      "Master the Present Subjunctive (Base verb after demand/suggest).",
      "Understand 'Should' omission in formal British English.",
      "Use 'Were' in hypothetical 'If' clauses (Were-subjunctive).",
      "Identify common formal fossilized phrases (e.g., God save the Queen)."
    ],
    objectivesAr: [
      "إتقان الـ Present Subjunctive (فعل مجرد بعد الطلب/الاقتراح).",
      "فهم حذف 'Should' في الإنجليزية البريطانية الرسمية.",
      "استخدام 'Were' في جمل الشرط الافتراضية.",
      "تحديد العبارات التقليدية الرسمية الشائعة."
    ]
  },
  content: `
### 1. What is the Subjunctive? (ما هي هذه الصيغة؟)
It is a special "mood" in English used to talk about things that are not facts: hopes, requirements, or imaginary ideas.

### 2. The Present Subjunctive (Necessity/Demand)
After verbs like **suggest, insist, demand, recommend**, or adjectives like **important, essential, necessary**, we use the **Base Form** of the verb (even for he/she/it!).

*   *Standard:* He stays.
*   *Subjunctive:* It is essential that he **stay**. (No 's'!).
*   *Formal:* I suggest that she **be** informed immediately.

### 3. The Past Subjunctive (Hypothetical)
We use **were** instead of **was** for all subjects when talking about imaginary things.
*   *Standard:* If I was rich... (Informal).
*   *Subjunctive:* If I **were** rich... (Formal/Academic).
*   *Wish:* I wish he **were** here.

### 4. Advanced Omission of 'Should'
In formal British English, we often drop 'should' but keep the base verb.
*   *Formal:* It is vital that everyone **attend** the meeting.

### 5. Fixed Expressions
*   **God save the King.**
*   **Long live the revolution.**
*   **Be that as it may.** (مهماً يكن الأمر).
`,
  contentAr: `
### 1. ما هو الـ Subjunctive؟
هو "أسلوب" لغوي يُستخدم ليس لوصف الحقائق، بل للتعبير عن أشياء نتمناها أو نطالب بضرورة حدوثها.

### 2. صيغة الـ Subjunctive للحاضر (الضرورة)
بعد كلمات مثل: (suggest, insist, demand) أو (important, vital)، نستخدم الفعل **مجرداً تماماً** حتى لو كان الفاعل مفرد (He/She).
*   **It is crucial that he be here.** (من الضروري أن يكون هنا - لاحظ استُخدمت be بدلاً من is).
*   **I suggest she take the bus.** (لاحظ لم نقل takes).

### 3. صيغة الـ Subjunctive للماضي (الافتراض)
استخدام **were** بدلاً من was مع جميع الضمائر في التمني والشرط.
*   **If I were you...** (لو كنت مكانك).
*   **I wish life were easier.** (أتمنى لو كانت الحياة أسهل).

### 4. حذف Should
في السياقات الرسمية جداً، نحذف Should ونبقي الفعل كما هو.
*   **It was recommended that he submit the report.** (بدلاً من should submit).

### 5. عبارات ثابتة تاريخية
هناك عبارات بقيت من هذه الصيغة القديمة:
*   **So be it.** (ليكن الأمر كما هو).
*   **Heaven forbid!** (لا قدّر الله!).

> **نصيحة:** استخدام هذه الصيغة في رسائل البريد الإلكتروني الرسمية أو التقارير الحكومية يظهر براعة لغوية استثنائية (C1+).
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Fill in the correct form (Subjunctive).',
      instructionAr: 'املأ الفراغ بالصيغة الصحيحة (Subjunctive).',
      items: [
        { text: "The doctor recommended that he _______ (stop) smoking.", textAr: "أوصى الطبيب بأن _______ (يتوقف) عن التدخين." },
        { text: "It is important that everyone _______ (be) on time.", textAr: "من المهم أن _______ (يكون) الجميع في الموعد." },
        { text: "I wish my boss _______ (be) more understanding.", textAr: "أتمنى لو _______ (كان) مديري أكثر تفهماً." }
      ]
    }
  ],
  quiz: [
    {
      question: "Which sentence uses the SUBJUNCTIVE correctly?",
      questionAr: "أي جملة تستخدم الـ SUBJUNCTIVE بشكل صحيح؟",
      options: ["I suggest he goes home.", "I suggest he go home.", "I suggest he went home.", "I suggest he is home."],
      optionsAr: ["أقترح أنه يذهب للمنزل (goes).", "أقترح أن يذهب للمنزل (go).", "أقترح أنه ذهب.", "أقترح أنه في المنزل."],
      correctIndex: 1,
      explanation: "After 'suggest', the subjunctive requires the base form 'go' regardless of the subject 'he'.",
      explanationAr: "بعد 'suggest'، تتطلب صيغة الـ subjunctive الفعل المجرد 'go' بغض النظر عن الفاعل 'he'."
    }
  ]
};
