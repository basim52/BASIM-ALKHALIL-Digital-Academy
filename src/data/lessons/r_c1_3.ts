
import { Lesson, proficiencyLevel } from "../../types";

export const philosophyReadingC1: Partial<Lesson> = {
  title: "Philosophy and Philosophical Texts",
  titleAr: "الفلسفة والنصوص الفلسفية",
  proficiencyLevel: proficiencyLevel.C1,
  warmup: {
    mission: "Learn to handle highly abstract vocabulary and complex sentence syntaxes used in philosophical discourse.",
    missionAr: "تعلم كيفية التعامل مع المفردات التجريدية للغاية وبنى الجمل المعقدة المستخدمة في الخطاب الفلسفي.",
    objectives: [
      "Distinguish between 'Axiom', 'Premise', and 'Conclusion'.",
      "Follow a long, nested argument (Syntactic Complexity).",
      "Identify the 'Ontological' or 'Ethical' focus of a text."
    ],
    objectivesAr: [
      "التمييز بين 'البديهية' (Axiom)، و 'المقدمة' (Premise)، و 'النتيجة'.",
      "تتبع حجة طويلة ومتداخلة (التعقيد التركيبي).",
      "تحديد التركيز 'الوجودي' أو 'الأخلاقي' للنص."
    ]
  },
  content: `
### 1. The Structure of an Argument (هيكل الحجة)
Philosophical texts are not stories; they are logical constructions.
*   **Premise (مقدمة):** A statement that provides support for the conclusion.
*   **Axiom (بديهية):** A statement accepted as true without proof.
*   **Inference (استدلال):** The step of reasoning from one idea to another.
*   **Conclusion (خاتمة):** The final point the author wants to prove.

### 2. Abstract Terminology (المصطلحات التجريدية)
C1 readers must master "Isms":
*   **Idealism:** Reality is mentally constructed.
*   **Materialism:** Only physical matter exists.
*   **Existentialism:** Individual agency and existence come first.
*   **Empiricism:** Knowledge comes from sensory experience.

### 3. Handling Syntactic Complexity (التعامل مع التعقيد التركيبي)
Philosophers use long sentences with multiple "subordinate clauses".
*   *Tip:* Find the main Verb and Subject first. Everything between commas is usually extra "elaboration".

| Term | Philosophical Focus | Arabic |
| :--- | :--- | :--- |
| **Ontology** | The nature of being/existence. | علم الوجود |
| **Epistemology** | The nature of knowledge. | علم المعرفة |
| **Ethics** | Morality and right/wrong. | الأخلاق |
| **Logic** | The structure of reasoning. | المنطق |
`,
  contentAr: `
### 1. هيكل الحجة الفلسفية (Philosophical Argument)
النصوص الفلسفية ليست قصصاً، بل هي بناءات منطقية.
*   **الـ Premise:** هي المقدمة التي تبني عليها النتيجة.
*   **الـ Axiom:** هي البديهية التي نصدقها دون الحاجة لبرهان.

### 2. المصطلحات التجريدية (Concepts)
يجب على قارئ المستوى C1 إتقان المذاهب الأساسية:
*   **Empiricism (التجريبية):** المعرفة تأتي من التجربة والحواس.
*   **Idealism (المثالية):** العقل هو الذي يبني الحقيقة.

### 3. مهارات القراءة العميقة
يستخدم الفلاسفة جملاً طويلة جداً.
*   **نصيحة:** ابحث عن الفعل والفاعل الأساسي أولاً، ثم ابدأ بتفكيك الجمل الفرعية بين الفواصل.

> **نصيحة للقراءة:** الفلسفة لا تقرأ، بل تُفكك. اسأل نفسك: ما هي "المقدمة" التي يريدني الكاتب أن أقبلها؟
`,
  exercises: [
    {
      type: 'match',
      instruction: 'Match the philosophy branch to its domain.',
      instructionAr: 'صل فرع الفلسفة بمجاله.',
      items: [
        { text: "Ethics", answer: "Right and Wrong" },
        { text: "Ontology", answer: "Nature of Existence" },
        { text: "Epistemology", answer: "Nature of Knowledge" },
        { text: "Logic", answer: "Structure of Reasoning" }
      ]
    }
  ],
  quiz: [
    {
      question: "Which term refers to a statement accepted as true without proof?",
      questionAr: "أي مصطلح يشير إلى عبارة مقبولة كحقيقة دون برهان؟",
      options: ["Conclusion", "Axiom", "Theory", "Hypothesis"],
      optionsAr: ["خاتمة", "بديهية (Axiom)", "نظرية", "فرضية"],
      correctIndex: 1,
      explanation: "An axiom is a self-evident truth that requires no proof in formal logic.",
      explanationAr: "البديهية هي حقيقة بديهية لا تتطلب برهاناً في المنطق الصوري."
    }
  ]
};
