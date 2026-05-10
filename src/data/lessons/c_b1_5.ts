
import { Lesson, proficiencyLevel } from "../../types";

export const dreamsAmbitionsB1: Partial<Lesson> = {
  title: "Dreams & Ambitions: Future Plans",
  titleAr: "الأحلام والطموحات: خطط المستقبل",
  proficiencyLevel: proficiencyLevel.B1,
  warmup: {
    mission: "Learn how to talk about your long-term goals, career ambitions, and ideal future life.",
    missionAr: "تعلم كيفية التحدث عن أهدافك طويلة المدى، وطموحاتك المهنية، وحياتك المستقبلية المثالية.",
    objectives: [
      "Use 'Hope', 'Expect', and 'Plan to'.",
      "Express determination with 'I am determined to...'",
      "Talk about the 'Ideal' vs. 'Reality'.",
      "Explain your motivation for learning English."
    ],
    objectivesAr: [
      "استخدام 'Hope' و 'Expect' و 'Plan to'.",
      "التعبير عن التصميم بـ 'I am determined to...'",
      "التحدث عن 'المثالي' مقابل 'الواقع'.",
      "شرح دافعك لتعلم اللغة الإنجليزية."
    ]
  },
  content: `
### 1. Expressions of Future Hope
*   **I hope to...** (آمل أن...).
*   **I'm planning to...** (أخطط لـ...).
*   **I aim to...** (أهدف لـ...).
*   **I dream of... (+ ing)** (أحلم بـ...).
*   **I would love to...**

### 2. Career Ambitions (طموحات مهنية)
*   "My ultimate goal is to **start my own business**."
*   "I want to **get promoted** to a senior position."
*   "I hope to **work abroad** one day."
*   "I'm looking for a **challenging role**." (دور مليء بالتحدي).

### 3. Personal Dreams
*   "I want to **travel the world**."
*   "I hope to **buy a house** for my parents."
*   "I dream of **becoming fluent** in English."

### 4. Overcoming Obstacles (تخطي العقبات)
*   **"It won't be easy, but I'm determined."** (لن يكون سهلاً، لكني مصمم).
*   **"I am working hard to reach my goals."**
*   **"I won't give up."** (لن أستسلم).
`,
  contentAr: `
### 1. كيف تعبر عن خططك؟
*   **I intend to...** (أنوي أن... - رسمية قليلاً).
*   **I'm considering... (+ ing)** (أفكر في... - لم أقرر بعد).

### 2. مفردات الطموح B1
*   **Ambition:** طموح.
*   **Inspiration:** إلهام.
*   **Breakthrough:** طفرة / تقدم كبير.
*   **Fulfill a dream:** يحقق حلماً.

### 3. لماذا تتعلم الإنجليزية؟ (Conversation Topic)
*   **"To improve my career prospects."** (لتحسين فرصي المهنية).
*   **"To communicate with more people."**
*   **"To access better resources."**

### 4. الرد على طموحات الآخرين
*   **"I'm sure you will achieve it."** (أنا متأكد أنك ستحقق ذلك).
*   **"That sounds like a great plan!"**
*   **"Good luck with that!"**

> **نصيحة:** عند التحدث عن المستقبل البعيد، استخدم **I would like to** و **I hope to** بدلاً من "I will" لتظهر أنها أمنيات وليست حقائق مؤكدة الآن.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Complete the sentences with: determined, aim, prospects, dream.',
      instructionAr: 'أكمل الجمل بالكلمة المناسبة.',
      items: [
        { text: "It is my _______ to visit Japan one day.", textAr: "إنه _______ أن أزور اليابان يوماً ما." },
        { text: "I _______ to finish my degree by next year.", textAr: "أنا _______ إلى إنهاء دراستي بحلول العام القادم." },
        { text: "I am _______ to learn English perfectly.", textAr: "أنا _______ على تعلم الإنجليزية بشكل مثالي." }
      ]
    }
  ],
  quiz: [
    {
      question: "Which phrase means you have NOT DECIDED yet but are thinking about it?",
      questionAr: "أي عبارة تعني أنك لم تقرر بعد ولكنك تفكر في الأمر؟",
      options: ["I am determined to...", "I have decided to...", "I'm considering...", "I will definitely..."],
      optionsAr: ["أنا مصمم على...", "لقد قررت أن...", "أنا أفكر في... (I'm considering)", "سأفعل بالتأكيد..."],
      correctIndex: 2,
      explanation: "'Considering' shows that the idea is being evaluated but is not a solid plan yet.",
      explanationAr: "كلمة 'Considering' تظهر أن الفكرة قيد التقييم وليست خطة ثابتة بعد."
    }
  ]
};
