
import { Lesson, proficiencyLevel } from "../../types";

export const makingPlansA2: Partial<Lesson> = {
  title: "Making Plans & Invitations",
  titleAr: "وضع الخطط والدعوات",
  proficiencyLevel: proficiencyLevel.A2,
  warmup: {
    mission: "Learn how to invite friends to events, accept or decline invitations, and fix a meeting time.",
    missionAr: "تعلم كيفية دعوة الأصدقاء للمناسبات، قبول أو رفض الدعوات، وتحديد موعد للاجتماع.",
    objectives: [
      "Use 'Are you free...?' to check availability.",
      "Invite someone using 'Would you like to...?'",
      "Politely decline with 'I'd love to, but...'",
      "Confirm details (time and place)."
    ],
    objectivesAr: [
      "استخدام 'Are you free...؟' للتأكد من التفرغ.",
      "دعوة شخص باستخدام 'Would you like to...؟'",
      "الرفض المهذب بـ 'I'd love to, but...'",
      "تأكيد التفاصيل (الوقت والمكان)."
    ]
  },
  content: `
### 1. Checking Availability
*   **"Are you free this weekend?"**
*   **"What are you doing on Friday?"**
*   **"Do you have any plans for tonight?"**

### 2. Making an Invitation
Use **"Would you like to...?"** for a polite invitation.
*   "Would you like to go to the cinema?"
*   "How about having dinner together?"

### 3. Responding to Invitations
**Accepting:**
*   "Yes, I'd love to!"
*   "That sounds great."
*   "Sure, what time?"

**Declining:**
*   "I'd love to, but I'm busy."
*   "I'm sorry, I have to work."
*   "Maybe another time."

### 4. Fixing the Details
*   "Where shall we meet?"
*   "Let's meet at the cafe at 7 PM."
*   "See you there!"
`,
  contentAr: `
### 1. كيف تبدأ الاقتراح؟
لا تفرضه مباشرة، اسأل أولاً عن تفرغ الشخص:
*   "هل ستفعل أي شيء يوم...؟"

### 2. صيغة الدعوة المهذبة
أهم صيغة هي: "هل تود أن..." متبوعة بالفعل.
*   "هل تود الانضمام إلينا؟"

### 3. كيف ترفض دون إحراج؟
القاعدة هي: (شكر + لكن + عذر).
*   شكراً للدعوة + لكن + أنا متعب.

### 4. اقتراح وقت ومكان
*   "ماذا عن...؟"
*   "لنلتقِ في..."

> **نصيحة:** إذا وافقت على دعوة، تأكد دوماً من ملاءمة الوقت المقترح لك.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Complete the sentences with: love, free, how, like.',
      instructionAr: 'أكمل الجمل بالكلمة المناسبة.',
      items: [
        { text: "Are you _______ on Saturday afternoon?", textAr: "هل أنت _______ بعد ظهر السبت؟" },
        { text: "Would you _______ to go for a coffee?", textAr: "هل _______ أن نذهب لشرب القهوة؟" },
        { text: "I'd _______ to come, but I have a meeting.", textAr: "أود _______ الحضور، لكني لدي اجتماع." }
      ]
    }
  ],
  quiz: [
    {
      question: "Which of these is a POLITE way to say NO to an invitation?",
      questionAr: "أي من هذه الطرق مهذبة لقول 'لا' لدعوة؟",
      options: ["I don't want to.", "No, go away.", "I'd love to, but I'm busy.", "I hate movies."],
      optionsAr: ["لا أريد.", "لا، اذهب بعيداً.", "أود ذلك، لكني مشغول.", "أنا أكره الأفلام."],
      correctIndex: 2,
      explanation: "'I'd love to, but...' acknowledges the kindness of the invitation before declining.",
      explanationAr: "عبارة 'I'd love to, but...' تقدر لطف الدعوة قبل الاعتذار عنها."
    }
  ]
};
