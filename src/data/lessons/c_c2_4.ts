
import { Lesson, proficiencyLevel } from "../../types";

export const philosophicalInquiryC2: Partial<Lesson> = {
  title: "Philosophical Inquiry: The Human Condition",
  titleAr: "الاستقصاء الفلسفي: الحالة الإنسانية",
  proficiencyLevel: proficiencyLevel.C2,
  warmup: {
    mission: "Engage in deep, conceptual conversations about existence, morality, consciousness, and the future of humanity using high-level academic and philosophical vocabulary.",
    missionAr: "المشاركة في محادثات مفهومية عميقة حول الوجود، الأخلاق، الوعي، ومستقبل البشرية باستخدام مفردات أكاديمية وفلسفية رفيعة المستوى.",
    objectives: [
      "Discuss 'Existential' questions with linguistic fluidity.",
      "Analyze 'Paradoxes' and 'Epistemological' concepts.",
      "Use 'Speculative Subjunctive' for theoretical futures.",
      "Synthesize different philosophical viewpoints into a coherent argument."
    ],
    objectivesAr: [
      "مناقشة الأسئلة 'الوجودية' بطلاقة لغوية.",
      "تحليل 'المفارقات' والمفاهيم 'المعرفية'.",
      "استخدام صيغة الاحتمال التأملي للمستقبل النظري.",
      "دمج وجهات النظر الفلسفية المختلفة في حجة متماسكة."
    ]
  },
  content: `
### 1. The Vocabulary of Thought
At C2, you discuss ideas using precise terminology:
*   **Existentialism:** Exploring the meaning of human existence.
*   **Ethics / Morality:** The study of right and wrong.
*   **Consciousness:** The state of being aware of one's surroundings and self.
*   **Altruism:** Disinterested and selfless concern for the well-being of others. (الإيثار).

### 2. Exploring Paradoxes (المفارقات)
A paradox is a statement that seems contradictory but may be true.
*   "The only constant is change." (المستمر الوحيد هو التغيير).
*   "To be free, one must follow the law."
*   **Discussion phrase:** "How do we reconcile these two contradictory ideas?"

### 3. Epistemological Inquiry (البحث المعرفي)
How do we know what we know?
*   **Subjective vs. Objective truth.**
*   **"Is our perception of reality flawed?"**
*   **"To what extent does language shape our thought process?"** (إلى أي مدى تشكل اللغة تفكيرنا؟).

### 4. Advanced Logical Connectors
*   **"Inherent in this argument is the assumption that..."** (متأصل في هذه الحجة...).
*   **"This begs the question: ..."** (هذا يطرح سؤالاً...).
*   **"Juxtaposing these two concepts reveals..."** (وضع هذين المفهومين جنباً إلى جنب يكشف...).
`,
  contentAr: `
### 1. لماذا الفلسفة في C2؟
لأنها تتطلب القدرة على التعبير عن "المجرد" بأقصى درجات الدقة.

### 2. مصطلحات فلسفية متقدمة
*   **Inherent:** متأصل / ذاتي.
*   **Transient:** عابر / غير دائم.
*   **Fundamentalism:** الأصولية.
*   **Pragmatism:** البراغماتية (الواقعية النفعية).

### 3. نقاش الحالة الإنسانية (The Human Condition)
*   **"Is happiness the ultimate goal of life?"** (هل السعادة هي الهدف الأسمى؟).
*   **"Does technology alienate us or connect us?"** (هل التكنولوجيا تغربنا أم تقربنا؟).

### 4. استخدام الـ Subjunctive (صيغ التمني والافتراض)
بدقة في التركيب:
*   **"Were humanity to vanish, nature would thrive."** (لو فنيت البشرية، لازدهرت الطبيعة).

### 5. أدوات الربط المنطقي
*   **Hence / Thus:** وبالتالي.
*   **Per se:** بحد ذاته (The idea, per se, is good...).

> **نصيحة:** في النقاشات الفلسفية، تجنب الإجابات السطحية. استخدم جمل مثل: **"That is a multifaceted issue with no easy answers."**
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Complete with: Paradox, Altruism, Subjective, Inherent.',
      instructionAr: 'أكمل بالمصطلح الفلسفي المناسب.',
      items: [
        { text: "Beauty is _______; what I find beautiful, you might not.", textAr: "الجمال _______ (نسبي/ذاتي)؛ ما أراه جميلاً قد لا تراه أنت." },
        { text: "Helping others without expecting anything is called _______.", textAr: "مساعدة الآخرين دون توقع شيء تسمى _______ (الإيثار)." },
        { text: "It is a _______ that the harder I work, the luckier I get.", textAr: "إنها _______ (مفارقة) أنني كلما عملت بجد، زاد حظي." }
      ]
    }
  ],
  quiz: [
    {
      question: "What does 'Juxtaposing' mean in a discussion?",
      questionAr: "ماذا يعني 'Juxtaposing' في نقاش؟",
      options: ["Ignoring an idea", "Placing two things together for contrast", "Agreeing with someone", "Fighting about a topic"],
      optionsAr: ["تجاهل فكرة", "وضع شيئين معاً لإظهار التباين/المقارنة", "الموافقة مع شخص ما", "العراك حول موضوع ما"],
      correctIndex: 1,
      explanation: "Juxtaposition is a powerful rhetorical tool to highlight differences or similarities between concepts.",
      explanationAr: "مجاورة الأفكار (Juxtaposition) هي أداة بلاغية قوية لإبراز الاختلافات أو التشابهات بين المفاهيم."
    }
  ]
};
