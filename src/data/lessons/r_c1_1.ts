
import { Lesson, proficiencyLevel } from "../../types";

export const academicAbstractsC1: Partial<Lesson> = {
  title: "Academic Abstract Analysis",
  titleAr: "تحليل المستخلصات الأكاديمية",
  proficiencyLevel: proficiencyLevel.C1,
  warmup: {
    mission: "Master the structure of academic abstracts to quickly evaluate research findings and methodologies.",
    missionAr: "إتقان هيكل المستخلصات الأكاديمية لتقييم نتائج البحوث ومنهجياتها بسرعة.",
    objectives: [
      "Deconstruct the 'IMRaD' model in short abstracts.",
      "Identify high-level academic jargon (Nominalization).",
      "Scan for the 'Problem Gap' in scientific literature."
    ],
    objectivesAr: [
      "تفكيك نموذج 'IMRaD' في المستخلصات القصيرة.",
      "تحديد المصطلحات الأكاديمية عالية المستوى (التحويل إلى أسماء).",
      "البحث عن 'فجوة المشكلة' (Problem Gap) في الأدب العلمي."
    ]
  },
  content: `
### 1. The IMRaD Abstract Model (نموذج IMRaD)
High-level academic reading requires understanding the economy of language. Most abstracts follow this flow:

1.  **Introduction (I):** The context and the problem.
2.  **Methods (M):** How the data was collected or analyzed.
3.  **Results (R):** What was discovered.
4.  **Discussion (D):** What the discovery means for the future.

### 2. Nominalization (الأسمنة / التحويل لأسماء)
In C1 texts, authors replace verbs with complex nouns to sound more objective.
*   *Instead of:* "Scientists **analyzed** the data."
*   *They use:* "The **analysis** of the data revealed..."

### 3. Identifying the "Core Contribution" (المساهمة الجوهرية)
C1 readers ignore the filler and look for transition phrases like:
*   "This study **elucidates**..."
*   "Contrary to previous **assumptions**..."
*   "The findings **underscore** the necessity of..."

| Term | Meaning | Arabic |
| :--- | :--- | :--- |
| **Qualitative** | Focus on description/meaning. | نوعي |
| **Quantitative** | Focus on numbers/statistics. | كمي |
| **Correlation** | A relationship between two variables. | ارتباط |
| **Causation** | One thing directly causing another. | سببية |
`,
  contentAr: `
### 1. نموذج IMRaD الأكاديمي
تتطلب القراءة الأكاديمية رفيعة المستوى فهم "اقتصاد اللغة". يتبع معظم الباحثين هذا التسلسل:

1.  **المقدمة (I):** السياق والمشكلة.
2.  **المنهجية (M):** كيف تم جمع البيانات.
3.  **النتائج (R):** ما الذي تم اكتشافه.
4.  **المناقشة (D):** ماذا تعني هذه النتائج للمستقبل.

### 2. ظاهرة Nominalization (الأسمنة)
في نصوص C1، يستبدل الكتاب الأفعال بأسماء معقدة لتبدو أكثر موضوعية.
*   *بدلاً من:* "حلل العلماء البيانات."
*   *يقولون:* "كشف تحليل البيانات عن..."

### 3. تحديد المساهمة الجوهرية (Core Contribution)
القارئ في هذا المستوى يتجاوز الحشو ويبحث عن عبارات مثل:
*   **Elucidates:** توضح/تلقي الضوء على.
*   **Underscore:** تؤكد/تضع خطاً تحت أهمية.

> **نصيحة للقراءة:** المستخلص هو خريطة البحث. إذا لم تفهم المستخلص، فمن الصعب جداً فهم البحث كاملاً.
`,
  exercises: [
    {
      type: 'match',
      instruction: 'Match the IMRaD section to its definition.',
      instructionAr: 'صل قسم IMRaD بتعريفه.',
      items: [
        { text: "Methods", answer: "How the research was done" },
        { text: "Results", answer: "What the data showed" },
        { text: "Discussion", answer: "The implications of the findings" },
        { text: "Introduction", answer: "The context and problem" }
      ]
    }
  ],
  quiz: [
    {
      question: "What does 'Nominalization' improve in academic writing?",
      questionAr: "ما الذي تحسّنه 'الأسمنة' في الكتابة الأكاديمية؟",
      options: ["Emotional appeal", "Objectivity and density", "Humor", "Storytelling"],
      optionsAr: ["الجاذبية العاطفية", "الموضوعية والكثافة المعلوماتية", "الفكاهة", "سرد القصص"],
      correctIndex: 1,
      explanation: "Nominalization allows writers to discuss complex concepts as objects, increasing objectivity.",
      explanationAr: "تسمح الأسمنة للكتاب بمناقشة المفاهيم المعقدة كأشياء مستقلة، مما يزيد من الموضوعية."
    }
  ]
};
