
import { Lesson, proficiencyLevel } from "../../types";

export const wordOrderA1: Partial<Lesson> = {
  title: "Basic Word Order",
  titleAr: "الترتيب الأساسي للكلمات",
  proficiencyLevel: proficiencyLevel.A1,
  warmup: {
    mission: "Learn the essential structure of English sentences to start communicating clearly and correctly.",
    missionAr: "تعلم الهيكل الأساسي للجمل الإنجليزية للبدء في التواصل بوضوح وبشكل صحيح.",
    objectives: [
      "Identify the Subject (S).",
      "Identify the Verb (V).",
      "Identify the Object (O).",
      "Master the S-V-O pattern in positive sentences."
    ],
    objectivesAr: [
      "تحديد الفاعل (Subject).",
      "تحديد الفعل (Verb).",
      "تحديد المفعول به (Object).",
      "إتقان نمط S-V-O في الجمل المثبتة."
    ]
  },
  content: `
### 1. The Core Structure: S-V-O
In English, word order is very strict. Most positive sentences follow the **Subject-Verb-Object** pattern.

*   **Subject (Who):** The person or thing doing the action.
*   **Verb (Action):** The action being done.
*   **Object (What):** The person or thing receiving the action.

### 2. Examples
| Subject | Verb | Object | Full Sentence |
| :--- | :--- | :--- | :--- |
| **I** | **drink** | **tea** | I drink tea. |
| **Ali** | **plays** | **tennis** | Ali plays tennis. |
| **We** | **eat** | **lunch** | We eat lunch. |

### 3. Subject Pronouns
Instead of nouns, we often use pronouns as the Subject:
*   Singular: **I, You, He, She, It**
*   Plural: **We, They, You**

*Example:* **She** (Subject) **reads** (Verb) **a book** (Object).

### 4. Adjectives in Word Order
Adjectives usually come **before** the noun.
*   *Correct:* A **red** car.
*   *Sentence:* He drives a **red** car.
`,
  contentAr: `
### 1. الهيكل الأساسي: فاعل - فعل - مفعول به
في اللغة الإنجليزية، ترتيب الكلمات ثابت وصارم جداً. تتبع معظم الجمل المثبتة نمط:
**فاعل + فعل + مفعول به**

*   **الفاعل (من؟):** من قام بالفعل.
*   **الفعل (ماذا حدث؟):** الحدث نفسه.
*   **المفعول به (على من وقع الفعل؟):** الشيء المتأثر.

### 2. أمثلة توضيحية
*   أنا أشرب القهوة.
*   **الفاعل:** أنا | **الفعل:** أشرب | **المفعول به:** القهوة.

### 3. ترتيب الصفات
الصفة في الإنجليزية تأتي **قبل** الاسم دائماً (عكس اللغة العربية).
*   نقول: بيت كبير، وليس "بيت كبير" بترتيب معكوس.

### 4. قاعدة هامة
الجملة الإنجليزية لا بد أن تحتوي على فاعل ظاهر. لا يمكننا البدء بالفعل مباشرة كما في جملة "أكل التفاحة"، بل يجب قول "هو أكل التفاحة".

> **نصيحة:** إذا فقدت الترتيب، تذكر دائماً: ابدأ بـ (من) ثم (ماذا يفعل) ثم (ماذا).
`,
  exercises: [
    {
      type: 'match',
      instruction: 'Arrange these words to make a correct sentence: (Apple / eats / Sara).',
      instructionAr: 'رتب الكلمات لتكوين جملة صحيحة: (Apple / eats / Sara).',
      items: [
        { text: "Word 1 (Subject)", answer: "Sara" },
        { text: "Word 2 (Verb)", answer: "eats" },
        { text: "Word 3 (Object)", answer: "an apple" }
      ]
    }
  ],
  quiz: [
    {
      question: "Which of these is a correct S-V-O sentence?",
      questionAr: "أي من هذه الجمل تتبع نمط S-V-O الصحيح؟",
      options: ["Drinks Ali milk.", "Ali milk drinks.", "Ali drinks milk.", "Milk Ali drinks."],
      optionsAr: ["Drinks Ali milk.", "Ali milk drinks.", "Ali drinks milk.", "Milk Ali drinks."],
      correctIndex: 2,
      explanation: "'Ali' (Subject) + 'drinks' (Verb) + 'milk' (Object).",
      explanationAr: "'Ali' (فاعل) + 'drinks' (فعل) + 'milk' (مفعول به)."
    }
  ]
};
