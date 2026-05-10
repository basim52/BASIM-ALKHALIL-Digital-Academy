
import { Lesson, proficiencyLevel } from "../../types";

export const expressingOpinionsB1: Partial<Lesson> = {
  title: "Expressing Opinions & Debating",
  titleAr: "التعبير عن الآراء والمناقشة",
  proficiencyLevel: proficiencyLevel.B1,
  warmup: {
    mission: "Learn how to state your opinion clearly, agree or disagree with others, and participate in a healthy discussion.",
    missionAr: "تعلم كيفية ذكر رأيك بوضوح، الموافقة أو الاختلاف مع الآخرين، والمشاركة في مناقشة صحية.",
    objectives: [
      "Use opinion starters (In my view, To be honest).",
      "Agree politely (I couldn't agree more).",
      "Disagree respectfully (I see your point, but...).",
      "Ask for someone else's opinion."
    ],
    objectivesAr: [
      "استخدام بدايات الرأي (في نظري، لأكون صادقاً).",
      "الموافقة المهذبة (أوافقك تماماً).",
      "الاختلاف المحترم (أفهم وجهة نظرك، ولكن...).",
      "طلب رأي شخص آخر."
    ]
  },
  content: `
### 1. Starting your Opinion (بدء الرأي)
*   **In my opinion,** ... (في رأيي).
*   **Personally, I think...** (شخصياً، أعتقد...).
*   **From my point of view,** ... (من وجهة نظري).
*   **To be honest,** ... (لأكون صادقاً).
*   **As far as I'm concerned,** ... (بقدر ما يهمني الأمر).

### 2. Agreeing (الموافقة)
*   **I agree with you 100%.**
*   **I couldn't agree more.** (لا يمكنني الاتفاق أكثر من ذلك - قمة الموافقة).
*   **That's exactly what I was thinking.**
*   **You're right.**

### 3. Disagreeing (الاختلاف)
Always try to be **indirect** and polite:
*   **I see your point, but...** (أرى وجهة نظرك، ولكن...).
*   **I'm not sure I agree with that.**
*   **On the other hand,** ... (من ناحية أخرى).
*   **That's true, but don't you think...?**

### 4. Asking for Opinions
*   **What do you think about [topic]?**
*   **What's your take on this?** (ما رأيك في هذا؟ - غير رسمي).
*   **Do you agree with me?**
`,
  contentAr: `
### 1. كيف تبدأ كلامك؟
بدلاً من قول "I think" دائماً، استخدم:
*   **I believe that...** (أؤمن أن...).
*   **It seems to me that...** (يبدو لي أن...).

### 2. فن الموافقة (Agreement)
*   **Absolutely!** (بالتأكيد!).
*   **I was just about to say that.** (كنت سأقول ذلك للتو).

### 3. فن الاختلاف (Disagreement)
في الثقافة الإنجليزية، نادراً ما نقول "I disagree" مباشرة لأنها قد تبدو فجة. نستخدم أسلوب "التلطيف":
*   **I'm afraid I disagree.** (أخشى أنني لا أوافق).
*   **I have a different opinion.** (لدي رأي مختلف).

### 4. مهارة الربط
استخدم الروابط لموازنة الأفكار:
*   **However:** ومع ذلك.
*   **On the contrary:** على العكس.

> **نصيحة:** إذا كنت لا تملك رأياً محدداً، يمكنك قول: **"I'm on the fence."** (أنا على الحياد / لم أقرر بعد).
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Complete with the appropriate phrase (Opinion, Agree, Disagree).',
      instructionAr: 'أكمل بالعبارة المناسبة (رأي، موافقة، اختلاف).',
      items: [
        { text: "A: Pizza is the best food. B: _______! I love it too.", textAr: "أ: البيتزا أفضل طعام. ب: _______! أنا أحبها أيضاً." },
        { text: "_______, the film was a bit too long.", textAr: "_______، كان الفيلم طويلاً بعض الشيء." },
        { text: "I see what you mean, _______ I think the book is better.", textAr: "أفهم ما تقصده، _______ أعتقد أن الكتاب أفضل." }
      ]
    }
  ],
  quiz: [
    {
      question: "Which phrase means 'I AGREE completely'?",
      questionAr: "أي عبارة تعني 'أوافقك تماماً'؟",
      options: ["I don't think so.", "I couldn't agree more.", "I'm not sure.", "I see your point, but..."],
      optionsAr: ["لا أعتقد ذلك.", "أوافقك تماماً (I couldn't agree more).", "لست متأكداً.", "أفهم وجهة نظرك، ولكن..."],
      correctIndex: 1,
      explanation: "'I couldn't agree more' is a strong idiomatic way to show total agreement.",
      explanationAr: "عبارة 'I couldn't agree more' هي طريقة اصطلاحية قوية لإظهار الموافقة التامة."
    }
  ]
};
