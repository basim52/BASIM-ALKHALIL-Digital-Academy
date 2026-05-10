
import { Lesson, proficiencyLevel } from "../../types";

export const negotiationsC2: Partial<Lesson> = {
  title: "High-Level Negotiations & Diplomacy",
  titleAr: "التفاوض عالي المستوى والدبلوماسية",
  proficiencyLevel: proficiencyLevel.C2,
  warmup: {
    mission: "Develop the ability to negotiate complex deals and manage conflicts using diplomatic language, tactical empathy, and strategic concessions.",
    missionAr: "تطوير القدرة على التفاوض على صفقات معقدة وإدارة النزاعات باستخدام لغة دبلوماسية، وتعاطف تكتيكي، وتنازلات استراتيجية.",
    objectives: [
      "Use 'Conditional Concessions' (If you can..., then we might...).",
      "Master the language of 'Soft Turndowns' and 'Pushbacks'.",
      "Employ 'Tactical Empathy' to lower defenses.",
      "Understand the difference between 'Position' and 'Interest'."
    ],
    objectivesAr: [
      "استخدام 'التنازلات المشروطة'.",
      "إتقان لغة الرفض اللطيف والتراجع التكتيكي.",
      "استخدام 'التعاطف التكتيكي' لتقليل الممانعة.",
      "فهم الفرق بين 'الموقف' و 'المصلحة'."
    ]
  },
  content: `
### 1. Diplomatic Language (اللغة الدبلوماسية)
Avoid being blunt. Use "headers" to frame your message:
*   **"With all due respect, our data suggests otherwise."**
*   **"I appreciate your position; however, we have to consider..."**
*   **"It would be in our mutual interest to..."**

### 2. Tactical Empathy (التعاطف التكتيكي)
Show you understand their perspective to build trust:
*   **"It seems like you are concerned about the timeline."** (استخدام 'It seems like' يجعلك تبدو ملاحظاً ولست منتقداً).
*   **"I can see that this is a priority for your team."**

### 3. Conditional Concessions (التنازلات المشروطة)
Never give something for nothing. Use the "If... Then..." structure:
*   **"If you could increase the volume of the order, then we would be able to offer a 10% discount."**
*   **"Provided that the security requirements are met, we are open to discussing the price."**

### 4. Handling Stalemates (التعامل مع الطريق المسدود)
*   **"Let's put this aside for a moment and focus on where we DO agree."**
*   **"What would it take for us to reach an agreement today?"**
*   **"We seem to have reached an impasse. Shall we take a breather?"** (لنأخذ استراحة).

### 5. Finalizing the Agreement
*   **"Let's get this in writing."** (لنضع هذا كتابة).
*   **"I believe we have a deal."**
`,
  contentAr: `
### 1. فن التفاوض (Negotiation)
في مستوى C2، التفاوض ليس "معركة"، بل هو حل مشكلة مشتركة.
*   **Impasse / Deadlock:** طريق مسدود.
*   **Leverage:** وسيلة ضغط.

### 2. كيف ترفض دون أن تقول "لا"؟
استخدم أسلوب **"How am I supposed to do that?"** (كيف يُفترض بي فعل ذلك؟). هذا السؤال يرمي الكرة في ملعب الآخر ليجد حلاً لمشكلتك.

### 3. المصطلحات الدبلوماسية
*   **Non-negotiable:** غير قابل للتفاوض.
*   **Win-win situation:** وضع مربح للطرفين.
*   **Counter-offer:** عرض مضاد.

### 4. لغة الوثائق والقوة
*   **Binding agreement:** اتفاق ملزم.
*   **To back out of a deal:** الانسحاب من الصفقة.

### 5. الكياسة السياسية
استخدم **"We"** بدلاً من **"You"** لتقليل الهجوم الشخصي:
*   **"We have a problem with the budget"** بدلاً من **"Your budget is too high."**

> **نصيحة:** السكوت بعد طرح سؤال مهم هو أقوى وسيلة ضغط. دع الطرف الآخر يملأ الفراغ.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Complete with: Impasse, Mutual, Provided, Leverage.',
      instructionAr: 'أكمل بالكلمة المناسبة لسياق التفاوض.',
      items: [
        { text: "It is in our _______ interest to find a solution.", textAr: "إنه في مصلحتنا _______ (المتبادلة) إيجاد حل." },
        { text: "_______ that you pay upfront, we can start work today.", textAr: "_______ (بشرط) أن تدفع مقدماً، يمكننا بدء العمل اليوم." },
        { text: "We have reached an _______; nobody wants to change their mind.", textAr: "لقد وصلنا لـ _______ (طريق مسدود)؛ لا أحد يريد تغيير رأيه." }
      ]
    }
  ],
  quiz: [
    {
      question: "What is 'Tactical Empathy'?",
      questionAr: "ما هو 'التعاطف التكتيكي'؟",
      options: ["Feeling sorry for the other person", "Verbally recognizing the other person's emotions/perspective", "Giving the other person everything they want", "Ignoring the other person's feelings"],
      optionsAr: ["الشعور بالأسف للطرف الآخر", "الاعتراف لفظياً بمشاعر أو وجهة نظر الطرف الآخر لبناء جسر", "إعطاء الطرف الآخر كل ما يريد", "تجاهل مشاعر الطرف الآخر"],
      correctIndex: 1,
      explanation: "Tactical Empathy is a strategy to build rapport by identifying and labeling the other party's feelings and constraints.",
      explanationAr: "التعاطف التكتيكي هو استراتيجية لبناء الألفة من خلال تحديد وتسمية مشاعر وقيود الطرف الآخر."
    }
  ]
};
