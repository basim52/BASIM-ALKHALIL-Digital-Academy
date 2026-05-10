
import { Lesson, proficiencyLevel } from "../../types";

export const stylisticInversionC2: Partial<Lesson> = {
  title: "Stylistic Inversion & Fronting",
  titleAr: "القلب الأسلوبي والتقديم (Stylistic Inversion & Fronting)",
  proficiencyLevel: proficiencyLevel.C2,
  warmup: {
    mission: "Learn how to manipulate word order for dramatic effect, lyrical beauty, and epic emphasis in literature and advanced prose.",
    missionAr: "تعلم كيفية التلاعب بترتيب الكلمات لإحداث تأثير درامي، وجمال شعري، وتأكيد ملحمي في الأدب والنثر المتقدم.",
    objectives: [
      "Master Subject-Verb Inversion after place expressions.",
      "Understand 'Fronting' for focus and cohesion.",
      "Use 'Negative Inversion' with complex correlatives.",
      "Analyze the use of fronting in high-level academic and literary texts."
    ],
    objectivesAr: [
      "إتقان قلب الفعل والفاعل بعد تعبيرات المكان.",
      "فهم 'التقديم' (Fronting) للتركيز والربط.",
      "استخدام 'القلب النافي' مع الروابط المعقدة.",
      "تحليل استخدام التقديم في النصوص الأكاديمية والأدبية رفيعة المستوى."
    ]
  },
  content: `
### 1. Subject-Verb Inversion (After Place)
In descriptive writing, we often put the place first and flip the verb and subject.
*   *Standard:* A small cottage stood at the foot of the mountain.
*   *Inverted:* **At the foot of the mountain stood a small cottage.** (Dramatic / Poetic).

### 2. Fronting (Focus & Contrast)
Fronting means moving a part of the sentence to the very beginning that usually comes later. It highlights that information.
*   *Standard:* I can't stand people like him.
*   *Fronted:* **People like him I can't stand.**
*   *Contrast:* **Wise he was not, but powerful he certainly was.**

### 3. Fronting with Participles
*   *Sentence:* **Scattered across the floor were dozens of old photographs.** (Focus on the state).
*   *Sentence:* **Standing in the doorway was a mysterious figure.**

### 4. Advanced Negative Inversion
At C2, we use inversion with more obscure patterns:
*   **Only when** she left **did I understand** the truth.
*   **On no account** must you deviate from the plan.
*   **Little did he know** that everything was about to change.

### 5. Why use this?
These structures allow for a varied, sophisticated rhythm in writing. They help guide the reader's eye to the most important "paintings" in your verbal landscape.
`,
  contentAr: `
### 1. قلب الفاعل والفعل (بعد ظرف المكان)
في الكتابة الوصفية والأدبية، نضع المكان في البداية ونقلب الفاعل والفعل لإضفاء طابع سينمائي.
*   عادي: **The statue stood in the middle of the square.**
*   أسلوب C2: **In the middle of the square stood the statue.** (في منتصف الساحة، وقف هذا التمثال).

### 2. التقديم (Fronting)
تحريك جزء من نهاية الجملة إلى بدايتها للتأكيد أو المقارنة.
*   عادي: **I like coffee, but I hate tea.**
*   متقدم: **Coffee I like, but tea I absolutely loathe.**

### 3. التقديم باستخدام اسم الفاعل/المفعول
*   **Hidden in the trees was a small path.** (مخفياً بين الأشجار، كان هناك طريق صغير).

### 4. القلب النافي المتقدم (Negative Inversion)
تستخدم مع عبارات معقدة للتأكيد الدرامي:
*   **Little did he know...** (لم يكن يعلم وقتها... - تستخدم كثيراً في القصص للتلميح لحدث قادم).
*   **Only after much deliberation did we reach a decision.**

### 5. الغرض الأسمى
الهدف ليس التعقيد، بل **الإيقاع اللغوي (Rhythm)**. هذه الصيغ تسمح لك بالتحكم في سرعة القراءة والتركيز البصري للقارئ.

> **قاعدة ذهبية:** استخدم هذه الصيغ باعتدال؛ فكثرة استخدامها تجعل النص يبدو مصطنعاً، لكن استخدامها في الوقت المناسب يجعلك كاتباً عبقرياً.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Rewrite the sentence starting with the italicized words (Dramatic Inversion).',
      instructionAr: 'أعد كتابة الجملة مبتدئاً بالكلمات المائلة (قلب درامي).',
      items: [
        { text: "A large castle lay *beyond the hills*. -> Beyond the hills _______.", textAr: "خلف التلال، كانت تقبع قلعة كبيرة. -> خلف التلال _______." },
        { text: "He didn't know *at all* about the plan. -> Little _______.", textAr: "لم يعلم أبداً عن الخطة. -> قليلاً ما _______." },
        { text: "The rain came *down*. -> Down _______.", textAr: "نزل المطر. -> لأسفل _______ (درامي حركي)." }
      ]
    }
  ],
  quiz: [
    {
      question: "Which sentence uses descriptive inversion correctly?",
      questionAr: "أي جملة تستخدم 'القلب الوصفي' بشكل صحيح؟",
      options: ["In the jar were two coins.", "In the jar was two coins.", "Into the jar two coins were.", "Two coins was in the jar."],
      optionsAr: ["في الجرة كانت عملتان (were).", "في الجرة كان عملتان (was).", "للجرة عملتان كانت.", "عملتان كان في الجرة."],
      correctIndex: 0,
      explanation: "Verb 'were' must agree with the subject 'two coins' even though the subject comes after the verb.",
      explanationAr: "يجب أن يوافق الفعل (were) الفاعل (two coins) حتى لو جاء الفاعل بعد الفعل."
    }
  ]
};
