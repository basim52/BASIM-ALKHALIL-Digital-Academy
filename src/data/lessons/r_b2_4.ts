
import { Lesson, proficiencyLevel } from "../../types";

export const environmentalDiscourseB2: Partial<Lesson> = {
  title: "Environmental Discourse",
  titleAr: "الخطاب البيئي",
  proficiencyLevel: proficiencyLevel.B2,
  warmup: {
    mission: "Analyze scientific and ecological texts regarding sustainability and global climate issues.",
    missionAr: "تحليل النصوص العلمية والبيئية المتعلقة بالاستدامة وقضايا المناخ العالمي.",
    objectives: [
      "Understand technical terms related to ecology (Carbon footprint, Biodiversity).",
      "Interpret cause-effect relationships in climate reports.",
      "Summarize global solutions for sustainability."
    ],
    objectivesAr: [
      "فهم المصطلحات التقنية المتعلقة بالبيئة (البصمة الكربونية، التنوع البيولوجي).",
      "تفسير علاقات السبب والنتيجة في تقارير المناخ.",
      "تلخيص الحلول العالمية للاستدامة."
    ]
  },
  content: `
### 1. Ecological Terminology (المصطلحات البيئية)
B2 Environmental texts rely on specific jargon:

*   **Carbon Footprint**: The total amount of greenhouse gases produced by an individual/org.
*   **Renewable Energy**: Sources like solar and wind that don't run out.
*   **Biodiversity**: The variety of life in a particular habitat.
*   **Sustainability**: Meeting our needs without hurting future generations.

### 2. Reading Scientific "Probability" (الاحتمالية العلمية)
In environmental reports, scientists use "Hedging" words to be accurate.
*   "Data **suggests**..." (instead of "says")
*   "It is **highly likely** that..."
*   "There is a **marginal** risk..."

### 3. Analyzing Urgency (تحليل حالة الطوارئ)
Look for adjectives that show the level of danger:
*   *Critical / Acute / Dire* (Very dangerous).
*   *Developing / Emerging* (Starting to happen).

| Term | Meaning | Arabic |
| :--- | :--- | :--- |
| **Emission** | Liquid or gas sent out into the air. | انبعاث |
| **Ecosystem** | A biological community of interacting organisms. | نظام بيئي |
| **Deforestation** | Cutting down large areas of trees. | إزالة الغابات |
`,
  contentAr: `
### 1. المصطلحات البيئية (Ecology Terminology)
تعتمد نصوص البيئة في المستوى B2 على مصطلحات تقنية محددة:

*   **Renewable Energy:** الطاقة المتجددة (شمس، رياح).
*   **Biodiversity:** التنوع البيولوجي (تعدد أنواع الكائنات).
*   **Sustainability:** الاستدامة.

### 2. لغة "الاحتمالية" (Hedging Language)
في التقارير العلمية، نادراً ما يستخدم الكتاب كلمات جازمة. ابحث عن:
*   **Suggests / Indicates:** تبدو البيانات وكأنها تشير إلى...
*   **Likely:** من المرجح.

### 3. مستويات الخطورة (Urgency)
*   **Critical / Dire:** مستويات خطورة عالية جداً.
*   **Emerging:** تحديات بدأت بالظهور الآن.

> **نصيحة للقراءة:** النصوص البيئية غالباً ما تتبع أسلوب (المشكلة -> الأثر -> الحل المقترح).
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Complete with: Biodiversity, Sustainability, Emissions.',
      instructionAr: 'أكمل المصطلحات البيئية الصحيحة.',
      items: [
        { text: "Reducing CO2 _______ is vital for the planet.", textAr: "تقليل _______ ثاني أكسيد الكربون حيوي للكوكب." },
        { text: "Solar power is a key part of _______.", textAr: "الطاقة الشمسية جزء رئيسي من _______." },
        { text: "The rainforest has very high _______.", textAr: "الغابة المطيرة لديها _______ عالٍ جداً (تنوع كائنات)." }
      ]
    }
  ],
  quiz: [
    {
      question: "What does 'Carbon Footprint' measure?",
      questionAr: "ماذا تقيس 'البصمة الكربونية'؟",
      options: ["The size of your shoes", "Your impact on the environment (gases)", "The depth of the ocean", "Number of trees in a forest"],
      optionsAr: ["مقاس حذائك", "تأثيرك على البيئة (الغازات)", "عمق المحيط", "عدد الأشجار في الغابة"],
      correctIndex: 1,
      explanation: "A carbon footprint is the measure of greenhouse gas impact from activities.",
      explanationAr: "البصمة الكربونية هي قياس أثر الغازات الدفيئة الناتج عن الأنشطة البشرية."
    }
  ]
};
