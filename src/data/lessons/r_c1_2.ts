
import { Lesson, proficiencyLevel } from "../../types";

export const legalContractualC1: Partial<Lesson> = {
  title: "Legal and Contractual Reading",
  titleAr: "القراءة القانونية والتعاقدية",
  proficiencyLevel: proficiencyLevel.C1,
  warmup: {
    mission: "Navigate the 'Legalese' jargon in contracts, privacy policies, and terms of service.",
    missionAr: "التنقل عبر مصطلحات 'اللغة القانونية' في العقود، سياسات الخصوصية، وشروط الخدمة.",
    objectives: [
      "Understand the logical connectors of Law (Notwithstanding, Hereby, Subject to).",
      "Identify the 'Parties' and their 'Obligations'.",
      "Detect clauses related to termination and liability."
    ],
    objectivesAr: [
      "فهم الروابط المنطقية للقانون (بغض النظر، بموجب هذا، رهناً بـ).",
      "تحديد 'الأطراف' و 'الالتزامات'.",
      "اكتشاف البنود المتعلقة بإنهاء العقد والمسؤولية القانونية."
    ]
  },
  content: `
### 1. The Grammar of Legalese (قواعد اللغة القانونية)
Legal English uses archaic and precise words to avoid ambiguity.

*   **Hereby (بموجب هذا):** Means "by means of this document".
*   **Notwithstanding (على الرغم من / بصرف النظر عن):** Used to show that one clause takes priority over another.
*   **Subject to (رهناً بـ / خاضع لـ):** Means the clause only applies if a condition is met.

### 2. Rights vs. Obligations (الحقوق مقابل الالتزامات)
In a contract, verbs define what is mandatory.
*   **Shall / Must:** Indicates an **Obligation** (Must do).
*   **May:** Indicates a **Right** (Optional).

*Example:* "The Provider **shall** deliver the services weekly, and the Client **may** request a refund if tasks are incomplete."

### 3. Key Clauses (البنود الرئيسية)
1.  **Liability (المسؤولية):** Who pays if things go wrong.
2.  **Termination (الإنهاء):** How to stop the contract.
3.  **Indemnification (التعويض):** Protection against loss.

| Term | Legal Context | Arabic |
| :--- | :--- | :--- |
| **Breach** | Failure to follow the contract. | خرق / نقض |
| **Jurisdiction** | The legal system/location applied. | الاختصاص القضائي |
| **Confidentiality** | Keeping information secret. | السرية |
`,
  contentAr: `
### 1. قواعد اللغة القانونية (Legalese)
تستخدم الإنجليزية القانونية كلمات قديمة ودقيقة لتجنب الغموض.

*   **Notwithstanding:** تعني بصرف النظر عما ورد سابقاً، هذا البند هو الأهم.
*   **Subject to:** تعني أن هذا البند مرتبط بشرط معين.

### 2. الحقوق والالتزامات (Rights & Obligations)
داخل العقد، الأفعال المساعدة هي الأهم:
*   **Shall:** تعني وجوب التنفيذ (إلزامي).
*   **May:** تعني إمكانية التنفيذ (اختياري).

### 3. البنود الجوهرية (Key Clauses)
1.  **Liability:** من هو المسؤول قانونياً ومادياً.
2.  **Termination:** متى وكيف ينتهي هذا العقد.
3.  **Confidentiality:** بند السرية لحماية أسرار العمل.

> **نصيحة للقراءة:** الكلمة الواحدة في العقد قد تغير الموقف القانوني بالكامل. ابحث دائماً عن "Shall" لتعرف واجباتك.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Complete the legal sentence: Notwithstanding, Shall, May.',
      instructionAr: 'أكمل الجملة القانونية بالروابط الصحيحة.',
      items: [
        { text: "The tenant _______ pay the rent on the 1st of each month.", textAr: "على المستأجر (Shall) دفع الإيجار في الأول من كل شهر." },
        { text: "The user _______ choose to cancel the subscription at any time.", textAr: "للمستخدم (May) الحق في إلغاء الاشتراك في أي وقت." },
        { text: "_______ any prior agreement, this contract is the only valid one.", textAr: "(Notwithstanding) بصرف النظر عن أي اتفاق سابق، هذا العقد هو الوحيد الصالح." }
      ]
    }
  ],
  quiz: [
    {
      question: "In a contract, what does the word 'Shall' imply?",
      questionAr: "في العقد، ماذا تشير كلمة 'Shall'؟",
      options: ["A suggestion", "A possibility", "A mandatory obligation", "A past event"],
      optionsAr: ["اقتراح", "احتمالية", "التزام إلزامي", "حدث ماضي"],
      correctIndex: 2,
      explanation: "In legal contexts, 'shall' is used to express a required action or command.",
      explanationAr: "في السياقات القانونية، تُستخدم 'shall' للتعبير عن فعل مطلوب إلزامي أو أمر."
    }
  ]
};
