
import { Lesson, proficiencyLevel } from "../../types";

export const problemSolvingC1: Partial<Lesson> = {
  title: "Complex Problem Solving & Strategy",
  titleAr: "حل المشكلات المعقدة والاستراتيجية",
  proficiencyLevel: proficiencyLevel.C1,
  warmup: {
    mission: "Learn how to analyze multi-faceted problems, evaluate different solutions objectively, and reach a strategic consensus in a group.",
    missionAr: "تعلم كيفية تحليل المشكلات متعددة الأوجه، وتقييم الحلول المختلفة بموضوعية، والوصول إلى إجماع استراتيجي في مجموعة.",
    objectives: [
      "Analyze 'Root Causes' using sophisticated language.",
      "Evaluate potential outcomes with hypothetical structures.",
      "Navigate 'Trade-offs' and 'Compromises'.",
      "Lead a group towards a final decision."
    ],
    objectivesAr: [
      "تحليل 'الأسباب الجذرية' باستخدام لغة متطورة.",
      "تقييم النتائج المحتملة باستخدام الهياكل الافتراضية.",
      "التعامل مع 'المقايضات' و 'التسويات'.",
      "قيادة المجموعة نحو قرار نهائي."
    ]
  },
  content: `
### 1. Identifying the Root Cause (السبب الجذري)
Don't just look at the symptoms.
*   **"The crux of the matter is..."** (صلب الموضوع هو...).
*   **"This issue is deep-rooted in..."** (هذه المشكلة متجذرة في...).
*   **"We need to look at the underlying factors."** (نحتاج للنظر في العوامل الكامنة).

### 2. Evaluating Solutions (التقييم)
*   **"What are the long-term implications?"** (ما هي التداعيات طويلة المدى؟).
*   **"We need to weigh the pros and cons."**
*   **"There's a significant risk of... should we choose this path."**
*   **"Is this solution scalable?"** (هل هذا الحل قابل للتوسع؟).

### 3. Understanding Trade-offs (المقايضات)
Sometimes you lose something to gain something.
*   **"It's a trade-off between quality and cost."**
*   **"We might have to sacrifice speed for accuracy."**

### 4. Reaching a Consensus (الإجماع)
*   **"Are we all on the same page?"**
*   **"Does anyone have any reservations?"** (هل لدى أحد أي تحفظات؟).
*   **"Let's settle on a middle ground."**
*   **"The general consensus seems to be that..."**
`,
  contentAr: `
### 1. تحليل المشكلة بعمق
في مستوى C1، لا نقول "The problem is...". بل نستخدم مصطلحات مثل:
*   **The root cause:** السبب الجذري.
*   **A major hurdle:** عقبة رئيسية.
*   **A bottleneck:** عنق زجاجة (نقطة تعطل العمل).

### 2. لغة التقييم
*   **Viable solution:** حل قابل للتطبيق.
*   **Feasible:** ممكن / عملي.
*   **Cost-effective:** موفر للتكلفة / فعال اقتصادياً.

### 3. سيناريوهات "ماذا لو؟" (Hypotheticals)
استخدم الحالة الشرطية الثانية والثالثة بكثافة:
*   **"If we were to implement this, the impact would be..."**

### 4. إدارة الجدل الاستراتيجي
*   **"That's a valid concern."** (هذا قلق مشروع).
*   **"Let's look at it from a different angle."** (لننظر للأمر من زاوية مختلفة).

> **نصيحة:** في حل المشكلات، المصطلحات هي أدواتك. استخدام كلمة **"Synergy"** (التعاون التآزري) أو **"Holistic approach"** (نهج شمولي) يرفع من مستوى طرحك.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Complete with: Crux, Bottleneck, Feasible, Implications.',
      instructionAr: 'أكمل بالكلمة المناسبة.',
      items: [
        { text: "The _______ of the problem is a lack of communication.", textAr: "_______ (صلب) المشكلة هو نقص التواصل." },
        { text: "Is this plan _______ within our current budget?", textAr: "هل هذه الخطة _______ (ممكنة) ضمن ميزانيتنا الحالية؟" },
        { text: "We need to consider the legal _______ of this move.", textAr: "نحتاج للنظر في _______ (التداعيات) القانونية لهذه الخطوة." }
      ]
    }
  ],
  quiz: [
    {
      question: "What is a 'Trade-off'?",
      questionAr: "ما هي الـ 'Trade-off' (المقايضة)؟",
      options: ["A full agreement", "Giving up one benefit to gain another", "Winning a game", "Buying something cheap"],
      optionsAr: ["اتفاق كامل", "التخلي عن ميزة للحصول على أخرى", "الفوز بلعبة", "شراء شيء رخيص"],
      correctIndex: 1,
      explanation: "A trade-off involves balance—you accept a disadvantage in one area to gain an advantage in another.",
      explanationAr: "تتضمن المقايضة التوازن؛ حيث تقبل عيباً في جانب ما للحصول على ميزة في جانب آخر."
    }
  ]
};
