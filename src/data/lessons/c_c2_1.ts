
import { Lesson, proficiencyLevel } from "../../types";

export const idiomaticPrecisionC2: Partial<Lesson> = {
  title: "Idiomatic Precision & Nuance",
  titleAr: "الدقة الاصطلاحية والفوارق الدقيقة",
  proficiencyLevel: proficiencyLevel.C2,
  warmup: {
    mission: "Achieve near-native fluency by mastering complex idioms, double meanings, and the ability to express the subtlest differences in thought.",
    missionAr: "تحقيق طلاقة قريبة من المواطن الأصلي من خلال إتقان المصطلحات المعقدة، المعاني المزدوجة، والقدرة على التعبير عن أدق الفروق في التفكير.",
    objectives: [
      "Use idioms that describe complex social dynamics.",
      "Understand and use 'Double Entendre' and subtle wordplay.",
      "Convey precise emotions (Melancholy vs. Sadness, Exhilaration vs. Joy).",
      "Master the use of 'Subtext' in conversation."
    ],
    objectivesAr: [
      "استخدام المصطلحات التي تصف الديناميكيات الاجتماعية المعقدة.",
      "فهم واستخدام المعاني المزدوجة والتلاعب اللفظي الدقيق.",
      "نقل مشاعر دقيقة جداً.",
      "إتقان استخدام 'ما وراء النص' في المحادثة."
    ]
  },
  content: `
### 1. Beyond Synonyms: Emotional Granularity
At C2, "Sad" or "Happy" are discarded for surgical precision:
*   **Melancholy:** A pensive, long-term sadness with no clear cause. (كآبة تأملية).
*   **Wistful:** Having a feeling of vague or regretful longing.
*   **Exhilarated:** Feeling very happy, animated, or elated (Thrilling joy).
*   **Nonchalant:** Feeling or appearing casually calm and relaxed.

### 2. Complex Social Idioms
*   **"To cut a long story short"** (للاختصار).
*   **"To beat around the bush"** (المراوغة).
*   **"To leave no stone unturned"** (بذل كل الجهد الممكن).
*   **"A blessing in disguise"** (رب ضارة نافعة).
*   **"To bite the bullet"** (مواجهة الصعاب بشجاعة).

### 3. Understanding Subtext (ما وراء النص)
In advanced English, what is NOT said is often as important as what IS said.
*   "That's one way of looking at it." (Subtext: I disagree but don't want to argue).
*   "I'll bear that in mind." (Subtext: I probably won't do it, but thanks).

### 4. Precision in Descriptions
*   **"The layout of the garden was meticulously planned."** (بدقة متناهية).
*   **"His speech was punctuated with dry humour."** (يتخلله مزاح جاف).
`,
  contentAr: `
### 1. الدقة الجراحية في اللغة (C2 Precision)
الفرق بين C1 و C2 هو "الأريحية في التعقيد".
*   بدلاً من قول **"I am sure"**، قل **"I am of the firm conviction that..."**

### 2. المصطلحات العميقة
*   **"To read between the lines"** (فهم ما لم يُقل).
*   **"The elephant in the room"** (مشكلة واضحة يتجاهلها الجميع).
*   **"To play it by ear"** (الارتجال حسب الموقف).

### 3. التلاعب بالألفاظ (Wordplay)
القدرة على استخدام كلمة لها معنيان في جملة واحدة لإضفاء روح الذكاء على المحادثة.

### 4. نبرة الصوت (Register and Tone)
الـ C2 يدرك متى يستخدم لغة أكاديمية جافة ومتى يستخدم لغة الشارع بطلاقة، ويعرف الفرق النفسي بينهما.

> **نصيحة:** اقرأ الأدب الكلاسيكي والشعر الإنجليزي لتشرب هذه الروح الدقيقة في التعبير.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Complete with the precise emotion: Wistful, Nonchalant, Exhilarated.',
      instructionAr: 'أكمل بالشعور الدقيق المناسب للسياق.',
      items: [
        { text: "After winning the marathon, she felt _______.", textAr: "بعد فوزها بالماراثون، شعرت بـ _______ (فرح غامر)." },
        { text: "He acted _______ about failing the exam, but he was actually sad.", textAr: "تظاهر بـ _______ (بعدم الاهتمام) حيال رسوبه، لكنه كان حزيناً." },
        { text: "Looking at old photos made her feel _______.", textAr: "النظر للصور القديمة جعلها تشعر بـ _______ (حنين حزين)." }
      ]
    }
  ],
  quiz: [
    {
      question: "What does the idiom 'To beat around the bush' mean?",
      questionAr: "ماذا يعني المصطلح 'To beat around the bush'؟",
      options: ["To go hunting", "To avoid the main topic/point", "To clean the garden", "To hit someone"],
      optionsAr: ["الذهاب للصيد", "تجنب الموضوع/النقطة الرئيسية (المراوغة)", "تنظيف الحديقة", "ضرب شخص ما"],
      correctIndex: 1,
      explanation: "It refers to delaying talking about the most important or difficult part of a topic.",
      explanationAr: "يشير إلى التأخر في التحدث عن الجزء الأهم أو الأصعب في موضوع ما."
    }
  ]
};
