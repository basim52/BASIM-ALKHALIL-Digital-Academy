
import { Lesson, proficiencyLevel } from "../../types";

export const culturalDifferencesB2: Partial<Lesson> = {
  title: "Cultural Differences & Etiquette",
  titleAr: "الاختلافات الثقافية والآداب العامة",
  proficiencyLevel: proficiencyLevel.B2,
  warmup: {
    mission: "Explore the fascinating world of cultural nuances, learn how to avoid social blunders, and discuss cross-cultural communication.",
    missionAr: "استكشف عالم الفروق الثقافية المثير، وتعلم كيفية تجنب الأخطاء الاجتماعية، وناقش التواصل عبر الثقافات.",
    objectives: [
      "Understand the concept of 'Body Language' and 'Personal Space'.",
      "Discuss 'High-Context' vs 'Low-Context' cultures.",
      "Identify common 'Taboos' in different countries.",
      "Explain your own cultural norms in English."
    ],
    objectivesAr: [
      "فهم مفهوم 'لغة الجسد' و 'المساحة الشخصية'.",
      "مناقشة الثقافات 'عالية السياق' مقابل 'منخفضة السياق'.",
      "تحديد 'المحرمات الاجتماعية' الشائعة في دول مختلفة.",
      "شرح معاييرك الثقافية الخاصة باللغة الإنجليزية."
    ]
  },
  content: `
### 1. Cultural Nuances
What is polite in one country might be rude in another.
*   **Punctuality:** (الالتزام بالوقت). In Germany, it's vital. In some Mediterranean countries, it's more flexible.
*   **Eye Contact:** (التواصل البصري). In the West, it shows honesty. In some Asian cultures, it can be seen as aggressive if too intense.
*   **Tipping:** (البخشيش). Expected in the US, but can be insulting in Japan.

### 2. Communication Styles
*   **Direct (Low-Context):** People say exactly what they mean. (US, Germany).
*   **Indirect (High-Context):** Meaning depends on the situation and tone. You must "read between the lines". (Japan, Arab world).

### 3. Avoiding Social Blunders (تجنب الأخطاء الاجتماعية)
*   **"I didn't realize that it was considered rude to..."**
*   **"In my culture, we usually..."**
*   **"Is it acceptable to [action] here?"**

### 4. Important Vocabulary
*   **Etiquette:** The set of rules for polite behavior.
*   **Taboo:** Something forbidden by social custom.
*   **Custom / Tradition:** A traditional way of behaving.
*   **Small talk:** Casual conversation about light topics (weather, hobbies).
`,
  contentAr: `
### 1. المساحة الشخصية (Personal Space)
في بعض الثقافات، الوقوف قريباً جداً من المتحدث يعتبر طبيعياً، وفي أخرى (مثل بريطانيا) يعتبر اقتحاماً للخصوصية.

### 2. الطقوس الاجتماعية
*   **Small talk:** الإنجليز يفضلون الحديث عن "الطقس" لبدء الكلام. لا تسأل أبداً عن "المرتب" (Salary) أو "العمر" في أول لقاء.

### 3. لغة الجسد (Body Language)
*   **The thumbs up:** قد تكون مهينة في بعض الدول.
*   **Nodding:** (هز الرأس) في بلغاريا قد يعني "لا"!

### 4. شرح ثقافتك
عندما تصف عاداتك لشخص أجنبي:
*   **"We take off our shoes before entering a house."**
*   **"Hospitality is a core value in our society."** (الضيافة قيمة جوهرية في مجتمعنا).

### 5. الاعتذار عن خطأ ثقافي
*   **"I'm sorry, I didn't know the custom."**
*   **"Please excuse my ignorance."**

> **نصيحة:** عندما تكون في شك، راقب السكان المحليين وافعل كما يفعلون: **"When in Rome, do as the Romans do."**
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Complete the sentences with: taboo, etiquette, norms, hospitality.',
      instructionAr: 'أكمل الجمل بالكلمة المناسبة.',
      items: [
        { text: "Learning the _______ of a new country is very important.", textAr: "تعلم _______ (الآداب العامة) في بلد جديد أمر مهم جداً." },
        { text: "In some cultures, talking about money is a _______.", textAr: "في بعض الثقافات، الحديث عن المال يعتبر _______ (محظوراً اجتماعياً)." },
        { text: "We are famous for our _______ towards guests.", textAr: "نحن مشهورون بـ _______ (كرم الضيافة) تجاه الضيوف." }
      ]
    }
  ],
  quiz: [
    {
      question: "What does 'When in Rome, do as the Romans do' mean?",
      questionAr: "ماذا يعني المثل 'When in Rome, do as the Romans do'؟",
      options: ["Go to Rome for holiday", "Follow the local customs of the place you are in", "Eat Italian food", "Learn Italian"],
      optionsAr: ["الذهاب لروما في عطلة", "اتباع العادات المحلية للمكان الذي تتواجد فيه (يا غريب كن أديب)", "أكل الطعام الإيطالي", "تعلم اللغة الإيطالية"],
      correctIndex: 1,
      explanation: "This proverb advises people to adapt to the habits and laws of the area they are visiting.",
      explanationAr: "هذا المثل ينصح الناس بالتكيف مع عادات وقوانين المنطقة التي يزورونها."
    }
  ]
};
