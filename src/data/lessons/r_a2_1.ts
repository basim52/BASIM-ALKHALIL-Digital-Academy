
import { Lesson, proficiencyLevel } from "../../types";

export const basicSentenceStructureA2: Partial<Lesson> = {
  title: "Basic Sentence Structure (Connectors)",
  titleAr: "بنية الجملة الأساسية (الروابط)",
  proficiencyLevel: proficiencyLevel.A2,
  warmup: {
    mission: "Learn how to combine simple ideas into compound sentences using 'and', 'but', and 'because'.",
    missionAr: "تعلم كيفية دمج الأفكار البسيطة في جمل مركبة باستخدام 'and' و 'but' و 'because'.",
    objectives: [
      "Identify the difference between simple and compound sentences.",
      "Use 'but' to show contrast in a text.",
      "Link reasons to actions using 'because' correctly."
    ],
    objectivesAr: [
      "تمييز الفرق بين الجمل البسيطة والجمل المركبة.",
      "استخدام 'but' لإظهار التناقض في النص.",
      "ربط الأسباب بالأفعال باستخدام 'because' بشكل صحيح."
    ]
  },
  content: `
### 1. Expanding the Sentence
In A1, we learned: *I like apples.* In A2, we connect: *I like apples **and** I like oranges.*

*   **And**: Used to add similar information.
    *   *Example:* "She speaks English **and** she studies French."
*   **But**: Used to show a difference or contrast.
    *   *Example:* "I want to go out, **but** it is raining."
*   **Because**: Used to give a reason.
    *   *Example:* "He is happy **because** he won the game."

> **Formula/Rule:** 
> **Sentence A + Connector + Sentence B**
> *Subject + Verb ... [and/but/because] ... Subject + Verb*

### 2. Sentence Order in Reading
When reading A2 texts, look for the connector to understand the logic.
1.  **Addition:** Look for 'and', 'also', 'too'.
2.  **Contrast:** Look for 'but', 'however'.
3.  **Cause:** Look for 'because', 'so'.

### 3. Practical Comparison
| Simple | Compound |
| :--- | :--- |
| I study. I sleep. | I study **and** then I sleep. |
| It is hot. I am cool. | It is hot, **but** I am cool. |
`,
  contentAr: `
### 1. توسيع الجملة
في المستوى التأسيسي السابق تعلمنا الجمل البسيطة. في هذا المستوى نربط الأفكار مع بعضها:
*   **و (أداة الإضافة)**: تستخدم لإضافة معلومات متشابهة.
    *   مثال: "هي تتحدث الإنجليزية وتدرس الفرنسية."
*   **لكن (أداة التناقض)**: تستخدم لإظهار التناقض أو الاختلاف بين جملتين.
    *   مثال: "أريد الخروج، لكن السماء تمطر."
*   **لأن (أداة التعليل)**: تستخدم لإعطاء سبب للحدث.
    *   مثال: "هو سعيد لأنه فاز بالمباراة."

> **قاعدة ذهبية:** 
> نستخدم الفاصلة غالباً قبل أداة التناقض في الجمل الطويلة لراحة القارئ وتوضيح الفرق.

### 2. منطق الروابط في القراءة
عند قراءة النصوص المتقدمة قليلاً، ابحث عن الروابط لفهم المعنى المنطقي:
1.  **الإضافة:** البحث عن أدوات العطف والإضافة.
2.  **التناقض:** البحث عن أدوات الاستدراك والاختلاف.
3.  **السبب:** البحث عن أدوات التعليل والنتيجة.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Fill in with: and, but, because.',
      instructionAr: 'املأ الفراغات باستخدام الروابط المناسبة.',
      items: [
        { text: "I am tired _______ I worked all day.", textAr: "أنا متعب _______ عملت طوال اليوم." },
        { text: "He likes coffee _______ he doesn't like tea.", textAr: "هو يحب القهوة _______ لا يحب الشاي." },
        { text: "We have a car _______ a big house.", textAr: "لدينا سيارة _______ منزل كبير." }
      ]
    }
  ],
  readingText: {
    paragraphs: [
      {
        en: 'In our daily lives, we often use connectors like **and**, **but**, and **because** to build smarter sentences. "I like tea **and** coffee" is simple, but "I like tea **but** I don\'t like sugar" shows contrast.',
        ar: 'في حياتنا اليومية، غالباً ما نستخدم الروابط مثل **and** و **but** و **because** لبناء جمل أكثر ذكاءً. "I like tea **and** coffee" جملة بسيطة، لكن "I like tea **but** I don\'t like sugar" تظهر التناقض.'
      },
      {
        en: 'The connector **because** is vital for explaining reasons. For example: "I am studying English **because** it is important for my career." Using these words helps you transition from basic to intermediate reading.',
        ar: 'الرابط **because** حيوي لشرح الأسباب. على سبيل المثال: "أنا أدرس الإنجليزية **لأنها** مهمة لمستقبلي المهني". استخدام هذه الكلمات يساعدك على الانتقال من القراءة الأساسية إلى المتوسطة.'
      }
    ]
  },
  vocabulary: [
    {
      word: 'Connector',
      phonetic: 'kəˈnektər',
      meaningAr: 'رابط / أداة عطف',
      example: 'A connector joins two ideas together.'
    },
    {
      word: 'Contrast',
      phonetic: 'ˈkɒntrɑːst',
      meaningAr: 'تناقض / تباين',
      example: 'Use "but" to show a contrast between phrases.'
    },
    {
      word: 'Vital',
      phonetic: 'ˈvaɪtl',
      meaningAr: 'حيوي / ضروري جداً',
      example: 'Grammar is vital for clear communication.'
    }
  ],
  quiz: [
    {
      question: "Which word joins two similar ideas?",
      questionAr: "أي كلمة تربط بين فكرتين متشابهتين؟",
      options: ["And", "But", "Because", "Or"],
      optionsAr: ["و (and)", "لكن (but)", "لأن (because)", "أو (or)"],
      correctIndex: 0,
      explanation: "'And' is used for addition of similar things.",
      explanationAr: "تستخدم 'And' للإضافة بين أشياء متشابهة."
    },
    {
      question: "Complete: 'She is crying _______ she lost her key.'",
      questionAr: "أكمل: 'هي تبكي _______ فقدت مفتاحها.'",
      options: ["and", "but", "because", "so"],
      optionsAr: ["و", "لكن", "لأن", "لذلك"],
      correctIndex: 2,
      explanation: "Losing a key is the reason for crying.",
      explanationAr: "فقدان المفتاح هو السبب (Reason)، لذا نستخدم because."
    }
  ]
};
