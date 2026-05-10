
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
### 1. Expanding the Sentence (توسيع الجملة)
In A1, we learned: *I like apples.* In A2, we connect: *I like apples **and** I like oranges.*

*   **And (و)**: Used to add similar information.
    *   *Example:* "She speaks English **and** she studies French."
*   **But (لكن)**: Used to show a difference or contrast.
    *   *Example:* "I want to go out, **but** it is raining."
*   **Because (لأن)**: Used to give a reason.
    *   *Example:* "He is happy **because** he won the game."

> **Formula/Rule:** 
> **Sentence A + Connector + Sentence B**
> *Subject + Verb ... [and/but/because] ... Subject + Verb*

### 2. Sentence Order in Reading (ترتيب الجمل في القراءة)
When reading A2 texts, look for the connector to understand the logic.
1.  **Addition:** Look for 'and', 'also', 'too'.
2.  **Contrast:** Look for 'but', 'however'.
3.  **Cause:** Look for 'because', 'so'.

### 3. Practical Comparison (مقارنة عملية)
| Simple (بسيطة) | Compound (مركبة) |
| :--- | :--- |
| I study. I sleep. | I study **and** then I sleep. |
| It is hot. I am cool. | It is hot, **but** I am cool. |
`,
  contentAr: `
### 1. توسيع الجملة (Expanding the Sentence)
في المستوى A1 تعلمنا: *I like apples.* في المستوى A2 نربط الأفكار: *I like apples **and** I like oranges.*

*   **And (و)**: تستخدم لإضافة معلومات متشابهة.
    *   *مثال:* "هي تتحدث الإنجليزية **و** تدرس الفرنسية."
*   **But (لكن)**: تستخدم لإظهار التناقض أو الاختلاف.
    *   *مثال:* "أريد الخروج، **لكن** السماء تمطر."
*   **Because (لأن)**: تستخدم لإعطاء سبب.
    *   *مثال:* "هو سعيد **لأنه** فاز بالمباراة."

> **قاعدة ذهبية:** 
> نستخدم الفاصلة (,) غالباً قبل **but** في الجمل الطويلة لراحة القارئ.

### 2. منطق الروابط (Logical Connectors)
عند قراءة نصوص A2، ابحث عن الرابط لفهم المعنى:
1.  **الإضافة:** ابحث عن 'and'.
2.  **التناقض:** ابحث عن 'but'.
3.  **السبب:** ابحث عن 'because'.
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
