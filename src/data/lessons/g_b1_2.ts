
import { Lesson, proficiencyLevel } from "../../types";

export const relativeClausesB1: Partial<Lesson> = {
  title: "Relative Clauses: Who, Which, That",
  titleAr: "جمل الوصل: الذي، التي",
  proficiencyLevel: proficiencyLevel.B1,
  warmup: {
    mission: "Learn how to join two sentences together to provide more information about a person or a thing.",
    missionAr: "تعلم كيفية ربط جملتين معاً لتقديم مزيد من المعلومات حول شخص أو شيء ما.",
    objectives: [
      "Use 'Who' for people.",
      "Use 'Which' for things.",
      "Use 'That' for both.",
      "Combine two short sentences into one complex sentence."
    ],
    objectivesAr: [
      "استخدام 'Who' للأشخاص.",
      "استخدام 'Which' للأشياء.",
      "استخدام 'That' لكليهما.",
      "دمج جملتين قصيرتين في جملة واحدة معقدة."
    ]
  },
  content: `
### 1. Why use Relative Clauses?
Instead of saying two short, boring sentences, we use relative pronouns to make one fluent sentence.
*   *Short:* I have a friend. He speaks five languages.
*   *Better:* I have a friend **who** speaks five languages.

### 2. Relative Pronouns
*   **Who:** For People.
    *   *The man **who** lives next door is a doctor.*
*   **Which:** For Things and Animals.
    *   *This is the book **which** I bought yesterday.*
*   **That:** For People or Things (Informal/Common).
    *   *The car **that** she drives is very old.*
*   **Where:** For Places.
    *   *That is the school **where** I studied.*

### 3. Defining vs. Non-defining
At B1, we focus on **Defining Clauses** (information that is essential to know which person/thing we mean).
*   "The girl who is wearing the red hat is my sister."

### 4. Structure
**Noun + Relative Pronoun + Rest of description**
`,
  contentAr: `
### 1. ما هي جمل الوصل؟
هي جمل تبدأ بأدوات ربط لتعطينا معلومات إضافية عن الاسم الذي يسبقها مباشرة.
*   بدلاً من قول جملتين منفصلتين، نربطهما في جملة واحدة أكثر سلاسة.
*   مثال: "قابلت المعلم الذي هو من مصر."

### 2. الكلمات المستخدمة للربط
*   للعاقل (الأشخاص).
*   لغير العاقل (الأشياء والحيوانات).
*   تصلح للاثنين وتستخدم بكثرة في الكلام اليومي.
*   للمكان (المكان حيث وقع الحدث).

### 3. كيف نربط الجمل؟
القاعدة بسيطة: احذف الضمير المكرر في الجملة الثانية وضع مكانه أداة الوصل المناسبة.
*   مثال: "هذه هي السيارة التي تعتبر سريعة جداً."

> **نصيحة:** إذا كنت محتاراً في اختيار الأداة المناسبة في موقف عفوي وغير رسمي، يمكنك استخدام الأداة الشاملة التي تصلح للعاقل وغير العاقل.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Join the sentences using who, which, or where.',
      instructionAr: 'اربط الجمل باستخدام who أو which أو where.',
      items: [
        { text: "A chef is a person _______ cooks food.", textAr: "الطباخ هو الشخص _______ يطهو الطعام." },
        { text: "I lost the watch _______ my father gave me.", textAr: "فقدت الساعة _______ أعطاني إياها والدي." },
        { text: "This is the hospital _______ I was born.", textAr: "هذا هو المستشفى _______ ولدت فيه." }
      ]
    }
  ],
  quiz: [
    {
      question: "Which pronoun is used for PEOPLE?",
      questionAr: "أي اسم وصل يُستخدم للأشخاص (العاقل)؟",
      options: ["Which", "Who", "Where", "When"],
      optionsAr: ["Which", "Who", "Where", "When"],
      correctIndex: 1,
      explanation: "'Who' is the strictly correct pronoun for people in English.",
      explanationAr: "'Who' هو اسم الوصل الصحيح للبشر في الإنجليزية."
    }
  ]
};
