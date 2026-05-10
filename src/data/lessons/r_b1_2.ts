
import { Lesson, proficiencyLevel } from "../../types";

export const factVsOpinionB1: Partial<Lesson> = {
  title: "Fact vs. Subjective Opinion",
  titleAr: "الحقيقة مقابل الرأي الذاتي",
  proficiencyLevel: proficiencyLevel.B1,
  warmup: {
    mission: "Learn to distinguish between objective data (facts) and personal perspectives (opinions) in reviews and articles.",
    missionAr: "تعلم التمييز بين البيانات الموضوعية (الحقائق) ووجهات النظر الشخصية (الآراء) في التقييمات والمقالات.",
    objectives: [
      "Define 'objective' and 'subjective' language.",
      "Identify key verbs and adjectives that signal an opinion.",
      "Analyze a product review for factual accuracy."
    ],
    objectivesAr: [
      "تعريف اللغة 'الموضوعية' و 'الذاتية'.",
      "تحديد الأفعال والصفات الرئيسية التي تشير إلى الرأي.",
      "تحليل تقييم منتج للتأكد من دقته الواقعية."
    ]
  },
  content: `
### 1. Defining the Terms (تعريف المصطلحات)
*   **Fact (حقيقة):** Something that can be proven true by science, history, or law. 
    *   *Example:* "Water boils at 100°C."
*   **Opinion (رأي):** A personal belief or feeling. It cannot be proven.
    *   *Example:* "Coffee tastes better than tea."

### 2. Signal Words (الكلمات الدالة)
Authors use "Opinion Indicators" to show that they are sharing their perspective.

| Category | Words |
| :--- | :--- |
| **Feelings** | Believe, Think, Feel, Love, Hate |
| **Adjectives** | Beautiful, Ugly, Best, Worst, Terrible |
| **Modal Verbs** | Should, Must (sometimes) |

> **Formula/Rule:**
> **Adjective of Value = Opinion**
> *The movie was **long** [Fact - duration] but **boring** [Opinion - feeling].*

### 3. Reading Product Reviews (قراءة تقييمات المنتجات)
Reviews are a mix of both. 
*   "The phone has 128GB memory [Fact] and it looks amazing [Opinion]."
`,
  contentAr: `
### 1. تعريف المصطلحات (Definitions)
*   **الحقيقة (Fact):** شيء يمكن إثباته بالعلم أو التاريخ أو القانون.
    *   *مثال:* "يغلي الماء عند 100 درجة مئوية."
*   **الرأي (Opinion):** اعتقاد أو شعور شخصي. لا يمكن إثباته بشكل مطلق.
    *   *مثال:* "القهوة ألذ من الشاي."

### 2. الكلمات الدالة (Signal Words)
يستخدم الكتاب "مؤشرات الرأي" لإظهار أنهم يشاركون وجهة نظرهم الشخصية.

| الفئة | الكلمات الدالة |
| :--- | :--- |
| **المشاعر** | Believe, Think, Feel |
| **الصفات** | Beautiful, Best, Worst |

> **قاعدة ذهبية:**
> **صفة التقييم = رأي.**
> *الفيلم كان **مدته ساعتين** [حقيقة] لكنه كان **مملاً** [رأي].*

### 3. تحليل التقييمات (Product Reviews)
التقييمات هي مزيج من الاثنين معاً.
*   "هذا الهاتف ذاكرته 128 جيجابايت [حقيقة] وشكله رائع [رأي]."
`,
  exercises: [
    {
      type: 'match',
      instruction: 'Classify these sentences.',
      instructionAr: 'صنف هذه الجمل.',
      items: [
        { text: "Earth orbits the sun.", answer: "Fact" },
        { text: "Summer is the best season.", answer: "Opinion" },
        { text: "Paris is the capital of France.", answer: "Fact" },
        { text: "Learning English is fun.", answer: "Opinion" }
      ]
    }
  ],
  quiz: [
    {
      question: "Which of these is a FACT?",
      questionAr: "أي من هذه الخيارات يمثل حقيقة؟",
      options: ["The weather is nice today.", "Mount Everest is the highest mountain.", "Blue is a beautiful color.", "Pizza is delicious."],
      optionsAr: ["الجو جميل اليوم.", "جبل إيفرست هو أعلى جبل بالعالم.", "اللون الأزرق جميل.", "البيتزا لذيذة."],
      correctIndex: 1,
      explanation: "Mountain height is a geographic fact that can be measured.",
      explanationAr: "ارتفاع الجبال حقيقة جغرافية يمكن قياسها وإثباتها."
    }
  ]
};
