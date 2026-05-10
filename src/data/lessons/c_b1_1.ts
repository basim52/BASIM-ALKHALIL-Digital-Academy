
import { Lesson, proficiencyLevel } from "../../types";

export const givingAdviceB1: Partial<Lesson> = {
  title: "Giving Advice & Suggestions",
  titleAr: "إعطاء النصائح والاقتراحات",
  proficiencyLevel: proficiencyLevel.B1,
  warmup: {
    mission: "Learn how to provide helpful advice and make suggestions in both formal and informal situations.",
    missionAr: "تعلم كيفية تقديم نصائح مفيدة وإبداء اقتراحات في المواقف الرسمية وغير الرسمية.",
    objectives: [
      "Use 'Should', 'Ought to', and 'Had better'.",
      "Structure advice with 'If I were you...'",
      "Make suggestions with 'Why don't you...?' and 'How about...?'",
      "Adopt a polite and helpful tone."
    ],
    objectivesAr: [
      "استخدام 'Should' و 'Ought to' و 'Had better'.",
      "صياغة النصيحة بـ 'If I were you...'",
      "تقديم اقتراحات بـ 'Why don't you...؟'",
      "تبني نغمة مهذبة ومفيدة."
    ]
  },
  content: `
### 1. Simple Advice (Should vs. Ought to)
*   **Should:** Most common. (*You should sleep early.*)
*   **Ought to:** More formal, same meaning. (*You ought to see a specialist.*)

### 2. Strong Advice (Had Better)
Use **'d better** when there might be a negative result if the person doesn't listen.
*   "You **had better** finish the report, or the boss will be angry."

### 3. The "If I Were You" Habit
A classic way to give advice by imagining yourself in their position.
*   "**If I were you**, I would take the train instead of the bus."
*   "**If I were in your shoes**, I'd tell him the truth."

### 4. Making Suggestions (الاقتراحات)
*   **Why don't you...?** (*Why don't you try this app?*)
*   **How about / What about + ing?** (*How about going to the park?*)
*   **You could try...**

### 5. Responding to Advice
*   **That's a good idea.** (فكرة جيدة).
*   **I'll give it a try.** (سأجرب ذلك).
*   **I'm not sure about that.** (لست متأكداً من ذلك).
`,
  contentAr: `
### 1. القواعد الذهبية للنصيحة
في مستوى B1، ننتقل من مجرد "أفعل ولا تفعل" إلى أساليب أكثر لباقة:
*   **You should...** (ينبغي عليك).
*   **You ought to...** (نفس المعنى ولكن رسمية أكثر).

### 2. التحذير الودود (Had better)
تستخدم عندما يكون هناك "عاقبة":
*   **You'd better study.** (من الأفضل أن تدرس - وإلا سترسب).

### 3. أسلوب "لو كنت مكانك"
**If I were you, I would...**
هذا الأسلوب يقلل من حدة النصيحة ويجعلها تبدو كـ "مشاركة تجربة".

### 4. كيف تقترح بدائل؟
*   **Why don't we...?** (لماذا لا نفعل...؟).
*   **Shall we...?** (ما رأيك لو...؟).

### 5. قبول النصيحة
*   **Thanks, I'll take your advice.** (شكراً، سآخذ بنصيحتك).

> **نصيحة:** لا تفرض نصيحتك بقوة. استخدم كلمات مثل **"Maybe"** أو **"Perhaps"** في البداية لتكون مهذباً.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Give advice using the phrase in brackets.',
      instructionAr: 'أعطِ نصيحة باستخدام العبارة التي بين القوسين.',
      items: [
        { text: "I have a terrible toothache. (Should) -> You _______.", textAr: "عندي ألم أسنان فظيع. -> ينبغي _______." },
        { text: "He is always late for work. (If I were you) -> _______, I'd set an alarm.", textAr: "هو دائماً يتأخر. -> _______، لضبطت المنبه." },
        { text: "It's raining outside. (Had better / take) -> You _______ an umbrella.", textAr: "إنها تمطر. -> _______ مظلة." }
      ]
    }
  ],
  quiz: [
    {
      question: "Which phrase is used for STRONG advice with a warning?",
      questionAr: "أي عبارة تُستخدم للنصيحة القوية مع وجود تحذير؟",
      options: ["I think you should...", "Why don't you...", "You'd better...", "Could you..."],
      optionsAr: ["أعتقد أنك يجب...", "لماذا لا...", "من الأفضل لك أن... (You'd better)", "هل يمكنك..."],
      correctIndex: 2,
      explanation: "'Had better' implies that something bad will happen if the advice is ignored.",
      explanationAr: "عبارة 'Had better' توحي بأن شيئاً سيئاً قد يحدث إذا تم تجاهل النصيحة."
    }
  ]
};
