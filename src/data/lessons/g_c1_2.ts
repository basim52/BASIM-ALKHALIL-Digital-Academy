
import { Lesson, proficiencyLevel } from "../../types";

export const cleftSentencesC1: Partial<Lesson> = {
  title: "Cleft Sentences: Focus and Emphasis",
  titleAr: "الجمل المشقوقة: التركيز والتأكيد (Cleft Sentences)",
  proficiencyLevel: proficiencyLevel.C1,
  warmup: {
    mission: "Learn how to 'split' a sentence to highlight specific parts of the information you want to emphasize.",
    missionAr: "تعلم كيفية 'شق' الجملة لتسليط الضوء على أجزاء محددة من المعلومات التي تريد التأكيد عليها.",
    objectives: [
      "Identify 'It-clefts' vs. 'What-clefts'.",
      "Use cleft sentences to correct misinformation.",
      "Emphasize the subject, object, or action.",
      "Transform simple sentences into sophisticated cleft structures."
    ],
    objectivesAr: [
      "تمييز جمل 'It' المشقوقة مقابل جمل 'What' المشقوقة.",
      "استخدام الجمل المشقوقة لتصحيح المعلومات الخاطئة.",
      "التأكيد على الفاعل، المفعول به، أو الفعل.",
      "تحويل الجمل البسيطة إلى هياكل مشقوقة متطورة."
    ]
  },
  content: `
### 1. What is a Cleft Sentence? (ما هي الجملة المشقوقة؟)
The word "cleft" means divided. We divide a sentence into two parts to give focus to a specific piece of information.
*   *Simple:* John broke the window.
*   *Cleft (Focus on John):* **It was John who** broke the window.

### 2. It-Clefts
These use the structure: **It + be (is/was) + [Focus] + relative clause.**
*   *Standard:* I hate the rain.
*   *Cleft:* **It is the rain** that I hate. 

### 3. What-Clefts (Pseudo-clefts)
These use the structure: **What clause + be + [Focus].**
*   *Standard:* I need a holiday.
*   *Cleft:* **What I need is** a holiday.

### 4. Advanced Structures
*   **The thing that...** (*The thing that worries me is the lack of time.*)
*   **The reason why...** (*The reason why we left was the noise.*)
*   **All + clause...** (*All I want for Christmas is you.*)

### 5. Why use them?
Cleft sentences are essential for academic writing and persuasive speaking. They help the listener understand exactly what is new or important in your sentence.
`,
  contentAr: `
### 1. ما هي الجملة المشقوقة (Cleft Sentence)؟
كلمة Cleft تعني "مشقوق" أو "مقسوم". نحن نقسم الجملة لنسلط الضوء على جزء معين منها.
*   جملة عادية: **Ahmed called me.**
*   جملة مشقوقة (للتركيز على أحمد): **It was Ahmed who called me.** (أحمد هو من اتصل بي).

### 2. جمل الـ It
الهيكل: **It + be + [الشيء المراد التأكيد عليه] + جملة وصل.**
*   **It was yesterday that I saw her.** (بالأمس هو اليوم الذي رأيتها فيه - التأكيد على الزمان).

### 3. جمل الـ What (أو شبه المشقوقة)
الهيكل: **What + [باقي الجملة] + is/was + [الشيء المراد التأكيد عليه].**
*   **What you need is a good rest.** (ما تحتاجه هو قسط جيد من الراحة).

### 4. صيغ إضافية
*   **The reason why...** (السبب وراء... هو...).
*   **All I did was...** (كل ما فعلته هو... - تستخدم لحصر الفعل).

### 5. الاستخدام
تُستخدم بقوة في الجدال، المناقشات الأكاديمية، والخطابة لتوضيح النقاط الجوهرية.

> **قاعدة ذهبية:** تخيل الجملة المشقوقة كعدسة مكبرة تضعها فوق أهم كلمة في جملتك.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Rewrite using a cleft sentence starting with the words provided.',
      instructionAr: 'أعد الكتابة باستخدام جملة مشقوقة مستخدماً الكلمات المعطاة.',
      items: [
        { text: "I only want to help. -> All _______ (What/All).", textAr: "أريد المساعدة فقط. -> كل _______." },
        { text: "Sara found the solution. -> It _______ (It).", textAr: "سارة وجدت الحل. -> إنها _______." },
        { text: "He needs a new car. -> What _______ (What).", textAr: "هو يحتاج سيارة جديدة. -> ما _______." }
      ]
    }
  ],
  quiz: [
    {
      question: "Which cleft sentence emphasizes the REASON?",
      questionAr: "أي جملة مشقوقة تؤكد على السبب (Reason)؟",
      options: ["It is the reason.", "What I like is the reason.", "The reason why I left was the cold.", "I left because of the cold."],
      optionsAr: ["It is the reason.", "What I like is the reason.", "The reason why I left was the cold.", "I left because of the cold."],
      correctIndex: 2,
      explanation: "Using 'The reason why...' at the beginning is a classic cleft structure for identifying motivation.",
      explanationAr: "استخدام 'The reason why...' في البداية هو هيكل مشقوق كلاسيكي لتحديد الدافع."
    }
  ]
};
