
import { Lesson, proficiencyLevel } from "../../types";

export const authorialIntentB1: Partial<Lesson> = {
  title: "Authorial Intent & Purpose",
  titleAr: "نية الكاتب والغرض منه",
  proficiencyLevel: proficiencyLevel.B1,
  warmup: {
    mission: "Analyze the 'Why' behind a text. Is the author trying to inform you, persuade you, or entertain you?",
    missionAr: "تحليل 'لماذا' كُتب النص. هل يحاول الكاتب إخبارك بشيء، إقناعك، أم تسليتك؟",
    objectives: [
      "Understand the 'PIE' strategy (Persuade, Inform, Entertain).",
      "Scan a text for persuasive language.",
      "Identify the difference between an advertisement and a news report."
    ],
    objectivesAr: [
      "فهم استراتيجية 'PIE' (الإقناع، الإخبار، التسلية).",
      "مسح النص بحثاً عن كلمات إقناعية.",
      "تمييز الفرق بين الإعلان والتقرير الإخباري."
    ]
  },
  content: `
### 1. The PIE Model (نموذج PIE)
Every text has a core purpose. We use the acronym **PIE** to remember them:

1.  **P - Persuade (إقناع):** The author wants you to do or believe something. 
    *   *Examples:* Advertisements, political speeches.
2.  **I - Inform (إخبار):** The author wants to give you facts or instructions.
    *   *Examples:* Textbooks, news articles, manuals.
3.  **E - Entertain (تسلية):** The author wants you to enjoy a story or feelings.
    *   *Examples:* Novels, poems, jokes.

### 2. Spotting Persuasion (اكتشاف الإقناع)
Persuasive texts often use "Strong Words" like:
*   "Must" / "Should" / "Definitely"
*   "Don't miss out!"
*   "The only solution."

### 3. Text Structure by Purpose (هيكل النص حسب الغرض)
*   **Informational texts** use headings, bullet points, and data.
*   **Entertaining texts** use dialogue, descriptions, and plot twists.
`,
  contentAr: `
### 1. نموذج PIE (الأغراض الثلاثة)
لكل نص هدف جوهري. نستخدم اختصار **PIE** لتذكرها:

1.  **P - Persuade (الإقناع):** الكاتب يريدك أن تفعل شيئاً أو تؤمن بفكرة.
    *   *أمثلة:* الإعلانات، الخطابات السياسية.
2.  **I - Inform (الإخبار):** الكاتب يريد تزويدك بحقائق أو تعليمات.
    *   *أمثلة:* المناهج الدراسية، الأخبار، كتيبات الاستخدام.
3.  **E - Entertain (التسلية):** الكاتب يريدك أن تستمتع بقصة أو مشاعر.
    *   *أمثلة:* الروايات، القصائد، النكت.

### 2. علامات الإقناع (Signal of Persuasion)
النصوص الإقناعية تستخدم لغة قوية مثل:
*   "يجب عليك" (You must)
*   "لا تفوت الفرصة!"
*   "الحل الوحيد."

### 3. الهيكل حسب الغرض (Standard Hierarchy)
*   **النصوص الإخبارية:** تستخدم رؤوس أقلام، نقاط، وبيانات إحصائية.
*   **نصوص التسلية:** تستخدم الحوار، الأوصاف، والمفاجآت في الأحداث.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Identify the purpose: Persuade, Inform, or Entertain.',
      instructionAr: 'حدد الغرض: إقناع، إخبار، أو تسلية.',
      items: [
        { text: "A manual explaining how to fix a car is to _______.", textAr: "كتيب يشرح كيفية إصلاح السيارة هدفه هو _______." },
        { text: "An ad saying 'Buy these shoes now!' is to _______.", textAr: "إعلان يقول 'اشترِ هذا الحذاء الآن!' هدفه هو _______." },
        { text: "A story about a magical dragon is to _______.", textAr: "قصة عن تنين سحري هدفها هو _______." }
      ]
    }
  ],
  quiz: [
    {
      question: "What is the primary purpose of a recipe book?",
      questionAr: "ما هو الغرض الأساسي من كتاب وصفات الطبخ؟",
      options: ["To persuade you to eat", "To inform you how to cook", "To entertain you with food pictures", "To complain about prices"],
      optionsAr: ["إقناعك بالأكل", "إخبارك بكيفية الطبخ", "تسليتك بصور الطعام", "الشكوى من الأسعار"],
      correctIndex: 1,
      explanation: "A recipe provides instructions (To Inform).",
      explanationAr: "وصفة الطعام تقدم تعليمات واضحة، لذا غرضها الإخبار (To Inform)."
    }
  ]
};
