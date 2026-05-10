
import { Lesson, proficiencyLevel } from "../../types";

export const persuasionTechniquesB2: Partial<Lesson> = {
  title: "Persuasion Techniques",
  titleAr: "تقنيات الإقناع",
  proficiencyLevel: proficiencyLevel.B2,
  warmup: {
    mission: "Deconstruct how advertisers, politicians, and writers use rhetorical strategies to influence your thinking.",
    missionAr: "تفكيك كيفية استخدام المعلنين والسياسيين والكتاب للاستراتيجيات البلاغية للتأثير على تفكيرك.",
    objectives: [
      "Define Ethos, Pathos, and Logos.",
      "Identify the 'Appeal to Authority' in a text.",
      "Detect logical fallacies like 'Ad Hominem' or 'False Dilemma'."
    ],
    objectivesAr: [
      "تعريف الإيثوس (المصداقية)، الباثوس (العاطفة)، واللوغوس (المنطق).",
      "تحديد 'الاستناد إلى السلطة' في النص.",
      "اكتشاف المغالطات المنطقية مثل 'الشخصنة' أو 'المأزق المفتعل'."
    ]
  },
  content: `
### 1. The Three Pillars of Persuasion (أركان الإقناع الثلاثة)
A B2 reader knows the difference between a logical argument and an emotional one.

*   **Logos (Logic):** Uses facts, statistics, and reasoning. 
    *   *Example:* "80% of users saw results in 3 days."
*   **Pathos (Emotion):** Appeals to feelings (fear, happiness, anger). 
    *   *Example:* "Don't let your family suffer in silence."
*   **Ethos (Credibility):** Uses the status of the speaker. 
    *   *Example:* "As a doctor with 20 years of experience..."

### 2. Identifying Bias (تحديد التحيز)
Bias is when an author unfairly shows favor for one thing over another.
*   **Omission Bias:** Leaving out facts that don't support their side.
*   **Placement Bias:** Putting the favorable news on the front page and hiding the bad news.

### 3. Common Rhetorical Devices (الأساليب البلاغية)
*   **Rhetorical Questions:** Questions that don't need an answer. (e.g., "Do you want to be successful?")
*   **Rule of Three:** Using three words or phrases to be catchy. (e.g., "Fast, reliable, affordable.")
*   **Hyperbole:** Extreme exaggeration. (e.g., "The greatest invention in human history.")
`,
  contentAr: `
### 1. أركان الإقناع الثلاثة (The Three Pillars)
القارئ في مستوى B2 يميز بين الحجة المنطقية والعاطفية.

*   **Logos (المنطق):** يعتمد على الحقائق والإحصاءات.
*   **Pathos (العاطفة):** يخاطب المشاعر (خوف، سعادة، حزن).
*   **Ethos (المصداقية):** يعتمد على سمعة أو منصب المتحدث.

### 2. اكتشاف التحيز (Spotting Bias)
التحيز هو تفضيل طرف دون وجه حق.
*   **تحيز الحذف:** تجاهل حقائق لا تخدم وجهة نظر الكاتب.
*   **لغة المبالغة (Hyperbole):** تضخيم النتائج لجذب الانتباه.

### 3. أدوات بلاغية شائعة (Devices)
*   **الأسئلة البلاغية:** أسئلة لا تنتظر إجابة، بل تهدف للتأثير. (هل تريد مستقبلاً أفضل؟)
*   **قاعدة الثلاثة:** استخدام 3 كلمات (سهل، سريع، آمن).

> **قاعدة ذهبية:** إذا شعرت بمشاعر قوية (غضب أو سعادة) أثناء القراءة، فالكاتب غالباً يستخدم **Pathos**.
`,
  exercises: [
    {
      type: 'multiple',
      instruction: 'Identify the pillar.',
      instructionAr: 'حدد ركن الإقناع المستخدم.',
      items: [
        { 
          text: "'Statistics show that 9 out of 10 people prefer our brand.'", 
          textAr: "'تظهر الإحصائيات أن 9 من كل 10 أشخاص يفضلون علامتنا التجارية.'",
          options: ["Ethos", "Pathos", "Logos"],
          optionsAr: ["المصداقية", "العاطفة", "المنطق (Logos)"],
          answer: "Logos"
        }
      ]
    }
  ],
  quiz: [
    {
      question: "Which of these is 'Ethos'?",
      questionAr: "أي من هذه الخيارات يمثل 'Ethos' (المصداقية)؟",
      options: ["Buy now or regret it later!", "Studies show 5% growth.", "Trust me, I am a certified expert.", "This car is the fastest in the world."],
      optionsAr: ["اشترِ الآن أو ستندم لاحقاً!", "تظهر الدراسات نمواً بنسبة 5%.", "ثق بي، أنا خبير معتمد.", "هذه السيارة هي الأسرع بالعالم."],
      correctIndex: 2,
      explanation: "Ethos relies on the authority or credibility of the person speaking.",
      explanationAr: "يعتمد الـ Ethos على سلطة أو مصداقية الشخص المتحدث."
    }
  ]
};
