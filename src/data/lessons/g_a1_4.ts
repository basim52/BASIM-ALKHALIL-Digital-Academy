
import { Lesson, proficiencyLevel } from "../../types";

export const articlesA1: Partial<Lesson> = {
  title: "Articles (A, An, The)",
  titleAr: "أدوات التعريف والتنكير",
  proficiencyLevel: proficiencyLevel.A1,
  warmup: {
    mission: "Learn how to use 'a', 'an', and 'the' correctly to define the things you talk about.",
    missionAr: "تعلم كيفية استخدام 'a' و 'an' و 'the' بشكل صحيح لتحديد الأشياء التي تتحدث عنها.",
    objectives: [
      "Master the 'an' vowel rule.",
      "Understand the 'a' consonant rule.",
      "Identify when a noun becomes specific (The).",
      "Avoid common mistakes like using articles with plurals."
    ],
    objectivesAr: [
      "إتقان قاعدة حروف العلة مع 'an'.",
      "فهم قاعدة الحروف الساكنة مع 'a'.",
      "تحديد متى يصبح الاسم محدداً ومعروفاً (The).",
      "تجنب الأخطاء الشائعة مثل استخدام الأدوات مع الجمع."
    ]
  },
  content: `
### 1. A and AN (Indefinite: Any one)
We use **a** and **an** for singular countable nouns when we are talking about **any** one of its kind.

*   Use **AN** if the next word starts with a **vowel sound** (a, e, i, o, u).
    *   **an** apple, **an** egg, **an** ice cream, **an** orange, **an** umbrella.
*   Use **A** for everything else.
    *   **a** book, **a** car, **a** dog, **a** university.

### 2. THE (Definite: A specific one)
We use **the** when both the speaker and listener know exactly **which** thing is being discussed.

*   *Example:* "Give me **a** pen." (Any pen).
*   *Example:* "Give me **the** pen." (The specific pen we know).

### 3. When NO Article is needed?
1.  **Plural nouns (General):** I like cats.
2.  **Proper Names:** I live in London.
3.  **Uncountable nouns (General):** I drink milk.

| Category | Using A/AN | Using THE |
| :--- | :--- | :--- |
| **Objects** | I have **a** car. | **The** car is red. |
| **Jobs** | He is **a** doctor. | **The** doctor is here. |
`,
  contentAr: `
### 1. أدوات التنكير
نستخدمهما قبل الاسم المفرد لنقول "واحد من..." أو "أي واحد".
*   الأداة الأولى: نستخدمها قبل الكلمات التي تبدأ بصوت حرف علة.
    *   مثال: برتقالة واحدة.
*   الأداة الثانية: نستخدمها مع باقي الحروف.
    *   مثال: حقيبة واحدة.

### 2. أداة التعريف
تستخدم عندما نتحدث عن شيء **محدد** ومعروف للسامع.
*   كتاب (أي كتاب).
*   الكتاب (الذي نتحدث عنه الآن أو الذي نعرفه).

### 3. أخطاء شائعة
*   لا تضع أداة قبل الجمع.
*   لا تضع أداة قبل أسماء المدن والأشخاص غالباً.

> **قاعدة ذهبية:** إذا كان الشيء فريداً من نوعه (مثل الشمس أو القمر)، نستخدم دائماً أداة التعريف.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Write "a", "an", or "the".',
      instructionAr: 'اكتب "a" أو "an" أو "the" في الفراغ.',
      items: [
        { text: "I ate _______ apple for breakfast.", textAr: "أكلت _______ تفاحة في الإفطار." },
        { text: "Paris is _______ capital of France.", textAr: "باريس هي _______ عاصمة فرنسا (شيء محدد وفريد)." },
        { text: "Close _______ door, please.", textAr: "أغلق _______ الباب، من فضلك (الباب الذي نعرفه)." }
      ]
    }
  ],
  quiz: [
    {
      question: "Which of these is correct?",
      questionAr: "أي من هذه الخيارات صحيح؟",
      options: ["A elephant", "An elephant", "The elephants is big", "An car"],
      optionsAr: ["A elephant", "An elephant", "The elephants is big", "An car"],
      correctIndex: 1,
      explanation: "'Elephant' starts with a vowel sound, so it takes 'an'.",
      explanationAr: "كلمة 'Elephant' تبدأ بصوت حرف علة، لذا تأخذ 'an'."
    }
  ]
};
