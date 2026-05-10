
import { Lesson, proficiencyLevel } from "../../types";

export const crossDisciplinaryC2: Partial<Lesson> = {
  title: "Cross-Disciplinary Syntheses",
  titleAr: "التوليف بين التخصصات",
  proficiencyLevel: proficiencyLevel.C2,
  warmup: {
    mission: "Learn to synthesize information from vastly different fields (e.g., Biology and Economics) to form a unified, high-level conclusion.",
    missionAr: "تعلم كيفية التوليف بين معلومات من مجالات مختلفة تماماً (مثل علم الأحياء والاقتصاد) لتشكيل استنتاج موحد وعالي المستوى.",
    objectives: [
      "Identify common metaphors shared between Science and Humanities.",
      "Analyze a text that uses Physics principles to explain Social behavior.",
      "Summarize complex papers that integrate at least three distinct disciplines."
    ],
    objectivesAr: [
      "تحديد الاستعارات المشتركة بين العلوم والإنسانيات.",
      "تحليل نص يستخدم مبادئ الفيزياء لشرح السلوك الاجتماعي.",
      "تلخيص أوراق بحثية معقدة تدمج ثلاثة تخصصات متميزة على الأقل."
    ]
  },
  content: `
### 1. Conceptual Blending (المزج المفاهيمي)
The C2 reader operates at the "Intersection". Modern breakthrough texts often borrow logic from one field to solve another.
*   **Bio-Economics:** Using the logic of *natural selection* to explain *market competition*.
*   **Social Physics:** Using *gravitational laws* to model the *movement of people* in cities.

### 2. Identifying "Loan" Vocabulary (المفردات المستعارة)
Look for terms being used outside their home discipline:
*   "The **catalyst** for the revolution..." (Chemistry term used for History).
*   "Digital **DNA** of a company..." (Biology term used for Corporate Strategy).

### 3. Synthesis vs. Summary (التوليف مقابل التلخيص)
*   **Summary:** Repeating point A and point B.
*   **Synthesis:** Combining A and B to create a new insight C.

| Field A | Field B | Synthetic Insight |
| :--- | :--- | :--- |
| Ecology | Architecture | Biophilic Design (buildings that live) |
| Psychology | Computer Science | User Interface (UI) Psychology |
| Game Theory | Geopolitics | Strategic Deterrence (War logic) |
`,
  contentAr: `
### 1. المزج المفاهيمي (Conceptual Blending)
يعمل قارئ C2 عند "التقاطعات". النصوص الحديثة المبتكرة غالباً ما تستعير المنطق من مجال ما لحل مشكلة في مجال آخر.
*   **الاقتصاد الحيوي:** استخدام منطق *الانتخاب الطبيعي* لشرح *المنافسة السوقية*.

### 2. المفردات "المستعارة"
ابحث عن مصطلحات تُستخدم خارج بيئتها الأصلية:
*   "كان **المحفز** (Catalyst) للثورة..." (مصطلح كيميائي يُستخدم في التاريخ).

### 3. التوليف مقابل التلخيص
*   **التلخيص:** تكرار النقطة (أ) والنقطة (ب).
*   **التوليف:** دمج (أ) مع (ب) لخلق رؤية جديدة (ج).

> **نصيحة للخبير:** عند قراءة مقال اقتصادي، ابحث عن استعارات من علم النفس أو الهندسة. هذا سيفتح لك أبعاداً أعمق لفهم نية الكاتب.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Identify the discipline of the "loaned" word.',
      instructionAr: 'حدد التخصص الأصلي للكلمة المستعارة.',
      items: [
        { text: "The political 'volatility' was high. (Original field: _______)", textAr: "كان 'التطاير/التقلب' السياسي مرتفعاً. (المجال الأصلي: _______)" },
        { text: "We need an 'architect' for this social reform. (Original field: _______)", textAr: "نحتاج إلى 'مهندس معماري' لهذا الإصلاح الاجتماعي. (المجال الأصلي: _______)" }
      ]
    }
  ],
  quiz: [
    {
      question: "What is the primary goal of 'Cross-Disciplinary Synthesis'?",
      questionAr: "ما هو الهدف الأساسي من 'التوليف بين التخصصات'؟",
      options: ["To simplify the text", "To create a new, integrated understanding", "To focus on one specific field", "To compare the beauty of different languages"],
      optionsAr: ["تبسيط النص", "خلق فهم جديد ومتكامل", "التركيز على مجال واحد محدد", "مقارنة جمال اللغات المختلفة"],
      correctIndex: 1,
      explanation: "Synthesis aims to unify diverse perspectives to solve complex problems or gain new insights.",
      explanationAr: "يهدف التوليف إلى توحيد وجهات نظر متنوعة لحل مشكلات معقدة أو اكتساب رؤى جديدة."
    }
  ]
};
