
import { Lesson, proficiencyLevel } from "../../types";

export const passiveVoiceB1: Partial<Lesson> = {
  title: "Passive Voice: Focus on the Action",
  titleAr: "المبني للمجهول: التركيز على الفعل",
  proficiencyLevel: proficiencyLevel.B1,
  warmup: {
    mission: "Learn how to shift focus from 'who did the action' to 'what happened'.",
    missionAr: "تعلم كيفية تحويل التركيز من 'من قام بالفعل' إلى 'ماذا حدث'.",
    objectives: [
      "Identify Active vs. Passive sentences.",
      "Form the Passive Voice in the Present and Past Simple.",
      "Understand when to use 'by' to mention the agent.",
      "Rewrite sentences in their passive form."
    ],
    objectivesAr: [
      "تمييز الجمل المبنية للمعلوم مقابل المبنية للمجهول.",
      "صياغة المبني للمجهول في المضارع والماضي البسيط.",
      "فهم متى نستخدم 'by' لذكر الفاعل.",
      "إعادة كتابة الجمل بصيغة المبني للمجهول."
    ]
  },
  content: `
### 1. Active vs. Passive
*   **Active:** The focus is on the **Person**.
    *   *Leonardo da Vinci painted the Mona Lisa.*
*   **Passive:** The focus is on the **Object**.
    *   *The Mona Lisa **was painted** by Leonardo da Vinci.*

### 2. How to form the Passive?
You need two ingredients: **Verb "to be"** + **Past Participle (V3)**.

| Tense | Structure | Example |
| :--- | :--- | :--- |
| **Present Simple** | am/is/are + V3 | Coffee **is grown** in Brazil. |
| **Past Simple** | was/were + V3 | The window **was broken** yesterday. |

### 3. Why use Passive?
1.  **When the doer is unknown:** *My car was stolen.*
2.  **When the action is more important:** *The bridge was built in 1990.*
3.  **In formal/scientific writing:** *The results were analyzed.*

### 4. Using "BY"
If you want to say who did the action at the end of the sentence, use **by**.
*   *The Harry Potter books were written **by** J.K. Rowling.*
`,
  contentAr: `
### 1. المعلوم والمجهول
في صيغة المبني للمجهول، نعطي الأولوية للشيء أو الشخص الذي وقع عليه الفعل في بداية الجملة لأن التركيز يكون عليه أكثر من الفاعل.
*   **المعلوم:** العمال بنوا المنزل.
*   **المجهول:** المنزل بُني.

### 2. كيفية صياغة الجملة
القاعدة تعتمد على وضع المفعول به أولاً، يليه فعل مساعد مناسب للزمن، ثم التصريف الثالث للفعل.
*   في حالة الحاضر: نستخدم الأفعال المساعدة المناسبة للمفرد والجمع.
    *   مثال: "الشاي يُصنع بالماء."
*   في حالة الماضي: نستخدم الأفعال المساعدة الماضية.
    *   مثال: "الكعكة أُكلت."

### 3. متى نستخدم هذه الصيغة؟
*   عندما لا يكون هوية من قام بالفعل معروفة أو واضحة.
*   عندما يكون الحدث نفسه والنتيجة أكثر أهمية من ذكر الشخص الذي قام به.

### 4. ذكر الفاعل
إذا دعت الحاجة لذكر الشخص الذي قام بالفعل في نهاية الجملة، نستخدم حرف جر محدد لهذا الغرض.
*   مثال: "المصباح الكهربائي اختُرع بواسطة توماس إديسون."

> **نصيحة:** احرص دائماً على أن يتطابق الفعل المساعد مع المفعول به الجديد في العدد، سواء كان مفرداً أو جمعاً.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Change the sentence to Passive Voice.',
      instructionAr: 'حول الجمل إلى مبني للمجهول.',
      items: [
        { text: "Someone cleans the office every day. -> The office _______ every day.", textAr: "أحدهم ينظف المكتب يومياً. -> المكتب _______ يومياً." },
        { text: "They built this bridge in 1950. -> This bridge _______ in 1950.", textAr: "بنوا هذا الجسر عام 1950. -> هذا الجسر _______ عام 1950." },
        { text: "Shakespeare wrote Hamlet. -> Hamlet _______ by Shakespeare.", textAr: "شكسبير كتب هاملت. -> هاملت _______ بواسطة شكسبير." }
      ]
    }
  ],
  quiz: [
    {
      question: "Which sentence is in PASSIVE VOICE?",
      questionAr: "أي من هذه الجمل هي في صيغة المبني للمجهول؟",
      options: ["He opened the box.", "The box was opened.", "She is opening the box.", "We open the box."],
      optionsAr: ["He opened the box.", "The box was opened.", "She is opening the box.", "We open the box."],
      correctIndex: 1,
      explanation: "'The box was opened' focuses on the object and uses 'was + V3'.",
      explanationAr: "جملة 'The box was opened' تركز على المفعول به وتستخدم 'was + التصريف الثالث'."
    }
  ]
};
