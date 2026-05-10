
import { Lesson, proficiencyLevel } from "../../types";

export const nuancedDiscussionsC1: Partial<Lesson> = {
  title: "Nuanced Discussions: Subtle Meaning",
  titleAr: "المناقشات الدقيقة: معاني خفية",
  proficiencyLevel: proficiencyLevel.C1,
  warmup: {
    mission: "Learn how to express complex ideas with precision, using subtle vocabulary and modifiers to show 'shades of meaning'.",
    missionAr: "تعلم كيفية التعبير عن أفكار معقدة بدقة، باستخدام مفردات دقيقة ومعدلات لإظهار 'ظلال المعنى'.",
    objectives: [
      "Use modifiers to soften or strengthen opinions (Somewhat, Utterly, Virtually).",
      "Distinguish between similar words (Famous vs. Notorious).",
      "Handle abstract and academic topics with ease.",
      "Interpret and use metaphors in high-level conversation."
    ],
    objectivesAr: [
      "استخدام المعدلات لتلطيف أو تقوية الآراء.",
      "التمييز بين الكلمات المتقاربة (مشهور vs سيء السمعة).",
      "التعامل مع المواضيع المجردة والأكاديمية بسهولة.",
      "تفسير واستخدام الاستعارات في المحادثات رفيعة المستوى."
    ]
  },
  content: `
### 1. The Art of "Shades of Meaning"
At C1, "Good" or "Bad" aren't enough. Precision is key.
*   Instead of "Big", use **Immense, Vast, Astronomical.**
*   Instead of "Angry", use **Furious, Indignant, Exasperated.**
*   **Indignant** means angry because of an injustice. (دقة في المشاعر).

### 2. Powerful Modifiers
*   **Utterly / Absolutely:** (Strongly positive/negative). *The talk was utterly fascinating.*
*   **Virtually / Practically:** (Almost). *The plan is virtually impossible.*
*   **Somewhat / Rather:** (Slightly). *The results were somewhat unexpected.*

### 3. Nuance in Synonyms
*   **Famous:** Well-known for good things.
*   **Notorious:** Well-known for bad things.
*   **Economical:** Careful with money (Wise).
*   **Stingy:** Doesn't like to spend money (Negative).

### 4. Advanced Idioms for Discussion
*   **"To play devil's advocate"** (أن تلعب دور المعارض لتنشيط النقاش).
*   **"To be on the same wavelength"** (أن نكون على نفس الموجة/التفكير).
*   **"To hit the nail on the head"** (أن تصيب كبد الحقيقة / تصف المشكلة بدقة).
`,
  contentAr: `
### 1. ما هو الـ Nuance؟
هو "الفرق الدقيق". القدرة على التعبير عن "درجة" الفكرة.
*   **Indifferent:** ليس "لا يحب"، بل "لا يهتم" (محايد).
*   **Ambivalent:** لديك مشاعر مختلطة (تحب وتكره في نفس الوقت).

### 2. استخدام الملطفات (Softeners)
لتبدو مفكراً وباحثاً، لا تطلق أحكاماً قاطعة:
*   **"One might argue that..."** (قد يجادل المرء بأن...).
*   **"It is arguably the best..."** (يمكن القول إنه الأفضل...).

### 3. التلاعب بالكلمات المتقاربة
*   **Inquisitive:** فضولي (إيجابي - محب للاستطلاع).
*   **Nosy:** فضولي (سلبي - يتدخل فيما لا يعنيه).

### 4. الاستعارات (Metaphors)
*   **"The tip of the iceberg"** (رأس جبل الجليد - جزء صغير من مشكلة أكبر).
*   **"A slippery slope"** (منحدر زلق - فعل سيؤدي لنتائج كارثية متتابعة).

### 5. الهدف في C1
الهدف هو أن يرى المستمع أنك لا تستخدم الإنجليزية فقط للتواصل، بل **للتفكير العميق**.

> **نصيحة:** اقرأ نصوصاً فلسفية أو تقارير اقتصادية لتلاحظ كيف يتم استخدام الصفات بدقة متناهية.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Choose the more precise word: Indignant, Notorious, Indifferent.',
      instructionAr: 'اختر الكلمة الأكثر دقة حسب المعنى.',
      items: [
        { text: "The criminal is _______ for his bank robberies.", textAr: "المجرم هو _______ لسرقاته للبنوك (شهرة سلبية)." },
        { text: "I don't care about politics; I am completely _______.", textAr: "لا أهتم بالسياسة؛ أنا _______ تماماً." },
        { text: "He was _______ when he was accused of cheating.", textAr: "لقد كان _______ (غاضب لظلم) عندما اتُهم بالغش." }
      ]
    }
  ],
  quiz: [
    {
      question: "What does 'To play devil's advocate' mean in a discussion?",
      questionAr: "ماذا يعني 'To play devil's advocate' في نقاش؟",
      options: ["To support the devil", "To argue against an idea just to test it", "To be a lawyer", "To fight with everyone"],
      optionsAr: ["دعم الشيطان", "المجادلة ضد فكرة فقط لاختبار قوتها", "أن تكون محامياً", "العراك مع الجميع"],
      correctIndex: 1,
      explanation: "A person playing devil's advocate takes a counter-position to ensure all angles of a problem are explored.",
      explanationAr: "الشخص الذي يلعب دور devil's advocate يتبنى موقفاً مضاداً لضمان استكشاف جميع جوانب المشكلة."
    }
  ]
};
