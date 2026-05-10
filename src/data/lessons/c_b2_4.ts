
import { Lesson, proficiencyLevel } from "../../types";

export const mediaNewsB2: Partial<Lesson> = {
  title: "Media & News: Critical Thinking",
  titleAr: "الإعلام والأخبار: التفكير النقدي",
  proficiencyLevel: proficiencyLevel.B2,
  warmup: {
    mission: "Learn how to discuss current events, analyze media bias, and share your views on the influence of social media.",
    missionAr: "تعلم كيفية مناقشة الأحداث الجارية، تحليل الانحياز الإعلامي، ومشاركة آرائك حول تأثير وسائل التواصل الاجتماعي.",
    objectives: [
      "Distinguish between 'Objective' and 'Biased' reporting.",
      "Understand news vocabulary (headline, tabloid, broadsheet).",
      "Express skepticism and critical analysis.",
      "Discuss the impact of 'fake news' and algorithms."
    ],
    objectivesAr: [
      "التمييز بين التقارير 'الموضوعية' و'المنحازة'.",
      "فهم مفردات الأخبار (عنوان، صحيفة شعبية، صحيفة جادة).",
      "التعبير عن التشكك والتحليل النقدي.",
      "مناقشة تأثير 'الأخبار المزيفة' والخوارزميات."
    ]
  },
  content: `
### 1. Types of Media (أنواع الإعلام)
*   **Broadsheets:** Serious newspapers (e.g., The Guardian).
*   **Tabloids:** Sensation-seeking newspapers focused on celebrities.
*   **Citizen Journalism:** News reported by ordinary people (social media).
*   **Fake News:** Misinformation or intentionally false stories.

### 2. Media Bias (الانحياز الإعلامي)
*   **"Is the source reliable?"** (هل المصدر موثوق؟).
*   **"They are definitely biased towards..."**
*   **"The story has been blown out of proportion."** (تم تضخيم القصة أكثر مما تستحق).
*   **"They are trying to sway public opinion."** (يحاولون التأثير على الرأي العام).

### 3. Critical Vocabulary
*   **Sensationalism:** Using shocking language to get attention.
*   **Censorship:** Controlling what information is published.
*   **A source:** The person or place where news comes from.
*   **A scoop:** An exclusive news story.

### 4. Discussing Social Media
*   **"Social media is a double-edged sword."**
*   **"The algorithms create an echo chamber."** (الخوارزميات تخلق غرف صدى - تسمع فقط ما توافق عليه).
*   **"Viral content"** (محتوى منتشر بشدة).
`,
  contentAr: `
### 1. كيف تقرأ الأخبار بالإنجليزية؟
*   **Headline:** العنوان الرئيسي.
*   **Breaking News:** خبر عاجل.
*   **Editorial:** مقال رأي (للمحرر).

### 2. التعبير عن الشك (Skepticism)
لا تصدق كل ما يقال:
*   **"I'd take that with a grain of salt."** (مثل: لا تأخذ هذا الكلام كحقيقة مسلم بها).
*   **"Is there any evidence to back this up?"** (هل هناك دليل يدعم هذا؟).

### 3. تأثير الخوارزميات
*   **Algorithms:** الخوارزميات.
*   **Targeted ads:** إعلانات مستهدفة.
*   **Clickbait:** عناوين مضللة لجذب النقر (مثلاً: لن تصدق ماذا حدث!).

### 4. المناقشة
*   **Q: Do you think traditional media is dying?**
*   **A: In some ways, yes, but reliable journalism remains essential.**

> **نصيحة:** عند نقد خبر ما، استخدم جملة: **"We need to read between the lines."** (نحتاج أن نقرأ ما بين السطور).
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Complete the sentences with: biased, sensational, headline, reliable.',
      instructionAr: 'أكمل الجمل بالكلمة المناسبة.',
      items: [
        { text: "I don't trust that website; it's very _______.", textAr: "لا أثق في ذلك الموقع؛ إنه _______ جداً." },
        { text: "The _______ was designed to attract attention.", textAr: "كان _______ مصمماً لجذب الانتباه." },
        { text: "It's hard to find a _______ source of news these days.", textAr: "من الصعب إيجاد مصدر أخبار _______ هذه الأيام." }
      ]
    }
  ],
  quiz: [
    {
      question: "What is 'Clickbait'?",
      questionAr: "ما هو الـ 'Clickbait'؟",
      options: ["A type of fish food", "A misleading title to get clicks", "A high-quality news report", "A social media app"],
      optionsAr: ["نوع من طعام السمك", "عنوان مضلل لجذب النقرات", "تقرير إخباري عالي الجودة", "تطبيق تواصل اجتماعي"],
      correctIndex: 1,
      explanation: "Clickbait refers to web content that is designed specifically to encourage users to click on a link, often using exaggerated titles.",
      explanationAr: "الـ Clickbait يشير لمحتوى الويب المصمم خصيصاً لتشجيع المستخدمين على النقر على الرابط، وغالباً باستخدام عناوين مبالغ فيها."
    }
  ]
};
