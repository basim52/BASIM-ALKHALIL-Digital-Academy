
import { Lesson, proficiencyLevel } from "../../types";

export const abstractConceptsC1: Partial<Lesson> = {
  title: "Discussing Abstract Concepts & Ethics",
  titleAr: "مناقشة المفاهيم المجردة والأخلاقيات",
  proficiencyLevel: proficiencyLevel.C1,
  warmup: {
    mission: "Learn how to engage in high-level intellectual discussions about justice, technology, happiness, and moral dilemmas.",
    missionAr: "تعلم كيفية المشاركة في نقاشات فكرية رفيعة المستوى حول العدالة، التكنولوجيا، السعادة، والمعضلات الأخلاقية.",
    objectives: [
      "Define abstract nouns using academic structures.",
      "Express nuanced views on 'Gray Areas'.",
      "Use 'Speculative' language (Supposing, If we assume).",
      "Engage with philosophical questions like 'What is success?'"
    ],
    objectivesAr: [
      "تعريف الأسماء المجردة باستخدام هياكل أكاديمية.",
      "التعبير عن آراء دقيقة حول 'المناطق الرمادية'.",
      "استخدام لغة 'افتراضية/تأملية'.",
      "التفاعل مع أسئلة فلسفية مثل 'ما هو النجاح؟'"
    ]
  },
  content: `
### 1. Defining the Indefinable
*   **"Happiness is often perceived as... yet, it is essentially..."**
*   **"Success is not a destination, but a multifaceted process."**
*   **"The concept of justice is inherently subjective."**

### 2. Navigating Moral Dilemmas (المعضلات الأخلاقية)
*   **"It's a moral grey area."** (منطقة رمادية أخلاقية - لا يوجد فيها صح أو خطأ مطلق).
*   **"On one hand, we have the duty to... but on the other, the right to..."**
*   **"Would it be ethical to [action]?"**

### 3. Speculative Thinking
*   **"Supposing that AI surpasses human intelligence, what would happen to...?"**
*   **"Hypothetically speaking, if resources were unlimited, ..."**
*   **"One could speculate that..."** (يمكن للمرء أن يتكهن بأن...).

### 4. Advanced Connectors for Ideas
*   **Notwithstaning...** (على الرغم من...).
*   **By the same token, ...** (وبالمثل / بنفس المنطق).
*   **In light of the above, ...** (في ضوء ما سبق).
*   **Philosophically speaking, ...**
`,
  contentAr: `
### 1. الأسماء المجردة (Abstract Nouns)
كلمات مثل: **Justice** (العدالة)، **Integrity** (النزاهة)، **Dilemma** (معضلة).
في C1، نتعلم وصف هذه المفاهيم دون استخدام كلمات ملموسة.

### 2. المنطقة الرمادية (Grey Area)
حياة البالغين ليست أبيض وأسود. القدرة على وصف التعقيد هي علامة C1:
*   **"It's not that simple."**
*   **"There are multiple layers to this issue."** (هناك طبقات متعددة لهذه المسألة).

### 3. التفكير الفلسفي
*   **Nature vs. Nurture:** (الفطرة مقابل التربية) - نقاش شهير حول ما الذي يشكل شخصية الإنسان.
*   **Ethics of Technology:** أخلاقيات التكنولوجيا.

### 4. هيكل النقاش العميق
1.  **Premise:** الافتراض الأساسي.
2.  **Analysis:** التحليل اللاحق.
3.  **Synthesis:** التركيب (الوصول لنتيجة تجمع بين فكرتين).

> **نصيحة:** لا تخف من الصمت للحظة قبل الإجابة. في النقاشات العميقة، التفكير قبل الكلام علامة على الذكاء والثقة.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Complete the sentence with: Subjective, Dilemma, Integrity, Speculate.',
      instructionAr: 'أكمل الجملة بالكلمة المناسبة.',
      items: [
        { text: "Whether art is beautiful or not is entirely _______.", textAr: "ما إذا كان الفن جميلاً أم لا هو أمر _______ (ذاتي/نسبي) تماماً." },
        { text: "We face a difficult ethical _______ regarding this new law.", textAr: "نواجه _______ (معضلة) أخلاقية صعبة بخصوص هذا القانون الجديد." },
        { text: "A person of great _______ always does the right thing.", textAr: "الشخص الذي يتمتع بـ _______ (نزاهة) كبيرة يفعل الصواب دائماً." }
      ]
    }
  ],
  quiz: [
    {
      question: "What does 'A moral grey area' refer to?",
      questionAr: "إلى ماذا يشير مصطلح 'A moral grey area'؟",
      options: ["A clear right or wrong choice", "A situation where right and wrong are not clear", "A painting with grey colors", "A law made in the 1900s"],
      optionsAr: ["خيار واضح بين الصح والخطأ", "موقف لا يكون فيه الصح والخطأ واضحين", "لوحة بألوان رمادية", "قانون صُنع في القرن العشرين"],
      correctIndex: 1,
      explanation: "A grey area indicates ambiguity where ethical rules might conflict or be unclear.",
      explanationAr: "تشير المنطقة الرمادية إلى الغموض حيث قد تتعارض القواعد الأخلاقية أو تكون غير واضحة."
    }
  ]
};
