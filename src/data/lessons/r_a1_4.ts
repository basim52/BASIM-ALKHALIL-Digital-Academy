
import { Lesson, proficiencyLevel } from "../../types";

export const familyConstellationsLesson: Partial<Lesson> = {
  title: "Family Constellations",
  titleAr: "تشكيلات العائلة",
  proficiencyLevel: proficiencyLevel.A1,
  warmup: {
    mission: "Identify primary family members and understand basic kinship vocabulary in English.",
    missionAr: "التعرف على أفراد الأسرة الأساسيين وفهم مفردات القرابة البسيطة باللغة الإنجليزية.",
    objectives: [
      "Memorize 10 basic family keywords (Father, Mother, Brother, etc.).",
      "Use possessive adjectives (My, Your) with family terms.",
      "Read a simple family tree narrative."
    ],
    objectivesAr: [
      "حفظ 10 كلمات أساسية عن العائلة (أب، أم، أخ، إلخ).",
      "استخدام صفات الملكية (My, Your) مع مصطلحات العائلة.",
      "قراءة نص بسيط يصف شجرة العائلة."
    ]
  },
  content: `
### 1. Nuclear Family
The "Nuclear Family" consists of the people living in your home.

*   **Father / Dad**: Male parent.
*   **Mother / Mom**: Female parent.
*   **Brother**: Male sibling.
*   **Sister**: Female sibling.

> **Grammar Rule:** 
> Use possessive adjectives before family members. 
> *My father* | *Your sister*

### 2. Extended Family
These are relatives who live outside your immediate house.

| Term | Meaning | Example |
| :--- | :--- | :--- |
| Grandfather | Parent's father | My grandfather is 70 years old. |
| Grandmother | Parent's mother | I love my grandmother's food. |
| Uncle | Parent's brother | My uncle lives in London. |
| Aunt | Parent's sister | My aunt is very kind. |
| Cousin | Aunt's or Uncle's child | I play with my cousin. |

### 3. Sentence Patterns
When we talk about family, we use the verb **'to be'** or **'to have'**.

1.  "This **is** my brother."
2.  "I **have** two sisters."
3.  "My father **is** tall."
`,
  contentAr: `
### 1. العائلة الصغيرة
تتكون "العائلة الصغيرة" من الأشخاص الذين يعيشون معك في المنزل.

*   **الأب**: "أبي معلم."
*   **الأم**: "أمي طبيبة."
*   **الأخ**: "لدي أخ واحد."
*   **الأخت**: "أختي أصغر مني."

> **قاعدة ذهبية:** 
> نستخدم صيفة الملكية قبل فرد العائلة للدلالة على القرابة.
> مثال: والدي، أختك.

### 2. العائلة الممتدة
هؤلاء هم الأقارب الذين يعيشون خارج منزلك المباشر.

| المصطلح | المعنى | مثال |
| :--- | :--- | :--- |
| الجد | والد الأب أو الأم | جدي يبلغ من العمر 70 عاماً. |
| الجدة | والدة الأب أو الأم | أحب طعام جدتي. |
| العم أو الخال | أخو الأب أو الأم | خالي يعيش في لندن. |
| العمة أو الخالة | أخت الأب أو الأم | عمتي طيبة جداً. |
| ابن العم أو الخال | طفل العم أو الخال | ألعب مع ابن عمي. |

### 3. أنماط الجمل
عندما نتحدث عن العائلة، نستخدم أفعال الكينونة أو التملك.

1.  "هذا أخي."
2.  "لدي أختان."
3.  "أبي طويل القامة."
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Complete the sentences with: Father, Sister, Daughter.',
      instructionAr: 'أكمل الجمل باستخدام: Father, Sister, Daughter.',
      items: [
        { text: "My _______ is my mother's husband.", textAr: "أبي هو زوج أمي." },
        { text: "My _______ is my parents' girl child.", textAr: "ابنتي هي طفلة والديّ." },
        { text: "My _______ is my father's other daughter.", textAr: "أختي هي ابنة أبي الأخرى." }
      ]
    },
    {
      type: 'match',
      instruction: 'Match the opposite genders.',
      instructionAr: 'صل بين الجنسين المتقابلين.',
      items: [
        { text: "Father", answer: "Mother" },
        { text: "Brother", answer: "Sister" },
        { text: "Uncle", answer: "Aunt" },
        { text: "Son", answer: "Daughter" }
      ]
    }
  ],
  quiz: [
    {
      question: "Who is your mother's sister?",
      questionAr: "من هي أخت أمك؟",
      options: ["Uncle", "Aunt", "Cousin", "Brother"],
      optionsAr: ["الخال", "الخالة", "ابن الخال", "الأخ"],
      correctIndex: 1,
      explanation: "Your mother's sister is your Aunt.",
      explanationAr: "أخت أمك هي خالتك (Aunt)."
    },
    {
      question: "Choose the correct sentence:",
      questionAr: "اختر الجملة الصحيحة:",
      options: ["I have one sister.", "I has one sister.", "I is one sister.", "I am one sister."],
      optionsAr: ["لدي أخت واحدة.", "أنا لديه أخت واحدة (خطأ نحوي).", "أنا يكون أخت واحدة (خطأ نحوي).", "أنا أخت واحدة (خطأ سياقي)."],
      correctIndex: 0,
      explanation: "With 'I', we use 'have' for possession.",
      explanationAr: "مع الضمير 'I'، نستخدم الفعل 'have' للتعبير عن الملكية."
    }
  ]
};
