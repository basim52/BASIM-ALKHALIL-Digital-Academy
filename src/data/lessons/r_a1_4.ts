
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
### 1. Nuclear Family (العائلة الصغيرة)
The "Nuclear Family" consists of the people living in your home.

*   **Father / Dad**: (أب) - "My father is a teacher."
*   **Mother / Mom**: (أم) - "My mother is a doctor."
*   **Brother**: (أخ) - "I have one brother."
*   **Sister**: (أخت) - "My sister is younger than me."

> **Formula/Rule:** 
> **Possessive + Member** 
> *My father* = والدي | *Your sister* = أختك

### 2. Extended Family (العائلة الممتدة)
These are relatives who live outside your immediate house.

| Term (الإنجليزية) | Meaning (المعنى) | Example (مثال) |
| :--- | :--- | :--- |
| Grandfather | الجد | My grandfather is 70 years old. |
| Grandmother | الجدة | I love my grandmother's food. |
| Uncle | العم / الخال | My uncle lives in London. |
| Aunt | العمة / الخالة | My aunt is very kind. |
| Cousin | ابن العم / الخال | I play with my cousin. |

### 3. Sentence Patterns (أنماط الجمل)
When we talk about family at the A1 level, we use the verb **'to be'** (is/are) or **'to have'**.

1.  "This **is** my brother." (هذا أخي)
2.  "I **have** two sisters." (لدي أختان)
3.  "My father **is** tall." (أبي طويل القامة)
`,
  contentAr: `
### 1. العائلة الصغيرة (Nuclear Family)
تتكون "العائلة الصغيرة" من الأشخاص الذين يعيشون معك في المنزل.

*   **Father / Dad**: (أب) - "أبي معلم."
*   **Mother / Mom**: (أم) - "أمي طبيبة."
*   **Brother**: (أخ) - "لدي أخ واحد."
*   **Sister**: (أخت) - "أختي أصغر مني."

> **قاعدة ذهبية:** 
> **صفة الملكية + فرد العائلة** 
> *My father* = والدي | *Your sister* = أختك

### 2. العائلة الممتدة (Extended Family)
هؤلاء هم الأقارب الذين يعيشون خارج منزلك المباشر.

| المصطلح | المعنى | مثال |
| :--- | :--- | :--- |
| Grandfather | الجد | جدي يبلغ من العمر 70 عاماً. |
| Grandmother | الجدة | أحب طعام جدتي. |
| Uncle | العم / الخال | خالي يعيش في لندن. |
| Aunt | العمة / الخالة | عمتي طيبة جداً. |
| Cousin | ابن العم / الخال | ألعب مع ابن عمي. |

### 3. أنماط الجمل (Sentence Patterns)
عندما نتحدث عن العائلة في المستوى A1، نستخدم فعل الكينونة **'to be'** أو فعل الملكية **'to have'**.

1.  "This **is** my brother." (هذا أخي)
2.  "I **have** two sisters." (لدي أختان)
3.  "My father **is** tall." (أبي طويل القامة)
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
