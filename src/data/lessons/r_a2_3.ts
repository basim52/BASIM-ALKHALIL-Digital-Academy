
import { Lesson, proficiencyLevel } from "../../types";

export const interrogativePatternsA2: Partial<Lesson> = {
  title: "Interrogative Text Patterns",
  titleAr: "أنماط النصوص الاستفهامية",
  proficiencyLevel: proficiencyLevel.A2,
  warmup: {
    mission: "Learn how to extract information from questionnaires, surveys, and forms.",
    missionAr: "تعلم كيفية استخراج المعلومات من الاستبيانات، الدراسات المسحية، والنماذج.",
    objectives: [
      "Identify the 5 Ws (Who, What, Where, When, Why) in a form.",
      "Distinguish between Yes/No questions and Open questions.",
      "Understand instructions for filling out digital forms."
    ],
    objectivesAr: [
      "تحديد الأسئلة الخمسة (من، ماذا، أين، متى، لماذا) في النموذج.",
      "التمييز بين أسئلة (نعم/لا) والأسئلة المفتوحة.",
      "فهم تعليمات تعبئة النماذج الرقمية."
    ]
  },
  content: `
### 1. Reading Questionnaires (قراءة الاستبيانات)
Questionnaires often use **Direct Questions** or **Statements** to find your opinion.

*   *Direct:* "How often do you exercise?" (كم مرة تمارس الرياضة؟)
*   *Statement:* "Rate your satisfaction: 1 (Poor) to 5 (Excellent)." (قيم رضاك: من 1 إلى 5)

### 2. The Power of "WH" Words (قوة كلمات الاستفهام)
When reading a form, match the "WH" word to the required data:
*   **Who?** → Requires a Name.
*   **Where?** → Requires an Address/Location.
*   **When?** → Requires a Date/Time.
*   **Why?** → Requires a Reason.

> **Formula/Rule:** 
> **Question Word + Helping Verb + Subject + Main Verb?**
> *Where [Q] + do [H] + you [S] + live [M]?*

### 3. Digital Forms Symbols (رموز النماذج الرقمية)
*   **(*) Asterisk**: Means the question is **Required** (إلزامي).
*   **Check-box**: Select one or more (مربع اختيار).
*   **Radio button**: Select only one (زر اختيار دائري).
`,
  contentAr: `
### 1. قراءة الاستبيانات (Questionnaires)
تستخدم الاستبيانات عادةً أسئلة مباشرة أو مقاييس تقييم.

*   **How often:** تسأل عن التكرار (دائماً، غالباً، نادراً).
*   **How much:** تسأل عن الكمية أو السعر.

### 2. دلالات أدوات الاستفهام (WH Indicators)
عندما ترى أداة استفهام في نموذج، توقع نوع الإجابة:
*   **Who:** ابحث عن اسم شخص.
*   **Where:** ابحث عن اسم مكان أو عنوان.
*   **When:** ابحث عن تاريخ أو وقت.

> **ملاحظة فنية:** وجود علامة النجمة (*) بجانب السؤال تعني أنه لا يمكنك تجاوز هذا الحقل دون إجابة.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Enter the correct WH word: Where, When, Who.',
      instructionAr: 'أدخل أداة الاستفهام الصحيحة.',
      items: [
        { text: "_______ is your manager? Answer: Mr. Ahmed.", textAr: "_______ هو مديرك؟ الجواب: السيد أحمد." },
        { text: "_______ is the shop? Answer: On Main Street.", textAr: "_______ هو المتجر؟ الجواب: في الشارع الرئيسي." },
        { text: "_______ is the party? Answer: On Friday.", textAr: "_______ هي الحفلة؟ الجواب: يوم الجمعة." }
      ]
    }
  ],
  quiz: [
    {
      question: "In a digital form, what does a '*' next to a question mean?",
      questionAr: "في نموذج رقمي، ماذا تعني علامة '*' بجانب السؤال؟",
      options: ["It is optional", "It is wrong", "It is required", "It is a secret"],
      optionsAr: ["سؤال اختياري", "السؤال خاطئ", "سؤال إلزامي", "سؤال سري"],
      correctIndex: 2,
      explanation: "An asterisk sign indicates a mandatory/required field.",
      explanationAr: "علامة النجمة تعني حقلاً مطلوباً إلزامياً."
    },
    {
      question: "Which question asks for a location?",
      questionAr: "أي سؤال يطلب موقعاً؟",
      options: ["Who are you?", "When is it?", "How are you?", "Where is it?"],
      optionsAr: ["من أنت؟", "متى هو؟", "كيف حالك؟", "أين هو؟"],
      correctIndex: 3,
      explanation: "'Where' specifically asks for a location or address.",
      explanationAr: "تستخدم 'Where' للسؤال عن المكان."
    }
  ]
};
