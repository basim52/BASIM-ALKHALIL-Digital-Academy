
import { Lesson, proficiencyLevel } from "../../types";

export const partsOfSpeechA1: Partial<Lesson> = {
  title: "Parts of Speech Intro",
  titleAr: "مقدمة في أقسام الكلام",
  proficiencyLevel: proficiencyLevel.A1,
  warmup: {
    mission: "Learn the difference between nouns, verbs, and adjectives to start building your English foundation.",
    missionAr: "تعلم الفرق بين الأسماء والأفعال والصفات للبدء في بناء أساسك في اللغة الإنجليزية.",
    objectives: [
      "Identify Nouns.",
      "Identify Verbs.",
      "Identify Adjectives.",
      "Categorize basic vocabulary correctly."
    ],
    objectivesAr: [
      "تحديد الأسماء.",
      "تحديد الأفعال.",
      "تحديد الصفات.",
      "تصنيف المفردات الأساسية بشكل صحيح."
    ]
  },
  content: `
### 1. Nouns
A noun is a word that names a person, place, thing, or idea.
*   **Person:** Boy, Teacher, Ali.
*   **Place:** School, London, Home.
*   **Thing:** Table, Apple, Car.

### 2. Verbs
A verb is a word that describes an action or a state.
*   **Action:** Run, Eat, Sleep, Play.
*   **State:** Is, Am, Are.

### 3. Adjectives
An adjective is a word that describes a noun.
*   **Color:** Red, Blue, Green.
*   **Size:** Big, Small, Tall.
*   **Quality:** Happy, Good, Hot.

### 4. Categorization Table
| Word | Part of Speech | Meaning |
| :--- | :--- | :--- |
| **Cat** | Noun | Animal |
| **Run** | Verb | Action |
| **Yellow** | Adjective | Color |
| **Teacher** | Noun | Person |
| **Drink** | Verb | Action |
| **Cold** | Adjective | Quality |
`,
  contentAr: `
### 1. الأسماء
الاسم هو كلمة تطلق على شخص أو مكان أو شيء.
*   شخص: معلم.
*   مكان: مدرسة.
*   شيء: قلم.

### 2. الأفعال
الفعل هو الكلمة التي تعبر عن حدث أو حركة.
*   مثل: يأكل، يمشي.

### 3. الصفات
الصفة هي كلمة تصف الاسم وتعطينا معلومات عنه.
*   مثل: كبير، سعيد.

### كيف تميز بينهم؟
*   الاسم: يمكنك وضع "أداة التعريف" قبله.
*   الفعل: يمكنك فعله.
*   الصفة: تخبرنا كيف يبدو الشيء.

> **نصيحة:** الجملة المفيدة في الإنجليزية تحتاج على الأقل إلى فاعل وفعل.
`,
  exercises: [
    {
      type: 'match',
      instruction: 'Match the word to its part of speech.',
      instructionAr: 'صل الكلمة بنوعها القواعدي.',
      items: [
        { text: "Apple", answer: "Noun" },
        { text: "Sleep", answer: "Verb" },
        { text: "Beautiful", answer: "Adjective" }
      ]
    }
  ],
  quiz: [
    {
      question: "Which word is an ADJECTIVE?",
      questionAr: "أي كلمة هي صفة؟",
      options: ["Book", "Tall", "Swim", "City"],
      optionsAr: ["كتاب", "طويل", "يسبح", "مدينة"],
      correctIndex: 1,
      explanation: "'Tall' describes a person or object.",
      explanationAr: "كلمة 'طويل' تصف الشخص أو الشيء."
    }
  ]
};
